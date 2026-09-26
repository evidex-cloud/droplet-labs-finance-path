export default {
  id: "ai-in-markets",
  stage: 19,
  order: 3,
  title: "AI Inside Markets: Algorithmic Trading, Research & Where the Edge Goes",
  difficulty: "mastery",
  prereqs: ["exchanges-brokers", "margin-liquidation", "behavioral-traps"],

  oneLiner:
    "When anyone can have an AI read a 10-Q, an earnings call and a thousand news stories in seconds, \"reading faster than the next person\" stops being an edge. This lesson runs from 1987's program trading and 2010's Flash Crash to today's AI research agents and nails down three things: **why an edge (alpha) decays**, **why everyone using the same models breeds crowding and stampedes**, and **where the scarce edge moves once information is cheap** — judgment, access, capital and patience.",

  intuition: `
Picture a small-town produce market. One day a stall owner notices a pattern: whenever it rains, greens get pricier the next day. She quietly stocks up on rainy days and sells high the morning after, and she has a fine year. That is an **edge** — in finance, **alpha**: something she knows that others don't.

The next year the stall next door notices she always stocks up when it rains, and copies her. By the third year the whole market stocks up on rainy days — so the next morning there are plenty of greens and **the price doesn't rise.** The pattern hasn't vanished, but **competition has eaten the profit.** Worse: one rainy day everybody overstocks, the sun comes out, nobody wants greens, and **everyone tries to dump at once.** Prices collapse and no one gets out clean.

That little story holds all three themes of this lesson:

1. **Edges decay.** Once a profitable pattern is discovered and copied, competition compresses the profit. Academic research finds that stock-return "anomalies" lose much of their average return after they are published.
2. **Crowding creates risk.** When everyone uses the same methods, data and models, their trading synchronizes, and at the first shock they stampede together — the liquidation cascades of Stage 7.5 and the fire sales of Stage 10.1.
3. **Edges move.** When one capability becomes cheap, scarcity migrates somewhere else.

AI pushes the first point to its limit. Reading every filing and call transcript for a company used to take a team of analysts several days; an AI research agent now does it in minutes, and almost anyone can afford one. **Information processing is becoming as cheap as tap water.** By the logic of Grossman and Stiglitz (1980), if information costs nothing to acquire, nobody can profit from it — **the cheaper information gets, the thinner the edge from knowing more, sooner.**

So where does the edge go? As we'll see, it moves to what AI is worst at or what is hardest to copy: **judgment in situations never seen before** (models are trained on the past), **access to what others can't get** (private markets, proprietary data, deal flow), **capital and patience others lack** (the ability to buy when others are forced to sell), and **self-control** (the behavioral traps of Stage 11.5).

This lesson sits on **Idea ④ Risk & leverage**: markets are self-reinforcing systems, and by making participants more alike, AI strengthens reflexivity (Stage 10.4). Within the tier: Stage 19.2 treated AI as **something being invested in**; this lesson treats AI as **a market participant**; and the next (Stage 19.4) goes further — AI agents that don't just trade but **pay for things themselves.** For the course's main thread, it also answers a very practical question: when everyone has an AI to compute mNAV, BTC Rating and dividend coverage (Stage 16.2, Stage 16.5), what is a DAT analyst still worth?

**We'll take this lesson in five pieces:**

- **① A short history of machines in markets: program trading, HFT and quant funds**
- **② AI research agents: when information processing gets cheap**
- **③ Alpha decay: why good strategies get "published to death"**
- **④ Crowding and synchronization: similar models, the same exit**
- **⑤ Where the edge moves: judgment, access, capital and discipline**
`,

  mechanics: `
### ① A short history of machines in markets: program trading, HFT and quant funds

Machines in markets didn't start with AI. Each wave brought efficiency — and each brought a new kind of crash.

<table>
<tr><th>Era</th><th>What the machines did</th><th>Signature event</th><th>Lesson</th></tr>
<tr><td>1980s</td><td>Program trading, "portfolio insurance" (sell futures by rule as prices fall)</td><td>Black Monday, October 19, 1987: the Dow fell about 22.6% in one day</td><td>Rule-based selling triggered all at once → a self-reinforcing fall</td></tr>
<tr><td>2000s</td><td>Electronic exchanges, statistical arbitrage, quant long-short</td><td>The August 2007 "quant quake": similar positions at many quant funds unwound together</td><td>When everyone holds similar positions, one fund's deleveraging hurts all</td></tr>
<tr><td>2010s</td><td>High-frequency trading, market-making algorithms (Stage 8.1)</td><td>The May 6, 2010 Flash Crash, a plunge and rebound within minutes; in 2012 a software fault cost Knight Capital about $440 million in roughly 45 minutes</td><td>Liquidity can vanish instantly under stress; a code bug is a financial risk</td></tr>
<tr><td>2020s</td><td>Machine learning, alternative data, on-chain bots (MEV, Stage 13.5), LLM research agents</td><td>October 10–11, 2025: about $19 billion of crypto liquidations in a cascade (Stage 7.5)</td><td>24/7 markets + high leverage + automation → faster stampedes</td></tr>
</table>

The pattern is clear: **machines cut trading costs and tighten spreads, making markets more efficient in normal times — but because they act on similar rules at the same moment, they amplify declines under stress.** AI doesn't change that pattern. It extends it into new territory: from executing trades to reading, analyzing and judging.

### ② AI research agents: when information processing gets cheap

A large share of the traditional "research edge" was really **information-processing capacity**: who could read the footnotes fastest, catch a shift in management's wording first, compare a hundred companies most systematically. Today an AI research agent can:

- Read a company's annual and quarterly reports, call transcripts and regulatory filings in minutes and extract the key numbers;
- Compare one metric across every company in an industry;
- Pull a DAT's 8-K filings every week and update its holdings, ATM issuance, mNAV and BTC Rating automatically (Stage 16.2, Stage 16.5);
- Map a headline to "which companies, which layer of the capital stack, which of the four ideas" is affected (the five questions of Stage 20.3).

**The marginal cost of processing information is heading toward zero.** The Grossman–Stiglitz paradox (1980) asks: if prices already reflected all information, nobody would pay to gather it — so how would prices come to reflect it? Markets can therefore only be "**efficient enough that extra effort isn't worth it**": information gatherers earn excess returns that just compensate their costs. AI slashes the cost of gathering and processing, so **on "easy" information, prices get faster and more accurate, and the room to profit from it shrinks.**

But AI research has three limits worth keeping in view:

- **Trained on the past.** Models excel at recognizing patterns seen before, while financial crises tend to be combinations never seen before (Stage 10.1).
- **Hallucinations and errors.** A confident, professional-sounding wrong number is more dangerous in investing than "I don't know." Every figure should trace back to a primary document — the reason for this course's fact discipline.
- **Homogenization.** If everyone asks the same models about the same documents, they get similar conclusions — which is the subject of the next two sections.

### ③ Alpha decay: why good strategies get "published to death"

**Alpha decay** is the decline of a strategy's excess return over time as imitators pile in. The best-known evidence comes from McLean and Pontiff (2016, Journal of Finance). They re-tested nearly a hundred stock-return anomalies documented in academic papers and found that returns were **about 26% lower out of sample and about 58% lower after publication.** Part of that is data mining in the original findings; part is that **investors read the papers and started trading them.**

A simple decay model:

$$
\\alpha_{\\text{current}} \\approx \\frac{\\alpha_{\\text{initial}}}{1 + k \\times N_{\\text{imitators}}}
$$

The number of imitators \\(N_{\\text{imitators}}\\) follows an S-curve over time; AI makes that S-curve steeper.

**A worked number:** a strategy starts with 6% annual alpha. With \\(k = 1\\), if imitators grow from 0 to 5, alpha falls to \\(\\dfrac{6\\%}{1 + 1 \\times 5} = 1\\%\\). If that diffusion used to take eight years (publication → industry learns → products launch), and AI now lets anyone replicate a paper's backtest in months, **the half-life of an edge can shrink from years to quarters.**

The new-era markets show this clearly. Bitcoin's "four-year cycle," mean reversion in DAT mNAV, the spread between preferred yields and Treasuries — once any of these becomes a widely discussed "pattern," large amounts of money trade it at once and the pattern itself bends (Stage 12.4, Stage 16.2).

### ④ Crowding and synchronization: similar models, the same exit

Alpha decay just thins the returns. **Crowding** fattens the risk. When many participants hold similar positions, their exit is the same door.

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><defs><marker id="mk-aime-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--red)"/></marker></defs><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The stampede loop of a crowded trade</text><rect x="235" y="36" width="170" height="44" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="56" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Similar models and data</text><text x="320" y="72" text-anchor="middle" font-size="10" fill="var(--muted)">everyone reaches similar views</text><rect x="455" y="112" width="170" height="44" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="540" y="132" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Similar positions</text><text x="540" y="148" text-anchor="middle" font-size="10" fill="var(--muted)">often with leverage</text><rect x="235" y="190" width="170" height="44" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="320" y="210" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">A shock triggers selling</text><text x="320" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">losses, margin calls, risk limits</text><rect x="15" y="112" width="170" height="44" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="100" y="132" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Prices fall</text><text x="100" y="148" text-anchor="middle" font-size="10" fill="var(--muted)">tripping others' limits</text><path d="M407,62 C470,70 520,85 535,108" fill="none" stroke="var(--muted)" stroke-width="2" marker-end="url(#mk-aime-a)"/><path d="M535,160 C520,185 470,205 409,210" fill="none" stroke="var(--red)" stroke-width="2" marker-end="url(#mk-aime-a)"/><path d="M233,210 C170,205 120,185 105,160" fill="none" stroke="var(--red)" stroke-width="2" marker-end="url(#mk-aime-a)"/><text x="320" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">fall → more selling → deeper fall</text><text x="320" y="140" text-anchor="middle" font-size="10" fill="var(--muted)">e.g. 2007 quant quake, 2010 Flash Crash,</text><text x="320" y="156" text-anchor="middle" font-size="10" fill="var(--muted)">Oct 2025 crypto liquidation cascade</text><text x="320" y="265" text-anchor="middle" font-size="10.5" fill="var(--muted)">AI makes step one more uniform: the same foundation models, the same public data, the same prompts</text></svg><figcaption>The danger of crowding isn't that a strategy is wrong; it's that too many people are right in the same way. With one exit door, a shock reinforces itself through risk limits and margin calls.</figcaption></figure>

Three points:

- **Correlations jump in a crisis.** Strategies that behave independently in calm markets sell the same assets at the same time under stress, and diversification fails (Stage 11.1).
- **Speed.** Automated risk management and liquidation compress the cascades of Stage 7.5 into minutes. A 24/7 crypto market has no closing bell to catch its breath.
- **The supervisory worry.** If many institutions rely on a handful of providers' foundation models, "model monoculture" can itself become a systemic risk — not unlike everyone relying on the same credit ratings before 2008 (Stage 10.2).

**Reflexivity strengthens.** AI-generated narratives, summaries and "sentiment signals" are read and traded by other AIs; the resulting price moves generate new narratives — Soros's loop from Stage 10.4, accelerated by machines.

### ⑤ Where the edge moves: judgment, access, capital and discipline

When information processing gets cheap, what's scarce changes. Lay out the possible sources of edge:

<table>
<tr><th>Source of edge</th><th>After AI</th><th>Why</th></tr>
<tr><td>Information speed (reading fast)</td><td>Much weaker</td><td>Everyone has a research agent</td></tr>
<tr><td>Statistical patterns in public data</td><td>Weaker, decays faster</td><td>Backtesting and replication cost almost nothing</td></tr>
<tr><td>Judgment in new situations</td><td>Relatively more valuable</td><td>Models learn from the past; crises are new combinations</td></tr>
<tr><td>Access (private deals, proprietary data, deal flow)</td><td>Relatively more valuable</td><td>Not in public text, so AI can't read it</td></tr>
<tr><td>Capital and patience (long horizon, never a forced seller)</td><td>Relatively more valuable</td><td>You supply liquidity when others must sell</td></tr>
<tr><td>Behavioral discipline</td><td>Still critical</td><td>No tool stops FOMO or panic (Stage 11.5)</td></tr>
<tr><td>Structural edge (balance-sheet design)</td><td>Still there</td><td>e.g., a DAT selling volatility through convertibles (Stage 7.3)</td></tr>
</table>

**The last row deserves special attention from readers of this course.** A DAT's "edge" doesn't come from predicting the bitcoin price better than anyone else; it comes from **the design of its balance sheet**: issuing stock at a premium, selling volatility through low-coupon convertibles, selling yield through preferreds (Stage 15.3). No AI research agent can copy that structural edge — but it does erode through **competition from the same structure** (more DATs) and **premium compression** (Stage 18.3). That is alpha decay at the level of a company.

For an ordinary reader, the practical conclusion is: **use AI as a checklist assistant, not an oracle.** Have it work through the ten questions of Stage 18.6 — checking data sources, computing metrics, listing the counterarguments — and keep judgment, position sizing (Stage 11.4) and discipline for yourself. This lesson covers mechanisms and analytical frameworks only; it is not investment advice. Stage 20.3 turns this method into five questions for reading the news.
`,

  demo: "ai-in-markets",

  analogy: `
Before AI, investment research was like **fishing on a big lake.** Whoever had the better rod, got up earlier or knew the underwater terrain caught more fish.

AI is like **handing every angler the same model of sonar fish-finder.** In week one, the early adopters haul in astonishing catches. In week two, everyone has one, and every boat motors to the same patch of water the sonar lights up — the fish are soon gone (alpha decay). In week three that patch is jammed with boats; a squall blows in, every boat turns for harbor at once, and they pile into each other at the narrow harbor mouth (crowding and the stampede).

Who still catches fish?
- **The old hand who reads the weather.** The sonar shows where the fish are now; the old hand knows where they go when a storm arrives (judgment).
- **The one with private water** nobody else can enter (access).
- **The one with the big boat, a full tank and no need to rush home.** When the squall hits and others dump their catch, they stay and buy cheap (capital and patience).
- **The one who doesn't follow the crowd.** Seeing a pile of boats in one spot, they go elsewhere (discipline).

**The fish-finder makes seeing fish cheap — so what becomes valuable is seeing what the fish-finder can't.**
`,

  misconceptions: [
    "**\"With AI, everyone can beat the market.\"** — If everyone uses the same tools on the same public information, the edges cancel out; the market as a whole can't beat itself. AI raises the market's average efficiency, not everyone's excess return.",
    "**\"AI will make markets calmer because machines don't panic.\"** — Machines don't panic, but they **act on similar rules at the same time.** Portfolio insurance in 1987, the 2007 quant quake and the 2010 Flash Crash were all automated rules triggering in sync. Homogeneity amplifies declines.",
    "**\"A strategy with a beautiful backtest will keep making money.\"** — Research finds that stock anomalies lose about 58% of their average return after publication. The easier a backtest is to run and the more people run it, the faster it gets copied and decays — and beware data mining.",
    "**\"An AI research agent's output can go straight into a decision.\"** — Models make mistakes, hallucinate and learn from the past. Every key number should trace back to a primary source (10-Q, 8-K, official data), and a human still owns the judgment and the position size.",
    "**\"The information edge is gone, so research is worthless.\"** — Research's value shifts from reading fast to asking the right questions, judging new situations, getting information others can't, and sticking to discipline. Cheap information makes those abilities **relatively more valuable.**",
  ],

  quiz: [
    {
      q: "McLean and Pontiff (2016) found that, after publication, stock-return anomalies lose roughly how much of their average return?",
      options: [
        "Almost nothing",
        "About 58%",
        "About 5%",
        "They all turn negative",
      ],
      answer: 1,
      explain: "About 26% lower out of sample and **about 58% lower after publication.** Some of it is data mining; some is investors learning about the anomaly and trading it — alpha decay.",
    },
    {
      q: "Using \"\\(\\alpha_{\\text{current}} \\approx \\dfrac{\\alpha_{\\text{initial}}}{1 + k \\times N_{\\text{imitators}}}\\),\" with initial alpha 6%, \\(k = 1\\) and 5 imitators, alpha is about:",
      options: [
        "1%",
        "6%",
        "5%",
        "30%",
      ],
      answer: 0,
      explain: "\\(\\dfrac{6\\%}{1 + 5} = \\mathbf{1\\%}\\). AI makes the imitator count grow faster, so decay is faster too.",
    },
    {
      q: "What does the Grossman–Stiglitz paradox imply for the AI era?",
      options: [
        "Markets become perfectly efficient and research is pointless",
        "AI will make information more expensive",
        "The cheaper information gets, the thinner the excess return from processing public information; the edge shifts to what is harder to obtain",
        "Only high-frequency traders can make money",
      ],
      answer: 2,
      explain: "Markets can only be efficient enough that extra effort isn't worth it. AI lowers the cost of processing information, so **that kind of edge shrinks** and scarcity moves to judgment, access, capital and discipline.",
    },
    {
      q: "Which of these best illustrates the risk that crowding creates?",
      options: [
        "A strategy's annual return drifting from 6% to 5%",
        "A stock's bid-ask spread tightening",
        "A company reporting better-than-expected earnings",
        "In August 2007, similar positions at many quant funds unwinding at once and hurting one another",
      ],
      answer: 3,
      explain: "Crowding's danger is **the simultaneous exit**: similar positions sold together under stress, so one fund's deleveraging hurts everyone. The 2007 quant quake is the classic case.",
    },
    {
      q: "Why is a DAT's edge unlikely to be copied directly by an AI research agent, yet still likely to decay?",
      options: [
        "Because DATs publish no data",
        "Because it comes from balance-sheet design (issuing at a premium, selling volatility and yield), which erodes through competition from the same structure and premium compression",
        "Because AI can't compute mNAV",
        "Because the bitcoin price can be predicted accurately",
      ],
      answer: 1,
      explain: "It's a **structural edge**, not an information edge. It decays as more DATs enter and mNAV premiums narrow (Stage 18.3) — alpha decay at the company level.",
    },
  ],

  further: [
    { label: "McLean & Pontiff (2016), Does Academic Research Destroy Stock Return Predictability? (Journal of Finance)", url: "https://onlinelibrary.wiley.com/doi/10.1111/jofi.12365" },
    { label: "Grossman & Stiglitz (1980), On the Impossibility of Informationally Efficient Markets (JSTOR)", url: "https://www.jstor.org/stable/1805228" },
    { label: "SEC & CFTC joint report on the market events of May 6, 2010", url: "https://www.sec.gov/news/studies/2010/marketevents-report.pdf" },
    { label: "Khandani & Lo, What Happened to the Quants in August 2007? (NBER working paper)", url: "https://www.nber.org/papers/w14465" },
  ],
};
