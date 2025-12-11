import { NamedNode } from 'rdf-js';
import type { GraphPointer } from 'clownface';
export type PropertyWithConstraints = [
    NamedNode,
    {
        language?: string;
    }
];
export interface HierarchyConstraints {
    properties?: PropertyWithConstraints[];
}
export declare function fromHierarchy(hierarchy: GraphPointer, constraints?: HierarchyConstraints): import("clownface").AnyPointer<import("@rdfjs/types").BlankNode, import("@rdfjs/types").DatasetCore<import("@rdfjs/types").Quad, import("@rdfjs/types").Quad>>;
