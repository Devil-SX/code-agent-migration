#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const files = {
  html: path.join(root, 'docs', 'index.html'),
  claims: path.join(root, 'docs', 'citations', 'claims.json'),
  sources: path.join(root, 'docs', 'citations', 'sources.json')
};

const errors = [];
const warnings = [];

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    errors.push(`missing file: ${path.relative(root, filePath)} (${error.message})`);
    return null;
  }
}

function parseJson(filePath, label) {
  const text = readText(filePath);
  if (text === null) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    errors.push(`invalid JSON in ${label}: ${error.message}`);
    return null;
  }
}

function pushUniqueError(prefix, value, seen) {
  if (seen.has(value)) {
    errors.push(`${prefix} must be unique, duplicate found: ${value}`);
    return;
  }
  seen.add(value);
}

function parseClaimIdsFromHtml(html) {
  const ids = new Set();
  const pattern = /data-claim-id\s*=\s*(['"])(.*?)\1/gms;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const raw = match[2] || '';
    raw
      .split(',')
      .map((token) => token.trim())
      .filter(Boolean)
      .forEach((id) => ids.add(id));
  }
  return ids;
}

function parseAnchorHrefs(html) {
  const hrefs = [];
  const pattern = /<a\b[^>]*href\s*=\s*(['"])(.*?)\1/gims;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    hrefs.push((match[2] || '').trim());
  }
  return hrefs;
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function main() {
  const html = readText(files.html);
  const claimsPayload = parseJson(files.claims, 'docs/citations/claims.json');
  const sourcesPayload = parseJson(files.sources, 'docs/citations/sources.json');

  if (!html || !claimsPayload || !sourcesPayload) {
    reportAndExit();
    return;
  }

  const sources = Array.isArray(sourcesPayload.sources) ? sourcesPayload.sources : null;
  const claims = Array.isArray(claimsPayload.claims) ? claimsPayload.claims : null;
  if (!sources) errors.push('sources.json: "sources" must be an array');
  if (!claims) errors.push('claims.json: "claims" must be an array');
  if (!sources || !claims) {
    reportAndExit();
    return;
  }

  const sourceIdSet = new Set();
  const citationNumberSet = new Set();
  for (const source of sources) {
    if (!isNonEmptyString(source.source_id)) {
      errors.push('source.source_id must be a non-empty string');
      continue;
    }
    pushUniqueError('source_id', source.source_id, sourceIdSet);

    if (!Number.isInteger(source.citation_number) || source.citation_number <= 0) {
      errors.push(`source ${source.source_id}: citation_number must be a positive integer`);
    } else {
      pushUniqueError('citation_number', source.citation_number, citationNumberSet);
    }

    if (!isNonEmptyString(source.url)) {
      errors.push(`source ${source.source_id}: url must be a non-empty string`);
    }
  }

  const allowedStatuses = new Set([
    'verified',
    'partially_verified',
    'unverified',
    'conflicted'
  ]);

  const claimIdSet = new Set();
  const claimsById = new Map();
  for (const claim of claims) {
    if (!isNonEmptyString(claim.claim_id)) {
      errors.push('claim.claim_id must be a non-empty string');
      continue;
    }
    pushUniqueError('claim_id', claim.claim_id, claimIdSet);
    claimsById.set(claim.claim_id, claim);

    if (!allowedStatuses.has(claim.verification_status)) {
      errors.push(
        `claim ${claim.claim_id}: verification_status must be one of ${Array.from(allowedStatuses).join(', ')}`
      );
    }

    if (!Array.isArray(claim.source_ids)) {
      errors.push(`claim ${claim.claim_id}: source_ids must be an array`);
      continue;
    }

    if (claim.verification_status === 'unverified' && claim.source_ids.length > 0) {
      warnings.push(`claim ${claim.claim_id}: unverified claim should usually have empty source_ids`);
    }
    if (claim.verification_status !== 'unverified' && claim.source_ids.length === 0) {
      errors.push(`claim ${claim.claim_id}: status=${claim.verification_status} requires at least one source_id`);
    }

    for (const sourceId of claim.source_ids) {
      if (!sourceIdSet.has(sourceId)) {
        errors.push(`claim ${claim.claim_id}: unknown source_id ${sourceId}`);
      }
    }
  }

  const htmlClaimIds = parseClaimIdsFromHtml(html);
  const anchorHrefs = parseAnchorHrefs(html);
  if (htmlClaimIds.size === 0) {
    warnings.push('docs/index.html has no data-claim-id markers');
  }

  for (const href of anchorHrefs) {
    if (!href) continue;
    const lowered = href.toLowerCase();
    if (lowered.includes('github.com')) {
      errors.push(`docs/index.html contains forbidden GitHub content link: ${href}`);
    }
    if (lowered.startsWith('http://') || lowered.startsWith('https://')) {
      errors.push(`docs/index.html must use internal navigation only; external anchor detected: ${href}`);
    }
  }

  for (const htmlClaimId of htmlClaimIds) {
    if (!claimsById.has(htmlClaimId)) {
      errors.push(`docs/index.html references unknown claim id: ${htmlClaimId}`);
    }
  }

  for (const claim of claims) {
    if (!Array.isArray(claim.locations)) continue;
    const hasHtmlLocation = claim.locations.some((loc) => loc && loc.file === 'docs/index.html');
    if (hasHtmlLocation && !htmlClaimIds.has(claim.claim_id)) {
      errors.push(
        `claim ${claim.claim_id} includes docs/index.html in locations but no matching data-claim-id marker exists`
      );
    }
  }

  reportAndExit();
}

function reportAndExit() {
  if (warnings.length > 0) {
    console.log('Citation check warnings:');
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
  }

  if (errors.length > 0) {
    console.error('Citation check failed:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('Citation check passed.');
}

main();
