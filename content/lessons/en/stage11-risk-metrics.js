export default {
  id: "risk-metrics",
  stage: 11,
  order: 3,
  title: "Measuring Risk: Volatility, Drawdown, Sharpe & VaR",
  difficulty: "systems",
  prereqs: ["diversification", "equity-risk-premium"],

  oneLiner:
    "\"How risky is this investment?\" sounds like one question but is really several: **how much does it swing day to day** (volatility), **how far does it fall from a peak at its worst, and how long does it take to come back** (maximum drawdown), **how much excess return do you get per unit of risk** (Sharpe, Sortino), and **how much could you lose on a bad day** (VaR and expected shortfall). This lesson takes each metric apart, runs the same numbers through all of them, and shows **what each one sees and what it hides** — then uses them to sketch a risk profile of Bitcoin's 70–90% drawdowns and of a DAT's leverage.",

  intuition: `
Suppose you're choosing a driver to get you to the airport, and someone hands you four facts:

- Driver A has a high **average speed** but lurches between fast and slow with constant hard braking (high **volatility**).
- Driver B is usually smooth, but **had one serious crash last year** and the car spent six months in the shop (a deep **maximum drawdown** with a long recovery).
- Driver C gets the most time saved **for each extra unit of risk taken** — the best "value for risk" (the **Sharpe ratio**).
- Driver D tells you: "**On 95% of trips**, I'm at most 10 minutes late." (**VaR**) What happens on the other 5%, D doesn't say.

You quickly realize that **no single number answers "is this driver safe?"** Each fact lights up one side of the risk and leaves another side in the dark. Measuring investment risk works the same way.

Start with the most visceral one: drawdowns. An asset falls from 100 to 50 — a 50% loss. To get from 50 back to 100 it has to rise **100%**. A fall of 80% needs a **400%** gain to break even; a fall of 90% needs **900%**. **Losses and recoveries are asymmetric, and the deeper the loss, the worse the asymmetry.** Bitcoin has been through several drawdowns in the 75–90% range, and the Nasdaq lost nearly 80% in 2000–2002. If you're fully invested at the top — and levered — a drawdown like that can knock you out of the game before any recovery arrives.

Now volatility. Stocks typically have annualized volatility of 15–20%. Bitcoin's long-run annualized volatility ran around 60–80% in many periods and has more recently come down to roughly the 40–60% range (Stage 12.4 looks at how it has evolved). But volatility only measures the "average swing." It treats ups and downs the same, and it says nothing about how deep the **tails** go. That's why you also need Sharpe, Sortino, VaR and expected shortfall — each one supplies another piece of the puzzle.

This lesson sits on **Idea ④ Risk & leverage**. In Stage 5.4 you first met volatility and drawdowns and lined assets up on a risk ladder; in Stages 11.1 and 11.2 you learned to look at risk inside a portfolio. This lesson gives risk a **dashboard**, and you'll use it again and again: Stage 11.4 turns volatility into "how much should I bet," Stage 16.4 shows how leverage deepens a DAT's common-stock drawdowns, and when Stage 18.2 stress-tests a DAT, maximum drawdowns and tail scenarios are the starting point.

**This lesson has five parts:**

- **① Volatility: standard deviation, annualizing, and the square-root rule**
- **② Maximum drawdown: how deep, and how long to come back**
- **③ Sharpe, Sortino and Calmar: return per unit of risk**
- **④ VaR and expected shortfall: how much can a bad day cost?**
- **⑤ A risk profile of Bitcoin and DATs: what the metrics catch and miss**
`,

  mechanics: `
### ① Volatility: standard deviation, annualizing, and the square-root rule

**Volatility** is simply the **standard deviation** of returns. Take the average daily (or monthly) return, measure how far each day lands from that average, square those gaps, average them, and take the square root. It answers: "**How far does a typical day or year stray from average?**"

To turn daily volatility into annual volatility, use the **square-root-of-time rule**:

$$
\\text{Annualized volatility} \\approx \\text{daily volatility} \\times \\sqrt{252}
$$

There are about 252 trading days a year. Example: 1% daily → \\(1\\% \\times 15.87 \\approx 15.9\\%\\) a year. Bitcoin trades 24/7, so \\(\\sqrt{365}\\) is common: 3% daily → \\(3\\% \\times \\sqrt{365} \\approx 57\\%\\) a year.

Why a square root? If each day's return is independent of the others, variances add up linearly over time, so the standard deviation grows with the square root of the number of days. The rule relies on two assumptions: **no autocorrelation** (today's move doesn't predict tomorrow's) and **stable volatility**. Reality breaks both regularly: in a crisis, volatility can double or triple and moves cluster together (volatility clustering).

For a sense of scale: a stock with 16% annualized volatility, under a normal-distribution assumption, lands within \\(\\text{average} \\pm 16\\%\\) in roughly two years out of three. For an asset with 60% volatility, that band is \\(\\pm 60\\%\\). **Both are called "volatility," but 16% and 60% are completely different experiences to live through.**

### ② Maximum drawdown: how deep, and how long to come back

**Maximum drawdown (MDD)** is the largest fall from any historical peak to a subsequent low. It answers: "**If I'd bought at the worst possible moment, how much would I have lost at most?**" (The maxDrawdown function in _fin.js computes exactly this by tracking the running peak point by point.)

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="210" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Anatomy of a drawdown</text><rect x="150" y="60" width="205" height="125" fill="var(--red-soft)" opacity="0.6"/><line x1="40" y1="60" x2="390" y2="60" stroke="var(--line)" stroke-dasharray="4 3"/><polyline points="40,150 80,120 120,90 150,60 180,100 210,140 240,170 260,180 290,150 320,120 355,60 385,45" fill="none" stroke="var(--orange)" stroke-width="2.6"/><circle cx="150" cy="60" r="4" fill="var(--orange)"/><circle cx="260" cy="180" r="4" fill="var(--red)"/><text x="150" y="50" text-anchor="middle" font-size="11" fill="var(--ink)">Peak 100</text><text x="260" y="200" text-anchor="middle" font-size="11" fill="var(--red)">Trough 50</text><line x1="275" y1="64" x2="275" y2="176" stroke="var(--red)" stroke-width="1.6"/><text x="282" y="110" font-size="11" font-weight="700" fill="var(--red)">Max drawdown</text><text x="282" y="126" font-size="11" font-weight="700" fill="var(--red)">−50%</text><line x1="150" y1="222" x2="355" y2="222" stroke="var(--muted)" stroke-width="1.4"/><line x1="150" y1="216" x2="150" y2="228" stroke="var(--muted)"/><line x1="355" y1="216" x2="355" y2="228" stroke="var(--muted)"/><text x="252" y="242" text-anchor="middle" font-size="11" fill="var(--muted)">Time underwater: below the old peak until it's regained</text><text x="200" y="152" text-anchor="middle" font-size="10" fill="var(--muted)">Decline</text><text x="318" y="170" text-anchor="middle" font-size="10" fill="var(--muted)">Recovery: needs +100%</text><text x="525" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Gain needed to break even</text><text x="440" y="58" text-anchor="end" font-size="11" fill="var(--ink)">Down 20%</text><rect x="448" y="46" width="6" height="16" fill="var(--orange)"/><text x="460" y="58" font-size="11" fill="var(--muted)">+25%</text><text x="440" y="92" text-anchor="end" font-size="11" fill="var(--ink)">Down 50%</text><rect x="448" y="80" width="24" height="16" fill="var(--orange)"/><text x="478" y="92" font-size="11" fill="var(--muted)">+100%</text><text x="440" y="126" text-anchor="end" font-size="11" fill="var(--ink)">Down 75%</text><rect x="448" y="114" width="72" height="16" fill="var(--btc)"/><text x="526" y="126" font-size="11" fill="var(--muted)">+300%</text><text x="440" y="160" text-anchor="end" font-size="11" fill="var(--ink)">Down 80%</text><rect x="448" y="148" width="96" height="16" fill="var(--btc)"/><text x="550" y="160" font-size="11" fill="var(--muted)">+400%</text><text x="440" y="194" text-anchor="end" font-size="11" fill="var(--ink)">Down 90%</text><rect x="448" y="182" width="170" height="16" fill="var(--red)"/><text x="600" y="212" text-anchor="end" font-size="11" fill="var(--red)">+900%</text><text x="525" y="242" text-anchor="middle" font-size="10.5" fill="var(--muted)">Break-even gain = 1/(1 − drawdown) − 1</text></svg><figcaption>Left: a drawdown has a depth and a time underwater, and the gain needed to recover is always larger than the original fall. Right: the deeper the fall, the harder the way back — and it gets harder non-linearly, which is exactly what makes leverage and high-volatility assets dangerous.</figcaption></figure>

$$
\\text{Gain needed to break even} = \\frac{1}{1 - \\text{drawdown}} - 1
50\\%\\ \\text{drawdown}:\\ \\frac{1}{1 - 0.5} - 1 = +100\\%
80\\%\\ \\text{drawdown}:\\ \\frac{1}{1 - 0.8} - 1 = +400\\%
90\\%\\ \\text{drawdown}:\\ \\frac{1}{1 - 0.9} - 1 = +900\\%
$$

Some historical reference points (approximate): US stocks (S&P 500) had a maximum drawdown of about 57% in 2007–2009. The Nasdaq fell about 78% in 2000–2002 and took roughly 15 years to regain its old high. Bitcoin has had several deep drawdowns — more than 90% in 2011, about 85% in 2013–2015, about 84% in 2017–2018, and about 77% in 2021–2022.

Maximum drawdown's strength is that it's **intuitive and close to lived experience**: most investors aren't beaten by volatility; they're beaten by one deep drawdown that scares them out or forces them to sell. Its weakness is that **it's a single historical sample.** The worst case that hasn't shown up in your data yet can still show up in the future, and the shorter your data, the rosier the number.

### ③ Sharpe, Sortino and Calmar: return per unit of risk

The **Sharpe ratio** (William Sharpe, 1966) measures how much excess return you earn for each unit of volatility you bear:

$$
\\text{Sharpe ratio} = \\frac{\\text{portfolio return} - \\text{risk-free rate}}{\\text{portfolio volatility}}
\\text{Example:}\\ \\frac{10\\% - 4\\%}{15\\%} = 0.40
\\text{Another:}\\ \\frac{7\\% - 4\\%}{6\\%} = 0.50
$$

With a 4% risk-free rate: the example fund returns 10% with 15% volatility; the other returns 7% with 6% volatility.

The second fund earns less but has the higher Sharpe — it's **more efficient per unit of risk**. If it can be levered at a reasonable cost (the risk-parity logic of Stage 11.2), it could be scaled up to the same volatility as the first fund and earn more. Over the long run, the US stock market's Sharpe ratio has been roughly 0.3–0.5. Strategies that sustain more than 1 are rare; when you see one, be suspicious first.

Sharpe's blind spots:

- **It penalizes "good" volatility.** A straight-up rally counts as volatility too. The **Sortino ratio** puts only **downside deviation** (the swings below a target return) in the denominator. In the example above, if downside deviation is 9%, \\(\\text{Sortino} = \\dfrac{10\\% - 4\\%}{9\\%} \\approx 0.67\\).
- **It can't see the tails.** A strategy that sells far out-of-the-money options earns a little every month with tiny volatility and a gorgeous Sharpe — until one day it gives back years of gains at once (the "selling volatility" of Stage 7.3). **A high Sharpe with very few losing months sometimes means the risk is hiding in the tail.**
- **It depends on the sample period.** A Sharpe measured in a bull market may not survive a bear market.

The **Calmar ratio**: \\(\\text{Calmar} = \\dfrac{\\text{annualized return}}{\\lvert \\text{maximum drawdown} \\rvert}\\) (drawdown in absolute value). It puts "the most painful episode" straight in the denominator and is popular for judging strategies such as trend following.

### ④ VaR and expected shortfall: how much can a bad day cost?

**Value at Risk (VaR)** answers: "**At a given confidence level, what's the most I could lose over a given period?**" J.P. Morgan popularized it in the 1990s (RiskMetrics, 1994), and it became the standard language of bank risk regulation.

Parametric (normal) method, for a $1 million portfolio with 1% daily volatility (one-day VaR):

$$
\\mathrm{VaR} = z \\times \\text{volatility} \\times \\text{portfolio value}
\\mathrm{VaR}_{95\\%} = 1.645 \\times 1\\% \\times \\$1\\text{M} \\approx \\$16{,}450
\\mathrm{VaR}_{99\\%} = 2.326 \\times 1\\% \\times \\$1\\text{M} \\approx \\$23{,}260
$$

How to read it: "**On 95% of days, the one-day loss won't exceed about $16,000**" — or equivalently, roughly one trading day in twenty will be worse than that. Besides the parametric method there's **historical simulation** (take the 5th percentile of past returns directly) and **Monte Carlo** simulation.

VaR's biggest problem: **it tells you where the door is, not how deep the drop is behind it.** Losing $17,000 and losing $500,000 both count as "exceeding VaR." Hence **expected shortfall (ES, also called CVaR)**: **the average loss once you're past VaR.** Under a normal distribution, \\(\\mathrm{ES}_{95\\%} \\approx 2.063 \\times \\text{volatility}\\) — about \\(2.063 \\times 1\\% \\times \\$1\\text{M} \\approx \\$20{,}630\\) in the example. In the new trading-book rules (the Fundamental Review of the Trading Book, FRTB) published in 2016, the Basel Committee switched the core market-risk capital measure from VaR to 97.5% ES precisely because VaR is blind to the tail.

**Fat tails** are the reality both measures must face. On October 19, 1987, the S&P 500 fell about 20% in a single day — a practically "impossible" event under a normal distribution with the volatility of the time. In 1998, Long-Term Capital Management's models likewise underestimated how correlations would spike in extreme conditions. Real return distributions have far thicker tails than the normal curve, and Bitcoin's especially so. **So treat normal-distribution VaR as a lower bound, and pair it with historical scenarios and stress tests.**

<table>
<tr><th>Metric</th><th>Question it answers</th><th>Main blind spot</th></tr>
<tr><td>Volatility</td><td>How much does it usually swing?</td><td>Treats ups and downs alike; blind to tails; jumps in crises</td></tr>
<tr><td>Max drawdown</td><td>How much if I'd bought at the worst moment?</td><td>A single historical sample; short data looks too rosy</td></tr>
<tr><td>Sharpe / Sortino</td><td>Excess return per unit of risk?</td><td>Tail risk (option-selling strategies) looks "good"</td></tr>
<tr><td>VaR</td><td>Loss threshold on an ordinary bad day?</td><td>Silent about how bad it gets past the threshold</td></tr>
<tr><td>Expected shortfall</td><td>Average loss beyond the threshold?</td><td>Still model- and sample-dependent; can understate fat tails</td></tr>
</table>

### ⑤ A risk profile of Bitcoin and DATs: what the metrics catch and miss

Point the dashboard at new-era assets and a few things stand out:

- **For Bitcoin, drawdowns say more than volatility.** Its annualized volatility is roughly three to four times that of stocks, but its drawdown history (several of 75–90%) is what really decides whether you can hold it. Supporters point out that it has made new highs after every major drawdown and that its volatility has trended down (Stage 12.4). Critics point out that past recoveries don't guarantee future ones and that it has no cash flows to anchor its valuation (Stage 12.3). **Every one of these metrics looks backward**, and both sides need to remember that.
- **Leverage deepens drawdowns — non-linearly.** For a DAT whose common stock has about \\(1.4\\times\\) "amplification" to Bitcoin (Stage 16.4 derives that number for Orange Corp), a 50% fall in Bitcoin knocks roughly 70% off the Bitcoin-backed value of the common. If the mNAV premium shrinks at the same time (Stage 16.2), the actual fall can be deeper still.
- **For DAT preferreds and convertibles, volatility isn't the core risk measure.** Their risk looks more like credit risk: what matters is how far the asset-coverage multiple (the BTC Rating of Stage 16.5) falls in a big Bitcoin drawdown, and whether dividends keep getting paid (Stage 16.6). Repurpose the drawdown idea — "**if Bitcoin falls another 80% from here, how many times covered is each layer?**" — and you have the starting point for the stress test in Stage 18.2.

**This lesson covers mechanics and analytical frameworks only; it is not investment advice.** One practical habit: for any investment, write down at least **three numbers** — annualized volatility, historical maximum drawdown (and when it happened), and "if a drawdown like that happened again, how many dollars would my position lose?" That third number is where the next lesson, on position sizing (Stage 11.4), begins.
`,

  demo: "risk-metrics",

  analogy: `
Think of risk metrics as **the numbers on a medical checkup.**

**Volatility** is like the variability of your heart rate: how much it jumps around normally. A jumpy heart rate doesn't mean you're sick, but it tells you the body is under exertion or stress.

**Maximum drawdown** is **the worst illness you've ever had**: how sick you got and how long you were bedridden. It says more about "can you take it?" than your everyday heart rate does. And the sicker you get, the more disproportionate the recovery — lose half your strength and it takes double the effort to earn it back.

**The Sharpe ratio** is "exercise efficiency": how far you ran for a given amount of effort. Some people aren't fast but barely break a sweat; others are fast but gasping.

**VaR** is the doctor saying: "**On 95% of days**, your blood pressure stays under 140." Useful — but it doesn't say whether the other 5% of days hit 200. **Expected shortfall** adds the missing sentence: "On the days it does go over 140, it averages 175."

And a good doctor never looks at just one number, and never concludes from past checkups alone that you'll never get seriously ill. **Metrics tell you what your health looked like in the past; a stress test tells you what happens when you meet an illness you've never seen before.**
`,

  misconceptions: [
    "**\"Low volatility means low risk.\"** — Volatility only measures ordinary swings. Selling far out-of-the-money options, or holding illiquid assets that are rarely repriced, both look calm day to day while the risk hides in the tail or in the valuation. Look at drawdowns, tail measures and stress scenarios too.",
    "**\"If it fell 50%, a 50% gain gets me back to even.\"** — From 100 down to 50 and then up 50% only gets you to 75. \\(\\text{The gain needed} = \\dfrac{1}{1 - \\text{drawdown}} - 1\\): a 50% fall needs +100%, an 80% fall needs +400%. That's why deep drawdowns and high leverage are so deadly.",
    "**\"95% VaR is $16,000, so the most I can lose is $16,000.\"** — VaR is only a threshold: roughly one day in twenty will be worse, and it doesn't say how much worse. For the average loss past the threshold, look at expected shortfall — and fat tails make normal VaR understate the risk further.",
    "**\"The higher the Sharpe ratio, the safer the strategy.\"** — Sharpe can't see the tails. Strategies that are smooth most of the time and occasionally blow up (such as selling volatility) often have beautiful Sharpe ratios right before the blowup. A Sharpe persistently above 1 should first make you look for hidden tail risk or data problems.",
    "**\"Bitcoin always came back after its crashes, so drawdowns aren't really a risk.\"** — The recoveries are historical fact, but the metrics look backward and guarantee nothing. And if you're forced to sell in the middle of a drawdown (because of leverage, or because you need the cash), you never get to the recovery. Surviving the drawdown matters more than whether it eventually recovers.",
  ],

  quiz: [
    {
      q: "An asset's daily volatility is 1%. Using 252 trading days and the square-root rule, what's its annualized volatility?",
      options: [
        "252%",
        "About 15.9%",
        "About 3.7%",
        "12%",
      ],
      answer: 1,
      explain: "\\(\\text{Annualized} \\approx \\text{daily} \\times \\sqrt{252} \\approx 1\\% \\times 15.87 \\approx 15.9\\%\\). **Volatility grows with the square root of time**, because the variances of independent daily returns add linearly.",
    },
    {
      q: "An investment has fallen 80%. How much does it need to rise to get back to its old high?",
      options: [
        "80%",
        "160%",
        "400%",
        "500%",
      ],
      answer: 2,
      explain: "\\(\\text{Break-even gain} = \\dfrac{1}{1 - 0.8} - 1 = 5 - 1 = 400\\%\\). The remaining 20 has to become 100, a fivefold increase. **The deeper the loss, the harder the recovery — non-linearly.**",
    },
    {
      q: "Fund A returns 10% with 15% volatility; Fund B returns 7% with 6% volatility. The risk-free rate is 4%. Which has the higher Sharpe ratio?",
      options: [
        "A, because its return is higher",
        "They're equal",
        "They can't be compared because the returns differ",
        "B: 0.50 versus 0.40",
      ],
      answer: 3,
      explain: "\\(A = \\dfrac{10\\% - 4\\%}{15\\%} = 0.40\\); \\(B = \\dfrac{7\\% - 4\\%}{6\\%} = 0.50\\). **B earns more per unit of risk**, and if it can be levered at a reasonable cost, it can beat A at the same volatility.",
    },
    {
      q: "A $1 million portfolio has a 95% one-day VaR of $16,450. Which reading is correct?",
      options: [
        "Roughly one trading day in twenty will lose more than $16,450, and VaR doesn't say how much more",
        "The portfolio can never lose more than $16,450 in a day",
        "The portfolio loses $16,450 every day",
        "On 95% of days the portfolio gains $16,450",
      ],
      answer: 0,
      explain: "VaR is a threshold that gets crossed on 5% of days. How much you lose on average beyond it is what **expected shortfall** tells you (about $20,630 under a normal assumption) — and more with fat tails.",
    },
    {
      q: "Why isn't volatility the core risk measure when analyzing a preferred stock issued by a DAT?",
      options: [
        "Because preferred prices never move",
        "Because its main risk behaves like credit risk: what matters is how much asset coverage is left after a big Bitcoin drawdown and whether dividends continue",
        "Because preferreds carry no risk at all",
        "Because regulators forbid computing the volatility of preferreds",
      ],
      answer: 1,
      explain: "For preferreds and converts, the key is \"**if Bitcoin drops another \\(X\\%\\), how many times covered is each layer?**\" (the BTC Rating of Stage 16.5) plus dividend coverage (Stage 16.6) — the drawdown idea applied as a stress test.",
    },
  ],

  further: [
    { label: "William F. Sharpe, The Sharpe Ratio (the author's own explanation, Stanford)", url: "https://web.stanford.edu/~wfsharpe/art/sr/sr.htm" },
    { label: "Basel Committee (2019), Minimum capital requirements for market risk (FRTB: the move from VaR to ES)", url: "https://www.bis.org/bcbs/publ/d457.htm" },
    { label: "Investopedia: Value at Risk (VaR), a primer", url: "https://www.investopedia.com/terms/v/var.asp" },
    { label: "Investopedia: Maximum Drawdown (MDD)", url: "https://www.investopedia.com/terms/m/maximum-drawdown-mdd.asp" },
  ],
};
