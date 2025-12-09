import type { NamedNode } from '@rdfjs/types';
import { Datasets } from './vocabularies.js';
export declare const loadedPrefixes: Datasets<any>;
type Types = (string | NamedNode)[];
export declare function expandWithCheck(prefixed: string, types: Types): Promise<string>;
export {};
//# sourceMappingURL=expandWithCheck.d.ts.map