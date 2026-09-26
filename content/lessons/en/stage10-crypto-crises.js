export default {
  id: "crypto-crises",
  stage: 10,
  order: 5,
  title: "Crypto Crises: Mt. Gox, Terra/Luna, FTX & the 2022 Contagion",
  difficulty: "systems",
  prereqs: ["anatomy-of-crisis", "bubbles-reflexivity"],

  oneLiner:
    "In more than a decade, nobody has run on the Bitcoin protocol itself — but **the institutions built around it** have collapsed again and again. In 2014 Mt. Gox lost about 850,000 bitcoin; the 2017–18 ICO bubble erased most of the value of most tokens; in 2022 Terra's algorithmic stablecoin went to zero within days, and Three Arrows Capital, Celsius, Voyager and FTX fell like dominoes behind it. Take them apart and you find the skeleton of Stage 10.1 again: **customer money put to other uses (custody), bets magnified with borrowed money (leverage), and self-issued tokens used as collateral (fake collateral).** This lesson dissects each case and asks what those lessons look like in the era of spot ETFs and DATs.",

  intuition: `
Start with a distinction that is easy to miss: **the Bitcoin network** and **the Bitcoin industry** are two different things.

The Bitcoin network is a public ledger anyone can verify. Nobody can “borrow” the coins in your wallet, and there is no “withdraw any time, but the bank only kept part of it in cash.” If you hold your private keys, you hold your coins. That was the design intent covered in Stage 12.1, and the answer to the bank-bailout headline embedded in the genesis block in 2009 (Stage 10.2).

But most people don't hold their own keys. They leave coins on exchanges, put them into “earn” products, lend them to platforms for interest — **in other words, they hand the coins back to an intermediary.** The moment they do, none of Bitcoin's properties protect them. What they hold is a line in that firm's ledger: a **claim** on the firm (Idea ②). Whether the firm can pay on demand depends on whether it has put customer coins to other uses, whether it is levered, and whether the “assets” on its books are worth anything — **which is the bank run of Stage 10.1 all over again, without deposit insurance and without a lender of last resort.**

A few numbers show how serious the consequences were:

- **February 2014, Mt. Gox:** then the world's largest bitcoin exchange, it halted withdrawals and filed for bankruptcy with about 850,000 bitcoin missing (about 200,000 were later found). Creditors waited a decade; partial repayments in bitcoin began only in July 2024.
- **May 2022, Terra/Luna:** the algorithmic stablecoin UST, with about $18 billion outstanding, lost its peg, and its sister token LUNA went from tens of dollars to almost nothing within days, wiping out tens of billions of dollars.
- **November 2022, FTX:** an exchange once valued in the tens of billions saw about $6 billion withdrawn in roughly three days, halted withdrawals and filed for bankruptcy, with a hole in customer funds of about $8 billion.

This lesson rests on **Idea ③, liquidity and trust (the plumbing)** — crypto crises are, at heart, breaks in trust in off-chain intermediaries — and **Idea ④, risk and leverage** — every blow-up involved leverage and reflexivity (Stage 10.4), and some involved outright fraud. By the end you'll have a fixed set of questions to put to any crypto firm, and you'll see more clearly what the DeFi risks of Stage 13.6 and the DAT-versus-ETF custody and counterparty comparison of Stage 15.5 are really guarding against.

**In this lesson we break it into five pieces:**

- **① Mt. Gox (2014): the original sin of custody**
- **② The ICO bubble (2017–2018): “assets” with no claim on anything**
- **③ Terra/Luna (May 2022): an algorithmic stablecoin's death spiral**
- **④ The chain reaction: Three Arrows, Celsius and FTX**
- **⑤ The checklist: custody, leverage, fake collateral — in the age of ETFs and DATs**
`,

  mechanics: `
### ① Mt. Gox (2014): the original sin of custody

Mt. Gox was based in Tokyo, and around 2013 it was estimated to handle roughly 70% of all bitcoin trading worldwide. Its problem was not that the Bitcoin network was breached; it was that **the exchange's own wallets had been looted for years and its internal books were a mess:**

- On **February 7, 2014** it suspended bitcoin withdrawals, blaming a “transaction malleability” bug.
- Around **February 24** the website went dark and trading stopped.
- On **February 28** it filed for bankruptcy protection in Tokyo, reporting about 750,000 customer bitcoin and about 100,000 of its own missing; about 200,000 were later found in an old wallet.

Later investigations suggested the theft from its hot wallet may have started years earlier, while the exchange's ledger kept showing customer balances as “intact” — **and nobody outside could check whether its assets matched its liabilities.** It was the first large-scale case of Stage 10.1's opacity in the crypto world.

Mt. Gox left crypto its most famous slogan — **“Not your keys, not your coins”** — and a very long legal tail. The bankruptcy ran in Japan for a decade; the trustee only began repaying creditors, partly in bitcoin, in July 2024. Ironically, because bitcoin rose so much over those ten years, **creditors who got part of their claim back in bitcoin ended up, in dollar terms, far ahead of their original loss** — the exact opposite of what happened to FTX creditors, as we'll see.

### ② The ICO bubble (2017–2018): “assets” with no claim on anything

In 2017 Ethereum let anyone issue their own token in minutes. The result was the **initial coin offering (ICO)** craze: a project could publish a white paper and raise millions or tens of millions of dollars' worth of ether from around the world, and the industry as a whole raised billions over two years.

The problem was that most ICO tokens were **not a claim on anything** (Idea ②). They weren't shares (no dividends, no votes, no residual claim) and they weren't bonds (no promise to repay), and many had no real usage demand. Their prices rested almost entirely on narrative and fresh inflows — a textbook case of the reflexivity of Stage 10.4 and Kindleberger's euphoria stage.

- Bitcoin rose to about $19,700 in December 2017 and fell to about $3,200 by December 2018, a drawdown of about 84%.
- Ether rose to about $1,400 in January 2018 and fell to about $85 by year-end, a drawdown of more than 90%.
- Huge numbers of ICO projects went to zero — some through failure, some because they were scams from the start.

Regulators began to respond. In July 2017 the US SEC published its investigative report on The DAO, warning that some tokens may be securities. **The lesson of this bubble: first ask what claim you actually own; only then talk about price.**

### ③ Terra/Luna (May 2022): an algorithmic stablecoin's death spiral

Stage 13.2 covers three kinds of stablecoin: fiat-reserved, crypto-overcollateralized and algorithmic. Terra's UST was the third kind. It **had no full dollar reserves**; instead it held its $1 peg through a “mint and burn” mechanism with its sister token, LUNA:

- Anyone could swap **1 UST for $1 worth of newly minted LUNA**, and vice versa.
- If UST slipped to $0.98, arbitrageurs bought UST, swapped it for $1 of LUNA and sold the LUNA for a two-cent profit. That buying pushed UST back to $1, while UST was burned and new LUNA was minted.

The mechanism worked in normal times, but it rested on a fatal premise: **LUNA had to be worth something, and the market had to be willing to absorb newly minted LUNA.** UST's “backing” was, in essence, LUNA's market value — an asset that itself rested on confidence. The source of demand was even more dangerous. Terra's Anchor protocol paid about 20% a year on UST deposits, and **most UST sat in Anchor.** That yield was not backed by genuine borrowing demand of anything like the same size — the Stage 13.5 rule, “if you can't find the source of the yield, you are the yield.”

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><defs><marker id="ccx-ar-en" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--red)"/></marker></defs><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The UST/LUNA death spiral (May 2022)</text><rect x="235" y="36" width="170" height="50" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="320" y="58" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">UST loses its peg (&lt; $1)</text><text x="320" y="75" text-anchor="middle" font-size="10" fill="var(--muted)">Depositors flee Anchor</text><rect x="455" y="118" width="170" height="50" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="540" y="140" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Redeem: 1 UST → $1 LUNA</text><text x="540" y="157" text-anchor="middle" font-size="10" fill="var(--muted)">Massive LUNA minting</text><rect x="235" y="200" width="170" height="50" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="222" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">New LUNA is dumped</text><text x="320" y="239" text-anchor="middle" font-size="10" fill="var(--muted)">LUNA price collapses</text><rect x="15" y="118" width="170" height="50" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="100" y="140" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">“Backing” shrinks</text><text x="100" y="157" text-anchor="middle" font-size="10" fill="var(--muted)">LUNA cap &lt; UST supply</text><path d="M407,62 C470,70 520,90 535,114" fill="none" stroke="var(--red)" stroke-width="2" marker-end="url(#ccx-ar-en)"/><path d="M535,170 C520,198 470,218 409,224" fill="none" stroke="var(--red)" stroke-width="2" marker-end="url(#ccx-ar-en)"/><path d="M233,224 C170,218 120,198 105,170" fill="none" stroke="var(--red)" stroke-width="2" marker-end="url(#ccx-ar-en)"/><path d="M105,116 C120,90 170,70 233,62" fill="none" stroke="var(--red)" stroke-width="2" marker-end="url(#ccx-ar-en)"/><text x="320" y="132" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">The more redeemed, the more LUNA — and the less it's worth</text><text x="320" y="150" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">The less it's worth, the more people redeem</text><text x="320" y="268" text-anchor="middle" font-size="10.5" fill="var(--muted)">LUNA supply went from about 350 million to trillions within days; about 80,000 BTC of reserves were sold to defend the peg</text></svg><figcaption>An algorithmic stablecoin's “backing” is another asset priced on confidence. In calm times arbitrage holds the peg; in a panic the same machinery prints LUNA to zero — reflexivity from Stage 10.4 in its most extreme form.</figcaption></figure>

How the collapse unfolded:

- **Around May 7, 2022,** large amounts of UST were pulled from Anchor and sold into decentralized exchange pools, and UST began to slip from $1.
- The Luna Foundation Guard (LFG) had built a reserve of about 80,000 bitcoin; it now **sold almost all of it to buy UST and defend the peg** — selling pressure that also hit the bitcoin market itself.
- **May 9–12:** the depeg became a spiral — redemptions → LUNA minting → LUNA collapse → more redemptions. LUNA's supply ballooned from about 350 million tokens to trillions, its price fell below a cent, and the Terra chain briefly halted. UST had about $18 billion outstanding, and LUNA's market value had peaked at about $40 billion in April — **tens of billions of dollars of “value” vanished in a week.**
- Founder Do Kwon was later criminally charged in both South Korea and the United States.

**Terra's lesson: a structure that “backs” its own liabilities with an asset it issues itself has no outside support under stress.** That is the “fake collateral” of this lesson's title, and it shows up again at FTX.

### ④ The chain reaction: Three Arrows, Celsius and FTX

After Terra fell, 2022 exposed the crypto industry's web of connections much as 2008 exposed the shadow banks'. (The backdrop was the aggressive rate hikes of Stage 10.3: bitcoin slid from about $69,000 in November 2021 to about $15,500 in November 2022, a drawdown of about 77%.)

<table>
<tr><th>When</th><th>What</th><th>Which bone of the skeleton</th></tr>
<tr><td>May 2022</td><td>Terra/Luna collapses</td><td>Fake collateral + reflexivity</td></tr>
<tr><td>June 12, 2022</td><td>Lender Celsius freezes withdrawals (files for bankruptcy July 13)</td><td>On-demand liabilities + illiquid assets (maturity mismatch)</td></tr>
<tr><td>Late June 2022</td><td>Hedge fund Three Arrows Capital fails to meet margin calls; a British Virgin Islands court orders its liquidation on June 27</td><td>Leverage + concentrated bets on LUNA and similar assets</td></tr>
<tr><td>Early July 2022</td><td>Lender Voyager files for bankruptcy (Three Arrows owed it about $650 million)</td><td>Counterparty contagion</td></tr>
<tr><td>Nov 2–11, 2022</td><td>FTX and its affiliated trading firm Alameda collapse; bankruptcy filing on November 11</td><td>Misused customer funds + house token as collateral + a run</td></tr>
<tr><td>Nov 2022 – Jan 2023</td><td>BlockFi files for bankruptcy; Genesis freezes withdrawals, then files</td><td>A second wave of counterparty contagion</td></tr>
</table>

**Celsius** promised retail customers “withdraw any time” along with double-digit yields. To pay those yields it lent customer coins to institutions, deployed them in DeFi and staked them — and much of that could not be turned into cash quickly (staked ether, for example, could not be withdrawn at the time). It was Stage 10.1's **maturity mismatch** in pure form, without capital rules or deposit insurance.

**Three Arrows Capital (3AC)**, a Singapore-based crypto hedge fund, borrowed from almost every major lending platform and bet on LUNA, on the premium of the Grayscale Bitcoin Trust, and more. When LUNA went to zero and Grayscale's premium flipped to a discount, it couldn't meet its margin calls, and **its default passed the losses on to Voyager, Genesis, BlockFi and every other platform that had lent to it.** That is Stage 10.1's **counterparty contagion.**

**FTX** was the most severe and the most instructive case of 2022.

- **November 2:** CoinDesk published the balance sheet of Alameda, FTX's affiliated trading firm. A large share of its assets was FTT — the token FTX itself issued — and other tokens closely tied to FTX.
- **November 6:** Binance announced it would sell its FTT holdings. Customers began withdrawing from FTX, pulling out about $6 billion in roughly three days.
- **November 8:** FTX halted withdrawals. Binance briefly said it intended to buy FTX, then walked away the next day.
- **November 11:** FTX, Alameda and about 130 affiliated companies filed for bankruptcy in the US. John J. Ray III, who had overseen the Enron liquidation, took over as CEO and told the court he had never seen such a complete failure of corporate controls.

It emerged that FTX had **passed customer deposits to Alameda** for trading, venture investments and other uses, while Alameda borrowed against FTT and other house tokens as collateral. Founder Sam Bankman-Fried was found guilty by a jury on all seven counts on November 2, 2023, and sentenced to 25 years in prison on March 28, 2024.

<figure><svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">An FTX-style exchange: what customers thought vs what was there (stylized)</text><text x="170" y="44" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted)">What customers thought: 1:1 custody</text><rect x="70" y="54" width="90" height="170" fill="var(--green-soft)" stroke="var(--green)"/><text x="115" y="140" text-anchor="middle" font-size="11" fill="var(--ink)">Customer coins</text><text x="115" y="156" text-anchor="middle" font-size="10" fill="var(--muted)">100</text><rect x="170" y="54" width="90" height="170" fill="var(--red-soft)" stroke="var(--red)"/><text x="215" y="140" text-anchor="middle" font-size="11" fill="var(--ink)">Owed to customers</text><text x="215" y="156" text-anchor="middle" font-size="10" fill="var(--muted)">100</text><text x="470" y="44" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted)">What was there: misuse + house token</text><rect x="370" y="54" width="90" height="30" fill="var(--green-soft)" stroke="var(--green)"/><text x="415" y="73" text-anchor="middle" font-size="10" fill="var(--ink)">Usable coins 15</text><rect x="370" y="84" width="90" height="60" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="415" y="112" text-anchor="middle" font-size="10" fill="var(--ink)">House token 35</text><text x="415" y="126" text-anchor="middle" font-size="9" fill="var(--red)">Near zero in a run</text><rect x="370" y="144" width="90" height="80" fill="var(--surface-2)" stroke="var(--line)"/><text x="415" y="180" text-anchor="middle" font-size="10" fill="var(--ink)">Loans to affiliate</text><text x="415" y="194" text-anchor="middle" font-size="10" fill="var(--ink)">and venture bets 50</text><text x="415" y="208" text-anchor="middle" font-size="9" fill="var(--muted)">Can't sell fast</text><rect x="470" y="54" width="90" height="170" fill="var(--red-soft)" stroke="var(--red)"/><text x="515" y="140" text-anchor="middle" font-size="11" fill="var(--ink)">Owed to customers</text><text x="515" y="156" text-anchor="middle" font-size="10" fill="var(--muted)">100</text><text x="320" y="244" text-anchor="middle" font-size="10.5" fill="var(--orange-ink)">If just 15% of customers withdraw at once, the usable coins are gone — everyone else queues behind assets that can't be sold or are worth nothing</text></svg><figcaption>Illustrative numbers, not FTX's actual books. The point is the structure: treat customer assets as your own, prop up the balance sheet with your own token, and a run is only a matter of time.</figcaption></figure>

FTX's bankruptcy had one more ending worth remembering. Because so many assets were recovered, the estate's plan repays customers the **dollar value of their claims as of the petition date (November 2022)** plus interest, with distributions starting in 2025, and most customers receive more dollars than their petition-date claims. But on the petition date bitcoin was only about $16,000. **Dollar-denominated claims were locked in near the bottom of the market;** customers who had held bitcoin got back dollars that buy far fewer bitcoin than they once owned. **The unit your claim is denominated in is itself part of the risk** (Idea ②).

### ⑤ The checklist: custody, leverage, fake collateral — in the age of ETFs and DATs

Compress the five cases into a checklist you can put to any crypto firm (or any financial firm):

<table>
<tr><th>Question</th><th>Where it went wrong</th><th>How it's handled now</th></tr>
<tr><td>Who holds my assets? Are they segregated from the firm's own?</td><td>Mt. Gox, FTX</td><td>Self-custody; regulated qualified custodians; independent custody for spot ETFs</td></tr>
<tr><td>Can the liabilities be called at any time? Can the assets be sold as fast?</td><td>Celsius, FTX</td><td>1:1 reserves; no maturity mismatch</td></tr>
<tr><td>Who is using leverage? Are there margin calls tied to market value?</td><td>Three Arrows, the lenders</td><td>Low leverage; avoiding margin loans</td></tr>
<tr><td>Is the collateral something the firm printed itself?</td><td>Terra, FTX (FTT)</td><td>Accept only external, independently priced collateral</td></tr>
<tr><td>Can I verify its assets and liabilities?</td><td>All of them</td><td>On-chain proof of reserves (which usually proves assets, not liabilities); audited statements</td></tr>
<tr><td>What unit is my claim denominated in?</td><td>Mt. Gox vs FTX</td><td>Read the terms: repaid in coins or in dollars?</td></tr>
</table>

**One point worth recording, to be fair:** in the 2022 chain reaction, nearly everything that failed was an **off-chain, centralized firm** (CeFi). The major on-chain lending protocols mostly executed their liquidations by the rules and in public view, without freezing withdrawals (Stage 13.4). DeFi has its own set of risks, of course — contract bugs, oracle manipulation, bridge hacks (Stage 13.6).

**The new-era angle: how these lessons shaped ETFs and DATs.**

- **Spot bitcoin ETFs (January 2024, Stage 12.5).** Regulated custodians hold the bitcoin separately, and creations and redemptions follow set rules — a direct answer to the custody black boxes of Mt. Gox and FTX. The risk changes shape rather than disappearing: custodian and issuer counterparty risk, fees, and the fact that you own fund shares rather than bitcoin itself (Stage 15.5 compares these line by line).
- **DATs.** A listed company holds bitcoin and discloses its holdings, custody arrangements and capital structure as a public company must. DATs were tested in 2022 too. In March 2022 MicroStrategy (today's Strategy) took a $205 million bitcoin-collateralized term loan from Silvergate Bank; when bitcoin plunged that June, the market openly debated whether it would face a margin call. The company repaid the loan early in March 2023, and since then it has financed itself mainly through convertibles and preferreds with no margin calls tied to market value (Stage 7.5, Stage 17.6). **That is a lesson of 2022 written into a capital structure.** (This lesson covers mechanisms and analytical frameworks only; it is not investment advice.)
- **Questions that still need asking.** Who is a DAT's custodian, and is custody spread out? Does any part of its liabilities work like “withdraw any time”? Does the value of the securities it issues depend partly on its own share price (the reflexivity of Stage 10.4)? The DAT checklist in Stage 18.6 makes these questions systematic.

**One line to carry forward: Bitcoin solved “is the number on the ledger real?” It did not solve “who did you hand your coins to?”** Every crypto crisis has been the price of that second question.
`,

  demo: "crypto-crises",

  analogy: `
Think of bitcoin as **a gold bar,** and crypto firms as the various **“gold shops” that store the bar for you.**

The bar itself can't vanish or be counterfeited — that is Bitcoin's promise. But when you leave it at a gold shop, what you get back is a **receipt.** Whether the receipt is worth anything depends on the shop:

- **Mt. Gox** was a shop whose back door had been unlocked for years. Bars disappeared one by one while the ledger on the counter kept saying, “Your gold is safe.”
- **The ICOs** were people selling “souvenir coupons for a future gold mine” — the coupons didn't say which part of the mine you owned or when it would produce any gold.
- **Terra** was a shop announcing: “Our receipts are always worth one gram of gold, because you can always swap them for shares in our shop.” But there was no gold in the shop, only its own shares. The moment the receipts were questioned, everyone swapped them for shares and sold the shares; the shares became worthless, and so did the receipts.
- **Celsius** was a shop promising “withdraw any time, double-digit interest,” while quietly lending the bars out and locking them into long contracts.
- **FTX** was a shop that carted customers' bars off to the owner's own trading firm and filled the books with **store scrip it had printed itself.** Then one day someone photographed the ledger and posted it online.

So the first lesson of buying gold is to check the gold. The second, more important lesson is to **check who you handed it to, what they did with it, and whether you can verify it at any time.** Spot ETFs and DATs are, at bottom, new answers to that second lesson, using the rules of listed companies and regulated custodians.
`,

  misconceptions: [
    "**“These crises prove bitcoin itself is unsafe.”** — Mt. Gox, Celsius and FTX all failed off-chain, in centralized firms: looted hot wallets, misused customer funds, maturity mismatch, fake collateral. The Bitcoin network kept producing blocks throughout. Bitcoin's price was hit hard by these crises, of course, and “who holds my coins” is a risk every holder has to face.",
    "**“An algorithmic stablecoin with clever enough design can be as stable as the dollar.”** — Terra showed that backing a coin with a token you issue yourself means guaranteeing confidence with confidence. Arbitrage holds the peg in calm times; in a panic the same mechanism mints without limit and drives the backing asset to zero. Truly stable stablecoins rely on full, external, quickly sellable reserves (Stage 13.2).",
    "**“A high yield shows the platform is good at making money.”** — Anchor's roughly 20% on UST and Celsius's double-digit yields had no comparable source of real income. The Stage 13.5 rule: if you can't find where the yield comes from, you are the yield. High yield usually means high risk, high leverage, or new money paying old money.",
    "**“FTX customers eventually got back more than 100%, so they lost nothing.”** — They got back the dollar value of their claims at the November 2022 petition date, plus interest. Bitcoin was about $16,000 then and rose sharply afterward, so customers who had held bitcoin received dollars that buy far fewer coins than they had. How a claim is denominated is itself a risk.",
    "**“On-chain proof of reserves would have prevented an FTX.”** — Proof of reserves can show which on-chain assets a firm controls at a point in time, but it usually can't prove total liabilities, and it can't rule out borrowed assets, off-balance-sheet debts or collateral pledged twice. It is progress, not a cure; audits, regulation and segregated custody are still needed.",
  ],

  quiz: [
    {
      q: "What was the core mechanism that held Terra's UST at $1?",
      options: [
        "The issuer held an equal amount of US Treasury bills in reserve",
        "1 UST could be swapped for $1 of newly minted LUNA, and arbitrageurs used this to pull the price back to $1",
        "It was backed by overcollateralized ether",
        "The Federal Reserve provided liquidity support",
      ],
      answer: 1,
      explain: "UST was an **algorithmic stablecoin** held on its peg by mint-and-burn arbitrage between UST and LUNA. Its “backing” was LUNA's market value — in a panic, more redemptions meant more LUNA minted and a lower price: a death spiral.",
    },
    {
      q: "Celsius freezing withdrawals in June 2022 best fits which vulnerability from the Stage 10.1 skeleton?",
      options: [
        "Maturity mismatch: promising instant withdrawals while lending out or locking up assets that couldn't be sold quickly",
        "Interest-rate risk: holding lots of long Treasuries",
        "Currency risk: liabilities denominated in yen",
        "None — it was simply unlucky",
      ],
      answer: 0,
      explain: "On-demand liabilities + illiquid assets = the raw material of a run. Celsius had no capital rules, no deposit insurance and no lender of last resort.",
    },
    {
      q: "In the FTX collapse, what does “fake collateral” refer to?",
      options: [
        "Counterfeit dollar bills",
        "Stolen bitcoin",
        "US Treasuries",
        "FTX's own token FTT and similar tokens, used by its affiliate as assets and collateral — their value depended on FTX's own credibility",
      ],
      answer: 3,
      explain: "Propping up a balance sheet with a token you print yourself is like Terra propping up UST with LUNA: once confidence cracks, the liabilities stay put while the assets collapse at the same moment — reflexivity from Stage 10.4 in its most extreme form.",
    },
    {
      q: "What was the key difference in how Mt. Gox and FTX creditors' claims were denominated?",
      options: [
        "None — both were repaid in dollars",
        "Mt. Gox creditors got nothing at all",
        "Mt. Gox repaid partly in bitcoin and benefited from its long rise; FTX claims were valued in dollars at the November 2022 petition date, locked in near the bottom",
        "FTX creditors all got their bitcoin back",
      ],
      answer: 2,
      explain: "The unit a claim is denominated in decides who bears the price change after a crisis — a practical case of Idea ②, claims.",
    },
    {
      q: "Which of these best shows a lesson of 2022 being written into a DAT's capital structure?",
      options: [
        "DATs promising retail investors they can redeem shares at par any time",
        "MicroStrategy repaying early, in March 2023, a bitcoin-collateralized Silvergate loan that could have triggered margin calls, and financing mainly through convertibles and preferreds without market-value margin calls since",
        "DATs lending their bitcoin to high-yield lending platforms",
        "DATs using tokens they issue themselves as collateral",
      ],
      answer: 1,
      explain: "Removing margin calls tied to market value removes 2022's deadliest liquidation chain (Stage 7.5). DATs still face funding dependence, custody concentration and reflexivity risks (Stage 18.6).",
    },
  ],

  further: [
    { label: "US Department of Justice: Samuel Bankman-Fried sentenced to 25 years (March 2024 press release)", url: "https://www.justice.gov/usao-sdny/pr/samuel-bankman-fried-sentenced-25-years-his-orchestration-multiple-fraudulent-schemes" },
    { label: "US SEC: Report of Investigation on The DAO (July 2017), on when tokens may be securities", url: "https://www.sec.gov/litigation/investreport/34-81207.pdf" },
    { label: "Federal Reserve: Financial Stability Reports, including analysis of crypto-asset and stablecoin risks", url: "https://www.federalreserve.gov/publications/financial-stability-report.htm" },
    { label: "Satoshi Path (sister course): self-custody, private keys and “not your keys, not your coins”", url: "https://evidex-cloud.github.io/nextdawn-satoshi-path/" },
  ],
};
