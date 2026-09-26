export default {
  id: "bankruptcy-recovery",
  stage: 6,
  order: 6,
  title: "Bankruptcy, Seniority & Recovery Rates: When Everything Goes Wrong",
  difficulty: "core",
  prereqs: ["capital-stack", "leverage-coverage"],

  oneLiner:
    "Day to day, the capital stack is an order written on paper. **On the day of bankruptcy it is cashed in for real money.** US bankruptcy law offers two roads: Chapter 7 liquidation (sell everything, divide the proceeds, shut down) and Chapter 11 reorganization (the business keeps running and creditors become its new owners). The rule for dividing the pie is the **absolute priority rule** — until a class above is paid in full, the class below gets nothing — though in practice there are valuation fights, negotiations and \"gifts.\" Historically, secured loans have usually recovered most of their value, senior unsecured bonds around 40 cents on the dollar, subordinated debt less, and preferred and common stock often nothing. **What \"senior\" buys you is a higher recovery on a bad day, not a promise that you won't lose.**",

  intuition: `
Maple Manufacturing from Stage 6.1 finally can't go on. One question confronts everyone: **do we break the factory up and sell it, or keep it running?**

- **Break it up (Chapter 7 liquidation).** The equipment, buildings and inventory are auctioned piece by piece. Nobody wants second-hand machines, and inventory goes at clearance prices — say it all fetches only **$35M**. Take off $3M of bankruptcy costs and $32M remains: the secured loan takes its full $30M, the senior bonds get only $2M (**an 8% recovery**), and everyone else gets nothing.
- **Keep it running (Chapter 11 reorganization).** The plant still runs and customers still place orders; as a living business it is worth **$50M**. Take off $3M of costs and $47M remains: the secured loan takes its full $30M, and the senior bonds receive $17M of value (**a 68% recovery**) — not in cash, but as **shares in the reorganized company.** The old subordinated notes, preferred and common are all wiped out.

Same company, same assets, and **the senior bonds' recovery goes from 8% to 68%** depending only on whether the company is dismantled or survives. That is why modern bankruptcy law isn't focused on punishing debtors; it is focused on **preserving the extra value a living business has over a pile of parts.**

Notice how the second road ends: **the senior creditors become the new company's shareholders** and the old shareholders are wiped out. This is a debt-for-equity swap, and the class of debt that ends up catching the new equity — the class where the value runs out — is known in the trade as the **fulcrum security.** On Stage 6.1's floor plan, it is the floor cut by the waterline.

This lesson sits on **Idea ② (balance sheets & claims)**: here the order of priority is executed for real for the first time. It also connects to **Idea ③ (liquidity & trust)**: bankruptcy is, at heart, a legal "plumbing" that makes everyone stop running for the exit after trust breaks and sit down to divide things by the rules. Stage 10.1 covers the run; this lesson covers how it gets wound up.

Finally, the new era. Stage 10.5 covers the crypto bankruptcies — FTX, Celsius, Mt. Gox. There, customer claims were typically fixed at their **US dollar value on the day of the bankruptcy filing**, so even when bitcoin later rallied hard, creditors got dollars back, not bitcoin's gains. And for Orange Corp from Stage 6.1, a bankruptcy would look unusual: its assets are almost entirely bitcoin, tradable around the clock, so there is **no going-concern premium to protect and almost nothing to argue about in valuation.** What each floor receives is decided only by the bitcoin price and the order of the floors. Stage 17.6 puts real DAT capital stacks into this waterfall, and Stage 18.2 runs the full stress test.

**In this lesson we break it into five pieces:**

- **① Two roads: Chapter 7 liquidation and Chapter 11 reorganization**
- **② The absolute priority rule: the order on paper**
- **③ Deviations in practice: valuation fights, negotiation and "gifts"**
- **④ Recovery by floor: what each layer has historically recovered**
- **⑤ In the world of bitcoin: a bankruptcy without a factory**
`,

  mechanics: `
### ① Two roads: Chapter 7 liquidation and Chapter 11 reorganization

In the US Bankruptcy Code, businesses mostly use two chapters:

<table class="pm">
<tr><th></th><th>Chapter 7 liquidation</th><th>Chapter 11 reorganization</th></tr>
<tr><td>Who runs the company</td><td>A court-appointed trustee</td><td>Usually existing management (the "debtor in possession," DIP)</td></tr>
<tr><td>The company's fate</td><td>Stops operating; assets are sold, proceeds distributed, entity dissolved</td><td>Keeps operating and emerges with a restructured balance sheet</td></tr>
<tr><td>What creditors receive</td><td>Cash from asset sales</td><td>A mix of cash, new debt and <b>new equity</b></td></tr>
<tr><td>Suited to</td><td>Companies worth more dead than alive</td><td>Companies worth more alive than dead</td></tr>
</table>

Chapter 11 has several key mechanisms.

- **The automatic stay.** The moment a company files, all collection efforts, lawsuits and seizures are frozen. This is bankruptcy law's answer to a run: no single creditor gets to jump the queue; everyone sits down and divides things by the rules.
- **DIP financing.** The company still needs money to operate during the case, and new loans made during bankruptcy can receive **super-priority** (ranking ahead of nearly all old claims) — otherwise nobody would lend. This means **old "senior" debt can be pushed back by new debt in bankruptcy.**
- **The plan and the vote.** The company proposes a plan and creditors vote in classes. An impaired class accepts if holders of at least two-thirds in amount and more than half in number vote yes; under certain conditions the court can confirm the plan over a dissenting class (a "cramdown").
- **Section 363 sales.** The company can also sell the whole business or its core assets to a buyer inside Chapter 11 and then distribute the proceeds in order. General Motors and Chrysler both took this route in 2009.

**The whole reason Chapter 11 exists**: a company's value as a living business (going-concern value) is often far greater than what its pieces fetch separately (liquidation value). In the Maple example the difference is $15M — and it decides whether the senior bonds recover 8% or 68%.

### ② The absolute priority rule: the order on paper

The rule for dividing value is the **absolute priority rule (APR)**: **until a class above is paid in full, the class below gets nothing.** That is Stage 6.1's waterfall, with a few extra rungs added in bankruptcy:

<figure><svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The priority ladder in bankruptcy: Maple's Chapter 11 (going-concern value $50M)</text><rect x="40" y="36" width="250" height="28" rx="3" fill="var(--surface-2)" stroke="var(--line)"/><text x="165" y="55" text-anchor="middle" font-size="11" fill="var(--ink)">① Secured claims (up to collateral value) 30</text><rect x="40" y="68" width="250" height="28" rx="3" fill="var(--surface-2)" stroke="var(--line)"/><text x="165" y="87" text-anchor="middle" font-size="11" fill="var(--ink)">② Administrative costs / DIP loans 3</text><rect x="40" y="100" width="250" height="28" rx="3" fill="var(--surface-2)" stroke="var(--line)"/><text x="165" y="119" text-anchor="middle" font-size="11" fill="var(--ink)">③ Priority unsecured (some wages, taxes)</text><rect x="40" y="132" width="250" height="34" rx="3" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2"/><text x="165" y="148" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">④ General unsecured: senior bonds 25</text><text x="165" y="161" text-anchor="middle" font-size="10" fill="var(--orange-ink)">(alongside suppliers and other unsecured)</text><rect x="40" y="170" width="250" height="28" rx="3" fill="var(--surface-2)" stroke="var(--line)"/><text x="165" y="189" text-anchor="middle" font-size="11" fill="var(--muted)">⑤ Subordinated debt 15</text><rect x="40" y="202" width="250" height="28" rx="3" fill="var(--surface-2)" stroke="var(--line)"/><text x="165" y="221" text-anchor="middle" font-size="11" fill="var(--muted)">⑥ Preferred stock 10</text><rect x="40" y="234" width="250" height="28" rx="3" fill="var(--surface-2)" stroke="var(--line)"/><text x="165" y="253" text-anchor="middle" font-size="11" fill="var(--muted)">⑦ Common stock</text><line x1="4" y1="156" x2="40" y2="156" stroke="var(--blue)" stroke-width="2.5"/><line x1="290" y1="156" x2="322" y2="156" stroke="var(--blue)" stroke-width="2.5"/><text x="4" y="150" font-size="10" fill="var(--blue)">level</text><text x="330" y="55" font-size="11" fill="var(--green)" font-weight="600">Paid 30 in full → new secured debt or cash (100%)</text><text x="330" y="87" font-size="11" fill="var(--green)" font-weight="600">Paid 3 first (lawyers, advisers, new loans)</text><text x="330" y="119" font-size="11" fill="var(--muted)">Assumed zero here</text><text x="330" y="146" font-size="11" fill="var(--orange-ink)" font-weight="700">Fulcrum: takes the remaining 17 → new equity</text><text x="330" y="161" font-size="11" fill="var(--orange-ink)">Recovery 17 ÷ 25 = 68%</text><text x="330" y="189" font-size="11" fill="var(--red)">0%</text><text x="330" y="221" font-size="11" fill="var(--red)">0%</text><text x="330" y="253" font-size="11" fill="var(--red)">0%: old shareholders wiped out</text><rect x="40" y="276" width="560" height="40" rx="4" fill="var(--blue-soft)"/><text x="320" y="293" text-anchor="middle" font-size="11" fill="var(--ink)">Under Chapter 7 instead: sale fetches $35M → $32M after costs → senior bonds recover only 2 (8%)</text><text x="320" y="309" text-anchor="middle" font-size="11" font-weight="600" fill="var(--blue)">The gap between going-concern and liquidation value ($15M) is what Chapter 11 exists to save</text></svg><figcaption>In bankruptcy the ladder has more rungs than the everyday floor plan: administrative costs and new financing jump ahead of general unsecured debt. The floor cut by the waterline is the fulcrum security, and its holders become the owners of the reorganized company.</figcaption></figure>

A few details decide real-world recoveries.

- **Secured claims are capped at the value of the collateral.** If the bank's lien is on a plant worth $20M but the loan is $30M, the $10M difference becomes an **unsecured deficiency claim** that queues alongside the senior bonds.
- **Administrative costs cut in line.** Lawyers, financial advisers and money lent during the case all rank ahead of general unsecured claims. Professional fees in large cases can run into hundreds of millions of dollars — the origin of the "bankruptcy costs" slider in Stage 6.1's demo.
- **Senior bonds share a class with suppliers.** Ordinary corporate bonds are usually "general unsecured claims" in bankruptcy, on a par with unpaid suppliers and contract-damage claims. "Senior" only means senior to the subordinated debt that contractually agreed to stand behind it.
- **The fulcrum security.** Wherever the value runs out, that class catches the new equity. The core homework of distressed investors is working out which class will be the fulcrum — buy the fulcrum and you are buying control of the reorganized company at a discount.

### ③ Deviations in practice: valuation fights, negotiation and "gifts"

The absolute priority rule is a rule on paper, and in practice it often bends.

- **Valuation fights.** In Chapter 11, what the company is worth isn't a market quote but an estimate by each side's experts. **The lower the valuation, the higher up the fulcrum moves.** Senior creditors want a low valuation (so they get all the new equity); junior creditors and old shareholders want a high one (so they still get something). Valuations from the two sides for the same company can differ severalfold.
- **Negotiation and "gifting."** To avoid lengthy litigation and get a plan approved quickly, senior creditors sometimes hand a little of their own recovery to a junior class or to old shareholders who "should" get nothing, in exchange for their not objecting. That is why historical data often show shareholders receiving a few cents even in insolvent bankruptcies. The US Supreme Court's 2017 Jevic decision restricted distributions that violate priority in structured dismissals, but room for negotiation remains.
- **Politics and the public interest.** In Chrysler's 2009 reorganization, some secured lenders objected fiercely to a deal that gave them roughly 29 cents on the dollar while a union retiree health trust received a large equity stake. It is a widely cited example of how, in large and politically sensitive cases, the order on paper isn't the whole story.
- **Time.** Large Chapter 11 cases often last from several months to a year or two, during which creditors receive nothing and asset values keep moving. **Recoveries have to be discounted for time**: "60% eventually" is worth much less today if it takes two years to arrive.

The conclusion: **seniority decides who has the right to be paid; valuation, negotiation and time decide how much is finally paid.** That is why the "loss given default" term in Stage 4.6's expected loss = probability of default × loss given default always carries a lot of uncertainty.

### ④ Recovery by floor: what each layer has historically recovered

The rating agencies (Moody's, S&P) have tracked ultimate recoveries on defaulted debt for decades. The numbers vary by period and industry, but **the pattern by floor is very stable.** Roughly (orders of magnitude; see the agencies' own studies for specifics):

<table class="pm">
<tr><th>Floor</th><th>Historical average recovery (rough range)</th><th>Why</th></tr>
<tr><td><b>First-lien secured loans</b></td><td>About 60–80%</td><td>Collateral, first in line, tight covenants, often able to step in early</td></tr>
<tr><td><b>Senior secured bonds</b></td><td>About 50–65%</td><td>Secured, but usually behind bank loans or with weaker collateral</td></tr>
<tr><td><b>Senior unsecured bonds</b></td><td>About 35–50%</td><td>No collateral; queues alongside suppliers</td></tr>
<tr><td><b>Subordinated debt</b></td><td>About 20–35%</td><td>Contractually behind senior debt; often the floor that gets cut</td></tr>
<tr><td><b>Preferred stock</b></td><td>Usually very low, often near zero</td><td>Behind all debt; usually wiped out in insolvency</td></tr>
<tr><td><b>Common stock</b></td><td>Usually near zero</td><td>Residual claim; wiped out unless "gifted"</td></tr>
</table>

Three ways to read it:

- **Recoveries move with the cycle.** In deep recessions, when many companies default at once (as in 2008–2009), assets fetch poor prices and recoveries fall across the board. **Default rates and loss given default rise together**, which doubles the pain of credit risk in bad times.
- **The "lighter" the assets, the lower the recovery.** Companies that own plants, pipelines or power grids recover more than those whose main assets are brands, people or software — intangible value evaporates fastest in bankruptcy.
- **What "senior" buys.** Not freedom from loss, but **losing less in the same disaster.** Senior unsecured bonds and subordinated debt can both default, but the former recover, on average, something like ten-plus percentage points more. That is exactly Stage 6.1's point: senior debt accepts a lower rate because it has bought insurance against bad days.

### ⑤ In the world of bitcoin: a bankruptcy without a factory

Carry the logic of bankruptcy into crypto and DATs and several features appear that traditional textbooks don't have.

**Crypto platform bankruptcies (Stage 10.5).** In the FTX and Celsius cases, customer claims were generally fixed at their **US dollar value on the petition date.** FTX filed in November 2022, when bitcoin was near a low; reportedly, most customers ultimately recovered more than 100% of their petition-date dollar claims (including interest) — yet they missed bitcoin's subsequent rally. **Claims in dollars, assets in bitcoin**: that mismatch decides who keeps the upside. Mt. Gox's creditors, meanwhile, waited about a decade before repayments in bitcoin began around 2024. Custody, commingling and time mattered more than the order of priority.

**Orange Corp's hypothetical bankruptcy.** Put Stage 6.1's floors into the waterfall. All of Orange Corp's claims are denominated in **dollars** (convertible face value, preferred stated amounts), while its assets are bitcoin:

<table class="pm">
<tr><th>Bitcoin price</th><th>Distributable assets (incl. $30M cash)</th><th>Converts $150M</th><th>Orange-F $100M</th><th>Orange-D $50M</th><th>Common</th></tr>
<tr><td>$30,000</td><td>$330M</td><td>100%</td><td>100%</td><td>100%</td><td>$30M</td></tr>
<tr><td>$15,000</td><td>$180M</td><td>100%</td><td>30%</td><td>0%</td><td>0</td></tr>
<tr><td>$15,000, less 5% costs</td><td>$171M</td><td>100%</td><td>21%</td><td>0%</td><td>0</td></tr>
<tr><td>$10,000</td><td>$130M</td><td>about 87%</td><td>0%</td><td>0%</td><td>0</td></tr>
</table>

Compared with Maple Manufacturing, three things differ.

- **Almost no going-concern premium.** Orange Corp is worth the market value of its bitcoin; selling it in pieces or whole comes to about the same. The reason Chapter 11 exists — preserving going-concern value — is weak here.
- **Almost no valuation fight.** Bitcoin has a public price around the clock, so "what is the company worth" is plain to see. The only disagreement is **when to sell and how fast** (a large sale itself pushes the price down).
- **It may never reach bankruptcy at all.** The preferreds have no maturity date and skipping their dividends isn't a default; the only "hard" debt is the convertibles, and as long as the bitcoin is worth more than the convertibles outstanding, the company can sell coins to repay them. So for preferred holders, **"default" in practice doesn't look like bankruptcy; it looks like suspended dividends and a price below par** — and it arrives long before any bankruptcy would. Stage 17.6 reruns this table with real DAT capital stacks, and Stage 18.2 adds "capital markets closed for 12–24 months."

In one sentence: **seniority tells you your place in line; recovery tells you what that place is worth** — and in the world of bitcoin, what your place is worth depends almost entirely on the bitcoin price on the day. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**
`,

  demo: "bankruptcy-recovery",

  analogy: `
Think of bankruptcy as **the lifeboat plan after a ship hits a reef.**

The captain (management) faces a choice. **Abandon ship** (Chapter 7 liquidation): haul everything valuable ashore and auction it off, and let the ship sink. Or **tow the ship into dry dock, repair it and keep sailing** (Chapter 11 reorganization): a repaired ship that can still run its route is worth far more than a pile of planks.

Whichever road is chosen, lifeboat seats are allocated by ticket class: first class (secured creditors) boards first, then second class (senior bonds), then third class (subordinated debt), and finally the deck passengers (preferred and common). That is the absolute priority rule.

Reality always adds complications. The tugboat company and the shipyard workers (lawyers, DIP lenders) get paid first. First-class passengers, eager to set sail, sometimes give up a seat or two to the loudest third-class passengers (a "gift"). And everyone argues bitterly over what the ship is actually worth — a repairable vessel or a heap of timber (the valuation fight).

Who owns the repaired ship? **The ticket class whose lifeboat was only just filled** — they trade their tickets for shares in the new ship. The old owners (the shareholders) get nothing.

A bitcoin treasury company is **a ship loaded with gold bars.** The ship itself is worth little; the value is the gold, and the gold price changes by the minute. On the day it hits the reef there is little to argue about — one glance at the gold price tells you who gets a seat.
`,

  misconceptions: [
    "**\"Senior debt always gets all its principal back in bankruptcy.\"** — Senior unsecured bonds have historically recovered only around 40 cents on average, and they often share a class with suppliers; even secured claims are capped at the value of their collateral. \"Senior\" buys a higher recovery, not a guarantee of principal.",
    "**\"Bankruptcy means the company is shut down and its assets sold off.\"** — That's Chapter 7. Large companies mostly use Chapter 11: the business keeps operating and creditors swap their debt for equity in the new company. Many companies that went through bankruptcy are still operating today, just under new owners.",
    "**\"In bankruptcy, value is distributed strictly by priority, to the penny.\"** — The absolute priority rule is regularly bent by valuation fights, negotiated \"gifts,\" administrative costs and the cost of time. Seniority decides who may be paid; valuation and negotiation decide how much.",
    "**\"When a crypto platform goes bankrupt, creditors get their own bitcoin back.\"** — In cases like FTX and Celsius, claims were generally fixed at their dollar value on the petition date; even a recovery of more than 100% in dollars can miss bitcoin's subsequent rally.",
    "**\"A DAT preferred holder's biggest risk is the company going bankrupt.\"** — Preferreds have no maturity and a skipped dividend isn't a default, so a DAT may never reach bankruptcy. The more realistic risks for preferred holders are suspended dividends and a price stuck below par — and those arrive long before any bankruptcy.",
  ],

  quiz: [
    {
      q: "Maple Manufacturing has a going-concern value of $50M, a liquidation value of $35M and $3M of bankruptcy costs (secured loan 30, senior bonds 25, sub notes 15, preferred 10). What do the senior bonds recover under Chapter 11 versus Chapter 7?",
      options: [
        "100% under both",
        "68% versus 8%",
        "8% versus 68%",
        "0% under both",
      ],
      answer: 1,
      explain: "Reorganization: 50 − 3 = 47; secured takes 30; senior bonds get 17 / 25 = **68%** (as new equity). Liquidation: 35 − 3 = 32; senior bonds get only 2 / 25 = **8%.** The difference is going-concern value.",
    },
    {
      q: "What is the \"fulcrum security\"?",
      options: [
        "The most senior layer of the capital stack",
        "A convertible that automatically turns into common stock in bankruptcy",
        "The class of claims where the enterprise value runs out; it typically receives the reorganized company's new equity",
        "Super-priority debt issued during bankruptcy",
      ],
      answer: 2,
      explain: "The floor cut by the waterline is the **fulcrum**: classes above it are paid in full, classes below get nothing, and it takes the remaining value — usually the new equity. Identifying the fulcrum is the core work of distressed investing.",
    },
    {
      q: "Which of the following usually ranks ahead of general unsecured claims (such as senior unsecured bonds) in bankruptcy?",
      options: [
        "Administrative costs and debtor-in-possession (DIP) financing",
        "Subordinated debt",
        "Preferred stock",
        "Common stock",
      ],
      answer: 0,
      explain: "**Administrative costs and DIP financing** enjoy priority or even super-priority and cut ahead of general unsecured claims — which is why \"senior\" bonds can be pushed back in bankruptcy.",
    },
    {
      q: "What pattern do average historical recoveries show across layers?",
      options: [
        "Recoveries are roughly the same for every layer",
        "Subordinated debt recovers the most, because it pays more interest",
        "Preferred stock recovers more than senior unsecured bonds",
        "Secured loans recover the most, then senior unsecured, then subordinated, with preferred and common usually near zero",
      ],
      answer: 3,
      explain: "**Higher floor, higher recovery**: secured loans roughly 60–80%, senior unsecured roughly 35–50%, subordinated roughly 20–35%, preferred and common often wiped out. The exact numbers move with the cycle and the industry.",
    },
    {
      q: "Why might a DAT like Orange Corp \"never reach bankruptcy\" even in distress, while its preferred holders still suffer?",
      options: [
        "Because DATs are government-guaranteed",
        "Because preferreds have no maturity and a skipped dividend isn't a default, leaving the convertibles as the only hard debt; preferred losses show up as suspended dividends and prices below par",
        "Because bitcoin can't fall",
        "Because preferreds rank ahead of convertibles",
      ],
      answer: 1,
      explain: "As long as the bitcoin is worth more than the convertibles outstanding, the company can sell coins to repay them without bankruptcy. For preferreds, **\"default\" really looks like suspended dividends and falling prices**, well before any bankruptcy. Preferreds rank behind the convertibles, not ahead.",
    },
  ],

  further: [
    { label: "US Courts: Chapter 11 — Bankruptcy Basics (official overview of reorganization)", url: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics/chapter-11-bankruptcy-basics" },
    { label: "US Courts: Chapter 7 — Bankruptcy Basics (official overview of liquidation)", url: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics/chapter-7-bankruptcy-basics" },
    { label: "Czyzewski v. Jevic Holding Corp. (US Supreme Court, 2017; full opinion at Cornell LII)", url: "https://www.law.cornell.edu/supremecourt/text/15-649" },
    { label: "SEC Investor.gov: Bankruptcy — what investors should know when a company goes bankrupt", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/bankruptcy" },
  ],
};
