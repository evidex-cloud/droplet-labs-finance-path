export default {
  id: "btc-yield-gain",
  stage: 16,
  order: 3,
  title: "BTC Yield, BTC Gain & BTC $ Gain: Decoding Strategy's Core KPIs",
  difficulty: "dat",
  prereqs: ["btc-per-share"],

  oneLiner:
    "Strategy's three headline KPIs are one number said three ways: **BTC Yield** = the percentage change in BTC per share (on assumed diluted shares) over a period; **BTC Gain** = bitcoin held at the start × BTC Yield; **BTC $ Gain** = BTC Gain × the bitcoin price. This lesson quotes the official definitions word for word, explains the 2026 convention under which quarterly figures add up to year-to-date, works through five Orange Corp financing moves, lists Strategy's and Strive's real values — and spells out what these KPIs do **not** measure: they are not yields in the bond sense, and they ignore senior claims and the cost of capital.",

  intuition: `
A rancher starts the year with 100 head of cattle and a family of four, so 25 head each. By year-end the ranch has 130 head — but along the way a fifth partner bought in, so now five people share them: 26 head each.

What was the "cattle yield" this year? On the total, +30%. But each original family member only has one more animal: **+4%**. That 4% is the growth that truly belongs to the original owners.

**BTC Yield** is exactly that kind of number. It doesn't care how much the company's total bitcoin grew; it measures how much **BTC per share** (Stage 16.1) grew. Strategy made it its headline KPI and added two translations:

- **BTC Gain** turns the percentage into a coin count: bitcoin held at the start × BTC Yield. On the ranch, 100 × 4% = 4 head — the animals the original owners effectively gained, **as if no new partner had joined**.
- **BTC $ Gain** turns the coin count into dollars: BTC Gain × the bitcoin price.

Take Orange Corp from Stage 15.1. It sells 10 million new shares at $15 (market-cap mNAV 1.5), raises $150M and buys 1,500 BTC. Holdings go from 10,000 to 11,500 BTC, shares from 100M to 110M, and BTC per share from 10,000 sats to about 10,455: **BTC Yield ≈ +4.5%**; BTC Gain = 10,000 × 4.5% ≈ **455 BTC**; BTC $ Gain ≈ **$45.5M**.

Notice: the company bought 1,500 coins, but BTC Gain is only about 455. Where did the other 1,045 go? They belong to the new shareholders (10M ÷ 110M × 11,500 ≈ 1,045). **BTC Gain counts what the existing holders gained, not what the company bought.** That's the point of the metric, and why it is more honest than total holdings.

But this "yield" has features you must know:

- It is **not** a yield in the bond sense — no cash reaches your pocket. Strategy itself says it is "not equivalent to 'yield' in the traditional financial context".
- It is a **gross** measure: coins bought with preferreds or debt count toward BTC Yield, even though shareholders have taken on new senior claims.
- It **ignores the cost of capital**: preferred dividends of 10%+ a year never show up in BTC Yield — until the day the company sells bitcoin to pay them, when they appear as negative yield.
- From 2026 the quarterly convention changed: every quarter is measured against the **start of the year**, so the quarterly figures **add up** to year-to-date.

This lesson rests on **Idea ② (balance sheets and claims)** — BTC Yield is the growth rate of the assets behind each share's claim — while borrowing the word "yield" from **Idea ①**, so we must be careful about how it differs from the real yield of Stage 4.2. Upstream sits BTC per share (Stage 16.1); downstream sits the flywheel math of Stage 16.7, because the size of BTC Yield is set almost entirely by the mNAV at issuance and the kind of capital raised. This lesson explains mechanics and analytical frameworks only; it is not investment advice.

**This lesson, in five parts:**

- **① The three official definitions, read word for word**
- **② The 2026 quarterly convention: add, don't compound**
- **③ Five Orange Corp moves: what raises and what lowers BTC Yield**
- **④ Real values: Strategy and Strive**
- **⑤ What it doesn't measure: critiques and how to read it**
`,

  mechanics: `
### ① The three official definitions, read word for word

From Strategy's Q2 2026 10-Q (quoted text in quotation marks):

- **BTC Yield**: "the percentage change in BPS (in Sats) from the beginning of a period to the end of a period".
- **BPS** uses **Assumed Diluted Shares Outstanding** as the denominator: basic shares + the assumed conversion of all convertible notes and convertible preferred (STRK) + all options, RSUs and PSUs, **whether or not in the money** (Stage 16.1).
- **BTC Gain**: "the gross number of bitcoins held by the Company at the beginning of a period multiplied by the BTC Yield for such period".
- **BTC $ Gain**: "the dollar value of the BTC Gain calculated by multiplying the BTC Gain by the market price of bitcoin as reported on the Coinbase exchange as of the applicable measurement time".

$$ BTC Yield = BPS (end) ÷ BPS (start) − 1
$$ BTC Gain = bitcoin held at start × BTC Yield
$$ BTC $ Gain = BTC Gain × bitcoin market price (at the measurement time)

The intuition for BTC Gain: **holding the share count fixed, how many free coins would the company have needed to grow BTC per share by the same percentage?** That's why it multiplies by **starting** holdings — it converts per-share growth back into "coins for the existing holders".

Strive uses the same framework: its BTC Yield is the "percentage change in bitcoin per share from the beginning of a period to the end of a period", and its BTC Gain and BTC $ Gain match Strategy's definitions. Its denominator is "Assumed Fully Diluted Shares", excluding traditional warrants.

### ② The 2026 quarterly convention: add, don't compound

From 2026, Strategy's 10-Q shows BTC Yield by quarter and makes the quarters **sum** to the year-to-date figure. It does this by **measuring every quarter against the BPS at the start of the year**. The filing's own example:

<table class="pm">
<tr><th>Point in time</th><th>BPS</th><th>2026 convention (vs start of year)</th><th>Traditional quarter-on-quarter</th></tr>
<tr><td>Start of year</td><td>100</td><td>—</td><td>—</td></tr>
<tr><td>End of Q1</td><td>110</td><td>Q1 = (110 − 100) ÷ 100 = <b>10%</b></td><td>10%</td></tr>
<tr><td>End of Q2</td><td>125</td><td>Q2 = (125 − 110) ÷ 100 = <b>15%</b></td><td>125 ÷ 110 − 1 ≈ 13.6%</td></tr>
<tr><td>Year to date</td><td>—</td><td>10% + 15% = <b>25%</b></td><td>1.10 × 1.136 − 1 = 25%</td></tr>
</table>

Both conventions give the same year-to-date result, but the quarterly numbers differ: **2026-style quarters add**, while quarter-on-quarter figures compound. When you read Strategy's 2026 quarterly BTC Yields, remember the denominator is the start-of-year BPS. On this basis Strategy reported **8.1%** for H1 2026 and **5.0%** for Q2, which implies about **3.1%** for Q1 (derived).

The convention also means **a quarter can post a negative BTC Yield**. If Q3 brings coin sales or share issuance that doesn't buy bitcoin, the year-to-date figure falls back from its mid-year level. Strategy reported a 2026 year-to-date BTC Yield of **4.5%** as of 2026-07-26, down from 8.1% for H1, after July's bitcoin sales and non-bitcoin share issuance.

### ③ Five Orange Corp moves: what raises and what lowers BTC Yield

Starting point: 10,000 BTC, 100M shares (we use basic shares to stay consistent with the course; on Strategy's assumed diluted count of 106M the results differ slightly — see below), 10,000 sats per share, bitcoin at $100,000.

<table class="pm">
<tr><th>Move</th><th>End holdings / shares</th><th>BTC Yield</th><th>BTC Gain</th><th>BTC $ Gain</th></tr>
<tr><td>A. Sell 10M shares at $15 (mNAV 1.5), buy bitcoin</td><td>11,500 / 110M</td><td><b>+4.5%</b></td><td>+455 BTC</td><td>+$45.5M</td></tr>
<tr><td>B. Sell 10M shares at $8 (mNAV 0.8), buy bitcoin</td><td>10,800 / 110M</td><td><b>−1.8%</b></td><td>−182 BTC</td><td>−$18.2M</td></tr>
<tr><td>C. Issue $100M of preferred, buy bitcoin</td><td>11,000 / 100M</td><td><b>+10.0%</b></td><td>+1,000 BTC</td><td>+$100M</td></tr>
<tr><td>D. Sell 150 BTC to pay a year of preferred dividends ($15M)</td><td>9,850 / 100M</td><td><b>−1.5%</b></td><td>−150 BTC</td><td>−$15M</td></tr>
<tr><td>E. Sell 2M shares at $15 and park the $30M in a USD reserve</td><td>10,000 / 102M</td><td><b>−2.0%</b></td><td>−196 BTC</td><td>−$19.6M</td></tr>
</table>

<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">BTC Yield of five Orange Corp moves (percent)</text><line x1="60" y1="150" x2="610" y2="150" stroke="var(--ink)" stroke-width="1"/><text x="54" y="154" text-anchor="end" font-size="10" fill="var(--muted)">0</text><text x="54" y="54" text-anchor="end" font-size="10" fill="var(--muted)">+10%</text><line x1="60" y1="50" x2="610" y2="50" stroke="var(--line)" stroke-dasharray="3 3"/><rect x="90" y="105" width="70" height="45" fill="var(--green)" opacity=".75"/><text x="125" y="99" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">+4.5%</text><rect x="195" y="150" width="70" height="18" fill="var(--red)" opacity=".75"/><text x="230" y="182" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">−1.8%</text><rect x="300" y="50" width="70" height="100" fill="var(--btc)" opacity=".6" stroke="var(--btc)" stroke-dasharray="4 3"/><text x="335" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">+10%*</text><rect x="405" y="150" width="70" height="15" fill="var(--red)" opacity=".75"/><text x="440" y="180" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">−1.5%</text><rect x="510" y="150" width="70" height="20" fill="var(--red)" opacity=".75"/><text x="545" y="184" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">−2.0%</text><text x="125" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">A Issue at premium</text><text x="230" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">B Issue at discount</text><text x="335" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">C Preferred buys BTC</text><text x="440" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">D Sell BTC for divs</text><text x="545" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">E Issue to hold cash</text><text x="320" y="244" text-anchor="middle" font-size="10" fill="var(--muted)">* C's +10% is gross: $100M of new senior claims; Net BTC per share is unchanged at issuance</text></svg><figcaption>BTC Yield rewards issuing stock at a premium to buy bitcoin and buying bitcoin with preferreds; it penalises issuing at a discount, selling coins to pay dividends — and issuing stock to hold cash, even at a premium.</figcaption></figure>

A few things worth pausing on:

- **The line between A and B is mNAV = 1.** Issue above the bitcoin NAV per share (mNAV > 1) and BTC Yield is positive; below it, negative. Stage 16.7 derives that line rigorously.
- **C's +10% looks best and deserves the most suspicion.** It's gross: the company gained 1,000 coins and also $100M of senior claims costing $10M a year. **Net** BTC per share didn't move at issuance (Stage 16.1). Strategy itself warns that because preferreds and debt rank ahead of common, this "yield" does not account for the new senior claims.
- **E is counter-intuitive.** Issuing at a 1.5x premium still produces a negative BTC Yield, because the money didn't become bitcoin. That's why Strategy's BTC Yield was dragged down in periods when, from December 2025 on, it sold common stock to build its USD Reserve. **BTC Yield only counts bitcoin, not dollars** — even dollars set aside to protect preferred dividends (Stage 16.6).
- **The denominator matters.** Computed on assumed diluted shares (106M → 116M), move A gives about +5.1% rather than +4.5%, because the 6M convert shares are a fixed block and new shares dilute a bigger base less. **Same trade, different denominator, different KPI.**

### ④ Real values: Strategy and Strive

Strategy's reported KPIs (10-K, 10-Q and earnings releases):

<table class="pm">
<tr><th>Period</th><th>BTC Yield</th><th>BTC Gain</th><th>BTC $ Gain</th></tr>
<tr><td>FY2024</td><td>74.3%</td><td>140,631 BTC</td><td>$13.13B</td></tr>
<tr><td>FY2025</td><td>22.8%</td><td>101,873 BTC</td><td>$8.915B</td></tr>
<tr><td>Q2 2026</td><td>5.0%</td><td>37,733 BTC</td><td>$2.215B</td></tr>
<tr><td>H1 2026</td><td>8.1%</td><td>54,625 BTC</td><td>$3.207B</td></tr>
<tr><td>2026 YTD to 2026-07-26</td><td>4.5%</td><td>—</td><td>—</td></tr>
</table>

You can check the BTC Gain definition yourself. Strategy held 447,470 BTC at the end of 2024; × 22.8% ≈ 102,000, close to the reported FY2025 BTC Gain of 101,873 (the gap is rounding in BTC Yield). For H1 2026: about 672,500 BTC at end-2025 × 8.1% ≈ 54,500, matching 54,625.

The targets tell a story too. On 2025-02-05 Strategy set a 2025 goal of at least 15% BTC Yield and $10B of BTC $ Gain; on 2025-10-30 it raised them to 30% and $20B, assuming bitcoin at $150,000 at year-end; on 2025-12-01 it revised them down. The outcome was 22.8% and $8.915B. **BTC $ Gain depends heavily on the bitcoin price** — the same BTC Gain is worth over 40% less at $87,600 than at $150,000. No 2026 KPI target was found in the Q1 or Q2 2026 releases.

Strive (same definitions): **11.1%** in Q1 2026, **23.9%** in Q2, **37.7%** for H1 and **+54.5%** year to date (per its dashboard). For a small company, a single merger or financing round can move BTC Yield dramatically. Strive closed its all-stock acquisition of Semler Scientific on 2026-01-16, which brought in 5,048 BTC; and SATA's notional grew by about $335M between 2026-06-30 and 2026-09-18 (derived) while holdings rose from 19,864 to 26,355 BTC. **A good part of the new bitcoin came from preferred financing, and that part of the "yield" is gross.**

### ⑤ What it doesn't measure: critiques and how to read it

- **It isn't a yield.** There's no cash flow. A 5% coupon bond (Stage 4.1) actually pays you $50 a year; a 20% BTC Yield pays you nothing — it changes how much bitcoin sits behind your share.
- **It ignores senior claims.** Coins bought with preferreds and debt all count as "yield" (move C). For a company whose leverage keeps rising, gross BTC Yield systematically overstates shareholders' true growth. The better companion is growth in **Net BTC per share** (Stage 16.1).
- **It ignores the cost of capital.** Preferred dividends and convert coupons never enter BTC Yield until the company sells coins to pay them (move D). A preferred paying 12% a year only helps shareholders if bitcoin rises more than 12% a year (Stage 16.7).
- **It ignores price.** Issuing at 3x mNAV and at 1.2x can both produce positive BTC Yield, but shareholders give away very different amounts of value.
- **BTC $ Gain mixes in the bitcoin price.** It is coins × the price at one moment; if the price falls, the dollar "gain" shrinks. Nor is it accounting profit (Stage 15.6).
- **Comparability is poor.** Denominators differ, conventions change, and one acquisition at a small company can manufacture a huge BTC Yield.

**How to read it:** treat BTC Yield as "the growth rate of BTC per share" and pair it with three questions. (1) What money bought the coins — common, preferred or debt? (2) At what mNAV was it issued? (3) How much new senior claim and annual dividend came with it (amplification in Stage 16.4, dividend coverage in Stage 16.6)? Only with those answers does the KPI mean something. This lesson explains mechanics and analytical frameworks only; it is not investment advice.
`,

  demo: "btc-yield-gain",

  analogy: `
Picture a **members-only wine cellar**. Each member holds some units, and the cellar buys wine with fees and the entry money paid by new members.

The annual report says: "Our 'wine yield' was 12% this year!" That doesn't mean you received a 12% cash payout — you received nothing. It means **the number of bottles behind each of your units is 12% higher than in January**.

How that 12% arose matters enormously:

- If new members paid 1.5 times what their units were worth and the cellar bought wine with the surplus, the old members genuinely benefited.
- If the cellar borrowed from a bank to buy a batch of wine, the bottle count is up — but there's now an IOU pinned to the cellar door, with interest to pay every year.
- If one year the cellar sells a few bottles to pay that interest, the "wine yield" turns negative.

The "wine gain" (BTC Gain) turns the 12% into bottles: 1,000 bottles at the start × 12% = 120 bottles — "as if the old members had been handed 120 free bottles". The "wine dollar gain" multiplies by the price of wine. If wine prices fall, that figure shrinks, even though the bottles behind your units haven't changed.
`,

  misconceptions: [
    "**\"A 20% BTC Yield is like a 20% bond yield.\"** — There's no cash flow at all; it is the percentage change in BTC per share. Strategy itself says it isn't equivalent to 'yield' in the traditional financial sense.",
    "**\"BTC Gain is the number of coins the company bought this period.\"** — BTC Gain = starting holdings × BTC Yield: what the existing holders effectively gained. Orange Corp bought 1,500 coins but its BTC Gain is only about 455; the other roughly 1,045 belong to the new shareholders.",
    "**\"A positive BTC Yield means shareholders are better off.\"** — Buying coins with preferreds or debt also produces positive (gross) BTC Yield while adding senior claims and annual dividends. Check the change in Net BTC per share and the cost of capital.",
    "**\"You have to compound 2026's quarterly BTC Yields to get the year.\"** — From 2026 each of Strategy's quarters is measured against the start-of-year BPS, so quarters simply add to year-to-date (e.g. 10% + 15% = 25%).",
    "**\"Issuing at a premium always gives a positive BTC Yield.\"** — Only if the money buys bitcoin. Issue at a 1.5x premium and put the cash in a USD reserve and BTC Yield is negative (about −2.0% for Orange Corp).",
  ],

  quiz: [
    {
      q: "Under Strategy's definition, what is BTC Gain?",
      options: [
        "The number of bitcoin bought during the period",
        "Bitcoin held at the start of the period × the period's BTC Yield",
        "Bitcoin held at the end × the bitcoin price",
        "Shares issued in the period × the share price",
      ],
      answer: 1,
      explain: "Official text: \"the gross number of bitcoins held by the Company at the beginning of a period multiplied by the BTC Yield for such period\". It measures **what existing holders effectively gained**.",
    },
    {
      q: "Under the 2026 quarterly convention, BPS goes 100 at the start of the year → 110 at end-Q1 → 125 at end-Q2. What is Q2's BTC Yield?",
      options: [
        "13.6%",
        "25%",
        "10%",
        "15%",
      ],
      answer: 3,
      explain: "In 2026 every quarter is measured against the **start-of-year** BPS: (125 − 110) ÷ 100 = **15%**; 10% + 15% = 25% year to date. 13.6% is the traditional quarter-on-quarter figure.",
    },
    {
      q: "Orange Corp sells 2M shares at $15 ($30M) and parks all of it in a USD reserve, buying no bitcoin. Roughly what is its BTC Yield?",
      options: [
        "About −2.0%",
        "About +4.5%",
        "0%",
        "About +2.0%",
      ],
      answer: 0,
      explain: "Still 10,000 BTC, now over 102M shares: about 9,804 sats, **roughly −2.0%**. BTC Yield only counts bitcoin — which is why periods spent building a USD reserve drag it down.",
    },
    {
      q: "Why does BTC Yield from \"issuing preferred to buy bitcoin\" deserve special caution?",
      options: [
        "Because issuing preferred is illegal",
        "Because coins bought with preferred don't count in holdings",
        "Because BTC Yield is gross: the new coins count as yield, but the new senior claim and its annual dividend are not deducted",
        "Because preferreds automatically convert into common",
      ],
      answer: 2,
      explain: "Gross BPS rises, but **net** BTC per share is unchanged at issuance; shareholders only benefit if bitcoin outgrows the preferred's dividend cost. Strategy flags this itself.",
    },
    {
      q: "Strategy raised its 2025 BTC $ Gain target from $10B to $20B and delivered $8.915B. What does this best illustrate about BTC $ Gain?",
      options: [
        "It doesn't depend on the bitcoin price",
        "It depends heavily on the bitcoin price at the measurement time: the $20B target assumed $150,000 at year-end",
        "It counts only preferred dividends",
        "It equals the company's accounting net income",
      ],
      answer: 1,
      explain: "BTC $ Gain = BTC Gain × price. The raised target assumed $150,000 at year-end; bitcoin closed 2025 near $87,600. **The same BTC Gain gives a very different dollar number when the price moves.**",
    },
  ],

  further: [
    { label: "Strategy Q2 2026 10-Q (original definitions of BTC Yield, BTC Gain, BTC $ Gain and the quarterly convention)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000044/mstr-20260630.htm" },
    { label: "Strategy FY2025 10-K (FY2024 and FY2025 KPIs)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000020/mstr-20251231.htm" },
    { label: "Strategy Q4 2024 release (introduces BTC Gain and BTC $ Gain; 2025 targets)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000095017025014455/mstr-ex99_1.htm" },
    { label: "Strive Q2 2026 results (BTC Yield definition and values)", url: "https://investors.strive.com/news-events/news-releases/news-details/2026/Strive-Inc--Announces-Second-Quarter-2026-Financial-Results/default.aspx" },
  ],
};
