import type { Readable } from 'stream';
import { Options as CsvwOptions } from '@lindas/rdf-parser-csvw';
import ObjectParserTransform from '@lindas/rdf-parser-csvw/lib/ObjectParserTransform.js';
import { Options as XlsxOptions } from './lib/XlsxToObjectTransform.js';
type Options = XlsxOptions & CsvwOptions;
export default class Parser {
    private readonly options;
    constructor(options?: Partial<Options>);
    import(input: Readable, options?: Partial<Options>): ObjectParserTransform;
    static import(input: Readable, options: Options): ObjectParserTransform;
}
export {};
