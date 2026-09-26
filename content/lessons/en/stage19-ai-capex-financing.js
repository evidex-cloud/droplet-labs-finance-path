export default {
  id: "ai-capex-financing",
  stage: 19,
  order: 2,
  title: "The AI Capex Boom & Its Financing: Hyperscaler Bonds, Private Credit & Data Centers",
  difficulty: "mastery",
  prereqs: ["ai-productivity-rates", "capital-stack", "institutions-private-credit"],

  oneLiner:
    "In 2026 four US hyperscalers are spending over $700 billion on capital expenditure — so much that **operating cash flow can no longer cover it.** AI's build-out has shifted from \"our own money\" to \"other people's money\": record long-dated corporate bonds, Alphabet's roughly $80 billion equity raise (including a mandatory convertible preferred and an ATM), Meta and Blue Owl's off-balance-sheet SPV \"Hyperion,\" and an expected ~$800 billion from private credit. This lesson takes the financing machine apart with tools you already own — **the capital stack, duration mismatch, asset coverage, and whose balance sheet holds the risk** — and then lays out both sides of the AI-bubble debate fairly.",

  intuition: `
Imagine you run a very profitable noodle shop that clears $1 million a year. You decide to open a new branch for $500,000 — your own profits cover it, and you owe nobody anything. That's **internal financing**, the safest way to grow.

Then you become convinced that "in ten years the whole city will eat noodles," and you decide to open twenty branches a year at $1.5 million. Your own $1 million isn't enough anymore. So you borrow from the bank (**bonds**), bring relatives in as shareholders (**equity**), and find an investor to set up a separate property company: the property company pays to build the shops and you pay it rent, so that debt doesn't sit in your name (an **off-balance-sheet SPV**). You also borrow some expensive money from a non-bank lender (**private credit**).

That is the AI capex story of 2025–26, just with several more zeros. According to the fact sheet (as of September 2026), Alphabet, Amazon, Meta and Microsoft together plan roughly **$720–745 billion** of capex in 2026, about 75% more than in 2025 — about $835 billion with Oracle included. Amazon's free cash flow over the last twelve months was about **−$7.6 billion**; Oracle's over the last four quarters was about **−$23.7 billion**, against total debt of about $125 billion. **The AI build-out has moved from being paid for out of profits to being paid for with borrowed and raised money.**

Why does this lesson belong in the mastery tier? Because taking the machine apart uses almost every tool in the course:

- Whose money sits on which floor? That's the **capital stack** of Stage 6.1.
- Twenty-year bonds financing chips that are obsolete in five years? That's the **duration mismatch** of Stage 4.4, and the oldest problem in the anatomy of a crisis (Stage 10.1).
- Off-balance-sheet SPVs that make liabilities "disappear"? That recalls the off-balance-sheet vehicles of 2008 in Stage 10.2.
- Private credit funds that are "semi-liquid" but hold illiquid loans? That's the shadow banking of Stage 8.4 and the run logic of Stage 10.1.
- New shares, ATMs, mandatory convertible preferreds? The **same toolkit** DATs use in Stage 17.1 and Stage 6.4.

This lesson rests on **Idea ② Balance sheets & claims** (who holds which claim on AI's future cash flows) and **Idea ③ Liquidity & trust** (where the money comes from, and whether it runs under pressure). The previous lesson (Stage 19.1) argued that AI investment demand pushes rates up; this one follows **exactly how the money gets raised and whose balance sheet ends up holding the risk.** The next lesson (Stage 19.3) turns to how AI is changing trading and research inside markets.

And we'll be fair. Is it a bubble? **Supporters** say the spenders are the most profitable companies in history, demand is real and order backlogs are enormous. **Critics** say negative free cash flow, circular deals, off-balance-sheet debt and a return that is still largely unproven all rhyme with the late-1990s telecom bubble. We'll give both sides and then a checklist for judging with tools rather than with tribal loyalty.

**We'll take this lesson in five pieces:**

- **① Scale: capex is eating the cash flow**
- **② AI in the capital stack: corporate bonds, equity and convertibles**
- **③ The off-balance-sheet SPV: how Meta's Hyperion is built**
- **④ Private credit and data-center securitization: where the risk flows**
- **⑤ The bubble debate: the strongest case on each side, plus a checklist**
`,

  mechanics: `
### ① Scale: capex is eating the cash flow

The latest guidance in the fact sheet (as of September 2026; secondary-source figures are flagged):

<table>
<tr><th>Company</th><th>2025 capex</th><th>2026 guidance / latest</th></tr>
<tr><td>Alphabet</td><td>about $91B (unverified)</td><td>$195–205B (raised from $180–190B); $80.6B already spent in H1</td></tr>
<tr><td>Meta</td><td>$72.2B</td><td>$135–145B (raised twice during the year)</td></tr>
<tr><td>Microsoft</td><td>FY26 (Jul 2025–Jun 2026) about $115.9B</td><td>about $175B for calendar 2026</td></tr>
<tr><td>Amazon</td><td>about $130B</td><td>about $200B+ (secondary source); trailing-12-month free cash flow about −$7.6B</td></tr>
<tr><td>Oracle</td><td>—</td><td>Four quarters to Aug 2026: capex $55.7B, free cash flow −$23.7B; contract backlog (RPO) $664B</td></tr>
</table>

**The turning point:** hyperscaler capex used to be well below operating cash flow, with the surplus going to buybacks and dividends. In 2026, capex at several of these firms is eating most or all of operating cash flow. In the three-statement language of Stage 5.2: **cash going out through investing activities now needs cash coming in through financing activities.** Where does it come from? The next three sections take it in turn.

One accounting detail deserves a flag. Microsoft's 2026 number looks lower partly because it **lengthened the assumed useful lives of its data-center assets.** A longer useful life means less depreciation each year and prettier profits — but if the chips are really superseded by a new generation in three to five years, that simply pushes cost into the future. **The depreciation life is the single assumption most worth watching in an AI income statement.**

### ② AI in the capital stack: corporate bonds, equity and convertibles

Place AI's financing on the floor plan of the capital stack from Stage 6.1:

- **Investment-grade corporate bonds (senior unsecured).** Late 2025 reportedly brought a run of record jumbo deals (Meta about $30 billion in October 2025, for example; this course hasn't verified the exact sizes). Alphabet borrowed $20.3 billion in the second quarter of 2026 alone. Global corporate bond issuance reached about $4.9 trillion so far in 2026, with **AI builders issuing record amounts of long-dated debt** — competing with Treasuries for the same pension and insurance money (Stage 19.1). These issuers are highly rated and their spreads are tight (Stage 4.6), but 30- and 40-year bonds are funding assets with far shorter lives.
- **Equity and convertibles.** On June 1, 2026 Alphabet announced an equity raise of roughly **$80 billion**, with capex among the stated uses:
  - $15 billion of **mandatory convertible preferred** stock (a preferred that must convert into common at maturity — a member of the convertible-preferred family from Stage 6.3)
  - $15 billion of common stock
  - A $40 billion **at-the-market (ATM)** program — the very tool Strategy uses in Stage 17.1
  - A $10 billion private placement to Berkshire Hathaway

**This should make readers of this course sit up.** DATs use ATMs, convertibles and preferreds to finance buying bitcoin; AI giants use almost the same menu to finance building data centers. Both are **using capital markets to fund a giant bet on a single asset.** The difference: a data center produces cash flow but depreciates fast; bitcoin produces no cash flow but doesn't depreciate (Stage 15.3). And they compete for the same yield-seeking investors — Alphabet's mandatory convertible preferred and Strategy's preferreds land on the same income-fund manager's desk.

### ③ The off-balance-sheet SPV: how Meta's Hyperion is built

The purest example of plumbing innovation is the structure Meta and Blue Owl built for the Hyperion data center in Louisiana (announced in late 2025; sources differ on the exact date):

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><defs><marker id="mk-acfe-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker><marker id="mk-acfe-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--green)"/></marker></defs><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">A Hyperion-style off-balance-sheet structure (illustrative, ~$27B)</text><rect x="20" y="50" width="150" height="54" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="95" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Blue Owl funds</text><text x="95" y="90" text-anchor="middle" font-size="10.5" fill="var(--muted)">own about 80%</text><rect x="20" y="124" width="150" height="54" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="95" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Meta</text><text x="95" y="164" text-anchor="middle" font-size="10.5" fill="var(--muted)">owns about 20%</text><rect x="245" y="86" width="160" height="62" rx="8" fill="var(--surface-2)" stroke="var(--ink)"/><text x="325" y="110" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">SPV (Beignet)</text><text x="325" y="128" text-anchor="middle" font-size="10.5" fill="var(--muted)">owns the data center</text><rect x="470" y="50" width="155" height="54" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="547" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Bond investors</text><text x="547" y="90" text-anchor="middle" font-size="10.5" fill="var(--muted)">buy the SPV's bonds</text><rect x="470" y="170" width="155" height="54" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="547" y="192" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Data center</text><text x="547" y="210" text-anchor="middle" font-size="10.5" fill="var(--muted)">built and owned by SPV</text><line x1="172" y1="80" x2="243" y2="104" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#mk-acfe-a)"/><line x1="172" y1="150" x2="243" y2="130" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#mk-acfe-a)"/><line x1="468" y1="80" x2="407" y2="100" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#mk-acfe-a)"/><text x="440" y="78" text-anchor="middle" font-size="10" fill="var(--muted)">cash</text><line x1="407" y1="140" x2="468" y2="190" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#mk-acfe-a)"/><path d="M95,180 C110,235 420,245 540,228" fill="none" stroke="var(--green)" stroke-width="2" marker-end="url(#mk-acfe-g)"/><text x="320" y="266" text-anchor="middle" font-size="11" font-weight="700" fill="var(--green)">Meta leases the data center; its rent services the SPV's bonds</text><text x="320" y="288" text-anchor="middle" font-size="10.5" fill="var(--red)">Initial lease ~4 years (renewable to ~20) + Meta residual-value guarantee: off Meta's books, not off Meta's risk</text></svg><figcaption>The SPV moves the data-center debt off Meta's balance sheet onto a separate entity. Bondholders are repaid from Meta's rent; the gap between the short lease and the long bond is backstopped by a residual-value guarantee.</figcaption></figure>

The key features (per the fact sheet): a roughly **$27 billion** project financed through an SPV, Beignet Investors, **about 80% owned by Blue Owl funds and 20% by Meta.** The SPV issues bonds that are repaid from Meta's lease payments, so the debt **does not sit on Meta's balance sheet.** The initial lease is about 4 years, renewable up to about 20, and Meta provided a **residual-value guarantee.** In July 2026 plans were reported to have grown beyond $50 billion.

Read it with this course's tools:

- **Who holds which claim (Idea ②):** bondholders' claim comes from the rent, and the rent's credit quality comes from Meta. If Meta renews, it behaves like Meta debt. If Meta walks away after four years, bondholders must recover from **the data center's residual value** plus Meta's guarantee — the recovery question of Stage 6.6.
- **Maturity mismatch:** a four-year initial lease, a building that lasts twenty-plus years, chips that last about five. **The asset, the lease and the bond all have different lives**, and whoever sits in the gaps between them bears the real risk.
- **Off balance sheet ≠ off risk:** before 2008, banks also parked huge amounts of assets in off-balance-sheet vehicles (Stage 10.2) — and when the crisis hit, they had to take them back. The residual-value guarantee tells you **the risk has been moved, not removed.**

### ④ Private credit and data-center securitization: where the risk flows

**Private credit** (Stage 8.4) is lending by non-bank funds directly to companies, mostly at floating rates. The Financial Stability Board (May 2026 report) estimates the global market at about $1.5–2 trillion at end-2024 and, citing private research, says that of roughly $2.9 trillion of AI and data-center capex over 2025–28, about $1.5 trillion will need external financing — including about **$800 billion from private credit.** Another route is to bundle data-center rent streams into **asset-backed securities (ABS/CMBS)** and sell them to investors — the same securitization machinery as Stage 10.2, though this course could not verify the issuance volumes.

**The stress test of this pipe has already begun:**

- In autumn 2025, subprime auto lender Tricolor and auto-parts maker First Brands both went bankrupt, and JPMorgan's Jamie Dimon warned that when you see one cockroach, there are probably more.
- On April 2, 2026, two of Blue Owl's non-traded private credit funds received heavy redemption requests (about 21.9% of shares at OCIC and 40.7% at the tech-focused OTIC) and **capped redemptions at 5%.** Blue Owl itself cited investor fears that **AI will disrupt software borrowers.**

This is Idea ③ in its classic form: **a "semi-liquid" fund holding illiquid loans.** Investors think they can redeem any time; under pressure, the gate comes down — Stage 10.1's bank run in slow motion. Notice the irony: the same AI wave **has private credit lending to build data centers while making the software loans private credit already holds look riskier.**

### ⑤ The bubble debate: the strongest case on each side, plus a checklist

**The strongest case that this isn't a bubble (or at least not a 2000-style one):**

- The spenders are **the most profitable companies in history.** Much of the capex is still backed by operating cash flow, unlike the 2000 telecom firms that ran almost entirely on debt.
- Demand is real: Oracle's contract backlog is $664 billion. S&P 500 earnings are expected to grow about 30% in 2026, and a forward P/E of about 19 doesn't look outlandish (Stage 19.1's "g catching up with r").
- Even if some firms overbuild, the compute, power and networks will remain — like railways and fiber, cheap infrastructure for whoever comes next.

**The strongest case that it is:**

- **Free cash flow has turned negative** at Amazon and Oracle over the last four quarters, and financing increasingly leans on debt, off-balance-sheet SPVs and private credit.
- **Circular deals:** Nvidia announced it would invest up to $100 billion in OpenAI, which then buys Nvidia chips; AMD gave OpenAI warrants; Oracle and OpenAI signed a $300 billion compute contract. As of late 2025, OpenAI had committed about $1.4 trillion of compute purchases over roughly eight years, against annual revenue then of about $13–20 billion. **Commitments and revenue are nearly two orders of magnitude apart.**
- **History rhymes:** the late-1990s telecom bubble also had real technology, real demand, overbuilding, vendor financing and complex off-balance-sheet structures. The Bank of England and the IMF both warned in October 2025 about the risk of a sharp correction in AI valuations. In July 2026, Alphabet and Meta shares fell about 7% after raising capex guidance — the market has started asking about returns.
- **Externalities:** AI's enormous long-term borrowing pushes up long-term rates for everyone (Stage 19.1).

**A checklist** — judging with tools rather than with a side:

<table>
<tr><th>Question</th><th>Tool</th><th>Red flag</th></tr>
<tr><td>What pays for the capex?</td><td>Cash-flow statement (Stage 5.2)</td><td>Persistently negative FCF, dependence on outside money</td></tr>
<tr><td>Do asset lives match liability terms?</td><td>Duration (Stage 4.4)</td><td>5-year chips + 4-year lease + 20–30-year bonds</td></tr>
<tr><td>Whose balance sheet holds the risk?</td><td>Capital stack (Stage 6.1)</td><td>Off-balance-sheet SPV + residual guarantee + circular stakes</td></tr>
<tr><td>Can the funders run?</td><td>Liquidity mismatch (Stage 10.1)</td><td>Semi-liquid funds gating redemptions</td></tr>
<tr><td>What props up the valuation?</td><td>Reflexivity (Stage 10.4)</td><td>Higher stock → easier financing → more investment → higher stock</td></tr>
</table>

**The takeaway:** the AI boom is driven by real technology, **but its financing has moved from internal cash to capital markets and shadow banks.** That gives it the same reflexivity as the DAT flywheel of Stage 16.7: when funding flows, everything accelerates; when funding tightens, everything slows. Stage 20.1 will tie this thread to Lin's three headlines: AI competing for long-term money → the 30-year yield → the benchmark against which preferreds are priced. This lesson covers mechanisms and analytical frameworks only; it is not investment advice.
`,

  demo: "ai-capex-financing",

  analogy: `
Financing an AI data center is like **building a very expensive theme park on leased land.**

The buildings last twenty years, but the most valuable rides — the roller coasters, which are the chips — are obsolete in five and need replacing. You don't have enough cash, so: a bank gives you a 30-year loan (corporate bonds); a few partners buy in (equity, convertible preferreds); a property developer sets up a "theme-park property company," builds the park and leases it to you — you sign only a four-year lease, but promise that "if I don't renew, I'll make up any shortfall in what the park is worth" (the Hyperion-style SPV with a residual-value guarantee); and finally you borrow some expensive money from a "redeem-anytime" wealth fund (private credit).

**As long as visitors — AI's paying customers — keep pouring in, it all works beautifully:** ticket revenue pays the rent and the interest with room to spare. But the moment visitor growth slows, the roller coasters still need replacing in five years, the 30-year loan still has to be repaid, you may not want to renew after four years, and the wealth fund's savers start queuing to redeem. **Every layer of funder discovers it was relying on the same single thing: whether the visitors come.**

Judging whether the park is a bubble isn't about how beautiful it looks. It's about asking: **Who put up the money? Who can leave first? Who is left holding the bag at the end?**
`,

  misconceptions: [
    "**\"Hyperscalers have bottomless cash, so AI investment doesn't need financing.\"** — In 2026, capex at several firms consumes most or all of operating cash flow; Amazon and Oracle had negative free cash flow over the last four quarters, and Alphabet raised roughly $80 billion of equity. The build-out now depends heavily on outside money.",
    "**\"An off-balance-sheet SPV means the risk has nothing to do with the company.\"** — Off balance sheet is an accounting treatment. Hyperion's bonds are repaid from Meta's rent, and Meta gave a residual-value guarantee; if it doesn't renew or the asset loses value, the loss comes back to the sponsor in some form. **The risk is moved, not removed** — 2008's off-balance-sheet vehicles are the cautionary tale.",
    "**\"AI is a bubble, so all this investment will be wiped out.\"** — A bubble bursting doesn't make the technology useless. After the railway and fiber bubbles, the infrastructure stayed and was used cheaply by latecomers. The real question is **which layer of funders takes the loss**: shareholders, SPV bondholders, private credit funds, or their investors.",
    "**\"Bonds from investment-grade companies are safe regardless of maturity.\"** — Low credit risk isn't low rate risk. A 30- or 40-year corporate bond has very long duration, so a one-point rise in long yields can cut its price by around 15%; and the assets it funds (chips) live far shorter than the bond.",
    "**\"Private credit funds let you redeem anytime, so they're as safe as a money fund.\"** — Non-traded funds hold illiquid loans. In April 2026 Blue Owl's funds capped redemptions at 5% while requests reached 21.9% and 40.7% of shares. **Liquidity promises only hold in normal times.**",
  ],

  quiz: [
    {
      q: "In the Meta–Blue Owl Hyperion structure, what mainly repays the bonds issued by the SPV?",
      options: [
        "Blue Owl's management fees",
        "Meta's lease payments on the data center (backed by Meta's residual-value guarantee)",
        "US government subsidies",
        "Bitcoin sales by the data center",
      ],
      answer: 1,
      explain: "The SPV owns the data center and leases it to Meta; **the rent services the debt.** So the bonds' credit essentially rests on Meta renewing, and the residual-value guarantee protects bondholders if it doesn't — the risk never fully leaves Meta.",
    },
    {
      q: "In Alphabet's roughly $80 billion equity raise of June 2026, which component is **most similar** to a tool Strategy uses?",
      options: [
        "The private placement to Berkshire",
        "Issuing 30-year Treasuries",
        "The $40 billion at-the-market (ATM) program",
        "Taking out a bank loan",
      ],
      answer: 2,
      explain: "**The ATM program** is exactly the core DAT tool of Stage 17.1. Alphabet also sold a mandatory convertible preferred — the same family as DAT convertible instruments.",
    },
    {
      q: "A data-center project has chips that last about 5 years, a 4-year initial lease, and 25-year bonds. This is a textbook example of what risk?",
      options: [
        "Maturity (duration) mismatch: asset, lease and liability lives don't line up",
        "Currency risk",
        "Operational risk",
        "Inflation-protection risk",
      ],
      answer: 0,
      explain: "When the **terms don't match**, whoever sits in the gaps bears the real risk — the same problem as a bank's maturity mismatch in Stage 10.1.",
    },
    {
      q: "Which of these is one of the strongest arguments from AI-bubble **critics**?",
      options: [
        "The S&P 500's forward P/E is about 19",
        "Oracle has a $664 billion contract backlog",
        "The spenders are the most profitable companies in history",
        "OpenAI's roughly $1.4 trillion of compute commitments versus annual revenue of about $13–20 billion (late-2025 figures), alongside circular deals",
      ],
      answer: 3,
      explain: "Commitments nearly two orders of magnitude above revenue, plus circular deals like Nvidia–OpenAI, are the critics' core argument. The other three are **supporters'** points.",
    },
    {
      q: "Blue Owl's private credit funds capping redemptions in April 2026 illustrates which idea?",
      options: [
        "Idea ① The price of time",
        "Idea ③ Liquidity & trust: semi-liquid funds holding illiquid assets gate under pressure",
        "Idea ④ Volatility can be traded",
        "None of the four ideas",
      ],
      answer: 1,
      explain: "It's a **liquidity mismatch**: redeemable liabilities, illiquid loan assets. Under pressure the only option is to gate — a slow-motion run (Stage 10.1).",
    },
  ],

  further: [
    { label: "Financial Stability Board: private credit report (May 2026)", url: "https://www.fsb.org/uploads/P060526.pdf" },
    { label: "Alphabet Q2 2026 results (SEC filing)", url: "https://www.sec.gov/Archives/edgar/data/0001652044/000165204426000066/googexhibit991q22026.htm" },
    { label: "Oracle Q1 FY2027 results (SEC filing)", url: "https://www.sec.gov/Archives/edgar/data/1341439/000119312526387905/orcl-ex99_1.htm" },
    { label: "Wikipedia: Hyperion data center (structure and timeline; secondary source)", url: "https://en.wikipedia.org/wiki/Hyperion_(data_center)" },
    { label: "Wikipedia: AI bubble (overview of the debate; secondary source)", url: "https://en.wikipedia.org/wiki/AI_bubble" },
  ],
};
