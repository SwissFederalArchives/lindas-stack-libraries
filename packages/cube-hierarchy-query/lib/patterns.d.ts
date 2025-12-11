import { Term } from 'rdf-js';
import type { MultiPointer } from 'clownface';
import { SparqlTemplateResult } from '@tpluscode/sparql-builder';
interface GetHierarchyPatterns {
    restrictTypes?: boolean;
    firstLevel(subject: Term, path: MultiPointer, level: number): SparqlTemplateResult;
}
export declare function bottomUp(hierarchyLevel: MultiPointer, { restrictTypes, firstLevel }: GetHierarchyPatterns): SparqlTemplateResult;
export {};
