# Agent Physical · 开源机器人证据工作台

对公开的机器人开源项目做**证据化拆解**：点选总成即可下钻到零件，每一条零件行都指向一个真实文件。
装配层级来自仓库发布的真实目录结构，未公开的信息显式标注为缺失——**不做推测填充**。

取自 `berkeley-humanoid-lite-build-explorer` 的架构与证据纪律，在此基础上修正了一处
会让全部项目显示错误概率的缺陷，并把单项目工作台扩展成了由采集管线驱动的多项目工作台。

| | |
| --- | --- |
| 参考实现 | `HUM-BERKELEY-LITE`（深度 3D 拆解台，整机物料 $4,350.59 / ¥23,244.19） |
| 人工策展 | 6 个（ROSMO / OpenQuadruped / BEATRIX / Olimex MINIBOT / Faze4 / …） |
| 管线生成 | 212 个（来自公开仓库树的证据化拆解） |
| 评分 | 1 个已评分（Berkeley，导入自 physical-ai）· 217 个未评分 |
| 零件行 | 3,830 条，全部指向真实文件（逐项目检测链接可达率 212/212） |

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

输入是 544 棵已缓存的公开仓库树与仓库元数据，输出 212 个 `WorkbenchProject`
（3,830 条零件行、1,038 个总成）。规则：

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

## 运行

```bash
npm run install:ci                      # 安装依赖（Node >= 22.13）
npm run dev                             # http://localhost:5173
npx tsc --noEmit                        # 类型检查
npm run build                           # 生产构建

cd pipeline && python3 build_projects.py --min-tier B --out ../lib/projects.generated.ts
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
  workbench-types.ts              人机共用的项目结构
  workbench-projects.ts           注册表 + 人工策展条目
  projects.generated.ts           管线生成（勿手改）
pipeline/build_projects.py        证据 → 工作台 的生成器
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
data/candidates-manual.json        人工逐条核实过的候选（正式出口）
data/seed-gap.json                补采种子（robots.json 同形）
data/repo-ids.json                仓库 id → 规范名 映射（去重与改名纠正）
app/review/page.tsx               审看台：可筛选表格 + 排除清单
```

## 数据来源与边界

零件的名称、路径、文件体积、许可、星数全部来自公开仓库；装配层级由目录结构或文件名推导。
**本工作台不提供零件单价**——价格需要供应商实时报价，代填一个"看起来合理"的数字
正是这套证据纪律要防的事。深度拆解台（Berkeley）的单价来自其官方 BOM 工作表，
与管线生成的条目不是同一来源，UI 中不混用。

零部件价格与采购链接仅供预算参考；实际采购以供应商报价为准。
