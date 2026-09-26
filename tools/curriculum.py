# -*- coding: utf-8 -*-
"""Single source of truth for the course map. Run `python tools/curriculum.py` to regenerate content/manifest.js.
Each lesson: (id, zh title, en title, difficulty 1-3, personas)."""
import io, os

B, I, A, D = "beginner", "investor", "analyst", "builder"
ALL = [B, I, A, D]

TIERS = [
    ("intro",    "入门层 · 看懂钱与经济",          "Beginner · Money & the Economy",          "#3E97C9"),
    ("core",     "原理层 · 传统金融工具箱",        "Principles · The TradFi Toolkit",         "#1C7FB0"),
    ("systems",  "系统层 · 宏观、危机与风险",      "Systems · Macro, Crises & Risk",          "#155E86"),
    ("newfin",   "新金融层 · 比特币、DeFi 与代币化", "New Finance · Bitcoin, DeFi & Tokenization", "#23845F"),
    ("dat",      "焦点层 · 数字资产财库公司（DAT）", "The Focus · Digital Asset Treasury Companies", "#D97706"),
    ("mastery",  "精通层 · AI 时代与全景图",        "Mastery · The AI Era & the Whole Picture", "#6A5ACD"),
    ("infinity", "∞ 之后 · 你的新金融之路",         "∞ Beyond · Your Path in the New Finance",  "#0E0E0D"),
]

