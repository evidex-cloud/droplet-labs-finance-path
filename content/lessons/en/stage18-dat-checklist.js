export default {
  id: "dat-checklist",
  stage: 18,
  order: 6,
  title: "The DAT Analyst's Checklist: Ten Questions to Read Any Treasury Company",
  difficulty: "dat",
  prereqs: ["valuing-btc-preferreds", "dat-stress-test", "mnav-compression", "index-structural-risk", "dat-comparison"],

  oneLiner:
    "Every ruler from Stages 15 to 18, folded into one reusable checklist: **ten questions**, from \"what does it actually hold?\" to \"what is the macro weather right now?\" Each question says which filing to pull the data from, which formula to run and what turns the light red, and each is answered twice, once for Orange Corp and once for Strategy. This lesson's demo is the checklist itself: enter any DAT's numbers and it lights up each question and drafts an analysis summary you can copy.",

  intuition: `
Pilots run a checklist before take-off; surgeons run one before the first incision. Atul Gawande explained why in The Checklist Manifesto (2009): **experts rarely fail because they don't know something; they fail because they skip something they do know.** The behavioral traps of Stage 11.5 (anchoring, narrative bias, recency, overconfidence) are especially dangerous with DATs, which combine a highly charismatic story, a wildly volatile underlying asset and a pile of metrics with conflicting definitions. A checklist is the cheapest defense there is.

Look back at what this focus tier has taught:

- Stage 15: what a DAT is, a balance sheet with bitcoin as the asset and capital markets as the liabilities.
- Stage 16: how to measure one, with bitcoin per share, mNAV, BTC Yield, amplification, BTC Rating, dividend coverage and the flywheel.
- Stage 17: how it raises money, through ATMs, convertibles, a family of preferreds, STRC's variable rate, Strive's SATA, seniority and return of capital.
- Stage 18: how to assess its risk, through preferred valuation, stress tests, mNAV compression, rule risk and side-by-side comparison.

That is dozens of concepts, and memory alone will drop some. So this lesson compresses them into **ten questions**, ordered down the balance sheet and then from the inside out:

1. What does it hold, and where?
2. Is bitcoin per share growing or being diluted?
3. What is mNAV, and on which definition?
4. How much leverage, and by which formula?
5. How many times is each layer covered?
6. How much must it pay each year, and how many months does the reserve last?
7. Which instruments, who ranks ahead of whom, and when do they come due?
8. Can it still raise money on reasonable terms?
9. Who is in control, and could the rules change?
10. What is the macro environment?

Each question rests on one or two of the course's ideas. Questions 1, 5 and 7 are **Idea ② (balance sheets and claims)**; 2, 3 and 4 are **Idea ④ (risk and leverage)**; 6, 8 and 9 are **Idea ③ (liquidity and trust)**; 10 is **Idea ① (the price of time)**. Taken together, the ten questions apply all four ideas to one company at once.

The checklist is not a scoring sheet, and it does not produce a "buy" or "sell." Its output is one page: **where the company is solid, where it is fragile, which numbers need watching every week, and which dates belong on the calendar.** Stage 20.3 applies the same thinking to reading the news, and the capstone in Stage ∞.3 has you use it to analyze a company end to end. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**

**In this lesson we break it into five pieces:**

- **① Assets: what it holds and where bitcoin per share is heading (questions 1–2)**
- **② Valuation and leverage: mNAV and amplification, definitions first (questions 3–4)**
- **③ Credit: coverage, obligations and seniority (questions 5–7)**
- **④ Access and governance: can it still raise money, and who decides (questions 8–9)**
- **⑤ Macro and conclusions: reading the weather, and writing the one-pager (question 10)**
`,

  mechanics: `
<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Ten questions, from the inside of the balance sheet out</text><rect x="200" y="40" width="240" height="190" rx="10" fill="var(--surface-2)" stroke="var(--line)"/><line x1="320" y1="40" x2="320" y2="230" stroke="var(--line)"/><text x="260" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Assets</text><text x="380" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Liabilities & equity</text><rect x="212" y="70" width="96" height="100" rx="6" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="260" y="112" text-anchor="middle" font-size="11" fill="var(--ink)">Bitcoin</text><text x="260" y="128" text-anchor="middle" font-size="10" fill="var(--muted)">Q1, Q2</text><rect x="212" y="176" width="96" height="44" rx="6" fill="var(--green-soft)" stroke="var(--green)"/><text x="260" y="196" text-anchor="middle" font-size="11" fill="var(--ink)">USD reserve</text><text x="260" y="211" text-anchor="middle" font-size="10" fill="var(--muted)">Q6</text><rect x="332" y="70" width="96" height="30" rx="4" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="380" y="89" text-anchor="middle" font-size="10" fill="var(--ink)">Debt · Q7</text><rect x="332" y="104" width="96" height="46" rx="4" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="380" y="124" text-anchor="middle" font-size="10" fill="var(--ink)">Preferreds</text><text x="380" y="139" text-anchor="middle" font-size="10" fill="var(--muted)">Q5, Q6, Q7</text><rect x="332" y="154" width="96" height="66" rx="4" fill="var(--surface-2)" stroke="var(--muted)"/><text x="380" y="180" text-anchor="middle" font-size="10" fill="var(--ink)">Common</text><text x="380" y="195" text-anchor="middle" font-size="10" fill="var(--muted)">Q3, Q4</text><rect x="20" y="70" width="160" height="60" rx="8" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="100" y="94" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Q8: capital markets</text><text x="100" y="112" text-anchor="middle" font-size="10" fill="var(--muted)">ATMs · preferreds · converts</text><line x1="180" y1="100" x2="198" y2="100" stroke="var(--muted)"/><rect x="460" y="70" width="160" height="60" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="540" y="94" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Q9: governance & rules</text><text x="540" y="112" text-anchor="middle" font-size="10" fill="var(--muted)">votes · indexes · tax</text><line x1="442" y1="100" x2="460" y2="100" stroke="var(--muted)"/><rect x="100" y="250" width="440" height="36" rx="8" fill="var(--surface-2)" stroke="var(--orange-line)" stroke-dasharray="4 3"/><text x="320" y="273" text-anchor="middle" font-size="11" fill="var(--orange-ink)">Q10: the macro weather (30-year Treasury, the Fed, liquidity, the bitcoin cycle) wraps it all</text></svg><figcaption>Questions 1–7 live inside the balance sheet, questions 8–9 at its edges (who funds it, who sets the rules), and question 10 is the weather it sits in.</figcaption></figure>

### ① Assets: what it holds and where bitcoin per share is heading (questions 1–2)

**Question 1: What does it hold, and where?**

- **Look at:** the bitcoin count and its date, the average cost, any **pledges** (to whom, how many coins), custody arrangements, and other assets (an operating business, cash, other companies' securities).
- **Where to find it:** the weekly 8-K (Strategy), company dashboards, the digital-asset note in the 10-Q.
- **Red flags:** borrowing secured by bitcoin (Stage 18.5: Metaplanet's credit facility, Nakamoto's Kraken loan); holdings figures that go unupdated for long stretches; opaque custody.
- **Orange Corp:** 10,000 BTC, nothing pledged. **Strategy:** 846,000 BTC (2026-09-20), average cost about $75,416; no bitcoin pledged against its main debt, and its preferreds are unsecured.

**Question 2: Is bitcoin per share growing or being diluted?**

- **Look at:** the trend in bitcoin per share (state the share count used), BTC Yield, **and where the growth comes from**: common issued at a premium, or preferred issuance (which ignores the new senior claims; Stage 16.3).
- **Formula:** BTC Yield = ending bitcoin per share ÷ starting bitcoin per share − 1.
- **Red flags:** falling bitcoin per share (issuing at a discount, or selling coins to pay dividends); a BTC Yield that comes almost entirely from preferreds.
- **Strategy:** BTC Yield of 22.8% in 2025 and 8.1% in the first half of 2026, falling to 4.5% for the year to July 26 (July's coin sales and issuance that didn't buy bitcoin). **Strive:** +54.5% year to date, but SATA expanded sharply over the same stretch.

### ② Valuation and leverage: mNAV and amplification, definitions first (questions 3–4)

**Question 3: What is mNAV, and on which definition?**

- **Look at:** at least two definitions side by side (basic and "net"), plus the historical range.
- **Formulas:** basic = market cap ÷ BTC Reserve; Strategy's 2026 definition = share price ÷ [(BTC Reserve − out-of-the-money debt − preferreds + USD assets) ÷ fully diluted shares].
- **Why it matters:** mNAV decides whether issuing is accretive or dilutive (Stage 16.7, Stage 18.3), and whether what you are buying is "discounted bitcoin."
- **Orange Corp:** 1.50 basic, **2.05** on the 2026 definition. **Strategy:** **1.01x** on the 2026 definition (2026-08-21: a $119.25 share price over $118.31 of net bitcoin per share).
- **Red flags:** a single number quoted with no definition; comparing two companies on different definitions (Stage 18.5).

**Question 4: How much leverage, and by which formula?**

- **Formulas:** Strategy-style Amplification = BTC Reserve ÷ Net Reserve; Strive-style leverage ratio = (debt + preferred) ÷ bitcoin value.
- **Orange Corp:** 1.37x / 30%. **Strategy:** 1.30x (2026-08-23). **Strive:** 50.4%.
- **Remember:** amplification magnifies falls as well as rises, and brings path dependence and volatility drag (Stage 16.4, Stage 11.4).

### ③ Credit: coverage, obligations and seniority (questions 5–7)

**Question 5: How many times is each layer covered?**

- **Formulas:** BTC Rating = BTC Reserve ÷ (this layer's notional + everything senior to it); floor price = bitcoin price ÷ BTC Rating.
- **How to use it:** list every layer's multiple and floor price, then apply −50% and −80% shocks (Stage 18.2). State whether USD assets were netted against debt (Strategy's method).
- **Orange Corp:** 6.67 / 4.00 / 3.33x; Orange-F's floor price is $25,000. **Strategy:** STRC at 5.7x with a floor price of about $13,400 (2026-08-23, company method).
- **Red flags:** the most junior layer breaks 1x under a −50% shock; only the most senior layer's coverage is reported.

**Question 6: How much must it pay each year, and how many months does the reserve last?**

- **Formulas:** months of coverage = USD Reserve ÷ annual interest and dividends × 12; Breakeven ARR = annual interest and dividends ÷ BTC Reserve.
- **Orange Corp:** 24 months; 1.5%. **Strategy:** about 37 months ($5.04 billion ÷ about $1.62 billion, 2026-09-20, derived); the company reported a Breakeven ARR of 2.63% (2026-08-23). **Strive:** an 18-month policy; Breakeven ARR about 6.6% (derived).
- **Red flags:** a reserve under 12 months (the floor in Strategy's board policy); a high Breakeven ARR paired with a thin reserve.

**Question 7: Which instruments, who ranks ahead of whom, and when do they come due?**

- **Look at:** a seniority table (Stage 6.1, Stage 17.6) with each layer's notional, coupon or dividend rate, cumulative or not, call and put terms, and maturity and **put dates.**
- **Strategy's example:** debt > STRF > STRC > STRE/STRK/STRD (their order among themselves is not confirmed in primary text) > common; a put wall of about $5.9 billion from 2027-09-15 through September 2028.
- **Red flags:** large out-of-the-money convertible puts within 24 months with a reserve too small to cover them; a big share of non-cumulative preferred (a skip is lost for good) priced at "the same yield" as cumulative paper.

### ④ Access and governance: can it still raise money, and who decides (questions 8–9)

**Question 8: Can it still raise money on reasonable terms?**

- **Look at:** mNAV (is a common ATM accretive?), preferred prices relative to par (below par, new issues cost more), remaining ATM capacity, actual issuance in recent weeks, and any buyback programs.
- **Strategy:** about $20.3 billion raised in 2026 up to August 23; about $19.7 billion of common ATM capacity left (08-23); STRC near $96 in late August, with buybacks below par as the main tool, about $1.125 billion in total.
- **Red flags:** mNAV below 1, preferreds at deep discounts and a reserve running short, all at once. That combination means an "access shock" is under way (Stage 18.2).

**Question 9: Who is in control, and could the rules change?**

- **Governance:** voting structure (dual-class shares), key people, controlling shareholders, board independence, and the preferreds' board-seat clauses (Stage 18.4).
- **Rules:** indexes (MSCI's verdict due by 2026-10-16; the S&P 500 profitability test), accounting (ASU 2023-08 fair value), tax (the interim CAMT guidance, ROC treatment), listing-venue rules.
- **Red flags:** high key-person risk with no succession plan; pending index or tax decisions that could hit the share price and the funding channel together.

### ⑤ Macro and conclusions: reading the weather, and writing the one-pager (question 10)

**Question 10: What is the macro environment?**

- **Rates:** as of late September 2026 the 30-year Treasury yields about **5.5%** (the highest since 2004), the 10-year about 5.2%, the Fed raised rates to 3.75%–4.00% on September 16, and markets price a possible further hike in October. Rising long yields push perpetual preferred prices down directly (Stage 4.5, Stage 18.1) and make risk-free alternatives more attractive.
- **The bitcoin cycle and liquidity:** bitcoin is around $84,000, about a third below its October 2025 high. Stage 9.3 covered bitcoin's link to global liquidity, and Stage 12.4 its volatility and the cycle narrative.
- **How to ask it:** which layer of this company does this environment hurt most? (Rising rates hurt the preferreds, a falling bitcoin price hurts coverage, tightening liquidity hurts access.)

**How to write the one-pager** (this lesson's demo drafts one for you):

<table class="pm">
<tr><th>Section</th><th>What goes in it</th></tr>
<tr><td>One-line profile</td><td>"A DAT holding X bitcoin, funded mainly through Y, currently operating in environment Z"</td></tr>
<tr><td>Ten-question lights</td><td>One line per question: green / amber / red + one number + a date</td></tr>
<tr><td>Three strongest supporting arguments</td><td>For example: no margin calls, a thick reserve, deep market access</td></tr>
<tr><td>Three strongest critical arguments</td><td>For example: the put wall, mNAV near 1, single-asset concentration</td></tr>
<tr><td>Numbers and dates to watch</td><td>Holdings and reserve in the weekly 8-K, preferred prices, the next put date, the next index decision date</td></tr>
<tr><td>Disclaimer</td><td>Framework analysis, not investment advice</td></tr>
</table>

Three writing disciplines: **every number gets a date and a source** (the facts change weekly); **every ratio gets its definition**; and **write the strongest opposing argument first**, then your judgment. That is the last line of defense against the behavioral traps of Stage 11.5. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "dat-checklist",

  analogy: `
This checklist is like **a home inspector's form before you buy a used house.**

An experienced inspector isn't dazzled by the fresh paint (a charismatic story, a soaring stock). The inspector carries a form and walks from the foundations to the roof:

- **What are the foundations made of, and have they been mortgaged to someone?** (Question 1: what it holds, any pledges)
- **Has the house been extended over the years, or carved up and sublet?** (Question 2: the trend in bitcoin per share)
- **How much more is the asking price than the house itself, and by which appraisal method?** (Question 3: mNAV and its definition)
- **How heavy is the mortgage?** (Question 4: amplification)
- **If house prices halve, how much protection do the first and second lenders still have?** (Question 5: coverage by layer)
- **What's the monthly payment, and how many months will savings cover it?** (Question 6: obligations and reserve)
- **How many IOUs are there, who ranks first, and when is each one due?** (Question 7: instruments and seniority)
- **If you had to borrow again, would any bank lend?** (Question 8: access to funding)
- **Whose name is on the deed, and could the building's rules change?** (Question 9: governance and rules)
- **Are we in a rate-hiking cycle or a cutting one?** (Question 10: macro)

The form doesn't tell you whether to buy; that is your decision. What it guarantees is that **when you decide, you haven't skipped anything you already knew to check.**
`,

  misconceptions: [
    "**\"Checklists are for beginners; experts go on instinct.\"** — The opposite. Experts are the most likely to skip steps because everything feels familiar. Aviation, surgery and investing all use checklists to stop \"knew it, missed it.\" The more charismatic a DAT's story, the more a checklist is needed.",
    "**\"If all ten questions are green, you can buy.\"** — The checklist produces no buy or sell verdict. It tells you where the company is solid, where it is fragile and which numbers and dates to watch; whether the price is reasonable, or suitable for you, is a different question. This lesson is not investment advice.",
    "**\"Answer it once and you're done.\"** — A DAT's numbers change every week (holdings, reserve, preferred balances, mNAV). Re-answer the checklist on the rhythm of the 8-Ks, 10-Qs and dashboards, with a date on every answer.",
    "**\"mNAV and BTC Yield are all you need.\"** — Those are two numbers from the common shareholder's point of view. The credit layers care about coverage, the reserve and put dates, while governance and macro decide whether the company keeps its access to funding. Skip any of the ten and you may miss the real risk.",
    "**\"The checklist should score every DAT the same way.\"** — The questions are the same, but the thresholds depend on the structure. A company with no debt has no put wall but may carry a heavier dividend burden; a company holding ETH must also be asked about staking yield and slashing risk (Stage 18.5).",
  ],

  quiz: [
    {
      q: "Orange Corp's basic mNAV is 1.50, but on Strategy's 2026 definition it is 2.05. What is the first thing question 3 asks you to do?",
      options: [
        "Average the two",
        "Use only the higher one",
        "State the definition: 2.05 is the \"net\" figure, after deducting debt and preferreds and adding USD assets",
        "Use only the lower one",
      ],
      answer: 2,
      explain: "**Definitions first.** A net reserve of $730M over 100M shares is $7.30 a share, and 15 ÷ 7.30 ≈ 2.05. Both numbers are right; they answer different questions.",
    },
    {
      q: "Which combination best fits a \"red\" on question 8?",
      options: [
        "mNAV 1.5, preferreds above par, a 36-month reserve",
        "mNAV below 1, preferreds at deep discounts, a reserve under 12 months",
        "mNAV 2.0 and no preferreds",
        "Bitcoin at a new high",
      ],
      answer: 1,
      explain: "All three together mean an **access shock** is under way: issuance dilutes, new preferreds are expensive, and the cash won't last long (Stage 18.2).",
    },
    {
      q: "Why does question 10 include the 30-year Treasury yield?",
      options: [
        "Because DATs hold Treasuries",
        "Because bitcoin is priced in Treasuries",
        "Because it determines the BTC Rating",
        "Because rising long yields push perpetual preferred prices down and make alternatives more attractive, affecting a DAT's preferred funding",
      ],
      answer: 3,
      explain: "**Idea ①:** a perpetual preferred's duration is about 1 ÷ yield. With the 30-year moving from about 4.64% to about 5.5%, a 10% perpetual with an unchanged spread falls about 7.8% (Stage 18.1).",
    },
    {
      q: "Strategy's BTC Yield was 8.1% for the first half of 2026 and 4.5% for the year to July 26. What does question 2 make you ask next?",
      options: [
        "Where the growth came from: premium issuance, preferreds, or offsets from coin sales and issuance that didn't buy bitcoin",
        "Why the bitcoin price fell",
        "Why the company changed its name",
        "Nothing further",
      ],
      answer: 0,
      explain: "**Unpack the source of growth.** July's coin sales and issuance for the reserve both lower bitcoin per share, while growth from preferreds ignores the new senior claims.",
    },
    {
      q: "When writing the one-page conclusion, which is a discipline the checklist insists on?",
      options: [
        "Write only the supporting arguments, to stay confident",
        "Use the latest numbers without dating them",
        "Date and source every number, give every ratio its definition, and write the strongest opposing argument first",
        "Give a clear price target",
      ],
      answer: 2,
      explain: "Dates, definitions, the opposing case: these are the last line of defense against anchoring and narrative bias (Stage 11.5). A price target is not an output of framework analysis.",
    },
  ],

  further: [
    { label: "Atul Gawande, The Checklist Manifesto (2009): the author's book page", url: "https://atulgawande.com/book/the-checklist-manifesto/" },
    { label: "Strategy's website: latest bitcoin holdings, credit dashboard and KPIs", url: "https://www.strategy.com/" },
    { label: "SEC EDGAR search: 8-K, 10-Q and FWP originals", url: "https://www.sec.gov/edgar/search/" },
    { label: "Strive bitcoin treasury dashboard", url: "https://strive.com/treasury" },
    { label: "US Treasury daily par yield curve (the rate data for question 10)", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026" },
  ],
};
