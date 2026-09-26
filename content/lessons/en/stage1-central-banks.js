export default {
  id: "central-banks",
  stage: 1,
  order: 3,
  title: "Central Banks: The Fed, the Policy Rate & the Lender of Last Resort",
  difficulty: "intro",
  prereqs: ["banks-create-money"],

  oneLiner:
    "A central bank is the “bank for banks”: it issues the money at the very top of the pyramid (reserves and cash), anchors the whole economy's price of time with a **policy rate**, and acts as **lender of last resort** in a panic. But its remote control has limits: **the Fed can pin the overnight rate precisely, yet it only indirectly influences 10- and 30-year yields** — long rates also reflect the market's view of future inflation, deficits and risk. Understand that boundary and you understand why mortgage rates sometimes rise right after the Fed cuts.",

  intuition: `
The last two lessons showed that money is almost always somebody's liability (Stage 1.1) and that commercial banks create most of it by lending (Stage 1.2). The natural next question: **who oversees those banks? Who sets the “price” of money? And who rescues a bank when depositors run?** One institution answers all three — the **central bank**. In the United States it is the Federal Reserve System, the **Fed**, founded in 1913.

Think of the Fed as three roles in one:

- **The bank for banks.** Commercial banks hold accounts at the Fed, keep their reserves there, and settle with each other there in the end. The reserves and cash the Fed issues sit at the very top of the money pyramid.
- **The anchor for interest rates.** The Fed sets a **policy rate** — a target range for the federal funds rate, the rate banks charge each other to borrow reserves overnight. It is the economy's “shortest price of time.” When it moves, deposit rates, money-fund yields, credit-card rates and business-loan rates all move with it.
- **The lender of last resort.** When panic strikes and even healthy banks face runs, the Fed can lend to them against good collateral, cutting the chain by which a run fulfills its own prophecy.

This lesson rests mainly on **Idea ① — the price of time**: the policy rate is where every interest rate starts, and Stage 2.4 will show that the “risk-free rate” is in turn where all asset pricing starts. It also rests on **Idea ③ — liquidity & trust**: the central bank is the final water source for the financial system's plumbing.

One detail will follow us through the whole course: **the Fed's remote control has only a short cord.** It can hold the overnight rate on target, but 10- and 30-year Treasury yields are set by the market as “\\(\\text{the expected path of short rates over many years} + \\text{extra compensation for bearing long-term risk}\\) (the term premium).” When the Fed began cutting in September 2024, the 10-year Treasury yield rose by roughly a full percentage point over the following months, and mortgage rates rose with it. That is why “the 30-year Treasury yield breaks above 5%” can be front-page news — Stage 4.5 takes that headline apart, and Stages 9.1 and 9.2 cover the Fed's full toolkit and how policy transmits.

**In this lesson we break it into five pieces:**

- **① The bank for banks: the central bank's balance sheet**
- **② The dual mandate and the policy rate: how the fed funds rate is set**
- **③ From overnight to 30 years: what the policy rate controls — and what it doesn't**
- **④ Lender of last resort: Bagehot's rule and the central bank in a crisis**
- **⑤ Independence, terms of office and the challenges of a new era**
`,

  mechanics: `
### ① The bank for banks: the central bank's balance sheet

To understand a central bank, start with a T-account again (the tool from Stage 1.2). The Fed's balance sheet looks roughly like this:

- **Assets:** mainly US Treasuries and agency mortgage-backed securities (MBS), plus loans to banks during crises.
- **Liabilities:** **currency** in circulation (Federal Reserve notes), **reserves** that commercial banks hold at the Fed, the Treasury's own account at the Fed (the TGA — the government's checking account), and overnight reverse repos (ON RRP), among others.

The crucial point: **when the Fed buys an asset, it doesn't need to “have the money.”** To buy $10 billion of Treasuries from a bank, it simply credits that bank's reserve account with +$10 billion. Reserves are the Fed's own liability, and it can create them at will. That is what sitting at the top of the Stage 1.1 pyramid means: everyone else's money converts into the Fed's; the Fed's converts into nothing else.

That power gets used on a huge scale in crises. The Fed's total assets were under $1 trillion before 2008; after two rounds of large-scale bond buying — quantitative easing (QE) in 2008 and 2020 — they peaked near $9 trillion in 2022, then shrank gradually through quantitative tightening (QT). Stage 9.1 walks through QE and QT entry by entry with a T-account demo.

### ② The dual mandate and the policy rate: how the fed funds rate is set

Congress's instructions to the Fed are summed up as the **dual mandate**: **maximum employment** and **stable prices** (the 1977 statute also mentions “moderate long-term interest rates”). In January 2012 the Fed formally defined price stability as **2% annual inflation, measured by the PCE price index** (Stage 1.4 explains PCE versus CPI).

The main tool for pursuing the mandate is **the target range for the federal funds rate,** set by the **Federal Open Market Committee (FOMC)**:

- The FOMC has 12 voting members: the 7 members of the Board of Governors (nominated by the President, confirmed by the Senate, for 14-year terms), the president of the New York Fed, and 4 of the other regional Fed presidents on rotation.
- It holds 8 scheduled meetings a year. After each, it publishes a statement and the target range (a quarter-point-wide band such as “4.25%–4.50%”), and once a quarter it releases members' projections of future rates — the “dot plot.”

In today's ample-reserves system, the Fed does not push rates around by buying and selling small amounts of Treasuries each day. Instead it uses two **administered rates** to hold market rates inside the band:

- **Interest on reserve balances (IORB).** The Fed pays banks interest on the reserves they keep with it. If a bank can earn that rate risk-free by leaving money at the Fed, it won't lend reserves to anyone else for noticeably less — IORB acts as a “floor.”
- **The overnight reverse repo rate (ON RRP).** Money-market funds and other non-banks can lend cash to the Fed overnight at this rate — a second floor, for institutions that can't earn IORB.

<figure><svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The “floor system”: how the Fed pins the overnight rate inside its band (illustrative)</text><rect x="120" y="70" width="400" height="80" rx="6" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="530" y="74" font-size="11" fill="var(--orange-ink)" font-weight="600">Top of range 4.50%</text><text x="530" y="152" font-size="11" fill="var(--orange-ink)" font-weight="600">Bottom 4.25%</text><line x1="120" y1="90" x2="520" y2="90" stroke="var(--orange)" stroke-width="2"/><text x="126" y="86" font-size="11" fill="var(--orange-ink)">IORB 4.40%: the floor for banks</text><line x1="120" y1="112" x2="520" y2="112" stroke="var(--blue)" stroke-width="2" stroke-dasharray="6 4"/><text x="126" y="108" font-size="11" fill="var(--blue)">Effective fed funds rate ≈ 4.33%</text><line x1="120" y1="146" x2="520" y2="146" stroke="var(--green)" stroke-width="2"/><text x="126" y="142" font-size="11" fill="var(--green)">ON RRP 4.25%: the floor for money funds</text><text x="320" y="186" text-anchor="middle" font-size="11" fill="var(--ink)">Nobody lends below what they could earn risk-free by parking cash at the Fed</text><text x="320" y="206" text-anchor="middle" font-size="11" fill="var(--muted)">When the FOMC moves the band, it shifts IORB and ON RRP together, and market rates move with them</text><text x="320" y="236" text-anchor="middle" font-size="10" fill="var(--muted)">Figures illustrate the first-half-2025 range; check the Fed's website for current levels</text></svg><figcaption>The policy rate is not an order but an arbitrage boundary: the risk-free return the Fed offers becomes the floor for market rates.</figcaption></figure>

The historical rhythm tells the story. In March 2020, as the pandemic hit, the Fed cut the range to 0–0.25%. From March 2022, fighting the highest inflation in four decades, it hiked rapidly, reaching 5.25%–5.50% by July 2023. In September 2024 it began to cut. **Every move re-prices “money today versus money tomorrow”** — the essence of Idea ①.

### ③ From overnight to 30 years: what the policy rate controls — and what it doesn't

The policy rate is only an overnight rate. Its pass-through to other rates weakens as maturity lengthens:

<table>
<tr><th>Rate</th><th>Mainly driven by</th><th>Link to the policy rate</th></tr>
<tr><td>Overnight rates (SOFR, fed funds)</td><td>IORB, ON RRP and the supply of reserves</td><td>Nearly one-for-one</td></tr>
<tr><td>Money-fund yields, 3-month T-bills</td><td>The policy rate now and over the next few months</td><td>Very tight</td></tr>
<tr><td>2-year Treasury</td><td>The market's expected average policy rate over two years</td><td>Tight, but moves in advance</td></tr>
<tr><td>10- and 30-year Treasuries</td><td>\\(\\text{Expected rates over many years} + \\text{the term premium}\\) (inflation risk, deficits and supply, global demand)</td><td>Loose, sometimes opposite</td></tr>
<tr><td>30-year fixed mortgage</td><td>\\(\\approx \\text{the 10-year Treasury} + \\text{a}\\ 1.5\\text{–}2.5\\ \\text{point spread}\\)</td><td>Follows the long end, not overnight</td></tr>
</table>

A simplified formula:

$$
n\\text{-year yield} \\approx \\bar{r}_{n} + \\text{term premium}
\\bar{r}_{n} = \\text{average expected short rate over the next}\\ n\\ \\text{years}
$$

So when the Fed cuts, if the market simultaneously worries about inflation returning or about too much Treasury supply and demands a bigger term premium, long yields can perfectly well go up. Take the course's standard example: a 30-year Treasury with a 5% coupon issued at par. If its yield rises from 5% to 6%, its price falls from 100 to about 86.2 (modified duration of about 15.5, Stage 4.4). **The Fed cannot prevent that 14% drop**; it can only influence it indirectly, through expectations and bond purchases (QE). That is the starting point for Stage 4.5, on why a rising 30-year yield is so worrying.

One more channel is often overlooked: **interest rates change the demand for loans.** Stage 1.2 showed that banks can only create money if someone wants to borrow. When mortgage rates rise from 3% to 7%, the monthly payment on a $400,000 30-year mortgage goes from about $1,690 to about $2,660. Many people stop buying homes, and the growth of new loans — that is, of new money — slows. Stage 9.2 separates all the channels: rates, credit, asset prices, the exchange rate and expectations.

### ④ Lender of last resort: Bagehot's rule and the central bank in a crisis

In 1873 the British journalist Walter Bagehot, in *Lombard Street*, set out how a central bank should respond to a panic. His principle is still treated as scripture and is usually boiled down to three phrases:

- **Lend freely.** In a panic, lend enough that healthy banks don't collapse for want of cash.
- **At a high rate.** Charge more than normal, so banks borrow only when they truly need to and repay quickly once the panic passes.
- **Against good collateral.** Lend only to banks with sound assets that are merely short of liquidity — do not rescue insolvent ones.

The logic comes straight from the maturity mismatch of Stage 1.2: bank assets are long-dated and can't be sold quickly; bank liabilities can leave at any moment. If some institution promises “as long as you hold good assets, I will lend you cash against them,” depositors have no reason to race each other to the exit, and **the self-fulfilling chain of a run is broken.**

The Fed's standing tool is the **discount window.** In crises it invents temporary facilities that stretch the lender-of-last-resort role much further:

- **2008:** emergency facilities for investment banks, money-market funds and the commercial-paper market, plus dollar swap lines with foreign central banks (Stage 10.2).
- **March 2020:** rates cut to zero within days, massive Treasury purchases to repair a malfunctioning Treasury market, and — for the first time — purchases of corporate bonds (Stage 10.3).
- **March 2023:** after Silicon Valley Bank failed, the Bank Term Funding Program (BTFP) let banks borrow for up to a year against Treasuries and MBS valued **at par**, not at market — directly neutralizing the Stage 1.2 mechanism by which a run forces paper losses to become real ones.

The lender of last resort has a cost too: **moral hazard.** If banks believe someone will always rescue them, they take bigger risks. Every rescue reopens the argument about whom to save and on what terms.

### ⑤ Independence, terms of office and the challenges of a new era

Why make a central bank **independent** of the government? Because politicians naturally prefer lower rates and a hotter economy before elections, while the inflation bill arrives a year or two later. The high inflation of the 1970s is often blamed on a central bank that failed to resist such pressure; Paul Volcker, who took over in 1979, pushed the fed funds rate close to 20% and broke inflation at the cost of a severe recession (Stage 9.5). Since then, “an independent central bank plus an explicit inflation target” has become the global norm.

The Fed's independence rests on institutional design: governors serve staggered 14-year terms, the chair serves 4-year terms, and the Fed's budget does not depend on congressional appropriations. **Jerome Powell has been chair since 2018, and his second term as chair ended in May 2026.** Throughout 2025 the US President repeatedly and publicly criticized the Fed and demanded faster, larger rate cuts, and the debate over central-bank independence intensified. **Kevin Warsh was sworn in as chair on May 22, 2026** (confirmed 54–45 by the Senate on May 13), with Powell staying on as a governor; on September 16, 2026, amid an oil shock and rebounding inflation, the Fed raised rates for the first time since 2023 (to 3.75%–4.00%). Check the Fed's own website for the latest rates and personnel — this course makes no predictions about any individual's policy path.

The new era brings the central bank some new questions:

- **Bitcoin is money with no central bank.** No policy rate, no lender of last resort, a supply written into code (Stage 12.2). Supporters say that is exactly its value — nobody can print more to bail anyone out. Critics say that is exactly its flaw — nobody stands behind it in a panic.
- **Stablecoins turn the Fed's rate into an issuer's revenue.** Large stablecoin issuers hold substantial amounts of short-term Treasuries; the higher the policy rate, the more they earn. Stablecoins are also becoming a new source of demand for US Treasuries (Stage 13.2).
- **Central bank digital currencies (CBDCs).** Many countries are studying a digital currency issued by the central bank directly to the public, which would let people hold top-of-pyramid money without going through a commercial bank. In early 2025 the US signaled by executive order that it would not pursue a retail CBDC.
- **Rates anchor every asset.** From Bitcoin to the preferred stock issued by digital asset treasury companies, prices are highly sensitive to Fed policy and to long-term yields. Stage 18.1 shows that a perpetual preferred yielding around 10% is, at bottom, competing with Treasury yields.

**The whole lesson in one sentence: the central bank sits at the top of the money pyramid, prices the shortest stretch of time with its policy rate and acts as lender of last resort in a panic; but long-term rates are set by the market — and that boundary is the key to reading every interest-rate headline today.**
`,

  demo: "central-banks",

  analogy: `
Picture the interest-rate system as **a river flowing out of a reservoir.**

The Fed stands at the dam's gate and controls the water level right at the gate precisely — that is the overnight rate. A mile or two downstream (3-month and 2-year rates), the level mostly follows the gate, though it reacts early: the moment people hear “the gate opens next week,” the level downstream starts falling.

But dozens of miles away at the river mouth (10- and 30-year yields), the water level depends on more than the gate. It also depends on **the tide** (global capital flows), **the rainfall** (inflation) and **everything being pumped in upstream** (government borrowing and deficits). Sometimes the gate opens wider and yet the level at the mouth rises because the tide came in — that is “the Fed cuts, mortgage rates go up.”

Many people live along the river (banks, companies, households) and draw its water for their fields (borrowing). Normally all is well. But when something breaks upstream and a stretch of river suddenly runs dry (a run), the reservoir keeper releases emergency water — only to farmers who hold proper deeds and are merely short of water for now (good collateral), and at a steep price (a penalty rate). That is the lender of last resort.

And a small group of people has dug their own well (Bitcoin): whether the dam opens or closes has nothing to do with them. The price is that how much water the well holds is up to nature, and in a drought no keeper comes to help.
`,

  misconceptions: [
    "**“The Fed controls every interest rate, including mortgage rates.”** — The Fed directly controls only overnight rates. Ten- and 30-year Treasury yields and mortgage rates are set by expectations of future rates plus the term premium. After the Fed began cutting in September 2024, the 10-year yield rose by about a percentage point.",
    "**“The Fed has to have money before it can buy Treasuries.”** — The Fed pays by crediting the seller's bank with reserves, and reserves are its own liability, created at will. That is precisely what sitting at the top of the money pyramid means.",
    "**“Lender of last resort just means bailing out banks with taxpayer money.”** — Bagehot's rule has the central bank lend against good collateral at a penalty rate to banks that are temporarily illiquid, and the loans are repaid — that is not a gift. It does create moral hazard, and where to draw the line is always contested.",
    "**“The policy rate is an order that banks must obey.”** — In an ample-reserves system, the Fed sets floors with interest on reserve balances and the overnight reverse repo rate: nobody lends below what they could earn by parking cash at the Fed, so market rates stay inside the target range. It is an arbitrage boundary, not an administrative command.",
    "**“Central-bank independence means the Fed answers to no one.”** — The Fed's mandate is set by Congress, the chair testifies to Congress regularly, and governors are nominated by the President and confirmed by the Senate. Independence means day-to-day rate decisions are free from political instruction, not free from accountability.",
  ],

  quiz: [
    {
      q: "The Fed cuts the fed funds target range by half a percentage point. Which of these is most likely to move almost one-for-one?",
      options: [
        "The 30-year fixed mortgage rate",
        "The 30-year Treasury yield",
        "Money-market fund yields",
        "The price of Bitcoin",
      ],
      answer: 2,
      explain: "**Money-market funds** hold overnight repo and short-term T-bills, so their yields track the policy rate closely. Long rates also depend on future expectations and the term premium and may not move — or may move the other way.",
    },
    {
      q: "Under the “floor system,” what mainly keeps the overnight market rate inside the Fed's target range?",
      options: [
        "Buying and selling large amounts of stock every day",
        "Paying interest on reserves (IORB) and offering an overnight reverse repo (ON RRP) rate",
        "Dictating each bank's lending rate",
        "Changing the reserve requirement",
      ],
      answer: 1,
      explain: "Anyone who can earn IORB or ON RRP at the Fed won't lend for less — **those two administered rates form the floor under market rates.**",
    },
    {
      q: "Which of these is NOT part of Bagehot's rule for a lender of last resort?",
      options: [
        "Lend freely",
        "Charge a penalty rate",
        "Lend against good collateral",
        "Recapitalize insolvent banks unconditionally",
      ],
      answer: 3,
      explain: "Bagehot's rule targets banks that are **temporarily illiquid but hold sound assets**; unconditional rescues of insolvent institutions create severe moral hazard.",
    },
    {
      q: "The Bank Term Funding Program (BTFP) of March 2023 let banks borrow against Treasuries and MBS valued at par. Which mechanism did it mainly neutralize?",
      options: [
        "A run forcing banks to sell underwater long-dated bonds at a loss, turning paper losses into real ones",
        "The impact of falling Bitcoin prices on banks",
        "Lower loan demand caused by deflation",
        "A dollar shortage in foreign-exchange markets",
      ],
      answer: 0,
      explain: "Borrowing at **par** rather than market value meant banks didn't have to dump depressed bonds during a run — exactly the step in Stage 1.2 where maturity mismatch turns paper losses real.",
    },
    {
      q: "A 30-year Treasury with a 5% coupon, issued at par, sees its market yield rise to 6%. Roughly what does its price fall to, and what does that show?",
      options: [
        "About 99 — long bonds barely react to rates",
        "About 86 — moves in long-term yields sharply re-price long-dated assets, and the Fed does not directly control long yields",
        "About 50 — Treasuries are about to default",
        "About 120 — bonds rise when yields rise",
      ],
      answer: 1,
      explain: "With a modified duration of about 15.5, a one-point rise in yield cuts the price by about 14% (to roughly 86.2). **Long yields are set by the market** — Stages 4.4 and 4.5 develop this.",
    },
  ],

  further: [
    { label: "Federal Reserve: The Fed Explained (official guide to its functions and structure)", url: "https://www.federalreserve.gov/aboutthefed/the-fed-explained.htm" },
    { label: "Federal Reserve: FOMC meeting calendar, statements and projections", url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm" },
    { label: "New York Fed: daily effective federal funds rate and SOFR", url: "https://www.newyorkfed.org/markets/reference-rates/effr" },
    { label: "Walter Bagehot, Lombard Street (1873), full text (Econlib)", url: "https://www.econlib.org/library/Bagehot/bagLom.html" },
    { label: "FRED: historical fed funds, 10-year and 30-year Treasury yields", url: "https://fred.stlouisfed.org/series/FEDFUNDS" },
  ],
};
