export default {
  id: "dat-accounting",
  stage: 15,
  order: 6,
  title: "Fair-Value Accounting, Earnings Swings & Tax: Reading a DAT's Financials",
  difficulty: "dat",
  prereqs: ["financial-statements", "dat-what", "strategy-story"],

  oneLiner:
    "Strategy earned about $10 billion in Q2 2025 and lost about $12.5 billion in Q1 2026 — while its business barely changed. What changed was the bitcoin price. Since 2025, the US accounting standard **ASU 2023-08** has required bitcoin to be carried at **fair value**, so every swing in price runs straight through the income statement. This lesson makes three things clear: what changed in moving from the “write-down only” impairment era to fair value; why a DAT's net income and EPS carry almost no information yet still affect index eligibility and tax; and how to read a DAT's 10-Q — **which numbers come from accounting standards and which are metrics the company defines itself.**",

  intuition: `
Stage 5.2 covered the three financial statements — income statement, balance sheet, cash-flow statement — and how they interlock. It also left a teaser: **a DAT's statements look strange.** This lesson pays that off.

Start with some real numbers (from Strategy's filings):

- Q2 2025: net income **+$10.02 billion**
- Q3 2025: net income about **+$2.8 billion**
- Q1 2026: net income **−$12.54 billion**
- Q2 2026: net income **−$8.22 billion** (−$24.45 per diluted share)

The company's software business brings in about $120 million a quarter and barely changed operationally. **What drives these astronomical figures is the difference between bitcoin's price at the start and the end of the quarter.** From January 1, 2025, Strategy adopted the Financial Accounting Standards Board's **ASU 2023-08**: bitcoin is marked to its quarter-end market price (fair value), with gains and losses flowing straight into net income.

Before that, a different rule had the opposite problem. Bitcoin was treated as an “indefinite-lived intangible asset”: **when the price fell it had to be written down, and when the price rose it could not be written back up.** A company that bought in 2020 and watched the price multiply still carried its bitcoin at historical cost less accumulated impairment — its statements badly understated its assets.

This lesson rests on **Idea ② (balance sheets and claims)**: accounting is the language that translates a balance sheet for outsiders, and when the grammar changes, the same balance sheet tells a completely different story. It also has real-world bite: **net income decides eligibility for the S&P 500** (Stage 18.4), and **accounting profit could at one point have triggered the 15% corporate alternative minimum tax (CAMT)** — until the US Treasury and IRS issued interim guidance on September 30, 2025.

Reading a DAT's financials takes a bilingual dictionary. On one side are **GAAP numbers** — net income, earnings per share, carrying values. On the other are **company-defined metrics (KPIs)** — BTC Yield, BTC Gain, mNAV, BTC Rating, months of USD reserve (Stage 16). The first set is rule-bound and comparable but says little about a DAT; the second is closer to the economics but defined by the company and subject to change. **You need to read both — and know the limits of each.**

**This lesson covers mechanics and analytical frameworks only; it is neither investment advice nor tax advice.**

**This lesson has five parts:**

- **① The impairment era (before 2025): bitcoin that could only go down**
- **② ASU 2023-08: fair value, with every swing in the income statement**
- **③ The earnings roller coaster: reading Strategy's quarterly numbers**
- **④ Tax: CAMT, deferred taxes and return of capital**
- **⑤ Non-GAAP metrics, and how to read a DAT's 10-Q**
`,

  mechanics: `
### ① The impairment era (before 2025): bitcoin that could only go down

Before ASU 2023-08, US GAAP had no rules written specifically for crypto assets. In practice bitcoin was classed as an **indefinite-lived intangible asset** (alongside trademarks and goodwill) and accounted for under a **cost-less-impairment** model:

- It was recorded at purchase cost;
- whenever the price fell **below** the carrying value (in practice often judged by the lowest traded price during the period), the company booked an **impairment loss** and wrote the asset down;
- **when the price recovered, the write-down could not be reversed** — a gain was recognized only on sale.

Here is the “down but never up” effect with Orange Corp (10,000 BTC bought at $100,000 each; simplified to test impairment at quarter-end prices):

<table class="pm">
<tr><th>Quarter-end</th><th>Bitcoin price</th><th>Impairment model: carrying value / quarterly P&amp;L</th><th>Fair-value model: carrying value / quarterly P&amp;L</th></tr>
<tr><td>Purchase</td><td>100,000</td><td>$1.0B / —</td><td>$1.0B / —</td></tr>
<tr><td>Q1</td><td>60,000</td><td>$0.6B / <b>−$0.4B</b></td><td>$0.6B / <b>−$0.4B</b></td></tr>
<tr><td>Q2</td><td>120,000</td><td>$0.6B / <b>0</b> (no reversal)</td><td>$1.2B / <b>+$0.6B</b></td></tr>
<tr><td>Q3</td><td>90,000</td><td>$0.6B / 0</td><td>$0.9B / −$0.3B</td></tr>
</table>

At the end of Q2 the bitcoin is really worth $1.2 billion, while the impairment model carries it at $0.6 billion — **the statements understate it by half.** Over the years, a long-term holder's carrying value could shrink to a fraction of market value. Investors had to redo the math outside the statements, which is one reason DATs started early on **non-GAAP metrics** such as BTC Yield and BTC NAV.

The impairment model had another perverse effect: **the income statement recorded only bad news.** Every dip produced an impairment loss, every rally went unrecorded — a company could report “losses” year after year while its holdings rose sharply in value.

### ② ASU 2023-08: fair value, with every swing in the income statement

FASB issued **ASU 2023-08** (Intangibles — Goodwill and Other — Crypto Assets) in December 2023, effective for fiscal years beginning after December 15, 2024, with early adoption allowed. Its core provisions:

- In-scope crypto assets (bitcoin included) are measured at **fair value**, remeasured at every reporting date;
- **changes in fair value go through net income** (not other comprehensive income), so gains and losses both hit the income statement;
- crypto assets are **presented separately** on the balance sheet, and their fair-value changes separately on the income statement;
- companies must disclose their significant crypto holdings, cost basis, fair value and any restrictions (for example, pledged coins).

**Transition**: on adoption, the difference from the old impairment-model carrying value was booked as a one-time adjustment to **opening retained earnings**, bypassing the income statement. Strategy adopted on January 1, 2025, and its opening retained earnings rose by **$12.75 billion** in one step — the understatement built up over years of “down but never up.”

The change made the balance sheet **honest**: bitcoin now appears at market value, and a reader can see at a glance how much value the company really holds. The price is an income statement that **swings violently**: net income is driven almost entirely by the change in bitcoin's price over the quarter.

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Strategy's unrealized bitcoin gains and losses (fair-value model, $ billions)</text><line x1="60" y1="145" x2="600" y2="145" stroke="var(--line)" stroke-width="1.5"/><text x="54" y="149" text-anchor="end" font-size="10" fill="var(--muted)">0</text><text x="54" y="75" text-anchor="end" font-size="10" fill="var(--muted)">+14</text><text x="54" y="235" text-anchor="end" font-size="10" fill="var(--muted)">−17</text><rect x="80" y="145" width="60" height="30" fill="var(--red)" opacity=".8"/><text x="110" y="190" text-anchor="middle" font-size="11" font-weight="600" fill="var(--red)">−5.91</text><rect x="165" y="73" width="60" height="72" fill="var(--green)" opacity=".85"/><text x="195" y="66" text-anchor="middle" font-size="11" font-weight="600" fill="var(--green)">+14.05</text><rect x="250" y="125" width="60" height="20" fill="var(--green)" opacity=".85"/><text x="280" y="118" text-anchor="middle" font-size="11" font-weight="600" fill="var(--green)">+3.89</text><rect x="335" y="145" width="60" height="90" fill="var(--red)" opacity=".8"/><text x="365" y="250" text-anchor="middle" font-size="11" font-weight="600" fill="var(--red)">−17.44</text><rect x="420" y="145" width="60" height="74" fill="var(--red)" opacity=".8"/><text x="450" y="234" text-anchor="middle" font-size="11" font-weight="600" fill="var(--red)">−14.46</text><rect x="505" y="145" width="60" height="43" fill="var(--red)" opacity=".8"/><text x="535" y="203" text-anchor="middle" font-size="11" font-weight="600" fill="var(--red)">−8.32</text><text x="110" y="272" text-anchor="middle" font-size="10" fill="var(--muted)">2025 Q1</text><text x="195" y="272" text-anchor="middle" font-size="10" fill="var(--muted)">2025 Q2</text><text x="280" y="272" text-anchor="middle" font-size="10" fill="var(--muted)">2025 Q3</text><text x="365" y="272" text-anchor="middle" font-size="10" fill="var(--muted)">2025 Q4</text><text x="450" y="272" text-anchor="middle" font-size="10" fill="var(--muted)">2026 Q1</text><text x="535" y="272" text-anchor="middle" font-size="10" fill="var(--muted)">2026 Q2</text><text x="320" y="287" text-anchor="middle" font-size="10" fill="var(--muted)">Source: Strategy FY2025 10-K and Q2 2026 10-Q</text></svg><figcaption>Over six quarters, unrealized results swung between +$14 billion and −$17 billion. Same company, same business — an income statement completely dominated by the bitcoin price.</figcaption></figure>

### ③ The earnings roller coaster: reading Strategy's quarterly numbers

Put the bar chart next to reported net income:

<table class="pm">
<tr><th>Quarter</th><th>Unrealized bitcoin result</th><th>Net income</th></tr>
<tr><td>Q2 2025</td><td>+$14.05B</td><td>+$10.02B</td></tr>
<tr><td>Q3 2025</td><td>+$3.89B</td><td>about +$2.8B</td></tr>
<tr><td>Q4 2025</td><td>−$17.44B</td><td>(not broken out in our fact sheet)</td></tr>
<tr><td>Q1 2026</td><td>−$14.46B</td><td>−$12.54B</td></tr>
<tr><td>Q2 2026</td><td>−$8.32B</td><td>−$8.22B (−$24.45 per diluted share)</td></tr>
</table>

How to read it:

- **\\(\\text{Net income} \\approx \\text{unrealized result} \\pm \\text{tax} \\pm \\text{everything else}\\).** The gap between the unrealized result and net income is mostly the income-tax effect (deferred taxes) plus operating, interest and other items. The net loss for the first half of 2026 totaled **$20.76 billion.**
- **Carrying value versus cost**: at June 30, 2026 the bitcoin's carrying (fair) value was **$49.67 billion** against a cost of **$63.94 billion** — at quarter-end prices the whole position was under water. That is the transparency fair value brings; under the impairment model you never saw cost and market value side by side.
- **Earnings per share carries almost no information.** What it tells you, essentially, is whether bitcoin rose or fell that quarter. To judge a DAT's operating performance, look at bitcoin per share (Stage 16.1) and BTC Yield (Stage 16.3).
- **But net income bites in the real world**: S&P 500 eligibility requires positive GAAP earnings summed over the last four quarters and in the latest quarter. Strategy's large losses from Q4 2025 through Q2 2026 fail that test (our inference from the rule; as of late September 2026 it was not an S&P 500 member; Stage 18.4).
- **Segment reporting**: from Q2 2026 Strategy reports a separate “Bitcoin” operating segment; the software business (Q2 2026 revenue $122.4 million) is another.

### ④ Tax: CAMT, deferred taxes and return of capital

Fair-value accounting created an unexpected tax problem. The US Inflation Reduction Act of 2022 introduced a **15% corporate alternative minimum tax (CAMT)** on large companies with average “adjusted financial statement income” (AFSI) above $1 billion over three years, levied on **book income** rather than taxable income. The trouble: fair value puts **unrealized** bitcoin gains into book income — so a company that never sold a coin could be taxed on “paper profit” with no cash coming in to pay it.

On September 30, 2025, the Treasury and the IRS issued **interim guidance** clarifying that a corporation **may disregard unrealized gains and losses on its digital assets** when computing AFSI. Strategy's 10-Q says it plans to exclude its unrealized bitcoin gains and losses accordingly, and the Treasury and IRS intend to issue revised proposed regulations. (The specific notice number cited in press reports could not be confirmed in our fact sheet.)

Two more tax items:

- **Deferred income taxes**: when bitcoin's carrying value exceeds its tax basis, the company books a deferred tax liability (the potential tax due on a future sale). Strategy's deferred tax liability fell from **$1.93 billion** at December 31, 2025 to about **$1.4 million** at June 30, 2026 — the price drop erased the book gain, and the company recorded a valuation allowance.
- **Return of capital (ROC)**: under US tax law, a corporation's distributions are first measured against its “earnings and profits” (E&P, a tax concept distinct from book income). When E&P is negative, preferred dividends are not taxed as dividend income but treated as **return of capital** — reducing the holder's cost basis and deferring tax. Strategy expects its preferred distributions to be treated as ROC, and Strive files a monthly Form 8937 describing SATA distributions as ROC (Stage 17.7; depends on the person and the jurisdiction; not tax advice).

### ⑤ Non-GAAP metrics, and how to read a DAT's 10-Q

Accounting standards settle “what price the asset is carried at,” but not the questions DAT investors actually care about: **Is bitcoin per share growing? How thick are the senior claims? How long can the dividends be paid?** Company-defined metrics answer those (Stage 16 takes them apart one by one):

<table class="pm">
<tr><th>Metric</th><th>What it answers</th><th>Watch out for</th></tr>
<tr><td>BTC Yield / BTC Gain / BTC $ Gain</td><td>Growth in bitcoin per share</td><td>Not a “yield” in the traditional sense; issuing preferreds inflates it (Stage 16.3)</td></tr>
<tr><td>mNAV</td><td>The premium the market pays for the bitcoin</td><td>Strategy changed its definition in 2026, so years are not comparable (Stage 16.2)</td></tr>
<tr><td>BTC Rating / Amplification</td><td>Asset coverage by layer; the common's amplification</td><td>“Does not represent a rating from any rating agency” (company wording)</td></tr>
<tr><td>USD Reserve / months covered</td><td>How long dividends can be paid without raising money or selling bitcoin</td><td>A management designation governed by board policy (Stage 16.6)</td></tr>
</table>

A practical order for reading a DAT's 10-Q:

1. **The bitcoin holdings note**: number of coins, cost basis, fair value, unrealized result for the period, and any pledged or restricted bitcoin.
2. **The debt and preferred notes**: principal, coupon, maturity, put date and conversion price for each convertible; share count, liquidation preference, dividend rate and cumulative status for each preferred (Stage 17.2, Stage 17.3).
3. **The equity note**: basic shares and the various diluted counts — check which share count the company's KPIs use (Strategy's BPS uses “Assumed Diluted Shares,” counting every convertible instrument).
4. **The liquidity section (MD&A)**: USD reserve, annual interest and dividends, sources of cash (ATM issuance, bitcoin sales).
5. **Subsequent events**: purchases, sales, issuance and buybacks between quarter-end and filing — for Strategy, the Monday 8-Ks are faster still.
6. **Definitions and reconciliations of non-GAAP metrics**: read the definition first, then the number; if the definition changed, don't compare across periods.

**The accounting numbers tell you whether bitcoin rose or fell this quarter; the KPIs tell you what the company did on top of bitcoin; and the notes tell you what assumptions sit under both.** Put all three together and you have read a DAT's financials. **Mechanics and frameworks only; not investment or tax advice.**
`,

  demo: "dat-accounting",

  analogy: `
Think of DAT accounting as **keeping the books on a famous painting.**

In the **impairment era** the rule was: record the painting at its purchase price; whenever similar paintings sell for less at auction, mark it down in the ledger; if prices recover, the ledger may not be changed back — unless you actually sell. After a few years, a painting worth a fortune on the wall might be carried in the books at a few million. Anyone reading your ledger would think you owned a few cheap prints.

In the **fair-value era** the rule is: have it appraised at market every quarter. The ledger finally matches the wall — but your “annual profit” has become “did painting prices go up or down this year?” One quarter you are “a tycoon who earned $10 billion,” the next “an unlucky soul who lost $12.5 billion,” and the same painting hung on the same wall the whole time.

There was one more headache: the tax office nearly taxed you on the rise in the painting's ledger value — even though you had sold nothing and had not a cent more in your pocket. The September 2025 interim guidance said: for paintings you haven't sold, the increase can be left out for now.

So when you read a DAT's statements, look at three things together: **the ledger** (the accounting standard, telling you what the painting is worth today), **the collector's own scorecard** (the company KPIs, telling you whether each shareholder's slice of the collection is growing), and **the ledger's footnotes** (telling you how those numbers were produced).
`,

  misconceptions: [
    "**“Strategy lost $12.5 billion in a quarter, so its business must be in serious trouble.”** — Under fair value, net income is driven almost entirely by the change in bitcoin's price during the quarter. The loss was mostly unrealized; the software business and the coin count did not change correspondingly. Judge operations with metrics such as bitcoin per share.",
    "**“Fair-value accounting made DAT statements less reliable.”** — The opposite: the balance sheet became more honest. Under the impairment model bitcoin could only be written down, badly understating assets (Strategy's retained earnings rose $12.75 billion in one step on adoption). The cost is a volatile income statement, not distorted asset values.",
    "**“DATs are taxed on book profit, so a bitcoin rally means a huge tax bill.”** — Ordinary income tax is based on taxable income, and unsold bitcoin gains are generally not taxed. The only exposure came from CAMT, which is levied on book income — and the September 30, 2025 interim guidance lets companies disregard unrealized digital-asset gains and losses when computing AFSI.",
    "**“Preferred dividends treated as return of capital are permanently tax-free.”** — ROC usually lowers the holder's cost basis and defers tax until sale rather than exempting it forever, and it depends on the company's tax earnings and profits being negative — which can change. It varies by country and circumstance.",
    "**“The BTC Yield and mNAV a company reports are governed by accounting standards just like net income.”** — They are company-defined non-GAAP metrics whose definitions the company sets and can change (Strategy changed its mNAV definition in 2026). Read the definition and reconciliation first, and don't compare across definitions.",
  ],

  quiz: [
    {
      q: "Under the impairment model, a company buys $1.0B of bitcoin; at quarter-end it has fallen to $0.6B, and at the next quarter-end it has risen to $1.2B. What is the carrying value at the end of the second quarter?",
      options: [
        "$1.2B",
        "$1.0B",
        "$0.6B",
        "$0.9B",
      ],
      answer: 2,
      explain: "The impairment model only goes **down**: at $0.6B the company books a $0.4B impairment, and the later recovery cannot be reversed, so the carrying value stays at **$0.6B** until a sale. Under fair value it would be $1.2B with a +$0.6B gain in the quarter.",
    },
    {
      q: "When Strategy adopted ASU 2023-08 on January 1, 2025, its retained earnings rose by $12.75 billion in one step. What did that amount represent?",
      options: [
        "The gain from bitcoin rising that day",
        "The bitcoin value previously understated (and not reversible) under the impairment model, booked directly to opening retained earnings",
        "Proceeds from preferred issuance that year",
        "A deferred tax liability",
      ],
      answer: 1,
      explain: "On transition, the **difference between the old carrying value and fair value** goes straight to opening retained earnings, bypassing the income statement — the understatement built up over years of “down but never up.”",
    },
    {
      q: "Why did fair-value accounting make DATs worry about the 15% corporate alternative minimum tax (CAMT)?",
      options: [
        "Because CAMT levies a 15% transaction tax on every bitcoin trade",
        "Because CAMT applies only to loss-making companies",
        "Because CAMT requires companies to sell bitcoin",
        "Because CAMT is based on book income (AFSI), and fair value puts unrealized bitcoin gains into book income",
      ],
      answer: 3,
      explain: "CAMT is levied on **adjusted financial statement income.** Fair value puts unrealized gains into book income, which could mean paying tax on paper profits without selling a coin. The September 30, 2025 interim guidance allows unrealized digital-asset gains and losses to be disregarded in computing AFSI.",
    },
    {
      q: "Reading a DAT's 10-Q, where should you look first to see whether its bitcoin has been pledged as loan collateral?",
      options: [
        "The net income line of the income statement",
        "The bitcoin holdings note (quantity, cost, fair value and any restricted or pledged coins)",
        "The slogan on the company's homepage",
        "Earnings per share",
      ],
      answer: 1,
      explain: "ASU 2023-08 requires disclosure of crypto holdings and **any restrictions** on them. Whether coins are pledged decides whether a bear market brings margin pressure (the Nakamoto-versus-Strategy contrast in Stage 15.4).",
    },
    {
      q: "Strategy lost $24.45 per diluted share in Q2 2026. Which indicator says relatively more about its “operating performance” that quarter?",
      options: [
        "Earnings per share",
        "The P/E ratio",
        "The change in bitcoin per share (BTC Yield), while watching the change in senior claims",
        "The dividend payout ratio",
      ],
      answer: 2,
      explain: "Under fair value, EPS mostly reflects bitcoin's move. **The change in bitcoin per share** is closer to what a DAT actually does — though you must also watch new senior claims (the limitation discussed in Stage 16.3).",
    },
  ],

  further: [
    { label: "FASB: ASU 2023-08, Crypto Assets (fair-value measurement)", url: "https://www.fasb.org/" },
    { label: "Strategy Q2 2026 10-Q (SEC): bitcoin note, unrealized results, CAMT and deferred taxes", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000044/mstr-20260630.htm" },
    { label: "Strategy FY2025 10-K (SEC): adoption of ASU 2023-08 and the retained-earnings adjustment", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000020/mstr-20251231.htm" },
    { label: "Strategy Q2 2026 earnings release (SEC): net loss and new metrics", url: "https://www.sec.gov/Archives/edgar/data/1050446/000162828026051027/mstr-20260730x8kxex991.htm" },
  ],
};
