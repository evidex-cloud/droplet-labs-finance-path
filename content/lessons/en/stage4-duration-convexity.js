export default {
  id: "duration-convexity",
  stage: 4,
  order: 4,
  title: "Duration & Convexity: How Much a Bond Moves When Rates Move",
  difficulty: "core",
  prereqs: ["price-yield"],

  oneLiner:
    "Stage 4.2 said longer bonds sit on longer seesaws. This lesson turns “how long” into a number: **duration**. Macaulay duration is the **average time it takes to get your money back**, weighting each cash flow by its present value. Modified duration tells you **roughly what percentage the price moves for each 1-point move in yield**: about 7.8 for the standard 10-year bond, about **15.5** for the 30-year Treasury, and about \\(\\dfrac{1}{\\text{yield}}\\) for a perpetual. **DV01** converts it to dollars: what one basis point is worth. **Convexity** explains why the straight-line estimate always comes out too gloomy. With these few numbers you can estimate in a second how hard a rate shock hits a bond, a bank, or even a bitcoin treasury company's preferred stock.",

  intuition: `
In Stage 4.2 we saw that the same 1-point rise in yield knocks about 1.9% off a 2-year bond, about 7.4% off a 10-year and about 13.8% off a 30-year. Can we capture how sensitive a bond is to rates with **a single number**, without looking anything up or redoing the math? Yes. That number is **duration**.

Start with an everyday question: **on average, how long until the money you lent comes back?**

The standard bond ($1,000 face, 5% coupon, ten years) doesn't return your money in one lump in year ten. It sends $25 back every six months and $1,025 on the last day. Weight each payment by what it's worth today, compute the average time you wait, and the answer is about **7.99 years**. That's shorter than ten, because the coupons send part of the money home early. This “average time to get paid back” is **Macaulay duration**.

What does it have to do with sensitivity? A change in rates does its damage over time: the later money comes back, the longer it's exposed to the new rate. So **the longer the average wait, the more the price reacts to rates.** Tweak Macaulay duration slightly (divide by 1 plus the half-year yield) and you get **modified duration**, which answers the question you actually care about:

> **For each 1-point rise in yield, the price falls by roughly “modified duration” percent.**

- The standard 10-year bond: modified duration about **7.8** → yield +1%, price about −7.8%
- The 30-year Treasury (at about a 5% yield): modified duration about **15.5** → yield +1%, price about −15.5%
- A perpetual security: modified duration about \\(\\dfrac{1}{\\text{yield}}\\) → about 10 for a perpetual preferred yielding 10%, about 20 at a 5% yield

Notice that the 30-year's actual drop (13.8%) is smaller than 15.5%. The gap is **convexity**. Price and yield aren't related by a straight line but by a curve that bows toward you: when yields rise, the price falls less than the straight line predicts; when they fall, it rises more. **Convexity works in the bondholder's favor.**

This lesson rests on **Idea ① The price of time** and **Idea ④ Risk & leverage**. Duration is the ruler that translates “time” into “risk.” It tells you how much interest-rate risk you carry, and so how much a balance sheet loses when rates jump. Silicon Valley Bank in 2023 (Stage 10.3), the UK pension funds' LDI crisis in 2022, and the 2026 long-end selloff in Stage 4.5 are all, at bottom, **too much duration meeting a change in rates**. In Stage 17.4 you'll see why Strategy deliberately engineered its STRC preferred to have a short duration.

**In this lesson we break it into six pieces:**

- **① Macaulay duration: the year where the cash flows balance**
- **② Modified duration: how many percent the price moves per point of yield**
- **③ DV01: what one basis point is worth in dollars**
- **④ What makes duration longer: maturity, coupon and yield**
- **⑤ Convexity: why the straight-line estimate is always too gloomy**
- **⑥ Perpetuals, preferreds and the duration of a stock: the longest seesaws**
`,

  mechanics: `
### ① Macaulay duration: the year where the cash flows balance

Draw each of the standard bond's cash flows as a bar whose height is its value today (discounted at 5%), and set the bars on a beam. Where does the beam balance?

<figure><svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Macaulay duration = the balance point of present values (standard bond, 5% yield)</text><line x1="40" y1="170" x2="600" y2="170" stroke="var(--ink)" stroke-width="3"/><g fill="var(--blue)"><rect x="73" y="165.7" width="8" height="4.3"/><rect x="100" y="165.8" width="8" height="4.2"/><rect x="127" y="165.9" width="8" height="4.1"/><rect x="154" y="166" width="8" height="4"/><rect x="181" y="166.1" width="8" height="3.9"/><rect x="208" y="166.2" width="8" height="3.8"/><rect x="235" y="166.3" width="8" height="3.7"/><rect x="262" y="166.4" width="8" height="3.6"/><rect x="289" y="166.5" width="8" height="3.5"/><rect x="316" y="166.6" width="8" height="3.4"/><rect x="343" y="166.6" width="8" height="3.4"/><rect x="370" y="166.7" width="8" height="3.3"/><rect x="397" y="166.8" width="8" height="3.2"/><rect x="424" y="166.9" width="8" height="3.1"/><rect x="451" y="167" width="8" height="3"/><rect x="478" y="167" width="8" height="3"/><rect x="505" y="167.1" width="8" height="2.9"/><rect x="532" y="167.2" width="8" height="2.8"/><rect x="559" y="167.2" width="8" height="2.8"/></g><rect x="584" y="60" width="12" height="110" fill="var(--orange)"/><polygon points="481.5,172 468,198 495,198" fill="var(--red)"/><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="50" y="214">0</text><text x="158" y="214">2</text><text x="266" y="214">4</text><text x="374" y="214">6</text><text x="482" y="214">8</text><text x="590" y="214">10 yrs</text></g><text x="160" y="150" text-anchor="middle" font-size="11" fill="var(--blue)">$25 coupons, each worth about $24 → $15 today</text><text x="578" y="56" text-anchor="end" font-size="11" fill="var(--orange-ink)">Final $1,025, worth about $625 today</text><text x="481" y="232" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">Fulcrum: Macaulay duration ≈ 7.99 years</text><text x="300" y="104" text-anchor="middle" font-size="11" fill="var(--ink)">The heavy principal pulls the balance point right;</text><text x="300" y="120" text-anchor="middle" font-size="11" fill="var(--ink)">twenty small coupons pull it back left by about 2 years</text></svg><figcaption>Bar height is the present value of each cash flow (coupons drawn to the same scale, which is why they're so short). The balance point is the “average time to get paid back”: 7.99 years. A zero-coupon bond has one bar, so its duration equals its maturity.</figcaption></figure>

The formula is \\(\\text{time} \\times \\text{weight}\\), summed, where each weight is that cash flow's present value as a share of the price:

$$
\\text{Macaulay duration} = \\frac{1}{\\text{price}} \\sum_{k=1}^{n} t_{k} \\times \\frac{\\mathrm{CF}_{k}}{\\left(1 + \\frac{y}{2}\\right)^{k}}
\\text{Standard bond (at 5\\%):} \\approx 7.99\\ \\text{years}
\\text{30-year 5\\% bond (at 5\\%):} \\approx 15.84\\ \\text{years}
$$

Two immediate consequences:

- **A zero-coupon bond's duration equals its maturity.** One bar, so that's where the balance point is. A 10-year zero has a 10-year duration; a 30-year zero, 30 years.
- **A coupon bond's duration is shorter than its maturity.** The higher the coupon, the more money comes back early, and the further left the balance point moves.

### ② Modified duration: how many percent the price moves per point of yield

Macaulay duration is measured in years. What we really want is a percentage sensitivity. Mathematically, the derivative of price with respect to yield, divided by price, is exactly Macaulay duration divided by \\(\\left(1 + \\dfrac{y}{2}\\right)\\). That number is **modified duration**:

$$
\\text{Modified duration} = \\frac{\\text{Macaulay duration}}{1 + \\frac{y}{2}}
\\%\\ \\text{price change} \\approx -\\,\\text{modified duration} \\times \\text{change in yield}
$$

Check it with the standard numbers:

<table><tr><th>Bond (5% coupon, 5% yield)</th><th>Macaulay duration</th><th>Modified duration</th><th>+1 point: duration estimate</th><th>+1 point: exact</th></tr><tr><td>2-year</td><td>1.93 years</td><td>1.88</td><td>−1.88%</td><td>−1.86%</td></tr><tr><td>10-year (standard bond)</td><td>7.99 years</td><td>7.79</td><td>−7.79%</td><td>−7.44%</td></tr><tr><td>30-year</td><td>15.84 years</td><td>15.45</td><td>−15.45%</td><td>−13.84%</td></tr></table>

For small moves, the duration estimate is nearly perfect. A 0.5-point rise in the 30-year's yield: duration says −7.73%, the exact answer is −7.31%. At 0.25 points the error is smaller still. **The bigger the rate move and the longer the bond, the bigger the straight-line error.** Convexity, in ⑤, fills that gap.

Practice on 2026's market. The 30-year Treasury yield rose from 4.64% on February 27, 2026 to 5.47% on September 24, about 0.83 points. For a 30-year bond with a 5% coupon, a duration of roughly 15 says the price fell about 12%, and the exact calculation gives almost exactly −12.0%. **In under seven months, the “risk-free” long bond lost an eighth of its value.**

### ③ DV01: what one basis point is worth in dollars

Traders don't like to talk in percentages; they talk in dollars. **DV01 (the dollar value of 01) is how many dollars the price moves when the yield changes by one basis point (0.01 percentage points):**

$$
\\mathrm{DV01} = \\text{modified duration} \\times \\text{price} \\times 0.0001
$$

- Standard 10-year bond (price $1,000): \\(7.79 \\times 1{,}000 \\times 0.0001 \\approx \\$0.78\\) per basis point
- 30-year (price $1,000): \\(\\approx \\$1.55\\) per basis point. Hold **$1 million** face value and it's about **$1,545 per basis point**. A 10-basis-point rise in yield costs you about $15,000 in a day.

DV01's great virtue is that **it adds up**. A bank, a pension fund or a bond fund can sum the DV01 of every holding and know “for each basis point the whole curve moves, I make or lose this much.” Hedging uses it too: to hedge a 30-year Treasury with 10-year Treasury futures, you size the futures so the two DV01s match (the swaps and hedging programs in Stage 7.4 are balanced the same way).

A bank-style example (**hypothetical** numbers): a bank holds $50 billion of bonds with an average modified duration of about 6. Yields rise 3 points. Rough loss: \\(\\$50\\ \\text{billion} \\times 6 \\times 3\\% = \\$9\\ \\text{billion}\\). If its shareholders' equity is only $10 billion, that nearly wipes it out on paper. **That's the arithmetic of Silicon Valley Bank in Stage 10.3.**

### ④ What makes duration longer: maturity, coupon and yield

Three levers set duration (the table uses a 5% yield and semiannual payments, except the last two rows, which change the yield):

<table><tr><th>Bond</th><th>Modified duration</th><th>Why</th></tr><tr><td>30-year zero-coupon</td><td>29.27</td><td>No coupons; the balance point is on the last day</td></tr><tr><td>30-year, 2% coupon</td><td>18.97</td><td>Low coupon; most of the value rides on the distant principal</td></tr><tr><td>30-year, 5% coupon</td><td>15.45</td><td>The course's standard number</td></tr><tr><td>30-year, 8% coupon</td><td>14.17</td><td>High coupon; money comes back sooner</td></tr><tr><td>30-year 5% coupon, 2% yield</td><td>18.91</td><td>Low yield → distant cash flows discounted less, weigh more → longer duration</td></tr><tr><td>30-year 5% coupon, 8% yield</td><td>12.26</td><td>High yield → distant cash flows weigh less → shorter duration</td></tr></table>

The rules:

- **Longer maturity, longer duration.** The most important one.
- **Lower coupon, longer duration.** That's why the low-coupon long bonds issued in 2020–2021 were hurt worst after 2022. **Suppose** a Treasury has a 1.375% coupon and 24 years left. At a 5.5% yield its modified duration is about 17.8, longer than a new 5%-coupon bond of the same maturity, and its price is only about 45% of face value.
- **Lower yield, longer duration.** The zero-rate era pushed long-bond durations to extreme levels, which is why the climb back from zero was so brutal.

### ⑤ Convexity: why the straight-line estimate is always too gloomy

Plot the 30-year Treasury's true price curve alongside the straight line that duration implies (the tangent):

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Convexity: the true price curve always sits above the duration line (30-year, 5% coupon)</text><line x1="70" y1="40" x2="70" y2="230" stroke="var(--line)" stroke-width="1.5"/><line x1="70" y1="230" x2="600" y2="230" stroke="var(--line)" stroke-width="1.5"/><g font-size="10" fill="var(--muted)" text-anchor="end"><text x="64" y="233">50</text><text x="64" y="171">100</text><text x="64" y="108">150</text></g><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="135" y="244">2%</text><text x="200" y="244">3%</text><text x="265" y="244">4%</text><text x="330" y="244">5%</text><text x="395" y="244">6%</text><text x="460" y="244">7%</text><text x="525" y="244">8%</text></g><text x="335" y="260" text-anchor="middle" font-size="10" fill="var(--muted)">Yield</text><line x1="102.5" y1="99.9" x2="538" y2="229.3" stroke="var(--blue)" stroke-width="2" stroke-dasharray="6 4"/><polyline fill="none" stroke="var(--red)" stroke-width="2.5" points="102.5,62.1 118.8,73.0 135.0,83.2 151.3,92.8 167.5,101.8 183.8,110.3 200.0,118.3 216.3,125.8 232.5,132.8 248.8,139.5 265.0,145.8 281.3,151.7 297.5,157.3 313.8,162.5 330.0,167.5 346.3,172.2 362.5,176.6 378.8,180.8 395.0,184.8 411.3,188.6 427.5,192.1 443.8,195.5 460.0,198.7 476.3,201.7 492.5,204.6 508.8,207.3 525.0,209.9 541.3,212.4 557.5,214.7 573.8,217.0 590.0,219.1"/><circle cx="330" cy="167.5" r="4" fill="var(--ink)"/><line x1="200" y1="118.3" x2="200" y2="128.9" stroke="var(--green)" stroke-width="3"/><line x1="460" y1="198.7" x2="460" y2="206.1" stroke="var(--green)" stroke-width="3"/><g font-size="10"><text x="208" y="112" fill="var(--green)">3%: true 139.4 vs line 130.9</text><text x="468" y="192" fill="var(--green)">7%: true 75.1 vs line 69.1</text><text x="380" y="60" fill="var(--red)" font-weight="700">True price (a convex curve)</text><text x="380" y="76" fill="var(--blue)" font-weight="700">Duration estimate (tangent, slope −15.45)</text></g></svg><figcaption>At 5% the line and the curve touch. The further you move from 5%, the further the curve sits above the line. The green bars are the extra value convexity adds: bigger gains, smaller losses.</figcaption></figure>

Add the second-order convexity term and the estimate gets much closer (priceChangeApprox in _fin.js):

$$
\\%\\ \\text{price change} \\approx -\\,\\text{modified duration} \\times \\Delta y + \\frac{1}{2} \\times \\text{convexity} \\times (\\Delta y)^{2}
$$

For the 30-year 5% bond: modified duration 15.45, convexity about 352.

<table><tr><th>Yield change</th><th>Duration only</th><th>Duration + convexity</th><th>Exact</th></tr><tr><td>+1 point</td><td>−15.45%</td><td>−13.69%</td><td>−13.84%</td></tr><tr><td>−1 point</td><td>+15.45%</td><td>+17.21%</td><td>+17.38%</td></tr><tr><td>+2 points</td><td>−30.91%</td><td>−23.87%</td><td>−24.94%</td></tr><tr><td>−2 points</td><td>+30.91%</td><td>+37.95%</td><td>+39.38%</td></tr></table>

What convexity means:

- **It's good for the holder.** For rate moves of the same size, you gain more than you lose. The more rates swing, the more convexity is worth, so the market usually lets more-convex bonds yield slightly less. In effect, you pay for this insurance.
- **Long bonds have far more convexity than short ones.** About 4.5 for a 2-year, about 74 for a 10-year, about 352 for a 30-year, about 871 for a 30-year zero.
- **Negative convexity.** Some securities bend the wrong way: **callable bonds** and **mortgage-backed securities**. When rates fall, the issuer calls the bond early or homeowners refinance, so your price can't rise much. When rates rise, nobody repays early and you take the full loss. **Capped upside, uncapped downside**: that's negative convexity. Stage 18.1 uses it to analyze callable preferreds, where the issuer can redeem at par once rates fall, putting a lid on the holder's upside.

### ⑥ Perpetuals, preferreds and the duration of a stock: the longest seesaws

A **perpetual security** never matures, so its \\(\\text{price} = \\dfrac{\\text{annual cash flow}}{\\text{yield}}\\) (Stage 2.3). Differentiate and the modified duration comes out as:

$$
\\text{Modified duration of a perpetual} \\approx \\frac{1}{y}
y = 10\\% \\;\\to\\; \\approx 10
y = 5\\% \\;\\to\\; \\approx 20
$$

Some direct applications:

- **A perpetual preferred paying a 10% dividend** has a modified duration of about 10. If its required yield rises from 10% to 11%, the price drops from $100 to about $90.91, about −9.1%, a bit less than the −10% duration predicts. Convexity again. Its rate sensitivity is in the same league as a 10- to 15-year Treasury, and there's no maturity to pull it back to par.
- **The lower a perpetual's yield, the longer its duration.** Squeeze a perpetual preferred's yield from 10% down to 7% and its duration stretches from about 10 to about 14. The lower the yield, the more it behaves like a 30-year Treasury.
- **Floating rates are an engineering tool for shortening duration.** Strategy's STRC resets its dividend rate monthly to try to hold its price near $100, precisely so the price doesn't swing with long-term rates. It trades “price risk” for “income risk” (Stage 17.4). Comparing it with a fixed-dividend perpetual preferred is really comparing two durations. Stage 18.1 lays out the full framework for valuing preferreds.

**Stocks have duration too.** Take the Gordon growth model from Stage 2.3: \\(\\text{price} = \\dfrac{\\text{next year's dividend}}{r - g}\\). Differentiate and a stock's “duration” works out to about \\(\\dfrac{1}{r - g}\\). If \\(r - g = 4\\%\\), that's about 25, longer than a 30-year Treasury. That's why **growth stocks, whose value lies mostly in distant cash flows, fall hardest when rates rise** (Stage 5.3).

**Bitcoin has no cash flows**, so strictly speaking there's no duration to calculate. But like other assets whose value is mostly about the distant future, it has often come under pressure when real rates rise quickly (Stage 12.4 discusses its relationship with liquidity and real rates). The duration mindset still helps: **ask how much of an asset's value comes from the far future. The more it does, the more sensitive it is to rates.**
`,

  demo: "duration-convexity",

  analogy: `
Think of duration as **how far from the fulcrum someone sits on a seesaw**.

Same person, same push (the same change in rates). Sitting two meters from the fulcrum, a push barely lifts the other end. Sitting fifteen meters out, the same push sends the other end flying. The 2-year bond sits at 1.9 meters, the 30-year Treasury at 15.5 meters, and the perpetual preferred at \\(\\dfrac{1}{\\text{yield}}\\) meters. The lower the yield, the further out it sits.

DV01 swaps the seesaw for a scale: you hold $1 million of 30-year Treasuries, and the scale reads “$1,545 per basis point.”

And convexity? This seesaw isn't a straight plank but **one that curves up slightly at both ends**. When your end goes down, the curve means you don't sink as far as a straight plank would; when your end goes up, you rise higher. On a board like that, the bumpier the ride, the better you do. A callable bond is a plank with a stop bolted on top: your end can only rise halfway before it hits the stop, but it can sink all the way down.
`,

  misconceptions: [
    "**“Duration is just the bond's time to maturity.”** Only for zero-coupon bonds. A coupon bond's Macaulay duration is shorter than its maturity: about 7.99 years for the standard 10-year bond, about 15.84 years for a 30-year 5% bond. The higher the coupon, the sooner money comes back and the shorter the duration.",
    "**“A modified duration of 15.5 means a 1% rise in yield will cut the price by exactly 15.5%.”** That's a first-order approximation. The 30-year actually falls about 13.8%, because convexity bends the price curve in the holder's favor. The bigger the rate move, the bigger the gap, and you need the convexity term.",
    "**“Higher convexity means more danger.”** The opposite. Positive convexity helps the holder: smaller losses when rates jump, bigger gains when they drop. The dangerous kind is **negative convexity** (callable bonds, mortgage-backed securities): capped upside, uncapped downside.",
    "**“A perpetual preferred has no maturity, so interest rates don't affect it.”** Having no maturity is exactly what makes it so sensitive. Its modified duration is about \\(\\dfrac{1}{\\text{yield}}\\), around 10 at a 10% yield and longer as yields fall, and there's no maturity date to pull it back to par (Stage 18.1).",
    "**“Whichever maturity's yield rises most, that bond falls most.”** \\(\\text{Price loss} \\approx \\text{duration} \\times \\text{change in yield}\\), and duration usually matters more than the size of the yield move. From February 27 to September 24, 2026, the 2-year yield rose 1.49 points, yet a 5%-coupon 2-year bond fell only about 2.8%. The 30-year yield rose just 0.83 points, and a 5%-coupon 30-year bond fell about 12%.",
  ],

  quiz: [
    {
      q: "A 30-year Treasury has a modified duration of 15.5. Its yield rises 0.2 points (20 basis points). Roughly how much does its price change?",
      options: [
        "About −3.1%",
        "About −15.5%",
        "About −0.2%",
        "About +3.1%",
      ],
      answer: 0,
      explain: "**\\(\\%\\ \\text{price change} \\approx -\\text{modified duration} \\times \\Delta y = -15.5 \\times 0.2\\% \\approx -3.1\\%\\).** For small moves convexity barely matters, so the duration estimate is already accurate.",
    },
    {
      q: "Which bond has the longest modified duration (all at a 5% yield)?",
      options: [
        "30-year, 8% coupon",
        "10-year, 5% coupon",
        "30-year, 5% coupon",
        "30-year zero-coupon",
      ],
      answer: 3,
      explain: "**A zero has a single cash flow at maturity, so its Macaulay duration equals its maturity (30 years) and its modified duration is about 29.3.** At the same maturity, higher coupons mean shorter duration: about 14.2 for 8%, about 15.5 for 5%. The 10-year is about 7.8.",
    },
    {
      q: "You hold $1 million face of 30-year Treasuries with a DV01 of about $1,545. Yields rise 12 basis points in a day. What's your approximate mark-to-market P&L?",
      options: [
        "About +$18,500",
        "About −$1,545",
        "About −$18,500",
        "About −$154,500",
      ],
      answer: 2,
      explain: "**\\(\\text{Loss} \\approx \\mathrm{DV01} \\times \\text{basis points} = 1{,}545 \\times 12 \\approx \\$18{,}540\\).** Yields up, prices down, so it's a loss. DV01s add up, which makes them the everyday language of interest-rate risk at banks and funds.",
    },
    {
      q: "Why does a callable bond show negative convexity?",
      options: [
        "Because its coupon floats",
        "Because when rates fall the issuer can redeem it at a set price, capping the holder's upside, while the holder still takes the full loss when rates rise",
        "Because it has no maturity date",
        "Because it has a lower credit rating",
      ],
      answer: 1,
      explain: "**Capped upside, uncapped downside**, so the price curve bends the wrong way. Mortgage-backed securities behave the same way, because homeowners refinance when rates fall. Stage 18.1 applies the same logic to callable preferreds.",
    },
    {
      q: "A perpetual preferred currently yields 8%. What is its modified duration, roughly?",
      options: [
        "About 8",
        "About 1.08",
        "Infinite, because it never matures",
        "About 12.5",
      ],
      answer: 3,
      explain: "**For a perpetual, \\(\\text{modified duration} \\approx \\dfrac{1}{y} = \\dfrac{1}{8\\%} = 12.5\\).** It never matures, but distant cash flows are heavily discounted, so its duration is finite; the lower the yield, the longer the duration.",
    },
  ],

  further: [
    { label: "Investor.gov (SEC): Duration, glossary entry on measuring interest-rate risk", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/duration" },
    { label: "Options Path (sister course): delta and gamma, the option-world cousins of duration and convexity", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
    { label: "Frederick Macaulay (1938), Some Theoretical Problems Suggested by the Movements of Interest Rates… (NBER; where duration was born)", url: "https://www.nber.org/books/maca38-1" },
    { label: "FRED: 30-Year Treasury Constant Maturity Rate (DGS30)", url: "https://fred.stlouisfed.org/series/DGS30" },
  ],
};
