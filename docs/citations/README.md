# Citations Data Model

## Files

- `sources.json`: global citation registry and numbering (`citation_number` -> `[n]`).
- `claims.json`: claim registry, source binding, and verification status.
- `verification-report.md`: human-readable verification details.

## Numbering Rule

- Citation numbers are global and stable across the site.
- One source has one unique `[n]` value.

## Verification Status

- `verified`: claim is supported by cited source(s).
- `partially_verified`: source validates part of claim, but not full assertion.
- `unverified`: no reliable source found.
- `conflicted`: source contradicts current wording.

## Frontend Binding

Add `data-claim-id` to any node in `docs/index.html`.
`docs/script.js` resolves this id against `claims.json` and appends citation links.

Multiple claims are supported by comma-separated values:

```html
<p data-claim-id="CLAIM-A,CLAIM-B">...</p>
```

## Update Workflow

1. Add or update source in `sources.json`.
2. Map claims to `source_ids` and set status in `claims.json`.
3. Update `verification-report.md` details.
4. Add/adjust `data-claim-id` markers in UI text.
5. Re-check JSON validity and UI rendering.
