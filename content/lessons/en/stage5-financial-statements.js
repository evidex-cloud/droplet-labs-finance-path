export default {
  id: "financial-statements",
  stage: 5,
  order: 2,
  title: "Reading the Three Statements: Income, Balance Sheet & Cash Flow",
  difficulty: "core",
  prereqs: ["what-is-stock"],

  oneLiner:
    "Shareholders own “what is left” — and the only place to find out how much is left is the financial statements. The three statements answer three different questions: **how much did we earn this year (income statement)**, **what do we own and whom do we owe right now (balance sheet)**, and **where did the actual cash come from and go (cash flow statement)**. A few threads tie them tightly together. Learn those threads and you can spot a company with “profits but no cash” — and understand why a company holding bitcoin can see its earnings swing by billions in a single quarter.",

  intuition: `
In the last lesson (Stage 5.1) we said that shareholders get whatever is left once everyone else is paid. The obvious question is: **how much is left, and who tells you?** The answer is the set of financial statements a company publishes every quarter and every year.

Financial statements sound intimidating, but they answer three questions you already ask about your own money:

- **How much did I make this month?** Your pay minus your spending. That is the **income statement**. It measures performance **over a period of time** — it is a video.
- **What am I worth right now?** Savings, home, car, minus the mortgage and the credit-card balance. That is the **balance sheet**, a snapshot **at a single moment** — a photograph.
- **Why is there less money in my account?** Your salary came in, but you bought a laptop, paid down the mortgage and sent money to family. That is the **cash flow statement**, which tracks **real cash** in and out.

Why three and not one? Because **“earning money” and “having money” are not the same thing.** If you finished a job for a client this month and they pay next month, you earned it this month but it is not in your account. Conversely, if you bought a $10,000 laptop, your account dropped by $10,000 but you did not “lose” $10,000 — you still have the laptop; the cash just turned into equipment. Accountants record “what you earned” on the income statement (**accrual accounting**), record “how much cash moved” on the cash flow statement (**cash accounting**), and reconcile the two on the balance sheet.

We will keep using Morning Coffee. It sold $10 million of coffee in a year and ended with $1.2 million of net income. But in the same year it opened a new store and paid down some of its loan, so **by year-end its bank balance had actually fallen by $200,000.** The three statements show where every dollar between that $1.2M profit and that −$0.2M of cash went.

This lesson sits on **Idea ② — balance sheets & claims.** The balance sheet is exactly the Stage 5.1 list of “who has rights to the company,” and the other two statements explain how that list changed over the year. Once you can read all three, you will notice something when you open a DAT's quarterly report in Stage 15.6: its income statement is mostly “how much bitcoin moved,” and its cash flow statement is mostly “how much capital came in and how much bitcoin went out.” That is not a quirk; that is the business model.

**In this lesson we break it into five parts:**

- **① The income statement: what you earned over a period**
- **② The balance sheet: what you own and whom you owe, at a moment**
- **③ The cash flow statement: where real cash came from and went**
- **④ How the three connect: four threads that stitch them together**
- **⑤ Reading a DAT's statements: when earnings jump with bitcoin**
`,

  mechanics: `
### ① The income statement: what you earned over a period

Read the income statement from top to bottom. It is a sum that keeps **subtracting**, and each subtotal has a name (in $ thousands):

<table>
<tr><th>Line</th><th>Morning Coffee (this year)</th><th>What it tells you</th></tr>
<tr><td>Revenue</td><td>10,000</td><td>How much coffee was sold (the “top line”)</td></tr>
<tr><td>− Cost of goods sold</td><td>4,000</td><td>Beans, milk, cups, barista hours</td></tr>
<tr><td><b>= Gross profit</b></td><td><b>6,000</b></td><td>60% gross margin: is the product itself profitable?</td></tr>
<tr><td>− Operating expenses</td><td>3,500</td><td>Rent, admin, marketing</td></tr>
<tr><td>− Depreciation & amortization</td><td>500</td><td>The part of the machines and fit-out “used up” this year</td></tr>
<tr><td><b>= Operating income (EBIT)</b></td><td><b>2,000</b></td><td>What the business earns, regardless of how it is financed</td></tr>
<tr><td>− Interest</td><td>400</td><td>$5M loan × 8%</td></tr>
<tr><td>= Pre-tax income</td><td>1,600</td><td></td></tr>
<tr><td>− Income tax (25%)</td><td>400</td><td></td></tr>
<tr><td><b>= Net income</b></td><td><b>1,200</b></td><td>The “bottom line”: profit belonging to shareholders</td></tr>
</table>

A few key points:

- **Interest is deducted after operating income.** That is the Stage 5.1 order of payment showing up on the income statement: the lender's $400K comes out first, and only what remains belongs to the owners.
- **Depreciation is not a cash payment.** $8M of equipment is not “lost” all in the year it is bought; its cost is spread over its useful life ($500K a year here). That makes profit a fairer picture of what was used up this year — and it means **profit ≠ cash.**
- **EBITDA** = operating income + depreciation & amortization = $2.5M. It is a rough gauge of operating cash-generating power and a favorite input for valuation multiples (EV/EBITDA in Stage 5.3), but it pretends equipment never has to be replaced. Warren Buffett's 2000 letter to shareholders famously asked whether managers think the tooth fairy pays for capital expenditures.
- **Earnings per share (EPS)** = $1.2M ÷ 1M shares = $1.20. **Return on equity (ROE)** = 1,200 ÷ 5,000 = 24%.

### ② The balance sheet: what you own and whom you owe, at a moment

A balance sheet always satisfies one identity:

$$
Assets = Liabilities + Shareholders' equity
$$

This is not a discovery; it is a **definition.** Everything a company owns was paid for either with borrowed money (liabilities) or with money the owners put in or earned and did not pay out (equity). Morning Coffee at the start and end of the year ($ thousands):

<table>
<tr><th>Assets</th><th>Start</th><th>End</th><th>Liabilities & equity</th><th>Start</th><th>End</th></tr>
<tr><td>Cash</td><td>1,000</td><td>800</td><td>Bank loan</td><td>5,000</td><td>4,800</td></tr>
<tr><td>Receivables & inventory</td><td>1,000</td><td>1,300</td><td>Paid-in capital (owners' investment)</td><td>4,000</td><td>4,000</td></tr>
<tr><td>Equipment & stores (net)</td><td>8,000</td><td>8,500</td><td>Retained earnings (profits kept over the years)</td><td>1,000</td><td>1,800</td></tr>
<tr><td><b>Total assets</b></td><td><b>10,000</b></td><td><b>10,600</b></td><td><b>Total liabilities + equity</b></td><td><b>10,000</b></td><td><b>10,600</b></td></tr>
</table>

Notice that equity is split in two: **paid-in capital** (what the owners originally put in) and **retained earnings** (the running total of all past net income minus all past dividends). This year's net income was $1.2M and dividends were $0.4M, so retained earnings rose by $0.8M — **the bottom line of the income statement flows straight into the balance sheet.**

Most balance-sheet numbers are at **historical cost** (equipment at purchase price less depreciation), not at what the items could be sold for today. That is why, in Stage 5.1, “$5 of book value per share and a $12 share price” was no contradiction. There are exceptions: some financial assets are carried at **fair value** (market price). In part ⑤ you will see that bitcoin became one of them under U.S. accounting rules starting in 2025.

### ③ The cash flow statement: where real cash came from and went

The cash flow statement splits the year's change in cash into three kinds of activity:

<table>
<tr><th>Line</th><th>$ thousands</th><th>Explanation</th></tr>
<tr><td>Net income</td><td>1,200</td><td>Start from the income statement's bottom line</td></tr>
<tr><td>+ Depreciation</td><td>500</td><td>Deducted but not paid in cash — add it back</td></tr>
<tr><td>− Increase in working capital</td><td>−300</td><td>Receivables and inventory rose from 1,000 to 1,300: sales not yet collected, beans bought but not yet sold</td></tr>
<tr><td><b>= Cash from operations (CFO)</b></td><td><b>1,400</b></td><td>Cash the business itself generated</td></tr>
<tr><td>Capital expenditure (a new store)</td><td>−1,000</td><td></td></tr>
<tr><td><b>= Cash from investing (CFI)</b></td><td><b>−1,000</b></td><td>Buying long-term assets (buying bitcoin lands here too)</td></tr>
<tr><td>Loan repayment</td><td>−200</td><td></td></tr>
<tr><td>Dividends paid</td><td>−400</td><td></td></tr>
<tr><td><b>= Cash from financing (CFF)</b></td><td><b>−600</b></td><td>Money to and from lenders and owners (stock, bond and preferred issuance and preferred dividends all land here)</td></tr>
<tr><td><b>Net change in cash</b></td><td><b>−200</b></td><td>1,000 → 800, matching the balance sheet</td></tr>
</table>

One derived measure gets used constantly: **free cash flow (FCF) = cash from operations − capital expenditure = 1,400 − 1,000 = $400K.** That $400K is the money genuinely available to the providers of capital after the business has been maintained and expanded. The DCF valuation in Stage 5.3 discounts this number, not net income.

Why watch cash flow so closely? Because **accounting choices can dress up profit; cash is much harder to fake.** A company whose profits grow every year while its operating cash flow is negative every year is usually either “selling on credit” (receivables piling up) or capitalizing costs that should be expenses — the two most common warning signs of manipulated accounts. As the saying goes: **profit is an opinion, cash is a fact.**

### ④ How the three connect: four threads that stitch them together

The three statements are not three separate documents; they are sewn together by a handful of threads. Here are Morning Coffee's four:

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><defs><marker id="fs-ar-en" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--orange-ink)"/></marker></defs><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The four threads between the statements (Morning Coffee, $K)</text><rect x="20" y="44" width="180" height="200" rx="10" fill="var(--surface-2)" stroke="var(--line)"/><text x="110" y="66" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Income statement (year)</text><text x="34" y="92" font-size="11" fill="var(--muted)">Revenue 10,000</text><text x="34" y="112" font-size="11" fill="var(--muted)">− Costs & expenses 7,500</text><text x="34" y="132" font-size="11" fill="var(--blue)" font-weight="600">− Depreciation 500</text><text x="34" y="152" font-size="11" fill="var(--muted)">− Interest 400 − Tax 400</text><rect x="30" y="166" width="160" height="26" rx="6" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="110" y="184" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Net income 1,200</text><text x="110" y="222" text-anchor="middle" font-size="10" fill="var(--muted)">a video</text><rect x="230" y="44" width="180" height="200" rx="10" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="66" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Cash flow statement (year)</text><text x="244" y="92" font-size="11" fill="var(--orange-ink)" font-weight="600">Net income 1,200</text><text x="244" y="112" font-size="11" fill="var(--blue)" font-weight="600">+ Depreciation 500</text><text x="244" y="132" font-size="11" fill="var(--muted)">− Work. capital 300 → CFO 1,400</text><text x="244" y="152" font-size="11" fill="var(--muted)">Capex −1,000</text><text x="244" y="172" font-size="11" fill="var(--muted)">Repay −200 · Dividends −400</text><rect x="240" y="184" width="160" height="26" rx="6" fill="var(--green-soft)" stroke="var(--green)"/><text x="320" y="202" text-anchor="middle" font-size="12" font-weight="700" fill="var(--green)">Cash 1,000 → 800</text><text x="320" y="232" text-anchor="middle" font-size="10" fill="var(--muted)">real cash</text><rect x="440" y="44" width="180" height="200" rx="10" fill="var(--surface-2)" stroke="var(--line)"/><text x="530" y="66" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Balance sheet (year-end)</text><text x="454" y="92" font-size="11" fill="var(--green)" font-weight="600">Cash 800</text><text x="454" y="112" font-size="11" fill="var(--muted)">Receivables & inventory 1,300</text><text x="454" y="132" font-size="11" fill="var(--blue)" font-weight="600">Equipment 8,000+1,000−500</text><text x="454" y="152" font-size="11" fill="var(--muted)">Loan 5,000−200 = 4,800</text><rect x="450" y="166" width="160" height="26" rx="6" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="530" y="184" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Retained 1,000+1,200−400</text><text x="530" y="222" text-anchor="middle" font-size="10" fill="var(--muted)">a photo: 10,600 = 4,800 + 5,800</text><path d="M190,179 C215,179 215,88 240,88" fill="none" stroke="var(--orange-ink)" stroke-width="1.8" marker-end="url(#fs-ar-en)"/><path d="M190,186 C320,280 400,280 450,186" fill="none" stroke="var(--orange-ink)" stroke-width="1.8" marker-end="url(#fs-ar-en)"/><path d="M400,197 C425,197 425,88 450,88" fill="none" stroke="var(--green)" stroke-width="1.8" marker-end="url(#fs-ar-en)"/><path d="M150,128 C200,128 200,108 240,108" fill="none" stroke="var(--blue)" stroke-width="1.4" stroke-dasharray="4 3"/><text x="70" y="270" font-size="10" fill="var(--orange-ink)">① Net income → top of cash flow</text><text x="232" y="290" font-size="10" fill="var(--orange-ink)">② Net income − dividends → retained earnings</text><text x="440" y="270" font-size="10" fill="var(--green)">③ Ending cash → balance sheet</text></svg><figcaption>Net income flows both to the first line of the cash flow statement and into retained earnings on the balance sheet; ending cash on the cash flow statement is the balance-sheet cash; depreciation is deducted on the income statement, added back on the cash flow statement and subtracted from net equipment on the balance sheet.</figcaption></figure>

- **Thread ①: net income → the first line of the cash flow statement.** The cash flow statement (indirect method) starts from net income and reverses the non-cash items.
- **Thread ②: net income − dividends → retained earnings.** This is how the income statement's result accumulates into shareholders' equity.
- **Thread ③: ending cash on the cash flow statement = cash on the balance sheet.** The two must match to the cent.
- **Thread ④: depreciation and capex → net equipment.** Opening 8,000 + capex 1,000 − depreciation 500 = 8,500; loan 5,000 − repayment 200 = 4,800.

With all four threads connected, the balance sheet must balance: assets 800 + 1,300 + 8,500 = 10,600; liabilities and equity 4,800 + 4,000 + 1,800 = 10,600. **When analysts build a “three-statement model,” they are simply writing these four threads as formulas** — change one assumption (say revenue +10%) and all three statements move together and still balance. The demo below is a miniature three-statement model.

### ⑤ Reading a DAT's statements: when earnings jump with bitcoin

Now replace Morning Coffee with **Orange Corp**, the standard example in Stages 15–18: it holds 10,000 BTC and has a small software business on the side. Over one quarter bitcoin rises from $100,000 to $110,000. What happens to the three statements?

- **Income statement:** under U.S. GAAP, ASU 2023-08 requires crypto assets like these to be measured at **fair value**, with price changes running through the period's earnings. 10,000 × $10,000 = **$100 million of unrealized gain** lands in net income — even though the company did not sell a single coin. If bitcoin falls back next quarter, that is a $100 million loss. **The income statement becomes a mirror of the bitcoin price.**
- **Cash flow statement:** that $100M gain is not cash, so it is subtracted straight back out in operating cash flow. The real cash activity is in the other two sections: money raised by selling common stock, convertible notes and preferred stock shows up as **financing inflows**; money spent on bitcoin shows up as **investing outflows**; preferred dividends are **financing outflows**. A typical DAT's cash flow statement reads “capital in, bitcoin out.”
- **Balance sheet:** bitcoin is carried at the quarter-end market price, and shareholders' equity swings with it. The face amounts of the convertibles and preferreds are precisely the layers stacked above the common in the Stage 6.1 capital-stack picture.

Before ASU 2023-08, in the “impairment era,” bitcoin was treated as an indefinite-lived intangible asset: when the price fell, it had to be written down, but when the price rose it could not be written back up. Carrying values only ever went down, and the statements badly understated holders' wealth. The new standard makes the statements more truthful and earnings far more volatile — companies like Strategy have reported quarterly accounting gains and losses on the order of billions of dollars (check each 10-Q for exact figures). That is why DATs also publish their own **non-GAAP metrics**: BTC per share, BTC Yield, mNAV (Stages 16.1–16.3).

**Three rules for reading a DAT's statements:** when you look at net income, first strip out the fair-value change in bitcoin and see whether the remaining business actually makes money; when you look at the cash flow statement, read the financing section to see which instruments raised money this quarter; when you look at the right side of the balance sheet, count every layer of claims stacked on top of the common. Stage 15.6 walks through a real 10-Q line by line and covers the tangle between fair-value gains and the U.S. corporate alternative minimum tax (CAMT).
`,

  demo: "financial-statements",

  analogy: `
Think of a company as a **reservoir**.

The **income statement** is a year's hydrology log: how much flowed in from upstream (revenue), how much evaporated, leaked or was released downstream (costs and expenses), and how much was stored on net (net income). It is about **flows**.

The **balance sheet** is an aerial photograph taken on one particular day: how high the water is, how thick the dam is, how much water is owed to the next village. It is about **stocks**.

The **cash flow statement** is the counter on the sluice gate: it records only the water that actually passed through. “Upstream promised to release water tomorrow” can go in the hydrology log; it does not register on the counter.

Pipes connect the three. The water stored over the year (net income) must show up as a change in the water level in the photo (retained earnings); the counter's final reading (ending cash) must match the pool behind the gate in the photo. **If the log says lots of water was stored, but the counter never moved and the level in the photo did not rise, start doubting whoever keeps the log.**

Orange Corp's reservoir is a little strange: its water level is measured in the price of bitcoin. When bitcoin rises, the level in the photo “rises” and the log records “a great year for storage” — while the counter on the gate does not move at all.
`,

  misconceptions: [
    "**“A profitable company must have lots of cash.”** — Under accrual accounting, sales not yet collected count as revenue and equipment purchases are spread out as depreciation. Morning Coffee earned $1.2M while its cash fell $200K. Profits that keep growing alongside persistently negative operating cash flow are a warning sign.",
    "**“Balance-sheet numbers are what the assets could be sold for today.”** — Most assets are carried at historical cost less depreciation, which can differ enormously from market value. Only some financial assets — including bitcoin from 2025 under U.S. GAAP — are measured at fair value.",
    "**“EBITDA is the cash a company can spend freely.”** — EBITDA ignores capital expenditure, working capital, interest and taxes. A company that must keep replacing equipment can show handsome EBITDA and very little free cash flow.",
    "**“A DAT reporting a multibillion-dollar quarterly loss must be in operating trouble.”** — Under fair-value accounting that usually just reflects bitcoin ending the quarter lower than it started, with no cash leaving the company. To judge the business, strip out fair-value changes first, then read the cash flow statement and the capital structure.",
    "**“Assets = liabilities + equity is an empirical rule that needs checking.”** — It is an accounting definition: equity is calculated as assets minus liabilities. If a three-statement model does not balance, a thread has been wired wrongly — the company is not “out of balance.”",
  ],

  quiz: [
    {
      q: "Morning Coffee has net income of $1.2M, depreciation of $0.5M, a $0.3M increase in working capital and $1.0M of capex. What is its free cash flow?",
      options: [
        "$1.2M",
        "$0.4M",
        "$1.7M",
        "−$0.2M",
      ],
      answer: 1,
      explain: "Operating cash flow = 1.2 + 0.5 − 0.3 = $1.4M; free cash flow = 1.4 − 1.0 = **$0.4M**. The −$0.2M is the net change in cash after also paying down debt and paying dividends.",
    },
    {
      q: "Which of these is a “thread” linking the income statement to the balance sheet?",
      options: [
        "Revenue = ending cash",
        "Gross profit = paid-in capital",
        "Capex = interest expense",
        "Net income − dividends = the increase in retained earnings",
      ],
      answer: 3,
      explain: "Net income, after the dividends paid to shareholders, accumulates into **retained earnings** on the balance sheet — the central thread between the statements.",
    },
    {
      q: "A company has grown net income 30% a year for three years, but its operating cash flow is negative every year and its receivables have tripled. What is the most reasonable reading?",
      options: [
        "The profits may come largely from sales on credit; question the quality of the revenue",
        "The company has too much cash, so operating cash flow is negative",
        "This is normal; cash flow does not matter",
        "It means the company is buying back a lot of stock",
      ],
      answer: 0,
      explain: "Profit is recognized on an accrual basis; cash is hard to fake. Rising profit, negative cash flow and exploding receivables are the classic signs of poor revenue quality or outright manipulation — “profit is an opinion, cash is a fact.”",
    },
    {
      q: "Orange Corp holds 10,000 BTC. This quarter bitcoin rises from $100,000 to $110,000 and the company neither buys nor sells any. Under fair-value accounting, what happens?",
      options: [
        "Nothing on the income statement, because nothing was sold",
        "Operating cash flow rises by $100M",
        "Net income includes about $100M of unrealized gain, but cash does not change",
        "Investing cash flow rises by $100M",
      ],
      answer: 2,
      explain: "Under ASU 2023-08, price changes run through earnings: 10,000 × $10,000 = **$100M** of unrealized gain enters net income. It is not cash, so it is reversed out of operating cash flow.",
    },
    {
      q: "EBITDA is widely used to compare companies. What is its main flaw?",
      options: [
        "It includes too many non-cash items",
        "It does not deduct capital expenditure, treating equipment that must be replaced as if it were free",
        "It deducts interest, so it understates company value",
        "It only applies to banks",
      ],
      answer: 1,
      explain: "EBITDA adds depreciation back, which amounts to assuming equipment never needs replacing. For capital-heavy companies, EBITDA and free cash flow can be far apart — the point of Buffett's jab about the tooth fairy paying for capital expenditures.",
    },
  ],

  further: [
    { label: "SEC: Beginners' Guide to Financial Statements — the official introduction to the three statements", url: "https://www.sec.gov/about/reports-publications/beginners-guide-financial-statements" },
    { label: "FASB: ASU 2023-08, accounting for and disclosure of crypto assets (fair-value measurement)", url: "https://www.fasb.org/" },
    { label: "SEC EDGAR full-text search — download any listed company's 10-K / 10-Q, including Strategy's", url: "https://www.sec.gov/edgar/search/" },
    { label: "Berkshire Hathaway shareholder letters — Buffett on EBITDA and “owner earnings”", url: "https://www.berkshirehathaway.com/letters/letters.html" },
  ],
};
