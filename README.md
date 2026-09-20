# Agent Physical · 开源机器人证据工作台

对公开的机器人开源项目做**证据化拆解**：点选总成即可下钻到零件，每一条零件行都指向一个真实文件。
装配层级来自仓库发布的真实目录结构，未公开的信息显式标注为缺失——**不做推测填充**。

取自 `berkeley-humanoid-lite-build-explorer` 的架构与证据纪律，在此基础上修正了一处
会让全部项目显示错误概率的缺陷，并把单项目工作台扩展成了由采集管线驱动的多项目工作台。

| | |
| --- | --- |
| 参考实现 | `HUM-BERKELEY-LITE`（深度 3D 拆解台，整机物料 $4,350.59 / ¥23,244.19） |
| 人工策展 | 6 个（ROSMO / OpenQuadruped / BEATRIX / Olimex MINIBOT / Faze4 / …） |
| 管线生成 | 216 个（来自公开仓库树的证据化拆解） |
| 评分 | OPEN_REPRO_V2：1 个已评分（Berkeley，导入自 physical-ai）· 221 个未评分；<br>证据重现度（ERI）：221 个已计分，锚点 Berkeley = 100，中位 39.1 |
| 零件行 | 3,935 条，全部指向真实文件（逐项目检测链接可达率 212/212） |

## 修正的缺陷：硬编码的 88

上一版把 `88%` 写死在类型、组件和导航标签里，共 13 处：

```ts
probability: 88;          // 字面量类型，不是 number
confidence: "MEDIUM";
```

`generic-workbench.tsx`：`OPEN REPRO 88%`、`value="88%"`、以及
「这些缺口已计入 88% 概率，不会在 UI 中被静默补齐。」
`project-switcher.tsx`：`aria-label="88% 重现概率项目"`、`88% REPRO WORKBENCHES`、
硬编码的 `6 / 6 项目已建立拆解入口`。

结果是 5 个通用项目全部显示同一个 88%。而 88 的真实身份在
`physical-ai/scripts/lib/reproduction-model.mjs` 里：

```js
export const CLASS_CEILING = Object.freeze({ HUMANOID_FULL: 88, /* ... */ });
```

**88 是人形整机的难度封顶值**，是 Berkeley 恰好达到封顶后的得分，被复制成了所有项目的显示值。
更严重的是那句断言——它声称缺口"已计入 88% 概率"，而实际从未跑过模型。

### 修法是结构性的，不是换个数字

`lib/reproduction.ts` 把评分改成联合类型，使非法的默认值无法构造：

```ts
type ReproductionScore =
  | { state: "SCORED";   probabilityPercent; band; confidence; model; basis; provenance; ... }
  | { state: "UNSCORED"; reason: "NOT_YET_MODELED" | "INSUFFICIENT_EVIDENCE" | "OUT_OF_MODEL_SCOPE"; note };
```

- `band` 由百分比推导，不接受传入，因此档位不会与数值脱节
- `scored()` 在 basis 为空时抛错——没有依据的分数无法编译进数据
- `importedScore()` 要求非空 `source`，Berkeley 的 88 记录为**导入值**并标注出处，
  而不是在本地重新推导出一个会与发布值分歧的分解
- `UNSCORED` 状态下 UI 显示 "—" 和原因，不可能回退成某个数字

词汇表（档位名、阈值、floor/ceiling、形态封顶）与 `physical-ai` 的 OPEN_REPRO_V2
**逐字对齐**：`VERY_HIGH≥80 / HIGH≥65 / MODERATE≥45 / LOW≥25 / VERY_LOW≥0`。
另立一套近似的档位名会让两边的数字看似可比实则不可比，比没有分数更糟。

## 采集管线

```
pipeline/build_projects.py    证据 → WorkbenchProject，写 lib/projects.generated.ts
```

输入是 544 棵已缓存的公开仓库树与仓库元数据，输出 216 个 `WorkbenchProject`
（3,935 条零件行、1,059 个总成）。规则：

1. **装配层级三层回退**。优先取功能性目录；目录只有格式桶时按零件文件名中的部位词聚类；
   两条都不通就显式声明"无可识别的功能分区"并写进缺口。
2. **每条零件行 = 一个真实文件**，`source` 是可点击的 blob URL。
3. **缺什么写什么**。没有 BOM 就写"未提供 BOM"，没有单价就写"不代填价格"。
4. **不产出任何概率**。评分是 OPEN_REPRO_V2 的职责，这里只产出证据，全部标 `UNSCORED`。

### 为什么装配层级这么绕

第一版直接取"离文件最近的目录名"，结果 88 个项目出现名为 `meshes` 的"总成"、
53 个叫 `urdf`、40 个叫 `docs`——这些是资产格式桶，不是机器人的功能分区，
在 UI 里排成一列毫无意义。现在的三层回退就是为此。

### 排除规则与它们的局限

管线要排除四类**不可制造**的仓库：工具/库、数据集、教程、仿真器/模型库。
这里有几个踩过的坑，都留在代码注释里：

