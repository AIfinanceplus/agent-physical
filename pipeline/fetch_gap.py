#!/usr/bin/env python3
"""候选仓库 → 证据采集（走与 build_projects.py 完全相同的判定）

候选来自人工策展清单（awesome-open-source-robots 要求硬件+软件双开源）与
硬件项目索引站，不是关键词搜出来的——策展清单的收录标准本身就是"可复现"。

做三件事：
  1. 用 gh api 拉仓库元数据与完整文件树，写进与主采集相同的缓存格式，
     于是新增项目走的是同一条生成管线，不存在"另一套数据"。
  2. 用 build_projects 的 classify() 计算证据计数，判定口径完全一致。
  3. 产出 data/seed-gap.json（robots.json 同形，tier=A），供生成器合并。

不做的：不猜任何字段。拿不到的仓库如实记为 error，不进 seed。
"""
from __future__ import annotations

import json
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))

from build_projects import CACHE, classify  # noqa: E402
from trust_policy import trust_of  # noqa: E402

CANDIDATES = sorted((ROOT / "data").glob("candidates-*.json"))
SEED_OUT = ROOT / "data" / "seed-gap.json"


def gh(endpoint: str) -> dict | None:
    try:
        r = subprocess.run(["gh", "api", endpoint], capture_output=True,
                           text=True, timeout=90)
    except subprocess.TimeoutExpired:
        return None
    if r.returncode != 0:
        return None
    try:
        return json.loads(r.stdout)
    except json.JSONDecodeError:
        return None


def fetch(cand: dict) -> dict:
    full = f"{cand['owner']}/{cand['slug']}"
    meta = gh(f"repos/{full}")
    if not meta or meta.get("message"):
        return {"full_name": full, "error": "repo_not_found", **cand}

    branch = meta.get("default_branch") or "main"
    tree_resp = gh(f"repos/{full}/git/trees/{branch}?recursive=1")
    if not tree_resp or not tree_resp.get("tree"):
        return {"full_name": full, "error": "tree_unavailable", **cand}

    # 与主采集同格式落盘：[true, treeResponse]
    (CACHE / f"t_{full.replace('/', '__')}.json").write_text(
        json.dumps([True, tree_resp]), encoding="utf-8")

    tree = tree_resp["tree"]
    counts: dict[str, int] = {}
    cad_exts, bom_files, urdf_files = set(), [], []
    for e in tree:
        if e.get("type") != "blob":
            continue
        p = e.get("path", "")
        k = classify(p)
        if k:
            counts[k] = counts.get(k, 0) + 1
        low = p.rsplit("/", 1)[-1].lower()
        if "." in low:
            ext = "." + low.rsplit(".", 1)[-1]
            if k in ("CAD", "MESH"):
                cad_exts.add(ext)
        if k == "BOM":
            bom_files.append(p)
        if k == "DESC":
            urdf_files.append(p)

    return {
        "full_name": full,
        "name": meta.get("name") or cand["slug"],
        "owner": meta.get("owner", {}).get("login") or cand["owner"],
        "description": meta.get("description") or "",
        "url": meta.get("html_url"),
        "homepage": meta.get("homepage") or "",
        "stars": meta.get("stargazers_count", 0),
        "forks": meta.get("forks_count", 0),
        "language": meta.get("language") or "",
        "license": (meta.get("license") or {}).get("spdx_id") or "",
        "topics": meta.get("topics") or [],
        "pushed_at": meta.get("pushed_at") or "",
        "created_at": meta.get("created_at") or "",
        "archived": bool(meta.get("archived")),
        "open_issues": meta.get("open_issues_count", 0),
        "default_branch": branch,
        "tier": "A",
        "reproducibility_score": None,
        "score_reasons": [],
        "evidence": counts,
        "cad_formats": sorted(cad_exts),
        "bom_files": bom_files[:40],
        "urdf_files": urdf_files[:40],
        "file_count": sum(1 for e in tree if e.get("type") == "blob"),
        "_gap": {"cat": cand.get("cat"), "src": cand.get("src")},
        "_trust": cand.get("trust") or "other",
    }


def main() -> None:
    all_cands: list[dict] = []
    for f in CANDIDATES:
        if not f.exists():
            continue
        items = json.loads(f.read_text(encoding="utf-8"))
        all_cands.extend(items)
        print(f"  读入 {f.name}: {len(items)}")

    # 候选的出处与可信度。可信度必须随来源而非"是不是清单"来定：
    # 范围是"可复现开放硬件"的清单（trust=hardware）才可以直接信任为机器人。
    meta_map = {f"{c['owner']}/{c['slug']}".lower():
                {"src": c.get("src"), "cat": c.get("cat"),
                 "trust": trust_of(c.get("src"), c.get("trust"))}
                for c in all_cands}

    # 已有种子的不重复拉取——每轮重拉几百个仓库既慢又白费配额
    done: set[str] = set()
    if SEED_OUT.exists():
        for r in json.loads(SEED_OUT.read_text(encoding="utf-8")):
            done.add(r["full_name"].lower())
    before = len(all_cands)
    cands = [c for c in all_cands
             if f"{c['owner']}/{c['slug']}".lower() not in done]
    print(f"  已在种子中跳过: {before - len(cands)}")

    # 同一仓库可能来自多个清单，按小写去重（GitHub 大小写不敏感）
    uniq: dict[str, dict] = {}
    for c in cands:
        uniq.setdefault(f"{c['owner']}/{c['slug']}".lower(), c)
    print(f"候选（去重后）: {len(uniq)}")

    with ThreadPoolExecutor(max_workers=6) as ex:
        res = list(ex.map(fetch, uniq.values()))

    ok = [r for r in res if not r.get("error")]
    err = [r for r in res if r.get("error")]
    (ROOT / "data" / "gap-fetch-report.json").write_text(
        json.dumps({"ok": ok, "error": err}, ensure_ascii=False, indent=2),
        encoding="utf-8")

    # 与已有种子合并后写回。必须合并：本轮做了增量跳过，直接覆盖会把
    # 之前几轮拉到的仓库从种子里删掉——生成器随即丢失那些项目。
    # 同时按最新的候选元数据回填 _trust：早先几轮的种子没有这个字段，
    # 不回填会被当成不可信来源，让 ExoMy、NimbRo-OP2 这类真硬件再次被误杀。
    merged: dict[str, dict] = {}
    if SEED_OUT.exists():
        for r in json.loads(SEED_OUT.read_text(encoding="utf-8")):
            merged[r["full_name"].lower()] = r
    for r in ok:
        merged[r["full_name"].lower()] = r
    for k, r in merged.items():
        m = meta_map.get(k)
        if m:
            r["_gap"] = {"cat": m["cat"], "src": m["src"]}
            r["_trust"] = m["trust"]
        else:
            # 不在候选文件里（例如候选文件里已被"已知"过滤掉）也要按记得的
            # 来源重算，否则一个已收录的硬件项目会因为候选列表刷新而掉出可信档，
            # 下一轮生成就被误杀——ExoMy 就踩过这个坑。
            r["_trust"] = trust_of((r.get("_gap") or {}).get("src"))
            r.setdefault("_gap", {"cat": None, "src": None})
    SEED_OUT.write_text(json.dumps(sorted(merged.values(),
                                          key=lambda x: -x.get("stars", 0)),
                                   ensure_ascii=False, indent=2),
                        encoding="utf-8")

    print(f"拉到: {len(ok)}   失败: {len(err)}   种子合计: {len(merged)}")
    for e in err:
        print(f"  ✗ {e['full_name']}  ({e['error']})")


if __name__ == "__main__":
    main()