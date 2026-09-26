export default {
  id: "time-value",
  stage: 2,
  order: 1,
  title: "The Time Value of Money: Why $100 Today Beats $100 Next Year",
  difficulty: "intro",
  prereqs: ["what-finance-does", "inflation"],

  oneLiner:
    "A $100 bill today and a $100 bill next year carry the same number, but they are not the same thing. How much extra would someone have to promise before you'd agree to wait a year — $105? $110? **That extra is the price of time, and we call it the interest rate.** It comes from four sources: impatience, opportunity cost, inflation and risk. This is where the course's Idea ① begins: **the price of every asset, in the end, is what future money is worth today.**",

  intuition: `
Quick question — don't overthink it:

> A: Take $100 right now. B: Take $100 a year from now.

Almost everyone picks A. No surprise there. The interesting question is the next one:

> A: Take $100 right now. B: Take $X a year from now. How big does X have to be before you switch to B?

Some people say $103. Some say $110. A few say "you could offer me $200 and I still wouldn't wait." **Whatever X you name is the price you put on one year of waiting.** If you say $106, your personal interest rate is 6%: in your eyes, \\(\\$100\\ \\text{today} = \\$106\\ \\text{next year}\\) — they are worth exactly the same.

That is the **time value of money**. Money has a face value, but it also has a *when*. The same $100 is worth more the sooner it arrives and less the later it arrives. **An interest rate is the exchange rate between present dollars and future dollars** — just as there is an exchange rate between dollars and euros, there is one between "this year's dollars" and "next year's dollars."

Why is money now worth more than money later? Four reasons, each of which you have felt personally:

- **Impatience.** People would rather enjoy things now. A great dinner or a trip is better this year than the same thing next year.
- **Opportunity cost.** The $100 you hold today can go into a savings account, a Treasury bill or a business right away and become $104 or $105 in a year. Waiting a year to receive $100 means giving up that $4 or $5.
- **Inflation.** As Stage 1.4 showed, prices rise. Next year's $100 will probably buy less than today's $100 does.
- **Risk.** Promises get broken. The person who owes you money next year might change their mind, go bankrupt or vanish. The shakier the promise, the more compensation you demand.

Stack those four together and you get the compensation for waiting. A bank might pay you 2% on deposits, a payday lender might charge 36% or far more, a credit card might charge 20-something percent — the gaps are huge because the four reasons carry very different weights, above all the risk layer.

Why does this matter so much? Because **the first thing finance does is move value across time** (Stage 0.1). Saving moves today's money into the future; borrowing pulls future money into today. Pensions, mortgages, bonds, stocks — every one of them is a time-transport machine. And any time you move money through time you need a conversion rate. That rate is the interest rate.

This lesson is the first bead on the string of **Idea ① — the price of time**. Everything after it leans on this one: Stage 2.2 shows how that price snowballs through compounding, Stage 2.3 turns it into a universal formula for valuing any asset, Stage 4.1 reveals that a bond is nothing more than a bundle of promises of future money, and Stage 4.5 explains why a move in the 30-year Treasury yield forces the whole world to reprice — because **when the price of time changes, the present value of every future dollar changes with it.**

**In this lesson we break it into five pieces:**

- **① One multiple-choice question: interest is the price of time**
- **② Four reasons: impatience, opportunity cost, inflation, risk**
- **③ Future value and present value: two directions on the timeline**
- **④ Your personal discount rate: from marshmallows to credit cards**
- **⑤ The market's "time exchange rate": from savers to Bitcoin and DATs**
`,

  mechanics: `
### ① One multiple-choice question: interest is the price of time

Write the opening question as an equation. If "$100 today" and "$106 in one year" feel equally good to you, then:

$$
\\$100\\ \\text{today} = \\$100 \\times (1 + r)\\ \\text{in one year}
100 \\times (1 + r) = 106 \\Rightarrow r = 6\\%
$$

That \\(r\\) goes by many names: interest rate, rate of return, **discount rate**, cost of capital, required return. The names differ because people stand in different places — a saver calls it "interest," a borrower calls it "cost," someone valuing an asset calls it the "discount rate" — **but it is one thing: the price of a year of time.**

Why call it a *price*? Because, like any price, it comes from supply meeting demand:

- **Supply** comes from people willing to postpone spending (savers). The higher the rate, the more of them are willing to lend.
- **Demand** comes from people who want to spend before they have the money (households buying homes, firms building factories, governments running deficits). The higher the rate, the fewer can afford to borrow.

Where the two meet is the market price of time. In 1930 the American economist Irving Fisher made this the classic account in *The Theory of Interest*: the rate is set by two blades of a pair of scissors — people's **impatience** (how badly they want to spend now) and **investment opportunity** (how much today's money can grow if put to work). Decades earlier, the Austrian economist Eugen von Böhm-Bawerk (*Positive Theory of Capital*, 1889) had offered a similar trio of reasons: people undervalue future wants, present goods can be committed to longer and more productive processes, and people tend to expect to be better supplied in the future. **Whichever version you prefer, the conclusion is the same: positive interest is not something imposed by bankers; it is the natural result of human action and production unfolding through time.**

One piece of foreshadowing: the market has no single interest rate. It has a whole rate sheet — overnight, one-year, ten-year, thirty-year; for governments, companies and households. Its foundation is the **risk-free rate** (Stage 2.4), with layers of risk compensation stacked on top.

### ② Four reasons: impatience, opportunity cost, inflation, risk

Take "how much do I need to wait a year?" apart and you find four bricks:

<table class="pm"><tr><th>Reason</th><th>What it says</th><th>Illustrative compensation</th></tr><tr><td><b>Impatience (pure time preference)</b></td><td>The same enjoyment is better now than later</td><td>about 2%</td></tr><tr><td><b>Opportunity cost</b></td><td>Money today can be put to productive use</td><td>shows up in the real return; together with impatience it sets the real rate</td></tr><tr><td><b>Inflation</b></td><td>Next year's dollars buy less</td><td>about 3%</td></tr><tr><td><b>Risk</b></td><td>The promise might not be kept</td><td>about 1% (a 1% chance of default)</td></tr></table>

Strictly speaking, these layers multiply rather than add. Suppose your pure time preference is 2%, expected inflation is 3%, and the borrower has a 1% chance of stiffing you:

$$
1 + r = \\frac{(1 + 2\\%) \\times (1 + 3\\%)}{1 - 1\\%}
r \\approx 6.12\\%
$$

Adding gives 6%; multiplying gives 6.12%. When rates are low the difference is tiny, so "add up the pieces" is a fine rule of thumb. When rates are high — say, in a country with 40% inflation — you must multiply. Stage 2.5 covers the **Fisher equation** that strips inflation out properly, and Stage 2.4 splits the risk layer further into credit, term, equity and liquidity premia.

**These four layers explain why market rates are so different from each other:**

- Short-term government bills carry almost no default risk, so they pay the least.
- Large-company bonds pay a bit more for a bit more risk.
- Unsecured consumer loans and credit cards carry the thickest risk layer, so they cost the most.

A useful sanity check follows directly: **if an investment's "return" looks absurdly high, it is compensating you for a risk you have not spotted yet.** That principle will come back again and again in Stage 13.5, where we ask where DeFi yields really come from.

### ③ Future value and present value: two directions on the timeline

Once you have a time exchange rate, you can move money back and forth along the timeline:

- **Forward (future value):** what is today's money worth in the future?
- **Backward (present value):** what is future money worth today?

$$
\\text{Future value } \\mathrm{FV} = \\mathrm{PV} \\times (1 + r)^{n}
\\text{Present value } \\mathrm{PV} = \\frac{\\mathrm{FV}}{(1 + r)^{n}}
$$

Here \\(n\\) is the number of years. At 5%:

- $100 today becomes $105 after one year, $110.25 after two, and **$162.89** after ten (each year multiplies the previous balance by \\(1.05\\) — which is exactly the compounding of Stage 2.2).
- Going the other way, $1,000 received ten years from now is worth only **$613.91** today at 5%. $1,000 thirty years out is worth just **$231.38** today.

<figure><svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The same money, two directions on the timeline (rate 5%)</text><line x1="50" y1="130" x2="600" y2="130" stroke="var(--line)" stroke-width="2"/><g font-size="11" fill="var(--muted)" text-anchor="middle"><text x="60" y="150">Today</text><text x="115" y="150">1</text><text x="170" y="150">2</text><text x="280" y="150">4</text><text x="390" y="150">6</text><text x="500" y="150">8</text><text x="580" y="150">10 yrs</text></g><g fill="var(--orange)"><circle cx="60" cy="130" r="5"/><circle cx="115" cy="130" r="4"/><circle cx="170" cy="130" r="4"/><circle cx="280" cy="130" r="4"/><circle cx="390" cy="130" r="4"/><circle cx="500" cy="130" r="4"/><circle cx="580" cy="130" r="5"/></g><rect x="62" y="98" width="30" height="24" rx="3" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="77" y="92" text-anchor="middle" font-size="11" fill="var(--ink)">100</text><rect x="100" y="96" width="30" height="26" rx="3" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="115" y="90" text-anchor="middle" font-size="10" fill="var(--muted)">105</text><rect x="155" y="94" width="30" height="28" rx="3" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="170" y="88" text-anchor="middle" font-size="10" fill="var(--muted)">110.25</text><rect x="265" y="88" width="30" height="34" rx="3" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="280" y="82" text-anchor="middle" font-size="10" fill="var(--muted)">121.55</text><rect x="375" y="81" width="30" height="41" rx="3" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="390" y="75" text-anchor="middle" font-size="10" fill="var(--muted)">134.01</text><rect x="485" y="72" width="30" height="50" rx="3" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="500" y="66" text-anchor="middle" font-size="10" fill="var(--muted)">147.75</text><rect x="565" y="62" width="30" height="60" rx="3" fill="var(--orange)"/><text x="580" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">162.89</text><path d="M 95 44 Q 330 20 560 44" fill="none" stroke="var(--orange)" stroke-width="2" marker-end="url(#tvA)"/><text x="330" y="44" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="600">Compounding: move forward, × 1.05 per year</text><rect x="565" y="160" width="30" height="60" rx="3" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="580" y="236" text-anchor="middle" font-size="11" fill="var(--ink)">1,000</text><rect x="45" y="183" width="30" height="37" rx="3" fill="var(--blue)"/><text x="60" y="236" text-anchor="middle" font-size="11" font-weight="700" fill="var(--blue)">613.91</text><path d="M 555 195 Q 320 225 85 200" fill="none" stroke="var(--blue)" stroke-width="2" marker-end="url(#tvB)"/><text x="320" y="205" text-anchor="middle" font-size="11" fill="var(--blue)" font-weight="600">Discounting: move back, ÷ 1.05 per year</text><defs><marker id="tvA" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--orange)"/></marker><marker id="tvB" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--blue)"/></marker></defs></svg><figcaption>Top: $100 today rolled forward at 5% a year becomes $162.89 in ten years. Bottom: $1,000 due in ten years, discounted back at 5%, is worth $613.91 today. Both directions use the same time exchange rate.</figcaption></figure>

That picture hides the single most important sentence in this course: **money can only be added or compared once it has been converted to the same point in time.** "\\(\\$100\\ \\text{today} + \\$1{,}000\\ \\text{in ten years} = \\$1{,}100\\)" is wrong in exactly the way "\\(100\\ \\text{dollars} + 1{,}000\\ \\text{yen} = 1{,}100\\)" is wrong.

Here is a warm-up with the course's standard bond: a $1,000 face-value bond with a 5% coupon and 10 years to maturity (the star of Stage 4.1). The $1,000 principal repaid in year ten is worth $613.91 today at 5%. The remaining roughly $386 of value comes from the $50 coupons paid every year. **Discount every payment back to today, add them up, and you get exactly $1,000** — that is the present-value formula of Stage 2.3, and it is the entire secret behind Stage 4.2's "bond prices fall when rates rise."

### ④ Your personal discount rate: from marshmallows to credit cards

Everyone carries a discount rate around in their head, and it is often unstable.

**The marshmallow test.** In the late 1960s and early 1970s, Walter Mischel at Stanford offered children a choice: eat one marshmallow now, or wait roughly 15 minutes and get two. In effect he was asking, "What price do you put on 15 minutes?" The children who waited were accepting an enormous rate of return — doubling in a quarter of an hour. (Follow-ups linked waiting to later outcomes, but a larger 2018 replication found the link much weaker and largely explained by family background. It is not a destiny test.)

**Inconsistent over time.** Behavioral economist Richard Thaler documented a pattern in 1981 that runs roughly like this: many people prefer $100 today to $110 in a week — yet push both options a year out ("$100 in 52 weeks or $110 in 53 weeks?") and the same people happily wait the extra week. The same seven days feel expensive when they are right in front of you and cheap when they are far away. This is **hyperbolic discounting**: our impatience about the near term is far stronger than about the distant future.

See how extreme that near-term "price" really is. Demanding 10% for one week, compounded over a year, is:

$$
1.10^{52} \\approx 142\\times \\Rightarrow \\text{roughly } 14{,}000\\%\\ \\text{a year}
$$

Nobody would admit to requiring a 14,000% annual return. But in the grip of an impulse purchase, that is precisely how we behave.

**Credit cards and payday loans** are personal discount rates expressed in market prices. U.S. credit card rates have run at around 20% a year in recent years, and the U.S. Consumer Financial Protection Bureau gives a typical example of a two-week payday loan charging $15 per $100 borrowed — an annual percentage rate of almost 400%. **Someone willing to pay 20%, let alone 400%, to spend now is placing an extremely high value on the present** — or has no other option. That points to a plain truth: **a product that charges you a high interest rate is collecting an impatience tax.** Stage 2.2 will show how that tax balloons under compounding.

### ⑤ The market's "time exchange rate": from savers to Bitcoin and DATs

Personal discount rates are all over the place, but the market condenses them into a set of public quotes:

- **The very short end** is anchored by the central bank (the federal funds rate of Stage 1.3).
- **Treasury yields** are the "almost risk-free" price of time, one for every maturity, strung into a line (the yield curve of Stage 4.3).
- Mortgages, corporate bonds and consumer loans all sit on top of Treasuries plus a risk premium (Stage 2.4 and Stage 4.6).

When this whole set of time exchange rates shifts upward, something happens to everyone at once: **every future dollar is worth less today.** A rental property, a tech company that won't earn much for a decade, a Treasury bond that repays its principal in thirty years — all of their present values fall, and the further away the cash, the bigger the fall. That is why "30-year Treasury yield breaks above 5%" is front-page news (the first headline in Stage 0.1), and it is the subject of Stage 4.5.

**The new-era angle:**

- **Bitcoin pays no interest.** Holding one bitcoin means forgoing the interest you could have earned by putting the same money in Treasuries. That is its opportunity cost, which is why the level of interest rates directly affects how attractive it is to hold a non-yielding asset (developed with real rates in Stage 2.5).
- **In DeFi lending**, algorithms reset borrowing rates continuously according to how much of a pool is being used — a live, on-chain auction for the price of time (Stage 13.4 and Stage 13.5).
- **A DAT's preferred stock** is, at heart, a company selling the price of time to investors: investors hand over $100 today in exchange for a promised dividend of about $10 a year (Orange Corp's Orange-F pays 10%). What that promise is worth depends on how much the market demands for time plus risk — Stage 18.1 values it with exactly the logic of this lesson.

The one-sentence takeaway: **an interest rate is not a bank fee; it is the market price of a commodity called time.** Next, we watch that price accumulate at exponential speed.
`,

  demo: "time-value",

  analogy: `
Think of "money now" and "money next year" as **two different currencies**: this-year dollars and next-year dollars.

You walk up to a currency-exchange booth. The board says: **\\(1\\ \\text{this-year dollar} = 1.05\\ \\text{next-year dollars}\\).** That 1.05 is a 5% interest rate.

- When you **save**, you sell this-year dollars to the booth and receive more next-year dollars.
- When you **borrow**, you buy this-year dollars and pay with next-year dollars (the money you will owe later).
- When you **value an asset**, you take all the next-year, year-after and ten-years-out dollars it will pay you, convert each one back to this-year dollars at the posted rate, and add them up.

Different booths post different rates. The government's booth (Treasuries) offers the fairest rate because it is very unlikely to skip town. The shady booth on the corner (payday lending) posts an outrageous rate because it doubts you will come back to pay.

The crucial part: **the posted rate changes.** When the board moves from 1.05 to 1.06, every piece of "future currency" you hold — the bond maturing in ten years, the stock that pays dividends every year, the preferred that pays every month — converts back into fewer this-year dollars. The more distant the currency, the more it shrinks. What financial markets do every single day is watch that board and re-convert every piece of future money on the planet.
`,

  misconceptions: [
    "**\"Money has time value only because of inflation.\"** — Inflation is one of four reasons. Even with perfectly stable prices, people still prefer to consume now (impatience), today's money can still be invested (opportunity cost), and future promises can still fail (risk). That is why interest rates are normally positive even when inflation is zero.",
    "**\"Banks just set interest rates however they like.\"** — Banks quote rates as a markup or markdown on market prices. The central bank directly controls only the shortest policy rate (Stage 1.3); ten- and thirty-year rates come from the supply and demand of countless savers and borrowers, and not even the central bank can dictate them at will.",
    "**\"Cash sitting in a drawer costs nothing.\"** — It costs an opportunity cost. The same money in Treasuries would earn a few percent a year; by not earning it you are paying it. Add inflation and the drawer money shrinks in real terms every year.",
    "**\"Receive $100 today and $1,000 in ten years and you've received $1,100.\"** — Money at different dates cannot be added directly. At 5%, the $1,000 in ten years is worth $613.91 today, so the deal is worth about $714 in present value. Convert to one date first; then compare and add.",
    "**\"If someone pays a high rate to borrow, they must have done the math and decided it was worth it.\"** — Behavioral research shows near-term impatience gets wildly amplified (hyperbolic discounting): demanding 10% for one week works out to thousands of percent a year. High-rate consumer credit often profits from that impulse rather than from a considered trade-off across time.",
  ],

  quiz: [
    {
      q: "You feel that \"$100 today\" and \"$108 in one year\" are equally good. What is your personal annual discount rate?",
      options: ["0.8%", "8%", "18%", "108%"],
      answer: 1,
      explain: "**\\(100 \\times (1 + r) = 108 \\Rightarrow r = 8\\%\\).** You require 8% as compensation for waiting a year — that is the price you put on a year of time.",
    },
    {
      q: "At a 5% interest rate, what is $1,000 received ten years from now worth today?",
      options: ["$1,628.89", "$950", "$500", "$613.91"],
      answer: 3,
      explain: "**\\(\\text{Present value} = \\dfrac{1{,}000}{1.05^{10}} \\approx \\$613.91\\).** Moving money backward means dividing by the time exchange rate each year. $1,628.89 is the future value of $1,000 today rolled forward ten years — the wrong direction.",
    },
    {
      q: "Which of these is NOT a reason money today is worth more than money in the future?",
      options: [
        "People prefer to consume now",
        "Money today can be invested to earn a return",
        "The face value printed on a banknote shrinks over time",
        "Future promises may not be kept",
      ],
      answer: 2,
      explain: "The four reasons are **impatience, opportunity cost, inflation and risk.** The number printed on the note never changes; what changes is what it can buy and what it could have earned.",
    },
    {
      q: "When market interest rates rise across the board, which asset's present value takes the biggest hit?",
      options: [
        "A Treasury bill maturing tomorrow",
        "A certificate of deposit maturing in one year",
        "A customer invoice payable in three months",
        "A long-term Treasury bond that repays principal in 30 years",
      ],
      answer: 3,
      explain: "**The further away a cash flow, the more times it gets divided when discounted**, so a change in rates moves its present value the most. That is the core intuition behind duration (Stage 4.4) and the 30-year bond (Stage 4.5).",
    },
    {
      q: "Why does holding bitcoin carry an \"opportunity cost\"?",
      options: [
        "Because the same money in Treasuries would earn interest, while bitcoin itself pays none",
        "Because bitcoins automatically disappear each year",
        "Because holders must pay interest to the government",
        "Because bitcoin's price can only go down",
      ],
      answer: 0,
      explain: "Bitcoin is a **non-yielding asset.** Holding it means giving up the risk-free rate — and the higher that rate, the bigger the opportunity cost. Stage 2.5 takes this further with real interest rates.",
    },
  ],

  further: [
    { label: "Irving Fisher, The Theory of Interest (1930), full text at Econlib — impatience and investment opportunity set the rate", url: "https://www.econlib.org/library/YPDBooks/Fisher/fshToI.html" },
    { label: "Böhm-Bawerk, The Positive Theory of Capital — the three grounds of interest (Econlib)", url: "https://www.econlib.org/library/BohmBawerk/bbPTC.html" },
    { label: "U.S. Consumer Financial Protection Bureau: the costs, fees and APR of a payday loan", url: "https://www.consumerfinance.gov/ask-cfpb/what-are-the-costs-and-fees-for-a-payday-loan-en-1589/" },
    { label: "Investor.gov (U.S. SEC): compound interest and future value calculator", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
    { label: "Austrian Path (sister course): time preference and the theory of interest", url: "https://evidex-cloud.github.io/droplet-labs-austrian-path/" },
  ],
};
