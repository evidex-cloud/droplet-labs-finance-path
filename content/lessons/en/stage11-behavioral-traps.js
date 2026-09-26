export default {
  id: "behavioral-traps",
  stage: 11,
  order: 5,
  title: "Behavioral Traps: FOMO, Loss Aversion & Leverage Regret",
  difficulty: "systems",
  prereqs: ["bubbles-reflexivity", "position-sizing"],

  oneLiner:
    "The last four lessons gave you diversification, portfolio construction, risk metrics and position sizing. Yet most people don't lose money because they don't know the formulas — they lose because **at the crucial moment they do the opposite of what the formulas say**: they chase at the top for fear of missing out (FOMO), dump at the bottom because they can't bear the pain (loss aversion), add leverage at the peak of their confidence, and then get forced out at the worst possible point (leverage regret). This lesson uses Kahneman and Tversky's prospect theory, the disposition effect, overconfidence and narrative bias to take these traps apart one by one, and finishes with a set of **rules written down in advance** — so that discipline, not willpower, makes the call.",

  intuition: `
Picture yourself at a carnival booth. The operator says: we flip a fair coin. Heads, you win $150. Tails, you lose $100. Want to play?

On expected value it's a good deal: half the time +$150, half the time −$100, an average gain of $25 per flip. Yet most people shake their heads. Research finds that the typical person needs the potential win to be **about twice** the potential loss before accepting a 50/50 bet. **The pain of losing $100 is roughly twice the pleasure of winning $100.** This is **loss aversion.** In 1979 the psychologists Daniel Kahneman and Amos Tversky built it into "prospect theory," and Kahneman later received the 2002 Nobel Prize in economics for this work.

Loss aversion isn't a mistake in itself — it may even have helped our ancestors survive. The trouble is that combined with a few other mental "settings," it creates an **almost perfect money-losing loop** in markets:

- Prices have been rising for a long time, everyone around you is making money, and you grow more anxious that **you're the only one not on board** — that's **FOMO (fear of missing out)** plus **recency bias** (treating the recent trend as permanent). So you buy near the top.
- Then the price falls and you're sitting on a paper loss. **Loss aversion** makes you unwilling to admit it or sell — "I'll wait until I'm back to even." That's the **disposition effect**: selling winners too early and riding losers too long.
- The price keeps falling, the loss becomes unbearable, and you sell in a panic — often right near the bottom.
- If you've **used leverage**, you don't even get the option to wait: a margin call or forced liquidation sells for you at the worst moment. Then the price rebounds and you can only watch. That's **leverage regret.**

**Buy high, sell low, get forced out at the bottom** — this is what the bubbles and reflexivity of Stage 10.4 look like at the level of one person. Market manias and panics are built out of millions of decisions just like these.

This lesson sits on **Idea ④ Risk & leverage**, and it supplies the piece the last four lessons were missing: **risk isn't only in the asset; it's also in your head.** Stage 11.4 said the Kelly criterion needs an accurate estimate of your edge — and overconfidence makes people overestimate their edge systematically. Stage 11.3 showed that Bitcoin has had several 75–90% drawdowns — and whether you can hold through one depends on how you behave during it. Later on, the DAT checklist in Stage 18.6 and "reading the news like a pro" in Stage 20.3 are, at heart, tools for fighting exactly these biases.

**This lesson has five parts:**

- **① Loss aversion and prospect theory: why losing $100 hurts more than winning $100 feels good**
- **② FOMO and recency bias: the cost of chasing**
- **③ Overconfidence and overtrading: your edge is smaller than you think**
- **④ Narrative and confirmation bias: stories beat numbers**
- **⑤ Leverage regret and discipline: write the rules before the panic**
`,

  mechanics: `
### ① Loss aversion and prospect theory: why losing $100 hurts more than winning $100 feels good

Traditional finance assumes people decide based on the utility of their final wealth. Prospect theory (Kahneman and Tversky, 1979; the 1992 cumulative version supplied the commonly used parameters) points to three differences:

- **A reference point.** People feel **gains and losses** relative to some reference point — usually the purchase price, or "last month's high" — not total wealth.
- **Loss aversion.** The curve is steeper on the loss side, with a commonly used coefficient λ ≈ 2.25: a loss hurts a bit more than twice as much as an equal gain pleases.
- **Diminishing sensitivity.** The difference between 0 and 100 feels much bigger than between 1,000 and 1,100. So in the gain zone people turn **cautious** (lock in the profit), and in the loss zone they turn **risk-seeking** ("one more roll and I'm back to even").

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Prospect theory's value function: steeper for losses</text><line x1="80" y1="140" x2="560" y2="140" stroke="var(--line)"/><line x1="320" y1="36" x2="320" y2="256" stroke="var(--line)"/><text x="556" y="156" text-anchor="end" font-size="10.5" fill="var(--muted)">Gains →</text><text x="84" y="132" font-size="10.5" fill="var(--muted)">← Losses</text><text x="326" y="46" font-size="10.5" fill="var(--muted)">Felt value</text><polyline points="320,140 342,133.9 375,126.4 430,115 485,104.2 540,94" fill="none" stroke="var(--green)" stroke-width="2.6"/><polyline points="320,140 298,153.7 265,170.6 210,196.2 155,220.6 100,243.5" fill="none" stroke="var(--red)" stroke-width="2.6"/><line x1="540" y1="94" x2="540" y2="140" stroke="var(--green)" stroke-dasharray="3 3"/><line x1="100" y1="140" x2="100" y2="243.5" stroke="var(--red)" stroke-dasharray="3 3"/><text x="540" y="86" text-anchor="middle" font-size="10.5" fill="var(--green)">Joy of winning 100</text><text x="108" y="262" font-size="10.5" fill="var(--red)">Pain of losing 100 ≈ 2.25×</text><text x="455" y="176" text-anchor="middle" font-size="10.5" fill="var(--muted)">Gains: concave → cash in early</text><text x="195" y="112" text-anchor="middle" font-size="10.5" fill="var(--muted)">Losses: convex → gamble to get even</text><circle cx="320" cy="140" r="3.5" fill="var(--ink)"/><text x="330" y="160" font-size="10.5" fill="var(--ink)">Reference point (e.g. purchase price)</text></svg><figcaption>The value function is centered on a reference point: flat and concave for gains, steep and convex for losses (parameters from Tversky and Kahneman's 1992 estimates: exponent 0.88, loss-aversion coefficient 2.25). This one shape explains "take the profit, ride the loss."</figcaption></figure>

The direct consequence is the **disposition effect** (named by Shefrin and Statman in 1985): investors are **noticeably more willing to sell winners than losers.** In 1998 Terrance Odean analyzed about ten thousand brokerage accounts and found that investors realized gains at roughly 1.5 times the rate they realized losses — and the winners they sold tended to do **better** over the following year than the losers they kept. "Cut your profits and let your losses run" — precisely backward.

**Reference points can also mislead you.** If your reference point is "the high of this cycle," then even when you're up a lot overall, a 30% pullback from the peak *feels* like "losing 30%." The Bitcoin holder's lament "I used to have so much more" is exactly this kind of peak-anchored pain.

### ② FOMO and recency bias: the cost of chasing

**Recency bias**: people overweight what just happened and extrapolate the recent trend into the future. After a year of rising prices, people expect markedly higher returns next year; after a slump, the opposite — exactly contrary to what valuations signal (Stage 5.3: the higher the price, the lower the expected future return, as a rule).

**FOMO (fear of missing out)** is recency bias plus social comparison: watching others make money feels worse than losing money yourself. Its classic symptom is **performance chasing**: funds attract the most inflows after big gains and suffer the most outflows after big losses. The result is a lasting gap between what funds earn and what fund investors actually earn. Long-running studies by Morningstar and others find that, on average, investors lose roughly a percentage point a year to poor timing of their purchases and sales, with wider gaps in volatile categories.

Crypto markets are a FOMO amplifier: 24-hour trading, real-time price alerts, screenshots of overnight fortunes on social media, and no circuit breakers. A typical cycle: price breaks its old high → news and social chatter heat up → new money floods in and leverage builds (funding rates turn positive, Stage 7.1) → the last buyers arrive → a pullback triggers cascading liquidations (Stage 7.5) → panic. **The last money in usually belongs to the people most thoroughly convinced by the latest run-up.**

One simple question fights FOMO: **"If this asset hadn't gone up over the past year, would I still buy it at this price?"** If the answer is no, you're being driven by recency, not analysis.

### ③ Overconfidence and overtrading: your edge is smaller than you think

Most people think they're above-average drivers — a statistical impossibility. Investing is no different:

- **Overtrading.** Barber and Odean's 2000 study, "Trading Is Hazardous to Your Wealth," examined about 66,000 household accounts (1991–1996). The households that traded most earned net annual returns about 6 percentage points below the market, eaten mostly by trading costs and poor timing.
- **The illusion of control.** Constant screen-watching, chart-drawing and research make people feel they control the outcome; with more information, confidence rises much faster than accuracy.
- **Hindsight bias.** "I knew it was going to fall." Rewriting memory after the fact makes people overrate their judgment next time.

Overconfidence connects directly to Stage 11.4: **the win probability in the Kelly formula is an estimate you make.** If you overestimate your edge by a factor of two, you'll bet 2× Kelly — where long-run growth is about zero. **Mathematically, overconfidence is overbetting.** That's why rules like fractional Kelly and a per-trade risk cap are, in essence, "a discount on your own overconfidence."

### ④ Narrative and confirmation bias: stories beat numbers

Robert Shiller (Nobel Prize, 2013) argued in his 2017 presidential address to the American Economic Association and his 2019 book *Narrative Economics* that **stories spreading like viruses move economies and markets.** "This time is different," "a new paradigm," "digital gold," "death spiral" — a good story can reshape the expectations of millions of people within weeks.

**Confirmation bias** makes narratives self-reinforcing: people actively seek information that supports what they already believe and ignore or discount evidence against it. Social-media recommendation algorithms push this to the extreme: the "everyone is saying it" you see may just be the echo chamber you live in.

On Bitcoin and DATs, both sides have powerful narratives:

- **The bull narrative:** "Fiat money must be debased, Bitcoin is the only hard asset, DAT premiums will last forever, and BTC per share only goes up."
- **The bear narrative:** "DATs are Ponzi structures; the moment mNAV breaks below 1 they enter a death spiral; Bitcoin will go to zero."

**Both stories contain real logic, and each will look "proven right" at some stage.** Stages 16.2 and 18.3 replace stories with **checkable numbers** — mNAV, BTC Rating, dividend coverage — which is exactly how to fight narrative bias: **translate each story into a number you can check, then go check it. This lesson covers mechanics and analytical frameworks only; it is not investment advice.**

### ⑤ Leverage regret and discipline: write the rules before the panic

**Leverage regret** is where all the biases above converge. Overconfidence makes you add leverage (③), FOMO makes you add it near the top (②), loss aversion keeps you from cutting it on the way down (①) — until a margin call makes the decision for you and sells near the bottom. The price rebounds later and you're not there for it. **The cruelest thing about leverage isn't that it magnifies losses; it's that it takes away your right to wait.** As Stage 11.4 showed, at 10× leverage an adverse move of about 10% gets you liquidated.

The psychological conclusion is clear: **people can't reliably make good decisions under stress, so good decisions have to be made before the stress arrives.** Some proven "discipline devices":

- **An investment policy statement (IPS).** In calm times, write down your goals, asset allocation, maximum size for each holding, rebalancing rules and when you'll sell. In a crisis you follow the document instead of improvising.
- **Mechanical rebalancing** (Stage 11.2). On a schedule or when a threshold is crossed, return to target weights. It automatically makes you sell high and buy low — the opposite direction from FOMO and panic.
- **A per-trade risk cap** (Stage 11.4). If any single position goes completely wrong, you lose at most 1–2% of your total wealth. No single mistake can knock you out.
- **A pre-mortem.** Before buying, assume "a year from now this investment is down 60%" and write down the most likely reasons. It forces you to see the risks that confirmation bias was hiding.
- **Checklists.** Pilots and surgeons use checklists to prevent mistakes under pressure. The ten DAT questions of Stage 18.6 and the five news questions of Stage 20.3 are checklists for investing.
- **No margin leverage.** If you want more exposure, choose forms without margin calls (or lower your ambitions). That DATs choose long-dated liabilities without margin (Stage 16.4) is, in a sense, a way of avoiding leverage regret at the corporate level.

The last rule is the simplest: **look at prices less often.** Loss aversion makes every dip you see hurt more than every rise pleases, so the more often you look, the more "losses" you experience (Benartzi and Thaler called this "myopic loss aversion" in 1995). For a long-term holder, checking the price ten times a day only multiplies the chances of a bad decision.
`,

  demo: "behavioral-traps",

  analogy: `
Think of an investor's brain as **a car with two drivers.**

One is the **calm driver**: reads the map, watches the fuel gauge, sticks to the plan. The other is the **impulsive driver**: floors it when another car passes (FOMO), wants to turn around and go home after one scratch on the paint (loss aversion), decides after a few smooth miles that they're a race-car driver (overconfidence), and changes destination because of a great story on the radio (narrative bias).

Most of the time the calm driver has the wheel. But in **fast traffic, pouring rain or a jam** — a market spike or crash — the impulsive driver grabs it, at exactly the moment calm is needed most.

If the car also has a **turbocharger** (leverage), one stomp on the pedal can send it through the guardrail — and this car **automatically stalls in the middle of the road when it skids** (forced liquidation), so there's no chance to correct.

So experienced drivers don't try to "train the impulsive driver." Instead, **before setting off they write the route, speed limits and rest stops on a card taped to the dashboard** (an investment policy statement and a checklist), switch on **cruise control** (mechanical rebalancing), and **skip the turbo** (no margin leverage). Then, when the storm comes and the impulsive driver lunges for the wheel again, the car keeps following the plan.
`,

  misconceptions: [
    "**\"Now that I know about these biases, I won't fall for them.\"** — Behavioral biases are the default settings of human cognition; knowing about them removes only part of their effect. Kahneman himself said studying biases didn't make him immune. The reliable fix is to write rules in advance and use checklists and mechanical rebalancing, so that discipline rather than willpower makes the decision.",
    "**\"If I don't sell, it's not a real loss.\"** — That's the disposition effect and the reference point talking. A paper loss is already a real reduction in wealth; whether to sell should rest on \"would I buy this today with this money?\", not on the purchase price. Research shows the losers investors keep tend to do worse afterward than the winners they sell.",
    "**\"Everyone's buying, so it must keep going up.\"** — Recency bias and FOMO pull money in near the top. Funds attract the most money after big gains, and investors give up roughly a percentage point a year to bad timing. \"This time is different\" is among the most expensive sentences in finance.",
    "**\"The more I trade and research, the better my returns.\"** — Barber and Odean found the most active households earned about 6 percentage points a year less than the market. More information often raises confidence faster than accuracy, and overconfidence is, mathematically, overbetting (Stage 11.4).",
    "**\"Leverage just makes outcomes more extreme; it doesn't change the quality of decisions.\"** — Leverage takes away your right to wait: margin calls and liquidations sell for you at the worst moment. It also amplifies every emotional bias — losses hurt more, panic runs hotter. Many people who went all in with leverage at the top were eventually right about the direction but didn't survive to see it.",
  ],

  quiz: [
    {
      q: "A 50/50 bet: win $150 or lose $100. Most people refuse. What's the main psychological reason?",
      options: [
        "Loss aversion: a loss hurts roughly twice as much as an equal gain pleases",
        "The bet has a negative expected value",
        "People are risk-neutral",
        "Recency bias",
      ],
      answer: 0,
      explain: "The expected value is +$25, but with prospect theory's λ ≈ 2.25, the \"pain\" of losing $100 outweighs the \"joy\" of winning $150. **People typically want gains about twice the size of losses before taking a 50/50 bet.**",
    },
    {
      q: "What behavior does the \"disposition effect\" describe?",
      options: [
        "Periodically rebalancing a portfolio back to target weights",
        "The tendency to sell winning stocks too early and hold losing stocks too long",
        "Buying more when the market falls",
        "Holding only index funds",
      ],
      answer: 1,
      explain: "The disposition effect = cut your profits, let your losses run. It comes from loss aversion anchored on the purchase price: selling a loser means \"admitting the loss,\" so people put it off.",
    },
    {
      q: "Why is overconfidence \"mathematically the same as overbetting\"?",
      options: [
        "Overconfident people never bet",
        "Overconfidence lowers trading costs",
        "Overconfidence makes people treat all assets alike",
        "The Kelly fraction depends on the edge you estimate; overestimate your edge by a factor of two and you bet 2× Kelly, where long-run growth is about zero",
      ],
      answer: 3,
      explain: "Kelly's inputs are your estimated odds and payoff (Stage 11.4). **Systematically overestimating your edge → systematically betting too much → lower or even negative growth.** Fractional Kelly and per-trade risk caps are discounts on overconfidence.",
    },
    {
      q: "Which of these is **least** like a \"discipline device\" against behavioral bias?",
      options: [
        "A pre-written investment policy statement setting allocation, position limits and rebalancing rules",
        "Running a \"pre-mortem\" before buying",
        "Adding leverage on the fly when prices surge and social media is buzzing",
        "Capping any single position's worst-case loss at 1–2% of total wealth",
      ],
      answer: 2,
      explain: "Adding leverage on the fly because social media is hot is FOMO + narrative bias + overconfidence all at once. The other three make the decision before the stress arrives.",
    },
    {
      q: "What is the core mechanism of \"leverage regret\"?",
      options: [
        "Leverage makes returns smaller",
        "Margin calls and forced liquidation sell for you at the worst moment, taking away your right to wait for a rebound",
        "Leverage lowers an asset's volatility",
        "Leverage means you don't have to make any decisions",
      ],
      answer: 1,
      explain: "You can be right about the direction and still be liquidated out of it. **Leverage's cruelest effect is taking away your right to wait** — which is also why DATs choose long-dated liabilities without margin calls (Stage 16.4).",
    },
  ],

  further: [
    { label: "Kahneman & Tversky (1979), Prospect Theory: An Analysis of Decision under Risk (Econometrica, JSTOR)", url: "https://www.jstor.org/stable/1914185" },
    { label: "Barber & Odean (2000), Trading Is Hazardous to Your Wealth (Journal of Finance)", url: "https://faculty.haas.berkeley.edu/odean/papers%20current%20versions/individual_investor_performance_final.pdf" },
    { label: "Nobel Prize in Economic Sciences 2002: Daniel Kahneman (facts)", url: "https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman/facts/" },
    { label: "Robert Shiller (2017), Narrative Economics (AEA presidential address, NBER working paper)", url: "https://www.nber.org/papers/w23075" },
  ],
};
