export default {
  id: "mnav-compression",
  stage: 18,
  order: 3,
  title: "When mNAV Compresses: Buybacks, Selling Bitcoin & the Truth About Death Spirals",
  difficulty: "dat",
  prereqs: ["mnav", "flywheel-math", "bubbles-reflexivity", "dat-stress-test"],

  oneLiner:
    "Above 1x mNAV, issuing stock to buy bitcoin raises bitcoin per share. Below 1x, the same move dilutes, and the flywheel runs backwards. But running backwards is not collapse: **below 1x, selling bitcoin to buy back common actually increases bitcoin per share**, at the cost of thinner coverage for the preferreds. This lesson prices the five choices a company has after mNAV compresses, takes the \"death spiral\" argument apart link by link to see where structure stops it and where it doesn't, and tests it against real 2025–2026 cases: Strategy's bitcoin sales and STRC buybacks, ProCap, Sequans, Satsuma, and a wave of mergers.",

  intuition: `
Stage 16.7 explained the DAT flywheel. When the stock trades above the bitcoin value behind each share (\\(\\mathrm{mNAV} > 1\\)), every share sold brings in more bitcoin than it represented, so bitcoin per share rises, and rising bitcoin per share supports the stock price. Stage 10.4 explained Soros's **reflexivity**: market prices don't just reflect fundamentals, they feed back and change them. The DAT flywheel is a textbook reflexive loop, and reflexive loops turn in both directions.

From late 2025 into 2026, the market watched the reverse turn. Bitcoin fell from about $126,000 to about $58,000; DAT stocks fell further; and **16 of the 20 largest DATs traded below 1x mNAV** (DWF Ventures, September 2026). Metaplanet's basic mNAV was about 0.58x, Twenty One (XXI) about 0.68x, ProCap sat at roughly a 40% discount, and Strategy, on its own 2026 definition, was about 1.01x on 2026-08-21.

What does mNAV below 1 say? **The market values the company's common stock at less than the bitcoin it holds.** Put differently, you can buy a dollar of bitcoin for 80 cents. But you can't get your hands on that dollar of bitcoin, because what you bought is a share, not a coin.

What can the company do? Orange Corp makes it concrete. The bitcoin value per share is $10, the stock has fallen to $8, so mNAV is 0.8:

- **Keep issuing to buy bitcoin.** Sell 10 million shares at $8, get 800 BTC, and bitcoin per share **falls 1.8%.** The flywheel runs backwards.
- **Sell bitcoin to buy back stock.** Sell 800 BTC ($80 million), buy back 10 million shares at $8, and bitcoin per share **rises 2.2%.**
- But after the sale, Orange-F's BTC Rating falls from 4.0x to **3.68x.** Part of what the common gained was taken from the preferreds' cushion.

That is the central tension of this lesson: **below 1x mNAV, the best move for the common often leaves preferred holders less safe.** An analyst has to stand on both sides at once.

Then there is the phrase that surfaces in every downturn: **"death spiral."** The argument runs: bitcoin falls → mNAV drops below 1 → the company can't issue → it has to sell bitcoin to pay dividends → selling pushes bitcoin down → it falls again, and so on. This lesson doesn't hand a verdict to either side. It pulls each link of the chain out and checks it: which links are blocked by structure (no margin calls, perpetual equity preferreds, long-dated convertibles, a USD Reserve of about three years), and which are not (the put wall, confidence, the sheer size of one seller).

The lesson rests on **Idea ④ (risk and leverage)**, meaning reflexivity, leverage and path dependence, and on **Idea ② (balance sheets and claims)**, since one action moves value between layers. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**

**In this lesson we break it into five pieces:**

- **① mNAV below 1: why the flywheel reverses**
- **② The toolkit: pause, buy back, sell bitcoin, issue preferreds, buy back preferreds**
- **③ Who wins and who loses: common versus preferred**
- **④ The "death spiral": the chain of argument and the structural rebuttals**
- **⑤ Real cases from 2025–2026**
`,

  mechanics: `
### ① mNAV below 1: why the flywheel reverses

Let \\(N\\) be the bitcoin value per share, \\(P\\) the share price, and \\(\\mathrm{mNAV} = \\dfrac{P}{N}\\). Issue new shares equal to a fraction \\(s = \\dfrac{\\text{new shares}}{\\text{existing shares}}\\) and convert all the proceeds into bitcoin:

$$
\\begin{aligned} &\\text{Change in BTC per share after issuing} \\\\ &= \\frac{1 + s \\times \\mathrm{mNAV}}{1 + s} - 1 \\end{aligned}
\\begin{aligned} &\\mathrm{mNAV} = 1.5,\\ s = 10\\%\\text{:} \\\\ &\\frac{1 + 0.15}{1.1} - 1 = +4.5\\% \\end{aligned}
\\begin{aligned} &\\mathrm{mNAV} = 0.8,\\ s = 10\\%\\text{:} \\\\ &\\frac{1 + 0.08}{1.1} - 1 = -1.8\\% \\end{aligned}
$$

The second line is Orange Corp's standard example. **\\(\\mathrm{mNAV} = 1\\) is the watershed** (and once commissions and market impact are counted, the real watershed sits a little higher; Stage 17.1). Check it with the shared engine's issueAndBuy: Orange Corp issues 10 million shares at $8, ending with \\(\\dfrac{10{,}800\\ \\text{BTC}}{110\\text{M shares}} \\approx 0.0000982\\) BTC per share, 1.8% below 0.0001.

**First ask: which mNAV?** Stage 16.2 covered four definitions. Basic (market-cap) mNAV ignores debt and preferreds that rank ahead of the common, so for a leveraged DAT a basic mNAV of 0.8x can coexist with an enterprise-value mNAV above 1x. Metaplanet's three figures on 2026-09-26 show it: **0.58x** basic, 0.73x diluted, **0.79x** EV (bitcointreasuries.net). To decide whether issuing dilutes, first say which "per share" you care about:

- For **gross bitcoin per share** (Strategy's BPS metric, and the Orange Corp examples in this lesson), the watershed is **basic** \\(\\mathrm{mNAV} = 1\\).
- For **net bitcoin per share** (after deducting debt and preferreds), the watershed is \\(\\mathrm{mNAV} = 1\\) on Strategy's **2026 definition**. With Orange Corp at $8, basic mNAV is 0.8x, but net bitcoin per share is only $7.30, so the 2026-style figure is **\\(8 \\div 7.30 \\approx 1.10\\times\\)**: issuing at $8 cuts gross bitcoin per share by 1.8% yet raises net bitcoin per share. One action, two verdicts. **The definition is not pedantry; it decides the answer.**

Why would mNAV fall below 1? Several explanations coexist:

- **The closed-end-fund discount.** Shareholders can't redeem at NAV the way ETF holders can, so a discount can persist. Closed-end funds in traditional finance often trade at discounts for years; Grayscale's GBTC, before its conversion to an ETF, traded at a discount of nearly 50% in late 2022.
- **Expected dilution and forced selling.** The market fears the company will issue on worse terms or be made to sell bitcoin.
- **Senior claims and costs.** Dividends, interest and overhead eat value every year.
- **Governance and trust.** You cannot force management to hand you the bitcoin (Stage 18.4).

### ② The toolkit: pause, buy back, sell bitcoin, issue preferreds, buy back preferreds

Take Orange Corp at mNAV 0.8 (a $8 share price, bitcoin at $100,000):

<table class="pm">
<tr><th>Action</th><th>BTC per share</th><th>Orange-F's BTC Rating</th><th>Annual dividends</th><th>Note</th></tr>
<tr><td>Do nothing (pause issuance)</td><td>Unchanged</td><td>4.00x</td><td>$15M</td><td>Dividends come out of the USD Reserve, which shrinks $15M a year</td></tr>
<tr><td>Issue 10M shares, buy bitcoin</td><td><b>−1.8%</b></td><td>4.32x</td><td>$15M</td><td>Coverage thickens, but the common is diluted</td></tr>
<tr><td>Sell 800 BTC, buy back 10M shares</td><td><b>+2.2%</b></td><td>3.68x</td><td>$15M</td><td>Common benefits; the preferreds' cushion thins</td></tr>
<tr><td>Issue $100M of new 10% preferred, buy bitcoin</td><td>+10% (BTC Yield)</td><td>4.40x (if the new series ranks behind F; the new series itself about 2.75x)</td><td>$25M</td><td>Pays off only if bitcoin's long-run growth beats 10%</td></tr>
<tr><td>Sell 85 BTC, buy back $10M of Orange-F notional at $85</td><td>−0.85%</td><td>4.13x</td><td>$14M</td><td>Retires a claim at a discount: the common's net reserve rises $1.5M</td></tr>
</table>

A few regularities:

- **Below 1x mNAV, selling bitcoin to buy back common increases bitcoin per share.** In general, selling a fraction \\(x\\) of the bitcoin and buying back stock at \\(\\mathrm{mNAV} = m\\) gives \\(\\text{new BTC per share} = \\dfrac{1 - x}{1 - x/m}\\) (taking the old figure as 1). With \\(x = 8\\%\\) and \\(m = 0.8\\): \\(\\dfrac{0.92}{0.90} - 1 \\approx +2.2\\%\\). The lower \\(m\\), the "cheaper" the buyback.
- **Buying back preferreds below par** spends $85 to extinguish a $100 senior claim and $10 a year of dividends. Every remaining layer, including the rest of Orange-F itself, gets thicker coverage, and the common's net reserve rises. The cost is cash that could have paid dividends or bought bitcoin.
- **Issuing new preferreds** still raises "bitcoin per share" below 1x, because no shares are added. But Strategy itself has warned that this kind of BTC Yield ignores the new senior claim (Stage 16.3). The real hurdle is the **BTC Hurdle ARR**, which Strategy put at 10.74% on 2026-08-23: bitcoin must appreciate faster than this cost of capital for net bitcoin per share to outgrow bitcoin itself.

### ③ Who wins and who loses: common versus preferred

On one balance sheet, different layers want management to do different things:

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Change in BTC per share: issue 10% more shares vs sell bitcoin to buy back 10%</text><line x1="80" y1="150" x2="600" y2="150" stroke="var(--muted)"/><line x1="80" y1="40" x2="80" y2="255" stroke="var(--line)"/><line x1="253" y1="40" x2="253" y2="255" stroke="var(--red)" stroke-dasharray="5 4"/><text x="258" y="50" font-size="10" fill="var(--red)">mNAV = 1: the watershed</text><polyline points="80,188 167,169 253,150 340,131 427,112 513,93 600,74" fill="none" stroke="var(--btc)" stroke-width="2.5"/><polyline points="80,104 167,127 253,150 340,173 427,196 513,219 600,243" fill="none" stroke="var(--blue)" stroke-width="2.5"/><text x="596" y="68" text-anchor="end" font-size="11" font-weight="700" fill="var(--btc)">issue and buy +9.1%</text><text x="596" y="262" text-anchor="end" font-size="11" font-weight="700" fill="var(--blue)">sell and buy back −11.1%</text><text x="88" y="96" font-size="11" font-weight="700" fill="var(--blue)">sell and buy back +5.6%</text><text x="88" y="206" font-size="11" font-weight="700" fill="var(--btc)">issue and buy −4.5%</text><text x="72" y="154" text-anchor="end" font-size="10" fill="var(--muted)">0%</text><text x="80" y="275" text-anchor="middle" font-size="10" fill="var(--muted)">0.5</text><text x="253" y="275" text-anchor="middle" font-size="10" fill="var(--muted)">1.0</text><text x="427" y="275" text-anchor="middle" font-size="10" fill="var(--muted)">1.5</text><text x="600" y="275" text-anchor="middle" font-size="10" fill="var(--muted)">2.0</text><text x="340" y="288" text-anchor="middle" font-size="10" fill="var(--muted)">mNAV (the common's definition)</text><rect x="110" y="222" width="136" height="24" rx="6" fill="var(--red-soft)" stroke="var(--red)"/><text x="178" y="238" text-anchor="middle" font-size="10" fill="var(--red)">preferred coverage thins</text></svg><figcaption>The two lines cross at \\(\\mathrm{mNAV} = 1\\). At a premium, issuing helps the common; at a discount, selling bitcoin to buy back helps the common. But the buyback on the left is paid for with bitcoin, and the preferreds' coverage falls with it.</figcaption></figure>

- **Common shareholders** want the company to sell bitcoin and buy back stock when mNAV is below 1, "capturing" the discount. ProCap sold about 50 BTC on 2026-09-03 to buy back stock at roughly a 40% discount; that is the logic.
- **Preferred holders** want the company **not** to sell bitcoin. They would rather it kept issuing common (even dilutively) or hoarded cash, because every coin is part of their cushion.
- **Convertible holders** care most about whether there is cash on hand before the put date (Stage 18.2).

Management sits in the middle, often with preferences of its own (a founder may hold a large stake in the common; Stage 18.4). Strategy's choice was a compromise. On June 29, 2026 it launched a "Digital Credit Capital Framework": a USD Reserve of at least 12 months; authority to buy back preferreds (later raised to $2.0 billion, **with STRC as the priority**); a $1.0 billion common buyback authorization (**unused** as of September 20); and a "BTC Monetization Program" to sell bitcoin to top up the reserve, to pay dividends and interest when that beats issuing equity, and to fund buybacks. **It bought back discounted preferreds, not discounted common.** That protects the credit layers while retiring claims below par.

### ④ The "death spiral": the chain of argument and the structural rebuttals

Write the "death spiral" out as a chain and inspect each link:

<table class="pm">
<tr><th>Link</th><th>The critics' argument</th><th>Structural rebuttal</th><th>Where the rebuttal falls short</th></tr>
<tr><td>1. Bitcoin falls</td><td>DAT stocks amplify the fall; mNAV compresses</td><td>—</td><td>About −54% from Oct 2025 to Jul 2026; it happened</td></tr>
<tr><td>2. No accretive funding</td><td>mNAV &lt; 1, so issuing dilutes</td><td>Pause; switch to preferreds</td><td>New preferreds must pay higher rates</td></tr>
<tr><td>3. Forced to sell bitcoin for dividends</td><td>Cash obligations never stop</td><td>USD Reserve about 37 months (Strategy, derived); annual obligations about 2.3% of holdings</td><td>The cheaper bitcoin, the higher the share (about 11% a year at $16,800)</td></tr>
<tr><td>4. Forced liquidation</td><td>Like a retail margin blow-up</td><td><b>No margin calls, no bitcoin pledged, skipped preferred dividends aren't a default</b></td><td>—</td></tr>
<tr><td>5. Selling pushes the price down, again</td><td>A big seller swamps the market</td><td>Strategy sold about 6,948 BTC in all of 2026 (0.8% of holdings) and resumed buying in late August</td><td>Strategy holds about 4% of all bitcoin; the impact of large-scale selling is hard to gauge</td></tr>
<tr><td>6. The maturity wall</td><td>Debt must be repaid in cash</td><td>Refinance or repurchase early (May 2026: $1.5B bought back at a discount)</td><td>About $5.9B puttable from Sep 2027 to Sep 2028</td></tr>
</table>

The conclusion isn't "a spiral is impossible." It is that **structure changes the spiral's speed.** Without link 4, a fall cannot accelerate itself within hours; it becomes a process measured in quarters and years, governed by months of reserve and by put dates. Along the way management has time to choose, but that time is not unlimited.

One more conceptual tool is **Minsky's three-way classification** from Stage 10.4. Hedge finance pays interest from operating cash flow. Speculative finance covers only interest from cash flow and relies on refinancing for principal. "Ponzi finance" (Minsky's technical term, not an accusation of fraud) relies on rising asset prices or new funding even to pay the interest. A DAT with almost no operating cash flow that pays dividends by issuing securities and selling bitcoin sits close to the third category in Minsky's terms. **That means its stability depends heavily on asset prices and access to funding**, which is exactly what a stress test (Stage 18.2) measures. Supporters answer that bitcoin's long-run appreciation is its "cash flow," and that Strategy's Breakeven ARR is only 2% to 3%. Critics answer that the "appreciation" of an asset with no cash flows itself depends on the next buyer.

### ⑤ Real cases from 2025–2026

<table class="pm">
<tr><th>Company</th><th>What happened (as of September 2026)</th><th>Tool used</th></tr>
<tr><td>Strategy</td><td>First bitcoin sale in late May 2026 (32 BTC, for STRC dividends); 3,588 BTC sold Jun 29–Jul 5; 3,328 BTC sold late Jul–Aug to fund STRC buybacks; about $1.125B of STRC repurchased in total (July average about $86.52); in late August about $2B of common sold to create USD Cash, and bitcoin buying resumed</td><td>Selling bitcoin for dividends, buying back preferreds below par, issuing common near 1x for dollars</td></tr>
<tr><td>ProCap</td><td>Sold about 50 BTC on 2026-09-03 to buy back stock at roughly a 40% discount</td><td>Selling bitcoin to buy back common</td></tr>
<tr><td>Sequans</td><td>Sold 970 BTC in Nov 2025 to halve its debt; fully exited bitcoin on 2026-09-24</td><td>Selling to repay debt, then exit</td></tr>
<tr><td>Satsuma (UK)</td><td>Sold all 669 BTC, is returning £30.7M to shareholders and delisting from the LSE</td><td>Liquidation-style exit</td></tr>
<tr><td>Nakamoto (NAKA)</td><td>Down about 99% from its May 2025 peak; 1-for-40 reverse split; sold bitcoin to repay part of a Kraken loan, with the rest refinanced at 7.75% secured by at least 2,000 BTC</td><td>Forced selling under secured debt</td></tr>
<tr><td>Strive, Metaplanet and others</td><td>Strive's all-stock acquisition of Semler closed 2026-01-16; Metaplanet and Super League are forming Superplanet; XXI's planned three-way merger collapsed</td><td>Consolidation: premium stock for discounted bitcoin</td></tr>
</table>

Some observations:

- **We found no notable DAT bankruptcy in 2026** (the search was not exhaustive). Delistings were voluntary (Satsuma) or avoided with a reverse split (Nakamoto).
- **Companies with secured borrowing are the most fragile.** Nakamoto's bitcoin-collateralized loan is precisely the link at which the "death spiral" argument holds for a small company.
- **Mergers are the natural result of diverging mNAVs.** A DAT at a premium that buys a DAT at a discount with its own stock is buying bitcoin at a discount.
- **The largest company chose to protect its credit layers.** Strategy's bitcoin sales went mainly to dividends, the reserve and discounted STRC buybacks, not to buying back common.

**This lesson explains mechanisms and analytical frameworks only; it is not investment advice.** Stage 18.4 turns to pressure from outside the balance sheet, index removal and governance, and the checklist in Stage 18.6 makes "mNAV and its definition" and "the toolkit at a discount" mandatory questions.
`,

  demo: "mnav-compression",

  analogy: `
Imagine **a members-only warehouse club.** The vault holds gold bars (bitcoin), and each membership card (a share) represents a slice of the gold. Cards trade freely on a secondhand market.

When a card sells for more than the gold behind it (\\(\\mathrm{mNAV} > 1\\)), the club prints more cards, sells them and buys more gold, and every existing card ends up with more gold behind it. Everyone is happy, the secondhand price climbs, so the club keeps printing.

Then one day gold crashes, people lose interest in the club, and cards fetch only 80% of the gold behind them (mNAV 0.8). Printing and selling cards now means selling a dollar of gold for 80 cents, and every existing card ends up with less gold.

The club has choices:
- **Stop printing**, and pay the VIP members' annuities (the preferred dividends) from the cash in the safe.
- **Sell some gold and use 80 cents to buy back a dollar's worth of cards**, so every remaining ordinary member has more gold behind them.
- But the VIP members object: "That gold backs our annuities. Every bar you sell is a bar of protection we lose."
- There is a middle way too. VIP cards also trade at a discount, so **buy back a $100 VIP card for $85**; the annuity bill shrinks and everyone left is safer.

As for the "death spiral," the claim that the club will be forced to sell bar after bar as gold sinks lower: what really matters is whether anyone can **force** it to sell (margin, secured loans), how many years the cash in the safe will last, and which dates are written in the ledger when money must be repaid.
`,

  misconceptions: [
    "**\"Once mNAV is below 1, the company is finished.\"** — Below 1 means only that issuing common no longer adds bitcoin per share. The company can pause, buy back, sell bitcoin to buy back, or buy back preferreds at a discount. In 2026, 16 of the 20 largest DATs were below 1x and no notable DAT went bankrupt.",
    "**\"Selling bitcoin is always bad for shareholders.\"** — Below 1x mNAV, selling bitcoin to buy back common raises bitcoin per share (Orange Corp at 0.8: +2.2%). The loser is the preferred holders' coverage (Orange-F falls from 4.0x to 3.68x).",
    "**\"A death spiral is the same as a retail margin blow-up.\"** — A blow-up accelerates itself within hours through margin calls. The major DATs have no margin calls, no bitcoin-secured debt, and skipped preferred dividends are not a default. Stress remains, but it is counted in quarters and put dates, not hours. Small companies with secured loans (such as Nakamoto) are the exception.",
    "**\"Issuing preferreds below 1x mNAV is fine because BTC Yield is positive.\"** — BTC Yield ignores the new senior claim. The real hurdle is whether bitcoin's long-run appreciation beats the cost of capital (Strategy's BTC Hurdle ARR was 10.74% on 2026-08-23).",
    "**\"mNAV is mNAV.\"** — Basic, diluted, enterprise-value and Strategy's 2026 \"net bitcoin per share\" definitions can differ a lot: Metaplanet was 0.58x (basic) and 0.79x (EV) on the same day. Ask for the definition before drawing a conclusion.",
  ],

  quiz: [
    {
      q: "Orange Corp is at mNAV 0.8 ($8 stock, $10 of bitcoin per share). It sells 800 BTC and buys back 10 million shares at $8. What happens to bitcoin per share?",
      options: ["It falls 1.8%", "It is unchanged", "It rises about 2.2%", "It rises 4.5%"],
      answer: 2,
      explain: "\\(\\dfrac{9{,}200\\ \\text{BTC}}{90\\text{M shares}}\\) versus \\(\\dfrac{10{,}000\\ \\text{BTC}}{100\\text{M shares}}\\): **\\(\\dfrac{1 - 8\\%}{1 - 10\\%} - 1 \\approx +2.2\\%\\).** −1.8% is what issuing to buy bitcoin does at the same mNAV.",
    },
    {
      q: "After that same sale and buyback, Orange-F's BTC Rating moves from 4.0x to what, and what does that show?",
      options: [
        "3.68x; part of the common's gain comes from thinning the preferreds' cushion",
        "4.32x; everyone benefits",
        "Unchanged; buybacks have nothing to do with the preferreds",
        "0x; the preferreds are cancelled",
      ],
      answer: 0,
      explain: "**\\(\\dfrac{\\$920\\text{M reserve}}{\\$150\\text{M} + \\$100\\text{M}} = 3.68\\times\\).** One action moves value between layers; that is the key conflict of interest when mNAV compresses.",
    },
    {
      q: "Buying back Orange-F (stated amount $100, 10% dividend) at $85 has what effect on the other layers?",
      options: [
        "It dilutes the common",
        "It helps only the holders being bought out",
        "It raises the annual dividend bill",
        "It retires a claim and its dividends at a discount, thickening every remaining layer's coverage",
      ],
      answer: 3,
      explain: "Spending $85 to extinguish a $100 senior claim and $10 a year of dividends: **net reserve rises and coverage thickens.** That is the logic behind Strategy's roughly $1.125 billion of STRC buybacks in 2026.",
    },
    {
      q: "Which link of the \"death spiral\" chain is essentially absent in a structure like Strategy's?",
      options: [
        "A fall in the bitcoin price",
        "Forced liquidation within a short time because of margin calls",
        "mNAV compression making issuance non-accretive",
        "Cash needed on convertible put dates",
      ],
      answer: 1,
      explain: "Strategy has **no margin calls and no major bitcoin-secured debt**, and its preferreds are perpetual equity. The other three links are real; structure only slows them down.",
    },
    {
      q: "Why is a premium DAT buying a discounted DAT with stock like \"buying bitcoin at a discount\"?",
      options: [
        "Because the target's bitcoin automatically appreciates",
        "Because the acquirer pays with stock worth more than its bitcoin per share and receives bitcoin valued below NAV",
        "Because mergers are tax-free",
        "Because mNAV always becomes 1 after a merger",
      ],
      answer: 1,
      explain: "The acquirer's stock is \"expensive\" (\\(\\mathrm{mNAV} > 1\\)) and the target's bitcoin is \"cheap\" (\\(\\mathrm{mNAV} < 1\\)). Swapping expensive for cheap **raises the acquirer's bitcoin per share**, and that is the arithmetic behind the 2026 wave of DAT mergers.",
    },
  ],

  further: [
    { label: "Strategy 8-K (2026-06-29): the Digital Credit Capital Framework, buyback authorizations and BTC Monetization Program", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526286871/mstr-20260629.htm" },
    { label: "CoinDesk (2026-06-01): Strategy sells bitcoin for the first time since 2022", url: "https://www.coindesk.com/markets/2026/06/01/strategy-sold-32-btc-for-usd2-5-million-in-late-may-filing-shows" },
    { label: "bitcointreasuries.net: Metaplanet's basic, diluted and EV mNAV", url: "https://bitcointreasuries.net/public-companies/metaplanet" },
    { label: "Minsky (1992): The Financial Instability Hypothesis (Levy Economics Institute Working Paper No. 74)", url: "https://www.levyinstitute.org/pubs/wp74.pdf" },
    { label: "CoinTribune (2026-09-25): DATs fall below NAV en masse", url: "https://www.cointribune.com/en/crypto-corporate-treasuries-plunge-below-nav-en-masse/" },
  ],
};
