export default {
  id: "cheat-sheet",
  stage: 20,
  order: 4,
  title: "Appendix: Formulas, Metrics & Terms Cheat Sheet",
  difficulty: "mastery",
  prereqs: ["connect-the-dots", "btc-rating", "mnav"],

  oneLiner:
    "Every formula, metric and key number in the course on one page. Each formula matches the shared engine `_fin.js` **exactly**, and each is tagged with the lesson where it first appeared: time value (present value, compounding, Fisher, perpetuities, Gordon), bonds (price, yield to maturity, duration, convexity, DV01), risk and portfolios (Sharpe, Kelly, portfolio volatility, maximum drawdown), and the full DAT toolkit: **four mNAV definitions, BTC per share, BTC Yield/Gain/$ Gain, Strategy's Amplification versus Strive's Amplification Ratio, BTC Rating, floor price, BTC Risk and BTC Credit, Breakeven ARR and months covered.** A searchable demo with live calculators comes with it. **The definition always matters more than the number:** switch definitions and the same company can tell a different story.",

  intuition: `
This lesson is the course's toolbox inventory. Over the last 19 stages every formula made its entrance inside a story: the $1,000 5% ten-year bond, the 30-year Treasury's duration of 15.5, Orange Corp's 10,000 bitcoin. Stories help you understand. But when it is time to actually use the tools (reading an 8-K, digesting a headline, working through questions one and five of Stage 20.3's five-question method), what you need is **a table you can check at a glance.**

Why not just memorize the formulas? Because the most common mistake in this course is not arithmetic. It is **using the wrong definition.** Three examples:

- **mNAV.** Orange Corp is **1.50x** on a market-cap basis, **1.59x** on a diluted market-cap basis, **1.77x** on Strategy's 2025 enterprise-value basis and **2.05x** on Strategy's 2026 \\(\\text{share price} \\div \\text{net BTC per share}\\) basis. All four are correct. But compare one company's 1.50 with another's 2.05 and every conclusion you draw is wrong (Stage 16.2).
- **Amplification.** The simple measure is \\(\\dfrac{10}{10 - 3} \\approx\\) **1.43x** (ignoring cash). Strategy's official \\(\\text{Amplification} = \\dfrac{\\text{BTC Reserve}}{\\text{Net Reserve}} = \\dfrac{10}{7.3} \\approx\\) **1.37x**. Strive's "Amplification Ratio" is a different thing altogether: \\(\\dfrac{\\text{debt} + \\text{preferred}}{\\text{bitcoin}} =\\) **30%** (Stages 16.4 and 17.5).
- **BTC per share.** On 100 million common shares it is **10,000 sats.** On Strategy's "assumed diluted" share count (every convertible counted as converted whether in or out of the money, 106 million shares) it is about **9,434 sats** (Stage 16.1).

So every row of this cheat sheet states three things: **what the formula is, what it is called in the engine, and where it is most often misused.** All the illustrative numbers come from the course's standard examples, and you can recompute them on the spot with the calculators in the demo. Dated real-world figures come from this course's fact sheets (as of September 2026). They will go stale quickly, so rely on live official data such as strategy.com and treasury.gov.

The lesson covers **all four ideas.** The time-value formulas are Idea ①; the capital structure and DAT metrics are Idea ②; coverage and reserves are the "cash plumbing" of Idea ③; and the formulas for risk, leverage and volatility are Idea ④. **This lesson only collects mechanisms and calculation methods. It is not investment advice.**

A suggestion for using it: on your first read, go through each group of formulas and revisit the lesson it came from, checking that you can explain the intuition. After that, treat the demo as a calculator. Type mNAV, rating, duration or Kelly into the search box and the matching card appears.

**This lesson has six parts:**

- **① The price of time: compounding, present value, Fisher and perpetuities**
- **② Bonds and credit: price, yield, duration and spreads**
- **③ Capital structure, risk and portfolios: waterfalls, Sharpe, Kelly and options**
- **④ DAT metrics, part one: BTC NAV, four mNAVs, BTC per share and BTC Yield**
- **⑤ DAT metrics, part two: amplification, BTC Rating, BTC Credit and coverage**
- **⑥ Key numbers and definition traps: the course's anchors on one page**
`,

  mechanics: `
### ① The price of time: compounding, present value, Fisher and perpetuities

<table class="pm">
<tr><th>Name</th><th>Formula</th><th>Engine function</th><th>Standard example</th><th>Source</th></tr>
<tr><td>Future value (compounding)</td><td>\\(\\mathrm{FV} = \\mathrm{PV} \\times \\left(1 + \\dfrac{r}{m}\\right)^{n m}\\)</td><td>fv(pv, r, n, m)</td><td>$1,000 at 5% for 10 years, annual → 1,628.89</td><td>Stage 2.2</td></tr>
<tr><td>Present value</td><td>\\(\\mathrm{PV} = \\dfrac{\\mathrm{FV}}{\\left(1 + \\frac{r}{m}\\right)^{n m}}\\)</td><td>pv(fv, r, n, m)</td><td>$1,000 in 10 years at 5% → 613.91</td><td>Stage 2.3</td></tr>
<tr><td>Rule of 72</td><td>\\(\\text{Years to double} \\approx \\dfrac{72}{r \\times 100}\\)</td><td>rule72(r)</td><td>5% → about 14.4 years</td><td>Stage 2.2</td></tr>
<tr><td>Fisher equation (real rate)</td><td>\\(\\text{Real} = \\dfrac{1 + \\text{nominal}}{1 + \\text{inflation}} - 1\\)</td><td>realRate(nominal, infl)</td><td>5.17% nominal, 3.4% inflation → about 1.71%</td><td>Stage 2.5</td></tr>
<tr><td>Net present value</td><td>\\(\\mathrm{NPV} = \\sum_{t} \\dfrac{\\mathrm{CF}_{t}}{(1 + r)^{t}}\\)</td><td>npv(flows, r)</td><td>A stream of cash flows discounted at one rate</td><td>Stage 2.3</td></tr>
<tr><td>Perpetuity</td><td>\\(P = \\dfrac{\\mathrm{CF}}{r}\\)</td><td>perpetuity(cf, r)</td><td>$10 a year at 10% → 100</td><td>Stages 2.3, 18.1</td></tr>
<tr><td>Growing perpetuity (Gordon)</td><td>\\(P = \\dfrac{\\mathrm{CF}_{1}}{r - g}\\), only if \\(r > g\\)</td><td>gordon(cf1, r, g)</td><td>$5, 8%, 3% → 100</td><td>Stages 2.3, 5.3</td></tr>
</table>

**Key points.** This whole group is Idea ①. Every asset is worth its future cash flows discounted at some rate, and that rate is anchored on the risk-free Treasury yield (Stage 2.4). The real rate sets the opportunity cost of holding non-yielding assets such as gold and bitcoin (Stage 20.2). **Rates are always decimals** (\\(5\\% = 0.05\\)); that is the engine's convention.

### ② Bonds and credit: price, yield, duration and spreads

$$
\\text{Bond price}\\ P = \\sum_{k=1}^{n} \\frac{c}{\\left(1 + \\frac{y}{f}\\right)^{k}} + \\frac{\\text{face}}{\\left(1 + \\frac{y}{f}\\right)^{n}}
c = \\frac{\\text{face} \\times \\text{coupon}}{f}, \\qquad n = \\text{years} \\times f
\\text{Macaulay duration} = \\frac{\\sum_{t} t \\times \\mathrm{PV}(\\mathrm{CF}_{t})}{P}
\\text{Modified duration} = \\frac{\\text{Macaulay duration}}{1 + \\frac{y}{f}}
\\mathrm{DV01} = \\text{modified duration} \\times P \\times 0.0001
\\text{Price change} \\approx -\\,\\text{modified duration} \\times \\Delta y + \\frac{1}{2} \\times \\text{convexity} \\times (\\Delta y)^{2}
$$

<table class="pm">
<tr><th>Name</th><th>Engine function</th><th>Standard example</th><th>Source</th></tr>
<tr><td>Bond price</td><td>bondPrice(face, couponRate, ytm, years, freq=2)</td><td>$1,000, 5%, 10 years, at a 6% yield → 925.61</td><td>Stage 4.2</td></tr>
<tr><td>Yield to maturity (YTM, solved backwards)</td><td>bondYield(price, face, couponRate, years, freq)</td><td>The same bond at 950 → about 5.66%</td><td>Stage 4.2</td></tr>
<tr><td>Duration, convexity, DV01</td><td>bondRisk(face, couponRate, ytm, years, freq)</td><td>10-year modified duration about 7.79 at par (5% yield), about 7.67 at 6%; 5% 30-year modified duration about 15.45, convexity about 352</td><td>Stage 4.4</td></tr>
<tr><td>Duration + convexity approximation</td><td>priceChangeApprox(mod, convexity, dy)</td><td>30-year, +1 point → about −13.7% (exact: 100 → 86.2)</td><td>Stages 4.4, 4.5</td></tr>
<tr><td>Duration of a perpetual</td><td>\\(\\text{Modified duration} \\approx \\dfrac{1}{y}\\)</td><td>10% perpetual → about 10; yield +0.85 points → 100 → 92.2</td><td>Stages 4.4, 18.1</td></tr>
<tr><td>Credit spread</td><td>\\(\\text{Corporate yield} = \\text{Treasury yield} + \\text{spread}\\)</td><td>The spread pays for default, liquidity, subordination and complexity</td><td>Stage 4.6</td></tr>
<tr><td>Expected loss</td><td>\\(\\mathrm{EL} = \\mathrm{PD} \\times \\mathrm{LGD}\\)</td><td>2% default probability, 60% loss given default → \\(2\\% \\times 60\\% = 1.2\\%\\)</td><td>Stage 4.6</td></tr>
</table>

**Key points.** Price and yield move in opposite directions; the longer the maturity and the lower the coupon, the higher the duration. **A high dividend actually lowers a perpetual's duration:** a 10% perpetual (duration about 10) is "shorter" than a 5% 30-year Treasury (about 15.5). Note that the engine's bondPrice assumes **semi-annual coupons** by default (\`freq = 2\`).

### ③ Capital structure, risk and portfolios: waterfalls, Sharpe, Kelly and options

<table class="pm">
<tr><th>Name</th><th>Formula</th><th>Engine function</th><th>Source</th></tr>
<tr><td>Liquidation waterfall</td><td>Pay layers in order of seniority: each layer gets \\(\\min(\\text{assets left}, \\text{its claim})\\); whatever remains goes to common</td><td>waterfall(assetValue, layers)</td><td>Stages 6.1, 17.6</td></tr>
<tr><td>Asset coverage by layer</td><td>\\(\\text{Coverage} = \\dfrac{\\text{assets}}{\\text{cumulative claims of this layer and all above it}}\\)</td><td>coverageByLayer(assetValue, layers)</td><td>Stages 6.5, 16.5</td></tr>
<tr><td>Volatility (sample standard deviation)</td><td>\\(\\sigma = \\sqrt{\\dfrac{\\sum (x - \\bar{x})^{2}}{n - 1}}\\)</td><td>stdev(a)</td><td>Stage 11.3</td></tr>
<tr><td>Two-asset portfolio volatility</td><td>\\(\\sigma_{p} = \\sqrt{w^{2}\\sigma_{1}^{2} + (1-w)^{2}\\sigma_{2}^{2} + 2w(1-w)\\rho\\,\\sigma_{1}\\sigma_{2}}\\)</td><td>port2Vol(w, s1, s2, rho)</td><td>Stage 11.1</td></tr>
<tr><td>Sharpe ratio</td><td>\\(\\dfrac{\\text{return} - \\text{risk-free rate}}{\\text{volatility}}\\)</td><td>sharpe(ret, rf, vol)</td><td>Stage 11.3</td></tr>
<tr><td>Kelly fraction</td><td>\\(f^{*} = \\dfrac{b \\times p - (1 - p)}{b}\\)</td><td>kelly(p, b)</td><td>Stage 11.4</td></tr>
<tr><td>Maximum drawdown</td><td>\\(\\min\\left(\\dfrac{\\text{value}}{\\text{prior peak}} - 1\\right)\\)</td><td>maxDrawdown(series)</td><td>Stage 11.3</td></tr>
<tr><td>Black–Scholes</td><td>\\(C = S\\,N(d_{1}) - K e^{-rT} N(d_{2})\\); the put follows from parity</td><td>bsCall / bsPut(S, K, T, r, sigma)</td><td>Stages 7.2, 7.3</td></tr>
<tr><td>Constant-product market maker</td><td>\\(x \\cdot y = k\\); selling \\(dx\\) (after fees) returns \\(y - \\dfrac{k}{x + dx\\,(1 - \\text{fee})}\\)</td><td>ammSwap(x, y, dx, fee)</td><td>Stage 13.3</td></tr>
</table>

**Key points.** Diversification gets its power from the correlation \\(\\rho\\); once the stock–bond correlation turns positive, 60/40 volatility rises (Stage 20.2). Kelly tells you how much to bet, but for extremely volatile assets people usually use a fraction of it in practice (Stage 11.4). **Leverage amplifies not only returns but also volatility drag.**

### ④ DAT metrics, part one: BTC NAV, four mNAVs, BTC per share and BTC Yield

Orange Corp baseline: \\(10{,}000\\ \\text{BTC} \\times \\$100{,}000\\); \\(100\\ \\text{million common shares} \\times \\$15\\); a $150 million convertible (out of the money, conversion price $25, 6 million shares if converted); preferreds Orange-F $100 million + Orange-D $50 million; USD reserve $30 million.

$$
\\text{BTC NAV} = \\text{coins held} \\times \\text{BTC price}
\\text{Net Reserve} = \\text{BTC Reserve} - \\text{OTM debt notional} - \\text{preferred notional} + \\text{USD assets}
\\text{BTC per share} = \\frac{\\text{coins held}}{\\text{shares}}
$$

Here "OTM" means out of the money, and preferred notional excludes in-the-money convertible preferred; \\(1\\ \\text{BTC} = 100\\ \\text{million sats}\\).

<table class="pm">
<tr><th>Metric</th><th>Formula</th><th>Engine function</th><th>Orange Corp</th></tr>
<tr><td>BTC NAV</td><td>\\(\\text{coins} \\times \\text{price}\\)</td><td>btcNav(btc, btcPrice)</td><td>$1 billion</td></tr>
<tr><td>mNAV · market cap</td><td>\\(\\dfrac{\\text{market cap}}{\\text{BTC NAV}}\\)</td><td>mnavBasic(mktCap, btc, btcPrice)</td><td><b>1.50</b></td></tr>
<tr><td>mNAV · diluted market cap</td><td>\\(\\dfrac{\\text{price} \\times \\text{diluted shares}}{\\text{BTC NAV}}\\)</td><td>mnavDiluted(price, dilutedShares, btcReserve)</td><td><b>1.59</b> (106M shares)</td></tr>
<tr><td>mNAV · enterprise value (Strategy 2025)</td><td>\\(\\dfrac{\\text{market cap} + \\text{debt} + \\text{preferred notional} - \\text{cash}}{\\text{BTC NAV}}\\)</td><td>mnavEV(mktCap, debt, pref, cash, btc, btcPrice)</td><td><b>1.77</b></td></tr>
<tr><td>mNAV · \\(\\text{price} \\div \\text{net BTC per share}\\) (Strategy 2026)</td><td>\\(\\dfrac{\\text{price}}{\\text{Net Reserve} \\div \\text{fully diluted shares}}\\), counting only in-the-money instruments</td><td>mnavNetBps(price, btcReserve, otmDebt, prefNotional, usdAssets, fullyDilutedShares)</td><td><b>2.05</b> (Net Reserve $730M, $7.30 per share)</td></tr>
<tr><td>BTC per share</td><td>\\(\\dfrac{\\text{coins}}{\\text{shares}}\\)</td><td>btcPerShare(btc, shares)</td><td>10,000 sats (100M shares); about 9,434 sats (106M assumed diluted)</td></tr>
<tr><td>BTC Yield</td><td>\\(\\dfrac{\\text{ending coins} \\div \\text{ending shares}}{\\text{starting coins} \\div \\text{starting shares}} - 1\\)</td><td>btcYield(btc0, sh0, btc1, sh1)</td><td>+4.5% after issue-and-buy</td></tr>
<tr><td>BTC Gain</td><td>\\(\\text{starting coins} \\times \\text{BTC Yield}\\)</td><td>btcGain(btc0, yieldPct)</td><td>\\(10{,}000 \\times 4.545\\% \\approx 455\\ \\text{BTC}\\)</td></tr>
<tr><td>BTC $ Gain</td><td>\\(\\text{BTC Gain} \\times \\text{BTC price}\\)</td><td>btcDollarGain(btc0, yieldPct, btcPrice)</td><td>About $45.45 million</td></tr>
<tr><td>Issue and buy</td><td>\\(\\text{New BTC per share} = \\dfrac{\\text{coins} + \\text{new shares} \\times \\text{issue price} \\div \\text{BTC price}}{\\text{shares} + \\text{new shares}}\\)</td><td>issueAndBuy({btc, shares, btcPrice, px, newShares})</td><td>10M shares at $15 → \\(\\dfrac{11{,}500\\ \\text{BTC}}{110\\text{M shares}}\\), +4.5%</td></tr>
</table>

**Definition traps.** Strategy's BTC Yield uses "assumed diluted" shares (every convertible counted as converted, in the money or not), while its 2026 mNAV uses "fully diluted" shares (in-the-money instruments only). **The two "diluteds" are not the same thing** (Stages 16.1 and 16.3). Strive does not use the term mNAV; it reports a "Common Equity Accretion Premium" \\(= \\dfrac{\\text{market cap}}{\\text{bitcoin value}} - 1\\) (floored at 0%), roughly the market-cap mNAV minus 1. Real anchor: on its 2026 definition, Strategy's mNAV was about **1.01x** on August 21, 2026. **BTC Yield is not a "yield" in the bond sense**, as Strategy itself says; when bitcoin is bought with preferred or debt financing, it ignores the new senior claims.

### ⑤ DAT metrics, part two: amplification, BTC Rating, BTC Credit and coverage

<table class="pm">
<tr><th>Metric</th><th>Formula</th><th>Engine function</th><th>Orange Corp</th></tr>
<tr><td>Amplification · simple</td><td>\\(\\dfrac{\\text{BTC value}}{\\text{BTC value} - \\text{senior claims}}\\), ignoring cash</td><td>amplification(btcValue, seniorClaims)</td><td>\\(\\dfrac{10}{7} \\approx\\) <b>1.43x</b></td></tr>
<tr><td>Amplification · Strategy official</td><td>\\(\\dfrac{\\text{BTC Reserve}}{\\text{Net Reserve}}\\)</td><td>amplificationStrategy(btcReserve, otmDebt, prefNotional, usdAssets)</td><td>\\(\\dfrac{10}{7.3} \\approx\\) <b>1.37x</b></td></tr>
<tr><td>Amplification Ratio · Strive</td><td>\\(\\dfrac{\\text{debt} + \\text{preferred notional}}{\\text{BTC value}}\\) (a percentage)</td><td>striveAmpRatio(debt, prefNotional, btcReserve)</td><td>\\(\\dfrac{3}{10} =\\) <b>30%</b></td></tr>
<tr><td>BTC Rating (asset coverage)</td><td>\\(\\dfrac{\\text{BTC Reserve}}{\\text{this instrument's notional} + \\text{everything senior to it}}\\)</td><td>btcRating(btcValue, cumulativeClaims)</td><td>Convertible 6.7x · F 4.0x · D 3.3x</td></tr>
<tr><td>BTC floor price</td><td>\\(\\dfrac{\\text{BTC price}}{\\text{BTC Rating}}\\) (the price at which the rating is exactly 1.0x)</td><td>btcFloorPrice(btcPrice, rating)</td><td>F $25,000 · D about $30,000</td></tr>
<tr><td>BTC Risk</td><td>Probability the rating is \\(< 1\\) at the end of the duration, lognormal model: \\(N(z)\\), \\(z = \\dfrac{\\ln(1/\\text{rating}) - \\left(\\mu - \\frac{\\sigma^{2}}{2}\\right)T}{\\sigma\\sqrt{T}}\\)</td><td>btcRiskProb(rating, mu, sigma, T)</td><td>F: \\(\\mu = \\ln 1.10\\), \\(\\sigma = 40\\%\\), \\(T = 10\\) → about 11.2%</td></tr>
<tr><td>BTC Credit</td><td>\\(\\dfrac{-\\ln(1 - \\text{BTC Risk})}{\\text{duration}}\\)</td><td>btcCredit(btcRisk, duration)</td><td>F about 119 bp; e.g. Risk 10%, 10-year duration → about 105 bp</td></tr>
<tr><td>BTC Breakeven ARR</td><td>\\(\\dfrac{\\text{annual interest and dividends}}{\\text{BTC Reserve}}\\)</td><td>breakevenArr(annualObligations, btcReserve)</td><td>\\(\\dfrac{\\$15\\text{M}}{\\$1\\text{B}} =\\) <b>1.5%</b></td></tr>
<tr><td>Months covered</td><td>\\(\\dfrac{\\text{USD reserve}}{\\text{annual obligations}} \\times 12\\)</td><td>monthsCovered(reserve, annualObligations)</td><td>\\(\\dfrac{\\$30\\text{M}}{\\$15\\text{M}} \\times 12 =\\) <b>24 months</b></td></tr>
</table>

<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Orange Corp: every DAT metric from one balance sheet</text><rect x="40" y="40" width="200" height="200" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="140" y="130" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">10,000 BTC</text><text x="140" y="148" text-anchor="middle" font-size="11" fill="var(--muted)">BTC Reserve $1B</text><text x="140" y="166" text-anchor="middle" font-size="11" fill="var(--muted)">+ USD reserve $30M</text><rect x="280" y="40" width="200" height="30" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="380" y="60" text-anchor="middle" font-size="11" fill="var(--ink)">Convertible $150M · 6.7x</text><rect x="280" y="70" width="200" height="20" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="380" y="84" text-anchor="middle" font-size="10.5" fill="var(--ink)">F $100M · 4.0x · floor $25k</text><rect x="280" y="90" width="200" height="10" fill="var(--orange-soft)" stroke="var(--orange)"/><rect x="280" y="100" width="200" height="140" fill="var(--green-soft)" stroke="var(--green)"/><text x="380" y="160" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Common's Net Reserve $730M</text><text x="380" y="178" text-anchor="middle" font-size="10.5" fill="var(--muted)">Amplification ≈ 1.37x</text><text x="380" y="194" text-anchor="middle" font-size="10.5" fill="var(--muted)">mNAV 1.50 / 1.59 / 1.77 / 2.05</text><line x1="240" y1="140" x2="278" y2="140" stroke="var(--ink)" stroke-dasharray="4 3"/><text x="490" y="60" font-size="10" fill="var(--muted)">Dividends $15M/yr</text><text x="490" y="74" font-size="10" fill="var(--muted)">Covered 24 months</text><text x="490" y="99" font-size="10" fill="var(--muted)">← D $50M · 3.3x</text><text x="490" y="113" font-size="10" fill="var(--muted)">D floor about $30k</text><text x="490" y="132" font-size="10" fill="var(--muted)">Breakeven 1.5%</text><text x="490" y="148" font-size="10" fill="var(--muted)">Strive-style 30%</text></svg><figcaption>Assets on the left (bitcoin and the USD reserve), claims on the right in order of seniority from top to bottom. Every DAT metric is a ratio of two areas on this one picture.</figcaption></figure>

Real anchors (Strategy, all company disclosures; they change weekly): on August 23, 2026, Amplification was about **1.30x**, STRC's BTC Rating about **5.7x**, its floor price about **$13,400**, its BTC Credit about **59 bp**, and Breakeven ARR about **2.63%**. Strive's Amplification Ratio was about **50.4%** (September 18, 2026). **BTC Rating is not a rating from any rating agency**, as Strategy itself notes; S&P's issuer rating on Strategy is "B-" (Stages 16.5 and 18.1).

### ⑥ Key numbers and definition traps: the course's anchors on one page

**The course's standard examples**

<table class="pm">
<tr><th>Example</th><th>Numbers</th><th>Used in</th></tr>
<tr><td>Standard bond</td><td>$1,000 face, 5% coupon, 10 years; about 925.6 at a 6% yield; modified duration about 7.8 at par</td><td>Stages 4.1–4.4</td></tr>
<tr><td>30-year Treasury</td><td>About a 5% yield, modified duration about 15.5; yield +1 point → 100 → 86.2 (about −14%)</td><td>Stages 4.5, 20.1</td></tr>
<tr><td>Orange Corp</td><td>10,000 BTC, $100k price, \\(100\\text{M shares} \\times \\$15\\), $150M convertible, F $100M, D $50M, $30M reserve, $15M annual dividends</td><td>Stages 15–18, 20</td></tr>
<tr><td>Flywheel</td><td>Issue 10M shares at $15 → buy 1,500 BTC → BTC per share +4.5%</td><td>Stage 16.7</td></tr>
</table>

**Real-world anchors as of September 2026** (macro and DAT fact sheets; check live official data): 30-year Treasury about 5.49% and 10-year about 5.17% (September 25); fed funds 3.75–4.00% (hike on September 16); total federal debt about $40.07 trillion (September 24); August CPI about 3.4%; bitcoin about $84,000 (September 25), versus a high of about $126,000 in October 2025; stablecoins about $312 billion; Strategy holding 846,000 BTC (September 20) with a USD Reserve of about $5.04 billion; STRC's dividend rate 12.00%; SATA 13.00%.

**Ten definition traps**

1. There are four mNAV definitions, and Strategy changed its own in 2026. **Whenever you cite mNAV, say which one.**
2. "Diluted" comes in two kinds: assumed diluted (everything converts; used for BTC Yield) and fully diluted (in-the-money only; used for the 2026 mNAV).
3. Three amplification measures: simple 1.43, Strategy 1.37 (counts cash), and Strive's 30%, which is a ratio, not a multiple.
4. BTC Yield is not interest, and it does not subtract new senior claims.
5. BTC Rating is **cumulative** by layer: layer D's denominator includes the convertible and layer F.
6. The floor price does not move with the bitcoin price; it equals \\(\\dfrac{\\text{cumulative claims}}{\\text{coins held}}\\).
7. A perpetual's duration is not infinite; it is about \\(\\dfrac{1}{\\text{yield}}\\).
8. A variable-rate preferred's "short duration" depends on management actively resetting the rate.
9. Months covered uses the USD reserve alone; Strategy's "USD Duration" uses USD assets (reserve plus cash).
10. The engine uses decimal rates and semi-annual bond coupons by default; company definitions can differ slightly, and the lessons say so.

Next come the open questions of Stage ∞.1 and the capstone of Stage ∞.3: macro regime, rates, bitcoin, pick a DAT, compute the metrics, read the capital stack, run a stress test. Every row of this sheet will come in handy.
`,

  demo: "cheat-sheet",

  analogy: `
This cheat sheet is like **a pilot's checklist.**

Pilots understand aerodynamics perfectly well; they have studied the principle behind every switch several times over. Yet before every takeoff they still read the checklist line by line: flaps, trim, fuel, instruments. Not because they can't remember, but because **under pressure, people most easily skip the things they "already know."**

Reading a DAT's filing, digesting a headline that says "mNAV falls below 1," working out a preferred's yield: these are exactly those moments. You understand mNAV, but will you remember to ask which definition? You understand BTC Rating, but will you remember it is **cumulative**? You understand perpetuities, but might "a perpetual has infinite duration" slip out anyway?

A checklist does a second job too: **it makes different people speak the same language.** When the co-pilot says "flaps 15," the captain knows exactly what that means. When you say "mNAV of 1.01x on Strategy's 2026 definition," anyone else who has taken this course can recompute it precisely, instead of arguing with you about a number that was really built on a different definition.

So don't treat this lesson as something to memorize. Treat it as the card you pull out before takeoff: every time you are about to make a judgment, take it out and run down the list, one line at a time.
`,

  misconceptions: [
    "**\"There is one standard way to compute mNAV.\"** — There are at least four: market cap, diluted market cap, enterprise value (Strategy 2025) and \\(\\text{share price} \\div \\text{net BTC per share}\\) (Strategy 2026). Orange Corp comes out at 1.50, 1.59, 1.77 and 2.05. Third-party sites each have their own versions as well.",
    "**\"Strive's 30% Amplification Ratio means 0.3x amplification.\"** — It is the ratio \\(\\dfrac{\\text{debt} + \\text{preferred}}{\\text{bitcoin value}}\\). Strategy's Amplification (\\(\\dfrac{\\text{BTC Reserve}}{\\text{Net Reserve}}\\), a multiple above 1) is a different formula; the two cannot be compared directly.",
    "**\"A 4x BTC Rating means nothing happens unless bitcoin falls more than 75%.\"** — 4x only says coverage hits exactly 1x at $25,000. Long before that, coverage shrinks, spreads widen, the price falls, and the company may suspend dividends (which matters most for non-cumulative preferreds).",
    "**\"A positive BTC Yield means shareholders made money.\"** — It measures only the change in BTC per share, not a cash return. When bitcoin is bought with preferred or debt financing, it ignores the new claims that rank ahead of common.",
    "**\"If you memorize the formulas you won't make mistakes.\"** — The commonest errors are not arithmetic but definitions and units (percent versus decimal, annual versus semi-annual coupons). Confirm the definition and the unit before every calculation.",
  ],

  quiz: [
    {
      q: "What is Orange Corp's mNAV on Strategy's 2026 definition (\\(\\text{share price} \\div \\text{net BTC per share}\\))?",
      options: ["1.50", "1.77", "2.05", "1.59"],
      answer: 2,
      explain: "**\\(\\text{Net Reserve} = 10 - 1.5\\ (\\text{OTM convertible}) - 1.5\\ (\\text{preferreds}) + 0.3\\ (\\text{USD assets}) = \\$730\\ \\text{million}\\).** Fully diluted shares count only in-the-money instruments, which gives 100 million, so net BTC per share is $7.30 and \\(\\dfrac{15}{7.30} \\approx 2.05\\).",
    },
    {
      q: "Which statement correctly describes BTC Credit?",
      options: [
        "\\(\\text{BTC Credit} = \\dfrac{-\\ln(1 - \\text{BTC Risk})}{\\text{duration}}\\): the credit spread needed to offset the probability that the rating falls below 1",
        "\\(\\text{BTC Credit} = \\dfrac{\\text{annual dividends}}{\\text{BTC Reserve}}\\)",
        "\\(\\text{BTC Credit} = \\dfrac{\\text{BTC Reserve}}{\\text{Net Reserve}}\\)",
        "\\(\\text{BTC Credit} = \\dfrac{\\text{BTC price}}{\\text{BTC Rating}}\\)",
      ],
      answer: 0,
      explain: "**BTC Credit turns a probability into a spread.** Option B is Breakeven ARR, C is Strategy's Amplification and D is the floor price.",
    },
    {
      q: "A 10% perpetual preferred's required yield rises from 10% to 10.85%. Using the perpetuity formula, its price is roughly:",
      options: ["About 86.2", "About 100", "About 108.5", "About 92.2"],
      answer: 3,
      explain: "**\\(\\text{Perpetuity price} = \\dfrac{\\text{dividend}}{\\text{required yield}}\\)** \\(= \\dfrac{10}{0.1085} \\approx 92.2\\). Its modified duration is about \\(\\dfrac{1}{y} \\approx 10\\). 86.2 is the price of the 5% 30-year Treasury after a one-point rise in yield.",
    },
    {
      q: "Why is the BTC Rating of Orange Corp's Orange-D (non-cumulative, ranking after the convertible and Orange-F) 3.3x rather than 20x?",
      options: [
        "Because non-cumulative preferreds are discounted",
        "Because BTC Rating is cumulative by layer: \\(\\text{denominator} = \\$150\\text{M convertible} + \\$100\\text{M F} + \\$50\\text{M D} = \\$300\\text{M}\\)",
        "Because the USD reserve is subtracted",
        "Because it uses fully diluted shares",
      ],
      answer: 1,
      explain: "**\\(\\text{BTC Rating} = \\dfrac{\\text{BTC Reserve}}{\\text{this instrument} + \\text{everything senior to it}}\\)**: \\(\\dfrac{\\$1\\text{B}}{\\$300\\text{M}} \\approx 3.3\\times\\). Using only D's own $50M gives 20x and ignores everyone ahead of it in line.",
    },
    {
      q: "Orange Corp has a $30M USD reserve, $15M of annual dividends and a $1B BTC Reserve. What are its months covered and BTC Breakeven ARR?",
      options: ["24 months; 1.5%", "12 months; 3.0%", "24 months; 15%", "2 months; 1.5%"],
      answer: 0,
      explain: "**\\(\\text{Months covered} = \\dfrac{\\text{reserve}}{\\text{annual obligations}} \\times 12\\)** \\(= 24\\) months; **\\(\\text{Breakeven ARR} = \\dfrac{\\text{annual obligations}}{\\text{BTC Reserve}}\\)** \\(= 1.5\\%\\). Bitcoin rising 1.5% a year \"covers\" the dividends.",
    },
  ],

  further: [
    { label: "Strategy August 2026 investor briefing (SEC FWP, with official definitions of mNAV, Amplification, BTC Rating and BTC Credit)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strive treasury dashboard (Amplification Ratio and related definitions)", url: "https://strive.com/treasury" },
    { label: "bitcointreasuries.net: company mNAVs (basic, diluted and enterprise-value measures)", url: "https://bitcointreasuries.net/" },
    { label: "FRED: interest-rate, inflation and macro data", url: "https://fred.stlouisfed.org/" },
    { label: "Options Path (sister course): Black–Scholes and volatility", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
  ],
};
