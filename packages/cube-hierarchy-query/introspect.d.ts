import { Construct } from '@tpluscode/sparql-builder';
import type { GraphPointer } from 'clownface';
/**
 * Creates a query to find properties connecting the given hierarchy
 * level with its immediate parent.
 *
 * @param {GraphPointer} hierarchyLevel it must be a pointer to the full hierarchy dataset
 */
export declare function properties(hierarchyLevel: GraphPointer): Construct | null;
/**
 * Creates a query to find all RDF types of resources at a given hierarchy level
 *
 * @param {GraphPointer} hierarchyLevel it must be a pointer to the full hierarchy dataset
 */
export declare function types(hierarchyLevel: GraphPointer): Construct | null;
