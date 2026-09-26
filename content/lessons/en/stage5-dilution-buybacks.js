export default {
  id: "dilution-buybacks",
  stage: 5,
  order: 5,
  title: "Issuance, Dilution & Buybacks: Per-Share Is What Matters",
  difficulty: "core",
  prereqs: ["what-is-stock", "valuation"],

  oneLiner:
    "When a company issues new shares, your percentage ownership always shrinks — but the value you own **per share** does not necessarily fall. Everything turns on one comparison: **is the new shares' issue price above or below what each existing share is worth?** Above, and existing owners gain at the newcomers' expense — the issue is “accretive.” Below, and it is genuinely dilutive. A buyback runs the same arithmetic in reverse. The single inequality in this lesson is the entire foundation of the digital asset treasury “flywheel” in Stage 16.7.",

  intuition: `
Picture a pizza cut into 8 slices, one of which is yours. Two more people turn up and the pizza is recut into 10 slices — your slice just got smaller. That is most people's intuition about dilution: **more shares, a smaller piece for me, so issuing stock is bad.**

The intuition misses half the story. The newcomers are not freeloaders; each of them brings something to the table. If what they bring is worth more than the slice they take — say each brings a whole extra pizza — then after the recut **the pizza as a whole is bigger, and your slice is actually larger than before.**

Now put it in company terms. A company is worth $100 million in total and has 10 million shares, so each share is worth $10.

- It issues 2 million new shares at **$15**, raising $30 million of cash. The company is now worth $130 million across 12 million shares: \\(\\dfrac{\\$130\\text{M}}{12\\text{M}} \\approx\\) **$10.83 per share.** Existing owners' value per share **rose 8.3%**, even though their ownership fell from 100% to 83%.
- It issues the same 2 million shares but at only **$8**, raising $16 million. The company is worth $116 million: \\(\\dfrac{\\$116\\text{M}}{12\\text{M}} \\approx\\) **$9.67 per share** — existing owners' value per share **fell 3.3%.** That is real dilution.

So judging an issue takes just one comparison: **issue price versus value per share.** Issue above value per share and you are swapping “expensive paper” for real money, which benefits existing owners; issue below and you are selling your own shares on the cheap, which hurts them. **Buybacks** are the mirror image: buy stock back below value per share and the owners who stay behind benefit; buy it back above value per share and you are overpaying with the remaining owners' money.

This lesson rests on **Idea ② — balance sheets & claims.** Issuance and buybacks change how many pieces the “common stock” layer on the right side of the balance sheet is cut into, and how much has been added to (or taken from) the assets on the left. Stage 5.1 taught you to ask “the value of the company, or the value per share?”; this lesson explains why **value per share is the only scoreboard that matters to an owner.**

It is also one of the most important building blocks in the whole course. The core move of the digital asset treasury companies (DATs) in Stages 15–18 is to **issue new shares at a price above the bitcoin value behind each share, then turn all of the proceeds into bitcoin.** Take the standard example, Orange Corp: each share is backed by $10 of bitcoin and trades at $15 (\\(\\mathrm{mNAV} = \\dfrac{15}{10} = 1.5\\)). Issue 10 million shares at $15, buy bitcoin with all of it, and BTC per share rises **4.5%** — that is the “BTC Yield” of Stage 16.3 and the first turn of the Stage 16.7 flywheel. Once the share price falls below the bitcoin value per share (\\(\\mathrm{mNAV} < 1\\)), the very same move becomes dilutive — and Stage 18.3 covers what to do then.

**In this lesson we break it into five parts:**

- **① Per share is the scoreboard: ownership, company value and value per share**
- **② Issuance: the one inequality that decides accretive vs dilutive**
- **③ Buybacks: the same arithmetic run backwards**
- **④ Hidden dilution: stock compensation, options and convertibles**
- **⑤ The foundation of the DAT flywheel: Orange Corp issues at 1.5x mNAV**
`,

  mechanics: `
### ① Per share is the scoreboard: ownership, company value and value per share

“The company got bigger” and “I got richer” are two different statements. A company can grow its total assets tenfold by issuing stock over and over while value per share stands still or falls — management runs a bigger empire and the owners are no better off. Conversely, a company can shrink (buying back stock, paying dividends) while value per share rises steadily.

So owners should watch **per-share** measures: earnings per share (EPS), free cash flow per share, book value per share, intrinsic value per share — and, in the DAT world, BTC per share (Stage 16.1). Percentage ownership on its own does not matter: owning 10% of a $100 million company (\\(\\$100\\text{M} \\times 10\\% = \\$10\\text{M}\\)) is worse than owning 5% of a $300 million company (\\(\\$300\\text{M} \\times 5\\% = \\$15\\text{M}\\)).

**Having your ownership diluted is not the same as having your value diluted.** All the arithmetic below exists to pull those two things apart.

### ② Issuance: the one inequality that decides accretive vs dilutive

Let the company's current value be \\(V\\) and its share count \\(S\\), so value per share is \\(v = \\dfrac{V}{S}\\). It issues \\(N\\) new shares at price \\(P\\), and the \\(N \\times P\\) of cash stays in the company (or is swapped at a fair price for assets of equal value):

$$
\\text{New value per share} = \\frac{V + N \\times P}{S + N}
\\text{Accretive} \\iff P > \\frac{V}{S}
$$

In words: the issue adds value only when the issue price is above value per share. Rewrite it in a handier form. Let \\(m = \\dfrac{P}{v}\\) (the issue price as a multiple of value per share) and \\(n = \\dfrac{N}{S}\\) (new shares as a fraction of the existing count):

$$
\\text{Change in value per share} = \\frac{1 + n \\times m}{1 + n} - 1
$$

The formula tells you three things: **at \\(m = 1\\) the change is zero** (issuing at value per share neither helps nor hurts); it is positive for \\(m > 1\\) and negative for \\(m < 1\\); and the bigger the issue \\(n\\), the bigger the effect. The opening example: \\(n = 20\\%\\), \\(m = 1.5 \\Rightarrow \\dfrac{1 + 0.3}{1.2} - 1 =\\) **+8.3%**; \\(m = 0.8 \\Rightarrow \\dfrac{1.16}{1.2} - 1 =\\) **−3.3%**.

What is “value per share” here? For an ordinary company it is **intrinsic value** — the number a DCF from Stage 5.3 produces, which nobody can know precisely, so whether an issue was accretive or dilutive is often only clear in hindsight. For a company that mainly holds bitcoin it is much simpler: **bitcoin NAV per share**, which can be computed every day. That is why a DAT's issuance logic can be written as an explicit formula, and why mNAV (\\(\\dfrac{\\text{share price}}{\\text{NAV per share}}\\), Stage 16.2) becomes a DAT's number-one metric — **mNAV is the \\(m\\) in the formula above.**

There are real-world costs, too: issuing stock means paying underwriting fees or commissions, and dumping a large block of new shares pushes the price down. The at-the-market (ATM) offerings of Stage 17.1 exist to minimize those costs — selling small amounts into the market day by day instead of one big discounted deal.

### ③ Buybacks: the same arithmetic run backwards

A buyback uses company money to purchase its own shares and retire them. Buying back N shares at price P:

$$
\\text{New value per share} = \\frac{V - N \\times P}{S - N}
\\text{Accretive} \\iff P < \\frac{V}{S}
$$

In words: a buyback adds value only when the buyback price is below value per share. Same company ($100 million of value, 10 million shares, $10 per share): buy back 1 million shares at **$8**, spending $8 million, and \\(\\dfrac{\\$92\\text{M}}{9\\text{M shares}} =\\) **$10.22 (+2.2%)**; buy back 1 million shares at **$15**, spending $15 million, and \\(\\dfrac{\\$85\\text{M}}{9\\text{M shares}} =\\) **$9.44 (−5.6%).**

<figure><svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Issuing / buying back 10% of shares: change in value per share vs price multiple m</text><line x1="90" y1="125" x2="600" y2="125" stroke="var(--ink)" stroke-width="1"/><line x1="90" y1="35" x2="90" y2="230" stroke="var(--line)" stroke-width="1.5"/><line x1="256.7" y1="35" x2="256.7" y2="230" stroke="var(--line)" stroke-dasharray="4 4"/><text x="256.7" y="246" text-anchor="middle" font-size="10" fill="var(--ink)" font-weight="600">m = 1</text><text x="90" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">0.5</text><text x="423.3" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">1.5</text><text x="590" y="246" text-anchor="middle" font-size="10" fill="var(--muted)">2.0</text><text x="345" y="266" text-anchor="middle" font-size="11" fill="var(--muted)">Price multiple m = price ÷ value per share (for a DAT, this is mNAV)</text><text x="84" y="39" text-anchor="end" font-size="10" fill="var(--muted)">+10%</text><text x="84" y="129" text-anchor="end" font-size="10" fill="var(--muted)">0</text><text x="84" y="229" text-anchor="end" font-size="10" fill="var(--muted)">−11%</text><rect x="256.7" y="35" width="343.3" height="90" fill="var(--green-soft)" opacity=".5"/><rect x="90" y="35" width="166.7" height="90" fill="var(--green-soft)" opacity=".5"/><polyline points="90,165.9 590,43.2" fill="none" stroke="var(--orange)" stroke-width="3"/><polyline points="90,75 590,225" fill="none" stroke="var(--blue)" stroke-width="3"/><circle cx="423.3" cy="84.1" r="5" fill="var(--btc)"/><text x="430" y="78" font-size="11" fill="var(--btc)" font-weight="600">Orange Corp issues at mNAV 1.5 → +4.5%</text><circle cx="256.7" cy="125" r="4" fill="var(--ink)"/><text x="512" y="60" font-size="11" fill="var(--orange-ink)" font-weight="600">Issue</text><text x="512" y="210" font-size="11" fill="var(--blue)" font-weight="600">Buyback</text><text x="100" y="60" font-size="10" fill="var(--green)">below value: buybacks accrete</text><text x="400" y="118" font-size="10" fill="var(--green)">above value: issuance accretes</text></svg><figcaption>The two lines cross zero at \\(m = 1\\): above value per share, issuing adds value and buying back destroys it; below, the reverse. One ruler — all that matters is which side of value the price is on.</figcaption></figure>

Buybacks are big business in the United States. After the SEC adopted Rule 10b-18 in 1982, giving open-market repurchases a “safe harbor,” buybacks gradually overtook dividends as the main way companies return cash to shareholders; S&P 500 companies have been buying back on the order of a trillion dollars a year in recent years, and since 2023 the U.S. has levied a 1% excise tax on repurchases. Three common misunderstandings:

- **“Buybacks always raise EPS, so they are always good.”** A buyback shrinks the denominator, so EPS rises mechanically; but if the buyback price is above intrinsic value, value per share actually falls. Warren Buffett has stressed again and again in his Berkshire letters that **repurchases only help the remaining owners when the price is below intrinsic value.**
- **“Buybacks and dividends are the same thing.”** When price exactly equals value, they are equivalent for total wealth; but a buyback hands cash to the sellers and transfers value to those who stay, so when price and value diverge there are winners and losers. The tax treatment differs, too.
- **“Buybacks are there to offset stock compensation.”** Many companies' buybacks merely offset the share-count growth from employee equity pay (next section), with no net reduction in shares. When you look at buybacks, look at the change in the **net** share count.

### ④ Hidden dilution: stock compensation, options and convertibles

Not every new share arrives through an announced offering. Three ways shares slip in quietly:

- **Stock-based compensation (SBC):** restricted stock and options for employees. Many tech companies add 1–3% to their share count every year this way. It is an expense on the income statement but costs no cash, so it is often added back in “adjusted earnings” — **it is a real cost, just paid in shares.**
- **Options and warrants** are counted in diluted shares with the “treasury stock method.” Example: 1 million options with a $10 strike, stock at $15. Exercise brings in \\(1\\text{M} \\times \\$10 = \\$10\\text{M}\\), which could buy back about \\(\\dfrac{\\$10\\text{M}}{\\$15} \\approx 667{,}000\\) shares at market, so the net increase is about \\(1{,}000{,}000 - 667{,}000 =\\) **333,000 shares.** The higher the share price, the more the dilution.
- **Convertible bonds:** when the share price is above the conversion price, holders will choose to convert, and the share count rises (Stage 6.4). Analysts usually add the potential shares to the denominator with the “if-converted” method.

This is where Stage 5.1's “basic versus fully diluted share count” comes from. A rigorous per-share metric has to say exactly which potential shares are in its denominator. In Stage 16.1 you will see that the DAT industry does not agree on whether BTC per share should use basic or assumed fully diluted shares — and the difference can be meaningful.

### ⑤ The foundation of the DAT flywheel: Orange Corp issues at 1.5x mNAV

Now carry the formula from part ② over to Orange Corp (formally introduced in Stage 15.1). It holds **10,000 BTC**; at $100,000 per bitcoin that is $1 billion of BTC NAV. It has 100 million common shares, so **BTC per share is \\(\\dfrac{10{,}000}{100\\text{M}} = 0.0001\\ \\text{BTC} = 10{,}000\\) sats** and NAV per share is $10. The shares trade at $15, so **\\(m = \\mathrm{mNAV} = \\dfrac{15}{10} = 1.5\\).**

<table>
<tr><th>Action</th><th>Raised / spent</th><th>Bitcoin</th><th>Shares</th><th>BTC per share</th><th>Change</th></tr>
<tr><td>Starting point</td><td>—</td><td>10,000</td><td>100M</td><td>10,000 sats</td><td>—</td></tr>
<tr><td>Issue 10M shares at $15 (mNAV 1.5), buy bitcoin with all of it</td><td>+$150M</td><td>11,500</td><td>110M</td><td>about 10,455 sats</td><td><b>+4.5%</b></td></tr>
<tr><td>The same issue if the price is only $8 (mNAV 0.8)</td><td>+$80M</td><td>10,800</td><td>110M</td><td>about 9,818 sats</td><td><b>−1.8%</b></td></tr>
<tr><td>At mNAV 0.8, the reverse: sell 800 BTC to buy back 10M shares</td><td>−$80M</td><td>9,200</td><td>90M</td><td>about 10,222 sats</td><td><b>+2.2%</b></td></tr>
</table>

That table is the entire mathematics of the Stage 16.7 flywheel: **when \\(\\mathrm{mNAV} > 1\\), issuing shares to buy bitcoin raises BTC per share; when \\(\\mathrm{mNAV} < 1\\), issuing to buy bitcoin dilutes, and buying back shares is what raises BTC per share.** The +4.5% has its own name in Stage 16.3: **BTC Yield.** It can be repeated because, as long as the market keeps granting an mNAV above 1, each round of issuance converts “premium” into real bitcoin.

But notice three conditions, which are exactly where critics aim their fire. First, the premium has to persist, and it depends on the market's expectations of future growth (the “multiple on NAV” from Stage 5.3) — it is reflexive (Stage 10.4). Second, continual issuance puts supply pressure on the share price. Third, once mNAV falls below 1, the toolkit has to switch to buybacks, preferred stock or pausing issuance altogether (Stage 18.3). Supporters answer that as long as shares are issued at a premium, every issue **really does** increase the bitcoin behind each existing share — and without any margin-call liquidation risk. **This lesson explains mechanisms only; it is not investment advice about any security.**
`,

  demo: "dilution-buybacks",

  analogy: `
Think of a company as a **vault owned jointly by partners**, with gold divided according to each partner's units.

A newcomer who wants to join has to pay an entry fee. If each unit currently corresponds to 10 grams of gold and the newcomer pays 15 grams per unit, the old partners' gold per unit **goes up**, even though everyone's percentage share gets diluted. If the newcomer gets in for only 8 grams per unit, the old partners are selling their units on the cheap.

A buyback is the reverse: the vault uses its gold to buy out one partner's units. Pay just 8 grams per unit (below the 10 grams each unit is worth) and the remaining partners come out ahead; pay 15 grams and they lose.

Orange Corp's vault holds bitcoin. As long as outsiders are willing to buy in at “15 grams per unit,” management keeps the door open to newcomers — and every time the door opens, the old partners own a little more bitcoin each. But once outsiders will only pay 8 grams, opening the door becomes a giveaway. The smart move then is to shut the door — and perhaps use gold from the vault to buy back the cheap units.
`,

  misconceptions: [
    "**“Issuing shares always dilutes existing owners.”** — Percentage ownership always shrinks, but whether value per share falls depends on the issue price versus value per share. Issue above value per share and existing owners own more value per share — exactly the logic of a DAT issuing when \\(\\mathrm{mNAV} > 1\\).",
    "**“Buybacks are always good because they raise EPS.”** — Buybacks raise EPS mechanically, but if the price paid is above intrinsic value, the company is overpaying with the remaining owners' money and value per share falls. Judge a buyback by its price, not its EPS effect.",
    "**“Stock compensation costs no cash, so it isn't a cost.”** — Pay in shares raises the share count and dilutes value per share; it is a real cost. Adding it back in “adjusted earnings” overstates per-share earning power.",
    "**“As long as total assets are growing, shareholders are getting richer.”** — A company can keep growing by issuing stock cheaply while value per share stands still or falls. The owner's scoreboard is per-share metrics, not company totals.",
    "**“A DAT issuing stock to buy bitcoin always raises BTC per share.”** — Only when \\(\\mathrm{mNAV} > 1\\). Below 1, issuing to buy bitcoin lowers BTC per share, and buying back stock (even selling bitcoin to do it) is the accretive move (Stage 18.3).",
  ],

  quiz: [
    {
      q: "A company worth $100 million has 10 million shares. It issues 2 million shares at $15 and keeps the cash. What is the new value per share, roughly?",
      options: [
        "$8.33",
        "$10.83",
        "$10.00",
        "$12.50",
      ],
      answer: 1,
      explain: "\\(\\dfrac{\\$100\\text{M} + \\$30\\text{M}}{12\\text{M}} \\approx\\) **$10.83**, up 8.3% from $10. The $15 issue price is above the $10 value per share, so the issue is accretive even though ownership percentages were diluted.",
    },
    {
      q: "Using \\(\\text{change in value per share} = \\dfrac{1 + n \\times m}{1 + n} - 1\\), what happens if a company issues 10% more shares at exactly its value per share (\\(m = 1\\))?",
      options: [
        "+10%",
        "−9.1%",
        "Zero — neither accretive nor dilutive",
        "It depends on the company's profits",
      ],
      answer: 2,
      explain: "\\(\\dfrac{1 + 0.1}{1.1} - 1 =\\) **0**. Issued at value per share, the newcomers bring exactly as much as they take — \\(m = 1\\) is the dividing line between accretion and dilution.",
    },
    {
      q: "Intrinsic value is $10 per share, and the company buys back 10% of its shares at $15. What happens to value per share for the owners who remain?",
      options: [
        "It falls about 5.6%",
        "It rises about 5.6%",
        "It rises about 11%, because there are fewer shares",
        "Nothing — buybacks don't affect value",
      ],
      answer: 0,
      explain: "\\(\\dfrac{100 - 15}{9} \\approx \\$9.44\\), **−5.6%.** Buying back above value per share means overpaying with the remaining owners' money. EPS may rise, but value per share falls.",
    },
    {
      q: "Orange Corp holds 10,000 BTC and has 100 million shares; its price implies \\(\\mathrm{mNAV} = 1.5\\). If it issues 10 million shares at mNAV 1.5 and buys bitcoin with all the proceeds, BTC per share changes by about:",
      options: [
        "−9.1%, because the share count rose 10%",
        "+15%",
        "0",
        "+4.5%",
      ],
      answer: 3,
      explain: "$150M buys 1,500 BTC → \\(\\dfrac{11{,}500\\ \\text{BTC}}{110\\text{M shares}}\\) versus \\(\\dfrac{10{,}000}{100\\text{M}}\\): **+4.5%.** That is BTC Yield (Stage 16.3) and the first turn of the flywheel (Stage 16.7).",
    },
    {
      q: "There are 1 million options with a $10 strike and the stock trades at $15. Under the treasury stock method, roughly how many diluted shares do they add?",
      options: [
        "1 million",
        "About 333,000",
        "About 667,000",
        "Zero, because the options haven't been exercised",
      ],
      answer: 1,
      explain: "Exercise brings in $10M, enough to buy back about \\(\\dfrac{\\$10\\text{M}}{\\$15} \\approx 667{,}000\\) shares at $15, so the net addition is \\(1{,}000{,}000 - 667{,}000 \\approx\\) **333,000 shares.** The higher the share price, the more dilution options cause.",
    },
  ],

  further: [
    { label: "Berkshire Hathaway shareholder letters — Buffett on repurchasing only below intrinsic value (e.g., the 1999, 2011 and 2016 letters)", url: "https://www.berkshirehathaway.com/letters/letters.html" },
    { label: "SEC: Rule 10b-18, the safe harbor for issuer repurchases (FAQ)", url: "https://www.sec.gov/divisions/marketreg/r10b18faq0504.htm" },
    { label: "Strategy investor site — the company's own definitions of BTC Yield and BTC per share (the official source)", url: "https://www.strategy.com" },
  ],
};
