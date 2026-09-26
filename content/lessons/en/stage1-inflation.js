export default {
  id: "inflation",
  stage: 1,
  order: 4,
  title: "Inflation & Purchasing Power: How CPI Works, Why Prices Rise, Who Wins & Loses",
  difficulty: "intro",
  prereqs: ["central-banks"],

  oneLiner:
    "Inflation is not “things getting expensive” so much as **money losing value**: at 3% a year, $100 buys only about $74 worth of today's goods after 10 years. This lesson takes apart three things: **how the CPI number is built** (a basket and its weights); **why prices rise** (too much money, too much demand, choked-off supply); and the part most people miss — **inflation is a silent redistribution of wealth**: fixed-rate borrowers and governments win, cash savers and bondholders lose, and whoever is closest to the new money benefits first.",

  intuition: `
Start with some mental arithmetic. You put $10,000 in cash in a drawer and take it out 10 years later. The number hasn't changed — still $10,000. But if inflation averaged 3% a year over that decade, the same basket of goods now costs about 1.34 times as much. **Your $10,000 buys only about $7,440 worth of today's goods.** You didn't lose any money; you lost a quarter of its purchasing power.

That is **inflation**: a sustained rise in the general price level — which is the same thing as **a sustained fall in the purchasing power of money.** Note the words “general” and “sustained.” One item getting pricier (eggs, say, during a bird-flu outbreak) is not inflation. Prices jumping once and then holding steady isn't sustained inflation either.

This lesson rests mainly on two of the course's ideas. **Idea ① — the price of time**: Stage 1.3 showed that part of the Fed's mandate is “stable prices,” defined as 2% inflation a year, and interest rates themselves contain compensation for inflation — Stage 2.5 develops the Fisher equation, “nominal rate − inflation ≈ real rate.” **Idea ④ — risk & leverage**: inflation is a risk that quietly rewrites the value of contracts. Someone who borrows at a fixed rate is, in effect, short the dollar.

To really understand inflation, you have to answer three questions:

- **How is it measured?** Every month statisticians collect prices for tens of thousands of goods and services, weight them by what a typical household spends, and compute an index — the **CPI**. The Fed prefers a different gauge — **PCE**. Why do they differ? And what is “core” inflation?
- **Why do prices rise?** Economists have argued for a century, but the causes fall into three rough families: **too much money** (money growing faster than real output), **too much demand** (everyone wants to buy and capacity can't keep up) and **supply shocks** (oil embargoes, pandemic supply-chain breaks, tariffs). The 2021–2023 episode had all three at once.
- **Who wins and who loses?** Inflation never makes “everyone poorer together.” It shifts wealth from **creditors** to **debtors**, and from **holders of cash and fixed income** to **holders of real assets**. And new money isn't sprinkled evenly over everyone — **whoever is closest to the printing press spends it first.** That is the **Cantillon effect.**

That is why the story of “hard money” in Stage 1.5 is so appealing: if money can be quietly diluted by inflation, people naturally go looking for something that can't be issued at will. But we'll see that hard money has costs of its own.

**In this lesson we break it into five pieces:**

- **① How CPI is built: a basket, weights and an index**
- **② Headline vs core, CPI vs PCE: which number to watch**
- **③ Why prices rise: money, demand and supply shocks**
- **④ Winners and losers: debtors, savers and the invisible tax**
- **⑤ The Cantillon effect: who gets the new money first**
`,

  mechanics: `
### ① How CPI is built: a basket, weights and an index

The US **Consumer Price Index (CPI)** is published monthly by the Bureau of Labor Statistics (BLS). The method comes down to three steps:

1. **Define a basket.** Using consumer spending surveys, work out what a “typical urban household” buys and how much it spends on each item — housing, food, gasoline, cars, medical care, education, recreation…
2. **Collect prices every month.** Data collectors record roughly 80,000 prices for goods and services across the country, plus rent data from tens of thousands of housing units.
3. **Weight and index.** Each category's price change is weighted by its share of spending, giving the overall change. The index is set so that the 1982–1984 average equals 100.

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Approximate weights in the CPI basket (rounded, recent years)</text><g font-size="11"><text x="150" y="52" text-anchor="end" fill="var(--ink)">Shelter (incl. owners' equiv. rent)</text><rect x="160" y="40" width="350" height="18" rx="4" fill="var(--orange)"/><text x="516" y="53" fill="var(--orange-ink)" font-weight="700">~35%</text><text x="150" y="80" text-anchor="end" fill="var(--ink)">Core goods (cars, clothes…)</text><rect x="160" y="68" width="190" height="18" rx="4" fill="var(--orange)" opacity=".75"/><text x="356" y="81" fill="var(--ink)">~19%</text><text x="150" y="108" text-anchor="end" fill="var(--ink)">Food</text><rect x="160" y="96" width="135" height="18" rx="4" fill="var(--green)" opacity=".8"/><text x="301" y="109" fill="var(--ink)">~13–14%</text><text x="150" y="136" text-anchor="end" fill="var(--ink)">Medical care services</text><rect x="160" y="124" width="68" height="18" rx="4" fill="var(--orange)" opacity=".55"/><text x="234" y="137" fill="var(--ink)">~7%</text><text x="150" y="164" text-anchor="end" fill="var(--ink)">Energy (gas, power, fuel)</text><rect x="160" y="152" width="65" height="18" rx="4" fill="var(--red)" opacity=".75"/><text x="231" y="165" fill="var(--ink)">~6–7%</text><text x="150" y="192" text-anchor="end" fill="var(--ink)">Transport services</text><rect x="160" y="180" width="62" height="18" rx="4" fill="var(--orange)" opacity=".55"/><text x="228" y="193" fill="var(--ink)">~6%</text><text x="150" y="220" text-anchor="end" fill="var(--ink)">Other services and goods</text><rect x="160" y="208" width="140" height="18" rx="4" fill="var(--orange)" opacity=".35"/><text x="306" y="221" fill="var(--ink)">remaining ~14%</text></g><line x1="160" y1="34" x2="160" y2="232" stroke="var(--line)"/><text x="320" y="256" text-anchor="middle" font-size="11" fill="var(--muted)">“Core” = excluding food (green) and energy (red); shelter alone is over a third</text><text x="320" y="276" text-anchor="middle" font-size="10" fill="var(--muted)">Weights are updated annually; see the BLS “Relative Importance” tables for exact figures</text></svg><figcaption>CPI is a weighted average of a basket of prices. Shelter carries the biggest weight, so when rents run hot, CPI is slow to come down.</figcaption></figure>

A mini example makes the weighting concrete. Say the basket has just three parts — housing 40%, gasoline 10%, everything else 50%. Over a year, housing rises 5%, gasoline 20%, everything else 2%. CPI inflation = 0.4×5% + 0.1×20% + 0.5×2% = 2% + 2% + 1% = **5%**. Gasoline jumped the most, but it contributed exactly as much as housing — **the weights decide everything.**

CPI has some well-known limitations. It uses a fixed basket, while real people switch to chicken when beef gets expensive (substitution bias). Products change in quality — a $1,000 phone today is far better than one from ten years ago — so the BLS makes “quality adjustments,” a step that is often questioned. And **the owners' equivalent rent inside shelter is an estimate**: it asks homeowners what their home would rent for, rather than tracking house prices themselves, so a house-price boom shows up in CPI only slowly and indirectly.

### ② Headline vs core, CPI vs PCE: which number to watch

The news often quotes several inflation numbers at once. The key differences:

<table>
<tr><th>Measure</th><th>Published by</th><th>Features</th><th>Who watches it most</th></tr>
<tr><td>Headline CPI</td><td>BLS</td><td>Fixed basket; shelter about a third; Social Security cost-of-living adjustments and inflation-protected Treasuries (TIPS) are tied to CPI measures</td><td>The public, the media, contracts</td></tr>
<tr><td>Core CPI</td><td>BLS</td><td>Strips out volatile food and energy to show the underlying trend</td><td>Market traders</td></tr>
<tr><td>PCE price index</td><td>Bureau of Economic Analysis (BEA)</td><td>Broader coverage (includes employer-paid health care); weights update automatically as spending shifts; shelter about 15%</td><td>The Fed (its 2% target is defined on PCE)</td></tr>
<tr><td>Core PCE</td><td>BEA</td><td>PCE excluding food and energy</td><td>The Fed's main trend gauge</td></tr>
</table>

Some rules of thumb: **CPI usually runs a bit above PCE** (historically about 0.3–0.5 percentage points higher on average), mainly because of its larger shelter weight and slower-updating basket. **Core inflation is “stickier” than headline**: oil can fall 10% in a month, but once rents and service prices climb, they tend to take a long time to come down.

Why strip out food and energy? Not because they don't matter — for ordinary households they matter most — but because they swing with weather, wars and OPEC decisions, and **the central bank's interest-rate tool can't reach an oil well.** The Fed watches core to judge whether inflation has seeped into wages and services and become a persistent trend.

Historical reference points: US headline CPI inflation peaked at **9.1%** year over year in June 2022, the highest in 40 years; inflation for 1980 as a whole was about 13.5%. The Fed's target is **2%** on the PCE measure.

### ③ Why prices rise: money, demand and supply shocks

Economics' first key is the **equation of exchange** (Irving Fisher, 1911):

$$
M × V = P × Y
money supply × velocity = price level × real output
$$

On its own it is an identity: money spent in a year (M×V) equals the nominal value of what was sold (P×Y). Add one assumption — that velocity V is fairly stable — and it becomes a theory: **if money grows faster than real output for long enough, prices must rise.** That is where Milton Friedman's famous line comes from: inflation is “always and everywhere a monetary phenomenon.”

In practice, inflation's causes fall into three families that often stack on top of each other:

- **Monetary:** the quantity of money grows too fast. In 2020–2021, US broad money (M2) grew at more than 25% year over year at its peak — the fastest since the Second World War.
- **Demand-pull:** people have money and want to spend it, and capacity can't keep up for a while. Pandemic-era fiscal transfers swelled household savings, and reopening released the demand all at once.
- **Cost-push / supply shocks:** production gets more expensive or supply is cut off. The 1973 oil embargo, the chip and shipping bottlenecks of 2021, the energy and grain spike after Russia's 2022 invasion of Ukraine, and tariffs all push prices up from the supply side.

The 2021–2023 episode featured all three simultaneously, which is partly why the Fed first judged it “transitory” and then had to raise rates at the fastest pace in four decades (Stage 1.3). Stage 9.5 compares the 1970s, the Volcker era and 2021–23 to show how inflation “regimes” shift.

There is also a self-reinforcing mechanism: **inflation expectations.** If workers expect prices to rise 5% next year, they ask for 5% raises; if firms expect costs to climb, they raise prices in advance. Once expectations come “unanchored,” inflation feeds itself. What a central bank cares about most is often not any single month's print but **whether people still believe in the 2% target.**

### ④ Winners and losers: debtors, savers and the invisible tax

Inflation doesn't make everyone poorer together; it **redistributes wealth.** The reason is simple: an enormous number of contracts are written in fixed **nominal dollars.**

**Winners: fixed-rate borrowers.** Suppose 10 years ago you took out a $300,000, 30-year mortgage at 3%, with a monthly payment of about $1,265. Ten years in, about $228,000 of principal remains. If inflation averaged 5% over that decade, that $228,000 is worth only about $140,000 in the purchasing power of 10 years ago — **inflation paid off nearly 40% of your remaining debt for you,** while your wages (usually) rose with prices and your payment didn't change by a cent.

**Losers: creditors and fixed-income holders.** Use the course's standard example: a $1,000 bond with a 5% coupon and 10 years to maturity. With 3% inflation, the real yield is about (1.05 ÷ 1.03) − 1 ≈ **1.9%**. If inflation rises to 6%, the real yield becomes about **−0.9%**: the $50 coupon each year doesn't even cover the lost purchasing power, and the $1,000 principal returned in 10 years is worth only about **$558** in today's money. That is also why bond prices fall when inflation picks up (Stage 4.2).

**Losers: cash savers and people without bargaining power.** Deposit rates often trail inflation; wage adjustments lag prices; fixed pensions not linked to inflation shrink in real terms year after year.

**One of the biggest winners: the government.** It is the largest debtor of all. Inflation shrinks the burden of nominal debt relative to nominal GDP. When interest rates are held below inflation, this becomes an **invisible tax** — what economists call “financial repression” (Stage 2.5, Stage 9.4).

The tax code can magnify the damage. US capital gains are taxed on **nominal** gains. If an asset you bought for $100 ten years ago merely kept up with 3% inflation and is now worth about $134, you made nothing in real terms — yet you owe tax on a $34 “gain.”

### ⑤ The Cantillon effect: who gets the new money first

The 18th-century banker Richard Cantillon (whose *Essay on the Nature of Trade in General* was written around 1730 and published in 1755) noticed that **new money does not arrive everywhere at once or evenly.** Those who receive it first can spend it at old prices; by the time it trickles down to everyone else, prices have already risen.

Under the gold standard, the first recipients were mine owners and their suppliers. Today money enters the economy mainly through **credit** (Stage 1.2) and **central-bank asset purchases** (QE, from Stage 1.3). So the first beneficiaries tend to be those who can borrow cheaply and those who already own financial assets: QE buys bonds, pushes down yields and lifts the prices of stocks and real estate, and only later works through to wages and consumer prices. That is one reason many people argue easy money **widens wealth inequality** — though economists disagree sharply about the size of the effect, since easing can also reduce unemployment and help lower-income workers.

That thread leads into several later strands of the course:

- **Asset-price inflation.** CPI does not include stock prices or home prices (owners' equivalent rent is only an estimate), so “CPI is only 2%” and “everyone feels life got more expensive” can both be true.
- **The Bitcoin narrative.** Supporters argue that Bitcoin, with supply fixed at 21 million, is a hedge against “currency debasement” (Stage 1.5, Stage 12.2). Honesty requires adding: when US CPI hit a 40-year high in 2022, Bitcoin fell by roughly 60% — **at least in the short run, it has behaved more like a liquidity-sensitive risk asset than a reliable inflation hedge** (Stage 12.4).
- **The other side of stablecoins.** In countries with high domestic inflation, many people move savings into dollar stablecoins — they are climbing up the money hierarchy toward a currency with lower inflation (Stage 13.2).
- **Comparing yields.** With inflation around 3%, a perpetual preferred yielding about 10%, a long Treasury yielding about 5% and a money fund paying about 4% deliver very different real returns — the first step when valuing a preferred in Stage 18.1.

**The whole lesson in one sentence: inflation is the erosion of money's purchasing power, measured by a weighted basket of prices and driven by money, demand and supply together; it quietly moves wealth from creditors and cash holders to debtors and asset owners, and those closest to the new money benefit first.**
`,

  demo: "inflation",

  analogy: `
Think of inflation as **a slowly leaking balloon.**

You blow 100 breaths into a balloon (your savings), and the balloon has “100” printed on it. That number never changes, but every year the balloon quietly leaks — 2% a year in slow years, 9% in fast ones. Ten years later you pick it up: it still says “100,” but only 74 breaths remain inside (at a 3% leak) or even 42 (at 9%).

**A borrower** holds a different balloon: they owe someone “100 breaths,” and that IOU balloon is leaking too — the number they must repay stays the same, but each breath is worth less and less. So in inflationary times debtors find life getting easier, and lenders find themselves shortchanged.

And **whoever stands closest to the pump** (the Cantillon effect) always grabs the freshly blown air first and spends it on the best things before anyone notices there are more balloons around; by the time the new air reaches the end of the line, everything costs more.

Some people get fed up with leaky balloons and swap them for **a solid stone** (gold, Bitcoin): it doesn't leak, but its “size” swells and shrinks every day, so you can't price a menu in it. Stage 1.5 tells the story of humanity swinging back and forth between the leaky balloon and the stone that doesn't leak but won't sit still.
`,

  misconceptions: [
    "**“If something got more expensive, that's inflation.”** — Inflation is a sustained rise in the general price level. Eggs spiking during bird flu or rents rising in one city are relative price changes; only when most prices rise broadly and persistently — money's purchasing power falling overall — is it inflation.",
    "**“Core inflation leaves out food and energy, so officials are hiding the real cost of living.”** — Core isn't meant to measure the cost of living; it is meant to reveal the trend, because food and energy swing with weather and war and are beyond the reach of interest rates. Headline CPI is still published every month, and it is what Social Security adjustments and TIPS are tied to.",
    "**“Inflation makes everyone poorer.”** — Inflation redistributes: fixed-rate borrowers, governments and owners of real assets tend to gain; cash savers, fixed-income holders and workers whose wages lag tend to lose. “Everyone gets poorer together” is close to true only when hyperinflation wrecks the whole economy.",
    "**“Bitcoin's supply is fixed, so it must be an inflation hedge.”** — The long-run argument is debatable, but the short-run evidence doesn't support it: when US inflation hit a 40-year high in 2022, Bitcoin fell by about 60%, trading like a risk asset sensitive to liquidity and rates. Treating a long-run thesis as a short-run guarantee is dangerous.",
    "**“As long as the central bank doesn't print money, there's no inflation.”** — The quantity of money matters, but demand shocks, supply shocks (embargoes, broken supply chains, tariffs) and inflation expectations also push prices up. And most modern money is created by commercial banks lending (Stage 1.2), not only by the central bank.",
  ],

  quiz: [
    {
      q: "A simplified basket: housing weight 40%, gasoline 10%, everything else 50%. Over a year housing rises 5%, gasoline 20%, everything else 2%. What is CPI inflation?",
      options: [
        "9%",
        "5%",
        "27%",
        "2%",
      ],
      answer: 1,
      explain: "0.4×5% + 0.1×20% + 0.5×2% = **5%**. Gasoline rose the most, but with its small weight it contributed only as much as housing — **the weights decide everything.**",
    },
    {
      q: "Which measure defines the Fed's 2% inflation target?",
      options: [
        "Headline CPI",
        "Core CPI",
        "The producer price index (PPI)",
        "The PCE price index",
      ],
      answer: 3,
      explain: "Since 2012 the Fed has explicitly defined its 2% goal using the **PCE price index**, watching core PCE for the trend. PCE covers more and updates its weights as spending shifts.",
    },
    {
      q: "You hold a $1,000 bond with a 5% coupon and 10 years to maturity. If inflation averages 6% over the next decade, which statement is most accurate?",
      options: [
        "The real yield is about −0.9%, and the principal returned in 10 years is worth only about $558 in today's money",
        "The real yield is about 11%",
        "The coupon is fixed, so inflation doesn't affect you",
        "The real yield is about 5%",
      ],
      answer: 0,
      explain: "(1.05 ÷ 1.06) − 1 ≈ −0.9%; 1,000 ÷ 1.06¹⁰ ≈ 558. **Fixed-income holders are inflation's classic losers**; Stage 2.5 covers real rates systematically.",
    },
    {
      q: "What does the Cantillon effect describe?",
      options: [
        "Rising prices lead to lower unemployment",
        "New money doesn't reach everyone at once; those who receive it first can spend at old prices and benefit",
        "Inflation equals money growth minus economic growth",
        "After the central bank raises rates, inflation falls within six months",
      ],
      answer: 1,
      explain: "Richard Cantillon observed that **new money flows in sequence**: those closest to its source (cheap borrowers, asset holders) gain first, while those at the end of the line face prices that have already risen.",
    },
    {
      q: "US CPI inflation reached 9.1% in 2022, and Bitcoin fell about 60% that year. What does this best illustrate?",
      options: [
        "Bitcoin has nothing to do with inflation and can never be a store of value",
        "The CPI statistics were wrong",
        "At least in the short run, Bitcoin behaves more like a risk asset sensitive to liquidity and rates than a reliable inflation hedge",
        "High inflation always makes every asset fall",
      ],
      answer: 2,
      explain: "The long-run hard-money thesis is open to debate (Stage 1.5), but **in the short run Bitcoin has been highly sensitive to rate hikes and tightening liquidity** (Stage 12.4). Keep long-run arguments and short-run behavior apart.",
    },
  ],

  further: [
    { label: "US Bureau of Labor Statistics: CPI data, methodology and relative-importance weights", url: "https://www.bls.gov/cpi/" },
    { label: "US Bureau of Economic Analysis: the PCE price index", url: "https://www.bea.gov/data/personal-consumption-expenditures-price-index" },
    { label: "Federal Reserve: why the Fed targets 2% inflation", url: "https://www.federalreserve.gov/faqs/economy_14400.htm" },
    { label: "Cleveland Fed: inflation expectations and inflation nowcasting", url: "https://www.clevelandfed.org/indicators-and-data/inflation-nowcasting" },
    { label: "Austrian Path (sister course): money, the Cantillon effect and the business cycle", url: "https://evidex-cloud.github.io/droplet-labs-austrian-path/" },
  ],
};
