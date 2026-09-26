export default {
  id: "exchanges-brokers",
  stage: 8,
  order: 1,
  title: "Exchanges, Brokers & Market Makers: What Happens After You Press Buy",
  difficulty: "core",
  prereqs: ["what-is-stock", "indexes-etfs"],

  oneLiner:
    "You tap \"Buy\" on your phone and in under a second it says \"Filled.\" In that second your order passed through a broker, a routing system and a market maker's or exchange's **order book**, and traded with someone you will never meet. This lesson takes that invisible assembly line apart: **the gap between the bid and the ask is the price of immediacy**; market makers earn their living from it and widen it when markets panic; \"zero commission\" is paid for by **payment for order flow**; and crypto markets that never close are rewriting the rules with on-chain order books and automated market makers.",

  intuition: `
Say it's 10:30 on a weekday morning. You open your brokerage app to buy 10 shares of a stock quoted at "$100.00." You tap "Buy," and a moment later the app tells you: "Filled, average price $100.01."

At least five things happened in that moment:

- Your **broker** received the order and checked that you had the cash.
- The broker's **router** decided where to send it — to an exchange, or to a **wholesale market maker** that specializes in retail orders.
- There, your order ran into an **order book**: on one side, other people's standing offers to sell at a given price; on the other, standing offers to buy.
- The best-placed sell order was matched with yours at its **ask** price — not the "last price" on your screen.
- A confirmation traveled back the same way, and your app said "Filled."

Look at step four. You paid **$100.01**, not $100.00. The number on the screen is usually the last trade or the midpoint between buyers and sellers. The price at which you can buy **right now** is the ask; the price at which you can sell right now is the bid; the gap between them is the **bid–ask spread**. **The spread is the price of immediacy.** If you don't want to wait, you pay a small fee to whoever is willing to stand on the other side at any moment.

Who stands there? Very often a **market maker**: a firm that posts both a bid and an ask and stands ready to buy or sell. Market makers don't bet on direction; they earn the spread between buying and selling, and they carry two risks while doing it — inventory that might lose value, and, far worse, the chance that the person trading with them knows more than they do. **In calm markets, market makers compete the spread down to a penny. In a panic, they widen it, or pull their quotes and walk away.** Liquidity isn't a physical constant; it's the amount of risk a group of firms is willing to carry at a given moment.

Then there's a puzzle: your broker charged no commission, so how does it get paid? In the U.S., most retail orders are sent to wholesale market makers, which pay the broker for the privilege. That's **payment for order flow (PFOF)**. It delivers "price improvement" to you and a conflict of interest to your broker, and this lesson puts numbers on both.

Finally, "filled" doesn't mean "yours." The trade is only an agreement. Actually swapping the cash for the shares and recording them in your name takes another business day — the clearing and settlement story of Stage 8.2.

This lesson rests on **Idea ③ Liquidity & trust (the plumbing)**. Exchanges, brokers and market makers are the stretch of financial plumbing closest to you — used every day and almost never seen. It also touches **Idea ④ Risk & leverage**: liquidity itself is a risk that evaporates in a crisis. The liquidation cascades in Stage 7.5 happened precisely because the order book was thin, so each wave of forced selling could punch the price through several levels and trigger the next wave. Looking ahead, Stage 13.3 shows how DeFi replaces the order book and the market maker with a single formula (\\(x \\cdot y = k\\)); Stage 14.3 asks whether stocks will move on-chain and trade around the clock; and when a company like Strategy sells new shares into the market "a little at a time" through an at-the-market program (Stage 17.1), it relies on exactly the order books and market makers described here.

**In this lesson we break it into five pieces:**

- **① The order book: bid, ask and spread**
- **② Market makers: how liquidity gets manufactured**
- **③ Where your order goes: brokers, routing and payment for order flow**
- **④ The exchange's rules: opens, closes, circuit breakers and the "best price"**
- **⑤ Crypto's 24/7 markets and on-chain order books**
`,

  mechanics: `
### ① The order book: bid, ask and spread

At the heart of an exchange sits a **limit order book**. You can place two basic kinds of order:

- A **limit order**: "I'll buy 800 shares at no more than $99.97." It may not fill immediately; it **rests on the book and waits**, and in doing so it **provides** liquidity.
- A **market order**: "Buy me 1,000 shares now, whatever the price." It **consumes** the orders already resting on the book; it **takes** liquidity.

Buy orders are ranked from the highest price down, sell orders from the lowest price up, and at the same price the earlier order goes first — **price priority, then time priority**. The highest bid is the **best bid**, the lowest ask the **best ask**; the gap between them is the spread, and their average is the **midpoint**.

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">An order book: how many levels a 1,000-share market buy eats</text><text x="200" y="46" text-anchor="middle" font-size="11" fill="var(--green)" font-weight="600">Bids: willing to buy</text><text x="440" y="46" text-anchor="middle" font-size="11" fill="var(--red)" font-weight="600">Asks: willing to sell</text><text x="320" y="68" text-anchor="middle" font-size="11" fill="var(--muted)">100.08</text><rect x="360" y="58" width="165" height="14" rx="3" fill="var(--red-soft)" stroke="var(--red)" stroke-width="0.8"/><text x="532" y="69" font-size="10" fill="var(--muted)">1,500</text><text x="320" y="93" text-anchor="middle" font-size="11" fill="var(--ink)">100.05</text><rect x="360" y="83" width="110" height="14" rx="3" fill="var(--red-soft)" stroke="var(--red)" stroke-width="0.8"/><rect x="360" y="83" width="11" height="14" rx="3" fill="var(--red)"/><text x="477" y="94" font-size="10" fill="var(--ink)">1,000 (100 taken)</text><text x="320" y="118" text-anchor="middle" font-size="11" fill="var(--ink)">100.03</text><rect x="360" y="108" width="66" height="14" rx="3" fill="var(--red)"/><text x="433" y="119" font-size="10" fill="var(--ink)">600 (all taken)</text><text x="320" y="143" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">100.02</text><rect x="360" y="133" width="33" height="14" rx="3" fill="var(--red)"/><text x="400" y="144" font-size="10" fill="var(--ink)">300 (all taken) ← best ask</text><rect x="215" y="152" width="210" height="22" rx="4" fill="var(--orange-soft)" stroke="var(--orange-line)"/><text x="320" y="167" text-anchor="middle" font-size="10.5" fill="var(--orange-ink)" font-weight="600">Mid 100.00 · spread 0.04 = 4 bp</text><text x="320" y="193" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">99.98</text><rect x="225" y="183" width="55" height="14" rx="3" fill="var(--green-soft)" stroke="var(--green)" stroke-width="0.8"/><text x="218" y="194" text-anchor="end" font-size="10" fill="var(--muted)">best bid → 500</text><text x="320" y="218" text-anchor="middle" font-size="11" fill="var(--muted)">99.97</text><rect x="192" y="208" width="88" height="14" rx="3" fill="var(--green-soft)" stroke="var(--green)" stroke-width="0.8"/><text x="185" y="219" text-anchor="end" font-size="10" fill="var(--muted)">800</text><text x="320" y="243" text-anchor="middle" font-size="11" fill="var(--muted)">99.95</text><rect x="148" y="233" width="132" height="14" rx="3" fill="var(--green-soft)" stroke="var(--green)" stroke-width="0.8"/><text x="141" y="244" text-anchor="end" font-size="10" fill="var(--muted)">1,200</text><text x="320" y="268" text-anchor="middle" font-size="11" fill="var(--muted)">99.92</text><rect x="60" y="258" width="220" height="14" rx="3" fill="var(--green-soft)" stroke="var(--green)" stroke-width="0.8"/><text x="53" y="269" text-anchor="end" font-size="10" fill="var(--muted)">2,000</text><rect x="20" y="64" width="215" height="76" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="30" y="82" font-size="10.5" font-weight="700" fill="var(--ink)">Market buy, 1,000 shares</text><text x="30" y="98" font-size="10" fill="var(--ink)">300 × 100.02 + 600 × 100.03</text><text x="30" y="112" font-size="10" fill="var(--ink)">+ 100 × 100.05 = $100,029</text><text x="30" y="128" font-size="10" fill="var(--red)">Avg 100.029: 2.9 bp above mid</text></svg><figcaption>The spread is the first layer of cost. The bigger the order and the thinner the book, the further it has to "walk" — price impact, or slippage. After the trade, the best ask has moved from 100.02 to 100.05.</figcaption></figure>

Work through the numbers in the figure. A **market buy for 1,000 shares** eats, in order, the 300 shares at 100.02, the 600 at 100.03 and 100 of the shares at 100.05. It costs **$100,029**, an average of **$100.029**. At the midpoint of 100.00 the theoretical cost would have been $100,000; the extra $29 is your **transaction cost** — partly half the spread (2 cents a share) and partly the **price impact** of walking deeper into the book.

$$
\\text{Execution cost (bp)} = \\frac{\\text{average fill} - \\text{midpoint}}{\\text{midpoint}} \\times 10{,}000
= \\frac{100.029 - 100.00}{100} \\times 10{,}000 \\approx 2.9\\ \\text{bp}
$$

Three conclusions:

- **For a small order, the cost is about half the spread.** Buy 10 shares and you only touch the best ask: roughly 2 bp.
- **For a large order, the cost is set by depth** — how much is resting at each price. If 5,000 shares sat at 100.02, the same 1,000-share order would cost only 2 bp; if the book is thin, it might have to reach past 100.20.
- **The market "price" is really a range.** A liquid market is one where the spread is **tight**, the book is **deep**, and it **refills quickly** after being hit — tightness, depth and resilience.

Stage 7.5's liquidation cascade is the extreme version of the second point. Forced liquidations are **price-blind market orders**; when the book is thin, one wave of them punches through several levels and sets off the next wave.

### ② Market makers: how liquidity gets manufactured

Limit orders sit and wait for someone to trade against them — so where do all those resting orders come from? Some come from ordinary investors, but most come from **market makers**, which post a bid and an ask at the same time, say 99.98 to buy and 100.02 to sell, and take whoever shows up.

A market maker's ledger is simple. If a seller hits its bid for 100 shares at 99.98 and a few seconds later a buyer lifts its offer for 100 shares at 100.02, it has made **\\(4\\ \\text{cents} \\times 100 = \\$4\\)**. Repeat that millions of times a day and you have a big business. But the spread isn't free money. Economists split it into three costs:

- **Order-processing costs**: systems, exchange and clearing fees, staff.
- **Inventory risk**: it just bought 100 shares and hasn't sold them yet, and the price could drop in the meantime.
- **Adverse selection**: the crucial one. If the people trading with it **know more than it does** — say, that good news will be announced in an hour — then every share it sells goes to an informed buyer, the price rises afterwards, and it loses. The classic 1985 models of Glosten–Milgrom and of Kyle showed that **a large part of the spread is an insurance premium the market maker charges for the chance of meeting an informed trader.**

That framework immediately explains three things:

- **Why spreads widen in a panic.** More uncertainty means more inventory risk and more adverse-selection risk, so market makers widen their quotes, shrink their size, or cancel entirely. In the "flash crash" of May 6, 2010, U.S. stocks plunged and rebounded within minutes, and some shares printed at absurd prices of a penny or $100,000 — the market makers had stepped back and the books were empty. In March 2020 even U.S. Treasuries, the deepest market on earth, saw bid–ask spreads blow out several times over (Stage 7.4 covered the basis-trade unwind).
- **Why some stocks trade with a one-cent spread and others with a one-dollar spread.** The more active, transparent and calm the market, the tighter the spread. Mega-cap stocks trade every instant; small caps and obscure bonds may go days without a trade.
- **Why market makers love retail orders.** Retail orders are usually "uninformed" — people buy and sell to save, rebalance or follow a mood, not because they hold inside information. For a market maker, filling retail flow carries little adverse-selection risk, so it will offer better prices and even **pay to receive those orders** — payment for order flow, the next piece.

Most market makers today are **high-frequency trading** firms that update quotes in microseconds and hedge their inventory across dozens of venues at once. The New York Stock Exchange still has **designated market makers (DMMs)** responsible for the open and close in particular stocks.

**Liquidity is a fair-weather friend.** In normal times, competition among market makers squeezes spreads to almost nothing; but they have no obligation to catch a falling knife. That's one of the keys to understanding crises: **what you think of as "I can always sell" really means "someone has usually been willing to buy."**

### ③ Where your order goes: brokers, routing and payment for order flow

The **broker** is your gateway to the market. It opens your account, holds your cash and securities, lends you money for margin trading, and sends your orders out to be executed. A broker acts as an **agent**, finding you a counterparty; a market maker acts as a **dealer**, becoming your counterparty itself. The same firm can play both roles — which is exactly where conflicts of interest come from.

The U.S. stock market is **fragmented**: more than a dozen registered exchanges plus dozens of alternative trading systems (ATSs, including "dark pools") and wholesale market makers. Today close to half of U.S. equity volume trades away from the exchanges. To stop you from being filled at 100.05 on one venue while 100.02 was available on another, **Regulation NMS** (2005) stitches the best quotes of every exchange into the **national best bid and offer (NBBO)** and bars trades at prices worse than the NBBO. Brokers also owe their clients a duty of **best execution**.

Here's how **payment for order flow** works:

- A retail broker sends batches of its clients' market orders to wholesale market makers (the two largest in the U.S. are Citadel Securities and Virtu).
- The wholesaler fills them at the NBBO or **slightly better** — the difference is called **price improvement**.
- The wholesaler pays a slice of the remaining spread back to the broker — that's PFOF.

With numbers: the NBBO is 99.98 / 100.02 and you send a market order to buy 100 shares. The wholesaler sells to you at **100.015** (half a cent of improvement per share, so you save $0.50). It hedges its inventory elsewhere near the midpoint, making roughly 1.5 cents a share, and pays 0.2 cents a share ($0.20) of that to your broker. **A three-way split: you get price improvement, the broker gets payment for order flow, the market maker keeps the rest of the spread.** These numbers are illustrative; real figures vary by stock and market conditions, and U.S. brokers must publish where they route orders and what they're paid under the SEC's Rule 606.

Both sides of the debate have a point:

- **Supporters**: major U.S. brokers dropped stock commissions from October 2019 onward, and retail fills are often better than the exchange quotes — there's data behind that.
- **Critics**: brokers have an incentive to sell orders to whichever market maker pays most, not to wherever the client gets the best price; retail orders never get to compete directly with other investors on a public venue; and "free trading" encourages overtrading. The UK effectively banned PFOF back in 2012 and the EU has legislated to phase it out. The U.S. SEC proposed in 2022 to force retail orders into open auctions, but the reform never took effect.

The bottom line: **"zero commission" isn't zero cost. The cost lives in the spread; it's just carved up more finely.**

The GameStop frenzy of January 2021 put a spotlight on this pipe. Retail traders piled in, and on January 28 Robinhood abruptly stopped its clients from buying the stock. The reason wasn't a market maker; it was the **clearing house** covered in the next lesson. In the days before settlement, the clearing house demands margin from brokers, and that demand soared with volatility. According to the SEC's post-mortem report, the clearing-margin call Robinhood received early that morning ran to several billion dollars, far more than it had on deposit. **You see a "Buy" button; behind it is a whole system of collateral and credit** (Stage 8.2).

### ④ The exchange's rules: opens, closes, circuit breakers and the "best price"

An exchange isn't just a matching engine; it's a **rulebook**:

- **Trading hours**: the regular session on the NYSE and Nasdaq runs 9:30 a.m.–4:00 p.m. Eastern, with pre-market and after-hours sessions where liquidity is thin and spreads wide. Several exchanges are pushing toward longer sessions, aiming for close to round-the-clock trading on weekdays.
- **Opening and closing auctions**: at the open and the close, the exchange gathers all orders and matches them at a single price that maximizes volume. The **closing price** matters most: index funds, ETFs and many other funds compute their value and rebalance at the close, so the closing auction is often one of the busiest moments of the day (Stage 5.6 covered how big passive money has become). On the day a stock enters or leaves an index, enormous buying or selling is crammed into that one moment.
- **Circuit breakers**: after "Black Monday" on October 19, 1987, when the Dow fell 22.6% in a single day, the U.S. introduced circuit breakers. Today's market-wide breakers key off the S&P 500's fall from the previous close: a drop of **7%** (Level 1) or **13%** (Level 2) halts trading for 15 minutes, and **20%** (Level 3) ends trading for the day. In March 2020 the Level 1 breaker tripped four times in less than two weeks. Individual stocks also have **limit up–limit down (LULD)** bands that pause trading for a few minutes when prices move too far too fast.
- **Tick size**: most U.S. stocks are quoted in one-cent increments, which puts a floor under how tight a spread can be.

The logic of a circuit breaker is to **give market makers and investors a breather so the book can grow back**, instead of printing absurd prices in a liquidity vacuum. The criticism is that as prices near the trigger, people may rush to sell first, speeding up the fall — the "magnet effect."

Compare crypto: bitcoin exchanges have **no unified circuit breaker and no close**. On October 10–11, 2025, after a tariff threat, crypto markets suffered the largest liquidation event in their history — about **$19 billion** of leveraged positions forcibly closed in a day — with no mechanism to make the market pause.

### ⑤ Crypto's 24/7 markets and on-chain order books

Crypto markets have traded **24/7** from day one: no open, no close, no weekends, no holidays. Trading happens on three kinds of venue:

- **Centralized exchanges** (CEXs such as Coinbase and Binance) are structurally an order book, much like a stock exchange. But a CEX is usually **exchange, broker, custodian and clearing house all at once** — your coins sit with it, and a trade is just an entry in its internal ledger. That makes it fast and cheap; it also means you have to trust it completely. The collapse of FTX in November 2022 was what happens when customer assets are misused inside that four-in-one structure (Stage 10.5). The stock world **separates** those four roles and regulates each one precisely to prevent that.
- **On-chain order books** (such as Hyperliquid) run the order book itself on a blockchain, so orders, fills, margin and liquidations are all publicly visible. Its perpetual-futures volume grew quickly in 2025–2026; as of September 2026 its open interest hit a record of about $14.3 billion, and from August 2026 Coinbase began routing some orders to it — **a centralized broker sending orders to be matched on-chain**, exactly the "broker routing" of piece ③.
- **Automated market makers (AMMs)** drop the order book altogether: a pool of funds and a formula set the price, and anyone can deposit into the pool and become the "market maker" (Stage 13.3).

When a 24/7 market lives side by side with traditional ones, something interesting happens: **on weekends, bitcoin trades, but spot bitcoin ETFs and the shares of digital asset treasury companies like Strategy do not.** Weekend news shows up first in the bitcoin price; on Monday morning the ETFs and MSTR often gap open to catch up. For spot bitcoin ETFs (Stage 12.5), market makers re-quote at the open based on where bitcoin went over the weekend; for treasury companies, an mNAV computed at Friday's close is stale by Sunday.

That's the question Stage 14.3 picks up: if stocks are tokenized and trade around the clock, do these mismatches disappear? The answer depends on whether market makers are willing to carry inventory risk at 3 a.m. on a Sunday — **trading hours can be written into code, but liquidity only exists when someone is willing to stand on the other side.**
`,

  demo: "exchanges-brokers",

  analogy: `
Think of the market as the **currency-exchange booth at an airport**.

The board says: "We buy dollars at 1.10, we sell dollars at 1.30." If you need dollars now, you pay 1.30; when you get home and want to dump your leftover dollars, you get 1.10. The 0.20 in between is the **spread** — the booth's fee for being there whenever you show up. The booth is a **market maker**: it doesn't care whether the currency rises or falls tomorrow; it just wants to buy low, sell high and turn over its stock quickly.

Downtown, where banks compete on every corner, the spread might be 0.05. At a remote airport at midnight with a single booth, it might be 0.50 — **less competition and more uncertainty mean a wider spread.** If a rumor says the exchange rate is about to lurch, the booth puts up a "Closed" sign: that's a market maker **pulling its quotes** in a panic.

Want to change $100,000 at once? The booth only has $20,000 in the drawer; the rest has to be sourced elsewhere at a worse rate. That's **depth** and **price impact**.

Now imagine you use a "free rate-comparison app" that sends you to a particular booth. That booth gives you a slightly better rate than its posted board, and it pays the app a small referral fee for every customer. That's **payment for order flow**: you really did get a better price, but which booth the app recommends isn't decided purely by what's best for you.

Finally, the booth hands you a receipt, and the actual banknotes are delivered to your home tomorrow. That's **settlement**, the subject of Stage 8.2. And a 24/7 crypto market is a fully automated exchange machine that never closes: you can use it at midnight, but at 3 a.m. there's less cash in the machine, the rate is worse, and if it jams there's no manager to call.
`,

  misconceptions: [
    "**\"Zero commission means free trading.\"** — The cost moved from commissions to the spread and execution quality: you pay the ask rather than the midpoint, and the broker collects payment for order flow from the market maker. For small retail orders the all-in cost may genuinely be low, but it isn't zero, and it lives where you can't see it.",
    "**\"The price on my screen is the price I'll get.\"** — The \"last price\" is often the last trade or the midpoint. What you can buy at right now is the ask, and sell at is the bid; a large order must also walk deeper into the book and pay price impact. The less liquid or the more panicked the market, the bigger the gap.",
    "**\"The market maker is betting against me, so my gain is its loss.\"** — Market makers don't take directional bets; they earn the spread and hedge their inventory fast. What they fear is informed traders, which is why they like retail flow. The real issue isn't that they bet against you; it's that they're under no obligation to stay in a crisis.",
    "**\"In a liquid market you can always sell at a fair price.\"** — Liquidity is the result of market makers and investors choosing to carry risk, and it can vanish in an instant under stress: the 2010 flash crash, the March 2020 Treasury market and the October 2025 crypto liquidations are all examples. \"I can sell in normal times\" isn't \"I can sell in a crisis.\"",
    "**\"Once the app says 'Filled,' the shares are mine.\"** — A fill is only an agreement. Cash and securities actually change hands on settlement day (T+1 for U.S. stocks), and what's recorded in your name is usually an entry in your broker's books, not a share certificate with your name on it (Stage 8.2).",
  ],

  quiz: [
    {
      q: "The best bid is 99.98 and the best ask is 100.02. You send a market order to buy 100 shares. Roughly what price do you pay?",
      options: [
        "100.00, the midpoint",
        "100.02, the best ask",
        "99.98, the best bid",
        "It depends on the last trade price",
      ],
      answer: 1,
      explain: "**A market buy trades at the best ask.** 100 shares is smaller than the size resting at the best ask, so you pay 100.02. The 2 cents above the midpoint is half the spread — the price of immediacy.",
    },
    {
      q: "The asks show 300 shares at 100.02, 600 at 100.03 and 1,000 at 100.05. What is the average price of a 1,000-share market buy?",
      options: [
        "100.02",
        "100.03",
        "100.05",
        "About 100.029",
      ],
      answer: 3,
      explain: "\\(300 \\times 100.02 + 600 \\times 100.03 + 100 \\times 100.05 = \\$100{,}029\\),an average of **100.029**. A large order has to walk through several levels — that's price impact.",
    },
    {
      q: "According to classic market-microstructure theory, which component of the spread matters most and best explains why spreads widen in a panic?",
      options: [
        "Adverse selection: the market maker's fear that its counterparty knows more than it does",
        "The exchange's listing fees",
        "Government stamp duty",
        "Broker commissions",
      ],
      answer: 0,
      explain: "**Adverse selection** is the insurance premium market makers charge for the chance of meeting an informed trader. More uncertainty makes that insurance pricier and the spread wider — and it's why market makers pay for retail orders, which are usually uninformed.",
    },
    {
      q: "Which statement about payment for order flow (PFOF) is most accurate?",
      options: [
        "It is a hidden commission the broker charges its clients",
        "It is banned in every major market",
        "The market maker pays part of the spread to the broker and often gives the client a little price improvement; the controversy is the conflict of interest",
        "It means retail orders must be auctioned publicly on an exchange",
      ],
      answer: 2,
      explain: "PFOF is a **three-way split**: the client gets price improvement, the broker gets paid, the market maker keeps the rest of the spread. The UK and EU have restricted or banned it; the U.S. still allows it. The fight is over whether the broker's routing incentives line up with the client's interests.",
    },
    {
      q: "Bitcoin rallies 8% over a weekend. When U.S. markets open on Monday, what is a spot bitcoin ETF most likely to do?",
      options: [
        "Stay at Friday's close, because ETFs only reflect prices on trading days",
        "Gap up at the open to roughly reflect the weekend move",
        "Halt until the bitcoin price stabilizes",
        "Fall, because the weekend gain has to be \"given back\"",
      ],
      answer: 1,
      explain: "Bitcoin trades 24/7; the ETF only trades during U.S. market hours. At Monday's open, market makers quote off the latest bitcoin price, so the ETF **gaps** to catch up — the classic mismatch when a 24/7 market coexists with one that closes.",
    },
  ],

  further: [
    { label: "SEC staff report (October 2021): equity and options market structure conditions in early 2021 (GameStop)", url: "https://www.sec.gov/files/staff-report-equity-options-market-struction-conditions-early-2021.pdf" },
    { label: "SEC: Regulation NMS final rule (2005)", url: "https://www.sec.gov/rules/final/34-51808.pdf" },
    { label: "FINRA Rule 5310: Best Execution and Interpositioning", url: "https://www.finra.org/rules-guidance/rulebooks/finra-rules/5310" },
    { label: "Investor.gov: stock market circuit breakers explained", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/stock-market-circuit-breakers" },
  ],
};
