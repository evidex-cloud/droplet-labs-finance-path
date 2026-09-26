export default {
  id: "tokenized-treasuries",
  stage: 14,
  order: 2,
  title: "Tokenized Treasuries & Money Funds: The First Killer App",
  difficulty: "newfin",
  prereqs: ["tokenization-why", "repo-money-markets", "defi-yield"],

  oneLiner: `More than $300 billion of stablecoins sit on-chain earning their holders nothing, while short-term Treasury bills yielded about 4.24% in September 2026. A **tokenized Treasury fund** brings that price of time on-chain: an ordinary government money fund whose share register lives on a blockchain, so the shares can move 24/7, serve as collateral, and back stablecoins and DeFi protocols. From BlackRock's BUIDL launch in March 2024 to roughly $15–16 billion by mid-2026, it is the first tokenization use case that has clearly worked. This lesson opens the product up: its structure, its growth, its two big uses, and the liquidity mismatch hidden inside it.`,

  intuition: `
Start with some arithmetic. As of September 26, 2026, stablecoins outstanding totalled about **$312 billion** (Stage 13.2). Under the GENIUS Act, issuers **may not pay interest to holders**. At the same time, the 3-month US Treasury bill yielded about **4.24%**.

So if all $312 billion stayed in stablecoins, holders would be giving up interest on the order of **$13 billion a year**, and the issuers would keep it. For a trading firm, a crypto fund or a DAO treasury with $10 million of idle money on-chain, the missing interest comes to about **$424,000 a year**.

That is a hole in **Idea ①, the price of time**, on-chain. Traditional finance filled this hole long ago with the **money-market fund** (Stage 8.3): pool everyone's spare cash, buy T-bills and repo, accrue interest daily, redeem on demand. The problem is that a money-fund share lives in a transfer agent's database. You cannot send it to an exchange as margin at 2 a.m. on a Saturday, and you cannot drop it into a DeFi protocol as a reserve.

A **tokenized Treasury fund** joins the two worlds. It is an ordinary government money fund (or something structured like one) whose shares are recorded on a blockchain. Holders earn **the T-bill yield minus a management fee**, and the shares move on-chain like a stablecoin. In March 2024 BlackRock launched **BUIDL** on Ethereum, tokenized by Securitize. That launch is usually treated as the moment the category became real, and it is the "BlackRock's tokenized fund" in the headline from Stage 0.1.

How fast has it grown? By rwa.xyz's count, as reported in the press: about **$2 billion** in August 2024, **$4.2 billion** in March 2025, about **$8.9 billion** at the start of 2026, **$11 billion** in March 2026 and about **$15.9 billion** in July 2026, roughly 2.5 times in a year. Yet against the whole T-bill market, about $7.25 trillion, it is still only about **0.2%**.

This lesson also leans on **Idea ③, liquidity and trust**. Tokenized Treasuries are a killer app not merely because they pay interest, but because they are **collateral that earns a yield**. For the first time on-chain, the safest asset and the fastest pipe are the same object. In November 2025 Binance began accepting BUIDL as off-exchange collateral for institutional clients, and a growing number of stablecoins and DeFi protocols hold tokenized Treasuries in their reserves (this is the "tokenized T-bills" yield source from Stage 13.5).

It also inherits the money fund's oldest weakness: **the assets (T-bills) can only be sold on business days, while the shares can be transferred, and redemptions requested, around the clock**. The pipes got faster; the reservoir underneath did not. That risk closes the lesson.

**This lesson breaks into five parts:**

- **① Why Treasuries: bringing the risk-free rate on-chain**
- **② Anatomy of a tokenized money fund**
- **③ Growth and market structure: from BUIDL to a $15 billion market**
- **④ Use one: collateral that earns a yield**
- **⑤ Use two: the reserve layer for stablecoins and DeFi, and the liquidity mismatch**
`,

  mechanics: `
### ① Why Treasuries: bringing the risk-free rate on-chain

Stage 14.1 gave a test: the more standardized the asset, the more transparent its price, the simpler its legal structure and the stronger the need to move it quickly, the better it suits tokenization. Short-term Treasuries score top marks on every count:

- **Transparent pricing**: T-bills have public prices every day, and a money fund strikes its NAV daily, so there is little room for dispute.
- **Simple legal structure**: money funds are already mature, regulated products. Tokenization changes only how shares are registered.
- **Very low risk**: the credit is the US government. Rate risk is small too. A 3-month bill has a modified duration of about 0.25, so a one-point rise in yields knocks only about 0.25% off its price (compare the 30-year's modified duration of about 15.5 from Stage 4.4).
- **Real demand**: hundreds of billions of non-interest-bearing stablecoins, plus a great deal of trading activity that needs margin.

The last point is the one that matters. **Growth in tokenized Treasuries tracks the level of interest rates.** In the zero-rate years of 2020–21, idle stablecoins cost almost nothing to hold, and nobody was in a hurry to tokenize T-bills. Once the Fed started hiking in 2022 (Stage 9.1), the opportunity cost of idle on-chain money became very real. **The higher the price of time, the stronger the pull to bring it on-chain.** With the Fed hiking again to 3.75–4.00% in September 2026, that pull has not gone away.

It is also worth being precise about how this product differs from a stablecoin:

<table>
<tr><th></th><th>Stablecoin (e.g. USDC)</th><th>Tokenized Treasury fund (e.g. BUIDL)</th></tr>
<tr><td>Legal nature</td><td>Payment instrument; issuer liability governed by the GENIUS Act</td><td>Security: a fund share</td></tr>
<tr><td>Holder's return</td><td>Zero (interest is prohibited)</td><td>T-bill yield minus fees</td></tr>
<tr><td>Who can hold it</td><td>Nearly anyone</td><td>Usually only approved qualified investors or institutions</td></tr>
<tr><td>Main use</td><td>Payments, trade settlement</td><td>Parking cash, collateral, reserves</td></tr>
<tr><td>Assets behind it</td><td>Cash, T-bills of \\(\\le 93\\) days, repo</td><td>T-bills, Treasury repo, cash</td></tr>
</table>

**The assets are almost identical. The differences are who keeps the interest and who is allowed to hold the token.** A stablecoin is the on-chain checking account; a tokenized Treasury fund is the on-chain money-fund account.

### ② Anatomy of a tokenized money fund

Using BUIDL-style products as the template, a tokenized Treasury fund looks like this:

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">How a tokenized Treasury fund is built (schematic)</text><rect x="30" y="50" width="160" height="92" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="110" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--green)">Fund assets</text><text x="110" y="92" text-anchor="middle" font-size="11" fill="var(--ink)">US Treasury bills</text><text x="110" y="108" text-anchor="middle" font-size="11" fill="var(--ink)">Treasury repo · cash</text><text x="110" y="128" text-anchor="middle" font-size="10" fill="var(--muted)">Held by a custodian bank</text><rect x="240" y="50" width="160" height="92" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Fund manager</text><text x="320" y="92" text-anchor="middle" font-size="11" fill="var(--ink)">Invests, strikes NAV</text><text x="320" y="108" text-anchor="middle" font-size="11" fill="var(--ink)">Charges a fee</text><text x="320" y="128" text-anchor="middle" font-size="10" fill="var(--muted)">Audited periodically</text><rect x="450" y="50" width="160" height="92" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="530" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Transfer agent</text><text x="530" y="92" text-anchor="middle" font-size="11" fill="var(--ink)">Mints / burns tokens</text><text x="530" y="108" text-anchor="middle" font-size="11" fill="var(--ink)">Keeps the allowlist</text><text x="530" y="128" text-anchor="middle" font-size="10" fill="var(--muted)">On-chain record = register</text><line x1="190" y1="96" x2="240" y2="96" stroke="var(--line)" stroke-width="2"/><line x1="400" y1="96" x2="450" y2="96" stroke="var(--line)" stroke-width="2"/><rect x="190" y="180" width="260" height="50" rx="8" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2"/><text x="320" y="201" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Fund-share tokens (several chains)</text><text x="320" y="219" text-anchor="middle" font-size="10" fill="var(--muted)">Daily accrual · monthly payout or rising price</text><line x1="530" y1="142" x2="400" y2="180" stroke="var(--orange)" stroke-width="2"/><rect x="20" y="252" width="140" height="36" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="90" y="274" text-anchor="middle" font-size="11" fill="var(--ink)">Institutional wallets</text><rect x="175" y="252" width="140" height="36" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="245" y="274" text-anchor="middle" font-size="11" fill="var(--ink)">Exchange collateral</text><rect x="330" y="252" width="140" height="36" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="400" y="274" text-anchor="middle" font-size="11" fill="var(--ink)">Stablecoin / protocol reserves</text><rect x="485" y="252" width="140" height="36" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="555" y="274" text-anchor="middle" font-size="11" fill="var(--ink)">Redeem to stablecoin / USD</text><line x1="260" y1="230" x2="90" y2="252" stroke="var(--blue)" stroke-width="1.5"/><line x1="300" y1="230" x2="245" y2="252" stroke="var(--blue)" stroke-width="1.5"/><line x1="340" y1="230" x2="400" y2="252" stroke="var(--blue)" stroke-width="1.5"/><line x1="380" y1="230" x2="555" y2="252" stroke="var(--blue)" stroke-width="1.5"/></svg><figcaption>The top half is an ordinary government money fund (assets, manager, custodian, auditor). The only new piece is that the transfer agent keeps the share register on-chain. The bottom half shows where the tokens can go, which is where the value of tokenization lies.</figcaption></figure>

A handful of design choices give each product its character:

- **How the yield reaches you.** There are two common designs. In one, each token stays at about $1; interest accrues daily and is paid out periodically as **new tokens** (BUIDL works this way, and had paid more than $100 million in cumulative dividends by December 30, 2025). In the other, the token's price rises a little every day as interest accrues (an "accumulating" design): your token count stays the same and each token is worth more. The first behaves like a yield-bearing stablecoin; the second is simpler for accounting and for DeFi integrations.
- **Who can hold it.** Almost every major product requires holders to pass KYC and anti-money-laundering checks. The token contract carries an allowlist, and a transfer to an unapproved wallet simply fails. Many products have high minimums and are open only to qualified institutions.
- **How you get in and out.** Subscriptions and redemptions go through the fund itself, usually at NAV and settled in dollars or stablecoins. Some products add an "instant redemption" route, where a third party with a pool of stablecoins buys the tokens first and redeems them from the fund later.
- **Which chains it lives on.** BUIDL started on Ethereum and has since spread to Solana, Aptos, Arbitrum, Avalanche, Optimism, Polygon and BNB Chain. **More chains mean more users, and also more bridge and contract risk** (Stage 13.6).

### ③ Growth and market structure: from BUIDL to a $15 billion market

Total market size (rwa.xyz, as reported by the press):

<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Tokenized US Treasuries outstanding ($ billions, rwa.xyz via press reports)</text><line x1="50" y1="210" x2="610" y2="210" stroke="var(--line)" stroke-width="1.5"/><rect x="70" y="185" width="60" height="25" fill="var(--orange)" opacity=".55"/><text x="100" y="178" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">2.0</text><text x="100" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">Aug 2024</text><rect x="160" y="158" width="60" height="52" fill="var(--orange)" opacity=".65"/><text x="190" y="151" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">4.2</text><text x="190" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">Mar 2025</text><rect x="250" y="129" width="60" height="81" fill="var(--orange)" opacity=".72"/><text x="280" y="122" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">6.5</text><text x="280" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">Jul 2025</text><rect x="340" y="99" width="60" height="111" fill="var(--orange)" opacity=".8"/><text x="370" y="92" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">8.9</text><text x="370" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">Jan 2026</text><rect x="430" y="73" width="60" height="137" fill="var(--orange)" opacity=".88"/><text x="460" y="66" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">11.0</text><text x="460" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">Mar 2026</text><rect x="520" y="12" width="60" height="198" fill="var(--orange)"/><text x="550" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="var(--surface)">15.9</text><text x="550" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">Jul 2026</text><text x="320" y="252" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">About 2.5x in a year, yet only about 0.2% of the roughly $7.25 trillion T-bill market</text></svg><figcaption>Data points are CoinDesk, Cointelegraph and Yahoo citations of rwa.xyz. Part of the spring 2026 jump may reflect reclassification by the tracker, and no verified September 2026 figure is available. Check rwa.xyz for live numbers.</figcaption></figure>

The main products (mid-2026, rwa.xyz figures as cited in the press, all approximate):

<table>
<tr><th>Product</th><th>Issuer</th><th>Size (approx.)</th><th>Notes</th></tr>
<tr><td>USYC</td><td>Circle</td><td>$2.95B (Jul 2026)</td><td>Overtook BUIDL as the largest in March 2026; most of it sits on BNB Chain, tied to Binance collateral use</td></tr>
<tr><td>BUIDL</td><td>BlackRock / Securitize</td><td>$2.6B (Jul 2026)</td><td>Launched March 2024; market share down from a peak of about 46% to about 18%</td></tr>
<tr><td>BENJI (FOBXX)</td><td>Franklin Templeton</td><td>About $2.4B (2026; exact date unverified)</td><td>One of the first funds to keep its share register on a public chain</td></tr>
<tr><td>USDY</td><td>Ondo</td><td>$2.16B (Jul 2026)</td><td>A tokenized note backed by short-term Treasuries, aimed mainly at non-US investors</td></tr>
</table>

Two observations. First, **BUIDL's falling share does not mean BUIDL shrank; it means rivals arrived.** A market that moves from one dominant player to real competition is usually maturing. Second, **size follows use**. Most of USYC's balance sits on BNB Chain precisely because that is where it plugs into an exchange's collateral system. Demand for tokenized Treasuries does not come mainly from retail savers; it comes from **institutions that need collateral which earns a yield on-chain**. By chain, in July 2026, about $7.1 billion sat on Ethereum and about $4.6 billion on BNB Chain.

This lesson explains mechanisms and analytical frameworks only; it is not investment advice. Product terms, fees and eligibility are set by each fund's official documents.

### ④ Use one: collateral that earns a yield

Stage 8.3 showed that repo markets and margin systems are really **collateral chains**: who can borrow against what, at what haircut, and how quickly. Exchanges and brokers have always liked cash and Treasuries best as collateral. But moving Treasuries from one custody account to another runs over the Fedwire securities system, which operates only on business days.

Crypto markets trade 24/7, and margin calls arrive 24/7. Institutions used to have two options: **post stablecoins as margin** (always available, no yield) or **keep Treasuries in a traditional account** (yield, but frozen at weekends). Tokenized Treasuries offer a third: **yield and 24/7 mobility at once**.

Run the numbers. An institution has $50 million and needs $20 million of margin at an exchange.
- Post stablecoins: the $20 million earns nothing; the other $30 million sits in a Treasury fund earning about 4%, so annual interest is about \\(\\$30\\text{M} \\times 4\\% = \\$1.2\\text{M}\\).
- Post tokenized Treasuries: suppose the exchange applies a 2% haircut, so the firm must post about \\(\\dfrac{\\$20\\text{M}}{1 - 2\\%} \\approx \\$20.41\\text{M}\\) of tokens. But those tokens keep accruing interest, so all $50 million earns about 4%, roughly \\(\\$50\\text{M} \\times 4\\% = \\$2\\text{M}\\) a year.
- **The difference, about $800,000 a year, is exactly \\(\\$20\\text{M}\\ \\text{of margin} \\times 4\\%\\).** The collateral is no longer dead money.

The haircut exists because a tokenized Treasury's price is not perfectly fixed (rate risk is small but real) and redemption takes time, so the party accepting it wants a cushion. **The smaller the haircut and the more venues that accept the token, the more valuable it is as collateral.** That is why Binance accepting BUIDL as off-exchange collateral in November 2025 was big news: it turned a fund into a kind of on-chain margin currency.

### ⑤ Use two: the reserve layer for stablecoins and DeFi, and the liquidity mismatch

The second big use is **as reserves for other on-chain products**:

- **Stablecoin issuers.** Some issuers keep part of their reserves in tokenized Treasury funds, which satisfies the "hold short-term Treasuries" requirement while keeping the reserves movable on-chain. (The GENIUS Act allows government money-market funds as reserve assets; whether a particular tokenized product qualifies depends on implementing rules that were still being written in 2026.)
- **DeFi protocols.** Stage 13.2 noted that "decentralized" stablecoins absorbed large amounts of USDC and tokenized Treasuries into their reserves to hold their peg, and lending protocols have begun to accept tokenized Treasuries as collateral. Among the "real yield" sources in Stage 13.5, tokenized Treasuries are the cleanest: **the yield comes from interest paid by the US Treasury**, not from newly printed tokens.

Here lies the lesson's most important risk: **liquidity mismatch**. A tokenized fund share can be transferred, and a redemption requested, at 2 a.m. on a Saturday. The T-bills inside the fund can only be sold on business days and settled through traditional systems. Normally this does not matter: net redemptions are small and the fund's cash and overnight repo cover them. Now picture a weekend on which a protocol that relies heavily on tokenized Treasuries is hacked. (The KelpDAO exploit in April 2026 triggered about $13 billion of DeFi outflows in two days; see Stage 13.6.) Everyone wants to swap the tokens for stablecoins at once:

- The fund itself does not default. The assets are all there.
- But **instant-redemption facilities and secondary-market liquidity are finite**, so the tokens may trade below NAV over the weekend.
- The gap closes only on Monday, when the fund sells T-bills and pays out at NAV.

This is a mild version of the run logic from Stage 10.1: **the assets are good, but the speed at which they can be turned into cash is slower than the speed at which people want cash.** Tokenization can make a share liquid 24/7; it **cannot make a T-bill liquid 24/7**, unless a 24/7 source of cash stands underneath. Stage 14.4 generalizes this "liquidity illusion", and Stage 14.5 asks who is most likely to become that backstop: bank deposit tokens, stablecoins, or one day central-bank reserves. Further ahead, Stage 17.4 introduces Strategy's STRC, a different money-like instrument that adjusts its rate monthly to hold its price near $100. You will see that it competes for cash in the same waters as the products described here.
`,

  demo: "tokenized-treasuries",

  analogy: `
Picture a huge parking garage (the on-chain world) holding hundreds of billions of dollars' worth of cars (stablecoins). Parking is free, but the cars earn nothing, while the garage owner (the stablecoin issuer) takes the money behind those cars, puts it on deposit and keeps the interest.

A tokenized Treasury fund is like a new kind of **space in the garage that lays eggs**. Park your car there and it lays a small egg every day (the T-bill yield minus the fee). Better still, the parking ticket for that space can circulate around the garage: you can hand it to the racetrack next door (the exchange) as a deposit, and the deposit keeps laying eggs while it sits there.

The limits come from the same picture. The garage is open 24 hours, but the egg-laying part works by driving your car out of the garage and into **a bank outside that only opens on weekdays**. Normally people just swap tickets and nobody actually drives a car out, so everything runs smoothly. But if a fire breaks out on a Saturday night and everyone wants their car back at once, the tickets can change hands in seconds while the bank stays shut until Monday. **The speed of the ticket is not the speed of the garage door.**
`,

  misconceptions: [
    "**\"A tokenized Treasury fund is just a stablecoin that pays interest.\"** Legally they are different animals. A stablecoin is a payment instrument under the GENIUS Act: it cannot pay interest and almost anyone can hold it. A tokenized Treasury fund is a security, usually open only to approved qualified investors. The assets look alike; who gets the interest and who may hold the token do not.",
    "**\"Tokenized Treasuries are riskless because they hold US Treasuries.\"** Credit and rate risk are indeed low, but new risks come along: smart contracts and bridges, custody, allowlist and freeze powers, and the liquidity mismatch between shares that trade 24/7 and T-bills that sell only on business days.",
    "**\"BUIDL's share fell from about 46% to about 18%, so it must be shrinking.\"** At about $2.6 billion in July 2026, BUIDL had not shrunk; its share fell because Circle's USYC, Ondo, Franklin and others grew faster. Moving from one dominant player to many is a sign of a maturing market.",
    "**\"Tokenized Treasuries are already a major buyer in the Treasury market.\"** At roughly $15–16 billion they are about 0.2% of the roughly $7.25 trillion T-bill stock. The big on-chain buyers of Treasuries are the stablecoin issuers, with about $312 billion outstanding.",
    "**\"Lower rates make tokenized Treasuries more attractive, because they feel safer.\"** The reverse is true. Their appeal comes from the opportunity cost of idle on-chain dollars, and that cost rises with rates. In the zero-rate years nobody rushed to put Treasuries on-chain.",
  ],

  quiz: [
    {
      q: "A DAO keeps $10 million of spare cash in stablecoins. With short-term Treasuries yielding about 4.24% and a tokenized Treasury fund charging 0.15% a year, roughly how much more interest would it earn in a year by holding the fund instead?",
      options: ["About $424,000", "About $15,000", "About $409,000", "Nothing, because stablecoins pay interest too"],
      answer: 2,
      explain: "**\\(\\$10\\text{M} \\times (4.24\\% - 0.15\\%) \\approx \\$409{,}000\\).** Stablecoin holders earn zero (the GENIUS Act bans interest), so the gap equals the fund's net yield. Before fees it would be about $424,000.",
    },
    {
      q: "An institution has $50 million and must post $20 million of margin at an exchange. Compared with posting stablecoins, how much more does it earn per year by posting tokenized Treasuries yielding about 4%?",
      options: ["About $2 million", "About $800,000", "About $1.2 million", "About $40,000"],
      answer: 1,
      explain: "Posted stablecoins earn nothing; posted tokenized Treasuries keep accruing. The gap is roughly **\\(\\$20\\text{M} \\times 4\\% = \\$800{,}000\\) a year.** The haircut changes how many tokens must be posted, not the fact that those tokens keep earning.",
    },
    {
      q: "Why is there a liquidity mismatch inside a tokenized Treasury fund?",
      options: ["Because T-bills carry high credit risk", "Because fund shares can only be transferred on business days", "Because shares can be transferred and redemptions requested 24/7, while the T-bills the fund holds can only be sold and settled on business days", "Because tokenized funds hold no cash"],
      answer: 2,
      explain: "**The pipes got faster; the reservoir did not.** Normally net redemptions are small and cash plus overnight repo covers them. In a weekend rush, instant-redemption capacity and secondary liquidity are finite, so tokens may trade below NAV until the fund sells T-bills on Monday.",
    },
    {
      q: "A 3-month T-bill has a modified duration of about 0.25. If yields jump by one percentage point, roughly how much does the NAV of a fund holding such bills change?",
      options: ["About −0.25%", "About −15.5%", "About −2.5%", "About +1%"],
      answer: 0,
      explain: "\\(\\text{price change} \\approx -\\text{modified duration} \\times \\text{change in yield} = -0.25 \\times 1\\% \\approx\\) **\\(-0.25\\%\\)** (Stage 4.4). That is why short bills make good collateral. The 30-year, with a modified duration of about 15.5, would fall about 14% on the same shock.",
    },
    {
      q: "Which explanation best fits the fact that most of Circle's USYC balance in 2026 sat on BNB Chain?",
      options: ["Treasury yields are higher on BNB Chain", "BNB Chain connects to an exchange's collateral system, and demand comes from institutions that need yield-bearing collateral", "BNB Chain does not require KYC", "Circle is not allowed to issue on Ethereum"],
      answer: 1,
      explain: "**Size follows use.** Demand for tokenized Treasuries comes mainly from institutions that need collateral which earns a yield, so balances migrate to the chain that connects to a large collateral system. The Treasury yield is the same on every chain.",
    },
  ],

  further: [
    { label: "RWA Path (sister course: tokenized funds, custody and legal structures in depth)", url: "https://evidex-cloud.github.io/droplet-labs-rwa-path/" },
    { label: "rwa.xyz tokenized Treasuries dashboard (live size and product shares)", url: "https://app.rwa.xyz/treasuries" },
    { label: "CoinDesk: Circle overtakes BlackRock as tokenized Treasuries hit a record $11 billion (March 2026)", url: "https://www.coindesk.com/markets/2026/03/13/circle-overtakes-blackrock-in-tokenized-treasuries-as-market-hits-record-usd11-billion" },
    { label: "CoinDesk: Binance lists BUIDL as institutional off-exchange collateral (November 2025)", url: "https://www.coindesk.com/business/2025/11/14/blackrock-s-usd2-5b-tokenized-fund-gets-listed-as-collateral-on-binance-expands-to-bnb-chain" },
    { label: "GENIUS Act, full text (reserve assets and the ban on paying interest)", url: "https://www.congress.gov/bill/119th-congress/senate-bill/1582/text" },
  ],
};
