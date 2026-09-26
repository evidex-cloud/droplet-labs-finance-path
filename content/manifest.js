// 课程地图（双语 + 元数据）。路线图/侧栏只读这个文件。由 tools/curriculum.py 生成——改课程结构请改那里再重新生成。
// 每节字段：id, title(中), titleEn(英), module(中文正文路径), status('ready'可学/其它=编写中),
//           difficulty(1基础/2进阶/3高级), personas(相关学习目标)
// 英文正文在 ./content/lessons/en/ 下同名文件；难度与 persona 与语言无关。

export const COURSE = {
  title: "Droplet Labs · 新金融之路",
  titleEn: "Droplet Labs · New Finance Path",
  subtitle: "从零到专家，看懂新时代的金融全景——今天的经济、债券与股票、比特币、DeFi 与代币化，以及以 Strategy、Strive 为代表的数字资产财库公司和它们的完整指标与工具箱",
  subtitleEn: "From zero to expert, see the whole picture of finance in the new era — today's economy, bonds and stocks, Bitcoin, DeFi and tokenization, and the digital asset treasury companies led by Strategy and Strive, with their complete metrics and toolkit.",

  tiers: [
    { id: "intro", label: "入门层 · 看懂钱与经济", labelEn: "Beginner · Money & the Economy", color: "#3E97C9" },
    { id: "core", label: "原理层 · 传统金融工具箱", labelEn: "Principles · The TradFi Toolkit", color: "#1C7FB0" },
    { id: "systems", label: "系统层 · 宏观、危机与风险", labelEn: "Systems · Macro, Crises & Risk", color: "#155E86" },
    { id: "newfin", label: "新金融层 · 比特币、DeFi 与代币化", labelEn: "New Finance · Bitcoin, DeFi & Tokenization", color: "#23845F" },
    { id: "dat", label: "焦点层 · 数字资产财库公司（DAT）", labelEn: "The Focus · Digital Asset Treasury Companies", color: "#D97706" },
    { id: "mastery", label: "精通层 · AI 时代与全景图", labelEn: "Mastery · The AI Era & the Whole Picture", color: "#6A5ACD" },
    { id: "infinity", label: "∞ 之后 · 你的新金融之路", labelEn: "∞ Beyond · Your Path in the New Finance", color: "#0E0E0D" },
  ],

  goals: [
    { id: "beginner", label: "零基础", labelEn: "Beginner" },
    { id: "investor", label: "投资者", labelEn: "Investor" },
    { id: "analyst",  label: "分析师/从业者", labelEn: "Analyst / Pro" },
    { id: "builder",  label: "创业者/开发者", labelEn: "Builder" },
  ],

  stages: [
    {
      n: 0, tier: "intro", title: "全景：金融到底在做什么", titleEn: "The Big Picture: What Finance Actually Does",
      blurb: "金融的三种搬运 · 贯穿全课的四个核心观念 · 五千年金融创新时间线 · 新金融全景地图", blurbEn: "Finance moves value across time, space & risk · The four ideas behind everything · 5,000 years of financial innovation · The new-era map",
      lessons: [
        { id: "what-finance-does", title: "金融到底在做什么：把价值在时间、空间与风险之间搬运", titleEn: "What Finance Actually Does: Moving Value Across Time, Space & Risk", module: "./content/lessons/stage0-what-finance-does.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "four-ideas", title: "贯穿全课的四个观念：时间的价格、资产负债表、流动性与信任、风险与杠杆", titleEn: "The Four Ideas Behind Everything: The Price of Time, Balance Sheets, Liquidity & Trust, Risk & Leverage", module: "./content/lessons/stage0-four-ideas.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "finance-history", title: "从泥板到区块链：五千年金融创新简史", titleEn: "From Clay Tablets to Blockchains: 5,000 Years of Financial Innovation", module: "./content/lessons/stage0-finance-history.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "builder"] },
        { id: "new-era-map", title: "新金融全景地图：传统金融、DeFi、代币化、数字财库公司与 AI", titleEn: "The New-Era Map: TradFi, DeFi, Tokenization, Digital Treasury Companies & AI on One Page", module: "./content/lessons/stage0-new-era-map.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
      ],
    },
    {
      n: 1, tier: "intro", title: "货币与银行", titleEn: "Money & Banking",
      blurb: "货币是什么 · 银行怎么“造钱” · 中央银行 · 通胀与购买力 · 从黄金到法币再到比特币", blurbEn: "What money is · How banks create money · Central banks · Inflation & purchasing power · From gold to fiat to Bitcoin",
      lessons: [
        { id: "what-is-money", title: "货币是什么：交易媒介、记账单位与价值储藏", titleEn: "What Money Is: Medium of Exchange, Unit of Account & Store of Value", module: "./content/lessons/stage1-what-is-money.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "banks-create-money", title: "银行怎么“造钱”：存款、贷款与部分准备金", titleEn: "How Banks Create Money: Deposits, Loans & Fractional Reserves", module: "./content/lessons/stage1-banks-create-money.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst"] },
        { id: "central-banks", title: "中央银行：美联储、政策利率与最后贷款人", titleEn: "Central Banks: The Fed, the Policy Rate & the Lender of Last Resort", module: "./content/lessons/stage1-central-banks.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "inflation", title: "通胀与购买力：CPI 怎么算、物价为什么涨、谁赢谁输", titleEn: "Inflation & Purchasing Power: How CPI Works, Why Prices Rise, Who Wins & Loses", module: "./content/lessons/stage1-inflation.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst"] },
        { id: "gold-fiat-bitcoin", title: "从黄金到法币再到比特币：1971 年与对“硬钱”的追寻", titleEn: "From Gold to Fiat to Bitcoin: 1971 & the Search for Hard Money", module: "./content/lessons/stage1-gold-fiat-bitcoin.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
      ],
    },
    {
      n: 2, tier: "intro", title: "时间的价格：利息、复利与折现", titleEn: "The Price of Time: Interest, Compounding & Discounting",
      blurb: "货币的时间价值 · 复利与 72 法则 · 现值与折现 · 风险、回报与无风险利率 · 名义与实际", blurbEn: "The time value of money · Compounding & the Rule of 72 · Present value & discounting · Risk, return & the risk-free rate · Nominal vs real",
      lessons: [
        { id: "time-value", title: "货币的时间价值：为什么今天的 100 元比明年的值钱", titleEn: "The Time Value of Money: Why $100 Today Beats $100 Next Year", module: "./content/lessons/stage2-time-value.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "compounding", title: "复利与 72 法则：世界第八大奇迹的算术", titleEn: "Compounding & the Rule of 72: The Arithmetic of the Eighth Wonder", module: "./content/lessons/stage2-compounding.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "builder"] },
        { id: "present-value", title: "现值与折现：给任何未来现金流定价的万能公式", titleEn: "Present Value & Discounting: One Formula to Price Any Future Cash Flow", module: "./content/lessons/stage2-present-value.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "risk-free-rate", title: "风险、回报与无风险利率：为什么一切资产都以国债为锚", titleEn: "Risk, Return & the Risk-Free Rate: Why Every Asset Is Priced Against Treasuries", module: "./content/lessons/stage2-risk-free-rate.js", status: "ready", difficulty: 2, personas: ["investor", "analyst", "builder"] },
        { id: "real-vs-nominal", title: "名义与实际：通胀、实际利率与看不见的税", titleEn: "Nominal vs Real: Inflation, Real Yields & the Invisible Tax", module: "./content/lessons/stage2-real-vs-nominal.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst"] },
      ],
    },
    {
      n: 3, tier: "intro", title: "读懂今天的经济", titleEn: "Reading Today's Economy",
      blurb: "GDP 与经济周期 · 经济仪表盘（就业、CPI、PMI）· 财政赤字与国债 · 美元体系与全球资本流动", blurbEn: "GDP & the business cycle · The dashboard (jobs, CPI, PMIs) · Deficits & the national debt · The dollar system & global capital flows",
      lessons: [
        { id: "gdp-cycle", title: "GDP、增长与经济周期：经济的心电图", titleEn: "GDP, Growth & the Business Cycle: The Economy's Heartbeat", module: "./content/lessons/stage3-gdp-cycle.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst"] },
        { id: "economic-dashboard", title: "经济仪表盘：非农就业、CPI/PCE、PMI 与市场怎么读它们", titleEn: "The Economic Dashboard: Jobs, CPI/PCE, PMIs & How Markets Read Them", module: "./content/lessons/stage3-economic-dashboard.js", status: "ready", difficulty: 1, personas: ["investor", "analyst"] },
        { id: "deficits-debt", title: "政府预算、赤字与国债：一个国家怎么借钱", titleEn: "Budgets, Deficits & the National Debt: How a Country Borrows", module: "./content/lessons/stage3-deficits-debt.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "dollar-system", title: "美元体系：储备货币、欧洲美元与全球资本流动", titleEn: "The Dollar System: Reserve Currency, Eurodollars & Global Capital Flows", module: "./content/lessons/stage3-dollar-system.js", status: "ready", difficulty: 2, personas: ["investor", "analyst", "builder"] },
      ],
    },
    {
      n: 4, tier: "core", title: "债券：金融世界的地基", titleEn: "Bonds: The Bedrock of Finance",
      blurb: "债券是什么 · 价格与收益率的跷跷板 · 收益率曲线 · 久期与凸性 · 30 年期收益率上升为何令人担忧 · 信用评级与利差", blurbEn: "What a bond is · The price–yield seesaw · The yield curve · Duration & convexity · Why a rising 30-year yield is worrying · Credit ratings & spreads",
      lessons: [
        { id: "what-is-bond", title: "债券是什么：票息、本金与到期日", titleEn: "What a Bond Is: Coupon, Principal & Maturity", module: "./content/lessons/stage4-what-is-bond.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "price-yield", title: "价格与收益率的跷跷板：为什么利率一涨债券就跌", titleEn: "The Price–Yield Seesaw: Why Bonds Fall When Rates Rise", module: "./content/lessons/stage4-price-yield.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "yield-curve", title: "收益率曲线：形状、倒挂与它在预言什么", titleEn: "The Yield Curve: Shapes, Inversions & What It Predicts", module: "./content/lessons/stage4-yield-curve.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "duration-convexity", title: "久期与凸性：利率动一下，债券动多少", titleEn: "Duration & Convexity: How Much a Bond Moves When Rates Move", module: "./content/lessons/stage4-duration-convexity.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "long-bond-30y", title: "30 年期国债收益率上升为什么令人担忧：期限溢价、赤字与“债券义警”", titleEn: "Why a Rising 30-Year Yield Is Worrying: Term Premium, Deficits & the Bond Vigilantes", module: "./content/lessons/stage4-long-bond-30y.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "credit-spreads", title: "信用风险、评级与利差：从 AAA 到垃圾债", titleEn: "Credit Risk, Ratings & Spreads: From AAA to Junk", module: "./content/lessons/stage4-credit-spreads.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
      ],
    },
    {
      n: 5, tier: "core", title: "股票：拥有企业的一部分", titleEn: "Stocks: Owning a Piece of a Business",
      blurb: "股票是剩余索取权 · 读三张财务报表 · 估值：DCF 与市盈率 · 股权风险溢价 · 增发、稀释与回购 · 指数、ETF 与被动资金", blurbEn: "Stocks as residual claims · Reading the three statements · Valuation: DCF & P/E · The equity risk premium · Issuance, dilution & buybacks · Indexes, ETFs & passive flows",
      lessons: [
        { id: "what-is-stock", title: "股票是什么：所有权、剩余索取权与投票权", titleEn: "What a Stock Is: Ownership, Residual Claims & Votes", module: "./content/lessons/stage5-what-is-stock.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "financial-statements", title: "读懂三张报表：利润表、资产负债表与现金流量表", titleEn: "Reading the Three Statements: Income, Balance Sheet & Cash Flow", module: "./content/lessons/stage5-financial-statements.js", status: "ready", difficulty: 1, personas: ["investor", "analyst", "builder"] },
        { id: "valuation", title: "估值：DCF、市盈率，以及利率为什么决定估值倍数", titleEn: "Valuation: DCF, P/E & Why Interest Rates Drive Multiples", module: "./content/lessons/stage5-valuation.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "equity-risk-premium", title: "股权风险溢价与长期回报：股票为什么（通常）赢", titleEn: "The Equity Risk Premium & Long-Run Returns: Why Stocks (Usually) Win", module: "./content/lessons/stage5-equity-risk-premium.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "dilution-buybacks", title: "增发、稀释与回购：真正重要的是“每股”", titleEn: "Issuance, Dilution & Buybacks: Per-Share Is What Matters", module: "./content/lessons/stage5-dilution-buybacks.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "indexes-etfs", title: "指数、ETF 与被动资金：谁在替你买股票", titleEn: "Indexes, ETFs & Passive Flows: Who Buys Stocks for You", module: "./content/lessons/stage5-indexes-etfs.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst"] },
      ],
    },
    {
      n: 6, tier: "core", title: "资本结构：谁先拿到钱", titleEn: "The Capital Stack: Who Gets Paid First",
      blurb: "资本结构层次 · 优先股 · 累积/非累积、永续与可赎回条款 · 可转换债券 · 杠杆与覆盖率 · 破产、清偿顺序与回收率", blurbEn: "The layers of the capital stack · Preferred stock · Cumulative, perpetual & callable terms · Convertible bonds · Leverage & coverage · Bankruptcy, seniority & recovery",
      lessons: [
        { id: "capital-stack", title: "资本结构：一家公司的“楼层图”与清偿顺序", titleEn: "The Capital Stack: A Company's Floor Plan & the Order of Payment", module: "./content/lessons/stage6-capital-stack.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "preferred-stock", title: "优先股：介于债券与股票之间的混血儿", titleEn: "Preferred Stock: The Hybrid Between Bonds and Stocks", module: "./content/lessons/stage6-preferred-stock.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "preferred-terms", title: "读懂优先股条款：累积与非累积、永续、可赎回与清算优先权", titleEn: "Reading Preferred Terms: Cumulative vs Non-Cumulative, Perpetual, Callable & Liquidation Preference", module: "./content/lessons/stage6-preferred-terms.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "convertible-bonds", title: "可转换债券：附带股票期权的债", titleEn: "Convertible Bonds: Debt with an Equity Option Attached", module: "./content/lessons/stage6-convertible-bonds.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "leverage-coverage", title: "杠杆与覆盖率：借多少才算太多", titleEn: "Leverage & Coverage Ratios: How Much Borrowing Is Too Much", module: "./content/lessons/stage6-leverage-coverage.js", status: "ready", difficulty: 2, personas: ["investor", "analyst", "builder"] },
        { id: "bankruptcy-recovery", title: "破产、优先顺序与回收率：当一切出错时", titleEn: "Bankruptcy, Seniority & Recovery Rates: When Everything Goes Wrong", module: "./content/lessons/stage6-bankruptcy-recovery.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
      ],
    },
    {
      n: 7, tier: "core", title: "衍生品与波动率", titleEn: "Derivatives & Volatility",
      blurb: "期货与远期 · 期权基础 · 波动率本身就是资产 · 互换与对冲、基差交易 · 保证金、杠杆与清算瀑布", blurbEn: "Futures & forwards · Options basics · Volatility as an asset · Swaps, hedging & the basis trade · Margin, leverage & liquidation cascades",
      lessons: [
        { id: "futures-forwards", title: "期货与远期：今天锁定明天的价格", titleEn: "Futures & Forwards: Locking In Tomorrow's Price Today", module: "./content/lessons/stage7-futures-forwards.js", status: "ready", difficulty: 1, personas: ["investor", "analyst", "builder"] },
        { id: "options-basics", title: "期权入门：看涨、看跌与损益图", titleEn: "Options Basics: Calls, Puts & Payoff Diagrams", module: "./content/lessons/stage7-options-basics.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "volatility-asset", title: "波动率是一种资产：隐含波动率与“卖波动率”的生意", titleEn: "Volatility Is an Asset: Implied Volatility & the Business of Selling Vol", module: "./content/lessons/stage7-volatility-asset.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "swaps-hedging", title: "互换、对冲与基差交易：大机构怎么管理风险", titleEn: "Swaps, Hedging & the Basis Trade: How Big Institutions Manage Risk", module: "./content/lessons/stage7-swaps-hedging.js", status: "ready", difficulty: 3, personas: ["analyst"] },
        { id: "margin-liquidation", title: "保证金、杠杆与清算瀑布：为什么暴跌会自我加速", titleEn: "Margin, Leverage & Liquidation Cascades: Why Crashes Feed Themselves", module: "./content/lessons/stage7-margin-liquidation.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
      ],
    },
    {
      n: 8, tier: "core", title: "市场的管道与机构", titleEn: "Market Plumbing & Institutions",
      blurb: "交易所、券商与做市商 · 清算、结算与托管 · 回购与货币市场 · 资管、养老金、保险与影子银行/私募信贷", blurbEn: "Exchanges, brokers & market makers · Clearing, settlement & custody · Repo & money markets · Asset managers, pensions, insurers, shadow banks & private credit",
      lessons: [
        { id: "exchanges-brokers", title: "交易所、券商与做市商：你按下“买入”之后发生了什么", titleEn: "Exchanges, Brokers & Market Makers: What Happens After You Press Buy", module: "./content/lessons/stage8-exchanges-brokers.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "builder"] },
        { id: "clearing-settlement", title: "清算、结算与托管：T+1 背后的管道", titleEn: "Clearing, Settlement & Custody: The Plumbing Behind T+1", module: "./content/lessons/stage8-clearing-settlement.js", status: "ready", difficulty: 2, personas: ["analyst", "builder"] },
        { id: "repo-money-markets", title: "回购与货币市场：金融体系的隔夜引擎", titleEn: "Repo & Money Markets: The Overnight Engine of the System", module: "./content/lessons/stage8-repo-money-markets.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "institutions-private-credit", title: "谁拥有一切：资管、养老金、保险、影子银行与私募信贷", titleEn: "Who Owns Everything: Asset Managers, Pensions, Insurers, Shadow Banks & Private Credit", module: "./content/lessons/stage8-institutions-private-credit.js", status: "ready", difficulty: 2, personas: ["investor", "analyst", "builder"] },
      ],
    },
    {
      n: 9, tier: "systems", title: "货币政策与宏观流动性", titleEn: "Monetary Policy & Macro Liquidity",
      blurb: "美联储工具箱（利率、QE、QT）· 政策怎么传导 · 全球流动性为何驱动风险资产与比特币 · 财政主导与 r vs g · 通胀的几种体制", blurbEn: "The Fed's toolkit (rates, QE, QT) · How policy transmits · Why global liquidity drives risk assets & Bitcoin · Fiscal dominance & r vs g · Inflation regimes",
      lessons: [
        { id: "fed-toolkit", title: "美联储工具箱：利率、QE、QT 与准备金", titleEn: "The Fed's Toolkit: Rates, QE, QT & Reserves", module: "./content/lessons/stage9-fed-toolkit.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "policy-transmission", title: "政策怎么传导：从联邦基金利率到房贷、股市与比特币", titleEn: "How Policy Transmits: From the Fed Funds Rate to Mortgages, Stocks & Bitcoin", module: "./content/lessons/stage9-policy-transmission.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "global-liquidity", title: "全球流动性：为什么“水位”决定风险资产与比特币", titleEn: "Global Liquidity: Why the Tide Lifts Risk Assets & Bitcoin", module: "./content/lessons/stage9-global-liquidity.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "fiscal-dominance", title: "财政主导与债务可持续性：r 与 g 的赛跑", titleEn: "Fiscal Dominance & Debt Sustainability: The Race Between r and g", module: "./content/lessons/stage9-fiscal-dominance.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "inflation-regimes", title: "通胀的几种体制：1970 年代、2021–23 年与下一次", titleEn: "Inflation Regimes: The 1970s, 2021–23 & the Next One", module: "./content/lessons/stage9-inflation-regimes.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
      ],
    },
    {
      n: 10, tier: "systems", title: "危机与周期", titleEn: "Crises & Cycles",
      blurb: "金融危机的解剖 · 2008 · 2020 年 3 月、2022 英国国债、2023 硅谷银行 · 泡沫与反身性 · 加密危机", blurbEn: "Anatomy of a crisis · 2008 · March 2020, UK gilts 2022, SVB 2023 · Bubbles & reflexivity · Crypto crises",
      lessons: [
        { id: "anatomy-of-crisis", title: "金融危机的解剖：杠杆、期限错配与挤兑", titleEn: "Anatomy of a Financial Crisis: Leverage, Maturity Mismatch & Runs", module: "./content/lessons/stage10-anatomy-of-crisis.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "case-2008", title: "2008：次贷、雷曼与管道冻结", titleEn: "2008: Subprime, Lehman & the Plumbing Freeze", module: "./content/lessons/stage10-case-2008.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "rate-shock-cases", title: "利率冲击三连：2020 年 3 月、2022 英国养老金危机与 2023 硅谷银行", titleEn: "Rate-Shock Trilogy: March 2020, the 2022 UK Gilt Crisis & SVB 2023", module: "./content/lessons/stage10-rate-shock-cases.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "bubbles-reflexivity", title: "泡沫与反身性：索罗斯、明斯基与叙事驱动的市场", titleEn: "Bubbles & Reflexivity: Soros, Minsky & Narrative-Driven Markets", module: "./content/lessons/stage10-bubbles-reflexivity.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "crypto-crises", title: "加密危机：Mt. Gox、Terra/Luna、FTX 与 2022 年的连环爆雷", titleEn: "Crypto Crises: Mt. Gox, Terra/Luna, FTX & the 2022 Contagion", module: "./content/lessons/stage10-crypto-crises.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
      ],
    },
    {
      n: 11, tier: "systems", title: "组合与风险管理", titleEn: "Portfolios & Risk Management",
      blurb: "分散与相关性 · 组合构建（60/40、风险平价、全天候）· 衡量风险 · 仓位与凯利公式 · 行为陷阱", blurbEn: "Diversification & correlation · Portfolio construction (60/40, risk parity, all-weather) · Measuring risk · Position sizing & Kelly · Behavioral traps",
      lessons: [
        { id: "diversification", title: "分散与相关性：唯一的免费午餐", titleEn: "Diversification & Correlation: The Only Free Lunch", module: "./content/lessons/stage11-diversification.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst"] },
        { id: "portfolio-construction", title: "组合构建：60/40、风险平价与全天候", titleEn: "Portfolio Construction: 60/40, Risk Parity & All-Weather", module: "./content/lessons/stage11-portfolio-construction.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "risk-metrics", title: "衡量风险：波动率、最大回撤、夏普比率与 VaR", titleEn: "Measuring Risk: Volatility, Drawdown, Sharpe & VaR", module: "./content/lessons/stage11-risk-metrics.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "position-sizing", title: "仓位与凯利公式：先活下来，再谈赚钱", titleEn: "Position Sizing & the Kelly Criterion: Survive First, Then Compound", module: "./content/lessons/stage11-position-sizing.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "behavioral-traps", title: "行为陷阱：FOMO、损失厌恶与杠杆后悔", titleEn: "Behavioral Traps: FOMO, Loss Aversion & Leverage Regret", module: "./content/lessons/stage11-behavioral-traps.js", status: "ready", difficulty: 1, personas: ["beginner", "investor"] },
      ],
    },
    {
      n: 12, tier: "newfin", title: "比特币：作为金融资产", titleEn: "Bitcoin as a Financial Asset",
      blurb: "比特币怎么运作 · 2100 万与减半 · 人们怎么给比特币估值 · 波动、周期与相关性 · 现货 ETF 与机构时代 · 比特币的风险", blurbEn: "How Bitcoin works · 21 million & the halvings · How people value Bitcoin · Volatility, cycles & correlation · Spot ETFs & the institutional era · Bitcoin's risks",
      lessons: [
        { id: "bitcoin-how", title: "比特币怎么运作：用大白话讲清区块链、挖矿与密钥", titleEn: "How Bitcoin Works: Blockchain, Mining & Keys in Plain Language", module: "./content/lessons/stage12-bitcoin-how.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "bitcoin-supply", title: "2100 万与减半：一种写进代码的货币政策", titleEn: "21 Million & the Halvings: Monetary Policy Written in Code", module: "./content/lessons/stage12-bitcoin-supply.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "bitcoin-valuation", title: "比特币怎么估值：数字黄金、网络价值与采用曲线", titleEn: "How to Value Bitcoin: Digital Gold, Network Value & Adoption Curves", module: "./content/lessons/stage12-bitcoin-valuation.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "bitcoin-volatility", title: "比特币的波动、周期与相关性：它到底是什么资产", titleEn: "Bitcoin's Volatility, Cycles & Correlations: What Kind of Asset Is It?", module: "./content/lessons/stage12-bitcoin-volatility.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "bitcoin-etfs", title: "现货 ETF、托管与机构时代：华尔街拥抱比特币", titleEn: "Spot ETFs, Custody & the Institutional Era: Wall Street Embraces Bitcoin", module: "./content/lessons/stage12-bitcoin-etfs.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst"] },
        { id: "bitcoin-risks", title: "比特币的风险：量子、监管、安全预算与集中度", titleEn: "Bitcoin's Risks: Quantum, Regulation, the Security Budget & Concentration", module: "./content/lessons/stage12-bitcoin-risks.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
      ],
    },
    {
      n: 13, tier: "newfin", title: "DeFi：写成代码的金融", titleEn: "DeFi: Finance Written in Code",
      blurb: "DeFi 是什么 · 稳定币 · DEX 与 AMM · 链上借贷与清算 · 收益从哪来 · DeFi 的风险", blurbEn: "What DeFi is · Stablecoins · DEXs & AMMs · On-chain lending & liquidations · Where yield comes from · DeFi's risks",
      lessons: [
        { id: "defi-what", title: "DeFi 是什么：把银行、交易所拆成开源代码", titleEn: "What DeFi Is: Banks and Exchanges Rebuilt as Open-Source Code", module: "./content/lessons/stage13-defi-what.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "stablecoins", title: "稳定币：区块链上的美元与《GENIUS 法案》", titleEn: "Stablecoins: Dollars on the Blockchain & the GENIUS Act", module: "./content/lessons/stage13-stablecoins.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "amm-dex", title: "DEX 与 AMM：x·y=k 怎么替代做市商", titleEn: "DEXs & AMMs: How x·y=k Replaces the Market Maker", module: "./content/lessons/stage13-amm-dex.js", status: "ready", difficulty: 2, personas: ["investor", "analyst", "builder"] },
        { id: "defi-lending", title: "链上借贷：超额抵押、健康因子与自动清算", titleEn: "On-Chain Lending: Over-Collateralization, Health Factors & Automatic Liquidation", module: "./content/lessons/stage13-defi-lending.js", status: "ready", difficulty: 2, personas: ["investor", "analyst", "builder"] },
        { id: "defi-yield", title: "DeFi 收益从哪来：真实收益与代币补贴", titleEn: "Where DeFi Yield Comes From: Real Yield vs Token Emissions", module: "./content/lessons/stage13-defi-yield.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "defi-risks", title: "DeFi 的风险：合约漏洞、预言机、治理与脱锚", titleEn: "DeFi's Risks: Contract Bugs, Oracles, Governance & Depegs", module: "./content/lessons/stage13-defi-risks.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
      ],
    },
    {
      n: 14, tier: "newfin", title: "代币化：把传统资产搬上链（高层视角）", titleEn: "Tokenization: TradFi Moves On-Chain (High Level)",
      blurb: "为什么要代币化 · 代币化国债与货币基金 · 代币化股票与 24/7 市场 · 法律外壳与局限 · 传统金融与链上金融的汇合", blurbEn: "Why tokenize · Tokenized Treasuries & money funds · Tokenized stocks & 24/7 markets · Legal wrappers & limits · The convergence of TradFi and on-chain finance",
      lessons: [
        { id: "tokenization-why", title: "代币化：什么被搬上链、为什么", titleEn: "Tokenization: What Moves On-Chain and Why", module: "./content/lessons/stage14-tokenization-why.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "tokenized-treasuries", title: "代币化国债与货币基金：第一个杀手级应用", titleEn: "Tokenized Treasuries & Money Funds: The First Killer App", module: "./content/lessons/stage14-tokenized-treasuries.js", status: "ready", difficulty: 2, personas: ["investor", "analyst", "builder"] },
        { id: "tokenized-stocks", title: "代币化股票与 24/7 市场：股市会变成链上市场吗", titleEn: "Tokenized Stocks & 24/7 Markets: Will the Stock Market Move On-Chain?", module: "./content/lessons/stage14-tokenized-stocks.js", status: "ready", difficulty: 2, personas: ["investor", "analyst", "builder"] },
        { id: "tokenization-limits", title: "法律外壳、合规与代币化的边界", titleEn: "Legal Wrappers, Compliance & the Limits of Tokenization", module: "./content/lessons/stage14-tokenization-limits.js", status: "ready", difficulty: 2, personas: ["analyst", "builder"] },
        { id: "convergence", title: "大汇合：银行、稳定币、存款代币与新的金融管道", titleEn: "The Great Convergence: Banks, Stablecoins, Deposit Tokens & the New Plumbing", module: "./content/lessons/stage14-convergence.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
      ],
    },
    {
      n: 15, tier: "dat", title: "数字资产财库公司是什么", titleEn: "What a Digital Asset Treasury Company Is",
      blurb: "资产负债表就是产品 · Strategy 的故事 · DAT 为什么存在 · DAT 全景 · DAT vs ETF vs 直接持币 · 公允价值会计与税", blurbEn: "The balance sheet is the product · Strategy's story · Why DATs exist · The DAT landscape · DAT vs ETF vs self-custody · Fair-value accounting & tax",
      lessons: [
        { id: "dat-what", title: "比特币财库公司是什么：资产负债表本身就是产品", titleEn: "What a Bitcoin Treasury Company Is: The Balance Sheet Is the Product", module: "./content/lessons/stage15-dat-what.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "strategy-story", title: "Strategy 的故事：从 MicroStrategy 到最大的企业比特币持有者", titleEn: "Strategy's Story: From MicroStrategy to the Largest Corporate Bitcoin Holder", module: "./content/lessons/stage15-strategy-story.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "why-dats-exist", title: "DAT 为什么存在：资本市场套利、准入、监管与“卖波动率”", titleEn: "Why DATs Exist: Capital-Markets Arbitrage, Access, Regulation & Selling Volatility", module: "./content/lessons/stage15-why-dats-exist.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "dat-landscape", title: "DAT 全景：Strategy、Strive、Metaplanet、Twenty One 与山寨币财库", titleEn: "The DAT Landscape: Strategy, Strive, Metaplanet, Twenty One & the Altcoin Treasuries", module: "./content/lessons/stage15-dat-landscape.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "dat-vs-etf", title: "DAT vs 现货 ETF vs 直接持币：三种拥有比特币的方式", titleEn: "DAT vs Spot ETF vs Holding Bitcoin Directly: Three Ways to Own BTC", module: "./content/lessons/stage15-dat-vs-etf.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst"] },
        { id: "dat-accounting", title: "公允价值会计、盈利波动与税：读懂 DAT 的财报", titleEn: "Fair-Value Accounting, Earnings Swings & Tax: Reading a DAT's Financials", module: "./content/lessons/stage15-dat-accounting.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
      ],
    },
    {
      n: 16, tier: "dat", title: "DAT 指标工具箱", titleEn: "The DAT Metrics Toolkit",
      blurb: "每股比特币 · mNAV 溢价与折价 · BTC Yield / Gain / $ Gain · 放大倍数 · BTC 评级与资产覆盖 · 股息义务与美元储备 · 飞轮数学", blurbEn: "BTC per share · mNAV premium & discount · BTC Yield / Gain / $ Gain · Amplification · BTC rating & asset coverage · Dividend obligations & the USD reserve · The flywheel math",
      lessons: [
        { id: "btc-per-share", title: "每股比特币：唯一真正复利增长的数字", titleEn: "BTC per Share: The Only Number That Compounds", module: "./content/lessons/stage16-btc-per-share.js", status: "ready", difficulty: 1, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "mnav", title: "mNAV：市值与比特币净值之比——溢价、折价与它的几种算法", titleEn: "mNAV: Market Value vs Bitcoin NAV — Premiums, Discounts & Its Several Definitions", module: "./content/lessons/stage16-mnav.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "btc-yield-gain", title: "BTC Yield、BTC Gain 与 BTC $ Gain：拆解 Strategy 的核心 KPI", titleEn: "BTC Yield, BTC Gain & BTC $ Gain: Decoding Strategy's Core KPIs", module: "./content/lessons/stage16-btc-yield-gain.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "amplification", title: "放大倍数：债务与优先股如何给每股比特币加杠杆", titleEn: "Amplification: How Debt & Preferreds Lever Up BTC per Share", module: "./content/lessons/stage16-amplification.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "btc-rating", title: "BTC 评级与资产覆盖：比特币能覆盖每一层几倍", titleEn: "BTC Rating & Asset Coverage: How Many Times Bitcoin Covers Each Layer", module: "./content/lessons/stage16-btc-rating.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "dividend-coverage", title: "股息义务、美元储备与覆盖月数：现金从哪来", titleEn: "Dividend Obligations, the USD Reserve & Months of Coverage: Where the Cash Comes From", module: "./content/lessons/stage16-dividend-coverage.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "flywheel-math", title: "飞轮数学：什么时候发股是增值的、什么时候在毁灭价值", titleEn: "The Flywheel Math: When Issuing Stock Is Accretive — and When It Destroys Value", module: "./content/lessons/stage16-flywheel-math.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
      ],
    },
    {
      n: 17, tier: "dat", title: "DAT 资本市场工具箱：产品逐个拆", titleEn: "The DAT Capital-Markets Toolkit: Instrument by Instrument",
      blurb: "ATM 增发 · 可转债：把波动率卖给对冲基金 · Strategy 优先股家族 · STRC 与浮动利率永续 · Strive 与 SATA · 清偿顺序实战 · 税与资本返还", blurbEn: "At-the-market offerings · Convertibles: selling volatility to hedge funds · Strategy's preferred family · STRC & variable-rate perpetuals · Strive & SATA · Seniority in practice · Tax & return of capital",
      lessons: [
        { id: "atm-offerings", title: "ATM 增发：把股票一点点卖进市场", titleEn: "At-the-Market Offerings: Selling Stock Into the Market a Little at a Time", module: "./content/lessons/stage17-atm-offerings.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "dat-convertibles", title: "DAT 的可转债：把比特币波动率卖给对冲基金", titleEn: "DAT Convertibles: Selling Bitcoin Volatility to Hedge Funds", module: "./content/lessons/stage17-dat-convertibles.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "strategy-preferreds", title: "Strategy 的优先股家族：STRF、STRC、STRE、STRK、STRD 逐个拆", titleEn: "Strategy's Preferred Family: STRF, STRC, STRE, STRK & STRD Taken Apart", module: "./content/lessons/stage17-strategy-preferreds.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "strc-variable-rate", title: "STRC 与浮动利率永续优先股：打造一种短久期的比特币信用", titleEn: "STRC & Variable-Rate Perpetual Preferreds: Engineering Short-Duration Bitcoin Credit", module: "./content/lessons/stage17-strc-variable-rate.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "strive-sata", title: "Strive 与 SATA：只用优先股、不借债的“放大比特币”模式", titleEn: "Strive & SATA: The Preferred-Only, No-Debt Model of Amplified Bitcoin", module: "./content/lessons/stage17-strive-sata.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "seniority-in-practice", title: "清偿顺序实战：比特币跌 70% 时，谁先承受损失", titleEn: "Seniority in Practice: Who Absorbs the Loss When Bitcoin Falls 70%", module: "./content/lessons/stage17-seniority-in-practice.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "preferred-tax-roc", title: "税与资本返还（ROC）：为什么优先股股息可能不算“收入”", titleEn: "Tax & Return of Capital: Why a Preferred Dividend May Not Count as Income", module: "./content/lessons/stage17-preferred-tax-roc.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
      ],
    },
    {
      n: 18, tier: "dat", title: "DAT 风险评估与分析框架", titleEn: "Assessing DAT Risk: The Analyst's Framework",
      blurb: "给比特币支撑的优先股估值 · 压力测试 · mNAV 压缩时会发生什么 · 指数纳入与结构性风险 · DAT 横向比较 · 分析师清单", blurbEn: "Valuing a BTC-backed preferred · Stress tests · What happens when mNAV compresses · Index inclusion & structural risk · Comparing DATs · The analyst's checklist",
      lessons: [
        { id: "valuing-btc-preferreds", title: "给比特币支撑的优先股估值：收益率、利差、久期、赎回与信用", titleEn: "Valuing a Bitcoin-Backed Preferred: Yield, Spread, Duration, Calls & Credit", module: "./content/lessons/stage18-valuing-btc-preferreds.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "dat-stress-test", title: "压力测试：比特币跌 50%/80%、mNAV 跌破 1、市场冻结", titleEn: "Stress-Testing a DAT: Bitcoin −50% / −80%, mNAV Below 1, Frozen Markets", module: "./content/lessons/stage18-dat-stress-test.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "mnav-compression", title: "mNAV 压缩之后：回购、卖币与“死亡螺旋”的真相与迷思", titleEn: "When mNAV Compresses: Buybacks, Selling Bitcoin & the Truth About Death Spirals", module: "./content/lessons/stage18-mnav-compression.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "index-structural-risk", title: "指数纳入、被动资金与结构性风险：MSCI、标普与公司治理", titleEn: "Index Inclusion, Passive Flows & Structural Risk: MSCI, S&P & Governance", module: "./content/lessons/stage18-index-structural-risk.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "dat-comparison", title: "DAT 横向比较：Strategy、Strive、Metaplanet 与 ETH/SOL 财库", titleEn: "Comparing DATs: Strategy, Strive, Metaplanet & the ETH/SOL Treasuries", module: "./content/lessons/stage18-dat-comparison.js", status: "ready", difficulty: 2, personas: ["investor", "analyst"] },
        { id: "dat-checklist", title: "DAT 分析师清单：十个问题读懂任何一家财库公司", titleEn: "The DAT Analyst's Checklist: Ten Questions to Read Any Treasury Company", module: "./content/lessons/stage18-dat-checklist.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
      ],
    },
    {
      n: 19, tier: "mastery", title: "AI 时代的金融", titleEn: "Finance in the AI Era",
      blurb: "AI、生产率与利率 · AI 资本开支狂潮与它的融资 · 市场里的 AI · 会付款的 AI 代理 · AI 通缩与稀缺资产", blurbEn: "AI, productivity & interest rates · The AI capex boom & how it is financed · AI inside markets · AI agents that pay · AI deflation & scarce assets",
      lessons: [
        { id: "ai-productivity-rates", title: "AI、生产率与利率：AI 繁荣下的中性利率", titleEn: "AI, Productivity & Interest Rates: r* in an AI Boom", module: "./content/lessons/stage19-ai-productivity-rates.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "ai-capex-financing", title: "AI 资本开支狂潮与融资：超大厂债券、私募信贷与数据中心", titleEn: "The AI Capex Boom & Its Financing: Hyperscaler Bonds, Private Credit & Data Centers", module: "./content/lessons/stage19-ai-capex-financing.js", status: "ready", difficulty: 2, personas: ["investor", "analyst", "builder"] },
        { id: "ai-in-markets", title: "市场里的 AI：算法交易、投研与“优势”的消失与再生", titleEn: "AI Inside Markets: Algorithmic Trading, Research & Where the Edge Goes", module: "./content/lessons/stage19-ai-in-markets.js", status: "ready", difficulty: 2, personas: ["investor", "analyst", "builder"] },
        { id: "agentic-payments", title: "会付款的 AI 代理：稳定币、x402 与机器对机器金融", titleEn: "AI Agents That Pay: Stablecoins, x402 & Machine-to-Machine Finance", module: "./content/lessons/stage19-agentic-payments.js", status: "ready", difficulty: 2, personas: ["builder", "investor", "analyst"] },
        { id: "ai-deflation-scarcity", title: "AI 通缩、劳动与稀缺资产：当智能变便宜，什么变贵", titleEn: "AI Deflation, Labor & Scarce Assets: When Intelligence Gets Cheap, What Gets Expensive", module: "./content/lessons/stage19-ai-deflation-scarcity.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
      ],
    },
    {
      n: 20, tier: "mastery", title: "全景图：把一切连起来", titleEn: "The Whole Picture: Connecting Everything",
      blurb: "从 30 年期收益率到比特币再到 MSTR 优先股 · 宏观体制与资产表现 · 像专业人士一样读财经新闻 · 公式、指标与术语速查", blurbEn: "From the 30-year yield to Bitcoin to MSTR preferreds · Macro regimes & asset behavior · Reading financial news like a pro · Formulas, metrics & terms cheat sheet",
      lessons: [
        { id: "connect-the-dots", title: "连点成线：从 30 年期收益率到比特币，再到 MSTR 与它的优先股", titleEn: "Connecting the Dots: From the 30-Year Yield to Bitcoin to MSTR and Its Preferreds", module: "./content/lessons/stage20-connect-the-dots.js", status: "ready", difficulty: 3, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "macro-regimes", title: "宏观体制地图：每种资产在什么环境里闪光", titleEn: "The Macro Regime Map: Where Each Asset Shines", module: "./content/lessons/stage20-macro-regimes.js", status: "ready", difficulty: 3, personas: ["investor", "analyst"] },
        { id: "read-news-like-pro", title: "像专业人士一样读财经新闻：五问法", titleEn: "Reading Financial News Like a Pro: The Five-Question Method", module: "./content/lessons/stage20-read-news-like-pro.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "cheat-sheet", title: "附录：公式、指标与术语速查表", titleEn: "Appendix: Formulas, Metrics & Terms Cheat Sheet", module: "./content/lessons/stage20-cheat-sheet.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
      ],
    },
    {
      n: "∞", tier: "infinity", title: "之后去哪：你的新金融之路", titleEn: "Where It Goes: Your Path in the New Finance",
      blurb: "未解的问题 · 你的机会 · 毕业设计：从宏观到一家 DAT 的资本结构，写一份完整分析", blurbEn: "Open questions · Your opportunities · Capstone: a full analysis from macro down to one DAT's capital stack",
      lessons: [
        { id: "open-questions", title: "未解的问题：比特币会成为数字信用的储备资产吗", titleEn: "Open Questions: Will Bitcoin Become the Reserve Asset of Digital Credit?", module: "./content/lessons/stageInf-open-questions.js", status: "ready", difficulty: 3, personas: ["investor", "analyst", "builder"] },
        { id: "your-path", title: "你的机会：在新金融里工作、创业与投资", titleEn: "Your Opportunities: Working, Building & Investing in the New Finance", module: "./content/lessons/stageInf-your-path.js", status: "ready", difficulty: 2, personas: ["beginner", "investor", "analyst", "builder"] },
        { id: "capstone", title: "毕业设计：从宏观到资本结构，亲手写一份完整分析", titleEn: "Capstone: Write a Full Analysis — From Macro Down to a Capital Stack", module: "./content/lessons/stageInf-capstone.js", status: "ready", difficulty: 3, personas: ["beginner", "investor", "analyst", "builder"] },
      ],
    },
  ],
};
