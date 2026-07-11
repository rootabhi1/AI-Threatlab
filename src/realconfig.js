/* realconfig.js — verified, source-backed production configs for marquee flows.
   Each entry cites its source. Only added where the exact config is publicly
   documented and verifiable. Shown in the defense lab as an optional "real config"
   with a note to adapt, not paste. NOT fabricated. */

export const REALCONFIG = {
  // EchoLeak / indirect prompt injection — the flagship case
  "LLM01::Indirect Prompt Injection": [
    {
      label: "Strict CSP — restrict image sources (blocks the auto-fetch exfil)",
      lang: "http",
      code: "Content-Security-Policy: default-src 'self'; img-src 'self'; connect-src 'self'",
      source: "MDN Web Docs — Content-Security-Policy / img-src (verified Jul 2025). 'self' quotes required; a space-separated allowlist; add only trusted hosts.",
    },
    {
      label: "promptfoo — test for indirect prompt injection in your RAG pipeline",
      lang: "yaml",
      code: "redteam:\n  plugins:\n    - id: indirect-prompt-injection\n      config:\n        indirectInjectionVar: context   # your retrieved-context variable",
      source: "promptfoo docs — Indirect Prompt Injection plugin. injects adversarial instructions into your retrieved-context field and checks whether the pipeline executes them.",
    },
  ],

  // EchoLeak also surfaces as the ASI01 goal-hijack example
  "ASI01::Objective manipulation via content": [
    {
      label: "promptfoo — OWASP Agentic red-team preset (covers goal hijack)",
      lang: "yaml",
      code: "redteam:\n  plugins:\n    - owasp:agentic   # bundles the agentic security plugins\n  strategies:\n    - jailbreak\n    - prompt-injection",
      source: "promptfoo docs — Red Team plugins & OWASP presets. Bundles the relevant agentic plugins automatically.",
    },
  ],

  // Excessive agency — least-privilege is the control; show a real IAM policy shape
  "LLM06::Over-privileged tool access": [
    {
      label: "AWS IAM — deny destructive actions on the agent's role (least privilege)",
      lang: "json",
      code: "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Deny\",\n    \"Action\": [\"dynamodb:DeleteItem\", \"dynamodb:DeleteTable\"],\n    \"Resource\": \"*\"\n  }]\n}",
      source: "AWS IAM policy grammar (Version 2012-10-17). An explicit Deny always overrides Allow — pattern shown; scope Action/Resource to your environment.",
    },
  ],

  // Denial of wallet — real rate-limit config shape
  "LLM10::Denial of wallet": [
    {
      label: "nginx — rate-limit an expensive endpoint (per-IP)",
      lang: "nginx",
      code: "limit_req_zone $binary_remote_addr zone=llm:10m rate=5r/s;\n\nlocation /api/generate {\n    limit_req zone=llm burst=10 nodelay;\n}",
      source: "nginx ngx_http_limit_req_module (limit_req_zone / limit_req). Values illustrative — set rate/burst to your capacity and cost budget.",
    },
  ],
};
