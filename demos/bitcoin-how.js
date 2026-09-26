// 交互演示：迷你区块链 + 追赶概率——
// 四个区块链式相连，改动任意一笔旧交易，看哈希怎么向后“传染”、哪些区块失效；
// 按“挖矿”真的逐个试 nonce，直到哈希开头有足够多个 0；
// 再用中本聪白皮书第 11 节的公式，算出拥有 q 份算力的攻击者从落后 z 个区块追上诚实链的概率。
import { fmtPct, fmtNum } from "./_fin.js";

// 演示用的 64 位（16 位十六进制）指纹：两路不同种子的 FNV-1a。不是 SHA-256，但同样“改一个字全变”。
function toyHash(str) {
  let h1 = 0x811c9dc5, h2 = 0x01000193 ^ 0x5bd1e995;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 ^= c; h1 = Math.imul(h1, 0x01000193) >>> 0;
    h2 ^= c + 0x9e; h2 = Math.imul(h2, 0x01000193) >>> 0;
    h2 = (h2 ^ (h1 >>> 7)) >>> 0;
  }
  h1 = Math.imul(h1 ^ (h1 >>> 15), 0x2c1b3c6d) >>> 0;
  h2 = Math.imul(h2 ^ (h2 >>> 13), 0x297a2d39) >>> 0;
  return h1.toString(16).padStart(8, "0") + h2.toString(16).padStart(8, "0");
}

