export default {
  id: "bitcoin-risks",
  stage: 12,
  order: 6,
  title: "Bitcoin's Risks: Quantum, Regulation, the Security Budget & Concentration",
  difficulty: "newfin",
  prereqs: ["bitcoin-supply", "bitcoin-etfs"],

  oneLiner:
    "Price swings are only the most visible of bitcoin's risks. The deeper ones sit in its structure: **a block subsidy that halves every four years and must eventually be replaced by fees to pay for the ledger's security; concentration in hash power and mining pools; a large enough quantum computer that could in theory derive private keys from public keys; a protocol with no formal governance that still needs upgrading; regulation that swings between bans and legislation; and concentration among custodians, exchanges and large holders.** This lesson breaks each risk down into what it is, how likely it is, how severe, how far off, and what mitigates it — so that when you stress-test treasury companies in Stage 18.2, you know where the underlying asset itself could crack.",

  intuition: `
Imagine you are the chief risk officer of a large insurer and your boss asks you to assess “bitcoin.” You can't just say “it's volatile” — that's the market risk already covered in Stage 12.4. The questions you need to ask are: **what could make the bitcoin machine itself fail, and what could make the people holding it lose it?**

Split the risks into three layers and the picture gets much clearer:

- **The protocol layer:** the security of the ledger itself. Is the mining incentive big enough (the security budget)? Could hash power concentrate enough to mount an attack (a 51% attack)? Could the cryptography be broken (quantum computing)? Could the code have bugs? How are the rules changed, and who decides?
- **The institutional layer:** how the outside world treats it. Bans, taxes, identity requirements, keeping banks at arm's length — or the reverse: legal recognition and national reserves.
- **The holding layer:** the safety of *your* coins. Exchange hacks, custodian failures, losing your own keys, and the concentration that comes from a few whales, ETFs or companies holding large amounts.

This lesson sits on **Idea ④ Risk & leverage**: risks have a probability, a severity, a time horizon — and it matters **who bears them**. It also sits on **Idea ③**: bitcoin is plumbing, and the weakest section of pipe is where trust is most likely to break. (As Stage 12.1 noted, nearly all the big historical disasters happened at the holding layer, not the protocol layer.)

Two numbers are worth fixing in your head first. One: after the 2024 halving, miners receive about 164,000 new coins a year in subsidy, worth about $13.8 billion at September 2026's price of about $84,000 — **roughly 0.82% of bitcoin's total market value, a ratio that halves every four years**. Two: from Bybit's roughly $1.5 billion theft in February 2025 to the reported theft of about $350 million from Bitget in September 2026, **holding-layer accidents keep happening**.

By the end of this lesson you should be able to answer any claim that “bitcoin is going to zero” or that “bitcoin is perfectly safe” with specific questions. That is also where the open questions of Stage ∞.1 begin.

**We'll take this lesson in five parts:**

- **① The security budget: who pays the miners after the halvings?**
- **② Mining and hash-power concentration: what a 51% attack can and can't do**
- **③ Quantum computing: the distant wave**
- **④ Protocol, governance and regulation: how the rules change, and how the world responds**
- **⑤ Custody, exchanges and concentration of holdings — and how to mitigate them**
`,

  mechanics: `
### ① The security budget: who pays the miners after the halvings?

Stage 12.1 explained that the cost of rewriting the ledger depends on how much hash power honest miners commit, and how much they commit depends on how much they earn. \\(\\text{Miner revenue} = \\textbf{block subsidy} + \\textbf{fees}\\), and the network's total annual miner revenue is bitcoin's **security budget**.

$$
\\text{annual security budget} \\approx (\\text{block subsidy} + \\text{avg. fees per block}) \\times 52{,}560 \\times \\text{price}
\\frac{\\text{subsidy portion}}{\\text{market value}} \\approx \\frac{\\text{new supply per year}}{\\text{stock}} = \\text{supply inflation rate}
$$

The second line is an elegant result: **the security budget paid by the subsidy, as a share of market value, doesn't depend on the price at all — it equals the supply inflation rate from Stage 12.2.** About 0.82% after the 2024 halving, about 0.4% in 2028, about 0.2% in 2032 and about 0.1% in 2036. If the price rises tenfold, the dollar value of the subsidy rises tenfold too, but the protection it buys *per dollar of market value* doesn't improve — and it halves every four years.

Run the numbers at September 2026 levels (a price of about $84,000):

$$
\\text{annual subsidy} = 3.125 \\times 52{,}560 \\approx 164{,}000\\ \\text{coins}
\\text{annual security budget} \\approx 164{,}000 \\times \\$84{,}000 \\approx \\$13.8\\ \\text{billion a year}
$$

If the price stayed flat, keeping the same dollar budget after the 2032 halving (subsidy 0.78125) would require fees of about $10.3 billion a year:

$$
\\text{fees} \\approx \\$13.8\\ \\text{bn} - 0.78125 \\times 52{,}560 \\times \\$84{,}000 \\approx \\$10.3\\ \\text{bn a year}
\\text{fees per block} \\approx \\frac{\\$10.3\\ \\text{bn}}{52{,}560 \\times \\$84{,}000} \\approx 2.3\\ \\text{BTC}
$$

That is **roughly 2.3 BTC of fees in every block**. In most quiet periods actual fees per block are far below that, spiking only briefly when the chain is congested.

The two sides of the argument:

- **The worriers:** the security budget keeps shrinking as a share of market value, so attacks get relatively cheaper. If the fee market never grows large enough, either security weakens or someone proposes a “tail emission” — which would break the 21 million cap and is almost certainly socially unacceptable.
- **The optimists:** if the price keeps rising over the long run, the dollar budget needn't fall; second-layer networks (such as Lightning) and other on-chain demand ultimately settle on the base chain and will support fees; and an attacker needs **real specialized mining machines and real electricity** — the network's installed base of such machines is enormous sunk capital, not something you can simply rent.

This is a **decades-long** question. It won't blow up today, but it is the most commonly ignored variable in long-run models of bitcoin.

### ② Mining and hash-power concentration: what a 51% attack can and can't do

Suppose one party controlled more than half of the network's hash power. What could it do?

- **It could:** double-spend its own coins (pay someone, then use its own longer chain to “undo” the payment); refuse to include certain transactions (censorship); and orphan other miners' blocks to capture all the rewards.
- **It couldn't:** steal anyone else's coins (it doesn't have their private keys); create coins out of thin air (honest nodes reject rule-breaking blocks, Stage 12.2); or change the rules.

So a 51% attack is **an attack on the ledger's credibility**, not a direct robbery of every holder — but if it happened, the damage to confidence could hit the price far harder than the amount double-spent.

It helps to look at concentration layer by layer:

- **Pool concentration:** public pool statistics often show the top two or three pools together finding close to or more than half of all blocks. But pools are coordinators; behind them stand thousands of independent miners who can switch pools quickly if one misbehaves, and newer mining protocols let miners choose for themselves which transactions go into a block.
- **Hardware concentration:** the design and manufacture of specialized mining machines is concentrated in a handful of firms, with supply chains centered in Asia.
- **Geography and energy:** after China banned mining in 2021, much of the hash power moved to the United States and elsewhere. Power policy, grid management and regulators' attitudes to energy use all hit miners directly.

The new-era twist: listed mining companies now control a significant share of hash power, and many of them redirected power capacity and data halls toward AI data-center work after the 2024 halving. **When AI compute pays better than bitcoin hashing, miners vote with their feet** — tying the security budget of Stage 12.2 to the AI capex boom of Stage 19.2.

### ③ Quantum computing: the distant wave

Bitcoin's signatures rely on elliptic-curve cryptography: computing a public key from a private key is easy, and going backwards is infeasible on classical computers (Stage 12.1). **Shor's algorithm**, published in 1994, shows that a large enough, stable enough quantum computer *could* derive a private key from a public key.

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">A bitcoin risk map: severity × time horizon (illustrative, not precise estimates)</text><line x1="70" y1="250" x2="610" y2="250" stroke="var(--line)" stroke-width="1.5"/><line x1="70" y1="40" x2="70" y2="250" stroke="var(--line)" stroke-width="1.5"/><text x="340" y="272" text-anchor="middle" font-size="11" fill="var(--muted)">Time horizon: now → years → decades</text><text x="24" y="150" font-size="11" fill="var(--muted)" transform="rotate(-90 24 150)" text-anchor="middle">Severity for the whole network</text><circle cx="140" cy="200" r="30" fill="var(--red-soft)" stroke="var(--red)"/><text x="140" y="197" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">Custody &amp;</text><text x="140" y="210" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">exchanges</text><circle cx="230" cy="160" r="28" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="230" y="157" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">Regulation</text><text x="230" y="170" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">&amp; policy</text><circle cx="320" cy="130" r="26" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="320" y="127" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">Hash</text><text x="320" y="140" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">concentration</text><circle cx="250" cy="72" r="22" fill="var(--surface-2)" stroke="var(--line)"/><text x="250" y="69" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">Protocol</text><text x="250" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">bugs</text><circle cx="470" cy="95" r="34" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="470" y="92" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">Quantum</text><text x="470" y="105" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">computing</text><circle cx="560" cy="120" r="32" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="560" y="117" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">Security</text><text x="560" y="130" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">budget</text><text x="140" y="245" text-anchor="middle" font-size="9" fill="var(--muted)">frequent, hurts holders</text><text x="250" y="45" text-anchor="middle" font-size="9" fill="var(--muted)">rare, but potentially fatal</text><text x="515" y="165" text-anchor="middle" font-size="9" fill="var(--muted)">slow variables — prepare early</text></svg><figcaption>Risks further left are “nearer” and mostly hurt particular holders; risks further right are “further off” but threaten trust in the whole network. Circle size reflects attention, not probability.</figcaption></figure>

The key point: **only coins whose public key is already exposed on-chain are directly threatened.** A bitcoin address is usually a hash of the public key, and the public key is revealed only when the coins are spent. Which coins are exposed?

- **The earliest output format** wrote the public key directly on-chain. This includes roughly a million coins believed to date from Satoshi's era that have never moved.
- **Reused addresses:** spend from an address once and its public key is exposed, leaving the remaining balance at risk.
- Some studies estimate that coins with exposed public keys make up roughly a quarter of the supply (estimates vary widely).

The timeline is deeply uncertain. Today's quantum computers are nowhere near the scale needed, and experts' guesses range from a decade or so to never. The fix is a soft fork introducing **quantum-resistant signature schemes** (proposals such as BIP-360 are already under discussion), after which holders move their coins to new address types. The hard part is governance, not technology: **migration takes years — and what about old coins that will never be moved, including Satoshi-era coins?** Freezing them violates the principle that rules don't change for particular people; not freezing them means a quantum attacker might one day take and dump them, creating the supply shock mentioned in Stage 12.2. SHA-256, used for mining, is far less affected (Grover's algorithm gives only a square-root speed-up).

### ④ Protocol, governance and regulation: how the rules change, and how the world responds

**Code bugs have really happened.** In August 2010 a numeric-overflow bug let one block create about 184 billion bitcoin out of nothing; developers shipped a fix within hours and the network moved back onto the correct chain. In 2018 developers found and quietly patched a bug that could have allowed inflation (CVE-2018-17144) before anyone exploited it. **Together these episodes show both the risk and the resilience**: bugs will occur, but because every node enforces the rules and developers and miners coordinate quickly, no rule-breaking inflation has ever stuck on the ledger.

**There is no board of directors.** Bitcoin's rules change by “rough consensus”: developers propose, node operators choose whether to upgrade, miners signal, and exchanges and users vote with their feet.

- The 2015–2017 “block size wars” ended in a hard fork, with Bitcoin Cash splitting off in August 2017; the main chain chose small blocks plus second-layer scaling.
- The Taproot upgrade of November 2021 was the last major soft fork.
- In 2025 the community fought again, this time over how node software should treat non-financial data on-chain.

Supporters call this slowness “ossification” — and it is exactly what protects the 21 million cap. Critics worry that for problems like quantum computing, which require proactive upgrades, being too hard to change is a risk in its own right.

**Regulatory risk** swings in both directions:

- **Tightening:** China banned mining and trading outright in 2021. El Salvador made bitcoin legal tender in 2021, then rolled back mandatory acceptance in early 2025 to secure a $1.4 billion IMF program. Taxes, identity checks and fund-transfer rules keep ratcheting up around the world.
- **Embracing:** the US approved spot ETFs in 2024, created the Strategic Bitcoin Reserve in March 2025, and signed the GENIUS stablecoin law on July 18, 2025 (Stage 13.2).
- **Unresolved:** the CLARITY crypto market-structure bill passed the House 294–134 in July 2025, but **on September 15, 2026 it fell 49–50 in a Senate cloture vote, short of the 60 votes required**. As of late September 2026 it was not law, and the SEC and CFTC were pressing ahead with their own rulemaking. Unclear rules are a risk in themselves.

For treasury companies there are also accounting, tax and index-inclusion risks (Stage 15.6, Stage 18.4).

### ⑤ Custody, exchanges and concentration of holdings — and how to mitigate them

**The holding layer is where most accidents happen:**

<table>
<tr><th>When</th><th>Event</th><th>Loss</th><th>Root cause</th></tr>
<tr><td>2014</td><td>Mt. Gox collapses</td><td>Hundreds of thousands of bitcoin</td><td>Long-running theft, chaotic management</td></tr>
<tr><td>November 2022</td><td>FTX bankruptcy</td><td>Customer assets misused</td><td>Commingled customer and house funds, fraud (Stage 10.5)</td></tr>
<tr><td>February 21, 2025</td><td>Bybit theft</td><td>About $1.5 billion in crypto</td><td>Attributed by the FBI to North Korean hackers</td></tr>
<tr><td>September 2026</td><td>Bitget theft (reported)</td><td>About $350 million</td><td>Suspected North Korean hackers</td></tr>
</table>

**Concentration** is another holding-layer risk:

- US spot bitcoin ETFs reportedly hold about 1.26 million coins together, around 6.3% of supply (Stage 12.5), and many of them share a small number of custodians.
- About a million coins believed to be from Satoshi's era have never moved, and their fate hangs over the market like a question mark.
- Governments hold large amounts through forfeitures; estimates of the US federal government's holdings range from about 200,000 to more than 300,000 coins.
- Treasury companies together hold a sizable amount, and the largest alone holds a significant fraction of all bitcoin (Stage 15.4). **If holders like these were forced to sell, could the market absorb it?** That is precisely the question the stress tests of Stage 18.2 try to answer.

The mitigations boil down to a checklist:

- **Separate the layers.** Know whether you are facing protocol, institutional or holding risk. Don't blame bitcoin for an exchange collapse, and don't ignore custody risk just because the protocol has never been broken.
- **Custody.** For self-custody, use multisig and backups; with a third party, look for segregation, audits and proof of reserves; institutions should use more than one custodian.
- **Position size.** Size by risk contribution as in Stage 12.4, and never put liquidatable leverage on a highly volatile asset.
- **Watch the slow variables.** Track fees as a share of miner revenue, progress on quantum-resistant upgrades, and legislation in the major jurisdictions.

This lesson covers mechanisms and frameworks only and is not investment advice. The lesson in one sentence: **Bitcoin's risks come in three layers — protocol (security budget, hash concentration, quantum, bugs and governance), institutional (swinging regulation) and holding (custody and concentration); historically most losses have happened at the holding layer, while the deepest problems (the security budget and quantum) are slow variables measured in decades.** Next, in Stage 13.1, we move into DeFi: what new plumbing — and what new risks — appear when financial contracts are written directly as code.
`,

  demo: "bitcoin-risks",

  analogy: `
Think of bitcoin as **a castle with no king**.

Its walls (the protocol) are guarded by mercenaries (miners), paid from two purses: new gold coins the castle mints on a schedule (the block subsidy) and the tolls merchants pay at the gate (fees). The catch is that the castle's minting halves every four years, so one day the mercenaries will be paid by tolls alone. If there aren't many merchants by then, will the mercenaries drift away and the walls become easier to storm? That's **the security budget** problem.

The mercenaries are organized into a few big camps (mining pools). If the camp captains banded together and turned traitor, they could keep certain merchants out, or even snatch back money they had just paid — but they couldn't open a single resident's strongbox (private keys) or rewrite the castle's laws (nodes would reject them). That's **a 51% attack**.

Every strongbox in the castle uses locks based on the same mathematics. Word arrives from afar that someone is building a new kind of master key (a quantum computer). It isn't finished yet, but if it ever is, the old strongboxes with their lock mechanisms exposed (addresses whose public keys are already public) will be the first to fall. The castle's locksmiths have already designed new locks; the hard part is persuading every resident to change them — and deciding what to do about strongboxes whose owners left long ago and will never return.

Outside the walls, the surrounding kingdoms are sometimes hostile (bans) and sometimes courting (reserves), and the arguments over the castle's laws never end. Yet what actually happens most often is that residents hand their keys to a “safekeeping shop” in town, and then the shop is robbed or the owner vanishes with the money. **The walls have never been breached; it's always the shops.**
`,

  misconceptions: [
    "**“Bitcoin has been hacked many times, so it isn't secure.”** — The big losses (Mt. Gox, FTX, Bybit, Bitget and others) all happened at the exchange and custody layer, not in the Bitcoin protocol. The protocol has had bugs (the 2010 overflow incident), but they were fixed quickly and no rule-breaking inflation stuck on the ledger. The risks are real, but know which layer they live in.",
    "**“A 51% attacker could steal everyone's bitcoin.”** — Controlling most of the hash power lets an attacker double-spend its own coins, censor transactions and orphan other miners' blocks, but not steal other people's coins (no private keys) or create coins out of thin air (nodes reject invalid blocks). It damages the ledger's credibility and hits the price indirectly.",
    "**“The moment a quantum computer appears, all bitcoin will be stolen.”** — The coins directly at risk are mainly those whose public keys are already exposed on-chain (early formats, reused addresses), which some studies put at roughly a quarter of supply. Other coins are safe if moved to quantum-resistant addresses before being spent. The real difficulty is that the upgrade takes years, and what to do about old coins that will never move.",
    "**“A rising price solves the security-budget problem.”** — The subsidy's security budget as a share of market value equals the supply inflation rate, which doesn't depend on price and halves every four years. A higher price can keep the dollar budget up, but it can't stop the protection per dollar of market value from falling; in the long run a large enough fee market is needed.",
    "**“Regulatory risk is over — the US even has a Strategic Bitcoin Reserve.”** — The reserve comes from forfeitures, not budget purchases, and the CLARITY market-structure bill failed a Senate procedural vote on September 15, 2026. Elsewhere there have been both bans and reversals (China's 2021 ban; El Salvador rolling back mandatory legal tender in 2025). Regulation can move in either direction.",
  ],

  quiz: [
    {
      q: "After the 2024 halving, roughly what share of bitcoin's total market value does the subsidy-funded annual security budget represent, and why is it independent of price?",
      options: [
        "About 8%, because miners sell all their new coins",
        "About 0.82%, because \\(\\dfrac{\\text{subsidy}}{\\text{market value}} = \\dfrac{\\text{new supply per year}}{\\text{stock}}\\), so the price cancels out",
        "About 50%, because miner revenue equals half the market value",
        "It can't be calculated because the price changes daily",
      ],
      answer: 1,
      explain: "\\(\\dfrac{164{,}250 \\times \\text{price}}{20.09\\ \\text{million} \\times \\text{price}} \\approx 0.82\\%\\). The price cancels, so the ratio depends only on the issuance schedule: about 0.4% in 2028 and about 0.2% in 2032.",
    },
    {
      q: "An attacker controlling more than 51% of the network's hash power could NOT do which of these?",
      options: [
        "Double-spend its own bitcoin",
        "Refuse to include certain transactions",
        "Orphan blocks found by other miners",
        "Move bitcoin out of someone else's address without that person's private key",
      ],
      answer: 3,
      explain: "Moving someone else's coins requires **their private-key signature**, which no amount of hash power can forge, and rule-breaking issuance would be rejected by nodes. A 51% attack targets the ordering and confirmation of transactions, not ownership.",
    },
    {
      q: "Which statement about the quantum threat to bitcoin is most accurate?",
      options: [
        "Once a quantum computer exists, bitcoin mining stops working immediately",
        "Quantum computers have already broken bitcoin's signatures",
        "The main threat is to coins whose public keys are exposed on-chain (early formats, reused addresses); mitigation requires a soft fork to quantum-resistant signatures and migration by holders, and the hard parts are governance and time",
        "Quantum computing would only make bitcoin transactions faster",
      ],
      answer: 2,
      explain: "Shor's algorithm could in theory derive a private key from a **public key**; an address hash hides the public key until the coins are spent. SHA-256 mining is far less affected. The real challenge is years of migration and unclaimed old coins.",
    },
    {
      q: "What was the status of the US CLARITY crypto market-structure bill in late September 2026?",
      options: [
        "It passed the House in July 2025, but a Senate cloture vote failed 49–50 on September 15, 2026, so it was not law",
        "It had been signed by the president and taken effect",
        "It had never passed either chamber",
        "The Supreme Court had struck it down as unconstitutional",
      ],
      answer: 0,
      explain: "CLARITY stalled at the Senate's **60-vote threshold**. By contrast, the GENIUS stablecoin law was signed on July 18, 2025. An unclear regulatory framework is itself an institutional risk.",
    },
  ],

  further: [
    { label: "CNBC: Senate cloture vote on CLARITY Act fails (September 15, 2026)", url: "https://www.cnbc.com/2026/09/15/senate-cloture-vote-on-clarity-act-fails-dealing-regulatory-setback-to-crypto-industry.html" },
    { label: "FBI IC3 public service announcement: North Korea's theft of about $1.5 billion from Bybit (February 2025)", url: "https://www.ic3.gov/psa/2025/psa250226" },
    { label: "Bitcoin Wiki: Value overflow incident (the August 2010 bug and its fix)", url: "https://en.bitcoin.it/wiki/Value_overflow_incident" },
    { label: "BIP-360 (a proposal for a quantum-resistant output type, bitcoin/bips repository)", url: "https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki" },
    { label: "Cambridge Centre for Alternative Finance: bitcoin mining and electricity data", url: "https://ccaf.io/cbnsi/cbeci" },
  ],
};
