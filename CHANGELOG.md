# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Added a structured citation data model under `docs/citations/` with `sources.json`, `claims.json`, and a human-readable `verification-report.md`.
- Added `tools/check_citations.js` to validate claim/source integrity and HTML `data-claim-id` mappings.
- Added a dedicated GitHub Actions workflow `.github/workflows/citation-check.yml` to run citation integrity checks on PRs and pushes.
- Added a new documentation entry point in the site footer linking to `citations/verification-report.md`.

### Changed

- Updated `docs/index.html` to annotate key factual statements with `data-claim-id` for citation injection.
- Updated `docs/script.js` to dynamically inject citation superscripts (`[n]` and `[?]`) from citation registry files.
- Updated OpenCode GitHub link to `https://github.com/sst/opencode` and associated MIT claim mapping.

### Fixed

- Fixed missing `data-claim-id` mapping for `CLAIM-OPENCODE-MIGRATION-CLAUDE-TO-SKILLS` detected by citation checks.
