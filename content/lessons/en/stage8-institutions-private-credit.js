export default {
  id: "institutions-private-credit",
  stage: 8,
  order: 4,
  title: "Who Owns Everything: Asset Managers, Pensions, Insurers, Shadow Banks & Private Credit",
  difficulty: "core",
  prereqs: ["repo-money-markets", "credit-spreads"],

  oneLiner:
    "Every stock, bond and loan in the world ends up on some institution's balance sheet: asset managers, pension funds, insurers, banks, sovereign wealth funds, hedge funds — and ordinary people, who own nearly everything indirectly through them. One principle is enough to read them all: **liabilities determine assets.** Whom an institution owes, when it has to pay, and whether its creditors can run decide what it can buy and what it dares to buy. This lesson uses that principle to draw a map of who holds what, opens up the credit system outside the banks — **shadow banking and private credit** — and ends with a question that leads straight into the Focus tier: **who buys the preferreds and convertibles that DATs issue?**",

  intuition: `
Say your paycheck this month is $10,000. Follow where it ends up:

- $1,000 is automatically deducted into your **pension**, which hands it to a few **asset managers**. They buy Treasuries, stock index funds and a small slice of a **private credit** fund.
- $500 pays an **insurance** premium. The insurer buys long-term corporate bonds and private loans with it, because it has to pay you an annuity in 20 years.
- $3,000 sits in a **bank**, which lends most of it out and buys Treasuries.
- $2,000 goes into a **money-market fund**, and that same night it's lent into the repo market (Stage 8.3).
- Of the rest, some you use to buy stocks and ETFs in your brokerage app (Stage 8.1), and some you spend.

You thought you were just "saving, paying for insurance and buying a few funds." In fact, through these institutions, you now **indirectly own almost every kind of asset.** Likewise, a company's bond, a Treasury, a loan to a mid-sized business, a share of Strategy preferred — each ends up on the balance sheet of one of these institutions.

They look wildly different, but understanding them takes only one question: **whom does it owe, when does it have to pay, and can they demand the money at will?**

- Money-fund investors **can redeem any day**, so a money fund can only buy assets that mature overnight or within a few months.
- A life insurer must pay annuities **20 or 30 years from now**, so it prefers long bonds and can live with some private loans it could never sell quickly.
- A pension fund's liabilities are also long, but it has to pay out retirement benefits steadily every year.
- Sovereign wealth funds and university endowments **almost never have to pay anyone back**, so they can own the least liquid, most volatile assets.
- Hedge funds use borrowed money and investor capital that may leave on short notice, so they have to worry about margin and liquidity (Stage 7.5).

That's the core principle of this lesson: **liabilities determine assets.** It's the most practical form of **Idea ② Balance sheets & claims**: before you look at an institution's assets, look at its liabilities. These institutions are also wired together through repo, securities lending, fund shares and loans, forming a whole credit system outside the banks — **shadow banking**. That brings in **Idea ③ Liquidity & trust (the plumbing)**: when "withdraw any time" liabilities fund "can't sell it" assets, the seeds of a run are planted (Stage 1.2 covered banks' maturity mismatch; shadow banking is the same problem in a different building).

After 2008, banks under tougher capital rules pulled back from lending to mid-sized companies, and **private credit** funds filled the gap, lending directly to businesses without a bank and without a public market. That business has grown to the trillions of dollars, and it's now financing AI data centers too (Stage 19.2).

Finally, this map runs all the way into the Focus tier. Most of the convertible bonds that a company like Strategy issues are bought by **convertible-arbitrage funds** (Stage 17.2); its family of preferreds (Stage 17.3) is designed for different buyers, from yield-seeking retail investors to income funds. **Know who the natural buyer is, and you know why a financial product is shaped the way it is.** This lesson covers mechanisms and analytical frameworks only; it is not investment advice.

**In this lesson we break it into five pieces:**

- **① Liabilities determine assets: the first rule for reading any institution**
- **② Big asset managers and retail: who presses "buy" for you**
- **③ Pensions, insurers and sovereign funds: the most patient money**
- **④ Shadow banking and private credit: lending outside the banks**
- **⑤ Who buys preferreds and convertibles: the DAT buyer map**
`,

  mechanics: `
### ① Liabilities determine assets: the first rule for reading any institution

A financial institution's balance sheet has its assets on the left and, on the right, what it owes (liabilities) and its own capital (equity). **The shape of the right side determines what can go on the left.** To read the liabilities, ask three questions:

- **Horizon**: on average, how far away are the payments? That's the **liability duration** — Stage 4.4's duration, applied to what you owe.
- **Runnability**: can creditors demand their money at will? Deposits and money-fund shares can; insurance policies and pension promises mostly can't.
- **Promised return**: what return has the institution promised its creditors? A life policy's guaranteed rate or a pension's actuarial discount rate is a hurdle the assets must clear.

<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Liabilities determine assets: from "withdraw any time" to "never repaid"</text><defs><linearGradient id="ipg" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="var(--blue)"/><stop offset="1" stop-color="var(--orange)"/></linearGradient></defs><rect x="40" y="52" width="560" height="10" rx="5" fill="url(#ipg)"/><text x="40" y="80" font-size="10.5" fill="var(--muted)">Short, runnable liabilities</text><text x="600" y="80" text-anchor="end" font-size="10.5" fill="var(--muted)">Long liabilities, almost never run</text><rect x="30" y="96" width="100" height="70" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="80" y="116" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Money fund</text><text x="80" y="133" text-anchor="middle" font-size="9.5" fill="var(--muted)">Daily redemptions</text><text x="80" y="148" text-anchor="middle" font-size="9.5" fill="var(--muted)">Holds: T-bills, repo</text><rect x="140" y="96" width="100" height="70" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="190" y="116" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Bank</text><text x="190" y="133" text-anchor="middle" font-size="9.5" fill="var(--muted)">Owes: deposits</text><text x="190" y="148" text-anchor="middle" font-size="9.5" fill="var(--muted)">Holds: loans, bonds</text><rect x="250" y="96" width="100" height="70" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="300" y="116" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Hedge fund</text><text x="300" y="133" text-anchor="middle" font-size="9.5" fill="var(--muted)">Owes: repo, margin</text><text x="300" y="148" text-anchor="middle" font-size="9.5" fill="var(--muted)">Holds: arb, converts</text><rect x="360" y="96" width="100" height="70" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="410" y="116" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Life / pension</text><text x="410" y="133" text-anchor="middle" font-size="9.5" fill="var(--muted)">Owes: in 20–30 years</text><text x="410" y="148" text-anchor="middle" font-size="9.5" fill="var(--muted)">Holds: long bonds, PC</text><rect x="470" y="96" width="140" height="70" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="540" y="116" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Sovereign / endowment</text><text x="540" y="133" text-anchor="middle" font-size="9.5" fill="var(--muted)">Owes: almost perpetual</text><text x="540" y="148" text-anchor="middle" font-size="9.5" fill="var(--muted)">Holds: equity, private</text><rect x="60" y="186" width="520" height="56" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="320" y="206" text-anchor="middle" font-size="11" font-weight="600" fill="var(--red)">Danger zone: short, runnable liabilities + long or unsellable assets</text><text x="320" y="225" text-anchor="middle" font-size="10.5" fill="var(--ink)">2008 repo funding, 2022 UK LDI, 2023 SVB, redemption waves at semi-liquid private funds</text></svg><figcaption>The further right, the longer and less runnable the liabilities, and the more an institution can hold long-duration, illiquid, volatile assets. Crises almost always erupt where left-side liabilities fund right-side assets.</figcaption></figure>

Run the numbers on a pension's **duration mismatch**. Say it must pay $10 million of benefits a year for the next 30 years. Discounted at 5.49% (close to the 30-year Treasury yield in September 2026), that liability is worth about **$145.5 million** today, with a modified duration of about **11**. Suppose it puts the whole $145.5 million into 10-year Treasuries (modified duration about 7.7), and then rates fall by 1 percentage point:

- The liability's present value rises to about **$163.1 million** (+12.1%).
- The assets rise only to about **$157.1 million** (+8.0%).
- **A funding gap of about $6 million appears out of nowhere.** The pension didn't lose a cent on its investments; it got "poorer" because its assets were shorter than its liabilities.

That's why pensions and insurers are the **natural buyers of long Treasuries and long corporate bonds**, and why UK pensions used leveraged LDI strategies to stretch their asset duration (Stage 7.4). Flip it around: **banks and money funds** have short liabilities, and if they load up on long assets, rising rates blow the kind of hole that sank SVB (Stage 10.3).

### ② Big asset managers and retail: who presses "buy" for you

An **asset manager** runs other people's money for a fee and usually doesn't bear the investment gains or losses itself — the money is the clients', and so is the risk. The largest (BlackRock, Vanguard, State Street and others) each manage trillions of dollars, and the biggest has passed $10 trillion. Their products range from index funds and ETFs (Stage 5.6) to active funds, private funds and tokenized funds — BlackRock's tokenized Treasury fund BUIDL is one of the stars of Stage 14.2.

Two structural shifts are worth remembering:

- **The rise of passive.** U.S. passive fund assets overtook active fund assets around 2024. More and more buying and selling is decided by "are you in the index?" rather than "are you worth the price?" That's why index inclusion matters so much for a stock (Stage 18.4 covers how MSCI and S&P treat DATs).
- **Concentrated voting power.** Together, a handful of big managers are the largest shareholders in many large U.S. companies, and their votes carry real weight in corporate governance.

**Retail investors** have always been the market's foundation. U.S. households, through direct holdings, mutual funds, ETFs and retirement accounts, own the majority of U.S. stocks. Zero-commission brokers (Stage 8.1) and "income" products are bringing retail ever more directly into territory once reserved for institutions — including high-yield preferreds and private credit funds.

The key difference between an asset manager and a bank: **fund investors bear all the gains and losses and funds usually run little or no leverage, so a fund can't go "insolvent" the way a bank can.** But if a fund promises daily redemptions while holding hard-to-sell assets, it's running a bank-style maturity mismatch — exactly what regulators worry about in some bond funds and semi-liquid private funds.

### ③ Pensions, insurers and sovereign funds: the most patient money

**Pensions** come in two kinds:

- **Defined benefit (DB)** plans promise a fixed monthly payment in retirement, and the employer bears the investment risk. Their liabilities are long, and they carry an actuarial hurdle rate (many U.S. public pensions assume returns of around 7%). In the low-rate era, reaching that hurdle pushed them deep into private equity, private credit and other alternatives.
- **Defined contribution (DC)** plans, such as the U.S. 401(k), promise only what goes in, not what comes out; the individual bears the risk. They're the biggest source of money for index funds and target-date funds.

**Insurers**:

- **Property and casualty** insurers have short liabilities (claims paid within a year or two) and prefer short bonds and liquid assets.
- **Life and annuity** insurers have very long liabilities and are among the biggest buyers of investment-grade corporate bonds. A major recent trend: private-equity giants buying or building annuity insurers (Apollo and Athene, for example) and investing annuity customers' long-term money heavily in private credit — **"long liabilities plus private credit" has become a new credit machine.** Insurers face capital rules that charge more for riskier assets, so they care a great deal about an asset's **rating** — which is why some new credit products work hard to obtain one.

**Sovereign wealth funds and endowments**: Norway's Government Pension Fund Global is on the order of $2 trillion, one of the world's largest single investors; Gulf sovereign funds and university endowments belong in this group too. With almost no liabilities coming due, they can hold the least liquid, longest-horizon assets and are major buyers of private equity, infrastructure and other alternatives. Some sovereign funds and states have also begun holding bitcoin or bitcoin-linked securities, directly or indirectly.

**What this patient capital has in common**: it steadies markets, because it's never forced to sell into a fall. Its weakness is "reaching for yield" to clear the hurdle, pouring money into opaque, hard-to-value assets.

### ④ Shadow banking and private credit: lending outside the banks

**Shadow banking** (regulators call it "non-bank financial intermediation") is everything outside the banking system that does bank-like work: turning short-term money into long-term credit, funding illiquid assets with liquid liabilities, and levering up balance sheets. Money funds, the repo market (Stage 8.3), securitization, hedge funds and private credit all belong here. By the Financial Stability Board's measure, together they account for roughly half of global financial assets.

The 2008 crisis was, at heart, a run on the shadow banks. Investment banks funded long-term mortgage securities with overnight repo, and money funds lent them the cash — **no deposit insurance, no lender of last resort, so when trust wavered the whole chain snapped at once** (Stage 10.2).

**Private credit** is the fastest-growing part of shadow banking in the past decade:

- **What it is**: funds lend directly to companies (mostly mid-sized, but also large buyouts and infrastructure). The loans don't trade on public markets; the terms are negotiated privately.
- **Why it grew**: after 2008, banks faced higher capital requirements and grew warier of leveraged lending, so mid-sized companies turned to faster, more flexible private lenders — just as pensions and insurers in a low-rate world went hunting for higher yields.
- **Size**: by common industry estimates, global private credit assets have reached $1.5–2 trillion or more, and are still growing.
- **Typical terms**: floating rate, say **\\(\\mathrm{SOFR} + 6\\%\\)**. With SOFR around 3.9%, the coupon is about **9.9%**. If the expected annual default rate is 3% and loss given default is 50%, \\(\\text{expected loss} = 3\\% \\times 50\\% =\\) **1.5%** (Stage 4.6's \\(\\mathrm{PD} \\times \\mathrm{LGD}\\)), leaving about **8.4%**.

The case for it: it moves risk from banks, which lend out deposits, to investors with **long-term money**, so there's no deposit run; lenders are few and close to their borrowers, so problems are easier to restructure.

The worries:

- **Opacity.** The loans have no market price, and funds mark them with models, so declines can be "smoothed" until they suddenly surface.
- **Liquidity mismatch.** More and more private credit products are sold to retail investors with promises of "partial quarterly redemptions" — while the underlying loans can't be sold at all. In late 2022, a large non-traded real estate trust sold to retail investors limited withdrawals after redemption requests piled up — a preview of that mismatch.
- **Hidden leverage and links.** Banks may not lend directly, but they finance private credit funds, and insurers hold a lot of them. The risk can travel in a circle back to regulated institutions.
- **Underwriting standards.** When competition is fierce, the share of "payment-in-kind" (PIK, Stage 6.3) loans rises — borrowers paying interest with more debt because they can't pay cash. In the second half of 2025, a few borrower bankruptcies sparked worries about underwriting standards across the industry.

**The new-era connection**: building AI data centers takes staggering amounts of capital, and a large share is being raised through private credit, special-purpose vehicles (SPVs) and asset-backed securities (Stage 19.2); tokenized private credit is emerging on-chain too (Stage 14.4 covers its legal limits).

### ⑤ Who buys preferreds and convertibles: the DAT buyer map

Now apply the same principle to two instruments about to take center stage in the Focus tier. One more reminder: **this lesson covers mechanisms and analytical frameworks only; it is not investment advice.**

**Natural buyers of preferred stock** (Stage 6.2):

- **Yield-seeking retail investors.** U.S. exchange-listed preferreds are often issued at $25 or $100 par, pay steady dividends and can be bought in any brokerage app — a traditional income tool for retirees.
- **Income funds.** Preferred-stock ETFs and closed-end income funds hold large amounts of preferreds to fund the steady payouts they make to their own holders.
- **Institutions.** Historically, insurers and banks held a lot of bank preferreds (some countries give tax breaks on dividend income).

DAT preferreds — Strategy's STRF, STRC, STRE, STRK and STRD, for example (Stage 17.3) — are essentially selling **bitcoin-backed yield** to these income buyers. The series differ on whether dividends are cumulative, whether they convert, where they rank and what they pay, precisely to match buyers with different appetites for risk. STRC resets its rate monthly and aims to keep its price near par (Stage 17.4); it's aimed squarely at the **buyers of money funds and T-bills** described in Stage 8.3 — though its risks are nothing like a money fund's.

**Natural buyers of convertible bonds** (Stage 6.4):

- **Convertible-arbitrage funds**, which buy the convert and short the underlying stock, earning the undervalued part of the embedded call option and the volatility (Stage 7.3). They typically take a large share of new convertible issues.
- **Long-only convertible funds**, for investors who want "a bond floor on the way down and a share of the upside."
- Some insurers and balanced funds.

That answers a core question from Stages 15.3 and 17.2: **how can a company like Strategy issue convertibles with coupons near zero?** Because MSTR's share price is extremely volatile, and arbitrage funds are **buying volatility** — the more volatile the stock, the more the embedded option is worth, and the lower the coupon they'll accept. The buyers' demand shapes the product.

**Now look at the risk from the other side.** If a class of buyers walks away — say, yield-seeking retail investors rotating into safer Treasuries because the 30-year yield has climbed to 5.5% (Stage 4.5), or arbitrage funds deleveraging because their financing has tightened (Stage 8.3) — the issuance channel for the matching product narrows. **To judge any DAT's ability to raise money, ask: who are its buyers, what are those buyers' liabilities, and what will they do under stress?**
`,

  demo: "institutions-private-credit",

  analogy: `
Think of financial institutions as **different kinds of kitchens**, and their liabilities as the "orders" they've taken.

A **fast-food counter** (a money fund or a bank) has customers who walk in any time and want food now, so it can only stock ready-made ingredients that won't spoil (T-bills, overnight repo). If it spent all its money cellaring a batch of wine that can't be opened for twenty years (long bonds), then the day a crowd rushes in to order, it would have to dump fine wine for cash — that's SVB.

A **wedding caterer** (an insurer or a pension) has bookings for weddings twenty years out and roughly knows the dates and headcounts, so it can buy slow-maturing ingredients in advance and even sign long-term supply contracts with farms (long bonds, private loans).

A **century-old family restaurant** (a sovereign fund or an endowment) has no delivery date at all. It can keep the rarest, hardest-to-sell vintages in its cellar (private equity, alternatives), because no one will ever force it to sell today.

**Shadow banks** are the unlicensed supper clubs around town that still do a roaring food business: no health permit (bank regulation) and no insurance. Normally the food is good and cheap; one rumor of food poisoning, and every booking cancels at once.

**Private credit** is a sourcing platform that connects farmers directly with wedding caterers, skipping the wholesale market (banks and public bond markets). Prices are better, but only the platform really knows the quality of each crate.

And **DAT preferreds and convertibles** are new ingredients designed for particular kitchens: preferreds for income kitchens that want steady "rations," convertibles for arbitrage kitchens that like a "spicy" flavor (volatility). **Know which kitchen is filling which order, and you'll know why each ingredient is prepared the way it is.**
`,

  misconceptions: [
    "**\"Big asset managers hold trillions, so they carry trillions of risk.\"** — Asset managers run clients' money; the gains and losses belong to the clients, and the firm earns fees. The risk really sits with the pensions, insurers and individuals behind them. The danger is when a fund's redemption promises don't match the liquidity of what it holds.",
    "**\"Pensions and insurers are the most conservative investors; they only buy Treasuries.\"** — Their liabilities are long and they have hurdle rates to clear, so they hold plenty of long corporate bonds, private equity, private credit and other alternatives. Patient capital also takes on opacity and liquidity risk in pursuit of yield.",
    "**\"Shadow banking means illegal or underground finance.\"** — It means legal institutions and markets outside the banking system that do maturity transformation and create credit: money funds, repo, securitization, hedge funds, private credit. The problem isn't legality; it's that they lack deposit insurance and a lender of last resort, so they're more prone to runs when trust wavers.",
    "**\"Private credit yields more because it finds great deals banks can't see.\"** — The higher rate is mainly compensation for **illiquidity, complexity and credit risk**. Model-based marks make volatility look small, but that doesn't make the risk small; and selling \"quarterly redemption\" products to retail wraps illiquid assets in liabilities that look liquid.",
    "**\"An issuer can set a product's terms however it likes.\"** — Terms are tailored to natural buyers: a preferred's par value, cumulative feature and monthly dividends target income investors; a convert's low coupon and high conversion premium target arbitrage funds that buy volatility. If the buyers leave, the product doesn't sell.",
  ],

  quiz: [
    {
      q: "Under \"liabilities determine assets,\" which institution is best suited to hold highly illiquid private equity and alternatives?",
      options: [
        "A government money-market fund",
        "A bank funded mainly by checking deposits",
        "A leveraged hedge fund whose investors can redeem monthly",
        "A sovereign wealth fund with almost no liabilities coming due",
      ],
      answer: 3,
      explain: "A sovereign fund's or endowment's liabilities are close to perpetual and **can't be run on**, so it can bear the lowest liquidity and the longest horizons. Money funds and banks face liabilities that can be withdrawn at any time, so they must hold short, liquid assets.",
    },
    {
      q: "A pension's liabilities have a modified duration of about 11; its assets are all 10-year Treasuries with a modified duration of about 7.7; both are worth about $145.5 million. What happens if rates fall 1 percentage point?",
      options: [
        "Assets and liabilities rise by the same percentage, so nothing changes",
        "Liabilities rise more than assets, opening a funding gap of about $6 million",
        "Assets rise more than liabilities, creating a surplus",
        "Falling rates are always good for pensions",
      ],
      answer: 1,
      explain: "Liabilities rise about 12.1% (to about $163.1M) while assets rise only about 8.0% (to about $157.1M): **a gap of about $6M.** When assets are shorter than liabilities, falling rates make a pension poorer — which is why pensions buy long bonds and use LDI.",
    },
    {
      q: "A private credit loan pays \\(\\mathrm{SOFR} + 6\\%\\) with SOFR around 3.9%; the expected default rate is 3% a year and loss given default is 50%. What is the yield after expected losses?",
      options: [
        "About 8.4%",
        "About 9.9%",
        "About 6.0%",
        "About 12.9%",
      ],
      answer: 0,
      explain: "The coupon is about \\(3.9\\% + 6\\% = 9.9\\%\\); \\(\\text{expected loss} = \\mathrm{PD} \\times \\mathrm{LGD} = 3\\% \\times 50\\% = 1.5\\%\\); \\(9.9\\% - 1.5\\% \\approx\\) **8.4%**. The excess return that remains is mostly compensation for illiquidity and complexity.",
    },
    {
      q: "Why can a highly volatile company like Strategy issue convertible bonds with coupons near zero?",
      options: [
        "Because the law forbids convertibles from paying interest",
        "Because the main buyers are retirees seeking steady income",
        "Because the main buyers are convertible-arbitrage funds buying the embedded option and volatility; the more volatile the stock, the more the option is worth and the lower the coupon they accept",
        "Because convertibles rank ahead of all other debt",
      ],
      answer: 2,
      explain: "\\(\\text{Convertible} = \\text{bond floor} + \\text{call option}\\) (Stage 6.4). Arbitrage funds buy the convert and short the stock, harvesting **volatility**; the more volatile the underlying, the more the option is worth, so the issuer can raise money at a lower coupon (Stage 17.2).",
    },
    {
      q: "Which of these is the concern regulators raise most often about private credit?",
      options: [
        "Its loan rates are too low for investors to earn anything",
        "Its loans lack market prices and are marked by models, and they're increasingly sold to retail in \"periodically redeemable\" wrappers, creating a liquidity mismatch",
        "It is funded entirely by the Federal Reserve",
        "It enjoys exactly the same deposit insurance as banks",
      ],
      answer: 1,
      explain: "The core worries about private credit are **opaque valuation** and **liquidity mismatch**: the underlying loans can't be sold, yet products promise periodic redemptions. And with banks and insurers linked to it through financing and holdings, the risk can circle back into the regulated system.",
    },
  ],

  further: [
    { label: "Financial Stability Board: annual Global Monitoring Report on Non-Bank Financial Intermediation", url: "https://www.fsb.org/work-of-the-fsb/financial-innovation-and-structural-change/non-bank-financial-intermediation/" },
    { label: "IMF Global Financial Stability Report (April 2024), Chapter 2: the rise and risks of private credit", url: "https://www.imf.org/en/Publications/GFSR/Issues/2024/04/16/global-financial-stability-report-april-2024" },
    { label: "Federal Reserve: Financial Stability Report (regular reviews of nonbanks, hedge-fund leverage and private credit)", url: "https://www.federalreserve.gov/publications/financial-stability-report.htm" },
    { label: "Federal Reserve Z.1 Financial Accounts of the United States: official data on which sectors hold which assets", url: "https://www.federalreserve.gov/releases/z1/" },
  ],
};
