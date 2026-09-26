export default {
  id: "fed-toolkit",
  stage: 9,
  order: 1,
  title: "The Fed's Toolkit: Rates, QE, QT & Reserves",
  difficulty: "systems",
  prereqs: ["central-banks", "repo-money-markets"],

  oneLiner:
    "The Fed really holds two remote controls. One sets a **price**: interest on reserve balances (IORB) and the overnight reverse repo rate (ON RRP) pin overnight rates inside the target range. The other sets a **quantity**: QE and QT change how many reserves exist in the system and how many long Treasuries are left in private hands. **Learn to read the Fed's balance sheet and you can tell which lever each headline — “hike,” “taper,” “balance-sheet expansion” — is actually pulling**, and why in September 2026 the Fed was hiking while its balance sheet was bigger than at the end of 2025.",

  intuition: `
Remember the three headlines Lin scrolled past in Stage 0.1? After the principles tier, every word of the first one — “the 30-year Treasury yield climbs above 5%” — now makes sense: what a bond is, why prices fall when yields rise, why the 30-year is so sensitive (Stage 4.5). The “roughly 10% preferred” in the third headline has a skeleton too (Stage 6.2). But a bigger question is still open: **who sets the starting point for all these rates, and what constrains them?** From this lesson on we are in the **systems tier** — macro, crises and risk — and the first stop is the institution that sits at the source of every interest rate.

Stage 1.3 introduced the Fed as the “bank for banks”: it sets the policy rate and acts as lender of last resort in a panic. Here we open the toolbox and watch each tool **do its work on a single balance sheet**.

Hold one picture in your head: **the Fed is a bank that exists on a ledger.** Its assets are Treasuries and mortgage-backed securities (MBS). Its liabilities are the currency in your wallet, the **reserves** that commercial banks keep with it, the Treasury's checking account (the TGA), and the cash that money-market funds lend it overnight through the **overnight reverse repo facility** (ON RRP). Everything the Fed does shows up as two matching entries on this T-account.

Its tools fall into two groups:

- **Price tools** decide what the very shortest money costs. The Fed does not order anyone to lend at a given rate. Instead it **posts its own bids**: “park reserves with me and I'll pay you IORB,” “lend me cash overnight and I'll pay you the ON RRP rate.” Nobody will lend to anyone else for less, so the whole overnight market rests on that floor.
- **Quantity tools** decide how much money is in the system and how many long bonds remain in the market. **Quantitative easing (QE)** means the Fed creates reserves from nothing to buy long Treasuries and MBS, and both sides of its balance sheet grow. **Quantitative tightening (QT)** is the reverse: maturing bonds aren't replaced, and both sides shrink.

Put numbers on it. Before 2008 the Fed's total assets were under $1 trillion. Two great waves of QE, in 2008 and 2020, carried them to a peak of about **$8.97 trillion** on April 13, 2022. More than three years of QT then cut the total to about **$6.54 trillion** on December 3, 2025, roughly −27%. QT formally ended on December 1, 2025, and the Fed soon began buying Treasury bills again under the label of “reserve management.” In the week ended September 23, 2026, total assets were about **$6.75 trillion**, including about **$2.93 trillion** of bank reserves.

On the price side, on September 16, 2026 the Fed **raised the federal funds target range by a quarter point, to 3.75–4.00%**. It was the first hike since July 2023 and the first rate decision under the new chair, Kevin Warsh. **So in the same season the price lever was tightening while the quantity lever sat in neutral** — neither shrinking nor buying much. The two remotes can point in different directions, and seeing that clearly is the point of this lesson.

The lesson rests mainly on **Idea ①, the price of time**: the policy rate is the anchor for every other rate. It also rests on **Idea ③, liquidity and trust (the plumbing)**: reserves are the water at the very bottom of the financial pipes, and the repo market of Stage 8.3 runs on them. Next, Stage 9.2 follows these moves out to mortgages, stocks and Bitcoin, and Stage 9.3 widens “how many reserves” into the story of global liquidity.

**In this lesson we break it into five pieces:**

- **① The Fed's balance sheet: everything starts with a T-account**
- **② Price tools: the floor system, IORB and ON RRP**
- **③ QE: creating reserves and taking long bonds off the market**
- **④ QT and the edge of “ample reserves”**
- **⑤ Forward guidance and the Fed in 2026: the first move of the Warsh era**
`,

  mechanics: `
### ① The Fed's balance sheet: everything starts with a T-account

Draw the Fed with the T-account from Stage 1.2 and you only need a handful of lines:

- **Assets**: Treasury securities (short-term bills plus longer notes and bonds), agency MBS, emergency loans to banks (the discount window and similar facilities), and a few other items.
- **Liabilities**: currency in circulation (Federal Reserve notes), **reserves** (commercial banks' deposits at the Fed), the **TGA** (the Treasury General Account), **ON RRP** (overnight cash lent to the Fed by money funds and other non-banks), and a small amount of other liabilities and capital.

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The Fed's T-account (week ended Sep 23, 2026, rounded)</text><text x="160" y="44" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Assets ≈ $6.75 trillion</text><text x="480" y="44" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Liabilities & capital ≈ $6.75 trillion</text><line x1="320" y1="34" x2="320" y2="236" stroke="var(--line)" stroke-width="1.5"/><rect x="60" y="52" width="110" height="122" rx="4" fill="var(--orange)"/><rect x="60" y="174" width="110" height="51" rx="4" fill="var(--orange-soft)" stroke="var(--orange-line)"/><rect x="60" y="225" width="110" height="7" rx="2" fill="var(--surface-2)" stroke="var(--line)"/><text x="180" y="110" font-size="11" font-weight="600" fill="var(--ink)">Treasuries</text><text x="180" y="125" font-size="11" fill="var(--muted)">about $4.56T</text><text x="180" y="196" font-size="11" font-weight="600" fill="var(--ink)">MBS</text><text x="180" y="211" font-size="11" fill="var(--muted)">about $1.91T</text><text x="180" y="233" font-size="10" fill="var(--muted)">Loans & other (small)</text><rect x="350" y="52" width="110" height="78" rx="4" fill="var(--blue)"/><rect x="350" y="130" width="110" height="102" rx="4" fill="var(--blue-soft)" stroke="var(--line)"/><text x="470" y="88" font-size="11" font-weight="600" fill="var(--ink)">Bank reserves</text><text x="470" y="103" font-size="11" fill="var(--muted)">about $2.93T</text><text x="470" y="170" font-size="11" font-weight="600" fill="var(--ink)">Currency, TGA,</text><text x="470" y="185" font-size="11" font-weight="600" fill="var(--ink)">ON RRP, capital…</text><text x="470" y="200" font-size="11" fill="var(--muted)">together about $3.82T</text><text x="320" y="258" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="600">QE: buy Treasuries/MBS → assets up, reserves up (both sides grow)</text><text x="320" y="276" text-anchor="middle" font-size="11" fill="var(--blue)" font-weight="600">QT: let bonds mature → assets down, reserves down (both sides shrink)</text><text x="320" y="294" text-anchor="middle" font-size="10" fill="var(--muted)">Data: Fed H.4.1 weekly release; the split of non-reserve liabilities is omitted — check the source</text></svg><figcaption>Every Fed action is double-entry: whatever it buys on the asset side shows up as an equal amount of reserves (or another liability) on the other side.</figcaption></figure>

The single most useful rule: **with assets unchanged, the liability items are a fixed pie, and one grows only when another shrinks.**

- When the Treasury collects taxes or sells debt and the cash lands in the TGA, bank reserves **fall** — money has moved out of the commercial banking system into the Treasury's account at the Fed. When the Treasury spends, the TGA falls and reserves **rise**.
- When money funds park cash in ON RRP, it sits at the Fed. When they pull it out to buy newly issued bills, ON RRP falls and the TGA rises.
- When the public withdraws extra cash over the holidays, currency rises and reserves fall.

So **the quantity of reserves is not the Fed's decision alone.** Treasury cash flows, money-fund choices and the public's appetite for banknotes all move it. In Stage 9.3 this turns into a formula — “net liquidity” — that markets use widely, and misuse just as widely.

### ② Price tools: the floor system, IORB and ON RRP

Before 2008, reserves were scarce. The Fed nudged the federal funds rate toward its target by buying and selling small amounts of Treasuries each day, squeezing the supply of reserves. That was the **scarce-reserves regime**. QE then lifted reserves from tens of billions of dollars to trillions, and squeezing stopped working: there was simply too much water. So the Fed switched to a **floor system**, officially an “ample-reserves regime”:

- **Interest on reserve balances (IORB).** The Fed gained authority to pay interest on reserves in October 2008; the rates were unified under the name IORB in July 2021. A bank that earns IORB risk-free at the Fed will not lend reserves to anyone for less.
- **The overnight reverse repo (ON RRP) rate.** Money-market funds are not banks and cannot earn IORB. Since 2013 the Fed has let them lend cash to it overnight against Treasury collateral at the ON RRP rate, usually set at the bottom of the target range. That is a second floor, for non-banks.
- **The Standing Repo Facility (SRF).** Set up in July 2021, it lets eligible firms borrow from the Fed against Treasuries at any time, which puts a ceiling over repo rates.

The elegance is that **changing rates no longer requires changing the quantity of reserves.** When the FOMC lifts the range by 25 basis points, it lifts IORB, ON RRP and the SRF rate by 25 basis points as well, and the whole overnight market shifts with them. That is exactly how the September 16, 2026 hike worked: the range became 3.75–4.00%, and on September 24 the effective federal funds rate printed at about **3.88%**, right inside it.

The floor system has a side effect people rarely notice: **the Fed's own profit and loss.** Most of its assets are low-coupon bonds bought during QE, while it pays IORB on reserves. After the rapid hikes of 2022, interest paid out exceeded interest earned, and from autumn 2022 the Fed ran operating losses, booked as a “deferred asset” to be offset by future earnings before any profits are remitted to the Treasury. This cannot bankrupt the Fed — its liabilities are money itself (Stage 1.1) — but it makes one thing plain: **when QE held long rates down, the central bank took on the maturity mismatch itself.** It is Silicon Valley Bank in Stage 10.3, minus the possibility of a run.

### ③ QE: creating reserves and taking long bonds off the market

QE's bookkeeping is simple. The Fed buys $100 billion of 10-year Treasuries from primary dealers and credits $100 billion to the reserve accounts of the dealers' banks. **Fed assets rise by $100 billion of Treasuries; Fed liabilities rise by $100 billion of reserves.** The private sector holds $100 billion fewer Treasuries and $100 billion more in deposits and reserves.

How does that push long-term rates down? Through three main channels:

- **Duration extraction (portfolio rebalancing).** Private investors now hold fewer long bonds and so bear less interest-rate risk (the duration of Stage 4.4). The compensation they demand for that risk — the **term premium** — falls. A 30-year Treasury has a modified duration of about 15.5, so every one the Fed absorbs takes a large block of rate risk off the market's hands.
- **Signaling.** Committing to huge purchases tells markets that policy will stay easy for a long time, pulling down the expected path of short rates.
- **Pushing investors into risk assets.** Holders who receive cash go and buy corporate bonds and stocks instead, lifting other asset prices. That is where the “asset-price channel” of Stage 9.2 comes from, and where the idea in Stage 9.3 that “liquidity lifts Bitcoin” begins.

The rounds, briefly: QE1 began in November 2008 (MBS first, expanded to Treasuries in March 2009); QE2 in November 2010 ($600 billion of Treasuries); QE3 in September 2012 (open-ended monthly purchases); and in March 2020 the Fed announced $700 billion, then on March 23 made purchases unlimited. **QE is not “printing money and handing it out.”** It is an asset swap. At the moment of the trade the private sector's net wealth is unchanged; what changes is the mix of what it holds — long bonds swapped for reserves.

Keep a newer tool separate. In December 2025 the Fed began **reserve management purchases (RMPs)**. These buy **short-term Treasury bills**: about $40 billion a month at first, cut to about $25 billion from mid-April 2026, then about $10 billion, and **paused at zero from August 14, 2026** (at least through October 14). Principal from maturing MBS — about $15–18 billion a month — is still reinvested into Treasuries. RMPs make the balance sheet bigger again, but they **remove almost no duration** from the market, because a bill matures in a few months. Their purpose is to keep reserves ample, not to push down long rates. **Balance-sheet growth is not the same as QE; what matters is what is bought and why.**

### ④ QT and the edge of “ample reserves”

QT mirrors QE. When a Treasury the Fed owns matures, the Treasury pays the Fed out of the TGA, then refills the TGA by selling new debt to the public, who pay from their bank deposits. **Net effect: Fed assets fall and bank reserves fall.** The Fed does not sell anything; it simply lets bonds run off without replacing them. Hence “passive” QT, or runoff.

This cycle's timetable, all from FOMC statements:

<table>
<tr><th>When</th><th>What</th><th>Monthly runoff cap</th></tr>
<tr><td>June 2022</td><td>QT begins</td><td>Fully phased in: $60B Treasuries, $35B MBS</td></tr>
<tr><td>June 2024 (announced May 1)</td><td>First slowdown</td><td>Treasuries cut to $25B</td></tr>
<tr><td>April 2025 (announced March 19)</td><td>Second slowdown</td><td>Treasuries cut to $5B</td></tr>
<tr><td>December 1, 2025 (announced October 29)</td><td>QT ends</td><td>Total shrinkage about $2.4T (about −27%)</td></tr>
</table>

Why keep slowing and then stop? Because **reserves have an invisible floor.** September 2019 is the cautionary tale. After the previous round of QT, reserves had fallen to roughly $1.4 trillion; corporate tax payments and Treasury settlements then drained cash on the same day, and overnight repo rates spiked to around 10% (Stage 8.3), forcing the Fed to inject liquidity in a hurry. Banks' demand for reserves is not a fixed number — regulation, payment habits and post-crisis caution all raise it — and **you only find out where the floor is when you hit it.**

This time the cushion was ON RRP. At the end of 2022, money funds had more than $2 trillion parked there. QT drained that pool first, and by 2025 it had been largely emptied. Any further shrinkage would come straight out of bank reserves, which is the backdrop to the Fed's October 2025 decision to stop. **The real constraint on QT is not how big a balance sheet is “normal,” but how many reserves are “ample.”** The September 2026 FOMC statement still says the Committee “is continuing its policy of maintaining ample reserves.”

### ⑤ Forward guidance and the Fed in 2026: the first move of the Warsh era

The last tool costs nothing: **forward guidance**, managing expectations with words. The wording of the FOMC statement, the chair's answers at the press conference and the quarterly “dot plot” of each official's rate projections all steer how markets price the **future** policy path. Stage 1.3 showed that the 2-year Treasury yield roughly equals the market's average expected policy rate over the next two years. On September 25, 2026 the 2-year yield was about **4.81%**, well above the 3.88% effective fed funds rate — **markets were pricing more hikes**, and CNBC reported roughly a two-in-three chance of another hike in October.

Here is 2026 as a timeline (as of September 2026; confirm details on the Fed's website):

- **December 10, 2025:** the last cut, to 3.50–3.75%, and the announcement of reserve management purchases.
- **January 30, 2026:** the President nominates Warsh as chair. Warsh served as a Fed governor from 2006 to 2011.
- **From February 28, 2026:** the US–Israeli war with Iran triggers an oil shock. Brent peaks near $138 on April 7, and headline CPI climbs from about 2.4% early in the year to about 4.2% in May. The Fed holds in January, March, April, June and July.
- **April 29:** Powell chairs his final meeting, an 8–4 vote with the most dissents since 1992. He announces he will **stay on as a governor** after his chair term (his governor term runs to January 2028), the first former chair to do so since 1948.
- **May 13:** the Senate confirms Warsh 54–45, the narrowest vote ever for a Fed chair; he is sworn in on May 22.
- **June 29:** in Trump v. Cook the Supreme Court rules 5–4 that Governor Cook can stay — Fed governors are protected from removal except for cause.
- **September 16:** a 12–0 vote to **raise rates by a quarter point.** The statement says inflation “remains elevated” and that the move will support a timelier return to the 2% goal. Markets widely read a new chair opening with a hike as **a statement of independence.**

The new era adds a few characters to this toolbox. **Stablecoins:** under the 2025 GENIUS Act, dollar stablecoins must be backed 1:1 by cash, short-term Treasuries, overnight repo and similar assets, which makes them a growing captive buyer of bills — and the yield on those reserves is set by the Fed's policy rate (Stage 13.2). **Tokenized money funds:** on-chain Treasury funds earn yields that track IORB and ON RRP as well (Stage 14.2). **Bitcoin:** money with no balance sheet and no policy rate at all — yet its price is sensitive to both of the Fed's remotes, and Stage 9.3 and Stage 12.4 explain why.

**The lesson in one sentence: the Fed uses IORB and ON RRP to control the price of the shortest money, and QE, QT and reserve management purchases to control the quantity of money in the system and the supply of long bonds; when you read a headline, first ask “is this the price lever or the quantity lever, and is the Fed buying bills or bonds?” — and “expansion” or “tightening” will never mislead you again.**
`,

  demo: "fed-toolkit",

  analogy: `
Think of the Fed as a city's **central reservoir**. Commercial banks are **tanks** plumbed into it, and reserves are the water in those tanks.

The **price tools** are the reservoir's posted buying price. The reservoir announces: “Anyone who stores water back with me earns 3.9 cents a gallon.” Now no one in town will sell water to anyone else for less. The reservoir doesn't need to police how much water each household holds; the price across the whole city is held up by that single offer. Want a higher price? Post 4.15 cents. One sentence and it's done.

The **quantity tools** actually pump water in or out. **QE** is the reservoir using water it conjures from nothing to buy residents' long-term storage drums (long Treasuries). Residents now hold fewer drums and more loose water, so they spend it on other things — stocks, corporate bonds, Bitcoin. **QT** is the reservoir collecting the water when drums expire instead of swapping in new ones. **Reserve management purchases** are like swapping in small bottles that expire within weeks (bills): the tank level holds up, but the market's stock of long drums barely changes.

Two neighbors quietly change the water level too. The **Treasury** keeps its account (the TGA) inside the reservoir, pumping water out when it collects taxes and sells debt and letting it flow back when it spends. **Money funds** can park water in the reservoir's ON RRP. And the tanks can't run too low: in September 2019 the pumping went too far and overnight water prices jumped to several times normal. **What keeps the reservoir manager up at night isn't too much water — it's not knowing where the minimum safe level is.**
`,

  misconceptions: [
    "**“A bigger Fed balance sheet means QE, which means money printing.”** — It depends on what is bought and why. The reserve management purchases that began in December 2025 buy short-term bills and remove almost no duration from the market; their aim is to keep reserves ample. They enlarge the balance sheet, but they are not designed to push down long rates, and the Fed does not describe them as QE.",
    "**“QE means handing money directly to people.”** — QE is an asset swap: the Fed exchanges newly created reserves for Treasuries or MBS held by the private sector, whose net wealth is unchanged at the moment of the trade. It works by lowering the term premium, changing the mix of assets and shaping expectations — a different thing from the Treasury sending out checks.",
    "**“A rate hike means the Fed is pulling money out of the market.”** — Under the floor system a hike raises administered rates like IORB and ON RRP; the quantity of reserves can stay exactly where it was. The September 2026 hike came after QT had ended, with the balance sheet larger than at the end of 2025. Price and quantity are separate levers.",
    "**“The Fed is losing money, so it's nearly bankrupt and the dollar is about to collapse.”** — The Fed's liabilities are money itself; it cannot suffer a run, and losses are booked as a deferred asset to be covered by future earnings. What the losses really show is that low-yielding bonds bought during QE went into negative carry once rates rose — the central bank bore the cost of maturity mismatch, and the lower remittances show up in the federal budget.",
    "**“More reserves are always fine, and QT could have gone on forever.”** — Banks' demand for reserves has a floor you can't see in advance. When reserves got tight in September 2019, overnight repo rates spiked to around 10%. This cycle's QT drained the ON RRP cushion first, and the Fed stopped runoff on December 1, 2025 precisely to avoid hitting that floor again.",
  ],

  quiz: [
    {
      q: "The Fed buys $100 billion of 10-year Treasuries from primary dealers. What happens to its balance sheet?",
      options: [
        "Assets +$100 billion; the TGA on the liability side +$100 billion",
        "Nothing changes in total; Treasuries just move from one line to another",
        "Assets −$100 billion; reserves +$100 billion",
        "Assets +$100 billion of Treasuries; liabilities +$100 billion of bank reserves",
      ],
      answer: 3,
      explain: "**QE grows both sides at once.** The Fed pays by crediting the reserve account of the seller's bank; reserves are its own liability and can be created from nothing.",
    },
    {
      q: "Under the floor system, the Fed raises its target range by 25 basis points. What is the most direct way it does this?",
      options: [
        "It raises IORB, the ON RRP rate and its other administered rates by 25 basis points",
        "It sells several hundred billion dollars of Treasuries to make reserves scarce",
        "It orders commercial banks to raise their loan rates by 25 basis points",
        "It raises reserve requirements",
      ],
      answer: 0,
      explain: "With ample reserves you can't squeeze rates up. The Fed **raises the rates it pays itself**; no one will lend for less, so the whole overnight market shifts.",
    },
    {
      q: "What is the main difference between the reserve management purchases (RMPs) that began in December 2025 and QE?",
      options: [
        "RMPs buy stocks; QE buys bonds",
        "RMPs buy short bills and remove little duration, aiming to keep reserves ample; QE buys long bonds to push down long rates",
        "RMPs shrink the balance sheet; QE grows it",
        "There is no difference other than the name",
      ],
      answer: 1,
      explain: "Both enlarge the balance sheet, but **what is bought determines the effect.** Bills mature within months, so RMPs barely touch the term premium; QE buys long bonds and absorbs a lot of duration.",
    },
    {
      q: "With Fed assets unchanged, the Treasury sells $200 billion of bills to money funds that had been parking cash in ON RRP. What happens on the Fed's liability side?",
      options: [
        "Reserves −$200 billion, currency +$200 billion",
        "Reserves +$200 billion, TGA −$200 billion",
        "ON RRP −$200 billion, TGA +$200 billion, bank reserves roughly unchanged",
        "Total liabilities rise by $200 billion",
      ],
      answer: 2,
      explain: "Liability items **trade off against each other**: the cash moves from the funds' ON RRP balance to the Treasury's TGA, both at the Fed, and bank reserves are untouched. That is why ON RRP served as the cushion during this cycle's QT.",
    },
    {
      q: "In late September 2026 the 2-year Treasury yield was about 4.81% while the effective fed funds rate was about 3.88%. What does that gap most likely tell you?",
      options: [
        "Markets expect the Fed to cut rates soon",
        "The 2-year Treasury has become a default risk",
        "The Fed is buying large amounts of 2-year notes",
        "Markets are pricing further hikes — this is where forward guidance and expectations do their work",
      ],
      answer: 3,
      explain: "The 2-year yield approximates **the average expected policy rate over the next two years.** Being well above today's rate means markets expect more hikes; at the time they priced about a two-in-three chance of an October hike.",
    },
  ],

  further: [
    { label: "Federal Reserve H.4.1 weekly release: every line of the balance sheet (official, current)", url: "https://www.federalreserve.gov/releases/h41/current/" },
    { label: "Federal Reserve: Policy Tools (official explainers for IORB, ON RRP, the discount window and the Standing Repo Facility)", url: "https://www.federalreserve.gov/monetarypolicy/policytools.htm" },
    { label: "FOMC statement, Oct 29, 2025: ending balance-sheet runoff on Dec 1", url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20251029a.htm" },
    { label: "FOMC statement, Sep 16, 2026: the first hike of the Warsh era", url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm" },
    { label: "FRED: WALCL, total Fed assets, weekly history", url: "https://fred.stlouisfed.org/series/WALCL" },
  ],
};
