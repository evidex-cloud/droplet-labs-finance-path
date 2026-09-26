export default {
  id: "equity-risk-premium",
  stage: 5,
  order: 4,
  title: "The Equity Risk Premium & Long-Run Returns: Why Stocks (Usually) Win",
  difficulty: "core",
  prereqs: ["risk-free-rate", "valuation"],

  oneLiner:
    "Over the past century, U.S. stocks have returned roughly 10% a year, long Treasuries roughly 5%, and Treasury bills roughly 3%. The extra few points are the **equity risk premium**. It is not a gift; it is what the market pays you to endure — 15–20% swings a year, drawdowns that halve your money or take 80% of it, and stretches of ten years or more going nowhere. This lesson does the accounting and lays out a **risk–return ladder: cash < bonds < stocks < bitcoin.**",

  intuition: `
If stocks clearly beat bonds over the long run, why doesn't everyone just own stocks? The answer is hiding in the words “long run.”

Start with the ledger. Roughly speaking, since 1926 U.S. large-company stocks (with dividends reinvested) have returned about 10% a year, long-term Treasury bonds about 5%, short-term Treasury bills about 3%, with inflation around 3%. The gaps look modest, but compounding blows them up to staggering proportions (Stage 2.2): at 10% for 30 years, $1 becomes about \\(\\$1 \\times 1.10^{30} \\approx \\$17.40\\); at 5%, only about \\(\\$1 \\times 1.05^{30} \\approx \\$4.30\\). **Over the same thirty years, stocks end up with four times what bonds do.**

That “extra” return has a formal name: the **equity risk premium (ERP)** — the expected return on stocks minus the risk-free rate. Stage 2.4 said \\(\\text{required return} = \\text{risk-free rate} + \\text{risk premium}\\), and Stage 5.3 said \\(\\text{discount rate}\\ r = \\text{risk-free rate} + \\text{equity risk premium}\\); this lesson takes that second term apart. It sits on **Idea ④ — risk & leverage: risk has a price**, and the equity risk premium is the price of stock-market risk.

So what does it cost you? Here are a few episodes you should know by heart:

- From 1929 to 1932 the U.S. stock market lost about 86%, and it took more than two decades to regain its old high.
- When the dot-com bubble burst in 2000–2002, the S&P 500 fell about 49%; over the whole of the 2000s, U.S. stocks' total return was close to zero — “the lost decade.”
- In the 2007–2009 financial crisis, the S&P 500 fell about 57%.
- In February–March 2020 it lost about 34% in little more than a month.
- Japan's Nikkei index peaked at the end of 1989 and **did not get back above that level until February 2024** — thirty-four years.

So “stocks win in the long run” needs three qualifications: **in most countries, over most sufficiently long periods, for people who can hold on.** The equity risk premium exists precisely because those periods are genuinely hard to sit through. If everyone could ride them out easily, the premium would long since have been competed away.

With that framework you can lay out a **risk–return ladder**: cash (almost no volatility, lowest return) < bonds (interest-rate risk — even the 30-year Treasury from Stage 4.5 fell hard in 2020–2023) < stocks (high volatility, higher long-run return) < bitcoin (volatility and drawdowns an order of magnitude beyond stocks, historically enormous returns but a far shorter record; Stage 12.4 covers it in depth). Each rung up, you trade more volatility for a higher expected return. **Which rung is right depends on how deep a drawdown you can stomach and how long you can wait** — the questions answered by the risk metrics of Stage 11.3 and the position sizing of Stage 11.4.

**In this lesson we break it into five parts:**

- **① Long-run returns: a hundred-year ledger**
- **② The equity risk premium: the extra you earn for bearing risk**
- **③ The cost: volatility, drawdowns and “lost decades”**
- **④ The risk–return ladder: cash < bonds < stocks < bitcoin**
- **⑤ Why “usually”: time, survivorship and volatility drag**
`,

  mechanics: `
### ① Long-run returns: a hundred-year ledger

The three most-quoted kinds of long-run return data (all figures are rough orders of magnitude; they vary with start and end dates and methodology):

<table>
<tr><th>Asset (U.S.)</th><th>Long-run nominal annual return</th><th>After inflation</th><th>Annual volatility (approx.)</th></tr>
<tr><td>Treasury bills</td><td>about 3%</td><td>about 0–0.5%</td><td>about 1% (very low)</td></tr>
<tr><td>Long-term Treasuries</td><td>about 5%</td><td>about 2%</td><td>about 8–10%</td></tr>
<tr><td>Large-company stocks (with dividends)</td><td>about 10%</td><td>about 6.5–7%</td><td>about 15–20%</td></tr>
</table>

A few sources worth knowing. Jeremy Siegel's *Stocks for the Long Run* (first edition 1994) traces U.S. real stock returns back to 1802 and finds a long-run real return of roughly 6.5–7% a year. Dimson, Marsh and Staunton's *Triumph of the Optimists* (2002) and its annual updates cover more than twenty countries since 1900 and conclude that **global stocks have earned less in real terms than U.S. stocks** (the U.S. was one of the century's most successful markets). NYU's Aswath Damodaran publishes annual returns on U.S. stocks, bonds and bills since 1928.

**The magnifying power of compounding** is the part of these numbers most worth remembering. With the Rule of 72 from Stage 2.2: 10% doubles money in about \\(\\dfrac{72}{10} = 7.2\\) years; 5% in about \\(\\dfrac{72}{5} = 14.4\\) years. After thirty years, stocks have doubled more than four times, bonds only about twice. That is why long-horizon savers — pension funds, endowments — are willing to hold most of their assets in stocks.

### ② The equity risk premium: the extra you earn for bearing risk

There are two completely different ways to measure the equity risk premium, and you must keep them apart:

- **Historical ERP (looking back):** the stock returns actually realized, minus the returns on Treasuries or bills. For the U.S. over nearly a century, that is about 6% over bills and about 4–5% over long bonds; global numbers are somewhat lower. The trouble is that it depends on the start and end dates — measured from 2000 to 2009, it was negative.
- **Implied ERP (looking forward):** back out the return the market “expects” from today's prices, then subtract today's risk-free rate. The simplest version is Stage 5.3's \\(r = \\dfrac{E}{P} + g\\): if the S&P 500's earnings yield is 4.5% and long-run growth is 4%, the expected return is about \\(4.5\\% + 4\\% = 8.5\\%\\); subtract a 4.5% Treasury yield and the implied ERP is about \\(8.5\\% - 4.5\\% = 4\\%\\). Damodaran's monthly estimate of the U.S. implied ERP has mostly sat in a 4–6% range in recent years.

$$
\\text{Implied expected return} \\approx \\text{earnings yield}\\ \\frac{E}{P} + \\text{long-run growth}\\ g
\\text{Implied}\\ \\mathrm{ERP} \\approx \\text{implied expected return} - \\text{long-term Treasury yield}
$$

This formula ties straight back to the Stage 4.5 story: **when the 30-year Treasury yield climbs to around 5% and stocks' implied expected return does not climb with it, the equity risk premium gets squeezed** — stocks become “expensive” relative to bonds. That is the second reason rising long yields make stock markets nervous (the first being the discount-rate effect from Stage 5.3).

Why should the premium exist at all, and why is it so large? In 1985 Rajnish Mehra and Edward Prescott published “The Equity Premium: A Puzzle”: under standard economic models, explaining a historical premium of around 6% requires investors to be implausibly averse to risk. Forty years of proposed explanations include disaster risk (rare but devastating crashes), loss aversion (Stage 11.5), the fact that stocks do worst exactly when the economy does worst (losses hurt most in bad times), and survivorship bias (we mostly study the market that won). **There is no settled answer, but every explanation points the same way: stock-market risk is concentrated in the moments you can least afford it.**

### ③ The cost: volatility, drawdowns and “lost decades”

What does 15–20% annual volatility (standard deviation) mean in practice? Roughly, **about one year in three the return lands more than one standard deviation from the average** — with a 10% average, a year of −8% or +28% is entirely normal. A two-standard-deviation year (−26% or worse) turns up every twenty or thirty years, and real-world tails are fatter than the bell curve suggests.

More vivid still is the **maximum drawdown**: the fall from the highest peak to the lowest trough.

<table>
<tr><th>Episode</th><th>U.S. large-cap drawdown (approx.)</th><th>Time to regain the old high (price index, approx.)</th></tr>
<tr><td>1929–1932 Great Depression</td><td>−86%</td><td>more than two decades</td></tr>
<tr><td>1973–1974 stagflation</td><td>−48%</td><td>several years (longer after inflation)</td></tr>
<tr><td>2000–2002 dot-com bust</td><td>−49%</td><td>about 7 years — then straight into 2008</td></tr>
<tr><td>2007–2009 financial crisis</td><td>−57%</td><td>about 5.5 years (from the 2007 peak)</td></tr>
<tr><td>2020 Covid shock</td><td>−34%</td><td>about 5 months</td></tr>
<tr><td>2022 rate hikes</td><td>−25%</td><td>about 2 years</td></tr>
</table>

Note that drawdown arithmetic is **asymmetric**: after a 50% fall you need a \\(\\dfrac{1}{0.5} - 1 = 100\\%\\) gain to get back to even; after an 80% fall you need \\(\\dfrac{1}{0.2} - 1 = 400\\%\\). That is why Stage 11.3 puts maximum drawdown alongside the Sharpe ratio as a core risk measure.

One more cost is easy to overlook: **time.** Someone who bought U.S. stocks at the start of 2000 had roughly nothing to show for it in total return ten years later; someone who bought Japanese stocks at the end of 1989 waited thirty-four years for the price index to recover. **“The long run” can be too long for a single human life.**

### ④ The risk–return ladder: cash < bonds < stocks < bitcoin

Plot the asset classes by volatility and long-run return and you get a ladder climbing roughly up and to the right:

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The risk–return ladder (illustrative, long-run magnitudes; bitcoin's short record can't be extrapolated)</text><line x1="90" y1="230" x2="610" y2="230" stroke="var(--line)" stroke-width="1.5"/><line x1="90" y1="40" x2="90" y2="230" stroke="var(--line)" stroke-width="1.5"/><text x="350" y="262" text-anchor="middle" font-size="11" fill="var(--muted)">Annual volatility →</text><text x="30" y="135" text-anchor="middle" font-size="11" fill="var(--muted)" transform="rotate(-90 30 135)">Long-run annual return →</text><text x="90" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">0%</text><text x="217.5" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">20%</text><text x="345" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">40%</text><text x="472.5" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">60%</text><text x="600" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">80%</text><text x="84" y="194" text-anchor="end" font-size="10" fill="var(--muted)">3%</text><text x="84" y="170" text-anchor="end" font-size="10" fill="var(--muted)">5%</text><text x="84" y="114" text-anchor="end" font-size="10" fill="var(--muted)">10%</text><polyline points="96.4,190.4 141,164 198.4,110" fill="none" stroke="var(--orange)" stroke-width="2"/><line x1="198.4" y1="110" x2="536" y2="62" stroke="var(--btc)" stroke-width="2" stroke-dasharray="6 5"/><circle cx="96.4" cy="190.4" r="7" fill="var(--blue)"/><text x="108" y="206" font-size="11" fill="var(--ink)" font-weight="600">Cash / T-bills</text><text x="108" y="220" font-size="10" fill="var(--muted)">almost no nominal drawdown</text><circle cx="141" cy="164" r="8" fill="var(--green)"/><text x="152" y="160" font-size="11" fill="var(--ink)" font-weight="600">Long Treasuries</text><text x="152" y="174" font-size="10" fill="var(--muted)">long bonds fell ~half in 2020–23</text><circle cx="198.4" cy="110" r="10" fill="var(--orange)"/><text x="212" y="100" font-size="11" fill="var(--ink)" font-weight="600">Stocks</text><text x="212" y="114" font-size="10" fill="var(--muted)">drawdowns −50% to −86%</text><circle cx="536" cy="62" r="12" fill="var(--btc)" opacity=".85"/><text x="530" y="44" text-anchor="end" font-size="11" fill="var(--ink)" font-weight="600">Bitcoin (since the 2010s)</text><text x="522" y="92" text-anchor="end" font-size="10" fill="var(--muted)">repeated drawdowns of −75% to −85%</text><text x="522" y="106" text-anchor="end" font-size="10" fill="var(--muted)">huge past returns, but only ~15 years of data</text></svg><figcaption>Each rung up and to the right trades more volatility and deeper drawdowns for a higher expected return. The first three rungs have nearly a century of data; bitcoin's position only describes its short history, and the dashed line means “do not extrapolate.”</figcaption></figure>

Each rung also falls in its own way. Cash hardly ever drops (though inflation erodes it slowly, Stage 1.4). Long Treasuries are usually calm but can crash when rates surge — a 30-year Treasury fund was cut roughly in half between 2020 and 2023, which is duration from Stage 4.4 doing its work. Big stock-market declines usually come with recessions. Bitcoin went through drawdowns on the order of 75–85% in 2011, 2014–2015, 2018 and 2022 (Stage 12.4).

A common “return per unit of risk” measure is the **Sharpe ratio** \\(= \\dfrac{\\text{expected return} - \\text{risk-free rate}}{\\text{volatility}}\\). For stocks: \\(\\dfrac{10\\% - 3\\%}{17\\%} \\approx 0.4\\). It gets a proper introduction in Stage 11.3. The ladder does not say “higher is better”; it says **every rung has its price.**

### ⑤ Why “usually”: time, survivorship and volatility drag

Finally, let us unpack the “usually” in “stocks usually win”:

- **Time raises the odds, but not to 100%.** In any single year, U.S. stocks have beaten T-bills only about two-thirds of the time; over 20-year windows they have won the great majority of the time historically — but “the great majority” is not “always,” and Japan is the counterexample.
- **Survivorship bias.** We study the United States because the United States won. An investor in 1900 might just as easily have bet heavily on Russia or Argentina — and Russia's stock market went to zero after 1917. Global data, with its lower premium, is the more honest benchmark.
- **Volatility drag.** What you actually earn is the **geometric** (compound) return, not the arithmetic average. The two differ by roughly half the variance:

$$
\\text{Geometric return} \\approx \\text{arithmetic return} - \\frac{\\text{volatility}^{2}}{2}
\\text{Geometric return}_{\\text{stocks}} \\approx 12\\% - \\frac{0.18^{2}}{2} \\approx 12\\% - 1.6\\% \\approx 10.4\\%
\\text{Geometric return}_{\\text{high-vol asset}} \\approx 40\\% - \\frac{0.70^{2}}{2} = 40\\% - 24.5\\% \\approx 15.5\\%
$$

Here stocks have a 12% arithmetic return and 18% volatility; the high-vol asset has a 40% arithmetic return and 70% volatility. The more volatile the asset, the heavier the drag. An asset that rises 50% and then falls 50% has an arithmetic average of zero but has actually lost 25% (\\(1.5 \\times 0.5 = 0.75\\)). This formula returns again and again — in Stage 11.4 (position sizing and Kelly) and Stage 16.4 (the amplification and path dependence of DAT common stock): **put leverage on a volatile asset, and the drag grows with the square.**

A new-era note: Stage 15.5 compares holding bitcoin directly, a bitcoin ETF, DAT common stock and DAT preferred stock — in effect, new rungs cut into this ladder. DAT preferreds try to offer bond-like income and volatility; DAT common offers a rung “steeper than bitcoin itself.” Understanding the price of each rung is the first step in evaluating those instruments. This lesson covers mechanics and history only; it is not investment advice.
`,

  demo: "equity-risk-premium",

  analogy: `
The equity risk premium is like **hazard pay for working at height.**

In the same company, the office clerk (T-bills) earns a steady but modest salary; the driver on the ground (bonds) occasionally hits traffic or an accident and earns a bit more; the technician who climbs a tower dozens of meters high to do repairs (stocks) is paid noticeably more — **not because they are smarter, but because few people are willing to hang in the air on a windy day.** If nobody were afraid of heights, that premium would disappear fast.

And the hazard pay is paid out in an odd way. It is settled annually, but not guaranteed every year. In calm years the technician earns a fortune; in stormy years there is no bonus at all, and a large deduction besides (a drawdown). **Only those who stay on the tower long enough — and do not let go in a storm — collect the average premium.**

Bitcoin is a newer tower, taller and windier, built only fifteen-odd years ago. The people who have climbed it so far have collected enormous hazard pay, but nobody knows yet whether the pattern of its storms has been fully seen.
`,

  misconceptions: [
    "**“Stocks always beat bonds in the long run.”** — That has been true for most 20-year windows in the U.S. over the past century, but not all of them; Japan's stock price index took thirty-four years to regain its 1989 peak, and U.S. stocks' total return in the 2000s was close to zero. “The long run” may be longer than your investment horizon.",
    "**“The historical equity risk premium was about 6%, so it will be 6% in future.”** — Historical ERP depends on the start and end dates, and the U.S. is a survivor. More useful is the implied ERP derived from today's valuations: \\(\\text{earnings yield} + \\text{growth} - \\text{Treasury yield}\\). When long yields rise and stock prices don't fall, the future premium gets thinner.",
    "**“An average return of 10% a year means my money will be \\(1.1^{10} \\approx 2.59\\) times larger in ten years.”** — You earn the geometric return, and high volatility creates “volatility drag”; the range around the average is also very wide, so ten-year outcomes can differ several-fold.",
    "**“High volatility means a bad asset.”** — Volatility is the price tag on risk, not a verdict. A high-volatility asset with a high enough expected return and low correlation with everything else can improve a portfolio in small doses (Stage 11.1). What matters is position size and whether you can survive the drawdowns.",
    "**“Bitcoin has had the best returns of the last fifteen years, so of course it sits at the top of the ladder.”** — Bitcoin's record is very short, its drawdowns very deep, and its structural risks different from stocks' (Stage 12.6). Its position on the chart only describes history; it cannot be extrapolated the way a century of stock data can.",
  ],

  quiz: [
    {
      q: "Compounded for 30 years at 10% and at 5% respectively, roughly what does $1 become?",
      options: [
        "$4 and $2.50",
        "$30 and $15",
        "$17.40 and $4.30",
        "$10 and $5",
      ],
      answer: 2,
      explain: "\\(1.1^{30} \\approx 17.4\\) and \\(1.05^{30} \\approx 4.3\\). The return is only twice as high, but the ending wealth is four times larger — **compounding turns the equity risk premium into a huge wealth gap.**",
    },
    {
      q: "The S&P 500's earnings yield (E/P) is 4.5%, expected long-run growth is 4%, and the 30-year Treasury yields 5%. What is the rough implied equity risk premium?",
      options: [
        "8.5%",
        "3.5%",
        "4.5%",
        "−0.5%",
      ],
      answer: 1,
      explain: "\\(\\text{Implied expected return} \\approx 4.5\\% + 4\\% = 8.5\\%\\); minus the 5% long-bond yield, the \\(\\text{implied}\\ \\mathrm{ERP} \\approx 8.5\\% - 5\\% =\\) **3.5%**. If long yields rise while stock prices hold steady, stocks lose appeal relative to bonds.",
    },
    {
      q: "An asset rises 50% and then falls 50%; its two-year arithmetic average return is zero. What is the actual outcome?",
      options: [
        "Breakeven",
        "A 25% gain",
        "It depends on whether the rise or the fall comes first",
        "A 25% loss",
      ],
      answer: 3,
      explain: "\\(1 \\times 1.5 \\times 0.5 = 0.75\\), a **25% loss** — and falling first then rising gives the same result. This is volatility drag: \\(\\text{geometric return} \\approx \\text{arithmetic return} - \\dfrac{\\text{volatility}^{2}}{2}\\), and the higher the volatility, the heavier the drag.",
    },
    {
      q: "Which statement best describes the “equity premium puzzle” (Mehra and Prescott, 1985)?",
      options: [
        "Under standard economic models, explaining stocks' historically high excess return requires implausibly high risk aversion",
        "Stocks' excess returns come entirely from accounting fraud",
        "The equity risk premium disappeared after 1985",
        "It proves that stocks carry no risk",
      ],
      answer: 0,
      explain: "It is one of finance's famous puzzles. Disaster risk, loss aversion, stocks doing worst in the worst times and survivorship bias have all been offered as explanations — the common thread being that **stock-market risk is concentrated in the moments you can least afford it.**",
    },
    {
      q: "After an 80% fall, how much must an asset rise to get back to where it started?",
      options: [
        "80%",
        "400%",
        "160%",
        "100%",
      ],
      answer: 1,
      explain: "0.2 is left; getting back to 1 takes \\(\\dfrac{1}{0.2} = 5\\) times as much, a **400%** gain. Drawdown arithmetic is asymmetric — which is why bitcoin's repeated −80% drawdowns and stocks' −86% in 1929–32 each took years to repair.",
    },
  ],

  further: [
    { label: "Damodaran: historical returns on U.S. stocks, bonds and bills (1928 to date, year by year)", url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histret.html" },
    { label: "Damodaran: implied equity risk premium for the U.S. market (updated monthly)", url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/implpr.html" },
    { label: "Mehra & Prescott (1985), The Equity Premium: A Puzzle, Journal of Monetary Economics", url: "https://doi.org/10.1016/0304-3932(85)90061-3" },
    { label: "Robert Shiller's online data — U.S. stock prices, dividends, earnings and rates since 1871", url: "http://www.econ.yale.edu/~shiller/data.htm" },
  ],
};
