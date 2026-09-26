export default {
  id: "convergence",
  stage: 14,
  order: 5,
  title: "The Great Convergence: Banks, Stablecoins, Deposit Tokens & the New Plumbing",
  difficulty: "newfin",
  prereqs: ["tokenized-treasuries", "tokenization-limits", "stablecoins", "banks-create-money"],

  oneLiner: `"On-chain dollars" are splitting into quite different things: **bank deposit tokens** (a bank's liability, which can fund loans and pay interest), **stablecoins** (fully reserved, non-interest-bearing "narrow bank" liabilities under the GENIUS Act) and **tokenized money funds** (securities that pay the T-bill yield). In the US, meanwhile, a retail central bank digital currency is banned by law until the end of 2030. These instruments are converging on the same networks and competing for the same dollars. This lesson places them on the money pyramid of Stage 1.1 using balance sheets, works through what happens across the system when a dollar moves from a bank into a stablecoin, and draws the full map of the new plumbing. It closes Stages 12–14 and is the threshold to the digital asset treasury companies that follow.`,

  intuition: `
Stage 1.1 introduced a "money pyramid". At the top sit **central bank reserves**, which only banks can hold. Below them are **bank deposits**, the money in your account, which are the bank's liability. Below those come **money-market fund shares and stablecoins**. The higher up, the more money-like and the safer; the lower down, the more each layer leans on the credit of the one above.

Across Stages 12 to 14 you have watched new things sprout on the lower levels of that pyramid: stablecoins (Stage 13.2), tokenized Treasury funds (Stage 14.2), tokenized stocks (Stage 14.3). This lesson asks the big question: **with all of this running on blockchains, where are the traditional banks, and what does the system's plumbing now look like?**

The answer is that **the pieces are converging**. Banks have not been bypassed; they have started moving their own deposits on-chain, as **deposit tokens**. JPMorgan's blockchain unit, renamed from Onyx to Kinexys in November 2024, reportedly launched a deposit token called JPMD on Coinbase's Base network in 2025 (this course could not verify every detail, so treat it as reported). Meanwhile stablecoin issuers have become regulated narrow banks under the GENIUS Act, asset managers' tokenized money funds have become on-chain collateral, and exchanges, DeFi protocols and even AI agents (Stage 19.4) are settling in these tokens.

The lesson rests on **Idea ③, liquidity and trust (the plumbing)**, and cannot do without **Idea ②, balance sheets and claims**. All four kinds of on-chain dollar look like "$1". The differences lie entirely in **whose balance sheet it sits on, which assets stand behind it, and who steps in when something goes wrong**:

- A deposit token is **a bank's liability**, backed by the bank's loans and reserves and covered by bank regulation and deposit-insurance rules.
- A stablecoin is **the issuer's liability**, which must be backed one for one by cash and short-term Treasuries and may not pay interest.
- A tokenized money fund is **a security**: you own a proportional slice of the Treasury portfolio itself.
- A central bank digital currency (CBDC) would be **the central bank's liability**. But in July 2026 the US enacted a ban on the Fed issuing a retail CBDC through December 31, 2030.

The competition among them is **a fight over deposits**. Swap $10,000 of bank deposits for a stablecoin and the bank has $10,000 less in deposits, while the issuer uses the money to buy T-bills. What does that mean for bank lending, for the Treasury market, for interest rates? This is the tug-of-war behind the GENIUS Act's ban on stablecoin interest, and behind the fate of the CLARITY Act, which failed a Senate cloture vote 49–50 on September 15, 2026.

By the end of this lesson you will hold a complete map of the new plumbing. Before entering the course's focus, digital asset treasury companies (Stage 15.1), the map tells you this: **bitcoin, stablecoins, tokenized securities and traditional banks are already connected within one network.** The preferred stock and convertibles that DATs issue are priced and traded inside exactly this plumbing.

**This lesson breaks into five parts:**

- **① Four kinds of on-chain dollar: whose liability, backed by what**
- **② Deposit tokens: banks put deposits on-chain**
- **③ Stablecoins versus banks: what happens when a dollar moves**
- **④ Tokenized collateral enters the core plumbing: who is the 24/7 lender of last resort?**
- **⑤ The full map of the new plumbing: from central bank reserves to AI agents**
`,

  mechanics: `
### ① Four kinds of on-chain dollar: whose liability, backed by what

<table>
<tr><th></th><th>Deposit token</th><th>Stablecoin (GENIUS Act)</th><th>Tokenized money fund</th><th>Retail CBDC</th></tr>
<tr><td>Whose liability / what it is</td><td>A commercial bank's liability (it is a deposit)</td><td>The issuer's liability</td><td>A security: fund shares</td><td>The central bank's liability</td></tr>
<tr><td>Assets behind it</td><td>The bank's loans, securities, reserves (fractional)</td><td>1:1 cash, T-bills of 93 days or less, overnight repo, government money funds</td><td>A portfolio of T-bills and repo</td><td>Central bank assets</td></tr>
<tr><td>Can it pay interest?</td><td>Yes</td><td>No</td><td>T-bill yield minus fees</td><td>Depends on design</td></tr>
<tr><td>Who can hold it</td><td>Usually only that bank's clients</td><td>Almost anyone (can be frozen)</td><td>Mostly qualified institutions</td><td>The public</td></tr>
<tr><td>Protection if things go wrong</td><td>Bank supervision, capital rules, deposit-insurance rules</td><td>Segregated reserves; holders rank first in insolvency</td><td>Fund assets belong to holders</td><td>The state's credit</td></tr>
<tr><td>US status (Sept 2026)</td><td>Big-bank pilots and institutional products (reported)</td><td>Law passed, rules being written</td><td>About $15–16 billion (mid-year)</td><td>Banned until end-2030</td></tr>
</table>

The first row matters most. **Each of the four shows "$1", but each sits at a different level of the money pyramid.** A deposit token is a deposit and sits at the bank level. Stablecoins and tokenized money funds sit one level down, depending on the Treasuries and bank deposits they hold. A CBDC would sit at the very top, which is one reason it is politically contested in the US: critics fear it would let the government see and control everyone's money directly.

Two details deserve a second look:

- **Stablecoin reserves can be bank deposits.** The GENIUS Act counts insured deposits as eligible reserves, so stablecoins are not fully independent of banks; part of their reserves sits in banks. When USDC briefly lost its peg in March 2023 because about $3.3 billion of its reserves was at Silicon Valley Bank (Stage 13.2), that was the price of this link.
- **Deposit tokens keep the bank's magic, and its risk.** Stage 1.2 showed that bank loans create deposits and that banks hold only fractional reserves. Deposit tokens carry that mechanism forward: banks can keep lending against them and paying interest on them, but they are not backed 100% by cash and Treasuries.

### ② Deposit tokens: banks put deposits on-chain

The logic of a deposit token is simple: **if customers want dollars that move 24/7, are programmable and settle on-chain, why shouldn't those dollars be bank deposits?**

For a bank this offers three advantages:

- **Keeping deposits.** Deposits are a bank's cheapest and most stable funding. If customers swap deposits for stablecoins to get on-chain dollars, the bank loses that funding (part ③ runs the numbers). Deposit tokens let customers go on-chain without leaving the bank.
- **Paying interest.** Stablecoins cannot pay interest; deposit tokens can. With rates around 4%, that is a real competitive edge.
- **Working within existing rules.** A deposit token is a deposit, so existing banking law, capital requirements and deposit-insurance rules apply. No new statute is needed.

Reportedly, JPMorgan's Kinexys network processes more than $2 billion a day, and JPMD moved in 2025 from pilot to a broader launch for institutional clients; Citi, HSBC and others offer similar tokenized-deposit services; and Project Agorá, led by the Bank for International Settlements with several central banks and more than forty financial firms, is testing tokenized central bank money and commercial bank money on a single unified ledger. **None of these items could be verified for this course; treat them as background and check official sources for figures.**

The limitation of a deposit token is just as clear: **it is first and foremost one bank's liability**. Bank A's deposit tokens and Bank B's deposit tokens are not naturally interchangeable. In the traditional system that exchange is settled in central bank reserves. For deposit tokens to move everywhere, banks need an underlying layer where they can settle with each other in central bank money 24/7, which is exactly the problem projects like Agorá aim to solve. Until then, **the stablecoin's advantage is precisely that it belongs to no bank** and circulates directly between any wallets.

### ③ Stablecoins versus banks: what happens when a dollar moves

Use the T-accounts of Stage 1.2 to follow what happens when Zhou swaps $10,000 of deposits at Bank A for a stablecoin:

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">$10,000 moves from bank deposits into a stablecoin: three T-accounts</text><text x="110" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="var(--blue)">Bank A</text><line x1="30" y1="60" x2="190" y2="60" stroke="var(--line)" stroke-width="1.5"/><line x1="110" y1="60" x2="110" y2="150" stroke="var(--line)" stroke-width="1.5"/><text x="70" y="78" text-anchor="middle" font-size="10" fill="var(--muted)">Assets</text><text x="150" y="78" text-anchor="middle" font-size="10" fill="var(--muted)">Liabilities</text><text x="70" y="102" text-anchor="middle" font-size="11" fill="var(--red)">Reserves −10k</text><text x="150" y="102" text-anchor="middle" font-size="11" fill="var(--red)">Zhou's deposit −10k</text><text x="110" y="140" text-anchor="middle" font-size="10" fill="var(--muted)">Less liquidity; may have to shrink lending</text><text x="320" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Stablecoin issuer</text><line x1="240" y1="60" x2="400" y2="60" stroke="var(--line)" stroke-width="1.5"/><line x1="320" y1="60" x2="320" y2="150" stroke="var(--line)" stroke-width="1.5"/><text x="280" y="78" text-anchor="middle" font-size="10" fill="var(--muted)">Assets</text><text x="360" y="78" text-anchor="middle" font-size="10" fill="var(--muted)">Liabilities</text><text x="280" y="102" text-anchor="middle" font-size="11" fill="var(--green)">T-bills +8.5k</text><text x="280" y="120" text-anchor="middle" font-size="11" fill="var(--green)">Bank deposits +1.5k</text><text x="360" y="102" text-anchor="middle" font-size="11" fill="var(--green)">Stablecoins +10k</text><text x="320" y="140" text-anchor="middle" font-size="10" fill="var(--muted)">Holder earns 0; issuer keeps interest</text><text x="530" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="var(--green)">Who sold the T-bills?</text><line x1="450" y1="60" x2="610" y2="60" stroke="var(--line)" stroke-width="1.5"/><text x="530" y="84" text-anchor="middle" font-size="10" fill="var(--ink)">Another bank's customer → deposit moves banks</text><text x="530" y="102" text-anchor="middle" font-size="10" fill="var(--ink)">Total bank deposits roughly unchanged</text><text x="530" y="126" text-anchor="middle" font-size="10" fill="var(--ink)">New Treasury issuance / Fed reverse repo</text><text x="530" y="144" text-anchor="middle" font-size="10" fill="var(--ink)">→ deposits and reserves leave the banks</text><line x1="190" y1="102" x2="240" y2="102" stroke="var(--orange)" stroke-width="2"/><polygon points="240,97 250,102 240,107" fill="var(--orange)"/><line x1="400" y1="102" x2="450" y2="102" stroke="var(--orange)" stroke-width="2"/><polygon points="450,97 460,102 450,107" fill="var(--orange)"/><rect x="60" y="180" width="520" height="92" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="204" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Three conclusions</text><text x="320" y="226" text-anchor="middle" font-size="11" fill="var(--ink)">① Bank A is always hurt: it loses deposits and an equal amount of reserves</text><text x="320" y="245" text-anchor="middle" font-size="11" fill="var(--ink)">② Whether the whole banking system loses funding depends on who sold the T-bills</text><text x="320" y="264" text-anchor="middle" font-size="11" fill="var(--ink)">③ Demand for T-bills does rise, but mostly by substitution, not out of thin air</text></svg><figcaption>The reserve mix (85% T-bills, 15% bank deposits) is illustrative. How stablecoin growth affects banks depends on where the money comes from and whom the T-bills are bought from, which is exactly what the debate is about.</figcaption></figure>

This picture explains why both sides of the debate have a point:

- **Standard Chartered (February 2026)** argued that if stablecoins head toward $2 trillion they will become a huge new buyer of T-bills, and the Treasury may respond by issuing more bills (the "issue short, hold down the long end" debate of Stage 3.3 and Stage 4.5).
- **Research from the Kansas City Fed** counters that stablecoins raise demand for Treasuries **only by reducing demand for other assets, such as bank deposits**. The money has simply moved.

The two views do not contradict each other: **demand for T-bills really does rise, but part of the cost is lost bank deposits.** That is why the GENIUS Act bans stablecoin interest. A stablecoin that was available 24/7 and paid around 4% would drain deposits much faster, squeezing banks' ability to lend (the "loans create deposits" process of Stage 1.2). Interest was also reportedly one of the most sensitive issues in the 2026 CLARITY Act negotiations: banks wanted to close the door on stablecoins paying yield indirectly through trading platforms, while the crypto industry resisted. As of September 2026 that tug-of-war is unresolved. The GENIUS Act itself takes effect on the earlier of January 18, 2027 or 120 days after final rules, and the OCC is aiming to finish its rules in November 2026.

### ④ Tokenized collateral enters the core plumbing: who is the 24/7 lender of last resort?

Stage 14.2 ended with a question. Tokenized money-fund shares move 24/7, but the underlying T-bills can be sold only on business days. **When someone needs cash at 3 a.m. on a Sunday, who provides it?**

In the traditional system the answer runs in layers: first the repo market (Stage 8.3), then the interbank market, and finally the **central bank**, the lender of last resort of Stage 1.3. All of them work business days. Tokenization is making three things happen at once:

- **Collateral has become fast.** Binance accepts BUIDL as off-exchange collateral (November 2025); DTC's tokenization pilot includes Treasuries (Stage 14.3); more and more venues accept yield-bearing tokenized collateral.
- **The settlement asset has not caught up.** The most widely used on-chain settlement asset is still the stablecoin, and stablecoins rest on T-bills and bank deposits. **At 3 a.m. on a Sunday, the assets behind them are closed too.**
- **The lender of last resort is not on-chain.** No central bank lends to on-chain protocols in the small hours of a Sunday.

So the new plumbing has a structural gap: **the front end runs 24/7 while the back end runs business hours.** Normally private liquidity fills the gap: market makers, instant-redemption facilities, the cash portion of stablecoin reserves. Under stress it shows up as discounts, redemption queues or de-pegs. Deposit tokens and "unified ledger" experiments such as Agorá are, at bottom, attempts to **connect the deepest foundation, central bank money, to the 24/7 network as well**. Until that happens, the more successful tokenization becomes, the more attention this gap deserves.

Traditional finance, meanwhile, is bringing crypto onto its own balance sheets. In January 2025 the SEC rescinded the accounting guidance (SAB 121) that had required custodians to record crypto assets held for clients as liabilities, removing an obstacle to bank crypto custody; and spot bitcoin ETFs (Stage 12.5) have already put bitcoin into traditional brokerage accounts. **The convergence runs both ways: the on-chain world borrows the banks' credit, and the banks move into the on-chain world.**

### ⑤ The full map of the new plumbing: from central bank reserves to AI agents

Put Stages 12–14 together into one picture:

<figure><svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The new financial plumbing: a layered map (September 2026)</text><rect x="40" y="36" width="560" height="40" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="54" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Layer 1 · Central bank money (reserves)</text><text x="320" y="69" text-anchor="middle" font-size="10" fill="var(--muted)">Business days only · US retail CBDC banned until end-2030 · unified ledgers still experimental</text><rect x="40" y="86" width="270" height="48" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="175" y="106" text-anchor="middle" font-size="12" font-weight="700" fill="var(--blue)">Layer 2 · Bank deposits</text><text x="175" y="123" text-anchor="middle" font-size="10" fill="var(--muted)">Deposit tokens (institutional products, reported)</text><rect x="330" y="86" width="270" height="48" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="465" y="106" text-anchor="middle" font-size="12" font-weight="700" fill="var(--green)">Layer 2 · T-bills and repo</text><text x="465" y="123" text-anchor="middle" font-size="10" fill="var(--muted)">About $7.25T of bills · the anchor of global collateral</text><rect x="40" y="146" width="270" height="48" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="175" y="166" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Layer 3 · Stablecoins</text><text x="175" y="183" text-anchor="middle" font-size="10" fill="var(--muted)">About $312B · no interest · GENIUS Act</text><rect x="330" y="146" width="270" height="48" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="465" y="166" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Layer 3 · Tokenized funds and securities</text><text x="465" y="183" text-anchor="middle" font-size="10" fill="var(--muted)">Treasuries ~$15–16B · RWAs ~$34.7B (Aug)</text><rect x="40" y="206" width="560" height="48" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="320" y="226" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Layer 4 · On-chain markets and trading venues</text><text x="320" y="243" text-anchor="middle" font-size="10" fill="var(--muted)">Bitcoin · DeFi lending and AMMs · exchange margin · tokenized-stock venues · investors in DAT securities</text><rect x="40" y="266" width="560" height="40" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="284" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Layer 5 · End users</text><text x="320" y="299" text-anchor="middle" font-size="10" fill="var(--muted)">Households · companies and treasuries · funds · AI agents (Stage 19.4)</text><line x1="175" y1="76" x2="175" y2="86" stroke="var(--ink)" stroke-width="1.5"/><line x1="465" y1="76" x2="465" y2="86" stroke="var(--ink)" stroke-width="1.5"/><line x1="175" y1="134" x2="175" y2="146" stroke="var(--ink)" stroke-width="1.5"/><line x1="465" y1="134" x2="465" y2="146" stroke="var(--ink)" stroke-width="1.5"/><line x1="310" y1="120" x2="330" y2="160" stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 2"/><line x1="330" y1="120" x2="310" y2="160" stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 2"/><line x1="175" y1="194" x2="175" y2="206" stroke="var(--ink)" stroke-width="1.5"/><line x1="465" y1="194" x2="465" y2="206" stroke="var(--ink)" stroke-width="1.5"/><line x1="320" y1="254" x2="320" y2="266" stroke="var(--ink)" stroke-width="1.5"/></svg><figcaption>The higher the layer, the more money-like it is and the more it depends on institutions that keep business hours; the lower the layer, the more it runs 24/7 and the more it leans on the credit of the layer above. The dashed cross shows that stablecoin reserves hold both T-bills and bank deposits, and tokenized funds hold some cash too.</figcaption></figure>

Three things to take from the map:

- **Every layer stands on the shoulders of the one above.** A stablecoin's "$1" rests on T-bills and bank deposits; a tokenized fund rests on T-bills; everything on-chain ultimately traces back to layers 1 and 2. **Blockchains change the pipes, not the foundations.**
- **The speed gap sits between layers 2 and 3.** From layer 3 down things run 24/7; from layer 2 up they run business hours (the gap of part ④).
- **The course's main characters stand on layer 4.** A digital asset treasury company holds bitcoin (a layer-4 asset) but raises money in traditional capital markets through preferred stock and convertibles, whose buyers compare yields across layers 2 and 3. Stage 17.4 shows how a monthly-reset preferred like STRC competes for cash with money funds, T-bills and stablecoin yields, and Stage 20.2 puts this map into different macro regimes to see how each layer behaves through hikes, cuts and crises.

You can now explain the second headline from Stage 0.1, "BlackRock's tokenized fund, stablecoins and DeFi are rewriting the plumbing of finance", in full. **What is being rewritten is the speed and connectivity of layers 3 and 4; the foundations are still Treasuries and banks; and the biggest open question is when, and how, the foundations will be wired into the 24/7 network too.** On the next level we reach the heart of the course: companies that hold bitcoin on their balance sheets and finance it with traditional financial instruments (Stage 15.1).
`,

  demo: "convergence",

  analogy: `
Think of the financial system as a city's **water supply**.

Furthest upstream is the **reservoir** (central bank reserves), which only the water company (the banks) can draw from directly. The water company pipes water into every home (bank deposits). Later, someone installs a network of **24-hour vending machines** (stablecoins): put money in and out comes a jug of water, usable anytime, anywhere, though the machines are in fact fed from the city mains and a big water tower (Treasury bills). Someone else opens **storage tanks that pay interest** (tokenized money funds): the water you store grows a little every day.

Now the water company is getting restless. If people love the vending machines' convenience, why not turn its own pipes into smart pipes that work anytime, anywhere and can be programmed (deposit tokens)? So the city ends up with several kinds of water. They all look alike, jug after jug, but they come from different places: some straight from the water company's mains, some from the tower behind the vending machines, some from the storage tanks.

The city's new problem is that **the vending machines and smart pipes run 24 hours a day, but the reservoir's sluice gates open only on weekday daytimes.** Usually nobody notices. But if one neighborhood suddenly draws huge amounts of water on a weekend, the machines run dry and everyone waits for Monday, when the reservoir opens. What the city is now attempting is to **make the reservoir's gates controllable around the clock**. Until then, the faster the pipes, the more important it is to remember where the water ultimately comes from.
`,

  misconceptions: [
    "**\"Stablecoins and deposit tokens are the same thing: dollars on a blockchain.\"** A deposit token is a bank deposit, a commercial bank's liability backed by fractionally reserved loans and securities, and it can pay interest. A stablecoin is the issuer's liability, which the GENIUS Act requires to be backed 1:1 by cash and short-term Treasuries, and it may not pay interest. They sit at different levels of the money pyramid.",
    "**\"Stablecoin growth will bring a large amount of brand-new demand into the Treasury market.\"** Demand for T-bills does rise, but largely by substitution: money moves out of bank deposits or other assets into stablecoin reserves. Kansas City Fed research stresses that this demand comes at the expense of demand for other assets.",
    "**\"With blockchains, we no longer need central banks or commercial banks.\"** Every layer of on-chain dollars stands on the credit of the layer above: stablecoins on T-bills and bank deposits, tokenized funds on T-bills. Blockchains change the speed and connectivity of the pipes, not the foundations.",
    "**\"The US will soon launch a central bank digital currency.\"** In July 2026 the US enacted a ban on the Fed issuing a retail CBDC through December 31, 2030. The US route to on-chain dollars runs through private stablecoins and bank deposit tokens.",
    "**\"Tokenization has made the whole financial system 24/7.\"** The front end (stablecoins, tokenized securities, trading venues) runs 24/7; the back end (T-bill settlement, interbank clearing, the central bank as lender of last resort) still largely keeps business hours. That speed gap is the new plumbing's most important structural weakness.",
  ],

  quiz: [
    {
      q: "Zhou swaps $10,000 of deposits at Bank A for a stablecoin, and the issuer uses the money to buy T-bills at a new Treasury auction. Which description of Bank A and the banking system is most accurate?",
      options: ["Neither Bank A nor the banking system is affected", "Bank A loses deposits and reserves; because the money flows to the Treasury's account, deposits and reserves in the banking system fall too", "Bank A's deposits increase", "Only the stablecoin issuer's liabilities fall"],
      answer: 1,
      explain: "Bank A always loses $10,000 of deposits and an equal amount of reserves. If the T-bills come from **new Treasury issuance**, the money goes into the Treasury's account at the Fed and **leaves the banking system** until the Treasury spends it. If the seller were another bank's customer, the deposit would simply change banks and the system total would barely move.",
    },
    {
      q: "Why does the GENIUS Act's ban on stablecoin interest matter so much to banks?",
      options: ["Because stablecoin reserves earn no interest", "Because paying interest would stop stablecoins moving 24/7", "Because paying interest would breach anti-money-laundering rules", "Because a stablecoin that ran 24/7 and paid around 4% would speed up deposit outflows, squeezing banks' funding and lending capacity"],
      answer: 3,
      explain: "Deposits are banks' cheapest and most stable funding. If stablecoins were both convenient and interest-bearing, deposits would leave faster, weakening the loans-create-deposits machine (Stage 1.2). This was reportedly also one of the most sensitive issues in the CLARITY Act negotiations.",
    },
    {
      q: "What is the deposit token's main competitive advantage over a stablecoin?",
      options: ["It can pay interest and stays inside the existing bank regulatory framework", "It is a central bank liability", "It is unregulated", "It is backed 100% by T-bills"],
      answer: 0,
      explain: "A deposit token **is a deposit**: the bank can pay interest on it and keep lending against it, and existing banking law and deposit-insurance rules apply. The cost is that it is first of all one bank's liability, and swapping between banks needs settlement in central bank money.",
    },
    {
      q: "Under stress, how is the gap between a 24/7 front end and a business-hours back end most likely to show up?",
      options: ["T-bill yields drop to zero at weekends", "Tokens trade at weekend discounts, redemptions queue, or stablecoins briefly de-peg", "Bitcoin stops producing blocks", "Bank deposits automatically turn into stablecoins at weekends"],
      answer: 1,
      explain: "Normally private liquidity (market makers, instant-redemption facilities, cash in reserves) fills the gap. Under stress, because back-end assets can only be turned into cash on business days, the gap appears as **discounts, queues or de-pegs** (the weekend rush of Stage 14.2).",
    },
    {
      q: "As of September 2026, what is the status of a US retail central bank digital currency?",
      options: ["A pilot is live", "Congress is considering it, with issuance expected in 2027", "A law bans the Fed from issuing one through December 31, 2030", "The GENIUS Act authorizes its issuance"],
      answer: 2,
      explain: "In July 2026 a provision banning a Fed retail CBDC through December 31, 2030 became law as part of a housing bill. The US route to on-chain dollars is stablecoins (GENIUS Act) and bank deposit tokens.",
    },
  ],

  further: [
    { label: "Kansas City Fed: stablecoins could increase Treasury demand, but only by reducing demand for other assets", url: "https://www.kansascityfed.org/research/economic-bulletin/stablecoins-could-increase-treasury-demand-but-only-by-reducing-demand-for-other-assets/" },
    { label: "BIS Annual Economic Report 2023, chapter III: Blueprint for the future monetary system (unified ledgers, tokenized deposits, central bank money)", url: "https://www.bis.org/publ/arpdf/ar2023e3.htm" },
    { label: "GENIUS Act, full text (reserves, the interest ban, priority in insolvency)", url: "https://www.congress.gov/bill/119th-congress/senate-bill/1582/text" },
    { label: "CoinDesk: Standard Chartered says the Treasury may boost bill issuance as stablecoins eye $2 trillion (February 2026)", url: "https://www.coindesk.com/business/2026/02/23/u-s-treasury-may-boost-t-bill-issuance-as-stablecoins-eye-usd2-trillion-market-cap-stanchart" },
    { label: "RWA Path (sister course: tokenized deposits, stablecoins and on-chain settlement in depth)", url: "https://evidex-cloud.github.io/droplet-labs-rwa-path/" },
  ],
};
