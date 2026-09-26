export default {
  id: "strive-sata",
  stage: 17,
  order: 5,
  title: "Strive & SATA: The Preferred-Only, No-Debt Model of Amplified Bitcoin",
  difficulty: "dat",
  prereqs: ["strategy-preferreds", "amplification"],

  oneLiner:
    "Strategy amplifies bitcoin with convertibles plus five preferreds. Strive (Nasdaq: ASST) took another road: **one perpetual preferred, SATA, and not a dollar of debt**. After acquiring Semler Scientific it paid off Semler's loan and swapped or bought back its convertibles, and as of September 2026 it is \"debt-free, with zero margin requirements, and zero encumbered Bitcoin.\" SATA is cumulative, variable-rate (**13.00%** since April 2026) and **pays daily**, with about **$1.12 billion** outstanding. This lesson takes apart its terms, its rate history and the Semler deal, and sets it beside Strategy. **Is a structure without debt safer? It depends which floor you're standing on.**",

  intuition: `
Imagine two companies that both want to "amplify bitcoin." Each holds $1 billion of bitcoin and wants to layer $300 million of leverage on top of its common stock.

- **Company A** (Strategy-style): $150 million of convertibles + $100 million of senior preferred + $50 million of junior preferred. That is Orange Corp.
- **Company B** (Strive-style): the whole $300 million raised through **a single** cumulative preferred.

The two common stocks are amplified exactly the same: if bitcoin rises 10%, the bitcoin value behind each common stock rises about 14.3% (Stage 16.4). The difference is **where the risk lands**:

- Company A has **debt**. The convertibles have maturity and put dates; failing to pay is a default, and creditors can take the company to court. The debt also puts one more group of claimants in the queue ahead of every preferred.
- Company B has **no debt**: no maturity date, no put date, no margin. The worst case is **suspending the preferred dividend**, which is not a default, only an arrear (it's cumulative). The price: the preferred carries **all** $300 million of leverage **alone**, so every dollar of it has the same coverage of $1B ÷ $0.3B ≈ **3.3x**. There is no 4x "front seat" like Company A's senior preferred.

That is Strive's choice. Its SATA closing release said the company would "finance its Bitcoin amplification exclusively through perpetual preferred equity," and its Q1 2026 release said "Strive stands debt-free, with zero margin requirements, and zero encumbered Bitcoin."

Read that sentence all the way through, though. **For the common and for the company as a whole, no debt means no "maturity crisis." For SATA holders, no debt means nobody stands in front of them, but also that SATA itself is the entire leverage.** In September 2026 SATA's notional was about $1.12 billion against about $2.22 billion of bitcoin: the preferred equals about **50%** of the bitcoin's value (Strive's own "Amplification Ratio" of 50.4%). On the same formula, Strategy's debt plus preferred is about 30% of its bitcoin.

This lesson sits on **Idea ② (balance sheets and claims)**: the same leverage can be written as very different bundles of claims. It also sits on **Idea ④ (risk and leverage)**: removing debt doesn't make the risk disappear; it swaps "default and refinancing" risk for "dividend suspension and thinner coverage." **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**

**In this lesson we break it into five pieces:**

- **① Who Strive is: from asset manager to a listed "amplified bitcoin" company**
- **② The SATA term sheet: cumulative, variable-rate, paid daily**
- **③ Rate history and rate rules: 12.00% to 13.00%, and an 18-month dividend reserve**
- **④ The Semler deal: buy a DAT, then zero out its debt**
- **⑤ Strive versus Strategy: two structures, one question**
`,

  mechanics: `
### ① Who Strive is: from asset manager to a listed "amplified bitcoin" company

- **Origins.** Strive Asset Management was founded in 2022 by Vivek Ramaswamy and Anson Frericks (per secondary sources such as Wikipedia). Matt Cole has been CEO since April 2023 and also Chairman since September 2025; Ben Pham is CFO.
- **How it listed.** On May 7, 2025 it announced a merger with the already-listed Asset Entities (ticker ASST). On May 27, 2025 it announced a **$750 million private placement (PIPE)** at $1.35 a share, with attached warrants that could in theory raise about $750 million more. The merger closed on September 12, 2025 and the ticker stayed **ASST**. By September 30, 2025 the PIPE plus warrant exercises had raised $762.6 million.
- **First bitcoin.** 69 BTC arrived in kind on September 12, 2025; the first large purchase was 5,816 BTC at $116,047 each, about $675 million, bought close to the October 2025 peak.
- **Reverse split.** Class A and Class B shares went through a **1-for-20 reverse split** effective February 6, 2026 (the $1.35 warrant strike became $27.00).
- **Holdings** (company dashboard, as of September 18, 2026): **26,355 BTC** at an average cost of **$90,610**, worth about $2.22 billion at roughly $84,080. The latest purchase was 1,355 BTC at about $79,475 during September 14–18; no sales found.
- **Self-description.** The dashboard headline reads "ASST: The Amplified Bitcoin Exposure Equity," and the site navigation calls it "The Daily Dividend Company."

Notice that Strive's average cost ($90,610) is above bitcoin's September 2026 price: most of its coins were bought near the highs of late 2025 and early 2026. That doesn't change the analysis of terms, but it's a reminder that **a DAT's "cost" and "market value" can be far apart** (the fair-value accounting of Stage 15.6).

### ② The SATA term sheet: cumulative, variable-rate, paid daily

SATA's full name is Variable Rate Series A Perpetual Preferred Stock. Compiled from Strive's offering announcements, company dashboard and investor-relations releases:

<table class="pm">
<tr><th>Term</th><th>SATA</th><th>Source / date</th></tr>
<tr><td>IPO</td><td>2,000,000 shares (upsized) × $80, about $160M gross; priced 2025-11-05, listed on Nasdaq and closed 2025-11-10</td><td>GlobeNewswire 2025-11-05</td></tr>
<tr><td>Stated amount</td><td>$100</td><td>Same</td></tr>
<tr><td>Dividend rate</td><td>Variable, set monthly; 12.00% at IPO, <b>13.00% since 2026-04-15</b> (unchanged as of 2026-09-25)</td><td>Strive releases</td></tr>
<tr><td>Cumulative?</td><td><b>Yes</b></td><td>Offering announcement</td></tr>
<tr><td>Payment frequency</td><td>Monthly (on the 15th) at launch; <b>daily since 2026-06-15</b>: the rate is still set monthly, and that month's dividend is paid in equal amounts on each business day</td><td>Company dashboard</td></tr>
<tr><td>Ranking</td><td>Senior to Class A and Class B common; not secured by bitcoin; with no company debt, only ordinary liabilities rank ahead</td><td>Dashboard, 10-Q</td></tr>
<tr><td>Missed dividends</td><td>Compound at the rate + 25 bp, stepping up 25 bp a month, capped at 20%; holders may elect directors after 12 and 24 missed payments</td><td>Offering announcement</td></tr>
<tr><td>Issuer call</td><td>Optional redemption at <b>$110</b> or more; clean-up call (fewer than 25% of issued shares remain); tax-event call</td><td>Offering announcement</td></tr>
<tr><td>Holder put</td><td>On a fundamental change, at $100 plus accrued dividends</td><td>Offering announcement</td></tr>
<tr><td>Size</td><td>11,184,160 shares, about <b>$1.118B</b> notional (2026-09-18)</td><td>Company dashboard</td></tr>
<tr><td>Annual dividend obligation</td><td><b>$145.39M</b> (check: $1.118B × 13% ≈ $145.4M)</td><td>Company dashboard</td></tr>
<tr><td>Tax treatment</td><td>Distributions treated as return of capital; Form 8937 filed monthly</td><td>Company dashboard (Stage 17.7)</td></tr>
</table>

Compare it with STRC (Stage 17.4): both are "cumulative + variable rate + target price near $100" designs. Three key differences: SATA's **call price is $110** (STRC's is $101), leaving the price a higher ceiling; SATA's **penalty rate** is more finely stepped (+25 bp a month, capped at 20%); and SATA **already pays daily**, while STRC's daily payments await the October 28, 2026 vote.

### ③ Rate history and rate rules: 12.00% to 13.00%, and an 18-month dividend reserve

<table class="pm">
<tr><th>Dividend rate (annualized on $100 stated)</th><th>Effective / announced</th></tr>
<tr><td>12.00%</td><td>IPO, November 2025</td></tr>
<tr><td>12.25%</td><td>Announced 2025-12-15</td></tr>
<tr><td>12.50%</td><td>Periods starting on or after 2026-02-16</td></tr>
<tr><td>12.75%</td><td>Announced 2026-03-11</td></tr>
<tr><td><b>13.00%</b></td><td>Periods starting on or after 2026-04-15; unchanged as of 2026-09-25</td></tr>
</table>

**Rate rules** (company dashboard):

- No cut unless the prior month's average SATA price was at least $99.
- A cut may not exceed 25 bp plus any decline in one-month Term SOFR.
- At the IPO, the rate could not go below one-month SOFR.

**Company targets** (March 11, 2026): a trading range of $99–101; **no new SATA issued below $100**; and an **18-month dividend reserve**, 12 months in cash plus 6 months in STRC.

That last item is striking: **Strive keeps part of its dividend reserve in Strategy's STRC.** It holds 505,000 STRC shares (about $50 million bought in March 2026). One DAT's dividend reserve is another DAT's preferred: a concrete example of how the DAT ecosystem is intertwined, and it means Strive's reserve carries Strategy's credit risk.

Using the ruler of Stage 16.6 (derived from the dashboard): $229.6 million of cash + $49.75 million of STRC ≈ $279 million, divided by $145.4 million a year, is about **23 months**, above the 18-month target.

### ④ The Semler deal: buy a DAT, then zero out its debt

Semler Scientific (Nasdaq: SMLR) was itself a medical-device company holding bitcoin.

- **Announced September 22, 2025:** all stock, **21.05 Strive Class A shares per SMLR share** (pre-reverse-split), about a 210% premium, roughly $90.52 a share; pro forma, legacy Strive holders about 80.6% and Semler holders about 19.4%.
- **Approved January 13, 2026, closed January 16, 2026.** Semler brought **5,048 BTC**, for combined holdings of about 12,798 BTC at closing.
- **Cleaning up Semler's debt:**
  - The $20 million Coinbase loan secured by 398 BTC was **repaid on January 27, 2026**.
  - Of the $100 million of 4.25% convertible notes due 2030, **$90 million was exchanged for about 930,000 SATA shares** (priced January 22, closed January 28, alongside an upsized SATA follow-on of 1.32 million shares at $90). The remaining **$10 million was repurchased between April 1 and May 12, 2026**.
- **The result:** Strive went back to preferred-only amplification; on January 22, 2026 it described this as "returning to a perpetual-preferred only amplification model."
- **Loose ends:** Semler's diagnostics business (QuantaFlo) was still owned at June 30, 2026 and reported as a Medical Device segment with $1.39 million of Q2 revenue; Strive intends to "monetize" it. Whether Semler's $29.75 million settlement with the US Department of Justice (agreed September 10, 2025) was fully paid before closing is unverified.

**What the deal means mechanically:** a DAT carrying a secured loan and convertibles was absorbed; the loan was repaid and the convertibles became preferred stock. **The debt was "equitized."** The former convertible holders went from creditors with a maturity date to perpetual preferred shareholders. For Strive's common, both the margin risk (the secured loan) and the maturity risk (the converts) disappeared, and the price was a larger SATA.

### ⑤ Strive versus Strategy: two structures, one question

<figure><svg viewBox="0 0 640 310" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Each column = today's bitcoin value; claims stacked from the top</text><text x="170" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Strive (2026-09-18)</text><text x="470" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Strategy (2026-09-20, derived)</text><rect x="110" y="56" width="120" height="111" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="170" y="104" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">SATA</text><text x="170" y="120" text-anchor="middle" font-size="10" fill="var(--muted)">$1.12B · 50.4%</text><rect x="110" y="167" width="120" height="109" fill="var(--surface-2)" stroke="var(--line)"/><text x="170" y="220" text-anchor="middle" font-size="11" fill="var(--muted)">common 49.6%</text><rect x="410" y="56" width="120" height="21" fill="var(--surface-2)" stroke="var(--ink)"/><text x="400" y="70" text-anchor="end" font-size="10" fill="var(--ink)">debt 9.5%</text><rect x="410" y="77" width="120" height="4" fill="var(--orange)"/><text x="400" y="84" text-anchor="end" font-size="10" fill="var(--orange-ink)">STRF 1.8%</text><rect x="410" y="81" width="120" height="29" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="400" y="100" text-anchor="end" font-size="10" fill="var(--blue)">STRC 13.1%</text><rect x="410" y="110" width="120" height="11" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="400" y="120" text-anchor="end" font-size="10" fill="var(--btc)">junior prefs 5.2%</text><rect x="410" y="121" width="120" height="155" fill="var(--surface-2)" stroke="var(--line)"/><text x="470" y="200" text-anchor="middle" font-size="11" fill="var(--muted)">common 70.4%</text><line x1="90" y1="166" x2="560" y2="166" stroke="var(--red)" stroke-width="1.5" stroke-dasharray="6 4"/><text x="320" y="160" text-anchor="middle" font-size="10" fill="var(--red)">bitcoin −50%: claims above the line still covered</text><text x="170" y="294" text-anchor="middle" font-size="10" fill="var(--muted)">no debt · no put dates · SATA ~2.0x</text><text x="470" y="294" text-anchor="middle" font-size="10" fill="var(--muted)">$6.75B debt · puts in 2027–2029</text></svg><figcaption>On one formula, (debt + preferred) ÷ bitcoin value: Strive about 50%, Strategy about 30% (at roughly $84,000, ignoring cash). If bitcoin halves, SATA sits right at the edge of about 1x coverage; all of Strategy's preferreds remain above the line, but Strategy has debt and put dates.</figcaption></figure>

The two side by side (snapshots on different dates; use the companies' latest disclosures):

<table class="pm">
<tr><th>Dimension</th><th>Strive (ASST)</th><th>Strategy (MSTR)</th></tr>
<tr><td>Bitcoin</td><td>26,355 BTC (2026-09-18)</td><td>846,000 BTC (2026-09-20)</td></tr>
<tr><td>Debt</td><td><b>0</b></td><td>about $6.75B ($6.71B converts + other)</td></tr>
<tr><td>Preferred</td><td>One series, SATA, about $1.12B</td><td>Five series, about $14.3B (derived)</td></tr>
<tr><td>(Debt + preferred) ÷ bitcoin value</td><td>50.4% (Strive's published "Amplification Ratio")</td><td>about 30% (derived, BTC at about $84,000)</td></tr>
<tr><td>Coverage of the most junior preferred (ex cash)</td><td>SATA about 2.0x (derived)</td><td>Junior preferreds combined about 3.4x (derived)</td></tr>
<tr><td>Matching bitcoin "floor price" (ex cash)</td><td>about $42,400 (derived)</td><td>Juniors about $24,900; STRC about $20,500 (derived)</td></tr>
<tr><td>Maturity / put pressure</td><td>None</td><td>About $5.9B of converts puttable by end-2028 (Stage 17.2)</td></tr>
<tr><td>Dividend reserve</td><td>Target 18 months (12 cash + 6 STRC); about 23 months derived</td><td>Policy minimum 12 months; about 37 months derived ($5.04B USD Reserve)</td></tr>
<tr><td>What it calls the "premium"</td><td>Doesn't use "mNAV": Common Equity Accretion Premium 33.0%, EV/Treasury Asset Value 1.52x, Multiple to Net Treasury Asset Value 2.14x</td><td>mNAV (2026 definition: share price ÷ net bitcoin per share), about 1.01x on 2026-08-21</td></tr>
</table>

How to read it:

- **"Amplification" means different things.** Strive's "Amplification Ratio" = (debt + preferred notional) ÷ bitcoin value = 50.4%. Strategy's "Amplification" = BTC Reserve ÷ Net Reserve (1.30x on August 23, 2026). **One English word, two formulas** (Stage 16.4). On a simple measure (bitcoin value ÷ (bitcoin value − preferred)), Strive's common has about 2.0x sensitivity to bitcoin and Strategy's about 1.3–1.4x: **Strive's common is the more amplified.**
- **SATA versus STRC coverage.** SATA is all of Strive's leverage, with coverage of about 2.0x (higher once the roughly $280 million of cash and STRC is added, for a floor price near $31,800). STRC sits behind debt and STRF at 5.7x on Strategy's method. **No debt doesn't automatically make the preferred safer.** What sets coverage is the total of all claims ahead of and including you, relative to the bitcoin.
- **A caution on BTC Yield.** Strive reports a 2026 year-to-date BTC Yield of +54.5% (11.1% in Q1, 23.9% in Q2). As Stage 16.3 warned, buying bitcoin with preferred money lifts "bitcoin per share," but the new preferred claim ranks ahead of the common, and **BTC Yield does not deduct it**.
- **The premium.** DWF Ventures counted only 4 of the 20 largest DATs trading above 1x mNAV in September 2026, and Strive was one of them; The Block's own mNAV for ASST was about 1.21x (September 26, 2026). Every source uses its own definition, so always say whose.

**The strongest case for:** no debt means no default trigger, no maturity wall and no margin calls. The worst case is suspending the dividend on a cumulative preferred, which buys the company time. A single-preferred structure is simple and transparent; daily payments and a variable rate appeal to cash-management buyers; and the Semler deal shows Strive will pay a price (a bigger SATA) to eliminate debt.

**The strongest case against:** SATA carries all of the leverage alone. A ratio of about 50% means that if bitcoin roughly halves, SATA's bitcoin coverage falls to about 1x. The 13% rate is the price of bitcoin credit risk, and the cash to pay it comes mainly from further issuance (common or SATA). Part of the dividend reserve is invested in another DAT's preferred. And the company's average cost of bitcoin is above today's price. "No debt" protects the common and the company's continued operation; it does **not** protect the preferred's coverage. Stage 18.5 puts Strive, Strategy and other DATs on a single scorecard. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "strive-sata",

  analogy: `
Two families each want to buy a big house, put in some of their own money, and raise the rest from others.

**The Strategy family** went to three groups. One is a **bank** (the convertibles): the IOU has a repayment date, and if they don't pay, it's off to court. The other two are **relative A** (senior preferred) and **relative B** (junior preferred): they don't ask for their money back on any date, just a share of the rent each year, and if there's no rent, it's written down as owed.

**The Strive family** went to **one group of relatives** only. No bank, no repayment date, and nobody can take them to court. Each year the relatives get a share of the rent; if there's none, it's written down, and the debt keeps growing, but nobody can take the house.

It sounds as though the Strive family is safer, and for **the people living in the house** (the common) it is: nobody can force them to sell at the worst moment. But stand on the **relatives'** side for a moment. In the Strategy household, relative A has only the bank in front of them, and relative B plus a big slice of the family's own money behind. In the Strive household, the relatives have lent about half of what the house is worth; if house prices halve, the house itself barely covers what they're owed.

So "no bank loan" answers the question "can anyone force me to sell the house?" It doesn't answer "how safe is the money people lent me?" **Two questions, two answers.**
`,

  misconceptions: [
    "**\"Strive has no debt, so SATA is safer than STRC.\"** — No debt means almost nobody stands ahead of SATA, but SATA is itself the entire leverage: about 50% of the bitcoin's value, for roughly 2.0x coverage. STRC sits behind debt and STRF with 5.7x on Strategy's method (about 3.6x without netting USD assets). Coverage is set by the total of all claims ahead of and including you, not by whether any of them is debt.",
    "**\"Strive's 50.4% Amplification Ratio can be compared directly with Strategy's 1.30x Amplification.\"** — They are different formulas: Strive's is (debt + preferred) ÷ bitcoin value; Strategy's is BTC Reserve ÷ Net Reserve. To compare them, first convert to the same formula.",
    "**\"SATA pays daily, so it's like a high-yield savings account.\"** — Daily payment just spreads each month's dividend evenly across business days; the annual total is still notional × 13%. It is a perpetual, cumulative preferred whose dividends are declared by the board, and its credit depends on bitcoin and on the company's continued fundraising.",
    "**\"Swapping Semler's convertibles into SATA made the debt disappear at no cost.\"** — The debt was indeed equitized, freeing the common from maturity and margin risk. But SATA grew, so the preferred claim sitting ahead of the common and the annual dividend bill both went up.",
    "**\"Strive's 54.5% BTC Yield shows its bitcoin is growing fastest.\"** — BTC Yield measures the change in \"bitcoin per share.\" Buying bitcoin with preferred money lifts it directly, without deducting the new preferred claim that ranks ahead of the common (Stage 16.3).",
  ],

  quiz: [
    {
      q: "As of September 2026, what ranks ahead of SATA in Strive's capital structure?",
      options: [
        "About $6.7 billion of convertibles",
        "A bank loan secured by bitcoin",
        "STRF",
        "Nothing but ordinary liabilities; Strive has no debt",
      ],
      answer: 3,
      explain: "Semler's Coinbase loan was repaid on January 27, 2026 and its convertibles were exchanged into SATA or bought back; Strive's dashboard shows \"No Debt Outstanding.\" **Only ordinary liabilities rank ahead of SATA.**",
    },
    {
      q: "SATA has about $1.118 billion of notional; Strive's bitcoin is worth about $2.22 billion. Ignoring cash, what is SATA's bitcoin coverage, and how far must bitcoin fall to bring it to about 1x?",
      options: [
        "About 5.7x; an 80% fall",
        "About 2.0x; a fall of about 50%",
        "About 1.3x; a 20% fall",
        "Infinite, because there is no debt",
      ],
      answer: 1,
      explain: "$2.22B ÷ $1.118B ≈ **2.0x**, a floor price of about $84,080 ÷ 2.0 ≈ $42,400, or bitcoin down about 50%. Adding the roughly $280 million of cash and STRC moves the floor to about $31,800.",
    },
    {
      q: "How has SATA's dividend rate evolved?",
      options: [
        "12.00% at IPO, then 12.25%, 12.50%, 12.75%, and 13.00% from April 15, 2026, unchanged as of September 25, 2026",
        "Fixed at 10%",
        "Cut from 13% to 9%",
        "It follows the fed funds rate, changing at each FOMC meeting",
      ],
      answer: 0,
      explain: "Like STRC, SATA is a **variable-rate, cumulative** design. The climb to 13.00% mainly reflects a bitcoin credit risk premium, not short-term rates.",
    },
    {
      q: "After Strive acquired Semler, what happened to Semler's $100 million of 4.25% convertible notes?",
      options: [
        "They were all repaid at maturity",
        "They all converted into ASST common",
        "$90 million was exchanged for about 930,000 SATA shares, and the remaining $10 million was repurchased in April–May 2026",
        "They remain outstanding until 2030",
      ],
      answer: 2,
      explain: "This is **equitizing debt**: the former creditors became perpetual preferred holders, and Strive returned to preferred-only amplification.",
    },
    {
      q: "What is Strive's dividend-reserve target?",
      options: [
        "12 months, all cash",
        "18 months: 12 months in cash plus 6 months in STRC",
        "24 months, all bitcoin",
        "It has no reserve target",
      ],
      answer: 1,
      explain: "The March 11, 2026 target is an **18-month dividend reserve**, with 6 months held in Strategy's STRC: one DAT's reserve invested in another DAT's preferred.",
    },
  ],

  further: [
    { label: "Strive treasury dashboard: holdings, SATA terms, Amplification Ratio and dividend reserve (use the latest data)", url: "https://strive.com/treasury" },
    { label: "SATA IPO pricing announcement (GlobeNewswire, 2025-11-05)", url: "https://www.globenewswire.com/news-release/2025/11/05/3182075/0/en/Strive-Announces-Pricing-of-Upsized-Initial-Public-Offering-of-SATA-Stock.html" },
    { label: "Strive: completion of the Semler Scientific acquisition (2026-01-16)", url: "https://investors.strive.com/news-events/news-releases/news-details/2026/Strive-Announces-the-Completion-of-Semler-Scientific-Acquisition/default.aspx" },
    { label: "Strive: SATA dividend rate raised to 13.00% (press release)", url: "https://investors.strive.com/news-events/news-releases/news-details/2026/Strive-Announces-Increase-to-SATA-Perpetual-Preferred-Stock-Dividend-Rate-to-13-00-and-Bitcoin-Buy/default.aspx" },
    { label: "Strive Q2 2026 10-Q (SEC EDGAR)", url: "https://www.sec.gov/Archives/edgar/data/0001920406/000162828026054985/asst-20260630.htm" },
  ],
};