- **子串误伤**：`llm` 不带词边界会命中账号名 `Ange`**`lLM`**`/Thor`，把一个 ★1596 的真机械臂误杀。
  同一类错误更早还出现在裸词 `arm` 上。
- **假阴性比假阳性更糟**：只靠名字/描述关键词判"是不是机器人"，
  会漏掉 `apirrone/Open_Duck_Mini`（★4115 双足）——它的描述里没有任何词表命中的词。
  现在补了结构证据兜底：**有 URDF 就等于有机器人描述**，可直接收录。
- **豁免只用于漏判，不能用于放过**：`earthtojake/text-to-cad` 会生成 `.urdf` 文件，
  一度靠这个豁免混进榜单。所以反信号是硬闸，结构豁免只作用于机器人信号不足的情形。
- **模拟器按仓库名判定，不按描述**：真机器人的描述常写"支持 Gazebo / MuJoCo 仿真"，
  按描述匹配会误杀真项目。`mujoco`（★15229）曾以物理引擎身份排到榜首。
- **硬件证据硬闸**：仿真/控制/可视化包会发网格文件（显示用），但几乎不发参数化 CAD、
  BOM 或 Gerber。`URDF-Studio`、`go2-convex-mpc`、`LeggedRobotsForBullet` 就是靠网格混过检查的。

**已知局限**：以上是启发式规则，不是形式化判定。排除清单在每次运行时会逐条打印，可审计。

## 漏网项目补充

主采集按关键词 + 星数从 544 个仓库里筛，必然漏掉两类：**描述写得差的好项目**，
和**硬件与代码分仓的项目**。所以补采走上游的人工策展清单
（`awesome-open-source-robots` 的收录门槛是"硬件和软件都开源"，
正好等于我们要的可复现门槛），而不是再搜一遍关键词。

```
pipeline/fetch_gap.py    候选 → 元数据 + 文件树，走与主采集完全相同的证据判定
pipeline/review_gap.py   逐条审看：谁有真硬件证据、谁与现目录重复、谁会被哪道闸拦下
pipeline/audit_links.py  对全部零件链接做覆盖式可达性检测
```

从 99 个候选中补进 50 个（133 → 183），之后又从更多清单、
GitHub 结构化检索与"硬件仓库命名"专项检索补到 **204 个**。几件事值得记下来：

### 标杆自己的硬件仓库一直不在库里

`HybridRobotics/Berkeley-Humanoid-Lite`（★1867）只有 60 个文件、零几何文件——它是**代码库**，
硬件在 `.gitmodules` 指向的另一个仓库 `HybridRobotics/berkeley-humanoid-lite-assets`。
两个名字除大小写和 `-assets` 后缀外没有任何关联线索，因此从未被关联上。

同类：`zeroth-robotics/zeroth-bot` → `zeroth-robotics/hardware`；
`orcahand/orca_core` → `orcahand/orcahand_hardware`；`Nate711/StanfordDoggoProject` → `Nate711/Doggo`。

判据：描述写着"humanoid robot"的仓库如果只有几十个文件、没有任何几何文件，
那它几乎一定是代码库，硬件在别处——去查同组织的兄弟仓库和 `.gitmodules`。

### 关键词闸把真硬件误杀

`esa-prl/ExoMy`（69 个 `.sldprt` + 10 个 BOM）、`NimbRo/nimbro-op2`（69 个 `.step`）、
`ManufacturedMotion/Hex`（BOM + 3mf + PCB）三个真硬件项目全被"机器人信号不足"拦下，
因为它们的 description 为空、或是 `[ARCHIVED] 见新地址`。

修法是**按来源可信度分档，而不是按证据强度放宽**：人工策展清单收录的，
收录动作本身就是"它是机器人"的验证，不必再问关键词；自动采集命中的，
仍只有 URDF/MJCF 这类结构证据能推翻关键词判断。

先试过按证据强度放宽（有参数化 CAD/BOM/PCB 就放行），结果 SCAD 库、KiCad 工具、
数控机床全部涌入——关键词闸存在的意义正在于此。

### 零件链接写死分支会成片 404

`blob_url()` 原本写死 `branch="main"`，于是默认分支是 `master` 的仓库
整个仓库的零件链接全 404。**逐项目抽检 133 条，51 条 404（38%）。**
改用 `/blob/HEAD/`（GitHub 会解析到默认分支）后复测全部可达。

**链接检测还必须区分「确定失效」与「请求没成功」。** 一次审计把 11 条状态 0
报成死链，逐条复测全部 200——那是瞬时网络失败。现在 `audit_links.py` 重试 3 次
（HEAD 失败则退到带 Range 的 GET），只有 404/410 才算确定失效，0/5xx 归入"待复核"。
不重试的审计会周期性误报，久而久之就没人信它了——而它恰恰是唯一能发现成片失效的手段。

**规则：链接、引用、外键这类“每一条都必须对”的数据，一律写覆盖式检测脚本（并发 HEAD 请求 + 逐项计数），不用抽样。抽样只能证伪“全坏”，不能证明“全好”。**

### 按名字去重是假的（大小写之后，还有改名）

