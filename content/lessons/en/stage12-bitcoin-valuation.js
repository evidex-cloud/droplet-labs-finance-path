export default {
  id: "bitcoin-valuation",
  stage: 12,
  order: 3,
  title: "How to Value Bitcoin: Digital Gold, Network Value & Adoption Curves",
  difficulty: "newfin",
  prereqs: ["bitcoin-supply", "present-value"],

  oneLiner:
    "Stage 2.3 said every asset is worth the present value of its future cash flows. Bitcoin pays no interest, no dividends and earns no profits — **so that formula simply breaks**. What, then, makes it worth anything? This lesson lays out the main valuation frameworks: market share versus gold, Metcalfe-style network value, S-shaped adoption curves with probability-weighted scenarios, and the often-misused anchor of “production cost” — and then sets the strongest bull and bear arguments side by side. In late September 2026 bitcoin's market value was about $1.69 trillion, roughly 5–6% of the value of all above-ground gold. **Whether that number is a starting point or a ceiling is the whole debate.** This lesson covers frameworks only and is not investment advice.",

  intuition: `
Start with a thought experiment. You hold two “asset cards.”

- One is a 30-year US Treasury bond. It pays you interest every year for 30 years and returns your principal at the end. What is it worth? Discount those cash flows at the market rate, add them up, and you have the answer (Stage 4.2).
- The other is one bitcoin. It **will never pay you anything**. No interest, no dividends, no corporate profits. The only thing you can hope for is that someday somebody will take it off your hands at a higher price.

Run the second card through the present-value formula of Stage 2.3 and you get zero. Yet in late September 2026 its market price was about $84,000. Is the market insane, or is the formula being used in the wrong place?

The answer is that **bitcoin belongs to a different class of asset — one whose value comes from demand to hold it as money**. Economists call this a **monetary premium**. You already know assets like this. Gold produces no cash flow and has been expensive for thousands of years. The dollar bills in your wallet pay no interest either, yet you happily hold them because everyone else accepts them. The value of such assets isn't *calculated*; it is **a social consensus** about how many people, holding what share of their wealth, want to store value in that particular thing.

So valuing bitcoin really means estimating two things: **how large that consensus could eventually become, and how likely it is to get there**. That maps onto this lesson's two ideas:

- **Idea ① The price of time.** Even without cash flows, bitcoin can't escape interest rates. The cost of holding it is the risk-free return you give up (Stage 2.4). In September 2026 the 30-year Treasury yielded about 5.5% and the 10-year real yield was above 2%, so **holding a zero-yield asset cost far more than it did in the zero-rate world of 2021**.
- **Idea ④ Risk & leverage.** Bitcoin's value isn't a number; it is **a probability distribution**. It might rise to many times today's price, or shrink badly, or go to zero. A serious valuation writes that distribution down instead of quoting a single price target.

Why does this matter for the rest of the course? Because the treasury companies of Stages 15–18 are all built on the assumption that bitcoin appreciates over the long run. The mNAV of Stage 16.2 is simply \\(\\mathrm{mNAV} = \\dfrac{\\text{company value}}{\\text{value of the bitcoin it holds}}\\). If you can't say what bitcoin itself is worth, every judgment about those companies inherits that uncertainty.

**We'll take this lesson in five parts:**

- **① Why DCF doesn't work: valuing an asset with no cash flows**
- **② Digital gold: the market-share method**
- **③ Network value: Metcalfe's law and on-chain metrics**
- **④ Adoption curves and weighted scenarios: putting numbers on uncertainty**
- **⑤ The production-cost fallacy, and the strongest case on each side**
`,

  mechanics: `
### ① Why DCF doesn't work: valuing an asset with no cash flows

Discounted cash flow analysis (Stage 5.3) needs three inputs: cash flows, a growth rate and a discount rate. Bitcoin fails at the first. Some people try to patch the gap with “lending yield” or “staking-style” returns, but that income comes from a borrower or a platform, not from bitcoin itself — and lending your bitcoin out adds counterparty risk, as the collapse of Celsius and similar platforms showed (Stage 10.5).

An asset without cash flows can only be valued in *relative* terms: what can it replace, and how much share can it take from whom? An old distinction in economics helps:

- **Income assets** (bonds, stocks, property): \\(\\text{value} = \\text{present value of the cash flows}\\).
- **Monetary assets** (gold, fiat currency, bitcoin): value is the total wealth people choose to hold in “something that stores and moves value.”

Monetary assets share one crucial feature: **network effects and self-reinforcement**. The more people accept it, the more useful it is; the more useful it is, the more people accept it. That lets its value be self-consistent across a very wide range — it can be huge or tiny. Gold has sat firmly at the “huge” end for millennia. Plenty of historical monies — cowrie shells, all sorts of abandoned paper currencies — slid to the “tiny” end. The entire difficulty of valuing bitcoin is judging which end it will settle at, and the odds along the way.

### ② Digital gold: the market-share method

The most popular framework asks: **how much of gold's “store of value” role could bitcoin take over?**

First, size gold's pie. The World Gold Council estimates that about 216,000 tonnes of gold have ever been mined; one tonne is about 32,150.7 troy ounces. At the September 25, 2026 price of about $4,321 an ounce:

$$
\\text{Value of all gold} \\approx 216{,}000 \\times 32{,}150.7 \\times \\$4{,}321 \\approx \\$30\\ \\text{trillion}
\\frac{\\text{bitcoin market value}}{\\text{value of all gold}} \\approx \\frac{\\$1.69\\ \\text{trillion}}{\\$30\\ \\text{trillion}} \\approx 5.6\\%
$$

(Bitcoin's market value is taken at about $1.69 trillion on Sep 25–26, 2026 — about 5.6% of gold.)

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Market value compared (late September 2026, approximate)</text><text x="20" y="58" font-size="12" font-weight="600" fill="var(--ink)">Gold</text><rect x="80" y="42" width="234" height="26" fill="var(--orange-soft)" stroke="var(--orange-line)"/><rect x="314" y="42" width="114" height="26" fill="var(--orange)" opacity=".75"/><rect x="428" y="42" width="88" height="26" fill="var(--orange)"/><rect x="516" y="42" width="84" height="26" fill="var(--surface-2)" stroke="var(--line)"/><text x="197" y="59" text-anchor="middle" font-size="10" fill="var(--ink)">Jewelry ~45%</text><text x="371" y="59" text-anchor="middle" font-size="10" fill="var(--surface)">Bars, coins, ETFs ~22%</text><text x="472" y="59" text-anchor="middle" font-size="10" fill="var(--surface)">Central banks ~17%</text><text x="558" y="59" text-anchor="middle" font-size="10" fill="var(--muted)">Other</text><text x="600" y="86" text-anchor="end" font-size="11" fill="var(--muted)">about $30 trillion</text><text x="20" y="118" font-size="12" font-weight="600" fill="var(--ink)">Bitcoin</text><rect x="80" y="102" width="29" height="26" fill="var(--btc)"/><text x="116" y="119" font-size="11" fill="var(--btc)" font-weight="600">about $1.69 trillion (about 5.6% of gold)</text><line x1="80" y1="150" x2="600" y2="150" stroke="var(--line)"/><g font-size="11" fill="var(--ink)"><text x="20" y="176">If bitcoin reached this share of gold's value … (using about 20.09M coins)</text><text x="40" y="198">10% → about $150,000 per coin</text><text x="40" y="218">25% → about $370,000 per coin</text><text x="330" y="198">40% (≈ the investment + central-bank part) → ~$600,000</text><text x="330" y="218">100% → about $1.5 million per coin</text></g><text x="320" y="252" text-anchor="middle" font-size="11" fill="var(--orange-ink)" font-weight="600">The share method gives “if … then …,” not a forecast: everything hangs on the share assumption</text></svg><figcaption>Gold's breakdown by use is a rough World Gold Council estimate. Bitcoin needs only a small slice of gold's value for its implied price to change dramatically — which is why this method is both seductive and dangerous.</figcaption></figure>

Two details are often missed:

- **Not all of gold's pie is monetary demand.** A bit over 40% is jewelry, which has cultural and consumption value. The part actually held as investment or reserves — bars and coins, gold ETFs, central-bank holdings — is around 40%. Comparing bitcoin with *all* gold overstates the share that is really up for grabs.
- **Gold itself moves.** Gold set a record of about $5,318 in January 2026 and had slipped to about $4,321 by late September — the size of the pie itself swings. And central banks bought more than 1,000 tonnes of gold a year in 2022–2024, a sign that official reserve demand still flows mainly to gold, not bitcoin.

The share method's real value is **order of magnitude**. It tells you that if the “digital gold” story fully comes true, the price could be many times today's level; if only a sliver comes true, perhaps one or two times; and if it fails, the share can drift toward zero.

### ③ Network value: Metcalfe's law and on-chain metrics

**Metcalfe's law** says a network's value grows with the square of its users (\\(V \\propto n^{2}\\)), because \\(n\\) users can form about \\(\\dfrac{n^{2}}{2}\\) connections. Telephone networks and social media are often analyzed this way. Applied to bitcoin: double the users and value roughly quadruples (\\((2n)^{2} = 4n^{2}\\)).

Several researchers have regressed bitcoin's market value on active addresses and found a good fit. The criticisms are just as strong:

- **Users can't be observed directly.** One person may control hundreds of addresses; one exchange address may stand for millions of customers; and ETF shareholders never appear on-chain at all.
- **\\(n^{2}\\) probably overstates network effects.** Some researchers (for example Odlyzko and Tilly, 2005) argue that \\(n \\log n\\) is closer to reality: new connections are worth less and less, and your link to the millionth user is worth almost nothing.
- **Causality may run backwards.** Rising prices attract users and create more addresses, not only the other way round.

A more practical on-chain tool is **realized cap**: value every coin at the price at which it *last moved on-chain* and add them up. That approximates the average cost basis of all holders. Divide market cap by realized cap to get **MVRV**: \\(\\mathrm{MVRV} = \\dfrac{\\text{market cap}}{\\text{realized cap}}\\). Historically, readings well above about 3 have tended to come near cycle tops (holders sit on fat paper profits, so selling pressure is high), and readings near or below 1 near bottoms (the average holder is under water and sellers are exhausted). MVRV can't tell you what bitcoin *should* be worth, but it does describe **holders' psychology and cost structure** — the behavioral traps of Stage 11.5 in numerical form.

### ④ Adoption curves and weighted scenarios: putting numbers on uncertainty

New technologies are often adopted along an **S-curve**: slowly at first, then quickly after a tipping point, then slowing again near saturation. The internet and smartphones both followed this path. Bitcoin's supporters argue it is in the accelerating “institutional adoption” phase. Their evidence: US spot bitcoin ETFs launched in January 2024 and by September 2026 reportedly held about $100 billion of bitcoin (Stage 12.5); a March 2025 executive order created a US Strategic Bitcoin Reserve; and states such as New Hampshire, Arizona and Texas passed state-level reserve laws.

The S-curve has two traps. First, **you don't know where its ceiling is** — it might be a large slice of global savings or a small speculative niche. Second, **adoption can be priced in advance**: if everyone expects adoption to continue, the price already reflects it, and future returns depend on adoption *beating* expectations.

The more honest approach is to write the valuation as **weighted scenarios** and then use Idea ① to bring the answer back to today:

<table>
<tr><th>Scenario (in 10 years)</th><th>Assumption</th><th>Price</th><th>Probability (example)</th></tr>
<tr><td>Bear: the story fails</td><td>Sidelined by regulation, competition or technical risk</td><td>$10,000</td><td>25%</td></tr>
<tr><td>Base: niche digital gold</td><td>About 40% of gold's investment + central-bank portion</td><td>$250,000</td><td>50%</td></tr>
<tr><td>Bull: global reserve asset</td><td>Close to two-thirds of gold's entire value</td><td>$1,000,000</td><td>25%</td></tr>
</table>

$$
\\text{Expected price} = 0.25 \\times \\$10\\text{k} + 0.50 \\times \\$250\\text{k} + 0.25 \\times \\$1{,}000\\text{k}
\\text{Expected price} = \\$377{,}500
$$

Then bring it back to today: the first line below discounts 10 years at a 15% required return, the second at 10%.

$$
\\mathrm{PV}_{15\\%} = \\frac{\\$377{,}500}{1.15^{10}} \\approx \\$93{,}000
\\mathrm{PV}_{10\\%} = \\frac{\\$377{,}500}{1.10^{10}} \\approx \\$146{,}000
$$

Notice three things:

- **The answer is extremely sensitive to the required return.** Dropping it from 15% to 10% raises today's value by more than half. That is why rising rates hit growth stocks and bitcoin at the same time (Stage 12.4 shows the 2022 and 2026 episodes).
- **The answer is just as sensitive to the probabilities.** Raise the bear case from 25% to 40% and the expected value falls noticeably. Behind anyone's “price target” sits a set of probabilities they may not show you.
- These numbers are illustrations, **not forecasts**. This lesson covers mechanisms and analytical frameworks only and is not investment advice. The demo lets you plug in your own assumptions.

### ⑤ The production-cost fallacy, and the strongest case on each side

You will often hear that “the cost of mining is bitcoin's floor.” Stage 12.2 showed why that fails: difficulty adjustment makes network-wide cost follow the price. When the price is high, miners flood in and costs rise; when it is low, they leave and costs fall. **Cost is the price's shadow, not its anchor.** Where it helps is in reading miner behavior: when the price stays below most miners' costs for a long time, miners are forced to sell coins and switch off — something that tends to happen late in bear markets.

Now put the strongest arguments side by side.

**The strongest bull case**

- **Monetary premiums have precedent.** Gold has no cash flow yet has held its value for millennia, and money is a social consensus to begin with. Bitcoin beats gold on verifiability, portability, divisibility and supply transparency (Stage 1.5, Stage 12.2).
- **Long-run pressure on fiat is real.** US federal debt passed $40 trillion in August 2026 and annual interest costs run at about $1 trillion or more (Stage 9.4). Demand for assets that can't be printed has structural roots.
- **The institutional plumbing now exists.** ETFs, regulated custody and fair-value accounting let large pools of capital hold it compliantly for the first time.
- **Option value.** Even if the chance of becoming a global reserve asset is small, the payoff if it happens is enormous; \\(\\text{small probability} \\times \\text{huge payoff}\\) can still produce a positive expected value.

**The strongest bear case**

- **No anchor.** With no cash flows, value rests entirely on belief, and belief can reinforce itself downward as easily as upward. A fall from about $126,000 in October 2025 to about $58,000 in June 2026 — roughly −54% — is not what a “store of value” is supposed to look like.
- **It isn't really used as money.** El Salvador made bitcoin legal tender in 2021 and, to secure an IMF loan, rolled back mandatory acceptance in early 2025. Payments are increasingly going to stablecoins instead (Stage 13.2).
- **Gold won the reserve contest.** The 2025–2026 “debasement trade” and central-bank reserve demand flowed mainly into gold; when gold hit its record in January 2026, bitcoin was already falling.
- **Higher opportunity cost.** With real yields above 2%, holding a zero-yield asset is expensive, and valuations built on the distant future are highly sensitive to the discount rate.
- **Tail risks.** Quantum computing, the security budget, regulation and concentration (Stage 12.6) could all erode the long-run consensus.

The lesson in one sentence: **Bitcoin has no cash flows; its value is a monetary premium — a social consensus that could end up large or small. Share-of-gold and network models give you orders of magnitude, weighted scenarios turn the uncertainty into numbers, and interest rates decide how much you are willing to pay today for distant possibilities.** Stage 15.3 asks why some companies are willing to bet their entire balance sheet on the right tail of that distribution.
`,

  demo: "bitcoin-valuation",

  analogy: `
Valuing bitcoin is like valuing **a brand-new language**.

A language earns no profits; nobody runs a discounted cash flow on French. Its value depends entirely on **how many people use it**: the more speakers, the more worthwhile it is to learn; the more learners, the more speakers. Over two centuries English snowballed into the world's language of business, while Esperanto stayed a hobbyists' circle. Both were carefully designed communication tools, and their fates could not have been more different.

Now a new language appears. Its grammar is cleaner than the old “gold language,” it spreads more easily, and a few large companies have started listing it as a working language. Will it become the new lingua franca? Nobody knows. What you can do is:

- **Compare shares with the gold language:** what would it look like if it won a tenth of gold's speakers?
- **Look at the network:** how tightly connected are the people who already speak it?
- **Draw the adoption curve and assign odds:** how likely is it to become universal, stay niche, or fade away?
- **Don't forget the cost of time:** the hours spent learning this language could have earned steady interest elsewhere — the higher rates are, the costlier a bet on the distant future.

What the language is “worth” is not a number but a map of possibilities with odds attached. Those who stake everything on it becoming universal — the treasury companies of Stage 15.1 — are placing a big bet on the right-hand side of that map.
`,

  misconceptions: [
    "**“Bitcoin has no cash flows, so its intrinsic value is zero.”** — By DCF, yes — but the same goes for gold and for non-interest-bearing cash. Monetary assets are valued by demand to hold them (the monetary premium), not by DCF. The accurate statement is that bitcoin's value **lacks the anchor cash flows provide**, so its range is extremely wide and volatile. That is a real risk, not proof it equals zero.",
    "**“If bitcoin just captures 10% of gold's value, it's guaranteed to reach $150,000.”** — The share method is an “if … then …” conversion; the share itself is the assumption that needs defending. And more than 40% of gold's pie is jewelry, so the monetary demand up for grabs is smaller than gold's total value — which itself swings a lot.",
    "**“The cost of mining is bitcoin's price floor.”** — Difficulty adjustment makes network-wide costs follow the price; cost is the price's shadow. When the price falls below most miners' costs, it isn't propped up — miners unplug and sell coins until difficulty falls and costs come down.",
    "**“Metcalfe's law proves bitcoin's value.”** — Users can't be observed directly (addresses aren't users, ETF holders aren't on-chain), the \\(n^{2}\\) form is disputed, and price and addresses may cause each other. It is a suggestive description, not a valuation formula.",
    "**“Bitcoin has nothing to do with interest rates because it pays no interest.”** — The opposite. Paying no interest means the cost of holding it *is* the risk-free rate, and because most of its value comes from distant possibilities it is especially sensitive to the discount rate. Bitcoin suffered deep drawdowns during the rate rises of both 2022 and 2026.",
  ],

  quiz: [
    {
      q: "Why can't the present-value (DCF) method of Stage 2.3 be applied directly to bitcoin?",
      options: [
        "Because bitcoin's price is too volatile",
        "Because bitcoin produces no cash flows (interest, dividends, profits); its value comes from demand to hold it — a monetary premium",
        "Because bitcoin's supply is fixed",
        "Because bitcoin has no audited financial statements",
      ],
      answer: 1,
      explain: "DCF needs cash flows. Like gold, bitcoin is a **monetary asset** whose value is the wealth people choose to hold in it, so it can only be valued with relative, network and scenario methods.",
    },
    {
      q: "Using gold's value of about $30 trillion and about 20.09 million bitcoin, what price is implied if bitcoin reaches 25% of gold's value?",
      options: [
        "About $37,000",
        "About $150,000",
        "About $1.5 million",
        "About $370,000",
      ],
      answer: 3,
      explain: "\\(\\dfrac{\\$30\\ \\text{trillion} \\times 25\\%}{20.09\\ \\text{million}} \\approx \\$370{,}000\\). That's just arithmetic; the 25% share is the assumption that actually needs defending.",
    },
    {
      q: "A weighted-scenario valuation gives an expected price of $377,500 in 10 years. If the required return drops from 15% to 10%, what happens to today's present value?",
      options: [
        "It rises from about $93,000 to about $146,000 — the result is highly sensitive to the discount rate",
        "Nothing, because the expected price hasn't changed",
        "It falls, because a lower discount rate means a lower present value",
        "It rises from about $93,000 to $377,500",
      ],
      answer: 0,
      explain: "\\(\\dfrac{\\$377{,}500}{1.15^{10}} \\approx \\$93{,}000\\); \\(\\dfrac{\\$377{,}500}{1.10^{10}} \\approx \\$146{,}000\\). **Assets whose value lies mostly in the distant future are the most rate-sensitive** — Idea ① applied to bitcoin.",
    },
    {
      q: "Which statement about realized cap and MVRV is correct?",
      options: [
        "Realized cap is bitcoin's intrinsic value",
        "An MVRV above 1 proves bitcoin is overvalued",
        "Realized cap values each coin at the price it last moved on-chain, approximating holders' average cost; MVRV reflects holders' aggregate profit or loss and mood",
        "MVRV can predict the exact date of a cycle top",
      ],
      answer: 2,
      explain: "It describes **holders' cost structure**: a very high MVRV means fat paper profits and heavy selling pressure; near or below 1 means the average holder is under water. Useful context, but not a valuation formula or a timing tool.",
    },
    {
      q: "Which of these is one of the strongest arguments against “bitcoin is digital gold”?",
      options: [
        "Bitcoin's supply is capped at 21 million",
        "In 2025–2026 the “debasement trade” and central-bank reserve demand flowed mainly into gold; bitcoin was already falling when gold hit its January 2026 record, and fell about 54% from its peak",
        "Bitcoin trades on weekends",
        "Bitcoin divides into 100 million sats",
      ],
      answer: 1,
      explain: "If bitcoin were really a substitute for gold, it should have rallied when the debasement trade was hottest. **The 2025–2026 divergence** is a serious challenge to the story. Supporters reply that adoption is early and volatility falls as the asset matures (Stage 12.4).",
    },
  ],

  further: [
    { label: "World Gold Council: How much gold has been mined? (above-ground stocks and their uses)", url: "https://www.gold.org/goldhub/data/how-much-gold" },
    { label: "Fortune: Price of Bitcoin, Sep 25, 2026 (price and market-cap snapshot)", url: "https://fortune.com/article/price-of-bitcoin-09-25-2026/" },
    { label: "Odlyzko & Tilly: A refutation of Metcalfe's Law (2005, the classic critique of \\(n^{2}\\) network value)", url: "https://www-users.cse.umn.edu/~odlyzko/doc/metcalfe.pdf" },
    { label: "ECB Blog: Bitcoin's last stand (2022, a representative critics' case)", url: "https://www.ecb.europa.eu/press/blog/date/2022/html/ecb.blog221130~5301eecd19.en.html" },
    { label: "Austrian Path (sister course): subjective value and the origin of money — why something with no cash flow can be valuable", url: "https://evidex-cloud.github.io/droplet-labs-austrian-path/" },
  ],
};
