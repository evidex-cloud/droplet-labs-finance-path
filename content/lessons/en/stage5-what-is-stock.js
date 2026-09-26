export default {
  id: "what-is-stock",
  stage: 5,
  order: 1,
  title: "What a Stock Is: Ownership, Residual Claims & Votes",
  difficulty: "core",
  prereqs: ["what-is-bond"],

  oneLiner:
    "Buy a bond and you are the company's **lender**: you collect a fixed coupon, get your principal back at maturity, and nothing else is your business. Buy a share and you are **one of the owners**: you stand behind every creditor and **take everything that is left once they are all paid** — which might be zero and might be ten times your money. That **residual claim**, plus **limited liability** and **the vote**, is the whole definition of a stock. A company that puts bitcoin on its balance sheet (a DAT) has common stock that is exactly the same claim on a different asset.",

  intuition: `
Imagine you and two friends open a coffee shop on the corner — call it **Morning Coffee**. Getting started costs $10 million (fit-out, espresso machines, leases on a few locations). The three of you put in $5 million of your own money and borrow the other $5 million from a bank at 8% a year.

A year later it is time to divide the money. The order goes like this: first staff wages, rent and the bean supplier; then the bank's $400,000 of interest; then the tax authority. **Whatever is left after everyone else has been paid belongs entirely to the three of you.** A great year leaves $3 million and you are delighted. A bad year leaves nothing and you worked twelve months for free. A terrible year leaves the company owing more than it owns — and the bank can take everything the company has, **but it cannot come to your house and make you sell it to cover the gap.**

Those are the three basic facts of a stock, and each one is worth remembering:

- **Residual claim**: shareholders stand last in line and take **all** of what remains. There is no ceiling on the upside; the floor is zero.
- **Limited liability**: the most you can lose is what you put in. You never end up owing money. This is what let joint-stock companies, from the Dutch East India Company of 1602 onward, gather capital from thousands of strangers (Stage 0.3).
- **The vote**: owners decide — they elect the board, approve mergers, decide whether new shares can be issued. Lenders have no such power; they have a contract.

Compare the bond from Stage 4.1: you lend a company $1,000 at a 5% coupon for 10 years, and **the best possible outcome** is $50 a year and your $1,000 back at the end, not a cent more. Shareholders get the mirror image: **the best outcome has no cap, and the worst outcome is zero.** Lenders and owners are taking two slices of the same cake — the lender's slice is cut first and has a fixed size; the owner's slice is whatever is left, and its shape changes with the business.

That places this lesson squarely on **Idea ② — balance sheets & claims.** The left side of a company's balance sheet lists what it owns (assets); the right side lists **who has a claim on those assets** — lenders on top, shareholders at the very bottom. Stage 6.1 fills in the full floor plan (secured debt, senior debt, subordinated debt, preferred stock, common stock), and Stage 15.1 will show you that a bitcoin treasury company (DAT) simply swaps the assets on the left for bitcoin and then engineers several carefully designed layers of claims on the right. What you learn here — “common stock is the bottom-layer residual claim” — will not need a single word changed when you get there.

One more detail runs through all of Stage 5: **a stock is sliced into many small pieces.** If Morning Coffee has issued 1 million shares, the one share in your hand is one-millionth of that residual claim. Whenever we talk about “value” from now on, always ask: **the value of the whole company, or the value of one share?** Stage 5.5 is devoted to why “per share” is the scoreboard that actually matters.

**In this lesson we break it into five parts:**

- **① The residual claim: paid last, you take everything that's left**
- **② Limited liability: the most you can lose is what you put in**
- **③ Votes and corporate governance: who's in charge**
- **④ Dividends, share counts and “per share”: slicing the company up**
- **⑤ A stock is a call option: from coffee shop to Orange Corp**
`,

  mechanics: `
### ① The residual claim: paid last, you take everything that's left

Here is Morning Coffee's balance sheet (in thousands of dollars):

<table>
<tr><th>Assets (what it owns)</th><th>Amount</th><th>Claims (who has rights to it)</th><th>Amount</th></tr>
<tr><td>Cash</td><td>1,000</td><td>Bank loan (8%)</td><td>5,000</td></tr>
<tr><td>Inventory & receivables</td><td>1,000</td><td><b>Shareholders' equity (residual)</b></td><td><b>5,000</b></td></tr>
<tr><td>Equipment, fit-out, stores</td><td>8,000</td><td></td><td></td></tr>
<tr><td><b>Total</b></td><td><b>10,000</b></td><td><b>Total</b></td><td><b>10,000</b></td></tr>
</table>

Shareholders' equity on the right is not a pile of money sitting somewhere. It is **a difference you calculate**: assets − liabilities = equity. That is literally what “residual” means.

Now suppose that a few years from now the whole business is sold (or wound up). Look at what each group receives at different sale prices:

- Sold for $15M: the bank gets its $5M back; shareholders get **$10M** — assets rose 50%, the owners' money doubled (+100%).
- Sold for $10M: bank $5M, shareholders $5M — breakeven.
- Sold for $7.5M: bank $5M, shareholders **$2.5M** — assets fell 25%, the owners lost 50%.
- Sold for $4M: the bank recovers only $4M (an 80% recovery rate); shareholders get **zero**.

Two patterns jump out. First, **the owners' percentage moves are twice the asset moves** — because half the money was borrowed (assets/equity = 10/5 = 2). That is leverage, and it is the prototype of the “amplification” metric in Stage 16.4. Second, **the owners' loss stops at zero**, and from there the bank starts taking the hit. Put both on one chart and you have the most important picture in this lesson:

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">One company, two claims: what lenders and owners receive</text><line x1="70" y1="230" x2="610" y2="230" stroke="var(--line)" stroke-width="1.5"/><line x1="70" y1="36" x2="70" y2="230" stroke="var(--line)" stroke-width="1.5"/><text x="340" y="262" text-anchor="middle" font-size="11" fill="var(--muted)">Final value of the company's assets ($M)</text><text x="24" y="135" text-anchor="middle" font-size="11" fill="var(--muted)" transform="rotate(-90 24 135)">Amount received ($M)</text><text x="70" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">0</text><text x="246.7" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">5</text><text x="423.3" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">10</text><text x="600" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">15</text><line x1="246.7" y1="36" x2="246.7" y2="230" stroke="var(--line)" stroke-dasharray="4 4"/><text x="250" y="48" font-size="10" fill="var(--muted)">Debt face value $5M</text><polyline points="70,230 246.7,135 600,135" fill="none" stroke="var(--blue)" stroke-width="3"/><polyline points="70,230 246.7,230 600,40" fill="none" stroke="var(--orange)" stroke-width="3"/><circle cx="423.3" cy="135" r="5" fill="var(--ink)"/><text x="432" y="128" font-size="10" fill="var(--ink)">Today: assets 10 → debt 5 / equity 5</text><circle cx="600" cy="40" r="4" fill="var(--orange)"/><text x="596" y="58" text-anchor="end" font-size="10" fill="var(--orange-ink)">Assets +50% → equity +100%</text><circle cx="211.3" cy="154" r="4" fill="var(--blue)"/><text x="206" y="172" text-anchor="end" font-size="10" fill="var(--blue)">Assets 4: lender recovers 80%, equity 0</text><rect x="420" y="190" width="12" height="4" fill="var(--blue)"/><text x="438" y="195" font-size="11" fill="var(--ink)">Lender: capped at 5</text><rect x="420" y="208" width="12" height="4" fill="var(--orange)"/><text x="438" y="213" font-size="11" fill="var(--ink)">Owners: all the rest, floor at 0</text></svg><figcaption>The lender's payoff rises and then goes flat (at most $5M back); the owners' payoff is flat and then rises — a hockey stick. Both kinks sit at the $5M face value of the debt.</figcaption></figure>

**The lender's line has a ceiling; the owners' line has a floor.** Add the two lines together and you always get the value of the assets — that is the accounting identity “assets = liabilities + equity” drawn as a payoff chart. All of Stage 6 (the capital stack) just adds more lines to this picture: a preferred share is a line that caps out after the lenders but before common (Stage 6.2); a convertible bond is a line that is flat at first and then, past the conversion price, rises alongside the owners (Stage 6.4).

### ② Limited liability: the most you can lose is what you put in

“The floor is zero” sounds obvious. It is actually a remarkable legal invention. A medieval partner was liable for the business's debts with **everything they personally owned**: if the partnership failed, creditors could take your house. Under that rule you only went into business with people you knew intimately and could watch every day — capital could not be pooled at scale.

The limited-liability company cuts off responsibility at the capital you invested. In 1602 the Dutch East India Company (VOC) sold transferable shares to the public, and by the mid-nineteenth century Britain and other countries made limited liability a standard option any ordinary company could register for. The consequences were enormous:

- **Strangers can invest.** You do not need to know the board or monitor what it does every day, because you already know the worst case: you lose your stake.
- **Shares can trade freely.** Once each share's risk is capped, shares can change hands anonymously on an exchange — and you have a stock market (Stage 8.1).
- **Risk is shifted onto lenders.** The other face of limited liability is that creditors absorb the losses in the zone where assets fall below debt. That is why lenders charge interest, write covenants and care about credit ratings (Stage 4.6).

One implication is easy to miss: **limited liability makes shareholders fond of risk.** Look at the chart again. When asset value is hovering near $5M, suppose management gambles — say, spends all the cash opening ten new stores at once. If the bet wins, owners keep the whole upside; if it loses, most of the damage lands on the bank. That is why loan agreements are full of restrictive covenants, and it is what the “absolute priority” rule in bankruptcy (Stage 6.6) exists to protect.

### ③ Votes and corporate governance: who's in charge

Lenders have a contract; shareholders have a ballot. The standard setup for common stock is **one share, one vote**, used to:

- **Elect the board of directors.** The board hires and fires the CEO and decides pay, dividends and major strategy.
- **Approve major actions**: mergers, selling the company, amending the charter, increasing the number of **authorized shares** (without shareholder approval a company cannot issue new stock without limit — a point that matters a lot when we get to dilution in Stage 5.5).
- **Vote by proxy.** Most shareholders never attend the annual meeting; they hand their vote to someone in advance. That has turned the giant index funds into the single largest “voters” at many companies (Stage 5.6).

But “owners” and “stewards” are two different groups. Shareholders own the company; managers run it, and their interests do not always line up — managers may prefer empire building, bigger paychecks and less risk (keeping their jobs). This is the **agency problem**. Governance tools — independent directors, equity-based pay, the threat of takeover, shareholder lawsuits — all exist to soften it.

One arrangement changes “one share, one vote” outright: the **dual-class structure.** Founders hold Class B shares carrying, say, 10 votes each; the public holds Class A shares with 1 vote each, so the founders keep majority (or very large) voting power with a minority economic stake. Google and Meta are the famous examples; Strategy, the largest DAT, also has a founder-held class of high-vote shares. Supporters say this lets a founder pursue a long-term strategy without being hostage to the share price; critics say it weakens accountability, because when things go wrong the owners cannot replace the people in charge. Stage 18.4 treats this as a structural DAT risk in its own right — **before you buy common stock, find out what your vote is actually worth.**

### ④ Dividends, share counts and “per share”: slicing the company up

When a company makes money it has three things it can do with it: keep it and reinvest, pay a **dividend**, or **buy back** its own stock (Stage 5.5).

A dividend is a board decision, not a promise. Preferred stock carries a fixed dividend rate (Stage 6.2); common stock does not — the company can raise it, cut it or stop it without being in default. On the ex-dividend date the share price should fall by roughly the amount of the dividend: money has moved from the company's pocket to yours, and **your total wealth is unchanged.** That is why “high dividend = high return” is such a common illusion.

Next, share counts. Several definitions get mixed up all the time:

<table>
<tr><th>Measure</th><th>Meaning</th><th>Morning Coffee example</th></tr>
<tr><td>Authorized</td><td>The maximum the charter allows the company to issue</td><td>5 million</td></tr>
<tr><td>Issued / outstanding</td><td>Shares in investors' hands (excluding treasury shares the company has bought back)</td><td>1 million</td></tr>
<tr><td>Fully diluted</td><td>Plus all options, restricted stock and convertibles as if exercised or converted</td><td>about 1.1 million</td></tr>
<tr><td>Free float</td><td>Minus shares locked up by founders, strategic holders and insiders</td><td>about 0.7 million</td></tr>
</table>

With a share count you can turn company-level numbers into per-share numbers:

$$
Market capitalization = share price × shares outstanding
Earnings per share (EPS) = net income ÷ shares
Book value per share = shareholders' equity ÷ shares
$$

Morning Coffee: $5M of equity and 1M shares → book value of $5 per share. If it earns $1.2M of net income this year (Stage 5.2 builds that number line by line from the income statement), EPS = $1.20. If the shares trade at $12, market capitalization is $12M — **more than twice the $5M on the books.** That gap is not a mistake; it is the market pricing **future** profits. Book value records how much money went in over the past; the share price reflects how much is expected to come out in the future. Stage 5.3 shows how to discount that future back to today.

On a fully diluted count, book value per share becomes 5/1.1 ≈ $4.55 and EPS ≈ $1.09 — **change the denominator and every per-share number changes.** The first question an analyst asks is always “which share count are you using?” By Stage 16.1 (BTC per share) that question becomes a matter of life and death.

### ⑤ A stock is a call option: from coffee shop to Orange Corp

Look once more at the payoff chart in part ①. The owners' flat-then-rising line has exactly the shape of a **call option**: the underlying is the company's assets and the strike price is the face value of the debt. In 1974 Robert Merton used precisely this view to apply the Black–Scholes option formula to the pricing of corporate debt (Stage 7.2 covers option payoff diagrams). The view yields three expert-level implications:

- **Shareholders like volatility.** An option's value rises with volatility, so the more volatile the assets, the more the residual claim is worth as an option — even if the average outcome is unchanged.
- **Lenders dislike volatility.** A lender's payoff equals “a risk-free bond minus a put option”; the more volatile the assets, the more expensive the put they have effectively sold.
- **The higher the leverage, the more a stock behaves like an option.** The closer the debt's face value is to the asset value, the further “out of the money” the common is, and the more violently it moves.

Now swap the coffee shop for **Orange Corp**, the toy company that runs through Stages 15–18. It holds 10,000 BTC; at $100,000 per bitcoin that is $1 billion of BTC NAV. Sitting above the common are $150M of convertible notes, $100M of Series F preferred and $50M of Series D preferred — $300M of senior claims in all. Common shareholders own the residual: **$1B − $0.3B = $0.7B.** If bitcoin rises 10%, NAV rises by $100M and all of it goes to common — $0.7B becomes $0.8B, a 14.3% gain, an amplification of about **1.43x**. If bitcoin falls 70%, NAV is $300M, exactly equal to the senior claims, and the common's bitcoin residual is gone.

**Same payoff chart, same logic; the asset changed from espresso machines to bitcoin.** So when Stage 15.1 says that “a DAT's common stock behaves like levered bitcoin,” you already know why.

A last new-era reminder: so-called “tokenized stocks” (Stage 14.3) trade on-chain around the clock, but the token holder **does not necessarily get a vote, or even a direct residual claim** — it may be just a claim on a custodian. **A stock is a bundle of legal rights, not a price chart.** To judge whether a “stock token” is really a stock, check how many of the three it delivers: the residual claim, limited liability, and the vote.
`,

  demo: "what-is-stock",

  analogy: `
Think of a company as a **water tank** with several taps set at different heights near the bottom.

The highest tap belongs to the lenders. As long as the water level is above it, they fill their bucket — principal plus interest — and do not want a drop more. The shareholders' tap is at the **very bottom of the tank**, with one odd rule: it only opens once every tap above it has filled its bucket, and what comes out is **everything that is left.**

In the rainy season the tank fills to the brim; the lenders still take one bucket each, while the owners at the bottom haul away a whole barrel. In a drought the level keeps falling, and the owners' tap runs dry first; only after that do the lenders start coming up short. **Limited liability** means that when the tank is empty, it is empty — nobody makes the owners carry water from their own wells to refill it. **The vote** means the owners of the bottom tap decide where the tank stands and whether to add more taps above them.

Orange Corp's tank is filled with bitcoin, with three taps above the common: the convertibles, the Series F preferred and the Series D preferred. Bitcoin's price is the weather. In the rainy season the common rises faster than the water level; in a drought it is the first to run dry.
`,

  misconceptions: [
    "**“A stock is just a ticker symbol that moves.”** — A stock is first of all a set of legal rights: a claim on the company's residual value, limited liability, and a vote. The price is just the market's quote for what that bundle is worth today. A token or derivative without those rights is a different thing, however similar its chart looks.",
    "**“Book equity is what the stock should be worth.”** — Book value records money put in and retained in the past; the share price reflects the present value of future cash flows. Morning Coffee at $5 of book per share and a $12 share price is no contradiction. The reverse is common too: trading below book usually means the market expects assets to lose value or earn less than their cost of capital.",
    "**“Shareholders are owed dividends.”** — Common dividends are not an obligation. The board can cut or stop them without default — the fundamental difference from a bond coupon or a cumulative preferred dividend (Stage 6.3).",
    "**“Limited liability means stocks are low risk.”** — It only guarantees you will never owe more than you invested; it does not stop you losing that. Common stock stands last in line and is usually the first thing wiped out when a company gets into trouble. A floor at −100% is a big loss.",
    "**“One share, one vote, so the share price reflects who controls the company.”** — With dual-class shares, founders can hold majority or very large voting power on a minority economic stake. Once economic ownership and control come apart, a small holder's vote may count for little — and that is a risk that has to be priced.",
  ],

  quiz: [
    {
      q: "Morning Coffee has $10M of assets and $5M of debt. If the assets become worth $12M (+20%), how much does shareholders' equity change?",
      options: [
        "+20%, in line with the assets",
        "+10%, because interest must be paid first",
        "Nothing — the gain goes to the bank",
        "+40%, because assets/equity = 2x leverage",
      ],
      answer: 3,
      explain: "Equity goes from $5M to $12M − $5M = $7M, **+40%**. The lender's claim is fixed at $5M, so every dollar of asset gain goes to the residual owners, amplifying the move by assets/equity = 2x.",
    },
    {
      q: "What is the most direct meaning of limited liability?",
      options: [
        "Shareholders can lose at most what they invested; creditors cannot pursue their personal assets",
        "The company cannot go bankrupt",
        "Shareholders' dividends are legally guaranteed",
        "The exchange limits how far the share price can fall",
      ],
      answer: 0,
      explain: "Limited liability puts a floor under the owners' loss at their invested capital. Losses in the zone where assets fall below debt are borne by lenders — which is why lenders charge interest and write covenants.",
    },
    {
      q: "Why is the payoff of common stock said to look like a call option?",
      options: [
        "Because shares can be traded on options exchanges",
        "Because shareholders can sell their shares back to the company at any time",
        "Owners receive the larger of (assets − debt) and zero: the underlying is the company's assets, the strike is the face value of debt",
        "Because dividends are paid quarterly like option premiums",
      ],
      answer: 2,
      explain: "Equity payoff = max(assets − debt, 0), the payoff of a call (Merton, 1974). Implication: the more volatile the assets, the more the owners' option is worth and the worse off the lenders are.",
    },
    {
      q: "Orange Corp has $1B of BTC NAV and $300M of convertibles and preferred combined. If bitcoin falls 70%, how much bitcoin value is left for the common?",
      options: [
        "$0.7B × 30% = $210M",
        "Essentially zero: NAV is $300M, just enough to cover the senior claims",
        "$300M, because the preferred converts into common first",
        "Impossible to say without the share price",
      ],
      answer: 1,
      explain: "$1B × 30% = $300M, exactly equal to the $150M + $100M + $50M of senior claims, leaving nothing. That is the residual claim under heavy leverage: in the same drop, common runs dry first (Stage 16.5 measures each layer's cushion with the “BTC Rating”).",
    },
    {
      q: "A company earns $1.2M and has 1M shares outstanding, plus options and convertibles that bring the fully diluted count to 1.1M. Which statement is correct?",
      options: [
        "There is only one correct EPS: $1.20",
        "Diluted EPS is about $1.09, below basic EPS; an analysis must say which share count it uses",
        "Full dilution raises EPS",
        "Options that have not been exercised do not affect any per-share metric",
      ],
      answer: 1,
      explain: "Basic EPS = 1.2/1.0 = $1.20; diluted EPS = 1.2/1.1 ≈ $1.09. **Different denominator, different per-share number** — and Stage 16.1's “BTC per share” is likewise computed on a fully diluted count.",
    },
  ],

  further: [
    { label: "Investor.gov (U.S. SEC): Stocks — the basic rights and risks of owning shares", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks" },
    { label: "Robert C. Merton (1974), On the Pricing of Corporate Debt — equity as an option on the firm's assets", url: "https://doi.org/10.1111/j.1540-6261.1974.tb03058.x" },
    { label: "SEC: Spotlight on Proxy Matters — how shareholder voting and proxies work", url: "https://www.sec.gov/spotlight/proxymatters.shtml" },
    { label: "SEC EDGAR full-text search — any U.S. listed company's charter, annual report and share structure", url: "https://www.sec.gov/edgar/search/" },
  ],
};
