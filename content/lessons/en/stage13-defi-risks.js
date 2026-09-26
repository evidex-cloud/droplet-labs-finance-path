export default {
  id: "defi-risks",
  stage: 13,
  order: 6,
  title: "DeFi's Risks: Contract Bugs, Oracles, Governance & Depegs",
  difficulty: "newfin",
  prereqs: ["defi-lending", "defi-yield", "crypto-crises"],

  oneLiner:
    "Stage 13.1 said that DeFi doesn't eliminate trust; it moves trust to code, oracles, governance and collateral. This lesson takes those new trust points one at a time and shows how each fails: **code bugs** (one wrong line can be worth nine figures), **oracle manipulation** (feeding a contract the wrong price), **governance and admin powers** (who can change the rules), **bridges** (DeFi's biggest single points of failure), and **depegs and regulation**. Then it packs them into a framework you can score: multiply the failure odds of each layer to get your position's true survival rate. **Risks stack, and composability chains them together.**",

  intuition: `
On November 3, 2025, Balancer V2, a protocol that had run for years, had been audited several times and was treated as core DeFi infrastructure, lost about $128 million to an attacker because of a **rounding error**. No private key was stolen and no insider went rogue. A tiny detail in the code rounded the wrong way during a calculation, and the attacker amplified it over and over with a swarm of small trades.

That one incident captures almost every feature of DeFi risk:

- **The code is public.** Anyone can read it, attackers included, and they only need to find one bug before all the defenders do.
- **Execution is automatic.** Once a bug is triggered, the contract "faithfully" sends the money out. No risk department can hit pause, unless a pause switch was designed in advance, which is a different kind of trust.
- **Settlement is instant and irreversible.** Within minutes the funds may have crossed chains, passed through mixers and scattered across hundreds of addresses.
- **Depositors bear the loss.** There's no deposit insurance and no central bank.

Recall the crypto crises of Stage 10.5. Mt. Gox, FTX and Celsius failed at root through **custody and fraud**: someone took customers' money. DeFi fails differently. There's no "boss runs off with the cash," but **code, prices, governance and cross-chain plumbing get broken**. The 2025–2026 list is long:

- May 2025: Cetus on the Sui chain was exploited for about $223 million.
- April 1, 2026: Drift on Solana lost about $285 million.
- April 18–19, 2026: KelpDAO's bridge was breached for about $292 million. It was 2026's largest DeFi exploit and was reportedly linked to North Korea's Lazarus hacking group.
- September 7, 2026: Liquid Network lost about $320 million.

Centralized platforms were hit over the same period. On February 21, 2025, the exchange Bybit lost about $1.5 billion, the largest crypto theft ever, which the FBI attributed to North Korea. In late September 2026, Bitget reported a loss of roughly $350 million that it suspects was the work of North Korean hackers.

This lesson rests on **Idea ③ Liquidity & trust**, because every DeFi risk is some trust point snapping. It also rests on **Idea ④ Risk & leverage**: composability chains the risks together, leverage magnifies the losses, and liquidations spread them through the whole system in minutes.

The point isn't to scare you off. It's to hand you a ruler. Stage 18.6 will give DATs a ten-question checklist, and this lesson ends with a DeFi risk scorecard built the same way: **estimate each layer's failure probability, multiply to get a survival rate, multiply the failure rate by the loss rate to get expected loss, then ask whether the yield covers it** (Stage 13.5).

**In this lesson we break it into five parts:**

- **① Contract risk: code bugs, audits and upgrade keys**
- **② Oracle risk: who tells the contract what things cost**
- **③ Governance and admin risk: who can change the rules**
- **④ Bridges and composability: risk travels along the bricks**
- **⑤ Depegs, regulation and a risk scorecard**
`,

  mechanics: `
### ① Contract risk: code bugs, audits and upgrade keys

A smart contract is a program you can't patch after the fact. The common bug families:

- **Reentrancy.** The contract sends money out before updating its own books, and the attacker calls the withdraw function again and again from inside the transfer callback. The DAO in 2016 was this kind (Stage 13.1), and in July 2023 some Curve pools were hit again through a flaw in the reentrancy lock of the Vyper compiler.
- **Arithmetic and precision errors.** Rounding direction, integer overflow, unit conversion. Balancer V2's roughly $128 million loss in November 2025 came from a rounding error amplified by repetition.
- **Access-control errors.** A function meant only for an administrator turns out to be callable by anyone.
- **Economic-logic exploits.** The code runs as designed, but the design itself can be gamed. A common example borrows an enormous flash loan within one transaction to distort some price or some voting power.

**Audits reduce risk; they don't remove it.** Balancer had been audited many times and had run for years, and it still broke. In practice the more useful signal is **time battle-tested × value locked**. A contract that has run for years with billions of dollars at stake has effectively been under a live bug bounty the whole time. Conversely, **new protocols, new chains and new code** are where incidents cluster.

An often-overlooked issue is **upgradeability**. Many protocols keep the power to upgrade their contracts so they can fix bugs. That means you're trusting not just today's code but **the handful of people who can change it**. For any protocol, ask who holds the upgrade key. Is it a single private key? A multisig, say 3 of 5 signers? Or must changes pass a public vote and then wait out a **timelock** that gives users time to leave?

### ② Oracle risk: who tells the contract what things cost

A blockchain can't see the outside world. A lending protocol needs to know what ETH is worth to compute health factors (Stage 13.4), and a synthetic asset needs a stock price to settle. Whatever supplies that data is called an **oracle**.

Oracles are among the most attacked parts of DeFi, because **price decides everything**. Convince a contract that your collateral is worth ten times its real value and you can borrow ten times the cash. The classic playbook:

1. Borrow a fortune with a flash loan (Stage 13.1);
2. Buy a token heavily in a shallow DEX pool, pushing its spot price up several times over (the price impact of Stage 13.3);
3. If a lending protocol reads that pool's spot price as its oracle, it now believes your tokens are worth a fortune;
4. Post them as collateral, borrow real assets, repay the flash loan and walk away.

The bZx attacks of February 2020 were early examples. Mango Markets lost about $110 million to price manipulation in October 2022, another famous case.

The defenses all aim to make the price harder to bend with one trade: **time-weighted average prices (TWAPs)** instead of spot prices, aggregation across **multiple sources**, **circuit breakers** on large deviations, and very low borrowing caps for illiquid assets. The cost is slower price updates, and in a genuine crash a slow oracle can leave liquidations too late (March 12, 2020, from Stage 13.4). **Oracle design is a permanent trade-off between resisting manipulation and keeping up.**

### ③ Governance and admin risk: who can change the rules

Most DeFi protocols let holders of a **governance token** vote on parameters: which collateral to accept, what LTVs to set, where fees go, whether to upgrade contracts. That creates several risks:

- **Governance attacks.** If voting power can be borrowed or bought, an attacker can assemble a temporary majority and pass a proposal to "send the treasury to me." In April 2022, Beanstalk lost about $182 million when an attacker used a flash loan to borrow voting power and pushed a malicious proposal through in a single transaction. **Timelocks**, which force a waiting period of several days between a vote passing and taking effect, exist for exactly this reason.
- **Parameter risk.** A governance vote adds a risky asset to the collateral list or sets an LTV too high. It's a credit decision gone wrong at the governance level, and depositors pay for it.
- **How decentralized it really is.** Tokens are often concentrated among the team, early investors and a few whales, and at critical moments many protocols are still steered by a core team or a multisig. After the Cetus exploit in May 2025, Sui's validators coordinated to freeze about $162 million of the stolen funds. **That helped the victims recover money, and it also showed that a small group could coordinate to change outcomes on that chain in an emergency.** Whether that's good or bad depends on where you stand, but you need to know the power exists.
- **Legal and regulatory standing.** When a protocol that "nobody runs" fails, who answers to users? In the US, the CLARITY Act, which would settle market structure and the division of labor between regulators, failed a Senate cloture vote 49–50 on September 15, 2026. As of late September 2026 it isn't law, and the SEC and CFTC are each pushing their own rules. **DeFi's legal status is still unsettled.**

### ④ Bridges and composability: risk travels along the bricks

Moving assets between blockchains takes a **bridge**, which usually locks the asset on chain A and mints a "receipt" on chain B. The catch: **the receipt on chain B is only worth whatever is locked on chain A.** Breach the bridge, by stealing the locked assets or by minting receipts out of thin air, and every receipt on chain B can lose its backing at once.

Bridges have been DeFi's **biggest single points of failure**. Ronin lost about $620 million in March 2022 (later attributed to Lazarus), Wormhole about $320 million in February 2022, and Nomad about $190 million in August 2022. The reason isn't hard to see. A bridge concentrates a huge pile of assets, and verifying "what happened on the other chain" without trusting anyone is technically very hard.

The KelpDAO incident of April 2026 layered bridge risk and composability on top of each other:

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">One brick cracks: how the KelpDAO incident of April 2026 spread</text><g font-size="11"><rect x="20" y="60" width="140" height="64" rx="8" fill="var(--red-soft)" stroke="var(--red)" stroke-width="2"/><text x="90" y="84" text-anchor="middle" font-weight="700" fill="var(--ink)">① Bridge breached</text><text x="90" y="102" text-anchor="middle" fill="var(--muted)">rsETH loses its backing</text><text x="90" y="117" text-anchor="middle" fill="var(--muted)">about $292M</text><rect x="180" y="60" width="140" height="64" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="250" y="84" text-anchor="middle" font-weight="700" fill="var(--ink)">② Used as collateral</text><text x="250" y="102" text-anchor="middle" fill="var(--muted)">rsETH posted to Aave</text><text x="250" y="117" text-anchor="middle" fill="var(--muted)">real assets borrowed</text><rect x="340" y="60" width="140" height="64" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="410" y="84" text-anchor="middle" font-weight="700" fill="var(--ink)">③ Lender bad debt</text><text x="410" y="102" text-anchor="middle" fill="var(--muted)">reportedly</text><text x="410" y="117" text-anchor="middle" fill="var(--muted)">$123–230M</text><rect x="500" y="60" width="120" height="64" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="560" y="84" text-anchor="middle" font-weight="700" fill="var(--ink)">④ Confidence run</text><text x="560" y="102" text-anchor="middle" fill="var(--muted)">about $13B leaves</text><text x="560" y="117" text-anchor="middle" fill="var(--muted)">DeFi in two days</text></g><g stroke="var(--red)" stroke-width="2"><line x1="160" y1="92" x2="178" y2="92"/><line x1="320" y1="92" x2="338" y2="92"/><line x1="480" y1="92" x2="498" y2="92"/></g><rect x="20" y="150" width="600" height="92" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="172" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">The chain of trust a depositor actually relies on</text><text x="320" y="194" text-anchor="middle" font-size="11" fill="var(--ink)">Ethereum → staking protocol → restaking protocol → bridge → receipt on the target chain → Aave's collateral list and oracle → your USDC deposit</text><text x="320" y="216" text-anchor="middle" font-size="11" fill="var(--muted)">If any link snaps, the depositor at the bottom can take the loss, even one who never touched rsETH</text><text x="320" y="234" text-anchor="middle" font-size="11" fill="var(--muted)">Survival rate = the product of every link's survival rate</text><text x="320" y="272" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">Composability lets yields stack, and it chains risks together: you carry the weakest link in the whole chain</text></svg><figcaption>A USDC depositor who never held rsETH was still exposed to bridge risk because the lending protocol accepted rsETH as collateral. That's the other side of "money Legos."</figcaption></figure>

It's the crisis anatomy of Stage 10.1 all over again: **leverage + maturity/liquidity mismatch + opaque collateral → a run.** DeFi's transparency has a paradoxical effect here. Everyone can watch the bad debt and the outflows in real time, so runs arrive faster than in traditional markets.

### ⑤ Depegs, regulation and a risk scorecard

**Depegs** run through this whole stage:

- an algorithmic stablecoin (Terra, 2022);
- reserves that couldn't be reached (USDC, 2023, Stage 13.2);
- a synthetic dollar mispriced on a single exchange (USDe, about $0.65 on Binance on October 10, 2025);
- an off-chain black box behind a yield-bearing stablecoin (Stream Finance's xUSD, down to about $0.25 in November 2025).

Any DeFi position denominated in "dollars" depends on at least one stablecoin's peg.

**Centralized-platform risk** isn't DeFi itself, but it's tightly bound up with it. Many users enter and exit DeFi through exchanges, synthetic dollars keep their hedge legs on exchanges, and stolen funds are laundered out through exchanges. Bybit (about $1.5 billion, February 2025) and Bitget (about $350 million, September 2026) are reminders that **the same attackers go after on-chain contracts and off-chain platforms alike**.

**Regulatory risk.** Stablecoins now have the GENIUS Act, but as of September 2026 its implementing rules are still being written (it takes effect no later than January 18, 2027). The market-structure bill hasn't passed. Issuers can freeze addresses as the law requires, which means any DeFi protocol that relies on USDC or USDT has a legal edge to its "permissionless" nature.

Put it all into a scorecard. The numbers are illustrative, meant to train a way of thinking, not to serve as real ratings:

<table>
<tr><th>Layer</th><th>Questions to ask</th><th>A safer answer</th><th>Illustrative annual failure odds</th></tr>
<tr><td>Contract</td><td>How long has it run? How much is locked? Audits and bug bounties?</td><td>Years in production with large sums locked</td><td>1% (new code maybe 5–10%)</td></tr>
<tr><td>Oracle</td><td>Where do prices come from? Can one trade bend them?</td><td>Multi-source + time-weighted + circuit breakers</td><td>0.5%–5%</td></tr>
<tr><td>Governance / admin</td><td>Who can upgrade? Is there a timelock? Is voting power concentrated?</td><td>Multisig + public vote + timelock</td><td>0.5%–5%</td></tr>
<tr><td>Bridge</td><td>Does the asset depend on a bridge?</td><td>Native asset, no bridge</td><td>0%; with a bridge 2%–5%</td></tr>
<tr><td>Stablecoin / peg</td><td>What are the reserves? Can it be frozen?</td><td>Full, short-term, transparent reserves</td><td>0.5%–10%</td></tr>
<tr><td>Layers of composability</td><td>How many protocols does my position depend on?</td><td>One or two</td><td>About +1% per extra layer</td></tr>
</table>

$$
Annual survival = (1 − p contract) × (1 − p oracle) × (1 − p governance) × (1 − p bridge) × (1 − p peg) × …
Expected loss = (1 − annual survival) × loss given failure
Required yield ≥ T-bill yield + expected loss + risk premium
$$

An example: a mature contract at 1%, a multi-source oracle at 1%, a multisig with timelock at 1%, dependence on one bridge at 3%, a fiat-reserved stablecoin at 1%. Survival ≈ 0.99 × 0.99 × 0.99 × 0.97 × 0.99 ≈ 93.2%, so the chance of an incident within a year is about 6.8%. With a 50% loss on failure, expected loss is about 3.4%. **A 7% headline yield minus 3.4% leaves about 3.6%, already below the 4.24% T-bill.** One extra bridge turned an attractive-looking yield into a bad trade.

That closes Stage 13 and sets up what follows. Stage 14.4 covers the legal wrappers and limits of tokenized assets, where moving real-world assets on-chain raises the same question of where the trust went. In the DAT focus tier, the ten-question checklist of Stage 18.6 applies this same way of thinking to a listed company whose entire capital structure rests on bitcoin.
`,

  demo: "defi-risks",

  analogy: `
Think of a DeFi position as a **suspension bridge**, with you standing in the middle.

The bridge isn't one steel slab. It's many sections bolted together: one section is the contract code, one the oracle, one the governance multisig, one the cross-chain bridge, one the stablecoin's peg. Each section **looks solid**, and an engineer signed off on each (the audit report). But suspension bridges have a rule: **if any single section fails, you fall**, however solid the others are.

On its own, each section might have a 1% chance of failing in a year. But your bridge has five or six sections, or ten if you've put a restaking receipt into a lending protocol, borrowed stablecoins and dropped them into a yield pool. Ten sections at 1% each comes to nearly 10%. The toll collector (the yield) pays you a 7% "crossing subsidy" a year. It sounds like a good deal until you realize you have nearly a one-in-ten chance of ending up in the river each year.

Worse, everyone on the bridge can see everyone else. One plank creaks, everyone runs for the bank, and the bridge sways harder. That was the $13 billion that left in two days in April 2026.

So before stepping onto a DeFi bridge, count its sections, and for each one ask who built it, how long it has stood and whether it has ever failed. Only then look at whether the crossing subsidy is big enough. **Risk isn't set by the strongest section. It's the product of all of them.**
`,

  misconceptions: [
    "**\"An audited protocol is safe.\"** Audits only reduce risk. Balancer V2 was audited several times and ran for years, yet lost about $128 million to a rounding error in November 2025. Better signals are time battle-tested with large sums locked, plus upgrade controls, timelocks and bug bounties.",
    "**\"I only deposited USDC and never touched the exotic tokens, so I'm unaffected.\"** If the lending protocol you deposit into accepts some receipt token as collateral, you carry that token's risk indirectly. After KelpDAO's bridge was breached in April 2026, stolen rsETH left Aave with bad debt, a risk that landed on depositors who never held rsETH.",
    "**\"DeFi is decentralized, so nobody can freeze funds or change outcomes.\"** Stablecoin issuers can freeze addresses (the GENIUS Act actually requires the capability). Admins of upgradeable contracts can change the code. Validators on some chains can coordinate to freeze funds: about $162 million was frozen after the Cetus exploit in May 2025. Decentralization is a matter of degree, and you have to check it layer by layer.",
    "**\"Everything on-chain is transparent, so every risk is visible.\"** Code and balances are transparent, but attackers often see the bug first. Off-chain custodians, fund managers and legal arrangements aren't transparent (see Stream Finance in November 2025). And transparency speeds up runs, because everyone sees the bad debt at the same moment and leaves at the same moment.",
    "**\"A few 1% risks don't add up to much.\"** Risks multiply. Six layers at 1% each give about a 5.9% annual chance of an incident, and adding a 3% bridge takes it close to 9%. Multiply by the loss on failure and the expected loss is often enough to wipe out a DeFi product's entire premium over T-bills.",
  ],

  quiz: [
    {
      q: "An attacker borrows a fortune with a flash loan, pumps a token's price in a shallow DEX pool, then posts that token as collateral to borrow real assets from a lending protocol. Which risk is being exploited?",
      options: [
        "A reentrancy bug",
        "Oracle risk: the protocol used a spot price that a single trade could distort",
        "Bridge risk",
        "A stablecoin depeg",
      ],
      answer: 1,
      explain: "**Price decides everything.** If the oracle reads a shallow pool's spot price, one big trade can convince the contract that the collateral's value has exploded. Time-weighted prices, multi-source aggregation and circuit breakers are the main defenses.",
    },
    {
      q: "Why have bridges been DeFi's biggest single points of failure?",
      options: [
        "Bridge code is never audited",
        "Bridges only run on weekends",
        "A bridge locks up a huge pile of assets, and the receipts on the target chain are worth only what's locked; breach the bridge and every receipt can lose its backing at once",
        "Bridges are regulated by the Federal Reserve",
      ],
      answer: 2,
      explain: "A bridge is **a giant concentrated custody point plus cross-chain verification that's very hard to make fully trustless.** Ronin (about $620 million), Wormhole, Nomad and KelpDAO in 2026 all fit the pattern.",
    },
    {
      q: "Beanstalk lost about $182 million in April 2022 when an attacker used a flash loan to seize a temporary voting majority and pass a malicious proposal. Which design most directly defends against this?",
      options: [
        "A timelock of several days after a proposal passes, with voting power measured from a snapshot taken before the vote",
        "Higher trading fees",
        "A faster blockchain",
        "Abolishing all stablecoins",
      ],
      answer: 0,
      explain: "A flash loan can only hold funds within a single transaction. **Timelocks plus historical snapshots** make borrowed voting power useless, and give users time to leave before a malicious proposal takes effect.",
    },
    {
      q: "A position depends on five layers with annual failure odds of 1%, 1%, 1%, 3% and 1%, and loses 50% if anything fails. With a 7% headline yield, how does it compare with a T-bill at about 4.24%?",
      options: [
        "About 6.5% after expected loss, clearly better than T-bills",
        "Expected loss is zero because each probability is small",
        "About 5.5% after expected loss, still better than T-bills",
        "Survival ≈ 93%, expected loss ≈ 3.4%, leaving about 3.6%, already below T-bills",
      ],
      answer: 3,
      explain: "Survival = 0.99⁴ × 0.97 ≈ 93.2%; failure odds ≈ 6.8%; × 50% ≈ **3.4%**; 7% − 3.4% ≈ 3.6% < 4.24%. Risks **multiply**; they aren't set by the strongest layer.",
    },
    {
      q: "Compared with the failures of centralized platforms like FTX or Mt. Gox, how do DeFi protocols typically fail?",
      options: [
        "Management misuses customer funds",
        "Code bugs, oracle manipulation, governance attacks or bridge breaches",
        "Regulators revoke their licenses",
        "Their business hours are too short",
      ],
      answer: 1,
      explain: "Centralized platforms mostly fail through **custody and fraud** (Stage 10.5). A DeFi protocol has no \"boss runs off with the money\" option; it fails mainly when **code, prices, governance or plumbing** get broken. Assess the two kinds of risk separately.",
    },
  ],

  further: [
    { label: "FBI public service announcement: North Korea responsible for the roughly $1.5 billion Bybit theft (February 2025)", url: "https://www.ic3.gov/psa/2025/psa250226" },
    { label: "BIS Quarterly Review (December 2021): DeFi risks and the decentralisation illusion", url: "https://www.bis.org/publ/qtrpdf/r_qt2112b.htm" },
    { label: "Ethereum.org: Oracles and their risks", url: "https://ethereum.org/en/developers/docs/oracles/" },
    { label: "Ethereum.org: Bridges, their types and risks", url: "https://ethereum.org/en/bridges/" },
    { label: "Financial Stability Board (2023): The financial stability risks of decentralised finance", url: "https://www.fsb.org/2023/02/the-financial-stability-risks-of-decentralised-finance/" },
  ],
};
