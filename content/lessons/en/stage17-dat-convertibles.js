export default {
  id: "dat-convertibles",
  stage: 17,
  order: 2,
  title: "DAT Convertibles: Selling Bitcoin Volatility to Hedge Funds",
  difficulty: "dat",
  prereqs: ["convertible-bonds", "volatility-asset"],

  oneLiner:
    "Why would anyone lend Strategy $3 billion at **0%**? Because the buyer isn't after interest; it wants the **call option** embedded in the bond, and a stock sitting on bitcoin is so volatile that the option is unusually valuable. Most buyers are **convertible-arbitrage funds**: they buy the convert, short part of the stock as a hedge, and \"harvest\" volatility by rebalancing. This lesson takes apart the **$6.71 billion** of Strategy convertibles still outstanding as of September 2026: coupons, conversion prices, put dates, call dates, and the \"put wall\" of 2027 to 2029.",

  intuition: `
On December 9, 2020, the company then still called MicroStrategy priced its first convertible note: $550 million with a 0.750% coupon, due 2025 (plus a $100 million option for the initial purchasers). Over the following years it issued a series of converts with coupons between 0% and 2.25%. The one due in 2029 carried **a 0% coupon** on $3 billion.

Borrowing at zero sounds like free money. It isn't. **The company isn't selling debt; it's selling volatility.**

Go back to the formula of Stage 6.4: **\\(\\text{a convertible} = \\text{an ordinary bond (the bond floor)} + \\text{a call option on the company's stock}\\)**. Take Orange Corp: $1,000 face value, 0% coupon, five years, convertible into 40 shares (a $25 conversion price), with the stock at $15 today.

- **The bond floor.** A bond that pays nothing and returns $1,000 in five years, discounted at about 8% for Orange Corp's credit, is worth only about \\(\\dfrac{\\$1{,}000}{1.08^{5}} \\approx \\mathbf{\\$681}\\) today.
- **The option.** A five-year call on 40 shares with a $25 strike. Orange Corp's stock sits on bitcoin and is extremely volatile; at 70% annualized volatility, Black–Scholes (Stage 7.2) values those 40 options at about **$302**.
- Together: about **$982**, close to par. **The investor pays for the option by giving up interest.** The higher the volatility, the more the option is worth, and the lower the coupon and the higher the conversion premium the company can negotiate.

So who buys? Mostly not retail bitcoin believers, but **convertible-arbitrage funds** (Stage 8.4). They buy the convert and at the same time **short roughly \\(\\Delta \\times 40\\) shares** of the stock, so the position barely cares about small moves. Then, when the stock rises they short a little more, and when it falls they buy a little back: **they buy low and sell high automatically**. As long as the stock actually moves more (realized volatility) than the volatility implied in the price they paid, that rebalancing makes money. This is Stage 7.3's point that volatility is an asset you can buy and sell, and it is why Strategy has been called a "volatility factory."

The lesson sits mainly on **Idea ④ (risk and leverage)**: convertibles re-slice bitcoin's volatility. The arbitrage funds take the volatility, the company gets cheap money, and the common bears either conversion dilution or the pressure of repaying cash. It also sits on **Idea ② (claims)**: convertibles are **senior unsecured debt**, ranking **ahead of every preferred** (Stage 17.6). **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**

**In this lesson we break it into five pieces:**

- **① Anatomy recap: bond floor + option, and why bitcoin pushes coupons toward zero**
- **② Who buys: how convertible arbitrage harvests volatility**
- **③ Strategy's convertible notes (as of September 2026)**
- **④ The real maturity is the put date: the 2027–2029 put wall**
- **⑤ What it means for the common and the preferreds: the strongest case each way**
`,

  mechanics: `
### ① Anatomy recap: bond floor + option, and why bitcoin pushes coupons toward zero

Stage 6.4 broke a convertible's value into pieces. Here we use that breakdown to understand how DAT converts are priced:

$$
\\text{convertible value} \\approx \\text{bond floor} + \\text{conversion ratio} \\times \\text{call value}
\\text{bond floor} = \\sum_{t=1}^{T} \\frac{C}{(1+y)^{t}} + \\frac{F}{(1+y)^{T}}
\\text{call value} = f(S,\\ K,\\ T,\\ r,\\ \\sigma)
$$

The bond floor is the coupons \\(C\\) and principal \\(F\\) discounted at the issuer's credit yield \\(y\\); the call value depends on share price \\(S\\), conversion price \\(K\\), term \\(T\\), rates \\(r\\) and volatility \\(\\sigma\\) (higher vol, higher value).

Orange Corp under three volatility assumptions ($1,000 face, five years, 0% coupon, 40 shares, $25 conversion price, $15 stock, 4.5% risk-free rate, 8% credit yield):

<table class="pm">
<tr><th>Volatility</th><th>Bond floor</th><th>Value of 40 calls</th><th>Theoretical value</th><th>What it means</th></tr>
<tr><td>50%</td><td>about $681</td><td>about $206</td><td>about $886</td><td>Issuing at par is a bad deal for investors; the company must add coupon or lower the conversion price</td></tr>
<tr><td>70%</td><td>about $681</td><td>about $302</td><td>about $982</td><td>Close to par: a 0% coupon is roughly "fair"</td></tr>
<tr><td>90%</td><td>about $681</td><td>about $384</td><td>about $1,064</td><td>Investors will scramble for it; the company can push the conversion price higher</td></tr>
</table>

This table explains the two hallmarks of DAT convertibles: **tiny coupons and very high conversion premiums**. Strategy's 2029 notes carry a 0% coupon and an initial conversion price of $672.40, far above the stock price when they were sold. That is possible because the stock's implied volatility has long run far above that of a typical large-cap. As Stage 7.3 explained, bitcoin's high volatility plus the company's leverage makes the stock even more volatile. **The more expensive the "volatility" the company sells, the cheaper its funding.**

Two more details set the true cost. One is **credit**: the yield at which the bond floor is discounted. S&P assigned Strategy a B- issuer rating on October 27, 2025, which is speculative grade. The other is **the option's term**: when there is a holder put, the option's effective life runs to the put date, not the maturity date.

### ② Who buys: how convertible arbitrage harvests volatility

The standard arbitrage position:

- **Long** one convertible ($1,000 face).
- **Short** \\(\\Delta \\times 40\\) shares of common. For Orange Corp at 70% volatility, \\(\\Delta \\approx 0.73\\), so the fund shorts about \\(0.73 \\times 40 \\approx \\mathbf{29}\\) shares.
- **Rebalance daily (or weekly).** When the stock rises, the option's delta rises, so the fund shorts a bit more; when it falls, delta falls, so the fund buys some back.

The position is broadly immune to the **direction** of the stock but positively exposed to the **size** of its swings (long gamma). What it earns is the gap between "realized volatility" and the "implied volatility" it paid for:

- If the stock actually swings more than it was priced for, the buy-low-sell-high rebalancing gains exceed the option's time decay, and the fund makes money.
- If the stock swings less, time value bleeds away and rebalancing can't make it back, and the fund loses.

The fund also carries **credit risk** (the bond floor drops if the company looks unable to repay), **borrow cost** (shorting requires borrowing stock; if borrow becomes scarce or expensive, it hurts) and **liquidity risk**. Some funds hedge the credit piece with credit default swaps or shorts in related assets.

This matters to DATs in three practical ways:

- **The buyers are "neutral."** Arbitrage funds don't care whether bitcoin rises or falls, so they won't panic-sell on a bearish bitcoin view. They will cut positions when volatility, borrow or credit conditions deteriorate.
- **The stock often comes under pressure on issue day.** Funds have to short stock as they build positions, one reason a stock often drops when a convertible is priced.
- **Whoever buys the option takes the risk.** The company has sold calls on its own stock; if the stock soars, it "pays" through **conversion dilution**. But that means issuing stock far above the price on the day the bond was sold, which for existing holders amounts to issuing at a premium.

### ③ Strategy's convertible notes (as of September 2026)

According to Strategy's Q2 2026 10-Q (as of June 30, 2026), and unchanged in the weekly 8-Ks through September 20, 2026, convertible principal totals **$6.71 billion**, all of it **senior unsecured**:

<table class="pm">
<tr><th>Note</th><th>Principal outstanding</th><th>Coupon</th><th>Maturity</th><th>Holder put date</th><th>Initial conversion price</th><th>Company may redeem from</th></tr>
<tr><td>2028</td><td>$1,010M</td><td>0.625%</td><td>2028-09-15</td><td><b>2027-09-15</b> (first put)</td><td>$183.19</td><td>2027-12-20</td></tr>
<tr><td>2029</td><td>$1,500M (of $3,000M issued)</td><td>0%</td><td>2029-12-01</td><td>2028-06-01</td><td>$672.40</td><td>2026-12-04</td></tr>
<tr><td>2030A</td><td>$800M</td><td>0.625%</td><td>2030-03-15</td><td>2028-09-15</td><td>$149.77</td><td>2027-03-22</td></tr>
<tr><td>2030B</td><td>$2,000M</td><td>0%</td><td>2030-03-01</td><td>2028-03-01</td><td>$433.43</td><td>2027-03-05</td></tr>
<tr><td>2031</td><td>$603.75M</td><td>0.875%</td><td>2031-03-15</td><td>2028-09-15</td><td>$232.72</td><td>2028-03-22</td></tr>
<tr><td>2032</td><td>$800M</td><td>2.25%</td><td>2032-06-15</td><td>2029-06-15</td><td>$204.33</td><td>2029-06-20</td></tr>
</table>

Points to take away:

- **The interest burden is light.** Only three notes pay a coupon, for about **$35 million** a year in cash interest (\\(0.625\\% \\times \\$1.81\\text{B} + 0.875\\% \\times \\$0.604\\text{B} + 2.25\\% \\times \\$0.8\\text{B}\\)). Compared with over a billion dollars a year in preferred dividends (Stage 17.3), converts are Strategy's cheapest money. There is also about $40 million of secured equipment financing unrelated to bitcoin, for total debt notional of about $6.754 billion.
- **The May 2026 discounted buyback.** On May 19, 2026 Strategy **repurchased $1.50 billion of principal of the 2029 notes for $1.38 billion**, about 92 cents on the dollar, booking a gain on extinguishment of about $113.9 million. Total converts fell from $8.21 billion to $6.71 billion. With a $672.40 conversion price, the 2029 notes were nowhere near converting and had effectively become **a zero-coupon bond trading at a discount**. Buying them back early earned that discount in cash and trimmed the 2028 put pressure.
- **They interact with the mNAV definitions.** Under Strategy's 2026 mNAV definition, **out-of-the-money** converts are deducted from net reserve at their notional, as debt, while **in-the-money** ones are counted in fully diluted shares (Stage 16.2). But BTC per share uses "assumed diluted shares," which treat every convert as converted, in the money or not (Stage 16.1). **The same bond is treated as two different things by two different metrics.**

### ④ The real maturity is the put date: the 2027–2029 put wall

A put lets holders require the company to buy back the notes at par (plus accrued interest) on a set date. **When the stock is below the conversion price, a rational holder puts**: $1,000 in cash beats an out-of-the-money option. So for an out-of-the-money convert, **the real maturity is the put date**.

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Strategy convertibles: put dates (red dots) and maturities (squares)</text><rect x="188" y="40" width="143" height="222" fill="var(--red-soft)" opacity="0.55"/><text x="260" y="36" text-anchor="middle" font-size="10" fill="var(--red)">put cluster: Sep 2027 to Jun 2029</text><g font-size="10" fill="var(--ink)"><text x="8" y="60" font-weight="700">2028s · $1.01B</text><text x="8" y="72" fill="var(--muted)">conv. $183.19</text><text x="8" y="96" font-weight="700">2030B · $2.0B</text><text x="8" y="108" fill="var(--muted)">conv. $433.43</text><text x="8" y="132" font-weight="700">2029s · $1.5B</text><text x="8" y="144" fill="var(--muted)">conv. $672.40</text><text x="8" y="168" font-weight="700">2030A · $0.8B</text><text x="8" y="180" fill="var(--muted)">conv. $149.77</text><text x="8" y="204" font-weight="700">2031s · $0.60B</text><text x="8" y="216" fill="var(--muted)">conv. $232.72</text><text x="8" y="240" font-weight="700">2032s · $0.8B</text><text x="8" y="252" fill="var(--muted)">conv. $204.33</text></g><g stroke="var(--muted)" stroke-width="3"><line x1="189" y1="64" x2="270" y2="64"/><line x1="226" y1="100" x2="389" y2="100"/><line x1="247" y1="136" x2="369" y2="136"/><line x1="270" y1="172" x2="392" y2="172"/><line x1="270" y1="208" x2="473" y2="208"/><line x1="331" y1="244" x2="575" y2="244"/></g><g fill="var(--red)"><circle cx="189" cy="64" r="6"/><circle cx="226" cy="100" r="6"/><circle cx="247" cy="136" r="6"/><circle cx="270" cy="172" r="6"/><circle cx="270" cy="208" r="6"/><circle cx="331" cy="244" r="6"/></g><g fill="var(--ink)"><rect x="265" y="59" width="10" height="10"/><rect x="384" y="95" width="10" height="10"/><rect x="364" y="131" width="10" height="10"/><rect x="387" y="167" width="10" height="10"/><rect x="468" y="203" width="10" height="10"/><rect x="570" y="239" width="10" height="10"/></g><line x1="90" y1="270" x2="625" y2="270" stroke="var(--line)" stroke-width="1.5"/><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="131" y="285">2027</text><text x="212" y="285">2028</text><text x="294" y="285">2029</text><text x="375" y="285">2030</text><text x="457" y="285">2031</text><text x="538" y="285">2032</text><text x="620" y="285">2033</text></g><text x="600" y="60" text-anchor="end" font-size="10" fill="var(--muted)">amounts in US dollars</text><text x="600" y="74" text-anchor="end" font-size="10" fill="var(--muted)">MSTR ~$120–154 in Aug–Sep 2026</text></svg><figcaption>Every one of the $6.71 billion of converts has a put date between September 2027 and June 2029; about $5.9 billion is puttable by the end of 2028 (derived from 10-Q data). Notes with the stock above the conversion price get converted; notes below it become cash obligations.</figcaption></figure>

Sort the table by put date (this is our own derivation from the 10-Q data):

- **2027-09-15:** the 2028 notes, $1.01 billion: the first put. Conversion price $183.19, while MSTR traded around $120–154 in August and September 2026 (per the company's briefing and press; verify before relying on it), so **currently out of the money**.
- **2028-03-01:** the 2030B notes, $2.0 billion (conversion price $433.43, deep out of the money).
- **2028-06-01:** the remaining $1.5 billion of 2029 notes (conversion price $672.40, deep out of the money).
- **2028-09-15:** the 2030A notes, $0.8 billion (conversion price $149.77, **the closest to the current share price**), plus the 2031 notes, $0.604 billion.
- **2029-06-15:** the 2032 notes, $0.8 billion.

**About $5.9 billion can be put to the company by the end of 2028.** If the stock is still below these conversion prices then, Strategy has to pay cash. The possible sources: USD Cash (about $1.05 billion on September 20, 2026), ATM sales of common or preferred, new convertibles to refinance, or bitcoin sales. Note that under board policy **the USD Reserve is for preferred dividends and debt interest only**; any other use needs board approval (Stage 16.6).

The company has a weapon of its own: **the call**. The 2029 notes, for example, are redeemable by the company from December 4, 2026 (such calls usually come with share-price conditions). When the stock is far above the conversion price, calling the notes forces holders to convert, turning debt into equity and removing a layer of debt that sits ahead of the preferreds.

### ⑤ What it means for the common and the preferreds: the strongest case each way

Convertibles play three roles in a DAT's capital structure:

- **For the common.** In the good case (the stock soars) they convert at prices far above where the notes were sold: dilution, but dilution at a premium. In the bad case (the stock languishes) they become debt that must be repaid in cash, which may force the company to issue stock or sell bitcoin at a low mNAV.
- **For the preferreds.** Converts rank **ahead of every preferred**. Every dollar of convertible debt lowers the preferreds' BTC Rating (Stage 16.5); every conversion or discounted buyback, conversely, removes a senior layer from above them.
- **For the company as a whole.** No mark-to-market margin calls and no bitcoin pledged as collateral: exactly the "leverage without forced liquidation" of Stage 7.5.

**The strongest case for:** borrowing billions for years at close to 0%, unsecured, with no margin calls, is financing any company would envy. The buyers are hedged arbitrage funds, not emotional holders. And the May 2026 discounted buyback shows the company can actively shrink its debt below par when the notes are out of the money.

**The strongest case against:** a 0% coupon isn't free; the company has sold its own stock's upside. More importantly, **the put dates turn the "never matures" story into specific calendar dates.** About $5.9 billion can be put by the end of 2028. If bitcoin and the stock are both depressed then and mNAV is below 1, the company may have to dilute or sell bitcoin at the worst possible moment. The risk in convertibles isn't a margin call; it is **refinancing**. Stage 17.6 places them in the order of seniority, and Stage 18.2 runs the full stress test. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "dat-convertibles",

  analogy: `
Think of a convertible as **an IOU with a lottery ticket stapled to it**.

The company says: "Lend me $1,000. I'll pay it back in five years, with no interest. But here's a lottery ticket: any time in the next five years, you can swap this IOU for 40 of my shares." An ordinary person asks: no interest, why would I? A professional asks: **what's the ticket worth?**

If the company's stock rides like a city bus, smooth and steady, the ticket is nearly worthless and nobody lends at zero. If it rides like a roller coaster, bitcoin with leverage on top, the ticket is valuable and lenders queue up.

The arbitrage fund's game is to buy the IOU and the ticket, then **sit in a small backward-facing seat on the roller coaster** (shorting part of the stock). Every time the coaster climbs, it sells a little more; every time it plunges, it buys a little back. As long as the coaster lurches hard enough, the difference between those ups and downs is its income. It doesn't care whether the ride ends at the top of a hill or the bottom of a valley.

And in small print on the IOU: "On such-and-such a date, you may demand your money back early." That date is the IOU's real maturity. If the coaster is stuck in a valley then, the company had better have the cash ready.
`,

  misconceptions: [
    "**\"A 0% convertible is free money.\"** — The company pays its \"interest\" with call options on its own stock: through conversion dilution if the stock soars, and by repaying principal on the put date if it languishes. The cost is real; it just doesn't show up as interest.",
    "**\"People who buy Strategy's converts are bitcoin believers.\"** — Most buyers are convertible-arbitrage funds that short the stock to hedge direction and earn volatility. They are broadly neutral on bitcoin's direction but very sensitive to volatility, borrow cost and credit.",
    "**\"The converts don't mature until 2030 or 2032, so there's no near-term pressure.\"** — Every note has a holder put, and all of them fall between September 2027 and June 2029; about $5.9 billion is puttable by the end of 2028. With the stock below the conversion price, the put date is the real maturity.",
    "**\"Conversion is always bad because it dilutes the common.\"** — Conversion happens when the stock is above the conversion price, which is usually far above the price when the notes were sold. That is issuing stock at a premium, and it removes a senior debt layer from above the preferreds and the common. The real stress case is **no conversion** and a cash repayment.",
    "**\"Convertibles are perpetual equity, just like the preferreds.\"** — Convertibles are **senior unsecured debt** with maturity and put dates; failing to pay is a default, and they rank ahead of every preferred. Preferreds are perpetual equity, and skipping a dividend is not a default (Stage 6.2).",
  ],

  quiz: [
    {
      q: "Orange Corp's 0% convertible (five years, 40 shares, $25 conversion price, $15 stock) is worth about $982 at 70% volatility. What happens if the market thinks volatility is only 50%?",
      options: [
        "The theoretical value rises to about $1,064",
        "Nothing, because the coupon is 0%",
        "The theoretical value drops to about $886, so issuing at par is a bad deal for investors and the company must add coupon or lower the conversion price",
        "The bond floor rises",
      ],
      answer: 2,
      explain: "Option value falls with volatility: the 40 calls drop from about $302 to about $206, which with the roughly $681 bond floor gives about $886. **The lower the volatility, the cheaper the \"lottery ticket\" the company can sell.**",
    },
    {
      q: "What does a convertible-arbitrage fund mainly earn?",
      options: [
        "Bitcoin's price gains",
        "Rebalancing gains when realized volatility beats the implied volatility it paid for (being long gamma)",
        "The convertible's coupon",
        "Liquidation proceeds if the company goes bankrupt",
      ],
      answer: 1,
      explain: "The fund is long the convert and short delta in stock. It sells more as the stock rises and buys back as it falls, **buying low and selling high automatically**. If the stock moves more than it was priced for, those gains beat the option's time decay.",
    },
    {
      q: "As of September 2026, which Strategy convertible has the earliest holder put date?",
      options: [
        "The 2029 notes, June 1, 2028",
        "The 2032 notes, June 15, 2029",
        "The 2030B notes, March 1, 2028",
        "The 2028 notes, September 15, 2027 ($1.01 billion, $183.19 conversion price)",
      ],
      answer: 3,
      explain: "The 2028 notes' first put date is **September 15, 2027**. If the stock is below the $183.19 conversion price then, holders will likely put the notes for cash.",
    },
    {
      q: "In May 2026 Strategy bought back $1.50 billion of principal of its 2029 notes for $1.38 billion. Why could it buy below par?",
      options: [
        "With a $672.40 conversion price the notes were deep out of the money, effectively a zero-coupon bond trading at a discount",
        "Because holders were forced to sell",
        "Because the notes had defaulted",
        "Because bitcoin had risen",
      ],
      answer: 0,
      explain: "A deep out-of-the-money convert is worth little more than its **bond floor**, and a zero-coupon bond trades at a discount before maturity or its put. Buying it back for cash at a discount booked about $113.9 million of gain and reduced the 2028 put pressure.",
    },
    {
      q: "Where do the convertibles sit relative to the preferreds (STRF, STRC and the rest) in Strategy's capital structure?",
      options: [
        "Behind every preferred",
        "Equal with STRC",
        "Ahead of every preferred (senior unsecured debt)",
        "Equal with the common",
      ],
      answer: 2,
      explain: "The official order is debt > STRF > STRC > STRE/STRK/STRD > common. The converts are **senior unsecured debt**, and every dollar of them lowers the preferreds' BTC Rating (Stage 16.5, Stage 17.6).",
    },
  ],

  further: [
    { label: "Strategy 10-Q (Q2 2026): convertible terms, repurchase and interest", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000044/mstr-20260630.htm" },
    { label: "MicroStrategy 8-K (2020-12-09): pricing of its first convertible notes", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312520313349/d55072dex992.htm" },
    { label: "Wikipedia: Convertible arbitrage (the basic position and its risks)", url: "https://en.wikipedia.org/wiki/Convertible_arbitrage" },
    { label: "Options Path (sister course): delta, gamma and trading volatility", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
  ],
};
