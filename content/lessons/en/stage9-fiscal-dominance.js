export default {
  id: "fiscal-dominance",
  stage: 9,
  order: 4,
  title: "Fiscal Dominance & Debt Sustainability: The Race Between r and g",
  difficulty: "systems",
  prereqs: ["deficits-debt", "long-bond-30y", "fed-toolkit"],

  oneLiner:
    "Whether a country's debt spirals out of control depends less on how big the debt is than on a race: **does the average interest rate on the debt (r) outrun nominal economic growth (g)?** — plus what the government spends beyond its revenue before interest (the primary deficit). When r is below g, even moderate deficits can leave the debt ratio stable; when r is above g, interest compounds on itself. And when debt grows so large that the central bank no longer dares to raise rates against inflation, you have **fiscal dominance.** As of September 2026, US federal debt has passed $40 trillion, net interest runs about $1 trillion a year and the 30-year yield sits near 5.5% — this lesson digs out the deepest layer beneath Lin's first headline.",

  intuition: `
Picture a household earning $100,000 a year with $100,000 of debt at 3%. The interest is $3,000 a year. Suppose its income grows 4% a year and, apart from interest, it exactly breaks even. Ten years later the debt has compounded to about $134,000 — but income has grown to about $148,000. **The debt-to-income ratio has actually fallen from 100% to about 91%.** The household repaid nothing; it simply grew faster than its interest bill.

Now make the rate 5% with income still growing 4%. After ten years the debt is about $163,000 against income of about $148,000, and the ratio has climbed to about 110%. Add a bit of overspending every year (a primary deficit) and it climbs faster still.

That is all the arithmetic of government debt:

- **\\(r\\) (the average interest rate on the debt):** how much interest the government pays per dollar owed each year.
- **\\(g\\) (nominal GDP growth):** how fast the economy — the government's “income” — grows each year (real growth plus inflation).
- **The primary balance:** leaving interest aside, do taxes cover spending? If not, that gap is the primary deficit.

**When \\(r < g\\), time is on the borrower's side; when \\(r > g\\), time is on the creditor's side.** From 2008 to 2021 the United States lived in a world where r was far below g. Rates were so low that many concluded a bit more debt didn't matter. After 2022, rates came back. By late September 2026 the 10-year Treasury yielded about 5.17% and the 30-year about 5.49%; total federal debt passed **$40 trillion** on August 18, 2026; and annual net interest was running at about **$1 trillion**, more than defense spending.

Once debt is large enough and interest heavy enough, a more dangerous question appears: **does the central bank still dare to raise rates to fight inflation?** A hike raises the government's interest bill, widens the deficit, forces more borrowing... If the central bank is pushed into holding rates below inflation for that reason, monetary policy has become the servant of fiscal policy. That is **fiscal dominance.** It is the deepest layer beneath Lin's first headline — the 30-year yield breaking above 5%. Part of the higher term premium that long-bond buyers demand is compensation for the risk of being quietly repaid in inflated dollars.

This lesson rests on **Idea ①, the price of time** — r is the price of time the government pays — and **Idea ②, balance sheets and claims**: a Treasury bond is a claim on the government's balance sheet, and inflation is a hidden way of settling those claims for less. It builds on the deficits and debt of Stage 3.3 and the 30-year Treasury of Stage 4.5, and points ahead to the inflation regimes of Stage 9.5 and to Stage 20.1, where Lin's three headlines are tied into a single thread.

**In this lesson we break it into five pieces:**

- **① The arithmetic of debt: r, g and the primary deficit**
- **② America's books as of September 2026**
- **③ What fiscal dominance is: when the central bank has to mind the treasury**
- **④ Financial repression: how governments shrink debt quietly**
- **⑤ What it means for long bonds, gold and Bitcoin**
`,

  mechanics: `
### ① The arithmetic of debt: r, g and the primary deficit

Let \\(d\\) be debt as a share of GDP and \\(\\mathrm{pb}\\) the primary balance as a share of GDP (surplus positive, deficit negative). Next year's debt ratio is:

$$
d_{\\text{next year}} = d_{\\text{this year}} \\times \\frac{1 + r}{1 + g} - \\mathrm{pb}
$$

It says two things. Old debt compounds at \\((1 + r)\\) while the GDP denominator grows at \\((1 + g)\\); then this year's primary deficit is added on top. The primary balance needed to **hold the debt ratio steady** (the stabilizing primary surplus \\(\\mathrm{pb}^{*}\\)) is:

$$
\\mathrm{pb}^{*} \\approx d \\times \\frac{r - g}{1 + g}
$$

Walk through it with US numbers (CBO's February 2026 baseline, rounded). In 2026, debt held by the public is about **101%** of GDP; the total deficit is about **5.8%**, of which net interest is about **3.3%**, so the **primary deficit is about 2.5%**. The average interest rate on the debt is roughly \\(3.3\\% \\div 101\\% \\approx 3.3\\%\\). Assume nominal growth \\(g = 4\\%\\) (illustrative):

- At \\(r = 3.3\\%\\): next year's ratio \\(\\approx \\dfrac{101 \\times 1.033}{1.04} + 2.5 \\approx 102.8\\%\\), rising about 1.8 points a year — broadly in line with CBO's projection of about 120% by 2036. The stabilizing \\(\\mathrm{pb}^{*} \\approx -0.7\\%\\): cut the primary deficit from 2.5% to about 0.7% of GDP and the ratio holds.
- But the average rate won't stay at 3.3%. **Every bond that matures has to be refinanced at today's market rate.** If the average rate drifts up to about 5% — close to the 10-year yield in September 2026 — next year's ratio \\(\\approx \\dfrac{101 \\times 1.05}{1.04} + 2.5 \\approx 104.5\\%\\), rising about 3.5 points a year, and \\(\\mathrm{pb}^{*}\\) becomes about **+1.0%**. The government would need to swing from a 2.5% primary deficit to a 1% primary surplus — an adjustment of about 3.5% of GDP, which on nominal GDP of roughly $32.5 trillion is **more than $1 trillion a year.**

That is the brutal part of the r-versus-g race: a small gap between r and g, multiplied by a 100% debt ratio, becomes a big number. **The higher the debt, the more rate-sensitive the budget** — just as a longer-duration bond in Stage 4.4 is more sensitive to yields.

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The self-reinforcing debt–rate loop, and its three exits</text><g font-size="12" font-weight="600" fill="var(--ink)" text-anchor="middle"><rect x="240" y="36" width="160" height="36" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="320" y="59">Bigger deficits</text><rect x="440" y="108" width="170" height="36" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="525" y="131">More issuance, more duration</text><rect x="240" y="180" width="160" height="36" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="320" y="203">Higher term premium & r</text><rect x="30" y="108" width="170" height="36" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="115" y="131">Higher interest bill</text></g><g stroke="var(--red)" stroke-width="1.8" fill="none"><path d="M400 56 Q 500 60 520 104"/><path d="M520 146 Q 500 190 404 198"/><path d="M236 198 Q 130 192 118 148"/><path d="M118 106 Q 130 62 236 56"/></g><g fill="var(--red)"><path d="M516 100 l8 6 l-1 -10 z"/><path d="M408 194 l-8 5 l9 3 z"/><path d="M114 152 l4 -9 l4 9 z"/><path d="M232 52 l9 4 l-9 4 z"/></g><text x="320" y="128" text-anchor="middle" font-size="11" fill="var(--muted)">the higher r and the debt,</text><text x="320" y="143" text-anchor="middle" font-size="11" fill="var(--muted)">the faster the loop spins</text><g font-size="11" text-anchor="middle"><rect x="20" y="236" width="190" height="50" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="115" y="256" font-weight="700" fill="var(--ink)">Exit 1: growth</text><text x="115" y="274" fill="var(--muted)">let g outrun r (productivity, AI?)</text><rect x="225" y="236" width="190" height="50" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="320" y="256" font-weight="700" fill="var(--ink)">Exit 2: austerity</text><text x="320" y="274" fill="var(--muted)">raise taxes, cut spending</text><rect x="430" y="236" width="190" height="50" rx="8" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="525" y="256" font-weight="700" fill="var(--orange-ink)">Exit 3: inflation & repression</text><text x="525" y="274" fill="var(--muted)">push real r below zero</text></g></svg><figcaption>High debt makes the “rates → interest → deficit → issuance → rates” loop spin faster. There are only three exits; the third is the easiest, and the hardest on creditors.</figcaption></figure>

### ② America's books as of September 2026

Here are the Stage 3.3 numbers updated to September 2026 (sources: Treasury's “Debt to the Penny” and CBO; always check the latest official data):

<table>
<tr><th>Item</th><th>Figure</th><th>As of</th></tr>
<tr><td>Total federal debt</td><td>About $40.07 trillion (first above $40T on Aug 18, 2026)</td><td>2026-09-24</td></tr>
<tr><td>Debt held by the public</td><td>About $32.36 trillion</td><td>2026-09-24</td></tr>
<tr><td>Deficit, first 11 months of FY2026</td><td>About $2.0 trillion</td><td>CBO, Aug 2026</td></tr>
<tr><td>Net interest</td><td>About $1 trillion+ a year, about 3.3% of GDP, now above defense</td><td>CBO Feb 2026 baseline</td></tr>
<tr><td>CBO's assumed 2026 10-year yield</td><td>4.1% (the market is about 5.2%, roughly 1.1 points higher)</td><td>Feb vs Sep 2026</td></tr>
<tr><td>Bills as a share of marketable debt</td><td>About 22.8% (common guidance: 15–20%)</td><td>2026-08-31</td></tr>
</table>

A few things worth pausing on:

- **The pace.** From $36 trillion (November 2024) to $40 trillion (August 2026) took less than two years; recently the debt has added about $1 trillion every two to five months.
- **CBO's interest forecast looks optimistic.** It assumed a 2026 10-year yield of 4.1%, but after the Iran war and the oil shock the market sits about 1.1 points higher. **When the interest forecast is too low, the deficit forecast is too low with it** — the red arrows in the loop diagram, in real life.
- **Ratings.** On May 16, 2025 Moody's cut the US from Aaa to Aa1, removing the last top rating from the three big agencies. Its stated reasons were rising debt and interest burdens and successive governments' failure to reverse the deficit trend.
- **Fiscal expansion.** The One Big Beautiful Bill Act, signed July 4, 2025, adds about $3.4 trillion to deficits over 2025–2034 before interest, according to CBO, and raised the debt limit by $5 trillion.

### ③ What fiscal dominance is: when the central bank has to mind the treasury

In 1981 Thomas Sargent and Neil Wallace published a paper with a deliberately uncomfortable title: “Some Unpleasant Monetarist Arithmetic.” The core argument: **if the fiscal authority sets its deficits first and won't adjust them, the central bank is eventually left with two options — let debt grow without limit (impossible) or fill the gap by printing money, which means inflation.** In that world, the tighter the central bank is today, the heavier the debt becomes and the more inflation is needed later. Who moves first — who has the final say — determines whether you live under **monetary dominance** or **fiscal dominance.**

Fiscal dominance isn't a switch; it is a set of observable signals:

- **The central bank won't raise rates even with inflation above target**, citing “financial stability” or the government's funding costs.
- **The treasury shortens the maturity of its borrowing**: more short-term bills, fewer long bonds, to hold down long rates.
- **The government buys back long bonds**, or the central bank buys them, to push down the long end.
- **Regulation makes institutions buy government debt**: banks, insurers or pension funds required to hold more of it.
- **Political pressure on central-bank independence** rises.

Apply that checklist to the United States in 2025–26 and the evidence is **mixed**:

- For rising fiscal-dominance risk: bills are about 22.8% of marketable debt, above common guidance. In 2024, Stephen Miran and Nouriel Roubini's paper “Activist Treasury Issuance,” published by Hudson Bay Capital, criticized the Treasury's earlier tilt toward bills as “stealth QE” — and Miran later became a Fed governor who voted for bigger cuts at every meeting from October 2025 to April 2026. From September 9 to November 4, 2026 the Treasury enlarged its long-end (10–30 year) “liquidity support” buybacks from at most $2 billion to at least $4 billion per operation. The stablecoin law requires issuers to hold bills and similar assets as reserves, which in effect creates a class of captive buyers. And the President tried to fire Governor Lisa Cook.
- Against: in June 2026, in Trump v. Cook, the Supreme Court held that Fed governors are protected from removal except for cause. And **on September 16, 2026 the new chair Kevin Warsh opened with a rate hike** — acting against inflation despite an interest bill of about $1 trillion a year. That is monetary dominance in action.

**So a better description is: the US is under heavy fiscal strain, but the central bank is still asserting its independence.** Markets price that uncertainty in the term premium at the long end. The New York Fed's ACM model put the 10-year term premium at about +0.73% on September 24, 2026, against about −1.36% at the end of July 2020; the Fed Board's Kim–Wright model showed about 0.96% on September 18, 2026, the highest in that series since 2020.

### ④ Financial repression: how governments shrink debt quietly

Historically, high debts have rarely been paid off. US debt held by the public peaked at about 106% of GDP in 1946 (a record CBO projects will be broken around 2030). Over the next three decades the ratio fell into the twenties. That happened not through large surpluses but through:

- **Growth:** strong real growth for decades after the war.
- **Inflation:** notably several bursts in the late 1940s.
- **Financial repression:** from 1942 to 1951, at the Treasury's request, the Fed pegged long-term Treasury yields at about 2.5%. Even when inflation ran far above that, bondholders had to accept **negative real rates.** Only with the Treasury–Fed Accord of March 1951 did the Fed regain the freedom to set rates independently.

Run it through the Fisher equation from Stage 2.5: with a nominal rate of 2.5% and inflation of 5%, the real rate is \\(\\dfrac{1.025}{1.05} - 1 \\approx -2.4\\%\\). Every year bondholders quietly lose 2.4% of purchasing power and the government's real debt burden shrinks by the same amount — **a tax that never needs a vote in Congress.** Carmen Reinhart and Belen Sbrancia's 2011 study estimated that the debt “liquidated” by negative real rates in the postwar US and UK averaged roughly 3–4% of GDP a year.

Modern repression is subtler: rules that nudge banks and pension funds to hold more government debt; privileged treatment of “risk-free” assets in collateral rules; limiting the reserves behind a new payment instrument (stablecoins) to short-term Treasuries. **Each has a sensible rationale on its own; together they form a pipe of captive demand** that lets a government borrow below the market-clearing rate.

### ⑤ What it means for long bonds, gold and Bitcoin

What fiscal strain does to assets depends on **how the central bank responds.** Think of it as a two-by-two:

<table>
<tr><th></th><th>Central bank keeps fighting inflation (monetary dominance)</th><th>Central bank holds rates down (fiscal dominance)</th></tr>
<tr><td><b>Long bonds</b></td><td>High nominal and real yields, rising term premium, falling prices (2026's picture)</td><td>Nominal yields held down, but real yields negative; purchasing power slowly eroded</td></tr>
<tr><td><b>Gold, Bitcoin</b></td><td>High real rates raise the opportunity cost of non-yielding assets — pressure in the short run</td><td>Negative real rates and debasement fears — the “hard asset” story at its strongest</td></tr>
<tr><td><b>DAT preferreds</b></td><td>Competing with higher Treasury yields; prices under pressure (Stage 18.1)</td><td>Fixed nominal dividends lose real value to inflation</td></tr>
</table>

The actual path of 2025–26 illustrates the distinction. Through 2025 and into January 2026, worries about Fed independence, “de-dollarization” and the “debasement trade” pushed gold to records, around $5,600 an ounce at the peak in late January 2026. Then the Fed turned hawkish and real rates rose: by June 24, 2026 gold had fallen about 29%, and it was around $4,300 on September 25. Bitcoin likewise, after its record near $126,000 in October 2025, fell to about $58,000 amid 2026's high rates. **Fiscal strain is a long-run story, but in the short run what drives hard assets is real rates — that is, which column the central bank chooses.**

For Bitcoin's supporters, the strongest argument is that heavily indebted states tend, over long horizons, toward the third exit (inflation and repression), and a fixed-supply asset that can't be diluted is a hedge against that (Stage 12.3). For critics, the strongest argument is that exits one and two exist too, that a central bank can choose to be tough as it did in 2026, and that in such a world a non-yielding, highly volatile asset is hit first by real rates. **Each side is half right, which is why this calls for a framework rather than a slogan.**

Back to Lin's first headline. Behind a 30-year yield above 5% sit the term premium, deficits and issuance, inflation risk, and weaker foreign demand (Japan's and China's Treasury holdings are shrinking). Fiscal-dominance worries are the thread that ties them together: **long-bond buyers are asking, “over thirty years, will this government repay me with inflation?”** Stage 20.1 links that question to Bitcoin and to DAT preferreds in one causal chain.
`,

  demo: "fiscal-dominance",

  analogy: `
Think of national debt as **a person walking up a down escalator.**

The escalator runs down at speed r — interest piling debt back on. The person climbs at speed g — the economy growing and shrinking debt's weight. And every year the person picks up another bag to carry (the primary deficit).

In the years when rates were tiny, the escalator barely moved; a couple of steps and you were at the top, so everyone assumed a few more bags wouldn't matter. Then the escalator sped up — just as the person was already carrying a heap of luggage. **The same escalator speed is far harder going when you're carrying more.** Now there are only three options: climb faster (growth), drop some bags (austerity), or quietly tamper with the speed dial (financial repression — making real rates negative, so the escalator looks as if it's running down but is actually carrying you up).

The third option takes the least effort, which is why history uses it most; but the speed that gets “dialed down” is taken from the creditors riding the escalator. **Fiscal dominance is when the person with the luggage takes over the escalator's control room.** Long-bond buyers see this most clearly: they have to ride for thirty years, so they charge an extra fee for the risk that the control room changes hands — and that fee is the term premium.
`,

  misconceptions: [
    "**“Debt above 100% of GDP guarantees default.”** — There's no magic threshold. Debt dynamics are driven by the gap between r and g and by the primary balance. US debt was about 106% of GDP in 1946 and fell sharply over the following decades; Japan has carried a much higher ratio for years without defaulting. The real danger is r rising above g while politics can't adjust the primary deficit.",
    "**“The US can print money, so debt is never a problem.”** — Printing means no nominal default is necessary, but the price can be inflation — a hidden default that takes creditors' purchasing power. Sargent and Wallace's “unpleasant arithmetic” says exactly this: if fiscal policy won't adjust, monetary policy eventually pays the bill.",
    "**“Fiscal dominance has already arrived, and the Fed will hold rates down forever.”** — The 2026 evidence is mixed. Fiscal strain is heavy, the bill share is high and long-end buybacks have grown, but the Fed hiked in September 2026 and the Supreme Court confirmed governors' removal protection. “Rising fiscal strain, with the central bank still asserting independence” is the more accurate description.",
    "**“The worse the fiscal strain, the higher gold and Bitcoin must go.”** — It depends on the central bank's column. When it holds rates down and real rates turn negative, the hard-asset story is strongest. When it stays tight and real rates rise, as in the first half of 2026, non-yielding assets suffer: gold fell about 29% from its January record, and Bitcoin at one point lost more than half from its October 2025 peak.",
    "**“Issuing more bills and fewer bonds saves interest — a free lunch.”** — Bills can hold down long yields for a while, but they make the debt reprice at market rates much faster: once the central bank hikes, interest costs jump. It shifts rate risk from investors back to the Treasury — and a bill share of about 22.8% is one reason interest pressure rose so quickly in 2026.",
  ],

  quiz: [
    {
      q: "A country has debt of 100% of GDP, a balanced primary budget (\\(\\mathrm{pb} = 0\\)), an average interest rate of 3% and nominal growth of 5%. Roughly what is the debt ratio a year later?",
      options: [
        "About 98.1% — growth outruns interest, so the ratio falls on its own",
        "About 102% — interest pushes the ratio up",
        "Exactly 100% — no deficit, no change",
        "About 95% — because growth is 5%",
      ],
      answer: 0,
      explain: "\\(\\dfrac{100 \\times 1.03}{1.05} \\approx 98.1\\). **When \\(r < g\\), the debt ratio falls even if nothing is repaid** — that's the r-versus-g race.",
    },
    {
      q: "Using the lesson's illustrative numbers — debt about 101% of GDP, nominal growth 4% — if the average interest rate rises from about 3.3% to about 5%, how does the primary balance needed to stabilize debt change?",
      options: [
        "From about +1.0% to about −0.7%",
        "No change, because the debt ratio is unchanged",
        "From about −0.7% (a small primary deficit is fine) to about +1.0% (a primary surplus is needed)",
        "From about −2.5% to about −5.8%",
      ],
      answer: 2,
      explain: "\\(\\mathrm{pb}^{*} \\approx d \\times \\dfrac{r - g}{1 + g}\\): \\(\\dfrac{101 \\times (-0.7\\%)}{1.04} \\approx -0.7\\%\\); \\(\\dfrac{101 \\times 1\\%}{1.04} \\approx +1.0\\%\\). **A 1.7-point rise in the rate calls for about 1.7% of GDP of extra fiscal effort — about 3.5% starting from today's roughly −2.5% primary deficit.**",
    },
    {
      q: "From 1942 to 1951 the Fed pegged long-term Treasury yields at about 2.5% while inflation at times ran far higher. What is this arrangement called, and what does it do to the debt?",
      options: [
        "Quantitative tightening; it makes debt grow faster",
        "Financial repression; negative real rates quietly shrink the government's real debt burden",
        "Monetary dominance; it makes the central bank fully independent of the treasury",
        "Fiscal austerity; it repays debt through higher taxes",
      ],
      answer: 1,
      explain: "At 2.5% nominal and 5% inflation, the real rate is about −2.4%. **Purchasing power is quietly transferred from creditors to the debtor (the government)** — until the 1951 Treasury–Fed Accord ended it.",
    },
    {
      q: "Which of these is the strongest 2026 evidence against the claim that the US has already entered fiscal dominance?",
      options: [
        "Bills make up about 22.8% of marketable debt",
        "The Treasury enlarged its long-bond buybacks",
        "The stablecoin law requires issuers to hold bills as reserves",
        "On September 16, 2026 the Fed hiked despite net interest of about $1 trillion a year",
      ],
      answer: 3,
      explain: "A, B and C are signs of fiscal strain or captive demand; D shows the central bank still putting **inflation control** ahead of the government's funding cost — monetary dominance.",
    },
    {
      q: "Why did gold and Bitcoin both fall sharply in the first half of 2026 despite heavy fiscal strain?",
      options: [
        "Because the fiscal strain disappeared",
        "Because the central bank stayed tough and real rates rose, raising the opportunity cost of non-yielding assets — in the short run, real rates matter more than the fiscal story",
        "Because gold and Bitcoin have nothing to do with fiscal policy",
        "Because the Fed launched a new round of QE",
      ],
      answer: 1,
      explain: "Fiscal strain reaches hard assets **through the central bank's response.** Rates held down → negative real rates → hard assets benefit; policy stays tight → real rates rise → hard assets suffer in the short run.",
    },
  ],

  further: [
    { label: "US Treasury, Debt to the Penny: daily federal debt data", url: "https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/" },
    { label: "CBO: The Budget and Economic Outlook: 2026 to 2036 (February 2026 baseline)", url: "https://www.cbo.gov/publication/61882" },
    { label: "Reinhart & Sbrancia (2011), “The Liquidation of Government Debt” (NBER working paper, the classic study of financial repression)", url: "https://www.nber.org/papers/w16893" },
    { label: "New York Fed: ACM term-premium data", url: "https://www.newyorkfed.org/research/data_indicators/term-premia-tabs" },
    { label: "CRFB: analysis of CBO's February 2026 budget outlook", url: "https://www.crfb.org/papers/cbos-february-2026-budget-and-economic-outlook" },
  ],
};
