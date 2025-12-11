import { Term } from 'rdf-js';
import type { MultiPointer } from 'clownface';
import { SparqlTemplateResult } from '@tpluscode/sparql-builder';
export declare function anyPath(subject: Term, path: MultiPointer, level: number): SparqlTemplateResult;
export declare function requiredPath(subject: Term, path: MultiPointer, level: number): SparqlTemplateResult;
