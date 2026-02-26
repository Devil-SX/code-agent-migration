# AI Coding CLI Tools: Comparison and Migration

Chinese version: [README.zh-CN.md](README.zh-CN.md)

This repository maintains a self-contained website for comparing and migrating between four coding-agent CLIs: Claude Code, Codex CLI, OpenCode, and Kimi CLI.

## Project Goals

- Keep comparison, migration guidance, and decision context readable inside the website.
- Make key factual statements traceable through inline citations (`[n]`).
- Separate verified, partially verified, conflicted, and unverified claims.

## Documentation Layout

- Detailed dashboard: `docs/index.html`
- English entry: `docs/en/index.html`
- Chinese entry: `docs/zh/index.html`
- Bilingual core pages:
  - `docs/pages/en/*`
  - `docs/pages/zh/*`
- Source content and evidence registry:
  - `docs/content/*`
  - `docs/citations/sources.json`
  - `docs/citations/claims.json`

## Local Run

```bash
python3 -m http.server 8000 --directory docs
# open http://localhost:8000
```

## Quality Checks

```bash
node tools/check_citations.js
node tools/check_docs_structure.js
node tools/check_i18n.js
```

## Maintenance Constraints

- Root markdown docs are limited to entry-level files.
- Website content must remain self-contained; external links are citation-only.
- Any factual UI change must update `data-claim-id` bindings and citation registry data.
