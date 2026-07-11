# Contributing to THREATLAB

Thanks for helping improve this teaching tool. Because it's aimed at a security
audience, **accuracy is the top priority**.

## Ways to contribute

- **Accuracy corrections** — if an incident, CVE, technique, or config is wrong or
  outdated, please open an issue with a source. These get priority.
- **New attack flows** — additional sub-techniques or richer artifacts/reactions.
- **Verified configs** — real, source-cited production configs for more categories.
- **Accessibility, mobile, and UX fixes.**

## Ground rules for accuracy

- Every incident/CVE reference must cite a primary source (vendor advisory, NVD,
  court record, original research). No invented CVEs.
- Payloads must be faithful to the real technique — not fabricated.
- "Secure configs" must be real controls. If a specific product setting isn't
  publicly documented, keep it at the technique level rather than inventing a
  config string. Cite the source for any concrete config.
- Keep the honesty framing intact: the labs are reconstructions, not live exploits.

## Working on the code

The app is plain React compiled to a single HTML file.

```bash
npm install
npm run build     # regenerates threatlab.html from /src
```

Edit the modules in `/src`, rebuild, and open `threatlab.html` to test. Please
verify the app boots and the flow you touched works (attack reaches breach;
defense blocks at the right node) before opening a PR.
