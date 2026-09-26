export default {
  id: "strc-variable-rate",
  stage: 17,
  order: 4,
  title: "STRC & Variable-Rate Perpetual Preferreds: Engineering Short-Duration Bitcoin Credit",
  difficulty: "dat",
  prereqs: ["duration-convexity", "strategy-preferreds"],

  oneLiner:
    "A 12% fixed-rate perpetual preferred has a modified duration of about 8 years: rates up one point, price down about 8%. STRC's design idea is to **reset the dividend rate every month to pull the price back toward $100**, shifting most of the interest-rate risk onto the issuer and handing investors \"short-duration\" bitcoin credit. Its rate has climbed from 9.00% in July 2025 to **12.00%** from July 2026, its payments have gone from monthly to twice a month and may go daily. This lesson takes apart the contract rules, management's rate-setting framework, the 2026 policy shift, and the ways it is **not** a money fund.",

  intuition: `
Go back to Stage 4.4: duration measures how much a price moves for a one-point change in rates. For a perpetual fixed-rate security, modified duration is roughly \\(\\dfrac{1}{\\text{yield}}\\), about \\(\\dfrac{1}{0.12} \\approx \\mathbf{8.3}\\) years at a 12% yield. By September 2026 the US 30-year Treasury yield had climbed to about 5.5%, well above where it stood a year earlier. If the yield investors demand on this kind of credit rose from 12% to 13%, a 12% fixed perpetual preferred would fall from $100 to about **$92**.

STRC tries to do something different. Its dividend rate isn't fixed; it **can be reset every month**:

- Price falls below par → raise the rate → new buyers get a higher yield → the price is pulled back toward 100.
- Price rises above par → cut the rate (or issue more, or call at $101) → the price comes back down.

It works like a **thermostat**: when the room gets cold, turn up the heat; when it's too warm, turn it down. As long as the thermostat is reliable, the room's temperature (the price) stays near $100, and **the interest-rate risk investors carry is largely stripped out; the duration has been "engineered away."** It is the mirror image of the bank in Stage 10.3 (Silicon Valley Bank). SVB locked its money into long-duration bonds and was sunk when rates rose; STRC is designed so that **rate moves don't build up in the price**.

But the thermostat depends on two things. First, **the issuer has to be willing to adjust**: a higher rate means paying more in dividends every year. Second, **the issuer has to be able to adjust**: if the problem isn't rising rates but investors worrying that bitcoin has fallen and the company can't afford its dividends (credit risk), pulling the price back to par might take a very high rate. When bitcoin fell to around $58,000 in June 2026, STRC slipped below par too. Strategy's answer wasn't to raise the rate without limit. Instead, **on June 29, 2026 it changed the policy**: it lifted the rate to 12% and held it there, and turned to **buybacks below par** to support the price.

This lesson sits on **Idea ① (the price of time)**: a variable rate re-prices "the price of time" every month, squeezing duration from 8 years to about a month. It also sits on **Idea ④ (risk and leverage)**: the interest-rate risk has been removed, but the credit risk, which here means bitcoin risk, is still there and has become the main event. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**

**In this lesson we break it into five pieces:**

- **① Why a variable rate: squeezing duration from 8 years to one month**
- **② The hard rules in the contract: cut limits, the SOFR floor and the $101 call**
- **③ Management's rate-setting framework: from "watch the price" to "watch everything"**
- **④ Rate history and price history: 9.00% to 12.00%, monthly to semi-monthly to daily**
- **⑤ It is not a money fund: against T-bills, money funds and credit**
`,

  mechanics: `
### ① Why a variable rate: squeezing duration from 8 years to one month

The price of a perpetual is \\(\\text{price} = \\dfrac{\\text{annual dividend}}{\\text{required yield}}\\) (the perpetuity of Stage 2.3). With a fixed rate the dividend never changes, so every move in the required yield moves the price:

<table class="pm">
<tr><th>Required yield</th><th>12% fixed perpetual (per $100 stated)</th><th>Idealized monthly reset (rate moves to market next month)</th></tr>
<tr><td>11%</td><td>about $109.1</td><td>about $100.1 (but capped by the $101 call)</td></tr>
<tr><td>12%</td><td>$100.0</td><td>$100.0</td></tr>
<tr><td>13%</td><td>about $92.3</td><td>about $99.9</td></tr>
<tr><td>15%</td><td>$80.0</td><td>about $99.8</td></tr>
</table>

$$
\\text{fixed perpetual:}\\ \\text{price} = \\frac{100 \\times \\text{dividend rate}}{\\text{required yield}}
\\text{modified duration} \\approx \\frac{1}{\\text{yield}} = \\frac{1}{12\\%} \\approx 8.3\\ \\text{years}
\\text{idealized monthly reset:}\\ \\text{price} \\approx 100 \\times \\left(1 + \\frac{\\text{dividend rate} - \\text{required yield}}{12}\\right)
\\text{effective duration} \\approx \\text{one month}
$$

That is "engineered short duration." It **moves the interest-rate risk from the investor to the issuer**: when the required yield rises, the issuer pays more dividends each year instead of the investor's principal shrinking. In the language of Stage 4.3, STRC ties itself to the **left end** of the yield curve (the short end, one-month SOFR) rather than to long-term rates on the right.

One number is easy to confuse. In its credit dashboard Strategy lists STRC with a "Duration" of 8.1 years (August 23, 2026). That is the Macaulay duration the company uses in its BTC Risk model, a measure of how long the cash flows stretch out, used to estimate how long bitcoin must maintain coverage. It is **not** an effective duration in the sense of interest-rate sensitivity. The two "durations" answer two different questions: one asks "how long is my money committed," the other asks "how much does the price move when rates move."

### ② The hard rules in the contract: cut limits, the SOFR floor and the $101 call

Under STRC's terms (the July 2025 424B5 prospectus supplement), rate changes are subject to these **contractual limits**:

<table class="pm">
<tr><th>Rule</th><th>What it says</th><th>What it does</th></tr>
<tr><td>Reset frequency</td><td>The company may change the rate by giving notice before each monthly period; without notice, the old rate carries over</td><td>Fixes the repricing cycle at about one month</td></tr>
<tr><td>Cap on cuts</td><td>A monthly cut may not exceed 25 bp plus any decline in one-month SOFR over the prior period</td><td>Protects holders: the rate can only drift down slowly</td></tr>
<tr><td>Rate floor</td><td>The rate may not be cut below one-month SOFR</td><td>Keeps the dividend at least at a proxy for the short risk-free rate</td></tr>
<tr><td>No cuts in arrears</td><td>No cuts while any dividends are unpaid</td><td>Prevents "cutting the price while still owing money"</td></tr>
<tr><td>Cap on increases</td><td>None</td><td>The issuer can raise the rate freely: the "heating" side of the thermostat</td></tr>
<tr><td>Issuer call</td><td>Redeemable at any time at $101 (or more) plus accrued dividends; a partial redemption must leave at least $250M outstanding</td><td>Puts a "ceiling" of about $101 on the price</td></tr>
<tr><td>Cumulative</td><td>Yes; unpaid dividends compound at the applicable rate</td><td>Skipped dividends become arrears ranking ahead of every junior security (Stage 6.3)</td></tr>
</table>

The rules are **asymmetric**: there's no limit on going up and a limit on going down. For investors that means yields drift down slowly in good times and can jump quickly in bad times, provided the issuer chooses to raise them.

### ③ Management's rate-setting framework: from "watch the price" to "watch everything"

The contract says how the rate **can** move, not how it **will**. That comes from management's public framework, and the framework changed in 2026.

**The October 2025 framework** (Q3 2025 earnings release) keyed off the five-day volume-weighted average price (VWAP) before month-end:

<table class="pm">
<tr><th>STRC 5-day VWAP</th><th>Recommended change</th></tr>
<tr><td>Below $95</td><td>+50 bp or more</td></tr>
<tr><td>$95–98.99</td><td>+25 bp or more</td></tr>
<tr><td>$99–100.99</td><td>No change expected (discretionary ±25 bp)</td></tr>
<tr><td>$101 and above</td><td>−25 bp (more if SOFR fell) and/or a follow-on offering</td></tr>
</table>

That is a pure thermostat: **watch the price, set the rate**.

**The revised policy of June 29, 2026** (the "Digital Credit Capital Framework" 8-K) evaluates the rate monthly using STRC's trading levels, market yields, credit spreads, bitcoin's price and volatility, USD Reserve coverage, market conditions and the capital structure, and says explicitly that the company "will not necessarily increase the STRC dividend rate solely because STRC trades below its stated amount." Below par, the main tool became **buybacks**. The same day, STRC's rate was raised to **12.00% from July 1, 2026**.

**The August 31, 2026 statement:** management will recommend keeping the rate at 12.00% "until STRC has demonstrated sustained, healthy trading near $100 per share"; the stated objective is STRC trading at $99–100.

Why the shift? A thermostat only handles the weather. If the walls have cracked (credit worries), turning up the heat just gets more and more expensive. Bitcoin fell from its roughly $126,000 high on October 6, 2025 to a close of about $58,600 on June 30, 2026, down about 54%. The extra yield investors wanted by then was mostly pricing **bitcoin risk**, not interest rates. Each 25 bp increase costs about \\(0.25\\% \\times \\$10\\text{B} = \\$25\\text{M}\\) a year in extra dividends on roughly $10 billion of notional. Buying back a $100-stated, 12% security at $86–95, by contrast, retires a slice of funding cost at an effective "yield" of about 12.6% to 14% (\\(\\dfrac{12}{95} \\approx 12.6\\%\\), \\(\\dfrac{12}{86} \\approx 14\\%\\)) while putting a bid under the price. **The first buybacks in July 2026 were 288,930 shares at an average of about $86.52; by September 20, 2026 they totalled about $1.125 billion**, and the authorization had been raised from $1.0 billion to $2.0 billion.

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">STRC's thermostat: price ↔ dividend rate (and its limits)</text><rect x="235" y="36" width="170" height="48" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="320" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Price falls below $99</text><text x="320" y="72" text-anchor="middle" font-size="10" fill="var(--muted)">(5-day VWAP before month-end)</text><rect x="440" y="112" width="170" height="48" rx="8" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="525" y="132" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Raise the dividend rate</text><text x="525" y="148" text-anchor="middle" font-size="10" fill="var(--muted)">+25 to +50 bp (2025 framework)</text><rect x="235" y="188" width="170" height="48" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="320" y="208" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Real yield rises</text><text x="320" y="224" text-anchor="middle" font-size="10" fill="var(--muted)">new buyers step in</text><rect x="30" y="112" width="170" height="48" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="115" y="132" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Price back near $100</text><text x="115" y="148" text-anchor="middle" font-size="10" fill="var(--muted)">target $99–100</text><path d="M405 60 Q500 62 520 108" fill="none" stroke="var(--muted)" stroke-width="1.5"/><polygon points="516,106 521,112 524,104" fill="var(--muted)"/><path d="M525 160 Q520 205 409 212" fill="none" stroke="var(--muted)" stroke-width="1.5"/><polygon points="411,208 405,212 411,216" fill="var(--muted)"/><path d="M235 212 Q130 208 118 164" fill="none" stroke="var(--muted)" stroke-width="1.5"/><polygon points="114,166 118,160 122,166" fill="var(--muted)"/><path d="M115 112 Q125 62 231 60" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 3"/><polygon points="229,56 235,60 229,64" fill="var(--muted)"/><text x="320" y="130" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Thermostat</text><text x="320" y="147" text-anchor="middle" font-size="10" fill="var(--muted)">price back at 100 → rate stops moving</text><rect x="16" y="250" width="300" height="44" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="26" y="268" font-size="10" fill="var(--ink)">Price ≥ $101: may cut (≤ 25 bp + SOFR decline a month,</text><text x="26" y="284" font-size="10" fill="var(--ink)">never below SOFR), issue more, or call at $101</text><rect x="324" y="250" width="300" height="44" rx="6" fill="var(--red-soft)" stroke="var(--red)"/><text x="334" y="268" font-size="10" fill="var(--ink)">Credit shock: since 2026-06-29, no raise "solely" for</text><text x="334" y="284" font-size="10" fill="var(--ink)">trading below par; buybacks instead (~$1.125B by 9/20)</text></svg><figcaption>Against rate moves the thermostat works well. Against a credit (bitcoin) shock, pulling the price back to par could take a very high rate, so in June 2026 Strategy switched to "hold 12% plus buybacks below par."</figcaption></figure>

### ④ Rate history and price history: 9.00% to 12.00%, monthly to semi-monthly to daily

Implied from per-share dividends (half-monthly after June 30, 2026) and cross-checked against company filings:

$$
\\text{one month's dividend} = \\frac{\\$100 \\times \\text{annual rate}}{12}
\\text{each half-month's dividend} = \\frac{\\$100 \\times \\text{annual rate}}{24}
$$

<table class="pm">
<tr><th>Period</th><th>Annual rate</th><th>Evidence</th></tr>
<tr><td>Launch (2025-07-29) to August 2025</td><td>9.00%</td><td>$0.80 stub for August; 424B5</td></tr>
<tr><td>September 2025</td><td>10.00%</td><td>$0.8333</td></tr>
<tr><td>October 2025</td><td>10.25%</td><td>$0.8542</td></tr>
<tr><td>November 2025</td><td>10.50%</td><td>$0.875; Q3 2025 release</td></tr>
<tr><td>December 2025</td><td>10.75%</td><td>$0.8958; 10-K</td></tr>
<tr><td>January 2026</td><td>11.00%</td><td>$0.9167; 10-K</td></tr>
<tr><td>February 2026</td><td>11.25%</td><td>$0.9375; 10-K</td></tr>
<tr><td>March–June 2026</td><td>11.50%</td><td>$0.9583 a month; 10-Q</td></tr>
<tr><td>From 2026-07-01</td><td><b>12.00%</b></td><td>$0.50 per half-month; 8-K 2026-06-29</td></tr>
<tr><td>Latest declared (record 2026-09-30, paid 2026-10-15)</td><td><b>12.00%</b></td><td>8-K 2026-09-01</td></tr>
</table>

In a little over a year the rate rose 300 basis points, while the federal funds range fell and then rose again (three cuts from September to December 2025 to 3.50–3.75%, then a hike back to 3.75–4.00% on September 16, 2026). **STRC's rate increase had almost nothing to do with the short risk-free rate; nearly all of it was a rising credit (bitcoin) risk premium.**

The payment cycle has shortened too. At launch it paid monthly. After approval at the June 8, 2026 annual meeting, it has paid **twice a month since June 30, 2026** (record dates on the 15th and the last day of each month), $0.50 each time. On September 24–25, 2026 the company proposed moving to **daily** record dates, with a vote at a special meeting on **October 28, 2026**; if approved, STRC's first daily payment is expected on November 2, 2026. More frequent payments appeal to buyers who want cash-like flow, but they don't change the $12 annual total, and they don't change the risk.

Price and real yield: on August 21, 2026 STRC closed at about $96.18, a current yield of \\(\\dfrac{\\$12}{\\$96.18} \\approx \\mathbf{12.48\\%}\\).

Size: STRC is Strategy's largest preferred layer, **$9.972 billion** of notional on August 23, 2026, and about **$9.32 billion** after September's buybacks (derived from the 8-Ks); Saylor said on September 25, 2026 it had "in excess of nine billion in notional outstanding." It is also Strategy's main funding pipe: the STRC ATM raised $5.465 billion gross in Q2 2026 (Stage 17.1).

### ⑤ It is not a money fund: against T-bills, money funds and credit

One of STRC's target audiences is buyers who would otherwise hold cash, money funds or T-bills (Stage 8.3, and Stage 13.5's "where does the yield come from"). Put them side by side:

<table class="pm">
<tr><th>Dimension</th><th>3-month T-bill</th><th>Government money fund</th><th>STRC</th></tr>
<tr><td>Yield (September 2026)</td><td>about 4.24% (2026-09-25)</td><td>close to short rates (fed funds 3.75–4.00%)</td><td>12.00% dividend rate; about 12.5% at a $96 price</td></tr>
<tr><td>Legal nature</td><td>US government debt</td><td>A regulated fund holding Treasuries and repo</td><td>Perpetual preferred (equity), behind debt and STRF</td></tr>
<tr><td>Interest-rate risk</td><td>Tiny (3 months)</td><td>Tiny</td><td>Small by design (monthly reset), if the issuer is willing to adjust</td></tr>
<tr><td>Credit risk</td><td>Essentially none</td><td>Very low</td><td>Depends on bitcoin and on Strategy's ability to keep raising capital</td></tr>
<tr><td>Is payment a legal obligation?</td><td>Yes (non-payment is default)</td><td>The fund's value follows its assets</td><td>No: dividends are declared by the board; cumulative, but skipping is not a default</td></tr>
<tr><td>Price anchor</td><td>Repayment at maturity</td><td>Regulation + short-term assets</td><td>The issuer's willingness to reset + buybacks + the $101 call ceiling</td></tr>
</table>

Using Stage 13.5's breakdown:

$$
\\text{STRC's } 12\\% \\approx \\underbrace{\\text{roughly } 4\\%}_{\\text{short risk-free rate}} + \\underbrace{\\text{roughly } 8\\ \\text{points}}_{\\text{bitcoin credit premium}}
$$

Those 8 points aren't free money. They pay for tail scenarios in which bitcoin crashes, capital markets shut, and the company can no longer issue new securities to fund dividends.

**The strongest case for:** STRC takes a kind of yield that used to exist only in long-duration, rate-sensitive form (the perpetual preferred) and turns it into something repriced monthly, paid twice a month (perhaps daily in future), with an anchored price. It ranks behind $6.7 billion of debt and STRF, with a BTC Rating of 5.7x on Strategy's method (August 23, 2026), backed by a USD Reserve covering roughly three years of dividends and interest (Stage 16.6). And the 2026 buybacks show the company will spend real money to support the price below par.

**The strongest case against:** the thermostat works on rates and fails on credit. In June and July 2026 STRC fell below $90, proving the "anchor" slips when bitcoin crashes. The policy can change, too (on June 29, 2026 it went from "set the rate by the price" to "not necessarily raise"), so holders depend on management's **willingness**, not a contractual **obligation**. It is perpetual equity junior to debt and STRF, and the cash for its dividends comes mainly from issuing more securities or selling bitcoin. Calling it "cash-like" may lead some buyers to underestimate those risks. Stage 18.1 computes yields, spreads and duration for instruments like STRC, and Stage 18.2 stress-tests them. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "strc-variable-rate",

  analogy: `
STRC is like **a rental flat with a thermostat written into the lease**.

An ordinary fixed-rate perpetual preferred is like **a lease whose rent can never change**. You signed at 12%; market rents rise to 13%, and your lease is suddenly worth little on the resale market, because who wants to take over a permanent lease below market rent? That is duration: the longer and more fixed the lease, the more its value swings when market rents move.

STRC's lease says instead: "**The landlord may reset the rent every month.** Cuts are limited to small steps and may never go below the bank deposit rate; increases have no limit." So the lease can almost always be resold near its original price: if market rents rise, the landlord matches them next month.

But a thermostat controls temperature, not the building's structure. If one day people worry not that "market rents went up" but that "the building might fall down" (bitcoin crashes and the landlord can't pay), then getting the resale price back to par might require a very high rent. In June 2026 this landlord chose a different move: freeze the rent at 12% and **buy leases back at a discount** on the resale market, both propping up the price and retiring some high-rent contracts cheaply.

