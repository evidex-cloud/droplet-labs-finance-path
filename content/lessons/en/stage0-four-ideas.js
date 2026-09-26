export default {
  id: "four-ideas",
  stage: 0,
  order: 2,
  title: "The Four Ideas Behind Everything: The Price of Time, Balance Sheets, Liquidity & Trust, Risk & Leverage",
  difficulty: "intro",
  prereqs: ["what-finance-does"],

  oneLiner:
    "There are hundreds of financial headlines a day, but only four ideas you need to explain them: **① The price of time** — any asset is worth its future cash flows discounted at an interest rate; **② Balance sheets & claims** — every financial instrument is a claim written on someone's books, and the payout order decides who gets paid first; **③ Liquidity & trust (the plumbing)** — finance runs on settlement, custody, collateral and trust, and a crisis is a run when trust snaps; **④ Risk & leverage** — risk has a price, leverage cuts both ways, and markets feed on themselves. This lesson lays the four ideas out as a map; every later lesson in the course is a bead on it.",

  intuition: `
In the last lesson (Stage 0.1) we said finance does only three things: it moves value across **time**, **space** and **risk**. This lesson digs one level deeper: **what rules hold every time value gets moved?**

There are four. The course runs to twenty-odd stages and over a hundred lessons, but only these four ideas keep coming back from start to finish. They're the course's through-line, and every lesson names, up front, which of them it mainly rests on.

**Idea ① The price of time.** Money has time value: $100 today is worth more than $100 a year from now. So the value of any asset equals the money it will bring in the future, “marked down” to today at some interest rate. That rate is anchored to the yield on government bonds, which are treated as risk-free. **When rates move, every asset gets repriced** — bonds, stocks, houses, bitcoin, preferred stock. Nothing escapes.

**Idea ② Balance sheets & claims.** Every financial instrument is a **claim** written on somebody's balance sheet. Your deposit is the bank's liability. Your Treasury bond is the government's liability. Even the dollar bills in your wallet are liabilities of the Federal Reserve. Who gets paid first and who gets paid last is set by **seniority — the capital stack**. A listed company built to hold bitcoin is, at bottom, a carefully engineered balance sheet.

**Idea ③ Liquidity & trust (the plumbing).** Finance runs on plumbing: settlement, custody, collateral, credit and trust. Normally it's invisible. When trust snaps, everyone demands their money back at once — that's a **run**, and that's a crisis. Blockchains, stablecoins and tokenization are all, at heart, attempts to **rebuild the plumbing**.

**Idea ④ Risk & leverage.** Risk has a price: carry someone else's risk and you should get paid. Leverage magnifies in both directions: you win bigger and lose faster. **Volatility itself can be bought and sold** — that's what options trade. And markets **reinforce themselves**: rising prices make people more willing to borrow and buy, which pushes prices higher — until the loop runs in reverse.

Each idea stands on its own, but the real power comes from **how they connect**. Take a real case: Silicon Valley Bank in March 2023.

- When rates were low it bought a mountain of long-term bonds (Idea ①: when rates rise, those bonds lose value).
- The losses sat on its balance sheet, while its liabilities were deposits customers could withdraw at any moment (Idea ②).
- Depositors warned each other on social media and asked to pull roughly $42 billion in a single day. Trust broke (Idea ③).
- And like every bank it ran on high leverage — shareholders' equity was a thin slice of its assets, so a modest loss could wipe it out (Idea ④).

**On March 10, 2023, regulators closed Silicon Valley Bank.** One event; all four ideas on stage. Stage 10.3 replays the case in full.

Now look at Lin's three headlines and you'll see that each lights up different ideas. The 30-year Treasury yield breaking above 5% is mainly Idea ①. Tokenized funds and stablecoins rewiring the plumbing is mainly Idea ③ (and, since a stablecoin is its issuer's liability, Idea ② too). Strategy issuing a bitcoin-backed preferred yielding about 10% is a textbook case of Ideas ② and ④ — an engineered balance sheet slicing bitcoin's risk into layers — and yet its pricing can't escape Idea ①, because that 10% has to compete with Treasuries paying more than 5%.

So for any financial headline, you can start with one question: **“Which of the four ideas does this touch?”** This lesson's demo is a pair of “four-idea glasses”: pick a headline, see which ideas light up, then run a real calculation to see how brightly.

**This lesson breaks into five parts:**

- **① Idea ①, the price of time: every valuation is a discount**
- **② Idea ②, balance sheets & claims: every dollar is somebody's liability**
- **③ Idea ③, liquidity & trust: plumbing, runs and rebuilding**
- **④ Idea ④, risk & leverage: risk has a price, leverage cuts both ways, markets are reflexive**
- **⑤ One map: how the four ideas string the course's six tiers together**
`,

  mechanics: `
### ① Idea ①, the price of time: every valuation is a discount

**The core sentence: the value of any asset equals the sum of its future cash flows, discounted at some interest rate.**

Why discount? Because money today can be invested, spent immediately, and isn't exposed to inflation or to someone failing to pay. So a dollar in the future is worth less than a dollar now, and how much less depends on the interest rate. Stage 2.1 explains the reasons; Stage 2.3 gives the formula:

$$
\\text{Present value} = \\frac{\\mathrm{CF}_{1}}{1+r} + \\frac{\\mathrm{CF}_{2}}{(1+r)^{2}} + \\cdots + \\frac{\\mathrm{CF}_{n}}{(1+r)^{n}}
$$

Feel it with the course's standard example. A bond with a **$1,000 face value, a 5% coupon and 10 years to maturity** pays $50 a year and returns $1,000 at the end:

- With market rates at 5%, it's worth $1,000.
- If market rates rise to 6%, it's worth only about **$925.60** (down about 7.4%).
- If market rates fall to 4%, it's worth about **$1,081.80** (up about 8.2%).

**Rates and prices sit on a seesaw** (Stage 4.2). The longer the maturity, the longer the seesaw and the bigger the swing at the far end. A 30-year Treasury with a 5% coupon falls from 100 to about **86.2** when its yield goes from 5% to 6% — a drop of roughly 14%. Its “modified duration” is about 15.5, meaning each percentage-point move in yield shifts the price about 15.5% the other way (Stage 4.4).

Things that are **perpetual** are more extreme still — a preferred stock with no maturity date, say. If it pays $10 a year and investors want a 10% return, it's worth $100 (\\(\\dfrac{\\$10}{10\\%} = \\$100\\)). If the required return rises to 12%, it's worth only about **$83.30**. **Same dividend; the price drops about 17% purely because the price of time changed.**

That's why Lin's first headline matters so much. The 30-year Treasury yield is the world's anchor for the long-term price of time. In late September 2026 it was about 5.5%, the highest since 2004. When it moves, stock valuation multiples (Stage 5.3), mortgage rates, assets like bitcoin that have no cash flows and are priced on future expectations, and those roughly-10% preferreds (Stage 18.1) all have to be recalculated.

**The new-era angle:** bitcoin has no cash flows, so you can't discount it directly — yet rates still bite, because higher rates raise the opportunity cost of holding an asset that pays nothing. Stablecoin issuers sit on the other side: they park users' money in short-term Treasuries and **earn the price of time** themselves.

### ② Idea ②, balance sheets & claims: every dollar is somebody's liability

**The core sentence: every financial instrument is a claim written on somebody's balance sheet, and seniority decides who gets paid first.**

A balance sheet is a two-column table. On the left, **assets** (what you own). On the right, **liabilities and equity** (whose money paid for those assets). The two sides always match:

$$
\\text{Assets} = \\text{Liabilities} + \\text{Shareholders' equity}
$$

The key insight: **your asset is somebody else's liability.** Your deposit is the bank's liability; your Treasury is the US Treasury's liability; the dollar bills in your wallet are the Fed's liability; your USDC is a liability of its issuer, Circle. Very few things are nobody's liability — gold, and bitcoin. That's why bitcoin is called an asset “with no counterparty” (Stage 1.1, Stage 12.1).

Claims come in **order**. If a company is wound up, the money is paid out in sequence: secured creditors first, then unsecured creditors, then subordinated debt, then preferred stock, and last of all common stock, which gets whatever is left (Stage 6.1).

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Orange Corp (the course's standard toy company): who gets paid first?</text><rect x="40" y="44" width="220" height="190" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="150" y="70" text-anchor="middle" font-size="12" font-weight="700" fill="var(--btc)">Assets</text><text x="150" y="120" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">10,000 BTC</text><text x="150" y="140" text-anchor="middle" font-size="11" fill="var(--muted)">× $100,000</text><text x="150" y="162" text-anchor="middle" font-size="12" fill="var(--btc)">= $1.0B BTC NAV</text><text x="150" y="200" text-anchor="middle" font-size="11" fill="var(--muted)">plus $30M of cash</text><rect x="300" y="44" width="300" height="34" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="312" y="66" font-size="11" fill="var(--ink)">① Convertible notes $150M (paid first)</text><text x="590" y="66" text-anchor="end" font-size="11" fill="var(--blue)">6.7x cover</text><rect x="300" y="82" width="300" height="34" rx="6" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="312" y="104" font-size="11" fill="var(--ink)">② Senior preferred Orange-F $100M</text><text x="590" y="104" text-anchor="end" font-size="11" fill="var(--orange-ink)">4.0x cumulative</text><rect x="300" y="120" width="300" height="34" rx="6" fill="var(--orange-soft)" stroke="var(--orange-line)" opacity=".7"/><text x="312" y="142" font-size="11" fill="var(--ink)">③ Junior preferred Orange-D $50M</text><text x="590" y="142" text-anchor="end" font-size="11" fill="var(--orange-ink)">3.3x cumulative</text><rect x="300" y="158" width="300" height="76" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="312" y="184" font-size="11" fill="var(--ink)">④ Common stock (100M shares): everything left</text><text x="312" y="204" font-size="10" fill="var(--muted)">Takes all the upside; absorbs losses first</text><text x="312" y="222" font-size="10" fill="var(--muted)">Amplification about 1.43x (Idea ④)</text><path d="M262 140 L296 140" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 3"/><text x="320" y="258" text-anchor="middle" font-size="11" fill="var(--muted)">Coverage = BTC NAV ÷ (all claims at this layer and above). A 54% BTC drop takes the D layer from 3.3x to about 1.5x</text></svg><figcaption>One pile of bitcoin, cut into four claims that stand in line. This is Orange Corp, used throughout Stages 15–18; here we glimpse its skeleton.</figcaption></figure>

The picture shows the course's standard toy company, Orange Corp (formally introduced in Stage 15.1). It holds 10,000 bitcoin; at $100,000 each that's $1 billion. It has issued $150 million of convertible notes, $100 million of senior preferred and $50 million of junior preferred. **Divide the BTC NAV by all the claims at a given layer and above**, and you get that layer's asset coverage: about 6.7x at the convertible layer, 4.0x through the senior preferred, about 3.3x through the junior preferred. If bitcoin fell about 54% from its peak — as it did between October 2025 and June 2026 — the BTC NAV would shrink to about $460 million, and the junior preferred's coverage would drop from 3.3x to about 1.5x (Stage 16.5 calls this the “BTC Rating”).

**That's the power of Idea ②: draw the balance sheet and you know whose head the risk lands on.**

### ③ Idea ③, liquidity & trust: plumbing, runs and rebuilding

**The core sentence: finance runs on plumbing — settlement, custody, collateral, credit and trust — and a crisis is a run when trust breaks.**

“Liquidity” means two different things:

- **Market liquidity:** can you sell something quickly without a big discount? Treasuries, yes. An office building or a private loan, not so much.
- **Funding liquidity:** can you borrow when you need to — and will people keep lending to you?

Both depend on **trust**. A bank dares to fund 30-year mortgages with deposits that can leave any day because it trusts that depositors won't all show up at once. When that trust wobbles you get a **run**: everyone knows that the first to leave get paid in full and the last may not, so everyone leaves together — even from a bank that was fundamentally sound. That's the logic Diamond and Dybvig formalized in 1983 (Stage 10.1).

A few runs you'll meet again and again in the course:

- September 2008: Lehman Brothers fails, a money-market fund “breaks the buck,” short-term funding markets freeze (Stage 10.2).
- March 2023: Silicon Valley Bank faces about $42 billion of withdrawal requests in one day and is closed the next (Stage 10.3).
- March 2023: the stablecoin USDC briefly slides to about $0.87 because part of its reserves are stuck at SVB (Stage 13.2).
- May and November 2022: Terra/Luna and FTX, the on-chain and exchange versions of a run (Stage 10.5).

**The new-era angle:** blockchains, stablecoins and tokenized Treasuries are all about **rebuilding the plumbing** — turning settlement from “T+1, through several intermediaries” into “minutes, atomic, 24/7.” But new pipes don't abolish runs. A stablecoin is still its issuer's liability (Idea ②), and whether it redeems one-for-one still depends on reserves and trust. As of September 2026, stablecoins totalled about $310 billion, and the US GENIUS Act requires their reserves to be mostly cash and short-dated Treasury bills — welding the new plumbing to the Treasury market of Idea ① (Stage 14.5).

### ④ Idea ④, risk & leverage: risk has a price, leverage cuts both ways, markets are reflexive

**The core sentence: risk has a price; leverage magnifies both ways; volatility itself can be bought and sold; markets reinforce themselves (reflexivity).**

Four small propositions, each with a number:

- **Risk has a price.** Lend for 10 years to the US government and you get about 5%; lend to a lower-rated company and you might need 8% or 9%. The difference is the **risk premium** (Stage 2.4, Stage 4.6). Stocks have out-earned bonds over the long run for the same reason: they're riskier.
- **Leverage cuts both ways.** Put in $100,000 of your own and borrow $900,000 to buy a $1 million asset: that's 10x leverage. A 10% rise doubles your money; a 10% fall wipes it out. Orange Corp's common stock is levered too. Its bitcoin exposure is $1 billion, but the part that belongs to common shareholders is $1 billion minus $300 million of senior claims — $700 million — so its amplification is about **\\(\\dfrac{10}{7} \\approx 1.43\\times\\)** (Stage 16.4).
- **Volatility can be bought and sold.** An option's price depends heavily on how much the underlying swings. The more a company's stock swings, the more valuable the option embedded in its convertible bonds — and the lower the interest rate it can borrow at. That's the key to understanding how Strategy could issue zero-coupon converts (Stage 7.3).
- **Markets reinforce themselves.** George Soros called this **reflexivity** in The Alchemy of Finance (1987): rising prices → easier funding → more buying → higher prices, and the same in reverse. A digital asset treasury company's “flywheel” is a reflexive loop: when the stock trades above the value of its bitcoin, issuing shares to buy more bitcoin raises bitcoin per share; when the stock falls below that value, the flywheel stalls or even spins backward (Stage 10.4, Stage 16.7).

As of September 2026, bitcoin was around $84,000 — about a third below its October 2025 all-time high near $126,000 — and had dipped below $60,000 earlier in the year. **That's Idea ④ in real life: the same asset can tell you two opposite stories within a single year.**

### ⑤ One map: how the four ideas string the course's six tiers together

The four ideas aren't four drawers; they're a web. A typical chain of transmission looks like this:

**Rates rise (①) → asset prices fall, balance sheets shrink (②) → if liabilities are short-term, trust wobbles and a run starts (③) → the higher the leverage, the sooner it breaks (④)**

Almost every crisis walks that chain. And each of the course's six tiers pushes a different set of ideas to center stage:

<table>
<tr><th>Tier</th><th>Stages</th><th>Main ideas</th><th>Tools you'll pick up</th></tr>
<tr><td>Beginner: Money & the Economy</td><td>0–3</td><td>① ②</td><td>Money as a liability, compounding and discounting, reading economic data</td></tr>
<tr><td>Principles: The TradFi Toolkit</td><td>4–8</td><td>① ② ④ ③</td><td>Bonds and duration, stock valuation, the capital stack and preferreds, derivatives, market plumbing</td></tr>
<tr><td>Systems: Macro, Crises & Risk</td><td>9–11</td><td>③ ④ ①</td><td>The Fed's toolkit, fiscal dominance, crisis anatomy, portfolios and risk control</td></tr>
<tr><td>New Finance: Bitcoin, DeFi & Tokenization</td><td>12–14</td><td>③ ②</td><td>Bitcoin supply and valuation, stablecoins, AMMs, tokenized Treasuries</td></tr>
<tr><td>The Focus: Digital Asset Treasury Companies</td><td>15–18</td><td>② ④ ①</td><td>BTC per share, mNAV, BTC Rating, pricing preferreds, stress tests</td></tr>
<tr><td>Mastery: The AI Era & the Whole Picture</td><td>19–20</td><td>① ② ③ ④</td><td>AI and interest rates, the full causal chain, five questions for reading the news</td></tr>
</table>

Back to Lin. The three headlines mainly light up:

- **The 30-year Treasury yield breaks above 5%** → Idea ① (plus ②: the government's balance sheet and deficits; and ④: the price risk of long bonds).
- **Tokenized funds, stablecoins and DeFi rewire the plumbing** → Idea ③ (plus ②: a stablecoin is its issuer's liability).
- **Strategy issues a bitcoin-backed preferred yielding about 10%** → Ideas ② and ④ (plus ①: that 10% has to be measured against Treasuries).

By Stage 20.1 you'll see that the three headlines are three links in one chain: **deficits → term premium → a rising 30-year yield → the debasement debate and demand for hard assets → bitcoin → digital asset treasury companies raising money by selling yield (preferreds) priced against Treasuries → judging them with BTC Rating and seniority → tokenization and DeFi as the plumbing that may one day carry these instruments.** Stage 20.3 then turns the four ideas into one of five standing questions you ask of every headline.
`,

  demo: "four-ideas",

  analogy: `
Think of the four ideas as the **four systems of a building**.

**Idea ① is the water table under the foundation.** When the groundwater (interest rates) rises, it pushes on the whole building and every floor has to be re-leveled; when it falls, the building settles back. You never see the groundwater from inside, but every wall feels it. The 30-year Treasury yield is the deepest monitoring well in town.

**Idea ② is the deed and the lien register.** Who owns this building? Does a bank hold a mortgage on it? If it's auctioned, who gets paid first and how much? It's all written in a register. What you think you “own” is often just a line in that book — and it may be standing behind someone else's line.

**Idea ③ is the plumbing and wiring.** Normally you turn the tap and water comes out without a thought. But when the main valve fails, the whole building loses water at once and every tenant rushes downstairs to the management office — that's a run. Someone is installing a new smart-plumbing system (blockchains, stablecoins) that's faster and more transparent, but the work is still in progress.

**Idea ④ is the load-bearing structure and the extra floors.** Someone adds two stories on top of their unit (leverage). The building looks grander and holds more people — until an earthquake hits (an asset crash) and the added floors are the first to come down. Subtler still: the neighbors see the owner profit from the extra floors and add their own, and the whole street keeps building higher until one day everyone notices the foundation can't take it (reflexivity).

A good building inspector checks these four systems first thing. Reading a financial headline works the same way: **Did the water table move? Did the register change? Are the pipes flowing? Who's adding floors, and how many?**
`,

  misconceptions: [
    "**“Interest rates only affect bonds, not stocks or bitcoin.”** — The interest rate is the discount rate for every asset. When rates rise, stock multiples compress, the opportunity cost of holding a no-cash-flow asset like bitcoin goes up, and perpetual preferreds fall in price. Only the sensitivity differs (Stage 4.4, Stage 5.3).",
    "**“Money is just money; it isn't anybody's liability.”** — Nearly all modern money is someone's liability: notes are the central bank's, deposits are the bank's, stablecoins are the issuer's. Because it's a liability, its safety depends on the issuer's balance sheet. Bitcoin and gold are rare exceptions (Stage 1.1).",
    "**“Liquidity means having lots of money.”** — Liquidity is the ability to sell at a fair price or borrow when you need to, and it rests on trust. A bank whose assets exceed its liabilities can still fall to a run; Silicon Valley Bank faced about $42 billion of withdrawal requests in one day (Stage 10.3).",
    "**“Leverage is bad; avoid it and you're safe.”** — Leverage is neutral in itself: a mortgage is leverage, and it lets ordinary families live in a home years earlier. What matters is how much, for how long, whether margin calls can force a sale, and how volatile the asset is. The same 1.43x amplification means very different things on a stable asset and on bitcoin (Stage 16.4).",
    "**“The four ideas are four separate subjects.”** — They form a web. The SVB case alone uses all four: rising rates (①) shrank its bonds (②), depositors ran (③), and high leverage let the losses eat its capital fast (④). Most headlines only make sense when two or three ideas light up together.",
  ],

  quiz: [
    {
      q: "A $1,000 bond with a 5% coupon and 10 years to maturity: market rates rise from 5% to 6%. Roughly what is it worth now?",
      options: ["About $1,081.80", "Still $1,000, because the face value hasn't changed", "About $500", "About $925.60"],
      answer: 3,
      explain: "Higher rates discount the fixed $50 coupons and the $1,000 principal more heavily, so the price falls to **about $925.60**. That's Idea ①'s seesaw (Stage 4.2). $1,081.80 is the price if rates fall to 4%.",
    },
    {
      q: "Orange Corp holds $1 billion of bitcoin, with $300 million of claims (convertible notes plus two layers of preferred) ranking ahead of the common. After bitcoin falls about 54%, what is the junior preferred layer's asset coverage, roughly?",
      options: ["About 1.5x", "Still 3.3x", "About 0.5x", "About 6.7x"],
      answer: 0,
      explain: "BTC NAV shrinks to about $460 million; divided by $300 million of cumulative claims, that's **\\(\\dfrac{460}{300} \\approx 1.5\\times\\)**. Ideas ② and ④ working together: the balance sheet tells you whose head the risk lands on, the price swing tells you how big it is (Stage 16.5).",
    },
    {
      q: "Which set of ideas does Silicon Valley Bank's March 2023 failure illustrate best?",
      options: [
        "Only Idea ③: pure rumor-driven panic",
        "Only Idea ①: rising rates",
        "All four at once: rising rates, shrinking assets, a run, and high leverage",
        "None of them — it was just bad management",
      ],
      answer: 2,
      explain: "Rising rates cut the value of its long bonds (①); the losses sat on a balance sheet funded by on-demand deposits (②); depositors asked for about $42 billion in a day (③); and a thinly capitalized, highly levered bank had little cushion (④). **The four ideas are a web** (Stage 10.3).",
    },
    {
      q: "Which statement about “reflexivity” is most accurate?",
      options: [
        "Prices always return to intrinsic value; markets don't reinforce themselves",
        "Price changes alter the fundamentals (such as the ability to raise money), and the changed fundamentals push prices further, creating a self-reinforcing loop",
        "Reflexivity exists only in crypto markets",
        "Reflexivity means interest rates and bond prices move in opposite directions",
      ],
      answer: 1,
      explain: "Soros's 1987 idea: **prices don't just reflect fundamentals, they change them**. A treasury company's flywheel is an example — above the value of its bitcoin, issuing stock to buy bitcoin raises bitcoin per share; below it, the flywheel reverses (Stage 10.4, Stage 16.7).",
    },
    {
      q: "Why does it make sense to say stablecoins weld the new plumbing to the Treasury market?",
      options: [
        "Because the Fed sets stablecoin prices every day",
        "Because stablecoins can be issued instead of Treasuries",
        "Because stablecoin issuers must hold bitcoin as reserves",
        "Because compliant stablecoins hold reserves mostly in cash and short-dated Treasury bills, making issuers big T-bill buyers who earn the price of time",
      ],
      answer: 3,
      explain: "The GENIUS Act requires one-for-one reserves in cash, short T-bills and similar assets. **A stablecoin is its issuer's liability (②), travels on new plumbing (③), and earns short-term Treasury interest (①)** — one instrument, three ideas (Stage 13.2, Stage 14.5).",
    },
  ],

  further: [
    { label: "St. Louis Fed FRED: 30-year Treasury yield history (DGS30) — watch the price of time", url: "https://fred.stlouisfed.org/series/DGS30" },
    { label: "Bank of England Quarterly Bulletin (2014): Money creation in the modern economy — the balance-sheet view of money", url: "https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy" },
    { label: "The Nobel Prize: popular explanation of the 2022 economics prize (Bernanke, Diamond and Dybvig on banks and runs)", url: "https://www.nobelprize.org/prizes/economic-sciences/2022/popular-information/" },
    { label: "Federal Reserve, Review of the Federal Reserve's Supervision and Regulation of Silicon Valley Bank (2023)", url: "https://www.federalreserve.gov/publications/files/svb-review-20230428.pdf" },
  ],
};
