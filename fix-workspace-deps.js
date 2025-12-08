#!/usr/bin/env node

/**
 * Fix workspace:* dependencies to use * for npm workspaces
 */

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = 'packages';

function fixPackageJson(pkgPath) {
  const pkgJsonPath = path.join(pkgPath, 'package.json');

  if (!fs.existsSync(pkgJsonPath)) {
    return false;
  }

  let content = fs.readFileSync(pkgJsonPath, 'utf8');
  const original = content;

  // Replace workspace:* with *
  content = content.replace(/"workspace:\*"/g, '"*"');

  if (content !== original) {
    fs.writeFileSync(pkgJsonPath, content);
    console.log(`Fixed: ${pkgJsonPath}`);
    return true;
  }
  return false;
}

console.log('Fixing workspace:* dependencies for npm...\n');

let fixed = 0;
const packages = fs.readdirSync(PACKAGES_DIR);

for (const pkg of packages) {
  const pkgPath = path.join(PACKAGES_DIR, pkg);
  if (fs.statSync(pkgPath).isDirectory()) {
    if (fixPackageJson(pkgPath)) {
      fixed++;
    }
  }
}

console.log(`\nFixed ${fixed} package.json files.`);
