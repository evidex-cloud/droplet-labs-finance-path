export default {
  id: "amm-dex",
  stage: 13,
  order: 3,
  title: "DEXs & AMMs: How x·y=k Replaces the Market Maker",
  difficulty: "newfin",
  prereqs: ["defi-what", "exchanges-brokers"],

  oneLiner:
    "Traditional exchanges match buyers and sellers through an order book and professional market makers. Decentralized exchanges (DEXs) take a different route: put two tokens into a **liquidity pool** and let one formula, `x·y=k`, quote prices automatically. Anyone can trade, and anyone can be the market maker. This lesson takes the formula apart: how it prices, why large orders suffer **slippage**, how arbitrageurs drag the pool back to the market price, and the **impermanent loss** that liquidity providers take on while collecting fees. At bottom, providing liquidity is **selling volatility**.",

  intuition: `
Go back to the exchange of Stage 8.1. Buy orders on one side, sell orders on the other, lined up by price in an **order book**, with the bid–ask spread in between. Who keeps quotes posted so you can always buy or sell? **Market makers**: professional firms that use their own capital and sophisticated models to quote both sides, earn the spread, and carry the price risk.

Try to move that onto a blockchain and you quickly hit a wall. Ethereum produces a block roughly every 12 seconds, and every quote posted or cancelled costs gas. A market maker revises quotes dozens of times a second, which is unaffordable on-chain.

Uniswap, launched in November 2018, offered a minimalist alternative: **no order book and no professional market maker.** Put two tokens, say 1,000 ETH and 3 million USDC, into a smart contract called a **liquidity pool**. The pool has exactly one rule:

$$
x × y = k   (the product of the two token balances stays constant across a trade)
$$

The pool holds ETH and USDC in a ratio of 1 : 3,000, so it believes 1 ETH = 3,000 USDC. Morgan wants to buy ETH with 3,000 USDC. Morgan puts the USDC into the pool, and the pool uses the formula to work out how much ETH to hand back so that the product stays the same: about 0.996 ETH, after a 0.3% fee and a sliver of price impact. No counterparty is "selling" to Morgan. **The formula is the quote.**

Now suppose someone buys with 300,000 USDC in one go. That pulls a visible chunk of ETH out of the pool, and the formula's price climbs as it goes. The average price paid ends up around $3,309, and after the trade the pool quotes about $3,630. That's **slippage**: **the shallower the pool and the bigger the order, the further your average price drifts from the quote.**

Who put the 1,000 ETH and 3 million USDC in the pool? Anyone can. They're called **liquidity providers (LPs)**, and they share the 0.3% fee on every trade. It sounds like money for nothing, but there's a hidden cost. When ETH rallies or slumps hard, the pool automatically "sells what went up and buys what went down." The LP ends up with a mix worth less than simply holding the two tokens and doing nothing. That shortfall is called **impermanent loss**.

This lesson rests on **Idea ③ Liquidity & trust (the plumbing)**. An AMM is the plumbing of on-chain markets, and it answers the question of where liquidity comes from. It also rests on **Idea ④ Risk & leverage**, because an LP's payoff is essentially **short volatility**: collect fees when markets are calm, lose when they swing hard. You saw what selling volatility looks like in Stage 7.3. This is its on-chain version.

**In this lesson we break it into five parts:**

- **① Order books vs liquidity pools: why the chain needs AMMs**
- **② x·y=k: price, slippage and price impact**
- **③ Arbitrageurs: the hand that pulls the pool back to market**
- **④ Impermanent loss: liquidity providers are selling volatility**
- **⑤ Fees, concentrated liquidity and MEV: the reality of DEXs**
`,

  mechanics: `
### ① Order books vs liquidity pools: why the chain needs AMMs

<table>
<tr><th></th><th>Order book (traditional or centralized exchange)</th><th>Automated market maker (AMM)</th></tr>
<tr><td>Who quotes</td><td>Market makers and limit-order traders, one order at a time</td><td>A formula, based on how much of each token the pool holds</td></tr>
<tr><td>Where liquidity comes from</td><td>Professional market makers' capital and models</td><td>Tokens deposited by anyone (liquidity providers)</td></tr>
<tr><td>Cost to trade</td><td>Bid–ask spread + commission</td><td>A fixed fee (e.g., 0.3%) + slippage that grows with trade size</td></tr>
<tr><td>Needs a counterparty?</td><td>Someone must post the opposite order</td><td>No: the pool always quotes (just ever more expensively)</td></tr>
<tr><td>Fit with on-chain constraints</td><td>Every quote change costs gas; high-frequency quoting is impractical</td><td>LPs deposit once and needn't act often</td></tr>
</table>

The core trade-off: **an AMM swaps "always a quote" for "not always a good quote."** Anyone can create a pool for any two tokens and trading starts instantly, which is why long-tail assets find liquidity on-chain so quickly. The price is that a pool doesn't reprice intelligently on news, inventory or hedging costs the way a professional market maker does. It just slides mechanically along a curve.

### ② x·y=k: price, slippage and price impact

Say the pool holds x ETH and y USDC. The pool's **marginal quote**, the price of the very first sliver of ETH you buy, is:

$$
Spot price = y ÷ x = 3,000,000 ÷ 1,000 = 3,000 USDC per ETH
$$

You put in Δy USDC and take out Δx ETH, subject to keeping the product constant (ignore the fee for now):

$$
(x − Δx) × (y + Δy) = x × y
Δx = x × Δy ÷ (y + Δy)
$$

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The constant-product curve x·y=k: a trade is a slide along the curve</text><line x1="80" y1="260" x2="600" y2="260" stroke="var(--line)" stroke-width="1.5"/><line x1="80" y1="260" x2="80" y2="40" stroke="var(--line)" stroke-width="1.5"/><text x="600" y="278" text-anchor="end" font-size="11" fill="var(--muted)">ETH in the pool, x</text><text x="86" y="44" font-size="11" fill="var(--muted)">USDC in the pool, y</text><path d="M110,50 C150,150 220,205 330,228 S520,250 590,253" fill="none" stroke="var(--orange)" stroke-width="2.5"/><circle cx="330" cy="228" r="6" fill="var(--blue)"/><text x="340" y="220" font-size="11" fill="var(--ink)">A: 1,000 ETH / 3M USDC, quote 3,000</text><circle cx="250" cy="212" r="6" fill="var(--red)"/><text x="150" y="190" font-size="11" fill="var(--ink)">B: 909 ETH / 3.3M USDC, quote ≈ 3,630</text><line x1="330" y1="228" x2="250" y2="212" stroke="var(--red)" stroke-width="1.5" stroke-dasharray="4 3"/><text x="300" y="250" font-size="10" fill="var(--red)">put in 300k USDC, take out ≈ 91 ETH</text><text x="470" y="120" font-size="11" fill="var(--muted)">The curve steepens to the left:</text><text x="470" y="136" font-size="11" fill="var(--muted)">less ETH, pricier ETH</text><text x="320" y="294" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">The quote at any point = the slope of the tangent = y ÷ x; a big order pushes you onto the steeper part</text></svg><figcaption>A → B: buying ETH moves the pool up and left along the curve. The average fill is about 3,300 (before fees) and the quote afterwards is about 3,630. The gap is price impact.</figcaption></figure>

Run the standard example (fees ignored):

<table>
<tr><th>USDC you put in</th><th>Share of the pool's USDC</th><th>ETH received</th><th>Average fill</th><th>Quote afterwards</th></tr>
<tr><td>3,000</td><td>0.1%</td><td>≈ 0.999</td><td>≈ 3,003 (+0.1%)</td><td>≈ 3,006</td></tr>
<tr><td>30,000</td><td>1%</td><td>≈ 9.90</td><td>≈ 3,030 (+1%)</td><td>≈ 3,060</td></tr>
<tr><td>300,000</td><td>10%</td><td>≈ 90.9</td><td>≈ 3,300 (+10%)</td><td>≈ 3,630 (+21%)</td></tr>
</table>

The pattern is remarkably clean. **In a constant-product pool, your average price is worse by roughly the fraction of the pool your order represents, and the post-trade quote moves by roughly twice that.** Add the 0.3% fee and you have your all-in cost.

Keep two ideas apart. **Price impact** is how far your own trade pushes the price, fixed by the formula. **Slippage** is the gap between the price you saw when you submitted and the price you actually got. It includes your own price impact plus whatever other trades land before yours, including "sandwich attacks" aimed specifically at you (see ⑤). The "slippage tolerance" setting in your wallet tells the contract: if the fill is worse than expected by more than this much, revert the whole thing (the atomicity of Stage 13.1).

### ③ Arbitrageurs: the hand that pulls the pool back to market

A pool knows only what it holds. It has no idea what the outside world's price is. Suppose ETH rises to $3,300 on centralized exchanges while the pool still quotes $3,000. Who fixes it?

**Arbitrageurs.** They buy ETH cheaply in the pool with USDC and sell it outside at the higher price, and they keep buying until the pool's quote has risen to about $3,300 as well. By the constant-product math, once the price moves from p to p′ the pool holds:

$$
New ETH balance x′ = √(k ÷ p′),   new USDC balance y′ = √(k × p′)
$$

Here k = 1,000 × 3,000,000 = 3 billion. At a price of 3,300, x′ ≈ 953.5 ETH and y′ ≈ 3.146 million USDC. The arbitrageur took about 46.5 ETH out of the pool and put in about 146,000 USDC, an average price of about 3,146, then sold outside at 3,300 for a profit of roughly $7,000 before fees and gas.

**Who paid for that profit? The LPs.** The pool sold ETH at a stale price to an informed arbitrageur. That is the deepest economics of an AMM: **the pool's price always follows passively, and every catch-up pays the arbitrageur some tuition.** Researchers call this cost "loss-versus-rebalancing" (LVR). Whether LPs make money depends on whether fee income covers this steady tuition bill.

It also explains why AMM prices usually sit very close to centralized-exchange prices: **arbitrageurs are the AMM's pricing engine.** But when outside markets lurch or the chain is congested, a pool's price can drift for a while, and lending protocols that rely on pool prices can be exploited (the oracle problems of Stage 13.4 and Stage 13.6).

### ④ Impermanent loss: liquidity providers are selling volatility

Morgan becomes an LP at ETH = 3,000, depositing 10 ETH + 30,000 USDC ($60,000 in all). ETH then doubles to 6,000 and arbitrageurs rebalance the pool. By the formulas above, Morgan's share becomes about 7.07 ETH + 42,426 USDC:

- **Value as an LP:** 7.07 × 6,000 + 42,426 ≈ **$84,853**
- **Value from doing nothing (HODL):** 10 × 6,000 + 30,000 = **$90,000**
- **Shortfall ≈ −5.7%.** That's the impermanent loss.

The general formula depends only on the price ratio r:

$$
Impermanent loss = 2√r ÷ (1 + r) − 1
$$

<table>
<tr><th>Price change</th><th>×1.25</th><th>×1.5</th><th>×2</th><th>×3</th><th>×4</th><th>×0.5</th><th>×0.25</th></tr>
<tr><td>Impermanent loss</td><td>−0.6%</td><td>−2.0%</td><td>−5.7%</td><td>−13.4%</td><td>−20.0%</td><td>−5.7%</td><td>−20.0%</td></tr>
</table>

Three things to notice:

1. **You lose in both directions.** The further the price travels either way, the bigger the loss. It's a **concave**, downward-bending payoff.
2. **"Impermanent" means** the loss disappears if the price returns to where you started. Withdraw while the price is away, and the loss becomes permanent.
3. **It is short volatility.** Recall the options of Stage 7.2 and the vol-selling of Stage 7.3. Someone who sells both a call and a put earns premium when the price sits still and loses when it moves far. The LP's fees are the premium, and impermanent loss is getting exercised. **Calm, choppy markets are an LP's best friend. Big one-way moves up or down are the cruellest.**

So when someone asks "what's the annual return on being an LP?", the right formula is **fee income − impermanent loss (more precisely, LVR) − gas and opportunity cost**. Take a pool advertising "30% a year in fees". If one of its tokens falls 75% during the year, impermanent loss eats 20 percentage points, before you even count the fall in the token itself. Stage 13.5 puts LP fees into the full list of where DeFi yield comes from.

### ⑤ Fees, concentrated liquidity and MEV: the reality of DEXs

The constant product is only the starting point. Real DEXs have evolved in three directions:

- **Curves for similar assets.** Two stablecoins (USDC and USDT) should trade almost exactly 1:1, and a constant-product curve wastes capital on them. Curve and similar protocols use curves that are nearly flat around 1:1 and steepen only when prices diverge, so large stablecoin swaps barely slip. The flip side is that when one coin depegs, the pool is forced to soak up huge amounts of the bad coin. Such pools went badly lopsided during the USDC episode of 2023 (Stage 13.2).
- **Concentrated liquidity.** Uniswap v3 (May 2021) lets LPs supply liquidity only within a price range, say ETH between 2,800 and 3,200. The same capital gives far more depth inside the range and earns far more fees. But once the price leaves the range, the LP is holding nothing but the token that fell, so **impermanent loss is magnified**. The LP has effectively sold shorter-dated, more concentrated volatility. Providing liquidity has turned from "deposit and wait" into an actively managed market-making business, and professional firms are back at center stage.
- **MEV and sandwich attacks.** Your transaction is public before it lands in a block. A bot sees your large ETH purchase and buys just ahead of you, pushing the price up. You fill at the worse price, and the bot sells right behind you for a profit. You've been "sandwiched." **The wider your slippage tolerance, the more can be squeezed out of you.** Private transaction channels and batch auctions exist to cut this hidden tax.

Finally, put it back in the big picture. AMMs let any token trade instantly in a 24/7 on-chain market. They are DeFi's "exchange plus market maker." If tokenized stocks and bonds (Stage 14.3) move on-chain, their liquidity will come either from pools like these or from order books rebuilt on-chain. Either way, the trade-off is the old question from Stage 8.1: **who bears the risk of making markets, and who collects the spread for it?**
`,

  demo: "amm-dex",

  analogy: `
Picture an **automated currency-exchange kiosk** with just two cash boxes, one of euros and one of dollars. The kiosk ignores the news and never checks the exchange rate. It keeps one rule: **the product of the two boxes' balances must stay the same.**

Put dollars in and the euro box pays you out. But each note it hands over leaves the euro box a little emptier, so the next euro costs a little more. Change a small amount and you get nearly the posted rate. Change a big amount and each euro gets pricier as you go. That's slippage.

When the rate at the bank next door moves, the kiosk doesn't know. So a sharp **runner** shows up. If euros have gone up at the bank, the runner buys euros cheaply at the kiosk with dollars and sells them at the bank, until the kiosk's implied rate catches up. The runner pockets a little on every trip, and that money comes from the "shareholders" who stocked the boxes: the LPs.

Why do the shareholders keep their money there? Because everyone who changes money pays a 0.3% fee, and the fee goes to them. When the rate wobbles back and forth a little each day, plenty of people trade, fees pile up, and the boxes shift around but mostly return to their starting mix, so shareholders profit. When one currency rallies or collapses in a straight line, runners keep "selling the one that's rising cheap and buying the one that's falling dear," and shareholders end up with less than if they'd done nothing. That's impermanent loss.

Being a shareholder in the kiosk is like **writing exchange-rate insurance**: you collect premiums in quiet times and pay out when rates lurch. The question isn't "how big are the fees?" but "**do the premiums cover the claims?**"
`,

  misconceptions: [
    "**\"Someone in the AMM is selling to me, just like on an exchange.\"** Nobody is selling to you order by order. A formula quotes you a price from the pool's two balances, and your counterparty is the LPs' pooled capital. When the pool drifts from the outside price, arbitrageurs drag it back.",
    "**\"The fees yield 30% a year, so being an LP yields 30%.\"** Subtract impermanent loss (more precisely, the LVR arbitrageurs keep extracting), gas and opportunity cost. A doubling or a halving costs about 5.7%; a fourfold move, about 20%. Fees are the premium for selling volatility, not a net return.",
    "**\"Impermanent loss is temporary, so ignore it.\"** It disappears only if prices return to the exact ratio at which you deposited. Most tokens don't politely return to where they started, and if you exit while the price is away, the loss becomes permanent.",
    "**\"A generous slippage tolerance makes trades succeed more often, with no downside.\"** The wider the tolerance, the more a sandwich bot can squeeze out of you. It's a signed note to the market saying \"I'll overpay by up to this much,\" and it should be set with care based on trade size and pool depth.",
    "**\"A pool's price is the true market price, so use it directly as an oracle.\"** Pool prices follow passively and can be shoved away from the market in an instant by one large trade, even one funded by a flash loan. Pricing a lending protocol off a single pool's spot price is one of the most common ways DeFi protocols have been attacked (Stage 13.6).",
  ],

  quiz: [
    {
      q: "A constant-product pool holds 1,000 ETH and 3 million USDC. Ignoring fees, what is the average price when you buy ETH with 300,000 USDC?",
      options: [
        "$3,000",
        "About $3,300",
        "About $3,630",
        "About $2,727",
      ],
      answer: 1,
      explain: "Δx = 1,000 × 300,000 ÷ 3,300,000 ≈ 90.9 ETH, so the average price ≈ 300,000 ÷ 90.9 ≈ **3,300**, about 10% dearer, matching the order's 10% share of the pool. 3,630 is the pool's quote **after** the trade.",
    },
    {
      q: "After ETH rallies on centralized exchanges, what brings the AMM pool's price up to match, and who bears the cost?",
      options: [
        "A protocol administrator reprices by hand; the protocol bears the cost",
        "An oracle updates the price automatically at no cost",
        "Arbitrageurs buy low in the pool and sell high outside; liquidity providers bear the cost",
        "Traders voluntarily pay more; traders bear the cost",
      ],
      answer: 2,
      explain: "**Arbitrageurs are the AMM's pricing engine.** The pool sells them ETH at a stale price, and LPs pay that ongoing tuition (LVR), which fees must cover.",
    },
    {
      q: "An LP deposits when ETH is $3,000, and ETH then falls to $750 (0.25×). Relative to simply holding, what is the LP's impermanent loss?",
      options: [
        "−5.7%",
        "−75%",
        "0%, because only rallies cause impermanent loss",
        "−20%",
      ],
      answer: 3,
      explain: "2√0.25 ÷ 1.25 − 1 = 1 ÷ 1.25 − 1 = **−20%**. Impermanent loss is symmetric: ×4 and ×0.25 cost the same. And it comes **on top of** the large fall that simply holding would already have suffered.",
    },
    {
      q: "Why is being an LP described as \"selling volatility\"?",
      options: [
        "The LP's payoff is concave: it earns fees when prices are calm and loses when prices move far in either direction, much like selling a straddle",
        "Because LPs are required to sell call options on an options exchange",
        "Because an LP's return has nothing to do with volatility",
        "Because LPs lose money only when prices rise",
      ],
      answer: 0,
      explain: "Fees ≈ premium; impermanent loss ≈ being exercised. Choppy, calm markets suit LPs best and violent one-way moves hurt most, the same risk shape as the vol-selling of Stage 7.3.",
    },
    {
      q: "What is the main effect of concentrated liquidity (such as Uniswap v3's price ranges) on an LP?",
      options: [
        "It eliminates impermanent loss entirely",
        "The same capital gives more depth and more fees inside the range, but impermanent loss is magnified once the price leaves it",
        "The LP no longer bears any token price risk",
        "It affects only traders, not LPs",
      ],
      answer: 1,
      explain: "**More concentration means selling more concentrated volatility.** You earn more in range, and out of range you hold only the token that fell. That turns liquidity provision into an actively managed market-making business.",
    },
  ],

  further: [
    { label: "Uniswap docs: protocol concepts and constant-product market making", url: "https://docs.uniswap.org/concepts/overview" },
    { label: "Uniswap v2 whitepaper (Adams, Zinsmeister & Robinson, 2020)", url: "https://app.uniswap.org/whitepaper.pdf" },
    { label: "Uniswap v3 whitepaper: concentrated liquidity (2021)", url: "https://app.uniswap.org/whitepaper-v3.pdf" },
    { label: "Milionis et al. (2022), Automated Market Making and Loss-Versus-Rebalancing (arXiv)", url: "https://arxiv.org/abs/2208.06046" },
    { label: "Ethereum.org: Maximal extractable value (MEV) explained", url: "https://ethereum.org/en/developers/docs/mev/" },
  ],
};
