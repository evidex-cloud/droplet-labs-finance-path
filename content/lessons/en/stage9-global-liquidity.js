export default {
  id: "global-liquidity",
  stage: 9,
  order: 3,
  title: "Global Liquidity: Why the Tide Lifts Risk Assets & Bitcoin",
  difficulty: "systems",
  prereqs: ["fed-toolkit", "policy-transmission"],

  oneLiner:
    "“Liquidity” is the most used and least defined word in markets. This lesson breaks it into things you can measure: **central-bank balance sheets, the Treasury's cash account (TGA), the reverse repo facility (ON RRP), broad money and credit, and cross-border dollar and yen funding.** Together they act like the level of the sea. When the tide rises, the lightest boats furthest out — growth stocks, crypto, Bitcoin — float highest; when it ebbs, they run aground first. But the story has limits: **after the Fed stopped shrinking its balance sheet in late 2025 and it began to grow again, Bitcoin still lost half its value in 2026.** Learn to read markets through liquidity — and to recognize when that lens fails.",

  intuition: `
If you've spent any time around crypto, you've heard the line: “**Bitcoin is just a liquidity gauge.**” Overlay a chart of global central-bank balance sheets, or global broad money (M2), on the Bitcoin price and the two lines often look uncannily alike. In 2020–21, as central banks flooded the system, Bitcoin climbed from under $10,000 to about $69,000 in November 2021. In 2022, as the Fed hiked and shrank its balance sheet, Bitcoin sank to about $15,500 in November 2022, roughly 77% below the peak.

There is real logic behind this. Picture the financial system as a sea, with every asset a boat:

- Treasuries and money funds are big ships moored in the harbor; however the tide moves, they barely stir.
- Blue-chip stocks are boats near the shore, rising and falling with the swell.
- Growth stocks, crypto and Bitcoin are small boats drifting furthest out. **When the tide rises they float highest; when it ebbs they are the first to run aground.**

That tide is **liquidity**: how much money in the system is available to buy assets at short notice, and how easy and cheap it is to borrow it. Stage 9.1 covered one of the taps — the Fed's balance sheet and bank reserves. Stage 9.2 traced the pipes that carry the water into the economy. This lesson pulls back to the whole planet: who is pouring water in, who is pumping it out, and how to read the gauge.

The lesson rests on two ideas. **Idea ③, liquidity and trust (the plumbing):** liquidity is the amount of water in the pipes, and runs and crises are the moments it suddenly dries up. **Idea ④, risk and leverage:** the further out an asset sits and the more leverage behind it, the more sensitive it is to the tide — the forced liquidations of Stage 7.5 are boats stranded as the water retreats.

First, a vaccine. Liquidity is **an excellent background variable and a poor timing tool.** 2026 is the counterexample. The Fed stopped QT on December 1, 2025 and then started buying bills; its balance sheet rose from about $6.54 trillion on December 3, 2025 to about $6.75 trillion in late September 2026. Yet Bitcoin slid from its record of about $126,000 on October 6, 2025 to about $58,000 at the end of June 2026 (it was back near $84,000 by late September). Over the same stretch an oil shock and a surge in long yields — the 10-year went from about 3.97% to about 5.18% — overwhelmed the modest balance-sheet growth. **The tide is only one force on the boats; storms (rates, inflation, leverage flushes) can capsize them too.**

The tide gauge you build here comes back in Stage 12.4 to explain Bitcoin's volatility, in Stage 16.2 to explain why a DAT's mNAV premium swells and shrinks with market mood, and in Stage 20.2 as one axis of the macro-regime map.

**In this lesson we break it into five pieces:**

- **① Three kinds of “liquidity”: market, funding and macro**
- **② The central-bank tap and the “net liquidity” formula**
- **③ Broad money and credit: M2, banks, shadow banks and stablecoins**
- **④ The global tide: the dollar, the yen and other central banks**
- **⑤ Bitcoin and liquidity: why they move together, and when that breaks**
`,

  mechanics: `
### ① Three kinds of “liquidity”: market, funding and macro

One word, at least three meanings — and mixing them up is the root of many bad conclusions:

<table>
<tr><th>Which liquidity</th><th>The question it asks</th><th>How it's measured</th><th>What trouble looks like</th></tr>
<tr><td><b>Market liquidity</b></td><td>Can you buy or sell an asset quickly without a discount?</td><td>Bid–ask spreads, order-book depth (Stage 8.1)</td><td>You can't sell except at a fire-sale price</td></tr>
<tr><td><b>Funding liquidity</b></td><td>Can you borrow, and roll over short-term loans?</td><td>Repo rates, spreads, margin requirements (Stage 8.3)</td><td>Repo rates spike, margin calls, runs</td></tr>
<tr><td><b>Macro liquidity</b></td><td>How much money is in the system, and how fast is credit growing?</td><td>Central-bank balance sheets, M2, credit growth, cross-border dollar credit</td><td>The tide goes out and risk assets sag together</td></tr>
</table>

The three are contagious. The macro tide falls → funding gets dearer and scarcer → leveraged holders are forced to sell → market liquidity dries up → falling prices shrink collateral values → funding gets harder still. **A crisis is the moment all three snap at once** (Stage 10.1). This lesson focuses on the third kind — macro liquidity, the “tide” of market commentary.

### ② The central-bank tap and the “net liquidity” formula

Stage 9.1 showed that the items on the Fed's liability side trade off against each other. Markets have turned that rule into a popular rough indicator:

$$
\\text{net liquidity} \\approx \\text{Fed total assets} - \\mathrm{TGA} - \\mathrm{ON\\ RRP}
$$

Here \\(\\mathrm{TGA}\\) is the Treasury General Account and \\(\\mathrm{ON\\ RRP}\\) the overnight reverse repo facility. The intuition: of the money on the Fed's balance sheet, cash sitting in the Treasury's account isn't buying assets, and cash in ON RRP is money funds' idle balance. What's left is, roughly, the reserves in the banking system that can flow out into markets.

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The “net liquidity” waterfall (late Sep 2026; TGA and ON RRP illustrative)</text><line x1="40" y1="220" x2="600" y2="220" stroke="var(--line)" stroke-width="1.5"/><rect x="60" y="40" width="90" height="180" rx="4" fill="var(--orange)"/><text x="105" y="236" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">Fed total assets</text><text x="105" y="252" text-anchor="middle" font-size="11" fill="var(--muted)">about $6.75T</text><rect x="190" y="40" width="90" height="23" rx="4" fill="var(--red-soft)" stroke="var(--red)"/><text x="235" y="236" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">− TGA</text><text x="235" y="252" text-anchor="middle" font-size="11" fill="var(--muted)">~$0.85T (illustrative)</text><rect x="320" y="63" width="90" height="3" fill="var(--red)"/><text x="365" y="236" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">− ON RRP</text><text x="365" y="252" text-anchor="middle" font-size="11" fill="var(--muted)">nearly drained (illus.)</text><rect x="450" y="66" width="90" height="154" rx="4" fill="var(--blue)"/><text x="495" y="236" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">= Net liquidity</text><text x="495" y="252" text-anchor="middle" font-size="11" fill="var(--muted)">~$5.85T (illustrative)</text><line x1="150" y1="40" x2="190" y2="40" stroke="var(--line)" stroke-dasharray="3 3"/><line x1="280" y1="63" x2="320" y2="63" stroke="var(--line)" stroke-dasharray="3 3"/><line x1="410" y1="66" x2="450" y2="66" stroke="var(--line)" stroke-dasharray="3 3"/><text x="320" y="272" text-anchor="middle" font-size="10" fill="var(--muted)">QE and reserve purchases raise the first bar; a Treasury cash build raises TGA and lowers the last; funds leaving ON RRP to buy bills raise it back</text></svg><figcaption>This is a rough accounting identity, not an economic law: it tells you where money is parked, not what it will buy.</figcaption></figure>

The formula explains things that raw QE/QT numbers can't. At the end of 2022, money funds had over $2 trillion parked in ON RRP. The Fed kept shrinking its balance sheet after that, but ON RRP kept releasing cash to buy the Treasury's new bills, and a popular explanation holds that **this release offset QT's hit to “net liquidity”** — part of the backdrop to risk assets rallying in 2023 in the middle of a hiking cycle. The flip side: each time a debt-ceiling standoff ends, the Treasury rebuilds the TGA by hundreds of billions of dollars over a few months, and markets often call that stretch a “liquidity drain.”

Keep three limits in mind. First, it looks only at the Fed, ignoring bank credit and foreign central banks. Second, it is an **accounting split of a stock** — money that *could* buy assets won't necessarily do so. Third, it gets whipsawed by one-off Treasury flows, so the weekly data are noisy. **Use it as a thermometer, not a crystal ball.**

### ③ Broad money and credit: M2, banks, shadow banks and stablecoins

The Fed creates reserves (base money), but most of the money people and businesses hold is **bank deposits** — loans create deposits, as Stage 1.2 showed. **M2**, broad money, is roughly currency plus checking, savings and small time deposits plus retail money funds: a measure of the near-cash held outside the banks.

Two episodes show both the power and the limits of M2:

- **2020–21:** QE plus massive fiscal transfers (the March 2020 CARES Act alone was about $2.2 trillion) pushed US M2 growth above 25% year over year, a pace unseen since the Second World War. What followed was a broad rally in asset prices and then high inflation in 2021–22 (CPI hit 9.1% in June 2022).
- **Late 2022 into 2023:** M2 shrank year over year, something almost unheard of in modern data. Many forecast a deep recession and an asset crash. Neither came: the US avoided recession and the S&P 500 rose about 24% in 2023. **M2 has to be read alongside interest rates, money demand and credit**; on its own it is easy to misread.

Beyond M2 there is **credit**: bank loans, corporate bonds, private credit. Stage 8.4 showed how much lending now happens outside banks — private-credit funds, insurers, money funds. They don't show up in M2, but they move the tide all the same. The **Bank for International Settlements' global liquidity indicators** track exactly this: cross-border and non-bank credit in dollars, euros and yen.

The new era adds another kind of money: **stablecoins.** As of September 26, 2026, total stablecoin supply was about **$312 billion** (DefiLlama), below a peak of about $321 billion on May 17, 2026. They are backed by short-term Treasuries and cash (Stage 13.2) and can be read as **on-chain dollar liquidity.** Their growth stalled in 2026: even with the GENIUS stablecoin law passed, falling crypto prices held back the expansion of on-chain dollars. For crypto assets, stablecoin supply is a closer-fitting tide gauge than M2.

### ④ The global tide: the dollar, the yen and other central banks

The dollar is the world's funding currency. A huge share of trade, debt and derivatives is priced in dollars, so **Fed policy, the dollar's exchange rate and US Treasury yields jointly set the global dollar tide.** When the dollar strengthens and US rates rise, foreign firms and governments that borrowed in dollars need more of their own currency to repay, and the global tide falls (the exchange-rate channel of Stage 9.2).

Several other big taps:

- **Japan.** For two decades the Bank of Japan was the last bastion of near-zero rates, and the yen was the funding currency of the “carry trade”: borrow yen at almost nothing, convert to dollars, buy higher-yielding assets. Japan ended negative rates in March 2024 and has hiked repeatedly since, reaching **1.25%** on September 18, 2026, the highest since 1995; the 10-year JGB yield hit about 3.07% on September 24, 2026, the highest since 1996. The tap is being turned back: the early-August 2024 unwinding of yen carry trades sent global stocks and crypto sharply lower together. Japan is also the largest foreign holder of US Treasuries (about $1.10 trillion in July 2026), and the higher its own rates go, the weaker the pull for Japanese money to buy Treasuries abroad.
- **The People's Bank of China and the European Central Bank.** Their balance sheets and credit cycles move the global tide too. China's Treasury holdings fell from about $1.03 trillion in January 2022 to about $0.62 trillion in July 2026.
- **The Treasury itself.** It isn't a central bank, but through its issuance mix (more bills or more bonds) and the swings in the TGA it moves the tide. Stage 9.4 covers why issuing bills rather than bonds has been criticized as “stealth QE.”

“Global liquidity” indicators are usually built by adding up several central banks' balance sheets in dollars, or the M2 of major economies in dollars. There's a trap hidden in that: **when you sum in dollars, swings in the dollar itself change the reading.** If the dollar falls 10%, foreign central banks' balance sheets “grow” in dollar terms even if they haven't bought a single bond.

### ⑤ Bitcoin and liquidity: why they move together, and when that breaks

Why is Bitcoin especially sensitive to the tide? At least four reasons:

- **No cash flows, only the marginal buyer.** Stocks have earnings underneath them and bonds have coupons; Bitcoin's price is set almost entirely by what the marginal buyer will pay, and that buyer's wallet is liquidity.
- **The furthest-out risk asset.** When the tide rises, money walks out along the risk ladder — cash → Treasuries → stocks → growth stocks → crypto (the ladder of Stage 5.4) — and walks back in reverse when it ebbs.
- **Concentrated leverage.** Perpetual futures and crypto lending put a lot of positions on leverage (Stage 7.5). The roughly $19 billion of liquidations on October 10–11, 2025 was a live demonstration of the tide amplified by leverage.
- **Opportunity cost.** The higher real rates are, the costlier it is to hold an asset that pays nothing (Stage 2.5).

But “Bitcoin = liquidity” has four limits, and you need all four in view:

1. **Correlation isn't causation.** Two lines that both trend up over years will always look “similar” on a chart. What matters is the correlation of *changes*, tested out of sample.
2. **Lags can be cherry-picked.** Try every lag from 0 to 12 months and keep the one with the highest correlation, and you will almost always find a beautiful number in the historical data. That is **overfitting**, and it says nothing about the future.
3. **Other forces can swamp the tide.** In 2026 the balance sheet was growing modestly, but surging long yields, an oil shock and weak demand after the October 2025 leverage flush sent Bitcoin sharply lower. **Rates and risk appetite are forces alongside the tide, not subordinates of it.**
4. **Bitcoin's own cycle and structure.** Halvings (Stage 12.2), ETF flows (Stage 12.5) and DATs' buying and issuance (Stage 16.7) can all pull it away from the macro tide.

For DATs the implications are direct. A DAT's common stock is “amplified Bitcoin,” and its **mNAV premium** (Stage 16.2) is itself a function of market mood and open financing windows. **When the tide rises, the premium rises along with Bitcoin and the financing flywheel spins faster; when the tide falls, both shrink together.** That's why analyzing a DAT means looking at the macro tide first — but never only at the tide.

**The lesson in one sentence: liquidity is the level of the sea — set jointly by central-bank balance sheets, the Treasury's account, reverse repo, broad money, credit and cross-border dollars; the furthest-out, most leveraged assets like Bitcoin feel it most, but the tide is only one force, and rates, inflation and leverage flushes can overwhelm it at any time.**
`,

  demo: "global-liquidity",

  analogy: `
Think of global finance as a **harbor**, with assets as boats moored at different distances.

Tied up inside the harbor are Treasuries and money funds; a meter of tide makes them sway gently. Near the shore sit blue-chip stocks, riding the swell. Furthest out, unanchored, are the small sailboats — growth stocks and Bitcoin — and plenty of their owners have borrowed to add ballast so they can carry more cargo (leverage).

The **water level** is set by several gates at once: the Fed's great sluice (QE/QT), the Treasury's reservoir (the TGA fills when it collects taxes and sells debt, empties when it spends), money funds' holding pond (ON RRP), the tributaries of bank and private credit, and a tide of yen rolling in from across the Pacific. Harbor watchers plant a measuring pole at the dock — net liquidity, M2, stablecoin supply.

At high tide the sailboats float highest, and it looks as if the water level decides everything. But on some days the pole shows the tide rising while a storm blows in from outside (an oil shock, surging long yields), and the ballast-laden boats capsize anyway. The first half of 2026 was such a stretch. **Old fishermen read both the tide table and the weather forecast; sail on the tide table alone and sooner or later a storm teaches you the difference.**
`,

  misconceptions: [
    "**“Liquidity just means the size of the Fed's balance sheet.”** — The Fed is only one tap. The Treasury's TGA, money funds' ON RRP balances, bank and private credit, foreign central banks and the dollar all move the tide. In 2023 the Fed was shrinking its balance sheet, yet ON RRP was releasing cash, so market measures of “net liquidity” didn't fall in step.",
    "**“If M2 shrinks, the economy and asset prices must collapse.”** — M2 shrank year over year from late 2022 into 2023, yet the US avoided recession and the S&P 500 rose about 24% in 2023. M2 has to be read with rates, money demand and credit; one number alone is easy to misjudge.",
    "**“Bitcoin is a liquidity gauge, so the tide predicts the price.”** — They're correlated over long stretches, but in 2026 the Fed's balance sheet was growing while Bitcoin fell by more than half from its October 2025 record. Rates, inflation, leverage flushes and Bitcoin's own supply and demand can all overwhelm the tide.",
    "**“I've found that liquidity leads Bitcoin by N months.”** — Try every lag and keep the one with the best historical fit, and you'll nearly always get a pretty number — that's overfitting. The real test is out of sample: use the rule picked from the past to predict later data, and it usually breaks.",
    "**“Global liquidity is at a record, so every central bank must be printing.”** — Many global liquidity indicators are summed in dollars. When the dollar weakens, foreign central-bank balance sheets automatically “grow” in dollar terms even without new purchases. Check the exchange rate before you read the tide.",
  ],

  quiz: [
    {
      q: "Using the rough formula “\\(\\text{net liquidity} \\approx \\text{Fed assets} - \\mathrm{TGA} - \\mathrm{ON\\ RRP}\\),” which event lowers net liquidity?",
      options: [
        "The Fed starts QE and buys long Treasuries",
        "The Treasury sells lots of debt and rebuilds the TGA from $300 billion to $800 billion, mostly paid for out of bank deposits",
        "Money funds move cash out of ON RRP to buy newly issued bills",
        "The Treasury draws down the TGA to pay Social Security and defense bills",
      ],
      answer: 1,
      explain: "The TGA rises while Fed assets don't, so **reserves move out of the banking system into the Treasury's account** and net liquidity falls. In C, ON RRP and TGA offset each other, leaving net liquidity roughly unchanged; A and D both raise it.",
    },
    {
      q: "US M2 shrank year over year from late 2022 into 2023, which is almost unheard of. What happened next?",
      options: [
        "The US fell straight into a deep recession",
        "The S&P 500 fell more than 30% in 2023",
        "The US avoided recession and the S&P 500 rose about 24% in 2023",
        "The Fed was forced to restart QE",
      ],
      answer: 2,
      explain: "M2 has to be read with rates, money demand and credit. **Forecasting asset prices from a single liquidity number is an easy way to be wrong.**",
    },
    {
      q: "Why do many “global liquidity” indicators rise automatically when the dollar falls sharply?",
      options: [
        "Because they add up central-bank balance sheets or M2 in dollars, so a weaker dollar inflates the non-dollar parts",
        "Because the Fed always does QE when the dollar falls",
        "Because a weaker dollar increases Bitcoin's supply",
        "Because the Treasury always releases the TGA when the dollar falls",
      ],
      answer: 0,
      explain: "It's a **measurement trap**: exchange-rate moves change a dollar-summed reading even if no central bank buys an extra bond.",
    },
    {
      q: "Which of these best shows the limits of the claim “Bitcoin = liquidity”?",
      options: [
        "Bitcoin soared while central banks flooded the system in 2020–21",
        "Bitcoin slumped while the Fed hiked and ran QT in 2022",
        "Stablecoin supply is a gauge of on-chain dollar liquidity",
        "In 2026 the Fed's balance sheet grew modestly, yet Bitcoin fell by more than half from its October 2025 record",
      ],
      answer: 3,
      explain: "A and B support the claim; D is a counterexample: **surging long yields, an oil shock and a leverage flush overwhelmed a modest balance-sheet expansion.**",
    },
    {
      q: "An analyst tests every lag from 0 to 12 months, finds that “global M2 leads Bitcoin by 10 weeks” fits best, and uses it to forecast prices. What is the main problem?",
      options: [
        "M2 data aren't public",
        "Choosing the best lag from historical data is overfitting; without an out-of-sample test it may be pure coincidence",
        "Bitcoin and M2 have never been correlated at all",
        "Lags have to be whole months",
      ],
      answer: 1,
      explain: "**Try many things and keep the best one**, and history almost always obliges with a pretty correlation. The real test is predicting data that came after the choice was made.",
    },
  ],

  further: [
    { label: "FRED: M2 money stock (M2SL) history", url: "https://fred.stlouisfed.org/series/M2SL" },
    { label: "FRED: Treasury General Account (WTREGEN), weekly", url: "https://fred.stlouisfed.org/series/WTREGEN" },
    { label: "FRED: overnight reverse repo (RRPONTSYD), daily", url: "https://fred.stlouisfed.org/series/RRPONTSYD" },
    { label: "Bank for International Settlements: global liquidity indicators", url: "https://www.bis.org/statistics/gli.htm" },
    { label: "DefiLlama: total stablecoin supply and issuer breakdown", url: "https://defillama.com/stablecoins" },
  ],
};
