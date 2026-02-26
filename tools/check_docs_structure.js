#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const errors = [];

const allowedRootMarkdown = new Set(['README.md', 'README.zh-CN.md', 'CHANGELOG.md', 'AGENTS.md']);
const requiredDocsContent = [
  'overview.md',
  'config-comparison.md',
  'migration-quick-reference.md',
  'migration-examples.md',
  'project-status.md',
  'methodology.md',
  'glossary.md'
];

function exists(p) {
  return fs.existsSync(p);
}

function validateRootMarkdown() {
  const entries = fs.readdirSync(root, { withFileTypes: true });
  const rootMarkdown = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md'))
    .map((entry) => entry.name)
    .sort();

  for (const file of rootMarkdown) {
    if (!allowedRootMarkdown.has(file)) {
      errors.push(`unexpected root markdown file: ${file}`);
    }
  }

  for (const required of allowedRootMarkdown) {
    if (!rootMarkdown.includes(required)) {
      errors.push(`missing required root markdown file: ${required}`);
    }
  }
}

function validateDocsContent() {
  const contentDir = path.join(root, 'docs', 'content');
  if (!exists(contentDir)) {
    errors.push('missing docs/content directory');
    return;
  }

  for (const required of requiredDocsContent) {
    const full = path.join(contentDir, required);
    if (!exists(full)) {
      errors.push(`missing docs/content file: ${required}`);
    }
  }
}

function validateReadmeInternalLinks() {
  const readmePath = path.join(root, 'README.md');
  if (!exists(readmePath)) {
    return;
  }

  const text = fs.readFileSync(readmePath, 'utf8');
  const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;
  while ((match = linkPattern.exec(text)) !== null) {
    const target = (match[1] || '').trim();
    if (!target || target.startsWith('#')) continue;
    const lowered = target.toLowerCase();
    if (lowered.startsWith('http://') || lowered.startsWith('https://') || lowered.startsWith('mailto:')) {
      continue;
    }

    const cleanTarget = target.split('#')[0];
    const resolved = path.resolve(root, cleanTarget);
    if (!exists(resolved)) {
      errors.push(`README link target does not exist: ${target}`);
    }
  }
}

function main() {
  validateRootMarkdown();
  validateDocsContent();
  validateReadmeInternalLinks();

  if (errors.length > 0) {
    console.error('Docs structure check failed:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('Docs structure check passed.');
}

main();
