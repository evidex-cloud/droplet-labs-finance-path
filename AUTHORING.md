# 新金融之路 · 课程编写指南（Authoring Guide）

写课的人（人或 AI 子代理）先读这份，再照着本课黄金范例的**格式**填空：
`content/lessons/stage4-price-yield.js`（中文）、`content/lessons/en/stage4-price-yield.js`（英文）与 `demos/price-yield.js`（演示）。
**内容与代码分离**：你只写「课文对象」和「演示 mount 函数」，绝不改 `app.js` / `styles.css` / `manifest.js` / `glossary.js`。
课程结构的唯一出处是 `tools/curriculum.py`（manifest.js 由它生成）。

---

## 0. 课程的灵魂（写每一节之前先读）

**目标**：让一个**完全零基础**的人，一步步走到**专家级**地看懂新时代的金融全景——
今天的经济与货币 → 传统金融（债券、股票、资本结构、衍生品、市场管道）→ 宏观、危机与风险 →
比特币、DeFi 与代币化 → **数字资产财库公司（DAT，以 Strategy/MSTR 与 Strive/ASST 为核心）及其完整指标与工具箱**（全课焦点）→
AI 时代的金融与“全景图”。**终极目标是让读者看到整张图**，而不是一堆孤立知识点。

### 0.1 四个贯穿全课的观念（主线）

每一节都是这四条主线上的一颗珠子。**每节 intuition 里要明确点名本节主要落在哪个（或哪几个）观念上**，
并说明它和前后珠子怎么串（用「阶段 X.Y」交叉引用）。

1. **观念① 时间的价格（利率）**——钱有时间价值；任何资产的价值 = 未来现金流按某个利率折现；
   这个利率的锚是无风险国债收益率。所以利率一动，**所有资产**都要重新定价（债券、股票、比特币、优先股都一样）。
2. **观念② 资产负债表与索取权**——每一种金融工具都是写在某人资产负债表上的一张**索取权**（钱本身也是负债）；
   谁先拿到钱由**清偿顺序（资本结构）**决定。DAT 就是一张被精心设计的资产负债表。
3. **观念③ 流动性与信任（管道）**——金融靠“管道”运转：结算、托管、抵押品、信用与信任。
   危机＝信任断裂时的挤兑；区块链、稳定币、代币化本质上是在**重建管道**。
4. **观念④ 风险与杠杆**——风险有价格；杠杆双向放大；**波动率本身可以被买卖**；
   市场会自我强化（反身性）。DAT 的“放大比特币”、可转债与优先股，都是对风险的重新切分与定价。

英文版对应：Idea ① The price of time · Idea ② Balance sheets & claims · Idea ③ Liquidity & trust (the plumbing) · Idea ④ Risk & leverage。

### 0.2 贯穿全课的线索（保证连贯性，务必复用）

- **小林（Lin）的三个新闻标题**：阶段 0.1 开篇，零基础的小林（中文“小林”，英文“Lin”；**不要用他/她或 he/she**，用名字或 they）
  刷到三条新闻：①“30 年期美国国债收益率升破 5%”；②“贝莱德的代币化基金、稳定币与 DeFi 正在改写金融管道”；
  ③“Strategy 发行收益率约 10% 的比特币支撑优先股”。全课承诺：**到阶段 20.1，你能把这三条新闻讲透并连成一条线**。
  各层第一节（阶段 0.1、4.1、9.1、12.1、15.1、19.1）可以简短回顾“小林的三个问题现在解锁到哪了”。别滥用——每节最多一两处。
- **标准债券例子**：面值 1,000 美元、票息 5%、10 年期（阶段 4 起反复用）；**30 年期国债**用“约 5% 收益率、修正久期约 15.5”
  （收益率上升 1 个百分点 → 价格约跌 14%，由 `_fin.js` 算得：bondPrice(100,0.05,0.06,30) ≈ 86.2）。
- **标准 DAT 玩具公司「橙子公司 / Orange Corp」**（阶段 15–18、20 所有**示意**计算都用它；真实公司用真实数据另说）：
  - 持有 **10,000 BTC**，比特币价格 **100,000 美元** → 比特币净值（BTC NAV）**10 亿美元**
  - 普通股 **1 亿股**，股价 **15 美元** → 市值 **15 亿美元** → 市值口径 **mNAV = 1.5**；每股比特币 = 0.0001 BTC = **10,000 聪/股**
  - 可转债 **1.5 亿美元**（0% 票息，转股价 25 美元）；高级优先股「Orange-F」**1 亿美元**（10% 累积）；
    次级优先股「Orange-D」**5,000 万美元**（10% 非累积）；现金/美元储备 **3,000 万美元**
  - 年度优先股股息 **1,500 万美元** → 美元储备覆盖 **24 个月**
  - BTC 评级（资产覆盖）：可转债层 10 亿/1.5 亿 ≈ **6.7 倍**；到 F 层 10 亿/2.5 亿 = **4.0 倍**；到 D 层 10 亿/3 亿 ≈ **3.3 倍**
  - 企业价值口径 mNAV = (15 + 1.5 + 1.5 − 0.3) / 10 = **1.77**；放大倍数（BTC 敞口 / 普通股权益）= 10 / (10 − 3) ≈ **1.43 倍**
  - 飞轮：以 15 美元增发 1,000 万股（1.5 亿美元）全部买入 1,500 BTC → 11,500 BTC / 1.1 亿股 → 每股比特币 **+4.5%**（BTC Yield）
  这些数字都能用 `demos/_fin.js` 复算，**全课保持一致**。
  - **官方口径对照（DAT 层必须讲清“口径”）**——同一家橙子公司，四种 mNAV：市值口径 **1.50** · 稀释市值口径（可转债全部假设转股，+600 万股 → 1.06 亿股）**1.59** ·
    企业价值口径（Strategy 2025 定义）**1.77** · 股价 ÷ 每股净比特币（Strategy 2026 定义：净储备 = 10 − 1.5（价外可转债）− 1.5（优先股）+ 0.3（美元资产）= 7.3 亿美元，
    完全稀释股数只算价内工具 = 1 亿股 → 每股净比特币 7.30 美元）**2.05**。**提到 mNAV 必须说明是哪种口径。**
  - 放大倍数：上面的 1.43 倍是**不计现金的简单口径**；Strategy 官方 Amplification = BTC Reserve ÷ Net Reserve = 10 ÷ 7.3 ≈ **1.37 倍**；
    Strive 的 “Amplification Ratio” 是另一回事 =（债务 + 优先股）÷ BTC = **30%**。
  - 每股比特币：按普通股 1 亿股 = 10,000 聪；按 Strategy 的“假设稀释股数”（可转债无论价内价外都算转股，1.06 亿股）≈ **9,434 聪**。
  - BTC Breakeven ARR = 年度股息 1,500 万 ÷ BTC 储备 10 亿 = **1.5%**；Orange-F 的 BTC 地板价 = 100,000 ÷ 4.0 = **25,000 美元**，Orange-D ≈ **30,000 美元**。
  - 真实公司（Strategy、Strive 等）的数字一律来自 `_research/dat-facts.md`，并注明日期。
