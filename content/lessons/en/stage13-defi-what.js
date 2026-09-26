export default {
  id: "defi-what",
  stage: 13,
  order: 1,
  title: "What DeFi Is: Banks and Exchanges Rebuilt as Open-Source Code",
  difficulty: "newfin",
  prereqs: ["bitcoin-how", "clearing-settlement"],

  oneLiner:
    "In traditional finance, every transaction has a row of intermediaries standing behind it: broker, exchange, clearinghouse, custodian, bank. They exist because of **trust**. DeFi (decentralized finance) runs a bold experiment: write the **rules** those intermediaries follow as public programs (smart contracts) and let a shared ledger execute them automatically. Trading, lending and market-making then run 24/7, open to anyone, settling in seconds, and they can be **snapped together** like Lego. This lesson explains what DeFi really replaces, what it doesn't, and why \"rules written as code\" is both its greatest strength and the root of its biggest risks.",

  intuition: `
Start with a Saturday night.

Jordan owns some US stocks and suddenly needs $5,000 for an emergency. What can Jordan do in traditional finance? Sell stock — but the market is closed on Saturday, and even if Jordan sells on Monday the cash only settles on Tuesday (T+1, Stage 8.2). Apply for a securities-backed loan — forms, approval, business days. Every step has an institution in the middle: the broker routes the order, the exchange matches it, the clearinghouse guarantees both sides will perform, the custodian records who owns the shares, the bank moves the money. **Every intermediary charges a fee, keeps business hours, and is a point where you have to trust someone.**

Now meet Casey. Casey holds some ether (ETH) and also needs $5,000 on Saturday night. Casey opens a wallet app, connects to a lending protocol called Aave, deposits ETH as collateral and taps "borrow 5,000 USDC" (USDC is a stablecoin pegged 1:1 to the dollar; Stage 13.2 covers it). A dozen seconds later, 5,000 USDC is sitting in Casey's wallet. Nobody approved anything. Nobody asked who Casey is. There are no opening hours.

For Casey's loan, **no company in the middle is "doing" anything**. The lender is a program, a **smart contract**, and its rules are public. The collateral must be worth comfortably more than the loan. If the collateral falls too far, anyone may repay part of Casey's debt and take some collateral at a discount (the automatic liquidation machinery of Stage 13.4). Where does the money come from? From other people who deposited USDC into the same contract to earn interest. Supply and demand set the interest rate automatically.

That is **DeFi (decentralized finance)**: **the rules of financial intermediaries written as open-source code, deployed on a public blockchain and executed by the network.**

This lesson rests mainly on **Idea ③ Liquidity & trust (the plumbing)**. Think back to Stage 8.1 and Stage 8.2. Traditional market plumbing is layer upon layer of institutions, and each layer solves the problem of "how do I know the other side will pay?" Bitcoin (Stage 12.1) proved for the first time that a ledger with no central operator can get strangers to agree on who owns what. DeFi goes one step further. It doesn't just record who owns what; **it automatically executes "if this, then that" financial contracts**. It also rests on **Idea ② Balance sheets & claims**. Every dollar you deposit in DeFi becomes a claim written on a smart contract's balance sheet. The difference is that this balance sheet is public, real-time and open to inspection by anyone.

Keep one sentence in mind for the whole of Stage 13: **DeFi doesn't eliminate trust. It moves trust from institutions to code, oracles, governance and collateral.** When trust moves, risk moves with it, and Stage 13.6 lists the new risks one by one.

A number for scale. According to DefiLlama, the assets locked in DeFi protocols (total value locked, or TVL) came to roughly **$95 billion** in late September 2026. TVL hit an all-time high of about $177.5 billion in November 2021, got close again in October 2025 (about $171 billion), and slid to around $68 billion in July 2026 as crypto prices fell. Next to the hundreds of trillions of dollars in traditional financial assets, that is small. But DeFi is a laboratory that is **open 24 hours a day, fully transparent, and can be inspected and recombined by anyone**. Stablecoins, tokenized Treasuries (Stage 14.2) and on-chain derivatives all grew out of that lab.

**In this lesson we break it into five parts:**

- **① Smart contracts: agreements that execute themselves**
- **② Four properties: non-custodial, permissionless, 24/7, composable**
- **③ Anatomy of an on-chain transaction: wallets, gas and atomicity**
- **④ The DeFi map: trading, lending, stablecoins, derivatives**
- **⑤ What DeFi can replace, and what it can't**
`,

  mechanics: `
### ① Smart contracts: agreements that execute themselves

The cryptographer Nick Szabo coined the term "smart contract" in the 1990s. His example was a **vending machine**. You insert a coin, press a button and the snack drops. The rules are built into the machine, so you don't need a shop assistant or any reason to trust one.

**Ethereum**, launched in July 2015, made the idea real. It is a blockchain that can run general-purpose programs. Bitcoin's ledger mainly records who holds how many coins, while Ethereum's ledger also stores **program code and program state**. A smart contract is a piece of code deployed on-chain. It has its own address, it can hold assets, and it **responds automatically, according to its code, to transactions others send it**.

A lending contract is, in essence, a balance sheet that runs itself:

<table>
<tr><th>The contract's "assets" side</th><th>The contract's "liabilities" side</th></tr>
<tr><td>USDC lent out to borrowers (claims on borrowers)</td><td>USDC deposited by suppliers (claims they can withdraw at any time)</td></tr>
<tr><td>USDC not yet lent (idle liquidity)</td><td>Protocol reserves (a slice of interest kept by the protocol)</td></tr>
<tr><td>ETH and other collateral posted by borrowers (owned by them, locked)</td><td>The obligation to return that collateral to borrowers</td></tr>
</table>

Compare it with the bank T-account from Stage 1.2. The structure is nearly identical: **deposits are liabilities, loans are assets**. There are three differences. First, this balance sheet is **public, updated every block**, and anyone can audit it. Second, code decides whether to lend, at what rate, and when to liquidate, with no loan officer involved. Third, it **does not create credit through maturity transformation**. Almost every loan is over-collateralized, so the borrower walks away with less than the collateral is worth. Does that make it far "safer" than a bank? Not quite. It swaps a bank's **credit risk** for **collateral price risk plus code risk**.

One crucial property: **once deployed, contract code usually can't be changed** (unless the developers left an "upgrade" door, which raises its own trust questions). The slogan "code is law" is both praise and warning. In June 2016 an early contract called The DAO had a bug that let an attacker drain about 3.6 million ETH. The Ethereum community eventually reversed the damage with a contentious "hard fork" that rewrote the ledger. **It was the first time "code is law" collided with "people don't actually accept this outcome."**

### ② Four properties: non-custodial, permissionless, 24/7, composable

What separates DeFi from traditional finance, and from centralized crypto exchanges, comes down to four words:

- **Non-custodial.** Your assets sit in your own wallet, controlled by your private key (Stage 12.1). When you deposit ETH into a lending contract, you hand it to public code, not onto some company's balance sheet. When FTX collapsed in November 2022 (Stage 10.5), customer assets had been misused by the firm. **In a purely decentralized protocol, "the boss spends customer funds" is not an available move.** A code exploit, however, is.
- **Permissionless.** Anyone, and any program, can use it. No account opening, no approval. That brings financial inclusion. It also brings a compliance headache, because people on sanctions lists can use it too.
- **24/7.** No closing bell, no weekends, no holidays. Ethereum produces a block roughly every 12 seconds, and settlement is measured in seconds. **Risk runs 24/7 as well.** The roughly $19 billion leveraged wipeout of October 10–11, 2025 (Stage 7.5) happened on a Friday evening in the US, with no circuit breaker anywhere.
- **Composable.** Every contract is a public building block that other contracts can call directly. One protocol's deposit receipt can become another protocol's collateral. One exchange's price can become another lender's reference price. People call DeFi **"money Legos."**

Composability is what is genuinely new about DeFi, and it is also DeFi's most underrated risk. Here is a typical tower. You stake ETH and receive a "staking receipt" token. You deposit the receipt into a lending protocol as collateral and borrow a stablecoin. Then you deposit the stablecoin into yet another yield protocol. **That's four bricks, and every brick's risk now lands on you.** In April 2026 attackers breached KelpDAO's cross-chain bridge. The stolen receipt tokens were posted to Aave as collateral for loans, which reportedly left Aave with $123–230 million of bad debt. Around $13 billion left DeFi in two days. **One brick cracked and the whole tower shook** (Stage 13.6 has the details).

### ③ Anatomy of an on-chain transaction: wallets, gas and atomicity

What actually happened on-chain when Casey borrowed?

1. **Signing.** Casey's wallet uses the private key to sign a message: "call the Aave contract's deposit function with 3 ETH, then call its borrow function for 5,000 USDC."
2. **Broadcast and queue.** The transaction goes out to the network and waits in the pending pool (the mempool). Casey attaches a **gas fee**, paid in ETH to the validators. When the network is busy, you pay more to get in sooner.
3. **Execution.** A validator includes the transaction in a block. Every node on the network **re-executes the same code** and gets the same result: Casey's 3 ETH moves into the contract, 5,000 USDC moves to Casey, and the contract's books update.
4. **Finality.** Once the network confirms the block, the transaction is effectively irreversible. Within seconds to minutes, **trading, clearing and settlement have all happened at once**.

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The same "borrow $5,000": traditional plumbing vs on-chain plumbing</text><text x="160" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="var(--blue)">TradFi: layers of intermediaries</text><g font-size="11"><rect x="60" y="60" width="200" height="30" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="160" y="80" text-anchor="middle" fill="var(--ink)">Client → broker / bank (KYC, approval)</text><rect x="60" y="98" width="200" height="30" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="160" y="118" text-anchor="middle" fill="var(--ink)">Exchange (matching, market hours)</text><rect x="60" y="136" width="200" height="30" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="160" y="156" text-anchor="middle" fill="var(--ink)">Clearinghouse / CCP (guarantee)</text><rect x="60" y="174" width="200" height="30" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="160" y="194" text-anchor="middle" fill="var(--ink)">Custodian / registrar (records)</text><rect x="60" y="212" width="200" height="30" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="160" y="232" text-anchor="middle" fill="var(--ink)">Interbank payment (moves cash)</text></g><text x="160" y="262" text-anchor="middle" font-size="11" fill="var(--muted)">T+1 settlement · business days · a fee and a trust point per layer</text><text x="480" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">DeFi: one shared ledger</text><rect x="380" y="60" width="200" height="30" rx="6" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="480" y="80" text-anchor="middle" font-size="11" fill="var(--ink)">Wallet (key signature, no account)</text><line x1="480" y1="90" x2="480" y2="110" stroke="var(--orange)" stroke-width="2"/><rect x="380" y="110" width="200" height="94" rx="8" fill="var(--surface-2)" stroke="var(--orange)" stroke-width="2"/><text x="480" y="132" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Smart contract (public code)</text><text x="480" y="152" text-anchor="middle" font-size="11" fill="var(--ink)">match + guarantee + record + pay</text><text x="480" y="172" text-anchor="middle" font-size="11" fill="var(--ink)">inside a single transaction</text><text x="480" y="192" text-anchor="middle" font-size="10" fill="var(--muted)">all or nothing (atomic)</text><line x1="480" y1="204" x2="480" y2="224" stroke="var(--orange)" stroke-width="2"/><rect x="380" y="224" width="200" height="30" rx="6" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="480" y="244" text-anchor="middle" font-size="11" fill="var(--ink)">Block confirmed (about every 12 s)</text><text x="480" y="274" text-anchor="middle" font-size="11" fill="var(--muted)">24/7 · seconds to settle · trust moves to code and collateral</text><text x="320" y="294" text-anchor="middle" font-size="11" font-weight="600" fill="var(--red)">The intermediaries' functions didn't vanish; they were compressed into code, so one bug breaks them all</text></svg><figcaption>On the left, five layers of institutions each solve part of the trust problem. On the right, those functions are squeezed into one piece of code and one transaction. Settlement is faster and access is wider, but every risk now concentrates in that code.</figcaption></figure>

This brings us to a property that barely exists in traditional finance: **atomicity**. Every step in a transaction **either all succeeds or is all reversed**. Nothing is ever "half done." Atomicity made possible a very DeFi-native tool, the **flash loan**. Inside a single transaction you can borrow $10 million, use it for an arbitrage and repay the $10 million plus a fee. If the final repayment step fails, the whole transaction is undone as if it never happened. For the lending contract, the loan carries **zero credit risk**. For an attacker, it is free capital for manipulating prices, and many of the attacks in Stage 13.6 start this way.

Now cost. When Ethereum mainnet is congested, a complex transaction can cost from a few dollars to tens of dollars in gas. That pushed activity onto **"Layer 2" networks** and other faster, cheaper chains, which batch transactions and settle back to the main chain. Costs fall, but you now rely on another layer: a bridge and a sequencer you have to trust. **Once again, trust moves.**

Finally, the queue itself has value. Pending transactions are visible to everyone before they land in a block, so whoever builds the block can **reorder them**: buy just ahead of you and sell just after you, pocketing the difference. This is **MEV (maximal extractable value)**, an invisible tax peculiar to DeFi. Stage 13.5 counts it as a source of yield. Stage 13.6 counts it as a risk.

### ④ The DeFi map: trading, lending, stablecoins, derivatives

Sort DeFi by which department of traditional finance it replaces and the map becomes clear:

<table>
<tr><th>DeFi segment</th><th>Example protocols</th><th>Traditional counterpart</th><th>Covered in</th></tr>
<tr><td>Stablecoins</td><td>USDT, USDC (fiat-reserve); DAI/USDS (crypto-collateralized)</td><td>Bank deposits, money-market funds</td><td>Stage 13.2</td></tr>
<tr><td>Decentralized exchanges (DEXs)</td><td>Uniswap, Curve</td><td>Exchanges + market makers</td><td>Stage 13.3</td></tr>
<tr><td>Lending</td><td>Aave, Compound, Morpho</td><td>Bank loans, margin lending, repo</td><td>Stage 13.4</td></tr>
<tr><td>Yield and asset management</td><td>Yield aggregators, liquid staking, synthetic dollars</td><td>Funds, structured products</td><td>Stage 13.5</td></tr>
<tr><td>Derivatives</td><td>Perpetual-futures DEXs (e.g., Hyperliquid)</td><td>Futures exchanges, clearinghouses</td><td>Stage 7.1, Stage 13.5</td></tr>
<tr><td>Tokenized real-world assets</td><td>Tokenized Treasury funds (e.g., BUIDL)</td><td>Treasuries, money funds</td><td>Stage 14.2</td></tr>
</table>

Some orders of magnitude as of September 2026 (sources: DefiLlama, The Block and similar industry trackers; check live data):

- **Total value locked:** about $95 billion (September 26, 2026). Most TVL is priced in crypto, so **if coin prices halve, TVL can roughly halve** without anyone withdrawing a cent.
- **Aave, the largest lender:** about $19 billion locked (peak about $45.8 billion on October 7, 2025) and about $13 billion of loans outstanding. That is very roughly a third of all DeFi lending.
- **Stablecoin supply:** about $312 billion, of which USDT is about $184 billion and USDC about $75 billion (Stage 13.2).
- **Perpetual-futures DEXs:** monthly volume first topped $1 trillion in September 2025 and set a record of about $1.2 trillion in October 2025. The leader, Hyperliquid, hit a record of about $14.3 billion in open interest on September 8, 2026, and perps on "real-world" underlyings such as stocks and commodities had become its largest category.

The map shows a trend. Early DeFi was a closed loop of crypto trading against crypto. In 2024–2026 it increasingly **plugged into real-world dollars and assets**. Stablecoins are backed by US Treasury bills, tokenized funds hold money-market instruments, and perpetual futures now trade stock indexes. That is the "great convergence" of Stage 14.5.

### ⑤ What DeFi can replace, and what it can't

**What it does well:**

- **Settlement and custody.** For on-chain assets, trade and settlement are the same event, completed in seconds with no clearinghouse (compare T+1 in Stage 8.2).
- **Collateralized lending.** As long as collateral can be priced and liquidated on-chain, a loan needs no credit check.
- **Market-making and swaps.** Automated market makers let any two tokens be exchanged at any time (Stage 13.3).
- **Transparency.** Every balance sheet is public in real time. Had Celsius and FTX been transparent on-chain in 2022, the misuse of funds would have been visible immediately.

**What it does badly, or not yet:**

- **Credit.** A bank's core skill is judging whether a person or company will repay. DeFi doesn't know who you are, so it can do almost nothing but **over-collateralized** lending. It **struggles to extend credit to people who actually lack money**. Mostly, it lets people who already own assets lever up.
- **Real-world enforcement.** Code controls only what lives on-chain. If a court seizes the house behind a "tokenized house," the code is powerless. The off-chain legal claim is the real thing (Stage 14.4).
- **The dollar itself.** DeFi's most important asset is the stablecoin, and the biggest stablecoins are issued by centralized companies that keep reserves in banks and Treasuries and can freeze tokens. **DeFi's dollar leg still stands on traditional-finance foundations** (Stage 13.2).
- **Consumer protection and recourse.** Sent to the wrong address, signed the wrong transaction, got phished? No help desk can reverse it.
- **Regulatory certainty.** The US stablecoin law, the GENIUS Act, was signed on July 18, 2025. But the CLARITY Act, which would define crypto market structure (which tokens fall under the SEC and which under the CFTC), failed a Senate cloture vote 49–50 on September 15, 2026, short of the 60 votes needed. As of late September 2026 it is not law, and the SEC and CFTC are pressing ahead with their own rulemaking.

The whole lesson in one sentence: **DeFi rewrites the rules of financial intermediaries as public, automatic, composable code. It removes some old trust points (custodians who misuse funds, settlement delays, business hours) and creates new ones (code, oracles, governance, bridges, stablecoin issuers).** For any DeFi product, the first question is always **where did the trust go?** The next five lessons walk the map. First comes DeFi's "dollar" (Stage 13.2), then trading (Stage 13.3), lending (Stage 13.4), yield (Stage 13.5), and finally risk (Stage 13.6).
`,

  demo: "defi-what",

  analogy: `
Picture traditional finance as an **old department store**. To buy something you check in at the door, a clerk helps you choose, the cashier takes your money, the back office records the sale, and the bank moves the money to the supplier the next day. The store closes at 10 p.m. and shuts on Sundays for stocktaking. There's a person at every step, and every person draws a salary and might make a mistake or walk off with the cash. So the store has guards, auditors and a regulator.

DeFi is more like a **row of vending machines on the street, running 24 hours a day and built from clear glass**. You can see every gear inside, and anyone can check the logic. Coin in, button, snack out, all in one motion, with no cashier to pocket your money. The machines can also **connect to one another**: a voucher that drops out of one machine can go straight into the next one as a coin.

Glass machines have their own failure modes. If a gear is designed wrong, everyone can see it, thieves included, and a thief may spot how to make the machine overpay before you do. If a machine copies its price list from a sign across the street, whoever repaints the sign can make it sell at the wrong price (the oracle attacks of Stage 13.6). If a machine hands out the wrong item, there's no manager to complain to. And the "coins" these machines take, the stablecoins, are issued by the bank next door to the old department store.

So don't frame it as department store versus vending machines, with one destined to kill the other. The more accurate picture: **the department store is putting vending machines by its entrance, and the vending machines are starting to sell the store's goods**. That is the "great convergence" of Stage 14.5.
`,

  misconceptions: [
    "**\"DeFi removes intermediaries, so you don't need to trust anyone.\"** Trust just changes address. You must trust that the code has no bugs, the price oracle isn't manipulated, governance won't be hijacked, the bridge won't be breached and the stablecoin issuer really holds its reserves. DeFi's risk list isn't shorter than TradFi's. The risks just grow in different places.",
    "**\"TVL halved, so half the money left.\"** Most TVL is denominated in crypto assets. If ether's price halves, TVL can nearly halve even if nobody withdraws anything. To see real flows, look at stablecoin-denominated deposits or net on-chain outflows, not the dollar TVL figure.",
    "**\"DeFi lending doesn't check credit, so anyone can borrow.\"** It's the reverse. Because DeFi doesn't know who you are, it lends almost only against excess collateral. To borrow $5,000 you typically lock up $6,000–8,000 or more. It is closer to \"leveraging assets you already have\" than to extending credit to people who need it.",
    "**\"A smart contract is a contract, so you can go to court if something goes wrong.\"** A smart contract is a program, not a legal agreement. It executes as written, even when the result clearly defeats the developers' intent, and many protocols have no legal entity you could sue. Whether off-chain legal recourse exists depends on the specific legal wrapper (Stage 14.4).",
    "**\"DeFi and crypto exchanges are the same thing.\"** Centralized exchanges such as FTX or Bybit are companies that hold your assets for you, so their failures are custody failures: FTX misused funds, and Bybit lost about $1.5 billion to hackers in February 2025. DeFi protocols are non-custodial contracts whose assets are visible on-chain, and they mostly fail through broken code or broken economic design. Assess the two risks separately.",
  ],

  quiz: [
    {
      q: "Casey borrowed 5,000 USDC through Aave on a Saturday night with nobody approving it. What actually made the lending decision?",
      options: [
        "Aave's credit department, approving it quickly in the back office",
        "The Ethereum Foundation",
        "A piece of public smart-contract code that lends automatically whenever the collateral satisfies its rules",
        "Casey's bank",
      ],
      answer: 2,
      explain: "**The rules live in code.** If the collateral ratio and liquidity are sufficient, the contract executes. There's no loan officer and there are no business hours, which is exactly what defines DeFi.",
    },
    {
      q: "What does \"atomicity\" mean, and which DeFi-native tool does it make possible?",
      options: [
        "Transactions can be split into many small pieces; it enables high-frequency trading",
        "Every step in a transaction either all succeeds or is all reversed; it enables flash loans that are borrowed and repaid within one transaction",
        "On-chain assets can be divided into atom-sized pieces; it enables fractional ownership",
        "Transactions can be recalled at any time after submission; it enables on-chain customer service",
      ],
      answer: 1,
      explain: "**All or nothing.** A flash loan must be repaid within the same transaction or the whole transaction is void, so the lender bears no credit risk. That also makes it free capital for attackers who want to manipulate prices.",
    },
    {
      q: "Which traditional-finance function is DeFi currently worst at replacing?",
      options: [
        "Unsecured lending based on credit judgment",
        "Trading and settling assets",
        "Swapping one token for another",
        "Publishing the ledger in real time",
      ],
      answer: 0,
      explain: "DeFi doesn't know who the borrower is, so it can do almost nothing but **over-collateralized** lending. Judging creditworthiness, the core skill of a bank, is very hard to do on-chain.",
    },
    {
      q: "When KelpDAO's bridge was breached in April 2026, Aave ended up with large bad debt. Which DeFi property best explains that outcome?",
      options: [
        "Running 24/7",
        "Permissionless access",
        "Composability: one protocol's receipt token was accepted as collateral by another, so the risk traveled along the stack",
        "Transparency",
      ],
      answer: 2,
      explain: "**The flip side of money Legos.** Stolen rsETH was posted to Aave as collateral for loans. One brick cracked, the protocols built on it took the hit, and roughly $13 billion flowed out of DeFi in two days.",
    },
    {
      q: "As of September 2026, which statement about US crypto regulation is correct?",
      options: [
        "The GENIUS Act and the CLARITY Act are both law",
        "Neither bill has passed either chamber",
        "The CLARITY Act is law while the GENIUS Act is still pending",
        "The GENIUS stablecoin law was signed in July 2025; the CLARITY market-structure bill failed to get 60 votes in a Senate procedural vote in September 2026",
      ],
      answer: 3,
      explain: "The GENIUS Act was signed on July 18, 2025 (Stage 13.2 goes deeper). The CLARITY Act passed the House in July 2025, but a Senate cloture vote failed 49–50 on September 15, 2026.",
    },
  ],

  further: [
    { label: "Ethereum.org: Introduction to smart contracts", url: "https://ethereum.org/en/developers/docs/smart-contracts/" },
    { label: "Ethereum.org: What is DeFi?", url: "https://ethereum.org/en/defi/" },
    { label: "BIS Annual Economic Report 2022, Chapter III: The future monetary system (structural flaws of crypto and DeFi)", url: "https://www.bis.org/publ/arpdf/ar2022e3.htm" },
    { label: "DefiLlama: live TVL by protocol and chain", url: "https://defillama.com/" },
    { label: "Aave documentation: protocol overview and risk parameters", url: "https://aave.com/docs" },
  ],
};
