export default {
  id: "new-era-map",
  stage: 0,
  order: 4,
  title: "The New-Era Map: TradFi, DeFi, Tokenization, Digital Treasury Companies & AI on One Page",
  difficulty: "intro",
  prereqs: ["finance-history"],

  oneLiner:
    "Finance in the new era isn't one continent; it's five connected regions: **traditional finance** (banks, Treasuries, stocks, funds — the tens-of-trillions home base), **the bridges** (spot ETFs, stablecoins, tokenized funds — joining old and new), **the on-chain world** (Bitcoin and DeFi), **digital asset treasury companies** (listed companies that hold bitcoin using old tools: stock, convertibles, preferreds), and **AI**, which is reshaping both capital spending and who trades. This lesson draws them on one page, marks **where the money sits and where the risk flows**, and points to the stage that explains each piece.",

  intuition: `
Over the last three lessons we learned three things: finance does three kinds of moving (Stage 0.1), four ideas sit beneath it (Stage 0.2), and five thousand years of innovation were stacked layer on layer (Stage 0.3). This lesson zooms in on the present and draws **a map of finance as it stands in 2026**.

Why a map? Because the news only ever shows you a fragment. One day it's “Treasury yields,” the next it's “stablecoin legislation,” the day after it's “a company issues preferred stock to buy bitcoin.” Without a map, those stories are loose puzzle pieces. With one, you can see at a glance where a piece fits, what it borders, and which way the risk will flow.

The map has five regions, running roughly from old to new, left to right:

- **Traditional finance (TradFi):** banks, Treasuries, stocks and all kinds of funds. This is where the money lives. As of September 2026, US federal debt held by the public was about $32 trillion and the US stock market was worth more than $60 trillion. **This is where the world's price of time gets set.**
- **The bridges:** tools that connect the traditional world with the on-chain one. Spot bitcoin ETFs let you buy bitcoin in a brokerage account; stablecoins move dollars onto blockchains (about $310 billion of them); tokenized Treasury funds move Treasury shares on-chain too (about $15–16 billion by mid-2026).
- **The on-chain world:** Bitcoin (about $1.7 trillion in total value at roughly $84,000 per coin in late September 2026) and DeFi (on-chain lending and trading, with about $95 billion locked up).
- **Digital asset treasury companies (DATs):** companies listed on ordinary stock exchanges whose main asset is bitcoin. They sit in the middle of the map — **assets on-chain, liabilities in traditional finance.** In late September 2026, listed companies together held about 1.27–1.30 million bitcoin, and Strategy alone held about 846,000 (as of September 20).
- **AI:** not a “financial product,” but it redraws the map in two directions. As **a new capital good** — data centers, chips, power — it needs trillions of dollars of financing and is adding to the supply of long-term bonds. As **a new market participant**, AI agents may need programmable money to pay for things.

Knowing “where” isn't enough. A map earns its keep by answering two questions.

**First: where's the money?** The vast majority is still in traditional finance. Treasuries and stocks are dozens of times bigger than bitcoin, more than a hundred times bigger than stablecoins, and thousands of times bigger than tokenized Treasuries. **The new finance is growing fast, but it's still small** — a fact enthusiastic coverage tends to skip.

**Second: where's the risk?** Risk doesn't necessarily sit where the money sits. It travels across the bridges. When bitcoin falls, the losers aren't only on-chain holders but also ETF shareholders and the common and preferred holders of DATs. When Treasury yields rise, the losers aren't only bondholders but also perpetual preferreds, growth stocks — and the profit model of stablecoin issuers shifts too, since their reserves earn more. **Understanding how risk flows across the bridges is the core skill this course sets out to teach.**

The map uses all four ideas at once. Treasuries set the price of time (①). Every bridge is a claim written on someone's books (②): an ETF share is the fund's liability, a stablecoin is the issuer's, a DAT preferred is the company's. The bridges themselves are plumbing (③). And DATs and on-chain leverage are where risk and leverage are most concentrated (④).

One last caution: this map shows September 2026. The US stablecoin law, the GENIUS Act, is on the books, but the CLARITY Act on crypto market structure failed a Senate procedural vote on September 15; bitcoin is in a bear phase after its October 2025 peak; and on September 16 the Fed raised rates for the first time since 2023. **The borders on the map move every year**, but the relationships between regions — who is whose liability, which bridge the risk crosses — change far more slowly.

**This lesson breaks into five parts:**

- **① The one-page map: five regions and the bridges between them**
- **② Traditional finance: home base for money, and where the price of time is made**
- **③ The bridges: ETFs, stablecoins and tokenized funds**
- **④ The on-chain world and digital asset treasury companies: new assets, old tools**
- **⑤ AI and the whole map: where the money sits, where the risk flows**
`,

  mechanics: `
### ① The one-page map: five regions and the bridges between them

<figure><svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The 2026 new-era map: where the money sits, where the risk flows</text><rect x="14" y="36" width="170" height="200" rx="10" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="99" y="58" text-anchor="middle" font-size="12" font-weight="700" fill="var(--blue)">Traditional finance</text><text x="99" y="82" text-anchor="middle" font-size="11" fill="var(--ink)">Banks · deposits</text><text x="99" y="102" text-anchor="middle" font-size="11" fill="var(--ink)">Treasuries (~$32T public)</text><text x="99" y="122" text-anchor="middle" font-size="11" fill="var(--ink)">Stocks ($60T+)</text><text x="99" y="142" text-anchor="middle" font-size="11" fill="var(--ink)">Funds · private credit</text><text x="99" y="170" text-anchor="middle" font-size="10" fill="var(--muted)">Stages 4–8</text><text x="99" y="190" text-anchor="middle" font-size="10" fill="var(--orange-ink)">Sets the price of time ①</text><rect x="234" y="36" width="170" height="200" rx="10" fill="var(--surface-2)" stroke="var(--line)"/><text x="319" y="58" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">The bridges</text><text x="319" y="82" text-anchor="middle" font-size="11" fill="var(--ink)">Spot bitcoin ETFs</text><text x="319" y="102" text-anchor="middle" font-size="11" fill="var(--ink)">Stablecoins (~$310B)</text><text x="319" y="122" text-anchor="middle" font-size="11" fill="var(--ink)">Tokenized Treasuries (~$15B)</text><text x="319" y="142" text-anchor="middle" font-size="11" fill="var(--ink)">Tokenized stocks</text><text x="319" y="170" text-anchor="middle" font-size="10" fill="var(--muted)">Stages 12.5 · 13.2 · 14</text><text x="319" y="190" text-anchor="middle" font-size="10" fill="var(--orange-ink)">Rebuilding the plumbing ③</text><rect x="454" y="36" width="172" height="200" rx="10" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="540" y="58" text-anchor="middle" font-size="12" font-weight="700" fill="var(--btc)">On-chain world</text><text x="540" y="82" text-anchor="middle" font-size="11" fill="var(--ink)">Bitcoin (~$1.7T)</text><text x="540" y="102" text-anchor="middle" font-size="11" fill="var(--ink)">DeFi (~$95B locked)</text><text x="540" y="122" text-anchor="middle" font-size="11" fill="var(--ink)">On-chain lending · AMMs</text><text x="540" y="170" text-anchor="middle" font-size="10" fill="var(--muted)">Stages 12–13</text><text x="540" y="190" text-anchor="middle" font-size="10" fill="var(--orange-ink)">No-counterparty asset ②</text><path d="M184 110 L234 110" stroke="var(--blue)" stroke-width="3"/><path d="M404 110 L454 110" stroke="var(--btc)" stroke-width="3"/><rect x="164" y="250" width="300" height="62" rx="10" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="314" y="270" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Digital asset treasury companies</text><text x="314" y="287" text-anchor="middle" font-size="10" fill="var(--ink)">Assets on-chain (bitcoin)</text><text x="314" y="302" text-anchor="middle" font-size="10" fill="var(--ink)">Liabilities in TradFi (stock · converts · preferreds)</text><path d="M110 236 L196 250" stroke="var(--blue)" stroke-width="2" stroke-dasharray="5 3"/><path d="M520 236 L440 250" stroke="var(--btc)" stroke-width="2" stroke-dasharray="5 3"/><text x="186" y="241" text-anchor="middle" font-size="9" fill="var(--muted)">raise money</text><text x="446" y="241" text-anchor="middle" font-size="9" fill="var(--muted)">hold BTC</text><rect x="476" y="256" width="150" height="50" rx="10" fill="var(--green-soft)" stroke="var(--green)"/><text x="551" y="277" text-anchor="middle" font-size="12" font-weight="700" fill="var(--green)">AI</text><text x="551" y="295" text-anchor="middle" font-size="10" fill="var(--ink)">New capital good · new trader</text><rect x="14" y="256" width="140" height="50" rx="10" fill="var(--surface-2)" stroke="var(--line)"/><text x="84" y="277" text-anchor="middle" font-size="10" fill="var(--muted)">Approximate sizes,</text><text x="84" y="293" text-anchor="middle" font-size="10" fill="var(--muted)">US dollars, Sept 2026</text></svg><figcaption>Five regions, two main bridges, and a hybrid standing in the middle. AI acts on the map from outside, through both the demand for capital (rates) and the payment plumbing.</figcaption></figure>

Three things to read off the map:

- **Left to right runs old to new — and big to small.** The further right you go, the faster the growth, but the smaller the size, the wilder the swings and the newer the legal framework.
- **The bridges carry traffic both ways.** Money can flow from traditional finance onto the chain (buying ETFs, minting stablecoins), and risk can flow back from the chain into traditional finance (when bitcoin crashes, ETF and DAT holders are hurt too).
- **DATs sit between the two bridges.** They raise money in traditional capital markets and turn it into bitcoin — each one is itself a bridge, built out of a balance sheet.

### ② Traditional finance: home base for money, and where the price of time is made

Traditional finance is still by far the biggest region on the map:

<table>
<tr><th>Component</th><th>Whose liability / what claim</th><th>Size (approx., as of Sept 2026)</th><th>Where the course covers it</th></tr>
<tr><td>US Treasuries</td><td>The US government's liability</td><td>About $32.4T held by the public (of which about $7.3T in T-bills)</td><td>Stage 4.1, Stage 4.5</td></tr>
<tr><td>US stocks</td><td>A claim on companies' residual profits</td><td>Over $60T in total; S&P 500 around 7,700</td><td>Stage 5</td></tr>
<tr><td>Bank deposits</td><td>Banks' liabilities</td><td>Tens of trillions of dollars</td><td>Stage 1.2</td></tr>
<tr><td>Private credit</td><td>Loans from non-bank funds to companies</td><td>About $1.5–2T globally (end-2024)</td><td>Stage 8.4</td></tr>
</table>

This region's core function is **pricing time**. Treasuries are the “risk-free” borrower, so their yields anchor the discount rate for every asset (Idea ①). As of September 25, 2026, the 10-year Treasury yielded about 5.2% and the 30-year about 5.5%. **When they move, the whole map moves:**

- A 30-year Treasury with a 5.5% coupon loses about 13% of its value if its yield rises one more percentage point.
- A stock whose dividend grows 4% a year and which investors price at an 8% required return falls about 20% under the Gordon growth model if rising rates push that required return to 9% (Stage 5.3).
- A perpetual preferred paying $10 a year and priced at a 10% yield drops from $100 to about $90.90 if the required yield rises to 11% (Stage 18.1).

**That's why this course starts with money, interest rates and bonds rather than jumping straight to bitcoin.** If you don't understand this region, you can't read any of the bridges.

### ③ The bridges: ETFs, stablecoins and tokenized funds

The bridges are the fastest-changing part of the map. For each one, ask Idea ②'s question: **“What I'm holding — whose liability is it?”**

- **Spot bitcoin ETFs** (trading since January 2024): you own fund shares; the fund holds bitcoin through a custodian. On September 25, 2026, the largest — BlackRock's IBIT — had net assets of about $67 billion. ETFs let **money that can't or won't hold coins directly** — pensions, ordinary brokerage clients — buy bitcoin exposure (Stage 12.5).
- **Stablecoins:** the issuer's liability, backed mainly by cash and short-dated Treasury bills. On September 26, 2026, total supply was about $312 billion, with USDT at about $184 billion and USDC at about $75 billion. The US GENIUS Act bars issuers from paying interest to holders, so the reserve income belongs to the issuer — and **stablecoin issuers have become significant buyers of T-bills** (Stage 13.2).
- **Tokenized Treasury funds:** Treasury fund shares recorded on a blockchain, transferable 24/7 and usable as collateral. They reached about $15–16 billion by mid-2026 — roughly 0.2% of the approximately $7.3 trillion T-bill market (Stage 14.2).
- **Tokenized stocks:** a record of about $4.5 billion in late August 2026, a rounding error next to $60 trillion-plus of US stocks — but Nasdaq, the NYSE and the Depository Trust & Clearing Corporation (DTCC) are all advancing rules and pilots (Stage 14.3).

**The bridges are small but strategically placed:** they determine how fast money and risk can move between the two landmasses. As of September 2026, US rules were only half built: stablecoins have a federal law, while the market-structure bill remains stuck in the Senate (Stage 14.5).

### ④ The on-chain world and digital asset treasury companies: new assets, old tools

**The on-chain world** has two big pieces:

- **Bitcoin:** about 20.09 million coins mined out of a 21 million cap, priced around $84,000 in late September 2026, for a total value of roughly $1.7 trillion. It's nobody's liability (Idea ②) and has no cash flows, so its price is set purely by supply, demand and expectations — which is why it swings so hard: from a peak near $126,000 in October 2025 to about $58,000 at the end of June 2026, a fall of more than half (Stage 12.3, Stage 12.4).
- **DeFi:** lending, trading and yield products built from smart contracts. About $95 billion is locked up, but most of it is valued in crypto assets, so it rises and falls with token prices (Stage 13.1, Stage 13.4).

**Digital asset treasury companies** are the most unusual region on the map and the focus of the whole course. They're **ordinary listed companies** that make bitcoin their main asset and raise money with traditional tools:

- **Common stock:** when the share price is above the value of the bitcoin behind each share, issuing new shares to buy bitcoin raises bitcoin per share (Stage 16.7).
- **Convertible bonds:** borrowing at low or even zero interest, in exchange for giving lenders the right to swap into shares later (Stage 17.2).
- **Preferred stock:** “selling yield” to income-seeking investors — exactly the “roughly 10% bitcoin-backed preferred” headline from Stage 0.1 (Stage 17.3).

As of September 20, 2026, Strategy held about 846,000 bitcoin — around two-thirds of all bitcoin held by listed companies. Strive held about 26,000 as of September 18 and stresses that it carries no debt, using only preferred stock for leverage. After an explosive 2025, the sector entered a shakeout from late 2025 into 2026 as bitcoin fell; one research firm counted only a handful of the 20 largest treasury companies still trading above the value of their bitcoin in September 2026. **The specific data, strengths and weaknesses of these companies start in Stage 15.1. This lesson covers mechanisms and analytical frameworks only; it is not investment advice.**

Why do these companies deserve four full stages? Because they compress all four of the course's ideas into a single balance sheet. The value of the **assets** is set by bitcoin (④). The **liabilities** are convertible notes and preferreds lined up by seniority (②). The preferreds' yields have to compete with Treasuries (①). And whether the company can keep raising money depends on whether the capital-markets plumbing stays open and investors keep trusting it (③).

### ⑤ AI and the whole map: where the money sits, where the risk flows

**AI plays two roles on the map:**

- **A new capital good.** Building data centers, buying chips and connecting to the grid takes enormous sums. Research cited by the Financial Stability Board puts AI and data-center capital spending at about $2.9 trillion over 2025–2028, with about $1.5 trillion needing outside financing — around $800 billion of it from private credit. In September 2026, record long-dated corporate bond issuance was cited as one of the forces pushing long-term rates up. **AI is moving the world's price of time through the simple act of borrowing** (Stage 19.1, Stage 19.2).
- **A new market participant.** If AI agents are going to place orders and pay for services on their own, they need money that's programmable, available 24/7 and able to handle tiny payments — precisely what stablecoins are good at (Stage 19.4).

**Compress the map into one money-and-risk table:**

<table>
<tr><th>Region</th><th>How much money</th><th>Main risks</th><th>Which bridge the risk crosses</th></tr>
<tr><td>Traditional finance</td><td>The most (tens of trillions)</td><td>Rates, credit, bank runs</td><td>Rising rates → lower valuations everywhere, including bitcoin and preferreds</td></tr>
<tr><td>The bridges</td><td>Hundreds of billions</td><td>Issuers and custody, depegs, legal frameworks</td><td>A stablecoin run → forced T-bill sales</td></tr>
<tr><td>The on-chain world</td><td>About $1.8T</td><td>Price swings, contract bugs, on-chain leverage</td><td>A bitcoin drop → losses for ETF and DAT holders</td></tr>
<tr><td>DATs</td><td>Bitcoin holdings on the order of $100B</td><td>Leverage, premium compression, capital-market access closing</td><td>Common and preferred holders (many in ordinary brokerage accounts)</td></tr>
<tr><td>AI</td><td>Trillions in planned capital spending</td><td>Overinvestment, opaque financing structures</td><td>Long-bond supply → term premium; private credit</td></tr>
</table>

**The single most important observation: the money is mostly on the left, the risk amplifiers are mostly on the right, and the master switch — interest rates — sits at the far left.** That's why the three headlines in Stage 0.1 weren't in random order: first the Treasury yield (the master switch), then the plumbing (the bridges), and finally the DAT that holds a new asset with old tools (the amplifier). By Stage 20.1, you'll turn this map into one complete chain of cause and effect.
`,

  demo: "new-era-map",

  analogy: `
Picture the new financial landscape as **a world map of continents, straits and islands**.

On the left lies a vast, ancient **continent** — traditional finance. It has the most people, the densest cities and the most concentrated wealth. At its center stands a **central-bank lighthouse** whose beam (interest rates) reaches every corner of the map. When the beam brightens (rates rise), every ship has to replot its course.

On the right is a young **archipelago** — the on-chain world. Its rules are written in code, its harbors never close, and it grows astonishingly fast, but the seas are far rougher: one storm (a bitcoin crash, a smart-contract bug) can sweep away half a harbor overnight.

Between the continent and the islands runs a **strait**, and several **bridges** are going up across it. One is called ETFs: it lets people on the continent buy the islands' specialty goods without going to sea. One is called stablecoins: it carries the continent's currency over to circulate on the islands. Another is tokenized Treasuries: it moves the continent's sturdiest assets to the islands to serve as collateral. The more bridges there are, the easier the traffic — but storms can also ride the bridges from one side to the other.

In the middle of the strait float a few **artificial islands** — digital asset treasury companies. They're built from continental materials (stock, bonds, preferreds), but they keep their entire inventory (bitcoin) over on the archipelago. When the tide (the bitcoin price) rises, they float high and attract more settlers from the continent (new share issuance); when the tide goes out, they're the first to run aground.

And across the sky blows a new **monsoon** — AI. It sweeps out from the continent in every direction, bringing huge construction demand (capital spending) and new travelers (AI agents), while quietly changing how bright the lighthouse burns (long-term interest rates).

The rest of this course walks you through the map region by region on foot — and then brings you back to this page to see how the tide, the lighthouse and the monsoon together decide the fate of every ship.
`,

  misconceptions: [
    "**“The new finance is already bigger than the old.”** — Not even close. As of September 2026, publicly held US Treasuries were about $32 trillion and US stocks over $60 trillion, versus roughly $1.7 trillion for bitcoin, about $310 billion for stablecoins and about $15 billion for tokenized Treasuries. The new finance grows fast and matters a lot, but it's still one to three orders of magnitude smaller.",
    "**“Owning a bitcoin ETF is exactly the same as holding bitcoin yourself.”** — An ETF share is the fund's liability, and a custodian holds the coins; you take on the risks of the fund-and-custody chain in exchange for brokerage-account convenience. Holding coins yourself removes the counterparty but means managing your own keys (Stage 12.5, Stage 15.5).",
    "**“A stablecoin is just an on-chain dollar with no risk.”** — A stablecoin is its issuer's liability, and whether it redeems one-for-one depends on the quality of its reserves and the issuer's credit. In March 2023, USDC briefly fell to about $0.87 when part of its reserves were stuck at Silicon Valley Bank (Stage 13.2).",
    "**“A digital asset treasury company is just a bitcoin fund.”** — It's a company with a balance sheet: convertible notes and preferreds that rank ahead of the common, leverage, a premium or discount to its holdings, and funding-access risk. Its common stock usually moves more than one-for-one with bitcoin (Stage 15.1, Stage 16.4). Not investment advice.",
    "**“AI is a tech-stock story; it has nothing to do with interest rates.”** — AI requires trillions of dollars of capital spending, much of it financed with bonds and private credit. Record long-dated corporate bond issuance in 2026 was cited as one of the forces pushing long-term rates higher (Stage 19.2).",
  ],

  quiz: [
    {
      q: "On this lesson's map, which region sets the price of time for the whole map?",
      options: ["DeFi lending protocols", "The Treasury market within traditional finance", "Stablecoin issuers", "Digital asset treasury companies"],
      answer: 1,
      explain: "Treasuries are treated as the risk-free borrower, so **their yield anchors the discount rate for every asset** (Idea ①). Returns everywhere else get measured against it (Stage 2.4, Stage 4.5).",
    },
    {
      q: "Why do digital asset treasury companies “sit in the middle of the map”?",
      options: [
        "Because they issue their own tokens on-chain",
        "Because they are government agencies",
        "Because their assets are on-chain (bitcoin) while their liabilities are traditional stock, convertibles and preferreds",
        "Because they only trade on weekends",
      ],
      answer: 2,
      explain: "**New assets, old tools:** they raise money in traditional capital markets and convert it into bitcoin, making each one a bridge built from a balance sheet (Stage 15.1). Not investment advice.",
    },
    {
      q: "By mid-2026 tokenized Treasuries were about $15–16 billion, against a T-bill market of about $7.3 trillion. What does that tell you?",
      options: [
        "Tokenized Treasuries are only about 0.2% of the T-bill market — growing fast, but still tiny",
        "Tokenized Treasuries have replaced traditional Treasuries",
        "The T-bill market is shrinking",
        "The two have nothing to do with each other",
      ],
      answer: 0,
      explain: "$15 billion ÷ $7.3 trillion ≈ **0.2%**. The new plumbing is growing quickly but is still orders of magnitude smaller than the traditional market — keep that sense of proportion when reading headlines (Stage 14.2).",
    },
    {
      q: "If bitcoin falls by half from its peak, across which bridges does the risk reach investors in traditional finance?",
      options: [
        "It doesn't; bitcoin only affects on-chain users",
        "Only through stablecoins",
        "Only through Treasuries",
        "Through spot bitcoin ETF holders and the common and preferred holders of digital asset treasury companies",
      ],
      answer: 3,
      explain: "ETF shares and DAT securities mostly sit in ordinary brokerage accounts, so **risk flows back from the chain into traditional finance**. DAT common stock, being levered, is often hit harder (Stage 16.4, Stage 18.2).",
    },
    {
      q: "What is the main path by which AI affects long-term interest rates?",
      options: [
        "AI directly sets the Fed's policy rate",
        "Massive capital spending needs heavy bond and private-credit financing, adding to the supply of long-term debt",
        "AI makes all bonds default automatically",
        "AI has nothing to do with interest rates",
      ],
      answer: 1,
      explain: "AI and data-center capital spending of about $2.9 trillion over 2025–2028 relies heavily on outside financing; **more long-term borrowing means more long-bond supply**, one of the forces behind higher long rates in 2026 (Stage 19.1, Stage 19.2).",
    },
  ],

  further: [
    { label: "US Treasury Fiscal Data: Debt to the Penny (daily federal debt)", url: "https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/" },
    { label: "DefiLlama: total stablecoin supply and issuer breakdown", url: "https://defillama.com/stablecoins" },
    { label: "rwa.xyz: data on tokenized real-world assets and tokenized Treasuries", url: "https://app.rwa.xyz/" },
    { label: "Financial Stability Board (May 2026): report on private credit, including AI financing", url: "https://www.fsb.org/uploads/P060526.pdf" },
    { label: "RWA Path (sister course): a complete introduction to tokenization", url: "https://evidex-cloud.github.io/droplet-labs-rwa-path/" },
  ],
};
