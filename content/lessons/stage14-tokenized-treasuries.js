export default {
  id: "tokenized-treasuries",
  stage: 14,
  order: 2,
  title: "代币化国债与货币基金：第一个杀手级应用",
  difficulty: "newfin",
  prereqs: ["tokenization-why", "repo-money-markets", "defi-yield"],

  oneLiner: `链上躺着 3,000 多亿美元的稳定币，持有人一分利息都拿不到，而短期国债在 2026 年 9 月的收益率约 4.24%。**代币化国债基金**就是把这份“时间的价格”搬上链：一只普通的国债货币基金，份额登记在区块链上，可以 24/7 转让、当抵押品、做稳定币和 DeFi 协议的储备。从 2024 年 3 月贝莱德 BUIDL 上线，到 2026 年年中约 150 亿–160 亿美元，它是代币化第一个真正跑通的应用。这一节拆开它的内部结构、增长数据、两大用途和藏在里面的流动性错配。`,

  intuition: `
先算一笔账。截至 2026 年 9 月 26 日，稳定币总量约 **3,120 亿美元**（阶段 13.2）。按《GENIUS 法案》，发行人**不得向持有人付息**。而同一时间，3 个月期美国国库券的收益率约 **4.24%**。

这意味着：假如这 3,120 亿美元全都留在稳定币里，持有人每年放弃的利息量级是 **130 亿美元**——这笔钱被发行人拿走了。对一个把 1,000 万美元闲钱放在链上的交易公司、加密基金或 DAO 金库来说，每年少拿的就是约 **42 万美元**。

这就是**观念① 时间的价格**在链上的一个缺口。在传统金融里，这个缺口早就被填上了：**货币市场基金**（阶段 8.3）把大家的闲钱集中起来买短期国债和回购，每天计息，随时赎回。问题是，货币基金的份额躺在过户代理人的数据库里，没法在周六凌晨转给交易所当保证金，也没法放进一个 DeFi 协议里当储备。

**代币化国债基金**正好把两边接上：它就是一只普通的国债货币基金（或类似结构），只是份额登记在区块链上。持有人拿到的是**国债利息减去管理费**，同时份额又像稳定币一样能在链上转账。2024 年 3 月，贝莱德（BlackRock）在以太坊上推出了 **BUIDL**，由 Securitize 负责代币化，这通常被看作这个赛道真正起步的时刻——这也是阶段 0.1 那条新闻标题里“贝莱德的代币化基金”指的东西。

它长得有多快？按 rwa.xyz 的统计（经媒体报道）：2024 年 8 月约 **20 亿美元**，2025 年 3 月 **42 亿**，2026 年 1 月初约 **89 亿**，2026 年 3 月 **110 亿**，2026 年 7 月约 **159 亿**——约一年翻了 2.5 倍。但放在整个国库券市场（约 7.25 万亿美元）里，它只占约 **0.2%**。

这一节同样落在**观念③ 流动性与信任**上。代币化国债之所以是“杀手级应用”，不只是因为它能付利息，更因为它是一种**会生息的抵押品**：在链上的世界里，它第一次让“最安全的资产”和“最快的管道”合二为一。2025 年 11 月，币安开始接受 BUIDL 作为机构客户的场外抵押品；越来越多的稳定币和 DeFi 协议把代币化国债放进自己的储备里（阶段 13.5 讲过的“代币化国债”收益来源就在这里）。

但它也继承了货币基金的老问题：**资产（国库券）只在工作日能卖，份额却 24/7 可以转让和申请赎回**。管道快了，底下的水库并没有跟着变快——这是本节最后要讲的风险。

**这一节，我们拆成五块：**

- **① 为什么是国债：把无风险利率搬上链**
- **② 解剖一只代币化货币基金**
- **③ 增长与格局：从 BUIDL 到百亿美元市场**
- **④ 用途一：会生息的抵押品**
- **⑤ 用途二：稳定币与 DeFi 的储备层，以及流动性错配**
`,

  mechanics: `
### ① 为什么是国债：把无风险利率搬上链

阶段 14.1 给过一个判断标准：资产越标准化、估值越透明、法律越简单、对快速流动的需求越大，越适合代币化。短期国债在每一条上都是满分：

- **估值透明**：国库券每天都有公开价格，货币基金的净值每天计算，几乎没有争议；
- **法律简单**：货币基金本来就是成熟的受监管产品，代币化只改份额登记方式；
- **风险极低**：信用上是美国政府的债务；利率风险也很小——3 个月期国库券的修正久期只有约 0.25，利率上升 1 个百分点，价格只跌约 0.25%（对比阶段 4.4 里 30 年期国债约 15.5 的修正久期）；
- **需求真实**：链上有几千亿美元不付息的稳定币，和大量需要保证金的交易活动。

第四条是关键。**代币化国债的增长和利率水平高度相关**：零利率年代（2020–2021），闲置稳定币的机会成本接近零，没人急着把国债搬上链；2022 年起美联储加息（阶段 9.1），链上“闲钱”的机会成本变得非常真实。**时间的价格越高，把它搬上链的动力越大。** 2026 年 9 月美联储重新加息到 3.75%–4.00%，这个动力没有消失。

还要分清它和稳定币的根本区别：

<table>
<tr><th></th><th>稳定币（如 USDC）</th><th>代币化国债基金（如 BUIDL）</th></tr>
<tr><td>法律性质</td><td>支付工具，发行人的负债（受《GENIUS 法案》约束）</td><td>证券：基金份额</td></tr>
<tr><td>持有人收益</td><td>0（法律禁止付息）</td><td>国债收益减费用</td></tr>
<tr><td>谁能持有</td><td>基本任何人</td><td>通常仅限通过审核的合格投资者 / 机构</td></tr>
<tr><td>用途</td><td>支付、交易结算</td><td>停泊资金、抵押品、储备</td></tr>
<tr><td>资产侧</td><td>现金、\\(\\le 93\\) 天国库券、回购等</td><td>国库券、回购、现金</td></tr>
</table>

**两者的资产几乎一样，差别在于“利息归谁”和“谁能持有”。** 稳定币是“链上的活期存款”，代币化国债基金是“链上的货币基金账户”。

### ② 解剖一只代币化货币基金

以 BUIDL 这类产品为模板，一只代币化国债基金的结构如下：

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">代币化国债基金的结构（示意）</text><rect x="30" y="50" width="160" height="92" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="110" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--green)">基金资产</text><text x="110" y="92" text-anchor="middle" font-size="11" fill="var(--ink)">美国国库券</text><text x="110" y="108" text-anchor="middle" font-size="11" fill="var(--ink)">国债回购 · 现金</text><text x="110" y="128" text-anchor="middle" font-size="10" fill="var(--muted)">由托管银行保管</text><rect x="240" y="50" width="160" height="92" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">基金管理人</text><text x="320" y="92" text-anchor="middle" font-size="11" fill="var(--ink)">投资、计算净值</text><text x="320" y="108" text-anchor="middle" font-size="11" fill="var(--ink)">收取管理费</text><text x="320" y="128" text-anchor="middle" font-size="10" fill="var(--muted)">审计师定期审计</text><rect x="450" y="50" width="160" height="92" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="530" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">过户代理人</text><text x="530" y="92" text-anchor="middle" font-size="11" fill="var(--ink)">在链上铸造 / 销毁代币</text><text x="530" y="108" text-anchor="middle" font-size="11" fill="var(--ink)">维护白名单</text><text x="530" y="128" text-anchor="middle" font-size="10" fill="var(--muted)">链上记录 = 份额登记</text><line x1="190" y1="96" x2="240" y2="96" stroke="var(--line)" stroke-width="2"/><line x1="400" y1="96" x2="450" y2="96" stroke="var(--line)" stroke-width="2"/><rect x="190" y="180" width="260" height="50" rx="8" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2"/><text x="320" y="201" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">链上份额代币（多条公链）</text><text x="320" y="219" text-anchor="middle" font-size="10" fill="var(--muted)">每日计息 · 按月派息或净值累积</text><line x1="530" y1="142" x2="400" y2="180" stroke="var(--orange)" stroke-width="2"/><rect x="20" y="252" width="140" height="36" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="90" y="274" text-anchor="middle" font-size="11" fill="var(--ink)">机构投资者钱包</text><rect x="175" y="252" width="140" height="36" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="245" y="274" text-anchor="middle" font-size="11" fill="var(--ink)">交易所抵押品账户</text><rect x="330" y="252" width="140" height="36" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="400" y="274" text-anchor="middle" font-size="11" fill="var(--ink)">稳定币 / 协议储备</text><rect x="485" y="252" width="140" height="36" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="555" y="274" text-anchor="middle" font-size="11" fill="var(--ink)">赎回成稳定币 / 美元</text><line x1="260" y1="230" x2="90" y2="252" stroke="var(--blue)" stroke-width="1.5"/><line x1="300" y1="230" x2="245" y2="252" stroke="var(--blue)" stroke-width="1.5"/><line x1="340" y1="230" x2="400" y2="252" stroke="var(--blue)" stroke-width="1.5"/><line x1="380" y1="230" x2="555" y2="252" stroke="var(--blue)" stroke-width="1.5"/></svg><figcaption>上半部分是一只普通的国债货币基金（资产、管理人、托管、审计）；唯一的新东西是过户代理人把份额登记放到了链上。下半部分是这些代币能去的地方——这才是代币化的价值所在。</figcaption></figure>

几个设计细节决定了产品的性格：

- **收益怎么到手**：常见两种。一种保持每枚代币约 1 美元，利息每天计提、定期以**新代币**的形式派给持有人（BUIDL 走这条路，到 2025 年 12 月 30 日累计派息已超过 1 亿美元）；另一种让代币价格每天随利息上涨（“累积型”），持有数量不变、单价变高。前者更像“会生息的稳定币”，后者在会计和 DeFi 集成上更简单。
- **谁能持有**：几乎所有主流产品都要求持有人通过 KYC/反洗钱审核，代币合约里有白名单，转给未经审核的钱包会直接失败。许多产品起投门槛很高，只对合格机构开放。
- **怎么进出**：申购和赎回走基金本身（通常按净值、以美元或稳定币结算）；有些产品还接入了“即时赎回”通道——比如由第三方用稳定币池子先接盘，再慢慢向基金赎回。
- **在哪条链上**：BUIDL 从以太坊起步，后来扩展到 Solana、Aptos、Arbitrum、Avalanche、Optimism、Polygon 和 BNB Chain。**多链意味着更多用户能用，也意味着更多桥和合约风险**（阶段 13.6）。

### ③ 增长与格局：从 BUIDL 到百亿美元市场

市场总规模（rwa.xyz 口径，经媒体报道）：

<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">代币化美国国债的市值（十亿美元，rwa.xyz 口径经媒体报道）</text><line x1="50" y1="210" x2="610" y2="210" stroke="var(--line)" stroke-width="1.5"/><rect x="70" y="185" width="60" height="25" fill="var(--orange)" opacity=".55"/><text x="100" y="178" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">2.0</text><text x="100" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">2024.8</text><rect x="160" y="158" width="60" height="52" fill="var(--orange)" opacity=".65"/><text x="190" y="151" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">4.2</text><text x="190" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">2025.3</text><rect x="250" y="129" width="60" height="81" fill="var(--orange)" opacity=".72"/><text x="280" y="122" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">6.5</text><text x="280" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">2025.7</text><rect x="340" y="99" width="60" height="111" fill="var(--orange)" opacity=".8"/><text x="370" y="92" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">8.9</text><text x="370" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">2026.1</text><rect x="430" y="73" width="60" height="137" fill="var(--orange)" opacity=".88"/><text x="460" y="66" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">11.0</text><text x="460" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">2026.3</text><rect x="520" y="12" width="60" height="198" fill="var(--orange)"/><text x="550" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="var(--surface)">15.9</text><text x="550" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">2026.7</text><text x="320" y="252" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">约一年 2.5 倍，但仍只占美国国库券存量（约 7.25 万亿美元）的约 0.2%</text></svg><figcaption>数据点来自 CoinDesk、Cointelegraph、Yahoo 等对 rwa.xyz 的引用；2026 年春季的跳升可能部分来自统计口径调整，9 月的数字尚未核实。以 rwa.xyz 实时数据为准。</figcaption></figure>

几只主要产品（截至 2026 年年中，数字取自媒体引用的 rwa.xyz 数据，均为约数）：

<table>
<tr><th>产品</th><th>发行方</th><th>规模（约）</th><th>备注</th></tr>
<tr><td>USYC</td><td>Circle</td><td>29.5 亿美元（2026 年 7 月）</td><td>2026 年 3 月超过 BUIDL 成为最大；大部分在 BNB Chain 上，与币安抵押品业务相关</td></tr>
<tr><td>BUIDL</td><td>贝莱德 / Securitize</td><td>26 亿美元（2026 年 7 月）</td><td>2024 年 3 月上线；市场份额从约 46% 的高点降到约 18%</td></tr>
<tr><td>BENJI（FOBXX）</td><td>富兰克林邓普顿</td><td>约 24 亿美元（2026 年，具体日期未核实）</td><td>最早把基金份额登记放上公链的产品之一</td></tr>
<tr><td>USDY</td><td>Ondo</td><td>21.6 亿美元（2026 年 7 月）</td><td>以短期国债为支撑的代币化票据，主要面向美国以外的投资者</td></tr>
</table>

两个观察。第一，**BUIDL 的份额下降不是因为它变小了，而是因为对手变多了**——一个市场从“一家独大”走向竞争，通常是它变成熟的信号。第二，**规模跟着“用途”走**：USYC 的大部分余额出现在 BNB Chain 上，恰恰因为那里接上了交易所的抵押品系统。代币化国债的需求主要不来自散户理财，而来自**需要一个会生息的链上抵押品的机构**。按链分布，2026 年 7 月以太坊上约 71 亿美元、BNB Chain 上约 46 亿美元。

本课只讲机制与分析框架，不构成投资建议；具体产品的条款、费率与准入以其官方文件为准。

### ④ 用途一：会生息的抵押品

阶段 8.3 讲过，回购市场和保证金体系的本质是**抵押品链条**：谁能用什么资产、以多大的折扣（haircut）、多快地借到钱。传统上，交易所和经纪商最喜欢的抵押品是现金和国债，但把国债从一个托管账户挪到另一个要走 Fedwire 证券系统、只在工作日运行。

在加密市场，交易 24/7 进行，保证金也 24/7 被追加。以前机构只有两个选择：**放稳定币当保证金**（随时可用，但不生息），或者**放国债在传统账户里**（生息，但周末挪不动）。代币化国债提供了第三个选项：**既生息、又能 24/7 挪动**。

算一笔账：一家机构有 5,000 万美元资金，在交易所需要 2,000 万美元的保证金。
- 用稳定币当保证金：2,000 万不生息，其余 3,000 万放在国债基金里按约 4% 计息 → 一年利息约 \\(3{,}000\\ \\text{万} \\times 4\\% = 120\\ \\text{万美元}\\)；
- 用代币化国债当保证金：假设交易所对它打 2% 的折扣，需要放入约 \\(\\dfrac{2{,}000\\ \\text{万}}{1 - 2\\%} \\approx 2{,}041\\ \\text{万美元}\\) 的代币——但这些代币本身还在生息，5,000 万全部计息 → 一年约 \\(5{,}000\\ \\text{万} \\times 4\\% = 200\\ \\text{万美元}\\)。
- **差额约 80 万美元/年，正好等于 \\(2{,}000\\ \\text{万保证金} \\times 4\\%\\)**：抵押品本身不再是“死钱”。

折扣（haircut）的意义在于：代币化国债的价格不是绝对不动的（利率风险虽小但存在），赎回也需要时间，所以接受方要留一点缓冲。**折扣越小、接受的场所越多，这枚代币作为“抵押品”的价值就越高。** 这就是为什么 2025 年 11 月币安接纳 BUIDL 为场外抵押品是一条大新闻——它把一只基金变成了一种“链上保证金货币”。

### ⑤ 用途二：稳定币与 DeFi 的储备层，以及流动性错配

第二大用途是**给别的链上产品当储备**：

- **稳定币发行人**：一些发行人把部分储备放在代币化国债基金里，既满足“持有短期国债”的要求，又能在链上随时调动。（《GENIUS 法案》允许的储备资产包括政府货币市场基金；具体产品能否计入，要看 2026 年仍在制定中的实施细则。）
- **DeFi 协议**：阶段 13.2 提到，“去中心化”稳定币为了稳住价格，吸收了大量 USDC 和代币化国债作为储备；借贷协议也开始接受代币化国债作为抵押品。阶段 13.5 讲的“真实收益”里，代币化国债是最干净的一种：**收益的来源是美国财政部支付的利息**，而不是新代币的补贴。

这里藏着本节最重要的风险：**流动性错配**。代币化基金的份额可以在周六凌晨转让，甚至提交赎回请求；可基金持有的国库券只能在工作日卖出、通过传统系统结算。平时这没有问题——净赎回很小，基金手头的现金和隔夜回购够用。但设想一个周末，某个大量使用代币化国债作储备的协议被黑客攻击（2026 年 4 月 KelpDAO 事件曾在两天内引发约 130 亿美元的 DeFi 资金流出，阶段 13.6），所有人同时想把代币换成稳定币：

- 基金本身不会“违约”，资产都在；
- 但**即时赎回通道和二级市场的流动性是有限的**，代币可能在周末以低于净值的价格成交；
- 到周一基金卖出国库券、按净值兑付，价差才会收敛。

这是阶段 10.1 挤兑逻辑的一个温和版本：**资产是好的，只是“兑现的速度”赶不上“想兑现的速度”**。它提醒我们：代币化可以让份额 24/7 流动，但**不能让国库券 24/7 流动**——除非有一个 24/7 的现金来源在下面托底。阶段 14.4 会把这种“流动性幻觉”系统化；阶段 14.5 则会讨论谁最可能成为那个托底者：银行存款代币、稳定币，还是有一天中央银行的准备金。再往后，阶段 17.4 会讲到 Strategy 的 STRC——另一种试图把价格稳在 100 美元附近、每月调整利率的“类货币”工具，你会发现它和这里讨论的产品在同一片水域竞争资金。
`,

  demo: "tokenized-treasuries",

  analogy: `
想象一个大型停车场（链上世界），里面停着几千亿美元的车（稳定币）。车停着不收费，但也一分钱不赚；停车场老板（稳定币发行人）却把这些车对应的钱拿去放了定期，利息自己收下。

代币化国债基金就像停车场里新开的一个**“会下蛋的停车位”**：你把车停进去，它每天给你下一个小蛋（国债利息减去管理费）；更妙的是，这个车位的“停车凭证”本身就能在停车场里流通——你可以把凭证交给隔壁的赛车场（交易所）当押金，押金放在那里也照样每天下蛋。

限制也来自同一个比喻：停车场 24 小时开放，可“会下蛋”的那部分，其实是把车开出停车场、存进外面那家**只在工作日营业的银行**。平时大家只是来回换凭证，没人真的要把车开走，一切顺畅；可如果某个周六晚上停车场里起了火，所有人都想立刻把车开走——凭证能秒转，银行却要到周一才开门。**凭证的速度，不等于车库大门的速度。**
`,

  misconceptions: [
    "**“代币化国债基金就是会付利息的稳定币。”** —— 法律上完全不同：稳定币是支付工具，受《GENIUS 法案》约束、不能付息、几乎人人可持有；代币化国债基金是证券，通常只对通过审核的合格投资者开放。两者资产相似，但利息归属与准入规则不同。",
    "**“代币化国债没有任何风险，因为背后是美国国债。”** —— 信用和利率风险确实很低，但多了新的风险：智能合约与跨链桥、托管、白名单与冻结权限，以及“份额 24/7 可转让、国库券只在工作日可卖”的流动性错配。",
    "**“BUIDL 的市场份额从约 46% 降到约 18%，说明它在萎缩。”** —— 2026 年 7 月 BUIDL 约 26 亿美元，规模并未萎缩；份额下降主要是因为 Circle 的 USYC、Ondo、富兰克林等竞争者长得更快。从一家独大到多家竞争，是市场成熟的信号。",
    "**“代币化国债已经是国债市场的重要买家。”** —— 约 150 亿–160 亿美元，只占约 7.25 万亿美元国库券存量的约 0.2%。真正体量大的“链上国债买家”是稳定币发行人（总量约 3,120 亿美元）。",
    "**“利率越低，代币化国债越有吸引力，因为更安全。”** —— 恰恰相反：代币化国债的吸引力来自“闲置链上美元的机会成本”，利率越高这个成本越大。零利率年代没有人急着把国债搬上链。",
  ],

  quiz: [
    {
      q: "一家 DAO 把 1,000 万美元闲钱放在稳定币里。若短期国债收益率约 4.24%、代币化国债基金年费 0.15%，改持该基金一年大约多拿多少利息？",
      options: ["约 42.4 万美元", "约 1.5 万美元", "约 40.9 万美元", "0，因为稳定币也付息"],
      answer: 2,
      explain: "**\\(1{,}000\\ \\text{万} \\times (4.24\\% - 0.15\\%) \\approx 40.9\\ \\text{万美元}\\)**。稳定币持有人收益为 0（《GENIUS 法案》禁止付息），所以差额就是基金的净收益。若不扣费，是约 42.4 万。",
    },
    {
      q: "一家机构有 5,000 万美元资金，需要在交易所放 2,000 万美元保证金。与放稳定币相比，改放代币化国债（收益约 4%）一年大约多赚多少？",
      options: ["约 200 万美元", "约 80 万美元", "约 120 万美元", "约 4 万美元"],
      answer: 1,
      explain: "放稳定币时 2,000 万保证金不生息；放代币化国债时保证金本身也在生息。差额 **\\(\\approx 2{,}000\\ \\text{万} \\times 4\\% = 80\\ \\text{万美元/年}\\)**（折扣只影响需要放多少代币，不影响这部分代币照样计息）。",
    },
    {
      q: "为什么说代币化国债基金存在“流动性错配”？",
      options: ["因为国库券的信用风险很高", "因为基金份额只能在工作日转让", "因为份额可以 24/7 转让与申请赎回，而基金持有的国库券只能在工作日卖出和结算", "因为代币化基金不持有现金"],
      answer: 2,
      explain: "**管道快了，水库没变快**。平时净赎回小，现金和隔夜回购够用；一旦周末集中赎回，即时赎回通道和二级市场流动性有限，代币可能低于净值成交，要等周一卖出国库券才能收敛。",
    },
    {
      q: "3 个月期国库券的修正久期约 0.25。若利率突然上升 1 个百分点，一只主要持有这类国库券的基金净值大约变化多少？",
      options: ["约 −0.25%", "约 −15.5%", "约 −2.5%", "约 +1%"],
      answer: 0,
      explain: "\\(\\text{价格变化} \\approx -\\text{修正久期} \\times \\text{利率变化} = -0.25 \\times 1\\% \\approx\\) **\\(-0.25\\%\\)**（阶段 4.4）。这就是为什么短期国债适合当抵押品；对比 30 年期国债约 15.5 的修正久期，同样的冲击会跌约 14%。",
    },
    {
      q: "以下哪一项最能解释 2026 年 Circle 的 USYC 大部分余额出现在 BNB Chain 上？",
      options: ["BNB Chain 上的国债收益率更高", "BNB Chain 与交易所的抵押品系统相连，需求来自需要生息抵押品的机构", "BNB Chain 不需要 KYC", "Circle 不被允许在以太坊上发行"],
      answer: 1,
      explain: "**规模跟着用途走**。代币化国债的主要需求来自需要“会生息的抵押品”的机构；哪条链接上了大的抵押品系统，余额就往哪里去。国债收益率在各链上完全相同。",
    },
  ],

  further: [
    { label: "RWA 之路（姊妹课程：代币化基金、托管与法律结构的深度讲解）", url: "https://evidex-cloud.github.io/droplet-labs-rwa-path/" },
    { label: "rwa.xyz 代币化国债看板（实时规模与各产品份额）", url: "https://app.rwa.xyz/treasuries" },
    { label: "CoinDesk：Circle 超过贝莱德，代币化国债创 110 亿美元新高（2026 年 3 月）", url: "https://www.coindesk.com/markets/2026/03/13/circle-overtakes-blackrock-in-tokenized-treasuries-as-market-hits-record-usd11-billion" },
    { label: "CoinDesk：币安接受 BUIDL 作为机构场外抵押品（2025 年 11 月）", url: "https://www.coindesk.com/business/2025/11/14/blackrock-s-usd2-5b-tokenized-fund-gets-listed-as-collateral-on-binance-expands-to-bnb-chain" },
    { label: "《GENIUS 法案》全文（储备资产与禁止付息条款）", url: "https://www.congress.gov/bill/119th-congress/senate-bill/1582/text" },
  ],
};
