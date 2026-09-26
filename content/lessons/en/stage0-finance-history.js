export default {
  id: "finance-history",
  stage: 0,
  order: 3,
  title: "From Clay Tablets to Blockchains: 5,000 Years of Financial Innovation",
  difficulty: "intro",
  prereqs: ["four-ideas"],

  oneLiner:
    "Finance is older than coins. Five thousand years ago, temples in Mesopotamia were already recording loans of barley and silver — with interest — on clay tablets. Every major financial innovation since — coinage, paper money, double-entry bookkeeping, the joint-stock company, central banks, the gold standard and Bretton Woods, listed options, index funds, Bitcoin, DeFi, spot ETFs, digital asset treasury companies — has done the same basic thing: **re-engineer who keeps the ledger and why we should trust it.** See that pattern and Bitcoin and Strategy stop looking like monsters from nowhere; they're simply the two newest links in a very long chain.",

  intuition: `
The first two lessons gave us two tools: finance does three kinds of moving (Stage 0.1), and four ideas sit underneath (Stage 0.2). This lesson turns around and **looks back**: how did those moves and ideas grow up?

Start with a fact that surprises most people: **lending is about two thousand years older than coins.** Around 3000 BC, temples and palaces in Mesopotamia — roughly modern Iraq — were inscribing clay tablets with records of who had borrowed how much barley and how much they owed after the harvest. The Code of Hammurabi, from around 1754 BC, even capped interest rates: roughly 20% a year on silver and 33⅓% on grain. There were no coins yet, **but there were already ledgers, IOUs and a price of time** — Ideas ① and ② are older than money itself.

The five thousand years of financial history since then can be strung on a single sentence:

**Every major financial innovation re-engineers who keeps the ledger and why everyone should believe it.**

- **Temple ledgers:** people trusted the temple because it sat at the center of religion and power.
- **Royal coinage:** around 600 BC the kingdom of Lydia began striking stamped metal coins; the stamp was the king's guarantee.
- **Song-dynasty paper money:** in 11th-century China, government-issued paper money appeared, and trust moved from metal to the state.
- **Double-entry bookkeeping:** Italian merchants' “every debit has a credit” method let strangers check each other's books; in 1494 Luca Pacioli set it down in print.
- **The joint-stock company:** the Dutch East India Company (VOC), founded in 1602, let thousands of strangers share one company's profits through shares that could be resold in Amsterdam.
- **Central banks:** the Bank of England, founded in 1694, began life as a lender to the government; over time its ledger became the nation's ledger of last resort.
- **The gold standard and Bretton Woods:** gold anchored the world's ledgers; from 1944 the dollar was pegged to gold and other currencies to the dollar; on **August 15, 1971** President Nixon closed the gold window and the world entered the era of pure credit money.
- **Financial engineering:** in 1973 the Chicago Board Options Exchange opened and the Black–Scholes formula was published; risk itself became a standardized, tradable part (Idea ④).
- **2008:** Lehman Brothers failed on September 15, and trust in “who owes whom” collapsed across the system.
- **Bitcoin:** on January 3, 2009, Satoshi Nakamoto mined the genesis block and embedded that day's Times headline about a bank bailout. **For the first time, a global ledger needed no central institution to keep it.**
- **DeFi, stablecoins, tokenization:** 2020's “DeFi summer,” the spot bitcoin ETFs of January 2024, BlackRock's tokenized Treasury fund — the on-chain ledger and the traditional one started to plug into each other.
- **Digital asset treasury companies:** starting with MicroStrategy's (later Strategy's) first bitcoin purchase in August 2020, a new kind of listed company appeared: **one that uses traditional financial tools — stock, convertible bonds, preferred stock — to hold an asset that lives on the new ledger.**

Notice that **no link in this chain replaced the one before it; each was stacked on top.** We still use double-entry bookkeeping, still have joint-stock companies, still have central banks — Bitcoin just added another layer. So the “new finance” doesn't overthrow the old; it runs new pipes off the old foundations (Idea ③).

There's a second recurring pattern: **every new ledger arrives with a mania and a crash.** Not long after the VOC came the tulip mania of the 1630s; after the Bank of England, the South Sea Bubble of 1720; after securitization, 2008; after the ICO boom, the 2018 bust; after algorithmic stablecoins, Terra/Luna in 2022. **Innovation widens the circle that trust can cover, and mania then stretches that trust to breaking point** — Idea ④'s reflexivity on a historical scale. Stage 10 dissects these crises one by one.

This lesson is a historical map; you don't need to memorize dates. Just keep one question in hand: **what did this innovation change about who keeps the ledger, and why we believe it?** Carry that question and both Bitcoin (Stage 12.1) and Strategy's story (Stage 15.2) fall naturally into place.

**This lesson breaks into five parts:**

- **① Clay tablets, coins and paper: ledgers are older than money**
- **② Double-entry and the joint-stock company: writing trust between strangers into institutions**
- **③ Gold, central banks and the dollar: the nation-sized ledger**
- **④ Financial engineering and 2008: cutting risk into tradable parts**
- **⑤ On-chain ledgers and digital treasuries: 2009–2026**
`,

  mechanics: `
### ① Clay tablets, coins and paper: ledgers are older than money

**The earliest “money” was an entry in a ledger, not a piece of metal.** Mesopotamian cuneiform tablets are full of loan records: how much barley or silver was lent, when it was due, how much interest was owed. The Sumerian word for interest is said to be linked to the word for young animals — lend out a herd and get it back with a few calves added. The price of time was that literal.

The rate caps in the Code of Hammurabi (around 1754 BC) — about 20% on silver and 33⅓% on grain — look shocking today. Run them through the Rule of 72 (Stage 2.2): 20% a year doubles a debt in about **3.6 years**; 33⅓% doubles it in about **2.2 years**. Such high rates reflected an extremely risky world: failed harvests, wars, borrowers who vanished. **Risk had a price (Idea ④) from the very first ledger.**

Then came three changes of medium:

- **Coinage (around 600 BC, Lydia):** stamping a royal mark on a lump of gold-silver alloy of standard weight. The stamp ended the need to weigh and assay metal at every sale. **Trust shifted from “I checked this metal” to “the king vouched for this metal.”**
- **Chinese paper money (Song-dynasty jiaozi, 11th century):** merchants in Sichuan first issued private jiaozi as receipts for heavy iron coins; in the 1020s the state took over issuance. It was among the world's earliest official paper money. **The paper itself was worthless; the promise behind it was what counted** — Idea ②'s “money is a liability.”
- **Bills of exchange (medieval Italy):** merchant bankers in Florence and Genoa used a piece of paper to “move money” between cities without hauling gold down bandit-infested roads — the first pipes for moving value across space (Idea ③).

What they share: **the medium got lighter while trust leaned more and more on institutions** — from the temple to the king, from the king to a network of merchants.

### ② Double-entry and the joint-stock company: writing trust between strangers into institutions

The rule of **double-entry bookkeeping** is simple: record every transaction twice, once as a debit and once as a credit, so the two sides always balance.

$$
\\text{Assets} = \\text{Liabilities} + \\text{Owners' equity}
$$

That's where Stage 0.2's balance sheet comes from. Italian merchants were using it in the 13th and 14th centuries, and in 1494 the friar Luca Pacioli laid out the method systematically in his Summa de arithmetica. Its importance isn't the arithmetic; it's that **outsiders could check the books** — partners, creditors and, later, shareholders could all see what a business owned and whom it owed.

Checkable books made the **joint-stock company** possible:

- **1602: the Dutch East India Company (VOC) is founded.** It sold shares to the public — anyone could invest — and those shares could be traded in Amsterdam, giving rise to the world's first continuous securities market. Investors had **limited liability**: the most they could lose was what they put in. It's the prototype of today's common stock (Stage 5.1).
- **1609: the Bank of Amsterdam (the Wisselbank) opens,** giving merchants a single trusted settlement ledger and ending the chaos of coins of uneven quality.
- **1694: the Bank of England is founded.** Its first piece of business was lending £1.2 million to the English government for a war, in exchange for the right to issue banknotes. **Long-term government debt plus a bank that can issue money** — that pairing is still the skeleton of modern finance (Stage 1.3).

The first bubbles arrived almost on cue: **the Dutch tulip mania of the 1630s**, then **Britain's South Sea Bubble and France's Mississippi Bubble in 1720.** The South Sea Company took over British government debt by swapping its own shares for bonds; its stock soared and then collapsed in 1720, and Isaac Newton reportedly lost a fortune. **That structure — a listed company using its own stock to absorb some “hard” asset, with a reflexive loop between share price and asset — resurfaces in new form three centuries later in digital asset treasury companies** (Stage 10.4, Stage 16.7). That isn't to say the two are the same. It's a reminder that **premiums, share issuance and reflexivity are a very old script.**

### ③ Gold, central banks and the dollar: the nation-sized ledger

From the 19th century into the 20th, the world's ledgers were pinned to one anchor: **gold.**

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">5,000 years: who keeps the ledger, and why do we trust it?</text><line x1="30" y1="150" x2="610" y2="150" stroke="var(--line)" stroke-width="2"/><circle cx="50" cy="150" r="6" fill="var(--muted)"/><text x="50" y="132" text-anchor="middle" font-size="10" fill="var(--ink)">c. 3000 BC</text><text x="50" y="176" text-anchor="middle" font-size="10" fill="var(--muted)">Temple tablets</text><circle cx="110" cy="150" r="6" fill="var(--muted)"/><text x="110" y="118" text-anchor="middle" font-size="10" fill="var(--ink)">c. 600 BC</text><text x="110" y="190" text-anchor="middle" font-size="10" fill="var(--muted)">Royal coins</text><circle cx="165" cy="150" r="6" fill="var(--muted)"/><text x="165" y="132" text-anchor="middle" font-size="10" fill="var(--ink)">1000s</text><text x="165" y="176" text-anchor="middle" font-size="10" fill="var(--muted)">Paper money</text><circle cx="220" cy="150" r="6" fill="var(--orange)"/><text x="220" y="118" text-anchor="middle" font-size="10" fill="var(--ink)">1494</text><text x="220" y="190" text-anchor="middle" font-size="10" fill="var(--muted)">Double-entry</text><circle cx="270" cy="150" r="6" fill="var(--orange)"/><text x="270" y="132" text-anchor="middle" font-size="10" fill="var(--ink)">1602</text><text x="270" y="176" text-anchor="middle" font-size="10" fill="var(--muted)">VOC shares</text><circle cx="318" cy="150" r="6" fill="var(--orange)"/><text x="318" y="118" text-anchor="middle" font-size="10" fill="var(--ink)">1694</text><text x="318" y="190" text-anchor="middle" font-size="10" fill="var(--muted)">Bank of England</text><circle cx="368" cy="150" r="6" fill="var(--blue)"/><text x="368" y="132" text-anchor="middle" font-size="10" fill="var(--ink)">1944</text><text x="368" y="176" text-anchor="middle" font-size="10" fill="var(--muted)">Bretton Woods</text><circle cx="412" cy="150" r="6" fill="var(--blue)"/><text x="412" y="118" text-anchor="middle" font-size="10" fill="var(--ink)">1971</text><text x="412" y="190" text-anchor="middle" font-size="10" fill="var(--muted)">Gold window shut</text><circle cx="455" cy="150" r="6" fill="var(--blue)"/><text x="455" y="132" text-anchor="middle" font-size="10" fill="var(--ink)">1973</text><text x="455" y="176" text-anchor="middle" font-size="10" fill="var(--muted)">Listed options</text><circle cx="498" cy="150" r="6" fill="var(--red)"/><text x="498" y="118" text-anchor="middle" font-size="10" fill="var(--ink)">2008</text><text x="498" y="190" text-anchor="middle" font-size="10" fill="var(--muted)">Lehman</text><circle cx="540" cy="150" r="7" fill="var(--btc)"/><text x="540" y="132" text-anchor="middle" font-size="10" fill="var(--ink)">2009</text><text x="540" y="176" text-anchor="middle" font-size="10" fill="var(--btc)">Bitcoin</text><circle cx="585" cy="150" r="7" fill="var(--btc)"/><text x="585" y="118" text-anchor="middle" font-size="10" fill="var(--ink)">2020–26</text><text x="585" y="190" text-anchor="middle" font-size="10" fill="var(--btc)">DeFi · ETFs · DATs</text><rect x="30" y="214" width="170" height="26" rx="5" fill="var(--surface-2)" stroke="var(--line)"/><text x="115" y="231" text-anchor="middle" font-size="9" fill="var(--ink)">Trust: temples, kings</text><rect x="205" y="214" width="145" height="26" rx="5" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="277" y="231" text-anchor="middle" font-size="9" fill="var(--orange-ink)">Checkable books, company law</text><rect x="355" y="214" width="165" height="26" rx="5" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="437" y="231" text-anchor="middle" font-size="9" fill="var(--blue)">Central banks & the dollar</text><rect x="525" y="214" width="85" height="26" rx="5" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="567" y="231" text-anchor="middle" font-size="9" fill="var(--btc)">Code, consensus</text><text x="320" y="268" text-anchor="middle" font-size="11" fill="var(--muted)">Each layer stacks on the one before rather than replacing it: today's world uses all four sources of trust at once</text><text x="320" y="284" text-anchor="middle" font-size="10" fill="var(--muted)">(Timeline is schematic, not to scale)</text></svg><figcaption>The through-line of financial history: the ledger-keeper and the source of trust change; the logic of ledgers and claims does not.</figcaption></figure>

- **The gold standard:** Britain was effectively on gold from the 18th century and made it official in 1821; by the 1870s most major economies had followed. Paper money could be exchanged for gold at a fixed rate, so **gold was the shared anchor of every nation's ledger.** Its virtue was discipline: a central bank couldn't simply print more. Its vice was rigidity: in a slump, the central bank couldn't ease. During the Great Depression of the 1930s, country after country abandoned it.
- **1913: the Federal Reserve is created,** finally giving the United States its own ledger of last resort and lender of last resort (Stage 1.3).
- **July 1944: the Bretton Woods conference.** The postwar order was a two-level peg: **the dollar was tied to gold at $35 an ounce, and other currencies were tied to the dollar.** The dollar became the center of the global ledger (Stage 3.4).
- **August 15, 1971: Nixon closes the gold window.** Foreign central banks could no longer swap dollars for gold. From that day on, none of the world's major currencies was tied to anything physical, and **a currency's value rested entirely on the issuing state's credit and its central bank's discipline.** Stage 1.5 covers that day in depth — and why Bitcoin supporters often treat it as Bitcoin's prequel.

**This stretch of history adds the most important stroke to Idea ②:** once money stopped being an IOU for gold, it became a pure liability of the state. States could borrow more and print more — that's flexibility, and it's risk. In August 2026, total US federal debt passed $40 trillion for the first time, and the question of “what ultimately repays this debt?” is exactly where today's long-bond yields and the bitcoin narrative meet (Stage 9.4, Stage 20.1).

### ④ Financial engineering and 2008: cutting risk into tradable parts

From the 1970s on, the center of gravity in financial innovation moved from keeping the ledger to slicing risk:

- **1973:** the Chicago Board Options Exchange (CBOE) opens, offering the first standardized, exchange-listed stock options; the same year, Black and Scholes publish their option-pricing formula. **Volatility became something you could calculate and trade** (Idea ④; Stage 7.2, Stage 7.3).
- **The 1970s:** mortgage securitization takes off, bundling thousands of home loans into bonds sold to investors. In **1976** the first index mutual fund for ordinary investors appears, putting diversification within everyone's reach (Stage 5.6).
- **1993:** the first successful US exchange-traded fund (ETF) lists, turning a basket of stocks into one security that trades like a single share.
- **2008:** these parts got assembled in the worst possible way. Subprime mortgages were packaged, repackaged, levered and cross-insured; when house prices fell, nobody knew whose balance sheet the losses were sitting on. **On September 15, 2008, Lehman Brothers filed for bankruptcy.** A large money-market fund “broke the buck,” short-term funding froze, and central banks and governments were forced to step in (Stage 10.2).

The lesson of 2008: **the finer risk is sliced and the farther it travels, the harder it is to know where it finally lands** — Ideas ② and ③ failed at the same moment. That set the stage for the next innovation.

### ⑤ On-chain ledgers and digital treasuries: 2009–2026

On **October 31, 2008**, someone using the name Satoshi Nakamoto published the Bitcoin white paper. On **January 3, 2009**, the Bitcoin genesis block was created, carrying that day's headline from the London Times: “Chancellor on brink of second bailout for banks.” It works as a timestamp — and as a manifesto.

Bitcoin's innovation fits this lesson's question neatly: **Who keeps the ledger? Everyone. Why trust it? Mathematics, code and open, transparent consensus rules.** For the first time in five thousand years, a global ledger needed no temple, king, bank or clearinghouse (Stage 12.1).

Over the next decade and a half, the new ledger quickly grew its own financial system and began plugging into the old one:

<table>
<tr><th>When</th><th>Event</th><th>What it changed</th></tr>
<tr><td>2015</td><td>Ethereum launches</td><td>Programs (smart contracts) can run on the ledger</td></tr>
<tr><td>2014–2018</td><td>Stablecoins such as USDT and USDC appear</td><td>Dollars move on-chain as an issuer's liability</td></tr>
<tr><td>Summer 2020</td><td>“DeFi summer”</td><td>On-chain lending, exchanges and yield farming explode (Stage 13.1)</td></tr>
<tr><td>Aug 11, 2020</td><td>MicroStrategy buys its first 21,454 bitcoin (about $250 million)</td><td>The first listed company to make bitcoin its primary treasury reserve asset</td></tr>
<tr><td>Jan 2024</td><td>US spot bitcoin ETFs begin trading</td><td>Bitcoin enters ordinary brokerage accounts (Stage 12.5)</td></tr>
<tr><td>Mar 2024</td><td>BlackRock launches its tokenized Treasury fund, BUIDL</td><td>Treasury exposure moves on-chain and can serve as collateral (Stage 14.2)</td></tr>
<tr><td>2025</td><td>MicroStrategy renames itself Strategy and launches a series of perpetual preferreds; newer treasury companies such as Strive appear</td><td>Selling yield through preferreds to fund bitcoin purchases (Stage 15.2)</td></tr>
<tr><td>Jul 2025</td><td>The US GENIUS Act is signed</td><td>Stablecoins get a federal legal framework (Stage 13.2)</td></tr>
<tr><td>Late 2025–2026</td><td>Bitcoin retreats from its peak near $126,000; the treasury-company sector shakes out</td><td>Reflexivity starts testing these balance sheets in reverse (Stage 18.3)</td></tr>
</table>

As of September 20, 2026, Strategy held about 846,000 bitcoin — roughly 4% of all the bitcoin that will ever exist. **It is the newest link in the five-thousand-year chain, and a living hybrid:** its assets sit on the newest ledger (bitcoin), while its liabilities use the oldest tools there are — stock (a 1602 invention), bonds and preferred stock. Stages 15 through 18 take it apart as a balance sheet.

Step back and look at the whole chain, and three patterns stand out:

- **Every innovation redesigned who keeps the ledger and why we trust it**, yet the logic of lending, interest, claims and seniority hasn't changed in five thousand years.
- **New layers stack on old ones:** Bitcoin didn't make central banks disappear, a tokenized Treasury is still a Treasury, and a DAT still answers to securities law.
- **Every expansion of trust comes with an overdraft:** tulips, the South Sea, 2008, ICOs, Terra/Luna, FTX… which is why learning the new finance means learning the history of crises too (Stage 10).
`,

  demo: "finance-history",

  analogy: `
Picture financial history as an **old city that keeps adding floors**.

At first the city center held only a temple, where priests recorded on clay tablets who had borrowed whose grain. Later the king built a mint next door, and from then on nobody weighed metal anymore; they trusted the royal stamp. Later still, merchants opened counting houses by the river and kept double-entry books of every deal, so strangers could trade with one another. In 1602 the city's first joint-stock company opened its offices, with a line of people outside waiting to buy shares; in 1694 a building called the “central bank” went up, and from then on every account in town was ultimately settled there.

In the 20th century the city poured the same foundation under every building — gold. In 1971 that foundation was quietly swapped for “trust in the state.” Engineers then strung elaborate skyways between the towers (options, securitization), and in 2008 some of those skyways came down.

In 2009 someone put up a completely different kind of building on the empty land outside the walls: no doorman, no landlord, and the position of every brick checked jointly by all the residents — Bitcoin. At first people just stood around staring. Then someone built bridges between the old city and the new tower (stablecoins, ETFs, tokenized funds). Then a few listed companies from the old city moved their vaults into the new building outright — while still raising money the old-city way, with stock, bonds and preferred shares.

**The old city was never torn down; it only grew upward, floor by floor.** When you walk its streets today, you're standing on the lending logic of the clay-tablet era, the share system of 1602, the central bank of 1694 and the blockchain of 2009 all at once. Understanding the city means understanding how each floor was added — and which floor's foundation is shakiest.
`,

  misconceptions: [
    "**“Money came first, then lending.”** — The reverse. Mesopotamian loan records predate the first coins by more than two thousand years. People had IOUs in ledgers before they had metal coins — which is why Stage 1.1 describes money as a relationship of debt.",
    "**“Bitcoin was a brand-new invention out of nowhere.”** — Bitcoin combined decades of cryptographic research and sits squarely in a five-thousand-year tradition of ledgers and trust. What's new is that **the ledger-keeper shifted from an institution to an open consensus network**; the logic of lending, interest and claims didn't change.",
    "**“There were no crises under the gold standard before 1971.”** — The gold-standard era had its own bank runs and panics (the US Panic of 1907 led directly to the Fed's creation in 1913), and gold's rigidity deepened the Great Depression of the 1930s. Every ledger faces crises of trust; only the form differs.",
    "**“The new finance will replace the old.”** — Historically, each layer of innovation stacks on top rather than replacing what came before. Today's digital asset treasury companies prove the point: their assets sit on the bitcoin ledger, but their funding tools are the stocks, bonds and preferreds that date back to 1602.",
    "**“Financial bubbles happen because people are stupid.”** — Bubbles tend to form around genuine innovations: joint-stock companies, railways, the internet and blockchains were all real. The problem is reflexivity — a new ledger widens the reach of trust, and mania then stretches that trust to its limit (Stage 10.4).",
  ],

  quiz: [
    {
      q: "The Code of Hammurabi capped interest on silver at about 20% a year. By the Rule of 72, roughly how long did a debt take to double at that rate?",
      options: ["About 3.6 years", "About 14 years", "About 20 years", "It would never double"],
      answer: 0,
      explain: "\\(\\dfrac{72}{20} \\approx 3.6\\), so about **3.6 years**. Rates that high reflected the enormous risks of the ancient world. The price of time (Idea ①) has existed as long as ledgers have (Stage 2.2 covers compounding and the Rule of 72).",
    },
    {
      q: "What was the Dutch East India Company's (VOC's) key financial innovation in 1602?",
      options: [
        "Minting the first gold coins",
        "Selling transferable shares to the public, with limited liability for investors",
        "Inventing Bitcoin",
        "Closing the gold window for the first time",
      ],
      answer: 1,
      explain: "The VOC let large numbers of strangers share profits through transferable shares with limited liability, and it spawned Amsterdam's continuous securities market. **It's the prototype of today's common stock** (Stage 5.1).",
    },
    {
      q: "Which best describes what happened on August 15, 1971?",
      options: [
        "The Bretton Woods conference pegged the dollar to gold",
        "The Federal Reserve was founded",
        "Nixon closed the gold window, so dollars could no longer be exchanged for gold",
        "The first index fund was launched",
      ],
      answer: 2,
      explain: "From that day, major currencies were no longer tied to anything physical, and **their value rested entirely on state credit**. Bretton Woods was 1944; the Fed was founded in 1913 (Stage 1.5).",
    },
    {
      q: "Through this lesson's core question — who keeps the ledger, and why trust it? — what was Bitcoin's innovation?",
      options: [
        "The Fed keeps the ledger; trust comes from the law",
        "A large company keeps the ledger; trust comes from its brand",
        "It has no ledger, so no trust is needed",
        "An open consensus network keeps the ledger; trust comes from mathematics, code and transparent rules",
      ],
      answer: 3,
      explain: "Bitcoin is the first global ledger in five thousand years that **needs no central institution to keep it**. It's still a ledger — only the keeper and the source of trust changed (Stage 12.1).",
    },
    {
      q: "Why can a digital asset treasury company like Strategy be called a hybrid of old and new finance?",
      options: [
        "Its assets sit on the new bitcoin ledger, while its funding tools — stock, bonds, preferreds — are ancient",
        "It is both a bank and an exchange",
        "It raises money by issuing its own cryptocurrency",
        "It trades only on-chain and is exempt from securities law",
      ],
      answer: 0,
      explain: "**New assets, old liabilities.** That's the stacking pattern of financial history, and it's the balance sheet Stages 15–18 dissect (Stage 15.2 tells Strategy's story). Not investment advice.",
    },
  ],

  further: [
    { label: "The Bitcoin white paper (Satoshi Nakamoto, 2008)", url: "https://bitcoin.org/bitcoin.pdf" },
    { label: "Federal Reserve History: Creation of the Bretton Woods System", url: "https://www.federalreservehistory.org/essays/bretton-woods-created" },
    { label: "Bank of England: Our history (1694 to today)", url: "https://www.bankofengland.co.uk/about/history" },
    { label: "The Code of Hammurabi, full English translation (Yale Law School Avalon Project)", url: "https://avalon.law.yale.edu/ancient/hamframe.asp" },
    { label: "Austrian Path (sister course): monetary history and the hard-money debate", url: "https://evidex-cloud.github.io/droplet-labs-austrian-path/" },
  ],
};
