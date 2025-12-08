#!/usr/bin/env node

/**
 * Script to copy packages from upstream zazuko repos and rename to @lindas scope
 */

const fs = require('fs');
const path = require('path');

const UPSTREAM_DIR = '_upstream';
const PACKAGES_DIR = 'packages';

// Package mappings: [source, target-name, description]
const PACKAGE_MAPPINGS = [
  // From zazuko-env monorepo
  { src: 'zazuko-env/packages/core', name: 'env-core', desc: 'RDF/JS Environment Core' },
  { src: 'zazuko-env/packages/env', name: 'env', desc: 'RDF/JS Environment' },
  { src: 'zazuko-env/packages/env-node', name: 'env-node', desc: 'RDF/JS Environment for Node.js' },

  // From zazuko-rdf-vocabularies monorepo
  { src: 'zazuko-rdf-vocabularies/packages/prefixes', name: 'prefixes', desc: 'RDF Prefixes' },
  { src: 'zazuko-rdf-vocabularies/packages/vocabularies', name: 'rdf-vocabularies', desc: 'RDF Vocabularies' },

  // From zazuko-vocabulary-extras monorepo
  { src: 'zazuko-vocabulary-extras/packages/vocabulary-extras', name: 'vocabulary-extras', desc: 'Additional RDF Vocabularies' },
  { src: 'zazuko-vocabulary-extras/packages/vocabulary-extras-builders', name: 'vocabulary-extras-builders', desc: 'Vocabulary Extras Builders' },

  // From zazuko-yasgui monorepo
  { src: 'zazuko-yasgui/packages/yasgui', name: 'yasgui', desc: 'Yet Another SPARQL GUI' },
  { src: 'zazuko-yasgui/packages/yasqe', name: 'yasqe', desc: 'SPARQL Query Editor' },
  { src: 'zazuko-yasgui/packages/yasr', name: 'yasr', desc: 'SPARQL Results Renderer' },

  // From zazuko-shacl-playground monorepo
  { src: 'zazuko-shacl-playground/packages/lib', name: 'shacl-playground', desc: 'SHACL Playground Library' },

  // Single-package repos
  { src: 'zazuko-spex', name: 'spex', desc: 'SPARQL Endpoint Explorer' },
  { src: 'zazuko-cube-hierarchy-query', name: 'cube-hierarchy-query', desc: 'Cube Hierarchy Query' },
  { src: 'zazuko-rdf-entity-webcomponent', name: 'rdf-entity-webcomponent', desc: 'RDF Entity Web Component' },
  { src: 'zazuko-shacl-test', name: 'shacl-test', desc: 'SHACL Test Runner' },
  { src: 'zazuko-rdf-parser-csvw', name: 'rdf-parser-csvw', desc: 'CSVW Parser' },
  { src: 'zazuko-rdf-utils-fs', name: 'rdf-utils-fs', desc: 'RDF Filesystem Utilities' },
];

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`  Warning: Source not found: ${src}`);
    return false;
  }

  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      // Skip node_modules, .git, and other build artifacts
      if (['node_modules', '.git', 'dist', 'lib', 'build', '.turbo', 'coverage'].includes(entry)) {
        continue;
      }
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
  return true;
}

function updatePackageJson(pkgPath, newName, description) {
  const pkgJsonPath = path.join(pkgPath, 'package.json');

  if (!fs.existsSync(pkgJsonPath)) {
    console.warn(`  Warning: No package.json found at ${pkgJsonPath}`);
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));

  // Update name to @lindas scope
  pkg.name = `@lindas/${newName}`;

  // Update description if provided
  if (description) {
    pkg.description = description;
  }

  // Update repository
  pkg.repository = {
    type: 'git',
    url: 'https://github.com/SwissFederalArchives/lindas-stack-libraries.git',
    directory: `packages/${newName}`
  };

  // Add publishConfig for public access
  pkg.publishConfig = {
    access: 'public'
  };

  // Update dependencies from @zazuko to @lindas where applicable
  const depsToUpdate = ['dependencies', 'devDependencies', 'peerDependencies'];
  for (const depType of depsToUpdate) {
    if (pkg[depType]) {
      const newDeps = {};
      for (const [dep, version] of Object.entries(pkg[depType])) {
        if (dep.startsWith('@zazuko/')) {
          const lindasDep = dep.replace('@zazuko/', '@lindas/');
          newDeps[lindasDep] = 'workspace:*';
          console.log(`    Remapped: ${dep} -> ${lindasDep}`);
        } else {
          newDeps[dep] = version;
        }
      }
      pkg[depType] = newDeps;
    }
  }

  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n');
}

function main() {
  console.log('Setting up LINDAS Stack Libraries packages...\n');

  // Ensure packages directory exists
  if (!fs.existsSync(PACKAGES_DIR)) {
    fs.mkdirSync(PACKAGES_DIR, { recursive: true });
  }

  for (const mapping of PACKAGE_MAPPINGS) {
    const srcPath = path.join(UPSTREAM_DIR, mapping.src);
    const destPath = path.join(PACKAGES_DIR, mapping.name);

    console.log(`Processing: ${mapping.src} -> packages/${mapping.name}`);

    if (copyRecursive(srcPath, destPath)) {
      updatePackageJson(destPath, mapping.name, mapping.desc);
      console.log(`  Done: @lindas/${mapping.name}\n`);
    } else {
      console.log(`  Skipped\n`);
    }
  }

  console.log('\nPackage setup complete!');
  console.log('Next steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run build');
  console.log('3. Run: npm test');
}

main();
