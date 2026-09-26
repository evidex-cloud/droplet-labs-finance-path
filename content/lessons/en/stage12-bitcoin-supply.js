export default {
  id: "bitcoin-supply",
  stage: 12,
  order: 2,
  title: "21 Million & the Halvings: Monetary Policy Written in Code",
  difficulty: "newfin",
  prereqs: ["bitcoin-how"],

  oneLiner:
    "The supply of dollars is set by a Federal Reserve committee and by bank lending; the supply of bitcoin is set by a line of code: **every 210,000 blocks the new-coin reward halves, and the total can never exceed 21 million**. As of late September 2026 about 20.09 million coins had been mined (roughly 95.7%), new supply was running below 1% a year — already less than gold — and the next halving was expected around April 2028. This lesson takes the schedule apart: how the arithmetic works, why a higher price cannot produce more coins, why the once-popular stock-to-flow model broke down, and what “fixed supply” does and does not guarantee.",

  intuition: `
Imagine a central bank that writes its monetary policy into a law nobody can ever amend: “Starting today, the amount of new money printed halves every four years, and the total stops at 21 million.” No rate-setting meetings, no emergency money-printing in a crisis, no extra printing before an election. It sounds like a thought experiment, but it is how bitcoin has run since 2009.

This lesson sits on **Idea ① The price of time**, and it connects to inflation in Stage 1.4. Recall that fiat money loses purchasing power to steady monetary growth — Stage 1.5 showed that a 1971 dollar was worth about 13 cents by 2024 — so savers need an interest rate above inflation just to avoid having time steal from them. Bitcoin's supporters point out that **here is an asset whose “printing speed” is public, set in advance, and keeps slowing down**. As of September 2026, about 164,000 new coins a year were being created, roughly 0.8% of the existing stock; after the 2028 halving that falls to about 0.4%.

To get a feel for the halvings, follow the numbers. In 2009 each block paid 50 coins. In 2012 that fell to 25, in 2016 to 12.5, in 2020 to 6.25, and on **April 20, 2024** to 3.125. Each era lasts 210,000 blocks (about four years), so the first four years produced half of all coins (10.5 million), the next four produced half of what was left, and so on — like Zeno's runner taking ever-smaller half-steps. The total creeps toward 21 million without quite getting there, and the last satoshi should be mined around 2140.

Watch out for two sleights of hand, though:

- **“Fixed supply” does not mean “the price only goes up.”** Price is set by supply *and* demand. When supply cannot move at all, **every swing in demand shows up one-for-one in the price** — one structural reason for the high volatility covered in Stage 12.4.
- **“The halvings are known in advance” is exactly why they shouldn't be a secret weapon.** The whole schedule has been public since 2009. If markets are reasonably efficient, the effect of a halving should already be in the price. That argument comes to a head with the stock-to-flow model below.

There is a new-era angle too. Bitcoin's total supply is capped — **but the share count of a public company that holds bitcoin is not**. A treasury company can keep issuing shares to buy coins, so the scoreboard it uses is not “how many coins do we own” but “how many sats does each share represent” (Stage 16.1). Once you understand the 21 million rule, you understand why that metric had to be designed that way.

**We'll take this lesson in five parts:**

- **① The issuance schedule: block rewards, 210,000 blocks and a geometric series**
- **② Four halvings and “where are we now”**
- **③ Difficulty adjustment: why a higher price mines no extra coins**
- **④ Stock-to-flow: the rise and fall of a popular model**
- **⑤ What “fixed supply” guarantees — and what it doesn't**
`,

  mechanics: `
### ① The issuance schedule: block rewards, 210,000 blocks and a geometric series

New bitcoin has exactly one source: the first, special transaction in each block (the coinbase transaction), which the miner who found the block writes to itself. Its amount is \\(\\textbf{block subsidy} + \\textbf{all the fees in that block}\\). The subsidy follows three rules:

- It started at 50 BTC.
- It halves every 210,000 blocks. At an average of 10 minutes per block, \\(210{,}000 \\times 10\\ \\text{minutes} \\approx 1{,}458\\ \\text{days}\\), or about four years.
- It is computed in satoshis and drops to zero once it falls below one satoshi.

The total is a geometric series:

$$
\\text{Total} = 210{,}000 \\times 50 \\times \\left(1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\cdots\\right)
\\text{Total} = 210{,}000 \\times 50 \\times 2 = 21{,}000{,}000\\ \\text{BTC}
$$

(Because of rounding to whole satoshis the true cap is a hair under 21 million — about 20,999,999.98 coins.) The shape of this series implies something people often miss: **issuance is heavily front-loaded**. The first four years produced 50% of all coins, the first eight 75%, the first twelve 87.5% and the first sixteen 93.75%. Around 2035 more than 99% will have been mined, and the last 1% will take another century and more.

Contrast conventional money. The Fed has no concept of a “total”; it targets an *inflation rate* of about 2%, and the quantity of money expands and contracts with credit and policy (Stage 1.3, Stage 9.1). Bitcoin is the mirror image: **the quantity rule is fixed and the price floats with demand**. One anchors the price, the other anchors the quantity — the deepest dividing line between the two monetary philosophies.

### ② Four halvings and “where are we now”

<table>
<tr><th>Event</th><th>Date</th><th>Block height</th><th>Subsidy afterward</th><th>Supply at the time</th><th>New supply per year afterward, % of stock</th></tr>
<tr><td>Genesis block</td><td>2009-01-03</td><td>0</td><td>50</td><td>0</td><td>—</td></tr>
<tr><td>1st halving</td><td>2012-11-28</td><td>210,000</td><td>25</td><td>10.5M</td><td>about 12.5%</td></tr>
<tr><td>2nd halving</td><td>2016-07-09</td><td>420,000</td><td>12.5</td><td>15.75M</td><td>about 4.2%</td></tr>
<tr><td>3rd halving</td><td>2020-05-11</td><td>630,000</td><td>6.25</td><td>18.375M</td><td>about 1.8%</td></tr>
<tr><td>4th halving</td><td>2024-04-20</td><td>840,000</td><td>3.125</td><td>about 19.69M</td><td>about 0.83%</td></tr>
<tr><td>5th halving (estimated)</td><td>around April 2028</td><td>1,050,000</td><td>1.5625</td><td>about 20.34M</td><td>about 0.4%</td></tr>
</table>

The last column is bitcoin's **supply inflation rate**, computed as below (there are roughly 52,560 blocks a year); the second line is the example right after the 2024 halving:

$$
\\text{supply inflation rate} = \\frac{\\text{subsidy} \\times 52{,}560}{\\text{existing stock}}
\\text{supply inflation rate} = \\frac{3.125 \\times 52{,}560}{19.7\\ \\text{million}} \\approx \\frac{164{,}250}{19.7\\ \\text{million}} \\approx 0.83\\%
$$

**As of September 26, 2026**, the block height was about 968,619 and about 20.09 million coins had been mined — roughly **95.7%** of the cap (live figures from blockchain.info). By most estimates the 20-millionth bitcoin was mined around March 2026. At the late-September 2026 price of about $84,000, the roughly 450 new coins minted each day (\\(3.125 \\times 144\\) blocks) were worth about $38 million, or about $13.8 billion a year — the “new supply” miners must either sell or hold.

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Bitcoin's cumulative supply: the slope halves every four years, approaching 21M</text><line x1="60" y1="50" x2="600" y2="50" stroke="var(--red)" stroke-width="1.5" stroke-dasharray="5 4"/><text x="600" y="44" text-anchor="end" font-size="11" fill="var(--red)">Cap: 21M</text><line x1="60" y1="230" x2="600" y2="230" stroke="var(--line)" stroke-width="1.5"/><line x1="60" y1="50" x2="60" y2="230" stroke="var(--line)" stroke-width="1.5"/><polyline points="60,230 125.8,140 186.6,95 252.4,72.5 318.2,61.3 385.7,55.7 453.2,52.8 520.7,51.4 600,50.7" fill="none" stroke="var(--btc)" stroke-width="3"/><g font-size="10" fill="var(--muted)" text-anchor="middle"><text x="60" y="246">2009</text><text x="125.8" y="246">2012</text><text x="186.6" y="246">2016</text><text x="252.4" y="246">2020</text><text x="318.2" y="246">2024</text><text x="385.7" y="246">2028</text><text x="453.2" y="246">2032</text><text x="520.7" y="246">2036</text></g><g font-size="10" fill="var(--btc)" text-anchor="middle" font-weight="600"><text x="93" y="264">50</text><text x="156" y="264">25</text><text x="219.5" y="264">12.5</text><text x="285.3" y="264">6.25</text><text x="352" y="264">3.125</text><text x="419.5" y="264">1.5625</text></g><text x="22" y="264" font-size="10" fill="var(--muted)">Subsidy</text><g font-size="10" fill="var(--muted)"><text x="54" y="143" text-anchor="end">10.5M</text><text x="54" y="98" text-anchor="end">15.75M</text><text x="54" y="233" text-anchor="end">0</text></g><circle cx="358.7" cy="57.8" r="5" fill="var(--orange)"/><text x="366" y="78" font-size="11" fill="var(--orange-ink)" font-weight="600">Sep 2026: about 20.09M (95.7%)</text><text x="320" y="284" text-anchor="middle" font-size="11" fill="var(--ink)">The slope of each segment is that era's block subsidy; each kink is a halving</text></svg><figcaption>The supply curve is a chain of straight segments: half of all coins in the first four years, then half of the remainder every four years after.</figcaption></figure>

### ③ Difficulty adjustment: why a higher price mines no extra coins

This is the biggest supply difference between bitcoin and gold, and the strongest part of the “digital gold” story.

**Gold supply is elastic.** When gold went from about $2,000 in early 2024 to a record near $5,300 in January 2026, miners had every reason to reopen high-cost mines and explore harder, and a few years later output rises. The elasticity is small — new mining adds only about 1.5–2% to the stock each year — but it exists: a higher price brings more supply.

**Bitcoin supply is perfectly inelastic.** Bitcoin's price rises → mining becomes more profitable → more machines switch on → blocks arrive faster → within two weeks the difficulty adjusts upward → blocks return to 10 minutes → **not a single extra coin is created**. All a higher price buys is more **hash power**, meaning a ledger that is harder to attack. It works in reverse too: when the price crashes, high-cost miners unplug, difficulty falls, and the survivors keep producing blocks on schedule.

Two consequences follow:

- **Every demand shock is absorbed by the price.** The supply curve is vertical. Push demand a little to the right and the price must rise a lot; pull it left and the price must fall a lot. That is one structural reason for bitcoin's volatility (Stage 12.4).
- **Mining cost follows the price, not the other way round.** People often say “the cost of mining is bitcoin's price floor,” but difficulty adjustment drags network-wide costs toward revenue. When the price is high, competitors pile in and costs rise; when it is low, they leave and costs fall. Cost is more like the price's shadow than its anchor — a critique Stage 12.3 develops.

Every halving cuts miners' subsidy income in half overnight for the same hash power. Afterward, inefficient machines get retired, mining companies consolidate, hunt for cheaper power, or pivot their infrastructure toward other compute businesses such as AI data centers. In the long run the subsidy trends to zero and miners must rely more and more on fees — the origin of the “security budget” question in Stage 12.6.

### ④ Stock-to-flow: the rise and fall of a popular model

The **stock-to-flow ratio** (S2F) is the existing stock divided by annual new production, \\(\\mathrm{S2F} = \\dfrac{\\text{existing stock}}{\\text{annual new supply}}\\) — “how many years, at the current pace, would it take to produce the entire existing stock again.” It measures **how quickly new supply dilutes the old**:

<table>
<tr><th>Asset</th><th>Stock</th><th>New per year</th><th>S2F (years)</th></tr>
<tr><td>Gold</td><td>about 216,000 tonnes</td><td>about 3,600 tonnes</td><td>about 60</td></tr>
<tr><td>Bitcoin (after the 2024 halving)</td><td>about 20.09M coins (Sep 2026)</td><td>about 164,000 coins</td><td>about 122</td></tr>
<tr><td>Bitcoin (after the 2028 halving, est.)</td><td>about 20.34M coins</td><td>about 82,000 coins</td><td>about 248</td></tr>
</table>

By this yardstick, **bitcoin became “harder” than gold after the 2024 halving**. In 2019 a pseudonymous analyst called PlanB published a model that regressed bitcoin's total market value on its S2F, finding roughly \\(\\ln(\\text{market value}) \\approx 3.3 \\times \\ln(\\mathrm{S2F}) + 14.6\\), and predicted that the price would jump to a new plateau after each halving. The model became famous during the 2020–2021 bull market: plugging in the 2020–2024 era's S2F of about 56 gives a price around $55,000, and bitcoin went on to touch about $69,000 in November 2021.

Then the model broke. After FTX collapsed in November 2022, bitcoin fell to about $15,500 — roughly three-quarters below the model value — and stayed below it for a long time. Using the same formula, the post-2024 S2F of about 120 implies a price on the order of $800,000. The actual all-time high in October 2025 was about $126,000, and in late September 2026 the price was about $84,000, roughly a tenth of the model value. The critics' arguments are strong:

- **It looks only at supply, never at demand.** Scarcity is necessary for value, not sufficient. Plenty of scarce things (an obscure postage stamp, say) are worth little unless someone wants them.
- **Predictable events shouldn't produce excess returns.** The halving schedule has been public since 2009. If everyone knew halvings doubled the price, rational buyers would buy early and pull the gain forward. (The “four-year cycle” debate in Stage 12.4 revolves around the same point.)
- **A statistical trap.** Regressing two steadily rising time series on each other easily produces a great fit without implying causation — a spurious regression — and the sample contains only three or four halving cycles.
- **Gold itself is a counterexample.** Gold's S2F has barely changed in decades, yet its price has swung from $35 to above $5,000. S2F cannot explain most of the variation in gold's price.

S2F is still a useful *description*: it tells you accurately how small bitcoin's new supply is. It failed when people used it as a *pricing formula*.

### ⑤ What “fixed supply” guarantees — and what it doesn't

**What it guarantees:**

- **Nobody can dilute you.** No central bank, board or emergency meeting can issue one extra coin. Every person running a full node checks the rule independently: a block that pays even one satoshi too much is rejected by honest nodes (Stage 12.1). Changing the cap would require almost every node operator, exchange and holder to agree — and they are precisely the people who benefit from the cap.
- **Transparency and auditability.** Anyone can count the total supply at any moment — something not even gold can offer, since nobody knows exactly how much gold exists above ground.

**What it doesn't guarantee:**

- **An exact circulating supply.** Many early users lost their keys; common estimates put permanently lost coins at 3–4 million. Another million or so are believed to be Satoshi-era coins that have never moved. The “effective supply” is smaller than 20.09 million, which is the bullish side. But if those coins ever move — for example if quantum computers crack old addresses (Stage 12.6) — it turns into the bearish side.
- **A stable value.** Fixed supply plus fickle demand means big price swings, and something whose price swings wildly is hard to use as a unit of account.
- **A fair distribution.** Issuance was front-loaded: half of all coins existed by the end of 2012, when very few people were involved and mining was cheap. Supporters reply that anyone could join for free back then — there was no pre-mine and no private sale. Critics answer that early holders still got an enormous head start.
- **Freedom from a “deflationary spiral.”** Keynesians worry that if money only ever gains value, people hoard rather than spend, and debtors' real burdens keep growing (the flip side of Stage 1.4). Supporters reply that bitcoin divides almost endlessly (\\(1\\ \\text{BTC} = 100\\ \\text{million sats}\\)) and that the late-nineteenth-century US grew quickly while prices gently fell. The debate is not settled.

The lesson in one sentence: **Bitcoin locks the quantity in code and leaves every adjustment to the price; its supply inflation is already below gold's and halves again every four years, but scarcity is only half the story of value — the other half is demand, which is where Stage 12.3 picks up.**
`,

  demo: "bitcoin-supply",

  analogy: `
Think of bitcoin issuance as **a spring that keeps getting stingier**.

When the spring first bubbled up, it poured out 50 buckets an hour, and whichever villager (miner) won the right to draw water took that bucket home. Every four years, precisely, the flow halves: 50, 25, 12.5, 6.25, 3.125… The reservoir — the total supply — is soon nearly full, and after that it gains only a trickle each year.

The spring has one odd property: **no matter how many people show up, the flow never changes**. If water prices rise and more villagers arrive with buckets, the spring simply makes the riddle you must answer to draw water harder, so exactly the same amount flows each hour. The newcomers only make the queue more crowded and the competition fiercer — which also makes it harder for any single person to take over the spring.

Compare a gold mine. When gold prices rise, the owner hires more workers and digs more tunnels, and a few years later there really is more gold. The spring won't give a single extra drop however high the price of water goes.

That is why spring water's price swings so hard: when more people want water, the flow can't adjust, so only a higher price can squeeze out the extra demand. And it's why knowing “the spring is stingy” can't tell you what a bucket is worth — that depends on how many people want it (Stage 12.3).
`,

  misconceptions: [
    "**“A halving doubles the price because supply is cut in half.”** — A halving cuts *new* supply, not the stock. The 2024 halving lowered annual new supply from about 1.7% to about 0.8% while the stock barely moved. The schedule is also public, so a rational market should price it in advance, and past post-halving rallies were mixed up with liquidity, ETFs and other drivers.",
    "**“When the price rises, miners produce more bitcoin.”** — They don't. A higher price attracts more hash power, but difficulty adjustment pulls block time back to 10 minutes and not one extra coin is issued. A higher price buys more security, not more supply — the biggest difference from gold.",
    "**“The cost of mining is bitcoin's price floor.”** — Difficulty adjustment moves network-wide costs with the price: when the price falls, high-cost miners unplug, difficulty drops and the survivors' costs fall too. Cost is the price's shadow, not its floor. Several miners went bankrupt in 2022 after the price fell below their costs, and the price was not “held up.”",
    "**“The stock-to-flow model predicted bitcoin's price accurately.”** — It looked right in 2020–2021, but from 2022 on the price sat far below the model. Using the original formula, the post-2024 model price is on the order of $800,000; the actual price in September 2026 was about $84,000. S2F describes scarcity but ignores demand, so it can't serve as a pricing formula.",
    "**“The 21 million cap can never change.”** — Technically the cap is just code. The real constraint is **social consensus**: nearly every node operator, exchange and holder would have to accept a new rule, and they are exactly the people who benefit from the cap. So it is extremely hard to change, but that is an economic and social guarantee, not a law of physics.",
  ],

  quiz: [
    {
      q: "After the fourth halving in April 2024, what is the block subsidy, and at about 52,560 blocks a year, roughly how many new coins does that create annually?",
      options: [
        "6.25 BTC; about 329,000 coins",
        "1.5625 BTC; about 82,000 coins",
        "12.5 BTC; about 657,000 coins",
        "3.125 BTC; about 164,000 coins",
      ],
      answer: 3,
      explain: "The subsidy fell from 6.25 to **3.125 BTC**; \\(3.125 \\times 52{,}560 \\approx 164{,}250\\ \\text{coins a year}\\), about 0.8% of the stock. The next halving, around April 2028, cuts it to 1.5625.",
    },
    {
      q: "Bitcoin's price surges and network hash power jumps with it. What most likely happens next?",
      options: [
        "Issuance speeds up and supply grows",
        "Within about two weeks the difficulty rises, block time returns to about 10 minutes, and the number of new coins is unchanged",
        "The 21 million cap rises automatically",
        "The next halving arrives early",
      ],
      answer: 1,
      explain: "**Difficulty adjustment** makes supply perfectly inelastic to price: extra hash power only makes the ledger more secure and produces no extra coins. Demand shocks therefore land almost entirely on the price.",
    },
    {
      q: "Why is bitcoin issuance described as “front-loaded”?",
      options: [
        "The first four years produced 50% of all coins and the first sixteen about 93.75%; the rest will take more than a century",
        "Satoshi pre-mined half the supply before launch",
        "Issuance is constant every year",
        "Most issuance happens after 2140",
      ],
      answer: 0,
      explain: "That's the geometric series at work: each four-year era mines half of what's left. **About 95.7% had been mined by September 2026**, and more than 99% will be by around 2035. There was no pre-mine, but early participants acquired most coins very cheaply.",
    },
    {
      q: "Which of these is the strongest criticism of the stock-to-flow model?",
      options: [
        "It miscounts bitcoin's existing stock",
        "Gold's stock-to-flow ratio is higher than bitcoin's",
        "It describes supply but ignores demand; the halving schedule is public and should already be priced in; and regressing two trending series can produce a spurious fit",
        "It ignores fee income",
      ],
      answer: 2,
      explain: "S2F accurately describes **scarcity**, but scarcity is only necessary for value, and predictable supply changes shouldn't deliver predictable excess returns. From 2022 on, the price sat far below the model for long stretches.",
    },
  ],

  further: [
    { label: "blockchain.info: live total bitcoin supply (totalbc, in satoshis)", url: "https://blockchain.info/q/totalbc" },
    { label: "CoinDesk: The Bitcoin Halving Is Here (April 20, 2024, block 840,000)", url: "https://www.coindesk.com/tech/2024/04/20/bitcoin-blockchain-has-fourth-halving-in-15-year-history-in-show-of-monetary-policy-set-by-code" },
    { label: "PlanB: Modeling Bitcoin Value with Scarcity (the original 2019 stock-to-flow article)", url: "https://medium.com/@100trillionUSD/modeling-bitcoin-value-with-scarcity-91fa0fc03e25" },
    { label: "Bitcoin Wiki: Controlled supply (issuance rules and the halving schedule)", url: "https://en.bitcoin.it/wiki/Controlled_supply" },
    { label: "World Gold Council: above-ground gold stocks and mine supply", url: "https://www.gold.org/goldhub/data/how-much-gold" },
  ],
};
