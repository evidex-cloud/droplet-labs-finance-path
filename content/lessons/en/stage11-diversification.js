export default {
  id: "diversification",
  stage: 11,
  order: 1,
  title: "Diversification & Correlation: The Only Free Lunch",
  difficulty: "systems",
  prereqs: ["equity-risk-premium"],

  oneLiner:
    "Put together two assets that **don't always move together** and the portfolio's risk comes out lower than the average of their risks, while its expected return is simply the average of theirs — **less risk, same return**. That is what Harry Markowitz's 1952 insight is famous for, and why it gets called the only free lunch in finance. This lesson explains what correlation is, how the portfolio-volatility formula works, why about 30 stocks is enough, why adding a small slice of a wildly volatile but low-correlation asset (like Bitcoin) nudges portfolio volatility up only a little, and why the lunch is quietly taken off the menu in a crisis.",

  intuition: `
Imagine you run a little shop by the beach that sells exactly one thing: **umbrellas**. Rainy years, business booms. Sunny years, nobody comes in. Your income is a roller coaster.

The shop next door sells only **ice cream**, and its year is the mirror image of yours: sunny summers sell out, rainy ones lose money. Its income is a roller coaster too.

Now suppose the two of you merge — half umbrellas, half ice cream. Rain or shine, one side of the business is always making money. **The merged shop earns the average of the two shops, but the swings in its income have almost disappeared.** Nobody worked an extra hour. The risk simply went away.

That is **diversification**. In 1952 a 25-year-old graduate student named Harry Markowitz published a 14-page paper, "Portfolio Selection," in the *Journal of Finance*. It was the first time anyone wrote this idea down mathematically, and it later earned him the 1990 Nobel Prize. His key move was a change of question: **don't judge an asset by its own risk; judge it by how much risk it adds to the portfolio you already hold.** And that depends on whether it **moves together** with everything else — on its **correlation**.

Let's put numbers on it. Two stocks, each with an expected return of 8% a year and a volatility (the size of the swings, from Stage 5.4) of 20% a year. You put half your money in each:

- If they move **in perfect lockstep** (correlation = +1), the portfolio's volatility is still 20%. Diversification does nothing.
- If they are **unrelated** (correlation = 0), the portfolio's volatility falls to about **14.1%**.
- If they move **in opposite directions** (correlation = −1 — umbrellas and ice cream), the portfolio's volatility is **zero**.

In all three cases, the expected return is 8%. **Returns average out; risks don't.** The lower the correlation, the more of the risk cancels. That's the entire secret of the free lunch.

This lesson sits on **Idea ④ Risk & leverage**. Risk has a price — and diversification is the one way to reduce risk **without paying that price**. In Stage 5.4 you climbed the risk/return ladder (cash < bonds < stocks < Bitcoin) one asset at a time. Here we start putting those assets **in the same basket**. Next, Stage 11.2 uses these tools to build 60/40 and risk-parity portfolios, Stage 11.3 teaches you to measure a portfolio's risk, and Stage 12.4 looks specifically at how Bitcoin correlates with stocks and with liquidity.

One very new-era question runs through the whole lesson: **Bitcoin's volatility is often three or four times that of stocks — isn't it reckless to put it in a portfolio at all?** The answer may surprise you. What matters is not how bumpy it is on its own, but how correlated it is with what you already own, and how much of it you hold.

**This lesson has five parts:**

- **① Correlation: do two things move together?**
- **② The portfolio-volatility formula: why one plus one is less than two**
- **③ How many holdings: the risk you can remove and the risk you can't**
- **④ Adding a small slice of a volatile, low-correlation asset: the Bitcoin example**
- **⑤ Where the lunch ends: correlations head toward 1 in a crisis**
`,

  mechanics: `
### ① Correlation: do two things move together?

The **correlation coefficient ρ (rho)** measures how in sync two assets' returns are. It runs from −1 to +1:

- **ρ = +1**: perfectly in sync. When A rises 1%, B always rises by a fixed proportion.
- **ρ = 0**: no linear relationship. Knowing A went up today tells you nothing about B.
- **ρ = −1**: perfectly opposite. Whenever A rises, B falls.

Correlation is a standardized version of **covariance**: covariance = correlation × volatility of A × volatility of B. Covariance has awkward units and can't be compared across pairs; correlation is unit-free, so you can line up any two pairs of assets side by side.

Some rough orders of magnitude (long-run, approximate, and they vary a lot by period):

- US large-cap stocks with each other: typically 0.3–0.6, higher within the same industry.
- US stocks vs. US Treasuries: **slightly negative** for most of 2000–2020 (money fled to Treasuries when stocks fell), then **clearly positive** in 2022 (Stage 11.2 is built around that flip).
- Bitcoin vs. US stocks (especially the Nasdaq): very low before 2020, then around 0.3–0.5 in many stretches since — and **highly unstable over time** (Stage 12.4).
- Gold vs. stocks: close to zero over the long run.

Two warnings. First, **correlation is not causation**; it only describes how things have moved together in the past. Second, **correlation itself changes**, and it tends to rise precisely when you most need it to be low (part ⑤). The estimation window — 30 days or 5 years — can give you very different numbers.

### ② The portfolio-volatility formula: why one plus one is less than two

Give asset 1 a weight w and volatility σ₁, asset 2 a weight 1 − w and volatility σ₂, and let their correlation be ρ. The portfolio's return is a simple weighted average, but its variance picks up an extra "cross term":

$$
Portfolio expected return = w × μ₁ + (1 − w) × μ₂
Portfolio variance = w² σ₁² + (1 − w)² σ₂² + 2 w (1 − w) ρ σ₁ σ₂
Portfolio volatility = √(portfolio variance)
$$

The cross term contains ρ. **The smaller ρ, the smaller the cross term — it can even go negative and pull the whole variance down.** Only when ρ = 1 does portfolio volatility equal the weighted average of the two volatilities. For any ρ below 1, portfolio volatility is **strictly less** than that average. That is the free lunch, in one line of algebra.

Back to our two stocks (20% volatility each, half in each), computed with port2Vol from _fin.js:

<table>
<tr><th>Correlation ρ</th><th>+1</th><th>+0.5</th><th>0</th><th>−0.5</th><th>−1</th></tr>
<tr><td>Portfolio volatility</td><td>20.0%</td><td>17.3%</td><td>14.1%</td><td>10.0%</td><td>0%</td></tr>
<tr><td>Portfolio expected return</td><td>8%</td><td>8%</td><td>8%</td><td>8%</td><td>8%</td></tr>
</table>

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="175" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Two 20%-vol assets, 50/50: volatility vs correlation</text><line x1="60" y1="230" x2="290" y2="230" stroke="var(--line)"/><line x1="60" y1="40" x2="60" y2="230" stroke="var(--line)"/><line x1="60" y1="50" x2="290" y2="50" stroke="var(--line)" stroke-dasharray="3 3"/><text x="54" y="54" text-anchor="end" font-size="10" fill="var(--muted)">20%</text><text x="54" y="144" text-anchor="end" font-size="10" fill="var(--muted)">10%</text><text x="54" y="233" text-anchor="end" font-size="10" fill="var(--muted)">0%</text><polyline points="60,230 65.75,201.5 71.5,189.8 88.75,166.4 117.5,140 146.25,119.8 175,102.7 203.75,87.7 232.5,74.1 261.25,61.6 290,50" fill="none" stroke="var(--orange)" stroke-width="2.4"/><circle cx="175" cy="102.7" r="4" fill="var(--orange)"/><text x="182" y="98" font-size="10.5" fill="var(--orange-ink)">ρ=0 → 14.1%</text><text x="60" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">−1</text><text x="175" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">0</text><text x="290" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">+1</text><text x="175" y="264" text-anchor="middle" font-size="11" fill="var(--muted)">Correlation ρ (expected return stays at 8%)</text><text x="490" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Equal-weight N holdings (20% vol each)</text><line x1="370" y1="230" x2="610" y2="230" stroke="var(--line)"/><line x1="370" y1="40" x2="370" y2="230" stroke="var(--line)"/><text x="364" y="54" text-anchor="end" font-size="10" fill="var(--muted)">20%</text><text x="364" y="144" text-anchor="end" font-size="10" fill="var(--muted)">10%</text><text x="364" y="233" text-anchor="end" font-size="10" fill="var(--muted)">0%</text><line x1="370" y1="131.4" x2="610" y2="131.4" stroke="var(--red)" stroke-dasharray="4 3"/><text x="606" y="146" text-anchor="end" font-size="10" fill="var(--red)">Floor at ρ=0.3 ≈ 11% (systematic risk)</text><polyline points="370,50 378.3,84.9 386.6,98.5 403.1,110.6 444.5,120.5 485.9,124 527.2,125.8 610,127.7" fill="none" stroke="var(--orange)" stroke-width="2.4"/><polyline points="370,50 378.3,102.7 386.6,126 403.1,149.5 444.5,173.1 485.9,183.6 527.2,189.8 610,197.2" fill="none" stroke="var(--blue)" stroke-width="2.4"/><text x="560" y="116" font-size="10.5" fill="var(--orange-ink)">ρ = 0.3</text><text x="560" y="214" font-size="10.5" fill="var(--blue)">ρ = 0</text><text x="370" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">1</text><text x="444.5" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">10</text><text x="527.2" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">20</text><text x="610" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">30</text><text x="490" y="264" text-anchor="middle" font-size="11" fill="var(--muted)">Number of holdings N</text></svg><figcaption>Left: the lower the correlation, the less the same two assets swing when combined — with no change in return. Right: a few more holdings cut risk fast, but as long as assets are positively correlated, risk never reaches zero; what remains is the systematic risk of the whole market moving together.</figcaption></figure>

Look at the shape of the left-hand curve. Coming down from ρ = +1, volatility falls only modestly at first; it drops steeply only near −1. In the real world, asset pairs with a stable, strongly negative correlation are rare, so **most of the lunch you can actually eat comes from low correlation, not negative correlation.**

### ③ How many holdings: the risk you can remove and the risk you can't

Now generalize from two assets to N. Suppose every asset has volatility σ, every pair has correlation ρ, and you hold them in equal weights. The portfolio variance simplifies beautifully:

$$
Portfolio variance = σ² × [ ρ + (1 − ρ) / N ]
As N → ∞: portfolio volatility → σ × √ρ
$$

The two terms inside the brackets mean completely different things:

- **The (1 − ρ)/N term shrinks away as N grows.** This is each stock's own **idiosyncratic risk** — a bad earnings surprise, a CEO walking out. Hold enough names and it averages out.
- **The ρ term never goes away.** This is **systematic risk**, the part where all stocks move together — a recession, a spike in interest rates. **No amount of diversification removes it.**

With σ = 20% and ρ = 0.3: one stock gives 20%, two give 16.1%, ten give 12.2%, thirty give 11.4%, and infinitely many give 11.0%. **Going from 1 to 10 holdings removes nearly 80% of the risk that can be removed; going from 30 to 3,000 barely changes anything.** That's why textbooks say twenty or thirty well-spread stocks is plenty, and why an index fund (Stage 5.6) can wipe out idiosyncratic risk for almost nothing.

This split explains something deeper: **markets only pay you for the risk you can't diversify away.** Idiosyncratic risk can be eliminated for free, so nobody will pay you extra return for holding a single stock. William Sharpe's Capital Asset Pricing Model (CAPM, 1964) formalizes this: an asset's expected excess return depends only on its **beta (β)** — how much it moves with the market as a whole. The "risk premium" of Stage 2.4 is, strictly speaking, a premium for **systematic** risk.

### ④ Adding a small slice of a volatile, low-correlation asset: the Bitcoin example

Here's an example we'll keep reusing in this stage. Start with a classic **60/40 portfolio**: 60% stocks (assume 8% expected return, 16% volatility) and 40% bonds (5% expected return, 7% volatility), with a stock–bond correlation of 0.2. That works out to a portfolio volatility of about **10.5%**. (These are teaching assumptions, not forecasts.)

Now carve out a small slice to buy Bitcoin, assuming 60% volatility and a 0.3 correlation with the rest of the portfolio:

<table>
<tr><th>Bitcoin weight</th><th>0%</th><th>1%</th><th>3%</th><th>5%</th></tr>
<tr><td>Portfolio volatility</td><td>10.5%</td><td>10.6%</td><td>10.9%</td><td>11.3%</td></tr>
<tr><td>Bitcoin's share of portfolio risk</td><td>0%</td><td>~2%</td><td>~7%</td><td>~14%</td></tr>
</table>

Read the two rows together and two facts jump out, both true at once:

- **Volatility barely moves.** A 5% Bitcoin slice lifts portfolio volatility from 10.5% to 11.3% — less than one percentage point. That's low correlation at work: much of Bitcoin's violent bouncing is absorbed by assets that don't move in step with it.
- **But its risk contribution is far larger than its weight.** A 5% position accounts for about 14% of the portfolio's risk. **Weight is how much money you put in; risk contribution is how much you are actually betting.** The risk-parity approach in Stage 11.2 is built around risk contributions rather than dollar weights.

Two caveats you can't skip. First, all of this is about the **risk** side only. Whether Bitcoin improves a portfolio's risk-adjusted return depends entirely on what you assume about its future return, which is deeply uncertain (Stages 12.3 and 12.4). **This lesson covers mechanics and analytical frameworks only; it is not investment advice.** Second, **a small position plus regular rebalancing** is what makes this kind of allocation behave. After a big Bitcoin rally, its weight grows on its own and its risk contribution grows even faster; trimming back to target is what keeps a small slice small.

The same logic applies to other new assets. A tokenized Treasury fund (Stage 14.2) is almost perfectly correlated with ordinary T-bills, so adding it **adds no diversification** — it only changes the plumbing. A digital asset treasury company's common stock is highly correlated with Bitcoin *and* levered to it (Stage 16.4), so **owning a DAT on top of Bitcoin isn't diversifying; it's doubling down on the same risk factor.**

### ⑤ Where the lunch ends: correlations head toward 1 in a crisis

The free lunch comes with fine print: **it's cooked with normal-times correlations.** In a real crisis, correlations tend to jump together:

- **In a liquidity crisis, people sell what they *can* sell, not what they *want* to sell.** In March 2020, US stocks, corporate bonds, gold, Bitcoin and even long-term Treasuries all fell within the same few days as everyone scrambled for cash (Stage 10.3).
- **When leveraged players are forced to deleverage**, they dump everything they hold at once, chaining unrelated assets together on the way down (the liquidation cascades of Stage 7.5).
- **In 2022**, what drove stocks down was inflation and rate hikes — and rate hikes hit bonds too. The stock–bond correlation flipped from negative to positive and both legs of the 60/40 portfolio got hurt at the same time (Stage 11.2).

So the right mental model is: **diversification lowers everyday volatility; it does not guarantee protection in the tails.** For tail events you need other tools: enough cash, limited leverage, positions small enough that one drawdown can't knock you out of the game (Stage 11.4), and stress tests that go beyond everyday volatility (maximum drawdown and expected shortfall in Stage 11.3).

There's a subtler trap too: **fake diversification** — owning many things with different names and the same driver. Ten tech stocks, three crypto tokens, a spot Bitcoin ETF plus a DAT's common stock plus a miner's shares: a dozen line items that may really be two or three risk factors. **The unit of diversification is independent sources of risk, not the number of tickers.** The DAT checklist in Stage 18.6 ends on the macro regime for the same reason: many apparently different holdings ultimately ride on the same macro factor.
`,

  demo: "diversification",

  analogy: `
Think of a portfolio as a **choir**. Each asset is a singer, and volatility is how far off-key each one drifts.

If every singer drifts off-key in exactly the same way (correlation = +1), it doesn't matter how many you add: the choir is off-key in perfect unison, and it sounds no better than a single singer who's out of tune.

If each singer drifts **in their own random way** (correlation = 0), some go sharp and some go flat, and together they cancel out. The whole choir sounds far more in tune than any one voice. The more singers, the less you can hear anyone's individual wobble — that's idiosyncratic risk averaging away.

But if the **piano accompaniment itself is out of tune** (systematic risk), every singer follows it. Adding more singers won't help, because they're all listening to the same piano.

What happens when you add a **soprano with a huge voice** and a style unlike anyone else's (Bitcoin)? Put her near the back (a small weight) and the choir absorbs much of her vibrato; the performance just gets a bit more colorful. Put her at the front and the concert turns into her solo.

And when someone yells "fire!" in the concert hall, **every singer stops and runs for the exit at the same time**. At that point it no longer matters whose style was different. Diversification manages the everyday performance; it doesn't manage the fire alarm.
`,

  misconceptions: [
    "**\"The more holdings, the more diversified.\"** — Diversification counts **independent sources of risk**, not tickers. Ten tech stocks, or a Bitcoin ETF plus a DAT's common stock plus a miner, look like many positions but load on one or two risk factors. Thirty stocks across different industries beat three hundred on the same theme.",
    "**\"A highly volatile asset always makes the portfolio more dangerous.\"** — It depends on correlation and weight. A 5% slice of 60%-vol Bitcoin (correlation 0.3) moves a 60/40 portfolio's volatility only from about 10.5% to about 11.3%. But its share of total risk (about 14%) is far above its weight — and that part you have to see clearly.",
    "**\"Only negatively correlated assets diversify.\"** — Any correlation below 1 pushes portfolio volatility below the weighted average. Stable negative correlations are rare; most real-world diversification comes from **low** correlation. Two 20%-vol assets with zero correlation, held 50/50, give just 14.1% volatility.",
    "**\"If correlation was low historically, it will stay low.\"** — Correlations shift with the economic regime and tend to rise toward 1 in crises. The stock–bond correlation turned positive in 2022; in March 2020 almost everything fell together. Diversification is good for everyday volatility, not a substitute for tail insurance.",
    "**\"Diversification drags down returns, which is why the pros concentrate.\"** — Diversification removes idiosyncratic risk that the market **doesn't pay for**; the expected return is still the weighted average. Concentration adds risk without adding a risk premium, and only pays if you genuinely have an informational edge — which most people overestimate (Stage 11.5).",
  ],

  quiz: [
    {
      q: "Two assets each have an 8% expected return and 20% volatility. You hold half of each. With a correlation of 0, what are the portfolio's expected return and volatility?",
      options: [
        "8% and 20%",
        "4% and 14.1%",
        "8% and 10%",
        "8% and 14.1%",
      ],
      answer: 3,
      explain: "**Return is the weighted average**, still 8%. Volatility = √(0.5²×0.2² + 0.5²×0.2²) = √0.02 ≈ 14.1%. Nearly 30% less risk and not a cent less return — that's the free lunch.",
    },
    {
      q: "You hold many stocks in equal weights, each with 20% volatility and a pairwise correlation of 0.3. As the number of holdings goes to infinity, portfolio volatility approaches…",
      options: [
        "about 11%, because systematic risk can't be diversified away",
        "zero, because all risk is diversified away",
        "20%, because diversification doesn't help",
        "6%, i.e. 20% × 0.3",
      ],
      answer: 0,
      explain: "The limit is σ × √ρ = 20% × √0.3 ≈ 11.0%. **The (1 − ρ)/N idiosyncratic term vanishes; the ρ systematic term stays forever.**",
    },
    {
      q: "You add 5% Bitcoin (60% volatility, 0.3 correlation) to a 60/40 portfolio with about 10.5% volatility. Which statement is most accurate?",
      options: [
        "Portfolio volatility rises by 5% of 60%, i.e. by more than 3 percentage points",
        "Portfolio volatility only rises to about 11.3%, but Bitcoin contributes about 14% of portfolio risk",
        "Bitcoin is so volatile that portfolio volatility must double",
        "Portfolio volatility falls, because Bitcoin is negatively correlated with stocks",
      ],
      answer: 1,
      explain: "Low correlation keeps the volatility increase small, but **risk contribution (~14%) is far larger than the dollar weight (5%)**. Size positions by the risk they carry, not just by the money in them.",
    },
    {
      q: "Why do people say diversification \"fails\" in a crisis?",
      options: [
        "In a crisis every asset's volatility drops to zero",
        "Regulators ban diversification during crises",
        "Liquidity scrambles and forced deleveraging make normally low-correlation assets fall together, pushing correlations toward 1",
        "In a crisis only Bitcoin goes up",
      ],
      answer: 2,
      explain: "People sell whatever they can for cash, and levered players unwind everything at once, so correlations spike. March 2020 and 2022 are both examples. **Diversification lowers everyday volatility; it isn't tail insurance.**",
    },
    {
      q: "CAPM says markets pay a risk premium only for systematic risk. What's the main reason?",
      options: [
        "Systematic risk is smaller than idiosyncratic risk",
        "Idiosyncratic risk can be removed for free by diversifying, so nobody will pay you to bear it",
        "Idiosyncratic risk can't be measured",
        "Regulations only allow a premium on systematic risk",
      ],
      answer: 1,
      explain: "Because idiosyncratic risk can be diversified away for free, bearing it earns no compensation. Only the risk that can't be diversified — the part that moves with the market (β) — has a price.",
    },
  ],

  further: [
    { label: "Harry Markowitz (1952), Portfolio Selection, Journal of Finance (JSTOR)", url: "https://www.jstor.org/stable/2975974" },
    { label: "Nobel Prize in Economic Sciences 1990: Markowitz, Miller, Sharpe (press release)", url: "https://www.nobelprize.org/prizes/economic-sciences/1990/press-release/" },
    { label: "William Sharpe (1964), Capital Asset Prices — the original CAPM paper (JSTOR)", url: "https://www.jstor.org/stable/2977928" },
    { label: "Investopedia: diversification and correlation, a primer", url: "https://www.investopedia.com/terms/d/diversification.asp" },
  ],
};
