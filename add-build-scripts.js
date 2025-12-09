const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, 'packages');

// Packages that have TypeScript and need build scripts
const packagesToUpdate = fs.readdirSync(packagesDir).filter(pkg => {
  const tsconfigPath = path.join(packagesDir, pkg, 'tsconfig.json');
  return fs.existsSync(tsconfigPath);
});

console.log('Packages with tsconfig.json:', packagesToUpdate);

for (const pkg of packagesToUpdate) {
  const packageJsonPath = path.join(packagesDir, pkg, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`Skipping ${pkg} - no package.json`);
    continue;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  // Add build script if it doesn't exist
  if (!packageJson.scripts.build) {
    packageJson.scripts.build = 'tsc';
    console.log(`Added build script to ${pkg}`);
  } else {
    console.log(`${pkg} already has build script: ${packageJson.scripts.build}`);
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}

console.log('Done!');
