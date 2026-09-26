export default {
  id: "capstone",
  stage: "∞",
  order: 3,
  title: "Capstone: Write a Full Analysis — From Macro Down to a Capital Stack",
  difficulty: "infinity",
  prereqs: ["dat-checklist", "cheat-sheet", "your-path"],

  oneLiner:
    "The capstone has one requirement: **use the whole course once.** Start from the macro regime, pin down rates and discount rates, write three bitcoin scenarios, pick a DAT, compute every metric on a named definition, draw the capital stack as floors and stress-test it, then write it up so a reader can absorb it in five minutes. This lesson walks Orange Corp through the real macro environment of September 2026, step by step, pointing back to the lesson behind each move. The demo is a report builder that assembles your inputs and _fin.js calculations into a structured analysis. **This lesson teaches an analytical framework only; it is not investment advice.**",

  intuition: `
The best test at the end of a course is not another multiple-choice quiz. It is **completing one real piece of work, start to finish, on your own**.

A medical student's final assessment is a whole patient: take the history, examine, order tests, diagnose, write the notes. Every step uses something learned earlier, and the steps interlock; the temperature decides what to test, and the test results decide the diagnosis. Financial analysis works the same way. A decent analysis is not "bitcoin will go up, so buy MSTR." It is a **causal chain**:

1. The **macro regime** sets the environment: is growth strong or weak, inflation high or low, liquidity loose or tight (Stage 20.2)?
2. The environment sets **interest rates**, and rates set the **discount rate** for every asset (Stages 2.4 and 4.5).
3. Discount rates and liquidity shape the **bitcoin** scenarios (Stages 12.3 and 9.3).
4. The bitcoin price sets a DAT's **bitcoin NAV and every metric** that depends on it (Stage 16).
5. Put the metrics into the **capital stack** and you see how thick the cushion is under each claim (Stage 17.6).
6. Then crash bitcoin and shut the markets: the **stress test** (Stage 18.2).
7. Finally **write it all down**: conclusion, numbers, definitions, dates, the strongest case on each side, and the signposts that would change your mind.

Each step's output is the next step's input. **That is why this course kept insisting on "one connected line."** Stage 20.1 linked the three headlines of Stage 0.1 into a story; this lesson asks you to turn that story into an analysis that others can reproduce and challenge.

We demonstrate with Orange Corp because you have already computed every one of its numbers (Stage 15.1 introduced it, and Stages 16 to 18 used it throughout): 10,000 bitcoin, 100 million shares at $15, $150 million of convertibles, $100 million of Orange-F, $50 million of Orange-D and a $30 million cash reserve. This time, though, we drop it into **the real September 2026**: the Fed had just raised the fed funds rate to 3.75% to 4.00% on September 16, the 30-year Treasury yielded about 5.5%, and bitcoin was around $84,000. A toy company in a real environment lets you concentrate on **method** without getting lost in one real company's quirks. Once you have the method, swap in the numbers from Strategy's or Strive's official filings; the steps are identical.

The lesson rests on **all four ideas**, used in order. Steps 1 and 2 are Idea ① (the price of time) and Idea ③ (liquidity); step 3 is Idea ④ (risk); steps 4 and 5 are Idea ② (balance sheets and claims); step 6 returns to Idea ④ (leverage under stress). **This lesson teaches an analytical framework only. It is not investment advice and it forecasts no prices.** The "conclusion" of your report is a judgment about structure and risk, not a recommendation to buy or sell.

**This lesson breaks into six parts:**

- **① Step 1: the macro regime (check the weather first)**
- **② Step 2: rates (set the discount rate for everything)**
- **③ Step 3: bitcoin (write scenarios, not forecasts)**
- **④ Step 4: pick a DAT and compute every metric on a named definition**
- **⑤ Step 5: the capital stack and the stress test**
- **⑥ Step 6: write the report**
`,

  mechanics: `
<figure><svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The capstone pipeline: each step's output is the next step's input</text><g font-size="11" text-anchor="middle"><rect x="12" y="44" width="140" height="70" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="82" y="66" font-weight="700" fill="var(--ink)">1 Macro regime</text><text x="82" y="84" fill="var(--muted)">growth · inflation · liquidity</text><text x="82" y="102" fill="var(--blue)">Stages 3, 9, 20.2</text><rect x="170" y="44" width="140" height="70" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="240" y="66" font-weight="700" fill="var(--ink)">2 Rates</text><text x="240" y="84" fill="var(--muted)">risk-free · term premium</text><text x="240" y="102" fill="var(--blue)">Stages 2.4, 4.3–4.5</text><rect x="328" y="44" width="140" height="70" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="398" y="66" font-weight="700" fill="var(--ink)">3 Bitcoin scenarios</text><text x="398" y="84" fill="var(--muted)">bear · base · bull + weights</text><text x="398" y="102" fill="var(--btc)">Stages 12.3, 12.4</text><rect x="486" y="44" width="140" height="70" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="556" y="66" font-weight="700" fill="var(--ink)">4 Pick a DAT + metrics</text><text x="556" y="84" fill="var(--muted)">four mNAVs · BTC per share</text><text x="556" y="102" fill="var(--btc)">Stages 16.1–16.7</text><rect x="12" y="150" width="140" height="70" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="82" y="172" font-weight="700" fill="var(--ink)">5 Capital stack</text><text x="82" y="190" fill="var(--muted)">floors · BTC Rating · floor price</text><text x="82" y="208" fill="var(--orange-ink)">Stages 6.1, 17.6</text><rect x="170" y="150" width="140" height="70" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="240" y="172" font-weight="700" fill="var(--ink)">6 Stress test</text><text x="240" y="190" fill="var(--muted)">−50/−70/−85% · markets shut</text><text x="240" y="208" fill="var(--red)">Stages 18.2, 18.3</text><rect x="328" y="150" width="140" height="70" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="398" y="172" font-weight="700" fill="var(--ink)">7 Bull, bear, signposts</text><text x="398" y="190" fill="var(--muted)">strongest cases · mind-changers</text><text x="398" y="208" fill="var(--green)">Stages ∞.1, 18.6</text><rect x="486" y="150" width="140" height="70" rx="8" fill="var(--surface-2)" stroke="var(--ink)"/><text x="556" y="172" font-weight="700" fill="var(--ink)">8 Write the report</text><text x="556" y="190" fill="var(--muted)">one page · definitions · dates</text><text x="556" y="208" fill="var(--ink)">Stage 20.3</text></g><g stroke="var(--muted)" stroke-width="1.5" fill="none"><path d="M152 79 H170"/><path d="M310 79 H328"/><path d="M468 79 H486"/><path d="M556 114 V132 H82 V150"/><path d="M152 185 H170"/><path d="M310 185 H328"/><path d="M468 185 H486"/></g><text x="320" y="242" text-anchor="middle" font-size="10" fill="var(--muted)">Eight links compressed into six parts: part 4 = pick + metrics, part 5 = stack + stress test, bull/bear/signposts folded into part 6</text></svg><figcaption>A full analysis is this pipeline: upstream judgments (rates, bitcoin scenarios) become downstream inputs (coverage multiples, months of cover).</figcaption></figure>

### ① Step 1: the macro regime (check the weather first)

**The question:** which quadrant of Stage 20.2's growth-by-inflation map are we in, and is liquidity loosening or tightening?

**The September 2026 readings** (from official data; update them and date them whenever you write a report):
- **Growth:** August payrolls rose 162,000 and unemployment was 4.1%. The S&P 500 closed around 7,743 on September 25, near its record, and FactSet showed 2026 earnings growth expected at about +32%. Growth is on the strong side.
- **Inflation:** August CPI was 3.4% year over year (core 2.4%), and July PCE was 3.7% (core 3.3%). The oil shock from the Iran war still had Brent near $115 on September 22. Inflation has been above the 2% target continuously since early 2021. Inflation is on the high side.
- **Liquidity:** the Fed hiked 25 basis points to 3.75% to 4.00% on September 16, its first hike since July 2023, and markets priced roughly a two-in-three chance of another in October. Quantitative tightening ended on December 1, 2025, but reserve-management bill purchases were paused from August 14, 2026. Liquidity is on the tight side.

**Judgment:** "stronger growth, higher inflation, tightening liquidity": on Stage 20.2's map, close to the **overheating quadrant with stagflation risk**. In the report this step becomes one sentence plus three numbers, and it admits it is a judgment: core CPI and core PCE were unusually far apart in mid-2026, almost a full point, and which one you pick shapes how you describe inflation.

**Why this step matters:** Stage 9.5 showed that regime shifts change how assets relate to each other; in 2022 stocks and bonds fell together, and the 60/40 portfolio failed in an inflationary regime. For a DAT, an overheating-plus-tightening regime means high discount rates, capital markets that are pickier about risky issuance, and a weaker "liquidity tailwind" for bitcoin (Stage 9.3).

### ② Step 2: rates (set the discount rate for everything)

**The question:** where is the risk-free rate, what shape is the curve, how big is the long-end term premium, and what does that imply for the securities you are analyzing?

**The US Treasury curve on September 25, 2026** (Treasury par yield curve): 3-month 4.24%, 2-year 4.81%, 10-year 5.17%, 30-year 5.49%. The curve slopes upward, with 10s minus 2s about +36 basis points. The New York Fed's ACM model put the 10-year term premium at about +0.73% on September 24.

Turn that into three usable numbers:

$$
\\text{30-year 5\\% Treasury: }\\ y = 5.49\\% \\Rightarrow P \\approx 92.8
y = 6.49\\%\\ (\\text{one point higher}) \\Rightarrow P \\approx 80.4
\\text{Orange-F required yield} = \\text{30-year}\\ 5.49\\% + \\text{credit spread}\\ 4.5\\% \\approx 10.0\\%
\\Rightarrow \\text{the 10\\% Orange-F} \\approx \\text{par}
\\text{credit spread} = 6\\% \\Rightarrow \\text{required yield} \\approx 11.5\\% \\Rightarrow \\text{Orange-F} \\approx \\$87
$$

The 30-year's modified duration is about 15.5 (Stage 4.4).

**Why this step matters:** this is where the first headline of Stage 0.1 (the 30-year yield breaking above 5%) lands in your analysis. Rates anchor every asset (Stage 2.4). A perpetual preferred is a perpetuity (Stages 2.3 and 18.1), so every move in long rates moves its price; for bitcoin, an asset with no cash flows, high real rates mean a higher opportunity cost of holding it (Stage 2.5). In the report this step produces **the risk-free rate, the credit spread you are using, and the resulting required yield**: three numbers, each with its source and date.

### ③ Step 3: bitcoin (write scenarios, not forecasts)

**The question:** over the period you are analyzing, which ranges could bitcoin plausibly land in, and how much weight do you give each?

**The September 2026 starting point:** a close of about $84,100 on September 25; an all-time high of about $126,000 on October 6, 2025; an intraday low of about $57,800 on July 1, 2026, roughly −54% from the peak; a 2026 range of about $58,000 to $97,000. About 20.09 million coins had been mined, about 95.7% of the 21 million cap. US spot bitcoin ETFs had cumulative net inflows of about $57.5 billion, and public companies held about 1.27 million coins, roughly two-thirds of them at Strategy.

**The scenario method** (Stage 12.3 explained that bitcoin has no cash flows, so no DCF can produce a "correct price"):
- **Bear scenario:** −50%. Bitcoin has had several 70% to 80% drawdowns (Stage 11.3), so −50% is not extreme.
- **Base scenario:** flat.
- **Bull scenario:** +50%.
- **Weights:** your call, with your reasons written down, for example 30% / 40% / 30%.

**The most common mistake at this step** is writing a single scenario. One scenario is a hidden forecast; three scenarios with weights let readers see your uncertainty and connect cleanly to the stress test in step 5. Another common slip is forgetting that **bitcoin's volatility itself changes** (Stage 12.4): a 50% drop spread over a year and one packed into three months mean very different things for a DAT's funding window.

### ④ Step 4: pick a DAT and compute every metric on a named definition

**The question:** what does this company's balance sheet look like, and what is each core metric **on which definition**?

Orange Corp as the example (bitcoin at the standard $100,000 assumption; how to re-mark to about $84,100 follows the table):

<table><tr><th>Metric</th><th>Definition</th><th>Orange Corp</th><th>Review</th></tr><tr><td>Bitcoin NAV</td><td>\\(10{,}000 \\times \\$100{,}000\\)</td><td>$1.0B</td><td>Stage 16.2</td></tr><tr><td>mNAV</td><td>Market cap basis</td><td>1.50</td><td>Stage 16.2</td></tr><tr><td>mNAV</td><td>Diluted market cap (all converts assumed converted, 106M shares)</td><td>1.59</td><td>Stage 16.2</td></tr><tr><td>mNAV</td><td>Enterprise value basis (Strategy's 2025 definition)</td><td>1.77</td><td>Stage 16.2</td></tr><tr><td>mNAV</td><td>\\(\\dfrac{\\text{price}}{\\text{net BTC per share}}\\) (Strategy's 2026 definition; net reserve $730M)</td><td>2.05</td><td>Stage 16.2</td></tr><tr><td>BTC per share</td><td>On 100M shares / on 106M assumed diluted</td><td>10,000 sats / about 9,434 sats</td><td>Stage 16.1</td></tr><tr><td>Amplification</td><td>Simple / Strategy's / Strive's ratio</td><td>1.43x / 1.37x / 30%</td><td>Stage 16.4</td></tr><tr><td>BTC Rating</td><td>Converts / Orange-F / Orange-D</td><td>6.7x / 4.0x / 3.3x</td><td>Stage 16.5</td></tr><tr><td>BTC floor price</td><td>Where each layer's rating hits exactly 1.0x</td><td>$15,000 / $25,000 / $30,000</td><td>Stage 16.5</td></tr><tr><td>Months of cover</td><td>\\(\\dfrac{\\$30\\text{M}}{\\$15\\text{M of annual dividends}}\\)</td><td>24 months</td><td>Stage 16.6</td></tr><tr><td>BTC Breakeven ARR</td><td>\\(\\dfrac{\\$15\\text{M}}{\\$1.0\\text{B}}\\)</td><td>1.5%</td><td>Stage 16.6</td></tr><tr><td>One turn of the flywheel</td><td>Issue 10M shares at $15, buy bitcoin with all of it</td><td>BTC per share +4.5%</td><td>Stage 16.7</td></tr></table>

**Plugging in step 3:** re-mark bitcoin to about $84,100 (September 25, 2026) and bitcoin NAV becomes about $841 million. The three BTC Ratings fall to about 5.6x / 3.4x / 2.8x, Breakeven ARR rises from 1.5% to about 1.8%, and simple amplification climbs from 1.43x to about 1.55x. **The further bitcoin falls, the higher the leverage.** That is the heart of Stage 16.4, and it is exactly what the stress test magnifies.

**Doing it for a real company:** the method is identical, but every number needs a date and a source. Take Strategy: 846,000 bitcoin as of September 20, 2026; mNAV of about 1.01x on its 2026 definition on August 21; amplification about 1.30x, STRC's BTC Rating about 5.7x and Breakeven ARR about 2.63% on August 23; a USD Reserve of about $5.04 billion on September 20, which covers about 37 months against roughly $1.62 billion of annual obligations (a derived figure). **These numbers carry different dates**, and the report has to label each one rather than blending them into a single "current" snapshot. Strive, meanwhile, doesn't use the label mNAV at all but reports three related measures (Stage 17.5); different definitions mean no direct side-by-side comparison (Stage 18.5).

### ⑤ Step 5: the capital stack and the stress test

**The question:** if bitcoin falls 50%, 70% or 85%, how much coverage does each layer have left and how much does it recover? If capital markets shut at the same time, where do the dividends come from, and where does the cash for the put date come from?

First draw the capital stack as floors (Stage 6.1): convertibles on top ($150 million), then Orange-F ($100 million, cumulative), then Orange-D ($50 million, non-cumulative), with common at the bottom. Then drop the price step by step:

<table><tr><th>Bitcoin</th><th>Bitcoin NAV</th><th>Convert layer</th><th>Orange-F layer</th><th>Orange-D layer</th><th>Common in liquidation</th><th>Amplification (simple)</th></tr><tr><td>$100k (base)</td><td>$1.0B</td><td>6.67x</td><td>4.00x</td><td>3.33x</td><td>$700M</td><td>1.43x</td></tr><tr><td>−50%</td><td>$500M</td><td>3.33x</td><td>2.00x</td><td>1.67x</td><td>$200M</td><td>2.50x</td></tr><tr><td>−70%</td><td>$300M</td><td>2.00x</td><td>1.20x</td><td>1.00x</td><td>about $0</td><td>→ infinite</td></tr><tr><td>−85%</td><td>$150M</td><td>1.00x</td><td>0.60x (0% recovery)</td><td>0.50x (0% recovery)</td><td>$0</td><td>—</td></tr></table>

Three things to read from this table:
- **Floor prices are the break points.** Orange-D's $30,000 floor lines up exactly with −70%, Orange-F's $25,000 with −75%, and the converts' $15,000 with −85%. The floor prices of Stage 16.5 become a schedule of which layer starts taking losses at which price.
- **Common is the first cushion.** At −50%, bitcoin NAV halves, but common's liquidation value drops from $700 million to $200 million, about −71%. That is what amplification looks like on the way down (Stage 17.6).
- **"Covered 1x" is not "safe".** 1.0x means zero cushion, and liquidation brings costs and discounts on top (Stage 6.6).

**Now add time (Stage 18.2).** Suppose capital markets are shut for 24 months, the convertible holders have a put in month 24, and the stock sits far below the $25 conversion price, so holders want cash. The $30 million reserve covers exactly 24 months of dividends; then in month 24 the $150 million put must be paid entirely by selling bitcoin, which in the −50% scenario means 3,000 coins, or 30% of holdings. **The output of a stress test is not a number but a timetable:** the month the reserve runs out, the month the put falls due, and how much bitcoin must be sold then. Add mNAV below 1 (Stage 18.3), where issuing common no longer adds value, and that timetable becomes the company's only map.

Finally, use the tools of Stage ∞.1 to give each layer a probability lens. With a lognormal model, a 10% expected annual return, 45% volatility and a 10-year duration, the chance that each layer ends below 1x is roughly 9% / 17% / 20%, which translates into model-required spreads of about 97 / 183 / 225 basis points. Put those next to the actual spread from step 2 (about 4.5% for Orange-F): **the gap between model and market is one of the central debates your report should discuss.**

### ⑥ Step 6: write the report

**The question:** can a smart but busy reader learn your conclusion, your evidence, the risks and what would change your mind in five minutes?

**A one-page report in eight parts:**
1. **A one-sentence conclusion:** a judgment about structure and risk, with a time frame and without a buy or sell call. For example: "Provided bitcoin stays above roughly $30,000, the reserve covers Orange-F and Orange-D dividends for 24 months; the main risk is the convertible put in month 24."
2. **Macro and rates:** the regime call plus three dated numbers.
3. **Bitcoin scenarios:** bear, base and bull prices with weights and reasons.
4. **The metrics table:** every metric with its **definition** and **date**.
5. **The capital stack:** floors, BTC Ratings, floor prices.
6. **The stress test:** the coverage ladder, months of cover, the put timetable.
7. **The strongest case on each side:** two points each, checked against the Stage 18.6 checklist for missing dimensions (custody, governance, indexes, regulation).
8. **Signposts:** which data would change your judgment (the method of Stage ∞.1), plus "this report is not investment advice."

**The seven most common mistakes** (check each one when you finish):
- Quoting an mNAV without its definition, or comparing numbers from Strategy's 2025 and 2026 definitions as if they were the same thing.
- Treating BTC Yield as a yield in the bond sense (Stage 16.3 showed it isn't).
- Undated numbers, or numbers from different dates blended into one "current" figure.
- Looking only at bitcoin coverage and forgetting seniority: a junior layer can recover nothing.
- Writing a single bitcoin scenario.
- Ignoring time: put dates and the month the reserve runs dry.
- Not writing down what would change your mind.

**Back to where we started.** The three headlines of Stage 0.1 (the 30-year yield breaking above 5%; tokenization and stablecoins rewriting the plumbing; Strategy issuing bitcoin-backed preferreds yielding around 10%) each have a place in this report. The first is step 2's discount rate. The third is the object of steps 4 and 5. The second is the new plumbing from questions ③ and ④ of Stage ∞.1 that may one day carry these very securities. **You can now write all of this up as an analysis others can reproduce and argue with.** That is what this course set out to leave you with.
`,

  demo: "capstone",

  analogy: `
Think of the capstone as **your first solo flight**.

Everything a student pilot has learned (weather, navigation, how the engine works, the instruments, emergency procedures) was spread across separate lessons. On the first solo it all has to appear, in a fixed order, on a **pre-flight checklist**. Check the weather (the macro regime). Check the wind and runway length (the "takeoff distance" set by interest rates). Work out fuel and load (the balance sheet under your bitcoin scenarios). Go through the instruments one by one (metrics on named definitions). Decide in advance where you would land if the engine quit (the stress test and floor prices). Then file the flight plan with the tower (the report).

What separates good pilots from bad ones is not who is more confident the weather will hold. It is that:
- good pilots **write every item on the checklist** instead of going by feel;
- good pilots **pick their diversion airfield before takeoff**, not after the engine stops;
- a good pilot's flight plan **can be checked by someone else**: heading, fuel and time are all written as numbers with units.

Your report is a flight plan too. Macro is the weather, rates are the runway, bitcoin is the fuel, the capital stack is the airframe, the stress test is the diversion plan, and "what would change my mind" is the turn-back condition you agreed with the tower. **Once you can write that plan, you are no longer a passenger.**
`,

  misconceptions: [
    "**\"An analysis ends in a buy or sell call.\"** This capstone produces a judgment about structure and risk: how much cushion each layer has, in which scenarios it takes losses, and where the timetable is most dangerous. It is not investment advice and it forecasts no prices; buying or selling depends on the reader's own horizon, position size and overall portfolio.",
    "**\"Macro and rates are just background; go straight to the company metrics.\"** Rates set the discount rate and the required yield on preferreds. The same 10% Orange-F is worth about par at a 4.5% spread and only about $87 at 6%. Skip steps 1 and 2 and your metrics table has no pricing anchor.",
    "**\"I have a most-likely view on bitcoin, so one scenario is enough.\"** A single scenario is a hidden forecast. Bitcoin fell about 54% between October 2025 and July 2026. Three scenarios with weights let readers see the uncertainty and plug straight into the stress test.",
    "**\"If a layer's coverage is above 1x, it's safe.\"** 1.0x means zero cushion, and as bitcoin falls, coverage falls while amplification rises. More important is time: put dates and the month the reserve runs out often bite before coverage does.",
    "**\"For a real company, just copy the 'current' numbers from its website.\"** Different metrics are published on different dates, and definitions change (Strategy changed its mNAV definition in 2026). Every number in a report needs its definition, date and source, or readers can't reproduce it or spot that you mixed August's mNAV with September's holdings.",
  ],

  quiz: [
    {
      q: "In this lesson's pipeline, how does the output of step 2 (rates) feed directly into later steps?",
      options: [
        "It sets bitcoin's supply cap",
        "It supplies the risk-free rate and required yield used to price preferreds (as perpetuities) and to measure the opportunity cost of holding an asset with no cash flows",
        "It only changes the name of the macro regime, not any numbers",
        "It sets the DAT's share count",
      ],
      answer: 1,
      explain: "\\(\\text{30-year}\\ 5.49\\% + \\text{credit spread}\\ 4.5\\% \\approx 10\\%\\) is the required yield, so the 10% Orange-F is worth about par; widen the spread to 6% and it is worth about $87. **Rates anchor every asset** (Stages 2.4 and 18.1).",
    },
    {
      q: "Orange Corp's bitcoin falls 70% from $100,000. What is the approximate BTC Rating of the Orange-D layer (cumulative claims of $300 million)?",
      options: ["About 1.0x", "About 3.3x", "About 1.67x", "About 0.5x"],
      answer: 0,
      explain: "\\(\\text{bitcoin NAV} = 10{,}000 \\times \\$30{,}000 = \\$300\\text{M}\\); \\(\\text{BTC Rating} = \\dfrac{\\$300\\text{M}}{\\$300\\text{M}} =\\) **1.0x**. That is Orange-D's $30,000 floor price: the floor prices of Stage 16.5 become the break points of the stress test.",
    },
    {
      q: "A report says \"\\(\\mathrm{mNAV} = 1.77\\)\". What, at minimum, must it add so readers can reproduce the figure?",
      options: [
        "Bitcoin's all-time high",
        "The CEO's name",
        "The definition (e.g. enterprise value basis \\(\\mathrm{mNAV}_{\\text{EV}} = \\dfrac{\\text{market cap} + \\text{debt} + \\text{preferred} - \\text{cash}}{\\text{bitcoin NAV}}\\)) and the date of the data",
        "Nothing",
      ],
      answer: 2,
      explain: "The same Orange Corp can show an mNAV of 1.50, 1.59, **1.77** or 2.05. Without the definition and date, readers can't reproduce it or compare it across companies or over time (Stage 16.2).",
    },
    {
      q: "Stress setup: markets shut for 24 months, a $150M convertible put in month 24, a $30M reserve that exactly covers 24 months of dividends, and bitcoin down 50% to $50,000. How much bitcoin must be sold to meet the put?",
      options: ["About 300 coins", "About 1,500 coins", "About 6,000 coins", "About 3,000 coins"],
      answer: 3,
      explain: "The reserve has gone on dividends, so \\(\\dfrac{\\$150\\text{M}}{\\$50{,}000} =\\) **3,000 coins**, 30% of the 10,000 held. A stress test produces a timetable, not just a coverage multiple (Stage 18.2).",
    },
    {
      q: "Which of these is one of the \"most common mistakes\" listed in this lesson?",
      options: [
        "Writing three bitcoin scenarios with weights",
        "Treating BTC Yield as a yield in the bond sense",
        "Ending the report with \"not investment advice\"",
        "Dating and sourcing every number",
      ],
      answer: 1,
      explain: "BTC Yield is the percentage change in bitcoin per share, and Strategy itself says it is **not a yield in the traditional financial sense** (Stage 16.3). The other three are good practice.",
    },
  ],

  further: [
    { label: "Strategy Q2 2026 10-Q (SEC EDGAR): primary source for the capital stack, convertibles and preferred terms", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000044/mstr-20260630.htm" },
    { label: "Strive bitcoin treasury dashboard: holdings, SATA and metric definitions", url: "https://strive.com/treasury" },
    { label: "US Treasury daily par yield curve rates", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026" },
    { label: "FRED: 30-year Treasury constant-maturity yield (DGS30)", url: "https://fred.stlouisfed.org/series/DGS30" },
    { label: "bitcointreasuries.net: public-company bitcoin holdings and mNAV on several definitions", url: "https://bitcointreasuries.net/" },
  ],
};
