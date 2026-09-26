export default {
  id: "convertible-bonds",
  stage: 6,
  order: 4,
  title: "Convertible Bonds: Debt with an Equity Option Attached",
  difficulty: "core",
  prereqs: ["capital-stack", "credit-spreads"],

  oneLiner:
    "A convertible bond = **an ordinary bond + a call option on the company's stock**, glued together and sold as one. If the stock falls, it retreats into being a bond, propped up by its \"bond floor\"; if the stock rises, it turns into equity and rises with it. Investors pay for the option by **accepting a very low — even zero — coupon.** So the more volatile the stock, the more the option is worth and the cheaper the company's borrowing. That is the secret behind the 0% convertibles that bitcoin treasury companies issue in Stage 17.2: **what they are really selling is volatility.**",

  intuition: `
Suppose Orange Corp wants to borrow $150 million for five years. It has two options.

- **Issue a straight bond.** Given Orange Corp's credit, investors would want about 8% a year: $12 million of interest annually, with principal repaid in five years.
- **Issue a convertible.** The interest rate is **0%**, but it comes with a right: at any point in the next five years, each $1,000 bond can be exchanged for **40 shares** of Orange Corp stock (equivalent to buying stock at **$25** a share). Today the stock is at $15.

Why would anyone lend you money and ask for no interest at all? Because the exchange right is valuable. If the stock is at $50 in five years, 40 shares are worth $2,000 — the investor has doubled their $1,000. If the stock never gets above $25, the investor doesn't convert, collects the $1,000 principal at maturity, and has only lost five years of interest.

**A floor underneath, no ceiling above** — that is the entire appeal. A convertible is made of two things.

- A **bond** that repays $1,000 at maturity (as long as the company doesn't default). Discounted at 8%, $1,000 five years from now is worth about **$676** today. That is the **bond floor.**
- A **call option**: the right to buy 40 shares at $25.

The investor pays $1,000 and gets a bond worth about $676; the extra $324 or so is the **price of the option.** **The interest the company saves by cutting the coupon from 8% to 0% is the premium it receives for selling that option.**

This lesson sits on **Idea ④ (risk & leverage)**: a convertible carves the **volatility** out of a company's stock, packages it and sells it to investors. Option value rises with volatility (Stage 7.2 and Stage 7.3 go deeper): the more the stock swings, the more room there is to imagine what those 40 shares might become, the more the option is worth, and the lower the coupon the company has to pay. It also sits on **Idea ② (balance sheets & claims)**: a convertible usually ranks as **senior unsecured debt** (near the top of Stage 6.1's floor plan), but once it converts it moves from the top floor down to the basement and becomes common stock — **diluting** the existing shareholders along the way.

The new-era connection is direct. Bitcoin is far more volatile than ordinary stocks, and a bitcoin treasury company's shares are more volatile still (the "amplification" of Stage 16.4). For such companies, stock options are especially valuable, so they can borrow at very low or even 0% coupons. Starting in late 2020, Strategy issued convertible notes many times, many of them with coupons at or near 0% and high conversion premiums; Stage 17.2 goes through them one by one against the facts file. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**

**In this lesson we break it into six pieces:**

- **① Two things glued together: a bond floor plus a call option**
- **② The arithmetic of conversion: ratio, price, parity and premium**
- **③ Why the coupon can be so low: investors trade interest for an option**
- **④ Three personalities: bond-like, balanced and equity-like**
- **⑤ Who buys: convertible arbitrage and delta hedging**
- **⑥ The new era: bitcoin volatility and DAT convertibles**
`,

  mechanics: `
### ① Two things glued together: a bond floor plus a call option

Take Orange Corp's convertible (to make the arithmetic concrete, assume a five-year term, 40 shares per $1,000 of face value, a $25 conversion price and a $15 share price today):

$$
Value at maturity = max(1,000, 40 × share price)
= 1,000 + 40 × max(0, share price − 25)
= a bond repaying 1,000 + 40 call options struck at $25
$$

The second line is the key to the whole lesson. **Face value equals conversion ratio × conversion price exactly (40 × 25 = 1,000), so the convertible splits cleanly into "one zero-coupon bond + 40 call options."** Hence:

$$
Convertible value ≈ bond floor + conversion ratio × call option value
$$

- **Bond floor**: principal and coupons discounted at the company's **credit yield** (not the Treasury yield). With a 0% coupon, five years and an 8% credit yield, the floor is about **$676** (semiannual convention).
- **Option value**: depends on the share price, the conversion price, time, the risk-free rate and **the stock's volatility.** At 60% annualized volatility and a 4% risk-free rate, each option is worth about $6.29, so 40 of them ≈ **$252**.
- Together ≈ **$927**. In other words, at 60% volatility this 0%-coupon convertible, issued at $1,000 par, **slightly shortchanges** the investor. To make it fair, either volatility must be higher or the bond must pay some coupon (piece ③ works it out).

An important warning: **the bond floor is not fixed.** It is set by the credit yield, and the credit yield moves with the company's fortunes. A collapsing share price often comes with deteriorating credit, so the floor sinks too. "A floor underneath" is a floor that can move.

### ② The arithmetic of conversion: ratio, price, parity and premium

Convertibles have their own vocabulary, and all of it is simple division:

<table class="pm">
<tr><th>Term</th><th>Formula</th><th>Orange Corp example</th></tr>
<tr><td><b>Conversion ratio</b></td><td>Shares received per bond</td><td>40 shares per $1,000</td></tr>
<tr><td><b>Conversion price</b></td><td>Face value ÷ conversion ratio</td><td>1,000 ÷ 40 = $25</td></tr>
<tr><td><b>Parity / conversion value</b></td><td>Conversion ratio × current share price</td><td>40 × 15 = $600</td></tr>
<tr><td><b>Conversion premium at issue</b></td><td>Conversion price ÷ share price at issue − 1</td><td>25 ÷ 15 − 1 ≈ 66.7%</td></tr>
<tr><td><b>Market conversion premium</b></td><td>Convertible price ÷ parity − 1</td><td>If the bond trades at 927: 927 ÷ 600 − 1 ≈ 54.5%</td></tr>
<tr><td><b>New shares if converted</b></td><td>Issue size ÷ conversion price</td><td>$150M ÷ 25 = 6M shares (about 6% dilution)</td></tr>
</table>

Some intuition:

- **Parity** tells you "what it's worth if I convert right now." At a $15 share price it's only $600, so nobody converts — the bond in hand is worth more.
- **The higher the conversion premium**, the further out of the money the option, the cheaper it is, and the less it can substitute for interest — so the coupon has to be a bit higher (or volatility has to carry more of the load). A 66.7% premium is very high for a traditional company (20–40% is common); only highly volatile issuers can sell one.
- For existing shareholders: if the bonds do convert, **the share count goes from 100M to 106M.** But conversion only happens with the stock above $25 — by then the company has effectively "sold" new shares at 67% above today's price. That is why many people describe a convertible as **deferred equity issued at a premium**, the same logic as Stage 5.5's point that issuing shares above intrinsic value is accretive.

### ③ Why the coupon can be so low: investors trade interest for an option

The company doesn't care how you decompose the security. It cares about one thing: **how much it must give up to bring $1,000 in the door.** A convertible lets it pay partly with an option instead of with interest. Invert the framework from piece ①: **for a given volatility, what coupon makes the convertible worth exactly par?**

<table class="pm">
<tr><th>Stock volatility (annualized)</th><th>Value of 40 options</th><th>Convertible value at 0% coupon</th><th>Coupon needed for value = 1,000</th></tr>
<tr><td>30% (ordinary blue chip)</td><td>≈ 96</td><td>≈ 771</td><td>≈ 5.6%</td></tr>
<tr><td>45%</td><td>≈ 176</td><td>≈ 851</td><td>≈ 3.7%</td></tr>
<tr><td>60%</td><td>≈ 252</td><td>≈ 927</td><td>≈ 1.8%</td></tr>
<tr><td>80% (highly volatile, e.g. a DAT stock)</td><td>≈ 342</td><td>≈ 1,017</td><td><b>0%</b> is already enough</td></tr>
</table>

(Assumptions: five-year term, $25 conversion price, $15 share price, 8% credit yield, 4% risk-free rate, option values from Black–Scholes; ignores the correlation between credit and the share price, and ignores call and put features.)

That table is the economics of the convertible: **with identical conversion terms, raising volatility from 30% to 80% takes the fair coupon from about 5.6% down to zero.** Put differently, a company whose stock swings 80% a year can borrow for five years "for free" — the price being that it hands its bondholders all the upside above $25.

It also explains who issues convertibles: companies that are **fast-growing, volatile, lower-rated and light on cash flow** — tech, biotech, and bitcoin treasury companies. Their straight debt is expensive (weak credit), but options on their stock are valuable (high volatility). **A convertible lets them pay with the most valuable thing they have: their volatility.**

### ④ Three personalities: bond-like, balanced and equity-like

A convertible's price moves with the share price, but not in a straight line. This is the most important picture in the lesson:

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Convertible value vs share price (per $1,000 face; 60% volatility)</text><line x1="70" y1="250" x2="615" y2="250" stroke="var(--line)"/><line x1="70" y1="30" x2="70" y2="250" stroke="var(--line)"/><text x="340" y="282" text-anchor="middle" font-size="11" fill="var(--muted)">Share price ($)</text><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="70" y="264">0</text><text x="178" y="264">10</text><text x="286" y="264">20</text><text x="394" y="264">30</text><text x="502" y="264">40</text><text x="610" y="264">50</text></g><g font-size="10" fill="var(--muted)" text-anchor="end"><text x="64" y="254">0</text><text x="64" y="159">1,000</text><text x="64" y="64">2,000</text></g><line x1="70" y1="186" x2="615" y2="186" stroke="var(--blue)" stroke-width="2" stroke-dasharray="6 4"/><text x="612" y="200" text-anchor="end" font-size="10" fill="var(--blue)">bond floor ≈ 676 (8% credit yield)</text><line x1="70" y1="250" x2="610" y2="59" stroke="var(--green)" stroke-width="2" stroke-dasharray="6 4"/><line x1="90" y1="62" x2="110" y2="62" stroke="var(--green)" stroke-width="2" stroke-dasharray="5 3"/><text x="116" y="66" font-size="10" fill="var(--green)">parity = 40 × share price</text><polyline points="75,186 86,185 97,185 108,184 119,183 129,181 140,180 151,178 162,176 173,174 183,172 194,170 205,168 216,165 227,163 237,160 248,158 259,155 270,152 281,149 291,147 302,144 313,141 324,138 335,135 345,132 356,129 367,126 378,122 389,119 399,116 410,113 421,110 432,106 443,103 453,100 464,97 475,93 486,90 497,87 507,83 518,80 529,77 540,73 551,70 561,66 572,63 583,59 594,56 605,53" fill="none" stroke="var(--orange)" stroke-width="3"/><line x1="90" y1="46" x2="110" y2="46" stroke="var(--orange)" stroke-width="3"/><text x="116" y="50" font-size="11" font-weight="700" fill="var(--orange-ink)">convertible value</text><line x1="340" y1="40" x2="340" y2="250" stroke="var(--muted)" stroke-dasharray="2 3"/><text x="344" y="44" font-size="10" fill="var(--muted)">conversion price 25</text><circle cx="232" cy="162" r="5" fill="var(--orange)"/><text x="226" y="150" text-anchor="end" font-size="10" fill="var(--ink)">today: stock 15 → about 927</text><line x1="232" y1="162" x2="232" y2="193" stroke="var(--red)" stroke-width="1.5"/><text x="226" y="180" text-anchor="end" font-size="10" fill="var(--red)">premium ≈ 327</text><rect x="72" y="212" width="120" height="16" rx="3" fill="var(--blue-soft)"/><text x="132" y="224" text-anchor="middle" font-size="10" font-weight="600" fill="var(--blue)">bond-like: hugs floor</text><rect x="210" y="212" width="170" height="16" rx="3" fill="var(--orange-soft)"/><text x="295" y="224" text-anchor="middle" font-size="10" font-weight="600" fill="var(--orange-ink)">balanced: most curvature</text><rect x="420" y="212" width="170" height="16" rx="3" fill="var(--green-soft)"/><text x="505" y="224" text-anchor="middle" font-size="10" font-weight="600" fill="var(--green)">equity-like: hugs parity</text></svg><figcaption>The solid curve (convertible value) always sits above the higher of the two dashed lines: on the left it behaves like a bond (hugging the floor), on the right like the stock (hugging parity), and in between it bends the most — that bend is the option's time value.</figcaption></figure>

Sort convertibles by where the share price sits and you get distinct "personalities."

- **Bond-like.** The share price is far below the conversion price (left side). The option is worth almost nothing, the price hugs the floor, it barely reacts to the stock, and **its risks are mainly credit and interest rates.** A low-coupon convertible that has fallen this far is called a **busted convertible** — the investor holds a low-yield bond whose principal depends entirely on the company's credit.
- **Balanced.** The share price is near the conversion price (middle). Curvature is greatest: **it captures a lot of the upside and less of the downside.** That asymmetry (convexity) is exactly what the option is worth.
- **Equity-like.** The share price is far above the conversion price (right side). The price is almost equal to parity and moves one-for-one with the stock.

The number that measures "how closely it tracks the stock" is **delta**: how much the convertible moves, in shares, for a $1 move in the stock. In the chart, at $15 each bond's delta is about 40 × 0.67 ≈ 27 shares; at $5 it drops to about 14; at $40 it rises to about 35. **Delta changes as the share price changes**, and the speed of that change is called gamma — the star of the next piece.

### ⑤ Who buys: convertible arbitrage and delta hedging

You might assume convertible buyers are long-term investors who love the company. In fact, a large share of the global convertible market is bought by **convertible arbitrage funds** (mostly hedge funds), which hold **no view on the direction of the stock.**

Their trade:

$$
Buy 1 convertible + short delta shares of stock = a position neutral to small moves in the share price
$$

- When the stock rises, the convertible rises (and its delta grows) while the short loses. Because delta is rising, the fund **shorts a bit more** — effectively **selling high.**
- When the stock falls, the convertible falls less (its delta shrinks) while the short gains. The fund **buys back some of the short** — effectively **buying low.**

**Constantly re-hedging, selling high and buying low, turns the stock's volatility into profit.** This is called being **long gamma** or **harvesting volatility.** As long as the stock's **realized volatility** exceeds the volatility implied in the price paid, the arbitrageur makes money, on top of the interest earned on the short proceeds and whatever coupon the bond pays.

Two consequences for the issuer:

- **Demand.** Stocks that are volatile, easy to borrow and short, and liquid are the arbitrage funds' favorites, so their convertibles sell more easily and on better terms (lower coupons, higher premiums).
- **Pressure on the share price.** On issue day the arbitrage funds must immediately short a large amount of stock to set up their hedges, which often weighs on the issuer's shares. Some issuers pair the deal with a concurrent buyback or a "capped call" to soften the blow.

Arbitrage has its own risks. In 2008, as financing dried up, arbitrage funds were forced to deleverage together and convertibles traded far below their theoretical value for a time; short-sale bans, soaring borrow costs and widening credit spreads can all make a "neutral" book lose money. Stage 7.3 returns to this when it treats volatility as an asset.

### ⑥ The new era: bitcoin volatility and DAT convertibles

Put the first five pieces together and it becomes clear why bitcoin treasury companies use convertibles so heavily.

- **High volatility.** Bitcoin itself is volatile, and a DAT's common stacks Stage 16.4's amplification on top. Per piece ③'s table, that means **a very low fair coupon.** 0% isn't "free money"; it's paying with the stock's upside.
- **Strong arbitrage demand.** Volatile, liquid, easy-to-borrow stocks are exactly what convertible arbitrage funds want. Stage 7.3 will argue that such a company is, in a sense, a **"volatility factory"** — processing bitcoin's volatility into tradable options and convertibles.
- **Position in the stack.** Convertibles are typically **senior unsecured debt**, ranking ahead of all preferred stock. Back to Orange Corp in Stage 6.1: the $150M of converts sits on the first floor, with asset coverage of about 6.7x.
- **Two endings.** If the stock ends far above the conversion price, the bonds convert: the debt disappears and becomes equity (dilutive, but deleveraging). If the stock ends far below, the bonds are **busted** and must be repaid in cash at maturity (or at a put date): the company must refinance or sell assets. **A convertible's risk isn't in its coupon; it's in the maturity or put date.**

One more detail: many convertibles carry an **investor put** (on a set date, holders can require the company to buy them back at par) and an **issuer call** (above a certain share price, the company can redeem and effectively force conversion). The put shortens the real maturity to the put date — Stage 6.1's "priority in time." Stage 17.2 examines Strategy's actual convertibles one by one: how many have converted or been redeemed, how much is left, and when the put dates fall. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "convertible-bonds",

  analogy: `
Think of a convertible as **a certificate of deposit that comes with a right of first purchase on a home.**

You put $1,000 into a developer's five-year "deposit," which **pays no interest.** But it carries a right: within five years you may buy 40 square meters of housing at $25,000 per square meter — while today's price is only $15,000.

If prices climb to $50,000 over the five years, you exercise the right: your $1,000 deposit turns into property worth $2,000, and you've doubled your money. If prices stay below $25,000, you don't buy; you get your $1,000 back in five years and have only missed out on the interest.

Why can the developer take your money without paying interest? Because the purchase right is valuable — **and the more wildly home prices swing, the more valuable it is.** In a city where prices often double in a year and often halve in one, that right is worth enough to make up for five years of interest.

And the person who doesn't care about home prices but buys these deposits anyway? That's the convertible arbitrageur. They hold the deposit and "short" the matching floor area; every time prices swing, they sell a little more near the top and buy a little back near the bottom. **What they earn isn't the direction of home prices; it's their volatility.**
`,

  misconceptions: [
    "**\"A 0%-coupon convertible means the company borrows for free.\"** — The company pays with upside instead of interest: once the stock passes the conversion price, bondholders take the excess and existing shareholders are diluted. At high volatility that option premium can fully replace interest, but it isn't free.",
    "**\"A convertible has a bond floor, so you can't lose principal.\"** — The floor is discounted at the company's credit yield and sinks when the company's situation deteriorates. In a default, a convertible is just a senior unsecured claim and recovers whatever Stage 6.6's waterfall gives it.",
    "**\"Convertible buyers are long-term fans of the company.\"** — A large share are convertible arbitrage funds: long the convertible, short the stock, neutral on direction, earning volatility. Their hedging itself moves the issuer's share price.",
    "**\"The conversion price is 67% above the current price, so conversion is unlikely and dilution doesn't matter.\"** — For a volatile stock, a 67% rise within five years is not unusual. Dilution should be analyzed on a fully diluted share count, which is why Stage 16.1 measures BTC per share on a fully diluted basis.",
    "**\"A convertible's risk is in its coupon.\"** — The coupon is tiny and barely strains cash. The real risk is at maturity or the put date: if the stock is far below the conversion price, the company must repay in cash, meaning it must either refinance or sell assets.",
  ],

  quiz: [
    {
      q: "Orange Corp's convertible converts into 40 shares per $1,000 and the stock is at $15. What are the conversion price and parity?",
      options: [
        "Conversion price $15, parity $1,000",
        "Conversion price $40, parity $600",
        "Conversion price $25, parity $1,000",
        "Conversion price $25, parity $600",
      ],
      answer: 3,
      explain: "Conversion price = face ÷ ratio = 1,000 ÷ 40 = **$25**; parity = ratio × share price = 40 × 15 = **$600**. Parity is below the bond's value, so nobody converts today.",
    },
    {
      q: "All else equal, the issuer's stock volatility rises from 30% to 80%. What happens to the coupon needed to make the convertible fair?",
      options: [
        "It falls sharply — the option is worth more and can replace interest",
        "It rises sharply — more volatility means worse credit",
        "It doesn't change — the coupon depends only on interest rates",
        "It rises and then falls",
      ],
      answer: 0,
      explain: "Option value rises with volatility. Under this lesson's assumptions, the fair coupon falls from about **5.6% to 0%.** That is why highly volatile issuers, bitcoin treasury companies included, can sell 0% convertibles.",
    },
    {
      q: "A convertible whose stock is far below the conversion price, trading right at its bond floor, mainly carries which risks?",
      options: [
        "The risk that the stock rises",
        "Credit risk and interest-rate risk — it's essentially a low-coupon bond",
        "No risk, thanks to the floor",
        "Only liquidity risk",
      ],
      answer: 1,
      explain: "This is a **bond-like / busted** convertible: the option is nearly worthless, and value depends on whether the company repays on time and on rates. And as the company weakens, the floor itself sinks.",
    },
    {
      q: "A convertible arbitrage fund buys the convertible and shorts delta shares of stock. What is its main source of profit?",
      options: [
        "Betting the stock will rise",
        "Betting the company will default",
        "Re-hedging dynamically — selling high and buying low — to turn the stock's realized volatility into profit (long gamma)",
        "Collecting the convertible's high coupon",
      ],
      answer: 2,
      explain: "The position is neutral to small moves; the fund shorts more as the stock rises and buys back as it falls, so **the higher the realized volatility, the more it earns.** The coupon is usually tiny and not the main source of return.",
    },
    {
      q: "For a DAT that has issued low-coupon convertibles, when is the main moment of risk?",
      options: [
        "Every coupon date, because coupons are high",
        "The maturity or investor put date — if the stock is far below the conversion price, principal must be repaid in cash",
        "Issue day, because the bonds convert immediately",
        "Never, because convertibles rank behind preferred stock",
      ],
      answer: 1,
      explain: "A low coupon barely strains cash; **the risk is concentrated at maturity or the put date.** Above the conversion price the bonds convert and the debt disappears; far below it, cash must be found by refinancing or selling assets. Convertibles rank **ahead of** preferreds, not behind.",
    },
  ],

  further: [
    { label: "SEC Investor.gov: Convertible Securities (basics)", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/convertible-securities" },
    { label: "Corporate Finance Institute: Convertible Bond (ratio, parity and premium)", url: "https://corporatefinanceinstitute.com/resources/fixed-income/convertible-bond/" },
    { label: "Options Path: options and volatility from zero (sister course)", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
    { label: "Strategy: convertible notes and capital structure (check the latest official disclosures)", url: "https://www.strategy.com/" },
  ],
};
