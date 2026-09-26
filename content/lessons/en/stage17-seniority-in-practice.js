export default {
  id: "seniority-in-practice",
  stage: 17,
  order: 6,
  title: "Seniority in Practice: Who Absorbs the Loss When Bitcoin Falls 70%",
  difficulty: "dat",
  prereqs: ["capital-stack", "bankruptcy-recovery", "btc-rating", "strategy-preferreds"],

  oneLiner:
    "Take Strategy's real floors, **debt > STRF > STRC > STRE/STRK/STRD > common**, and liquidate them layer by layer as bitcoin falls 30%, 50%, 70% and 85% (using `waterfall`, `btcRating` and `btcFloorPrice` from `_fin.js`), with Orange Corp alongside. The answer is clear: **when bitcoin falls 70%, the common absorbs almost the entire loss**, and the junior preferreds sit right at 1x coverage; only further down does the loss climb the stack one floor at a time. But the real world isn't a one-shot liquidation. **Losses show up first as mNAV compression, bitcoin sold to pay dividends, dividend suspensions and prices below par.**",

  intuition: `
Stage 6.1 drew a "floor plan": asset value pours in from the top, filling the most senior floor first, then the next, and whatever is left belongs to the common. Stage 6.6 covered the "absolute priority" rule in bankruptcy. Stage 16.5 turned it into one number: **\\(\\text{BTC Rating} = \\dfrac{\\text{bitcoin value}}{\\text{the claims of this floor} + \\text{every floor above it}}\\)**.

This lesson does something very concrete: **take Strategy's real capital structure, let bitcoin fall, and see which floor the waterline reaches.**

Warm up with Orange Corp. It holds $1 billion of bitcoin, beneath $150 million of convertibles, $100 million of Orange-F and $50 million of Orange-D:

- Bitcoin down 30% → $700 million of bitcoin; the $300 million of claims are fully covered, and the common is left with \\(\\$700\\text{M} - \\$300\\text{M} = \\$400\\text{M}\\) (down from $700 million, **−43%**).
- Down 50% → $500 million; fully covered; the common has \\(\\$500\\text{M} - \\$300\\text{M} = \\$200\\text{M}\\) left (−71%).
- Down 70% → $300 million, **exactly** enough to cover all three layers; the common is wiped out, and the D layer's coverage is precisely \\(\\dfrac{300}{300} = 1.0\\times\\).
- Down 85% → $150 million, enough only for the convertibles; the F and D layers get nothing (ignoring cash).

The pattern: **losses climb the floor plan from the bottom up.** The common is the first shock absorber and takes all of the early losses. Only once the common is drained does the most junior preferred start to lose, then the next floor up, and debt last of all. So the answer to "who absorbs the loss when bitcoin falls 70%?" is: **the common absorbs nearly all of it, and the junior preferreds stand at the cliff edge.**

Strategy's real numbers (September 2026 snapshot) look strikingly similar. With bitcoin around $84,000, a 70% drop takes it to about $25,200, at which point 846,000 BTC are worth about \\(846{,}000 \\times \\$25{,}200 \\approx \\$21.3\\text{B}\\), against about $21.1 billion of debt plus all preferreds: **coverage on the junior preferreds of about \\(\\dfrac{21.3}{21.1} \\approx 1.01\\times\\).**

But that is only the static answer to "what if we liquidated today, all at once?" A real DAT doesn't get liquidated because bitcoin fell. Its convertibles carry no margin calls, its preferreds have no maturity, and **no term forces a sale because the price dropped** (compare Stage 7.5 and Stage 13.4). In the real world, losses arrive in a different order: mNAV compresses first (the common falls first), issuing stock stops being accretive, the company draws on its USD Reserve and sells bitcoin to pay dividends, preferred prices slip below par, and at worst dividends are suspended. That is when the difference between **cumulative and non-cumulative** really bites (Stage 6.3).

This lesson sits on **Idea ② (balance sheets and claims)**: the order of seniority decides who takes losses first. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice. Every scenario is a hypothetical mechanical calculation, not a forecast.**

**In this lesson we break it into six pieces:**

- **① Method and definitions: the snapshot, the formulas and three easily missed details**
- **② Four scenarios: bitcoin −30%, −50%, −70%, −85%**
- **③ Floor prices: how far bitcoin must fall before each floor starts to lose**
- **④ The real world isn't a liquidation: what form losses take first**
- **⑤ When dividends stop: cumulative, non-cumulative and the chain of dividend stoppers**
- **⑥ The only obligation with a date: convertibles, default and bankruptcy order**
`,

  mechanics: `
### ① Method and definitions: the snapshot, the formulas and three easily missed details

**The snapshot** (mixed dates, all approximate; the company's latest disclosures govern):

<table class="pm">
<tr><th>Floor (most senior to most junior)</th><th>Notional / claim</th><th>Date and source</th></tr>
<tr><td>Bitcoin</td><td>\\(846{,}000\\ \\text{BTC} \\times \\text{about } \\$84{,}000 \\approx \\$71.06\\text{B}\\)</td><td>Holdings: 8-K 2026-09-21; price: 2026-09-25 close about $84,100</td></tr>
<tr><td>Debt (\\(\\$6.71\\text{B converts} + \\text{about } \\$0.04\\text{B other}\\))</td><td>about $6.754B</td><td>10-Q (2026-06-30), unchanged through 2026-09-20</td></tr>
<tr><td>STRF</td><td>$1.284B</td><td>FWP 2026-08-24</td></tr>
<tr><td>STRC</td><td>about $9.32B</td><td>Derived: Aug 23 notional less September buybacks</td></tr>
<tr><td>\\(\\text{STRE} + \\text{STRK} + \\text{STRD}\\) (junior; internal order unverified)</td><td>about $3.70B (about \\(0.9 + 1.4 + 1.4\\))</td><td>STRE 2025-11-28; STRK/STRD 2026-08-07, approximate</td></tr>
<tr><td>USD assets (\\(\\text{USD Reserve } \\$5.04\\text{B} + \\text{USD Cash } \\$1.05\\text{B}\\))</td><td>about $6.09B</td><td>8-K 2026-09-21</td></tr>
</table>

**The formulas** (all from the shared engine, _fin.js):

$$
\\text{BTC Rating (floor } k\\text{)} = \\frac{\\text{bitcoin value}}{\\text{cumulative claims of floors 1 through } k}
\\text{BTC floor price (floor } k\\text{)} = \\frac{\\text{current price}}{\\text{BTC Rating}} = \\frac{\\text{cumulative claims}}{\\text{number of bitcoin}}
\\text{recovery of floor } k = \\min\\!\\left(C_{k},\\ \\max\\!\\left(0,\\ V - \\sum_{j<k} C_{j}\\right)\\right)
\\text{common residual} = \\max\\!\\left(0,\\ V - \\sum_{j} C_{j}\\right)
$$

Here \\(V\\) is the distributable value and \\(C_{j}\\) is the claim of floor \\(j\\). That is the waterfall: distributable value fills floor 1 first, then each floor below; the remainder goes to the common.

Three easily missed details:

- **USD assets in or out.** Strategy's own BTC Rating nets its USD assets against debt, and the $6.09 billion of USD assets almost equals all of its debt. The main table below **excludes** USD assets (the more conservative view), and the results with them included are given separately.
- **Liquidation preference is not notional.** For STRF, STRC, STRE and STRD the liquidation preference is the greater of the trading price and $100. In a stress scenario the trading price is below 100, so $100 applies; but any **cumulative dividend arrears** are added on top, raising that floor's claim (Stage 6.3).
- **The order among the junior preferreds.** Primary documents confirm only that STRE, STRK and STRD rank behind STRF and STRC and ahead of the common; their order relative to each other is unverified. The main table treats the three as one floor (equal ranking, shared pro rata); the demo lets you switch to the STRE → STRK → STRD order implied by a company deck.

### ② Four scenarios: bitcoin −30%, −50%, −70%, −85%

**Strategy (USD assets excluded; $ billions; coverage is the BTC Rating)**

<table class="pm">
<tr><th>Scenario</th><th>BTC price</th><th>Bitcoin value</th><th>Debt coverage</th><th>STRF coverage</th><th>STRC coverage</th><th>Junior coverage</th><th>Liquidation recovery</th><th>Common residual</th></tr>
<tr><td>Snapshot</td><td>84,000</td><td>71.06</td><td>10.5x</td><td>8.8x</td><td>4.1x</td><td>3.4x</td><td>All 100%</td><td>50.0 (base)</td></tr>
<tr><td>−30%</td><td>58,800</td><td>49.74</td><td>7.4x</td><td>6.2x</td><td>2.9x</td><td>2.4x</td><td>All 100%</td><td>28.7 (−43%)</td></tr>
<tr><td>−50%</td><td>42,000</td><td>35.53</td><td>5.3x</td><td>4.4x</td><td>2.0x</td><td>1.7x</td><td>All 100%</td><td>14.5 (−71%)</td></tr>
<tr><td><b>−70%</b></td><td>25,200</td><td>21.32</td><td>3.2x</td><td>2.7x</td><td>1.2x</td><td><b>1.01x</b></td><td>All 100% (barely)</td><td><b>0.26 (−99%)</b></td></tr>
<tr><td>−85%</td><td>12,600</td><td>10.66</td><td>1.6x</td><td>1.3x</td><td>0.61x</td><td>0.51x</td><td>Debt, STRF 100%; STRC 28%; juniors 0%</td><td>0</td></tr>
</table>

With the $6.09 billion of USD assets included, STRC's recovery in the −85% case rises to about **93%**, the juniors still get 0, and in the −70% case the common keeps about $6.35 billion.

**Orange Corp ($30M of cash excluded; $ millions)**

<table class="pm">
<tr><th>Scenario</th><th>Bitcoin value</th><th>Convert coverage</th><th>F coverage</th><th>D coverage</th><th>Liquidation recovery</th><th>Common residual</th></tr>
<tr><td>Snapshot</td><td>1,000</td><td>6.7x</td><td>4.0x</td><td>3.3x</td><td>All 100%</td><td>700 (base)</td></tr>
<tr><td>−30%</td><td>700</td><td>4.7x</td><td>2.8x</td><td>2.3x</td><td>All 100%</td><td>400 (−43%)</td></tr>
<tr><td>−50%</td><td>500</td><td>3.3x</td><td>2.0x</td><td>1.7x</td><td>All 100%</td><td>200 (−71%)</td></tr>
<tr><td><b>−70%</b></td><td>300</td><td>2.0x</td><td>1.2x</td><td><b>1.0x</b></td><td>All 100% (exactly)</td><td><b>0 (−100%)</b></td></tr>
<tr><td>−85%</td><td>150</td><td>1.0x</td><td>0.6x</td><td>0.5x</td><td>Converts 100%; F, D 0%</td><td>0</td></tr>
</table>

The two tables tell the same story:

- **The common is the shock absorber.** Bitcoin down 30% takes the common's residual down about 43%: the amplification of Stage 16.4 (about 1.4x). Down 70%, the common is almost gone.
- **Coverage thins non-linearly.** Stage 16.5 said "4x coverage becomes 1.2x after a 70% drop," and that is exactly what happens to Orange-F; STRC goes from 4.1x to 1.2x.
- **The two structures have a strikingly similar shape.** Strategy's juniors and Orange-D both hit 1x at around −70%, because in both cases \\((\\text{debt} + \\text{preferred}) \\div \\text{bitcoin}\\) is about 30%.

### ③ Floor prices: how far bitcoin must fall before each floor starts to lose

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Each floor's "floor price": the drop from the snapshot at which coverage hits 1x</text><line x1="60" y1="250" x2="600" y2="250" stroke="var(--line)" stroke-width="1.5"/><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="60" y="266">0%</text><text x="222" y="266">−30%</text><text x="330" y="266">−50%</text><text x="438" y="266">−70%</text><text x="519" y="266">−85%</text><text x="600" y="266">−100%</text></g><g stroke="var(--line)" stroke-dasharray="3 3"><line x1="222" y1="40" x2="222" y2="250"/><line x1="330" y1="40" x2="330" y2="250"/><line x1="438" y1="40" x2="438" y2="250"/><line x1="519" y1="40" x2="519" y2="250"/></g><rect x="60" y="70" width="380" height="36" fill="var(--green-soft)"/><text x="70" y="93" font-size="11" font-weight="700" fill="var(--ink)">Strategy (snapshot $84,000)</text><line x1="60" y1="118" x2="600" y2="118" stroke="var(--muted)"/><circle cx="440" cy="118" r="6" fill="var(--btc)"/><text x="440" y="140" text-anchor="middle" font-size="10" fill="var(--btc)">juniors −70%</text><circle cx="468" cy="118" r="6" fill="var(--blue)"/><text x="470" y="108" text-anchor="middle" font-size="10" fill="var(--blue)">STRC −76%</text><circle cx="539" cy="118" r="6" fill="var(--orange)"/><text x="539" y="140" text-anchor="middle" font-size="10" fill="var(--orange-ink)">STRF −89%</text><circle cx="549" cy="118" r="6" fill="var(--ink)"/><text x="566" y="108" text-anchor="middle" font-size="10" fill="var(--ink)">debt −91%</text><circle cx="486" cy="118" r="5" fill="none" stroke="var(--btc)" stroke-width="2"/><circle cx="514" cy="118" r="5" fill="none" stroke="var(--blue)" stroke-width="2"/><rect x="60" y="170" width="380" height="36" fill="var(--green-soft)"/><text x="70" y="193" font-size="11" font-weight="700" fill="var(--ink)">Orange Corp (snapshot $100,000)</text><line x1="60" y1="218" x2="600" y2="218" stroke="var(--muted)"/><circle cx="438" cy="218" r="6" fill="var(--btc)"/><text x="432" y="240" text-anchor="middle" font-size="10" fill="var(--btc)">D −70%</text><circle cx="465" cy="218" r="6" fill="var(--orange)"/><text x="470" y="208" text-anchor="middle" font-size="10" fill="var(--orange-ink)">F −75%</text><circle cx="519" cy="218" r="6" fill="var(--ink)"/><text x="519" y="240" text-anchor="middle" font-size="10" fill="var(--ink)">converts −85%</text><text x="60" y="54" font-size="10" fill="var(--muted)">Green zone: losses the common takes first (every senior floor ≥ 1x)</text><text x="600" y="54" text-anchor="end" font-size="10" fill="var(--muted)">hollow = with $6.09B of USD assets</text></svg><figcaption>Solid dots exclude USD assets: Strategy's juniors about $24,900 (−70%), STRC about $20,500 (−76%), STRF about $9,500, debt about $8,000. With USD assets included, STRC's floor drops to about $13,300 (−84%), matching the roughly $13,400 the company published in August.</figcaption></figure>

Reading the structure by floor price is more intuitive than reading multiples:

- **Strategy's junior preferreds:** about $24,900 (USD assets excluded) / about $17,700 (included).
- **STRC:** about $20,500 / about $13,300. Strategy's published STRC "BTC Floor Price" was about $13,400 on August 23, 2026 (on the holdings and notionals of that date).
- **STRF:** about $9,500 / about $2,300.
- **Debt:** about $8,000 / about $800: the USD assets cover nearly all of the debt.

For comparison: bitcoin's high was about $126,000 on October 6, 2025, and its lowest close was about $58,600 on June 30, 2026 (about −54%). That drawdown didn't reach any floor, yet it was enough to push STRC below par and lead the company to sell bitcoin to pay dividends. **A floor price answers "would I lose in a liquidation?" It can't answer "will this hurt while I hold it?"**

### ④ The real world isn't a liquidation: what form losses take first

Strategy has no debt with mark-to-market margin calls, no bitcoin pledged, and no preferred with a maturity date, so a fall in bitcoin does **not** force a sale. Losses travel down a different chain:

- bitcoin falls → the common falls further (amplification) → mNAV compresses
- → common ATM stops being accretive (Stage 17.1) → preferreds trade below par; issuing costs more
- → dividends paid from the USD Reserve (about 37 months, derived) → bitcoin sold for dividends / buybacks
- → worst case: some dividends suspended (preferred holders bear it) → convertible put dates arrive (cash must be paid)

In 2026 the company actually walked the first links of this chain:

- Bitcoin fell about 54% from its high (lowest close about $58,600 on June 30, 2026); Strategy's mNAV (2026 definition) was about 1.01x in August (Stage 16.2).
- **Selling bitcoin to pay dividends:** 32 BTC (about $2.5 million) sold during May 26–31, 2026 for STRC dividends, the first sale since 2022; 3,588 BTC more (about $216 million, at averages of about $59,256 and $60,773) during June 29 to July 5 for dividends and the reserve; and about 3,328 BTC in late July and early August to fund STRC buybacks. About 6,948 BTC in total in 2026 (derived).
- **STRC below par:** the first buybacks in July averaged about $86.52; the company raised the rate to 12% and switched to supporting the price with buybacks (Stage 17.4).
- **No dividend was suspended:** the company says every dividend has been paid in full and on time since its first preferred, and the USD Reserve grew from $1.44 billion on December 1, 2025 to $5.04 billion on September 20, 2026.

So in the real world, **the first answer to "who takes the loss?" is still the common** (its price falls first, it is diluted by stock sales, and its bitcoin is sold to pay dividends). The second answer is **the preferreds' market price** (it slips below par, and a holder forced to sell locks in the loss). Losses in the liquidation sense come only once a floor is breached.

### ⑤ When dividends stop: cumulative, non-cumulative and the chain of dividend stoppers

Suppose the worst step: the company decides to suspend some preferred dividends. The terms decide how the loss is shared:

<table class="pm">
<tr><th>Series</th><th>Cumulative?</th><th>What happens when payments stop</th><th>Extra "teeth"</th></tr>
<tr><td>STRF</td><td>Yes</td><td>Arrears accrue and compound at \\(\\text{the rate} + 1\\ \\text{point}\\), stepping up each period, capped at 18%</td><td>Board seats after missed payments; no distributions to or buybacks of juniors while arrears remain</td></tr>
<tr><td>STRC</td><td>Yes</td><td>Arrears compound at the applicable rate; no rate cuts while in arrears</td><td>No distributions to juniors while arrears remain</td></tr>
<tr><td>STRE</td><td>Yes</td><td>Same penalty structure as STRF (capped at 18%)</td><td>—</td></tr>
<tr><td>STRK</td><td>Yes</td><td>Arrears accrue (penalty details unverified); dividends can also be paid in MSTR stock</td><td>Board seats after missed payments</td></tr>
<tr><td>STRD</td><td><b>No</b></td><td>Undeclared dividends are <b>lost for good</b></td><td>Only a current-period stopper: if unpaid this period, the common gets nothing and no buybacks this period</td></tr>
<tr><td>Common</td><td>—</td><td>Pays no dividend; no buybacks while any preferred is in arrears</td><td>—</td></tr>
</table>

Dividend stoppers mesh **from the top down**: as long as a more senior floor is in arrears, a more junior one can't be paid. So the rational order of suspension usually **starts at the bottom**: stop STRD first (non-cumulative, so nothing to make up later), then the cumulative juniors (arrears on the books), and protect STRC and STRF as long as possible. For STRD holders, that means they may lose part of their income **permanently** while the structure still shows more than 1x coverage in a liquidation. That is Stage 6.3's "why a non-cumulative preferred needs a higher yield," seen in a real structure.

### ⑥ The only obligation with a date: convertibles, default and bankruptcy order

In the whole building, **only the convertibles carry hard dates**: a series of put dates starting September 15, 2027 (Stage 17.2), with about $5.9 billion puttable by the end of 2028. If the stock is below the conversion prices then and the company can't find the cash, non-payment is a **default**, and only then do we enter the world of Stage 6.6: Chapter 11 reorganization, the absolute priority rule, creditors paid in order.

In that world, this lesson's waterfall is the starting point for recoveries. Debt ranks first, with about 10x coverage excluding USD assets and almost no risk once they're included; **the floors most likely to fall short are STRC and everything below it.** It also explains why Strategy bought back $1.5 billion of its 2029 notes at a discount in May 2026 and set up the USD Cash pool in August: **to make the only hard-dated obligation smaller and further away, or to have the cash ready in advance.**

**The strongest case for:** nothing in the structure forces a sale when the price falls; the common absorbs roughly the first 70% of any decline; the debt is almost fully covered by USD assets; suspending a preferred dividend is not a default, which buys the company time; and through the roughly 54% drawdown of 2026 the company suspended no dividends.

**The strongest case against:** a static waterfall understates time and path. If bitcoin stays low for years and capital markets are shut, roughly $1.6 billion a year of dividends and interest gradually eats the USD Reserve and the bitcoin. A floor price is the number "at the moment of liquidation," and preferred holders can suffer large market-price losses, and for STRD permanent income losses, long before any floor is reached. The order among the junior preferreds isn't fully clear in the documents. And about $5.9 billion of puts cluster in 2027–2028. Stage 18.2 adds a "capital markets closed for 12–24 months" scenario for a full stress test. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "seniority-in-practice",

  analogy: `
Picture the capital structure as **a dam built on bitcoin**. The water in the reservoir is bitcoin's value, and below the dam, in order, lie several villages:

- Closest to the dam is **Debt village**: when water is released, it drinks first.
- Then **STRF village** and **STRC village**, and below them three villages huddled together, **the junior-preferred villages**, whose order hasn't been written down clearly.
- Furthest downstream is **Common town**: it gets whatever flows past once everyone upstream has drunk their fill.

A fall in bitcoin is **the reservoir level dropping**. Lower it a little and the first place to run dry is Common town downstream; the villages upstream don't notice a thing. Lower it to 30% of where it was, and Common town is almost dry while the junior villages have just enough. Lower it further, and the junior villages go short, then STRC village… Debt village is the last to feel thirsty.

But a real dam doesn't release all its water at once. Normally the keeper sends each village a little water every day (the dividends). When the level falls, the keeper first draws on **the spare water tower** (the USD Reserve), then **sells some of the reservoir's water for cash** (bitcoin sales), and if that's not enough, cuts off the most downstream village that "keeps no tab" (STRD) first; the water it missed today will never be sent later.

So ask "who loses first?" twice: **if the reservoir is emptied all at once**, go by the order downstream; **if the drought comes slowly**, look at the keeper's delivery rules and how long the spare tower lasts.
`,

  misconceptions: [
    "**\"If bitcoin falls 70%, every preferred loses money.\"** — On the September 2026 snapshot, with bitcoin down 70%, Strategy's debt and all its preferreds are still (just) covered in a liquidation, and the loss falls almost entirely on the common; the junior preferreds are at about 1.01x, on the edge. Only further down does the loss climb from the most junior floor upward.",
    "**\"If the BTC Rating is above 1x, preferred holders won't lose anything.\"** — The rating measures asset coverage only \"if liquidated right now.\" While you hold, the preferred's market price can fall well below par (STRC buybacks in July 2026 averaged about $86.52), and non-cumulative STRD can lose dividends permanently.",
    "**\"Below some bitcoin price, Strategy gets force-liquidated.\"** — Its debt has no mark-to-market margin terms and no pledged bitcoin, and its preferreds have no maturity. The only hard dates are the convertibles' puts and maturities; losses first show up as mNAV compression, bitcoin sold to pay dividends, and dividend suspensions.",
    "**\"STRE, STRK and STRD are all junior, so they'd be treated the same if dividends stopped.\"** — All three rank behind STRF and STRC, but STRE and STRK are cumulative (arrears go on the books) while STRD is non-cumulative (stopped means gone); and their seniority relative to each other isn't spelled out in the primary documents.",
    "**\"Whether USD assets are counted is a minor detail.\"** — The roughly $6.09 billion of USD assets almost equals all the debt. Counting them or not moves STRC's floor price between about $13,300 and about $20,500, and its liquidation recovery in the −85% case between about 93% and about 28%.",
  ],

  quiz: [
    {
      q: "Orange Corp ($1B of bitcoin; $150M converts, $100M F, $50M D). Bitcoin falls 70% (cash ignored). Which floor takes the loss?",
      options: [
        "The convertibles",
        "The F and D layers pro rata",
        "The D layer loses everything",
        "The common is wiped out; all three layers are exactly covered (D at 1.0x)",
      ],
      answer: 3,
      explain: "Bitcoin is worth $300 million, exactly the sum of the three layers' claims. **The common absorbs the whole $700 million loss**, and D stands at the 1x edge.",
    },
    {
      q: "On the September 2026 snapshot (USD assets excluded), at roughly what bitcoin price does Strategy's STRC coverage fall to 1x?",
      options: [
        "About $20,500",
        "About $8,000",
        "About $58,600",
        "About $42,000",
      ],
      answer: 0,
      explain: "\\(\\text{Floor price} = \\dfrac{\\text{cumulative claims}}{\\text{bitcoin held}} = \\dfrac{\\$6.754\\text{B} + \\$1.284\\text{B} + \\$9.32\\text{B}}{846{,}000} \\approx \\mathbf{\\$20{,}500}\\). With the $6.09B of USD assets included it's about $13,300, in line with the roughly $13,400 the company published in August.",
    },
    {
      q: "Bitcoin falls 30%. Roughly how much does the common's residual value fall, for Strategy or Orange Corp, and why?",
      options: [
        "30%, the same as bitcoin",
        "About 43%, because about 30% of the bitcoin value is taken by senior claims, amplifying the common about 1.4x",
        "Not at all, because the preferreds absorb the loss",
        "100%",
      ],
      answer: 1,
      explain: "The common is the **residual claim**: bitcoin goes from \\(\\$71.06\\text{B} \\to \\$49.74\\text{B}\\), fixed claims of about $21.06B come off the top, and the residual drops from about \\(\\$71.06\\text{B} - \\$21.06\\text{B} = \\$50.0\\text{B}\\) to \\(\\$49.74\\text{B} - \\$21.06\\text{B} \\approx \\$28.7\\text{B}\\), about \\(\\dfrac{28.7}{50.0} - 1 \\approx -43\\%\\). That is the amplification of Stage 16.4.",
    },
    {
      q: "If Strategy decided to suspend some preferred dividends, which series would the logic of dividend stoppers suggest stopping first?",
      options: [
        "STRF",
        "STRC",
        "STRD: non-cumulative, so nothing to make up later, and it ranks last",
        "Interest on the convertibles",
      ],
      answer: 2,
      explain: "Stoppers mesh **from the top down**, so stopping the most junior, non-cumulative STRD costs the company least. Convertible interest is a debt obligation; not paying it is a default, so it isn't on the list of things that can be \"suspended.\"",
    },
    {
      q: "In Strategy's whole capital structure, what is the only obligation with a \"hard date\"?",
      options: [
        "STRC's monthly rate-setting date",
        "The convertibles' put and maturity dates (from September 15, 2027)",
        "The preferreds' liquidation preference",
        "MSCI's index review date",
      ],
      answer: 1,
      explain: "The convertibles are **debt**: failing to pay on a put or maturity date is a default. About $5.9 billion is puttable by the end of 2028 (Stage 17.2). The preferreds have no maturity.",
    },
  ],

  further: [
    { label: "Strategy investor briefing FWP (2026-08-24): BTC Rating, BTC Floor Price and the bridge table", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strategy 8-K (2026-09-21): latest holdings, USD Reserve and STRC buybacks", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526396093/mstr-20260914.htm" },
    { label: "Strategy 8-K (2026-07-06): disclosure of the June–July 2026 bitcoin sales", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526295586/mstr-20260706.htm" },
    { label: "US Courts: Chapter 11 bankruptcy basics (the institutional setting of absolute priority)", url: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics/chapter-11-bankruptcy-basics" },
  ],
};
