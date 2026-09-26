export default {
  id: "dat-vs-etf",
  stage: 15,
  order: 5,
  title: "DAT vs Spot ETF vs Holding Bitcoin Directly: Three Ways to Own BTC",
  difficulty: "dat",
  prereqs: ["dat-what", "why-dats-exist", "bitcoin-how"],

  oneLiner:
    "“Owning bitcoin” can mean holding your own keys, buying a spot ETF, buying a DAT's common stock or buying a DAT's preferred. These are not four wrappers around the same thing but **four different shapes of risk**: holding directly means carrying custody risk with no middleman; an ETF uses a fund wrapper to pin its price to NAV; DAT common stacks amplification, premium swings and company risk on top of bitcoin; DAT preferred trades bitcoin's upside for fixed income and a cushion that can collapse. This lesson puts them in one table and one set of scenarios — **not to tell you which to choose, but to show what each choice is actually buying.**",

  intuition: `
Say you have $10,000 and want to “own bitcoin” for a year. Four roads lie in front of you:

1. **Hold it directly**: buy on an exchange, withdraw to your own wallet, keep the private keys yourself.
2. **A spot bitcoin ETF**: buy a fund in your brokerage account, and the fund holds the bitcoin for you (trading in the US since January 11, 2024; Stage 12.5).
3. **DAT common stock**: buy shares of a company such as Strategy or Strive.
4. **DAT preferred stock**: buy a preferred such as STRF, STRC or SATA and collect a fixed or floating dividend.

If bitcoin rises 50% over the year, the first two roads earn about 50% (the ETF a touch less after fees). The third might earn far more, or less — it depends on amplification and on what mNAV does. The fourth earns roughly its 10% or so of dividends, whatever bitcoin did. If bitcoin falls 50%, the first two lose about 50%; the third may lose more than 70%; the fourth keeps collecting dividends as long as the asset coverage is thick enough, though its price may slide as the cushion thins.

**Same bitcoin, four completely different outcomes.** This lesson rests on **Idea ④ (risk and leverage)** and **Idea ③ (liquidity and trust)**. Idea ④ explains why the common is amplified and the preferred is capped; Idea ③ explains why “who is holding the bitcoin for you” is itself a risk — Mt. Gox and FTX in Stage 10.5 were the price of broken custody trust.

There is also a question people often skip: **what exactly do you own?**

- Holding directly: you own the bitcoin itself (strictly, the ability to spend it).
- ETF: you own fund shares; the fund owns the bitcoin; a custodian keeps it for the fund.
- DAT common: you own the residual claim on a company that owns bitcoin, with debt and preferreds ahead of you in line.
- DAT preferred: you own a fixed claim on the company — **you have no direct right to the bitcoin at all.**

**This lesson covers mechanics and analytical frameworks only; it is neither investment advice nor tax advice** (tax treatment depends on your country and circumstances).

**This lesson has five parts:**

- **① Holding directly: keeping your own keys**
- **② Spot ETFs: bitcoin in a fund wrapper**
- **③ DAT common: amplification × premium × company risk**
- **④ DAT preferred: fixed income with a bitcoin cushion**
- **⑤ One table, one set of scenarios: the four side by side**
`,

  mechanics: `
### ① Holding directly: keeping your own keys

Holding bitcoin directly means **no middleman** (Stage 12.1): if you hold the private key, you can move the coins on the bitcoin network without anyone's permission. The strengths and the costs are two sides of one coin:

- **No counterparty risk**: no fund company, no custodian bank, no corporate management. The exchange is involved only at the moment you buy; after you withdraw, it has nothing to do with you.
- **No annual fee**: only the bid–ask spread and on-chain fees.
- **24/7 and freely transferable**: across borders and platforms, unconstrained by stock-market hours.
- **The price is that custody risk is entirely yours**: lose the keys, have them stolen, or fail to plan for inheritance, and the coins are gone — there is no help desk. Leave the coins on an exchange and you face a different risk: the exchange misusing them or failing (Mt. Gox in 2014, FTX in November 2022; Stage 10.5), at which point your “bitcoin” is just a number on the exchange's ledger.

There are practical limits too: many retirement accounts, institutional accounts and funds restricted to securities **cannot** hold bitcoin directly — the access problem from Stage 15.3.

### ② Spot ETFs: bitcoin in a fund wrapper

The US spot bitcoin ETFs, approved by the SEC on January 10, 2024 and trading from January 11, put bitcoin inside a standard securities wrapper. Why does an ETF's price hug its NAV? Because of the **creation and redemption** mechanism from Stage 5.6: when the ETF trades above NAV, authorized participants create new shares and sell them; when it trades below, they buy shares and redeem them with the fund. That arbitrage keeps premiums and discounts small — and it is **the most fundamental difference from a DAT**, which has no redemption mechanism and can trade far from NAV for long periods.

Scale: through September 25, 2026, cumulative net inflows into US spot bitcoin ETFs were about **$57.5 billion** (Farside), with BlackRock's IBIT taking in about $65.2 billion and Grayscale's GBTC losing about $27.8 billion. IBIT's net assets were about **$67.1 billion**, and its 10-Q showed 734,261 BTC at June 30, 2026. GBTC's large outflows carry a lesson of their own: **fees matter** — higher-fee products bleed money to cheaper rivals.

The ETF trade-off:

- **Strengths**: fits in ordinary brokerage and retirement accounts; custody handled by professionals; price stays close to NAV; tax treatment similar to stocks (varies by jurisdiction).
- **Costs**: an annual management fee (typically a fraction of one percent); trades only during market hours; you own fund shares, not bitcoin; you depend on the issuer and custodian — the “plumbing” of the custody chain in Stage 8.2.
- **No leverage and no income**: an ETF is bitcoin minus fees, nothing more and nothing less.

### ③ DAT common: amplification × premium × company risk

The return on DAT common stock breaks down into three multipliers:

$$
common return ≈ (1 + BTC return × amplification − dividend and cost drag) × (ending mNAV ÷ starting mNAV) − 1
$$

- **Amplification** (Stage 16.4): debt and preferreds are fixed claims, so every move in bitcoin lands on the common. Orange Corp's official-style amplification is about 1.37x; Strategy's was 1.30x on August 23, 2026.
- **The change in mNAV** (Stage 16.2): a second source of risk unique to DAT common. **Even if bitcoin does not move at all, a drop in mNAV from 1.5 to 1.0 cuts the share price by a third.** In 2026 most DATs fell below 1x mNAV, so holders took two hits at once: bitcoin falling and the premium vanishing.
- **Company risk**: dilution (issuing below NAV), management decisions, the cash needs of dividends, and index and accounting rules (Stage 18.4).

A full worked example with Orange Corp (Strategy's 2026 definition: starting mNAV 2.05, net reserve $730M; $15M of dividends paid in the year, out of cash):

- Bitcoin +50%, mNAV unchanged: net reserve → $1.5B + $15M − $300M = **$1.215B**, common **+66%.**
- Bitcoin −50%, mNAV unchanged: net reserve → $500M + $15M − $300M = **$215M**, common **−71%.**
- Bitcoin −50% and mNAV falling from 2.05 to 1.0: common about **−86%.**

**The same 50% fall in bitcoin leaves the common anywhere from −71% to −86%, depending on the premium.** That is why DAT common stock swings so much harder than bitcoin. It charges no management fee, but it carries its own drags: preferred dividends, convertible interest and corporate running costs.

### ④ DAT preferred: fixed income with a bitcoin cushion

Preferred holders are not after bitcoin's upside; they want **steady income**: STRF 10%, STRD 10%, STRC 12.00% (floating, since July 2026), SATA 13.00% (floating, since April 2026). Their return has a completely different shape:

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">One-year payoff shapes (Orange Corp, illustrative): x = bitcoin return, y = holder return</text><line x1="80" y1="162" x2="600" y2="162" stroke="var(--line)" stroke-width="1.5"/><line x1="311" y1="30" x2="311" y2="252" stroke="var(--line)" stroke-width="1.5"/><text x="80" y="268" text-anchor="middle" font-size="10" fill="var(--muted)">−80%</text><text x="167" y="268" text-anchor="middle" font-size="10" fill="var(--muted)">−50%</text><text x="311" y="268" text-anchor="middle" font-size="10" fill="var(--muted)">0</text><text x="456" y="268" text-anchor="middle" font-size="10" fill="var(--muted)">+50%</text><text x="600" y="268" text-anchor="middle" font-size="10" fill="var(--muted)">+100%</text><text x="74" y="166" text-anchor="end" font-size="10" fill="var(--muted)">0</text><text x="74" y="78" text-anchor="end" font-size="10" fill="var(--muted)">+100%</text><text x="74" y="254" text-anchor="end" font-size="10" fill="var(--muted)">−100%</text><polyline points="80,232.4 600,74" fill="none" stroke="var(--blue)" stroke-width="2.5"/><text x="600" y="106" text-anchor="end" font-size="11" fill="var(--blue)">Direct ≈ ETF</text><polyline points="80,250 104.5,250 166.7,224 311.1,163.8 455.6,103.6 600,43.3" fill="none" stroke="var(--btc)" stroke-width="3"/><text x="540" y="46" text-anchor="end" font-size="11" font-weight="700" fill="var(--btc)">DAT common (mNAV unchanged)</text><polyline points="80,214.8 94.4,197.2 137.8,162 166.7,157.6 311.1,153.2 600,153.2" fill="none" stroke="var(--green)" stroke-width="3"/><text x="600" y="146" text-anchor="end" font-size="11" font-weight="700" fill="var(--green)">DAT preferred ≈ +10% (capped)</text><text x="150" y="188" font-size="10" fill="var(--red)">cushion gone</text><text x="320" y="292" text-anchor="middle" font-size="10" fill="var(--muted)">Common: Strategy 2026 definition, mNAV constant; preferred drop on the left is illustrative; rates also matter</text></svg><figcaption>Three lines, three shapes. Violet is bitcoin itself. Orange is steeper (amplified) and hits zero when bitcoin falls about 70%. Green is “income plus a cap” — in most scenarios it just collects dividends, and it only takes losses when the cushion collapses.</figcaption></figure>

Three key risks for the preferred holder:

- **Credit risk = the thickness of the cushion** (Stage 16.5): Orange-F has a BTC Rating of 4.0x and a floor price of $25,000; in theory it is paid in full until bitcoin gets there. But the market **prices ahead**: as the cushion thins, the required yield rises and the price falls.
- **Interest-rate risk**: a perpetual preferred behaves like a perpetual bond (Stage 2.3, Stage 4.4), so when the 30-year Treasury yield rises, its price falls too — this is where Lin's first headline meets the third (Stage 18.1). Floating-rate preferreds such as STRC and SATA were designed to cut that sensitivity (Stage 17.4).
- **No upside**: if bitcoin doubles, the preferred still just collects its dividend (the convertible STRK is the exception).

Tax adds a twist: Strategy expects its preferred dividends to be treated as **return of capital (ROC)** because the company has negative tax “earnings and profits,” and Strive treats SATA distributions as return of capital too. That lowers the holder's cost basis and defers tax (Stage 17.7; depends on country and circumstances; not tax advice).

### ⑤ One table, one set of scenarios: the four side by side

<table class="pm">
<tr><th>Dimension</th><th>Direct</th><th>Spot ETF</th><th>DAT common</th><th>DAT preferred</th></tr>
<tr><td><b>What you own</b></td><td>The bitcoin itself</td><td>Fund shares</td><td>A company's residual claim</td><td>A fixed claim on the company</td></tr>
<tr><td><b>Bitcoin exposure</b></td><td>1x</td><td>1x (less fees)</td><td>Amplified (~1.3–1.5x) × mNAV change</td><td>Small; mostly credit exposure</td></tr>
<tr><td><b>Income</b></td><td>None</td><td>None</td><td>None</td><td>10%–13% dividends</td></tr>
<tr><td><b>Price vs NAV</b></td><td>It is NAV</td><td>Held near NAV by creations/redemptions</td><td>Can trade at a lasting premium or discount</td><td>Around par, moved by credit and rates</td></tr>
<tr><td><b>Fees / drag</b></td><td>Spread, on-chain fees</td><td>Annual management fee</td><td>Dividends, interest, running costs, dilution</td><td>None (but the return is capped)</td></tr>
<tr><td><b>Custody / counterparty</b></td><td>You (or the exchange)</td><td>Issuer and custodian</td><td>Management and its custodians</td><td>The company's ability to pay</td></tr>
<tr><td><b>Main risks</b></td><td>Lost keys, exchange failure</td><td>Fees, plumbing dependence</td><td>Amplified losses, premium collapse, dilution</td><td>Thinning cushion, rising rates, dividend suspension</td></tr>
<tr><td><b>Fits a brokerage account</b></td><td>No</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
</table>

Scenarios (Orange Corp, illustrative, one year; ETF fee assumed at 0.25%; common on the 2026 definition with mNAV unchanged; preferred at an unchanged required yield):

<table class="pm">
<tr><th>Bitcoin 1-year return</th><th>Direct</th><th>ETF</th><th>DAT common</th><th>Orange-F preferred</th></tr>
<tr><td>+50%</td><td>+50%</td><td>about +49.6%</td><td>about +66%</td><td>+10%</td></tr>
<tr><td>0%</td><td>0%</td><td>about −0.25%</td><td>about −2% (dividend drag)</td><td>+10%</td></tr>
<tr><td>−50%</td><td>−50%</td><td>about −50.1%</td><td>about −71%</td><td>+10% (still covered 2.0x)</td></tr>
<tr><td>−80%</td><td>−80%</td><td>about −80%</td><td>near zero</td><td>Covered 0.8x: only partial recovery by seniority</td></tr>
</table>

The right way to read this table is not “which is best” but “**what is each column betting on?**” Direct holding bets on bitcoin and on your own custody skills; the ETF bets on bitcoin and the issuer; DAT common bets on bitcoin, the premium and management; DAT preferred bets that **bitcoin will not fall through the cushion, rates will not surge, and the company will be willing and able to keep paying cash dividends.** Stage 18.2's stress test works through that last column in full. **Mechanics and frameworks only; not investment advice.**
`,

  demo: "dat-vs-etf",

  analogy: `
Think of bitcoin as **an orchard**, and the four ways of holding it as four ways of “owning the orchard”:

- **Holding directly**: you buy a plot and guard it yourself. All the fruit is yours and you pay no management fee — but if the fence breaks or you lose the key, nobody is responsible except you.
- **A spot ETF**: you buy units in an “orchard trust” that hires professional guards and charges a small annual fee. The units always trade close to the orchard's value, because anyone can swap units for orchard and orchard for units.
- **DAT common stock**: you own shares in an “orchard company.” The company borrowed money and sold “a fixed basket of fruit every year” certificates to buy far more land — in a bumper year you get more than any landowner; in a bad year the fixed baskets go out first and what's left for you is pitiful. Worse, the share price also depends on how excited people are about the company; when the excitement fades, the price falls even if the orchard hasn't changed.
- **DAT preferred stock**: you hold one of those “fixed basket every year” certificates. Bumper crop or not, you get the same basket; you only get hurt if the orchard's value falls so far that even the fixed baskets are in doubt. And you have **no right** to walk into the orchard and pick fruit yourself.

The four suit four kinds of people: those who want full control, those who want no hassle, those who want amplification, and those who want steady income. **There is no single right answer — only the question of what you actually want to buy.**
`,

  misconceptions: [
    "**“DAT common is just a bitcoin ETF with a bit of leverage.”** — An ETF's creations and redemptions pin its price to NAV; a DAT has no redemption mechanism, so mNAV can swing widely. Even if bitcoin stands still, a drop in mNAV from 1.5 to 1.0 cuts the share price by a third — a second source of risk that ETFs do not have.",
    "**“DAT preferred is backed by bitcoin, so it is as safe as holding bitcoin, plus a dividend.”** — Preferred holders have no direct right to the bitcoin, only a fixed claim ranking behind debt. Bitcoin's upside does not reach them, while a bitcoin crash, rising rates or a closed funding window can all push the price down. It is a credit product, not bitcoin.",
    "**“Holding bitcoin directly is risk-free because there is no middleman.”** — There is no counterparty risk, but all the custody risk is yours: lost or stolen keys cannot be recovered, and leaving coins on an exchange brings counterparty risk straight back (Mt. Gox, FTX).",
    "**“An ETF is exactly the same as holding bitcoin.”** — You own fund shares, not bitcoin; you pay an annual fee; you can trade only during market hours; and you depend on the issuer and custodian. In return you get convenience, eligibility for retirement accounts and professional custody.",
    "**“If bitcoin falls 50%, DAT common falls about 50%.”** — Amplification makes the fall bigger: Orange Corp is down about 71% with mNAV unchanged, and about 86% if the premium vanishes at the same time. In 2026 many DAT common stocks fell well more than bitcoin did.",
  ],

  quiz: [
    {
      q: "Why does a spot ETF usually trade close to NAV while a DAT's common can trade at a lasting premium or discount?",
      options: [
        "Because ETFs are government-guaranteed",
        "Because ETFs have a creation/redemption mechanism whose arbitrage pulls the price back to NAV; DATs have no redemption mechanism",
        "Because DATs do not disclose their holdings",
        "Because ETFs trade only on weekends",
      ],
      answer: 1,
      explain: "**Creation/redemption arbitrage** is the key: above NAV, new ETF shares are created and sold; below NAV, shares are bought and redeemed. DAT shareholders cannot swap stock for the company's bitcoin, so mNAV can stay away from 1 for a long time.",
    },
    {
      q: "Orange Corp (2026-definition mNAV 2.05, net reserve $730M, $15M of dividends a year). If bitcoin falls 50% and mNAV stays unchanged, roughly how much does the common move?",
      options: [
        "−50%",
        "−37%",
        "−100%",
        "About −71%",
      ],
      answer: 3,
      explain: "Net reserve → $500M + $15M (remaining cash) − $300M = $215M; 215 ÷ 730 − 1 ≈ **−71%**. If mNAV also falls from 2.05 to 1.0, it is about −86%.",
    },
    {
      q: "If bitcoin rises 100% in a year, what is the Orange-F (10% cumulative preferred) holder's return closest to?",
      options: [
        "About +10%, plus a small price gain if the required yield falls",
        "About +100%",
        "About +137%",
        "0%",
      ],
      answer: 0,
      explain: "A non-convertible preferred's return is **capped**: bitcoin doubles and it still collects its 10% dividend. Thicker coverage may nudge the required yield down and the price up a little, but the upside is limited.",
    },
    {
      q: "Which of these is **not** a main risk for a DAT preferred holder?",
      options: [
        "A bitcoin crash thinning the asset coverage",
        "Rising long-term rates pushing down perpetual preferred prices",
        "Losing the private keys",
        "The company suspending dividends when the funding window shuts",
      ],
      answer: 2,
      explain: "Losing keys is a risk of **holding bitcoin directly**. Preferred holders face credit risk (a thinning cushion), rate risk (Stage 18.1) and the risk of a dividend suspension.",
    },
    {
      q: "Strategy expects its preferred dividends to be treated as return of capital (ROC). In general, what does that mean for holders?",
      options: [
        "The dividends are permanently tax-free",
        "The company does not need to pay cash",
        "The dividends must be paid in bitcoin",
        "The distribution lowers the holder's cost basis, and tax is usually deferred until sale (depending on jurisdiction and circumstances)",
      ],
      answer: 3,
      explain: "ROC usually **lowers the cost basis and defers tax** rather than exempting it forever; the company expects this treatment because its tax earnings and profits are negative. Stage 17.7 covers it in detail. Not tax advice.",
    },
  ],

  further: [
    { label: "US SEC: statement on the approval of spot bitcoin ETPs (January 2024)", url: "https://www.sec.gov/newsroom/speeches-statements/uyeda-statement-spot-bitcoin-011023" },
    { label: "BitcoinTreasuries.net: bitcoin held by public companies and ETFs (check live data)", url: "https://bitcointreasuries.net/" },
    { label: "Strategy: preferred stock (STRF/STRC/STRE/STRK/STRD) terms and metrics", url: "https://www.strategy.com/" },
    { label: "Strive treasury dashboard: SATA dividends, coverage and return-of-capital notes", url: "https://strive.com/treasury" },
  ],
};
