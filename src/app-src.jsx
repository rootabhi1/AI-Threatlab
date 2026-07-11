import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { DATA, QUIZ, CHAINS } from "./data.js";
import { SANDBOX } from "./sandbox.js";
import { IX } from "./interactive_batch1.js";
import { IX1B } from "./interactive_batch1b.js";
import { IX2 } from "./interactive_batch2.js";
import { IX3A } from "./interactive_batch3a.js";
import { IX3B } from "./interactive_batch3b.js";
import { REALCONFIG } from "./realconfig.js";

/* ---------- icons ---------- */
function LinkedInIcon() {
  return (
    <svg className="li-ico" viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
    </svg>
  );
}

function Glyph({ name, size = 22 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const g = {
    syringe: <path d="M14 4l6 6M18 6l-9 9-4 1 1-4 9-9zM5 15l4 4" />,
    leak: <path d="M12 3c3 4 6 6 6 10a6 6 0 1 1-12 0c0-4 3-6 6-10z" />,
    chain: <path d="M9 12h6M8 8a3 3 0 0 0 0 6M16 16a3 3 0 0 0 0-6" />,
    flask: <path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3" />,
    brackets: <path d="M8 4H5v16h3M16 4h3v16h-3" />,
    robot: <><rect x="4" y="8" width="16" height="11" rx="2" /><path d="M12 4v4M9 13h.01M15 13h.01M9 17h6" /></>,
    scroll: <path d="M6 4h10v14a2 2 0 0 1-2 2H7M6 4a2 2 0 0 0-2 2v1h4M16 4a2 2 0 0 1 2 2" />,
    vectors: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 17l8-9M8 18h8" /></>,
    ghost: <path d="M6 20V11a6 6 0 0 1 12 0v9l-2-1-2 1-2-1-2 1-2-1zM9 10h.01M15 10h.01" />,
    fire: <path d="M12 3c1 4-2 4-2 7a2 2 0 0 0 4 0c0 3 3 3 3 6a5 5 0 0 1-10 0c0-4 5-5 5-13z" />,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>,
    wrench: <path d="M15 6a4 4 0 0 0-5 5L4 17l3 3 6-6a4 4 0 0 0 5-5l-2 2-2-1-1-2 2-2z" />,
    badge: <><circle cx="12" cy="9" r="4" /><path d="M8 13l-1 8 5-3 5 3-1-8" /></>,
    plug: <path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0zM12 16v5" />,
    terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3M13 15h4" /></>,
    brain: <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 4 3 3 0 0 0 3 2V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-2 4 3 3 0 0 1-3 2V4z" />,
    network: <><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7l-6 10M12 7l6 10M7 19h10" /></>,
    dominoes: <><rect x="4" y="4" width="6" height="16" rx="1" /><rect x="14" y="4" width="6" height="16" rx="1" /><path d="M7 8v8M17 8v8" /></>,
    mask: <path d="M4 5c4 1 12 1 16 0 1 6-2 12-8 14C6 17 3 11 4 5zM9 10h.01M15 10h.01" />,
    alert: <path d="M12 3l9 16H3zM12 10v4M12 17h.01" />,
    link: <path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></>,
    copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>,
  };
  return <svg {...p}>{g[name] || g.alert}</svg>;
}

const ACTOR = {
  attacker: { color: "#ff5c7a", prefix: "atk" },
  user: { color: "#7db4ff", prefix: "usr" },
  system: { color: "#8a93a6", prefix: "sys" },
  model: { color: "#38e0c8", prefix: "llm" },
  agent: { color: "#c58bff", prefix: "agt" },
};

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Diagram ---------- */
function Diagram({ nodes, activeKey, blockKey, accent, mode, litTo, order }) {
  const n = nodes.length;
  const pad = 46, w = 100, y = 60;
  const gap = n > 1 ? (700 - pad * 2 - w) / (n - 1) : 0;
  const pos = nodes.map((_, i) => ({ x: pad + i * gap, y }));
  const idx = Object.fromEntries(nodes.map((nd, i) => [nd.key, i]));
  const activeIdx = activeKey != null ? idx[activeKey] : -1;
  const packetCol = mode === "secured" ? "#4ade80" : "#ff5c7a";
  const reduced = prefersReduced();
  return (
    <svg className="diagram" viewBox="0 0 700 130" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Attack flow diagram">
      {nodes.slice(0, -1).map((_, i) => {
        const a = pos[i], b = pos[i + 1];
        const lit = litTo != null && i < litTo;
        const isBlockEdge = blockKey && order[i + 1] === blockKey;
        return (
          <g key={i}>
            <line x1={a.x + w} y1={a.y} x2={b.x} y2={b.y} className="edge" />
            {lit && <line x1={a.x + w} y1={a.y} x2={b.x} y2={b.y} className="edge-flow" style={{ stroke: isBlockEdge ? "#4ade80" : packetCol }} />}
          </g>
        );
      })}
      {/* traveling packet on the current edge */}
      {activeIdx > 0 && (() => {
        const a = pos[activeIdx - 1], b = pos[activeIdx];
        const x1 = a.x + w, x2 = b.x;
        const isBlk = blockKey && order[activeIdx] === blockKey;
        const cx = isBlk ? (x1 + x2) / 2 : x2;
        return (
          <g key={"pk" + activeIdx}>
            <circle r="8.5" cy={y} cx={reduced ? cx : x1} style={{ fill: packetCol, opacity: .3 }}>
              {!reduced && <animate attributeName="cx" from={x1} to={cx} dur="0.85s" fill="freeze" />}
            </circle>
            <circle r="5" cy={y} cx={reduced ? cx : x1} className="packet-core" style={{ fill: packetCol, color: packetCol }}>
              {!reduced && <animate attributeName="cx" from={x1} to={cx} dur="0.85s" fill="freeze" />}
            </circle>
          </g>
        );
      })()}
      {nodes.map((nd, i) => {
        const p = pos[i];
        const on = activeKey === nd.key;
        const isBlock = blockKey === nd.key;
        return (
          <g key={nd.key} transform={`translate(${p.x},${p.y})`}>
            {on && <circle cx={w / 2} cy="0" className="node-pulse" style={{ stroke: isBlock ? "#4ade80" : accent }} />}
            <rect x="0" y="-20" width={w} height="40" rx="9" className={`node ${on ? "node-on" : ""}`}
              style={on ? { stroke: isBlock ? "#4ade80" : accent, filter: `drop-shadow(0 0 9px ${isBlock ? "#4ade80" : accent}66)` } : {}} />
            <text x={w / 2} y="0" className="node-label" dominantBaseline="middle" textAnchor="middle">{nd.label}</text>
            {isBlock && <text x={w / 2} y="-30" className="shield-emoji" textAnchor="middle">🛡</text>}
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Theater with replay controls (play/pause/step) ---------- */
function Theater({ sub, accent, ix, realCfg }) {
  const [mode, setMode] = useState("attack");
  const order = sub.nodes.map(n => n.key);
  const [selPay, setSelPay] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [cfg, setCfg] = useState(() => {
    const o = {}; (ix?.configs || []).forEach(c => o[c.id] = "ins"); return o;
  });
  const [cursor, setCursor] = useState(-1);   // index of node reached; -1 = not started
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const timer = useRef(null);
  const stop = () => { clearTimeout(timer.current); timer.current = null; };
  const reset = useCallback(() => { stop(); setCursor(-1); setPlaying(false); setBlocked(false); }, []);
  useEffect(() => { reset(); setCfg(() => { const o = {}; (ix?.configs || []).forEach(c => o[c.id] = "ins"); return o; }); }, [sub, mode, reset, ix]);
  useEffect(() => () => stop(), []);

  // which node blocks (defense mode, earliest secure control)
  const blockAt = useMemo(() => {
    if (mode !== "secured" || !ix) return null;
    let best = null, bi = 99;
    (ix.configs || []).forEach(c => { if (cfg[c.id] === "sec") { const i = order.indexOf(c.blockAt); if (i >= 0 && i < bi) { bi = i; best = c; } } });
    return best;
  }, [mode, ix, cfg, order]);

  const advance = useCallback(() => {
    setCursor(c => {
      const next = c + 1;
      if (blockAt && order[next] === blockAt.blockAt) { setBlocked(true); setPlaying(false); return next; }
      if (next >= order.length - 1) { setPlaying(false); }
      return Math.min(next, order.length - 1);
    });
  }, [blockAt, order]);

  useEffect(() => {
    if (!playing) return;
    if (blocked) { setPlaying(false); return; }
    if (cursor >= order.length - 1) { setPlaying(false); return; }
    const dur = prefersReduced() ? 500 : 1900;
    timer.current = setTimeout(() => advance(), cursor < 0 ? 250 : dur);
    return () => stop();
  }, [playing, cursor, advance, order.length, blocked]);

  // legacy fallback for not-yet-upgraded categories
  if (!ix) return <LegacyTheater sub={sub} accent={accent} />;

  const started = cursor >= 0;
  const done = !playing && (blocked || cursor >= order.length - 1) && started;
  const curKey = started ? order[Math.max(0, cursor)] : null;
  const rx = curKey ? ix.reactions[curKey] : null;
  const activeCtrl = blocked ? blockAt : null;

  const play = () => { if (done) { reset(); setTimeout(() => setPlaying(true), 30); } else setPlaying(p => !p); };

  return (
    <div className="theater">
      <div className="theater-bar">
        <div className="app-chip"><span className="app-dot" style={{ background: accent }} /><span className="app-name">{sub.app}</span></div>
        <div className="mode-toggle" role="tablist" aria-label="Attack or defense mode">
          <button role="tab" aria-selected={mode === "attack"} className={mode === "attack" ? "on atk" : ""} onClick={() => setMode("attack")}>attack lab</button>
          <button role="tab" aria-selected={mode === "secured"} className={mode === "secured" ? "on def" : ""} onClick={() => setMode("secured")}>defense lab</button>
        </div>
      </div>

      {mode === "attack" ? (
        <div className="ix-setup">
          <div className="ix-h">the payload — a real artifact</div>
          <Artifact art={ix.artifact} revealed={revealed} setRevealed={setRevealed} />
        </div>
      ) : (
        <div className="ix-setup">
          <div className="ix-h">set each control — then run to see if it holds</div>
          {ix.configs.map(c => (
            <div key={c.id} className="ctrl">
              <div className="ctrl-top"><span className="ctrl-name">{c.name}</span>
                <span className="cfg-toggle">
                  <button className={cfg[c.id] === "ins" ? "on ins" : ""} onClick={() => setCfg(v => ({ ...v, [c.id]: "ins" }))}>insecure</button>
                  <button className={cfg[c.id] === "sec" ? "on sec" : ""} onClick={() => setCfg(v => ({ ...v, [c.id]: "sec" }))}>secure</button>
                </span>
              </div>
              <div className={`cfg-view ${cfg[c.id]}`}><span className="cfg-label">{cfg[c.id] === "ins" ? "insecure config" : "secure config"}</span>{cfg[c.id] === "ins" ? c.ins : c.sec}</div>
            </div>
          ))}
          {realCfg && realCfg.length > 0 && (
            <Collapsible label="Real production config (verified, adapt to your environment)" accent={accent}>
              {realCfg.map((rc, i) => (
                <div key={i} className="realcfg">
                  <div className="realcfg-label">{rc.label}</div>
                  <pre className="realcfg-code"><span className="realcfg-lang">{rc.lang}</span>{rc.code}</pre>
                  <div className="realcfg-src">source: {rc.source}</div>
                </div>
              ))}
            </Collapsible>
          )}
        </div>
      )}

      <Diagram nodes={sub.nodes} activeKey={curKey} blockKey={blocked ? blockAt.blockAt : null} accent={accent} mode={mode} litTo={cursor} order={order} />

      <div className="reaction" aria-live="polite">
        {!started && <div className="rx-idle"><span className="blink">▊</span> press <b>run</b> to {mode === "attack" ? "watch the attack travel" : "test your controls"}</div>}
        {started && activeCtrl && (
          <>
            <span className="rx-badge" style={{ background: "#0c1f18", color: "#7fe0a8" }}>defense · blocked</span>
            <div className="rx-txt">🛡 <b>Blocked here.</b> Your <b>{activeCtrl.name}</b> (secure) stops the attack at this stage — it never reaches the end.</div>
            <div className="rx-art"><span className="sec">{activeCtrl.sec}</span></div>
          </>
        )}
        {started && !activeCtrl && rx && (
          <>
            <span className="rx-badge" style={{ background: ACTORBG[curKey] || "#0e131d", color: "#c7d0df" }}>{curKey}</span>
            <div className="rx-txt">{rx.t}</div>
            <div className="rx-art" dangerouslySetInnerHTML={{ __html: rx.art }} />
          </>
        )}
      </div>

      <div className="theater-foot">
        <button className="btn-play" onClick={play} style={{ borderColor: mode === "secured" ? "#4ade80" : "#ff5c7a", color: mode === "secured" ? "#4ade80" : "#ff8fa3" }}>
          {playing ? "❚❚ pause" : done ? "↻ replay" : "▶ run"}
        </button>
        <button className="btn-step" onClick={() => { setPlaying(false); if (done) reset(); else advance(); }}>⏭ step</button>
        <button className="btn-ghost" onClick={reset}>reset</button>
        {done && <span className="verdict-tag" style={{ color: blocked ? "#4ade80" : "#ff8fa3" }}>{blocked ? "✓ defense held · attack stopped" : "◉ payload reached the target · breach"}</span>}
      </div>
    </div>
  );
}

const ACTORBG = { user: "#0f1826", prompt: "#0e131d", in: "#0f1826", mail: "#26121a", img: "#26121a", rag: "#0f1826", filter: "#0e131d", model: "#0c1f18", vlm: "#0c1f18", render: "#0e131d", out: "#0e131d", act: "#0e131d", exfil: "#26121a" };

function Artifact({ art, revealed, setRevealed }) {
  if (art.kind === "email") {
    return (
      <div className={`email ${revealed ? "reveal" : ""}`} onMouseEnter={() => setRevealed(true)} onMouseLeave={() => setRevealed(false)}>
        <div className="email-hd"><div className="email-row">From: <b>{art.from}</b></div><div className="email-row">To: you@company.example</div><div className="email-subj">{art.subj}</div></div>
        <div className="email-body">{art.visible} <span className="hidden-instr" title="tap to reveal hidden instruction" onClick={() => setRevealed(r => !r)}>{art.hidden}</span></div>
        <div className="email-foot"><span className="email-tag">what a human sees vs. what the model reads</span>
          <button className="reveal-btn" onClick={() => setRevealed(r => !r)}>{revealed ? "hide hidden text" : "reveal hidden text"}</button></div>
      </div>
    );
  }
  if (art.kind === "image") {
    return (
      <div className={`email ${revealed ? "reveal" : ""}`} onMouseEnter={() => setRevealed(true)} onMouseLeave={() => setRevealed(false)}>
        <div className="email-hd"><div className="email-row">file: <b>{art.subj}</b></div></div>
        <div className="email-body">🖼 {art.visible} <span className="hidden-instr" title="tap to reveal hidden instruction" onClick={() => setRevealed(r => !r)}>{art.hidden}</span></div>
        <div className="email-foot"><span className="email-tag">visible image vs. text hidden inside it</span>
          <button className="reveal-btn" onClick={() => setRevealed(r => !r)}>{revealed ? "hide hidden text" : "reveal hidden text"}</button></div>
      </div>
    );
  }
  // chat
  return (
    <div className="chatart">
      {art.lines.map((l, i) => (
        <div key={i} className={`chatline ${l.who}`}>
          <span className="chat-who">{l.who}</span>
          <span className="chat-txt">{l.txt}{l.hiddenNote && <span className="chat-note"> · {l.hiddenNote}</span>}</span>
        </div>
      ))}
    </div>
  );
}


function LegacyTheater({ sub, accent }) {
  const [mode, setMode] = useState("attack");
  const [cursor, setCursor] = useState(0);      // how many steps revealed
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);
  const consoleRef = useRef(null);
  const steps = sub.console;

  const stopTimer = () => { clearTimeout(timer.current); timer.current = null; };
  const reset = useCallback(() => { stopTimer(); setCursor(0); setPlaying(false); }, []);
  useEffect(() => { reset(); }, [sub, mode, reset]);
  useEffect(() => () => stopTimer(), []);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [cursor]);

  // does defense halt at step i?
  const blockIndex = useMemo(() => {
    if (mode !== "secured") return -1;
    return steps.findIndex(s => s.block);
  }, [steps, mode]);
  const lastIndex = blockIndex >= 0 ? blockIndex : steps.length - 1;

  const advance = useCallback(() => {
    setCursor(c => Math.min(c + 1, lastIndex + 1));
  }, [lastIndex]);

  useEffect(() => {
    if (!playing) return;
    if (cursor > lastIndex) { setPlaying(false); return; }
    const dur = prefersReduced() ? 400 : 1250;
    timer.current = setTimeout(() => advance(), dur);
    return () => stopTimer();
  }, [playing, cursor, advance, lastIndex]);

  const done = cursor > lastIndex;
  const outcome = done ? (blockIndex >= 0 ? "blocked" : "breach") : null;

  const shown = steps.slice(0, cursor).map((s, i) => {
    const a = ACTOR[s.actor] || ACTOR.system;
    const blocked = mode === "secured" && i === blockIndex;
    return { ...s, i, color: a.color, prefix: a.prefix, blocked };
  });
  const activeStep = shown[shown.length - 1];

  return (
    <div className="theater">
      <div className="theater-bar">
        <div className="app-chip"><span className="app-dot" style={{ background: accent }} />
          <span className="app-name">{sub.app}</span></div>
        <div className="mode-toggle" role="tablist" aria-label="Attack or defense mode">
          <button role="tab" aria-selected={mode === "attack"} className={mode === "attack" ? "on atk" : ""} onClick={() => setMode("attack")}>run attack</button>
          <button role="tab" aria-selected={mode === "secured"} className={mode === "secured" ? "on def" : ""} onClick={() => setMode("secured")}>run defense</button>
        </div>
      </div>

      <Diagram nodes={sub.nodes} active={activeStep?.at} edge={activeStep?.edge} blockedNode={blockIndex >= 0 && done ? (steps[blockIndex].edge ? steps[blockIndex].edge[1] : steps[blockIndex].at) : null} accent={accent} mode={mode} />

      <div className="console" ref={consoleRef} aria-live="polite">
        {shown.length === 0 && (
          <div className="console-idle"><span className="blink">▊</span> press <b>play</b> or <b>step</b> to trace the {mode === "attack" ? "real attack" : "defended flow"}</div>
        )}
        {shown.map(l => (
          <div key={l.i} className="cline appear">
            <div className="cline-head"><span className="cprefix" style={{ color: l.color }}>[{l.prefix}]</span><span className="clog">{l.log}</span></div>
            {l.payload && <pre className="cpayload" style={l.blocked ? { borderLeftColor: "#3a7a5a" } : {}}>{l.payload}</pre>}
            {l.blocked && <div className="ccontrol"><span className="cctrl-badge">🛡 control</span><span>{l.control}</span></div>}
          </div>
        ))}
        {outcome === "breach" && <div className="cline appear"><div className="outcome bad"><span className="oc-tag">◉ breach</span>{sub.breach}</div></div>}
        {outcome === "blocked" && <div className="cline appear"><div className="outcome good"><span className="oc-tag">✓ stopped</span>The control above halted the attack before it completed.</div></div>}
      </div>

      <div className="theater-foot">
        <button className="btn-play" onClick={() => { if (done) reset(); setPlaying(p => !p); }}
          style={{ borderColor: mode === "secured" ? "#4ade80" : "#ff5c7a", color: mode === "secured" ? "#4ade80" : "#ff8fa3" }}>
          {playing ? "❚❚ pause" : done ? "↻ replay" : "▶ play"}
        </button>
        <button className="btn-step" onClick={() => { setPlaying(false); if (done) reset(); else advance(); }} disabled={done && cursor > lastIndex && !playing && false}>⏭ step</button>
        <button className="btn-ghost" onClick={reset}>reset</button>
        <span className="foot-note">{mode === "attack" ? "real attack chain · actual payload" : "watch where a control stops it"}</span>
      </div>
    </div>
  );
}

/* ---------- Framework chips ---------- */
function Frameworks({ fw }) {
  if (!fw) return null;
  return (
    <div className="fw">
      <div className="fw-row"><span className="fw-tag">MITRE ATLAS</span><span className="fw-val">{fw.atlas}</span></div>
      <div className="fw-row"><span className="fw-tag">NIST AI RMF</span><span className="fw-val">{fw.nist}</span></div>
    </div>
  );
}

/* ---------- PDF export (print current sub-technique) ---------- */
function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function exportSubPDF(item, sub) {
  const playbook = (sub.playbook || []).map((p, i) =>
    `<li><b>${esc(p.title)}.</b> ${esc(p.detail)}</li>`).join("");
  const inc = sub.incident || {};
  const fw = item.frameworks || {};
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(item.id)} — ${esc(sub.name)}</title>
<style>
@page{margin:18mm 16mm}
*{box-sizing:border-box}
body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#14181f;line-height:1.5;font-size:12pt;margin:0}
.hd{border-bottom:2px solid #14181f;padding-bottom:10px;margin-bottom:16px}
.kicker{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10pt;letter-spacing:.06em;color:#5b6478;text-transform:uppercase}
h1{font-size:20pt;margin:4px 0 2px}
.oneliner{font-style:italic;color:#3a4250;margin:2px 0 0}
h2{font-size:12pt;text-transform:uppercase;letter-spacing:.05em;color:#5b6478;border-bottom:1px solid #d7dbe2;padding-bottom:3px;margin:18px 0 8px}
p{margin:6px 0}
ol{margin:6px 0;padding-left:20px}
li{margin:5px 0}
.box{background:#f4f6f9;border:1px solid #d7dbe2;border-radius:6px;padding:10px 12px;font-size:11pt}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10pt}
.tag{display:inline-block;background:#eef1f5;border:1px solid #d7dbe2;border-radius:4px;padding:1px 7px;font-family:ui-monospace,monospace;font-size:9.5pt;color:#3a4250}
.foot{margin-top:24px;padding-top:10px;border-top:1px solid #d7dbe2;font-size:9pt;color:#8a93a6}
.foot a{color:#0a66c2;text-decoration:none}
</style></head><body>
<div class="hd">
  <div class="kicker">${esc(item.id)} · ${esc(item.title)}</div>
  <h1>${esc(sub.name)}</h1>
  <div class="oneliner">${esc(sub.oneLiner || "")}</div>
</div>

${sub.plain ? `<h2>How it works</h2><p>${esc(sub.plain)}</p>` : ""}
${sub.example ? `<h2>For example</h2><div class="box">${esc(sub.example)}</div>` : ""}
${sub.mechanism ? `<h2>Technical detail</h2><p><b>Mechanism.</b> ${esc(sub.mechanism)}</p>` : ""}

${inc.name ? `<h2>Real attack — verified</h2>
<p><b>${esc(inc.name)}</b> ${inc.id ? `<span class="tag">${esc(inc.id)}</span>` : ""}<br>
<span class="mono">Disclosed ${esc(inc.disclosed || "—")} · ${esc(inc.by || "")}</span></p>
<p>${esc(inc.real || "")}</p>` : ""}

${playbook ? `<h2>Mitigation playbook</h2><ol>${playbook}</ol>` : ""}

<h2>Framework mappings</h2>
<p class="mono"><b>MITRE ATLAS:</b> ${esc(fw.atlas || "—")}<br>
<b>NIST AI RMF:</b> ${esc(fw.nist || "—")}</p>

<div class="foot">
  THREATLAB — interactive OWASP LLM &amp; Agentic AI security · reconstruction for teaching; CVEs checked against the NVD.<br>
  ${esc(item.id)} · ${esc(sub.name)} · exported ${new Date().toISOString().slice(0, 10)} · <a href="https://github.com/rootabhi1/AI-Threatlab">github.com/rootabhi1/AI-Threatlab</a>
</div>
</body></html>`;

  try {
    const w = window.open("", "_blank");
    if (!w) { // popup blocked — fall back to same-tab iframe print
      const ifr = document.createElement("iframe");
      ifr.style.position = "fixed"; ifr.style.right = "0"; ifr.style.bottom = "0";
      ifr.style.width = "0"; ifr.style.height = "0"; ifr.style.border = "0";
      document.body.appendChild(ifr);
      const d = ifr.contentWindow.document;
      d.open(); d.write(html); d.close();
      ifr.contentWindow.focus();
      setTimeout(() => { ifr.contentWindow.print(); setTimeout(() => document.body.removeChild(ifr), 1000); }, 300);
      return;
    }
    w.document.open(); w.document.write(html); w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 350);
  } catch (e) { /* no-op */ }
}

/* ---------- Detail ---------- */
function Collapsible({ label, accent, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`collap ${open ? "open" : ""}`}>
      <button className="collap-btn" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <span className="collap-caret" style={{ color: accent }}>{open ? "▾" : "▸"}</span>
        <span className="collap-label">{label}</span>
      </button>
      {open && <div className="collap-body">{children}</div>}
    </div>
  );
}

function Detail({ item, accent, done, onDone, subIndex, setSubIndex, onJump }) {
  const sub = item.subs[subIndex] || item.subs[0];
  const [lens, setLens] = useState("attacker"); // attacker | defender

  return (
    <div className="detail">
      <div className="d-head">
        <div className="d-top">
          <div className="d-id" style={{ color: accent }}>{item.id}</div>
          <div className="d-actions">
            <button className="mini" onClick={() => exportSubPDF(item, sub)} title="Download this attack as a PDF"><Glyph name="copy" size={14} /> download PDF</button>
          </div>
        </div>
        <h2>{item.title}</h2>
        <p className="d-plain">{item.catPlain}</p>
        <div className="d-why"><span className="d-why-tag" style={{ color: accent }}>why it matters</span> {item.catWhy}</div>
        <Collapsible label="Framework mappings (for security teams)" accent={accent}>
          <Frameworks fw={item.frameworks} />
        </Collapsible>
        <div className="lens" role="tablist" aria-label="View lens">
          <button role="tab" aria-selected={lens === "attacker"} className={`lens-btn ${lens === "attacker" ? "on atk" : ""}`} onClick={() => setLens("attacker")}>⚔ attacker view</button>
          <button role="tab" aria-selected={lens === "defender"} className={`lens-btn ${lens === "defender" ? "on def" : ""}`} onClick={() => setLens("defender")}>🛡 defender view</button>
        </div>
      </div>

      {item.subs.length > 1 && (
        <div className="subtabs" role="tablist" aria-label="Sub-categories">
          {item.subs.map((s, i) => (
            <button key={i} role="tab" aria-selected={i === subIndex} className={`subtab ${i === subIndex ? "on" : ""}`} onClick={() => setSubIndex(i)}
              style={i === subIndex ? { borderColor: accent, color: accent } : {}}>{s.name}</button>
          ))}
        </div>
      )}

      <div className="sub-body">
        <div className="one-liner">{sub.oneLiner}</div>

        {lens === "attacker" ? (
          <>
            <Section title="How it works"><p>{sub.plain}</p></Section>
            <Section title="For example">
              <div className="example-box">{sub.example}</div>
            </Section>
            <div className="analogy"><span className="analogy-mark" style={{ color: accent }}>◇</span> {sub.analogy}</div>
            <Section title="Watch it happen" flush><Theater sub={sub} accent={accent} ix={((IX[item.id] || IX1B[item.id] || IX2[item.id] || IX3A[item.id] || IX3B[item.id]) || {})[sub.name]} realCfg={REALCONFIG[item.id + "::" + sub.name]} /></Section>
            <Section title="Real attack — verified">
              <div className="incident">
                <div className="incident-top"><span className="incident-name">{sub.incident.name}</span><span className="incident-id" style={{ color: accent }}>{sub.incident.id}</span></div>
                <div className="incident-meta">Disclosed {sub.incident.disclosed} · {sub.incident.by}</div>
                <p>{sub.incident.real}</p>
              </div>
            </Section>
            <Collapsible label="Technical detail (mechanism & payload)" accent={accent}>
              <div className="tech-mech"><b>Mechanism.</b> {sub.mechanism}</div>
            </Collapsible>
            <Section title="Mitigation playbook">
              <div className="playbook">
                {sub.playbook.map((p, i) => (
                  <div key={i} className="pb-item">
                    <div className="pb-num" style={{ color: accent, borderColor: accent + "55" }}>{i + 1}</div>
                    <div className="pb-text"><b>{p.title}.</b> {p.detail}</div>
                  </div>
                ))}
              </div>
              <div className="pb-note">Tip: run the flow above in <b>defense</b> mode — each 🛡 marks one of these controls stopping the attack in real time.</div>
            </Section>
          </>
        ) : (
          <>
            <Section title="Detect & monitor">
              <div className="def-watch">{item.defender}</div>
            </Section>
            <Section title="Controls to implement">
              <div className="playbook">
                {sub.playbook.map((p, i) => (
                  <div key={i} className="pb-item">
                    <div className="pb-num" style={{ color: "#4ade80", borderColor: "#4ade8055" }}>✓</div>
                    <div className="pb-text"><b>{p.title}.</b> {p.detail}</div>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="How to test this">
              <div className="testing">{item.testing}</div>
              <div className="pb-note">Tools referenced: promptfoo, Garak (NVIDIA), PyRIT (Microsoft), DeepTeam (Confident AI). Map each to the ATLAS/NIST IDs above when producing compliance evidence.</div>
            </Section>
          </>
        )}
      </div>

      <button className={`mark ${done ? "on" : ""}`} onClick={onDone} style={done ? { borderColor: accent, color: accent } : {}}>
        {done ? "✓ learned" : "mark as learned"}
      </button>
    </div>
  );
}

function Section({ title, children, flush }) {
  return (
    <div className={`section ${flush ? "flush" : ""}`}>
      <div className="section-h">{title}</div>
      <div className="section-c">{children}</div>
    </div>
  );
}

/* ---------- Chain view ---------- */
function ChainView({ accent, onJump }) {
  const [ci, setCi] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [breakAt, setBreakAt] = useState(null); // index where user "breaks" the chain
  const chain = CHAINS[ci];
  const n = chain.stages.length;
  const timer = useRef(null);
  const stop = () => { clearTimeout(timer.current); timer.current = null; };

  useEffect(() => { setStep(0); setPlaying(false); setBreakAt(null); stop(); }, [ci]);
  useEffect(() => () => stop(), []);
  useEffect(() => {
    if (!playing) return;
    const limit = breakAt != null ? breakAt + 1 : n;
    if (step >= limit) { setPlaying(false); return; }
    timer.current = setTimeout(() => setStep(s => s + 1), prefersReduced() ? 380 : 1050);
    return () => stop();
  }, [playing, step, n, breakAt]);

  const limit = breakAt != null ? breakAt + 1 : n;
  const done = !playing && step >= limit && step > 0;
  const broken = breakAt != null && done;
  const play = () => { if (done) { setStep(0); setTimeout(() => setPlaying(true), 30); } else setPlaying(p => !p); };

  return (
    <div className="chain">
      <div className="chain-tabs">
        {CHAINS.map((c, i) => (
          <button key={c.id} className={`chain-tab ${i === ci ? "on" : ""}`} onClick={() => setCi(i)}
            style={i === ci ? { borderColor: accent, color: accent } : {}}>{c.name}</button>
        ))}
      </div>
      <div className="chain-card">
        <div className="chain-real" style={{ color: accent }}>{chain.real}</div>
        <p className="chain-summary">{chain.summary}</p>

        <div className="chain-hintbar">Tip: click <b>break</b> on any stage, then replay — see how stopping one link defends the whole chain.</div>

        <div className="chain-flow">
          {chain.stages.map((s, i) => {
            const reached = i < step;
            const isBreak = breakAt === i;
            const brokenHere = broken && breakAt === i;
            return (
              <React.Fragment key={i}>
                <div className={`chain-stage ${reached ? "lit" : ""} ${brokenHere ? "broken" : ""}`}
                  style={reached ? { borderColor: brokenHere ? "#4ade80" : accent } : {}}>
                  <div className="chain-stage-top">
                    <button className="chain-ref" style={{ color: brokenHere ? "#4ade80" : accent }} onClick={() => onJump(s.ref)}>{s.ref}</button>
                    <button className={`chain-break ${isBreak ? "on" : ""}`} onClick={() => { setBreakAt(isBreak ? null : i); setStep(0); setPlaying(false); }}>
                      {isBreak ? "🛡 break here" : "break"}
                    </button>
                  </div>
                  <div className="chain-label">{s.label}</div>
                  <div className="chain-detail">{s.detail}</div>
                  {reached && !brokenHere && <span className="chain-pulse" style={{ background: accent }} />}
                  {brokenHere && <div className="chain-broke-tag">🛡 chain broken here — attack stops, downstream stages never happen</div>}
                </div>
                {i < n - 1 && (
                  <div className={`chain-arrow ${i < step - 1 ? "lit" : ""}`} style={i < step - 1 ? { color: accent } : {}}>
                    <span className="chain-arrow-line" style={i < step - 1 ? { background: `linear-gradient(${accent},${accent}00)` } : {}} />↓
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="chain-controls">
          <button className="btn-play" onClick={play} style={{ borderColor: broken ? "#4ade80" : accent, color: broken ? "#4ade80" : accent }}>
            {playing ? "❚❚ pause" : done ? "↻ replay" : "▶ run chain"}
          </button>
          <button className="btn-step" onClick={() => { setPlaying(false); setStep(s => Math.min(s + 1, limit)); }}>⏭ step</button>
          {breakAt != null && <button className="btn-ghost" onClick={() => { setBreakAt(null); setStep(0); setPlaying(false); }}>clear break</button>}
          {done && <span className="verdict-tag" style={{ color: broken ? "#4ade80" : "#ff8fa3", marginLeft: "auto" }}>{broken ? "✓ chain broken · breach prevented" : "◉ full chain executed · breach"}</span>}
        </div>

        <div className="chain-lesson"><span className="chain-lesson-tag" style={{ color: accent }}>the lesson</span> {chain.lesson}</div>
        <p className="chain-hint">Tap any stage's category code to jump to its full breakdown.</p>
      </div>
    </div>
  );
}
/* ---------- Sandbox (fully simulated) ---------- */
function Sandbox({ accent, onJump }) {
  const scenarios = SANDBOX.scenarios;
  const [si, setSi] = useState(0);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("vulnerable");
  const [log, setLog] = useState([]);
  const s = scenarios[si];

  const pickScenario = (i) => { setSi(i); setLog([]); setInput(""); setMode("vulnerable"); };

  const submit = () => {
    const t = input.trim();
    if (!t) return;
    const hit = s.successPatterns.some(p => t.toLowerCase().includes(p));
    let resp;
    if (mode === "defended") resp = { who: "bot", text: s.defendedResponse, ok: false, guard: true };
    else if (hit) resp = { who: "bot", text: s.vulnerableWin, ok: true };
    else resp = { who: "bot", text: s.vulnerableMiss, ok: false };
    setLog(l => [...l, { who: "you", text: t }, resp]);
    setInput("");
  };

  return (
    <div className="sandbox">
      <div className="sb-intro">{SANDBOX.intro}</div>

      <div className="sb-scenarios">
        {scenarios.map((sc, i) => (
          <button key={sc.id} className={`sb-scenario ${i === si ? "on" : ""}`} onClick={() => pickScenario(i)}
            style={i === si ? { borderColor: accent } : {}}>
            <span className="sb-scenario-ref" style={{ color: accent }}>{sc.ref}</span>
            <span className="sb-scenario-name">{sc.name}</span>
            <span className="sb-scenario-app">{sc.app}</span>
          </button>
        ))}
      </div>

      <div className="sb-goal"><span className="sb-goal-tag" style={{ color: accent }}>your goal</span> {s.goal}</div>

      <div className="sb-sys">
        <span className="sb-sys-tag">system prompt (visible for the exercise)</span>
        <pre>{s.systemPrompt}</pre>
      </div>

      <div className="sb-modebar">
        <div className="mode-toggle">
          <button className={mode === "vulnerable" ? "on atk" : ""} onClick={() => { setMode("vulnerable"); setLog([]); }}>vulnerable bot</button>
          <button className={mode === "defended" ? "on def" : ""} onClick={() => { setMode("defended"); setLog([]); }}>guarded bot</button>
        </div>
        <span className="sb-mode-hint">{mode === "vulnerable" ? "no guardrails — try the attack" : "guardrail on — same attacks now fail"}</span>
      </div>

      <div className="sb-log">
        {log.length === 0 && <div className="sb-empty">💡 {s.hint}</div>}
        {log.map((m, i) => (
          <div key={i} className={`sb-msg ${m.who}`}>
            <span className="sb-who" style={{ color: m.who === "you" ? "#7db4ff" : m.ok ? "#ff8fa3" : (m.guard ? "#7fe0a8" : "#8a93a6") }}>{m.who === "you" ? "you" : "bot"}</span>
            <span className="sb-text">{m.text}</span>
          </div>
        ))}
      </div>

      <div className="sb-inputrow">
        <input className="sb-input" value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") submit(); }}
          placeholder={mode === "vulnerable" ? "type your attack…" : "try the same attack against the guarded bot…"} aria-label="Sandbox input" />
        <button className="sb-send" onClick={submit} style={{ borderColor: accent, color: accent }}>send</button>
      </div>

      <div className="sb-take">
        <div className="sb-take-h">what this teaches {onJump && <button className="sb-jump" style={{ color: accent }} onClick={() => onJump(s.ref)}>→ full {s.ref} breakdown</button>}</div>
        <ul>{s.takeaways.map((t, i) => <li key={i}><span style={{ color: accent }}>▪</span>{t}</li>)}</ul>
      </div>

      <div className="sb-safe">Fully simulated — no real model is called and nothing is actually attacked. Matching is pattern-based for teaching only, so it won't behave like a real LLM.</div>
    </div>
  );
}
/* ---------- Quiz ---------- */
function Quiz({ accent }) {
  const [i, setI] = useState(0), [picked, setPicked] = useState(null), [score, setScore] = useState(0), [done, setDone] = useState(false);
  const q = QUIZ[i];
  const choose = (idx) => { if (picked !== null) return; setPicked(idx); if (idx === q.answer) setScore(s => s + 1); };
  const next = () => { if (i + 1 >= QUIZ.length) { setDone(true); return; } setI(i + 1); setPicked(null); };
  const restart = () => { setI(0); setPicked(null); setScore(0); setDone(false); };
  if (done) {
    const pct = Math.round(score / QUIZ.length * 100);
    return (<div className="quiz-done">
      <div className="quiz-score" style={{ color: accent }}>{score}/{QUIZ.length}</div>
      <p>{pct >= 80 ? "Threat-model instincts: sharp." : pct >= 50 ? "Solid — a few categories to revisit." : "Good start. Walk the categories and retry."}</p>
      <button className="btn-play" onClick={restart} style={{ borderColor: accent, color: accent }}>try again</button>
    </div>);
  }
  return (<div className="quiz">
    <div className="quiz-top"><span>question {i + 1} / {QUIZ.length}</span><span className="quiz-ref">{q.ref}</span></div>
    <h3 className="quiz-q">{q.q}</h3>
    <div className="quiz-opts">
      {q.options.map((o, idx) => {
        const st = picked === null ? "" : idx === q.answer ? "right" : idx === picked ? "wrong" : "dim";
        return <button key={idx} className={`quiz-opt ${st}`} onClick={() => choose(idx)}>{o}</button>;
      })}
    </div>
    {picked !== null && <div className="quiz-explain"><span style={{ color: picked === q.answer ? "#4ade80" : "#ff5c7a" }}>{picked === q.answer ? "Correct." : "Not quite."}</span> {q.why}</div>}
    {picked !== null && <button className="btn-play" onClick={next} style={{ borderColor: accent, color: accent }}>{i + 1 >= QUIZ.length ? "see results" : "next →"}</button>}
  </div>);
}

/* ---------- App ---------- */
export default function App() {
  const allItems = useMemo(() => [...DATA.llm.items, ...DATA.asi.items], []);
  const [setKey, setSetKey] = useState("llm");
  const [view, setView] = useState("home"); // home | grid | learn | chains | sandbox | quiz
  const [showMethod, setShowMethod] = useState(false);
  const [selId, setSelId] = useState("LLM01");
  const [subIndex, setSubIndex] = useState(0);
  const [learned, setLearned] = useState({});
  const [query, setQuery] = useState("");

  // deep-link: read hash on load
  useEffect(() => {
    const applyHash = () => {
      const h = decodeURIComponent((window.location.hash || "").replace(/^#/, ""));
      if (!h) return;
      const [id, sub] = h.split("/");
      const item = allItems.find(x => x.id === id);
      if (item) {
        setSetKey(id.startsWith("LLM") ? "llm" : "asi");
        setView("learn"); setSelId(id); setSubIndex(Math.max(0, Math.min(item.subs.length - 1, parseInt(sub || "0", 10) || 0)));
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [allItems]);

  const set = DATA[setKey], accent = set.accent;
  const selected = useMemo(() => allItems.find(x => x.id === selId) || set.items[0], [selId, setKey]); // eslint-disable-line
  const totalSubs = allItems.reduce((n, c) => n + c.subs.length, 0);
  const learnedCount = Object.values(learned).filter(Boolean).length;
  const pct = Math.round(learnedCount / totalSubs * 100);
  const catDone = (c) => c.subs.every((_, i) => learned[`${c.id}:${i}`]);
  const toggleAll = (c) => setLearned(prev => { const nx = { ...prev }; const all = catDone(c); c.subs.forEach((_, i) => nx[`${c.id}:${i}`] = !all); return nx; });

  const pickSet = (k) => { setSetKey(k); setView("grid"); };
  const selectCat = (id, sub = 0) => { setSelId(id); setSubIndex(sub); setSetKey(id.startsWith("LLM") ? "llm" : "asi"); setView("learn"); try { window.history.replaceState(null, "", `#${id}/${sub}`); } catch {} };
  const jumpToCat = (id) => selectCat(id, 0);

  // search across everything
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const out = [];
    for (const c of allItems) {
      c.subs.forEach((s, i) => {
        const hay = `${c.id} ${c.title} ${s.name} ${s.oneLiner} ${s.mechanism} ${s.incident.name} ${s.incident.id} ${c.frameworks?.atlas || ""}`.toLowerCase();
        if (hay.includes(q)) out.push({ c, s, i });
      });
    }
    return out;
  }, [query, allItems]);

  return (
    <div className="app">
      <style>{CSS}</style>
      <a href="#main" className="skip">Skip to content</a>
      <header className="top">
        <button className="brand" onClick={() => { setView("home"); try { window.history.replaceState(null, "", window.location.pathname); } catch {} }} aria-label="Home">
          <span className="brand-mark" style={{ color: accent }}>◈</span>
          <span className="brand-name">THREAT<span style={{ color: accent }}>LAB</span></span>
          <span className="brand-sub">trace real AI attacks — then watch the defense stop them</span>
        </button>
        <div className="prog" title={`${learnedCount}/${totalSubs} learned`} aria-label={`${pct}% learned`}>
          <span className="prog-num">{pct}%</span>
          <span className="prog-bar"><span style={{ width: `${pct}%`, background: accent }} /></span>
        </div>
      </header>

      <div className="searchbar">
        <span className="search-ic"><Glyph name="search" size={16} /></span>
        <input className="search-input" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="search attacks, CVEs, ATLAS IDs, categories…" aria-label="Search" />
        {query && <button className="search-clear" onClick={() => setQuery("")}>clear</button>}
      </div>

      {results ? (
        <main id="main" className="results">
          <div className="results-h">{results.length} result{results.length !== 1 ? "s" : ""} for “{query}”</div>
          {results.map(({ c, s, i }) => (
            <button key={`${c.id}:${i}`} className="result-row" onClick={() => { setQuery(""); selectCat(c.id, i); }}>
              <span className="result-id" style={{ color: c.id.startsWith("LLM") ? DATA.llm.accent : DATA.asi.accent }}>{c.id}</span>
              <span className="result-tx"><b>{c.title}</b> · {s.name}<span className="result-ol">{s.oneLiner}</span></span>
            </button>
          ))}
          {results.length === 0 && <div className="result-empty">No matches. Try “injection”, “EchoLeak”, “memory”, or an ATLAS ID like “AML.T0051”.</div>}
        </main>
      ) : (
        <>
          {view === "home" && (
            <main id="main" className="home">
              <p className="home-intro">Trace how real AI attacks unfold, step by step — then watch the defenses stop them. Pick a track to explore, or jump straight in with the tools below.</p>
              <div className="how">
                <div className="how-step">
                  <span className="how-num">01</span>
                  <div className="how-ico pick">🎯</div>
                  <div className="how-title">Pick a threat</div>
                  <div className="how-desc">Choose from the OWASP LLM &amp; Agentic Top 10 — 45 real attack types.</div>
                </div>
                <div className="how-step">
                  <span className="how-num">02</span>
                  <div className="how-ico atk">⚔️</div>
                  <div className="how-title">Watch the attack</div>
                  <div className="how-desc">A real payload travels the system, step by step, until it breaches.</div>
                </div>
                <div className="how-step">
                  <span className="how-num">03</span>
                  <div className="how-ico def">🛡️</div>
                  <div className="how-title">Stop it</div>
                  <div className="how-desc">Flip a control from insecure to secure — watch the same attack fail.</div>
                </div>
              </div>
              <div className="honesty-note">
                <b>Faithful reconstructions of documented techniques</b> — nothing executes live and no real system is attacked. Incidents and CVEs are verified against primary sources.{" "}
                <button className="method-btn" onClick={() => setShowMethod(m => !m)}>{showMethod ? "methodology ▾" : "methodology ▸"}</button>
              </div>
              {showMethod && (
                <div className="method-body">
                  The attack and defense labs are faithful, animated reconstructions built to teach — they don't run a real model or attack any system. Incidents and CVEs are verified against primary sources; where no single CVE exists (common for agentic attacks), the entry is labelled a documented pattern. Secure configs shown are real controls — adapt them to your environment rather than pasting verbatim. Free-text experimentation lives only in the Sandbox, which is a clearly-labelled pattern-matched simulation.
                </div>
              )}
              <div className="home-cards">
                {Object.entries(DATA).map(([k, s]) => {
                  const doneN = s.items.filter(catDone).length;
                  return (
                    <button key={k} className="home-card" onClick={() => pickSet(k)} style={{ borderColor: s.accent + "44" }}>
                      <span className="home-card-accent" style={{ background: s.accent }} />
                      <span className="home-card-l" style={{ color: s.accent }}>{s.label}</span>
                      <span className="home-card-s">{s.sub}</span>
                      <span className="home-card-desc">{k === "llm" ? "Attacks on chatbots, copilots, and RAG assistants — prompt injection, data leakage, and more." : "Attacks on autonomous agents that plan, use tools, and act — goal hijacking, tool misuse, rogue agents."}</span>
                      <span className="home-card-prog">{doneN} of {s.items.length} categories explored →</span>
                    </button>
                  );
                })}
              </div>
              <div className="home-tools">
                <button className="home-tool" onClick={() => setView("chains")}><b>Attack chains</b><span>how vulnerabilities combine into real breaches</span></button>
                <button className="home-tool" onClick={() => setView("sandbox")}><b>Sandbox</b><span>safely try an attack yourself (simulated)</span></button>
                <button className="home-tool" onClick={() => setView("quiz")}><b>Test yourself</b><span>12 scenarios to check your instincts</span></button>
              </div>
            </main>
          )}

          {view === "grid" && (
            <main id="main" className="gridview">
              <div className="crumb">
                <button className="crumb-back" onClick={() => setView("home")}>← home</button>
                <span className="crumb-here" style={{ color: accent }}>{set.label}</span>
                <span className="crumb-sub">{set.sub}</span>
              </div>
              <div className="cat-grid">
                {set.items.map(c => {
                  const d = catDone(c);
                  return (
                    <button key={c.id} className="cat-card" onClick={() => selectCat(c.id, 0)} style={{ borderColor: d ? accent : undefined }}>
                      <span className="cat-card-ic" style={{ color: accent }}><Glyph name={c.icon} /></span>
                      <span className="cat-card-id" style={{ color: accent }}>{c.id}{d ? " ✓" : ""}</span>
                      <span className="cat-card-ti">{c.title}</span>
                      <span className="cat-card-plain">{c.catPlain}</span>
                      <span className="cat-card-n">{c.subs.length} attack type{c.subs.length > 1 ? "s" : ""} →</span>
                    </button>
                  );
                })}
              </div>
            </main>
          )}

          {view === "learn" && (
            <main id="main" className="learnview">
              <div className="crumb">
                <button className="crumb-back" onClick={() => setView("grid")}>← {set.label}</button>
                <span className="crumb-here" style={{ color: accent }}>{selected.id}</span>
                <span className="crumb-sub">{selected.title}</span>
              </div>
              <section className="pane">
                <Detail item={selected} accent={accent} done={catDone(selected)} onDone={() => toggleAll(selected)}
                  subIndex={Math.min(subIndex, selected.subs.length - 1)} setSubIndex={setSubIndex} onJump={jumpToCat} />
              </section>
            </main>
          )}

          {view === "chains" && <main id="main" className="wide"><div className="crumb"><button className="crumb-back" onClick={() => setView("home")}>← home</button><span className="crumb-here" style={{ color: accent }}>Attack chains</span></div><ChainView accent={accent} onJump={jumpToCat} /></main>}
          {view === "sandbox" && <main id="main" className="wide"><div className="crumb"><button className="crumb-back" onClick={() => setView("home")}>← home</button><span className="crumb-here" style={{ color: accent }}>Sandbox</span></div><Sandbox accent={accent} onJump={jumpToCat} /></main>}
          {view === "quiz" && <main id="main" className="quiz-main"><div className="crumb"><button className="crumb-back" onClick={() => setView("home")}>← home</button><span className="crumb-here" style={{ color: accent }}>Test yourself</span></div><Quiz accent={accent} /></main>}
        </>
      )}

      <footer className="foot">
        <div className="foot-row foot-brand">
          <span className="foot-name">THREAT<span style={{ color: accent }}>LAB</span></span>
          <span className="foot-ver">v1.0</span>
          <span className="foot-by"><a className="foot-linkedin" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="Abhishek Tiwari on LinkedIn"><LinkedInIcon /> <span>Abhishek Tiwari</span></a></span>
        </div>
        <div className="foot-row foot-stats">
          20 categories · 45 attack techniques · mapped to MITRE ATLAS &amp; NIST AI RMF
        </div>
        <div className="foot-links">
          <a className="foot-link" href={REPO_URL} target="_blank" rel="noopener noreferrer" style={{ color: accent }}>★ Source on GitHub →</a>
          <a className="foot-link" href={REPO_URL + "/issues/new"} target="_blank" rel="noopener noreferrer">Report an issue</a>
        </div>
        <div className="foot-row foot-credits">
          Threat taxonomy from the <b>OWASP GenAI Security Project</b> (LLM Top 10 · 2025 · Agentic/ASI Top 10 · 2026). An independent, open-source project — not an official OWASP release.
        </div>
        <div className="foot-row foot-accuracy">
          Attacks and defenses are reconstructions built to teach — nothing executes live and the sandbox is a labelled simulation. CVE IDs checked against the NVD; entries without a single CVE are labelled documented patterns. Last updated July 2026.
        </div>
        <div className="foot-row foot-legal">
          <span><a className="foot-linkedin" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="Abhishek Tiwari on LinkedIn"><LinkedInIcon /> <span>Abhishek Tiwari</span></a> · © 2026 · MIT licensed</span>
          <span>Found an inaccuracy? <a className="foot-link-sm" href={REPO_URL + "/issues/new"} target="_blank" rel="noopener noreferrer" style={{ color: accent }}>Open an issue</a>.</span>
        </div>
      </footer>
    </div>
  );
}

const REPO_URL = "https://github.com/rootabhi1/AI-Threatlab";
const LINKEDIN_URL = "https://linkedin.com/in/rootabhi";

const CSS = `
:root{--bg:#0b0e14;--panel:#111621;--panel2:#0e131d;--line:#1e2635;--ink:#e7ecf4;--dim:#8a93a6;--dim2:#5b6478}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
button{touch-action:manipulation;-webkit-appearance:none;appearance:none;color:inherit;font-family:inherit}
input,textarea{-webkit-appearance:none;appearance:none;border-radius:0}
.hidden-instr{cursor:pointer}
@supports (min-height:100dvh){.app{min-height:100dvh}}
.app{min-height:100vh;background:radial-gradient(900px 500px at 80% -10%,#16203012,transparent),radial-gradient(700px 400px at -10% 20%,#1a142812,transparent),var(--bg);color:var(--ink);font-family:"Space Grotesk",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:20px;max-width:1180px;margin:0 auto}
@media(max-width:640px){.app{padding:12px}}
.skip{position:absolute;left:-999px}.skip:focus{left:12px;top:12px;background:var(--panel);padding:8px 12px;border-radius:8px;z-index:10}
.top{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:14px}
.brand{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;min-width:0}
.brand-sub{font-size:12px;color:var(--dim2);font-family:"JetBrains Mono",ui-monospace,monospace}
@media(max-width:560px){.brand-sub{display:none}}
.brand-mark{font-size:20px}.brand-name{font-size:22px;font-weight:700;letter-spacing:.06em;color:var(--ink)}
.prog{display:flex;align-items:center;gap:10px;min-width:120px;flex:0 1 200px}
.prog-num{font-family:"JetBrains Mono",monospace;font-size:13px;color:var(--dim);width:36px;text-align:right}
.prog-bar{flex:1;height:6px;background:#0a0e16;border:1px solid var(--line);border-radius:20px;overflow:hidden}
.prog-bar span{display:block;height:100%;border-radius:20px;transition:width .5s cubic-bezier(.2,.8,.2,1)}
.searchbar{display:flex;align-items:center;gap:10px;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:9px 13px;margin-bottom:16px}
.search-ic{color:var(--dim2);display:flex}
.search-input{flex:1;background:transparent;border:0;outline:none;color:var(--ink);font-size:14px;font-family:inherit}
.search-input::placeholder{color:var(--dim2)}
.search-clear{background:transparent;border:0;color:var(--dim);font-size:12px;cursor:pointer;font-family:"JetBrains Mono",monospace}
.results{display:flex;flex-direction:column;gap:8px}
.results-h{font-family:"JetBrains Mono",monospace;font-size:12px;color:var(--dim);margin-bottom:4px}
.result-row{display:flex;gap:12px;align-items:flex-start;text-align:left;cursor:pointer;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:13px;color:var(--ink);transition:.15s}
.result-row:hover{background:var(--panel2);transform:translateX(2px)}
.result-id{font-family:"JetBrains Mono",monospace;font-size:12px;flex:none;padding-top:2px}
.result-tx{display:flex;flex-direction:column;gap:2px;font-size:14px}
.result-ol{color:var(--dim);font-size:12.5px}
.result-empty{color:var(--dim);font-size:13.5px;padding:20px;text-align:center}
.switch{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px}
.sw{flex:1;min-width:140px;text-align:left;cursor:pointer;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:12px 14px;color:var(--dim);transition:.2s;display:flex;flex-direction:column;gap:3px}
.sw:hover{border-color:#2c3648;transform:translateY(-1px)}.sw.on{background:var(--panel2)}
.sw-l{font-size:15px;font-weight:600;color:var(--ink)}.sw.on .sw-l{color:inherit}
.sw-s{font-size:11px;font-family:"JetBrains Mono",monospace;color:var(--dim2)}
.sw-alt{max-width:170px}
.grid{display:grid;grid-template-columns:290px 1fr;gap:16px;align-items:start}
@media(max-width:880px){.grid{grid-template-columns:1fr}}
.list{display:flex;flex-direction:column;gap:6px;position:sticky;top:12px}
@media(max-width:880px){.list{position:static;flex-direction:row;overflow-x:auto;padding-bottom:6px}}
.row{display:flex;align-items:center;gap:11px;text-align:left;cursor:pointer;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:11px 12px;color:var(--ink);transition:.15s;min-width:210px}
.row:hover{background:var(--panel2);transform:translateX(2px)}.row.active{background:var(--panel2)}
.row-tx{display:flex;flex-direction:column;gap:1px;flex:1}
.row-id{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.04em}
.row-ti{font-size:13.5px;font-weight:500}.row-ck{font-size:13px}
.pane{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:22px;min-height:560px}
@media(max-width:640px){.pane{padding:15px}}
.wide{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:22px}
@media(max-width:640px){.wide{padding:15px}}
.d-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.d-actions{display:flex;align-items:center;gap:7px}
.mini{display:inline-flex;align-items:center;gap:5px;font-family:"JetBrains Mono",monospace;font-size:11px;cursor:pointer;background:transparent;border:1px solid var(--line);border-radius:8px;padding:5px 9px;color:var(--dim);transition:.15s}
.mini:hover{color:var(--ink);border-color:#2c3648}
.mini-note{font-family:"JetBrains Mono",monospace;font-size:11px}
.d-head h2{margin:8px 0 8px;font-size:26px;letter-spacing:-.01em}
.d-id{font-family:"JetBrains Mono",monospace;font-size:13px;letter-spacing:.1em}
.d-blurb{color:var(--dim);font-size:14.5px;line-height:1.55;margin:0 0 12px}
/* brand as button */
.brand{background:transparent;border:0;cursor:pointer;text-align:left;padding:0}
/* home landing */
.home{padding:8px 0}
.home-intro{color:var(--dim);font-size:15px;line-height:1.6;max-width:680px;margin:4px 0 18px}
.how{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:0 0 18px}
.how-step{position:relative;background:var(--panel2);border:1px solid var(--line);border-radius:13px;padding:15px 15px 16px;display:flex;flex-direction:column;gap:7px}
.how-num{position:absolute;top:13px;right:14px;font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--dim2)}
.how-ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:17px;border:1px solid var(--line)}
.how-ico.atk{background:#1a1013;border-color:#3a1f2c}
.how-ico.def{background:#0c1f18;border-color:#17402f}
.how-ico.pick{background:#0f1826;border-color:#22344d}
.how-title{font-size:14px;font-weight:600}
.how-desc{font-size:12.5px;line-height:1.5;color:var(--dim)}
.honesty-note{font-size:12.5px;line-height:1.55;color:var(--dim);background:var(--panel2);border:1px solid var(--line);border-left:3px solid var(--accent);border-radius:10px;padding:11px 13px;max-width:720px;margin:0 0 8px}
.honesty-note b{color:var(--ink);font-weight:500}
.method-btn{font-family:"JetBrains Mono",monospace;font-size:11px;cursor:pointer;background:transparent;border:0;color:var(--accent);padding:0;white-space:nowrap;text-decoration:underline;text-underline-offset:2px}
.method-body{font-size:12.5px;line-height:1.6;color:var(--dim);background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:12px 14px;margin:6px 0 24px;max-width:720px}
.method-body b{color:var(--ink);font-weight:500}
.home-cards{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px}
@media(max-width:720px){.home-cards{grid-template-columns:1fr}}
@media(max-width:640px){.how{grid-template-columns:1fr}}
.home-card{position:relative;overflow:hidden;text-align:left;cursor:pointer;background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:6px;transition:.18s;color:var(--ink)}
.home-card:hover{transform:translateY(-2px);background:var(--panel2)}
.home-card-accent{position:absolute;top:0;left:0;width:100%;height:3px}
.home-card-l{font-size:19px;font-weight:700}
.home-card-s{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--dim2)}
.home-card-desc{font-size:13.5px;color:var(--dim);line-height:1.55;margin-top:4px}
.home-card-prog{font-family:"JetBrains Mono",monospace;font-size:11.5px;color:var(--dim);margin-top:8px}
.home-tools{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
@media(max-width:720px){.home-tools{grid-template-columns:1fr}}
.home-tool{text-align:left;cursor:pointer;background:var(--panel2);border:1px solid var(--line);border-radius:12px;padding:13px 15px;display:flex;flex-direction:column;gap:3px;transition:.15s;color:var(--ink)}
.home-tool:hover{border-color:#2c3648;transform:translateY(-1px)}
.home-tool b{font-size:14px}
.home-tool span{font-size:12px;color:var(--dim);line-height:1.5}
/* breadcrumb */
.crumb{display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.crumb-back{font-family:"JetBrains Mono",monospace;font-size:12.5px;cursor:pointer;background:var(--panel);border:1px solid var(--line);border-radius:9px;padding:7px 13px;color:var(--ink);transition:.15s}
.crumb-back:hover{background:var(--panel2);transform:translateX(-2px)}
.crumb-here{font-family:"JetBrains Mono",monospace;font-size:13px;font-weight:600}
.crumb-sub{font-size:13px;color:var(--dim)}
/* category grid */
.cat-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:720px){.cat-grid{grid-template-columns:1fr}}
.cat-card{text-align:left;cursor:pointer;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:5px;transition:.16s;color:var(--ink)}
.cat-card:hover{transform:translateY(-2px);background:var(--panel2)}
.cat-card-ic{display:block}
.cat-card-id{font-family:"JetBrains Mono",monospace;font-size:11.5px;margin-top:2px}
.cat-card-ti{font-size:16px;font-weight:600}
.cat-card-plain{font-size:13px;color:var(--dim);line-height:1.55}
.cat-card-n{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--dim2);margin-top:4px}
/* plain content in detail */
.d-plain{font-size:15px;line-height:1.65;color:var(--ink);opacity:.95;margin:2px 0 12px}
.d-why{font-size:13.5px;line-height:1.6;color:var(--dim);background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:11px 13px;margin-bottom:12px}
.d-why-tag{font-family:"JetBrains Mono",monospace;font-size:10px;text-transform:uppercase;letter-spacing:.1em;display:block;margin-bottom:4px}
.example-box{background:var(--panel2);border:1px solid var(--line);border-left:3px solid var(--line);border-radius:10px;padding:13px 15px;font-size:14px;line-height:1.65;color:var(--ink);opacity:.95}
.analogy{display:flex;gap:9px;font-size:13.5px;font-style:italic;color:var(--dim);line-height:1.6;margin:14px 0 4px;padding:0 2px}
.analogy-mark{flex:none;font-style:normal}
.tech-mech{font-size:13.5px;line-height:1.6;color:var(--dim)}
/* collapsible */
.collap{border:1px solid var(--line);border-radius:10px;margin:10px 0;overflow:hidden;background:var(--panel2)}
.collap-btn{width:100%;text-align:left;cursor:pointer;background:transparent;border:0;padding:11px 13px;display:flex;align-items:center;gap:9px;color:var(--ink);font-family:"JetBrains Mono",monospace;font-size:12px}
.collap-btn:hover{background:var(--panel)}
.collap-caret{flex:none;font-size:11px}
.collap-label{color:var(--dim)}
.collap.open .collap-label{color:var(--ink)}
.collap-body{padding:0 13px 13px}
.fw{display:flex;flex-direction:column;gap:5px;background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:10px 12px}
.fw-row{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}
.fw-tag{font-family:"JetBrains Mono",monospace;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--dim2);flex:none;width:96px}
.fw-val{font-family:"JetBrains Mono",monospace;font-size:11.5px;color:var(--dim);line-height:1.4}
.lens{display:inline-flex;margin-top:12px;background:#0b1019;border:1px solid var(--line);border-radius:10px;overflow:hidden}
.lens-btn{font-family:"JetBrains Mono",monospace;font-size:12px;padding:8px 15px;background:transparent;border:0;color:var(--dim);cursor:pointer;transition:.15s}
.lens-btn.on.atk{background:#26121a;color:#ff8fa3}
.lens-btn.on.def{background:#0c1f18;color:#7fe0a8}
.def-watch{background:#0c1f18;border:1px solid #17402f;border-radius:12px;padding:14px;font-size:13.5px;line-height:1.65;color:#bfe9d4}
.testing{background:var(--panel2);border:1px solid var(--line);border-radius:12px;padding:14px;font-family:"JetBrains Mono",monospace;font-size:12px;line-height:1.7;color:var(--dim)}
.subtabs{display:flex;gap:8px;margin:18px 0 6px;flex-wrap:wrap}
.subtab{font-family:"JetBrains Mono",monospace;font-size:12px;cursor:pointer;background:transparent;border:1px solid var(--line);border-radius:20px;padding:6px 13px;color:var(--dim);transition:.15s}
.subtab:hover{color:var(--ink);border-color:#2c3648}.subtab.on{background:var(--panel2)}
.one-liner{font-size:16px;font-style:italic;opacity:.92;margin:14px 0 4px;line-height:1.5}
.section{margin-top:22px}
.section-h{font-family:"JetBrains Mono",monospace;font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--dim2);margin-bottom:10px}
.section-c p{margin:0;font-size:14px;line-height:1.65;color:var(--ink);opacity:.92}
.theater{background:var(--panel2);border:1px solid var(--line);border-radius:14px;overflow:hidden}
/* interactive theater additions */
.ix-setup{padding:13px;border-bottom:1px solid var(--line)}
.ix-h{font-family:"JetBrains Mono",monospace;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--dim2);margin-bottom:9px}
.email{background:#0d1420;border:1px solid var(--line);border-radius:10px;overflow:hidden}
.email-hd{padding:9px 12px;border-bottom:1px solid var(--line);background:#0a0e16}
.email-row{font-size:11.5px;color:var(--dim);margin:1px 0}
.email-row b{color:var(--ink);font-weight:500}
.email-subj{font-size:13px;font-weight:600;margin-top:3px}
.email-body{padding:12px;font-size:12.5px;line-height:1.6;color:#d4dae6}
.hidden-instr{background:transparent;color:#0d1420;border-radius:3px;padding:0 2px;transition:.2s;cursor:help;border-bottom:1px dashed #2a3548}
.email.reveal .hidden-instr{background:#3a1420;color:#ff9db0}
.email-foot{padding:8px 12px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px}
.reveal-btn{font-family:"JetBrains Mono",monospace;font-size:10.5px;cursor:pointer;background:transparent;border:1px solid var(--line);border-radius:7px;padding:5px 10px;color:var(--dim)}
.reveal-btn:hover{color:var(--ink);border-color:#2c3648}
.email-tag{font-family:"JetBrains Mono",monospace;font-size:10.5px;color:var(--dim2)}
.chatart{display:flex;flex-direction:column;gap:7px}
.chatline{display:flex;gap:9px;align-items:baseline;background:#0d1420;border:1px solid var(--line);border-radius:9px;padding:9px 11px}
.chatline.attacker{border-color:#3a1f2c}
.chatline.system{border-color:#1e2635}
.chat-who{flex:none;font-family:"JetBrains Mono",monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--dim2);width:56px}
.chatline.attacker .chat-who{color:#ff8fa3}
.chat-txt{font-size:12.5px;line-height:1.5;color:#d4dae6}
.chat-note{color:var(--dim2);font-style:italic}
.ctrl{background:var(--panel);border:1px solid var(--line);border-radius:11px;padding:11px;margin-bottom:8px}
.ctrl-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px}
.ctrl-name{font-size:13px;font-weight:600}
.cfg-toggle{display:inline-flex;background:#0b1019;border:1px solid var(--line);border-radius:8px;overflow:hidden;flex:none}
.cfg-toggle button{font-family:"JetBrains Mono",monospace;font-size:10px;padding:5px 9px;background:transparent;border:0;color:var(--dim);cursor:pointer}
.cfg-toggle button.on.ins{background:#26121a;color:#ff8fa3}
.cfg-toggle button.on.sec{background:#0c1f18;color:#7fe0a8}
.cfg-view{font-family:"JetBrains Mono",monospace;font-size:11px;line-height:1.5;border-radius:8px;padding:8px 10px}
.cfg-view.ins{background:#160e12;border:1px solid #3a1f2c;color:#ffb3c0}
.cfg-view.sec{background:#0c1f18;border:1px solid #17402f;color:#bfe9d4}
.cfg-label{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;opacity:.7;display:block;margin-bottom:3px}
.reaction{border-top:1px solid var(--line);padding:12px 14px;min-height:92px}
.rx-idle{color:var(--dim2);font-size:12.5px;font-family:"JetBrains Mono",monospace}
.rx-badge{display:inline-block;font-family:"JetBrains Mono",monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.1em;padding:3px 8px;border-radius:6px;margin-bottom:8px}
.rx-txt{font-size:12.5px;line-height:1.5;margin-bottom:8px}
.rx-art{font-family:"JetBrains Mono",monospace;font-size:11px;line-height:1.5;background:#080b12;border:1px solid var(--line);border-left:2px solid #3a4560;border-radius:8px;padding:9px 11px;white-space:pre-wrap;word-break:break-word;color:#cbd5e6}
.rx-art .hl{color:#ff9db0}
.rx-art .sec{color:#7fe0a8}
.verdict-tag{font-family:"JetBrains Mono",monospace;font-size:11.5px;margin-left:auto}
.edge-flow{stroke-width:2.5;fill:none;stroke-dasharray:6 8;animation:edgeflow .7s linear infinite;-webkit-animation:edgeflow .7s linear infinite}
@keyframes edgeflow{to{stroke-dashoffset:-14}}
@-webkit-keyframes edgeflow{to{stroke-dashoffset:-14}}
.node-pulse{fill:none;stroke-width:2;r:22;opacity:0;transform-box:fill-box;transform-origin:center;animation:nodepulse 1.1s ease-out;-webkit-animation:nodepulse 1.1s ease-out}
@keyframes nodepulse{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(1.9)}}
@-webkit-keyframes nodepulse{0%{opacity:.7;-webkit-transform:scale(1)}100%{opacity:0;-webkit-transform:scale(1.9)}}
.packet-core{filter:drop-shadow(0 0 6px currentColor)}
.realcfg{margin-bottom:12px}
.realcfg:last-child{margin-bottom:0}
.realcfg-label{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:6px}
.realcfg-code{position:relative;font-family:"JetBrains Mono",monospace;font-size:11px;line-height:1.55;background:#080b12;border:1px solid var(--line);border-radius:8px;padding:11px 12px 11px;white-space:pre-wrap;word-break:break-word;color:#bfe9d4;overflow-x:auto;margin:0 0 5px}
.realcfg-lang{position:absolute;top:0;right:0;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--dim2);background:var(--panel2);border-left:1px solid var(--line);border-bottom:1px solid var(--line);border-radius:0 8px 0 8px;padding:2px 7px}
.realcfg-src{font-size:11px;line-height:1.5;color:var(--dim2);font-style:italic}
.theater-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 13px;border-bottom:1px solid var(--line);background:#0a0e16;flex-wrap:wrap}
.app-chip{display:flex;align-items:center;gap:8px}.app-dot{width:8px;height:8px;border-radius:50%}
.app-name{font-family:"JetBrains Mono",monospace;font-size:12px;color:var(--dim)}
.mode-toggle{display:inline-flex;background:#0b1019;border:1px solid var(--line);border-radius:9px;overflow:hidden}
.mode-toggle button{font-family:"JetBrains Mono",monospace;font-size:11.5px;padding:7px 13px;background:transparent;border:0;color:var(--dim);cursor:pointer;transition:.15s}
.mode-toggle button.on.atk{background:#26121a;color:#ff8fa3}
.mode-toggle button.on.def{background:#0c1f18;color:#7fe0a8}
.diagram{width:100%;height:auto;display:block;background:radial-gradient(500px 120px at 50% 0%,#121a28,transparent);padding:6px 4px}
.edge{stroke:#26314a;stroke-width:2}.edge-hot{stroke-width:2.5;opacity:.9}
.packet{filter:drop-shadow(0 0 5px currentColor)}
.node{fill:#0c111b;stroke:#2a3548;stroke-width:1.5;transition:all .25s}
.node-on{fill:#0f1826}
.node-label{fill:#c7d0df;font-size:11px;font-family:"JetBrains Mono",monospace}
.shield-emoji{font-size:15px}
.console{padding:13px;min-height:150px;max-height:340px;overflow-y:auto;font-family:"JetBrains Mono",ui-monospace,monospace;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;border-top:1px solid var(--line)}
.console-idle{color:var(--dim2);font-size:12.5px;line-height:1.6}
.blink{animation:bl 1s steps(1) infinite;color:var(--dim)}
@keyframes bl{50%{opacity:0}}
.cline{display:flex;flex-direction:column;gap:6px}
.cline-head{display:flex;gap:9px;align-items:baseline}
.cprefix{font-size:11px;flex:none}
.clog{font-size:12.5px;color:var(--ink);opacity:.92;line-height:1.5}
.cpayload{margin:0;background:#080b12;border:1px solid var(--line);border-left:2px solid #3a4560;border-radius:8px;padding:9px 11px;font-size:11.5px;color:#ffcf70;line-height:1.5;white-space:pre-wrap;word-break:break-word;overflow-x:auto}
.ccontrol{display:flex;gap:9px;align-items:flex-start;background:#0c1f18;border:1px solid #17402f;border-radius:8px;padding:8px 10px;font-size:12px;color:#bfe9d4;line-height:1.5}
.cctrl-badge{flex:none;font-family:"JetBrains Mono",monospace;font-size:10.5px;color:#7fe0a8}
.outcome{display:flex;gap:9px;align-items:baseline;border-radius:8px;padding:10px 12px;font-size:12.5px;line-height:1.5}
.outcome.bad{background:#26121a;border:1px solid #4a1f2c;color:#ffc2ce}
.outcome.good{background:#0c1f18;border:1px solid #17402f;color:#bfe9d4}
.oc-tag{flex:none;font-size:11px;letter-spacing:.08em}
.appear{animation:pop .3s cubic-bezier(.2,.9,.3,1.2)}
@keyframes pop{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.appear{animation:none}.prog-bar span{transition:none}}
.theater-foot{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:11px 13px;border-top:1px solid var(--line);background:#0a0e16}
.btn-play,.btn-step{font-family:"JetBrains Mono",monospace;font-size:12.5px;cursor:pointer;background:transparent;border:1px solid var(--line);border-radius:9px;padding:8px 14px;transition:.15s;color:var(--ink)}
.btn-play:hover,.btn-step:hover{background:var(--panel);transform:translateY(-1px)}
.btn-step{color:var(--dim)}
.btn-ghost{font-family:"JetBrains Mono",monospace;font-size:12px;cursor:pointer;background:transparent;border:0;color:var(--dim2);text-decoration:underline;text-underline-offset:3px}
.foot-note{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--dim2);margin-left:auto;font-style:italic}
.incident{background:var(--panel2);border:1px solid var(--line);border-radius:12px;padding:14px}
.incident-top{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.incident-name{font-weight:600;font-size:14.5px}
.incident-id{font-family:"JetBrains Mono",monospace;font-size:11.5px}
.incident-meta{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--dim2);margin:5px 0 8px}
.incident p{margin:0;font-size:13.5px;line-height:1.6;color:var(--dim)}
.playbook{display:flex;flex-direction:column;gap:9px}
.pb-item{display:flex;gap:12px;align-items:flex-start;background:var(--panel2);border:1px solid var(--line);border-radius:11px;padding:12px 13px}
.pb-num{flex:none;width:24px;height:24px;border-radius:7px;border:1px solid;display:flex;align-items:center;justify-content:center;font-family:"JetBrains Mono",monospace;font-size:12px;font-weight:600}
.pb-text{font-size:13.5px;line-height:1.55;color:var(--ink);opacity:.94}
.pb-note{margin-top:11px;font-size:12px;color:var(--dim);line-height:1.55;font-style:italic}
.mark{margin-top:22px;width:100%;font-family:"JetBrains Mono",monospace;font-size:13px;cursor:pointer;background:transparent;border:1px dashed var(--line);border-radius:12px;padding:12px;color:var(--dim);transition:.15s}
.mark:hover{border-style:solid;color:var(--ink)}.mark.on{border-style:solid;background:var(--panel2)}
/* chain */
.chain-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.chain-tab{font-family:"JetBrains Mono",monospace;font-size:12px;cursor:pointer;background:transparent;border:1px solid var(--line);border-radius:10px;padding:8px 13px;color:var(--dim);transition:.15s;text-align:left}
.chain-tab:hover{color:var(--ink);border-color:#2c3648}.chain-tab.on{background:var(--panel2)}
.chain-real{font-family:"JetBrains Mono",monospace;font-size:12px;margin-bottom:8px}
.chain-summary{font-size:14.5px;line-height:1.6;color:var(--ink);opacity:.92;margin:0 0 18px}
.chain-flow{display:flex;flex-direction:column;align-items:stretch;gap:4px}
.chain-stage{position:relative;background:var(--panel2);border:1px solid var(--line);border-radius:12px;padding:13px 15px;opacity:.4;transition:.4s}
.chain-stage.lit{opacity:1}
.chain-stage.broken{background:#0c1f18}
.chain-stage-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:4px}
.chain-break{font-family:"JetBrains Mono",monospace;font-size:10px;cursor:pointer;background:transparent;border:1px solid var(--line);border-radius:6px;padding:3px 9px;color:var(--dim2);transition:.15s}
.chain-break:hover{color:var(--ink);border-color:#2c3648}
.chain-break.on{border-color:#4ade80;color:#7fe0a8;background:#0c1f18}
.chain-pulse{position:absolute;right:12px;bottom:12px;width:8px;height:8px;border-radius:50%;animation:cpulse 1.2s ease-out infinite}
@keyframes cpulse{0%{box-shadow:0 0 0 0 currentColor;opacity:.8}100%{box-shadow:0 0 0 10px transparent;opacity:0}}
.chain-broke-tag{margin-top:8px;font-family:"JetBrains Mono",monospace;font-size:11px;color:#7fe0a8;background:#0c1f18;border:1px solid #17402f;border-radius:7px;padding:6px 9px}
.chain-hintbar{font-size:12px;color:var(--dim);background:var(--panel2);border:1px solid var(--line);border-radius:9px;padding:9px 12px;margin-bottom:12px}
.chain-arrow-line{display:block;width:2px;height:10px;margin:0 auto 2px;background:var(--line)}
.chain-stage.lit{opacity:1}
.chain-ref{font-family:"JetBrains Mono",monospace;font-size:11.5px;background:transparent;border:0;cursor:pointer;padding:0;text-decoration:underline;text-underline-offset:3px}
.chain-label{font-size:14.5px;font-weight:600;margin:3px 0 4px}
.chain-detail{font-size:13px;color:var(--dim);line-height:1.55}
.chain-arrow{text-align:center;color:var(--dim2);font-size:16px;opacity:.4;transition:.4s;padding:2px 0}
.chain-arrow.lit{opacity:1}
.chain-controls{display:flex;gap:10px;margin:18px 0}
.chain-lesson{background:#0c1f18;border:1px solid #17402f;border-radius:12px;padding:13px 15px;font-size:13.5px;color:#bfe9d4;line-height:1.6}
.chain-lesson-tag{font-family:"JetBrains Mono",monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.12em;display:block;margin-bottom:5px}
.chain-hint{font-size:12px;color:var(--dim2);margin:12px 0 0;font-style:italic}
/* sandbox */
.sb-intro{font-size:14px;line-height:1.6;color:var(--ink);opacity:.92;margin-bottom:14px}
.sb-scenarios{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}
@media(max-width:640px){.sb-scenarios{grid-template-columns:1fr 1fr}}
.sb-scenario{text-align:left;cursor:pointer;background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:10px 11px;display:flex;flex-direction:column;gap:2px;transition:.15s;color:var(--ink)}
.sb-scenario:hover{border-color:#2c3648}
.sb-scenario.on{background:var(--panel)}
.sb-scenario-ref{font-family:"JetBrains Mono",monospace;font-size:10px}
.sb-scenario-name{font-size:12.5px;font-weight:600}
.sb-scenario-app{font-size:11px;color:var(--dim2)}
.sb-goal{font-size:13px;line-height:1.55;color:var(--dim);background:var(--panel2);border:1px solid var(--line);border-radius:9px;padding:10px 12px;margin-bottom:12px}
.sb-goal-tag{font-family:"JetBrains Mono",monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.1em;margin-right:7px}
.sb-jump{background:transparent;border:0;cursor:pointer;font-family:"JetBrains Mono",monospace;font-size:11px;float:right;padding:0}
.sb-sys{background:#080b12;border:1px solid var(--line);border-radius:10px;padding:11px 12px;margin-bottom:14px}
.sb-sys-tag{font-family:"JetBrains Mono",monospace;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--dim2)}
.sb-sys pre{margin:6px 0 0;font-family:"JetBrains Mono",monospace;font-size:11.5px;color:#ffcf70;white-space:pre-wrap;line-height:1.5}
.sb-modebar{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.sb-mode-hint{font-size:12px;color:var(--dim2);font-style:italic}
.sb-log{background:#080b12;border:1px solid var(--line);border-radius:12px;padding:13px;min-height:130px;display:flex;flex-direction:column;gap:10px;margin-bottom:12px}
.sb-empty{color:var(--dim2);font-size:13px;line-height:1.6}
.sb-empty code{color:#ffcf70;font-size:12px}
.sb-msg{display:flex;gap:9px;align-items:baseline}
.sb-who{font-family:"JetBrains Mono",monospace;font-size:11px;flex:none;width:30px}
.sb-text{font-size:13.5px;line-height:1.55}
.sb-inputrow{display:flex;gap:9px;margin-bottom:16px}
.sb-input{flex:1;background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:11px 13px;color:var(--ink);font-size:13.5px;font-family:inherit;outline:none}
.sb-input:focus{border-color:#2c3648}
.sb-send{font-family:"JetBrains Mono",monospace;font-size:12.5px;cursor:pointer;background:transparent;border:1px solid var(--line);border-radius:10px;padding:0 18px;transition:.15s}
.sb-send:hover{transform:translateY(-1px)}
.sb-take{background:var(--panel2);border:1px solid var(--line);border-radius:12px;padding:13px 15px;margin-bottom:12px}
.sb-take-h{font-family:"JetBrains Mono",monospace;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--dim2);margin-bottom:9px}
.sb-take ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:7px}
.sb-take li{display:flex;gap:9px;font-size:13.5px;line-height:1.5;color:var(--ink);opacity:.93}
.sb-safe{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--dim2);text-align:center;line-height:1.5}
.quiz-main{max-width:640px;margin:0 auto}
.quiz,.quiz-done{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:26px}
.quiz-top{display:flex;justify-content:space-between;font-family:"JetBrains Mono",monospace;font-size:11.5px;color:var(--dim2);margin-bottom:14px}.quiz-ref{opacity:.7}
.quiz-q{font-size:19px;line-height:1.4;margin:0 0 18px}
.quiz-opts{display:flex;flex-direction:column;gap:9px}
.quiz-opt{text-align:left;cursor:pointer;background:var(--panel2);border:1px solid var(--line);border-radius:11px;padding:13px 15px;color:var(--ink);font-size:14px;transition:.15s}
.quiz-opt:hover{border-color:#2c3648;transform:translateX(2px)}
.quiz-opt.right{border-color:#4ade80;background:#0c1f18;color:#bfe9d4}
.quiz-opt.wrong{border-color:#ff5c7a;background:#26121a;color:#ffc2ce}
.quiz-opt.dim{opacity:.45}
.quiz-explain{margin-top:14px;font-size:13.5px;line-height:1.6;color:var(--dim)}
.quiz .btn-play,.quiz-done .btn-play{margin-top:18px}
.quiz-done{text-align:center}
.quiz-score{font-size:52px;font-weight:700;font-family:"JetBrains Mono",monospace}
.quiz-done p{color:var(--dim);font-size:15px;margin:8px 0 20px}
.foot{margin-top:26px;padding-top:18px;border-top:1px solid var(--line);font-size:11.5px;color:var(--dim2);font-family:"JetBrains Mono",monospace;line-height:1.6;display:flex;flex-direction:column;gap:10px}
.foot-row{display:flex;gap:16px;flex-wrap:wrap}
.foot-brand{align-items:baseline}
.foot-name{font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:14px;letter-spacing:.02em;color:var(--ink);flex:none}
.foot-ver{font-size:10.5px;color:var(--dim2);border:1px solid var(--line);border-radius:5px;padding:1px 6px}
.foot-by{color:var(--dim);font-size:12px}
.foot-by b{color:var(--ink);font-weight:500}
.foot-linkedin{display:inline-flex;align-items:center;gap:5px;text-decoration:none;color:#0a66c2;font-weight:500;vertical-align:middle;transition:.15s}
.foot-linkedin:hover{color:#3b8fe0}
.foot-linkedin .li-ico{flex:none}
.foot-stats{color:var(--dim);font-size:11.5px}
.foot-tagline{color:var(--dim);font-size:11.5px}
.foot-links{margin:2px 0;display:flex;gap:8px;flex-wrap:wrap}
.foot-link{text-decoration:none;font-size:12.5px;font-weight:500;padding:7px 12px;border:1px solid var(--line);border-radius:8px;display:inline-block;transition:.15s}
.foot-link:hover{background:var(--panel2);border-color:#2c3648}
.foot-credits span,.foot-legal span{color:var(--dim)}
.foot-credits b,.foot-accuracy b,.foot-legal b{color:var(--ink);font-weight:500}
.foot-accuracy{color:var(--dim);max-width:760px}
.foot-legal{justify-content:space-between;padding-top:8px;border-top:1px solid var(--line)}
.foot-link-sm{text-decoration:none}
.foot-link-sm:hover{text-decoration:underline}

`;
