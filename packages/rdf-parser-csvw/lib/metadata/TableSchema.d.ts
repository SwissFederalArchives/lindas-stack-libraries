import uriTemplate, { URITemplate } from 'uri-templates';
import type { BlankNode, DatasetCore, NamedNode, Quad_Object, Term } from '@rdfjs/types';
import type { GraphPointer } from 'clownface';
import { Factory } from '../Factory.js';
interface Options {
    baseIRI: string;
    factory: Factory;
    timezone?: string;
    root?: Term | GraphPointer;
    strictPropertyEscaping?: boolean;
}
type Row = Record<string, string>;
interface Datatype {
    base: NamedNode;
    format?: string;
}
interface ParsedColumn {
    aboutUrl?: URITemplate;
    datatype: Datatype;
    language?: URITemplate;
    name: string;
    nullValue?: string;
    defaultValue?: string;
    propertyUrl: URITemplate;
    suppressOutput?: boolean;
    titles: string[];
    virtual?: string;
    valueUrl?: URITemplate;
}
interface Column {
    subject: NamedNode | BlankNode | null;
    property: NamedNode;
    value: Quad_Object;
}
export default class TableSchema {
    private readonly factory;
    private readonly ns;
    private readonly root;
    private readonly baseIRI;
    private readonly timezone;
    private parsedColumns;
    private allColumns;
    aboutUrl: (row: Row) => NamedNode | BlankNode;
    propertyUrl?: URITemplate;
    private readonly strictPropertyEscaping;
    constructor(dataset: DatasetCore, { root, baseIRI, factory, timezone, strictPropertyEscaping }: Options);
    parseAboutUrl(): ((row: Row) => NamedNode<string>) | undefined;
    parsePropertyUrl(): uriTemplate.URITemplate | undefined;
    parseColumns(): void;
    parseDatatype(node: Term): Datatype;
    columns({ contentLine, row }: {
        contentLine: number;
        row: Row;
    }): Column[];
    subject(column: ParsedColumn, row: Row): NamedNode<string> | null;
    value(column: ParsedColumn, row: Row): import("@rdfjs/types").Literal | NamedNode<string> | undefined;
    property(column: ParsedColumn, row: Row): NamedNode<string>;
    createAllColumns(row: Row): void;
    defaultPropertyUrl(name: string): URITemplate;
    defaultDatatype(): {
        base: NamedNode<"http://www.w3.org/2001/XMLSchema#string">;
    };
}
export {};
