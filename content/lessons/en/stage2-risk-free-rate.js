export default {
  id: "risk-free-rate",
  stage: 2,
  order: 4,
  title: "Risk, Return & the Risk-Free Rate: Why Every Asset Is Priced Against Treasuries",
  difficulty: "intro",
  prereqs: ["present-value"],

  oneLiner:
    "Stage 2.3 said any asset is worth its future cash flows discounted at \"some rate.\" This lesson says where that rate comes from: **required return = risk-free rate + risk premia.** The risk-free rate is the Treasury yield, the floor under every asset price on earth; each extra risk you take on (term, credit, equity, illiquidity) adds another brick on top. So **when Treasury yields move, every asset's discount rate moves with them.** But \"risk-free\" only means \"won't default\" — it still hides inflation risk and price risk.",

  intuition: `
Imagine you have $10,000 and a row of choices in front of you:

- a 3-month U.S. Treasury bill;
- a 10-year U.S. Treasury note;
- a bond issued by a large, established company;
- a high-yield bond from a small, shaky company;
- a stock index fund;
- a stake in a friend's startup.

If they all offered an expected return of **4%**, which would you pick? Nearly everyone picks the first — why take more risk for the same return? So to get anyone to buy the others, they have to **promise a higher return**. The further down the list, the more risk, and the higher the promise.

That is the most basic law of financial markets: **risk has a price** (Idea ④). And the starting point of the row — the short-term government bill that almost cannot default — pays what we call the **risk-free rate**.

Put the two together and you get a method for choosing the discount rate for any asset:

> **Required return = risk-free rate + compensation for each risk you bear (risk premia)**

Suppose short-term Treasuries pay 4% (an illustrative number). A 10-year Treasury ties your money up longer, so it needs a little more — say 4.5%. A large-company bond adds a layer of credit risk — say 5.5%. Stocks swing hard, so investors want something like 9%. Your friend's startup could go to zero and can't easily be sold, so you'd probably want 20% or more before investing.

Notice that **every one of those numbers is built on top of the risk-free rate.** Raise the risk-free rate from 4% to 5% and the whole row shifts up. And as Stage 2.3 showed, when the discount rate rises, value falls — so a change in Treasury yields forces a revaluation of **stocks, corporate bonds, houses, preferreds, even bitcoin.** That is what the title means by "every asset is priced against Treasuries," and it's why "30-year Treasury yield breaks above 5%" — the first headline in Stage 0.1 — makes the front page (Stage 4.5 explains it in full).

"Risk-free" is a misleading name, though. Treasuries are merely **free of default risk**: the government can tax, and in a pinch the central bank can create the dollars. That does nothing to stop inflation from eating your purchasing power (Stage 2.5), or to stop long-dated Treasuries from falling hard when rates rise — the exact trap that sank Silicon Valley Bank in 2023 (Stage 10.3).

This lesson sits on both **Idea ① — the price of time** and **Idea ④ — risk and leverage**: the risk-free rate is the pure price of time, risk premia are the price of risk, and the two added together are the full price the market charges an asset.

**In this lesson we break it into five pieces:**

- **① What "risk-free" means: why Treasuries are the floor**
- **② Building the required return: term, credit, equity and liquidity premia**
- **③ Why Treasuries anchor global pricing**
- **④ The risks hiding inside "risk-free"**
- **⑤ The anchor in the new era: stablecoins, tokenized Treasuries, bitcoin and DAT preferreds**
`,

  mechanics: `
### ① What "risk-free" means: why Treasuries are the floor

The **risk-free rate** is the return on an investment whose principal and interest are almost certain to be paid in full, in nominal terms, over a given horizon. In the dollar world, that role belongs to **U.S. Treasury securities**, and the purest version is the 3-month Treasury bill:

- **Near-zero default risk.** The U.S. government borrows in dollars, has the power to tax, and the Federal Reserve issues the currency. In nominal dollars, it is all but impossible for it to be "unable to pay."
- **Very short maturity.** It matures in three months, so changes in rates barely move its price.
- **Superb liquidity.** The Treasury market is the deepest, most active bond market in the world; you can buy or sell at close to the market price almost any time.

For long-horizon valuations, practitioners use a **maturity-matched** Treasury yield as the risk-free rate: the 10-year yield to price a 10-year cash flow, the 30-year yield for a 30-year one.

"All but impossible to default" is not the same as "perfect credit." S&P in 2011, Fitch in 2023 and Moody's in 2025 each cut the U.S. sovereign rating one notch below the top AAA grade, and every few years a congressional standoff over the "debt ceiling" briefly raises fears of a technical default. None of this knocked Treasuries off their role as the floor, but it's a reminder that **the risk-free rate is the "closest thing to risk-free," not a physical constant.** Stage 9.4 discusses how fiscal strain can slowly erode that floor.

For current levels, go to treasury.gov's daily yield curve. As of 2026, U.S. Treasury yields sit at a few percent — far above the near-zero rates of the 2010s, and that shift is the backdrop to every valuation change in the rest of this course.

### ② Building the required return: term, credit, equity and liquidity premia

$$
Required return = risk-free rate + term premium + credit premium + equity risk premium + liquidity premium + …
$$

Each layer pays you for a specific risk:

- **Term premium.** The longer your money is locked up, the greater the chance rates or inflation rise in the meantime. Long Treasuries usually pay a bit more than short ones — though not always (Stage 4.3 covers inverted curves).
- **Credit premium (credit spread).** The borrower might default. The lower the rating, the wider the spread (Stage 4.6).
- **Equity risk premium (ERP).** Shareholders stand behind every creditor and own only the residual claim (Stage 5.1), with no fixed payout and big swings. Common academic and practitioner estimates for the U.S. ERP fall between 4% and 6% (Stage 5.4).
- **Liquidity premium.** Assets that are hard to sell, or can only be sold at a steep discount (private equity, startups, obscure bonds), must pay investors extra.

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The required-return ladder: every asset stands on the risk-free floor (illustrative numbers)</text><g font-size="10"><rect x="60" y="32" width="12" height="10" fill="var(--blue)"/><text x="76" y="41" fill="var(--muted)">Risk-free rate</text><rect x="160" y="32" width="12" height="10" fill="var(--green)"/><text x="176" y="41" fill="var(--muted)">Term premium</text><rect x="255" y="32" width="12" height="10" fill="var(--orange)"/><text x="271" y="41" fill="var(--muted)">Credit premium</text><rect x="355" y="32" width="12" height="10" fill="var(--red)"/><text x="371" y="41" fill="var(--muted)">Equity risk premium</text><rect x="480" y="32" width="12" height="10" fill="var(--muted)"/><text x="496" y="41" fill="var(--muted)">Illiquidity / extra risk</text></g><line x1="50" y1="215" x2="620" y2="215" stroke="var(--line)" stroke-width="1.5"/><line x1="50" y1="183" x2="620" y2="183" stroke="var(--blue)" stroke-width="1" stroke-dasharray="4 3"/><text x="618" y="178" text-anchor="end" font-size="10" fill="var(--blue)">Floor: risk-free rate 4%</text><rect x="70" y="183" width="60" height="32" fill="var(--blue)"/><text x="100" y="176" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">4%</text><rect x="165" y="183" width="60" height="32" fill="var(--blue)"/><rect x="165" y="179" width="60" height="4" fill="var(--green)"/><text x="195" y="172" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">4.5%</text><rect x="260" y="183" width="60" height="32" fill="var(--blue)"/><rect x="260" y="179" width="60" height="4" fill="var(--green)"/><rect x="260" y="169.4" width="60" height="9.6" fill="var(--orange)"/><text x="290" y="162" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">5.7%</text><rect x="355" y="183" width="60" height="32" fill="var(--blue)"/><rect x="355" y="179" width="60" height="4" fill="var(--green)"/><rect x="355" y="151" width="60" height="28" fill="var(--orange)"/><text x="385" y="144" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">8%</text><rect x="450" y="183" width="60" height="32" fill="var(--blue)"/><rect x="450" y="143" width="60" height="40" fill="var(--red)"/><text x="480" y="136" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">9%</text><rect x="545" y="183" width="60" height="32" fill="var(--blue)"/><rect x="545" y="119" width="60" height="64" fill="var(--red)"/><rect x="545" y="55" width="60" height="64" fill="var(--muted)" opacity=".7"/><text x="575" y="50" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">20%</text><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="100" y="230">3-month T-bill</text><text x="195" y="230">10-year Treasury</text><text x="290" y="230">IG corporate</text><text x="385" y="230">High yield</text><text x="480" y="230">Stocks</text><text x="575" y="230">Startup</text></g><text x="320" y="256" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="600">Raise the floor one point and every column rises with it — every discount rate moves at once</text></svg><figcaption>Each asset's required return = the same risk-free floor + its own bricks of risk. The numbers are illustrative; actual levels move with markets.</figcaption></figure>

Turn the ladder into prices. Suppose each asset pays $10 a year forever (Stage 2.3's perpetuity), so value = 10 ÷ required return:

<table class="pm"><tr><th>Required return</th><th>4.5%</th><th>5.7%</th><th>8%</th><th>9%</th><th>20%</th></tr><tr><td>Value (10 ÷ r)</td><td>222.2</td><td>175.4</td><td>125.0</td><td>111.1</td><td>50.0</td></tr><tr><td>After risk-free +1%</td><td>181.8</td><td>149.3</td><td>111.1</td><td>100.0</td><td>47.6</td></tr><tr><td>Change</td><td>−18.2%</td><td>−14.9%</td><td>−11.1%</td><td>−10.0%</td><td>−4.8%</td></tr></table>

The same $10 is worth less today the riskier it is — that is the price of risk. The table also reveals a subtlety: **assets whose required return is already low are the most sensitive, in percentage terms, to a move in the risk-free rate.** In real life you also have to layer on Stage 2.3's growth effect: a high-growth stock has a small r − g, which makes it very rate-sensitive too.

Academics make the risk premium more precise. William Sharpe's 1964 **capital asset pricing model (CAPM)** says a stock's required return = risk-free rate + β × market risk premium, where β measures how much it moves with the market as a whole. Only **risk you can't diversify away** earns a premium — a point Stage 11.1 returns to when it covers diversification.

### ③ Why Treasuries anchor global pricing

Treasury yields are the anchor not just because they are risk-free, but because the world literally **quotes prices as "Treasuries plus a spread":**

- **Corporate bonds** are often quoted as "120 basis points over the matching Treasury" (one basis point = 0.01%). If Treasury yields rise while the spread holds, the company's borrowing cost rises in lockstep.
- **Mortgages:** the U.S. 30-year fixed mortgage rate broadly tracks the 10-year Treasury yield plus a spread.
- **Stocks:** analysts discount at the risk-free rate plus an equity risk premium (Stage 5.3); a common rough comparison sets the market's earnings yield (the inverse of the P/E) against the 10-year Treasury yield.
- **Foreign assets:** other countries' rates, exchange rates and emerging-market dollar bonds all feel the pull of U.S. yields (Stage 3.4).
- **Collateral:** Treasuries are the main collateral in the repo market (Stage 8.3), the core asset on bank and insurer balance sheets, and a large share of central banks' reserves.

One institutional detail: after June 2023, U.S. dollar LIBOR was retired, and floating-rate derivatives and loans moved to **SOFR**, an overnight rate built from Treasury repo transactions. **Even the foundation of "floating" rates now sits directly on Treasuries.**

So when Treasury yields move, the change travels down dozens of pipes into every asset class at once. Stage 4.5 follows those pipes one by one to trace the consequences of a rising 30-year yield.

### ④ The risks hiding inside "risk-free"

Treasuries carry essentially no default risk, but they still carry at least four other risks:

<table class="pm"><tr><th>Risk</th><th>What it means</th><th>Example</th></tr><tr><td><b>Inflation risk</b></td><td>You get every nominal dollar back, but it buys less</td><td>In the 1970s, Treasury holders lost money for years in real terms (Stage 2.5)</td></tr><tr><td><b>Interest-rate / price risk</b></td><td>Rates rise while you hold, and long bonds fall in price</td><td>A 30-year Treasury whose yield goes from 5% to 6% loses about 14% (modified duration ≈ 15.5)</td></tr><tr><td><b>Reinvestment risk</b></td><td>When bills mature, you must roll at whatever the new rate is</td><td>After 2008 rates fell to near zero, and savers living on T-bill interest saw their income vanish</td></tr><tr><td><b>Sovereign and fiscal risk</b></td><td>Downgrades, debt-ceiling standoffs, fears of fiscal dominance</td><td>All three major rating agencies downgraded the U.S. — in 2011, 2023 and 2025</td></tr></table>

The second is the one people forget. **"Risk-free" holds only if you hold to maturity**; sell early and the price may be far below what you paid. Between 2020 and 2023, long-dated U.S. Treasuries at one point lost roughly half their value — an enormous loss with no default anywhere in sight. Silicon Valley Bank's collapse in March 2023 traces back in part to exactly this: it held large amounts of long-dated Treasuries and mortgage securities, built up huge unrealized losses as rates rose, and then faced a run on its deposits (Stage 10.3).

So the precise statement is: **a 3-month bill is risk-free for someone who needs the money in 3 months; a 30-year bond is risk-free only for someone who will hold it 30 years and cares only about nominal dollars.** Risk-free is always relative to a horizon and a unit of account.

### ⑤ The anchor in the new era: stablecoins, tokenized Treasuries, bitcoin and DAT preferreds

The risk-free rate anchors the new financial system too, just in new forms:

- **Stablecoins.** The reserves of the major dollar stablecoins sit mostly in short-term Treasuries and Treasury repo. Holders generally earn no interest; **the risk-free yield goes to the issuer** — the heart of the stablecoin business model. The U.S. GENIUS Act passed in 2025 also bars payment-stablecoin issuers from paying interest directly to holders (Stage 13.2). The upshot: stablecoin issuers have become significant buyers of T-bills, wiring on-chain dollar demand straight back into the Treasury market.
- **Tokenized Treasury funds** put shares of T-bill funds on a blockchain so on-chain money can earn the risk-free rate directly (Stage 14.2). They have become the new benchmark for DeFi yields: **if a DeFi protocol doesn't pay meaningfully more than on-chain Treasuries, it isn't worth its smart-contract risk** (Stage 13.5).
- **Bitcoin** pays nothing, so its hurdle rate is the risk-free rate: the opportunity cost of holding bitcoin is the Treasury interest you give up. The higher the risk-free rate, the more "expensive" it is to hold a non-yielding asset — one reason rate cycles matter for bitcoin (Stage 12.4).
- **DAT preferreds.** When a digital asset treasury company issues a preferred with a dividend of about 10% (Orange Corp's Orange-F pays 10%), how should an investor think about it? With exactly this lesson's ladder: **10% minus the Treasury yield = the risk premium the market demands.** That premium has to pay for credit risk (the assets behind it are volatile bitcoin), subordination (preferreds rank behind debt), a perpetual term, and liquidity. When Treasury yields rise, the same 10% looks less enticing and the preferred's price comes under pressure. Stage 18.1 builds this framework out fully, and Stage 20.1 connects "30-year Treasury → bitcoin → DAT preferreds" into a single chain. This lesson covers mechanisms and analytical frameworks only; it is not investment advice.

In one line: **the Treasury yield is the pure price of time, the risk premium is the price of risk, and every asset's discount rate is the sum of the two.** Know where the floor is and how many bricks sit on it, and you can read almost any "yield" you come across.
`,

  demo: "risk-free-rate",

  analogy: `
Think of the financial markets as **one building where every asset lives.**

The ground floor is the risk-free rate. No asset can live below ground level — if something offered a lower expected return than Treasuries while carrying more risk, who would want it?

Which floor an asset lives on depends on how many layers of risk it carries. The 10-year Treasury sits on one extra brick (term premium); corporate bonds a floor higher (credit risk); stocks higher still (equity risk); the startup lives in the penthouse (every kind of risk, and you can't easily move out). The higher the floor, the higher the rent — that is, the return it has to promise you.

Now imagine **the whole building's foundation is jacked up by one meter**: the risk-free rate goes from 4% to 5%. Every tenant rises by one meter, no exceptions. For the assets living there, it means they must promise a higher return to keep their investors; but their future cash flows haven't grown — so the only way to offer that higher return is to **lower their price.**

One last thing: the foundation can sway. It won't collapse (Treasuries almost never default), but it rises and falls with inflation and interest rates. People living right on the foundation think they're the safest in the building — yet if what they hold is a 30-year lease, a sway in the foundation can knock a big chunk off their home's value. That is precisely what happened to Silicon Valley Bank.
`,

  misconceptions: [
    "**\"A risk-free asset is one you can't lose money on.\"** — Treasuries are merely near-default-free. If rates rise while you hold them, long bonds can fall sharply (long Treasuries lost roughly half their value between 2020 and 2023), and inflation erodes real purchasing power. \"Risk-free\" holds only over a matching horizon and in nominal terms.",
    "**\"Higher risk always means higher returns.\"** — Higher risk means a higher **required (expected)** return; the actual outcome can be much better or a total loss. A risk premium is the average compensation for bearing risk, not a guarantee — and only risk you can't diversify away earns one (Stage 11.1).",
    "**\"Treasury yields only matter to people who buy Treasuries.\"** — Corporate bonds, mortgages, stock valuations, foreign assets, repo collateral and DeFi yield benchmarks are all anchored, directly or indirectly, to Treasuries. A move in Treasury yields is a move in the whole market's discount rate.",
    "**\"A product yielding, say, 10% from a solid issuer is just a higher-yielding Treasury.\"** — The gap between 10% and the Treasury yield is precisely the price the market puts on risk: credit, subordination, term, liquidity. A higher yield means the market thinks you are bearing more risk, not that money is falling from the sky.",
    "**\"A stablecoin is a kind of risk-free rate — hold it and you earn Treasury yield.\"** — The reserves of the major dollar stablecoins are invested in Treasuries, but the interest goes to the issuer; holders generally earn nothing while bearing issuer and reserve risk. To earn Treasury yields on-chain you need something like a tokenized Treasury fund (Stage 14.2), which comes with its own eligibility rules and legal structure.",
  ],

  quiz: [
    {
      q: "Why is the 3-month U.S. Treasury bill so often used as the dollar risk-free rate?",
      options: [
        "Because it always pays the highest yield",
        "Because it has almost no default risk, a very short maturity and outstanding liquidity",
        "Because its price never changes",
        "Because it is unaffected by Federal Reserve policy",
      ],
      answer: 1,
      explain: "**Near-zero default risk + very short maturity (price barely moves with rates) + the deepest market anywhere.** For long-horizon valuations, use a maturity-matched Treasury yield instead.",
    },
    {
      q: "The risk-free rate is 4% and a stock's equity risk premium is 5%. Using the build-up method, what is its required return? And if the risk-free rate rises to 5%?",
      options: ["5%; 5%", "9%; 9%", "9%; 10%", "20%; 25%"],
      answer: 2,
      explain: "**Required return = risk-free rate + risk premium**: 4% + 5% = 9%. Raise the floor by a point and the required return becomes 10%. That is how Treasury yields pull on every asset's discount rate.",
    },
    {
      q: "Which of these is NOT a risk of holding long-term U.S. Treasuries?",
      options: [
        "Prices fall when interest rates rise",
        "Inflation erodes real purchasing power",
        "The U.S. government is likely to default on nominal dollars",
        "At maturity you may have to reinvest at a lower rate",
      ],
      answer: 2,
      explain: "The defining feature of Treasuries is **extremely low nominal default risk.** Their real risks are price (duration), inflation and reinvestment — and SVB's lesson came from price risk.",
    },
    {
      q: "A DAT issues a perpetual preferred with a 10% dividend while the 10-year Treasury yields 4.5% (illustrative). What does the 5.5-point gap represent?",
      options: [
        "The compensation the market demands for credit risk, subordination, perpetual term, liquidity and other risks",
        "Free extra return the company is giving away",
        "Bitcoin's annual price gain",
        "A subsidy the Fed pays to preferred holders",
      ],
      answer: 0,
      explain: "**Yield − risk-free rate = risk premium.** 10% is not \"a Treasury with a higher coupon\"; it is a price set on a specific bundle of risks. Stage 18.1 takes that bundle apart piece by piece.",
    },
    {
      q: "A stablecoin issuer holds its reserves in short-term Treasuries. Who usually keeps that Treasury interest?",
      options: ["All of it goes to holders", "Miners", "The Federal Reserve", "Mainly the issuer"],
      answer: 3,
      explain: "The major payment stablecoins generally **pay holders no interest**; the Treasury yield on reserves is the issuer's main source of revenue. To earn Treasury yields on-chain, you need something like a tokenized Treasury fund (Stage 14.2).",
    },
  ],

  further: [
    { label: "U.S. Treasury: daily Treasury par yield curve rates (the official source for today's risk-free rates)", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve" },
    { label: "Aswath Damodaran: implied equity risk premium, updated regularly with data", url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/implpr.html" },
    { label: "Federal Reserve Bank of New York: SOFR (Secured Overnight Financing Rate) explained, with data", url: "https://www.newyorkfed.org/markets/reference-rates/sofr" },
    { label: "William F. Sharpe, \"Capital Asset Prices\" (1964), Journal of Finance", url: "https://doi.org/10.1111/j.1540-6261.1964.tb02865.x" },
  ],
};
