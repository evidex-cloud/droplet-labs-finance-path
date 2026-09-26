// Droplet Labs · 新金融之路 · New Finance Path —— 渲染器（双语 + 难度 + persona）· UI v3（Droplet Labs 品牌语言）
// 内容在 content/ 下；中文正文 stageX-id.js，英文正文 content/lessons/en/ 同名文件。
// UI 文案用 t(中,英)。难度 1/2/3 与 persona 标签在 manifest 里。课文与演示的格式不变（见 AUTHORING.md）。

import { COURSE } from "./content/manifest.js?v=3"; // 改了 manifest 要随 app.js?v 一起 bump，破缓存
import { GLOSSARY } from "./content/glossary.js?v=3"; // 知识小卡片术语表；改它要 bump 这里的 ?v 与 app.js?v
import { tex, blockLines, mathifyRaw, protectMath } from "./math.js?v=4"; // 公式排版（KaTeX）；demos/_fin.js 用同一个 URL，保证只加载一次

const app = document.getElementById("app");
const PKEY = "finance-path-v1";
const V = "5"; // 内容版本：改了 lessons/ 或 demos/ 后 +1，破除浏览器对动态 import 的缓存

const LOGO_H = "assets/logo-horizontal-dark-t.png";
const LOGO_S = "assets/logo-stacked-dark-t.png";
const MARK = "assets/mark-accent.svg";
const LINKS = { site: "https://dropletlabs.xyz/", paths: "https://evidex-cloud.github.io/" };

/* ---------------- 状态 ---------------- */
function loadState() {
  const base = { done: {}, goal: null, lang: "zh", brief: false };
  try { return Object.assign(base, JSON.parse(localStorage.getItem(PKEY)) || {}); }
  catch { return base; }
}
function saveState(s) { try { localStorage.setItem(PKEY, JSON.stringify(s)); } catch { /* 隐私模式下忽略 */ } }
let state = loadState();
// ?lang=en / ?lang=zh 可直接指定语言（方便分享链接）
try { const q = new URLSearchParams(location.search).get("lang"); if (q === "en" || q === "zh") { state.lang = q; saveState(state); } } catch { /* */ }

/* ---------------- i18n 助手 ---------------- */
const lang = () => state.lang === "en" ? "en" : "zh";
const t = (zh, en) => (lang() === "en" ? en : zh);
const L = (o, k) => (lang() === "en" && o[k + "En"] != null ? o[k + "En"] : o[k]);
const enModulePath = (m) => m.replace("./content/lessons/", "./content/lessons/en/");

const DIFF = { 1: ["基础", "Basic"], 2: ["进阶", "Intermediate"], 3: ["高级", "Advanced"] };
const diffLabel = (d) => t(DIFF[d][0], DIFF[d][1]);
const stars = (d) => `<span class="stars" title="${diffLabel(d)}" aria-label="${diffLabel(d)}">${[1, 2, 3].map((i) => `<i class="${i <= d ? "" : "off"}"></i>`).join("")}</span>`;

/* ---------------- 工具 ---------------- */
const tierOf = (id) => COURSE.tiers.find((x) => x.id === id);
const allLessons = () => COURSE.stages.flatMap((s) => s.lessons);
const readyLessons = () => allLessons().filter((l) => l.status === "ready");
const findLesson = (id) => {
  for (const s of COURSE.stages) {
    const i = s.lessons.findIndex((x) => x.id === id);
    if (i >= 0) return { lesson: s.lessons[i], stage: s, index: i };
  }
  return null;
};
const codeOf = (id) => { const h = findLesson(id); return h ? `${h.stage.n}.${h.index + 1}` : ""; };
const relevant = (lesson) => !state.goal || (lesson.personas || []).includes(state.goal);
const doneCount = (list) => list.filter((l) => state.done[l.id]).length;
const nextLesson = () => readyLessons().find((l) => !state.done[l.id]) || null;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };

/* ---------------- 极简 Markdown ---------------- */
function inline(s) {
  const m = protectMath(s); // 行内公式 \( … \) 先抠出来，最后再排版放回
  return m.restore(esc(m.text).replace(/&quot;/g, '"')
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*\w])\*([^\s*](?:[^*\n]*?[^\s*])?)\*(?![*\w])/g, "$1<em>$2</em>") // *斜体*（书名、强调）
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>'));
}
function md(text) {
  if (!text) return "";
  return text.trim().split(/\n\s*\n/).map((block) => {
    const b = block.trim();
    if (b.startsWith("<svg") || b.startsWith("<figure") || b.startsWith("<table")) return mathifyRaw(b); // 原样透传（SVG / figure / 表格）；表格与图注里的 \( … \) 照样排版
    if (b.startsWith("### ")) return `<h3 class="subhead">${inline(b.slice(4))}</h3>`;
    if (b.startsWith("$$")) return `<div class="formula">${blockLines(b).map((l) => tex(l, true)).join("")}</div>`; // 每行一条独立公式（KaTeX）
    if (b.startsWith("- ")) return `<ul>${b.split("\n").map((l) => `<li>${inline(l.replace(/^-\s+/, ""))}</li>`).join("")}</ul>`;
    if (b.startsWith("> ")) return `<blockquote>${inline(b.replace(/^>\s?/gm, ""))}</blockquote>`;
    return `<p>${inline(b)}</p>`;
  }).join("");
}