- **时间锚**：写作时点是 **2026 年 9 月**。涉及“现在”的数字一律写“截至 2026 年 X 月约……”，并提醒读者以官方实时数据为准
  （如 strategy.com、treasury.gov、rwa.xyz）。

### 0.3 事实纪律（极其重要）

- 当前事实（利率水平、美联储主席与政策、Strategy/Strive 的持币量、优先股条款与股息率、mNAV、BTC 评级、指数决定、法规进展等）
  **只从 `_research/dat-facts.md` 与 `_research/macro-facts.md` 取用**；那里标了 UNVERIFIED 的，要么不用，要么写成“据报道/约”。
  不在事实表里、你也不确定的具体数字：**宁可不写或写成量级**（“数百亿美元”“约一半”），绝不编造。
- 历史事实要准（1971 年 8 月 15 日尼克松关闭黄金窗口、2008 年 9 月 15 日雷曼破产、2020 年 3 月、2022 年 9 月英国 LDI、
  2023 年 3 月 10 日硅谷银行关闭、2022 年 5 月 Terra/Luna、2022 年 11 月 FTX、2024 年 1 月现货比特币 ETF、2024 年 4 月减半）。
- 人名/书名/年份要准（费雪 1930《利息理论》、马科维茨 1952、夏普 1964、布莱克-斯科尔斯 1973、明斯基 1986《稳定不稳定的经济》、
  索罗斯 1987《金融炼金术》、中本聪 2008 白皮书、凯利 1956、戴蒙德-迪布维格 1983）。
- **不构成投资建议**：涉及具体证券（MSTR、ASST、STRF/STRC/STRE/STRK/STRD、SATA 等）的课，正文里至少一处明确写
  “本课只讲机制与分析框架，不构成投资建议”。讲框架、讲风险、讲怎么读数据；不给买卖结论，不预测价格。
- **公平**：比特币与 DAT 既讲支持者最强的论证，也讲批评者最强的论证（mNAV 溢价的可持续性、稀释、反身性下行、集中度、
  监管与指数风险、“死亡螺旋”担忧及其反驳）。不神化、不妖魔化任何公司或人物。

---

## 1. 一节课 = 一个默认导出的对象

文件放在 `content/lessons/stageX-<id>.js`（中文）与 `content/lessons/en/stageX-<id>.js`（英文，同名）；阶段 ∞ 用 `stageInf-<id>.js`。

```js
export default {
  id: "price-yield",            // 与 manifest 里的 id 完全一致
  stage: 4, order: 2,           // 阶段号（∞ 写 "∞"）与该阶段中的第几节（与 manifest 顺序一致）
  title: "价格与收益率的跷跷板：为什么利率一涨债券就跌",   // 与 manifest 的 title（英文版用 titleEn）逐字一致
  difficulty: "core",           // 所属层 id：intro / core / systems / newfin / dat / mastery / infinity
  prereqs: ["what-is-bond"],    // 前置课 id（渲染成可点链接）；可为 []
  oneLiner: "一句话点睛（150–250 字），可含 **加粗** 与 `代码`，讲清这节课解决的那个问题。",
  intuition: `直觉解释：零基础也能懂，中文 900–1400 字 / 英文 1000–1600 词；点名本节落在哪个观念（①②③④）；
结尾用「**这一节，我们拆成 N 块：**」+ 一组 - 列表当“主干地图”（N = 4~6，每行形如 - **① 小标题**，与 mechanics 的 ### 小标题一一对应）。`,
  mechanics: `深入原理：用 ### ① ② ③… 小标题拆 4~6 个分支，中文 3000–4500 字 / 英文 2500–4000 词；至少一张内联 SVG 图（见 §2）；可用 $$ 公式块与 <table>。`,
  demo: "price-yield",          // 演示文件名 = 本课 id（demos/price-yield.js），避免并行写作时撞名
  analogy: `一个贴近生活的类比（300–600 字），把整节课压成一个画面。`,
  misconceptions: ["**“误解原文。”** —— 纠正……"],   // 4~5 条，每条 60–150 字
  quiz: [{ q: "题干", options: ["A","B","C","D"], answer: 2, explain: "**解析**……" }], // 4~5 题，每题 4 个选项，answer 索引分布打乱（至少用到 3 个不同索引）
  further: [{ label: "来源名（一句话说明）", url: "https://…" }],  // 3~5 条权威外链
};
```

**英文版**是同一课的完整英文重写（不是逐句翻译）：同样的结构、同样的 id / demo / 数字例子 / 图示；`title` 用 manifest 的 `titleEn`；
行文要像英语母语的金融学教师写的。SVG 图里的文字要换成英文。英文正文里**不能出现任何汉字**（further 的 label 也用英文）。

## 2. 正文支持的极简 Markdown

`**加粗**`（正文里会自动荧光高亮）· `` `代码` `` · `[文字](https链接)` · `- 列表` · `> 引用` · `### 小标题` · 空行分段 ·
`$$ 公式`（以 `$$` 开头的块＝公式框，块内每行用换行；公式里别用 `**`）·
以 `<table` 开头、独立成段的块原样透传（条款对比表、指标表；**表格内不要有空行**，单元格里不会再解析 Markdown，需要加粗就写 `<b>`）。

**内联图示**：以 `<figure>` 开头、独立成段（前后空行、块内**不要有空行**）的块会原样透传：
`<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif">…</svg><figcaption>一句话图注</figcaption></figure>`
颜色只用 CSS 变量（**不要写任何 #十六进制颜色**）：`var(--ink)` 标题、`var(--muted)` 次要字、
`var(--orange)`/`var(--orange-ink)`/`var(--orange-soft)`/`var(--orange-line)` 品牌主色（Droplet Labs 品牌蓝 #2E9FD6，变量名沿用 orange；图注里称“蓝色/blue”）、
`var(--btc)`/`var(--btc-soft)` 比特币橙（比特币/DAT 相关强调）、`var(--blue)`/`var(--blue-soft)` 对照色（品牌紫 #7B6CDB；图注里称“紫色/violet”，**不要**叫它蓝色）、
`var(--green)`/`var(--green-soft)`、`var(--red)`/`var(--red-soft)`、`var(--surface-2)` 浅底、`var(--line)` 边线。
**每节 mechanics 至少一张图**，画“机制”而不是装饰：资本结构楼层图、现金流时间线、收益率曲线、瀑布图、资金流向图、对比表。
SVG 里文字不要太挤（字号 10–13），viewBox 宽 640 左右。

## 3. 知识卡片与超链接（自动）

- **术语小卡片**：`content/glossary.js` 里的词在每节首次出现时自动加虚线下划线 + 悬浮释义。你只要在正文**自然地用上术语**。
  **不要编辑 glossary.js**（多人并行会冲突）。把本阶段的重要术语写进
  `content/glossary-proposals/stage<N>.json`（阶段 ∞ 用 `stageInf.json`；数组：
  `[{"zh":{"n":["中文名","别名"],"d":"一句话释义"},"en":{"n":["English term","alias"],"d":"One-sentence definition."}}]`），
  每阶段 8–15 条，最后由主编统一合并。中文别名要够长够专（写“到期收益率”别写“收益”），英文单复数各算一条。
