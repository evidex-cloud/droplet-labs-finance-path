export default {
  id: "preferred-tax-roc",
  stage: 17,
  order: 7,
  title: "Tax & Return of Capital: Why a Preferred Dividend May Not Count as Income",
  difficulty: "dat",
  prereqs: ["preferred-stock", "dat-accounting"],

  oneLiner:
    "You receive a $10 \"preferred dividend,\" but on your year-end 1099-DIV it may not be a dividend at all. It may be a **return of capital (ROC)**: no tax that year, just a cut in your **cost basis** from $100 to $90, with the tax coming as a capital gain when you sell. The reason is a US tax concept: a corporate distribution counts as a dividend only to the extent the company has **\"earnings and profits\" (E&P)**. Strategy says its tax E&P is negative and expects its preferred distributions to be treated as ROC; Strive reports SATA distributions as ROC month by month. This lesson explains the mechanism, how the arithmetic works, and what it does **not** mean. **This lesson is not tax advice**; tax treatment varies by country and by person.",

  intuition: `
When Stage 6.2 covered preferred stock, it mentioned in passing that US preferred dividends are often treated as "qualified dividends" and taxed at lower rates, though not always. Now look at a more unusual case.

Say you buy one share of STRF for $100 and receive $10 a year. Naturally you assume the $10 is "income" and taxable. But US tax law says: **money a corporation distributes to its shareholders is a "dividend" only to the extent it comes out of the company's "earnings and profits" (E&P).** If the company has no E&P, neither this year nor accumulated over past years, the distribution isn't a dividend for tax purposes. It is a **return of capital (ROC)**:

- It is **not included in taxable income** that year.
- But your **cost basis**, the "book cost" of your share for tax purposes, is reduced: $100 → $90.
- When you sell, the sale price minus the reduced basis is taxed as a **capital gain**.

A worked example. You hold for five years and all $10 each year is ROC, so your basis falls from $100 to $50. At the end of year five you sell at $100: capital gain = $100 − $50 = **$50**. Held for over a year, that $50 is taxed at the long-term capital gains rate (15% federal for most people). Compare: if the same money had arrived as ordinary dividends taxed at a 32% marginal rate, you'd pay $3.20 every year. **ROC does two things: it pushes the tax back to the sale (deferral), and it can turn "ordinary income" into "capital gains" (rate conversion).**

In its earnings materials Strategy has said that because its tax E&P is negative, it expects its preferred distributions to be treated as **tax-deferred return of capital**; Strive also treats SATA distributions as return of capital and files a Form 8937 every month. For income investors that's a real selling point: the same 10% coupon can mean a noticeably higher after-tax return.

But understand its limits. **ROC is a tax label, not an economic fact.** It doesn't mean the company "is handing your principal back." The cash Strategy uses to pay dividends comes mainly from issuing new securities and from its USD Reserve (Stage 16.6). Nor is it permanent: E&P is recomputed every year, and if the company has positive E&P in some year (say it sells bitcoin at a realized gain), that year's distributions may become taxable dividends.

This lesson doesn't belong to any single one of the four big ideas; it is a tax-side view of **Idea ② (claims)**: the label the tax code puts on a given cash payment decides whether it counts as "income" or as "recovery of cost." It also ties back to Stage 15.6: accounting profit, taxable profit and E&P are three different sets of books. **This lesson explains mechanisms and analytical frameworks only; it is neither investment advice nor tax advice. Tax treatment depends on your country, account type and circumstances; consult a qualified tax professional.**

**In this lesson we break it into five pieces:**

- **① The three "buckets" of a distribution: dividend, return of capital, capital gain**
- **② What E&P is: not accounting profit, and not taxable income either**
- **③ The facts for Strategy and Strive (as of September 2026)**
- **④ What it means for holders: cost basis, deferral and rate conversion**
- **⑤ The limits of ROC: what it isn't, when it changes, who benefits most**
`,

  mechanics: `
### ① The three "buckets" of a distribution: dividend, return of capital, capital gain

Section 301 of the US Internal Revenue Code sets the order in which a corporate distribution is treated, and Section 316 defines a "dividend." Think of it as a **three-tier waterfall** exactly like the capital-stack waterfall of Stage 6.1:

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The tax waterfall of a $10 distribution (US federal, illustrative)</text><rect x="20" y="44" width="120" height="60" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="80" y="70" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">$10 distribution</text><text x="80" y="88" text-anchor="middle" font-size="10" fill="var(--muted)">cash received</text><line x1="140" y1="74" x2="176" y2="74" stroke="var(--muted)" stroke-width="1.5"/><polygon points="176,70 180,74 176,78" fill="var(--muted)"/><rect x="180" y="40" width="440" height="60" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="196" y="62" font-size="12" font-weight="700" fill="var(--ink)">Bucket 1: dividend (out of current, then accumulated E&amp;P)</text><text x="196" y="82" font-size="10" fill="var(--muted)">taxed this year: qualified at capital-gains rates, otherwise as ordinary income</text><rect x="180" y="112" width="440" height="60" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="196" y="134" font-size="12" font-weight="700" fill="var(--ink)">Bucket 2: return of capital (beyond E&amp;P, until basis hits 0)</text><text x="196" y="154" font-size="10" fill="var(--muted)">not taxed this year; basis $100 → $90 (1099-DIV box 3, "nondividend distributions")</text><rect x="180" y="184" width="440" height="60" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="196" y="206" font-size="12" font-weight="700" fill="var(--ink)">Bucket 3: capital gain (anything after basis reaches 0)</text><text x="196" y="226" font-size="10" fill="var(--muted)">taxed this year as a capital gain (long-term if held over a year)</text><path d="M400 100 L400 112" stroke="var(--muted)" stroke-width="1.5"/><path d="M400 172 L400 184" stroke="var(--muted)" stroke-width="1.5"/><text x="410" y="109" font-size="9" fill="var(--muted)">flows down only once E&amp;P is used up</text><text x="410" y="181" font-size="9" fill="var(--muted)">flows down only once basis is used up</text><text x="320" y="268" text-anchor="middle" font-size="10" fill="var(--orange-ink)">With negative E&amp;P, the distribution skips bucket 1 and lands in bucket 2: "return of capital"</text></svg><figcaption>Like the capital-stack waterfall, tax character "fills the upper tier before flowing down": dividend first (up to E&amp;P), then return of capital (up to basis), and only then capital gain.</figcaption></figure>

Two key details:

- **Current E&P comes first.** Even if a company has an accumulated deficit (negative accumulated E&P), as long as its **current-year** E&P is positive, that year's distributions are dividends up to that amount. So ROC generally requires both current and accumulated E&P to be insufficient.
- **Pro rata allocation.** When there are several distributions in a year, current E&P is spread across them proportionally. That's why companies can usually determine how much of each payment is ROC only **after the year ends**, reporting it on the 1099-DIV early the following year.

### ② What E&P is: not accounting profit, and not taxable income either

E&P is a set of books the tax code uses to measure whether a company has economic profit available to distribute. It starts from taxable income and makes a series of adjustments (adding back certain tax-exempt income, deducting certain non-deductible expenses, using slower depreciation), **but it is a different thing from net income in the financial statements**.

This matters especially for DATs, because the three sets of books diverge so far:

<table class="pm">
<tr><th>Set of books</th><th>How bitcoin's gains and losses enter</th><th>Strategy example</th></tr>
<tr><td>GAAP net income (financial statements)</td><td>Since adopting ASU 2023-08 on 2025-01-01, bitcoin is held at fair value, so <b>unrealized</b> gains and losses flow straight into earnings</td><td>Q2 2025 net income +$10.02B; Q1 2026 −$12.54B and Q2 2026 −$8.22B (Stage 15.6)</td></tr>
<tr><td>Taxable income / E&P</td><td>Gains or losses are generally recognized when <b>realized</b> by a sale; unrealized moves usually don't enter</td><td>The company says its tax E&P is negative and expects preferred distributions to be ROC</td></tr>
<tr><td>CAMT's "adjusted financial statement income" (AFSI)</td><td>Built from book income, so it could have pulled unrealized gains into the 15% corporate alternative minimum tax</td><td>Interim Treasury/IRS guidance of 2025-09-30 allows unrealized digital-asset gains and losses to be disregarded; Strategy plans to exclude them (the exact notice number is unverified)</td></tr>
</table>

Hence a seeming paradox: **a company can "earn" ten billion dollars in a quarter on its financial statements (bitcoin went up) and still have no E&P for tax purposes**, because that ten billion is unrealized. Conversely, huge GAAP losses don't translate directly into E&P losses either. Strategy's deferred tax liability falling from $1.93 billion at December 31, 2025 to about $1.4 million at June 30, 2026 (with a valuation allowance recorded) is another glimpse of the gap between the accounting and tax books.

What **increases** E&P? Most directly, **realized gains**: selling bitcoin above its tax cost. What **reduces** it? Realized losses, interest expense and so on. Strategy sold about 6,948 BTC in 2026, mostly at prices around $60,000, while its average cost is about $75,000. On average cost, those sales look more likely to have realized **losses** than gains, but the actual tax result depends on which lots are treated as sold (lots carry different costs), and **we cannot confirm it from public sources**.

### ③ The facts for Strategy and Strive (as of September 2026)

- **Strategy:** in its Q3 2025 earnings materials and a June 2026 8-K, it said that because its tax E&P is negative, it **expects** its preferred distributions to be treated as tax-deferred return of capital. By July 26, 2026 it had paid $1.06 billion of cumulative preferred dividends, all, it says, in full and on time. The word "expects" matters: the final character is set by each year's tax reporting and the 1099-DIV.
- **Strive:** SATA distributions are treated as return of capital, and the company files a Form 8937 ("Report of Organizational Actions Affecting Basis of Securities") **every month**, disclosing each distribution's effect on basis (Stage 17.5). SATA has paid daily since June 15, 2026, with an annual dividend obligation of about $145.4 million.
- **STRE:** paid in euros and listed in Luxembourg, aimed at European investors. For non-US investors, the treatment (withholding, and how their home country characterizes the payment) depends on local law and tax treaties; the US ROC conclusion **cannot** simply be carried over.

In general (not addressed to any individual): the final character of distributions is reported on the 1099-DIV early the following year, with dividends in boxes 1a/1b and nondividend distributions (ROC) in box 3.

### ④ What it means for holders: cost basis, deferral and rate conversion

A full example (US individual investor, taxable account, illustrative rates): buy one share of STRF at $100, receive $10 a year, and sell at $100 after five years.

<table class="pm">
<tr><th>Assumption</th><th>Tax paid each year while holding</th><th>Tax paid on sale</th><th>Total over 5 years</th><th>Present value of the tax at 5%</th></tr>
<tr><td>Ordinary dividends (32% marginal rate)</td><td>$3.20</td><td>0 (basis $100, sale $100)</td><td>$16.00</td><td>about $13.85</td></tr>
<tr><td>Qualified dividends (15%)</td><td>$1.50</td><td>0</td><td>$7.50</td><td>about $6.49</td></tr>
<tr><td>All return of capital (long-term gains at 15%)</td><td>0</td><td>($100 − $50) × 15% = $7.50</td><td>$7.50</td><td>about $5.88</td></tr>
</table>

$$
cost basis = purchase price − cumulative return of capital (not below 0)
capital gain on sale = sale price − adjusted cost basis
once basis reaches 0, further "return of capital" becomes a capital gain in the year received
$$

Three effects:

- **Deferral.** Tax moves from every year to the year of sale (Stage 2.3: the same tax paid later costs less).
- **Rate conversion.** Money that might have been taxed at ordinary-income rates is taxed at long-term capital gains rates instead.
- **The basis "floor."** Hold for ten years with $10 a year of ROC and your basis reaches 0; from year eleven, distributions are taxed as capital gains in the year received, even if the company still has no E&P.

Some rules that are often overlooked (general descriptions only; whether they apply depends on your situation):

- **Tax-exempt or tax-deferred accounts** (such as a US IRA): distributions inside the account aren't taxed in the year anyway, so the ROC advantage largely disappears.
- **Corporate holders:** a US corporation receiving qualifying dividends may get the dividends-received deduction, which ROC doesn't; for some corporate holders a dividend is actually better.
- **Inheritance:** under current US law, heirs generally receive a "stepped-up" basis, which can reset a basis that ROC has pushed down; that makes ROC's deferral more valuable for investors who hold for life.
- **Non-US investors:** the US generally withholds tax on dividends, and the ROC portion is generally not a dividend, but when the character can't be determined before year-end, withholding agents may withhold on the full amount; rely on your broker and tax adviser.

### ⑤ The limits of ROC: what it isn't, when it changes, who benefits most

**ROC doesn't mean "the company is returning your principal."** In closed-end funds and some partnerships, a "return of capital" can literally mean handing investors back their own money (so-called "destructive" ROC). For DAT preferreds, ROC stems from the fact that **tax E&P is negative**: a tax characterization. Economically, the cash for the dividends comes from issuing new securities, from the USD Reserve or from selling bitcoin (Stage 16.6, Stage 17.6). Don't read a tax label as an economic verdict.

**ROC isn't permanent.** It depends on each year's E&P. Things that could change it include the company selling bitcoin above its tax cost and realizing a gain, its business generating taxable profit, or changes in tax law or IRS interpretation (such as final CAMT regulations). In any year E&P turns positive, that year's distributions may become partly or wholly taxable dividends.

**Who benefits most?** US individuals in taxable accounts, with high marginal rates, who plan to hold for a long time. For tax-exempt accounts, corporate holders and non-US investors, the benefit is much smaller or absent.

**The strongest case for:** for US taxable investors, ROC can make a 10%–13% cash yield tax-free in the year received and bring the eventual rate down to long-term capital gains levels. At the same coupon, the after-tax return is noticeably higher, which is one reason DAT preferreds attract income buyers (Stage 18.1 brings after-tax yield into valuation).

**The strongest case against:** ROC is only **deferral**, not exemption. It keeps pushing basis down, making the one-time tax bill on sale larger. It depends on the company's E&P each year, and that in turn depends on whether the company sells bitcoin at a profit: if bitcoin soars and the company sells coins at a gain, ROC can disappear. And it can mislead investors into thinking "this money isn't income, so it must be safer." The cheat sheet in Stage 20.4 includes the formulas for cost basis and after-tax yield. **This lesson explains mechanisms and analytical frameworks only; it is neither investment advice nor tax advice.**
`,

  demo: "preferred-tax-roc",

  analogy: `
Think of your cost basis as **a little notebook that says "deposit paid: $100."**

Each year the company hands you $10. At year-end the tax office glances at the company's "profit ledger" (its E&P):

- **The ledger shows a profit:** the $10 is "rental income" (a dividend). You pay tax this year, and the deposit in your notebook stays the same.
- **The ledger shows no profit:** the $10 is treated as "part of your deposit refunded" (return of capital). No tax this year, but the deposit in your notebook changes from $100 to $90.

Years later you sell the "lease," and your gain is the sale price minus **whatever deposit is left** in the notebook. The more deposit you've had refunded, the larger that final gain and the more tax you owe. The tax hasn't vanished; it's been pushed to the end, and often converted to a lower rate.

Once the deposit is refunded down to zero, anything more you receive can only count as "gain." And the company's profit ledger is checked afresh every year: in any year it suddenly shows a profit (say the company sold bitcoin at a gain), that year's $10 turns back into "rental income." **To understand ROC, look at the profit ledger, not at what the company says it earned this year.**
`,

  misconceptions: [
    "**\"Return of capital means tax-free.\"** — It means **deferred**: no tax this year, but your cost basis goes down, so you pay tax on a larger capital gain when you sell; and once basis reaches 0, further distributions are taxed as capital gains in the year received.",
    "**\"The company reported a loss, so its distributions must be return of capital.\"** — What decides the character is tax E&P, not GAAP net income. A DAT's GAAP earnings are dominated by unrealized bitcoin moves, while E&P generally recognizes gains only when realized; and if **current-year** E&P is positive, that year's distributions are dividends up to that amount.",
    "**\"ROC means the company is giving me my principal back.\"** — For DAT preferreds, ROC is a tax label arising from negative E&P; the cash for dividends comes from new issuance, the USD Reserve or bitcoin sales. Tax character is not economic substance.",
    "**\"If it's ROC this year, it will be ROC forever.\"** — E&P is recomputed every year. The company selling bitcoin above tax cost, turning a taxable profit, or a change in tax law can make one year's distributions taxable dividends; the final character is whatever the 1099-DIV says early the next year.",
    "**\"ROC is equally good for every investor.\"** — It's most valuable for US individuals in taxable accounts with high marginal rates who hold long-term; it barely matters in an IRA or other deferred account, may be worse than a dividend for corporate holders who can take the dividends-received deduction, and for non-US investors depends on local law and treaties.",
  ],

  quiz: [
    {
      q: "You buy a preferred share for $100 and receive $10 a year for three years, all of it classified as return of capital. What is your adjusted cost basis?",
      options: [
        "$100",
        "$130",
        "$70",
        "$0",
      ],
      answer: 2,
      explain: "**Cost basis = purchase price − cumulative return of capital** = $100 − $30 = $70. Sell at $100 afterward and the capital gain is $30.",
    },
    {
      q: "Under US tax law, when is a corporate distribution a \"dividend\"?",
      options: [
        "To the extent of the company's current or accumulated \"earnings and profits\" (E&P)",
        "Whenever the company declares it",
        "Whenever the company's GAAP net income is positive",
        "Whenever it is paid on preferred stock",
      ],
      answer: 0,
      explain: "Section 316: a dividend is limited to **E&P**, current-year first and then accumulated. Anything beyond that first reduces basis (return of capital), and anything beyond basis is a capital gain.",
    },
    {
      q: "Strategy's GAAP net income in Q2 2025 was about +$10 billion. Does that mean its preferred distributions that year must be taxable dividends?",
      options: [
        "Yes, GAAP profit is E&P",
        "Yes, because profit was positive",
        "No, because preferred distributions are always return of capital",
        "Not necessarily: that profit was mainly unrealized fair-value gains on bitcoin, while E&P generally recognizes gains only when realized",
      ],
      answer: 3,
      explain: "Since 2025, GAAP holds bitcoin at fair value, so unrealized moves hit earnings; E&P is a tax ledger that generally looks at **realized** gains and losses. The three sets of books (GAAP, taxable income / E&P, CAMT's AFSI) can't be used interchangeably.",
    },
    {
      q: "Which of these is most likely to turn a DAT preferred's distributions from return of capital into taxable dividends in a given year?",
      options: [
        "A fall in bitcoin's price",
        "The company sells bitcoin above its tax cost, realizing a gain that makes that year's E&P positive",
        "The company switches from monthly to daily payments",
        "The company issues a new preferred",
      ],
      answer: 1,
      explain: "**Realized gains increase E&P.** If current-year E&P is positive, that year's distributions are dividends up to that amount. Payment frequency and new issuance don't change E&P by themselves.",
    },
    {
      q: "For which investor is having preferred distributions classified as return of capital usually most valuable?",
      options: [
        "A US individual in a taxable account, with a high marginal rate, planning to hold long-term",
        "An investor holding in an IRA or other tax-deferred account",
        "A US corporation that can take the dividends-received deduction",
        "Every investor benefits exactly the same",
      ],
      answer: 0,
      explain: "ROC's value comes from **deferral and rate conversion**: the higher the marginal rate and the longer the hold, the bigger it is. Deferred accounts aren't taxed in the year anyway, and corporate holders may prefer deductible dividends. This question covers the general mechanism only and is not tax advice.",
    },
  ],

  further: [
    { label: "IRS Publication 550: Investment Income and Expenses (nondividend distributions and basis)", url: "https://www.irs.gov/publications/p550" },
    { label: "26 U.S.C. §301: tax treatment of corporate distributions (Cornell LII)", url: "https://www.law.cornell.edu/uscode/text/26/301" },
    { label: "26 U.S.C. §316: definition of a dividend and earnings and profits (Cornell LII)", url: "https://www.law.cornell.edu/uscode/text/26/316" },
    { label: "IRS Form 8937: Report of Organizational Actions Affecting Basis of Securities (about page)", url: "https://www.irs.gov/forms-pubs/about-form-8937" },
    { label: "Strategy 10-Q (Q2 2026): fair-value accounting, deferred taxes and CAMT", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000044/mstr-20260630.htm" },
  ],
};
