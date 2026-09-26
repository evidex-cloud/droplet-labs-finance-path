export default {
  id: "tokenized-stocks",
  stage: 14,
  order: 3,
  title: "Tokenized Stocks & 24/7 Markets: Will the Stock Market Move On-Chain?",
  difficulty: "newfin",
  prereqs: ["tokenization-why", "exchanges-brokers", "clearing-settlement"],

  oneLiner: `The US stock market is open for regular trading during only about 19% of the hours in a year; bitcoin never closes. **Tokenized stocks** aim to bring equities into that always-on world. But "Apple on-chain" can mean three very different things: a **natively tokenized share** that the issuer recognizes and that is fully interchangeable with ordinary stock; a **wrapped token** issued by a third party that holds the real shares; or **synthetic exposure** with no shares behind it at all. Through 2025 and 2026 the US framework fell into place piece by piece: DTC's tokenization pilot, SEC approval for Nasdaq to trade tokenized securities, and the September 2026 "innovation exemption." This lesson covers what you are actually buying, why 24/7 trading is harder than it sounds, and whether a DAT's preferred stock might one day trade on-chain.`,

  intuition: `
Start by counting the stock market's opening hours. Regular trading in US stocks runs from 9:30 a.m. to 4:00 p.m. Eastern: 6.5 hours a day, about 252 trading days a year, or roughly **1,640 hours**. A year has 8,760 hours. **So the market is open for regular trading about 19% of the time.** For the other 81%, news keeps happening, but prices cannot react until the next open.

Crypto markets do not have this problem. As Stage 8.1 showed, bitcoin, stablecoins and DeFi protocols run 24/7. Big news at 2 a.m. on a Saturday moves the price immediately. Which raises an obvious question: **could stocks join that never-closing market too?**

That is the idea behind **tokenized stocks**. It sounds simple, but "one Apple share on-chain" has at least three completely different meanings:

- **A natively tokenized share**: the ownership record of the share itself moves on-chain, with the blessing of the issuer and the central depository. It is **identical to, and interchangeable with**, the ordinary share in your brokerage account, with the same votes, dividends and claim in bankruptcy.
- **A wrapped token**: a company buys real shares, holds them in custody and issues tokens one for one. What you hold is **a claim on that company**, which in turn has a claim on the shares.
- **Synthetic exposure**: an on-chain contract that merely **tracks** the share price, such as a perpetual future. There is no stock behind it; your gains are someone else's losses.

This lesson sits on **Idea ③, liquidity and trust (the plumbing)**, and keeps circling back to **Idea ②**: on whose balance sheet is your claim actually written? The three kinds of "on-chain stock" can look identical on a trading screen and **still be three different assets in law**. It is the sharpest application of the Stage 14.1 warning that a token is only a receipt.

The market is still small. By rwa.xyz's count (as reported by CoinDesk), tokenized stocks hit a record of about **$4.45 billion on August 26, 2026**, led by Securitize at about $1.40 billion, Ondo at about $0.96 billion and xStocks at about $0.93 billion. The Block counted about $2.8 billion in mid-August, and Bernstein's June figure was about $1.6 billion. **The trackers differ by roughly a factor of three**, so always name the source. Whichever number you pick, it is a rounding error next to more than $60 trillion of US equities.

The part worth watching is **the rulebook**. In December 2025, SEC staff issued a no-action letter allowing DTC, the central depository for US stocks, to run a three-year tokenization pilot. On March 19, 2026, the SEC approved Nasdaq's rule to trade tokenized stocks and ETFs on the same order book as ordinary shares. On September 17, 2026, the SEC issued an "innovation exemption" that lets qualifying "Tokenized Securities Venues" trade tokenized stocks, including through permissioned automated-market-maker pools. **For the first time, the core plumbing of the US stock market is formally making room for tokens.**

At the end we return to the course's main subject, digital asset treasury companies. The Strategy preferred stocks you will meet in Stage 17.3 are income securities backed by bitcoin, and bitcoin trades 24/7. Could they one day trade on-chain? Would that make them better or more dangerous?

**This lesson breaks into five parts:**

- **① Market hours: why anyone wants 24/7 stocks**
- **② Three kinds of "on-chain stock": native, wrapped, synthetic**
- **③ The US framework: DTC's pilot, Nasdaq and NYSE, the SEC's innovation exemption**
- **④ The real problems of 24/7 trading: price discovery, liquidity, corporate actions**
- **⑤ Will DAT preferreds move on-chain?**
`,

  mechanics: `
### ① Market hours: why anyone wants 24/7 stocks

There are three serious reasons to want round-the-clock stock trading, and one that is usually overstated.

**Serious reason one: global investors.** US stocks are owned all over the world, and for investors in Asia the regular session falls in the middle of the night. Many people outside the US cannot easily open a US brokerage account but already have a stablecoin wallet. **Tokenized stocks plus stablecoins** would, in principle, let them trade US equities during their own daytime, with tools they already use.

**Serious reason two: risk management.** Geopolitical, central-bank and company news that breaks over a weekend shows up in stock prices only at Monday's open, as a gap. Trading at the weekend means hedging or cutting risk at the weekend. When the US–Israel war with Iran began on Saturday, February 28, 2026, bitcoin could trade on the news that same day; US stocks had to wait until Monday.

**Serious reason three: collateral.** Just like tokenized Treasuries (Stage 14.2), a share that can move 24/7 can be posted as margin at any hour, deposited in a lending protocol, and sit on the same ledger as stablecoins and bitcoin.

**The overstated reason: "more trading hours means more liquidity."** Liquidity does not appear out of thin air because the doors stay open longer. More likely it gets **spread thinner** across more hours. Fewer traders and market makers are active at weekends, so spreads are wider and small orders move prices further (part ④ puts numbers on this).

One more fact is worth holding onto: **demand for the synthetic version is already large.** In 2026, the real-world-asset perpetual futures (stocks and commodities) listed on Hyperliquid through its HIP-3 framework became its largest category, and the platform's open interest hit a record $14.3 billion on September 8, 2026. **The appetite for trading stock prices around the clock is real; for now much of it is being met by derivatives that hold no shares at all.**

### ② Three kinds of "on-chain stock": native, wrapped, synthetic

Put the three side by side and the differences are plain:

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">What is the "on-chain stock" you just bought?</text><rect x="170" y="36" width="150" height="34" rx="6" fill="var(--green-soft)" stroke="var(--green)"/><text x="245" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="var(--green)">Native tokenized share</text><text x="245" y="65" text-anchor="middle" font-size="9" fill="var(--muted)">e.g. DTC pilot / Nasdaq rule</text><rect x="325" y="36" width="150" height="34" rx="6" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="400" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Wrapped token</text><text x="400" y="65" text-anchor="middle" font-size="9" fill="var(--muted)">Third party holds, mints 1:1</text><rect x="480" y="36" width="150" height="34" rx="6" fill="var(--red-soft)" stroke="var(--red)"/><text x="555" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">Synthetic exposure</text><text x="555" y="65" text-anchor="middle" font-size="9" fill="var(--muted)">e.g. stock perpetuals</text><text x="20" y="96" font-size="11" fill="var(--ink)">Your claim is on</text><text x="245" y="96" text-anchor="middle" font-size="10" fill="var(--ink)">The issuer (like any share)</text><text x="400" y="96" text-anchor="middle" font-size="10" fill="var(--ink)">The token issuer / its SPV</text><text x="555" y="96" text-anchor="middle" font-size="10" fill="var(--ink)">Counterparty / margin pool</text><line x1="20" y1="106" x2="630" y2="106" stroke="var(--line)"/><text x="20" y="126" font-size="11" fill="var(--ink)">Voting rights</text><text x="245" y="126" text-anchor="middle" font-size="11" fill="var(--green)">Yes</text><text x="400" y="126" text-anchor="middle" font-size="11" fill="var(--orange-ink)">Usually not</text><text x="555" y="126" text-anchor="middle" font-size="11" fill="var(--red)">No</text><line x1="20" y1="136" x2="630" y2="136" stroke="var(--line)"/><text x="20" y="156" font-size="11" fill="var(--ink)">Dividends</text><text x="245" y="156" text-anchor="middle" font-size="11" fill="var(--green)">Paid directly</text><text x="400" y="156" text-anchor="middle" font-size="11" fill="var(--orange-ink)">Passed on or reinvested</text><text x="555" y="156" text-anchor="middle" font-size="11" fill="var(--red)">Contract adjustment</text><line x1="20" y1="166" x2="630" y2="166" stroke="var(--line)"/><text x="20" y="186" font-size="11" fill="var(--ink)">Swap for the real share?</text><text x="245" y="186" text-anchor="middle" font-size="11" fill="var(--green)">It is one (fungible)</text><text x="400" y="186" text-anchor="middle" font-size="11" fill="var(--orange-ink)">Per terms, often institutions only</text><text x="555" y="186" text-anchor="middle" font-size="11" fill="var(--red)">No</text><line x1="20" y1="196" x2="630" y2="196" stroke="var(--line)"/><text x="20" y="216" font-size="11" fill="var(--ink)">Extra risk</text><text x="245" y="216" text-anchor="middle" font-size="10" fill="var(--ink)">Contract and keys</text><text x="400" y="216" text-anchor="middle" font-size="10" fill="var(--ink)">Custodian + issuer failure</text><text x="555" y="216" text-anchor="middle" font-size="10" fill="var(--ink)">Leverage, liquidation, funding</text><line x1="20" y1="226" x2="630" y2="226" stroke="var(--line)"/><text x="20" y="246" font-size="11" fill="var(--ink)">Price tied to the share by</text><text x="245" y="246" text-anchor="middle" font-size="10" fill="var(--ink)">Being the same share</text><text x="400" y="246" text-anchor="middle" font-size="10" fill="var(--ink)">Mint / redeem arbitrage</text><text x="555" y="246" text-anchor="middle" font-size="10" fill="var(--ink)">Funding rates and oracles</text><text x="320" y="284" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">The screens can look identical; moving left to right, you drift further from being a real shareholder</text></svg><figcaption>The three kinds of on-chain stock differ in legal substance. A native tokenized share is the share itself; a wrapped token is a claim on an intermediary; synthetic exposure is only a price contract (the perpetual futures of Stage 7.1).</figcaption></figure>

**Wrapped tokens** took off first, in Europe in 2025. Around June 30, 2025, Robinhood reportedly launched stock tokens for EU users on Arbitrum, and Backed Finance's xStocks went live on Solana with Kraken and Bybit. (This course could not verify every detail, so treat them as reported.) The appeal is speed: no US exchange or depository has to cooperate. The cost is an extra layer of **intermediary risk**. Does the custodian really hold enough shares? If the token issuer fails, are the shares ring-fenced from its own assets? Is redemption open only to institutions?

**Synthetic exposure** is the most flexible and the furthest from ownership: no votes, no real dividends, just profit and loss settled against a counterparty, with leverage and liquidation layered on top (Stage 7.5). It is good for trading a price, not for owning a company.

**Natively tokenized shares** are the hardest and most orthodox route. The issuer, the central depository, the exchanges and the regulator all have to change their rules. That is exactly what the US has been doing in 2025–26.

### ③ The US framework: DTC's pilot, Nasdaq and NYSE, the SEC's innovation exemption

As of September 2026, the US framework has these pieces (dates from SEC documents or official press releases):

<table>
<tr><th>When</th><th>Who</th><th>What</th></tr>
<tr><td>July 2025</td><td>SEC</td><td>Chair Paul Atkins launches "Project Crypto"</td></tr>
<tr><td>September 2025</td><td>Nasdaq</td><td>Files a rule (SR-NASDAQ-2025-072) to trade tokenized versions of listed stocks and ETFs on the same order book</td></tr>
<tr><td>December 11, 2025</td><td>SEC staff to DTC</td><td>No-action letter for a three-year pilot tokenizing Russell 1000 stocks, major ETFs and Treasuries</td></tr>
<tr><td>January 19, 2026</td><td>NYSE / ICE</td><td>Announces a 24/7 tokenized-securities platform; the related rule (SR-NYSE-2026-17) takes effect April 17, covering Russell 1000 stocks and major ETFs</td></tr>
<tr><td>March 19, 2026</td><td>SEC</td><td>Approves Nasdaq's rule: tokens must be <b>fungible</b> with ordinary shares, and trading depends on the DTC pilot</td></tr>
<tr><td>July 15, 2026</td><td>DTC</td><td>Limited live trades begin in the pilot; a broader launch is targeted for October 2026</td></tr>
<tr><td>September 17, 2026</td><td>SEC</td><td>"Innovation exemption": a five-year conditional exemption letting "Tokenized Securities Venues" trade tokenized listed stocks, including via permissioned AMM pools, without registering as exchanges</td></tr>
</table>

Three words unlock the table:

- **Fungible.** Nasdaq's rule requires tokenized shares to be the same security, with the same ticker, as ordinary shares; only the record-keeping differs. That means **there will not be one price for "on-chain Apple" and another for "off-chain Apple"**, because arbitrageurs can convert freely between them.
- **Full shareholder rights.** The innovation exemption's conditions include **no synthetic tokens**, notice to the issuer before any third party tokenizes its stock, public and auditable smart contracts, trading halts that follow the underlying stock, and volume limits. The regulator's line is clear: **you may change the ledger, not the rights.**
- **Permissioned AMMs.** The automated market makers of Stage 13.3 enter US stock trading in regulated form for the first time, though only as permissioned pools open to approved participants.

Note also two things that did not happen. On September 15, 2026, the CLARITY Act (the crypto market-structure bill) failed a procedural cloture vote in the Senate, 49–50, so **it is not law**. And a report of a second Nasdaq approval for digital-asset securities on September 23 could not be verified for this course. **As of September 2026, then, US tokenized stocks rest on regulators' rule approvals, pilots and exemptions, not on a new statute.** That makes progress faster, and also easier to reverse when people and politics change.

### ④ The real problems of 24/7 trading: price discovery, liquidity, corporate actions

Suppose every legal question were settled. A 24/7 stock market would still face three technical and economic problems.

**Problem one: weekend price discovery.** A stock closes at $100 on Friday, and bad news breaks on Saturday. The token trades in a pool over the weekend, but **market makers cannot hedge in the traditional market** (it is closed), and nobody can convert tokens back into ordinary shares to arbitrage (that has to wait for the depository on Monday). So the weekend price moves only as far as a few risk-taking traders push it. In a constant-product pool with $50 million of depth on each side, pushing the price from $100 to $90 (−10%) takes selling about $2.7 million worth of tokens. If only $1 million of sell orders show up over the weekend, the price falls to about $96, and **the rest of the gap still appears all at once at Monday's open**. The demo for this lesson is that weekend-gap calculator.

**Problem two: liquidity spread thin.** Market makers have finite capital and risk limits. Spreading five days of trading across seven days of 24 hours means thinner depth in the average hour. Weekend spreads are wider and slippage larger, and the people who get hurt are usually retail traders who assume they can always trade at a fair price.

**Problem three: corporate actions and halts.** Dividends, splits, mergers and new share issues (Stage 5.5) have well-worn procedures in the traditional system. An on-chain version must encode all of them in contracts and keep them in step with depository records. Halts are subtler. When the underlying stock is halted on major news, the token must stop too, which is why the innovation exemption makes "halts that follow the underlying" a condition. **In a 24/7 market, the pause button has to be pressed by off-chain rules.**

None of this dooms tokenized stocks, but it shapes them. **They are more likely to arrive first among institutions, as optional extended hours plus instant settlement plus collateral mobility, than to turn the whole stock market into an all-night casino overnight.**

### ⑤ Will DAT preferreds move on-chain?

Now turn to the course's focus: digital asset treasury companies (Stage 15.1). The family of preferred stocks issued by Strategy (Stage 17.3 takes them apart one by one) is listed on Nasdaq and is, at heart, **income securities backed by bitcoin**. That creates an odd time-zone mismatch:

- Their asset, bitcoin, **trades 24/7**.
- They themselves **trade only during US market hours**.
- If bitcoin falls 15% over a weekend, preferred holders cannot react until Monday's open.

What if these preferreds could one day trade in tokenized form? **The case for:** price discovery would move in step with the collateral, so gaps would not build up over the weekend; the preferreds could serve as DeFi or exchange collateral, creating a form of bitcoin-backed on-chain credit; and global income investors would find them easier to reach. **The case against:** weekend liquidity is thin, so panics could produce outsized discounts that feed back into the company's ability to raise money (the reflexivity of Stage 18.3); cumulative dividends, liquidation preferences and redemption terms would all have to be encoded reliably in contracts and depository records; and as a regulatory matter, as of September 2026 the DTC pilot and the Nasdaq and NYSE rules cover **Russell 1000 stocks, major ETFs and Treasuries**, not preferreds like these.

The honest answer, then: **as of September 2026 no such product exists and there is no clear timetable**, but the pipes are being laid and the question is worth thinking through in advance. Stage 18.4, on index and structural risk, returns to how listing venues and trading rules shape demand for DAT securities. This lesson explains mechanisms and analytical frameworks only; it is not investment advice.
`,

  demo: "tokenized-stocks",

  analogy: `
Think of stocks as goods in a **department store that only opens during the day**. The store shuts at night and at weekends, but customers' news never stops. If word gets out on Saturday that a brand has a quality problem, you still have to wait for Monday's opening to return it or snap it up, so on Monday morning there is always a queue at the door (the opening gap).

Tokenized stocks are like opening a **24-hour convenience store** outside. The key question is what the convenience store sells.

- If it is **a branch run by the department store itself**, the goods on its shelves are identical to those inside, and you can swap them back at any time. That is a native tokenized share.
- If it is **a reseller run by someone else**, who says a warehouse full of the store's goods is waiting for you, then you are buying the reseller's voucher. That is a wrapped token, and you must trust that the reseller really stocked up and will not vanish.
- If it sells **bets on the department store's prices**, where you wager whether something will be dearer or cheaper on Monday while the shop itself holds no goods at all, that is synthetic exposure.

One more thing: a convenience store at midnight has few customers and thin shelves. When bad news lands at 2 a.m. on Saturday, only a handful of people are trading, so the price may move only halfway. When the department store opens on Monday and everyone shows up, the other half lands all at once. **The convenience store lets you trade at night; it cannot make the night as busy as the day.**
`,

  misconceptions: [
    "**\"On-chain Apple stock is Apple stock.\"** Only the natively tokenized kind, fungible with ordinary shares, truly is. A wrapped token is a claim on the token issuer and usually carries no vote; synthetic exposure is a price contract with no shares behind it. The screens look the same; the legal rights do not.",
    "**\"24/7 trading will massively increase stock-market liquidity.\"** Liquidity does not appear from nowhere; it is more likely to be spread across more hours. At weekends market makers cannot hedge in the traditional market, so spreads widen, slippage grows and price discovery is less complete.",
    "**\"The US has passed a law allowing tokenized stocks.\"** As of September 2026 the basis is SEC rule approvals, a no-action letter for DTC's pilot and the innovation exemption of September 17, 2026. The CLARITY Act failed a Senate cloture vote on September 15 and is not law.",
    "**\"The tokenized stock market is $4.5 billion, and everyone agrees.\"** Trackers differ by about three times: rwa.xyz about $4.45 billion (August 26, 2026), The Block about $2.8 billion (mid-August), Bernstein about $1.6 billion (June). Any of these is a rounding error against more than $60 trillion of US stocks.",
    "**\"Strategy's preferreds will soon trade on-chain.\"** As of September 2026 the DTC pilot and exchange rules cover Russell 1000 stocks, major ETFs and Treasuries; there is no tokenized product or timetable for preferreds like these. It is a question worth thinking about, not a done deal.",
  ],

  quiz: [
    {
      q: "Regular US stock trading runs 6.5 hours a day on about 252 trading days a year. Roughly what share of all the hours in a year is that?",
      options: ["About 50%", "About 35%", "About 10%", "About 19%"],
      answer: 3,
      explain: "6.5 × 252 ≈ **1,640 hours** out of 8,760, or about **19%**. During the other 81% news keeps coming but prices wait for the next open, which is where the demand for 24/7 trading comes from.",
    },
    {
      q: "An investor buys an on-chain \"stock token\" from a company that holds real shares and mints tokens one for one. What is the investor's most direct extra risk?",
      options: ["Higher interest-rate risk", "If the token issuer or its custodian fails, the investor is only a creditor of that company", "Voting rights double", "None, because the token is backed one for one"],
      answer: 1,
      explain: "This is a **wrapped token**: the claim points at the token issuer (or its SPV), which holds the shares. Whether custody is complete, whether assets are ring-fenced in bankruptcy and who may redeem all become new risks. One-for-one backing is a promise, not direct legal ownership.",
    },
    {
      q: "The Nasdaq rule the SEC approved in March 2026 requires tokenized shares to be fungible with ordinary shares. What is the most important consequence?",
      options: ["Tokenized shares will trade above ordinary shares", "Tokenized shares no longer need DTC", "On-chain and off-chain are the same security, so arbitrage keeps them at one price", "Tokenized shares need not follow trading halts"],
      answer: 2,
      explain: "**Fungible means the same security with a different record.** As long as the two convert freely, arbitrage removes any gap, so there is no separate price for on-chain Apple. Trading under the rule also depends on the DTC pilot.",
    },
    {
      q: "A stock closes Friday at $100. Major bad news over the weekend puts fair value near $90, but only a few sell orders reach the weekend pool and the token falls to $96. What most likely happens at Monday's open?",
      options: ["The remaining gap appears at the open and the price moves toward about $90", "The token returns to $100", "Monday's share price is locked at the weekend token price of $96", "The exchange cancels all weekend trades"],
      answer: 0,
      explain: "Weekend liquidity is thin and market makers cannot hedge, so price discovery is incomplete. **The remaining gap of about $6 shows up at once on Monday.** 24/7 trading spreads the gap out; it cannot create weekend depth from nothing.",
    },
    {
      q: "Which condition of the SEC's September 2026 innovation exemption most directly expresses \"you may change the ledger, not the rights\"?",
      options: ["Volume limits", "Permission to use permissioned AMM pools", "A five-year term", "Full shareholder rights and no synthetic tokens"],
      answer: 3,
      explain: "**Requiring full shareholder rights and banning synthetic tokens** means tokenization may change only record-keeping and trading, not turn shareholders into creditors of an intermediary or counterparties to a price contract. The other conditions concern trading methods and the scope of the trial.",
    },
  ],

  further: [
    { label: "SEC press release 2026-90: innovation exemption to facilitate trading of tokenized NMS stock", url: "https://www.sec.gov/newsroom/press-releases/2026-90-sec-issues-innovation-exemption-facilitate-trading-tokenized-nms-stock-request-comment" },
    { label: "SEC order approving Nasdaq's tokenized-securities rule (March 2026, PDF)", url: "https://www.sec.gov/files/rules/sro/nasdaq/2026/34-105047.pdf" },
    { label: "ICE: The New York Stock Exchange develops a tokenized securities platform (January 2026)", url: "https://ir.theice.com/press/news-details/2026/The-New-York-Stock-Exchange-Develops-Tokenized-Securities-Platform/default.aspx" },
    { label: "The Block: tokenized equities triple their market share (August 2026)", url: "https://www.theblock.co/news/defi/2026-08-17-tokenized-equities-triple-market-share-ondo-binance-xstocks-dominate-411996" },
    { label: "RWA Path (sister course: legal structures and market design for tokenized securities)", url: "https://evidex-cloud.github.io/droplet-labs-rwa-path/" },
  ],
};