- **课程交叉引用**：正文写「阶段 X.Y」（英文版写 `Stage X.Y`）会自动变成跳转链接，X=阶段号、Y=该阶段第几节（见 §8 蓝图）。
  **每节至少 3 处交叉引用**：至少一处回指前面、一处前指后面；**DAT 焦点层与全景阶段要大量回指**前面学过的工具
  （“这就是阶段 6.2 讲的优先股”“回到阶段 4.4 的久期”）。只引用 §8 蓝图里存在的编号。中文版只写「阶段」，英文版只写 `Stage`。
- 姊妹课程可在 further 里外链：RWA 之路 https://evidex-cloud.github.io/droplet-labs-rwa-path/ ·
  期权之路 https://evidex-cloud.github.io/droplet-labs-options-path/ · 奥派之路 https://evidex-cloud.github.io/droplet-labs-austrian-path/ ·
  中本聪之路 https://evidex-cloud.github.io/nextdawn-satoshi-path/ 。

## 4. 写作风格（务必遵守）

- **既专业有深度，又用大白话和例子讲清**。每个抽象概念都配一个**具体数字例子**（1,000 美元债券、利率从 4% 升到 5%、橙子公司增发 1,000 万股）。
  零基础读者只看 intuition 就能懂；mechanics 可以上公式与行话，但每个术语先说“它在说什么”。
- 多用 **加粗** 标出关键结论；多用列表与小表格；口语化；不要空话套话，不要“总之”“值得注意的是”“让我们深入探讨”式的 AI 腔。
- **新时代视角**：每节在合适处点出“这个老概念在新经济（比特币、DeFi、代币化、DAT、AI）里怎么用/怎么变了”——
  这是本课与普通金融教材的区别。但别硬凑，一两段即可。
