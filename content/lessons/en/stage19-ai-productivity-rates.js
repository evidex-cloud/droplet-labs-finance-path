export default {
  id: "ai-productivity-rates",
  stage: 19,
  order: 1,
  title: "AI, Productivity & Interest Rates: r* in an AI Boom",
  difficulty: "mastery",
  prereqs: ["risk-free-rate", "long-bond-30y", "fiscal-dominance"],

  oneLiner:
    "If AI really adds a percentage point a year to growth, do interest rates go up or down? The answer hinges on a number nobody can see: the **neutral rate, \\(r^{*}\\)** — the real rate that neither stimulates nor restrains the economy. AI pulls on both ends of it at once: **an investment boom and the expectation of being richer tomorrow push it up**, while **concentrated profits, cheap intelligence and a glut of savings drag it down**. This lesson takes \\(r^{*}\\) apart, plugs it back into the formula for the 30-year Treasury yield, and traces how AI reaches bonds, stocks, Bitcoin and DAT preferreds through that one pipe.",

  intuition: `
Remember the three headlines that Lin, our complete beginner, scrolled past back in Stage 0.1? By now all three are unlocked. "The 30-year Treasury yield breaks above 5%" was taken apart in Stage 4.5 (as of late September 2026 it had climbed to about 5.5%, the highest since 2004). "Tokenized funds, stablecoins and DeFi are rewiring finance" was covered in Stages 13 and 14. "Strategy issues a Bitcoin-backed preferred yielding about 10%" was the subject of the whole DAT tier. **This final tier puts them on one map — and the 2026 version of that map has a force nobody can route around: AI.** Lin now asks a grown-up question: does AI make interest rates higher or lower?

Start with a household. Your neighbor Jordan just landed a job with a modest starting salary but a brilliant outlook — everyone expects the paycheck to double within five years. How does Jordan behave? **Spend more now, save less, maybe borrow for a car**, because future Jordan will be richer. If a whole society thinks like Jordan, fewer people want to save (lend) and more want to borrow, so **the price of borrowing — the interest rate — goes up.**

That is one of the oldest relationships in economics: **the faster people expect to grow, the higher the equilibrium interest rate.** Add a second force. Companies see the AI opportunity and set out to build data centers, buy chips and extend the power grid — hundreds of billions of dollars a year that has to be financed. **More borrowers again push rates up.**

But there is another half to the story. Suppose the gains from AI flow mainly to a handful of companies and their shareholders, who already save a lot and spend relatively little, while the share of income going to workers falls. Then society as a whole **saves more**, money hunts for a home, and **rates get pushed down.** Suppose also that AI makes a long list of services — translation, customer support, coding, first-pass legal or medical triage — steadily cheaper. **Prices rise more slowly or even fall**, and the part of nominal interest rates that compensates for inflation shrinks too.

So AI does not push rates in one direction. It starts **a tug-of-war**, and the outcome sets an invisible number: the **neutral rate, \\(r^{*}\\)**, the real interest rate that keeps the economy neither overheating nor cooling. Think of it as the normal water level of a river. The Fed controls a sluice gate (the federal funds rate, Stage 1.3), but the water level itself is set by rainfall and evaporation across the whole basin — that is, by society's saving and investment.

Why give this its own lesson? Because **\\(r^{*}\\) is the foundation under every asset price.** Stage 2.4 established that any asset is worth its future cash flows discounted at "risk-free rate plus risk premia," and \\(\\text{long-term risk-free rate} \\approx \\text{expected path of } r^{*} + \\text{expected inflation} + \\text{term premium}\\) (Stage 4.3). If AI lifts \\(r^{*}\\) by a percentage point, a 30-year Treasury loses about 14% of its value (the duration intuition from Stage 4.4). If AI drags \\(r^{*}\\) down, every long-duration asset — growth stocks, perpetual preferreds, and Bitcoin, which has no cash flows and is priced against its opportunity cost — gets repriced the other way.

This lesson sits squarely on **Idea ① The price of time.** The first thing AI changes is what time costs. The next lesson (Stage 19.2) follows the investment boom to **how it is being financed**; Stage 19.5 returns to the other end of the rope, **AI-driven deflation**; and Stage 20.1 wires it all back into Lin's first headline.

**We'll take this lesson in five pieces:**

- **① The neutral rate \\(r^{*}\\): invisible, yet it sets everything**
- **② The forces pulling up: growth expectations and the investment boom**
- **③ The forces pulling down: concentrated savings, cheap intelligence, deflation**
- **④ Putting \\(r^{*}\\) back into long yields: inflation expectations and the term premium**
- **⑤ Who wins, who loses: bonds, stocks, Bitcoin and DAT preferreds**
`,

  mechanics: `
### ① The neutral rate \\(r^{*}\\): invisible, yet it sets everything

The **neutral rate** (\\(r^{*}\\), also called the natural rate) is a **real** interest rate: the one at which, with the economy at full employment and stable inflation, saving exactly equals investment. You cannot observe it; you can only estimate it with a model. The best-known estimates come from the New York Fed's Laubach–Williams model and its successor, Holston–Laubach–Williams. Their common finding: **US \\(r^{*}\\) fell from above 2% in the 1990s to around 1% or lower in the 2010s.** That was the era of "secular stagnation" — aging populations, a global saving glut and an enormous appetite for safe assets held rates near the floor.

The simplest theory comes from Frank Ramsey's work on optimal saving:

$$
r^{*} \\approx \\rho + \\theta \\times g
$$

Here \\(\\rho\\) is time preference (how impatient people are); \\(\\theta\\) is how much people care about smoothing consumption; \\(g\\) is trend growth of consumption (income) per person.

The intuition: if people expect to be richer later (high \\(g\\)), they won't save much for a future that already looks comfortable, so only a higher rate persuades them to lend. **A worked number:** set \\(\\rho = 1\\%\\) and \\(\\theta = 1\\). If trend growth \\(g\\) rises from 1.5% (roughly the average annual growth of US nonfarm productivity from 2007 to 2019) to 2.5%, the model's \\(r^{*}\\) climbs from 2.5% to 3.5%:

$$
g = 1.5\\%:\\quad r^{*} \\approx 1\\% + 1 \\times 1.5\\% = 2.5\\%
g = 2.5\\%:\\quad r^{*} \\approx 1\\% + 1 \\times 2.5\\% = 3.5\\%
$$

**One extra point of growth, roughly one extra point of interest.**

Real-world \\(r^{*}\\) sits below this toy formula because of a second layer: the **market for loanable funds.** Saving is the supply of funds, investment is the demand, and \\(r^{*}\\) is where they cross. Anything that raises saving (aging, income concentration, foreign central banks piling up Treasuries) pushes \\(r^{*}\\) down; anything that raises investment demand (new technology, rebuilding, defense) or government borrowing (Stage 3.3, Stage 9.4) pushes it up.

**Why the Fed cares:** policy is only "tight" if the policy rate sits above \\(r^{*}\\) and "loose" if it sits below (the transmission story of Stage 9.2). On September 16, 2026 the Fed raised the federal funds target to 3.75–4.00%. How restrictive that is depends entirely on where you think \\(r^{*}\\) is. If AI has already lifted \\(r^{*}\\), the same 4% is much less tight than it looks.

### ② The forces pulling up: growth expectations and the investment boom

AI pulls \\(r^{*}\\) upward through two channels.

**First, growth expectations (the \\(\\theta \\times g\\) term).** If markets believe AI will lift US productivity growth from the roughly 1.5% of the last decade to 2.5% or more, households and firms start spending tomorrow's income today, and the equilibrium rate rises.

**Second, investment demand (the demand curve for loanable funds shifts right).** This is the part you can see in 2025–26. Based on company guidance and industry tallies in the fact sheet (as of September 2026): Alphabet raised its 2026 capex guidance to $195–205 billion, Meta to $135–145 billion, Microsoft to roughly $175 billion for calendar 2026, and Amazon to roughly $200 billion or more (that last figure comes from secondary sources). **Together, the four spend about $720–745 billion in 2026, up about 75% from about $410 billion in 2025.** And more and more of that money comes not from operating cash flow but from bonds, stock sales and off-balance-sheet vehicles (Stage 19.2 covers this in detail).

Why does investment demand raise rates? Because **it competes with the government, with mortgage borrowers and with every other company for the same pool of savings.** In September 2026 the US 10-year yield was about 5.2% (the highest since 2007) and the 30-year about 5.5% (the highest since 2004). The drivers the press listed included the oil shock, a hawkish Fed, strong activity data, heavy Treasury issuance — **and record long-dated corporate bond issuance to fund AI data centers.** That is the most direct real-world evidence of AI raising rates: not a theoretical \\(r^{*}\\), but a very concrete **supply of long-term bonds.**

**A historical parallel: the late 1990s.** The internet and IT pushed US productivity growth visibly higher, business investment boomed, and real rates rose with it: the real yield on 10-year inflation-protected Treasuries (TIPS, Stage 2.5) was about 4% around 2000, and the Fed raised its policy rate to 6.5% in 1999–2000. A productivity boom was also a **high-real-rate** era.

### ③ The forces pulling down: concentrated savings, cheap intelligence, deflation

The other end of the rope is strong too.

- **Income flows to high savers.** If AI's gains arrive mostly as profits for a few platform companies and their shareholders while labor's share of income falls (Stage 19.5 goes deeper), the economy-wide saving rate rises — **wealthy households and corporations spend a smaller fraction of each extra dollar.** More saving chasing a limited set of investments lowers \\(r^{*}\\).
- **The asset-light end state.** Building data centers is heavy. But once AI exists, many firms that use it may need fewer people, fewer offices and less capital. **The investment boom could be a one-off construction phase**, after which investment demand falls back.
- **Deflation from cheap intelligence.** If the unit cost of translation, support, coding and legal triage keeps falling sharply, services inflation — the stickiest inflation of the past decade — could be pushed down. That does not change \\(r^{*}\\) directly (\\(r^{*}\\) is real), but it lowers the **inflation-expectations** piece of nominal rates and could make it easier for central banks to cut.
- **Uncertainty itself.** When nobody knows which industries AI will erase, cautious households and firms build precautionary savings, which also lowers rates.

**What does the data say?** US nonfarm productivity grew about 1.5% a year from Q4 2007 to Q4 2019, about 2.1% a year from Q4 2019 to Q2 2026, and about 2.5% a year from mid-2023 to mid-2026. That is clearly better than the 2010s — yet the Q2 2026 quarterly reading was only 1.4% annualized, and post-pandemic reallocation, a surge in new business formation, and immigration and labor-mix effects could all explain the improvement. **As of September 2026, it is too early to credit AI.** Markets are pricing an AI productivity boom before it shows up clearly in the data.

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><defs><marker id="apre-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--red)"/></marker><marker id="apre-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--blue)"/></marker></defs><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The AI tug-of-war over the neutral rate r∗</text><rect x="250" y="120" width="140" height="56" rx="10" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="320" y="144" text-anchor="middle" font-size="13" font-weight="700" fill="var(--orange-ink)">r∗</text><text x="320" y="162" text-anchor="middle" font-size="10.5" fill="var(--muted)">real rate where saving = investment</text><line x1="320" y1="116" x2="320" y2="60" stroke="var(--red)" stroke-width="2.2" marker-end="url(#apre-a)"/><text x="320" y="50" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">Pulling up</text><rect x="20" y="40" width="215" height="100" rx="8" fill="var(--red-soft)" stroke="var(--line)"/><text x="30" y="60" font-size="11" fill="var(--ink)">• Growth hopes: richer later, save less</text><text x="30" y="80" font-size="11" fill="var(--ink)">• Capex boom competes for savings</text><text x="30" y="100" font-size="11" fill="var(--ink)">• Record long-dated corporate bonds</text><text x="30" y="120" font-size="11" fill="var(--ink)">• Deficits (same direction, not AI)</text><line x1="320" y1="180" x2="320" y2="236" stroke="var(--blue)" stroke-width="2.2" marker-end="url(#apre-b)"/><text x="320" y="252" text-anchor="middle" font-size="11" font-weight="700" fill="var(--blue)">Pulling down</text><rect x="405" y="150" width="222" height="100" rx="8" fill="var(--blue-soft)" stroke="var(--line)"/><text x="415" y="170" font-size="11" fill="var(--ink)">• Gains flow to high savers (profits)</text><text x="415" y="190" font-size="11" fill="var(--ink)">• Asset-light after the build-out</text><text x="415" y="210" font-size="11" fill="var(--ink)">• Cheap intelligence cools services CPI</text><text x="415" y="230" font-size="11" fill="var(--ink)">• Uncertainty, precautionary saving</text><text x="320" y="280" text-anchor="middle" font-size="10.5" fill="var(--muted)">In 2025–26 the visible forces pull up (investment, issuance); the downward forces are mostly a possible future</text></svg><figcaption>AI raises investment demand while potentially lowering future inflation and raising saving. During the build-out the upward pull is more visible; once built, the downward pull may win — which is why "does AI raise or lower rates?" has no single answer.</figcaption></figure>

### ④ Putting \\(r^{*}\\) back into long yields: inflation expectations and the term premium

\\(r^{*}\\) is a real rate. The "30-year yield above 5%" in Lin's headline is nominal. The bridge is the decomposition we used in Stage 4.3 and Stage 4.5:

$$
\\text{long nominal yield} \\approx \\text{expected real short rate} + \\text{expected inflation} + \\text{term premium}
$$

The first term is the average expected real short rate over the bond's life, anchored on \\(r^{*}\\).

AI enters every term:

<table>
<tr><th>Component</th><th>How AI pushes it up</th><th>How AI pushes it down</th></tr>
<tr><td>Expected real short rate (\\(\\approx r^{*}\\))</td><td>Growth expectations, investment demand</td><td>Concentrated saving, investment fades after the build-out</td></tr>
<tr><td>Expected inflation</td><td>Bottleneck prices: power, chips, land</td><td>Cheap intelligence lowers services prices</td></tr>
<tr><td>Term premium</td><td>A flood of long corporate bonds; wider disagreement about AI's payoff</td><td>If AI delivers stable low inflation, less need for an inflation-risk premium</td></tr>
</table>

**The September 2026 readings:** the New York Fed's ACM model put the 10-year term premium at about +0.73% (September 24); the Fed Board's Kim–Wright model put it at about +0.96% (September 18), the highest in that series since at least 2020. In 2020 the term premium was below −1%. **Much of the rise in long yields since 2024 has come from the term premium, not just from expected Fed policy** — consistent with deficits, heavy supply, inflation uncertainty and fewer price-insensitive buyers. AI's role here is simple: **one more very large long-term borrower.** When Meta, Alphabet or Oracle sells 30- or 40-year bonds, they compete with the US Treasury for the same pension and insurance money.

**A concrete number:** suppose AI lifts \\(r^{*}\\) by 0.5 point and the term premium by 0.25 point, with inflation expectations unchanged. The 30-year yield goes from 5.49% to about \\(5.49\\% + 0.5\\% + 0.25\\% = 6.24\\%\\). With a modified duration of about 15 (about 15.5 near a 5% yield, Stage 4.4), a 5%-coupon 30-year bond loses roughly another 10–11% (\\(-15 \\times 0.75\\% \\approx -11\\%\\)).

### ⑤ Who wins, who loses: bonds, stocks, Bitcoin and DAT preferreds

The same "higher \\(r^{*}\\)" means very different things for different assets. The key question is **whether the cash flows grow along with the rate.**

- **Fixed-coupon long bonds: pure loss.** The coupon is fixed, the discount rate rises, the price has nowhere to go but down. The standard example: a 5%-coupon 30-year Treasury whose yield rises from 5% to 6% drops from 100 to about 86.2 (−13.8%).
- **Stocks: it depends on whether \\(r\\) or \\(g\\) runs faster.** Use the Gordon formula from Stage 2.3, \\(P = \\dfrac{D_{1}}{r - g}\\). A $3 dividend, an 8% required return and 5% growth give a price of \\(\\dfrac{3}{8\\% - 5\\%} = 100\\). If AI raises both \\(r\\) and \\(g\\) by one point, the dividend becomes 3.15 and \\(r - g\\) is still 3%, so the price is **\\(\\dfrac{3.15}{9\\% - 6\\%} = 105\\)** — up, not down. If only \\(r\\) rises (the boom lifts rates but profits don't follow), the price falls to **\\(\\dfrac{3}{9\\% - 5\\%} = 75\\).** **That is the whole AI bull-versus-bubble debate in one line:** the market is betting that \\(g\\) keeps up. The fact sheet makes the tension vivid. As of September 2026 the S&P 500's cyclically adjusted P/E (CAPE) was about 41.5, near the 2000 peak of 44, yet the forward P/E was only about 19 because analysts expected roughly 30% earnings growth in 2026. **If those forecasts hold, \\(g\\) has caught up with \\(r\\); if they don't, valuations get squeezed from both sides at once.**
- **Government debt: the race between \\(r\\) and \\(g\\) (Stage 9.4).** Whether debt-to-GDP stabilizes depends on the gap between the interest rate \\(r\\) and nominal growth \\(g\\). If AI raises both, the debt math need not worsen. If AI raises only \\(r\\) —through investment and issuance competition — while the growth arrives late, America's roughly $1 trillion a year of net interest grows faster still, which feeds back into the term premium: the loop from Stage 4.5.
- **Bitcoin: the opportunity cost.** Bitcoin has no cash flows, so there is no DCF (Stage 12.3). Like gold, it is sensitive to **real** rates, because holding it means forgoing a real yield (Stage 2.5). A higher \\(r^{*}\\) is a headwind. But if the AI boom comes with huge deficits and worries about debt monetization, the scarce-asset narrative gets a tailwind (Stage 19.5).
- **DAT preferreds: squeezed by duration and credit.** A perpetual preferred has a duration of roughly \\(\\dfrac{1}{\\text{yield}}\\) (Stage 4.4, Stage 18.1), so a 10% perpetual preferred has a duration of about \\(\\dfrac{1}{10\\%} = 10\\) years. If the risk-free rate rises one point and the spread stays put, the price drops about 9–10%. **Every basis point AI adds to long-end yields flows straight into the kind of preferred in Lin's third headline.** Meanwhile AI companies issue their own preferreds and convertibles — Alphabet sold $15 billion of mandatory convertible preferred stock in June 2026 — competing with DAT "digital credit" for the same yield-hungry investors (Stage 19.2).

**The takeaway:** the first thing AI changes is the price of time. **During the build-out**, it acts like a giant new borrower, pushing \\(r^{*}\\) and the term premium up. **At maturity**, it may pull rates down through deflation and concentrated saving. Reading the AI market means reading who is winning this tug-of-war right now — and the long end in autumn 2026 says that, **for now, the side pulling up is stronger.** Stage 20.2 puts this into the growth × inflation regime framework, and Stage ∞.1 lists "AI and interest rates" as a genuinely open question.
`,

  demo: "ai-productivity-rates",

  analogy: `
Picture society's savings as a **big reservoir**, and the interest rate as the **price of water.**

For a decade and more, it kept raining upstream — retirement saving from aging populations, dollars piled up by foreign central banks, cash hoarded by corporations — while few people downstream wanted water (investment was weak). Plenty of water, cheap water: the low-rate 2010s.

Then AI arrives. First come the **developers of a new city**: they need data centers, power plants and transmission lines, and they pump hundreds of billions of dollars of water out of the reservoir every year. At the same time, residents hear that "everyone will be richer once the new city is built," so they spend early and put less water back. **More pumping, less refilling: the price of water rises.** That is the construction phase.

And once the city is finished? Maybe its robots don't drink (asset-light), maybe the city's earnings flow into a few private water towers (concentrated saving), maybe everything in the city keeps getting cheaper (deflation). The reservoir could fill up again and the price of water fall.

**So before asking "does AI raise or lower the price of water," ask: are we still building the city, or is it built?** And what you own determines whether a change in the water price hurts you. Holders of fixed-price water contracts (long bonds, perpetual preferreds) lose when the price rises. Owners of property in the new city (stocks) can shrug off a higher price as long as the city truly thrives. And someone holding a barrel of water that can never grow (Bitcoin, gold) mostly cares whether anyone is quietly diluting the reservoir.
`,

  misconceptions: [
    "**\"Higher productivity means lower interest rates.\"** — The opposite is closer to the truth. Classic theory and the late-1990s experience both say a **productivity boom usually comes with higher real rates**, because people expect to be richer and firms invest more. The channels through which AI could lower rates (concentrated saving, deflation) are separate mechanisms.",
    "**\"The Fed sets interest rates, so AI can't affect them.\"** — The Fed controls only the overnight policy rate. Long rates reflect the market's view of future \\(r^{*}\\), inflation and the term premium. And whether a policy rate is tight or loose is itself measured against \\(r^{*}\\): if AI has raised \\(r^{*}\\), the same 4% is less restrictive.",
    "**\"The productivity data already proves the AI boom.\"** — As of mid-2026, US productivity growth (about 2.5% over three years) beats the 2010s' roughly 1.5%, but post-pandemic reallocation, new business formation and labor-mix changes could explain it, and quarterly readings are noisy. **Crediting AI is premature.**",
    "**\"Rising rates are bad for every asset.\"** — If rates rise because growth expectations rise, assets whose cash flows grow (stocks) can hold up or even gain — \\(r\\) and \\(g\\) rising together in the Gordon formula. The pure losers are **long-duration assets with fixed cash flows**: long Treasuries and perpetual preferreds.",
    "**\"AI is deflationary, so long rates must return to very low levels.\"** — Deflation lowers the inflation piece of nominal rates, not necessarily the real rate \\(r^{*}\\). And during the build-out, AI's hunger for power, chips and land can push some prices up, while heavy long-dated borrowing lifts the term premium.",
  ],

  quiz: [
    {
      q: "In the Ramsey framework \\(r^{*} \\approx \\rho + \\theta \\times g\\), with \\(\\rho = 1\\%\\) and \\(\\theta = 1\\), what happens to \\(r^{*}\\) if AI lifts trend growth \\(g\\) from 1.5% to 2.5%?",
      options: [
        "It falls by about one point",
        "Nothing, because the Fed controls rates",
        "It rises about one point, from 2.5% to 3.5%",
        "It rises by about ten points",
      ],
      answer: 2,
      explain: "**\\(\\theta \\times g\\) goes from 1.5% to 2.5%**, so \\(r^{*}\\) goes from \\(1\\% + 1.5\\% = 2.5\\%\\) to \\(1\\% + 2.5\\% = 3.5\\%\\). Intuition: people who expect to be richer save less, so only a higher rate attracts enough saving.",
    },
    {
      q: "Which of these is a mechanism by which AI could **lower** \\(r^{*}\\)?",
      options: [
        "AI's gains flow mainly as profits to high-saving shareholders, raising aggregate saving",
        "Hyperscalers spending hundreds of billions a year on capex",
        "Record issuance of long-dated corporate bonds",
        "Households expecting higher future income and saving less",
      ],
      answer: 0,
      explain: "More saving (the supply of loanable funds shifting right) lowers the equilibrium rate. The other three all **pull up**: investment demand, bond supply, growth expectations.",
    },
    {
      q: "Gordon model: $3 dividend, 8% required return, 5% growth, price 100. If an AI boom lifts \\(r\\) to 9% but earnings growth stays at 5%, the price becomes about:",
      options: [
        "105",
        "100",
        "86",
        "75",
      ],
      answer: 3,
      explain: "\\(\\dfrac{3}{0.09 - 0.05} = \\mathbf{75}\\). Only \\(r\\) rose, \\(g\\) didn't follow, and the valuation compresses by 25%. If \\(g\\) also rose to 6%, the price would be \\(\\dfrac{3.15}{0.03} = 105\\) — the heart of the AI bull-versus-bubble argument.",
    },
    {
      q: "Why can we say that in September 2026 AI was already visibly pushing up long-term rates?",
      options: [
        "Because productivity data has proven the AI boom",
        "Because record long-dated corporate bonds funding AI data centers compete with Treasuries for the same long-term money and were cited among the drivers of higher yields",
        "Because the Fed named AI as the reason for its hike",
        "Because AI companies stopped issuing bonds",
      ],
      answer: 1,
      explain: "The drivers cited for September 2026's yield rise included the oil shock, a hawkish Fed, strong data, heavy Treasury issuance and **long-dated corporate bonds for AI data centers.** The productivity data can't yet be attributed to AI.",
    },
    {
      q: "A perpetual preferred yielding 10% has a duration of roughly \\(\\dfrac{1}{\\text{yield}}\\). If the risk-free rate rises one point and the spread is unchanged, its price roughly:",
      options: [
        "Rises about 10%",
        "Stays about the same",
        "Falls about 9–10%",
        "Falls about 50%",
      ],
      answer: 2,
      explain: "\\(\\text{Duration} \\approx \\dfrac{1}{10\\%} = 10\\) years; +1 point of yield → about −9% (exactly, \\(100 \\times \\dfrac{10\\%}{11\\%} \\approx 90.9\\)). AI-driven moves at the long end pass straight through to DAT preferreds (Stage 18.1).",
    },
  ],

  further: [
    { label: "New York Fed: Measuring the Natural Rate of Interest (Laubach–Williams / HLW estimates)", url: "https://www.newyorkfed.org/research/policy/rstar" },
    { label: "New York Fed: ACM Treasury term premia data", url: "https://www.newyorkfed.org/research/data_indicators/term-premia-tabs" },
    { label: "FRED: US nonfarm business labor productivity (OPHNFB)", url: "https://fred.stlouisfed.org/series/OPHNFB" },
    { label: "FRED: 10-year Treasury constant maturity yield (DGS10)", url: "https://fred.stlouisfed.org/series/DGS10" },
  ],
};
