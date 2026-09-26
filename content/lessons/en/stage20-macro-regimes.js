export default {
  id: "macro-regimes",
  stage: 20,
  order: 2,
  title: "The Macro Regime Map: Where Each Asset Shines",
  difficulty: "mastery",
  prereqs: ["connect-the-dots", "inflation-regimes", "portfolio-construction"],

  oneLiner:
    "Whether the causal chain of Stage 20.1 holds, and where it snaps, depends on the macro environment you are in. Squeeze the world onto two axes (**is growth running faster or slower than expected, and is inflation running hotter or cooler than expected?**) and you get four quadrants: Goldilocks, overheating, stagflation and deflationary bust. Then add a third axis, **liquidity**: is the central bank adding money or draining it? Every asset has a quadrant it loves and one it dreads. Long Treasuries fear inflation and love recessions; stocks fear stagflation; bitcoin and DAT common stock are most sensitive to liquidity; fixed-rate preferreds fear both rates and credit. The map is not a forecasting machine. It is a **checklist**: first ask which quadrant we are in, then ask how your asset has behaved there before and what is different this time.",

  intuition: `
Stage 20.1 joined Lin's three headlines into one chain and marked the places where it might break. One phrase kept coming back in that lesson: **"it depends on why yields are rising."** If the central bank is genuinely tightening, bitcoin gets hit in the short run; only if the rise reflects fiscal distrust does the debasement trade have a chance. Behind that phrase sits a more general truth: **the same asset can behave in opposite ways under different macro "weather."** This lesson gives you the weather map.

Start with a thought experiment. Suppose that at the end of 2021 you bought the most classic "sensible portfolio" there is: 60% stocks and 40% long-term Treasuries. For decades that mix had been sensible because stocks and Treasuries **often moved in opposite directions.** When the economy stumbled, stocks fell, the central bank cut rates, bonds rallied, and the two cancelled out. Then came 2022. Inflation hit 9.1% in June, the Fed raised rates at the fastest pace since the 1980s, the S&P 500 fell about 19% on the year, and long Treasuries fell hard too. **Stocks and bonds dropped together, and the hedge stopped working.** In the same stretch, bitcoin fell from about $69,000 in November 2021 to about $15,500 in November 2022 (Stage 11.2 covered this flip in the stock–bond correlation).

That was not bad luck. **The regime changed.** The world moved from "low inflation, choppy growth" to "inflation is the main risk." In the first world, bonds insure stocks. In the second, bonds and stocks fear the same thing: higher interest rates.

That is why professional investors carry a four-box grid around in their heads:

- **Horizontal axis: growth.** Is the economy doing better (accelerating) or worse (slowing) than expected?
- **Vertical axis: inflation.** Is inflation running above expectations or below them?
- **Third axis: liquidity.** Are the central bank and the Treasury pumping money into the system or pulling it out? (Stage 9.3)

Each box has a nickname: **Goldilocks** (good growth, low inflation, "not too hot, not too cold"), **overheating** (good growth, high inflation), **stagflation** (weak growth, high inflation) and **deflationary bust** (weak growth, low inflation). Each asset has a historical tendency in each box. Long Treasuries shine brightest in a deflationary bust (2008) and suffer worst in stagflation (the 1970s, 2022). Stocks love Goldilocks. Gold glows in stagflation when real rates are negative (the 1970s). Bitcoin and DAT common stock are unusually sensitive to liquidity. A DAT's fixed-rate preferreds fear both rising rates and falling bitcoin; the variable-rate STRC was designed specifically to dodge the first of those blows (Stage 17.4).

This lesson rests mainly on **Idea ① (the price of time)** and **Idea ④ (risk & leverage).** The regime decides which way rates go and whether risk premia expand or contract; leverage (a DAT's amplification, the stock–bond crash of 2022) decides who gets hurt most when the regime flips. It also draws on **Idea ③**: the liquidity axis is essentially a measure of how much water is in the pipes.

Two warnings up front. First, **this is a map of tendencies, not laws.** Each quadrant has only a handful of historical episodes, each with its own quirks, and bitcoin and DATs have only a decade or a few years of history. Second, **this lesson covers analytical frameworks only. It is not investment advice** and draws no conclusions about asset allocation. Use it like this: when you read a headline, ask "which box does this push us toward?" That is exactly what questions two and five of the five-question method in Stage 20.3 rely on.

**This lesson has five parts:**

- **① Two axes plus one: growth, inflation and liquidity**
- **② Historical examples of the four quadrants: from the 1970s to 2022**
- **③ Traditional assets in the four boxes: bonds, stocks, gold, cash and the stock–bond correlation**
- **④ New assets in the four boxes: bitcoin, DAT common, DAT preferreds and on-chain dollar yield**
- **⑤ Which box is September 2026 in, and how to use the map without being fooled by it**
`,

  mechanics: `
### ① Two axes plus one: growth, inflation and liquidity

Why these two axes? Go back to the basic formula of Stage 2.3: **asset price = future cash flows ÷ discount rate.**

- **Growth** mostly acts on the numerator. When the economy accelerates, corporate profits, tax receipts and jobs all rise. When it slows, defaults climb and profits shrink.
- **Inflation** mostly acts on the denominator. Rising inflation forces the central bank to hike and makes investors demand more inflation compensation and a bigger term premium (Stage 4.5), so discount rates rise. Falling inflation does the reverse.

Cross the two axes and you cover all four combinations of "numerator good or bad" and "denominator high or low." The crucial detail is **"relative to expectations."** Prices already reflect what people expect (the "expected vs actual" game of Stage 3.2), so what actually moves assets is **surprise**: growth better or worse than expected, inflation higher or lower than expected. A 3% inflation print is good news for bonds if everyone was braced for 4%.

**The third axis is liquidity** (Stage 9.3). It measures whether the money available to buy assets is growing or shrinking: the central bank's balance sheet (quantitative easing, QE, or quantitative tightening, QT), bank reserves, the Treasury's cash account, credit conditions, the strength of the dollar. Liquidity does not change the real economy, but it inflates or deflates risk premia. **Other things equal, the assets that rise most when liquidity expands are the long-dated, speculative ones with no cash flows**, and bitcoin is the textbook case. Zero rates plus QE in 2020–2021 and hikes plus QT in 2022 are the cleanest examples of the two ends of this axis.

<table class="pm">
<tr><th></th><th>Inflation falling (below expectations)</th><th>Inflation rising (above expectations)</th></tr>
<tr><td><b>Growth accelerating</b></td><td><b>Goldilocks</b>: strong profits, rates stable or falling</td><td><b>Overheating / reflation</b>: strong profits, but the central bank starts tightening</td></tr>
<tr><td><b>Growth slowing</b></td><td><b>Deflationary bust</b>: weak profits, rates fall sharply</td><td><b>Stagflation</b>: weak profits, rates still rising; the hardest box</td></tr>
</table>

### ② Historical examples of the four quadrants: from the 1970s to 2022

Each box has a few textbook representatives (see Stage 9.5 and Stage 10 for detail):

- **Stagflation: the 1970s and 2022.** Oil shocks and loose money kept inflation high through the 1970s until Paul Volcker's brutal rate hikes ended it (Stage 9.5). 2022 was the mild version: inflation hit 9.1%, the Fed raised rates from zero to 5.25–5.50% by July 2023, and stocks and long bonds fell together.
- **Deflationary bust: 2008 and March 2020.** Lehman collapsed on September 15, 2008; credit froze, inflation expectations caved, long Treasuries soared and stocks halved (Stage 10.2). In March 2020 the COVID shock took the S&P 500 down about 34% in roughly a month, and the Fed cut to zero and launched unlimited QE.
- **Goldilocks: the late 1990s and much of the 2010s.** Low inflation, steady growth and gently falling rates gave a bull market in both stocks and bonds, and their negative correlation made the 60/40 portfolio look like a free lunch.
- **Overheating / reflation: 2021.** Post-pandemic fiscal stimulus plus zero rates sent demand through the roof. Profits and asset prices boomed, but inflation began climbing during the year and set up 2022.

Notice a pattern: **moving between boxes usually hurts more than sitting in one.** The slide from overheating in 2021 to stagflation in 2022 was precisely when the stock–bond correlation flipped and hidden leverage was exposed. That is the reflexivity of Stage 10.4 playing out at the macro level.

### ③ Traditional assets in the four boxes: bonds, stocks, gold, cash and the stock–bond correlation

What follows are **historical tendencies, not guarantees.** Every box has counterexamples, and the size of the effects varies a lot.

<table class="pm">
<tr><th>Asset</th><th>Goldilocks</th><th>Overheating</th><th>Stagflation</th><th>Deflationary bust</th><th>Mechanism in one line</th></tr>
<tr><td>Long Treasuries</td><td>Good</td><td><b>Poor</b></td><td><b>Poor</b></td><td><b>Best</b></td><td>High duration (Stage 4.4); fears only inflation and hikes</td></tr>
<tr><td>Stocks</td><td><b>Best</b></td><td>Good → middling</td><td><b>Poor</b></td><td>Poor</td><td>Sensitive to both numerator (profits) and denominator (discount rate)</td></tr>
<tr><td>Gold</td><td>Middling</td><td>Middling</td><td>Good (when real rates are negative)</td><td>Middling → good</td><td>Driven by real rates and trust in institutions</td></tr>
<tr><td>Cash / T-bills</td><td>Middling</td><td>Good (rates rising)</td><td><b>Good</b> (at least no nominal loss)</td><td>Middling (rates falling)</td><td>Near-zero duration; tracks the policy rate</td></tr>
<tr><td>Commodities</td><td>Middling</td><td><b>Good</b></td><td>Good (in supply shocks)</td><td>Poor</td><td>One of the sources of inflation</td></tr>
</table>

The most important hidden variable is the **stock–bond correlation.** You can compute a 60/40 portfolio's volatility with the two-asset formula from Stage 11.1. Assume stocks have 16% annual volatility and long bonds 7%:

$$ Portfolio volatility = √(w²σ₁² + (1−w)²σ₂² + 2w(1−w)ρσ₁σ₂)
ρ = −0.3 (common in Goldilocks / deflationary busts) → 60/40 volatility ≈ 9.2%
ρ = +0.5 (common in inflation-driven regimes) → 60/40 volatility ≈ 11.3%

**The same holdings carry about a quarter more risk just because the regime changed.** Worse, the hedge disappears exactly when you need it. That is why regime-based diversification ideas such as risk parity and "all weather" came back into discussion after 2022 (Stage 11.2).

Gold deserves one more sentence. It blazed in the stagflation of the 1970s because **real rates were deeply negative** back then (Stage 2.5). In 2025 gold rose about 65% and reached about $5,600 in late January 2026, driven by central-bank buying and the debasement trade. But in the first half of 2026 real rates rose along with hike expectations, and by June gold had lost about 29%. **What drives gold is not inflation itself but the real yield left after subtracting inflation from interest rates, plus people's trust in institutions.**

### ④ New assets in the four boxes: bitcoin, DAT common, DAT preferreds and on-chain dollar yield

The new assets have too little history, so we infer tendencies from **mechanism** and check them against the few episodes we have:

<table class="pm">
<tr><th>Asset</th><th>Goldilocks</th><th>Overheating</th><th>Stagflation</th><th>Deflationary bust</th><th>Most sensitive axis</th></tr>
<tr><td>Bitcoin</td><td><b>Good</b></td><td>Middling (depends on the Fed)</td><td><b>Poor</b> (2022)</td><td>Crashes first, then follows the liquidity response (2020)</td><td>Liquidity + real rates</td></tr>
<tr><td>DAT common</td><td><b>Best</b> (amplification + mNAV premium)</td><td>Middling</td><td><b>Worst</b> (amplification + mNAV compression)</td><td>Poor</td><td>Bitcoin × amplification × open capital markets</td></tr>
<tr><td>DAT fixed-rate preferreds</td><td>Good (spreads tighten)</td><td>Poor (rates rise)</td><td><b>Poor</b> (rates and credit both hit)</td><td>Middling (rates fall, credit worsens)</td><td>Long-end rates + BTC Rating</td></tr>
<tr><td>DAT variable-rate preferreds (STRC/SATA type)</td><td>Good</td><td>Middling (resets offset rates)</td><td>Poor (credit still hurts)</td><td>Middling</td><td>Credit + whether management resets in time</td></tr>
<tr><td>Stablecoin / tokenized T-bill yield</td><td>Middling</td><td><b>Good</b> (short rates rise)</td><td>Good</td><td>Poor (rates drop to zero)</td><td>Policy rate</td></tr>
</table>

Some explanation:

- **Bitcoin** multiplied several times over in the liquidity flood of 2020–2021 and fell about 77% in the stagflation-plus-QT of 2022. In 2026 it gave another demonstration: an oil shock pushed inflation up, the Fed hiked, and bitcoin fell from about $126,000 in October 2025 to about $58,000 at the end of June 2026. Supporters argue that once the regime shifts from "central bank tightening" to "fiscal dominance" (Stage 9.4), bitcoin will behave like gold in the 1970s. That is a testable claim, not an established fact.
- **DAT common stock** is "bitcoin × amplification × capital-market mood." In Goldilocks, the mNAV premium turns issuance into an accretive flywheel (Stage 16.7). In stagflation, the coin price, the amplification and mNAV compression all push down at once (Stage 18.3). In late September 2026, 16 of the 20 largest DATs traded below 1x mNAV, which is a product of exactly this kind of environment.
- **DAT preferreds** face two knives: long-end rates (a perpetual's duration is roughly 1 ÷ yield, Stage 18.1) and bitcoin credit (BTC Rating, Stage 16.5). Overheating wields the first, a deflationary bust the second, and **stagflation both at once.** A variable-rate design can parry the first knife but not the second.
- **On-chain dollar yield.** Stablecoins pay holders nothing (the GENIUS Act), but issuers' reserve income and the yield on tokenized T-bills (Stage 14.2) both follow short-term rates. The higher rates go, the more attractive "on-chain cash" becomes, and the harder it competes with bank deposits for money (Stage 14.5).

<figure><svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The four-box regime map: who is most comfortable where</text><rect x="80" y="40" width="250" height="125" fill="var(--green-soft)" stroke="var(--line)"/><rect x="330" y="40" width="250" height="125" fill="var(--orange-soft)" stroke="var(--line)"/><rect x="80" y="165" width="250" height="125" fill="var(--blue-soft)" stroke="var(--line)"/><rect x="330" y="165" width="250" height="125" fill="var(--red-soft)" stroke="var(--line)"/><text x="205" y="62" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Goldilocks</text><text x="205" y="82" text-anchor="middle" font-size="10.5" fill="var(--muted)">Stocks · bitcoin · DAT common</text><text x="205" y="98" text-anchor="middle" font-size="10.5" fill="var(--muted)">Fixed-rate prefs (spreads tighten)</text><text x="205" y="118" text-anchor="middle" font-size="10" fill="var(--muted)">e.g. late 1990s, 2010s</text><text x="455" y="62" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Overheating / reflation</text><text x="455" y="82" text-anchor="middle" font-size="10.5" fill="var(--muted)">Commodities · cash · on-chain dollar yield</text><text x="455" y="98" text-anchor="middle" font-size="10.5" fill="var(--muted)">Long bonds, fixed-rate prefs squeezed</text><text x="455" y="118" text-anchor="middle" font-size="10" fill="var(--muted)">e.g. 2021</text><text x="205" y="187" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Deflationary bust</text><text x="205" y="207" text-anchor="middle" font-size="10.5" fill="var(--muted)">Long Treasuries best · gold decent</text><text x="205" y="223" text-anchor="middle" font-size="10.5" fill="var(--muted)">Bitcoin falls first, then follows easing</text><text x="205" y="243" text-anchor="middle" font-size="10" fill="var(--muted)">e.g. 2008, March 2020</text><text x="455" y="187" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Stagflation</text><text x="455" y="207" text-anchor="middle" font-size="10.5" fill="var(--muted)">Cash · gold (when real rates &lt; 0)</text><text x="455" y="223" text-anchor="middle" font-size="10.5" fill="var(--muted)">Stocks and bonds fall · DAT common worst</text><text x="455" y="243" text-anchor="middle" font-size="10" fill="var(--muted)">e.g. 1970s, 2022</text><line x1="80" y1="305" x2="580" y2="305" stroke="var(--ink)" stroke-width="1.2"/><polygon points="580,301 580,309 588,305" fill="var(--ink)"/><text x="330" y="324" text-anchor="middle" font-size="11" fill="var(--muted)">Inflation: below expectations → above expectations</text><line x1="62" y1="290" x2="62" y2="40" stroke="var(--ink)" stroke-width="1.2"/><polygon points="58,40 66,40 62,32" fill="var(--ink)"/><text x="40" y="170" text-anchor="middle" font-size="11" fill="var(--muted)" transform="rotate(-90 40 170)">Growth: slowing → accelerating</text><circle cx="400" cy="140" r="8" fill="var(--btc)" stroke="var(--ink)"/><text x="414" y="144" font-size="10.5" font-weight="700" fill="var(--ink)">Sep 2026 (this course's view)</text><text x="414" y="158" font-size="10" fill="var(--muted)">Near overheating, tilting to stagflation</text></svg><figcaption>Two axes draw four boxes; liquidity is the third axis (not drawn) and sets the "volume" of risk assets in each box. The orange dot is this course's judgment about September 2026, not an official finding.</figcaption></figure>

### ⑤ Which box is September 2026 in, and how to use the map without being fooled by it

Place the data from the macro fact sheet on the map (as of September 2026):

- **Growth:** August payrolls rose 162,000 and unemployment was 4.1%. The Fed's statement described activity as "expanding at a solid pace." The S&P 500 stood at about 7,743 on September 25, not far below its August record, carried by the AI investment boom (Stage 19.2). **Growth is decent, even strong.**
- **Inflation:** August CPI was about 3.4% and July PCE about 3.7%, with energy up 16.3% on the year; inflation has been above 2% continuously since early 2021. **Inflation is above target, driven by a supply shock (oil).**
- **Liquidity:** the Fed hiked to 3.75–4.00% on September 16; its reserve-management bill purchases dropped to zero from August 14; and markets are still pricing another hike in October. **Liquidity is tightening.**
- **Real rates:** a 10-year nominal yield of about 5.17% and inflation of about 3.4% give a Fisher-equation real yield of about 1.7%, clearly positive.

This course's judgment: **we are in the overheating box, tilting toward stagflation** (an oil shock is the classic stagflationary shock; if growth weakens while inflation stays put, we slide into the bottom-right corner). The judgment broadly fits how assets have behaved: long bonds have fallen (the 30-year at about 5.5%, the highest since 2004), gold is about 23% off its peak, bitcoin is still roughly a third below its high, most DATs trade below 1x mNAV, STRC's dividend has been pushed to 12%, and 3-month bills at about 4.24% make on-chain dollar yield look attractive. **This is a judgment, not a fact.** You can reach a different conclusion from the same data; what matters is that you write down your reasoning.

How do you use the map without being fooled?

1. **Watch direction, not position.** Markets price change and surprise. "Inflation is 3.4%" tells you little; "inflation came in 0.3 points above expectations and is rising" is what moves prices.
2. **The samples are few.** Each box holds a handful of episodes, and bitcoin and DATs have lived through only one or two full cycles. Treating "bitcoin fell 77% in 2022" as the law of stagflation is the recency bias of Stage 11.5.
3. **The cause matters more than the box.** "Inflation rising" means something completely different for the central bank and for growth when it comes from overheated demand than when it comes from an oil shock. That is the same fork as Stage 20.1's "why are yields rising?"
4. **Policy can redraw the boxes.** Fiscal dominance (Stage 9.4) might mean stagflation ends not in recession but in a long period of negative real rates. In that world, gold and bitcoin could behave very differently from 2022.
5. **The switch is the dangerous moment.** Leverage, correlations and liquidity all change together when the regime shifts. Rather than guessing the next box, ask first: **if we changed boxes tomorrow, which link of mine would break first?** The stress tests of Stage 18.2 exist for exactly this.

The next lesson (Stage 20.3) turns this map into a fixed habit for reading the news: every time you read a macro headline, nudge the dot on the four-box grid.
`,

  demo: "macro-regimes",

  analogy: `
Think of macro regimes as **seasons** and of assets as **clothes in your wardrobe**.

Goldilocks is spring: neither hot nor cold, and almost anything feels fine. Stocks are the light jacket that fits best, and bitcoin and DAT common stock are the bright T-shirt that looks great. Overheating is summer: scorching. Cash and T-bills are the sun hat, the most useful thing you own, while long Treasuries are a thick wool sweater you can hardly bear to wear. Stagflation is the hot, rainy monsoon season: the sweater is stifling, the T-shirt is soaked, and almost nothing feels right except the "cash umbrella" and sometimes a "gold raincoat." A deflationary bust is deep winter: the long-Treasury sweater finally comes into its own, while the T-shirts (bitcoin, DAT common) leave you half frozen until somebody (the central bank) turns up the heating.

**Liquidity is the humidity, separate from the thermometer.** In the same season, the more moisture in the air, the more the bright T-shirt stands out.

Sensible people do not buy clothes for only one season, and they do not throw out their sweaters in spring. But the real experts care about something else: **the few days when the season turns.** That is when everyone catches a cold. 2022, when summer suddenly became monsoon, was the moment many people caught one. The map cannot tell you tomorrow's weather, but it lets you ask one question before you leave the house: **if the weather suddenly changes, will what I'm wearing hold up?**
`,

  misconceptions: [
    "**\"Bonds are always insurance for stocks.\"** — Only in regimes where stocks and bonds are negatively correlated. In inflation-driven regimes (the 1970s, 2022) stocks and long Treasuries fear the same thing, higher rates, and fall together. With stock volatility of 16% and bond volatility of 7%, moving the correlation from −0.3 to +0.5 lifts 60/40 volatility from about 9.2% to about 11.3%.",
    "**\"Rising inflation is always good for gold and bitcoin.\"** — What drives them is the real rate and liquidity. In the first half of 2026 inflation rose, but hike expectations pushed real rates up; gold fell about 29% from its peak near $5,600, and bitcoin fell from about $126,000 to about $58,000.",
    "**\"A variable-rate preferred is safe in any environment.\"** — The variable rate parries the rate knife, not the credit knife that comes with falling bitcoin, and the resets depend on management's decisions. In stagflation or a deflationary bust, a falling BTC Rating still drags the price down.",
    "**\"Once you know the quadrant, you know what to buy.\"** — Each quadrant has only a few historical episodes, each with different causes, and policy can redraw the boxes. The map is for asking questions and running stress tests, not for producing allocations. This lesson is not investment advice.",
    "**\"Stablecoins pay no interest, so they have nothing to do with rates.\"** — Holders earn nothing, but issuers' reserve income and the yield on tokenized T-bills track short-term rates. The higher rates go, the fiercer the competition between on-chain dollars and bank deposits.",
  ],

  quiz: [
    {
      q: "What best explains why stocks and long Treasuries fell together in 2022?",
      options: [
        "The economy fell into a deflationary bust, so profits and rates both fell",
        "Inflation became the main risk; both assets feared rising rates, so their correlation turned positive",
        "Liquidity expanded sharply and money rotated from bonds into stocks",
        "Long Treasuries developed default risk",
      ],
      answer: 1,
      explain: "**The regime switched from growth-driven to inflation-driven.** Inflation hit 9.1%, the Fed hiked fast, and rising discount rates hit stocks and long bonds at once. The correlation turned positive and the hedge failed.",
    },
    {
      q: "Which quadrant is least friendly to a DAT's fixed-rate preferred?",
      options: ["Goldilocks", "Overheating", "Deflationary bust", "Stagflation"],
      answer: 3,
      explain: "**In stagflation both knives fall at once.** Rising rates push down a perpetual's price (duration about 1 ÷ yield), while weaker growth and risk assets drag bitcoin and the BTC Rating lower, widening credit spreads.",
    },
    {
      q: "With a 10-year nominal yield of about 5.17% and inflation of about 3.4%, what real yield does the Fisher equation give?",
      options: ["About 1.7%", "About 8.6%", "About −1.7%", "About 3.4%"],
      answer: 0,
      explain: "**Real rate = (1 + nominal) ÷ (1 + inflation) − 1** = (1.0517 ÷ 1.034) − 1 ≈ 1.7%. Positive, rising real rates are one reason gold and bitcoin struggled in 2026.",
    },
    {
      q: "Which statement about liquidity, the third axis, is most accurate?",
      options: [
        "It affects only bonds, not bitcoin",
        "It decides which way economic growth goes",
        "It inflates or compresses risk premia and matters most for long-dated assets with no cash flows, such as bitcoin",
        "It has nothing to do with the central bank's balance sheet",
      ],
      answer: 2,
      explain: "**Liquidity doesn't change the economy itself, but it changes the volume on risk assets.** Zero rates plus QE in 2020–2021 and hikes plus QT in 2022 are a big part of why bitcoin and DAT common stock swung so wildly.",
    },
    {
      q: "This lesson judges September 2026 as \"overheating, tilting toward stagflation.\" Which piece of evidence best supports the tilt toward stagflation?",
      options: [
        "The S&P 500 is near its record",
        "August payrolls rose 162,000",
        "Inflation is being driven by an oil supply shock while the central bank hikes into a still-strong economy",
        "Stablecoin supply is about $312 billion",
      ],
      answer: 2,
      explain: "**A supply shock is the classic stagflationary shock**: it pushes inflation up and growth down at the same time. If the central bank hikes and growth then weakens while inflation stays, we slide from overheating into stagflation. Options A and B support \"growth is strong.\"",
    },
  ],

  further: [
    { label: "FRED: US CPI, PCE, unemployment and Treasury yield data", url: "https://fred.stlouisfed.org/" },
    { label: "Federal Reserve: FOMC statement of September 16, 2026", url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm" },
    { label: "Bridgewater: The All Weather Story (diversifying across growth and inflation)", url: "https://www.bridgewater.com/research-and-insights/the-all-weather-story" },
    { label: "New York Fed: Global Supply Chain Pressure Index and inflation research", url: "https://www.newyorkfed.org/research/policy/gscpi" },
  ],
};
