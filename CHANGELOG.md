# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.1.1] - 2026-02-26

## [0.1.2] - 2026-02-26

## [0.1.3] - 2026-02-26

### Added

- Added `docs/citations/local-cli/` snapshots for `codex`, `claude`, `opencode`, and `kimi` command help output captured on 2026-02-26.
- Added 12 command-category claims for permission bypass, resume context, and non-interactive execution coverage across all four CLIs.
- Added 4 new local CLI citation sources (`SRC-019` to `SRC-022`) and bound them to command category claims.

### Changed

- Added a new command-category comparison matrix in `docs/index.html` with per-cell claim citations.
- Updated `docs/content/config-comparison.md` Section 5 to align command guidance with current CLI flags and session controls.

### Added

- Added `docs/pages/verification_report.js` and rebuilt `docs/pages/verification-report.html` as a structured verification dashboard sourced from `claims.json` and `sources.json`.
- Added claim-level and source-level timestamp validation in `tools/check_citations.js` for `last_verified_at` and `accessed_at`.

### Changed

- Updated citation superscript tooltips in `docs/script.js` to include claim verification date metadata.
- Updated verification page UI styles in `docs/pages/page.css` to show status badges, summaries, and source evidence blocks.

### Added

- Added `docs/pages/*` HTML documentation pages for comparison, migration, methodology, glossary, overview, project status, verification report, and citation data model.
- Added shared page renderer assets: `docs/pages/markdown_page.js` and `docs/pages/page.css`.

### Changed

- Replaced all user-facing markdown navigation links in `docs/index.html` with HTML page routes under `docs/pages/`.
- Updated unverified citation jump target in `docs/script.js` from markdown report to HTML verification page route.
- Kept markdown files under `docs/content/*` and `docs/citations/*` as source material while making HTML pages the navigation surface.

### Added

- Added a structured citation data model under `docs/citations/` with `sources.json`, `claims.json`, and a human-readable `verification-report.md`.
- Added `tools/check_citations.js` to validate claim/source integrity and HTML `data-claim-id` mappings.
- Added a dedicated GitHub Actions workflow `.github/workflows/citation-check.yml` to run citation integrity checks on PRs and pushes.
- Added a new documentation entry point in the site footer linking to `citations/verification-report.md`.
- Added `AGENTS.md` with explicit `docs/*` website rules: self-contained content, citation-only external links, and claim traceability.
- Added content reference docs under `docs/content/`: `overview.md`, `methodology.md`, and `glossary.md`.
- Added `tools/check_docs_structure.js` and `.github/workflows/docs-structure-check.yml` to enforce root markdown structure and required docs content files.

### Changed

- Updated `docs/index.html` to annotate key factual statements with `data-claim-id` for citation injection.
- Updated `docs/script.js` to dynamically inject citation superscripts (`[n]` and `[?]`) from citation registry files.
- Updated OpenCode GitHub link to `https://github.com/sst/opencode` and associated MIT claim mapping.
- Reorganized root markdown reports into `docs/content/` with lowercase names:
  - `CLI_TOOLS_CONFIG_COMPARISON.md` -> `docs/content/config-comparison.md`
  - `MIGRATION_QUICK_REFERENCE.md` -> `docs/content/migration-quick-reference.md`
  - `EXAMPLES.md` -> `docs/content/migration-examples.md`
  - `PROJECT_COMPLETION.md` -> `docs/content/project-status.md`
- Simplified `README.md` into an entry document and updated links to the new `docs/content/*` structure.
- Refactored `docs/index.html` to remove GitHub content navigation links and use internal content navigation sections.
- Expanded comparison visualization to a full 15-dimension grouped table with in-page filters.
- Updated citation report and claim location paths to the new `docs/content/*` layout.
- Strengthened citation checks to fail on external/GitHub anchors in `docs/index.html`.

### Fixed

- Fixed missing `data-claim-id` mapping for `CLAIM-OPENCODE-MIGRATION-CLAUDE-TO-SKILLS` detected by citation checks.