/* ---------------- 知识小卡片 + 课间交叉链接（渲染后装饰 DOM，不改课文） ---------------- */
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const XREF = (() => {
  const exact = new Map(), stageFirst = new Map();
  for (const s of COURSE.stages) {
    const sn = String(s.n);
    s.lessons.forEach((l, i) => {
      if (l.status !== "ready") return;
      exact.set(sn + "." + (i + 1), l.id);
      if (!stageFirst.has(sn)) stageFirst.set(sn, l.id);
    });
  }
  return { exact, stageFirst };
})();
const SKIP_SEL = "svg,figure,code,a,button,table,h1,.katex,.formula,.subhead,.breadcrumb,.lsn-tag,.lsn-meta,.lsn-nav,.gloss,.xref,#demo-mount,.section-h";
function notSkipped(node, root) {
  const p = node.parentElement;
  if (!p) return false;
  const hit = p.closest(SKIP_SEL);
  return !(hit && root.contains(hit));
}
function textNodesIn(root) {
  const out = [], w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n; while ((n = w.nextNode())) if (n.nodeValue.trim() && notSkipped(n, root)) out.push(n);
  return out;
}
function replaceIn(node, re, makeEl) {
  const text = node.nodeValue;
  const parts = []; let last = 0, any = false, m; re.lastIndex = 0;
  while ((m = re.exec(text))) {
    const el = makeEl(m);
    if (el) {
      if (m.index > last) parts.push(text.slice(last, m.index));
      parts.push(el); any = true; last = m.index + m[0].length;
    }
    if (re.lastIndex === m.index) re.lastIndex++;
  }
  if (!any) return;
  if (last < text.length) parts.push(text.slice(last));
  const frag = document.createDocumentFragment();
  parts.forEach((p) => frag.append(p));
  node.parentNode.replaceChild(frag, node);
}
function decorateXrefs(root, currentId) {
  const re = /(?:阶段|Stage)\s*([0-9]+|∞)(?:\.([0-9]+))?/g;
  textNodesIn(root).forEach((node) => replaceIn(node, re, (m) => {
    const id = m[2] ? XREF.exact.get(m[1] + "." + m[2]) : XREF.stageFirst.get(m[1]);
    if (!id || id === currentId) return null;
    const a = document.createElement("a");
    a.className = "xref"; a.href = "#lesson/" + id; a.textContent = m[0];
    const h = findLesson(id); if (h) a.title = L(h.lesson, "title");
    return a;
  }));
}
function decorateGloss(root, lng) {
  const terms = GLOSSARY
    .flatMap((e) => e[lng].n.map((name) => ({ name, def: e[lng].d, title: e[lng].n[0], ascii: !/[一-鿿]/.test(name) })))
    .sort((a, b) => b.name.length - a.name.length);
  const blocks = [...root.querySelectorAll(".oneliner, .section")].filter((b) => !b.querySelector("#demo-mount"));
  for (const block of blocks) {
    const used = new Set();
    for (const term of terms) {
      if (used.has(term.title)) continue;
      let re;
      try { re = term.ascii ? new RegExp("(?<![\\w-])" + escRe(term.name) + "(?![\\w-])") : new RegExp(escRe(term.name)); }
      catch { re = new RegExp(escRe(term.name)); }
      for (const node of textNodesIn(block)) {
        const m = re.exec(node.nodeValue);
        if (!m) continue;
        const i = m.index, txt = m[0], v = node.nodeValue;
        const frag = document.createDocumentFragment();
        if (i > 0) frag.append(v.slice(0, i));
        const span = document.createElement("span");
        span.className = "gloss"; span.tabIndex = 0; span.textContent = txt;
        const card = document.createElement("span");
        card.className = "gloss-card"; card.setAttribute("role", "note");
        const b = document.createElement("b"); b.textContent = term.title; card.appendChild(b);
        card.appendChild(document.createTextNode(term.def));
        span.appendChild(card); frag.append(span);
        if (i + txt.length < v.length) frag.append(v.slice(i + txt.length));
        node.parentNode.replaceChild(frag, node);
        used.add(term.title); break;
      }
    }
  }
}
function wireGlossFlip(root) {
  const place = (g) => {
    const card = g.querySelector(".gloss-card");
    if (!card || window.matchMedia("(max-width: 640px)").matches) return; // 手机上是底部浮层，不需要翻转
    card.classList.remove("flip");
    const shown = card.getBoundingClientRect().width > 0;
    if (!shown) card.style.display = "block";
    const limit = Math.min(root.getBoundingClientRect().right, window.innerWidth) - 8;
    if (card.getBoundingClientRect().right > limit) card.classList.add("flip");
    if (!shown) card.style.display = "";
  };
  const hit = (e) => { const g = e.target.closest?.(".gloss"); if (g) place(g); };
  root.addEventListener("pointerover", hit);
  root.addEventListener("focusin", hit);
}
// 手机上宽图可横向滑动：在每张图前加一句提示
function decorateFigures(root) {
  root.querySelectorAll(".lesson-main figure").forEach((f) => {
    if (f.querySelector(".fig-hint")) return;
    const p = document.createElement("span");
    p.className = "fig-hint"; p.textContent = t("← 左右滑动查看完整图示 →", "← Swipe to see the whole diagram →");
    f.prepend(p);
  });
}
// 表格包一层可横向滚动的卡片，窄表也能铺满宽度
function wrapTables(root) {
  root.querySelectorAll(".section > table").forEach((tb) => {
    const w = document.createElement("div"); w.className = "table-wrap";
    tb.parentNode.insertBefore(w, tb); w.appendChild(tb);
  });
}
function decorateLesson(root, id, lng) {
  try { wrapTables(root); decorateXrefs(root, id); decorateGloss(root, lng); wireGlossFlip(root); decorateFigures(root); } catch (e) { /* 装饰失败不影响正文渲染 */ }
}

