export default {
  id: "flywheel-math",
  stage: 16,
  order: 7,
  title: "The Flywheel Math: When Issuing Stock Is Accretive — and When It Destroys Value",
  difficulty: "dat",
  prereqs: ["mnav", "btc-yield-gain"],

  oneLiner:
    "A DAT's \"flywheel\" rests on a single inequality: **issue stock above the bitcoin value per share and buy bitcoin, and existing holders' BTC per share rises; issue below it, and it falls.** Orange Corp selling 10% more shares at $15 (mNAV 1.5) raises BTC per share **4.5%**. But \"bitcoin value per share\" comes gross and net, so there are two dividing lines — $10 gross and $7.30 net — and an issue priced between them produces a negative BTC Yield while Net BTC per share goes up. This lesson derives the lines, shows when preferreds and convertibles add value (bitcoin must beat their cost), how the flywheel accelerates and reverses reflexively, and the mirror-image math of buybacks and coin sales when mNAV is below 1.",

  intuition: `
Back to the coin club of Stage 16.1: a hundred original members, one share each, 0.01 BTC behind every share. A newcomer wants in and is willing to pay **0.015 BTC** for a share — 50% more than the bitcoin behind it.

The club takes the newcomer's money and buys bitcoin with all of it. The newcomer's share carries only the average amount of bitcoin; the extra 50% they paid is **spread across all the original members**. The bitcoin behind each original share has grown out of thin air.

That is the whole secret of the DAT flywheel, in one sentence:

**Issue stock above the bitcoin value per share and buy bitcoin with it → BTC per share rises (accretive); issue below it → BTC per share falls (dilutive).**

"Above the bitcoin value per share" is just another way of saying **mNAV > 1** (Stage 16.2). Orange Corp from Stage 15.1 has $10 of bitcoin behind each share and a $15 share price (mNAV 1.5). It sells 10 million new shares, raises $150M and buys 1,500 BTC: BTC per share goes from 10,000 sats to about 10,455, **+4.5%**. At a share price of only $8 (mNAV 0.8), the same 10 million shares buy just 800 BTC and BTC per share falls **1.8%**. It's Stage 5.5's "issuing above intrinsic value is accretive", specialised to bitcoin.

The lesson refines that simple inequality, because the real world adds four complications:

- **"Bitcoin value per share" has a gross and a net version.** Gross ($10) ignores senior claims; net ($7.30) deducts the converts and preferreds and adds back cash. So there are two dividing lines. With the share price between $7.30 and $10, issuing stock **lowers the gross figure** (BTC Yield is negative) while **raising the net figure** — because the new equity is de-levering the company. Strategy's switch in 2026 to "price ÷ Net BTC per share" as its mNAV definition puts "1.0" exactly on the net line.
- **Preferreds and convertibles are a different flywheel.** Buying bitcoin with preferred money leaves Net BTC per share unchanged at issuance; after that it adds value only if bitcoin's rise **beats the dividend cost**, and subtracts value if it doesn't — what Strategy calls the BTC Hurdle ARR (10.74% on 2026-08-23).
- **The flywheel is reflexive.** Premium → accretive issuance → BTC Yield → better story → bigger premium — and in reverse: premium fades → issuance stops being accretive → BTC Yield slides → premium fades further (Soros's reflexivity, Stage 10.4). Strategy's BTC Yield fell from 74.3% in 2024 and 22.8% in 2025 to 8.1% in H1 2026, in step with its shrinking mNAV.
- **Below mNAV 1 the math mirrors.** Issuing becomes dilutive and **buybacks** become accretive — provided the buyback price is below the bitcoin value per share. But buybacks need cash, cash often means selling coins, and selling coins weakens the preferreds' coverage. Here, for the first time, common and preferred holders' interests pull apart.

This lesson rests on **Idea ② (balance sheets and claims)** — accretion and dilution are transfers of value between new and old claims — and **Idea ④ (risk and leverage)**: the reflexive flywheel is a textbook case of self-reinforcing risk. It ties together the previous six lessons of Stage 16 and leads straight to the ATM mechanics of Stage 17.1 and to "after mNAV compresses" in Stage 18.3. This lesson explains mechanics and analytical frameworks only; it is not investment advice.

**This lesson, in five parts:**

- **① The accretion inequality: when issuing stock raises BTC per share**
- **② Two dividing lines: gross, net and the matching mNAVs**
- **③ Preferreds and convertibles: when borrowed coins add value**
- **④ The reflexive flywheel: how it spins up and how it reverses**
- **⑤ Below mNAV 1: buybacks, coin sales and the mirror-image math**
`,

  mechanics: `
### ① The accretion inequality: when issuing stock raises BTC per share

A company holds B bitcoin and S shares; the bitcoin price is p and the share price P. It issues n shares and spends the whole nP on bitcoin:

$$ New BTC per share = (B + nP ÷ p) ÷ (S + n)
$$ New > old ⇔ P ÷ p > B ÷ S ⇔ P > bitcoin value per share ⇔ mNAV > 1

With issuance fraction x = n ÷ S and mNAV = m, the change in BTC per share has a very clean form (issueAndBuy in _fin.js follows exactly this logic):

$$ Change in BTC per share = (1 + x × m) ÷ (1 + x) − 1

For a 10% issue (x = 0.1):

<table class="pm">
<tr><th>mNAV (gross)</th><th>0.8</th><th>1.0</th><th>1.2</th><th>1.5</th><th>2.5</th><th>4.0</th></tr>
<tr><td>Change in BTC per share</td><td>−1.8%</td><td>0</td><td>+1.8%</td><td><b>+4.5%</b></td><td>+13.6%</td><td>+27.3%</td></tr>
</table>

Where does the value come from? **From the new shareholders to the old.** In Orange Corp's case the company bought 1,500 coins; new holders get 10M ÷ 110M × 11,500 ≈ 1,045 of them and old holders gain about 455 — the BTC Gain of Stage 16.3. New investors accept this because they expect the mNAV to hold and the flywheel to keep turning (or because they're running some other trade, such as convertible arbitrage or option hedging).

Real-world friction: ATM sales carry commissions, and steady selling pressures the share price (Stage 17.1), so the practical dividing line sits a little above mNAV = 1.

### ② Two dividing lines: gross, net and the matching mNAVs

Run the same derivation on **Net** BTC per share (Net Reserve N ÷ shares S, Stage 16.1):

$$ (N + nP) ÷ (S + n) > N ÷ S ⇔ P > N ÷ S = Net BTC per share ⇔ 2026 mNAV > 1

Orange Corp has two lines: **$10 gross** (bitcoin value per share) and **$7.30 net** (Net BTC per share). Which zone the share price sits in decides the nature of the issue:

<figure><svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Orange Corp: issue 10% at different prices — gross vs net BTC per share</text><line x1="40" y1="120" x2="610" y2="120" stroke="var(--ink)"/><rect x="40" y="40" width="175" height="160" fill="var(--red-soft)" opacity=".7"/><rect x="215" y="40" width="102" height="160" fill="var(--orange-soft)" opacity=".7"/><rect x="317" y="40" width="293" height="160" fill="var(--green-soft)" opacity=".7"/><line x1="215" y1="36" x2="215" y2="204" stroke="var(--btc)" stroke-width="2" stroke-dasharray="5 3"/><line x1="317" y1="36" x2="317" y2="204" stroke="var(--blue)" stroke-width="2" stroke-dasharray="5 3"/><text x="215" y="218" text-anchor="middle" font-size="11" font-weight="700" fill="var(--btc)">$7.30: net line</text><text x="317" y="232" text-anchor="middle" font-size="11" font-weight="700" fill="var(--blue)">$10: gross line</text><text x="127" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="var(--red)">Dilutive on both</text><text x="266" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="var(--orange-ink)">Gross down, net up</text><text x="463" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="var(--green)">Accretive on both</text><text x="127" y="150" text-anchor="middle" font-size="10" fill="var(--ink)">Price $5:</text><text x="127" y="165" text-anchor="middle" font-size="10" fill="var(--ink)">gross −4.5%, net −2.9%</text><text x="266" y="150" text-anchor="middle" font-size="10" fill="var(--ink)">Price $8:</text><text x="266" y="165" text-anchor="middle" font-size="10" fill="var(--ink)">gross −1.8%, net +0.9%</text><text x="463" y="150" text-anchor="middle" font-size="10" fill="var(--ink)">Price $15:</text><text x="463" y="165" text-anchor="middle" font-size="10" fill="var(--ink)">gross +4.5%, net +9.6%</text><text x="600" y="136" text-anchor="end" font-size="10" fill="var(--muted)">share price →</text></svg><figcaption>Two lines split the share price into three zones. The middle zone is the easiest to misread: BTC Yield (gross) is negative, yet the new common equity is paying down leverage, so the net bitcoin each share really owns goes up.</figcaption></figure>

Work the $8 case: gross (10,000 + 800) ÷ 110M = 9,818 sats, **−1.8%**; net ($730M + $80M) ÷ 110M = $7.364, **+0.9%**. At $15: net ($730M + $150M) ÷ 110M = $8.00, **+9.6%** — more than the gross +4.5%, because the new equity also dilutes the senior claims per share.

How the definitions line up (Orange Corp, converts out of the money):

- **Market-cap mNAV = 1** (share price $10) ⇔ the gross line on basic shares.
- **BPS on assumed diluted shares** (Strategy's BTC Yield basis) has its line at B × p ÷ (S + convert shares) ≈ **$9.43**.
- **2026 mNAV = 1** (share price $7.30) ⇔ the net line.
- **EV mNAV = 1** also lands at $7.30: then market cap + debt + preferred − cash = bitcoin NAV, so market cap = Net Reserve (Stage 16.2 showed the two measure the same dollar premium).

So when Strategy framed its 2025 issuance guidance on EV mNAV (issuing only "tactically" below 2.5x) and switched in 2026 to price ÷ Net BTC per share, both times it was judging accretion on a "net" basis — while its most-quoted KPI, BTC Yield, is gross. **When you read a DAT's issuance announcement, compute both lines.**

### ③ Preferreds and convertibles: when borrowed coins add value

**Preferreds.** Issue $X at dividend rate r and buy bitcoin with all of it.

- At issuance: bitcoin +X, senior claims +X, **Net BTC per share unchanged** (gross BTC Yield is positive — move C in Stage 16.3).
- A year later, with bitcoin return g: change in Net Reserve = X × g − X × r = **X × (g − r)**.

$$ Buying bitcoin with preferred adds value ⇔ bitcoin's annual return g > dividend cost r

Say Orange Corp issues another $100M of 10% preferred and buys 1,000 BTC. If bitcoin rises 20% in a year, Net Reserve gains $20M − $10M = $10M, or $0.10 per share (**+1.4%**); if bitcoin is flat, −$10M (**−1.4%**); if it falls 20%, −$30M (**−4.1%**). This is Strategy's **BTC Hurdle ARR**: "If BTC ARR is above this rate, Net BTC Per Share … appreciates faster than bitcoin" — **10.74%** on 2026-08-23.

One often-missed detail: **preferreds count as claims at notional but may be sold below notional.** Strategy's STRC has a $100 stated amount and IPO'd at $90; Strive's SATA has a $100 stated amount and IPO'd at $80. Sell at $90 while booking a $100 claim and Net BTC per share **falls** at issuance ($10 less per share of preferred), and the true cost rises from 12% (on notional) to 12 ÷ 90 ≈ 13.3% (on proceeds). That's why Strive committed not to issue new SATA below $100, and why Strategy targets STRC trading around $99–100.

**Convertibles.** A 0% convertible looks free, but its cost is the conversion option it gives away (Stage 6.4, Stage 17.2). Two endings:

- **Share price below the conversion price at maturity:** the company repays principal. If the bitcoin bought with the money rose, the whole gain belongs to the common; if it fell, the company must repay from the reserve, coin sales or refinancing.
- **Share price above the conversion price:** the notes convert, and shares are issued at the conversion price (usually far above the price at issuance) — in effect, "issuing stock later at a higher price".

In May 2026 Strategy repurchased $1.50B of its 2029 convertibles (conversion price $672.40, far out of the money) for $1.38B — retiring debt at 92 cents on the dollar, which is accretive to Net BTC per share.

### ④ The reflexive flywheel: how it spins up and how it reverses

Put ①–③ together and you have the DAT flywheel — and its reverse:

- **Forward:** mNAV premium → accretive issuance to buy bitcoin → positive BTC Yield → better story, active options and convertibles markets → mNAV holds or expands → more accretive issuance.
- **Reverse:** mNAV contracts → the same issuance adds less → BTC Yield slides → weaker story → mNAV contracts further → issuance turns dilutive; dividends must now come from the reserve or coin sales, BTC per share falls, and mNAV is pushed down again.

Compounding repeated issuance: if mNAV stayed at 1.5 and the company issued 10% each round, BTC per share would rise 4.5% per round and 1.0455¹⁰ ≈ **1.56x** after ten rounds. But mNAV doesn't stay put: persistent selling is itself supply, and the premium is granted by the market, not owned by the company (Stage 16.2).

The historical path: in October 2025 Strategy was still tiering issuance at EV mNAV bands of 2.5x and 4.0x; on 2025-11-28 its EV mNAV was 1.2x; on 2026-08-21, on the new definition, about 1.01x. Its BTC Yield over the same stretch: 74.3% in 2024, 22.8% in 2025, 8.1% in H1 2026 and 4.5% year to date at 2026-07-26. By DWF Ventures' count, 16 of the 20 largest DATs traded below 1x mNAV in September 2026. It's a complete demonstration of the reflexivity of Stage 10.4 in one asset class.

**Both sides, fairly:** supporters argue a slowing flywheel isn't a crash — no margin calls, years of reserve, perpetual preferreds (Stage 16.6) — so the company can wait for mNAV to recover and meanwhile keep adding value with preferreds, as long as bitcoin beats their cost. Critics argue the flywheel's fuel is the premium itself; once it's gone, what remains is a levered bitcoin position owing well over a billion dollars a year in dividends, payable only through coin sales or dilution.

### ⑤ Below mNAV 1: buybacks, coin sales and the mirror-image math

Flip ① around: **buy back** n shares at price P, raising the cash by selling nP ÷ p bitcoin:

$$ (B − nP ÷ p) ÷ (S − n) > B ÷ S ⇔ P < bitcoin value per share ⇔ mNAV < 1

Orange Corp at $8 (market-cap mNAV 0.8): sell 800 BTC ($80M) and buy back 10M shares → 9,200 ÷ 90M = 10,222 sats, **+2.2%** gross. And net? Net Reserve $730M − $80M = $650M, ÷ 90M = $7.22, **−1.1%** — because $8 is above the $7.30 Net BTC per share, so on a net basis the buyback "overpaid". And selling 800 coins cuts the F layer's BTC Rating from 4.0x to 9.2 ÷ 2.5 = **3.68x**: **the common's buyback is paid for with the preferreds' coverage.**

That's why a DAT's choices below mNAV 1 aren't simple:

- **Sell bitcoin to buy back common.** Accretive on a net basis only when the price is below **Net BTC per share** (2026 mNAV < 1), and it weakens preferred coverage. Strategy authorised a $1.0B MSTR buyback, unused as of 2026-09-20. ProCap sold about 50 BTC on 2026-09-03 to fund a buyback at roughly a 40% discount to NAV; Satsuma sold its whole 669-BTC treasury, is returning cash to shareholders and is delisting.
- **Buy back preferreds below par.** Buying STRC with a $100 stated amount at $86.52 adds $13.48 to Net Reserve per share retired — accretive to Net BTC per share, and it improves coverage for the remaining preferreds by removing claims. As of 2026-09-20 Strategy had bought back about $1.125B of STRC, with its authorisation raised from $1.0B to $2.0B. The price: the cash comes from coin sales or USD assets, so gross BTC per share falls.
- **Do nothing and wait.** Issue nothing, sell nothing, pay dividends from the reserve (Stage 16.6) and wait for mNAV to recover.

**Bottom line: all the flywheel math compresses into three lines — gross mNAV = 1, net mNAV = 1, and bitcoin return = cost of capital.** Which side of which line the price sits on decides whether each issue, buyback or coin sale creates or destroys per-share value. This lesson explains mechanics and analytical frameworks only; it is not investment advice.
`,

  demo: "flywheel-math",

  analogy: `
Picture a **members' granary**. Each membership card has 10 pounds of grain behind it gross, and 7.3 pounds net once you subtract what the granary owes the next village.

Someone offers 15 pounds of grain for a new card. The granary takes the 15 pounds; the new card gets only an average share, and the surplus is split among the old members. **That's accretive issuance.**

Someone else offers only 8 pounds. Against the gross share (10 pounds), the old members lose. But it's more than the net share (7.3 pounds), and those 8 pounds lower the proportion the granary owes the village — on the net books, the old members actually gain. **Two sets of books, two verdicts.**

A third person offers 5 pounds: both books show a loss.

Now reverse it. When cards trade for 8 pounds, the granary could take grain from the store and buy cards back. On the gross books that's buying cheap, good for the old members. On the net books, 8 pounds is more than 7.3, and the store now holds less grain to secure what it owes the village — **helping one group can hurt another.**

And the fate of the whole granary depends on how much grain people will pay for a card. While enthusiasm runs high, the flywheel spins faster; when it fades, the same mechanism starts turning backwards.
`,

  misconceptions: [
    "**\"As long as the company is issuing stock to buy bitcoin, shareholders benefit.\"** — Only if the issue price is above the bitcoin value per share (mNAV > 1). Issuing 10% at mNAV 0.8 to buy bitcoin cuts BTC per share by about 1.8%.",
    "**\"A negative BTC Yield proves the issue hurt shareholders.\"** — Not necessarily. Orange Corp issuing at $8: gross −1.8%, but $8 exceeds the $7.30 Net BTC per share, so net is +0.9% — the new equity is de-levering the company. Check both lines.",
    "**\"Buying bitcoin with preferreds is always accretive because BTC Yield is positive.\"** — Net BTC per share is unchanged at issuance; it adds value only if bitcoin's annual return beats the dividend cost (Strategy's BTC Hurdle ARR was 10.74% on 2026-08-23). Issued below par, it destroys value on day one.",
    "**\"Below mNAV 1, selling bitcoin to buy back common is always accretive.\"** — On a gross basis, yes; on a net basis only if the price is below Net BTC per share. And coin sales lower the preferreds' BTC Rating — the common's gain may come out of the preferreds' coverage.",
    "**\"Once the flywheel spins, it keeps spinning.\"** — Its fuel is the mNAV premium, and the premium is reflexive. Strategy's BTC Yield fell from 74.3% in 2024 to 8.1% in H1 2026, while its issuance guidance went from mNAV bands of 2.5x and 4x in October 2025 to a new-definition mNAV of about 1.01x in August 2026.",
  ],

  quiz: [
    {
      q: "Orange Corp ($10 of bitcoin per share) issues 10% more shares at $15 and buys bitcoin with all of it. Roughly how much does BTC per share change?",
      options: [
        "+50%",
        "+4.5%",
        "+10%",
        "−1.8%",
      ],
      answer: 1,
      explain: "(1 + x × m) ÷ (1 + x) − 1 = (1 + 0.1 × 1.5) ÷ 1.1 − 1 ≈ **+4.5%**. −1.8% is the mNAV 0.8 case.",
    },
    {
      q: "Orange Corp has $10 of bitcoin per share and $7.30 of Net BTC per share. What happens if it issues 10% at $8 and buys bitcoin?",
      options: [
        "Gross and net both rise",
        "Gross and net both fall",
        "Gross rises, net falls",
        "Gross falls (negative BTC Yield) while net rises",
      ],
      answer: 3,
      explain: "Gross: (10,000 + 800) ÷ 110M = 9,818 sats (−1.8%). Net: ($730M + $80M) ÷ 110M = $7.364 (**+0.9%**). The price sits between the two lines.",
    },
    {
      q: "Orange Corp issues $100M of 10% preferred at par and buys bitcoin. A year later bitcoin is flat. What happened to Net BTC per share?",
      options: [
        "Down about 1.4%: $10M of dividends were paid with no bitcoin gain to offset them",
        "Up 10%",
        "Unchanged",
        "Up about 1.4%",
      ],
      answer: 0,
      explain: "Change in Net Reserve = X × (g − r) = $100M × (0 − 10%) = −$10M; ÷ 100M shares = −$0.10, about **−1.4%**. Bitcoin must beat the 10% cost to add value.",
    },
    {
      q: "Below mNAV 1, when is selling bitcoin to buy back common accretive to **Net** BTC per share?",
      options: [
        "Whenever market-cap mNAV is below 1",
        "When the buyback price is below Net BTC per share (2026 mNAV < 1)",
        "Whenever the bitcoin price is rising",
        "Never",
      ],
      answer: 1,
      explain: "The mirror inequality: (N − nP) ÷ (S − n) > N ÷ S ⇔ **P < N ÷ S**. Orange Corp buying back at $8: gross +2.2%, net −1.1%, because 8 > 7.30.",
    },
    {
      q: "Why does selling preferred below notional (e.g. STRC with a $100 stated amount sold at $90) lower Net BTC per share at issuance?",
      options: [
        "Because the preferred dividend is paid immediately",
        "Because issuing at a discount is illegal",
        "Because Net Reserve deducts the claim at its $100 notional while the company receives only $90",
        "Because the convertibles convert immediately",
      ],
      answer: 2,
      explain: "Net Reserve = BTC Reserve − preferred **notional** + …; take in $90, book $100, lose $10 per share of preferred at once. The true cost also rises from 12% (on notional) to about **13.3%** (on proceeds).",
    },
  ],

  further: [
    { label: "Strategy Q3 2025 earnings release (issuance guidance tiered by mNAV)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312525258690/mstr-ex99_1.htm" },
    { label: "Strategy investor briefing FWP, 2026-08-24 (2026 mNAV, BTC Hurdle ARR)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "CoinTribune: most DATs fall below 1x mNAV in September 2026 (DWF Ventures count)", url: "https://www.cointribune.com/en/crypto-corporate-treasuries-plunge-below-nav-en-masse/" },
    { label: "Options Path (sister course): convertibles and volatility — the option view of a convert as delayed issuance", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
  ],
};
