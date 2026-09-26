export default {
  id: "what-is-bond",
  stage: 4,
  order: 1,
  title: "What a Bond Is: Coupon, Principal & Maturity",
  difficulty: "core",
  prereqs: ["present-value", "risk-free-rate"],

  oneLiner:
    "A bond is an **IOU you can sell**. You lend an issuer $1,000 today; in return it promises a fixed **coupon** every year and your **principal** back on the **maturity date**. It turns the price of time (Idea ①) into a concrete contract, and it records that contract on two balance sheets at once: an asset on yours, a liability on theirs (Idea ②). Using the course's standard example, a **$1,000 face, 5% coupon, 10-year bond**, this lesson takes a bond apart piece by piece and lays the foundation for the whole TradFi toolkit.",

  intuition: `
Remember the first headline Lin scrolled past back in Stage 0.1? “The 30-year US Treasury yield climbs above 5%.” At the time every word in it was foreign: what is a Treasury, what is a yield, and why thirty years? The beginner tier covered money, interest and the economy. From this lesson on we are in the **principles tier**, and the first job is to take the thing called a “bond” completely apart. By Stage 4.5, Lin's first question will have a full answer.

Start with the plainest IOU there is. A friend is opening a bakery and borrows $1,000 from you. You both sign a piece of paper:

- “I owe you $1,000, to be repaid in **10 years**.”
- “Every year until then I will pay you **5%** interest, which is **$50**.”

That piece of paper is a bond. Real bonds simply standardize every detail:

- **Face value (principal)**: the money repaid at the end, here $1,000.
- **Coupon**: the yearly interest, fixed as a percentage of face value, here 5% or $50. US Treasuries and most corporate bonds pay **semiannually**, so in practice you receive $25 every six months.
- **Maturity date**: the last day, when the principal arrives along with the final coupon.
- **Issuer**: the borrower. The US Treasury, a company, a city.
- **Terms**: who gets paid first, whether there is collateral, whether the issuer can repay early.

Now add up the ten years of cash: 20 payments × $25 = $500 of interest, plus the $1,000 principal returned at the end, for **$1,500** in total. You hand over $1,000 and get $1,500 back. The catch is that you wait ten years for it.

The big difference from lending to a friend: **this IOU can be sold**. Need cash in year three? Sell the bond to someone else. The buyer steps into your shoes, and every future coupon and the principal now go to them. Because it can be sold, a bond has a **price**, and that price changes every day. Why it changes, and by how much, is the subject of Stage 4.2.

This lesson rests on two of the course's four ideas:

- **Idea ① The price of time.** A bond is the standard contract for swapping money today for money later, and the coupon is the price of time written into that contract. Stage 2.3 showed that any asset is worth the present value of its future cash flows. A bond is the cleanest example of that sentence, because every one of its cash flows is **written down in advance**.
- **Idea ② Balance sheets & claims.** The bond in your hands is a liability on the issuer's balance sheet. It spells out **when, and in what order**, you get paid. The capital stack in Stage 6.1 and the convertible notes that bitcoin treasury companies issue in Stage 17.2 are both extensions of this idea.

Why does the TradFi toolkit start with bonds? Because **bonds are the anchor that the whole financial system prices against**. The US Treasury yield is the risk-free rate from Stage 2.4. Corporate bonds, mortgages, stocks, preferred shares, even the preferreds that bitcoin treasury companies sell, are all priced as “the Treasury yield plus a layer of compensation for risk.” Understand Treasuries first, and everything later has a reference point.

**In this lesson we break it into five pieces:**

- **① The five parts of an IOU**
- **② The life of the standard bond: a cash-flow timeline**
- **③ Who issues bonds: Treasuries, agencies, corporates and munis**
- **④ Bills, notes, bonds and zero-coupon bonds**
- **⑤ A bond is a claim written on two balance sheets**
`,

  mechanics: `
### ① The five parts of an IOU

A bond contract (the indenture, summarized in the offering documents) runs to many pages, but only five parts decide what the bond is worth:

- **Face value (par)**: the amount repaid at maturity and the base the coupon is calculated on. The standard face value for US Treasuries and corporates is $1,000, though you can buy Treasuries in $100 increments on TreasuryDirect.
- **Coupon rate**: how much interest is paid per year as a share of face value. A 5% coupon on $1,000 is $50 a year. **The coupon rate is fixed at issue and never changes afterward.** That single fact is the root of the seesaw in Stage 4.2.
- **Payment frequency**: Treasuries and most US corporates pay twice a year; many European bonds pay annually; mortgage-backed securities pay monthly.
- **Maturity**: the repayment date. The longer the remaining life, the more uncertain the future and the more the price reacts to interest rates. Stage 4.4 puts a number on that.
- **Issuer and terms**: who owes you, and where you stand in line. Is there collateral? Who ranks ahead of you? Can the issuer repay early (a callable bond)? Can you demand early repayment (a putable bond)? Can you swap it into shares (a convertible, Stage 6.4)?

Two words that people constantly confuse, so separate them now:

- The **coupon rate** is the fixed number in the contract. It sets the size of each payment.
- The **yield** is the annual return you actually earn if you buy at **today's market price** and hold to maturity. The two are equal only when the price is exactly face value. Stage 4.2 shows how they come apart.

When the news says “the 10-year Treasury yield is 5.17%” (the US Treasury daily par curve for September 25, 2026), that is a yield, not a coupon.

### ② The life of the standard bond: a cash-flow timeline

The course's standard example is a **$1,000 face, 5% coupon, 10-year bond paying semiannually**. Here is its whole life on one timeline:

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The life of the standard bond: $1,000 face · 5% coupon · 10 years</text><line x1="36" y1="160" x2="612" y2="160" stroke="var(--line)" stroke-width="1.5"/><rect x="42" y="160" width="20" height="70" rx="3" fill="var(--red)" opacity=".85"/><text x="52" y="246" text-anchor="middle" font-size="11" fill="var(--red)" font-weight="600">−1,000</text><text x="52" y="260" text-anchor="middle" font-size="10" fill="var(--muted)">buy today</text><g fill="var(--blue)"><rect x="98" y="146" width="16" height="14" rx="2"/><rect x="152" y="146" width="16" height="14" rx="2"/><rect x="206" y="146" width="16" height="14" rx="2"/><rect x="260" y="146" width="16" height="14" rx="2"/><rect x="314" y="146" width="16" height="14" rx="2"/><rect x="368" y="146" width="16" height="14" rx="2"/><rect x="422" y="146" width="16" height="14" rx="2"/><rect x="476" y="146" width="16" height="14" rx="2"/><rect x="530" y="146" width="16" height="14" rx="2"/><rect x="580" y="46" width="20" height="14" rx="2"/></g><rect x="580" y="60" width="20" height="100" rx="2" fill="var(--orange)"/><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="106" y="140">+50</text><text x="160" y="140">+50</text><text x="214" y="140">+50</text><text x="268" y="140">+50</text><text x="322" y="140">+50</text><text x="376" y="140">+50</text><text x="430" y="140">+50</text><text x="484" y="140">+50</text><text x="538" y="140">+50</text><text x="52" y="176">0</text><text x="106" y="176">1</text><text x="160" y="176">2</text><text x="214" y="176">3</text><text x="268" y="176">4</text><text x="322" y="176">5</text><text x="376" y="176">6</text><text x="430" y="176">7</text><text x="484" y="176">8</text><text x="538" y="176">9</text><text x="590" y="176">10 yrs</text></g><text x="590" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">+1,050</text><text x="540" y="96" text-anchor="end" font-size="11" fill="var(--orange-ink)">$1,000 principal repaid</text><text x="540" y="110" text-anchor="end" font-size="10" fill="var(--muted)">+ the final year's $50 coupon</text><text x="320" y="210" text-anchor="middle" font-size="11" fill="var(--ink)">$50 of coupons a year (paid as $25 every six months) · total: $500 interest + $1,000 principal = $1,500</text><text x="320" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">Bar heights are schematic (to scale, the coupon bars would be nearly invisible)</text></svg><figcaption>Every cash flow of a bond is fixed on the day it is issued: one payment out, a string of coupons, one repayment. Its value is that string of cash flows discounted at the market rate.</figcaption></figure>

This is the cash-flow timeline from Stage 2.3, except that every payment is guaranteed by contract. So the value of a bond can be written down directly:

$$
Price = Σ coupon per period ÷ (1 + y/2)^k  +  face ÷ (1 + y/2)^n
k = 1, 2, …, n  (n = years × 2, one period every six months);  y = the annual yield the market demands
$$

Check it on the standard bond:

- If the market demands exactly 5%, the price is **$1,000.00**. The coupon exactly compensates for time, so the bond trades at face value, or “at par.”
- If the market demands 6%, the price is **$925.61**. If it demands only 4%, the price is **$1,081.76**. (All three come from bondPrice in _fin.js.)

Those last two numbers are the entire secret of Stage 4.2: **the contract fixes the cash flows, so the only thing left to move is the price.**

One often-missed detail: **accrued interest**. If you buy between coupon dates, you owe the seller the slice of the next coupon they have already “earned” but not yet received. Screen quotes show the “clean” price without it; you pay the “dirty” price with it. That is why the amount on a bond trade confirmation is rarely a round number.

### ③ Who issues bonds: Treasuries, agencies, corporates and munis

Put the same five parts on different issuers and the risk changes completely:

<table><tr><th>Issuer</th><th>Examples</th><th>Main risks</th><th>What it means for the investor</th></tr><tr><td>US Treasury</td><td>T-bills, the 10-year note, the 30-year bond</td><td>Interest-rate and inflation risk; default risk very low</td><td>The global pricing anchor (Stage 2.4); the most liquid market</td></tr><tr><td>Government-sponsored agencies</td><td>Fannie Mae and Freddie Mac debt and mortgage-backed securities</td><td>Rate risk, prepayment risk</td><td>Yields a little above Treasuries</td></tr><tr><td>Corporations</td><td>Apple, banks, airlines, a bitcoin treasury company's convertible notes</td><td>Credit risk (default) plus rate risk</td><td>Yield = Treasury + credit spread (Stage 4.6)</td></tr><tr><td>States and cities (munis)</td><td>Schools, water systems, airports</td><td>Local fiscal risk</td><td>Interest usually exempt from federal income tax</td></tr><tr><td>Foreign governments</td><td>Japanese JGBs, UK gilts, German Bunds</td><td>Rate risk plus currency risk</td><td>Long ends sold off together in 2025–2026 (Stage 4.5)</td></tr></table>

For a sense of scale: **debt held by the public is about $32.36 trillion** (as of September 24, 2026, Treasury's Debt to the Penny; add the trust funds' intragovernmental holdings and total federal debt is about $40.07 trillion). Stage 3.3 covered why that money was borrowed and who lent it. On most measures, the global stock of bonds is in the same league as, or larger than, the world's entire stock market. **The bond market is not the stock market's sidekick.** It just makes the news more quietly.

A single issuer can also sell debt at different “positions” in line. Secured bonds come first, unsecured ones after, subordinated debt later still. Stage 6.1 draws that pecking order as a building with floors.

### ④ Bills, notes, bonds and zero-coupon bonds

The Treasury sorts its debt by maturity, and the names are worth knowing because the news uses them daily:

- **Treasury bills (T-bills)**: one year or less (4 weeks to 52 weeks). **No coupon.** They are sold at a discount to face value and repaid at face value; the difference is the interest. On September 25, 2026 the 3-month bill yielded about 4.24%.
- **Treasury notes**: 2, 3, 5, 7 and 10 years, paying coupons every six months. **The 10-year** is the most watched interest rate on Earth; mortgages and corporate bonds key off it.
- **Treasury bonds**: 20 and 30 years. **The 30-year** is the longest US government debt and the star of that Stage 0.1 headline. Stage 4.5 is devoted to it.
- There are also **TIPS** (Treasury Inflation-Protected Securities), whose principal is adjusted for CPI (Stage 2.5 reads real yields off them), and 2-year **floating-rate notes (FRNs)**, whose coupon tracks the T-bill rate.

A **zero-coupon bond** takes “no coupon” to the limit: it pays a single amount, the face value, at maturity. A 10-year zero at a 5% market yield (semiannual compounding) costs 1,000 ÷ 1.025^20 ≈ **$610.27**. You pay $610 now, collect $1,000 in ten years, and receive nothing in between.

Zeros matter because they are **the purest price of time**. With only one cash flow, a zero's yield is simply the discount rate for that one horizon. Wall Street strips the individual coupons and principal off ordinary Treasuries and sells each piece separately as a zero (the product is literally called STRIPS), turning one coupon bond into a string of zeros. Run it the other way and **every coupon bond is just a bundle of zero-coupon bonds**. That is the underlying view behind the yield curve in Stage 4.3 and duration in Stage 4.4.

### ⑤ A bond is a claim written on two balance sheets

Back to Idea ②. You buy that $1,000 bond:

- On **your** balance sheet: a new asset, “bond, $1,000,” and $1,000 less cash.
- On the **issuer's** balance sheet: $1,000 more cash, and a new liability, “bonds payable, $1,000.”

**The same piece of paper is an asset on one side and a liability on the other.** Everything in finance works this way; Stage 1.1 showed that even money is somebody's liability. Seeing it this way tells you three things at once:

- **A bondholder's upside is capped.** However well the issuer does, you get $50 a year and $1,000 back. The shareholders keep everything else (Stage 5.1).
- **A bondholder's downside depends on position.** If the issuer cannot pay, how much you recover depends on which floor of the capital stack you sit on and whether you hold collateral (Stage 6.1, Stage 6.6).
- **Default is a legal event.** Missing a coupon or principal payment is a default; creditors can go to court and force a restructuring or bankruptcy. A preferred dividend, by contrast, can be skipped without triggering default (Stage 6.2), and that is the most basic difference between debt and preferred stock.

**Bonds in the new era.** This oldest of claims is being moved into new plumbing:

- The US GENIUS Act requires compliant stablecoins to hold 1:1 reserves in cash, T-bills of 93 days or less, and similar assets. **Behind every dollar stablecoin sits, in large part, a T-bill** (Stage 13.2).
- Tokenized Treasury funds record ownership of T-bills on a blockchain, so the shares can move 24/7 and serve as on-chain collateral (Stage 14.2).
- Bitcoin treasury companies raise money with **convertible notes** to buy bitcoin: bonds with a low or even zero coupon plus the right to swap into shares (Stage 6.4, Stage 17.2).

The wrapping differs every time; the skeleton is always the five parts in this lesson. **See the skeleton first, then the wrapping.** That is how this course reads any new financial product.
`,

  demo: "what-is-bond",

  analogy: `
Think of a bond as **a rental contract on a house**.

Your $1,000 does not buy a building. It buys a contract: the tenant (the issuer) pays you $50 of rent a year (the coupon), and when the ten-year lease ends, hands back the $1,000 deposit in full (the principal). Rent and deposit are both written into the contract, not a cent more or less.

The contract can be sold. If you want cash in year three, you sell the “right to collect rent” to someone else. For how much? That depends on **what similar contracts pay right now**. If new leases pay $60 a year, nobody will give you $1,000 for one that pays $50, so you have to cut your price. If new leases pay only $40, yours is in demand and you can ask more. That is the seesaw of Stage 4.2.

Who the tenant is matters too. Renting to the US Treasury is like renting to a tenant who will always be around and can print the currency the rent is paid in. The rent is the lowest on the market, but it almost never goes unpaid. Renting to a young startup pays more rent, but if the tenant vanishes, you end up in court waiting to see how much of the deposit comes back (Stage 4.6, Stage 6.6).

And a zero-coupon bond? That is a lease with no monthly rent, settled in one payment at the end. You pay $610 today, collect $1,000 in ten years, and time does all the earning in between.
`,

  misconceptions: [
    "**“A 5% coupon means I earn 5%.”** Only if you buy at the $1,000 face value. Buy at $925.61 and the same $50 coupons plus the extra $74 you get back at maturity work out to about 6% a year; buy at $1,081.76 and it is about 4%. The coupon is fixed; the yield moves with the price (Stage 4.2).",
    "**“Treasuries are risk-free, full stop.”** US Treasuries carry almost no **default** risk, but they do carry **interest-rate risk** and **inflation risk**. When market rates rise, long Treasuries can fall hard in price; that is what sank Silicon Valley Bank in 2023 (Stage 10.3). Inflation also erodes what a fixed coupon can buy (Stage 2.5).",
    "**“I can't get my money back before maturity.”** Bonds trade in the secondary market every day, and US Treasuries are among the most liquid markets on Earth. You can always sell; the price just depends on where market rates are that day, so it may be above or below what you paid.",
    "**“A zero-coupon bond pays no interest, so it's a bad deal.”** The interest is hidden in the discount. Pay $610.27, collect $1,000 in ten years, and you have earned exactly 5% a year. A zero simply pays all of its interest in one lump on the last day.",
    "**“Bonds are for cautious retirees and have nothing to do with the bitcoin world.”** Stablecoin reserves are mostly short T-bills, tokenized Treasury funds are on-chain collateral, and bitcoin treasury companies raise money with convertible notes and preferreds. Much of the new financial plumbing has bonds flowing through it.",
  ],

  quiz: [
    {
      q: "A bond with $1,000 face value, a 5% coupon, 10 years to maturity and semiannual payments is held to maturity. How much cash does it pay in total?",
      options: [
        "$1,050",
        "$1,500",
        "$1,628.89",
        "$500",
      ],
      answer: 1,
      explain: "**20 payments × $25 = $500 of interest, plus the $1,000 principal repaid at maturity = $1,500.** $1,628.89 is what $1,000 grows to at 5% compounded for ten years, which is not the bond's cash flow.",
    },
    {
      q: "Which statement about US Treasury bills is correct?",
      options: [
        "They mature in 10 years and pay coupons every six months",
        "Their principal is adjusted for CPI",
        "Their coupon floats with the federal funds rate",
        "They mature within a year, pay no coupon, and are sold at a discount and repaid at face value",
      ],
      answer: 3,
      explain: "**T-bills are short-term zero-coupon Treasuries**: the interest is the gap between the purchase price and face value. CPI-adjusted principal describes TIPS; a floating coupon describes FRNs; a 10-year semiannual payer is a Treasury note.",
    },
    {
      q: "You buy a corporate bond for $1,000. Through the lens of Idea ② (balance sheets & claims), which statement is most accurate?",
      options: [
        "It is an asset on your balance sheet and a liability on the company's",
        "You become a shareholder and share in all of the company's profits",
        "The company must keep the $1,000 in a bank account so it can repay you",
        "If the company stops paying interest, that is only a delay, not a default",
      ],
      answer: 0,
      explain: "**One bond: an asset on one side, a liability on the other.** A creditor's return is capped at coupons plus principal, and the leftover profit belongs to shareholders. Missing a coupon is a default; the thing that can be skipped without default is a preferred dividend (Stage 6.2).",
    },
    {
      q: "A 10-year zero-coupon bond with $1,000 face costs about $610 at a 5% yield (semiannual compounding). Why is a zero called the purest price of time?",
      options: [
        "Because it carries no risk of any kind",
        "Because its price never changes",
        "Because it has a single cash flow, so its yield is exactly the discount rate for that one horizon",
        "Because its coupon equals the inflation rate",
      ],
      answer: 2,
      explain: "**A zero has only one cash flow, at maturity**, with no coupons muddying the picture, so its yield tells you directly what $1 ten years from now is worth today. Any coupon bond can be split into a bundle of zeros, which is the underlying view behind the yield curve (Stage 4.3) and duration (Stage 4.4).",
    },
  ],

  further: [
    { label: "TreasuryDirect: official guide to bills, notes, bonds, TIPS and FRNs", url: "https://www.treasurydirect.gov/marketable-securities/" },
    { label: "US Treasury: Daily Treasury Par Yield Curve Rates", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve" },
    { label: "Investor.gov (SEC investor education): Bonds, types and risks", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds" },
    { label: "US Treasury Fiscal Data: Debt to the Penny", url: "https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/" },
    { label: "FINRA: Bonds (basics, risks and pricing)", url: "https://www.finra.org/investors/investing/investment-products/bonds" },
  ],
};