STAGES = [
  (0, "intro", "全景：金融到底在做什么", "The Big Picture: What Finance Actually Does",
   "金融的三种搬运 · 贯穿全课的四个核心观念 · 五千年金融创新时间线 · 新金融全景地图",
   "Finance moves value across time, space & risk · The four ideas behind everything · 5,000 years of financial innovation · The new-era map",
   [("what-finance-does", "金融到底在做什么：把价值在时间、空间与风险之间搬运", "What Finance Actually Does: Moving Value Across Time, Space & Risk", 1, ALL),
    ("four-ideas", "贯穿全课的四个观念：时间的价格、资产负债表、流动性与信任、风险与杠杆", "The Four Ideas Behind Everything: The Price of Time, Balance Sheets, Liquidity & Trust, Risk & Leverage", 1, ALL),
    ("finance-history", "从泥板到区块链：五千年金融创新简史", "From Clay Tablets to Blockchains: 5,000 Years of Financial Innovation", 1, [B, I, D]),
    ("new-era-map", "新金融全景地图：传统金融、DeFi、代币化、数字财库公司与 AI", "The New-Era Map: TradFi, DeFi, Tokenization, Digital Treasury Companies & AI on One Page", 1, ALL)]),
  (1, "intro", "货币与银行", "Money & Banking",
   "货币是什么 · 银行怎么“造钱” · 中央银行 · 通胀与购买力 · 从黄金到法币再到比特币",
   "What money is · How banks create money · Central banks · Inflation & purchasing power · From gold to fiat to Bitcoin",
   [("what-is-money", "货币是什么：交易媒介、记账单位与价值储藏", "What Money Is: Medium of Exchange, Unit of Account & Store of Value", 1, ALL),
    ("banks-create-money", "银行怎么“造钱”：存款、贷款与部分准备金", "How Banks Create Money: Deposits, Loans & Fractional Reserves", 1, [B, I, A]),
    ("central-banks", "中央银行：美联储、政策利率与最后贷款人", "Central Banks: The Fed, the Policy Rate & the Lender of Last Resort", 1, ALL),
    ("inflation", "通胀与购买力：CPI 怎么算、物价为什么涨、谁赢谁输", "Inflation & Purchasing Power: How CPI Works, Why Prices Rise, Who Wins & Loses", 1, [B, I, A]),
    ("gold-fiat-bitcoin", "从黄金到法币再到比特币：1971 年与对“硬钱”的追寻", "From Gold to Fiat to Bitcoin: 1971 & the Search for Hard Money", 1, ALL)]),
  (2, "intro", "时间的价格：利息、复利与折现", "The Price of Time: Interest, Compounding & Discounting",
   "货币的时间价值 · 复利与 72 法则 · 现值与折现 · 风险、回报与无风险利率 · 名义与实际",
   "The time value of money · Compounding & the Rule of 72 · Present value & discounting · Risk, return & the risk-free rate · Nominal vs real",
   [("time-value", "货币的时间价值：为什么今天的 100 元比明年的值钱", "The Time Value of Money: Why $100 Today Beats $100 Next Year", 1, ALL),
    ("compounding", "复利与 72 法则：世界第八大奇迹的算术", "Compounding & the Rule of 72: The Arithmetic of the Eighth Wonder", 1, [B, I, D]),
    ("present-value", "现值与折现：给任何未来现金流定价的万能公式", "Present Value & Discounting: One Formula to Price Any Future Cash Flow", 2, ALL),
    ("risk-free-rate", "风险、回报与无风险利率：为什么一切资产都以国债为锚", "Risk, Return & the Risk-Free Rate: Why Every Asset Is Priced Against Treasuries", 2, [I, A, D]),
    ("real-vs-nominal", "名义与实际：通胀、实际利率与看不见的税", "Nominal vs Real: Inflation, Real Yields & the Invisible Tax", 1, [B, I, A])]),
  (3, "intro", "读懂今天的经济", "Reading Today's Economy",
   "GDP 与经济周期 · 经济仪表盘（就业、CPI、PMI）· 财政赤字与国债 · 美元体系与全球资本流动",
   "GDP & the business cycle · The dashboard (jobs, CPI, PMIs) · Deficits & the national debt · The dollar system & global capital flows",
   [("gdp-cycle", "GDP、增长与经济周期：经济的心电图", "GDP, Growth & the Business Cycle: The Economy's Heartbeat", 1, [B, I, A]),
    ("economic-dashboard", "经济仪表盘：非农就业、CPI/PCE、PMI 与市场怎么读它们", "The Economic Dashboard: Jobs, CPI/PCE, PMIs & How Markets Read Them", 1, [I, A]),
    ("deficits-debt", "政府预算、赤字与国债：一个国家怎么借钱", "Budgets, Deficits & the National Debt: How a Country Borrows", 1, ALL),
    ("dollar-system", "美元体系：储备货币、欧洲美元与全球资本流动", "The Dollar System: Reserve Currency, Eurodollars & Global Capital Flows", 2, [I, A, D])]),

  (4, "core", "债券：金融世界的地基", "Bonds: The Bedrock of Finance",
   "债券是什么 · 价格与收益率的跷跷板 · 收益率曲线 · 久期与凸性 · 30 年期收益率上升为何令人担忧 · 信用评级与利差",
   "What a bond is · The price–yield seesaw · The yield curve · Duration & convexity · Why a rising 30-year yield is worrying · Credit ratings & spreads",
   [("what-is-bond", "债券是什么：票息、本金与到期日", "What a Bond Is: Coupon, Principal & Maturity", 1, ALL),
    ("price-yield", "价格与收益率的跷跷板：为什么利率一涨债券就跌", "The Price–Yield Seesaw: Why Bonds Fall When Rates Rise", 1, ALL),
    ("yield-curve", "收益率曲线：形状、倒挂与它在预言什么", "The Yield Curve: Shapes, Inversions & What It Predicts", 2, [I, A]),
    ("duration-convexity", "久期与凸性：利率动一下，债券动多少", "Duration & Convexity: How Much a Bond Moves When Rates Move", 2, [I, A]),
    ("long-bond-30y", "30 年期国债收益率上升为什么令人担忧：期限溢价、赤字与“债券义警”", "Why a Rising 30-Year Yield Is Worrying: Term Premium, Deficits & the Bond Vigilantes", 2, ALL),
    ("credit-spreads", "信用风险、评级与利差：从 AAA 到垃圾债", "Credit Risk, Ratings & Spreads: From AAA to Junk", 2, [I, A])]),
  (5, "core", "股票：拥有企业的一部分", "Stocks: Owning a Piece of a Business",
   "股票是剩余索取权 · 读三张财务报表 · 估值：DCF 与市盈率 · 股权风险溢价 · 增发、稀释与回购 · 指数、ETF 与被动资金",
   "Stocks as residual claims · Reading the three statements · Valuation: DCF & P/E · The equity risk premium · Issuance, dilution & buybacks · Indexes, ETFs & passive flows",
   [("what-is-stock", "股票是什么：所有权、剩余索取权与投票权", "What a Stock Is: Ownership, Residual Claims & Votes", 1, ALL),
    ("financial-statements", "读懂三张报表：利润表、资产负债表与现金流量表", "Reading the Three Statements: Income, Balance Sheet & Cash Flow", 1, [I, A, D]),
    ("valuation", "估值：DCF、市盈率，以及利率为什么决定估值倍数", "Valuation: DCF, P/E & Why Interest Rates Drive Multiples", 2, [I, A]),
    ("equity-risk-premium", "股权风险溢价与长期回报：股票为什么（通常）赢", "The Equity Risk Premium & Long-Run Returns: Why Stocks (Usually) Win", 2, [I, A]),
    ("dilution-buybacks", "增发、稀释与回购：真正重要的是“每股”", "Issuance, Dilution & Buybacks: Per-Share Is What Matters", 2, ALL),
    ("indexes-etfs", "指数、ETF 与被动资金：谁在替你买股票", "Indexes, ETFs & Passive Flows: Who Buys Stocks for You", 1, [B, I, A])]),
  (6, "core", "资本结构：谁先拿到钱", "The Capital Stack: Who Gets Paid First",
   "资本结构层次 · 优先股 · 累积/非累积、永续与可赎回条款 · 可转换债券 · 杠杆与覆盖率 · 破产、清偿顺序与回收率",
   "The layers of the capital stack · Preferred stock · Cumulative, perpetual & callable terms · Convertible bonds · Leverage & coverage · Bankruptcy, seniority & recovery",
   [("capital-stack", "资本结构：一家公司的“楼层图”与清偿顺序", "The Capital Stack: A Company's Floor Plan & the Order of Payment", 1, ALL),
    ("preferred-stock", "优先股：介于债券与股票之间的混血儿", "Preferred Stock: The Hybrid Between Bonds and Stocks", 2, ALL),
    ("preferred-terms", "读懂优先股条款：累积与非累积、永续、可赎回与清算优先权", "Reading Preferred Terms: Cumulative vs Non-Cumulative, Perpetual, Callable & Liquidation Preference", 2, [I, A]),
    ("convertible-bonds", "可转换债券：附带股票期权的债", "Convertible Bonds: Debt with an Equity Option Attached", 2, [I, A]),
    ("leverage-coverage", "杠杆与覆盖率：借多少才算太多", "Leverage & Coverage Ratios: How Much Borrowing Is Too Much", 2, [I, A, D]),
    ("bankruptcy-recovery", "破产、优先顺序与回收率：当一切出错时", "Bankruptcy, Seniority & Recovery Rates: When Everything Goes Wrong", 2, [I, A])]),
  (7, "core", "衍生品与波动率", "Derivatives & Volatility",
   "期货与远期 · 期权基础 · 波动率本身就是资产 · 互换与对冲、基差交易 · 保证金、杠杆与清算瀑布",
   "Futures & forwards · Options basics · Volatility as an asset · Swaps, hedging & the basis trade · Margin, leverage & liquidation cascades",
   [("futures-forwards", "期货与远期：今天锁定明天的价格", "Futures & Forwards: Locking In Tomorrow's Price Today", 1, [I, A, D]),
    ("options-basics", "期权入门：看涨、看跌与损益图", "Options Basics: Calls, Puts & Payoff Diagrams", 2, [I, A]),
    ("volatility-asset", "波动率是一种资产：隐含波动率与“卖波动率”的生意", "Volatility Is an Asset: Implied Volatility & the Business of Selling Vol", 3, [I, A]),
    ("swaps-hedging", "互换、对冲与基差交易：大机构怎么管理风险", "Swaps, Hedging & the Basis Trade: How Big Institutions Manage Risk", 3, [A]),
    ("margin-liquidation", "保证金、杠杆与清算瀑布：为什么暴跌会自我加速", "Margin, Leverage & Liquidation Cascades: Why Crashes Feed Themselves", 2, ALL)]),
  (8, "core", "市场的管道与机构", "Market Plumbing & Institutions",
   "交易所、券商与做市商 · 清算、结算与托管 · 回购与货币市场 · 资管、养老金、保险与影子银行/私募信贷",
   "Exchanges, brokers & market makers · Clearing, settlement & custody · Repo & money markets · Asset managers, pensions, insurers, shadow banks & private credit",
   [("exchanges-brokers", "交易所、券商与做市商：你按下“买入”之后发生了什么", "Exchanges, Brokers & Market Makers: What Happens After You Press Buy", 1, [B, I, D]),
    ("clearing-settlement", "清算、结算与托管：T+1 背后的管道", "Clearing, Settlement & Custody: The Plumbing Behind T+1", 2, [A, D]),
    ("repo-money-markets", "回购与货币市场：金融体系的隔夜引擎", "Repo & Money Markets: The Overnight Engine of the System", 3, [I, A]),
    ("institutions-private-credit", "谁拥有一切：资管、养老金、保险、影子银行与私募信贷", "Who Owns Everything: Asset Managers, Pensions, Insurers, Shadow Banks & Private Credit", 2, [I, A, D])]),

  (9, "systems", "货币政策与宏观流动性", "Monetary Policy & Macro Liquidity",
   "美联储工具箱（利率、QE、QT）· 政策怎么传导 · 全球流动性为何驱动风险资产与比特币 · 财政主导与 r vs g · 通胀的几种体制",
   "The Fed's toolkit (rates, QE, QT) · How policy transmits · Why global liquidity drives risk assets & Bitcoin · Fiscal dominance & r vs g · Inflation regimes",
   [("fed-toolkit", "美联储工具箱：利率、QE、QT 与准备金", "The Fed's Toolkit: Rates, QE, QT & Reserves", 2, [I, A]),
    ("policy-transmission", "政策怎么传导：从联邦基金利率到房贷、股市与比特币", "How Policy Transmits: From the Fed Funds Rate to Mortgages, Stocks & Bitcoin", 2, [I, A]),
    ("global-liquidity", "全球流动性：为什么“水位”决定风险资产与比特币", "Global Liquidity: Why the Tide Lifts Risk Assets & Bitcoin", 2, ALL),
    ("fiscal-dominance", "财政主导与债务可持续性：r 与 g 的赛跑", "Fiscal Dominance & Debt Sustainability: The Race Between r and g", 3, [I, A]),
    ("inflation-regimes", "通胀的几种体制：1970 年代、2021–23 年与下一次", "Inflation Regimes: The 1970s, 2021–23 & the Next One", 2, [I, A])]),
  (10, "systems", "危机与周期", "Crises & Cycles",
   "金融危机的解剖 · 2008 · 2020 年 3 月、2022 英国国债、2023 硅谷银行 · 泡沫与反身性 · 加密危机",
   "Anatomy of a crisis · 2008 · March 2020, UK gilts 2022, SVB 2023 · Bubbles & reflexivity · Crypto crises",
   [("anatomy-of-crisis", "金融危机的解剖：杠杆、期限错配与挤兑", "Anatomy of a Financial Crisis: Leverage, Maturity Mismatch & Runs", 2, ALL),
    ("case-2008", "2008：次贷、雷曼与管道冻结", "2008: Subprime, Lehman & the Plumbing Freeze", 2, [I, A]),
    ("rate-shock-cases", "利率冲击三连：2020 年 3 月、2022 英国养老金危机与 2023 硅谷银行", "Rate-Shock Trilogy: March 2020, the 2022 UK Gilt Crisis & SVB 2023", 3, [I, A]),
    ("bubbles-reflexivity", "泡沫与反身性：索罗斯、明斯基与叙事驱动的市场", "Bubbles & Reflexivity: Soros, Minsky & Narrative-Driven Markets", 2, [I, A]),
    ("crypto-crises", "加密危机：Mt. Gox、Terra/Luna、FTX 与 2022 年的连环爆雷", "Crypto Crises: Mt. Gox, Terra/Luna, FTX & the 2022 Contagion", 2, ALL)]),
  (11, "systems", "组合与风险管理", "Portfolios & Risk Management",
   "分散与相关性 · 组合构建（60/40、风险平价、全天候）· 衡量风险 · 仓位与凯利公式 · 行为陷阱",
   "Diversification & correlation · Portfolio construction (60/40, risk parity, all-weather) · Measuring risk · Position sizing & Kelly · Behavioral traps",
   [("diversification", "分散与相关性：唯一的免费午餐", "Diversification & Correlation: The Only Free Lunch", 1, [B, I, A]),
    ("portfolio-construction", "组合构建：60/40、风险平价与全天候", "Portfolio Construction: 60/40, Risk Parity & All-Weather", 2, [I, A]),
    ("risk-metrics", "衡量风险：波动率、最大回撤、夏普比率与 VaR", "Measuring Risk: Volatility, Drawdown, Sharpe & VaR", 2, [I, A]),
    ("position-sizing", "仓位与凯利公式：先活下来，再谈赚钱", "Position Sizing & the Kelly Criterion: Survive First, Then Compound", 3, [I, A]),
    ("behavioral-traps", "行为陷阱：FOMO、损失厌恶与杠杆后悔", "Behavioral Traps: FOMO, Loss Aversion & Leverage Regret", 1, [B, I])]),

  (12, "newfin", "比特币：作为金融资产", "Bitcoin as a Financial Asset",
   "比特币怎么运作 · 2100 万与减半 · 人们怎么给比特币估值 · 波动、周期与相关性 · 现货 ETF 与机构时代 · 比特币的风险",
   "How Bitcoin works · 21 million & the halvings · How people value Bitcoin · Volatility, cycles & correlation · Spot ETFs & the institutional era · Bitcoin's risks",
   [("bitcoin-how", "比特币怎么运作：用大白话讲清区块链、挖矿与密钥", "How Bitcoin Works: Blockchain, Mining & Keys in Plain Language", 1, ALL),
    ("bitcoin-supply", "2100 万与减半：一种写进代码的货币政策", "21 Million & the Halvings: Monetary Policy Written in Code", 1, ALL),
    ("bitcoin-valuation", "比特币怎么估值：数字黄金、网络价值与采用曲线", "How to Value Bitcoin: Digital Gold, Network Value & Adoption Curves", 2, [I, A]),
    ("bitcoin-volatility", "比特币的波动、周期与相关性：它到底是什么资产", "Bitcoin's Volatility, Cycles & Correlations: What Kind of Asset Is It?", 2, [I, A]),
    ("bitcoin-etfs", "现货 ETF、托管与机构时代：华尔街拥抱比特币", "Spot ETFs, Custody & the Institutional Era: Wall Street Embraces Bitcoin", 1, [B, I, A]),
    ("bitcoin-risks", "比特币的风险：量子、监管、安全预算与集中度", "Bitcoin's Risks: Quantum, Regulation, the Security Budget & Concentration", 2, ALL)]),
  (13, "newfin", "DeFi：写成代码的金融", "DeFi: Finance Written in Code",
   "DeFi 是什么 · 稳定币 · DEX 与 AMM · 链上借贷与清算 · 收益从哪来 · DeFi 的风险",
   "What DeFi is · Stablecoins · DEXs & AMMs · On-chain lending & liquidations · Where yield comes from · DeFi's risks",
   [("defi-what", "DeFi 是什么：把银行、交易所拆成开源代码", "What DeFi Is: Banks and Exchanges Rebuilt as Open-Source Code", 1, ALL),
    ("stablecoins", "稳定币：区块链上的美元与《GENIUS 法案》", "Stablecoins: Dollars on the Blockchain & the GENIUS Act", 1, ALL),
    ("amm-dex", "DEX 与 AMM：x·y=k 怎么替代做市商", "DEXs & AMMs: How x·y=k Replaces the Market Maker", 2, [I, A, D]),
    ("defi-lending", "链上借贷：超额抵押、健康因子与自动清算", "On-Chain Lending: Over-Collateralization, Health Factors & Automatic Liquidation", 2, [I, A, D]),
    ("defi-yield", "DeFi 收益从哪来：真实收益与代币补贴", "Where DeFi Yield Comes From: Real Yield vs Token Emissions", 2, [I, A]),
    ("defi-risks", "DeFi 的风险：合约漏洞、预言机、治理与脱锚", "DeFi's Risks: Contract Bugs, Oracles, Governance & Depegs", 2, ALL)]),
  (14, "newfin", "代币化：把传统资产搬上链（高层视角）", "Tokenization: TradFi Moves On-Chain (High Level)",
   "为什么要代币化 · 代币化国债与货币基金 · 代币化股票与 24/7 市场 · 法律外壳与局限 · 传统金融与链上金融的汇合",
   "Why tokenize · Tokenized Treasuries & money funds · Tokenized stocks & 24/7 markets · Legal wrappers & limits · The convergence of TradFi and on-chain finance",
   [("tokenization-why", "代币化：什么被搬上链、为什么", "Tokenization: What Moves On-Chain and Why", 1, ALL),
    ("tokenized-treasuries", "代币化国债与货币基金：第一个杀手级应用", "Tokenized Treasuries & Money Funds: The First Killer App", 2, [I, A, D]),
    ("tokenized-stocks", "代币化股票与 24/7 市场：股市会变成链上市场吗", "Tokenized Stocks & 24/7 Markets: Will the Stock Market Move On-Chain?", 2, [I, A, D]),
    ("tokenization-limits", "法律外壳、合规与代币化的边界", "Legal Wrappers, Compliance & the Limits of Tokenization", 2, [A, D]),
    ("convergence", "大汇合：银行、稳定币、存款代币与新的金融管道", "The Great Convergence: Banks, Stablecoins, Deposit Tokens & the New Plumbing", 2, ALL)]),

  (15, "dat", "数字资产财库公司是什么", "What a Digital Asset Treasury Company Is",
   "资产负债表就是产品 · Strategy 的故事 · DAT 为什么存在 · DAT 全景 · DAT vs ETF vs 直接持币 · 公允价值会计与税",
   "The balance sheet is the product · Strategy's story · Why DATs exist · The DAT landscape · DAT vs ETF vs self-custody · Fair-value accounting & tax",
   [("dat-what", "比特币财库公司是什么：资产负债表本身就是产品", "What a Bitcoin Treasury Company Is: The Balance Sheet Is the Product", 1, ALL),
    ("strategy-story", "Strategy 的故事：从 MicroStrategy 到最大的企业比特币持有者", "Strategy's Story: From MicroStrategy to the Largest Corporate Bitcoin Holder", 1, ALL),
    ("why-dats-exist", "DAT 为什么存在：资本市场套利、准入、监管与“卖波动率”", "Why DATs Exist: Capital-Markets Arbitrage, Access, Regulation & Selling Volatility", 2, [I, A]),
    ("dat-landscape", "DAT 全景：Strategy、Strive、Metaplanet、Twenty One 与山寨币财库", "The DAT Landscape: Strategy, Strive, Metaplanet, Twenty One & the Altcoin Treasuries", 1, ALL),
    ("dat-vs-etf", "DAT vs 现货 ETF vs 直接持币：三种拥有比特币的方式", "DAT vs Spot ETF vs Holding Bitcoin Directly: Three Ways to Own BTC", 1, [B, I, A]),
    ("dat-accounting", "公允价值会计、盈利波动与税：读懂 DAT 的财报", "Fair-Value Accounting, Earnings Swings & Tax: Reading a DAT's Financials", 2, [I, A])]),
  (16, "dat", "DAT 指标工具箱", "The DAT Metrics Toolkit",
   "每股比特币 · mNAV 溢价与折价 · BTC Yield / Gain / $ Gain · 放大倍数 · BTC 评级与资产覆盖 · 股息义务与美元储备 · 飞轮数学",
   "BTC per share · mNAV premium & discount · BTC Yield / Gain / $ Gain · Amplification · BTC rating & asset coverage · Dividend obligations & the USD reserve · The flywheel math",
   [("btc-per-share", "每股比特币：唯一真正复利增长的数字", "BTC per Share: The Only Number That Compounds", 1, ALL),
    ("mnav", "mNAV：市值与比特币净值之比——溢价、折价与它的几种算法", "mNAV: Market Value vs Bitcoin NAV — Premiums, Discounts & Its Several Definitions", 2, ALL),
    ("btc-yield-gain", "BTC Yield、BTC Gain 与 BTC $ Gain：拆解 Strategy 的核心 KPI", "BTC Yield, BTC Gain & BTC $ Gain: Decoding Strategy's Core KPIs", 2, [I, A]),
    ("amplification", "放大倍数：债务与优先股如何给每股比特币加杠杆", "Amplification: How Debt & Preferreds Lever Up BTC per Share", 2, [I, A]),
    ("btc-rating", "BTC 评级与资产覆盖：比特币能覆盖每一层几倍", "BTC Rating & Asset Coverage: How Many Times Bitcoin Covers Each Layer", 2, ALL),
    ("dividend-coverage", "股息义务、美元储备与覆盖月数：现金从哪来", "Dividend Obligations, the USD Reserve & Months of Coverage: Where the Cash Comes From", 2, [I, A]),
    ("flywheel-math", "飞轮数学：什么时候发股是增值的、什么时候在毁灭价值", "The Flywheel Math: When Issuing Stock Is Accretive — and When It Destroys Value", 3, [I, A])]),
  (17, "dat", "DAT 资本市场工具箱：产品逐个拆", "The DAT Capital-Markets Toolkit: Instrument by Instrument",
   "ATM 增发 · 可转债：把波动率卖给对冲基金 · Strategy 优先股家族 · STRC 与浮动利率永续 · Strive 与 SATA · 清偿顺序实战 · 税与资本返还",
   "At-the-market offerings · Convertibles: selling volatility to hedge funds · Strategy's preferred family · STRC & variable-rate perpetuals · Strive & SATA · Seniority in practice · Tax & return of capital",
   [("atm-offerings", "ATM 增发：把股票一点点卖进市场", "At-the-Market Offerings: Selling Stock Into the Market a Little at a Time", 2, [I, A]),
    ("dat-convertibles", "DAT 的可转债：把比特币波动率卖给对冲基金", "DAT Convertibles: Selling Bitcoin Volatility to Hedge Funds", 3, [I, A]),
    ("strategy-preferreds", "Strategy 的优先股家族：STRF、STRC、STRE、STRK、STRD 逐个拆", "Strategy's Preferred Family: STRF, STRC, STRE, STRK & STRD Taken Apart", 2, ALL),
    ("strc-variable-rate", "STRC 与浮动利率永续优先股：打造一种短久期的比特币信用", "STRC & Variable-Rate Perpetual Preferreds: Engineering Short-Duration Bitcoin Credit", 3, [I, A]),
    ("strive-sata", "Strive 与 SATA：只用优先股、不借债的“放大比特币”模式", "Strive & SATA: The Preferred-Only, No-Debt Model of Amplified Bitcoin", 2, ALL),
    ("seniority-in-practice", "清偿顺序实战：比特币跌 70% 时，谁先承受损失", "Seniority in Practice: Who Absorbs the Loss When Bitcoin Falls 70%", 2, ALL),
    ("preferred-tax-roc", "税与资本返还（ROC）：为什么优先股股息可能不算“收入”", "Tax & Return of Capital: Why a Preferred Dividend May Not Count as Income", 2, [I, A])]),
  (18, "dat", "DAT 风险评估与分析框架", "Assessing DAT Risk: The Analyst's Framework",
   "给比特币支撑的优先股估值 · 压力测试 · mNAV 压缩时会发生什么 · 指数纳入与结构性风险 · DAT 横向比较 · 分析师清单",
   "Valuing a BTC-backed preferred · Stress tests · What happens when mNAV compresses · Index inclusion & structural risk · Comparing DATs · The analyst's checklist",
   [("valuing-btc-preferreds", "给比特币支撑的优先股估值：收益率、利差、久期、赎回与信用", "Valuing a Bitcoin-Backed Preferred: Yield, Spread, Duration, Calls & Credit", 3, [I, A]),
    ("dat-stress-test", "压力测试：比特币跌 50%/80%、mNAV 跌破 1、市场冻结", "Stress-Testing a DAT: Bitcoin −50% / −80%, mNAV Below 1, Frozen Markets", 3, [I, A]),
    ("mnav-compression", "mNAV 压缩之后：回购、卖币与“死亡螺旋”的真相与迷思", "When mNAV Compresses: Buybacks, Selling Bitcoin & the Truth About Death Spirals", 3, [I, A]),
    ("index-structural-risk", "指数纳入、被动资金与结构性风险：MSCI、标普与公司治理", "Index Inclusion, Passive Flows & Structural Risk: MSCI, S&P & Governance", 2, [I, A]),
    ("dat-comparison", "DAT 横向比较：Strategy、Strive、Metaplanet 与 ETH/SOL 财库", "Comparing DATs: Strategy, Strive, Metaplanet & the ETH/SOL Treasuries", 2, [I, A]),
    ("dat-checklist", "DAT 分析师清单：十个问题读懂任何一家财库公司", "The DAT Analyst's Checklist: Ten Questions to Read Any Treasury Company", 2, ALL)]),

  (19, "mastery", "AI 时代的金融", "Finance in the AI Era",
   "AI、生产率与利率 · AI 资本开支狂潮与它的融资 · 市场里的 AI · 会付款的 AI 代理 · AI 通缩与稀缺资产",
   "AI, productivity & interest rates · The AI capex boom & how it is financed · AI inside markets · AI agents that pay · AI deflation & scarce assets",
   [("ai-productivity-rates", "AI、生产率与利率：AI 繁荣下的中性利率", "AI, Productivity & Interest Rates: r* in an AI Boom", 3, [I, A]),
    ("ai-capex-financing", "AI 资本开支狂潮与融资：超大厂债券、私募信贷与数据中心", "The AI Capex Boom & Its Financing: Hyperscaler Bonds, Private Credit & Data Centers", 2, [I, A, D]),
    ("ai-in-markets", "市场里的 AI：算法交易、投研与“优势”的消失与再生", "AI Inside Markets: Algorithmic Trading, Research & Where the Edge Goes", 2, [I, A, D]),
    ("agentic-payments", "会付款的 AI 代理：稳定币、x402 与机器对机器金融", "AI Agents That Pay: Stablecoins, x402 & Machine-to-Machine Finance", 2, [D, I, A]),
    ("ai-deflation-scarcity", "AI 通缩、劳动与稀缺资产：当智能变便宜，什么变贵", "AI Deflation, Labor & Scarce Assets: When Intelligence Gets Cheap, What Gets Expensive", 2, ALL)]),
  (20, "mastery", "全景图：把一切连起来", "The Whole Picture: Connecting Everything",
   "从 30 年期收益率到比特币再到 MSTR 优先股 · 宏观体制与资产表现 · 像专业人士一样读财经新闻 · 公式、指标与术语速查",
   "From the 30-year yield to Bitcoin to MSTR preferreds · Macro regimes & asset behavior · Reading financial news like a pro · Formulas, metrics & terms cheat sheet",
   [("connect-the-dots", "连点成线：从 30 年期收益率到比特币，再到 MSTR 与它的优先股", "Connecting the Dots: From the 30-Year Yield to Bitcoin to MSTR and Its Preferreds", 3, ALL),
    ("macro-regimes", "宏观体制地图：每种资产在什么环境里闪光", "The Macro Regime Map: Where Each Asset Shines", 3, [I, A]),
    ("read-news-like-pro", "像专业人士一样读财经新闻：五问法", "Reading Financial News Like a Pro: The Five-Question Method", 2, ALL),
    ("cheat-sheet", "附录：公式、指标与术语速查表", "Appendix: Formulas, Metrics & Terms Cheat Sheet", 2, ALL)]),
  ("∞", "infinity", "之后去哪：你的新金融之路", "Where It Goes: Your Path in the New Finance",
   "未解的问题 · 你的机会 · 毕业设计：从宏观到一家 DAT 的资本结构，写一份完整分析",
   "Open questions · Your opportunities · Capstone: a full analysis from macro down to one DAT's capital stack",
   [("open-questions", "未解的问题：比特币会成为数字信用的储备资产吗", "Open Questions: Will Bitcoin Become the Reserve Asset of Digital Credit?", 3, [I, A, D]),
    ("your-path", "你的机会：在新金融里工作、创业与投资", "Your Opportunities: Working, Building & Investing in the New Finance", 2, ALL),
    ("capstone", "毕业设计：从宏观到资本结构，亲手写一份完整分析", "Capstone: Write a Full Analysis — From Macro Down to a Capital Stack", 3, ALL)]),
]

