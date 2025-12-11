import type { DatasetCore } from '@rdfjs/types';
import { NS } from '../namespace.js';
import { Factory } from '../Factory.js';
import TableSchema from './TableSchema.js';
interface Options {
    baseIRI: string;
    factory: Factory;
    timezone?: string;
    strictPropertyEscaping?: boolean;
}
export default class Metadata {
    factory: Factory;
    dataset: DatasetCore;
    baseIRI: string;
    timezone?: string;
    delimiter: string;
    quoteChar: string | null;
    lineTerminators: string[] | null;
    strictPropertyEscaping: boolean;
    ns: NS;
    tableSchemas: TableSchema[];
    constructor(dataset: DatasetCore, { baseIRI, factory, timezone, strictPropertyEscaping }: Options);
    parse(): void;
    parseDialect(): void;
}
export {};
