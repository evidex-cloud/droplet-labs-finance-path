export default {
  id: "btc-yield-gain",
  stage: 16,
  order: 3,
  title: "BTC Yield、BTC Gain 与 BTC $ Gain：拆解 Strategy 的核心 KPI",
  difficulty: "dat",
  prereqs: ["btc-per-share"],

  oneLiner:
    "Strategy 的三大 KPI 其实是一个数的三种说法：**BTC Yield** = 每股比特币（按假设稀释股数）一段时间内的百分比变化；**BTC Gain** = 期初持币量 × BTC Yield；**BTC $ Gain** = BTC Gain × 比特币市价。这一节逐字引用官方定义，讲清 2026 年起“各季度相加等于年初至今”的新口径，用橙子公司的五种融资动作把它们算一遍，列出 Strategy 与 Strive 的真实数值——再说清它们**不**衡量什么：它不是债券意义上的收益率，也不扣优先索取权与融资成本。",

  intuition: `
一个农场主年初有 100 头牛，全家 4 口人，每人名下 25 头。年底农场有 130 头牛——但中间他又接纳了 1 个合伙人入股，现在 5 个人分，每人 26 头。

你会说这一年“牛的收益率”是多少？如果看总数，是 +30%；可对原来每个家庭成员来说，自己名下只多了 1 头，**+4%**。这 4% 才是真正属于老股东的增长。

**BTC Yield** 就是这样一个数：它不看公司的比特币总量涨了多少，而看**每股比特币**（阶段 16.1）涨了多少。Strategy 把它作为头号 KPI，还配了两个“翻译”：

- **BTC Gain**：把这个百分比换算成“个数”——期初持币量 × BTC Yield。农场的例子里就是 100 × 4% = 4 头牛：相当于**如果不接纳新合伙人**，老股东凭空多得了 4 头牛。
- **BTC $ Gain**：再把个数换算成美元——BTC Gain × 比特币价格。

用阶段 15.1 的橙子公司：以 15 美元（市值口径 mNAV 1.5）增发 1,000 万股、募得 1.5 亿美元、买入 1,500 个比特币。比特币从 10,000 变成 11,500，股数从 1 亿变成 1.1 亿，每股比特币从 10,000 聪升到约 10,455 聪：**BTC Yield ≈ +4.5%**；BTC Gain = 10,000 × 4.5% ≈ **455 个比特币**；BTC $ Gain ≈ **4,550 万美元**。

注意：公司买了 1,500 个币，BTC Gain 却只有约 455 个。剩下约 1,045 个去哪了？它们属于新进来的股东（1,000 万 ÷ 1.1 亿 × 11,500 ≈ 1,045）。**BTC Gain 数的是“老股东多得了多少”，不是“公司多买了多少”。**这正是这个指标的用意，也是它比“持币总量”诚实的地方。

但这个“收益率”有几个一定要知道的特点：

- 它**不是**债券意义上的收益率——没有任何现金流入你的口袋。Strategy 自己也说它 “not equivalent to 'yield' in the traditional financial context”（不等同于传统金融语境中的“收益率”）。
- 它是**毛口径**：用优先股或债务买来的币同样计入 BTC Yield，可股东同时背上了新的优先索取权。
- 它**不扣融资成本**：优先股每年 10% 以上的股息，不会出现在 BTC Yield 里——直到公司卖币付股息那天，它才以“负收益”的形式露面。
- 2026 年起它的季度口径变了：每个季度都相对**年初**来计，所以各季度数字**相加**等于年初至今。

这一节落在**观念②（资产负债表与索取权）**——它是每股索取权背后资产的变化率；同时它借用了**观念①**里“收益率”这个词，所以我们要格外小心它和阶段 4.2 那个真正的收益率有什么不同。它的上游是阶段 16.1 的每股比特币，下游是阶段 16.7 的飞轮数学：BTC Yield 的大小，几乎完全由发行时的 mNAV 和融资方式决定。本课只讲机制与分析框架，不构成投资建议。

**这一节，我们拆成五块：**

- **① 三个官方定义，逐字读**
- **② 2026 年的季度口径：相加而非连乘**
- **③ 橙子公司的五种动作：谁提高、谁拉低 BTC Yield**
- **④ 真实数值：Strategy 与 Strive**
- **⑤ 它不衡量什么：批评与正确的读法**
`,

  mechanics: `
### ① 三个官方定义，逐字读

Strategy 在 2026 年第二季度 10-Q 中的定义（引号内为原文）：

- **BTC Yield**：“the percentage change in BPS (in Sats) from the beginning of a period to the end of a period”——每股比特币（以聪计）从期初到期末的百分比变化。
- **BPS** 的分母是**假设稀释股数**：基本股 + 全部可转债与可转换优先股（STRK）假设转股 + 全部期权、RSU、PSU，**无论价内价外**（阶段 16.1）。
- **BTC Gain**：“the gross number of bitcoins held by the Company at the beginning of a period multiplied by the BTC Yield for such period”——期初持有的比特币总数 × 该期 BTC Yield。
- **BTC $ Gain**：“the dollar value of the BTC Gain calculated by multiplying the BTC Gain by the market price of bitcoin as reported on the Coinbase exchange as of the applicable measurement time”——BTC Gain × Coinbase 在相应计量时点报出的比特币市价。

$$ BTC Yield = BPS（期末）÷ BPS（期初）− 1
$$ BTC Gain = 期初持币量 × BTC Yield
$$ BTC $ Gain = BTC Gain × 比特币市价（计量时点）

BTC Gain 的直观含义：**假设股数不变，要让每股比特币增长同样的百分比，公司需要“白得”多少个币。**这就是为什么它用**期初**持币量乘：它把“每股的增长”折算回“老股东的币”。

Strive 用的是同一套定义：BTC Yield 为“percentage change in bitcoin per share from the beginning of a period to the end of a period”，BTC Gain 与 BTC $ Gain 与 Strategy 定义相同；只是它的分母是“假设完全稀释股数”，并排除了传统认股权证。

### ② 2026 年的季度口径：相加而非连乘

从 2026 年起，Strategy 的 10-Q 按季度列示 BTC Yield，并让各季度**加总**等于年初至今（YTD）。做法是：**每个季度都相对年初的 BPS 来计量**。10-Q 自己给的例子：

<table class="pm">
<tr><th>时点</th><th>BPS</th><th>2026 口径（相对年初）</th><th>传统“环比”口径</th></tr>
<tr><td>年初</td><td>100</td><td>—</td><td>—</td></tr>
<tr><td>第一季度末</td><td>110</td><td>Q1 = (110 − 100) ÷ 100 = <b>10%</b></td><td>10%</td></tr>
<tr><td>第二季度末</td><td>125</td><td>Q2 = (125 − 110) ÷ 100 = <b>15%</b></td><td>125 ÷ 110 − 1 ≈ 13.6%</td></tr>
<tr><td>年初至今</td><td>—</td><td>10% + 15% = <b>25%</b></td><td>1.10 × 1.136 − 1 = 25%</td></tr>
</table>

两种口径的年度结果一样，但季度数字不同：**2026 口径的季度数可以直接相加**，而环比口径要连乘。读 Strategy 2026 年的季度 BTC Yield 时，记住它的分母是年初 BPS。按这一口径，Strategy 2026 年上半年为 **8.1%**、第二季度为 **5.0%**，于是第一季度约为 **3.1%**（推算）。

这个口径也意味着：**一个季度的 BTC Yield 可以是负的**。如果第三季度卖币或者发股不买币，年初至今的数字就会从上半年的水平回落——Strategy 披露的 2026 年初至 7 月 26 日 BTC Yield 为 **4.5%**，低于上半年的 8.1%，原因是 7 月的卖币以及不用于买币的股票发行。

### ③ 橙子公司的五种动作：谁提高、谁拉低 BTC Yield

起点：10,000 BTC、1 亿股（为与课程统一，这里用基本股数；按 Strategy 的假设稀释股数 1.06 亿计算，结果会略有不同，见下文）、每股 10,000 聪、币价 10 万美元。

<table class="pm">
<tr><th>动作</th><th>期末持币 / 股数</th><th>BTC Yield</th><th>BTC Gain</th><th>BTC $ Gain</th></tr>
<tr><td>A. 以 15 美元（mNAV 1.5）增发 1,000 万股买币</td><td>11,500 / 1.1 亿</td><td><b>+4.5%</b></td><td>+455 BTC</td><td>+4,550 万美元</td></tr>
<tr><td>B. 以 8 美元（mNAV 0.8）增发 1,000 万股买币</td><td>10,800 / 1.1 亿</td><td><b>−1.8%</b></td><td>−182 BTC</td><td>−1,820 万美元</td></tr>
<tr><td>C. 发 1 亿美元优先股买币</td><td>11,000 / 1 亿</td><td><b>+10.0%</b></td><td>+1,000 BTC</td><td>+1 亿美元</td></tr>
<tr><td>D. 卖 150 BTC 支付一年优先股股息（1,500 万）</td><td>9,850 / 1 亿</td><td><b>−1.5%</b></td><td>−150 BTC</td><td>−1,500 万美元</td></tr>
<tr><td>E. 以 15 美元增发 200 万股、3,000 万美元存为美元储备</td><td>10,000 / 1.02 亿</td><td><b>−2.0%</b></td><td>−196 BTC</td><td>−1,960 万美元</td></tr>
</table>

<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">橙子公司五种动作的 BTC Yield（百分比）</text><line x1="60" y1="150" x2="610" y2="150" stroke="var(--ink)" stroke-width="1"/><text x="54" y="154" text-anchor="end" font-size="10" fill="var(--muted)">0</text><text x="54" y="54" text-anchor="end" font-size="10" fill="var(--muted)">+10%</text><line x1="60" y1="50" x2="610" y2="50" stroke="var(--line)" stroke-dasharray="3 3"/><rect x="90" y="105" width="70" height="45" fill="var(--green)" opacity=".75"/><text x="125" y="99" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">+4.5%</text><rect x="195" y="150" width="70" height="18" fill="var(--red)" opacity=".75"/><text x="230" y="182" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">−1.8%</text><rect x="300" y="50" width="70" height="100" fill="var(--btc)" opacity=".6" stroke="var(--btc)" stroke-dasharray="4 3"/><text x="335" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">+10%*</text><rect x="405" y="150" width="70" height="15" fill="var(--red)" opacity=".75"/><text x="440" y="180" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">−1.5%</text><rect x="510" y="150" width="70" height="20" fill="var(--red)" opacity=".75"/><text x="545" y="184" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">−2.0%</text><text x="125" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">A 溢价发股</text><text x="230" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">B 折价发股</text><text x="335" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">C 优先股买币</text><text x="440" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">D 卖币付息</text><text x="545" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">E 发股存现金</text><text x="320" y="244" text-anchor="middle" font-size="10" fill="var(--muted)">* C 的 +10% 是毛口径：新增 1 亿美元优先索取权，每股净比特币在发行时点不变</text></svg><figcaption>BTC Yield 奖励“以溢价发股买币”和“用优先股买币”，惩罚折价发股、卖币付息，也惩罚“发股攒现金”——哪怕是以溢价发股。</figcaption></figure>

几个值得停下来想的地方：

- **A 与 B 的分界线是 mNAV = 1**。以高于每股比特币净值的价格发股（mNAV > 1），BTC Yield 为正；低于则为负。阶段 16.7 会把这条线严格推出来。
- **C 的 +10% 最“好看”，也最需要警惕**。它是毛口径：公司多了 1,000 个币，也多了 1 亿美元、每年 1,000 万股息的优先索取权。每股**净**比特币在发行那一刻一分没变（阶段 16.1）。Strategy 自己也提醒：优先股与债务排在普通股之前，这种“收益”没有计入新的优先索取权。
- **E 很反直觉**：以 1.5 倍溢价发股，BTC Yield 却是负的——因为钱没有变成比特币。这就是为什么 Strategy 2025 年 12 月起为建立美元储备而卖出普通股的时期，BTC Yield 会被拉低。**BTC Yield 只认比特币，不认美元**，哪怕那些美元是为了保护优先股股息而存的（阶段 16.6）。
- **分母口径的影响**：动作 A 若按假设稀释股数（1.06 亿 → 1.16 亿）计算，BTC Yield 约 +5.1% 而不是 +4.5%——因为那 600 万可转债股是固定的，新发股票在更大的分母上“稀释”得更少。**同一笔交易，换个分母，KPI 就不同。**

### ④ 真实数值：Strategy 与 Strive

Strategy 披露的 KPI（10-K、10-Q 与业绩新闻稿）：

<table class="pm">
<tr><th>期间</th><th>BTC Yield</th><th>BTC Gain</th><th>BTC $ Gain</th></tr>
<tr><td>2024 全年</td><td>74.3%</td><td>140,631 BTC</td><td>131.3 亿美元</td></tr>
<tr><td>2025 全年</td><td>22.8%</td><td>101,873 BTC</td><td>89.15 亿美元</td></tr>
<tr><td>2026 年第二季度</td><td>5.0%</td><td>37,733 BTC</td><td>22.15 亿美元</td></tr>
<tr><td>2026 年上半年</td><td>8.1%</td><td>54,625 BTC</td><td>32.07 亿美元</td></tr>
<tr><td>2026 年初至 7 月 26 日</td><td>4.5%</td><td>—</td><td>—</td></tr>
</table>

可以动手核对 BTC Gain 的定义：2024 年底 Strategy 持有 447,470 BTC，× 22.8% ≈ 102,000，与披露的 2025 全年 101,873 BTC 基本吻合（差异来自 BTC Yield 的四舍五入）。2026 年上半年：2025 年底约 672,500 BTC × 8.1% ≈ 54,500，与 54,625 吻合。

目标的变迁也值得一看：2025-02-05 Strategy 定下 2025 年 BTC Yield 至少 15%、BTC $ Gain 100 亿美元；2025-10-30 在假设年底币价 15 万美元的前提下上调为 30% 与 200 亿美元；2025-12-01 又下调。实际结果是 22.8% 与 89.15 亿美元。**BTC $ Gain 高度依赖币价**——同样的 BTC Gain，在 15 万美元和 8.7 万美元的币价下，美元数差了四成多。在 2026 年第一、二季度的新闻稿里，没有找到 2026 年的 KPI 目标。

Strive（同一套定义）：2026 年第一季度 **11.1%**、第二季度 **23.9%**、上半年 **37.7%**、年初至今 **+54.5%**（截至其仪表盘最新数据）。规模小的公司，一次合并或一轮融资就能大幅推高 BTC Yield：Strive 在 2026-01-16 完成以换股方式收购 Semler Scientific（带来 5,048 BTC）；此外 SATA 优先股在 2026-06-30 至 09-18 间名义金额增加约 3.35 亿美元（推算），同期持币从 19,864 增至 26,355 枚——**相当一部分新增比特币来自优先股融资，这部分“收益”是毛口径**。

### ⑤ 它不衡量什么：批评与正确的读法

- **不是收益率**：没有现金流。一张 5% 票息的债券（阶段 4.1）每年真付你 50 美元；BTC Yield 20% 不给你一分钱，只是改变了你每股背后的比特币数量。
- **不扣优先索取权**：优先股与债务买来的币全算“收益”（动作 C）。对杠杆越来越高的公司，毛口径 BTC Yield 会系统性地高估股东的真实增长。更好的补充是看**每股净比特币**的增长（阶段 16.1）。
- **不扣融资成本**：优先股股息、可转债票息不进入 BTC Yield，直到公司卖币付息（动作 D）。一个年股息 12% 的优先股，要比特币每年涨 12% 以上才真正让股东受益（阶段 16.7）。
- **不看价格**：以 3 倍 mNAV 发股与以 1.2 倍发股，都可能产生正的 BTC Yield，但股东让渡的价值完全不同。
- **BTC $ Gain 混入了币价**：它是“比特币个数 × 某一时点的币价”，币价回落，这笔“收益”的美元数也跟着缩水；它也不是会计利润（阶段 15.6）。
- **可比性差**：各家分母不同、口径可能调整；小公司的一次并购就能制造极高的 BTC Yield。

**正确的读法**：把 BTC Yield 当成“每股比特币的增速”，并配上三个问题——①是用什么钱买的（普通股、优先股、债务）？②以什么 mNAV 发的？③新增的优先索取权与年度股息是多少（阶段 16.4 的放大倍数、阶段 16.6 的股息覆盖）？三个问题答完，这个 KPI 才有意义。本课只讲机制与分析框架，不构成投资建议。
`,

  demo: "btc-yield-gain",

  analogy: `
一家**会员制葡萄酒窖**：每位会员持有若干份额，酒窖用会费和新会员的入会费买酒。

年报上写：“酒窖今年‘酒收益率’12%！”这不是说你拿到了 12% 的现金分红——一分钱都没有。它的意思是：**你每份额背后的酒瓶数，比年初多了 12%**。

这 12% 是怎么来的，差别很大：

- 如果是因为新会员愿意花 1.5 倍的价钱入会，酒窖用多出来的钱买酒——老会员真的沾了光；
- 如果是因为酒窖向银行借钱买了一批酒——瓶数确实多了，但地窖门口多了一张借条，每年还得付利息；
- 如果某年酒窖卖掉几瓶酒来付利息——“酒收益率”就会变成负的。

而“酒增益”（BTC Gain）就是把这 12% 换算成瓶数：年初 1,000 瓶 × 12% = 120 瓶——意思是“相当于老会员凭空多得了 120 瓶”。“酒增益（美元）”再乘上酒价——酒价一跌，这个数字就缩水，可你份额背后的瓶数不变。
`,

  misconceptions: [
    "**“BTC Yield 20% 就像债券收益率 20%。”** —— 它没有任何现金流，只是每股比特币的百分比变化。Strategy 自己说它不等同于传统金融语境中的“收益率”。",
    "**“BTC Gain 就是公司这期买入的比特币数。”** —— BTC Gain = 期初持币量 × BTC Yield，衡量的是老股东“相当于多得了”多少币。橙子公司买了 1,500 个币，BTC Gain 只有约 455 个，其余约 1,045 个属于新股东。",
    "**“BTC Yield 为正，说明股东一定更好了。”** —— 用优先股或债务买币也会产生正的 BTC Yield（毛口径），但股东同时背上了新的优先索取权与每年的股息。要看每股净比特币的变化和融资成本。",
    "**“2026 年的季度 BTC Yield 要连乘才是全年。”** —— 从 2026 年起，Strategy 的每个季度都相对年初 BPS 计量，各季度直接相加等于年初至今（例：10% + 15% = 25%）。",
    "**“以溢价发股，BTC Yield 一定为正。”** —— 只有募集的钱拿去买比特币才是。以 1.5 倍溢价发股、钱存进美元储备，BTC Yield 是负的（橙子公司约 −2.0%）。",
  ],

  quiz: [
    {
      q: "按 Strategy 的定义，BTC Gain 等于什么？",
      options: [
        "本期买入的比特币总数",
        "期初持有的比特币总数 × 本期 BTC Yield",
        "期末持有的比特币总数 × 比特币价格",
        "本期发行股票的数量 × 股价",
      ],
      answer: 1,
      explain: "官方原文：“the gross number of bitcoins held by the Company at the beginning of a period multiplied by the BTC Yield for such period”。它衡量的是**老股东相当于多得了多少币**。",
    },
    {
      q: "按 2026 年的季度口径，BPS 从年初 100 → 第一季度末 110 → 第二季度末 125。第二季度的 BTC Yield 是多少？",
      options: [
        "13.6%",
        "25%",
        "10%",
        "15%",
      ],
      answer: 3,
      explain: "2026 口径下每个季度都相对**年初** BPS 计量：(125 − 110) ÷ 100 = **15%**；10% + 15% = 年初至今 25%。13.6% 是传统环比口径。",
    },
    {
      q: "橙子公司以 15 美元增发 200 万股（3,000 万美元），全部存入美元储备，不买比特币。BTC Yield 约为多少？",
      options: [
        "约 −2.0%",
        "约 +4.5%",
        "0%",
        "约 +2.0%",
      ],
      answer: 0,
      explain: "比特币仍是 10,000 个，股数变成 1.02 亿：10,000 ÷ 1.02 亿 ≈ 9,804 聪，**约 −2.0%**。BTC Yield 只认比特币——这解释了为什么建立美元储备的时期 BTC Yield 会被拉低。",
    },
    {
      q: "为什么说“发优先股买币”带来的 BTC Yield 需要特别警惕？",
      options: [
        "因为优先股发行是违法的",
        "因为优先股买来的币不计入持币量",
        "因为 BTC Yield 是毛口径，新增币被计为收益，但同时新增的优先索取权与年度股息没有被扣除",
        "因为优先股会自动转换成普通股",
      ],
      answer: 2,
      explain: "毛口径 BPS 上升了，但每股**净**比特币在发行时点不变；只有比特币涨幅超过优先股股息成本，股东才真正受益。Strategy 自己也提示了这一点。",
    },
    {
      q: "Strategy 2025 年的 BTC $ Gain 目标从 100 亿美元上调到 200 亿美元，实际为 89.15 亿美元。这最能说明 BTC $ Gain 的什么特点？",
      options: [
        "它与比特币价格无关",
        "它强烈依赖计量时点的比特币价格：200 亿的目标假设年底币价 15 万美元",
        "它只计算优先股股息",
        "它等于公司的会计净利润",
      ],
      answer: 1,
      explain: "BTC $ Gain = BTC Gain × 币价。上调后的目标假设年底 15 万美元，而 2025 年底收盘约 8.76 万美元。**同样的 BTC Gain，币价一变，美元数就大变**。",
    },
  ],

  further: [
    { label: "Strategy 2026 年第二季度 10-Q（BTC Yield、BTC Gain、BTC $ Gain 的原文定义与季度口径）", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000044/mstr-20260630.htm" },
    { label: "Strategy 2025 财年 10-K（2024、2025 全年 KPI）", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000020/mstr-20251231.htm" },
    { label: "Strategy 2024 年第四季度新闻稿（引入 BTC Gain 与 BTC $ Gain，2025 年目标）", url: "https://www.sec.gov/Archives/edgar/data/1050446/000095017025014455/mstr-ex99_1.htm" },
    { label: "Strive 2026 年第二季度业绩（BTC Yield 定义与数值）", url: "https://investors.strive.com/news-events/news-releases/news-details/2026/Strive-Inc--Announces-Second-Quarter-2026-Financial-Results/default.aspx" },
  ],
};
