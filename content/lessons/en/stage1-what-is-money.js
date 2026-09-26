export default {
  id: "what-is-money",
  stage: 1,
  order: 1,
  title: "What Money Is: Medium of Exchange, Unit of Account & Store of Value",
  difficulty: "intro",
  prereqs: ["four-ideas"],

  oneLiner:
    "The textbook says money does three jobs: **medium of exchange, unit of account, store of value**. True, but that is only half the story. The more important half: **almost every dollar you own is an IOU written on someone else's balance sheet** — cash is a liability of the Fed, a deposit is a liability of your bank, USDC is a liability of its issuer. Once you see whose liability your money is, you understand why some money is “more money” than other money — and why bank runs, stablecoin depegs and Bitcoin's claim to be “money with no counterparty” all follow from the same logic.",

  intuition: `
Start with a question that sounds almost silly: **what exactly is the $5,000 your banking app says you have?**

Most people would answer: “It's my money, sitting in the bank.” But there is no drawer in the vault with your name on it and fifty hundred-dollar bills inside. What actually exists is this: **the $5,000 is a debt the bank owes you.** The moment you “deposit” cash, the bills become the bank's property, and what you get in return is a promise — “we will pay you $5,000 whenever you ask.” When you tap your card for a coffee, you are really transferring part of that promise to the coffee shop.

That is the heart of this lesson, and it sits squarely on **Idea ② — balance sheets & claims** (the map from Stage 0.2): **money is not a thing, it is a relationship** — a number recorded on the liability side of somebody's balance sheet. The paper in your wallet is no different. A dollar bill literally says “Federal Reserve Note” on it: it is a liability of the Federal Reserve.

The textbook view is still useful, though. To work as money, something has to do three jobs well:

- **Medium of exchange** — people accept it in trade, so you don't have to swap a goat for a pair of shoes;
- **Unit of account** — people price things, keep books and write contracts in it: the menu says “coffee $4,” not “coffee 0.00004 BTC”;
- **Store of value** — accept it today and it will still buy roughly the same basket next year.

Measure candidates against those three rulers and something interesting appears: **nothing scores top marks on all three.** Dollar cash is a superb medium of exchange and unit of account, but inflation nibbles at it every year (Stage 1.4). Gold has been a store of value for millennia, but you cannot buy a coffee with a gold bar. Bitcoin has risen many-fold over its short life, yet its price can move 5% in a day, so nobody wants to set their rent in it. Airline miles buy flights — until the airline quietly changes the redemption chart.

Which leads to the second, deeper point: **money comes in a hierarchy.** The closer to the top, the more certain it is. Reserves at the Federal Reserve are the final way banks settle with each other; nobody doubts them. Bank deposits sit one rung lower: in normal times they are as good as cash, but if the bank gets into trouble they may trade at a discount. Money-market fund shares and stablecoins sit lower again: they promise to redeem one-for-one, but that promise is only as good as the assets behind it and the issuer who made it. **In calm times every layer looks the same; in a crisis the hierarchy suddenly becomes visible** — which is Idea ③, liquidity & trust.

This lesson is the foundation for all of Stage 1. Next, Stage 1.2 shows how banks write the deposit IOU out of thin air; Stage 1.3 introduces the institution at the top of the pyramid, the central bank; and Stage 1.5 asks why people keep reaching back for “hard money” that is nobody's liability — gold, and later Bitcoin.

**In this lesson we break it into five pieces:**

- **① Three functions: a ruler for measuring “moneyness”**
- **② Barter is a myth: money started as a ledger**
- **③ Money is a liability: whose balance sheet is it written on?**
- **④ The pyramid of money: why some money is “more money”**
- **⑤ Money in the new era: stablecoins, Bitcoin and assets with no counterparty**
`,

  mechanics: `
### ① Three functions: a ruler for measuring “moneyness”

Economists list three functions of money, sometimes adding a fourth, the “standard of deferred payment” (the unit a loan contract is written in). Rather than treat them as a list to memorize, treat them as **a scoring ruler.** You can hold anything up to it and ask how money-like it is. Economists call that degree **moneyness.**

A **medium of exchange** needs to be widely accepted, divisible, portable, hard to counterfeit and cheap to transfer. Cigarettes served as money in Second World War prison camps because they ticked most of those boxes — but they also got smoked, so the supply was unstable.

A **unit of account** needs something people underrate: **price stability.** Picture a coffee shop pricing in Bitcoin. If Bitcoin rises 10% in a week, the owner has to reprint the menu weekly, and every supplier invoice, payroll run and lease contract is thrown into chaos. So even an excellent payment instrument struggles to become the unit of account if its purchasing power swings wildly day to day. **An economy tends to have one dominant unit of account, and it is almost always the local legal tender** — a network effect: everyone keeps books in it because everyone keeps books in it.

A **store of value** needs to hold purchasing power over long stretches. Here dollar cash is actually mediocre: at the Fed's 2% inflation target, $100 loses about half its purchasing power in 36 years (Rule of 72: \\(72 \\div 2 = 36\\); Stage 2.2 does this properly). Historically, better stores of value have been gold, land and quality equities — none of which are good media of exchange.

The key conclusion: **the three functions pull against each other.** A good medium of exchange needs to circulate widely and be happily accepted; a good store of value tends to be scarce and something people are reluctant to spend. Gresham's law — “bad money drives out good” — describes exactly this: people spend the money they trust less and hoard the money they trust more. So in practice you see a **division of labor**: people pay and keep accounts in dollars and store wealth in other assets.

### ② Barter is a myth: money started as a ledger

The textbook story goes like this: first there was barter; barter was painful because of the “double coincidence of wants” (you want shoes and have a goat, but the shoemaker doesn't want a goat); so people converged on one universally accepted commodity — shells, silver, gold — and money was born.

It is a tidy story, but anthropologists have struggled to find a single real society whose everyday economy ran mainly on barter. The more common path went the other way: **ledgers first, coins later.** Temples and palaces in Mesopotamia recorded on clay tablets who owed how much barley or silver (the history in Stage 0.3), and neighbors ran informal tabs — “take it now, we'll settle later.”

Two classic examples:

- **The stone money of Yap.** On the Pacific island of Yap, huge carved stone wheels were too heavy to move. When one changed hands, it stayed where it was — everyone simply **remembered** the new owner. One stone reportedly sat at the bottom of the sea and still counted as wealth that could be transferred, because what mattered was the record everyone accepted, not the stone.
- **English tally sticks.** The medieval English Exchequer recorded debts as notches on a stick, then split it lengthwise: creditor and debtor each kept half, and the halves had to match. The system lasted until 1826; when the old tallies were burned in 1834, the fire got out of control and destroyed most of the Palace of Westminster.

The lesson: **money is closer to “a shared ledger everyone accepts” than to any special substance.** Coins, notes, bank balances and blockchain balances are just different ways of keeping the record. That is also the key to Bitcoin: it is not really “a digital coin” but **a public ledger with no central bookkeeper** (Stage 12.1).

### ③ Money is a liability: whose balance sheet is it written on?

Almost all modern money can be found on the **liability side** of some balance sheet. T-accounts — assets on the left, liabilities on the right, used heavily in Stage 1.2 — make it obvious:

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The same dollar appears twice — on two balance sheets</text><rect x="20" y="40" width="190" height="200" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="115" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Federal Reserve</text><line x1="115" y1="68" x2="115" y2="230" stroke="var(--line)"/><text x="65" y="84" text-anchor="middle" font-size="10" fill="var(--muted)">Assets</text><text x="165" y="84" text-anchor="middle" font-size="10" fill="var(--muted)">Liabilities</text><text x="65" y="110" text-anchor="middle" font-size="11" fill="var(--ink)">Treasuries</text><text x="65" y="128" text-anchor="middle" font-size="11" fill="var(--ink)">MBS</text><rect x="122" y="98" width="84" height="22" rx="4" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="164" y="113" text-anchor="middle" font-size="11" fill="var(--orange-ink)">Currency</text><rect x="122" y="126" width="84" height="22" rx="4" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="164" y="141" text-anchor="middle" font-size="11" fill="var(--orange-ink)">Bank reserves</text><rect x="225" y="40" width="190" height="200" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Commercial bank</text><line x1="320" y1="68" x2="320" y2="230" stroke="var(--line)"/><text x="270" y="84" text-anchor="middle" font-size="10" fill="var(--muted)">Assets</text><text x="370" y="84" text-anchor="middle" font-size="10" fill="var(--muted)">Liabilities</text><text x="270" y="113" text-anchor="middle" font-size="11" fill="var(--ink)">Reserves</text><text x="270" y="131" text-anchor="middle" font-size="11" fill="var(--ink)">Loans</text><text x="270" y="149" text-anchor="middle" font-size="11" fill="var(--ink)">Bonds</text><rect x="327" y="98" width="84" height="22" rx="4" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="369" y="113" text-anchor="middle" font-size="11" fill="var(--blue)">Your deposit</text><text x="370" y="141" text-anchor="middle" font-size="11" fill="var(--ink)">Equity</text><rect x="430" y="40" width="190" height="200" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="525" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">You</text><line x1="525" y1="68" x2="525" y2="230" stroke="var(--line)"/><text x="475" y="84" text-anchor="middle" font-size="10" fill="var(--muted)">Assets</text><text x="575" y="84" text-anchor="middle" font-size="10" fill="var(--muted)">Liabilities</text><text x="475" y="113" text-anchor="middle" font-size="11" fill="var(--orange-ink)">Cash</text><text x="475" y="131" text-anchor="middle" font-size="11" fill="var(--blue)">Deposit</text><text x="475" y="149" text-anchor="middle" font-size="11" fill="var(--btc)">Bitcoin</text><text x="575" y="113" text-anchor="middle" font-size="11" fill="var(--ink)">Mortgage</text><path d="M206 109 C 300 180, 380 190, 452 110" fill="none" stroke="var(--orange)" stroke-width="1.5" stroke-dasharray="4 3"/><path d="M411 109 C 430 150, 440 150, 452 128" fill="none" stroke="var(--blue)" stroke-width="1.5" stroke-dasharray="4 3"/><text x="320" y="262" text-anchor="middle" font-size="11" fill="var(--muted)">Your asset = someone else's liability: cash is owed by the Fed, a deposit is owed by the bank</text><text x="320" y="280" text-anchor="middle" font-size="11" fill="var(--btc)" font-weight="600">The exception: Bitcoin (like gold) sits on nobody's liability side — an asset with no counterparty</text></svg><figcaption>Modern money is almost always a two-sided entry: an asset for the holder, a liability for the issuer.</figcaption></figure>

That one picture explains several things at once:

- **Money is exactly as safe as its issuer.** The Fed can create dollar reserves without limit, so its liabilities cannot default in dollar terms. A commercial bank cannot print money; its deposit liabilities are backed by its assets — loans and bonds. If those assets lose enough value, the deposits may not be paid in full. That is the root of every bank run (Stage 1.2, Stage 10.1).
- **“Saving” at a bank is really lending to it.** When you deposit $5,000, you legally become an **unsecured creditor** of the bank. Most people don't worry because deposit insurance (in the US, $250,000 per depositor per bank) and the central bank stand behind the system.
- **The quantity of money can grow “out of nothing.”** If a deposit is just a liability number on the bank's books, then when a bank makes a loan it can simply credit the borrower's account with a brand-new deposit — and money has been created. That is the whole subject of Stage 1.2.

### ④ The pyramid of money: why some money is “more money”

The economist Perry Mehrling offers a framework that makes all of this click: **the hierarchy of money.** Each layer is a promise to pay the layer above it:

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The pyramid of money: more certain at the top, more elastic below</text><polygon points="320,40 380,90 260,90" fill="var(--orange)"/><text x="320" y="80" text-anchor="middle" font-size="10" font-weight="700" fill="var(--surface)">Final</text><text x="400" y="70" font-size="11" fill="var(--ink)">Central-bank reserves & cash (final settlement)</text><polygon points="260,94 380,94 430,140 210,140" fill="var(--orange)" opacity=".75"/><text x="320" y="122" text-anchor="middle" font-size="11" font-weight="700" fill="var(--surface)">Bank deposits</text><text x="440" y="122" font-size="11" fill="var(--ink)">promise 1:1 into reserves/cash</text><polygon points="210,144 430,144 480,190 160,190" fill="var(--orange)" opacity=".5"/><text x="320" y="172" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Money funds · stablecoins</text><text x="490" y="172" font-size="11" fill="var(--ink)">promise 1:1 into deposits</text><polygon points="160,194 480,194 530,240 110,240" fill="var(--orange)" opacity=".28"/><text x="320" y="222" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Securities (Treasuries, bonds, stocks)</text><text x="540" y="222" font-size="11" fill="var(--ink)">sold at market</text><text x="320" y="264" text-anchor="middle" font-size="11" fill="var(--muted)">In calm times the layers look identical; in a crisis every “at par” promise is tested</text></svg><figcaption>The hierarchy of money: every layer is a claim on the one above. Runs, depegs and redemption waves are all the lower layer trying to convert upward at the same time.</figcaption></figure>

Three insights follow:

- **“At par” is a promise, not a physical fact.** Your deposit “equals” one dollar of cash because the bank promises so, backed by the central bank and deposit insurance. A money-market fund share “equals” one dollar because the fund holds short-term Treasuries and similar paper. In September 2008, the day after Lehman failed, a venerable money fund, the Reserve Primary Fund, “broke the buck” because it held Lehman paper — setting off a run across the whole industry (Stage 10.2).
- **Lower layers pay more but depend on someone else to convert.** Deposits usually earn less than the rate the central bank pays on reserves (the bank needs its margin); money funds usually pay more than deposits — because you carry one more layer of risk.
- **A crisis is the moment the hierarchy shows itself.** Normally, everyone treats deposits as cash. Once people doubt whether a layer's promise will be kept, they all rush to the layer above **at the same moment** — that is a run. This logic runs through every crisis in Stage 10.

### ⑤ Money in the new era: stablecoins, Bitcoin and assets with no counterparty

With the first four tools we can place the newcomers:

<table>
<tr><th>Candidate</th><th>Whose liability?</th><th>Medium of exchange</th><th>Unit of account</th><th>Store of value</th></tr>
<tr><td>Dollar cash / reserves</td><td>Federal Reserve</td><td>Strong</td><td>Strong (in the dollar zone)</td><td>Medium (inflation erodes it)</td></tr>
<tr><td>Bank deposit</td><td>Commercial bank</td><td>Strong</td><td>Strong</td><td>Medium (earns interest, carries bank risk)</td></tr>
<tr><td>Stablecoins (USDC, USDT…)</td><td>The issuer</td><td>Strong (on-chain, 24/7)</td><td>Borrows the dollar</td><td>Medium (dollar-like, plus issuer risk)</td></tr>
<tr><td>Gold</td><td>Nobody (physical)</td><td>Weak</td><td>Weak</td><td>Strong (millennia of history)</td></tr>
<tr><td>Bitcoin</td><td>Nobody (protocol)</td><td>Medium (global and permissionless, but slower and with fees)</td><td>Weak (volatile)</td><td>Contested (huge long-run gains, but 70–80% drawdowns)</td></tr>
<tr><td>Airline miles</td><td>The airline</td><td>Weak (only specific goods)</td><td>None</td><td>Weak (can be devalued unilaterally)</td></tr>
</table>

**Stablecoins** are the newest members of the third layer. The issuer takes in dollars, invests them in short-term Treasuries and bank deposits, and issues an equal number of tokens on a blockchain, promising one-for-one redemption. That puts the dollar on-chain, able to move around the world around the clock. But a stablecoin is still **its issuer's liability.** When Silicon Valley Bank failed in March 2023, Circle, the issuer of USDC, had about $3.3 billion of reserves stuck at that bank; USDC briefly traded down to roughly $0.87 and recovered only after regulators announced that all SVB deposits would be protected. **The hierarchy works exactly the same on-chain.** Stage 13.2 covers stablecoins in depth, and Stage 14.5 looks at how bank deposit tokens and stablecoins are converging.

**Bitcoin** is genuinely different: **it sits on nobody's liability side.** No issuer promises to redeem it, so no issuer can default on it or dilute it (the supply is fixed in code at 21 million, Stage 12.2). Like gold, it is a **bearer asset** with no counterparty. That is its strongest selling point and also its biggest cost: nobody stands behind its price, so it is far more volatile than the dollar and still struggles to serve as a unit of account.

**The whole lesson in one sentence: money is a widely accepted ledger entry, almost always someone's liability; its moneyness depends on how reliable the issuer is and how high it sits in the hierarchy.** In Stage 15.1 you will meet a new balance-sheet design built on exactly this idea: a listed company that puts counterparty-free Bitcoin on the asset side and issues bonds and preferred stock on the liability side — the digital asset treasury company (DAT), the focus of this course.
`,

  demo: "what-is-money",

  analogy: `
Think of the monetary system as **the token system at an amusement park.**

The main ticket office at the gate (the central bank) issues “official park tickets.” They are the final means of payment: every stall in the park ultimately settles in them. Inside the park there are a few big exchange booths (commercial banks). They don't print official tickets; instead they hand you a **stored-value card** that says “redeemable anytime for 100 official tickets.” You tap the card at any stall, and the stall owner happily accepts it — because they trust the booth to honor it.

Later, a few smaller kiosks appear (stablecoins and money funds) handing out **electronic wristbands** — “1 point on the wristband = $1 on a stored-value card” — usable in every corner of the park, even at midnight. Wonderfully convenient. But whether a wristband can actually be cashed depends on whether that kiosk's drawer really holds enough stored-value cards.

In normal times nobody cares about the difference between tickets, cards and wristbands; everyone just taps and goes. Then a rumor spreads that “one exchange booth's drawer is empty,” and everyone rushes at once to turn their cards into official tickets. **That is a bank run.** Meanwhile, outside the park, someone is holding a **gold bar** or a **Bitcoin wallet.** It is nobody's IOU; no booth or kiosk failing can touch it. The price of that independence: none of the stalls price anything in it, and what buys 100 tickets today might buy only 70 tomorrow.

The park will keep coming back. Stage 1.2 shows how the exchange booths manage to issue more cards than they hold tickets; Stage 1.3 shows the main office throwing open its gates in a panic; Stage 1.5 explains why people keep longing for the gold bar.
`,

  misconceptions: [
    "**“My bank deposit is my money, kept at the bank.”** — Legally, a deposit is the bank's liability to you; you are an unsecured creditor. The bank lends and invests the funds and keeps only a slice as liquidity. Deposit insurance and the central bank make it feel like cash, but that protection has limits.",
    "**“First humans bartered, then they invented money.”** — Anthropologists have found almost no societies that ran mainly on barter. The more common order was credit and record-keeping first (clay tablets, tally sticks, informal tabs) and coins later. Money is better understood as a shared ledger than as a special substance.",
    "**“A stablecoin is one dollar, so it is as safe as a dollar.”** — A stablecoin is its issuer's liability, and its par value depends on the quality and accessibility of the reserves. In March 2023 USDC briefly fell to about $0.87 because part of its reserves was stuck at SVB. It sits below bank deposits and central-bank money in the hierarchy.",
    "**“Bitcoin is too volatile, so it simply isn't money.”** — Moneyness is a matter of degree. Bitcoin is weak as a unit of account, but it has real users as a global permissionless medium of exchange and as a (contested) store of value. More precisely: it is a bearer asset with no counterparty whose moneyness holds in some functions and not others.",
    "**“Money's value comes from government force, not trust.”** — Legal-tender status and the need to pay taxes do support demand for fiat money. But everyday circulation also depends on the issuer's credibility and a functioning payment system. In high-inflation countries people switch en masse to dollars, which shows that legal compulsion alone cannot preserve moneyness.",
  ],

  quiz: [
    {
      q: "A coffee shop refuses to price its menu in Bitcoin. Which function is Bitcoin weakest at here?",
      options: [
        "Medium of exchange — Bitcoin cannot be used to pay",
        "Store of value — Bitcoin must lose value over time",
        "Standard of deferred payment — Bitcoin cannot appear in a contract",
        "Unit of account — its price moves too much, so prices would need constant resetting",
      ],
      answer: 3,
      explain: "A **unit of account** needs stable purchasing power. Bitcoin can be used to pay, but a 10% weekly swing makes menus, wages and contracts impractical to set in it, which is why nearly every economy still keeps books in its national currency.",
    },
    {
      q: "From a balance-sheet point of view, your $5,000 checking deposit is:",
      options: [
        "Your asset and, at the same time, a liability of the commercial bank",
        "A liability of the Federal Reserve",
        "The bank's asset and your liability",
        "Physical property that sits on no balance sheet",
      ],
      answer: 0,
      explain: "A deposit is **a debt the bank owes you**: an asset for you, a liability for the bank. Paper currency is the central bank's liability.",
    },
    {
      q: "In the hierarchy-of-money framework, which of these sits highest in the pyramid?",
      options: [
        "A stablecoin",
        "A money-market fund share",
        "A commercial bank's reserves held at the central bank",
        "A commercial bank deposit",
      ],
      answer: 2,
      explain: "**Central-bank reserves** are the final means of interbank settlement and sit at the top. Deposits promise conversion into reserves/cash; money funds and stablecoins promise conversion into deposits or short-term Treasuries.",
    },
    {
      q: "Why is Bitcoin often called an asset with no counterparty?",
      options: [
        "Because Bitcoin transactions carry no fees",
        "Because Bitcoin is nobody's liability — no issuer promises to redeem it",
        "Because Bitcoin's price is uncorrelated with every other asset",
        "Because Bitcoin trades on only one exchange",
      ],
      answer: 1,
      explain: "Like gold, Bitcoin **sits on nobody's liability side**, so no issuer can default on it — and, equally, nobody stands behind its price.",
    },
    {
      q: "USDC briefly trading at about $0.87 in March 2023 best illustrates which point?",
      options: [
        "Blockchain technology itself had a bug",
        "Even dollar cash can lose its peg",
        "A stablecoin's 1:1 value depends on the quality and accessibility of its issuer's reserves",
        "A Bitcoin crash dragged down every stablecoin",
      ],
      answer: 2,
      explain: "About $3.3 billion of USDC reserves were stuck at the failed Silicon Valley Bank. **The hierarchy works the same on-chain**: whether a lower layer converts at par depends on the assets behind it.",
    },
  ],

  further: [
    { label: "Bank of England Quarterly Bulletin (2014): Money in the modern economy — an introduction", url: "https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-in-the-modern-economy-an-introduction" },
    { label: "Perry Mehrling, The Inherent Hierarchy of Money (the original paper)", url: "https://sites.bu.edu/perry/files/2019/04/Mehrling_P_FESeminar_Sp12-02.pdf" },
    { label: "Federal Reserve Education (St. Louis Fed): Functions of Money (a short primer)", url: "https://www.federalreserveeducation.org/teaching-resources/economics/money/functions-of-money" },
    { label: "Circle: USDC reserves and transparency reports", url: "https://www.circle.com/transparency" },
    { label: "Satoshi Path (sister course): Bitcoin as a bearer asset, from the protocol up", url: "https://evidex-cloud.github.io/nextdawn-satoshi-path/" },
  ],
};
