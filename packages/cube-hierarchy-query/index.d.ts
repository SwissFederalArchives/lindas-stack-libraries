import { DatasetCoreFactory, NamedNode } from 'rdf-js';
import type { GraphPointer } from 'clownface';
import type StreamClient from 'sparql-http-client';
import { Options as ShapeToQueryOptions } from '@hydrofoil/shape-to-query';
import { PropertyWithConstraints } from './lib/hierarchyShape.js';
export declare class HierarchyNode {
    readonly resource: GraphPointer;
    private hierarchyLevel;
    constructor(resource: GraphPointer, hierarchyLevel: GraphPointer);
    get nextInHierarchy(): Array<HierarchyNode>;
}
export interface Hierarchy {
    query: string;
    shape: GraphPointer;
    execute(client: StreamClient, rdf: DatasetCoreFactory): Promise<Array<HierarchyNode>>;
}
interface GetHierarchyOptions {
    properties?: Array<NamedNode | PropertyWithConstraints>;
    shapeToQueryOptions?: ShapeToQueryOptions;
}
export declare function getHierarchy(hierarchy: GraphPointer, { properties, shapeToQueryOptions }?: GetHierarchyOptions): Hierarchy;
export {};
