export default {
  id: "present-value",
  stage: 2,
  order: 3,
  title: "Present Value & Discounting: One Formula to Price Any Future Cash Flow",
  difficulty: "intro",
  prereqs: ["compounding"],

  oneLiner:
    "Compounding rolls today's money forward; **discounting** brings future money back. Take every payment an asset will make you, discount each one to today at some rate, add them up, and you have its **present value** — the closest thing finance has to a universal formula. Bonds, stocks, houses and preferreds are all special cases. A preferred that pays $10 a year forever is worth $100 at a 10% discount rate; push the rate to 12% and it is worth $83.",

  intuition: `
Suppose someone offers to sell you a slip of paper: ten years from now, it can be exchanged for $1,000. What is the most you would pay for it today?

Stage 2.1 told you which way the answer leans: future money is worth less than money now. Stage 2.2 gave you the arithmetic: if your money can reliably earn 5% a year, then $613.91 today will grow to exactly $1,000 in ten years. So the slip is worth **$613.91** today. Pay more and you would do better investing the money yourself at 5%; pay less and you have found a bargain.

**That is discounting: compounding run in reverse.** The $613.91 is the **present value** of the $1,000, and 5% is the **discount rate**.

Now swap the single slip for a whole string of them: a bond that pays you $50 a year for ten years and hands back $1,000 of principal at the end. What is it worth? Exactly the same procedure: discount each payment back to today on its own, then add them up. At 5%, those eleven payments are worth precisely **$1,000** together. If the market's required return rises to 6%, the very same cash flows add up to only about **$926**. That is the whole mechanism behind the seesaw of Stage 4.2: **the cash flows didn't change, the discount rate did, so the price did.**

Take one more step. What if the payments **never stop** — a preferred share, say, that pays $10 a year with no maturity date? Does an infinite number of payments add up to infinity? No: the further away a payment is, the less it is worth today, and far enough out it is worth practically nothing. The math produces a beautifully simple result: **\\(\\text{present value} = \\dfrac{\\text{annual payment}}{\\text{discount rate}}\\).** $10 a year at 10% is worth $100. That is the first brick Stage 18.1 uses to value the perpetual preferreds issued by digital asset treasury companies.

And if the payments grow? Picture a stock that will pay a $5 dividend next year, growing 4% a year after that, owned by investors who require 9%. The formula becomes **\\(\\text{value} = \\dfrac{\\text{next year's payment}}{\\text{discount rate} - \\text{growth rate}}\\)**\\(\\, = \\dfrac{5}{5\\%} = \\$100\\). This is the **Gordon growth model**, the starting point of stock valuation (Stage 5.3).

This lesson is the core tool of **Idea ① — the price of time.** One sentence carries it: **any asset is worth the present value of all its future cash flows.** Assets differ only in the shape of their cash flows and in their discount rates. That is also why a move in interest rates reprices everything — every one of those formulas has the same price of time sitting in its denominator.

**In this lesson we break it into five pieces:**

- **① Discounting: compounding in reverse**
- **② Streams of cash flows and net present value**
- **③ Annuities and perpetuities: pricing cash flows that never end**
- **④ Growing perpetuities: the Gordon formula**
- **⑤ Everything is present value: what it explains and where it breaks**
`,

  mechanics: `
### ① Discounting: compounding in reverse

$$
\\mathrm{PV} = \\frac{\\mathrm{FV}}{(1 + r)^{n}} = \\mathrm{FV} \\times \\text{discount factor}
\\text{Discount factor } \\mathrm{DF}(n) = \\frac{1}{(1 + r)^{n}}
$$

A discount factor answers "what is $1 at a future date worth today?" At 5%:

<table class="pm"><tr><th>Years out</th><th>1</th><th>5</th><th>10</th><th>30</th></tr><tr><td>$1 is worth today (5%)</td><td>0.952</td><td>0.784</td><td>0.614</td><td>0.231</td></tr><tr><td>$1 is worth today (6%)</td><td>0.943</td><td>0.747</td><td>0.558</td><td>0.174</td></tr></table>

Look at how the gap between the two rows widens with time. When the discount rate goes from 5% to 6%, a dollar due in one year loses only about 0.9% of its present value, but a dollar due in thirty years loses about **25%** (from 0.231 to 0.174). **The more distant a cash flow, the more sensitive it is to the discount rate.** That sentence runs through the entire bond stage: Stage 4.4 turns it into a number called duration, and Stage 4.5 uses it to explain why the 30-year Treasury is so exquisitely sensitive to rates.

Where does the discount rate come from? It is **the return on the best alternative you give up** — the opportunity cost from Stage 2.1. If something equally risky pays 5% in the market, you discount at 5%. So the discount rate isn't a number you pick out of the air; it is "the market return on assets of the same risk." Stage 2.4 shows how to build it up layer by layer from the risk-free rate.

### ② Streams of cash flows and net present value

Most assets pay not one amount but a series. Discount each payment separately, then add:

$$
\\mathrm{PV} = \\frac{\\mathrm{CF}_{1}}{1 + r} + \\frac{\\mathrm{CF}_{2}}{(1 + r)^{2}} + \\cdots + \\frac{\\mathrm{CF}_{n}}{(1 + r)^{n}}
\\text{Net present value } \\mathrm{NPV} = \\text{PV of all inflows} - \\text{PV of all outflows}
$$

Take the course's standard bond: $1,000 face value, 5% coupon, 10 years (simplified here to one coupon a year).

<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The standard bond's cash-flow timeline: discount each payment to today, then add (rate 5%)</text><text x="60" y="50" font-size="11" fill="var(--ink)">PV of ten $50 coupons: <tspan font-weight="700" fill="var(--orange-ink)">386.09</tspan></text><text x="60" y="68" font-size="11" fill="var(--ink)">PV of the $1,000 principal in year 10: <tspan font-weight="700" fill="var(--blue)">613.91</tspan></text><text x="60" y="88" font-size="12" font-weight="700" fill="var(--ink)">Bond price = 1,000.00</text><text x="60" y="106" font-size="11" fill="var(--red)">Rate rises to 6% → the same cash flows are worth 926.40</text><rect x="455" y="36" width="165" height="56" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="537" y="56" text-anchor="middle" font-size="11" fill="var(--ink)">Principal 1,000 in year 10</text><text x="537" y="76" text-anchor="middle" font-size="11" font-weight="700" fill="var(--blue)">× 0.614 = 613.91</text><line x1="540" y1="92" x2="540" y2="124" stroke="var(--blue)" stroke-width="1.5" stroke-dasharray="3 2"/><rect x="94" y="130" width="28" height="80" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/><rect x="94" y="133.8" width="28" height="76.2" fill="var(--orange)"/><text x="108" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">1</text><rect x="142" y="130" width="28" height="80" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/><rect x="142" y="137.4" width="28" height="72.6" fill="var(--orange)"/><text x="156" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">2</text><rect x="190" y="130" width="28" height="80" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/><rect x="190" y="140.9" width="28" height="69.1" fill="var(--orange)"/><text x="204" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">3</text><rect x="238" y="130" width="28" height="80" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/><rect x="238" y="144.2" width="28" height="65.8" fill="var(--orange)"/><text x="252" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">4</text><rect x="286" y="130" width="28" height="80" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/><rect x="286" y="147.3" width="28" height="62.7" fill="var(--orange)"/><text x="300" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">5</text><rect x="334" y="130" width="28" height="80" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/><rect x="334" y="150.3" width="28" height="59.7" fill="var(--orange)"/><text x="348" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">6</text><rect x="382" y="130" width="28" height="80" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/><rect x="382" y="153.2" width="28" height="56.8" fill="var(--orange)"/><text x="396" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">7</text><rect x="430" y="130" width="28" height="80" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/><rect x="430" y="155.9" width="28" height="54.1" fill="var(--orange)"/><text x="444" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">8</text><rect x="478" y="130" width="28" height="80" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/><rect x="478" y="158.4" width="28" height="51.6" fill="var(--orange)"/><text x="492" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">9</text><rect x="526" y="130" width="28" height="80" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/><rect x="526" y="160.9" width="28" height="49.1" fill="var(--orange)"/><text x="540" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">10</text><text x="108" y="128" text-anchor="middle" font-size="10" fill="var(--orange-ink)">47.62</text><text x="540" y="156" text-anchor="middle" font-size="10" fill="var(--orange-ink)">30.70</text><line x1="70" y1="210" x2="600" y2="210" stroke="var(--line)" stroke-width="1.5"/><text x="600" y="226" text-anchor="end" font-size="10" fill="var(--muted)">year</text><rect x="60" y="238" width="14" height="10" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/><text x="80" y="247" font-size="10" fill="var(--muted)">Nominal coupon $50</text><rect x="200" y="238" width="14" height="10" fill="var(--orange)"/><text x="220" y="247" font-size="10" fill="var(--muted)">Present value today (shrinks with distance)</text></svg><figcaption>Dashed boxes are the nominal $50 coupons; solid bars are what each is worth today — $47.62 for year 1, only $30.70 for year 10. Coupons plus principal add up to exactly $1,000 at 5%; at 6% the total falls to $926.40.</figcaption></figure>

The same stream is worth $1,000 at 5%, $926.40 at 6% and about $1,081 at 4%. (From Stage 4 onward we switch to the more realistic twice-a-year coupon, which gives about $925.61 at 6% — a trivial difference.)

**Net present value (NPV)** answers "is this worth doing?" by treating today's investment as a negative cash flow. A project costs $1,000 today and returns $300 a year for five years:

- Discounted at 8%, **\\(\\mathrm{NPV} = +\\$197.81\\)** → worth doing.
- Discounted at 10%, \\(\\mathrm{NPV} = +\\$137.24\\) → still worth doing, but less attractive.
- The discount rate that makes NPV exactly zero is about **15.2%** — the **internal rate of return (IRR)**. As long as your cost of capital is below 15.2%, the project creates value.

**The higher the discount rate, the less future payoffs are worth, and the fewer projects pass the NPV test.** That is the micro-level mechanism by which rate hikes cut corporate investment and make long-lived public projects more expensive (the "interest-rate channel" of Stage 9.2). And a bond's **yield to maturity** is simply the IRR that makes the present value of its cash flows equal its current price (Stage 4.2).

### ③ Annuities and perpetuities: pricing cash flows that never end

A stream of equal payments is an **annuity** (mortgage payments, pensions and bond coupons all qualify). You don't need to discount them one by one; there is a closed form:

$$
\\text{PV of an annuity} = C \\times \\frac{1 - (1 + r)^{-n}}{r}
\\text{PV of a perpetuity} = \\frac{C}{r}
$$

Example: $1,000 a year for 30 years, discounted at 5%, has a present value of about $15,372. You collect $30,000 in total, yet today it is worth only a little over half that.

Let \\(n \\to \\infty\\), \\((1 + r)^{-n} \\to 0\\), and the annuity formula collapses into the elegant **perpetuity**: \\(\\dfrac{C}{r}\\). History's most famous perpetual bonds were Britain's **consols**, first issued in the mid-18th century with no maturity date, paying interest only; the British government finally redeemed the last of them in 2015.

**A perpetual preferred stock is a perpetuity** (Stage 6.2). Take Orange Corp's senior preferred, Orange-F: $100 stated value, 10% dividend, so $10 a year.

<table class="pm"><tr><th>Market's required return</th><th>8%</th><th>10%</th><th>12%</th></tr><tr><td>Value per share \\(= \\dfrac{10}{r}\\)</td><td>125.00</td><td>100.00</td><td>83.33</td></tr><tr><td>Versus stated value</td><td>+25%</td><td>0%</td><td>−16.7%</td></tr></table>

Two things to remember:

- **Perpetual assets are extremely rate-sensitive.** A move in the required return from 10% to 12% — just two percentage points — knocks 16.7% off the price. Its modified duration is roughly \\(\\dfrac{1}{r}\\), about 10 years at 10% (Stage 4.4).
- Run it backward and **the price tells you the market's required return**: a perpetual preferred paying $10 a year that trades at $80 is being priced to yield 12.5%. That is how Stage 18.1 reads the "yield" on DAT preferreds — and why a rising 30-year Treasury yield drags on their prices (Stage 4.5).

### ④ Growing perpetuities: the Gordon formula

If the cash flow grows at a constant rate \\(g\\) every year (a dividend that rises 4% a year, say), the infinite sum still converges — as long as \\(g\\) is below \\(r\\):

$$
P = \\frac{D_{1}}{r - g}
r = \\underbrace{\\frac{D_{1}}{P}}_{\\text{dividend yield}} + \\underbrace{g}_{\\text{growth}}
$$

Here \\(D_{1}\\) is next year's dividend; the second line is the same formula, rearranged.

It is usually named after the American economist Myron Gordon, who developed and popularized it with co-authors in the 1950s: the **Gordon growth model.** Example: next year's dividend is $5, the required return is 9%, growth is 4%, so **\\(\\text{value} = \\dfrac{5}{9\\% - 4\\%} = \\$100\\)**.

Its weak spot is the denominator. \\(r - g\\) is usually a small number, and small changes in a small number move the answer a lot:

<table class="pm"><tr><th>Case</th><th>\\(r\\)</th><th>\\(g\\)</th><th>\\(r - g\\)</th><th>Value</th></tr><tr><td>Base case</td><td>9%</td><td>4%</td><td>5%</td><td>100.00</td></tr><tr><td>Required return +1%</td><td>10%</td><td>4%</td><td>6%</td><td>83.33</td></tr><tr><td>Growth expectation +1%</td><td>9%</td><td>5%</td><td>4%</td><td>125.00</td></tr></table>

Two lessons. First, **a small rise in rates hits high-growth assets hardest**, because most of their value sits in the distant future (the "long duration" of growth stocks, Stage 5.3). Second, **as \\(g\\) approaches \\(r\\), the valuation explodes**; at \\(g \\ge r\\) the formula breaks entirely. Treat any valuation that relies on "high growth forever" with suspicion.

The second equation is handy on its own: \\(\\text{dividend yield} + \\text{growth} = \\text{the return investors require}\\). A stock yielding 2% with expected growth of 5% implies a required return of about 7%.

### ⑤ Everything is present value: what it explains and where it breaks

<table class="pm"><tr><th>Asset</th><th>Future cash flows</th><th>Discounted at</th><th>Where we cover it</th></tr><tr><td>Treasury bond</td><td>Fixed coupons + principal</td><td>Treasury yield</td><td>Stage 4.1</td></tr><tr><td>Corporate bond</td><td>Coupons + principal (may default)</td><td>Treasury yield + credit spread</td><td>Stage 4.6</td></tr><tr><td>Stock</td><td>Dividends / free cash flow, growing</td><td>Risk-free rate + equity risk premium</td><td>Stage 5.3</td></tr><tr><td>Perpetual preferred</td><td>Fixed dividend, no maturity</td><td>Required preferred yield</td><td>Stage 18.1</td></tr><tr><td>Rental property</td><td>Rent minus costs, then a sale</td><td>Mortgage rate / comparable returns</td><td>—</td></tr></table>

**Every row has the same thing in its denominator: the price of time.** That is the mathematical reason behind Idea ①'s claim that when rates move, every asset gets repriced.

The limits of the method matter just as much:

- **Garbage in, garbage out.** Both the cash-flow forecasts and the discount rate are estimates. For a growth stock, most of the value comes from a "terminal value" a decade or more out — the least reliable part of the whole exercise.
- **Assets with no cash flows**, such as gold and bitcoin, can't be valued with the formula directly — they pay no interest and no dividends. Their value comes from their monetary role: how many people want to hold them as a store of value (Stage 12.3). Rates still matter, though: the opportunity cost of holding them is the interest you forgo (Stage 2.5 explains this with real rates).
- **Digital asset treasury companies** are a curious hybrid: their main asset is bitcoin, which produces no cash flow, yet they issue preferreds and bonds that promise fixed cash flows. Valuing the preferred uses this lesson's perpetuity formula; valuing the common requires answering a different question — where does a premium over bitcoin NAV come from (Stage 16.2)?

In one line: **\\(\\text{present value} = \\sum_{t} \\dfrac{\\text{cash flow}_{t}}{(1 + r)^{t}}\\).** Learn it and you hold the key to pricing almost every financial instrument; learn its limits and it won't mislead you.
`,

  demo: "present-value",

  analogy: `
Think of discounting as **looking at things in the distance.**

Standing in the present and looking toward the future, every cash flow is a signpost along the road. A signpost one year away looks crisp and nearly full-size; one ten years away has visibly shrunk; one thirty years away is a speck. **The discount rate is how hazy the air is**: the thicker the haze (the higher the rate), the more the distant signposts shrink.

Valuing an asset means standing still and adding up how big every signpost *looks* from where you are.

- A 10-year bond is a neat row of small signposts with one big billboard at the end (the principal).
- A perpetual preferred is a row of identical signposts stretching to the horizon — infinitely many, but the far ones shrink to dots, so the total is finite.
- A growth stock is a row of signposts that get bigger as they go — tiny nearby, huge far away. **When the haze thickens, it loses the most**, because its value is all in the distance.
- An asset like bitcoin has no signposts on the road at all. You can't value it by measuring haze; you can only ask how many people will want to travel there.

So when the news says "long-term rates are rising," picture a fog rolling in: every distant signpost shrinks at once — and the further away, the more it shrinks.
`,

  misconceptions: [
    "**\"A bond paying $50 a year for ten years plus $1,000 at the end is worth $1,500.\"** — $1,500 adds money from different dates as if it were the same money. Discount each payment first: at 5% the total is exactly $1,000; at 6% it is about $926.",
    "**\"Payments that go on forever add up to infinity, so a perpetual asset is priceless.\"** — The further away a payment, the less it is worth today, and the infinite series converges to \\(\\dfrac{C}{r}\\). $10 a year at a 10% discount rate is worth $100, not a cent more.",
    "**\"The discount rate is a subjective input — plug in whatever you like.\"** — The discount rate should equal the market return on assets of the same risk (the opportunity cost). Too low and you overvalue everything; too high and you reject good projects. It is anchored on the risk-free rate with risk premia stacked on top (Stage 2.4).",
    "**\"Faster-growing companies are less afraid of rate hikes.\"** — Exactly backward. High-growth companies have their value concentrated in the distant future, which makes them the most rate-sensitive; in the Gordon formula, a one-point rise in \\(r\\) can cut value by more than 15%.",
    "**\"Bitcoin has no cash flows, so it's worth zero.\"** — Present value applies to assets that produce cash flows. Gold and bitcoin derive their value from demand for them as money or a store of value, which calls for a different framework (Stage 12.3). \"No cash flows\" is accurate; \"therefore worth zero\" mistakes the edge of a tool for the edge of the world.",
  ],

  quiz: [
    {
      q: "Discounted at 5%, what is a $1,000, 5% coupon, 10-year bond (annual coupons) worth? And at 6%?",
      options: ["$1,500; $1,500", "$1,000; about $926", "$1,000; about $1,081", "$950; about $900"],
      answer: 1,
      explain: "When the coupon rate equals the discount rate, a bond is priced at face value: **$1,000.** At 6%, the same cash flows are worth less today — about **$926.40.** That is Stage 4.2's seesaw.",
    },
    {
      q: "A perpetual preferred pays a $10 annual dividend and the market requires a 12.5% return. What is it worth?",
      options: ["$125", "$100", "$12.50", "$80"],
      answer: 3,
      explain: "**\\(\\text{PV of a perpetuity} = \\dfrac{C}{r} = \\dfrac{10}{12.5\\%} = \\$80\\).** Read it the other way: if it trades at $80, the market is demanding 12.5%.",
    },
    {
      q: "Next year's dividend is $5, expected growth is 4% and the required return is 9%. What does the Gordon model say the stock is worth? And if the required return rises to 10%?",
      options: ["$100; $83.33", "$55.56; $50", "$125; $100", "$100; $90.91"],
      answer: 0,
      explain: "**\\(P = \\dfrac{5}{9\\% - 4\\%} = \\$100\\)**; at \\(r = 10\\%\\), **\\(P = \\dfrac{5}{6\\%} = \\$83.33\\).** Because \\(r - g\\) is small, a tiny change in the denominator moves the value a lot.",
    },
    {
      q: "The discount rate rises from 5% to 6%. Which cash flow's present value falls the most, in percentage terms?",
      options: ["$100 due in 1 year", "$100 due in 5 years", "$100 due in 30 years", "$100 due in 10 years"],
      answer: 2,
      explain: "The one-year dollar loses about 0.9%; **the thirty-year dollar loses about 25%.** The further away a cash flow, the more times it is discounted and the more rate-sensitive it becomes — that is duration (Stage 4.4).",
    },
    {
      q: "A project costs $1,000 today and returns $300 a year for five years; its IRR is about 15.2%. In which case is it NOT worth doing?",
      options: [
        "Your cost of capital is 8%",
        "Your cost of capital is 10%",
        "Your cost of capital is 12%",
        "Your cost of capital is 18%",
      ],
      answer: 3,
      explain: "**When the cost of capital exceeds the IRR, NPV is negative.** 18% is above 15.2%, so the project destroys value; in the other three cases NPV is positive.",
    },
  ],

  further: [
    { label: "Aswath Damodaran (NYU Stern): valuation lecture notes and data — the standard reference on PV and DCF", url: "https://pages.stern.nyu.edu/~adamodar/" },
    { label: "Khan Academy: present value, discounting and net present value", url: "https://www.khanacademy.org/economics-finance-domain/core-finance/interest-tutorial" },
    { label: "Wikipedia: Consol (bond) — the perpetual bond from the 18th century to its full redemption in 2015", url: "https://en.wikipedia.org/wiki/Consol_(bond)" },
    { label: "Wikipedia: Dividend discount model and the Gordon growth model", url: "https://en.wikipedia.org/wiki/Dividend_discount_model" },
  ],
};
