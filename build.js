#!/usr/bin/env node
/* build.js — assembles the single-file threatlab.html from /src.
   Usage: node build.js
   Requires: npm install (see package.json) for @babel/standalone, react, react-dom.
   Output: threatlab.html (self-contained, offline, no CDN). */

const fs = require("fs");
const path = require("path");
const Babel = require("@babel/standalone");

const SRC = path.join(__dirname, "src");
const read = (f) => fs.readFileSync(path.join(SRC, f), "utf8");

// 1. Gather modules, stripping ES export keywords so they concat into one scope.
const data = read("data.js")
  .replace(/export const DATA =/, "const DATA =")
  .replace(/export const QUIZ =/, "const QUIZ =")
  .replace(/export const CHAINS =/, "const CHAINS =")
  .replace(/export const SANDBOX =/, "const SANDBOX_UNUSED =");
const sandbox = read("sandbox.js").replace(/export const SANDBOX =/, "const SANDBOX =");
const ix   = read("interactive_llm01.js").replace(/export const IX =/, "const IX =");
const ix1b = read("interactive_llm02-05.js").replace(/export const IX1B =/, "const IX1B =");
const ix2  = read("interactive_llm06-10.js").replace(/export const IX2 =/, "const IX2 =");
const ix3a = read("interactive_asi01-05.js").replace(/export const IX3A =/, "const IX3A =");
const ix3b = read("interactive_asi06-10.js").replace(/export const IX3B =/, "const IX3B =");
const rc   = read("realconfig.js").replace(/export const REALCONFIG =/, "const REALCONFIG =");

let app = read("app-src.jsx")
  .replace(/import React[^;]*;\n/, "")
  .replace(/import \{ DATA, QUIZ, CHAINS \} from "\.\/data\.js";\n/, "")
  .replace(/import \{ SANDBOX \} from "\.\/sandbox\.js";\n/, "")
  .replace(/import \{ IX \} from "\.\/interactive_llm01\.js";\n/, "")
  .replace(/import \{ IX1B \} from "\.\/interactive_llm02-05\.js";\n/, "")
  .replace(/import \{ IX2 \} from "\.\/interactive_llm06-10\.js";\n/, "")
  .replace(/import \{ IX3A \} from "\.\/interactive_asi01-05\.js";\n/, "")
  .replace(/import \{ IX3B \} from "\.\/interactive_asi06-10\.js";\n/, "")
  .replace(/import \{ REALCONFIG \} from "\.\/realconfig\.js";\n/, "")
  .replace(/export default function App/, "function App");

const hooks = "const { useState, useEffect, useRef, useMemo, useCallback } = React;\n";
let code = hooks + [data, sandbox, ix, ix1b, ix2, ix3a, ix3b, rc, app].join("\n");

// 2. Inject localStorage persistence for progress (works when served, not in sandboxed iframes).
code = code.replace(
  "const [learned, setLearned] = useState({});",
  "const [learned,setLearned]=useState(()=>{try{return JSON.parse(localStorage.getItem('threatlab.learned')||'{}')}catch{return{}}});useEffect(()=>{try{localStorage.setItem('threatlab.learned',JSON.stringify(learned))}catch{}},[learned]);"
);

// 3. Pre-compile JSX to plain JS (classic runtime) so no in-browser Babel is needed.
const compiled = Babel.transform(code, { presets: [["react", { runtime: "classic" }]] }).code;

// 4. Inline React + ReactDOM UMD builds (fully offline, no CDN).
const reactUMD = fs.readFileSync(path.join(__dirname, "node_modules/react/umd/react.production.min.js"), "utf8");
const reactDOMUMD = fs.readFileSync(path.join(__dirname, "node_modules/react-dom/umd/react-dom.production.min.js"), "utf8");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>THREATLAB — Interactive OWASP LLM & Agentic AI Security</title>
<meta name="description" content="Trace real AI attacks step by step, then watch the defenses stop them. OWASP LLM Top 10 (2025) and Agentic/ASI Top 10 (2026)." />
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;background:#0b0e14}#root{min-height:100vh}.boot{color:#8a93a6;font-family:ui-monospace,monospace;padding:48px 24px;text-align:center;font-size:14px}.boot b{color:#38e0c8}.boot .err{color:#ff8fa3;text-align:left;max-width:640px;margin:16px auto 0;background:#160e14;border:1px solid #3a1f2c;border-radius:10px;padding:14px;white-space:pre-wrap;font-size:12.5px}</style>
</head>
<body>
<div id="root"><div class="boot"><b>THREATLAB</b> loading…</div></div>
<script>${reactUMD}</script>
<script>${reactDOMUMD}</script>
<script>
try {
${compiled}
  var root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(App));
} catch (e) {
  document.getElementById("root").innerHTML = "<div class=\\"boot\\"><b>THREATLAB</b> hit an error:<div class=\\"err\\">" + (e && e.message ? e.message : e) + "</div></div>";
}
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, "threatlab.html"), html);
fs.writeFileSync(path.join(__dirname, "index.html"), html); // clean root URL on GitHub Pages
console.log("Built threatlab.html + index.html —", html.length, "bytes");
