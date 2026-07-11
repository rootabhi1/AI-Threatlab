# THREATLAB — Interactive OWASP LLM &amp; Agentic AI Security

**Trace real AI attacks step by step — then watch the defenses stop them.**

![status](https://img.shields.io/badge/status-v1.0-38e0c8) ![license](https://img.shields.io/badge/license-MIT-blue) ![coverage](https://img.shields.io/badge/coverage-OWASP%20LLM%20%2B%20Agentic%20Top%2010-orange) ![deps](https://img.shields.io/badge/dependencies-none-brightgreen)

THREATLAB is a single-file, dependency-free web app that teaches the
[OWASP Top 10 for LLM Applications (2025)](https://genai.owasp.org/) and the
[OWASP Agentic / Agentic Security Initiative (ASI) Top 10 (2026)](https://genai.owasp.org/initiatives/#agenticsecurity)
through interactive, animated attack walkthroughs — 20 categories, 45 techniques, each with an attack lab and a defense lab.

> **Live demo:** https://rootabhi1.github.io/AI-Threatlab/
> **Offline:** download `threatlab.html` and open it in any browser — self-contained, no build, no network.

---

## Screenshots

<!--
  TODO (add real captures — replace the lines below):
  1. Take screenshots on your device / browser of:
     - the home screen (3-step strip + track cards)
     - a threat detail with the attack lab mid-animation
     - the defense lab with a control toggled to "secure"
  2. Save them in a docs/ folder, e.g. docs/home.png, docs/attack.png, docs/defense.png
  3. Uncomment the lines below (and delete this note).
  Optional: record a 10–20s screen capture, export as docs/demo.gif, and add it at the top.
-->

<!-- ![THREATLAB — home](docs/home.png) -->
<!-- ![Attack lab](docs/attack.png) -->
<!-- ![Defense lab](docs/defense.png) -->

_Screenshots coming soon — or try the [live demo](https://rootabhi1.github.io/AI-Threatlab/) now._

---

## Start here

New here? A good first path (about 5 minutes):

1. **Open the [live demo](https://rootabhi1.github.io/AI-Threatlab/)** and start with **LLM01 · Prompt Injection** — it's the most familiar attack and the best introduction to how the tool works.
2. **Read the short "how it works" line, then press ▶ play** in the *Watch it happen* panel. Follow the payload as it travels from user input to a breached response.
3. **Switch to _defense view_ and toggle a control to "secure,"** then replay — watch the same attack get stopped at the exact stage your control sits.
4. **Skim the mitigation playbook and the verified real-world case** (e.g. the CVE) to connect the mechanics to something that actually happened.
5. **Explore from there:** try **Attack chains** to see how vulnerabilities combine, or the **Sandbox** to type your own attacks against a simulated bot.

Prefer breadth first? The two track cards — **LLM Applications** and **Agentic Applications** — give you the full map of 20 categories to browse at your own pace.

---

## What it does

For each of the 20 categories (10 LLM + 10 Agentic) and all 45 sub-techniques, THREATLAB provides:

- **An attack lab** — the payload is shown as a *real artifact* (a phishing email with hidden white-on-white text, a poisoned tool description, a forged inter-agent message, a malicious pickle, …). Step through and watch the attack travel the system, node by node, with each stage's real reaction — the retrieved content, the hijacked model output, the outbound exfiltration request.
- **A defense lab** — each control is shown as an **insecure vs. secure configuration pair**. Toggle them, re-run the same attack, and watch it get stopped at exactly the stage where your chosen control sits — or breach if you leave it insecure.
- **Plain-language explanations** first, with the exact mechanism, payload, and framework mappings (MITRE ATLAS, NIST AI RMF) one tap deeper.
- **Verified real production configs** for marquee cases (a real CSP header, an IAM policy shape, a rate-limit config, promptfoo red-team plugins), each with its source.
- **Animated attack chains** with a "break the chain" mode — stop any one link and see the whole breach prevented.
- **A hands-on sandbox** with four scenarios where you type your own attacks against a vulnerable vs. guarded bot.
- **A quiz** to test your instincts.

---

## Scope &amp; fidelity

THREATLAB is a teaching tool, and it's explicit about what it is and isn't:

- **Reconstructions, not live exploits.** The attack and defense labs are accurate, animated reconstructions of how each documented technique flows through a system. Nothing executes, and no live model or system is targeted — the value is in seeing the mechanics and the mitigations, not in running working exploits. Free-text input is confined to the **Sandbox**, which is a pattern-matched simulation, clearly labelled as such (not a real LLM).
- **Incidents and CVEs cite primary sources.** Where a technique is anchored to a real event, it names it and was checked against the original disclosure — e.g. EchoLeak (CVE-2025-32711), the Amazon Q wiper, *Mata v. Avianca*, PoisonGPT, the PyTorch `torchtriton` dependency compromise, and Unit 42's model-namespace-reuse research.
- **Documented patterns are labelled as such.** Many agentic attacks have no single CVE; those entries are marked as documented patterns rather than dressed up as vulnerabilities — reflecting the actual state of the public record.
- **Configs are real controls, cited.** The verified production configs reference their source (MDN, promptfoo, AWS IAM grammar, nginx). They're starting points to adapt to your environment — not drop-in fixes. Applying security config without understanding it is its own failure mode.

Spotted something inaccurate? [Open an issue](https://github.com/rootabhi1/AI-Threatlab/issues/new) — corrections are welcome.

---

## Run it

**Option A — just open it.** Download `threatlab.html` and open it in a browser. No server, no build, no internet required (fonts load from Google Fonts if online, but the app works without them).

**Option B — build from source.** The single file is generated from the modules in `/src`:

```bash
npm install
npm run build      # regenerates threatlab.html
```

Then open `threatlab.html`.

---

## Project structure

```
threatlab.html            # the built, self-contained app (open this)
build.js                  # assembles threatlab.html from /src
package.json
src/
  data.js                 # all 20 categories, 45 sub-techniques, quiz, chains
  app-src.jsx             # the React app (UI, theater, chain view, sandbox, quiz)
  sandbox.js              # the 4 hands-on sandbox scenarios
  interactive_batch1.js   # attack artifacts + reactions + config pairs: LLM01
  interactive_batch1b.js  #   LLM02–LLM05
  interactive_batch2.js   #   LLM06–LLM10
  interactive_batch3a.js  #   ASI01–ASI05
  interactive_batch3b.js  #   ASI06–ASI10
  realconfig.js           # verified, source-cited production configs (marquee cases)
```

The app is plain React (no build framework), pre-compiled to a single HTML file with React/ReactDOM inlined — no CDN, no runtime dependencies, works offline.

---

## Credits

- Threat taxonomy: the [OWASP GenAI Security Project](https://genai.owasp.org/) — the LLM Top 10 (2025) and the Agentic Security Initiative / ASI Top 10 (2026). THREATLAB is an **independent, educational project** and is **not** an official OWASP release.
- Framework mappings reference [MITRE ATLAS](https://atlas.mitre.org/) and the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework).

## License

[MIT](LICENSE) — free to use, adapt, and share. Attribution appreciated.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Accuracy corrections, new attack flows, and additional verified configs are especially welcome.

## Author

Built and maintained by **Abhishek Tiwari** — [LinkedIn](https://linkedin.com/in/rootabhi) · [GitHub](https://github.com/rootabhi1)
