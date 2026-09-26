export default {
  id: "strategy-story",
  stage: 15,
  order: 2,
  title: "Strategy's Story: From MicroStrategy to the Largest Corporate Bitcoin Holder",
  difficulty: "dat",
  prereqs: ["dat-what", "convertible-bonds", "preferred-stock"],

  oneLiner:
    "In August 2020 a mid-sized business-intelligence software company spent $250 million on 21,454 bitcoin. Six years later, renamed Strategy, it held about 846,000 BTC (as of September 20, 2026), had issued five preferred stocks and six series of convertible notes, built a multi-billion-dollar USD reserve — and, in the 2026 bear market, sold bitcoin for the first time to help pay its dividends. This lesson tells the story in order. **At every stage the company plugged in one more instrument you met in Stages 4–7**, and we set Saylor's thesis next to the critics' answer.",

  intuition: `
Stage 0.3 drew one pattern out of financial history: **every financial innovation is, at bottom, a redesign of trust and ledgers.** Joint-stock companies, central banks, exchanges and bitcoin all fit it. Strategy's story is a small 2020s sample of that pattern. It invented no new instrument — convertibles, preferreds and at-the-market share sales are all a century old or more. What it did was **wire every one of those old tools to a new asset.**

The story compresses into four acts:

- **Act one (2020): the pivot.** A cash-rich, slow-growing software company worried that inflation would eat its cash, so it swapped the cash for bitcoin. First purchase, August 11, 2020: 21,454 BTC for $250 million including fees.
- **Act two (2020–2024): the convertible era.** Once the cash was spent, the company began **borrowing to buy bitcoin**: its first convertible notes, with a 0.75% coupon, priced in December 2020. It went on to issue more low- or zero-coupon convertibles and to sell common stock at market prices. In October 2024 it announced the “21/21 Plan”: raise $42 billion over three years, half equity and half fixed income.
- **Act three (2025): the rename and “Digital Credit.”** In February the company rebranded as Strategy and issued its first preferred, STRK, the same day; STRF, STRD, STRC and STRE followed. The “preferred yielding about 10%” in Lin's third headline is a product of this act. At year-end it set up a USD reserve dedicated to paying dividends.
- **Act four (2026): the bear-market test.** Bitcoin fell from about $126,000 in October 2025 to about $58,000 in early July 2026. The company sold bitcoin for the first time to fund dividends, bought back its own preferred stock and grew the USD reserve past $5 billion — and at the end of August started buying bitcoin again.

The lesson rests on **Idea ② (balance sheets and claims)** and **Idea ④ (risk and leverage)**: each act added a layer of claims to the balance sheet, and each layer re-sliced the risk. You will watch the convertible from Stage 6.4, the preferred from Stage 6.2 and the issuance-and-dilution math from Stage 5.5 walk onto the same balance sheet one after another.

Carry two questions through the story. First, **what ruler does the company keep score with?** From 2024 it publicly measured itself by “BTC Yield” — growth in bitcoin per share — rather than earnings per share; Stage 16.3 covers what that ruler can and cannot measure. Second, **who pays for the experiment, and who collects?** Convertible buyers took the volatility, preferred buyers took the fixed dividends, and common shareholders carried the amplified ups and downs.

Every number here comes from the company's SEC filings and investor materials and carries a date. **This lesson covers mechanics and analytical frameworks only; it is not investment advice.** The story has chapters the bulls love to retell and chapters the critics never let go of; we cover both.

**This lesson has five parts:**

- **① 2020: a software company pivots**
- **② 2020–2024: the convertible era and the “21/21 Plan”**
- **③ 2025: the rename, fair value and the “Digital Credit” preferred family**
- **④ 2026: a bear-market year — selling, reserves and buying again**
- **⑤ Saylor's thesis, and the critics' reply**
`,

  mechanics: `
### ① 2020: a software company pivots

MicroStrategy was founded in 1989, co-founded by Michael Saylor, to sell enterprise business-intelligence software. By 2020 it was a mid-sized software company with steady revenue, slow growth and several hundred million dollars of cash. In the spring of 2020 the Fed expanded its balance sheet massively (Stage 9.1) and real interest rates went negative (Stage 2.5). For a company sitting on cash, that meant its cash was **quietly losing value.**

The timeline, from company filings:

<table class="pm">
<tr><th>Date</th><th>Event</th></tr>
<tr><td>2020-07-28</td><td>Q2 results announce a capital-allocation plan that includes up to $250M in “alternative assets”</td></tr>
<tr><td><b>2020-08-11</b></td><td><b>First purchase: 21,454 BTC for $250M including fees</b> — about $11,650 per coin</td></tr>
<tr><td>2020-09</td><td>The board adopts a Treasury Reserve Policy with bitcoin as the primary treasury reserve asset</td></tr>
</table>

Note what kind of move this was: **it used the company's own money.** On the balance sheet, “cash” simply became “bitcoin”; no new claims were created, and the common shareholders' risk changed from “software company + cash” to “software company + bitcoin.” That is not yet a DAT — just a company that owns bitcoin, much like the Tesla example in Stage 15.1. **What turned it into a DAT was act two: using capital-markets money to buy coins.**

### ② 2020–2024: the convertible era and the “21/21 Plan”

On December 9, 2020 the company priced its first convertible: **$550 million of 0.750% convertible senior notes due December 15, 2025**, plus a $100 million option for the underwriters. (The full $650 million is widely reported, but our fact sheet could not confirm from filings that the option was exercised in full.) Every dollar went into bitcoin.

Why convertibles? Back to Stage 6.4: \\(\\text{convertible} = \\text{bond floor} + \\text{call option}\\). **Bitcoin's high volatility makes that option very valuable** (Stage 7.3), so buyers accept a tiny coupon, or none. Who buys? Mostly **convertible-arbitrage funds**, which buy the convert and short some of the common, harvesting volatility rather than betting on the company's credit — Stage 17.2 dissects that trade. For the company, this amounts to **selling the volatility of its own stock at a good price** and using nearly interest-free money to buy bitcoin.

For the next few years the refrain was **convertibles plus at-the-market (ATM) sales of common stock.** In the 2022 bear market a subsidiary had a bank loan collateralized by bitcoin, and the market watched its margin-call level closely; the loan was repaid early in 2023, and from then on the company's financing moved almost entirely to **unsecured instruments with no margin calls** (Stage 6.5). On August 7, 2024 the company did a 10-for-1 stock split.

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Strategy's bitcoin holdings (only dates disclosed in company filings)</text><text x="320" y="38" text-anchor="middle" font-size="10" fill="var(--muted)">2020–24: converts + ATM · 2025: plus preferreds · 2026: sold ~6,948, then rebuilt</text><line x1="50" y1="240" x2="610" y2="240" stroke="var(--line)" stroke-width="1.5"/><rect x="70" y="235" width="56" height="5" fill="var(--btc)"/><text x="98" y="228" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">21,454</text><text x="98" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">2020-08</text><rect x="170" y="145" width="56" height="95" fill="var(--btc)" opacity=".8"/><text x="198" y="138" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">447,470</text><text x="198" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">2024-12-31</text><rect x="270" y="97" width="56" height="143" fill="var(--btc)" opacity=".85"/><text x="298" y="90" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">~672,500</text><text x="298" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">2025-12-31</text><rect x="370" y="66" width="56" height="174" fill="var(--btc)" opacity=".9"/><text x="398" y="59" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">818,334</text><text x="398" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">2026-05-03</text><rect x="470" y="60" width="56" height="180" fill="var(--btc)"/><text x="498" y="53" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">847,363</text><text x="498" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">2026-06-28 peak</text><rect x="550" y="60" width="56" height="180" fill="var(--btc)" opacity=".7"/><text x="578" y="53" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">846,000</text><text x="578" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">2026-09-20</text><text x="320" y="280" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">Years in between are left out because our fact sheet records only these dates; the x-axis is not evenly spaced in time</text></svg><figcaption>From 21 thousand to 447 thousand coins in four years, about 225 thousand more in 2025 alone, another 175 thousand in the first half of 2026 before the peak; net selling in July–August, buying again from late August.</figcaption></figure>

On October 30, 2024 the company announced the **“21/21 Plan”**: raise **$42 billion** over three years, $21 billion in equity and $21 billion in fixed income. It was the first time “keep buying bitcoin with capital-markets money” had been written down as an explicit, quantified plan. By the end of 2024 the company held **447,470 BTC**, and it reported a full-year 2024 BTC Yield of **74.3%** — meaning the bitcoin behind each share grew 74.3% in one year (Stage 16.3 explains what that figure means and where it misleads).

### ③ 2025: the rename, fair value and the “Digital Credit” preferred family

2025 was the year the capital structure changed the most:

<table class="pm">
<tr><th>Date</th><th>Event</th></tr>
<tr><td>2025-01-01</td><td>Adopts ASU 2023-08: bitcoin now carried at fair value; opening retained earnings rise by a one-time <b>$12.75B</b> (Stage 15.6)</td></tr>
<tr><td><b>2025-02-05</b></td><td><b>Brand renamed Strategy</b>; first preferred, <b>STRK</b> (8%, convertible), issued the same day; BTC Gain and BTC $ Gain KPIs introduced</td></tr>
<tr><td>2025-03-25</td><td><b>STRF</b> lists: 10% cumulative, the most senior preferred</td></tr>
<tr><td>2025-05</td><td>“42/42 Plan” replaces 21/21: <b>$84B</b> in total, $42B each of equity and fixed income (the 10-K calls the horizon “medium-to-long term”)</td></tr>
<tr><td>2025-06-10</td><td><b>STRD</b> lists: 10% <b>non-cumulative</b></td></tr>
<tr><td>2025-07-29</td><td><b>STRC</b> lists: variable rate, 9.00% at launch, reset monthly (Stage 17.4)</td></tr>
<tr><td>2025-08-11</td><td>Legal name formally becomes Strategy Inc</td></tr>
<tr><td>2025-10-06</td><td>Bitcoin sets an all-time high of about $126,200 intraday</td></tr>
<tr><td>2025-10-27</td><td>S&amp;P Global Ratings assigns Strategy a <b>'B-'</b> issuer credit rating</td></tr>
<tr><td>2025-11-13</td><td><b>STRE</b> lists: euro-denominated, 10%, on the Luxembourg Stock Exchange</td></tr>
<tr><td><b>2025-12-01</b></td><td><b>USD Reserve created with $1.44B</b>, raised by selling common at an average of about 1.17x mNAV; aim: at least 12 months of dividends, later 24+</td></tr>
</table>

The company markets its preferreds collectively as **“Digital Credit.”** Why a family rather than one security? Back to Stage 6.3: cumulative or not, fixed or floating, convertible or not, dollars or euros — **each series targets a different kind of investor**, slicing the buyer base by risk appetite (Stage 17.3 goes through the terms series by series). The official ranking: debt > STRF > STRC > STRE, STRK, STRD (the junior preferreds) > common.

Two “changes of ruler” that year deserve a note. One is the 2025 target: set at \\(\\text{BTC Yield} \\ge 15\\%\\) in February, raised to 30% at the end of October (assuming bitcoin at $150,000 by year-end), then cut in December — **the targets hinged on a bitcoin price assumption.** The other is mNAV, which compressed from its mid-year highs to **1.2x** on November 28 (on the 2025 enterprise-value definition). The USD Reserve arrived right then: **a thinner premium makes paying dividends with new share sales ever more expensive, so bank the cash first.** Full-year BTC Yield was 22.8%, and year-end holdings were about 672,500 BTC.

### ④ 2026: a bear-market year — selling, reserves and buying again

2026 was the first real stress test of the structure. Bitcoin closed at about $58,600 on June 30, 2026 and touched about $57,800 intraday on July 1, roughly 54% below the peak.

- **January 6**: MSCI decides not to drop DATs from its indexes for now, but freezes increases in their share counts and opens a broader consultation on “non-operating companies” (Stage 18.4).
- **Heavy buying continues in the first half**: new ATM programs on March 23 (common $21B, STRC $21B, STRK $2.1B); holdings climb from about 670,000 at the start of the year to a peak of **847,363 BTC** on June 28 (average cost $75,651).
- **May 19**: the company repurchases $1.50 billion face value of its 2029 convertibles for $1.38 billion — buying back its own debt at a discount.
- **May 26–31**: **its first bitcoin sale since 2022**: 32 BTC for about $2.5 million, to fund STRC dividends. A tiny amount; a big signal.
- **June 29**: the “Digital Credit Capital Framework” — a board policy of at least 12 months in the USD Reserve; a revised STRC rate policy (no automatic hikes just because STRC trades below $100 — buybacks below par become the main tool); a $1.0B preferred buyback program (raised to $2.0B by September); a $1.0B common buyback program; and a “BTC Monetization Program.” STRC's rate rises to **12.00%** from July 1.
- **Late June to early August**: several batches of bitcoin sold to fund dividends, the reserve and STRC buybacks; about **6,948 BTC** sold over the year. Q2 net loss: $8.22 billion.
- **August 23**: USD Reserve at **$5.10 billion**, plus a new, flexible **$1.59 billion “USD Cash”** pool.
- **August 24–30**: **buying resumes** — 4,603 BTC at about $80,318.
- **September 20**: **846,000 BTC** held, total cost $63.80 billion, average $75,416; USD Reserve $5.04 billion — about 3.1 years of coverage on roughly $1.62 billion of annual interest and dividends (our derivation); cumulative STRC buybacks about $1.125 billion.
- **September 24–25**: the board proposes **daily** dividend record dates for STRF/STRC/STRK/STRD; a special shareholder meeting is set for October 28, 2026.

One detail of that year is worth holding on to: **the coins were sold at about $59,000–$64,000, below the average cost, and buying resumed at about $80,000, above the sale prices.** That is exactly the dilemma of Stage 18.3: once mNAV sits near 1 and issuance no longer adds bitcoin per share, the company must choose among spending the reserve, selling bitcoin, buying back securities and simply pausing — and every choice has a price.

### ⑤ Saylor's thesis, and the critics' reply

Michael Saylor is now Executive Chairman; Phong Le is President and CEO; Andrew Kang is CFO. The company's thesis, in our own paraphrase:

- **Bitcoin is the best long-term store of value**, fiat money will keep losing purchasing power, and a corporate treasury should hold the best reserve asset available.
- **Capital markets are a machine for turning other people's appetite for yield and volatility into bitcoin**: sell volatility to convertible buyers, sell fixed income to preferred buyers, sell stock at a premium to common buyers — and convert every dollar into BTC.
- **Keep score in bitcoin per share.** The company itself cautions that BTC Yield is “not equivalent to ‘yield’ in the traditional financial context.”

The critics' strongest reply:

- **The premium is not a perpetual-motion machine.** In December 2025 the company sold stock at about 1.17x mNAV to fund its reserve; by August 21, 2026 its mNAV on the 2026 definition was 1.01x. **With the premium nearly gone, the flywheel's main engine stalls** (Stage 16.7, Stage 18.3).
- **Fixed obligations keep growing.** Annual interest and dividends were about $1.7 billion (August 23, 2026), all payable in cash — and bitcoin produces no cash.
- **KPI targets hinge on price assumptions**, and BTC Yield ignores the new senior claims created when preferreds are issued (the company's own caveat).
- **Concentration and governance**: a single asset, a founder with outsized influence, and changing index and accounting rules (MSCI's new consultation in August 2026 simulated removing Strategy; the outcome was still pending in late September 2026).

The bulls' rebuttal is just as concrete: **no margin calls and no pledged bitcoin; the earliest convertible put date is September 15, 2027; the USD Reserve covered more than three years of dividends on the company's own figures; and in the bear market it bought back its own converts and preferreds instead of being forced to liquidate.** The books on both sides can only really be balanced in the stress test of Stage 18.2. **Mechanics and frameworks only; not investment advice.**
`,

  demo: "strategy-story",

  analogy: `
Strategy's six years look like **a shopkeeper who turned the family store into a warehouse.**

In year one he noticed that the cash in the till was going moldy, so he swapped all of it for a kind of goods he was sure would keep getting more valuable — bitcoin. At that point he was just a shopkeeper stockpiling inventory with his own money.

Over the next few years he started borrowing to stockpile more. He borrowed cleverly: instead of paying interest, he handed each lender a voucher — “if my shop's shares go wild, you can swap this IOU for shares.” Because his shares swung so violently, the voucher was worth a lot, and lenders queued up.

Later he hung a row of new signs over the door: “Deposit 100, get 10 a year.” Some signs promised to make up missed payments (cumulative), some didn't (non-cumulative), one reset its rate every month (STRC), and one paid in euros. Each sign spoke to a different kind of customer.

Then winter came. The goods lost half their value, and outsiders stopped paying a premium for a stake in the shop. For the first time he carried a few crates out of the warehouse and sold them to keep his “10 a year” promise; he bought some of his own signs back cheaply on the street; he put a large bag of cash behind the counter labeled “enough for three years.” When the weather warmed a little, he started buying goods again.

**Will the shopkeeper succeed?** That depends on three things: the long-run price of the goods, whether outsiders keep paying up for a stake in the shop, and how long the bag of cash lasts. Stages 16 through 18 teach you how to score each of the three.
`,

  misconceptions: [
    "**“Strategy borrowed to buy bitcoin from day one.”** — The first purchase (August 2020, 21,454 BTC) used the company's own cash, a simple asset swap. Borrowing to buy began with the first convertible in December 2020 — the step that turned a company holding bitcoin into a DAT.",
    "**“Such low convertible coupons prove the market sees Strategy as an excellent credit.”** — The low coupons mainly reflect a valuable embedded call option (bitcoin's volatility makes it pricier), and many buyers are volatility-arbitrage hedge funds rather than credit investors. S&P's issuer rating is 'B-', speculative grade.",
    "**“Strategy never sells bitcoin.”** — In late May 2026 it sold bitcoin for the first time since 2022, and it sold about 6,948 BTC over the year to fund dividends, bolster its reserve and buy back STRC — then resumed buying in late August. “Never sell” is a slogan, not a contractual term.",
    "**“The mNAVs reported in 2025 and 2026 can be compared directly.”** — 2025 used the enterprise-value definition; 2026 switched to \\(\\text{price} \\div \\text{net bitcoin per share}\\). Convert to one definition before comparing across years (the four mNAVs of Stage 15.1).",
    "**“More bitcoin means a more successful company.”** — What matters to common shareholders is bitcoin per share — and how much of it is spoken for by senior claims — not total holdings. Selling stock below NAV to buy bitcoin raises total holdings while lowering bitcoin per share.",
  ],

  quiz: [
    {
      q: "Where did the money for MicroStrategy's first bitcoin purchase on August 11, 2020 come from?",
      options: [
        "Its first convertible notes",
        "The company's own cash",
        "STRK preferred stock",
        "A bank loan collateralized by bitcoin",
      ],
      answer: 1,
      explain: "The first 21,454 BTC ($250M) came from the company's own cash — an asset swap. Borrowing to buy began with the **first convertible in December 2020** ($550M, 0.750%).",
    },
    {
      q: "Why could Strategy issue convertibles with very low (even zero) coupons?",
      options: [
        "Because its credit rating is AAA",
        "Because the law says convertibles pay no interest",
        "Because bitcoin's volatility makes the embedded call option valuable, and buyers accept a low coupon in exchange",
        "Because the convertibles are collateralized by bitcoin",
      ],
      answer: 2,
      explain: "\\(\\text{Convertible} = \\text{bond floor} + \\text{call option}\\) (Stage 6.4). **The higher the volatility, the more the option is worth** (Stage 7.3), and the lower the coupon can go. The notes are unsecured, and S&P's issuer rating is B-.",
    },
    {
      q: "Which ordering matches Strategy's official seniority, first to last?",
      options: [
        "STRC > STRF > debt > common",
        "Debt > STRD > STRF > common",
        "STRF > debt > STRK > common",
        "Debt > STRF > STRC > common",
      ],
      answer: 3,
      explain: "The official order: **debt > STRF > STRC > STRE, STRK, STRD (junior) > common.** The relative ranking among the three junior preferreds could not be confirmed in our fact sheet.",
    },
    {
      q: "What was the main purpose of the 32 bitcoin Strategy sold in late May 2026?",
      options: [
        "Paying dividends on STRC preferred stock",
        "Repaying a bitcoin-collateralized loan",
        "Buying back common stock",
        "Paying the corporate alternative minimum tax",
      ],
      answer: 0,
      explain: "It was the first sale since 2022, about $2.5M, used for **STRC dividends**. Small in size, but the first time the structural problem — bitcoin produces no cash, dividends require cash — showed up in a bear market.",
    },
    {
      q: "What does the creation of the USD Reserve on December 1, 2025 best illustrate?",
      options: [
        "The company had decided to stop buying bitcoin",
        "As the mNAV premium narrowed, funding dividends with new share sales was getting more expensive, so the company sold stock at about 1.17x mNAV and banked the cash",
        "Regulators required DATs to hold cash",
        "Bitcoin was setting a new all-time high at the time",
      ],
      answer: 1,
      explain: "The reserve raised $1.44B by selling common at an average of about **1.17x mNAV**, aiming first at 12 and then 24+ months of dividends. The thinner the premium, the less reliable “raise more later” becomes — and the more a cash reserve is worth (Stage 16.6).",
    },
  ],

  further: [
    { label: "MicroStrategy 8-K exhibit (2020-08-11): the first bitcoin purchase announcement (SEC)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312520215604/d921849dex991.htm" },
    { label: "MicroStrategy Q3 2024 results (2024-10-30): the 21/21 Plan (SEC)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000095017024118951/mstr-ex99_1.htm" },
    { label: "Strategy FY2025 10-K (filed 2026-02-19): preferred terms table and holdings (SEC)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000020/mstr-20251231.htm" },
    { label: "Strategy 8-K (2026-06-29): the Digital Credit Capital Framework (SEC)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526286871/mstr-20260629.htm" },
    { label: "Strategy: latest holdings and purchase history (check live data)", url: "https://www.strategy.com/" },
  ],
};
