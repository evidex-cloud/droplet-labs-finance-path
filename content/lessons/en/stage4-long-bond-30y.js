export default {
  id: "long-bond-30y",
  stage: 4,
  order: 5,
  title: "Why a Rising 30-Year Yield Is Worrying: Term Premium, Deficits & the Bond Vigilantes",
  difficulty: "core",
  prereqs: ["yield-curve", "duration-convexity"],

  oneLiner:
    "On September 24–25, 2026, the US 30-year Treasury yield reached about **5.5%**, its highest since 2004. A week earlier, on September 16, the Fed had **raised rates** for the first time since 2023. Federal debt passed **$40 trillion** on August 18, and net interest runs at **about $1 trillion or more** a year. This lesson answers the question behind the first headline in Stage 0.1: what's inside the 30-year yield, why it's rising (the **term premium**, deficits and supply, inflation, a changing buyer base, and a global long-end selloff led by Japan and the UK), and why it's worrying. It lifts mortgage rates, squeezes stock valuations, dents bank and insurer balance sheets, and swells the government's interest bill in a **self-reinforcing loop**, before rippling out to bitcoin, bitcoin treasury companies and the preferreds they sell.",

  intuition: `
The first headline Lin scrolled past in Stage 0.1 was “The 30-year US Treasury yield climbs above 5%.” By now you hold every piece needed to read it: what a bond is (Stage 4.1), why yields and prices move in opposite directions (Stage 4.2), what drives the right-hand end of the yield curve (Stage 4.3), and why long bonds are so sensitive to rates (Stage 4.4). Time to put them together.

First, the road it has travelled (US Treasury and FRED closing data):

- **End of 2020**: about **1.65%**. Zero rates and QE; borrowing for the long term cost almost nothing.
- **October 19, 2023**: about **5.11%**, the first big “long-end scare.”
- **May 21, 2025**: about **5.08%**. Five days earlier Moody's had cut the US from Aaa to Aa1, so the US no longer held a top rating from any of the three big agencies.
- **February 27, 2026**: about **4.64%**, the low of the year. The next day, the US–Israel war with Iran began, and an oil shock followed.
- **July–August 2026**: closing above 5% on almost every trading day.
- **September 16, 2026**: the Fed hikes by 0.25 points to 3.75%–4.00%. It's the first hike since 2023 and new chair Kevin Warsh's first move.
- **September 24–25, 2026**: about **5.5%**, **the highest since 2004**.

Why does one number deserve so many headlines? Because **the 30-year Treasury yield is the price of long-term money** (Idea ①). It's what the US government pays to borrow for thirty years, and it's the anchor for every long-term promise in the economy: 30-year mortgages, long corporate bonds, the liabilities of pension funds and insurers, the discount rate inside stock valuations, and the long-dated preferreds that bitcoin treasury companies sell. Move that anchor up and every long-lived asset has to be repriced.

It's also a **balance-sheet** story (Idea ②). The government's liabilities keep growing and constantly have to be refinanced; banks, insurers and pension funds hold huge amounts of long bonds, and when prices fall they book paper losses. And it's a **risk** story (Idea ④). The compensation investors demand for locking money up for thirty years, the **term premium**, was negative in 2020 and was clearly positive by 2026. Where leverage is involved, as with UK pension funds' LDI strategies in 2022, a selloff in the long end can feed on itself.

The most worrying part is a **loop**: yields rise → the government's interest bill grows → the deficit widens → more Treasuries have to be sold → investors demand more compensation → yields rise further. When markets start to fear the loop won't stop, bond investors vote by selling. That crowd has a nickname: **the bond vigilantes**.

This lesson rests mainly on **Ideas ①, ② and ④**, and it strings together the deficits of Stage 3.3, the fiscal dominance of Stage 9.4, the rate-shock cases of Stage 10.3 and the whole picture of Stage 20.1. **This lesson explains mechanisms and analytical frameworks only; it is not investment advice.**

**In this lesson we break it into six pieces:**

- **① What's inside the 30-year yield: expectations, inflation compensation and the term premium**
- **② Why it's rising: deficits and supply, inflation and the Fed, the buyer base, the global long end**
- **③ Bond vigilantes and fiscal dominance: the market disciplines governments**
- **④ Why it's worrying, part 1: mortgages, stock valuations and financial balance sheets**
- **⑤ Why it's worrying, part 2: the government's self-reinforcing interest bill**
- **⑥ What it means for bitcoin, bitcoin treasury companies and preferreds**
`,

  mechanics: `
### ① What's inside the 30-year yield: expectations, inflation compensation and the term premium

Apply the formula from Stage 4.3 to the far right of the curve:

$$
30-year yield ≈ average expected short rate over the next 30 years + term premium
             ≈ real rate + expected-inflation compensation + term premium  (another way to slice it)
$$

Each piece can rise:

- **Expected short rates.** The Fed hiked on September 16, 2026, and the 2-year yield (about 4.81%) sits above the fed funds range, so markets expect more hikes. But a thirty-year average isn't very sensitive to the next year or two. **The 30-year is mostly not a bet on the Fed's next move.**
- **Real rates and inflation compensation.** In September 2026 the 10-year TIPS real yield was about 2% or a bit more, while the nominal 10-year was about 5.2%; the gap is the market's implied inflation compensation. US inflation has been above the 2% target continuously since early 2021, and CPI jumped back to 4.2% year over year in May 2026. **Uncertainty about whether inflation stays high** has to be paid for in its own right.
- **The term premium.** It can't be seen, only modeled. The New York Fed's ACM estimate of the 10-year term premium rose from **about −1.36% in July 2020** (a record low) to **about +0.84% in July 2026** (about +0.76% at end-August). The Fed Board's Kim–Wright model put it at about 0.96% on September 18, 2026, the highest in that series since 2020. The 30-year's term premium is usually higher still.

**The key judgment:** a large share of the rise in long yields since 2024 has come from **the term premium climbing back**, not just from expectations about the Fed. A rough sum: from 2020 to 2026 the 10-year yield rose by more than 4 percentage points, while the ACM term premium climbed about 2.2 points from its trough to summer 2026. **Nearly half of the rise is “compensation got more expensive,”** not “expected rates went up.” That matters, because the term premium is driven by deficits, supply, inflation risk and who the buyers are, so **Fed cuts may not bring it down**. Stage 4.3 showed exactly that: while the Fed was cutting from end-2024 to end-2025, the 30-year yield edged up.

### ② Why it's rising: deficits and supply, inflation and the Fed, the buyer base, the global long end

**Force one: deficits and Treasury supply.**

- Total federal debt **passed $40 trillion on August 18, 2026** and was about $40.07 trillion on September 24; debt held by the public was about $32.36 trillion. In recent years it has been adding roughly $1 trillion every two to five months.
- The Congressional Budget Office's February 2026 baseline puts the FY2026 deficit at about **5.8%** of GDP, rising to 6.7% by 2036 (the historical average is about 3.8%). Debt held by the public goes from about **101%** of GDP to 120%, past the World War II record of 106%. CBO attributes about $4.7 trillion of extra deficits over 2026–2035, including interest, to the 2025 reconciliation law (the OBBBA). The deficit for the first eleven months of FY2026 was about $2.0 trillion.
- Every dollar of deficit has to be financed by selling debt. **The more supply there is, the more compensation buyers demand** (the term premium), just as with anything else: sell more of it and you have to give a little on price. The Treasury has leaned more on short-term bills, kept long-bond auction sizes unchanged, and in September 2026 expanded its long-end “liquidity support” buybacks, all attempts to take some pressure off the long end (Stage 3.3).

**Force two: inflation and the Fed.**

- The Iran war began on February 28, 2026 and traffic through the Strait of Hormuz was heavily restricted. Brent crude hit about $138 on April 7 and was still about $115 on September 22. CPI inflation rose from about 2.4% before the war to 4.2% in May, and was 3.4% in August.
- On September 16, 2026 the Fed hiked by 0.25 points on a 12–0 vote, saying “inflation remains elevated.” It was the first hike since July 2023.
- Meanwhile, questions about **Fed independence** have been a running theme of 2025–26: the President's attempt to remove Governor Lisa Cook (the Supreme Court ruled in June 2026 that she can stay) and the chair transition (Warsh was confirmed 54–45, the narrowest vote ever for a Fed chair). Markets read Warsh's first act, a hike, as asserting independence. **The more independence is in doubt, the more inflation-risk compensation the long end demands.**

**Force three: the buyer base is changing.**

- Foreign investors held about $9.25 trillion of Treasuries in July 2026. The total is roughly flat, but **their share keeps shrinking as the debt grows**. Japan, the largest holder, went from about $1.16 trillion a year earlier to about $1.10 trillion; China from about $1.03 trillion in January 2022 to about $0.62 trillion.
- The Fed stopped shrinking its balance sheet (QT) on December 1, 2025, and what it has bought since then is short-term bills, **not long bonds**. The biggest price-insensitive buyer of the long end has left the room.
- In its place are more price-sensitive buyers: hedge funds, asset managers, pension funds. They need to see enough yield before they step in.

**Force four: a global long-end selloff.** Long-term rates are linked across countries, because money can move between one government's bonds and another's.

- **Japan.** The Bank of Japan hiked to 1.25% on September 18, 2026, its highest policy rate since 1995. The 10-year JGB yield broke above 3%, the highest since 1996, and the 30-year reportedly set a record above 4%. Japan is the largest foreign holder of US Treasuries, and **when yields at home rise, Japanese investors have less reason to buy US bonds**.
- **The UK.** The 30-year gilt yield was reportedly about 5.9% in September 2026, the highest since 1998, and a new 30-year gilt was reportedly priced at about 5.82%, the highest yield at any gilt sale since the Debt Management Office was set up in 1998.
- **Germany.** The 10-year Bund yield rose above 3.6%, the highest in about 17 years. Bloomberg's global aggregate Treasuries index yielded close to 4%, near its highest since 2007.
- On top of that, the AI investment boom brought record supply of long-dated corporate bonds, competing with governments for the same pool of long-term money (Stage 19.2).

### ③ Bond vigilantes and fiscal dominance: the market disciplines governments

<figure><svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><defs><marker id="lb-ar-en" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--red)"/></marker></defs><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The long end's self-reinforcing loop (with its outside drivers and its victims)</text><rect x="245" y="36" width="150" height="32" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="320" y="57" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Bigger deficits</text><rect x="455" y="96" width="150" height="32" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="530" y="117" text-anchor="middle" font-size="12" fill="var(--ink)">More Treasury supply</text><rect x="445" y="186" width="160" height="32" rx="8" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="525" y="207" text-anchor="middle" font-size="12" fill="var(--orange-ink)" font-weight="700">Term premium rises</text><rect x="230" y="246" width="180" height="34" rx="8" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2.5"/><text x="320" y="268" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">30-year yield rises</text><rect x="30" y="140" width="170" height="32" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="115" y="161" text-anchor="middle" font-size="12" fill="var(--ink)">Interest bill grows</text><g stroke="var(--red)" stroke-width="2" fill="none" marker-end="url(#lb-ar-en)"><path d="M395,58 Q450,62 485,94"/><path d="M530,128 Q540,158 528,184"/><path d="M470,218 Q450,245 412,258"/><path d="M230,266 Q150,250 120,174"/><path d="M110,140 Q200,120 243,54"/></g><text x="320" y="150" text-anchor="middle" font-size="12" font-weight="700" fill="var(--red)">A self-reinforcing loop</text><text x="320" y="168" text-anchor="middle" font-size="10" fill="var(--muted)">The bigger the debt, the faster it spins (Stage 9.4)</text><g font-size="10" fill="var(--muted)"><text x="20" y="40">Outside drivers:</text><text x="20" y="54">inflation and oil shock · Fed hikes</text><text x="20" y="68">shrinking foreign share · Japan/UK selloff</text><text x="20" y="82">independence doubts · downgrades</text></g><g font-size="10" fill="var(--ink)"><text x="420" y="278">Victims:</text><text x="420" y="292">mortgages · valuations · banks · preferreds</text></g></svg><figcaption>The red arrows form a circle: higher rates make interest dearer, deficits bigger, supply heavier and compensation higher. The drivers outside the circle set how fast it spins; the yield at the bottom decides who gets hurt (see ④–⑥).</figcaption></figure>

**“Bond vigilantes”** is a phrase the economist Ed Yardeni coined in the 1980s. When a government's fiscal or monetary policy costs investors their confidence, bond investors **sell its bonds and push yields up**, punishing it through its borrowing costs until it changes course. In the early 1990s, Clinton adviser James Carville famously joked that if he were reincarnated, he'd want to come back as the bond market, because it can intimidate everybody.

Three recent real-world episodes:

- **September 2022, the UK.** On September 23, the Truss government's “mini-budget” announced large unfunded tax cuts. Gilt yields surged; the 30-year rose more than 1 percentage point in a few days. Pension funds running leveraged liability-driven investment (LDI) strategies faced collateral calls and were forced to sell gilts, pushing yields higher still: **a self-amplifying doom loop.** The Bank of England announced temporary purchases of long-dated gilts on September 28 (ending October 14), and Liz Truss announced her resignation on October 20 after about 45 days in office. **The lesson: leverage hidden inside “safe” assets can turn a bond selloff into a financial-stability crisis.**
- **April 2025, the US.** After the “Liberation Day” tariffs of April 2, US stocks, the dollar and Treasuries **all fell together**, an unusual combination dubbed “sell America.” On April 9 the administration announced a 90-day pause on most of the reciprocal tariffs.
- **May 2025, the US.** After Moody's downgrade, the 30-year closed above 5%, reaching about 5.08% on May 21.

**Fiscal dominance** is the deeper worry (Stage 9.4 covers it in detail). Once government debt grows large enough, the central bank comes under pressure to keep rates below what fighting inflation requires, so that the government can afford its interest. If markets come to believe the central bank will defer to the Treasury, **the long end demands more compensation for inflation risk.** That's why many market participants read the Warsh-led Fed's September 2026 hike as a statement of independence: hiking at the short end may actually help anchor inflation expectations at the long end.

**The long-term yield is the one interest rate a government can't set.** The Fed can pin the overnight rate wherever it likes, but the 30-year price is set by buyers and sellers around the world. It's a **live vote** on a country's long-run fiscal and monetary credibility.

### ④ Why it's worrying, part 1: mortgages, stock valuations and financial balance sheets

**Mortgages.** A US 30-year fixed mortgage is priced roughly as the 10-year Treasury yield plus a spread. In September 2026 mortgage rates were around **7%**. Take a $400,000, 30-year loan with level monthly payments:

<table><tr><th>Mortgage rate</th><th>Monthly payment</th><th>Change</th></tr><tr><td>3% (around 2021)</td><td>about $1,686</td><td>baseline</td></tr><tr><td>6%</td><td>about $2,398</td><td>+42%</td></tr><tr><td>7% (about September 2026)</td><td>about $2,661</td><td>+58%</td></tr><tr><td>8%</td><td>about $2,935</td><td>+74%</td></tr></table>

The same income now supports a much smaller house. People holding 3% mortgages don't want to sell and move (the “lock-in effect”), and home sales freeze up.

**Stock valuations.** Stage 5.3 shows that a stock is worth its future cash flows discounted at a rate equal to the risk-free rate plus an equity risk premium. A rough Gordon-model sketch (illustrative numbers): with the 10-year at about 5.2%, an equity risk premium of 3% and long-run growth of 4%, a fair P/E is about 1 ÷ (8.2% − 4%) ≈ **23.8**. Raise the risk-free rate by another point and it drops to about **19.2**, roughly −19%. On September 25, 2026 the S&P 500 stood at about 7,743 and the Shiller CAPE at about 41.5 (the record is 44.2, just before 2000). On one common framing, stocks' earnings yield (about 2.4%) is well below the 10-year Treasury yield (about 5.2%), **putting the equity risk premium in one of its thinnest zones since the early 2000s** (the exact figure depends on the model). The higher the long end goes, the thinner that cushion.

**Financial balance sheets.** Stage 4.4 worked it out: a 30-year bond with a 5% coupon loses about 13.8% for a 1-point rise in yield. Going from 1.65% at end-2020 to about 5.5% in September 2026, the same bond's price is roughly **cut in half**.

- **Banks** hold lots of long bonds and fixed-rate loans. Unrealized losses eat into capital, and if deposits walk out and the bank is forced to sell, paper losses become real ones. That was Silicon Valley Bank's script in March 2023 (Stage 10.3).
- **Insurers and pension funds** have long liabilities too, so higher yields aren't necessarily bad for a well-matched institution (the present value of what it owes falls as well). The danger lies where **leverage has amplified duration**, like UK LDI in 2022.
- **Companies** borrow at the Treasury yield plus a credit spread (Stage 4.6). Move the anchor up and everyone's long-term funding cost moves up with it; heavily indebted firms that rely on rolling over cheap debt are hit first.

### ⑤ Why it's worrying, part 2: the government's self-reinforcing interest bill

This is the most important channel, and the slowest.

- US federal **net interest** was about $970 billion in 2025. CBO's February 2026 baseline had it at **about $1 trillion or more** in 2026 (about 3.3% of GDP), rising to about $2.1 trillion (about 4.6%) by 2036. That forecast was made **before** the Iran-war rate spike, so the real figures are likely higher.
- **Interest now costs more than national defense**, and has since FY2024.

Run the numbers. Debt held by the public is about $32.36 trillion. If the average financing cost on that whole stock rises by 1 percentage point, **annual interest eventually goes up by about $324 billion**, roughly 1% of GDP (about $32.5 trillion). That doesn't happen overnight: old bonds only pick up the new rate when they mature and are refinanced. But a big chunk of US debt is T-bills that mature within months, and the average maturity is only a few years, so **higher rates feed through to the whole interest bill within a few years**. The more the Treasury leans on bills to relieve the long end, the faster that pass-through.

Hence the loop in ③'s diagram: **yields ↑ → interest ↑ → deficit ↑ → supply ↑ → term premium ↑ → yields ↑**. Stage 9.4 formalizes it by comparing r and g: when the government's average borrowing rate r exceeds nominal growth g, debt-to-GDP drifts upward on its own even if the primary deficit stays the same.

**To be fair, there are forces that could slow or reverse the loop:**

- In a recession or financial panic, money “flies to safety” into long Treasuries and pushes the long end down (the bull flattening of Stage 4.3).
- Fiscal consolidation (higher taxes, lower spending), falling inflation, or faster growth from AI-driven productivity (Stage 19.1).
- Policy tools: the Treasury can issue fewer long bonds and do more buybacks; in a crisis the central bank can buy long bonds (as the Bank of England did in 2022), at a cost to its independence and to inflation expectations.
- Tariff revenue: in February 2026 CBO estimated higher tariffs would cut deficits by about $3.0 trillion, but on February 20, 2026 the Supreme Court struck down the tariffs imposed under the International Emergency Economic Powers Act, so that piece is highly uncertain.

So the more precise statement is: **a rising 30-year yield isn't a crisis in itself, but it's a warning that the margin for error in fiscal and monetary policy is shrinking.**

### ⑥ What it means for bitcoin, bitcoin treasury companies and preferreds

**This section explains mechanisms and frameworks only; it is not investment advice.**

**Bitcoin: two forces pulling in opposite directions.**

- **Headwind: real rates and opportunity cost.** When a risk-free asset pays 5.5%, holding an asset that pays nothing costs you 5.5% a year in forgone income ($5,490 on $100,000). When real rates rise and liquidity tightens, bitcoin and other assets whose value lies in the distant future have often come under pressure (Stage 12.4). The 2026 market fits that pattern: after peaking at about $126,000 on October 6, 2025, bitcoin fell as low as about $58,000 at the end of June 2026 and was about $84,000 on September 25–26. But correlation isn't causation, and crypto's own deleveraging was also in play.
- **Tailwind: the “debasement trade” narrative.** The very worries pushing the long end up (debt, deficits, fiscal dominance, doubts about central-bank independence) are the core argument of hard-asset advocates: if the eventual way out is inflation, scarce assets are the hedge. Gold makes a handy comparison. It set a record close of about $5,318 on January 29, 2026, then fell to about $3,992 on July 16 as real yields rose and the Fed turned hawkish. **The same macro story can be a headwind in the short run and a tailwind in the long run.** That's exactly the thread Stage 20.1 ties together.

**Preferreds from bitcoin treasury companies: competing with Treasuries for the same buyers.**

- A fixed-dividend perpetual preferred is long-dated fixed income priced as “Treasury yield plus a credit spread.” Suppose one pays $10 a year on $100 of stated value and currently yields 10%, about 4.5 points over the 30-year Treasury. If the 30-year yield rises another point with the spread unchanged, the required yield becomes 11% and the price falls from $100 to about **$90.91**. If risk appetite also sours and the spread widens by 0.5 points, the price is about **$86.96** (Stage 18.1).
- **The higher the risk-free yield, the less special a “10% yield” looks.** Investors will ask whether 4 to 5 points over Treasuries is enough to bear bitcoin's price risk plus the issuer's credit risk. That's why floating-dividend designs such as Strategy's STRC anchor themselves to the short end rather than the long end (Stage 17.4).
- **For the issuing company itself**, a higher risk-free rate means a higher cost of capital. Raising money with preferreds to buy bitcoin only pays off if bitcoin's long-run return beats that cost (the flywheel math of Stage 16.7).

**Stablecoins and tokenized Treasuries** sit at the other end of the curve: the higher short-term rates are, the more their T-bill reserves earn (Stage 13.2). So the same “rates are rising” headline pushes different corners of the new financial system in completely different directions.

Squeeze the lesson into one sentence: **the 30-year yield is the price of long-term money and a live vote on a nation's fiscal credibility; when it rises, every distant cash flow gets discounted harder, and the government's own interest bill makes the process feed on itself.** In Stage 20.1 we'll connect it with Lin's other two headlines.
`,

  demo: "long-bond-30y",

  analogy: `
Think of the 30-year Treasury yield as **a city's index of rents on 30-year leases**.

Every long-term arrangement in town is priced off it. The bank that writes you a 30-year mortgage looks at it. The company signing a 30-year factory lease looks at it. The pension fund promising benefits thirty years out looks at it. When it goes up, every long-term bill in town goes up with it.

The biggest tenant is city hall. It owes more rent every year and keeps signing new long leases to pay the old rent. The landlords (investors) start muttering: “This tenant's tab keeps growing. Will it end up paying us in coupons it prints itself?” So the rent on new leases keeps creeping up. That's the **term premium**.

Worse, “paying rent” has become a bigger line in city hall's budget than “policing” (defense). The higher the rent, the bigger the deficit, the more new leases it has to sign, the more the landlords charge… **The wheel turns by itself.**

Every so often the landlords act together: they refuse to renew and push the rent high enough to make city hall sweat. Those are the **bond vigilantes**. In 2022, that's how London ended up with a new city hall.

Elsewhere in town, people holding fixed-income contracts (preferreds) find that their contracts are worth less on the resale market. And people holding “rent-free gold bars and bitcoin” wince at the income they're giving up, while quietly thinking: the shakier the tenant's credit, the more hard money should be worth in the end.
`,

  misconceptions: [
    "**“The Fed sets the 30-year yield.”** The Fed directly controls the overnight rate, which pins only the far left of the curve. The 30-year is set by buyers and sellers worldwide and depends mainly on long-run inflation expectations and the term premium. While the Fed was cutting from end-2024 to end-2025, the 30-year yield actually edged higher.",
    "**“Rising yields mean a strong economy, so they're good news.”** It depends which piece is rising. Higher growth expectations and real rates can reflect strength. But if the rise is mostly the **term premium** (deficits, supply, inflation risk, doubts about independence), investors are demanding more compensation for risk, and that pressures mortgages, valuations and public finances. A large part of the rise since 2024 is the second kind.",
    "**“The US can print money, so it doesn't matter how high Treasury yields go.”** The US is very unlikely to default in nominal terms, but the risk of “printing to pay” shows up as inflation and a higher term premium, and higher yields make interest costs snowball (net interest already exceeds defense spending). Being able to print isn't the same as having no cost; the long end puts a price on it.",
    "**“The long-end selloff is a purely American affair.”** It was global in 2025–2026: Japan's 10-year yield hit its highest since 1996 and the BOJ's policy rate its highest since 1995; the UK 30-year gilt reportedly hit its highest since 1998; Germany's 10-year reached its highest in about 17 years. Money moves between government bond markets, and higher yields in Japan also reduce Japanese investors' appetite for Treasuries.",
    "**“Rising rates are nothing but bad for bitcoin.”** In the short run, higher real rates raise the opportunity cost of holding a non-yielding asset and have often coincided with pressure on risk assets. But the fiscal and independence worries driving the long end up are also the core of the “hard assets hedge debasement” narrative. The two forces point in opposite directions, and which wins depends on the time horizon and the circumstances.",
  ],

  quiz: [
    {
      q: "On the New York Fed's ACM model, the 10-year term premium rose from about −1.36% in July 2020 to about +0.84% in July 2026. What does that say about a major source of the rise in long yields this decade?",
      options: [
        "The extra compensation investors demand for holding long Treasuries rose sharply",
        "The US defaulted on its Treasuries",
        "The Fed raised the 30-year yield directly",
        "Short-term bill yields fell",
      ],
      answer: 0,
      explain: "**A rising term premium means investors want more compensation to lock money up for decades.** Behind it are deficits and supply, inflation risk and a changing buyer base. It also means Fed cuts may not bring long yields down.",
    },
    {
      q: "On a $400,000, 30-year fixed mortgage, how does the monthly payment change if the rate goes from 3% to 7%?",
      options: [
        "Barely at all, since the principal is the same",
        "From about $1,686 to about $2,661, up almost 60%",
        "More than four times higher, since the rate went from 3% to 7%",
        "From about $2,661 down to about $1,686",
      ],
      answer: 1,
      explain: "**About $1,686 → $2,661 a month, +58%.** The house the same income can support shrinks dramatically. This is the most direct route by which the long end reaches ordinary households.",
    },
    {
      q: "Which best describes the long end's self-reinforcing loop in ③?",
      options: [
        "Yields rise → stocks rise → tax revenue rises → the deficit shrinks",
        "Yields rise → the Fed automatically cuts → yields fall back",
        "Yields rise → inflation falls → the term premium disappears",
        "Yields rise → the government's interest bill grows → the deficit widens → Treasury supply grows → the term premium rises → yields rise further",
      ],
      answer: 3,
      explain: "**The interest bill is the gear that turns the loop.** With about $32.36 trillion of debt held by the public, each extra point of average financing cost eventually adds about $324 billion a year in interest. The bigger the debt, the faster the loop spins (Stage 9.4).",
    },
    {
      q: "In the UK gilt crisis of September 2022, what turned a bond selloff into a financial-stability event?",
      options: [
        "The UK defaulted on its gilts",
        "The Bank of England hiked rates sharply",
        "Pension funds' leveraged LDI strategies faced collateral calls and were forced to sell gilts, creating a “sell → yields up → sell more” spiral",
        "Foreign investors sold every gilt they owned",
      ],
      answer: 2,
      explain: "**Leverage hidden inside “safe” assets.** After the September 23 mini-budget, yields surged, LDI collateral calls forced selling, the Bank of England stepped in to buy long gilts on September 28, and Liz Truss announced her resignation on October 20.",
    },
    {
      q: "A perpetual preferred pays $10 a year on $100 of stated value and currently yields 10%. If the 30-year Treasury yield rises by 1 point and the credit spread stays the same, what is its price, roughly?",
      options: [
        "About $90.91",
        "Still $100, because the dividend hasn't changed",
        "About $110",
        "About $50",
      ],
      answer: 0,
      explain: "**Required yield 10% → 11%, perpetuity price = 10 ÷ 11% ≈ $90.91.** If the spread also widens by 0.5 points, the price is about $86.96. This is the most direct path from a rising long end to bitcoin treasury companies' preferreds (Stage 18.1).",
    },
  ],

  further: [
    { label: "US Treasury: Daily Treasury Par Yield Curve Rates (latest 30-year yield)", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve" },
    { label: "New York Fed: ACM Treasury term premia data", url: "https://www.newyorkfed.org/research/data_indicators/term-premia-tabs" },
    { label: "Federal Reserve: FOMC statement of September 16, 2026 (a 0.25-point hike)", url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm" },
    { label: "CRFB: analysis of CBO's February 2026 Budget and Economic Outlook, 2026–2036", url: "https://www.crfb.org/papers/cbos-february-2026-budget-and-economic-outlook" },
    { label: "Bank of England: gilt market operation announcement, September 28, 2022 (the LDI crisis)", url: "https://www.bankofengland.co.uk/news/2022/september/bank-of-england-announces-gilt-market-operation" },
  ],
};
