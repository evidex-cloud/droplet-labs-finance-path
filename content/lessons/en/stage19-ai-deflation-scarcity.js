export default {
  id: "ai-deflation-scarcity",
  stage: 19,
  order: 5,
  title: "AI Deflation, Labor & Scarce Assets: When Intelligence Gets Cheap, What Gets Expensive",
  difficulty: "mastery",
  prereqs: ["ai-productivity-rates", "inflation", "bitcoin-supply"],

  oneLiner:
    "Whenever something becomes extremely cheap, its complements that can't be produced quickly become expensive: the steam engine made coal dear, the internet made attention dear. AI makes \"intelligence\" cheap. That brings a force of **good deflation** (productivity-driven) and a fresh fight over the pie — **how much goes to labor and how much to capital.** Using the CPI basket of Stage 1.4, the neutral rate of Stage 19.1 and the supply curve of Stage 12.2, this lesson works out **what gets cheaper, who benefits and what becomes scarce** in the AI era — compute, power, land with a grid connection, judgment and trust, and fixed-supply bitcoin and gold — and takes the skeptics' rebuttals seriously.",

  intuition: `
In 1990, a hard drive that held one gigabyte cost thousands of dollars. Today a gigabyte of storage is practically free. What happened once storage got cheap? **People started storing everything** — photos, videos, logs, backups of the whole internet. Storage itself didn't get more expensive, but **data-center land, electricity, and the people who can find value in oceans of data** became more valuable.

It's an old rule in economics: **when something becomes extremely cheap, its complements that can't be produced quickly become expensive.** In the nineteenth century William Stanley Jevons noticed that as steam engines grew more efficient, total coal consumption went up, because cheap power got used for more and more things — the "Jevons paradox."

AI is making "intelligence" cheap. Translating a page, writing a block of code, answering a support query or doing a first pass over a contract costs sharply less than it used to. That has three consequences, which are this lesson's three questions:

**First, what happens to prices?** If the cost of many services keeps falling, their prices fall too — a **deflationary force.** But it's "good deflation": it comes from higher productivity and more supply, not the collapsing demand and soaring unemployment of the "bad deflation" of the 1930s. The late-nineteenth-century United States had a long stretch of falling prices alongside rapid growth. Still, **as of August 2026, US CPI inflation was 3.4% year over year** (driven by the oil shock from the Iran war), and inflation has sat above the 2% target continuously since 2021 — AI's deflationary force is nowhere near overpowering the others yet. And during the build-out, AI's vast appetite for power, chips and land is pushing those prices up.

**Second, how is the pie divided?** Higher productivity makes the pie bigger, but who gets the extra slice? If AI mainly **substitutes** for labor, wages grow more slowly than output, **labor's share of income falls** and the profit share rises. If AI mainly **augments** labor (letting one person do more), wages rise with it. That links straight back to Stage 19.1 — gains flowing to high-saving owners of capital pull the neutral rate down — and to Stage 9.4, since a shrinking labor share can reshape the tax base and fiscal pressure.

**Third, what becomes scarce?** When intelligence is abundant, scarcity migrates to its **complements**: compute (scarce now, expandable later), power and the grid, land with a grid connection, human judgment and trust (Stage 19.3), and **assets whose supply cannot rise** — bitcoin's 21 million cap (Stage 12.2) and gold, whose supply grows slowly. Supporters say the enormous wealth AI creates has to be stored somewhere, and fixed-supply assets will catch it. Skeptics say scarcity isn't value — demand sets the price — and point out that from October 2025 to June 2026, with the AI boom in full swing, bitcoin fell about 54%.

This lesson rests on **Idea ① The price of time** (how AI deflation feeds inflation expectations and rates) and **Idea ④ Risk & leverage** (the risk in betting on a scarcity narrative). It closes Stage 19: from the rate tug-of-war of Stage 19.1, the financing machine of Stage 19.2, the market edge of Stage 19.3 and the machine payments of Stage 19.4 to the broadest question of all — **how AI changes what is valuable.** The next stage (Stage 20.1) wires everything back into Lin's three headlines.

**We'll take this lesson in five pieces:**

- **① Deflation from cheap intelligence: good deflation, bad deflation and Baumol's disease**
- **② The opposite force during the build-out: bottleneck inflation in power, chips and land**
- **③ Labor versus capital: the pie grows, but who gets the extra slice?**
- **④ What becomes scarce: complements, supply elasticity and the scarce-asset story**
- **⑤ An asset map for four AI scenarios (a framework, not advice)**
`,

  mechanics: `
### ① Deflation from cheap intelligence: good deflation, bad deflation and Baumol's disease

**Good deflation and bad deflation.** Falling prices aren't good or bad in themselves; what matters is **why they fall**:

<table>
<tr><th></th><th>Good deflation (supply-driven)</th><th>Bad deflation (demand-driven)</th></tr>
<tr><td>Cause</td><td>Higher productivity: more output from the same inputs</td><td>Collapsing demand, debt deflation, shrinking credit</td></tr>
<tr><td>Output and jobs</td><td>Output grows, real incomes rise</td><td>Output falls, unemployment rises</td></tr>
<tr><td>Historical example</td><td>The late-19th-century US: prices fell for decades while the economy grew fast</td><td>The Great Depression of the 1930s</td></tr>
<tr><td>Debtors</td><td>Rising incomes partly offset it</td><td>Real debt burdens swell (Fisher's "debt deflation")</td></tr>
</table>

AI looks more like the first kind: it lowers **production costs.** But remember the debtors and savers of Stage 1.4. In a heavily indebted economy (US federal debt is now over $40 trillion), even good deflation **raises the real burden of fixed nominal debts** — which is why governments and central banks instinctively fear deflation of any kind.

**Baumol's disease in reverse.** William Baumol pointed out that haircuts, education, health care and live performance are hard to make more productive (a string quartet needs the same four players and the same time as in 1800), yet their wages must keep up with the rest of the economy, so these services get **relatively more expensive** over time — one reason services inflation has been so stubborn for decades. **AI is the first technology with a real chance of reaching these "low-productivity" services**: tutoring, legal advice, diagnostic triage, customer support.

**Run it through a basket** (the CPI-basket logic of Stage 1.4; illustrative numbers). Suppose 20% of the basket is "AI-exposed services" whose prices fall 5% a year, while the other 80% rises 3%. Overall inflation ≈ 0.2 × (−5%) + 0.8 × 3% = **1.4%.** **AI doesn't need to make everything cheaper; making a slice cheap enough pulls overall inflation down a notch** — and that flows through inflation expectations into long-term nominal rates (piece ④ of Stage 19.1).

### ② The opposite force during the build-out: bottleneck inflation in power, chips and land

Before AI can make services cheap, it has to be **built.** And what it takes to build it is exactly the stuff whose supply can't expand quickly:

- **Power and the grid.** Data centers need huge amounts of steady, round-the-clock electricity; new plants and transmission lines take years to permit and build.
- **Advanced chips and memory.** Capacity is concentrated in a few fabs, and expansions take years.
- **Land with a grid connection.** Sites near the grid with interconnection approval have become a new scarce good.
- **Specialized people** who can design, build and run these systems.

As of September 2026, the four hyperscalers' 2026 capex totals about $720–745 billion (Stage 19.2), and most of it flows into those bottlenecks. **So during the build-out, AI acts more like a force of local inflation**: it bids up power, chips and specialist skills, and through heavy long-dated borrowing it lifts long-term rates. The biggest driver in the 2026 inflation data is actually something else — the energy shock from the Iran war (energy prices up about 16% year over year in August 2026). That's a useful reminder: **AI is one of many forces acting on prices, and right now not the biggest.**

### ③ Labor versus capital: the pie grows, but who gets the extra slice?

Higher productivity makes the pie bigger. How it's divided depends on whether AI **substitutes for** or **complements** labor:

$$ Real wage growth ≈ labor's share of the gains λ × productivity growth g
Change in labor's income share ≈ (1 + λ × g) ÷ (1 + g) − 1 (per year, illustrative)

**A worked number:** AI adds 2 points a year to productivity growth. If labor gets all of the gain (λ = 1), real wages rise an extra 2% a year and labor's share is unchanged. If labor gets only half (λ = 0.5), real wages rise an extra 1% a year and labor's share shrinks about 1% a year — from 60% to about 54% after ten years (illustrative). **The pie grows, but the fraction in workers' hands shrinks.**

History offers two precedents:

- **"Engels' pause"** in the early Industrial Revolution (economic historian Robert Allen's term): British output grew fast in the first half of the nineteenth century while real wages stagnated for decades and the profit share rose — until wages eventually caught up.
- **The mid-twentieth century:** technical progress and wage growth moved roughly together, and labor's share was fairly stable.

**The labor market as of September 2026:** unemployment was 4.1% (August), and mid-2025 to mid-2026 was a "low hire, low fire" market. Is AI behind it? Possibly, but immigration changes, high rates and uncertainty can explain it too — **attributing it to AI is premature.** One signal is already visible in credit markets: in April 2026, a tech-focused private credit fund run by Blue Owl faced heavy redemptions, partly because investors feared **AI would disrupt the software companies it had lent to** (Stage 19.2).

**Why distribution matters for finance:** a falling labor share → saving concentrated among high earners and corporations → a lower neutral rate (the "pulling down" side of Stage 19.1). At the same time, a shifting tax base and rising social-spending pressure → deficits and the term premium (Stage 9.4). **AI's distributional effects end up back in interest rates.**

### ④ What becomes scarce: complements, supply elasticity and the scarce-asset story

The most useful tool for judging "what gets expensive" is **supply elasticity**: when demand rises, how fast can supply follow?

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">A scarcity map for the AI era: how fast can supply follow demand? (illustrative)</text><line x1="60" y1="250" x2="610" y2="250" stroke="var(--line)" stroke-width="1.2"/><text x="60" y="270" font-size="10.5" fill="var(--muted)">Supply nearly fixed</text><text x="610" y="270" text-anchor="end" font-size="10.5" fill="var(--muted)">Supply can expand fast</text><rect x="70" y="60" width="110" height="46" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="125" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Bitcoin</text><text x="125" y="97" text-anchor="middle" font-size="10" fill="var(--muted)">~0.8%/yr, capped</text><rect x="70" y="120" width="110" height="46" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="125" y="140" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Prime land</text><text x="125" y="157" text-anchor="middle" font-size="10" fill="var(--muted)">location can't be copied</text><rect x="195" y="90" width="110" height="46" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="250" y="110" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Gold</text><text x="250" y="127" text-anchor="middle" font-size="10" fill="var(--muted)">stock grows ~1–2%/yr</text><rect x="315" y="150" width="120" height="46" rx="8" fill="var(--surface-2)" stroke="var(--ink)"/><text x="375" y="170" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Power and grid</text><text x="375" y="187" text-anchor="middle" font-size="10" fill="var(--muted)">years to expand</text><rect x="445" y="120" width="80" height="46" rx="8" fill="var(--surface-2)" stroke="var(--ink)"/><text x="485" y="140" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Chips</text><text x="485" y="157" text-anchor="middle" font-size="10" fill="var(--muted)">fabs take years</text><rect x="530" y="180" width="85" height="46" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="572" y="200" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">"Intelligence"</text><text x="572" y="217" text-anchor="middle" font-size="10" fill="var(--muted)">ever cheaper</text><text x="340" y="56" text-anchor="middle" font-size="10.5" fill="var(--red)">Left: prices move a lot when demand rises (and demand can fall)</text><text x="340" y="236" text-anchor="middle" font-size="10.5" fill="var(--blue)">Right: new supply absorbs rising demand, prices tend to fall</text></svg><figcaption>The further left, the less supply can respond, so changes in demand show up directly in price — both up and down. The further right, the more new supply pushes prices down: compute that is scarce today may, like fiber after 2001, end up in glut.</figcaption></figure>

A toy formula:

$$ Annual price change ≈ (1 + demand growth) ÷ (1 + supply growth) − 1

**Bitcoin's supply growth** can be computed exactly. After the April 2024 halving, each block pays 3.125 BTC; with a block about every ten minutes, a year has about 52,560 blocks → about 164,000 new coins a year. About 20.09 million had been mined as of September 2026, so **annual supply growth is about 0.8%**, falling to about 0.4% after the next halving around April 2028. If "genuine demand to hold bitcoin" grows 10% in a year, the toy formula gives a price change of about (1.10 ÷ 1.008) − 1 ≈ +9.1%. If demand falls 30%, the price falls by nearly as much. **Fixed supply means demand alone sets the price.**

**The strongest case for the scarce-asset story:** the vast wealth and profits AI creates need to be stored. If cheap intelligence pushes down the prices of most goods and services while governments widen deficits to cope with job disruption and fiscal strain, then **assets whose supply cannot grow become the sink where wealth settles.** The DAT thesis (Stage 15.1) is built on exactly this narrative.

**The skeptics' strongest rebuttals:**

- **Scarce isn't the same as valuable.** Plenty of things are in fixed supply; demand sets the price. After its peak of about $126,000 in October 2025, bitcoin fell to about $58,000 in June 2026 (about −54%) — right in the thick of the AI capex boom.
- **The real-rate headwind.** As Stage 19.1 showed, the build-out pushes real rates up, raising the opportunity cost of assets with no cash flow (gold, bitcoin). Gold fell from about $5,600 at its January 2026 peak to about $3,960 in June; the fact sheet attributes that to rising real yields and a Fed turning hawkish.
- **The compute lesson.** Today's tightest AI bottlenecks (chips, compute) are precisely the things whose supply can expand — the fiber laid in the late 1990s turned into a severe glut after 2001. **"Scarcity" may be a temporary feature of the build-out.**

### ⑤ An asset map for four AI scenarios (a framework, not advice)

Put every tool from this stage together and you can draw a scenario map. It isn't a forecast, let alone investment advice; it's an "if this, then that" thinking frame (Stage 20.2 extends it into a full macro-regime map):

<table>
<tr><th>Scenario</th><th>Rates (Stage 19.1)</th><th>Inflation</th><th>Long Treasuries</th><th>AI stocks</th><th>Credit (Stage 19.2)</th><th>Bitcoin / gold</th></tr>
<tr><td><b>Build-out boom</b> (today?)</td><td>r∗ and term premium up</td><td>Bottleneck inflation</td><td>Under pressure</td><td>Depends on whether earnings keep up</td><td>Heavy issuance, tight spreads</td><td>Real-rate headwind vs deficit narrative</td></tr>
<tr><td><b>AI delivers + good deflation</b></td><td>High, then easing</td><td>Falling</td><td>Gain in the easing phase</td><td>Winners profit, share concentrates</td><td>Solid</td><td>Depends on whether wealth seeks a store</td></tr>
<tr><td><b>AI bubble bursts</b></td><td>Flight to safety pulls long yields down</td><td>Falling</td><td>Gain</td><td>Sharp fall</td><td>Private credit and SPVs stressed</td><td>Unclear: liquidity shock vs rate cuts</td></tr>
<tr><td><b>Labor shock + fiscal expansion</b></td><td>Term premium up</td><td>Possibly rising</td><td>Under pressure</td><td>Mixed</td><td>Mixed</td><td>"Debasement" narrative gains</td></tr>
</table>

For this course's main thread, the key row is that **bitcoin and DATs face a tug between narrative and rates in every scenario**: AI-driven long-end yields weigh on DAT preferreds (long duration, Stage 18.1), while AI-driven fiscal strain can strengthen bitcoin's scarcity narrative. **This lesson covers mechanisms and analytical frameworks only; it is not investment advice.** Stage 20.1 ties this thread back to Lin's three headlines, and Stage ∞.1 lists "AI and interest rates" and "the future of scarce assets" among the questions still open.
`,

  demo: "ai-deflation-scarcity",

  analogy: `
Imagine a small island where the most expensive service has always been **getting the old scholar to write a letter.** He's the only literate person on the island; anyone who needs a letter written or a contract read queues up and pays him.

One day a machine arrives that writes letters for a single grain of rice apiece. Then:

- **Letter-writing becomes nearly free** (deflation from cheap intelligence). The scholar's income collapses and he has to find new work (the redistribution between labor and capital); the machine's owner collects rice from the whole island (the profit share rises).
- **Islanders start writing lots and lots of letters**: love letters, ledgers, poetry, greetings to every distant cousin (the Jevons paradox: cheap things get used a lot).
- **So paper and ink get expensive**, the **firewood** the machine burns (power) gets expensive, and the **sheltered patch of ground** next to the machine (land with a grid connection) becomes hotly contested — complements that can't be produced quickly.
- The machine's owner and some islanders grow rich and want to store their wealth. The island has **a kind of shell that never becomes more plentiful** (bitcoin, gold). Some say, "Wealth will flow into the shells, and shells will keep getting dearer." Others say, "You can't eat a shell or write with it; the day people stop wanting them, they're worthless."

**Both could be right. It depends on what the islanders will want to store their wealth in — and that is the question this lesson leaves for you to judge.**
`,

  misconceptions: [
    "**\"AI brings deflation, so it must be bad.\"** — Supply-driven \"good deflation\" comes with rising output and real incomes, entirely different from the demand collapse of the 1930s. In a heavily indebted economy, though, even good deflation raises the real burden of nominal debt.",
    "**\"AI is already pushing inflation down.\"** — As of August 2026, US CPI inflation was about 3.4% and has been above the 2% target since 2021, driven mostly by an energy shock. During the build-out, AI is actually pushing up the prices of power, chips and specialist talent. Its deflationary force isn't dominant yet.",
    "**\"If productivity rises, workers must benefit.\"** — A bigger pie doesn't mean every slice grows. If AI mainly substitutes for labor, wages lag output and labor's share falls; in early industrial Britain's \"Engels' pause,\" real wages stagnated for decades. Distribution depends on whether AI substitutes or augments, and on institutions.",
    "**\"Fixed-supply assets must rise in the AI era.\"** — Fixed supply means demand alone sets the price, up or down. From October 2025 to June 2026, at the height of the AI boom, bitcoin fell about 54%; rising real rates are a headwind for assets without cash flows.",
    "**\"Compute will be the permanent scarcity of the AI era.\"** — Compute and chips are things whose supply can expand; it just takes time. The fiber laid in the late 1990s became a severe glut after 2001. Today's bottlenecks may well be temporary features of the build-out.",
  ],

  quiz: [
    {
      q: "20% of the basket is AI-exposed services falling 5% a year; the other 80% rises 3% a year. Overall inflation is about:",
      options: [
        "3%",
        "−5%",
        "−1%",
        "1.4%",
      ],
      answer: 3,
      explain: "0.2 × (−5%) + 0.8 × 3% = −1% + 2.4% = **1.4%.** AI only needs to make a slice cheap enough to pull overall inflation down a notch.",
    },
    {
      q: "After the 2024 halving, bitcoin pays 3.125 BTC per block, about 52,560 blocks a year, with about 20.09 million coins mined. Annual supply growth is about:",
      options: [
        "About 3%",
        "About 0.8%",
        "About 8%",
        "0%",
      ],
      answer: 1,
      explain: "3.125 × 52,560 ≈ 164,250 BTC; 164,250 ÷ 20,090,000 ≈ **0.82%.** After the next halving around 2028 it drops to about 0.4%.",
    },
    {
      q: "Productivity grows an extra 2% a year and labor gets only half the gain (λ = 0.5). Roughly how does labor's income share change each year?",
      options: [
        "Falls about 1% (relative)",
        "Unchanged",
        "Rises about 2%",
        "Falls about 50%",
      ],
      answer: 0,
      explain: "(1 + 0.5 × 2%) ÷ (1 + 2%) − 1 ≈ −0.98%. **The pie grows, but labor's fraction shrinks about 1% a year** — from 60% to about 54% in ten years (illustrative).",
    },
    {
      q: "Why is AI during the build-out more like a force of local inflation?",
      options: [
        "Because AI makes every service more expensive",
        "Because the Fed requires AI companies to raise prices",
        "Because building AI needs power, chips, land and specialist talent, whose supply can't expand quickly",
        "Because AI companies stopped issuing bonds",
      ],
      answer: 2,
      explain: "Huge capex flows into **supply-inelastic bottlenecks** and bids up their prices, while heavy long-dated borrowing lifts long-term rates. AI's deflationary force shows up only once it actually lowers the cost of services.",
    },
    {
      q: "Which is one of the strongest rebuttals to the story that \"scarce assets will catch AI's wealth\"?",
      options: [
        "Bitcoin is capped at 21 million coins",
        "Scarce isn't valuable: demand sets the price; bitcoin fell about 54% at the height of the AI boom, and AI-driven real rates are a headwind for assets without cash flows",
        "Gold's supply grows slowly",
        "AI makes many services cheaper",
      ],
      answer: 1,
      explain: "Fixed supply only guarantees that **the price is extremely sensitive to demand**, not that it rises. Higher real rates raise the opportunity cost of holding assets with no cash flow (Stage 19.1).",
    },
  ],

  further: [
    { label: "FRED: US nonfarm business sector labor share (PRS85006173)", url: "https://fred.stlouisfed.org/series/PRS85006173" },
    { label: "US Bureau of Labor Statistics: latest CPI release", url: "https://www.bls.gov/news.release/cpi.nr0.htm" },
    { label: "US Bureau of Labor Statistics: productivity program (labor productivity and labor share data)", url: "https://www.bls.gov/productivity/" },
    { label: "blockchain.info: total bitcoin mined (live)", url: "https://blockchain.info/q/totalbc" },
    { label: "Austrian Path (sister course: good deflation, bad deflation and money)", url: "https://evidex-cloud.github.io/droplet-labs-austrian-path/" },
  ],
};
