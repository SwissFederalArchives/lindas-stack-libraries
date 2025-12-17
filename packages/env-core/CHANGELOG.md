# @lindas/env-core

## 1.2.0

### Minor Changes

- Added comprehensive proxy traps to the extend() function to ensure proper object behavior:
  - getPrototypeOf: Returns Object.prototype to fix "Cannot convert undefined or null to object" errors
  - setPrototypeOf: Returns true to allow prototype operations
  - isExtensible: Returns true
  - preventExtensions: Returns false
  - defineProperty: Returns true
  - deleteProperty: Returns true
- These traps ensure the proxy behaves correctly when used with JavaScript introspection operations
  and bundlers that perform object analysis during build time.

## 1.1.2

### Patch Changes

- ca67860: Package built with `moduleResolution=NodeNext`

## 1.1.1

### Patch Changes

- 3335142: Added peer dependency on RDF/JS Env

## 1.1.0

### Minor Changes

- c69e70d: Added the facility to create an environment from two existing instances

### Patch Changes

- e901708: export `CombinedEnvironment`

## 1.0.1

### Patch Changes

- ed0bee7: Remove TS source from package

## 1.0.0

### Major Changes

- ef30fa1: Extracted a new package `@zazuko/env-core` with the extended `@rdfjs/environment`
