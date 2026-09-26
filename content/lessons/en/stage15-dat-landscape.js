export default {
  id: "dat-landscape",
  stage: 15,
  order: 4,
  title: "The DAT Landscape: Strategy, Strive, Metaplanet, Twenty One & the Altcoin Treasuries",
  difficulty: "dat",
  prereqs: ["dat-what", "strategy-story", "why-dats-exist"],

  oneLiner:
    "As of late September 2026, about 196 listed companies together held about 1.27 million bitcoin — and **Strategy alone held roughly two-thirds of it.** The rest fall into a few camps: **Strive**, with its “preferred-only, zero debt” model; Japan's **Metaplanet**; Tether-controlled **Twenty One**; **Nakamoto**, down about 99% from its peak; and the ether and Solana “altcoin treasuries.” This lesson draws the whole map and uses the 2025 boom and the 2026 shakeout to make one point: **the same business model, under different capital structures, premiums and management, can end in wildly different places.**",

  intuition: `
Stage 15.1 defined a DAT, Stage 15.2 told the story of the biggest one, and Stage 15.3 explained why they exist. This lesson pulls the camera back: **how many of these companies are there, and do they all look alike?**

Start with one number. By bitcointreasuries.net's count in late September 2026 (the page carries no update stamp and includes a few stale entries), about **196 listed companies** held about **1,272,886 BTC** in total — roughly $107 billion at a bitcoin price of about $84,000. **Strategy alone held 846,000 BTC, about 66%.** Number two held less than 6% of Strategy's stack. This is not so much an industry as **one giant and a crowd of followers.**

The followers differ a lot, and four dimensions sort them out:

- **Asset**: most hold bitcoin; some hold ether (ETH) or Solana (SOL), which can be “staked” to earn a yield — something bitcoin cannot do.
- **Capital structure**: Strategy uses converts, several preferreds and common stock; Strive uses a single floating-rate preferred and zero debt; Metaplanet uses a bitcoin-secured credit line plus preferreds; Nakamoto borrowed stablecoins against bitcoin collateral. **Whether there is a margin call is the most important dividing line** (Stage 7.5).
- **Premium**: in September 2026, per DWF Ventures, only 4 of the 20 largest DATs traded above 1x mNAV — Strive among them; Metaplanet was at about 0.58x and Twenty One about 0.68x (bitcointreasuries.net basic market-cap definition).
- **Governance and control**: founder-led, controlled by a major shareholder (Tether at Twenty One), consolidating through M&A (Strive absorbing Semler).

The lesson rests mainly on **Idea ② (balance sheets and claims)** and **Idea ④ (risk and leverage)**: the same asset placed on different balance sheets carries completely different risk. It is also a story lesson. **2025 was the boom year** — hundreds of companies announced treasury pivots, and SPACs and reverse mergers piled up. **2026 was the shakeout year** — bitcoin fell from about $126,000 to about $58,000, and discounts, coin sales, buybacks, mergers and delistings all arrived together.

Every number is dated and sourced, and they all change weekly; check company disclosures and bitcointreasuries.net for live data. **This lesson covers mechanics and analytical frameworks only; it is not investment advice**, and naming a company is neither an endorsement nor a warning.

**This lesson has five parts:**

- **① One giant: Strategy and its “two-thirds”**
- **② The followers: Strive, Metaplanet, Twenty One and Nakamoto**
- **③ Holding bitcoin without being a DAT: miners, exchanges and incidental holders**
- **④ Altcoin treasuries: ether, Solana and staking yield**
- **⑤ The 2025 boom and the 2026 shakeout**
`,

  mechanics: `
### ① One giant: Strategy and its “two-thirds”

First, the league table (bitcointreasuries.net, fetched late September 2026; each company's own disclosure date differs):

<table class="pm">
<tr><th>Rank</th><th>Company</th><th>BTC</th><th>Note</th></tr>
<tr><td>1</td><td><b>Strategy (MSTR)</b></td><td><b>846,000</b></td><td>DAT; company 8-K, 2026-09-20</td></tr>
<tr><td>2</td><td>Twenty One (XXI)</td><td>43,514</td><td>DAT; controlled by Tether/Bitfinex</td></tr>
<tr><td>3</td><td>Metaplanet (3350.T)</td><td>43,000</td><td>DAT; Japan; unchanged since 2026-07-02</td></tr>
<tr><td>4</td><td>MARA</td><td>35,577</td><td>Bitcoin miner</td></tr>
<tr><td>6</td><td>Strive (ASST)</td><td>26,355</td><td>DAT; company dashboard, 2026-09-18</td></tr>
<tr><td>7–12</td><td>Bullish, SpaceX, Coinbase, CleanSpark, Trump Media, Tesla</td><td>about 11k–22k each</td><td>mostly not DATs</td></tr>
</table>

(Number 5, BSTR, had its merger terminated in August 2026; its entry is stale.)

<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">About 1.273M BTC held by listed companies: who holds what</text><rect x="40" y="50" width="370" height="46" fill="var(--btc)"/><text x="225" y="78" text-anchor="middle" font-size="13" font-weight="700" fill="var(--surface-2)">Strategy 846,000 (about 66%)</text><rect x="410" y="50" width="19" height="46" fill="var(--blue)"/><rect x="429" y="50" width="19" height="46" fill="var(--blue)" opacity=".75"/><rect x="448" y="50" width="16" height="46" fill="var(--green)"/><rect x="464" y="50" width="12" height="46" fill="var(--orange)"/><rect x="476" y="50" width="124" height="46" fill="var(--surface-2)" stroke="var(--line)"/><text x="538" y="78" text-anchor="middle" font-size="11" fill="var(--muted)">~190 others</text><line x1="419" y1="100" x2="419" y2="214" stroke="var(--blue)"/><text x="425" y="218" font-size="10" fill="var(--blue)">XXI 43,514</text><line x1="438" y1="100" x2="438" y2="186" stroke="var(--blue)"/><text x="444" y="190" font-size="10" fill="var(--blue)">Metaplanet 43,000</text><line x1="456" y1="100" x2="456" y2="158" stroke="var(--green)"/><text x="462" y="162" font-size="10" fill="var(--green)">MARA 35,577 (miner)</text><line x1="470" y1="100" x2="470" y2="130" stroke="var(--orange)"/><text x="476" y="134" font-size="10" fill="var(--orange-ink)">Strive 26,355</text><text x="40" y="250" font-size="11" fill="var(--muted)">Widths proportional to holdings; source bitcointreasuries.net (late Sep 2026, no timestamp)</text></svg><figcaption>The leader holds nearly 20 times as much as number two. When people talk about “the DAT industry,” in numbers they are talking almost entirely about Strategy.</figcaption></figure>

That concentration has two consequences. First, **you cannot study DATs without studying Strategy**: its weekly 8-Ks, its metric definitions (Stage 16) and its preferreds (Stage 17) effectively define the industry's vocabulary, and later entrants mostly adopt or adapt its metrics (Strive's BTC Yield uses Strategy's definition). Second, **systemic risk is concentrated**: if Strategy were dropped from an index (MSCI's simulation lists it) or forced into large-scale selling, the effects would reach well beyond one company. A concentration index makes this concrete: counting only the largest holders in the table, the Herfindahl index (the sum of squared shares) is above 0.4 — in antitrust work anything above 0.25 counts as “highly concentrated.”

### ② The followers: Strive, Metaplanet, Twenty One and Nakamoto

**Strive (ASST) — “preferred only, zero debt.”** An asset manager founded in 2022 by Vivek Ramaswamy and Anson Frericks, it went public in 2025 through a reverse merger with Asset Entities (a $750 million private placement at $1.35 a share announced in May; the merger closed on September 12 and kept the ASST ticker). On January 16, 2026 it closed an all-stock acquisition of Semler Scientific, picking up 5,048 BTC and retiring all of Semler's debt (its convertibles were swapped into SATA or repurchased). On February 6 it did a 1-for-20 reverse split. As of September 18, 2026: **26,355 BTC** at an average cost of $90,610; a single preferred, **SATA** (floating rate, 13.00%, about $1.118 billion notional, **paying dividends daily since June 15, 2026**); zero debt and no pledged bitcoin; a company-defined “Amplification Ratio” of 50.4% (a different formula from Strategy's, as Stage 15.1 showed); and a year-to-date BTC Yield of +54.5%. Strive does not use the word “mNAV”; its “Common Equity Accretion Premium” was 33% (roughly a basic mNAV of 1.33x), while The Block's measure was 1.21x. Stage 17.5 covers Strive and SATA in detail.

**Metaplanet (Tokyo: 3350) — Japan's Strategy.** It held **43,000 BTC** as of July 2, 2026 (still the figure on August 18), with targets of 100,000 by the end of 2026 and 210,000 by the end of 2027. Its capital structure is more complicated: a **$500 million bitcoin-secured** credit facility (about $280 million drawn as of March 2026); a perpetual preferred announced in November 2025, **MERCURY** (4.9% fixed, convertible); and **MARS**, a floating-dividend preferred not yet issued — with the listing of both delayed by Japanese exchange rules. It also earns income by selling bitcoin options ($29.3 million in the first half of 2026). On September 26, 2026 bitcointreasuries.net showed its mNAV at **0.58x basic, 0.73x diluted and 0.79x on enterprise value** — one more case of the definition setting the number.

**Twenty One (NYSE: XXI) — a DAT with a controlling shareholder.** It listed on the NYSE on December 9, 2025 through a merger with the SPAC Cantor Equity Partners, holding more than 43,500 BTC at listing; it now holds **43,514 BTC**, second among public companies. Tether and Bitfinex control it, with SoftBank a significant minority holder. Jack Mallers stepped down as CEO on July 20, 2026, Raphael Zagury took over, and a planned three-way merger with Strike and Elektron was abandoned. Basic mNAV was about **0.68x** (September 26, 2026).

**Nakamoto (NAKA) — the cautionary tale.** Its merger with KindlyMD closed on August 14, 2025, alongside a private placement of about $540 million. The stock then fell about **99%** from its May 2025 peak, and a 1-for-40 reverse split on May 22, 2026 kept it listed. It had borrowed USDT from Kraken against bitcoin collateral: it sold 284 BTC for working capital in March 2026, then about 600 BTC in June to repay $45 million of the loan, refinancing the rest at 7.75% **secured by at least 2,000 BTC**, leaving about 4,467 BTC (per press reports). **This is what a structure with collateral and margin pressure looks like in a bear market** — set it against the no-pledge designs of Strategy and Strive (Stage 6.5).

### ③ Holding bitcoin without being a DAT: miners, exchanges and incidental holders

Plenty of companies on the league table **hold bitcoin without being in the treasury business.** Telling them apart is the first step in reading DAT data correctly:

- **Miners** (MARA 35,577, CleanSpark 13,703): bitcoin is their product. How much they hold depends on how much they keep versus sell, and they are valued on hash rate, power costs and efficiency — not mNAV.
- **Exchanges and financial firms** (Coinbase 17,311, Bullish 22,000): bitcoin sits on the balance sheet, but the company's value comes mainly from trading and custody.
- **Operating companies that happen to hold bitcoin**: Tesla held **11,509 BTC** at June 30, 2026 (cost $386 million, fair value $674 million, no sales). GameStop bought 4,710 BTC in 2025 and pledged 4,709 of them to Coinbase for a covered-call program. Trump Media's holdings conflict across sources (its 10-Q cites about 14,139 BTC as of July 31, 2026, including pledged coins), and some reports say it “abandoned” the treasury strategy — **these accounts contradict each other, and we draw no conclusion.**

Why bother separating them? Because **mNAV, BTC Yield and BTC Rating only mean something for DATs.** Divide Tesla's market cap by its bitcoin and you get an “mNAV” in the hundreds — a meaningless number.

### ④ Altcoin treasuries: ether, Solana and staking yield

The same model has been copied onto other coins:

- **Ether**: **Bitmine (BMNR)** held **5,983,940 ETH** as of September 20–21, 2026 — about 4.9% of ether's supply against a 5% target — with roughly 5.07 million staked, plus 212 BTC and $714 million in cash. **SharpLink (SBET)** held 888,938 ETH as of August 3, 2026 and has bought back about $41.7 million of stock since August 2025.
- **Solana**: **Forward Industries (Nasdaq: FWDI)** held about **8.16 million SOL** as of September 21, 2026; DeFi Development (DFDV) about 2.49 million SOL, funded partly through a $300 million preferred ATM; Upexi (UPXI) about 2.34 million SOL as of June 30, 2026.

The big difference from bitcoin treasuries is **staking yield**: ether and Solana can be staked to help validate the network and earn newly issued tokens, so these companies' assets **produce income**, while bitcoin does not. Supporters say that makes them closer to “treasuries with cash flow,” able to cover part of their running costs or even dividends. Critics raise three points: the yield is paid in tokens and moves with the token price; staking brings lock-ups and technical risk (Stage 13.6); and these assets are usually more volatile and more concentrated than bitcoin. They sold coins in the downturn too: ETHZilla sold about $40 million of ETH in October 2025 to fund buybacks and 24,291 ETH in December to redeem convertible notes. Stage 18.5 puts them on the same scorecard as the bitcoin treasuries.

### ⑤ The 2025 boom and the 2026 shakeout

**The boom (2025)**: bitcoin hit an all-time high of about $126,200 on October 6, 2025. Reverse mergers and SPACs piled up that year: Strive with Asset Entities (closed in September), KindlyMD with Nakamoto (closed in August), Twenty One with Cantor Equity Partners (listed in December), with private placements routinely in the hundreds of millions. Many companies saw their stock jump the moment they announced a “bitcoin treasury pivot” — **the premium itself became the fuel for raising money** (machine two of Stage 15.3; the reflexivity of Stage 10.4).

**The shakeout (late 2025–2026)**: bitcoin plunged on October 10, 2025 (closing near $112,800), ended 2025 near $87,600, dipped to about $60,000 in February 2026, closed at about $58,600 on June 30 and touched about $57,800 intraday on July 1 — roughly **−54%** from the peak — before recovering to about $84,100 on September 25. Over that year:

<table class="pm">
<tr><th>Pattern</th><th>Examples (from our fact sheet)</th></tr>
<tr><td><b>Premiums vanish</b></td><td>16 of the 20 largest DATs below 1x mNAV (DWF Ventures, September 2026); Metaplanet 0.58x, XXI 0.68x; ProCap at about a 40% discount</td></tr>
<tr><td><b>Coin sales</b> (for dividends, buybacks or debt)</td><td>Strategy about 6,948 BTC over the year; Sequans sold 970 BTC in November 2025 to halve its debt and fully exited on September 24, 2026; Nakamoto; ProCap sold about 50 BTC to fund a buyback; UK-listed Satsuma sold all 669 BTC, is returning £30.7 million to shareholders and is delisting from the LSE</td></tr>
<tr><td><b>Buybacks</b></td><td>Strategy's STRC repurchases; SharpLink, Upexi; authorizations at Nakamoto and Strive</td></tr>
<tr><td><b>Consolidation</b></td><td>Strive–Semler (closed 2026-01-16); Nakamoto–BTC Inc/UTXO; Metaplanet–Super League (Superplanet); XXI–Strike–Elektron (abandoned); BSTR's SPAC (terminated)</td></tr>
<tr><td><b>Bankruptcies</b></td><td>No notable DAT bankruptcy found for 2026 (the search was not exhaustive); delistings were voluntary (Satsuma) or avoided by reverse split (Nakamoto)</td></tr>
</table>

The table carries the most important lesson of this tier: **what decides a DAT's fate in a bear market is not how much bitcoin it holds but its capital structure.** The company with a collateralized loan (Nakamoto) had to sell coins to repay it; the company with maturing debt (Sequans) sold coins to cut debt until it had none left; the companies with no margin calls and cash reserves (Strategy, Strive) could buy back their own securities and even resume buying near the lows. **Once mNAV falls below 1, the sensible move flips from “issue and buy bitcoin” to “sell bitcoin and buy back stock”** — ProCap buying back shares at about a 40% discount follows exactly that logic (Stage 18.3 works out the math).

One last statistical trap: **survivorship bias.** A league table shows only the companies still standing; the ones whose stock collapsed after a treasury announcement and quietly exited never make the top 20. When you judge this business model, look at **the half that failed** as well. **Mechanics and frameworks only; not investment advice.**
`,

  demo: "dat-landscape",

  analogy: `
Picture the DAT landscape as **a gold-rush town camped around one mine — bitcoin.**

The biggest outfit in town (Strategy) holds two-thirds of the seam, and the roads it built and the weights and measures it set (bitcoin per share, BTC Rating) are what everyone in town uses.

The other camps each play differently: one takes money only from “fixed-dividend partners” and borrows nothing (Strive); one digs in another country and sells “gold-price insurance” on the side for pocket money (Metaplanet); one has a rich patron standing behind it (Twenty One); one borrowed at a steep rate to buy its claim and had to sell gold to repay the moment the price dropped (Nakamoto). Next door are camps digging for silver and copper (the ether and Solana treasuries) — their ore “pays interest” on its own (staking yield), but its price swings even harder.

Then there are townsfolk with gold nuggets in their pockets whose real trade is the smithy (miners), the pawnshop (exchanges) or the carriage works (Tesla). Don't count them among the prospectors.

In the rush, anyone who hung out a sign saying “we're digging for gold too” had investors lining up. When the price fell, the town split three ways at once: those carrying debt were forced to sell their gold; those without debt bought back their own shares; the weakest packed up their tents and left. **To judge whether a camp survives the winter, don't count its gold — look at what kind of debt it is carrying.**
`,

  misconceptions: [
    "**“DATs are a diversified industry of hundreds of companies.”** — In numbers it is one giant plus followers: about 196 listed companies with about 1.27 million BTC, of which Strategy alone holds about 66% and number two less than 6% of Strategy's total. Industry data is largely Strategy's data.",
    "**“Every company high on the league table is a DAT.”** — A miner's bitcoin is its product, an exchange's bitcoin is part of its business, and Tesla simply happens to hold some. mNAV and BTC Yield only mean something for companies whose main business is holding the asset.",
    "**“All DATs carry about the same risk because they all hold bitcoin.”** — Capital structure decides bear-market outcomes: Nakamoto, with a bitcoin-secured loan, had to sell coins to repay it, while zero-debt, preferred-only Strive and reserve-rich Strategy could buy back securities and wait.",
    "**“Ether and Solana treasuries are safer because they earn staking yield.”** — The yield is paid in tokens and moves with the token price, and staking brings lock-ups and technical risk; these assets are usually more volatile. The yield can cover some costs, but the asset price still decides everything.",
    "**“No notable DAT went bankrupt in 2026, so the model is robust.”** — Our fact sheet found no notable bankruptcy, but the search was not exhaustive — and companies did exit entirely (Sequans), delist voluntarily (Satsuma) or survive on a reverse split (Nakamoto). Looking only at survivors overstates the model's resilience.",
  ],

  quiz: [
    {
      q: "By bitcointreasuries.net's count in late September 2026, roughly what share of all bitcoin held by listed companies belonged to Strategy?",
      options: [
        "About 10%",
        "About 25%",
        "About 66%",
        "About 95%",
      ],
      answer: 2,
      explain: "846,000 ÷ 1,272,886 ≈ **66%**. Number two, XXI, with 43,514 BTC, holds less than 6% of Strategy's total.",
    },
    {
      q: "On the same day Metaplanet showed mNAVs of 0.58x, 0.73x and 0.79x. What is the most likely reason?",
      options: [
        "The share traded at different prices on three exchanges",
        "They are the basic, diluted and enterprise-value definitions",
        "The yen–dollar exchange rate",
        "A data error",
      ],
      answer: 1,
      explain: "bitcointreasuries.net reports **basic 0.58x, diluted 0.73x and enterprise-value 0.79x** side by side. EV adds debt and preferred to the numerator, so it is higher. Always name the definition (Stage 15.1).",
    },
    {
      q: "In the 2026 bear market, which capital-structure feature most directly forced a company to sell bitcoin to repay debt?",
      options: [
        "Having issued perpetual preferred stock",
        "Holding a large USD reserve",
        "Holding only bitcoin and no other assets",
        "Having borrowed against bitcoin collateral",
      ],
      answer: 3,
      explain: "**Collateralized loans bring margin and repayment pressure**: Nakamoto sold coins to repay a bitcoin-secured USDT loan and, on refinancing, still had to pledge at least 2,000 BTC. Perpetual preferreds have no maturity and no pledge, and a USD reserve provides a buffer.",
    },
    {
      q: "What is the main structural difference between ether/Solana treasuries and bitcoin treasuries?",
      options: [
        "Their assets can be staked to earn a token-denominated yield; bitcoin cannot",
        "They cannot issue preferred stock",
        "None of them ever trades at a premium",
        "Their asset prices are unrelated to the crypto market",
      ],
      answer: 0,
      explain: "**Staking yield** is the key difference (Bitmine, for example, had about 5.07 million ETH staked). But the yield is paid in tokens, moves with the price and brings lock-ups and technical risk.",
    },
    {
      q: "When a DAT trades clearly below 1x mNAV, which action is most likely to be **accretive** to bitcoin per share?",
      options: [
        "Keep selling common stock at market to buy bitcoin",
        "Sell a small amount of bitcoin and buy back its own stock at a discount",
        "Issue more convertibles and pay cash dividends",
        "Stop all disclosure",
      ],
      answer: 1,
      explain: "Below 1x the stock is cheaper than the bitcoin behind it: $1 of bitcoin sold retires shares backed by more than $1 of bitcoin, so **bitcoin per share rises.** ProCap's buyback at about a 40% discount follows this logic; issuing to buy bitcoin would dilute (Stage 18.3).",
    },
  ],

  further: [
    { label: "BitcoinTreasuries.net: public-company bitcoin league table and mNAV under several definitions (check live data)", url: "https://bitcointreasuries.net/" },
    { label: "BitcoinTreasuries.net: Metaplanet company page (three mNAV definitions)", url: "https://bitcointreasuries.net/public-companies/metaplanet" },
    { label: "Strive treasury dashboard: holdings, SATA, Amplification Ratio and accretion premium", url: "https://strive.com/treasury" },
    { label: "Strategy 8-K (2026-09-21): 846,000 BTC held as of September 20 (SEC)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526396093/mstr-20260914.htm" },
  ],
};
