export default {
  id: "futures-forwards",
  stage: 7,
  order: 1,
  title: "Futures & Forwards: Locking In Tomorrow's Price Today",
  difficulty: "core",
  prereqs: ["risk-free-rate", "convertible-bonds"],

  oneLiner:
    "A wheat farmer fears that prices will collapse by harvest; a bakery fears they will spike. If the two shake hands today on September's price, that is a **forward**. Standardize the handshake, move it onto an exchange and settle gains and losses every single day, and you have a **future**. Neither creates nor destroys risk — it **moves risk from people who don't want it to people who do**. Bitcoin miners, crypto perpetual swaps and Wall Street's basis trades all run on this same logic.",

  intuition: `
Picture a wheat farmer named Joe. It is spring; the crop is in the ground and won't be harvested until September. What keeps Joe up at night is not the weather — he can't do anything about that — it is the **price**. If wheat falls from $6.00 a bushel to $4.50 by September, a year of work goes up in smoke.

In town there is a bakery whose owner has exactly the opposite nightmare: if wheat climbs to $8.00, flour costs explode, bread prices can't be raised overnight, and the bakery loses money.

Each fears one direction. So they sit down today and sign a piece of paper: **"Delivery in September of 50,000 bushels of wheat at $6.10 a bushel, cash on delivery."** Nobody pays anything today; they simply **lock** a future price. Come September, whether the market says $4.50 or $8.00, Joe sells at $6.10 and the bakery buys at $6.10. Both of them sleep better.

That piece of paper is a **forward contract**: **agreed today, executed later**. Notice three things:

- **It is not a bet; it is two opposite fears cancelling out.** Joe gives up the chance to earn more if wheat soars and gets certainty if wheat collapses; the bakery does the reverse.
- **It does not destroy risk; it relocates it.** Wheat prices still move. The movement simply shows up as "who wins and who loses on the contract" instead of hitting Joe's or the bakery's business.
- **It introduces a new risk: the other side may walk away.** If wheat falls to $4.50, the bakery is overpaying by $1.60 a bushel. Will it find an excuse not to honor the deal? That is **counterparty risk**.

**Futures** were invented to fix that third problem. You standardize the contract (how many tons, which day, what grade), move it onto an exchange, insert a **clearinghouse** as the counterparty to everyone, make both sides post a deposit up front (**margin**), and — the crucial step — settle gains and losses **every day** at the market price. Losers pay the same day. Nobody gets the chance to run up a debt so large they can't pay it.

This lesson sits on two of the course's ideas. **Idea ③ Liquidity & trust (the plumbing)**: the real innovation of futures markets is not "agreeing a future price" — the ancients did that — but the clearinghouse plus daily settlement, a **trust machine** that lets strangers do business with each other for decades. Stage 8.2 opens up how clearinghouses work. **Idea ④ Risk & leverage**: a future controls a full-size position for a small deposit, so it is leveraged by construction, and daily settlement makes that leverage "come due" every evening. That is the starting point for the margin calls and liquidation cascades of Stage 7.5.

There is also a quiet thread to **Idea ① The price of time**. Why does a future usually trade a little above today's spot price? Because "buy now and hold until September" ties up money, and money costs interest. This is the risk-free rate of Stage 2.4 making its first appearance inside a derivative.

In the new era this old tool wears new clothes. CME has listed bitcoin futures since December 2017, letting institutions hedge bitcoin inside a regulated venue. Crypto exchanges invented the **perpetual future** — a future with no expiry that is tethered to spot by a "funding rate" — which is now the highest-volume product in crypto. And a bitcoin miner is really just Joe with a different crop: costs in dollars (power, machines), revenue in bitcoin, and a deep fear of a falling price.

**In this lesson we break it into five pieces:**

- **① Forwards: a handshake on a future price**
- **② Futures: standardization, the clearinghouse and daily settlement**
- **③ How futures are priced: cost of carry, basis, contango and backwardation**
- **④ Hedging vs. speculation: two uses of the same contract**
- **⑤ Futures in the new era: CME bitcoin futures, perpetuals and funding rates**
`,

  mechanics: `
### ① Forwards: a handshake on a future price

A forward is a private agreement between two parties to buy or sell a set quantity of an asset on a future date T at a price K fixed today (the **delivery price**). At signing, no money changes hands — the contract starts with a value of zero. That is what "fair" means here: if one side were obviously ahead on day one, the other would not sign.

At expiry, the **buyer (long)** earns \\(\\text{spot at expiry} - \\text{delivery price}\\); the **seller (short)** earns \\(\\text{delivery price} - \\text{spot at expiry}\\). The two always sum to zero. **A derivative is zero-sum in itself** — it only redistributes the swings of the underlying price between two people.

Joe's numbers: delivery price $6.10, 50,000 bushels.

<table>
<tr><th>September spot</th><th>Joe sells his wheat (spot)</th><th>Short forward P&amp;L</th><th>Joe's total revenue</th></tr>
<tr><td>$4.50</td><td>$225,000</td><td>+$80,000</td><td><b>$305,000</b></td></tr>
<tr><td>$6.10</td><td>$305,000</td><td>$0</td><td><b>$305,000</b></td></tr>
<tr><td>$8.00</td><td>$400,000</td><td>−$95,000</td><td><b>$305,000</b></td></tr>
</table>

**Whatever September brings, Joe's revenue is locked at $305,000.** That is a perfect hedge: the physical position (wheat in the field, naturally "long") plus an equal short forward, and the price risk cancels.

The forward's strength is that it is **tailor-made**: quantity, date, grade and delivery point are all negotiable. It has three weaknesses: **counterparty risk** (the other side may not pay), **hard to exit** (to close early you must renegotiate with the same counterparty) and **opacity** (every price is private). Today the largest forward market is **FX forwards**: exporters and multinationals use them every day to lock exchange rates months ahead, in volumes measured in trillions of dollars.

### ② Futures: standardization, the clearinghouse and daily settlement

Futures repair the forward's three weaknesses one by one:

- **Standardization.** Every contract has fixed specs. CME's bitcoin future is 5 BTC per contract, the micro contract 0.1 BTC; a Chicago wheat future is 5,000 bushels. Standard specs let contracts trade on an exchange like shares, so anyone can close a position at any time.
- **A clearinghouse as central counterparty.** You think you traded with a stranger, but the instant the trade is matched, the clearinghouse steps in and becomes **the seller to every buyer and the buyer to every seller**. Your counterparty risk changes from "some stranger" to "the clearinghouse," which is backed by layers of member margin, a default fund and its own capital (Stage 8.2).
- **Margin plus daily mark-to-market.** You post **initial margin** to open. After every close the clearinghouse computes everyone's gain or loss at the settlement price: **winnings are credited to your account that day, losses are debited that day.** If your balance falls below the **maintenance margin**, you get a **margin call** — top up, or your position is closed for you.

Walk through the numbers. You buy one CME bitcoin future at $100,000 (5 BTC, $500,000 notional) and assume initial margin of 20% of notional, or $100,000 (**illustrative**; exchanges set margins by volatility, and bitcoin futures carry far higher margin rates than equity-index futures).

- Day 1 settles at $96,000: you lose \\(5 \\times \\$4{,}000 = \\$20{,}000\\); the account shows $80,000.
- Day 2 settles at $99,000: you gain \\(5 \\times \\$3{,}000 = \\$15{,}000\\); the account is back to $95,000.
- If one day it settles at $88,000: cumulative loss $60,000, account $40,000. With a $75,000 maintenance level, you must wire $60,000 **that day** to get back to initial margin, or the position gets cut.

The design has a deep logic: **daily marking turns one big bill due at expiry into a series of small bills settled every night.** The worst a default can cost the system is roughly one day's price move. The price you pay is this: **you can be right about direction and still be forced out because you couldn't meet a margin call along the way.** That is the core drama of Stage 7.5 — and exactly the trap British pension funds fell into in September 2022 (Stage 10.3).

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The futures curve: contango, backwardation and convergence</text><line x1="60" y1="240" x2="600" y2="240" stroke="var(--line)" stroke-width="1.5"/><line x1="60" y1="40" x2="60" y2="240" stroke="var(--line)" stroke-width="1.5"/><text x="60" y="258" text-anchor="middle" font-size="11" fill="var(--muted)">Today</text><text x="560" y="258" text-anchor="middle" font-size="11" fill="var(--muted)">Expiry</text><text x="330" y="274" text-anchor="middle" font-size="11" fill="var(--muted)">Time to expiry runs down →</text><line x1="60" y1="150" x2="560" y2="150" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="5 4"/><text x="66" y="165" font-size="11" fill="var(--muted)">Spot price S (held constant)</text><path d="M60 80 C 200 95, 380 120, 560 150" fill="none" stroke="var(--orange)" stroke-width="2.5"/><text x="150" y="78" font-size="12" font-weight="600" fill="var(--orange-ink)">Contango: F &gt; S</text><text x="150" y="94" font-size="10.5" fill="var(--muted)">Positive carry: financing + storage &gt; income from holding</text><path d="M60 215 C 200 205, 380 180, 560 150" fill="none" stroke="var(--blue)" stroke-width="2.5"/><text x="150" y="226" font-size="12" font-weight="600" fill="var(--blue)">Backwardation: F &lt; S</text><text x="150" y="212" font-size="10.5" fill="var(--muted)">Scarce spot or high income: having it now is worth more</text><circle cx="560" cy="150" r="6" fill="var(--orange)"/><text x="552" y="136" text-anchor="end" font-size="11" font-weight="600" fill="var(--ink)">At expiry F = S</text><line x1="96" y1="84" x2="96" y2="146" stroke="var(--orange-line)" stroke-width="1.5"/><text x="100" y="124" font-size="10.5" fill="var(--orange-ink)">Basis</text></svg><figcaption>The gap between the futures price \\(F\\) and the spot price \\(S\\) is the basis. It shrinks as expiry approaches and must be zero on the last day — otherwise there is riskless arbitrage.</figcaption></figure>

### ③ How futures are priced: cost of carry, basis, contango and backwardation

Why doesn't a three-month bitcoin future simply trade at today's spot price? One **arbitrage argument** settles it.

Say bitcoin spot is $100,000, the interest rate is 4% a year, and the future expires in three months. There are two ways to own 1 BTC in three months:

- **Route A:** borrow $100,000 today, buy spot and hold it. In three months you owe the bank \\(\\$100{,}000 \\times 1.04^{0.25} \\approx \\mathbf{\\$100{,}985}\\).
- **Route B:** buy a three-month future today and pay the futures price \\(F\\) at expiry.

Both routes end in the same place — one bitcoin in three months — so they must cost the same: \\(F \\approx \\mathbf{\\$100{,}985}\\). If the future traded at $102,000, you would borrow, buy spot, sell the future and pocket about $1,015 at expiry, risk-free. That is a **cash-and-carry** trade. If it traded at $99,500, you would do the reverse. Arbitrageurs' buying and selling drags the futures price back to its cost of carry.

$$
F = S \\times (1 + r + \\text{storage} - \\text{income from holding})^{T}
\\text{Bitcoin (no storage, no income):}\\quad F \\approx S \\times (1 + r)^{T}
\\text{Wheat:}\\quad F \\approx S \\times (1 + r + \\text{storage} - \\text{convenience yield})^{T}
\\text{Stock index:}\\quad F \\approx S \\times (1 + r - \\text{dividend yield})^{T}
$$

The vocabulary, all at once:

- **Basis**: \\(\\text{basis} = \\text{futures price} - \\text{spot price}\\) (some textbooks flip the sign; always check the convention). Above, the basis is about $985, **roughly 4% annualized**, exactly the financing cost.
- **Contango**: \\(F > S\\), later months cost more than nearer ones. Typical when carry is positive — and typical for bitcoin, where the annualized basis in bull markets often runs well above the risk-free rate (at times 10–20% or more) because many more people want leveraged long exposure than there is capital willing to run the arbitrage.
- **Backwardation**: \\(F < S\\). When spot is scarce (an oil crunch, the lean weeks before harvest), "having it now" is valuable in itself. That value is the **convenience yield**, and it can push futures below spot.
- **Convergence**: at expiry a future *is* spot, so **\\(F\\) must equal \\(S\\)**. This is the anchor of every basis trade: however the basis jumps around on the way, it goes to zero at the end.

Notice the \\(r\\) in there: **futures prices contain an interest rate.** That is where Idea ① lives inside derivatives. Change rates and the "fair" basis of every future moves too. The Treasury basis trade in Stage 7.4 and the "basis/funding yield" of Stage 13.5 both earn the thin gap between the actual basis and the cost of financing it.

### ④ Hedging vs. speculation: two uses of the same contract

The same futures contract is a completely different thing depending on who holds it:

- **Hedgers** already carry price risk (a farmer is naturally long wheat, an airline naturally short jet fuel, a miner naturally long bitcoin). They take the **opposite** position in futures to neutralize it.
- **Speculators** carry no natural exposure. They **choose** to take risk, betting on direction for an expected return.
- **Arbitrageurs** trade both sides at once, earning the gap when price relationships (the basis) drift, and tying futures and spot together.

A healthy market needs all three: **without speculators, hedgers have nobody to hand their risk to.** What speculators earn is, at bottom, an insurance premium paid by hedgers. Keynes called it "normal backwardation": hedgers will sell futures slightly below the expected future spot price, and that gap compensates the speculator for bearing risk.

**A bitcoin miner's hedge.** A miner expects to produce 30 BTC next quarter at an all-in cost (power, machines) of about $60,000 per coin. At $100,000 the margin is lovely; at $55,000 the miner loses money. It sells 30 BTC of three-month futures at about $100,985:

- Bitcoin falls to $70,000: selling the coins brings in $2.1 million, the short futures gain \\((\\$100{,}985 - \\$70{,}000) \\times 30 \\approx \\$930{,}000\\) — about **$3.03 million** in total.
- Bitcoin rises to $130,000: the coins bring in $3.9 million, the short futures lose about $870,000 — again about **$3.03 million**.

**The miner gives up the upside and buys a certain profit.** In practice few firms hedge 100%. A common approach is to hedge part of production (a **hedge ratio** of 30–70%), trading off "sleeping at night" against keeping some upside. That trade-off is exactly what this lesson's demo lets you feel with your own hands.

Real hedges leak in three places:

- **Basis risk**: the contract isn't exactly what you own (Kansas hard red winter wheat vs. the Chicago contract) or the dates don't line up, and the basis itself moves.
- **Quantity risk**: Joe doesn't know what he will actually harvest. Hedge 50,000 bushels, suffer a drought, harvest 30,000 — and the extra 20,000 bushels of short futures is now pure speculation.
- **Liquidity risk**: futures settle daily, but Joe's wheat turns into cash only in September. If wheat spikes over the summer, his short future loses every day and demands margin every day. **On paper he is hedged; in cash he is bleeding.** Firms have "hedged themselves into bankruptcy" this way — Metallgesellschaft's 1993 oil-hedging disaster is the textbook case.

### ⑤ Futures in the new era: CME bitcoin futures, perpetuals and funding rates

**CME bitcoin futures** (launched December 2017) brought bitcoin into the regulated derivatives world: cash-settled (no coins change hands; the difference versus a reference rate is paid), guaranteed by a clearinghouse, open to institutions. Two consequences followed:

- For the first time institutions could **short** bitcoin cheaply and run "long spot / short futures" basis trades. After spot bitcoin ETFs launched in January 2024 (Stage 12.5), "long the ETF, short CME futures" became a popular hedge-fund basis trade — so part of the ETF inflow was a **market-neutral** arbitrage, not a directional bet.
- CME open interest became a window on institutional positioning.

**Perpetual futures ("perps")** are crypto's own invention: futures with **no expiry**. With no expiry there is no convergence to tie the price to spot — so what keeps it honest? The answer is the **funding rate**:

- At fixed intervals (commonly every 8 hours) the exchange compares the perp price with a spot index.
- If the perp trades above spot (too many longs), **longs pay shorts**; if below, shorts pay longs.
- That payment makes "long at a premium" expensive and "short at a premium" profitable, pulling the price back toward spot.

A common baseline rate is 0.01% per 8 hours — three times a day, **roughly 11% a year**. In a euphoric bull market it can run several times higher. So **people who are long perps in a bull market pay a double-digit annual financing cost, and people who hold spot while shorting perps collect it.** That is the engine behind "delta-neutral synthetic dollars," whose risks Stage 13.5 takes apart.

Perps typically allow very high leverage (10x, 20x, even 100x), and positions that fall short are liquidated **automatically and in real time** by the exchange's risk engine — no end-of-day settlement, no grace period. That makes perps the main engine of crypto liquidation cascades, which Stage 7.5 shows accelerating themselves in a crash.

The lesson in one sentence: **a future is a forward plus standardization, a clearinghouse and daily settlement; its price is roughly spot plus the cost of carry (which contains an interest rate); it moves risk from hedgers to speculators and brings leverage and margin calls into the market along with it.** Next, Stage 7.2 turns to a far more lopsided contract: the option, which lets you buy the upside without the downside.
`,

  demo: "futures-forwards",

  analogy: `
A future is like **pre-booking a holiday banquet**.

In October you book a banquet table for New Year's Eve at $2,000 and put down a $200 deposit. By New Year's Eve the price of meat has doubled and walk-in customers pay $3,000 — you still pay $2,000. You bought certainty. Of course, if food prices had crashed and walk-ins paid $1,500, you would still owe $2,000; that is the price of certainty. The restaurant, meanwhile, uses your booking to lock in its own supplier prices and sleeps better too.

That is a **forward**: a price agreed in advance, with risk swapped between you and the restaurant.

Now upgrade it to a **future**. The restaurant stops taking private bookings one by one. Instead it turns "one standard New Year's Eve table" into identical vouchers that trade freely in a big hall. A hall manager (the **clearinghouse**) guarantees every voucher will be honored. To stop anyone walking away, the manager makes everyone post a deposit (**margin**) and settles accounts **every night** at that day's voucher price: if vouchers went up, whoever sold one pays the difference to whoever bought one, that same evening.

New characters appear. Some people never intend to eat the banquet; they think food prices will rise and buy vouchers for the profit (**speculators**). Others notice vouchers trading far above "buy the food now and freeze it until New Year's Eve," so they buy and freeze while selling vouchers (**arbitrageurs**) — and their presence keeps the voucher price glued to "food price plus freezing and financing costs."

A **perpetual** is a voucher **that never expires**. With no New Year's Eve to settle the score, the hall adds a rule: whenever vouchers trade above food prices, voucher holders must pay voucher sellers a fee every eight hours. That "funding fee" is what tugs the voucher price back toward the price of food.
`,

  misconceptions: [
    "**\"The futures price is the market's forecast of the future price.\"** — Not quite. Arbitrage pins a futures price first to its cost of carry (spot + financing + storage − income from holding). Expectations matter, but mostly it reflects what it costs to buy today and hold to expiry. A high bitcoin basis usually says leveraged long demand is strong — not that the market \"predicts\" a rally.",
    "**\"People hedge to make money.\"** — Hedging exists to **reduce uncertainty**, not to raise returns. A fully hedged miner watching bitcoin soar will stare enviously at the losing futures leg. That isn't failure; that's the insurance working. Judging a hedge by whether it made money leads people to cancel it exactly when they need it most.",
    "**\"Futures are zero-sum, so they have no social value.\"** — The contract's gains and losses do sum to zero. But the contract lets farmers plant more, miners buy machines and airlines fix fares. Risk moves to whoever is most willing to bear it, and the total cost of bearing risk across society falls. The contract is zero-sum; the economic activity it enables is not.",
    "**\"Once you're hedged, cash is no longer a problem.\"** — Futures settle daily; the hedged physical asset often turns into cash much later. A big adverse move can force a hedger to post huge amounts of margin, day after day. Gains and losses offset on paper while the cash drains out first — which is how many hedgers actually go bust.",
    "**\"Perpetuals have no expiry, so they have no carrying cost.\"** — The carrying cost is collected as the funding rate, on a schedule. In bull markets longs can pay double-digit annual funding. You never see convergence at expiry, but the debit every 8 hours is the interest you pay for leverage.",
  ],

  quiz: [
    {
      q: "Bitcoin spot is $100,000, the interest rate is 4% a year, and there are no other carrying costs or income. What is the theoretical price of a three-month future closest to?",
      options: [
        "$100,000 — a future should equal spot",
        "About $100,985",
        "About $104,000",
        "Impossible to say; it depends on market expectations",
      ],
      answer: 1,
      explain: "**Cost-of-carry pricing**: \\(F \\approx S \\times (1 + r)^{T} = 100{,}000 \\times 1.04^{0.25} \\approx 100{,}985\\). Stray too far and a cash-and-carry trade (borrow, buy spot, sell the future) pulls it back.",
    },
    {
      q: "What is the key institutional difference between a future and a forward?",
      options: [
        "Futures are only for commodities; forwards are only for financial assets",
        "Forwards must be physically delivered; futures never are",
        "Futures are standardized, exchange-traded, guaranteed by a clearinghouse and marked to market daily, which sharply cuts counterparty risk",
        "Futures always trade above forwards",
      ],
      answer: 2,
      explain: "**Standardization + a central counterparty + daily marking** is the core invention. One big bill at expiry becomes many small bills settled nightly, so a default can cost roughly one day's move.",
    },
    {
      q: "A bitcoin miner has sold futures equal to its expected production. Bitcoin then rallies 30%. Which statement is correct?",
      options: [
        "The hedge failed; the miner should close the short futures immediately",
        "The miner's total revenue is roughly unchanged: futures losses are offset by higher coin sales, though it may have to post margin along the way",
        "The miner's revenue ends up 30% higher than if it hadn't hedged",
        "The futures position automatically converts into spot bitcoin",
      ],
      answer: 1,
      explain: "A hedge exists to **lock the outcome**: extra revenue on the coins offsets the loss on the short. The trap is the **cash-flow mismatch** — futures losses are paid daily, while the coins are sold only once they're mined.",
    },
    {
      q: "A perpetual future is trading above the spot index. What does the funding mechanism do?",
      options: [
        "Shorts pay longs, encouraging even more longs",
        "The exchange halts trading until prices realign",
        "The contract automatically delivers at the next expiry date",
        "Longs pay shorts, making longs expensive and shorts attractive, which pulls the price back toward spot",
      ],
      answer: 3,
      explain: "The **funding rate** replaces convergence as the perp's anchor: longs pay at a premium, shorts pay at a discount. A common baseline is 0.01% per 8 hours, roughly 11% a year.",
    },
    {
      q: "A market is in backwardation — futures trade below spot. What's the most likely reason?",
      options: [
        "Spot is scarce, and the convenience yield of having it now exceeds financing and storage costs",
        "Interest rates are negative",
        "The futures exchange has a technical glitch",
        "Every speculator is long",
      ],
      answer: 0,
      explain: "When the income from holding (convenience yield, dividends) exceeds financing and storage costs, \\(F < S\\). Oil crunches and pre-harvest shortages are classic examples.",
    },
  ],

  further: [
    { label: "CME Group: bitcoin futures contract specs and education", url: "https://www.cmegroup.com/markets/cryptocurrencies/bitcoin/bitcoin.html" },
    { label: "CFTC (U.S. Commodity Futures Trading Commission): investor education and futures basics", url: "https://www.cftc.gov/LearnAndProtect" },
    { label: "Investopedia: Contango, with a comparison to backwardation", url: "https://www.investopedia.com/terms/c/contango.asp" },
    { label: "BIS Working Paper No. 1087, Crypto Carry: where crypto futures basis and funding come from, and their risks", url: "https://www.bis.org/publ/work1087.htm" },
    { label: "Options Path (sister course): a full derivatives primer from futures to options", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
  ],
};