先修的是大小写：GitHub 的 `owner/repo` 大小写不敏感，`ROBOTIS-GIT/open_manipulator`
和 `robotis-git/open_manipulator` 是同一个仓库。

但按 `.lower()` 去重只能挡住大小写差异。仓库**改名或换组织**后，同一仓库会以两个
毫无共同点的名字出现，小写化也拦不住：

```
menloresearch/asimov-1      ≡  asimovinc/asimov-1           (id 1204739178)
Source-Robotics/Faze4-...   ≡  PCrnjak/Faze4-Robotic-arm    (id 203364778)
```

稳定的身份是 GitHub 的**数字 id**。`pipeline/resolve_repo_ids.py` 解析全部 608 个候选的
id 与当前规范名，落盘 `data/repo-ids.json`——这样生成器仍保持离线（不因去重而发网络请求），
而 id 映射本身可复核。顺带纠正了 6 个已改名的引用：

```
isl-org/OpenBot            → ob-f/OpenBot
HybridRobotics/Berkeley-Humanoid-Lite → HybridRobotics/berkeley-humanoid-lite
asimovinc/asimov-1         → menloresearch/asimov-1
AndReGeist/wheelbot-v2.5   → AndReGeist/wheelbot
PCrnjak/Faze4-Robotic-arm  → Source-Robotics/Faze4-Robotic-arm
mmmarinho/UMIRobot        → mmmarinho/umirobot
```

改名后缓存文件仍挂在旧名下，所以规范化名字时必须同时迁移缓存，否则生成器反而找不到树。

### 清单是形态，不是背书

一份清单的**收录范围**才决定它能不能被信任，而清单这个形态本身什么也不保证。

`awesome-robot-descriptions` 形态上是清单，收录范围却是 **URDF 描述**（含发那科、Unitree
等商用机器人）。把它当成可信来源后，飞控软件 `ArduPilot`、`PX4`、运动学库 `kinpy`、
`scikit-robot` 全部借道涌入——因为"可信"那一档同时绕过了关键词闸。
同理，一份名字就叫 `awesome-robotic-tooling` 的清单曾一次贡献 811 个候选，全是库和工具链。

信任策略现在集中在 `pipeline/trust_policy.py` 一张表里。它必须只有一处：
早先散在三个脚本中，结果一处漏映射（`awesome-mjyc` 没登记），
就把 `esa-prl/ExoMy`（78 个 CAD + 10 个 BOM）挡在了目录外。

还有一层更隐蔽的：**显式字段不能压过策略表**。条目里带的 `trust` 常常是策略表还没有该来源时
写下的旧结论，一旦落进数据就永久遮蔽后续修正——`tag_trust` 因此长期报"更新 0"，
什么都没纠正而无人察觉。现在对范围统一的来源，表是权威；只有确实需要逐条判定的来源
（兄弟仓库、命名检索）才用显式值。

### URDF 不是「可制造证据」

用"有 URDF + 若干网格"当放行条件，会把大量**造不出来**的仓库当成可复现硬件——
商用机器人和强化学习训练仓库都发 URDF + 显示网格，而 URDF 只描述运动学。

现在的分界：**参数化 CAD / BOM / Gerber 任意一项 = 有可制造证据**；
只有网格 + URDF 的，需要有"收录范围即开放硬件"的来源背书。
两个判定细节同样重要：

- **BOM 必须是能读出零件行的表格或文档。** 只看文件名会让 PX4 的
  `docs/assets/.../parts_list.jpg` 变成物料清单——一张照片证明不了任何零件。
- **仿真器自带的显示网格不算硬件证据。** ArduPilot 的 18 个 STL 全部位于
  `libraries/SITL/examples/JSON/pybullet/models/` 下，是 SITL 测试模型；
  PHC 的网格里还混着 SMPL 人体模型。

### 同一份仓库出现两次时，要补字段而不是二选一

`gello_mechanical` 与 `Navbot-EN01` 明明有 CAD/BOM、层级也是 B，却始终不进目录。
根因：它们既在 `robots.json`（带 tier 与采集证据）又在补采种子里（带 `_trust` 来源元数据），
合并时 `if k not in seen` 判定"已存在"，把种子那份整条丢弃——连 `_trust` 一起丢了，
于是两者被关键词闸当作无来源的自动命中拦下。两份记录各有一半信息，**必须补字段**。

### 逐个账号列举不如按命名惯例检索

"软件仓库出名、硬件仓库默默无闻"这个模式已独立撞见 6 次，所以写了
`probe_sibling_hardware.py` 对全部主账号扫兄弟仓库。但它实测约 32 秒/账号、
792 个账号要跑 4 小时以上，不划算。

改用 `search_hardware_repos.py`：按硬件仓库的命名惯例（`-hardware` / `-assets` /
`-mechanical` / `-cad` / `-description`）交叉机器人语义做检索，16 次 API 调用
就拿到 57 个候选。这一轮直接找回了此前被拦下的 `wuphilipp/robot_parts`
（gello 作者）与 `vinay-lanka/navbot_hardware`。

