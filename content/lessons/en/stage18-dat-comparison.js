export default {
  id: "dat-comparison",
  stage: 18,
  order: 5,
  title: "Comparing DATs: Strategy, Strive, Metaplanet & the ETH/SOL Treasuries",
  difficulty: "dat",
  prereqs: ["dat-landscape", "strive-sata", "dat-stress-test"],

  oneLiner:
    "When you put two DATs side by side, the first step is not to see whose numbers look better but to **put them on the same scale**: mNAV has four definitions, \"amplification\" has two formulas, and bitcoin per share has two share counts. Once that's done, compare five things: **scale, growth in bitcoin per share, leverage and instruments, coverage and cost of capital, jurisdiction and governance.** This lesson puts Strategy, Strive, Metaplanet, Twenty One, Nakamoto and the ETH/SOL treasuries into one table on data as of September 2026, and takes up a new question: is an asset that earns staking yield a better treasury asset?",

  intuition: `
Imagine three shops on one street selling the same gold bars. Shop A's sign says "1.2x the gold price," shop B's says "33% premium," shop C's says "0.58x." Can you compare them directly? No. Shop A's "multiple" may already deduct what it owes others, shop B's "premium" is based on market cap, and shop C's 0.58x uses the simplest market-cap definition. **Only once they are on the same scale can you compare them.**

Comparing DATs works exactly like this. Stage 16.2 covered mNAV's four definitions, Stage 16.4 the two formulas for "amplification" (Strategy's \\(\\dfrac{\\text{BTC Reserve}}{\\text{Net Reserve}}\\), and Strive's \\(\\dfrac{\\text{debt} + \\text{preferred}}{\\text{bitcoin value}}\\)), and Stage 16.1 which share count to use for bitcoin per share. Change the definition and the same company's number can move a long way.

With definitions aligned, an analyst compares five things:

1. **Scale and holdings.** How much bitcoin, what share of the total supply, and the average cost (is it underwater?).
2. **Growth in bitcoin per share.** Is a high BTC Yield coming from issuing common at a premium, or from issuing lots of preferred? (Stage 16.3's warning: the latter ignores the new senior claims.)
3. **Leverage and instruments.** Is there debt? Is there **borrowing secured by bitcoin**? How much preferred, at what rates?
4. **Coverage and cost of capital.** How many times is the most junior layer covered? What is the Breakeven ARR, the annual bitcoin appreciation needed to "carry" this balance sheet?
5. **Jurisdiction and governance.** Where is it listed, which rules apply, and who controls it (Stage 18.4)?

As of September 2026 one contrast stands out: **Strategy and Strive took two different roads.** Strategy uses the whole toolkit, convertibles plus five preferreds plus common, and holds 846,000 BTC. Strive insists on "amplification through perpetual preferreds only, zero debt, zero pledged coins," holds 26,355 BTC, and its only source of leverage is SATA, paying 13%. The former's Breakeven ARR is about 2.3%, the latter's about 6.6% (derived). The former's 2026-definition mNAV was about 1.01x in late August; the latter was, according to DWF Ventures, one of "only 4 of the 20 largest DATs" still above 1x. **Neither road dominates; each is a set of trade-offs.**

Finally, the ETH and SOL treasuries. The assets they hold can be **staked** to earn a yield, which sounds like "bitcoin that lays eggs." Where that yield comes from, and what extra risk it carries, is the last question this lesson unpacks.

The lesson rests on **Idea ② (balance sheets and claims)**, since what we compare is balance-sheet design, and on **Idea ④ (risk and leverage)**, since different leverage structures behave completely differently in the same sell-off. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice, and no comparison here is a recommendation.**

**In this lesson we break it into five pieces:**

- **① Align the definitions first: mNAV, amplification, bitcoin per share**
- **② Scale, cost and growth: who holds how much bitcoin, and how they got it**
- **③ Leverage and instruments: debt, preferreds, secured borrowing**
- **④ Coverage and cost of capital: the cushion and the hurdle**
- **⑤ ETH/SOL treasuries: is an asset that "lays eggs" better?**
`,

  mechanics: `
### ① Align the definitions first: mNAV, amplification, bitcoin per share

<table class="pm">
<tr><th>Metric</th><th>Strategy's definition</th><th>Strive's definition</th><th>Third parties (bitcointreasuries etc.)</th></tr>
<tr><td>Premium</td><td>2026: \\(\\dfrac{\\text{price}}{\\text{net bitcoin per share}}\\) (less debt and preferreds, plus USD assets); 2025: \\(\\dfrac{\\text{enterprise value}}{\\text{bitcoin NAV}}\\)</td><td>No "mNAV": \\(\\text{Common Equity Accretion Premium} = \\dfrac{\\text{market cap}}{\\text{bitcoin value}} - 1\\); EV/Treasury Asset Value; multiple to Net Treasury Asset Value</td><td>Basic, diluted, enterprise value</td></tr>
<tr><td>Amplification</td><td>\\(\\text{Amplification} = \\dfrac{\\text{BTC Reserve}}{\\text{Net Reserve}}\\) (above 1x)</td><td>\\(\\text{Amplification Ratio} = \\dfrac{\\text{debt} + \\text{preferred}}{\\text{bitcoin value}}\\) (a percentage)</td><td>—</td></tr>
<tr><td>Bitcoin per share</td><td>On "Assumed Diluted Shares" (every convertible counted, in or out of the money)</td><td>On "Assumed Fully Diluted Shares" (excluding traditional warrants)</td><td>Varies</td></tr>
</table>

**One company, several numbers.** Strive's "Common Equity Accretion Premium" of 33.0% is roughly a basic mNAV of **1.33x**. Its "EV / Treasury Asset Value" is **1.52x**. Its "Multiple to Net Treasury Asset Value" is **2.14x** (net treasury assets of $1.38 billion, or $13.76 a share, against a $29.44 stock price: \\(\\dfrac{29.44}{13.76} \\approx 2.14\\)). The Block's own ASST mNAV was **1.21x** (2026-09-26). Four numbers, one company, one day. **To compare two companies, put them on the same definition.** This lesson's demo shows "most junior layer coverage," "Breakeven ARR" and both amplification formulas side by side for exactly that reason.

### ② Scale, cost and growth: who holds how much bitcoin, and how they got it

<table class="pm">
<tr><th>Company</th><th>BTC held (date)</th><th>Highlights</th></tr>
<tr><td>Strategy (MSTR)</td><td>846,000 (2026-09-20)</td><td>About 4% of all bitcoin; average cost about $75,416; about 66% of all bitcoin held by public companies</td></tr>
<tr><td>Twenty One (XXI)</td><td>43,514 (bitcointreasuries, 2026-09-26)</td><td>Listed on the NYSE 2025-12-09; controlled by Tether and Bitfinex; basic mNAV about 0.68x</td></tr>
<tr><td>Metaplanet (3350.T)</td><td>43,000 (2026-07-02, still stated 08-18)</td><td>Targets 100,000 BTC by end-2026 and 210,000 by end-2027; average cost about $88,600, underwater</td></tr>
<tr><td>Strive (ASST)</td><td>26,355 (2026-09-18)</td><td>Average cost about $90,610; 2026 year-to-date BTC Yield +54.5%; about 26,317 sats per share</td></tr>
<tr><td>Nakamoto (NAKA)</td><td>About 4,467</td><td>Down about 99% from its peak; sold coins to repay a loan; 1-for-40 reverse split</td></tr>
</table>

Some comparisons:

- **Scale isn't everything.** Strategy's size gives it the deepest access to capital markets (about $20.3 billion raised in 2026 up to August 23), and also makes it a "whale" whose every sale is noticed (Stage 18.3).
- **Unpack where growth comes from.** Strive's +54.5% year-to-date BTC Yield is high, but since its November 2025 IPO, SATA has grown from 2 million shares to about 11.18 million (about $1.12 billion at the $100 stated amount). A large part of the growth in bitcoin per share came from **preferred financing**, which adds claims ahead of the common. Strategy's 22.8% BTC Yield for 2025 and 8.1% for the first half of 2026 likewise mix contributions from common and preferred issuance.
- **Cost and paper losses.** With bitcoin around $84,000 (2026-09-25), Strategy's stack was about 12% above cost, while Strive (average about $90,600) and Metaplanet (about $88,600) were underwater. A paper loss triggers nothing by itself (there are no margin calls), but it affects accounting profit and sentiment.

### ③ Leverage and instruments: debt, preferreds, secured borrowing

<table class="pm">
<tr><th>Company</th><th>Debt</th><th>Preferreds (rate)</th><th>Bitcoin pledged?</th></tr>
<tr><td>Strategy</td><td>About $6.75B of unsecured convertibles, with put dates from Sep 2027</td><td>About $14.3B: STRF 10%, STRC 12% (variable), STRE 10% (euro), STRK 8%, STRD 10% (non-cumulative)</td><td>No bitcoin pledged against the main debt; preferreds unsecured</td></tr>
<tr><td>Strive</td><td><b>Zero</b> (Semler's convertibles were exchanged into SATA or repurchased; its Coinbase loan repaid)</td><td>SATA, about $1.118B, 13% (variable), paid daily</td><td>"Zero encumbered bitcoin"</td></tr>
<tr><td>Metaplanet</td><td>A $500M bitcoin-secured credit facility, about $280M drawn as of March 2026</td><td>MERCURY 4.9% (yen, convertible, about $150M); MARS (monthly adjustable) apparently not yet issued</td><td><b>Yes</b> (the facility)</td></tr>
<tr><td>Nakamoto</td><td>A Kraken USDT loan, partly repaid, with the rest refinanced at 7.75%</td><td>—</td><td><b>Yes</b> (at least 2,000 BTC)</td></tr>
</table>

**Costs of capital differ enormously.** Metaplanet's MERCURY pays just 4.9% (Japan's low-rate environment plus a conversion right), Strategy's STRC 12%, Strive's SATA 13%, and Nakamoto's secured loan 7.75%. But **cheap money is not necessarily safer money.** Borrowing secured by bitcoin is the only link in any of these structures that can face a margin call when prices fall (Stage 7.5, Stage 18.3). **An analyst has to look at both the price (the cost of capital) and the form (secured or not, dated or not).**

### ④ Coverage and cost of capital: the cushion and the hurdle

Derived with the same formulas (bitcoin at about $84,100; cash not netted unless noted):

<table class="pm">
<tr><th>Company (date)</th><th>Most junior layer coverage</th><th>Breakeven ARR</th><th>Amplification (Strategy-style)</th><th>Leverage ratio (Strive-style)</th><th>Reserve</th></tr>
<tr><td>Orange Corp (illustrative)</td><td>3.33x</td><td>1.50%</td><td>1.37x</td><td>30%</td><td>24 months</td></tr>
<tr><td>Strategy (2026-09-20)</td><td>About 3.38x</td><td>About 2.28%</td><td>1.30x (company figure, 08-23)</td><td>About 30%</td><td>About 37 months</td></tr>
<tr><td>Strive (2026-09-18)</td><td>About 1.98x (about 2.19x with cash)</td><td>About 6.56%</td><td>About 1.67x (derived, counting $229.6M of cash)</td><td>50.4% (company figure)</td><td>Policy 18 months; cash about 19 months</td></tr>
<tr><td>Metaplanet (mixed dates)</td><td>Roughly 8x ($280M facility + $150M MERCURY)</td><td>Not computable from our fact sheet</td><td>—</td><td>Roughly 12%</td><td>—</td></tr>
</table>

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Cushion vs hurdle: most junior layer coverage × Breakeven ARR</text><line x1="80" y1="240" x2="600" y2="240" stroke="var(--line)"/><line x1="80" y1="40" x2="80" y2="240" stroke="var(--line)"/><line x1="80" y1="202" x2="600" y2="202" stroke="var(--red)" stroke-dasharray="5 4"/><text x="596" y="196" text-anchor="end" font-size="10" fill="var(--red)">1.0x</text><rect x="86" y="46" width="170" height="40" rx="6" fill="var(--green-soft)"/><text x="171" y="64" text-anchor="middle" font-size="10" fill="var(--green)">Thick cushion, low hurdle</text><text x="171" y="78" text-anchor="middle" font-size="10" fill="var(--green)">(friendlier to credit layers)</text><rect x="424" y="206" width="170" height="28" rx="6" fill="var(--red-soft)"/><text x="509" y="224" text-anchor="middle" font-size="10" fill="var(--red)">Thin cushion, high hurdle</text><circle cx="178" cy="113" r="8" fill="var(--orange)"/><text x="170" y="138" text-anchor="end" font-size="11" font-weight="700" fill="var(--orange-ink)">Orange Corp</text><circle cx="228" cy="112" r="11" fill="var(--btc)"/><text x="244" y="108" font-size="11" font-weight="700" fill="var(--ink)">Strategy</text><circle cx="506" cy="165" r="7" fill="var(--blue)"/><text x="506" y="150" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">Strive</text><text x="80" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">0%</text><text x="275" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">3%</text><text x="470" y="256" text-anchor="middle" font-size="10" fill="var(--muted)">6%</text><text x="340" y="276" text-anchor="middle" font-size="10" fill="var(--muted)">Breakeven ARR (annual interest and dividends ÷ BTC Reserve)</text><text x="72" y="164" text-anchor="end" font-size="10" fill="var(--muted)">2x</text><text x="72" y="88" text-anchor="end" font-size="10" fill="var(--muted)">4x</text><text x="30" y="140" text-anchor="middle" font-size="10" fill="var(--muted)" transform="rotate(-90 30 140)">Most junior coverage</text></svg><figcaption>Derived, with bitcoin at about $84,100 and cash not netted. Strive has no debt yet sits lower right: all of its leverage is 13% preferred, large relative to its bitcoin. Metaplanet is omitted for lack of data.</figcaption></figure>

How to read the chart:

- **Up and to the left is friendlier to the credit layers** (debt and preferreds): thick coverage, and a low annual bitcoin return needed to carry the structure.
- **Down and to the right, the common's amplification is stronger but so is the hurdle.** Strive's bitcoin must rise about 6.6% a year just to "cover" SATA's dividends; seen the other way, its common is more sensitive to bitcoin.
- **Strive's rebuttal.** It has no debt at all, no put wall and no pledged coins. SATA's dividend is a cumulative obligation the company sets itself (arrears compound at a higher rate, and holders gain board seats after 12 and 24 missed payments). It holds an 18-month dividend reserve and 505,000 STRC shares. **Having no maturity date is itself a cushion**, just one that doesn't show up in a coverage ratio.
- **Strategy's rebuttal.** Scale brings access, and access buys time; a USD Reserve of about three years and a diverse toolkit let it switch between funding sources as markets change. Its weak points are the put wall and its "whale" status (Stage 18.2, Stage 18.3).

### ⑤ ETH/SOL treasuries: is an asset that "lays eggs" better?

The main non-bitcoin treasuries as of September 2026:

- **BitMine (BMNR):** about 5.98 million ETH (about 4.9% of supply, against a 5% target), of which about 5.07 million is staked; also 212 BTC and $714 million of cash.
- **SharpLink (SBET):** about 889,000 ETH (2026-08-03); about $41.7 million of stock repurchased since August 2025.
- **Forward Industries (FWDI):** about 8.16 million SOL (2026-09-21). **DeFi Development (DFDV)** holds about 2.49 million SOL and funds purchases through a $300 million "CHAD" preferred ATM; **Upexi (UPXI)** held 2.34 million SOL (2026-06-30).
- A lesson: ETHZilla sold ETH to buy back stock in October 2025 and sold 24,291 ETH to redeem convertibles in December, the same choices bitcoin DATs make when mNAV compresses.

**What staking yield really means:**

- **Supporters:** staking yield (on the order of a few percent a year, varying by network) is **a real cash flow denominated in the asset itself.** In Stage 18.3's Minsky framework, it moves a treasury closer to "hedge finance": part of the preferred dividend can be paid from yield rather than by selling assets or issuing stock. Bitcoin has no such yield, which is the root reason bitcoin DATs depend on appreciation and financing alone.
- **Critics:** staking yield isn't free. It comes with **slashing, validator and custody risk, unbonding delays and liquidity risk,** plus protocol-upgrade risk; the yield is paid in ETH or SOL, which are usually more volatile than bitcoin. More fundamentally, **the bitcoin DAT's thesis is "bitcoin is the best long-term monetary asset,"** whereas the ETH/SOL treasury's thesis is "hold a platform's yield-bearing asset." They are different bets, and comparing yields alone misses that.
- **How an analyst should handle it:** treat staking yield as "operating cash flow," netting it in months of coverage (Stage 16.6) and in the numerator of Breakeven ARR, but add a stress scenario in which staking yield falls and unbonding queues lengthen.

**One last discipline:** the most common mistake in a comparison is putting numbers from **different dates, definitions and currencies** into one table. Every figure in this lesson's tables carries a date, and the Metaplanet coverage is only a rough estimate (mixing March borrowing with July holdings, yen with dollars). The checklist in Stage 18.6 makes "definitions and dates" its first discipline. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice, and no comparison here is a recommendation.**
`,

  demo: "dat-comparison",

  analogy: `
Comparing DATs is like **comparing several ships carrying the same cargo.**

One ship is huge (Strategy): lots of cargo, friends in many ports, able to resupply almost anywhere. But when it turns, the whole sea churns, and there are a few dated IOUs in the bottom of its hold.

One ship is small and clean (Strive): not a cent of outside debt on board. But its crew is paid well (a 13% preferred dividend), so if the cargo doesn't rise a few percent a year, wages have to come out of the cargo. Luckily its storeroom is labelled "stocked for 18 months."

One ship sails in another sea (Metaplanet). The harbor rules there are different and borrowing is cheap, but it borrowed **against the cargo**, so in a big enough storm the lender can come aboard and carry cargo away.

And some ships carry cargo that "lays eggs" (the ETH and SOL treasuries): the cargo produces a little new cargo each year, but it spoils more easily, and the eggs are counted in the same cargo.

Comparing these ships, you wouldn't just ask "who has the most cargo?" You would ask: **what share of the cargo's value goes on crew wages? When do the IOUs fall due? Can anyone come aboard and take cargo? How many months will the stores last? Which harbor's rules apply?** And you would write down, next to every number, the date and the scale it was measured on.
`,

  misconceptions: [
    "**\"Strive's mNAV is higher than Strategy's, so Strive is more 'expensive.'\"** — Check the definitions. Strive doesn't publish an \"mNAV\"; its 33% premium is roughly a basic mNAV of 1.33x, while Strategy's 1.01x is a \"net\" figure after deducting debt and preferreds. Until both are on the same definition, the comparison means nothing.",
    "**\"No debt means low risk.\"** — Strive has zero debt, zero pledged coins and no put wall. But its 13% SATA is large relative to its bitcoin, giving a Breakeven ARR of about 6.6% and most-junior coverage of about 2x, thinner than Strategy's. The risk changed shape; it didn't disappear.",
    "**\"The lower the cost of capital, the better.\"** — Metaplanet's MERCURY at 4.9% and Nakamoto's loan at 7.75% are both cheaper than STRC or SATA. But borrowing secured by bitcoin is the one link that can face a margin call. Compare price and form together.",
    "**\"The company with the highest BTC Yield is growing best.\"** — BTC Yield ignores new senior claims. Heavy preferred issuance can push BTC Yield up while loading more obligations on top of the common. Unpack where the growth comes from.",
    "**\"ETH/SOL treasuries earn staking yield, so they must beat bitcoin treasuries.\"** — The yield comes with slashing, unbonding, custody and protocol risk, and is paid in more volatile assets. The core theses (monetary asset versus platform yield asset) differ, so yield alone can't settle the comparison.",
  ],

  quiz: [
    {
      q: "Strive reports a \"Common Equity Accretion Premium\" of 33%. Roughly which mNAV does that correspond to?",
      options: [
        "Strategy's 2026 net definition, 1.33x",
        "A basic (market-cap) mNAV of about 1.33x",
        "An enterprise-value mNAV of 0.33x",
        "It has nothing to do with mNAV",
      ],
      answer: 1,
      explain: "The definition is \\(\\dfrac{\\text{market cap}}{\\text{bitcoin value}} - 1\\), so **\\(\\mathrm{mNAV}_{\\text{basic}} \\approx 1 + 33\\% = 1.33\\times\\).** The same day Strive's EV/TAV was 1.52x and The Block's figure 1.21x. Align definitions first.",
    },
    {
      q: "Why is Strive's Breakeven ARR (about 6.6%) higher than Strategy's (about 2.3%) even though Strive has no debt?",
      options: [
        "Because Strive's bitcoin cost more",
        "Because SATA pays 13% and is large relative to Strive's bitcoin (a leverage ratio of about 50%)",
        "Because Strive pays interest on convertibles",
        "Because Strive is listed in Japan",
      ],
      answer: 1,
      explain: "**\\(\\text{Breakeven ARR} = \\dfrac{\\text{annual obligations}}{\\text{BTC Reserve}}\\):** \\(\\dfrac{\\$145.4\\text{M}}{\\text{about } \\$2.22\\text{B}} \\approx 6.6\\%\\), versus Strategy's \\(\\dfrac{\\$1.62\\text{B}}{\\text{about } \\$71.1\\text{B}} \\approx 2.3\\%\\).",
    },
    {
      q: "Which form of financing is most likely to force bitcoin sales in a crash?",
      options: [
        "Perpetual cumulative preferred",
        "Unsecured convertibles with put dates",
        "A common-stock ATM",
        "Borrowing secured by bitcoin (such as Metaplanet's credit facility or Nakamoto's Kraken loan)",
      ],
      answer: 3,
      explain: "Secured borrowing is the only link that can bring a **margin call.** Convertibles create pressure through put dates and preferreds through dividends, but neither can be liquidated because of price alone.",
    },
    {
      q: "Comparing an ETH treasury with a bitcoin treasury, which statement is most accurate?",
      options: [
        "Staking yield can be treated as operating cash flow in the asset itself, reducing reliance on financing, but it carries slashing, unbonding and protocol risk",
        "Staking yield is risk-free, so ETH treasuries must be better",
        "Bitcoin earns staking yield too",
        "ETH treasuries are immune to mNAV compression",
      ],
      answer: 0,
      explain: "Staking moves a treasury closer to Minsky's \"hedge finance,\" but the yield is paid in a more volatile asset and adds risks of its own. ETHZilla selling ETH at a discount to buy back stock and redeem convertibles shows they face mNAV compression too.",
    },
    {
      q: "What is the most common, and most damaging, mistake in comparing DATs?",
      options: [
        "Using derived calculations",
        "Putting numbers from different dates, definitions and currencies into one table without labelling them",
        "Considering both bull and bear arguments",
        "Reading the companies' original filings",
      ],
      answer: 1,
      explain: "**Definitions and dates come first.** The same company's \"premium\" can be 1.21x, 1.33x, 1.52x or 2.14x depending on which scale you use.",
    },
  ],

  further: [
    { label: "Strive bitcoin treasury dashboard: holdings, SATA, Amplification Ratio and three premium measures", url: "https://strive.com/treasury" },
    { label: "Strategy investor briefing FWP (2026-08-24): official definitions of mNAV, Amplification, BTC Rating and Breakeven ARR", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "bitcointreasuries.net: public-company rankings and mNAV on several definitions", url: "https://bitcointreasuries.net/" },
    { label: "CoinDesk (2025-11-20): Metaplanet's MERCURY and MARS preferreds", url: "https://www.coindesk.com/markets/2025/11/20/metaplanet-announce-usd150m-raise-through-perpetual-preferred-equity-with-4-9-yield" },
    { label: "The Block (2026-09-21): BitMine nears its 5% ETH supply target", url: "https://www.theblock.co/news/business/2026-09-21-crypto-bull-market-underway-tom-lee-says-bitmine-nears-5-ethereum-supply-target-with-27562-eth-buy-415923" },
  ],
};
