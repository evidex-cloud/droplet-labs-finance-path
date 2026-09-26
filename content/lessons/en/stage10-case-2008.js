export default {
  id: "case-2008",
  stage: 10,
  order: 2,
  title: "2008: Subprime, Lehman & the Plumbing Freeze",
  difficulty: "systems",
  prereqs: ["anatomy-of-crisis", "capital-stack", "repo-money-markets"],

  oneLiner:
    "The 2008 crisis was not simply “people bought houses they couldn't afford.” Falling US house prices were the spark; what turned a mortgage loss into cardiac arrest for the global financial system was a super-sized version of the skeleton from Stage 10.1: **mortgages sliced and repackaged into securities that looked AAA, held by investment banks levered about 30-to-1 and funded with overnight repo, with the risk spread to everyone through AIG's credit default swaps.** On September 15, 2008 Lehman Brothers filed for bankruptcy; a money fund broke the buck, the commercial-paper market froze, and the Fed and Treasury needed unprecedented tools to reconnect the pipes. Just over three months later, Bitcoin's genesis block carried a newspaper headline about bank bailouts.",

  intuition: `
Compress 2008 into one picture you can remember: **an assembly line running from small-town American mortgages all the way to the balance sheets of banks around the world, which broke at its far end — and every station along the line stopped at once.**

The first station was the mortgage. In the mid-2000s US house prices rose year after year and lending standards slid: tiny down payments, even “no-doc” loans that never checked income. These **subprime** loans made up roughly a fifth of new mortgages in 2005–06. Why did borrowers take them? Because prices were rising — if you couldn't pay, you could sell or refinance. Why did lenders make them? Because they **never intended to keep the loans**; they sold them straight on to Wall Street.

The second station was securitization. Banks pooled thousands of mortgages and then sliced the pool by who absorbs losses first. The bottom slice loses first (equity), the middle next (mezzanine), and the big top slice loses last — so the rating agencies stamped it AAA. That is exactly the capital stack of Stage 6.1, except the “company” is a pile of mortgages. Then the banks went one step further: they collected the **less-safe middle slices** from many pools, pooled *those*, and sliced again — and the top of the new pile also came out AAA. This was the CDO, the collateralized debt obligation.

The third station was the holders. Who bought all this “AAA”? Banks, insurers, money funds, European banks — and the investment banks themselves, with enormous leverage. At the end of 2007 Lehman Brothers' total assets were about 30 times its shareholders' equity, and much of its funding came from **overnight repo that had to be rolled every single day** (Stage 8.3). Another giant, AIG, sold credit default swaps (CDS) insuring hundreds of billions of dollars of these securities against default — **collecting premiums while setting aside almost no capital to pay claims.**

Then house prices peaked in 2006 and started to fall — about 27% nationally from peak to trough. Subprime defaults soared. The bottom and middle slices took losses; the top of the CDOs built from those middle slices took losses too — “AAA” turned out not to be safe. Worse, **nobody on the outside could tell who held how much of this stuff or what it was worth.** All three ingredients from Stage 10.1 were now in the room: roughly 30x leverage, maturity mismatch from funding long securities with overnight money, and opacity so deep that even the holders couldn't price their own positions.

So repo lenders raised haircuts and refused to roll their loans — **a bank run without a photo of the queue.** On September 15, 2008 Lehman Brothers filed for bankruptcy with about $639 billion of assets, the largest bankruptcy in US history. The next day a large money market fund “broke the buck” because it held Lehman paper, and panic spread into the one place everyone treated as being as good as cash; that same day the Fed extended an $85 billion loan to AIG. **The plumbing of finance — repo, commercial paper, interbank lending — froze almost simultaneously.**

This lesson rests mainly on **Idea ②, balance sheets and claims** (how losses are allocated across layers of claims, and Lehman's pecking order) and **Idea ③, liquidity and trust** (the plumbing freeze and how the central bank reconnected it). It is also a turning point for the whole course. On October 31, 2008 someone using the name Satoshi Nakamoto published the Bitcoin white paper; on January 3, 2009 the first block of the Bitcoin blockchain embedded that day's front-page headline from *The Times* — Britain's finance minister weighing a second bailout for the banks. Stage 12.1 picks up the thread on how Bitcoin works.

**In this lesson we break it into five pieces:**

- **① The assembly line: subprime, securitization and tranching**
- **② Where the leverage hid: investment banks, shadow banks and AIG**
- **③ The timeline: from August 2007 to “Lehman weekend”**
- **④ The freeze and the firefight: new Fed tools, TARP and zero rates**
- **⑤ The legacy: too big to fail, new rules and Bitcoin's genesis block**
`,

  mechanics: `
### ① The assembly line: subprime, securitization and tranching

Traditional banks “originate to hold”: they keep the loans they make, so they check borrowers carefully. By the 2000s the dominant model had become **originate to distribute**. The mortgage broker earned a commission, the lender a fee, the investment bank a structuring fee, the rating agency a rating fee — **every link in the chain was paid on volume, while the default risk sat at the far end.** That is where the misaligned incentives began.

The key tool of securitization is **tranching**. A $100 million mortgage pool is split into three pieces by the order in which they absorb losses:

<table>
<tr><th>Tranche</th><th>Share</th><th>Losses it absorbs</th><th>Typical rating then</th></tr>
<tr><td>Senior</td><td>80%</td><td>Only once pool losses exceed 20%</td><td>AAA</td></tr>
<tr><td>Mezzanine</td><td>15%</td><td>Pool losses between 5% and 20%</td><td>BBB to AA</td></tr>
<tr><td>Equity</td><td>5%</td><td>First loss: 0% to 5%</td><td>Unrated</td></tr>
</table>

If the pool ultimately loses 3%, only the equity is hit. At 10%, the equity is wiped out and the mezzanine loses (10 − 5)/15 ≈ 33%. The AAA tranche is touched only when losses pass 20%. It is the same formula as the capital-stack waterfall in Stage 6.1 — **losses eat from the bottom up, cash pays from the top down.**

The trouble came with the second round of packaging. Banks gathered BBB mezzanine slices from dozens of mortgage pools, put them into a fresh pool, and cut it 80/15/5 again. The new senior slice was rated AAA too. But do the arithmetic. The original mezzanine was only 15% thick; when the underlying pools lose 10%, the mezzanine has already lost 33%. **So the CDO's entire collateral pool is down 33%, and its “AAA” slice, with only a 20% cushion, loses (33 − 20)/80 ≈ 17%.** In the very same scenario, the AAA slice of the original mortgage pool is untouched.

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><defs><marker id="sub-arrow-en" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">From mortgages to “AAA”: slice once, then slice again</text><g><text x="70" y="48" text-anchor="middle" font-size="11" fill="var(--muted)">① Thousands of loans</text><rect x="20" y="58" width="100" height="180" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="70" y="140" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Mortgage pool</text><text x="70" y="158" text-anchor="middle" font-size="10" fill="var(--muted)">Heavy in subprime</text></g><line x1="124" y1="148" x2="168" y2="148" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#sub-arrow-en)"/><g><text x="230" y="48" text-anchor="middle" font-size="11" fill="var(--muted)">② Tranched (MBS)</text><rect x="175" y="58" width="110" height="144" rx="4" fill="var(--green-soft)" stroke="var(--green)"/><text x="230" y="126" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Senior 80%</text><text x="230" y="142" text-anchor="middle" font-size="10" fill="var(--muted)">AAA</text><rect x="175" y="202" width="110" height="27" rx="4" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="230" y="220" text-anchor="middle" font-size="11" fill="var(--ink)">Mezz 15%</text><rect x="175" y="229" width="110" height="9" rx="2" fill="var(--red-soft)" stroke="var(--red)"/><text x="296" y="240" font-size="9.5" fill="var(--red)">Equity 5%</text></g><path d="M287,215 C330,215 330,150 368,150" fill="none" stroke="var(--orange)" stroke-width="1.8" marker-end="url(#sub-arrow-en)"/><text x="330" y="196" text-anchor="middle" font-size="10" fill="var(--orange-ink)">Collect mezz</text><text x="330" y="208" text-anchor="middle" font-size="10" fill="var(--orange-ink)">from dozens</text><g><text x="430" y="48" text-anchor="middle" font-size="11" fill="var(--muted)">③ Repackaged (CDO)</text><rect x="375" y="58" width="110" height="180" rx="6" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="430" y="140" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Pool of mezz</text><text x="430" y="158" text-anchor="middle" font-size="10" fill="var(--muted)">All BBB</text></g><line x1="489" y1="148" x2="523" y2="148" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#sub-arrow-en)"/><g><text x="580" y="48" text-anchor="middle" font-size="11" fill="var(--muted)">④ Tranched again</text><rect x="530" y="58" width="100" height="144" rx="4" fill="var(--green-soft)" stroke="var(--red)" stroke-dasharray="4 3" stroke-width="2"/><text x="580" y="126" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">“AAA” 80%</text><text x="580" y="142" text-anchor="middle" font-size="10" fill="var(--red)">Actually fragile</text><rect x="530" y="202" width="100" height="27" rx="4" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="580" y="220" text-anchor="middle" font-size="11" fill="var(--ink)">Mezz 15%</text><rect x="530" y="229" width="100" height="9" rx="2" fill="var(--red-soft)" stroke="var(--red)"/></g><text x="320" y="266" text-anchor="middle" font-size="11" fill="var(--ink)">Pool loses 10% → MBS mezz loses ~33% → CDO collateral down ~33% → CDO “AAA” loses ~17%</text><text x="320" y="286" text-anchor="middle" font-size="10.5" fill="var(--muted)">Losses eat from the bottom; restacking thin slices levers the same risk a second time</text></svg><figcaption>Tranching neither creates nor destroys risk; it reallocates it. Pooling thin mezzanine slices and cutting a new “AAA” from them amplifies sensitivity to house prices a second time — and the rating models assumed different mortgage pools would not go bad together.</figcaption></figure>

Why didn't the rating models catch this? The crucial assumption was **correlation.** The models treated defaults in different regions as largely independent — trouble in Florida need not mean trouble in Ohio. But once house prices fell nationwide at the same time (something not seen since the 1930s), every pool lost together, every mezzanine was breached together, and the CDO's “diversification” proved to be an illusion. **Tranching had concentrated the risk in a dimension nobody was watching: a common national shock.** Keep this in mind for Stage 16.5, where a DAT's BTC Rating is an asset-coverage multiple: however handsome the multiple, ask whether all the assets are exposed to the same single risk.

### ② Where the leverage hid: investment banks, shadow banks and AIG

Had these securities been held by unlevered long-term investors, falling house prices would have produced losses, not a systemic collapse. What proved fatal was that they sat in places that were **levered and funded with short-term money**:

- **The five big investment banks** (Goldman Sachs, Morgan Stanley, Merrill Lynch, Lehman Brothers, Bear Stearns) took no insured deposits and had no normal access to the Fed. They ran leverage of roughly 25 to 35 times, much of it funded with **overnight or short-term repo.** Once lenders lost faith in the collateral and raised haircuts, the banks had to sell at the worst possible moment — the margin spiral from Stage 10.1.
- **Off-balance-sheet vehicles (SIVs and asset-backed commercial paper conduits).** Banks set up entities outside their balance sheets that issued one-to-three-month commercial paper and bought long securitized assets — **a “shadow bank” with no capital and no deposit insurance.** When commercial-paper investors stopped rolling in the summer of 2007, these vehicles came crashing back onto their sponsors' balance sheets.
- **AIG.** Its Financial Products unit had sold CDS on hundreds of billions of dollars of notional, in effect writing default insurance on CDOs and similar securities. As long as nothing went wrong, the premiums were pure profit. But the contracts said that **if AIG was downgraded or the insured securities fell in market value, it had to post collateral.** In September 2008 downgrades and collapsing prices produced collateral demands far beyond AIG's cash — an insurance giant pushed to the brink by what amounted to margin calls. Its counterparties were the world's largest banks: counterparty contagion from Stage 10.1 in its purest form.
- **Fannie Mae and Freddie Mac.** These government-sponsored enterprises owned or guaranteed roughly half of all US mortgages on very thin capital. On September 7, 2008 they were placed into conservatorship by their regulator.

**Put the four side by side: the real leverage was not in homeowners but in the long chain of institutions turning short money into long assets — and most of it sat outside traditional bank regulation and deposit insurance.** That is the “runs in new clothes” from part ⑤ of Stage 10.1.

### ③ The timeline: from August 2007 to “Lehman weekend”

<table>
<tr><th>Date</th><th>Event</th><th>Why it mattered</th></tr>
<tr><td>2006</td><td>US house prices peak</td><td>The “sell or refinance if you can't pay” logic of subprime stops working</td></tr>
<tr><td>Apr 2, 2007</td><td>Subprime lender New Century files for bankruptcy</td><td>Originators start to fall</td></tr>
<tr><td>Jun–Jul 2007</td><td>Two Bear Stearns subprime hedge funds collapse</td><td>The “prices” of securitized products come into question</td></tr>
<tr><td>Aug 9, 2007</td><td>BNP Paribas freezes redemptions in three funds, citing a complete evaporation of liquidity</td><td>Often dated as the start of the crisis; the ECB injects large amounts of liquidity that day</td></tr>
<tr><td>Sep 2007</td><td>Run on Northern Rock in the UK</td><td>Britain's first depositor queues in more than a century</td></tr>
<tr><td>Mar 16, 2008</td><td>Bear Stearns sold to JPMorgan with about $29 billion of Fed support</td><td>The Fed opens lending to investment banks for the first time (Primary Dealer Credit Facility)</td></tr>
<tr><td>Sep 7, 2008</td><td>Fannie Mae and Freddie Mac placed into conservatorship</td><td>The government steps into the core of the mortgage market</td></tr>
<tr><td>Sep 15, 2008</td><td>Lehman Brothers files for bankruptcy; Merrill Lynch agrees to sell itself to Bank of America</td><td>About $639 billion of assets — the largest US bankruptcy ever</td></tr>
<tr><td>Sep 16, 2008</td><td>Reserve Primary Fund breaks the buck (about $0.97 a share); Fed extends $85 billion to AIG</td><td>Panic reaches money funds, the “as good as cash” corner</td></tr>
<tr><td>Sep 19–21, 2008</td><td>Treasury guarantees money funds temporarily; Goldman Sachs and Morgan Stanley become bank holding companies</td><td>The end of the standalone investment bank</td></tr>
<tr><td>Sep 25, 2008</td><td>Washington Mutual seized and sold to JPMorgan</td><td>The largest US bank failure ever (about $307 billion of assets)</td></tr>
<tr><td>Sep 29, 2008</td><td>House rejects the rescue bill; the Dow falls about 778 points</td><td>Markets force the politicians' hand</td></tr>
<tr><td>Oct 3, 2008</td><td>Emergency Economic Stabilization Act signed, creating the $700 billion TARP</td><td>Fiscal money enters the fight</td></tr>
</table>

Why was Lehman allowed to fail when Bear Stearns and AIG were rescued? The official explanation at the time: Lehman lacked enough good collateral, no buyer would take it on, and the Fed could not legally lend to an insolvent firm — the very boundary of Bagehot's rule. Critics call it a policy error, arguing the chain reaction from Lehman's failure cost far more than saving it would have. **The argument has never been settled, but it left a consensus: the disorderly failure of a large, highly connected firm is paid for by the whole system.**

The Lehman wind-down also gives Stage 6.6 a real-world footnote. The October 2008 auction that settled Lehman CDS set the recovery value of its senior bonds at about 8.6 cents on the dollar — the market's estimate, in the middle of the panic, of what “senior unsecured” would get back. (Actual distributions eventually came in well above that, but took years.) **“Senior” means you stand near the front of the line; it doesn't mean you get paid.**

### ④ The freeze and the firefight: new Fed tools, TARP and zero rates

In the weeks after Lehman, several gauges of the financial plumbing went off the charts at once:

- **Interbank lending.** The spread between three-month LIBOR and the overnight index swap rate — a thermometer for how little banks trust one another — normally sat around 0.1 percentage point; in October 2008 it reached roughly 3.6 points.
- **Commercial paper.** Large companies normally fund payroll and inventory by issuing 30-to-90-day commercial paper. After the money-fund stampede, much of that market could only issue overnight, threatening even industrial firms' day-to-day financing.
- **Money funds.** In the days after Reserve Primary broke the buck, prime money funds faced redemptions in the hundreds of billions of dollars.

The response followed the extinguisher logic of Stage 10.1, at a scale and scope never seen before:

- **Lending of last resort beyond the banks.** The Primary Dealer Credit Facility (for investment banks), the Asset-Backed Commercial Paper Money Market Fund Liquidity Facility (AMLF), the Commercial Paper Funding Facility (CPFF, in which the Fed bought commercial paper directly), the Term Asset-Backed Securities Loan Facility (TALF) and more. **The Fed went from lender of last resort for banks to market maker of last resort for markets.**
- **International dollar swap lines.** Foreign banks had borrowed heavily in dollars (Stage 3.4); the Fed lent dollars to other central banks to head off a global dollar shortage.
- **Capital injections.** In October 2008 Treasury used TARP to inject $125 billion into nine large banks (within a $250 billion Capital Purchase Program) — **by buying preferred stock.** That is the tool from Stage 6.2 in its crisis role: rebuild bank capital without outright nationalization.
- **Guarantees.** The FDIC guaranteed newly issued bank debt and temporarily insured non-interest-bearing transaction accounts without limit; Treasury temporarily guaranteed money funds.
- **Rates and the balance sheet.** On December 16, 2008 the Fed cut its federal funds target to 0–0.25%. In November it announced purchases of agency debt and agency mortgage-backed securities — what became known as the first round of quantitative easing, QE1 (Stage 9.1). The Fed's balance sheet went from about $900 billion to more than $2 trillion within months.

The costs were real too. Unemployment reached 10% in October 2009; the S&P 500 fell about 57% from its October 2007 peak to March 2009; millions of families lost their homes. The rescue saved the plumbing, but it rooted a deep anger about “heads they win, tails taxpayers lose.”

### ⑤ The legacy: too big to fail, new rules and Bitcoin's genesis block

2008 left three legacies, and each recurs later in the course.

**First, new rules.** The Dodd–Frank Act of 2010, Basel III's higher capital and liquidity requirements, annual stress tests for big banks, central clearing of over-the-counter derivatives (Stage 8.2), money-fund reform. They made traditional banks thicker and more transparent — and pushed some risk into lightly regulated corners such as private credit (Stage 8.4). Stage 10.3 will show that the new rules mostly targeted *credit* risk and did far less about *interest-rate* risk.

**Second, a new normal for central banks.** Zero rates, quantitative easing and huge balance sheets went from emergency tools to the default setting for more than a decade (Stage 9.1 and Stage 9.3). Cheap money lifted the prices of nearly every asset and gave an audience to the story that fiat money can be diluted without limit.

**Third, a deep distrust of financial intermediaries — and a technological answer.** On October 31, 2008 Satoshi Nakamoto posted “Bitcoin: A Peer-to-Peer Electronic Cash System” to a cryptography mailing list. On January 3, 2009 Bitcoin's first block — the genesis block — embedded a line of text: “The Times 03/Jan/2009 Chancellor on brink of second bailout for banks,” that day's front-page headline in London. It works as a timestamp, and it is widely read as a statement of intent: **a money that depends on no bank, no bailout, with its supply fixed in code.** Stage 12.1 explains how it runs without any central party.

**The new-era angle.** Every lesson of 2008 echoes somewhere in the new finance:

- **Tranching and asset coverage.** A DAT's stack — convertible notes, then senior preferred, then junior preferred, then common — is a tranched structure with bitcoin as the collateral pool (Stage 17.6). **The lesson of 2008: however high the coverage multiple, ask how far the underlying asset can fall all at once in the worst case** — and bitcoin has had several 70–80% drawdowns.
- **Collateral liquidity and transparency.** On-chain assets can be verified in real time around the clock — a direct answer to opacity. But Stage 10.5 shows that on-chain transparency does not automatically make the off-chain institutions (exchanges, lenders) honest.
- **“Ratings” versus real risk.** The BTC Rating in Stage 16.5 borrows the language of credit ratings, but it is an asset-coverage multiple, not a rating agency's judgment of default probability. Don't read it as a 2007-style “AAA.”
`,

  demo: "case-2008",

  analogy: `
Think of 2008 as a **juice factory.**

Step one: the factory buys oranges from thousands of orchards — some good, some already going moldy (subprime). The buyers are paid by the pound, so they take everything.

Step two: all the oranges go into one giant vat of juice, which is then bottled in layers. **The clear juice at the top** goes into bottles labeled “Premium” (AAA); the slightly cloudy middle goes into “Grade One” bottles (mezzanine); the pulpy sludge at the bottom goes into “Seconds” (equity). As long as there aren't too many moldy oranges, the sludge soaks up the off taste and the Premium bottles really are fine.

Step three is where it goes wrong. The factory collects the “Grade One” bottles from dozens of branch plants, **pours them into a new vat and bottles it again** — and labels the top layer of the new vat “Premium” too. But this vat was made entirely of cloudy middle juice. Let a few more moldy oranges into the original batches and the whole new vat tastes off; the new “Premium” can't hold.

Step four: supermarkets, schools and hospitals have bought huge amounts of “Premium,” some of it **with short-term loans,** pledging the juice as collateral. One day someone tastes the mold, but nobody can say which bottles are bad — so every lender demands “pay me back or pledge more” at the same moment, and every buyer dumps every Premium bottle at once. The juice hasn't gotten that much worse, but **the trust is gone and the whole supply chain stops overnight.**

In the end the government steps in: buying some of the bottles, lending to the supermarkets, guaranteeing the schools' accounts. This buyer of last resort saves the supply chain — but everyone remembers that **between a label and the real quality there may be several vats you can't see.**
`,

  misconceptions: [
    "**“2008 happened because poor people borrowed to buy houses and couldn't pay.”** — Mortgage defaults were the spark, but total US subprime losses were far smaller than the wealth that vanished from global stock markets and economies afterward. What turned losses into a systemic crisis were levered investment banks, off-balance-sheet vehicles, overnight repo funding and AIG's CDS — the “short money buying long assets” structure in the middle of the chain — plus opacity about who held what.",
    "**“AAA-rated securities can't lose money.”** — A rating is an agency's model-based opinion. CDO “AAAs” rested on the assumption that regional mortgage pools would not default together, and a nationwide price decline broke it. A rating is also not a price: even securities that never defaulted could crash in market value, and mark-to-market accounting plus collateral calls forced holders to sell at the worst time.",
    "**“Lehman went bankrupt because it lost the most money.”** — Lehman's problem was roughly 30x leverage combined with dependence on short-term funding: once repo lenders and counterparties stopped trusting it, its funding vanished within days. Bear Stearns and AIG faced similar situations and were rescued; Lehman was not, partly for lack of a buyer and adequate collateral. It was a run, not just a loss.",
    "**“TARP simply handed $700 billion to the banks.”** — The bank portion of TARP was mostly capital injected as preferred stock; banks paid dividends and later repurchased most of it, and Treasury ultimately collected more on the bank programs than it put in. The true costs of rescue go beyond that ledger, though: moral hazard, the implicit subsidy of “too big to fail” and lost public trust are all real.",
    "**“Bitcoin was born from the 2008 crisis, so it must hedge financial crises.”** — The white paper and genesis block do carry the imprint of 2008, but being born in a crisis is not the same as rising in one. In the liquidity crunch of March 2020 bitcoin fell by roughly half in two days. Its relationship with risk assets and liquidity is examined in Stages 12.4 and 9.3.",
  ],

  quiz: [
    {
      q: "A mortgage pool is tranched 80/15/5 into senior, mezzanine and equity. If the pool ultimately loses 10%, roughly how much does the mezzanine (covering losses from 5% to 20%) lose?",
      options: [
        "0%, because the equity absorbed the loss",
        "10%, the same as the pool",
        "100%, the mezzanine is wiped out",
        "About 33%, i.e. (10% − 5%) / 15%",
      ],
      answer: 3,
      explain: "The equity absorbs the first 5%; the next 5 points land on a 15%-thick mezzanine, and 5/15 ≈ 33%. The senior slice is untouched until losses pass 20%. **Losses eat from the bottom up.**",
    },
    {
      q: "Why was the “AAA” slice of a CDO built from BBB mezzanine tranches so much more fragile than the AAA slice of the original mortgage pool?",
      options: [
        "Because CDO issuers had worse credit",
        "Because the mezzanine is thin, so modest underlying losses destroy a large share of it — and all the pools go bad together when national house prices fall",
        "Because CDOs paid lower coupons",
        "Because CDOs were never rated",
      ],
      answer: 1,
      explain: "Slicing a thin slice again is leverage on leverage: a 10% pool loss means a ~33% mezzanine loss and a ~17% loss on the CDO “AAA.” The diversification the models assumed disappears under a common shock.",
    },
    {
      q: "Why did the Reserve Primary Fund “breaking the buck” on September 16, 2008 matter so much?",
      options: [
        "Money funds were seen as good as cash; its loss triggered mass redemptions that froze the commercial-paper market",
        "Because it was the largest bank in the US",
        "Because it forced the Fed to raise rates",
        "Because it held a lot of bitcoin",
      ],
      answer: 0,
      explain: "Its Lehman paper pushed it to about $0.97 a share. The “a dollar is a dollar” promise broke, money funds were run, and since they were the main buyers of commercial paper, **panic spread from investment banks into ordinary companies' day-to-day funding.**",
    },
    {
      q: "Which of these was **not** part of the US authorities' response in 2008?",
      options: [
        "Injecting capital into big banks through TARP by buying preferred stock",
        "Creating the Commercial Paper Funding Facility, in which the Fed bought commercial paper directly",
        "Cutting the federal funds target to 0–0.25%",
        "Raising interest rates sharply to deflate the housing bubble",
      ],
      answer: 3,
      explain: "During the crisis the Fed was **cutting to zero and expanding its balance sheet,** not hiking. The other three are real: TARP preferreds (the Stage 6.2 tool), the CPFF and zero rates.",
    },
    {
      q: "What does the text embedded in Bitcoin's genesis block (January 3, 2009) quote?",
      options: [
        "A personal statement by Satoshi Nakamoto",
        "That day's front-page headline in The Times about Britain's finance minister weighing a second bailout for banks",
        "A Federal Reserve rate decision",
        "Lehman Brothers' bankruptcy announcement",
      ],
      answer: 1,
      explain: "“Chancellor on brink of second bailout for banks” — it is a timestamp and is widely read as a comment on the 2008 bank rescues. Stage 12.1 continues with how Bitcoin works.",
    },
  ],

  further: [
    { label: "Financial Crisis Inquiry Commission, Final Report (2011), the official US inquiry", url: "https://www.govinfo.gov/app/details/GPO-FCIC" },
    { label: "Federal Reserve History: the Great Recession and the crisis response, 2007–2009", url: "https://www.federalreservehistory.org/essays/great-recession-of-200709" },
    { label: "Gorton & Metrick (2009), Securitized Banking and the Run on Repo (NBER)", url: "https://www.nber.org/papers/w15223" },
    { label: "Satoshi Nakamoto (2008), Bitcoin: A Peer-to-Peer Electronic Cash System (original white paper)", url: "https://bitcoin.org/bitcoin.pdf" },
    { label: "Satoshi Path (sister course): understanding Bitcoin from the white paper", url: "https://evidex-cloud.github.io/nextdawn-satoshi-path/" },
  ],
};
