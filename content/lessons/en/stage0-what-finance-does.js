export default {
  id: "what-finance-does",
  stage: 0,
  order: 1,
  title: "What Finance Actually Does: Moving Value Across Time, Space & Risk",
  difficulty: "intro",
  prereqs: [],

  oneLiner:
    "Finance sounds like a wall of jargon — yields, preferreds, stablecoins, mNAV. Underneath, it does only three things: it moves value **across time** (save today, spend later; borrow today, repay later), **across space** (from your account to someone else's, from one country to another), and **across risk** (from people who can't bear a risk to people who can, and who get paid to). This lesson starts from three headlines that a complete beginner named Lin stumbles on, uses those three kinds of moving to tie the whole course into one story — and makes a promise: by Stage 20.1 you'll be able to explain all three headlines and how they connect.",

  intuition: `
One evening in September 2026, Lin — who knows nothing about finance — is scrolling the news and hits three headlines in a row:

1. **“The 30-year US Treasury yield breaks above 5%”**
2. **“BlackRock's tokenized fund, stablecoins and DeFi are rewiring the plumbing of finance”**
3. **“Strategy issues a bitcoin-backed preferred stock yielding about 10%”**

Lin understands every word and none of the sentences. Is a yield “breaking above 5%” good news or bad news? What is a “tokenized fund,” and what plumbing is being rewired? Why would a company issue “preferred stock,” and what does it mean for bitcoin to “back” it? And the question that nags hardest: **are these three stories connected at all?**

They are — deeply. That is this course's promise: **by Stage 20.1 you'll be able to take each headline apart and then chain all three into a single line of cause and effect** — from America's budget deficits, to long-term interest rates, to bitcoin, to the listed companies that exist to hold bitcoin and fund themselves with bonds and preferred stock, to blockchains becoming a new layer of financial plumbing. Today we take the first step: **figuring out what finance actually does.**

Here's the punchline up front: **finance is a moving business. It doesn't move goods; it moves value. And there are only three directions to move it:**

- **Across time.** You have money now that you don't need yet (a saver). Someone else needs money now and will only earn it later (a borrower). Finance moves your money to them today and moves their future money back to you. The moving fee is called **interest** — the price of time. On a $400,000, 30-year mortgage, the monthly payment is about $1,686 at a 3% rate and about $2,661 at 7%. **Same house; change the price of time and you pay almost $1,000 more every month.**
- **Across space.** You're in Chicago and your family is in Manila; you buy something online from a seller in another state. Finance moves value from one account to another — **payments and settlement**. Most days it's as invisible as tap water. You only notice it's a whole system of pipes when something clogs: a bank fails, or a wire sits in limbo for three days.
- **Across risk.** You worry your house might burn down, but you could never absorb that loss alone. An insurer pools ten thousand households, each pays a small premium, and whoever has the fire gets paid. **The risk doesn't disappear — it's moved to someone better able to carry it**, or sliced into pieces and sold to people with different appetites.

These three kinds of moving are where the course's four big ideas come from (the next lesson, Stage 0.2, lays them out as a map). Moving value across time rests on **Idea ① The price of time**. Every move leaves an IOU on somebody's books — **Idea ② Balance sheets & claims**. Moving value across space runs on **Idea ③ Liquidity & trust (the plumbing)**. And moving it across risk is **Idea ④ Risk & leverage**. All four ideas show up in this lesson, but only to say hello.

Now look back at Lin's headlines. Each one lines up with a kind of moving:

- Headline one (the 30-year Treasury yield) is about **the price of time** — the single most important “moving fee” in the world just went up.
- Headline two (tokenized funds, stablecoins, DeFi) is about **the plumbing that moves value across space** getting rebuilt.
- Headline three (the bitcoin-backed preferred) is about **risk being re-sliced** — a company cuts bitcoin's risk into layers and packages the steadier layer as roughly 10% a year of income for investors.

**One story, three angles.** That's why this course isn't a pile of disconnected facts; it's a single thread.

You don't need any math for this lesson. Carry just one question with you: **“In this transaction, who is value moving from, who is it moving to — and is it moving across time, space or risk?”**

**This lesson breaks into five parts:**

- **① A one-line definition: finance moves value across time, space and risk**
- **② Across time: saving, borrowing and the price of time**
- **③ Across space: payments, settlement and the invisible plumbing**
- **④ Across risk: insurance, diversification and leverage**
- **⑤ Three roles and Lin's three headlines: savers, borrowers and intermediaries**
`,

  mechanics: `
### ① A one-line definition: finance moves value across time, space and risk

Textbooks say finance “allocates capital” and “intermediates funds.” True, but abstract. Try a picture instead: **finance is a giant logistics network, and the cargo is promises about future value.**

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The three ways finance moves value</text><rect x="20" y="42" width="190" height="200" rx="10" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="115" y="66" text-anchor="middle" font-size="13" font-weight="700" fill="var(--orange-ink)">Across time</text><text x="115" y="86" text-anchor="middle" font-size="11" fill="var(--muted)">today ⇄ the future</text><circle cx="60" cy="130" r="20" fill="var(--surface-2)" stroke="var(--orange)"/><text x="60" y="134" text-anchor="middle" font-size="10" fill="var(--ink)">Saver</text><circle cx="170" cy="130" r="20" fill="var(--surface-2)" stroke="var(--orange)"/><text x="170" y="133" text-anchor="middle" font-size="8.5" fill="var(--ink)">Borrower</text><path d="M82 122 L148 122" stroke="var(--orange)" stroke-width="2" marker-end="url(#wfaE)"/><path d="M148 140 L82 140" stroke="var(--orange)" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#wfaE)"/><text x="115" y="114" text-anchor="middle" font-size="10" fill="var(--ink)">money today</text><text x="115" y="158" text-anchor="middle" font-size="10" fill="var(--ink)">money later + interest</text><text x="115" y="196" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="600">Price: the interest rate</text><text x="115" y="214" text-anchor="middle" font-size="10" fill="var(--muted)">mortgages · bonds · pensions</text><text x="115" y="230" text-anchor="middle" font-size="10" fill="var(--muted)">Idea ①</text><rect x="225" y="42" width="190" height="200" rx="10" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="320" y="66" text-anchor="middle" font-size="13" font-weight="700" fill="var(--blue)">Across space</text><text x="320" y="86" text-anchor="middle" font-size="11" fill="var(--muted)">here ⇄ there</text><rect x="236" y="116" width="50" height="28" rx="5" fill="var(--surface-2)" stroke="var(--blue)"/><text x="261" y="134" text-anchor="middle" font-size="10" fill="var(--ink)">Payer</text><rect x="354" y="116" width="50" height="28" rx="5" fill="var(--surface-2)" stroke="var(--blue)"/><text x="379" y="134" text-anchor="middle" font-size="10" fill="var(--ink)">Payee</text><rect x="298" y="120" width="44" height="20" rx="4" fill="var(--surface)" stroke="var(--line)"/><text x="320" y="134" text-anchor="middle" font-size="9" fill="var(--muted)">pipes</text><path d="M286 130 L298 130 M342 130 L354 130" stroke="var(--blue)" stroke-width="2"/><text x="320" y="196" text-anchor="middle" font-size="11" fill="var(--blue)" font-weight="600">Price: fees + time + trust</text><text x="320" y="214" text-anchor="middle" font-size="10" fill="var(--muted)">cards · wires · stablecoins</text><text x="320" y="230" text-anchor="middle" font-size="10" fill="var(--muted)">Idea ③</text><rect x="430" y="42" width="190" height="200" rx="10" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="525" y="66" text-anchor="middle" font-size="13" font-weight="700" fill="var(--btc)">Across risk</text><text x="525" y="86" text-anchor="middle" font-size="11" fill="var(--muted)">risk-averse ⇄ risk-takers</text><circle cx="470" cy="112" r="6" fill="var(--btc)"/><circle cx="470" cy="130" r="6" fill="var(--btc)"/><circle cx="470" cy="148" r="6" fill="var(--btc)"/><path d="M478 112 L556 128 M478 130 L556 130 M478 148 L556 132" stroke="var(--btc)" stroke-width="1.5"/><rect x="556" y="116" width="54" height="28" rx="5" fill="var(--surface-2)" stroke="var(--btc)"/><text x="583" y="134" text-anchor="middle" font-size="10" fill="var(--ink)">Insurer</text><text x="525" y="196" text-anchor="middle" font-size="11" fill="var(--btc)" font-weight="600">Price: the risk premium</text><text x="525" y="214" text-anchor="middle" font-size="10" fill="var(--muted)">insurance · options · preferreds</text><text x="525" y="230" text-anchor="middle" font-size="10" fill="var(--muted)">Idea ④</text><text x="320" y="270" text-anchor="middle" font-size="11" fill="var(--ink)">Every move leaves a claim on somebody's balance sheet (Idea ②)</text><text x="320" y="288" text-anchor="middle" font-size="10" fill="var(--muted)">Real deals often move two or three at once: a 30-year fixed mortgage moves time and hands rate risk to the lender</text><defs><marker id="wfaE" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--orange)"/></marker></defs></svg><figcaption>Each kind of moving has its own price: the interest rate, transaction cost and trust, and the risk premium. All four of the course's ideas grow out of this picture.</figcaption></figure>

Three things to notice:

- **Finance doesn't bake bread or build cars, but it decides whether the bakery and the car plant can open today.** A factory that needs $100 million now and will only earn it back from car sales over ten years simply doesn't get built without someone moving value across time.
- **Every move has a price.** Moving across time costs interest. Moving across space costs fees, waiting time, and the risk that someone in the chain fails to pay. Moving across risk costs a risk premium: if you want someone to carry your risk, you pay them; if you're willing to carry someone else's, you get paid.
- **Real transactions often move two or three things at once.** That's why, in this lesson's demo, “what does this mainly move?” is a better question than “what does it only move?”

### ② Across time: saving, borrowing and the price of time

Income and spending don't line up over a lifetime. When you're young you want a home but haven't saved enough; in midlife you earn the most; in retirement the paychecks stop but the bills don't. Businesses have the same mismatch: the investment comes first, the revenue later. **Moving value across time is how finance lines up the income curve with the spending curve.**

The two ends of the move:

- **Savers** spend a little less today, hand the money over, and receive a claim that says “pay me back later” — a deposit, a bond, a retirement account.
- **Borrowers** spend a little more today and write an IOU that says “I'll pay you back later” — a mortgage, a student loan, a corporate bond, a Treasury.

The moving fee is the interest rate. Why charge at all? Because the saver gives up spending today, bears the risk that inflation thins out the money, and bears the risk the borrower won't pay. Stage 2.1 is devoted to why $100 today beats $100 next year, and Stage 2.3 hands you one formula that can price any future cash flow.

Here's a number that shows how heavy the price of time is. Suppose you borrow $400,000 for a home and repay it over 30 years (360 monthly payments):

<table>
<tr><th>Mortgage rate</th><th>Monthly payment (approx.)</th><th>Total interest over 30 years (approx.)</th></tr>
<tr><td>3%</td><td>$1,686</td><td>$207,000</td></tr>
<tr><td>5%</td><td>$2,147</td><td>$373,000</td></tr>
<tr><td>7%</td><td>$2,661</td><td>$558,000</td></tr>
</table>

From 3% to 7%, **the house doesn't change at all, yet the total price of pulling your future income into the present rises by about $350,000.** As of September 2026, US 30-year mortgage rates were around 7%; in 2021 they were under 3%. That gap alone decides whether a generation can afford to buy.

And what do mortgage rates follow? Broadly, long-term Treasury yields — and the 30-year Treasury yield is the star of Lin's first headline. As of September 25, 2026, the 30-year yield was about 5.5%, its highest level since 2004, and on September 16 the Fed raised its policy rate to a 3.75%–4.00% range, its first hike since 2023. **The US Treasury is treated as the “risk-free” borrower, so its yield is the benchmark price for moving money across time everywhere** (Stage 2.4). When it rises, mortgages, corporate bonds, stock valuations, bitcoin and even preferred stock all get repriced — that's Idea ①. Stage 4.5 spends a whole lesson on why the 30-year yield rises and what it does when it does.

### ③ Across space: payments, settlement and the invisible plumbing

You tap your phone to pay for a $5 coffee. The money seems to arrive instantly, but here's what really happens: your bank marks your deposit down by $5, the café's bank marks its deposit up by $5, and the two banks square up with each other through accounts at the central bank, the same day or a bit later. **No money flew anywhere. A chain of ledgers updated in sync.**

This machinery is called **payments and settlement**, and it's the plumbing of finance:

- **Payment** is the instruction: “give $5 of mine to them.”
- **Clearing** is working out who owes whom how much.
- **Settlement** is the final entry: the money now belongs to the recipient, irreversibly.

Like tap water, nobody thinks about it until it breaks. The pipes have three sore spots:

- **Slow.** A cross-border wire often takes one to three business days and passes through several correspondent banks.
- **Expensive.** For small cross-border transfers, fees plus the exchange-rate markup can easily run to several percent.
- **Trust-dependent.** Until settlement is final, you're exposed to the chance that someone in the middle fails. When Lehman Brothers collapsed in 2008, the scariest part wasn't its losses — it was that nobody knew who owed what to whom or who could still be trusted. The pipes froze.

Lin's second headline is about rebuilding those pipes. A **stablecoin** is a dollar-pegged token that moves on a blockchain, 24/7, across borders in minutes. A **tokenized fund** — BlackRock's BUIDL, for example, a fund that records shares of short-term US Treasuries on a blockchain — lets Treasury exposure move like a token and serve as collateral around the clock. **DeFi (decentralized finance)** is lending and trading executed automatically by code. As of September 2026, stablecoins totalled roughly $310 billion; the US stablecoin law, the GENIUS Act, was signed in July 2025, while the CLARITY Act, which would set rules for crypto market structure, failed a Senate procedural vote on September 15, 2026. **The plumbing is being rebuilt, but only half the building permits have been issued.** Stage 8.1 covers the traditional market plumbing, Stage 13.1 covers DeFi, and Stage 14.2 covers tokenized Treasuries.

### ④ Across risk: insurance, diversification and leverage

There are three basic ways to move risk:

**Technique one: pooling (insurance).** Suppose a house has a 1% chance of burning down each year, with a $300,000 loss. For one family, that's all-or-nothing: either nothing happens or they're ruined. But an insurer covering 10,000 homes can expect about 100 fires a year and about $30 million of claims — a “fair premium” of $3,000 per household. **The uncertainty that crushes one family averages out across ten thousand** — the law of large numbers. Add a margin for costs and profit and you have the premium you actually pay.

**Technique two: diversification.** You don't have to bet everything on one company. An index fund holds hundreds of stocks at once; if one goes bust, you lose only a sliver. **Diversification doesn't need anyone to carry your risk — it lets different risks cancel each other out.** Stage 11.1 proves something that surprises most people: adding an asset that's very volatile on its own, but doesn't move in lockstep with everything else, can actually lower a portfolio's overall risk.

**Technique three: slicing and handing off (derivatives, the capital stack).** The risk of a single asset can be cut into layers and sold to people with different appetites. The cautious take the layer that gets paid first and gets a fixed return; the bold take the layer that gets paid last but has no ceiling. A farmer uses futures to lock in a wheat price and hands the price risk to speculators (Stage 7.1). A company splits its claims into bonds, preferred stock and common stock, lined up in order of who gets paid first (Stage 6.1).

There's also a dangerous move in the opposite direction: **leverage**. Borrowing to buy a risky asset piles more risk onto yourself. Put in $100,000 of your own money plus $900,000 borrowed to buy a $1 million asset: if it rises 10%, your stake doubles; if it falls 10%, your stake is wiped out. **Leverage cuts both ways** — the heart of Idea ④.

Lin's third headline is technique three with a dash of leverage. A listed company called Strategy holds a very large amount of bitcoin. It issues preferred stock that promises dividends of roughly 10% a year and ranks ahead of the common stock in the payout order. In other words, **it slices bitcoin's risk into two layers: preferred holders take a relatively steady ~10%, and common shareholders take everything that's left over — gains and losses both — magnified, because the preferred layer works like borrowed money.** Whether that design is sound, and how sturdy it is, is exactly what the course's focus tier (Stages 15 through 18) takes apart. Stage 15.1 formally introduces this kind of company. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**

### ⑤ Three roles and Lin's three headlines: savers, borrowers and intermediaries

Finally, put people back into the picture. In any single transaction, every participant in an economy plays one of three roles:

- **Savers (the surplus side):** households with deposits, pension funds, sovereign wealth funds, foreign central banks buying Treasuries.
- **Borrowers (the deficit side):** families buying homes, companies building plants, governments running deficits.
- **Intermediaries:** institutions that connect the two ends and, along the way, carry or re-slice risk — banks, insurers, funds, exchanges, market makers, and in the new era, stablecoin issuers, DeFi protocols and digital asset treasury companies.

A few observations that matter:

- **One person can play all three roles at once.** You have a mortgage (borrower) and a retirement account (saver), and your bank lends out your deposits (so you're part of an intermediation chain).
- **An intermediary isn't just a mover; it has its own balance sheet.** A bank takes short-term deposits and makes long-term loans, so it carries the risk that all its depositors show up at once (Stage 1.2, Stage 10.1). **Almost every financial crisis is some intermediary's balance sheet giving way.**
- **The US government is the biggest borrower on Earth.** On August 18, 2026, total federal debt passed $40 trillion for the first time, with annual net interest costs on the order of $1 trillion. The bigger the borrower and the more it borrows, the more it moves the price of time — which brings us straight back to headline one.

Run Lin's three headlines through the three roles:

<table>
<tr><th>Headline</th><th>Main move</th><th>Borrower / issuer</th><th>Saver / investor</th><th>Where the course unlocks it</th></tr>
<tr><td>30-year Treasury yield breaks above 5%</td><td>Across time</td><td>US Treasury</td><td>Pensions, insurers, foreign investors, you</td><td>Stages 2, 4, 9</td></tr>
<tr><td>Tokenized funds, stablecoins, DeFi rewire the plumbing</td><td>Across space</td><td>Stablecoin issuers, funds</td><td>On-chain users, institutions</td><td>Stages 8, 13, 14</td></tr>
<tr><td>Strategy issues a ~10% bitcoin-backed preferred</td><td>Across risk (and time)</td><td>Strategy</td><td>Income-seeking investors</td><td>Stages 6, 15–18</td></tr>
</table>

**See it? In all three stories somebody is borrowing, savers are footing the bill, and the price is anchored to the same place — the Treasury yield.** When Treasuries themselves pay more than 5%, a preferred stock paying about 10% has to answer a pointed question: “What risk are those extra five percentage points compensating me for?” The full answer arrives in Stage 18.1 and Stage 20.1. The whole course is the walk from “I can't read this” to “I can answer that.”

**So what's new about the new era?** The three kinds of moving haven't changed in thousands of years. What changes is the plumbing and the way risk gets sliced: moving across time now includes on-chain lending and tokenized Treasuries; moving across space now includes stablecoins; moving across risk now includes listed companies that re-slice bitcoin's risk with bonds and preferred stock — plus a new wave of capital spending and pricing driven by AI (Stage 19). **Old logic, new tools.**
`,

  demo: "what-finance-does",

  analogy: `
Picture finance as an **enormous logistics company** — except the cargo isn't parcels, it's value.

The company runs three divisions.

**Division one is cold storage (across time).** You drop off food you can't eat this year and collect it next year. Meanwhile the warehouse lends that food to people who are short today, on the understanding that they'll return a bit extra next year. That “bit extra” is interest. How much the warehouses charge depends on what the most trusted warehouse in town — the Treasury — is quoting. When the Treasury raises its rate, every warehouse in town rewrites its price list. That's why a 30-year Treasury yield above 5% forces mortgages, corporate bonds, stocks and bitcoin to redo their math.

**Division two is the trunk-line delivery network (across space).** A parcel you ship goes through a sorting center, a long-haul truck and a local depot before it reaches the door. Normally all you see is “Delivered.” But when one sorting center shuts down, parcels back up across the whole city. Stablecoins and tokenized funds are like a new highway that never closes: faster and cheaper, though the rules of the road (the law) are still being written, and now and then a stretch caves in (hacks, depegs).

**Division three is insurance and repackaging (across risk).** A shipper worried about damage pays a small premium to hand the risk to someone whose job is carrying it. Someone else splits a full truckload into “priority crates” that arrive first and “bulk crates” that arrive last: the priority crates have a steady price and guaranteed delivery; the bulk crates are cheaper and riskier but might hold a pleasant surprise. A company that holds bitcoin as its core inventory and then issues preferred stock is doing exactly this repackaging: the preferred is the priority crate, the common stock is the bulk crate.

The whole company runs on one thing: **trust**. You trust the warehouse will still exist next year, that parcels won't vanish, that the insurer will actually pay. When trust breaks, everyone rushes to collect their goods at once — and that's a financial crisis.

Lin's three headlines are really three press releases put out the same week by the three divisions of this one company. The course's job is to walk you into headquarters and show you the single dispatch map that all three divisions share.
`,

  misconceptions: [
    "**“Finance is just stock trading and getting rich quick.”** — Trading stocks is a small corner of moving risk. The bulk of finance is the “boring” moving — mortgages, deposits, insurance, pensions, payments — that decides whether you can buy a home, whether companies can start building, and whether money arrives on time.",
    "**“Finance creates nothing; it just shuffles money around.”** — Finance doesn't build cars, but without moving value across time the car plant never gets built, and without insurance nobody sends a cargo ship across an ocean. The moving itself is the value: getting resources to the time, place and person that need them most. Finance does destroy value when the moving costs too much or when intermediaries hide risk (Stage 10).",
    "**“Interest rates only matter if you borrow.”** — The interest rate is the pricing benchmark for every asset. The yield on your savings, the price of the bonds in your pension, stock valuations, house prices, even bitcoin and preferred stock all get repriced along with the price of time (Idea ① in Stage 0.2).",
    "**“Blockchains will replace finance.”** — Blockchains change the plumbing — how records are kept and how settlement happens — not the three kinds of moving. On-chain loans still carry interest, a stablecoin is still some issuer's liability, and DeFi still has risks somebody must carry. New tools rebuild the pipes; the old logic still applies.",
    "**“Once risk is transferred, it's gone.”** — Risk can be moved, sliced or pooled, never erased. The lesson of 2008 was exactly this: everyone thought risk had been “spread out,” but it had quietly piled up on a few institutions' balance sheets (Stage 10.2).",
  ],

  quiz: [
    {
      q: "In spring, a farmer sells wheat futures for autumn delivery at a fixed price. Which kind of moving is this mainly?",
      options: ["Across time: pulling future income into today", "Across space: shipping wheat to another city", "Across risk: handing the risk of a price drop to someone willing to carry it", "None — it's pure speculation"],
      answer: 2,
      explain: "**The farmer locks in a selling price**, passing the risk that autumn wheat prices crash to the buyer of the futures. That's a textbook move across risk (a hedge); Stage 7.1 covers it in detail.",
    },
    {
      q: "On a $400,000, 30-year mortgage, the rate rises from 3% to 7%. Roughly what happens to the monthly payment?",
      options: ["Almost nothing, because the principal didn't change", "It rises from about $1,686 to about $2,661", "It rises from about $1,686 to about $5,000", "It more than doubles, because the rate more than doubled"],
      answer: 1,
      explain: "On a standard amortizing loan the payment goes from **about $1,686 to about $2,661** — nearly $1,000 more a month and about $350,000 more interest over 30 years. The payment doesn't double with the rate because part of every payment is principal.",
    },
    {
      q: "Which statement best describes an intermediary's role in finance?",
      options: [
        "It connects savers and borrowers, and its own balance sheet carries or re-slices risk",
        "It only collects fees and never bears any risk",
        "It exists only in stock markets; banks don't count",
        "It's a pre-blockchain relic; DeFi has no intermediaries at all",
      ],
      answer: 0,
      explain: "Banks, insurers, funds and exchanges are all intermediaries, and **each has its own balance sheet**, so they bear maturity-mismatch, credit and liquidity risk. Almost every crisis starts with an intermediary's balance sheet failing. DeFi protocols and stablecoin issuers are new kinds of intermediaries.",
    },
    {
      q: "Lin's third headline (Strategy issuing a ~10% bitcoin-backed preferred) is mainly an example of what?",
      options: [
        "Moving across space: making bitcoin arrive faster",
        "A government borrowing to cover a deficit",
        "A company paying out charitable dividends",
        "Moving across risk: slicing bitcoin's risk into a preferred layer and a common layer",
      ],
      answer: 3,
      explain: "The preferred gets a fixed dividend and is paid ahead of the common; the common takes everything left over, magnified. **That's risk being sliced and repriced.** Stage 6.2 introduces preferred stock, and Stages 15–18 dissect these companies. Not investment advice.",
    },
    {
      q: "Why does a rising 30-year Treasury yield ripple through all assets?",
      options: [
        "Because the government orders every asset to fall in price",
        "Because the Treasury yield is the benchmark price of moving money across time, and every other return is measured against it",
        "Because only bond investors are affected; other assets aren't",
        "Because a higher Treasury yield means bitcoin must go up",
      ],
      answer: 1,
      explain: "Treasuries are treated as the “risk-free” borrower, so **their yield anchors the price of time**. When Treasuries alone pay over 5%, stocks, property, bitcoin and preferreds must offer higher expected returns to attract buyers, so their prices adjust (Idea ①; Stage 2.4, Stage 4.5).",
    },
  ],

  further: [
    { label: "Federal Reserve: The Fed Explained (official primer on how the US financial system works)", url: "https://www.federalreserve.gov/aboutthefed/the-fed-explained.htm" },
    { label: "US Treasury: Daily Treasury Par Yield Curve Rates (official 30-year yield data)", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026" },
    { label: "Robert Shiller, Yale Open Course: Financial Markets (ECON 252)", url: "https://oyc.yale.edu/economics/econ-252" },
    { label: "US Treasury Fiscal Data: Debt to the Penny (daily federal debt)", url: "https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/" },
  ],
};