// 中本聪白皮书：攻击者算力份额 q、落后 z 个区块时最终追上的概率
function catchUp(q, z) {
  const p = 1 - q;
  if (q >= p) return 1;
  const lambda = z * (q / p);
  let sum = 1, poisson = Math.exp(-lambda);
  for (let k = 0; k <= z; k++) {
    if (k > 0) poisson *= lambda / k;
    sum -= poisson * (1 - Math.pow(q / p, z - k));
  }
  return Math.max(0, sum);
}

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const COLON = T("：", ": ");

  const st = {
    diff: 3,
    blocks: [
      { tx: T("矿工奖励 → 小林 3.125", "Coinbase → Lin 3.125"), nonce: 0 },
      { tx: T("小林 → 咖啡店 0.002；小林 → 小王 0.5", "Lin → Coffee shop 0.002; Lin → Sam 0.5"), nonce: 0 },
      { tx: T("小王 → 房东 0.3；咖啡店 → 供应商 0.001", "Sam → Landlord 0.3; Coffee shop → Supplier 0.001"), nonce: 0 },
      { tx: T("房东 → 装修队 0.25", "Landlord → Builders 0.25"), nonce: 0 },
    ],
    tries: 0,
    q: 0.1,
    z: 6,
  };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⛓️ 迷你区块链：改一笔旧账要付出多少“功”", "⛓️ Mini blockchain: what it costs to rewrite one old entry")}</div>
      <div class="demo-row">
        <span class="demo-label">${T("难度（哈希开头要几个 0）", "Difficulty (leading zeros required)")}${COLON}</span>
        <div class="demo-seg" id="bh-diff">
          ${[1, 2, 3, 4].map((d) => `<button data-d="${d}" class="${d === st.diff ? "on" : ""}">${d}</button>`).join("")}
        </div>
      </div>
      <div id="bh-chain"></div>
      <div class="demo-btns">
        <button class="demo-btn" id="bh-mineall">${T("从第一个失效区块起全部重挖", "Re-mine every broken block from the first one")}</button>
        <button class="demo-btn" id="bh-tamper">${T("篡改区块 1：把 0.5 改成 50", "Tamper with block 1: change 0.5 to 50")}</button>
        <button class="demo-btn" id="bh-reset">${T("重置", "Reset")}</button>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("本次累计尝试次数", "Guesses made so far")}</div><div class="v acc" id="bh-tries">0</div></div>
        <div class="stat"><div class="k">${T("每个区块的期望尝试次数", "Expected guesses per block")}</div><div class="v" id="bh-exp">–</div></div>
        <div class="stat"><div class="k">${T("失效区块数", "Broken blocks")}</div><div class="v" id="bh-bad">–</div></div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("攻击者能追上吗？（中本聪白皮书第 11 节的公式）", "Can an attacker catch up? (formula from section 11 of the white paper)")}</div>
        <div class="demo-grid">
          <div>
            <label class="demo-label">${T("攻击者算力占全网比例 q", "Attacker's share of hash power q")}${COLON}<b id="bh-q-v"></b></label>
            <input class="demo-slider" id="bh-q" type="range" min="0.01" max="0.5" step="0.01" value="${st.q}">
          </div>
          <div>
            <label class="demo-label">${T("商家等待的确认数 z", "Confirmations the merchant waits for z")}${COLON}<b id="bh-z-v"></b></label>
            <input class="demo-slider" id="bh-z" type="range" min="0" max="12" step="1" value="${st.z}">
          </div>
        </div>
        <div id="bh-bars"></div>
        <div class="demo-log" id="bh-log"></div>
      </div>
      <p class="demo-tip">${T(
        "先点“篡改区块 1”：区块 1 的哈希变了，后面每个区块记着的“前块哈希”也跟着变，整条链从区块 1 起全部变红。再点“全部重挖”，看尝试次数——难度每加 1，要试的次数约乘以 16。最后拖动 q：算力 10% 的攻击者，面对 6 次确认，追上的概率只有万分之二左右；q 接近 50% 时，任何确认数都挡不住——这就是“51% 攻击”的含义。",
        "Click “Tamper with block 1” first: block 1's hash changes, so every later block's stored “prev hash” changes too, and the chain turns red from block 1 onward. Then click “Re-mine” and watch the guess count — each extra zero multiplies the work by about 16. Finally drag q: an attacker with 10% of the hash power facing 6 confirmations succeeds only about 2 times in 10,000; as q nears 50%, no number of confirmations is enough — that is what a “51% attack” means."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);
  const target = () => "0".repeat(st.diff);
  const headerOf = (i, prev) => `${i}|${prev}|${st.blocks[i].tx}|${st.blocks[i].nonce}`;

  // 按顺序计算每个区块的前块哈希、本块哈希与是否有效
  function compute() {
    let prev = "0000000000000000";
    let broken = false;
    return st.blocks.map((b, i) => {
      const h = toyHash(headerOf(i, prev));
      const okWork = h.startsWith(target());
      if (!okWork) broken = true;
      const row = { prev, hash: h, ok: okWork && !broken };
      prev = h;
      return row;
    });
  }

  function mine(i) {
    const rows = compute();
    const prev = rows[i].prev;
    let n = 0;
    const cap = 3000000;
    st.blocks[i].nonce = 0;
    while (!toyHash(headerOf(i, prev)).startsWith(target()) && n < cap) { st.blocks[i].nonce++; n++; }
    st.tries += n + 1;
  }

  function paintChain() {
    const rows = compute();
    $("bh-chain").innerHTML = `<div class="cmp">${st.blocks.map((b, i) => {
      const r = rows[i];
      const col = r.ok ? "var(--green)" : "var(--red)";
      const bg = r.ok ? "var(--green-soft)" : "var(--red-soft)";
      return `<div class="cmp-cell" style="border:2px solid ${col};background:${bg};text-align:left">
        <div style="font-weight:700;color:var(--ink)">${T("区块", "Block")} ${i} ${r.ok ? "✓" : "✗"}</div>
        <div class="demo-meta">${T("前块哈希", "Prev hash")}${COLON}<code>${r.prev.slice(0, 10)}…</code></div>
        <textarea data-tx="${i}" rows="3" style="width:100%;box-sizing:border-box;font-size:12px;border:1px solid var(--line);border-radius:6px;background:var(--surface-2);color:var(--ink);padding:4px">${b.tx}</textarea>
        <div class="demo-meta">nonce${COLON}<b>${fmtNum(b.nonce, 0)}</b></div>
        <div class="demo-meta">${T("本块哈希", "Block hash")}${COLON}<code style="color:${col}">${r.hash}</code></div>
        <button class="demo-btn" data-mine="${i}">${T("挖这个区块", "Mine this block")}</button>
      </div>`;
    }).join("")}</div>`;
    root.querySelectorAll("[data-tx]").forEach((ta) => ta.addEventListener("input", () => {
      st.blocks[+ta.dataset.tx].tx = ta.value;
      paintStats(); recolor();
    }));
    root.querySelectorAll("[data-mine]").forEach((bt) => bt.addEventListener("click", () => { mine(+bt.dataset.mine); paintChain(); paintStats(); }));
  }

  // 输入时只更新颜色与哈希，避免重绘把光标弄丢
  function recolor() {
    const rows = compute();
    root.querySelectorAll("#bh-chain .cmp-cell").forEach((cell, i) => {
      const r = rows[i];
      const col = r.ok ? "var(--green)" : "var(--red)";
      cell.style.borderColor = col;
      cell.style.background = r.ok ? "var(--green-soft)" : "var(--red-soft)";
      cell.firstElementChild.textContent = `${T("区块", "Block")} ${i} ${r.ok ? "✓" : "✗"}`;
      const codes = cell.querySelectorAll("code");
      codes[0].textContent = r.prev.slice(0, 10) + "…";
      codes[1].textContent = r.hash; codes[1].style.color = col;
    });
  }

  function paintStats() {
    const rows = compute();
    const bad = rows.filter((r) => !r.ok).length;
    $("bh-tries").textContent = fmtNum(st.tries, 0);
    $("bh-exp").textContent = "≈ " + fmtNum(Math.pow(16, st.diff), 0);
    $("bh-bad").textContent = bad;
    $("bh-bad").className = "v " + (bad ? "neg" : "pos");
  }

  function paintRace() {
    $("bh-q-v").textContent = fmtPct(st.q, 0);
    $("bh-z-v").textContent = st.z;
    const zs = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12];
    $("bh-bars").innerHTML = zs.map((z) => {
      const p = catchUp(st.q, z);
      return `<div class="bar2"><span class="lab">${T("确认数", "Confs")} ${z}</span><div class="track"><div class="fill" style="width:${Math.max(0.5, p * 100)}%;background:${z === st.z ? "var(--btc)" : "var(--orange)"}"></div></div><span class="val">${p < 1e-4 ? p.toExponential(1) : fmtPct(p, 2)}</span></div>`;
    }).join("");
    const p = catchUp(st.q, st.z);
    const lines = [];
    lines.push(`${T("算力份额", "Hash share")} ${fmtPct(st.q, 0)}${T("、等待", ", waiting for")} ${st.z} ${T("次确认 → 攻击成功概率", "confirmations → attack success probability")} <b>${p < 1e-4 ? p.toExponential(2) : fmtPct(p, 3)}</b>`);
    if (st.q >= 0.5) lines.push(`<span class="bad">${T("q ≥ 50%：攻击者迟早会追上，确认数只能拖延时间。这时账本的安全性来自“攻击者自己也持有比特币、作恶会砸掉自己的资产”的经济约束，而不是数学。", "q ≥ 50%: the attacker eventually catches up and confirmations only buy time. Safety then rests on economics — an attacker who holds bitcoin would be wrecking their own asset — not on math.")}</span>`);
    else if (p < 0.001) lines.push(`<span class="ok">${T("概率低于千分之一：对大多数付款来说已经足够“最终”。", "Below one in a thousand: final enough for most payments.")}</span>`);
    else lines.push(`<span class="warn">${T("概率仍不可忽略：金额越大，越应该多等几个区块。", "Still not negligible: the larger the payment, the more blocks you should wait.")}</span>`);
    $("bh-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  function mineAllFromFirstBad() {
    for (let i = 0; i < st.blocks.length; i++) {
      const rows = compute();
      if (!rows[i].ok) mine(i);
    }
    paintChain(); paintStats();
  }

  function resetAll() {
    st.blocks[1].tx = T("小林 → 咖啡店 0.002；小林 → 小王 0.5", "Lin → Coffee shop 0.002; Lin → Sam 0.5");
    st.blocks.forEach((b) => { b.nonce = 0; });
    st.tries = 0;
    for (let i = 0; i < st.blocks.length; i++) mine(i);
    st.tries = 0;
    paintChain(); paintStats();
  }

  root.querySelectorAll("#bh-diff button").forEach((b) => b.addEventListener("click", () => {
    root.querySelectorAll("#bh-diff button").forEach((x) => x.classList.remove("on"));
    b.classList.add("on");
    st.diff = +b.dataset.d;
    paintChain(); paintStats();
  }));
  $("bh-mineall").addEventListener("click", mineAllFromFirstBad);
  $("bh-tamper").addEventListener("click", () => {
    st.blocks[1].tx = st.blocks[1].tx.replace("0.5", "50");
    paintChain(); paintStats();
  });
  $("bh-reset").addEventListener("click", resetAll);
  $("bh-q").addEventListener("input", (e) => { st.q = +e.target.value; paintRace(); });
  $("bh-z").addEventListener("input", (e) => { st.z = +e.target.value; paintRace(); });

  resetAll();
  paintRace();
}
