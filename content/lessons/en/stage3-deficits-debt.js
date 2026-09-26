export default {
  id: "deficits-debt",
  stage: 3,
  order: 3,
  title: "Budgets, Deficits & the National Debt: How a Country Borrows",
  difficulty: "intro",
  prereqs: ["gdp-cycle", "risk-free-rate"],

  oneLiner:
    "**A deficit is how much more a government spends than it collects in a year (a flow); the debt is all those deficits piled up (a stock).** In August 2026 total US federal debt passed **$40 trillion**, and yearly net interest is about **$1 trillion**, more than the defense budget. This lesson explains how the budget adds up, who holds Treasuries, how the Treasury auctions its debt, and the one formula that decides whether debt spirals: **the interest rate \\(r\\), growth \\(g\\) and the primary deficit**. It is the first piece of the puzzle behind \"the 30-year yield breaks 5%.\"",

  intuition: `
Start with a household. The Wangs earn $100,000 this year and spend $115,000. The extra $15,000 goes on a credit card — that $15,000 is this year's **deficit**. They did the same last year and the year before, and the card now carries $300,000 — that's the **debt**.

- **The deficit is a flow**: \\(\\text{spent} - \\text{collected}\\) over one year.
- **The debt is a stock**: all past deficits added up (minus any occasional surpluses).

As long as there's any deficit at all, the debt keeps growing. A "shrinking" deficit doesn't mean the debt is shrinking — only that it's growing more slowly.

The US government works the same way, just with staggering numbers. From the facts file (as of September 2026):

- In fiscal 2025 (October 2024 to September 2025) the federal deficit was about **$1.8 trillion**, roughly **5.8% of GDP**.
- The deficit for the first 11 months of fiscal 2026 was already about **$2.0 trillion**.
- Total federal debt passed **$40 trillion** on August 18, 2026 and stood at about **$40.07 trillion** on September 24, 2026. In recent years it has added a trillion dollars roughly every two to five months.

But a country differs from a household in three crucial ways:

1. **The US borrows in a currency it issues.** It can't "run out of dollars" the way a family can; in a pinch the central bank can create them. That doesn't make debt free — the cost can show up as **higher interest rates** or **higher inflation** instead.
2. **A country never has to pay its debt off.** Maturing Treasuries are normally repaid by issuing new ones ("rolling over"). What really matters is whether **debt relative to the size of the economy (debt-to-GDP) is stable**, and whether **the interest burden is bearable**.
3. **A country's debt is somebody else's asset.** The Treasuries sitting in your money fund, in banks, pension funds, foreign central banks — even inside stablecoin issuers — are money the government owes them. That's **Idea ② Balance sheets & claims**: every Treasury is a claim written as a liability on the Treasury's balance sheet and showing up as an asset on someone else's.

This lesson also rests on **Idea ① The price of time**. The bigger the debt, the more interest rates matter. With $300,000 on the card, a rate rise from 3% to 5% lifts yearly interest from \\(\\$300{,}000 \\times 3\\% = \\$9{,}000\\) to \\(\\$300{,}000 \\times 5\\% = \\$15{,}000\\). The same holds for the US: as of 2026, yearly net interest is about **$1 trillion**, already **more than defense spending**. And the Congressional Budget Office's February 2026 projections assumed a 10-year Treasury yield of about 4.1% for 2026, while the market rate in September 2026 was about 5.2% — **so the interest bill is likely to come in above the official forecast.**

Worse, this can become a loop: **higher rates → higher interest costs → bigger deficits → more Treasuries to sell → investors demand higher returns → rates rise further.** That's the core story when Stage 4.5 asks why the 30-year yield broke 5%, and the starting point for "fiscal dominance" in Stage 9.4.

**In this lesson we break it into five pieces:**

- **① The budget: revenue, spending and the deficit**
- **② The debt: the total, the public's share, and who holds it**
- **③ Interest costs: compounding in reverse**
- **④ Debt-to-GDP dynamics: \\(r\\), \\(g\\) and the primary deficit**
- **⑤ How the Treasury borrows: auctions and the bills-vs-bonds fight**
`,

  mechanics: `
### ① The budget: revenue, spending and the deficit

The US federal **fiscal year** runs from October 1 to September 30 (fiscal 2026 runs from October 2025 through September 2026).

**Revenue** comes mainly from individual income taxes (the largest source), Social Security and Medicare payroll taxes, corporate income taxes, and customs duties among others. **Spending** is dominated by Social Security, Medicare and Medicaid, defense, other discretionary programs, and **net interest**.

<table>
<tr><th>Fiscal 2025 (facts file)</th><th>Amount</th></tr>
<tr><td>Deficit</td><td>About $1.8 trillion (5.8% of GDP)</td></tr>
<tr><td>Net interest</td><td>About $970 billion (about $881 billion in FY2024)</td></tr>
<tr><td>National defense</td><td>About $917 billion</td></tr>
<tr><td>Customs duties</td><td>About $195 billion (about $77 billion in FY2024)</td></tr>
</table>

Keep two concepts apart:

$$
\\text{Total deficit} = \\text{Spending} - \\text{Revenue}
\\text{Primary deficit} = \\text{Total deficit} - \\text{Net interest}
$$

The **primary deficit** measures the government's own gap between spending and revenue, leaving aside interest on past borrowing. CBO's 2026 projection has the total deficit at about 5.8% of GDP and net interest at about 3.3%, so the primary deficit is roughly **\\(5.8\\% - 3.3\\% = 2.5\\%\\) of GDP**. That number becomes crucial in piece ④.

**Policies shaping the deficit (as of September 2026):**

- **The One Big Beautiful Bill Act (OBBBA)**, signed July 4, 2025. It made the 2017 individual tax cuts permanent, added deductions for tips and overtime among others, cut spending on Medicaid and other programs, and raised the debt limit by $5 trillion. Its cost comes in three versions, so don't mix them: CBO's July 2025 score of about **$3.4 trillion** added to deficits over 2025–2034, before interest; about **$4.1 trillion** including interest; and about **$4.7 trillion** over 2026–2035 in CBO's February 2026 baseline, including debt-service effects.
- **Tariffs**: customs duties were projected to rise from about 0.6% of GDP in 2025 to about 1.3% in 2026. CBO had estimated that higher tariffs would **reduce** deficits by about $3.0 trillion over 2026–2035 — but that estimate predates the Supreme Court's February 20, 2026 ruling. The Court held 6–3 that the International Emergency Economic Powers Act (IEEPA) does not authorize tariffs; those tariffs stopped being collected and became subject to refunds, and the administration switched to replacement tariffs under other laws (Sections 122, 301 and 232). So the true contribution of tariffs to the deficit **remains uncertain**.

### ② The debt: the total, the public's share, and who holds it

The "$40 trillion" headline needs unpacking:

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">$40 trillion of Treasuries: whose asset are they? (Jul–Sep 2026, approximate)</text><text x="40" y="48" font-size="11" font-weight="700" fill="var(--ink)">Total federal debt ≈ $40.07T</text><rect x="40" y="56" width="469" height="34" fill="var(--orange)"/><rect x="509" y="56" width="112" height="34" fill="var(--muted)" opacity="0.6"/><text x="274" y="78" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--surface)">Held by the public ≈ $32.36T</text><text x="565" y="78" text-anchor="middle" font-size="10.5" fill="var(--ink)">Intragov. 7.71</text><text x="565" y="106" text-anchor="middle" font-size="10" fill="var(--muted)">Social Security etc.</text><line x1="40" y1="92" x2="40" y2="130" stroke="var(--line)"/><line x1="509" y1="92" x2="509" y2="130" stroke="var(--line)"/><text x="40" y="146" font-size="11" font-weight="700" fill="var(--ink)">The public's share, broken down</text><rect x="40" y="154" width="134" height="34" fill="var(--blue)"/><rect x="174" y="154" width="66" height="34" fill="var(--green)"/><rect x="240" y="154" width="269" height="34" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="107" y="176" text-anchor="middle" font-size="11" font-weight="700" fill="var(--surface)">Foreign ≈ 9.25</text><text x="207" y="176" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--surface)">Fed 4.56</text><text x="374" y="176" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Other domestic holders ≈ 18.5</text><text x="40" y="212" font-size="10.5" fill="var(--blue)">Japan 1.10 · UK 1.00 · China 0.62</text><text x="40" y="228" font-size="10" fill="var(--muted)">(TIC, July 2026)</text><text x="174" y="212" font-size="10" fill="var(--green)">H.4.1, 2026-09-23</text><text x="300" y="212" font-size="10.5" fill="var(--orange-ink)">money funds, banks, pensions, insurers,</text><text x="300" y="228" font-size="10.5" fill="var(--orange-ink)">mutual funds, households, states, stablecoins…</text><text x="320" y="268" text-anchor="middle" font-size="10.5" fill="var(--muted)">Every slice is a claim written on the Treasury's balance sheet (Idea ②)</text><text x="320" y="286" text-anchor="middle" font-size="10" fill="var(--muted)">Sources have different dates; orders of magnitude only. Check fiscaldata.treasury.gov and TIC.</text></svg><figcaption>Foreign holdings have been roughly flat for years while the debt grew faster, so the foreign share is falling and more of each new Treasury has to be absorbed at home.</figcaption></figure>

- **Intragovernmental holdings** (about $7.71 trillion): special Treasuries held by trust funds such as Social Security — "money the government owes itself." They don't trade in the market.
- **Debt held by the public** (about $32.36 trillion): the tradable part that actually drives interest rates. When economists say "debt-to-GDP," they usually mean this piece. It was about **99% of GDP** at the end of fiscal 2025; CBO projects about 101% in 2026, **about 108% in fiscal 2030, passing the 1946 record of 106%**, and about 120% by 2036.

**Who holds it?**

- **Foreign investors**: about **$9.25 trillion** as of July 2026 (of which foreign official holders about $3.77 trillion). Japan is the largest holder (about $1.10 trillion and falling), the UK is second (about $1.00 trillion and rising fast — a figure that includes London custody and hedge-fund positions), and China is third (about $0.62 trillion, down from about $1.03 trillion in January 2022). Total foreign holdings are roughly flat, but their **share is falling** because the debt grows faster.
- **The Federal Reserve**: about **$4.56 trillion** as of September 2026. Quantitative tightening (QT) ended on December 1, 2025; until then the Fed had been shrinking its holdings (Stage 9.1).
- **Other domestic holders**: money market funds (big holders of T-bills), banks, pensions, insurers, mutual funds, households — and a newer buyer, **stablecoin issuers**. Under the GENIUS Act, stablecoins must hold 1:1 reserves in cash, short T-bills and similar assets (Stage 13.2), which makes them a captive buyer of bills.

### ③ Interest costs: compounding in reverse

Stage 2.2 showed how compounding makes savings snowball; for a borrower it runs in reverse. **\\(\\text{Interest} \\approx \\text{debt} \\times \\text{average interest rate}\\)**:

- Net interest was about **$970 billion** in fiscal 2025; CBO's February 2026 baseline has it at **$1 trillion-plus** in 2026 (3.3% of GDP) and about **$2.1 trillion** in 2036 (4.6% of GDP).
- **Net interest now exceeds defense spending**: CBO projects about $1.0 trillion of net interest in fiscal 2026 versus about $885 billion for defense.

**Higher rates don't hit the interest bill all at once**, because existing long-term Treasuries locked in their old rates. The effect seeps in: each time old debt matures and is replaced, the new debt pays whatever the market rate is at that moment. Two things set the speed:

- **Average maturity**: the larger the share of short-term bills, the faster interest costs respond to hikes. On August 31, 2026 bills were **22.8%** of marketable debt, above the commonly cited 15%–20% guideline.
- **The gap between market rates and the average rate**: roughly, $1 trillion of interest divided by about $31–32 trillion of public debt gives an **average rate of about \\(\\dfrac{1}{31\\text{–}32} \\approx 3.2\\%\\text{–}3.3\\%\\)**, while new 10-year and 30-year Treasuries in September 2026 yielded about 5.2% and 5.5%. As long as market rates sit above the average rate, **every rollover raises the interest bill.**

One more number to remember: CBO's February 2026 projections assumed a 10-year yield of about **4.1%** for 2026, while the market was at about **5.2%** in September 2026, roughly \\(5.2\\% - 4.1\\% = 1.1\\) percentage points higher. **The official interest projections are therefore probably too low.**

### ④ Debt-to-GDP dynamics: \\(r\\), \\(g\\) and the primary deficit

Sustainability isn't about the dollar amount of debt; it's about where **debt-to-GDP** is heading. A simple formula governs it (\\(d\\) is debt-to-GDP):

$$
d_{\\text{next year}} = d \\times \\frac{1 + r}{1 + g} + \\text{primary deficit ratio}
\\Delta d \\approx \\frac{r - g}{1 + g} \\times d + \\text{primary deficit ratio}
$$

The second line approximates the first. Here \\(r\\) is the average nominal interest rate on the debt and \\(g\\) is nominal GDP growth.

It says two things:

- **The race between \\(r\\) and \\(g\\)**: if nominal GDP growth (\\(g\\)) beats the average interest rate (\\(r\\)), old debt shrinks as a share of GDP on its own, even without a primary surplus. If \\(r > g\\), debt snowballs by itself.
- **The primary deficit** adds a fresh layer every year.

**A numerical example** (illustrative, close to the 2026 orders of magnitude): \\(d = 100\\%\\), \\(r = 3.3\\%\\), \\(g = 4\\%\\), primary deficit 2.5%.

$$
\\Delta d \\approx \\frac{0.033 - 0.04}{1.04} \\times 100\\% + 2.5\\%
\\Delta d \\approx -0.7\\% + 2.5\\% \\approx +1.8\\ \\text{points per year}
$$

Now suppose that as old debt rolls over, the average rate drifts up to 5% (close to long-end market yields in September 2026):

$$
\\Delta d \\approx \\frac{0.05 - 0.04}{1.04} \\times 100\\% + 2.5\\%
\\Delta d \\approx +1.0\\% + 2.5\\% \\approx +3.5\\ \\text{points per year}
$$

**Same fiscal policy, and just because rates rose, debt-to-GDP climbs almost twice as fast.** The primary balance needed to stabilize debt is \\(\\dfrac{r - g}{1 + g} \\times d\\). With \\(r = 5\\%\\), that means moving from a 2.5% primary deficit to about a 1% primary **surplus** — tightening on the order of a trillion dollars a year. That's why markets have started talking about **fiscal dominance**: once debt is large enough, central-bank hikes directly worsen the budget, and investors begin to wonder whether the central bank will be pushed into tolerating higher inflation (Stage 9.4).

**Where inflation fits**: inflation raises nominal GDP (\\(g\\) goes up). If the rate on old debt is locked in, debt-to-GDP falls — the "hidden tax" of Stage 2.5, and one of the ways the US worked its debt down from 106% after World War II. But if markets see inflation coming, they demand higher rates (\\(r\\) rises too), and that exit closes.

**Ratings**: S&P (2011), Fitch (2023) and Moody's (May 16, 2025) each cut the US one notch from the top rating. Moody's was the last of the three to hold AAA, and it cited rising debt and interest ratios and the failure of successive administrations and Congresses to reverse the deficit trend.

### ⑤ How the Treasury borrows: auctions and the bills-vs-bonds fight

The Treasury sells three kinds of marketable securities at **auction**:

<table>
<tr><th>Type</th><th>Maturity</th><th>How it pays</th></tr>
<tr><td>Bills</td><td>4 to 52 weeks</td><td>Sold at a discount, no coupon</td></tr>
<tr><td>Notes</td><td>2, 3, 5, 7, 10 years</td><td>Coupon every six months</td></tr>
<tr><td>Bonds</td><td>20, 30 years</td><td>Coupon every six months</td></tr>
</table>

There are also inflation-protected TIPS and floating-rate notes (FRNs). Auctions are **single-price**: bidders state the yield they'll accept, the Treasury fills bids from the lowest yield up until the issue is sold, and every winner gets the highest accepted yield. Markets watch two gauges:

- **Bid-to-cover ratio**: \\(\\dfrac{\\text{total bids}}{\\text{amount sold}}\\). Higher means stronger demand.
- **The tail**: how far the auction's yield lands above the market yield just before the auction. A big tail means the Treasury had to "pay up" to clear the sale — a sign of weak demand for duration. **Primary dealers** (big banks) are expected to bid at every auction, which backstops any shortfall.

**Bills or bonds?** This was a live policy fight in 2024–2026:

- Issue more **short-term bills**, and there's less supply at the long end, so long yields stay lower — but the debt reprices faster, and the interest bill jumps quickly when rates rise.
- Issue more **long-term bonds**, and you lock in rates — but you add supply pressure at the long end and push up the term premium (Stage 4.5).
- In July 2024 Stephen Miran and Nouriel Roubini published "Activist Treasury Issuance" (a Hudson Bay Capital research paper), arguing that the Treasury leaned on bills in 2023–24 to hold down long yields, with effects akin to "stealth QE." Miran later chaired the White House Council of Economic Advisers and became a Fed governor.
- The August 5, 2026 quarterly refunding left coupon and FRN auction sizes unchanged, with a promise to hold them "for at least the next several quarters." Bills made up 22.8% of marketable debt at the end of August. Separately, the Treasury enlarged its long-end (10–30 year) "liquidity support" buybacks from at most $2 billion to at least $4 billion per operation for September 9 to November 4, 2026 — **buying back long bonds** helps hold long yields down.

**The new-era angle**: stablecoins have become a new class of T-bill buyer. As of September 2026, total stablecoin supply was about **$312 billion**. Standard Chartered argued in February 2026 that the Treasury may issue more bills as stablecoins grow toward $2 trillion; the Kansas City Fed countered that stablecoins add Treasury demand only by pulling money out of other assets such as bank deposits, not out of thin air. Keep both views in mind (Stage 13.2, Stage 14.5).

In the next lesson (Stage 3.4) we'll see why foreigners are willing to hold so many Treasuries: they are the **collateral** and reserve asset of the global dollar system. Stage 20.1 then strings this lesson's chain — deficits → supply → term premium → the 30-year yield — all the way to Bitcoin and DAT preferred stock.
`,

  demo: "deficits-debt",

  analogy: `
Picture someone rolling a snowball down a hill.

The size of the snowball is **debt-to-GDP**. The slope of the hill is **\\(r - g\\)**. If interest rates beat growth (\\(r > g\\)), the hill slopes down and the snowball grows by itself as it rolls. If growth beats rates (\\(g > r\\)), the hill slopes up and the snowball slowly melts a little.

And every year the roller **adds a fresh handful of snow** by hand — that's the primary deficit.

For much of the last fifteen years rates were low and the hill mostly sloped up: a handful of snow went on every year, but the slope helped shrink the ball. In 2026, with rates around 5%, the slope has flattened or even tipped downhill. The same "handful a year" now snowballs faster.

The subtler point: the bigger the snowball, the more the slope matters. The same one-point slope adds a point a year to a 100% snowball but only half a point to a 50% one. **The bigger the debt, the more interest rates matter.** That's why bond investors all over the world watch US deficits — they're really judging whether this hill is getting steeper.
`,

  misconceptions: [
    "**\"The deficit fell, so the debt fell.\"** — The deficit is new borrowing each year. As long as it's above zero, the debt keeps rising; a smaller deficit only means the debt rises more slowly.",
    "**\"The US will go bankrupt like a household that can't pay.\"** — The US borrows in dollars it issues, so it can't technically run out of dollars. The real risks are higher rates, interest crowding out other spending, inflation and a loss of confidence in the dollar — not a conventional default.",
    "**\"China owns most US debt.\"** — As of July 2026, foreigners held about $9.25 trillion and China about $0.62 trillion, behind Japan and the UK. Most publicly held Treasuries are owned by domestic investors, including the Fed.",
    "**\"When rates rise, the government's interest bill jumps to the new rate immediately.\"** — Existing long-term Treasuries locked in old rates. Interest costs rise gradually as old debt matures and is refinanced; the bigger the share of bills, the faster the pass-through.",
    "**\"Debt above 100% of GDP guarantees a crisis.\"** — There's no magic threshold. What matters is \\(r\\) versus \\(g\\), the size of the primary deficit, and whether investors keep holding the debt at reasonable rates. Japan's debt ratio is far higher than America's, and Britain's was very high after World War II.",
  ],

  quiz: [
    {
      q: "A country spends $7 trillion, collects $5.2 trillion, and pays $1 trillion of net interest. What are its total deficit and primary deficit?",
      options: ["$1.8T; $0.8T", "$1.8T; $2.8T", "$0.8T; $1.8T", "$7T; $5.2T"],
      answer: 0,
      explain: "**\\(\\text{Total deficit} = \\text{spending} - \\text{revenue} = 7 - 5.2 = \\$1.8\\text{T}\\)**; **\\(\\text{primary deficit} = \\text{total deficit} - \\text{net interest} = 1.8 - 1 = \\$0.8\\text{T}\\)**. The primary deficit measures the government's own gap, excluding interest on past borrowing.",
    },
    {
      q: "Debt-to-GDP is 100%, the average rate \\(r = 5\\%\\), nominal growth \\(g = 4\\%\\), and the primary deficit is 2.5% of GDP. Roughly how does debt-to-GDP change in a year?",
      options: ["Falls about 1 point", "Roughly unchanged", "Rises about 3.5 points", "Rises about 11.5 points"],
      answer: 2,
      explain: "**\\(\\Delta d \\approx \\dfrac{r - g}{1 + g} \\times d + \\text{primary deficit}\\)**, so \\(\\dfrac{0.05 - 0.04}{1.04} \\times 100\\% + 2.5\\% \\approx 1.0\\% + 2.5\\% \\approx +3.5\\ \\text{points}\\).",
    },
    {
      q: "Why doesn't the US government's interest bill reprice to the new rate as soon as the Fed hikes?",
      options: [
        "Because the law fixes Treasury rates forever",
        "Because the Fed pays the Treasury's interest",
        "Because foreign holders don't collect interest",
        "Because existing Treasuries locked in their issue rates; only debt that matures and is refinanced pays the new rate",
      ],
      answer: 3,
      explain: "Interest costs reprice gradually through **rollover**. The bigger the bill share (about 22.8% in August 2026), the faster the repricing.",
    },
    {
      q: "What did Miran and Roubini's 2024 paper \"Activist Treasury Issuance\" criticize?",
      options: [
        "The Treasury leaning on short-term bills to hold down long yields, with effects like \"stealth QE\"",
        "The Fed buying Bitcoin",
        "The Treasury halting bill issuance",
        "Foreign central banks dumping Treasuries",
      ],
      answer: 0,
      explain: "They argued the Treasury financed itself heavily with **bills** in 2023–24, reducing long-end supply and pushing long yields down — a kind of \"stealth QE.\" That's the heart of the bills-vs-bonds debate.",
    },
    {
      q: "Under the GENIUS Act, how do stablecoin issuers relate to the Treasury market?",
      options: [
        "Stablecoins are banned from holding Treasuries",
        "Stablecoins must hold 30-year bonds as reserves",
        "Stablecoins must hold 1:1 reserves in cash, short T-bills and similar assets, which makes them T-bill buyers",
        "The Treasury issues stablecoins directly",
      ],
      answer: 2,
      explain: "Reserves must be cash, insured deposits, T-bills maturing within 93 days, overnight repo, government money funds and the like. That makes stablecoins a **new buyer** of bills — though the Kansas City Fed notes the demand is largely shifted from assets such as bank deposits.",
    },
  ],

  further: [
    { label: "US Treasury Fiscal Data: Debt to the Penny (daily debt figures)", url: "https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/" },
    { label: "Congressional Budget Office: The Budget and Economic Outlook, 2026 to 2036", url: "https://www.cbo.gov/publication/61882" },
    { label: "US Treasury TIC: major foreign holders of Treasury securities", url: "https://ticdata.treasury.gov/Publish/mfhhis01.txt" },
    { label: "TreasuryDirect: how Treasury auctions work", url: "https://www.treasurydirect.gov/auctions/" },
    { label: "Committee for a Responsible Federal Budget: analysis of CBO's February 2026 outlook", url: "https://www.crfb.org/papers/cbos-february-2026-budget-and-economic-outlook" },
  ],
};
