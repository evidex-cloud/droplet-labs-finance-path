export default {
  id: "leverage-coverage",
  stage: 6,
  order: 5,
  title: "Leverage & Coverage Ratios: How Much Borrowing Is Too Much",
  difficulty: "core",
  prereqs: ["capital-stack", "financial-statements"],

  oneLiner:
    "How much borrowing is too much? No single number answers that, but there are two families of rulers. **Leverage ratios** ask \"how much was borrowed\" (debt/equity, debt/EBITDA, loan-to-value). **Coverage ratios** ask \"can it be paid, and can the assets hold it up\" (interest coverage, fixed-charge coverage, asset coverage). Ordinary companies are measured on cash flow. But when the asset is **bitcoin, which produces no cash flow**, every cash-flow ratio breaks down and only asset coverage and months of reserve remain — which is exactly why Stage 16.5's BTC Rating and Stage 16.6's dividend coverage look the way they do.",

  intuition: `
When you apply for a mortgage, the bank asks you two questions.

1. **What is the house worth, and how much are you borrowing?** A $1 million house with an $800,000 loan has a **loan-to-value (LTV) of 80%.** The higher the LTV, the smaller the fall in house prices it takes before the house no longer covers the loan.
2. **How much do you earn each month, and what is the payment?** Earn $30,000 a month with a $10,000 payment and **your income covers the payment three times.** The lower that multiple, the smaller the dip in income it takes before you can't pay.

The first question is about **leverage**: how much of other people's money you are using. The second is about **coverage**: how thick your cushion is — either a cushion of assets or a cushion of income.

Companies are the same, just with more rulers. This lesson sits on **Idea ② (balance sheets & claims)** and **Idea ④ (risk & leverage)**. Stage 6.1's floor plan told you **who gets paid first**; this lesson tells you **how far each floor is from trouble.**

Take Maple Manufacturing from Stage 6.1: EBITDA (earnings before interest, taxes, depreciation and amortization) of $20M a year, $70M of debt, $4.5M of interest a year.

- **Debt / EBITDA = 3.5x**: using all its operating profit, it would take about three and a half years to pay off the debt.
- **Interest coverage = EBIT / interest = $15M / $4.5M ≈ 3.3x**: profit is more than three times the interest bill, so operating profit would have to fall about 70% before interest couldn't be paid.
- **Asset coverage**: $100M of assets against $70M of cumulative claims down through the subordinated notes gives about 1.43x — a 30% fall in asset value and the subordinated notes start losing.

These are the rulers for a **normal company**. They share one premise: the company has steady operating cash flow, and its assets are worth something because of that cash flow.

Now swap in Orange Corp from Stage 6.1. It has almost no operating profit, so EBITDA is close to zero. Its convertible pays a 0% coupon. It owes $15M a year in preferred dividends. Measure it with interest coverage and the numerator is zero — the company looks like it "can't pay anything." Yet its asset is $1 billion of bitcoin that can be partly sold at any moment, and only $300 million of claims sit on top of it.

**The cash-flow rulers break down completely here.** Only two still work. One is **asset coverage**: how many times the BTC NAV covers the cumulative claims (6.7x / 4.0x / 3.3x). The other is **liquidity coverage**: how many months of dividends the cash reserve can pay ($30M ÷ $15M × 12 = **24 months**). The first asks "will the building stand?"; the second asks "how long can it last without selling bitcoin or raising money?"

Stage 16.5's BTC Rating and Stage 16.6's months of dividend coverage are, at heart, this lesson's rulers renamed and bolted onto bitcoin. And the DeFi "health factor" of Stage 13.4 is LTV written into a smart contract — cross the line and liquidation happens automatically. **One set of rulers, three worlds.**

**In this lesson we break it into five pieces:**

- **① Three rulers for leverage: debt/equity, debt/EBITDA and LTV**
- **② Cash-flow coverage: interest coverage and fixed-charge coverage**
- **③ Asset coverage: how thick the cumulative cushion is**
- **④ When the asset is bitcoin: why cash-flow ratios break down**
- **⑤ Covenants, margin calls and tripwires: what happens when a line is crossed**
`,

  mechanics: `
### ① Three rulers for leverage: debt/equity, debt/EBITDA and LTV

Leverage measures "how much of other people's money is in use." The three common versions each look at a different side:

<table class="pm">
<tr><th>Ratio</th><th>Formula</th><th>Maple Manufacturing</th><th>What it asks</th></tr>
<tr><td><b>Debt / equity</b></td><td>Total debt ÷ shareholders' equity</td><td>$70M ÷ $20M = 3.5x</td><td>How many dollars of borrowing per dollar of own money?</td></tr>
<tr><td><b>Debt / EBITDA</b></td><td>Total (or net) debt ÷ annual EBITDA</td><td>$70M ÷ $20M = 3.5x</td><td>How many years of operating profit to repay the debt?</td></tr>
<tr><td><b>Loan-to-value (LTV)</b></td><td>Debt ÷ asset value</td><td>$70M ÷ $100M = 70%</td><td>How far can assets fall before the debt is no longer covered?</td></tr>
</table>

A few points to watch.

- **Debt / equity** is very sensitive to whether equity is measured at book or market value. When the share price soars, market-value leverage looks lower — even though not a dollar of debt has been repaid.
- **Debt / EBITDA** is the workhorse of credit analysis. A rough rule of thumb: investment-grade companies mostly sit below 3x, while high-yield (junk) companies often run at 4–6x or more — but industries differ enormously (utilities naturally run high, software companies low).
- **LTV** is the language of mortgages and secured lending: 80% for a home loan, 50% for a stock margin loan, liquidation thresholds of roughly 60–80% in DeFi lending (Stage 13.4). **LTV and asset coverage are reciprocals**: an LTV of 70% ⇔ coverage of 1.43x.

Also distinguish **gross debt** from **net debt** (debt minus cash). A company sitting on a lot of cash can have net leverage far below its gross leverage.

### ② Cash-flow coverage: interest coverage and fixed-charge coverage

Leverage asks "how much was borrowed"; coverage asks "can it be paid." The most basic ruler is the **interest coverage ratio**:

$$
Interest coverage = EBIT ÷ interest expense = $15M ÷ $4.5M ≈ 3.3x
(EBITDA ÷ interest is also common: $20M ÷ $4.5M ≈ 4.4x)
$$

But interest isn't the only money a company must pay. **Fixed-charge coverage** adds rent, preferred dividends and similar items. Preferred dividends need one technical adjustment: they are paid out of **after-tax** profit, so they must be converted to a "pre-tax equivalent" before being added to interest:

$$
Pre-tax equivalent of preferred dividends = dividends ÷ (1 − tax rate) = $0.8M ÷ (1 − 21%) ≈ $1.01M
Fixed-charge coverage = EBIT ÷ (interest + pre-tax preferred dividends) = $15M ÷ ($4.5M + $1.01M) ≈ 2.7x
$$

How to read it: **coverage of N means profit can fall by (1 − 1/N) before the payments can't be met.** 3.3x → profit can fall 70%; 2.7x → 63%. Counting the preferred dividend thins the cushion noticeably — a quantified version of Stage 6.2's point that preferred stock is a fixed cost.

The strength of cash-flow coverage is that it **measures the ability to keep going**: the company pays its bills out of what it earns without selling assets or borrowing more. Its weakness is **dependence on stable profits**: a cyclical company can show 8x coverage in a good year and less than 1x in a bad one.

### ③ Asset coverage: how thick the cumulative cushion is

Cash-flow coverage asks "can the interest be paid?" **Asset coverage** asks "if every asset were sold, would it repay the principal?" It must be computed **cumulatively, floor by floor** (the core reading from Stage 6.1):

$$
Asset coverage of floor k = asset value ÷ (sum of claims from floor 1 through floor k)
$$

For Maple Manufacturing ($100M of assets): secured loan 3.33x → senior bonds 1.82x → subordinated notes 1.43x → preferred 1.25x.

Asset coverage has a very intuitive translation: **coverage of N ⇔ assets can fall by (1 − 1/N) and this floor is still paid in full.**

<table class="pm">
<tr><th>Coverage</th><th>Maximum asset decline absorbed</th><th>Equivalent LTV</th></tr>
<tr><td>1.25x</td><td>20%</td><td>80% (typical mortgage)</td></tr>
<tr><td>2x</td><td>50%</td><td>50% (typical margin loan)</td></tr>
<tr><td>3.3x</td><td>70%</td><td>30%</td></tr>
<tr><td>4x</td><td>75%</td><td>25%</td></tr>
<tr><td>6.7x</td><td>85%</td><td>15%</td></tr>
</table>

Asset coverage assumes **the assets can actually be sold at their stated value.** Factories, inventory and goodwill often have to be heavily discounted in distress (Stage 6.6's recovery rates show by how much), so for an industrial company asset coverage is only a secondary ruler. **But if the asset trades around the clock with deep liquidity, asset coverage becomes the primary ruler** — which brings us to the next piece.

### ④ When the asset is bitcoin: why cash-flow ratios break down

Put Orange Corp against the same rulers:

<figure><svg viewBox="0 0 640 310" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Two ways to measure: Maple by cash flow, Orange Corp by assets</text><text x="160" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Maple: cash-flow coverage ($M a year)</text><line x1="40" y1="260" x2="290" y2="260" stroke="var(--line)"/><rect x="60" y="80" width="50" height="180" fill="var(--green)" opacity=".75"/><text x="85" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">EBIT 15</text><rect x="140" y="206" width="50" height="54" fill="var(--blue)" opacity=".75"/><text x="165" y="200" text-anchor="middle" font-size="11" fill="var(--ink)">interest 4.5</text><rect x="220" y="194" width="50" height="66" fill="var(--orange)" opacity=".75"/><text x="245" y="188" text-anchor="middle" font-size="11" fill="var(--ink)">+pref 5.5</text><text x="165" y="300" text-anchor="middle" font-size="11" fill="var(--green)" font-weight="600">interest cover 3.3x · fixed-charge 2.7x</text><line x1="320" y1="36" x2="320" y2="290" stroke="var(--line)" stroke-dasharray="3 3"/><text x="480" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Orange Corp: asset coverage ($M)</text><line x1="350" y1="260" x2="620" y2="260" stroke="var(--line)"/><rect x="380" y="60" width="70" height="200" fill="var(--btc-soft)" stroke="var(--btc)" stroke-width="2"/><text x="415" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="var(--btc)">BTC 1,000</text><line x1="372" y1="230" x2="510" y2="230" stroke="var(--blue)" stroke-width="1.5"/><text x="515" y="238" font-size="10" fill="var(--blue)">converts 150 → 6.7x</text><line x1="372" y1="210" x2="510" y2="210" stroke="var(--orange)" stroke-width="1.5"/><text x="515" y="217" font-size="10" fill="var(--orange-ink)">+F = 250 → 4.0x</text><line x1="372" y1="200" x2="510" y2="200" stroke="var(--red)" stroke-width="1.5"/><text x="515" y="197" font-size="10" fill="var(--red)">+D = 300 → 3.3x</text><rect x="462" y="200" width="40" height="60" fill="none" stroke="var(--red)" stroke-dasharray="4 3"/><text x="485" y="276" text-anchor="middle" font-size="10" fill="var(--red)">dashed box = after bitcoin −70%: assets 300 → D at 1.0x</text><text x="480" y="300" text-anchor="middle" font-size="11" fill="var(--btc)" font-weight="600">EBIT ≈ 0 → interest cover meaningless; reserve covers 24 months</text></svg><figcaption>The left-hand ruler asks "do earnings cover the payments?"; the right-hand one asks "can the assets hold up the claims above them?" For a company with no operating profit whose asset is bitcoin, only the right-hand ruler means anything — plus one more: "how many months will the reserve last?"</figcaption></figure>

Why do cash-flow ratios break down for a DAT?

- **Bitcoin produces no cash flow** (Stage 12.3). EBITDA is close to zero, so the denominators of interest coverage and debt/EBITDA are zero or negative, yielding "infinite leverage" — a number that is both correct and completely uninformative.
- **Accounting profit is swamped by the bitcoin price.** Under fair-value accounting (Stage 15.6), a good quarter for bitcoin makes net income explode and a bad one produces a huge loss. Compute coverage from that and it can leap from 50x to negative in a single quarter.
- **The payments never came from profit in the first place.** A DAT's dividends are funded mainly by raising capital (issuing common or preferred), by the cash reserve, and only as a last resort by selling bitcoin. So the questions that matter are: **how long will the reserve last, and how much can the assets hold up?**

A DAT's coverage toolkit therefore becomes a set of three:

$$
Asset coverage (the BTC Rating idea) = BTC NAV ÷ cumulative claims at that layer and above: 6.7x / 4.0x / 3.3x
Reserve coverage = USD reserve ÷ annual dividends and interest × 12 = $30M ÷ $15M × 12 = 24 months
Amplification = BTC NAV ÷ (BTC NAV − cumulative claims) = 10 ÷ 7 ≈ 1.43x
$$

And one fact specific to bitcoin: **its price can fall 70–80% within a year** (Stage 11.3, Stage 12.4). So a DAT's asset coverage must always be read **together with a stress test**. The F layer's 4x becomes 1.2x after a 70% fall in bitcoin; the D layer's 3.3x becomes exactly 1.0x. **Asset coverage is not a number; it is a line that slides with the bitcoin price** — Stage 16.5's demo lets you drag a bitcoin slider and watch it collapse.

### ⑤ Covenants, margin calls and tripwires: what happens when a line is crossed

The rulers themselves hurt no one. **What happens when a line is crossed** is what determines the risk. There are three mechanisms.

- **Maintenance covenants.** Bank loans often require something like "debt/EBITDA may not exceed 4x at any quarter-end." Breach it and the lender can demand early repayment or renegotiate — **the ruler is wired straight to a trigger.**
- **Incurrence covenants.** More common in corporate bonds. The ratio is tested only when the company **chooses to do something** (borrow more, pay dividends, make an acquisition). A deteriorating ratio doesn't by itself cause a default; it just stops the company from levering up further.
- **Margin calls.** Secured financing (stock-backed loans, bitcoin-backed loans, DeFi borrowing) requires more collateral once LTV crosses a line, or else the collateral is **force-sold.** This is the most dangerous kind: it makes you sell at the very moment prices are lowest, producing the liquidation cascades of Stage 7.5.

That explains a core choice in DAT capital structures. When bitcoin crashed in 2022, a subsidiary of Strategy (then called MicroStrategy) had a bank loan secured by bitcoin, and the market debated intensely whether its margin-call level would be hit; the loan was later repaid early, in 2023. Since then the company's funding has shifted mainly to **unsecured instruments with no margin calls**: convertibles, preferreds and common stock. **Their rulers (coverage, reserves) can deteriorate just the same, but the deterioration doesn't automatically pull a trigger** — nobody can force-sell the company's bitcoin just because the price fell 50%.

That doesn't mean there is no risk. Without a trigger, the risk changes shape: it becomes **time.** Coverage slowly thins, months of reserve slowly run down, maturity dates (on convertibles) and put dates slowly approach. Stage 16.6 and Stage 18.2 turn this "chronic" risk into stress tests. **The leverage hasn't gone away; it has changed from "hair trigger" to "slow squeeze."**
`,

  demo: "leverage-coverage",

  analogy: `
Think of leverage and coverage as **wading across a river with a backpack.**

**Leverage** is how heavy the backpack is — how much you've borrowed. **Coverage** is how far you are from drowning. You can measure that by your **strength** (can your income carry the monthly load? — cash-flow coverage) or by **how far the water is below your nose** (how far can assets fall before they're underwater? — asset coverage).

An ordinary salaried worker (an industrial company) relies mostly on strength: steady energy every day (cash flow), so even with a heavy pack, enough strength gets them across slowly.

A bitcoin treasury company is like someone **with no strength at all but extraordinarily tall**. They generate no energy of their own (no operating cash flow), but the water only reaches their waist (asset coverage of 3–7x). Asking "how many times the pack's weight can you carry?" is pointless — the answer is zero. The right questions are: **how fast is the water rising, and how many days of food are in their pockets (months of reserve)?**

One kind of wader is the most endangered: the one tied by a rope to a boulder on the bank, so that once the water passes chest height the rope drags them under. That rope is **the margin call.** DATs deliberately don't tie that rope. Their bet is that **as long as no rope drags them down, being tall enough and carrying enough food lets them wait for the water to recede.**
`,

  misconceptions: [
    "**\"Low leverage means safe.\"** — Low leverage on an asset that can fall 80% in a year can be more dangerous than high leverage on a stable one. You have to look at leverage, asset volatility and what happens when a line is crossed (margin calls? maturities?) together.",
    "**\"Interest coverage measures any company's ability to pay.\"** — Only for companies with steady operating cash flow. For a DAT, EBITDA is near zero and accounting profit is swamped by bitcoin's price, so interest coverage is either meaningless or wildly unstable; use asset coverage and months of reserve instead.",
    "**\"Asset coverage only needs the layer's own claim.\"** — It must be **cumulative** from the top down to that layer. Orange Corp's D layer is only $50M, but $250M sits above it; dividing by $300M gives the correct 3.3x.",
    "**\"3.3x coverage means very safe.\"** — 3.3x means a 70% fall in the assets reaches the line. For bitcoin, which has repeatedly drawn down 70–80%, 3.3x means \"can survive the bottom of a typical bear market,\" not \"nothing to worry about.\"",
    "**\"No margin calls means no leverage risk.\"** — Without a trigger, the risk becomes chronic: coverage thins, the reserve is consumed, maturities and put dates approach. The leverage hasn't disappeared; it has changed from a hair trigger to a slow squeeze.",
  ],

  quiz: [
    {
      q: "Maple Manufacturing has EBIT of $15M, interest of $4.5M, preferred dividends of $0.8M and a 21% tax rate. Roughly what is its fixed-charge coverage?",
      options: [
        "About 2.7x: $15M ÷ ($4.5M + $0.8M ÷ 0.79)",
        "About 3.3x: $15M ÷ $4.5M",
        "About 2.8x: $15M ÷ ($4.5M + $0.8M)",
        "About 18.8x: $15M ÷ $0.8M",
      ],
      answer: 0,
      explain: "Preferred dividends come out of after-tax profit, so convert them to a **pre-tax equivalent**: 0.8 ÷ 0.79 ≈ $1.01M. Add to interest: 15 ÷ 5.51 ≈ **2.7x**.",
    },
    {
      q: "A layer has asset coverage of 4x. By how much can the assets fall with this layer still paid in full?",
      options: [
        "25%",
        "40%",
        "75%: 1 − 1/4",
        "400%",
      ],
      answer: 2,
      explain: "Coverage of N ⇔ assets can fall **1 − 1/N**. 4x → 75%, equivalent to an LTV of 25%. That is Orange Corp's F layer.",
    },
    {
      q: "Why is interest coverage nearly meaningless for a DAT like Orange Corp?",
      options: [
        "Because DATs never pay interest or dividends",
        "Because bitcoin produces no operating cash flow, EBITDA is near zero, and payments come mainly from fundraising and reserves",
        "Because regulators forbid the calculation",
        "Because bitcoin's price is too stable",
      ],
      answer: 1,
      explain: "The numerator (operating profit) is near zero and accounting profit is swamped by bitcoin's price, so switch to **asset coverage** (can the assets hold the claims up?) and **reserve coverage** (how many months can it last?).",
    },
    {
      q: "Orange Corp has a $30M USD reserve and $15M a year in preferred dividends. How many months does the reserve cover?",
      options: [
        "6 months",
        "12 months",
        "36 months",
        "24 months",
      ],
      answer: 3,
      explain: "Reserve coverage = $30M ÷ $15M × 12 = **24 months**. It's one of Stage 16.6's core metrics: how long the company can last without raising money or selling bitcoin.",
    },
    {
      q: "Of maintenance covenants, incurrence covenants and margin calls, which is most likely to force a borrower to sell assets at the very bottom?",
      options: [
        "Incurrence covenants",
        "Maintenance covenants",
        "Margin calls",
        "All three are identical",
      ],
      answer: 2,
      explain: "**Margin calls** are wired directly to forced sales: cross the LTV line and you must post collateral or be liquidated, usually at the lowest prices. That is why DATs favor unsecured instruments with no margin calls.",
    },
  ],

  further: [
    { label: "Corporate Finance Institute: Leverage Ratios (overview)", url: "https://corporatefinanceinstitute.com/resources/accounting/leverage-ratios/" },
    { label: "Corporate Finance Institute: Fixed Charge Coverage Ratio", url: "https://corporatefinanceinstitute.com/resources/commercial-lending/fixed-charge-coverage-ratio/" },
    { label: "SEC Investor.gov: Margin accounts and margin calls", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/margin-account" },
    { label: "Strategy: BTC Rating, USD Reserve and other metrics (check the latest official disclosures)", url: "https://www.strategy.com/" },
  ],
};
