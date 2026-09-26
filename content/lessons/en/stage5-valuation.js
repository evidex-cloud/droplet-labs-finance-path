export default {
  id: "valuation",
  stage: 5,
  order: 3,
  title: "Valuation: DCF, P/E & Why Interest Rates Drive Multiples",
  difficulty: "core",
  prereqs: ["present-value", "financial-statements"],

  oneLiner:
    "What is a company worth? The answer is exactly the same as for a bond: **take the cash it will hand you in the future and discount it back to today at some interest rate.** A DCF is the long form of that sentence; P/E and EV/EBITDA are the shorthand. Once you see this, you understand why a rising 30-year Treasury yield squeezes stock multiples — **stocks have duration too, and a growth stock's duration can be longer than a 30-year bond's.**",

  intuition: `
Suppose someone offers to sell you Morning Coffee outright. What would you pay?

You would not ask “what are the espresso machines worth?” (that is liquidation value), and you would not just ask “what did it earn last year?” (that is history). What you are really asking is: **once I own it, how much cash will it put in my pocket each year, and what is that cash worth today?** That is the present value you learned in Stage 2.3: future money has to be discounted back at an interest rate. A bond's future cash flows are written into its contract (Stage 4.1); a company's future cash flows you have to forecast yourself. That is the whole difference — and the whole difficulty.

Spell that sentence out and you get a **discounted cash flow (DCF)** valuation: forecast free cash flow (Stage 5.2's “cash from operations minus capex”) for a few years, add a terminal value that stands for “everything after that, forever,” and discount the lot back to today at a discount rate.

Building a full DCF every time is tiring, so the market invented **shorthand**: the price-to-earnings ratio (P/E) — how many times earnings per share the stock price is; EV/EBITDA — how many times operating profit the enterprise value is. **A multiple is not a different theory; it is a DCF compressed into one number.** A P/E of 20, translated, says “the market thinks the discount rate minus the growth rate is roughly 5%.”

That leads to the most important conclusion of this lesson, and it rests on **Idea ① — the price of time.** If a stock's value is the discounted value of its future cash, then whenever the discount rate moves, every stock has to be repriced. A simple example: a company will earn $5 a share next year, its profits grow 4% a year, and investors want an 8% return. It is worth \\(\\dfrac{\\$5}{8\\% - 4\\%} =\\) **$125**, a P/E of 25. Now Treasury yields rise and investors demand 9%. The very same company is worth \\(\\dfrac{\\$5}{5\\%} =\\) **$100**. **Nothing about the business changed; rates went up one percentage point and the share price fell 20%.**

That is why the “30-year yield breaks above 5%” headline from Stage 4.5 makes stock markets nervous: long-term rates are the foundation of every asset's discount rate. And the companies that will make most of their money in the future — growth stocks — get hurt the most, because their cash flows sit furthest away, like an extra-long bond. In Stage 16.2 you will see that a DAT's mNAV is essentially a “multiple on net asset value,” and it is just as sensitive to rates and growth expectations.

**In this lesson we break it into five parts:**

- **① All valuation is discounting: a DCF in three steps**
- **② Multiples are DCF shorthand: P/E, EV/EBITDA and P/B**
- **③ Why rates drive multiples: the duration of a stock**
- **④ Growth vs value: long duration vs short duration**
- **⑤ When the asset has no cash flow: bitcoin and the “multiple on NAV”**
`,

  mechanics: `
### ① All valuation is discounting: a DCF in three steps

**Step one: forecast free cash flow.** Morning Coffee is opening a new store this year, so its free cash flow is only $400K (Stage 5.2). Assume the expansion phase ends and next year's free cash flow is $1.0M, then grows 10% a year for the following four years: $1.00M, $1.10M, $1.21M, $1.331M, $1.464M.

**Step two: compute a terminal value.** The company does not vanish after year 5. Assume it then grows 3% a year forever (roughly nominal economic growth) and use the **Gordon growth formula** from Stage 2.3:

$$
\\text{Terminal value (end of year 5)} = \\frac{\\text{year-6 cash flow}}{\\text{discount rate} - \\text{perpetual growth}}
\\text{Terminal value} = \\frac{\\$1.464\\text{M} \\times 1.03}{9\\% - 3\\%} \\approx \\$25.13\\text{M}
$$

**Step three: discount everything back to today.** Use a 9% discount rate (part ③ explains where it comes from):

<table>
<tr><th>Item</th><th>Amount ($K)</th><th>Share</th></tr>
<tr><td>Present value of years 1–5 cash flows</td><td>4,672</td><td>22%</td></tr>
<tr><td>Present value of terminal value (\\(\\dfrac{25{,}134}{1.09^{5}}\\))</td><td>16,335</td><td><b>78%</b></td></tr>
<tr><td><b>Enterprise value (EV)</b></td><td><b>21,007</b></td><td>100%</td></tr>
<tr><td>\\(-\\text{debt}\\ 4{,}800 + \\text{cash}\\ 800\\)</td><td>−4,000</td><td></td></tr>
<tr><td><b>Equity value</b></td><td><b>17,007</b></td><td>about <b>$17.00 per share</b> (1M shares)</td></tr>
</table>

Two expert points:

- **The terminal value usually dominates.** Here 78% of the value comes from “after year 5.” So a DCF's answer is extremely sensitive to the perpetual growth rate and the discount rate — move the discount rate from 9% to 10% and equity value falls from about $17.0M to about $13.9M (**−18%**). A DCF is not a fortune-teller; it is **a machine for making your own assumptions visible.**
- **You discount free cash flow and get enterprise value.** Free cash flow belongs to all providers of capital, lenders and owners alike, so discounting it at the weighted average cost of capital (WACC) gives the value of the whole enterprise; subtract net debt to get the owners' share. That is Stage 5.1's residual claim again: lenders first, owners get what is left.

### ② Multiples are DCF shorthand: P/E, EV/EBITDA and P/B

If a company pays out all its profit (or, equivalently, \\(\\text{profit} \\approx \\text{free cash flow}\\)) and grows at g forever, the Gordon formula can be rewritten as:

$$
\\text{Price} = \\frac{\\text{next year's EPS}}{r - g}
\\text{Forward P/E} = \\frac{1}{r - g}
\\text{Earnings yield}\\ \\frac{E}{P} = r - g
$$

**A P/E is simply the reciprocal of “discount rate minus growth rate.”** A P/E of 25 means \\(r - g \\approx \\dfrac{1}{25} = 4\\%\\); a P/E of 10 means \\(r - g \\approx \\dfrac{1}{10} = 10\\%\\). When you hear “that stock is expensive at 60 times earnings,” the translation is: “for 60x to make sense, this company must keep growing at close to the discount rate for a very long time.”

Common multiples and what they are good for (Morning Coffee, share price $12):

<table>
<tr><th>Multiple</th><th>Formula</th><th>Morning Coffee</th><th>Best suited to</th></tr>
<tr><td>P/E</td><td>\\(\\dfrac{\\text{Price}}{\\mathrm{EPS}}\\)</td><td>\\(\\dfrac{12}{1.2} =\\) <b>10x</b></td><td>Companies with steady profits; distorted by leverage and accounting</td></tr>
<tr><td>EV/EBITDA</td><td>\\(\\dfrac{\\text{Market cap} + \\text{debt} - \\text{cash}}{\\mathrm{EBITDA}}\\)</td><td>\\(\\dfrac{12{,}000 + 4{,}800 - 800}{2{,}500} =\\) <b>6.4x</b></td><td>Comparing firms with different leverage; ignores capex</td></tr>
<tr><td>P/B</td><td>\\(\\dfrac{\\text{Price}}{\\text{book value per share}}\\)</td><td>\\(\\dfrac{12}{5.8} \\approx\\) <b>2.1x</b></td><td>Banks, insurers, holding companies — where the assets are the business</td></tr>
</table>

Notice the numerator of EV/EBITDA is **enterprise value**, not market cap: it includes the lenders' slice, so you can fairly compare a company with no debt to one with a lot. That enterprise-value logic reappears unchanged in Strategy's definition of mNAV in Stage 16.2: \\(\\dfrac{\\text{market cap} + \\text{debt} + \\text{preferred} - \\text{cash}}{\\text{BTC NAV}}\\).

On our DCF, Morning Coffee is worth about $17 a share; the market price is $12. Either the market is gloomier than you (slower growth, higher risk) or you are looking at an opportunity. **The real use of valuation is not to produce “the correct price” but to work out what assumptions the current price implies** — and then judge whether they are reasonable.

### ③ Why rates drive multiples: the duration of a stock

Where does the discount rate r come from? Stage 2.4 gave the recipe:

$$
\\text{Required return}\\ r = \\text{risk-free rate} + \\text{risk premium}
r = \\underbrace{4.5\\%}_{\\text{long Treasury}} + \\underbrace{4.5\\%}_{\\text{equity risk premium}} = 9\\%
$$

The equity risk premium is the subject of Stage 5.4; here we care about the first term. **When the risk-free rate moves, every stock's r moves.** Back to the company earning $5 and growing 4%:

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">P/E = 1 ÷ (r − g): each step up in r crushes the growth stock's multiple more</text><line x1="90" y1="230" x2="600" y2="230" stroke="var(--line)" stroke-width="1.5"/><line x1="90" y1="40" x2="90" y2="230" stroke="var(--line)" stroke-width="1.5"/><text x="90" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">8%</text><text x="215" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">9%</text><text x="340" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">10%</text><text x="465" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">11%</text><text x="590" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">12%</text><text x="345" y="266" text-anchor="middle" font-size="11" fill="var(--muted)">Investors' required return r (= risk-free rate + risk premium)</text><text x="80" y="64" text-anchor="end" font-size="10" fill="var(--muted)">50×</text><text x="80" y="145" text-anchor="end" font-size="10" fill="var(--muted)">25×</text><text x="80" y="198" text-anchor="end" font-size="10" fill="var(--muted)">10×</text><line x1="90" y1="145" x2="600" y2="145" stroke="var(--line)" stroke-dasharray="3 4"/><polyline points="90.0,60.0 121.3,78.9 152.5,94.0 183.8,106.4 215.0,116.7 246.3,125.4 277.5,132.9 308.8,139.3 340.0,145.0 371.3,150.0 402.5,154.4 433.8,158.4 465.0,162.0 496.3,165.2 527.5,168.2 558.8,170.9 590.0,173.3" fill="none" stroke="var(--orange)" stroke-width="3"/><polyline points="90.0,181.4 121.3,183.1 152.5,184.7 183.8,186.1 215.0,187.5 246.3,188.8 277.5,190.0 308.8,191.1 340.0,192.2 371.3,193.2 402.5,194.2 433.8,195.1 465.0,196.0 496.3,196.8 527.5,197.6 558.8,198.4 590.0,199.1" fill="none" stroke="var(--blue)" stroke-width="3"/><circle cx="90" cy="60" r="4" fill="var(--orange)"/><circle cx="215" cy="116.7" r="4" fill="var(--orange)"/><text x="222" y="104" font-size="11" fill="var(--orange-ink)">Growth stock, g = 6%: 50× → 33× (−33%)</text><circle cx="90" cy="181.4" r="4" fill="var(--blue)"/><circle cx="215" cy="187.5" r="4" fill="var(--blue)"/><text x="222" y="214" font-size="11" fill="var(--blue)">Value stock, g = 1%: 14.3× → 12.5× (−12.5%)</text></svg><figcaption>The same move in r from 8% to 9%: a growth stock growing 6% drops from 50x to 33x earnings, while a value stock growing 1% only slips from 14.3x to 12.5x. The closer g sits to r, the steeper the curve.</figcaption></figure>

In bond language: differentiate the Gordon formula with respect to r and you get a stock's **modified duration \\(\\approx \\dfrac{1}{r - g}\\).** For a company with \\(r = 8\\%\\) and \\(g = 4\\%\\), that is about **25 years** — longer than the 30-year Treasury with its modified duration of about 15.5 from Stage 4.4! It sounds backwards, but the logic is simple: a bond repays its principal after 30 years, while a company's cash flows in principle go on forever, and keep growing, so most of its value sits far in the future.

Some honest caveats:

- **Why rates rise matters.** If rates rise because the economy is stronger and inflation higher, companies' nominal growth g may rise too and partly offset the higher r. If rates rise because of term premium and fiscal worries (the Stage 4.5 scenario), g does not come along for the ride, and valuations take the full hit.
- **Risk premiums move too.** In a panic the risk premium jumps and r rises; in a bubble the risk premium gets squashed and r falls — one of the main threads of Stage 10.4 on bubbles.
- **The duration formula is a linear approximation.** When r goes from 8% to 9%, a duration of 25 predicts a 25% drop; the actual drop is 20%. Stocks have “convexity” just like bonds (Stage 4.4).

### ④ Growth vs value: long duration vs short duration

Markets like to sort stocks into two bins:

- **Growth stocks** earn little today (or lose money) and the market is betting on fast growth later — tech, biotech, “the next big thing.” Most of the value lies in the distant future → **long duration.**
- **Value stocks** earn plenty today, grow slowly and often pay dividends — banks, energy, utilities, consumer staples. Most of the value comes from near-term cash → **short duration.**

Hence a rule of thumb: **growth stocks win in eras of falling rates; value stocks win when rates climb fast.** The zero-rate 2010s were a golden decade for growth. In 2022, as the Federal Reserve raised rates at a breakneck pace, the Nasdaq Composite lost roughly a third of its value over the year, while value stocks fell far less. There is nothing mysterious about this “style rotation” — it is the difference in slope between the two curves in the chart above.

“Growth versus value” is not an either/or, either. A better question is: **how much are you paying for the growth?** A company at 50x earnings is not expensive if it can sustain 6% growth for decades; it is absurdly expensive if growth drops back to 3% after five years. That is exactly the question a DCF is built to answer.

### ⑤ When the asset has no cash flow: bitcoin and the “multiple on NAV”

A DCF needs cash flows. Bitcoin has no coupon, no profits, no dividends — Stage 12.3 says plainly that **you cannot run a DCF on bitcoin**; you have to think about its value with other frameworks, such as “share of gold's market as digital gold” or network adoption curves. Rates still reach it by another route, though: the **opportunity cost** of holding a non-yielding asset is the Treasury yield you give up. The higher real interest rates are, the more it costs to hold gold or bitcoin (Stage 2.5 and Stage 9.3).

How, then, do you value a company that holds bitcoin (a DAT)? Behind its common stock sit a pile of bitcoin and a capital structure. The market prices it much as it prices a bank or a holding company: with something like a price-to-book ratio. In the DAT world that multiple is called **mNAV** — market cap (or enterprise value) divided by BTC NAV. Orange Corp has a $1.5B market cap and $1B of BTC NAV, so \\(\\mathrm{mNAV} = \\dfrac{\\$1.5\\text{B}}{\\$1\\text{B}} = 1.5\\); on the enterprise-value basis, \\(\\dfrac{15 + 1.5 + 1.5 - 0.3}{10} = 1.77\\).

Why would the market pay $1.50 for $1 of bitcoin? It is the same question as why it pays 50x earnings for a growth stock: **the market is paying for future growth** — here, growth in “BTC per share” (Stage 16.1 and the flywheel of Stage 16.7). So mNAV has “duration” too: it is a bet on the distant future, and when discount rates rise or growth expectations are cut, the premium gets compressed. Stage 16.2 covers the different mNAV definitions and the drivers of the premium in full, and Stage 18.3 covers what happens when mNAV falls below 1. This lesson explains mechanisms only; it is not investment advice about any security.
`,

  demo: "valuation",

  analogy: `
Valuing a company is like pricing a **fruit tree.**

You would not bid on a fruit tree by the weight of its timber (liquidation value), nor just by last year's harvest (historical profit). You would think: how much fruit will it bear each year from now on, what is that fruit worth — and **next year's fruit is worth less than this year's**, because you have to wait, and waiting has a price (the interest rate).

An old apple tree reliably gives you a basket every year, and you can eat it right away — that is a **value stock.** A sapling planted this spring has no fruit at all, but in ten years it might be covered — that is a **growth stock.**

Now the price of waiting goes up (rates rise). The old apple tree loses only a little value, because most of its fruit is right in front of you. The sapling loses a lot, because all of its fruit lies in the distant future and every year of waiting is now charged at a steeper rate. **The interest rate is the price of time, and the longer a tree makes you wait, the more sensitive it is to that price.**

The P/E ratio is just orchard-owners' slang: “this tree sells for 20 years of harvest.” It sounds simple, but hidden inside it are all the assumptions about growth and the cost of waiting.
`,

  misconceptions: [
    "**“A low P/E means a stock is cheap.”** — A low P/E can mean the market expects profits to fall, sees high risk, or suspects that earnings are inflated by one-off gains. \\(\\text{P/E} = \\dfrac{1}{r - g}\\); a low multiple only tells you the market assumes a high r or a low g. Your job is to judge whether those expectations are right.",
    "**“A DCF gives you a stock's true price.”** — A DCF's answer depends heavily on its assumptions: the terminal value is often more than 70% of the total, and a one-point change in the discount rate can move the result by a fifth. Its greatest use is in reverse: what growth and discount rate does today's price imply?",
    "**“Rising rates only hurt bonds; stocks are real assets and don't care.”** — A stock's value is also discounted future cash. At \\(\\dfrac{1}{r - g}\\), an ordinary stock's duration can reach 25 years, longer than a 30-year Treasury; growth stocks go further still.",
    "**“Growth and value are investing philosophies that have nothing to do with rates.”** — The biggest difference between them is the timing of their cash flows — that is, their duration. Growth stocks getting hit harder when rates jump is arithmetic, not a style preference.",
    "**“Bitcoin has no cash flows, so interest rates don't affect it.”** — Rates reach non-yielding assets through opportunity cost: the higher real rates are, the more income you forgo by holding gold or bitcoin. You just cannot use a DCF, and need other frameworks instead (Stage 12.3).",
  ],

  quiz: [
    {
      q: "A company will earn $5 a share next year and grow 4% forever. Investors' required return rises from 8% to 9%. Under the Gordon formula (assuming full payout), what happens to the share price?",
      options: [
        "It falls from $125 to $100 (−20%)",
        "It falls from $62.50 to $55.60 (−11%)",
        "Nothing, because earnings did not change",
        "It falls from $125 to $112.50 (−10%)",
      ],
      answer: 0,
      explain: "\\(\\dfrac{5}{8\\% - 4\\%} = 125\\); \\(\\dfrac{5}{9\\% - 4\\%} = 100\\). **Earnings are unchanged; the discount rate rose one point and the price fell 20%** — rates drive multiples.",
    },
    {
      q: "Under the simplifying assumptions of full payout and perpetual growth, what does a forward P/E of 25 imply?",
      options: [
        "The company takes 25 years to pay you back",
        "The required return minus the growth rate is about 4%",
        "The growth rate is 25%",
        "The discount rate is 25%",
      ],
      answer: 1,
      explain: "\\(\\text{P/E} = \\dfrac{1}{r - g}\\), so \\(r - g = \\dfrac{1}{25} =\\) **4%**. A multiple is DCF shorthand: it compresses the gap between the discount rate and the growth rate into a single number.",
    },
    {
      q: "Why do growth stocks usually fall more than value stocks for the same rise in rates?",
      options: [
        "Because growth stocks pay higher dividends",
        "Because growth stocks all borrow heavily",
        "Because regulators are stricter with growth stocks",
        "Because more of their value comes from distant future cash flows — their duration is longer",
      ],
      answer: 3,
      explain: "A stock's \\(\\text{duration} \\approx \\dfrac{1}{r - g}\\); the closer g is to r, the longer the duration. A growth stock's cash flows are concentrated far in the future, like an ultra-long bond, making it the most sensitive to the discount rate.",
    },
    {
      q: "Why does EV/EBITDA use enterprise value (\\(\\text{market cap} + \\text{debt} - \\text{cash}\\)) in the numerator rather than market cap?",
      options: [
        "Because enterprise value is always smaller than market cap",
        "Because EBITDA is profit before interest and belongs to all providers of capital, so the numerator must include the lenders' slice to match",
        "Because accounting standards require it",
        "Because it makes the multiple look lower and more attractive",
      ],
      answer: 1,
      explain: "EBITDA comes before interest, so it is the cake shared by lenders and owners; the numerator must be the value of the whole enterprise too. The same logic shows up in Strategy's enterprise-value mNAV (Stage 16.2).",
    },
    {
      q: "Orange Corp has a $1.5B market cap and $1B of BTC NAV (\\(\\mathrm{mNAV} = 1.5\\)). Which statement best explains why the market pays a premium?",
      options: [
        "The market has made a mistake, and the premium must disappear",
        "Because bitcoin's DCF value is above its market price",
        "The market is paying for future growth in BTC per share, and that premium is as sensitive to rates and growth expectations as a growth stock's high P/E",
        "Because the company's coffee business is very profitable",
      ],
      answer: 2,
      explain: "mNAV is a “multiple on NAV.” The premium reflects expected growth in BTC per share (plus access, volatility value and more); as with growth stocks, higher discount rates or lower growth expectations compress it (Stages 16.2, 18.3).",
    },
  ],

  further: [
    { label: "Aswath Damodaran (NYU Stern) valuation home page — DCF, multiples and datasets", url: "https://pages.stern.nyu.edu/~adamodar/" },
    { label: "Damodaran: implied equity risk premium for U.S. stocks, year by year", url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/implpr.html" },
    { label: "Robert Shiller's online data — the S&P 500 cyclically adjusted P/E (CAPE) and long-term rates", url: "http://www.econ.yale.edu/~shiller/data.htm" },
  ],
};
