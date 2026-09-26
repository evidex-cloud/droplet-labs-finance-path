export default {
  id: "amplification",
  stage: 16,
  order: 4,
  title: "Amplification: How Debt & Preferreds Lever Up BTC per Share",
  difficulty: "dat",
  prereqs: ["mnav", "position-sizing"],

  oneLiner:
    "Convertibles and preferreds are **fixed-dollar** claims: when bitcoin moves, they don't, so the whole move lands on the common stock — that's **amplification**. Strategy's official definition is Amplification = BTC Reserve ÷ Net Reserve; for Orange Corp, 10 ÷ 7.3 ≈ **1.37x** (the simple version that ignores cash gives 1.43x). Strive's \"Amplification Ratio\" is a different formula: (debt + preferred) ÷ bitcoin value, or **30%** for Orange Corp. This lesson covers the three versions, why amplification rises by itself in a drawdown, the crucial difference in path dependence between fixed claims and constant leverage, and the price of amplification.",

  intuition: `
You buy a $1 million house with $300,000 down and a $700,000 mortgage. The house rises 10% to $1.1 million; the mortgage is still $700,000, so your equity goes from $300,000 to $400,000 — **up 33%**. If the house falls 10%, your equity drops from $300,000 to $200,000 — **down 33%**. The mortgage is a fixed amount, so every move in the house price lands on your slice, **amplified** 3.3 times.

A digital asset treasury company (DAT) does the same thing, with convertibles and preferreds in place of the mortgage and bitcoin in place of the house.

Orange Corp from Stage 15.1 holds $1.0B of bitcoin, with $150M of convertibles and $150M of preferreds on top (both fixed amounts) and $30M of cash. The "Net Reserve" the common truly owns is $1.0B − $0.15B − $0.15B + $0.03B = **$730M**. If bitcoin rises 10% (+$100M), Net Reserve becomes $830M — **up 13.7%**, exactly **1.37 times** the 10%. That 1.37 is Strategy's official **Amplification**: BTC Reserve ÷ Net Reserve = 10 ÷ 7.3.

Strategy frames this almost as a slogan: the common is "amplified bitcoin", the preferreds are "bitcoin-backed credit". Strive's dashboard literally calls ASST "The Amplified Bitcoin Exposure Equity". **One pile of bitcoin is cut into two kinds of risk**: the preferreds take a stable slice (fixed dividends, paid first) and the common takes all the remaining volatility — the floor plan of Stage 6.1, Idea ②.

Three points in this lesson matter more than the number 1.37:

- **One word, three formulas.** The simple version ignoring cash gives 1.43x; Strategy's official version gives 1.37x; Strive's "Amplification Ratio" is a **percentage**: (debt + preferred) ÷ bitcoin value = 30%. When you see "amplification", ask for the formula first.
- **Amplification isn't constant.** Because the claims are fixed, when bitcoin **falls** Net Reserve falls faster, and amplification **rises by itself**: halve bitcoin and Orange Corp's amplification climbs from 1.37 to about 2.17; double it and it drops to about 1.16. Exactly like a mortgage — as the house falls, your leverage rises.
- **Fixed claims aren't the same as constant leverage.** A fund that rebalances daily to stay at 1.37x suffers **volatility drag** in choppy markets (Stage 11.4). A balance sheet with fixed claims that never rebalances depends, ignoring dividends, **only on the final bitcoin price**. But the moment a company adds preferreds after a rally and sells coins to buy them back after a fall, it becomes a buy-high, sell-low rebalancer again.

The lesson rests on **Idea ④ (risk and leverage)** — amplification is just another name for leverage — and on **Idea ②**, since it's set by the size of the fixed claims on the balance sheet. It builds on the mNAV of Stage 16.2 (2026 mNAV − 1 equals EV mNAV − 1 times amplification) and feeds the BTC Rating of Stage 16.5 (the same floor plan, seen from the creditor's side) and Stage 17.5 (comparing Strive's and Strategy's amplification structures). This lesson explains mechanics and analytical frameworks only; it is not investment advice.

**This lesson, in five parts:**

- **① The arithmetic of fixed claims: why the common is amplified**
- **② Three formulas: the simple version, Strategy's official one and Strive's Amplification Ratio**
- **③ Amplification isn't constant: bitcoin falls, amplification rises**
- **④ Path dependence: fixed claims, constant leverage and buying high, selling low**
- **⑤ The cost of amplification, and what it can't see**
`,

  mechanics: `
### ① The arithmetic of fixed claims: why the common is amplified

Let V be the value of the bitcoin, C the fixed senior claims (out-of-the-money converts plus preferred notional) and U the USD assets. The common's Net Reserve is N = V − C + U. When bitcoin moves by ΔV, C and U stay put, so:

$$ ΔN ÷ N = (ΔV ÷ V) × (V ÷ N)
$$ Amplification = V ÷ N = BTC Reserve ÷ Net Reserve

Orange Corp: V = $1.0B, C = $300M, U = $30M, N = $730M, amplification = **1.37**.

<table class="pm">
<tr><th>Bitcoin move</th><th>Bitcoin value</th><th>Net Reserve</th><th>Change in Net Reserve</th><th>Multiple</th></tr>
<tr><td>+10%</td><td>$1.1B</td><td>$830M</td><td>+13.7%</td><td>1.37</td></tr>
<tr><td>−10%</td><td>$0.9B</td><td>$630M</td><td>−13.7%</td><td>1.37</td></tr>
<tr><td>+100%</td><td>$2.0B</td><td>$1.73B</td><td>+137%</td><td>1.37 (from the start)</td></tr>
<tr><td>−50%</td><td>$0.5B</td><td>$230M</td><td>−68.5%</td><td>1.37 (from the start)</td></tr>
</table>

Note "from the start": for **any single** move, the percentage change in Net Reserve = starting amplification × percentage change in bitcoin — it's linear. But the amplification at the end is different (see ③).

Compared with the margin account of Stage 7.5, DAT leverage has one fundamental difference: **no margin calls**. The preferreds are perpetual and not secured by bitcoin (Strategy's briefing says plainly that no bitcoin is pledged to them); the convertibles are unsecured, with fixed maturity or put dates. If bitcoin halves, nobody can force the company to sell its coins. The leverage hasn't gone away; it has changed from a hair trigger into a slow squeeze (Stage 6.5).

### ② Three formulas: the simple version, Strategy's official one and Strive's Amplification Ratio

<table class="pm">
<tr><th>Version</th><th>Formula</th><th>Orange Corp</th><th>Real values</th></tr>
<tr><td><b>Simple</b> (ignores cash)</td><td>BTC exposure ÷ (BTC − senior claims)</td><td>10 ÷ (10 − 3) ≈ <b>1.43x</b></td><td>—</td></tr>
<tr><td><b>Strategy's official Amplification</b></td><td>"the Company's BTC Reserve divided by its Net Reserve"; Net Reserve = BTC Reserve − OTM debt notional − preferred notional (excluding ITM STRK) + USD Assets</td><td>10 ÷ 7.3 ≈ <b>1.37x</b></td><td>2026-08-23: $64.718B ÷ $49.683B = <b>1.30x</b>; 2026-08-10: 1.47x</td></tr>
<tr><td><b>Strive's "Amplification Ratio"</b></td><td>(Debt + preferred notional) ÷ bitcoin market value</td><td>3 ÷ 10 = <b>30%</b></td><td>Holdings as of 2026-09-18: $1.12B ÷ $2.22B = <b>50.4%</b></td></tr>
</table>

Some notes:

- **Strategy's official version nets out USD Assets** (Reserve plus USD Cash), so it runs below the simple version. Between 2026-08-10 and 08-23 its amplification fell from 1.47x to 1.30x, mainly because roughly $2B of common-stock proceeds that week went into USD Assets (a $5.10B USD Reserve plus a newly created $1.59B USD Cash pool), enlarging Net Reserve. **Issuing common to hold cash lowers amplification** — the flip side of Stage 16.3's point that issuing to hold cash lowers BTC Yield.
- **In-the-money converts don't amplify.** They will most likely convert; they are equity, not fixed claims, so Strategy doesn't deduct them from Net Reserve (and counts them in Fully Diluted Shares instead).
- **Strive's ratio is a percentage, not a multiple.** You can translate roughly: ignoring cash, Strategy-style multiple ≈ 1 ÷ (1 − Strive ratio). Orange Corp: 1 ÷ 0.7 = 1.43; Strive: 1 ÷ (1 − 0.504) ≈ 2.0. Adding back Strive's cash ($229.6M) and its STRC holding ($49.75M), its net treasury assets (NTAV) are about $1.38B, so a Strategy-style multiple is about 2.22 ÷ 1.38 ≈ **1.61x** (derived). Strive also reports "Leverage 0.0%" (debt ÷ bitcoin value), "Amplification Source: 100% SATA" and "Unencumbered BTC: 100%" — all its amplification comes from preferred stock, none from debt (Stage 17.5).

**One word, three numbers: 1.43, 1.37, 30%.** Convert to a common formula before comparing companies.

### ③ Amplification isn't constant: bitcoin falls, amplification rises

Write amplification as a function of the bitcoin price (Orange Corp: fixed claims $300M, cash $30M, 10,000 BTC):

$$ Amplification(P) = 10,000 × P ÷ (10,000 × P − $270M)

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Orange Corp: amplification vs the bitcoin price (Strategy definition)</text><line x1="70" y1="230" x2="615" y2="230" stroke="var(--line)"/><line x1="70" y1="50" x2="70" y2="230" stroke="var(--line)"/><text x="62" y="234" text-anchor="end" font-size="10" fill="var(--muted)">1.0</text><text x="62" y="189" text-anchor="end" font-size="10" fill="var(--muted)">2.0</text><text x="62" y="144" text-anchor="end" font-size="10" fill="var(--muted)">3.0</text><text x="62" y="99" text-anchor="end" font-size="10" fill="var(--muted)">4.0</text><text x="62" y="54" text-anchor="end" font-size="10" fill="var(--muted)">5.0</text><line x1="70" y1="185" x2="615" y2="185" stroke="var(--line)" stroke-dasharray="2 4"/><line x1="70" y1="140" x2="615" y2="140" stroke="var(--line)" stroke-dasharray="2 4"/><line x1="70" y1="95" x2="615" y2="95" stroke="var(--line)" stroke-dasharray="2 4"/><line x1="76" y1="45" x2="76" y2="230" stroke="var(--red)" stroke-dasharray="4 3"/><text x="82" y="44" font-size="10" fill="var(--red)">About $27k: Net Reserve = 0, amplification → ∞</text><polyline points="97.8,56.4 100.9,78.1 116.3,136.4 147.1,177.4 178,193.1 239.7,207.1 301.4,213.4 455.7,220.1 610,223" fill="none" stroke="var(--btc)" stroke-width="2.5"/><circle cx="147.1" cy="177.4" r="4" fill="var(--red)"/><text x="155" y="172" font-size="11" fill="var(--ink)">$50k: 2.17x</text><circle cx="301.4" cy="213.4" r="4" fill="var(--orange)"/><text x="301" y="204" font-size="11" fill="var(--ink)">$100k: 1.37x</text><circle cx="610" cy="223" r="4" fill="var(--green)"/><text x="604" y="214" text-anchor="end" font-size="11" fill="var(--ink)">$200k: 1.16x</text><text x="85" y="250" font-size="10" fill="var(--muted)">$25k</text><text x="290" y="250" font-size="10" fill="var(--muted)">$100k</text><text x="590" y="250" font-size="10" fill="var(--muted)">$200k</text><text x="340" y="270" text-anchor="middle" font-size="11" fill="var(--ink)">Bitcoin price</text></svg><figcaption>Fixed claims make amplification accelerate in a drawdown: from $100k to $50k, amplification climbs from 1.37x to 2.17x; at $30k it is about 10x; below roughly $27k the common's Net Reserve is gone. In a rally it drifts down toward 1.</figcaption></figure>

That's "leverage is highest at the worst moment": every step down makes the common more sensitive to the next step. Strategy's behaviour around the 2026 low (a closing low of about $58,600 on 2026-06-30), when it began selling bitcoin and then buying back STRC, amounted to actively pulling amplification back down after it had risen passively.

The reverse holds in a rally: amplification drifts lower on its own. A company that wants to keep amplification steady must **add** preferreds or debt as bitcoin rises. Strategy's stated aim is to sell Digital Credit (preferreds) equal to 10%–20% of its BTC Reserve per year when market conditions are attractive — a policy of re-levering as the asset grows.

### ④ Path dependence: fixed claims, constant leverage and buying high, selling low

Compare three kinds of "1.37x bitcoin" on one simple path: bitcoin rises 50%, then falls 33.3%, **ending where it began**.

<table class="pm">
<tr><th>Structure</th><th>After +50%</th><th>After −33.3%</th><th>Result</th></tr>
<tr><td><b>A. Fixed claims, no rebalancing</b> (static DAT, dividends ignored)</td><td>Net Reserve $730M → $1.23B (amplification falls to 1.22)</td><td>$1.23B → $730M</td><td><b>Back to start: 0%</b></td></tr>
<tr><td><b>B. Rebalanced each period to 1.37x</b> (leveraged-fund style)</td><td>× (1 + 1.37 × 50%) = × 1.685</td><td>× (1 − 1.37 × 33.3%) = × 0.543</td><td><b>About −8.5%</b></td></tr>
<tr><td><b>C. A DAT that actively holds 1.37x</b>: issues $185M of preferred at the top to buy bitcoin, sells coins to buy it back at the bottom</td><td>Bitcoin $1.685B, claims $485M, Net Reserve $1.23B</td><td>Bitcoin $1.123B − $485M + $30M = $668M</td><td><b>About −8.5%, same as B</b></td></tr>
</table>

The conclusion is clean:

- **Fixed claims create no volatility drag by themselves.** Without rebalancing, Net Reserve = final bitcoin value − fixed claims + cash; it depends only on the final price, not on the path (ignoring dividends).
- **"Holding amplification steady" is what creates drag.** Levering up after rallies and down after falls is buying high and selling low, with a long-run cost of roughly ½ × L × (L − 1) × σ² (the volatility drag of Stage 11.4): with L = 1.37 and 45% annual bitcoin volatility, about **5.1% a year**.
- **Dividends are a second, steady drag.** Orange Corp's $15M a year is about **2.1% a year** of its $730M Net Reserve; paid by selling coins, it also "sells at the lows" in a drawdown (Stage 16.6).

So to know which kind of "amplified bitcoin" a DAT's common really is, look at its **behaviour**. Does it issue preferreds only at high mNAV and sit tight in drawdowns (close to A), or mechanically hold a target leverage (close to B/C)? Strategy's sale of about 6,948 BTC in 2026 and roughly $1.1B of STRC buybacks by September was de-levering after a fall — protective for the preferreds, but for the common it locked in part of the loss at lower prices.

### ⑤ The cost of amplification, and what it can't see

**The cost.** Amplification isn't free. Preferred dividends of 8%–12% a year (STRC at 12% since 2026-07-01, SATA at 13%) are a hurdle bitcoin must clear. Strategy expresses this as **BTC Hurdle ARR**: "Strategy's current effective cost of credit. If BTC ARR is above this rate, Net BTC Per Share … appreciates faster than bitcoin" — **10.74%** on 2026-08-23 (the exact formula hasn't been published). If bitcoin compounds below that rate, amplification is **subtracting** from Net BTC per share, not adding (Stage 16.7).

**What it can't see:**

- **mNAV amplification.** Amplification describes the balance sheet: how Net Reserve responds to bitcoin. The **share price**'s response also layers on changes in mNAV — expanding in bull markets, contracting in bear markets — so the stock's real-world "amplification" is often far above the balance sheet's 1.3x.
- **Maturity.** Convertibles have put dates (Strategy's 2028 notes have a first holder put on 2027-09-15 for $1.01B of principal); perpetual preferreds don't. Amplification treats them identically.
- **In-the-money versus out-of-the-money flips.** When the stock crosses a conversion price, a convertible turns from fixed claim into equity and amplification jumps.
- **Different formulas at different companies.** Strategy's multiple and Strive's percentage aren't directly comparable, and third-party sites may use yet another.

**Bottom line: amplification tells you how sensitive the common is to bitcoin, not whether that sensitivity is worth its cost.** For that you need the BTC Rating of Stage 16.5 (how safe the preferreds are), the dividend coverage of Stage 16.6 (whether the cost can be paid) and the flywheel math of Stage 16.7 (when it adds value). This lesson explains mechanics and analytical frameworks only; it is not investment advice.
`,

  demo: "amplification",

  analogy: `
Imagine you and a friend buy a fishing boat for $1 million. You put in $730,000; your friend puts in $270,000 — but doesn't want a share of the boat, only a **fixed IOU**: some interest each year, and $270,000 back one day.

In a good year for fish prices the boat is worth $1.1 million. The IOU is still $270,000, so your stake goes from $730,000 to $830,000 — up 13.7%, a third more than the boat itself. In a bad year it works in reverse. **Your friend takes the stability; you take the swings.** That's amplification.

Now think of two ways to run the boat:

- One is to **leave it alone**: the IOU stays at $270,000, and however the boat's value wanders, in the end you get "boat value minus $270,000". The ups and downs along the way don't change the destination.
- The other is to **always keep the same ratio**: when the boat's value rises, borrow a bit more from your friend and add a dinghy; when it falls, sell a dinghy to pay down the IOU. It sounds diligent, but it's **buying after rises and selling after falls** — losing a little on every round trip.

And the interest on your friend's IOU is the rent you pay for amplification: in a year when fish prices don't rise by more than the interest, amplification is losing you money.
`,

  misconceptions: [
    "**\"Amplification is a fixed number, like 1.37x.\"** — It moves with the bitcoin price. With fixed claims, amplification rises when bitcoin falls (about 2.17x for Orange Corp if bitcoin halves) and falls when bitcoin rises (about 1.16x if it doubles).",
    "**\"Strive's 50.4% Amplification Ratio and Strategy's 1.30x Amplification are the same kind of number.\"** — Strive's is (debt + preferred) ÷ bitcoin value, a percentage; Strategy's is BTC Reserve ÷ Net Reserve, a multiple. Ignoring cash, multiple ≈ 1 ÷ (1 − ratio).",
    "**\"Any leverage means volatility drag.\"** — With fixed claims and no rebalancing, Net Reserve depends only on the final bitcoin price (ignoring dividends); there's no drag. Drag comes from rebalancing to a target leverage — buying high, selling low — and from ongoing dividends.",
    "**\"DAT leverage is as dangerous as a margin account.\"** — DAT preferreds are perpetual and unsecured, the converts are unsecured, and there are no margin calls, so a crash can't trigger forced liquidation. The risk becomes chronic instead: thinner coverage, dividends draining reserves, put dates approaching.",
    "**\"Amplification is 1.3x, so the share price moves 1.3x bitcoin.\"** — That's only the balance sheet's sensitivity. The share price also carries mNAV expansion and contraction, so real moves are often far larger than 1.3x.",
  ],

  quiz: [
    {
      q: "Orange Corp: $1.0B of bitcoin, $150M out-of-the-money converts, $150M preferred, $30M USD reserve. What is amplification on Strategy's official formula?",
      options: [
        "About 1.37x",
        "About 1.43x",
        "30%",
        "About 1.77x",
      ],
      answer: 0,
      explain: "Amplification = BTC Reserve ÷ Net Reserve = 10 ÷ (10 − 1.5 − 1.5 + 0.3) = 10 ÷ 7.3 ≈ **1.37x**. 1.43x is the simple version without cash, 30% is Strive's ratio, 1.77 is EV mNAV.",
    },
    {
      q: "Strive reports an Amplification Ratio of 50.4%. What is its formula?",
      options: [
        "BTC Reserve ÷ Net Reserve",
        "Market cap ÷ bitcoin value − 1",
        "(Debt + preferred notional) ÷ bitcoin market value",
        "Annual dividends ÷ BTC Reserve",
      ],
      answer: 2,
      explain: "Strive: (debt + SATA notional) ÷ bitcoin market value = $1.12B ÷ $2.22B = **50.4%**. It's a percentage and a different formula from Strategy's multiple.",
    },
    {
      q: "Bitcoin falls from $100,000 to $50,000. What is Orange Corp's amplification now (fixed claims $300M, cash $30M)?",
      options: [
        "Still 1.37x",
        "About 0.68x",
        "About 1.16x",
        "About 2.17x",
      ],
      answer: 3,
      explain: "Bitcoin is worth $500M and Net Reserve is $500M − $300M + $30M = $230M, so amplification = 500 ÷ 230 ≈ **2.17x**. Fixed claims make leverage rise on its own in a drawdown.",
    },
    {
      q: "Bitcoin rises 50% then falls 33.3%, ending where it started. For a DAT with fixed claims that never rebalances (dividends ignored), where does the common's Net Reserve end up?",
      options: [
        "Back where it started, because Net Reserve depends only on the final bitcoin price",
        "Down about 8.5% because of volatility drag",
        "Up about 8.5%",
        "At zero",
      ],
      answer: 0,
      explain: "Net Reserve = final bitcoin value − fixed claims + cash, independent of the path. The −8.5% outcome belongs to a structure **rebalanced to 1.37x each period** — buying high and selling low is what creates drag.",
    },
    {
      q: "Between 2026-08-10 and 08-23, Strategy's amplification fell from 1.47x to 1.30x. What was the main reason?",
      options: [
        "Bitcoin doubled",
        "Roughly $2B of common-stock proceeds that week went into USD Assets, enlarging Net Reserve",
        "All convertibles converted",
        "Strategy switched to Strive's formula",
      ],
      answer: 1,
      explain: "Net Reserve = BTC Reserve − OTM debt − preferred + **USD Assets**. A $5.10B USD Reserve plus the new $1.59B USD Cash pool lifted Net Reserve, so amplification fell.",
    },
  ],

  further: [
    { label: "Strategy investor briefing FWP, 2026-08-24 (Amplification, Net Reserve, BTC Hurdle ARR)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strive treasury dashboard (Amplification Ratio, Leverage and SATA)", url: "https://strive.com/treasury" },
    { label: "Strategy: live amplification and credit metrics (always check the latest disclosure)", url: "https://www.strategy.com/" },
    { label: "U.S. SEC: investor alert on leveraged and inverse ETFs (daily rebalancing and path dependence)", url: "https://www.sec.gov/investor/pubs/leveragedetfs-alert.htm" },
  ],
};
