export default {
  id: "portfolio-construction",
  stage: 11,
  order: 2,
  title: "Portfolio Construction: 60/40, Risk Parity & All-Weather",
  difficulty: "systems",
  prereqs: ["diversification", "inflation-regimes"],

  oneLiner:
    "Once you understand why diversification works, the next question is **how to actually build a portfolio.** This lesson takes apart the three most famous answers — **60/40** (simple, but nearly all of its risk sits in stocks), **risk parity** (allocate by the risk each asset contributes, not the money it takes), and **All Weather** (carry an umbrella for each of the four growth × inflation \"weathers\") — then shows why **2022, when stocks and bonds fell together**, hurt all of them at once. It ends with a framework for where new assets such as Bitcoin, preferred stock and tokenized Treasuries would sit in a portfolio, and how big a risk budget they would get.",

  intuition: `
Picture yourself picking a formation for a soccer team. Eleven spots, and you can fill them with forwards, midfielders, defenders and a goalkeeper.

The most common formation is "**six attacking, four defending**": attackers score, defenders protect. In most matches it works fine. But if you look closely at **where the goals you concede actually come from**, you notice something odd: almost all the risk comes from the six attackers. When they overcommit, the whole team loses shape. The four defenders take up four spots on the field, yet they carry hardly any of the "risk."

That is the real face of the most classic portfolio in investing, **60/40** (60% stocks, 40% bonds). Run it through last lesson's tools (Stage 11.1): assume stocks have 16% volatility, bonds 7%, and a stock–bond correlation of 0.2. The 60/40 portfolio's volatility comes out around 10.5% — but roughly **88% of that risk comes from stocks**, with bonds contributing just 12%. **In dollars it's six to four; in risk it's closer to nine to one.**

So some people proposed a different formation: **make every position carry the same amount of risk.** Bonds are calm, so hold more of them; stocks are jumpy, so hold fewer. Following that logic you'd hold about 30% stocks and 70% bonds, each contributing half the risk. That's **risk parity**. Its volatility is lower — about 7.5% — so if you want the same volatility as 60/40 you **add a bit of leverage**.

A third approach goes further still. Instead of asking "how much in stocks," it asks "**what kinds of economic weather could we get?**" Growth can come in above or below expectations, and so can inflation — two by two, that's four weathers. Hold something that does well in each one and you have **All Weather**, the approach Ray Dalio's team at Bridgewater launched around 1996.

Then came **2022**. Inflation hit a 40-year high and the Federal Reserve raised rates at breakneck speed. US stocks lost about 18%, the broad US bond index lost about 13% — **stocks and bonds fell together**. A 60/40 portfolio lost about 16%, one of its worst years in about a century, and risk parity, which leans on bonds rising when stocks fall, took a serious hit too. The reason is the **shift in inflation regime** from Stage 9.5: inflation is the common enemy of stocks and bonds, and once it takes center stage the stock–bond correlation flips from negative to positive.

This lesson sits on **Idea ④ Risk & leverage**: building a portfolio is fundamentally about **allocating risk, not money**, and risk parity teaches that **leverage isn't inherently bad — what matters is what you lever and at what interest rate.** It also touches **Idea ① The price of time**: the cost of borrowing decides whether leverage pays, and inflation and rates decide whether stocks and bonds still protect each other. Later, Stage 20.2 expands the growth × inflation (× liquidity) grid into a full map of macro regimes and places Bitcoin, DAT common stock and DAT preferreds on it.

**This lesson has five parts:**

- **① 60/40: the logic of the classic portfolio and its hidden concentration**
- **② Risk parity: allocate by risk, not by dollars**
- **③ All Weather: an umbrella for each of four economic weathers**
- **④ 2022: the stock–bond correlation flip, and rebalancing**
- **⑤ Where new assets fit: a framework for Bitcoin, preferreds and tokenized Treasuries**
`,

  mechanics: `
### ① 60/40: the logic of the classic portfolio and its hidden concentration

The logic of 60/40 is disarmingly simple: **stocks provide growth (the equity risk premium, Stage 5.4); bonds provide income and shock absorption.** For most of 2000–2020, stock sell-offs came with rate cuts and flight-to-safety buying, so bonds rose when stocks fell and each leg propped up the other. It's simple, cheap and easy to stick with, which is why it became the default starting point for pension funds, target-date funds and personal financial plans.

Using this stage's standard teaching assumptions (stocks: 8% expected return, 16% volatility; bonds: 5% and 7%; correlation 0.2; risk-free rate 3%):

<table>
<tr><th></th><th>Expected return</th><th>Volatility</th><th>Sharpe ratio</th><th>Stocks' risk contribution</th></tr>
<tr><td>100% stocks</td><td>8.0%</td><td>16.0%</td><td>0.31</td><td>100%</td></tr>
<tr><td>60/40</td><td>6.8%</td><td>10.5%</td><td>0.36</td><td>~88%</td></tr>
<tr><td>Risk parity (~30/70)</td><td>5.9%</td><td>7.5%</td><td>0.39</td><td>50%</td></tr>
<tr><td>Risk parity × 1.4 leverage</td><td>7.1%</td><td>10.5%</td><td>0.39</td><td>50%</td></tr>
</table>

How do you compute a **risk contribution**? An asset's risk contribution = its weight × its covariance with the whole portfolio ÷ the portfolio's variance. The contributions of all assets add up to exactly 100%. Stocks at 88% in a 60/40 portfolio means: **nearly nine-tenths of every big swing in the portfolio is down to stocks.** Seen through a risk lens, 60/40 is really "a stock portfolio with some shock absorbers."

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="190" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Dollar weight vs risk contribution</text><text x="112" y="58" text-anchor="end" font-size="11" fill="var(--ink)">60/40 · dollars</text><rect x="120" y="44" width="120" height="22" fill="var(--orange-soft)" stroke="var(--orange)"/><rect x="240" y="44" width="80" height="22" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="180" y="59" text-anchor="middle" font-size="11" fill="var(--ink)">Stocks 60%</text><text x="280" y="59" text-anchor="middle" font-size="11" fill="var(--ink)">Bonds 40%</text><text x="112" y="90" text-anchor="end" font-size="11" fill="var(--ink)">60/40 · risk</text><rect x="120" y="76" width="176" height="22" fill="var(--orange)" stroke="var(--orange)"/><rect x="296" y="76" width="24" height="22" fill="var(--blue)" stroke="var(--blue)"/><text x="208" y="91" text-anchor="middle" font-size="11" fill="var(--surface-2)" font-weight="600">Stocks ~88%</text><text x="325" y="91" font-size="10" fill="var(--muted)">12%</text><text x="112" y="140" text-anchor="end" font-size="11" fill="var(--ink)">Risk parity · dollars</text><rect x="120" y="126" width="60" height="22" fill="var(--orange-soft)" stroke="var(--orange)"/><rect x="180" y="126" width="140" height="22" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="150" y="141" text-anchor="middle" font-size="11" fill="var(--ink)">30%</text><text x="250" y="141" text-anchor="middle" font-size="11" fill="var(--ink)">Bonds 70%</text><text x="112" y="172" text-anchor="end" font-size="11" fill="var(--ink)">Risk parity · risk</text><rect x="120" y="158" width="100" height="22" fill="var(--orange)" stroke="var(--orange)"/><rect x="220" y="158" width="100" height="22" fill="var(--blue)" stroke="var(--blue)"/><text x="170" y="173" text-anchor="middle" font-size="11" fill="var(--surface-2)" font-weight="600">50%</text><text x="270" y="173" text-anchor="middle" font-size="11" fill="var(--surface-2)" font-weight="600">50%</text><text x="220" y="210" text-anchor="middle" font-size="10.5" fill="var(--muted)">Assumes stocks σ 16%, bonds σ 7%, correlation 0.2</text><text x="220" y="228" text-anchor="middle" font-size="10.5" fill="var(--muted)">Six-to-four in dollars, nearly nine-to-one in risk</text><text x="505" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">All Weather: four economic weathers</text><rect x="400" y="40" width="105" height="90" rx="4" fill="var(--green-soft)" stroke="var(--line)"/><rect x="505" y="40" width="105" height="90" rx="4" fill="var(--btc-soft)" stroke="var(--line)"/><rect x="400" y="130" width="105" height="90" rx="4" fill="var(--blue-soft)" stroke="var(--line)"/><rect x="505" y="130" width="105" height="90" rx="4" fill="var(--red-soft)" stroke="var(--line)"/><text x="452" y="62" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">Growth↑ Inflation↓</text><text x="452" y="82" text-anchor="middle" font-size="10.5" fill="var(--muted)">Stocks</text><text x="452" y="98" text-anchor="middle" font-size="10.5" fill="var(--muted)">Corporate credit</text><text x="557" y="62" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">Growth↑ Inflation↑</text><text x="557" y="82" text-anchor="middle" font-size="10.5" fill="var(--muted)">Commodities, gold</text><text x="557" y="98" text-anchor="middle" font-size="10.5" fill="var(--muted)">Inflation-linked</text><text x="452" y="152" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">Growth↓ Inflation↓</text><text x="452" y="172" text-anchor="middle" font-size="10.5" fill="var(--muted)">Long nominal</text><text x="452" y="188" text-anchor="middle" font-size="10.5" fill="var(--muted)">Treasuries</text><text x="557" y="152" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">Growth↓ Inflation↑</text><text x="557" y="172" text-anchor="middle" font-size="10.5" fill="var(--muted)">TIPS, gold</text><text x="557" y="188" text-anchor="middle" font-size="10.5" fill="var(--muted)">(stagflation)</text><text x="505" y="240" text-anchor="middle" font-size="10.5" fill="var(--muted)">Growth and inflation mean surprises vs expectations</text><text x="505" y="258" text-anchor="middle" font-size="10.5" fill="var(--muted)">Equal risk in each box, not equal money</text></svg><figcaption>Left: 60/40 looks balanced in dollars but is heavily concentrated in stock risk; risk parity makes both assets contribute equally. Right: All Weather splits the economy into four "weathers" and puts an asset class that tends to do relatively well in each box.</figcaption></figure>

### ② Risk parity: allocate by risk, not by dollars

The simplest version of risk parity is **inverse-volatility weighting**: each asset's weight is proportional to one over its volatility. With stocks at 16% and bonds at 7%, the stock weight = (1/16) ÷ (1/16 + 1/7) ≈ 30%, and bonds get about 70%. As long as correlations aren't extreme, that is already very close to "half the risk each."

The benefit is that the portfolio no longer hinges on the performance of a single asset. In the table above, the risk-parity portfolio's Sharpe ratio (0.39) edges out 60/40's (0.36), because it isn't spending most of its risk budget on one source. But its absolute return (5.9%) is lower, and so is its volatility (7.5%). To match 60/40's level of risk you borrow and scale the whole portfolio up by about 1.4 times:

$$
Levered return = L × portfolio return − (L − 1) × borrowing rate
= 1.4 × 5.9% − 0.4 × 3% ≈ 7.1%
$$

**Risk parity's whole logic rests on three assumptions:**

- **Borrowing is cheap.** The higher the borrowing rate, the less leverage helps. Raise it from 3% to 6% in the example and the levered return drops to about 5.9% — no better than the unlevered portfolio, but now with leverage risk on top.
- **Bonds protect you when stocks fall.** Risk parity holds a lot of bonds, often levered. If stocks and bonds fall together, its losses concentrate on the bond side, more than in 60/40.
- **Volatilities and correlations are fairly stable.** Weights are set from past volatility. If volatility jumps, the portfolio mechanically cuts positions (de-risking as volatility rises), which can add to selling pressure in a turbulent market.

This shows one of **Idea ④**'s key lessons very clearly: **leverage itself isn't the danger — leverage on volatile things is.** Risk parity puts leverage on low-volatility bonds, not on stocks. Stage 11.4 shows mathematically why the same leverage on a high-volatility asset almost inevitably hurts over time, and Stage 16.4 shows how a DAT's "amplification" layers leverage onto an asset as volatile as Bitcoin.

### ③ All Weather: an umbrella for each of four economic weathers

The starting point for Dalio's team: **asset prices already reflect expectations; price moves come from surprises.** The two most important surprises are **economic growth** and **inflation**, which gives you four boxes (right side of the figure above):

- **Growth above expectations, inflation below**: stocks and corporate credit do well.
- **Growth above, inflation above**: commodities, gold and inflation-linked bonds (TIPS, Stage 2.5) do well.
- **Growth below, inflation below** (a deflationary recession, like 2008): long-dated nominal Treasuries do well.
- **Growth below, inflation above** (stagflation, like the 1970s): inflation-linked bonds, gold and commodities hold up relatively best — the hardest box of the four.

All Weather's move is to **give each box the same amount of risk** rather than betting on which weather next year brings. A popularized, simplified version circulates widely (30% stocks, 40% long-term Treasuries, 15% intermediate Treasuries, 7.5% gold, 7.5% commodities). It is not Bridgewater's actual product allocation, but it shows the idea: **long-term Treasuries are volatile enough that 40% of them roughly balances the risk of 30% in stocks.**

All Weather's biggest weakness is the same as risk parity's: **it assumes each box's assets will do well in "their" weather, and the weathers are defined by decades of past experience.** 2022's combination of an inflation surprise plus rate hikes hit nominal bonds (through the hikes) and stocks (through shrinking valuations) at the same time; only commodities and some inflation hedges held up.

### ④ 2022: the stock–bond correlation flip, and rebalancing

The rough 2022 report card (calendar-year total returns, approximate): US stocks (S&P 500) about −18%, the broad US bond index about −13%, long-term Treasuries down about 30%, and **a 60/40 portfolio about −16%**. After two decades in which "stocks and bonds are negatively correlated" had become common sense, it was a brutal reminder.

Why did it flip? Go back to **Idea ①**: stock and bond prices are both **discounted future cash flows** (Stage 2.3).

- When markets mostly fear **growth** (recession), stocks fall on lower earnings, the central bank cuts rates and bonds rally: **negative correlation.** That describes most of the low-inflation 2000–2020 era.
- When markets mostly fear **inflation**, the central bank has to hike, and a higher discount rate pushes stock and bond prices down together: **positive correlation.** That describes the 1970s through the late 1990s, and 2022.

So **the stock–bond correlation isn't a constant; it's a function of the inflation regime** (Stage 9.5). "Bonds are insurance for stocks" mostly holds when inflation is under control and can fail when it isn't. Stage 20.2 extends this observation to every asset class.

**Rebalancing** is the shared discipline behind all of these portfolios. Say a 60/40 portfolio sees stocks rise 20% in a year while bonds stay flat: 60 becomes 72, 40 stays 40, and stocks are now 72/112 ≈ 64.3% of the portfolio. Leave it alone and the portfolio's risk drifts quietly toward stocks. Periodically selling what has risen and buying what has fallen to get back to target is, at heart, a **contrarian** act: it forces you to sell high and buy low, and it keeps any one asset's risk contribution from ballooning. The costs are trading fees, taxes, and selling "too early" during long one-way trends.

### ⑤ Where new assets fit: a framework for Bitcoin, preferreds and tokenized Treasuries

**This lesson covers mechanics and analytical frameworks only; it is not investment advice.** With the tools above you can find a box for a new asset and give it a risk budget:

- **Bitcoin.** In the data it behaves more like a **high-volatility risk asset** that is sensitive to global liquidity and real rates (Stages 9.3 and 12.4); in 2022 it fell alongside stocks (about −64% for the year). Supporters argue it could do well over the long run in the "currency debasement, fiscal dominance" box (Stage 9.4). In framework terms, treat it as a **satellite position**: first decide how much of the portfolio's risk you're willing to let it contribute (say, a 10% risk budget), then back out the dollar weight. In Stage 11.1's example, a 5% Bitcoin weight already contributed about 14% of the risk.
- **Preferred stock (including Bitcoin-backed preferreds issued by DATs).** It behaves like a **long-duration credit asset**. A perpetual preferred's duration is roughly 1/yield (Stage 4.4), so a perpetual yielding 10% has a duration of about 10 years. It also carries the issuer's credit risk, and for a DAT preferred that credit risk is tied to the Bitcoin price (the BTC Rating of Stage 16.5). So it **sits in both the "rates" box and the "risk assets" box at once**, and in a 2022-style "inflation + rate hikes + falling risk assets" environment it can get hit from both sides. Stage 18.1 is devoted to pricing it.
- **Tokenized Treasuries and money-fund shares** (Stage 14.2): risk-wise they are short-term Treasuries and belong in the **cash / risk-free box**. What they change is the plumbing (around-the-clock settlement, use as on-chain collateral — Idea ③), not the portfolio's risk structure.
- **DAT common stock**: levered Bitcoin exposure plus the swings of the mNAV premium (Stage 16.2). If the portfolio already holds Bitcoin, it **adds no diversification — only more risk on the same factor.**

One general-purpose check: **list how much risk your portfolio has in each of four boxes — growth, inflation, rates and liquidity — and then ask which box each new asset makes heavier.** A portfolio that looks "diversified" may be riding almost entirely on a single box: easy liquidity plus low real rates.
`,

  demo: "portfolio-construction",

  analogy: `
Think of a portfolio as **packing a suitcase for a trip when you don't know the weather at your destination.**

**60/40** is like packing six T-shirts and four light jackets. Fine for summer and for spring or fall, and the bag is light. But think about it: whether this trip is comfortable depends almost entirely on "will it be hot?" — those four light jackets won't do much in a real cold snap.

**Risk parity** packs by a different rule: not by number of items, but by **how much weather change each item can handle.** Light jackets don't do much, so bring more of them; T-shirts matter a lot, so bring fewer, until hot and cold are equally covered. What if it doesn't all fit? Add a carry-on (leverage). The carry-on is fine — but if the airline raises the baggage fee (the borrowing rate), the extra stuff stops being worth it.

**All Weather** goes one step further. It admits you have no idea whether you'll get sun, rain, a heat wave or a cold snap, so it **packs one outfit for each**, with each outfit taking up roughly the same share of the suitcase.

**2022** is like landing to find cold, pouring rain — and discovering that your umbrella and your jacket are soaked **at the same time**. You'd assumed "if it rains, at least the jacket stays dry," and both failed together.

And a **new asset** like Bitcoin is a very thick, very eye-catching down parka. In some weather it could be a lifesaver; in other weather it will just make you sweat. The smart move isn't to argue about whether to bring it — it's to decide **which weather it's for and how much room in the suitcase you'll give it.**
`,

  misconceptions: [
    "**\"60/40 means 60% of the risk is in stocks and 40% in bonds.\"** — Those are dollar weights. Under this lesson's assumptions, about 88% of a 60/40 portfolio's risk comes from stocks. In risk terms, 60/40 is basically a stock portfolio with some shock absorbers.",
    "**\"Risk parity uses leverage, so it's more dangerous than 60/40.\"** — Risk parity puts leverage on low-volatility bonds, aiming for more balanced risk sources at the same total volatility. The real dangers are rising borrowing costs and stocks and bonds falling together (as in 2022), which magnify the bond leg. Leverage itself isn't the problem; what you lever, and at what rate, is.",
    "**\"Bonds are always insurance for stocks.\"** — The stock–bond correlation depends on the inflation regime. With low inflation, recession fears dominate and bonds rally when stocks fall; with high inflation, rate hikes push both down. In 2022 US stocks fell about 18% and the broad US bond index about 13%.",
    "**\"An All Weather portfolio never loses money.\"** — All Weather means \"don't bet on one weather,\" not \"never lose.\" It relies on how each box's assets behaved historically, and the 2022 collapse in nominal bonds hurt it too.",
    "**\"New assets like Bitcoin and preferreds are their own category, separate from the portfolio.\"** — Every asset should be judged by the risk it contributes and the macro box it lands in. Bitcoin behaves like a high-volatility, liquidity-sensitive asset; a perpetual preferred is both a long-duration asset and a credit asset; a tokenized Treasury is just cash. Look at exposures before labels.",
  ],

  quiz: [
    {
      q: "Under this lesson's assumptions (stocks σ 16%, bonds σ 7%, correlation 0.2), roughly how much of a 60/40 portfolio's risk comes from stocks?",
      options: [
        "60%, the same as the dollar weight",
        "About 88%",
        "About 40%",
        "50%, split evenly",
      ],
      answer: 1,
      explain: "Risk contribution = weight × covariance with the portfolio ÷ portfolio variance. Stocks are volatile, so 60% of the money brings about 88% of the risk. **Six-to-four in dollars, nearly nine-to-one in risk.**",
    },
    {
      q: "A risk-parity portfolio (~30/70) has about a 5.9% return and 7.5% volatility. How much leverage gets it to 60/40's ~10.5% volatility, and with a 3% borrowing rate, what's the levered return?",
      options: [
        "2×, about 11.8%",
        "1.4×, about 8.3% (before borrowing costs)",
        "No leverage needed; the return is 5.9%",
        "1.4×, about 7.1%",
      ],
      answer: 3,
      explain: "L = 10.5% ÷ 7.5% ≈ 1.4; levered return = 1.4 × 5.9% − 0.4 × 3% ≈ 7.1%. **Don't forget to subtract the cost of borrowing** — the higher rates are, the less leverage helps.",
    },
    {
      q: "Why did stocks and bonds fall together in 2022?",
      options: [
        "Inflation forced the central bank to hike quickly, and a higher discount rate pushed down both stock and bond prices",
        "A wave of corporate defaults hit bonds that year",
        "The economy fell into a deep deflationary recession",
        "Bitcoin's decline dragged down stocks and bonds",
      ],
      answer: 0,
      explain: "Stocks and bonds are both discounted future cash flows. When **inflation** is the main fear, rate hikes hit both and the correlation flips from negative to positive (Stage 9.5).",
    },
    {
      q: "In All Weather's four-box framework, which asset class has traditionally done best when growth AND inflation both come in below expectations (a deflationary recession)?",
      options: [
        "Commodities",
        "Stocks",
        "Long-term nominal Treasuries",
        "Everything except inflation-linked bonds",
      ],
      answer: 2,
      explain: "In a deflationary recession, central banks cut and inflation falls, so long nominal Treasuries rally (2008 is the textbook case). Commodities belong to the inflation boxes; stocks to \"growth up, inflation down.\"",
    },
    {
      q: "From a portfolio-construction point of view, which best describes a perpetual preferred yielding about 10%?",
      options: [
        "It's cash, with no interest-rate risk",
        "It's both a long-duration asset (duration about 10 years) and a credit asset, and can be hit from both sides in an \"inflation + rate hikes + falling risk assets\" environment",
        "It's completely uncorrelated with Bitcoin",
        "It has the same risk as a short-term Treasury bill",
      ],
      answer: 1,
      explain: "A perpetual's duration is about 1/yield (Stage 4.4), and it carries the issuer's credit risk; for a DAT preferred that credit is tied to the Bitcoin price. **So it sits in the \"rates\" box and the \"risk assets\" box at once.**",
    },
  ],

  further: [
    { label: "Bridgewater: The All Weather Story (the origin of All Weather, from Bridgewater)", url: "https://www.bridgewater.com/research-and-insights/the-all-weather-story" },
    { label: "Asness, Frazzini & Pedersen (2012), Leverage Aversion and Risk Parity (Financial Analysts Journal)", url: "https://www.aqr.com/Insights/Research/Journal-Article/Leverage-Aversion-and-Risk-Parity" },
    { label: "Investopedia: Risk parity, a primer", url: "https://www.investopedia.com/terms/r/risk-parity.asp" },
    { label: "Austrian Path (sister course): another angle on inflation and capital allocation", url: "https://evidex-cloud.github.io/droplet-labs-austrian-path/" },
  ],
};
