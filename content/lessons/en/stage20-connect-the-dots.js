export default {
  id: "connect-the-dots",
  stage: 20,
  order: 1,
  title: "Connecting the Dots: From the 30-Year Yield to Bitcoin to MSTR and Its Preferreds",
  difficulty: "mastery",
  prereqs: ["long-bond-30y", "fiscal-dominance", "bitcoin-valuation", "dat-what", "valuing-btc-preferreds"],

  oneLiner:
    "The promise made in Stage 0.1 comes due here: explain Lin's three headlines in full, then join them into one story. **Deficits and a rising term premium push the 30-year yield to about 5.5% → every asset's discount rate moves up and the debasement debate heats up → some money looks for hard assets, bitcoin among them → companies like Strategy raise capital with common stock and preferreds, and those preferreds are priced off Treasuries → BTC Rating and seniority tell you how safe they are → stablecoins and tokenization are laying the plumbing that may one day carry such instruments.** It is not a one-way street but a set of interlocking loops. Seeing the loops is what it means to see the whole picture.",

  intuition: `
One evening in September 2026, a whole course after first scrolling past them, Lin pulls up the same three headlines again:

1. **"30-year US Treasury yield breaks above 5%"**
2. **"BlackRock's tokenized fund, stablecoins and DeFi are rewiring the plumbing of finance"**
3. **"Strategy issues bitcoin-backed preferred stock yielding about 10%"**

The first time, Lin knew every word and understood none of the sentences. Now the question is different. It is no longer "what does this mean?" but **"why did these three things land on the same evening?"** This lesson is the one Stage 0.1 promised: **take each headline apart, then connect all three in a single causal chain.**

Here is the one-paragraph version of the chain. The six sections below unpack it link by link.

> **Governments borrow more and more → investors demand extra pay for locking up money for 30 years → the 30-year yield climbs to about 5.5% → the discount rate on every long-lived asset rises, and the argument over whether the dollar is being debased gets louder → some money goes looking for assets whose supply nobody can print, bitcoin included → companies like Strategy slice bitcoin's risk into layers and sell the "steadier" layer as a preferred stock paying 10–12% a year to income buyers → those preferreds are priced against Treasury yields, and their safety is measured with BTC Rating and seniority → meanwhile stablecoins and tokenized funds buy huge amounts of short-term Treasuries and are building new rails on which such securities might one day trade around the clock.**

That chain runs through **all four of the course's big ideas** (Stage 0.2):

- **Idea ① The price of time** is where the chain starts. The 30-year yield is the price of long-term money. When it moves, bonds, stocks, bitcoin and preferreds all get repriced.
- **Idea ② Balance sheets & claims** runs through the middle. There is the government's balance sheet (deficits and debt), the DAT's balance sheet (converts, preferreds and common stacked on top of bitcoin), and the stablecoin issuer's balance sheet (dollar IOUs matched by Treasury bills).
- **Idea ③ Liquidity & trust (the plumbing)** is what the second headline is entirely about: who settles, who holds custody, who stands behind the system when things break.
- **Idea ④ Risk & leverage** gives the middle of the chain its shape. A DAT cuts bitcoin's volatility into a fixed-income layer and an amplified layer, and reflexivity lets the whole chain speed up on the way up and on the way down.

One thing needs saying up front. **This chain is not a law of physics.** It is a map of how shocks travel, and every link can snap. The best example happened in 2026 itself. The 30-year yield kept rising, and by the debasement logic bitcoin should have benefited. Instead bitcoin fell from its all-time high of about $126,000 in October 2025 to roughly $58,000 at the end of June 2026. In the short run, **higher real interest rates weigh on every asset that pays no income.** The long-run story and the short-run pricing fight each other, and the professional's skill is telling which one is in charge right now. This lesson marks the places where the chain can break.

**This lesson covers mechanisms and analytical frameworks only. It is not investment advice.** Strategy, Strive and their securities appear only to show how the whole toolkit of this course applies to one real situation.

**This lesson has six parts:**

- **① Headline one, fully explained: deficits, term premium and 5.5%**
- **② From discount rates to the debasement trade: how long yields reach bitcoin**
- **③ Headline three, fully explained: how a DAT turns bitcoin into yield it can sell**
- **④ Priced off Treasuries, policed by BTC Rating**
- **⑤ Headline two, fully explained: the new plumbing and where it meets the other two**
- **⑥ One chain, three loops: the whole picture and where it can break**
`,

  mechanics: `
### ① Headline one, fully explained: deficits, term premium and 5.5%

Stage 4.5 split the 30-year yield into three pieces: **expected future short rates + compensation for inflation + the term premium**. All three pushed higher in 2026 (macro fact sheet, as of September 2026):

- **Expectations.** On September 16, 2026 the Fed raised rates by 25 basis points to 3.75–4.00%. It was the first hike since 2023 and new chair Kevin Warsh's first move. The 2-year yield, at about 4.8%, sat above the policy rate, which tells you markets were still betting on more hikes.
- **Inflation.** The Iran war that began on February 28 delivered an oil shock, with Brent peaking near $138 on April 7. August CPI was up about 3.4% on the year and July PCE about 3.7%. Inflation has now been above the 2% target continuously since early 2021.
- **Term premium.** The New York Fed's ACM model put the 10-year term premium at about **−1.36%** in July 2020 and about **+0.73%** on September 24, 2026 (the Fed Board's Kim–Wright model read about 0.96% on September 18). **Investors went from paying for the privilege of locking up money long-term to demanding extra compensation for it.**

Why did the term premium rise? Stage 3.3 and Stage 9.4 supplied the underlying answer: **supply and trust.** Total federal debt passed $40 trillion on August 18, 2026. Net interest runs at about $1 trillion a year, more than defense spending. The Congressional Budget Office's February 2026 baseline had the FY2026 deficit at about 5.8% of GDP. The US has lost its AAA from all three big rating agencies (Moody's was the last, on May 16, 2025). Add record long-dated corporate issuance to fund AI data centers (Stage 19.2) and a synchronized global long-end selloff (Japan's 30-year closed above 4% for the first time; the UK 30-year hit its highest since 1998), and you get this: **on September 24–25, 2026, the US 30-year yield was about 5.47–5.49%, the highest since 2004.** Its 2026 low was about 4.64% on February 27, the day before the war began. **That is a rise of roughly 85 basis points in seven months.**

To feel what 85 basis points means, use the course's standard example. A 30-year Treasury with a 5% coupon has a modified duration of about 15.5 (Stage 4.4). As its yield moves from 4.64% to 5.49%, its price falls from about 105.8 to about 92.8. **That is a loss of about 12% on the "risk-free" asset.**

So the full meaning of headline one is this: **it is not that one number went up. The most basic price in the economy, the price of long-term time, was reset.** And part of what drove it (deficits, supply, doubts about fiscal discipline) moves slowly. It will not vanish just because oil prices come down.

### ② From discount rates to the debasement trade: how long yields reach bitcoin

Stage 2.4 established that any asset's required return equals the risk-free rate plus a stack of risk premia. When that foundation rises by 85 basis points, every floor above it has to be revalued. The transmission runs through two channels that **point in opposite directions**, and this is the crux of the whole picture.

**Channel A: the discount-rate channel (short-term, mechanical, usually negative).** Higher rates mean future cash flows are worth less today, so stock valuations come under pressure. In September 2026 the S&P 500's forward P/E was about 19.2, a forward earnings yield of about 5.2%, almost identical to the 10-year Treasury yield. On the simple "Fed model," the equity risk premium is roughly zero (that is this course's own inference, not a published figure). Bitcoin has no cash flows (Stage 12.3), but it loses on opportunity cost just the same: **when a Treasury pays 5.5%, holding an asset that pays nothing gets more expensive.** The real rate is the key variable. Using the Fisher equation (Stage 2.5), a 10-year nominal yield of about 5.17% and inflation of about 3.4% give a real yield of about 1.7%.

**Channel B: the fiscal or debasement channel (long-term, narrative-driven, possibly positive).** If yields are rising because markets fear the government's debt is unsustainable, then Stage 9.4's **fiscal dominance** enters the conversation. When the interest bill gets big enough that the central bank no longer dares hold rates high to fight inflation, the eventual way out may be inflation and financial repression, which is to say quietly diluting creditors. That fear drives what is called the debasement trade: buying assets whose supply governments do not control. **Gold** is the cleanest example of the logic. It rose about 65% in 2025 and briefly reached about $5,600 an ounce in late January 2026. **Bitcoin's** supporters see it as digital gold, with a hard cap of 21 million coins, of which about 20.09 million had been mined by September 2026 (Stage 12.2).

**Which channel wins depends on why yields are rising.** 2026 played out like a textbook demonstration:

<table class="pm">
<tr><th>When</th><th>30-year yield</th><th>Gold</th><th>Bitcoin</th><th>Which channel dominated</th></tr>
<tr><td>Early Oct 2025</td><td>Below 5% (ended 2025 at 4.84%)</td><td>First close above $4,000</td><td>All-time high of about $126k on Oct 6</td><td>Debasement narrative + easing hopes</td></tr>
<tr><td>Late Jan 2026</td><td>Below 5% (2026 low of 4.64% on Feb 27)</td><td>Peak of about $5,600</td><td>Around $90k, already off the high</td><td>Debasement (gold); leverage flush (bitcoin)</td></tr>
<tr><td>End of Jun 2026</td><td>Around 5%</td><td>About $3,959 (about −29% from peak)</td><td>About $58k (about −54% from peak)</td><td><b>Discount-rate channel</b>: oil shock, hawkish Fed</td></tr>
<tr><td>Sep 25, 2026</td><td>About 5.49%</td><td>About $4,300</td><td>About $84k</td><td>Tug of war</td></tr>
</table>

The conclusion: **"rising yields are good for bitcoin" only holds when the rise comes from distrust of fiscal policy, and even then it usually takes a long time. When yields rise because the central bank is genuinely tightening, the short-run effect is almost always negative.** Stage 12.4 discussed bitcoin's ties to liquidity and real rates; this is that lesson under live fire.

### ③ Headline three, fully explained: how a DAT turns bitcoin into yield it can sell

Now the middle of the chain. Suppose some money buys the hard-asset argument but **cannot or will not hold bitcoin directly**. A pension mandate may only allow stocks and bonds. An income fund needs monthly cash. Some people simply cannot stomach a 50% drawdown. Stage 15.3 showed that the core reason DATs exist is to act as **a converter for exactly this money**: put a pile of bitcoin inside a listed company, then stack claims of different risk on top of it and sell each to a different appetite (Stage 15.1: **the balance sheet is the product**).

Look at the structure through Orange Corp, the course's standard illustration: \\(10{,}000\\ \\text{BTC} \\times \\$100{,}000 = \\$1\\ \\text{billion}\\) of BTC NAV; a $150 million convertible, $100 million of Orange-F (10% cumulative), $50 million of Orange-D (10% non-cumulative), $30 million of USD reserve; 100 million common shares at $15.

- **Income buyers get fixed dividends.** Orange-F and Orange-D pay $15 million a year between them, and the USD reserve covers **24 months** of that (Stage 16.6).
- **People who want "bitcoin, but more" get amplified common stock.** The simple amplification is \\(\\dfrac{10}{10 - 3} \\approx\\) **1.43x**. Strategy's official measure, \\(\\dfrac{\\text{BTC Reserve}}{\\text{Net Reserve}}\\), gives \\(\\dfrac{10}{7.3} \\approx\\) **1.37x** (Stage 16.4).
- **The fundraising itself adds bitcoin per share.** As long as mNAV is above 1, selling 10 million shares at $15 to buy 1,500 BTC lifts BTC per share by **4.5%** (the flywheel of Stage 16.7). Financing purchases with preferreds also raises common holders' net bitcoin per share, provided bitcoin grows faster over time than the dividend rate.

The real-world counterparts (each as of its own date; these change weekly): **Strategy held 846,000 BTC as of September 20, 2026**, at an average cost of about $75,416. On August 23, 2026 its five perpetual preferreds had a combined notional of about **$14.97 billion**, and its annual interest and dividend bill was about $1.70 billion (about $1.62 billion after September's STRC buybacks, by this course's calculation). Stage 17.3 took the preferred family apart one by one: **STRF, 10% fixed and cumulative; STRC, variable rate (12.00% since July 1, 2026); STRE, 10% and euro-denominated; STRK, 8% and convertible; STRD, 10% and non-cumulative.** The seniority order is debt > STRF > STRC > STRE/STRK/STRD (their order among themselves is not confirmed in primary sources) > common. The "about 10%" in Lin's third headline refers to this family. By autumn 2026, STRC, the biggest of them, was paying 12%.

The other model is **Strive** (Stage 17.5): **no debt, amplification through the SATA preferred only.** It held 26,355 BTC as of September 18, 2026, and SATA's dividend rate was 13.00%. Strive's own "Amplification Ratio," \\(\\dfrac{\\text{debt} + \\text{preferred}}{\\text{bitcoin value}}\\), was about 50.4%. That is a different formula from Strategy's Amplification, so never compare the two numbers directly.

### ④ Priced off Treasuries, policed by BTC Rating

Here the chain **collides head-on** with headline one. A perpetual preferred is, at heart, the perpetuity of Stage 2.3: \\(\\text{price} \\approx \\dfrac{\\text{annual dividend}}{\\text{required yield}}\\). And the required yield is **the Treasury yield plus a spread** (Stage 18.1):

$$
\\text{Required yield} = \\text{30-year Treasury yield} + \\text{spread}
\\text{spread} = \\text{credit} + \\text{subordination} + \\text{liquidity} + \\text{complexity}
\\text{Price} \\approx \\frac{\\text{annual dividend}}{\\text{required yield}}
\\text{Modified duration} \\approx \\frac{1}{\\text{required yield}}
$$

So headline one lands directly on headline three. **Hold the spread constant and let the 30-year rise 85 basis points, and a 10% perpetual preferred (modified duration about 10) falls from 100 to about 92.2, a drop of roughly 7.8%, with no change at all in its credit.** Stage 17.4 showed that STRC's variable rate is designed to push that rate duration close to zero: if the price slips below par, raise the dividend. In practice STRC's rate climbed from 9.00% in July 2025 to 12.00%. On August 21, 2026 it traded at about $96.18, an effective yield of about **12.5%**, roughly 7 percentage points above the 30-year Treasury. **A higher rate backdrop raises the cost of every security that sells yield. That is the most direct wire between the 30-year Treasury and MSTR's preferreds.**

The biggest piece of that spread is **credit**, and a DAT's credit cannot be measured with the usual interest-coverage ratio, because bitcoin produces no cash flow (Stage 6.5). **Asset coverage** takes its place:

<table class="pm">
<tr><th>Layer (Orange Corp)</th><th>Cumulative claims</th><th>BTC Rating</th><th>BTC floor price</th><th>After a 70% BTC drop</th></tr>
<tr><td>Convertible</td><td>$150M</td><td>6.7x</td><td>About $15,000</td><td>2.0x</td></tr>
<tr><td>Orange-F (senior preferred)</td><td>$250M</td><td>4.0x</td><td>$25,000</td><td>1.2x</td></tr>
<tr><td>Orange-D (junior preferred)</td><td>$300M</td><td>3.3x</td><td>About $30,000</td><td>1.0x</td></tr>
</table>

This is Stage 16.5's BTC Rating (\\(\\dfrac{\\text{BTC Reserve}}{\\text{cumulative notional of this layer and everything senior}}\\)) combined with Stage 17.6's walk through the seniority order. Real data: on August 23, 2026 Strategy put STRC's BTC Rating at about **5.7x**, which corresponds to a BTC floor price of about **$13,400**. Converting the probability that the rating falls below 1 by the end of the instrument's duration (BTC Risk) into a spread with a lognormal model gives a **BTC Credit of about 59 basis points** (assuming 10% annual bitcoin growth, 40% volatility and an 8.1-year duration). **The model's credit spread is under 1 percentage point; the spread the market actually charges is about 7.** The gap reflects subordination, liquidity, concentration in a single issuer, S&P's "B-" issuer rating on Strategy, and plain uncertainty about the model's own assumptions. Explaining that gap is the analyst's job.

You also have to check the **cash side** (Stages 16.6 and 18.2). As of September 20, 2026 Strategy's USD Reserve was about $5.04 billion. Against annual obligations of about $1.62 billion, that covers roughly **37 months** by this course's calculation (company policy sets a 12-month minimum). Its BTC Breakeven ARR (\\(\\dfrac{\\text{annual obligations}}{\\text{BTC Reserve}}\\)) was about **2.63%** on August 23. The Orange Corp equivalents are 24 months and 1.5%.

### ⑤ Headline two, fully explained: the new plumbing and where it meets the other two

The second headline looks furthest from the other two. In fact it meets them at two points.

**Meeting point one: stablecoins are big buyers of Treasury bills (back to headline one).** Stage 13.2 described a stablecoin as a "narrow bank" that holds only cash and short-term Treasuries. The GENIUS Act, signed July 18, 2025, requires 1:1 reserves in cash, Treasury bills with 93 days or less to maturity, overnight repo and similar assets, and bans paying interest to holders. As of September 26, 2026, stablecoins outstanding totaled about **$312 billion**. At a 3-month bill yield of about 4.24%, that works out to reserve income on the order of $13 billion a year for issuers. The Treasury has been leaning harder on bills (about 22.8% of marketable debt at the end of August 2026), and stablecoins are a captive buyer of exactly those bills. That makes them a new variable in Stage 3.3's argument over funding with short bills versus long bonds. Be clear about the cost too: the Kansas City Fed points out that stablecoins add Treasury demand partly by pulling money away from other assets such as bank deposits (Stage 14.5).

**Meeting point two: tokenization is paving the road for the kind of security in headline three.** Stage 14.2's tokenized Treasuries reached about $15–16 billion by mid-2026 and are already accepted as collateral by exchanges. Stage 14.3's tokenized stocks are small (about $4.45 billion in August 2026 on rwa.xyz's count), but the rules are taking shape fast. The SEC approved Nasdaq's plan to trade tokenized stocks in March 2026; DTCC's tokenization pilot began limited live trading in July; and on September 17 the SEC issued an "innovation exemption" that lets compliant venues trade tokenized NMS stocks. **A bitcoin-backed preferred that trades 24/7 and can be posted as collateral in DeFi does not exist today, but every part needed to build one is being made.** What already exists is a curious halfway house: Strive keeps $50 million of STRC in its own dividend reserve. One DAT's preferred has become another DAT's cash equivalent.

There is one more link further out. The AI agent payments of Stage 19.4 run on stablecoins too. **The same on-chain dollar rail connects Treasury bills at one end and machine-to-machine micropayments at the other.**

### ⑥ One chain, three loops: the whole picture and where it can break

<figure><svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Lin's three headlines: one causal chain, three loops</text><rect x="20" y="40" width="130" height="48" rx="8" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="85" y="60" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Deficits &amp; debt</text><text x="85" y="76" text-anchor="middle" font-size="10" fill="var(--muted)">$40T · ~$1T interest</text><rect x="180" y="40" width="130" height="48" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="245" y="60" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">① 30-year ~5.5%</text><text x="245" y="76" text-anchor="middle" font-size="10" fill="var(--muted)">Term premium positive</text><rect x="340" y="40" width="130" height="48" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="405" y="60" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Discount rate / debasement</text><text x="405" y="76" text-anchor="middle" font-size="10" fill="var(--muted)">Two channels pull apart</text><rect x="500" y="40" width="120" height="48" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="560" y="60" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Bitcoin</text><text x="560" y="76" text-anchor="middle" font-size="10" fill="var(--muted)">~$84k (Sep 25)</text><line x1="150" y1="64" x2="178" y2="64" stroke="var(--ink)" stroke-width="1.5"/><polygon points="178,60 178,68 184,64" fill="var(--ink)"/><line x1="310" y1="64" x2="338" y2="64" stroke="var(--ink)" stroke-width="1.5"/><polygon points="338,60 338,68 344,64" fill="var(--ink)"/><line x1="470" y1="64" x2="498" y2="64" stroke="var(--ink)" stroke-width="1.5"/><polygon points="498,60 498,68 504,64" fill="var(--ink)"/><rect x="480" y="140" width="140" height="52" rx="8" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="550" y="161" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">③ DAT balance sheet</text><text x="550" y="178" text-anchor="middle" font-size="10" fill="var(--muted)">Common · converts · prefs</text><line x1="560" y1="88" x2="555" y2="138" stroke="var(--ink)" stroke-width="1.5"/><polygon points="551,136 559,136 555,142" fill="var(--ink)"/><rect x="260" y="140" width="170" height="52" rx="8" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="345" y="161" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Pricing &amp; policing prefs</text><text x="345" y="178" text-anchor="middle" font-size="10" fill="var(--muted)">Treasury + spread · BTC Rating</text><line x1="480" y1="166" x2="434" y2="166" stroke="var(--ink)" stroke-width="1.5"/><polygon points="434,162 434,170 428,166" fill="var(--ink)"/><line x1="245" y1="88" x2="300" y2="138" stroke="var(--orange)" stroke-width="1.5" stroke-dasharray="4 3"/><text x="226" y="122" font-size="10" fill="var(--orange-ink)">Rate anchor</text><rect x="20" y="140" width="190" height="52" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="115" y="161" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">② New plumbing</text><text x="115" y="178" text-anchor="middle" font-size="10" fill="var(--muted)">Stablecoins · tokenized assets</text><line x1="85" y1="140" x2="85" y2="92" stroke="var(--green)" stroke-width="1.5" stroke-dasharray="4 3"/><text x="92" y="120" font-size="10" fill="var(--green)">Buys T-bills</text><line x1="210" y1="166" x2="258" y2="166" stroke="var(--green)" stroke-width="1.5" stroke-dasharray="4 3"/><text x="212" y="158" font-size="10" fill="var(--green)">Future venue</text><rect x="20" y="226" width="190" height="84" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="115" y="246" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">Loop 1: fiscal</text><text x="115" y="264" text-anchor="middle" font-size="10" fill="var(--muted)">Yields ↑ → interest ↑</text><text x="115" y="280" text-anchor="middle" font-size="10" fill="var(--muted)">→ deficit ↑ → issuance ↑</text><text x="115" y="296" text-anchor="middle" font-size="10" fill="var(--muted)">→ yields ↑</text><rect x="225" y="226" width="190" height="84" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="246" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">Loop 2: DAT flywheel</text><text x="320" y="264" text-anchor="middle" font-size="10" fill="var(--muted)">BTC ↑ → mNAV ↑ → accretive issuance</text><text x="320" y="280" text-anchor="middle" font-size="10" fill="var(--muted)">→ buying ↑ → BTC ↑</text><text x="320" y="296" text-anchor="middle" font-size="10" fill="var(--muted)">(and in reverse)</text><rect x="430" y="226" width="190" height="84" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="525" y="246" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">Loop 3: yield competition</text><text x="525" y="264" text-anchor="middle" font-size="10" fill="var(--muted)">Treasuries ↑ → prefs need more</text><text x="525" y="280" text-anchor="middle" font-size="10" fill="var(--muted)">→ obligations ↑ → coverage ↓</text><text x="525" y="296" text-anchor="middle" font-size="10" fill="var(--muted)">→ spreads ↑</text></svg><figcaption>The main chain runs along the top and turns back into the middle; the three loops underneath make it self-reinforcing. Dashed lines are the meeting points: Treasury yields anchor preferred pricing, stablecoins buy T-bills, and tokenization may become the future trading venue.</figcaption></figure>

Compress the whole picture into three **loops** and you will notice each one is a layer of this course:

1. **The fiscal loop** (Stages 4.5 and 9.4): higher yields → higher government interest costs → bigger deficits → more Treasury issuance → investors want more compensation → yields rise further. The CBO's February 2026 baseline assumed a 10-year yield of 4.1%. The market is already about 1.1 points above that, so the official interest projections are too low.
2. **The DAT flywheel loop** (Stages 16.7 and 18.3): bitcoin rises → mNAV rises → issuing stock becomes accretive → the company buys more bitcoin → which supports the price. In reverse, once mNAV falls below 1, issuance starts diluting BTC per share and the flywheel has to stop or run backwards. In late September 2026, DWF Ventures counted 16 of the 20 largest DATs trading below 1x mNAV. Strategy stood at about 1.01x on its own 2026 definition on August 21, and during 2026 it sold roughly 6,900 BTC to fund dividends and buybacks. **That is what a flywheel in reverse looks like in real life. It is not a collapse.**
3. **The yield-competition loop** (Stages 17.4 and 18.1): Treasury yields rise → income buyers demand higher preferred dividends → the issuer's annual obligations rise → Breakeven ARR goes up and months of coverage go down → spreads widen again.

**Where can the chain break?** In at least four places:

- **Break A:** if yields are rising because of real growth and a tightening central bank rather than fiscal distrust, the debasement trade does not work (bitcoin in the first half of 2026 is the example).
- **Break B:** even if bitcoin rises over the long run, a DAT's common stock can lag bitcoin as mNAV compresses, and a preferred's income can fail to beat higher Treasury yields.
- **Break C:** indexes and regulation (Stage 18.4). MSCI's second consultation on "non-operating companies" included Strategy among the simulated deletions, with results due on or before October 16, 2026. **As of September 26, 2026 the outcome is still pending.**
- **Break D:** the plumbing itself (Stages 13.6 and 14.4). A token is not the asset. Bridge and contract bugs, legal wrappers and redemption mechanics can all block the new pipes at exactly the moment you need them.

**The strongest case for:** the arithmetic of government debt makes it hard for long-run real rates to stay positive for long, so hard assets will keep drawing money. DATs slice bitcoin's volatility into different risk layers, letting money that could never hold the coin take part, and preferreds carry no margin calls and no maturity date, so the structure avoids forced liquidation. **The strongest case against:** the whole structure depends on capital markets staying open and on the mNAV premium. With rates this high, a 10–13% preferred dividend is a real cash burden that can only be paid by issuing new securities, drawing down reserves or selling bitcoin. And one company holds about two-thirds of all bitcoin owned by public companies; that concentration is a risk in itself. You should be able to argue both sides.

Next: Stage 20.2 places this chain in the four quadrants of macro regimes and asks which link is most likely to snap in each. Stage 20.3 gives you a five-question method for reading the next headline. Stage 20.4 is the cheat sheet for every formula in the course.
`,

  demo: "connect-the-dots",

  analogy: `
Picture the whole financial system as a river running through a valley.

**The 30-year Treasury yield is the water level in the reservoir upstream.** Fiscal policy and the central bank share control of the dam. The government keeps drawing water out on credit (deficits), the central bank decides how much to release, and when people downstream start to wonder whether the dam leaks (a rising term premium), the level rises. Every time it moves, the cost of irrigating every field downstream changes with it. That is "every asset gets repriced."

**Bitcoin is a field on high ground.** Some people say the dam will have to be opened eventually (currency debasement), and only high ground stays dry, so high ground is the most valuable land in the valley. Over the long run they may be right. But in the months just after the water rises, the high ground is the furthest from the water and the most expensive to irrigate, so its price often falls first. That is what happened in the first half of 2026.

**A DAT is a building on that high ground.** The ground floor is the convertible, the middle floor the preferreds, the penthouse the common stock. Middle-floor tenants collect 10–12% a year in "rent" and do not much care about short swings in the land price, as long as the building stands. Penthouse residents get the best view, gain the most when the land appreciates and sway hardest in an earthquake. **BTC Rating asks one question: how far would the foundation (bitcoin) have to sink before water reaches the middle floor?** And the rent you can charge on the middle floor depends on the reservoir level. If the reservoir itself pays 5.5%, nobody will rent your middle floor for 5%.

**Stablecoins and tokenization are a newly dug canal.** At one end it draws water straight from the reservoir (stablecoins buying T-bills); at the other it is laying pipes toward the buildings on the high ground. One day, perhaps, a middle-floor lease could change hands on that canal at any hour.

What Lin first saw were three unrelated pictures: a reservoir, a new canal, a building on a hill. You now know **they are the upstream, midstream and a tributary of the same river.**
`,

  misconceptions: [
    "**\"A rising 30-year yield is always good for bitcoin, because it shows fiat is being debased.\"** — That only holds when the rise comes from fiscal distrust, and only over a long enough horizon. From late February to late September 2026 the 30-year rose about 85 basis points, yet bitcoin fell to about $58,000 at the end of June: in the short run, higher real rates weighed on every asset that pays no income.",
    "**\"A preferred 'backed' by bitcoin is as safe as a Treasury.\"** — A preferred is equity, ranks behind all debt, and has no bitcoin pledged to it. Orange-F has 4.0x coverage, but a 70% bitcoin drop leaves only 1.2x. And even with credit unchanged, an 85 bp rise in rates knocks a 10% perpetual down about 7.8%.",
    "**\"STRC is variable-rate, so it can't be hurt by rising rates.\"** — The variable rate works only if management actively resets it each month. The contract limits how fast the rate can be cut but never requires a raise, and the June 2026 policy says the rate will not go up solely because the price is below par. Under stress it behaves more like a fixed-rate perpetual; Strategy itself puts its duration at 8.1 years.",
    "**\"Stablecoins and tokenization have nothing to do with MSTR's preferreds.\"** — Stablecoins are major buyers of Treasury bills, which ties them to the bond market in headline one. The rules for tokenized stocks (SEC approval, the DTCC pilot, the innovation exemption) are paving the way for such securities to trade on-chain someday. Strive already holds STRC in its own dividend reserve.",
    "**\"Memorize this causal chain and you can predict markets.\"** — It is a transmission map, not a forecasting formula. Every link has a break point: central-bank tightening versus fiscal distrust, mNAV compression, index and regulatory decisions, plumbing failures. Its value is helping you ask the right questions when you read the news, not handing you buy or sell calls.",
  ],

  quiz: [
    {
      q: "Between February 27 and September 25, 2026 the 30-year Treasury yield rose from about 4.64% to 5.49%. With the spread unchanged, what happens to a 10% perpetual preferred priced at 100?",
      options: ["Almost nothing, because it is equity", "It falls about 7.8%, to around 92", "It falls about 14%, just like the 30-year Treasury", "It rises, because the issuer will raise the dividend"],
      answer: 1,
      explain: "**\\(\\text{A perpetual's price} \\approx \\dfrac{\\text{dividend}}{\\text{required yield}}\\)**: \\(\\dfrac{10}{10.85\\%} \\approx 92.2\\). Its modified duration is about \\(\\dfrac{1}{y} \\approx 10\\), shorter than the 5%-coupon 30-year Treasury's roughly 15.5, so it falls about 7.8% rather than 12–14%.",
    },
    {
      q: "In which situation is a rising long-term yield most likely to push bitcoin down in the short run?",
      options: [
        "Markets fear government debt is unsustainable and start doubting central-bank independence",
        "Gold and bitcoin are both being bought as havens",
        "The central bank is genuinely hiking against inflation and real rates rise sharply",
        "Stablecoin supply grows rapidly",
      ],
      answer: 2,
      explain: "**This is the discount-rate channel**: central-bank tightening lifts real rates and raises the opportunity cost of holding an asset that pays nothing. The 2026 oil shock and the September hike were this case. Fiscal distrust (option A) is the debasement channel.",
    },
    {
      q: "Orange Corp's Orange-F has $250M of cumulative claims against $1B of BTC NAV. What are its BTC Rating and BTC floor price?",
      options: ["6.7x; $15,000", "3.3x; $30,000", "1.43x; $70,000", "4.0x; $25,000"],
      answer: 3,
      explain: "**\\(\\text{BTC Rating} = \\dfrac{\\text{BTC Reserve}}{\\text{cumulative notional of this layer and everything senior}}\\)** \\(= \\dfrac{\\$1\\text{B}}{\\$250\\text{M}} = 4.0\\times\\). **\\(\\text{Floor price} = \\dfrac{\\text{BTC price}}{\\text{rating}}\\)** \\(= \\dfrac{\\$100{,}000}{4.0} = \\$25{,}000\\). 6.7x is the convertible layer, 3.3x is Orange-D, and 1.43x is the amplification.",
    },
    {
      q: "What is the most direct link between stablecoins and headline one (Treasury yields)?",
      options: [
        "The reserves required by the GENIUS Act are mainly cash and short-term bills, which makes stablecoins big buyers of T-bills",
        "Stablecoin issuers hold large amounts of 30-year bonds, directly pushing long yields down",
        "Stablecoins pay holders Treasury interest and so compete with Treasuries for money",
        "Stablecoins are issued by the Fed as a monetary policy tool",
      ],
      answer: 0,
      explain: "**A stablecoin is a narrow bank holding only cash and short-term Treasuries.** The GENIUS Act requires reserves such as bills maturing within 93 days and bans paying interest to holders. The effect is on bill demand and the Treasury's funding mix, not direct buying of 30-year bonds.",
    },
    {
      q: "Which sequence describes the yield-competition loop?",
      options: [
        "BTC rises → mNAV rises → accretive issuance → more buying → BTC rises",
        "Treasury yields rise → preferreds need higher dividends → annual obligations rise → coverage falls → spreads widen",
        "Yields rise → interest costs rise → deficit widens → more issuance → yields rise",
        "Stablecoins grow → T-bill demand rises → short yields fall",
      ],
      answer: 1,
      explain: "**The yield-competition loop** ties headline one to headline three. Option A is the DAT flywheel loop and option C the fiscal loop; together the three loops form the whole picture.",
    },
  ],

  further: [
    { label: "US Treasury: daily par yield curve rates (official 30-year data)", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026" },
    { label: "New York Fed: ACM term premium data", url: "https://www.newyorkfed.org/research/data_indicators/term-premia-tabs" },
    { label: "Strategy: BTC reserve, preferreds and credit dashboard (check live disclosures)", url: "https://www.strategy.com/" },
    { label: "Strategy August 2026 investor briefing (SEC FWP, with BTC Rating and BTC Credit definitions)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "rwa.xyz: tokenized Treasuries and real-world asset data", url: "https://app.rwa.xyz/" },
  ],
};
