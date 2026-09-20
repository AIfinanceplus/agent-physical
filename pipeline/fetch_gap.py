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

CANDIDATES = ROOT / "data" / "candidates-gap.json"
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
    }


def main() -> None:
    cands = json.loads(CANDIDATES.read_text(encoding="utf-8"))
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
    SEED_OUT.write_text(json.dumps(ok, ensure_ascii=False, indent=2),
                        encoding="utf-8")

    print(f"拉到: {len(ok)}   失败: {len(err)}")
    for e in err:
        print(f"  ✗ {e['full_name']}  ({e['error']})")


if __name__ == "__main__":
    main()