另一个坑：`/orgs/{name}/repos` 对**个人账号**返回 404，要退到 `/users/{name}/repos`。

### 被拦下的项目要有正式出口

个别真项目（`wuphilipp/gello_mechanical`、`fuwei007/Navbot-EN01`）因为 description 为空、
没有 URDF，任何关键词规则都救不了它们。出口是人工打开仓库树逐条核实后写进
`data/candidates-manual.json` —— 核实成本高，所以只用于逐个确认过的少量条目，
不能当批量兜底。

反例也要留下记录：`NVIDIA-AI-IOT/jetracer` 的 8 个 CAD 全是**商用遥控车底盘
（Latrax / Tamiya）的摄像头支架与转接板**，车本体仍需购买，不构成可复现的机器人设计，
因此不收。

### 两道判定互相矛盾时，窄的那道会静默吃掉项目

`build_project()` 开头有一道**早期的**守卫：

```python
if not buckets.get("MESH") and not buckets.get("CAD"):
    return None
```

它只认网格和 CAD，**在下面那道明确接受 BOM/PCB 的硬件闸之前就返回了**。
于是"只发 BOM"的项目全部静默消失——`makerspet/oomwoo`（★11K）就卡在这里很久。
把守卫对齐成 `MESH/CAD/PCB/BOM` 任意一项后，一次多收 8 个项目
（`enactic/openarm`、`AgibotTech/agibot_x1_hardware`、`HaddingtonDynamics/Dexter` 等）。

教训：**同一件事有两道判定时，要确认它们不会给出不同答案**，
否则先执行的那道实际定义了行为，而另一道只存在于阅读代码的人的想象里。

## 评分：证据重现度指数（ERI）

**以 Berkeley Humanoid Lite 参考实现为 100 分锚点，其他项目可高可低。**
这个分数不是模型给的评价，而是由可复核的计数算出来的。

### 它为什么不是幻觉

| 约束 | 做法 |
|---|---|
| 不让模型打分 | 六个维度全是**计数**：CAD 文件数、可解析 BOM 行项、PCB 文件数、URDF 文件数、装配文档数、许可字段。没有任何一处调用判断 |
| 锚点不是写死的常数 | 每个基准值由 `score_reproduction.py` 从参考实现与 Berkeley 硬件仓库树**解析**得出，每次运行重算并断言 |
| 每个分数可逐条核对 | 每个维度的证据（具体文件路径 / BOM 原始链接）落盘 `data/score-audit.json` |
| 不用别人的评分冒充自己 | Berkeley 的 88 是从 physical-ai **导入**的 OPEN_REPRO_V2 值，全程单独标注来源；ERI 是另一把尺子，两者在界面上并列显示、互不冒充 |
| 测不出来就说测不出来 | 未测维度按 0 计入并把总分标为**下界**，不退出分母（退出分母等于奖励测量失败） |

### 六维与锚点基准

| 维度 | 权重 | 观测量 | Berkeley 基准 |
|---|---|---|---|
| 设计可制造性 | 24 | 参数化 CAD 文件数（STEP/IGES/F3D/SLDPRT/SCAD） | 21 |
| 物料可采购性 | 22 | 可解析 BOM 行项 × 规格系数（型号/价格/供应商各 0.25） | 35.5 |
| 装配可理解性 | 16 | 装配/构建类文档数 | 26 |
| 电子可复现性 | 14 | PCB / EDA 文件数 | 1 |
| 运动学可验证性 | 14 | URDF / MJCF / SDF / USD 文件数 | 12 |
| 授权明确性 | 10 | 开放许可 1.0 / 无法识别 0.5 / 未声明 0 | 1.0 |

比值 `min(2, log1p(n)/log1p(基准))`：用对数压缩，避免超大仓库靠单一维度刷分；
上限 2 倍使"比 Berkeley 更强"能被表达出来，同时不让一个维度拉爆总分。

### 口径边界

- **只计仓库内文件。** 把硬件资料放在仓库之外的项目（官方站点零件表、EasyEDA、OSF）
  会被系统性低估，其分数下会写明这一点。
- 因此 ERI 回答的是"这个仓库里的证据有多齐全"，**不是"这个项目有多好"**。
- 量纲可比性由构造保证：锚点与项目用**同一个估计量**。曾有一版锚点用"三项齐全的条目数"、
  项目用"行数 × 系数"，结果一个 100 行无型号无价格的清单凭空与 Berkeley 打平——已修正。

### 结果（2026-09-19）

221 / 222 个项目计分（`HEAD-BEATRIX` 的证据在 OSF，无仓库树可数，如实留空并写明原因）。

- 最高 **110.0**（`noah-hardware`）· 中位 **39.1** · 均值 43.3 · 最低 5.4
- ≥100 有 **4** 个 · 70–100 有 25 个 · 45–70 有 57 个 · 20–45 有 103 个 · <20 有 32 个
- **0 个项目带未测维度**（首版有 12 个，见下文 BOM 解析一节）

