export default {
  id: "tokenization-limits",
  stage: 14,
  order: 4,
  title: "Legal Wrappers, Compliance & the Limits of Tokenization",
  difficulty: "newfin",
  prereqs: ["tokenization-why", "tokenized-treasuries", "defi-risks"],

  oneLiner: `A tokenized asset is worth something only if every link in a **chain of trust** holds: the law honors the receipt, the custodian really has the asset, eligible buyers exist, the on-chain price comes from somewhere sound, the code and the bridges do not break, and someone is there to buy when you want out. Each link can look solid on its own, yet **five links at 98–99.5% multiply out to only about 95% for the whole chain**. This lesson turns "a token is not the asset" into five concrete checkpoints: legal wrappers and bankruptcy remoteness, compliance and transfer restrictions, oracles and valuation, contract and bridge risk, and the liquidity illusion of "transferable does not mean sellable."`,

  intuition: `
Stage 14.1 left us with one sentence: **a token is only a receipt**. This lesson turns that sentence into a checklist you can actually work through.

Start with a thought experiment. You buy $1 million of a "tokenized private-credit fund" on-chain. The screen shows 9% a year, interest lands every day, and the numbers tick up nicely. Now answer six questions:

1. What does this token represent in law? A fund share, a note, or a promise from some company?
2. If the company that issued it goes bankrupt, are the underlying loans ring-fenced from its own assets?
3. If you want to sell, who is allowed to buy? Only approved wallets? How many of those are there?
4. Who calculates the "NAV" on the screen, and how often? If a loan defaults, will it show up immediately?
5. Who controls the freeze and mint functions in the token contract? Did this token arrive on your chain via a bridge?
6. If everyone wants out at once, how long would it take the fund to pay out at NAV?

If your honest answer to any of these is "I don't know", then the $1 million on your screen is the end of **a chain of promises you cannot see**.

This lesson rests on two ideas. **Idea ②, balance sheets and claims**: where the token holder sits on somebody's balance sheet, and in what order they get paid, is the capital stack of Stage 6.1 and the bankruptcy waterfall of Stage 6.6 replayed on-chain. **Idea ③, liquidity and trust**: tokenization makes transfers wonderfully easy, and in doing so creates an illusion. **Being able to transfer is not being able to sell, and seeing a price is not the same as the price being right.**

Recent events supply plenty of warnings (see Stage 13.6 and Stage 10.5). During the liquidation cascade of October 10, 2025, the synthetic dollar USDe fell to about $0.65 on a single exchange, and any system that used that exchange's price as its reference "saw" a false price. In November 2025, an external fund manager at Stream Finance lost about $93 million and its xUSD token fell to about $0.25. In April 2026, the KelpDAO bridge exploit (about $292 million) left the lending protocol Aave with roughly $123–230 million of bad debt and triggered about $13 billion of DeFi outflows in two days. **In these episodes the "asset" itself often did not vanish. One link in the chain of trust broke.**

The good news is that each link can be inspected and designed better. The tokenized Treasury funds of Stage 14.2 work precisely because they choose the most conservative option at every link: a regulated fund, a registered transfer agent, an allowlist, a daily NAV and the simplest possible asset. **The limits of tokenization are the limits of how strong the chain of trust can be made.**

**This lesson breaks into five parts:**

- **① A token is not the asset: the multiplication of a trust chain**
- **② Legal wrappers: funds, notes, SPVs and bankruptcy remoteness**
- **③ Compliance and transfer restrictions: allowlists, freezes and the price of permissioning**
- **④ Oracles and valuation: where on-chain prices come from**
- **⑤ The liquidity illusion: transferable is not sellable**
`,

  mechanics: `
### ① A token is not the asset: the multiplication of a trust chain

Trace a tokenized asset from the underlying asset to your wallet and you pass through at least five links, every one of which has to hold:

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The trust chain: every link reliable, the chain perhaps not</text><rect x="10" y="50" width="100" height="70" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="60" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="var(--green)">Underlying</text><text x="60" y="90" text-anchor="middle" font-size="10" fill="var(--ink)">T-bills / loans</text><text x="60" y="106" text-anchor="middle" font-size="10" fill="var(--ink)">stocks / property</text><rect x="135" y="50" width="90" height="70" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="180" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Legal wrapper</text><text x="180" y="92" text-anchor="middle" font-size="10" fill="var(--muted)">fund / SPV</text><text x="180" y="110" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">99%</text><rect x="245" y="50" width="90" height="70" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="290" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Custodian</text><text x="290" y="92" text-anchor="middle" font-size="10" fill="var(--muted)">is it really there?</text><text x="290" y="110" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">99.5%</text><rect x="355" y="50" width="90" height="70" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="400" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Oracle</text><text x="400" y="92" text-anchor="middle" font-size="10" fill="var(--muted)">is the price right?</text><text x="400" y="110" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">99.5%</text><rect x="465" y="50" width="90" height="70" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="510" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Contract / bridge</text><text x="510" y="92" text-anchor="middle" font-size="10" fill="var(--muted)">is the code safe?</text><text x="510" y="110" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">99% · 98%</text><rect x="575" y="50" width="60" height="70" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="605" y="80" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Your</text><text x="605" y="96" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">wallet</text><line x1="110" y1="85" x2="135" y2="85" stroke="var(--orange)" stroke-width="2"/><line x1="225" y1="85" x2="245" y2="85" stroke="var(--orange)" stroke-width="2"/><line x1="335" y1="85" x2="355" y2="85" stroke="var(--orange)" stroke-width="2"/><line x1="445" y1="85" x2="465" y2="85" stroke="var(--orange)" stroke-width="2"/><line x1="555" y1="85" x2="575" y2="85" stroke="var(--orange)" stroke-width="2"/><rect x="120" y="150" width="400" height="56" rx="8" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="320" y="173" text-anchor="middle" font-size="12" font-family="ui-monospace, monospace" fill="var(--ink)">0.99 × 0.995 × 0.995 × 0.99 × 0.98 ≈ 0.951</text><text x="320" y="194" text-anchor="middle" font-size="11" fill="var(--muted)">Chance each link survives a year (illustrative) → about 95% for the chain</text><text x="320" y="236" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">Longer and newer chains decay faster; the weakest link sets the ceiling</text><text x="320" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">(Probabilities are for teaching only and describe no real product)</text></svg><figcaption>A tokenized asset's reliability is a product, not an average. Five links that each look safe multiply out to roughly a \\(1 - 0.951 \\approx 5\\%\\) chance that something goes wrong within a year. The demo lets you set each link yourself.</figcaption></figure>

The multiplication has three consequences:

- **The weakest link sets the ceiling.** An underlying asset of US Treasuries does not make the whole chain Treasury-safe. One unsafe bridge can turn the safest asset in the world into worthless tokens in your wallet.
- **Every extra intermediary multiplies in another number below one.** Native issuance (part ⑤ of Stage 14.1) is better essentially because it **removes links**.
- **"Something goes wrong" is not the same as "total loss".** The more precise version is: \\(\\text{probability that a link fails} \\times \\text{share of value lost when it does}\\). A custodian error may only delay a payout; a drained bridge can mean a total loss. The demo uses this form to compute an annual expected loss and sets it against what tokenization earns you, such as the value of 24/7 collateral.

### ② Legal wrappers: funds, notes, SPVs and bankruptcy remoteness

Before a token can represent a right, a **legal wrapper** has to hold the asset. Four common wrappers:

<table>
<tr><th>Wrapper</th><th>What the token represents</th><th>Your place in the capital stack</th><th>Main issue</th></tr>
<tr><td>Registered fund</td><td>A fund share</td><td>Pro-rata owner of the fund's assets</td><td>Strictest rules and limited access, but the clearest</td></tr>
<tr><td>Debt note</td><td>A debt of the issuer</td><td>Creditor of the issuer (secured or unsecured)</td><td>The issuer's own credit risk</td></tr>
<tr><td>Special-purpose vehicle (SPV)</td><td>Equity or debt of the SPV</td><td>Claimant on the SPV's assets</td><td>Is it truly bankruptcy-remote?</td></tr>
<tr><td>Bare contractual promise</td><td>"I promise to give you..."</td><td>General unsecured creditor</td><td>Almost no protection</td></tr>
</table>

The key phrase is **bankruptcy remoteness**. A sound structure puts the underlying assets into a separate entity that does nothing but hold them and cannot be reached by the sponsor's other creditors. If the company that minted the token collapses, the assets still belong to the token holders. That is exactly the job SPVs did in the securitizations of Stage 10.2, **and 2008 taught both how valuable the tool is and how badly it can be abused**.

A question people often skip: **whose law applies?** The issuer is in the Cayman Islands, the custodian in Switzerland, the asset is a US Treasury, the token lives on a global public chain and the buyer is in Singapore. If something goes wrong, which court hears the case and whose bankruptcy law governs? The more cross-border the structure, the more the "governing law" clause matters. Stage 6.6 showed that US Chapter 11 follows a clear absolute-priority rule; in another jurisdiction the order and speed of payouts can be completely different.

### ③ Compliance and transfer restrictions: allowlists, freezes and the price of permissioning

Nearly every tokenized security has compliance built in, because securities law requires the issuer to know who holds its securities and to limit who can buy:

- **Allowlists**: only wallets that have passed KYC and anti-money-laundering checks can hold or receive the token.
- **Transfer restrictions**: lock-up periods, transfers only between qualified investors, or only within certain jurisdictions.
- **Freezes and forced transfers**: the issuer or transfer agent can freeze an address, or even move tokens under a court order. This is the same logic as the GENIUS Act's requirement that stablecoin issuers be able to freeze or burn coins (Stage 13.2).

These features let tokenization operate inside existing law, but they carry **three costs**:

- **Less composability.** The DeFi "Lego" of Stage 13.1 depends on any contract being able to hold any token. An allowlisted token cannot simply be dropped into a public lending pool or AMM; either the protocol becomes permissioned too, or the token gets wrapped again, adding another link.
- **Fewer buyers.** Only allowlisted wallets can take the other side. A token that is transferable 24/7 in theory may in practice have a few dozen eligible buyers (part ⑤).
- **Concentrated control.** Who holds the freeze key? That key is a single point of failure in its own right: it can be misused, stolen by hackers, or ordered into use by a regulator at the worst possible moment. **A very centralized power runs on top of a decentralized ledger.**

This is not a criticism of compliance features; for securities they are necessary. The point is to see clearly that **the benefits of permissioned tokenization come mainly from faster settlement and mobile collateral, not from permissionless open finance**.

### ④ Oracles and valuation: where on-chain prices come from

A smart contract cannot see the off-chain world. To know what a tokenized Treasury is worth, what a stock trades at right now, or whether a private loan has defaulted, it relies on an **oracle** to feed the data in (Stage 13.6). For tokenized assets the oracle problem is harder than for crypto assets:

- **Mismatched update frequency.** A Treasury fund's NAV updates daily; a private-credit valuation may update monthly or even quarterly, while an on-chain lending protocol recalculates collateral ratios every second. **A price that updates once a month is wrong for the whole month in which something goes wrong.**
- **A single data source.** The NAV often comes from the issuer or its own fund manager, which means the party being graded is also doing the grading.
- **Market price versus NAV.** When the token's secondary-market price and the official NAV disagree, which should a protocol use? The market price can be pushed around in a thin market (USDe dropping to about $0.65 on one exchange in October 2025 is an example). The NAV can hide real liquidity stress (the weekend rush of Stage 14.2).

The more opaque the asset, the worse this gets. That is why **Treasuries worked first and real estate and art are hardest**. The obstacle is not technology; it is that off-chain there is simply no trustworthy daily price to feed on-chain.

### ⑤ The liquidity illusion: transferable is not sellable

"Improves liquidity" is tokenization's most common slogan. It needs unpacking:

- **Transferability** is whether a token can technically move from one wallet to another. Tokenization improves this enormously.
- **Liquidity** is whether you can **quickly** find someone to take the asset **without a big price concession**. That depends on how many buyers there are, how much money they have, and how confident they are about the value.

Tokenization directly improves only the first. Split an inherently illiquid asset (an office building, a five-year private loan) into a million pieces and put it on-chain, and **you have not conjured up a million buyers**. rwa.xyz counts assets that can move freely between wallets as "distributed" and separates them from assets merely recorded on a chain. The existence of that distinction tells you something: **a large share of what is "on-chain" does not circulate freely at all.**

More dangerous still is a **mismatch**. When a token can be transferred at any moment but the underlying asset takes months to sell, all is well in normal times. Under stress there are two possible endings: either the token trades at a steep discount in the secondary market (holders take the loss), or the issuer suspends redemptions (a "redemption gate") and holders are trapped. **This is the maturity mismatch of Stage 10.1 in a faster wrapper.** Tokenized Treasuries carry less of this risk because the underlying asset is among the most liquid in the world; put the same structure around private credit and the conclusion changes completely.

**This lesson's checklist** (one line per part above):
- How many links does the chain of trust have, and which is weakest?
- What is the legal wrapper? Is it bankruptcy-remote? Whose law governs?
- Who can buy? Who holds the freeze key?
- Where does the price come from, and how often is it updated? Which wins when market price and NAV disagree?
- How long does the underlying asset take to sell? Is there a redemption gate?

The next lesson (Stage 14.5) zooms out to the whole financial system: with banks, stablecoins and tokenized funds all on-chain, who becomes the 24/7 cash source of last resort? And in Stage 18.6 you will see this same checklist logic carried over, almost unchanged, to the analysis of a digital asset treasury company.
`,

  demo: "tokenization-limits",

  analogy: `
A tokenized asset is like an **e-ticket for a concert**.

The ticket itself is convenient. You can send it to a friend's phone, resell it in seconds on a secondary site, even split it into "half-show" passes. Those are the conveniences tokenization brings.

But what a ticket is worth depends on a string of things outside the ticket: whether the concert will really happen (the underlying asset); whether the promoter is a proper company that refunds you if it folds (the legal wrapper and bankruptcy remoteness); whether tickets are tied to your name and can be passed to strangers at all (transfer restrictions); whether the price shown on the resale site is one anyone actually paid (oracles and valuation); whether the ticketing system can be hacked and fakes slipped in (contracts and bridges); and, if the singer falls ill an hour before the show, whether you can sell your ticket in the next few minutes (liquidity).

However beautifully the e-ticket is designed, it cannot make a concert happen that was never going to happen. **Tokenization makes the ticket easier to use, but what you are buying is always the concert, plus the sum of every promise behind the ticket.**
`,

  misconceptions: [
    "**\"The underlying asset is US Treasuries, so the token is as safe as a Treasury.\"** A token's reliability is the product of the whole chain: legal wrapper, custody, oracle, contract and bridge. A failure at any link can cause losses. The weakest link sets the ceiling, not the strongest asset.",
    "**\"Once it is on-chain, it is liquid.\"** Tokenization raises transferability, not liquidity. Splitting a building into a million pieces does not create a million buyers, and allowlists narrow the pool further. When the underlying asset is hard to sell, the token either trades at a discount or gets stuck behind a redemption gate.",
    "**\"Allowlists and freeze functions mean the project is not decentralized enough, which is bad.\"** For securities, knowing who the holders are and being able to enforce court orders are legal requirements. The real questions are who controls these powers, under what conditions they are used, and whether that is transparent.",
    "**\"The NAV shown on-chain is the true value.\"** A NAV may update daily, monthly or even quarterly, and is often supplied by the issuer itself. For opaque assets, a steady number on the screen can hide losses that are quietly building up.",
    "**\"Using an SPV automatically makes it bankruptcy-remote.\"** An SPV is a tool. Whether it truly ring-fences the assets depends on the contracts, the governing law and actual practice (were the assets really transferred, or commingled with the sponsor's?). Securitization in 2008 showed that the same tool can be used well or badly.",
  ],

  quiz: [
    {
      q: "A tokenized asset's chain of trust has four links whose chances of getting through a year without failure are 99%, 99%, 98% and 98%. Roughly what is the chance the whole chain gets through the year intact?",
      options: ["About 99%", "About 94%", "About 98%", "About 96%"],
      answer: 1,
      explain: "**Reliability multiplies:** \\(0.99 \\times 0.99 \\times 0.98 \\times 0.98 \\approx 0.941\\), or about **94%**. Every link is above 98%, yet the chain has roughly a 6% chance of at least one failure. More links, and newer ones, make the product fall faster.",
    },
    {
      q: "The company that minted a token goes bankrupt. Which structure best protects token holders?",
      options: ["The token is just a contractual promise from the company", "The token is an unsecured note issued by the company", "The assets sit in a bankruptcy-remote SPV or registered fund, and the token represents ownership of it", "The token has an allowlist"],
      answer: 2,
      explain: "**Bankruptcy remoteness** keeps the underlying assets out of reach of the company's other creditors (the priority rules of Stage 6.6 decide where you stand). A contractual promise or an unsecured note makes you an ordinary creditor of the issuer; an allowlist is a compliance feature with nothing to do with bankruptcy protection.",
    },
    {
      q: "An on-chain lending protocol accepts a tokenized private-credit fund as collateral, and the fund's NAV updates once a month. What is the main risk?",
      options: ["Rising interest rates make the NAV swing sharply every day", "The token cannot be transferred on-chain", "The allowlist attracts too many borrowers", "An underlying loan defaults mid-month and the protocol keeps valuing collateral at the old NAV until the next update"],
      answer: 3,
      explain: "**The oracle's update frequency does not match the protocol's.** A price that updates monthly is wrong for the month in which something goes wrong, so the protocol overvalues the collateral, lends too much and ends up with bad debt.",
    },
    {
      q: "What is the difference between transferability and liquidity?",
      options: ["Transferability is whether a token can technically move; liquidity is whether you can find a buyer quickly without a big price concession", "They are the same thing", "Liquidity is whether a token can technically move; transferability is about the price level", "Transferability depends only on interest rates"],
      answer: 0,
      explain: "Tokenization vastly improves **transferability**, but **liquidity** depends on how many buyers there are, their money and their confidence about value. Putting a hard-to-sell asset on-chain does not create buyers. That is the liquidity illusion.",
    },
    {
      q: "Why did tokenized Treasuries work first, while tokenized real estate and art lag furthest behind?",
      options: ["Blockchains cannot record real estate", "Real-estate yields are too low", "Treasuries have a trustworthy daily price, the simplest legal structure and some of the deepest liquidity in the world, while real estate and art are hard to value, hard to transfer legally and hard to sell", "Regulators ban tokenized real estate"],
      answer: 2,
      explain: "The limit of tokenization is **how strong the chain of trust can be made**. Treasuries are the easiest case on valuation (the oracle), legal wrapper and saleability. For real estate and art, the hard part is off-chain, not in the technology.",
    },
  ],

  further: [
    { label: "RWA Path (sister course: SPVs, custody, oracles and compliance structures in depth)", url: "https://evidex-cloud.github.io/droplet-labs-rwa-path/" },
    { label: "CoinDesk: DeFi TVL drops more than $13 billion in two days after the KelpDAO hack (April 2026)", url: "https://www.coindesk.com/markets/2026/04/20/defi-tvl-drops-more-than-usd13-billion-in-two-days-following-kelp-dao-hack" },
    { label: "BIS Annual Economic Report 2023, chapter III: unified ledgers, tokenization and the foundations of trust", url: "https://www.bis.org/publ/arpdf/ar2023e3.htm" },
    { label: "SEC innovation exemption press release (September 2026): full shareholder rights, public contracts, halt rules", url: "https://www.sec.gov/newsroom/press-releases/2026-90-sec-issues-innovation-exemption-facilitate-trading-tokenized-nms-stock-request-comment" },
  ],
};