- **前后一致**：用 §0.2 的标准例子与“橙子公司”；术语译法统一（见 §9）。
- 中文用中文标点与弯引号 “ ”；模板字符串里**不要出现反引号 ` 与 `${`**。

## 5. 演示 = `demos/<本课 id>.js`，默认导出 `mount(root, lang)`

- 双语：`const en = lang === "en"; const T = (zh, e) => (en ? e : zh);` 所有可见文案都走 `T()`。
- 只用 `styles.css` 里已有的类：`.demo`、`.demo-head`、`.demo-block`、`.demo-label`、`.demo-row`、`.demo-grid`、`.demo-grid-3`、`.demo-slider`、
  `.demo-seg`（`button.on`）、`.demo-btn`（`.active`）、`.demo-btns`、`.demo-out`、`.demo-log`（`.ok/.bad/.warn`）、`.demo-tip`、`.demo-meta`、`.demo-bar`、
  `.stat-row/.stat`（`.k/.v`，`.v.pos/.neg/.acc`）、`.bar2`（`.lab/.track/.fill/.val`）、`.cmp/.cmp-3/.cmp-cell`（`.hl/.cold`）、`.scn/.scn-q/.scn-meta`、
  `.pill`（`.ok/.bad`）、`.stages/.stage-bar`（`.lab/.track/.fill/.fill.ghost/.val`）、`.person`（`.yr`）、`.tl/.tl-item`（`.when`）、`.strip/.strip-cell`、`.chart`、`.done-banner`。
  **不要改 styles.css**；需要特殊样式就写内联 style（颜色仍只用 CSS 变量）。
- **计算一律用共享引擎** `import { … } from "./_fin.js";`——折现（fv/pv/npv/perpetuity/gordon/realRate/rule72）、债券（bondPrice/bondYield/bondRisk/priceChangeApprox）、
  瀑布与覆盖（waterfall/coverageByLayer）、DAT（btcNav/mnavBasic/mnavDiluted/mnavEV/mnavNetBps/netReserve/btcPerShare/btcYield/btcGain/btcDollarGain/issueAndBuy/amplification/amplificationStrategy/striveAmpRatio/btcRating/btcFloorPrice/btcRiskProb/btcCredit/breakevenArr/monthsCovered）、期权（normCdf/bsCall/bsPut）、
  组合（mean/stdev/port2Vol/sharpe/kelly/maxDrawdown/rng/randn）、AMM（ammSwap）、格式化（fmtPct/fmtNum/fmtUsd/fmtBig/clamp）。先读一遍 `demos/_fin.js`。
  不要在演示里另写一套同名公式。
- **曲线图**：`import { lineChart, chartBlock } from "./_chart.js";`
  `lineChart({fns:[{f, cls}], lo, hi, xlabel, markerX, markerLabel, forceZero, uid})` → `{svg}`；`cls`：`'line'`(品牌蓝)/`'line2'`(紫)/`'line3'`(红)/`'line4'`(绿)/`'line5'`(比特币橙)。
  `chartBlock(res, [["var(--orange)","标签"],…])` 加图例。更特别的图（资本结构楼层、瀑布、时间线）自己拼 `<svg>`，颜色走 CSS 变量。
- 演示要**真算**、可交互（滑块/按钮/分段切换），并给一句 `.demo-tip` 点出“看什么”。DOM id 用本演示专属前缀（如 `py-`），
  并且**只在 root 内查询**（`root.querySelector`）。
- 演示是**思维实验的沙盘**：复利计算器、债券跷跷板、收益率曲线编辑器、资本结构瀑布、可转债损益、清算瀑布、AMM 滑点、mNAV 飞轮、
  BTC 评级压力测试、优先股收益/久期计算器……让读者动手改参数看结论怎么变。
- 演示里不要有任何 `#十六进制颜色`，不要用外部库，不要发网络请求。

## 5.5 界面（UI v3）

界面采用 Droplet Labs 品牌语言：品牌纸色 #F2F2F0、墨黑文字、Outfit 字体（中文回退 Noto Sans SC，公式用 Geist Mono）、黑色悬浮胶囊导航、深色结尾区；
课文与演示只通过 §2/§5 列出的 CSS 变量与类名接触样式，改版不需要动课文。图示里的文字会自动用 Outfit 显示（比 Inter 窄约 8%，不会溢出）。
手机上宽图可横向滑动（渲染器自动加提示）、表格自动包进可滚动卡片、术语卡变为底部浮层。

## 6. 缓存（开发时）

改了 `lessons/` 或 `demos/` 后，把 `app.js` 里的 `const V` +1；改 `app.js`/`styles.css` 后把 `index.html` 的 `?v=N` +1；
改 `manifest.js`/`glossary.js` 后把 `app.js` 顶部对应 `?v=` 和 `index.html` 的 `app.js?v=` 一起 +1。（写课的子代理不用管这一步，主编统一处理。）

## 7. 质量自检（写完每节都跑）

在项目根目录（`C:\claude-projects\finance-path`）运行：`python tools/check.py <lesson-id> [<lesson-id> …]`（不带参数 = 全课）。它检查：
两种语言文件能否 import、id/title/stage/order/difficulty 与 manifest 一致、正文长度（intuition+mechanics+analogy：中文 ≥ 6000 字符、英文 ≥ 9000 字符）、
4–6 个 ### 小标题且与主干地图一一对应、至少一张 `<figure>`、无硬编码颜色、≥ 3 处交叉引用、4–5 条误解、4–5 道 4 选项自测且答案分布打乱、
3–5 条延伸阅读、英文版无汉字、演示存在且可 import、双语、有 `.demo-tip`。**全部 OK 才算完成。**

另外人工自检：
- [ ] 数字例子算对了（能用 `_fin.js` 复算的都复算一遍：`node -e "import('./demos/_fin.js').then(f=>console.log(f.bondPrice(1000,0.05,0.06,10)))"`）。
- [ ] 当前事实都出自 `_research/`，并写了“截至 2026 年 X 月”。
- [ ] 点名了本节所属的观念（①②③④），并与前后阶段串起来。
- [ ] 文件是合法 ES 模块（模板字符串里没有未转义的反引号与 `${`）。

## 9. 术语译法统一表

收益率 yield · 到期收益率 yield to maturity (YTM) · 久期 duration · 凸性 convexity · 期限溢价 term premium · 收益率曲线 yield curve ·
利差 spread · 资本结构 capital stack · 清偿顺序/优先级 seniority · 优先股 preferred stock · 累积/非累积 cumulative/non-cumulative ·
永续 perpetual · 清算优先权 liquidation preference · 可转债 convertible bond/note · 按市价增发（ATM）at-the-market offering ·
稀释 dilution · 回购 buyback · 比特币净值 BTC NAV · 每股比特币 BTC per share · 资产覆盖 asset coverage · BTC 评级 BTC Rating ·
放大倍数 amplification · 美元储备 USD Reserve · 资本返还 return of capital (ROC) · 数字资产财库公司 digital asset treasury company (DAT) ·
稳定币 stablecoin · 自动做市商 automated market maker (AMM) · 去中心化金融 DeFi · 代币化 tokenization · 真实世界资产 real-world assets (RWA) ·
中性利率 neutral rate (r*) · 量化宽松/紧缩 QE/QT · 回购市场 repo market · 做市商 market maker · 结算 settlement · 托管 custody ·
风险溢价 risk premium · 无风险利率 risk-free rate · 联邦基金利率 federal funds rate · 财政主导 fiscal dominance。

---

## 8. 课程蓝图（Blueprint）—— 每节的范围、要点与连接

The numbering below is exactly what `阶段 X.Y` / `Stage X.Y` cross-references resolve to. "Must cover" is the minimum; "Links" are the
connections that make the course one story. Idea tags ①②③④ refer to §0.1. Demo ideas are suggestions — any demo that computes for real and
teaches the lesson's core is fine.

### Tier 1 — intro · Beginner: Money & the Economy

**Stage 0 — The Big Picture: What Finance Actually Does**
- **0.1 what-finance-does** ①②③④ — Open with Lin's three headlines (§0.2) and the course promise. Finance moves value across **time** (saving/borrowing),
  **space** (payments), and **risk** (insurance, diversification). Everyone is a saver, borrower, or intermediary. Demo: sort everyday actions
  (mortgage, insurance, index fund, stablecoin transfer, buying a preferred) into time/space/risk. Links: 0.2, 2.1, 8.1, 13.1, 15.1, 20.1.
- **0.2 four-ideas** ①②③④ — The four ideas as the map of the whole course; one vivid example each; how each later tier stresses them.
  Demo: a "four-ideas lens" — pick a headline and see which ideas light up and which stages explain it.
- **0.3 finance-history** — Mesopotamian loans, coinage, double-entry bookkeeping, joint-stock companies (VOC 1602), Bank of England 1694,
  gold standard, Bretton Woods 1944, 1971, listed options 1973, 2008, Bitcoin 2009, DeFi summer 2020, spot ETFs 2024, DATs 2020–26.
  Pattern: every innovation re-engineers trust and ledgers. Demo: interactive timeline. Links: 1.5, 10.2, 12.1, 15.2.
- **0.4 new-era-map** — One-page map: TradFi (banks, bonds, stocks, funds) ↔ bridges (ETFs, stablecoins, tokenized funds) ↔ on-chain (Bitcoin, DeFi) ↔
  DATs (public companies holding BTC financed with TradFi instruments) ↔ AI as a new capital good and market participant. Where the money and the
  risk sit. Demo: clickable map with "which stage explains this". Links: stages 4, 12, 13, 14, 15, 19.

**Stage 1 — Money & Banking**
- **1.1 what-is-money** ② — Three functions; money as a transferable IOU/ledger entry (a liability of a bank or central bank); hierarchy of money
  (central bank reserves > bank deposits > money funds/stablecoins). Demo: rate candidates (gold, dollars, Bitcoin, airline miles, USDC) on the three functions.
  Links: 1.2, 1.5, 12.2, 13.2.
- **1.2 banks-create-money** ②③ — Loans create deposits; T-accounts; fractional reserves and capital requirements; why runs are possible
  (maturity mismatch). Demo: T-account simulator. Links: 1.3, 10.1, 10.3 (SVB), 14.5.
- **1.3 central-banks** ①③ — The Fed's dual mandate, policy rate (fed funds), open-market operations, lender of last resort, independence
  (2026 chair change per facts file). Demo: set the policy rate, see short/mortgage rates respond (stylized). Links: 9.1, 9.2, 4.3.
- **1.4 inflation** ①④ — CPI basket, core vs headline, PCE, causes (money, demand, supply shocks), winners/losers (debtors vs savers), Cantillon effect
  briefly. Demo: purchasing-power erosion calculator. Links: 2.5, 9.5, 12.2.
- **1.5 gold-fiat-bitcoin** ①② — Gold standard, Bretton Woods, Aug 15 1971, the petrodollar, the debt-based fiat era, the 2009 genesis-block headline,
  Bitcoin as a response; balanced view of both sides. Demo: purchasing power of $100 in dollars vs gold vs BTC (stylized, labelled illustrative).
  Links: 3.4, 12.1, 12.3, 15.1.

**Stage 2 — The Price of Time**
- **2.1 time-value** ① — Why a dollar today beats a dollar tomorrow (consumption preference, opportunity, inflation, risk). Demo: "$100 now or $X
  later?" finder that backs out your personal discount rate. Links: 2.3, 4.1.
- **2.2 compounding** ① — Simple vs compound, frequency, Rule of 72, compounding of debt (credit cards), compounding of BTC per share (preview 16.1).
  Demo: compounding calculator with Rule-of-72 check. Links: 16.1, 11.4.
- **2.3 present-value** ① — PV/FV, NPV of streams, perpetuities and growing perpetuities (Gordon); every asset = PV of future cash flows.
  Demo: cash-flow timeline builder with discount-rate slider. Links: 4.2, 5.3, 18.1 (a perpetual preferred is a perpetuity).
- **2.4 risk-free-rate** ①④ — Risk-free rate = Treasury yield; required return = risk-free + risk premia; why Treasuries anchor global pricing;
  what "risk-free" hides (inflation, duration). Demo: stack a required return (rf + credit + equity + illiquidity premia) and see valuation change.
  Links: 4.5, 5.4, 18.1, 20.1.
- **2.5 real-vs-nominal** ① — Fisher equation, real yields, TIPS, negative real rates as a hidden tax (financial repression), why real rates matter for gold and
  Bitcoin. Demo: nominal vs real return calculator. Links: 1.4, 9.4, 12.4.

**Stage 3 — Reading Today's Economy**
- **3.1 gdp-cycle** — GDP components (C+I+G+NX), nominal vs real, recessions, the business cycle and its drivers. Demo: stylized cycle with phase labels.
  Links: 3.2, 9.2, 20.2.
- **3.2 economic-dashboard** — Payrolls, unemployment, CPI/PCE, PMIs, retail sales, "expected vs actual" (surprises move markets). Demo: "surprise"
  game — consensus vs actual → predict the move in yields/stocks. Links: 9.2, 20.3.
- **3.3 deficits-debt** ①② — Budget, deficit vs debt, who holds Treasuries, interest cost, debt/GDP, Treasury auctions (bills vs coupons).
  Current numbers from `_research/macro-facts.md`. Demo: debt-dynamics calculator (deficit, growth, interest). Links: 4.5, 9.4, 20.1.
- **3.4 dollar-system** ③ — Reserve currency, eurodollars, Treasuries as global collateral, trade deficits and capital flows, swap lines, dollar
  stablecoins as a new channel of dollar demand. Demo: follow a dollar around the world. Links: 9.3, 13.2, 14.5.

### Tier 2 — core · The TradFi Toolkit

**Stage 4 — Bonds**
- **4.1 what-is-bond** ①② — Coupon, face, maturity, issuers (Treasury, corporate, muni), zero-coupon, bills/notes/bonds; the standard $1,000 5% 10-year bond.
  Demo: bond cash-flow builder. Links: 2.3, 4.2, 6.1.
- **4.2 price-yield** ① — Price and yield move inversely and why (fixed coupons vs new market rates); YTM; current yield; premium/discount bonds; the 30-year
  sensitivity preview. Demo: the seesaw — slide market yield, watch prices of 2y/10y/30y bonds. Links: 4.4, 4.5, 10.3 (SVB), 18.1.
- **4.3 yield-curve** ①④ — Term structure, normal/flat/inverted, expectations + term premium, inversion as recession signal (record + caveats), bear/bull
  steepening. Demo: curve editor with shape classifier. Links: 1.3, 4.5, 9.2, 20.2.
- **4.4 duration-convexity** ①④ — Macaulay/modified duration, DV01, convexity, why long bonds and perpetuals are rate-sensitive; duration of a perpetual
  ≈ 1/y. Demo: duration calculator with ±bp shocks (use `bondRisk`). Links: 4.5, 17.4 (STRC engineered for low duration), 18.1.
- **4.5 long-bond-30y** ①②④ — THE lesson for Lin's headline ①. Why the 30-year yield rises / is high (term premium, deficits and supply, inflation risk,
  fiscal-dominance fears, foreign demand, global long-end selloffs incl. Japan/UK) and why it matters: mortgage rates, equity valuations (discount rate),
  bank/insurer balance sheets, government interest costs → bigger deficits (a loop), risk assets incl. Bitcoin, and competition for fixed-income
  alternatives such as preferreds. Current facts from `_research/macro-facts.md`. Demo: 30y yield shock → mortgage payment, P/E, 30y bond price,
  federal interest cost. Links: 3.3, 9.4, 10.3, 20.1.
