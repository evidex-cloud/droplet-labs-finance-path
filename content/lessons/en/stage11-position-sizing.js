export default {
  id: "position-sizing",
  stage: 11,
  order: 4,
  title: "Position Sizing & the Kelly Criterion: Survive First, Then Compound",
  difficulty: "systems",
  prereqs: ["risk-metrics", "compounding"],

  oneLiner:
    "You can be right about the direction and still lose everything — simply by **betting too much.** This lesson is about the most underrated decision in investing: **position size.** Starting from a coin-flip game with a positive expected value that nonetheless makes almost everyone poorer, it explains how the **Kelly criterion** (1956) finds the bet size that grows wealth fastest over time, why professionals bet only **half Kelly**, how **volatility drag** makes leverage on volatile assets almost guaranteed to hurt, and how this same math reappears in perpetual futures, leveraged ETFs and the \"amplification\" of a DAT.",

  intuition: `
Let's play a game. Flip a fair coin. Heads, your money **grows by 50%**. Tails, your money **shrinks by 40%**. You bet everything you have, every time. Do you play?

Work out the expected value: half the time +50%, half the time −40%, so on average **+5% per flip**. Sounds like free money. And if ten thousand people each played once, their combined wealth really would grow by 5%.

But **you only get one life**, and you play flip after flip. After one heads and one tails: \\(1 \\times 1.5 \\times 0.6 = \\mathbf{0.9}\\) — you've lost 10%. The order doesn't matter; as long as heads and tails come up about equally often, you shrink by 10% every two flips. After 100 flips, the typical (median) outcome is roughly **0.5%** of what you started with — even though the "average" player got rich, because a tiny handful of extraordinarily lucky players ended up with astronomical sums.

**Expected value is the average across ten thousand people playing once; your fate is the result of one person playing ten thousand times.** In a world with compounding and the possibility of going broke, those two are not the same. That's why position size matters more than direction.

Now take the same game, but bet only **25% of your wealth** each time. Win and your wealth goes \\(\\times 1.125\\); lose and it goes \\(\\times 0.9\\). One of each multiplies to \\(1.125 \\times 0.9 = 1.0125\\) — **about 1.25% growth every two flips.** **Same coin, same odds; only the bet size changed, and the ending flipped from "almost certainly poorer" to "almost certainly richer."**

In 1956, John Kelly of Bell Labs turned this problem into a formula: given your odds of winning and the payoff, what **fraction of your wealth maximizes its long-run growth rate?** The mathematician Edward Thorp later carried it to the blackjack table and then to Wall Street. That's the **Kelly criterion.**

This lesson sits on **Idea ④ Risk & leverage**, and on its most important side: **leverage doesn't just magnify gains and losses — it magnifies "volatility drag," which quietly eats your compounding.** Stage 2.2 called compounding the eighth wonder of the world; this lesson shows that compounding's real enemy isn't losing as such, but **positions so large that the losses get too deep.** Last lesson (Stage 11.3) you learned to measure drawdowns: a 50% fall needs a 100% gain to recover. This lesson turns that into a rule of action: **make sure you survive first, then go for growth.** You'll use this thinking again when Stage 16.4 examines a DAT's amplification and when Stage 18.2 runs a stress test.

**This lesson has five parts:**

- **① Rule one: survive — risk of ruin and "one person's time average"**
- **② The Kelly criterion: the bet size that grows fastest**
- **③ Fractional Kelly: why professionals bet half**
- **④ The continuous version: volatility drag and optimal leverage**
- **⑤ Position sizing in the new era: perpetual futures, leveraged ETFs and DAT amplification**
`,

  mechanics: `
### ① Rule one: survive — risk of ruin and "one person's time average"

The +50%/−40% game from the intuition exposes what economists call the **ergodicity** problem: **the average across a group (the ensemble average)** is not the same as **the average one person experiences over time (the time average).**

$$
\\text{Arithmetic expectation per flip} = 0.5 \\times (+50\\%) + 0.5 \\times (-40\\%) = +5\\%
\\text{Geometric growth per flip} = \\sqrt{1.5 \\times 0.6} - 1 = \\sqrt{0.9} - 1 \\approx -5.1\\%
\\text{Expected wealth after 100 flips} \\approx 1.05^{100} \\approx 131\\times
\\text{Median wealth after 100 flips} \\approx 0.9^{50} \\approx 0.5\\%
$$

The expectation is dragged up by a vanishingly small number of paths that keep winning, while most people's wealth shrinks. **For someone who bets repeatedly and has only one path through life, what matters is the geometric growth rate (the compound return), not the arithmetic expectation.** Stage 11.3's "gain needed to break even" is the flip side of the same fact: the deeper the loss, the harder the recovery, so large losses do disproportionate damage to compounding.

The second issue is **risk of ruin.** A classic result: if you bet 1 unit at a time, win with probability \\(p > 0.5\\), win and lose equal amounts, and start with \\(n\\) units, the probability that you eventually go broke is

$$
\\text{Risk of ruin} = \\left(\\frac{q}{p}\\right)^{n},\\quad \\text{where}\\ q = 1 - p
\\text{Bankroll of 10 bets:}\\ \\left(\\frac{0.45}{0.55}\\right)^{10} \\approx 13\\%
\\text{Bankroll of 20 bets:}\\ \\left(\\frac{0.45}{0.55}\\right)^{20} \\approx 1.8\\%
$$

The last two lines use \\(p = 0.55\\).

A 55% win rate is a big edge. Yet if each bet is a tenth of your bankroll, you still have about a one-in-seven chance of going broke in a game you're "supposed" to win. **Halve the bet size and the risk of ruin falls from 13% to about 2%.** That's why every trader who survives for decades has one thing in common: **small risk per trade.**

### ② The Kelly criterion: the bet size that grows fastest

Let \\(p\\) be the probability of winning, let each $1 bet win \\(\\$b\\) when you win and lose the $1 when you lose, and let \\(f\\) be the fraction of wealth you stake each round. The geometric growth rate per round is:

$$
g(f) = p \\times \\ln(1 + bf) + (1 - p) \\times \\ln(1 - f)
f^{*} = \\frac{bp - (1 - p)}{b} = p - \\frac{q}{b}
p = 0.6,\\ b = 1:\\ f^{*} = 0.6 - 0.4 = 20\\%
$$

Maximizing over \\(f\\) gives the Kelly fraction \\(f^{*}\\) in the second line; the third line is an example with \\(p = 0.6\\), \\(b = 1\\) (even money).

The kelly(p, b) function in _fin.js is exactly this formula. Some key numbers (\\(p = 0.6\\), \\(b = 1\\), geometric growth per round):

<table>
<tr><th>Bet fraction \\(f\\)</th><th>10% (half Kelly)</th><th>20% (Kelly)</th><th>30% (\\(1.5\\times\\) Kelly)</th><th>40% (\\(2\\times\\) Kelly)</th><th>50%</th></tr>
<tr><td>Geometric growth per round</td><td>+1.50%</td><td>+2.01%</td><td>+1.48%</td><td>−0.25%</td><td>−3.40%</td></tr>
</table>

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="220" y="24" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Bet size vs long-run growth (60% win, even money)</text><line x1="60" y1="125" x2="380" y2="125" stroke="var(--muted)" stroke-width="1"/><line x1="60" y1="40" x2="60" y2="235" stroke="var(--line)"/><text x="54" y="67" text-anchor="end" font-size="10" fill="var(--muted)">+2%</text><text x="54" y="128" text-anchor="end" font-size="10" fill="var(--muted)">0</text><text x="54" y="230" text-anchor="end" font-size="10" fill="var(--muted)">−3.4%</text><rect x="252" y="40" width="128" height="195" fill="var(--red-soft)" opacity="0.5"/><text x="316" y="56" text-anchor="middle" font-size="10.5" fill="var(--red)">Overbetting zone</text><polyline points="60,125 92,98.7 124,79.9 156,68.5 188,64.6 220,68.6 252,80.75 284,101.75 316,132.4 348,173.6 380,226.9" fill="none" stroke="var(--orange)" stroke-width="2.6"/><line x1="188" y1="64.6" x2="188" y2="125" stroke="var(--orange)" stroke-dasharray="3 3"/><circle cx="188" cy="64.6" r="4" fill="var(--orange)"/><text x="188" y="146" text-anchor="middle" font-size="10.5" fill="var(--orange-ink)">Kelly 20%</text><circle cx="124" cy="79.9" r="3.5" fill="var(--green)"/><text x="124" y="72" text-anchor="middle" font-size="10" fill="var(--green)">Half Kelly: 75% of growth</text><circle cx="316" cy="132.4" r="3.5" fill="var(--red)"/><text x="322" y="150" font-size="10" fill="var(--red)">2× Kelly ≈ 0</text><text x="60" y="252" text-anchor="middle" font-size="10" fill="var(--muted)">0</text><text x="188" y="252" text-anchor="middle" font-size="10" fill="var(--muted)">20%</text><text x="316" y="252" text-anchor="middle" font-size="10" fill="var(--muted)">40%</text><text x="380" y="252" text-anchor="middle" font-size="10" fill="var(--muted)">50%</text><text x="220" y="270" text-anchor="middle" font-size="11" fill="var(--muted)">Fraction of wealth staked each round, f</text><text x="520" y="24" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Leverage vs long-run growth</text><line x1="430" y1="79.4" x2="610" y2="79.4" stroke="var(--muted)"/><line x1="430" y1="40" x2="430" y2="235" stroke="var(--line)"/><polyline points="430,79.4 452.5,63.1 475,56.3 480,56.1 497.5,58.9 520,71 542.5,92.5 565,123.5 587.5,163.9 610,213.8" fill="none" stroke="var(--btc)" stroke-width="2.6"/><circle cx="480" cy="56.1" r="4" fill="var(--btc)"/><text x="480" y="48" text-anchor="middle" font-size="10" fill="var(--ink)">Optimum ≈ 0.56×</text><circle cx="520" cy="71" r="3.5" fill="var(--btc)"/><text x="526" y="88" font-size="10" fill="var(--muted)">1×: +2%</text><circle cx="610" cy="213.8" r="3.5" fill="var(--red)"/><text x="604" y="230" text-anchor="end" font-size="10" fill="var(--red)">2×: −32%/yr</text><text x="430" y="252" text-anchor="middle" font-size="10" fill="var(--muted)">0</text><text x="520" y="252" text-anchor="middle" font-size="10" fill="var(--muted)">1×</text><text x="610" y="252" text-anchor="middle" font-size="10" fill="var(--muted)">2×</text><text x="520" y="270" text-anchor="middle" font-size="11" fill="var(--muted)">Assumes 20% excess return, 60% volatility</text></svg><figcaption>Left: growth is a hill with the Kelly fraction at the top. Moving left (betting less) costs little; moving right (betting more) costs a lot, and at \\(2\\times\\) Kelly long-run growth is about zero. Right: in the continuous version, the optimal leverage on a high-volatility asset can sit well below \\(1\\times\\), and \\(2\\times\\) leverage has a sharply negative long-run growth rate (vertical axis is growth above the risk-free rate).</figcaption></figure>

Three properties of this "hill" are worth memorizing:

- **The peak is at the Kelly fraction.** Bet more and long-run growth goes *down*.
- **The hill is lopsided.** Bet half as much and you give up only about a quarter of the growth; bet twice as much and growth goes to zero. **Underbetting is cheap; overbetting is expensive.**
- **Beyond \\(2\\times\\) Kelly, long-run growth is negative.** Even though every single bet has a positive expectation, the volatility slowly grinds you down.

Kelly also has an elegant interpretation: it is equivalent to **maximizing the expected logarithm of wealth.** Log utility means "the pain of losing half your wealth equals the joy of doubling it" — which lines up exactly with the geometric nature of compounding.

### ③ Fractional Kelly: why professionals bet half

The Kelly formula assumes you **know your odds and payoff precisely.** In reality you can only estimate them, and people almost always **overestimate their edge** (the overconfidence of Stage 11.5). If your true win rate is 55% but you believe it's 60%, the Kelly fraction you compute (20%) is double the true Kelly fraction (10%) — which puts you right at the "growth is about zero" point.

So in practice people use **fractional Kelly**, most often **half Kelly**:

- **Half Kelly keeps about 75% of the long-run growth rate** while roughly halving the swings in wealth.
- It's **robust to estimation error**: even if you've overestimated your edge by a factor of two, half Kelly just lands you at true Kelly, not at a disastrous \\(2\\times\\).
- **Drawdowns are much smaller.** Betting full Kelly, the probability that your wealth at some point falls to half of where it started is about 50%; at half Kelly it drops to about 12.5%. Most people can't stomach the former (Stage 11.3).

**A practical sizing rule** doesn't even require knowing your win rate. First decide "**if this position goes completely wrong, what fraction of my total wealth am I willing to lose?**" (many professional traders use 0.5–2%). Then divide by "**how far could this position fall if it goes completely wrong?**" Example: you're willing to lose 1% of your wealth, and in a bad scenario this asset could fall 50%; your maximum position is \\(1\\% \\div 50\\% = \\mathbf{2\\%}\\). That's Stage 11.3's maximum drawdown turned directly into a position size.

### ④ The continuous version: volatility drag and optimal leverage

Now replace discrete bets with holding a continuously fluctuating asset. Let its **arithmetic** expected excess return be \\(\\mu - r\\) and its volatility \\(\\sigma\\), and hold it with leverage \\(L\\) (\\(L = 1\\) means fully invested with no borrowing; \\(L = 0.5\\) means half invested). The long-run geometric growth rate is approximately:

$$
g(L) \\approx r + L \\times (\\mu - r) - \\frac{L^{2} \\times \\sigma^{2}}{2}
\\text{Optimal leverage}\\ L^{*} = \\frac{\\mu - r}{\\sigma^{2}}
\\text{Volatility drag when fully invested} = \\frac{\\sigma^{2}}{2}
$$

**Volatility drag** is the gap between the arithmetic average return and the compound return. An asset with a 10% arithmetic average and 20% volatility compounds at only about \\(10\\% - \\dfrac{0.2^{2}}{2} = \\mathbf{8\\%}\\). And the drag grows with the **square** of leverage: double the leverage and the drag quadruples.

Plug in two examples (teaching assumptions, not forecasts; **this lesson is not investment advice**):

- **A stock-like asset**: 5% excess return, 16% volatility → \\(L^{*} = \\dfrac{0.05}{0.0256} \\approx 1.95\\). In theory you could lever nearly \\(2\\times\\); allowing for estimation error, half Kelly is about \\(1\\times\\) — right where most people hold an index fund.
- **A Bitcoin-like asset**: assume 20% excess return and 60% volatility → \\(L^{*} = \\dfrac{0.20}{0.36} \\approx \\mathbf{0.56}\\). Even if you believe it earns 20% a year above cash, **holding it fully (\\(1\\times\\)) grows only about 2% a year faster than the risk-free rate** (\\(0.20 - \\dfrac{0.36}{2} = 0.02\\)), and **\\(2\\times\\) leverage has a long-run growth rate of about −32% a year** (\\(0.40 - \\dfrac{4 \\times 0.36}{2} = -0.32\\)).

That is the math behind "**leverage on a volatile asset almost always hurts**": not because you got the direction wrong, but because **the \\(\\sigma^{2}\\) term grows with the square of leverage and quickly swallows the linearly growing return.** Stage 11.2's risk parity puts its leverage on low-volatility bonds precisely to avoid this trap.

### ⑤ Position sizing in the new era: perpetual futures, leveraged ETFs and DAT amplification

The same math shows up all over new-era finance:

- **Perpetual futures and margin (Stages 7.1 and 7.5).** \\(10\\times\\) leverage means a roughly 10% adverse move gets you forcibly liquidated — for an asset whose daily volatility is often around 3%, that can happen within days. **Liquidation turns volatility drag into a one-shot wipeout**, with no chance to wait for the rebound. The frequent large liquidation cascades in crypto markets are what it looks like when many oversized positions get triggered at once.
- **Daily-rebalanced leveraged ETFs.** If the underlying goes +10% one day and −10% the next, it's down 1% (\\(1.1 \\times 0.9 = 0.99\\)), but a \\(2\\times\\) ETF is down 4% (\\(1.2 \\times 0.8 = 0.96\\)). In choppy markets, a leveraged ETF's long-run performance falls well short of "\\(2\\times\\) the underlying" — volatility drag in everyday form.
- **DAT amplification (Stage 16.4).** A company that finances Bitcoin purchases with convertibles and preferreds makes its common stock a **levered Bitcoin position**. Orange Corp's amplification is about \\(1.43\\times\\). By the formula above, amplification applied to an asset with 60% volatility adds meaningfully to the common's volatility drag. But there's a crucial difference from margin leverage: **these liabilities carry no margin calls and no forced liquidation.** The converts have fixed maturities and the preferreds are perpetual, so a DAT's leverage **can't be wiped out in one shot by short-term volatility the way a perpetual-futures position can.** The risk moves elsewhere — to whether it can keep paying dividends and interest and keep raising capital (Stages 16.6 and 18.2).

Finally, apply Kelly's lesson to yourself: **any position that can knock you out with a single mistake is too big**, however confident you are about the direction. Survive first, and compounding gets a chance to work for you.
`,

  demo: "position-sizing",

  analogy: `
Think of position size as **how fast you take a curve on a mountain road.**

The road conditions — the asset's expected return and volatility — are out of your control. The only thing you control is **how hard you press the accelerator** (position size and leverage).

Drive too slowly (too small a position) and you're perfectly safe but late — that's underbetting, and its cost is earning a bit less.

Every curve has a **best speed** (the Kelly fraction). Go a little faster and you don't arrive sooner — you skid, correct, skid again, and end up slower (a lower growth rate). Go twice as fast and sooner or later you go through the guardrail (zero or negative long-run growth). And the sharper the curve (the higher the volatility), the lower the best speed. Taking a hairpin at highway speed isn't bravery; it's a mathematically guaranteed accident.

Experienced drivers take the curve at **about half the best speed** (half Kelly). They arrive only slightly later, and if the road turns out slicker than they thought (they overestimated their edge), there's still room to spare.

As for **margin leverage**, it's like driving a car that automatically stalls and stops dead in the middle of the road the moment a tire slips (forced liquidation). A DAT's amplification is more like driving a heavier car that's harder to handle but never stalls on its own — the danger comes from somewhere else: whether there's enough fuel (financing) to reach the destination.
`,

  misconceptions: [
    "**\"As long as the expected return is positive, the more you bet the more you make.\"** — With repeated bets and compounding, your fate is set by the geometric growth rate, not the arithmetic expectation. The +50%/−40% coin game expects +5% per flip, yet betting everything shrinks the median player by 10% every two flips; betting 25% grows steadily.",
    "**\"The Kelly criterion gives the optimal position, so just follow it.\"** — Kelly needs accurate odds and payoffs, and people almost always overestimate their edge. Overestimate it by a factor of two and you land at \\(2\\times\\) Kelly, where long-run growth is about zero. In practice people use half Kelly or less, giving up about a quarter of the growth while sharply cutting volatility and the damage from estimation errors.",
    "**\"With \\(2\\times\\) leverage, the long-run return is doubled.\"** — Volatility drag grows with the square of leverage. For a Bitcoin-like asset with a 20% excess return and 60% volatility, \\(1\\times\\) grows only about 2% a year above the risk-free rate, and \\(2\\times\\) grows at about −32% a year. Leveraged ETFs decaying in choppy markets is the same phenomenon.",
    "**\"Small positions are for the timid; you'll never make real money.\"** — Halving your bet costs only about a quarter of your long-run growth, yet cuts the risk of ruin from 13% to about 2% in the 55%-win example. Making real money over the long run requires staying at the table.",
    "**\"DATs use leverage, so they'll get wiped out like a liquidated futures position.\"** — A DAT's convertibles and preferreds have no margin calls and no forced liquidation, so short-term price swings can't trigger a one-shot wipeout. Its risks sit elsewhere: amplified volatility drag, whether dividends and interest can keep being paid, and whether capital markets stay open to it (Stages 16.6 and 18.2).",
  ],

  quiz: [
    {
      q: "Coin flip: heads your wealth goes +50%, tails −40%, and you bet everything every time. After many flips, what's the typical (median) outcome?",
      options: [
        "About 5% growth per flip — the more you play, the richer you get",
        "You break even",
        "Wealth keeps shrinking, because geometric growth is about −5% per flip",
        "You're certain to go broke on the first tails",
      ],
      answer: 2,
      explain: "The arithmetic expectation is +5%, but \\(\\text{geometric growth} = \\sqrt{1.5 \\times 0.6} - 1 \\approx -5.1\\%\\). **One person's outcome over time follows the geometric rate**; the expectation is propped up by a few lucky paths.",
    },
    {
      q: "With a 60% chance of winning and even-money payoffs (\\(b = 1\\)), what fraction of wealth does Kelly say to bet each time?",
      options: [
        "60%",
        "40%",
        "10%",
        "20%",
      ],
      answer: 3,
      explain: "\\(f^{*} = p - \\dfrac{q}{b} = 0.6 - 0.4 = 20\\%\\). Betting 40% (\\(2\\times\\) Kelly) gives long-run growth of about zero (−0.25% per round), and 50% is clearly negative.",
    },
    {
      q: "Why do professionals often use \"half Kelly\"?",
      options: [
        "Half Kelly keeps about 75% of long-run growth with roughly half the volatility, and it's robust to overestimating your edge",
        "Half Kelly has a higher long-run growth rate than full Kelly",
        "Regulations forbid betting more than half Kelly",
        "Half Kelly guarantees you never lose",
      ],
      answer: 0,
      explain: "The growth curve is flat near its peak: betting half as much costs only about a quarter of the growth. **Underbetting is cheap and overbetting is expensive**, and estimation errors almost always push people toward overbetting.",
    },
    {
      q: "An asset has a 20% excess return and 60% volatility. Under continuous Kelly, what's the optimal leverage, and what's the long-run growth (above the risk-free rate) at \\(2\\times\\) leverage?",
      options: [
        "About \\(2\\times\\); +40%",
        "About \\(0.56\\times\\); about −32% a year",
        "About \\(1\\times\\); +20%",
        "About \\(3.3\\times\\); +20%",
      ],
      answer: 1,
      explain: "\\(L^{*} = \\dfrac{0.20}{0.36} \\approx 0.56\\). \\(g(2) = 2 \\times 0.20 - \\dfrac{4 \\times 0.36}{2} = 0.40 - 0.72 = -0.32\\). **Volatility drag grows with the square of leverage** and quickly swallows the linearly growing return.",
    },
    {
      q: "What's the key difference between a DAT's \"amplification\" and margin leverage in perpetual futures?",
      options: [
        "DATs use no leverage at all",
        "A DAT's leverage is always higher",
        "A DAT's convertibles and preferreds carry no margin calls or forced liquidation, so short-term swings can't wipe it out in one shot; the risk shifts to sustaining payouts and refinancing",
        "Perpetual futures don't use leverage",
      ],
      answer: 2,
      explain: "Margin leverage gets liquidated after an adverse move of about \\(\\dfrac{1}{L}\\); a DAT's liabilities are long-dated with no margin mechanism. **The risk doesn't disappear; it moves**: to dividend coverage (Stage 16.6) and the stress test (Stage 18.2).",
    },
  ],

  further: [
    { label: "J. L. Kelly Jr. (1956), A New Interpretation of Information Rate (the original paper, Bell System Technical Journal)", url: "https://www.princeton.edu/~wbialek/rome/refs/kelly_56.pdf" },
    { label: "Wikipedia: Kelly criterion (derivation, fractional Kelly and history)", url: "https://en.wikipedia.org/wiki/Kelly_criterion" },
    { label: "Ole Peters (2019), The ergodicity problem in economics (Nature Physics)", url: "https://www.nature.com/articles/s41567-019-0732-0" },
    { label: "Options Path (sister course): more practice with leverage, volatility and sizing", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
  ],
};
