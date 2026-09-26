export default {
  id: "strategy-preferreds",
  stage: 17,
  order: 3,
  title: "Strategy's Preferred Family: STRF, STRC, STRE, STRK & STRD Taken Apart",
  difficulty: "dat",
  prereqs: ["preferred-terms", "btc-rating"],

  oneLiner:
    "Strategy didn't issue \"a\" preferred; it issued **five**: STRF (senior, 10% fixed, cumulative), STRC (a monthly adjustable rate aimed at \"cash-like\" buyers), STRE (euro-denominated), STRK (8%, convertible into common) and STRD (10%, **non-cumulative**). One pile of bitcoin, cut into five claims with different risks and rewards: **investors segmented by appetite for risk**. This lesson checks the terms line by line (data as of August–September 2026, with sources) and puts them back in order of seniority: debt > STRF > STRC > STRE/STRK/STRD > common.",

  intuition: `
Stage 6.2 called preferred stock a "hybrid of debt and equity," and Stage 6.3 taught you to read the terms one line at a time: cumulative or not, callable or not, convertible or not, fixed or floating. Now take that term sheet and lay it over a real issuer.

Starting in February 2025, Strategy launched five perpetual preferreds in quick succession, which it markets collectively as "**Digital Credit**":

- **STRK "Strike"** (2025-02-05): an 8% fixed dividend, **convertible** into common. For buyers who want income and some upside.
- **STRF "Strife"** (2025-03-25): a 10% fixed dividend, cumulative, **ranking ahead of every other preferred**. For the most conservative income buyers.
- **STRD "Stride"** (2025-06-10): a 10% fixed dividend, **non-cumulative**. A skipped dividend is lost for good, so it ranks last and demands the highest yield.
- **STRC "Stretch"** (2025-07-29): a **monthly adjustable** dividend rate designed to hold the price near $100. For buyers who would otherwise own money funds or T-bills (Stage 17.4).
- **STRE "Stream"** (2025-11-13): a 10% fixed dividend, **denominated in euros** and listed in Luxembourg. For European investors.

Why so many? Think of an airline. One plane has first, business and economy. There's only one aircraft, but slicing the seats by what passengers will pay lets the airline earn more from the whole flight. **Strategy's "aircraft" is one pile of bitcoin, and the five preferreds are five cabins.** Some buyers want the front row (STRF), some want a stable price (STRC), some want euros (STRE), some want a lottery ticket (STRK), and some want the highest coupon and will accept that a skipped payment is simply gone (STRD). It's the same idea as the securitization tranching of Stage 10.2: **cut the risk of one pool of assets into layers and sell each to people with a different appetite for risk.**

This lesson sits on **Idea ② (balance sheets and claims)**: the five preferreds are five differently worded claims whose position is set by seniority. It also sits on **Idea ④ (risk and leverage)**: each one re-slices bitcoin's risk, and together they create the amplification of Stage 16.4, with roughly $15 billion of preferreds stacked on top of the common.

One thing to be clear about first: **all five are perpetual equity, not debt, and no bitcoin is pledged to any of them.** Their protection comes from two things: ranking ahead of the common, and the "coverage multiple" of the company's bitcoin relative to them (the BTC Rating of Stage 16.5). **This lesson explains mechanisms and analytical frameworks only; it is not investment advice. The offering documents govern the actual terms.**

**In this lesson we break it into six pieces:**

- **① Why a family: segmenting investors by appetite for risk**
- **② The master term sheet: five preferreds, line by line**
- **③ Seniority and BTC Rating: who ranks ahead of whom**
- **④ Series by series: the one switch that defines each**
- **⑤ Shared terms: liquidation preference, calls, puts and the daily-dividend proposal**
- **⑥ Size, the dividend burden, and the strongest case each way**
`,

  mechanics: `
### ① Why a family: segmenting investors by appetite for risk

A single preferred can have only one set of terms, so it can attract only one kind of buyer. A family lets the same issuer sell its credit to many buyers, each paying the price it is willing to pay. Use the "switches" of Stage 6.3 to see where each one sits:

<table class="pm">
<tr><th>Series</th><th>Switch it flips</th><th>Target buyer (our analysis)</th><th>What is traded for what</th></tr>
<tr><td>STRF</td><td>Top seniority + cumulative + penalty compounding + board seats</td><td>Conservative fixed-income buyers</td><td>Accepts a 10% fixed rate in exchange for the front seat</td></tr>
<tr><td>STRC</td><td>Variable rate (adjustable monthly), target price around $100</td><td>Cash-management and short-term income buyers</td><td>Accepts the risk of rate cuts in exchange for short duration (Stage 17.4)</td></tr>
<tr><td>STRE</td><td>Euro-denominated, listed in Luxembourg</td><td>European income buyers</td><td>Removes dollar FX risk for euro investors; junior ranking</td></tr>
<tr><td>STRK</td><td>Convertible into common; dividends payable in stock</td><td>Hybrid buyers who want income plus upside</td><td>Accepts a lower 8% dividend in exchange for an option on the common</td></tr>
<tr><td>STRD</td><td>Non-cumulative</td><td>Buyers chasing the highest coupon</td><td>Takes "skipped means gone" risk in exchange for the same 10% at a lower price (a higher real yield)</td></tr>
</table>

For the company, layering means **a lower overall cost of funds and a wider buyer base**. The price is complexity: each layer's coverage has to be computed separately, and the terms of one layer mesh with those of the others (the dividend stoppers of Stage 6.3).

### ② The master term sheet: five preferreds, line by line

Compiled from the preferred-stock table in Strategy's FY2025 10-K and each series' offering documents; notional outstanding is from the investor briefing dated August 23, 2026 (FWP filed August 24) and the August 7, 2026 briefing pages. \\(\\text{Notional} = \\text{shares} \\times \\$100\\) (or €100) stated amount.

<table class="pm">
<tr><th>Term</th><th>STRF "Strife"</th><th>STRC "Stretch"</th><th>STRE "Stream"</th><th>STRK "Strike"</th><th>STRD "Stride"</th></tr>
<tr><td>Full name</td><td>10.00% Series A Perpetual Strife Preferred</td><td>Variable Rate Series A Perpetual Stretch Preferred</td><td>10.00% Series A Perpetual Stream Preferred</td><td>8.00% Series A Perpetual Strike Preferred</td><td>10.00% Series A Perpetual Stride Preferred</td></tr>
<tr><td>First issued</td><td>2025-03-25</td><td>2025-07-29</td><td>2025-11-13</td><td>2025-02-05</td><td>2025-06-10</td></tr>
<tr><td>\\(\\text{IPO shares} \\times \\text{price}\\)</td><td>\\(8.5\\text{M} \\times \\$85\\)</td><td>\\(28{,}011{,}111 \\times \\$90\\)</td><td>\\(7.75\\text{M} \\times 80\\ \\text{euros}\\)</td><td>\\(7.3\\text{M} \\times \\$80\\)</td><td>\\(11{,}764{,}700 \\times \\$85\\)</td></tr>
<tr><td>IPO net proceeds</td><td>$710.9M</td><td>$2,473.8M</td><td>€608.7M (about $707M)</td><td>$563.2M</td><td>$979.5M</td></tr>
<tr><td>Stated amount</td><td>$100</td><td>$100</td><td>€100</td><td>n/a (liquidation preference $100)</td><td>$100</td></tr>
<tr><td>Dividend rate</td><td>10% fixed</td><td>Variable, set monthly; <b>12.00%</b> since 2026-07-01</td><td>10% fixed</td><td>8% fixed</td><td>10% fixed</td></tr>
<tr><td>Cumulative?</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td><b>No (non-cumulative)</b></td></tr>
<tr><td>Payment frequency</td><td>Quarterly (Mar/Jun/Sep/Dec 31)</td><td>Monthly at launch; <b>semi-monthly from 2026-06-30</b></td><td>Quarterly</td><td>Quarterly</td><td>Quarterly</td></tr>
<tr><td>Payable in</td><td>Cash</td><td>Cash</td><td>Cash (EUR)</td><td>Cash, MSTR stock, or a mix</td><td>Cash</td></tr>
<tr><td>Conversion</td><td>None</td><td>None</td><td>None</td><td><b>0.1 MSTR share per STRK share</b> (implied $1,000 per MSTR share)</td><td>None</td></tr>
<tr><td>Board seats if dividends missed</td><td>Yes</td><td>No</td><td>No</td><td>Yes</td><td>No</td></tr>
<tr><td>Fundamental-change put</td><td>Yes</td><td>Yes ($100 + accrued)</td><td>Yes (stated amount + accrued)</td><td>Yes (limited exception)</td><td>Yes</td></tr>
<tr><td>Exchange</td><td>Nasdaq</td><td>Nasdaq</td><td>Luxembourg Stock Exchange</td><td>Nasdaq</td><td>Nasdaq</td></tr>
<tr><td>Notional outstanding (date)</td><td>$1.284B (2026-08-23)</td><td>$9.972B (2026-08-23); about $9.32B (2026-09-20, derived from buybacks)</td><td>€775M, about $0.9B (2025-11-28; no later issuance found)</td><td>about $1.40B (2026-08-07)</td><td>about $1.40B (2026-08-07, approximate)</td></tr>
</table>

Three things to notice. **Every IPO priced below the stated amount** ($85, $80, $85, $90 and €80, all under 100), so first buyers earned a real yield above the coupon. **STRK's 8% is the lowest** because it carries a conversion option. **STRD's 10% matches STRF's, yet it is non-cumulative and ranks lower**, so the market will only take it at a lower price, meaning a higher real yield.

### ③ Seniority and BTC Rating: who ranks ahead of whom

The official order, for both liquidation and dividends:

$$
\\text{debt and subsidiary liabilities} > \\text{STRF} > \\text{STRC}
\\text{STRC} > \\text{STRE, STRK, STRD (junior preferreds)} > \\text{MSTR common}
$$

The basis: Strategy's August 2026 briefing says STRC "ranks behind debt, subsidiary liabilities and STRF, but ahead of Strategy's current STRE, STRK, STRD and common equity." STRE's pricing announcement (and press coverage) describes it as junior to STRF and STRC and senior to STRK, STRD and common. **We found no primary text stating whether STRK ranks ahead of STRD or the reverse.** Filings call all three "junior preferred." A December 2025 company deck adds up notionals in the order STRE, STRK, STRD to compute each one's BTC Rating, which implies that sequence, but **the point remains unverified**. The diagram below puts the three junior preferreds on one floor, with their internal order shown in dashed lines.

<figure><svg viewBox="0 0 640 310" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Strategy's capital stack (2026-08-23, BTC Reserve about $64.7B)</text><text x="140" y="42" text-anchor="middle" font-size="10" fill="var(--muted)">layer (most senior to most junior)</text><text x="400" y="42" text-anchor="middle" font-size="10" fill="var(--muted)">notional</text><text x="560" y="42" text-anchor="middle" font-size="10" fill="var(--muted)">BTC Rating*</text><rect x="30" y="50" width="330" height="36" rx="5" fill="var(--surface-2)" stroke="var(--line)"/><text x="44" y="73" font-size="12" font-weight="700" fill="var(--ink)">Debt (converts etc., senior unsecured)</text><text x="400" y="73" text-anchor="middle" font-size="12" fill="var(--ink)">$6.75B</text><text x="560" y="73" text-anchor="middle" font-size="11" fill="var(--muted)">fully offset by USD assets</text><rect x="30" y="92" width="330" height="36" rx="5" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="44" y="115" font-size="12" font-weight="700" fill="var(--orange-ink)">STRF · 10% cumulative</text><text x="400" y="115" text-anchor="middle" font-size="12" fill="var(--ink)">$1.28B</text><text x="560" y="115" text-anchor="middle" font-size="11" fill="var(--ink)">very high (~50x)</text><rect x="30" y="134" width="330" height="46" rx="5" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="44" y="157" font-size="12" font-weight="700" fill="var(--ink)">STRC · variable rate (12%) cumulative</text><text x="44" y="172" font-size="10" fill="var(--muted)">the largest layer</text><text x="400" y="162" text-anchor="middle" font-size="12" fill="var(--ink)">$9.97B</text><text x="560" y="162" text-anchor="middle" font-size="12" font-weight="700" fill="var(--blue)">5.7x (official)</text><rect x="30" y="186" width="330" height="54" rx="5" fill="var(--btc-soft)" stroke="var(--btc)"/><line x1="140" y1="186" x2="140" y2="240" stroke="var(--btc)" stroke-dasharray="3 3"/><line x1="250" y1="186" x2="250" y2="240" stroke="var(--btc)" stroke-dasharray="3 3"/><text x="85" y="208" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">STRE 10%</text><text x="85" y="224" text-anchor="middle" font-size="10" fill="var(--muted)">euro · cumulative</text><text x="195" y="208" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">STRK 8%</text><text x="195" y="224" text-anchor="middle" font-size="10" fill="var(--muted)">convertible · cumul.</text><text x="305" y="208" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">STRD 10%</text><text x="305" y="224" text-anchor="middle" font-size="10" fill="var(--red)">non-cumulative</text><text x="400" y="217" text-anchor="middle" font-size="12" fill="var(--ink)">~$3.71B</text><text x="560" y="210" text-anchor="middle" font-size="11" fill="var(--ink)">~4.3x (all three</text><text x="560" y="224" text-anchor="middle" font-size="11" fill="var(--ink)">treated as equal)</text><text x="195" y="252" text-anchor="middle" font-size="10" fill="var(--btc)">relative order of these three: unverified</text><rect x="30" y="262" width="330" height="34" rx="5" fill="var(--surface-2)" stroke="var(--line)" stroke-dasharray="4 3"/><text x="44" y="284" font-size="12" font-weight="700" fill="var(--muted)">MSTR common (residual claim)</text><text x="400" y="284" text-anchor="middle" font-size="11" fill="var(--muted)">everything left</text><text x="560" y="284" text-anchor="middle" font-size="10" fill="var(--muted)">*Strategy's method: USD assets net debt</text></svg><figcaption>Preferreds total about $14.97 billion (2026-08-23). BTC Rating, by Strategy's method, is \\(\\text{BTC Rating} = \\dfrac{\\text{BTC Reserve}}{\\text{this layer} + \\text{every more senior layer}}\\), with $6.69B of USD assets netted against debt. STRC's 5.7x is the company's published figure; the others are our derivations using the same method.</figcaption></figure>

BTC Rating is the central metric of Stage 16.5: **\\(\\text{BTC Rating} = \\dfrac{\\text{BTC Reserve}}{\\text{this layer's notional} + \\text{the notional of everything ranking ahead of it}}\\)**. Strategy's bridge nets $6.69 billion of USD assets (USD Reserve plus USD Cash) against $6.714 billion of debt, so STRC's denominator and rating are:

$$
\\text{denominator} \\approx \\$0.024\\text{B} + \\$1.284\\text{B} + \\$9.972\\text{B} \\approx \\$11.28\\text{B}
\\text{BTC Rating} = \\frac{\\$64.718\\text{B}}{\\$11.28\\text{B}} \\approx \\mathbf{5.7\\times}
$$

The matching "BTC Floor Price," where STRC's coverage would be exactly 1x, is about **$13,400**.

Without netting the USD assets (the more conservative view), STRC comes out around 3.6x and the three junior preferreds together around 3.0x. **The same rating can differ hugely depending on the method, so read the denominator before the number.** The company itself notes that BTC Rating "does not represent a rating from any rating agency." S&P's **issuer** credit rating for Strategy is B- (assigned October 27, 2025, affirmed in December 2025 with a stable outlook); we found no S&P ratings on the preferreds themselves.

For history (November 28, 2025, assuming bitcoin at $91,000, from a company deck): debt 7.2x, STRF 6.2x, STRC 4.8x, STRE 4.4x, STRK 4.0x, STRD 3.7x. That calculation adds the juniors in the order STRE, STRK, STRD, and **the further down the list, the thinner the coverage**.

### ④ Series by series: the one switch that defines each

**STRF: the front seat.** 10% fixed, cumulative, quarterly. It has the most teeth: missed dividends compound at the dividend rate plus 1 percentage point, rising another point each period up to 18%, and prolonged non-payment lets holders elect directors. It is the preferred that most resembles senior debt, yet it is still perpetual equity, and a skipped dividend is not a default.

**STRC: an attempt at something cash-like.** The rate is adjustable monthly, and the company uses it to anchor the price near $100. It has moved from 9.00% (July 2025) up to **12.00%** (from July 1, 2026); since June 30, 2026 it pays twice a month, and the company has proposed moving to daily. It is the largest layer and Strategy's main funding pipe (Stage 17.1). The mechanics are in Stage 17.4.

**STRE: STRF-style terms in euros.** 10% fixed, cumulative, €100 stated amount, with the same penalty on missed dividends (plus 1 point, stepping up each period, capped at 18%). It ranks behind STRC. For a dollar investor it adds euro exchange-rate risk; for a euro investor it removes it.

**STRK: a preferred with a lottery ticket.** The lowest coupon at 8%, but each share converts into 0.1 MSTR share, the equivalent of converting at $1,000 a share. Against MSTR at roughly $120–154 in August and September 2026, that option is deep out of the money. Its dividends **can be paid in MSTR stock** (the payment-in-kind valve of Stage 6.3: it saves cash but dilutes the common). Its liquidation preference was amended in 2025 to the greater of $100 and recent trading prices, ratified at the June 8, 2026 annual meeting.

**STRD: the back row, the highest coupon risk.** 10% fixed but **non-cumulative**: if the board doesn't declare it, that period's dividend is gone for good. There is no arrears mountain and no board-seat right. Its only protection is the current-period dividend stopper: if it isn't paid this period, the common can't receive distributions or be bought back this period either. As Stage 6.3 said, at the same 10%, the non-cumulative one must be cheaper.

### ⑤ Shared terms: liquidation preference, calls, puts and the daily-dividend proposal

- **Liquidation preference.** For STRF, STRC, STRE and STRD it "generally approximates to the greater of the trading price … or $100 (€100)." On December 31, 2025 STRF's liquidation preference was **$106.17**. So when a preferred trades above par, its claim rises with it; when computing coverage, check whether a figure uses notional or liquidation preference (on June 30, 2026 the preferreds' total liquidation preference was $15.462 billion, above the notional figure).
- **Compounding on unpaid dividends.** STRF and STRE: the regular rate plus 100 basis points, rising 100 bp per period, capped at 18%. STRC: compounding at the applicable rate. STRK's details are unverified.
- **Issuer calls.** Every series has a clean-up call (if fewer than 25% of originally issued shares remain) and a tax-event call. **STRC can also be redeemed at any time at $101 (or more) plus accrued dividends**, provided at least $250 million stays outstanding after a partial redemption. That puts a rough "ceiling" near $101 on STRC's price: the negative convexity of Stage 6.3.
- **Fundamental-change put.** All five have one, protecting holders from waking up with a different issuer.
- **The daily-dividend proposal.** On September 24–25, 2026 the board proposed moving STRF, STRC, STRK and STRD to **daily** dividend record dates, with a special meeting set for **October 28, 2026**. If approved, STRC's first daily payment is expected on November 2, 2026, and STRF, STRK and STRD from January 4, 2027. The vote decides.
- **Buybacks.** The Digital Credit Capital Framework of June 29, 2026 created a preferred repurchase program (Stage 17.4, Stage 17.6), raised from $1.0 billion to $2.0 billion by September 7, 2026, with STRC as the priority.

### ⑥ Size, the dividend burden, and the strongest case each way

Size: total preferred notional was **$14.966 billion** on August 23, 2026, of which STRC's $9.972 billion was two-thirds. After September's STRC buybacks it is about **$14.3 billion** (derived from the 8-Ks). Annual interest plus preferred dividends totalled **$1.703 billion** (August 23, 2026), of which STRC was $1.197 billion; after the buybacks, about $1.62 billion (derived). Cumulative preferred dividends paid reached $1.06 billion by July 26, 2026. The company says every dividend has been paid in full and on time since the first preferred launched, and it expects the distributions to be treated for tax purposes as a "return of capital" (Stage 17.7).

Using the ruler of Stage 16.6: the USD Reserve was $5.04 billion on September 20, 2026, which covers about \\(\\dfrac{\\$5.04\\text{B}}{\\$1.62\\text{B}} \\times 12 \\approx \\mathbf{37}\\) months at roughly $1.62 billion a year (derived).

**The strongest case for:** the five preferreds let Strategy raise about $15 billion with no principal to repay, no margin calls and no bitcoin pledged. Layering gives each buyer what it wants. Every layer sits under several times its size in bitcoin coverage, plus years of USD reserve. For buyers, it is a new kind of "bitcoin-backed credit" yielding well above Treasuries (on September 25, 2026 the 3-month bill was about 4.24% and the 30-year about 5.49%).

**The strongest case against:** a preferred has no maturity, so there's never a repayment date to test solvency. The investor's return depends entirely on the company **continuing** to pay dividends, and those are funded mainly by issuing new common, issuing new preferreds or selling bitcoin (Strategy's software business had only $122.4 million of revenue in Q2 2026). The juniors' coverage thins quickly when bitcoin falls hard. And the layers' terms are complex and the metrics keep shifting (notional versus liquidation preference, USD assets netted or not), so an ordinary buyer can struggle to see where they really stand. Stage 17.6 tests each layer against falling bitcoin, and Stage 18.1 values them. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "strategy-preferreds",

  analogy: `
Think of Strategy as **an aircraft that runs on a single fuel**, and the fuel is bitcoin. It has sold its seats in five cabins:

- **STRF is the first row of first class.** The ticket isn't cheap (10%), but in an emergency you're first off the plane; compensation for delays (unpaid dividends) keeps growing, and you can walk into the cockpit and speak up (elect directors).
- **STRC is the fully flexible economy ticket.** The fare is reset monthly, and the airline promises to keep the ticket resaleable at around $100, provided it's willing and able to keep adjusting the fare.
- **STRE is the same kind of seat bought in euros.** It sits behind STRC, but European passengers don't have to change currency.
- **STRK is a seat with an upgrade voucher.** The fare is cheaper (8%) because the ticket includes a voucher that might one day be swapped for common stock; it's just that the voucher's threshold is very high.
- **STRD is the back row, non-refundable, non-changeable.** The fare says 10%, but if a flight is cancelled, that flight's compensation is simply gone.

The common shareholders are **standing by the cabin door**. If the plane lands safely, everything left over is theirs; if it doesn't, they're last off. The more cabins, the further the people at the door are from "everything left over," but on a smooth flight, the more they get.
`,

  misconceptions: [
    "**\"Strategy's preferreds are bonds secured by bitcoin.\"** — They are perpetual **equity**, and no bitcoin is pledged to them. Their protection comes from seniority and from bitcoin's coverage of each layer's notional; skipping a dividend is not a default.",
    "**\"The five preferreds yield about the same, so they carry about the same risk.\"** — STRF ranks first, is cumulative, and has penalty compounding and board seats; STRD pays the same 10% but is non-cumulative, ranks last and has no board-seat right. Same coupon, completely different claims, and different market prices and real yields.",
    "**\"STRC's BTC Rating is 5.7x, so it would survive an 80% bitcoin drop.\"** — 5.7x is Strategy's method, which first nets $6.69 billion of USD assets against debt; without netting it's about 3.6x. And the rating measures only asset coverage **in a liquidation**, not whether the company can keep paying dividends.",
    "**\"The order among STRE, STRK and STRD is settled: STRE > STRK > STRD.\"** — The primary documents we read clearly confirm only that all three are \"junior preferred,\" behind STRF and STRC and ahead of the common. \"STRE ranks ahead of STRK and STRD\" comes from its pricing announcement and press coverage; for STRK versus STRD we found no explicit text, only the calculation order in a company deck that implies it.",
    "**\"STRK converts into common, so it moves with MSTR.\"** — The ratio is 0.1 share, the equivalent of converting at $1,000 a share. With MSTR far below that, the option is deep out of the money and STRK behaves mainly like an 8% cumulative preferred.",
  ],

  quiz: [
    {
      q: "Which Strategy preferred is **non-cumulative**?",
      options: [
        "STRF",
        "STRC",
        "STRD",
        "STRK",
      ],
      answer: 2,
      explain: "**STRD** is 10% fixed and non-cumulative: a dividend the board doesn't declare is lost for good. The other four are cumulative.",
    },
    {
      q: "Which ordering matches the official seniority?",
      options: [
        "Debt > STRF > STRC > STRE/STRK/STRD > common",
        "STRC > STRF > debt > common",
        "Debt > STRC > STRF > common",
        "STRF = STRC = STRD > debt",
      ],
      answer: 0,
      explain: "Officially, STRC ranks behind debt, subsidiary liabilities and STRF, and ahead of STRE, STRK, STRD and the common. **The order among the three junior preferreds is not verified in primary documents.**",
    },
    {
      q: "On August 23, 2026 Strategy reported STRC's BTC Rating at about 5.7x. How is the denominator built?",
      options: [
        "Only STRC's own $9.972 billion notional",
        "All preferreds plus all debt, with nothing netted",
        "The market cap of the common",
        "STRC's notional plus everything senior to it (debt, STRF), with USD assets netted against debt first",
      ],
      answer: 3,
      explain: "\\(\\dfrac{\\$64.718\\text{B}}{\\$6.714\\text{B} - \\$6.69\\text{B} + \\$1.284\\text{B} + \\$9.972\\text{B}} \\approx 5.7\\times\\). **Read the denominator before the number**: without netting USD assets, STRC is about 3.6x.",
    },
    {
      q: "Why is STRK's dividend only 8%, below STRF's 10%?",
      options: [
        "Because STRK ranks first",
        "Because STRK carries a conversion right (0.1 MSTR share per STRK share), and investors accept a lower dividend for the upside option",
        "Because STRK is non-cumulative",
        "Because STRK is denominated in euros",
      ],
      answer: 1,
      explain: "It is the **convertible preferred** of Stage 6.3: a dividend plus a call option on the common. The option is worth something, so the dividend can be lower.",
    },
    {
      q: "What process does Strategy's September 2026 \"daily dividend\" proposal have to go through?",
      options: [
        "The board has already made it effective; no vote is needed",
        "A special shareholder meeting vote set for October 28, 2026; if approved, STRC is expected to pay daily from November 2, 2026",
        "SEC approval",
        "It applies only to STRE",
      ],
      answer: 1,
      explain: "The proposal covers STRF, STRC, STRK and STRD, with a vote at the **October 28, 2026 special meeting**. The outcome depends on that vote.",
    },
  ],

  further: [
    { label: "Strategy 10-K (FY2025): preferred-stock terms table and liquidation preferences", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000020/mstr-20251231.htm" },
    { label: "Strategy investor briefing FWP (2026-08-24): notionals by series, BTC Rating, USD assets", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strategy 8-K (2026-09-25): the daily-dividend proposal and special meeting", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526401636/mstr-20260924.htm" },
    { label: "STRC prospectus supplement (424B5, July 2025): variable-rate mechanics and redemption terms", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312525165531/d852456d424b5.htm" },
    { label: "Strategy website: each preferred series and the credit dashboard (use the latest official data)", url: "https://www.strategy.com/" },
  ],
};
