// math.js —— 全课统一的公式排版（KaTeX，本地 vendor/katex，离线可用）。
// 课文语法（见 AUTHORING.md §2.1）：
//   · 独立公式块：以 $$ 开头的段落，块内每一行是一条 LaTeX 公式（显示模式）。
//   · 行内公式：\( … \)。课文源码里是模板字符串/双引号字符串，所以反斜杠一律写两个：\\( \\frac{a}{b} \\)。
//   · 中文与说明文字放进 \text{…}。
// app.js、demos/_fin.js 与 tools/check_math.mjs 共用这里的解析规则，保证“看到的”与“校验的”一致。
import katex from "./vendor/katex/katex.mjs";

const OPTS = { throwOnError: false, strict: "ignore", output: "html", trust: false };
const escHTML = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// 渲染一条 LaTeX；display=true 为独立公式。出错时退回显示源码（并标红），绝不让页面崩掉。
export function tex(src, display = false) {
  try { return katex.renderToString(String(src), { ...OPTS, displayMode: display }); }
  catch { return `<code class="tex-err">${escHTML(src)}</code>`; }
}

// 行内公式 \( … \)（允许跨行，非贪婪）
export const INLINE_MATH = /\\\(([\s\S]+?)\\\)/g;

// 从一个 $$ 段落里取出每一行公式
export function blockLines(block) {
  const lines = block.trim().split("\n").map((l) => l.trim().replace(/^\$\$\s?/, "").replace(/\s?\$\$$/, "").trim());
  return lines.filter((l) => l.length > 0);
}

// 把一段“原样透传”的 HTML（表格、图注）里的 \( … \) 换成排好的公式；不碰 <svg> 内部
export function mathifyRaw(html) {
  const parts = String(html).split(/(<svg[\s\S]*?<\/svg>)/);
  return parts.map((p) => (p.startsWith("<svg") ? p : p.replace(INLINE_MATH, (m, x) => tex(x, false)))).join("");
}

// 先把行内公式抠出来换成占位符，处理完 Markdown 再放回——避免公式里的 * _ ` 被当成格式
export function protectMath(s) {
  const found = [];
  const out = String(s).replace(INLINE_MATH, (m, x) => { found.push(x); return `\u0000${found.length - 1}\u0000`; });
  return { text: out, restore: (html) => html.replace(/\u0000(\d+)\u0000/g, (m, i) => tex(found[+i], false)) };
}
