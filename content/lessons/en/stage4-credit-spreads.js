export default {
  id: "credit-spreads",
  stage: 4,
  order: 6,
  title: "Credit Risk, Ratings & Spreads: From AAA to Junk",
  difficulty: "core",
  prereqs: ["price-yield"],

  oneLiner:
    "Lend to the US Treasury and you barely worry about getting paid back; lend to a company and you have to worry about **default**. The extra yield investors demand for that worry is the **credit spread**: corporate bond yield = Treasury yield of the same maturity + spread. Rating agencies rank default risk with letters from **AAA to D**; BBB− and above is **investment grade**, anything below is **high yield (junk)**. This lesson shows you how to split a spread into **expected loss = probability of default × loss given default** plus a risk and liquidity premium, why spreads explode in a crisis, and it lays the groundwork for the **BTC Rating** in Stage 16.5 and preferred pricing in Stage 18.1.",

  intuition: `
The first five lessons were about US Treasuries, whose risk is almost entirely one kind: **interest-rate risk**. Now let's change the borrower.

You have $1,000 and two 10-year options:

- Lend to the US Treasury: on September 25, 2026 the 10-year yield was about **5.17%**.
- Lend to a company of middling credit quality, which offers **8.67%**.

The extra **3.5 percentage points** are the **credit spread**. Why do they exist? Because the company might not pay you back. The US government borrows in dollars, can tax, and has the Fed as the issuer of those dollars, so it almost never defaults in nominal terms. A company has none of that. If its business fails it can stop paying interest and go into bankruptcy or restructuring, and its creditors get back only part of what they're owed (Stage 6.6).

So are 3.5 points enough? That depends on two things:

- **Probability of default (PD)**: how likely is default in a given year? Say 3%.
- **Loss given default (LGD)**: if it defaults, how much do you lose? Say you recover 40%, so you lose 60%.

Multiply them and you get the yearly **expected loss**: 3% × 60% = **1.8%**. Take that 1.8% out of the 3.5% spread and about 1.7% is left over as compensation for uncertainty itself: defaults tend to bunch together, the bonds can be hard to sell, and losses are biggest in recessions. That slice is the **risk premium** (plus a liquidity premium).

That's the basic equation of the credit market:

> **Corporate yield = Treasury yield + expected loss + risk and liquidity premium**

Who judges a company's chance of default? Professional **rating agencies** (S&P, Moody's, Fitch) rank borrowers with letters: AAA is safest, then AA, A, BBB… all the way to D (in default). **BBB− and above is “investment grade”**, and many pension funds and insurers may only hold bonds in that range. **BB+ and below is “high yield,” better known as “junk.”** Even the US government has a rating: S&P in 2011, Fitch in 2023 and Moody's in 2025 each cut it one notch from the top.

Spreads aren't fixed. In calm times lenders relax and spreads narrow. When a crisis hits, fear of defaults and fear of being unable to sell erupt together, spreads can **multiply**, and bond prices fall hard, usually just when you most need the money.

This lesson rests on **Idea ② Balance sheets & claims** and **Idea ④ Risk & leverage**. Credit risk depends on the strength of the borrower's balance sheet and on which floor of the capital stack your claim sits; the spread is the price the market puts on that risk. In the focus tier you'll see bitcoin treasury companies use a similar but different ruler, the **BTC Rating (asset coverage)**, to describe the cushion under their preferreds (Stage 16.5), and those preferreds are priced exactly as “Treasury plus a spread” (Stage 18.1).

**In this lesson we break it into six pieces:**

- **① Credit risk: the borrower might not pay you back**
- **② Ratings: the alphabet from AAA to D**
- **③ Spreads: the extra you get over Treasuries**
- **④ Expected loss = PD × LGD: how much of a spread is real default risk**
- **⑤ Spreads in a crisis: panic, liquidity and the central bank**
- **⑥ Credit in the new era: BTC Rating, over-collateralization and bitcoin treasury preferreds**
`,

  mechanics: `
### ① Credit risk: the borrower might not pay you back

**Default** is a legal event: the borrower fails to pay interest or principal on time as the contract requires, or files for bankruptcy. Creditors usually don't lose everything after a default; through a restructuring or bankruptcy they get back part of their claim. The share they get back is the **recovery rate**, and the share they lose is the **loss given default (LGD = 1 − recovery rate)**.

Recovery depends on your **position** in the capital stack (Stage 6.1):

- **Secured loans and bonds** (backed by specific assets) come first and have historically recovered the most.
- **Senior unsecured bonds** come next, with recoveries often somewhere around 40% (varying a lot by industry and cycle).
- **Subordinated debt** comes later and recovers less; **preferred and common stock** sit behind all the debt and often get nothing (the absolute priority rule of Stage 6.6).

So “credit risk” is really two questions: **will something go wrong (PD), and if it does, how much comes back (1 − LGD)?** On a $1,000 bond, if the issuer defaults and you recover 40%, you get $400 back and lose $600. That's an LGD of 60%.

The sources of credit risk are written in the issuer's balance sheet and income statement: how high debt/EBITDA is, whether interest coverage is adequate, how stable cash flow is, whether assets can be sold, whether a big chunk of debt is about to mature (the coverage ratios of Stage 6.5).

### ② Ratings: the alphabet from AAA to D

The three big agencies use similar letter scales (S&P and Fitch use AAA/AA/A/BBB…, Moody's uses Aaa/Aa/A/Baa…, refined with +/− or 1/2/3):

<table><tr><th>S&amp;P / Fitch</th><th>Moody's</th><th>Category</th><th>Meaning (simplified)</th></tr><tr><td>AAA</td><td>Aaa</td><td rowspan="4">Investment grade</td><td>Highest credit quality; default extremely rare</td></tr><tr><td>AA</td><td>Aa</td><td>Very high credit quality</td></tr><tr><td>A</td><td>A</td><td>High credit quality, somewhat sensitive to a worsening economy</td></tr><tr><td>BBB</td><td>Baa</td><td>Medium; the last rung of investment grade (BBB− / Baa3 is the line)</td></tr><tr><td>BB</td><td>Ba</td><td rowspan="4">High yield (junk)</td><td>Speculative elements; real risk in a downturn</td></tr><tr><td>B</td><td>B</td><td>Highly speculative; meaningful default probability</td></tr><tr><td>CCC / CC / C</td><td>Caa / Ca / C</td><td>Very high risk, close to default</td></tr><tr><td>D</td><td>—</td><td>In default</td></tr></table>

Key points:

- **The line between investment grade and high yield** (BBB− / Baa3) matters enormously. Many institutions may only hold investment grade, so when a company is cut from BBB− to BB+ (a “fallen angel”), forced selling often follows and its spread jumps.
- **A rating ranks default probability; it isn't a price.** Bonds with the same rating can trade at very different spreads, and the market has often priced the risk before the rating changes.
- **Ratings can be wrong.** Before the 2008 crisis, huge volumes of securitized subprime mortgage products were rated AAA and later defaulted en masse (Stage 10.2). Agencies are paid by the issuers they rate, a conflict of interest that has drawn criticism for decades.
- **Sovereigns are rated too.** The US was cut from the top grade to AA+ / Aa1 by S&P (August 5, 2011), Fitch (August 1, 2023) and Moody's (May 16, 2025). Moody's cited rising debt and interest burdens and the failure of successive administrations and Congresses to reverse the deficit trend. **US credit risk is still widely seen as extremely low, but the “perfect” label is gone.** Stage 4.5 discussed what that means for the term premium.

### ③ Spreads: the extra you get over Treasuries

**Credit spread = corporate bond yield − Treasury yield of the same maturity**, usually quoted in basis points (bp; 1bp = 0.01 percentage points). Use the 10-year Treasury yield on September 25, 2026 (about 5.17%) as the floor and price a 10-year corporate bond with a 5% coupon ($1,000 face; spreads are illustrative):

<table><tr><th>Issuer (illustrative)</th><th>Spread</th><th>Yield</th><th>Price</th></tr><tr><td>US Treasury</td><td>0</td><td>5.17%</td><td>$986.85</td></tr><tr><td>A-rated company</td><td>+100bp</td><td>6.17%</td><td>$913.65</td></tr><tr><td>BBB-rated company</td><td>+140bp</td><td>6.57%</td><td>$886.23</td></tr><tr><td>BB-rated company</td><td>+250bp</td><td>7.67%</td><td>$815.89</td></tr><tr><td>B-rated company</td><td>+350bp</td><td>8.67%</td><td>$757.85</td></tr></table>

**The same promised cash flows are worth less today the weaker the credit**, because you discount them at a higher rate. It's the seesaw of Stage 4.2 again, except this time credit, not the Treasury rate, is pushing the yield.

A corporate bond's price is therefore driven by **two forces**:

- **Moves in the Treasury yield** (interest-rate risk, measured by duration, Stage 4.4);
- **Moves in the spread** (credit risk). The price sensitivity to the spread is called “spread duration,” and for an ordinary fixed-rate bond it's close to modified duration. The B-rated bond in the table has a modified duration of about 7.3, so a 1-point wider spread knocks roughly 7% off its price.

The two forces can offset each other or stack up. In a recession Treasury yields often fall (flight to safety) while spreads widen (default fears). High-grade corporates are driven mainly by the first; junk bonds mainly by the second. **That's why high-yield bonds often trade more like stocks than like Treasuries.**

### ④ Expected loss = PD × LGD: how much of a spread is real default risk

$$
Expected loss (per year) = PD × LGD
Spread ≈ expected loss + risk premium + liquidity premium
Break-even default rate ≈ spread ÷ LGD
$$

Break the spreads of several rating grades apart (illustrative numbers; default probabilities loosely based on long-run historical averages; LGD of 60%):

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Taking a corporate bond yield apart (10-year, illustrative numbers)</text><g font-size="10"><rect x="110" y="30" width="12" height="10" fill="var(--blue)"/><text x="126" y="39" fill="var(--muted)">Treasury yield 5.17%</text><rect x="240" y="30" width="12" height="10" fill="var(--red)"/><text x="256" y="39" fill="var(--muted)">Expected loss = PD × LGD</text><rect x="400" y="30" width="12" height="10" fill="var(--orange)"/><text x="416" y="39" fill="var(--muted)">Risk + liquidity premium</text></g><g font-size="11" font-weight="700" fill="var(--ink)" text-anchor="end"><text x="100" y="67">AAA</text><text x="100" y="102">A</text><text x="100" y="137">BBB</text><text x="100" y="182">BB</text><text x="100" y="217">B</text></g><g fill="var(--blue)"><rect x="110" y="52" width="206.8" height="22"/><rect x="110" y="87" width="206.8" height="22"/><rect x="110" y="122" width="206.8" height="22"/><rect x="110" y="167" width="206.8" height="22"/><rect x="110" y="202" width="206.8" height="22"/></g><g fill="var(--red)"><rect x="316.8" y="52" width="1" height="22"/><rect x="316.8" y="87" width="1.4" height="22"/><rect x="316.8" y="122" width="4.8" height="22"/><rect x="316.8" y="167" width="19.2" height="22"/><rect x="316.8" y="202" width="84" height="22"/></g><g fill="var(--orange)"><rect x="317.8" y="52" width="19" height="22"/><rect x="318.2" y="87" width="38.6" height="22"/><rect x="321.6" y="122" width="51.2" height="22"/><rect x="336" y="167" width="80.8" height="22"/><rect x="400.8" y="202" width="68" height="22"/></g><g font-size="10" fill="var(--ink)"><text x="346" y="67">5.67% · spread 50bp · expected loss ≈ 1%</text><text x="366" y="102">6.17% · spread 100bp · ≈ 4%</text><text x="382" y="137">6.57% · spread 140bp · ≈ 9%</text><text x="426" y="182">7.67% · spread 250bp · ≈ 19%</text><text x="478" y="217">8.97% · 380bp · ≈ 55%</text></g><line x1="40" y1="155" x2="620" y2="155" stroke="var(--muted)" stroke-dasharray="5 4"/><text x="40" y="151" font-size="10" fill="var(--green)">↑ Investment grade</text><text x="40" y="165" font-size="10" fill="var(--red)">↓ High yield (junk)</text><text x="320" y="250" text-anchor="middle" font-size="10" fill="var(--muted)">Annual PD (illustrative): AAA ≈ 0.01% · A ≈ 0.06% · BBB ≈ 0.2% · BB ≈ 0.8% · B ≈ 3.5%; LGD 60%</text><text x="320" y="266" text-anchor="middle" font-size="10" fill="var(--muted)">Percentage on the right = expected loss as a share of the spread</text></svg><figcaption>The higher the rating, the smaller the share of the spread that pays for actual default losses; most of it is risk and liquidity premium, which academics call the “credit spread puzzle.” The lower the rating, the bigger the share of expected loss.</figcaption></figure>

Three conclusions:

- **Most of an investment-grade spread is not compensation for average default losses.** A BBB bond's expected loss is about 0.12% a year, yet its spread is about 1.4%. The rest pays for defaults that **bunch up** in recessions (exactly when it hurts most), for bonds that are harder to sell than Treasuries, and for tax differences. This is the famous **credit spread puzzle**.
- **High-yield spreads sit closer to actual losses.** A B-rated bond's expected loss of about 2.1% a year is more than half its spread. If defaults spike to 6%–7% in a year (not unusual in a deep recession), the spread no longer covers the losses.
- **The break-even default rate** is a handy shortcut: spread ÷ LGD. For a B-rated bond, 380bp ÷ 60% ≈ **6.3%**. As long as the annual default rate stays below that, holding such bonds beats holding Treasuries (all else equal).

### ⑤ Spreads in a crisis: panic, liquidity and the central bank

Spreads are **procyclical**: they tighten in good times and blow out in bad ones. A few historical episodes (ICE BofA corporate index measures; figures are approximate):

- **The 2008 financial crisis.** High-yield spreads approached **20 percentage points** in late 2008, and investment-grade spreads rose to about 6 points. After Lehman Brothers failed on September 15, 2008, credit markets all but froze (Stage 10.2).
- **The COVID shock of March 2020.** High-yield spreads jumped from a little over 3 points to more than 10, and investment-grade spreads widened sharply too. On March 23 the Fed announced corporate credit facilities, **buying corporate bonds directly (and related ETFs) for the first time**, and spreads started to come down. **One sentence from the central bank as buyer of last resort did more than any default statistic.**

Why can spreads widen so much in a crisis, far beyond actual defaults?

- **Rising default expectations.** A recession raises PD, and it raises LGD too, because assets are worth less in a slump.
- **Liquidity dries up.** Everyone wants to sell, nobody wants to buy, dealers shrink their balance sheets and bid–ask spreads widen (Stage 8.1).
- **Forced selling.** Downgrades trigger rule-based sales and funds face redemptions (the forced-liquidation logic of Stage 7.5 exists in credit markets too).

Run it on the B-rated bond from the table: if its spread widens from 350bp to about 875bp (crisis levels), the 10-year bond loses about **31%** of its price. A BBB bond whose spread goes from 140bp to about 300bp loses about 12.6%. **All this before a single default.** For current spread levels, check the ICE BofA series on FRED (this lesson doesn't quote an unverified latest reading).

Spreads are also a **macro signal**: a fast widening in high-yield spreads often leads or accompanies stock-market declines and economic slowdowns. Like the yield curve in Stage 4.3, it's a warning light, not a calendar.

### ⑥ Credit in the new era: BTC Rating, over-collateralization and bitcoin treasury preferreds

The same questions, “will they pay, and how much comes back if they don't,” take new forms in the new financial system.

**BTC Rating (asset coverage).** A bitcoin treasury company's main asset is bitcoin and it has little operating cash flow, so traditional interest coverage is nearly meaningless (Stage 6.5). Instead, these companies describe their safety cushion with **asset coverage**: **BTC Rating = BTC NAV ÷ the sum of all claims at this layer and above.** Using the course's Orange Corp (10,000 BTC at $100,000, a BTC NAV of $1 billion):

- Convertible notes ($150 million): $1B ÷ $150M ≈ **6.7x**
- Senior preferred Orange-F (cumulative claims $250 million): **4.0x**
- Junior preferred Orange-D (cumulative claims $300 million): about **3.3x**

The fundamental difference from a traditional rating: **a traditional rating mostly asks whether cash flow can pay the interest; the BTC Rating asks how well asset value covers the claims.** It's closer to the loan-to-value ratio on a mortgage. That's also its weakness: bitcoin is extremely volatile, and **a 70% drop in bitcoin turns 4x coverage into 1.2x** (Stage 16.5 runs the full stress test).

**DeFi's over-collateralization.** On-chain lending protocols usually require borrowers to post collateral worth more than the loan (say, $100 of ETH to borrow $60 of stablecoins). If the collateral ratio falls below a threshold, liquidation bots automatically sell the collateral to repay the debt (Stage 13.4). That nearly eliminates the traditional credit risk of a borrower who won't pay, but trades it for **liquidation risk and oracle risk**: in a crash, mass liquidations can feed on each other (Stage 7.5).

**Bitcoin treasury companies' preferreds use exactly this lesson's pricing equation**: required yield = Treasury yield + spread. That spread has to compensate for the risk that bitcoin's volatility erodes asset coverage, for the preferred's position behind the debt, for where the dividend cash comes from (new share issuance, a USD reserve, selling bitcoin, Stage 16.6), and for liquidity. Stage 18.1 puts it side by side with investment-grade and high-yield corporate spreads. **This section explains an analytical framework only; it is not investment advice.**

Private credit (Stage 8.4) is another new home for credit risk: funds outside the banking system lend directly, at wider spreads, with less transparency and no daily price. The risk hasn't gone away; you just **can't see the price move**.
`,

  demo: "credit-spreads",

  analogy: `
Think of the credit spread as **the “risk fee” you quietly charge when lending to different friends**.

Lend to your most reliable friend A (think US Treasuries) and the bank's rate is all you ask. Lend to friend B, who runs a business, and you do some mental math: maybe a 3% chance the business fails (probability of default); if it does, selling the equipment might get back 40% (recovery), so you'd lose 60%. On average that's 3% × 60% = 1.8% lost a year, so you need at least an extra 1.8% just to break even.

But you'd still ask for a bit more. What if the economy sours and several friends go under at once? What if you need cash and nobody will take the IOU off your hands? That extra slice is the **risk premium and liquidity premium**.

The rating agency is like a go-between who hands out “credit scores,” ranking your friends from AAA to D. Most of the time it does a decent job, but its income comes from the people it rates, and in 2008 it handed top marks to a pile of IOUs that looked shiny and were quietly rotten.

And a bitcoin treasury company? That's a friend who borrows from you against gold bars. You don't look at their pay slip; you look at **what the bars are worth and how many people are ahead of you in line**. When the price of the bars is steady, you feel safe. When it drops 70% overnight, you discover that “4x collateral” has shrunk to 1.2x.
`,

  misconceptions: [
    "**“The higher the spread, the better the deal.”** A high spread exists because the risk is high. Of a B-rated bond's extra 3.5 points, roughly half is expected default loss, and the rest compensates for defaults that cluster in recessions and for bonds you can't sell. A high spread is **the price of risk**, not free extra return.",
    "**“AAA means no risk.”** A rating only ranks default probability, and it can be wrong: many subprime mortgage securities rated AAA before 2008 later defaulted en masse. Ratings also ignore interest-rate risk: an AAA-rated 30-year bond still falls hard when rates rise (Stage 4.4).",
    "**“If a corporate bond is falling, the company must be close to default.”** The drop might come from rising Treasury yields (rate risk) or from spreads widening across the whole market (liquidity and panic), not from anything wrong with that company. In March 2020 plenty of healthy companies' bonds were dumped too.",
    "**“Default means losing everything.”** Creditors usually recover part of their claim through restructuring or bankruptcy; senior unsecured bonds often recover somewhere around 40%, secured debt more. How much you get back depends on where you sit in the capital stack (Stage 6.1, Stage 6.6).",
    "**“A bitcoin treasury company's BTC Rating is the same thing as an S&P rating.”** Agency ratings mainly assess the ability to service debt from cash flow and the probability of default. The BTC Rating is asset coverage (BTC NAV ÷ cumulative claims), closer to a mortgage's loan-to-value. It's intuitive, but it swings with bitcoin's price: 4x coverage becomes 1.2x after a 70% drop in bitcoin (Stage 16.5).",
  ],

  quiz: [
    {
      q: "A B-rated corporate bond has an annual default probability of about 3.5% and an expected recovery of 40% in default. What is its annual expected loss, roughly?",
      options: [
        "About 1.4%",
        "About 3.5%",
        "About 2.1%",
        "About 0.6%",
      ],
      answer: 2,
      explain: "**Expected loss = PD × LGD = 3.5% × (1 − 40%) = 2.1%.** If its spread is 3.8%, the remaining 1.7% or so is risk and liquidity premium.",
    },
    {
      q: "Where is the line between investment grade and high yield (junk)?",
      options: [
        "Between A and BBB",
        "Between BBB− (Moody's Baa3) and BB+ (Moody's Ba1)",
        "Between AA and A",
        "Between B and CCC",
      ],
      answer: 1,
      explain: "**BBB− / Baa3 and above is investment grade.** Many pension funds and insurers may only hold investment grade, so “fallen angels” that drop below the line often face forced selling and a jump in spread.",
    },
    {
      q: "The 10-year Treasury yields 5.17% and a 10-year corporate bond trades at a 250bp spread. What is its yield to maturity? If the spread widens to 500bp with Treasuries unchanged, roughly what happens to its price (modified duration about 7)?",
      options: [
        "7.67%; the price falls about 17%",
        "5.42%; the price falls about 2.5%",
        "7.67%; the price doesn't change, because the coupon hasn't changed",
        "2.67%; the price rises",
      ],
      answer: 0,
      explain: "**Yield = 5.17% + 2.50% = 7.67%.** A 2.5-point wider spread × spread duration of about 7 ≈ −17% (convexity makes the exact loss a little smaller). No default has happened, yet the price drops hard. That's credit markets in a crisis.",
    },
    {
      q: "Why is there said to be a “credit spread puzzle” in investment-grade bonds?",
      options: [
        "Because investment-grade companies never default",
        "Because rating agencies deliberately push spreads down",
        "Because spreads always equal expected losses",
        "Because spreads sit far above historical average default losses, and the extra compensates for defaults bunching in recessions, poor liquidity and similar risks",
      ],
      answer: 3,
      explain: "**A BBB bond's expected loss is on the order of 0.1% a year, yet its spread is often above 1 point.** Investors want paying not just for average losses but for losses that arrive all at once in bad times and for bonds they may not be able to sell.",
    },
    {
      q: "Orange Corp holds $1 billion of bitcoin, and cumulative claims through the senior preferred Orange-F layer are $250 million (a 4.0x BTC Rating). If bitcoin falls 70%, what does that layer's asset coverage become?",
      options: [
        "Still 4.0x, because the claims haven't changed",
        "About 2.8x",
        "About 1.2x",
        "About 0.3x",
      ],
      answer: 2,
      explain: "**BTC NAV drops to $300 million, and $300M ÷ $250M = 1.2x.** Asset coverage is a bitcoin treasury company's credit cushion, but it moves in lockstep with the coin, which is the heart of the stress tests in Stage 16.5 and Stage 18.2.",
    },
  ],

  further: [
    { label: "FRED: ICE BofA US High Yield Index Option-Adjusted Spread (BAMLH0A0HYM2)", url: "https://fred.stlouisfed.org/series/BAMLH0A0HYM2" },
    { label: "FRED: ICE BofA US Corporate (investment grade) Index Option-Adjusted Spread (BAMLC0A0CM)", url: "https://fred.stlouisfed.org/series/BAMLC0A0CM" },
    { label: "Investor.gov (SEC): Bonds, an introduction to credit risk and ratings", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds" },
    { label: "Moody's: May 2025 downgrade of the United States' sovereign rating", url: "https://ratings.moodys.com/ratings-news/443154" },
    { label: "Federal Reserve: measures announced March 23, 2020 (including corporate credit facilities)", url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20200323b.htm" },
  ],
};
