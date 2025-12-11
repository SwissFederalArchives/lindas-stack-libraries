import { Transform } from 'readable-stream';
import type { BlankNode, DatasetCore, NamedNode, Quad } from '@rdfjs/types';
import TableSchema from './metadata/TableSchema.js';
import Metadata from './metadata/Metadata.js';
import { Factory } from './Factory.js';
interface Options {
    baseIRI?: string;
    factory?: Factory;
    metadata?: Metadata | DatasetCore;
    tableSchema?: TableSchema;
    timezone?: string;
}
export default class ObjectParserTransform extends Transform {
    private readonly baseIRI;
    private readonly factory;
    private readonly timezone;
    private ns;
    private contentLine;
    private tableGroupNode;
    private tableNode;
    private tableSchema;
    private parsedMetadata;
    constructor({ baseIRI, factory, metadata, tableSchema, timezone }?: Options);
    _transform(obj: {
        line: number;
        row: Record<string, string>;
    }, encoding: string, done: () => void): void;
    processTableGroup(): void;
    processTable(): void;
    processRow(line: number, row: Record<string, string>): Promise<void>;
    copySubgraph(quads: Quad[], subject?: NamedNode | BlankNode): void;
}
export {};
