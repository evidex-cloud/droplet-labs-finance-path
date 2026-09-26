export default {
  id: "dat-comparison",
  stage: 18,
  order: 5,
  title: "DAT 横向比较：Strategy、Strive、Metaplanet 与 ETH/SOL 财库",
  difficulty: "dat",
  prereqs: ["dat-landscape", "strive-sata", "dat-stress-test"],

  oneLiner:
    "把两家 DAT 放在一起比，第一步不是看谁的数字更好看，而是**把口径统一**：mNAV 有四种算法，“放大”有两种公式，每股比特币有两种股数。统一之后再比五件事：**规模、每股比特币的增长、杠杆与工具、覆盖与资金成本、司法辖区与治理**。这一节用截至 2026 年 9 月的数据把 Strategy、Strive、Metaplanet、Twenty One、Nakamoto 与 ETH/SOL 财库放进同一张表，并回答一个新问题：能产生质押收益的资产，是不是更好的财库资产？",

  intuition: `
假设小区里有三家卖同一种金条的店。A 店标价“每克 1.2 倍金价”，B 店标价“溢价 33%”，C 店标价“0.58 倍”。你能直接比吗？不能——A 店的“倍数”可能已经扣掉了它欠别人的钱，B 店的“溢价”是按市值算的，C 店的 0.58 倍是按最简单的市值口径。**先换成同一个秤，才谈得上比较。**

DAT 的比较正是如此。阶段 16.2 讲过 mNAV 的四种口径，阶段 16.4 讲过“放大”的两种公式（Strategy 的 BTC 储备 ÷ 净储备，与 Strive 的“（债务 + 优先股）÷ 比特币价值”），阶段 16.1 讲过每股比特币用哪种股数。同一家公司，换一个口径，数字可以差出一大截。

统一口径之后，分析师比五件事：

1. **规模与持仓**：持有多少比特币、占总量多少、平均成本在哪（是否浮亏）。
2. **每股比特币的增长**：BTC Yield 高是因为溢价增发，还是因为发了大量优先股？（阶段 16.3 的提醒：后者忽略了新增的优先索取权。）
3. **杠杆与工具**：有没有债务、有没有**以比特币质押的借款**、优先股是多少、股息率多高。
4. **覆盖与资金成本**：最劣后的那一层覆盖几倍？Breakeven ARR 多少——比特币每年要涨多少才“养得起”这张资产负债表？
5. **司法辖区与治理**：在哪里上市、受什么规则约束、谁控股（阶段 18.4）。

截至 2026 年 9 月的一个最醒目的对比：**Strategy 与 Strive 走了两条路。** Strategy 用“可转债 + 五种优先股 + 普通股”的完整工具箱，持有 846,000 BTC；Strive 坚持“只用永续优先股放大、零债务、零质押”，持有 26,355 BTC，股息率 13% 的 SATA 是它唯一的杠杆来源。前者的 Breakeven ARR 约 2.3%，后者约 6.6%（派生计算）；前者的 2026 口径 mNAV 在 8 月下旬约 1.01 倍，后者据 DWF Ventures 属于“20 家最大 DAT 中仅 4 家仍高于 1 倍”的少数。**没有哪条路全面占优，每条路都是一组取舍。**

最后是 ETH 与 SOL 财库。它们持有的资产可以**质押**产生收益，这听起来像是“会下蛋的比特币”。但收益从哪来、要承担什么额外风险，是本节最后要拆开的问题。

本节落在**观念②（资产负债表与索取权）**——比较的是资产负债表的设计；和**观念④（风险与杠杆）**——不同的杠杆结构在同一场下跌里表现完全不同。**本课只讲机制与分析框架，不构成投资建议；任何横向比较都不是推荐。**

**这一节，我们拆成五块：**

- **① 先统一口径：mNAV、放大、每股比特币**
- **② 规模、成本与增长：谁有多少比特币、怎么来的**
- **③ 杠杆与工具：债务、优先股、质押借款**
- **④ 覆盖与资金成本：安全垫与门槛**
- **⑤ ETH/SOL 财库：会“下蛋”的资产是否更好**
`,

  mechanics: `
### ① 先统一口径：mNAV、放大、每股比特币

<table class="pm">
<tr><th>指标</th><th>Strategy 的定义</th><th>Strive 的定义</th><th>第三方（bitcointreasuries 等）</th></tr>
<tr><td>溢价</td><td>2026 年：股价 ÷ 每股净比特币（扣债务、优先股，加美元资产）；2025 年：企业价值 ÷ 比特币净值</td><td>不用“mNAV”：普通股增值溢价 = 市值 ÷ 比特币价值 − 1；EV/财库资产价值；对净财库资产价值的倍数</td><td>市值口径（basic）、稀释口径、企业价值口径</td></tr>
<tr><td>放大</td><td>Amplification = BTC 储备 ÷ 净储备（大于 1 倍）</td><td>Amplification Ratio =（债务 + 优先股）÷ 比特币价值（百分比）</td><td>—</td></tr>
<tr><td>每股比特币</td><td>按“假设稀释股数”（所有可转工具不论价内价外都算）</td><td>按“假设完全稀释股数”（不含传统认股权证）</td><td>各家不同</td></tr>
</table>

**同一个数字换算给你看**：Strive 的“普通股增值溢价 33.0%”约等于市值口径 mNAV **1.33 倍**；它的“EV / 财库资产价值”是 **1.52 倍**；“对净财库资产价值的倍数”是 **2.14 倍**（净财库资产 13.8 亿美元，每股 13.76 美元，对比股价 29.44 美元）；The Block 自己算的 ASST mNAV 是 **1.21 倍**（2026-09-26）。四个数字说的是同一家公司、同一天。**比较两家公司时，必须把它们放进同一个口径**——本节演示统一用“最劣后层覆盖倍数”“Breakeven ARR”与两种放大公式并列展示。

### ② 规模、成本与增长：谁有多少比特币、怎么来的

<table class="pm">
<tr><th>公司</th><th>持有 BTC（日期）</th><th>要点</th></tr>
<tr><td>Strategy（MSTR）</td><td>846,000（2026-09-20）</td><td>约占比特币总量 4%；均价约 75,416 美元；约占上市公司持币总量的 66%</td></tr>
<tr><td>Twenty One（XXI）</td><td>43,514（bitcointreasuries，2026-09-26）</td><td>2025-12-09 于纽交所上市；Tether 与 Bitfinex 控股；市值口径 mNAV 约 0.68 倍</td></tr>
<tr><td>Metaplanet（3350.T）</td><td>43,000（2026-07-02，8-18 仍如此表述）</td><td>目标 2026 年底 10 万、2027 年底 21 万 BTC；均价约 8.86 万美元，浮亏</td></tr>
<tr><td>Strive（ASST）</td><td>26,355（2026-09-18）</td><td>均价约 90,610 美元；2026 年至今 BTC Yield +54.5%；每股约 26,317 聪</td></tr>
<tr><td>Nakamoto（NAKA）</td><td>约 4,467</td><td>较高点跌约 99%，卖币还贷，1 拆 40 反向拆股</td></tr>
</table>

几点比较：

- **规模不是一切**：Strategy 的规模让它有最深的资本市场渠道（2026 年截至 8 月 23 日融资约 203 亿美元），也让它成为任何卖出都会被注意的“巨鲸”（阶段 18.3）。
- **增长的来源要拆开看**：Strive 2026 年至今 +54.5% 的 BTC Yield 很高，但自 2025 年 11 月上市以来，它的 SATA 从 200 万股增加到约 1,118 万股（按 100 美元面值约 11.2 亿美元）——很大一部分每股比特币的增长来自**优先股融资**，而这会增加普通股之上的索取权。Strategy 2025 年全年 BTC Yield 22.8%，2026 年上半年 8.1%，也混合了普通股与优先股的贡献。
- **成本与浮亏**：比特币约 8.4 万美元（2026-09-25）时，Strategy 的持仓约高于成本 12%；Strive（均价约 9.06 万）与 Metaplanet（约 8.86 万）处于浮亏。浮亏本身不触发任何事件（没有保证金），但会影响会计利润与市场情绪。

### ③ 杠杆与工具：债务、优先股、质押借款

<table class="pm">
<tr><th>公司</th><th>债务</th><th>优先股（股息率）</th><th>有无比特币质押</th></tr>
<tr><td>Strategy</td><td>约 67.5 亿美元可转债（无担保），2027-09 起有回售日</td><td>约 143 亿美元：STRF 10%、STRC 12%（浮动）、STRE 10%（欧元）、STRK 8%、STRD 10%（非累积）</td><td>主要债务无比特币质押；优先股无抵押</td></tr>
<tr><td>Strive</td><td><b>零</b>（Semler 的可转债已换成 SATA 或回购，Coinbase 贷款已还）</td><td>SATA 约 11.18 亿美元，13%（浮动），按日支付</td><td>“零质押比特币”</td></tr>
<tr><td>Metaplanet</td><td>5 亿美元以比特币担保的信贷额度，2026 年 3 月已提取约 2.8 亿</td><td>MERCURY 4.9%（日元，可转换，约 1.5 亿美元）；MARS（月度可调）似乎尚未发行</td><td><b>有</b>（信贷额度）</td></tr>
<tr><td>Nakamoto</td><td>Kraken 的 USDT 贷款，部分偿还后余额按 7.75% 再融资</td><td>—</td><td><b>有</b>（至少 2,000 BTC）</td></tr>
</table>

**资金成本的差异很大**：Metaplanet 的 MERCURY 只有 4.9%（日本的低利率环境与可转换权），Strategy 的 STRC 12%，Strive 的 SATA 13%，Nakamoto 的有担保贷款 7.75%。但**便宜的资金不一定更安全**：以比特币质押的借款是整个结构里唯一可能在价格下跌时被“追加保证金”的环节（阶段 7.5、阶段 18.3）。**分析师要同时看价格（资金成本）与形态（有无质押、有无到期日）。**

### ④ 覆盖与资金成本：安全垫与门槛

用统一公式派生（比特币约 8.41 万美元，未抵减现金，除非注明）：

<table class="pm">
<tr><th>公司（日期）</th><th>最劣后层覆盖</th><th>Breakeven ARR</th><th>放大（Strategy 式）</th><th>杠杆比率（Strive 式）</th><th>储备</th></tr>
<tr><td>橙子公司（示意）</td><td>3.33 倍</td><td>1.50%</td><td>1.37 倍</td><td>30%</td><td>24 个月</td></tr>
<tr><td>Strategy（2026-09-20）</td><td>约 3.38 倍</td><td>约 2.28%</td><td>1.30 倍（公司公布，8-23）</td><td>约 30%</td><td>约 37 个月</td></tr>
<tr><td>Strive（2026-09-18）</td><td>约 1.98 倍（含现金约 2.19 倍）</td><td>约 6.56%</td><td>约 1.67 倍（派生，计入 2.296 亿现金）</td><td>50.4%（公司公布）</td><td>政策 18 个月；现金约 19 个月</td></tr>
<tr><td>Metaplanet（日期混合）</td><td>粗算约 8 倍（信贷 2.8 亿 + MERCURY 1.5 亿）</td><td>事实表不足以计算</td><td>—</td><td>粗算约 12%</td><td>—</td></tr>
</table>

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">安全垫 vs 门槛：最劣后层覆盖倍数 × Breakeven ARR</text><line x1="80" y1="240" x2="600" y2="240" stroke="var(--line)"/><line x1="80" y1="40" x2="80" y2="240" stroke="var(--line)"/><line x1="80" y1="202" x2="600" y2="202" stroke="var(--red)" stroke-dasharray="5 4"/><text x="596" y="196" text-anchor="end" font-size="10" fill="var(--red)">1.0 倍</text><rect x="86" y="46" width="170" height="40" rx="6" fill="var(--green-soft)"/><text x="171" y="64" text-anchor="middle" font-size="10" fill="var(--green)">垫子厚、门槛低</text><text x="171" y="78" text-anchor="middle" font-size="10" fill="var(--green)">（对信用层更友好）</text><rect x="424" y="206" width="170" height="28" rx="6" fill="var(--red-soft)"/><text x="509" y="224" text-anchor="middle" font-size="10" fill="var(--red)">垫子薄、门槛高</text><circle cx="178" cy="113" r="8" fill="var(--orange)"/><text x="170" y="138" text-anchor="end" font-size="11" font-weight="700" fill="var(--orange-ink)">橙子公司</text><circle cx="228" cy="112" r="11" fill="var(--btc)"/><text x="244" y="108" font-size="11" font-weight="700" fill="var(--ink)">Strategy</text><circle cx="506" cy="165" r="7" fill="var(--blue)"/><text x="506" y="150" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Strive</text><text x="80" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">0%</text><text x="275" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">3%</text><text x="470" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">6%</text><text x="340" y="276" text-anchor="middle" font-size="10" fill="var(--muted)">Breakeven ARR（年度利息与股息 ÷ BTC 储备）</text><text x="72" y="164" text-anchor="end" font-size="10" fill="var(--muted)">2x</text><text x="72" y="88" text-anchor="end" font-size="10" fill="var(--muted)">4x</text><text x="30" y="140" text-anchor="middle" font-size="10" fill="var(--muted)" transform="rotate(-90 30 140)">最劣后层覆盖</text></svg><figcaption>派生计算，比特币约 8.41 万美元、未抵减现金。Strive 没有债务却处在右下方：它的全部杠杆都是 13% 的优先股，相对比特币规模更大。Metaplanet 因数据不足未画出。</figcaption></figure>

读这张图的方式：

- **往左上走，对信用层（债务、优先股）更友好**：覆盖厚、每年“养结构”所需的比特币涨幅低。
- **往右下走，普通股的放大更强，但门槛更高**：Strive 的比特币每年要涨约 6.6% 才能“覆盖”SATA 的股息；换个角度，它的普通股对比特币的弹性更大。
- **Strive 的反驳**：它没有任何债务、没有回售墙、没有质押，SATA 的股息是公司自主决定的累积义务（欠付要按更高利率复利、12 次与 24 次后给董事席位）；它持有 18 个月的股息储备，还持有 505,000 股 STRC。**“没有到期日”本身就是一种安全垫**，只是它不出现在覆盖倍数里。
- **Strategy 的反驳**：规模带来渠道，渠道带来时间；约 3 年的美元储备与多样的工具让它能在不同市场环境里换着融资。它的弱点是回售墙与“巨鲸”身份（阶段 18.2、阶段 18.3）。

### ⑤ ETH/SOL 财库：会“下蛋”的资产是否更好

截至 2026 年 9 月的主要非比特币财库：

- **BitMine（BMNR）**：约 598 万 ETH（约占供应量 4.9%，目标 5%），其中约 507 万枚在质押；另有 212 BTC 与 7.14 亿美元现金。
- **SharpLink（SBET）**：约 88.9 万 ETH（2026-08-03），自 2025 年 8 月以来回购约 4,170 万美元股票。
- **Forward Industries（FWDI）**：约 816 万 SOL（2026-09-21）。**DeFi Development（DFDV）**约 249 万 SOL，用一个 3 亿美元的“CHAD”优先股 ATM 融资；**Upexi（UPXI）**约 234 万 SOL（2026-06-30）。
- 教训：ETHZilla 在 2025 年 10 月卖 ETH 回购股票，12 月又卖 24,291 ETH 赎回可转债——和比特币 DAT 在 mNAV 压缩时的选择一模一样。

**质押收益的真正含义**：

- **支持者**：质押收益（每年几个百分点的量级，具体随网络而变）是**真实的、以资产本身计的现金流**。在阶段 18.3 的明斯基框架里，它让财库更接近“对冲性融资”——可以部分用收益支付优先股股息，而不必卖资产或增发。比特币本身没有这种收益，这是比特币 DAT 只能靠升值与融资的根本原因。
- **批评者**：质押收益不是免费的——它伴随**罚没（slashing）、验证者与托管、解押等待期与流动性**的风险，以及协议升级风险；收益以 ETH/SOL 计价，而这些资产的波动通常比比特币更大。更根本的是，**比特币 DAT 的论证是“比特币是最好的长期货币资产”**；ETH/SOL 财库的论证则是“持有一个平台的收益资产”——这是两种不同的赌注，不能只比收益率。
- **分析师的处理**：把质押收益当作“经营现金流”放进覆盖月数（阶段 16.6）和 Breakeven ARR 的分子里抵减，但同时在压力测试里加一个“质押收益下降、解押排队”的情景。

**最后一条纪律**：横向比较最容易犯的错是把**不同日期、不同口径、不同币种**的数字放进同一张表。本节表格中每个数都标了日期；Metaplanet 的覆盖只是粗算（混合了 3 月的借款与 7 月的持仓、日元与美元）。阶段 18.6 的清单会把“口径与日期”作为第一条纪律。**本课只讲机制与分析框架，不构成投资建议；任何横向比较都不是推荐。**
`,

  demo: "dat-comparison",

  analogy: `
比较 DAT 像**比较几艘装着同一种货的船**。

有的船很大（Strategy），货多、港口关系多、到哪里都能补给，但它一转向，整片海面都会起浪；它的船舱底下还压着几张写了日期的借条。

有的船小而干净（Strive），船上一分钱外债都没有，但船员的工资很高（13% 的优先股股息），货价只要一年不涨几个百分点，工资就得从货里出；好在船上的粮仓写着“备足 18 个月”。

有的船在另一片海域（Metaplanet），那里的港口规则不同，借钱便宜，但它借的钱是**用货作抵押**的——风浪太大时，债主可以上船搬货。

还有的船装的是会“下蛋”的货（ETH、SOL 财库），货本身每年能生出一点新货，但这种货更容易受潮，而且蛋是用同一种货计价的。

比较这些船，你不会只问“谁的货最多”。你会问：**船员工资占货值多少？借条哪天到期？有没有人能上船搬货？粮仓够吃几个月？在哪个港口受哪国的规矩管？**——而且每一个数字都要写上是哪一天、用哪把秤量的。
`,

  misconceptions: [
    "**“Strive 的 mNAV 比 Strategy 高，所以 Strive 更‘贵’。”** —— 先看口径：Strive 不公布“mNAV”，它的 33% 溢价约等于市值口径 1.33 倍，而 Strategy 的 1.01 倍是扣除债务与优先股后的“净”口径。换到同一口径之前，比较没有意义。",
    "**“没有债务就等于低风险。”** —— Strive 零债务、零质押，没有回售墙；但它 13% 的 SATA 相对比特币规模更大，Breakeven ARR 约 6.6%，最劣后层覆盖约 2 倍，比 Strategy 更薄。风险换了形态，没有消失。",
    "**“资金成本越低越好。”** —— Metaplanet 的 MERCURY 只有 4.9%，Nakamoto 的贷款 7.75%，都比 STRC 与 SATA 便宜；但以比特币质押的借款是唯一可能被追加保证金的环节。要同时比价格与形态。",
    "**“BTC Yield 最高的公司增长最好。”** —— BTC Yield 不计新增的优先索取权。大量发行优先股能推高 BTC Yield，同时让普通股之上的负担更重。要拆开看增长的来源。",
    "**“ETH/SOL 财库有质押收益，所以一定优于比特币财库。”** —— 收益伴随罚没、解押、托管与协议风险，且以波动更大的资产计价；两者的核心论证（货币资产 vs 平台收益资产）不同，不能只比收益率。",
  ],

  quiz: [
    {
      q: "Strive 公布“普通股增值溢价 33%”。它大致对应哪种口径的 mNAV？",
      options: [
        "Strategy 2026 年的净口径 1.33 倍",
        "市值口径约 1.33 倍",
        "企业价值口径 0.33 倍",
        "与 mNAV 无关",
      ],
      answer: 1,
      explain: "定义是“市值 ÷ 比特币价值 − 1”，所以 **33% ≈ 市值口径 1.33 倍**。同一天 Strive 的 EV/TAV 是 1.52 倍，The Block 算的是 1.21 倍——先统一口径。",
    },
    {
      q: "为什么没有债务的 Strive，其 Breakeven ARR（约 6.6%）反而比 Strategy（约 2.3%）高？",
      options: [
        "因为 Strive 持有的比特币更贵",
        "因为 Strive 的 SATA 股息率 13%，且相对其比特币规模更大（杠杆比率约 50%）",
        "因为 Strive 要付可转债利息",
        "因为 Strive 在日本上市",
      ],
      answer: 1,
      explain: "**Breakeven ARR = 年度义务 ÷ BTC 储备**：1.454 亿 ÷ 约 22.2 亿 ≈ 6.6%。Strategy 16.2 亿 ÷ 约 711 亿 ≈ 2.3%。",
    },
    {
      q: "下列哪种融资形态最可能在比特币大跌时引发被迫卖币？",
      options: [
        "永续累积优先股",
        "无担保、有回售日的可转债",
        "普通股 ATM",
        "以比特币质押的借款（如 Metaplanet 的信贷额度、Nakamoto 的 Kraken 贷款）",
      ],
      answer: 3,
      explain: "质押借款是结构里唯一可能出现**追加保证金**的环节。可转债的压力来自回售日期，优先股的压力来自股息，但都不会因价格本身被强平。",
    },
    {
      q: "比较 ETH 财库与比特币财库时，下列哪种说法最准确？",
      options: [
        "质押收益可以视作以资产本身计的经营现金流，能降低对融资的依赖，但伴随罚没、解押与协议风险",
        "质押收益是无风险收益，所以 ETH 财库一定更好",
        "比特币也有质押收益",
        "ETH 财库不受 mNAV 压缩影响",
      ],
      answer: 0,
      explain: "质押让财库更接近明斯基的“对冲性融资”，但收益以更高波动的资产计价、并带来额外风险。ETHZilla 在折价时卖 ETH 回购与赎回可转债，说明它们同样面对 mNAV 压缩。",
    },
    {
      q: "做 DAT 横向比较时，最常见也最致命的错误是？",
      options: [
        "使用派生计算",
        "把不同日期、不同口径、不同币种的数字放进同一张表而不标注",
        "同时看支持与批评的论证",
        "查看公司原始文件",
      ],
      answer: 1,
      explain: "**口径与日期是第一纪律**。同一家公司的“溢价”可以是 1.21、1.33、1.52 或 2.14 倍，取决于你用哪把秤。",
    },
  ],

  further: [
    { label: "Strive 比特币财库仪表盘：持仓、SATA、放大比率与三种溢价指标", url: "https://strive.com/treasury" },
    { label: "Strategy 投资者简报 FWP（2026-08-24）：mNAV、Amplification、BTC 评级与 Breakeven ARR 的官方定义", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "bitcointreasuries.net：上市公司持币排名与多口径 mNAV", url: "https://bitcointreasuries.net/" },
    { label: "CoinDesk（2025-11-20）：Metaplanet 的 MERCURY 与 MARS 优先股", url: "https://www.coindesk.com/markets/2025/11/20/metaplanet-announce-usd150m-raise-through-perpetual-preferred-equity-with-4-9-yield" },
    { label: "The Block（2026-09-21）：BitMine 接近 5% ETH 供应量目标", url: "https://www.theblock.co/news/business/2026-09-21-crypto-bull-market-underway-tom-lee-says-bitmine-nears-5-ethereum-supply-target-with-27562-eth-buy-415923" },
  ],
};
