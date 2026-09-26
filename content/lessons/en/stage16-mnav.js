export default {
  id: "mnav",
  stage: 16,
  order: 2,
  title: "mNAV: Market Value vs Bitcoin NAV — Premiums, Discounts & Its Several Definitions",
  difficulty: "dat",
  prereqs: ["btc-per-share", "valuation"],

  oneLiner:
    "mNAV asks: **how much is the market paying for each $1 of bitcoin inside the company?** Simple in words — but whether the numerator is market cap or enterprise value, and whether the denominator is all the bitcoin or the bitcoin left after senior claims, changes the answer a lot. The same Orange Corp is **1.50** on market cap, **1.59** diluted, **1.77** on enterprise value (Strategy's 2025 definition) and **2.05** as \\(\\text{price} \\div \\text{Net BTC per share}\\) (Strategy's 2026 definition). This lesson covers each formula, real values and what each is for, then where premiums come from and why they vanish. **Whenever you quote mNAV, say which one.**",

  intuition: `
Picture a vault holding $1 billion of bitcoin. Someone slices the vault into 100 million pieces and lists them on an exchange at $15 each, so the market values the whole vault at $1.5 billion.

**The market is paying $1.5 billion for $1 billion of bitcoin.** That ratio, 1.5, is the plainest meaning of **mNAV** (multiple of net asset value): the stock's **premium** to the bitcoin behind it. Above 1 is a premium; below 1 is a discount.

Why would anyone pay $1.50 for $1 of bitcoin? Stage 15.3 gave some reasons. Some funds can own stocks but not coins. The company can issue stock at a premium and put more bitcoin behind every share (Stage 16.1). Its stock and convertibles are so volatile that investors can sell options against them and earn "rent" (Stage 7.3). And it levers bitcoin with preferreds and converts without any margin calls. And why does the market sometimes pay only $0.60? Fear of dilution, forced selling, index deletion, management — and, unlike an ETF, **you can't hand a DAT share back to the company for the bitcoin behind it**, so no arbitrage pulls the price back toward 1 (Stage 12.5).

That's the first layer: mNAV is the bitcoin-treasury version of the valuation multiples in Stage 5.3. A P/E asks "what do I pay for $1 of earnings?"; mNAV asks "what do I pay for $1 of bitcoin?"

The second layer is the real difficulty: **there are several ways to compute mNAV, and they differ widely.**

- Is the numerator **market cap of the common**, or **enterprise value** including debt and preferreds?
- Is the share count **basic**, or **diluted** with convertibles assumed converted?
- Is the denominator **all the bitcoin**, or **net** bitcoin after senior claims, with cash added back?

Every combination has its users. Worse, Strategy **changed its own definition** in 2026: in 2025 its mNAV was \\(\\text{enterprise value} \\div \\text{bitcoin NAV}\\); from 2026 it is \\(\\text{share price} \\div \\text{Net BTC per share}\\). **Numbers from the two periods can't be compared directly.** Strive, meanwhile, avoids the word "mNAV" altogether and reports three related measures.

The same Orange Corp (10,000 BTC at $100,000; 100M shares at $15; $150M convertibles; $150M preferreds; $30M cash):

- Market-cap mNAV: \\(\\mathrm{mNAV}_{\\text{mkt cap}} = \\dfrac{\\$1.5\\text{B}}{\\$1.0\\text{B}} = \\mathbf{1.50}\\)
- Diluted market-cap mNAV (convertibles assumed converted, 106M shares): \\(\\mathrm{mNAV}_{\\text{diluted}} = \\mathbf{1.59}\\)
- EV mNAV (Strategy 2025): \\(\\mathrm{mNAV}_{\\text{EV}} = \\dfrac{\\$1.5\\text{B} + \\$0.15\\text{B} + \\$0.15\\text{B} - \\$0.03\\text{B}}{\\$1.0\\text{B}} = \\mathbf{1.77}\\)
- Price over Net BTC per share (Strategy 2026): \\(\\mathrm{mNAV}_{2026} = \\dfrac{\\$15}{\\$7.30} = \\mathbf{2.05}\\)

**One company, one day, one share price — four mNAVs from 1.50 to 2.05.** Nobody made a mistake; each version answers a different question. The goal of this lesson is that whenever you see "\\(\\mathrm{mNAV} = x\\)", your first reflex is: **which one?**

The lesson rests on **Idea ② (balance sheets and claims)** — how you slice the numerator and denominator is really a decision about which claims to count — and **Idea ④ (risk and leverage)**: the premium embeds the market's price for volatility, leverage and reflexivity. Stage 10.4 on reflexivity and Stage 18.3 on mNAV compression both start here. This lesson explains mechanics and analytical frameworks only; it is not investment advice.

**This lesson, in five parts:**

- **① Market-cap and diluted market-cap mNAV**
- **② Enterprise-value mNAV: Strategy's 2025 definition**
- **③ \\(\\text{Price} \\div \\text{Net BTC per share}\\): Strategy's 2026 definition**
- **④ Strive's measures and third-party versions**
- **⑤ Where the premium comes from, and why it disappears**
`,

  mechanics: `
### ① Market-cap and diluted market-cap mNAV

The two simplest versions, and the ones third-party trackers use most (bitcointreasuries.net labels them "basic" and "diluted"):

$$ \\mathrm{mNAV}_{\\text{mkt cap}} = \\frac{\\text{common market cap}}{\\text{bitcoin NAV}}
$$ \\text{bitcoin NAV (BTC NAV)} = \\text{coins held} \\times \\text{BTC price}
$$ \\mathrm{mNAV}_{\\text{diluted}} = \\frac{\\text{share price} \\times \\text{diluted shares}}{\\text{bitcoin NAV}}

Orange Corp: \\(\\mathrm{mNAV}_{\\text{mkt cap}} = \\dfrac{100\\text{M} \\times \\$15}{\\$1.0\\text{B}} = \\mathbf{1.50}\\). Diluted, if we assume the whole $150M convertible converts ($25 conversion price → 6M shares), the count is 106M → \\(\\mathrm{mNAV}_{\\text{diluted}} = \\dfrac{\\$1.59\\text{B}}{\\$1.0\\text{B}} = \\mathbf{1.59}\\). (Trackers define "diluted" differently; some count only in-the-money instruments. Orange Corp's converts are out of the money, so on that basis diluted mNAV would still be 1.50.)

The flaw in market-cap mNAV is that it **ignores the other half of the balance sheet**. It treats all the bitcoin as if it belonged to the common, as though the converts and preferreds didn't exist. The more levered the company, the more market-cap mNAV **understates** the common's real premium. An extreme case: a company with $1.0B of bitcoin, $900M of debt and a $200M market cap. Market-cap mNAV is 0.2 — it looks like "80% off". But the common only owns $100M of net assets, so shareholders are actually paying **2x**.

Real data: on 2026-09-26 bitcointreasuries.net showed Metaplanet at 0.58 (basic), 0.73 (diluted) and 0.79 (EV) — one company, a spread of more than a third.

### ② Enterprise-value mNAV: Strategy's 2025 definition

Strategy's official definition in 2025 (used through at least December 2025):

> "mNAV represents a multiple of Bitcoin NAV, calculated by dividing Enterprise Value … by Bitcoin NAV."

**Enterprise Value (EV)** is \\(\\text{market cap of all basic shares} + \\text{principal of debt} + \\text{notional of perpetual preferred} - \\text{most recently reported cash}\\) (class B valued at the class A price). **Bitcoin NAV** is \\(\\text{BTC price} \\times \\text{BTC held}\\).

$$ \\mathrm{mNAV}_{\\text{EV}} = \\frac{\\text{market cap} + \\text{debt} + \\text{preferred notional} - \\text{cash}}{\\text{bitcoin NAV}}

Orange Corp:

$$ \\mathrm{mNAV}_{\\text{EV}} = \\frac{\\$1.5\\text{B} + \\$0.15\\text{B} + \\$0.15\\text{B} - \\$0.03\\text{B}}{\\$1.0\\text{B}} = 1.77

The EV view asks "**what would it cost to buy the whole company?**" You'd buy all the shares, take on the debt and preferreds, and get the cash. It puts the whole balance sheet in, which makes it more complete than market cap.

Its weakness is that it answers a whole-company question while a common shareholder cares about one share. In EV mNAV the debt and preferreds enter at face value and carry **no premium of their own**; the entire premium comes from the common. So the more leverage, the more the common's premium is diluted into a bigger denominator.

In 2025 Strategy also published common-stock issuance guidance on this definition:

<table class="pm">
<tr><th>EV mNAV</th><th>What Strategy said it would do with common stock (2025-10-30)</th></tr>
<tr><td>Below 2.5x</td><td>Issue "tactically" (to pay interest and dividends)</td></tr>
<tr><td>2.5x–4.0x</td><td>Issue "opportunistically" to buy BTC</td></tr>
<tr><td>Above 4.0x</td><td>Issue "actively"</td></tr>
</table>

By 2025-11-28 Strategy reported EV mNAV of **1.2x**; on 2025-12-01 it built a $1.44B USD Reserve by selling common at an average of about **1.17x** mNAV (Stage 16.6). Using the figures in the 2026-08-24 briefing, \\(\\dfrac{\\text{Enterprise value under Strategy methodology } \\$64.635\\text{B}}{\\text{BTC Reserve } \\$64.718\\text{B}} \\approx \\mathbf{1.00}\\times\\) (derived).

### ③ \\(\\text{Price} \\div \\text{Net BTC per share}\\): Strategy's 2026 definition

From Q2 2026 Strategy switched to a new definition:

> "the market price per share of the Company's class A common stock … divided by the Company's Net Bitcoin Per Share (in USD)."

\\(\\text{Net BTC per share} = \\dfrac{\\text{Net Reserve}}{\\text{Fully Diluted Shares}}\\), where \\(\\text{Net Reserve} = \\text{BTC Reserve} - \\text{notional of }\\textbf{out-of-the-money}\\text{ convertibles and other debt-like instruments} - \\text{preferred notional (excluding in-the-money STRK)} + \\text{USD Assets}\\). (The 2026-08-13 briefing said "+ USD Reserve"; the 2026-08-24 briefing says "USD Assets", meaning Reserve plus USD Cash.) Fully Diluted Shares count only **in-the-money** convertibles (Stage 16.1).

$$ \\mathrm{mNAV}_{2026} = \\frac{\\text{share price}}{\\text{Net Reserve} \\div \\text{Fully Diluted Shares}}

Orange Corp:

$$
\\text{Net Reserve} = \\$1.0\\text{B} - \\$0.15\\text{B} - \\$0.15\\text{B} + \\$0.03\\text{B} = \\$730\\text{M}
\\text{Net BTC per share} = \\frac{\\$730\\text{M}}{100\\text{M shares}} = \\$7.30
\\mathrm{mNAV}_{2026} = \\frac{\\$15}{\\$7.30} = 2.05
$$

Real data: on 2026-08-21, Strategy's \\(\\dfrac{\\text{share price } \\$119.25}{\\text{Net BTC per share } \\$118.31} = \\mathbf{1.01}\\times\\); on 2026-08-10 it was **1.06x**.

Three properties of this definition are worth remembering:

- **It's the common shareholder's mNAV.** The denominator is what the common would actually own if the company were wound up today — a price-to-book ratio with bitcoin marked to market.
- **It measures the same dollar premium as EV mNAV, divided by a different base.** Orange Corp's premium in dollars: \\(\\text{market cap} - \\text{Net Reserve} = \\$1.5\\text{B} - \\$0.73\\text{B} = \\$770\\text{M}\\); \\(\\mathrm{EV} - \\text{BTC NAV} = \\$1.77\\text{B} - \\$1.0\\text{B} = \\$770\\text{M}\\) — identical. EV mNAV divides $770M by $1.0B (0.77); the 2026 definition divides it by $730M (1.05). Under simplifying conditions (all debt out of the money; cash equals USD Assets) you get **\\((\\mathrm{mNAV}_{2026} - 1) = (\\mathrm{mNAV}_{\\text{EV}} - 1) \\times \\text{Amplification}\\)**: \\(0.77 \\times 1.37 = 1.05\\) (amplification is Stage 16.4).
- **It maps directly onto "is issuing stock accretive?"** Issue common at price \\(P\\) and buy bitcoin with all of it: Net BTC per share rises exactly when **\\(P > \\text{Net BTC per share}\\)** — that is, when **\\(\\mathrm{mNAV}_{2026} > 1\\)** (derived in Stage 16.7). That is plausibly why Strategy switched: under the new definition, "1.0" is the line between accretion and dilution.

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">One Orange Corp, four mNAVs</text><line x1="60" y1="230" x2="610" y2="230" stroke="var(--line)"/><line x1="60" y1="130" x2="610" y2="130" stroke="var(--red)" stroke-dasharray="4 3"/><text x="64" y="124" font-size="10" fill="var(--red)">1.0 = parity</text><rect x="95" y="80" width="80" height="150" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="135" y="72" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">1.50</text><rect x="225" y="71" width="80" height="159" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="265" y="63" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">1.59</text><rect x="355" y="53" width="80" height="177" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="395" y="45" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">1.77</text><rect x="485" y="25" width="80" height="205" fill="var(--btc-soft)" stroke="var(--btc)" stroke-width="2"/><text x="525" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">2.05</text><text x="135" y="248" text-anchor="middle" font-size="11" fill="var(--ink)">Market cap</text><text x="135" y="263" text-anchor="middle" font-size="10" fill="var(--muted)">1.5 ÷ 1.0</text><text x="265" y="248" text-anchor="middle" font-size="11" fill="var(--ink)">Diluted market cap</text><text x="265" y="263" text-anchor="middle" font-size="10" fill="var(--muted)">1.59 ÷ 1.0</text><text x="395" y="248" text-anchor="middle" font-size="11" fill="var(--ink)">EV (2025)</text><text x="395" y="263" text-anchor="middle" font-size="10" fill="var(--muted)">1.77 ÷ 1.0</text><text x="525" y="248" text-anchor="middle" font-size="11" fill="var(--ink)">Price ÷ Net BPS (2026)</text><text x="525" y="263" text-anchor="middle" font-size="10" fill="var(--muted)">15 ÷ 7.30</text><text x="320" y="284" text-anchor="middle" font-size="10" fill="var(--muted)">$ billions (last column $ per share); bar heights proportional to the multiple (1.0x = 100 px)</text></svg><figcaption>The fuller the numerator (adding debt and preferreds) and the "netter" the denominator (removing senior claims), the bigger the mNAV. The numbers differ because the questions differ: market cap asks about the stock's premium to all the bitcoin, EV about the whole company's premium to all the bitcoin, and the 2026 version about the common's premium to the net bitcoin it actually owns.</figcaption></figure>

### ④ Strive's measures and third-party versions

**Strive doesn't use the label "mNAV".** Its dashboard reports three related measures (holdings as of 2026-09-18, prices as of the 2026-09-25 close):

<table class="pm">
<tr><th>Strive measure</th><th>Definition</th><th>Strive value</th><th>Orange Corp</th></tr>
<tr><td><b>Common Equity Accretion Premium</b></td><td>\\(\\dfrac{\\text{market cap}}{\\text{bitcoin fair market value}} - 1\\), floored at 0%</td><td>33.0% (roughly market-cap mNAV of 1.33x)</td><td>50%</td></tr>
<tr><td><b>EV / Treasury Asset Value</b></td><td>\\(\\mathrm{EV} = \\text{market cap} + \\text{debt} + \\text{preferred}\\ (\\textbf{at market value}) - \\text{cash} - \\text{marketable securities}\\); \\(\\mathrm{TAV} = \\text{bitcoin} + \\text{cash} + \\text{marketable securities}\\) (Strive's STRC holding)</td><td>1.52x</td><td>\\(\\dfrac{\\$1.5\\text{B} + \\$0.15\\text{B} + \\$0.15\\text{B} - \\$0.03\\text{B}}{\\$1.0\\text{B} + \\$0.03\\text{B}} \\approx 1.72\\times\\) (preferreds assumed at par)</td></tr>
<tr><td><b>Multiple to Net Treasury Asset Value</b></td><td>\\(\\mathrm{NTAV} = \\mathrm{TAV} - \\text{debt} - \\text{preferred liquidation preference}\\)</td><td>2.14x (NTAV $1.38B, $13.76 per share vs an ASST price of $29.44)</td><td>\\(\\$1.03\\text{B} - \\$0.15\\text{B} - \\$0.15\\text{B} = \\$730\\text{M}\\) → 2.05x</td></tr>
</table>

Notice the name "accretion premium": Strive ties the premium directly to whether issuing stock is accretive, and shows 0% whenever it's negative. Third parties add their own versions: The Block showed ASST at 1.21x mNAV on 2026-09-26; bitcointreasuries.net lists basic, diluted and EV side by side. **For the same ASST you can find 1.21, 1.33, 1.52 and 2.14 depending on where you look.**

All of Orange Corp's versions in one place:

<table class="pm">
<tr><th>Definition</th><th>Formula</th><th>Orange Corp</th></tr>
<tr><td>Market cap</td><td>\\(\\mathrm{mNAV}_{\\text{mkt cap}} = \\dfrac{\\text{market cap}}{\\text{BTC NAV}}\\)</td><td>1.50</td></tr>
<tr><td>Diluted market cap</td><td>\\(\\mathrm{mNAV}_{\\text{diluted}} = \\dfrac{\\text{price} \\times \\text{diluted shares}}{\\text{BTC NAV}}\\)</td><td>1.59 (all converts converted)</td></tr>
<tr><td>EV (Strategy 2025)</td><td>\\(\\mathrm{mNAV}_{\\text{EV}} = \\dfrac{\\text{market cap} + \\text{debt} + \\text{preferred} - \\text{cash}}{\\text{BTC NAV}}\\)</td><td>1.77</td></tr>
<tr><td>\\(\\text{Price} \\div \\text{Net BTC per share}\\) (Strategy 2026)</td><td>\\(\\mathrm{mNAV}_{2026} = \\dfrac{\\text{price}}{\\text{Net Reserve} \\div \\text{fully diluted shares}}\\)</td><td>2.05</td></tr>
<tr><td>Strive accretion premium</td><td>\\(\\dfrac{\\text{market cap}}{\\text{BTC fair value}} - 1\\) (floor 0)</td><td>50%</td></tr>
</table>

### ⑤ Where the premium comes from, and why it disappears

The bull case for a premium:

- **Growth expectations.** The market expects the company to keep raising capital at a premium and growing BTC per share. A rough thought experiment: if investors believe BTC per share will grow an extra 10% a year for five years, paying \\(1.1^{5} \\approx \\mathbf{1.61}\\) dollars today for $1 of bitcoin isn't crazy. The premium is a **discounted** stream of future BTC Yield (Idea ①).
- **Volatility value.** DAT stocks are volatile, and options and convertible buyers pay for that volatility (Stage 7.3, Stage 17.2).
- **Access.** Many institutions can hold stocks but not coins (Stage 15.3).
- **Leverage without margin calls.** The common is amplified bitcoin exposure with no margin calls (Stage 16.4).

The bear case, and the sources of discounts:

- **No redemption mechanism.** An ETF's creation and redemption anchors its price near NAV (Stage 5.6, Stage 12.5). A DAT has no such anchor, so premiums and discounts can persist for a long time — just like closed-end funds.
- **Fear of dilution and coin sales.** Once the market believes a company will keep issuing at low mNAV or be forced to sell bitcoin, the discount feeds on itself.
- **Reflexivity.** Premium → issue and buy → BTC per share rises → better story → bigger premium; and the same in reverse (Stage 10.4, Stage 16.7).
- **Structural factors.** Index inclusion and exclusion (MSCI's consultation results are due on or before 2026-10-16), governance, the dividend burden, accounting volatility (Stage 18.4).

History is blunt. In October 2025 Strategy was still designing issuance guidance around EV mNAV bands of 2.5x and above 4.0x; on 2025-11-28 it was 1.2x; in August 2026, on the new definition, about 1.01x–1.06x. According to DWF Ventures (September 2026), 16 of the 20 largest DATs traded below 1x mNAV; only Bit Digital, Strive, Hyperliquid Strategies and BitMine held a premium. Metaplanet was at 0.58x (basic), XXI at 0.68x (basic). **A premium isn't an asset of the company; it's the market's mood, and it comes and goes.** What happens once mNAV falls below 1 — buybacks, coin sales, the "death spiral" debate — is the subject of Stage 18.3.

**Three rules for reading mNAV:** (1) ask for the definition first; (2) compare dates and companies only on the same definition — Strategy's 2025 and 2026 figures are not comparable; (3) check how it relates to accretion — only a definition built on Net BTC per share makes 1.0 the line between accretive and dilutive issuance. This lesson explains mechanics and analytical frameworks only; it is not investment advice.
`,

  demo: "mnav",

  analogy: `
Imagine a **closed-end shop that sells nothing but gold bars**: $10 million of bullion is locked inside, and shares in the shop trade on the market.

Someone asks, "What multiple does the shop trade at?" The answer depends on the question.

- "**What are all the shares worth, as a multiple of the gold?**" — that's market-cap mNAV.
- "**What would it cost to buy the whole shop — shares, plus the shop's debts, plus the customers who prepaid for priority deliveries — as a multiple of the gold?**" — that's enterprise-value mNAV.
- "**After the gold pays off the debts and refunds the prepayments, what multiple of the remainder — the part that truly belongs to shareholders — do the shares sell for?**" — that's the net version.

All three questions are reasonable, and all three answers differ. The more the shop owes, the cheaper the first answer looks and the more expensive the third looks.

Why would the shop ever sell for more than its gold? Perhaps the owner is skilled at swapping expensive shares for more gold; perhaps some buyers are allowed to own shares but not bullion. But there's no window where you can trade a share for its gold — so once people stop trusting the owner, the shares can sell for less than the gold, and stay there.
`,

  misconceptions: [
    "**\"mNAV is a single number.\"** — There are at least four: market cap, diluted market cap, enterprise value and \\(\\text{price} \\div \\text{Net BTC per share}\\), plus Strive's three measures and every website's own version. Orange Corp can be 1.50, 1.59, 1.77 or 2.05 on the same day. An mNAV without a definition means nothing.",
    "**\"Strategy's 2026 mNAV can be compared with its 2025 mNAV.\"** — 2025 was \\(\\mathrm{EV} \\div \\text{bitcoin NAV}\\); 2026 is \\(\\text{price} \\div \\text{Net BTC per share}\\). The definition changed, so the numbers aren't comparable. August 2026's roughly 1.01x on the new basis corresponds to about 1.00x on the old one (derived).",
    "**\"A market-cap mNAV below 1 means the stock is cheap.\"** — Market-cap mNAV ignores debt and preferreds. A heavily levered company can show far below 1 while its common still trades at a premium to the net assets it actually owns.",
    "**\"The premium is a company asset that will always be there.\"** — It's the price the market is willing to pay, with no redemption mechanism to anchor it. In September 2026, 16 of the 20 largest DATs traded below 1x.",
    "**\"EV mNAV and net mNAV measure different premiums.\"** — Under simplifying conditions they measure the same dollar premium (\\(\\text{market cap} - \\text{Net Reserve} = \\mathrm{EV} - \\text{bitcoin NAV}\\)); one divides it by total bitcoin, the other by Net Reserve, so they differ by a factor of the amplification.",
  ],

  quiz: [
    {
      q: "Orange Corp: $1.5B market cap, $150M convertibles, $150M preferreds, $30M cash, $1.0B of bitcoin NAV. What is its mNAV on Strategy's 2025 enterprise-value definition?",
      options: [
        "1.50",
        "1.77",
        "2.05",
        "1.59",
      ],
      answer: 1,
      explain: "\\(\\mathrm{EV} = \\$1.5\\text{B} + \\$0.15\\text{B} + \\$0.15\\text{B} - \\$0.03\\text{B} = \\$1.77\\text{B}\\); \\(\\mathrm{mNAV}_{\\text{EV}} = \\dfrac{\\$1.77\\text{B}}{\\$1.0\\text{B}} = \\mathbf{1.77}\\). 1.50 is market cap, 1.59 is diluted market cap and 2.05 is the 2026 definition.",
    },
    {
      q: "What is Strategy's 2026 definition of mNAV?",
      options: [
        "\\(\\text{Enterprise value} \\div \\text{bitcoin NAV}\\)",
        "\\(\\text{Market cap} \\div \\text{bitcoin NAV} - 1\\)",
        "\\((\\text{Debt} + \\text{preferred}) \\div \\text{bitcoin value}\\)",
        "\\(\\text{Class A share price} \\div \\text{Net Bitcoin Per Share}\\) (in USD)",
      ],
      answer: 3,
      explain: "From 2026: \\(\\mathrm{mNAV}_{2026} = \\text{share price} \\div \\text{Net BTC per share}\\), where \\(\\text{Net BTC per share} = \\dfrac{\\text{Net Reserve}}{\\text{Fully Diluted Shares}}\\). On 2026-08-21: \\(\\dfrac{\\$119.25}{\\$118.31} = \\mathbf{1.01}\\times\\).",
    },
    {
      q: "Why is 1.0 exactly the accretion line under the 2026 definition?",
      options: [
        "Issue stock at price \\(P\\) and buy bitcoin: Net BTC per share rises iff \\(P > \\text{Net BTC per share}\\), i.e. iff that \\(\\mathrm{mNAV} > 1\\)",
        "Because exchanges forbid mNAV below 1",
        "Because preferred dividends equal exactly 1%",
        "Because bitcoin's volatility is 100%",
      ],
      answer: 0,
      explain: "Issue \\(n\\) shares, raise \\(nP\\), buy bitcoin: Net Reserve becomes \\(N + nP\\) over \\(S + n\\) shares. \\(\\dfrac{N + nP}{S + n} > \\dfrac{N}{S} \\iff P > \\dfrac{N}{S}\\). This is the core of the flywheel math in Stage 16.7.",
    },
    {
      q: "Strive reports a Common Equity Accretion Premium of 33.0%. Roughly which mNAV does that correspond to?",
      options: [
        "EV mNAV of 1.52x",
        "Net-asset multiple of 2.14x",
        "Market-cap mNAV of about 1.33x",
        "It has nothing to do with mNAV",
      ],
      answer: 2,
      explain: "It's defined as \\(\\dfrac{\\text{market cap}}{\\text{bitcoin fair value}} - 1\\), floored at 0%. 33.0% means market cap is about **1.33x** the bitcoin, roughly market-cap mNAV.",
    },
    {
      q: "Compared with a spot bitcoin ETF, why can a DAT's premium or discount persist for a long time?",
      options: [
        "Because DATs don't hold real bitcoin",
        "Because a DAT has no creation/redemption mechanism; you can't swap shares for the underlying bitcoin, so arbitrage can't pull the price back to NAV",
        "Because ETFs don't trade on exchanges",
        "Because regulators set DAT share prices",
      ],
      answer: 1,
      explain: "An ETF's authorized participants create and redeem shares, anchoring price near NAV (Stage 12.5). A DAT is like a closed-end fund with no such anchor, so premiums and discounts can last.",
    },
  ],

  further: [
    { label: "Strategy investor briefing FWP, 2026-08-24 (2026 mNAV and Net BTC per share, definitions and values)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strategy Q3 2025 earnings release (2025 EV-based mNAV and issuance guidance)", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312525258690/mstr-ex99_1.htm" },
    { label: "Strive treasury dashboard (accretion premium, EV/TAV, NTAV multiple)", url: "https://strive.com/treasury" },
    { label: "BitcoinTreasuries.net: basic, diluted and EV mNAV by company", url: "https://bitcointreasuries.net/" },
    { label: "Strategy: live mNAV data (always check the latest disclosure)", url: "https://www.strategy.com/" },
  ],
};
