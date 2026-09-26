export default {
  id: "index-structural-risk",
  stage: 18,
  order: 4,
  title: "Index Inclusion, Passive Flows & Structural Risk: MSCI, S&P & Governance",
  difficulty: "dat",
  prereqs: ["indexes-etfs", "dat-accounting", "mnav-compression"],

  oneLiner:
    "Some risks live not on the balance sheet but in **the rules**: an index provider deciding whether a DAT counts as an \"operating company,\" the S&P profitability test colliding with fair-value accounting, a founder's votes deciding who is in charge, a single tax interpretation changing cash flow. This lesson shows how the plumbing of passive money amplifies those decisions (as of September 2026, MSCI's verdict on \"non-operating companies\" is due by October 16) and how an analyst should write governance, key-person, regulatory and accounting risk into a report.",

  intuition: `
For three lessons we have looked inside the balance sheet: what the bitcoin is worth, how many times each layer is covered, how many months the cash lasts. This lesson looks **outside** it, at rules the company doesn't control but which can change its valuation and its ability to raise money overnight.

Start with a question: who owns MSTR? Besides active investors who like bitcoin, there is a large class of holders with no opinion at all, **passive index funds.** As Stage 5.6 explained, a fund tracking an MSCI global index must hold every constituent at its index weight. When a company is added, the fund must buy; when it is deleted, the fund must sell, **whatever the price and whatever the fundamentals,** around the effective date.

So a single decision by an index provider is an enormous, price-insensitive buy or sell order. For a DAT there is a second-round effect: selling pressure pushes the stock down → mNAV compresses → issuance stops adding value (Stage 18.3). **Index risk travels down the plumbing all the way to the flywheel.**

In October 2025, MSCI proposed removing from its indexes companies whose main business is digital-asset treasury activity and whose digital assets make up at least 50% of total assets. Estimates at the time reportedly put the possible passive outflows at roughly $10 to $15 billion. On January 6, 2026, MSCI decided **not to remove them for now**, but froze increases in their share counts and inclusion factors, and announced a broader consultation on "non-operating companies." That consultation arrived in August 2026. In a simulation on May 2026 data, the deletions from the ACWI IMI included **Strategy, Metaplanet and the uranium holder Yellow Cake.** Results are due **on or before October 16, 2026**, and at the time of writing (late September 2026) they are **still pending.**

Beyond indexes, three other kinds of structural risk matter:

- **Accounting and profitability tests.** With bitcoin carried at fair value, profits swing wildly with the price, which turns the S&P 500's profitability hurdle into a bet on quarter-end bitcoin prices.
- **Governance and key people.** Who holds the votes? If the best-known person leaves, does the strategy survive?
- **Regulation and tax.** An interim tax notice, an accounting standard, or a bill that fails in the Senate can each change a DAT's economics.

The lesson rests on **Idea ③ (liquidity and trust, the plumbing)**: passive money is the widest pipe in modern markets, and index rules are its valves. It also rests on **Idea ② (balance sheets and claims)**: voting rights and preferred holders' board-seat rights are control written into claims. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**

**In this lesson we break it into five pieces:**

- **① The plumbing of passive money: why additions and deletions are price-insensitive trades**
- **② MSCI and DATs: from the October 2025 proposal to the October 2026 verdict**
- **③ The S&P 500 and the profitability test: a side effect of fair-value accounting**
- **④ Governance: votes, key people and the preferreds' control clauses**
- **⑤ Regulation, accounting and tax: when the rules change, rerun the model**
`,

  mechanics: `
### ① The plumbing of passive money: why additions and deletions are price-insensitive trades

A cap-weighted index fund holds a stock in the amount fund size × the stock's index weight. Once a constituent is deleted, the fund must sell out around the effective date (usually the close of a quarterly or semi-annual review). A simple way to estimate the passive selling:

$$
Passive selling ≈ market cap × share held by passive funds tracking that index
Days to finish ≈ passive selling ÷ (average daily dollar volume × tolerable participation rate)
Price impact ≈ daily volatility × √(amount sold ÷ average daily volume) (square-root law, Stage 17.1)
$$

**An Orange Corp illustration.** Market cap is $1.5 billion. Suppose 8% is held by passive funds tracking one index family: passive selling of about **$120 million.** Daily volume is 5 million shares × $15 = $75 million a day. Selling 20% of daily volume takes 8 trading days. Cram it all into the effective date and, at 4% daily volatility, the impact is about 4% × √1.6 ≈ **5%.** A 5% drop takes mNAV from 1.5 to about 1.43, and the flywheel has lost a chunk of its fuel.

Three points follow:

- **Announcement date and effective date are different things.** Active investors trade between the two, so the impact often shows up early. When MSCI said on January 6, 2026 that it would not remove DATs, Strategy's stock reportedly rose about 6% that day: "no forced selling after all" got priced in immediately.
- **What gets sold is the stock, not the bitcoin.** Index deletion doesn't directly force a DAT to sell coins; it works indirectly, through mNAV and the cost of capital.
- **A freeze has a cost too.** MSCI freezing DAT share-count increases means the new shares a company sells through its ATM are **not automatically absorbed by index funds.** The passive-buying pipe is closed to new supply.

### ② MSCI and DATs: from the October 2025 proposal to the October 2026 verdict

<figure><svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">MSCI and DATs: a timeline (as of 2026-09-26)</text><line x1="30" y1="120" x2="610" y2="120" stroke="var(--line)" stroke-width="2"/><circle cx="50" cy="120" r="6" fill="var(--red)"/><text x="50" y="98" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">2025-10</text><text x="55" y="146" text-anchor="middle" font-size="10" fill="var(--muted)">Removal proposed</text><text x="55" y="160" text-anchor="middle" font-size="10" fill="var(--muted)">digital assets ≥ 50%</text><circle cx="160" cy="120" r="6" fill="var(--green)"/><text x="160" y="98" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">2026-01-06</text><text x="165" y="146" text-anchor="middle" font-size="10" fill="var(--muted)">No removal for now</text><text x="165" y="160" text-anchor="middle" font-size="10" fill="var(--muted)">share counts frozen</text><circle cx="280" cy="120" r="6" fill="var(--orange)"/><text x="280" y="98" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">2026-08</text><text x="285" y="146" text-anchor="middle" font-size="10" fill="var(--muted)">"Non-operating" consultation</text><text x="285" y="174" text-anchor="middle" font-size="10" fill="var(--muted)">simulated deletions incl. Strategy</text><circle cx="370" cy="120" r="5" fill="var(--blue)"/><text x="370" y="70" text-anchor="middle" font-size="10" fill="var(--muted)">08-31 Strategy objects</text><line x1="370" y1="74" x2="370" y2="114" stroke="var(--line)"/><circle cx="430" cy="120" r="5" fill="var(--blue)"/><text x="440" y="190" text-anchor="middle" font-size="10" fill="var(--muted)">09-25 Strive objects</text><line x1="430" y1="126" x2="436" y2="180" stroke="var(--line)"/><circle cx="470" cy="120" r="6" fill="var(--btc)"/><text x="470" y="98" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">09-30</text><text x="470" y="160" text-anchor="middle" font-size="10" fill="var(--muted)">comments close</text><circle cx="540" cy="120" r="7" fill="var(--surface-2)" stroke="var(--red)" stroke-width="2"/><text x="540" y="98" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">≤ 10-16</text><text x="540" y="146" text-anchor="middle" font-size="10" fill="var(--red)">verdict</text><circle cx="600" cy="120" r="6" fill="var(--surface-2)" stroke="var(--muted)" stroke-width="2"/><text x="600" y="98" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">2026-11</text><text x="598" y="146" text-anchor="middle" font-size="10" fill="var(--muted)">review</text><rect x="120" y="208" width="400" height="30" rx="6" fill="var(--surface-2)" stroke="var(--orange-line)" stroke-dasharray="4 3"/><text x="320" y="227" text-anchor="middle" font-size="11" fill="var(--orange-ink)">Outcome pending at the time of writing: check MSCI's announcement</text></svg><figcaption>Within a year MSCI went from a proposal aimed squarely at DATs to a consultation covering every "non-operating company." The verdict is due by October 16, 2026, for implementation at the November review.</figcaption></figure>

**The framework of the August 2026 consultation** (our fact sheet relays a researcher's reading of the MSCI document, not re-checked line by line):

- **Core screen:** do operating assets exceed 50% of total assets?
- **Exclusion:** fail the core screen **and** trip at least 4 of 5 ratios.
- **Existing constituents:** must fail for two consecutive years before removal.
- **Simulation** (May 2026 data): ACWI IMI deletions include Strategy, Metaplanet and Yellow Cake.
- **Timetable:** feedback until 2026-09-30; results on or before 2026-10-16; implementation at the November 2026 review. Strategy filed a critical response on August 31, Strive on September 25.

The two sides argue:

- **MSCI's logic.** Equity indexes measure operating businesses. A company whose assets are mostly one passively held asset looks more like a fund, and investors who want bitcoin exposure can choose it separately (for example through spot ETFs, Stage 12.5). Note that Yellow Cake is on the list: the rule targets "non-operating," not just crypto.
- **The DATs' logic.** Strategy still runs a software business (about $122 million of revenue in Q2 2026) and from Q2 2026 reports a separate "Bitcoin" operating segment. It actively issues securities and manages a capital structure, which is itself an operation. Screening by asset type would make banks and insurers, which also hold mainly financial assets, look out of place.

**How an analyst should handle it.** Don't guess the verdict. Lay out scenarios ("retained / freeze continues / deleted") and estimate the passive selling and mNAV effect in each (this lesson's demo can do the arithmetic).

### ③ The S&P 500 and the profitability test: a side effect of fair-value accounting

One S&P 500 eligibility rule is **GAAP profitability**: net income summed over the last four quarters must be positive, and so must the most recent quarter. As Stage 15.6 explained, since adopting ASU 2023-08 on January 1, 2025, bitcoin is carried at fair value and unrealized gains and losses flow straight into net income. Strategy's profit has become a function of the quarter-end bitcoin price:

<table class="pm">
<tr><th>Quarter</th><th>Unrealized bitcoin gain/loss</th><th>Net income (loss)</th></tr>
<tr><td>Q2 2025</td><td>+$14.05B</td><td>+$10.02B</td></tr>
<tr><td>Q3 2025</td><td>+$3.89B</td><td>about +$2.8B</td></tr>
<tr><td>Q4 2025</td><td>−$17.44B</td><td>(not in our fact sheet)</td></tr>
<tr><td>Q1 2026</td><td>−$14.46B</td><td><b>−$12.54B</b></td></tr>
<tr><td>Q2 2026</td><td>−$8.32B</td><td><b>−$8.22B</b></td></tr>
</table>

With large losses in the two most recent quarters, Strategy does not meet the S&P 500 profitability test on current data, and we found no 2026 news of its inclusion (this is analysis, not an official statement). Separately, MSTR reportedly joined the Nasdaq-100 in December 2024. Different indexes have different rules; check official announcements for current membership.

**The point:** fair-value accounting turns "can a DAT join the S&P 500?" into a bet on quarter-end bitcoin prices. If bitcoin ends a few quarters high, the four-quarter sum can turn positive. And as Stage 5.6 noted, the S&P 500 also involves committee discretion; meeting the thresholds does not guarantee inclusion.

### ④ Governance: votes, key people and the preferreds' control clauses

**Votes.** Strategy has Class A and Class B common stock. Class B carries more votes per share and is held mainly by the founder (see each year's proxy statement for the exact split). Michael Saylor is founder, Executive Chairman and Chairman of the Board; Phong Le is President and CEO; Andrew Kang is CFO and, after the Chief Accounting Officer retired on 2026-06-30, also principal accounting officer. Strive also has two share classes (about 87.8 million Class A and 9.2 million Class B), with Matt Cole as CEO and Chairman.

**Why it matters.** Stage 18.3 showed that when mNAV falls below 1, the common, the preferreds and the convertibles want management to do different things. **Whoever holds the votes decides which way the conflict tips.** Dual-class shares let a founder hold a long-term course (supporters: immune to short-term mood) but also make it hard for outside shareholders to change direction (critics: no checks and balances).

**Key-person risk.** A good part of a DAT's premium comes from investors' faith in management's ability to raise capital and in its conviction. A contrasting case: Twenty One (XXI) is majority-owned by Tether and Bitfinex, with SoftBank a significant minority holder. CEO Jack Mallers stepped down on 2026-07-20, and the planned three-way merger with Strike and Elektron fell apart. A change in controlling shareholder priorities and in the key person, and the company's direction changed.

**The preferreds' control clauses.** STRF and STRK holders can elect directors if dividends go unpaid; SATA holders gain board seats after 12 and 24 missed payments. **The terms themselves can be changed by vote.** The STRK liquidation-preference amendment was ratified at the 2026-06-08 annual meeting, and Strategy's board has proposed moving its four dollar preferreds to daily record dates, to be voted on at a special meeting on **2026-10-28.**

**Custody and transparency.** Where is the bitcoin, who holds it, and is any of it pledged? Strategy says no bitcoin is pledged to its preferreds; GameStop, by contrast, pledged 4,709 BTC to Coinbase as collateral for covered calls. These facts have to be read, line by line, out of the 10-K and 10-Q.

### ⑤ Regulation, accounting and tax: when the rules change, rerun the model

- **CAMT (the 15% corporate alternative minimum tax).** Fair-value accounting meant unrealized bitcoin gains could inflate "adjusted financial statement income" and trigger the minimum tax, a real cash tax. On 2025-09-30, Treasury and the IRS issued **interim** guidance allowing corporations to disregard unrealized gains and losses on digital assets in that calculation, and Strategy says it will do so; revised proposed regulations are still to come. **Behind one interim notice sits cash flow potentially measured in billions.**
- **Deferred tax.** Strategy's deferred tax liability fell from $1.93 billion at 2025-12-31 to about $1.4 million at 2026-06-30, with a valuation allowance recorded. A falling bitcoin price rewrites the tax balance sheet too.
- **Return of capital (ROC).** Preferred dividends are expected to be treated as tax-deferred return of capital, provided the company's tax "earnings and profits" are negative (Stage 17.7). Change that premise and investors' after-tax yield changes.
- **Crypto market-structure legislation.** The GENIUS Act (stablecoins) is law; the CLARITY Act (market structure) failed a Senate cloture vote on 2026-09-15. The regulatory path shapes the whole environment for bitcoin and custody, and whether DAT securities might one day trade in tokenized form (Stage 14.3).
- **Cross-border and exchange rules.** Metaplanet's preferred listing was delayed by Japanese exchange rules (2026-05-13); STRE is euro-denominated and listed in Luxembourg. The same instrument meets different hurdles in different jurisdictions.

**The strongest optimistic case:** most of these risks are **visible, dated and preparable.** MSCI published a timetable, the tax issue has an interim fix, and companies can adjust their structures in advance. **The strongest pessimistic case:** rule risk is binary and hard to hedge, and the DAT business model depends precisely on capital markets working smoothly; one index decision or one tax interpretation can hit the share price and the funding channel at the same time. The checklist in Stage 18.6 makes "governance" and "the macro and rules environment" its ninth and tenth questions. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "index-structural-risk",

  analogy: `
Think of a DAT as **a shop inside a big shopping mall.**

The goods in the shop (the bitcoin) are yours, but **the foot traffic** is not. Every day crowds of "automatic shoppers," the passive index funds, come in and buy in fixed proportions simply because your shop is on the mall's directory. The mall's management (the index provider) decides what goes on the directory. One day management says: "The directory will list only shops that are genuinely open for business. You mostly just store goods, so you may come off." The automatic shoppers won't ask whether your goods are any good. On the effective day, they will return everything they bought, as the rules require.

There are other rules. The mall's "top merchants" board (the S&P 500) requires four quarters of profit on the books, but your book profit moves with the price of your goods every day, so whether you make the board depends on prices in the last few days of each quarter.

Who runs the shop? If the founder holds more keys than other owners (dual-class shares), the founder can keep running it their way. But if that person ever leaves, whether the customers keep coming is another question.

Finally, the tax office pins up a temporary notice: "For now, the paper gains on stored goods don't count as income." That notice may save you a fortune, but it says "temporary" at the top.

An analyst's job is to put **the rules pinned on the wall** and **the control written into the contracts** into the report, right beside the goods on the shelves.
`,

  misconceptions: [
    "**\"Index deletion is just a reputational issue; it doesn't touch the company's bitcoin.\"** — Deletion forces passive funds to sell the stock, pushing down the price and mNAV and making issuance costlier or outright dilutive (Stage 18.3); a share-count freeze means newly issued shares lose their passive buyers. No coins are sold directly, but the ability to raise money changes.",
    "**\"MSCI has already decided to remove Strategy.\"** — As of late September 2026, the second consultation's verdict had not been published (it is due by October 16). A simulated list is not a final decision, and the framework gives existing constituents a buffer of two consecutive years of failing. Check MSCI's official announcement.",
    "**\"A big enough market cap gets you into the S&P 500.\"** — You also need GAAP profitability (a positive four-quarter sum and a positive latest quarter) plus committee approval. Fair-value accounting makes DAT profits swing with quarter-end bitcoin prices; Strategy lost about $12.5 billion and $8.2 billion in the first two quarters of 2026.",
    "**\"Dual-class shares are always bad.\"** — They let a founder hold a long-term course without bowing to short-term sentiment; the price is that outside shareholders struggle to correct mistakes. What matters is where the controller's incentives point in a conflict, such as buying back common below 1x versus protecting the preferreds.",
    "**\"Tax and accounting are technicalities.\"** — One interim CAMT notice can decide billions in cash tax, ROC treatment decides preferred investors' after-tax return, and fair-value accounting decides S&P 500 eligibility. The rules are cash flow.",
  ],

  quiz: [
    {
      q: "Orange Corp has a $1.5B market cap; passive funds tracking one index hold 8%; daily dollar volume is $75M. If it is deleted and the funds sell 20% of daily volume, roughly how many trading days does it take?",
      options: ["1 day", "4 days", "8 days", "20 days"],
      answer: 2,
      explain: "Passive selling ≈ $1.5B × 8% = $120M; each day can absorb $75M × 20% = $15M, so **8 trading days.**",
    },
    {
      q: "What did MSCI decide on January 6, 2026?",
      options: [
        "To remove all DATs immediately",
        "Not to remove them for now, but to freeze increases in DAT share counts and inclusion factors and open a broader consultation on \"non-operating companies\"",
        "To move DATs into a separate crypto index",
        "To increase DATs' index weights",
      ],
      answer: 1,
      explain: "**No removal + a freeze + a broader consultation.** The freeze means shares newly sold through an ATM are not automatically absorbed by index funds.",
    },
    {
      q: "Why does Strategy currently struggle to meet the S&P 500 profitability test?",
      options: [
        "Because it has no software business",
        "Because its market cap is too small",
        "Because it is a foreign company",
        "Because fair-value accounting puts unrealized bitcoin losses into net income, producing losses of about $12.5B and $8.2B in the first two quarters of 2026",
      ],
      answer: 3,
      explain: "ASU 2023-08 makes profit swing with the quarter-end bitcoin price. The test requires a positive four-quarter sum **and** a positive latest quarter.",
    },
    {
      q: "MSCI's August 2026 simulated deletions included, besides Strategy and Metaplanet, the uranium holder Yellow Cake. What does that show?",
      options: [
        "The rule targets \"non-operating\" companies (mostly passively held assets), not just crypto",
        "MSCI targets only Japanese companies",
        "Uranium is a crypto asset",
        "The list is random",
      ],
      answer: 0,
      explain: "The second consultation widened the question from \"digital asset treasuries\" to **\"non-operating companies\"**: the core screen asks whether operating assets exceed 50% of total assets.",
    },
    {
      q: "Which of these is \"control\" written into preferred holders' terms?",
      options: [
        "The Monday 8-K",
        "BTC Yield",
        "The right to elect directors when dividends go unpaid (e.g. STRF, STRK; SATA after 12 and 24 missed payments)",
        "mNAV",
      ],
      answer: 2,
      explain: "**Board-seat rights** turn \"not getting paid\" into \"getting a say,\" the preferreds' protection at the governance level.",
    },
  ],

  further: [
    { label: "MSCI: Consultation on Eligibility of Non-Operating Companies for the MSCI Global Investable Market Indexes (August 2026)", url: "https://www.msci.com/downloads/documents/indexes/consultations/equity/Consultation%20on%20Eligibility%20of%20Non-Operating%20Companies%20for%20the%20%20MSCI%20Global%20Investable%20Market%20Indexes.pdf" },
    { label: "MSCI announcement (2026-01-06): no DAT removal for now, share-count freeze", url: "https://app2.msci.com/webapp/index_ann/DocGet?pub_key=DD3Olh5uInk%3D&lang=en&format=html" },
    { label: "S&P Dow Jones Indices: US index methodology, including the earnings requirement", url: "https://www.spglobal.com/spdji/en/documents/methodologies/methodology-sp-us-indices.pdf" },
    { label: "Strategy 10-Q (Q2 2026): fair-value results, CAMT and index-related risk disclosures", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000044/mstr-20260630.htm" },
    { label: "CoinDesk (2026-07-21): Jack Mallers steps down as XXI CEO as the three-way merger falls apart", url: "https://www.coindesk.com/business/2026/07/21/jack-mallers-steps-down-as-xxi-capital-ceo-as-tether-s-plans-to-merge-three-bitcoin-firms-falls" },
  ],
};
