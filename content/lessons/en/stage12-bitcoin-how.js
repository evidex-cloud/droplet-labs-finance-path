export default {
  id: "bitcoin-how",
  stage: 12,
  order: 1,
  title: "How Bitcoin Works: Blockchain, Mining & Keys in Plain Language",
  difficulty: "newfin",
  prereqs: ["gold-fiat-bitcoin"],

  oneLiner:
    "Digital files can be copied for free, so for decades “digital cash” needed a central bookkeeper — a bank, a card network, a clearinghouse — to confirm that the same money was not spent twice. Bitcoin, launched in 2009, removed that center with four parts: **a public ledger anyone can check, proof of work that locks the ledger with electricity, a pair of keys only you know, and incentives that make strangers keep honest books**. This lesson skips the price and takes the plumbing apart piece by piece: how it avoids trusting any single party, and where trust quietly moves somewhere else.",

  intuition: `
Go back to the three headlines Lin scrolled past in Stage 0.1. The first one — “30-year Treasury yield breaks above 5%” — Lin can now explain in outline: Stage 4.5 covered why long yields rise and Stage 9.4 covered the fear of fiscal dominance. (By late September 2026 that yield had reached about 5.5%, its highest since 2004.) The other two — “tokenized funds, stablecoins and DeFi are rewiring the plumbing of finance” and “Strategy sells a bitcoin-backed preferred yielding about 10%” — both run through the same thing: **bitcoin, and the new kind of ledger it introduced**. This tier (Stages 12–14) exists to unlock them. We start with the lowest-level parts.

Picture ten housemates who take turns paying for groceries. How do they keep track? The easy way is to appoint one person with a notebook: who paid what, who owes whom. That is how finance works today. **Your bank deposit is a line in your bank's ledger** (Stage 1.2); your shares are a line in the books of your broker and the central depository (Stage 8.2). When the bookkeeper is trustworthy, everything runs smoothly. When the bookkeeper makes a mistake, runs off, or is ordered to freeze your account, you live with it.

Now make the puzzle harder. The ten housemates do not trust each other and refuse to appoint any one of them as bookkeeper, **yet the books must still be exact, and nobody may be able to rewrite the past**. That is the problem Bitcoin set out to solve. The difficulty is that copying is free in the digital world: if I send you a photo, I still have the photo. If “one bitcoin” were just a file, I could send the same file to you and to someone else at the same time. This is called **double spending**, and before Bitcoin every digital payment system prevented it the same way — with a central ledger.

Satoshi Nakamoto's 2008 design, in plain words:

- **The ledger is public and everyone keeps a copy.** Every transaction is broadcast to the whole network, and anyone can download the entire ledger and check every rule themselves — including “never more than 21 million coins.”
- **The right to write the next page is won with computing power.** About every 10 minutes, “miners” around the world race to solve a puzzle that can only be cracked by guessing. The winner bundles the latest transactions into a **block**, appends it to the ledger, and collects newly issued bitcoin as a reward.
- **Rewriting history means redoing all the work.** Every block carries the fingerprint of the block before it. Change one old page and every later fingerprint stops matching; you would have to redo the puzzles for all of those pages and still outrun everyone else — economically close to impossible.
- **“Owning” means holding a private key.** The ledger contains no names, only locks. Whoever can produce a valid signature with the right private key can spend the coins behind that lock.

This lesson sits mainly on **Idea ③ Liquidity & trust (the plumbing)**: bitcoin is, at bottom, **a settlement and custody system that needs no central institution**. It also touches **Idea ②**: bitcoin is nobody's liability (Stage 1.1, Stage 1.5). The ledger does not record “someone owes you”; it records “this lock belongs to whoever holds this key.” Once you understand these parts, you can make sense of what “21 million written into code” means in Stage 12.2, what an ETF custodian actually holds in Stage 12.5, and what kind of thing the companies in Stage 15.1 are really putting on their balance sheets.

**We'll take this lesson in five parts:**

- **① The ledger problem: why bookkeeping without a center is hard**
- **② Transactions and UTXOs: bitcoin is not a balance but a pile of “notes”**
- **③ Blocks and proof of work: locking the ledger with electricity**
- **④ Keys and signatures: what it actually means to “own” bitcoin**
- **⑤ Self-custody vs custodians: trust doesn't vanish, it moves**
`,

  mechanics: `
### ① The ledger problem: why bookkeeping without a center is hard

Every monetary system has to answer two questions: **who has how much, and has this money already been spent?** Traditional finance answers with a hierarchy of central ledgers. The central bank records banks' reserves, banks record your deposits, and card networks and clearinghouses record who owes whom at the end of each day (Stage 8.2). The system is efficient, but it has three built-in features:

- **Permission is required.** The bookkeeper decides who may open an account and which transactions go through.
- **Entries can be reversed or frozen.** The bookkeeper — or a government instructing it — can change the books.
- **There are single points of failure.** When a major bookkeeper breaks, the whole pipe stops, as it did when Lehman collapsed in 2008 (Stage 10.2).

Decentralized bookkeeping is hard because a crowd of strangers who do not trust each other has to agree on the *order* of entries in a single ledger. Computer scientists call this the **Byzantine Generals Problem** (formalized by Lamport and co-authors in 1982): several generals must agree to attack at the same moment, but messengers can be bribed and some generals are traitors. From the 1990s onward there were many attempts at digital cash (DigiCash among them), and they all hit the same wall: in the end a central server was still needed to stop double spending.

Bitcoin's breakthrough was to **replace “one person, one vote” with “one unit of computing power, one vote.”** Creating ten thousand fake identities online costs almost nothing; faking ten thousand units of real electricity consumption is impossible. Anyone who wants to rewrite the ledger has to spend more on power than all the honest miners combined — while the same machines, used honestly, would earn the block reward. **Security comes from incentives: cheating costs more than honesty.**

### ② Transactions and UTXOs: bitcoin is not a balance but a pile of “notes”

A bank account uses a *balance model*: the ledger says “Jane: $1,000.” Bitcoin uses the **UTXO model** (unspent transaction output), which works more like a wallet full of banknotes of odd denominations.

A concrete example. Suppose your wallet holds one **0.5 BTC** “note” (one UTXO) and you want to pay a merchant 0.2 BTC:

<table>
<tr><th>Side of the transaction</th><th>What it contains</th><th>Amount (BTC)</th></tr>
<tr><td>Input</td><td>Your 0.5 BTC note (spent in full, with your signature attached)</td><td>0.5000</td></tr>
<tr><td>Output 1</td><td>A new note locked to the merchant</td><td>0.2000</td></tr>
<tr><td>Output 2</td><td>Change: a new note locked back to a fresh address of yours</td><td>0.2998</td></tr>
<tr><td>Difference</td><td>\\(\\text{inputs} - \\text{outputs} = \\textbf{the fee}\\), collected by the miner who includes the transaction</td><td>0.0002</td></tr>
</table>

A few things to notice:

- **Notes can only be spent whole**, so almost every transaction produces “change.”
- **The fee is not a separate field; it is the gap between inputs and outputs.** Block space is scarce — a block holds a few thousand ordinary transactions — so when the network is busy users bid against each other and fees rise.
- Every UTXO carries a “lock” (a small script). The most common lock says: “show a signature matching this public key.”
- When a node checks a transaction, it asks only three things: **do the inputs exist and are they unspent, do the signatures verify, and do the outputs add up to no more than the inputs?** If so, the transaction is valid. Nobody has to “approve” it.

One bitcoin divides into 100 million units called **satoshis** (sats). The unit will keep coming back: the “sats per share” used to score treasury companies in Stage 16.1 is exactly this.

### ③ Blocks and proof of work: locking the ledger with electricity

A **hash function** is the system's fingerprinting machine. Bitcoin uses SHA-256, which turns any data into a 64-character hexadecimal string with three properties. The same input always gives the same output. Change one letter and the output is unrecognizable (the fingerprint of “hello” starts 2cf24dba; the fingerprint of “Hello” starts 185f8db3). And **there is no shortcut from output back to input — you can only try guesses one by one**.

A block is a *header* plus a batch of transactions. The three items in the header that matter most are **the hash of the previous block**, a summary fingerprint of all the transactions in this block (the Merkle root), and a number called the nonce, which the miner may set freely. Mining means changing the nonce over and over until the hash of the whole header falls **below the network's target** — intuitively, until it “starts with enough zeros.” Each extra leading hexadecimal zero multiplies the expected number of guesses by 16.

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">A blockchain: every block carries the previous block's fingerprint</text><g><rect x="20" y="40" width="170" height="120" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="105" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Block 100</text><text x="32" y="82" font-size="10" fill="var(--muted)">Prev hash: 0000a91…</text><text x="32" y="100" font-size="10" fill="var(--muted)">Txs: A→B 0.2 …</text><text x="32" y="118" font-size="10" fill="var(--muted)">Nonce: 48,213</text><text x="32" y="142" font-size="11" font-weight="600" fill="var(--btc)">Block hash: 00003f7…</text></g><g><rect x="235" y="40" width="170" height="120" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="320" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Block 101</text><text x="247" y="82" font-size="10" fill="var(--ink)">Prev hash: 00003f7…</text><text x="247" y="100" font-size="10" fill="var(--muted)">Txs: C→D 1.1 …</text><text x="247" y="118" font-size="10" fill="var(--muted)">Nonce: 7,905</text><text x="247" y="142" font-size="11" font-weight="600" fill="var(--btc)">Block hash: 0000c22…</text></g><g><rect x="450" y="40" width="170" height="120" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="535" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Block 102</text><text x="462" y="82" font-size="10" fill="var(--ink)">Prev hash: 0000c22…</text><text x="462" y="100" font-size="10" fill="var(--muted)">Txs: E→F 0.05 …</text><text x="462" y="118" font-size="10" fill="var(--muted)">Nonce: 91,377</text><text x="462" y="142" font-size="11" font-weight="600" fill="var(--btc)">Block hash: 00008e1…</text></g><line x1="190" y1="138" x2="235" y2="80" stroke="var(--btc)" stroke-width="2"/><line x1="405" y1="138" x2="450" y2="80" stroke="var(--btc)" stroke-width="2"/><rect x="20" y="186" width="600" height="66" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="320" y="206" text-anchor="middle" font-size="12" font-weight="700" fill="var(--red)">If someone edits “A→B 0.2” in block 100 to “A→B 20”:</text><text x="320" y="225" text-anchor="middle" font-size="11" fill="var(--ink)">block 100's hash changes → block 101's stored “prev hash” no longer matches → 101, 102 … all break</text><text x="320" y="243" text-anchor="middle" font-size="11" fill="var(--ink)">To make the edit stick, the attacker must redo the work of every later block and outpace the whole network</text></svg><figcaption>Chained fingerprints turn “change one old entry” into “redo all the work since then”; the older the record, the costlier it is to alter.</figcaption></figure>

Three rules turn this machine into a steady clock:

- **About one block every 10 minutes.** Every 2,016 blocks (roughly two weeks) the network retargets the difficulty automatically: if the last two weeks ran fast, the puzzle gets harder; if slow, easier. So no matter how many machines join, **the block rhythm — and therefore the pace of new issuance — stays on schedule**. That is why the “monetary policy written in code” of Stage 12.2 actually holds.
- **The longest chain wins — more precisely, the chain with the most accumulated work.** When two miners find blocks almost simultaneously, the network briefly forks; whichever branch the next block extends becomes the winner.
- **More confirmations, more safety.** A transaction inside a block has “1 confirmation”; each later block adds one more. By convention six confirmations (about an hour) count as final for large payments. This is **probabilistic finality**: the cost of rewriting grows exponentially with time but never reaches mathematical zero.

Compare the stock settlement chain in Stage 8.2: US equities moved to T+1 in May 2024, and a trade still passes through a broker, a clearinghouse and a depository. Bitcoin works the same on a Sunday night as on a Tuesday morning, across any border, and reaches very high certainty in about an hour **with no intermediary at all**. The price is low throughput (the base chain handles only single-digit transactions per second) and fees that swing with congestion, which is why second-layer systems such as the Lightning Network exist on top of it.

### ④ Keys and signatures: what it actually means to “own” bitcoin

The bitcoin ledger has no names, only locks. “You own 1 bitcoin” really means: **the ledger contains UTXOs totaling 1 BTC whose locks only your private key can open.**

- **Private key:** a 256-bit random number. There are roughly 10 to the 77th power possible keys — in the neighborhood of the number of atoms in the observable universe — so two people randomly generating the same key can be treated as impossible.
- **Public key:** derived from the private key by elliptic-curve multiplication. **Going from private key to public key is easy; going back is infeasible for today's computers.** That one-way property is the foundation of the whole system's security. (Whether quantum computers could break it is a topic for Stage 12.6.)
- **Address:** a hash of the public key — the string you hand out to get paid.
- **Digital signature:** to spend, you sign *this specific transaction* with your private key. Anyone can use the public key to verify the signature is genuine without ever seeing the private key, and the signature cannot be lifted onto a different transaction.

Modern wallets encode the private key as a **seed phrase** of 12 or 24 English words. Those words *are* the money. **Lose them and the coins are gone forever; let someone see them and the coins are theirs.** There is no help desk, no password reset, and no court that can order the network to move coins back. That is the most radical part of Bitcoin: it removes the bank counter, the password reset and the transaction reversal — all of those “trust services” — and hands the corresponding responsibility back to the holder.

### ⑤ Self-custody vs custodians: trust doesn't vanish, it moves

“No need to trust anyone” is a statement about the **protocol**. For an actual **holder**, the real choice is a spectrum:

<table>
<tr><th>How you hold it</th><th>Who holds the keys</th><th>Whom you must trust</th><th>Main risks</th></tr>
<tr><td>Self-custody (hardware wallet)</td><td>You</td><td>Only yourself and your software</td><td>Losing the seed phrase, being tricked into signing, no inheritance plan</td></tr>
<tr><td>Multisig (e.g. any 2 of 3 keys)</td><td>You plus family or a service</td><td>Partial trust in the co-signers</td><td>More complex, but losing one key isn't fatal</td></tr>
<tr><td>Exchange account</td><td>The exchange</td><td>The exchange's honesty and controls</td><td>Misuse of funds, hacks, frozen in bankruptcy</td></tr>
<tr><td>Spot ETF shares</td><td>The ETF's regulated custodian</td><td>Sponsor, custodian and the securities system</td><td>Custodian concentration; you can't withdraw coins</td></tr>
</table>

History keeps proving this table is not academic. In 2014 Mt. Gox, then the largest exchange, collapsed and hundreds of thousands of bitcoin went missing. In November 2022 FTX went bankrupt after customer assets were misused (Stage 10.5). In February 2025 the exchange Bybit lost about $1.5 billion of crypto in a theft the FBI attributed to North Korean hackers. **None of these was a break of the Bitcoin protocol.** Each was the old problem of the custody layer — misappropriation, leverage, hacks — the same logic as the bank runs of Stage 1.2. That is where the slogan “**not your keys, not your coins**” comes from.

This is also the most interesting tension of the new era. Bitcoin's design means you *can* do without intermediaries, yet most new money arrives *through* intermediaries. Spot ETFs hand their bitcoin to regulated custodians (Stage 12.5). Treasury companies put bitcoin on their own balance sheets and also use custodians (Stage 15.1), and their shareholders and preferred holders own **a claim on the company**, not the private keys to any particular UTXO. **Trust is minimized at the protocol layer and then added back at the custody and corporate layers.** When you analyze any bitcoin product, the first question is always: who holds the keys?

The lesson in one sentence: **Bitcoin is a public ledger locked by computing power that records “who controls this lock,” not “who owes whom”; it replaces the central bookkeeper with rules and incentives, but every holder still chooses between the burden of self-custody and trust in a custodian.** Next, in Stage 12.2, we look at the machine's most famous rule: 21 million and the halvings.
`,

  demo: "bitcoin-how",

  analogy: `
Think of Bitcoin as **a stone ledger shared by an entire village**.

In the village square stands a great stone tablet, and every ten minutes a new passage is carved into it: “Tom gave Anna two sheep.” Who does the carving? A crowd of stonecutters is always racing to solve a riddle whose answer can only be found by trying guesses one at a time. Whoever guesses first earns the right to carve the next passage and collects a freshly minted copper coin as wages. Each new passage must begin with a rubbing of the previous passage's pattern, so the whole tablet becomes one interlocking chain.

Want to change an entry from ten days ago? You would have to chisel away that passage and everything carved after it, then re-solve the riddle for each one — while every other stonecutter keeps carving new passages at the end. Unless you alone can out-guess all the other stonecutters combined, you will never catch up.

Villagers don't have to trust any stonecutter: every household keeps a rubbing of the tablet and can check at any time whether a sheep has already been given to someone else. But you must keep the key to your own sheep pen. The tablet only says “whoever can open lock No. 7 owns these two sheep.” Lose the key and the sheep stay locked in forever. If that feels like too much responsibility, you can leave your key with the village “safekeeping shop” — and you are back to trusting the shopkeeper. (The ETF of Stage 12.5 and the FTX of Stage 10.5 are two very different kinds of shop.)
`,

  misconceptions: [
    "**“Bitcoin is anonymous, so it can't be traced.”** — Bitcoin is *pseudonymous*. The ledger is completely public and every transfer is permanently visible. Once an address is linked to a real identity, for example through an exchange account with ID checks, the flow of funds can be traced with chain analysis. Law enforcement has recovered stolen funds this way many times.",
    "**“Mining means solving useful math problems.”** — Miners repeatedly guess nonces and compute hashes; the work produces nothing useful beyond itself. Its purpose is to **make rewriting the ledger expensive**: the electricity burned is the ledger's anti-forgery cost. Whether that is waste or a fair price for security is exactly what the two sides argue about.",
    "**“Bitcoin will get hacked, just like the exchanges did.”** — The big thefts (Mt. Gox, Bybit and others) all happened at the **custody layer**: poor key management, insider misuse or system bugs. Since 2009 nobody has successfully rewritten the Bitcoin ledger itself. The risks are real, but you have to be clear about which layer they live in.",
    "**“The blockchain stores the bitcoin file.”** — There is no “coin” object on the ledger, only transaction records and the locks attached to UTXOs. “Your bitcoin” means “the outputs, of some total amount, that only your private key can unlock.” What you actually need to protect is the key, not the coins.",
    "**“One confirmation means it's final.”** — One confirmation means the transaction is in a block, but that block still has a small chance of being replaced by a competing chain. Certainty rises exponentially with each confirmation, and large payments usually wait for six (about an hour). This is probabilistic finality, which differs from the legal finality of traditional settlement.",
  ],

  quiz: [
    {
      q: "Before Bitcoin, how did traditional finance solve the “double spending” problem that blocked digital cash?",
      options: [
        "Cryptography made digital files impossible to copy",
        "Users guaranteed each other directly",
        "A central bookkeeper (bank, card network, clearinghouse) kept the one true ledger and checked every transaction",
        "Each person was limited to a few transactions per day",
      ],
      answer: 2,
      explain: "The traditional answer is a **central ledger**: the bookkeeper confirms the money hasn't been spent. Bitcoin combined a public ledger, proof of work and incentives to solve double spending without a central bookkeeper for the first time.",
    },
    {
      q: "You hold one 0.5 BTC UTXO, pay a merchant 0.2 BTC and send 0.2998 BTC back to yourself as change. What is the fee, and who gets it?",
      options: [
        "0.0002 BTC, collected by the miner who includes the transaction",
        "0.2998 BTC, collected by the merchant",
        "Nothing — bitcoin transfers are free",
        "0.3 BTC, collected by a bitcoin foundation",
      ],
      answer: 0,
      explain: "\\(\\text{Fee} = \\text{inputs} - \\text{outputs} = 0.5 - 0.2 - 0.2998 = 0.0002\\ \\text{BTC}\\), paid to the miner who puts the transaction in a block. It is not a separate line but the implied difference.",
    },
    {
      q: "Why is it practically impossible to alter a block from long ago?",
      options: [
        "Old blocks are encrypted and stored on central-bank servers",
        "The law forbids editing a blockchain",
        "Old blocks are deleted automatically",
        "Each block contains the previous block's hash, so changing an old block means redoing the work of every later block and outpacing the whole network",
      ],
      answer: 3,
      explain: "Chained hashes make any edit ripple forward: **the older the record, the more work must be redone**, while honest miners keep adding new blocks. An attacker would need more computing power than the rest of the network to catch up.",
    },
    {
      q: "What is the main purpose of retargeting the difficulty every 2,016 blocks?",
      options: [
        "To make miners more profitable over time",
        "To hold block time near 10 minutes whether total computing power rises or falls, keeping issuance on schedule",
        "To keep transaction fees constant",
        "To burn some bitcoin every two weeks",
      ],
      answer: 1,
      explain: "Difficulty adjustment is Bitcoin's **thermostat**: more hash power makes the puzzle harder, less makes it easier, so the issuance schedule can't be sped up by adding machines — which is why the fixed supply of Stage 12.2 holds.",
    },
    {
      q: "What is the most fundamental difference between owning spot bitcoin ETF shares and self-custody with a hardware wallet?",
      options: [
        "ETF shares are a claim on a fund whose keys a regulated custodian holds; with self-custody you hold the keys",
        "The bitcoin inside an ETF is a different coin from on-chain bitcoin",
        "Self-custody carries no risk at all",
        "ETF shares can be sent to someone else on-chain",
      ],
      answer: 0,
      explain: "**Always ask who holds the keys.** An ETF hands custody risk to a professional in exchange for convenience and regulation; self-custody removes the intermediary but puts loss and fraud risk entirely on you. Stage 12.5 opens up the ETF custody chain.",
    },
  ],

  further: [
    { label: "Satoshi Nakamoto: Bitcoin — A Peer-to-Peer Electronic Cash System (the 2008 white paper, nine pages)", url: "https://bitcoin.org/bitcoin.pdf" },
    { label: "Bitcoin Developer Guide: technical notes on the block chain, transactions and proof of work", url: "https://developer.bitcoin.org/devguide/block_chain.html" },
    { label: "Andreas Antonopoulos et al.: Mastering Bitcoin (open-source full text; the standard guide to keys and transactions)", url: "https://github.com/bitcoinbook/bitcoinbook" },
    { label: "Satoshi Path (sister course): the full story from the cypherpunks to Bitcoin", url: "https://evidex-cloud.github.io/nextdawn-satoshi-path/" },
  ],
};