/* ---------------- 外壳：顶部导航 + 结尾区 ---------------- */
const ICON_MENU = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 4h12M2 8h12M2 12h8"/></svg>`;
function ringSVG(pct) {
  const r = 8.5, c = 2 * Math.PI * r;
  return `<svg class="ring" viewBox="0 0 22 22" aria-hidden="true"><circle class="bg" cx="11" cy="11" r="${r}"/><circle class="fg" cx="11" cy="11" r="${r}" stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${(c * (1 - pct / 100)).toFixed(2)}" transform="rotate(-90 11 11)"/></svg>`;
}
function renderChrome(view) {
  document.documentElement.lang = lang() === "en" ? "en" : "zh-CN";
  document.title = `${L(COURSE, "title")}${view.title ? " · " + view.title : ""}`;
  const total = readyLessons().length, doneN = doneCount(readyLessons());
  const pct = total ? Math.round((doneN / total) * 100) : 0;

  let nav = document.getElementById("nav");
  if (!nav) {
    nav = document.createElement("header");
    nav.className = "nav"; nav.id = "nav";
    document.body.prepend(nav);
    const bar = document.createElement("div"); bar.className = "readbar"; bar.id = "readbar";
    document.body.prepend(bar);
  }
  nav.innerHTML = `
    <div class="nav-inner">
      <a class="nav-brand" href="#" aria-label="${t("新金融之路 · 路线图", "New Finance Path · roadmap")}">
        <img class="nav-logo" src="${LOGO_H}" alt="Droplet Labs" width="1422" height="314">
        <span class="nav-sep"></span>
        <span class="nav-course">${t("<b>新金融</b>之路", "<b>New Finance</b> Path")}</span>
      </a>
      <span class="nav-spacer"></span>
      <div class="nav-actions">
        <span class="nav-prog" title="${t("已完成", "Completed")} ${doneN}/${total}">${ringSVG(pct)}<span class="t">${doneN} / ${total}</span></span>
        ${view.kind === "lesson" ? `<button class="nav-btn nav-menu-btn" data-sbtoggle aria-label="${t("课程目录", "Lessons")}">${ICON_MENU}<span class="t">${t("目录", "Lessons")}</span></button>` : ""}
        <button class="nav-btn paper" data-lang aria-label="${t("Switch to English", "切换到中文")}">${t("EN", "中文")}</button>
      </div>
    </div>`;

  let foot = document.getElementById("closing");
  if (!foot) {
    foot = document.createElement("footer");
    foot.className = "closing"; foot.id = "closing";
    document.body.appendChild(foot);
  }
  foot.innerHTML = `
    <div class="closing-inner">
      <div class="closing-top">
        <div>
          <h2>${t("看见整张图，而不只是碎片。", "See the whole picture, not just the pieces.")}</h2>
          <p>${t("新金融之路是 Droplet Labs 学习路径系列的一门：用四个观念，把今天的经济、传统金融、比特币、DeFi、代币化与数字资产财库公司串成一条线。", "New Finance Path is part of the Droplet Labs learning paths: four ideas that tie today's economy, TradFi, Bitcoin, DeFi, tokenization and digital asset treasury companies into one story.")}</p>
        </div>
        <div class="closing-links">
          <a class="btn btn-line btn-sm" href="${LINKS.paths}" target="_blank" rel="noopener">${t("全部学习路径", "All learning paths")} <span class="arrow">↗</span></a>
          <a class="btn btn-paper btn-sm" href="${LINKS.site}" target="_blank" rel="noopener">Droplet Labs <span class="arrow">↗</span></a>
        </div>
      </div>
      <div class="closing-bottom">
        <img class="footer-logo" src="${LOGO_S}" alt="Droplet Labs" width="1005" height="405">
        <div class="legal">
          <span>© 2026 Droplet Labs · ${t("内部使用", "Internal Only")}</span>
          <span>${t("本课程只讲框架、机制与历史，不构成任何投资建议。", "Frameworks, mechanics and history only — nothing here is investment advice.")}</span>
        </div>
        <div class="closing-actions">
          <button type="button" data-lang>${t("English", "中文")}</button>
          <a href="#" data-top>${t("回到顶部 ↑", "Back to top ↑")}</a>
        </div>
      </div>
    </div>`;

  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    state.lang = lang() === "en" ? "zh" : "en"; saveState(state); render({ keepScroll: false });
  }));
  foot.querySelector("[data-top]").addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  nav.querySelector("[data-sbtoggle]")?.addEventListener("click", () => document.body.classList.toggle("sb-open"));
}

