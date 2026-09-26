export default {
  id: "dat-landscape",
  stage: 15,
  order: 4,
  title: "DAT 全景：Strategy、Strive、Metaplanet、Twenty One 与山寨币财库",
  difficulty: "dat",
  prereqs: ["dat-what", "strategy-story", "why-dats-exist"],

  oneLiner:
    "截至 2026 年 9 月下旬，约 196 家上市公司合计持有约 127 万枚比特币，其中 **Strategy 一家约占三分之二**。其余的玩家可以分成几类：走“只用优先股、零债务”路线的 **Strive**，日本的 **Metaplanet**，由 Tether 控股的 **Twenty One**，经历了约 99% 跌幅的 **Nakamoto**，以及持有以太坊、Solana 的“山寨币财库”。这一节画出整张地图，并用 2025 年的繁荣与 2026 年的洗牌说明一件事：**同样的商业模式，在不同的资本结构、溢价和管理下，结局可以天差地别**。",

  intuition: `
阶段 15.1 给出了 DAT 的定义，阶段 15.2 讲了最大的那一家，阶段 15.3 讲了它们为什么存在。这一节把镜头拉远：**全世界到底有多少家这样的公司？它们长得一样吗？**

先看一个数字。按 bitcointreasuries.net 在 2026 年 9 月下旬的统计（该页面没有标注更新时间，且含个别过时条目），约 **196 家上市公司**合计持有约 **1,272,886 BTC**，按约 8.4 万美元的比特币价格约值 1,070 亿美元。**Strategy 一家持有 846,000 BTC，约占 66%**。第二名的持仓还不到 Strategy 的 6%。这不是一个“行业”，更像**一个巨人加一群追随者**。

追随者之间差别很大，看四个维度就能分清：

- **资产**：大多数持比特币；也有持以太坊（ETH）、Solana（SOL）的，这些资产可以“质押”产生收益，比特币不能。
- **资本结构**：Strategy 用“可转债 + 多只优先股 + 普通股”；Strive 只用一只浮动利率优先股、零债务；Metaplanet 用以比特币为抵押的信用额度加优先股；Nakamoto 借过以比特币为抵押的稳定币贷款。**有没有追保，是最关键的分界线**（阶段 7.5）。
- **溢价**：2026 年 9 月，据 DWF Ventures 统计，最大的 20 家 DAT 中只有 4 家 mNAV 高于 1——Strive 是其中之一；Metaplanet 约 0.58 倍、Twenty One 约 0.68 倍（bitcointreasuries.net 市值口径）。
- **治理与控股**：创始人主导、大股东控股（Tether 之于 Twenty One）、并购整合（Strive 吞下 Semler）。

这一节主要落在**观念②（资产负债表与索取权）**与**观念④（风险与杠杆）**上：同一种资产，放在不同的资产负债表里，风险完全不同。它也是一节“故事课”：**2025 年是繁荣年**——上百家公司宣布转型、SPAC 与反向并购扎堆；**2026 年是洗牌年**——比特币从约 12.6 万美元跌到约 5.8 万美元，折价、卖币、回购、并购与退市一起出现。

所有数字都注明日期与来源；它们每周都在变，请以公司披露与 bitcointreasuries.net 的实时数据为准。**本课只讲机制与分析框架，不构成投资建议**，提到任何公司都不是推荐或反对。

**这一节，我们拆成五块：**

- **① 一家独大：Strategy 与“三分之二”**
- **② 追随者：Strive、Metaplanet、Twenty One 与 Nakamoto**
- **③ 持币但不是 DAT：矿企、交易所与“顺便持币”的公司**
- **④ 山寨币财库：以太坊与 Solana，以及“质押收益”**
- **⑤ 2025 的繁荣与 2026 的洗牌**
`,

  mechanics: `
### ① 一家独大：Strategy 与“三分之二”

先把排行榜摆出来（bitcointreasuries.net，2026 年 9 月下旬抓取；各公司自己的披露日期不同）：

<table class="pm">
<tr><th>排名</th><th>公司</th><th>BTC</th><th>备注</th></tr>
<tr><td>1</td><td><b>Strategy（MSTR）</b></td><td><b>846,000</b></td><td>DAT；2026-09-20 公司 8-K</td></tr>
<tr><td>2</td><td>Twenty One（XXI）</td><td>43,514</td><td>DAT；Tether/Bitfinex 控股</td></tr>
<tr><td>3</td><td>Metaplanet（3350.T）</td><td>43,000</td><td>DAT；日本；2026-07-02 起未变</td></tr>
<tr><td>4</td><td>MARA</td><td>35,577</td><td>比特币矿企</td></tr>
<tr><td>6</td><td>Strive（ASST）</td><td>26,355</td><td>DAT；2026-09-18 公司看板</td></tr>
<tr><td>7–12</td><td>Bullish、SpaceX、Coinbase、CleanSpark、Trump Media、Tesla</td><td>约 1.1–2.2 万</td><td>多数不是 DAT</td></tr>
</table>

（第 5 名 BSTR 的并购已于 2026 年 8 月终止，榜单条目已过时。）

<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">上市公司合计约 127.3 万 BTC：谁持有多少</text><rect x="40" y="50" width="370" height="46" fill="var(--btc)"/><text x="225" y="78" text-anchor="middle" font-size="13" font-weight="700" fill="var(--surface-2)">Strategy 846,000（约 66%）</text><rect x="410" y="50" width="19" height="46" fill="var(--blue)"/><rect x="429" y="50" width="19" height="46" fill="var(--blue)" opacity=".75"/><rect x="448" y="50" width="16" height="46" fill="var(--green)"/><rect x="464" y="50" width="12" height="46" fill="var(--orange)"/><rect x="476" y="50" width="124" height="46" fill="var(--surface-2)" stroke="var(--line)"/><text x="538" y="78" text-anchor="middle" font-size="11" fill="var(--muted)">其余约 190 家</text><line x1="419" y1="100" x2="419" y2="214" stroke="var(--blue)"/><text x="425" y="218" font-size="10" fill="var(--blue)">XXI 43,514</text><line x1="438" y1="100" x2="438" y2="186" stroke="var(--blue)"/><text x="444" y="190" font-size="10" fill="var(--blue)">Metaplanet 43,000</text><line x1="456" y1="100" x2="456" y2="158" stroke="var(--green)"/><text x="462" y="162" font-size="10" fill="var(--green)">MARA 35,577（矿企）</text><line x1="470" y1="100" x2="470" y2="130" stroke="var(--orange)"/><text x="476" y="134" font-size="10" fill="var(--orange-ink)">Strive 26,355</text><text x="40" y="250" font-size="11" fill="var(--muted)">宽度按持仓比例；来源 bitcointreasuries.net（2026 年 9 月下旬，无时间戳）</text></svg><figcaption>第一名的持仓是第二名的近 20 倍。说“DAT 行业”时，数字层面你说的几乎就是 Strategy。</figcaption></figure>

这种集中度有两个后果。第一，**研究 DAT 就绕不开 Strategy**：它的每周 8-K、它的指标定义（阶段 16）、它的优先股（阶段 17）实际上定义了这个行业的语言，后来者大多沿用或改写它的指标（Strive 的 BTC Yield 与 Strategy 定义相同）。第二，**系统性风险集中**：如果 Strategy 遭遇指数剔除（MSCI 的模拟名单上有它）、或被迫大规模卖币，影响的不只是一家公司。可以用集中度指标来量化：只算上表中持仓最多的几家，赫芬达尔指数（各家份额平方之和）就在 0.4 以上——反垄断语境里，0.25 以上就算“高度集中”。

### ② 追随者：Strive、Metaplanet、Twenty One 与 Nakamoto

**Strive（ASST）——“只用优先股、零债务”。** 由 Vivek Ramaswamy 与 Anson Frericks 于 2022 年创立的资产管理公司，2025 年通过与 Asset Entities 的反向并购上市（2025 年 5 月宣布 7.5 亿美元私募，每股 1.35 美元；9 月 12 日完成合并，沿用 ASST 代码）。2026 年 1 月 16 日完成对 Semler Scientific 的全股票收购，获得 5,048 BTC，并把 Semler 的债务全部清掉（可转债换成了 SATA 或回购）。2 月 6 日做了 1 拆 20 的反向拆股。截至 2026 年 9 月 18 日：**26,355 BTC**、均价 90,610 美元；唯一的优先股 **SATA**（浮动利率，13.00%，名义约 11.18 亿美元，**2026 年 6 月 15 日起按日支付股息**）；债务为零、没有质押比特币；公司口径的“放大比率”50.4%（阶段 15.1 讲过它与 Strategy 口径不同）；2026 年初至今 BTC Yield +54.5%。Strive 不用“mNAV”这个词，它的“普通股增值溢价”为 33%（约相当于市值口径 1.33 倍）；The Block 的口径为 1.21 倍。阶段 17.5 专门讲 Strive 与 SATA。

**Metaplanet（东京 3350）——日本的 Strategy。** 截至 2026 年 7 月 2 日持有 **43,000 BTC**（8 月 18 日仍如此），目标是 2026 年底 10 万枚、2027 年底 21 万枚。资本结构更复杂：一笔 **5 亿美元、以比特币为抵押**的信用额度（2026 年 3 月约已提取 2.8 亿美元）；2025 年 11 月宣布的永续优先股 **MERCURY**（4.9% 固定股息、可转换），以及尚未发行的浮动股息优先股 **MARS**——两者的上市因日本交易所规则而推迟。它还通过卖比特币期权赚取收入（2026 年上半年 2,930 万美元）。截至 2026 年 9 月 26 日，bitcointreasuries.net 给出的 mNAV 为**市值口径 0.58 倍、稀释口径 0.73 倍、企业价值口径 0.79 倍**——又一个“口径决定数字”的例子。

**Twenty One（纽交所 XXI）——大股东控股的 DAT。** 2025 年 12 月 9 日通过与 SPAC（Cantor Equity Partners）合并在纽交所上市，上市时持有 43,500 多枚比特币，现为 **43,514 BTC**、上市公司第二。控股股东是 Tether 与 Bitfinex，软银为重要少数股东。2026 年 7 月 20 日 Jack Mallers 卸任 CEO，由 Raphael Zagury 接任，原计划的与 Strike、Elektron 的三方合并也告吹。市值口径 mNAV 约 **0.68 倍**（2026 年 9 月 26 日）。

**Nakamoto（NAKA）——反面教材。** 2025 年 8 月 14 日与 KindlyMD 合并完成，同时做了约 5.4 亿美元的私募。此后股价较 2025 年 5 月高点下跌约 **99%**，2026 年 5 月 22 日做了 1 拆 40 的反向拆股以维持上市。它借过以比特币为抵押的 USDT 贷款（来自 Kraken）：2026 年 3 月卖出 284 BTC 补充营运资金，6 月再卖约 600 BTC、偿还 4,500 万美元贷款，余款以 7.75% 的利率再融资，**质押至少 2,000 BTC**，剩余约 4,467 BTC（据报道）。**这就是有追保、有抵押的结构在熊市里的样子**——对照 Strategy 与 Strive 的“无质押”设计（阶段 6.5）。

### ③ 持币但不是 DAT：矿企、交易所与“顺便持币”的公司

排行榜上有不少公司**持有比特币，但主业不是比特币财库**。分清它们，是读懂 DAT 数据的第一步：

- **矿企**（MARA 35,577、CleanSpark 13,703）：比特币是它们的产品。持币多少取决于“挖出来的留多少、卖多少”，估值主要看算力、电价与挖矿效率，而不是 mNAV。
- **交易所与金融公司**（Coinbase 17,311、Bullish 22,000）：比特币是资产负债表的一部分，但公司价值主要来自交易与托管业务。
- **“顺便持币”的经营公司**：特斯拉 **11,509 BTC**（截至 2026 年 6 月 30 日，成本 3.86 亿美元、公允价值 6.74 亿美元，没有卖出）；GameStop 在 2025 年买了 4,710 BTC，并把 4,709 BTC 质押给 Coinbase 用于备兑看涨期权交易；Trump Media 的持仓在不同来源间有冲突（10-Q 称截至 2026 年 7 月 31 日约 14,139 BTC，含质押部分），还有报道称其“放弃”财库策略——**这类说法相互矛盾，本课不下结论**。

为什么要分？因为 **mNAV、BTC Yield、BTC 评级这些指标只对 DAT 有意义**。拿特斯拉的市值除以它的比特币价值，会得到几百倍的“mNAV”——一个毫无意义的数字。

### ④ 山寨币财库：以太坊与 Solana，以及“质押收益”

同样的模式也被复制到了其他币种上：

- **以太坊**：**Bitmine（BMNR）** 截至 2026 年 9 月 20/21 日持有 **5,983,940 ETH**，约占以太坊供应量的 4.9%（目标 5%），其中约 507 万枚在质押；另持 212 BTC 与 7.14 亿美元现金。**SharpLink（SBET）** 截至 2026 年 8 月 3 日持有 888,938 ETH，并自 2025 年 8 月起回购了约 4,170 万美元股票。
- **Solana**：**Forward Industries（纳斯达克 FWDI）** 截至 2026 年 9 月 21 日约 **816 万 SOL**；DeFi Development（DFDV）约 249 万 SOL，用一个 3 亿美元的优先股 ATM 融资买币；Upexi（UPXI）截至 2026 年 6 月 30 日约 234 万 SOL。

与比特币财库最大的区别是**质押收益**：以太坊和 Solana 可以质押给网络、参与验证并获得新增代币，所以这些公司的资产**会“生息”**，而比特币不会。支持者认为这让它们更像“有现金流的财库”，能部分覆盖运营成本甚至股息；批评者指出三点：质押收益以代币计价、随代币价格波动；质押有锁定期与技术风险（阶段 13.6）；这些资产的波动率与集中度通常比比特币更高。熊市里它们也在卖币：ETHZilla 在 2025 年 10 月卖出约 4,000 万美元的 ETH 用于回购，12 月又卖出 24,291 ETH 用于赎回可转债。阶段 18.5 会把它们与比特币财库放在同一张记分卡上比较。

### ⑤ 2025 的繁荣与 2026 的洗牌

**繁荣（2025）**：比特币在 2025 年 10 月 6 日创下约 12.62 万美元的历史新高。这一年里，反向并购与 SPAC 扎堆：Strive 与 Asset Entities（9 月完成）、KindlyMD 与 Nakamoto（8 月完成）、Twenty One 与 Cantor Equity Partners（12 月上市），私募（PIPE）动辄数亿美元。很多公司宣布“转型为比特币财库”后股价立刻大涨——**溢价本身成了融资的燃料**（阶段 15.3 的第二台机器，阶段 10.4 的反身性）。

**洗牌（2025 年末–2026）**：2025 年 10 月 10 日比特币大跌（当日收于约 11.28 万美元）；2025 年底约 8.76 万美元；2026 年 2 月一度跌到约 6 万美元；2026 年 6 月 30 日收于约 5.86 万美元，7 月 1 日盘中约 5.78 万美元，较高点约 **−54%**；9 月 25 日回到约 8.41 万美元。这一年里：

<table class="pm">
<tr><th>现象</th><th>例子（来自事实表）</th></tr>
<tr><td><b>溢价消失</b></td><td>最大 20 家 DAT 中 16 家 mNAV &lt; 1（DWF Ventures，2026 年 9 月）；Metaplanet 0.58 倍、XXI 0.68 倍；ProCap 约 40% 折价</td></tr>
<tr><td><b>卖币</b>（付股息、回购或还债）</td><td>Strategy 全年约 6,948 BTC；Sequans 2025 年 11 月卖 970 BTC 减半债务，2026 年 9 月 24 日完全清仓；Nakamoto；ProCap 卖约 50 BTC 回购；英国 Satsuma 卖光 669 BTC、向股东返还 3,070 万英镑并从伦交所退市</td></tr>
<tr><td><b>回购</b></td><td>Strategy 回购 STRC；SharpLink、Upexi；Nakamoto 与 Strive 的授权</td></tr>
<tr><td><b>并购整合</b></td><td>Strive–Semler（2026-01-16 完成）；Nakamoto–BTC Inc/UTXO；Metaplanet–Super League（Superplanet）；XXI–Strike–Elektron（放弃）；BSTR 的 SPAC（终止）</td></tr>
<tr><td><b>破产</b></td><td>2026 年未发现知名 DAT 破产（检索并非穷尽）；退市多为主动（Satsuma）或靠反向拆股避免（Nakamoto）</td></tr>
</table>

从这张表可以读出这一层最重要的一课：**决定一家 DAT 在熊市里命运的，不是它持有多少比特币，而是它的资本结构**。有抵押贷款的（Nakamoto）被迫卖币还债；有到期债务的（Sequans）卖币减债直至清仓；没有追保、有现金储备的（Strategy、Strive）则可以回购自己的证券、甚至在低点附近恢复买入。**当 mNAV < 1 时，合理的动作从“增发买币”变成了“卖币回购”**——ProCap 以约 40% 的折价回购股票就是这种逻辑（阶段 18.3 会讲这个决策的数学）。

最后提醒一个统计上的陷阱：**幸存者偏差**。排行榜只显示今天还在的公司；那些宣布转型后股价崩溃、悄悄退出的公司，不会出现在“前 20 名”里。评价这门生意时，要同时看**失败的那一半**。**本课只讲机制与分析框架，不构成投资建议。**
`,

  demo: "dat-landscape",

  analogy: `
把 DAT 全景想成**一片围着同一座金矿（比特币）扎营的淘金镇**。

镇上最大的那家（Strategy）占了三分之二的矿脉，它修的路、定的度量衡（每股比特币、BTC 评级），全镇都跟着用。

其他的营地各有打法：有的只收“固定分红的股东”、不借一分钱（Strive）；有的在另一个国家开矿，还顺便卖“金价保险”赚点零花（Metaplanet）；有的背后站着一个大财主（Twenty One）；有的借了高利贷买矿，金价一跌就只能卖金子还债（Nakamoto）。镇子隔壁还有淘银、淘铜的营地（以太坊、Solana 财库）——它们的矿会自己“生利息”（质押收益），但矿石价格晃得更厉害。

还有一些人住在镇上、口袋里揣着金块，但他们的正经营生是开铁匠铺（矿企）、开当铺（交易所）或造汽车（特斯拉）。别把他们算进“淘金者”。

淘金热的时候，只要挂出“我们也要淘金”的招牌，就有人排队投钱。金价一跌，镇子立刻分出了三种人：背着债的被迫卖金；没背债的回收自己的股份；最弱的收拾帐篷离开。**看一个营地能不能熬过冬天，不要看它挖了多少金子，要看它背了什么样的债。**
`,

  misconceptions: [
    "**“DAT 是一个有几百家公司的分散行业。”** —— 数字上它是“一个巨人加一群追随者”：约 196 家上市公司合计约 127 万 BTC，Strategy 一家约占 66%，第二名不到它的 6%。行业数据很大程度上就是 Strategy 的数据。",
    "**“排行榜上持币多的公司都是 DAT。”** —— 矿企的比特币是产品，交易所的比特币是业务的一部分，特斯拉只是顺便持币。mNAV、BTC Yield 这些指标只对以持币为主业的公司有意义。",
    "**“所有 DAT 的风险都差不多，因为资产都是比特币。”** —— 决定熊市命运的是资本结构：有比特币抵押贷款的 Nakamoto 被迫卖币还债，零债务、只用优先股的 Strive 和有大额美元储备的 Strategy 则可以回购与等待。",
    "**“以太坊、Solana 财库有质押收益，所以比比特币财库更安全。”** —— 质押收益以代币计价，随代币价格一起波动，还有锁定期与技术风险；这些资产的波动率通常更高。收益能部分覆盖成本，但不改变“资产价格决定一切”的本质。",
    "**“2026 年没有知名 DAT 破产，说明这个模式很稳。”** —— 事实表未发现知名破产，但检索并非穷尽；而且有公司清仓退出（Sequans）、主动退市（Satsuma）、靠反向拆股保住上市（Nakamoto）。只看幸存者会高估模式的稳健性。",
  ],

  quiz: [
    {
      q: "按 bitcointreasuries.net 2026 年 9 月下旬的统计，Strategy 约占上市公司比特币总持仓的多少？",
      options: [
        "约 10%",
        "约 25%",
        "约 66%",
        "约 95%",
      ],
      answer: 2,
      explain: "846,000 ÷ 1,272,886 ≈ **66%**。第二名 XXI 的 43,514 BTC 还不到 Strategy 的 6%。",
    },
    {
      q: "Metaplanet 在同一天有 0.58 倍、0.73 倍、0.79 倍三个 mNAV，最可能的原因是？",
      options: [
        "三个不同交易所的股价不同",
        "分别是市值口径、稀释口径、企业价值口径",
        "日元与美元汇率的影响",
        "数据错误",
      ],
      answer: 1,
      explain: "bitcointreasuries.net 同时给出**市值口径 0.58、稀释口径 0.73、企业价值口径 0.79**。企业价值口径把债务与优先股加进分子，所以更高。说 mNAV 必须说口径（阶段 15.1）。",
    },
    {
      q: "2026 年熊市中，哪一种资本结构特征最直接地导致公司被迫卖币还债？",
      options: [
        "发行了永续优先股",
        "持有大量美元储备",
        "只持有比特币、不持有其他资产",
        "借了以比特币为抵押的贷款",
      ],
      answer: 3,
      explain: "**抵押贷款有追保或还款压力**：Nakamoto 卖币偿还以比特币为抵押的 USDT 贷款，余款再融资时仍需质押至少 2,000 BTC。永续优先股没有到期日、没有质押，美元储备则提供缓冲。",
    },
    {
      q: "以太坊、Solana 财库与比特币财库相比，最主要的结构性区别是？",
      options: [
        "它们的资产可以质押产生代币计价的收益，比特币不能",
        "它们不能发行优先股",
        "它们都没有溢价",
        "它们的资产价格与加密市场无关",
      ],
      answer: 0,
      explain: "**质押收益**是关键区别（例如 Bitmine 约 507 万枚 ETH 在质押）。但收益以代币计价、随价格波动，并带来锁定期与技术风险。",
    },
    {
      q: "当一家 DAT 的 mNAV 明显低于 1 时，下列哪个动作在逻辑上最可能**增厚**每股比特币？",
      options: [
        "继续按市价增发普通股买比特币",
        "卖出少量比特币、以折价回购自己的股票",
        "发行更多可转债并支付现金股息",
        "暂停所有信息披露",
      ],
      answer: 1,
      explain: "mNAV < 1 时股票比它背后的比特币便宜：卖 1 美元比特币回购股票，能注销超过 1 美元比特币对应的股份，**每股比特币上升**。ProCap 以约 40% 折价回购就是这个逻辑；增发买币则是稀释（阶段 18.3）。",
    },
  ],

  further: [
    { label: "BitcoinTreasuries.net：上市公司比特币持仓排行与多口径 mNAV（以实时数据为准）", url: "https://bitcointreasuries.net/" },
    { label: "BitcoinTreasuries.net：Metaplanet 公司页（三种口径的 mNAV）", url: "https://bitcointreasuries.net/public-companies/metaplanet" },
    { label: "Strive 财库看板：持仓、SATA、放大比率与增值溢价", url: "https://strive.com/treasury" },
    { label: "Strategy 8-K（2026-09-21）：截至 9 月 20 日持有 846,000 BTC（SEC）", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526396093/mstr-20260914.htm" },
  ],
};
