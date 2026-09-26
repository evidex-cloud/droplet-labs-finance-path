export default {
  id: "swaps-hedging",
  stage: 7,
  order: 4,
  title: "Swaps, Hedging & the Basis Trade: How Big Institutions Manage Risk",
  difficulty: "core",
  prereqs: ["futures-forwards", "duration-convexity"],

  oneLiner:
    "The biggest derivative in the world by notional size is neither a future nor an option: it's the **interest-rate swap**. Two parties exchange a stream of fixed interest for a stream of floating interest, and a floating-rate loan \"becomes\" a fixed-rate loan — or a pension fund's rate risk walks out the door. Swaps are the workhorse big institutions use to manage duration, and they sit next to one of modern finance's quietest risks: **the basis trade, which uses enormous leverage to earn a sliver of spread.** In March 2020 its mass unwind nearly broke the world's safest market, U.S. Treasuries.",

  intuition: `
Picture two households.

**The Smiths** bought their home with a **floating-rate** mortgage: each year the rate follows the market. They dread rising rates — the payment keeps climbing while their salaries stay put.

**The Lees** are the mirror image. Their savings sit in **fixed-rate** bonds, but one of their big expenses is tied to market rates. They dread falling rates.

Neither family needs to renegotiate with its bank. They just sign an agreement: **"For the next five years, on a principal of $1 million, the Smiths pay the Lees a fixed 4% a year, and the Lees pay the Smiths interest at the floating market rate."** The principal never changes hands; only the difference in interest does.

The result: the Smiths still pay their bank "floating + 1.5%," but now they also receive "floating" from the Lees and pay them a fixed 4%. The floating pieces go in and out and cancel, so **the Smiths effectively pay a fixed 5.5% a year.** A floating loan has been "turned into" a fixed loan, and rising rates no longer scare them. The Lees have done the opposite, swapping fixed income for floating income.

That is an **interest-rate swap**. It's an upgraded version of the forward contract from Stage 7.1: a forward locks in **one** future price; a swap locks in a **whole series** of future interest rates. Outstanding over-the-counter interest-rate derivatives are measured in the hundreds of trillions of dollars of notional. This isn't a niche product; it's **the main pipe through which the financial system manages interest-rate risk.**

Who uses swaps? Nearly every big institution:

- **Companies** turn floating loans into fixed ones, or turn fixed-rate bonds they've issued into floating.
- **Banks** adjust the duration of their assets and liabilities (Stage 4.4). One of Silicon Valley Bank's problems before its 2023 failure was precisely that it had **not** hedged enough before rates rose (Stage 10.3).
- **Pension funds and insurers** owe money decades from now, so their liabilities have very long duration. They "receive fixed" on long swaps to lengthen the duration of their assets and match those liabilities.

Then comes this lesson's second protagonist: **the basis trade.** Stage 7.1 showed that a future and its underlying are separated by a "basis" that must vanish at expiry. U.S. Treasury futures usually trade slightly rich to cash Treasuries, so hedge funds "buy cash Treasuries and sell Treasury futures" to lock in the gap. The gap is thin, so they lever it dozens of times using **repo financing** (Stage 8.3 covers repo). Most of the time this is a quiet business that keeps futures and cash tied together. But when financing tightens and the basis moves the wrong way, dozens-times leverage forces everyone to sell cash Treasuries at once. That is what happened in **March 2020**, and the Federal Reserve had to buy more than a trillion dollars of Treasuries within weeks to restore order.

This lesson rests on **Idea ③ Liquidity & trust (the plumbing)** and **Idea ④ Risk & leverage**: swaps and basis trades are invisible load-bearing walls in the financial plumbing, and when they're combined with leverage and margin, "hedging" can itself become a source of risk. It is also tightly linked to **Idea ① The price of time** — a swap is, at bottom, a trade on the yield curve (Stage 4.3).

**In this lesson we break it into five pieces:**

- **① The interest-rate swap: trading two streams of interest**
- **② Valuing a swap: two bonds in disguise, and DV01**
- **③ Hedging programs: what companies, banks and pensions each hedge**
- **④ Swap spreads: when swap rates fall below Treasury yields**
- **⑤ The Treasury basis trade and March 2020**
`,

  mechanics: `
### ① The interest-rate swap: trading two streams of interest

A standard **fixed-for-floating interest-rate swap** has these elements:

- **Notional principal**: the base used to compute interest. It is **never exchanged** (which is why notional sizes are gigantic while actual exposures are far smaller).
- **Fixed leg**: one party pays a fixed rate agreed at the start, the **swap rate**. This party is the **payer** (pays fixed).
- **Floating leg**: the other party pays a floating benchmark rate and is the **receiver** (receives fixed). In U.S. dollars the benchmark moved from LIBOR entirely to **SOFR** by mid-2023 — the Secured Overnight Financing Rate, built from Treasury repo transactions (Stage 8.3).
- **Tenor**: 2, 5, 10, 30 years…
- **Netting**: on each payment date only the difference between the two legs changes hands.

Replace the Smiths with a real company. It has borrowed $100 million for five years at **SOFR + 1.5%**. It enters a five-year swap with a bank: **pay fixed 4.0%, receive SOFR.**

<figure><svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Using a swap to "turn" a floating loan into a fixed one</text><rect x="30" y="80" width="150" height="70" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="105" y="110" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Lenders</text><text x="105" y="128" text-anchor="middle" font-size="10.5" fill="var(--muted)">floating-rate loan</text><rect x="245" y="80" width="150" height="70" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="320" y="110" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Company</text><text x="320" y="128" text-anchor="middle" font-size="10.5" fill="var(--muted)">$100M, 5 years</text><rect x="460" y="80" width="150" height="70" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="535" y="110" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Swap dealer</text><text x="535" y="128" text-anchor="middle" font-size="10.5" fill="var(--muted)">usually a big bank</text><line x1="245" y1="115" x2="186" y2="115" stroke="var(--ink)" stroke-width="2"/><polygon points="186,110 176,115 186,120" fill="var(--ink)"/><text x="212" y="106" text-anchor="middle" font-size="10.5" fill="var(--ink)">SOFR + 1.5%</text><line x1="395" y1="100" x2="450" y2="100" stroke="var(--red)" stroke-width="2"/><polygon points="450,95 460,100 450,105" fill="var(--red)"/><text x="427" y="92" text-anchor="middle" font-size="10.5" fill="var(--red)">Fixed 4.0%</text><line x1="460" y1="132" x2="405" y2="132" stroke="var(--green)" stroke-width="2"/><polygon points="405,127 395,132 405,137" fill="var(--green)"/><text x="427" y="150" text-anchor="middle" font-size="10.5" fill="var(--green)">SOFR</text><rect x="120" y="180" width="400" height="36" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="196" text-anchor="middle" font-size="11" fill="var(--ink)">Net cost = (SOFR + 1.5%) − SOFR + 4.0% = <tspan font-weight="700">fixed 5.5%</tspan></text><text x="320" y="210" text-anchor="middle" font-size="10" fill="var(--muted)">Notional is never exchanged; each date only the net interest is settled</text></svg><figcaption>SOFR comes in and goes out and cancels. The company hands its floating-rate risk to the swap dealer, which hedges it away in the market.</figcaption></figure>

The effect:

- If SOFR rises from 4% to 6%: unhedged, the company's rate goes from 5.5% to 7.5% — **$2 million more interest a year**. Hedged, the extra $2 million on the loan is exactly offset by $2 million more received on the swap, and the cost stays at **5.5%**.
- If SOFR falls to 2%: unhedged, the cost drops to 3.5%; hedged, it's still 5.5%. **That is the price of insurance, not a failed hedge** (the same lesson as Stage 7.1).

### ② Valuing a swap: two bonds in disguise, and DV01

A swap looks complicated, but valuing it rests on one elegant trick: **pay-fixed / receive-floating = short a fixed-rate bond + long a floating-rate bond.**

- A floating-rate bond resets its coupon to the market every period, so its price keeps returning to about par — it has almost no rate risk.
- A fixed-rate bond's price swings like a seesaw as rates move (Stage 4.2).

So the payer's gain or loss is roughly the price change of a fixed-rate bond, with the sign flipped. At signing, the swap rate is set so the two legs are worth the same and the swap is worth zero. After that, rates move and the value drifts away from zero.

Back to our company: shortly after signing, the five-year swap rate rises from 4% to 5%. A five-year 4% bond priced at a 5% yield is worth about **95.62%** of par, so:

$$
Value of the pay-fixed swap ≈ notional × (1 − price of the fixed leg at the new rate)
= $100M × (1 − 0.9562) ≈ +$4.38M
DV01 ≈ modified duration × notional × 0.0001 ≈ 4.49 × $100M × 0.0001 ≈ $45,000 per basis point
$$

**DV01** (Stage 4.4) is the ruler traders use to manage swaps: how much the book gains or loses for every one-basis-point move in rates. What a big bank's rates desk does all day is add up the DV01 of thousands of swaps, bonds and futures and keep the total inside its limits.

Two things to remember:

- **A swap is "duration without principal."** Receiving fixed on a 30-year swap carries roughly the rate risk of owning a 30-year bond (modified duration around 15.5, Stage 4.5), **without paying the full principal up front**. That's why pension funds like swaps — and it's where the leverage hides.
- **Swaps are collateralized.** Today most standardized swaps are cleared through a central counterparty (Stage 8.2), and both sides exchange **variation margin** daily at market value. That shrinks counterparty risk but revives the old problem from Stage 7.1: **hedged on paper, bleeding in cash.**

### ③ Hedging programs: what companies, banks and pensions each hedge

**Companies.** The common hedging programs come in three flavors: interest rates (swaps), currencies (FX forwards) and commodities (futures). Airlines hedge jet fuel, miners hedge metal prices, multinationals hedge exchange rates. A good program has an explicit **hedge ratio** and horizon; its purpose is to make operating results less hostage to market prices, not to place a bet.

**Banks.** A bank's natural state is a **maturity mismatch** (Stage 1.2): short-term deposits funding long-term loans and bonds. When rates rise, long assets lose value and deposit costs climb. Banks use swaps to shorten asset duration (paying fixed) or to turn fixed-rate bonds into floating. **Silicon Valley Bank's** lesson (Stage 10.3): it held large amounts of long-duration Treasuries and mortgage-backed securities without enough hedging around the rapid rate rises of 2022. Unrealized losses ate its capital, and when depositors ran, it had to sell bonds at a loss.

**Pension funds and insurers.** What they owe retirees is paid decades from now; liability duration can exceed 20 years. When rates fall, the present value of those liabilities balloons. So they **receive fixed** on long swaps, or buy long bonds, to stretch asset duration to match their liabilities — in the U.K. this is called **liability-driven investment (LDI)**.

The U.K. LDI crisis of September 2022 exposed hedging's dark side. The government's "mini-budget" sent long-dated gilt yields up more than a full percentage point within days. Many pension schemes held swaps and gilt repo through leveraged LDI funds, and the rate spike required them to post huge amounts of collateral **immediately**. To raise cash they had to sell long gilts, and selling pushed yields higher still, triggering more margin calls. The Bank of England stopped the spiral only by announcing temporary purchases of long gilts on September 28 (Stage 10.3). **The economic logic of the hedge was sound — higher rates actually shrank the pensions' liabilities. What broke was that the hedge's cash demands arrived faster than the assets could be turned into cash.**

### ④ Swap spreads: when swap rates fall below Treasury yields

**Swap spread** = the swap rate − the Treasury yield of the same maturity.

By the textbook it should be **positive**: Treasuries are risk-free, while the floating leg of a swap used to reference LIBOR, which carried bank credit risk — so swap rates should sit above Treasury yields. For a long time they did.

But after the 2008 crisis, **the 30-year dollar swap spread turned negative** and has spent most of the time since below zero: swap rates below Treasury yields of the same maturity. By the textbook that's free money — buy Treasuries, pay fixed on a swap, pocket the difference. Why hasn't anyone arbitraged it away?

- **Balance-sheet cost.** A bank that holds Treasuries uses balance sheet and runs into capital rules such as the supplementary leverage ratio (SLR); a swap uses almost none. The hidden cost of holding Treasuries makes the "arbitrage" unattractive.
- **Enormous Treasury supply.** Deficits mean relentless issuance (Stage 3.3). The market has a lot of duration to absorb, so Treasuries cheapen (their yields rise) relative to swaps.
- **Strong demand to receive fixed.** Pension funds and insurers receive long fixed rates in size, pushing swap rates down.
- **A new floating benchmark.** With the switch to SOFR, the floating leg is itself close to risk-free, weakening the case that swap rates "should" exceed Treasury yields.

A negative swap spread is a signal: **in today's financial system even "risk-free" Treasuries need someone with balance sheet to hold them, and balance sheet is scarce.** That is one of the "supply and absorption capacity" factors to weigh when Stage 4.5 asks why the 30-year yield has moved higher.

<figure><svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The Treasury cash–futures basis trade: a thin line levered dozens of times</text><rect x="30" y="60" width="160" height="66" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="110" y="86" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Repo lenders</text><text x="110" y="104" text-anchor="middle" font-size="10.5" fill="var(--muted)">money funds, dealers</text><rect x="240" y="60" width="160" height="66" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="320" y="86" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Hedge fund</text><text x="320" y="104" text-anchor="middle" font-size="10.5" fill="var(--muted)">own capital ~2%</text><rect x="450" y="60" width="160" height="66" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="530" y="86" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Futures buyers</text><text x="530" y="104" text-anchor="middle" font-size="10.5" fill="var(--muted)">asset managers (want duration)</text><line x1="190" y1="80" x2="232" y2="80" stroke="var(--green)" stroke-width="2"/><polygon points="232,75 242,80 232,85" fill="var(--green)"/><text x="215" y="72" text-anchor="middle" font-size="10" fill="var(--green)">Cash</text><line x1="240" y1="108" x2="198" y2="108" stroke="var(--muted)" stroke-width="2"/><polygon points="198,103 188,108 198,113" fill="var(--muted)"/><text x="215" y="124" text-anchor="middle" font-size="10" fill="var(--muted)">Treasuries as collateral</text><line x1="400" y1="93" x2="442" y2="93" stroke="var(--blue)" stroke-width="2"/><polygon points="442,88 452,93 442,98" fill="var(--blue)"/><text x="425" y="85" text-anchor="middle" font-size="10" fill="var(--blue)">Sells futures</text><text x="320" y="150" text-anchor="middle" font-size="11" fill="var(--ink)">Return = financing rate implied by the future − actual repo rate (often a few tenths of a percent)</text><text x="320" y="168" text-anchor="middle" font-size="11" fill="var(--ink)">× leverage (a 2% haircut ≈ 50x)</text><rect x="90" y="186" width="460" height="50" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="320" y="206" text-anchor="middle" font-size="11" font-weight="600" fill="var(--red)">Risk: repo haircuts rise / basis widens → margin calls → forced sales of cash Treasuries</text><text x="320" y="224" text-anchor="middle" font-size="10.5" fill="var(--ink)">Everyone sells at once → Treasury prices fall, basis widens further → more unwinds (March 2020)</text></svg><figcaption>The basis trade keeps futures and cash in line and normally greases the market — but it runs on repo financing, and when financing terms change the whole position has to be unwound at once.</figcaption></figure>

### ⑤ The Treasury basis trade and March 2020

Stage 7.1 introduced the cash-and-carry trade: buy spot, sell the future, and the basis disappears at expiry. In the U.S. Treasury market that trade has a special structure:

- **Futures buyers** are mostly asset managers (mutual funds, pensions) who want duration in a capital-light form, which makes futures slightly **rich** to cash.
- **Hedge funds** take the other side: buy cash Treasuries, sell futures, lock in the gap.
- The money to buy cash Treasuries comes from **repo**: the bonds are pledged as collateral to borrow cash, often with a **haircut of only 1–3%** — which means **30x to 100x** leverage.

In numbers (**illustrative**): a fund with $20 million of its own capital, at a 2% haircut, buys **$1 billion** of cash Treasuries and sells an equal amount of futures. If the net spread is 0.20% a year, it earns $2 million — **about a 10% return on capital.** But if the basis moves 0.5% against it (50 cents per $100 of face), the mark-to-market loss is $5 million — **a quarter of its capital**. And if repo lenders raise the haircut from 2% to 5%, the fund must post **another $30 million** of collateral immediately — more than all of its capital.

By many estimates this trade was already running into the hundreds of billions of dollars before 2020 and has grown since; regulators including the Federal Reserve and the Bank for International Settlements have repeatedly flagged it as a potential systemic weak spot.

**What happened in March 2020?** The COVID shock set off a global dash for cash: foreign central banks, money funds and companies all sold Treasuries for dollars. Dealer balance sheets that should have absorbed the selling were full, cash Treasury prices fell abnormally, repo terms tightened, and the basis lurched the wrong way. Basis-trade funds were forced to unwind together — **selling still more cash Treasuries** and pouring fuel on the fire. The deepest, safest market in the world briefly malfunctioned. The Fed then bought at unprecedented speed — **more than a trillion dollars of Treasuries within a few weeks** — and flooded the repo market with liquidity before normal functioning returned (Stage 10.3 tells the full story).

That's the heart of this lesson: **hedging and arbitrage reduce risk and make markets more efficient — but when they're built on short-term funding and high leverage, even the safest asset can become a transmission belt for a crisis.** The next lesson (Stage 7.5) zooms in on that mechanism itself: how margin calls and forced liquidation make a fall feed on itself.

**The same logic in the new era:** in crypto, "hold spot + short the perpetual" delta-neutral strategies are the on-chain version of the basis trade — earning funding rather than betting on direction (Stage 13.5). And tokenized Treasuries (Stage 14.2) are starting to serve as on-chain collateral, so they may one day flow through these same repo and margin pipes. The pipes change; the physics of **leverage, haircuts and runs** does not.
`,

  demo: "swaps-hedging",

  analogy: `
A swap is like **two neighbors trading electricity bills**.

Mr. Wang's house has a meter billed at the floating market price, and every summer price spike makes him nervous. Mr. Zhao has a fixed-price contract but would rather ride the market. So they agree: "For the next five years, I'll pay you a fixed amount every month, and you'll pay me whatever my market-price bill comes to." Neither changes his own utility contract, but from now on Mr. Wang's monthly outlay is fixed — he has sold "electricity-price risk" to Mr. Zhao.

A **negative swap spread** is a strange thing in the same neighborhood: a fixed-price contract arranged between neighbors is *cheaper* than the fixed price sold by the national grid itself. Logically everyone should buy from the grid — except that to take a grid contract you first have to clear a large space in your yard for equipment (**balance sheet**). Every yard is already full, nobody can make room, and so the bargain just sits there.

The **basis trade** is a clever neighbor who notices that prepaid electricity cards (futures) cost a hair more than locking in power directly today (cash). He borrows 50 times his own money from a bank, locks in power in bulk and sells prepaid cards against it, earning a sliver on each. All is calm — until the bank says, "The deposit on your loan is going up from 2% to 5%." He can't find the deposit, so he dumps his contracts. Just then everyone in the neighborhood is dumping too; prices keep falling and deposit demands keep rising. In the end the **utility company itself (the Fed)** steps in and buys every contract being dumped, and the neighborhood's power market returns to normal.
`,

  misconceptions: [
    "**\"Swaps have hundreds of trillions of dollars of notional, so they carry hundreds of trillions of risk.\"** — Notional is only used to compute interest; it's never exchanged. The real risks are mark-to-market changes as rates move (DV01 × basis points) and counterparty default, which are far smaller than notional. Still, large concentrated margin needs can create liquidity shocks in a crisis.",
    "**\"Once I'm hedged, rate moves don't concern me.\"** — Hedged economically isn't the same as hedged in cash. Swaps exchange margin daily at market value, while the hedged asset or liability may not turn into cash for decades. The U.K. LDI crisis is the proof: the economics were right, the cash came due too fast.",
    "**\"Swap rates below Treasury yields are an obvious arbitrage; the market is irrational.\"** — Negative swap spreads reflect the balance-sheet cost of holding Treasuries, enormous Treasury supply and heavy demand to receive fixed. Arbitrage needs balance sheet, and balance sheet is scarce and has a price.",
    "**\"The basis trade is riskless arbitrage.\"** — The basis does go to zero at expiry, but on the way it can widen against you and financing can tighten overnight. At dozens-times leverage, a small move is enough to force an unwind. Only the destination is riskless, not the road to it.",
    "**\"A bank holding Treasuries is as safe as it gets and doesn't need to hedge.\"** — Treasuries have no credit risk but plenty of interest-rate risk (duration). Silicon Valley Bank's large holdings of long Treasuries and mortgage-backed securities produced huge unrealized losses once rates rose — the price of leaving rate risk unhedged.",
  ],

  quiz: [
    {
      q: "A company has a floating loan at SOFR + 1.5% and enters a swap to pay fixed 4% and receive SOFR. What is its effective borrowing cost?",
      options: [
        "SOFR + 5.5%",
        "A fixed 5.5%",
        "A fixed 4%",
        "SOFR − 2.5%",
      ],
      answer: 1,
      explain: "(SOFR + 1.5%) − SOFR + 4% = **a fixed 5.5%**. The floating pieces cancel and the floating loan has been \"turned into\" a fixed one.",
    },
    {
      q: "After signing, the five-year swap rate rises from 4% to 5%. What happens to the market value of the swap for the party paying fixed 4%?",
      options: [
        "Nothing — a swap is worth zero at signing",
        "It falls, because the fixed rate it pays has become more expensive",
        "It rises, because it has locked in a fixed rate below today's market",
        "It depends on today's SOFR level; impossible to say",
      ],
      answer: 2,
      explain: "Paying fixed ≈ being short a fixed-rate bond. When rates rise, fixed-rate bonds lose value and the short gains: $100M × (1 − 0.9562) ≈ **+$4.38M**.",
    },
    {
      q: "The 30-year dollar swap spread (swap rate − Treasury yield) has been mostly negative since 2008. Which of these is **not** a common explanation?",
      options: [
        "Banks holding Treasuries use balance sheet and face capital rules",
        "Huge Treasury supply means the market must absorb a lot of duration",
        "Pension funds and insurers receive long fixed rates in size",
        "U.S. Treasuries carry more default risk than banks",
      ],
      answer: 3,
      explain: "Negative swap spreads don't mean Treasuries are \"riskier\"; they come from **balance-sheet costs, Treasury supply and demand to receive fixed** working together.",
    },
    {
      q: "A fund runs a $1 billion Treasury basis trade at a 2% repo haircut ($20 million of its own capital). What happens if repo lenders raise the haircut to 5%?",
      options: [
        "It must post about $30 million more collateral immediately — more than all its capital — and may be forced to unwind",
        "Nothing, because the basis must go to zero at expiry",
        "The fund's return automatically increases",
        "The futures exchange makes up the difference",
      ],
      answer: 0,
      explain: "$1B × (5% − 2%) = **$30M**. That's the mechanism behind the mass basis-trade unwind of March 2020: the destination didn't change, but the financing road collapsed.",
    },
    {
      q: "In the U.K. LDI crisis of September 2022, why did pension funds' hedges become the problem?",
      options: [
        "Because the pension funds hadn't hedged at all",
        "Because the rate spike required them to post large amounts of collateral immediately, forcing them to sell long gilts and push yields even higher",
        "Because their liabilities grew as rates rose",
        "Because every swap dealer defaulted",
      ],
      answer: 1,
      explain: "Higher rates actually **shrank** the pensions' liabilities, so the economics were fine. The problem was that **collateral calls demanded cash faster than assets could be sold**: sell gilts, yields rise, more margin calls — until the Bank of England stepped in.",
    },
  ],

  further: [
    { label: "Federal Reserve FEDS Notes (2023): Recent Developments in Hedge Funds' Treasury Futures and Repo Positions — is the basis trade back?", url: "https://www.federalreserve.gov/econres/notes/feds-notes/recent-developments-in-hedge-funds-treasury-futures-and-repo-positions-20230830.html" },
    { label: "BIS Quarterly Review (September 2023), including analysis of margin leverage and basis-trade vulnerabilities in U.S. Treasury futures", url: "https://www.bis.org/publ/qtrpdf/r_qt2309.htm" },
    { label: "Bank of England: the September 2022 LDI episode in the December 2022 Financial Stability Report", url: "https://www.bankofengland.co.uk/financial-stability-report/2022/december-2022" },
    { label: "New York Fed: SOFR (Secured Overnight Financing Rate) official data and methodology", url: "https://www.newyorkfed.org/markets/reference-rates/sofr" },
    { label: "ISDA: interest-rate derivatives market data and swap basics", url: "https://www.isda.org/" },
  ],
};
