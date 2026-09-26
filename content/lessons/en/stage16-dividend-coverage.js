export default {
  id: "dividend-coverage",
  stage: 16,
  order: 6,
  title: "Dividend Obligations, the USD Reserve & Months of Coverage: Where the Cash Comes From",
  difficulty: "dat",
  prereqs: ["btc-rating", "leverage-coverage"],

  oneLiner:
    "BTC Rating answers \"will the building stand?\"; this lesson answers \"**can the rent be paid?**\" Bitcoin produces no cash, yet preferreds must be paid every month, every half-month, even every day. The cash can only come from four places: **new securities, the USD reserve, selling bitcoin, and operating businesses**. Orange Corp owes $15M a year and holds a $30M reserve → **24 months**; its \\(\\text{BTC Breakeven ARR} = \\dfrac{\\$15\\text{M}}{\\$1.0\\text{B}} = \\mathbf{1.5\\%}\\). Strategy's USD Reserve of about $5.04B as of 2026-09-20 covers roughly **3.1 years** of about $1.62B in annual obligations (derived). This lesson shows how to count obligations and reserves, what USD Duration and the ARR metrics mean, and how long a DAT can last with capital markets shut.",

  intuition: `
Someone puts their entire savings into bitcoin and also owes a fixed rent every month. Bitcoin pays no interest, so where does the rent come from? There are only four routes:

1. **Borrow more or bring in partners** — raise money from others;
2. **Draw on a cash buffer** kept in the bank;
3. **Sell some bitcoin**;
4. **Use a salary** — if there's a job.

A digital asset treasury company (DAT) faces exactly the same problem. Stage 16.5's BTC Rating tells you how many times the company's bitcoin covers its preferreds — an **asset** question: will the building stand? This lesson is about **cash flow**: can the rent be paid? They're not the same: you can live in a very valuable house and still be unable to pay next month's rent.

Orange Corp from Stage 15.1: the convertibles pay 0%, so no interest; Orange-F is \\(\\$100\\text{M} \\times 10\\% = \\$10\\text{M}\\); Orange-D is \\(\\$50\\text{M} \\times 10\\% = \\$5\\text{M}\\). **Its annual cash obligation is $15M.** It holds a $30M USD reserve:

- The reserve lasts \\(\\dfrac{\\$30\\text{M}}{\\$15\\text{M}} \\times 12 = \\mathbf{24}\\ \\text{months}\\) — "months of coverage", the reserve coverage of Stage 6.5.
- $15M a year is \\(\\dfrac{\\$15\\text{M}}{\\$1.0\\text{B}} = \\mathbf{1.5\\%}\\) of the bitcoin reserve — what Strategy calls the **BTC Breakeven ARR**: if bitcoin rises just 1.5% a year, selling only the appreciation pays the dividends and the dollar value of the bitcoin reserve stays constant.

Strategy is far larger but built the same way. As of 2026-08-23 its annual interest and dividend obligations were **$1.703B** (STRC alone about $1.197B, roughly $49.9M every half-month), with a **$5.10B** USD Reserve plus $1.59B of "USD Cash"; its BTC Breakeven ARR was **2.63%**. On 2025-12-01 it sold common stock specifically to build this reserve ($1.44B, about 21 months of coverage at the time); in June 2026 the board wrote "at least 12 months of dividends and interest" into policy.

Three points matter most:

- **The obligations are rigid; the sources are conditional.** Of the four sources, new issuance depends on the market being willing to buy (mNAV and preferred prices), the reserve runs out, selling coins lowers BTC per share (Stage 16.3), and for most DATs the operating business is small.
- **Months of coverage means "how long can we last"; Breakeven ARR means "how much growth do we need".** One asks how long the company can hold out with capital markets shut; the other asks how much bitcoin must rise to avoid eating into principal.
- **Cumulative versus non-cumulative becomes real here.** If markets close and the reserve runs dry, a company can suspend non-cumulative preferred dividends (nothing is owed later), while cumulative dividends accrue and may even step up (Stage 6.3).

This lesson rests on **Idea ② (balance sheets and claims)** and **Idea ③ (liquidity and trust)**: however large the assets, a lack of liquidity can still cause trouble — the run logic of Stage 10.1. A DAT's design choices (no margin calls, perpetual instruments, a reserve) exist to avoid being broken at exactly this liquidity step. Stage 18.2 will put these coverage months into a full stress test, and Stage 17.7 explains why these distributions are often treated as return of capital. This lesson explains mechanics and analytical frameworks only; it is not investment advice.

**This lesson, in five parts:**

- **① The obligations: how much interest and dividends per year**
- **② Where the cash comes from: issuance, reserve, coin sales, operations**
- **③ Months of coverage, USD Duration and BTC Duration**
- **④ Breakeven, Hurdle and Floor: three ARR metrics**
- **⑤ The freeze scenario: how long with capital markets shut**
`,

  mechanics: `
### ① The obligations: how much interest and dividends per year

Start by listing the rigid cash obligations:

$$ \\text{Annual obligations} = \\sum \\text{debt principal} \\times \\text{coupon} + \\sum \\text{preferred notional} \\times \\text{dividend rate}

<table class="pm">
<tr><th>Orange Corp</th><th>Notional</th><th>Rate</th><th>Annual cash obligation</th><th>Cumulative?</th></tr>
<tr><td>Convertibles</td><td>$150M</td><td>0%</td><td>0</td><td>— (debt: non-payment is default)</td></tr>
<tr><td>Orange-F</td><td>$100M</td><td>10%</td><td>$10M</td><td>Cumulative</td></tr>
<tr><td>Orange-D</td><td>$50M</td><td>10%</td><td>$5M</td><td>Non-cumulative</td></tr>
<tr><td><b>Total</b></td><td></td><td></td><td><b>$15M</b></td><td></td></tr>
</table>

Strategy's equivalents (always check the latest disclosure):

- Convertible principal of $6.71B carries about **$35M** a year of cash interest (derived: \\(0.625\\% \\times \\$1.81\\text{B} + 0.875\\% \\times \\$0.604\\text{B} + 2.25\\% \\times \\$0.8\\text{B}\\); the 0% notes pay nothing).
- Total annual interest and dividends: **$1.703B** (2026-08-23), of which STRC $1.197B; the 10-Q put it at about $1.76B as of 2026-06-30 and 07-24.
- After September's roughly $656M of STRC buybacks, about **$1.62B** (derived: \\(\\$1.703\\text{B} - \\$0.656\\text{B} \\times 12\\% \\approx \\$1.62\\text{B}\\)).
- By 2026-07-26 cumulative preferred dividends paid totalled $1.06B. The company says dividends have been paid in full and on time since its first preferred launched, and expects them to be treated as **return of capital** because it has negative tax earnings and profits (Stage 17.7).

**Payments are getting more frequent.** STRC moved from monthly to semi-monthly on 2026-06-30; on 2026-09-24/25 the board proposed **daily** record dates for STRF, STRC, STRK and STRD, with a special meeting set for 2026-10-28. Strive's SATA has paid daily since 2026-06-15, with annual dividends of **$145.39M** (\\(\\$1.118\\text{B notional} \\times 13\\%\\)). Frequency doesn't change the annual total, but it tightens cash management: there has to be money every day.

**Terms decide what "can't pay" means** (Stage 6.3):

- **Non-cumulative** (STRD, Orange-D): a skipped dividend is gone for good.
- **Cumulative** (STRF, STRC, STRK, STRE, SATA, Orange-F): a skipped dividend is owed. Unpaid STRF and STRE dividends compound at the regular rate + 100 bp, rising another 100 bp per period to a maximum of 18%; SATA's compound at the rate + 25 bp, rising 25 bp a month to a 20% cap. STRF and STRK holders also gain board-seat rights when dividends are missed.

### ② Where the cash comes from: issuance, reserve, coin sales, operations

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Where a DAT's cash comes from: four sources → one rigid obligation</text><rect x="20" y="40" width="190" height="44" rx="6" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="115" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">① New securities (ATM)</text><text x="115" y="75" text-anchor="middle" font-size="10" fill="var(--muted)">Needs buyers; dilutive at low mNAV</text><rect x="20" y="96" width="190" height="44" rx="6" fill="var(--green-soft)" stroke="var(--green)"/><text x="115" y="114" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">② USD reserve</text><text x="115" y="131" text-anchor="middle" font-size="10" fill="var(--muted)">Finite; usually funded by selling common</text><rect x="20" y="152" width="190" height="44" rx="6" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="115" y="170" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">③ Sell bitcoin</text><text x="115" y="187" text-anchor="middle" font-size="10" fill="var(--muted)">Cuts BTC/share; sells low in drawdowns</text><rect x="20" y="208" width="190" height="44" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="115" y="226" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">④ Operating business</text><text x="115" y="243" text-anchor="middle" font-size="10" fill="var(--muted)">Small or absent at most DATs</text><line x1="210" y1="62" x2="360" y2="140" stroke="var(--muted)" stroke-width="1.5"/><line x1="210" y1="118" x2="360" y2="145" stroke="var(--muted)" stroke-width="1.5"/><line x1="210" y1="174" x2="360" y2="150" stroke="var(--muted)" stroke-width="1.5"/><line x1="210" y1="230" x2="360" y2="155" stroke="var(--muted)" stroke-width="1.5"/><rect x="360" y="110" width="130" height="80" rx="8" fill="var(--surface-2)" stroke="var(--ink)"/><text x="425" y="136" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Annual obligations</text><text x="425" y="156" text-anchor="middle" font-size="11" fill="var(--ink)">Orange Corp $15M</text><text x="425" y="174" text-anchor="middle" font-size="11" fill="var(--ink)">Strategy ~$1.6–1.7B</text><line x1="490" y1="150" x2="530" y2="150" stroke="var(--muted)" stroke-width="1.5"/><polygon points="530,145 540,150 530,155" fill="var(--muted)"/><rect x="545" y="120" width="85" height="60" rx="6" fill="var(--red-soft)" stroke="var(--red)"/><text x="587" y="145" text-anchor="middle" font-size="11" fill="var(--ink)">Preferred and</text><text x="587" y="162" text-anchor="middle" font-size="11" fill="var(--ink)">bond holders</text><text x="320" y="272" text-anchor="middle" font-size="10" fill="var(--muted)">Bitcoin itself produces no cash: every dividend dollar must come through one of these four doors</text></svg><figcaption>Each source has a cost: issuance depends on the market, the reserve runs out, coin sales cut BTC per share, and operating income is too small at most DATs. Coverage analysis asks: when one door closes, how long can the others hold?</figcaption></figure>

- **① New securities.** Strategy's main source: $20.319B raised through ATMs in 2026 up to 2026-08-23 (common $12.796B, preferred $7.524B). Selling common to pay dividends is roughly harmless to Net BTC per share when mNAV (2026 definition) is above 1, and dilutive below it (Stage 16.7). **Paying old preferred dividends with new preferred money** is what critics call "Ponzi-like"; supporters reply that every issuer refinances, and what matters is whether the assets cover the claims (Stage 16.5). Both points have force — the real question is whether capital markets stay open.
- **② USD reserve** — see ③. It is usually built by **selling common stock** (the $1.44B of 2025-12-01 came from selling at about 1.17x mNAV), so its cost ultimately falls on the common (Stage 16.3's "issuing to hold cash lowers BTC Yield").
- **③ Selling bitcoin.** Between 2026-05-26 and 05-31 Strategy sold 32 BTC (about $2.5M) to fund STRC dividends — its first sale since 2022; across 2026 it sold about 6,948 BTC for dividends, the reserve and STRC buybacks. The "Digital Credit Capital Framework" of 2026-06-29 created a **BTC Monetization Program**: sell bitcoin to raise up to $1.25B for the reserve, to fund dividends and interest when that beats issuing equity, and to fund buybacks. Coin sales lower BTC per share directly, and in a drawdown they mean selling low (Stage 16.4).
- **④ Operating business.** Strategy still runs a software business with Q2 2026 software **revenue** of $122.4M (revenue isn't profit available for dividends); Strive has asset management and Semler's medical-device business (Q2 revenue of $1.39M). Against obligations in the billions, these are minor.

### ③ Months of coverage, USD Duration and BTC Duration

$$ \\text{Months of coverage} = \\frac{\\text{USD reserve}}{\\text{annual obligations}} \\times 12
$$ \\text{USD Duration (years)} = \\frac{\\text{USD assets}}{\\text{annual obligations}}
$$ \\text{BTC Duration (years)} = \\frac{\\text{BTC Reserve}}{\\text{annual obligations}}

Orange Corp: \\(\\text{months of coverage} = \\dfrac{\\$30\\text{M}}{\\$15\\text{M}} \\times 12 = \\mathbf{24}\\ \\text{months}\\); \\(\\text{USD Duration} = \\mathbf{2}\\ \\text{years}\\); \\(\\text{BTC Duration} = \\dfrac{\\$1.0\\text{B}}{\\$15\\text{M}} \\approx \\mathbf{66.7}\\ \\text{years}\\).

How Strategy's reserves evolved (the USD Reserve is only for preferred dividends and debt interest; USD Cash, created in August 2026, is flexible liquidity that can fund bitcoin purchases, buybacks, note repayment or reserve top-ups):

<table class="pm">
<tr><th>Date</th><th>USD Reserve</th><th>USD Cash</th><th>Coverage</th></tr>
<tr><td>2025-12-01</td><td>$1.44B</td><td>—</td><td>21 months</td></tr>
<tr><td>2026-02-13</td><td>$2.25B</td><td>—</td><td>—</td></tr>
<tr><td>2026-06-30</td><td>$2.40B</td><td>—</td><td>about 16 months</td></tr>
<tr><td>2026-07-24/26</td><td>$3.75B</td><td>—</td><td>about 26 months ("over 2.1 years")</td></tr>
<tr><td>2026-08-23</td><td>$5.10B</td><td>$1.59B</td><td>"3.9 yrs" (USD Duration on USD Assets)</td></tr>
<tr><td>2026-09-20</td><td>$5.04B</td><td>$1.05B</td><td>about 3.1 years (about 37 months, on about $1.62B a year; derived)</td></tr>
</table>

Some definitional details:

- **Reserve or all USD assets in the numerator?** "Months of coverage" usually uses the USD Reserve alone; Strategy's **USD Duration** uses USD Assets (Reserve plus USD Cash): \\(\\dfrac{6.69}{1.703} \\approx \\mathbf{3.9}\\ \\text{years}\\) on 2026-08-23. Saylor's phrase on 2026-09-25 was a "3.8 year USD duration".
- **BTC Duration** \\(= \\dfrac{\\text{BTC Reserve}}{\\text{annual obligations}}\\): \\(\\dfrac{64.718}{1.703} \\approx \\mathbf{38.0}\\ \\text{years}\\) on 2026-08-23; on 2026-09-25 Saylor cited "about 42 years of dividend duration" on roughly "$68 billion" of bitcoin. It means that, selling only coins at a constant price, obligations could be met for that many years — with every year of selling shaving BTC per share.
- **Policy floor.** Since June 2026 a board policy requires the reserve to cover at least **12 months** of expected dividends and interest, with any other use needing board approval. Strive targets an **18-month** dividend reserve: 12 months in cash plus 6 months in STRC (2026-03-11) — note that part of its reserve is another DAT's preferred, which could itself fall in a crisis.

### ④ Breakeven, Hurdle and Floor: three ARR metrics

ARR here means bitcoin's annualized rate of return. Strategy defines three thresholds around it:

<table class="pm">
<tr><th>Metric</th><th>Official meaning</th><th>Strategy value</th><th>Orange Corp</th></tr>
<tr><td><b>BTC Breakeven ARR</b></td><td>"the ratio of Annual Int + Div to the BTC Reserve" — \\(\\dfrac{\\text{annual interest and dividends}}{\\text{BTC Reserve}}\\)</td><td>2.63% (2026-08-23, \\(\\dfrac{1.703}{64.718}\\)); 1.35% (2025-11-28)</td><td>\\(\\dfrac{\\$15\\text{M}}{\\$1.0\\text{B}} = \\mathbf{1.5\\%}\\)</td></tr>
<tr><td><b>BTC Hurdle ARR</b></td><td>"Strategy's current effective cost of credit": if bitcoin's ARR beats it, Net BTC per share appreciates faster than bitcoin</td><td>10.74% (2026-08-23); 10.77% (08-10); 10.8% (07-30). <b>Exact formula not published</b></td><td>Simple analogue: \\(\\dfrac{\\text{dividends}}{\\text{senior claims}} = \\dfrac{\\$15\\text{M}}{\\$300\\text{M}} = 5\\%\\) (the 0% converts pull the average cost down)</td></tr>
<tr><td><b>BTC Floor ARR</b></td><td>The lowest constant ARR over the credit structure's weighted-average duration that keeps 1.0x coverage of net debt and preferred after funding interest and dividends</td><td>−15.64% (2026-08-23); −11.53% (08-10)</td><td>Simplified illustration: about −11% (below)</td></tr>
</table>

The three answer three different questions:

- **Breakeven:** how much must bitcoin rise so that selling only the gain pays a year's obligations without shrinking the reserve's dollar value? Orange Corp 1.5%, Strategy 2.63%.
- **Hurdle:** how much must bitcoin rise for leverage to be **adding** value rather than **subtracting** it? That's the cost of capital (Stage 16.4, Stage 16.7).
- **Floor:** how much can bitcoin fall each year and still just cover all senior claims at the end of the weighted-average duration? A "how bad can it get" measure — the more negative, the sturdier.

A simplified Floor ARR for Orange Corp (our own simplified reading; **Strategy's exact method isn't published**): first the weighted-average duration; eight years of dividends total $120M; net senior claims are \\(\\$300\\text{M} - \\$30\\text{M (cash)} = \\$270\\text{M}\\); then solve for the annual return \\(g\\):

$$
\\text{weighted-average duration} = \\frac{1.5 \\times 5 + 1 \\times 11 + 0.5 \\times 11}{3} = 8\\ \\text{years}
\\$1.0\\text{B} \\times (1 + g)^{8} - \\$120\\text{M} \\ge \\$270\\text{M}
(1 + g)^{8} \\ge 0.39 \\;\\Rightarrow\\; g \\approx \\mathbf{-11\\%}
$$

In words: bitcoin could fall 11% a year for eight straight years and, after the dividends paid out, the remaining coins would just cover the senior layers.

### ⑤ The freeze scenario: how long with capital markets shut

The core stress-test question: **what if, from tomorrow, not a single share or preferred can be sold?**

Orange Corp, with the bitcoin price unchanged:

- Months 1 through 24: the USD reserve pays; not a coin is touched.
- From month 25: sell $15M of bitcoin a year, i.e. \\(\\dfrac{\\$15\\text{M}}{\\$100{,}000} = \\mathbf{150}\\ \\text{BTC a year}\\) (1.5% of holdings). By the end of year ten, about **8,800 BTC** remain (\\(10{,}000 - 8 \\times 150 = 8{,}800\\), constant price).
- If bitcoin drops to $50,000, it must sell **300 BTC a year** (3%), and the F layer's coverage is down to 2.0x.

Strategy's orders of magnitude (derived from September 2026 data): the reserve covers about 3.1 years; after that, funding everything by selling coins at about $1.62B a year and about $84,000 per bitcoin means roughly **19,000 BTC a year** (about 2.3% of 846,000); at $50,000, about 32,000 BTC (3.8%).

The company has other levers. Suspending **non-cumulative** preferred (STRD) dividends creates no arrears; cumulative dividends can be deferred but accrue and step up, and may trigger board-seat rights; and STRK's dividends can be paid in cash, MSTR stock or a mix.

**The bull argument:** no margin calls, no huge near-term debt maturity (the earliest convertible put is $1.01B on 2027-09-15), years of reserve, decades of BTC Duration — a "death spiral" needs forced selling, and this structure has no forced-selling trigger. **The bear argument:** the reserve was built by diluting the common; selling coins for dividends in a bear market realises value at the lows; each sale lowers BTC per share, can depress mNAV, and further closes the issuance window — the reflexivity of Stage 10.4 and the "spiral" debated in Stage 18.3. Both are partly right: **the structure rules out sudden death, but it can't prevent a slow bleed.**

**Bottom line: BTC Rating asks "are the assets enough?", months of coverage asks "is the cash enough?", and Breakeven ARR asks "how much growth avoids eating principal?"** You need all three. This lesson explains mechanics and analytical frameworks only; it is not investment advice.
`,

  demo: "dividend-coverage",

  analogy: `
Picture a **landlord** who has swapped everything for a collection of antiques that appreciates but earns no rent — and who has promised friends and family a fixed "dividend" every month.

Where does the cash come from?

- Easiest is to **bring in more friends as partners** — as long as they're willing, new money pays the old dividends;
- Next is **the cash in the drawer** — enough for two years;
- Failing that, **sell an antique** — but when the antiques market is depressed, you sell at the worst prices;
- If there's also a **day job**, the salary helps a little.

"Months of coverage" asks: if nobody new joins from tomorrow, how many months does the drawer last? "Breakeven" asks: how much must the antiques appreciate each year so that selling only the appreciation covers the dividends?

And the "dividends" come in two kinds: "if I can't pay this month, forget it" (non-cumulative), and "if I can't pay this month, it goes on the tab, with interest" (cumulative). The first gives the landlord breathing room; the second keeps growing.
`,

  misconceptions: [
    "**\"A high BTC Rating means dividends will be paid.\"** — Coverage is an asset question; dividends are a cash question. Bitcoin produces no cash, so every dividend dollar must come from issuance, the reserve, coin sales or operations.",
    "**\"The USD reserve is free money.\"** — Strategy built its reserve mainly by selling common stock ($1.44B at about 1.17x mNAV on 2025-12-01). The common bears that cost, and it drags down BTC Yield.",
    "**\"Months of coverage and USD Duration are the same thing.\"** — Months of coverage usually uses the USD Reserve alone; Strategy's USD Duration uses all USD Assets (Reserve plus USD Cash). The \"3.9 years\" of 2026-08-23 is the latter.",
    "**\"A 2.63% BTC Breakeven ARR is Strategy's cost of capital.\"** — It's annual obligations as a share of the entire bitcoin reserve. The cost of capital is closer to the BTC Hurdle ARR (10.74% on 2026-08-23): bitcoin must beat that for leverage to add value.",
    "**\"If it can't pay dividends, the company defaults and goes bankrupt.\"** — Preferred dividends aren't debt: non-cumulative ones can simply be skipped; cumulative ones accrue and step up. Only missed debt interest or principal is a default. The price is paid in credibility, share price and future access to capital.",
  ],

  quiz: [
    {
      q: "Orange Corp pays $15M a year in preferred dividends and holds a $30M USD reserve. How many months of coverage is that?",
      options: [
        "12 months",
        "24 months",
        "18 months",
        "36 months",
      ],
      answer: 1,
      explain: "\\(\\text{Months of coverage} = \\dfrac{\\$30\\text{M}}{\\$15\\text{M}} \\times 12 = \\mathbf{24}\\ \\text{months}\\) (monthsCovered in _fin.js).",
    },
    {
      q: "How does Strategy define BTC Breakeven ARR?",
      options: [
        "\\(\\text{Annual interest and dividends} \\div \\text{BTC Reserve}\\)",
        "Strategy's current effective cost of credit",
        "The lowest return that keeps 1x coverage after paying dividends",
        "Bitcoin's actual return over the past year",
      ],
      answer: 0,
      explain: "Official text: \"the ratio of Annual Int + Div to the BTC Reserve\". On 2026-08-23: \\(\\dfrac{1.703}{64.718} = \\mathbf{2.63\\%}\\). The second option is Hurdle ARR, the third is Floor ARR.",
    },
    {
      q: "On 2026-08-23 Strategy reported a USD Duration of 3.9 years and a BTC Duration of 38.0 years. What does the latter most accurately mean?",
      options: [
        "Strategy's preferreds mature in 38 years",
        "Bitcoin will double in 38 years",
        "The average term of Strategy's convertibles is 38 years",
        "At current prices the BTC Reserve could pay about 38 years of annual interest and dividends (\\(64.718 \\div 1.703\\))",
      ],
      answer: 3,
      explain: "\\(\\text{BTC Duration} = \\dfrac{\\text{BTC Reserve}}{\\text{annual obligations}} = \\dfrac{64.718}{1.703} \\approx \\mathbf{38.0}\\ \\text{years}\\). The cost: every year of selling shaves BTC per share.",
    },
    {
      q: "With capital markets fully shut and the reserve exhausted, which of these constrains the company **least**?",
      options: [
        "Unpaid dividends on a cumulative preferred such as STRF",
        "Interest and puts on the convertibles",
        "Dividends on a non-cumulative preferred such as STRD",
        "Board-seat rights triggered by missed cumulative dividends",
      ],
      answer: 2,
      explain: "Skipped **non-cumulative** dividends are never made up and create no arrears. Cumulative dividends accrue and step up (STRF up to 18%), and missing convertible payments is a default.",
    },
    {
      q: "Strive's 18-month dividend reserve is 12 months in cash plus 6 months in STRC. What's the most notable risk in this design?",
      options: [
        "The cash will be taxed",
        "STRC is another DAT's preferred and could fall at the same time as Strive's own securities in a bitcoin crisis",
        "STRC pays no dividends",
        "18 months exceeds a legal limit",
      ],
      answer: 1,
      explain: "Holding another bitcoin treasury's security in the reserve means that when the reserve is most needed (a bitcoin crash) its value may also fall — **correlation** makes that slice less reliable than cash.",
    },
  ],

  further: [
    { label: "Strategy 8-K, 2026-06-29 (Digital Credit Capital Framework: reserve policy, buybacks, BTC Monetization Program)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526286871/mstr-20260629.htm" },
    { label: "Strategy investor briefing FWP, 2026-08-24 (annual obligations, USD/BTC Duration, Breakeven/Hurdle/Floor ARR)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strategy 8-K, 2026-09-21 (holdings, USD Reserve and STRC buybacks as of 2026-09-20)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526396093/mstr-20260914.htm" },
    { label: "Strive treasury dashboard (SATA annual dividend obligation and reserve target)", url: "https://strive.com/treasury" },
  ],
};
