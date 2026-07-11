# THREATLAB — Interactive OWASP LLM &amp; Agentic AI Security

**Trace real AI attacks step by step — then watch the defenses stop them.**

**Created by [Abhishek Tiwari](https://linkedin.com/in/rootabhi)** · [Source on GitHub](https://github.com/rootabhi1/AI-Threatlab)

THREATLAB is a single-file, dependency-free web app that teaches the
[OWASP Top 10 for LLM Applications (2025)](https://genai.owasp.org/) and the
[OWASP Agentic / Agentic Security Initiative (ASI) Top 10 (2026)](https://genai.owasp.org/initiatives/#agenticsecurity)
through interactive, animated attack walkthroughs.

> **Live demo:** https://rootabhi1.github.io/AI-Threatlab/threatlab.html
> **Just want to try it?** Download `threatlab.html` and open it in any browser — it's fully self-contained and works offline.

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

## Honesty &amp; accuracy (please read)

This tool is built for a security audience, so it states its own limits plainly:

- **The labs are faithful reconstructions, not live exploits.** Nothing executes and no real system is attacked. When you "run" an attack, you're watching an accurate, animated reconstruction of how the documented attack flows — a teaching aid, not a working exploit. Free-text interaction lives only in the clearly-labelled **Sandbox**, which is a pattern-matched simulation, not a real LLM.
- **Incidents and CVEs are verified against primary sources.** Where a real incident or CVE anchors a technique (EchoLeak / CVE-2025-32711, the Amazon Q wiper, *Mata v. Avianca*, PoisonGPT, the PyTorch `torchtriton` dependency compromise, Unit 42's model-namespace-reuse research, and others), it is cited and was checked against the original disclosure.
- **Agentic entries are labelled as documented patterns** where no single CVE exists — which is the honest state of the public record for many agentic attacks.
- **Secure configs are real controls.** The verified production configs cite their source (MDN, promptfoo docs, AWS IAM grammar, nginx docs). Treat them as patterns to **adapt to your environment**, not lines to paste blindly — pasting security config without understanding it is itself an anti-pattern.

If you find an inaccuracy, please [open an issue](../../issues) — corrections are welcome and appreciated.

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
