#!/usr/bin/env python3
"""信任策略：哪些来源可以被直接信任为"能造的机器人"。

为什么要单独一个模块：这个判断以前散在三个脚本里，导致两处漏映射
（awesome-mjyc 没映射，ExoMy 因此丢掉了策展豁免；清单候选一旦被"已收录"
过滤掉，它带的可信度就跟着丢了）。策略只有一个来源才不会有第二种解释。

判据是**来源的收录范围**，不是来源的形态：
  - 收录范围本身即"可复现的开放硬件" → hardware，条目可直接信任。
  - 范围更杂（描述文件、知识图谱、通用清单、检索命中）→ other，
    条目仍须自己凭结构证据过关。
"""
from __future__ import annotations

TRUST_BY_SRC: dict[str, str] = {
    # --- 收录范围即可复现开放硬件 ---
    "awesome-osr": "hardware",              # stephane-caron/awesome-open-source-robots
    "growbotics": "hardware",               # growbotics 硬件项目索引
    "awesome-mjyc": "hardware",             # mjyc/awesome-robotics-projects
    "awesome-open-source-robotics(growbotics)": "hardware",
    "awesome-robots(srebroa)": "hardware",
    "orobot.io 目录": "hardware",
    "submodule": "hardware",                # 由 .gitmodules 定位并逐个核对过的硬件仓库
    "sibling": "hardware",                  # 由同组织兄弟仓库定位并核对过
    "canonical": "hardware",
    # 人工打开仓库树逐条核实过的条目。这是被关键词闸误杀的项目的正式出口：
    # 核实成本高，所以只用于逐个确认过的少量条目，不能当作批量兜底。
    "manual": "hardware",

    # --- 范围更杂，条目须自行过关 ---
    "search": "other",
    "github-search": "other",
    "dup-check": "other",
    "awesome-robot-descriptions": "other",  # URDF 描述，含商用机器人
    "awesome-humanoid-robot": "other",      # 知识图谱
    "awesome-robotics-ee-opensource(中文)": "other",
}


# 需要**逐条**判定的来源：同一来源内部结论不同，显式字段优先。
# 例如兄弟仓库扫描：名字叫 `-hardware` 的给可信档，只叫 `description` 的不给。
PER_ENTRY_SRCS = {"sibling", "hardware-search"}


def trust_of(src: str | None, explicit: str | None = None) -> str:
    """判定来源可信度。

    对范围统一的来源，**策略表是权威**，数据里带的显式字段会被忽略。
    反过来（显式优先）曾造成一个隐蔽 bug：显式值往往是策略表还没有该来源时
    写下的旧结论，一旦落进数据就永久遮蔽后续修正——`tag_trust` 因此长期报
    "更新 0"，把一个真项目挡在目录外而无人察觉。结论只能有一处。
    """
    if src in PER_ENTRY_SRCS:
        return explicit or "other"
    if src in TRUST_BY_SRC:
        return TRUST_BY_SRC[src]
    return explicit or "other"
