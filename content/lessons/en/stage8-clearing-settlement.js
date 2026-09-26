export default {
  id: "clearing-settlement",
  stage: 8,
  order: 2,
  title: "Clearing, Settlement & Custody: The Plumbing Behind T+1",
  difficulty: "core",
  prereqs: ["exchanges-brokers"],

  oneLiner:
    "Your order fills in a second, but the cash and shares don't actually change hands until the next business day — U.S. stocks only moved from T+2 to **T+1** on May 28, 2024. In that gap, a **clearing house** steps between every buyer and seller, **nets** millions of trades down to a handful of payments, and collects margin from brokers. After settlement, your shares sit at the far end of a long **custody chain**, and the name on the company's register is actually Cede & Co. This lesson takes that plumbing apart and contrasts it with blockchain **atomic settlement**: T+0 is tempting, but it removes exactly the things that make the plumbing cheap.",

  intuition: `
At the end of the last lesson (Stage 8.1), your app said "Filled." Now a strange-sounding question: **at this moment, are those 10 shares yours?**

Strictly speaking, not yet. A fill is only an **agreement** between you and a counterparty: "I pay $1,000, you deliver 10 shares." Actually moving the money out and the shares in happens on **settlement day**. For U.S. stocks that's the first business day after the trade, written **T+1**. Buy on Monday, settle on Tuesday; buy on Friday, settle the following Monday.

Why not swap on the spot? Because tens of millions of trades crisscross hundreds of brokers every day. If each one were paid for and delivered individually, on the spot, the system would need an unimaginable amount of cash and securities. So markets built a pipeline that works as "record first, net later, deliver once":

- **Clearing**: everything that happens after the trade and before delivery — matching both sides' records, working out how much cash and how many shares each broker ultimately owes, and managing the risk that someone defaults before delivery.
- **Settlement**: the actual exchange — money from buyer to seller, securities from seller to buyer.
- **Custody**: after settlement, who holds and records the securities.

In the middle of this pipeline stands a crucial player: the **central counterparty (CCP)**, or clearing house. For U.S. stocks it's the **NSCC**, part of DTCC. It does something almost magical: once a trade is confirmed, it **replaces** the original counterparties, becoming the buyer to every seller and the seller to every buyer. You no longer have to worry about a stranger defaulting — **you only have to trust the clearing house.** The clearing house makes itself trustworthy with margin, a mutualized default fund and strict membership rules.

And once the trade is done, the shares don't appear on a certificate with your name on it. They sit in a **custody chain**: the company's register lists DTC's nominee, **Cede & Co.**; DTC's books list your broker; your broker's books list you. What you own is, strictly speaking, **a stack of nested claims**.

This lesson rests on two ideas. **Idea ③ Liquidity & trust (the plumbing)**: clearing and settlement are the financial system's back office, the place where trust is turned into institutions. And **Idea ② Balance sheets & claims**: your "stock" is a line in your broker's ledger, which corresponds to a line in a ledger further upstream.

This back office is invisible until something breaks. During the GameStop frenzy of January 2021, Robinhood restricted buying because the clearing house's margin demand exploded (Stage 8.1). When FTX collapsed in 2022, the core problem was that exchange, broker, custodian and clearing house were all crammed into a single ledger with no separation (Stage 10.5). Looking ahead, Stage 14.1 explains how tokenization makes "trade equals settlement" possible, and Stage 14.5 shows how deposit tokens, stablecoins and tokenized funds are relaying this plumbing together.

**In this lesson we break it into five pieces:**

- **① A trade isn't delivery: the long road from T+5 to T+1**
- **② Clearing houses and central counterparties: standing between every buyer and seller**
- **③ Netting and margin: why the plumbing is so efficient**
- **④ The custody chain: who actually holds your shares**
- **⑤ Atomic settlement on-chain: the lure and the cost of T+0**
`,

  mechanics: `
### ① A trade isn't delivery: the long road from T+5 to T+1

The settlement cycle has a history driven by crises:

- **The late-1960s "paperwork crisis."** Settlement then meant physically delivering stock certificates and checks. When volumes surged in 1968, brokers' back offices drowned in paper; lost and botched deliveries piled up, and the New York Stock Exchange for a time **closed on Wednesdays** just so back offices could catch up. A wave of broker failures followed. In 1970 the U.S. created SIPC to protect brokerage customers, and in 1973 the **Depository Trust Company (DTC)** was founded to lock physical certificates in a vault and change only the ledger, never the paper — the **immobilization** of securities.
- **T+5 → T+3 (1995) → T+2 (September 2017) → T+1 (May 28, 2024).** Each step was about one thing: **shrinking the window in which a counterparty can default.** After the 1987 crash and the 2008 crisis, regulators hammered the point that slower settlement leaves more unresolved risk in the system. The EU and UK plan to move to T+1 in October 2027.

What risks live in that window? Three kinds:

- **Replacement-cost (counterparty) risk.** You buy 1,000 shares at $100 on Monday. On Tuesday the seller defaults and can't deliver, and the stock is now $110. Buying the shares again costs $110,000 — **a $10,000 loss.** The longer the window, the further the price can travel.
- **Principal risk.** You've paid, but the other side never delivers. The textbook case is **Bankhaus Herstatt** on June 26, 1974: German regulators shut it at the end of the German business day, and some counterparties that had already paid Deutsche marks in Frankfurt never received their dollars in New York. "Herstatt risk" became shorthand for cross-time-zone settlement risk, and the currency market eventually built the CLS system so that both currencies are delivered **simultaneously**.
- **Liquidity risk.** The other side does deliver — a day late — and you needed the money today.

Replacement-cost risk can be estimated. Price moves grow roughly with the square root of time:

$$
99%-confidence replacement cost ≈ trade value × 2.33 × annual volatility ÷ √252 × √(settlement days)
For a $100,000 trade at 30% annual volatility:
T+3 ≈ $7,600 · T+2 ≈ $6,200 · T+1 ≈ $4,400
$$

Going from T+2 to T+1 cuts this risk by about **29%** (1 − 1/√2). Clearing houses size margin with similar logic, so T+1 also means the industry has to lock up less margin.

The cost is that back offices get just one night to finish matching, currency conversion and funding. That's especially tight for overseas investors: a European fund that buys U.S. stocks on Monday afternoon has to turn euros into dollars that same night — the most common complaint about T+1.

### ② Clearing houses and central counterparties: standing between every buyer and seller

Once a trade is confirmed, the clearing house uses a legal step called **novation** to split "A sells to B" into two trades: "A sells to the clearing house" and "the clearing house sells to B." From then on:

- A and B no longer have exposure to each other; **each faces only the clearing house.**
- If B defaults, A still gets paid; the clearing house deals with the loss.
- The clearing house has no directional risk of its own — it buys one share and sells one share, so its book is always flat. The only risk it carries is **a member defaulting.**

<figure><svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Bilateral clearing vs a CCP: risk goes from a web to a star</text><text x="160" y="46" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--muted)">Bilateral: every pair exposed (6 links)</text><text x="480" y="46" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--muted)">CCP: each faces the hub (4 links)</text><line x1="90" y1="80" x2="230" y2="80" stroke="var(--red)" stroke-width="1.5"/><line x1="90" y1="80" x2="90" y2="200" stroke="var(--red)" stroke-width="1.5"/><line x1="90" y1="80" x2="230" y2="200" stroke="var(--red)" stroke-width="1.5"/><line x1="230" y1="80" x2="90" y2="200" stroke="var(--red)" stroke-width="1.5"/><line x1="230" y1="80" x2="230" y2="200" stroke="var(--red)" stroke-width="1.5"/><line x1="90" y1="200" x2="230" y2="200" stroke="var(--red)" stroke-width="1.5"/><circle cx="90" cy="80" r="20" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="90" y="84" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">A</text><circle cx="230" cy="80" r="20" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="230" y="84" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">B</text><circle cx="90" cy="200" r="20" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="90" y="204" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">C</text><circle cx="230" cy="200" r="20" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="230" y="204" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">D</text><line x1="320" y1="40" x2="320" y2="235" stroke="var(--line)" stroke-dasharray="4 4"/><line x1="410" y1="80" x2="480" y2="140" stroke="var(--green)" stroke-width="2"/><line x1="550" y1="80" x2="480" y2="140" stroke="var(--green)" stroke-width="2"/><line x1="410" y1="200" x2="480" y2="140" stroke="var(--green)" stroke-width="2"/><line x1="550" y1="200" x2="480" y2="140" stroke="var(--green)" stroke-width="2"/><circle cx="410" cy="80" r="20" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="410" y="84" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">A</text><circle cx="550" cy="80" r="20" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="550" y="84" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">B</text><circle cx="410" cy="200" r="20" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="410" y="204" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">C</text><circle cx="550" cy="200" r="20" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="550" y="204" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">D</text><rect x="422" y="122" width="116" height="36" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="480" y="138" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">CCP</text><text x="480" y="151" text-anchor="middle" font-size="9.5" fill="var(--muted)">margin + default fund</text><text x="160" y="238" text-anchor="middle" font-size="10.5" fill="var(--red)">One failure spreads along many links</text><text x="480" y="238" text-anchor="middle" font-size="10.5" fill="var(--green)">Risk concentrated in one managed hub</text></svg><figcaption>n firms trading pairwise create n(n−1)/2 exposures; a central counterparty compresses them into n and "insures" each link with margin. The price: the clearing house itself becomes a node that must never fail.</figcaption></figure>

A clearing house protects itself with a **default waterfall**, which runs roughly in this order:

- **The defaulting member's own margin.** Every member posts **initial margin** (enough to cover extreme price moves over a day or two) and daily **variation margin** (settling that day's gains and losses at market value).
- **The defaulting member's contribution to the default fund.**
- **A slice of the clearing house's own capital** (often called "skin in the game").
- **The other members' contributions to the default fund**, plus, if needed, the right to call them for more.

That's the same "who absorbs the loss first" logic as the capital stack in Stage 6.1, applied to a trading system.

Clearing reaches far beyond stocks. U.S. Treasuries and repo are cleared by DTCC's **FICC**. After 2008, the G20 required standardized over-the-counter derivatives — including the interest-rate swaps of Stage 7.4 — to be centrally cleared. In 2023 the SEC went further, adopting rules that push more Treasury cash and repo trades into central clearing, phased in over 2026–2027. **The post-crisis reform philosophy: gather the scattered, invisible bilateral risks into a few transparent, margined clearing houses.** Critics point out that this also creates a handful of new "too big to fail" nodes — if a clearing house ever cracks, the consequences are hard to imagine.

### ③ Netting and margin: why the plumbing is so efficient

A clearing house's biggest trick is **multilateral netting**. Take a simplified day among three brokers:

- A buys $100 million of stock from B.
- B buys $80 million of stock from C.
- C buys $90 million of stock from A.

Settled trade by trade, the three would have to pay out a total of **$270 million** in cash. After netting, each looks only at its net position:

- A: pays $100M, receives $90M → **pays a net $10M.**
- B: receives $100M, pays $80M → **receives a net $20M.**
- C: receives $80M, pays $90M → **pays a net $10M.**

Only **$20 million** actually has to move — about **93%** less. In the real world, DTCC says the NSCC's netting cuts the value that has to be settled by more than 90% on average. **Netting is the plumbing's savings device: it lets the system support enormous trading volume with very little cash and securities.**

Netting needs two things: a **time window** (so trades can accumulate before being added up) and **credit** among participants (inside the window, everyone owes for a while). The clearing house prices that credit with **margin**:

- The more volatile the market, the higher the initial margin.
- The more concentrated and risky a member's positions, the bigger the extra charges on top.

That explains the GameStop day. In late January 2021 the stock's volatility was off the charts and Robinhood's clients were massively concentrated on the buy side, so the NSCC's margin formula produced a demand running to billions of dollars. Robinhood restricted buying because **its clients had built up a large, not-yet-settled exposure to the clearing house during the settlement window, and margin is the price of that exposure.** Moving to T+1 was itself partly about shrinking such windows.

**Margin cuts both ways.** It keeps the clearing house safe, but in violent markets it demands cash from everyone at once — the clearing-level version of the "margin call → forced selling → lower prices" spiral from Stage 7.5, and the engine of the UK LDI crisis in Stage 7.4.

### ④ The custody chain: who actually holds your shares

After settlement, where do the shares live? In a chain with several links:

<figure><svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The custody chain: each ledger only knows the next link</text><rect x="20" y="60" width="130" height="70" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="85" y="86" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ink)">Issuing company</text><text x="85" y="104" text-anchor="middle" font-size="10" fill="var(--muted)">register lists</text><text x="85" y="119" text-anchor="middle" font-size="10" fill="var(--orange-ink)">Cede &amp; Co.</text><rect x="175" y="60" width="130" height="70" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="240" y="86" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ink)">DTC depository</text><text x="240" y="104" text-anchor="middle" font-size="10" fill="var(--muted)">ledger lists</text><text x="240" y="119" text-anchor="middle" font-size="10" fill="var(--orange-ink)">each broker</text><rect x="330" y="60" width="130" height="70" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="395" y="86" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ink)">Your broker</text><text x="395" y="104" text-anchor="middle" font-size="10" fill="var(--muted)">ledger lists</text><text x="395" y="119" text-anchor="middle" font-size="10" fill="var(--orange-ink)">each client</text><rect x="485" y="60" width="135" height="70" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="552" y="86" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ink)">You</text><text x="552" y="104" text-anchor="middle" font-size="10" fill="var(--muted)">beneficial owner</text><text x="552" y="119" text-anchor="middle" font-size="10" fill="var(--muted)">hold an "entitlement"</text><line x1="150" y1="95" x2="168" y2="95" stroke="var(--ink)" stroke-width="1.5"/><polygon points="168,91 175,95 168,99" fill="var(--ink)"/><line x1="305" y1="95" x2="323" y2="95" stroke="var(--ink)" stroke-width="1.5"/><polygon points="323,91 330,95 323,99" fill="var(--ink)"/><line x1="460" y1="95" x2="478" y2="95" stroke="var(--ink)" stroke-width="1.5"/><polygon points="478,91 485,95 478,99" fill="var(--ink)"/><rect x="15" y="155" width="610" height="48" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="175" text-anchor="middle" font-size="11" fill="var(--ink)">Bitcoin self-custody: no intermediaries; the private key is the ownership (Stage 12.1)</text><text x="320" y="193" text-anchor="middle" font-size="10.5" fill="var(--muted)">Coins on an exchange: a claim on the exchange, usually without broker-style segregation</text></svg><figcaption>"Street name": almost every publicly traded U.S. stock is registered to Cede &amp; Co. What you actually own is a legally protected "securities entitlement" against your broker.</figcaption></figure>

This is holding in **street name**. You are the **beneficial owner**: you have the economic and legal rights to dividends and votes, but your name isn't on the register. Article 8 of the U.S. Uniform Commercial Code defines your right as a **securities entitlement** against your broker.

Why do it this way? Efficiency: almost every delivery becomes a single edit to DTC's ledger, with no paper to move. The trade-off comes with some risks and rules worth knowing:

- **Segregation of client assets.** U.S. brokers must keep clients' securities and cash separate from their own (the SEC's customer protection rule). If the broker fails, client assets aren't part of the bankrupt estate.
- **SIPC protection.** If a broker fails and client assets are **missing**, SIPC covers each client up to $500,000 (including up to $250,000 in cash). It protects against **custody failures**, not market losses — if the stock falls, SIPC pays nothing.
- **Securities lending.** With a margin account, your broker usually has the right to lend your shares to short sellers — another revenue stream (Stage 8.3 connects securities lending to repo).
- **Votes and information.** A company's proxy materials have to pass down this whole chain to reach you.

Now compare crypto. Bitcoin **self-custody** has no intermediaries at all — whoever holds the private key owns the coins (Stage 12.1). Leave your coins on an exchange, though, and what you own is a claim on the exchange. **That's the FTX lesson:** there was none of the mandatory segregation and independent custody a broker has, customer deposits were misused, and when the run came, the "balances" on the ledger turned out to be IOUs that couldn't be honored (Stage 10.5). Spot bitcoin ETFs (Stage 12.5) solve the problem the traditional way: a regulated custodian holds the bitcoin, and the fund's shares travel down exactly the same custody chain as any stock.

### ⑤ Atomic settlement on-chain: the lure and the cost of T+0

Blockchains offer another way to settle: **atomic settlement**. A single on-chain transaction can say "tokenized stock moves from A to B, stablecoins move from B to A," and **either both happen or neither does**. That's the ultimate form of the textbook ideal of **delivery versus payment (DvP)**:

- There's no settlement window, so **replacement-cost and principal risk both disappear.**
- No central counterparty is needed to guarantee the other side will deliver.
- Trading, clearing, settlement and record-keeping can all happen on the same ledger in seconds, 24/7.

It sounds perfect, but it strips out the two things from piece ③ that make the plumbing cheap:

- **No netting.** Every trade must be delivered in full, on the spot. With tens of millions of trades a day, participants need **gross** amounts of cash and securities rather than net. In the example above, the three brokers would need $270 million instead of $20 million.
- **No credit.** You have to put the money and securities on-chain beforehand — **prefunding**. Market makers can no longer "sell now, borrow later," and capital efficiency takes a big hit.

So the real-world direction isn't simply "turn T+1 into T+0"; it's **combining the strengths of both pipelines.** Tokenized money-market funds and Treasuries are being used as collateral that can move instantly around the clock (Stage 14.2); deposit tokens and stablecoins let the cash leg settle on-chain too (Stage 14.5); and traditional clearing institutions are experimenting with recording securities as tokens on a blockchain. **The real change isn't "how fast" — it's being able to choose, case by case, when credit is needed and when it isn't.**

That leads to the next lesson. The largest and most frequent transactions in the plumbing aren't stock trades at all; they're **overnight loans secured by securities** — repo (Stage 8.3), which brings together everything here: delivery, custody and margin.
`,

  demo: "clearing-settlement",

  analogy: `
Think of settlement as **a parcel pick-up point in an apartment complex**.

A hundred households trade second-hand goods with each other every day. If every deal were done face to face — you hand over cash, they hand over the item — everyone would be running up and down the stairs hundreds of times a day, always worried: I paid, but they say the item comes tomorrow; I handed it over, and they vanished.

So the complex sets up a **pick-up point** (the clearing house). The rule: every deal is logged there first, and the pick-up point **acts as the buyer to every seller and the seller to every buyer.** You only have to trust the pick-up point, not the neighbor. Every evening it **nets** the books: the Smiths bought $300 and sold $280 today, so they just pay $20; the Lees receive a net $50. Hundreds of deals, and only a few dozen dollars actually change hands. To stop anyone skipping out, every household posts a **deposit** (margin), and when second-hand prices get jumpy, the deposit goes up.

Where do the goods sit? Most people don't carry every item home; they leave it in the pick-up point's storeroom. The storeroom's logbook says "Acme Couriers," and Acme's own logbook says "Building 3, Apartment 502" — that's the **custody chain**. If the storeroom manager helps himself and never kept residents' goods apart from his own (**FTX**), the whole building suffers.

**Blockchain settlement** is like a smart locker: you put the cash in the left compartment, the other side puts the goods in the right one, and only when both are in do both doors open — nobody can cheat (**atomic settlement**). The catch: every single deal has to be pre-loaded into the locker; you can't run a tab and settle up in the evening. Someone who trades hundreds of times a day needs far more cash on hand.
`,

  misconceptions: [
    "**\"Once the trade fills, the cash and shares have changed hands.\"** — A fill is an agreement. U.S. stocks settle at T+1, and during that day the clearing house carries the counterparty risk for both sides and collects margin from brokers. The position in your app is \"pending settlement\" until then.",
    "**\"T+1 just gets investors their money a day sooner.\"** — The main goal is shrinking the window in which a counterparty can default before delivery. At 30% annual volatility, going from T+2 to T+1 cuts the 99% replacement cost by about 29%, and the margin the industry must lock up falls with it.",
    "**\"A central counterparty eliminates risk.\"** — It **concentrates** scattered bilateral risk into one node run with margin, a default fund and membership rules. Risk becomes more transparent and more controllable, but the clearing house itself becomes critical infrastructure that must not fail.",
    "**\"My shares are on the company's register under my name.\"** — Most U.S. stocks are held in street name: the register shows DTC's nominee, Cede & Co., and you are a beneficial owner whose rights run through your broker's books. Segregation and SIPC protect the custody, not the share price.",
    "**\"On-chain atomic settlement beats T+1 in every way, and the old plumbing will die.\"** — Atomic settlement removes settlement risk, but it also removes netting and credit: every trade must be prefunded in full, which can multiply funding needs tenfold or more. The realistic path combines the two pipelines rather than replacing one with the other.",
  ],

  quiz: [
    {
      q: "On what date did U.S. stocks move from a T+2 to a T+1 standard settlement cycle?",
      options: [
        "September 15, 2008",
        "September 5, 2017",
        "January 28, 2021",
        "May 28, 2024",
      ],
      answer: 3,
      explain: "U.S. stocks moved to T+1 on **May 28, 2024**; September 2017 was the move from T+3 to T+2. The main point of shortening the cycle is to cut counterparty risk and margin needs during the settlement window.",
    },
    {
      q: "A buys $100M from B, B buys $80M from C, and C buys $90M from A. After multilateral netting, how much cash actually has to move?",
      options: [
        "$270 million",
        "$20 million",
        "$90 million",
        "Zero",
      ],
      answer: 1,
      explain: "A pays a net $10M, C pays a net $10M, B receives a net $20M: only **$20 million** moves, about 93% less than the $270 million of trade-by-trade settlement. That's how a clearing house makes the plumbing cheap.",
    },
    {
      q: "After a central counterparty steps into a trade through novation, which statement is true?",
      options: [
        "The clearing house becomes the buyer to every seller and the seller to every buyer; it has no directional risk and bears only member-default risk",
        "The clearing house holds large long stock positions and profits when prices rise",
        "The buyer and seller still face each other's default risk directly",
        "The clearing house guarantees investors won't lose money",
      ],
      answer: 0,
      explain: "Novation splits the bilateral trade into two trades against the clearing house, whose book is always flat. It handles member defaults with **margin and a default waterfall**; it guarantees no one's investment returns.",
    },
    {
      q: "The shares in your U.S. brokerage account are usually registered on the company's books in whose name?",
      options: [
        "Yours",
        "Your broker's",
        "Cede & Co., DTC's nominee",
        "The SEC's",
      ],
      answer: 2,
      explain: "That's **street name**: the register says Cede & Co., DTC's ledger says your broker, your broker's ledger says you. You're the beneficial owner, holding a \"securities entitlement\" against your broker.",
    },
    {
      q: "What is the biggest cost of on-chain atomic settlement (T+0) compared with T+1?",
      options: [
        "All trade information is public, with no privacy at all",
        "Losing netting and credit: every trade must be prefunded in full, so funding needs rise sharply",
        "Settlement actually becomes slower",
        "It always requires a central counterparty",
      ],
      answer: 1,
      explain: "Atomic settlement removes settlement risk but also takes away netting and the ability to \"owe for a while.\" The system has to hold **gross** rather than net cash and securities — which is why the realistic path combines the two pipelines.",
    },
  ],

  further: [
    { label: "SEC: final rule shortening the securities settlement cycle to T+1 (2023)", url: "https://www.sec.gov/rules-regulations/2023/02/shortening-securities-transaction-settlement-cycle" },
    { label: "DTCC: overview of clearing and settlement services (NSCC, DTC, FICC)", url: "https://www.dtcc.com/clearing-and-settlement-services" },
    { label: "BIS/IOSCO: Principles for Financial Market Infrastructures (PFMI, 2012)", url: "https://www.bis.org/cpmi/publ/d101a.pdf" },
    { label: "SIPC: what SIPC protects — and what it doesn't — when a broker fails", url: "https://www.sipc.org/for-investors/what-sipc-protects" },
    { label: "RWA Path (sister course): tokenization and on-chain settlement in depth", url: "https://evidex-cloud.github.io/droplet-labs-rwa-path/" },
  ],
};
