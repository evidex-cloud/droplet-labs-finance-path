export default {
  id: "options-basics",
  stage: 7,
  order: 2,
  title: "Options Basics: Calls, Puts & Payoff Diagrams",
  difficulty: "core",
  prereqs: ["futures-forwards", "convertible-bonds"],

  oneLiner:
    "A future ties you to a future price, for better or worse. An **option** gives you a **right but not an obligation**: if the price moves your way you exercise, if it doesn't you walk away, losing at most the \"premium\" you paid. What is that asymmetry worth? The answer lies in five inputs, and the most important — and least visible — is **volatility**. Learn to read one payoff diagram and you can read insurance, convertible bonds, and why Strategy can borrow at close to zero interest.",

  intuition: `
You've found a house priced at $1,000,000. You think it could be worth $1,300,000 in six months, but you don't have the cash and you're not sure. So you make the owner an offer: "I'll pay you $30,000 now for a right: at any point in the next six months I can buy this house for $1,000,000. If I don't, you keep the $30,000."

Six months later, one of two things has happened:

- The house is worth $1,300,000. You exercise, pay $1,000,000 for a house worth $1,300,000, subtract the $30,000, and **net $270,000**.
- The house is worth $800,000. Of course you don't buy. **You lose the $30,000, and not a cent more.**

That is a **call option**: you pay a **premium** to buy the **right** — not the obligation — to buy at an agreed price (the **strike**). The mirror image, the right to *sell* at an agreed price, is a **put option**. Your car or home insurance is, at heart, a put: if the car is wrecked (its value collapses), the insurer pays you an agreed amount for it.

Compare the future from the previous lesson (Stage 7.1). A future is **symmetric**: you gain on the way up exactly what you'd lose on the way down, and you're bound either way. An option is **asymmetric**: the buyer's downside is capped at the premium while the upside stays open. **Asymmetry itself is something that can be priced and traded** — if you remember one sentence from Stage 7, make it that one.

So what should the $30,000 be? Your intuition already knows what it depends on:

- How far today's price is from the strike (if the house were already worth $1,200,000, the right would obviously be worth more).
- How much time is left (a one-year right beats a one-week right).
- **How "jumpy" house prices are** (in a sleepy neighborhood where prices never move, the right is nearly useless; where prices could soar or crash, it's valuable — if they crash, you simply don't buy).
- Interest rates (not spending the $1,000,000 yet means the money can earn interest in the meantime).

The third point is the least intuitive and the most important: **the more volatile the asset, the more the option is worth.** An option buyer collects the good outcomes and skips the bad ones, so uncertainty is pure upside for them. That is why the next lesson (Stage 7.3) argues that volatility is itself an asset — and why options on something as volatile as bitcoin, including the ones hidden inside convertible bonds, are unusually valuable.

This lesson rests on **Idea ④ Risk & leverage**: an option lets you **slice risk in half and sell only one half**, and it comes with built-in leverage — $30,000 controls a million-dollar house. It also touches **Idea ① The price of time**: options lose value as time passes, which means time itself has a price.

In the new era options are everywhere. Bitcoin options have traded on crypto venues such as Deribit for years; since November 2024, U.S. spot bitcoin ETFs have had listed options too; and every convertible bond Strategy issues carries an embedded call option on its own stock (Stage 6.4 showed that a convertible = a bond + a call; Stage 17.2 dissects Strategy's actual deals). **This lesson covers mechanics and analytical frameworks only; it is not investment advice.**

**In this lesson we break it into five pieces:**

- **① A right, not an obligation: calls and puts**
- **② Payoff diagrams: the four basic positions**
- **③ In the money, out of the money, and time value**
- **④ What an option is worth: five inputs and Black–Scholes**
- **⑤ Building blocks: insurance, income and convertibles**
`,

  mechanics: `
### ① A right, not an obligation: calls and puts

Every option contract has five elements:

- **Underlying**: a stock, an index, bitcoin, an ETF, a future…
- **Type**: a call (right to buy) or a put (right to sell).
- **Strike K**: the agreed transaction price.
- **Expiry T**: when the right lapses. A **European** option can be exercised only at expiry; an **American** option can be exercised any time before (most U.S. single-stock options are American).
- **Premium**: what the buyer pays the seller.

The obligations on the two sides are completely lopsided. The **buyer (long)** pays the premium and gets the right. The **seller (short, or "writer")** collects the premium and takes on the obligation: if the buyer exercises, the writer must sell at the strike (call) or buy at the strike (put). A U.S. equity option contract usually covers **100 shares**.

That gives four basic roles. Keep this table in your head:

<table>
<tr><th></th><th>Call</th><th>Put</th></tr>
<tr><td><b>Buy (long)</b></td><td>Bet on a rise; max loss = premium; unlimited upside</td><td>Bet on a fall / buy insurance; max loss = premium; max gain = K − premium</td></tr>
<tr><td><b>Sell (short)</b></td><td>Collect "rent"; max gain = premium; <b>loss unlimited as the price rises</b></td><td>Collect an insurance premium; max gain = premium; max loss = K − premium</td></tr>
</table>

**An option writer is an insurance company.** Most of the time it calmly collects premiums; occasionally a catastrophe forces a big payout. Stage 7.3 shows that "selling options" is an enormous business on Wall Street — and the source of many historic blow-ups.

### ② Payoff diagrams: the four basic positions

The best way to express an option isn't a formula; it's a **payoff diagram at expiry**. The horizontal axis is the price of the underlying at expiry; the vertical axis is the position's profit or loss.

A standard example: a stock at $100, with one-year options struck at $100 (volatility 30%, interest rate 4%). Black–Scholes gives theoretical prices of **about $13.75 for the call and $9.83 for the put**.

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="165" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Long call (K=100, premium 13.75)</text><text x="480" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Long put (K=100, premium 9.83)</text><line x1="30" y1="150" x2="300" y2="150" stroke="var(--line)" stroke-width="1.5"/><line x1="40" y1="40" x2="40" y2="240" stroke="var(--line)" stroke-width="1.5"/><text x="296" y="166" text-anchor="end" font-size="10.5" fill="var(--muted)">Price at expiry →</text><text x="46" y="48" font-size="10.5" fill="var(--muted)">P&amp;L</text><polyline points="40,190 165,190 290,60" fill="none" stroke="var(--orange)" stroke-width="3"/><line x1="165" y1="145" x2="165" y2="155" stroke="var(--muted)"/><text x="165" y="206" text-anchor="middle" font-size="10.5" fill="var(--muted)">K = 100</text><circle cx="203" cy="150" r="4" fill="var(--ink)"/><text x="208" y="142" font-size="10.5" fill="var(--ink)">Breakeven 113.75</text><text x="60" y="182" font-size="10.5" fill="var(--red)">Max loss 13.75</text><text x="226" y="96" font-size="10.5" fill="var(--green)">Unlimited upside</text><line x1="345" y1="150" x2="615" y2="150" stroke="var(--line)" stroke-width="1.5"/><line x1="355" y1="40" x2="355" y2="240" stroke="var(--line)" stroke-width="1.5"/><text x="611" y="166" text-anchor="end" font-size="10.5" fill="var(--muted)">Price at expiry →</text><text x="361" y="48" font-size="10.5" fill="var(--muted)">P&amp;L</text><polyline points="355,70 480,178 605,178" fill="none" stroke="var(--blue)" stroke-width="3"/><line x1="480" y1="145" x2="480" y2="155" stroke="var(--muted)"/><text x="480" y="196" text-anchor="middle" font-size="10.5" fill="var(--muted)">K = 100</text><circle cx="448" cy="150" r="4" fill="var(--ink)"/><text x="444" y="140" text-anchor="end" font-size="10.5" fill="var(--ink)">Breakeven 90.17</text><text x="540" y="172" font-size="10.5" fill="var(--red)">Max loss 9.83</text><text x="366" y="100" font-size="10.5" fill="var(--green)">Gains 90.17 if the stock hits 0</text><text x="320" y="262" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="600">The "hockey stick": capped on one side, open on the other — that is the option's asymmetry</text></svg><figcaption>The buyer's loss is capped at the premium. The seller's diagram is the same picture flipped upside down: gains capped at the premium, losses open-ended.</figcaption></figure>

Reading the diagrams with numbers (at expiry):

- **Long call**: stock at 130 → exercise value 30, minus the 13.75 premium, **profit 16.25**; stock at 80 → don't exercise, **loss 13.75**. Breakeven = K + premium = **113.75**.
- **Long put**: stock at 70 → exercise value 30, minus 9.83, **profit 20.17**; stock at 120 → don't exercise, **loss 9.83**. Breakeven = K − premium = **90.17**.
- **Short call / short put**: flip those diagrams upside down. The call writer loses 16.25 with the stock at 130 and 86.25 with the stock at 200 — **the upside never ends, so neither does the writer's loss.**

Compare the future in Stage 7.1: a long future's payoff is a **straight line**; an option's is a **bent line** — the hockey stick. That kink is the option's entire soul.

### ③ In the money, out of the money, and time value

**Moneyness** answers the question "if the option expired right now, would it be worth anything?"

- **In the money (ITM)**: exercising now pays. Call: S > K. Put: S < K.
- **At the money (ATM)**: S ≈ K.
- **Out of the money (OTM)**: exercising now is pointless. Call: S < K. Put: S > K.

The option price therefore splits into two parts:

$$
Option price = intrinsic value + time value
Call intrinsic value = max(S − K, 0)
Put intrinsic value = max(K − S, 0)
$$

**Intrinsic value** is what you'd get by exercising now; **time value** is the hope that things improve before expiry. Example: with the stock at 100, a three-month call struck at 110 (volatility 30%) is worth about **$2.77** in theory. Its intrinsic value is zero (it's out of the money), so **the whole $2.77 is time value** — you're paying purely for the chance of a move above 110 within three months.

Time value follows three rules:

- **It is largest at the money.** Where the outcome is most uncertain, hope is worth the most; deep in or deep out of the money, the ending is mostly decided.
- **It decays as expiry approaches, and faster near the end.** This is **theta**: the buyer pays "rent" every day and the seller collects it.
- At expiry, time value is zero and only intrinsic value remains — which is exactly where the kinked line comes from.

### ④ What an option is worth: five inputs and Black–Scholes

In 1973 Fischer Black and Myron Scholes published their option-pricing formula, and Robert Merton gave a more general derivation the same year. That same year the Chicago Board Options Exchange (CBOE) opened, the first venue for standardized listed options. Scholes and Merton received the 1997 Nobel Memorial Prize in Economics (Black had died in 1995).

The core idea matters more than the formula: **an option can be replicated at every instant with the underlying plus borrowing or lending.** So its price doesn't depend on whether you think the stock will rise or fall — that view is already in the stock price. It depends only on five inputs you can observe or estimate:

<table>
<tr><th>Input</th><th>When it rises, a call…</th><th>a put…</th><th>Intuition</th></tr>
<tr><td>Underlying price S</td><td>↑</td><td>↓</td><td>Closer to / further from paying off</td></tr>
<tr><td>Strike K</td><td>↓</td><td>↑</td><td>Higher price to buy / higher price to sell</td></tr>
<tr><td>Time to expiry T</td><td>↑</td><td>↑ (usually)</td><td>More time = more possibilities</td></tr>
<tr><td><b>Volatility σ</b></td><td><b>↑</b></td><td><b>↑</b></td><td><b>You keep the good outcomes and skip the bad, so more uncertainty = more value</b></td></tr>
<tr><td>Interest rate r</td><td>↑</td><td>↓</td><td>Paying the strike later lets that cash earn interest (Idea ①)</td></tr>
</table>

(Dividend-paying stocks add a sixth input: dividends push calls down and puts up.)

Here is the formula. Don't worry if it looks like hieroglyphics — the point is that it packs those five inputs into one expression:

$$
C = S·N(d₁) − K·e^(−rT)·N(d₂)
d₁ = [ln(S/K) + (r + σ²/2)·T] / (σ·√T),  d₂ = d₁ − σ·√T
N(·) is the cumulative standard normal distribution
$$

Of the five inputs, **only volatility σ can't be observed directly.** Price, strike, time and rate are on the screen; σ is "how bumpy the future will be." So in practice people run the formula backwards: they take market option prices and solve for the σ that fits. That is **implied volatility**, and traders simply quote options in it ("that option is trading at 55 vol"). That's where Stage 7.3 begins.

Feel how powerful σ is. The same one-year at-the-money call (S = K = 100) is worth about **8.03** at 15% volatility, **13.75** at 30%, and **25.13** at 60%. Out-of-the-money options react even more violently: with bitcoin at $100,000, a one-year call struck at $120,000 is worth about **$4,739** at 25% volatility and about **$14,439** at 50%. **Double the volatility and the price roughly triples.**

There is also one iron law that needs no model at all — **put–call parity**:

$$
Call price − put price = S − K·e^(−rT)
$$

In our example 13.75 − 9.83 = 3.92, and 100 − 100 × e^(−0.04) ≈ 3.92. A perfect match. What it says is: **"long a call + short a put" is the same thing as a long forward.** Options, forwards and futures (Stage 7.1) are building blocks from one family.

### ⑤ Building blocks: insurance, income and convertibles

Combine options with the underlying and you can tailor almost any shape of risk:

- **Protective put**: own the stock + buy a put = insure the stock. Losses below the strike are paid by the put; the cost is the premium.
- **Covered call**: own the stock + sell a call = sell away the chance of a big rally in exchange for cash income ("collecting rent"). Gains are capped if the stock soars. Many "high-income" funds and ETFs work exactly like this — **a large part of their "yield" is premium earned by selling away upside.**
- **Collar**: own the stock + buy a put + sell a call, using the call premium to pay for the put and locking the result inside a band.
- **Straddle**: buy a call and a put at the same strike — no bet on direction, **only on movement**. A big move either way pays; a price that sits still loses both premiums. It is the purest form of "buying volatility."

Finally, back to Stage 6.4: **a convertible bond = an ordinary bond + a call option.** Investors accept a very low or even zero coupon because they are also getting a call on the issuer's stock. By the rules above, **the more volatile the stock, the more that call is worth, and the less interest the issuer has to pay.** That is the core reason Strategy has been able to issue convertibles at coupons near zero: its stock sits on top of bitcoin, it is extremely volatile, and the embedded call is therefore valuable. Stage 7.3 explains who buys that volatility; Stage 17.2 dissects the terms of Strategy's convertibles.

The lesson in one sentence: **an option is an asymmetry bought for a premium; its price is set by the underlying price, the strike, time, the interest rate and volatility — and volatility is the least visible and most important of them.** The next lesson is devoted to it: how volatility becomes an asset you can buy and sell.
`,

  demo: "options-basics",

  analogy: `
An option is a **seat-reservation voucher at a movie theater**.

A blockbuster premieres next week; tickets are $100. You pay $10 today for a voucher: until next Monday you may buy that seat for $100 at any time. If you don't use it, the $10 isn't refunded.

- The reviews are ecstatic and scalpers are asking $200: you use the voucher, pay $100, and you're effectively $90 ahead. (That's a **call**.)
- The film flops and seats are half price at the door: you simply don't go. You're out $10. (**The downside is capped.**)

What is the voucher worth? For a re-release of an old classic whose ending everyone knows, nobody scalps tickets, and the voucher is worth almost nothing. For a new release that could be a smash or a disaster, the voucher is valuable — **the more uncertain the outcome, the pricier the voucher**, because you keep the good ending and lose only $10 on the bad one. As the premiere nears and the buzz becomes clear, less and less "hope" is left in the voucher — that's **time value** draining away.

Flip it around: the theater that sells vouchers for $10 is the **option writer**. Most vouchers expire unused and the $10 is free money. But once in a while a phenomenon comes along, and the theater has to hand over for $100 a seat it could have sold for $200.

And a **convertible bond** is a savings card the theater sells you *with a voucher attached*: the card pays almost no interest, but you can later swap it for tickets to the hottest screenings at a fixed price. The more likely the theater is to land a smash hit (**the higher the volatility**), the happier you are to accept a card that pays no interest.
`,

  misconceptions: [
    "**\"Buying options is safe because the most you can lose is the premium.\"** — The loss per trade is capped, but out-of-the-money options usually **expire worthless**: the 100% loss is the normal case, not the exception. Repeatedly buying short-dated OTM options looks a lot like buying lottery tickets — each loss is \"small,\" and together they add up.",
    "**\"Selling options is steady passive income.\"** — Selling options means running an insurance company: nine years in ten you calmly collect, and the tenth can wipe out years of income at once. A naked short call has theoretically unlimited losses. That \"steady yield\" is your payment for carrying tail risk.",
    "**\"Option prices tell you whether the market thinks a stock will go up or down.\"** — Black–Scholes's key insight is that an option can be replicated with the underlying and borrowing, so its price doesn't depend on a directional view (that's already in the stock price). Volatility and the other inputs set the price — not the number of bulls.",
    "**\"A cheap call is a good deal.\"** — Whether an option is expensive has nothing to do with its dollar price. It depends on its implied volatility versus how much the underlying is likely to move. A $1 deep-OTM option can be very expensive; a $20 at-the-money option can be cheap.",
    "**\"Options and convertible bonds are completely different things.\"** — A convertible is a bond plus a call option. Understand options and you understand why volatile companies can issue convertibles at tiny coupons, and why convertible-arbitrage funds buy them (Stages 7.3 and 17.2).",
  ],

  quiz: [
    {
      q: "You buy a call struck at 100 for a premium of $13.75. At expiry the stock is at 120. What is your profit or loss per share?",
      options: [
        "A gain of 20",
        "A loss of 13.75",
        "A gain of 6.25",
        "A gain of 33.75",
      ],
      answer: 2,
      explain: "Intrinsic value = max(120 − 100, 0) = 20, minus the 13.75 premium, **a net gain of 6.25**. Breakeven is K + premium = 113.75.",
    },
    {
      q: "Holding everything else constant, the underlying's volatility rises from 30% to 60%. What happens to call and put prices?",
      options: [
        "Both rise",
        "Calls rise, puts fall",
        "Both fall",
        "Neither changes, because volatility doesn't change the expected price",
      ],
      answer: 0,
      explain: "An option buyer **keeps the good outcomes and skips the bad ones**, so more uncertainty means more value — for calls and puts alike. That's where \"volatility is an asset\" begins.",
    },
    {
      q: "The stock is at 100 and a three-month call struck at 110 costs 2.77. What are its intrinsic value and time value?",
      options: [
        "Intrinsic 10, time value −7.23",
        "Intrinsic 2.77, time value 0",
        "Intrinsic 110, time value 2.77",
        "Intrinsic 0, time value 2.77",
      ],
      answer: 3,
      explain: "Call intrinsic value = max(S − K, 0) = max(100 − 110, 0) = 0; the option is **out of the money**. All 2.77 pays for the chance of rising above 110 within three months — pure time value.",
    },
    {
      q: "Why do convertible bonds from highly volatile companies usually carry very low coupons?",
      options: [
        "Because volatile companies all have high credit ratings",
        "Because the bond embeds a call option; the more volatile the stock, the more that option is worth, so investors accept less interest in exchange for it",
        "Because regulation caps convertible coupons at Treasury yields",
        "Because convertibles have no maturity date",
      ],
      answer: 1,
      explain: "**Convertible = bond + call option** (Stage 6.4). Higher volatility makes the embedded option more valuable, and investors \"pay\" its premium by giving up interest.",
    },
    {
      q: "What is the combination \"own the stock + sell a call\" called, and what's its defining feature?",
      options: [
        "A protective put: insured on the downside, unlimited on the upside",
        "A straddle: no bet on direction, only on movement",
        "A covered call: premium income today, in exchange for capped gains if the stock soars",
        "A collar: zero cost and zero risk",
      ],
      answer: 2,
      explain: "A **covered call** sells the chance of a big rally for cash. The yield on many \"high-income\" products comes largely from premiums earned by selling away upside.",
    },
  ],

  further: [
    { label: "Black & Scholes (1973), The Pricing of Options and Corporate Liabilities (original paper, JSTOR)", url: "https://www.jstor.org/stable/1831029" },
    { label: "The Nobel Prize: 1997 Economic Sciences prize (Merton and Scholes) press release and background", url: "https://www.nobelprize.org/prizes/economic-sciences/1997/press-release/" },
    { label: "OCC, Characteristics and Risks of Standardized Options (the U.S. options disclosure document)", url: "https://www.theocc.com/company-information/documents-and-archives/options-disclosure-document" },
    { label: "Cboe Options Institute: options education", url: "https://www.cboe.com/optionsinstitute/" },
    { label: "Options Path (sister course): a full options course from payoff diagrams to the Greeks", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
  ],
};
