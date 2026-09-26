export default {
  id: "preferred-stock",
  stage: 6,
  order: 2,
  title: "Preferred Stock: The Hybrid Between Bonds and Stocks",
  difficulty: "core",
  prereqs: ["capital-stack", "duration-convexity"],

  oneLiner:
    "Preferred stock looks like a bond: it pays a **fixed dividend** and ranks ahead of the common. It also looks like a stock: **no maturity date, a skipped dividend is not a default, and it ranks behind all debt.** Issuers get a fixed cost that can't push them into bankruptcy; investors get a higher yield than bonds — paid for with a lower floor in the capital stack and a very long duration. A $25 perpetual preferred paying 6% falls to about $21.43 when its yield rises from 6% to 7% — **almost exactly what a 30-year Treasury does.** The headline about a \"roughly 10% bitcoin-backed preferred\" is this old instrument in new-era clothes.",

  intuition: `
Go back to the bakery from Stage 6.1. The neighbor put in $100,000 on these terms: "a fixed 8% payout every year, and I get paid before any of you owners take a cent." That is **preferred stock**.

First, the ways it looks like a **bond**:

- The payout is a **fixed amount**: \\(\\$100{,}000 \\times 8\\% = \\$8{,}000\\). Whether the bakery earns $100,000 or $1 million, the neighbor collects $8,000.
- It ranks **ahead of the common**: as long as this year's $8,000 hasn't been paid, the owners can't pay themselves a dividend.

Now the ways it looks like **stock**:

- **There is no maturity date.** In principle the neighbor's $100,000 is never repaid (unless the owners choose to buy it back).
- **Skipping the payout is not a default.** In a bad year the owners can announce "no payout this year." If they skip the bank's interest, the bank can seize the shop. If they skip the neighbor's payout, the neighbor **cannot** force the bakery into bankruptcy over it.
- It ranks **behind all debt**. If the bakery fails, the bank, the uncle and the classmate are all paid before the neighbor sees anything.

So preferred stock is a **hybrid**: its income looks like debt (fixed), while its risk looks more like equity (junior, skippable, never matures). This lesson sits on **Idea ② (balance sheets & claims)** — preferred is the floor wedged between "debt" and "common" in the capital-stack floor plan — and on **Idea ① (the price of time)**: a fixed income stream that never matures is exactly the **perpetuity** of Stage 2.3, priced as \\(\\dfrac{\\text{annual dividend}}{\\text{required yield}}\\). That makes it extremely sensitive to interest rates.

Pin that down with numbers. A classic bank preferred has a $25 par value and a 6% dividend rate: $1.50 a year. When the market demands a 6% yield, it is worth \\(\\$1.50 \\div 6\\% = \\$25\\). If long-term rates rise and the market now demands 7%, it is worth \\(\\$1.50 \\div 7\\% \\approx \\mathbf{\\$21.43}\\) **— down about 14%.** That is nearly identical to Stage 4.5's "30-year Treasury yield up one percentage point, price down about 14%." **People who buy preferreds often think they're buying steady income; they are also buying a big slab of interest-rate risk.**

Why would a company issue such a thing? Because for the issuer it is **a fixed cost that can't make it default**. Banks use it to build regulatory capital, utilities and real estate investment trusts (REITs) use it to raise money without adding debt, and rating agencies often count part of it as equity. The price is that it costs more than debt: the dividend isn't tax-deductible, and investors want more for standing on a lower floor.

Finally, this lesson cracks open the course's third headline: "Strategy issues a bitcoin-backed preferred yielding about 10%." You can now read half of it. **"Preferred" tells you where it sits in the floor plan; "about 10%" tells you the price the market demands for that spot.** The other half — why bitcoin backs it, and whether 10% is enough — waits for reading the terms in Stage 6.3, measuring coverage in Stage 6.5, seeing the real terms in Stage 17.3, and valuing it in Stage 18.1.

**In this lesson we break it into five pieces:**

- **① The hybrid's DNA: the bond half and the stock half**
- **② Why issuers use it: a skipped dividend is not a default**
- **③ Who issues, who buys: banks, REITs, utilities — and yields**
- **④ Perpetual means very long duration: rate sensitivity**
- **⑤ The new era: bitcoin-backed preferreds**
`,

  mechanics: `
### ① The hybrid's DNA: the bond half and the stock half

A preferred share really has only three core parameters.

- **Par value / liquidation preference.** How much money it "stands for." In the US retail market it has traditionally been **$25** a share; institutional issues often use $1,000; the new generation of DAT preferreds commonly uses **$100**. In a liquidation, a preferred holder gets at most this amount (plus any dividends owed but unpaid).
- **Dividend rate.** The annual dividend as a percentage of par. $25 at 6% → \\(\\$25 \\times 6\\% = \\$1.50\\) a year, usually paid as $0.375 a quarter.
- **Term.** The overwhelming majority are **perpetual**, with no maturity date; the issuer usually has the right to **redeem (call)** them at par after some years (Stage 6.3 dissects that option).

Line it up against a bond and a common share:

<figure><svg viewBox="0 0 640 310" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The hybrid spectrum: preferred stands between debt and common</text><rect x="20" y="36" width="600" height="14" rx="7" fill="var(--surface-2)" stroke="var(--line)"/><rect x="20" y="36" width="200" height="14" rx="7" fill="var(--blue)" opacity=".55"/><rect x="220" y="36" width="200" height="14" fill="var(--orange)" opacity=".65"/><rect x="420" y="36" width="200" height="14" rx="7" fill="var(--green)" opacity=".55"/><text x="130" y="72" text-anchor="middle" font-size="13" font-weight="700" fill="var(--blue)">Bond</text><text x="330" y="72" text-anchor="middle" font-size="13" font-weight="700" fill="var(--orange-ink)">Preferred</text><text x="530" y="72" text-anchor="middle" font-size="13" font-weight="700" fill="var(--green)">Common</text><text x="10" y="100" font-size="10" fill="var(--muted)">Income</text><text x="130" y="100" text-anchor="middle" font-size="11" fill="var(--ink)">fixed interest (obligation)</text><text x="330" y="100" text-anchor="middle" font-size="11" fill="var(--ink)">fixed dividend (declared)</text><text x="530" y="100" text-anchor="middle" font-size="11" fill="var(--ink)">variable dividend + residual</text><text x="10" y="128" font-size="10" fill="var(--muted)">If unpaid</text><text x="130" y="128" text-anchor="middle" font-size="11" fill="var(--red)">default → bankruptcy</text><text x="330" y="128" text-anchor="middle" font-size="11" fill="var(--orange-ink)">skipped (tracked if cumulative)</text><text x="530" y="128" text-anchor="middle" font-size="11" fill="var(--ink)">can stop anytime</text><text x="10" y="156" font-size="10" fill="var(--muted)">Term</text><text x="130" y="156" text-anchor="middle" font-size="11" fill="var(--ink)">fixed maturity</text><text x="330" y="156" text-anchor="middle" font-size="11" fill="var(--ink)">usually perpetual (callable)</text><text x="530" y="156" text-anchor="middle" font-size="11" fill="var(--ink)">perpetual</text><text x="10" y="184" font-size="10" fill="var(--muted)">Rank</text><text x="130" y="184" text-anchor="middle" font-size="11" fill="var(--ink)">first</text><text x="330" y="184" text-anchor="middle" font-size="11" fill="var(--ink)">after debt, before common</text><text x="530" y="184" text-anchor="middle" font-size="11" fill="var(--ink)">last</text><text x="10" y="212" font-size="10" fill="var(--muted)">Upside</text><text x="130" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">capped</text><text x="330" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">capped (unless convertible)</text><text x="530" y="212" text-anchor="middle" font-size="11" fill="var(--ink)">unlimited</text><text x="10" y="240" font-size="10" fill="var(--muted)">Issuer tax</text><text x="130" y="240" text-anchor="middle" font-size="11" fill="var(--ink)">interest deductible</text><text x="330" y="240" text-anchor="middle" font-size="11" fill="var(--ink)">not deductible</text><text x="530" y="240" text-anchor="middle" font-size="11" fill="var(--ink)">not deductible</text><text x="10" y="268" font-size="10" fill="var(--muted)">Votes</text><text x="130" y="268" text-anchor="middle" font-size="11" fill="var(--ink)">none</text><text x="330" y="268" text-anchor="middle" font-size="11" fill="var(--ink)">usually none (board seats after arrears)</text><text x="530" y="268" text-anchor="middle" font-size="11" fill="var(--ink)">yes</text><text x="320" y="298" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">Income like debt, risk like equity — that is why it yields more</text></svg><figcaption>Every trait of a preferred can be tuned in its terms (cumulative or not, convertible or not, fixed or floating rate); Stage 6.3 takes them apart one by one.</figcaption></figure>

One legal detail is the dividing line between the bond half and the stock half. A bond's interest is a **contractual obligation**; miss it and you have defaulted. A preferred dividend is **declared** by the board; if it isn't declared, it isn't owed — unless the terms say **cumulative**, in which case every missed payment is recorded as **arrears** that must be caught up before the common can receive anything.

### ② Why issuers use it: a skipped dividend is not a default

For an issuer, the value of preferred stock fits in one sentence: **it is a fixed cost that, if you can't pay it, does not push you into bankruptcy.** Unpack that into four points.

- **Financial flexibility.** In hard times the company can stop the dividend and keep the cash. Stop paying bond interest and you trigger default, cross-default and acceleration. During the 2008–2009 crisis a number of financial institutions suspended preferred dividends.
- **Equity treatment.** Accountants usually classify preferred stock as **equity**, so it doesn't add to liabilities. Rating agencies analyzing hybrid capital often give it **partial** equity credit — how much depends on the terms: the more perpetual, skippable and junior, the more equity-like. That lets a company raise money without denting its credit rating.
- **No dilution of control.** Preferreds usually carry no votes and don't share in the upside, so common shareholders keep their profits and their control. That is the fundamental difference from issuing new common shares, as in Stage 5.5.
- **Regulatory capital.** Since Basel III, a bank's **Additional Tier 1 (AT1)** capital must be perpetual with dividends that can be cancelled at any time and don't accumulate. Non-cumulative perpetual preferred fits perfectly, which is why big US banks are the largest issuers in the traditional preferred market.

The cost is just as clear:

$$
\\text{after-tax cost of debt} = \\text{interest rate} \\times (1 - \\text{corporate tax rate})
6\\% \\times (1 - 21\\%) \\approx 4.74\\%
\\text{cost of preferred} = \\text{dividend rate} = 6\\%
$$

Preferred dividends are paid from after-tax profit and are not deductible, so the cost of preferred is simply its dividend rate. Add the extra return investors demand for standing on a lower floor, and **for a normal taxpaying company, preferred stock is usually much more expensive than debt.** So the issuers tend to be companies with a special reason: banks that need regulatory capital, utilities with leverage constraints, REITs that must pay out most of their profits — and a new kind of issuer: **DATs that have no operating cash flow but want leverage without margin-callable debt.**

### ③ Who issues, who buys: banks, REITs, utilities — and yields

**Traditional issuers:**

- **Banks and insurers**, for regulatory capital. They issue large amounts of non-cumulative perpetual preferred, often at $25 par and listed on an exchange.
- **Real estate investment trusts (REITs).** A US REIT must distribute at least 90% of its taxable income, so it retains little profit. Preferreds let it grow without pushing up its debt-leverage metrics.
- **Utilities.** Capital-hungry, with regulators watching their debt ratios, they use preferreds as a supplement between debt and equity.

**Buyers:** income-seeking individuals (retirees especially), preferred-stock ETFs and income funds, some insurers, and US corporate investors who benefit from the **dividends-received deduction (DRD)**. For US individual investors, qualifying preferred dividends can be taxed at the lower "qualified dividend" rates — but distributions from REIT preferreds and some hybrid instruments often don't qualify. This tax thread comes back in Stage 17.7 on return of capital. (None of this is tax advice.)

**Where do yields sit?** Traditional investment-grade preferreds move with the rate environment and broadly land in the zone of "long-term Treasury yield plus a few percentage points"; lower-rated or unrated issuers pay more. Plug the formula from Stage 2.4 in:

$$
\\text{required preferred yield} \\approx \\text{risk-free rate} + \\text{credit premium} + \\text{subordination premium} + \\text{liquidity / terms premium}
\\underbrace{5\\%}_{\\text{30-year Treasury}} + \\underbrace{1\\%}_{\\text{credit}} + \\underbrace{0.5\\%}_{\\text{behind debt}} + \\underbrace{0.5\\%}_{\\text{perpetual, callable}} \\approx 7\\%
$$

The second line is an example.

If any of the four blocks grows, the preferred's price must fall. **When the 30-year Treasury yield climbs above 5% (Stage 4.5; as of late September 2026 it was about 5.5%, the highest since 2004 — check treasury.gov for live data), traditional preferred yields are pushed up with it** — because buyers can always turn around and buy the safer long bond instead. That is the thread tying the course's first headline to its third.

### ④ Perpetual means very long duration: rate sensitivity

A preferred that never matures and pays a fixed dividend has exactly the cash flows of Stage 2.3's perpetuity:

$$
P = \\frac{D}{y}
\\text{modified duration} \\approx \\frac{1}{y}
$$

Here \\(P\\) is the price, \\(D\\) the annual dividend and \\(y\\) the required yield.

More precisely, a perpetuity's Macaulay duration is \\(\\dfrac{1 + y}{y}\\) and its modified duration is \\(\\dfrac{1}{y}\\) (Stage 4.4 noted that "the duration of a perpetual is about \\(1/y\\)"). Some numbers:

<table class="pm">
<tr><th>Preferred</th><th>Annual dividend</th><th>Required yield</th><th>Price</th><th>Modified duration</th><th>After yield +1 point</th></tr>
<tr><td>Classic bank preferred ($25, 6%)</td><td>1.50</td><td>6%</td><td>25.00</td><td>\\(\\approx 16.7\\)</td><td>21.43 (−14.3%)</td></tr>
<tr><td>Same, but market demands 5%</td><td>1.50</td><td>5%</td><td>30.00*</td><td>20</td><td>25.00 (−16.7%)</td></tr>
<tr><td>Orange Corp's Orange-F ($100, 10%)</td><td>10.00</td><td>10%</td><td>100.00</td><td>10</td><td>90.91 (−9.1%)</td></tr>
<tr><td>Benchmark: 30-year Treasury (5% coupon)</td><td>5.00</td><td>5%</td><td>100.00</td><td>\\(\\approx 15.5\\)</td><td>86.16 (−13.8%)</td></tr>
</table>

(*In practice a callable preferred rarely trades far above par: the issuer would call it at par and reissue at a lower rate. That is "negative convexity," covered in Stage 6.3.)

Three conclusions fall out of that table.

- **The lower the yield, the longer the duration, and the more it fears rate hikes.** A 6% preferred has a duration of about 16.7 — longer than the 30-year Treasury.
- **A high dividend rate naturally shortens duration.** Orange-F at 10% has a duration of only 10; the same one-point rise costs it about 9%. The price of that high yield is credit risk, not rate risk.
- **Engineering duration down.** Fixed-to-floating resets, monthly adjustable rates, short call dates — each strips away part of the rate risk of being perpetual. Stage 17.4 shows a design that pushes duration very low.

### ⑤ The new era: bitcoin-backed preferreds

Now turn the camera to the headline. Beginning in 2025, Strategy has issued a **family** of preferreds (tickers such as STRK, STRF, STRD and STRC), and Strive uses preferred stock as its main leverage tool (SATA, for example). Their exact terms, rates and ranking are checked against the facts file in Stage 17.3 and Stage 17.5. Here, Orange Corp lets us see clearly **how this kind of preferred differs from a bank preferred.**

<table class="pm">
<tr><th></th><th>Classic bank preferred</th><th>Bitcoin-backed preferred (Orange-F as the example)</th></tr>
<tr><td>What backs it</td><td>Loan book, operating profit</td><td>Bitcoin ($1B, extremely volatile)</td></tr>
<tr><td>Where the dividend comes from</td><td>Operating profit</td><td>Mainly new capital (issuing common or preferred), a USD reserve, and if necessary selling BTC</td></tr>
<tr><td>How credit is measured</td><td>Ratings, capital ratios, earnings coverage</td><td>Asset coverage (Stage 6.5), BTC Rating (Stage 16.5), months of reserve (Stage 16.6)</td></tr>
<tr><td>Typical yield</td><td>Long Treasury + a few points</td><td>Around 10% (the headline)</td></tr>
<tr><td>Main risks</td><td>Rates, bank credit</td><td>A deep bitcoin drawdown combined with closed capital markets</td></tr>
</table>

Orange Corp's arithmetic: Orange-F ($100M at 10%) and Orange-D ($50M at 10%) together cost **$15M a year** in dividends. The company has no operating profit, but its $30M cash reserve covers **24 months**, and asset coverage down to the F layer is **4.0x**.

**The strongest case for:** bitcoin can be sold 24/7; 4x coverage means bitcoin can fall 75% and this layer is still paid in full; with no margin calls and no maturity date, a single crash can't force a liquidation; and for about 10%, investors get a seat ahead of the common, with far less volatility than holding the coin.

**The strongest case against:** the dividend doesn't come from operating cash flow but from continuous fundraising. If the common's premium disappears and capital markets shut, dividends can only come from the reserve and from selling bitcoin. Bitcoin's drawdowns have repeatedly reached 70–80% (Stage 11.3), so coverage collapses exactly when it is needed most. And perpetual means there is no "get my principal back at maturity" exit — only a sale in the secondary market, where a panic can push prices far below par.

Both sides are partly right — **which is exactly why you need a whole toolkit to evaluate it**: the terms (Stage 6.3), coverage (Stage 6.5), valuation (Stage 18.1) and stress tests (Stage 18.2). **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "preferred-stock",

  analogy: `
Think of a preferred share as **a permanent "first-in-line rent right" on a storefront.**

You hand the landlord (the issuer) a lump sum and get a contract that lasts forever: 6% rent every year, paid to you before the landlord pays themselves a salary (the common dividend). You don't run the shop. However busy it gets, you collect your 6% and nothing more.

The contract is unlike a loan in three ways. First, **there is no move-out date**: if you want your money back, you have to sell the rent right to someone else. Second, **when the landlord is short of cash, they can say "I'll owe you this quarter,"** and you can't drag them into bankruptcy court over it. If the contract says "cumulative," the missed rent is logged and must be caught up; if not, it is simply gone. Third, **if the bank seizes the storefront and auctions it off, you stand behind the bank and every other creditor.**

What is that rent right worth when you sell it? It depends on **what new contracts are paying at the time.** If new rent rights are going for 7%, your old 6% contract must be sold at a discount — and because it runs forever, the discount is large. That is why preferreds fall like 30-year Treasuries when rates rise.

A bitcoin-backed preferred swaps the storefront for **a vault whose value swings violently.** The rent (about 10%) is higher because the vault might double in a year or halve in one. You collect a fixed rent, but what you are really betting on is whether, in the worst year, the vault still holds enough to pay you.
`,

  misconceptions: [
    "**\"Preferred stock is just a higher-yielding bond, and just as safe.\"** — It ranks behind all debt, its dividend can be skipped without a default, and it has no maturity date to hand your principal back. The higher yield is payment for exactly those extra risks.",
    "**\"Preferred prices are stable because the dividend is fixed.\"** — A fixed dividend plus no maturity means a very long duration. A $25, 6% preferred loses about 14% when its yield rises one point, roughly like a 30-year Treasury. \"Fixed\" describes the income, not the price.",
    "**\"If a company skips its preferred dividend, it has defaulted.\"** — No. Preferred dividends are declared by the board; not declaring one isn't a default, and holders can't file to put the company into bankruptcy. Cumulative arrears must be caught up before the common gets paid; non-cumulative dividends are simply lost.",
    "**\"Preferred is safer than common, so it must be the better investment.\"** — Safer isn't better. A preferred's upside is capped: when the company does brilliantly, you still get only the fixed dividend. It trades upside for downside protection; whether that suits you depends on what you want.",
    "**\"A 10% yield on a bitcoin-backed preferred means it's as dangerous as a junk bond.\"** — A yield is the price of risk, not the type of risk. Its risks (bitcoin volatility, dependence on fundraising) differ from a junk bond's (a failing business), and they have to be measured specifically — with asset coverage, reserve months and stress tests — not labeled from the number alone.",
  ],

  quiz: [
    {
      q: "A $25 perpetual preferred pays a 6% dividend. If the market's required yield rises from 6% to 7%, roughly what is it worth?",
      options: [
        "$24.75 — down just 1%",
        "About $21.43 — down about 14%",
        "$25 — the dividend is fixed, so the price doesn't move",
        "About $12.50 — cut in half",
      ],
      answer: 1,
      explain: "\\(\\text{perpetuity price} = \\text{dividend} \\div \\text{yield} = 1.50 \\div 7\\% \\approx 21.43\\), down about 14%. **Modified duration** \\(\\approx 1/y \\approx 16.7\\), in the same league as a 30-year Treasury.",
    },
    {
      q: "For a normal taxpaying company, why is preferred stock usually more \"expensive\" than debt?",
      options: [
        "Because preferreds must pay monthly",
        "Because preferreds have a maturity date and must be repaid",
        "Because bond interest is tax-deductible while preferred dividends aren't, and investors demand more for the lower floor",
        "Because preferred holders get votes",
      ],
      answer: 2,
      explain: "A 6% bond costs about \\(6\\% \\times (1 - 21\\%) \\approx 4.74\\%\\) after tax; a 6% preferred costs the full 6%. Add the **subordination premium** and preferred is pricier — which is why issuers tend to have a special reason (regulatory capital, leverage limits, DATs with no operating profit).",
    },
    {
      q: "Which feature best captures a preferred's \"equity side\"?",
      options: [
        "A skipped dividend is not a default, and it ranks behind all debt",
        "The dividend amount is fixed each year",
        "It is paid before the common",
        "It has a par value (liquidation preference)",
      ],
      answer: 0,
      explain: "A fixed dividend, priority over the common and a par value are all bond-like. **Skippable without default, junior to all debt, and perpetual** — those are what make it equity-like.",
    },
    {
      q: "Orange-F ($100 par, 10% dividend) has a modified duration of about 10; a classic 6% preferred, about 16.7. What does that tell you?",
      options: [
        "Orange-F has lower credit risk",
        "Orange-F is necessarily safer than the classic preferred",
        "The two are equally rate-sensitive",
        "For perpetuals, a higher yield means a shorter duration and less rate risk — but a high yield usually reflects more credit risk",
      ],
      answer: 3,
      explain: "A perpetual's modified duration \\(\\approx 1/y\\): \\(1 / 10\\% = 10\\), \\(1 / 6\\% \\approx 16.7\\). **The high yield shortens duration**, but that high yield is itself compensation for credit risk (bitcoin volatility, dependence on fundraising). Rate risk and credit risk are different things.",
    },
    {
      q: "Why are big US banks the main issuers of traditional preferred stock?",
      options: [
        "Because banks aren't allowed to issue bonds",
        "Because non-cumulative perpetual preferred counts as Additional Tier 1 capital without adding liabilities",
        "Because preferred dividends are tax-deductible",
        "Because the law requires banks to issue preferreds",
      ],
      answer: 1,
      explain: "Under Basel III, **Additional Tier 1 capital** must be perpetual with cancellable, non-cumulative distributions — exactly what non-cumulative perpetual preferred is. It lets banks strengthen capital without issuing new common shares.",
    },
  ],

  further: [
    { label: "SEC Investor.gov: Preferred Stock (basics and risks)", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/preferred-stock" },
    { label: "Corporate Finance Institute: Preferred Shares (features and types)", url: "https://corporatefinanceinstitute.com/resources/equities/preferred-shares/" },
    { label: "Bank for International Settlements: Basel III definition of capital (Additional Tier 1 criteria)", url: "https://www.bis.org/basel_framework/chapter/CAP/10.htm" },
    { label: "Strategy: preferred stock and capital structure information (check the latest official disclosures)", url: "https://www.strategy.com/" },
  ],
};
