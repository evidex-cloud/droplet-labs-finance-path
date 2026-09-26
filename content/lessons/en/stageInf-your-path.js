export default {
  id: "your-path",
  stage: "∞",
  order: 2,
  title: "Your Opportunities: Working, Building & Investing in the New Finance",
  difficulty: "infinity",
  prereqs: ["open-questions", "cheat-sheet"],

  oneLiner:
    "What the new finance lacks most is neither people who understand bitcoin nor people who understand bonds. It is people who are **fluent in both languages**: who can read a 10-Q and on-chain data, who understand duration and how collateral moves on a blockchain. This lesson turns the whole course into a route you can act on: which of the four ideas each of six roles lives on, the three layers of skill they need, portfolio projects built from public data that prove what you can do, the missing stretches of plumbing worth building, the rules a private investor should set, and a learning roadmap into the sister courses and primary sources.",

  intuition: `
The natural question after finishing a course is: **now what?**

The first twenty stages gave you a map, from the 30-year Treasury to bitcoin, from the capital stack to tokenized plumbing, from mNAV to the BTC Rating. The previous lesson (Stage ∞.1) showed you five regions at the edge of that map that haven't been drawn yet. This lesson answers a question that sits outside the map: **where are you standing, and which way will you walk?**

Start with an observation. Over the past few years a distinctive kind of "bilingual" demand has appeared in the new finance. A concrete example: Strategy files an 8-K with the SEC almost every Monday. The one filed on September 21, 2026 said that as of September 20 it held 846,000 bitcoin at a total cost of about $63.8 billion, an average of about $75,416 each, and that during the week it had repurchased 1,771,238 shares of STRC for $174.0 million.

Someone who only speaks crypto looks at the bitcoin count. Someone who only speaks traditional finance looks at the buyback dollars. **Someone fluent in both** works out within ten minutes that the average buyback price was $174.0 million ÷ 1.77 million shares ≈ **$98.20**. That is far above the roughly $86.50 average of the July buybacks and less than 2% below the $100 stated amount. STRC's price had clearly recovered over two months, which is exactly what management was watching when it said it wanted STRC to show "sustained, healthy trading near $100" (Stage 17.4). The fluent reader then asks the next questions: how much annual dividend obligation did the buyback retire, and how many months does the USD Reserve now cover (Stage 16.6)?

**The ability to translate a filing into a change on a balance sheet** is what this course has been training all along, and it is the scarcest skill in the new finance. It doesn't belong to any one traditional job title, yet it is useful in many of them.

This lesson follows three paths:
- **Working**: joining an institution, whether a bank, asset manager, exchange, protocol, DAT, rating agency or regulator.
- **Building**: making your own products, protocols or tools to fill in the missing stretches of new plumbing.
- **Investing**: managing your own money. Everyone takes this path, even if they take neither of the others.

Two honest caveats. First, **hiring in the new finance is highly cyclical.** Bitcoin fell about 54% from its October 2025 high to July 2026, many DATs dropped below 1x mNAV over the same period, and crypto-native firms usually shrink in bear markets. Meanwhile, tokenization projects at traditional institutions (the DTCC pilot, Nasdaq's and NYSE's tokenized-securities rules) kept moving forward. **People fluent in both languages are the least exposed to the cycle.** Second, this lesson is no career guarantee and **not investment advice**. It offers frameworks and routes.

The lesson uses the four ideas as career lenses. Each role lives mainly on one or two of them: rates strategists on Idea ①, credit analysts on Ideas ② and ④, DeFi builders and tokenization teams on Idea ③, risk managers on Idea ④. Choosing a path means choosing which idea to sharpen first. The next lesson (Stage ∞.3) is your first portfolio piece: a complete analysis written from macro all the way down to a capital stack.

**This lesson breaks into six parts:**

- **① Six roles: a map of work in the new finance**
- **② The skill stack: concepts, tools, judgment**
- **③ A portfolio: prove it with public data**
- **④ Building: what the new plumbing actually lacks**
- **⑤ As an investor: set rules for your own money first**
- **⑥ A learning roadmap: from this course to the sister courses and primary sources**
`,

  mechanics: `
### ① Six roles: a map of work in the new finance

None of these six roles is unique to the new finance, but each has gained a "new language" in the new era. The "Main ideas" column tells you which of the four ideas the role leans on most; "Key stages" are your entry points for review.

<table><tr><th>Role</th><th>What the day looks like</th><th>Main ideas</th><th>Key stages</th><th>What the new era adds</th></tr><tr><td><b>Credit analyst</b></td><td>Judging whether a claim gets paid in full and on time</td><td>② ④</td><td>4.6, 6.1–6.6, 16.5, 18.1</td><td>Bitcoin-backed preferreds: BTC Rating, months of cover, perpetual structures without covenants</td></tr><tr><td><b>DAT / equity analyst</b></td><td>Valuing companies and tracking per-share metrics</td><td>② ④</td><td>5.3, 5.5, 15–18</td><td>Four mNAV definitions, BTC per share, the flywheel and reflexivity</td></tr><tr><td><b>Macro / rates strategist</b></td><td>Calling rates, the curve and liquidity</td><td>① ③</td><td>2.4, 4.3–4.5, 9.1–9.5, 20.2</td><td>Term premium, stablecoin demand for bills, AI capex hitting the long end</td></tr><tr><td><b>DeFi builder / protocol risk</b></td><td>Writing and auditing smart contracts; designing liquidations and oracles</td><td>③ ④</td><td>13.1–13.6, 10.5</td><td>The whole role is new, but underneath it is still collateral ratios and runs</td></tr><tr><td><b>Tokenization / product and compliance</b></td><td>Moving funds, Treasuries and stocks on-chain while keeping legal ownership intact</td><td>③ ②</td><td>8.2, 14.1–14.5</td><td>Transfer agents, KYC pools, venues under the SEC innovation exemption</td></tr><tr><td><b>Risk / treasury manager</b></td><td>Measuring and limiting losses; managing liquidity</td><td>④ ③</td><td>11.1–11.4, 16.6, 18.2</td><td>24/7 markets, on-chain liquidation cascades, bitcoin as a reserve asset</td></tr></table>

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Six roles × four ideas: which one to sharpen first</text><g font-size="11" fill="var(--muted)" text-anchor="middle"><text x="330" y="50">① Price of time</text><text x="420" y="50">② Balance sheets</text><text x="510" y="50">③ Plumbing</text><text x="600" y="50">④ Risk &amp; leverage</text></g><g font-size="11" fill="var(--ink)"><text x="20" y="84">Credit analyst</text><text x="20" y="122">DAT / equity analyst</text><text x="20" y="160">Macro / rates strategist</text><text x="20" y="198">DeFi builder</text><text x="20" y="236">Tokenization / compliance</text><text x="20" y="274">Risk / treasury manager</text></g><g stroke="var(--line)"><line x1="20" y1="98" x2="630" y2="98"/><line x1="20" y1="136" x2="630" y2="136"/><line x1="20" y1="174" x2="630" y2="174"/><line x1="20" y1="212" x2="630" y2="212"/><line x1="20" y1="250" x2="630" y2="250"/></g><g><circle cx="330" cy="80" r="6" fill="var(--orange-soft)" stroke="var(--orange)"/><circle cx="420" cy="80" r="11" fill="var(--orange)"/><circle cx="510" cy="80" r="6" fill="var(--orange-soft)" stroke="var(--orange)"/><circle cx="600" cy="80" r="11" fill="var(--orange)"/><circle cx="330" cy="118" r="8" fill="var(--btc-soft)" stroke="var(--btc)"/><circle cx="420" cy="118" r="11" fill="var(--btc)"/><circle cx="510" cy="118" r="6" fill="var(--btc-soft)" stroke="var(--btc)"/><circle cx="600" cy="118" r="11" fill="var(--btc)"/><circle cx="330" cy="156" r="11" fill="var(--blue)"/><circle cx="420" cy="156" r="6" fill="var(--blue-soft)" stroke="var(--blue)"/><circle cx="510" cy="156" r="11" fill="var(--blue)"/><circle cx="600" cy="156" r="8" fill="var(--blue-soft)" stroke="var(--blue)"/><circle cx="330" cy="194" r="5" fill="var(--green-soft)" stroke="var(--green)"/><circle cx="420" cy="194" r="8" fill="var(--green-soft)" stroke="var(--green)"/><circle cx="510" cy="194" r="11" fill="var(--green)"/><circle cx="600" cy="194" r="11" fill="var(--green)"/><circle cx="330" cy="232" r="6" fill="var(--green-soft)" stroke="var(--green)"/><circle cx="420" cy="232" r="11" fill="var(--green)"/><circle cx="510" cy="232" r="11" fill="var(--green)"/><circle cx="600" cy="232" r="6" fill="var(--green-soft)" stroke="var(--green)"/><circle cx="330" cy="270" r="8" fill="var(--red-soft)" stroke="var(--red)"/><circle cx="420" cy="270" r="8" fill="var(--red-soft)" stroke="var(--red)"/><circle cx="510" cy="270" r="11" fill="var(--red)"/><circle cx="600" cy="270" r="11" fill="var(--red)"/></g><text x="320" y="296" text-anchor="middle" font-size="10" fill="var(--muted)">Large solid dot = core dependency; small hollow dot = need to know, not the daily battlefield</text></svg><figcaption>Every role needs all four ideas, but the daily battlefield is one or two of them. Sharpen that first, then fill in the rest.</figcaption></figure>

A common misunderstanding is that new-finance jobs all sit inside crypto companies. In practice many of the most interesting roles are **at the seams**. Should a rating agency build a method for bitcoin-backed preferreds (question ① of Stage ∞.1)? Should an asset manager accept tokenized money funds as collateral? Should a bank's treasury desk hold stablecoins? How does a DAT's investor-relations team explain the BTC Rating to traditional credit buyers? **The seams have the fewest people and the hardest jobs to replace.**

### ② The skill stack: concepts, tools, judgment

Think of skills as a three-story building. The higher the floor, the harder it is for a machine to take over (Stage 19.3: once AI research agents make information processing cheap, the remaining edge is judgment, access and capital).

**Ground floor: concepts.** Explain each of the following in two minutes with no notes, and produce the number:
- Why a rise in the 30-year Treasury yield from 5% to 6% knocks about 14% off its price (modified duration about 15.5, Stage 4.4).
- Why a perpetual preferred paying $10 a year is worth only about $83.30 when investors require 12% (Stage 18.1).
- Why Orange Corp issuing 10 million shares at 1.5x mNAV to buy bitcoin raises bitcoin per share by about 4.5% (Stage 16.7).
- Why stablecoin growth draws money out of bank deposits (Stage 14.5).

The cheat sheet in Stage 20.4 is the syllabus for this floor.

**Second floor: tools.**
- **Spreadsheets:** present value, IRR, goal seek, scenario tables. Still the lingua franca of finance.
- **Primary filings:** the 10-K (annual report), 10-Q (quarterly report), 8-K (material events; Strategy files one almost weekly), 424B5 prospectus supplements (where preferred terms live), and FWPs (free-writing prospectuses; Strategy's "investor briefings"). The SEC's [EDGAR search](https://www.sec.gov/edgar/search/) is free.
- **Data:** [FRED](https://fred.stlouisfed.org/) for rates, inflation and jobs; the Treasury's yield-curve files; DefiLlama for stablecoins and DeFi; rwa.xyz for tokenized assets; bitcointreasuries.net for public-company holdings.
- **Code:** Python or similar to pull data, chart it and run Monte Carlo; builders also need smart-contract and security fundamentals.

**Top floor: judgment.**
- **Definition discipline:** always ask "on which definition?" The same Orange Corp can show an mNAV of 1.50, 1.59, 1.77 or 2.05 (Stage 16.2).
- **Probabilistic thinking:** as in Stage ∞.1, give an open question a probability and write down the signposts that would change it.
- **Checklists and writing:** the ten questions of Stage 18.6, and turning analysis into one page someone can read in five minutes (Stage ∞.3).

### ③ A portfolio: prove it with public data

Nobody believes "familiar with DAT metrics" on a résumé. Show a tracker that updates weekly with every figure dated and defined, and people know at a glance that you can do it. The four projects below use only public data, and each maps to a group of stages in this course.

**Project A: a weekly DAT tracker (Stages 15–16).** Every Monday, read Strategy's 8-K and update bitcoin holdings, the USD Reserve and the notional of each preferred; then compute mNAV on all four definitions and bitcoin per share on both share counts. The hard part is not the arithmetic but **definitions and dates**. In 2026, for example, Strategy switched its mNAV definition from "enterprise value ÷ bitcoin NAV" to "share price ÷ net bitcoin per share", so the two histories cannot simply be spliced together.

**Project B: a bitcoin-preferreds comparison sheet (Stages 17–18).** Put STRF, STRC, STRK, STRD, STRE and Strive's SATA in one table: dividend rate, cumulative or not, seniority, payment frequency, convertibility, current yield, duration, BTC Rating. Add two benchmark rows: the 3-month bill (about 4.24% on September 25, 2026) and the 30-year Treasury (about 5.49%). **The table is itself a piece of credit research.**

**Project C: a new-plumbing dashboard (Stages 13–14).** Track total stablecoin supply (about $312 billion on September 26, 2026), the USDT and USDC shares, the size of tokenized Treasuries (about $15 to $16 billion by mid-2026), and their share of the bill market. A single chart shows where questions ③ and ④ of Stage ∞.1 are heading.

**Project D: a one-page stress-test memo (Stage 18.2).** Use Orange Corp: bitcoin −80%, capital markets shut for 24 months. State the coverage of each layer (the convertible layer falls from 6.7x to about 1.3x), how many months the USD reserve lasts, and how much cash the first put date requires. **One page, three numbers, one conclusion** is exactly the format employers want to see.

### ④ Building: what the new plumbing actually lacks

The builder's most common mistake is making a flashier version of something old. A better question is: **which stretch of the new plumbing hasn't been laid yet?** This course points to at least four:

1. **A neutral measurement standard.** Every DAT defines its own metrics. Strategy's Amplification is "BTC Reserve ÷ Net Reserve", while Strive's Amplification Ratio is "(debt + preferred) ÷ bitcoin value" (Stage 16.4); mNAV has at least four definitions (Stage 16.2). A neutral, transparent, reproducible standard is a public good that investors and rating agencies both need.
2. **Infrastructure for bitcoin credit.** Rating methods, secondary-market liquidity, data products aimed at traditional credit buyers. These decide whether question ① of Stage ∞.1 can get a "yes".
3. **Compliant tokenized trading venues.** The SEC's "innovation exemption" of September 17, 2026 lets qualifying "Tokenized Securities Venues" trade tokenized listed stocks, including through permissioned AMM liquidity pools, on conditions such as full shareholder rights, publicly auditable smart contracts and halts that follow the underlying. It is a door that has just opened, and behind it you need a full kit for transfer, custody, KYC and market making.
4. **Money for AI agents.** In the 30 days to September 26, 2026, x402 handled about 75.4 million transactions worth about $24 million, averaging roughly $0.30 each (Stage 19.4). Huge counts and tiny dollars mean the demand is there but the business model has not yet taken shape.

The **lessons of failure** matter just as much. FTX taught custody and misappropriation (Stage 10.5); Terra taught what happens when you collateralize yourself with your own token. In February 2025 Bybit lost about $1.5 billion to hackers, and in April 2026 an attack on KelpDAO's bridge cost about $290 million and left bad debt at Aave (Stage 13.6). On the regulatory side, the GENIUS Act is law, but the CLARITY market-structure bill failed a Senate cloture vote 49 to 50 on September 15, 2026. **The rules are still moving, so builders should leave headroom for compliance.**

### ⑤ As an investor: set rules for your own money first

**This section offers frameworks only. It is not investment advice or tax advice.** Whether or not you take the first two paths, you will manage your own money. What this course offers is not a buy list but five rules.

**Rule one: know which claim you own.** Four ways to be "in bitcoin" are four entirely different claims: self-custodied bitcoin, spot ETF shares, DAT common and DAT preferred (Stage 15.5). Who owes you what, where you rank, whether you can be diluted, and what's left after a 70% fall (Stage 17.6).

**Rule two: size positions by volatility.** Volatility eats compounding. For an asset with 60% annual volatility, the geometric (compounded) return runs roughly σ²/2 = **18 percentage points** below the arithmetic average; add 2x leverage and volatility becomes 120%, so the drag becomes about **72 points** (Stages 16.4 and 11.4). That is why "amplified bitcoin" instruments call for smaller positions than bitcoin itself.

$$
Volatility drag ≈ σ² ÷ 2
σ = 60% → 0.36 ÷ 2 = 18%
2x leverage: σ = 120% → 1.44 ÷ 2 = 72%
$$

**Rule three: run the checklist before you buy.** The ten questions of Stage 18.6, plus one more: what is the time horizon of this money?

**Rule four: write down your thesis and the signposts that would change your mind.** As in Stage ∞.1, write "what would make me sell" at the moment you buy. If you don't, you will invent a reason on the way down (the narrative bias of Stage 11.5).

**Rule five: taxes and fees are certain; returns are not.** For example, Strategy and Strive expect their preferred dividends to be treated as return of capital, which lowers your cost basis instead of being taxed in the current year (Stage 17.7). Whether that applies to you depends on your jurisdiction and circumstances.

### ⑥ A learning roadmap: from this course to the sister courses and primary sources

This course is a panorama; every region has deeper ground to explore. Here is where to go by topic:

- **To master derivatives and volatility** (Stage 7, and the convertible arbitrage of Stage 17.2): [Options Path](https://evidex-cloud.github.io/droplet-labs-options-path/)
- **To go deep on tokenization and real-world assets** (Stage 14): [RWA Path](https://evidex-cloud.github.io/droplet-labs-rwa-path/)
- **To understand bitcoin from the protocol up** (Stage 12): [Satoshi Path](https://evidex-cloud.github.io/nextdawn-satoshi-path/)
- **To re-examine money, interest and cycles from another school of thought** (Stages 1, 9 and 10): [Austrian Path](https://evidex-cloud.github.io/droplet-labs-austrian-path/)

A sample 12-week plan (about 6 to 8 hours a week; stretch or compress as needed):

<table><tr><th>Weeks</th><th>What to do</th><th>Output</th></tr><tr><td>1–2</td><td>Re-derive every formula on the Stage 20.4 cheat sheet without looking</td><td>Your own one-page formula sheet</td></tr><tr><td>3–4</td><td>Read one Strategy or Strive 10-Q cover to cover</td><td>A one-page "balance-sheet changes" note</td></tr><tr><td>5–6</td><td>Build Project A or Project B</td><td>A dated, clearly defined table</td></tr><tr><td>7–8</td><td>Options Path (volatility, convertibles)</td><td>A worked convertible-arbitrage P&amp;L</td></tr><tr><td>9–10</td><td>RWA Path or Satoshi Path (pick by role)</td><td>The Project C dashboard</td></tr><tr><td>11–12</td><td>Finish the Stage ∞.3 capstone and publish it</td><td>A complete analytical report</td></tr></table>

Primary sources repay your time better than commentary: raw data from the Fed and the Treasury, companies' own SEC filings, protocols' own documentation. The classics still earn their keep too. Irving Fisher's "The Theory of Interest" (1930) is the source of Idea ①; Markowitz's 1952 paper is the source of diversification; Minsky's "Stabilizing an Unstable Economy" (1986) and Soros's "The Alchemy of Finance" (1987) explain reflexivity and crises; Satoshi Nakamoto's 2008 white paper is nine pages long. **Read the originals, compute the numbers, write it down.** Do those three things for a year and you will be one of the scarce people at the seams. The next lesson, Stage ∞.3, starts with "write it down".
`,

  demo: "your-path",

  analogy: `
Picture the new finance as a **port city in the middle of an expansion**.

The old town is traditional finance: docks (exchanges), warehouses (custody), customs (clearing and regulation) and banks. It has run for centuries under a thick rulebook, and cargo rarely goes missing. The new district is bitcoin, DeFi and tokenization: the docks are open 24 hours, cargo is containerized, loading is far faster, but some warehouses are brand new and a few have already collapsed (Stage 10.5). DATs and stablecoins are **the bridges between the two districts**.

In this city:
- **Credit analysts** are the inspectors who check whether each crate is worth what its label says.
- **Rates strategists** watch the tides. When the tide (interest rates) shifts, every ship's draft shifts with it.
- **DeFi builders** are putting up docks and cranes in the new district.
- **Tokenization teams** are building the bridges, and making sure cargo crossing them is recognized in law on both sides.
- **Risk managers** are the harbor safety officers whose job is to imagine the typhoon.
- **Private investors** are the small merchants buying stock at the port every day.

The people in highest demand **know both districts**: why the old warehouses were built the way they were, and why the new cranes are ten times faster. The city is still expanding and the bridges aren't finished, which is why now is when the opportunities are greatest, and why you should bring a map and a hard hat.
`,

  misconceptions: [
    "**\"New-finance jobs are all at crypto companies; traditional finance knowledge is obsolete.\"** The scarcest people are exactly those at the seams, who can read a 10-Q and on-chain data. DTCC, Nasdaq and NYSE are all pushing tokenization, and rating agencies, asset managers and bank treasuries all have to deal with bitcoin credit and stablecoins. Traditional knowledge is the foundation, not baggage.",
    "**\"Learn to code first; everything else can wait.\"** The tools floor matters, but it is the floor AI takes over most easily. The concepts floor (computing duration, mNAV, coverage) and the judgment floor (definition discipline, probabilistic thinking, writing) decide whether your analysis is worth anything.",
    "**\"A portfolio has to be complex to be convincing.\"** A weekly tracker with every date and definition spelled out, or a one-page stress-test memo with three numbers and a conclusion, persuades more than a complex model nobody can reproduce. Reproducible and traceable is the mark of a professional.",
    "**\"After this course I'll be able to tell which DAT or which preferred to buy.\"** The course gives frameworks, not investment advice. A framework tells you which questions to ask, which numbers to compute and which layer carries the risk. It won't decide for you and it doesn't forecast prices. Position size, horizon and taxes depend on your own situation.",
    "**\"You shouldn't enter the field during a bear market.\"** The cycle hits crypto-native hiring hard, but a bear market is also the cheapest time to learn and the clearest time to see real structure. The 2026 decline put coverage multiples, USD reserves and mNAV compression through a real stress test. When you enter matters less than the map you bring.",
  ],

  quiz: [
    {
      q: "Strategy's 8-K of September 21, 2026 showed it bought back 1,771,238 STRC shares for $174.0 million in a week. What was the average buyback price, and what does it suggest?",
      options: [
        "About $86.50, showing STRC still at a deep discount",
        "About $98.20, close to the $100 stated amount, showing STRC's price had clearly recovered since July",
        "About $174, showing STRC at a big premium",
        "It can't be worked out from the 8-K",
      ],
      answer: 1,
      explain: "$174.0M ÷ 1.77M shares ≈ **$98.20**, above July's average of about $86.50 and close to par. Translating a filing into changes in a balance sheet and a price is the bilingual skill.",
    },
    {
      q: "An asset has 60% annual volatility. With 2x leverage, what is the approximate volatility drag using σ²/2?",
      options: ["About 18 points", "About 36 points", "About 120 points", "About 72 points"],
      answer: 3,
      explain: "2x leverage makes volatility 120%, so the drag ≈ 1.2² ÷ 2 = **0.72**. Leverage quadruples the drag (it scales with the square), which is why amplified instruments call for smaller positions (Stage 16.4).",
    },
    {
      q: "Which best describes a \"missing stretch of plumbing\" identified in this lesson?",
      options: [
        "A neutral, transparent, reproducible standard for DAT metrics, since companies define Amplification and mNAV differently",
        "More bitcoin mining machines",
        "A brand-new cryptocurrency",
        "Abolishing all regulation",
      ],
      answer: 0,
      explain: "Strategy's Amplification is BTC Reserve ÷ Net Reserve; Strive's Amplification Ratio is (debt + preferred) ÷ bitcoin value; mNAV has at least four definitions. A **neutral measurement standard** is a public good investors and rating agencies both need.",
    },
    {
      q: "In this lesson's three-floor skill stack, which floor is most easily taken over by AI and so least able to stand alone as an edge?",
      options: ["Concepts", "Judgment", "Tools", "All three equally"],
      answer: 2,
      explain: "The tools floor (pulling data, running spreadsheets, writing scripts) matters but automates most easily. **Concepts and judgment** (computing the number, naming the definition, giving a probability and writing one page) are what's hard to replace (Stage 19.3).",
    },
    {
      q: "If you want to go deep on convertible arbitrage and volatility trading, which sister course does this lesson point to?",
      options: ["Austrian Path", "RWA Path", "Satoshi Path", "Options Path"],
      answer: 3,
      explain: "A convertible is a bond floor plus a call option (Stage 6.4), and convertible arbitrage is buying volatility (Stage 17.2). **Options Path** is the course that goes deep on exactly that.",
    },
  ],

  further: [
    { label: "Options Path (sister course): options, volatility and convertibles in depth", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
    { label: "RWA Path (sister course): tokenization and real-world assets", url: "https://evidex-cloud.github.io/droplet-labs-rwa-path/" },
    { label: "Satoshi Path (sister course): bitcoin from the protocol up", url: "https://evidex-cloud.github.io/nextdawn-satoshi-path/" },
    { label: "Austrian Path (sister course): another lens on money, interest and cycles", url: "https://evidex-cloud.github.io/droplet-labs-austrian-path/" },
    { label: "SEC EDGAR full-text search: read 10-Ks, 10-Qs, 8-Ks and prospectuses for free", url: "https://www.sec.gov/edgar/search/" },
  ],
};