So when you read STRC, watch two things at once: **the thermostat (the rate rules)** and **the building itself (bitcoin coverage and the ability to keep raising money)**.
`,

  misconceptions: [
    "**\"STRC is a money fund; its price is always $100.\"** — It is a perpetual preferred ranking behind debt and STRF, and its price anchor depends on the issuer's willingness to reset, on buybacks, and on the $101 call ceiling. The first buybacks in July 2026 averaged about $86.52, showing the anchor slips when bitcoin crashes.",
    "**\"STRC's rate went up because the Fed raised rates.\"** — From July 2025 to July 2026 STRC went from 9.00% to 12.00%, while the fed funds rate fell and then rose, for little net change. What rose was mainly the bitcoin credit premium.",
    "**\"A variable rate means the rate simply tracks SOFR.\"** — The contract only caps cuts (at most 25 bp plus the SOFR decline a month) and sets a SOFR floor; there is no cap on increases. How the rate actually moves depends on management's framework, which already changed once, on June 29, 2026.",
    "**\"Strategy says STRC's Duration is 8.1 years, so it's really a long-duration instrument.\"** — That is the Macaulay duration used in the company's BTC Risk model, measuring how far the cash flows stretch. STRC is designed so that its **interest-rate sensitivity** (effective duration) is close to one month. The two durations answer different questions.",
    "**\"Moving from monthly to semi-monthly to daily payments raises the yield.\"** — The annual total is still \\(\\text{notional} \\times \\text{rate}\\) (\\(\\$100 \\times 12\\% = \\$12\\) at 12%). More frequent payments just smooth the cash flow and suit cash-management buyers, nudging reinvestment timing slightly; they don't change the risk.",
  ],

  quiz: [
    {
      q: "A 12% fixed-rate perpetual preferred sees its required yield rise from 12% to 13%. Roughly what does its price become?",
      options: [
        "About $108",
        "Still $100",
        "About $50",
        "About $92.3",
      ],
      answer: 3,
      explain: "As a perpetuity: \\(\\text{price} = \\dfrac{\\$12}{13\\%} \\approx \\mathbf{\\$92.3}\\), with a modified duration of about \\(\\dfrac{1}{0.12} \\approx 8.3\\) years. An idealized monthly-reset instrument would dip only to about $99.9.",
    },
    {
      q: "Under STRC's contract terms, which of these is **not** allowed?",
      options: [
        "Raising the rate by 100 bp in one month",
        "Cutting the rate by 50 bp in a month when SOFR didn't change",
        "Redeeming some shares at $101 plus accrued dividends, leaving $300M outstanding",
        "Giving no notice and keeping last month's rate",
      ],
      answer: 1,
      explain: "A monthly cut may not exceed **25 bp plus the decline in one-month SOFR over the prior period**; with SOFR unchanged the maximum cut is 25 bp. There is no cap on increases.",
    },
    {
      q: "What did Strategy change about STRC's rate policy on June 29, 2026?",
      options: [
        "It promised to adjust automatically with SOFR every month",
        "It removed the cumulative feature",
        "It moved to weighing many factors and said it would not necessarily raise the rate just because the price is below the stated amount; below par, buybacks became the main tool",
        "It cut the rate to 9%",
      ],
      answer: 2,
      explain: "The revised policy widens the inputs to trading levels, market yields, credit spreads, bitcoin's price and volatility, USD Reserve coverage and more, with **buybacks below par as the main tool**. The same day the rate was raised to 12.00% from July 1, 2026.",
    },
    {
      q: "In September 2026 the 3-month T-bill yielded about 4.24% and STRC's rate was 12.00%. What does the roughly 8-point gap mainly compensate for?",
      options: [
        "Bitcoin and issuer credit risk (including tail scenarios where the company can't keep raising money to pay dividends)",
        "Interest-rate risk (duration)",
        "Inflation risk",
        "Currency risk",
      ],
      answer: 0,
      explain: "STRC's interest-rate risk is small by design; the gap is mainly a **bitcoin credit premium**: low seniority, dividends that aren't a legal obligation, and a cash source that depends on continued fundraising or bitcoin sales.",
    },
    {
      q: "Which statement about STRC's payment frequency is correct?",
      options: [
        "It has always been quarterly",
        "Monthly at launch, twice a month from June 30, 2026; a proposal for daily payments goes to a special meeting vote on October 28, 2026",
        "It has paid daily since 2025",
        "Once a year",
      ],
      answer: 1,
      explain: "The June 8, 2026 annual meeting approved semi-monthly payments, effective **June 30, 2026**. If the daily record-date proposal passes on **October 28, 2026**, STRC's first daily payment is expected on November 2, 2026.",
    },
  ],

  further: [
    { label: "STRC prospectus supplement (424B5, July 2025): variable-rate terms, cut limits, SOFR floor and redemption", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312525165531/d852456d424b5.htm" },
    { label: "Strategy 8-K (2026-06-29): the Digital Credit Capital Framework and revised STRC dividend policy", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526286871/mstr-20260629.htm" },
    { label: "Strategy 8-K (2026-09-01): STRC rate statement (holding 12.00%)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526377583/mstr-20260831.htm" },
    { label: "New York Fed: what SOFR is, with daily data", url: "https://www.newyorkfed.org/markets/reference-rates/sofr" },
    { label: "STRC dividend history (stockanalysis.com, third-party compilation)", url: "https://stockanalysis.com/stocks/strc/dividend/" },
  ],
};
