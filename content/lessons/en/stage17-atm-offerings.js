export default {
  id: "atm-offerings",
  stage: 17,
  order: 1,
  title: "At-the-Market Offerings: Selling Stock Into the Market a Little at a Time",
  difficulty: "dat",
  prereqs: ["dilution-buybacks", "flywheel-math"],

  oneLiner:
    "A traditional follow-on sells one big block at a discount to an underwriter. An **at-the-market (ATM) offering** gets the paperwork done in advance and then quietly sells a little stock into the exchange every day. It is the engine of the DAT flywheel: Strategy raised about **$20.3 billion** through ATMs in 2026 up to August 23. This lesson covers the legal wrapper, the true execution cost, when an ATM is accretive and when it dilutes (the answer depends on mNAV), and how to read the Monday 8-K.",

  intuition: `
Suppose Orange Corp wants to raise $150 million to buy bitcoin. It has two routes.

**Route one: an underwritten follow-on.** It announces after Tuesday's close, the banks build a book overnight, and before Wednesday's open 10 million shares are sold in one go to institutions at a **discount** (say 4% below the close), with roughly 2% paid to the banks as an underwriting spread. The money arrives in a day. The price: a marked-down issue price, and a stock that often gaps lower on the news.

**Route two: an ATM, or at-the-market offering.** The company registers a "shelf" with the SEC in advance, then signs a **sales agreement** with a few brokers that says "sell up to $X." From then on, the company tells the brokers each day how much they may sell and the lowest price it will accept, and the brokers **feed the shares into the exchange order book** like any other seller. No one-time discount, no roadshow, just a small commission on each fill.

Picture it this way: an underwritten deal backs a dump truck up to the market and tips 10 million shares in at once; an ATM uses an eyedropper. **The eyedropper is slow, but it barely makes a splash.**

For a DAT, the ATM is the engine of the flywheel from Stage 16.7. When the stock trades above the bitcoin value behind each share (mNAV above 1), every share sold brings in more bitcoin than that share represented, so **bitcoin per share rises**. Orange Corp sells 10 million shares at $15, buys 1,500 BTC, and its BTC per share climbs 4.5%. That is Stage 5.5's rule, "issuing above intrinsic value is accretive," applied directly to a DAT.

But the engine has a switch, and **the switch is mNAV**. As mNAV slides toward 1, selling stock stops adding value; once commissions and market impact are counted, it can actively dilute. That is why Strategy's ATM activity tracks its mNAV: when the premium is rich it sells common hard; when the premium fades it shifts to selling preferreds, or sells common for dollars rather than for bitcoin.

This lesson sits on **Idea ② (balance sheets and claims)**: every new share is a new claim on the same pile of bitcoin, and what matters is how much bitcoin it brings in with it. It also sits on **Idea ③ (the plumbing)**: an ATM depends entirely on the market's everyday liquidity, meaning the order book, the market makers and the daily volume of Stage 8.1. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**

The whole of Stage 17 starts here. The ATM is the pipe for selling stock. Stage 17.2 looks at selling volatility (convertibles); Stages 17.3 to 17.5 look at selling yield (preferreds); Stage 17.6 stacks them all in order of seniority and stress-tests them; Stage 17.7 covers tax.

**In this lesson we break it into five pieces:**

- **① What an ATM is: the shelf, the sales agreement and the words "up to"**
- **② Execution: participation rates, market impact and the true cost**
- **③ Accretive or dilutive: mNAV is the ATM's on-off switch**
- **④ The Monday 8-K: Strategy's ATM map (as of September 2026)**
- **⑤ Common ATMs and preferred ATMs: one pipe, two different liquids**
`,

  mechanics: `
### ① What an ATM is: the shelf, the sales agreement and the words "up to"

US securities law defines the ATM formally. Under SEC Rule 415(a)(4), an "at the market offering" is an offering of equity securities into an existing trading market **at prevailing market prices**. It needs three things:

- **A shelf registration.** The company registers with the SEC in advance that it may issue certain securities over a period of time. Each actual sale then needs only a short prospectus supplement rather than a fresh registration.
- **A sales agreement** (also called an equity distribution agreement). The company contracts with one or more brokers acting as sales agents, setting the **maximum** amount to be sold, the commission cap, and who does the selling.
- **Daily instructions.** Within that framework, the company can tell the agents at any time how much to sell today and at what minimum price, and it can pause whenever it likes.

The words "up to" matter. An ATM size is **a ceiling, not a commitment**. When Strategy announced a "$21 billion common stock ATM" on March 23, 2026, it meant "we may sell up to $21 billion," not "we will sell $21 billion." In the news, "announced an $X billion ATM" and "sold $X billion" are two very different statements.

Set against an underwritten deal:

<table class="pm">
<tr><th>Dimension</th><th>Underwritten follow-on (illustrative)</th><th>ATM (illustrative)</th></tr>
<tr><td>Pricing</td><td>One price, usually a few percent below market</td><td>Each fill at the prevailing price, no blanket discount</td></tr>
<tr><td>Fees</td><td>Underwriting spread, often several percent</td><td>Commission on sales, usually lower</td></tr>
<tr><td>Speed</td><td>Done overnight, cash arrives at once</td><td>Sold gradually over days or months</td></tr>
<tr><td>Signal</td><td>Price often knocked down on announcement day</td><td>Spread out and continuous; smaller impact, but a standing supply overhang</td></tr>
<tr><td>Flexibility</td><td>Size fixed up front</td><td>Speed up, slow down or stop at will</td></tr>
</table>

### ② Execution: participation rates, market impact and the true cost

An ATM is not free. Its cost comes in three layers:

- **Commission.** Paid to the agents on the amount sold. It is typically a low single-digit percentage at most, and large issuers often pay less; the exact figure is in each sales agreement.
- **Market impact.** The more you sell each day, the deeper you eat into the order book and the lower your fills. Agents usually pace themselves with a **volume participation rate**, for example selling only 5% to 15% of each day's trading volume.
- **Overhang.** The market knows there are still billions of dollars of unused capacity, so it expects a steady stream of supply, and that expectation alone can weigh on the price.

A widely used rule of thumb is the **square-root law of market impact**: the cost of impact is roughly proportional to daily volatility × √(shares sold ÷ daily volume). A worked example: Orange Corp trades 5 million shares a day with 4% daily volatility. Selling 500,000 shares a day (a 10% participation rate) costs about 4% × √0.1 ≈ **1.3%** in impact. In a hurry, selling 1.5 million a day (30% participation), the impact is about 4% × √0.3 ≈ **2.2%**, but the 10 million shares are gone in 7 trading days rather than 20. **You can have fast or cheap, not both.**

Now feed the costs back into the Stage 16.7 flywheel. Sell 10 million shares at $15 with 3% impact and a 2% commission, and the company really nets about $14.26 per share. That buys roughly 1,426 BTC instead of 1,500, and the gain in BTC per share shrinks from **+4.5%** to about **+3.9%**. Costs have eaten roughly a seventh of the accretion.

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The ATM pipeline: from shelf registration to the Monday 8-K (Orange Corp, illustrative)</text><rect x="14" y="48" width="118" height="70" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="73" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Orange Corp</text><text x="73" y="90" text-anchor="middle" font-size="10" fill="var(--muted)">100M shares · $15</text><text x="73" y="104" text-anchor="middle" font-size="10" fill="var(--muted)">mNAV 1.5</text><rect x="160" y="48" width="130" height="70" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="225" y="70" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Shelf + sales agreement</text><text x="225" y="88" text-anchor="middle" font-size="10" fill="var(--muted)">"sell up to $X"</text><text x="225" y="102" text-anchor="middle" font-size="10" fill="var(--muted)">a ceiling, not a promise</text><rect x="318" y="48" width="130" height="70" rx="8" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="383" y="70" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Sales agents (brokers)</text><text x="383" y="88" text-anchor="middle" font-size="10" fill="var(--muted)">sell 5%–15% of</text><text x="383" y="102" text-anchor="middle" font-size="10" fill="var(--muted)">daily volume</text><rect x="476" y="48" width="150" height="70" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="551" y="70" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Exchange order book</text><text x="551" y="88" text-anchor="middle" font-size="10" fill="var(--muted)">buyers: retail, funds,</text><text x="551" y="102" text-anchor="middle" font-size="10" fill="var(--muted)">market makers, arbs</text><line x1="132" y1="83" x2="156" y2="83" stroke="var(--muted)" stroke-width="1.5"/><polygon points="156,79 160,83 156,87" fill="var(--muted)"/><line x1="290" y1="83" x2="314" y2="83" stroke="var(--muted)" stroke-width="1.5"/><polygon points="314,79 318,83 314,87" fill="var(--muted)"/><line x1="448" y1="83" x2="472" y2="83" stroke="var(--muted)" stroke-width="1.5"/><polygon points="472,79 476,83 472,87" fill="var(--muted)"/><path d="M551 118 L551 160 L400 160" fill="none" stroke="var(--green)" stroke-width="1.5"/><polygon points="400,156 396,160 400,164" fill="var(--green)"/><text x="475" y="152" text-anchor="middle" font-size="10" fill="var(--green)">cash: ~$150M − impact − fees</text><rect x="250" y="140" width="146" height="44" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="323" y="160" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Buy bitcoin</text><text x="323" y="176" text-anchor="middle" font-size="10" fill="var(--muted)">~1,426–1,500 BTC</text><path d="M250 162 L73 162 L73 122" fill="none" stroke="var(--btc)" stroke-width="1.5"/><polygon points="69,122 73,118 77,122" fill="var(--btc)"/><text x="160" y="176" text-anchor="middle" font-size="10" fill="var(--btc)">BTC per share +3.9% to +4.5%</text><rect x="120" y="212" width="400" height="58" rx="8" fill="var(--surface-2)" stroke="var(--orange-line)" stroke-dasharray="4 3"/><text x="320" y="233" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">The Monday 8-K (Strategy's practice)</text><text x="320" y="251" text-anchor="middle" font-size="10" fill="var(--muted)">shares sold per program · net proceeds · capacity left · BTC bought · avg price · total held</text><text x="320" y="264" text-anchor="middle" font-size="10" fill="var(--muted)">(plus preferred buybacks and the USD Reserve balance)</text></svg><figcaption>An ATM breaks "issuing stock" into small daily sales; the cash becomes bitcoin, and the bitcoin lifts BTC per share, provided the sale price beats the bitcoin value per share and costs don't eat the premium.</figcaption></figure>

### ③ Accretive or dilutive: mNAV is the ATM's on-off switch

The core formula of Stage 16.7 turns into a simple test here. Sell at price P, with commission and impact together costing c, when the bitcoin value per share is N:

$$
bitcoin value each new share brings in = P × (1 − c)
bitcoin value each new share takes a slice of = N
accretive when P × (1 − c) > N, i.e. mNAV > 1 ÷ (1 − c)
at a 5% cost: breakeven mNAV ≈ 1.053
$$

Three cases for Orange Corp (bitcoin value per share $10, selling 10 million shares, 2% total cost):

<table class="pm">
<tr><th>Share price</th><th>mNAV (market-cap basis)</th><th>Change in BTC per share</th><th>Verdict</th></tr>
<tr><td>$15</td><td>1.5</td><td>about +4.3%</td><td>Clearly accretive</td></tr>
<tr><td>$12</td><td>1.2</td><td>about +1.6%</td><td>Barely accretive</td></tr>
<tr><td>$10</td><td>1.0</td><td>about −0.2%</td><td>Costs turn it dilutive</td></tr>
</table>

Always ask which mNAV. In 2025 Strategy used an **enterprise-value basis** and tied its ATM guidance to it (Q3 2025 earnings release, October 30, 2025): below 2.5x it would issue common "tactically" (mainly to pay interest and dividends), from 2.5x to 4.0x "opportunistically" to buy bitcoin, and above 4.0x "actively." In 2026 it switched to a new definition, share price ÷ **net** bitcoin per share (Stage 16.2); on that basis the figure was about **1.01x** on August 21, 2026.

With the premium close to 1x, Strategy still sold common, **but it sold for dollars, not bitcoin**. On December 1, 2025 it built a **$1.44 billion USD Reserve** by selling stock at an average mNAV of about 1.17x. In the week to August 23, 2026 it sold roughly $2 billion of common and set up a new $1.59 billion "USD Cash" pool. That is a different trade: **dilution in exchange for liquidity**, buying insurance for preferred dividends and debt interest (Stage 16.6). Supporters say the company is buying insurance cheaply while it still can; critics say it is "issuing stock to pay dividends," slowly thinning out bitcoin per share. Both sides are doing the same arithmetic, just from different points in time.

Finance has an old question here: when are companies keenest to sell stock? Myers and Majluf (1984) pointed out that managers know more about the firm than outside investors, so **they tend to issue when they think the shares are overpriced**, and the market therefore reads a stock sale as "management thinks it's expensive." DATs make that signal explicit: they say openly that they sell when the premium is high. For a DAT this isn't a secret; it is the business model. The only question is how long the premium lasts (Stage 18.3).

### ④ The Monday 8-K: Strategy's ATM map (as of September 2026)

Strategy files an 8-K almost every Monday. It lists, for the previous week, how many shares each ATM program sold, the net proceeds and the capacity left, plus bitcoin bought, the average price and total holdings. Take the week of September 14–20, 2026 (8-K filed September 21): Strategy bought 950 BTC at about $79,670 each, bringing its holdings to **846,000 BTC**, and in the same week repurchased 1,771,238 STRC shares for $174.0 million. **Each 8-K is a weekly report on a DAT's balance sheet.**

<table class="pm">
<tr><th>Date</th><th>ATM-related event</th><th>Source</th></tr>
<tr><td>2024-10-30</td><td>"21/21 Plan": raise $42B over 3 years, half equity and half fixed income</td><td>Q3 2024 release</td></tr>
<tr><td>2025-05</td><td>"42/42 Plan": $84B, $42B equity + $42B fixed income (the 10-K says "medium-to-long term")</td><td>10-K, FWP</td></tr>
<tr><td>2025-11-04</td><td>Omnibus sales agreement</td><td>8-K 2026-03-23</td></tr>
<tr><td>2026-03-23</td><td>New ATMs: common up to $21.0B, STRC up to $21.0B, STRK up to $2.1B; authorized STRC shares raised from 70.4M to 282.6M</td><td>8-K 2026-03-23</td></tr>
<tr><td>2026-06-28</td><td>Capacity left: common $24.26B, STRF $1.619B, STRC $17.51B, STRK $2.10B, STRD $4.015B</td><td>8-K 2026-06-29</td></tr>
<tr><td>2026-08-23</td><td>Raised year to date $20.319B: common $12.796B, preferred $7.524B; common capacity left $19.694B</td><td>FWP 2026-08-24</td></tr>
</table>

Another set of numbers shows which pipe was flowing. In Q2 2026 the STRC ATM raised about **$5.465 billion** gross, against about $2.947 billion for common: **for a while the preferred pipe ran wider than the common one.** Strategy has also published a target: "annual Digital Credit sales equal to 10%–20% of its BTC Reserve when market conditions are attractive" (August 2026 briefing).

Three disciplines for reading these tables: **write the date** (the numbers change weekly); **separate capacity from amounts sold**; and **separate gross from net** (after commissions). For current figures, go to strategy.com and the latest filings on SEC EDGAR.

### ⑤ Common ATMs and preferred ATMs: one pipe, two different liquids

The same ATM machinery does two entirely different jobs depending on what it sells:

- **A common ATM sells the premium.** It is accretive only when mNAV is above 1 (plus costs). It enlarges the share count but adds no claim ranking ahead of the common.
- **A preferred ATM sells yield.** It doesn't add to the common share count, but it adds a layer of fixed claims **above** the common (one more floor in the building of Stage 6.1). Whether it adds value depends not on mNAV but on **bitcoin's long-run appreciation beating the preferred's cost of capital** (Stage 16.7; Strategy calls the threshold the BTC Hurdle ARR, 10.74% on August 23, 2026).
- **A preferred ATM is more price-sensitive.** Selling a $100 stated-amount preferred at $90 raises the issuer's real cost of capital. That is why Strategy's October 2025 STRC framework tied follow-on offerings to prices of $101 or more, and why Strive has pledged not to issue new SATA below $100 (Stage 17.4, Stage 17.5).

Strive uses ATMs too. Its common ATM grew from $450 million (September 15, 2025) to $2.55 billion (June 5, 2026), with about $306 million sold in the first half of 2026. Its SATA ATM grew from $500 million (December 9, 2025) to $2.6 billion (June 5, 2026).

**The strongest case for:** the ATM is the cheapest and most flexible way for a listed company to raise money. There is no one-time discount, sales follow demand, and disclosure is weekly and public. For a DAT, it lets the company convert whatever premium the market offers on any given day into bitcoin.

**The strongest case against:** an ATM leaves supply permanently hanging over the stock. It makes selling shares a routine, so when the premium disappears the engine stalls, and by then the market may already have priced in endless issuance. When the company sells stock to fund dividends rather than to buy bitcoin, bitcoin per share is slowly worn down. Stage 18.3 takes apart what happens when mNAV compresses. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "atm-offerings",

  analogy: `
Think of a DAT as an **orchard owner**. The bitcoin is the trees; the stock is "shares in the orchard."

An underwritten deal is like **hauling a whole truckload of orchard shares to the wholesale market at dawn**. The wholesaler (the bank) knocks the price down and charges a handling fee, and the whole town sees you arrive with a full truck, so prices soften that day.

An ATM is like **setting up a stall at your own gate**. Each day you put out one small basket of shares, and passers-by buy at that day's price. If trade is good you put out more baskets; if it's poor you close the stall. A sign at the gate says "at most X baskets this season." That's a limit, not a promise. Every Monday you pin a notice up in the village square: how many baskets sold, how much cash came in, how many new trees you planted.

When is the stall worth running? **When passers-by will pay more for a share than the trees behind that share are worth** (mNAV above 1). Then every basket sold lets you plant more trees than the shares you gave away, and every existing share ends up with more trees behind it. Once passers-by will only pay what the trees are worth, or less, the stall just hands your orchard to other people piece by piece, unless you are selling shares to build a cash pile to pay the people who lent you money. That is a different calculation (Stage 16.6, Stage 18.3).
`,

  misconceptions: [
    "**\"The company announced a $21 billion ATM, so it's about to sell $21 billion of stock.\"** — An ATM size is the **ceiling** in a sales agreement. The company may sell a little, a lot, or nothing. Look at \"sold\" and \"capacity remaining\" in the weekly 8-K, not at the headline.",
    "**\"An ATM costs nothing because there's no underwriting discount.\"** — There are commissions, there is market impact, and there is the pressure a standing supply overhang puts on the price. The faster you sell, the bigger the impact; in the Orange Corp example, 3% impact plus a 2% commission ate about a seventh of the accretion.",
    "**\"As long as it's selling stock to buy bitcoin, BTC per share must be rising.\"** — Only when the sale price, after costs, beats the bitcoin value per share (mNAV > 1 ÷ (1 − cost)). Near or below 1x mNAV, selling stock dilutes. And when the stock is sold for dollars (a reserve for dividends), BTC per share falls outright.",
    "**\"A preferred ATM doesn't dilute the common, so it doesn't affect the common.\"** — It adds no shares, but it puts a layer of fixed claims and annual dividend obligations **above** the common. The common's residual shrinks and becomes more volatile; whether that pays off depends on bitcoin outrunning the preferred's cost of capital over time.",
    "**\"DATs invented the ATM.\"** — ATMs have long been routine in US capital markets; utilities and REITs have used them for years to raise money as needed. What's distinctive about DATs is the scale, the frequency, and openly using the mNAV premium as the reason to sell.",
  ],

  quiz: [
    {
      q: "Orange Corp's bitcoin value per share is $10, and ATM commission plus impact total 5%. Above what share price does selling stock to buy bitcoin stop diluting BTC per share?",
      options: [
        "$10.00",
        "About $10.53 (mNAV ≈ 1.053)",
        "$15.00",
        "$9.50",
      ],
      answer: 1,
      explain: "**Accretive when P × (1 − c) > N.** $10 ÷ 0.95 ≈ $10.53. Costs push the breakeven mNAV from 1.0 up to about 1.053.",
    },
    {
      q: "Which statement best describes the difference between an ATM and an underwritten follow-on?",
      options: [
        "An ATM must sell its entire capacity at once",
        "An ATM's issue price is usually lower than an underwritten deal's",
        "An ATM doesn't need SEC registration",
        "An ATM sells into the exchange in batches at prevailing prices and can speed up or pause at any time; an underwritten deal sells once, at a discount, to the underwriters",
      ],
      answer: 3,
      explain: "An ATM rests on a **shelf registration plus a sales agreement**, with agents selling in batches at market prices. An underwritten deal is priced once and settled once, usually with a discount and an underwriting spread.",
    },
    {
      q: "In late August 2026 Strategy's mNAV (2026 definition) was about 1.01x, yet it still sold about $2 billion of common stock. What was the money mainly for?",
      options: [
        "Setting up a new USD Cash pool to strengthen dollar liquidity (rather than buying bitcoin right away)",
        "Repurchasing all of its convertible notes",
        "Buying bitcoin to raise BTC per share",
        "Paying a dividend on the common",
      ],
      answer: 0,
      explain: "Around August 23, 2026 Strategy created a roughly $1.59 billion **USD Cash** pool alongside its $5.10 billion USD Reserve. Selling stock for dollars near 1x mNAV is **dilution in exchange for liquidity**, a different trade from selling at a premium to buy bitcoin.",
    },
    {
      q: "Orange Corp trades 5 million shares a day with 4% daily volatility. Under the square-root law, what happens to impact cost if the participation rate goes from 10% to 30%?",
      options: [
        "It stays the same",
        "It triples",
        "It rises from about 1.3% to about 2.2% (√3 ≈ 1.73x), but the days needed to finish drop from 20 to about 7",
        "It falls, because selling faster is cheaper",
      ],
      answer: 2,
      explain: "Impact ∝ volatility × √participation: 4% × √0.1 ≈ 1.3% and 4% × √0.3 ≈ 2.2%. **You can have fast or cheap, not both.**",
    },
    {
      q: "What is the main effect of a preferred ATM on common shareholders?",
      options: [
        "It adds common shares and directly dilutes BTC per share",
        "It adds no shares, but puts fixed claims and dividend obligations above the common; whether it pays off depends on bitcoin outrunning the cost of capital",
        "None at all",
        "It turns common shares into preferred shares",
      ],
      answer: 1,
      explain: "A preferred is **one more floor added to the building**. It doesn't dilute the share count, but it makes the common a thinner, more volatile residual claim: the amplification of Stage 16.4.",
    },
  ],

  further: [
    { label: "17 CFR 230.415: shelf registration and the definition of an at-the-market offering (Cornell LII)", url: "https://www.law.cornell.edu/cfr/text/17/230.415" },
    { label: "Strategy 8-K (2026-03-23): new common, STRC and STRK ATM programs", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526118810/d93392d8k.htm" },
    { label: "Strategy investor briefing FWP (2026-08-24): capital raised YTD, mNAV and credit metrics", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Myers & Majluf (1984): financing decisions when firms know what investors don't (Journal of Financial Economics)", url: "https://doi.org/10.1016/0304-405X(84)90023-0" },
    { label: "SEC EDGAR full-text search: read the weekly 8-Ks yourself", url: "https://www.sec.gov/edgar/search/" },
  ],
};
