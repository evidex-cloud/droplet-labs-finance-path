export default {
  id: "bitcoin-etfs",
  stage: 12,
  order: 5,
  title: "Spot ETFs, Custody & the Institutional Era: Wall Street Embraces Bitcoin",
  difficulty: "newfin",
  prereqs: ["indexes-etfs", "bitcoin-how"],

  oneLiner:
    "On January 11, 2024 the first US spot bitcoin ETFs began trading — after a full decade of rejections by regulators. From then on, anyone with a brokerage account, and any pension or fund restricted to securities, could buy bitcoin as easily as a stock. By September 25, 2026, US spot bitcoin ETFs had taken in about $57.5 billion of cumulative net inflows, and BlackRock's IBIT alone held about $67.1 billion in net assets. This lesson opens up the ETF plumbing: **how creation and redemption keep the price pinned to bitcoin, what you actually own along the custody chain, and where the money comes from** — plus what the US Strategic Bitcoin Reserve does and doesn't mean — and it previews the fundamental differences between ETFs, self-custody and treasury companies.",

  intuition: `
Recall the ETF from Stage 5.6: a fund listed on an exchange whose shares trade all day like a stock, with a basket of assets inside. An S&P 500 ETF holds the stocks of 500 companies. A **spot bitcoin ETF** holds actual bitcoin, kept in the cold wallets of a professional custodian.

That sounds simple, so why did it take ten years? Because regulators were worried about exactly the plumbing (**Idea ③ Liquidity & trust**). Spot bitcoin trading is scattered across hundreds of exchanges worldwide, some poorly regulated, where prices might be manipulated. Holding bitcoin means safeguarding private keys, and Stage 12.1 showed that losing the keys means losing everything. And the Mt. Gox and FTX disasters of Stage 10.5 were fresh in everyone's mind. The point of an ETF is to **plug bitcoin into traditional finance's most mature plumbing**: a regulated issuer, a regulated custodian, a published daily net asset value, market makers and authorized participants — and, on the distribution side, brokerage accounts, retirement accounts and financial advisers' model portfolios.

A number for scale: on September 25, 2026 BlackRock's IBIT had net assets of about $67.1 billion, and its quarterly report for June 30, 2026 showed about 734,000 bitcoin. All US spot bitcoin ETFs together reportedly held about $100 billion, roughly 6.3% of all bitcoin. **In little more than two years, a brand-new product category became one of bitcoin's largest groups of holders.**

This lesson also has to be clear about what an ETF *can't* do. It gives you bitcoin's price exposure but not the private keys. It swaps the risk of “losing your own keys” for the risks of the custodian, the issuer and the securities system. And it trades at net asset value, with no premium and no leverage. That is exactly the boundary with the treasury companies of Stage 15.1: **an ETF is a faithful, transparent box; a treasury company is a balance sheet that can add leverage, issue preferred stock, and trade far away from the value of the coins it holds.**

**We'll take this lesson in five parts:**

- **① A long decade: from repeated rejections to approval in January 2024**
- **② Creation and redemption: how the ETF price stays pinned to bitcoin**
- **③ The custody chain: what you actually own when you buy an ETF**
- **④ Flows and scale: institutional buying — and governments join in**
- **⑤ ETF, self-custody or treasury company: three ways to hold**
`,

  mechanics: `
### ① A long decade: from repeated rejections to approval in January 2024

The Winklevoss twins filed the first bitcoin ETF application in 2013. For almost ten years after that, the Securities and Exchange Commission (SEC) turned down one spot application after another, for broadly the same reason: the spot market could be manipulated and there was no surveillance-sharing agreement with a “regulated market of significant size.”

In the meantime, the market made do with two substitutes, both badly flawed:

- **The Grayscale Bitcoin Trust (GBTC):** launched in 2013 and later quoted over the counter. It was a **closed-end** trust: its shares traded, but **could not be redeemed for bitcoin**. So its price could drift far from the value of its coins for long periods — often at a sizable premium in 2017–2020, and at a discount approaching 50% in the 2022 bear market. It also charged about 2% a year.
- **Bitcoin futures ETFs:** approved in October 2021, holding CME bitcoin futures rather than spot bitcoin. Futures must be rolled continually, and in a contango market that creates a persistent roll cost (Stage 7.1).

The turning point came in August 2023, when the US Court of Appeals for the D.C. Circuit ruled in *Grayscale v. SEC* that it was “arbitrary and capricious” for the SEC to block Grayscale's conversion to a spot ETF after approving futures ETFs. **On January 10, 2024 the SEC approved the first spot bitcoin ETFs, and trading began on January 11.** GBTC converted into an ETF the same day. Spot ether ETFs followed on July 23, 2024.

### ② Creation and redemption: how the ETF price stays pinned to bitcoin

ETF shares are priced freely by buyers and sellers on the exchange. What stops them from drifting the way GBTC did? An arbitrage valve: **authorized participants** (APs, usually large market makers or broker-dealers) can **create** new shares from the fund, or **redeem** existing ones, at net asset value.

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">A spot bitcoin ETF: two markets and one arbitrage valve</text><rect x="20" y="50" width="130" height="60" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="85" y="76" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Investors</text><text x="85" y="94" text-anchor="middle" font-size="10" fill="var(--muted)">buy/sell in a brokerage</text><rect x="190" y="50" width="130" height="60" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="255" y="76" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Exchange</text><text x="255" y="94" text-anchor="middle" font-size="10" fill="var(--muted)">secondary-market price</text><rect x="360" y="50" width="120" height="60" rx="8" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="420" y="76" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Authorized participant</text><text x="420" y="94" text-anchor="middle" font-size="10" fill="var(--muted)">the arbitrageur</text><rect x="510" y="50" width="110" height="60" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="565" y="76" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">ETF trust</text><text x="565" y="94" text-anchor="middle" font-size="10" fill="var(--muted)">creates/redeems at NAV</text><rect x="510" y="170" width="110" height="56" rx="8" fill="var(--btc)"/><text x="565" y="194" text-anchor="middle" font-size="12" font-weight="700" fill="var(--surface)">Custodian</text><text x="565" y="212" text-anchor="middle" font-size="10" fill="var(--surface)">bitcoin in cold storage</text><line x1="150" y1="80" x2="190" y2="80" stroke="var(--blue)" stroke-width="2"/><line x1="320" y1="80" x2="360" y2="80" stroke="var(--blue)" stroke-width="2"/><line x1="480" y1="72" x2="510" y2="72" stroke="var(--green)" stroke-width="2"/><line x1="480" y1="90" x2="510" y2="90" stroke="var(--red)" stroke-width="2"/><line x1="565" y1="110" x2="565" y2="170" stroke="var(--btc)" stroke-width="2"/><rect x="20" y="140" width="460" height="60" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="30" y="160" font-size="11" font-weight="700" fill="var(--green)">At a premium (share price > NAV): create</text><text x="30" y="178" font-size="10" fill="var(--ink)">AP delivers cash or bitcoin to the trust → receives new shares → sells them on the exchange</text><text x="30" y="193" font-size="10" fill="var(--ink)">→ more shares outstanding push the price back to NAV; the trust buys more bitcoin</text><rect x="20" y="212" width="460" height="60" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="30" y="232" font-size="11" font-weight="700" fill="var(--red)">At a discount (share price < NAV): redeem</text><text x="30" y="250" font-size="10" fill="var(--ink)">AP buys cheap shares on the exchange → hands them to the trust → gets cash or bitcoin</text><text x="30" y="265" font-size="10" fill="var(--ink)">→ shares are cancelled, the price rises back to NAV; the trust sells bitcoin</text><text x="565" y="250" text-anchor="middle" font-size="10" fill="var(--muted)">“Net inflow”</text><text x="565" y="264" text-anchor="middle" font-size="10" fill="var(--muted)">= creations − redemptions</text></svg><figcaption>This two-way valve is what keeps an ETF near its NAV; closed-end GBTC had no redemption side, which is why its discount could persist.</figcaption></figure>

A toy example of the arbitrage. Suppose each ETF share represents 0.0005 BTC and bitcoin is at $84,000, so NAV is $42.00 a share. If shares trade on the exchange at $42.30 (a premium of about 0.7%), an AP creates a basket at NAV — say 40,000 shares, representing 20 BTC or about $1.68 million — and sells them on the exchange at $42.30 for about $1.692 million, a gross profit of about $12,000 that still pays after the cost of buying coins and trading. **As long as the gap exceeds costs, someone will close it**, which is why the premium or discount on large spot ETFs is usually just a few tenths of a percent.

Two details. US spot bitcoin ETFs launched with **cash creation and redemption** only (the AP hands over cash and the trust buys the coins itself); regulators later, in 2025, allowed **in-kind** creation and redemption (the AP delivers bitcoin directly), which cut costs and friction. And the daily “ETF net inflow/outflow” numbers in the news are simply that day's creations minus redemptions: on inflow days the trust **buys** bitcoin in the market, and on outflow days it **sells**. That is the channel through which ETFs move the spot price.

### ③ The custody chain: what you actually own when you buy an ETF

Take Stage 8.2's question — who actually holds your shares? — and follow the ETF chain from you all the way to the bitcoin:

- **You** hold ETF shares in a brokerage account; the broker holds them through the central securities depository.
- **The ETF itself** is a trust run by a sponsor (such as BlackRock), and each share represents a pro-rata interest in the trust's assets.
- **The custodian** safeguards the trust's private keys, mostly in offline cold storage. Most issuers, including IBIT, chose Coinbase's regulated custody arm.
- **NAV** is calculated daily from a benchmark bitcoin price, and fees (0.25% a year for IBIT) are deducted from the trust's assets day by day — which means **the amount of bitcoin behind each share slowly shrinks over time**.

The upside of this chain is that the trust's assets are **segregated** from those of the sponsor and the custodian and are bankruptcy-remote by legal structure — the opposite of FTX, where customer assets were mixed with the exchange's own. The downsides: you **cannot** withdraw bitcoin to your own wallet (redemption is open only to APs); you depend on more institutions; and many ETFs share a small number of custodians, creating **custody concentration** (Stage 12.6 lists it as a risk). To bitcoin purists this violates “not your keys, not your coins.” To pension funds and financial advisers it is exactly the form they need.

### ④ Flows and scale: institutional buying — and governments join in

According to Farside's data, **through September 25, 2026**, US spot bitcoin ETFs had cumulative net inflows of about **$57.5 billion**. The distribution was very uneven: IBIT took in about $65.2 billion, while the higher-fee GBTC (1.5%) saw cumulative net outflows of about $27.8 billion after its conversion — investors voted with their feet, moving from expensive products to cheap ones. IBIT's net assets were about $67.1 billion on September 25; its fund basket implies roughly 800,000 bitcoin (a calculated figure, not an official one), and its quarterly report showed 734,261 coins at June 30, 2026. All spot bitcoin ETFs together reportedly managed about $100 billion, or about 1.26 million bitcoin — around 6.3% of the total supply.

How to read these numbers:

- **Not every inflow is a bullish bet.** Some buyers are hedge funds running a **basis trade**: buy the ETF, sell CME bitcoin futures, and pocket the futures premium (Stage 7.1). This money carries no directional price risk and unwinds when the premium disappears.
- **Compare with new supply.** Stage 12.2 worked out that about 450 new bitcoin are mined each day after the 2024 halving. On heavy-inflow days, ETFs can buy several times that amount — one of the main forces behind the 2024–2025 rally. When inflows slowed or reversed during the 2026 bear market, that force reversed too.
- **Options and more tools.** From November 2024 IBIT had listed options, so bitcoin volatility could be bought and sold at scale in mainstream securities markets for the first time (Stage 7.3).

**Governments** have joined the institutional era as well. On March 6, 2025 the US president signed an executive order creating a **Strategic Bitcoin Reserve**. It is funded with bitcoin the government has forfeited in criminal and civil cases; that bitcoin **is not to be sold**; additions are allowed only through “budget-neutral” means; and a separate “Digital Asset Stockpile” holds other crypto assets. As of September 2026, **the federal government had not spent budget money buying bitcoin**. Treasury Secretary Bessent said in August 2025 that the government would not buy and valued existing holdings at $15–20 billion; in June 2026 he said the reserve was moving at “deliberate speed.” Public estimates of how much bitcoin the government actually holds range from about 200,000 to more than 300,000 coins, and sources conflict. The BITCOIN Act, which would buy 1 million coins over five years, has not advanced in Congress. States have been more active: New Hampshire passed the first state reserve law on May 6, 2025, Arizona followed, and Texas set aside $10 million for a reserve and bought about $5 million of IBIT on November 20, 2025 — **even a state government bought its bitcoin through the ETF pipe**.

### ⑤ ETF, self-custody or treasury company: three ways to hold

<table>
<tr><th>Dimension</th><th>Self-custody</th><th>Spot ETF</th><th>Treasury-company common stock (preview)</th></tr>
<tr><td>What you own</td><td>The private keys themselves</td><td>A share of a trust's assets</td><td>A residual claim on a company</td></tr>
<tr><td>Cost</td><td>One-off hardware and trading spreads</td><td>Annual fee (e.g. 0.25%)</td><td>No management fee, but operating costs and dilution/accretion</td></tr>
<tr><td>Price vs bitcoin value</td><td>Identical</td><td>Close to NAV (arbitrage valve)</td><td>Can trade at a big premium or discount (mNAV, Stage 16.2)</td></tr>
<tr><td>Leverage</td><td>None (unless you borrow separately)</td><td>None</td><td>Yes: convertibles and preferreds amplify shareholders' exposure</td></tr>
<tr><td>Trading hours</td><td>24/7</td><td>Exchange hours</td><td>Exchange hours</td></tr>
<tr><td>Main risks</td><td>Loss, fraud</td><td>Custody concentration, issuer and securities system</td><td>Bitcoin risk plus capital structure, premium collapse, dilution</td></tr>
</table>

ETFs cut both ways for treasury companies. On one hand, they weakened an early selling point — “our stock is the only compliant way to get bitcoin exposure.” On the other hand, an ETF can only replicate; it **cannot** issue preferred stock or convertibles, or borrow to buy more bitcoin — precisely the things treasury companies claim they can do for shareholders (Stage 15.3). Stage 15.5 turns this table into a full scenario calculator. This lesson covers mechanisms and frameworks only and is not investment advice.

The lesson in one sentence: **Spot ETFs use the creation/redemption valve to plug bitcoin into the traditional securities plumbing, keeping the price at NAV and letting big money hold it compliantly; the trade-off is that you own shares rather than keys and depend on concentrated custody. An ETF is a transparent box — a treasury company is a leveraged balance sheet.**
`,

  demo: "bitcoin-etfs",

  analogy: `
Think of a spot ETF as **a vault's receipt system**.

Bitcoin is the gold bars in the vault. Most people don't want to hide gold bars at home — too easy to lose, steal or forget where you put them — so they hand the bars to a big vault with guards, auditors and insurance, and get standardized receipts in return that can be bought and sold freely at the market.

Now and then the receipts at the market trade a little above or below the value of the gold they represent. That's when a few privileged merchants (authorized participants) step in. When receipts are pricey, they deliver gold to the vault, collect fresh receipts and sell them at the market. When receipts are cheap, they buy them up at the market and take them to the vault to swap for gold. Back and forth, the receipt price keeps getting pulled back to the value of the gold.

The old-style “Grayscale receipts” could be deposited but never swapped back — and at one point they traded at half the value of the gold, because nobody could turn them into real bars.

Just remember that what you hold is **a receipt**, not a bar. The odds of the vault failing are small but not zero, and most of the village's receipts sit in the same one or two vaults. A different kind of player — the treasury company of Stage 15.1 — isn't a vault at all but a merchant who borrows money to buy gold bars, and whose shares can be worth far more, or far less, than the gold he holds.
`,

  misconceptions: [
    "**“Buying a bitcoin ETF is the same as owning bitcoin yourself.”** — You own shares in a trust and get bitcoin's price exposure; the custodian holds the keys and you can't withdraw coins to your own wallet. That form suits retirement accounts and institutions, but its risk profile differs from self-custody.",
    "**“ETF prices could sink to a deep discount like GBTC's.”** — Spot ETFs have a creation/redemption valve: once a gap exceeds costs, APs close it, so large products usually trade within a few tenths of a percent of NAV. GBTC's deep discount happened precisely because it was then a closed-end trust that couldn't be redeemed.",
    "**“Every day of ETF inflows is new bullish money.”** — Part of it is basis trading: buy the ETF, sell CME futures, and earn the premium without directional risk. Those positions unwind as the premium narrows, showing up as outflows. Separate directional buying from arbitrage money when you read flow data.",
    "**“The US Strategic Bitcoin Reserve has been buying bitcoin.”** — As of September 2026 the federal government had not spent budget money on bitcoin. The reserve comes from forfeitures, which the executive order says are not to be sold; additions must be budget-neutral, and the bill to buy 1 million coins over five years hasn't advanced. Public estimates of the holdings also conflict.",
    "**“ETF fees are tiny, so they don't matter.”** — Fees are deducted daily from the trust's assets, so the bitcoin behind each share shrinks every year. A 0.25% fee eats about 2.5% of your coins over ten years; a 1.5% fee eats about 14%. That is one reason money poured out of GBTC after its conversion.",
  ],

  quiz: [
    {
      q: "A spot bitcoin ETF share represents 0.0005 BTC, bitcoin is at $84,000, and shares trade on the exchange at $42.30. What is an authorized participant most likely to do?",
      options: [
        "Nothing — the fund company sets the ETF's price",
        "Buy shares on the exchange and redeem them",
        "Ask the custodian to send bitcoin directly to retail investors",
        "Create new shares at the $42.00 NAV and sell them on the exchange at $42.30, pushing the price back to NAV",
      ],
      answer: 3,
      explain: "NAV = 0.0005 × $84,000 = $42.00, so shares trade at about a 0.7% premium. The AP **creates and sells**, adding supply that erases the premium — and the trust buys more bitcoin in the process.",
    },
    {
      q: "Why did GBTC trade at a discount approaching 50% in 2022?",
      options: [
        "It was then a closed-end trust whose shares couldn't be redeemed for bitcoin, so there was no arbitrage valve pulling the price back to NAV",
        "It held bitcoin futures rather than spot bitcoin",
        "Hackers had stolen half its bitcoin",
        "The SEC had banned it from trading",
      ],
      answer: 0,
      explain: "Without redemption, arbitrage can't close a discount. **After it converted to an ETF in January 2024**, creation and redemption brought its price back near NAV.",
    },
    {
      q: "What did US spot bitcoin ETF flows look like through September 25, 2026?",
      options: [
        "Cumulative net outflows, with every product losing money",
        "Cumulative net inflows of about $57.5 billion; IBIT took in about $65.2 billion while higher-fee GBTC lost about $27.8 billion",
        "Only GBTC had net inflows",
        "Cumulative net inflows above $1 trillion",
      ],
      answer: 1,
      explain: "Money was **reallocated by fee level**: IBIT (0.25%) gathered large inflows and GBTC (1.5%) suffered large outflows, netting to about $57.5 billion.",
    },
    {
      q: "Which statement about the US Strategic Bitcoin Reserve created in March 2025 is correct?",
      options: [
        "The federal government buys a fixed amount of bitcoin with budget money every month",
        "The reserve's bitcoin can be sold at any time to cover the deficit",
        "It is funded mainly with forfeited bitcoin that the executive order says is not to be sold; additions must be budget-neutral, and as of September 2026 no federal budget purchases had been made",
        "The reserve is held in the form of bitcoin ETF shares",
      ],
      answer: 2,
      explain: "The heart of the order is “**don't sell**” and “**budget-neutral**.” It was Texas, a state, that bought about $5 million of IBIT in November 2025 — borrowing the ETF pipe as well.",
    },
    {
      q: "Compared with a spot ETF, what is most fundamentally different about a treasury company's common stock?",
      options: [
        "Its share price always equals the value of the bitcoin it holds",
        "Treasury companies can't hold bitcoin",
        "Its shares trade 24/7",
        "It is a balance sheet that can add leverage through convertibles and preferreds, and its share price can trade at a big premium or discount to its bitcoin",
      ],
      answer: 3,
      explain: "An ETF is a **transparent box** with an arbitrage valve and no leverage; a treasury company is a **balance sheet** whose mNAV can drift far from 1 (Stage 16.2) and whose leverage amplifies shareholders' gains and losses (Stage 16.4).",
    },
  ],

  further: [
    { label: "SEC: Commissioner Uyeda's statement on approval of spot bitcoin ETPs (January 2024)", url: "https://www.sec.gov/newsroom/speeches-statements/uyeda-statement-spot-bitcoin-011023" },
    { label: "Farside Investors: daily flow data for all US spot bitcoin ETFs", url: "https://farside.co.uk/bitcoin-etf-flow-all-data/" },
    { label: "iShares: IBIT product page (net assets, holdings and fees)", url: "https://www.ishares.com/us/products/333011/ishares-bitcoin-trust-etf" },
    { label: "White House: fact sheet on the Strategic Bitcoin Reserve and Digital Asset Stockpile (March 6, 2025)", url: "https://www.whitehouse.gov/fact-sheets/2025/03/fact-sheet-president-donald-j-trump-establishes-the-strategic-bitcoin-reserve-and-u-s-digital-asset-stockpile/" },
    { label: "CoinDesk: Texas buys $5M in BTC ETF (November 2025, the first state reserve purchase)", url: "https://www.coindesk.com/policy/2025/11/25/texas-buys-usd5m-in-btc-etf-as-states-edge-toward-first-government-crypto-reserves" },
  ],
};
