# @lindas/formats-lazy

## 1.0.2

### Bug Fixes

- Fixed malformed TypeScript type declarations in index.d.ts
- SinkMap generic types now correctly use `EventEmitter` and `Stream` from @rdfjs/types
- Fixes TS2345 type error when using `env.formats.import(formats)` with @lindas/env

## 1.0.0

### Initial Release

- Forked from @zazuko/formats-lazy v1.0.2
- Provides lazy-loaded RDF parsers and serializers for browser compatibility
- Uses @rdfjs/parser-n3 for Turtle, N-Triples, N-Quads, N3, and TriG formats
- Uses @rdfjs/parser-jsonld for JSON-LD format
- Uses rdfxml-streaming-parser for RDF/XML format
- Does not depend on @graphy/* packages (which require Node.js crypto)
