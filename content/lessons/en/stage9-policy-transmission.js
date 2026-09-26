export default {
  id: "policy-transmission",
  stage: 9,
  order: 2,
  title: "How Policy Transmits: From the Fed Funds Rate to Mortgages, Stocks & Bitcoin",
  difficulty: "systems",
  prereqs: ["fed-toolkit", "yield-curve", "valuation"],

  oneLiner:
    "The Fed directly controls one overnight interest rate, yet it is trying to steer jobs and prices for hundreds of millions of people. What connects the two is a set of pipes — **interest rates, credit, asset prices, the exchange rate and expectations** — and every pipe has a **lag**: markets react in minutes, economic activity in six to eighteen months, inflation in one to two years. **Between late February and late September 2026 the policy rate moved a quarter point while the 10-year Treasury yield rose about 1.2 points.** Understand transmission and you'll see why “what the Fed did” often matters less than “what markets think it will do.”",

  intuition: `
Start with a set of numbers that doesn't seem to add up (as of September 2026; data from FRED and the Fed):

- On February 27, 2026 — the day before the Iran war began — the 10-year Treasury yielded about 3.97% and the 30-year about 4.64%.
- For the next seven months the Fed **did nothing**, until it raised rates by a quarter point on September 16.
- Yet by September 24 the 10-year had climbed to about **5.18%**, the 30-year to about **5.47%**, and 30-year mortgage rates sat around **7%**.

The policy rate moved 0.25; long rates moved 1.2. The reverse puzzle exists too. From March 2022 to July 2023 the Fed raised rates by a full 5.25 percentage points, its fastest tightening since the 1980s, and the 10-year/2-year spread stayed inverted for about 26 months, a record — yet as of September 2026 the promised recession never showed up.

The takeaway: **monetary policy is not a single pipe running from the Fed to your house. It is a network.** The Fed turns a valve at the source, and water flows toward the economy through several pipes:

- **The interest-rate channel.** Short rates change, expectations about the future change with them, and long rates, mortgage rates and corporate borrowing costs follow.
- **The credit channel.** Whether banks want to lend, to whom, and at what spread.
- **The asset-price channel.** Discount rates change, so stocks, houses, bonds and Bitcoin are all repriced, and people feel richer or poorer.
- **The exchange-rate channel.** When US rates rise relative to the rest of the world, the dollar strengthens: imports get cheaper and exports get harder.
- **The expectations channel.** If firms and workers believe inflation will return to 2%, they don't raise prices or demand catch-up raises in advance. **The central bank's credibility is itself a tool.**

This lesson rests mainly on **Idea ①, the price of time.** Stage 2.3 said that any asset is worth its future cash flows discounted at some rate; Stage 4.3 said that a long-term yield is the expected path of short rates plus a term premium. Transmission joins those two sentences together: **the Fed changes the starting point of the price of time, and every asset and every loan then has to redo its arithmetic** — some immediately, others only when their contracts come up for renewal.

This matters for what's ahead. Stage 9.3 explains why Bitcoin tracks “liquidity” so closely; Stage 12.4 looks at Bitcoin's correlation with the Nasdaq; and in Stage 18.1 you'll price a roughly 10% perpetual preferred with exactly this logic — like a 30-year Treasury, it is extremely sensitive to long-term rates.

**In this lesson we break it into five pieces:**

- **① The interest-rate channel: from overnight to the long end to your mortgage**
- **② The credit channel: will banks lend, and how wide are spreads?**
- **③ The asset-price channel: discount rates, wealth effects and Bitcoin**
- **④ The exchange-rate channel: the dollar is the world's interest rate**
- **⑤ Expectations and lags: why the effects take a year or two**
`,

  mechanics: `
<figure><svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Five pipes of monetary transmission (stylized)</text><rect x="210" y="32" width="220" height="42" rx="8" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="320" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Fed funds rate + guidance</text><text x="320" y="66" text-anchor="middle" font-size="10" fill="var(--muted)">what the Fed controls directly</text><g stroke="var(--line)" stroke-width="1.5"><line x1="320" y1="74" x2="72" y2="112"/><line x1="320" y1="74" x2="194" y2="112"/><line x1="320" y1="74" x2="316" y2="112"/><line x1="320" y1="74" x2="438" y2="112"/><line x1="320" y1="74" x2="560" y2="112"/></g><g font-size="12" font-weight="700" fill="var(--ink)" text-anchor="middle"><rect x="17" y="112" width="110" height="54" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="72" y="134">① Rates</text><rect x="139" y="112" width="110" height="54" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="194" y="134">② Credit</text><rect x="261" y="112" width="110" height="54" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="316" y="134">③ Asset prices</text><rect x="383" y="112" width="110" height="54" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="438" y="134">④ Exchange rate</text><rect x="505" y="112" width="110" height="54" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="560" y="134">⑤ Expectations</text></g><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="72" y="152">short → long → mortgage</text><text x="194" y="152">lending, spreads</text><text x="316" y="152">stocks, homes, BTC</text><text x="438" y="152">dollar strength</text><text x="560" y="152">inflation views</text></g><g stroke="var(--line)" stroke-width="1.5"><line x1="72" y1="166" x2="250" y2="202"/><line x1="194" y1="166" x2="285" y2="202"/><line x1="316" y1="166" x2="320" y2="202"/><line x1="438" y1="166" x2="355" y2="202"/><line x1="560" y1="166" x2="390" y2="202"/></g><rect x="170" y="202" width="300" height="36" rx="8" fill="var(--blue-soft)" stroke="var(--line)"/><text x="320" y="225" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Demand: spending · investment · net exports</text><line x1="320" y1="238" x2="320" y2="262" stroke="var(--line)" stroke-width="1.5"/><rect x="210" y="262" width="220" height="34" rx="8" fill="var(--green-soft)" stroke="var(--line)"/><text x="320" y="284" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Jobs and inflation</text><g font-size="10" fill="var(--orange-ink)"><text x="440" y="56">market prices: minutes to days</text><text x="478" y="224">output: ~6–18 months</text><text x="438" y="284">inflation: ~12–24 months</text></g><text x="320" y="314" text-anchor="middle" font-size="10" fill="var(--muted)">Expectations can also skip demand and act directly on pricing and wage bargaining</text></svg><figcaption>One valve, five pipes. Each pipe has a different length (lag), and fiscal policy and oil prices are washing through the same system at the same time.</figcaption></figure>

### ① The interest-rate channel: from overnight to the long end to your mortgage

This is the most direct pipe, and the formula from Stage 4.3 is the star:

$$
n-year yield ≈ average expected short rate over n years + term premium
$$

So what a policy decision does to the long end depends on two things: **how much it changes expectations about the future**, and **how much compensation investors demand for bearing long-term risk.** On September 25, 2026 the 2-year yield was about 4.81%, nearly a full point above the effective fed funds rate of about 3.88%. Markets had already written “more hikes” into the price. That's why the bond market often shrugs on the day the Fed actually moves: **prices change when expectations form, not when the decision lands.**

The long end also carries the term premium. The New York Fed's ACM model put the 10-year term premium at about −1.36% at the end of July 2020 and about +0.73% on September 24, 2026 — a swing of more than two points that has little to do with what the Fed is doing this month, and much more to do with inflation uncertainty, deficits and the supply of Treasuries (Stage 9.4). Of the roughly 1.2-point rise in the 10-year from February to September 2026, **only a small slice came from actual hikes; most came from expected future hikes and a higher term premium.** The oil shock stoked inflation fears, while deficits and a flood of issuance — including record long-dated corporate bonds to fund AI data centers — crowded the buyers at the long end.

Then comes the mortgage. The US 30-year fixed mortgage broadly tracks the 10-year Treasury. On a $400,000, 30-year loan, the monthly payment is about **$2,398 at 6%** and about **$2,661 at 7%** — $263 more every month, which shrinks the house a buyer can afford. But US transmission has a quirk: the vast majority of existing mortgages are **fixed-rate**, and many borrowers locked in around 3% in 2020–21 (a payment of about $1,686). Rate hikes don't reach them. This **lock-in effect** blunts the blow to existing households, but it also makes people reluctant to sell and move, freezing housing turnover. In the UK, Canada and Australia, where mortgages are floating or fixed for only a few years, the same hike passes through much faster.

### ② The credit channel: will banks lend, and how wide are spreads?

An interest rate is only the sticker price of borrowing; whether you can get the loan is a separate question. In a classic 1995 paper Ben Bernanke and Mark Gertler called this the **credit channel** of monetary policy, and it has two branches:

- **The bank lending channel.** Hikes raise banks' funding costs and knock down the value of the bonds they hold, eroding capital (Silicon Valley Bank in Stage 10.3 is the extreme case). Banks with thinner capital tighten lending standards, and small firms and weaker borrowers are the first to be turned away.
- **The balance-sheet channel, or financial accelerator.** Borrowers' collateral — homes, shares, business assets — loses value as rates rise, so they can borrow less; borrowing less means less investment and spending, which pushes asset values down further. **It is an amplifier**, and it can make a modest hike hit disproportionately hard when credit is already strained.

The market's thermometer for this channel is the **credit spread** (Stage 4.6): the corporate bond yield minus the Treasury yield of the same maturity. Wider spreads mean lenders are more afraid of default. A new-era twist is **private credit**. The Financial Stability Board estimates it at about $1.5–2 trillion globally at the end of 2024, and it is **mostly floating-rate**, so when the Fed hikes, borrowers' interest bills jump right away — faster pass-through than traditional fixed-rate bonds. The autumn 2025 bankruptcies of companies such as First Brands and the redemption limits at Blue Owl's funds in April 2026 were this pipe creaking under high rates.

### ③ The asset-price channel: discount rates, wealth effects and Bitcoin

The Gordon model from Stage 5.3 is the fastest way into this pipe:

$$
stock value = next year's dividend ÷ (discount rate − growth rate)
$$

Say next year's dividend is $5, growth is 4% and the discount rate is 8%: value = 5 ÷ 4% = **$125**. Nudge the discount rate to 9% and value becomes 5 ÷ 5% = **$100 — a 20% drop.** One point on the discount rate, twenty percent off the price: that's an asset with a “duration” of roughly 20–25 years, more rate-sensitive than a 10-year Treasury. Growth stocks, whose cash flows sit further in the future, are more sensitive still, which is why the Nasdaq fell much harder than the Dow during the 2022 hikes.

2026 supplied a counterexample. The 10-year climbed to about 5.2%, yet the S&P 500 closed around 7,743 on September 25, not far from its August record. The numerator moved too: markets expected S&P 500 earnings to grow about 32% in 2026, as the AI investment boom raised the growth rate enough to offset the higher discount rate. The price was a thinner valuation cushion. At a forward P/E of about 19.2, the earnings yield is about 5.2% — almost exactly the 10-year Treasury yield — so on the simple “Fed model,” **the equity risk premium over Treasuries is close to zero** (a rough, model-dependent calculation, not an official figure).

When asset prices move, behavior follows: the **wealth effect.** When stocks and homes rise, people feel richer and spend more; when they fall, the reverse.

**Bitcoin** has no cash flows, so the Gordon formula doesn't apply — but this pipe still washes over it. First, interest rates are the **opportunity cost** of holding it: if Treasuries pay 5% risk-free, an asset that pays nothing must offer a higher expected gain to attract buyers. Second, its marginal buyers often use leverage (Stage 7.5); when funding costs rise and risk appetite falls, they are the first to be liquidated. Bitcoin set a record around $126,000 on October 6, 2025, fell to about $58,000 at the end of June 2026, and was back around $84,000 in late September. Along that road, **real rates and dollar liquidity** were a recurring backdrop (Stage 9.3, Stage 12.4). For the perpetual preferreds that DATs issue, the pipe is even more direct: a perpetual paying $10 a year is worth $100 when the market demands 10% and only about $90.90 when it demands 11% (Stage 18.1).

### ④ The exchange-rate channel: the dollar is the world's interest rate

When US rates rise relative to everyone else's, global money prefers dollar assets and the dollar strengthens. A strong dollar makes imports cheaper (which lowers US inflation) and exports harder (which slows US growth). It also squeezes **foreign companies and governments that borrowed in dollars**, since their income is in local currency while their debts are in dollars. That's why a Fed hike is often described as a hike for the whole world.

The 2026 script: as US long yields climbed, the dollar index recovered from a January 27 low of about 96.2 to about 101.0 on September 25, with USD/JPY around 159. The Bank of Japan raised its rate to 1.25% on September 18, its highest since 1995, and still couldn't close the gap. The counterexample is April 2025's “sell America” episode, when tariff shock sent US stocks, the dollar and Treasuries **down together**. That broke the usual “US rates up, dollar up” link, and it shows that when markets start to doubt the safety of US assets themselves, the exchange-rate channel can run backwards.

The new-era change: **dollar stablecoins** are moving this pipe on-chain. People anywhere can hold dollar-denominated tokens backed by US Treasury bills without a US bank account (Stage 13.2), and the US policy rate flows straight into those issuers' income and growth through the yield on their reserves.

### ⑤ Expectations and lags: why the effects take a year or two

The last pipe is invisible and may matter most. If firms and workers **believe** inflation will return to 2%, they won't raise prices pre-emptively or demand catch-up pay, and inflation really does come down more easily. **A central bank's credibility is self-fulfilling.** That's why markets read Kevin Warsh's first act as chair in September 2026 — a hike — as a statement of independence: part of its effect lies not in the 25 basis points but in telling everyone that this central bank will pay a price for its 2% goal.

Then there are **lags.** Milton Friedman famously said monetary policy acts with “long and variable lags.” Common rules of thumb:

- **Financial markets:** minutes to days (yields, stock prices, exchange rates).
- **Economic activity:** about 6–18 months (housing, business investment, hiring).
- **Inflation:** about 12–24 months.

So a central bank is always **driving by looking in the rear-view mirror**: today's decision takes a year to bite, and by then the road may have changed. Why didn't the 2022–23 hikes cause a recession (as of September 2026)? Common explanations: households and firms locked in huge amounts of debt at ultra-low fixed rates in 2020–21, insulating them from the rate channel; government deficits running around 6% of GDP kept fiscal policy pressing the accelerator; and one unusual mechanism — **the higher rates go, the more interest the government pays to bondholders.** US federal net interest now runs about $1 trillion a year, and that money is income for many households and institutions (Stage 9.4 covers the other side of this: debt sustainability).

**The lesson in one sentence: the Fed only turns the valve at the source; the water reaches the economy through five pipes — rates, credit, asset prices, the exchange rate and expectations — each of a different length and each washed by fiscal policy and oil shocks at the same time; so to judge a policy move, ask “which expectations about the future did it change?” rather than just “how many basis points did it move today?”**
`,

  demo: "policy-transmission",

  analogy: `
Picture monetary policy as **turning the wheel on a supertanker.**

The moment the captain (the Fed) turns the wheel, the wheel itself has turned — that's the overnight rate, set in seconds. The passengers on deck (financial markets) see the captain reach for it and shift their weight to one side at once: yields, stock prices and exchange rates move within minutes. They may even guess the turn before the captain touches the wheel and lean early (the 2-year yield running ahead of the hikes).

But the bow doesn't actually start to swing (jobs and output) for six months to a year and a half, and the cargo doesn't settle (inflation) for a year or two. An impatient captain who sees “the ship hasn't turned yet” and keeps spinning the wheel usually finds the ship has turned too far by the time it responds. Those are the long and variable lags.

Worse, there are other forces at sea. A current (huge government deficits) pushes the ship the opposite way; a storm (the 2026 oil shock) slams into it from the side; and some passengers have strapped themselves to the rail (households locked into 3% fixed mortgages) and won't move however the ship turns. So old hands don't watch how many degrees the wheel has turned. **They watch where the bow is actually pointing and where the passengers think the ship is going** — the first is the economic data, the second is market expectations.
`,

  misconceptions: [
    "**“When the Fed hikes, mortgage rates rise by the same amount.”** — Mortgages follow the 10-year Treasury, which depends on expected future rates and the term premium. From late February to late September 2026 the policy rate rose only 0.25 points while the 10-year rose about 1.2 points; when the Fed cut in autumn 2024, long rates actually went up.",
    "**“Rate hikes work immediately; inflation should fall within a month or two.”** — Markets react within days, but activity typically takes 6–18 months and inflation 12–24 months to respond fully, and the lags vary. That's exactly why central banks can overshoot on the way up or ease too early.",
    "**“With rates this high, stocks have to fall.”** — The discount rate is only the denominator; the numerator (earnings growth) moves too. In September 2026 the 10-year was about 5.2% and the S&P 500 was still near a record because markets expected strong AI-driven earnings growth. The cost is a thinner cushion: the forward earnings yield roughly equals the Treasury yield, leaving an equity risk premium near zero.",
    "**“Bitcoin has no cash flows, so interest rates don't affect it.”** — Rates are the opportunity cost of holding a non-yielding asset, and Bitcoin's marginal buyers often use leverage, so funding costs and risk appetite both follow policy. No DCF applies, but it still gets washed through the asset-price and liquidity pipes.",
    "**“Hiking 5.25 points in 2022–23 without a recession proves monetary policy has stopped working.”** — More precisely, transmission was blunted and offset: much existing debt was locked in at low fixed rates, fiscal deficits stayed high, and huge government interest payments became someone's income. The policy effect is still clearly visible in housing turnover, bank credit and private credit.",
  ],

  quiz: [
    {
      q: "On September 25, 2026 the 2-year Treasury yielded about 4.81% while the effective fed funds rate was about 3.88%. Under the rate channel's logic, what does that mean?",
      options: [
        "Markets had already built expected future hikes into the 2-year yield",
        "The 2-year Treasury's credit risk had risen",
        "The Fed was directly setting the 2-year yield",
        "Nothing — the two are unrelated and the gap is noise",
      ],
      answer: 0,
      explain: "An n-year yield ≈ the average expected short rate plus a term premium. A 2-year well above today's policy rate means **markets were pricing hikes in advance** — prices move when expectations form.",
    },
    {
      q: "Next year's dividend is $5 and growth is 4%. If the discount rate rises from 8% to 9%, what happens to the stock's Gordon-model value?",
      options: [
        "It falls from $125 to about $119 (about −5%)",
        "It falls from $62.50 to $55.60",
        "It falls from $125 to $100 (−20%)",
        "Nothing, because the dividend hasn't changed",
      ],
      answer: 2,
      explain: "5 ÷ (8% − 4%) = 125; 5 ÷ (9% − 4%) = 100. **The denominator goes from 4% to 5% and value drops 20%** — a stock behaves like a long-duration asset, very sensitive to the discount rate.",
    },
    {
      q: "Which best explains why US rate hikes hit existing household mortgages less than UK hikes do?",
      options: [
        "US households don't take out mortgages",
        "Most existing US mortgages are 30-year fixed-rate, many locked in at the low rates of 2020–21",
        "The Fed caps mortgage rates",
        "US mortgages float with the overnight rate",
      ],
      answer: 1,
      explain: "**The lock-in effect**: fixed-rate payments don't change when rates rise, so the rate channel acts only on new borrowers, while floating or short-fixed mortgages in places like the UK pass hikes through much faster.",
    },
    {
      q: "What is the “financial accelerator” (balance-sheet channel) that Bernanke and Gertler described?",
      options: [
        "The central bank speeding up money printing",
        "High-frequency trading amplifying price swings",
        "A stronger dollar making exports harder",
        "A loop in which hikes lower collateral values, reduce borrowing capacity, cut spending and push asset values down further",
      ],
      answer: 3,
      explain: "Collateral decides how much you can borrow. **Rates up → collateral down → borrowing capacity down → spending down → asset values down again**, amplifying policy when credit is tight.",
    },
    {
      q: "A perpetual preferred pays $10 a year. If the market's required yield rises from 10% to 11%, roughly what happens to its price?",
      options: [
        "It rises from $100 to about $111",
        "It falls from $100 to about $90.90",
        "Nothing, because the dividend is fixed",
        "It falls from $100 to about $50",
      ],
      answer: 1,
      explain: "Perpetuity value = dividend ÷ yield: 10 ÷ 10% = 100, 10 ÷ 11% ≈ 90.9. **When long rates move, fixed-income assets with no maturity take the hit first** (Stage 18.1).",
    },
  ],

  further: [
    { label: "Bernanke & Gertler (1995), “Inside the Black Box: The Credit Channel of Monetary Policy Transmission,” Journal of Economic Perspectives", url: "https://www.aeaweb.org/articles?id=10.1257/jep.9.4.27" },
    { label: "New York Fed: ACM term-premium model and data", url: "https://www.newyorkfed.org/research/data_indicators/term-premia-tabs" },
    { label: "FRED: 30-year fixed mortgage rate (MORTGAGE30US) history", url: "https://fred.stlouisfed.org/series/MORTGAGE30US" },
    { label: "FRED: 10-year Treasury yield (DGS10) history", url: "https://fred.stlouisfed.org/series/DGS10" },
    { label: "Federal Reserve: Monetary Policy (framework, statements and minutes)", url: "https://www.federalreserve.gov/monetarypolicy.htm" },
  ],
};
