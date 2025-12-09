import { TurtleValue } from '@tpluscode/rdf-string';
import type { GraphPointer } from 'clownface';
import { Context } from 'mocha';
export declare const ex: import("@rdfjs/namespace").NamespaceBuilder<any>;
export declare function startFuseki(this: Context): Promise<void>;
export declare function insertTestData(strings: TemplateStringsArray, ...values: TurtleValue[]): Promise<void>;
export declare function parse(strings: TemplateStringsArray, ...values: TurtleValue[]): Promise<import("clownface").AnyPointer<import("clownface").AnyContext, import("@lindas/env/lib/DatasetExt.js").Dataset>>;
export declare function serialize(ptr: GraphPointer): Promise<string>;
