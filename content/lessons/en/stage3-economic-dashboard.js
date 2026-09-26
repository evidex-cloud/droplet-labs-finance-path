export default {
  id: "economic-dashboard",
  stage: 3,
  order: 2,
  title: "The Economic Dashboard: Jobs, CPI/PCE, PMIs & How Markets Read Them",
  difficulty: "intro",
  prereqs: ["gdp-cycle"],

  oneLiner:
    "GDP comes out only once a quarter, and late. Markets can't wait, so they watch a row of **monthly and weekly** gauges instead: payrolls and unemployment, CPI and PCE inflation, PMIs, retail sales, jobless claims. But the rule that matters most is this: **prices react only to surprises.** Whether a number is good or bad matters far less than whether it is **better or worse than expected**. This lesson teaches you to read the gauges — and to read the market's reaction to them.",

  intuition: `
Stage 3.1 described the economy as a long-distance runner with the central bank as coach. Here's the problem: **the coach can't see the heart monitor in real time.** GDP is published once a quarter, the first estimate arrives about a month after the quarter ends, and it gets revised several times after that. By the time GDP tells you "we're in a recession," the recession may be half over.

So coaches, investors and traders all watch a row of **faster gauges**:

- **Jobs**: nonfarm payrolls and the unemployment rate, out on the first Friday of each month — often called the most important monthly report on the US economy.
- **Inflation**: CPI (the consumer price index) in the middle of the month, the PCE price index at the end of the month. The Fed's 2% target is defined in terms of PCE.
- **Business mood**: PMIs (purchasing managers' indexes) at the start of each month, which ask firms whether things are better or worse than last month.
- **Spending**: retail sales, which tell you whether Americans are still opening their wallets (remember Stage 3.1: consumption is more than two-thirds of GDP).
- **The weekly pulse**: initial jobless claims every Thursday. Layoff waves usually show up here first.

There's a secret to reading these gauges that matters more than the numbers themselves: **markets react only to surprises.**

An example. Suppose Wall Street economists broadly expect payrolls to rise by 150,000 this month. That "consensus" is already baked into prices. The number comes out at 260,000 — 110,000 above expectations. **That 110,000 is the news.** Treasury yields may jump within seconds as the market realizes the economy is running hotter than thought and the Fed may keep rates higher for longer.

Flip it around: if everyone expected 300,000 and the number is 260,000, the same "260,000" will be read as **bad news** — weaker than hoped.

**The same number can move markets in opposite directions depending on the surprise.** That's why you often see headlines like "strong data, stocks fall." When inflation is the main worry, good news (a strong economy) means a more hawkish Fed and higher discount rates, which is bad for stocks. Traders call this "**good news is bad news.**"

This lesson rests mainly on **Idea ① The price of time**: each data release updates the market's view of the future path of interest rates, that path sets Treasury yields, and Treasury yields set the discount rate for every asset (Stage 2.4). It also touches **Idea ③ Liquidity & trust**: economic data is the shared public information the whole market prices from. During the 43-day US government shutdown in the fall of 2025, data releases stopped — the October 2025 CPI was **never published at all** — and for a while markets and the Fed were flying partly blind.

As of September 2026 the dashboard reads **hot**. August 2026 payrolls rose by about **162,000**, far above the weak pace of roughly 31,000 a month over the prior 12 months; unemployment was **4.1%**; August CPI inflation was **3.4%** year over year (with energy up 16.3%); July PCE inflation was **3.7%**. The result: on September 16, 2026, the Fed **raised rates by 25 basis points**, its first hike since 2023.

**In this lesson we break it into five pieces:**

- **① Jobs: payrolls, unemployment and revisions**
- **② Inflation: CPI, PCE, core, and the year-over-year trap**
- **③ Activity and spending: PMIs, retail sales and jobless claims**
- **④ Expectations and surprises: markets react only to what they didn't see coming**
- **⑤ From data to prices: 2-year and 10-year yields, stocks and Bitcoin**
`,

  mechanics: `
### ① Jobs: payrolls, unemployment and revisions

The Bureau of Labor Statistics' monthly **Employment Situation** report actually comes from **two separate surveys**:

- **The establishment survey** asks a large sample of businesses and government agencies about their payrolls. It produces the **monthly change in nonfarm payrolls** (NFP). Farm jobs are excluded because they're too seasonal.
- **The household survey** asks about 60,000 households about their situation. It produces the **unemployment rate**, the participation rate and more. \\(\\text{Unemployment rate} = \\dfrac{\\text{unemployed}}{\\text{labor force}}\\), where \\(\\text{labor force} = \\text{people with jobs} + \\text{people looking for one}\\). **People not looking for work don't count as unemployed**, so a low unemployment rate can partly reflect people giving up.

The two surveys sometimes tell conflicting stories, so read them together. And watch the **revisions**: every report revises the previous two months of payrolls, and there's an annual "benchmark revision" too. A report that looks strong on the headline but sharply revises down the prior two months may, overall, be a weak report.

A widely cited recession warning is the **Sahm rule** (Claudia Sahm, 2019): when the three-month average of the unemployment rate rises **0.5 percentage point or more** above its low of the previous 12 months, a recession has historically usually been under way. It was triggered in the summer of 2024 — and no recession followed. Like the inverted yield curve, it's a statistical regularity, not a law of nature.

**Readings as of September 2026:** unemployment rose from a low of about 3.4% in 2023 to a peak of about 4.5% in November 2025, then drifted back to **4.1%** in August 2026. From mid-2025 to mid-2026 the US labor market was in an odd "**low hire, low fire**" state: very few jobs were added each month, yet unemployment barely rose. August 2026's gain of about 162,000 signaled that hiring had picked up again — part of the backdrop to the September hike.

### ② Inflation: CPI, PCE, core, and the year-over-year trap

Stage 1.4 explained what inflation is; here we learn **how to read the inflation data**. The two main indexes:

<table>
<tr><th></th><th>CPI (consumer price index)</th><th>PCE price index (personal consumption expenditures)</th></tr>
<tr><td>Published by</td><td>BLS, mid-month</td><td>BEA, end of month</td></tr>
<tr><td>Coverage</td><td>Out-of-pocket spending by urban households</td><td>Broader: includes spending made on your behalf (e.g. employer health insurance)</td></tr>
<tr><td>Weights</td><td>Housing weighs heavily</td><td>Housing weighs less, health care more</td></tr>
<tr><td>Who watches most</td><td>Markets (it comes out first and moves prices)</td><td><b>The Fed's 2% target uses it</b></td></tr>
</table>

**Core inflation** strips out food and energy. That's not because food and energy don't matter — they matter a lot — but because they swing wildly with weather and wars and hide the underlying trend. Central banks focus on core because it predicts future inflation better.

**As of September 2026:** August 2026 CPI was **3.4%** year over year and core CPI **2.4%** (the lowest since March 2021), while energy was up **16.3%** — the Iran-war oil shock was the main driver of headline inflation. July PCE was **3.7%**, core PCE **3.3%**. Note an unusual feature: core CPI and core PCE were almost a full percentage point apart, far more than normal, and the reasons are still debated — so the simple takeaway this course uses is "headline inflation around 3.5%." US inflation has been above the Fed's 2% target continuously since early 2021.

Two traps when reading inflation:

- **Month-over-month vs year-over-year**: traders watch the **monthly** change most closely, especially monthly core CPI. A 0.2% monthly rate annualizes to about \\((1.002)^{12} - 1 \\approx 2.4\\%\\); 0.4% annualizes to about \\((1.004)^{12} - 1 \\approx 4.9\\%\\). The numbers look only 0.2 apart; the meaning is worlds apart.
- **Base effects**: the year-over-year rate is the accumulation of the last 12 monthly changes. If prices jumped in the same month last year, this year's annual rate can fall "automatically" even if prices rose a fair amount this month.

### ③ Activity and spending: PMIs, retail sales and jobless claims

A **PMI (purchasing managers' index)** is a survey. It asks purchasing managers whether new orders, output, employment, delivery times and inventories are "better, the same, or worse" than last month. The math makes **50 the dividing line**:

- \\(\\mathrm{PMI} > 50\\): more firms report expansion than contraction;
- \\(\\mathrm{PMI} < 50\\): more firms report contraction;
- the further from 50, the stronger and broader the change.

In the US the most-watched are the ISM manufacturing and services PMIs, plus S&P Global's PMIs. PMIs are **fast** (out at the start of the month), **not revised**, and sub-indexes such as "new orders" and "prices paid" often lead the hard data. The catch: a PMI measures direction and breadth, not size. A PMI of 52 does not mean 2% growth.

**Retail sales**, released mid-month, measure the dollar value of sales at retailers and restaurants. They are **nominal**: if prices rise 1% and volumes don't change, retail sales still rise 1%. In months when oil spikes, gas-station sales inflate the headline, so analysts watch the "control group," which excludes autos, gasoline and a few volatile categories.

**Initial jobless claims**, out every Thursday, are the highest-frequency labor data. Layoff waves usually show up here first. A single week is noisy, so people watch the four-week average.

Finally there are **nowcasts** such as the Atlanta Fed's GDPNow: a model that feeds in each monthly release as it arrives and updates an estimate of this quarter's GDP in real time — a rough sketch of the heart monitor before the official GDP arrives.

### ④ Expectations and surprises: markets react only to what they didn't see coming

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The second a number drops: prices react only to the surprise (illustrative)</text><line x1="40" y1="110" x2="600" y2="110" stroke="var(--line)" stroke-width="1.5"/><text x="40" y="128" font-size="10" fill="var(--muted)">0</text><text x="596" y="128" text-anchor="end" font-size="10" fill="var(--muted)">payroll gain (thousands) 300</text><rect x="180" y="70" width="140" height="40" fill="var(--surface-2)" stroke="var(--line)"/><text x="250" y="62" text-anchor="middle" font-size="10.5" fill="var(--muted)">typical range of forecasts</text><line x1="250" y1="66" x2="250" y2="116" stroke="var(--blue)" stroke-width="2.5"/><text x="250" y="140" text-anchor="middle" font-size="11" font-weight="700" fill="var(--blue)">consensus 150</text><line x1="453" y1="60" x2="453" y2="116" stroke="var(--orange)" stroke-width="2.5"/><text x="453" y="140" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">actual 260</text><line x1="256" y1="92" x2="446" y2="92" stroke="var(--orange)" stroke-width="1.5" stroke-dasharray="5 3"/><text x="350" y="86" text-anchor="middle" font-size="11" fill="var(--orange-ink)">surprise = +110</text><rect x="40" y="170" width="170" height="80" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="125" y="195" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ink)">Already priced in</text><text x="125" y="215" text-anchor="middle" font-size="10.5" fill="var(--muted)">the expected 150 is already</text><text x="125" y="232" text-anchor="middle" font-size="10.5" fill="var(--muted)">in bond and stock prices</text><rect x="235" y="170" width="170" height="80" rx="8" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="320" y="195" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--orange-ink)">News = the surprise</text><text x="320" y="215" text-anchor="middle" font-size="10.5" fill="var(--ink)">economy hotter than thought</text><text x="320" y="232" text-anchor="middle" font-size="10.5" fill="var(--ink)">→ more hikes priced in</text><rect x="430" y="170" width="170" height="80" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="515" y="195" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--red)">Prices reset in seconds</text><text x="515" y="215" text-anchor="middle" font-size="10.5" fill="var(--ink)">2-year yield ↑ the most</text><text x="515" y="232" text-anchor="middle" font-size="10.5" fill="var(--ink)">10-year ↑; stocks depend</text><line x1="212" y1="210" x2="232" y2="210" stroke="var(--muted)" stroke-width="1.5"/><line x1="407" y1="210" x2="427" y2="210" stroke="var(--muted)" stroke-width="1.5"/><text x="320" y="272" text-anchor="middle" font-size="10.5" fill="var(--muted)">The bigger the surprise relative to normal forecast error, the bigger the price move</text></svg><figcaption>Before the release, the consensus is already in prices; at the release, only \\(\\text{actual} - \\text{consensus}\\) is new information.</figcaption></figure>

Before every major release, Bloomberg, Reuters and others survey dozens of economists and take the median forecast as the **consensus**. When the number comes out:

$$
\\text{Surprise} = \\text{Actual} - \\text{Consensus}
\\text{Standardized surprise} = \\frac{\\text{Surprise}}{\\text{usual forecast error for this release}}
$$

Why standardize? Because each release has a different "normal" miss. Payrolls off by 100,000 may be an ordinary miss; monthly core CPI off by 0.2 percentage point is a big one. Standardizing lets you compare how unexpected a number really was.

Rules of thumb:

- **"Priced in"**: if everyone knows the Fed will hike 25 bp, the market may barely move when it does. What moves prices is a 50 bp hike — or no hike.
- **Revisions are surprises too**: a big downward revision to the prior two months is effectively a negative surprise released at the same time.
- **The regime sets the sign**: when inflation is the main worry (as in 2022 and fall 2026), **strong data → more hikes priced → stocks may fall**. When recession fears dominate, **strong data → lower recession risk → stocks rise**. The same surprise can move stocks in opposite directions in different regimes.
- **Surprises are symmetric**: nobody can reliably predict surprises (otherwise they'd already be in the consensus). So this lesson isn't about guessing the data; it's about **understanding why prices move**. Stage 20.3 turns this into five questions for reading any headline.

### ⑤ From data to prices: 2-year and 10-year yields, stocks and Bitcoin

A data surprise travels to prices along a fixed chain:

$$
\\text{Data surprise} \\to \\text{expected Fed rate path}
\\to \\text{Treasury yields} \\to \\text{the discount rate on every asset}
$$

- **The 2-year Treasury is the most sensitive**: its yield is essentially the market's forecast of the average policy rate over the next two years. On September 25, 2026 the 2-year yielded about **4.81%**, well above the fed funds range of 3.75%–4.00%. That gap says the market expects more hikes; CNBC reported markets pricing roughly a two-in-three chance of another hike in October.
- **The 10-year and 30-year** respond to policy expectations too, but also to the term premium, inflation expectations and Treasury supply (Stage 4.3, Stage 4.5). On September 15, 2026 the 10-year yield **closed above 5% for the first time**; by September 24 it was about 5.18%, its highest since 2007. The drivers cited in press coverage included "strong activity data" and a hawkish Fed.
- **Bond prices**: run it through the standard example. Take a $1,000 bond with a 5% coupon and 10 years to maturity. If a strong jobs report pushes the 10-year yield from 5.00% to 5.10%, the bond's price falls from $1,000 to about $992 — 10 basis points, \\(\\dfrac{992}{1{,}000} - 1 \\approx -0.8\\%\\) (the demo computes it).
- **Stocks**: depend on the regime (above). Growth stocks with high valuations and long "equity duration" are the most rate-sensitive (Stage 5.3).
- **Bitcoin**: it trades 24/7, so when the numbers hit at 8:30 a.m. New York time, it is often **one of the first assets to move**. It's sensitive to real rates and liquidity (Stage 12.4), so hot inflation prints have often weighed on it.

**The new-era angle**: macro data now reaches on-chain markets too. Yields on tokenized Treasury funds follow T-bill rates (Stage 14.2); stablecoin issuers' interest income follows the fed funds rate (Stage 13.2); and a preferred stock issued by a DAT only looks cheap or expensive once you compare its yield with Treasuries (Stage 18.1). A single CPI report can now move Wall Street's Treasuries, on-chain yields and a bitcoin treasury company's preferreds within seconds of each other. Next, in Stage 3.3, we look at who actually issues all those Treasuries and why there are ever more of them; Stage 9.2 lays out how policy transmits through the whole economy.
`,

  demo: "economic-dashboard",

  analogy: `
Think of the market as **betting on the weather forecast**.

Everyone saw last night's forecast: tomorrow, 25°C and sunny. That forecast is already "priced in" — the ice-cream shop stocked up, the umbrella shop didn't.

Then tomorrow's actual weather arrives:

- If it really is 25°C and sunny, nothing changes. Everyone was ready.
- If it's 32°C and blazing, ice cream sells out while the umbrella shop sits empty as usual. **What makes the ice-cream shop a fortune isn't "it's hot" — it's "hotter than forecast."**
- If a storm rolls in, the umbrella seller grins and the ice-cream seller groans.

There's a subtler layer. In a drought year, "hotter than forecast" is **bad news** (the crops are in more danger). In a freezing winter, the same "hotter than forecast" is **good news**. The same surprise means opposite things against different backdrops — that's "good news is bad news."

Economic data is the weather, the economists' consensus is the forecast, and Treasuries and stocks are the ice-cream and umbrella shops. **Your job isn't to predict the weather; it's to understand that prices only pay for the part the forecast missed.**
`,

  misconceptions: [
    "**\"Strong data should make stocks go up.\"** — Markets react to how much stronger than expected the data is, and the direction depends on the regime. When inflation is the main worry, strong data means higher rates, and stocks can fall.",
    "**\"Low unemployment means the job market must be great.\"** — The unemployment rate only counts people looking for work. If many people give up and leave the labor force, the rate falls too. Look at payroll gains, participation and jobless claims together.",
    "**\"CPI is the Fed's inflation target.\"** — The Fed's 2% target uses the **PCE price index**. The two differ in coverage and weights, and CPI usually runs a bit higher; in mid-2026 the gap between their core measures was unusually wide.",
    "**\"A PMI of 52 means 2% growth.\"** — A PMI is a diffusion index: it measures whether more firms say things are improving than worsening, with 50 as the dividing line. It shows direction and breadth, not the size of growth.",
    "**\"The first print is the truth.\"** — Payrolls and GDP both get revised, sometimes enough to change the conclusion. A market's reaction to the first print can reverse when the revisions arrive.",
  ],

  quiz: [
    {
      q: "The consensus expects payrolls to rise by 300,000; the actual number is 260,000. All else equal, how is the market most likely to read it?",
      options: [
        "260,000 is a lot, so it's strong good news",
        "Weaker than expected — a negative surprise; yields tend to fall",
        "Expectations don't matter; only the absolute number counts",
        "The market won't react at all",
      ],
      answer: 1,
      explain: "**\\(\\text{Surprise} = \\text{actual} - \\text{consensus} = -40{,}000\\).** Prices already reflected 300,000, so 260,000 reads as \"weaker than thought\": expected hikes are scaled back and yields tend to fall.",
    },
    {
      q: "Which measure defines the Fed's 2% inflation target?",
      options: ["Headline CPI", "PPI (producer prices)", "The GDP deflator", "The PCE price index"],
      answer: 3,
      explain: "The Fed measures its 2% target with the year-over-year change in the **PCE price index**, paying special attention to core PCE. CPI comes out first and moves markets more, but it isn't the official target measure.",
    },
    {
      q: "Monthly core CPI was expected at 0.2% and came in at 0.4%. Why is that treated as a big surprise?",
      options: [
        "Because 0.4% annualizes to about 4.9% versus about 2.4% for 0.2% — the inflation trend may have doubled",
        "Because CPI never exceeds 0.3%",
        "Because core CPI includes oil prices",
        "It's actually a tiny surprise that markets ignore",
      ],
      answer: 0,
      explain: "Monthly numbers look small but **annualize very differently**: \\((1.004)^{12} - 1 \\approx 4.9\\%\\) vs \\((1.002)^{12} - 1 \\approx 2.4\\%\\). Relative to normal forecast error, 0.2 percentage point is a large standardized surprise.",
    },
    {
      q: "Which Treasury yield is most sensitive to data surprises, especially shifts in expected Fed policy?",
      options: ["The 30-year", "The 20-year", "The 2-year", "The 10-year TIPS"],
      answer: 2,
      explain: "**The 2-year yield** is essentially the market's forecast of the average policy rate over the next two years, so it responds most to jobs and inflation surprises. Longer yields also carry term premium and supply effects.",
    },
    {
      q: "In late September 2026 the 2-year yield was about 4.8% while the fed funds range was 3.75%–4.00%. What's the most sensible reading of that gap?",
      options: [
        "Markets expect the Fed to cut sharply right away",
        "The 2-year Treasury carries serious default risk",
        "They're unrelated; it's a coincidence",
        "Markets expect the Fed to keep hiking",
      ],
      answer: 3,
      explain: "\\(\\text{2-year yield} \\approx \\text{expected average policy rate over two years}\\). Sitting well above today's policy rate, it says the market **expects more hikes** — at the time, roughly a two-in-three chance of another hike in October.",
    },
  ],

  further: [
    { label: "Bureau of Labor Statistics: The Employment Situation (payrolls and unemployment)", url: "https://www.bls.gov/news.release/empsit.nr0.htm" },
    { label: "Bureau of Labor Statistics: Consumer Price Index monthly release", url: "https://www.bls.gov/news.release/cpi.nr0.htm" },
    { label: "Bureau of Economic Analysis: PCE price index", url: "https://www.bea.gov/data/personal-consumption-expenditures-price-index" },
    { label: "Atlanta Fed GDPNow: real-time GDP nowcast", url: "https://www.atlantafed.org/cqer/research/gdpnow" },
    { label: "FRED: unemployment rate series (UNRATE)", url: "https://fred.stlouisfed.org/series/UNRATE" },
  ],
};
