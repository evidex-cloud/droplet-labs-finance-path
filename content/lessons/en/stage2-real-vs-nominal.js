export default {
  id: "real-vs-nominal",
  stage: 2,
  order: 5,
  title: "Nominal vs Real: Inflation, Real Yields & the Invisible Tax",
  difficulty: "intro",
  prereqs: ["risk-free-rate", "inflation"],

  oneLiner:
    "The bank pays you 5%, prices rise 3%, and you are really only about **1.94%** richer — that is the **real interest rate.** The nominal rate tells you how much the number on your balance grows; the real rate tells you how much more stuff it buys. The **Fisher equation** links them: (1 + nominal) = (1 + real) × (1 + inflation). When inflation outruns the interest rate, the real rate turns negative and savers quietly lose a slice of purchasing power every year — an \"invisible tax\" that no legislature ever votes on. Real rates are also the \"gravity\" acting on non-yielding assets like gold and bitcoin.",

  intuition: `
In 2021, a typical U.S. savings account paid something like 0.1%, and by year-end CPI inflation was running at about 7%. Say you had $10,000 in that account. A year later your statement showed $10,010 — **the number went up.** But the cart of goods that $10,000 bought a year earlier now cost about $10,700. What your money could actually buy had shrunk by roughly 6.5%.

That example contains two different interest rates:

- **The nominal rate:** how much the number of dollars grows (0.1%).
- **The real rate:** how much the amount of stuff those dollars buy grows (about −6.5%).

The second is the one that matters. Nobody saves to watch a number; people save so they can buy things later. Stage 1.4 showed how inflation erodes purchasing power; this lesson folds that back into interest rates: **rates are always quoted in nominal terms, but your life is lived in real terms.**

The relationship between the two was first laid out systematically by Irving Fisher in *The Theory of Interest* (1930), and it's called the **Fisher equation**:

> **(1 + nominal rate) = (1 + real rate) × (1 + inflation)**, or roughly: nominal ≈ real + inflation.

Nominal 5% with 3% inflation gives a real rate of about 2% (exactly 1.94%). Nominal 0.1% with 7% inflation gives about −6.5%.

Something interesting happens when the real rate goes negative. Borrowers win — the money they repay is worth less and less — and savers lose. **And who is the biggest borrower of all? The government.** So negative real rates act like a tax that never needs a vote in Congress: they quietly shift purchasing power from savers to debtors. After World War II, the United States and Britain used years of negative real rates, along with economic growth, to melt away a large share of their enormous war debts — a policy mix economists call **financial repression.**

What does this mean for the new financial world? Gold and bitcoin pay no interest. When real rates are high and Treasuries reliably beat inflation, holding a non-yielding hard asset carries a big opportunity cost; when real rates are negative and Treasuries reliably lose purchasing power, hard assets look more attractive. **Real rates act like gravity on these assets** — the key to Stage 12.4's discussion of bitcoin and interest rates, and to the fiscal-dominance worries of Stage 9.4.

This is the final lesson of Stage 2 and the last piece of the **Idea ① — the price of time** puzzle: Stage 2.4 gave us the nominal floor (the Treasury yield); this lesson peels the inflation out of that floor to reveal the true price of time underneath.

**In this lesson we break it into five pieces:**

- **① Nominal vs real: the number on your money vs what it buys**
- **② The Fisher equation: stripping inflation out of interest rates**
- **③ Real yields and TIPS: the real rate, quoted directly by the market**
- **④ Negative real rates: the invisible tax and financial repression**
- **⑤ Real rates: the gravity acting on gold and bitcoin**
`,

  mechanics: `
### ① Nominal vs real: the number on your money vs what it buys

Walk through a full example. You deposit $10,000 at a 5% nominal rate, and inflation that year is 3%:

- Balance after a year: 10,000 × 1.05 = **$10,500** (5% nominal growth).
- The basket of goods that cost $10,000 a year ago now costs 10,000 × 1.03 = $10,300.
- Your $10,500 buys 10,500 ÷ 10,300 ≈ **1.0194 baskets** — **1.94%** real growth.

So "real" simply means **keeping score in baskets of goods instead of dollars.** Whenever you compare money across time, ask: is this number nominal or real?

- Your pay rises 4% while inflation runs 5%: your real wage fell about 1%.
- House prices rose 80% over 20 years while consumer prices rose 60%: in real terms, houses gained only about 12.5% (1.8 ÷ 1.6 − 1).
- A 30-year Treasury pays the same number of dollars every year, but at 3% inflation, a coupon received in year 24 buys only about half as much (Stage 2.2's Rule of 72: 72 ÷ 3 = 24).

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Real purchasing power of $10,000 over 20 years (3% inflation, in today's dollars)</text><line x1="60" y1="220" x2="610" y2="220" stroke="var(--line)" stroke-width="1.5"/><line x1="60" y1="40" x2="60" y2="220" stroke="var(--line)" stroke-width="1.5"/><g stroke="var(--line)" stroke-dasharray="3 3"><line x1="60" y1="85" x2="610" y2="85"/><line x1="60" y1="130" x2="610" y2="130"/><line x1="60" y1="175" x2="610" y2="175"/></g><line x1="60" y1="107.5" x2="610" y2="107.5" stroke="var(--muted)" stroke-width="1" stroke-dasharray="1 3"/><g font-size="10" fill="var(--muted)" text-anchor="end"><text x="54" y="223">0</text><text x="54" y="178">4,000</text><text x="54" y="133">8,000</text><text x="54" y="88">12,000</text><text x="54" y="43">16,000</text></g><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="60" y="236">0</text><text x="195" y="236">5</text><text x="330" y="236">10</text><text x="465" y="236">15</text><text x="600" y="236">20 yrs</text></g><polyline fill="none" stroke="var(--green)" stroke-width="2.5" points="60,107.5 87,105.3 114,103.1 141,100.8 168,98.5 195,96.1 222,93.7 249,91.3 276,88.8 303,86.2 330,83.6 357,81.0 384,78.3 411,75.5 438,72.7 465,69.9 492,67.0 519,64.0 546,61.0 573,57.9 600,54.7"/><polyline fill="none" stroke="var(--orange)" stroke-width="2.5" points="60,107.5 87,109.7 114,111.8 141,113.9 168,116.0 195,118.0 222,120.0 249,121.9 276,123.8 303,125.7 330,127.5 357,129.3 384,131.1 411,132.8 438,134.5 465,136.2 492,137.8 519,139.4 546,141.0 573,142.5 600,144.0"/><polyline fill="none" stroke="var(--red)" stroke-width="2.5" points="60,107.5 87,110.8 114,114.0 141,117.0 168,120.0 195,123.0 222,125.8 249,128.5 276,131.2 303,133.8 330,136.3 357,138.7 384,141.1 411,143.4 438,145.6 465,147.8 492,149.9 519,151.9 546,153.9 573,155.8 600,157.7"/><text x="596" y="48" text-anchor="end" font-size="11" font-weight="700" fill="var(--green)">Nominal 5% → real +1.94% → 14,691</text><text x="596" y="139" text-anchor="end" font-size="11" font-weight="700" fill="var(--orange-ink)">Nominal 1% → real −1.94% → 6,756</text><text x="596" y="172" text-anchor="end" font-size="11" font-weight="700" fill="var(--red)">Cash 0% → real −2.91% → 5,537</text><text x="66" y="102" font-size="10" fill="var(--muted)">Start 10,000</text><text x="320" y="258" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="600">None of these three balances ever lost a nominal cent — yet real purchasing power ends worlds apart</text></svg><figcaption>With the same 3% inflation: a deposit earning 5% grows its purchasing power about 47% in 20 years; one earning 1% loses about a third; cash in a drawer loses about 45%.</figcaption></figure>

### ② The Fisher equation: stripping inflation out of interest rates

$$
(1 + i) = (1 + r) × (1 + π)
Exact: r = (1 + i) ÷ (1 + π) − 1
Approximate: r ≈ i − π
$$

Here i is the nominal rate, r the real rate and π inflation. When inflation and rates are modest, the approximation is fine; when inflation is high, you need the exact version:

<table class="pm"><tr><th>Case</th><th>Nominal i</th><th>Inflation π</th><th>Approx. i − π</th><th>Exact</th></tr><tr><td>Normal times</td><td>5%</td><td>3%</td><td>2.00%</td><td>1.94%</td></tr><tr><td>2021 savings account (approx.)</td><td>0.1%</td><td>7%</td><td>−6.90%</td><td>−6.45%</td></tr><tr><td>1970s-style (illustrative)</td><td>7%</td><td>9%</td><td>−2.00%</td><td>−1.83%</td></tr><tr><td>High-inflation country (illustrative)</td><td>40%</td><td>35%</td><td>5.00%</td><td>3.70%</td></tr></table>

One more crucial distinction: **ex ante versus ex post.**

- **Ex ante real rate** = nominal rate − **expected** inflation. This is what borrower and lender look at when they sign.
- **Ex post real rate** = nominal rate − **actual** inflation. You only learn it a year later, looking back.

The gap between them is the "inflation surprise." In 2021–2022 inflation came in far above expectations, and real returns that looked slightly positive going in turned sharply negative after the fact — **surprise inflation transferred wealth from fixed-rate creditors to debtors.** That is why bond investors fear *unexpected* inflation, not just *high* inflation, and why long bonds demand a term premium (Stage 2.4 and Stage 4.5).

The Fisher equation is also a key to reading central banks: nominal rate = real rate + expected inflation. Only when a central bank lifts its policy rate above inflation does the real rate turn positive and policy genuinely "tighten" (Stage 1.3 and Stage 9.2).

### ③ Real yields and TIPS: the real rate, quoted directly by the market

Normally you have to *estimate* expected inflation before you can compute a real rate. But one kind of bond lets the market **quote the real rate directly: inflation-protected government bonds.**

The U.S. Treasury began issuing **TIPS** (Treasury Inflation-Protected Securities) in 1997. The principal is adjusted by CPI, and the coupon is paid on the adjusted principal. So a TIPS locks in a **real return** — its yield *is* the market's real yield. Britain got there earlier, issuing index-linked gilts from 1981.

Put an ordinary Treasury next to a TIPS of the same maturity and you can read off the market's inflation expectations:

$$
Breakeven inflation ≈ nominal Treasury yield − TIPS real yield
$$

Illustration: the 10-year Treasury yields 4.3% and the 10-year TIPS yields 2.0%, so breakeven inflation is about 2.3%. That means if inflation averages more than 2.3% over the next decade, TIPS come out ahead; if less, the ordinary Treasury wins. (Strictly speaking, the breakeven also bundles in an inflation risk premium and liquidity differences between the two markets, so it isn't a pure reading of "expected inflation.")

Real yields have swung enormously. The 10-year TIPS yield sat around **−1%** at points in 2021 — investors accepted a return guaranteed to trail inflation. By 2023 it had climbed **above 2%**, its highest in over a decade. **That leap from −1% to +2% is a big part of why stocks, long bonds and bitcoin all fell hard together in 2022**: the real price of time suddenly got expensive, and every distant cash flow and every non-yielding asset had to be repriced. For current levels, check treasury.gov.

### ④ Negative real rates: the invisible tax and financial repression

When nominal rates sit below inflation, the real rate is negative. Who wins and who loses?

- **Losers:** depositors, holders of fixed-rate bonds, people on fixed nominal pensions.
- **Winners:** debtors — above all the largest debtor, the government. The real burden of its debt shrinks automatically every year.

That is the "invisible tax": no bill, no tax form, yet purchasing power moves from savers to debtors. In their 2011 study "The Liquidation of Government Debt," economists Carmen Reinhart and M. Belen Sbrancia found that in the decades after World War II, the U.S., the U.K. and others used **interest-rate caps, capital controls and requirements that financial institutions hold government debt** to keep nominal rates below inflation — liquidating debt equal to several percent of GDP a year on average. That policy mix is **financial repression.** U.S. federal debt held by the public fell from about 106% of GDP in 1946 to roughly 25% by the mid-1970s. Growth did most of the work, but negative real rates played a real part.

The recent version went further still: from 2014, the euro area and Japan pushed policy rates below zero, producing **negative nominal rates** (not fully ended until 2022 in the euro area and 2024 in Japan), and the stock of negative-yielding bonds worldwide at one point topped $15 trillion. Bonds **guaranteed to lose money if held to maturity** still found buyers — a sign of how far policy can distort the price of time.

**Taxes make it worse.** Tax is levied on nominal returns, regardless of inflation. With a 5% nominal rate, 3% inflation and a 30% tax rate:

- After-tax nominal return = 5% × (1 − 30%) = 3.5%;
- After-tax real return = 1.035 ÷ 1.03 − 1 ≈ **0.49%**.

Push inflation to 4% and the after-tax real return becomes about **−0.48%** — you paid tax and still lost ground. **The higher inflation runs, the higher the effective tax rate on nominal returns** — the second layer of the invisible tax.

This is the heart of the "fiscal dominance" worry in Stage 9.4: when government debt is very high, the central bank may be pressured to tolerate more inflation and hold real rates down to lighten the debt burden. People who worry about that go looking for assets that can't be diluted.

### ⑤ Real rates: the gravity acting on gold and bitcoin

Gold pays no interest. The opportunity cost of holding it is the **real** return you could have earned on Treasuries (the part of a nominal return that merely compensates for inflation, gold can in principle provide too). So:

- **High real rates:** Treasuries reliably beat inflation, the opportunity cost of holding gold is large, and gold tends to struggle.
- **Low or negative real rates:** Treasuries are guaranteed to trail inflation, and gold looks relatively more attractive.

From the 2010s through 2020, gold moved clearly opposite to the 10-year TIPS yield, and when real rates went negative in 2020 gold set what was then an all-time high. But it is not a law of physics: **after 2022 the relationship weakened sharply** — real rates rose steeply while gold kept climbing, usually attributed to heavy central-bank gold buying, geopolitics and fiscal worries.

**Bitcoin** is often placed in the same framework: it pays no interest and has a fixed supply (Stage 12.2), and supporters see it as "digital gold," a hedge against negative real rates and currency debasement. During the negative-real-rate, liquidity-flooded period of 2020–2021, bitcoin soared; in 2022, as real rates turned sharply positive, it lost about three-quarters of its value from the peak (with industry blowups like Terra and FTX piled on top, Stage 10.5). **Real rates are an important backdrop for bitcoin, but not the only explanation** — Stage 12.4 weighs them alongside liquidity, risk appetite and correlations.

Finally, back to digital asset treasury companies. Their preferreds promise **nominal** dividends: Orange Corp's Orange-F pays $10 a year, always $10. At 3% inflation that is a real return of about 6.8% (1.10 ÷ 1.03 − 1), and after 24 years that $10 buys only about half as much. So for perpetual preferreds of this kind, an investor has to ask two questions at once: **is the nominal risk premium big enough (Stage 2.4, Stage 18.1)? And will it beat inflation in real terms?** On the other side of the ledger, the company holds bitcoin, a non-nominal asset — which is exactly the exchange a DAT structure is built around: **borrow nominal dollars from investors and convert them into an asset it believes cannot be diluted.** When that trade favors whom is the subject of Stages 15 through 18.

In one line: **nominal is the number; real is your life.** Interest rates, wages, returns, debts — every time you meet a number, first ask whether it is nominal or real.
`,

  demo: "real-vs-nominal",

  analogy: `
Think of money as **a measuring tape**, and inflation as **the tape slowly shrinking.**

You measure your wealth with the tape: last year it read 10,000 marks, this year 10,500 — 5% growth in nominal terms. But if the tape itself shrinks 3% a year, each mark now stands for a shorter real length. How much did you actually grow? About 10,500 × 0.97, roughly 2%. **The nominal rate is the change in marks; the real rate is the change in true length.**

A negative real rate is when the marks increase more slowly than the tape shrinks: every year you see the count going up and feel reassured, while in reality you are getting shorter. More subtly, a shrinking tape is great news for anyone in debt — they owe 10,000 marks, and by the time they repay, every mark is shorter.

TIPS are a **self-calibrating tape**: however much the tape shrinks, it adds back that many marks, so its return is directly the change in true length. And gold and bitcoin supporters would say those assets aren't measured with the tape at all — they are the *length* being measured. When real rates are high, the self-calibrating tape already gives you steady real growth and you need them less; when real rates are negative, every tape is losing, and people turn to "things that aren't tapes."
`,

  misconceptions: [
    "**\"My savings rate is positive, so my money is growing.\"** — Only in nominal terms. With a 0.1% savings rate and 7% inflation, the real return is about −6.5% and purchasing power shrinks every year. Growth has to be judged by the real rate.",
    "**\"Real rate = nominal rate − inflation, exactly.\"** — That is the approximation. The exact version is (1 + nominal) ÷ (1 + inflation) − 1. The gap is tiny when inflation is low and large when it is high: 40% nominal with 35% inflation approximates to 5%, but the real rate is only 3.7%.",
    "**\"Inflation just means prices go up; nobody's wealth is transferred.\"** — Unexpected inflation transfers wealth from creditors (savers, bondholders) to debtors (including governments). Negative real rates plus taxes on nominal returns amount to an \"invisible tax\" that needs no legislation.",
    "**\"The breakeven inflation rate is the market's precise inflation forecast.\"** — It roughly reflects inflation expectations, but it also contains an inflation risk premium and liquidity differences between TIPS and ordinary Treasuries, so treat it as an approximation.",
    "**\"When real rates rise, gold and bitcoin must fall.\"** — Real rates are an important gravitational pull on non-yielding assets, but not the only force. Gold rallied after 2022 even as real rates rose sharply, and bitcoin is also driven by liquidity, industry events and risk appetite. Correlations shift; don't apply the rule mechanically.",
  ],

  quiz: [
    {
      q: "The nominal rate is 5% and inflation is 3%. Using the exact Fisher equation, what is the real rate, roughly?",
      options: ["2.00%", "8.00%", "1.94%", "1.67%"],
      answer: 2,
      explain: "**r = 1.05 ÷ 1.03 − 1 ≈ 1.94%.** The approximation gives 2%; at low inflation the two barely differ.",
    },
    {
      q: "The 10-year Treasury yields 4.3% and the 10-year TIPS yields 2.0% (illustrative). What is the breakeven inflation rate, roughly?",
      options: ["2.3%", "6.3%", "2.0%", "4.3%"],
      answer: 0,
      explain: "**Breakeven ≈ nominal yield − real yield = 2.3%.** If inflation averages more than 2.3%, TIPS win. It also contains risk premia, so it only approximates expected inflation.",
    },
    {
      q: "The nominal rate is 5%, inflation is 3% and interest is taxed at 30%. What is the after-tax real return, roughly?",
      options: ["1.94%", "3.50%", "−0.48%", "0.49%"],
      answer: 3,
      explain: "After-tax nominal = 5% × 0.7 = 3.5%; **after-tax real = 1.035 ÷ 1.03 − 1 ≈ 0.49%.** Tax falls on the nominal return, so the higher inflation runs, the heavier the real tax burden.",
    },
    {
      q: "Which party benefits most from persistently negative real interest rates?",
      options: [
        "Savers holding lots of cash",
        "Borrowers with large fixed-rate debts, such as governments",
        "Retirees on fixed nominal pensions",
        "Investors holding long-term fixed-rate bonds",
      ],
      answer: 1,
      explain: "Negative real rates **shrink the real burden of debt every year**, so the biggest winners are large debtors, governments included — that is financial repression, the \"invisible tax.\"",
    },
    {
      q: "Why are real interest rates often described as the \"gravity\" acting on gold and bitcoin?",
      options: [
        "Because real rates determine their mining costs",
        "Because they pay no interest, so the higher real rates are, the bigger the opportunity cost of holding them",
        "Because the law ties their prices to interest rates",
        "Because a rise in real rates always makes them fall",
      ],
      answer: 1,
      explain: "The opportunity cost of a non-yielding asset is the **real** return forgone. High real rates let Treasuries beat inflation reliably; negative real rates make hard assets relatively more appealing. It's a tendency, not a certainty — gold after 2022 is the counterexample.",
    },
  ],

  further: [
    { label: "TreasuryDirect (U.S. Treasury): how TIPS work — principal adjusted by CPI", url: "https://www.treasurydirect.gov/marketable-securities/tips/" },
    { label: "Reinhart & Sbrancia, \"The Liquidation of Government Debt\" (NBER, 2011) — the classic study of financial repression", url: "https://www.nber.org/papers/w16893" },
    { label: "FRED (St. Louis Fed): 10-year TIPS real yield (DFII10)", url: "https://fred.stlouisfed.org/series/DFII10" },
    { label: "FRED: 10-year breakeven inflation rate (T10YIE)", url: "https://fred.stlouisfed.org/series/T10YIE" },
    { label: "Irving Fisher, The Theory of Interest (1930) — the classic statement of nominal vs real rates (Econlib)", url: "https://www.econlib.org/library/YPDBooks/Fisher/fshToI.html" },
  ],
};
