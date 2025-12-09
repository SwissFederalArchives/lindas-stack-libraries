import type { Readable } from 'stream';
import type { DatasetCore } from '@rdfjs/types';
import ObjectParserTransform from './lib/ObjectParserTransform.js';
import Metadata from './lib/metadata/Metadata.js';
import { Factory } from './lib/Factory.js';
export interface Options {
    baseIRI?: string;
    metadata: Metadata | DatasetCore;
    factory?: Factory;
    timezone?: string;
    relaxColumnCount?: boolean;
    skipLinesWithError?: boolean;
    trimHeaders?: boolean;
    skipEmptyLines?: boolean;
    strictPropertyEscaping?: boolean;
}
export default class Parser {
    private readonly metadata;
    private readonly baseIRI;
    private readonly factory;
    private readonly timezone;
    private readonly relaxColumnCount;
    private readonly skipLinesWithError;
    private readonly trimHeaders;
    private readonly skipEmptyLines;
    private readonly strictPropertyEscaping;
    constructor({ metadata, baseIRI, factory, timezone, relaxColumnCount, skipLinesWithError, trimHeaders, skipEmptyLines, strictPropertyEscaping }: Options);
    import(input: Readable, { metadata, baseIRI, factory, timezone, relaxColumnCount, skipLinesWithError, trimHeaders, skipEmptyLines, strictPropertyEscaping, }?: Partial<Options>): ObjectParserTransform;
    static import(input: Readable, options: Options): ObjectParserTransform;
}
