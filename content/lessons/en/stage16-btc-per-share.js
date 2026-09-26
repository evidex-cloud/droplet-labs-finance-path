export default {
  id: "btc-per-share",
  stage: 16,
  order: 1,
  title: "BTC per Share: The Only Number That Compounds",
  difficulty: "dat",
  prereqs: ["dat-what", "dilution-buybacks"],

  oneLiner:
    "A DAT can post record bitcoin holdings every quarter while your share gets no richer — the company may simply be swapping your equity for coins. The number that belongs to shareholders is **BTC per share**: \\(\\dfrac{\\text{bitcoin held}}{\\text{shares}}\\), usually quoted in sats per share. Orange Corp sits at 10,000 sats/share. This lesson covers the definition, the three ways to count the denominator (basic, assumed diluted, fully diluted), gross versus net, why it is the one scoreboard in the DAT toolkit that can compound — and what it cannot see.",

  intuition: `
Imagine you and ninety-nine friends start a "coin club": together you buy 1 bitcoin, one hundred equal shares. Each share stands for **0.01 BTC**.

A year later the club announces: "Great news — we now own 2 bitcoin!" It sounds as if your wealth doubled. But if the extra coin was paid for by **signing up a hundred new members**, the club now has 2 coins and two hundred shares — and each share still stands for 0.01 BTC. **The club got bigger; you did not get richer.**

Now suppose instead the club signs up only fifty newcomers, but they are so keen that each pays 1.5 times what a share is worth in bitcoin, which buys 0.75 BTC. The club now holds 1.75 BTC across 150 shares: 0.01167 BTC per share. **The bitcoin behind your share rose 16.7%** — and you didn't put in a cent.

That is the number this lesson is about: **BTC per share (BPS)**. It doesn't ask "how much bitcoin does the company own?" It asks "**how much bitcoin stands behind one share?**" For the common shareholder of a digital asset treasury company (DAT), it is the scoreboard that matters most.

Take Orange Corp from Stage 15.1: 10,000 BTC and 100 million common shares, so 0.0001 BTC per share. Bitcoin is a big unit, so people prefer its smallest one, the **sat** (\\(1\\ \\text{BTC} = 100\\ \\text{million sats}\\)): **10,000 sats per share**. At $100,000 per bitcoin, those 10,000 sats are worth $10.

Why call it "**the only number that compounds**"? Because a DAT shareholder's return breaks into three pieces:

- **The bitcoin price** — set by the market; the company can't control it.
- **mNAV**, the multiple of market value over bitcoin NAV — sentiment and expectations; it swings up and down and tends to mean-revert (Stage 16.2).
- **Growth in BTC per share** — the part the company actually **accumulates** through raising capital and buying coins. Once banked, it stays on the balance sheet and grows again next year from a higher base.

The first two oscillate. Only the third stacks up like the compounding of Stage 2.2: grow BTC per share 20% a year and, by the Rule of 72, it doubles in about 3.6 years. That is why Strategy made "BTC Yield" — the growth rate of BTC per share (Stage 16.3) — its headline KPI.

But BTC per share hides two traps, and this lesson takes both apart:

- **The denominator trap.** "Shares" can be counted several ways. Do convertible notes, options and convertible preferreds count? For its BPS, Strategy uses "**Assumed Diluted Shares Outstanding**" — it assumes everything converts, in the money or not. For its newer 2026 metric it switched to "**Fully Diluted Shares Outstanding**" — only in-the-money instruments count. The same Orange Corp is 10,000 sats per basic share but about **9,434 sats** per assumed diluted share.
- **The gross-versus-net trap.** Not all of the company's bitcoin belongs to the common stock. Convertible notes and preferred shares — **senior claims** (Idea ②, the floor plan of Stage 6.1) — sit ahead of it. Subtract them and add back cash, and you get "**net** BTC per share". Orange Corp's net BTC per share is only **7,300 sats** ($7.30).

This lesson rests mainly on **Idea ② (balance sheets and claims)** — BTC per share is really "how much asset stands behind the common's claim" — and it plugs into the compounding of **Idea ① (the price of time)**. It is the per-share value and dilution logic of Stage 5.5, specialised to a bitcoin treasury, and it is the **common foundation** for everything else in Stage 16: mNAV, BTC Yield, amplification and the flywheel.

This lesson explains mechanics and analytical frameworks only; it is not investment advice.

**This lesson, in five parts:**

- **① The definition: BTC per share and sats**
- **② The denominator fight: basic, assumed diluted and fully diluted shares**
- **③ Gross versus net: BTC per share and Net BTC per share**
- **④ Compounding: \\(\\text{price} = \\mathrm{mNAV} \\times \\text{BTC per share} \\times \\text{BTC price}\\)**
- **⑤ What it cannot see: limits and critiques**
`,

  mechanics: `
### ① The definition: BTC per share and sats

The plain definition is one line:

$$ \\text{BTC per share}\\ (\\mathrm{BPS}) = \\frac{\\text{bitcoin held}}{\\text{shares}}
$$ \\mathrm{BPS}\\ (\\text{in sats}) = \\frac{\\text{bitcoin held} \\times 100{,}000{,}000}{\\text{shares}}

Orange Corp: \\(\\dfrac{10{,}000\\ \\text{BTC}}{100\\ \\text{million shares}} = 0.0001\\ \\text{BTC} = \\mathbf{10{,}000}\\ \\text{sats per share}\\). Multiply by the bitcoin price for the bitcoin NAV per share: \\(0.0001 \\times \\$100{,}000 = \\mathbf{\\$10}\\ \\text{per share}\\).

A few real data points (always defer to the company's latest disclosure — these move every week):

<table class="pm">
<tr><th>Company</th><th>Date</th><th>BTC per share</th><th>Denominator</th></tr>
<tr><td>Strategy</td><td>2026-08-21</td><td>188,628 sats (about $145.25) — gross</td><td>about 419.9M fully diluted shares</td></tr>
<tr><td>Strategy</td><td>2026-08-21</td><td>153,637 sats (about $118.31) — net</td><td>same</td></tr>
<tr><td>Strive</td><td>holdings as of 2026-09-18</td><td>26,317 sats per diluted share</td><td>"Assumed Fully Diluted Shares" of 100,144,713 (excludes traditional warrants)</td></tr>
</table>

The two companies differ by a factor of seven in sats per share, and **that says nothing about which is "better"**. The absolute sat count depends on how many shares a company has issued and on any splits or reverse splits — Strive's 1-for-20 reverse split on 2026-02-06 multiplied its sats per share by twenty overnight. To compare companies, look at the **growth rate** of BTC per share (Stage 16.3) and at **how much bitcoin each dollar of stock buys you** — the inverse of mNAV (Stage 16.2) — not at the raw sat count.

Why sats rather than dollars? Because a DAT wants shareholders to keep score **in bitcoin**. Its job is to put more bitcoin behind each share, not more dollars; the dollars mostly come from the bitcoin price, which management does not control.

### ② The denominator fight: basic, assumed diluted and fully diluted shares

The numerator is unambiguous. All the trouble is in the denominator, which comes in at least three flavours:

<table class="pm">
<tr><th>Count</th><th>What it includes</th><th>Who uses it</th><th>Orange Corp</th></tr>
<tr><td><b>Basic shares</b></td><td>Common shares actually issued</td><td>Market-cap mNAV; third-party trackers</td><td>100M → 10,000 sats</td></tr>
<tr><td><b>Assumed Diluted Shares Outstanding</b></td><td>Basic + assumed conversion of <b>all</b> convertible notes and convertible preferred (STRK) + all options, RSUs and PSUs — <b>whether or not in the money</b></td><td>Strategy's BPS and BTC Yield</td><td>\\(100\\text{M} + \\dfrac{\\$150\\text{M}}{\\$25} = 106\\text{M}\\) → about 9,434 sats</td></tr>
<tr><td><b>Fully Diluted Shares Outstanding</b></td><td>Basic + only the <b>in-the-money</b> convertibles and preferred (plus RSUs and PSUs)</td><td>Strategy's 2026 Net BTC per share and new mNAV</td><td>Price $15 &lt; conversion $25, so the converts are out of the money → 100M</td></tr>
</table>

Strategy's official definition of BPS is "the ratio between the Company's gross bitcoin holdings and its Assumed Diluted Shares Outstanding". The key word is *assumed*: **even a convertible that is nowhere near conversion is treated as if it had already turned into stock**.

The logic is **conservatism**: convertibles may become stock one day, so counting them now avoids overstating BTC per share. But it has a quirk. In that one number an out-of-the-money convertible is **treated as shares (it's in the denominator) and not treated as debt (nothing is subtracted from the numerator)**. In reality it can only be one or the other: either it converts (it's equity and never has to be repaid) or it's repaid at maturity (it's debt and never dilutes). That's why, when Strategy introduced Net BTC per share in 2026, it moved to **Fully Diluted Shares**: in-the-money instruments count as shares, out-of-the-money ones count as debt.

Strive uses "Assumed Fully Diluted Shares" and **leaves its traditional warrants out** (their post-reverse-split exercise price is $27). **No two companies define the denominator identically** — whenever you see "BTC per share", the first move is to read the footnote.

Orange Corp's convertible: $150M at a $25 conversion price, convertible into 6 million shares. If the stock rises through $25, the note flips from out of the money to in the money and the fully diluted count jumps from 100M to 106M — **a cliff**, which we meet again with DAT convertibles in Stage 17.2.

### ③ Gross versus net: BTC per share and Net BTC per share

Common stock does not own all of the company's bitcoin. Under the seniority order of Stage 6.1, convertible holders and preferred holders stand **ahead** of it. If the company were wound up today, the common would get "bitcoin minus senior claims plus cash".

In 2026 Strategy introduced **Net BTC** and **Net BTC Per Share**:

$$ \\begin{aligned} \\text{Net Reserve} &= \\text{BTC Reserve} - \\text{notional of OTM converts and other debt-like instruments} \\\\ &\\quad - \\text{preferred notional (excl. in-the-money STRK)} + \\text{USD Assets} \\end{aligned}
$$ \\text{Net BTC per share} = \\frac{\\text{Net Reserve}}{\\text{Fully Diluted Shares}}

Orange Corp (subtract $150M of out-of-the-money converts and $150M of preferred — Orange-F $100M plus Orange-D $50M — then add back the $30M USD reserve):

$$
\\text{Net Reserve} = \\$1.0\\text{B} - \\$150\\text{M} - \\$150\\text{M} + \\$30\\text{M} = \\mathbf{\\$730\\text{M}}
\\text{Net BTC per share} = \\frac{\\$730\\text{M}}{100\\text{M shares}} = \\mathbf{\\$7.30} = \\mathbf{7{,}300}\\ \\text{sats}
$$

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Orange Corp: from BTC per share to Net BTC per share (sats/share)</text><line x1="40" y1="230" x2="610" y2="230" stroke="var(--line)"/><rect x="60" y="50" width="80" height="180" fill="var(--btc-soft)" stroke="var(--btc)" stroke-width="2"/><text x="100" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--btc)">10,000</text><text x="100" y="248" text-anchor="middle" font-size="11" fill="var(--ink)">BTC/share (gross)</text><rect x="175" y="50" width="80" height="27" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="215" y="44" text-anchor="middle" font-size="11" fill="var(--blue)">−1,500</text><text x="215" y="248" text-anchor="middle" font-size="11" fill="var(--ink)">Converts (OTM)</text><rect x="290" y="77" width="80" height="27" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="330" y="71" text-anchor="middle" font-size="11" fill="var(--orange-ink)">−1,500</text><text x="330" y="248" text-anchor="middle" font-size="11" fill="var(--ink)">Preferred F + D</text><rect x="405" y="98" width="80" height="6" fill="var(--green-soft)" stroke="var(--green)"/><text x="445" y="92" text-anchor="middle" font-size="11" fill="var(--green)">+300</text><text x="445" y="248" text-anchor="middle" font-size="11" fill="var(--ink)">USD reserve</text><rect x="520" y="98" width="80" height="132" fill="var(--btc)" opacity=".8"/><text x="560" y="92" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">7,300</text><text x="560" y="248" text-anchor="middle" font-size="11" fill="var(--ink)">Net BTC/share</text><line x1="140" y1="50" x2="175" y2="50" stroke="var(--muted)" stroke-dasharray="3 3"/><line x1="255" y1="77" x2="290" y2="77" stroke="var(--muted)" stroke-dasharray="3 3"/><line x1="370" y1="104" x2="405" y2="104" stroke="var(--muted)" stroke-dasharray="3 3"/><line x1="485" y1="98" x2="520" y2="98" stroke="var(--muted)" stroke-dasharray="3 3"/><text x="320" y="266" text-anchor="middle" font-size="10" fill="var(--muted)">100M shares (fully diluted = basic because the converts are out of the money); BTC at $100k, so 1 sat = $0.001</text></svg><figcaption>Of the 10,000 gross sats, 1,500 are effectively owed to convertible holders and 1,500 to preferred holders; add back 300 sats of cash and the common truly owns 7,300.</figcaption></figure>

Strategy's real figures on 2026-08-21: gross $145.25 per share (188,628 sats), net $118.31 per share (153,637 sats). **The gap is about 19%** — that is the weight of debt and preferreds sitting on each share.

The difference is starkest when a DAT **issues preferred stock**. Say Orange Corp sells $100M of new preferred at par and buys 1,000 BTC. Gross: \\(\\dfrac{11{,}000\\ \\text{BTC}}{100\\text{M shares}} = \\mathbf{11{,}000}\\ \\text{sats}\\), **up 10%**. Net: \\(\\dfrac{\\$1.1\\text{B} - \\$150\\text{M} - \\$250\\text{M} + \\$30\\text{M}}{100\\text{M}} = \\mathbf{\\$7.30}\\) — **unchanged**. The extra bitcoin is exactly offset by the new senior claim. **The gross figure counts borrowed coins as shareholders' coins**; the net figure only starts growing once bitcoin outruns the cost of the preferred (the heart of Stage 16.7).

### ④ Compounding: \\(\\text{price} = \\mathrm{mNAV} \\times \\text{BTC per share} \\times \\text{BTC price}\\)

Decompose the share price and BTC per share's place in shareholder returns becomes obvious:

$$ \\text{Share price} = \\mathrm{mNAV} \\times \\text{BTC per share} \\times \\text{BTC price}
$$ \\text{Orange Corp share price} = 1.5 \\times 0.0001\\ \\text{BTC} \\times \\$100{,}000 = \\$15

(Here mNAV is the market-cap version; switch definitions and you must switch the denominator or use net BTC to match — Stage 16.2 covers this.) Take logs and the product becomes a sum:

$$ \\text{Stock return} \\approx \\text{BTC return} + \\text{growth in BTC per share} + \\text{change in } \\mathrm{mNAV}

(All three are log returns.) Of the three, **the bitcoin price** is external and **mNAV** mean-reverts — in October 2025 Strategy's issuance guidance was still tiered at mNAV bands of 2.5x and above 4.0x; by 2025-11-28 its EV-based mNAV was 1.2x, and on 2026-08-21 its new-definition mNAV was about 1.01x. Only **growth in BTC per share** is banked on the balance sheet. That's why it compounds:

<table class="pm">
<tr><th>Annual BPS growth</th><th>Multiple after 5 years</th><th>Multiple after 10 years</th><th>Doubling time (Rule of 72)</th></tr>
<tr><td>5%</td><td>1.28x</td><td>1.63x</td><td>about 14.4 years</td></tr>
<tr><td>20%</td><td>2.49x</td><td>6.19x</td><td>about 3.6 years</td></tr>
<tr><td>40%</td><td>5.38x</td><td>28.9x</td><td>about 1.8 years</td></tr>
</table>

Strategy's reported BTC Yield — BPS growth on assumed diluted shares — was **74.3%** for FY2024, **22.8%** for FY2025 and **8.1%** for the first half of 2026. The slowdown is exactly what the flywheel math of Stage 16.7 explains: the closer mNAV gets to 1, the less BTC per share each round of issuance can add.

Compounding cuts both ways: **BTC per share can also shrink, and compound its shrinkage**. Strategy sold roughly 6,948 BTC in 2026 to fund dividends and buybacks, and issued common stock to build its USD Reserve; both lower BTC per share. Its reported 2026 year-to-date BTC Yield fell from 8.1% at mid-year to 4.5% as of 2026-07-26.

### ⑤ What it cannot see: limits and critiques

BTC per share is a good scoreboard, but only one of several:

- **Gross BPS ignores senior claims.** Coins bought with preferreds or debt lift gross BPS while saddling shareholders with new claims (see ③). Read in isolation, it can make leverage look like value creation.
- **It ignores the price paid.** A 10% rise in BPS achieved by issuing stock at 3x mNAV is a genuine gain; the same 10% achieved by issuing near 1x plus borrowing is a different animal. It records the **outcome**, not the **cost**.
- **It ignores other assets and businesses.** Strategy still runs a software business (Q2 2026 software revenue of $122.4M); Metaplanet earns option income. None of that is in BTC per share.
- **Denominators are not standardised.** Basic, assumed diluted, fully diluted, "excluding warrants" — align them before comparing companies.
- **It ignores your entry price.** At 10,000 sats per share, buying at $15 versus $8 are two different deals: the first buys 667 sats per dollar, the second 1,250. That is mNAV's territory (Stage 16.2).
- **It ignores sustainability.** BPS growth depends on capital markets being willing to buy stock and preferreds at a premium. When the window shuts — the stress test of Stage 18.2 — it can stall or reverse.

**Bottom line: BTC per share is the foundation, not the building.** It answers "how much bitcoin stands behind my share?" To answer "is the share worth its price?", "how much of that bitcoin really belongs to someone else?" and "can the growth last?", you need the rest of the toolkit: mNAV, amplification, BTC Rating and dividend coverage. This lesson explains mechanics and analytical frameworks only; it is not investment advice.
`,

  demo: "btc-per-share",

  analogy: `
Think of a DAT as a **cooperative grain store** in which every member holds a warehouse receipt.

The store holds more and more grain. Good news? Depends how many receipts were issued. If the grain doubles and the receipts double, each receipt still buys exactly the same amount of grain. **The real question is: how much grain does one receipt get you?** That's BTC per share.

Dig one level deeper. Part of the grain in the store is **borrowed** — 1,500 pounds lent by the next village, and another 1,500 pounds prepaid by people who bought a "first right to collect". The grain sits in the store, but in a wind-down it goes back to them first. So each receipt has 10 pounds of grain behind it gross, but only 7.3 pounds net. That's Net BTC per share.

Then there's a special group: people who lent grain on the condition that "if receipts ever get valuable enough, I can swap my IOU for receipts." When you count receipts, do they count? The cautious bookkeeper (Strategy's "assumed diluted") says: count them all, so we never overstate. The finer bookkeeper ("fully diluted") says: count only those for whom swapping actually pays; treat the rest as IOUs and deduct their grain.

Finally, why does it "compound"? Because each year the store can use members' enthusiasm — newcomers willing to pay 1.5 pounds of grain for a receipt worth 1 pound — to put a little more grain behind every receipt. What's banked this year earns again next year. But enthusiasm fades: once people will only pay 0.8 pounds for a receipt, issuing more receipts means **handing away** the old members' grain.
`,

  misconceptions: [
    "**\"Record bitcoin holdings mean shareholders are winning.\"** — Total holdings can be built by issuing unlimited stock. Shareholders own the bitcoin behind each share; double the coins and double the shares, and BTC per share hasn't moved.",
    "**\"The company with more sats per share is the better one.\"** — The raw sat count depends on share count, splits and reverse splits (Strive's 1-for-20 reverse split multiplied its figure by twenty). Compare growth rates of BTC per share, and how much bitcoin a dollar of stock buys (the inverse of mNAV).",
    "**\"Issuing preferred to buy bitcoin raised BTC per share 10%, so shareholders own 10% more bitcoin.\"** — That's the gross figure. The new coins are offset by the new senior claim, so Net BTC per share is unchanged at issuance; it grows only if bitcoin outruns the preferred's dividend cost.",
    "**\"There is one way to count diluted shares.\"** — Strategy's BPS uses Assumed Diluted Shares (every convertible, in the money or not); its Net BTC per share uses Fully Diluted Shares (in the money only); Strive excludes its traditional warrants. Check the denominator before the number.",
    "**\"BTC per share only goes up.\"** — Selling bitcoin to pay dividends, issuing stock below net value, or issuing stock to top up a USD reserve all lower it. Strategy's 2026 year-to-date BTC Yield slipped from 8.1% at mid-year to 4.5% by 2026-07-26.",
  ],

  quiz: [
    {
      q: "Orange Corp holds 10,000 BTC and has 100M common shares plus $150M of convertibles with a $25 conversion price. Using Strategy's Assumed Diluted Shares, roughly how many sats per share is that?",
      options: [
        "10,000 sats",
        "7,300 sats",
        "About 9,434 sats",
        "15,000 sats",
      ],
      answer: 2,
      explain: "Assumed diluted shares treat every convertible as converted, in the money or not: \\(\\dfrac{\\$150\\text{M}}{\\$25} = 6\\text{M}\\) shares, 106M in total. \\(\\dfrac{10{,}000\\ \\text{BTC}}{106\\text{M}} = 0.00009434\\ \\text{BTC} \\approx \\mathbf{9{,}434}\\ \\text{sats}\\).",
    },
    {
      q: "What denominator does Strategy's 2026 Net BTC per share use?",
      options: [
        "Fully Diluted Shares: only in-the-money convertibles are counted as shares",
        "Basic shares: issued common stock only",
        "Assumed Diluted Shares: every convertible, in the money or not",
        "Free float: excluding insider holdings",
      ],
      answer: 0,
      explain: "\\(\\text{Net BTC per share} = \\dfrac{\\text{Net Reserve}}{\\textbf{Fully Diluted Shares}}\\). Out-of-the-money convertibles are deducted as debt in the numerator, so they are not also counted as shares — no double counting.",
    },
    {
      q: "Orange Corp issues $100M of new preferred at par and buys 1,000 BTC at $100,000. At the moment of issuance, which is true?",
      options: [
        "Gross and net BTC per share both rise 10%",
        "Gross BTC per share rises 10%; Net BTC per share is unchanged",
        "Gross is unchanged; net falls 10%",
        "Neither changes",
      ],
      answer: 1,
      explain: "Gross: \\(\\dfrac{11{,}000\\ \\text{BTC}}{100\\text{M shares}} = 11{,}000\\ \\text{sats}\\) (+10%). Net: the extra $100M of bitcoin is exactly offset by the new $100M senior claim, so **Net BTC per share stays at $7.30**.",
    },
    {
      q: "\\(\\text{Share price} = \\mathrm{mNAV} \\times \\text{BTC per share} \\times \\text{BTC price}\\). Why is BTC per share the only term that compounds?",
      options: [
        "Because the bitcoin price always rises",
        "Because mNAV can't legally fall below 1",
        "Because regulators guarantee BTC per share",
        "Because it's the increment the company banks on its balance sheet, which then grows from a higher base; the BTC price is external and mNAV mean-reverts",
      ],
      answer: 3,
      explain: "The market sets the bitcoin price and mNAV swings with sentiment; only growth in BTC per share **accumulates**. It can also shrink cumulatively through coin sales or issuance at a discount.",
    },
    {
      q: "On 2026-08-21 Strategy reported gross BTC per share of about $145.25 and Net BTC per share of about $118.31. What does the gap mainly represent?",
      options: [
        "The value of the software business",
        "Bitcoin not yet recorded on the books",
        "Out-of-the-money convertible and preferred notional per share, net of USD assets",
        "Intraday bitcoin price noise",
      ],
      answer: 2,
      explain: "\\(\\text{Net Reserve} = \\text{BTC Reserve} - \\text{OTM debt} - \\text{preferred notional} + \\text{USD Assets}\\). The roughly 19% gap is the weight of **senior claims** per share — the balance-sheet view of Idea ②.",
    },
  ],

  further: [
    { label: "Strategy: official KPI definitions and live data for BTC Yield and BPS (always check the latest disclosure)", url: "https://www.strategy.com/" },
    { label: "Strategy Q2 2026 10-Q (KPI definitions and Assumed Diluted Shares)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000105044626000044/mstr-20260630.htm" },
    { label: "Strategy investor briefing FWP, 2026-08-24 (Net BTC per share, Fully Diluted Shares)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strive treasury dashboard (sats per share and its share-count basis)", url: "https://strive.com/treasury" },
    { label: "BitcoinTreasuries.net: public-company bitcoin holdings", url: "https://bitcointreasuries.net/" },
  ],
};
