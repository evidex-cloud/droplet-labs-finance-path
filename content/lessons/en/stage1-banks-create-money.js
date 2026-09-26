export default {
  id: "banks-create-money",
  stage: 1,
  order: 2,
  title: "How Banks Create Money: Deposits, Loans & Fractional Reserves",
  difficulty: "intro",
  prereqs: ["what-is-money"],

  oneLiner:
    "Most people picture a bank as a middleman that lends out savers' money. Reality runs the other way: **the moment a bank makes a loan, it writes a brand-new deposit into the borrower's account — loans create deposits.** Most of the money circulating in the economy was “written” into existence this way by commercial banks. What really limits it is not reserves but capital, profitability and loan demand; and what makes it fragile is the **maturity mismatch** between deposits you can withdraw today and loans that take decades to repay — the seed of every bank run.",

  intuition: `
Imagine you apply for a $300,000 mortgage and the bank approves it. What happens next?

Most people picture the bank reaching into its vault — into money other customers deposited — pulling out $300,000 and sending it to you. **That picture is wrong.** What actually happens is this: on the asset side of its books the bank records “this customer owes us $300,000 (a loan),” and on the liability side it records “we owe this customer $300,000 (a deposit).” Both entries appear at once, the books balance, and **the world now has $300,000 more in deposits — that is, $300,000 more money.** Nobody else's balance went down.

In 2014 the Bank of England published an article in its official Quarterly Bulletin specifically to correct this misunderstanding. It was titled “Money creation in the modern economy,” and its conclusion fits in a sentence: **in the modern economy, most money is created by commercial banks making loans.** In the previous lesson (Stage 1.1) we saw that a deposit is just a liability number on a bank's books — and if it is a number, the bank can write a new one.

It sounds like a magic trick, even like cheating. So why don't banks lend without limit? Three gates:

- **Capital.** For every loan, the bank must have a slice of shareholders' money underneath it to absorb losses. Without enough capital, it cannot lend more.
- **Profit and risk.** A loan only makes money if it is repaid. Lend to people who can't pay and the bank eats the loss.
- **Demand.** Someone has to want to borrow at the going rate.

There is also a factor people routinely overrate: **reserves.** The textbook “money multiplier” says banks can lend only a fixed multiple of their reserves. Yet the US cut its reserve requirement to zero in March 2020, and banks did not expand without limit. The real job of reserves is **settlement between banks**: when your mortgage money is paid to the seller, and the seller banks elsewhere, your bank has to move reserves over to the seller's bank.

This lesson rests on two of the course's four ideas: **Idea ② — balance sheets**, because creating money means expanding both sides of a bank's balance sheet at once; and **Idea ③ — liquidity & trust**, because a bank puts deposits that can leave at any moment into loans and bonds that take years to come back. That is called **maturity mismatch**. In normal times it is how banks make money; in a crisis it is what makes a run possible. Silicon Valley Bank in March 2023 is the latest textbook case, and we take it apart line by line in Stage 10.3.

**In this lesson we break it into five pieces:**

- **① Loans create deposits: walking through the T-accounts**
- **② What reserves are for: interbank settlement and the money-multiplier myth**
- **③ The real gates: capital requirements, profit and loan demand**
- **④ Maturity mismatch: why banks are born runnable**
- **⑤ Money creation in the new era: narrow banks, stablecoins and on-chain lending**
`,

  mechanics: `
### ① Loans create deposits: walking through the T-accounts

The **T-account** is the one tool you need to understand a bank. On the left go assets (what the bank owns and what others owe it); on the right go liabilities and shareholders' equity (what the bank owes others, and what belongs to the owners). **The two sides always balance**: assets = liabilities + equity.

Take a small bank, “Green Orange Bank” (figures in $ millions). At the start its assets are reserves 10, loans 60 and bonds 30, for 100 in total; its liabilities are deposits of 90, and shareholders' equity is 10.

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Green Orange Bank in three T-accounts ($ millions)</text><g><rect x="14" y="34" width="196" height="210" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="112" y="52" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Step 0: the start</text><line x1="112" y1="60" x2="112" y2="232" stroke="var(--line)"/><text x="62" y="76" text-anchor="middle" font-size="10" fill="var(--muted)">Assets</text><text x="162" y="76" text-anchor="middle" font-size="10" fill="var(--muted)">Liab. + equity</text><text x="62" y="100" text-anchor="middle" font-size="11" fill="var(--ink)">Reserves 10</text><text x="62" y="120" text-anchor="middle" font-size="11" fill="var(--ink)">Loans 60</text><text x="62" y="140" text-anchor="middle" font-size="11" fill="var(--ink)">Bonds 30</text><text x="162" y="100" text-anchor="middle" font-size="11" fill="var(--ink)">Deposits 90</text><text x="162" y="120" text-anchor="middle" font-size="11" fill="var(--ink)">Equity 10</text><text x="112" y="222" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted)">Total 100 = 100</text></g><g><rect x="222" y="34" width="196" height="210" rx="8" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="320" y="52" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Step 1: lend 10</text><line x1="320" y1="60" x2="320" y2="232" stroke="var(--orange-line)"/><text x="270" y="76" text-anchor="middle" font-size="10" fill="var(--muted)">Assets</text><text x="370" y="76" text-anchor="middle" font-size="10" fill="var(--muted)">Liab. + equity</text><text x="270" y="100" text-anchor="middle" font-size="11" fill="var(--ink)">Reserves 10</text><text x="270" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Loans 70 ↑</text><text x="270" y="140" text-anchor="middle" font-size="11" fill="var(--ink)">Bonds 30</text><text x="370" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Deposits 100 ↑</text><text x="370" y="120" text-anchor="middle" font-size="11" fill="var(--ink)">Equity 10</text><text x="320" y="200" text-anchor="middle" font-size="10" fill="var(--orange-ink)">New money is born: deposits +10</text><text x="320" y="222" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted)">Total 110 = 110</text></g><g><rect x="430" y="34" width="196" height="210" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="528" y="52" text-anchor="middle" font-size="12" font-weight="700" fill="var(--blue)">Step 2: paid to another bank</text><line x1="528" y1="60" x2="528" y2="232" stroke="var(--blue)"/><text x="478" y="76" text-anchor="middle" font-size="10" fill="var(--muted)">Assets</text><text x="578" y="76" text-anchor="middle" font-size="10" fill="var(--muted)">Liab. + equity</text><text x="478" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">Reserves 0 ↓</text><text x="478" y="120" text-anchor="middle" font-size="11" fill="var(--ink)">Loans 70</text><text x="478" y="140" text-anchor="middle" font-size="11" fill="var(--ink)">Bonds 30</text><text x="578" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">Deposits 90 ↓</text><text x="578" y="120" text-anchor="middle" font-size="11" fill="var(--ink)">Equity 10</text><text x="528" y="200" text-anchor="middle" font-size="10" fill="var(--blue)">The deposit moves; reserves follow</text><text x="528" y="222" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted)">Total 100 = 100</text></g><text x="320" y="270" text-anchor="middle" font-size="11" fill="var(--ink)">For the banking system as a whole the new 10 of deposits did not vanish — it now sits at the seller's bank</text><text x="320" y="290" text-anchor="middle" font-size="11" fill="var(--muted)">What a single bank must worry about is step 2: short of reserves, it borrows from other banks or the central bank</text></svg><figcaption>The loan and the deposit appear together (step 1); when the deposit is spent, reserves move between banks (step 2).</figcaption></figure>

Two things to take from the picture:

- **In step 1 nobody's deposit went down**, yet total deposits went from 90 to 100. That is all “banks create money” means. The reverse also holds: **when a borrower repays, the loan and the deposit shrink together and money is destroyed.** That is why the money supply rises and falls largely with the expansion and contraction of credit.
- **Step 2 is where a bank actually feels the constraint.** People borrow in order to spend — paying the home seller or a supplier. If the recipient banks elsewhere, Green Orange Bank must transfer 10 of reserves to that bank. So a single bank's lending is limited by whether it can always produce reserves — either holding them already or being able to borrow them from other banks or the central bank.

### ② What reserves are for: interbank settlement and the money-multiplier myth

**Reserves** are the balances commercial banks hold in their accounts at the central bank — the top layer of the money pyramid from Stage 1.1. Ordinary people never touch them; only banks (and a few other institutions) can hold them. Their core job is **final settlement between banks**: trillions of dollars of payments every day ultimately show up as reserves moving from one bank's account at the central bank to another's.

The old textbook tells the **money multiplier** story: suppose the reserve requirement is 10%. You deposit $100; the bank keeps $10 and lends $90; the $90 lands in another bank, which keeps $9 and lends $81; and so on. Add it all up and $100 of reserves “supports” $1,000 of deposits — a multiplier of 1 ÷ 10% = 10.

The story has the causation backward. It assumes **deposits come first and loans second**, and that banks are held back by reserves. In reality:

- **Banks lend first and look for reserves afterward.** If a loan is profitable, the bank makes it and borrows any reserves it needs in the interbank market. The central bank, to keep interest rates on target, lets the total quantity of reserves adjust to what the system needs (Stage 1.3).
- **Reserve requirements are low or zero in many countries.** The US cut its requirement to zero on March 26, 2020; Canada and the UK had long since stopped imposing them.
- **After 2008 reserves exploded — lending didn't.** The Fed's quantitative easing (Stage 9.1) took banking-system reserves from tens of billions of dollars to several trillion. By the multiplier, credit should have exploded. It didn't, because loan demand and capital were the real bottlenecks.

So the more accurate statement is: **reserves are the banking system's settlement fuel, not the raw material of money creation.**

### ③ The real gates: capital requirements, profit and loan demand

The first gate on lending is **capital.** Shareholders' equity is the cushion under depositors: when loans go bad, shareholders lose first, and depositors lose only once the cushion is gone. Regulators insist the cushion not be too thin.

The international standard, **Basel III**, requires a bank's common equity tier 1 capital (CET1) to be at least 4.5% of its **risk-weighted assets**, plus a 2.5% capital conservation buffer, for 7% in total, with extra surcharges for the largest banks. On top of that sits a **leverage ratio** floor that ignores risk weights (capital over total exposure, a baseline of 3%).

Feel it in numbers: Green Orange Bank has equity of 10 against assets of 100 — a 10% leverage ratio. If its assets lose 10% of their value, the equity is gone. **A bank is essentially an institution levered about ten to one** — that is Idea ④, risk & leverage, wearing a banker's suit. It is also why capital, not reserves, sets the real ceiling on lending: to add 100 of new loans, the bank needs roughly 7–10 more of shareholders' capital, either retained from profits or raised by issuing new shares (issuance and dilution are Stage 5.5).

<table>
<tr><th>Constraint</th><th>What it limits</th><th>Example</th></tr>
<tr><td>Capital requirement</td><td>How big assets can be relative to shareholders' equity</td><td>CET1 ≥ 7% of risk-weighted assets (including the buffer)</td></tr>
<tr><td>Liquidity requirement</td><td>Cash and liquid assets available at short notice</td><td>Liquidity coverage ratio (LCR): high-quality liquid assets ≥ net outflows in a 30-day stress</td></tr>
<tr><td>Profit and risk</td><td>Whom to lend to and at what rate</td><td>The loan rate must cover funding cost + expected losses + a return on capital</td></tr>
<tr><td>Loan demand</td><td>Whether anyone wants to borrow</td><td>When rates rise, mortgage applications fall and new loans (new deposits) slow</td></tr>
</table>

The last row leads straight to the central bank: **when it raises rates, loan demand falls and banks create less new money**; when it cuts, the opposite. That is the starting point of the “policy transmission” covered in Stage 1.3 and Stage 9.2.

### ④ Maturity mismatch: why banks are born runnable

A bank's core way of earning money is **maturity transformation**: borrow short (demand deposits, withdrawable any time), lend long (30-year mortgages, 10-year Treasuries). Long-term rates are usually higher than short-term rates, and the gap is the profit. The price: **the bank's liabilities have a maturity of roughly zero, while its assets are long-dated.**

<figure><svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Maturity mismatch: assets take years to come back; liabilities can leave today</text><line x1="80" y1="190" x2="610" y2="190" stroke="var(--line)" stroke-width="1.5"/><text x="80" y="206" text-anchor="middle" font-size="10" fill="var(--muted)">Today</text><text x="186" y="206" text-anchor="middle" font-size="10" fill="var(--muted)">2 yrs</text><text x="345" y="206" text-anchor="middle" font-size="10" fill="var(--muted)">10 yrs</text><text x="610" y="206" text-anchor="middle" font-size="10" fill="var(--muted)">30 yrs</text><text x="40" y="62" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Assets</text><rect x="80" y="44" width="10" height="26" rx="3" fill="var(--green)"/><text x="98" y="62" font-size="11" fill="var(--ink)">Reserves: usable now</text><rect x="80" y="80" width="265" height="26" rx="3" fill="var(--orange)" opacity=".7"/><text x="352" y="98" font-size="11" fill="var(--ink)">Treasuries/MBS: 10 yrs, fall when rates rise</text><rect x="80" y="116" width="530" height="26" rx="3" fill="var(--orange)" opacity=".45"/><text x="90" y="134" font-size="11" fill="var(--ink)">Mortgages: 30 yrs, hard to sell quickly</text><text x="40" y="170" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Liab.</text><rect x="80" y="152" width="8" height="26" rx="3" fill="var(--red)"/><text x="96" y="170" font-size="11" fill="var(--red)" font-weight="600">Demand deposits: maturity = 0, gone with one click</text></svg><figcaption>As long as everyone doesn't withdraw at once, maturity mismatch is profit; the moment they do, it is a run.</figcaption></figure>

Normally this is fine: every day some people withdraw and others deposit, net outflows are small, and a thin layer of reserves is plenty. The trouble comes when **everyone wants out at once**:

- The bank holds only 10 of reserves but owes 90 of demand deposits.
- To pay out, it must sell bonds and loans. Bonds can be sold — but if rates have risen since they were bought, **they sell below cost, and paper losses become real ones** (the price–yield seesaw of Stage 4.2). Loans are harder still and often go only at a steep discount.
- The losses eat the equity, word gets out, more depositors line up — **a run feeds itself.**

The cruelest part: **a run can hit a bank that was fundamentally healthy.** If each depositor fears that others will get out first, getting out first is rational. Economists Douglas Diamond and Philip Dybvig formalized exactly this in 1983 (Stage 10.1 goes deeper). Society built two firewalls in response: **deposit insurance** (the US FDIC was created in 1933 and today covers $250,000 per depositor per bank) and the **lender of last resort** (the central bank lending to banks in a panic, Stage 1.3).

Silicon Valley Bank ran through the whole script in March 2023. It had put a large share of its deposits into long-dated Treasuries and mortgage-backed securities; after rates jumped in 2022, the unrealized losses on those bonds had grown large enough to wipe out most of its equity. Its deposits were concentrated among tech companies and mostly above the insurance limit. On March 9, depositors tried to pull roughly $42 billion in a single day; the next day regulators closed the bank. Stage 10.3 works through the numbers using the duration tools of Stage 4.4.

### ⑤ Money creation in the new era: narrow banks, stablecoins and on-chain lending

Once “loans create deposits + maturity mismatch” clicks, a lot of new-finance phenomena make sense:

- **A stablecoin is closer to a “narrow bank.”** A compliant fiat-backed stablecoin issuer takes in $1 and issues one token, keeping the money in cash and short-term Treasuries. **It makes no loans, so it creates no new money and carries very little maturity mismatch.** The US GENIUS Act, signed into law in 2025, follows this logic by requiring payment stablecoins to hold one-for-one reserves in high-quality liquid assets (Stage 13.2). The trade-off: it cannot earn a lending spread like a bank, only the interest on its reserves.
- **On-chain lending doesn't create money; it replaces trust with over-collateralization.** To borrow $100 of stablecoins from a DeFi lending protocol, you typically post $150 or more in crypto collateral first, and if the collateral falls, you are liquidated automatically (Stage 13.4). There is no “write a deposit into existence,” and also no deposit insurance or lender of last resort.
- **Deposit tokens.** Some large banks have begun putting deposits themselves on a blockchain, so bank-created money can settle on-chain around the clock (Stage 14.5).
- **A DAT's balance sheet deliberately avoids maturity mismatch.** The digital asset treasury companies at the center of this course (Stage 15.1) hold Bitcoin but finance themselves mainly with **long-dated or perpetual** instruments — convertible notes and perpetual preferred stock — rather than deposits that can leave overnight or loans that trigger margin calls. The point of that design is precisely to keep Bitcoin's violent swings from setting off a run. The stress tests of Stage 18.2 check how well it holds up.

**The whole lesson in one sentence: when a bank lends, it creates money; capital and demand are the gates, reserves are the settlement fuel; a bank's profit comes from maturity mismatch, and so does its fragility.**
`,

  demo: "banks-create-money",

  analogy: `
Think of a bank as **a warehouse that issues claim tickets.**

The warehouse owner (the bank) keeps some hard cash in the safe (reserves) and a stack of long-dated IOUs that will take years to collect (loans and bonds). The townspeople use the warehouse's **claim tickets** (deposits) as money — paying rent, buying groceries — and everyone accepts them, because everyone believes a ticket can be swapped for real cash at the warehouse any time.

When someone comes in to borrow for a house, the owner doesn't open the safe. He simply **prints one more claim ticket**, hands it over, and writes in his ledger: “this person will repay me over 30 years.” The town now has one more ticket in circulation. The borrower pays the ticket to the seller; if the seller uses a different warehouse, the two owners settle up that evening, and some real cash has to be carried across the street.

On an ordinary day only a handful of people redeem tickets, and the cash in the safe is more than enough. But if a rumor spreads that “this warehouse's IOUs are no good,” everyone shows up with tickets at once — and the long-dated IOUs can't be turned into cash by closing time except at fire-sale prices. **The queue itself makes the rumor come true.** So the town set up two safeguards: a promise that small tickets will always be honored (deposit insurance), and a “central warehouse” that lends cash to sound warehouses during a panic (the lender of last resort, Stage 1.3).

A stablecoin is a different kind of warehouse: **for every ticket issued, an equal amount of short-term Treasuries really sits in the safe,** and nothing is lent out — no money-creation trick, and far fewer ways to be run (though not zero, Stage 13.2).
`,

  misconceptions: [
    "**“Banks lend out the money savers deposit.”** — When a bank makes a loan, it credits the borrower with a brand-new deposit; the loan and the deposit are created together. Deposits are mainly the result of lending, not its precondition. The Bank of England's 2014 article was written specifically to correct this.",
    "**“The money multiplier determines how much banks can lend.”** — US reserve requirements have been zero since March 2020, and the post-2008 explosion in reserves did not produce an explosion in lending. What really limits lending is capital, profitability and loan demand; reserves are mainly for interbank settlement.",
    "**“Only badly run banks get run on.”** — Maturity mismatch makes any bank runnable: if depositors fear others will withdraw first, withdrawing first is rational, and the panic becomes self-fulfilling. Deposit insurance and the lender of last resort exist to break that chain.",
    "**“Higher interest rates are pure upside for banks — loans earn more.”** — New loans do earn more, but the long-dated bonds and fixed-rate loans a bank already holds lose value; if depositors simultaneously move to higher-yielding alternatives, the bank may have to sell those assets at a loss. That is exactly how SVB failed in 2023.",
    "**“Stablecoin issuers do the same thing as banks.”** — A compliant fiat-backed stablecoin holds one-for-one liquid reserves and makes no loans, so it doesn't create new deposits and carries far less maturity mismatch. Banks create money by lending, earn a spread, and are backed by deposit insurance and the central bank. The risks come from different places.",
  ],

  quiz: [
    {
      q: "Green Orange Bank makes a $10 million loan and credits it to the customer's account. At this step, how does the bank's T-account change?",
      options: [
        "Reserves fall by $10 million; loans rise by $10 million",
        "Loans rise by $10 million and deposits rise by $10 million at the same time",
        "Deposits fall by $10 million; loans rise by $10 million",
        "Shareholders' equity rises by $10 million",
      ],
      answer: 1,
      explain: "**Loans create deposits**: a new loan on the asset side, an equal new deposit on the liability side; the books balance and the money supply grows. Reserves fall only when the money is paid to another bank.",
    },
    {
      q: "The US reserve requirement has been zero since March 2020. What is the main implication for how banks create money?",
      options: [
        "Banks can lend without any limit at all",
        "Banks no longer need to hold any reserves",
        "The money multiplier is now infinite, so inflation must spiral",
        "Lending is constrained mainly by capital requirements, profitability and loan demand — not by required reserves",
      ],
      answer: 3,
      explain: "Reserves are still used for interbank settlement, but **the real gates on lending are capital and demand.** Credit did not explode when the requirement went to zero, which is exactly what the multiplier model gets wrong.",
    },
    {
      q: "A bank has assets of 100 and equity of 10. How far must its assets fall in value to wipe out the equity entirely?",
      options: [
        "10%",
        "1%",
        "50%",
        "90%",
      ],
      answer: 0,
      explain: "Equity = assets − liabilities. With liabilities fixed at 90, a 10% fall in assets (to 90) leaves zero equity. **A bank is levered roughly ten to one**, which is why capital requirements exist.",
    },
    {
      q: "Which statement best describes maturity mismatch?",
      options: [
        "A bank's loan rates are higher than its deposit rates",
        "A bank does business in several currencies",
        "A bank's liabilities can be withdrawn at any time, while its assets take years to come back",
        "A bank's shareholders are paid before its depositors",
      ],
      answer: 2,
      explain: "**Borrowing short and lending long** is the source of a bank's profit and the root of runs: when everyone withdraws at once, long-dated assets can only be sold at a discount.",
    },
    {
      q: "Why can a digital asset treasury company's (DAT's) funding structure be said to deliberately avoid bank-style maturity mismatch?",
      options: [
        "Because DATs hold no assets",
        "Because they fund mainly with long-dated or perpetual instruments (convertibles, perpetual preferreds) rather than withdrawable deposits or margin loans",
        "Because DATs can borrow from the central bank as lender of last resort",
        "Because the Bitcoin price never falls",
      ],
      answer: 1,
      explain: "Holding a very volatile asset with **long-dated, perpetual liabilities that carry no margin calls** is meant to stop a price drop from immediately forcing run-style selling — Stage 18.2 stress-tests the design.",
    },
  ],

  further: [
    { label: "Bank of England (2014): Money creation in the modern economy — the official explanation of loans creating deposits", url: "https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy" },
    { label: "Federal Reserve: Reserve Requirements (the move to zero and what it means)", url: "https://www.federalreserve.gov/monetarypolicy/reservereq.htm" },
    { label: "Basel Committee on Banking Supervision: overview of the Basel III framework", url: "https://www.bis.org/bcbs/basel3.htm" },
    { label: "Federal Reserve review of the supervision and failure of Silicon Valley Bank (April 2023)", url: "https://www.federalreserve.gov/publications/review-of-the-federal-reserves-supervision-and-regulation-of-silicon-valley-bank.htm" },
    { label: "FDIC: Understanding deposit insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
  ],
};
