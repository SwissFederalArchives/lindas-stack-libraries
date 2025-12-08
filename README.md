# LINDAS Stack Libraries

Monorepo for all LINDAS RDF libraries - forked from Zazuko packages and consolidated under the `@lindas` npm scope.

## Packages

### Core RDF Libraries
| Package | Description |
|---------|-------------|
| `@lindas/env` | RDF/JS Environment |
| `@lindas/env-core` | RDF/JS Environment Core |
| `@lindas/env-node` | RDF/JS Environment for Node.js |
| `@lindas/clownface` | Graph traversing library |
| `@lindas/prefixes` | RDF Prefixes |
| `@lindas/rdf-vocabularies` | RDF Vocabularies |
| `@lindas/vocabulary-loader` | Vocabulary Loader |
| `@lindas/vocabulary-extras` | Additional RDF Vocabularies |
| `@lindas/vocabulary-extras-builders` | Vocabulary Extras Builders |

### Parsers and Utilities
| Package | Description |
|---------|-------------|
| `@lindas/rdf-parser-csvw` | CSVW Parser |
| `@lindas/rdf-utils-fs` | RDF Filesystem Utilities |

### SHACL
| Package | Description |
|---------|-------------|
| `@lindas/shacl-playground` | SHACL Playground Library |
| `@lindas/shacl-test` | SHACL Test Runner |

### UI Components
| Package | Description |
|---------|-------------|
| `@lindas/yasgui` | Yet Another SPARQL GUI |
| `@lindas/yasqe` | SPARQL Query Editor |
| `@lindas/yasr` | SPARQL Results Renderer |
| `@lindas/yasgui-utils` | YASGUI Utilities |
| `@lindas/spex` | SPARQL Endpoint Explorer |
| `@lindas/vue-graph-layout` | Vue Graph Layout Component |
| `@lindas/rdf-entity-webcomponent` | RDF Entity Web Component |
| `@lindas/cube-hierarchy-query` | Cube Hierarchy Query |

## Development

### Prerequisites

- Node.js 18+
- npm 10+

### Setup

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test

# Run linting
npm run lint
```

### Creating a Release

This repository uses [Changesets](https://github.com/changesets/changesets) for version management.

```bash
# Create a changeset
npm run changeset

# Version packages (usually done by CI)
npm run version-packages

# Publish (usually done by CI)
npm run release
```

## CI/CD

- **CI Workflow**: Runs on every push and PR, tests on Node.js 18, 20, and 22
- **Release Workflow**: Automatically creates release PRs and publishes to npm when merged
- **Dependabot**: Automatically updates dependencies weekly

## License

Most packages are MIT licensed. See individual package directories for specific licenses.

Note: `@lindas/shacl-playground` is AGPL-3.0 licensed.

## Origins

These packages are forks of various [Zazuko](https://github.com/zazuko) open-source projects, consolidated and maintained for the LINDAS (Linked Data Service) infrastructure by the Swiss Federal Archives.