中位不到 40 是真实信号：多数开源机器人仓库公开了 STL/CAD，但没有可采购清单、
没有板子设计、没有装配文档——按"能否被第三方复现"这把尺子衡量，离 Berkeley 参考实现确实很远。

## 审计：从 10% 抽检到全量覆盖

`pipeline/audit_sample.py` 分层随机抽 10%、**不复用缓存**（缓存正是被审计对象）、
从实时 API 独立重取仓库树并重新计数。抽检查出问题后，紧接着的问题必然是"那另外 90% 呢"——
所以把它扩成全量的 `pipeline/audit_all.py`：并发跑完 221 个项目、逐项目输出、
结果边跑边落 JSONL，跑一千个仓库也不会因中途超时而丢失进度。

审计回答六个问题：树是否取全 / 分类器是否漏判 / **是否误计** / BOM 是否取全 /
评分能否复算 / **证据引用是否每条都对**。

### 覆盖式断言（审计的正面结论，同样是交付物）

```
仓库树与实时 API 条目数一致：220/221      实时树被 API 截断：0
证据引用 1250 条：悬空 0 · 非法 0 · 指向他库 0
BOM 文件 253 个：全部解析成功（0 未解析、0 抓取失败、0 从未抓取）
用同一公式喂实时树复算：与记录不一致 0 个
```

"复算差异 0"是评分可复现的硬证据——比任何文字声明都强。

### 查出的问题（四类，逐条修掉后分数都变了）

**一、漏判：真证据没被计入**

| 漏判 | 影响面 | 性质 |
| --- | --- | --- |
| `bill of materials` 里的复数 `s` 让词尾边界失配 | 40 个 BOM 文件 | **最常见的 BOM 命名从未被识别过**；连带 `TotalBOM`/`3DBOM`/`ibom` 与全部中文名 |
| `.dxf` / `.dwg` 不在 CAD 清单里 | 229 个文件 / 26 个项目 | 激光切割件、钣金图是真实加工文件 |
| 逐层 Gerber（`.gtl/.gbl/.gts/.gbs/.gko`）没算作 PCB | 12 个项目 | 同族的 `.gbr`/`.gerber` 收了，逐层文件没收——**同一件事写了两套判据** |
| BOM 只测文件名，不测所在目录 | 20 个文件 / 11 个项目 | `BOM/Components.md`、`BOM/Screws.md`、Altium 的 `BOM/Dragonflyte.xls` 整类丢 |
| 英文的 `purchase_list` 没加（中文的"采购清单"加了） | 若干 | 补一类命名时要两边都过一遍 |

**二、误计：把别人的东西算成自己的**

这一类与漏判方向相反、同样致命，而且**偏袒"把第三方仓库塞进自己目录"的项目**：

| 误计 | 影响面 | 性质 |
| --- | --- | --- |
| vendored 第三方代码 | **1623 个文件 / 9 个项目** | `third_party/flexiv_rdk-main/.../flexiv_rizon10_kinematics.urdf` 是商用机械臂的描述；`third_party/include/boost_parts/README.md` 是 **Boost 的 README**（被当成装配说明）；`site-packages/_distutils_hack/`、`node_modules/.bin/` 是随仓库带的依赖 |
| Autodesk Inventor 自带库 | 100 个 `.ipt` + 59 个 `.iam` + 45 个 `.dwg` | `Blue/Inventor/Design Data/AIT/Mold Design/*.ipt` 等 |

**最重的一条**：`BetaBots`（原第 2 名，101 分）的"最佳 BOM"曾是
`Blue/Inventor/Design Data/partslist.xml`——2250 行、它 101 分里 **43 分来自这个文件**。
该文件头部写着 `Created by Autodesk Inventor Version 19.0 Internal`，内容是
`<Style ... EditableFlag="0" ...>`（样式定义，不可编辑 = 软件自带），
且不含任何 `betabots`/`robot`/`arm` 字样。剔除后它降到 **78.5**。

**三、放宽引入的反向错误（自己引入、自己查掉）**

- PX4 借 `.github/workflows/sbom_license_check.yml` 混进目录——`SBOM` 是**软件**物料清单；
  它的 208 个"装配文档"实为 GitHub Copilot 提示词。修了文件名这一路之后，
  `attest-sbom/action.yml` 又让地面站 `qgroundcontrol` 从**目录**这一路混进来：
  **同一个判据有两个入口时，两个入口都要堵**。
- 首版模板排除规则按**文件名**匹配 `template`，删掉了 `Bottom_Cover (Template).FCStd`
  这类作者自己命名的真实零件。规则只应针对**软件的行为**（Inventor 在 `Templates/` 里
  自带 45 个 `.dwg` 图框），不应针对**人会怎么命名**。
- 按目录判 BOM 会把目录里的一切吸进来，其中
  `02 - BOM AND MANUAL/Assembly Manual PRIMO_1.1.pdf` 从装配文档被改判成 BOM。

