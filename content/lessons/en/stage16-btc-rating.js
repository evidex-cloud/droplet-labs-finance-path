export default {
  id: "btc-rating",
  stage: 16,
  order: 5,
  title: "BTC Rating & Asset Coverage: How Many Times Bitcoin Covers Each Layer",
  difficulty: "dat",
  prereqs: ["leverage-coverage", "capital-stack"],

  oneLiner:
    "A preferred holder's first question is: **how many times over does the company's bitcoin cover my layer, together with everyone ranked ahead of me?** That's Strategy's **BTC Rating**: \\(\\dfrac{\\text{BTC Reserve}}{\\text{the instrument's notional} + \\text{everything senior to it} + \\text{equal-ranking instruments that mature or can be put sooner}}\\). Orange Corp: converts 6.7x, Orange-F 4.0x, Orange-D 3.3x, with **BTC Floor Prices** of $15,000, $25,000 and $30,000. Then we go a step further, turning multiples into spreads with **BTC Risk** (the probability the rating is below 1 at the end of the duration) and **BTC Credit** (the spread needed to offset it) — and compare it with S&P ratings and bank LTVs: what it protects against and what it can't.",

  intuition: `
You lend a friend $250,000, secured on a house worth $1 million. You feel fairly safe: the house is worth **4 times** the loan, so it would have to fall **75%** before you lose money.

Now suppose the house already carries a $150,000 bank loan that gets paid before you, and your own loan is the next $100,000. Your real protection is \\(\\dfrac{\\$1{,}000{,}000}{\\$150{,}000 + \\$100{,}000} = \\mathbf{4}\\times\\). **Coverage is always cumulative: my layer plus everyone ranked ahead of me.** That's the asset coverage of Stage 6.5 and a direct application of the floor plan in Stage 6.1 (Idea ②).

Strategy turned this idea into a metric for preferred investors: the **BTC Rating**. It asks: how many times over does the company's bitcoin reserve cover this security, together with every security ranked ahead of it?

For Orange Corp from Stage 15.1 ($1.0B of bitcoin):

- **Convertibles** ($150M, most senior): \\(\\dfrac{10}{1.5} \\approx \\mathbf{6.7}\\times\\);
- **Orange-F** ($100M senior preferred): \\(\\dfrac{10}{1.5 + 1} = \\mathbf{4.0}\\times\\);
- **Orange-D** ($50M junior preferred): \\(\\dfrac{10}{1.5 + 1 + 0.5} \\approx \\mathbf{3.3}\\times\\).

A multiple translates directly into a price: the **BTC Floor Price**, the bitcoin price at which the rating is exactly 1.0x. For Orange-F that's \\(\\dfrac{\\$100{,}000}{4.0} = \\mathbf{\\$25{,}000}\\): at that price the company's coins just cover the converts and the F layer. Orange-D's floor is about **$30,000**.

It sounds safe — bitcoin must fall 70% before the D layer touches its floor. But this lesson pushes the multiple two steps further:

- **Price eats the multiple.** Coverage is computed at today's price. If bitcoin falls 70%, the F layer's 4.0x becomes **1.2x**. For an asset that has drawn down 70%–80% several times (Stage 11.3), 4x isn't "bulletproof"; it's "can survive one typical bear-market bottom".
- **Multiples must become probabilities, and probabilities spreads.** A perpetual preferred cares less about "how many times covered today" than about "how likely is coverage to fall below 1x over the years I hold it". Strategy uses a lognormal model to compute **BTC Risk** (the probability the rating is below 1 at the end of the duration) and converts it into **BTC Credit** (the spread needed to offset that risk). With the _fin.js formulas we can **reproduce** Strategy's published 108 bp for STRF and 59 bp for STRC.

The lesson rests mainly on **Idea ② (balance sheets and claims)** and **Idea ④ (risk and leverage)**. It is the flip side of Stage 16.4's amplification — the common sees amplification, the preferreds see coverage — and it carries the credit spreads of Stage 4.6 (\\(\\text{expected loss} = \\text{probability of default} \\times \\text{loss given default}\\)) over to a bitcoin asset. Later, Stage 17.6 walks bitcoin down to see what each layer actually recovers, and Stage 18.2 puts it into a stress test. This lesson explains mechanics and analytical frameworks only; it is not investment advice.

**This lesson, in five parts:**

- **① The definition: BTC Rating is cumulative by layer**
- **② Orange Corp's rating ladder and BTC Floor Prices**
- **③ From multiples to spreads: BTC Risk, duration and BTC Credit**
- **④ Real values: Strategy's credit dashboard**
- **⑤ What it protects against and what it can't: vs credit ratings and LTV**
`,

  mechanics: `
### ① The definition: BTC Rating is cumulative by layer

Strategy's definition of BTC Rating (for a given debt or preferred instrument):

$$ \\text{BTC Rating} = \\frac{\\text{BTC Reserve}}{\\text{cumulative claims}}
$$ \\begin{aligned} \\text{cumulative claims} &= \\text{the instrument's notional} + \\text{notional of all instruments senior to it} \\\\ &\\quad + \\text{equal-ranking instruments that mature or can be put sooner} \\end{aligned}

where \\(\\text{BTC Reserve} = \\text{bitcoin held} \\times \\text{bitcoin price}\\). Strategy also states that BTC Rating "does not represent a rating from any rating agency".

Three details make it a correct coverage measure:

- **Cumulative.** The denominator includes every senior layer. Counting only the layer itself wildly overstates safety: Orange-D is only $50M, which would be 20x on its own — but $250M sits ahead of it.
- **Equal-ranking but earlier-maturing.** Within the same rank, whoever matures or can put first gets paid first, so they belong in the denominator of the later ones.
- **It's a special case of coverageByLayer in _fin.js**: the asset is bitcoin at market value, and the layers follow the official seniority order.

Two equivalent readings:

$$ \\text{Room to fall} = 1 - \\frac{1}{\\text{BTC Rating}}
$$ \\text{Equivalent loan-to-value}\\ (\\mathrm{LTV}) = \\frac{1}{\\text{BTC Rating}}

\\(4.0\\times \\iff \\text{assets can fall } 75\\% \\iff \\mathrm{LTV} = 25\\%\\).

### ② Orange Corp's rating ladder and BTC Floor Prices

$$ \\text{BTC Floor Price} = \\frac{\\text{current bitcoin price}}{\\text{BTC Rating}}

<table class="pm">
<tr><th>Layer (senior to junior)</th><th>Notional</th><th>Cumulative claims</th><th>BTC Rating</th><th>BTC Floor Price</th><th>Bitcoin can fall</th></tr>
<tr><td>Convertibles (0% coupon)</td><td>$150M</td><td>$150M</td><td><b>6.7x</b></td><td>$15,000</td><td>85%</td></tr>
<tr><td>Orange-F (10% cumulative, senior)</td><td>$100M</td><td>$250M</td><td><b>4.0x</b></td><td>$25,000</td><td>75%</td></tr>
<tr><td>Orange-D (10% non-cumulative, junior)</td><td>$50M</td><td>$300M</td><td><b>3.3x</b></td><td>$30,000</td><td>70%</td></tr>
</table>

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Orange Corp's coverage ladder: $1.0B of bitcoin vs cumulative claims</text><line x1="40" y1="250" x2="620" y2="250" stroke="var(--line)"/><rect x="60" y="50" width="90" height="200" fill="var(--btc-soft)" stroke="var(--btc)" stroke-width="2"/><text x="105" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--btc)">BTC $1.0B (at $100k)</text><rect x="60" y="190" width="90" height="60" fill="none" stroke="var(--red)" stroke-width="1.5" stroke-dasharray="5 3"/><text x="105" y="184" text-anchor="middle" font-size="10" fill="var(--red)">After −70%: $300M</text><rect x="230" y="220" width="70" height="30" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="265" y="239" text-anchor="middle" font-size="11" fill="var(--ink)">Converts 150</text><rect x="330" y="200" width="70" height="50" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="365" y="214" text-anchor="middle" font-size="10" fill="var(--ink)">+F 100</text><text x="365" y="239" text-anchor="middle" font-size="10" fill="var(--muted)">cum. 250</text><rect x="430" y="190" width="70" height="60" fill="var(--red-soft)" stroke="var(--red)"/><text x="465" y="204" text-anchor="middle" font-size="10" fill="var(--ink)">+D 50</text><text x="465" y="239" text-anchor="middle" font-size="10" fill="var(--muted)">cum. 300</text><text x="265" y="212" text-anchor="middle" font-size="12" font-weight="700" fill="var(--blue)">6.7x</text><text x="365" y="192" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">4.0x</text><text x="465" y="182" text-anchor="middle" font-size="12" font-weight="700" fill="var(--red)">3.3x</text><text x="265" y="268" text-anchor="middle" font-size="10" fill="var(--ink)">floor $15k</text><text x="365" y="268" text-anchor="middle" font-size="10" fill="var(--ink)">floor $25k</text><text x="465" y="268" text-anchor="middle" font-size="10" fill="var(--ink)">floor $30k</text><text x="560" y="120" text-anchor="middle" font-size="11" fill="var(--ink)">Bitcoin −70%:</text><text x="560" y="138" text-anchor="middle" font-size="11" fill="var(--ink)">converts 2.0x</text><text x="560" y="156" text-anchor="middle" font-size="11" fill="var(--orange-ink)">F layer 1.2x</text><text x="560" y="174" text-anchor="middle" font-size="11" fill="var(--red)">D layer 1.0x</text><text x="320" y="286" text-anchor="middle" font-size="10" fill="var(--muted)">$ millions; bar heights proportional to amounts ($100M = 20 px)</text></svg><figcaption>The same $1.0B of bitcoin covers each more junior layer more thinly. After a 70% fall (the dashed red box is $300M), the F layer drops from 4.0x to 1.2x and the D layer sits exactly at 1.0x — on its floor.</figcaption></figure>

**One definitional detail:** Strategy's own calculation bridge (August 2026 briefing) **nets USD Assets against debt**. If Orange Corp also offset its $30M of cash against the converts, the denominators would become $120M, $220M and $270M, the ratings 8.3x, 4.5x and 3.7x, and the floor prices about $12,000, $22,000 and $27,000. This course's text uses the un-netted 6.7 / 4.0 / 3.3x throughout; the demo lets you toggle.

### ③ From multiples to spreads: BTC Risk, duration and BTC Credit

A multiple is a snapshot of today. A perpetual preferred holder needs to ask: **over my duration, how likely is coverage to fall below 1x, and how much extra return compensates for that?** Strategy chains three metrics to answer:

- **Duration.** Macaulay duration for preferreds; for convertibles, the time to the sooner of maturity or put. A perpetual preferred trading at par with dividend rate \\(y\\) and annual payments has Macaulay duration \\(\\dfrac{1 + y}{y}\\): \\(y = 10\\% \\to \\mathbf{11}\\ \\text{years}\\) (Stage 4.4: a perpetual's duration is roughly \\(1/y\\)). Strategy reported STRC's duration as **8.1 years** (2026-08-23).
- **BTC Risk.** Under a lognormal bitcoin price model (with an assumed annual return, "ARR", and volatility), the **probability that the instrument's BTC Rating is below 1x at the end of its duration**. The August 2026 briefing assumed 10% ARR and 40% volatility; December 2025 assumed 10% and 45%.
- **BTC Credit.** "the credit spread necessary to offset BTC Risk":

$$ \\text{BTC Risk} = N\\!\\left( \\frac{\\ln(1/R) - \\left(\\mu - \\frac{\\sigma^{2}}{2}\\right) T}{\\sigma \\sqrt{T}} \\right)
$$ \\text{BTC Credit} = \\frac{-\\ln(1 - \\text{BTC Risk})}{\\text{duration}}

where \\(R\\) is the BTC Rating, \\(\\mu\\) the assumed return, \\(\\sigma\\) the volatility, \\(T\\) the duration and \\(N(\\cdot)\\) the standard normal distribution (btcRiskProb and btcCredit in _fin.js). The intuition for BTC Credit: if at the end you lose everything with probability BTC Risk and otherwise get paid in full, then an extra annual spread \\(s\\) with \\(e^{-sT} = 1 - \\text{BTC Risk}\\) breaks even — a continuous-time version of Stage 4.6's "spread compensates expected loss", with zero recovery assumed, which is conservative.

**Orange Corp, worked** (10% ARR, 40% volatility):

<table class="pm">
<tr><th>Layer</th><th>BTC Rating</th><th>Duration (assumed)</th><th>BTC Risk</th><th>BTC Credit</th></tr>
<tr><td>Convertibles</td><td>6.7x</td><td>5 years (to put)</td><td>about 1.3%</td><td>about 26 bp</td></tr>
<tr><td>Orange-F</td><td>4.0x</td><td>11 years</td><td>about 11.3%</td><td>about 109 bp</td></tr>
<tr><td>Orange-D</td><td>3.3x</td><td>11 years</td><td>about 14.2%</td><td>about 139 bp</td></tr>
</table>

**Checking against Strategy's published numbers** (treating the ARR directly as the model's drift μ):

- STRF, 2025-11-28: rating 6.2x, duration 11.1 years, 45% volatility → we get BTC Risk of about 11.4% and BTC Credit of about 109 bp; Strategy published BTC Risk of 11.30% and BTC Credit of **108 bp**. Plugging its 11.30% straight in: \\(\\dfrac{-\\ln(0.887)}{11.1} \\approx 1.08\\%\\) — **an exact match**.
- STRC, 2026-08-23: rating 5.74x, duration 8.1 years, 40% volatility → we get BTC Credit of about **59 bp**; Strategy published **59 bp**.

That the model reproduces shows the formula is transparent — but **the conclusion depends entirely on the assumptions**. Cut the ARR from 10% to 0%, or lift volatility from 40% to 60%, and BTC Risk multiplies (try it in the demo).

### ④ Real values: Strategy's credit dashboard

Strategy's full table from 2025-11-28 (bitcoin assumed at $91,000):

<table class="pm">
<tr><th>Instrument</th><th>Notional</th><th>BTC Rating</th><th>BTC Credit</th></tr>
<tr><td>Debt (convertibles etc.)</td><td>$8,214M</td><td>7.2x</td><td>5 bp</td></tr>
<tr><td>STRF</td><td>$1,268M</td><td>6.2x</td><td>108 bp</td></tr>
<tr><td>STRC</td><td>$2,959M</td><td>4.8x</td><td>149 bp</td></tr>
<tr><td>STRE</td><td>$900M</td><td>4.4x</td><td>164 bp</td></tr>
<tr><td>STRK</td><td>$1,397M</td><td>4.0x</td><td>178 bp</td></tr>
<tr><td>STRD</td><td>$1,255M</td><td>3.7x</td><td>209 bp</td></tr>
</table>

The official seniority is: debt and subsidiary liabilities > STRF > STRC > STRE, STRK, STRD (junior preferreds) > MSTR common. **The relative ranking of STRE, STRK and STRD among themselves isn't confirmed in any primary text**; the table follows Strategy's own cumulative ordering, which implies STRE → STRK → STRD for the calculation.

August 2026: STRC's BTC Rating was **4.0x** on 2026-08-10 and **5.7x** on 2026-08-23. The latter's bridge ($ billions; bitcoin at $77,004) and the matching **BTC Floor Price**:

$$
\\text{BTC Rating}_{\\text{STRC}} = \\frac{64.718}{\\underbrace{6.714}_{\\text{debt}} - \\underbrace{6.69}_{\\text{USD Assets}} + \\underbrace{1.284}_{\\text{STRF}} + \\underbrace{9.972}_{\\text{STRC}}} = \\frac{64.718}{11.28} \\approx 5.74\\times
\\text{BTC Floor Price} = \\frac{\\$77{,}004}{5.74} \\approx \\mathbf{\\$13{,}400}
$$

BTC Credit fell from 112 bp to **59 bp**. The jump from 4.0x to 5.7x in two weeks came mainly from a surge in USD Assets (a $5.10B USD Reserve plus a new $1.59B USD Cash pool), which the bridge nets against debt. STRK and STRD stood at **3.4x** and **3.2x** on 2026-08-07.

In December 2025 Strategy also used some terms it later retired — for example "BTC Base Level" (the bitcoin price at which holdings equal debt principal less cash; $10,400 at the time) and "Loan to Value" (\\(\\text{net debt} \\div \\text{BTC Reserve}\\); 11% then). You'll meet them in older material.

### ⑤ What it protects against and what it can't: vs credit ratings and LTV

<table class="pm">
<tr><th></th><th>BTC Rating</th><th>S&P credit rating</th><th>Bank / DeFi LTV</th></tr>
<tr><td>What it looks at</td><td>Bitcoin market value as a multiple of cumulative claims</td><td>A judgement on business, cash flow, liquidity, governance and capital structure</td><td>\\(\\dfrac{\\text{loan}}{\\text{collateral}}\\)</td></tr>
<tr><td>Strategy example</td><td>STRC 5.7x (2026-08-23)</td><td>Issuer rating 'B-' (assigned 2025-10-27, affirmed December 2025, outlook stable)</td><td>\\(4.0\\times \\iff \\mathrm{LTV} = 25\\%\\)</td></tr>
<tr><td>What happens past the line</td><td>Nothing automatic: preferreds are unsecured with no margin calls</td><td>A downgrade raises funding costs</td><td>Margin call or automatic liquidation (Stage 7.5, Stage 13.4)</td></tr>
</table>

S&P rates Strategy B- (speculative grade), noting the USD Reserve is "a credit positive" but the business is narrow with little operating cash flow. **A 5.7x BTC Rating and a B- from S&P don't contradict each other**: one measures only asset coverage; the other also weighs cash flow and refinancing ability.

BTC Rating **can** tell you how thick a layer's cushion is in a gradual decline, how it thins when new senior layers are issued, and how safe series are relative to one another.

It **can't** protect against:

- **Gaps and tail risk.** A lognormal model understates bitcoin's fat tails, and volatility isn't constant.
- **Liquidation discounts.** 846,000 BTC (2026-09-20) can't all be sold at the screen price at once; realised value in a wind-down would be below "BTC Reserve".
- **Dividends eroding the numerator.** If interest and dividends are paid by selling coins, the numerator shrinks every year. Strategy's **BTC Floor ARR** — the lowest constant annual return over the weighted-average duration that still keeps 1.0x coverage after paying interest and dividends — was **−15.64%** on 2026-08-23; that's the version with this effect built in (Stage 16.6).
- **New senior layers.** More STRF (senior to STRC) directly lowers the rating of STRC and everything below it.
- **Legal reality.** Preferreds are perpetual equity, not debt: no collateral, no maturity. However low coverage falls, holders can't force the company to do anything (Stage 17.6, Stage 18.2).
- **Ability to pay ≠ asset coverage.** 5x coverage doesn't guarantee next month's dividend; that depends on where the cash comes from (Stage 16.6).

**Bottom line: BTC Rating is Stage 6.5's asset coverage fitted to bitcoin and expressed in the credit-spread language of Stage 4.6.** It's transparent and reproducible, but everything hinges on the bitcoin price and the model's assumptions. When you read it, read three things alongside: the assumed ARR and volatility, whether USD assets are netted, and who ranks ahead. This lesson explains mechanics and analytical frameworks only; it is not investment advice.
`,

  demo: "btc-rating",

  analogy: `
Picture a **multi-storey car park** built on a single foundation: bitcoin. Each floor holds one class of creditor — converts on the first floor, F preferreds on the second, D preferreds on the third — and the common shareholders are up on the open roof.

**BTC Rating** asks: how many times over can the foundation carry the weight of this floor plus all the floors beneath it? First floor 6.7x, second 4.0x, third 3.3x — the higher you go, the more cumulative weight, the less margin.

**BTC Floor Price** asks: how far can the foundation sink before this floor starts to hang in mid-air? For the third floor, a 70% subsidence.

**BTC Risk** asks: over the building's service life (the duration), how likely is the foundation to sink below that line? That depends on what you assume about the ground — bitcoin's return and volatility. **BTC Credit** is the insurance premium: the extra annual "rent" you'd need for carrying that chance.

Remember two quirks of this building. Every year the residents dig a little soil out of the foundation to pay the rent (dividends). And there's no automatic evacuation system: if the foundation sinks to the danger line, nobody forces anyone out — everyone just waits.
`,

  misconceptions: [
    "**\"A 4.0x BTC Rating is like an AA credit rating — very safe.\"** — It isn't a rating from any agency; it's an asset-coverage multiple. A 70% bitcoin fall turns 4.0x into 1.2x. Over the same period S&P rated Strategy's issuer credit B-.",
    "**\"To measure coverage you only need the layer's own notional.\"** — You must add every senior layer. Orange-D alone would be 20x; cumulatively it's 3.3x.",
    "**\"BTC Credit is the spread Strategy actually pays.\"** — It's a model output, the spread needed to offset BTC Risk, and it depends on the ARR and volatility assumptions and assumes zero recovery. Actual spreads are set by market prices and can differ a lot.",
    "**\"If coverage drops below 1x, preferred holders can seize the bitcoin.\"** — Preferreds are unsecured and perpetual, with no margin-call or forced-liquidation rights. Coverage describes what would theoretically be recovered in a wind-down; it grants no trigger.",
    "**\"New preferred issuance doesn't affect existing preferreds' ratings.\"** — If the new instrument ranks ahead (say, more STRF), every junior layer's denominator grows and its rating falls; even at equal rank, it matters for later-maturing instruments.",
  ],

  quiz: [
    {
      q: "Orange Corp has $1.0B of bitcoin; converts $150M > Orange-F $100M > Orange-D $50M. What is Orange-F's BTC Rating?",
      options: [
        "10x",
        "6.7x",
        "4.0x",
        "3.3x",
      ],
      answer: 2,
      explain: "Cumulatively: \\(\\dfrac{10}{1.5 + 1} = \\mathbf{4.0}\\times\\). 6.7x is the convert layer, 3.3x the D layer, and 10x is the wrong, layer-only calculation.",
    },
    {
      q: "At a $100,000 bitcoin price Orange-F's BTC Rating is 4.0x. What is its BTC Floor Price?",
      options: [
        "$40,000",
        "$25,000",
        "$75,000",
        "$10,000",
      ],
      answer: 1,
      explain: "\\(\\text{Floor} = \\dfrac{\\text{price}}{\\text{rating}} = \\dfrac{\\$100{,}000}{4.0} = \\mathbf{\\$25{,}000}\\): after a 75% fall the F layer is covered exactly 1x.",
    },
    {
      q: "A preferred has BTC Risk of 10% and a duration of 10 years. Using Strategy's formula, roughly what is its BTC Credit?",
      options: [
        "About 105 bp",
        "About 10 bp",
        "About 1,000 bp",
        "About 50 bp",
      ],
      answer: 0,
      explain: "\\(\\text{BTC Credit} = \\dfrac{-\\ln(1 - 0.10)}{10} = \\dfrac{0.1054}{10} \\approx \\mathbf{1.05\\%}\\), about 105 bp.",
    },
    {
      q: "Between 2026-08-10 and 08-23 STRC's BTC Rating rose from 4.0x to 5.7x. According to Strategy's bridge, what mainly drove it?",
      options: [
        "Bitcoin doubled",
        "All STRF was redeemed",
        "S&P upgraded the company",
        "A surge in USD Assets, netted against debt in the bridge, shrank STRC's cumulative denominator",
      ],
      answer: 3,
      explain: "The bridge: \\(\\dfrac{64.718}{6.714 - \\mathbf{6.69} + 1.284 + 9.972} \\approx 5.74\\times\\). The $5.10B USD Reserve plus $1.59B USD Cash offset almost all the debt.",
    },
    {
      q: "Which of these risks does BTC Rating **not** capture?",
      options: [
        "New senior instruments diluting coverage",
        "A falling bitcoin price reducing coverage",
        "The discount from being unable to sell huge amounts of bitcoin at the screen price, and the preferreds' lack of any margin-call or liquidation right",
        "Equal-ranking instruments that mature earlier getting paid first",
      ],
      answer: 2,
      explain: "The other three are built into the definition or the calculation. **Liquidation discounts** and the **absence of legal triggers** aren't in the multiple: it's computed at screen prices and gives holders no enforcement rights.",
    },
  ],

  further: [
    { label: "Strategy 2025 Company Update deck (2025-12-01): full BTC Rating and BTC Credit table", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312525303157/d69948dex992.htm" },
    { label: "Strategy investor briefing FWP, 2026-08-24 (STRC BTC Rating, floor price, BTC Risk assumptions)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strategy: credit dashboard (always check the latest disclosure)", url: "https://www.strategy.com/" },
    { label: "Report on S&P affirming Strategy's B- rating (2025-12-16)", url: "https://www.investing.com/news/stock-market-news/strategy-inc-maintains-b-rating-from-sp-global-outlook-stable-93CH-4411504" },
  ],
};
