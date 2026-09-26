export default {
  id: "bitcoin-volatility",
  stage: 12,
  order: 4,
  title: "Bitcoin's Volatility, Cycles & Correlations: What Kind of Asset Is It?",
  difficulty: "newfin",
  prereqs: ["bitcoin-valuation", "risk-metrics"],

  oneLiner:
    "Every bitcoin cycle ends with a deep fall from the peak: about −93% in 2011, −85% in 2014, −84% in 2018 and −77% in 2022 — and from **the all-time high of about $126,000 on October 6, 2025** to about $58,000 in June 2026, roughly −54% again. Sometimes it behaves like digital gold, sometimes like a leveraged tech stock, and sometimes like neither. This lesson answers four questions with numbers: how volatile is it really, is the “four-year cycle” a law or a coincidence, why are its links to stocks and gold so unstable, and how do macro liquidity and real rates drive it? Then it works out **what high volatility means for the size of a position**.",

  intuition: `
Suppose you bought one bitcoin on October 6, 2025 for about $126,000. Four days later, on October 10–11, President Trump threatened “massive” new tariffs on China and crypto suffered the largest liquidation event in its history: about $19 billion of leveraged positions were wiped out and the price dropped to about $106,600. On November 18 it fell below $90,000. On February 5, 2026 it touched about $60,000 intraday — the worst day since the FTX collapse. At the end of June it hit about $58,000, a 21-month low. By late September it was back to about $84,000: up about 45% from the bottom, yet still a third below what you paid.

Over the same stretch the S&P 500 set a record in August 2026 and sat near 7,700 in late September, and gold set a record of about $5,318 in January 2026. **Bitcoin followed neither stocks nor gold.** So what kind of asset is it?

This lesson sits mainly on **Idea ④ Risk & leverage**: volatility is the yardstick for risk (Stage 11.3), and bitcoin's volatility has long run at three to four times that of stocks. It also touches **Idea ①**, because changes in rates and liquidity hit bitcoin through the discount rate and the opportunity cost of holding it (Stage 9.3), and **Idea ③**, because when leverage piles up in the plumbing, falling prices trigger forced liquidations, which push prices down further (Stage 7.5).

A few intuitions to set up first:

- **High volatility isn't “bad,” but it always means the path matters.** For the same average return, more volatility means a lower compounded return. This is volatility drag (Stage 11.4).
- **The “cycle” is a story — and a story backed by a sample of four or five.** It may reflect the supply shock of the halvings, it may be coincidence, or it may be self-fulfilling because enough people believe it.
- **Correlation is not a constant.** An asset that moved with stocks for a while won't necessarily do so in the next crisis. Bitcoin fell with tech stocks in 2022, then fell on its own in 2026 while the stock market hit new highs.

All of this is groundwork for the treasury companies later on. Their common stock **amplifies** bitcoin's volatility further (Stage 16.4), and the prices of their preferreds and convertibles depend on how volatile bitcoin is (Stage 7.3, Stage 18.2).

**We'll take this lesson in five parts:**

- **① The numbers: just how volatile is bitcoin?**
- **② The four-year cycle story: halvings, bubbles and “this time is different”**
- **③ Correlations: safe haven, tech stock, or neither?**
- **④ Liquidity, real rates and leverage: bitcoin's macro drivers**
- **⑤ Is volatility falling? Maturity and what it means for position size**
`,

  mechanics: `
### ① The numbers: just how volatile is bitcoin?

Volatility is the standard deviation of daily returns, **annualized**. Bitcoin trades every day of the year, so you scale by √365 (stocks use √252):

$$
Annualized volatility = standard deviation of daily returns × √365
Example: 3% daily → 3% × 19.1 ≈ 57%
$$

For reference, US large-cap stock indexes have typically run at roughly 15–20% annualized, gold around 15%, and long Treasuries often 10–15% since 2022. Bitcoin's annualized volatility often exceeded 100% in its early years, ran mostly in the 60–90% range in 2017–2022, and fell mostly to 40–60% in 2023–2025 (all rough ranges that depend on the measurement window). **Even in its “calmest” years it has been two to three times as volatile as stocks.**

More intuitive than volatility is **maximum drawdown**: the fall from a peak to the subsequent low (Stage 11.3).

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Bitcoin's maximum drawdown by cycle (approx.): shrinking, but still deep</text><line x1="50" y1="50" x2="610" y2="50" stroke="var(--line)" stroke-width="1.5"/><text x="44" y="54" text-anchor="end" font-size="10" fill="var(--muted)">0%</text><text x="44" y="144" text-anchor="end" font-size="10" fill="var(--muted)">−50%</text><line x1="50" y1="140" x2="610" y2="140" stroke="var(--line)" stroke-dasharray="3 3"/><text x="44" y="234" text-anchor="end" font-size="10" fill="var(--muted)">−100%</text><rect x="75" y="50" width="70" height="167" rx="4" fill="var(--red)" opacity=".85"/><rect x="185" y="50" width="70" height="153" rx="4" fill="var(--red)" opacity=".75"/><rect x="295" y="50" width="70" height="151" rx="4" fill="var(--red)" opacity=".65"/><rect x="405" y="50" width="70" height="139" rx="4" fill="var(--red)" opacity=".55"/><rect x="515" y="50" width="70" height="97" rx="4" fill="var(--btc)"/><g font-size="11" font-weight="700" text-anchor="middle" fill="var(--ink)"><text x="110" y="233">−93%</text><text x="220" y="219">−85%</text><text x="330" y="217">−84%</text><text x="440" y="205">−77%</text><text x="550" y="163">−54%</text></g><g font-size="10" text-anchor="middle" fill="var(--muted)"><text x="110" y="256">2011</text><text x="220" y="256">late 2013–early 2015</text><text x="330" y="256">late 2017–late 2018</text><text x="440" y="256">late 2021–late 2022</text><text x="550" y="256">Oct 2025–</text><text x="550" y="270">Jun 2026</text></g><text x="320" y="286" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="600">Whether the latest cycle (orange) has bottomed was still unclear as of September 2026</text></svg><figcaption>Early drawdowns are commonly cited approximations; 2021–22 (about $69k → about $15.5k) and 2025–26 (about $126k → about $58k) come from this course's fact sheet.</figcaption></figure>

A rule of thumb: **every cycle someone says “it won't fall 80% again,” and every cycle the drawdown really is a bit shallower than the last — yet still far beyond what most investors can stomach.** In the March 2020 COVID panic bitcoin also halved within two days, and after the FTX collapse in November 2022 it fell to about $15,500, roughly 77% below its 2021 peak.

### ② The four-year cycle story: halvings, bubbles and “this time is different”

Line up the halvings against the cycle peaks and a striking pattern appears:

<table>
<tr><th>Halving</th><th>Following cycle peak</th><th>Gap</th><th>Subsequent deep drawdown</th></tr>
<tr><td>November 2012</td><td>December 2013 (about $1,100)</td><td>about 12 months</td><td>about −85%</td></tr>
<tr><td>July 2016</td><td>December 2017 (about $20,000)</td><td>about 17 months</td><td>about −84%</td></tr>
<tr><td>May 2020</td><td>November 2021 (about $69,000)</td><td>about 18 months</td><td>about −77%</td></tr>
<tr><td>April 2024</td><td>October 6, 2025 (about $126,000)</td><td>about 18 months</td><td>about −54% through June 2026</td></tr>
</table>

The case for the four-year cycle goes like this. A halving cuts in half the new coins miners must sell each day (Stage 12.2); that supply shock takes a year or more to show up in the price; rising prices draw in new buyers and leverage, inflating a bubble; the bubble bursts and roughly a year of bear market follows. **The 2025 peak landed, once again, about 18 months after the halving**, which kept the story popular through 2026.

The critique is just as strong:

- **The sample is tiny.** Four observations can be made to fit almost any pattern you like.
- **Each halving matters less.** The 2012 halving cut annual new supply from about 25% to about 12.5% — a huge shock. The 2024 halving cut it from about 1.7% to about 0.8%, and the roughly 450 fewer coins a day miners need to sell are small next to a single day of ETF flows (Stage 12.5).
- **It may be self-fulfilling.** If enough people believe “the top comes 18 months after the halving,” they sell around then and make the rule come true — the **reflexivity** of Stage 10.4.
- **Global liquidity may explain more.** The 2013, 2017 and 2021 peaks all came in easy-money environments (see part ④).

An honest conclusion: **the cycle story describes the past but guarantees nothing about the future.** Its most dangerous use is to convince people that the depth and timing of the next bottom can be predicted precisely.

### ③ Correlations: safe haven, tech stock, or neither?

Bitcoin's supporters hope it behaves like gold — rising in a crisis and uncorrelated with stocks. The data paint a more complicated picture:

- **Before 2020:** bitcoin's correlation with US stocks was mostly near zero; it acted like an isolated niche asset.
- **2020–2022:** as institutions arrived, its correlation with the Nasdaq rose sharply. When the Fed hiked aggressively in 2022, both crashed together — bitcoin looked like **a high-beta tech stock**.
- **The April 2025 tariff shock:** the S&P 500 fell about 18.9% from its February high, and bitcoin fell about 32% from its January high to about $74,400. Stocks, the dollar and Treasuries were sold together, and bitcoin offered no shelter.
- **2026:** the S&P 500 set records on the AI investment boom (up about 13% for the year through September 25) and gold set a record in January, yet bitcoin was in a bear market — **it followed neither stocks nor gold**.

Two lessons follow. First, **correlation shifts with the environment**: who holds the asset (retail, hedge funds, ETF investors), how much leverage they use, and what the market fears all change how it moves with everything else. Second, **the benefit of diversification rests on the correlation assumption** (Stage 11.1). If you own bitcoin because “it's uncorrelated with stocks,” be ready to discover in some future crisis that the two suddenly move together.

### ④ Liquidity, real rates and leverage: bitcoin's macro drivers

With no cash flows, bitcoin's price is driven heavily by **how loose money is** and **what it costs to hold**:

- **Global liquidity** (Stage 9.3): when central banks expand their balance sheets, rates fall and the dollar weakens, more money chases risky assets and bitcoin tends to do well; the reverse puts it under pressure. Zero rates and QE in 2020–2021 coincided with bitcoin's run from about $4,000 to about $69,000.
- **Real interest rates** (Stage 2.5): holding a zero-yield asset means giving up the real rate. In 2022 real rates swung from deeply negative to positive, and bitcoin lost about three-quarters of its value. As of September 2026, the US 10-year real yield was above 2%, the 30-year nominal yield about 5.5%, and the Fed had just hiked to 3.75–4.00% on September 16. **That is the macro backdrop to bitcoin's bear market.**
- **Leverage and liquidations** (Stage 7.5): crypto markets carry large amounts of perpetual-futures and lending leverage. A price drop triggers forced liquidations, the forced selling pushes prices down, and that triggers the next round. The roughly $19 billion liquidation on October 10–11, 2025 was exactly such a cascade.

The macro story has limits, though. The Fed stopped shrinking its balance sheet in December 2025 and the balance sheet began growing modestly again, yet bitcoin kept falling. **Liquidity is the backdrop, not a switch**; sentiment, positioning and fund flows matter too.

### ⑤ Is volatility falling? Maturity and what it means for position size

Over the long run bitcoin's volatility has fallen: a bigger market cap, a broader holder base, ETFs and institutions, and deeper derivatives markets. The drawdowns in part ① also shrank cycle by cycle. But the roughly −54% fall of 2025–26 shows that **“mature” is relative**.

High volatility has three concrete implications for a position:

- **Volatility drag.** Compounded return ≈ arithmetic average return − σ²/2. At 60% annualized volatility the drag is about 18 percentage points a year; at 45%, about 10. Of two assets with the same average return, the more volatile one grows more slowly over time (Stage 11.4).
- **Risk contribution far exceeds capital share.** Take a traditional portfolio with 10% volatility, bitcoin at 55% volatility, and a correlation of 0.3. A 5% bitcoin allocation raises portfolio volatility only from 10% to about 10.65%, **but bitcoin accounts for about 14% of the total risk**; at a 10% allocation it accounts for about a third. Size positions by risk, not by dollars.
- **Leverage turns volatility into ruin risk.** Put leverage on a highly volatile asset and a single deep dip along the way can liquidate you, even if the price ends higher. That is the “amplification” of Stage 16.4, and it's why treasury companies stress **liability structures with no margin calls** (Stage 18.2).

The new-era angle: bitcoin's volatility has itself become a raw material that can be sold. Option sellers and convertible-bond buyers are all pricing volatility — part of the reason Strategy's convertibles could be issued with low coupons is that investors value the high volatility of its stock (Stage 7.3, Stage 17.2). **Volatility is both a risk and a resource that financial engineering can use.**

The lesson in one sentence: **Bitcoin's annualized volatility has long been two to four times that of stocks, with 50–90% drawdowns every cycle; the four-year cycle has real evidence and real statistical traps; its correlation with stocks and gold drifts with the environment, with liquidity and real rates as the key backdrop; volatility is falling, but positions still have to be sized by risk.**
`,

  demo: "bitcoin-volatility",

  analogy: `
Picture bitcoin as **a small boat that is still growing**, floating on the sea of the macro economy.

A decade and more ago it was a rowboat, and a modest wave could toss it into the air and slam it down (annualized volatility above 100%). Then it grew into a fishing boat, then got a steel hull, and ETFs and institutions added ballast, so the waves rock it less violently. But it is still far smaller than the ocean liners of stocks and Treasuries, and a big storm can still cost it half its height.

The sea itself changes too. When central banks pump liquidity and rates fall, the water rises and every boat floats higher — the small boat highest of all. When rates rise and liquidity drains, the water drops and the small boat runs aground first (2022, 2026). And if the deck is crowded with passengers who borrowed to board (leverage), one wave throws a group overboard; the lightened boat lurches, throwing off more — that is a liquidation cascade.

As for the “great tide every four years” — old sailors swear a big tide always comes about a year and a half after each halving, and they've been right four times. Maybe the moon really does pull on it. Maybe everyone just raises sail at the same moment and lowers it at the same moment. The sensible approach: **remember the tides, but pack life jackets for storms**.
`,

  misconceptions: [
    "**“Bitcoin is a safe haven that rises in a crisis.”** — During the 2022 rate hikes and the April 2025 tariff shock, bitcoin fell alongside risk assets, and it was in a bear market when gold hit its 2026 record. It has shown safe-haven traits in some situations (such as fears about the banking system), but not reliably.",
    "**“The four-year cycle is a law — just trade around the halving dates.”** — There are only four observations, each halving's supply shock is smaller than the last, and the pattern may be self-fulfilling. The 2025 peak did land about 18 months after the halving, but no mechanism guarantees the next cycle will repeat it.",
    "**“Bitcoin's volatility has fallen to roughly stock-market levels.”** — Volatility has come down, but the 40–60% of 2023–2025 was still two to three times that of stocks, and the roughly −54% drawdown of 2025–26 shows the tail risk is still huge.",
    "**“A 5% bitcoin allocation means 5% of the risk.”** — Risk contribution depends on volatility and correlation. In a portfolio with 10% volatility, a 5% bitcoin position (55% volatility, 0.3 correlation) contributes about 14% of total risk; a 10% position contributes about a third.",
    "**“A higher average return always means more money in the long run.”** — Volatility drag makes the compounded return roughly the arithmetic return minus σ²/2. At 60% annualized volatility about 18 percentage points a year get eaten by the bumps; add leverage and a single deep dip along the way can knock you out entirely.",
  ],

  quiz: [
    {
      q: "Bitcoin's daily returns have a standard deviation of 3%. What is its annualized volatility, roughly?",
      options: [
        "About 3%",
        "About 36%",
        "About 57%",
        "About 1,095%",
      ],
      answer: 2,
      explain: "Bitcoin trades every day, so annualize with √365 ≈ 19.1: 3% × 19.1 ≈ **57%**. Stocks normally use √252.",
    },
    {
      q: "From the October 6, 2025 high of about $126,000 to about $58,000 in June 2026, what was the drawdown? And rising to about $84,000 afterward, how much did it bounce from the low?",
      options: [
        "About −54%; about +45%",
        "About −46%; about +54%",
        "About −33%; about +33%",
        "About −77%; about +100%",
      ],
      answer: 0,
      explain: "58/126 − 1 ≈ **−54%**; 84/58 − 1 ≈ **+45%**. Note that after a 54% fall you need a gain of about 117% just to get back to even — the asymmetry of drawdowns.",
    },
    {
      q: "Which is the strongest criticism of the “four-year cycle” story?",
      options: [
        "Halvings have never actually happened",
        "Bitcoin's price has never risen after a halving",
        "Cycle peaks always occur on the day of the halving",
        "There are only four observations, each halving's supply shock is smaller than the last, and the pattern may be self-fulfilling because people believe it",
      ],
      answer: 3,
      explain: "The 2024 halving cut annual new supply only from about 1.7% to about 0.8%, far less than the 2012 shock. **Small samples plus reflexivity** make the pattern a poor basis for trading.",
    },
    {
      q: "A traditional portfolio with 10% volatility adds a 5% bitcoin position (55% volatility, 0.3 correlation). Roughly what share of total risk does bitcoin contribute?",
      options: [
        "About 5%",
        "About 14%",
        "About 50%",
        "About 1%",
      ],
      answer: 1,
      explain: "Risk contribution = w × (w·σ₁² + (1−w)·ρ·σ₁·σ₂) ÷ σₚ² ≈ **14%**. A high-volatility asset's share of risk far exceeds its share of capital, so size positions by risk (Stage 11.1, Stage 11.4).",
    },
    {
      q: "As of September 2026, which set of macro conditions best explains bitcoin's bear-market backdrop?",
      options: [
        "Zero interest rates and large-scale QE",
        "A collapsing dollar and a crash in gold",
        "A Fed hike in September, a 30-year Treasury yield of about 5.5% and real yields above 2% — a higher opportunity cost of holding a zero-yield asset",
        "Simultaneous rate cuts by central banks worldwide",
      ],
      answer: 2,
      explain: "Idea ①: an asset without cash flows is especially sensitive to **real rates and liquidity**. But macro is only the backdrop: bitcoin kept falling even after the Fed ended QT in December 2025.",
    },
  ],

  further: [
    { label: "CoinDesk: The $19 billion liquidation that shook crypto (research on the October 10–11, 2025 event)", url: "https://www.coindesk.com/research/market-spotlight-the-19-billion-liquidation-that-shook-crypto" },
    { label: "CNBC: Bitcoin falls back under $60,000 (June 2026, a 21-month low)", url: "https://www.cnbc.com/2026/06/24/bitcoin-falls-back-under-60000-hitting-its-lowest-level-since-october-2024.html" },
    { label: "IMF Blog: Crypto Prices Move More in Sync With Stocks (2022, on rising crypto–equity correlation)", url: "https://www.imf.org/en/Blogs/Articles/2022/01/11/crypto-prices-move-more-in-sync-with-stocks-posing-new-risks" },
    { label: "FRED: 10-year TIPS real yield (DFII10)", url: "https://fred.stlouisfed.org/series/DFII10" },
  ],
};