同一次审计里，还有三条看着很合理的排除规则**被数据否决**，没有采纳：
`submodules/`（`Mobile_Robot_URDF_Maker` 把自己写的 xacro 放在名叫 `submodules` 的目录里）、
`examples/`（目录里的大户 bullet3/esp-idf/sofa **都是已被正确排除的**工具库，
而目录内的 `AmazingHand` 那 52 个网格是**它自己的手部零件**）、
`test/fixtures/`（信号太弱，且 `Extras/tests/insert_test.stl` 可能真是要打印的零件）。

**四、测量失败被误报成"格式不支持"**

`fetch_bom_content.py` 原本按**扩展名**分派解析器，并把 `.pdf/.xls/.ods/.docx`
直接短路成"需专门解析器"。实际按字节看：`.xls` 里有 3 个其实是 xlsx（改名），
`.xlsx` 里有 4 个是 **39MB** 的文件被 8MB 读取上限截断后报 `BadZipFile`。
而这些容器（xlsx / ods / docx）**都是 zip+XML，标准库足够**。

改法：按**字节**分派（`PK` / OLE2 / `%PDF-` / 文本），截断单独报出
"这是我们自己的上限造成的，不是文件格式问题"，PDF 与旧版 `.xls` 走**可选依赖**
（`pdfplumber` / `xlrd`，缺失时如实写"可选依赖未安装"，而不是笼统说"不支持"）。

结果：BOM 解析从 **170 → 253**，未解析归零，**附带的"下界分数"从 12 个项目降到 0**。

### 结构闸识别不了语义问题，所以给了个正式出口

"BOM 里写的是买两台商用机器人"这类问题，任何可观测特征都判不出来。
除启发式排除清单（一个**输出**）外，再给一个**输入**：人工复核后排除的名单 + 理由
（`data/excluded-reviewed.json`），被拒条目连同理由显示在审看台的排除清单里：

> `real-stanford/umi-on-legs` —— 该仓库的 `bill_of_materials.md` 首两行是
> "Unitree Go2 Edu Plus: $12500 / ARX5: $10000"，它要求读者**购买两台商用机器人**。
> 按此仓库造不出任何零件。

## 深 3D 拆解台

参照实现是 `HUM-BERKELEY-LITE`：一台可以在浏览器里**爆炸展开、逐件点选、按肢体隐藏/隔离**的
人形机器人，右侧是零件明细、关节反查与采购清单三张表。它是手工策展的，几何来自官方发布的
URDF 与网格，零件行来自发布版物料清单。

把同样的体验复制到证据管线生成的项目上，等于把它拆成八项**可从仓库取证**的交付物：

| # | 交付物 | 参照实现 | 生成项目取的什么证 |
| --- | --- | --- | --- |
| 1 | 3D 几何 | 官方 GLB（2.8 MB） | 仓库自己的网格文件；纯 STEP/IGES 的用真 CAD 内核网格化 |
| 2 | link/joint 元数据 | `model/robot.json` | 解析仓库发布的 URDF：质量、包围盒、三角面、关节类型/父子/轴向/限位 |
| 3 | 装配层级 | 手工装配树 | URDF 关节树；无 URDF 时用仓库原始目录 |
| 4 | 零件表 | 47 条（含单价/供应商） | 每个网格文件一个零件 + 物料清单的行项 |
| 5 | 分区与爆炸 | 躯干 + 四肢 | **项目自身的结构**（四足是"机身 + 四条腿"，不是套人形模板） |
| 6 | 证据分 | 锚点 = 100 | `data/score-audit.json`，同一把尺子 |
| 7 | 交互组件 | 2036 行 | 同一套组件，通过 `TeardownSpec` 参数化复用 |
| 8 | 缺口声明 | — | `gaps` 必填：缺什么写什么 |

跑法（`trimesh` 减面 + `gmsh` 网格化，都是可选依赖）：

```bash
uv run --with trimesh --with fast-simplification --with numpy --with gmsh \
    python pipeline/build_teardowns.py            # 门槛默认 70 分
```

产物：`lib/teardowns.generated.ts`（规格）与 `public/teardowns/<id>/model.glb`（几何）。

### 跑出来的结果

**28/29 建成**（第 29 个就是参照实现 Berkeley 本身，它已有手工策展的深度工作台，不重复生成）：

| 指标 | 数值 |
| --- | --- |
| 生成的拆解台 | 28 个 |
| 零件行总数 | 4,215（其中**几何零件 1,507**，其余为物料清单行项） |
| 3D 几何 | 逐项目 GLB，合计 59 MB |
| 交互组件 | 与参照实现同一套（点选高亮 / 隔离 / 关节标记 / 爆炸 / 三张表） |
| 六项自洽断言 | **28/28 全部通过**（`pipeline/verify_teardowns.py`） |

六项断言是**可证伪**的，任何一项挂了脚本就以非 0 退出：GLB 可解析且零件表里的每个几何件都有同名节点；
零件 id 不重复；装配树无悬空 partId；meshLinks 全部在 GLB 中存在且每个零件都被某个总成引用；
分区与 regionByLink 自洽；gaps/basis 非空（生成项目必须自己声明来源与缺口）。

### 六个只有真跑才会暴露的坑

