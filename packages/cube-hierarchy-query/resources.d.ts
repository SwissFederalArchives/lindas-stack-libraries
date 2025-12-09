import { NamedNode, Term, DatasetCoreFactory } from 'rdf-js';
import type { GraphPointer } from 'clownface';
import { Describe } from '@tpluscode/sparql-builder';
import { StreamClient } from 'sparql-http-client';
/**
 * Creates a query to find an example resource found at the given level in hierarchy
 *
 * @param {GraphPointer} hierarchyLevel it must be a pointer to the full hierarchy dataset
 */
export declare function example(hierarchyLevel: GraphPointer): Describe | null;
interface ChildrenOptions {
    limit?: number;
    offset?: number;
    orderBy?: NamedNode[];
}
interface Children {
    query: Describe;
    execute(client: StreamClient, rdf: DatasetCoreFactory): Promise<{
        children: GraphPointer[];
        parent: GraphPointer;
    }>;
}
/**
 * Creates a query to find a set of example resources found at the given level in hierarchy
 *
 * The results can be paged, ordered and sorted
 *
 * @param {GraphPointer} level it must be a pointer to the full hierarchy dataset
 * @param {Term} parent
 */
export declare function children(level: GraphPointer, parent: Term, { limit, offset, orderBy }?: ChildrenOptions): Children | null;
export {};
