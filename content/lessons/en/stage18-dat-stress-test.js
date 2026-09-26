export default {
  id: "dat-stress-test",
  stage: 18,
  order: 2,
  title: "Stress-Testing a DAT: Bitcoin −50% / −80%, mNAV Below 1, Frozen Markets",
  difficulty: "dat",
  prereqs: ["btc-rating", "dividend-coverage", "seniority-in-practice", "valuing-btc-preferreds"],

  oneLiner:
    "A DAT has no margin calls, so a stress test doesn't ask \"when does it get liquidated?\" It asks three slower, more realistic questions: **after bitcoin falls, how many times over is each layer still covered? Where do dividends and interest come from, and for how many months? When the convertible put dates arrive, where does the cash come from?** This lesson runs Orange Corp and Strategy (on data as of September 2026) through the same stress test: bitcoin −50% and −80%, mNAV below 1, and capital markets shut for 12 to 24 months.",

  intuition: `
After the 2008 financial crisis, the Federal Reserve began running an annual "stress test" on big banks. It assumes unemployment soars, house prices collapse and stocks halve, then checks whether each bank still has enough capital. It doesn't predict whether a crisis will come. It answers one question: **if the worst arrives, who breaks first?**

To do the same for a DAT, first see how it differs from a bank, or from a retail trader using leverage. Stage 7.5 covered margin calls: a trader borrows to buy bitcoin, the price drops, and the broker sells the position by force, so falling prices cause selling and selling causes falling prices. **DATs are designed specifically to avoid that mechanism.** Their debt is unsecured and long-dated convertibles, their preferreds are perpetual equity, and nobody can phone them and demand they sell bitcoin because it dropped 30%.

So stress doesn't hit a DAT overnight the way a liquidation does. It squeezes from three directions, slowly:

1. **A price shock.** Bitcoin falls 50% or 80%, assets shrink, and every layer's coverage ratio (Stage 16.5) falls with it.
2. **A valuation shock.** The stock falls even further than bitcoin, mNAV drops below 1, issuing common no longer adds bitcoin per share (Stage 16.7), and the flywheel stops.
3. **An access shock.** Capital markets close their doors. Nobody wants its new stock, new preferreds or new convertibles, yet dividends and interest are still due.

None of these is hypothetical. 2026 was a live stress test. Bitcoin fell from its all-time high of about $126,000 on October 6, 2025 to an intraday low of about $57,800 on July 1, 2026, roughly −54%. DWF Ventures counted **16 of the 20 largest DATs trading below 1x mNAV.** Strategy's mNAV on its 2026 definition was about 1.01x on August 21, and between late May and August it sold about 6,948 bitcoin, its first sales since 2022. The third shock, however, never fully arrived: Strategy still raised about $20.3 billion through ATMs in 2026 up to August 23.

Remember this lesson in one line: **a DAT stress test = the asset side (coverage multiples) + the cash side (months of coverage) + the time side (the maturity wall).** You met the first two in Stage 16.5 and Stage 16.6; now we squeeze them at the same time. The third, the date on which convertible holders can put their notes back, is often the real cliff edge.

The lesson rests on **Idea ④ (risk and leverage)**: leverage amplifies not only returns but time pressure. It also rests on **Idea ② (balance sheets and claims)**, since the waterfall decides who still has something after the fall (Stage 17.6), and on **Idea ③ (liquidity and trust)**: a company that is nowhere near bankrupt can still be forced to sell assets because nobody will lend to it any more. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**

**In this lesson we break it into five pieces:**

- **① Three shocks: price, valuation, access**
- **② The asset side: how much coverage is left after bitcoin falls 50% or 80%**
- **③ The cash side: where dividends come from, and for how many months**
- **④ The time side: convertible put dates are the real cliff**
- **⑤ One stress-test table: Orange Corp and Strategy**
`,

  mechanics: `
### ① Three shocks: price, valuation, access

Lay the three shocks out against what they hit:

<table class="pm">
<tr><th>Shock</th><th>What it hits</th><th>How to measure it</th><th>Did it happen in 2026?</th></tr>
<tr><td>Price: bitcoin −50% / −80%</td><td>Asset coverage, recovery in liquidation</td><td>BTC Rating, floor price, waterfall</td><td>About −54% peak to trough</td></tr>
<tr><td>Valuation: mNAV &lt; 1</td><td>Issuing common turns dilutive</td><td>mNAV (name the definition), BTC per share</td><td>16 of the 20 largest DATs below 1x</td></tr>
<tr><td>Access: markets shut for 12–24 months</td><td>New money can't pay old obligations</td><td>Months of USD Reserve, Breakeven ARR</td><td>Not fully, for Strategy</td></tr>
</table>

The three are **highly correlated.** When bitcoin crashes, DAT stocks usually fall harder (amplification, Stage 16.4), mNAV compresses, and investors' appetite for new issues disappears at the same moment. So a serious stress test never moves one dial at a time. It asks: **if all three arrive together, how long can the company hold out?**

Also remember what a DAT does not have: **no margin calls, no major debt secured by bitcoin (Strategy's only secured debt is about $40 million of equipment financing unrelated to bitcoin), and no default when a preferred dividend is skipped.** These make a "death spiral" of forced liquidations hard to trigger (Stage 18.3 takes this up), but they don't make stress disappear. They change it from **price-triggered** to **time-triggered**.

### ② The asset side: how much coverage is left after bitcoin falls 50% or 80%

Orange Corp: 10,000 BTC; convertibles of $150 million, then Orange-F at $100 million, then Orange-D at $50 million, then the common. Using coverageByLayer and waterfall at three prices:

<table class="pm">
<tr><th>Bitcoin price</th><th>BTC Reserve</th><th>Convertible layer</th><th>Orange-F layer</th><th>Orange-D layer</th><th>Left for common in liquidation</th></tr>
<tr><td>$100,000</td><td>$1.0B</td><td>6.67x</td><td>4.00x</td><td>3.33x</td><td>$700M</td></tr>
<tr><td>$50,000 (−50%)</td><td>$500M</td><td>3.33x</td><td>2.00x</td><td>1.67x</td><td>$200M</td></tr>
<tr><td>$20,000 (−80%)</td><td>$200M</td><td>1.33x</td><td><b>0.80x</b></td><td><b>0.67x</b></td><td>0</td></tr>
</table>

After an 80% fall, a liquidation waterfall (Stage 6.6) pays the convertibles 100%, Orange-F only **50%**, and leaves nothing for Orange-D or the common. That matches the floor prices from Stage 18.1: $25,000 for Orange-F and $30,000 for Orange-D. At $20,000 bitcoin has broken through both.

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Orange Corp's coverage ladder: bitcoin at $100k / $50k / $20k</text><line x1="60" y1="230" x2="620" y2="230" stroke="var(--line)"/><line x1="60" y1="202" x2="620" y2="202" stroke="var(--red)" stroke-dasharray="5 4"/><text x="236" y="197" text-anchor="middle" font-size="10" fill="var(--red)">1.0x: exactly covered</text><text x="140" y="250" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">$100,000</text><text x="330" y="250" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">$50,000 (−50%)</text><text x="520" y="250" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">$20,000 (−80%)</text><rect x="92" y="43" width="30" height="187" fill="var(--blue-soft)" stroke="var(--blue)"/><rect x="126" y="118" width="30" height="112" fill="var(--orange-soft)" stroke="var(--orange-line)"/><rect x="160" y="137" width="30" height="93" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="107" y="38" text-anchor="middle" font-size="10" fill="var(--ink)">6.67</text><text x="141" y="112" text-anchor="middle" font-size="10" fill="var(--ink)">4.00</text><text x="175" y="131" text-anchor="middle" font-size="10" fill="var(--ink)">3.33</text><rect x="282" y="137" width="30" height="93" fill="var(--blue-soft)" stroke="var(--blue)"/><rect x="316" y="174" width="30" height="56" fill="var(--orange-soft)" stroke="var(--orange-line)"/><rect x="350" y="183" width="30" height="47" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="297" y="131" text-anchor="middle" font-size="10" fill="var(--ink)">3.33</text><text x="331" y="168" text-anchor="middle" font-size="10" fill="var(--ink)">2.00</text><text x="365" y="177" text-anchor="middle" font-size="10" fill="var(--ink)">1.67</text><rect x="472" y="193" width="30" height="37" fill="var(--blue-soft)" stroke="var(--blue)"/><rect x="506" y="208" width="30" height="22" fill="var(--red-soft)" stroke="var(--red)"/><rect x="540" y="211" width="30" height="19" fill="var(--red-soft)" stroke="var(--red)"/><text x="487" y="187" text-anchor="middle" font-size="10" fill="var(--ink)">1.33</text><text x="521" y="202" text-anchor="middle" font-size="10" fill="var(--red)">0.80</text><text x="555" y="205" text-anchor="middle" font-size="10" fill="var(--red)">0.67</text><rect x="70" y="262" width="12" height="10" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="86" y="271" font-size="10" fill="var(--muted)">Convertible layer</text><rect x="190" y="262" width="12" height="10" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="206" y="271" font-size="10" fill="var(--muted)">Orange-F (cumulative)</text><rect x="340" y="262" width="12" height="10" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="356" y="271" font-size="10" fill="var(--muted)">Orange-D (non-cumulative)</text><rect x="510" y="262" width="12" height="10" fill="var(--red-soft)" stroke="var(--red)"/><text x="526" y="271" font-size="10" fill="var(--muted)">Below 1x</text></svg><figcaption>Coverage moves in proportion to the bitcoin price: halve the price and every layer's multiple halves. After an 80% fall, only the most senior layer, the convertibles, stays above the 1x line.</figcaption></figure>

**Strategy's real version** (derived, as of about September 20, 2026): 846,000 BTC at about $84,100 (September 25) is a BTC Reserve of about **$71.1 billion**. Debt notional is about $6.75 billion; preferred notional is about $14.31 billion ($14.966 billion on August 23, less September's STRC buybacks). A rough calculation that does not net USD assets:

- Coverage of the debt is about **10.5x**; coverage of "debt plus all preferreds" about **3.4x**.
- If bitcoin fell another 80% (to about $16,800): about **2.1x** on the debt and about **0.68x** on all the preferreds. The most junior preferreds would be short in liquidation arithmetic.
- For comparison, Strategy's own published STRC floor price was about **$13,400** on 2026-08-23. It nets USD assets against debt, so its figure is more favorable than the rough one.

Is −80% too extreme? Between November 2021 and November 2022, bitcoin fell from about $69,000 to about $15,500, roughly **−77%**. A stress test exists to test things that have already happened.

### ③ The cash side: where dividends come from, and for how many months

High coverage doesn't pay a dividend; bitcoin does not turn itself into dollars. Stage 16.6 listed the sources of cash. Here they are ranked by whether they still work under stress:

1. **The USD Reserve.** Cash already on the balance sheet, the most reliable source.
2. **Issuing common through the ATM.** Needs a high enough mNAV; otherwise you are paying dividends with dilution.
3. **Issuing more preferreds.** Needs the market to accept the yield, and under stress that usually means a higher rate.
4. **Selling bitcoin.** Always possible, but every coin sold reduces coverage at every layer and may send a signal to the market.
5. **The operating business.** Strategy's software revenue was about $122 million in Q2 2026, small next to obligations of well over a billion dollars a year.

$$
Months of coverage = USD Reserve ÷ annual interest and dividends × 12
Bitcoin to sell per year = annual interest and dividends ÷ bitcoin price
Breakeven ARR = annual interest and dividends ÷ BTC Reserve
$$

**Orange Corp.** Dividends are $15 million a year; the USD Reserve is $30 million, so **24 months.** Once the reserve is spent, if markets are still shut it must sell each year: 150 BTC (1.5% of holdings) at $100,000, 300 BTC (3%) at $50,000, and **750 BTC (7.5%)** at $20,000. Breakeven ARR climbs from 1.5% to 7.5%. The cheaper bitcoin gets, the bigger the share of the stack that dividends consume.

**Strategy** (as of 2026-09-20, derived). Annual interest and dividends are about **$1.62 billion** after September's STRC buybacks. The USD Reserve of $5.04 billion covers about **37 months (about 3.1 years)**; adding $1.05 billion of USD Cash takes it to about 45 months. Board policy requires the reserve to cover at least **12 months.** If the reserve ran out with markets shut, it would need to sell about **19,300 BTC a year (2.3% of holdings)** at $84,100, and about **96,000 BTC a year (11.4%)** at $16,800. On 2026-08-23 Strategy reported a USD Duration of 3.9 years, a BTC Duration of 38 years and a Breakeven ARR of 2.63%.

**Strive** (as of 2026-09-18). No debt; SATA dividends run about $145 million a year. Company policy is an **18-month dividend reserve** (12 months in cash, 6 in STRC), and the $229.6 million of cash on its dashboard covers about 19 months. Its Breakeven ARR (derived: $145.4 million ÷ about $2.22 billion of bitcoin) is about **6.6%**, far above Strategy's, because SATA pays 13% and is larger relative to the bitcoin (Strive's Amplification Ratio is 50.4%). **No debt doesn't mean no stress; all of Strive's stress sits in the dividend.**

### ④ The time side: convertible put dates are the real cliff

A perpetual preferred never matures, but a convertible does, and its holders usually get an earlier **put** date on which they can demand the company redeem the notes at par in cash. If the stock is far below the conversion price, they will, because converting is worthless.

**Orange Corp.** $150 million of convertibles with a $25 conversion price. Suppose the put date falls in month 24. If bitcoin is at $20,000 and the stock at $3, holders want $150 million in cash: **7,500 BTC, or 75% of the entire stack.** The USD Reserve has long since gone on dividends. **That is Orange Corp's real cliff.** Not the bitcoin price on its own, but a low price, a shut market and a put date all arriving together.

**Strategy's put schedule** (10-Q as of 2026-06-30, unchanged through September 20):

<table class="pm">
<tr><th>Notes</th><th>Principal outstanding</th><th>Holder put date</th><th>Initial conversion price</th></tr>
<tr><td>2028 notes</td><td>$1.01B</td><td><b>2027-09-15</b></td><td>$183.19</td></tr>
<tr><td>2030B</td><td>$2.00B</td><td>2028-03-01</td><td>$433.43</td></tr>
<tr><td>2029 notes</td><td>$1.50B</td><td>2028-06-01</td><td>$672.40</td></tr>
<tr><td>2030A</td><td>$0.80B</td><td>2028-09-15</td><td>$149.77</td></tr>
<tr><td>2031 notes</td><td>$603.75M</td><td>2028-09-15</td><td>$232.72</td></tr>
<tr><td>2032 notes</td><td>$0.80B</td><td>2029-06-15</td><td>$204.33</td></tr>
</table>

Between September 2027 and September 2028, five series totalling about **$5.9 billion** can be put back to the company. MSTR traded around $120 to $154 in August and September 2026, well below most of these conversion prices (out of the money). $5.9 billion is about 70,000 BTC (8% of holdings) at $84,100, and about 350,000 BTC (roughly 42%) at $16,800. The company can of course refinance, use USD Cash, or buy notes back early; in May 2026 it repurchased $1.5 billion of the 2029 notes for $1.38 billion, taking down part of the wall in advance. **The analyst's job is to draw the put dates on a timeline and set them beside the date the USD Reserve runs out.**

### ⑤ One stress-test table: Orange Corp and Strategy

Put ②, ③ and ④ together and ask: "all three shocks at once, with markets shut for 24 months":

<table class="pm">
<tr><th>Scenario</th><th>Orange Corp</th><th>Strategy (derived, Sep 2026)</th></tr>
<tr><td>Bitcoin −50%</td><td>Every layer ≥ 1.67x; reserve pays 24 months, then 3% of holdings sold a year</td><td>Debt about 5.3x, all preferreds about 1.7x; reserve about 3.1 years</td></tr>
<tr><td>Bitcoin −80%</td><td>F layer 0.8x, D layer 0.67x; the put needs 75% of holdings</td><td>Debt about 2.1x, all preferreds about 0.68x; the put wall needs about 42% of holdings</td></tr>
<tr><td>mNAV &lt; 1</td><td>Issuing common to pay dividends = dilution</td><td>About 1.01x on the 2026 definition (Aug 21): already close to 1</td></tr>
<tr><td>Markets shut for 24 months</td><td>Reserve lasts exactly 24 months; selling starts in month 25</td><td>Reserve lasts longer, but the first put date is in month 12</td></tr>
</table>

**The strongest optimistic case:** no margin, no pledged coins, and preferreds that are perpetual equity mean that in the worst case the company gets to choose **time**. It spends the reserve first, then sells small amounts of bitcoin, and in extremis can suspend the non-cumulative STRD dividend; and historically bitcoin has made new highs after every −75% drawdown. **The strongest pessimistic case:** the three shocks are tightly correlated, and the put wall turns "time" into specific **dates**. Every bitcoin sold weakens coverage and confidence, a seller holding about 4% of all bitcoin can move the price by itself, and past rebounds guarantee nothing.

A stress test doesn't give an answer. It gives **a timetable**: on which date, for which layer, how much money, and from where. Stage 18.3 continues with the choices a company has once mNAV falls below 1, and the checklist in Stage 18.6 makes "coverage multiples, months of coverage, put dates" mandatory questions. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "dat-stress-test",

  analogy: `
Picture a DAT as **a supply ship far out at sea.** Its hold is full of a cargo whose price swings wildly (bitcoin). Several groups are on board. The crew must be paid every month (preferred dividends), and there are IOUs saying money must be repaid at particular ports on particular dates (the convertible put dates).

An ordinary leveraged trader is a dinghy towed behind a tug: when the waves get big, the tug cuts the line (the margin call, the forced sale). The DAT's ship has no tug. **Nobody can cut your line when the sea turns rough.**

That doesn't make it safe. A stress test asks three things:

- **What is the cargo still worth?** If the storm knocks half or four-fifths off its price, how much can each group on board still claim (coverage multiples)?
- **How many months of food are left?** The cash on board pays wages for a certain number of months. If every port is closed (capital markets shut), then once the stores are gone the only option is to throw cargo overboard crate by crate for cash (selling bitcoin).
- **Where is the next port where money is due?** The ports marked with dates on the chart are the real rocks. Low cargo prices, closed ports and a repayment date all on the same day, and the ship is forced to sell most of its cargo at once.

A good captain doesn't predict storms. Before leaving harbor, the captain writes these three things on one sheet of paper.
`,

  misconceptions: [
    "**\"DATs have no margin calls, so they can't come under stress.\"** — Without forced liquidation, stress becomes time-triggered instead of price-triggered: the month the reserve runs out, the day the convertibles can be put. Those dates are exactly what a stress test measures.",
    "**\"With coverage above 3x, the dividend is certain to be paid.\"** — Coverage is liquidation arithmetic; dividends are paid in cash. With markets shut, cash comes only from the reserve and from selling bitcoin, and the cheaper bitcoin gets, the larger the share of holdings that must be sold each year.",
    "**\"A DAT with no debt, such as Strive, faces no stress.\"** — There is no put wall, but the dividend obligation remains. SATA's 13% rate gives Strive a Breakeven ARR of about 6.6%, far above Strategy's 2% to 3%.",
    "**\"An 80% fall in bitcoin is an impossible extreme.\"** — Bitcoin fell about 77% from November 2021 to November 2022, and about 54% from October 2025 to July 2026. A stress test should cover what has already happened.",
    "**\"The three shocks can be tested one at a time.\"** — A bitcoin crash, mNAV compression and closing funding channels tend to arrive together. Testing them separately badly understates the risk.",
  ],

  quiz: [
    {
      q: "Orange Corp (10,000 BTC; $150M convertibles, $100M Orange-F, $50M Orange-D) is liquidated with bitcoin at $20,000. What share of its stated amount does Orange-F recover?",
      options: ["100%", "80%", "0%", "50%"],
      answer: 3,
      explain: "A $200M reserve pays the $150M convertibles first, leaving $50M for Orange-F's $100M, so **50%**. 0.8x is the F layer's coverage multiple, not its recovery rate.",
    },
    {
      q: "As of 2026-09-20 Strategy's USD Reserve was about $5.04 billion, and its annual interest and dividends about $1.62 billion. Roughly how long does the reserve last?",
      options: ["About 12 months", "About 37 months (about 3.1 years)", "About 45 months", "About 10 years"],
      answer: 1,
      explain: "**5.04 ÷ 1.62 × 12 ≈ 37 months.** 45 months includes the extra $1.05 billion of USD Cash; 12 months is the board's policy minimum.",
    },
    {
      q: "For Orange Corp, which combination is the most dangerous?",
      options: [
        "Bitcoin −20% with markets open as normal",
        "mNAV rising to 3x",
        "Bitcoin −80%, markets shut, and the convertible put date arriving",
        "The 30-year Treasury yield falling",
      ],
      answer: 2,
      explain: "The put needs $150M in cash, which at $20,000 bitcoin is **75% of holdings**. A shut market means no refinancing, and the reserve has already gone on dividends. The cliff is all three together.",
    },
    {
      q: "Why does a lower bitcoin price force a DAT to sell a larger share of its holdings each year to pay dividends?",
      options: [
        "Dividends are fixed in dollars, so the cheaper bitcoin is, the more coins the same dollars require",
        "Because the dividend rate rises automatically",
        "Because exchanges charge higher fees",
        "Because the preferreds convert into common stock",
      ],
      answer: 0,
      explain: "**Bitcoin sold per year = annual obligations ÷ bitcoin price.** Orange Corp: 150 BTC (1.5%) at $100,000, 750 BTC (7.5%) at $20,000. That is also why Breakeven ARR rises as the price falls.",
    },
    {
      q: "In May 2026 Strategy repurchased $1.5 billion of its 2029 convertibles for $1.38 billion. From a stress-testing point of view, what did this mainly do?",
      options: [
        "Raised the dividend rate on its preferreds",
        "Took down part of the June 2028 put wall early, retiring debt below par",
        "Increased its bitcoin holdings",
        "Got the company added to the S&P 500",
      ],
      answer: 1,
      explain: "The 2029 notes' put date is 2028-06-01. Buying them back early at a discount **reduced the cash needed on a future date**, which is managing the time side of a stress test.",
    },
  ],

  further: [
    { label: "Strategy 10-Q (Q2 2026): convertible terms, put dates and the USD Reserve policy", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000044/mstr-20260630.htm" },
    { label: "Strategy 8-K (2026-09-21): 846,000 BTC held, USD Reserve and STRC buybacks", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526396093/mstr-20260914.htm" },
    { label: "Federal Reserve: how bank stress tests (DFAST/CCAR) are designed", url: "https://www.federalreserve.gov/supervisionreg/dfa-stress-tests.htm" },
    { label: "Strive bitcoin treasury dashboard: SATA dividend obligation, cash and Amplification Ratio", url: "https://strive.com/treasury" },
    { label: "CoinTribune (2026-09-25): 16 of the 20 largest DATs trade below 1x mNAV", url: "https://www.cointribune.com/en/crypto-corporate-treasuries-plunge-below-nav-en-masse/" },
  ],
};