- **4.6 credit-spreads** ②④ — Default risk, ratings (AAA…D), IG vs high yield, spreads over Treasuries, expected loss = PD × LGD, spreads in crises.
  Demo: price a corporate bond as Treasury + spread; spread vs expected loss. Links: 6.6, 16.5 (BTC Rating vs credit ratings), 18.1.

**Stage 5 — Stocks**
- **5.1 what-is-stock** ② — Residual claim, limited liability, voting, dividends, share count. Links: 6.1, 15.1.
- **5.2 financial-statements** ② — Income statement, balance sheet, cash flow; how they connect; what a DAT's statements look like (preview 15.6).
  Demo: interactive three-statement linkage. Links: 15.6.
- **5.3 valuation** ① — DCF, P/E, EV/EBITDA; why rising rates compress multiples (equity duration); growth vs value. Demo: DCF with rate slider.
  Links: 2.3, 4.5, 16.2 (mNAV as a "multiple on NAV").
- **5.4 equity-risk-premium** ④ — Long-run returns, ERP, volatility and drawdowns; the risk/return ladder (cash < bonds < stocks < BTC).
  Demo: asset ladder with return/vol/drawdown. Links: 2.4, 11.3, 12.4.
- **5.5 dilution-buybacks** ② — Issuance, dilution, per-share value, when issuing stock is accretive (selling above intrinsic value) vs dilutive; buybacks.
  Foundation of the DAT flywheel. Demo: issue shares at premium/discount to book value, see per-share value. Links: 16.1, 16.7, 17.1.
- **5.6 indexes-etfs** ③ — Cap-weighted indexes, inclusion rules (S&P, MSCI, Nasdaq-100), ETF creation/redemption, the size of passive flows.
  Links: 12.5 (spot BTC ETFs), 18.4 (MSCI & DATs).

**Stage 6 — The Capital Stack**
- **6.1 capital-stack** ② — Secured debt > senior unsecured > subordinated > preferred > common; claims vs residual; floor-plan picture. Demo: waterfall
  (`waterfall`). Links: 6.6, 16.5, 17.6.
- **6.2 preferred-stock** ② — Fixed dividend, usually no maturity, priority over common, junior to debt; why issuers use it (a skipped dividend is not a default,
  equity-like treatment); traditional issuers (banks, REITs, utilities); typical yields; rate sensitivity. Links: 6.3, 17.3, 18.1.
- **6.3 preferred-terms** ②④ — Cumulative vs non-cumulative, perpetual, call features, liquidation preference/stated amount, dividend stoppers, PIK,
  convertible preferreds, fundamental-change puts, variable/floating rates. Term-sheet table. Demo: dividend-skip simulator (cumulative arrears vs
  lost dividends). Links: 17.3, 17.4, 17.5.
- **6.4 convertible-bonds** ④ — Bond floor + call option; conversion price/ratio/premium; why issuers get low coupons; convertible arbitrage (long convert,
  short stock, harvest volatility). Demo: convert value vs stock price. Links: 7.3, 17.2.
- **6.5 leverage-coverage** ②④ — Debt/equity, LTV, interest coverage, fixed-charge coverage, asset coverage; why asset coverage replaces cash-flow metrics
  when the asset is BTC. Demo: coverage calculator. Links: 16.5, 16.6.
