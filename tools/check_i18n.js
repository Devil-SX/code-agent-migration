#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const errors = [];

function exists(p) {
  return fs.existsSync(p);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function requireFile(relativePath) {
  const full = path.join(root, relativePath);
  if (!exists(full)) {
    errors.push(`missing file: ${relativePath}`);
    return null;
  }
  return full;
}

function checkReadmePolicy() {
  const readmeFile = requireFile('README.md');
  const zhReadmeFile = requireFile('README.zh-CN.md');
  if (!readmeFile || !zhReadmeFile) return;

  const readme = read(readmeFile);
  if (!/^#\s+AI Coding CLI Tools:/m.test(readme)) {
    errors.push('README.md must use an English-first title heading');
  }
  if (!/\[README\.zh-CN\.md\]\(README\.zh-CN\.md\)/.test(readme)) {
    errors.push('README.md must include a link to README.zh-CN.md');
  }
}

function checkBilingualPages() {
  const core = ['overview.html', 'comparison.html', 'migration.html', 'methodology.html', 'verification.html'];

  for (const file of core) {
    const en = requireFile(path.join('docs', 'pages', 'en', file));
    const zh = requireFile(path.join('docs', 'pages', 'zh', file));
    if (!en || !zh) continue;

    const enText = read(en);
    const zhText = read(zh);

    if (!enText.includes('data-lang-switch') || !enText.includes(`../zh/${file}`)) {
      errors.push(`docs/pages/en/${file} must include data-lang-switch link to ../zh/${file}`);
    }
    if (!zhText.includes('data-lang-switch') || !zhText.includes(`../en/${file}`)) {
      errors.push(`docs/pages/zh/${file} must include data-lang-switch link to ../en/${file}`);
    }
  }
}

function checkLanguageEntryRoutes() {
  const enIndex = requireFile(path.join('docs', 'en', 'index.html'));
  const zhIndex = requireFile(path.join('docs', 'zh', 'index.html'));
  const detailedIndex = requireFile(path.join('docs', 'index.html'));
  if (!enIndex || !zhIndex || !detailedIndex) return;

  const enText = read(enIndex);
  const zhText = read(zhIndex);
  const detailedText = read(detailedIndex);

  if (!enText.includes('data-lang-switch') || !enText.includes('../zh/index.html')) {
    errors.push('docs/en/index.html must include data-lang-switch link to ../zh/index.html');
  }
  if (!zhText.includes('data-lang-switch') || !zhText.includes('../en/index.html')) {
    errors.push('docs/zh/index.html must include data-lang-switch link to ../en/index.html');
  }
  if (!detailedText.includes('en/index.html') || !detailedText.includes('zh/index.html')) {
    errors.push('docs/index.html must link to en/index.html and zh/index.html');
  }
}

function main() {
  checkReadmePolicy();
  checkBilingualPages();
  checkLanguageEntryRoutes();

  if (errors.length > 0) {
    console.error('i18n policy check failed:');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log('i18n policy check passed.');
}

main();