**一、`package://` 指向的网格，同名文件可能有好几份。**
本仓库里名为 `chassis_link.STL` 的文件有 **5 个**（同一个项目发布了多套 URDF 变体）。
按文件名"唯一匹配"会拒绝解析（这是对的，猜就会认错），正确解法是按**包目录**定位：
URDF 位于 `<...>/<pkg>/urdf/x.urdf` 时，网格在 `<...>/<pkg>/` 下。

**二、导出的 GLB 未必把零件挂在场景根节点上。**
把所有零件包在一个 `world` 根节点下是常见做法，而查看器原来只扫 `gltf.scene.children` 这一层——
结果**一个零件都匹配不上，画面全黑，看起来像加载失败，其实是层级布局不同**。
改成按任意深度索引即兼容两种布局。

**三、参照实现的相机取景和远近平面都是写死的坐标。**
`target y = 0.42`、距离 0.95–1.6 m、`near 0.02 / far 40` —— 全是给一台 0.83 m 高的人形调的。
换成 0.46 m 的四足，模型落到画框外；换成**按毫米建模的 CAD（包围盒 258×404×248）**，
相机要退到 800 单位外，整机落在远平面之外被裁掉，`maxDistance = 5` 还会把相机强行拽进模型内部。
**三种尺寸、三种"全黑"，根因各不相同**——取景、远近平面、缩放上下限都必须由模型自身包围盒算出来。

**四、link 元数据表得按 GLB 的节点名登记。**
查看器是拿 GLB 节点名去 `model.json` 的 `links` 里找包围盒的。生成器原先只登记 URDF 的 link 名——
项目没有 URDF 时（零件按目录摆放）这张表**整个是空的**，一个都对不上，3D 全黑、
取景退回默认值，看起来还是"模型没加载"。GLB 节点名就是零件名，按它登记必然对得上。

**五、Git LFS 会把"有几何"伪装成"没几何"。**
本语料里 24 个项目的网格是 LFS 指针：raw 链接取回来的是 **130 字节的
`version/oid/size` 文本**，不是网格。按文件名和体积都看不出问题，只有真正去解析才会失败。
被这件事挡住的项目里，`Dropbear` 的 6,081 个网格**全是**指针 —— 这会让它从"有 400 个零件"
变成"跳过"，而真相是几何一直在，只是要经 LFS 批量接口换真实对象。
取不到实体时也**不能报成"没有几何"**：那是拿存放方式冒充内容缺失。

**六、几何的绝对尺寸会决定它能不能被画出来。**
参照实现的模型是 **0.83 m 的人形**，已验证可用的生成件是 **0.46 m 的四足**——都是"米级、小数点后一位"。
而 CAD 常按毫米建模：`orcahand_hardware` 的包围盒是 **258 × 404 × 248**。
同一个查看器、同一个相机公式，毫米级的模型**渲染不出来**（把同一份几何缩到米级、
相机按比例靠近，画面立刻正常——已经用浏览器里的实机验证过，不是推断）。
生成器因此统一把模型**等比归一化到"最大边 ≈ 1 单位"**，并把原始包围盒与缩放比
如实写进 `model.json`（`modelScale` / `originalExtent`）与界面的 sources 行，
**不假装那个 1 是米**。这类问题的麻烦在于它在数据、层级、断言上全都"看起来正常"，
只有真的把模型画到屏幕上才会暴露。

### 测不出来就说测不出来

- **gmsh 会把进程带走**：真实语料里有 132 字节的残缺 `.step`，gmsh 遇到致命输入是
  `abort()` 而不是抛异常，`try/except` 拦不住；它还是全局状态、非线程安全。
  因此实体网格化放在**独立子进程**里跑，单个文件失败只记不发散——修之前整批 29 个项目
  一起被杀掉（退出码 134）。
- **坏网格不进产物**：顶点含 `inf/NaN` 的网格变换后会变成垃圾坐标，宁可记为"未解析"，
  也不渲染出一团乱码。
- **网格数超预算时按目录轮取**，并把选取规则写进 `gaps`——"只覆盖了每个目录的一部分"
  和"这个项目只有这么多零件"是两件事，界面必须说清是哪一种。
- **没有单价就写没有单价**：生成项目一律不代填价格，整机物料栏显示"仓库内未给出任何单价"，
  而不是 `$0.00`。

## 运行

```bash
npm run install:ci                      # 安装依赖（Node >= 22.13）
npm run dev                             # http://localhost:5173
npx tsc --noEmit                        # 类型检查
npm run build                           # 生产构建

cd pipeline && python3 build_projects.py --min-tier B --out ../lib/projects.generated.ts

# 评分链：抓 BOM 内容 → 补策展项目仓库树 → 计分
python3 fetch_bom_content.py            # 解析全语料 BOM（--force 全量重解析）
python3 fetch_curated_trees.py          # 补拉策展条目的仓库树
python3 score_reproduction.py           # 产出 lib/scores.generated.ts + data/score-audit.json

# 审计链：全量独立复核（并发、实时重取、边跑边落盘）
python3 audit_all.py                    # 221 个项目全覆盖 → data/audit-all.json
python3 audit_sample.py                 # 分层随机 10% 抽检（更便宜，用于快速回归）
```

