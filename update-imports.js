#!/usr/bin/env node

/**
 * Script to update all @zazuko imports to @lindas
 */

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = 'packages';

// File extensions to process
const EXTENSIONS = ['.ts', '.js', '.tsx', '.jsx', '.mjs', '.cjs', '.d.ts'];

// Mapping of @zazuko packages to @lindas packages
const PACKAGE_MAP = {
  '@zazuko/env-core': '@lindas/env-core',
  '@zazuko/env-node': '@lindas/env-node',
  '@zazuko/env': '@lindas/env',
  '@zazuko/prefixes': '@lindas/prefixes',
  '@zazuko/rdf-vocabularies': '@lindas/rdf-vocabularies',
  '@zazuko/vocabulary-loader': '@lindas/vocabulary-loader',
  '@zazuko/vocabulary-extras-builders': '@lindas/vocabulary-extras-builders',
  '@zazuko/vocabulary-extras': '@lindas/vocabulary-extras',
  '@zazuko/yasgui-utils': '@lindas/yasgui-utils',
  '@zazuko/yasgui': '@lindas/yasgui',
  '@zazuko/yasqe': '@lindas/yasqe',
  '@zazuko/yasr': '@lindas/yasr',
  '@zazuko/shacl-playground': '@lindas/shacl-playground',
  '@zazuko/shacl-test': '@lindas/shacl-test',
  '@zazuko/spex': '@lindas/spex',
  '@zazuko/vue-graph-layout': '@lindas/vue-graph-layout',
  '@zazuko/cube-hierarchy-query': '@lindas/cube-hierarchy-query',
  '@zazuko/rdf-entity-webcomponent': '@lindas/rdf-entity-webcomponent',
  '@zazuko/rdf-parser-csvw': '@lindas/rdf-parser-csvw',
  '@zazuko/rdf-utils-fs': '@lindas/rdf-utils-fs',
  '@zazuko/clownface': '@lindas/clownface',
  '@zazuko/s': '@lindas/s', // Note: this might need special handling
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const [zazuko, lindas] of Object.entries(PACKAGE_MAP)) {
    // Match imports like '@zazuko/env' or '@zazuko/env/something'
    const regex = new RegExp(zazuko.replace('/', '\\/'), 'g');
    if (content.match(regex)) {
      content = content.replace(regex, lindas);
      modified = true;
    }
  }

  // Also update describe() test names
  content = content.replace(/@zazuko\//g, '@lindas/');

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
    return true;
  }
  return false;
}

function walkDir(dir) {
  let updated = 0;
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build'].includes(entry)) {
        updated += walkDir(fullPath);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(entry);
      if (EXTENSIONS.includes(ext)) {
        if (processFile(fullPath)) {
          updated++;
        }
      }
    }
  }

  return updated;
}

console.log('Updating @zazuko imports to @lindas...\n');
const count = walkDir(PACKAGES_DIR);
console.log(`\nDone! Updated ${count} files.`);
