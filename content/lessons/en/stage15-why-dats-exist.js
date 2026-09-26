export default {
  id: "why-dats-exist",
  stage: 15,
  order: 3,
  title: "Why DATs Exist: Capital-Markets Arbitrage, Access, Regulation & Selling Volatility",
  difficulty: "dat",
  prereqs: ["dat-what", "strategy-story", "volatility-asset"],

  oneLiner:
    "Since 2024 anyone can buy a spot bitcoin ETF — so why would anyone pay a premium for “a company with bitcoin inside”? Because a DAT runs **four machines** at once: it offers **access** to money that is not allowed to hold bitcoin directly; it **sells stock** above NAV; it **sells the volatility** of its own shares to convertible buyers; and it **sells fixed income** to preferred buyers — each machine turning someone else's demand into bitcoin. This lesson takes them apart one at a time, uses Orange Corp to show when each is accretive and when it dilutes, and then puts the critics' strongest argument on the table: **every one of these machines depends on the market continuing to pay.**",

  intuition: `
Stage 15.1 left a question hanging: why would the market pay $1.5 billion for $1 billion of bitcoin? If all you want is bitcoin, buying it yourself or buying a spot ETF (Stage 12.5) is cheaper, simpler and more transparent than buying a company's shares. Yet DATs not only exist; in 2025 they multiplied into the hundreds. **They must be selling something bitcoin alone cannot give you.**

The lesson rests on **Idea ④ (risk and leverage)**, with Idea ② close behind: a DAT's skill is **cutting risk into different shapes** and selling each shape to the people who want it. Think of a butcher. A whole cow (bitcoin) sold in one piece finds few buyers who can afford it and eat it all; cut into tenderloin, ribs and brisket, it sells to completely different customers — and **the cuts can fetch more than the whole animal.** A DAT is that butcher's shop. It makes four cuts:

- **Cut one: access.** A lot of money is **not permitted** to hold bitcoin directly but can buy a listed company's stock, convertibles or preferreds — certain mutual funds, insurers, retirement accounts, bond-only funds, investors in some countries. A DAT is a door for that money.
- **Cut two: selling the premium.** If the market will pay 1.5 times NAV for your shares, every dollar of stock you sell costs you only 67 cents of bitcoin “share.” When Orange Corp sells 10 million new shares at $15 and buys bitcoin with all of it, bitcoin per share rises **4.5%** (Stage 5.5: issuing above intrinsic value is accretive).
- **Cut three: selling volatility.** Bitcoin is volatile, and an amplified DAT stock is more volatile still. **Volatility itself can be sold** (Stage 7.3): to own the embedded call option, convertible buyers will accept a 0% coupon.
- **Cut four: selling yield.** Income investors want fixed dividends around 10%. The DAT issues them preferred stock and buys bitcoin with the money; as long as bitcoin's long-run return beats the dividend cost, the surplus goes to the common. And this leverage comes **without margin calls** (Stage 7.5).

The four cuts share one feature: **they all require the market to keep paying.** Lose the premium and cut two turns into dilution; let volatility fall and cut three loses its value; let bitcoin grow more slowly than the dividend and cut four eats into the common. That is why the last part of the lesson belongs to the critics, whose strongest argument is precisely that all of this is procyclical.

**This lesson covers mechanics and analytical frameworks only; it is not investment advice.** Stage 16.7 turns cut two into full flywheel math, and Stages 17.2 and 17.3 take cuts three and four down to the level of term sheets.

**This lesson has five parts:**

- **① Access: money that wants bitcoin but cannot buy it directly**
- **② Selling the premium: issuing above NAV**
- **③ Selling volatility: why anyone buys a 0% convertible**
- **④ Selling yield: preferreds and “leverage without margin calls”**
- **⑤ The critics' strongest case, and the bulls' answer**
`,

  mechanics: `
### ① Access: money that wants bitcoin but cannot buy it directly

Financial markets are full of **rule-bound money.** An equity mutual fund's prospectus may allow only listed stocks; a convertible fund can only own convertibles; an insurer's portfolio is shaped by regulatory capital rules; an income fund needs regular cash distributions; residents of some countries cannot buy a US spot bitcoin ETF but can buy US stocks. For this money, **bitcoin itself is not on the menu — but the stock, convertibles and preferreds of a listed company that holds bitcoin are.**

That is the DAT's first reason to exist: **it translates bitcoin into the language of traditional asset classes.**

- **Common stock** → equity and index funds (once included in an index, passive money buys by weight; Stage 5.6)
- **Convertibles** → convertible funds and convertible-arbitrage hedge funds (Stage 8.4)
- **Preferreds** → income funds and yield-seeking retail investors
- **Other currencies** → euro-denominated STRE for European investors; Japan's Metaplanet for Japanese investors

The access premium **shrank** after US spot bitcoin ETFs launched in January 2024: many people who used to buy MSTR just to “get bitcoin exposure” could now buy an ETF directly (Stage 12.5, Stage 15.5). But it did not disappear — an ETF cannot offer **leverage, fixed income or convertibles.**

Access has a flip side: **index rules can change.** In October 2025 MSCI proposed dropping DATs whose digital assets exceed 50% of total assets; on January 6, 2026 it decided not to act for now but froze increases in their share counts. In August 2026 it opened a consultation on “non-operating companies” whose simulation put Strategy and Metaplanet on the deletion list, with results due on or before October 16, 2026 (Stage 18.4). **Access granted by rules can be taken away by rules.**

### ② Selling the premium: issuing above NAV

The second machine is the heart of the DAT. Let the company have \\(S\\) shares and \\(B\\) bitcoin at price \\(P\\), and let the share price imply a basic market-cap mNAV of \\(m\\). It sells \\(k \\times S\\) new shares (\\(k\\) is the issuance fraction) and converts the proceeds into bitcoin:

$$
\\frac{\\text{new BTC per share}}{\\text{old BTC per share}} = \\frac{1 + k \\times m}{1 + k}
m > 1 \\Rightarrow \\text{accretive};\\quad m = 1 \\Rightarrow \\text{unchanged};\\quad m < 1 \\Rightarrow \\text{dilutive}
$$

Orange Corp (\\(m = 1.5\\)) issuing 10% (\\(k = 0.1\\)): \\(\\dfrac{1 + 0.15}{1.1} =\\) **1.045, bitcoin per share +4.5%** — from 10,000 sats to about 10,455. The same move at \\(m = 0.8\\): \\(\\dfrac{1 + 0.08}{1.1} = 0.982\\), **bitcoin per share −1.8%.**

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Issue 10% more shares, buy bitcoin: change in BTC per share vs mNAV</text><line x1="70" y1="230" x2="600" y2="230" stroke="var(--line)" stroke-width="1.5"/><line x1="70" y1="40" x2="70" y2="230" stroke="var(--line)" stroke-width="1.5"/><line x1="70" y1="160" x2="600" y2="160" stroke="var(--muted)" stroke-dasharray="4 3"/><text x="64" y="164" text-anchor="end" font-size="10" fill="var(--muted)">0%</text><text x="64" y="105" text-anchor="end" font-size="10" fill="var(--muted)">+9%</text><text x="64" y="46" text-anchor="end" font-size="10" fill="var(--muted)">+18%</text><text x="64" y="193" text-anchor="end" font-size="10" fill="var(--muted)">−4.5%</text><polyline points="70,189.5 158.5,174.8 247,160 335,130.5 423.5,100.9 512,71.4 600,41.8" fill="none" stroke="var(--btc)" stroke-width="3"/><circle cx="247" cy="160" r="5" fill="var(--ink)"/><text x="255" y="178" font-size="10" fill="var(--ink)">m = 1.0: no change</text><circle cx="335" cy="130.5" r="6" fill="var(--btc)"/><text x="345" y="140" font-size="11" font-weight="700" fill="var(--btc)">Orange Corp m = 1.5 → +4.5%</text><circle cx="176" cy="171.8" r="5" fill="var(--red)"/><text x="168" y="212" text-anchor="middle" font-size="10" fill="var(--red)">m = 0.8 → −1.8%</text><text x="70" y="248" text-anchor="middle" font-size="10" fill="var(--muted)">0.5</text><text x="158" y="248" text-anchor="middle" font-size="10" fill="var(--muted)">0.75</text><text x="247" y="248" text-anchor="middle" font-size="10" fill="var(--muted)">1.0</text><text x="423" y="248" text-anchor="middle" font-size="10" fill="var(--muted)">2.0</text><text x="600" y="248" text-anchor="middle" font-size="10" fill="var(--muted)">3.0</text><text x="335" y="270" text-anchor="middle" font-size="11" fill="var(--muted)">Basic market-cap mNAV (x-axis not evenly spaced)</text></svg><figcaption>The line crosses zero at \\(\\mathrm{mNAV} = 1\\). The higher the premium, the more bitcoin per share the same issuance buys; below 1, the identical move becomes dilution.</figcaption></figure>

At bottom this machine is a **wealth transfer**: new shareholders pay 1.5 times NAV, and the excess they pay becomes extra bitcoin per share for the old holders. Why would new holders agree? Because they believe **the machine will keep turning** — tomorrow someone else will buy at a premium and thicken *their* bitcoin per share. This is the reflexivity of Stage 10.4: premium → issuance → bitcoin per share grows → better story → premium.

Real-world readings: Strategy's BTC Yield was 74.3% in 2024, 22.8% in 2025, and 4.5% for 2026 through July 26 (after the July bitcoin sales and issuance that did not buy bitcoin). In October 2025 it published issuance guidance keyed to mNAV (on its 2025 enterprise-value definition): **below 2.5x, issue “tactically” to pay interest and dividends; 2.5x–4.0x, issue “opportunistically” to buy bitcoin; above 4.0x, issue “actively.”** By August 21, 2026 its mNAV on the 2026 definition was 1.01x — **the second machine had all but stopped.**

### ③ Selling volatility: why anyone buys a 0% convertible

Back to Stage 6.4: \\(\\text{convertible} = \\text{bond floor} + \\text{call option}\\). Run Orange Corp's numbers: a 0% coupon, 5-year convertible with a $25 conversion price (the stock is at $15, a **67% conversion premium**). Each $1,000 of face converts into 40 shares.

- **Bond floor**: $1,000 back in five years, discounted at an 8% credit yield: \\(\\dfrac{\\$1{,}000}{1.08^{5}} \\approx\\) **$681.**
- **Option value**: \\(40 \\times \\text{the value of a 5-year call struck at } \\$25\\) (Black–Scholes, 4.5% risk-free rate). At 40% volatility each call is worth about $3.84 → \\(40 \\times \\$3.84 \\approx \\$154\\) in total; **at 60%, about $255; at 80%, about $345.**
- **Total**: about $834 at 40% volatility, about $936 at 60%, **about $1,025 at 80%.**

In other words, **once the stock's implied volatility is high enough (roughly 75%–80% here), a 0% coupon convertible with a 67% conversion premium is worth par.** DAT common stock is naturally volatile: bitcoin itself swings hard, amplification multiplies that, and mNAV adds swings of its own. **The company is, in effect, selling the volatility of its own stock at a good price.**

Who buys? Mostly **convertible-arbitrage funds**: they buy the convert, short some common against it (by delta), and keep re-hedging as the price moves — buying back as it falls, selling as it rises — so they **earn realized volatility** (the gamma trading of Stage 7.3). They care about volatility and stock-borrow costs far more than about whether the company succeeds in the long run. For a DAT that is a blessing (a steady, price-insensitive buyer base) with one side effect: **when a new convert is issued, arbitrageurs short the stock at the same time**, which can weigh on the price in the short run.

A real example: at June 30, 2026 Strategy had six convertible series with **$6.71 billion** of principal. Two carry 0% coupons (the 2029 notes, conversion price $672.40; the 2030B notes, $433.43); the rest pay 0.625%–2.25%, for roughly $35 million a year of cash interest. **The cost sits elsewhere**: holders have put rights, and the earliest (the 2028 notes, $1.01 billion) can be put on **September 15, 2027** — if the stock is below the conversion price then, the company may have to find cash to repay principal (Stage 17.2).

### ④ Selling yield: preferreds and “leverage without margin calls”

The fourth machine sells to another crowd: **people who want fixed income.** The 30-year Treasury paid about 5.5% in late September 2026 and investment-grade corporates a little more, while DAT preferreds offer 10%–13%: STRF 10%, STRC 12.00% (since July 2026), Strive's SATA 13.00%.

For the common shareholders, this is **borrowing to buy bitcoin**, with the “loan” taking the form of preferred stock. Suppose the company issues \\(X\\) dollars of preferred at dividend rate \\(r\\), buys bitcoin with all of it, and bitcoin appreciates at \\(g\\) a year. After \\(t\\) years the net gain to the common from this trade is roughly:

$$
X \\times (1 + g)^{t} - X - X \\times r \\times t
$$

Example: \\(X = \\$100\\text{M}\\), \\(r = 10\\%\\), \\(t = 5\\) years. \\(g = 20\\%\\) → about +$99M; \\(g = 10\\%\\) → about +$11M; \\(g = 5\\%\\) → about −$22M.

**Bitcoin's return has to beat the cost of the preferred for this machine to make money for the common.** Strategy calls that bar the **BTC Hurdle ARR** — “Strategy's current effective cost of credit. If BTC ARR is above this rate, Net BTC Per Share appreciates faster than bitcoin” — and put it at **10.74%** on August 23, 2026.

Why not simply borrow from a bank? Because **preferred stock has no margin call**:

- Collateralized loans, margin financing and DeFi loans all have a liquidation line; cross it and your assets are sold for you, at the worst possible moment (Stage 7.5, Stage 13.4).
- A preferred is **equity**: no maturity (perpetual), a skipped dividend is not a default (Stage 6.2), and no bitcoin is pledged. The worst case is a dividend suspension — cumulative arrears pile up; non-cumulative ones are simply gone.

It is also **a regulatory and accounting choice**: preferred stock sits in equity rather than liabilities and does not trip debt covenants; for the common shareholders it is “leverage without a trigger.” Strive has made this its selling point — amplifying bitcoin “exclusively through perpetual preferred equity,” with zero debt, zero margin requirements and zero encumbered bitcoin.

But **no trigger does not mean no cost.** Dividends are due in cash every year: Strategy's annual interest and dividends stood at about **$1.703 billion** on August 23, 2026, and bitcoin produces no cash at all. The money can only come from new issuance (common or preferred), the USD reserve, or selling bitcoin — and in 2026 all three were used.

### ⑤ The critics' strongest case, and the bulls' answer

Put the four machines side by side and the critics' case boils down to five points:

- **The premium is self-fulfilling — and self-destroying.** Machine two needs \\(m > 1\\), and \\(m > 1\\) needs everyone to believe the machine will keep turning. In September 2026, per DWF Ventures, **16 of the 20 largest DATs traded below 1x mNAV.** Once the premium is gone, the machine runs in reverse as dilution (Stage 18.3).
- **A transfer is not creation.** The “BTC Yield” that premium issuance delivers to old holders is money overpaid by new holders. The system as a whole conjures no extra bitcoin; it only redistributes bitcoin among shareholders.
- **Procyclicality.** All four machines accelerate together in bull markets (high premiums, high volatility, easy funding) and slow together in bear markets — exactly when cash for dividends is most needed.
- **Rigid obligations, cash-less assets.** Preferred dividends and convertible puts need cash; the asset produces none. This is the other face of Stage 6.5's point that cash-flow rulers break down.
- **Concentration and governance.** Everything rides on one asset and a few decision-makers; changes in index, accounting or tax rules (Stage 15.6, Stage 18.4) can remove access at a stroke.

The bulls' answer is just as specific:

- **No margin call means no forced liquidation.** Perpetual preferreds and long-dated converts let the company wait. In the bear market Strategy bought back its own converts ($1.50 billion face for $1.38 billion) and STRC (about $1.125 billion by September 20, 2026) rather than being forced to dump most of its bitcoin.
- **The market really wants these shapes.** Convertible buyers want volatility, income investors want 10%-plus yields, rule-bound money wants access. DATs meet real demand; they do not invent it.
- **As long as bitcoin's long-run return beats the cost of capital, the structure creates value for the common** — and the bulls believe bitcoin's long-run return sits well above a hurdle of about 10%–11% (the valuation debate of Stage 12.3).

The disagreement finally comes down to one question: **which is larger — bitcoin's long-run return or the DAT's cost of capital?** That is not something this course can answer for you — **mechanics and frameworks only; not investment advice** — but by the end of Stage 18 you will have the complete toolkit to work it out yourself.
`,

  demo: "why-dats-exist",

  analogy: `
A DAT is like **a butcher that sells a cow in cuts.**

Sell the whole cow (bitcoin) to one buyer and that buyer needs a big freezer, the skills to process it, and must accept the going price for “one whole cow.” The butcher cuts it up instead:

- **Tenderloin** (preferred stock) goes to customers who want something steady and respectable: a fixed portion every year, whatever the price of cattle does.
- **Bone-in ribs with a lottery ticket attached** (convertibles) go to customers who like a thrill but hate losses: the bone is the floor, and the ticket pays off big if cattle prices explode. Because cattle prices swing so much, that ticket is especially valuable — so these customers accept a little less meat.
- **The brisket plus every bit of future price upside** (common stock) goes to the boldest customers.

Some customers (rule-bound funds) **are only allowed to buy from a licensed butcher, never a live animal from the ranch** — for them, the shop is the only way in.

If the cuts together sell for more than a whole cow, the butcher uses the surplus to buy another cow, and the existing owners each end up with more beef. **But cutting the cow did not make it any heavier.** Once customers stop paying extra for the cuts, the butcher faces an old problem: the tenderloin customers' “fixed portion every year” is due on schedule, and a cow does not lay eggs.
`,

  misconceptions: [
    "**“Spot ETFs make DATs pointless.”** — ETFs solved part of the access problem, but they cannot offer leverage, fixed income or convertibles. The other three machines (selling the premium, volatility and yield) have no ETF equivalent. The access premium, though, really did thin out because of ETFs.",
    "**“Issuing at a premium to buy bitcoin is a free lunch.”** — It is a wealth transfer from new shareholders to old ones: what new holders overpay becomes the old holders' extra bitcoin per share. No extra bitcoin is created for the system as a whole, and the machine runs only while mNAV is above 1; below that, the same move dilutes.",
    "**“A 0% coupon means the convertible costs the company nothing.”** — The cost is in the option: the company has sold a call (dilution if the stock rises) and given holders put rights — if the stock is below the conversion price on the put date, the company must repay principal in cash.",
    "**“Preferreds have no margin call, so they pose no risk to the common.”** — There is no trigger, but there is an annual cash dividend. If bitcoin's return falls short of the dividend cost (Strategy's BTC Hurdle ARR, about 10.74% in August 2026), this leverage erodes the common's net bitcoin per share.",
    "**“A positive BTC Yield proves the company is creating value.”** — BTC Yield measures the change in bitcoin per share. Issuing preferreds to buy bitcoin pushes it up while ignoring the new senior claims (the company's own caveat), and the BTC Yield from premium issuance is, at bottom, a wealth transfer.",
  ],

  quiz: [
    {
      q: "Orange Corp trades at a basic market-cap mNAV of 1.5. If it issues new shares equal to 10% of the existing count and buys bitcoin with all the proceeds, roughly how does bitcoin per share change?",
      options: [
        "+4.5%: \\((1 + 0.1 \\times 1.5) \\div 1.1\\)",
        "+15%",
        "−10%, because the share count rises 10%",
        "0%, because cash was swapped for bitcoin of equal value",
      ],
      answer: 0,
      explain: "The BTC-per-share ratio \\(= \\dfrac{1 + k \\cdot m}{1 + k} = \\dfrac{1.15}{1.1} \\approx\\) **1.045**. At \\(m = 0.8\\) it would be \\(\\dfrac{1.08}{1.1} \\approx 0.982\\), **−1.8%** — dilution.",
    },
    {
      q: "Why can a 0% coupon, 5-year convertible with a conversion price 67% above today's stock price be worth par?",
      options: [
        "Because the company promises to redeem at 150% in five years",
        "Because the convertible is collateralized by bitcoin",
        "Because when the stock is very volatile, the embedded call option can fill the gap between the bond floor and par",
        "Because interest rates are zero",
      ],
      answer: 2,
      explain: "The bond floor is about $681 (discounted at 8%), leaving about \\(\\$1{,}000 - \\$681 = \\$319\\) for the option to cover. In the Orange Corp example, volatility of roughly 75%–80% gives an option value of about $320–$345 — **the company is selling volatility** (Stage 7.3).",
    },
    {
      q: "A company issues $100M of preferred at a 10% dividend and buys bitcoin with all of it. Over five years, roughly what annual bitcoin return makes the trade break even for the common?",
      options: [
        "0%",
        "About 8.4%: \\((1 + g)^{5} - 1 \\approx 10\\% \\times 5\\)",
        "10%",
        "20%",
      ],
      answer: 1,
      explain: "Five years of dividends cost about \\(X \\times 10\\% \\times 5 = 50\\%\\), so bitcoin must rise 50% in total: \\((1 + g)^{5} = 1.5 \\Rightarrow g \\approx\\) **8.4%**. This simplified version ignores reinvestment; Strategy expresses a similar bar as the **BTC Hurdle ARR** (about 10.74% in August 2026).",
    },
    {
      q: "Which of these is the **downside risk** of the “access” reason for DATs to exist?",
      options: [
        "Bitcoin's fixed supply cap",
        "Convertible-arbitrage funds shorting the stock",
        "The preferred dividend being cumulative",
        "Index providers changing their rules and dropping DATs (as in MSCI's consultation)",
      ],
      answer: 3,
      explain: "Access partly exists because rule-bound money is allowed to buy, so **when the rules change, access shrinks.** MSCI's August 2026 consultation simulated deleting Strategy and Metaplanet, with results due on or before October 16, 2026.",
    },
    {
      q: "When critics call a DAT's four machines “procyclical,” what do they mean most precisely?",
      options: [
        "They only run in bitcoin halving years",
        "Premiums, volatility and easy funding rise together in bull markets and speed the machines up, then fall together in bear markets — just when cash for dividends is most needed",
        "They have nothing to do with the interest-rate cycle",
        "They make the bitcoin price go up",
      ],
      answer: 1,
      explain: "All four machines rely on the market continuing to pay. In 2026 most DATs fell below 1x mNAV, premium issuance stalled, and dividends had to come from reserves or bitcoin sales — procyclicality in real life.",
    },
  ],

  further: [
    { label: "Strategy Q3 2025 results (SEC): mNAV-banded issuance guidance and the STRC rate framework", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312525258690/mstr-ex99_1.htm" },
    { label: "Strategy August 2026 investor briefing (FWP, SEC): BTC Hurdle ARR, Net Reserve and other definitions", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strive treasury dashboard: the preferred-only amplification structure and SATA terms", url: "https://strive.com/treasury" },
    { label: "Options Path (sister course): volatility, gamma and option pricing in depth", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
  ],
};