- **6.6 bankruptcy-recovery** ② — Chapter 11 vs 7, absolute priority, recovery rates by layer, what "senior" really buys you.
  Demo: recovery waterfall under different asset values. Links: 17.6, 18.2.

**Stage 7 — Derivatives & Volatility**
- **7.1 futures-forwards** ③④ — Hedging vs speculation, margin, basis, contango/backwardation, CME Bitcoin futures, crypto perpetual futures & funding rates.
  Demo: hedge a farmer / a bitcoin miner. Links: 7.4, 7.5.
- **7.2 options-basics** ④ — Calls/puts, payoff diagrams, moneyness, what drives option value (intuitive Black–Scholes inputs). Demo: payoff builder.
  Links: 6.4, 7.3. (Further: Options Path.)
- **7.3 volatility-asset** ④ — Implied vs realized vol, selling vol, gamma trading; why BTC's high vol makes MSTR options & converts valuable; MSTR as a
  "volatility factory". Demo: realized vol from a seeded path; option value vs vol. Links: 17.2, 15.3.
- **7.4 swaps-hedging** ③④ — Interest-rate swaps, swap spreads, the Treasury cash–futures basis trade and its role in March 2020; hedging programs.
  Links: 8.3, 10.3.
- **7.5 margin-liquidation** ④ — Margin calls, forced selling, cascades in TradFi (1987, Archegos 2021) and crypto (large 2025 liquidation events if in
  the facts file); why DATs prefer structures without margin calls. Demo: leveraged position vs price path, cascade. Links: 13.4, 17.6, 18.3.

**Stage 8 — Market Plumbing & Institutions**
- **8.1 exchanges-brokers** ③ — Order books, bid/ask, market makers, payment for order flow, 24/7 crypto vs market hours. Demo: mini order book.
  Links: 13.3 (AMMs), 14.3.
- **8.2 clearing-settlement** ③ — Clearing houses, CCPs, DTCC, T+1 (May 2024), the custody chain, "who actually holds your share"; atomic on-chain settlement
  as contrast. Demo: settlement timeline T+2/T+1/T+0 with counterparty risk. Links: 14.1, 14.5.
- **8.3 repo-money-markets** ③ — Repo, reverse repo, SOFR, money-market funds, collateral chains; Sept 2019 repo spike. Demo: repo haircut calculator.
  Links: 9.1, 14.2 (tokenized MMFs), 10.3.
- **8.4 institutions-private-credit** ②③ — Who holds assets: asset managers, pensions, insurers, banks, sovereign funds, retail; shadow banking and private
  credit; who buys preferreds and converts (income funds, retail, hedge funds). Links: 17.2, 17.3, 19.2.

### Tier 3 — systems · Macro, Crises & Risk

**Stage 9 — Monetary Policy & Macro Liquidity**
- **9.1 fed-toolkit** ①③ — Interest on reserves, ON RRP, QE/QT mechanics, balance-sheet size, forward guidance; current stance and chair from facts file.
  Demo: Fed balance-sheet T-account with QE/QT buttons. Links: 1.3, 8.3, 9.3.
- **9.2 policy-transmission** ① — Channels: rates, credit, asset prices, FX, expectations; lags. Demo: policy shock propagation. Links: 4.3, 4.5, 12.4.
- **9.3 global-liquidity** ③④ — Liquidity measures (central-bank balance sheets, M2, TGA, RRP), why risk assets and BTC track liquidity, limits of the story.
  Demo: stylized liquidity vs risk-asset index. Links: 12.4, 16.2, 20.2.
- **9.4 fiscal-dominance** ①② — Debt sustainability (r vs g, primary balance), fiscal dominance, financial repression, implications for long
  bonds, gold and BTC. Demo: debt/GDP path simulator. Links: 3.3, 4.5, 20.1.
- **9.5 inflation-regimes** ① — 1970s, Volcker, the Great Moderation, 2021–23, supply shocks and tariffs; what regime shifts do to 60/40 and to BTC.
  Links: 11.2, 20.2.

**Stage 10 — Crises & Cycles**
- **10.1 anatomy-of-crisis** ③④ — Leverage + maturity mismatch + opaque assets → run; Diamond–Dybvig intuition; fire sales; lender of last resort.
  Demo: bank-run simulator. Links: 1.2, 10.2, 13.6.
- **10.2 case-2008** ②③ — Subprime, securitization, AIG, Lehman (Sept 15 2008), money-fund break, Fed facilities, TARP; Bitcoin's genesis block Jan 2009.
  Links: 12.1, 6.6.
- **10.3 rate-shock-cases** ①③ — March 2020 Treasury dysfunction/basis trade; UK LDI Sept 2022; SVB March 2023 (unrealized losses from duration).
  Demo: SVB-style balance sheet vs rate rise. Links: 4.4, 4.5, 7.4.
- **10.4 bubbles-reflexivity** ④ — Minsky's hedge/speculative/Ponzi finance, Soros's reflexivity, narratives; apply to mNAV premiums (preview 18.3).
  Demo: reflexive loop simulator. Links: 16.7, 18.3.
- **10.5 crypto-crises** ③④ — Mt. Gox 2014, ICO bust 2018, Terra/Luna May 2022, Celsius/3AC, FTX Nov 2022; lessons: custody, leverage, fake collateral.
  Links: 13.6, 15.5.

**Stage 11 — Portfolios & Risk Management**
- **11.1 diversification** ④ — Correlation, portfolio variance; adding a small volatile low-correlation asset. Demo: two-asset frontier (`port2Vol`).
  Links: 11.2, 12.4.
- **11.2 portfolio-construction** ④ — 60/40, risk parity, all-weather, 2022's stock–bond correlation flip; where BTC/preferreds could fit (framework only).
  Links: 9.5, 20.2.
- **11.3 risk-metrics** ④ — Volatility, drawdown, Sharpe, Sortino, VaR/ES, BTC's historical 70–80% drawdowns. Demo: seeded price path metrics.
  Links: 5.4, 12.4, 18.2.
- **11.4 position-sizing** ④ — Kelly, fractional Kelly, risk of ruin; volatility drag; why leverage on volatile assets kills. Links: 2.2, 16.4, 18.2.
- **11.5 behavioral-traps** ④ — FOMO, loss aversion, recency, overconfidence, narrative bias; checklist habits. Links: 10.4, 18.6, 20.3.

### Tier 4 — newfin · Bitcoin, DeFi & Tokenization

**Stage 12 — Bitcoin as a Financial Asset**
- **12.1 bitcoin-how** ③ — Ledger, blocks, proof of work, keys, self-custody vs custodians, why no central party is needed. Links: 1.5, 10.2, 12.2.
- **12.2 bitcoin-supply** ① — 21M cap, halvings (2012, 2016, 2020, Apr 2024; next ~2028), issuance schedule, stock-to-flow and its critiques.
  Demo: supply/issuance curve with halvings. Links: 1.4, 12.3.