/* ---------------- 路由 ---------------- */
let cleanup = [];
function onCleanup(fn) { cleanup.push(fn); }
async function render(opts = {}) {
  cleanup.forEach((fn) => { try { fn(); } catch { /* */ } }); cleanup = [];
  document.body.classList.remove("sb-open");
  const hash = location.hash.replace(/^#/, "");
  if (hash.startsWith("lesson/")) await renderLesson(hash.slice("lesson/".length));
  else renderRoadmap(hash);
  if (!opts.keepScroll && !(hash && !hash.startsWith("lesson/"))) window.scrollTo(0, 0);
}
window.addEventListener("hashchange", () => render());

/* ---------------- 视图：首页 / 路线图 ---------------- */
const IDEAS = [
  { zh: ["时间的价格", "钱有时间价值。任何资产 = 未来现金流按利率折现，而利率的锚是国债收益率——所以利率一动，债券、股票、比特币、优先股都要重新定价。", "阶段 2 · 4 · 9 · 18"],
    en: ["The price of time", "Money has a time value. Every asset is future cash flows discounted at a rate anchored on Treasuries — so when rates move, bonds, stocks, Bitcoin and preferreds all reprice.", "Stages 2 · 4 · 9 · 18"] },
  { zh: ["资产负债表与索取权", "每一种金融工具都是写在某人资产负债表上的一张索取权；谁先拿到钱，由清偿顺序决定。数字资产财库公司就是一张精心设计的资产负债表。", "阶段 1 · 5 · 6 · 15–17"],
    en: ["Balance sheets & claims", "Every instrument is a claim on someone's balance sheet, and seniority decides who gets paid first. A digital asset treasury company is a carefully engineered balance sheet.", "Stages 1 · 5 · 6 · 15–17"] },
  { zh: ["流动性与信任", "金融靠管道运转：结算、托管、抵押品与信任。危机是信任断裂时的挤兑；区块链、稳定币与代币化，本质上是在重建管道。", "阶段 8 · 10 · 13 · 14"],
    en: ["Liquidity & trust", "Finance runs on plumbing — settlement, custody, collateral and trust. Crises are runs when trust breaks; blockchains, stablecoins and tokenization are rebuilding the pipes.", "Stages 8 · 10 · 13 · 14"] },
  { zh: ["风险与杠杆", "风险有价格，杠杆双向放大，波动率本身可以被买卖，市场还会自我强化。“放大比特币”、可转债与优先股，都是对风险的重新切分。", "阶段 7 · 11 · 16 · 18"],
    en: ["Risk & leverage", "Risk has a price, leverage cuts both ways, volatility itself can be traded, and markets feed on themselves. Amplified bitcoin, converts and preferreds all re-slice risk.", "Stages 7 · 11 · 16 · 18"] },
];
const STEPS = [["直觉", "Intuition"], ["原理", "Mechanics"], ["演示", "Demo"], ["类比", "Analogy"], ["常见误解", "Misconceptions"], ["自测", "Quiz"], ["延伸阅读", "Further reading"]];

function renderRoadmap(anchor) {
  renderChrome({ kind: "home" });
  const ready = readyLessons(), total = ready.length, doneN = doneCount(ready);
  const pct = total ? Math.round((doneN / total) * 100) : 0;
  const next = nextLesson();
  const tiers = COURSE.tiers.map((tr) => {
    const ls = COURSE.stages.filter((s) => s.tier === tr.id).flatMap((s) => s.lessons).filter((l) => l.status === "ready");
    return { ...tr, total: ls.length, done: doneCount(ls) };
  });

  const cta = next
    ? `<a class="btn btn-ink" href="#lesson/${next.id}"><span class="btn-text"><small>${doneN ? t("继续学习", "Continue") : t("从这里开始", "Start here")} · ${codeOf(next.id)}</small>${esc(L(next, "title"))}</span><span class="arrow">→</span></a>`
    : `<a class="btn btn-ink" href="#lesson/${ready[0].id}">${t("重温第一课", "Revisit lesson 0.1")} <span class="arrow">→</span></a>`;

  let html = `
    <section class="hero">
      <div class="hero-copy">
        <span class="chip-label">Droplet Labs · ${t("学习路径", "Learning Path")}</span>
        <h1>${t("新金融<em>之路</em>", "New Finance <em>Path</em>")}</h1>
        <p class="hero-lede">${esc(L(COURSE, "subtitle"))}</p>
        <ul class="hero-facts">
          <li><b>${COURSE.stages.length}</b>${t("个阶段", "stages")}</li>
          <li><b>${total}</b>${t("节课", "lessons")}</li>
          <li><b>${total}</b>${t("个交互演示", "live demos")}</li>
          <li><b>2</b>${t("种语言", "languages")}</li>
        </ul>
        <div class="hero-cta">${cta}<a class="btn btn-line" href="#roadmap">${t("浏览路线图", "Browse the roadmap")} <span class="arrow">↓</span></a></div>
      </div>
      <aside class="panel prog-panel" aria-label="${t("学习进度", "Progress")}">
        <img class="mark" src="${MARK}" alt="" aria-hidden="true">
        <div class="label">${t("你的进度", "Your progress")}</div>
        <div class="prog-top" style="margin-top:14px">
          <div><div class="prog-big">${pct}<small>%</small></div><div class="prog-sub">${t(`已完成 ${doneN} / ${total} 节`, `${doneN} of ${total} lessons completed`)}</div></div>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="tier-meter" title="${t("七个层的完成度", "Completion by tier")}">${tiers.map((tr) => `<i style="--c:${tr.color}" title="${esc(L(tr, "label"))} · ${tr.done}/${tr.total}"><b style="width:${tr.total ? (tr.done / tr.total) * 100 : 0}%"></b></i>`).join("")}</div>
        ${next ? `<div class="next-up"><div class="label">${t("下一课", "Up next")}</div><a href="#lesson/${next.id}"><span class="code">${codeOf(next.id)}</span>${esc(L(next, "title"))}</a></div>` : ""}
        <div class="goals" role="group" aria-label="${t("学习目标", "Learning goal")}">
          <div class="label">${t("按目标突出课程", "Highlight lessons for")}</div>
          <div class="goal-row">${COURSE.goals.map((g) => `<button class="goal-chip" data-goal="${g.id}" aria-pressed="${state.goal === g.id}">${esc(L(g, "label"))}</button>`).join("")}</div>
        </div>
      </aside>
    </section>`;

  if (total > 0 && doneN === total) {
    html += `<div class="done-banner">${t(`🎉 恭喜！你已读完整条「新金融之路」——全部 ${total} 节。`, `🎉 Congratulations — you've completed the entire New Finance Path, all ${total} lessons.`)}</div>`;
  }

  html += `
    <section class="sec">
      <div class="sec-grid">
        <div class="sec-head"><span class="label"><span class="dot"></span>${t("贯穿全课的主线", "The spine")}</span><h2>${t("四个观念，串起每一节", "Four ideas behind every lesson")}</h2><p>${t("每节课都会点名它落在哪个观念上——读到最后，它们会连成一张全景图。", "Every lesson names the idea it builds on — by the end they join into one picture.")}</p></div>
        <div class="ideas">${IDEAS.map((d, i) => { const x = d[lang()]; return `<article class="idea"><div class="idea-n">${"①②③④"[i]}</div><h3>${x[0]}</h3><p>${x[1]}</p><div class="where">${x[2]}</div></article>`; }).join("")}</div>
      </div>
    </section>
    <section class="sec">
      <div class="sec-grid">
        <div class="sec-head"><span class="label"><span class="dot"></span>${t("每节课怎么学", "How a lesson works")}</span><h2>${t("固定七步，认知负担最小", "Seven steps, every time")}</h2></div>
        <div>
          <ol class="steps">${STEPS.map((s) => `<li>${t(s[0], s[1])}</li>`).join("")}</ol>
          <div class="principles">
            <div><h4>${t("一条主线", "One path")}</h4><p>${t("7 个深度层、22 个阶段：入门 → 传统金融 → 宏观与风险 → 新金融 → DAT 焦点 → AI 时代与全景 → ∞。", "7 depth tiers, 22 stages: Beginner → TradFi → Macro & Risk → New Finance → the DAT Focus → the AI Era & Whole Picture → ∞.")}</p></div>
            <div><h4>${t("处处可玩", "Hands-on")}</h4><p>${t("每节一个真算的演示：复利、债券久期、资本结构瀑布、AMM、mNAV、BTC 评级、优先股压力测试。", "A live demo in every lesson: compounding, bond duration, capital-stack waterfalls, AMMs, mNAV, BTC Rating, preferred stress tests.")}</p></div>
            <div><h4>${t("本地优先 · 非投资建议", "Local-first · not advice")}</h4><p>${t("进度只存在你自己的浏览器；课程只讲框架、机制与历史。", "Progress stays in your own browser; the course teaches frameworks, mechanics and history only.")}</p></div>
          </div>
        </div>
      </div>
    </section>
    <section class="sec" id="roadmap">
      <div class="sec-head" style="margin-bottom:18px"><span class="label"><span class="dot"></span>${t("路线图", "Roadmap")}</span><h2>${t("从零到专家的 22 个阶段", "22 stages from zero to expert")}</h2></div>
      <nav class="tier-nav" aria-label="${t("按层跳转", "Jump to tier")}">${tiers.map((tr, i) => `<a href="#tier-${tr.id}" data-tier="${tr.id}" style="--c:${tr.color}"><i></i>${i + 1 < 7 ? i + 1 + " · " : ""}${esc(L(tr, "label").split(" · ")[0])}</a>`).join("")}</nav>`;

  for (const tr of tiers) {
    const stages = COURSE.stages.filter((s) => s.tier === tr.id);
    const [head, ...rest] = L(tr, "label").split(" · ");
    html += `
      <section class="tier${tr.id === "dat" ? " focus" : ""}" id="tier-${tr.id}">
        <div class="tier-grid">
          <div class="tier-side" style="--c:${tr.color}">
            <span class="label"><i></i>${esc(head)}</span>
            <h2>${esc(rest.join(" · ") || head)}</h2>
            ${tr.id === "dat" ? `<span class="focus-tag">${t("全课焦点", "Course focus")}</span>` : ""}
            <div class="tp">${tr.done} / ${tr.total} ${t("节已完成", "done")}<div class="bar"><b style="width:${tr.total ? (tr.done / tr.total) * 100 : 0}%"></b></div></div>
          </div>
          <div class="stages-list">${stages.map((s) => stageHTML(s, tr.color)).join("")}</div>
        </div>
      </section>`;
  }
  app.innerHTML = `<div class="home">${html}</div>`;

  app.querySelectorAll("[data-goal]").forEach((btn) => btn.addEventListener("click", () => {
    state.goal = state.goal === btn.dataset.goal ? null : btn.dataset.goal;
    saveState(state);
    const y = window.scrollY; renderRoadmap(); window.scrollTo(0, y);
  }));
  app.querySelectorAll("[data-open]").forEach((el) => el.addEventListener("click", () => { location.hash = `lesson/${el.dataset.open}`; }));
  // 路线图内锚点：不改 hash（避免触发路由），直接平滑滚动
  app.querySelectorAll('a[href^="#tier-"], a[href="#roadmap"]').forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault(); document.querySelector(a.getAttribute("href"))?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  // 当前层高亮
  const links = [...app.querySelectorAll(".tier-nav a")];
  const io = new IntersectionObserver((ents) => {
    ents.forEach((en) => { if (en.isIntersecting) links.forEach((l) => l.classList.toggle("on", l.dataset.tier === en.target.id.slice(5))); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  app.querySelectorAll(".tier").forEach((s) => io.observe(s));
  onCleanup(() => io.disconnect());
  setReadbar(null);
  if (anchor) document.getElementById(anchor)?.scrollIntoView({ block: "start" });
}

function stageHTML(s, color) {
  const ready = s.lessons.filter((l) => l.status === "ready");
  const d = doneCount(ready);
  const stageDone = ready.length > 0 && d === ready.length;
  const chips = s.lessons.map((l, i) => {
    const code = `${s.n}.${i + 1}`;
    if (l.status !== "ready") {
      return `<div class="chip chip-soon"><span class="chip-mark"></span><span class="chip-code">${code}</span><span class="chip-title">${esc(L(l, "title"))}</span>${stars(l.difficulty)}<span class="soon-tag">${t("编写中", "Soon")}</span></div>`;
    }
    const done = state.done[l.id], rec = state.goal && relevant(l), dim = state.goal && !relevant(l);
    return `<button class="chip ${dim ? "dim" : ""} ${rec ? "rec" : ""}" data-open="${l.id}">
        <span class="chip-mark ${done ? "done" : ""}">${done ? "✓" : ""}</span>
        <span class="chip-code">${code}</span>
        <span class="chip-title">${esc(L(l, "title"))}${rec ? ` <span class="rec-badge">${t("推荐", "Pick")}</span>` : ""}</span>
        ${stars(l.difficulty)}
        <span class="chip-arrow">→</span>
      </button>`;
  }).join("");
  return `
    <article class="stage ${stageDone ? "done" : ""}">
      <div class="stage-top">
        <div class="stage-num" style="background:${color}">${stageDone ? "✓" : s.n}</div>
        <div class="stage-body">
          <div class="stage-title">${esc(L(s, "title"))}<span class="stage-count">${d}/${ready.length}</span>${stageDone ? `<span class="stage-done-badge">${t("已完成", "Done")}</span>` : ""}</div>
          <p class="stage-blurb">${esc(L(s, "blurb"))}</p>
        </div>
      </div>
      <div class="chips">${chips}</div>
    </article>`;
}

/* ---------------- 侧栏（课程目录） ---------------- */
function sidebarHTML(currentId, currentStage) {
  const total = readyLessons().length, doneN = doneCount(readyLessons());
  let html = `<aside class="sidebar" id="sidebar" aria-label="${t("课程目录", "Lessons")}">
    <div class="sb-head">
      <button class="sb-home" data-back>← ${t("路线图", "Roadmap")}</button>
      <span class="sb-progress">${doneN}/${total}</span>
      <button class="sb-close" data-sbclose aria-label="${t("关闭", "Close")}">✕</button>
    </div>`;
  for (const s of COURSE.stages) {
    const color = tierOf(s.tier).color, ready = s.lessons.filter((l) => l.status === "ready");
    html += `<details class="sb-stage"${s === currentStage ? " open" : ""}>
      <summary><span class="n" style="background:${color}">${s.n}</span><span class="t">${esc(L(s, "title"))}</span><span class="c">${doneCount(ready)}/${ready.length}</span></summary>
      <div class="sb-list">${s.lessons.map((l, i) => {
        const dim = state.goal && !relevant(l);
        if (l.status !== "ready") return `<div class="sb-lesson soon"><span class="sb-check"></span><span class="cd">${s.n}.${i + 1}</span><span class="sb-t">${esc(L(l, "title"))}</span></div>`;
        return `<div class="sb-lesson${l.id === currentId ? " active" : ""}${dim ? " dim" : ""}" data-go="${l.id}" role="link" tabindex="0"><span class="sb-check">${state.done[l.id] ? "✓" : ""}</span><span class="cd">${s.n}.${i + 1}</span><span class="sb-t">${esc(L(l, "title"))}</span></div>`;
      }).join("")}</div>
    </details>`;
  }
  return html + `</aside>`;
}

/* ---------------- 阅读进度条 ---------------- */
function setReadbar(el) {
  const bar = document.getElementById("readbar");
  if (!bar) return;
  if (!el) { bar.style.width = "0"; return; }
  const upd = () => {
    const r = el.getBoundingClientRect(), h = r.height - window.innerHeight * 0.6;
    bar.style.width = `${Math.max(0, Math.min(1, -r.top / (h > 0 ? h : 1))) * 100}%`;
  };
  upd();
  window.addEventListener("scroll", upd, { passive: true });
  window.addEventListener("resize", upd);
  onCleanup(() => { window.removeEventListener("scroll", upd); window.removeEventListener("resize", upd); bar.style.width = "0"; });
}

/* ---------------- 视图：课程页 ---------------- */
function readingMinutes(data) {
  const txt = [data.intuition, data.mechanics, data.analogy].join(" ").replace(/<[^>]+>/g, " ");
  const cjk = (txt.match(/[一-鿿]/g) || []).length;
  const words = (txt.replace(/[一-鿿]/g, " ").match(/[A-Za-z0-9’']+/g) || []).length;
  return Math.max(3, Math.round(cjk / 380 + words / 230));
}

async function renderLesson(id) {
  const hit = findLesson(id);
  if (!hit) { location.hash = ""; return; }

  let data, fellBack = false;
  try {
    if (lang() === "en") {
      try { data = (await import(enModulePath(hit.lesson.module) + "?v=" + V)).default; }
      catch { data = (await import(hit.lesson.module + "?v=" + V)).default; fellBack = true; }
    } else {
      data = (await import(hit.lesson.module + "?v=" + V)).default;
    }
  } catch (e) {
    renderChrome({ kind: "lesson" });
    app.innerHTML = `<button class="btn btn-line btn-sm" data-back>← ${t("返回路线图", "Back to roadmap")}</button>
      <div class="demo-warn" style="margin-top:16px">${t("课程加载失败", "Failed to load lesson")}：${esc(String(e))}</div>`;
    app.querySelectorAll("[data-back]").forEach((b) => b.addEventListener("click", () => { location.hash = ""; }));
    return;
  }

  const title = L(data, "title") || data.title;
  renderChrome({ kind: "lesson", title });
  const tier = tierOf(hit.stage.tier);
  const code = `${hit.stage.n}.${hit.index + 1}`;
  const done = !!state.done[id];
  const prereq = (data.prereqs || []).map((p) => {
    const ph = findLesson(p);
    return ph ? `<a href="#lesson/${p}">${codeOf(p)} ${esc(L(ph.lesson, "title"))}</a>` : esc(p);
  }).join(t("、", ", "));

  const seq = readyLessons();
  const si = seq.findIndex((l) => l.id === id);
  const prevL = seq[si - 1], nextL = seq[si + 1];

  // 各区块（带编号与锚点，供“本页目录”使用）
  const secs = [];
  const add = (key, zh, en, body, extra = "") => { if (body) secs.push({ key, label: t(zh, en), body, extra }); };
  add("intuition", "直觉解释", "Intuition", md(data.intuition));
  add("mechanics", "深入原理", "Mechanics", data.mechanics ? md(data.mechanics) : "", " deep");
  add("demo", "动手玩一玩", "Try it yourself", data.demo ? `<div id="demo-mount"></div>` : "");
  add("analogy", "类比", "Analogy", md(data.analogy));
  add("miscon", "常见误解", "Common misconceptions", (data.misconceptions || []).length ? `<ul class="miscon">${data.misconceptions.map((m) => `<li>${inline(m)}</li>`).join("")}</ul>` : "");
  add("quiz", "自测", "Quick quiz", (data.quiz || []).length ? `<div id="quiz"></div>` : "");
  add("further", "延伸阅读", "Further reading", (data.further || []).length ? `<div class="further">${data.further.map((f) => `<a href="${esc(f.url)}" target="_blank" rel="noopener"><span>${inline(f.label)}<small>${esc(host(f.url))}</small></span><span class="ext">↗</span></a>`).join("")}</div>` : "");
  const secHTML = secs.map((s, i) => `
    <section class="section${s.extra}" id="s-${s.key}"${s.key === "mechanics" ? ' data-mech' : ""}>
      <h2 class="section-h"><span class="no">${String(i + 1).padStart(2, "0")}</span>${s.label}</h2>
      ${s.body}
    </section>`).join("");

  app.innerHTML = `
    <div class="lesson-layout">
      ${sidebarHTML(id, hit.stage)}
      <article class="lesson-main">
        <nav class="breadcrumb" aria-label="${t("位置", "Location")}"><a data-back>${t("路线图", "Roadmap")}</a><span class="sep">/</span><span class="tierdot" style="background:${tier.color}"></span><span>${esc(L(tier, "label").split(" · ")[0])}</span><span class="sep">/</span><span>${t("阶段", "Stage")} ${hit.stage.n} · ${esc(L(hit.stage, "title"))}</span></nav>
        <h1 class="lsn-title">${esc(title)}</h1>
        <div class="lsn-meta">
          <span class="meta-pill">${t("第 ", "Lesson ")}${code}${t(" 课", "")}</span>
          <span class="meta-pill">${stars(hit.lesson.difficulty)}${diffLabel(hit.lesson.difficulty)}</span>
          <span class="meta-pill">≈ ${readingMinutes(data)} ${t("分钟阅读", "min read")}</span>
          ${done ? `<span class="meta-pill" style="color:var(--green)">✓ ${t("已完成", "Completed")}</span>` : ""}
        </div>
        ${fellBack ? `<div class="fallback-note">${t("（本节英文版正在翻译中，暂以中文显示）", "(English version of this lesson is being translated; showing Chinese for now.)")}</div>` : ""}
        ${prereq ? `<div class="lsn-tag">${t("前置：", "Before this: ")}${prereq}</div>` : ""}
        <div class="oneliner">${inline(data.oneLiner)}</div>
        ${data.mechanics ? `<div class="view-switch"><div class="seg" role="group" aria-label="${t("阅读深度", "Reading depth")}"><button data-depth="full" class="${state.brief ? "" : "on"}">${t("完整版", "Full lesson")}</button><button data-depth="brief" class="${state.brief ? "on" : ""}">${t("只看直觉版", "Intuition only")}</button></div></div>` : ""}
        ${secHTML}
        <button class="complete ${done ? "done" : ""}" id="complete">${done ? t("✓ 已完成本节", "✓ Completed") : t("标记为已完成", "Mark as complete")}</button>
        <div class="lsn-nav">
          ${prevL ? `<button class="navbtn" data-go="${prevL.id}">← ${t("上一课", "Previous")} · ${codeOf(prevL.id)}<span>${esc(L(prevL, "title"))}</span></button>` : "<span></span>"}
          ${nextL ? `<button class="navbtn navbtn-next" data-go="${nextL.id}">${t("下一课", "Next")} · ${codeOf(nextL.id)} →<span>${esc(L(nextL, "title"))}</span></button>` : "<span></span>"}
        </div>
        <div class="kbd-hint">${t("键盘", "Keyboard")}：<kbd>←</kbd> <kbd>→</kbd> ${t("切换上一课 / 下一课", "previous / next lesson")}</div>
      </article>
      <nav class="toc" aria-label="${t("本页目录", "On this page")}"></nav>
    </div>
    <div class="scrim" data-sbclose></div>`;

  // 事件：返回、跳课、目录抽屉
  app.querySelectorAll("[data-back]").forEach((b) => b.addEventListener("click", () => { location.hash = ""; }));
  app.querySelectorAll("[data-go]").forEach((b) => {
    const go = () => { location.hash = `lesson/${b.dataset.go}`; };
    b.addEventListener("click", go);
    b.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
  });
  app.querySelectorAll("[data-sbclose]").forEach((b) => b.addEventListener("click", () => document.body.classList.remove("sb-open")));
  const active = app.querySelector(".sb-lesson.active");
  if (active) { const sb = app.querySelector(".sidebar"); sb.scrollTop = active.offsetTop - sb.clientHeight / 3; }

  // 阅读深度
  const mech = app.querySelector("[data-mech]");
  const applyDepth = () => { if (mech) mech.hidden = !!state.brief; buildToc(); };
  app.querySelectorAll("[data-depth]").forEach((b) => b.addEventListener("click", () => {
    state.brief = b.dataset.depth === "brief"; saveState(state);
    app.querySelectorAll("[data-depth]").forEach((x) => x.classList.toggle("on", x === b));
    applyDepth();
  }));

  // 演示
  if (data.demo) {
    const mountEl = app.querySelector("#demo-mount");
    try {
      const demo = (await import(`./demos/${data.demo}.js?v=${V}`)).default;
      demo(mountEl, lang());
    } catch (e) {
      mountEl.innerHTML = `<div class="demo-warn">${t("演示加载失败", "Demo failed to load")}：${esc(String(e))}</div>`;
    }
  }
  if ((data.quiz || []).length) renderQuiz(app.querySelector("#quiz"), data.quiz);

  const mainEl = app.querySelector(".lesson-main");
  decorateLesson(mainEl, id, lang());

  // 小标题锚点 + 本页目录 + 滚动高亮
  mainEl.querySelectorAll("#s-mechanics .subhead").forEach((h, i) => { h.id = `s-mech-${i + 1}`; });
  function buildToc() {
    const toc = app.querySelector(".toc");
    if (!toc) return;
    const items = [];
    secs.forEach((s) => {
      if (s.key === "mechanics" && state.brief) return;
      items.push(`<li><a href="#s-${s.key}" data-sec="s-${s.key}">${s.label}</a></li>`);
      if (s.key === "mechanics") mainEl.querySelectorAll("#s-mechanics .subhead").forEach((h) => {
        const c = h.cloneNode(true); c.querySelectorAll(".gloss-card").forEach((x) => x.remove());
        const full = c.textContent.trim(), txt = full.replace(/^[①②③④⑤⑥⑦⑧\s]+/, "");
        items.push(`<li class="sub"><a href="#${h.id}" data-sec="${h.id}">${esc(full.charAt(0))} ${esc(txt.length > 42 ? txt.slice(0, 40) + "…" : txt)}</a></li>`);
      });
    });
    toc.innerHTML = `<div class="label">${t("本页目录", "On this page")}</div><ol>${items.join("")}</ol>
      <div class="toc-actions"><button data-totop>↑ ${t("回到顶部", "Back to top")}</button></div>`;
    toc.querySelectorAll("a[data-sec]").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault(); document.getElementById(a.dataset.sec)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
    toc.querySelector("[data-totop]").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
  applyDepth();
  const spy = new IntersectionObserver((ents) => {
    ents.forEach((en) => {
      if (!en.isIntersecting) return;
      app.querySelectorAll(".toc a").forEach((a) => a.classList.toggle("on", a.dataset.sec === en.target.id));
    });
  }, { rootMargin: "-18% 0px -72% 0px" });
  mainEl.querySelectorAll(".section, #s-mechanics .subhead").forEach((el) => spy.observe(el));
  onCleanup(() => spy.disconnect());
  setReadbar(mainEl);

  // 键盘左右键切课（不在输入控件里时）
  const onKey = (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (["input", "textarea", "select", "button"].includes(tag) || e.target.isContentEditable) return;
    if (e.key === "ArrowLeft" && prevL) location.hash = `lesson/${prevL.id}`;
    if (e.key === "ArrowRight" && nextL) location.hash = `lesson/${nextL.id}`;
    if (e.key === "Escape") document.body.classList.remove("sb-open");
  };
  document.addEventListener("keydown", onKey);
  onCleanup(() => document.removeEventListener("keydown", onKey));

  // 完成
  const btn = app.querySelector("#complete");
  btn.addEventListener("click", () => {
    if (state.done[id]) return;
    state.done[id] = true;
    saveState(state);
    btn.classList.add("done");
    btn.textContent = t("✓ 已完成本节", "✓ Completed");
    const y = window.scrollY; renderChrome({ kind: "lesson", title }); window.scrollTo(0, y);
    if (readyLessons().every((l) => state.done[l.id])) {
      btn.insertAdjacentHTML("afterend", `<div class="done-banner" style="margin-top:14px">${t("🎉 你已读完整条「新金融之路」！回到路线图，看看你点亮的全程。", "🎉 You've finished the entire New Finance Path! Head back to the roadmap to see your whole journey lit up.")}</div>`);
    }
    app.querySelector(".navbtn-next")?.classList.add("pulse");
  });
}

function renderQuiz(root, quiz) {
  root.innerHTML = quiz.map((q, qi) => `
    <div class="quiz-q">
      <div class="quiz-stem">${qi + 1}. ${inline(q.q)}</div>
      <div class="quiz-opts">
        ${q.options.map((o, oi) => `<button class="quiz-opt" data-q="${qi}" data-o="${oi}"><span>${inline(o)}</span></button>`).join("")}
      </div>
      <div class="quiz-explain" hidden data-explain="${qi}">${inline(q.explain || "")}</div>
    </div>`).join("");
  root.querySelectorAll(".quiz-opt").forEach((btn) =>
    btn.addEventListener("click", () => {
      const qi = +btn.dataset.q, oi = +btn.dataset.o;
      const q = quiz[qi];
      root.querySelectorAll(`.quiz-opt[data-q="${qi}"]`).forEach((b, i) => {
        b.disabled = true;
        if (i === q.answer) b.classList.add("correct");
      });
      if (oi !== q.answer) btn.classList.add("wrong");
      root.querySelector(`[data-explain="${qi}"]`).hidden = false;
    }));
}

/* ---------------- 启动 ---------------- */
render();
