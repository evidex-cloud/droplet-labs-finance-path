export default {
  id: "yield-curve",
  stage: 4,
  order: 3,
  title: "The Yield Curve: Shapes, Inversions & What It Predicts",
  difficulty: "core",
  prereqs: ["price-yield"],

  oneLiner:
    "Take the yields of one issuer's bonds at every maturity on a single day, line them up from short to long, and you have the **yield curve**: the most information-dense chart in finance. Its height tells you how expensive money is. Its **slope** tells you where the market expects rates to go and how much extra it wants for locking money up (the **term premium**). When short yields sit above long ones, the curve is **inverted**, which has often come before recessions. Yet from 2022 to 2024 the US saw the longest inversion on record, about 26 months, and as of September 2026 no recession had followed. This lesson shows you how to read the curve's shape, take it apart, and tell signal from noise.",

  intuition: `
All through Stage 4.2 we pretended “the market yield” was a single number. In reality every maturity has its own yield: 3 months, 2 years, 10 years, 30 years. Line them up from shortest to longest, join the dots, and you have the **yield curve**.

Start with a real snapshot. On September 25, 2026, the US Treasury's published yields were roughly:

- 3-month: **4.24%**
- 2-year: **4.81%**
- 10-year: **5.17%**
- 20-year: **5.54%**
- 30-year: **5.49%**

The line **slopes upward**: the longer you lend, the higher the rate. That's the “normal” shape, the same logic as a bank CD, where locking money away for five years usually pays more than for three months.

Why are long rates usually higher? Two reasons stack on top of each other:

- **Expectations.** If everyone expects the central bank to raise rates in the future, then locking in for ten years today should pay roughly “the average short-term rate over the next ten years.” Expect higher rates later, and long yields are higher now.
- **Compensation.** Lock money up for thirty years and you carry every surprise in inflation, government finances and policy along the way; Stage 4.2 also showed that long bonds sit on the longest seesaw. So investors ask for a bit extra. That extra slice is the **term premium**.

Sometimes the line **flips**: short rates sit above long rates. That's an **inversion**. It usually means the market is saying, “rates are too high right now, they will squeeze the economy, and the central bank will have to cut later.” That's why inversions are treated as a **recession signal**. From 2022 to 2024 the US 10-year-minus-2-year spread was inverted for about 26 months, the longest stretch on record. Plenty of people predicted a recession on the strength of it. As of September 2026, none had arrived. **The signal is famous, but it isn't a law.**

This lesson rests on **Idea ① The price of time** and **Idea ④ Risk & leverage**. Every point on the curve is the price of time for one horizon. The slope carries the market's bets on the future, plus the compensation it demands for bearing long-run uncertainty. Learn to read it and one chart shows you the Fed (Stage 1.3), inflation, the budget deficit and market mood all at once. When Stage 4.5 talks about the 30-year yield, it's really asking why the far right end of this curve has been pushed up.

**In this lesson we break it into five pieces:**

- **① One day, one snapshot: how to read a yield curve**
- **② Four shapes: normal, flat, inverted and humped**
- **③ Long rates = expected short rates + the term premium**
- **④ Inversions and recessions: the record, the reasons, the exceptions**
- **⑤ How the curve moves: bull and bear, steepening and flattening**
`,

  mechanics: `
### ① One day, one snapshot: how to read a yield curve

The horizontal axis of a yield curve is **time to maturity**; the vertical axis is **yield to maturity**. Everything is from the same day and the same issuer, usually US Treasuries, because with almost no credit risk the only variable left in the curve is time. Put curves from three different years on one chart and the contrast jumps out:

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">US Treasury yield curve at three moments</text><line x1="60" y1="32" x2="60" y2="230" stroke="var(--line)" stroke-width="1.5"/><line x1="60" y1="230" x2="600" y2="230" stroke="var(--line)" stroke-width="1.5"/><g stroke="var(--line)" stroke-dasharray="3 4"><line x1="60" y1="164" x2="600" y2="164"/><line x1="60" y1="98" x2="600" y2="98"/><line x1="60" y1="32" x2="600" y2="32"/></g><g font-size="10" fill="var(--muted)" text-anchor="end"><text x="54" y="233">0%</text><text x="54" y="167">2%</text><text x="54" y="101">4%</text><text x="54" y="35">6%</text></g><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="80" y="244">3m</text><text x="180" y="244">2y</text><text x="360" y="244">10y</text><text x="480" y="244">20y</text><text x="580" y="244">30y</text></g><text x="330" y="262" text-anchor="middle" font-size="10" fill="var(--muted)">Time to maturity (axis not to scale)</text><polyline fill="none" stroke="var(--orange)" stroke-width="3" points="80,90.1 180,71.3 360,59.4 480,47.2 580,48.8"/><g fill="var(--orange)"><circle cx="80" cy="90.1" r="3.5"/><circle cx="180" cy="71.3" r="3.5"/><circle cx="360" cy="59.4" r="3.5"/><circle cx="480" cy="47.2" r="3.5"/><circle cx="580" cy="48.8" r="3.5"/></g><polyline fill="none" stroke="var(--red)" stroke-width="2.5" stroke-dasharray="6 3" points="180,90.4 360,102.0 580,97.0"/><g fill="var(--red)"><circle cx="180" cy="90.4" r="3"/><circle cx="360" cy="102.0" r="3"/><circle cx="580" cy="97.0" r="3"/></g><polyline fill="none" stroke="var(--blue)" stroke-width="2.5" points="180,225.7 360,199.3 580,175.5"/><g fill="var(--blue)"><circle cx="180" cy="225.7" r="3"/><circle cx="360" cy="199.3" r="3"/><circle cx="580" cy="175.5" r="3"/></g><g font-size="10" font-weight="700"><text x="150" y="44" fill="var(--orange-ink)">Sep 25, 2026: upward-sloping, about 4.2%–5.5%</text><text x="390" y="120" fill="var(--red)">End-2023: 2y 4.23% &gt; 10y 3.88% (inverted)</text><text x="190" y="172" fill="var(--blue)">End-2020: 2y 0.13%, 30y 1.65%</text></g></svg><figcaption>September 25, 2026 comes from the US Treasury daily curve; end-2020 and end-2023 are FRED's 2-, 10- and 30-year closes. One chart, three eras: zero rates, inversion, and “the long end is in charge.”</figcaption></figure>

When you read a curve, check three things:

- **Level**: how high the whole line sits. At the end of 2020 the curve was lying on the floor; in September 2026 it runs from about 4% to 5.5%. **Money costs several times what it did.** The seesaw from Stage 4.2 tells you what that trip did to anyone holding long bonds.
- **Slope**: long yield minus short yield. The most quoted are **10-year minus 2-year** (about +0.36 percentage points on September 25, 2026) and **10-year minus 3-month** (about +0.93 points). A positive slope means the curve is “steep”; a negative one means it's “inverted.”
- **Curvature**: whether the middle bulges up or sags. On September 25, 2026 the 20-year (5.54%) sat slightly above the 30-year (5.49%), a small hump at the right end. The 20-year has an unusual issuance and demand pattern, and this little hump has been around for years.

One more thing people overlook: **the left end of the curve is pinned by the Fed.** The 3-month bill yield never strays far from the federal funds rate (after the Fed's hike on September 16, 2026, the target range is 3.75%–4.00%, Stage 1.3). The further right you go, the weaker the Fed's grip and the louder the market's voice. That's why Stage 4.5 says “the long end is in charge.”

### ② Four shapes: normal, flat, inverted and humped

<table><tr><th>Shape</th><th>What it looks like</th><th>What the market is roughly saying</th><th>Example</th></tr><tr><td>Normal (upward-sloping)</td><td>Longer maturity, higher yield</td><td>Rates expected to hold or rise, plus a positive term premium</td><td>September 2026; end-2020 (steep, from a very low base)</td></tr><tr><td>Flat</td><td>All maturities about the same</td><td>A turning point: late in a hiking cycle, or no clear view</td><td>Common near the end of hiking cycles</td></tr><tr><td>Inverted</td><td>Short yields above long yields</td><td>Cuts expected later, often tied to a view that growth will slow</td><td>July 2022 to September 2024 (10y minus 2y)</td></tr><tr><td>Humped</td><td>Middle higher than both ends</td><td>Hikes first, cuts later; or odd supply and demand at certain maturities</td><td>The 20-year above the 30-year in September 2026</td></tr></table>

An example makes inversion concrete. Say you're a bank. You take 3-month deposits and pay 5% on them, and lend the money out for ten years at 4.5%. Every loan loses money. **A bank's basic business is borrowing short and lending long to earn the slope of the curve.** Invert the curve and that business gets hard, banks lend less, and the economy cools. That's one real mechanism behind inversions “predicting” recessions, not just a coincidence.

### ③ Long rates = expected short rates + the term premium

This is the formula for understanding the whole curve:

$$
Long-term yield ≈ average of expected future short-term rates + term premium
$$

**Part one: expectations.** Suppose the 1-year rate today is 4%, and everyone expects the 1-year rate a year from now to be 6%. You have two choices: buy a 2-year bond now, or buy a 1-year bond and roll into another 1-year bond when it matures. If the two paths offered different expected returns, someone would arbitrage the gap. So the 2-year yield should be about (4% + 6%) ÷ 2 = **5%**. Extend the idea and **the 10-year yield contains the market's average expectation of the policy rate over the next ten years.**

Read the September 2026 data this way. The 2-year yield is about 4.81%, clearly above the 3.75%–4.00% fed funds range. By the expectations formula, the market is saying: **over the next two years, the average policy rate will be higher than today's.** In other words, more hikes.

**Part two: the term premium.** Even if the expected path of short rates were identical, locking in for ten years is riskier than rolling 3-month bills: inflation could get away, the government could flood the market with bonds, and long bonds sit on the longest seesaw. So investors normally want an extra slice of return. The term premium can't be observed directly; it has to be estimated with models, and different models give different answers. The New York Fed's ACM model estimates:

- The 10-year term premium was **about −1.36% in July 2020**, the lowest on record. Negative! Investors were willing to accept less to hold long bonds. Behind that: the Fed's QE buying huge amounts of long bonds, subdued inflation expectations, and long Treasuries prized as insurance against stock-market crashes.
- It was negative for most of 2016–2023, **turned positive from late 2024**, and stood at about **+0.84%** at the end of July 2026 and about +0.76% at the end of August.
- A different Fed Board model (Kim–Wright) put the 10-year term premium at about 0.96% on September 18, 2026, the highest in that series since 2020.

**The key conclusion:** a large part of the rise in long yields since 2024 has come from **the term premium climbing back up**, not just from expectations about Fed policy. That's the backbone of Stage 4.5. Deficits, heavy supply, inflation uncertainty and fewer price-insensitive buyers all show up in the term premium.

### ④ Inversions and recessions: the record, the reasons, the exceptions

Why are inversions so famous? Because over the past half-century or so, most US recessions were preceded by an inversion of the spread between 10-year and short-term Treasuries, usually by about a year. The New York Fed has long published a model that turns the 10-year-minus-3-month spread into a probability of recession over the next twelve months.

Why does it “work”? Three mechanisms:

- **Expectations.** The market expects the economy to weaken and the Fed to cut, so long yields come down first.
- **Banks.** The profit from borrowing short and lending long gets squeezed and credit tightens (see ②).
- **Self-fulfillment.** Everyone watches the signal, and companies and investors turn cautious when they see it.

But 2022–2024 was a **big exception**:

- The 10-year-minus-2-year spread first dipped below zero briefly on **April 1, 2022**, stayed inverted from **July 2022**, and last closed negative on **September 5, 2024**. That's about **26 months**, the longest on record.
- As of September 2026 the US had not had a recession. Unemployment rose to 4.5% in November 2025 and then eased back to 4.1% in August 2026, and the S&P 500 was still setting records.

Possible explanations, each with supporters and critics:

- **A suppressed term premium.** The Fed's huge QE holdings and a low term premium kept long yields artificially low, so part of the inversion reflected a negative term premium rather than expected cuts.
- **Fiscal support.** Large deficit spending propped up demand (Stage 3.3).
- **Households and firms had locked in low rates.** Many mortgages and corporate bonds were fixed at rock-bottom rates in 2020–2021, so rate hikes passed through slowly (Stage 9.2 covers the lags in policy transmission).
- **And a warning from another camp:** historically, recessions have tended to arrive only after the curve un-inverts and steepens again, so it's too early to declare victory.

**How to use it properly:** treat an inversion as a warning light that risk is rising, not as a calendar. It tells you what the market is betting on, not what must happen. When Stage 20.2 lays out macro regimes, we'll put the curve's shape on the same map as growth and inflation.

### ⑤ How the curve moves: bull and bear, steepening and flattening

Traders use four phrases for how the curve changes. “Bull” means yields fall (bond prices rise, good news for bond holders) and “bear” means yields rise. “Steepening” means the long–short gap widens; “flattening” means it narrows:

<table><tr><th>Name</th><th>What happens</th><th>Typical cause</th></tr><tr><td>Bull steepening</td><td>Yields fall overall, short end falls more</td><td>Market expects Fed cuts</td></tr><tr><td>Bear steepening</td><td>Yields rise overall, long end rises more</td><td>Rising term premium, deficit and supply worries, higher inflation expectations</td></tr><tr><td>Bull flattening</td><td>Yields fall overall, long end falls more</td><td>Flight to safety into long bonds, weaker growth outlook</td></tr><tr><td>Bear flattening</td><td>Yields rise overall, short end rises more</td><td>Market expects Fed hikes</td></tr></table>

The last two years of the US curve supply two textbook examples (FRED closes):

- **End-2024 → end-2025: the short end fell, the long end didn't.** The Fed cut a total of 1.75 points between September 2024 and December 2025. The 2-year yield fell from 4.25% to 3.47%, but **the 30-year rose from 4.78% to 4.84%**. The curve steepened sharply: “bull” at the short end, “bear” at the long end. The lesson: **Fed cuts don't guarantee lower long-term rates.** The long end listens to the term premium and to fiscal policy.
- **February 27, 2026 → September 24, 2026: bear flattening.** The oil shock from the Iran war pushed inflation back up and markets started betting on hikes. The 2-year rose from 3.38% to 4.87% (+1.49 points), the 10-year from 3.97% to 5.18% (+1.21), the 30-year from 4.64% to 5.47% (+0.83). The whole line shifted up, the short end most of all, and on September 16 the Fed did indeed hike by 0.25 points.

**The new-era view:** different points on the curve correspond to different products in the new financial world.

- **The far left end** is home to stablecoin reserves and tokenized Treasury funds. They hold very short T-bills, so their returns track the 3-month rate (Stage 13.2, Stage 14.2). How much “on-chain dollar yield” is on offer depends on the height of the curve's left end.
- **The far right end** is the benchmark for perpetual preferreds. The fixed-dividend preferreds issued by bitcoin treasury companies compete with long Treasuries and investment-grade corporate bonds for the same income-seeking buyers (Stage 18.1).
- **Floating-rate designs** such as Strategy's STRC tie themselves to the left end instead of the right, so their prices don't swing with the long end (Stage 17.4).

So when you see “bear steepening,” your first thought should be: long-dated fixed income (long preferreds included) is under pressure, while short-dated yield products look relatively better.
`,

  demo: "yield-curve",

  analogy: `
Think of the yield curve as **a hotel's rate card**: what you pay for one night, one week, one month or one year, all converted to an annual rate.

Normally the long-stay rate is a little higher. The hotel has to hold the room for you and give up the chance to charge more later, and you take the risk of discovering you hate the place after you've moved in. That extra is the **term premium**.

If the manager expects a big convention next month that will send room prices soaring, today's one-year rate goes up too. It contains an **expectation** about future prices.

Now flip it. Tonight's rate is sky-high because there's a concert nearby, but everyone knows the concert ends next week, so the long-stay rate comes in below tonight's. That's an **inversion**: short-term expensive, long-term cheap, because the market expects “expensive” not to last.

An experienced traveler can read the rate card and guess what the owner thinks is coming. But owners guess wrong too. From 2022 to 2024 that “tonight is outrageously expensive” rate card stayed up for more than two years, and the promised quiet season never showed.
`,

  misconceptions: [
    "**“The yield curve is a chart of the 10-year yield over time.”** That's a time-series chart. The yield curve joins yields at different maturities on **one day**; its horizontal axis is maturity, not date.",
    "**“Once the curve inverts, a recession is certain.”** Inversion has been a fairly reliable warning light, but it's not a calendar. After roughly 26 months of inversion from July 2022 to September 2024, the US still had no recession as of September 2026. The curve reflects market bets, which the term premium and fiscal spending can distort.",
    "**“When the Fed cuts, long rates naturally follow.”** The Fed mainly pins the far left end. From end-2024 to end-2025, the 2-year yield fell about 0.78 points while the 30-year edged higher. The long end also depends on the term premium, inflation expectations and Treasury supply (Stage 4.5).",
    "**“Long rates are higher than short rates, so long bonds simply earn more.”** Part of the gap is expected future rate increases (which, if they happen, you'd also capture by rolling short bills), and part is compensation for sitting on a longer seesaw (the term premium). A higher yield is **the price of risk**, not a free lunch.",
    "**“The term premium is always positive.”** On the New York Fed's ACM model, the 10-year term premium was negative for most of 2016–2023, reaching about −1.36% in July 2020. It only turned positive in late 2024 and was about +0.84% in July 2026. It shifts a lot with inflation risk, central-bank bond buying and fiscal conditions.",
  ],

  quiz: [
    {
      q: "On September 25, 2026, the 2-year Treasury yield was about 4.81% while the fed funds target range was 3.75%–4.00%. Using “long rate ≈ average expected short rate + term premium,” what does this most likely say?",
      options: [
        "The market expects the Fed to cut sharply soon",
        "The market expects the average policy rate over the next two years to be above today's, meaning possible further hikes",
        "The 2-year Treasury has picked up default risk",
        "The yield curve has inverted",
      ],
      answer: 1,
      explain: "**A 2-year yield well above today's policy rate means the market expects a higher average policy rate ahead.** The 2-year term premium is usually small, so the gap mostly reflects expectations; the fact sheet reads it the same way, as markets pricing more hikes.",
    },
    {
      q: "Which statement about the 2022–2024 inversion of the US 10-year-minus-2-year spread is correct?",
      options: [
        "It lasted about 26 months, the longest on record, and as of September 2026 no recession had followed",
        "It lasted only two weeks",
        "The US entered a recession three months after it began",
        "The spread stayed positive throughout",
      ],
      answer: 0,
      explain: "**Persistently inverted from July 2022, last negative close on September 5, 2024: about 26 months.** It's a famous exception to “inversion predicts recession” and a reminder that the signal is a warning light, not a calendar.",
    },
    {
      q: "The whole curve moves up, and long yields rise more than short yields. What is this called, and what usually causes it?",
      options: [
        "Bull flattening: safe-haven money buying long bonds",
        "Bull steepening: markets expecting rate cuts",
        "Bear flattening: markets expecting rate hikes",
        "Bear steepening: a rising term premium, deficit and supply worries, or higher inflation expectations",
      ],
      answer: 3,
      explain: "**“Bear” means yields up; “steepening” means the long–short gap widens.** A long end that rises more usually reflects the term premium, Treasury supply and inflation risk, which is exactly the heart of Stage 4.5's story about the 30-year yield.",
    },
    {
      q: "Why do banks that borrow short and lend long dislike an inverted yield curve?",
      options: [
        "Because deposit insurance stops working during an inversion",
        "Because banks can't issue shares during an inversion",
        "Because their profit is the gap between long-term lending rates and short-term funding costs, and an inversion shrinks it or makes it negative, so lending stops paying",
        "Because an inversion means Treasuries are defaulting",
      ],
      answer: 2,
      explain: "**Banks earn the slope of the curve.** When it inverts, funding a 10-year loan with 3-month deposits can lose money on every loan, so banks lend less and the economy cools. That's one mechanism linking inversions to recessions.",
    },
  ],

  further: [
    { label: "US Treasury: Daily Treasury Par Yield Curve Rates", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve" },
    { label: "New York Fed: ACM Treasury term premia data", url: "https://www.newyorkfed.org/research/data_indicators/term-premia-tabs" },
    { label: "New York Fed: The Yield Curve as a Leading Indicator (recession-probability model)", url: "https://www.newyorkfed.org/research/capital_markets/ycfaq" },
    { label: "FRED: 10-Year minus 2-Year Treasury spread (T10Y2Y)", url: "https://fred.stlouisfed.org/series/T10Y2Y" },
  ],
};
