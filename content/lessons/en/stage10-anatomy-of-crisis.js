export default {
  id: "anatomy-of-crisis",
  stage: 10,
  order: 1,
  title: "Anatomy of a Financial Crisis: Leverage, Maturity Mismatch & Runs",
  difficulty: "systems",
  prereqs: ["banks-create-money", "central-banks", "repo-money-markets"],

  oneLiner:
    "Take almost any financial crisis apart and you find the same skeleton: **a thin cushion of own capital (leverage), funded with money that can be demanded back at short notice (maturity mismatch), invested in long-lived assets that can't be sold quickly and can't be valued easily (opacity)**. In normal times the machine hums. Once doubt appears, **“whoever runs first gets paid” makes running the rational move**, and the fire sale that follows turns the doubt into fact. This lesson lays out that skeleton, the Diamond–Dybvig model, fire sales and contagion, and the lender-of-last-resort toolkit — every case that follows (2008, SVB, Terra, FTX) is the same skeleton in different clothes.",

  intuition: `
Picture a small-town bank. A hundred depositors have each put in $9,000, for $900,000 in total; the owner has put in $100,000 of their own capital. So the bank has $1,000,000 to work with. It keeps $100,000 in the vault as cash and lends the other $900,000 to townspeople as 10-year mortgages.

On a normal day nothing happens. One or two people come in to withdraw, the vault cash is more than enough, the mortgages pay every month, and the bank earns the gap between the low rate it pays on deposits and the higher rate it charges on loans. **A bank's whole trick is turning money people might want tomorrow into money someone else can keep for ten years** — the “loans create deposits” and maturity-transformation story from Stage 1.2.

Here is the catch: **those $900,000 of mortgages cannot become cash tomorrow.** If the bank were forced to dump them today, buyers would sense the desperation and bid sixty or seventy cents on the dollar. Loans carried at $900,000 might fetch $600,000 in a hurry.

Now a rumor goes around town: “I hear a lot of the bank's loans have gone bad.” Maybe it's false. What do you do?

- If nobody else withdraws, you don't need to either — your money is perfectly safe where it is.
- But if **everybody else goes to the bank**, the first people at the counter get paid in cash, and the latecomers have to wait while the bank sells mortgages at fire-sale prices. The more it sells, the more it loses, and **the people at the back of the line may get nothing.**

So even if you are convinced the bank is sound, as long as you **worry that others will run**, the smart move is to run first. That is the cold logic of a bank run: **it doesn't need the bank to be broken; it only needs people to believe that other people believe it is.** In 1983 Douglas Diamond and Philip Dybvig turned this into a model, and in 2022 they shared the Nobel Prize in economics with Ben Bernanke for it.

Put numbers on how fragile this is. With 10% capital, 10% cash and a fire-sale price of two-thirds of book value, all it takes is **one-third of depositors** showing up at once. The first $100,000 comes out of the vault. The next $200,000 has to be raised by selling $300,000 of mortgages at two-thirds of face — **a $100,000 loss from the fire sale alone**, which wipes out the owner's entire capital. One more withdrawal and the bank is insolvent. **A perfectly healthy bank has been knocked over by the act of everyone asking for their money.**

This lesson rests on two of the four ideas. **Idea ③, liquidity and trust (the plumbing):** a crisis is a run that happens when trust snaps and money suddenly stops flowing through the pipes. **Idea ④, risk and leverage:** leverage means a small loss can erase all the capital, while fire sales and margin calls make markets fall in a self-reinforcing way (the liquidation cascades of Stage 7.5 are close cousins).

Why study the skeleton before the case studies? Because **the clothes change every time but the bones almost never do.** In 2008 the run hit the repo market and money funds (Stage 10.2). In 2023 it hit Silicon Valley Bank's tech-company depositors, whose money was tied up in long bonds that had fallen in price (Stage 10.3). In 2022 it hit Terra's stablecoin and FTX's customer accounts (Stage 10.5). When you reach stablecoins in Stage 13.2 and stress-test a DAT in Stage 18.2, you will ask the same three questions: **Who can demand their money back, and how fast? How quickly, and at what discount, can the assets be turned into cash? Who stands behind it at the end?**

**In this lesson we break it into five pieces:**

- **① Three ingredients: leverage, maturity mismatch and opacity**
- **② Diamond–Dybvig: why running is rational**
- **③ Fire sales and contagion: from one firm to the whole system**
- **④ The fire extinguishers: lender of last resort, deposit insurance and capital**
- **⑤ Runs in new clothes: shadow banks, money funds, stablecoins and DATs**
`,

  mechanics: `
### ① Three ingredients: leverage, maturity mismatch and opacity

Financial historians have combed through centuries of crises — Reinhart and Rogoff's *This Time Is Different* (2009) covers eight centuries of data — and the recipe is strikingly stable. Almost every systemic crisis needs three things present at once:

- **Leverage.** Own capital is a small slice of total assets. A bank with 10% capital is wiped out by a 10% fall in its assets; an investment bank with 3% capital (Lehman ran at roughly 30-to-1 before 2008) is wiped out by a fall of a little over 3%. **Leverage decides how big a loss it takes to kill you.**
- **Maturity and liquidity mismatch.** The liabilities can be called **on demand or at short notice** — checking deposits, overnight repo, money-fund shares, customer balances at an exchange — while the assets are **long-dated or hard to sell fast**: mortgages, corporate loans, long bonds, securitized packages, venture stakes. **Mismatch decides how fast panic turns into a demand for cash.**
- **Opacity.** Outsiders cannot quickly tell what the assets are worth. A bank's loan book, a 2007 CDO, the house token sitting on FTX's balance sheet in 2022 — all things nobody examines in good times and nobody can value in bad ones. **Opacity decides how fast doubt spreads.**

Take away any one of the three and you usually get a loss rather than a crisis:

<table>
<tr><th>Situation</th><th>Leverage</th><th>Mismatch</th><th>Opacity</th><th>Outcome</th></tr>
<tr><td>A person's fully paid stock falls 50%</td><td>None</td><td>None</td><td>Low</td><td>A loss, but nobody can “run” on you</td></tr>
<tr><td>A pension fund holding long Treasuries outright</td><td>Low</td><td>Low (very long liabilities)</td><td>Low</td><td>Paper loss; can wait until maturity</td></tr>
<tr><td>A 2008 investment bank</td><td>About 30x</td><td>Overnight repo funding long securities</td><td>High (complex securitizations)</td><td>Run, failure or rescue</td></tr>
<tr><td>Silicon Valley Bank, 2023</td><td>Over 10x</td><td>Demand deposits funding long bonds</td><td>Medium (losses in the footnotes)</td><td>Run to death in two days</td></tr>
</table>

Keep two words apart that people constantly blur: a **liquidity crisis** (the assets are sufficient, they just can't become cash fast enough) and a **solvency crisis** (the assets were never enough to cover the debts). In practice each turns into the other. A liquidity squeeze forces fire sales, and fire-sale discounts make you genuinely insolvent; a rumor of insolvency triggers a liquidity squeeze. **The most dangerous thing about a crisis is that the line between the two dissolves in the panic.**

### ② Diamond–Dybvig: why running is rational

Diamond and Dybvig's 1983 paper in the *Journal of Political Economy*, “Bank Runs, Deposit Insurance, and Liquidity,” uses a stripped-down model to make two points.

**First, why banks are valuable.** People don't know in advance when they will suddenly need cash. Invest directly in a long project and an emergency forces you out at a loss; hold only cash and you forgo the long-term return. A bank pools everyone: statistically only a fraction will need money in any period, so it holds enough cash for them and invests the rest long. **Everyone gets insurance against the need for cash and still shares in the long-term return.** That is the real social value of maturity transformation — it is a genuine service, not a con.

**Second, the same arrangement naturally has two equilibria.**

- **The good equilibrium:** only people who truly need cash withdraw, the vault covers them, the long projects mature, and everyone collects what was promised.
- **The bad equilibrium:** everyone expects everyone else to withdraw, so everyone does. The bank has to liquidate long projects early at a discount, and the cash is gone before the back of the line arrives.

The mechanism that makes this work is **sequential service** — first come, first served. The bank pays in order of arrival, the early birds are paid in full, and the whole loss lands on the latecomers. **That makes running each depositor's best response, regardless of the bank's fundamentals.** Any sufficiently visible signal — a headline, a photo of a queue, a viral post — can tip the system from the good equilibrium to the bad one.

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><defs><marker id="aoc-ar-en" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><text x="155" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Small-town bank balance sheet ($k)</text><text x="95" y="44" text-anchor="middle" font-size="11" fill="var(--muted)">Assets</text><text x="215" y="44" text-anchor="middle" font-size="11" fill="var(--muted)">Liabilities &amp; capital</text><rect x="40" y="52" width="110" height="20" rx="3" fill="var(--green-soft)" stroke="var(--green)"/><text x="95" y="66" text-anchor="middle" font-size="11" fill="var(--ink)">Cash 100</text><rect x="40" y="72" width="110" height="180" rx="3" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="95" y="150" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">10-yr mortgages 900</text><text x="95" y="168" text-anchor="middle" font-size="10" fill="var(--muted)">Fire sale: ~2/3 of book</text><rect x="160" y="52" width="110" height="180" rx="3" fill="var(--red-soft)" stroke="var(--red)"/><text x="215" y="130" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Demand deposits 900</text><text x="215" y="148" text-anchor="middle" font-size="10" fill="var(--muted)">Withdrawable any time</text><rect x="160" y="232" width="110" height="20" rx="3" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="215" y="246" text-anchor="middle" font-size="11" fill="var(--ink)">Capital 100</text><text x="155" y="276" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="600">1/3 of depositors run → fire-sale loss 100 → capital gone</text><text x="480" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The self-reinforcing run loop</text><rect x="330" y="46" width="130" height="50" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="395" y="68" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Withdrawals</text><text x="395" y="84" text-anchor="middle" font-size="10" fill="var(--muted)">First come, first served</text><rect x="500" y="46" width="130" height="50" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="565" y="68" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Fire-sell assets</text><text x="565" y="84" text-anchor="middle" font-size="10" fill="var(--muted)">At a discount</text><rect x="500" y="176" width="130" height="50" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="565" y="198" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Losses eat capital</text><text x="565" y="214" text-anchor="middle" font-size="10" fill="var(--muted)">Leverage amplifies</text><rect x="330" y="176" width="130" height="50" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="395" y="198" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Doubt becomes fact</text><text x="395" y="214" text-anchor="middle" font-size="10" fill="var(--muted)">Longer queues</text><line x1="462" y1="71" x2="496" y2="71" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#aoc-ar-en)"/><line x1="565" y1="98" x2="565" y2="172" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#aoc-ar-en)"/><line x1="498" y1="201" x2="464" y2="201" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#aoc-ar-en)"/><line x1="395" y1="174" x2="395" y2="100" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#aoc-ar-en)"/><text x="480" y="140" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">Self-fulfilling</text><text x="480" y="256" text-anchor="middle" font-size="10.5" fill="var(--muted)">Break the loop: a lender of last resort,</text><text x="480" y="272" text-anchor="middle" font-size="10.5" fill="var(--muted)">deposit insurance, thicker capital</text></svg><figcaption>Left: a healthy bank with short liabilities, long assets and thin capital. Right: withdrawals → fire sales → losses → doubt → more withdrawals. The loop does not need the original rumor to be true.</figcaption></figure>

Now generalize the arithmetic from the intuition. Let capital be E, cash C, withdrawals W, and let a fire sale realize only a fraction p of book value (p = 2/3 above). Once W exceeds C, the bank must sell (W − C)/p of book assets and books a loss:

$$
Fire-sale loss = (W − C) × (1/p − 1)
Insolvency threshold: W* = C + E × p / (1 − p)
Example: W* = 100 + 100 × (2/3)/(1/3) = 300 ($k), one-third of deposits
$$

The formula points to exactly three ways to harden a bank: **hold more cash (C up), hold more capital (E up), hold assets that sell closer to book (p up).** It also explains the post-2008 rulebook: the Liquidity Coverage Ratio (LCR) requires a stock of high-quality liquid assets and higher capital ratios raise E — they push up C, p and E respectively.

### ③ Fire sales and contagion: from one firm to the whole system

One failed bank is a tragedy; many failing together is a crisis. Four transmission channels turn a local problem into a systemic one:

- **Fire-sale externalities.** A dumps assets and drives the price down; B holds similar assets and, marking to market, takes a loss without selling a thing. Shleifer and Vishny (1992) pointed out that the natural buyers — the specialists who understand the asset best — are usually **peers in trouble at the very same moment**, which is why fire-sale prices get so absurdly low.
- **Margin spirals.** Anyone borrowing against assets (repo, margin accounts, derivatives) faces a margin call or a higher haircut when prices fall, has to sell more, and pushes prices lower still. Brunnermeier and Pedersen (2009) called this a **liquidity spiral**: market liquidity (can you sell it?) and funding liquidity (can you borrow against it?) drag each other down. The liquidation cascades of Stage 7.5 and the on-chain liquidations of Stage 13.4 are the same spiral.
- **Counterparty contagion.** A owes B; A fails and B books a loss. Worse, **nobody knows who is exposed to A and by how much**, so everyone tightens up on everyone. The explosion in interbank lending spreads after Lehman in 2008 was exactly this “nobody trusts anybody” moment.
- **Information contagion.** A's failure sends everyone to re-examine institutions that look like A. After Silicon Valley Bank fell in March 2023, the market immediately screened every regional bank with lots of uninsured deposits and big bond losses; Signature Bank was closed two days later, and First Republic was seized and sold to JPMorgan Chase on May 1.

**What all four share: individually rational self-protection — selling assets, cutting credit lines, pulling deposits — adds up to collective disaster.** It is the fallacy of composition in financial form, and it is why a crisis needs someone who does *not* act on individual rationality to step in.

### ④ The fire extinguishers: lender of last resort, deposit insurance and capital

**The lender of last resort.** In 1873 Walter Bagehot, editor of *The Economist*, wrote in *Lombard Street* the principle central banks still treat as scripture: in a panic, a central bank should **lend freely, at a penalty rate, against good collateral.** The logic is clean. A run is good assets that can't be turned into cash fast enough, so the central bank lends cash against the assets' normal value and the bank never has to fire-sell — the loop breaks at step two. The penalty rate discourages abuse in normal times; the good-collateral rule keeps the central bank from propping up firms that are genuinely insolvent. Stage 1.3 introduced this role at the Fed; Stage 10.2 shows how far beyond banks it was stretched in 2008, and Stage 10.3 shows the 2023 Bank Term Funding Program lending against collateral at **par**, not market value.

**Deposit insurance.** The most elegant result in Diamond–Dybvig is this: **if depositors are sure their money is safe whether or not others run, the bad equilibrium disappears** — and the government usually pays nothing, because nobody runs. About 9,000 US banks failed between 1930 and 1933; the Banking Act of 1933 created the Federal Deposit Insurance Corporation (FDIC), which began insuring deposits in 1934, and classic retail runs all but vanished from the US afterward. Today coverage is $250,000 per depositor per bank (raised in 2008, made permanent in 2010).

**Capital and liquidity rules.** In the formula above, thicker capital (E) and more liquid assets (C and p) directly raise the run threshold. After 2008, Basel III raised capital ratios and added the Liquidity Coverage Ratio and the Net Stable Funding Ratio.

Every extinguisher has a cost:

- **Moral hazard.** Firms that expect to be rescued take more risk; insured depositors stop policing their bank.
- **The perimeter problem.** Insurance and rescues cover “banks,” so risk migrates to whatever isn't covered — which is the next section.
- **Fiscal and political cost.** Rescues use taxpayer money or the central bank's balance sheet. The anger at “bailing out Wall Street, not Main Street” is the backdrop to the headline embedded in Bitcoin's genesis block in January 2009 (Stage 10.2).

### ⑤ Runs in new clothes: shadow banks, money funds, stablecoins and DATs

Deposit insurance got rid of depositors lining up outside branches. It did not get rid of **maturity mismatch** itself. The mismatch just moved house:

- **The repo market (Stage 8.3).** Institutions borrow overnight against securities. In 2007–08 lenders sharply raised haircuts or refused to roll the loans at all — Gorton and Metrick called it the **run on repo**, a bank run without the photo of the queue, aimed at investment banks.
- **Money market funds.** Shares promise “a dollar is a dollar” while the money sits in commercial paper and other short debt. On September 16, 2008 the Reserve Primary Fund “broke the buck” because it held Lehman paper, setting off a stampede out of money funds; in March 2020 prime money funds faced heavy redemptions again.
- **Stablecoins (Stage 13.2).** Holders can redeem at $1 on demand while reserves sit in Treasury bills, bank deposits or other assets. In March 2023 USDC's issuer had about $3.3 billion of reserves at Silicon Valley Bank; when that news broke, USDC briefly traded down to roughly 87 cents — **a bank run traveling through the plumbing onto the blockchain.** Terra's algorithmic stablecoin went further: it had no full reserves at all (Stage 10.5).
- **Crypto lenders and exchanges.** They promised instant withdrawals while lending customer assets out or even funneling them into risky bets. Celsius and FTX in 2022 were textbook runs (Stage 10.5).

**The new-era angle: why DAT liabilities are deliberately shaped so nobody can run.** Apply this lesson's framework to a digital asset treasury company (from Stage 15.1 on). Its asset is **highly volatile but sellable 24/7** — bitcoin. Its funding is **common stock, perpetual preferred stock and longer-dated convertible notes.** Nobody can demand redemption of common or perpetual preferred; converts have fixed maturity or put dates rather than rolling overnight. The liability side has had the “withdraw any time” piece designed out of it. That is what DATs mean when they say they have “no margin calls” (Stage 7.5).

The framework also warns that **a run can come back in another form.** A DAT relies on selling new securities to pay dividends and keep buying. If the market suddenly stops buying its stock or preferreds — mNAV falls below 1, capital markets shut — that is a run on *new funding*. The stress test in Stage 18.2 and the mNAV-compression lesson in Stage 18.3 ask the same questions layer by layer: who can demand money, how fast, and from what will it be paid?

**One line to carry forward: crisis = short money + long assets + thin capital + poor visibility, meeting a signal that makes people doubt.** Learn to spot those four things in any new institution and you have learned to read crises.
`,

  demo: "anatomy-of-crisis",

  analogy: `
Think of a bank as **a cinema with a single narrow exit.**

Most nights people wander in and out a few at a time, and the narrow door is plenty. The owners are happy to save money on doorways and fill the space with seats instead — turning short money into long assets. That is maturity transformation: efficient, and fine almost all of the time.

Then one night someone shouts “Fire!” — maybe it's only a cigarette. Every person in the audience knows the same thing: **if everyone heads for the door, the first ones out are safe and the last ones are trapped.** So even if you think there's probably no fire, you stand up and move toward the exit. When you move, your neighbors become surer that something is wrong. That is the bad Diamond–Dybvig equilibrium: **the panic itself causes the crush.**

The cinema has three ways to prevent disaster:

- **Build wider doors:** hold more cash and more easily sold assets (liquidity rules).
- **Announce “Everyone will be evacuated safely — there is no need to push,”** and have people believe it (deposit insurance).
- **Keep a fire brigade on standby** that can knock a huge hole in the wall at a moment's notice (a lender of last resort lending cash against normal value).

And leverage? That is the cinema selling more tickets than it has seats. Nobody notices on a quiet night; the moment the room has to be cleared, the shortfall is exposed all at once.

From the 2008 investment banks to Silicon Valley Bank in 2023 to FTX in 2022, you can put the same questions to every crisis: **How narrow is the door? How oversold are the tickets? Did someone shout “Fire”? Is the fire brigade coming?**
`,

  misconceptions: [
    "**“If a bank suffers a run, it must have been rotten already.”** — Not necessarily. The core result of Diamond–Dybvig is that a fundamentally sound bank can be brought down simply because people expect others to run. Sequential service makes running rational, and fire-sale discounts turn a liquidity problem into a solvency problem. Real runs usually do start from a real weakness (SVB's large bond losses), but their speed and size far exceed the weakness itself.",
    "**“Deposit insurance means runs are a thing of the past.”** — Insurance ends runs by small retail depositors. Corporate deposits above the limit (roughly nine-tenths of SVB's deposits were uninsured), repo lenders, money-fund holders, stablecoin holders and exchange customers are not covered. Risk migrates to wherever the insurance stops — which is the whole story of shadow banking.",
    "**“A lender of last resort just uses taxpayer money to rescue bad banks.”** — Bagehot's rule says the opposite: lend at a penalty rate, only against good collateral, to fix illiquidity, not insolvency. In practice the line is often crossed (the 2008 AIG rescue) and moral hazard is real, but by design it breaks the fire-sale loop, and many emergency loans were later repaid with interest.",
    "**“Leverage only magnifies gains and losses; it doesn't affect stability.”** — Leverage also sets how large a loss it takes to make you insolvent, and therefore when others start doubting you. A bank with 10% capital is insolvent if a third of its depositors run; a firm with 3% capital can be tipped over by a small price dip or a slightly higher repo haircut.",
    "**“Bitcoin and DATs can't have runs because there are no banks involved.”** — Bitcoin itself has no maturity mismatch, but the institutions built around it can: exchanges and lenders promising instant withdrawals (Celsius and FTX in 2022) and stablecoins redeemable from reserves. A DAT's common and perpetual preferreds can't be redeemed, but it depends on continuous financing, and shut capital markets are a run of a different kind.",
  ],

  quiz: [
    {
      q: "A bank has $100k of capital, $100k of cash, $900k of loans at book and $900k of deposits; a fire sale realizes only two-thirds of book value. How much must depositors withdraw before fire-sale losses alone wipe out the capital?",
      options: [
        "$100k — the bank fails the moment the cash runs out",
        "$900k — only when every deposit is gone",
        "$300k — about one-third of deposits",
        "$450k — half of deposits",
      ],
      answer: 2,
      explain: "W* = C + E × p/(1 − p) = 100 + 100 × 2 = 300. The first $100k comes from cash; the next $200k requires selling $300k of loans, a $100k loss that exactly erases the capital. **The run itself knocks over a healthy bank.**",
    },
    {
      q: "In the Diamond–Dybvig model, what makes running the rational choice for each depositor?",
      options: [
        "Sequential service: early arrivals are paid in full and losses fall on latecomers",
        "Banks always embezzle depositors' money",
        "Depositors are inherently irrational and prone to panic",
        "Rates are too low, so depositors want to move into stocks",
      ],
      answer: 0,
      explain: "**First come, first served** is the key. If you expect others to run, running first is your best response — whatever the bank's fundamentals. That gives the same bank a good and a bad equilibrium.",
    },
    {
      q: "What lender-of-last-resort principle did Bagehot set out in Lombard Street (1873)?",
      options: [
        "In a crisis the central bank should buy every asset unconditionally",
        "In a crisis the central bank should let weak banks fail and lend nothing",
        "In a crisis the central bank should cut rates to zero and print money for depositors",
        "Lend freely, at a penalty rate, against good collateral",
      ],
      answer: 3,
      explain: "All three parts matter: lending freely stops fire sales; the penalty rate prevents abuse in normal times; good collateral confines help to illiquidity rather than insolvency.",
    },
    {
      q: "Which of these is **not** a typical channel that turns one firm's trouble into a systemic crisis?",
      options: [
        "Fire sales depress prices of similar assets and hit every mark-to-market holder",
        "Margin spirals: prices fall → margin calls → forced selling",
        "A company's revenue slowly declines because its product is going out of fashion",
        "Information contagion: markets scrutinize every institution that looks similar",
      ],
      answer: 2,
      explain: "A slow revenue decline is an ordinary business problem with no “short money + forced selling + chain reaction” amplifier. The other three are classic contagion channels.",
    },
    {
      q: "Why does funding a DAT with common stock, perpetual preferreds and long-dated converts “design out” the run — and what risk remains?",
      options: [
        "Because bitcoin cannot fall, so there is no risk",
        "Nobody can demand redemption of these securities; but the DAT depends on continuous financing, and shut capital markets are another kind of run",
        "Because DATs are covered by deposit insurance",
        "Because preferred holders can redeem at par at any time, which makes it safe",
      ],
      answer: 1,
      explain: "Common and perpetual preferreds carry **no redemption right**, and converts have fixed terms rather than overnight rolls, so there is no queue at the counter. But paying dividends and buying more coins both rely on issuing new securities — Stages 18.2 and 18.3 test exactly this “run on funding.”",
    },
  ],

  further: [
    { label: "Diamond & Dybvig (1983), Bank Runs, Deposit Insurance, and Liquidity (Journal of Political Economy)", url: "https://www.jstor.org/stable/1837095" },
    { label: "Nobel Prize in Economic Sciences 2022: Bernanke, Diamond and Dybvig on banks and financial crises (popular explainer)", url: "https://www.nobelprize.org/prizes/economic-sciences/2022/popular-information/" },
    { label: "Walter Bagehot, Lombard Street (1873), full text at Econlib", url: "https://www.econlib.org/library/Bagehot/bagLom.html" },
    { label: "Gorton & Metrick (2009), Securitized Banking and the Run on Repo (NBER working paper)", url: "https://www.nber.org/papers/w15223" },
    { label: "FDIC: understanding deposit insurance and the $250,000 limit", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
  ],
};
