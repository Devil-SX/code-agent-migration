# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
