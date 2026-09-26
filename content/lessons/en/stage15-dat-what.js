export default {
  id: "dat-what",
  stage: 15,
  order: 1,
  title: "What a Bitcoin Treasury Company Is: The Balance Sheet Is the Product",
  difficulty: "dat",
  prereqs: ["capital-stack", "dilution-buybacks", "bitcoin-valuation"],

  oneLiner:
    "A **digital asset treasury company (DAT)** is a listed company whose main business is holding bitcoin: it raises money with ordinary capital-markets instruments — common stock, convertible notes, preferred stock — and turns the proceeds into BTC. What it sells investors is not software or cars but **a carefully engineered balance sheet**: the common behaves like levered bitcoin, the preferred like fixed income with bitcoin as the cushion. This lesson takes the course's toy company, Orange Corp, apart layer by layer, and makes one rule stick: the same company can show an mNAV of 1.50 or 2.05, so **whenever you quote mNAV, name the definition**.",

  intuition: `
Remember the three headlines Lin scrolled past in Stage 0.1? By now the first one — “30-year Treasury yield breaks above 5%” — is fully explained (Stage 4.5, Stage 9.4; in late September 2026 that yield was about 5.5%, its highest since 2004). The second — “tokenization and stablecoins are rewiring the plumbing” — was unpacked in Stages 13–14. One is left: **“Strategy sells a bitcoin-backed preferred yielding about 10%.”** On day one every word in it was foreign. You now know what a preferred share is (Stage 6.2) and what bitcoin is (Stage 12.1). The missing piece is this: **why would a company issue such a thing, and what does the balance sheet behind it look like?** With this lesson we enter the course's **focus tier**: digital asset treasury companies.

A plain-English definition first. **A DAT is a public company whose main strategy is to hold a digital asset — mostly bitcoin — and to raise money in the capital markets to buy more of it.** It may keep a legacy business (Strategy still sells enterprise analytics software; software revenue was about $122 million in Q2 2026), but the company's value, the moves in its share price and management's weekly to-do list all revolve around the bitcoin in its vault.

An ordinary company sells a product, and its balance sheet is just where the bookkeeping lives. A DAT flips that around: **the balance sheet is the product.** The asset side holds essentially one thing — bitcoin. The liability side is a set of carefully sliced claims: convertible notes for hedge funds that want “a bond plus a call option”, preferred shares for income investors who want a fixed payout, and common stock for people who want “bitcoin, only more so.” Every slice is a floor of the building from Stage 6.1 — only the foundation is now bitcoin.

This lesson rests on **Idea ② (balance sheets and claims)** and **Idea ④ (risk and leverage)**. Idea ② says every DAT security is a claim written on that one balance sheet, and seniority decides who gets paid first. Idea ④ says that when you stack fixed claims on top of a very volatile asset, the common gets **amplified**: if bitcoin rises 10%, the common's underlying value rises by more than 10% — and the same is true on the way down.

So that every calculation in the next four stages lines up, the course uses one fictional company, **Orange Corp**. It holds **10,000 BTC**; at a bitcoin price of **$100,000** that is a bitcoin NAV of **$1 billion**. It has 100 million shares at $15, a market cap of **$1.5 billion**. The market pays $1.5 billion for $1 billion of bitcoin. That “1.5x” is the most quoted and most misused number in the DAT world: **mNAV**.

For real-world scale: as of September 20, 2026, Strategy held **846,000 BTC** (company 8-K), roughly 4% of all bitcoin in existence (per its August 2026 investor briefing). By bitcointreasuries.net's late-September 2026 count, about 196 public companies together held about 1.27 million BTC — **Strategy alone about two-thirds of it.** These figures change weekly; always check the official live disclosures.

**This lesson covers mechanics and analytical frameworks only; it is not investment advice.** You will get the strongest case for the model and the strongest case against it — and both were demonstrated by the market after bitcoin peaked near $126,000 in October 2025 and fell to about $58,000 by mid-2026.

**This lesson has five parts:**

- **① Definition: what counts as a bitcoin treasury company**
- **② Orange Corp's balance sheet: one sheet, four layers of claims**
- **③ Why the common behaves like levered bitcoin**
- **④ Official definitions side by side: one company, four mNAVs**
- **⑤ Lin's third headline: placing the “about 10% preferred” in the stack**
`,

  mechanics: `
### ① Definition: what counts as a bitcoin treasury company

“A listed company that owns bitcoin” is not the same thing as “a bitcoin treasury company.” Tesla held 11,509 BTC at June 30, 2026 (10-Q), yet nobody would say Tesla's business is bitcoin. Bitcoin miners such as MARA hold a lot of BTC too, but for them it is closer to **inventory of their own product**. A practical test has three parts:

- **Bitcoin is the largest asset on the balance sheet**, and it drives the company's value. MSCI's October 2025 proposal used a numeric screen: digital assets at **50% or more** of total assets, with digital-asset treasury activity as the primary business.
- **The company actively raises capital to buy more** — common stock, convertibles, preferreds, all turned into bitcoin. That is the line between a DAT and an ordinary company that parked spare cash in BTC.
- **Management keeps score in bitcoin per share, not earnings per share.** Strategy's headline KPI is BTC Yield (the percentage growth in bitcoin per share), and Strive uses the same definition (Stage 16.3).

By that test the main characters of this stage are **Strategy (MSTR)** — first and largest, describing itself as “the world's first Bitcoin Treasury Company”; **Strive (ASST)** — listed through a reverse merger in 2025 and pitching “preferred-only amplification, zero debt”; plus Japan's **Metaplanet**, Tether-controlled **Twenty One (XXI)**, **Nakamoto (NAKA)** and others (Stage 15.4 profiles them). There are also ether and Solana treasuries: same logic, different asset.

Why did this business only appear after 2020? Three preconditions: bitcoin gained deep liquidity and institutional-grade custody (Stage 12.1); US capital markets let listed companies sell new shares continuously at market prices (at-the-market offerings, Stage 17.1); and a management team was willing to bet the whole company — the subject of Stage 15.2.

### ② Orange Corp's balance sheet: one sheet, four layers of claims

Orange Corp is the course's standard toy company; every illustrative calculation in Stages 15–18 and 20 uses it. Its full specification:

<table class="pm">
<tr><th>Item</th><th>Value</th><th>Note</th></tr>
<tr><td><b>Bitcoin</b></td><td>10,000 BTC × $100,000 = <b>$1.0B</b></td><td>Bitcoin NAV; Strategy calls it the BTC Reserve</td></tr>
<tr><td><b>Cash / USD reserve</b></td><td>$30M</td><td>Earmarked for dividends</td></tr>
<tr><td><b>Convertible notes</b></td><td>$150M, 0% coupon, $25 conversion price</td><td>Most senior layer (Stage 6.4)</td></tr>
<tr><td><b>Orange-F</b></td><td>$100M, 10% <b>cumulative</b> preferred</td><td>Senior preferred (Stage 6.3)</td></tr>
<tr><td><b>Orange-D</b></td><td>$50M, 10% <b>non-cumulative</b> preferred</td><td>Junior preferred</td></tr>
<tr><td><b>Common stock</b></td><td>100M shares × $15 = <b>$1.5B market cap</b></td><td>Residual claim (Stage 5.1)</td></tr>
</table>

<figure><svg viewBox="0 0 640 310" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Orange Corp's balance sheet ($ millions, to scale)</text><text x="130" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Assets</text><rect x="60" y="52" width="140" height="200" fill="var(--btc-soft)" stroke="var(--btc)" stroke-width="2"/><text x="130" y="145" text-anchor="middle" font-size="13" font-weight="700" fill="var(--btc)">Bitcoin 1,000</text><text x="130" y="163" text-anchor="middle" font-size="11" fill="var(--muted)">10,000 BTC × $100k</text><rect x="60" y="252" width="140" height="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="130" y="276" text-anchor="middle" font-size="11" fill="var(--green)">Cash 30</text><text x="350" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Claims (top = paid first)</text><rect x="280" y="52" width="140" height="30" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="350" y="71" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">Converts 150</text><rect x="280" y="82" width="140" height="20" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="350" y="96" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">Orange-F 100</text><rect x="280" y="102" width="140" height="10" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="430" y="111" font-size="10" fill="var(--orange-ink)">Orange-D 50</text><rect x="280" y="112" width="140" height="148" fill="var(--surface-2)" stroke="var(--line)"/><text x="350" y="180" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Common (residual)</text><text x="350" y="197" text-anchor="middle" font-size="11" fill="var(--muted)">1,030 − 300 = 730</text><text x="430" y="71" font-size="10" fill="var(--blue)">covered 6.7x</text><text x="430" y="96" font-size="10" fill="var(--orange-ink)">cum. 250 → 4.0x</text><text x="430" y="126" font-size="10" fill="var(--red)">cum. 300 → 3.3x</text><text x="350" y="224" text-anchor="middle" font-size="11" font-weight="700" fill="var(--btc)">Market pays 1,500 (premium)</text><text x="320" y="300" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">One asset on the left; four layers sold to four kinds of investor on the right</text></svg><figcaption>The vault on the left, the floors on the right. Each layer's “BTC Rating” = bitcoin NAV ÷ the cumulative claims of that layer and everything above it. The common takes whatever is left — and the market prices it well above that book residual. The premium is the fuel of the whole DAT business.</figcaption></figure>

Three things to read off this picture:

- **No bitcoin is pledged to any layer.** The converts are unsecured and the preferreds are equity, so nobody can force the company to sell coins because the price fell — the “no margin call” point from Stage 7.5. The real Strategy works the same way: its preferreds are “perpetual equity, not debt”, and no bitcoin is pledged to them (August 2026 investor briefing).
- **Each layer's cushion is its asset coverage** (Stage 6.5): converts $1.0B ÷ $150M ≈ **6.7x**; through Orange-F, cumulative $250M → **4.0x**; through Orange-D, cumulative $300M → **3.3x**. Strategy calls this number the **BTC Rating**; Stage 16.5 is devoted to it.
- **The annual bill**: preferred dividends ($100M + $50M) × 10% = **$15M**; the converts pay 0%. The $30M of cash covers **24 months** — the “USD reserve coverage” of Stage 16.6.

### ③ Why the common behaves like levered bitcoin

The common is the residual claim: whatever the bitcoin and cash are worth after the three senior layers are paid belongs to it. Suppose bitcoin rises 10%, from $1.0B to $1.1B:

$$
BTC +10%: the common's underlying value goes from 1,000 + 30 − 300 = 730 to 1,100 + 30 − 300 = 830, up 13.7%
BTC −10%: it goes from 730 to 630, down 13.7%
$$

**The three senior claims are fixed, so every move in bitcoin lands on the common.** That is amplification (Stage 16.4), and there are two common ways to compute it:

- **Simple version, ignoring cash**: bitcoin NAV ÷ (bitcoin NAV − cumulative senior claims) = 10 ÷ (10 − 3) ≈ **1.43x**.
- **Strategy's official Amplification**: BTC Reserve ÷ Net Reserve = 10 ÷ 7.3 ≈ **1.37x** (Net Reserve adds the cash back; see part ④). The 13.7% above is exactly 1.37 × 10%.

Three caveats. First, **1.37x is modest** — compare a house bought with an 80% mortgage (5x) or a 10x perpetual futures position. The main reason DAT common stock swings much harder than bitcoin is that **mNAV moves too**: when bitcoin rallies, the market tends to pay a fatter premium; when it falls, the premium compresses, and the two forces compound (the reflexivity of Stage 10.4). Second, amplification cuts **both ways**: from October 2025 to July 2026 bitcoin fell from about $126,000 to about $58,000 (−54%), and DAT common stocks generally fell further. Third, amplification **drifts** with the bitcoin price: the lower bitcoin goes, the larger the fixed claims loom and the higher the multiplier — a path dependence that echoes the volatility drag of Stage 11.4.

Real data point: Strategy reported an Amplification of **1.30x** on August 23, 2026 (BTC Reserve $64.7B ÷ Net Reserve $49.7B).

### ④ Official definitions side by side: one company, four mNAVs

**mNAV (the multiple of market value to bitcoin NAV)** measures how much the market pays for each dollar of bitcoin the company owns. The trouble is that there are several ways to compute it, and in 2026 Strategy **changed its own definition**. For the same Orange Corp:

<table class="pm">
<tr><th>Definition</th><th>Formula</th><th>Orange Corp</th></tr>
<tr><td><b>Basic market-cap</b> (bitcointreasuries “basic”)</td><td>Market cap ÷ bitcoin NAV</td><td>15 ÷ 10 = <b>1.50</b></td></tr>
<tr><td><b>Diluted market-cap</b></td><td>Price × diluted shares ÷ bitcoin NAV (converts assumed converted: +6M shares → 106M)</td><td>15.9 ÷ 10 = <b>1.59</b></td></tr>
<tr><td><b>Enterprise-value mNAV</b> (Strategy's 2025 definition)</td><td>(Market cap + debt + preferred notional − cash) ÷ bitcoin NAV</td><td>(15 + 1.5 + 1.5 − 0.3) ÷ 10 = <b>1.77</b></td></tr>
<tr><td><b>Price ÷ Net BTC per share</b> (Strategy's 2026 definition)</td><td>Net Reserve = BTC − out-of-the-money converts − preferred + USD assets = $730M; fully diluted shares count only in-the-money instruments = 100M → $7.30 per share</td><td>15 ÷ 7.30 = <b>2.05</b></td></tr>
</table>

**Same company, same day: 1.50 through 2.05 are all “correct.”** Hence the course rule: **whenever you quote mNAV, say which definition.** A real example: on Strategy's 2026 definition its mNAV on August 21, 2026 was **1.01x** ($119.25 share price ÷ $118.31 net bitcoin per share); on the 2025 enterprise-value definition the same day works out to about **1.00x**. On November 28, 2025, under the old definition, it was 1.2x. **Numbers from different years are not comparable.**

A few other definitions also need settling now (all reproducible with _fin.js):

- **Amplification**: 1.43x is the simple, cash-ignoring version; Strategy's official Amplification = BTC Reserve ÷ Net Reserve = 10 ÷ 7.3 ≈ **1.37x**; and **Strive's “Amplification Ratio” is a different animal** = (debt + preferred) ÷ bitcoin value = 3 ÷ 10 = **30%** (Strive's own figure in September 2026 was 50.4%). Nearly the same name, completely different formula.
- **Bitcoin per share**: on 100M common shares, 0.0001 BTC = **10,000 sats per share**; on Strategy's “Assumed Diluted Shares” (every convert counted as converted, in or out of the money: 106M shares) ≈ **9,434 sats per share**.
- **BTC Breakeven ARR** (how much bitcoin must appreciate each year to “cover” the dividends) = $15M ÷ $1.0B = **1.5%**. Strategy's figure on August 23, 2026 was 2.63%.
- **BTC floor price** (the bitcoin price at which a layer's BTC Rating is exactly 1.0x): Orange-F = $100,000 ÷ 4.0 = **$25,000**; Orange-D ≈ **$30,000**.

Why would the market ever pay more than 1x? The bulls' answer: access (plenty of money can buy stocks but not bitcoin itself); the ability to issue at a premium and grow bitcoin per share (the flywheel of Stage 16.7 — sell 10 million new shares at $15, buy bitcoin with all of it, and bitcoin per share rises **4.5%**); and the volatility value embedded in converts and listed options (Stage 7.3). The bears' reply: the premium is reflexive — **high premium → issue and buy → better story → higher premium**, and the loop runs in reverse just as easily. In September 2026, per DWF Ventures, **16 of the 20 largest DATs traded below 1x mNAV.** The full treatment of mNAV is Stage 16.2; what a company can do once it slips below 1x is Stage 18.3.

### ⑤ Lin's third headline: placing the “about 10% preferred” in the stack

We can now answer the **first half** of Lin's third question. Translate “Strategy sells a bitcoin-backed preferred yielding about 10%” into the language of the capital stack:

- **“Preferred”**: the floors sandwiched between debt and common (Stage 6.2). Strategy's official order is debt > **STRF** > **STRC** > **STRE, STRK, STRD** (the junior preferreds) > common. Strive has no debt, so its single preferred, **SATA**, sits directly above the common.
- **“About 10%”**: STRF, STRD and STRE all carry fixed 10% dividend rates; STRC floats and was **12.00%** as of September 2026 (since July 1, 2026); Strive's SATA was **13.00%** (since April 2026). All of them compete against the 30-year Treasury at about 5.5% — the extra slice is the price the market charges for the bitcoin-cushion risk (Stage 18.1).
- **“Bitcoin-backed”**: no bitcoin is pledged to any preferred. “Backed” means **asset coverage** — after every senior claim is paid, how many times over the bitcoin still covers you. Orange-F is covered 4.0x and Orange-D 3.3x; Strategy reported STRC at 5.7x on August 23, 2026.

The **second half** — what such a preferred is worth, how a rising 30-year yield hits it, whether it survives a 70% bitcoin drawdown — has to wait for Stage 17.3, Stage 18.1 and Stage 18.2.

Finally, the strongest arguments on each side, laid next to each other (**mechanics and frameworks only; not investment advice**):

- **The strongest bull case**: there are no margin calls and no pledged bitcoin, and most obligations are perpetual or years away, so the company can wait out a drawdown. As long as it can raise money at mNAV above 1, or bitcoin's long-run return beats its cost of capital, bitcoin per share keeps growing. And it “translates” bitcoin into forms — equity, credit, fixed income — that traditional money is allowed to buy.
- **The strongest bear case**: the whole model runs on a premium that is reflexive and can vanish (most DATs traded below 1x in 2026). Preferred dividends must be paid in **cash**, and bitcoin produces none — close the funding window and the company must draw its reserve or sell coins. (Strategy sold bitcoin in late May 2026 for the first time since 2022 and about 6,948 BTC over the year, though it resumed buying at the end of August.) And the risk is concentrated in one asset, one founder and one set of index rules — MSCI's “non-operating companies” consultation was still undecided in late September 2026.
`,

  demo: "dat-what",

  analogy: `
Think of a DAT as **a developer that sells nothing but floors in one apartment block** — and the block stands on a foundation that breathes: bitcoin.

The foundation swells and shrinks all the time: sometimes it doubles in a year, sometimes it halves in six months. The developer doesn't live in the building. It slices it into floors and sells each floor to a different kind of buyer:

- **The ground floor (converts)** goes to the most cautious buyers: closest to the foundation, paid first, and handed a voucher that lets them swap into the penthouse if prices soar.
- **The second and third floors (preferreds)** go to people who want steady rent: a fixed 10% “rent” every year, but if the foundation really gives way, they queue behind the ground floor.
- **The penthouse (common)** goes to people betting the foundation keeps swelling: no rent at all, but every bit of swelling beyond the fixed shares of the lower floors is theirs — so the penthouse rises and falls harder than the foundation itself.

The odd thing is that the penthouse often sells for more than the foundation left over for it (mNAV above 1). The developer seizes the moment, builds more penthouse units and turns the cash into more foundation — as long as each unit sells above the foundation behind it, every penthouse owner ends up with more foundation. **Once penthouse prices fall below the foundation's value, the machine starts running backwards.**

One more thing: no rope ties the building to the foundation, so nobody can order a demolition just because the ground shrank by half. But the rent on floors two and three is due in cash every month, and the foundation itself produces no cash at all. How long the developer's “rent reserve” lasts is the building's real clock.
`,

  misconceptions: [
    "**“A DAT is just a bitcoin fund.”** — A fund creates and redeems at NAV, so arbitrage pins its price near NAV. A DAT is an operating company whose shares can trade far above or below its bitcoin NAV for long stretches (mNAVs from about 0.6x to above 2x have all been seen), and its capital stack includes debt and preferreds, so the common is an amplified residual claim.",
    "**“mNAV is one number.”** — For the same Orange Corp it is 1.50 on basic market cap, 1.59 diluted, 1.77 on enterprise value and 2.05 on price ÷ net BTC per share. Strategy even changed its own definition in 2026. An mNAV without a stated definition tells you nothing.",
    "**“Bitcoin-backed preferred means the bitcoin is collateral.”** — No bitcoin is pledged to the preferreds. “Backed” refers to asset coverage: bitcoin NAV as a multiple of the cumulative claims of that layer and everything senior. The coverage floats with the bitcoin price, and in a bankruptcy the preferred still ranks behind all debt.",
    "**“No margin calls means leverage carries no risk.”** — Without a trigger, the risk turns chronic: preferred dividends need cash, and bitcoin produces none. When the funding window shuts, the company must spend its reserve or sell coins — and in 2026 several DATs, Strategy included, sold bitcoin to fund dividends, buybacks or debt repayment.",
    "**“Strive's 30% amplification ratio is far lower than Strategy's 1.37x, so it is more conservative.”** — They are different formulas. Strive's Amplification Ratio = (debt + preferred) ÷ bitcoin, a percentage; Strategy's Amplification = BTC Reserve ÷ Net Reserve, a multiple. Orange Corp is simultaneously “30%” and “1.37x.” Convert to one definition before you compare.",
  ],

  quiz: [
    {
      q: "Orange Corp: 10,000 BTC, bitcoin at $100,000, 100M shares at $15, $150M of converts (conversion price $25), $150M of preferreds in total, $30M cash. On Strategy's 2026 definition (price ÷ net BTC per share), what is its mNAV?",
      options: [
        "1.50",
        "1.77",
        "1.59",
        "2.05",
      ],
      answer: 3,
      explain: "Net Reserve = $1.0B − $150M (out-of-the-money converts) − $150M (preferred) + $30M = **$730M**; fully diluted shares count only in-the-money instruments = 100M → $7.30 net BTC per share; $15 ÷ $7.30 ≈ **2.05**. 1.50 is basic market cap, 1.59 diluted market cap, 1.77 enterprise value.",
    },
    {
      q: "If bitcoin rises 10%, roughly how much does the common's underlying value (bitcoin + cash − all senior claims) rise?",
      options: [
        "About 13.7%: amplification of 10 ÷ 7.3 ≈ 1.37",
        "Exactly 10%",
        "About 15%, because mNAV is 1.5",
        "About 30%, because senior claims are 30% of the bitcoin",
      ],
      answer: 0,
      explain: "The senior claims are fixed, so the whole move lands on the common: 730 becomes 830, **+13.7% = 1.37 × 10%**. That is Strategy's official Amplification (BTC Reserve ÷ Net Reserve). The actual share-price move also depends on what mNAV does.",
    },
    {
      q: "What are Orange-F's (the senior preferred's) BTC Rating and BTC floor price?",
      options: [
        "10x; $10,000",
        "4.0x; $25,000",
        "6.7x; $15,000",
        "3.3x; $30,000",
      ],
      answer: 1,
      explain: "BTC Rating = bitcoin NAV ÷ **cumulative** claims of the layer and everything above = $1.0B ÷ ($150M + $100M) = **4.0x**; floor price = $100,000 ÷ 4.0 = **$25,000**. 3.3x / $30,000 is Orange-D.",
    },
    {
      q: "Which statement best describes “backed” in “bitcoin-backed preferred”?",
      options: [
        "Preferred holders have a lien on part of the bitcoin and can seize it",
        "The company promises bitcoin will not fall below a certain price",
        "After all senior claims are paid, the bitcoin NAV still covers the layer several times over; no bitcoin is pledged",
        "The dividends are paid in bitcoin",
      ],
      answer: 2,
      explain: "“Backed” is an **asset-coverage** idea (the BTC Rating), not collateral. Strategy states plainly that its preferreds are perpetual equity with no bitcoin pledged to them. The coverage changes with the bitcoin price.",
    },
    {
      q: "Using the test from Stage 15.1, which of these looks least like a bitcoin treasury company?",
      options: [
        "A company whose main asset is bitcoin, which keeps issuing preferreds to buy more and keeps score in bitcoin per share",
        "A company holding 11,509 BTC whose business is cars and energy and which does not raise capital to buy bitcoin",
        "A company that listed via reverse merger, carries zero debt and levers up only through preferreds to buy bitcoin",
        "A company that calls itself “the world's first Bitcoin Treasury Company” and reports its purchases every week",
      ],
      answer: 1,
      explain: "Holding bitcoin is not the same as being a treasury company. Tesla held 11,509 BTC (as of June 30, 2026), but bitcoin is not its business and it does not tap capital markets to add more. The other three describe the typical DAT, Strive and Strategy respectively.",
    },
  ],

  further: [
    { label: "Strategy: official dashboard for holdings, mNAV, BTC Rating and other metrics (check live data)", url: "https://www.strategy.com/" },
    { label: "Strategy August 2026 investor briefing (FWP, SEC) — official definitions of Net Reserve, Amplification and BTC Rating", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strive treasury dashboard: SATA, Amplification Ratio, bitcoin per share", url: "https://strive.com/treasury" },
    { label: "BitcoinTreasuries.net: public-company bitcoin holdings and several mNAV definitions", url: "https://bitcointreasuries.net/" },
  ],
};
