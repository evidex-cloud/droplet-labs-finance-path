export default {
  id: "dollar-system",
  stage: 3,
  order: 4,
  title: "The Dollar System: Reserve Currency, Eurodollars & Global Capital Flows",
  difficulty: "intro",
  prereqs: ["deficits-debt", "what-is-money"],

  oneLiner:
    "The dollar isn't just America's currency — it is **the world's plumbing**. Global trade is priced in it, central banks hold it as reserves, banks outside the US have created a vast pool of \"eurodollars,\" and US Treasuries are the **collateral** of global finance. America's trade deficit and foreigners' purchases of US assets are two sides of one coin; in a crisis the whole world scrambles for dollars and the Fed acts as global lender of last resort through **swap lines**. And dollar stablecoins are becoming a new channel carrying the dollar around the world.",

  intuition: `
Imagine you're a Brazilian coffee exporter selling beans to a German company. Neither of you lives in dollars — one uses reais, the other euros. Yet the deal will very likely be **priced and settled in dollars**. Why?

Because the dollar is the world's **universal connector**. Almost every bank and dealer can pay and receive dollars; the dollar market is the deepest and easiest to swap into anything else; and if you need to borrow, the dollar credit market is the biggest. Every country has its own wall socket, but everyone carries a USB cable — **the more people use it, the more useful it becomes, so even more people use it.** That self-reinforcing loop is called a **network effect**.

Stage 1.1 showed that money is really an IOU written on somebody's balance sheet. What makes the dollar special is that **the whole world is happy to hold IOUs issued by America** — dollar cash, deposits at US banks, and above all **US Treasuries**. That has several consequences:

- **America can buy the world's goods with the currency it issues**, and foreigners then bring those dollars back to buy US Treasuries and stocks. That lets the US run trade deficits year after year and borrow at lower rates. In the 1960s French finance minister Valéry Giscard d'Estaing called this America's "**exorbitant privilege**."
- **There are enormous numbers of dollars outside the US.** Banks in London, Singapore and the Cayman Islands take dollar deposits and make dollar loans. These "**eurodollars**" are not directly overseen by the Fed, and those banks can't borrow directly from it either.
- **In a crisis the whole world runs short of dollars.** In 2008 and in March 2020, foreign banks and companies scrambled for dollars to repay dollar debts, and the dollar rose rather than fell. The Fed channeled dollars abroad through **currency swap lines** with other central banks, acting as the world's lender of last resort.

This lesson sits mainly on **Idea ③ Liquidity & trust (the plumbing)**: the dollar system is the main pipe of global finance, and the core collateral flowing through it is US Treasuries. It also connects to **Idea ② Balance sheets & claims**: on paper, America's trade deficit must be matched by foreigners' growing **claims** on US assets.

**As of September 2026** the system is both powerful and under question:

- In the first half of 2025 the dollar index (DXY) fell about 10.7%, widely described as its worst first half since 1973. After the April 2025 "Liberation Day" tariffs, US stocks, Treasuries and the dollar **fell together** — the unusual "sell America" episode.
- Central banks have been buying gold hand over fist: about 289 tonnes in the second quarter of 2026, a record for any second quarter.
- Yet by September 2026, helped by rising US rates and safe-haven demand during the Iran war, the dollar index had climbed back to about **101**.
- Meanwhile dollar stablecoins totaled about **$312 billion**, and by law must be backed by assets such as US Treasury bills — **the dollar is traveling the world on blockchains.**

Before we can answer Lin's three questions in full, we need this map of the global plumbing. It explains why someone buys the $40 trillion of Treasuries from Stage 3.3, why the 30-year yield depends on foreign demand (Stage 4.5), and why stablecoins are called "the dollar's new distribution channel" (Stage 13.2).

**In this lesson we break it into five pieces:**

- **① The reserve currency: why the whole world uses dollars**
- **② Eurodollars and dollar shortages: the role of swap lines**
- **③ US Treasuries: the world's savings jar and collateral**
- **④ Trade deficits and capital flows: two sides of one coin**
- **⑤ Dollar stablecoins: a new channel for the dollar**
`,

  mechanics: `
### ① The reserve currency: why the whole world uses dollars

For a currency to be truly international, it has to be used at several levels:

- **Pricing and settling trade**: commodities such as oil, copper and grain are priced mostly in dollars. From the mid-1970s, oil exporters recycled their dollar revenues into US financial markets — the so-called "**petrodollar**" loop.
- **Foreign exchange**: the dollar is on one side of the vast majority of global FX trades. Swapping between two smaller currencies often means going through the dollar as a hub.
- **Official reserves**: the dollar has long made up more than half of central banks' foreign-exchange reserves, far ahead of the euro, yen, pound and renminbi.
- **International borrowing**: companies and governments outside the US borrow heavily in dollars.

The dollar's position rests on a combination of things: the size of the US economy, **the deepest and most open capital markets**, rule of law and property rights, military and geopolitical reach — and **historical inertia**. The 1944 Bretton Woods system tied the dollar to gold and other currencies to the dollar. After Nixon closed the gold window on August 15, 1971 (Stage 1.5), the dollar lost its gold backing, but network effects preserved its central role.

**The Triffin dilemma** (Robert Triffin, 1960) captures a tension built into the system: the world needs ever more dollars for reserves and trade, so the US must keep "exporting" dollars — usually through trade deficits and rising foreign liabilities — and the larger those liabilities grow, the more they can erode confidence in the dollar.

**The 2026 debate**: "de-dollarization" is a hot topic. Its advocates point to record central-bank gold buying, sanctions pushing some countries toward alternatives, US debt above $40 trillion, and political pressure on the Fed's independence. Skeptics answer that no other currency offers capital markets of comparable depth and openness, and that in every crisis money still runs to the dollar. **Slow change at the margins is far more likely than a sudden replacement.**

### ② Eurodollars and dollar shortages: the role of swap lines

**Eurodollars** are **dollar deposits held at banks outside the United States**. They have nothing to do with the euro; the "euro" is historical, because the market first grew up in London in the 1950s and 1960s. A London bank takes a dollar deposit and lends those dollars to a Brazilian company; none of this sits directly under US banking supervision, and the London bank can't borrow directly from the Fed.

That is a structural weak spot in the dollar system. Many non-US banks have balance sheets that look like this:

- **Assets**: long-term dollar loans, dollar bonds, US Treasuries;
- **Liabilities**: short-term dollar deposits, short-term dollar repo funding, dollars borrowed through FX swaps.

It's the **maturity mismatch** of Stage 1.2 moved offshore — except that **no home central bank can print dollars to backstop it**. In calm times it works fine. When panic hits, short-term dollar funding runs, these banks have to sell assets to raise dollars, and a "**dollar shortage**" follows. Hence a counterintuitive pattern: **even when a crisis starts in the US, the dollar often rises**, because the whole world is scrambling for dollars to repay dollar debts.

The Fed's tool for this is the **central bank liquidity swap line**. The Fed lends dollars to a foreign central bank (say the ECB or the Bank of Japan), taking an equivalent amount of that bank's currency as collateral; the foreign central bank then lends the dollars on to its own banks.

- During the **2008 financial crisis**, the Fed set up swap lines with more than a dozen central banks, at times on a very large scale (Stage 10.2).
- In **October 2013**, the lines with the ECB, the Bank of Japan, the Bank of England, the Swiss National Bank and the Bank of Canada were made **standing arrangements**.
- In **March 2020**, the Fed cut the cost of the swap lines, extended temporary lines to more central banks, and launched the **FIMA repo facility**: foreign central banks could pledge their US Treasuries to the Fed and borrow dollars instead of dumping Treasuries into a chaotic market.

**That is the Fed's role as the world's lender of last resort** — and the logic is pure Idea ③: when trust breaks, what matters is that someone can supply the ultimate money in unlimited amounts.

### ③ US Treasuries: the world's savings jar and collateral

<figure><svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Follow a dollar around the world: goods flow in, dollars flow out, then return to buy assets</text><rect x="30" y="50" width="200" height="200" rx="12" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="130" y="72" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--blue)">United States</text><text x="130" y="100" text-anchor="middle" font-size="10.5" fill="var(--ink)">Consumers and firms</text><text x="130" y="116" text-anchor="middle" font-size="10" fill="var(--muted)">buy imports, pay dollars</text><text x="130" y="160" text-anchor="middle" font-size="10.5" fill="var(--ink)">Treasury · stock and bond markets</text><text x="130" y="176" text-anchor="middle" font-size="10" fill="var(--muted)">issue Treasuries (Stage 3.3)</text><text x="130" y="220" text-anchor="middle" font-size="10.5" fill="var(--ink)">Federal Reserve</text><text x="130" y="236" text-anchor="middle" font-size="10" fill="var(--muted)">swap lines · FIMA repo</text><rect x="410" y="50" width="200" height="200" rx="12" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="510" y="72" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--orange-ink)">Rest of the world</text><text x="510" y="100" text-anchor="middle" font-size="10.5" fill="var(--ink)">Exporters</text><text x="510" y="116" text-anchor="middle" font-size="10" fill="var(--muted)">receive dollars</text><text x="510" y="160" text-anchor="middle" font-size="10.5" fill="var(--ink)">Central banks, banks, funds</text><text x="510" y="176" text-anchor="middle" font-size="10" fill="var(--muted)">dollar reserves · eurodollars</text><text x="510" y="220" text-anchor="middle" font-size="10.5" fill="var(--ink)">Stablecoin holders</text><text x="510" y="236" text-anchor="middle" font-size="10" fill="var(--muted)">on-chain dollars (Stage 13.2)</text><line x1="408" y1="96" x2="234" y2="96" stroke="var(--green)" stroke-width="2.5"/><polygon points="234,96 244,91 244,101" fill="var(--green)"/><text x="320" y="89" text-anchor="middle" font-size="10.5" fill="var(--green)">① goods and services</text><line x1="232" y1="116" x2="406" y2="116" stroke="var(--red)" stroke-width="2.5"/><polygon points="406,116 396,111 396,121" fill="var(--red)"/><text x="320" y="132" text-anchor="middle" font-size="10.5" fill="var(--red)">② dollars (trade deficit)</text><line x1="408" y1="170" x2="234" y2="170" stroke="var(--blue)" stroke-width="2.5"/><polygon points="234,170 244,165 244,175" fill="var(--blue)"/><text x="320" y="163" text-anchor="middle" font-size="10.5" fill="var(--blue)">③ dollars return as asset buys</text><text x="320" y="186" text-anchor="middle" font-size="10" fill="var(--muted)">(capital account surplus)</text><line x1="232" y1="228" x2="406" y2="228" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 3"/><polygon points="406,228 396,223 396,233" fill="var(--muted)"/><text x="320" y="221" text-anchor="middle" font-size="10.5" fill="var(--muted)">④ crisis: swap-line dollars</text><text x="320" y="282" text-anchor="middle" font-size="11" fill="var(--ink)">② and ③ must offset on paper: trade deficit ≈ foreigners' new claims on US assets</text><text x="320" y="302" text-anchor="middle" font-size="10" fill="var(--muted)">Schematic, not to scale</text></svg><figcaption>America buys the world's goods with dollars; the world uses those dollars to buy America's assets. US Treasuries are the main savings jar in that loop.</figcaption></figure>

Once foreigners earn dollars, the most common way to "save" them is to buy **US Treasuries**: safe, the most liquid market there is, sellable at any moment and accepted as collateral everywhere. As of July 2026 (TIC data):

- Foreigners held about **$9.25 trillion** of Treasuries, of which foreign official holders (mainly central banks) held about $3.77 trillion.
- Japan about $1.10 trillion (the largest, and falling); the UK about $1.00 trillion (rising fast, and including London custody and hedge-fund positions); China about $0.62 trillion (down sharply from about $1.03 trillion in January 2022).
- Total foreign holdings are roughly flat, but their **share of a growing debt stock is falling** — more of each new Treasury has to be absorbed by domestic buyers, one reason the long-end term premium has risen (Stage 4.5).

**Treasuries as global collateral**: in the repo market (Stage 8.3), Treasuries are the dominant collateral — you pledge them, borrow cash, and buy them back the next day. The margin systems of banks, hedge funds and exchanges worldwide sit on a foundation of Treasuries. So **the health of the Treasury market is the health of the global plumbing**: in March 2020 even Treasuries briefly became hard to sell (Stage 10.3), and the Fed had to step in on a massive scale.

**Japan's pivotal role**: Japan is the largest foreign holder. The Bank of Japan ended negative rates in March 2024 and has raised rates step by step, reaching 1.25% on September 18, 2026, its highest since 1995; the 10-year JGB yield hit about 3.07% in September 2026, the highest since 1996. **The higher yields are at home, the stronger the reason for Japanese investors to keep their money in Japan** — the "repatriation" story markets worry about, because it would reduce demand for US Treasuries.

### ④ Trade deficits and capital flows: two sides of one coin

The balance of payments rests on an accounting identity (ignoring statistical errors):

$$
Current account balance + Capital and financial account balance = 0

The **current account** is mostly trade (exports and imports of goods and services) plus cross-border income (interest, dividends, remittances). The **capital and financial account** records cross-border purchases of assets: foreigners buying US Treasuries, stocks, property and factories, and Americans buying foreign assets.

The identity says: **if America buys more from the world than it sells (a current account deficit), the gap must be filled by foreigners' net purchases of US assets (a capital account surplus).** The logic is simple. The dollars Americans pay foreign exporters don't vanish. The exporter can spend them on American goods (then there'd be no deficit), or deposit them, buy Treasuries, buy stocks — and each of those adds to foreigners' **claims** on the US (Idea ②).

**A numerical example**: in one year the US imports $400 billion of goods and exports $300 billion, and other income items net to zero. The current account deficit is $100 billion, so **foreigners must end up with $100 billion more in US assets on net** — perhaps $60 billion of Treasuries, $30 billion of stocks and $10 billion of bank deposits.

Two opposite readings both hold together, which is why trade policy is so contested:

- **"The deficit is the problem" camp**: the deficit means America is handing foreigners claims on its assets and future income while manufacturing moves abroad; tariffs are the corrective.
- **"The deficit is the result" camp**: precisely because the world wants to hold US assets (safe, liquid, rewarding), capital inflows push up the dollar, making US exports dearer and imports cheaper — **the deficit is the mirror image of global savings flowing into America.** Squeezing imports without changing savings and investment patterns rarely makes it go away.

**The dollar's exchange rate** is the price at which these forces meet. The dollar index (DXY, the dollar against a basket of the euro, yen, pound and others) as of September 2026:

<table>
<tr><th>Date</th><th>DXY</th><th>Backdrop</th></tr>
<tr><td>Sep 27, 2022</td><td>About 114.1 (peak)</td><td>Aggressive Fed hikes</td></tr>
<tr><td>End of 2024</td><td>About 108.5</td><td></td></tr>
<tr><td>Jun 30, 2025</td><td>About 96.9</td><td>First half about −10.7%, worst first half since 1973</td></tr>
<tr><td>Jan 27, 2026</td><td>About 96.2 (2026 low)</td><td></td></tr>
<tr><td>Sep 25, 2026</td><td>About 101.0</td><td>Rising US rates + wartime safe-haven demand</td></tr>
</table>

**The dollar's moves ripple worldwide.** A stronger dollar squeezes emerging-market companies and governments with dollar debts (their revenue is in local currency, their debt in dollars). A weaker dollar loosens global dollar credit, and risk assets, Bitcoin included, have tended to benefit (Stage 9.3).

**The April 2025 "sell America" episode** is worth remembering. After the "Liberation Day" tariffs, US stocks, US Treasuries and the dollar **all fell at once**. In a normal panic, Treasuries and the dollar are the safe havens and rise; all three falling together meant some investors were questioning the safety of US assets themselves. The 10-year yield jumped from 4.01% to 4.48% in a week, and markets only steadied after the April 9 announcement of a 90-day pause on most reciprocal tariffs. **The lesson: reserve-currency status rests on trust, and trust gets tested.**

### ⑤ Dollar stablecoins: a new channel for the dollar

**Stablecoins** are tokens that circulate on blockchains and promise redemption one-for-one in dollars (Stage 13.2 covers them in depth). From the dollar system's point of view they are a new kind of "offshore dollar":

- **Size**: on September 26, 2026, total stablecoin supply was about **$312 billion**; USDT (Tether) about $184 billion, or about 59%; USDC (Circle) about $75 billion.
- **Reserves**: under the GENIUS Act, signed July 18, 2025, regulated US payment stablecoins must be backed 1:1 by cash, insured deposits, Treasury bills maturing within 93 days, overnight repo, government money funds and similar assets, publish monthly reserve reports, and **may not pay interest to holders**. That makes stablecoin issuers **buyers of US Treasury bills** — each extra dollar of stablecoins means roughly another dollar of short-term Treasuries or similar assets.
- **Uses**: in countries with high inflation, capital controls or poor banking, people hold dollar stablecoins in phone wallets; cross-border payments, crypto trading and DeFi collateral use them heavily. **On street corners around the world, the dollar is being distributed by blockchain.**

Through this lesson's lens, stablecoins look strikingly like eurodollars: both are dollar liabilities outside the US banking system, both promise one-for-one redemption, both depend on reserve assets and trust. The differences:

<table>
<tr><th></th><th>Eurodollar deposit</th><th>Compliant dollar stablecoin</th></tr>
<tr><td>Who owes it</td><td>An offshore bank</td><td>The stablecoin issuer</td></tr>
<tr><td>Backing assets</td><td>All kinds of dollar loans and securities (with maturity mismatch)</td><td>Cash, short T-bills and the like (very short maturities)</td></tr>
<tr><td>Access to the Fed</td><td>Indirect (via the home central bank's swap line)</td><td>None</td></tr>
<tr><td>Pays interest?</td><td>Usually</td><td>Not allowed under the GENIUS Act</td></tr>
<tr><td>Settlement</td><td>Bank hours, correspondent networks</td><td>24/7, near-instant on-chain</td></tr>
</table>

**Hear both sides.** Supporters argue that stablecoins make the dollar easier to reach worldwide and add demand for Treasury bills, **reinforcing** the dollar's position. Critics worry that stablecoins pull deposits out of the banking system (the Kansas City Fed notes that the extra Treasury demand largely comes out of other assets), that reserves could face runs in extreme conditions (the May 2022 collapse of the algorithmic Terra/UST, Stage 10.5), and that issuers' power to freeze or burn tokens raises questions of control. And large stablecoins such as USDT are not issued by US issuers under the GENIUS framework; the transparency of their reserves has long been debated.

**Bitcoin and de-dollarization**: some Bitcoin advocates see it as a "neutral reserve asset" outside the dollar system, for reasons similar to why central banks buy gold — it doesn't depend on any one nation's credit (Stage 12.3). Critics reply that it's far too volatile for reserve duty: in 2026 it fell from a high of about $126,000 to roughly $58,000–60,000 at one point. That debate returns in Stage 20.1.

Stage 14.5 completes this map: bank deposit tokens, tokenized money funds and stablecoins converging in the same new plumbing. Stage 9.3 discusses why dollar liquidity so often drives risk assets worldwide.
`,

  demo: "dollar-system",

  analogy: `
Think of global finance as a vast city, with the dollar as its **water supply**.

America owns the treatment plant (the Fed) and the biggest reservoir (the Treasury market). Every household in the city is hooked up to this system: whether you sell coffee or build cars, you sign contracts, pay bills and save through dollar pipes. The more people are connected, the harder it is for anyone to switch to different pipes — **that's the network effect**.

On the edge of the city stand many **private water towers** (offshore banks' eurodollars). They draw from the main pipes and sell water to their neighborhoods. Most days they work fine, but they've promised more water than they hold, so in a drought (a financial crisis), when everyone turns on the tap at once, the towers run dry. Then the plant opens **emergency mains** (swap lines) to a few big district stations to keep the whole city from going dry.

Lately something new has appeared: **bottled water** (stablecoins). Each bottle claims to be full of water from the plant, and it can be carried to any corner of the city — or beyond — and traded anytime. As long as there really is water behind each bottle (Treasury-bill reserves), it carries the city's water further; if some bottles turn out to be empty, you get a panic.

And whenever people start worrying about the plant's water quality (US debt, politics, Fed independence), some begin stockpiling **other kinds of water** — gold, or Bitcoin. **The question has never been "is there any other water?" It's "is there any other set of pipes that could supply the whole city?"**
`,

  misconceptions: [
    "**\"Eurodollars are euros.\"** — Eurodollars are **dollar deposits at banks outside the United States**. They have nothing to do with the euro; the name is historical, because the market started in London.",
    "**\"If a crisis starts in the US, the dollar must fall.\"** — In 2008 and March 2020 the dollar rose: the world owes huge amounts of short-term dollar debt and everyone scrambles for dollars in a panic. April 2025's \"sell America\" is a notable exception worth watching.",
    "**\"The US trade deficit means America is losing money.\"** — On paper, the deficit must be matched by capital inflows: foreigners use the dollars to buy US Treasuries, stocks and other assets. It reflects global savings and investment patterns; whether it's good or bad depends on how that capital is used.",
    "**\"Stablecoins have nothing to do with the dollar; they're crypto's own money.\"** — Mainstream stablecoins are dollar liabilities, largely backed by US Treasury bills and other dollar assets. Under the GENIUS Act, compliant issuers must hold such reserves 1:1, so stablecoins actually extend the dollar's global reach.",
    "**\"De-dollarization means the dollar will soon be replaced.\"** — Central-bank gold buying and local-currency trade deals are growing, but the dollar remains central to reserves, trade pricing, FX trading and international lending. Slow change at the margins is far more realistic than sudden replacement.",
  ],

  quiz: [
    {
      q: "In one year the US imports $400 billion of goods and exports $300 billion, and other income items net to zero. By the balance-of-payments identity, what happens?",
      options: [
        "America simply loses $100 billion",
        "The dollar must rise 10%",
        "Foreigners' net holdings of US assets rise by about $100 billion",
        "The Fed must print $100 billion",
      ],
      answer: 2,
      explain: "**Current account deficit = capital and financial account surplus.** The dollars foreign exporters receive come back as purchases of Treasuries, stocks, deposits and so on — new **claims** on US assets (Idea ②).",
    },
    {
      q: "What are \"eurodollars\"?",
      options: [
        "Euros issued by the European Central Bank",
        "Dollar deposits held at banks outside the United States",
        "Dollar bonds issued by the European Union",
        "Dollar banknotes the Fed prints in Europe",
      ],
      answer: 1,
      explain: "Eurodollars are **dollar deposits outside the US**, a market that began in London in the 1950s–60s. The banks holding them can't borrow directly from the Fed, which is why crises can trigger a \"dollar shortage.\"",
    },
    {
      q: "What do the Fed's central bank liquidity swap lines do in a crisis?",
      options: [
        "Lend dollars to foreign central banks, which lend them on to dollar-starved banks at home, easing the global dollar shortage",
        "Sell US Treasuries to foreign central banks",
        "Force foreigners to hold dollars",
        "Let foreign central banks make loans directly inside the US",
      ],
      answer: 0,
      explain: "The Fed swaps dollars for a foreign central bank's currency as collateral, and that central bank lends the dollars to its banks. In 2008 and March 2020 this made the Fed the **global lender of last resort**.",
    },
    {
      q: "What was unusual about the \"sell America\" episode after the April 2025 \"Liberation Day\" tariffs?",
      options: [
        "Only US stocks fell",
        "The dollar and Treasuries both rallied hard",
        "The Fed made an emergency hike",
        "US stocks, Treasuries and the dollar all fell at once, although Treasuries and the dollar are normally safe havens in a panic",
      ],
      answer: 3,
      explain: "In a typical panic Treasuries and the dollar rise. All three falling together meant some investors were questioning the safety of US assets themselves — **reserve-currency status rests on trust.**",
    },
    {
      q: "Under the GENIUS Act, what is the direct effect of compliant dollar payment stablecoins on the dollar system?",
      options: [
        "They may pay Treasury interest to holders",
        "They must hold 1:1 reserves in cash, short T-bills and similar assets, which makes them buyers of Treasury bills",
        "They must hold Bitcoin as reserves",
        "They can apply to the Fed for swap lines",
      ],
      answer: 1,
      explain: "Reserves must be cash, insured deposits, T-bills maturing within 93 days, overnight repo, government money funds and the like, and issuers **may not pay interest**. Stablecoins thus become new buyers of bills and distribute the dollar worldwide.",
    },
  ],

  further: [
    { label: "Federal Reserve: central bank liquidity swap lines explained", url: "https://www.federalreserve.gov/monetarypolicy/central-bank-liquidity-swaps.htm" },
    { label: "US Treasury TIC: major foreign holders of Treasury securities", url: "https://ticdata.treasury.gov/Publish/mfhhis01.txt" },
    { label: "The GENIUS Act, full text (US Congress, S.1582)", url: "https://www.congress.gov/bill/119th-congress/senate-bill/1582/text" },
    { label: "FRED: nominal broad US dollar index (DTWEXBGS)", url: "https://fred.stlouisfed.org/series/DTWEXBGS" },
  ],
};