- **12.3 bitcoin-valuation** ①④ — Digital gold (share of gold's market cap), monetary premium, network/Metcalfe, adoption S-curves, cost of
  production; honest critiques (no cash flows → no DCF). Demo: gold-parity / adoption scenario calculator. Links: 2.3, 15.3.
- **12.4 bitcoin-volatility** ④ — Vol history, the 4-year-cycle narrative, correlation with Nasdaq, liquidity and real rates; falling vol over time.
  Links: 9.3, 11.3, 16.4.
- **12.5 bitcoin-etfs** ③ — Jan 2024 spot ETFs, creation/redemption, custody, flows, IBIT's size; ETFs vs DATs preview. Links: 5.6, 15.5.
- **12.6 bitcoin-risks** ④ — Quantum, protocol/regulatory risk, the security budget after halvings, mining concentration, custody/exchange risk; mitigations.
  Links: 18.2, ∞.1.

**Stage 13 — DeFi**
- **13.1 defi-what** ③ — Smart contracts, composability, non-custodial, 24/7, permissionless; what it replaces and what it can't. Links: 8.1, 14.1.
- **13.2 stablecoins** ②③ — Fiat-backed (reserves in T-bills → issuers as large T-bill buyers), crypto-collateralized, algorithmic (Terra);
  the GENIUS Act; stablecoins as the dollar's new distribution. Demo: reserve composition & redemption run. Links: 3.4, 10.5, 14.5, 19.4.
- **13.3 amm-dex** ③④ — x·y=k, slippage, impermanent loss, LP fees. Demo: AMM swap (`ammSwap`). Links: 8.1.
- **13.4 defi-lending** ②④ — Over-collateralization, LTV, health factor, liquidation bots, utilization-based rate curves. Demo: health-factor sim.
  Links: 7.5, 16.5 (coverage thinking).
- **13.5 defi-yield** ① — Sources: borrowers, trading fees, MEV, emissions, basis/funding (delta-neutral synthetic dollars), tokenized T-bills;
  "if you can't find the source, you are the yield". Links: 2.4, 14.2, 17.4.
- **13.6 defi-risks** ③④ — Contract bugs, oracle manipulation, governance attacks, bridge hacks, depegs, regulation; a risk framework. Links: 10.5, 14.4.

**Stage 14 — Tokenization (high level)**
- **14.1 tokenization-why** ③ — A claim recorded on a blockchain; benefits (settlement, 24/7, programmability, fractional access, collateral mobility);
  the legal-claim caveat. Links: 8.2, 13.1. (Further: RWA Path.)
- **14.2 tokenized-treasuries** ①③ — BUIDL, BENJI, OUSG etc.; size from facts; use as on-chain collateral and stablecoin reserves. Links: 8.3, 13.5.
- **14.3 tokenized-stocks** ③ — Tokenized equities (Robinhood EU, xStocks, Nasdaq/DTCC/SEC developments from facts), 24/7 trading, what holders
  actually own; could DAT preferreds trade on-chain one day? Links: 8.1, 18.4.
- **14.4 tokenization-limits** ②③ — Legal wrappers, KYC/transfer restrictions, oracles, liquidity illusions, "token ≠ asset". Links: 13.6, 14.1.
- **14.5 convergence** ③ — Bank deposit tokens, stablecoins under GENIUS, tokenized MMFs as collateral, crypto on bank balance sheets; the new
  plumbing picture. Links: 1.2, 3.4, 19.4, 20.2.

### Tier 5 — dat · THE FOCUS: Digital Asset Treasury Companies (use `_research/dat-facts.md` for every current fact)

**Stage 15 — What a DAT Is**
- **15.1 dat-what** ②④ — A public company whose main strategy is holding BTC financed through capital markets; the balance sheet is the product; why the
  equity behaves like levered BTC; introduce Orange Corp (§0.2). Frame Lin's headline ③. Links: 5.1, 6.1, 16.1.
- **15.2 strategy-story** — Timeline from facts: Aug 2020 first purchase, converts, 21/21 and later plans, rename Feb 2025, preferred launches,
  USD reserve, 2026 events. Saylor's thesis (short, careful quotes). Demo: timeline with holdings growth. Links: 0.3, 16.3, 17.3.
- **15.3 why-dats-exist** ④ — Access (mandates that can't hold BTC can hold stocks/bonds), capital-markets arbitrage (sell equity at a premium,
  sell volatility via converts, sell yield via preferreds), leverage without margin calls; strongest bear critiques. Links: 7.3, 16.7.
- **15.4 dat-landscape** — Strategy, Strive, Metaplanet, Twenty One, Nakamoto, others; ETH/SOL treasuries; aggregate holdings; the 2025 boom and the
  late-2025/2026 shakeout (facts). Demo: sortable table of cited holdings (with as-of date).
- **15.5 dat-vs-etf** — Self-custody vs spot ETF vs DAT common vs DAT preferred: fees, leverage, counterparty/custody risk, tax, premium/discount,
  volatility, income. Demo: side-by-side outcome calculator under BTC scenarios. Links: 12.5, 10.5.
- **15.6 dat-accounting** ② — ASU 2023-08 fair value (earnings swing with BTC), the impairment era before, CAMT, non-GAAP KPIs; how to read a
  DAT 10-Q. Links: 5.2, 16.3.

**Stage 16 — The DAT Metrics Toolkit** (every formula must match `_fin.js`; note where company definitions differ)
- **16.1 btc-per-share** ② — BTC per share (fully diluted) as the core scoreboard; sats per share; Orange Corp = 10,000 sats/share. Links: 5.5, 2.2.
- **16.2 mnav** ②④ — mNAV definitions: basic market-cap, diluted, EV-based (Strategy's), why they differ; premium/discount drivers (growth
  expectations, volatility value, access, reflexivity); history of MSTR's premium (facts). Demo: mNAV calculator with definition toggle.
  Links: 5.3, 10.4, 16.7, 18.3.
- **16.3 btc-yield-gain** ② — Strategy's BTC Yield, BTC Gain, BTC $ Gain — exact definitions from facts; what they measure and don't (not a yield
  in the bond sense; critiques). Demo: compute from two quarterly snapshots. Links: 16.1, 16.7.
- **16.4 amplification** ④ — How debt and preferreds raise the common's BTC sensitivity; amplification as Strategy/Strive define it (facts);
  volatility drag and path dependence. Demo: amplification vs BTC move. Links: 11.4, 17.5.
- **16.5 btc-rating** ②④ — BTC Rating / asset coverage by layer: BTC NAV ÷ cumulative senior claims; comparison with credit ratings and bank LTV;
  what coverage can and can't protect against (a 70% drop turns 4x into 1.2x). Demo: coverage ladder with BTC price slider. Links: 4.6, 6.5, 17.6, 18.2.
- **16.6 dividend-coverage** ②③ — Annual interest+dividend obligations; sources of cash (ATM proceeds, USD reserve, BTC sales, operating business);
  months of coverage; Strategy's USD reserve (facts). Demo: coverage months under issuance-freeze scenarios. Links: 6.5, 18.2.
- **16.7 flywheel-math** ②④ — Issuing common above NAV is accretive to BTC per share, below 1x dilutive; preferreds/converts accretive if the
  asset outgrows the cost; the reflexive loop and how it reverses. Demo: issue-and-buy flywheel (`issueAndBuy`). Links: 5.5, 10.4, 18.3.

**Stage 17 — The Capital-Markets Toolkit**
- **17.1 atm-offerings** ② — What an ATM program is, execution, costs, market impact, disclosure (weekly 8-Ks), ATMs for common vs preferreds.
  Links: 5.5, 16.7.
- **17.2 dat-convertibles** ④ — Strategy's converts: low/zero coupons, high conversion premiums, who buys (convert-arb funds), puts/calls, what remains
  outstanding (facts). Demo: convert-arb P&L (long convert / short delta). Links: 6.4, 7.3.
- **17.3 strategy-preferreds** ②④ — Each series with a term-sheet table from facts (rate, cumulative?, stated amount, conversion, call, frequency,
  seniority). Why a family: segmenting investors by risk appetite. Demo: pick a series, see its claim and position in the stack.
  Links: 6.2, 6.3, 16.5.
- **17.4 strc-variable-rate** ①④ — STRC's monthly variable-rate mechanism aiming at a ~$100 price; engineered low duration (contrast 4.4); rate history
  from facts; comparison with money funds/T-bills/credit. Demo: rate-setting loop — price below par → rate up. Links: 4.4, 13.5, 18.1.
- **17.5 strive-sata** ②④ — Strive's thesis (preferred-only leverage, no debt), SATA terms and rate history (facts), the Semler acquisition, contrast
  with Strategy. Demo: Strive-like vs Strategy-like structures under BTC scenarios. Links: 16.4, 18.5.
- **17.6 seniority-in-practice** ② — Walk the stack (per facts: converts → senior pref → … → common) through BTC −30/−50/−70/−85%; recovery by layer;
  cumulative vs non-cumulative when dividends stop. Demo: waterfall with BTC slider (`waterfall`). Links: 6.1, 6.6, 16.5, 18.2.
- **17.7 preferred-tax-roc** — Return of capital: why distributions may be non-taxable ROC reducing cost basis (earnings & profits concept), what it
  means for investors (not tax advice; jurisdiction varies). Demo: ROC basis tracker. Links: 6.2, 15.6.

**Stage 18 — Assessing DAT Risk**
- **18.1 valuing-btc-preferreds** ①②④ — Current yield, yield to call, spread vs Treasuries/IG/HY, duration of a perpetual, call convexity, credit via
  coverage; how a rising 30-year yield hits perpetual preferreds (link 4.5). Demo: preferred calculator (price ↔ yield, duration, rate shock).
- **18.2 dat-stress-test** ④ — Scenarios: BTC −50/−80%, mNAV < 1, capital markets shut for 12–24 months; which obligations can be met from what.
  Demo: stress-test dashboard with Orange Corp. Links: 16.5, 16.6, 17.6.
- **18.3 mnav-compression** ④ — mNAV < 1: issuance stops being accretive; options (buybacks, selling BTC to fund buybacks, preferred issuance, pausing);
  "death spiral" claims vs structure (no margin loans, long-dated obligations). Late-2025/2026 episodes from facts. Links: 10.4, 16.7.
- **18.4 index-structural-risk** ③ — Index inclusion (S&P 500 criteria, MSCI's DAT consultation and outcome from facts), passive flows, governance
  (founder control, super-voting shares), key-person risk, regulatory/accounting risk. Links: 5.6, 15.6.
- **18.5 dat-comparison** — Strategy vs Strive vs Metaplanet vs others: holdings, BTC/share growth, mNAV, leverage, instruments, coverage, cost of
  capital, jurisdiction; ETH/SOL treasuries (staking yield vs BTC's none). Demo: scorecard. Links: 15.4, 17.5.
- **18.6 dat-checklist** — Ten questions: holdings & custody, BTC/share trend, mNAV & definition, leverage/amplification, coverage by layer, obligations
  & reserve, instruments & seniority, issuance capacity, governance, macro regime. Demo: interactive checklist producing a summary.

### Tier 6 — mastery · The AI Era & the Whole Picture

**Stage 19 — Finance in the AI Era**
- **19.1 ai-productivity-rates** ① — AI productivity boom → higher r* (investment demand) or lower (deflation)? Implications for the long end
  (link 4.5). Demo: r* scenario toggles.
- **19.2 ai-capex-financing** ②③ — Hyperscaler capex, bonds, SPVs, private credit, data-center ABS; the bubble debate, both sides (facts).
- **19.3 ai-in-markets** ④ — Algorithmic trading history, AI research agents, alpha decay, crowding risk, what edge remains (judgment, access, capital).
- **19.4 agentic-payments** ③ — Why AI agents need programmable money: stablecoins, x402, micropayments; KYC for agents; links 13.2, 14.5.
- **19.5 ai-deflation-scarcity** ①④ — Cheap intelligence as a deflationary force; labor share; which assets are scarce (compute, energy, land, BTC);
  balanced skeptic view.

**Stage 20 — The Whole Picture**
- **20.1 connect-the-dots** ①②③④ — Answer Lin's three headlines fully and connect them: deficits → term premium → 30y yield ↑ →
  discount rates & the debasement debate → demand for hard assets → BTC → DATs raise capital by selling yield (preferreds) priced against Treasuries
  → assessing them with BTC Rating & seniority → tokenization/DeFi as the plumbing that may one day carry these instruments. Heavy cross-referencing
  (aim ≥ 8). Demo: interactive causal chain.
- **20.2 macro-regimes** — Growth × inflation (and liquidity) quadrants; how bonds, stocks, gold, BTC, DAT common, DAT preferreds, stablecoin yields
  tend to behave in each (framework, historical tendencies, caveats). Demo: regime picker.
- **20.3 read-news-like-pro** — Five questions: what changed, vs expectations, which of the four ideas, who holds the risk (whose balance sheet), what's the
  second-order effect. Demo: practice headlines.
- **20.4 cheat-sheet** — All formulas (PV, YTM, duration, Fisher, Sharpe, Kelly, mNAV variants, BTC Yield, amplification, BTC Rating, months covered),
  key numbers, and terms. Demo: searchable formula/metric reference with live calculators.

### ∞ — Beyond
- **∞.1 open-questions** — Can BTC-backed credit become a real asset class? Will DAT premiums persist? Tokenized collateral in the core plumbing?
  Stablecoins vs banks? AI and rates? Present competing views.
- **∞.2 your-path** — Careers (credit analyst, DAT analyst, DeFi builder, tokenization, risk), skills, resources; learning roadmap across sister courses.
- **∞.3 capstone** — A guided full analysis: macro regime → rates → BTC → pick a DAT → metrics → capital stack → stress test → write-up.
  Demo: capstone builder that assembles the reader's inputs into a structured report.