PDF 与旧版 `.xls` 的 BOM 走**可选依赖**，缺失时如实记为"可选依赖未安装"
（而不是笼统的"格式不支持"）。装了就多出 22 个可解析的 BOM：

```bash
uv run --with pdfplumber --with xlrd python pipeline/fetch_bom_content.py --force
```

`--min-tier` 控制收录范围（A/B/C/D），`--max-parts` 控制每个项目的零件行上限。

## 目录

```
app/                              页面外壳与站点元信息
components/
  project-switcher.tsx            项目切换器（计数全部由注册表计算）
  generic-workbench.tsx           通用证据工作台
  build-explorer/                 参考实现的深度 3D 工作台
lib/
  reproduction.ts                 评分模型契约与展示层（唯一真源）
  evidence-score.ts               证据重现度指数的档位与口径说明
  scores.generated.ts             逐项目六维分（勿手改）
  workbench-types.ts              人机共用的项目结构
  workbench-projects.ts           注册表 + 人工策展条目
  projects.generated.ts           管线生成（勿手改）
pipeline/build_projects.py        证据 → 工作台 的生成器
pipeline/fetch_bom_content.py     抓取并解析全语料 BOM 内容（可采购性的实测值）
pipeline/score_reproduction.py    证据重现度指数（锚点 = Berkeley = 100）
pipeline/fetch_curated_trees.py   补拉人工策展条目的仓库树
pipeline/fetch_gap.py             漏网候选的采集（清单/检索 → 种子）
pipeline/scan_lists.py            扫描策展清单（含中文社区），提取并比对仓库
pipeline/search_more_sources.py   GitHub 结构化多路检索（话题 + 关键词）
pipeline/search_hardware_repos.py 按硬件仓库命名惯例检索（找外置的硬件）
pipeline/probe_sibling_hardware.py 同主账号兄弟仓库扫描（慢，检索版优先）
pipeline/review_gap.py            逐条审看候选：有证据 / 重复 / 会被哪道闸拦下
pipeline/audit_links.py           零件链接覆盖式可达性检测（重试 + 区分确定失效）
pipeline/trace_project.py         追踪某仓库在生成流程各关卡的去留
pipeline/resolve_repo_ids.py      仓库稳定 id 与规范名解析
pipeline/tag_trust.py             按来源刷新候选的可信度标签
pipeline/trust_policy.py          来源可信度策略（唯一真源）
data/candidates-gap.json          补采候选清单（人工策展来源）
data/candidates-lists.json        新增策展清单提取的候选
data/candidates-search.json       GitHub 结构化检索的候选
data/candidates-hardware-search.json 按命名惯例检索的候选
data/candidates-manual.json       人工策展候选（正式入口）
data/excluded-reviewed.json       人工复核后排除的仓库 + 理由（正式拒绝出口）
data/seed-gap.json                补采种子（robots.json 同形）
data/repo-ids.json                仓库 id → 规范名 映射（去重与改名纠正）
data/bom-content.json             全语料 BOM 的解析结果（含未解析原因）
data/score-audit.json             逐项目六维评分 + 全部证据（可离线逐条核对）
data/audit-sample.json            10% 抽检的分层审计结果
data/audit-all.json               全量审计结果（221 个项目 × 六类检查）
data/audit-all.jsonl              全量审计的增量落盘中转（可断点续看）
data/curated-license.json         策展条目的许可标识（取自 gh，避免重复请求）
data/bom-rows.json                物料清单的**真实单元格**（评分只要计数，拆解台要行内容）
data/teardown-feasibility.json    逐项目判定八项交付物哪些有据可建（先量化再动手）
data/teardown-audit.json          生成拆解台的六项自洽核验结果（28/28 PASS）
data/lfs-affected.json            全量 LFS 扫描：哪些项目的网格其实是指针文件
app/review/page.tsx               审看台：可筛选表格 + 排除清单
```

拆解台相关脚本：

```
pipeline/build_teardowns.py       ≥70 分项目 → 深 3D 拆解台（几何/层级/零件行全部取自仓库）
pipeline/_step_to_stl.py          STEP/IGES 网格化，跑在子进程里（gmsh 遇错会 abort 进程）
pipeline/verify_teardowns.py      六项自洽断言，任一不合格即非 0 退出
pipeline/teardown_feasibility.py  建之前的可行性量化：这个仓库到底有没有可渲染的几何
pipeline/scan_lfs.py              全量扫 Git LFS 指针（不下载任何文件，按树的体积判定）
```

## 数据来源与边界

零件的名称、路径、文件体积、许可、星数全部来自公开仓库；装配层级由目录结构或文件名推导。
**本工作台不提供零件单价**——价格需要供应商实时报价，代填一个"看起来合理"的数字
正是这套证据纪律要防的事。深度拆解台（Berkeley）的单价来自其官方 BOM 工作表，
与管线生成的条目不是同一来源，UI 中不混用。

零部件价格与采购链接仅供预算参考；实际采购以供应商报价为准。
