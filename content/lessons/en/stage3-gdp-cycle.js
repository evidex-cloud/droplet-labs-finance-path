export default {
  id: "gdp-cycle",
  stage: 3,
  order: 1,
  title: "GDP, Growth & the Business Cycle: The Economy's Heartbeat",
  difficulty: "intro",
  prereqs: ["real-vs-nominal"],

  oneLiner:
    "Every day the news talks about \"growth\" and \"recession risk\" — but what is actually being measured? **GDP is the total value of all final goods and services a country produces in a year**, and it breaks down into **C + I + G + NX** (consumption, investment, government purchases, net exports). It never rises in a straight line; it swings around a long-run trend, and those swings are the **business cycle**. Learn to read this heartbeat and you will see why rates, jobs, stocks and even Bitcoin all move to the same rhythm.",

  intuition: `
Picture a tiny island with three households: a baker, a fisher and a carpenter. This year the baker bakes $10,000 of bread, the fisher lands $20,000 of fish, and the carpenter builds the baker a new oven house worth $30,000. What is the island's **GDP (gross domestic product)** this year?

The answer is **$60,000**: add up everything that was **newly produced** this year and reached a **final user**. The bread and fish get eaten (consumption); the oven house will be used for years (investment). If the fisher also sold the baker some flour, that flour is **not counted again** — its value is already baked into the price of the bread. That is the single most important rule of GDP: **count final goods only, never intermediate ones, or you double-count.**

US GDP is that island scaled up to more than 330 million people. As of the second quarter of 2026, US nominal GDP was running at about **$32.5 trillion a year** (FRED). Keep that number handy. In Stage 3.3, when we talk about the national debt, "debt as a percent of GDP" means dividing the debt by exactly this figure.

Why does GDP matter so much? Because GDP is also the economy's **income**. Every dollar of stuff produced ends up as somebody's wages, profits, interest or rent. When GDP grows, people as a whole earn more. When it shrinks, somebody loses a job, some company loses money, and some loan doesn't get repaid.

And GDP is never a straight line. Like a heartbeat on a monitor, it rises and falls:

- **Expansion**: firms hire, invest and add capacity; jobs are plentiful, incomes rise, people spend more, and the loop feeds itself.
- **Peak**: capacity gets tight, wages and prices rise quickly, and the central bank starts raising rates to tap the brakes (Stage 1.3).
- **Contraction (recession)**: demand weakens, firms lay people off and cut investment, unemployment rises, incomes fall, and spending falls further.
- **Trough**: rates have been cut, inventories are cleared, the weakest firms are gone, and a new expansion begins.

This up-and-down pattern is the **business cycle**. Over long periods the US economy grows along a rising **trend line** (more workers plus higher productivity); the cycle is the **wobble around that line**.

Remember the lesson of Stage 2.5 as well: **nominal is not real**. Nominal GDP is measured at this year's prices, so if prices rise 4% and output does not change at all, nominal GDP still rises 4%. What economists really care about is **real GDP** — how much more stuff we actually produced once rising prices are stripped out. When the news says "the economy grew 2%," it almost always means **real GDP growing at a 2% annualized rate**.

Why is this one of the first lessons in a finance course? Because **the cycle drives interest rates, and interest rates drive the price of every asset**. This lesson sits mainly on **Idea ① The price of time**: when the economy overheats, the central bank hikes, Treasury yields rise, and the discount rate for every asset moves up with them (Stage 2.4); in a recession rates fall and discount rates fall. It also touches **Idea ④ Risk & leverage**: in good times people are happy to borrow, leverage piles up, and when the downturn arrives, that leverage magnifies the losses.

As of September 2026 the US sits in an unusual spot. The yield curve was inverted for a record stretch of roughly 26 months across 2022–2024, and many people treated a recession as a sure thing — **yet as of September 2026 no recession has arrived.** Meanwhile an oil shock pushed inflation back up and the Fed **raised** rates on September 16, 2026. The cycle is not a train that runs on a timetable. You need a dashboard (Stage 3.2), not a calendar.

**In this lesson we break it into five pieces:**

- **① How GDP is counted: C + I + G + NX**
- **② Nominal vs real: deflators and how to read growth rates**
- **③ The four phases of the cycle and the output gap**
- **④ What drives the cycle: credit, inventories, rates and shocks**
- **⑤ How the cycle reaches markets: from Treasuries and stocks to Bitcoin**
`,

  mechanics: `
### ① How GDP is counted: C + I + G + NX

The statisticians (in the US, the Bureau of Economic Analysis, BEA) use the **expenditure approach**, which splits GDP into four parts:

$$
GDP = C + I + G + (X − M)
$$

- **C, consumption**: what households buy — food, rent, health care, phones, travel. In the US this is by far the largest piece, **more than two-thirds of GDP**. The US is, to a large degree, a consumer economy.
- **I, investment**: firms buying equipment, building plants, writing software and building data centers, plus **new residential construction**, plus **changes in inventories**. Careful: "investment" here means newly produced capital goods. **Buying shares is not I** — it is just an existing asset changing hands.
- **G, government purchases**: goods and services the government buys — defense, roads, public employees' salaries. **Transfers such as Social Security or unemployment benefits are not G**, because the government is not buying any product; that money shows up in C when households spend it.
- **NX, net exports (X − M)**: exports minus imports. Imports are **subtracted** because C, I and G already include spending on imported goods, and those goods were not produced at home.

A numerical example to lock the rules in: in one year an economy has household consumption of 700, business investment of 180, government purchases of 170, exports of 110 and imports of 160.

$$
GDP = 700 + 180 + 170 + (110 − 160) = 1,000
$$

The 160 of imports is **not simply "a drag on the economy"**. It is subtracted only to cancel the foreign-made goods already counted inside C, I and G. A common misreading goes: "tariffs cut imports, so GDP must go up." If households simply buy fewer imported goods and nothing domestic replaces them, C falls by the same amount and GDP does not magically rise.

There are two other ways to measure GDP that should, in principle, give the same answer: the **income approach** (wages + profits + interest + rent + indirect taxes, etc.) and the **production approach** (the sum of value added across industries). The fact that all three add up to the same number tells you something deep: **one person's spending is another person's income.** That is also why recessions feed on themselves — when you spend less, somebody else earns less.

**The new-era angle**: the data centers, chips and power infrastructure behind AI are recorded in **I**. The facts file cites estimates of global AI and data-center capital spending in the trillions of dollars over 2025–2028 (Stage 19.2 digs in). When one category of investment gets that large, it can carry an expansion on its own — one reason US stocks sat near record highs in 2026 despite high interest rates.

### ② Nominal vs real: deflators and how to read growth rates

Nominal GDP is "quantities × this year's prices"; real GDP is "quantities × the prices of some base year." The ratio between them is the **GDP deflator**, a price index that covers everything the economy produces:

$$
Real GDP = Nominal GDP ÷ Deflator
Real growth ≈ Nominal growth − Inflation
$$

Example: nominal GDP rises from 1,000 to 1,060 (+6%) while the deflator rises from 100 to 104 (+4%). Real GDP = 1,060 ÷ 1.04 ≈ 1,019.2, so **real growth is about 1.9%**, not 6%. This is exactly the Fisher relation from Stage 2.5: (1.06 ÷ 1.04) − 1 ≈ 1.92%.

Three pieces of jargon you need to read US data correctly:

- **Annualized**: US quarterly GDP is reported as "the growth rate we'd get if this quarter's pace continued for a full year." A quarter with 0.5% growth over the previous quarter is reported as (1.005)⁴ − 1 ≈ **2.0%**. Many European countries publish the plain quarter-on-quarter number, so a naive comparison is off by a factor of four.
- **Advance, second and third estimates**: the BEA publishes an "advance" estimate first, revises it in each of the next two months, and revises again in annual updates years later. **First prints are often changed**, and a market's reaction to the first number sometimes reverses once the revisions come in.
- **Nominal GDP matters more for debt**: debt and interest are fixed in nominal dollars. When inflation is high, nominal GDP grows fast, and **debt as a share of GDP can actually fall**. That idea is central to the debt-sustainability discussion in Stage 3.3 and Stage 9.4.

### ③ The four phases of the cycle and the output gap

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The business cycle: real GDP swings around its long-run trend (illustrative)</text><line x1="50" y1="240" x2="615" y2="240" stroke="var(--line)" stroke-width="1"/><line x1="50" y1="40" x2="50" y2="240" stroke="var(--line)" stroke-width="1"/><text x="610" y="256" text-anchor="end" font-size="10" fill="var(--muted)">time →</text><text x="56" y="50" font-size="10" fill="var(--muted)">real GDP (log scale)</text><line x1="60" y1="210" x2="600" y2="100" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="6 4"/><text x="600" y="92" text-anchor="end" font-size="10.5" fill="var(--muted)">long-run trend (potential output)</text><polyline points="60,210 75,197 90,186 105,177 120,170 135,167 150,167 165,171 180,176 195,183 210,189 225,194 240,198 255,198 270,195 285,188 300,179 315,168 330,155 345,142 360,131 375,122 390,115 405,112 420,112 435,116 450,121 465,127 480,134 495,139 510,143 525,143 540,140 555,133 570,124 585,113 600,100" fill="none" stroke="var(--orange)" stroke-width="2.5"/><rect x="142" y="60" width="118" height="180" fill="var(--red-soft)" opacity="0.55"/><rect x="412" y="60" width="118" height="180" fill="var(--red-soft)" opacity="0.55"/><circle cx="142" cy="167" r="4.5" fill="var(--red)"/><text x="142" y="157" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">peak</text><circle cx="258" cy="198" r="4.5" fill="var(--blue)"/><text x="258" y="216" text-anchor="middle" font-size="11" font-weight="700" fill="var(--blue)">trough</text><text x="201" y="75" text-anchor="middle" font-size="11" fill="var(--red)">contraction</text><text x="330" y="75" text-anchor="middle" font-size="11" fill="var(--green)">expansion</text><text x="95" y="75" text-anchor="middle" font-size="11" fill="var(--green)">expansion</text><text x="471" y="75" text-anchor="middle" font-size="11" fill="var(--red)">contraction</text><line x1="397" y1="113" x2="397" y2="141" stroke="var(--green)" stroke-width="2"/><text x="402" y="100" font-size="10" fill="var(--green)">positive gap: overheating</text><line x1="262" y1="197" x2="262" y2="169" stroke="var(--blue)" stroke-width="2"/><text x="270" y="232" font-size="10" fill="var(--blue)">negative gap: slack</text><text x="320" y="278" text-anchor="middle" font-size="10.5" fill="var(--muted)">Shaded = contraction; vertical distance between the lines = the output gap</text></svg><figcaption>The cycle is a wobble around the trend. A positive output gap means inflation pressure; a negative one means unemployment and a central bank inclined to cut.</figcaption></figure>

The dashed line is **potential output**: how much the economy can produce using its labor and capital fully without inflation accelerating. The distance between actual real GDP and that line is the **output gap**:

$$
Output gap = (Actual GDP − Potential GDP) ÷ Potential GDP
$$

- A **positive** gap (say +2%): the economy is running faster than its comfortable speed. Factories are at full tilt, employers can't find workers, wages and prices rise — the central bank wants to hike.
- A **negative** gap (say −4%): machines sit idle and people can't find work, inflation pressure is low — the central bank wants to cut.

**Who decides it's a recession?** The media often use the rule of thumb "two consecutive quarters of negative real GDP growth," but in the US the official referee is a private academic body: the Business Cycle Dating Committee of the **National Bureau of Economic Research (NBER)**. It looks for "a significant decline in economic activity that is spread across the economy and lasts more than a few months," weighing employment, real income, spending, industrial production and more — and it usually announces its verdict **many months after the fact**.

Two historical examples give you a feel for length and depth:

- **The 2008 financial-crisis recession**: NBER dates it from December 2007 to June 2009, 18 months, the longest since World War II (Stage 10.2).
- **The 2020 pandemic recession**: February to April 2020, just two months, the shortest and steepest on record. Unemployment hit 14.8% in April 2020, then fell quickly on the back of unprecedented fiscal and monetary support.

There is **no fixed rhythm** to the cycle. Post-war US expansions have been far longer than recessions: expansions often run five or ten years, while recessions usually last under a year and a half.

### ④ What drives the cycle: credit, inventories, rates and shocks

Why can't an economy just grow smoothly? Economists point to several engines, and several usually run at once:

- **The credit cycle (Idea ④)**: in good times banks lend more freely, firms and households borrow more, rising asset prices make collateral more valuable, and that allows still more borrowing — leverage builds with the cycle. When bad news arrives the process runs in reverse: collateral loses value, lending tightens, and people are forced to sell. This is the heart of Minsky's "stability breeds instability" in Stage 10.4.
- **The inventory cycle**: when firms expect strong demand they stock up (inventory accumulation shows up in I). When demand disappoints they sell down inventory and order less, and upstream factories feel the chill immediately. Inventory swings often make quarterly GDP figures jumpy.
- **Interest rates and monetary policy (Idea ①)**: the central bank hikes when the economy overheats, making borrowing, mortgages and assets more expensive to carry and cooling demand; it cuts in recessions. Policy works with **long and variable lags** (Stage 9.2), so central banks often brake too hard or too late.
- **External shocks**: oil, war, pandemics, tariffs. The war with Iran that began on February 28, 2026 disrupted the Strait of Hormuz, and Brent crude peaked at about $138 on April 7, 2026. **Supply shocks** like this are especially nasty: they push prices up and output down at the same time, leaving the central bank with no good option — the backdrop for the "stagflation" discussion in Stage 9.5.
- **Fiscal policy**: more government spending or lower taxes boosts demand (through G and C) but also widens the deficit (Stage 3.3).

One more engine is easy to overlook: **expectations themselves**. If firms fear a recession they stop hiring and investing; if households fear layoffs they save more — and the recession becomes self-fulfilling. Optimism works the other way; enthusiasm about AI, for instance, can sustain an investment boom. This is the **reflexivity** idea you'll meet in Stage 10.4.

### ⑤ How the cycle reaches markets: from Treasuries and stocks to Bitcoin

The cycle is the weather that financial markets live in. A rough but useful map:

<table>
<tr><th>Phase</th><th>Central bank</th><th>Treasury yields</th><th>Stocks</th><th>Credit spreads</th></tr>
<tr><td>Early expansion</td><td>Keeps rates low</td><td>Rising from lows</td><td>Usually strongest</td><td>Narrowing</td></tr>
<tr><td>Late expansion / overheating</td><td>Hikes</td><td>Rising; curve flattens</td><td>Mixed; valuations squeezed</td><td>Very tight (hidden risk)</td></tr>
<tr><td>Recession</td><td>Cuts</td><td>Falling (bonds rally)</td><td>Falling</td><td>Widen sharply</td></tr>
<tr><td>Recovery</td><td>Low rates, maybe QE</td><td>Low</td><td>Often rebound early</td><td>Narrowing</td></tr>
</table>

Key points:

- **Markets look forward.** Stocks usually bottom **before** a recession ends and peak **before** an expansion ends, because prices reflect discounted future cash flows (Stage 2.3), not today's data.
- **The yield curve is the cycle's thermometer**: when the central bank hikes, short yields rise faster than long ones, and the curve flattens or inverts. Historically, inversions have often preceded recessions (Stage 4.3). But after the record ~26-month inversion of 2022–2024, **there was still no recession as of September 2026** — a signal, not a law.
- **Bitcoin breathes with the cycle too.** It has no cash flows, but its price is highly sensitive to **liquidity and real interest rates** (Stage 9.3, Stage 12.4): it has tended to do well in easing phases and struggle in tightening ones. As of September 2026, Bitcoin traded around $84,000, roughly a third below its all-time high of about $126,000 in October 2025 — in step with rising long-term yields worldwide and central banks hiking again.
- **DATs are even more cycle-sensitive.** A company that raises money by issuing stock and preferreds to buy Bitcoin (Stage 15.1) can raise capital easily in an expansion, while in a tightening phase the funding window may shut. Understanding the cycle is a prerequisite for stress-testing a DAT in Stage 18.2.

Carry one chain of logic through the whole course: **cycle → central-bank policy → risk-free rate → the discount rate on every asset.** Next, in Stage 3.2, we learn how to use the monthly data releases to figure out where in the cycle we are; Stage 20.2 combines growth and inflation into "macro regimes" and discusses how each asset class tends to behave in each.
`,

  demo: "gdp-cycle",

  analogy: `
Think of the economy as a long-distance runner, with GDP as the distance covered each hour.

The runner has a **comfortable pace** (potential output), set by stamina (the labor force) and training (technology and capital). Years of training raise that comfortable pace slowly — that is the long-run trend line.

But during the race the runner never holds a perfectly even pace. When the crowd is cheering and the legs feel good, the runner speeds up (expansion), the heart rate climbs and breathing gets ragged (overheating, inflation). The coach (the central bank) sees the heart rate spike and shouts "ease off!" (a rate hike). The runner slows — sometimes too much, even stopping to catch their breath (recession). Then the coach shouts "okay, pick it up" (a rate cut) and the runner finds a rhythm again.

Now and then a rock appears on the course (an oil shock, a pandemic). The runner is slowed down and startled into a higher heart rate at the same time — the coach's worst case, because both "faster" and "slower" are the wrong call.

Every spike and dip on the heart monitor **matches one of the coach's shouts**, and the coach's shouts (interest rates) determine what every bettor in the stands — stock, bond and Bitcoin holders alike — has riding on the race. **Reading the cycle means reading what the coach will shout next.**
`,

  misconceptions: [
    "**\"GDP measures a country's wealth.\"** — GDP is a **flow** (how much was newly produced this year), not a **stock** (how much wealth has piled up). A country can have high GDP and modest wealth, or the reverse — just as a salary is a flow and savings are a stock.",
    "**\"Two negative quarters is the official definition of a recession.\"** — It's a media rule of thumb. In the US, the NBER decides by weighing employment, income, spending and production, often months after the fact. The first estimates of US GDP were negative for both Q1 and Q2 of 2022, and the NBER did not call a recession.",
    "**\"Fewer imports raise GDP, so tariffs must boost growth.\"** — Imports are subtracted only to cancel foreign-made goods already counted in C, I and G. If fewer imports aren't replaced by domestic output, consumption falls by the same amount and GDP doesn't rise; tariffs can also raise costs and invite retaliation.",
    "**\"Nominal GDP grew 6%, so the economy is booming.\"** — With 4% inflation, real growth is only about 2%. Always strip out prices first (the Fisher relation from Stage 2.5).",
    "**\"The yield curve inverted, so a recession is certain.\"** — Inversions have often preceded recessions, but after the roughly 26-month inversion of 2022–2024, no recession had arrived as of September 2026. It's a useful signal, not a law of nature.",
  ],

  quiz: [
    {
      q: "An economy has consumption 700, investment 180, government purchases 170, exports 110 and imports 160. What is GDP?",
      options: ["1,160", "1,320", "1,000", "1,050"],
      answer: 2,
      explain: "**GDP = C + I + G + (X − M)** = 700 + 180 + 170 + (110 − 160) = **1,000**. Imports are subtracted because C, I and G already include spending on foreign-made goods.",
    },
    {
      q: "Which of these counts as \"investment (I)\" in GDP?",
      options: [
        "You buy $10,000 of shares in your brokerage account",
        "A company builds a new data center",
        "The government pays Social Security benefits to retirees",
        "You buy a used house from your neighbor",
      ],
      answer: 1,
      explain: "In GDP, I means **newly produced capital goods** (equipment, structures, software, new homes, inventory changes). Buying shares or a used house just moves existing assets; Social Security is a transfer. None of them creates new output.",
    },
    {
      q: "Nominal GDP grows 6% and the GDP deflator rises 4%. Roughly how fast did real GDP grow?",
      options: ["About 1.9%", "10%", "About 6%", "About 4%"],
      answer: 0,
      explain: "**Real growth = (1 + nominal) ÷ (1 + inflation) − 1** = 1.06 ÷ 1.04 − 1 ≈ **1.9%** — the same Fisher logic as Stage 2.5.",
    },
    {
      q: "US real GDP grows 0.5% over the previous quarter. What annualized growth rate will the headlines report?",
      options: ["0.5%", "1.0%", "6.2%", "About 2.0%"],
      answer: 3,
      explain: "The US reports annualized rates: (1.005)⁴ − 1 ≈ **2.0%**. When comparing countries, watch out: many publish plain quarter-on-quarter growth.",
    },
    {
      q: "The economy has a positive output gap (actual GDP above potential). What is the central bank most likely to do, and what does that mean for long-term Treasury prices?",
      options: [
        "Cut rates; Treasury prices fall",
        "Hike or stay tight; yields tend to rise and Treasury prices come under pressure",
        "Do nothing; Treasury prices are unaffected",
        "Print money to buy stocks; Treasury prices rise",
      ],
      answer: 1,
      explain: "A positive gap means overheating and inflation pressure, so the central bank leans toward **hiking**. A higher risk-free rate pushes bond prices down and raises the discount rate on every asset (Idea ①, Stage 2.4).",
    },
  ],

  further: [
    { label: "Bureau of Economic Analysis (BEA): official GDP data and release schedule", url: "https://www.bea.gov/data/gdp/gross-domestic-product" },
    { label: "NBER: official US business cycle expansions and contractions", url: "https://www.nber.org/research/business-cycle-dating" },
    { label: "FRED: US nominal GDP series (GDP)", url: "https://fred.stlouisfed.org/series/GDP" },
    { label: "FRED: US real GDP series (GDPC1)", url: "https://fred.stlouisfed.org/series/GDPC1" },
  ],
};
