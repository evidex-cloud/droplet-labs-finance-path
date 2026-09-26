export default {
  id: "defi-yield",
  stage: 13,
  order: 5,
  title: "Where DeFi Yield Comes From: Real Yield vs Token Emissions",
  difficulty: "newfin",
  prereqs: ["amm-dex", "defi-lending", "risk-free-rate"],

  oneLiner:
    "DeFi is plastered with \"8% APY,\" \"25% APY,\" \"200% APY.\" This lesson asks one question: **who is paying?** Real yield has only a handful of sources: interest from borrowers, fees from traders, staking rewards, funding paid by longs to shorts, and Treasury interest brought on-chain. Everything else is either a subsidy in freshly minted protocol tokens, which evaporates with the token price, or a risk you're selling without realizing it. Break any yield into \"risk-free rate + risk premium + subsidy,\" subtract expected losses, and you can tell a return from bait. **If you can't find the source of the yield, you are the yield.**",

  intuition: `
In early 2022, the Anchor protocol in the Terra ecosystem paid about 20% a year on UST deposits. US Treasury bills yielded under 1% at the time. Plenty of people put their savings in, for a simple reason: "it's always paid." A few months later (Stage 13.2), UST went to zero.

The problem was never that 20% was high. The problem was that **nobody could say who was paying it.** Borrower interest came nowhere close. A subsidy fund from the project filled the gap, and once the subsidy ran out, the yield could only come from new depositors' money.

This lesson rests on **Idea ① The price of time**. Go back to Stage 2.4: the required return on any asset = **the risk-free rate + risk premia**. In September 2026 the 3-month US Treasury bill yielded about 4.24%. That's the floor for dollars everywhere, and the benchmark every DeFi yield should be measured against. **A stablecoin product paying 4% is worse than a T-bill, since it adds contract and depeg risk. One paying 8% owes its extra 4 points to some risk. One paying 40% means you've found a genuine money machine, or someone is subsidizing you, or you're selling insurance you don't understand.**

It also rests on **Idea ④ Risk & leverage**. DeFi's most common high yields come from three hidden kinds of selling: selling volatility (being an LP, Stage 13.3), selling tail risk (lending to over-collateralized borrowers, Stage 13.4), and selling liquidity (lock-ups, redemption queues). In normal times they look like steady interest. When something breaks, you give it all back at once.

So the method here is simple. Itemize it like an accountant:

$$
Headline APY = real sources (interest + fees + staking + funding + Treasuries) + token subsidy − impermanent loss − expected loss − costs
$$

Then ask three questions. **① Who is paying the real part? ② How much is subsidy, and how much of it survives if the token falls? ③ After expected losses, how much does it beat the 4.24% T-bill, and is that premium worth the risk I'm taking?**

**In this lesson we break it into five parts:**

- **① First principles: every cent of yield is someone else's money**
- **② Real yield I: borrower interest, trading fees and staking rewards**
- **③ Real yield II: funding rates, basis and "synthetic dollars"**
- **④ Things that look like yield: token emissions, points and MEV**
- **⑤ The on-chain risk-free rate and risk premia: a scorecard**
`,

  mechanics: `
### ① First principles: every cent of yield is someone else's money

Finance doesn't create returns out of thin air. Every interest payment, dividend and fee traces back to someone who pays it, and to the reason they're willing to:

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Five real sources of DeFi yield and one "subsidy" source: who pays whom</text><g font-size="11"><rect x="30" y="45" width="170" height="30" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="115" y="65" text-anchor="middle" fill="var(--ink)">Borrowers (want leverage)</text><rect x="30" y="85" width="170" height="30" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="115" y="105" text-anchor="middle" fill="var(--ink)">Traders (want instant swaps)</text><rect x="30" y="125" width="170" height="30" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="115" y="145" text-anchor="middle" fill="var(--ink)">Network (new ETH + tx fees)</text><rect x="30" y="165" width="170" height="30" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="115" y="185" text-anchor="middle" fill="var(--ink)">Perp longs (want levered longs)</text><rect x="30" y="205" width="170" height="30" rx="6" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="115" y="225" text-anchor="middle" fill="var(--ink)">US Treasury (borrows)</text><rect x="30" y="245" width="170" height="30" rx="6" fill="var(--red-soft)" stroke="var(--red)"/><text x="115" y="265" text-anchor="middle" fill="var(--ink)">Newly minted protocol tokens</text><rect x="440" y="45" width="170" height="30" rx="6" fill="var(--green-soft)" stroke="var(--green)"/><text x="525" y="65" text-anchor="middle" fill="var(--ink)">Depositors / lenders</text><rect x="440" y="85" width="170" height="30" rx="6" fill="var(--green-soft)" stroke="var(--green)"/><text x="525" y="105" text-anchor="middle" fill="var(--ink)">Liquidity providers (LPs)</text><rect x="440" y="125" width="170" height="30" rx="6" fill="var(--green-soft)" stroke="var(--green)"/><text x="525" y="145" text-anchor="middle" fill="var(--ink)">Stakers / validators</text><rect x="440" y="165" width="170" height="30" rx="6" fill="var(--green-soft)" stroke="var(--green)"/><text x="525" y="185" text-anchor="middle" fill="var(--ink)">Hedged shorts (basis trade)</text><rect x="440" y="205" width="170" height="30" rx="6" fill="var(--green-soft)" stroke="var(--green)"/><text x="525" y="225" text-anchor="middle" fill="var(--ink)">Tokenized T-bill holders</text><rect x="440" y="245" width="170" height="30" rx="6" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="525" y="265" text-anchor="middle" fill="var(--ink)">"Yield farmers"</text></g><g stroke="var(--muted)" stroke-width="1.5"><line x1="200" y1="60" x2="440" y2="60"/><line x1="200" y1="100" x2="440" y2="100"/><line x1="200" y1="140" x2="440" y2="140"/><line x1="200" y1="180" x2="440" y2="180"/><line x1="200" y1="220" x2="440" y2="220"/></g><line x1="200" y1="260" x2="440" y2="260" stroke="var(--red)" stroke-width="1.5" stroke-dasharray="5 3"/><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="320" y="55">interest</text><text x="320" y="95">fees</text><text x="320" y="135">staking rewards</text><text x="320" y="175">funding</text><text x="320" y="215">T-bill interest</text></g><text x="320" y="255" text-anchor="middle" font-size="10" fill="var(--red)">subsidy (vanishes if the token falls)</text><text x="320" y="294" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">Solid lines: someone genuinely pays for a service. Dashed: the money comes from diluting other token holders</text></svg><figcaption>The first five are real yield: the payer gets something it wants (leverage, a swap, block space, long exposure, financing). The last is a subsidy. It isn't the price of a service; it's a marketing budget.</figcaption></figure>

Two corollaries:

- **Real yield has a demand ceiling.** Borrower interest depends on how many people want to borrow, fees on trading volume, funding rates on how euphoric the longs are. **Real yield is high in bull markets and low in bear markets**, because the payers are mostly people seeking leverage. That's why DeFi yields track the crypto cycle so closely.
- **The higher the yield, the more you should ask why the payer is willing to pay so much.** Someone paying 15% to borrow stablecoins expects to earn more than that with the money, usually through a riskier leveraged trade. As the lender, you've quietly become the bottom layer of funding for that trade.

### ② Real yield I: borrower interest, trading fees and staking rewards

**Borrower interest** (Stage 13.4) is the most transparent source. Supply rate = borrow rate × utilization × (1 − reserve factor). The risks are bad debt from failed liquidations and a withdrawal queue when utilization hits 100%. On September 26, 2026, the largest lending protocol, Aave, had about $13 billion of loans outstanding, which gives you the scale of demand behind this source.

**Trading fees** (Stage 13.3) are the 0.05%–1% that LPs collect. They aren't net income, because you must subtract impermanent loss (more precisely the LVR that arbitrageurs keep extracting). In a volatile pair like ETH/USDC, a doubling or a halving over the year costs about 5.7 percentage points.

**Staking rewards.** Since Ethereum moved to proof of stake (the "Merge") on September 15, 2022, staking ETH to help validate blocks earns newly issued ETH plus a share of transaction fees, on the order of a few percent a year (it varies with how much ETH is staked). Two caveats. It's paid in ETH, so **you carry ETH's full price risk**. And part of it is newly issued ETH, which dilutes holders who don't stake. **Liquid-staking tokens**, tradable receipts for staked ETH, let you earn the staking yield and still use the receipt as collateral. That's the first brick in the "four-brick tower" of Stage 13.1, and it's the kind of asset that went wrong in the KelpDAO incident of April 2026.

**A common amplifier is looped staking.** Stake ETH and get a receipt → post it to a lending protocol and borrow ETH → stake again → borrow again. With a 3% staking yield and a 2.5% ETH borrow rate, 4x leverage yields about 3% + 3 × 0.5% = 4.5%. The extra 1.5 points pay you for extra **receipt-depeg risk** (a receipt slipping against ETH triggers liquidation) and **borrow-rate spike risk**. The yield grew a little and the risk grew fourfold.

### ③ Real yield II: funding rates, basis and "synthetic dollars"

Stage 7.1 covered perpetual futures and **funding rates**. A perpetual has no expiry, so to keep its price near spot, longs and shorts pay each other a funding fee every few hours. When the market is broadly bullish and longs are crowded, **longs pay shorts**, and in bull markets annualized funding frequently runs into double digits.

That creates a "directionless" yield, the **spot–perpetual basis trade (delta-neutral)**:

- Buy 1 ETH spot, ideally staked, to earn the staking yield too;
- Short 1 ETH in perpetual futures at the same time;
- ETH's moves cancel across the two legs, and what you collect is **staking yield + the funding paid to shorts**.

With 3% staking and 10% annualized funding, that's roughly 13% on the ETH notional, before trading costs and the capital tied up as margin on the short. Wrap that position in a token designed to hold $1 and you have a **synthetic dollar**. Ethena's USDe is the best-known example. Its yield has reached double digits in bull markets, because at bottom it **collects rent from everyone in the market who wants to be levered long**.

The risks are just as clear:

- **Funding can turn negative.** In a bear market shorts crowd in and have to pay longs, and the yield goes negative.
- **Exchange and custody risk.** The short leg often sits on a centralized exchange. If the exchange fails (FTX, Stage 10.5) or auto-deleverages positions, the hedge can lose a leg.
- **Mispricing in extreme markets.** During the roughly $19 billion liquidation wave of October 10, 2025, USDe traded as low as about $0.65 on a single exchange, Binance.

The main arena for perpetuals has moved on-chain as well. Monthly perpetual-DEX volume first topped $1 trillion in September 2025 and hit a record of about $1.2 trillion that October. The leader, Hyperliquid, set a record of about $14.3 billion in open interest on September 8, 2026. Perps on "real-world" underlyings such as stocks and commodities had become its largest category, and Coinbase began routing orders to it in August 2026. **Funding rates are becoming a "price of leverage demand" that spans crypto and traditional assets.**

### ④ Things that look like yield: token emissions, points and MEV

**Token emissions (liquidity mining).** In June 2020 Compound began handing COMP tokens to its users, and "DeFi summer" was off. A protocol pays depositors and LPs in **freshly printed tokens of its own** to attract capital. On the dashboard it shows as "40% APY," but:

- nobody is paying for a service. It **dilutes other token holders**, so it's really a marketing expense;
- it's paid in the token. If the token falls 80% over the year, a "40% APY" is really about 8%, and since every farmer is dumping rewards, the farming itself pushes the price down;
- when the subsidy stops, the "mercenary capital" leaves at once, and the remaining real yield is often a fraction of the subsidized rate.

**Points and airdrop hopes.** A later variant skips the token and hands out "points," hinting they may convert into tokens someday. That defers the subsidy into the future and pushes the uncertainty onto you.

**MEV** (Stage 13.1). Block builders profit from ordering transactions, and some of that flows to stakers through staking rewards. It's real money, but it comes from **slippage squeezed out of ordinary traders**. It's a tax, not productive income.

**Warning signs that you are the yield:** a yield well above comparable products with no clear source; a yield that never moves (real yield fluctuates with markets); long lock-ups or queued redemptions; returns from an undisclosed "strategy" or an off-chain manager. On November 4, 2025, Stream Finance disclosed that an external fund manager had lost about $93 million, and its yield-bearing stablecoin xUSD fell to about $0.25. **An on-chain token with an off-chain black box behind it.**

### ⑤ The on-chain risk-free rate and risk premia: a scorecard

DeFi used to have no risk-free rate. Now it has a good approximation: **tokenized Treasury and money-market funds** (Stage 14.2), such as BlackRock's BUIDL, launched in March 2024. They carry T-bill yields straight onto the chain, and they have become the benchmark for stablecoin reserves, DeFi collateral and yield comparisons. Any stablecoin yield can now be broken down like this, benchmarked to the roughly 4.24% 3-month T-bill of September 2026:

<table>
<tr><th>Product (illustrative)</th><th>Headline yield</th><th>Real source</th><th>Subsidy</th><th>Main risks</th><th>Premium over T-bills</th></tr>
<tr><td>Tokenized Treasury fund</td><td>≈ 4%</td><td>T-bill interest (minus fees)</td><td>0</td><td>Issuer, legal wrapper, contract</td><td>≈ 0 (even slightly negative)</td></tr>
<tr><td>USDC in a lending pool</td><td>4%–8%</td><td>Borrower interest</td><td>A little</td><td>Bad debt, utilization runs, depegs</td><td>0–4 points</td></tr>
<tr><td>Synthetic dollar (basis)</td><td>Double digits in bull markets; can go negative in bears</td><td>Funding + staking</td><td>Varies</td><td>Negative funding, exchanges, broken hedges</td><td>Extremely volatile</td></tr>
<tr><td>New protocol farm</td><td>30%–200%</td><td>A few fees</td><td>Most of it</td><td>Token crash, contract bugs, rug pulls</td><td>High on paper, often negative in practice</td></tr>
</table>

Last, subtract **expected loss**. The credit formula from Stage 4.6 works here too: expected loss = probability of default × loss given default. Say you estimate a 3% annual chance that a protocol gets exploited, with depositors losing about 60% if it does. Expected loss is then about 1.8% a year, and it has to come off the headline. **A 7% stablecoin yield minus 1.8% expected loss beats the 4.24% T-bill by only about 1 percentage point.** Ask yourself whether that one point is worth the tail risk.

This scorecard comes back later. STRC in Stage 17.4 is a bitcoin-backed preferred whose rate is reset monthly with the aim of keeping it near $100. Its yield also breaks into "Treasury rate + credit premium + structural premium," and it belongs in the same table as on-chain stablecoin yields and money-fund yields. **Yield products old and new all come back to the same question: who is paying, and what risk are you carrying?**
`,

  demo: "defi-yield",

  analogy: `
Imagine a **food street** where every stall has a sign out front: "Deposit $100, get $5 a year," "$12 a year," "$80 a year."

- The **$4** stall simply puts your money in the national treasury. That's the floor price for the whole street.
- The **$8** stall lends your money to stallholders for working capital, each posting a delivery tricycle as collateral. The extra $4 is your pay for carrying the risk that tricycles suddenly lose value.
- The **$12** stall changes money for tourists and charges a fee. When exchange rates lurch, the foreign cash it holds loses value. You collect fees, and you share the currency risk.
- The **$80** stall is new, and it pays in **vouchers the owner prints himself**. They're only good at that stall, and everyone is rushing to sell theirs for cash. The more he prints, the less they're worth. When he stops printing, you discover the real payout was pocket change.

A savvy diner doesn't just read the sign. The diner asks: **whose pocket is this coming from? Why are they willing to pay it? If the street goes quiet tomorrow, will the money still be there?**

And one kind of stall deserves extra caution. The sign says $20, and when you ask the owner where it comes from, the owner smiles and says "secret recipe." On this street, **when a stall can't explain its recipe, the recipe is usually the next customers.**
`,

  misconceptions: [
    "**\"Stablecoin yield is just dollar deposit interest, with no risk.\"** Stablecoin yield comes from lending coins to borrowers who post crypto collateral, from market-making, or from basis trades. It carries bad-debt, contract, depeg and exchange risk. Compare it with a T-bill at about 4.24%; the premium is the price of the risk you bear.",
    "**\"A 100% APY farm doubles my money in a year.\"** Most farming yield is paid in the protocol's own token. If the token falls 80% over the year, a nominal 100% may be only 20%, before impermanent loss and contract risk. Emissions are a marketing budget, not sustainable income.",
    "**\"Delta-neutral means risk-free.\"** Only the price direction is neutral. Funding can turn negative, the exchange holding the short leg can fail, and in extreme markets the two legs may not stay in sync. On October 10, 2025, USDe traded as low as about $0.65 on one exchange.",
    "**\"Staking yield is free money.\"** Part of it is newly issued tokens, which dilutes non-stakers. Being paid in ETH means you carry ETH's full price swings, and liquid-staking receipts add depeg and contract risk. It's the network paying for a security service, not a risk-free rate.",
    "**\"The steadier the yield, the more reliable it is.\"** Real yield moves with borrowing demand, trading volume and funding rates. A product that pays a \"steady 20%\" in every market is the one whose source most needs checking. Anchor's roughly 20% and Stream Finance's yield-bearing stablecoin were both known for being \"stable.\"",
  ],

  quiz: [
    {
      q: "A new farm advertises 60% APY: 50 points paid in the protocol's token and 10 points from fees. If the token falls 80% over the year (rewards valued at the year-end price), what is the real yield, ignoring impermanent loss?",
      options: [
        "About 60%",
        "About 50%",
        "About 20%",
        "About 10%",
      ],
      answer: 2,
      explain: "Fees 10% + subsidy 50% × (1 − 80%) = 10% + 10% = **about 20%**. Emissions are priced in the token and shrink in proportion when it falls, the textbook case of something that only looks like yield.",
    },
    {
      q: "When perpetual-futures longs are crowded and funding is positive, whose money does a \"long spot + short perp\" basis trade mainly earn?",
      options: [
        "The Federal Reserve's",
        "The longs paying funding: traders who want leveraged long exposure",
        "Lending-protocol depositors'",
        "Stakers'",
      ],
      answer: 1,
      explain: "With positive funding, **longs pay shorts**. A synthetic dollar's yield is essentially rent collected from the market's leveraged longs, which is why it's high in bull markets and can turn negative in bear markets.",
    },
    {
      q: "A stablecoin product yields 7%. You estimate a 3% chance per year that the protocol is exploited, with a 60% loss if it is. Against a 3-month T-bill at about 4.24%, what is the risk-adjusted premium?",
      options: [
        "About +2.8 points",
        "About −1.8 points",
        "About +7 points",
        "About +1 point",
      ],
      answer: 3,
      explain: "Expected loss = 3% × 60% = 1.8%; 7% − 1.8% = 5.2%; 5.2% − 4.24% ≈ **+1 point**. That's the \"expected loss = PD × LGD\" of Stage 4.6, applied to DeFi.",
    },
    {
      q: "Why are tokenized Treasury funds the best approximation of a \"risk-free rate\" in DeFi?",
      options: [
        "They carry US T-bill yields straight onto the chain, becoming the benchmark for stablecoin yields and on-chain collateral",
        "Their yield is always higher than every DeFi protocol's",
        "They aren't subject to any law",
        "They're issued automatically by an algorithm",
      ],
      answer: 0,
      explain: "Their yield comes from T-bill interest, and their risks are mainly the issuer and the legal wrapper, far lower than other on-chain yields. Any on-chain yield can then be split into \"tokenized T-bill rate + risk premium\" (Stage 14.2).",
    },
    {
      q: "Which of these **best** fits the warning \"if you can't find the source of the yield, you are the yield\"?",
      options: [
        "A lending pool's supply rate that rises and falls with utilization",
        "LP fee income that varies with trading volume",
        "A product promising a fixed high yield in every market, with its strategy run by an undisclosed off-chain manager",
        "A tokenized Treasury fund yielding close to T-bills",
      ],
      answer: 2,
      explain: "Real yield fluctuates with markets. **A fixed high yield plus an opaque source** is the most dangerous combination, as Anchor and Stream Finance in November 2025 (xUSD falling to about $0.25) both showed.",
    },
  ],

  further: [
    { label: "US Treasury: daily Treasury par yield curve (the benchmark for on-chain yields)", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026" },
    { label: "Ethereum.org: What is staking and where the rewards come from", url: "https://ethereum.org/en/staking/" },
    { label: "Ethena documentation: how USDe hedges and its risks", url: "https://docs.ethena.fi/" },
    { label: "BIS Quarterly Review (December 2021): DeFi risks and the decentralisation illusion", url: "https://www.bis.org/publ/qtrpdf/r_qt2112b.htm" },
    { label: "DefiLlama Yields: protocol yields and fee revenue", url: "https://defillama.com/yields" },
  ],
};