def fname(n, lid):
    return "stageInf-%s.js" % lid if n == "∞" else "stage%s-%s.js" % (n, lid)

def js(s):
    assert '"' not in s, s
    return s

def build():
    out = []
    out.append('''// 课程地图（双语 + 元数据）。路线图/侧栏只读这个文件。由 tools/curriculum.py 生成——改课程结构请改那里再重新生成。
// 每节字段：id, title(中), titleEn(英), module(中文正文路径), status('ready'可学/其它=编写中),
//           difficulty(1基础/2进阶/3高级), personas(相关学习目标)
// 英文正文在 ./content/lessons/en/ 下同名文件；难度与 persona 与语言无关。

export const COURSE = {
  title: "Droplet Labs · 新金融之路",
  titleEn: "Droplet Labs · New Finance Path",
  subtitle: "从零到专家，看懂新时代的金融全景——今天的经济、债券与股票、比特币、DeFi 与代币化，以及以 Strategy、Strive 为代表的数字资产财库公司和它们的完整指标与工具箱",
  subtitleEn: "From zero to expert, see the whole picture of finance in the new era — today's economy, bonds and stocks, Bitcoin, DeFi and tokenization, and the digital asset treasury companies led by Strategy and Strive, with their complete metrics and toolkit.",

  tiers: [''')
    for tid, zh, en, c in TIERS:
        out.append('    { id: "%s", label: "%s", labelEn: "%s", color: "%s" },' % (tid, zh, en, c))
    out.append('''  ],

  goals: [
    { id: "beginner", label: "零基础", labelEn: "Beginner" },
    { id: "investor", label: "投资者", labelEn: "Investor" },
    { id: "analyst",  label: "分析师/从业者", labelEn: "Analyst / Pro" },
    { id: "builder",  label: "创业者/开发者", labelEn: "Builder" },
  ],

  stages: [''')
    for n, tier, zt, et, zb, eb, lessons in STAGES:
        nn = '"∞"' if n == "∞" else str(n)
        out.append('    {\n      n: %s, tier: "%s", title: "%s", titleEn: "%s",\n      blurb: "%s", blurbEn: "%s",\n      lessons: [' % (nn, tier, js(zt), js(et), js(zb), js(eb)))
        for lid, zh, en, d, ps in lessons:
            out.append('        { id: "%s", title: "%s", titleEn: "%s", module: "./content/lessons/%s", status: "ready", difficulty: %d, personas: [%s] },' % (lid, js(zh), js(en), fname(n, lid), d, ", ".join('"%s"' % p for p in ps)))
        out.append('      ],\n    },')
    out.append('  ],\n};\n')
    return "\n".join(out)

if __name__ == "__main__":
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    io.open(os.path.join(root, "content", "manifest.js"), "w", encoding="utf-8").write(build())
    ids = [l[0] for s in STAGES for l in s[6]]
    assert len(ids) == len(set(ids)), "duplicate ids"
    print("stages:", len(STAGES), "lessons:", len(ids))
