// 交互演示：可搜索的公式速查表 + 现场小计算器。每张卡片的公式与 _fin.js 一致，输入默认值 = 全课标准例子（橙子公司等）。
// 卡片公式 f 是已渲染的 KaTeX 行数组（每项一行，显示模式）；搜索时去掉标签，只看公式里的文字。
import {
  fv, pv, rule72, realRate, perpetuity, gordon,
  bondPrice, bondYield, bondRisk, priceChangeApprox,
  waterfall, coverageByLayer, port2Vol, sharpe, kelly, bsCall, bsPut, ammSwap,
  btcNav, mnavBasic, mnavDiluted, mnavEV, mnavNetBps, netReserve, btcPerShare, btcYield, btcGain, btcDollarGain, issueAndBuy,
  amplification, amplificationStrategy, striveAmpRatio, btcRating, btcFloorPrice, btcRiskProb, btcCredit, breakevenArr, monthsCovered,
  fmtPct, fmtNum, fmtUsd, tex,
} from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const P = (x) => x / 100; // 输入框里用百分数，引擎用小数
  const W = (zh, e) => String.raw`\text{${T(zh, e)}}`; // 公式里的文字
  const M = (src) => tex(src); // 标签里的行内公式

  const CATS = [["all", T("全部", "All")], ["time", T("时间价值", "Time value")], ["bond", T("债券与信用", "Bonds & credit")], ["risk", T("风险与组合", "Risk & portfolios")], ["dat", T("DAT 指标", "DAT metrics")]];

  // 卡片：cat, t 标题, f 公式（LaTeX 行数组）, fn 引擎函数, tags 搜索词, src 出处, ins [[key, label, default, step]], out(v) → [[label, value]]
  const CARDS = [
    { cat: "time", t: T("终值（复利）", "Future value (compounding)"), f: [tex(String.raw`\mathrm{FV} = \mathrm{PV} \times \left(1 + \frac{r}{m}\right)^{n m}`, true)], fn: "fv(pv, r, n, m)", tags: "fv compound 复利 终值", src: T("阶段 2.2", "Stage 2.2"),
      ins: [["pv", "PV", 1000, 1], ["r", T("利率 %", "Rate %"), 5, 0.1], ["n", T("年", "Years"), 10, 1], ["m", T("每年复利次数", "Compounds per year"), 1, 1]],
      out: (v) => [["FV", fmtUsd(fv(v.pv, P(v.r), v.n, v.m), 2)]] },
    { cat: "time", t: T("现值", "Present value"), f: [tex(String.raw`\mathrm{PV} = \frac{\mathrm{FV}}{\left(1 + \frac{r}{m}\right)^{n m}}`, true)], fn: "pv(fv, r, n, m)", tags: "pv present discount 现值 折现", src: T("阶段 2.3", "Stage 2.3"),
      ins: [["fvv", "FV", 1000, 1], ["r", T("利率 %", "Rate %"), 5, 0.1], ["n", T("年", "Years"), 10, 1], ["m", T("每年复利次数", "Compounds per year"), 1, 1]],
      out: (v) => [["PV", fmtUsd(pv(v.fvv, P(v.r), v.n, v.m), 2)]] },
    { cat: "time", t: T("72 法则", "Rule of 72"), f: [tex(String.raw`${W("翻倍年数", "Years to double")} \approx \frac{72}{r \times 100}`, true)], fn: "rule72(r)", tags: "rule 72 double 翻倍", src: T("阶段 2.2", "Stage 2.2"),
      ins: [["r", T("利率 %", "Rate %"), 5, 0.1]],
      out: (v) => [[T("翻倍年数", "Years to double"), fmtNum(rule72(P(v.r)), 1)], [T("精确值", "Exact"), fmtNum(Math.log(2) / Math.log(1 + P(v.r)), 1)]] },
    { cat: "time", t: T("费雪方程：实际利率", "Fisher equation: real rate"), f: [tex(String.raw`${W("实际", "Real")} = \frac{1 + ${W("名义", "nominal")}}{1 + ${W("通胀", "inflation")}} - 1`, true)], fn: "realRate(nominal, infl)", tags: "fisher real inflation 实际利率 通胀 tips", src: T("阶段 2.5", "Stage 2.5"),
      ins: [["nom", T("名义 %", "Nominal %"), 5.17, 0.01], ["inf", T("通胀 %", "Inflation %"), 3.4, 0.1]],
      out: (v) => [[T("实际利率", "Real rate"), fmtPct(realRate(P(v.nom), P(v.inf)), 2)]] },
    { cat: "time", t: T("永续年金", "Perpetuity"), f: [tex(String.raw`P = \frac{\mathrm{CF}}{r}`, true)], fn: "perpetuity(cf, r)", tags: "perpetuity perpetual 永续 优先股 preferred", src: T("阶段 2.3、阶段 18.1", "Stages 2.3, 18.1"),
      ins: [["cf", T("每年现金流", "Annual cash flow"), 10, 0.1], ["r", T("要求收益率 %", "Required yield %"), 10, 0.05]],
      out: (v) => [[T("价格", "Price"), fmtNum(perpetuity(v.cf, P(v.r)), 2)], [`${T("修正久期", "Modified duration")} ${M(String.raw`\approx 1/y`)}`, fmtNum(1 / P(v.r), 1)]] },
    { cat: "time", t: T("增长永续（戈登）", "Growing perpetuity (Gordon)"), f: [tex(String.raw`P = \frac{\mathrm{CF}_{1}}{r - g}, \quad r > g`, true)], fn: "gordon(cf1, r, g)", tags: "gordon growth dividend discount 戈登 增长", src: T("阶段 2.3、阶段 5.3", "Stages 2.3, 5.3"),
      ins: [["cf", M(String.raw`\mathrm{CF}_{1}`), 5, 0.1], ["r", "r %", 8, 0.1], ["g", "g %", 3, 0.1]],
      out: (v) => [[T("价格", "Price"), isFinite(gordon(v.cf, P(v.r), P(v.g))) ? fmtNum(gordon(v.cf, P(v.r), P(v.g)), 2) : M(String.raw`r \le g`) + T("：无意义", ": undefined")]] },

    { cat: "bond", t: T("债券价格、久期、凸性、DV01", "Bond price, duration, convexity, DV01"),
      f: [
        tex(String.raw`P = \sum_{k=1}^{n} \frac{c}{\left(1 + \frac{y}{f}\right)^{k}} + \frac{${W("面值", "face")}}{\left(1 + \frac{y}{f}\right)^{n}}`, true),
        tex(String.raw`${W("修正久期", "Modified")} = \frac{${W("麦考利久期", "Macaulay")}}{1 + \frac{y}{f}}`, true),
        tex(String.raw`\mathrm{DV01} = ${W("修正久期", "modified")} \times P \times 0.0001`, true),
      ],
      fn: "bondPrice / bondRisk(face, couponRate, ytm, years, freq=2)", tags: "bond price duration convexity dv01 macaulay 债券 久期 凸性", src: T("阶段 4.2、阶段 4.4", "Stages 4.2, 4.4"),
      ins: [["face", T("面值", "Face"), 1000, 1], ["c", T("票息 %", "Coupon %"), 5, 0.1], ["y", T("收益率 %", "Yield %"), 6, 0.01], ["n", T("年", "Years"), 10, 1]],
      out: (v) => { const r = bondRisk(v.face, P(v.c), P(v.y), v.n); return [[T("价格", "Price"), fmtNum(r.price, 2)], [T("麦考利久期", "Macaulay"), fmtNum(r.macaulay, 2)], [T("修正久期", "Modified"), fmtNum(r.modified, 2)], [T("凸性", "Convexity"), fmtNum(r.convexity, 1)], ["DV01", fmtNum(r.dv01, 3)]]; } },
    { cat: "bond", t: T("到期收益率（由价格反解）", "Yield to maturity (solved from price)"),
      f: [tex(T(String.raw`\text{找 } y \text{ 使 } \texttt{bondPrice}(y) = \text{市价}`, String.raw`\text{find } y \text{ such that } \texttt{bondPrice}(y) = \text{market price}`), true)],
      fn: "bondYield(price, face, couponRate, years, freq)", tags: "ytm yield to maturity 到期收益率", src: T("阶段 4.2", "Stage 4.2"),
      ins: [["px", T("市价", "Price"), 950, 1], ["face", T("面值", "Face"), 1000, 1], ["c", T("票息 %", "Coupon %"), 5, 0.1], ["n", T("年", "Years"), 10, 1]],
      out: (v) => [["YTM", fmtPct(bondYield(v.px, v.face, P(v.c), v.n), 3)], [T("当期收益率", "Current yield"), fmtPct(v.face * P(v.c) / v.px, 2)]] },
    { cat: "bond", t: T("久期 + 凸性近似", "Duration + convexity approximation"), f: [tex(String.raw`\frac{\Delta P}{P} \approx -D\,\Delta y + \frac{1}{2}\,C\,(\Delta y)^{2}`, true)], fn: "priceChangeApprox(mod, convexity, dy)", tags: "approx shock rate 30 year 利率冲击 近似", src: T("阶段 4.4、阶段 4.5", "Stages 4.4, 4.5"),
      ins: [["d", T("修正久期", "Modified duration"), 15.45, 0.01], ["cv", T("凸性", "Convexity"), 352, 1], ["bp", T("收益率变化（基点）", "Yield change (bp)"), 100, 5]],
      out: (v) => [[T("价格变化", "Price change"), fmtPct(priceChangeApprox(v.d, v.cv, v.bp / 10000), 2)], [T("只用久期", "Duration only"), fmtPct(-v.d * v.bp / 10000, 2)]] },
    { cat: "bond", t: T("预期损失与信用利差", "Expected loss and credit spread"), f: [tex(String.raw`\mathrm{EL} = \mathrm{PD} \times \mathrm{LGD}`, true)], fn: T("（课文公式，引擎无单独函数）", "(lesson formula; no separate engine function)"), tags: "credit spread default pd lgd el 信用 违约 利差", src: T("阶段 4.6", "Stage 4.6"),
      ins: [["pd", T("违约概率 %/年", "Default probability %/yr"), 2, 0.1], ["lgd", T("违约损失率 %", "Loss given default %"), 60, 1], ["tsy", T("国债收益率 %", "Treasury yield %"), 5.49, 0.01]],
      out: (v) => [["EL", fmtPct(P(v.pd) * P(v.lgd), 2)], [T("仅补偿预期损失的收益率", "Yield covering expected loss only"), fmtPct(P(v.tsy) + P(v.pd) * P(v.lgd), 2)]] },

    { cat: "risk", t: T("清偿瀑布与分层覆盖", "Waterfall and coverage by layer"),
      f: [
        tex(String.raw`${W("逐层实得", "Layer payout")} = \min(${W("剩余", "remaining")}, ${W("债权", "claim")})`, true),
        tex(String.raw`${W("覆盖", "Coverage")} = \frac{${W("资产", "assets")}}{${W("累计债权", "cumulative claims")}}`, true),
      ],
      fn: "waterfall / coverageByLayer(assetValue, layers)", tags: "waterfall seniority coverage capital stack 瀑布 清偿 覆盖 资本结构", src: T("阶段 6.1、阶段 17.6", "Stages 6.1, 17.6"),
      ins: [["a", T("资产（百万）", "Assets ($M)"), 300, 10], ["l1", T("可转债", "Convertible"), 150, 5], ["l2", "Orange-F", 100, 5], ["l3", "Orange-D", 50, 5]],
      out: (v) => { const L = [{ name: T("可转债", "Conv"), claim: v.l1 }, { name: "F", claim: v.l2 }, { name: "D", claim: v.l3 }]; const w = waterfall(v.a, L), c = coverageByLayer(v.a, L); return w.rows.map((r, i) => [r.name, fmtPct(r.recovery, 0) + " · " + fmtNum(c[i].coverage, 2) + "x"]).concat([[T("普通股", "Common"), fmtNum(w.equity, 0)]]); } },
    { cat: "risk", t: T("两资产组合波动", "Two-asset portfolio volatility"), f: [tex(String.raw`\sigma_{p} = \sqrt{w^{2}\sigma_{1}^{2} + (1-w)^{2}\sigma_{2}^{2} + 2w(1-w)\rho\,\sigma_{1}\sigma_{2}}`, true)], fn: "port2Vol(w, s1, s2, rho)", tags: "portfolio correlation 60/40 diversification sigma rho 组合 相关性 分散", src: T("阶段 11.1", "Stage 11.1"),
      ins: [["w", T("资产 1 权重 %", "Weight of asset 1 %"), 60, 1], ["s1", M(String.raw`\sigma_{1}`) + " %", 16, 0.5], ["s2", M(String.raw`\sigma_{2}`) + " %", 7, 0.5], ["rho", M(String.raw`\rho`), -0.3, 0.05]],
      out: (v) => [[T("组合波动", "Portfolio vol"), fmtPct(port2Vol(P(v.w), P(v.s1), P(v.s2), v.rho), 2)]] },
    { cat: "risk", t: T("夏普比率", "Sharpe ratio"), f: [tex(String.raw`${W("夏普", "Sharpe")} = \frac{R - r_{f}}{\sigma}`, true)], fn: "sharpe(ret, rf, vol)", tags: "sharpe risk adjusted 夏普", src: T("阶段 11.3", "Stage 11.3"),
      ins: [["r", T("回报 %", "Return %"), 8, 0.1], ["rf", T("无风险 %", "Risk-free %"), 4.24, 0.01], ["s", T("波动 %", "Volatility %"), 15, 0.5]],
      out: (v) => [[T("夏普", "Sharpe"), fmtNum(sharpe(P(v.r), P(v.rf), P(v.s)), 2)]] },
    { cat: "risk", t: T("凯利比例", "Kelly fraction"), f: [tex(String.raw`f^{*} = \frac{b\,p - (1 - p)}{b}`, true)], fn: "kelly(p, b)", tags: "kelly sizing position 凯利 仓位", src: T("阶段 11.4", "Stage 11.4"),
      ins: [["p", T("胜率 %", "Win probability %"), 55, 1], ["b", T("赔率 b", "Odds b"), 1, 0.1]],
      out: (v) => [[T("凯利", "Full Kelly"), fmtPct(kelly(P(v.p), v.b), 1)], [T("半凯利", "Half Kelly"), fmtPct(kelly(P(v.p), v.b) / 2, 1)]] },
    { cat: "risk", t: T("布莱克-斯科尔斯", "Black–Scholes"), f: [tex(String.raw`C = S\,N(d_{1}) - K e^{-rT} N(d_{2})`, true)], fn: "bsCall / bsPut(S, K, T, r, sigma)", tags: "option call put volatility black scholes 期权 波动率 可转债", src: T("阶段 7.2、阶段 7.3", "Stages 7.2, 7.3"),
      ins: [["S", "S", 100, 1], ["K", "K", 100, 1], ["Tn", T("年", "Years"), 1, 0.25], ["r", "r %", 4, 0.1], ["sig", M(String.raw`\sigma`) + " %", 50, 1]],
      out: (v) => [[T("看涨", "Call"), fmtNum(bsCall(v.S, v.K, v.Tn, P(v.r), P(v.sig)), 2)], [T("看跌", "Put"), fmtNum(bsPut(v.S, v.K, v.Tn, P(v.r), P(v.sig)), 2)]] },
    { cat: "risk", t: T("恒定乘积 AMM", "Constant-product AMM"),
      f: [tex(String.raw`x \cdot y = k`, true), tex(String.raw`${W("得到", "out")} = y - \frac{k}{x + dx\,(1 - \text{fee})}`, true)],
      fn: "ammSwap(x, y, dx, fee)", tags: "amm dex slippage uniswap 滑点 做市", src: T("阶段 13.3", "Stage 13.3"),
      ins: [["x", "x", 1000, 10], ["y", "y", 1000, 10], ["dx", "dx", 10, 1], ["fee", T("手续费 %", "Fee %"), 0.3, 0.05]],
      out: (v) => { const r = ammSwap(v.x, v.y, v.dx, P(v.fee)); return [[T("得到", "Out"), fmtNum(r.out, 3)], [T("成交价", "Exec price"), fmtNum(r.execPrice, 4)], [T("成交后价格", "Price after"), fmtNum(r.priceAfter, 4)]]; } },

    { cat: "dat", t: T("BTC NAV 与市值口径 mNAV", "BTC NAV and market-cap mNAV"), f: [tex(String.raw`\mathrm{mNAV} = \frac{${W("市值", "market cap")}}{${W("持币", "coins")} \times ${W("币价", "price")}}`, true)], fn: "btcNav / mnavBasic(mktCap, btc, btcPrice)", tags: "mnav nav basic premium 溢价 市值", src: T("阶段 16.2", "Stage 16.2"),
      ins: [["mc", T("市值（百万）", "Market cap ($M)"), 1500, 10], ["btc", T("持币", "BTC held"), 10000, 100], ["px", T("币价", "BTC price"), 100000, 1000]],
      out: (v) => [["BTC NAV", fmtUsd(btcNav(v.btc, v.px) / 1e6, 0) + "M"], ["mNAV", fmtNum(mnavBasic(v.mc * 1e6, v.btc, v.px), 2) + "x"]] },
    { cat: "dat", t: T("稀释市值口径 mNAV", "Diluted market-cap mNAV"), f: [tex(String.raw`\mathrm{mNAV} = \frac{${W("股价", "price")} \times ${W("稀释股数", "diluted shares")}}{\text{BTC NAV}}`, true)], fn: "mnavDiluted(price, dilutedShares, btcReserve)", tags: "mnav diluted 稀释", src: T("阶段 16.2", "Stage 16.2"),
      ins: [["p", T("股价", "Share price"), 15, 0.1], ["sh", T("稀释股数（百万）", "Diluted shares (M)"), 106, 1], ["res", T("BTC NAV（百万）", "BTC NAV ($M)"), 1000, 10]],
      out: (v) => [["mNAV", fmtNum(mnavDiluted(v.p, v.sh, v.res), 2) + "x"]] },
    { cat: "dat", t: T("企业价值口径 mNAV（Strategy 2025）", "Enterprise-value mNAV (Strategy 2025)"), f: [tex(String.raw`\mathrm{mNAV} = \frac{${W("市值", "market cap")} + ${W("债务", "debt")} + ${W("优先股", "preferred")} - ${W("现金", "cash")}}{\text{BTC NAV}}`, true)], fn: "mnavEV(mktCap, debt, pref, cash, btc, btcPrice)", tags: "mnav ev enterprise value 企业价值 strategy 2025", src: T("阶段 16.2", "Stage 16.2"),
      ins: [["mc", T("市值（百万）", "Market cap ($M)"), 1500, 10], ["d", T("债务", "Debt"), 150, 5], ["pf", T("优先股", "Preferred"), 150, 5], ["c", T("现金", "Cash"), 30, 5], ["nav", "BTC NAV", 1000, 10]],
      out: (v) => [["mNAV (EV)", fmtNum(mnavEV(v.mc, v.d, v.pf, v.c, v.nav, 1), 2) + "x"]] },
    { cat: "dat", t: T("mNAV：股价除以每股净比特币（Strategy 2026）", "mNAV: price over net BTC per share (Strategy 2026)"),
      f: [
        tex(String.raw`${W("净储备", "Net Reserve")} = \text{BTC Reserve} - ${W("价外债务", "OTM debt")} - ${W("优先股", "preferred")} + ${W("美元资产", "USD assets")}`, true),
        tex(String.raw`\mathrm{mNAV} = \frac{${W("股价", "price")}}{${W("净储备", "Net Reserve")} \div ${W("完全稀释股数", "fully diluted shares")}}`, true),
      ],
      fn: "netReserve / mnavNetBps(price, btcReserve, otmDebt, prefNotional, usdAssets, fullyDilutedShares)", tags: "mnav net reserve 净储备 strategy 2026 fully diluted", src: T("阶段 16.2、阶段 16.4", "Stages 16.2, 16.4"),
      ins: [["p", T("股价", "Share price"), 15, 0.1], ["res", "BTC Reserve ($M)", 1000, 10], ["otm", T("价外债务", "OTM debt"), 150, 5], ["pf", T("优先股", "Preferred"), 150, 5], ["usd", T("美元资产", "USD assets"), 30, 5], ["sh", T("完全稀释股数（百万）", "Fully diluted shares (M)"), 100, 1]],
      out: (v) => { const nr = netReserve(v.res, v.otm, v.pf, v.usd); return [[T("净储备", "Net Reserve"), fmtUsd(nr, 0) + "M"], [T("每股净比特币", "Net BTC per share"), fmtUsd(nr / v.sh, 2)], ["mNAV", fmtNum(mnavNetBps(v.p, v.res, v.otm, v.pf, v.usd, v.sh), 2) + "x"]]; } },
    { cat: "dat", t: T("每股比特币（聪）", "BTC per share (sats)"), f: [tex(T(String.raw`\frac{\text{持币}}{\text{股数}} \times 1\ \text{亿}`, String.raw`\frac{\text{coins}}{\text{shares}} \times 100\text{M}`), true)], fn: "btcPerShare(btc, shares)", tags: "bps sats per share 每股比特币 聪", src: T("阶段 16.1", "Stage 16.1"),
      ins: [["btc", T("持币", "BTC held"), 10000, 100], ["sh", T("股数（百万）", "Shares (M)"), 100, 1]],
      out: (v) => [[T("聪/股", "Sats/share"), fmtNum(btcPerShare(v.btc, v.sh * 1e6) * 1e8, 0)]] },
    { cat: "dat", t: "BTC Yield · BTC Gain · BTC $ Gain",
      f: [
        tex(String.raw`\text{Yield} = \frac{\mathrm{BPS}_{1}}{\mathrm{BPS}_{0}} - 1`, true),
        tex(String.raw`\text{Gain} = ${W("期初持币", "starting BTC")} \times \text{Yield}`, true),
        tex(String.raw`\text{\$ Gain} = \text{Gain} \times ${W("币价", "price")}`, true),
      ],
      fn: "btcYield / btcGain / btcDollarGain", tags: "btc yield gain kpi 每股比特币 增长", src: T("阶段 16.3", "Stage 16.3"),
      ins: [["b0", T("期初持币", "Start BTC"), 10000, 100], ["s0", T("期初股数（百万）", "Start shares (M)"), 100, 1], ["b1", T("期末持币", "End BTC"), 11500, 100], ["s1", T("期末股数（百万）", "End shares (M)"), 110, 1], ["px", T("币价", "BTC price"), 100000, 1000]],
      out: (v) => { const y = btcYield(v.b0, v.s0, v.b1, v.s1); return [["BTC Yield", fmtPct(y, 2)], ["BTC Gain", fmtNum(btcGain(v.b0, y), 0) + " BTC"], ["BTC $ Gain", fmtUsd(btcDollarGain(v.b0, y, v.px) / 1e6, 1) + "M"]]; } },
    { cat: "dat", t: T("发股买币（飞轮）", "Issue and buy (the flywheel)"),
      f: [tex(String.raw`${W("新", "New")}\ \mathrm{BPS} = \frac{${W("持币", "coins")} + ${W("新股", "new shares")} \times ${W("发行价", "issue price")} \div ${W("币价", "BTC price")}}{${W("股数", "shares")} + ${W("新股", "new shares")}}`, true)],
      fn: "issueAndBuy({btc, shares, btcPrice, px, newShares})", tags: "flywheel issuance accretive dilution atm bps 飞轮 增发 稀释", src: T("阶段 16.7", "Stage 16.7"),
      ins: [["px", T("发行价", "Issue price"), 15, 0.1], ["ns", T("新股（百万）", "New shares (M)"), 10, 1], ["btc", T("持币", "BTC held"), 10000, 100], ["sh", T("股数（百万）", "Shares (M)"), 100, 1], ["bp", T("币价", "BTC price"), 100000, 1000]],
      out: (v) => { const r = issueAndBuy({ btc: v.btc, shares: v.sh * 1e6, btcPrice: v.bp, px: v.px, newShares: v.ns * 1e6 }); return [[T("新持币", "New BTC"), fmtNum(r.btc, 0)], [T("每股比特币变化", "BTC per share change"), fmtPct(r.change, 2)]]; } },
    { cat: "dat", t: T("三种放大：简单 · Strategy · Strive", "Three amplifications: simple · Strategy · Strive"),
      f: [
        tex(String.raw`${W("简单", "Simple")} = \frac{\text{BTC}}{\text{BTC} - ${W("优先索取权", "senior claims")}}`, true),
        tex(String.raw`\text{Strategy} = \frac{\text{BTC Reserve}}{\text{Net Reserve}}`, true),
        tex(String.raw`\text{Strive} = \frac{${W("债务", "debt")} + ${W("优先股", "preferred")}}{\text{BTC}}`, true),
      ],
      fn: "amplification / amplificationStrategy / striveAmpRatio", tags: "amplification leverage ratio strive strategy 放大 杠杆", src: T("阶段 16.4、阶段 17.5", "Stages 16.4, 17.5"),
      ins: [["res", "BTC ($M)", 1000, 10], ["d", T("债务（价外）", "Debt (OTM)"), 150, 5], ["pf", T("优先股", "Preferred"), 150, 5], ["usd", T("美元资产", "USD assets"), 30, 5]],
      out: (v) => [[T("简单", "Simple"), fmtNum(amplification(v.res, v.d + v.pf), 2) + "x"], ["Strategy", fmtNum(amplificationStrategy(v.res, v.d, v.pf, v.usd), 2) + "x"], [T("Strive（比例）", "Strive (ratio)"), fmtPct(striveAmpRatio(v.d, v.pf, v.res), 1)]] },
    { cat: "dat", t: T("BTC 评级与地板价", "BTC Rating and floor price"),
      f: [
        tex(String.raw`${W("BTC 评级", "BTC Rating")} = \frac{\text{BTC Reserve}}{${W("本层", "this layer")} + ${W("更优先层", "all senior")}}`, true),
        tex(String.raw`${W("地板价", "Floor")} = \frac{${W("币价", "BTC price")}}{${W("评级", "rating")}}`, true),
      ],
      fn: "btcRating / btcFloorPrice", tags: "btc rating coverage floor 评级 覆盖 地板价", src: T("阶段 16.5", "Stage 16.5"),
      ins: [["res", "BTC Reserve ($M)", 1000, 10], ["cum", T("累计索取权（百万）", "Cumulative claims ($M)"), 250, 5], ["px", T("币价", "BTC price"), 100000, 1000]],
      out: (v) => { const r = btcRating(v.res, v.cum); return [[T("BTC 评级", "BTC Rating"), fmtNum(r, 2) + "x"], [T("地板价", "Floor price"), fmtUsd(btcFloorPrice(v.px, r))]]; } },
    { cat: "dat", t: "BTC Risk → BTC Credit",
      f: [
        tex(String.raw`\text{BTC Risk} = N\!\left(\frac{\ln(1/${W("评级", "rating")}) - \left(\mu - \frac{\sigma^{2}}{2}\right)T}{\sigma\sqrt{T}}\right)`, true),
        tex(String.raw`\text{BTC Credit} = \frac{-\ln(1 - \text{BTC Risk})}{${W("久期", "duration")}}`, true),
      ],
      fn: "btcRiskProb(rating, mu, sigma, T) / btcCredit(btcRisk, duration)", tags: "btc risk credit spread lognormal 利差 概率", src: T("阶段 16.5、阶段 18.1", "Stages 16.5, 18.1"),
      ins: [["rt", T("BTC 评级", "BTC Rating"), 4, 0.1], ["arr", T("比特币年化增长 %", "BTC ARR %"), 10, 1], ["sig", T("波动率 %", "Volatility %"), 40, 1], ["d", T("久期（年）", "Duration (yrs)"), 10, 0.1]],
      out: (v) => { const risk = btcRiskProb(v.rt, Math.log(1 + P(v.arr)), P(v.sig), v.d); return [["BTC Risk", fmtPct(risk, 2)], ["BTC Credit", fmtNum(btcCredit(risk, v.d) * 10000, 0) + T(" 基点", " bp")]]; } },
    { cat: "dat", t: T("Breakeven ARR 与覆盖月数", "Breakeven ARR and months covered"),
      f: [
        tex(String.raw`\text{Breakeven ARR} = \frac{${W("年度义务", "annual obligations")}}{\text{BTC Reserve}}`, true),
        tex(String.raw`${W("覆盖月数", "Months covered")} = \frac{${W("储备", "reserve")}}{${W("年度义务", "annual obligations")}} \times 12`, true),
      ],
      fn: "breakevenArr / monthsCovered", tags: "breakeven arr months covered usd reserve dividend 覆盖 储备 股息", src: T("阶段 16.6、阶段 18.2", "Stages 16.6, 18.2"),
      ins: [["ob", T("年度利息+股息（百万）", "Annual int + div ($M)"), 15, 1], ["res", "BTC Reserve ($M)", 1000, 10], ["usd", T("美元储备（百万）", "USD reserve ($M)"), 30, 1]],
      out: (v) => [["Breakeven ARR", fmtPct(breakevenArr(v.ob, v.res), 2)], [T("覆盖月数", "Months covered"), fmtNum(monthsCovered(v.usd, v.ob), 1)]] },
  ];

  const st = { q: "", cat: "all" };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🗂️ 公式速查 + 现场计算器（默认值：全课标准例子）", "🗂️ Formula finder + live calculators (defaults: the course's standard examples)")}</div>
      <div class="demo-block">
        <label class="demo-label" for="cs-q">${T("搜索（中文或英文：mNAV、评级、久期、kelly……）", "Search (e.g. mNAV, rating, duration, kelly …)")}</label>
        <input id="cs-q" type="search" autocomplete="off" placeholder="${T("输入关键词", "Type a keyword")}" style="width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font-size:14px" />
        <div class="demo-seg" id="cs-cat" style="margin-top:8px;flex-wrap:wrap">${CATS.map(([k, t]) => `<button data-c="${k}" class="${k === "all" ? "on" : ""}">${t}</button>`).join("")}</div>
      </div>
      <div class="demo-meta" id="cs-count"></div>
      <div id="cs-cards">${CARDS.map((c, i) => `
        <div class="scn" data-i="${i}">
          <div class="scn-q"><b>${c.t}</b> <span class="pill ok">${c.src}</span></div>
          <div class="demo-out" style="margin-top:0;padding:4px 14px">${c.f.join("")}</div>
          <div class="scn-meta">${T("引擎", "Engine")}${T("：", ": ")}<code>${c.fn}</code></div>
          <div class="demo-grid-3" style="margin-top:8px">${c.ins.map(([k, lab, def, step]) => `
            <label class="demo-label" style="display:flex;flex-direction:column;gap:3px">${lab}
              <input type="number" data-k="${k}" value="${def}" step="${step}" style="padding:6px 8px;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--ink);font-size:13px;width:100%;box-sizing:border-box" />
            </label>`).join("")}</div>
          <div class="stat-row" data-out></div>
        </div>`).join("")}</div>
      <p class="demo-tip">${T(
        "搜“mNAV”会出现四张卡片——用默认的橙子公司数字，它们分别给出 1.50、1.59、1.77、2.05：同一家公司，四个都对。再搜“放大”，同一组输入给出 1.43 倍、1.37 倍和 30%：三个名字相近的指标，是三个不同的公式。改任何一个输入，结果立即重算。",
        "Search \"mNAV\" and four cards appear. With the default Orange Corp numbers they give 1.50, 1.59, 1.77 and 2.05: one company, all four correct. Then search \"amplification\": the same inputs give 1.43x, 1.37x and 30%, three similarly named metrics that are three different formulas. Change any input and the result recalculates instantly."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const cardEls = [...root.querySelectorAll("#cs-cards .scn")];

  function compute(el) {
    const c = CARDS[Number(el.dataset.i)], v = {};
    el.querySelectorAll("input[data-k]").forEach((inp) => { v[inp.dataset.k] = Number(inp.value); });
    let rows;
    try { rows = c.out(v); } catch (e) { rows = [[T("输入有误", "Check inputs"), "–"]]; }
    el.querySelector("[data-out]").innerHTML = rows.map(([k, val]) => `<div class="stat"><div class="k">${k}</div><div class="v acc">${val}</div></div>`).join("");
  }

  function filter() {
    const q = st.q.trim().toLowerCase();
    let n = 0;
    cardEls.forEach((el) => {
      const c = CARDS[Number(el.dataset.i)];
      const hay = (c.t + " " + c.f.join(" ").replace(/<[^>]+>/g, "") + " " + c.fn + " " + c.tags).toLowerCase();
      const show = (st.cat === "all" || c.cat === st.cat) && (!q || q.split(/\s+/).every((w) => hay.includes(w)));
      el.style.display = show ? "" : "none";
      if (show) n++;
    });
    $("#cs-count").textContent = T(`显示 ${n} / ${CARDS.length} 张卡片`, `Showing ${n} of ${CARDS.length} cards`);
  }

  cardEls.forEach((el) => { el.querySelectorAll("input[data-k]").forEach((inp) => inp.addEventListener("input", () => compute(el))); compute(el); });
  $("#cs-q").addEventListener("input", (e) => { st.q = e.target.value; filter(); });
  root.querySelectorAll("#cs-cat button").forEach((b) => b.addEventListener("click", () => {
    st.cat = b.dataset.c; root.querySelectorAll("#cs-cat button").forEach((x) => x.classList.toggle("on", x === b)); filter();
  }));
  filter();
}
