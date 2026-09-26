export default {
  id: "btc-rating",
  stage: 16,
  order: 5,
  title: "BTC 评级与资产覆盖：比特币能覆盖每一层几倍",
  difficulty: "dat",
  prereqs: ["leverage-coverage", "capital-stack"],

  oneLiner:
    "优先股股东最关心的问题是：**公司的比特币能把我这一层（连同排在我前面的所有人）覆盖几倍？**这就是 Strategy 的 **BTC Rating（BTC 评级）**：\\(\\dfrac{\\text{BTC 储备}}{\\text{本工具名义} + \\text{所有更优先工具} + \\text{同级中更早到期或可回售的工具}}\\)。橙子公司：可转债 6.7 倍、Orange-F 4.0 倍、Orange-D 3.3 倍；对应的 **BTC 地板价**是 1.5 万、2.5 万、3 万美元。这一节再往前走一步：用 **BTC Risk**（到久期末评级跌破 1 的概率）与 **BTC Credit**（弥补这一概率所需的信用利差）把倍数变成利差——并讲清它和 S&P 信用评级、银行 LTV 有何不同，能防什么、防不住什么。",

  intuition: `
你借给朋友 25 万，他拿一套价值 100 万的房子给你作保。你会觉得挺安心：房子值借款的 **4 倍**，房价要跌 **75%** 你才会亏钱。

如果房子前面还压着一笔 15 万的银行贷款——银行先拿钱、你后拿——那你真正的保障就要这样算：\\(\\dfrac{100\\ \\text{万}}{15\\ \\text{万} + \\text{你的 } 10\\ \\text{万}} = \\mathbf{4}\\times\\)。**覆盖倍数永远要按“我这一层 + 排在我前面的所有人”累计来算。**这是阶段 6.5 讲过的资产覆盖，也是阶段 6.1 楼层图的直接应用（观念②）。

Strategy 把这个思路做成了一个面向优先股投资者的指标：**BTC Rating（BTC 评级）**。它问的是：公司的比特币储备，能把这只证券（连同所有排在它前面的证券）覆盖几倍？

用阶段 15.1 的橙子公司（比特币 10 亿美元）：

- **可转债**（1.5 亿，最优先）：\\(\\dfrac{10}{1.5} \\approx \\mathbf{6.7}\\times\\)；
- **Orange-F**（1 亿高级优先股）：\\(\\dfrac{10}{1.5 + 1} = \\mathbf{4.0}\\times\\)；
- **Orange-D**（5,000 万次级优先股）：\\(\\dfrac{10}{1.5 + 1 + 0.5} \\approx \\mathbf{3.3}\\times\\)。

倍数可以直接翻译成一个价格：**BTC 地板价**——评级恰好等于 1 倍时的比特币价格。Orange-F 是 \\(\\dfrac{10\\ \\text{万}}{4.0} = \\mathbf{2.5}\\ \\text{万美元}\\)：比特币跌到 2.5 万，公司的币刚好只够付完可转债和 F 层。Orange-D 的地板价约 **3 万美元**。

听上去很安全——比特币跌 70% 才碰到 D 层的地板。但这一节要把“倍数”再往前推两步：

- **倍数会被价格吃掉。**覆盖倍数是按今天的币价算的。比特币跌 70%，F 层的 4.0 倍就只剩 **1.2 倍**。对一个历史上多次回撤 70%–80% 的资产（阶段 11.3），4 倍不是“固若金汤”，而是“能扛住一次典型的熊市底部”。
- **倍数要变成概率，概率要变成利差。**优先股是永续的，它关心的不是“今天覆盖几倍”，而是“在我持有的这些年里，覆盖跌破 1 倍的可能性有多大”。Strategy 用对数正态模型算出 **BTC Risk**（到久期末评级低于 1 的概率），再换算成 **BTC Credit**（补偿这一风险所需的信用利差）。我们能用 _fin.js 的公式，把 Strategy 公布的 STRF 108 个基点、STRC 59 个基点**复算出来**。

这一节主要落在**观念②（资产负债表与索取权）**与**观念④（风险与杠杆）**：它是阶段 16.4 放大倍数的“另一面”——普通股看到的是放大，优先股看到的是覆盖；它也把阶段 4.6 的信用利差（\\(\\text{预期损失} = \\text{违约概率} \\times \\text{违约损失率}\\)）搬到了比特币资产上。后面阶段 17.6 会让比特币一路下跌，看每一层实际拿回多少；阶段 18.2 会把它放进压力测试。本课只讲机制与分析框架，不构成投资建议。

**这一节，我们拆成五块：**

- **① 定义：BTC 评级按层累计**
- **② 橙子公司的评级阶梯与 BTC 地板价**
- **③ 从倍数到利差：BTC Risk、久期与 BTC Credit**
- **④ 真实数值：Strategy 的信用仪表盘**
- **⑤ 它能防什么、防不住什么：与信用评级和 LTV 对照**
`,

  mechanics: `
### ① 定义：BTC 评级按层累计

Strategy 对 BTC Rating 的定义（针对某一只债务或优先股工具）：

$$ \\text{BTC Rating} = \\frac{\\text{BTC 储备}}{\\text{累计索取权}}
$$ \\begin{aligned} \\text{累计索取权} &= \\text{该工具名义} + \\text{所有比它优先的工具名义} \\\\ &\\quad + \\text{与它同级但更早到期或可更早回售的工具名义} \\end{aligned}

其中 \\(\\text{BTC 储备} = \\text{持币量} \\times \\text{币价}\\)。Strategy 同时声明：BTC Rating “does not represent a rating from any rating agency”（不代表任何评级机构的评级）。

三个细节决定了它是个“正确的”覆盖指标：

- **累计**：分母包括所有更优先的层。只算本层会严重高估——Orange-D 只有 5,000 万，单独算是 20 倍，但它前面压着 2.5 亿。
- **同级中更早到期者**：同一清偿顺序里，谁先到期或先可回售，谁就先拿到钱，所以要算进后到期者的分母。
- **它是 _fin.js 里 coverageByLayer 的特例**：资产用比特币市值，层按官方清偿顺序排。

两个等价的读法：

$$ \\text{资产可跌幅度} = 1 - \\frac{1}{\\text{BTC Rating}}
$$ \\text{等价贷款价值比}\\ (\\mathrm{LTV}) = \\frac{1}{\\text{BTC Rating}}

\\(4.0\\times \\iff \\text{资产可跌 } 75\\% \\iff \\mathrm{LTV} = 25\\%\\)。

### ② 橙子公司的评级阶梯与 BTC 地板价

$$ \\text{BTC 地板价} = \\frac{\\text{当前币价}}{\\text{BTC Rating}}

<table class="pm">
<tr><th>层（从优先到劣后）</th><th>本层名义</th><th>累计索取权</th><th>BTC 评级</th><th>BTC 地板价</th><th>比特币可跌</th></tr>
<tr><td>可转债（0% 票息）</td><td>1.5 亿</td><td>1.5 亿</td><td><b>6.7 倍</b></td><td>1.5 万美元</td><td>85%</td></tr>
<tr><td>Orange-F（10% 累积，高级）</td><td>1 亿</td><td>2.5 亿</td><td><b>4.0 倍</b></td><td>2.5 万美元</td><td>75%</td></tr>
<tr><td>Orange-D（10% 非累积，次级）</td><td>5,000 万</td><td>3 亿</td><td><b>3.3 倍</b></td><td>3 万美元</td><td>70%</td></tr>
</table>

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">橙子公司的覆盖阶梯：比特币 10 亿 vs 累计索取权</text><line x1="40" y1="250" x2="620" y2="250" stroke="var(--line)"/><rect x="60" y="50" width="90" height="200" fill="var(--btc-soft)" stroke="var(--btc)" stroke-width="2"/><text x="105" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--btc)">BTC 10 亿（币价 10 万）</text><rect x="60" y="190" width="90" height="60" fill="none" stroke="var(--red)" stroke-width="1.5" stroke-dasharray="5 3"/><text x="105" y="184" text-anchor="middle" font-size="10" fill="var(--red)">跌 70% 后：3 亿</text><rect x="230" y="220" width="70" height="30" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="265" y="239" text-anchor="middle" font-size="11" fill="var(--ink)">可转债 1.5</text><rect x="330" y="200" width="70" height="50" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="365" y="214" text-anchor="middle" font-size="10" fill="var(--ink)">+F 1.0</text><text x="365" y="239" text-anchor="middle" font-size="10" fill="var(--muted)">累计 2.5</text><rect x="430" y="190" width="70" height="60" fill="var(--red-soft)" stroke="var(--red)"/><text x="465" y="204" text-anchor="middle" font-size="10" fill="var(--ink)">+D 0.5</text><text x="465" y="239" text-anchor="middle" font-size="10" fill="var(--muted)">累计 3.0</text><text x="265" y="212" text-anchor="middle" font-size="12" font-weight="700" fill="var(--blue)">6.7 倍</text><text x="365" y="192" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">4.0 倍</text><text x="465" y="182" text-anchor="middle" font-size="12" font-weight="700" fill="var(--red)">3.3 倍</text><text x="265" y="268" text-anchor="middle" font-size="10" fill="var(--ink)">地板价 1.5 万</text><text x="365" y="268" text-anchor="middle" font-size="10" fill="var(--ink)">地板价 2.5 万</text><text x="465" y="268" text-anchor="middle" font-size="10" fill="var(--ink)">地板价 3 万</text><text x="560" y="120" text-anchor="middle" font-size="11" fill="var(--ink)">比特币 −70%：</text><text x="560" y="138" text-anchor="middle" font-size="11" fill="var(--ink)">可转债 2.0 倍</text><text x="560" y="156" text-anchor="middle" font-size="11" fill="var(--orange-ink)">F 层 1.2 倍</text><text x="560" y="174" text-anchor="middle" font-size="11" fill="var(--red)">D 层 1.0 倍</text><text x="320" y="286" text-anchor="middle" font-size="10" fill="var(--muted)">单位：亿美元；柱高按金额比例（1 亿 = 20 像素）</text></svg><figcaption>同样的 10 亿比特币，对越劣后的层覆盖越薄。比特币跌 70%（红色虚线框为 3 亿），F 层从 4.0 倍变成 1.2 倍，D 层刚好 1.0 倍、碰到地板。</figcaption></figure>

**一个口径细节**：Strategy 自己的计算桥（2026-08 简报）把美元资产**与债务相抵**。若橙子公司也把 3,000 万现金先抵掉可转债，分母依次变为 1.2 亿、2.2 亿、2.7 亿，评级变为 8.3、4.5、3.7 倍，地板价约 1.2 万、2.2 万、2.7 万美元。本课正文统一使用不抵现金的 6.7 / 4.0 / 3.3 倍，演示里可以切换。

### ③ 从倍数到利差：BTC Risk、久期与 BTC Credit

倍数是“今天”的快照。永续优先股的持有人要问的是：**在我的久期之内，覆盖跌破 1 倍的概率有多大？需要多少额外收益才值得承担？**Strategy 的三个指标就是这样串起来的：

- **Duration（久期）**：优先股用麦考利久期；可转债用距到期或回售日（取较早者）的时间。一只按面值交易、股息率 \\(y\\) 的永续优先股，年付息时麦考利久期 \\(= \\dfrac{1 + y}{y}\\)：\\(y = 10\\% \\to \\mathbf{11}\\ \\text{年}\\)（阶段 4.4：永续债的久期约为 \\(1/y\\)）。Strategy 披露 STRC 的久期为 **8.1 年**（2026-08-23）。
- **BTC Risk**：在对数正态的比特币价格模型下（假设一个年化回报 ARR 与波动率），该工具的 BTC 评级在其久期末**低于 1 倍的概率**。2026 年 8 月的简报假设 ARR 10%、波动率 40%；2025 年 12 月假设 ARR 10%、波动率 45%。
- **BTC Credit**：“the credit spread necessary to offset BTC Risk”（抵消 BTC Risk 所需的信用利差）：

$$ \\text{BTC Risk} = N\\!\\left( \\frac{\\ln(1/R) - \\left(\\mu - \\frac{\\sigma^{2}}{2}\\right) T}{\\sigma \\sqrt{T}} \\right)
$$ \\text{BTC Credit} = \\frac{-\\ln(1 - \\text{BTC Risk})}{\\text{久期}}

其中 \\(R\\) 为 BTC 评级，\\(\\mu\\) 为假设回报，\\(\\sigma\\) 为波动率，\\(T\\) 为久期，\\(N(\\cdot)\\) 为标准正态分布函数（_fin.js 的 btcRiskProb 与 btcCredit）。BTC Credit 的直观含义：如果到期时以 BTC Risk 的概率“全部损失”、否则全额拿回，那么每年多要 \\(s\\) 的利差，使 \\(e^{-sT} = 1 - \\text{BTC Risk}\\)——这是阶段 4.6 “利差补偿预期损失”的连续时间版本（而且假设回收率为零，偏保守）。

**用橙子公司算一遍**（ARR 10%、波动率 40%）：

<table class="pm">
<tr><th>层</th><th>BTC 评级</th><th>久期（假设）</th><th>BTC Risk</th><th>BTC Credit</th></tr>
<tr><td>可转债</td><td>6.7 倍</td><td>5 年（到回售日）</td><td>约 1.3%</td><td>约 26 个基点</td></tr>
<tr><td>Orange-F</td><td>4.0 倍</td><td>11 年</td><td>约 11.3%</td><td>约 109 个基点</td></tr>
<tr><td>Orange-D</td><td>3.3 倍</td><td>11 年</td><td>约 14.2%</td><td>约 139 个基点</td></tr>
</table>

**和 Strategy 公布的数字对一对**（这里把 ARR 直接当作模型的漂移项 μ）：

- STRF，2025-11-28：评级 6.2 倍、久期 11.1 年、波动率 45% → 我们算得 BTC Risk 约 11.4%、BTC Credit 约 109 个基点；Strategy 公布 BTC Risk 11.30%、BTC Credit **108 个基点**。用它公布的 11.30% 直接代入：\\(\\dfrac{-\\ln(0.887)}{11.1} \\approx 1.08\\%\\)，**完全吻合**。
- STRC，2026-08-23：评级 5.74 倍、久期 8.1 年、波动率 40% → 我们算得 BTC Credit 约 **59 个基点**；Strategy 公布 **59 个基点**。

模型能复算，说明公式透明；但**结论完全取决于假设**：把 ARR 从 10% 降到 0%，或把波动率从 40% 提到 60%，BTC Risk 会成倍上升（演示里可以自己试）。

### ④ 真实数值：Strategy 的信用仪表盘

2025-11-28（假设币价 9.1 万美元）Strategy 公布的整张表：

<table class="pm">
<tr><th>工具</th><th>名义</th><th>BTC 评级</th><th>BTC Credit</th></tr>
<tr><td>债务（可转债等）</td><td>82.14 亿美元</td><td>7.2 倍</td><td>5 个基点</td></tr>
<tr><td>STRF</td><td>12.68 亿美元</td><td>6.2 倍</td><td>108 个基点</td></tr>
<tr><td>STRC</td><td>29.59 亿美元</td><td>4.8 倍</td><td>149 个基点</td></tr>
<tr><td>STRE</td><td>9.00 亿美元</td><td>4.4 倍</td><td>164 个基点</td></tr>
<tr><td>STRK</td><td>13.97 亿美元</td><td>4.0 倍</td><td>178 个基点</td></tr>
<tr><td>STRD</td><td>12.55 亿美元</td><td>3.7 倍</td><td>209 个基点</td></tr>
</table>

官方的清偿顺序是：债务与子公司负债 > STRF > STRC > STRE、STRK、STRD（初级优先股）> MSTR 普通股。**STRE、STRK、STRD 三者之间的相对顺序并无原文确认**；上表按 Strategy 自己的累计口径排列，暗含 STRE → STRK → STRD 的计算顺序。

2026 年 8 月的数据：STRC 的 BTC 评级在 2026-08-10 为 **4.0 倍**、2026-08-23 为 **5.7 倍**。后者的计算桥（单位：亿美元；币价 77,004 美元）与对应的 **BTC 地板价**：

$$
\\text{BTC Rating}_{\\text{STRC}} = \\frac{647.18}{\\underbrace{67.14}_{\\text{债务}} - \\underbrace{66.9}_{\\text{美元资产}} + \\underbrace{12.84}_{\\text{STRF}} + \\underbrace{99.72}_{\\text{STRC}}} = \\frac{647.18}{112.8} \\approx 5.74\\times
\\text{BTC 地板价} = \\frac{77{,}004}{5.74} \\approx \\mathbf{13{,}400}\\ \\text{美元}
$$

BTC Credit 从 112 个基点降到 **59 个基点**。两周之内评级从 4.0 升到 5.7，主要因为美元资产大增（USD Reserve 51.0 亿 + 新设 USD Cash 15.9 亿），在 Strategy 的桥接里被用来抵消债务。STRK 与 STRD 在 2026-08-07 分别为 **3.4 倍**与 **3.2 倍**。

另外，Strategy 在 2025 年 12 月用过一套后来停用的术语（如 “BTC Base Level”——持币价值等于“债务本金减现金”时的币价，当时为 1.04 万美元；“Loan to Value”——\\(\\text{净债务} \\div \\text{BTC 储备}\\)，当时为 11%），读旧资料时会遇到。

### ⑤ 它能防什么、防不住什么：与信用评级和 LTV 对照

<table class="pm">
<tr><th></th><th>BTC 评级</th><th>S&P 信用评级</th><th>银行 / DeFi 的 LTV</th></tr>
<tr><td>看什么</td><td>比特币市值对累计索取权的倍数</td><td>业务、现金流、流动性、治理、资本结构的综合判断</td><td>\\(\\dfrac{\\text{贷款}}{\\text{抵押品}}\\)</td></tr>
<tr><td>Strategy 的例子</td><td>STRC 5.7 倍（2026-08-23）</td><td>发行人评级 “B-”（2025-10-27 授予，2025 年 12 月维持，展望稳定）</td><td>\\(4.0\\times \\iff \\mathrm{LTV} = 25\\%\\)</td></tr>
<tr><td>越线后会怎样</td><td>什么也不会自动发生：优先股无担保、无追保</td><td>评级下调影响融资成本</td><td>追加保证金或自动清算（阶段 7.5、阶段 13.4）</td></tr>
</table>

S&P 给 Strategy 的是 B-（投机级），理由包括美元储备是“credit positive”，但业务狭窄、经营现金流很少。**BTC 评级 5.7 倍与 S&P 的 B- 并不矛盾**：前者只量资产覆盖，后者还看现金流与再融资能力。

BTC 评级**能**告诉你：在比特币缓慢下跌的情况下，这一层还有多厚的垫子；它随发行新的优先层如何变薄；不同系列之间的相对安全度。

它**防不住**的：

- **跳空与尾部风险**：对数正态模型低估了比特币的肥尾；波动率不是常数。
- **变现折价**：84.6 万枚比特币（2026-09-20）无法按屏幕价格一次卖出，清算时的实际价值低于“BTC 储备”。
- **股息对分子的侵蚀**：每年的利息与股息如果靠卖币支付，分子会逐年下降。Strategy 的 **BTC Floor ARR**（在加权平均久期内、付完利息股息后仍维持 1.0 倍覆盖所需的最低恒定年化回报）在 2026-08-23 为 **−15.64%**，就是把这一点算进去的版本（阶段 16.6）。
- **新的优先层**：再发 STRF（排在 STRC 前面）会直接降低 STRC 及以下各层的评级。
- **法律现实**：优先股是永续的股权，不是债；它没有抵押、没有到期日，覆盖再低，持有人也无法强制公司做任何事（阶段 17.6、阶段 18.2）。
- **支付能力 ≠ 资产覆盖**：覆盖 5 倍，不代表下个月的股息一定能付——那要看现金从哪里来（阶段 16.6）。

**结论：BTC 评级是把阶段 6.5 的资产覆盖装在比特币上，再用阶段 4.6 的信用利差语言表达出来。**它透明、可复算，但一切取决于比特币价格与模型假设。读它时，同时读三样东西：假设的 ARR 与波动率、美元资产是否被抵扣、以及它排在谁后面。本课只讲机制与分析框架，不构成投资建议。
`,

  demo: "btc-rating",

  analogy: `
想象一座**多层停车楼**，底下是一整块地基——比特币。每一层停着一类债权人：一楼是可转债，二楼是 F 层优先股，三楼是 D 层优先股，楼顶天台才是普通股。

**BTC 评级**问的是：地基能撑起“这一层加上下面所有层”的几倍重量？一楼 6.7 倍、二楼 4.0 倍、三楼 3.3 倍——越往上，要撑的累计重量越大，余量越小。

**BTC 地板价**问的是：地基下沉到什么程度，这一层会开始“悬空”？三楼的地板是地基下沉 70%。

**BTC Risk** 问的是：在这栋楼的使用年限里（久期），地基沉到那条线以下的概率有多大——这取决于你对地质（比特币的回报与波动）的假设。**BTC Credit** 则是保险费：为了承担这个概率，你每年该多收多少“租金”。

但这栋楼有两个特点要记住：楼里住户每年都要从地基上挖一点土付房租（股息）；而且这栋楼没有“自动疏散系统”——地基沉到危险线，也不会有人强制清场，大家只能等。
`,

  misconceptions: [
    "**“BTC 评级 4.0 倍就像信用评级 AA，很安全。”** —— 它不是任何评级机构的评级，只是资产覆盖倍数。比特币跌 70%，4.0 倍就只剩 1.2 倍；同一时期 S&P 给 Strategy 的发行人评级是 B-。",
    "**“算覆盖只要看本层的名义金额。”** —— 必须按本层加上所有更优先层累计。Orange-D 单独算是 20 倍，累计算只有 3.3 倍。",
    "**“BTC Credit 是 Strategy 实际支付的利差。”** —— 它是模型算出的“补偿 BTC Risk 所需的利差”，依赖 ARR 与波动率假设，并假设回收率为零。实际利差由市场价格决定，两者可以差很多。",
    "**“覆盖跌破 1 倍，优先股股东就能拿走比特币。”** —— 优先股无担保、永续、没有追保或强制清算权。覆盖只描述“清算时理论上能拿回多少”，不赋予任何触发权利。",
    "**“公司发新的优先股，不影响老优先股的评级。”** —— 如果新工具排在前面（例如增发 STRF），所有更劣后层的分母都会变大、评级变低；即使同级，也会影响更晚到期者。",
  ],

  quiz: [
    {
      q: "橙子公司比特币 10 亿；可转债 1.5 亿 > Orange-F 1 亿 > Orange-D 0.5 亿。Orange-F 的 BTC 评级是多少？",
      options: [
        "10 倍",
        "6.7 倍",
        "4.0 倍",
        "3.3 倍",
      ],
      answer: 2,
      explain: "按层累计：\\(\\dfrac{10}{1.5 + 1} = \\mathbf{4.0}\\times\\)。6.7 倍是可转债层，3.3 倍是 D 层，10 倍是只算本层的错误算法。",
    },
    {
      q: "比特币价格 10 万美元时 Orange-F 的 BTC 评级为 4.0 倍。它的 BTC 地板价是多少？",
      options: [
        "4 万美元",
        "2.5 万美元",
        "7.5 万美元",
        "1 万美元",
      ],
      answer: 1,
      explain: "\\(\\text{地板价} = \\dfrac{\\text{币价}}{\\text{评级}} = \\dfrac{10\\ \\text{万}}{4.0} = \\mathbf{2.5}\\ \\text{万美元}\\)：比特币跌 75% 时，F 层的覆盖恰好是 1 倍。",
    },
    {
      q: "某优先股 BTC Risk 为 10%、久期 10 年。按 Strategy 的公式，BTC Credit 约为多少？",
      options: [
        "约 105 个基点",
        "约 10 个基点",
        "约 1,000 个基点",
        "约 50 个基点",
      ],
      answer: 0,
      explain: "\\(\\text{BTC Credit} = \\dfrac{-\\ln(1 - 0.10)}{10} = \\dfrac{0.1054}{10} \\approx \\mathbf{1.05\\%}\\)，约 105 个基点。",
    },
    {
      q: "2026-08-10 至 08-23，STRC 的 BTC 评级从 4.0 倍升到 5.7 倍。按 Strategy 的计算桥，主要原因是什么？",
      options: [
        "比特币价格翻倍",
        "STRF 全部被赎回",
        "S&P 上调了评级",
        "美元资产大增，并在计算桥中与债务相抵，使 STRC 的累计分母变小",
      ],
      answer: 3,
      explain: "计算桥：\\(\\dfrac{647.18}{67.14 - \\mathbf{66.9} + 12.84 + 99.72} \\approx 5.74\\times\\)。USD Reserve 51.0 亿 + USD Cash 15.9 亿几乎抵掉了全部债务。",
    },
    {
      q: "下列哪一项是 BTC 评级**无法**反映的风险？",
      options: [
        "发行更优先的新工具会稀释覆盖",
        "比特币价格下跌会降低覆盖",
        "大量比特币无法按屏幕价格一次卖出的变现折价，以及优先股没有追保或强制清算权",
        "同级中更早到期的工具要先拿钱",
      ],
      answer: 2,
      explain: "前两项与第四项都已体现在定义或计算中；**变现折价**与**法律上的无触发权**不在倍数里。倍数按屏幕价格计，也不会让持有人获得任何强制权利。",
    },
  ],

  further: [
    { label: "Strategy 2025 年公司更新演示（2025-12-01，BTC Rating、BTC Credit 全表）", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312525303157/d69948dex992.htm" },
    { label: "Strategy 2026-08-24 投资者简报 FWP（STRC 的 BTC Rating、地板价、BTC Risk 假设）", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strategy 官网：信用仪表盘（以官方最新披露为准）", url: "https://www.strategy.com/" },
    { label: "S&P 维持 Strategy “B-” 评级的报道（2025-12-16）", url: "https://www.investing.com/news/stock-market-news/strategy-inc-maintains-b-rating-from-sp-global-outlook-stable-93CH-4411504" },
  ],
};
