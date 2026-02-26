# AGENTS Rules

## Scope

These rules apply to website content under `docs/*`.

## Website Content Rules

1. Keep the website self-contained.
   - Do not rely on GitHub document links to carry core explanations.
   - Core comparison, migration guidance, and scenario reasoning must be readable inside the website itself.

2. External links are only for source citations.
   - Use citation markers (for example `[1]`) for external references.
   - Avoid standalone outbound links as primary content navigation.

3. Every factual claim must be traceable.
   - Mark factual UI text with `data-claim-id`.
   - Register claims and sources in `docs/citations/claims.json` and `docs/citations/sources.json`.

4. Show verification state clearly.
   - Keep `verified`, `partially_verified`, `conflicted`, and `unverified` states explicit.
   - Do not present unverified or conflicted claims as settled facts.

5. Prefer internal navigation.
   - Link to `docs/content/*` for extended reading.
   - Keep navigation stable even when external sources change.
