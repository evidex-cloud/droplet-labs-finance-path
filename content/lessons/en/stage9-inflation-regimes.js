export default {
  id: "inflation-regimes",
  stage: 9,
  order: 5,
  title: "Inflation Regimes: The 1970s, 2021–23 & the Next One",
  difficulty: "systems",
  prereqs: ["inflation", "real-vs-nominal", "fiscal-dominance"],

  oneLiner:
    "Inflation isn't just a number published every month. It has **regimes**: its level, its volatility, and whether people believe it will return to target (whether expectations are “anchored”). In the 1970s the anchor slipped, and it took a Volcker-sized recession to reset it. The 1984–2007 “Great Moderation” let stocks and bonds hedge each other, and the 60/40 portfolio made money almost on autopilot. In 2021–23 inflation hit 9.1%, and in 2022 stocks and bonds **fell together.** In 2026 an oil shock pushed CPI back to 4.2% and the Fed hiked. **When the regime changes, the relationships between assets flip** — this lesson teaches you to recognize which regime you're standing in.",

  intuition: `
Start with a report card. In 2022 the classic 60/40 portfolio — 60% US stocks, 40% US bonds — had one of its ugliest years in decades: the S&P 500 fell about 19% and the US aggregate bond index about 13%. **The two things meant to hedge each other went down together.** That wasn't bad luck. **The regime had changed**, from “low, steady inflation” to “high, unstable inflation.”

You can identify an inflation regime with three questions:

- **Level:** is inflation around 2%, or 5%, or 10%?
- **Volatility:** is it roughly the same every year, or does it lurch around?
- **Are expectations anchored?** Do firms and workers believe “inflation will return to 2%,” or have they begun pricing goods and bargaining over wages as if “next year will be much worse”?

The answers shape how nearly every asset behaves:

- **Low, steady, anchored** (the 1990s through 2019): bad economic news usually means lower inflation and lower rates, so bonds rise when stocks fall. **Stocks and bonds are negatively correlated, and bonds act as insurance for stocks.**
- **High, unstable, unanchored** (the 1970s, 2022): bad news is often “inflation is higher,” rates rise, and stocks and bonds fall together. **The correlation turns positive and the insurance fails.**

The big regimes in US history:

- **1965–1982: the Great Inflation.** Vietnam and Great Society spending, Nixon's closing of the gold window on August 15, 1971, two oil shocks and a Fed that wasn't tough enough pushed CPI to **14.8%** in March 1980.
- **1979–1982: Volcker's shock therapy.** The federal funds rate was driven close to 20% and unemployment climbed above 10% before the anchor was nailed back down.
- **1984–2007: the Great Moderation.** Inflation and economic volatility both fell sharply. **2008–2020** then brought the opposite problem — inflation too low, with QE creating trillions of dollars and inflation still below 2% year after year.
- **2021–23: inflation returns.** Post-pandemic supply bottlenecks, huge fiscal stimulus and easy money combined to push CPI to **9.1%** in June 2022, the highest since 1981.
- **2026: an oil shock.** The Iran war that began on February 28 sent Brent crude to about $138 on April 7; CPI inflation rose from about 2.4% early in the year to about 4.2% in May and was about 3.4% in August; the Fed hiked on September 16. **As of September 2026, US inflation has been above the 2% target for more than five straight years.**

This lesson rests on **Idea ①, the price of time.** Inflation decides how much of a nominal interest rate is a genuine reward for time (the real rate of Stage 2.5), and the inflation regime decides how uncertain that reward is — which is exactly why long bonds demand a term premium (Stage 4.5, Stage 9.4). It also lays groundwork for what follows: Stage 11.2 looks at what 2022's flip in stock–bond correlation means for building portfolios, and Stage 20.2 turns “growth × inflation × liquidity” into a full map of macro regimes.

**In this lesson we break it into five pieces:**

- **① What an “inflation regime” is: level, volatility and the anchor**
- **② 1965–1982: the Great Inflation and the lost anchor**
- **③ Volcker and the Great Moderation: how credibility was won back**
- **④ 2021–23 and 2026: supply shocks, fiscal policy and the “transitory” debate**
- **⑤ What regime shifts mean for 60/40, gold and Bitcoin**
`,

  mechanics: `
### ① What an “inflation regime” is: level, volatility and the anchor

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">US CPI inflation regimes (stylized: key points joined, not the full series)</text><rect x="40" y="40" width="156" height="210" fill="var(--red-soft)" opacity=".6"/><rect x="214" y="40" width="211" height="210" fill="var(--green-soft)" opacity=".6"/><rect x="434" y="40" width="116" height="210" fill="var(--blue-soft)" opacity=".6"/><rect x="559" y="40" width="28" height="210" fill="var(--orange-soft)"/><rect x="596" y="40" width="16" height="210" fill="var(--btc-soft)"/><g font-size="11" font-weight="600" text-anchor="middle"><text x="118" y="34" fill="var(--red)">1965–82 Great Inflation</text><text x="320" y="34" fill="var(--green)">1984–2007 Great Moderation</text><text x="492" y="34" fill="var(--blue)">2008–20 lowflation</text><text x="585" y="34" fill="var(--orange-ink)">2021–26</text></g><line x1="40" y1="220" x2="612" y2="220" stroke="var(--line)" stroke-width="1.5"/><line x1="40" y1="197.5" x2="612" y2="197.5" stroke="var(--muted)" stroke-dasharray="4 4"/><text x="44" y="193" font-size="10" fill="var(--muted)">2% target</text><polyline fill="none" stroke="var(--orange)" stroke-width="2.2" points="40,202 86,155 104,183 131,82 150,165 180,53.5 205,184 277,149 343,202 439,157 448,243.6 499,219 536,194 549,218 569,118 578,184 601,193 604,173 607,182"/><g fill="var(--ink)" font-size="10"><circle cx="180" cy="53.5" r="3.5" fill="var(--red)"/><text x="188" y="56">Mar 1980: 14.8%</text><circle cx="131" cy="82" r="3" fill="var(--red)"/><text x="62" y="78">1974: ~12%</text><circle cx="569" cy="118" r="3.5" fill="var(--red)"/><text x="486" y="112">Jun 2022: 9.1%</text><circle cx="604" cy="173" r="3" fill="var(--red)"/><text x="522" y="168">May 2026: 4.2%</text><circle cx="448" cy="243.6" r="3" fill="var(--blue)"/><text x="456" y="247">2009: ~−2%</text></g><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="40" y="266">1965</text><text x="178" y="266">1980</text><text x="316" y="266">1995</text><text x="453" y="266">2010</text><text x="601" y="266">2026</text></g><text x="320" y="284" text-anchor="middle" font-size="10" fill="var(--muted)">Red: stocks and bonds often move together; green and violet: mostly opposite (bonds hedge stocks)</text></svg><figcaption>All of it is called “inflation,” yet the 1970s, the 1990s and the 2010s were three different worlds — and since 2021 the US seems to be standing on the border between regimes again.</figcaption></figure>

Three rulers for judging the regime:

- **Level:** CPI or PCE inflation, year over year. The Fed targets 2% on PCE.
- **Volatility:** how much inflation changes from year to year. A steady 2% is very different from “2% on average, bouncing between 0% and 5%” — the latter makes long-term contracts, bonds and wage deals all demand extra compensation for risk.
- **The anchor:** whether long-run inflation expectations (surveys, and the “breakeven” inflation implied by inflation-protected Treasuries, or TIPS) sit steadily near 2%. **Anchored expectations are a central bank's most valuable asset:** as long as people believe inflation will come back down, a temporary shock won't turn into a wage–price spiral.

One more dimension is often missed: **where the shock comes from.** A demand shock (an overheating economy) moves inflation and growth in the same direction, so a rate hike cools both and the policy choice is clear. A **supply shock** (oil, pandemic bottlenecks, tariffs) pushes inflation up while pulling growth down, and the central bank faces a dilemma: hiking can contain “second-round effects,” but it piles more pain on an already injured economy. The textbook advice is to “look through” one-off supply shocks — but only **if expectations stay anchored.** Once people start pricing in higher inflation, looking through is no longer an option.

### ② 1965–1982: the Great Inflation and the lost anchor

The Great Inflation wasn't built in a day. It was the sum of many decisions to “let it slide this time”:

- **The late 1960s:** Vietnam War spending and the Great Society programs expanded at the same time as unemployment ran very low; inflation rose from under 2% in 1965 to about 6% in 1970.
- **August 15, 1971:** Nixon closed the gold window and imposed wage and price controls (Stage 1.5). The last link between the dollar and gold was cut, leaving the central bank's credibility as the currency's only anchor.
- **1973–74:** the first oil shock multiplied oil prices within months, and CPI inflation hit about 12% by late 1974.
- **1979:** the Iranian revolution triggered a second oil shock, and CPI inflation reached **14.8%** in March 1980.

The core failure was **expectations.** The 1970s Fed — especially under Arthur Burns, chair from 1970 to 1978 — eased too early again and again under political pressure, meeting every recession with rate cuts. People learned one lesson: **inflation would be higher each time than the time before.** Union contracts began to include cost-of-living clauses, firms priced on the assumption that “next year prices will rise a lot,” and inflation became a self-fulfilling spiral.

The effect on assets was brutal. From 1966 to 1982, US stocks returned roughly nothing, or worse, in real terms. Long-bond holders fared worse still — coupons failed to keep pace with inflation while rising yields pushed prices down, earning bonds the nickname “certificates of confiscation.” The winners were **hard assets**: gold went from the official $35 an ounce in 1971 to about $850 in January 1980.

### ③ Volcker and the Great Moderation: how credibility was won back

Paul Volcker became Fed chair in August 1979. On October 6 the Fed announced it would target the quantity of reserves and let interest rates swing wherever they went — the federal funds rate came close to 20%. The price was two recessions (1980 and 1981–82), with unemployment reaching about 10.8% at the end of 1982. But the anchor was nailed back down: CPI inflation fell from 14.8% in 1980 to about 3% in 1983.

**Look at the battle through the real rate of Stage 2.5.** Before Volcker, the policy rate often sat below inflation, so real rates were negative — rewarding borrowing and punishing saving. Volcker pushed real rates high into positive territory. Economists later distilled the lesson into a rule: **when inflation rises by one point, the policy rate should rise by more than one point** (the “Taylor principle” within the Taylor rule). Otherwise the real rate falls and policy pours fuel on the fire.

The two decades that followed became known as the **Great Moderation** (a term popularized by Ben Bernanke's 2004 speech): the volatility of both inflation and output dropped markedly. The credit usually goes to central-bank credibility and the spread of **inflation targeting**, globalization (cheap goods as China joined the world trading system), better inventory management, and some luck. The era's signature for assets: **falling rates for decades.** The 10-year Treasury yield slid from about 15% in 1981 to about 0.52% on August 4, 2020, giving bonds a forty-year bull market, while stocks and bonds stayed negatively correlated and 60/40 became nearly every institution's default.

2008–2020 was yet another regime: **inflation too low.** The Fed ran several rounds of QE, and its balance sheet grew from under $1 trillion to nearly $9 trillion by 2022 (Stage 9.1), yet PCE inflation spent year after year below 2%. One reason: QE mostly created bank reserves, not money flowing directly into spending. Another: after 2008 households and banks were busy repairing their balance sheets. The experience convinced many that “printing money doesn't cause inflation” — until 2021.

### ④ 2021–23 and 2026: supply shocks, fiscal policy and the “transitory” debate

The 2021 inflation was **several forces stacked together:**

- **Supply:** pandemic shortages of chips, shipping and workers; in 2022, the Russia–Ukraine war drove up energy and food prices.
- **Demand:** the huge fiscal transfers of 2020–21 (the March 2020 CARES Act alone was about $2.2 trillion) went straight into household accounts — very different from post-2008 QE.
- **Money:** the policy rate sat near zero until March 2022, and QE continued into early 2022.

In 2021 the Fed called the inflation “transitory,” dropping the word only at the end of the year. By the time it began hiking in March 2022, CPI inflation was already close to 8%. What followed was the fastest tightening since the 1980s: by July 2023 the federal funds rate stood at 5.25–5.50%. CPI inflation peaked at 9.1% in June 2022, core CPI at 6.6% in September 2022, and PCE inflation at 7.2% in June 2022.

**What made this round unusual: inflation came down, but the recession never arrived** (as of September 2026). Stage 9.2 covered the reasons: the lock-in of fixed-rate debt, persistent fiscal deficits, and government interest payments becoming income. But inflation never truly got back to 2% — it has been above target continuously since early 2021.

Then came new shocks. **In 2025**, sweeping tariffs at one point pushed the US effective tariff rate to its highest in over a century (by Yale Budget Lab estimates), and the Fed paused its cuts in the first half of the year, worried that one-time price increases would become persistent inflation; on February 20, 2026 the Supreme Court ruled that tariffs imposed under IEEPA were unlawful. **In 2026**, the Iran war caused what the International Energy Agency called the largest supply disruption in the history of the oil market. Brent was about $138.21 on April 7 and still about $114.89 on September 22. August CPI inflation was about 3.4%, with energy up about 16.3% from a year earlier — yet core CPI was only about 2.4%, the lowest since March 2021, while July core PCE was about 3.3%. That unusual gap between the two core measures has no settled explanation yet.

Facing this supply shock, the Fed under its new chair Kevin Warsh chose to **hike** on September 16, with a statement saying inflation “remains elevated.” The logic is exactly the one in ①: **after more than five years above target, the anchor is less secure, and the central bank no longer dared to look through another supply shock.**

### ⑤ What regime shifts mean for 60/40, gold and Bitcoin

<table>
<tr><th>Regime</th><th>Typical period</th><th>Stocks</th><th>Long Treasuries</th><th>Stock–bond correlation</th><th>Cash</th><th>Gold</th></tr>
<tr><td>Low and steady (anchored)</td><td>1990s, 2010s</td><td>Good</td><td>Good</td><td>Negative: bonds hedge stocks</td><td>Middling</td><td>Middling</td></tr>
<tr><td>Deflationary bust</td><td>Late 2008, March 2020</td><td>Bad</td><td>Best</td><td>Negative</td><td>Good</td><td>Mixed</td></tr>
<tr><td>High and unstable (stagflation)</td><td>1970s, 2022</td><td>Real losses</td><td>Bad</td><td>Positive: fall together</td><td>Better if the central bank is tough</td><td>Best if the central bank tolerates it</td></tr>
<tr><td>Inflation crushed by force</td><td>1980–82, 2026?</td><td>Bad, then good</td><td>Bad, then superb</td><td>Positive turning negative</td><td>Best (high real rates)</td><td>Bad</td></tr>
</table>

**60/40 rests on the regime.** It shone during the Great Moderation because bonds tended to rise when stocks fell. Research broadly finds that when inflation is high and unstable, the stock–bond correlation tends to turn positive and 60/40 loses its built-in insurance. Stage 11.2 discusses how risk parity, all-weather portfolios and similar designs cope across regimes.

**Gold** was the big winner of the 1970s, but what it truly fears is **high real rates.** From 1980 to 2001, with real rates persistently positive after Volcker, gold spent most of two decades falling or going sideways. 2026 replayed the pattern: after its record near $5,600 in late January, gold fell about 29% by late June as the Fed turned hawkish and real rates rose.

**Bitcoin** was born in 2009 into a low-inflation regime and has lived through only one real inflation shock — 2021–22. That time it fell from about $69,000 in November 2021 to about $15,500 in November 2022, hammered by rate hikes alongside growth stocks. **The claim that “Bitcoin is an inflation hedge” doesn't hold up in the short-run data**: it reacts far more strongly to real rates and liquidity (Stage 9.3) than to CPI. Supporters' long-run argument is that it hedges **inflation and debasement that the central bank tolerates** (the third exit of Stage 9.4), not any given month's CPI; critics reply that in a regime where the central bank chooses to be tough, it behaves more like a high-beta risk asset.

The regime matters just as much for DAT preferreds. A perpetual preferred with a **fixed** dividend of about 10% is a purely nominal claim: the higher and less stable inflation is, the higher the yield the market demands, the lower the price, and the more its real purchasing power erodes (Stage 18.1). That is one reason Strategy designed STRC with a **variable** dividend rate (Stage 17.4): letting the rate adjust with the interest-rate environment reduces duration. **This lesson covers mechanisms and analytical frameworks only; it is not investment advice.**

**The lesson in one sentence: inflation has regimes, set jointly by its level, its volatility and the anchor of expectations; when the regime changes, the stock–bond correlation, the insurance inside 60/40, and the behavior of gold and Bitcoin all flip — and knowing which regime you're in matters far more than forecasting next month's CPI.**
`,

  demo: "inflation-regimes",

  analogy: `
Think of an inflation regime as a city's **climate**, not the weather on any particular day.

In a “temperate climate” (the Great Moderation), it's about 20°C most of the year with the occasional shower, and one umbrella (bonds) is enough for bad weather — handy when it rains, no burden when it's sunny. So everyone gets used to heading out with “60% sunny-day gear, 40% umbrella” (60/40).

When the climate changes, old habits fail. In a “tropical-storm climate” (the 1970s, 2022), bad weather isn't rain but **a heat wave plus gale-force wind**: your umbrella doesn't block the heat, and the wind turns it inside out — stocks and bonds get hurt together. What helps now is different kit: short-term cash you can adjust at any moment, and real things (gold, commodities).

And whether the climate changes depends heavily on **whether the townspeople trust the weather forecaster** (the central bank's credibility). As long as people believe “this heat wave will pass next week,” nobody hoards water or panic-buys air conditioners, and the heat wave really does pass sooner. Once they stop believing, everyone scrambles, and the heat wave prolongs itself. What Volcker did was stage an extremely costly bout of “artificial snow” to make everyone trust the forecaster again; Warsh's September 2026 hike was also an effort to polish the forecaster's reputation.
`,

  misconceptions: [
    "**“Stocks and bonds are always negatively correlated, so 60/40 always hedges.”** — Negative correlation is a feature of the low, steady inflation regime. In the 1970s and in 2022, inflation shocks pushed rates up and stocks and bonds fell together; in 2022 the S&P 500 fell about 19% and the US aggregate bond index about 13%, and 60/40's insurance failed.",
    "**“Supply-shock inflation is temporary, so central banks can always look through it.”** — Only if expectations stay anchored. The oil shocks of the 1970s hit when expectations were already loosening and became a wage–price spiral; in 2026, after more than five years above target, the Fed met an oil shock with a hike.",
    "**“Printing money always causes inflation.”** — QE in 2008–2020 mainly created bank reserves, and inflation stayed below 2% for years; the 2020–21 inflation hinged on fiscal transfers landing directly in household accounts, on top of supply bottlenecks. Where money enters the economy and whom it reaches matters more than how much is printed.",
    "**“Bitcoin is an inflation hedge, so it will rise when inflation picks up.”** — In the one inflation shock it has lived through (2021–22), it plunged as rates rose. It reacts much more to real rates and liquidity than to CPI; supporters argue it hedges tolerated long-run inflation and debasement, not short-run CPI.",
    "**“Core inflation is back to 2.4%, so the inflation problem is solved.”** — In August 2026 core CPI was about 2.4%, but core PCE (the Fed's preferred gauge) was about 3.3%, headline CPI about 3.4%, and energy was up about 16% on the year. The disagreement among measures is itself a sign that the regime isn't settled; a single number can mislead.",
  ],

  quiz: [
    {
      q: "Why did stocks and bonds in a 60/40 portfolio fall together in 2022?",
      options: [
        "Because the economy fell into a deep recession that year",
        "Because high, unstable inflation pushed rates up, lowering stock valuations and bond prices at once — the stock–bond correlation turned positive",
        "Because the Fed bought huge amounts of stock in 2022",
        "Because bond default rates soared",
      ],
      answer: 1,
      explain: "In an inflation-driven regime, bad news mostly means “higher inflation → higher rates,” so **stocks' discount rate and bonds' yields rise together** and the insurance fails.",
    },
    {
      q: "The “Taylor principle” says the policy rate should rise by more than one point for every one-point rise in inflation. What is it trying to prevent?",
      options: [
        "A rise in government debt",
        "A stronger dollar",
        "Real rates falling as inflation rises — which amounts to easing during inflation",
        "A falling stock market",
      ],
      answer: 2,
      explain: "If nominal rates rise by less than inflation, **the real rate actually falls** and policy has effectively loosened — precisely the lesson of the 1970s.",
    },
    {
      q: "Which statement about gold from 1980 to 2001 best fits this lesson's framework?",
      options: [
        "With real rates persistently positive after Volcker, the opportunity cost of non-yielding gold was high, and it spent most of the period falling or flat",
        "Gold rose strongly throughout the Great Moderation",
        "Gold's price is set only by central-bank buying",
        "Gold always rises when inflation is low",
      ],
      answer: 0,
      explain: "What gold really fears is **high real rates.** After its January 1980 peak near $850 it endured a long slump; when real rates rose in the first half of 2026 it also fell about 29%.",
    },
    {
      q: "The 2026 oil shock pushed up headline CPI. What was the main reason the Fed hiked in September rather than looking through the supply shock?",
      options: [
        "The oil shock was overheating the economy",
        "The government ordered the Fed to hike",
        "Hiking directly lowers oil prices",
        "Inflation had been above 2% for more than five years, the anchor was less secure, and the Fed feared the supply shock would become persistent inflation",
      ],
      answer: 3,
      explain: "Looking through a supply shock requires **anchored expectations.** Once the anchor loosens, a one-time price jump can become second-round wage and price effects.",
    },
    {
      q: "What usually happens to a perpetual preferred with a fixed dividend of about 10% in a “high and unstable” inflation regime?",
      options: [
        "Its price rises, because the dividend is fixed",
        "Nothing, because it's equity",
        "The market's required yield rises and its price falls, while the dividend's real purchasing power erodes",
        "It automatically converts to a floating rate",
      ],
      answer: 2,
      explain: "A fixed dividend is a **nominal claim**, highly sensitive to inflation and rates (Stage 18.1); variable-rate designs such as STRC in Stage 17.4 exist to reduce that sensitivity. Not investment advice.",
    },
  ],

  further: [
    { label: "Federal Reserve History: The Great Inflation (1965–1982)", url: "https://www.federalreservehistory.org/essays/great-inflation" },
    { label: "Federal Reserve History: The Great Moderation (1984–2007)", url: "https://www.federalreservehistory.org/essays/great-moderation" },
    { label: "Ben Bernanke's 2004 speech, “The Great Moderation”", url: "https://www.federalreserve.gov/boarddocs/speeches/2004/20040220/" },
    { label: "US Bureau of Labor Statistics: latest CPI news release", url: "https://www.bls.gov/news.release/cpi.nr0.htm" },
    { label: "FRED: Brent crude oil price (DCOILBRENTEU)", url: "https://fred.stlouisfed.org/series/DCOILBRENTEU" },
  ],
};
