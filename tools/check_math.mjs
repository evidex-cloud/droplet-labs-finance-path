// 公式校验：node tools/check_math.mjs [lesson-id …]   （不带参数 = 全课；--demos 同时检查演示源码）
// 规则（AUTHORING.md §2.1）：
//  1. 每条公式（$$ 块的每一行、行内 \( … \)、表格/图注里的 \( … \)）都必须能被 KaTeX 无错误地解析；
//  2. 公式里的中文必须放进 \text{…}；
//  3. 反斜杠转义事故：公式字符串里出现 \b \f \t \v \r 等控制字符（= 源码里只写了一个反斜杠），或源码里出现单反斜杠的 LaTeX 命令；
//  4. 公式之外不许残留“纯文本公式”：÷ × = ≈ ^ Σ √ ∑ 与 ² ³ ⁿ ₁ 这类上下标字符（代码 `…`、SVG 图、链接除外）。
// 退出码 1 = 有错误。
import katex from "../vendor/katex/katex.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { INLINE_MATH, blockLines } from "../math.js";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const manifest = fs.readFileSync(path.join(ROOT, "content/manifest.js"), "utf8");
const args = process.argv.slice(2);
const checkDemos = args.includes("--demos");
const showSoft = args.includes("--review");
let ids = args.filter((a) => !a.startsWith("--"));
const all = [...manifest.matchAll(/\{ id: "([^"]+)", title: "[^"]*", titleEn: "[^"]*", module: "([^"]+)"/g)].map((m) => ({ id: m[1], module: m[2] }));
const pick = ids.length ? all.filter((x) => ids.includes(x.id)) : all;
if (ids.length && pick.length !== ids.length) console.log("unknown ids:", ids.filter((i) => !all.find((x) => x.id === i)).join(", "));

const strict = (code) => (code === "unicodeTextInMathMode" ? "error" : "ignore");
const CTRL = /[\x08\x09\x0B\x0C\x0D]/;
const HARD = /[÷^Σ∑√∏²³¹⁰⁴⁵⁶⁷⁸⁹ⁿᵏᵗ₀₁₂₃₄₅₆₇₈₉ₙₖₜ]/;          // 公式之外出现即失败
const SOFT = /[A-Za-z0-9一-鿿)）%]\s*[=≈×]\s*[-−$A-Za-z0-9一-鿿(（]/; // 公式之外出现要人工复核（多数应改成公式）
const ARITH = /\d[\d,.]*%?\s*[+−–]\s*\$?\d|\d\s*[×x]\s*\d/; // 数字加减乘也是算式
const SOFT_OK = /7\s*×\s*24|24\s*×\s*7/g;
const SINGLE_BS = /(?<!\\)\\(frac|dfrac|tfrac|sum|text|times|div|cdot|left|right|approx|sqrt|leq?|geq?|neq?|infty|Delta|delta|sigma|mu|alpha|beta|gamma|pi|ln|log|max|min|quad|qquad|mathrm|mathbf|bar|hat|underbrace|overbrace|begin|end|pm|to|rightarrow|Rightarrow|Leftrightarrow|prod|partial|lim|exp|operatorname|big|Big|dots|ldots|cdots|%|\$)(?![A-Za-z])/;

function renderOK(src, display) {
  try { katex.renderToString(src, { displayMode: display, throwOnError: true, strict }); return null; }
  catch (e) { return e.message.replace(/\s+/g, " ").slice(0, 160); }
}

// 把一段正文拆成“公式”和“非公式文字”
function scanText(text, where, out) {
  const paras = String(text).split(/\n\s*\n/);
  for (const para of paras) {
    const b = para.trim();
    if (!b) continue;
    if (b.startsWith("$$")) {
      for (const line of blockLines(b)) out.math.push({ src: line, display: true, where });
      continue;
    }
    // 原样透传块：去掉 <svg>…</svg>，其余 HTML 标签去掉后当文字查
    let body = b;
    if (b.startsWith("<figure") || b.startsWith("<svg") || b.startsWith("<table")) {
      out.svgs += (b.match(/<svg/g) || []).length;
      body = b.replace(/<svg[\s\S]*?<\/svg>/g, " ");
    }
    body = body.replace(INLINE_MATH, (m, x) => { out.math.push({ src: x, display: false, where }); return " ⟦M⟧ "; });
    body = body.replace(/<[^>]+>/g, " ").replace(/`[^`]*`/g, " ").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/https?:\/\/\S+/g, " ");
    for (const line of body.split("\n")) {
      if (/\\[A-Za-z()[\]{}]|\$\$/.test(line)) { out.stray.push({ where, text: line.trim().slice(0, 150) }); continue; }
      if (HARD.test(line)) out.left.push({ where, text: line.trim().slice(0, 150) });
      else if (SOFT.test(line.replace(SOFT_OK, " ")) || ARITH.test(line.replace(SOFT_OK, " ").replace(/\d{4}\s*[–−-]\s*\d{2,4}/g, " "))) out.soft.push({ where, text: line.trim().slice(0, 150) });
    }
  }
}

function collect(d) {
  const out = { math: [], left: [], soft: [], stray: [], svgs: 0 };
  scanText(d.oneLiner, "oneLiner", out);
  for (const k of ["intuition", "mechanics", "analogy"]) scanText(d[k], k, out);
  (d.misconceptions || []).forEach((m, i) => scanText(m, `misconceptions[${i}]`, out));
  (d.quiz || []).forEach((q, i) => {
    scanText(q.q, `quiz[${i}].q`, out);
    q.options.forEach((o, j) => scanText(o, `quiz[${i}].options[${j}]`, out));
    scanText(q.explain || "", `quiz[${i}].explain`, out);
  });
  (d.further || []).forEach((f, i) => scanText(f.label, `further[${i}]`, out));
  return out;
}

let bad = 0, nMath = 0, softTotal = 0;
for (const { id, module } of pick) {
  const zh = path.join(ROOT, module.replace("./", ""));
  const en = zh.replace(`${path.sep}lessons${path.sep}`, `${path.sep}lessons${path.sep}en${path.sep}`).replace("content/lessons/", "content/lessons/en/");
  const probs = [], warns = [];
  for (const [lng, file] of [["zh", zh], ["en", en]]) {
    if (!fs.existsSync(file)) { probs.push(`[${lng}] missing ${file}`); continue; }
    const raw = fs.readFileSync(file, "utf8");
    const sb = raw.split("\n").map((l, i) => [i + 1, l]).filter(([, l]) => SINGLE_BS.test(l));
    sb.slice(0, 5).forEach(([n, l]) => probs.push(`[${lng}] line ${n}: single backslash LaTeX (write \\\\ in source): ${l.trim().slice(0, 110)}`));
    let d;
    try { d = (await import(pathToFileURL(file).href + "?t=" + Date.now())).default; }
    catch (e) { probs.push(`[${lng}] import failed: ${String(e).slice(0, 200)}`); continue; }
    const c = collect(d);
    nMath += c.math.length;
    for (const m of c.math) {
      if (CTRL.test(m.src)) { probs.push(`[${lng}] ${m.where}: control character in formula (a single backslash got eaten: \\f \\t \\b \\v \\r): ${JSON.stringify(m.src).slice(0, 110)}`); continue; }
      if (!m.display && /\n/.test(m.src)) probs.push(`[${lng}] ${m.where}: inline formula spans a newline (check for a \\n eaten from \\neq/\\nu): ${JSON.stringify(m.src).slice(0, 110)}`);
      if (/(?<!\\)%/.test(m.src)) probs.push(`[${lng}] ${m.where}: unescaped % in formula (LaTeX comment, write \\\\% in source): ${m.src.slice(0, 90)}`);
      if (/[²³¹⁰⁴⁵⁶⁷⁸⁹ⁿᵏᵗ₀₁₂₃₄₅₆₇₈₉ₙₖₜ]/.test(m.src)) probs.push(`[${lng}] ${m.where}: Unicode super/subscript inside formula — use ^{…} / _{…}: ${m.src.slice(0, 90)}`);
      const err = renderOK(m.src, m.display);
      if (err) probs.push(`[${lng}] ${m.where}: KaTeX error: ${err}  ← ${m.src.slice(0, 90)}`);
    }
    c.stray.forEach((x) => probs.push(`[${lng}] ${x.where}: stray LaTeX outside math (unclosed \( … \) or a $$ mid-paragraph?): ${x.text}`));
    c.left.slice(0, 12).forEach((x) => probs.push(`[${lng}] ${x.where}: plain-text formula outside math (÷ ^ Σ √ or super/subscript): ${x.text}`));
    if (c.left.length > 12) probs.push(`[${lng}] … and ${c.left.length - 12} more plain-text formula lines`);
    if (showSoft) c.soft.forEach((x) => warns.push(`[${lng}] ${x.where}: review (= ≈ × outside math): ${x.text}`));
    softTotal += c.soft.length;
  }
  if (probs.length) { bad++; console.log("FAIL", id); probs.forEach((p) => console.log("   -", p)); }
  else console.log("OK  ", id);
  warns.forEach((w) => console.log("   ?", w));
}

if (checkDemos) {
  const want = new Set(pick.map((x) => x.id));
  const files = fs.readdirSync(path.join(ROOT, "demos")).filter((f) => !f.startsWith("_") && want.has(f.replace(/\.js$/, "")));
  let dw = 0;
  for (const f of files) {
    const src = fs.readFileSync(path.join(ROOT, "demos", f), "utf8").split("\n");
    // 只看“给读者看的字符串”：双引号字符串与模板字符串的文字部分（去掉 ${…}），跳过已经用 tex( 的行
    const shown = (l) => [...l.matchAll(/"((?:[^"\\]|\\.)*)"|`([^`]*)`/g)].map((m) => (m[1] ?? m[2] ?? "").replace(/\$\{[^}]*\}/g, " ")).join(" | ");
    const hits = src.map((l, i) => [i + 1, l, shown(l)]).filter(([, l, t]) => !/^\s*\/\//.test(l) && !/tex\(/.test(l) && (HARD.test(t.replace(/\^/g, "")) || /\^[({0-9a-z]/.test(t) || SOFT.test(t.replace(SOFT_OK, " "))) && !/var\(--|class=|style=|<svg|viewBox|#[a-z]+-/.test(t.slice(0, 0)));
    if (hits.length) { dw++; console.log("DEMO?", f, `${hits.length} line(s) with plain-text formulas outside tex():`); hits.slice(0, 8).forEach(([n, , t]) => console.log(`     ${n}: ${t.trim().slice(0, 140)}`)); }
  }
  console.log(`\ndemos with possible plain-text formulas: ${dw}`);
}
console.log(`\n${pick.length} lessons checked, ${nMath} formulas rendered, ${softTotal} lines to review (--review lists them), ${bad} failing`);
process.exit(bad ? 1 : 0);
