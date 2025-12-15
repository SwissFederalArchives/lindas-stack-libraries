# lindas-stack-libraries Changelog

**Repository:** SwissFederalArchives/lindas-stack-libraries
**Description:** LINDAS Stack Libraries - Monorepo containing shared RDF libraries for the LINDAS ecosystem

---

## December 2025

### 2025-12-12

**`803b6ab` - Add webpack build for yasgui and increase max response size**
- Added webpack build configuration for YASGUI
- Increased maximum response size limits

### 2025-12-11

**`af114d3` - Fix @lindas/shacl-test line endings and permissions for Linux compatibility**
- Fixed line endings for cross-platform compatibility
- Fixed file permissions for Linux execution

**`fae60b6` - Add docker-compose to release job**
- Added Docker Compose to release workflow

**`601dba5` - Combine CI and Release workflows into single pipeline**
- Consolidated CI and release into single workflow

**`f0c863c` - Add docker-compose setup to Release workflow**
- Added Docker setup for testing

**`390cc19` - Fix snapshot test name for renamed package**
- Fixed test references after package rename

**`d9ba42b` - Add docker-compose setup to CI workflow**
- Added Docker setup for CI testing

**`8c43c72` - Update wait-on to v9 for Node 22 compatibility**
- Updated wait-on for Node.js 22 support

**`2a25f7a` - Fix TypeScript test type errors in rdf-parser-csvw-xlsx**
- Fixed TypeScript type errors

**`5453070` - Add basic tests and configure automated npm publishing**
- Added test suite
- Configured automated npm publishing

**`1d684de` - Publish packages @lindas/env@3.0.5 and @lindas/env-node@3.0.3**
- Published updated environment packages

**`4afb108` - Fix TypeScript module resolution and update CI workflows**
- Fixed module resolution issues

**`e964954` - Fix security vulnerabilities by replacing vulnerable xlsx dependency**
- **Security Fix:** Replaced xlsx with exceljs
- Fixed Prototype Pollution (GHSA-4r6h-8v6p-xvw6)
- Fixed ReDoS vulnerability (GHSA-5pgg-2g8v-p4x9)

**`af5d4ae` - Fix approvals flag quoting to prevent empty string argument**
- Fixed CLI flag handling

**`decbeb3` - Fix shacl-test scripts to use explicit node and bash commands for npm compatibility**
- Fixed npm script compatibility

**`3ba5095` - Fix @lindas/shacl-test line endings and permissions for Linux compatibility**
- Cross-platform compatibility fixes

**`233b9ff` - Fix @lindas/env browser compatibility by using readable-stream and util polyfills**
- Added browser compatibility for environment package

### 2025-12-10

**`8ea3e5f` - Convert clownface from submodule to regular package files**
- Integrated clownface into monorepo as regular package

### 2025-12-09

**`20f6824` - Fix vue-graph-layout build with ESM-compatible config files**
- Fixed ESM module compatibility in vue-graph-layout

**`4e4ef97` - Fix security vulnerabilities in rdf-parser-csvw-xlsx and vue-graph-layout**
- **Security Fixes:**
  - rdf-parser-csvw-xlsx: xlsx -> exceljs (Prototype Pollution, ReDoS)
  - vue-graph-layout: Vue CLI -> Vite (webpack-dev-server CVEs)

**`c7cc1f6` - Add rdf-parser-csvw-xlsx and fix clownface for monorepo**
- Added @lindas/rdf-parser-csvw-xlsx package
- Fixed clownface for monorepo structure

**`c3d027e` - Bump @lindas/shacl-test to 0.1.3**
- Version bump for SHACL test package

**`ac43ec3` - Fix async/await in shorten-report.js for createPlaygroundUrl**
- Fixed async function handling

**`05224f2` - Update spex to use @lindas packages instead of @zazuko**
- Migrated spex to @lindas packages

**`1f04229` - Fix spex package to use @lindas dependencies instead of @zazuko**
- Updated spex dependencies

### 2025-12-08

**`23d52d0` - Fix security vulnerabilities with npm overrides and package updates**
- Applied npm overrides for security fixes:
  - ip: 2.0.1 (CVE-2024-29415)
  - braces: 3.0.3 (CVE-2024-4068)
  - micromatch: 4.0.8 (ReDoS fix)
  - ssh2: 1.16.0 (CVE-2024-47534)

**`ca749bc` - Initial setup of lindas-stack-libraries monorepo**
- Initial monorepo configuration
- Set up npm workspaces

---

## Packages Included

| Package | Description |
|---------|-------------|
| @lindas/env | RDF environment for browser and Node.js |
| @lindas/env-node | Node.js-specific RDF environment |
| @lindas/env-core | Core RDF environment |
| @lindas/clownface | Graph traversal library for RDF |
| @lindas/shacl-test | SHACL validation testing utilities |
| @lindas/rdf-parser-csvw-xlsx | CSVW parser with Excel support |
| @lindas/vue-graph-layout | Vue component for graph visualization |
| @lindas/spex | SPARQL execution utilities |

---

## Summary

### Security Fixes
- Replaced vulnerable xlsx with exceljs (Prototype Pollution, ReDoS)
- Replaced Vue CLI with Vite (webpack-dev-server CVEs)
- Applied npm overrides for ip, braces, micromatch, ssh2 vulnerabilities

### Package Migration
- All packages migrated from @zazuko to @lindas namespace
- Integrated clownface into monorepo

### Cross-Platform Compatibility
- Fixed line endings and permissions for Linux
- Fixed Windows path handling
- Added browser polyfills for environment package

### CI/CD
- Consolidated CI and Release workflows
- Added Docker Compose testing
- Configured automated npm publishing

---

*Last updated: 2025-12-15*
