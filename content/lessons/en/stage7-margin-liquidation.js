export default {
  id: "margin-liquidation",
  stage: 7,
  order: 5,
  title: "Margin, Leverage & Liquidation Cascades: Why Crashes Feed Themselves",
  difficulty: "core",
  prereqs: ["futures-forwards", "leverage-coverage"],

  oneLiner:
    "Borrow to buy an asset and you must post margin; when the price falls and the margin runs short, you are **forced to sell** — even if you're completely right about the long-term direction. One liquidation is a personal tragedy. When many traders' liquidation prices cluster around the same level, it becomes a **liquidation cascade**: selling pushes the price down, and the lower price triggers more liquidations. 1929, 1987, LTCM, Archegos and crypto's multi-billion-dollar wipeouts all run on the same machine. Understand it and you understand why DATs deliberately choose financing **with no margin calls**.",

  intuition: `
Sam is bullish on bitcoin. Sam has $20,000 but wants more exposure, so Sam opens a **5x leveraged** position on an exchange: $20,000 of margin controls $100,000 of bitcoin, with the other $80,000 borrowed.

Bitcoin rises 10%. The position is worth $110,000; repay the $80,000 and $30,000 is left — **a 50% gain on Sam's own money.** Leverage is wonderful.

Bitcoin falls 10%. The position is worth $90,000; minus the $80,000 owed, $10,000 is left — **a 50% loss.**

Bitcoin falls 20%. The position is worth $80,000, exactly what's owed, and **Sam's money is gone.** In practice the exchange never waits for that moment. As soon as Sam's margin drops below a "maintenance margin" threshold, the exchange's risk engine **sells the position automatically** to make sure the loan is repaid. That is **forced liquidation**.

The cruelest part: suppose bitcoin first drops 20%, liquidating Sam, then a month later recovers and climbs another 50%. **Sam was right — and Sam is no longer in the game.** Leverage doesn't just magnify gains and losses; it adds a condition: **you are not allowed to fall down along the way.**

Now zoom out. The market isn't one Sam; it's thousands of them, each with a different liquidation price — but those prices **tend to cluster around a few round numbers.** When the price reaches the first cluster, the exchange sells for those traders; those sell orders push the price lower; the lower price reaches the next cluster; more selling… **The fall manufactures more falling.** That is a **liquidation cascade**.

This lesson rests on **Idea ④ Risk & leverage**, and on its most dangerous side: leverage magnifies both ways, and markets **reinforce themselves** (reflexivity, which Stage 10.4 treats systematically). It also involves **Idea ③ Liquidity & trust**: in a cascade the first thing to disappear is the buyer willing to take the other side — liquidity evaporates exactly when it is needed most.

You've already met the parts of this machine: daily settlement and margin calls on futures (Stage 7.1), the "cliff" in selling volatility (Stage 7.3), and the mass unwind of the basis trade in March 2020 (Stage 7.4). This lesson assembles them and asks a question that matters enormously for the DAT focus tier: **how can a company that holds large amounts of bitcoin use leverage without being swept away by a cascade?** The answer unfolds across Stage 16.5 (BTC Rating and asset coverage), Stage 17.6 (seniority in practice) and Stage 18.3 (mNAV compression and the "death spiral" debate).

**In this lesson we break it into five pieces:**

- **① The arithmetic of margin: leverage, maintenance margin and the liquidation price**
- **② From one liquidation to a cascade**
- **③ Cascades in traditional finance: 1929, 1987, LTCM and Archegos**
- **④ Cascades in crypto: 24/7 markets, liquidation engines and on-chain liquidations**
- **⑤ Why DATs prefer structures without margin calls**
`,

  mechanics: `
### ① The arithmetic of margin: leverage, maintenance margin and the liquidation price

The definitions, all at once:

- **Initial margin**: the money you must put up yourself to open a position. Initial margin ratio = 1 / leverage. 10x leverage = 10% margin.
- **Maintenance margin**: the threshold (as a share of position value) that your account equity may not fall below. Breach it and you get a **margin call** or an immediate liquidation.
- **Account equity** = position value − borrowing.

For a long position you can compute the liquidation price directly:

$$
Liquidation price = entry price × (1 − 1/leverage) ÷ (1 − maintenance margin ratio)
Rule of thumb: drop to liquidation ≈ 1/leverage − maintenance margin ratio
$$

Assume a 0.5% maintenance margin (a common order of magnitude on crypto perpetuals) and an entry price of $100,000:

<table>
<tr><th>Leverage</th><th>Initial margin</th><th>Liquidation price ≈</th><th>Drop that liquidates you</th></tr>
<tr><td>2x</td><td>50%</td><td>50,250</td><td>about −49.7%</td></tr>
<tr><td>5x</td><td>20%</td><td>80,400</td><td>about −19.6%</td></tr>
<tr><td>10x</td><td>10%</td><td>90,450</td><td>about −9.5%</td></tr>
<tr><td>20x</td><td>5%</td><td>95,480</td><td>about −4.5%</td></tr>
<tr><td>100x</td><td>1%</td><td>99,500</td><td><b>about −0.5%</b></td></tr>
</table>

Bitcoin's daily moves are often 2–4% (Stage 7.3). So **at 20x or more, ordinary noise can flush you out within a single day**; at 100x, a few minutes of randomness will do it.

Stock markets are more forgiving, but the principle is identical. U.S. Regulation T requires at least 50% initial margin to buy stock on credit, and brokers typically require at least 25% maintenance margin. Buy $100,000 of stock with $50,000 of your own money and $50,000 borrowed: when the stock falls to about **$66,667** (a drop of about 33%), your equity is $16,667 ÷ $66,667 = 25%, and the margin call arrives. A stockbroker will usually give you a day or two to wire money; a crypto perpetual liquidates you **in real time, automatically, without a phone call.**

There's a subtler number than the liquidation price: **the path.** Stage 11.4 shows that leverage on a volatile asset creates "volatility drag" — even if the price ends where it started, one deep dip along the way can knock you out. **Leverage turns "was I right in the end?" into "was I never too wrong at any moment?"**

### ② From one liquidation to a cascade

A liquidation is, in essence, a **price-insensitive sell order**: the exchange or broker wants its loan back quickly, not a good price. When enough of those orders arrive close together, a feedback loop forms:

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The liquidation cascade: fall → liquidations → forced selling → a bigger fall</text><rect x="240" y="40" width="160" height="46" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="320" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">① Initial drop</text><text x="320" y="76" text-anchor="middle" font-size="10.5" fill="var(--muted)">bad news, one big sell order</text><rect x="440" y="120" width="170" height="46" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="525" y="140" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">② First cluster hit</text><text x="525" y="156" text-anchor="middle" font-size="10.5" fill="var(--muted)">margin short, auto-liquidated</text><rect x="240" y="200" width="160" height="46" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="320" y="220" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">③ Price-blind selling</text><text x="320" y="236" text-anchor="middle" font-size="10.5" fill="var(--muted)">bids thin, slippage widens</text><rect x="30" y="120" width="170" height="46" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="115" y="140" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">④ Price falls further</text><text x="115" y="156" text-anchor="middle" font-size="10.5" fill="var(--muted)">next cluster is reached</text><path d="M400 70 Q 500 80 520 116" fill="none" stroke="var(--ink)" stroke-width="2"/><polygon points="515,112 522,122 526,110" fill="var(--ink)"/><path d="M525 166 Q 510 215 404 222" fill="none" stroke="var(--ink)" stroke-width="2"/><polygon points="408,217 398,223 408,228" fill="var(--ink)"/><path d="M240 222 Q 130 215 118 170" fill="none" stroke="var(--ink)" stroke-width="2"/><polygon points="113,174 118,164 123,174" fill="var(--ink)"/><path d="M115 120 Q 130 75 236 64" fill="none" stroke="var(--red)" stroke-width="2.5" stroke-dasharray="6 4"/><polygon points="232,59 242,64 232,69" fill="var(--red)"/><text x="150" y="88" font-size="10.5" font-weight="600" fill="var(--red)">Loop</text><text x="320" y="140" text-anchor="middle" font-size="11" fill="var(--ink)">Each lap runs</text><text x="320" y="156" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">faster and deeper</text><text x="320" y="276" text-anchor="middle" font-size="11" fill="var(--muted)">It stops when liquidation prices thin out, enough buying capital arrives, or trading is halted</text></svg><figcaption>The fuel of a cascade is highly levered positions clustered near the same price; the accelerant is thin bids. Break any link and the loop stops.</figcaption></figure>

Three things decide how violent a cascade gets:

- **How high the leverage is and how clustered the liquidation prices are.** If everyone uses 20x and opened positions in the same rally, their liquidation prices stack into a wall.
- **Market depth.** The same $1 billion of forced selling might move a deep market 1% — and a thin market at night, on a weekend or in a panic, 10%.
- **Who is buying.** Market makers often pull their quotes in a panic (Stage 8.1); the only buyers left are those holding cash and no leverage.

This is the concrete version of the line from Stage 10.1's anatomy of a crisis: **leverage + maturity mismatch + opacity → run.** A liquidation is a run on your position.

### ③ Cascades in traditional finance: 1929, 1987, LTCM and Archegos

**1929.** In the late 1920s, U.S. retail investors commonly bought stock on thin margin — often only about a tenth down. The October crash set off a wave of margin calls; those who couldn't pay were sold out, pushing prices lower still. The lesson led directly to federal margin regulation — today's Regulation T is its descendant.

**October 19, 1987 (Black Monday).** The Dow fell **22.6%** in a single day, still the largest one-day drop in U.S. stock history. A leading culprit was the then-fashionable **portfolio insurance**: a hedging program that sold index futures automatically, by rule, as prices fell. It wasn't leverage, but it had exactly the effect of a liquidation — **the further prices fell, the more it sold.** Futures selling was carried back into the cash market by arbitrage, and the cascade ran.

**LTCM, 1998.** Long-Term Capital Management, co-founded by star traders and two Nobel laureates, ran about 25x balance-sheet leverage on "convergence trades" (including the vol selling of Stage 7.3). After Russia's default set off a global flight to safety, all of its spreads widened against it at once. Worse, everyone knew it had to unwind, so they traded ahead of it. In the end the Federal Reserve brokered a roughly $3.6 billion recapitalization by more than a dozen banks, to keep a forced liquidation of its positions from hammering the whole market.

**Archegos, March 2021.** Bill Hwang's family office built highly concentrated, leveraged positions at several big banks through **total return swaps** (derivatives in which the bank holds the shares and you take all the gains and losses). When a few of its biggest holdings fell sharply, it couldn't meet margin calls, and the banks raced to dump the underlying blocks — the first sellers lost little, the last lost a lot. Reportedly, bank losses totaled more than $10 billion, about $5.5 billion at Credit Suisse alone. **Because the positions were spread across several banks and held through swaps, no single bank could see the whole picture** — a textbook case of opacity magnifying a cascade.

The common structure of all four stories: **high leverage + concentration + rules that force selling.**

### ④ Cascades in crypto: 24/7 markets, liquidation engines and on-chain liquidations

Crypto markets run this machine at full power:

- **Very high leverage**: perpetual futures (Stage 7.1) commonly offer 20–100x, one click away for retail traders.
- **Always open, no circuit breakers**: no close, no limit-down halts, and thinner bids on weekends and overnight.
- **Automatic liquidation engines**: no call, no grace period — the moment margin breaches the line, the engine takes over and sells at market.
- **Insurance funds and auto-deleveraging (ADL)**: if a liquidation fills below the bankruptcy price, the exchange's insurance fund covers the hole; if the fund runs dry, the exchange **forcibly cuts the positions of winning traders** to balance the books — you can be right on direction and still get "deleveraged."
- **On-chain liquidations**: DeFi lending protocols (Stage 13.4) automatically liquidate under-collateralized loans based on a "health factor," and liquidator bots race to do it for a bonus — the same price-blind selling, written into smart contracts.

Some of the big cascades: on **March 12, 2020** ("Black Thursday" in crypto), bitcoin at one point lost about half its value in little more than a day, exchanges liquidated positions en masse, and on Ethereum, MakerDAO even saw collateral sold at liquidation auctions for close to zero. **May 2021** and **2022** (the Terra/Luna collapse and the failures of Three Arrows Capital and Celsius, Stage 10.5) came with chain reactions of liquidations too. And reportedly, in one crash in **October 2025** leveraged positions liquidated market-wide in a single day ran to **nearly twenty billion dollars**, widely described as the largest single-day liquidation event in crypto's history (check data providers for exact figures).

One observation: in every one of these events, **the Bitcoin network itself never stopped working.** What failed was always the leverage and custody layered on top of it — the lesson Stage 10.5 on crypto crises keeps returning to.

### ⑤ Why DATs prefer structures without margin calls

Back to the DAT focus tier. A listed company holding a lot of bitcoin that wants leverage has two very different roads:

- **Road A: collateralized borrowing.** Pledge bitcoin to a bank or lender and borrow dollars. Cheap and quick — but with **price-triggered margin calls**: if bitcoin falls to a certain level, post more collateral or have your coins sold. That makes the company one more Sam in the cascade.
- **Road B: capital-markets instruments.** Issue convertible bonds (Stages 6.4, 17.2), perpetual preferred stock (Stages 6.2, 17.3) and common stock. Their terms contain **no trigger that says "sell bitcoin if it falls to X"**: a convertible doesn't have to be repaid before maturity (or a date on which holders may put it back); a preferred has no maturity, and dividends can be deferred (cumulative) or skipped (non-cumulative) under its terms without a default.

Strategy (then called MicroStrategy) has actually traveled both roads. In March 2022 it took out a bank term loan of about $200 million collateralized by bitcoin; when bitcoin slumped that June, markets openly debated whether it faced a margin call. The loan was repaid early, in March 2023. Since then its leverage has come mainly from convertibles and preferreds — **trading price triggers for time and seniority.**

Use the course's toy company, Orange Corp (formally introduced from Stage 15.1), to see the difference. It holds 10,000 BTC; on the liability side it has $150 million of convertibles, $100 million of Orange-F preferred and $50 million of Orange-D preferred, pays $15 million a year in preferred dividends, and holds a $30 million USD reserve (24 months of coverage).

- Bitcoin falls 70%, from $100,000 to $30,000: BTC NAV is $300 million, exactly equal to all senior claims of $300 million. Asset coverage at the D layer falls from about 3.3x to **1.0x** (the BTC Rating of Stage 16.5).
- If that $300 million had been a **collateralized loan**, the lender would have force-sold the bitcoin long before, at some trigger price — making the company sell at the bottom.
- Under Road B, **no clause forces it to sell bitcoin right now.** Its real constraints are where the $15 million a year of dividends comes from (the USD reserve covers 24 months, Stage 16.6) and whether it can refinance convertibles when they mature or are put (the stress tests of Stage 18.2).

That doesn't make Road B riskless — it swaps the risk of a **price cascade** for the risk of **refinancing and dilution**. If markets stay shut for a long time and mNAV falls below 1 (Stage 18.3), the company may have to issue shares or sell bitcoin on bad terms to meet its obligations. Critics call that a slow-motion version of the spiral; supporters argue that **time** is exactly the resource that lets the holder of a volatile asset survive, and that liabilities without margin calls buy it that time. Stage 18.3 lays out both sides in full. **This lesson covers mechanics and analytical frameworks only; it is not investment advice.**

The lesson in one sentence: **leverage decides where you get liquidated; clustering and thin bids decide whether liquidations turn into a cascade; and real risk management means making sure you are never forced to sell at the worst possible moment.** That concludes Stage 7. Next, Stage 8.1 goes down into the market's plumbing — order books, market makers and clearinghouses — to see how all of this runs day to day.
`,

  demo: "margin-liquidation",

  analogy: `
A liquidation cascade is like **a crowd standing on a frozen lake.**

Everyone carries a backpack of a different weight (**leverage**). The heavier the pack, the thinner the ice that person can survive on — that minimum ice thickness is their **liquidation price**.

Most days the ice is thick, nobody falls through, and the ones carrying the heaviest packs move fastest (**leverage magnifies returns**). Then one day the weather warms and the ice thins a little (**the initial drop**). The people with the heaviest packs go through first — and as they thrash in the water, they crack the ice around them (**forced selling hits the price**). The cracks spread under the next ring of people. Their packs are lighter, but the ice is thinner now, so they fall in too, cracking it further… **It isn't the weather that sinks them; it's the impact of one another falling in.**

On the shore there are people holding ropes (**buyers with cash and no leverage**), but in a panic everyone steps back. The cascade stops only when the cracks reach ice where nobody is standing (**liquidation prices thin out**), or a rescue team arrives and throws every rope it has into the lake (**the Fed, a bailout fund**).

And what does a sensible winter swimmer do? They don't carry a heavy pack — or they carry one **without a device that automatically drags you under when the ice drops below a certain thickness** (**liabilities without margin calls**). However thin the ice gets, as long as they can stay on their feet and wait for the cold to return, other people falling through will never force them into the water.
`,

  misconceptions: [
    "**\"As long as I'm right about the long-term direction, leverage is safe.\"** — Leverage requires you to never be too wrong **at any moment**. If the price drops 20% and then rises 100%, a 5x long is liquidated in the first leg and never sees the second. Right direction, wrong path — same result: zero.",
    "**\"Crashes happen because of bad news.\"** — Bad news is often just the spark. How far prices fall is frequently set by how much leverage is in the market, how tightly liquidation prices cluster and how thin the bids are. The same headline can cause a dip in a lightly levered market and a cascade in a heavily levered one.",
    "**\"The exchange liquidates me to protect me, so I can't lose more than my stake.\"** — Liquidation mainly protects whoever lent to you. In a violent market it can fill far below your liquidation price; some exchanges also auto-deleverage winning traders; and in a traditional brokerage margin account you still owe the money if losses exceed your equity.",
    "**\"DATs use leverage, so a bitcoin drop will liquidate them into a death spiral.\"** — It depends on the form of the leverage. Bitcoin-collateralized loans with price triggers can indeed be liquidated; convertibles and perpetual preferreds have no clause forcing bitcoin sales at a price, so their risk is refinancing and dilution rather than an instant cascade. Both risks are real, but the mechanisms are completely different (Stage 18.3).",
    "**\"Hedging and arbitrage are low-risk and can't cause cascades.\"** — Portfolio insurance in 1987, the Treasury basis trade in March 2020 and U.K. LDI in 2022 were all \"hedges.\" Once they carry leverage or must sell by rule, under stress they become part of the cascade.",
  ],

  quiz: [
    {
      q: "You go long bitcoin at $100,000 with 10x leverage and a 0.5% maintenance margin. Roughly how far must the price fall before you're liquidated?",
      options: [
        "About −50%",
        "About −9.5%",
        "About −0.5%",
        "About −20%",
      ],
      answer: 1,
      explain: "Liquidation price = 100,000 × (1 − 1/10) ÷ (1 − 0.005) ≈ 90,450, about **−9.5%**. With bitcoin often moving 2–4% a day, that's not far away.",
    },
    {
      q: "Which of these best explains why a liquidation cascade accelerates itself?",
      options: [
        "Exchanges deliberately push prices down",
        "Liquidations create price-blind sell orders that push the price down to the next cluster of liquidation prices, a positive feedback loop",
        "Investors rationally reassess the asset's value as it falls",
        "Central banks raise rates during the fall",
      ],
      answer: 1,
      explain: "**Fall → liquidations → forced selling → a bigger fall.** The fuel is highly levered positions clustered at similar prices; the accelerant is thin bids.",
    },
    {
      q: "Why were bank losses so large in the 2021 Archegos episode?",
      options: [
        "Because Archegos held only crypto assets",
        "Because the positions were all unlevered cash holdings",
        "Because the Federal Reserve banned banks from selling the shares",
        "Because highly concentrated, levered positions were spread across several banks via total return swaps; no bank saw the whole picture, and after the default they raced each other to sell",
      ],
      answer: 3,
      explain: "**Opacity + concentration + leverage**: each bank saw only its own slice; once margin calls failed, early sellers lost little and late sellers lost a lot — reportedly more than $10 billion in total.",
    },
    {
      q: "A DAT's liabilities are all convertibles and perpetual preferreds, with no bitcoin-collateralized loans. If bitcoin falls 70%, what is its main risk?",
      options: [
        "Refinancing and dilution: where the cash for dividends and maturing debt comes from, and possibly having to issue shares or sell bitcoin on bad terms if markets are shut",
        "Lenders immediately force-selling its bitcoin at a trigger price",
        "Preferred holders forcing the company into immediate liquidation",
        "No risk at all, because there are no margin calls",
      ],
      answer: 0,
      explain: "No price trigger doesn't mean no risk: the risk shifts from an **instant cascade** to **refinancing and dilution**. Months of USD-reserve coverage, the maturity profile and mNAV all become critical (Stages 16.6, 18.2, 18.3).",
    },
    {
      q: "U.S. stocks fell 22.6% on October 19, 1987. What role did \"portfolio insurance\" play?",
      options: [
        "It automatically bought stocks as they fell, cushioning the drop",
        "None — the timing was a coincidence",
        "It sold index futures by rule as prices fell, selling more the further they fell — the same effect as liquidations",
        "It caused a power outage at the exchange",
      ],
      answer: 2,
      explain: "Not leverage, but **selling by rule**: dynamic hedging programs dumped futures mechanically into the decline, and arbitrage carried the pressure into the cash market — a cascade.",
    },
  ],

  further: [
    { label: "FINRA: Margin accounts — how margin works and the risks of margin calls", url: "https://www.finra.org/investors/investing/investment-accounts/brokerage-accounts/margin-accounts" },
    { label: "Federal Reserve History: the stock market crash of 1987", url: "https://www.federalreservehistory.org/essays/stock-market-crash-of-1987" },
    { label: "Federal Reserve History: the near failure of Long-Term Capital Management (1998)", url: "https://www.federalreservehistory.org/essays/ltcm-near-failure" },
    { label: "U.S. SEC (2022): press release charging Archegos and its founder, with a summary of events", url: "https://www.sec.gov/news/press-release/2022-70" },
    { label: "BIS Bulletins: analyses of leverage, liquidations and contagion in crypto markets", url: "https://www.bis.org/publications/bulletin" },
  ],
};
