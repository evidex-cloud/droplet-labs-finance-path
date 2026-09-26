export default {
  id: "preferred-terms",
  stage: 6,
  order: 3,
  title: "Reading Preferred Terms: Cumulative vs Non-Cumulative, Perpetual, Callable & Liquidation Preference",
  difficulty: "core",
  prereqs: ["preferred-stock"],

  oneLiner:
    "Two securities both called \"10% preferred\" can be completely different things. On one, a skipped dividend is **logged and paid later** (cumulative); on the other, it is **gone forever** (non-cumulative). One can be **called** at par by the issuer whenever it likes; the other never can. One lets you **demand a buyback** if the company is taken over; the other doesn't. A preferred's risk isn't written in its name — **it is written in its term sheet.** This lesson teaches you to read that sheet line by line, and it is the key to reading every Strategy and Strive series in Stage 17.3.",

  intuition: `
Stage 6.2 called preferred stock "a hybrid of bond and stock." But how much of each it is varies from one issue to the next — **what decides whether a given preferred behaves more like debt or more like equity is its terms.**

Take the most important example. Orange Corp has two layers of preferred, both paying 10%:

- **Orange-F** ($100M, **cumulative**). Suppose the company skips four quarterly dividends in a row. Each quarter it owed $2.5M, so $10M in total — and that money **doesn't vanish.** It becomes "dividends in arrears" that the company owes the F layer. Until it is caught up, the company can't pay anything to securities ranked below (Orange-D, the common), and can't buy them back either.
- **Orange-D** ($50M, **non-cumulative**). Same four skipped quarters, $1.25M each, $5M in total — **simply gone.** When the company resumes, it only has to pay the current quarter's $1.25M; the past is forgiven.

The same "10%" means "owed" in one case and "forget it" in the other. So the non-cumulative D layer must offer investors more to get sold — a higher yield, a lower price, or both. **Every word of the terms has a price.**

The term sheet has several other switches that matter just as much:

- **Perpetual and callable.** A preferred usually has no maturity, but the issuer often has the right to buy it back at par after some date. That is **an option held by the issuer**: when rates fall, the issuer redeems the old high-dividend preferred and issues a new cheaper one, and your high yield is taken away.
- **Liquidation preference.** In a liquidation, preferred holders get this amount (usually par plus unpaid dividends) back before the common gets anything.
- **Dividend stopper.** As long as the preferred dividend is unpaid, the common can't receive dividends and the company can't buy back common. This is the preferred holder's most practical set of teeth.
- **Convertibility, payment in kind (PIK), fundamental-change puts, floating or variable rates.** Each one tunes the ratio of "debt-like" to "equity-like."

This lesson sits on **Idea ② (balance sheets & claims)** — the terms are the precise definition of the claim — and on **Idea ④ (risk & leverage)**: cumulative or not, callable or not, fixed or floating, each is a way of re-slicing risk between issuer and investor.

The new-era payoff is very concrete. Strategy's and Strive's preferreds form a "family" precisely because each series sets these switches differently — some cumulative, some not; some convertible into common; some with a rate reset every month. Stage 17.3, Stage 17.4 and Stage 17.5 check the real terms item by item. Today we learn to recognize each switch.

**In this lesson we break it into six pieces:**

- **① The term sheet: a preferred's genetic code**
- **② Cumulative vs non-cumulative: where skipped dividends go**
- **③ Perpetual and callable: the option in the issuer's hands**
- **④ Liquidation preference and dividend stoppers: the preferred's teeth**
- **⑤ Conversion, payment in kind and fundamental-change puts**
- **⑥ Fixed, floating and variable rates: taking duration out**
`,

  mechanics: `
### ① The term sheet: a preferred's genetic code

Every preferred issue comes with a prospectus and, inside it, a summary of terms. Read it against a fixed checklist:

<table class="pm">
<tr><th>Term</th><th>Question it answers</th><th>Orange-F (illustrative)</th><th>Orange-D (illustrative)</th></tr>
<tr><td><b>Liquidation preference / stated amount</b></td><td>What's the most I get back in a liquidation?</td><td>$100 a share + unpaid dividends</td><td>$100 a share + declared but unpaid current dividend</td></tr>
<tr><td><b>Dividend rate</b></td><td>How much a year?</td><td>10%, fixed</td><td>10%, fixed</td></tr>
<tr><td><b>Cumulative?</b></td><td>Do skipped dividends have to be made up?</td><td>Cumulative; arrears compound at the dividend rate</td><td>Non-cumulative; skipped means lost</td></tr>
<tr><td><b>Frequency</b></td><td>How often is it paid?</td><td>Quarterly</td><td>Quarterly</td></tr>
<tr><td><b>Term</b></td><td>Is principal ever repaid?</td><td>Perpetual</td><td>Perpetual</td></tr>
<tr><td><b>Issuer call</b></td><td>Can the issuer buy it back?</td><td>At $100 + unpaid dividends (conditions apply)</td><td>Same</td></tr>
<tr><td><b>Holder put</b></td><td>Can I force the company to buy it back?</td><td>Yes, on a "fundamental change"</td><td>Same</td></tr>
<tr><td><b>Ranking</b></td><td>Who is ahead of me and behind me?</td><td>Behind all debt; ahead of D and common</td><td>Behind F; ahead of common</td></tr>
<tr><td><b>Dividend stopper</b></td><td>If I'm unpaid, can anyone below me be paid?</td><td>While in arrears, no payments or buybacks for D or common</td><td>If the current dividend is unpaid, none for common</td></tr>
<tr><td><b>Voting rights</b></td><td>When do I get a say?</td><td>Usually none; board seats after prolonged arrears (common design)</td><td>Usually none</td></tr>
</table>

Orange Corp is a teaching toy and these terms are **illustrative** — but they are assembled from the most common designs in the real market. You can fill in this table line by line for any real preferred. **Any box you can't fill in is a risk you don't yet understand.**

### ② Cumulative vs non-cumulative: where skipped dividends go

This is the single most important switch. The figure shows one scenario — four quarters skipped, then payments resume — under each set of terms:

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Four skipped dividends: cumulative (F layer) vs non-cumulative (D layer)</text><text x="20" y="48" font-size="12" font-weight="700" fill="var(--orange-ink)">Orange-F cumulative</text><text x="20" y="178" font-size="12" font-weight="700" fill="var(--blue)">Orange-D non-cumulative</text><line x1="60" y1="140" x2="620" y2="140" stroke="var(--line)"/><line x1="60" y1="270" x2="620" y2="270" stroke="var(--line)"/><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="95" y="154">Q1</text><text x="160" y="154">Q2</text><text x="225" y="154">Q3</text><text x="290" y="154">Q4</text><text x="355" y="154">Q5</text><text x="420" y="154">Q6</text><text x="485" y="154">Q7</text><text x="550" y="154">Q8</text><text x="95" y="284">Q1</text><text x="160" y="284">Q2</text><text x="225" y="284">Q3</text><text x="290" y="284">Q4</text><text x="355" y="284">Q5</text><text x="420" y="284">Q6</text><text x="485" y="284">Q7</text><text x="550" y="284">Q8</text></g><rect x="80" y="115" width="30" height="25" fill="var(--orange)"/><rect x="145" y="115" width="30" height="25" fill="var(--orange)"/><rect x="210" y="115" width="30" height="25" fill="none" stroke="var(--red)" stroke-dasharray="3 2"/><rect x="275" y="115" width="30" height="25" fill="none" stroke="var(--red)" stroke-dasharray="3 2"/><rect x="340" y="115" width="30" height="25" fill="none" stroke="var(--red)" stroke-dasharray="3 2"/><rect x="405" y="115" width="30" height="25" fill="none" stroke="var(--red)" stroke-dasharray="3 2"/><rect x="470" y="32" width="30" height="108" fill="var(--orange)"/><text x="485" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="var(--surface)" transform="rotate(-90 485 86)">paid 10.4 + 2.5</text><rect x="535" y="115" width="30" height="25" fill="var(--orange)"/><polyline points="240,108 305,96 370,84 435,72" fill="none" stroke="var(--red)" stroke-width="2"/><text x="250" y="66" font-size="10" fill="var(--red)">arrears build up (with compounding) ≈ 10.38</text><rect x="80" y="245" width="30" height="25" fill="var(--blue)"/><rect x="145" y="245" width="30" height="25" fill="var(--blue)"/><rect x="210" y="245" width="30" height="25" fill="none" stroke="var(--red)" stroke-dasharray="3 2"/><rect x="275" y="245" width="30" height="25" fill="none" stroke="var(--red)" stroke-dasharray="3 2"/><rect x="340" y="245" width="30" height="25" fill="none" stroke="var(--red)" stroke-dasharray="3 2"/><rect x="405" y="245" width="30" height="25" fill="none" stroke="var(--red)" stroke-dasharray="3 2"/><rect x="470" y="245" width="30" height="25" fill="var(--blue)"/><rect x="535" y="245" width="30" height="25" fill="var(--blue)"/><text x="322" y="232" text-anchor="middle" font-size="10" fill="var(--red)">4 quarters × 1.25 = 5.0: lost for good</text><text x="580" y="110" font-size="10" fill="var(--muted)">figures</text><text x="580" y="124" font-size="10" fill="var(--muted)">in $M</text></svg><figcaption>When payments resume in Q7, the F layer ($2.5M a quarter) is caught up in one go, about $10.38M; the D layer ($1.25M a quarter) is paid only the current quarter, and the skipped $5M never comes back.</figcaption></figure>

The rules, precisely:

- **Cumulative.** Unpaid dividends are recorded as arrears and **must be paid in full before any junior security receives anything.** Many terms also make the arrears **compound** (at the dividend rate or even higher), so the longer the skip, the bigger the debt. \\(\\text{F layer's four-quarter arrears} = \\$10\\text{M} + \\text{about}\\ \\$0.38\\text{M of compounding} \\approx \\mathbf{\\$10.38\\text{M}}\\).
- **Non-cumulative.** A dividend the board never declared is **never owed.** On resumption only the current dividend is due. A bank's Additional Tier 1 capital must be non-cumulative precisely so the bank genuinely keeps that cash in a crisis.

For investors, the difference is less about "will the company eventually pay" than about **bargaining power.** Cumulative arrears are a mountain of debt that grows higher over time and stands in front of every junior security. If the company wants to pay a common dividend, issue a new junior preferred or buy back stock, it has to move that mountain first. Non-cumulative has no mountain — only a "current-period stopper" (no payments to juniors this quarter if this quarter's preferred dividend was skipped).

So **non-cumulative has to pay more.** Within one company, the non-cumulative layer ranks lower and has weaker terms, so it naturally demands a higher yield — which is why, in practice, non-cumulative series tend to trade at lower prices (higher yields).

### ③ Perpetual and callable: the option in the issuer's hands

"Perpetual" is perpetual only for the investor — **the issuer usually keeps the right to call.** A classic bank preferred is typically callable at par five years after issue. DAT preferreds have various call conditions (for example a "clean-up" call once only a small amount remains outstanding, or a call on certain tax events); you have to read the specific terms.

The call right is **a call option held by the issuer**, and it gives the preferred **negative convexity**:

- When rates rise, the preferred falls like a perpetuity (Stage 6.2's \\(\\$25 \\to \\$21.43\\)).
- When rates fall, it "should" rise to $30 (\\(\\$1.50 \\div 5\\% = \\$30\\)), but the issuer would redeem at $25 and issue new paper at 5%. So the market only pays roughly what it's worth held to the call date. If callable in five years, discounting at 5% gives about **$26.10**, far below $30.

**Negative convexity**: it falls like a perpetual (full loss) but rises like a short bond (capped by the call price). So there are two yields to check — current yield and yield to call — and the worse of the two is the yield to worst:

$$
\\text{current yield} = \\frac{\\text{dividend}}{\\text{price}}
\\text{yield to worst} = \\min\\left(\\text{current yield},\\ \\text{yield to call}\\right)
$$

The practical rule: **for a callable preferred trading above its call price, look at yield to call, not current yield** — current yield overstates what you'll actually earn. When Stage 18.1 values DAT preferreds, it computes both.

### ④ Liquidation preference and dividend stoppers: the preferred's teeth

The **liquidation preference**, often called the **stated amount**, is what preferred holders get back ahead of the common when the company is liquidated or wound up — usually **par plus unpaid dividends.**

Two frequent misreadings:

- It ranks **behind all debt.** Take Orange Corp from Stage 6.1: once bitcoin drops below about $22,000, the F layer's liquidation preference can no longer be paid in full, even though the contract says $100.
- It is a **ceiling**, not a guarantee. The liquidation preference tells you the most you can get; what you actually get is decided by the waterfall of Stage 6.1.

The **dividend stopper** is the preferred's set of teeth while the company is a going concern: as long as the preferred dividend is unpaid (for a cumulative issue, as long as arrears remain), the company **cannot** make distributions to junior securities or buy them back.

For a company that pays a common dividend, the stopper bites hard: management that doesn't want to cut the common dividend has to protect the preferred dividend first. For a DAT that **pays no common dividend**, the teeth bite elsewhere: they block **junior preferred dividends** and **common buybacks.** Think of the scenario in Stage 18.3 — when mNAV falls below 1, the company may want to buy back common; if the F layer is in arrears, that road is closed. **The terms are gears that mesh with one another.**

There is one more small tooth: **voting rights triggered by prolonged arrears.** Many listed preferreds provide that once dividends have been unpaid for a certain number of periods (six quarters is common), preferred holders may elect a number of directors until the arrears are cleared. That can't force the company to pay, but it puts the preferred's voice in the boardroom.

### ⑤ Conversion, payment in kind and fundamental-change puts

- **Convertible preferred.** Holders can exchange the preferred for common at a set ratio. For example, a $100 stated amount with a $25 conversion price converts into \\(100 \\div 25 = 4\\) common shares. It is "a preferred plus a call option on the common," so it can pay a lower dividend (investors trade income for upside). It is the same idea as the convertible bond in Stage 6.4, built on a preferred foundation instead of a debt foundation.
- **Payment in kind (PIK).** The terms let the company pay dividends in **additional securities** (more preferred or common shares) instead of cash. For the issuer it is a cash-saving valve; for the holder it means receiving paper that may have to be sold at a discount — and it means **diluting** everyone else.
- **Fundamental-change put.** If the company is acquired, delisted or goes through a similar major change, holders can require the company to repurchase at the stated amount (plus unpaid dividends). It protects investors from finding themselves holding a claim on a completely different issuer.

All three are common in DAT preferreds, because they all answer the same question: **when bitcoin and the stock swing violently, who keeps the upside, who takes the downside, and who has the right to leave?**

### ⑥ Fixed, floating and variable rates: taking duration out

Stage 6.2 worked out that a 6% perpetual fixed-rate preferred has a modified duration of about 16.7 — more rate-sensitive than a 30-year Treasury. A major direction in term design is **taking that rate risk out**:

<table class="pm">
<tr><th>Rate type</th><th>How it is set</th><th>Duration</th><th>Who bears rate risk</th></tr>
<tr><td><b>Fixed</b></td><td>\\(\\text{par} \\times \\text{fixed rate}\\), forever</td><td>Very long (\\(\\approx 1/y\\))</td><td>The investor</td></tr>
<tr><td><b>Fixed-to-floating</b></td><td>Fixed for, say, 5 years, then reset to a benchmark (e.g. SOFR) + fixed spread</td><td>Roughly to the reset date</td><td>Mostly the issuer after the reset</td></tr>
<tr><td><b>Variable (issuer-adjusted)</b></td><td>The issuer adjusts the rate periodically (e.g. monthly), aiming to keep the price near par</td><td>Very short (ideally)</td><td>Mostly the issuer — if it is willing and able to adjust</td></tr>
</table>

The last one is a new-era innovation. Stage 17.4 covers Strategy's STRC, whose rate is adjusted monthly with a target price of about $100; Strive's SATA also uses a variable-rate design (Stage 17.5). The logic is simple: **price below par → raise the dividend rate → the higher yield attracts buyers → price returns toward par.** The catch: the moment the issuer is unwilling or unable to keep raising the rate, the anchor fails, and the security turns back into a credit-sensitive perpetual.

All of this can be compressed into one reading principle: **every switch answers the question "on a bad day, who bears the loss?"** Cumulative pushes the loss back onto the issuer; non-cumulative leaves the investor to swallow it; the call right keeps the benefit of falling rates for the issuer; a variable rate pushes rate risk onto the issuer; PIK turns cash pressure into dilution. **This lesson explains mechanisms and analytical frameworks only and is not investment advice; for any real security, its offering documents govern.**
`,

  demo: "preferred-terms",

  analogy: `
Think of a preferred's terms as **the riders attached to a long-term lease.**

The basic clause is the same for everyone: $2.5M in rent every quarter. The differences live in the riders.

- **The cumulative rider** says: "If the tenant (the company) misses a quarter, it's owed; the arrears accrue interest; and until they're cleared, the tenant may not give its own kids (the common) any pocket money."
- **The non-cumulative rider** says: "A missed quarter is forgiven; just pay next quarter as normal." Naturally the landlord (the investor) charges more rent for that lease.
- **The call rider** says: "The tenant may cancel at the original price at any time." When market rents collapse, the tenant cancels and signs somewhere cheaper; when market rents soar, the tenant never cancels. The benefit is always on the tenant's side, so the landlord charges for this rider.
- **The variable-rate rider** says: "We'll renegotiate the rent every month so this lease can always be resold at its original price." The landlord no longer fears changes in market rents — but has to trust that the tenant really will adjust as promised.

Two leases both described as "10%" can be worth completely different amounts once you read the riders. **Read the contract starting with the riders.**
`,

  misconceptions: [
    "**\"A cumulative preferred's dividends will definitely be paid, so it's riskless.\"** — Cumulative only guarantees the money is owed, not that it can be paid. In a liquidation the arrears are added to the liquidation preference, but it still ranks behind all debt; if assets run short, however much is owed stays a number on paper.",
    "**\"A perpetual preferred can never be taken away, so I can lock in a high yield forever.\"** — \"Perpetual\" binds only the investor. The issuer usually holds a call: when rates fall and your high yield is most valuable is exactly when it is most likely to be redeemed at par (negative convexity).",
    "**\"Current yield is my return.\"** — When the price is above the call price, your real return is the yield to call, usually lower; when the price is below par, you also have to ask whether you can ever exit at par. Yield to worst is the safe number to use.",
    "**\"Cumulative vs non-cumulative is a minor detail; if the yields match, who cares.\"** — It is one of the biggest differences in the terms. Skipped non-cumulative dividends vanish for good, while cumulative ones form a mountain in front of every junior security. At equal yields, the non-cumulative one is the more expensive (worse) deal for the investor.",
    "**\"A variable-rate preferred always trades near par.\"** — Only as long as the issuer is willing and able to keep raising the rate. Once credit deteriorates and the issuer stops raising, the anchor fails and it falls below par like any credit-sensitive perpetual.",
  ],

  quiz: [
    {
      q: "Orange-F (cumulative, $2.5M a quarter) has skipped four quarters. Until the arrears are cleared, can the company pay a dividend on Orange-D?",
      options: [
        "Yes, because the D layer has its own dividend obligation",
        "Yes, as long as the D layer's rate is higher",
        "No: until cumulative arrears are cleared, junior securities can't receive distributions (the dividend stopper)",
        "No, but it can buy back common stock",
      ],
      answer: 2,
      explain: "**Cumulative + dividend stopper**: until the F layer's arrears (about $10.38M with compounding) are paid, neither the D layer nor the common can be paid or bought back. That is the cumulative preferred's bite.",
    },
    {
      q: "A $25 preferred pays 6% and is callable at par in five years. If market rates fall from 6% to 5%, why won't its price get anywhere near $30?",
      options: [
        "Because the issuer will likely call at $25 and refinance cheaper, so the market prices it to the call date — about $26",
        "Because preferred prices don't respond to rates",
        "Because the perpetuity formula only applies to bonds",
        "Because the dividend is automatically cut",
      ],
      answer: 0,
      explain: "That's **negative convexity**: it falls like a perpetual when rates rise but is capped by the call price when rates fall. Discounting at 5% to a call in five years gives about $26.10.",
    },
    {
      q: "For an investor, at the same company and the same 10% rate, how does a non-cumulative preferred compare with a cumulative one?",
      options: [
        "They are exactly equivalent",
        "Non-cumulative is better because it ranks higher",
        "Non-cumulative is better because its dividend is steadier",
        "Non-cumulative is worse: skipped dividends are lost for good, so the market demands a higher yield (lower price)",
      ],
      answer: 3,
      explain: "Non-cumulative leaves the whole loss from a skipped dividend with the investor, and there is no arrears mountain standing in front of juniors. **Weaker terms → higher required yield.**",
    },
    {
      q: "What risk does a fundamental-change put protect against?",
      options: [
        "Price declines caused by rising rates",
        "After a takeover, delisting or similar event, your security becomes a claim on a completely different issuer",
        "Skipped dividends",
        "A fall in the price of bitcoin",
      ],
      answer: 1,
      explain: "On a **fundamental change** (change of control, delisting and the like), holders can require repurchase at the stated amount plus unpaid dividends, instead of being stuck with a new and possibly worse issuer.",
    },
    {
      q: "A variable-rate preferred has its dividend reset monthly to keep the price near par. What is the key precondition for that to work?",
      options: [
        "Bitcoin must keep rising",
        "The Federal Reserve must cut rates",
        "The issuer must be willing and able to keep raising the rate whenever the price is below par",
        "It must be cumulative",
      ],
      answer: 2,
      explain: "A variable rate pushes rate risk onto the issuer, and **the anchor is only as reliable as the issuer's willingness and ability.** If credit deteriorates and the issuer stops raising, it falls below par like any credit-sensitive perpetual (Stage 17.4).",
    },
  ],

  further: [
    { label: "SEC Investor.gov: Preferred Stock (terms and risks)", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/preferred-stock" },
    { label: "Corporate Finance Institute: Negative Convexity (why callable securities are capped)", url: "https://corporatefinanceinstitute.com/resources/fixed-income/negative-convexity/" },
    { label: "SEC EDGAR full-text search: read any preferred's prospectus in the original", url: "https://www.sec.gov/edgar/search/" },
    { label: "Strategy: terms of each preferred series (check the latest official documents)", url: "https://www.strategy.com/" },
  ],
};
