export default {
  id: "compounding",
  stage: 2,
  order: 2,
  title: "Compounding & the Rule of 72: The Arithmetic of the Eighth Wonder",
  difficulty: "intro",
  prereqs: ["time-value"],

  oneLiner:
    "Leave $1,000 at 7% for 30 years. If only the original principal earns interest (simple interest) you end with $3,100; if the interest earns interest too (compounding) you end with **$7,612** — the extra $4,500 is all interest on interest. Compounding is the **exponential form** of the price of time: it snowballs savings, it snowballs credit-card debt, and it turns a DAT's \"BTC per share\" into a compounding scoreboard. The **Rule of 72** lets you do it in your head: \\(\\dfrac{72}{\\text{rate}} \\approx \\text{years to double}\\).",

  intuition: `
Stage 2.1 established that an interest rate is the price of waiting a year: $100 today at 5% becomes $105 next year. So what happens in year two?

There are two ways to do the arithmetic. The first: every year you earn interest only on the original $100, collecting a flat $5 a year, and after ten years you have $150. That is **simple interest**. The second: in year two you earn interest on $105, which is $5.25; in year three on $110.25, and so on. **The interest itself starts earning interest**, and after ten years you have $162.89. That is **compound interest**.

In year one the two are identical. By year ten they differ by about $13, which hardly seems worth the fuss. Stretch the clock, though, and the gap becomes startling:

- $1,000 at 7% **simple** interest becomes $3,100 after 30 years;
- the same $1,000 **compounded** becomes **$7,612** after 30 years;
- compounded for 40 years it becomes **$14,974** — ten more years, and the pile doubles again.

That is the personality of compounding: **dull at first, explosive later.** Growth doesn't follow a straight line but a curve that keeps getting steeper. A famous line calls compound interest "the eighth wonder of the world" and credits it to Einstein — there is no reliable evidence he ever said it — but the fact that the quote spread so widely tells you how badly most people underestimate compounding's late surge.

How do you get a feel for compounding without a calculator? Use the **Rule of 72**: divide 72 by the annual rate (as a whole number) and you get roughly the number of years it takes to double.

- 6% a year → \\(72 \\div 6 = 12\\) years to double.
- 9% a year → 8 years to double.
- 3% inflation → prices double in about 24 years, which is to say the cash in your pocket loses half its purchasing power in about 24 years.

Compounding is **neutral.** It doesn't care whether you are the saver or the debtor. Deposits and reinvested dividends are compounding working for you; credit-card balances, heavy fees and repeated big swings are compounding working against you. A card charging 22% a year, compounded monthly, turns a $1,000 balance into about $1,244 in one year and about $2,974 if left unpaid for five.

This lesson still stands on **Idea ① — the price of time**, just with a longer lens: when the price of time acts continuously, it accumulates exponentially. The next lesson (Stage 2.3) runs the process in reverse — compounding rolls money forward, discounting brings it back. Further down the road, Stage 16.1 shows digital asset treasury companies using "BTC per share" as a compounding scoreboard, and Stage 11.4 shows how volatility quietly eats compounding alive.

**In this lesson we break it into five pieces:**

- **① Simple vs compound: does interest earn interest?**
- **② Compounding frequency: annual, monthly, daily and continuous**
- **③ The Rule of 72: doubling time in your head**
- **④ The dark side: debt, fees and volatility drag**
- **⑤ Compounding in the new era: BTC per share, on-chain yield and the DAT scoreboard**
`,

  mechanics: `
### ① Simple vs compound: does interest earn interest?

Two formulas. The only difference is whether interest is added back to the principal:

$$
\\text{Simple: } \\mathrm{FV} = P \\times (1 + r \\times n)
\\text{Compound: } \\mathrm{FV} = P \\times (1 + r)^{n}
$$

Simple interest is a straight line: you add the same amount every year. Compound interest is an exponential curve: you **multiply** by the same factor every year. With $1,000 at 7%:

<table class="pm"><tr><th>Years</th><th>Simple</th><th>Compound</th><th>Of which, interest on interest</th></tr><tr><td>10</td><td>1,700</td><td>1,967</td><td>267</td></tr><tr><td>20</td><td>2,400</td><td>3,870</td><td>1,470</td></tr><tr><td>30</td><td>3,100</td><td>7,612</td><td>4,512</td></tr><tr><td>40</td><td>3,800</td><td>14,974</td><td>11,174</td></tr></table>

By year 30, $4,512 of the $6,612 in total interest — about 68% — is interest on interest. By year 40 that share reaches about 80%. **Compounding's real power comes from time, not from the rate**: at the same 7%, forty years produces nearly double what thirty years does. That is why every personal-finance book nags you to start early — the extra decade is the steepest stretch of the whole curve.

<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">$1,000 at 7%: simple interest is a line, compounding is a curve that keeps steepening</text><line x1="60" y1="220" x2="610" y2="220" stroke="var(--line)" stroke-width="1.5"/><line x1="60" y1="40" x2="60" y2="220" stroke="var(--line)" stroke-width="1.5"/><g stroke="var(--line)" stroke-dasharray="3 3" stroke-width="1"><line x1="60" y1="130" x2="610" y2="130"/><line x1="60" y1="85" x2="610" y2="85"/><line x1="60" y1="175" x2="610" y2="175"/></g><g font-size="10" fill="var(--muted)" text-anchor="end"><text x="54" y="223">0</text><text x="54" y="178">2,000</text><text x="54" y="133">4,000</text><text x="54" y="88">6,000</text><text x="54" y="43">8,000</text></g><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="60" y="236">0</text><text x="150" y="236">5</text><text x="240" y="236">10</text><text x="330" y="236">15</text><text x="420" y="236">20</text><text x="510" y="236">25</text><text x="600" y="236">30 yrs</text></g><polyline fill="none" stroke="var(--blue)" stroke-width="2.5" points="60,197.5 150,189.6 240,181.8 330,173.9 420,166.0 510,158.1 600,150.3"/><polyline fill="none" stroke="var(--orange)" stroke-width="3" points="60,197.5 78,195.9 96,194.2 114,192.4 132,190.5 150,188.4 168,186.2 186,183.9 204,181.3 222,178.6 240,175.7 258,172.6 276,169.3 294,165.8 312,162.0 330,157.9 348,153.6 366,148.9 384,144.0 402,138.6 420,132.9 438,126.8 456,120.3 474,113.3 492,105.9 510,97.9 528,89.3 546,80.2 564,70.4 582,59.9 600,48.7"/><line x1="600" y1="48.7" x2="600" y2="150.3" stroke="var(--red)" stroke-width="1.5" stroke-dasharray="4 3"/><text x="592" y="104" text-anchor="end" font-size="11" fill="var(--red)" font-weight="600">Interest on interest 4,512</text><circle cx="600" cy="48.7" r="4" fill="var(--orange)"/><text x="592" y="44" text-anchor="end" font-size="11" fill="var(--orange-ink)" font-weight="700">Compound 7,612</text><circle cx="600" cy="150.3" r="4" fill="var(--blue)"/><text x="592" y="166" text-anchor="end" font-size="11" fill="var(--blue)" font-weight="700">Simple 3,100</text><text x="250" y="160" font-size="11" fill="var(--muted)">For the first decade the lines almost overlap</text></svg><figcaption>The gap opens up in the back half: after 10 years the difference is only $267; after 30 it is $4,512. The longer the horizon, the more of the total is interest on interest.</figcaption></figure>

Where does each kind show up in real life? Most bonds pay simple interest — a fixed coupon every six months, paid into your account; **whether you reinvest it, and at what rate, is your problem** (Stage 4.2 meets this as the "reinvestment assumption" hidden inside yield to maturity). Bank deposits, money-market funds and index funds with dividends reinvested compound.

### ② Compounding frequency: annual, monthly, daily and continuous

The same "12% a year" gives different results depending on how often interest is credited:

<table class="pm"><tr><th>Credited</th><th>$100 after one year</th><th>Effective annual rate</th></tr><tr><td>Once a year</td><td>112.00</td><td>12.00%</td></tr><tr><td>Twice a year</td><td>112.36</td><td>12.36%</td></tr><tr><td>Quarterly</td><td>112.55</td><td>12.55%</td></tr><tr><td>Monthly</td><td>112.68</td><td>12.68%</td></tr><tr><td>Daily</td><td>112.747</td><td>12.747%</td></tr><tr><td>Continuously</td><td>112.750</td><td>12.750%</td></tr></table>

$$
\\text{Effective annual rate } \\mathrm{EAR} = \\left(1 + \\frac{r}{m}\\right)^{m} - 1
\\text{Continuous compounding: } \\mathrm{FV} = P \\times e^{r \\times n}
$$

Here \\(m\\) is the number of times a year interest is credited. The more often it is credited, the sooner interest starts earning interest and the higher the effective rate — but each step adds less than the one before, and the sequence converges to a limit. That limit is where the mathematical constant **\\(e \\approx 2.71828\\)** comes from: the Swiss mathematician Jacob Bernoulli stumbled onto it in 1683 while working on exactly this compound-interest problem.

The practical point of that table: **the quoted "annual rate" is not necessarily the rate you actually earn or pay.**

- Loans and credit cards usually quote an **APR** (annual percentage rate — a nominal rate with compounding left out).
- Savings products usually quote an **APY** (annual percentage yield — with compounding built in).

A card with a 22% APR compounded monthly really costs **\\(\\left(1 + \\dfrac{0.22}{12}\\right)^{12} - 1 \\approx 24.4\\%\\)** a year. Lenders like to quote the lower-looking APR; deposit-takers like to quote the higher-looking APY. **Before comparing two products, convert them to the same basis.**

### ③ The Rule of 72: doubling time in your head

The exact doubling time is:

$$
(1 + r)^{n} = 2 \\Rightarrow n = \\frac{\\ln 2}{\\ln(1 + r)} \\approx \\frac{0.693}{r}
\\text{Rule of 72: } n \\approx \\frac{72}{r \\times 100}
$$

Because \\(\\ln(1 + r) \\approx r\\) when \\(r\\) is small, doubling time is about 69.3 divided by the rate in percent. So why 72 rather than 69.3? Two reasons: 72 divides cleanly by 2, 3, 4, 6, 8, 9 and 12, which makes mental arithmetic easy; and in the common 6%–10% range, the slightly larger numerator happens to offset the fact that \\(\\ln(1 + r)\\) is a bit smaller than \\(r\\). The rule is old: the Italian mathematician Luca Pacioli mentions it in his 1494 *Summa de arithmetica* — the same book that made double-entry bookkeeping famous (Stage 0.3).

<table class="pm"><tr><th>Annual rate</th><th>Rule of 72</th><th>Exact</th></tr><tr><td>2%</td><td>36.0 yrs</td><td>35.0 yrs</td></tr><tr><td>4%</td><td>18.0 yrs</td><td>17.7 yrs</td></tr><tr><td>6%</td><td>12.0 yrs</td><td>11.9 yrs</td></tr><tr><td>8%</td><td>9.0 yrs</td><td>9.0 yrs</td></tr><tr><td>10%</td><td>7.2 yrs</td><td>7.3 yrs</td></tr><tr><td>24%</td><td>3.0 yrs</td><td>3.2 yrs</td></tr></table>

The Rule of 72 works for **anything that grows or shrinks at a steady percentage rate**, not just money:

- **Inflation:** at 3% a year prices double in about 24 years. U.S. CPI inflation briefly hit roughly 9% year over year in 2022; sustained, that would double prices in 8 years (Stage 1.4).
- **Debt:** a balance charged 24% doubles in 3 years.
- **Economic growth:** income per person growing 2% a year doubles in about 36 years; growing 7% a year, in about 10. That is why a one- or two-point difference in growth rates adds up to a different world within a single generation.

### ④ The dark side: debt, fees and volatility drag

Compounding works on borrowers too, and usually harder, because borrowing rates tend to exceed saving rates.

**Credit cards.** A $1,000 balance at a 22% APR compounded monthly grows to about $1,244 in a year and about $2,974 in five if nothing is paid. Pay only the minimum and most of each payment goes to interest while the principal barely moves — this is Stage 2.1's "impatience tax," amplified by compounding.

**Fees.** Fees compound against you as well. Suppose a fund earns 7% before fees and charges 1% a year, so you net 6%. $1,000 over 30 years grows to $7,612 at 7% but only **$5,743** at 6%. **A fee that looks like "just 1%" ends up taking about a quarter of your final wealth.** That arithmetic is a big reason low-cost index funds took over (Stage 5.6).

**Volatility drag.** This is the least intuitive one. An investment rises 50% in year one and falls 50% in year two. Its average return is 0%, but your $100 has become **\\(100 \\times 1.5 \\times 0.5 = \\$75\\)**. **Compounding runs on the geometric average, not the arithmetic average:**

$$
\\text{Geometric mean} \\approx \\text{arithmetic mean} - \\frac{\\text{volatility}^{2}}{2}
$$

The bigger the swings, the less a given average return compounds into. In the example, the geometric return per period is about −13.4%. This matters enormously for a volatile asset like bitcoin, and even more once leverage is involved: leverage magnifies volatility, and the drag grows with the square of volatility. Stage 11.4 shows how that can drive a strategy that "makes money on average" to zero, and Stage 16.4 uses it to analyze the amplification in DAT common stock.

**Government debt** compounds too: a government borrows to pay interest, and the interest becomes new debt. Whether a country's debt snowballs depends on whether the interest rate runs above or below the economy's growth rate — the central question of Stage 3.3 and Stage 9.4.

### ⑤ Compounding in the new era: BTC per share, on-chain yield and the DAT scoreboard

**Bitcoin itself does not compound.** Hold one bitcoin and in ten years you still hold one (the price is another matter). It pays no interest and no dividend, so wealth measured in bitcoin does not grow on its own. That gap explains why a new kind of company exists:

**The core pitch of a digital asset treasury company (DAT) is to make "BTC per share" compound.** Recall the course's standard toy company, Orange Corp: 10,000 BTC and 100 million shares, so **\\(0.0001\\ \\text{BTC} = 10{,}000\\ \\text{sats}\\)** per share. When its share price sits above the bitcoin value per share (\\(\\mathrm{mNAV} = 1.5\\)), it can sell 10 million new shares at $15, use all $150 million to buy 1,500 BTC, and lift BTC per share from 10,000 sats to about 10,455 — **up 4.5%**. Companies call this "BTC Yield."

If that could be done at 10% a year, the Rule of 72 says BTC per share would double in about 7.2 years; after ten years it would be **\\(10{,}000 \\times 1.1^{10} \\approx 25{,}937\\) sats per share**. That is the "compounding machine" DAT supporters have in mind.

But compounding requires that **every year repeats**: issuance must happen at a premium (mNAV above 1), and the market must keep buying. If the premium disappears, issuing shares dilutes BTC per share instead, and the compounding stops or runs backward. Stage 16.1 introduces the scoreboard, Stage 16.7 does the flywheel math, and Stage 18.3 covers what happens when it reverses. **Any compounding story should be met with one question first: for how many years can this rate really last?**

**On-chain yield.** DeFi vaults often reinvest rewards automatically ("auto-compounding") and advertise the result as an APY. A pool flashing "APY 1,000%" is usually paying out newly minted reward tokens — tokens that are themselves inflating, so what compounds is an ever-larger pile of tokens that may be worth ever less. Stage 13.5 teaches you to ask where a yield actually comes from.

In one line: **\\(\\text{compounding} = \\text{price of time} \\times \\text{length of time} \\times \\text{sustainability}\\).** Take away any one of the three and the snowball never gets rolling.
`,

  demo: "compounding",

  analogy: `
Compounding is **a snowball rolling down a slope.**

At first the snowball is tiny, and each turn picks up only a little snow — those are the early years, when compound and simple interest look about the same. But the bigger the ball, the more surface it has, and the more snow each turn collects. By the lower half of the slope, every rotation adds a big layer — that is interest on interest taking over.

Three things set the final size: **how sticky the snow is** (the rate), **how long the slope is** (time), and **whether the ball hits rocks on the way down** (volatility and losses). Stickier snow helps, but the length of the slope is what decides things — the same snow rolled from the summit versus from halfway down arrives at the bottom as completely different objects. And one big rock along the way (a −50% year, say) knocks off half the ball, which then takes a long time to roll back to its old size.

Remember also that **the slope runs both ways.** A debtor is rolling a snowball too — of debt, usually with stickier snow. As for a DAT's "BTC per share" snowball, whether it keeps rolling depends on the ground staying tilted downhill (a share-price premium); once the slope flattens or turns uphill, the ball stops.
`,

  misconceptions: [
    "**\"Compounding's power comes mainly from a high rate.\"** — It comes mainly from time. At the same 7%, thirty years gives $7,612 and forty gives $14,974 — ten more years nearly doubles the result. High rates usually come bundled with high risk; time is free leverage available to everyone.",
    "**\"If an investment averages 10% a year, it compounds at 10% a year.\"** — The arithmetic average is not the compound return. Up 50% then down 50% averages 0% but actually loses 25%. The more volatile the path, the further the geometric mean falls below the arithmetic mean (by roughly half the variance).",
    "**\"A card with a 22% APR costs 22% a year.\"** — The quote is an APR, a nominal rate. Compounded monthly, the effective annual rate is about 24.4%. When comparing borrowing or saving products, put APRs and APYs on the same basis first.",
    "**\"A 1% annual fee is too small to matter.\"** — Fees compound. Taking 1% off a 7% gross return cuts the 30-year result from $7,612 to $5,743 — roughly a quarter of the final value gone.",
    "**\"A DAT's BTC per share will keep compounding at its current pace.\"** — BTC-per-share growth depends on issuing stock at a premium (mNAV above 1). When the premium narrows or vanishes, issuance stops adding bitcoin per share and can start diluting it, and the compounding halts. Test the assumption before extrapolating (Stage 16.7, Stage 18.3).",
  ],

  quiz: [
    {
      q: "$1,000 compounded at 7% for 30 years grows to about $7,612. What would simple interest give?",
      options: ["$2,100", "$3,100", "$7,000", "$7,612"],
      answer: 1,
      explain: "**\\(\\text{Simple interest} = 1{,}000 \\times (1 + 7\\% \\times 30) = \\$3{,}100\\).** The $4,512 difference is entirely interest on interest.",
    },
    {
      q: "By the Rule of 72, roughly how long does money take to double at 9% a year?",
      options: ["6 years", "9 years", "12 years", "8 years"],
      answer: 3,
      explain: "**\\(72 \\div 9 = 8\\) years.** The exact figure is \\(\\dfrac{\\ln 2}{\\ln 1.09} \\approx 8.04\\) years; in this range the rule is almost perfect.",
    },
    {
      q: "An investment rises 50% in year one and falls 50% in year two. What has $100 become?",
      options: ["$75", "$100", "$125", "$50"],
      answer: 0,
      explain: "**\\(100 \\times 1.5 \\times 0.5 = \\$75\\).** The arithmetic average return is 0%, but compounding follows the geometric average, and the swings themselves ate 25%. That is volatility drag.",
    },
    {
      q: "A credit card has a 22% APR, compounded monthly. What is its effective annual rate, roughly?",
      options: ["22.0%", "18.3%", "24.4%", "26.4%"],
      answer: 2,
      explain: "**\\(\\left(1 + \\dfrac{0.22}{12}\\right)^{12} - 1 \\approx 24.4\\%\\).** The more often interest is charged, the sooner it starts compounding and the further the effective rate rises above the quoted APR.",
    },
    {
      q: "Orange Corp has 10,000 sats per share. If BTC per share grew 10% a year for 10 years, where would it end up?",
      options: ["11,000 sats", "20,000 sats", "About 25,937 sats", "100,000 sats"],
      answer: 2,
      explain: "**\\(10{,}000 \\times 1.1^{10} \\approx 25{,}937\\) sats.** Rule of 72: it doubles in about 7.2 years. The catch is that every year must include issuance at a premium — whether that can last is the subject of Stage 16.7 and Stage 18.3.",
    },
  ],

  further: [
    { label: "Investor.gov (U.S. SEC): compound interest calculator", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
    { label: "Wikipedia: Rule of 72 — derivation, variants and Pacioli's 1494 mention", url: "https://en.wikipedia.org/wiki/Rule_of_72" },
    { label: "Quote Investigator: no reliable source for Einstein's \"eighth wonder\" line", url: "https://quoteinvestigator.com/2011/10/31/compound-interest/" },
    { label: "Khan Academy: compound interest and continuous compounding (where e comes from)", url: "https://www.khanacademy.org/economics-finance-domain/core-finance/interest-tutorial" },
  ],
};
