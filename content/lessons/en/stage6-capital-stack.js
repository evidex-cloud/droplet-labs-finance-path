export default {
  id: "capital-stack",
  stage: 6,
  order: 1,
  title: "The Capital Stack: A Company's Floor Plan & the Order of Payment",
  difficulty: "core",
  prereqs: ["what-is-stock", "credit-spreads"],

  oneLiner:
    "Where a company's money comes from decides who gets paid back first when things go wrong. **The capital stack is a floor plan: secured debt lives on the top floor, then senior unsecured debt, subordinated debt and preferred stock, with common stock in the basement.** Asset value pours in from the top like water; until one floor is full, the floor below gets nothing. Read this picture and you understand why the bonds, preferreds and shares of one and the same company carry wildly different risk and return — and you have the blueprint behind every digital asset treasury company from Stage 15 onward.",

  intuition: `
Imagine you and three friends open a bakery. You need $1 million in total.

- A bank lends you $300,000 on one condition: **the ovens and the shop are its collateral.** If things go wrong, that equipment goes to the bank first.
- An uncle lends you $250,000 on a signed note at 6% a year — **but with no collateral.**
- An old classmate lends $150,000 at a higher rate, 10%, but signs a clause that says: **"If the shop fails, I get paid only after the bank and the uncle are made whole."**
- A neighbor puts in $100,000 in exchange for a promise: "a fixed 8% payout every year, paid to me before any of you owners take a cent." That is **preferred stock**.
- The remaining $200,000 comes out of your own four pockets. That is **common stock**: nobody promises you anything, but **whatever the bakery earns after paying everyone above you is yours.**

In good years everyone is happy. The bank collects interest, the uncle collects interest, the classmate collects interest, the neighbor collects the payout, and every dollar of profit left over belongs to the owners. The more the bakery earns, the happier the owners — because every layer above them is paid a **fixed amount**.

And in a bad year? Say the shop is forced to sell and fetches only $600,000. How is it divided? **Floor by floor, pouring water from the top down.** The bank takes its full $300,000. The uncle takes his full $250,000. Only $50,000 is left for the classmate, who lent $150,000 and gets back a third. The neighbor gets nothing. The owners lose everything.

That is the core of this lesson: **every financing instrument is a claim, and claims stand in a line.** The line is called **seniority**, and when you draw it from top to bottom you get the **capital stack**. It sits squarely on the course's **Idea ② (balance sheets & claims)**: every line on the right-hand side of a balance sheet tells you not just "how much is owed" but "where you stand in the queue when things go wrong." It also plugs into **Idea ④ (risk & leverage)**: the lower the floor, the more risk it absorbs and the higher the return it demands — and common stock amplifies a company's fortunes precisely because every floor above it takes a fixed amount.

You have already met the parts separately. The bond in Stage 4.1 is "a floor that collects a fixed amount." The credit spread in Stage 4.6 is the price of "this floor might not get paid in full." The share in Stage 5.1 is "whatever is left over is yours." This lesson **stacks them into one building**. The next five lessons inspect it floor by floor: Stage 6.2 and Stage 6.3 cover preferred stock, wedged in the middle; Stage 6.4 covers the convertible bond, which can move downstairs from debt to equity; Stage 6.5 teaches you to measure how thick each floor's cushion is; and Stage 6.6 covers the rules for when the building actually collapses.

Why does this matter so much for the new era of finance? Because the **digital asset treasury company (DAT)** of Stage 15.1 is, at heart, **a carefully engineered building**: bitcoin is the foundation, convertible notes and several grades of preferred stock occupy the upper floors, and common stock lives in the basement. The course's toy company, Orange Corp — 10,000 BTC, a BTC NAV of $1 billion — makes its first appearance in this lesson as a floor plan. The BTC Rating of Stage 16.5 and the seniority walk-through of Stage 17.6 are both built on today's picture.

**In this lesson we break it into six pieces:**

- **① Two kinds of contract: fixed claims and the residual claim**
- **② The floor plan: from secured debt down to common stock**
- **③ The waterfall: money flows from the top floor down**
- **④ How the order gets written: security, contractual and structural subordination**
- **⑤ Risk and return rise floor by floor: common stock is a call option**
- **⑥ Orange Corp's floor plan: a first look at a DAT capital stack**
`,

  mechanics: `
### ① Two kinds of contract: fixed claims and the residual claim

Companies raise money with just two kinds of contract; everything else is a variation.

- **A fixed claim** states exactly what you are owed: principal, interest, a fixed dividend, a liquidation preference. Once you have been paid that, you are done — no matter how much more the company earns. Bonds, loans and most preferred stock are fixed claims.
- **The residual claim** only states: "whatever is left after everyone else has been paid is yours." It has no ceiling, and it can go to zero. That is common stock, the subject of Stage 5.1.

Read the balance sheet vertically and you get one identity:

$$
Asset value = sum of all fixed claims + common equity (the residual)
Common equity = max(0, asset value − sum of all fixed claims)
$$

The max(0, …) in the second line is the single most important symbol in this lesson. **Shareholders have limited liability**: they can lose everything they put in, but they never owe more. That "floor at zero, no ceiling" shape turns out to be an option, as piece ⑤ will show.

Note that "fixed" describes the **contractual amount**, not the **market price**. A bond with a $1,000 face value says $1,000 on the contract forever, but what it trades for depends on whether investors think it **will actually be paid in full** — and that is exactly what the credit spread of Stage 4.6 prices.

### ② The floor plan: from secured debt down to common stock

A typical company's capital stack, from the top (paid first) to the bottom (paid last), looks roughly like this:

<table class="pm">
<tr><th>Floor</th><th>Typical instruments</th><th>Standing when things go wrong</th><th>Required return (stylized)</th></tr>
<tr><td><b>Top floor: secured debt</b></td><td>Bank loans, mortgage bonds</td><td>First call on specific assets (plant, inventory, receivables)</td><td>Lowest</td></tr>
<tr><td><b>Senior unsecured debt</b></td><td>Ordinary corporate bonds, most convertibles</td><td>No collateral, but ahead of all subordinated debt</td><td>Low</td></tr>
<tr><td><b>Subordinated debt</b></td><td>Subordinated notes, mezzanine debt</td><td>Contract says "behind senior debt"</td><td>Medium</td></tr>
<tr><td><b>Preferred stock</b></td><td>Fixed-dividend preferreds</td><td>Behind all debt, ahead of common</td><td>Higher</td></tr>
<tr><td><b>Basement: common stock</b></td><td>Common shares</td><td>Residual claim, paid last</td><td>Highest</td></tr>
</table>

Drawn as a building, it looks like the figure below. Asset value is poured in at the top, fills each floor, and spills downward; the lower the floor, the sooner it stays dry.

<figure><svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Capital stack floor plan: Maple Manufacturing (assets $100M, figures in $M)</text><rect x="150" y="46" width="200" height="50" rx="4" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="250" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Secured bank loan 30</text><text x="250" y="85" text-anchor="middle" font-size="10" fill="var(--muted)">plant and equipment as collateral</text><rect x="150" y="100" width="200" height="44" rx="4" fill="var(--blue-soft)" stroke="var(--blue)" opacity=".85"/><text x="250" y="121" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Senior unsecured bonds 25</text><text x="250" y="136" text-anchor="middle" font-size="10" fill="var(--muted)">6% coupon</text><rect x="150" y="148" width="200" height="40" rx="4" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="250" y="167" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Subordinated notes 15</text><text x="250" y="181" text-anchor="middle" font-size="10" fill="var(--muted)">10% coupon</text><rect x="150" y="192" width="200" height="36" rx="4" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="250" y="215" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Preferred stock 10 (8% dividend)</text><rect x="150" y="236" width="200" height="56" rx="4" fill="var(--green-soft)" stroke="var(--green)"/><text x="250" y="260" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Common stock = residual 20</text><text x="250" y="277" text-anchor="middle" font-size="10" fill="var(--muted)">no ceiling, can go to zero</text><line x1="140" y1="232" x2="360" y2="232" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="5 3"/><text x="366" y="236" font-size="10" fill="var(--muted)">ground line: fixed claims above</text><line x1="120" y1="50" x2="120" y2="288" stroke="var(--orange)" stroke-width="2.5"/><polygon points="114,280 126,280 120,292" fill="var(--orange)"/><text x="112" y="120" text-anchor="end" font-size="11" font-weight="600" fill="var(--orange-ink)">paid first</text><text x="112" y="270" text-anchor="end" font-size="11" font-weight="600" fill="var(--orange-ink)">paid last</text><line x1="520" y1="288" x2="520" y2="50" stroke="var(--red)" stroke-width="2.5"/><polygon points="514,58 526,58 520,46" fill="var(--red)"/><text x="530" y="80" font-size="11" font-weight="600" fill="var(--red)">risk ↑</text><text x="530" y="96" font-size="11" font-weight="600" fill="var(--red)">return ↑</text><text x="530" y="112" font-size="10" fill="var(--muted)">(read downward)</text><text x="382" y="72" font-size="10" fill="var(--muted)">cumulative 30</text><text x="382" y="124" font-size="10" fill="var(--muted)">cumulative 55</text><text x="382" y="170" font-size="10" fill="var(--muted)">cumulative 70</text><text x="382" y="212" font-size="10" fill="var(--muted)">cumulative 80</text><text x="320" y="318" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="600">Once asset value falls below a floor's cumulative line, that floor starts losing principal</text></svg><figcaption>One company, one pile of assets, five kinds of claim. The "cumulative" figures on the right are each floor's safety line: below 70, the subordinated notes start to lose; below 55, the senior bonds do.</figcaption></figure>

The picture hides a reading that people routinely miss: **to judge how safe a floor is, don't look at how big that floor is — look at how big it is together with every floor above it.** The subordinated notes are only $15M, but their safety line is $70M, because $55M of claims sit on top of them. The asset coverage ratio of Stage 6.5 and the BTC Rating of Stage 16.5 both measure this cumulative line.

### ③ The waterfall: money flows from the top floor down

Turn "fill each floor in order" into an algorithm and you get the **waterfall**. The waterfall function in the course's shared engine does exactly one thing: starting from the top floor with a given asset value, each floor takes min(what's left, its claim), the remainder flows down, and whatever survives the last floor goes to the common.

Run three scenarios for Maple Manufacturing (figures in $M):

<table class="pm">
<tr><th>Asset value</th><th>Secured loan 30</th><th>Senior bonds 25</th><th>Sub notes 15</th><th>Preferred 10</th><th>Common</th></tr>
<tr><td>120 (business booming)</td><td>30 (100%)</td><td>25 (100%)</td><td>15 (100%)</td><td>10 (100%)</td><td><b>40</b></td></tr>
<tr><td>80 (just enough)</td><td>30 (100%)</td><td>25 (100%)</td><td>15 (100%)</td><td>10 (100%)</td><td><b>0</b></td></tr>
<tr><td>60 (trouble)</td><td>30 (100%)</td><td>25 (100%)</td><td>5 (33%)</td><td>0 (0%)</td><td>0</td></tr>
<tr><td>40 (serious trouble)</td><td>30 (100%)</td><td>10 (40%)</td><td>0</td><td>0</td><td>0</td></tr>
</table>

Stare at that table and notice three things.

- **Assets fall from 120 to 80 (−33%). Creditors are untouched; the common falls from 40 to 0 (−100%).** That is leverage: the fixed claims above stay put, so every bit of volatility is squeezed into the basement.
- **Recovery is not linear.** The same 20-point drop in assets (60 to 40) takes the subordinated notes from 33% to zero and the senior bonds from 100% to 40%, while the secured loan doesn't flinch. Each floor only starts to hurt once asset value falls into its own band.
- **Seniority is only worth something in bad times.** At 120, the secured lender and the shareholders both collect everything their contracts promise; only at 40 does the difference between the two contracts show. That is why senior debt accepts low interest: it is buying **insurance against bad days**.

Real waterfalls are messier. Bankruptcy itself costs money (lawyers, advisers). Unpaid wages and some taxes enjoy statutory priority. A secured creditor has priority only over **its own collateral**, and any shortfall on that collateral becomes an unsecured claim. Stage 6.6 fills in all these details. But the skeleton is always this table.

### ④ How the order gets written: security, contractual and structural subordination

The floors are not natural facts. Three legal tools write them.

- **Security.** A creditor holds a lien on **specific assets**; when things go wrong, the proceeds of those assets repay that creditor first. Mortgages, equipment finance and revolving credit lines backed by inventory and receivables all work this way. **The more specific the lien and the easier the collateral is to sell, the safer the floor.**
- **Contractual subordination.** A subordinated note says in plain words: "this debt ranks behind senior debt in right of payment." The lender **volunteers** to stand one floor lower in exchange for more interest. Preferred stock sits behind all debt by nature — legally it is **equity**, not a liability.
- **Structural subordination.** This is the one people miss. If the debt is borrowed by the **parent company** but the assets live in a **subsidiary**, the subsidiary's creditors — even its ordinary suppliers — get paid out of the subsidiary's assets first. The parent's creditors only get the subsidiary's leftover equity. **Two bonds can both be called "senior," yet which legal entity issued them can make a huge difference.**

One more wrinkle: the floors are not the whole story; **maturity** matters too. A subordinated note due next year gets repaid first if the company survives until next year — even though it would rank lower in a bankruptcy. Call it "priority in time." It will come back in Stage 6.4 (convertible put dates) and Stage 18.2 (stress tests). **Seniority governs how the pie is split on the day of failure; the maturity schedule governs who gets to leave before that day.**

### ⑤ Risk and return rise floor by floor: common stock is a call option

The lower the floor, the more of the bad days it absorbs, so investors demand more. That is not a moral judgment; it is pricing. The formula from Stage 4.6 — expected loss = probability of default × loss given default — holds on every floor. Lower floors simply lose more when default happens (they recover less), so their spreads must be wider.

A deeper way to see it comes from Robert Merton (1974): **common stock is a call option on the company's assets with a strike price equal to all of its debt.**

$$
Common equity value (at maturity) = max(0, asset value − total debt)
which is exactly a call option's payoff: max(0, underlying price − strike)
$$

This lens explains a lot.

- **The more volatile the assets, the more the equity is worth (option value rises with volatility), and the worse off the creditors.** That is why bond contracts carry covenants that stop shareholders from "betting the company."
- **The closer a company gets to insolvency, the more its stock behaves like a lottery ticket**: cheap, but with enormous sensitivity. Its bonds, meanwhile, start to behave like equity, rising and falling with the value of the assets.
- Flip it around: **creditors have effectively sold a put option.** In good times they collect only fixed interest; in bad times they absorb the fall in asset value. The credit spread is the premium on that put.

The option lens will get sharper after you study options in Stage 7.2, and it is especially vivid for DATs. Bitcoin is extremely volatile, so the call option that is a DAT's common stock is unusually valuable — one of the threads Stage 16.2 pulls when it explains why mNAV premiums exist.

### ⑥ Orange Corp's floor plan: a first look at a DAT capital stack

Now put the same ruler against the course's toy company. **Orange Corp** holds 10,000 BTC. At a bitcoin price of $100,000, its BTC NAV is $1 billion, and it also holds $30 million in cash. Here is its floor plan:

<figure><svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Orange Corp's capital stack: a foundation made of bitcoin</text><rect x="60" y="44" width="230" height="46" rx="4" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="175" y="64" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Convertible notes $150M</text><text x="175" y="80" text-anchor="middle" font-size="10" fill="var(--muted)">0% coupon · conversion price $25</text><rect x="60" y="94" width="230" height="40" rx="4" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="175" y="112" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Orange-F senior preferred $100M</text><text x="175" y="126" text-anchor="middle" font-size="10" fill="var(--muted)">10% · cumulative</text><rect x="60" y="138" width="230" height="34" rx="4" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="175" y="154" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Orange-D junior preferred $50M</text><text x="175" y="167" text-anchor="middle" font-size="10" fill="var(--muted)">10% · non-cumulative</text><rect x="60" y="178" width="230" height="56" rx="4" fill="var(--green-soft)" stroke="var(--green)"/><text x="175" y="202" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Common: 100M shares</text><text x="175" y="219" text-anchor="middle" font-size="10" fill="var(--muted)">residual claim (net value about $730M)</text><rect x="40" y="246" width="270" height="44" rx="4" fill="var(--btc-soft)" stroke="var(--btc)" stroke-width="2"/><text x="175" y="266" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Foundation: 10,000 BTC ≈ $1B</text><text x="175" y="282" text-anchor="middle" font-size="10" fill="var(--muted)">+ cash / USD reserve $30M</text><text x="330" y="62" font-size="11" font-weight="600" fill="var(--ink)">cumulative $150M</text><text x="330" y="78" font-size="11" fill="var(--btc)" font-weight="700">coverage ≈ 6.7x</text><text x="330" y="110" font-size="11" font-weight="600" fill="var(--ink)">cumulative $250M</text><text x="330" y="126" font-size="11" fill="var(--btc)" font-weight="700">coverage = 4.0x</text><text x="330" y="152" font-size="11" font-weight="600" fill="var(--ink)">cumulative $300M</text><text x="330" y="167" font-size="11" fill="var(--btc)" font-weight="700">coverage ≈ 3.3x</text><line x1="450" y1="60" x2="450" y2="280" stroke="var(--line)"/><text x="462" y="70" font-size="11" fill="var(--muted)">How far can BTC fall</text><text x="462" y="86" font-size="11" fill="var(--muted)">before this floor is hit?</text><text x="462" y="112" font-size="11" fill="var(--ink)">Converts: ~$12,000</text><text x="462" y="130" font-size="11" fill="var(--ink)">F layer: ~$22,000</text><text x="462" y="148" font-size="11" fill="var(--ink)">D layer: ~$27,000</text><text x="462" y="176" font-size="10" fill="var(--muted)">(counting the $30M cash,</text><text x="462" y="190" font-size="10" fill="var(--muted)">ignoring bankruptcy costs)</text><text x="320" y="316" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="600">Same building, new foundation: floors work identically, but the ground moves far more</text></svg><figcaption>Every floor of Orange Corp is a fixed claim; only the common in the basement absorbs bitcoin's full swings. Coverage = BTC NAV ÷ cumulative claims at that floor and above.</figcaption></figure>

A few numbers you will use again and again:

- **Cumulative claims**: converts $150M → plus the F layer, $250M → plus the D layer, $300M.
- **Asset coverage (the seed of the BTC Rating)**: $1B ÷ $150M ≈ **6.7x**; $1B ÷ $250M = **4.0x**; $1B ÷ $300M ≈ **3.3x**.
- **Impairment prices**: bitcoin has to fall to about $27,000 (assets = $270M of BTC + $30M cash = $300M) before the D layer loses principal, and to about $12,000 before the converts do. That is the intuitive meaning of a coverage ratio: **3.3x coverage ≈ bitcoin can fall about 70% and this floor is still paid in full** (a little more once you count the cash).
- **Amplification**: the common absorbs the swings of $1B of bitcoin, but its own net value is only $1B − $0.3B = $0.7B. So a 10% rise in bitcoin lifts the common's net value by about 14% — 10 / 7 ≈ **1.43x**. Stage 16.4 is devoted to this.

Compared with Maple Manufacturing, Orange Corp's building has two distinctive features. **There is no secured debt**: nobody holds a lien on the bitcoin, so there is no "fall below a line and get force-liquidated" margin call. And **the middle floors are mostly preferred stock rather than debt**: skipping a preferred dividend is not a default. Those two features are exactly the "leverage without margin calls" of Stage 15.3, and they are the starting point for Stage 17.6, where real companies are placed into this building and stress-tested with a bitcoin slider. Orange Corp is an illustrative toy; for any real company, the floors and terms are whatever its latest filings say.
`,

  demo: "capital-stack",

  analogy: `
Picture the capital stack as **terraced rice paddies on a hillside, fed by a reservoir at the top.**

The water in the reservoir is the value of the company's assets. The highest terrace belongs to the secured creditors, and when the sluice opens it fills first. Only when it is full does water spill to the second terrace (senior bonds), then the third (subordinated debt), then the fourth (preferred stock). Whatever is left runs down into the largest field at the foot of the hill: the common stock.

In a wet year every terrace fills and the bottom field is flooded — a bumper crop for the shareholders, while the terraces above can't use any extra water: their harvest is a fixed yield per acre. In a drought the reservoir only fills the top two terraces, the third gets a damp edge, and the bottom field cracks. **The same drought barely touches the top terrace and wipes out the bottom one.**

That is why each terrace pays a different rent. The top terrace is nearly drought-proof and rents cheaply. The bottom field is a bet on the weather: it rents dearly, but in a good year its harvest has no ceiling.

A DAT's paddies have one twist. The reservoir isn't fed by rain; it is **a bitcoin lake whose water level rises and falls violently.** When the lake is full, the bottom field's harvest is spectacular. When it recedes, how far it recedes and which terrace dries out first depends entirely on how high each terrace was built. Stage 6.5 teaches you to measure each terrace's height above the waterline; Stage 6.6 covers who divides the water in a real drought.
`,

  misconceptions: [
    "**\"Senior debt is safe.\"** — \"Senior\" is only a relative position. If asset value falls below the senior floor's cumulative line, it loses principal like anyone else — and a parent company's senior bonds can be structurally subordinated to a subsidiary's creditors. Judge safety by coverage and asset quality, not by the label.",
    "**\"Preferred stock is a kind of debt.\"** — Legally it is equity: it ranks behind all debt, skipping its dividend usually isn't a default, and its holders can't push the company into bankruptcy for it. It resembles debt only in collecting a fixed amount. Stage 6.2 is all about this hybrid identity.",
    "**\"If the company's assets fall 30%, the stock falls about 30%.\"** — With leverage, far more. Maple Manufacturing's assets fall from 120 to 80 (−33%), and its common falls from 40 to 0 (−100%). The fixed claims above don't move, so every bit of volatility is pushed into the common.",
    "**\"Seniority only matters in bankruptcy; day to day it's irrelevant.\"** — Day to day it sets the price of every floor: spreads, preferred yields and stock volatility all come from \"where do I stand on a bad day.\" The market prices the floor plan every day; bankruptcy just cashes it in.",
    "**\"A DAT holds so much bitcoin that every layer is equally safe.\"** — Coverage is cumulative. The same $1B of bitcoin covers the converts 6.7x but the D layer only 3.3x. A 70% fall in bitcoin leaves the converts comfortable and the D layer right at the edge.",
  ],

  quiz: [
    {
      q: "Maple Manufacturing is forced to sell its assets for $60M (secured loan 30, senior bonds 25, subordinated notes 15, preferred 10). What is the recovery on the subordinated notes?",
      options: [
        "100%, because 60 is bigger than 15",
        "About 33%: the first two floors take 55, leaving 5",
        "0%: subordinated debt never recovers anything in bankruptcy",
        "75%: everything is split pro rata across all creditors",
      ],
      answer: 1,
      explain: "**Fill floor by floor**: the secured loan takes 30, the senior bonds take 25, and only 5 reaches the subordinated notes: 5 / 15 ≈ 33%. Preferred and common get zero. A waterfall fills each floor in turn; it doesn't split pro rata.",
    },
    {
      q: "Why is common stock like a call option on the company's assets?",
      options: [
        "Because shareholders can swap their shares for bonds at any time",
        "Because share prices move every day",
        "Because the company can buy back its shares whenever it wants",
        "Because at maturity equity = max(0, assets − debt), the same payoff shape as a call",
      ],
      answer: 3,
      explain: "**Merton's model**: limited liability gives equity a floor at zero and no ceiling, with total debt as the strike. So the more volatile the assets, the more that option is worth — at the creditors' expense.",
    },
    {
      q: "Orange Corp has a BTC NAV of $1B, converts of $150M, Orange-F of $100M and Orange-D of $50M. What is the asset coverage of the Orange-F layer?",
      options: [
        "4.0x: $1B ÷ ($150M + $100M)",
        "10x: $1B ÷ $100M",
        "6.7x: $1B ÷ $150M",
        "3.3x: $1B ÷ $300M",
      ],
      answer: 0,
      explain: "Coverage uses **the cumulative claims at that floor and above**. The F layer has $150M of converts sitting on top of it, so the denominator is $250M: 1 / 0.25 = 4.0x. Using only its own $100M would badly overstate its safety.",
    },
    {
      q: "A parent company issues \"senior unsecured\" bonds, but almost all its assets sit in a subsidiary that has its own debt. What risk do the parent's bondholders face?",
      options: [
        "None — they're senior",
        "Contractual subordination: they agreed in the contract to rank lower",
        "Structural subordination: the subsidiary's creditors are paid from its assets first; the parent's bondholders only get the leftover equity",
        "Undercollateralization: their collateral has lost value",
      ],
      answer: 2,
      explain: "**Structural subordination** isn't written in any contract; it comes from the legal structure. The subsidiary's assets repay the subsidiary's creditors (suppliers included) first, and the parent only gets what's left. Which entity issued a \"senior\" bond matters a lot.",
    },
    {
      q: "Compared with a typical industrial company like Maple Manufacturing, what is most distinctive about Orange Corp's capital stack?",
      options: [
        "Orange Corp has no common stock",
        "Its foundation is highly volatile bitcoin, it has no secured debt, and its middle floors rely heavily on preferred stock",
        "Its preferred stock ranks ahead of its convertible notes",
        "It doesn't have to follow any order of payment",
      ],
      answer: 1,
      explain: "The floor logic is identical (debt → preferred → common). What differs is **the nature of the foundation** (bitcoin, not plant and cash flows) and **the building materials**: no liens, no margin calls, and middle floors made of preferreds whose skipped dividends aren't defaults.",
    },
  ],

  further: [
    { label: "Corporate Finance Institute: Capital Stack (a primer on the layers)", url: "https://corporatefinanceinstitute.com/resources/commercial-real-estate/capital-stack/" },
    { label: "Robert C. Merton (1974), On the Pricing of Corporate Debt: The Risk Structure of Interest Rates (equity as an option)", url: "https://doi.org/10.1111/j.1540-6261.1974.tb03058.x" },
    { label: "SEC Investor.gov: Bonds — basics of corporate bonds and priority", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds" },
    { label: "US Courts: Bankruptcy Basics (including priority of claims)", url: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics" },
  ],
};
