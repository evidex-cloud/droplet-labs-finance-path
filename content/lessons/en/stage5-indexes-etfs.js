export default {
  id: "indexes-etfs",
  stage: 5,
  order: 6,
  title: "Indexes, ETFs & Passive Flows: Who Buys Stocks for You",
  difficulty: "core",
  prereqs: ["what-is-stock"],

  oneLiner:
    "Today the biggest “buyer” in the U.S. stock market is often not a fund manager poring over financial statements but **a rule**: when a stock enters an index, every fund tracking that index has to buy it at its weight, whatever the price. This lesson covers three things: **how indexes are built (weighting and inclusion rules)**, **how ETFs use creation and redemption to pin their price to net asset value**, and **how big passive money is and how it moves prices** — the plumbing behind both spot bitcoin ETFs and the fight over whether digital asset treasury companies belong in indexes.",

  intuition: `
You switch on the news and hear “the S&P 500 rose 1% today.” One percent of what, exactly?

Not any single stock, but an **index**: a basket of stocks chosen by a published set of rules and combined with particular weights into one number. An index started life as a thermometer. When the Dow Jones Industrial Average was born in 1896, its job was to tell readers in a single number whether the market as a whole was running hot or cold.

Then something happened that changed financial history: people noticed that most active stock-pickers, after fees, **fail to beat** the thermometer over the long run. In 1976 Vanguard launched the first index fund for ordinary investors, which simply bought the whole thermometer; in 1993 the first U.S. ETF (SPY) listed, letting you buy and sell the entire S&P 500 like a single stock at any moment during the trading day. The thermometer became a business, and the business kept growing — by Morningstar's count, around the turn of 2023–2024 assets in U.S. passive funds overtook assets in active funds for the first time.

That has a subtle consequence: **index rules have become rules for moving money.** When a company joins the S&P 500, every fund tracking it must buy on or around the effective date, whether the stock looks cheap or dear; when a company is dropped, they must sell. The retirement contribution you make each month is allocated across hundreds of companies automatically by a rule. **Who is buying stocks for you? A few lines of rules written by an index committee.**

This lesson sits on **Idea ③ — liquidity & trust (the plumbing).** ETFs and index funds are among the most important pipes in modern finance. Why is an ETF's price almost always equal to the value of what it holds? Because a group of large institutions called “authorized participants” keep arbitraging it — and this **creation and redemption** mechanism is the very same pipe the spot bitcoin ETFs used from January 2024 (Stage 12.5). Index inclusion rules, meanwhile, bear directly on the fate of digital asset treasury companies: Strategy entered the Nasdaq-100 in December 2024, and whether a company whose main asset is bitcoin should count as an “operating company” for index purposes is one of the structural risks examined in Stage 18.4.

**In this lesson we break it into five parts:**

- **① How an index is built: price weighting, cap weighting and free float**
- **② Who gets in: the S&P 500, Nasdaq-100 and MSCI rules**
- **③ The ETF plumbing: creation, redemption and arbitrage**
- **④ How big passive money is: inclusion effects, concentration and “price-insensitive buyers”**
- **⑤ Indexes and ETFs in the new era: bitcoin ETFs, DATs and tokenized funds**
`,

  mechanics: `
### ① How an index is built: price weighting, cap weighting and free float

The same basket of stocks can give completely different results depending on how it is weighted. The three main methods:

<table>
<tr><th>Method</th><th>Weight depends on</th><th>Example</th><th>Characteristics</th></tr>
<tr><td>Price-weighted</td><td>The share price</td><td>Dow Jones Industrial Average</td><td>A $500 stock counts ten times as much as a $50 stock regardless of company size; stock splits change the weights</td></tr>
<tr><td>Cap-weighted</td><td>Price × shares</td><td>S&P 500, Nasdaq-100, MSCI indexes</td><td>Big companies weigh more; winners' weights grow automatically, with no rebalancing needed</td></tr>
<tr><td>Equal-weighted</td><td>Nothing — all equal</td><td>S&P 500 Equal Weight</td><td>Smaller companies get more weight; needs periodic rebalancing (sell winners, buy losers)</td></tr>
</table>

Price weighting is a historical leftover: in 1896, with no computers, adding up a few prices and dividing by a number was the easy option. Its absurdity shows when a company splits its stock: split 4-for-1, the price falls to a quarter, and the company's weight in the Dow instantly falls to a quarter — while the company's value has not changed by a cent.

The modern standard is **cap weighting** with a **free-float adjustment**: only the shares genuinely available to buy in the market count, excluding the locked-up stakes of founders, governments and strategic holders. A company with a $100 billion market cap whose founder holds 40% has a free-float market cap of $60 billion, and the index weights it on $60 billion. This matters a great deal for companies with large founder stakes or dual-class shares (Stage 5.1).

Cap weighting has an elegant property: **a fund tracking it barely needs to trade.** When a stock rises, its weight in the index grows automatically, and so does the fund's holding of it — the two always stay in step. Trading is needed only when constituents change or when issuance and buybacks change share counts. That is why index funds are so cheap to run.

### ② Who gets in: the S&P 500, Nasdaq-100 and MSCI rules

The three big families decide membership in very different ways:

<table>
<tr><th>Index</th><th>How members are chosen</th><th>Key hurdles (summary; the official methodology governs)</th></tr>
<tr><td>S&P 500</td><td>An index committee exercises discretion within published rules</td><td>U.S. company; market cap above a threshold (raised periodically, around the twenty-billion-dollar mark in recent years); adequate liquidity and free float; <b>positive GAAP earnings summed over the latest four quarters, and positive in the most recent quarter</b></td></tr>
<tr><td>Nasdaq-100</td><td>Purely rules-based</td><td>Roughly the 100 largest non-financial companies listed on Nasdaq, ranked by market cap; reconstituted annually in December</td></tr>
<tr><td>MSCI (e.g., MSCI USA, ACWI)</td><td>Rules-based, reviewed quarterly</td><td>Size segments by free-float market cap and liquidity; one global methodology; consults publicly before changing its methodology</td></tr>
</table>

The feature to notice is the S&P 500's **earnings requirement.** It makes it hard for a company with wildly swinging profits to qualify — and Stage 5.2 showed that under fair-value accounting, a company holding a lot of bitcoin can see net income swing by billions in a quarter. In any quarter where bitcoin ends lower than it started, GAAP earnings may well be negative. That is why “will such-and-such DAT get into the S&P 500?” keeps coming up, while purely rules-based indexes such as the Nasdaq-100 have no such gate — Strategy joined the Nasdaq-100 in its December 2024 reconstitution.

MSCI's question is more fundamental: **is a company whose main asset is bitcoin an “operating company” or an “investment fund”?** If it is treated as a fund, it may be excluded from equity indexes. In the second half of 2025, MSCI publicly consulted on how to treat such companies — the outcome and its consequences are covered in Stage 18.4. **An index is not a passive thermometer; writing its rules is a form of power.**

### ③ The ETF plumbing: creation, redemption and arbitrage

An ETF (exchange-traded fund) trades on an exchange all day like a stock, but the number of its shares can grow or shrink. The key players are the **authorized participants (APs)** — usually large market makers or broker-dealers.

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><defs><marker id="ie-ar-en" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink)"/></marker></defs><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">ETF creation and redemption: arbitrage pins the price to NAV</text><rect x="20" y="110" width="150" height="80" rx="10" fill="var(--surface-2)" stroke="var(--line)"/><text x="95" y="140" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Securities market</text><text x="95" y="160" text-anchor="middle" font-size="10" fill="var(--muted)">the basket of stocks</text><text x="95" y="175" text-anchor="middle" font-size="10" fill="var(--muted)">(or bitcoin)</text><rect x="245" y="110" width="150" height="80" rx="10" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="320" y="140" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Authorized participant</text><text x="320" y="160" text-anchor="middle" font-size="10" fill="var(--muted)">market maker / big broker</text><text x="320" y="175" text-anchor="middle" font-size="10" fill="var(--muted)">earns the spread</text><rect x="470" y="110" width="150" height="80" rx="10" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="545" y="140" text-anchor="middle" font-size="12" font-weight="700" fill="var(--blue)">ETF issuer</text><text x="545" y="160" text-anchor="middle" font-size="10" fill="var(--muted)">holds the basket</text><text x="545" y="175" text-anchor="middle" font-size="10" fill="var(--muted)">issues/cancels at NAV</text><path d="M170,128 L240,128" stroke="var(--ink)" stroke-width="1.5" marker-end="url(#ie-ar-en)"/><text x="205" y="120" text-anchor="middle" font-size="10" fill="var(--ink)">① buy basket</text><path d="M395,128 L465,128" stroke="var(--green)" stroke-width="1.8" marker-end="url(#ie-ar-en)"/><text x="430" y="120" text-anchor="middle" font-size="10" fill="var(--green)">② deliver it</text><path d="M465,172 L395,172" stroke="var(--green)" stroke-width="1.8" marker-end="url(#ie-ar-en)"/><text x="430" y="188" text-anchor="middle" font-size="10" fill="var(--green)">③ new shares</text><rect x="245" y="228" width="150" height="46" rx="10" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="248" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Exchange</text><text x="320" y="264" text-anchor="middle" font-size="10" fill="var(--muted)">investors trade ETF shares</text><path d="M320,190 L320,224" stroke="var(--green)" stroke-width="1.8" marker-end="url(#ie-ar-en)"/><text x="328" y="212" font-size="10" fill="var(--green)">④ sell shares</text><rect x="20" y="40" width="290" height="50" rx="8" fill="var(--green-soft)"/><text x="30" y="60" font-size="11" font-weight="700" fill="var(--green)">Premium (price > NAV) → create</text><text x="30" y="78" font-size="10" fill="var(--ink)">AP swaps a basket for new shares, sells them → price falls</text><rect x="330" y="40" width="290" height="50" rx="8" fill="var(--red-soft)"/><text x="340" y="60" font-size="11" font-weight="700" fill="var(--red)">Discount (price < NAV) → redeem</text><text x="340" y="78" font-size="10" fill="var(--ink)">AP buys cheap shares, swaps for basket → price rises</text></svg><figcaption>The green arrows are the creation path (at a premium); redemption runs the same route in reverse (at a discount). Whenever the arbitrage pays, APs act, dragging the ETF price back toward NAV.</figcaption></figure>

A numerical example: an ETF's basket is worth $100.00 per share of NAV, but buying is brisk and the exchange price is $100.30. The AP buys the basket of underlying stocks in the market (cost: $100 per ETF share), delivers it to the issuer in exchange for a “creation unit” (say 50,000 new shares), then sells those shares on the exchange at $100.30 — a $0.30 gain per share that still leaves a profit after trading costs. As the AP keeps selling new shares, the price is pushed back toward $100. At a discount it works in reverse: the AP buys ETF shares at $99.70 and hands them to the issuer in exchange for a basket worth $100.

The mechanism delivers three benefits: **prices stay close to NAV** (in contrast to the deep discounts common in closed-end funds); **the ETF “borrows” the liquidity of its underlying assets**; and **tax efficiency** (in the U.S., in-kind redemptions let the fund hand out low-cost-basis shares instead of realizing capital gains inside the fund).

It also has preconditions: **the underlying assets must be liquid, and APs must be willing and able to arbitrage.** When bond markets seized up in March 2020, some bond ETFs traded at large discounts — not because ETFs broke, but because the bond market at the other end of the pipe was clogged (Stage 10.3). **An ETF does not create liquidity; it is only a pipe. If the other end is blocked, the price comes unglued.**

### ④ How big passive money is: inclusion effects, concentration and “price-insensitive buyers”

Once passive money is a large share of the market, index rules start pushing prices around:

- **The inclusion effect.** When a stock is announced as an S&P 500 addition, tracking funds must buy by the effective date. Suppose passive funds tracking the S&P 500 together hold about 20% of the index's free-float market cap (an illustrative figure). Add a company with an $80 billion free float and passive money must buy about **$16 billion**; if the stock trades $4 billion a day, that is **four full days of volume.** When Tesla joined the S&P 500 in December 2020, the related buying was estimated in the tens of billions of dollars. Academic studies find the excess return on inclusion announcements has shrunk over the decades — because arbitrageurs now buy ahead of time.
- **Concentration.** Cap weighting means the biggest companies get the biggest weights. In recent years the ten largest S&P 500 constituents have accounted for more than a third of the index — “buying the whole market” is to a large degree buying a handful of giant tech companies.
- **Price-insensitive buyers.** Passive funds buy according to inflows, not valuations. Supporters say active investors still set prices and passive money merely free-rides; critics worry that once the passive share is high enough, price discovery weakens and flows amplify swings. The debate is unsettled, but the direction is clear: **more and more money moves according to rules.**
- **Concentrated votes.** The largest index-fund managers, taken together, are the biggest shareholder group at many U.S. companies (proxy voting, Stage 5.1). The owners of passive money also shape corporate governance.

### ⑤ Indexes and ETFs in the new era: bitcoin ETFs, DATs and tokenized funds

The same plumbing is being connected to new assets:

- **Spot bitcoin ETFs** (approved in January 2024, Stage 12.5) use exactly the creation-and-redemption mechanism of part ③, with bitcoin in the basket instead of stocks and a custodian holding the keys. At first only cash creations and redemptions were allowed; regulators later permitted in-kind. Spot bitcoin ETFs let money that is only allowed to hold securities hold bitcoin — the natural comparison when Stage 15.3 asks why DATs exist.
- **DATs and indexes.** If a DAT joins a major index, passive money automatically becomes a buyer, and absorbs new shares at index weight when the company issues stock; conversely, if it is removed, passive money is forced to sell. Index rules therefore bear directly on a DAT's ability to raise capital (the Stage 16.7 flywheel), which is why Stage 18.4 lists index risk among the structural risks of DATs.
- **Tokenized funds.** Money-market and Treasury funds are now being issued as on-chain tokens (Stage 14.2) that can move around the clock and serve as collateral. One day index-fund and ETF shares may circulate as tokens too — but the legal rights and redemption mechanics will still depend on pipes like the one in part ③.

**This lesson explains mechanisms and rules only; it is not investment advice about any security or fund.** Specific index thresholds and methodologies change over time; the official documents from S&P Dow Jones Indices, Nasdaq and MSCI are the authority.
`,

  demo: "indexes-etfs",

  analogy: `
Think of an index as a **“most popular restaurants in town” list**, and an index fund as **a diner who only eats where the list says.**

How the list is ranked decides where the diner's money goes. Rank by the price of a dish (price weighting) and a tiny bistro charging $500 a plate comes ahead of a packed restaurant chain — plainly silly. Rank by revenue (cap weighting) and the big chains take the top spots; count only the seats open to the public (free float), and a place whose private rooms are mostly reserved for the owner's friends slides down the list.

The list's editors also set entry requirements — say, “profitable in every quarter of the past year.” A restaurant that keeps most of its money in a wine cellar whose value swings wildly (bitcoin) will report profits that jump around, and may be kept off the list for it — however valuable the cellar.

Now suppose half the diners in town only eat where the list says. The day a restaurant makes the list, there is a queue out the door and prices go up; the day one is dropped, half its customers vanish overnight. **The list was meant to describe who is popular; now it decides who is popular.**

An ETF is a “tasting-menu shop” next to the list: buy one tasting menu and you get a bite from every restaurant on it. The menu's price always matches the sum of the dishes because a crew of runners (the APs) watches constantly: if the menu gets too pricey, they buy dishes from each restaurant, assemble menus and sell them to you; if it gets too cheap, they buy menus, take them apart and sell the dishes back.
`,

  misconceptions: [
    "**“The Dow is the best gauge of the U.S. market.”** — The Dow holds only 30 stocks and weights them by share price: high-priced stocks matter more regardless of company size, and splits change the weights. The cap-weighted S&P 500 or a total-market index is the more common gauge of the market as a whole.",
    "**“An ETF's price is set by supply and demand, so it can drift far from NAV for long periods.”** — Creation and redemption give authorized participants an arbitrage profit whenever the price strays, which pulls it back toward NAV. Large premiums or discounts appear only when the underlying market itself malfunctions, as some bond markets did in March 2020.",
    "**“Any company big enough automatically joins the S&P 500.”** — The S&P 500 is chosen by a committee and also requires liquidity, free float and profitability (positive GAAP earnings summed over four quarters and in the latest quarter). A company whose earnings swing with asset prices can stay out for a long time despite a huge market cap.",
    "**“An index fund is a diversified portfolio unrelated to any single company.”** — Cap weighting concentrates weight in the largest names; in recent years the top ten S&P 500 constituents have been more than a third of the index. How diversified you are depends on how concentrated the index is.",
    "**“Passive money just follows along and doesn't affect prices.”** — When passive money is a large share of the market, inclusions, deletions and fund flows all produce price-insensitive buying and selling. The inclusion effect and the enormous volumes on index-rebalancing days are evidence that it does.",
  ],

  quiz: [
    {
      q: "In a price-weighted index, stock A trades at $500 (market cap $100B) and stock B at $50 (market cap $500B). Both rise 10%. Which moves the index more?",
      options: [
        "B, because its market cap is larger",
        "A, because a price-weighted index only looks at share price, and A's price is ten times B's",
        "They move it equally, since the percentage gain is the same",
        "Impossible to say without knowing the free float",
      ],
      answer: 1,
      explain: "A price-weighted index (like the Dow) weights by share price, so **A has ten times B's influence**, regardless of company size. That is the most common criticism of price weighting.",
    },
    {
      q: "An ETF's basket is worth $100 per share of NAV, but it trades at $100.30 on the exchange. What will an authorized participant most likely do?",
      options: [
        "Buy ETF shares and hand them to the issuer for redemption",
        "Nothing — wait for the price to fall on its own",
        "Buy the basket of underlying stocks, deliver it to the issuer to create new shares, and sell them on the exchange",
        "Ask the exchange to halt trading",
      ],
      answer: 2,
      explain: "At a premium the AP **creates**: it assembles the basket at a $100 cost, swaps it for new shares, and sells them at $100.30, pocketing the spread. The continued selling pushes the price back toward NAV.",
    },
    {
      q: "Which S&P 500 inclusion rule is especially hard for a company holding lots of bitcoin under fair-value accounting to satisfy?",
      options: [
        "It must be listed on Nasdaq",
        "It must pay a dividend",
        "Its market cap must exceed $1 trillion",
        "GAAP net income summed over the latest four quarters must be positive, and the latest quarter must be positive too",
      ],
      answer: 3,
      explain: "Under fair-value accounting, a quarter in which bitcoin ends lower than it started can produce a large GAAP loss. The **earnings requirement** is therefore the main obstacle to S&P 500 inclusion for such companies (Stages 5.2, 18.4).",
    },
    {
      q: "Passive funds together hold 20% of an index's free-float market cap. A company with an $80 billion free float is added; it trades $4 billion a day. How much must passive money buy, and how many days of volume is that?",
      options: [
        "$16 billion, about 4 days of volume",
        "$80 billion, about 20 days of volume",
        "$4 billion, about 1 day of volume",
        "$1.6 billion, less than half a day of volume",
      ],
      answer: 0,
      explain: "$80B × 20% = **$16B**, ÷ $4B a day = **4 days** of total volume. That is where the inclusion effect comes from: a crowd of price-insensitive buyers arriving around the same date.",
    },
  ],

  further: [
    { label: "S&P Dow Jones Indices: S&P U.S. Indices Methodology (the official S&P 500 inclusion rules)", url: "https://www.spglobal.com/spdji/en/documents/methodologies/methodology-sp-us-indices.pdf" },
    { label: "Nasdaq: Nasdaq-100 Index Methodology", url: "https://indexes.nasdaqomx.com/docs/Methodology_NDX.pdf" },
    { label: "MSCI: Index Methodology hub — global methodologies and consultations", url: "https://www.msci.com/index-methodology" },
    { label: "Investor.gov (U.S. SEC): Mutual Funds and Exchange-Traded Funds — structure and risks", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/mutual-funds-and-exchange-traded-1" },
  ],
};
