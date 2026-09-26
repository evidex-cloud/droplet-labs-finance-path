export default {
  id: "valuing-btc-preferreds",
  stage: 18,
  order: 1,
  title: "Valuing a Bitcoin-Backed Preferred: Yield, Spread, Duration, Calls & Credit",
  difficulty: "dat",
  prereqs: ["preferred-terms", "duration-convexity", "long-bond-30y", "btc-rating", "strc-variable-rate"],

  oneLiner:
    "A perpetual preferred with a $100 stated amount and a 10% dividend trades at $92. Bargain or trap? An analyst measures it with five rulers: **yield** (what you collect), **spread** (how much more than Treasuries, and why), **duration** (how far it falls when rates move), **calls** (who caps your upside) and **credit** (how far bitcoin must fall before it really matters). This lesson applies all five to Orange Corp and to Strategy's STRC, and answers Lin's first headline: why a 30-year Treasury yield near 5.5% lands squarely on perpetual preferreds.",

  intuition: `
Stage 18 closes the focus tier of the course. We have learned what a DAT is (Stage 15), how to measure one (Stage 16) and which tools it uses to raise money (Stage 17). Now change hats: **you are the analyst.** On your desk is a bitcoin-backed preferred, and your boss asks two questions: "What is this worth? Where is the risk?"

Start with a concrete security. Orange Corp has issued a senior preferred, **Orange-F**: a $100 stated amount, a $10 annual dividend (10%), **cumulative**, and **perpetual**, meaning it never matures. Today it trades at **$92.17**.

A complete beginner would ask three questions, and those three questions happen to be the entire skeleton of fixed-income analysis:

1. **What do I collect?** $10 a year on a $92.17 purchase price is a yield of about 10.85%. This is the perpetuity from Stage 2.3: price = dividend ÷ yield, so yield = dividend ÷ price.
2. **Is that yield high or low?** Only relative to something else. On September 25, 2026 the 30-year US Treasury yielded about **5.49%** (Treasury par yield curve). Orange-F pays roughly 5.4 percentage points more. That extra is the **spread**, and the spread is the market's price quote for whatever risk you are actually taking.
3. **What makes it fall?** Two things. **Rates**: when Treasury yields rise, every fixed-income claim is repriced (Idea ①). And **credit**: bitcoin crashes and the company struggles to pay dividends (Ideas ② and ④).

The heart of this lesson is one sentence: **a bitcoin-backed preferred is simultaneously a long-duration rate product and a credit product whose collateral is bitcoin.** The two risks can arrive at the same moment, and in 2026 they did. The 30-year yield climbed from about 4.64% on February 27 to about 5.5% in late September; bitcoin fell from its all-time high of about $126,000 in October 2025 to about $58,000 at the end of June 2026.

Here is the most direct number. If Orange-F's required yield rises in step with Treasuries by 0.85 percentage points, from 10% to 10.85%, its price drops from $100 to **$92.17, a 7.8% loss**. Its credit risk has not changed at all; only the price of time has. That is the first thread connecting Lin's first headline (the 30-year Treasury yield breaking above 5%) to the third (Strategy selling bitcoin-backed preferreds yielding around 10%).

The lesson rests on three of the course's ideas. **Idea ① (the price of time)**: a perpetual preferred is a perpetuity, and perpetuities are highly rate-sensitive. **Idea ② (balance sheets and claims)**: it sits behind all the debt and ahead of the common, occupying one floor of the capital stack (Stage 6.1, Stage 17.6). **Idea ④ (risk and leverage)**: its credit quality depends on how many times one highly volatile asset, bitcoin, covers it (Stage 16.5).

**This lesson explains mechanisms and analytical frameworks only; it is not investment advice.** We will not say whether any security is worth buying. We will teach you how to measure one. The rest of the stage builds on this: Stage 18.2 puts the whole balance sheet through a stress test, and Stage 18.6 folds every ruler into a single checklist.

**In this lesson we break it into five pieces:**

- **① Yield: current yield, what "perpetual" means, and effective yield**
- **② Spread: what the extra points over Treasuries are paying for**
- **③ Duration: why perpetual preferreds fear the 30-year Treasury**
- **④ Calls and convexity: upside with a lid on it**
- **⑤ Credit: pricing "default" with BTC Rating and BTC Credit**
`,

  mechanics: `
### ① Yield: current yield, what "perpetual" means, and effective yield

**Current yield** = annual dividend ÷ market price. For Orange-F: 10 ÷ 92.17 = **10.85%**.

For a perpetual preferred with **no maturity and no call that is likely to be exercised**, current yield is also its yield to maturity, because the perpetuity formula from Stage 2.3, P = D ÷ y, can simply be turned around:

$$
Price P = annual dividend D ÷ required yield y
Yield y = D ÷ P
Orange-F: y = 10 ÷ 92.17 = 10.85%
If the market wants 9.5%: P = 10 ÷ 0.095 = $105.26
$$

A real-world case: Strategy's **STRC** closed around $96.18 on 2026-08-21. Its dividend rate was then 12.00%, or $12 a year per $100 of stated amount, paid as $0.50 twice a month since June 30, 2026. Its **effective yield was 12 ÷ 96.18 ≈ 12.48%** (Strategy investor briefing FWP, 2026-08-24).

Three details decide whether two people quoting a preferred's yield are even talking about the same thing:

- **Stated rate versus effective yield.** "A 10% preferred" describes the dividend on the stated amount. You don't pay the stated amount, so you don't earn 10%.
- **Payment frequency.** Paying $2.50 a quarter and paying twice a month produce slightly different annualized yields because compounding differs. Strategy has proposed moving STRF, STRC, STRK and STRD to **daily** record dates (a special meeting votes on 2026-10-28), and Strive's SATA has paid a slice of its dividend every business day since 2026-06-15.
- **Cumulative or not.** STRF, STRC, STRE, STRK and SATA are **cumulative**: skipped dividends accrue as arrears and compound at a higher rate. STRD is **non-cumulative**: a skipped dividend is gone forever (Stage 6.3). Same issuer, same 10% coupon, but the non-cumulative one ought to demand a higher yield.

Here are the main terms of Strategy's series as of September 2026 (from the 10-K and prospectuses). Differences in their yields start with these terms:

<table class="pm">
<tr><th>Series</th><th>Dividend rate</th><th>Cumulative</th><th>Official ranking</th><th>Notable terms</th></tr>
<tr><td>STRF</td><td>10% fixed</td><td>Yes</td><td>Highest-ranking preferred</td><td>Board-seat right if dividends are missed</td></tr>
<tr><td>STRC</td><td>Variable, 12.00% from 2026-07-01</td><td>Yes</td><td>Behind STRF</td><td>Issuer may redeem at any time at $101</td></tr>
<tr><td>STRE</td><td>10% fixed (euro)</td><td>Yes</td><td>Junior preferred</td><td>Euro-denominated, listed in Luxembourg</td></tr>
<tr><td>STRK</td><td>8% fixed</td><td>Yes</td><td>Junior preferred</td><td>Converts into 0.1 MSTR share</td></tr>
<tr><td>STRD</td><td>10% fixed</td><td><b>No</b></td><td>Junior preferred</td><td>Skipped dividends are never made up</td></tr>
</table>

(Our fact sheet found no primary text ranking STRE, STRK and STRD against each other. Only this much is confirmed: all three sit behind STRF and STRC and ahead of the common.)

### ② Spread: what the extra points over Treasuries are paying for

Stage 2.4 put it plainly: **required return = risk-free rate + risk premia.** Take STRC's 12.48% apart:

$$
12.48% (STRC effective yield, 2026-08-21)
= about 5.5% (the 30-year Treasury, the late-September 2026 anchor)
+ about 7.0 percentage points (the spread)
The spread covers: expected credit loss + subordination/equity-like premium + liquidity premium + model-uncertainty premium
$$

What are those seven points paying for? One piece at a time:

- **Expected credit loss** (Stage 4.6: expected loss = probability of default × loss given default). For a DAT preferred, "default" does not mean failing to repay principal, since a perpetual has no principal to repay. It means **skipping dividends**, or ultimately failing to recover the stated amount in a liquidation.
- **Subordination and equity-like status.** A preferred ranks behind every piece of debt, and a skipped dividend **is not a default**: holders cannot drag the company into bankruptcy court (Stage 6.2). You own a weaker promise than a bondholder does.
- **Liquidity.** A preferred with a few billion dollars outstanding trades far less than Treasuries. When you want to sell, which tends to be when everyone else does, the bid can be thin.
- **Model uncertainty.** Bitcoin has a little over a decade of price history. Nobody truly knows how fat its tails are.

For reference: in normal years, investment-grade corporate bonds tend to yield roughly 1 to 2 percentage points over comparable Treasuries, and high-yield bonds roughly 3 to 6 (historical orders of magnitude, not live 2026 data). On 2025-10-27, S&P assigned Strategy an **issuer** rating of **B-**, toward the lower end of high yield; we found no separate S&P rating on its preferreds. Under general agency practice, preferreds usually sit several notches below the same issuer's senior debt.

So a seven-point spread is not outlandish in itself. **What is interesting is the gap between it and the company's own model.** In the same briefing, Strategy put STRC's **BTC Credit at just 59 basis points** (0.59 percentage points; see ⑤). The market demands about 700 basis points; the model says 59 is enough. There are two readings:

- **The bull reading.** This is a brand-new asset class, which Strategy calls "digital credit," and most fixed-income buyers have not yet learned how to price bitcoin coverage. **Spreads will tighten as understanding catches up**, and that is precisely the opportunity.
- **The bear reading.** The model's assumptions (10% annual bitcoin growth, 40% volatility, a lognormal distribution) are too gentle. The real danger is not whether coverage is below 1x at the end of the horizon but what happens **along the way**: bitcoin crashes, capital markets close at the same time, dividends get paid by selling coins, and preferred holders have no collateral. The 700 basis points buy protection against everything the model leaves out.

### ③ Duration: why perpetual preferreds fear the 30-year Treasury

Stage 4.4 gave a rule of thumb: **the modified duration of a perpetuity is about 1 ÷ y.** Run the shared engine's bondRisk on a 10% quarterly-pay preferred, approximating "perpetual" as 200 years: modified duration **10.0**, convexity about 200. The comparison is the course's standard example, the 5%-coupon 30-year Treasury, with a modified duration of about **15.5**.

<table class="pm">
<tr><th>Instrument</th><th>Yield</th><th>Modified duration</th><th>Price after +0.85 points</th></tr>
<tr><td>30-year Treasury (5% coupon)</td><td>5.00% → 5.85%</td><td>about 15.5</td><td>100 → 88.05 (−12.0%)</td></tr>
<tr><td>Orange-F (10% perpetual)</td><td>10.00% → 10.85%</td><td>about 10.0</td><td>100 → 92.17 (−7.8%)</td></tr>
<tr><td>A hypothetical 5% perpetual</td><td>5.00% → 5.85%</td><td>about 20.0</td><td>100 → 85.47 (−14.5%)</td></tr>
</table>

Two counterintuitive conclusions follow:

1. **A high dividend actually shortens duration.** The 10% perpetual is "shorter" than the 30-year Treasury because more of its value arrives as large dividends in the early years. So "perpetual means infinite duration" is wrong; duration is roughly 1 ÷ yield. **STRC, yielding 12.48%, has a Macaulay duration of about 8.05 years.** Strategy's own briefing reports STRC's Duration as **8.1 years**, calculated exactly this way.
2. **It is still a long-duration asset.** A duration of 8 to 10 means every 1-point rise in yield costs roughly 8% to 10% of price.

Now connect Lin's first headline (Stage 4.5). On February 27, 2026, the day before the US/Israel–Iran war began, the 30-year Treasury sat at its low for the year, about **4.64%**. By September 24–25 it had reached about **5.47%–5.49%**, the highest since 2004, and the Fed had raised rates by 25 basis points on September 16 to 3.75%–4.00%, its first hike since 2023 (macro fact sheet). **If a 10% perpetual preferred keeps a constant spread, its required yield moves up about 0.85 points and its price falls about 7.8%.** That is before any widening of the spread itself, which tends to happen exactly when investors turn risk-averse.

Rising rates hit preferreds a second way, through **competition**. When a 30-year Treasury pays 5.5% and money-market funds pay above 4%, a junior perpetual from a B- issuer paying only five-odd points more loses appeal for income buyers. The issuer must either raise the dividend or accept a lower issue price. STRC's rate climbed from 9.00% at launch in July 2025 to 12.00% from July 1, 2026, and that path reflects both credit concerns and this rate backdrop.

**What does a variable rate change?** As Stage 17.4 explained, STRC is designed to have its dividend adjusted monthly so its price stays near $100. If the company always reset the rate promptly, STRC's **rate duration** would be close to zero, like a floating-rate note. Two caveats matter. First, the reset is a **management decision**, not a formula. The new policy of June 29, 2026 said explicitly that the company "will not necessarily increase" the rate just because STRC trades below its stated amount, and made buybacks below par the main tool instead. Second, the contract limits only **cuts** (no more than 25 basis points plus the fall in SOFR each month, never below one-month SOFR); **nothing requires an increase.** Under stress, STRC can therefore behave more like a fixed-rate perpetual, and Strategy's "Duration 8.1 years" becomes the real horizon over which you bear both rate and credit risk.

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="160" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Yield decomposition (STRC, Aug–Sep 2026)</text><rect x="90" y="153" width="140" height="89" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="160" y="192" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">30-year Treasury</text><text x="160" y="208" text-anchor="middle" font-size="11" fill="var(--muted)">about 5.5%</text><rect x="90" y="143" width="140" height="10" fill="var(--green-soft)" stroke="var(--green)"/><text x="236" y="152" font-size="10" fill="var(--green)">model 0.59%</text><rect x="90" y="40" width="140" height="103" fill="var(--btc-soft)" stroke="var(--btc)" stroke-dasharray="4 3"/><text x="160" y="84" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Unexplained by model</text><text x="160" y="100" text-anchor="middle" font-size="10" fill="var(--muted)">about 6.4 points</text><text x="160" y="114" text-anchor="middle" font-size="10" fill="var(--muted)">subordination · liquidity · tails</text><line x1="86" y1="40" x2="70" y2="40" stroke="var(--muted)"/><line x1="70" y1="40" x2="70" y2="242" stroke="var(--muted)"/><line x1="86" y1="242" x2="70" y2="242" stroke="var(--muted)"/><text x="62" y="140" text-anchor="end" font-size="11" font-weight="700" fill="var(--orange-ink)">12.48%</text><text x="160" y="266" text-anchor="middle" font-size="10" fill="var(--muted)">effective yield = 12 ÷ 96.18</text><text x="480" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Price = 10 ÷ y (Orange-F, 10% perpetual)</text><line x1="340" y1="250" x2="620" y2="250" stroke="var(--line)"/><line x1="340" y1="40" x2="340" y2="250" stroke="var(--line)"/><polyline points="340,56 368,89 396,115 424,135 452,152 480,165 508,177 536,187 564,196 592,204 620,210" fill="none" stroke="var(--orange)" stroke-width="2.5"/><line x1="340" y1="135" x2="620" y2="135" stroke="var(--red)" stroke-dasharray="5 4"/><text x="616" y="128" text-anchor="end" font-size="10" fill="var(--red)">call caps the price (illustrative: $100)</text><circle cx="424" cy="135" r="4" fill="var(--orange-ink)"/><circle cx="448" cy="149" r="4" fill="var(--btc)"/><circle cx="356" cy="222" r="4" fill="var(--orange-ink)"/><text x="364" y="226" font-size="10" fill="var(--orange-ink)">y 10% → $100</text><circle cx="356" cy="240" r="4" fill="var(--btc)"/><text x="364" y="244" font-size="10" fill="var(--btc)">y 10.85% → $92.17</text><text x="480" y="270" text-anchor="middle" font-size="10" fill="var(--muted)">required yield y: 7% → 17%</text><text x="330" y="60" text-anchor="end" font-size="10" fill="var(--muted)">143</text><text x="330" y="210" text-anchor="end" font-size="10" fill="var(--muted)">59</text></svg><figcaption>Left: of a spread of about seven points, the company's model (BTC Credit) explains only a sliver. Right: a perpetual preferred's price is a downward-bending curve; each 1-point rise in yield costs about 1/y, while a call cuts off the gain when yields fall.</figcaption></figure>

### ④ Calls and convexity: upside with a lid on it

A perpetuity's price curve is **convex** (Stage 4.4). Cut Orange-F's required yield by 1 point and its price rises 11.1% (to $111.11); raise it by 1 point and the price falls only 9.1% (to $90.91). Convexity works in the holder's favor, **unless the issuer holds a call.**

A call lets the issuer take the security back at the call price whenever it trades above that price. The result: **when yields fall, your price can't rise past the call; when yields rise, you fall in full.** That is **negative convexity**, the same thing a mortgage lender faces when borrowers refinance.

- **STRC**: the company may redeem it **at any time** at $101 plus accrued dividends, provided a partial redemption leaves at least $250 million outstanding. STRC's price is therefore effectively capped around $101, which is part of its "aim at $100" design.
- **SATA** (Strive): optional redemption at $110 or more.
- **STRF, STRE, STRK, STRD**: according to our fact sheet, they carry only a clean-up call (if fewer than 25% of the original shares remain) and a tax-event call, **with no general call at will.** That leaves their upside more open, and makes their true duration closer to a pure perpetual.

A full numerical example. Suppose Orange-F becomes callable at $100 from year 5 and trades today at $108.

$$
Current yield = 10 ÷ 108 = 9.26%
Yield to call (redeemed at $100 in 5 years, quarterly) = 8.04%
Yield to worst = the lower of the two = 8.04%
$$

When the price is above the call price, **compare using yield to worst** and don't be seduced by current yield. When the price is below par (say $92), a call is almost irrelevant and the 10.85% perpetual yield is the right ruler.

One Strategy-specific clause deserves a note. The **liquidation preference** of STRF, STRC, STRE and STRD "generally approximates to the greater of the trading price … or $100" (STRK was amended in 2025 to float the same way, ratified on 2026-06-08). If one of them trades at $106, its claim in a liquidation is also about $106, and every layer below it, including the common, gives up a little more.

### ⑤ Credit: pricing "default" with BTC Rating and BTC Credit

Traditional credit analysis looks at cash flow (interest coverage, Stage 6.5). A DAT generates little operating cash, so the analysis switches to **asset coverage** (Stage 16.5):

$$
BTC Rating = BTC Reserve ÷ (this instrument's notional + everything ranked ahead of it)
BTC Floor Price = current bitcoin price ÷ BTC Rating
BTC Risk = probability that BTC Rating is below 1 at the end of the duration (lognormal model)
BTC Credit = −ln(1 − BTC Risk) ÷ duration
$$

**Orange Corp.** The BTC Reserve is $1 billion; convertibles of $150 million plus Orange-F's $100 million make $250 million, so Orange-F's BTC Rating is **4.0x** and its floor price is 100,000 ÷ 4 = **$25,000**. Assume bitcoin grows 10% a year with 40% volatility and a duration of 10 years (1 ÷ 10%). The shared engine's btcRiskProb gives a BTC Risk of about **10.5%** and a BTC Credit of about **111 basis points**. The junior Orange-D (3.3x, floor price $30,000) comes out at about 13.4% and **143 basis points**.

**Calibrating the engine against real data.** Strategy's STRF on 2025-11-28 had a BTC Rating of 6.2x, a duration of 11.1 years, and assumed volatility of 45% with 10% growth. We compute a BTC Risk of about 11.4% and a BTC Credit of about **109 basis points**; Strategy reported 11.30% and **108 basis points**. For STRC on 2026-08-23, with a BTC Rating of 5.74x ($64.8 billion of reserve over $11.28 billion, with USD assets netted against debt), a duration of 8.1 years and 40% volatility, we compute about 4.7% and **59 basis points**, matching the published figure.

What is good about this model, and what is weak?

- **Good.** It turns "how far and how fast would bitcoin have to fall?" into a comparable number that updates daily with the bitcoin price. STRC's BTC Credit was 112 basis points on 2026-08-10 and 59 on 2026-08-23: bitcoin rose, USD assets grew, and coverage thickened.
- **Weakness 1: extreme sensitivity to assumptions.** For the same 4.0x Orange-F, raising volatility from 40% to 60% lifts BTC Credit from 111 to about **476 basis points**. Changing assumed growth from 10% to 0% also worsens the result sharply.
- **Weakness 2: it checks the endpoint, not the path.** It asks whether coverage is below 1x at the end of the duration, not whether there is cash to pay dividends along the way. Yet a skipped dividend is the first bad thing a preferred holder meets, and that is governed by the USD Reserve and the Breakeven ARR (Stage 18.2).
- **Weakness 3: preferreds have no collateral.** Strategy states that no bitcoin is pledged to its preferreds. "5.7x coverage" is liquidation arithmetic, not a lien you hold.

**The analyst's five questions** (the checklist in Stage 18.6 reuses them): What is the yield, and at what price? How much over the 30-year Treasury? What is the duration, and how much would another 1-point rise in rates cost? Could a call cap the upside? What is the BTC Rating, where is the floor price, and under which volatility assumption does it still hold? **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "valuing-btc-preferreds",

  analogy: `
Think of a bitcoin-backed perpetual preferred as **a shop unit in an apartment block built into the side of a hill.**

The unit pays you fixed rent every year (the dividend). **Yield** is the rent divided by what you paid for the unit.

**Spread** is why you didn't buy a unit in the government building next door (Treasuries). The government building pays less rent but never misses a payment. This block pays more because it stands on a hill that moves, and the hill is bitcoin.

**Duration** is how much your unit's resale price changes when rents across the whole city change. When the city's benchmark rent (the 30-year Treasury) goes up, every unit let at the old rent is worth less. Units with higher rent (a bigger dividend) lose a little less, because you got more of your money back in the early years, but they still lose.

**The call** is a right the landlord kept: once your unit is worth more than a certain price, the landlord can buy it back at that price. In good times your unit can't rise above that line; in bad times it falls all the way.

**Credit** is the height of the hill. How many floors sit below you with a prior claim (the debt and the more senior preferreds), and how much of the hill must collapse before the landslide reaches your unit (the BTC Rating and floor price)? A geological survey (the BTC Credit model) says a landslide is very unlikely. The market still insists on much higher rent, because nobody has yet seen this hill's worst collapse.
`,

  misconceptions: [
    "**\"A perpetual never matures, so its duration is infinite and any rate move wrecks it.\"** — A perpetuity's modified duration is roughly 1 ÷ yield. A 10% perpetual comes in around 10, shorter than the 5%-coupon 30-year Treasury (about 15.5). Highly sensitive, but not infinitely so.",
    "**\"The coupon says 10%, so I earn 10%.\"** — You earn the dividend divided by the price you pay. Buy at $92.17 and the yield is 10.85%; buy at $108 with a call at $100 and the number that counts is yield to worst (about 8.04%).",
    "**\"STRC has a variable rate, so rising rates can't hurt it.\"** — Only if the company promptly resets the rate each month so the price returns to $100. Resetting is a management decision, and the June 2026 policy said explicitly it would not raise the rate just because STRC traded below par. Under stress it behaves more like a fixed-rate perpetual.",
    "**\"A 5.7x BTC Rating means there is almost no risk.\"** — Coverage is liquidation arithmetic. It does not guarantee cash for dividends along the way, preferreds have no collateral, and BTC Credit is extremely sensitive to its volatility and growth assumptions (40% → 60% volatility moves 111 to 476 basis points).",
    "**\"A wide spread means it's cheap.\"** — A spread is the market's price for risk. It may be an opportunity (a new asset class not yet understood) or a correct price (the model misses tails and liquidity). The analyst's job is to say what the spread is paying for, not just how big it is.",
  ],

  quiz: [
    {
      q: "Orange-F pays $10 a year, is perpetual and is not about to be called. If the market's required yield rises from 10% to 10.85%, roughly what is its price?",
      options: ["$100.00", "$108.50", "$92.17", "$85.47"],
      answer: 2,
      explain: "**Perpetuity: P = D ÷ y = 10 ÷ 0.1085 ≈ $92.17**, a drop of about 7.8%. $85.47 is what a 5% perpetual (duration about 20) would fetch after the same shock.",
    },
    {
      q: "Why is the modified duration of a 10% perpetual preferred (about 10) shorter than that of a 5%-coupon 30-year Treasury (about 15.5)?",
      options: [
        "Because preferreds can be sold at any time",
        "Because a perpetuity's duration is roughly 1 ÷ yield; the higher the yield, the more its value sits in near-term cash flows",
        "Because preferreds are unaffected by interest rates",
        "Because Treasuries are tax-exempt",
      ],
      answer: 1,
      explain: "**Perpetual duration ≈ 1 ÷ y.** 10% gives about 10 years; STRC at 12.48% gives a Macaulay duration of about 8.05 years, matching the 8.1-year Duration Strategy publishes.",
    },
    {
      q: "Orange-F trades at $108 and is callable at $100 from year 5. Current yield is 9.26%; yield to call is 8.04%. Which number should you use to compare it?",
      options: [
        "8.04% (yield to worst)",
        "9.26% (current yield)",
        "10% (the stated dividend rate)",
        "The average of the two, 8.65%",
      ],
      answer: 0,
      explain: "Above the call price, the issuer is likely to call, so **yield to worst** is the conservative and honest ruler.",
    },
    {
      q: "On 2026-08-23 Strategy put STRC's BTC Credit at 59 basis points, while STRC's effective yield of about 12.48% was roughly 7 points above the 30-year Treasury. Which explanation for the gap holds up LEAST?",
      options: [
        "The model checks coverage only at the end of the horizon, not whether dividends can be paid along the way",
        "Preferreds rank behind debt, have no collateral, and a skipped dividend is not a default",
        "The market's understanding of a new asset class has not yet caught up",
        "STRC pays its dividends in bitcoin, so holders need extra compensation",
      ],
      answer: 3,
      explain: "STRC pays its dividends in **cash** (fact sheet). The other three are all reasonable sources of the gap between spread and model: one from the bulls, two from the bears.",
    },
    {
      q: "Between February 27 and late September 2026, the 30-year Treasury yield rose from about 4.64% to about 5.5%. For a 10% fixed-rate perpetual preferred whose spread stays constant, what is the most direct effect?",
      options: [
        "None, because its dividend is fixed",
        "Its price rises, because new preferreds will carry higher dividends",
        "Only a fall in bitcoin could affect it",
        "Its required yield moves up about 0.85 points and its price falls about 7.8%",
      ],
      answer: 3,
      explain: "**Idea ①: when rates move, every asset is repriced.** The fixed dividend is precisely why it falls: new money can now earn more elsewhere.",
    },
  ],

  further: [
    { label: "Strategy investor briefing FWP (2026-08-24): STRC's BTC Rating, BTC Credit, Duration and effective yield", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "STRC prospectus supplement (July 2025): variable dividend, redemption and cumulative terms", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312525165531/d852456d424b5.htm" },
    { label: "US Treasury daily par yield curve (the official source for the 30-year yield)", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026" },
    { label: "FRED: 30-year Treasury yield (DGS30) history", url: "https://fred.stlouisfed.org/series/DGS30" },
    { label: "Strive SATA IPO announcement: variable-rate rules, $110 call and cumulative terms", url: "https://www.globenewswire.com/news-release/2025/11/03/3179290/0/en/Strive-Announces-Proposed-Initial-Public-Offering-of-SATA-Stock.html" },
  ],
};
