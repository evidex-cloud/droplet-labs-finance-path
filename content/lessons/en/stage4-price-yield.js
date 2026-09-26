export default {
  id: "price-yield",
  stage: 4,
  order: 2,
  title: "The Price–Yield Seesaw: Why Bonds Fall When Rates Rise",
  difficulty: "core",
  prereqs: ["what-is-bond"],

  oneLiner:
    "A bond's coupon is fixed the day it is issued, but market interest rates move every day. When new bonds pay 6%, the old one in your hands that pays only 5% has to **get cheaper**, until a buyer who takes it over also earns 6%. The standard bond drops from $1,000 to **$925.61**. That is the **price–yield seesaw**: when one end goes up, the other must come down. This lesson explains why the seesaw exists, what **yield to maturity** really is, why **longer bonds sit on longer seesaws** (a 1-point rise in the 30-year Treasury yield knocks roughly 14% off its price), and how the same mechanism runs all the way to Silicon Valley Bank, perpetual preferreds and bitcoin treasury companies.",

  intuition: `
Say that last year you paid $1,000 for the standard bond from Stage 4.1: $1,000 face, 5% coupon, ten years. Fifty dollars of interest a year, nice and steady.

Today, market rates have risen. The Treasury's newly issued 10-year note carries a **6%** coupon. The same $1,000 now buys $60 a year.

You need cash and want to sell your old bond. What does a buyer think?

> “A new bond pays me $60 a year. Yours pays $50. You want the same $1,000 for yours? No chance.”

So you cut the price. By how much? Until **buying your old bond is exactly as good a deal as buying a new one**. The answer is **$925.61**. A buyer who pays $925.61 still collects the $50 coupons, and in ten years gets back the full $1,000. The extra $74.39 at the end makes up precisely for the $10 a year they are missing out on, and their annual return comes to exactly 6%.

Run it the other way. If market rates fall to **4%**, new bonds pay only $40 a year, your $50-a-year bond is suddenly in demand, and it sells for **$1,081.76**.

That is the **seesaw**:

- **Yields up → prices down**
- **Yields down → prices up**

The reason fits in one sentence: **the coupon is written into the contract and cannot change, so when market rates move, the only thing left to adjust is the price.** The price keeps adjusting until the return from “buying this old bond at this price” equals the return the market demands right now. That return is called the **yield to maturity**, and it is what the news means by “yield.”

This lesson rests on **Idea ① The price of time**. Stage 2.3 said an asset is worth its future cash flows discounted at some rate. A bond's cash flows are fixed, so **the rate is the only variable**: move the rate and the price must move. That sounds like a fact about bonds, but it is the most important lever in the whole course. Stocks, houses, preferreds, even bitcoin all have the same discount rate hiding inside their valuations. **The Treasury yield is the fulcrum under the lever that moves everything.**

One more intuition: **the longer the bond, the longer the seesaw**. For a 2-year bond, a 1-point rise in rates costs less than 2% of the price. For a 10-year, about 7.4%. **For a 30-year, about 13.8%.** Cash flows further away get discounted much harder. That is why the Stage 0.1 headline, “the 30-year Treasury yield climbs above 5%,” makes people nervous (Stage 4.5), and why Stage 4.4 turns “sensitivity” into a precise number called **duration**.

**In this lesson we break it into six pieces:**

- **① Fixed coupon, floating price: why the seesaw exists**
- **② Yield to maturity: the rate that makes discounted value equal the price**
- **③ Three “yields”: coupon rate, current yield and yield to maturity**
- **④ Longer bonds, longer seesaws: 2, 10 and 30 years**
- **⑤ Unrealized losses and “hold to maturity”: can you dodge the seesaw?**
- **⑥ The seesaw in the new era: perpetual preferreds, tokenized Treasuries and floating rates**
`,

  mechanics: `
### ① Fixed coupon, floating price: why the seesaw exists

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The seesaw: the coupon is fixed, so when rates move, only the price can</text><rect x="210" y="40" width="220" height="30" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="60" text-anchor="middle" font-size="11" fill="var(--ink)">Fixed by contract: $50 a year + $1,000 at maturity</text><line x1="150" y1="160" x2="490" y2="240" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><polygon points="320,202 298,246 342,246" fill="var(--muted)"/><rect x="92" y="118" width="124" height="36" rx="6" fill="var(--red-soft)" stroke="var(--red)"/><text x="154" y="134" text-anchor="middle" font-size="11" fill="var(--red)" font-weight="700">Market yield ↑</text><text x="154" y="148" text-anchor="middle" font-size="11" fill="var(--ink)">5% → 6%</text><rect x="430" y="246" width="136" height="36" rx="6" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="498" y="262" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="700">Bond price ↓</text><text x="498" y="276" text-anchor="middle" font-size="11" fill="var(--ink)">$1,000 → $925.61</text><text x="610" y="110" text-anchor="end" font-size="11" fill="var(--muted)">New bonds pay 6%, the old one pays 5%</text><text x="610" y="126" text-anchor="end" font-size="11" fill="var(--muted)">→ the old bond cheapens until a buyer earns 6%</text><text x="30" y="214" font-size="11" fill="var(--muted)">The other way: yield ↓ 4%</text><text x="30" y="230" font-size="11" fill="var(--muted)">→ price ↑ $1,081.76</text></svg><figcaption>The fulcrum is the fixed stream of cash flows. When the yield end rises, the price end has to fall; how far depends on maturity (see ④).</figcaption></figure>

Put the opening story into arithmetic. The old bond's cash flows don't change: 20 payments of $25, plus $1,000 at the end of year ten. The market now demands 6% (3% per half-year). What is the bond worth today? Discount each cash flow at 6% and add them up:

$$
Price = 25 ÷ 1.03 + 25 ÷ 1.03² + … + 25 ÷ 1.03²⁰ + 1,000 ÷ 1.03²⁰ ≈ $925.61
$$

Why does the market push the price to exactly that level? **Arbitrage.** If the old bond still sold for $1,000, everyone would sell old and buy new, and the old bond's price would sink. If it fell to $900, its return would beat 6%, buyers would pile in, and the price would be bid back up. Only at $925.61 are the two equally attractive, so buying and selling balance.

Keep two things in mind:

- **The bond has not “gone bad.”** The issuer is just as reliable, and not a cent of cash flow is missing. What changed is **the opportunity outside**. A falling price is simply a higher **opportunity cost**: Stage 2.1's time value, quoted live by the market.
- **The seesaw is symmetric in direction, not in size.** A 1-point rise in yield knocks $74.39 off the standard bond; a 1-point fall adds $81.76. Gains are bigger than losses, and that bend is the **convexity** of Stage 4.4.

### ② Yield to maturity: the rate that makes discounted value equal the price

Section ① went from yield to price. In real life you usually go the other way. The screen shows a price, and you ask, “If I buy at this price, what do I earn?” The answer is the **yield to maturity (YTM)**: **the single rate that makes the discounted value of all the bond's cash flows exactly equal to its current price.**

$$
Price = Σ C ÷ (1 + YTM/2)^k + F ÷ (1 + YTM/2)^n
Given the price, coupon C, face F and number of periods n, solve for YTM
$$

There is no neat formula for solving this; you **search**. Guess a rate and compute the price. If that price comes out above the market price, raise the rate; if below, lower it; repeat until they match. bondYield in _fin.js does exactly this by bisection. Examples:

- The standard bond quoted at **$950** → YTM ≈ **5.66%**
- Quoted at **$1,050** → YTM ≈ **4.38%**

YTM is the bond market's common language. Treasury traders often quote yields rather than prices, and “the 10-year yield is 5.17%” (September 25, 2026) is the YTM backed out of the current 10-year note's price.

But YTM rests on **three assumptions**, and if any one fails, the return you actually earn will drift away from it:

- **You hold to maturity.** Sell early and your sale price depends on rates at that moment, so your return could be higher or lower.
- **No default.** A corporate bond's YTM is the return “if everything is paid as promised.” A promise is not an expectation; Stage 4.6 subtracts expected default losses.
- **Coupons are reinvested at the YTM.** In the example of buying at $925.61 with a 6% YTM, only if every $25 coupon is reinvested at 6% do you end up with about $1,671.76 after ten years ($671.76 of coupons and interest-on-coupons plus the $1,000 principal), which is exactly 6% a year. If rates later fall and reinvestment earns less, your realized return lands below 6%.

### ③ Three “yields”: coupon rate, current yield and yield to maturity

The same standard bond at three different prices:

<table><tr><th>Price</th><th>Status</th><th>Coupon rate</th><th>Current yield = annual coupon ÷ price</th><th>Yield to maturity</th></tr><tr><td>$925.61</td><td>Discount</td><td>5.00%</td><td>5.40%</td><td>6.00%</td></tr><tr><td>$1,000.00</td><td>Par</td><td>5.00%</td><td>5.00%</td><td>5.00%</td></tr><tr><td>$1,081.76</td><td>Premium</td><td>5.00%</td><td>4.62%</td><td>4.00%</td></tr></table>

An easy pattern to remember:

- **Discount bond**: coupon rate < current yield < YTM. You collect the coupons and also get back more than you paid at maturity.
- **Premium bond**: coupon rate > current yield > YTM. You only get $1,000 back at maturity, so the extra you paid up front is money you are “destined to give back.”
- **Par bond**: all three are equal. New Treasuries are usually issued with a coupon close to the prevailing yield, so they start life near par.

**Current yield counts the coupon but ignores the gain or loss at maturity**, so it understates the true return on a discount bond and overstates it on a premium bond. Where it shines is on securities with no maturity date, such as perpetual preferred stock (Stage 6.2), where it is very nearly the whole return.

There is also something that happens with time: **pull to par**. If the market yield stayed at 6% forever, the $925.61 discount bond would climb year by year: about $937.19 after two years, $957.35 after five, $981.41 after eight, and exactly $1,000 on maturity day. A premium bond walks down the same way. **On maturity day every bond is back at face value.** That is the one certain end point of the seesaw.

### ④ Longer bonds, longer seesaws: 2, 10 and 30 years

Line up three bonds that all pay a 5% coupon and change only the maturity:

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Same 5% coupon: the longer the bond, the more its price reacts (face 100)</text><line x1="70" y1="30" x2="70" y2="230" stroke="var(--line)" stroke-width="1.5"/><line x1="70" y1="230" x2="600" y2="230" stroke="var(--line)" stroke-width="1.5"/><line x1="70" y1="167.5" x2="600" y2="167.5" stroke="var(--line)" stroke-dasharray="4 4"/><line x1="330" y1="30" x2="330" y2="230" stroke="var(--line)" stroke-dasharray="4 4"/><line x1="395" y1="30" x2="395" y2="230" stroke="var(--red)" stroke-dasharray="3 3" opacity=".6"/><g font-size="10" fill="var(--muted)" text-anchor="end"><text x="64" y="233">50</text><text x="64" y="171">100</text><text x="64" y="108">150</text><text x="64" y="46">200</text></g><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="70" y="244">1%</text><text x="135" y="244">2%</text><text x="200" y="244">3%</text><text x="265" y="244">4%</text><text x="330" y="244">5%</text><text x="395" y="244">6%</text><text x="460" y="244">7%</text><text x="525" y="244">8%</text><text x="590" y="244">9%</text></g><text x="335" y="258" text-anchor="middle" font-size="10" fill="var(--muted)">Market yield (yield to maturity)</text><polyline fill="none" stroke="var(--blue)" stroke-width="2.5" points="70.0,157.6 102.5,158.9 135.0,160.2 167.5,161.4 200.0,162.7 232.5,163.9 265.0,165.1 297.5,166.3 330.0,167.5 362.5,168.7 395.0,169.8 427.5,171.0 460.0,172.1 492.5,173.2 525.0,174.3 557.5,175.4 590.0,176.5"/><polyline fill="none" stroke="var(--orange)" stroke-width="2.5" points="70.0,120.0 102.5,127.0 135.0,133.7 167.5,140.0 200.0,146.0 232.5,151.8 265.0,157.3 297.5,162.5 330.0,167.5 362.5,172.3 395.0,176.8 427.5,181.1 460.0,185.3 492.5,189.2 525.0,193.0 557.5,196.6 590.0,200.0"/><polyline fill="none" stroke="var(--red)" stroke-width="2.5" points="70.0,38.2 86.3,50.5 102.5,62.1 118.8,73.0 135.0,83.2 151.3,92.8 167.5,101.8 183.8,110.3 200.0,118.3 216.3,125.8 232.5,132.8 248.8,139.5 265.0,145.8 281.3,151.7 297.5,157.3 313.8,162.5 330.0,167.5 346.3,172.2 362.5,176.6 378.8,180.8 395.0,184.8 411.3,188.6 427.5,192.1 443.8,195.5 460.0,198.7 476.3,201.7 492.5,204.6 508.8,207.3 525.0,209.9 541.3,212.4 557.5,214.7 573.8,217.0 590.0,219.1"/><g font-size="10" font-weight="700"><text x="604" y="178" fill="var(--blue)">2y</text><text x="604" y="202" fill="var(--orange-ink)">10y</text><text x="604" y="222" fill="var(--red)">30y</text></g><g font-size="10" fill="var(--ink)"><text x="405" y="60">5% → 6%:</text><text x="405" y="75">2y 98.1 (−1.9%)</text><text x="405" y="90">10y 92.6 (−7.4%)</text><text x="405" y="105">30y 86.2 (−13.8%)</text></g><text x="120" y="200" font-size="10" fill="var(--muted)">Curves bow downward: smaller falls, bigger rises (Stage 4.4)</text></svg><figcaption>All three lines cross par (100) at 5%. The further you move from 5%, the harder the 30-year line swings. That is the “longer seesaw.” Every price is computed with bondPrice in _fin.js.</figcaption></figure>

<table><tr><th>Yield change</th><th>2-year</th><th>10-year</th><th>30-year</th></tr><tr><td>+1 point (5% → 6%)</td><td>−1.86%</td><td>−7.44%</td><td>−13.84%</td></tr><tr><td>−1 point (5% → 4%)</td><td>+1.90%</td><td>+8.18%</td><td>+17.38%</td></tr><tr><td>+2 points (5% → 7%)</td><td>−3.67%</td><td>−14.21%</td><td>−24.94%</td></tr><tr><td>−2 points (5% → 3%)</td><td>+3.85%</td><td>+17.17%</td><td>+39.38%</td></tr></table>

Why are longer bonds more sensitive? Go back to the discount formula. A cash flow t years away is multiplied by 1 ÷ (1+y)^t. **Time sits in the exponent**, so a small change in y gets amplified by t. Money arriving next year barely notices; money arriving in thirty years is rewritten dramatically. Most of a long bond's value sits in those distant cash flows, so its price swings hard.

This gives the course's standard number: **a 30-year Treasury at about a 5% yield has a modified duration of about 15.5.** That means each 1-point move in yield moves the price roughly 15.5% the other way. The exact figures are about −13.8% for a 1-point rise (to 86.2) and about +17.4% for a 1-point fall; the gap between those and 15.5 is convexity. Stage 4.4 explains modified duration and convexity properly. Stage 4.5 explains why the 30-year yield climbing to about 5.5% in September 2026, its highest since 2004, put so many balance sheets under strain.

### ⑤ Unrealized losses and “hold to maturity”: can you dodge the seesaw?

You often hear: “I'm not selling. I'll hold to maturity, so price drops don't matter to me.” That is **half right**.

The right half: if the issuer doesn't default and you really do hold to the end, you are certain to collect the $1,000 face value and every coupon, not a cent less in nominal terms. The price drop is an **unrealized, paper loss** that fades as the bond pulls to par. There's even an upside: after rates rise, the coupons you receive can be reinvested at the higher rate. Run the numbers. Buy the standard bond at par; the yield immediately jumps from 5% to 6% and stays there; you hold to maturity and reinvest each coupon at 6%. Your annualized return over the ten years comes to about **5.21%**, slightly better than the original 5%.

The wrong half has three parts:

- **The opportunity cost is real.** You're locked in at 5% while the market pays 6%. The paper loss is exactly the present value of “earning 1% less every year for ten years.” Not selling spreads the loss over the future; it doesn't make it vanish.
- **You may not get to hold to maturity.** If your money is borrowed, or someone can demand it back at any time, a forced sale turns the paper loss into a real one. **Silicon Valley Bank, closed on March 10, 2023,** followed exactly this script. It had put a large share of its deposits into long-term bonds, rates rose fast, its paper losses grew huge, depositors ran, and the bank had to sell bonds and book the losses (Stage 10.3).
- **Accounting can hide it.** A bank can classify bonds as “held to maturity” and carry them at cost rather than market value. The risk is still there; it just doesn't show.

Feel it with 2026's actual market. The 10-year Treasury yield reportedly pushed above 5% in September 2026, roughly 1.25 points higher than in March. Using the sensitivities in ④, a 10-year bond with a 5% coupon lost about 9% of its price over that stretch. Older bonds from the low-rate era fared far worse. **Suppose** a 30-year Treasury was issued in 2020 with a 1.375% coupon and has 24 years left. At a 5.5% yield it is worth only about **45%** of face value. From “risk-free asset” to “half its paper value,” and not a single default along the way.

### ⑥ The seesaw in the new era: perpetual preferreds, tokenized Treasuries and floating rates

The seesaw isn't just for Treasuries. Anything that promises a fixed stream of future cash sits on the same plank:

- **A perpetual preferred is the longest seesaw of all.** It never matures, so its price is Stage 2.3's perpetuity: price = annual dividend ÷ required yield. Take a preferred with $100 stated value paying $10 a year. At a 10% required yield it's worth $100; if the market demands 11%, it falls to **$90.91**; at 9%, it rises to **$111.11**. There's no maturity date to pull it back to par, which is why it's even more sensitive than a 30-year Treasury (Stage 6.2, Stage 18.1).
- **Preferreds issued by bitcoin treasury companies** are, at heart, long-dated fixed-income products priced as “Treasury yield plus a credit spread.” When the 30-year Treasury yield rises, their required yields get pushed up too and their prices come under pressure. Stage 4.5 and Stage 18.1 walk through that chain properly.
- **Tokenized Treasury funds and stablecoins** barely feel the seesaw, because what they hold are T-bills that mature in weeks or months. A very short bond sits on a very short seesaw, which is how they keep their value pinned near $1 (Stage 13.2, Stage 14.2).
- **Floating rates are a design for removing the seesaw.** Instead of letting the price move, let the coupon follow market rates. The US 2-year floating-rate note works this way, and so does the idea behind Strategy's STRC preferred, which resets its dividend rate monthly in an effort to keep its price close to $100 (Stage 17.4).

**The first question to ask about any “yield product”:** when market rates move, is it the **price** that moves, or the **payout**? The first means duration risk; the second means income risk. There's no such thing as fixed income where neither moves.
`,

  demo: "price-yield",

  analogy: `
Think of a bond as **an employment contract with a fixed salary**, and of market interest rates as **the going rate in the job market**.

Your contract says: for the next ten years you'll be paid $50 a year, and at the end you'll get a $1,000 lump sum. Last year the going rate was 5%, so the contract was worth $1,000. Fair enough.

This year the going rate has risen, and new contracts all pay $60. You want to hand your old contract to someone else. Who would pay the same money for a salary below market? It only sells at a discount, and the discount has to be big enough that the person taking over does as well as they would on a new contract: $925.61. Not a word of the contract changed. **What changed was the market outside.**

The longer the contract, the steeper the discount. An old contract with two years left means two years of being underpaid, so a small discount will do. One with thirty years left means thirty years of being underpaid, so the discount has to be deep. And a “perpetual” contract, which pays that same salary forever and never settles up? When the market moves, its resale value has to be repriced all at once, with no end date to pull it home.

What about a “floating salary” contract that resets to the market rate every month? Its resale value hardly moves, because it's never far below market. The price you pay is that you can never lock in a good salary either.
`,

  misconceptions: [
    "**“If a bond's price is falling, something must be wrong with the issuer.”** Usually not. When Treasury prices fall, it's normally because market rates rose and new bonds are a better deal; the government's ability to pay hasn't changed at all. Worsening credit can also push prices down, but that's a separate story (Stage 4.6).",
    "**“A bond with a 5% coupon yields 5%.”** Only if its price is exactly face value. Buy at $925.61 and the yield to maturity is 6%; buy at $1,081.76 and it's 4%. When the news says “yield,” it means yield to maturity, not the coupon.",
    "**“A 1-point rise in yields hits all bonds about equally.”** Not even close. For the same +1 point, a 2-year falls about 1.9%, a 10-year about 7.4%, a 30-year about 13.8%, and a perpetual preferred more still. Maturity (more precisely, duration) decides how long the seesaw is.",
    "**“If I hold to maturity, I have no interest-rate risk.”** Absent default, you do get your nominal principal back. But you have locked in a below-market return (the opportunity cost is real), and if you're ever forced to sell early, the paper loss becomes a real one on the spot. That's how Silicon Valley Bank went down (Stage 10.3).",
    "**“Rising rates are nothing but bad news for bond investors.”** Existing long bonds do drop in price first. But new buyers lock in higher yields, and existing holders reinvest their coupons at higher rates. Buy a 5% 10-year at par, let rates jump to 6% and stay there, and your held-to-maturity return works out to about 5.21%, slightly higher than before.",
  ],

  quiz: [
    {
      q: "You hold a bond with $1,000 face, a 5% coupon and 10 years left. Yields on comparable new bonds rise from 5% to 6%. What is your bond's price closest to?",
      options: [
        "$1,000, because the coupon hasn't changed",
        "$1,081.76",
        "$925.61",
        "$833.33",
      ],
      answer: 2,
      explain: "**Discount the unchanged cash flows at 6%: about $925.61.** Only at that price is buying the old bond as good as buying a new 6% bond. $1,081.76 is the price if yields fall to 4%.",
    },
    {
      q: "Which of these correctly defines yield to maturity (YTM)?",
      options: [
        "The annual coupon divided by the current price",
        "The single rate that makes the discounted value of all future cash flows equal the current price",
        "The interest rate written into the contract at issue",
        "The policy rate set by the central bank",
      ],
      answer: 1,
      explain: "**YTM is the rate that makes “discounted value = price” true**, found by trial and error. “Annual coupon ÷ price” is the current yield; the contractual rate is the coupon rate.",
    },
    {
      q: "Three Treasuries all pay a 5% coupon and mature in 2, 10 and 30 years. Yields rise from 5% to 6% across the board. Which falls most, and by roughly how much?",
      options: [
        "The 30-year, about −13.8%",
        "The 2-year, about −13.8%, because short bonds react first",
        "All three fall the same, about −1%",
        "The 10-year, about −20%",
      ],
      answer: 0,
      explain: "**Longer bond, longer seesaw.** The 2-year drops about 1.9%, the 10-year about 7.4%, the 30-year about 13.8% (to 86.2). Distant cash flows are discounted harder, which is the intuition behind duration in Stage 4.4.",
    },
    {
      q: "For a bond trading at a discount (below face value), how do the coupon rate, current yield and yield to maturity compare?",
      options: [
        "Coupon rate > current yield > YTM",
        "All three are equal",
        "YTM < coupon rate < current yield",
        "Coupon rate < current yield < YTM",
      ],
      answer: 3,
      explain: "**At a discount: coupon rate < current yield < YTM.** The standard bond at $925.61 shows 5.00% < 5.40% < 6.00%. YTM is highest because it also counts the extra money returned at maturity. For a premium bond the order flips.",
    },
    {
      q: "A perpetual preferred with $100 stated value pays $10 a year. The market's required yield rises from 10% to 11%. What happens to the price, and why is it more sensitive than a 30-year Treasury?",
      options: [
        "It stays at $100, because a preferred has no maturity and so ignores interest rates",
        "About $90.91: a perpetual security has no maturity date pulling it back to par, and all of its value lies far in the future",
        "About $99, a drop of just 1%",
        "About $110, because higher rates make the dividend more valuable",
      ],
      answer: 1,
      explain: "**Perpetuity: price = 10 ÷ 11% ≈ $90.91.** With no maturity date there is no par to converge to, which makes it the longest seesaw of all (Stage 6.2, Stage 18.1).",
    },
  ],

  further: [
    { label: "Investor.gov (SEC): Interest Rate Risk, glossary entry on why fixed-rate bond prices fall when rates rise", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/interest-rate-risk" },
    { label: "FINRA: Bond Yield and Return (YTM, current yield and total return)", url: "https://www.finra.org/investors/insights/bond-yield-and-return" },
    { label: "US Treasury: Daily Treasury Par Yield Curve Rates", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve" },
    { label: "FRED: 30-Year Treasury Constant Maturity Rate (DGS30)", url: "https://fred.stlouisfed.org/series/DGS30" },
    { label: "Options Path (sister course): another angle on how prices respond to their inputs", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
  ],
};
