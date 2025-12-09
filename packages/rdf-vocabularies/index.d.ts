import type { NamedNode } from '@rdfjs/types';
export { default as prefixes } from './prefixes.js';
export { vocabularies, loadFile } from './vocabularies.js';
export { shrink } from './shrink.js';
export { expandWithCheck } from './expandWithCheck.js';
export declare function expand(prefixed: string): string;
export declare function expand(prefixed: string, types: (string | NamedNode)[]): Promise<string>;
//# sourceMappingURL=index.d.ts.map