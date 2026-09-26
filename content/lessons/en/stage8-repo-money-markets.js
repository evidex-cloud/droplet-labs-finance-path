export default {
  id: "repo-money-markets",
  stage: 8,
  order: 3,
  title: "Repo & Money Markets: The Overnight Engine of the System",
  difficulty: "core",
  prereqs: ["clearing-settlement", "swaps-hedging"],

  oneLiner:
    "Every night, trillions of dollars in the U.S. financial system do the same thing: **pledge Treasuries, borrow cash for one night, pay it back tomorrow.** That's **repo** — a giant pawnshop. Dealers use it to finance their bond inventory, hedge funds use it to lever the basis trade dozens of times over, money-market funds use it to park their clients' cash, the Fed uses it to put a floor and a ceiling under interest rates, and **SOFR** is the pawnshop's overnight rate. Most days it runs as quietly as tap water. In 2008, September 2019 and March 2020 it clogged — and each time the crisis ended up on the Fed's doorstep.",

  intuition: `
Picture a big bond dealer; call it "Bluebridge Securities." It holds $100 million of 10-year U.S. Treasuries as market-making inventory (Stage 8.1). Tonight it needs $98 million in cash, and money will come in tomorrow morning. What does it do?

It calls a money-market fund that has spare cash and signs an agreement:

- **Today**: Bluebridge "sells" the $100 million of Treasuries to the fund, and the fund pays Bluebridge **$98 million** in cash.
- **Tomorrow**: Bluebridge "buys back" the same Treasuries for **$98,010,617**.

The extra $10,617 is one night's interest, about 3.9% a year. The $2 million gap between the $100 million of bonds and the $98 million of cash is the **haircut** — the fund's cushion. If Bluebridge defaults tomorrow, the fund holds $100 million of Treasuries; selling them gets its $98 million back with room to spare.

That's a **repurchase agreement, or repo**: **legally a sale and a repurchase, economically a short-term loan secured by securities.** From the fund's side it's called a **reverse repo**. Think of it as a pawnshop: you pawn your gold watch for cash and redeem it tomorrow for a little interest. The pawnshop doesn't care who you are; it only cares what the watch is worth.

How big is this pawnshop? U.S. repo volume runs to **trillions of dollars a day**. The rate built on it, **SOFR (the Secured Overnight Financing Rate)**, has been published daily by the New York Fed since 2018. It replaced LIBOR as the anchor for hundreds of trillions of dollars of dollar derivatives and floating-rate loans — the floating leg of the swaps in Stage 7.4 is tied to SOFR.

Who borrows? Dealers financing inventory; hedge funds financing basis trades and leveraged positions; banks managing their Treasury holdings. Who lends? The biggest group by far is **money-market funds** — funds that promise "withdraw any time, almost never lose money." They're worth trillions of dollars, pooling the spare cash of households and companies and lending it into repo or buying short-term Treasury bills every night.

This lesson rests on **Idea ③ Liquidity & trust (the plumbing)**: repo is the system's overnight engine, and nearly every institution's cash and securities pass through it daily. It's also the very shortest end of **Idea ① The price of time** — the overnight rate is the price of a single night, and the whole yield curve (Stage 4.3) starts here. And it drives **Idea ④ Risk & leverage**: the haircut sets how much you can borrow. A 2% haircut means 50x leverage, and when haircuts rise, leverage gets torn down by force.

It connects to lessons on both sides. The Treasury basis trade in Stage 7.4 runs on repo financing; the clearing houses of Stage 8.2 clear repo too; Stage 9.1 shows how the Fed uses repo tools to set a floor and a ceiling for rates; the tokenized money funds of Stage 14.2 are the on-chain version of the money-market funds here; and Stage 17.4 lines up a variable-rate preferred like STRC against money funds and T-bills.

**In this lesson we break it into five pieces:**

- **① Repo: borrowing overnight against Treasuries**
- **② Haircuts and leverage: one number decides how much you can borrow**
- **③ A map of the repo market: tri-party, bilateral, cleared — and SOFR**
- **④ Money-market funds: who lends cash into repo**
- **⑤ When the pipes clog: 2008, September 2019 and March 2020**
`,

  mechanics: `
### ① Repo: borrowing overnight against Treasuries

A repo has five ingredients: **collateral** (usually Treasuries), a **cash amount**, a **repo rate**, a **term** (overwhelmingly overnight, though there is "term repo" for a week or a month) and a **haircut**. Interest follows the money-market convention of actual days over 360:

$$
\\text{Repo interest} = \\text{cash borrowed} \\times \\text{repo rate} \\times \\frac{\\text{days}}{360}
$$

Bluebridge's example:

$$
\\text{Repo interest} = \\$98\\text{M} \\times 3.9\\% \\times \\frac{1}{360} \\approx \\$10{,}617
\\text{Repurchase price} = \\$98{,}000{,}000 + \\$10{,}617 \\approx \\$98{,}010{,}617
$$

<figure><svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">An overnight repo: sell today, buy back tomorrow</text><rect x="40" y="70" width="170" height="80" rx="10" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="125" y="100" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--ink)">Cash borrower (repo)</text><text x="125" y="120" text-anchor="middle" font-size="10.5" fill="var(--muted)">dealers, hedge funds</text><text x="125" y="136" text-anchor="middle" font-size="10.5" fill="var(--muted)">own bonds, need cash</text><rect x="430" y="70" width="170" height="80" rx="10" fill="var(--green-soft)" stroke="var(--green)"/><text x="515" y="100" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--ink)">Cash lender (reverse)</text><text x="515" y="120" text-anchor="middle" font-size="10.5" fill="var(--muted)">money funds, banks, the Fed</text><text x="515" y="136" text-anchor="middle" font-size="10.5" fill="var(--muted)">have cash, want safety</text><text x="320" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Today (start leg)</text><line x1="215" y1="80" x2="420" y2="80" stroke="var(--muted)" stroke-width="2"/><polygon points="420,75 430,80 420,85" fill="var(--muted)"/><text x="320" y="74" text-anchor="middle" font-size="10.5" fill="var(--ink)">$100M of Treasuries (collateral)</text><line x1="425" y1="102" x2="220" y2="102" stroke="var(--green)" stroke-width="2"/><polygon points="220,97 210,102 220,107" fill="var(--green)"/><text x="320" y="97" text-anchor="middle" font-size="10.5" fill="var(--green)">$98M cash (2% haircut)</text><text x="320" y="176" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Tomorrow (end leg)</text><line x1="215" y1="128" x2="420" y2="128" stroke="var(--green)" stroke-width="2"/><polygon points="420,123 430,128 420,133" fill="var(--green)"/><text x="320" y="123" text-anchor="middle" font-size="10.5" fill="var(--green)">$98.01M cash (principal + one night)</text><line x1="425" y1="148" x2="220" y2="148" stroke="var(--muted)" stroke-width="2"/><polygon points="220,143 210,148 220,153" fill="var(--muted)"/><text x="320" y="162" text-anchor="middle" font-size="10.5" fill="var(--ink)">Treasuries returned</text><rect x="90" y="192" width="460" height="44" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="210" text-anchor="middle" font-size="11" fill="var(--ink)">Legally a sale plus agreed buyback: if the borrower fails, the lender sells at once</text><text x="320" y="226" text-anchor="middle" font-size="10.5" fill="var(--muted)">Haircut = the lender's cushion; overnight rate = the price of one night</text></svg><figcaption>Economically a repo is a secured loan. U.S. bankruptcy law gives repo "safe harbor" treatment: if the borrower goes bust, the lender doesn't have to wait for a court and can sell the collateral straight away.</figcaption></figure>

Why dress a loan up as a purchase and sale? **Legal treatment.** U.S. bankruptcy law gives repo a "safe harbor": when a borrower fails, ordinary creditors are frozen by the court's automatic stay, but a repo lender can sell the Treasuries it holds **immediately** and get its money back. That's why repo rates sit below unsecured borrowing costs, and why money funds dare to lend hundreds of billions of dollars overnight.

What repo is used for:

- **Dealers financing inventory.** A market maker's Treasury inventory (Stage 8.1) is funded night by night with repo.
- **Leveraged investors.** A hedge fund buys Treasuries, repos them out to borrow cash, and only has to put up the haircut. That's how Stage 7.4's basis trade gets levered dozens of times.
- **Cash management.** Money funds, corporate treasurers and foreign central banks park cash safely overnight.
- **Borrowing a specific bond.** If everyone wants to borrow a particular Treasury to short it, cash lenders will accept a lower rate to get hold of it. That's a **special**, and its rate can even go below zero. Ordinary "any Treasury will do" repo is **general collateral (GC)**.

### ② Haircuts and leverage: one number decides how much you can borrow

The haircut directly caps leverage:

$$
\\text{Cash you can borrow} = \\text{collateral value} \\times (1 - \\text{haircut})
\\text{Your own capital} = \\text{collateral value} \\times \\text{haircut}
\\text{Maximum leverage} = \\frac{1}{\\text{haircut}}
\\frac{1}{2\\%} = 50\\times, \\quad \\frac{1}{5\\%} = 20\\times, \\quad \\frac{1}{15\\%} \\approx 6.7\\times
$$

The haircut depends on how safe and how easy to sell the collateral is. Short Treasuries get the smallest; long Treasuries a bit more (their prices swing more — the duration of Stage 4.4); agency MBS, corporate bonds and stocks progressively more. It's the lender's estimate of how far the collateral could fall overnight.

Bluebridge's numbers show both edges of the blade. It supports $100 million of 10-year Treasuries (yielding about 5.17%, the September 2026 level) with $2 million of its own capital, at a repo cost of 3.9%:

- **Carry**: $5.17 million a year of coupon income minus about $3.82 million of repo interest leaves a net **$1.35 million** — roughly **67% a year** on $2 million of capital.
- **Rate risk**: the bond's modified duration is about 7.7. If its yield rises just **10 basis points**, the price drops from 100 to about 99.23: a loss of about **$770,000**, **38%** of the capital. A **50 bp** rise loses about $3.78 million — **the capital is gone, and then some.**

The lender marks the collateral to market every day. When the price falls, it asks the borrower for more cash or more bonds — a **margin call**. In the 10 bp example, the call is about \\(\\$770{,}000 \\times 98\\% \\approx \\$755{,}000\\).

Even more dangerous is a **rise in the haircut itself**. If the lender lifts the haircut from 2% to 5%, the borrower must immediately find \\(\\$100\\ \\text{million} \\times 3\\% =\\) **$3 million** — even though the price hasn't moved a cent, and even though that's more than its entire capital. That's the Achilles' heel of the basis trade in Stage 7.4, and the mechanism of the 2008 "run on repo": in the crisis, haircuts on some securitized collateral jumped from near zero to tens of percent, forcing the whole "shadow banking" system to deleverage at once.

**Collateral also gets reused.** The Treasuries a cash lender receives are often repoed out again or lent to short sellers — **rehypothecation**. A $100 million Treasury used three times in a row at a 2% haircut can support about \\(\\$98\\text{M} + \\$96.04\\text{M} + \\$94.12\\text{M} \\approx\\) **$288 million** of financing. Economists call this the **velocity of collateral**: it lets the same safe asset support more credit, and it lets a break at one link travel down the whole chain.

The new-era parallel: over-collateralized lending in DeFi (Stage 13.4) is repo on-chain. "Loan-to-value" is the haircut by another name, and when the "health factor" falls below 1, liquidation happens automatically — the margin-call phone call replaced by a line of code.

### ③ A map of the repo market: tri-party, bilateral, cleared — and SOFR

The U.S. repo market has a few main segments:

- **Tri-party repo**: a **tri-party agent** bank (in the U.S., today essentially BNY) sits between the two sides, selecting, valuing and safekeeping the collateral and adjusting it daily. Money funds do much of their lending here.
- **Bilateral repo**: the two sides deliver securities directly, often to borrow specific bonds.
- **Centrally cleared repo**: cleared through DTCC's FICC, with the clearing house as counterparty to both sides (Stage 8.2). The SEC's Treasury clearing rules push more repo into central clearing, phased in over 2026–2027.

On top of all this, the New York Fed computes **SOFR** each day: the volume-weighted median rate of the previous day's overnight Treasury repo trades (tri-party, GCF and some centrally cleared bilateral trades). It has two virtues LIBOR lacked: it's based on **actual transactions** rather than bank estimates, and it's **nearly free of credit risk** because Treasuries back it. After dollar LIBOR ended at the close of June 2023, SOFR became the main dollar floating-rate benchmark.

The Fed keeps short-term rates inside a "corridor" using repo tools (more in Stage 9.1):

- **The floor: the overnight reverse repo facility (ON RRP).** Money funds and others can lend cash to the Fed at a fixed rate equal to the bottom of the fed funds target range. With that guaranteed option, no one lends for less. Usage topped **$2.5 trillion** at the end of 2022 and then drained toward zero as quantitative tightening proceeded.
- **The ceiling: the Standing Repo Facility (SRF, created in 2021).** Primary dealers and eligible banks can repo Treasuries to the Fed at the top of the target range, which stops repo rates from spiking.

As of September 2026, the fed funds target range is **3.75%–4.00%** (after a 25 bp hike on September 16), with the effective fed funds rate around 3.88%; SOFR usually trades close to that range (check the New York Fed's daily publication for the exact figure).

### ④ Money-market funds: who lends cash into repo

A **money-market fund (MMF)** is a mutual fund that invests only in very short-term, very high-quality assets: Treasury bills, repo, commercial paper and bank CDs. Its promise to investors is **"almost as safe as a deposit and available any time, but paying close to market rates."** According to the Investment Company Institute (ICI), U.S. money-fund assets had grown past the $7 trillion mark by 2025.

Two main kinds:

- **Government money funds** hold only T-bills, Treasury repo and cash, and usually keep a stable $1 share price. They're among the biggest buyers in the repo and T-bill markets.
- **Prime money funds** also hold corporate commercial paper and bank CDs: a bit more yield, a bit more risk. Institutional prime funds have had to float their share price since 2016.

In the hierarchy of money from Stage 1.1, money funds sit **below bank deposits**: their shares aren't deposits and carry no deposit insurance, and their "$1" is a promise upheld by asset quality and liquidity. That promise has broken:

- **September 16, 2008**, the day after Lehman failed, the venerable Reserve Primary Fund, which held Lehman commercial paper, saw its share price fall to **$0.97** — it "broke the buck." Prime funds suffered a run, the commercial-paper market nearly froze, and the U.S. Treasury had to guarantee money funds temporarily (Stage 10.2).
- **March 2020** brought another wave of redemptions from prime funds, and the Fed set up a dedicated facility to support them. The SEC reformed the rules again in 2023, raising liquidity requirements and imposing mandatory liquidity fees on institutional prime funds.

**The new-era mirror image**: a **fiat-backed stablecoin** (Stage 13.2) is structurally much like a "government money fund that pays no interest." Under the GENIUS Act its reserves may only be cash, deposits, T-bills of 93 days or less, overnight repo and government money funds, reported publicly every month — which makes stablecoin issuers new buyers in the T-bill and repo markets. The tokenized money funds of Stage 14.2 go a step further, putting money-fund shares themselves on-chain so they can move around the clock and serve as collateral. **The same claim on safe short-term assets, carried through a different pipe.**

### ⑤ When the pipes clog: 2008, September 2019 and March 2020

Repo is so quiet most of the time that people forget it exists; you only see it when it clogs. Three famous blockages, three different causes:

**2008: collateral stopped being trusted.** Bear Stearns (March 2008) and Lehman (September 2008) both relied heavily on overnight repo to fund their assets. When markets began to doubt what their collateral — mortgage securities — was really worth, lenders either raised haircuts sharply or simply stopped rolling the loans. **Repo is rolled over night by night; once trust goes, the funding is gone the next morning.** This "run on repo" was one of the core mechanisms of the 2008 crisis (Stage 10.2).

**September 2019: the cash suddenly ran short.** On September 16–17, 2019, U.S. repo rates spiked: SOFR jumped from a little over 2% to **5.25%** in a day, and some trades printed around 10%, far above the Fed's 2.00%–2.25% target range at the time. Several things collided: quarterly corporate tax payments and the settlement of new Treasury issues drained a large amount of cash from the banking system at once (the money moved into the Treasury's account at the Fed); earlier quantitative tightening had already pushed bank reserves fairly low; and the big banks holding most of the reserves were reluctant to lend them out even at high rates because of liquidity regulations. **The problem wasn't that nobody trusted the collateral; the "water level" of cash had dropped to the point where the pipes seized.** The Fed began daily repo operations that same day and later started buying T-bills to rebuild "ample reserves."

**March 2020: even the best collateral couldn't be sold.** The COVID shock set off a global dash for cash. Foreign central banks, funds and companies all sold Treasuries, dealers' balance sheets filled up, basis trades were forced to unwind (Stage 7.4), and the Treasury market briefly stopped working. Only repo lending and Treasury purchases by the Fed on an unprecedented scale got the plumbing running again (Stage 10.3).

Those three blockages directly shape today's policy. The Fed ended quantitative tightening on December 1, 2025 and began buying T-bills as "reserve management purchases," with the explicit goal of keeping reserves **ample** — it doesn't want another September 2019. **The repo market is the financial system's heartbeat: watching whether SOFR suddenly jumps out of its range is one of the fastest ways to check whether the plumbing is healthy.**
`,

  demo: "repo-money-markets",

  analogy: `
Think of repo as **a 24-hour pawnshop that only accepts gold bars**.

You need cash tonight, so you pawn a gold bar worth $1 million. The pawnshop gives you only $980,000, keeping $20,000 in reserve in case gold falls tomorrow (the **haircut**). Tomorrow morning you pay $980,106 to redeem the bar; the extra $106 is one night's interest (the **repo rate**). The pawnshop doesn't check your income or your character. It only checks the purity and weight of the gold.

Where does the pawnshop's cash come from? From the **"withdraw-any-time" savings club** next door (a money-market fund). Local residents put spare cash in the club, the club lends it to the pawnshop every night for a little interest, and residents can take their money out whenever they like. The club promises "put in a dollar, take out a dollar" — but it isn't a bank and has no deposit insurance. In 2008 one club had taken a bad IOU and could only pay back 97 cents on the dollar, and the whole town lined up overnight to withdraw.

A clever local discovers a trick: pawn a bar for $980,000, buy another bar, pawn that one, buy another… $2 million of his own money controls $100 million of gold (**leverage**). If gold ticks up, he makes a fortune; if it drops 1%, half his money is gone. Worse: if one day the pawnshop announces "from today we only lend 95%," he has to produce $3 million overnight. He doesn't have it, so he dumps all his gold — at the same moment every other clever local in town is dumping theirs.

The town's **central bank** runs two windows at either end of the street. One says: "Anyone with spare cash can deposit it with me at X%" (the **floor**). The other says: "Anyone with good gold can pawn it with me at Y%" (the **ceiling**). As long as both windows are open, the pawnshop's rate can't escape that corridor. In September 2019 the ceiling window hadn't been built yet, and the pawnshop's rate more than doubled overnight.
`,

  misconceptions: [
    "**\"Repo is just buying and selling bonds; it has nothing to do with borrowing.\"** — It's a sale with an agreed buyback in form, and a short-term secured loan in substance. The higher buyback price is the interest, and the haircut is the lender's cushion. The sale-and-buyback form exists to get \"safe harbor\" treatment in bankruptcy.",
    "**\"With Treasuries as collateral, repo is risk-free.\"** — The lender's credit risk is indeed small, but the borrower carries huge funding and leverage risk: a 2% haircut is 50x leverage, a small price drop triggers a margin call, and a haircut increase can tear down the leverage overnight. The fire sales of 2008 and March 2020 both came from this.",
    "**\"A money-market fund is the same as a bank deposit.\"** — Its shares carry no deposit insurance, and \"$1 a share\" is a promise upheld by asset quality and liquidity. The Reserve Primary Fund breaking the buck in 2008 and the run on prime funds in March 2020 show it sits one rung below deposits.",
    "**\"The September 2019 repo spike meant some institution was about to fail.\"** — It wasn't a credit crisis but a cash \"water level\" problem: tax payments and Treasury settlements drained reserves at once, reserves were already low, and big banks were constrained by liquidity rules from lending. The fix was injecting reserves, not rescuing anyone.",
    "**\"SOFR is just LIBOR with a new name.\"** — LIBOR was based on bank estimates, carried bank credit risk and was once manipulated; SOFR is based on real overnight Treasury repo trades every day and is nearly free of credit risk. That's why in stress periods SOFR and banks' own borrowing costs can move apart.",
  ],

  quiz: [
    {
      q: "An overnight repo: $100 million of Treasury collateral, a 2% haircut, a 3.9% repo rate (actual/360). How much interest does the borrower pay tomorrow?",
      options: [
        "About $10,833",
        "About $3.9 million",
        "About $10,617",
        "$2 million",
      ],
      answer: 2,
      explain: "The cash borrowed is \\(\\$100\\text{M} \\times (1 - 2\\%) = \\$98\\text{M}\\); interest \\(= \\$98\\text{M} \\times 3.9\\% \\times \\dfrac{1}{360} \\approx\\) **$10,617**. $10,833 is what you get if you mistakenly treat the full $100M as the loan.",
    },
    {
      q: "The repo haircut is 2%. What is the theoretical maximum leverage? And if the haircut rises to 5%, how much must a borrower holding $100 million of Treasuries put up immediately?",
      options: [
        "50x; $3 million",
        "2x; $5 million",
        "20x; $2 million",
        "50x; nothing, because the price hasn't changed",
      ],
      answer: 0,
      explain: "\\(\\text{Maximum leverage} = \\dfrac{1}{2\\%} =\\) **50x**. Moving the haircut from 2% to 5% cuts the cash available from $98M to $95M, so the **$3 million** difference must be found at once — even with no price change. That's the weak spot of the basis trade and of the 2008 run on repo.",
    },
    {
      q: "Which statement about SOFR is correct?",
      options: [
        "It is a quoted rate for unsecured interbank lending, just like LIBOR",
        "The Fed sets it directly and adjusts it every six weeks",
        "It is only published on Treasury auction days",
        "It is calculated from the previous day's actual overnight Treasury repo trades, is nearly free of credit risk, and is the main dollar floating-rate benchmark",
      ],
      answer: 3,
      explain: "The New York Fed computes SOFR daily from **actual overnight Treasury repo trades**; it became the main benchmark after dollar LIBOR ended in mid-2023. The Fed sets the fed funds target range, and SOFR usually trades near it.",
    },
    {
      q: "What was the main cause of the September 2019 repo spike?",
      options: [
        "A large hedge fund defaulted and lenders stopped trusting collateral",
        "Tax payments and Treasury settlements drained cash while bank reserves were already low and big banks were unwilling to lend — the cash \"water level\" hit a critical point",
        "The Fed suddenly hiked rates sharply",
        "Treasuries were downgraded and could no longer serve as collateral",
      ],
      answer: 1,
      explain: "It was a **liquidity water-level** problem, not a credit problem. The Fed injected repo cash and began buying T-bills to rebuild ample reserves; ending QT in 2025 and starting reserve management purchases was also meant to avoid a repeat.",
    },
    {
      q: "Why is a fiat-backed stablecoin structurally like a \"government money fund that pays no interest\"?",
      options: [
        "Because both are issued by the Fed",
        "Because both carry deposit insurance",
        "Because under the GENIUS Act, stablecoin reserves may only be cash, deposits, short T-bills, overnight repo and government money funds, with a promise of 1:1 redemption",
        "Because a stablecoin's price floats with interest rates every day",
      ],
      answer: 2,
      explain: "Both are **claims on safe short-term assets**, both promise \"a dollar is a dollar,\" and both can suffer runs. The difference: by law a stablecoin can't pay its holders interest, and it runs on-chain.",
    },
  ],

  further: [
    { label: "New York Fed: SOFR and other reference rates — official data and methodology", url: "https://www.newyorkfed.org/markets/reference-rates/sofr" },
    { label: "Office of Financial Research: U.S. short-term funding and repo market monitor", url: "https://www.financialresearch.gov/short-term-funding-monitor/" },
    { label: "Federal Reserve FEDS Notes (2020): What Happened in Money Markets in September 2019?", url: "https://www.federalreserve.gov/econres/notes/feds-notes/what-happened-in-money-markets-in-september-2019-20200227.html" },
    { label: "Gorton & Metrick: Securitized Banking and the Run on Repo (the classic study of 2008's repo run)", url: "https://www.nber.org/papers/w15223" },
    { label: "ICI: weekly statistics on U.S. money-market fund assets", url: "https://www.ici.org/research/stats/mmf" },
  ],
};
