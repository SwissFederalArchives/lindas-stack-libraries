import { Parser } from 'csv-parse';
import { Transform } from 'readable-stream';
interface Options {
    delimiter?: string;
    lineTerminators?: string[] | null;
    quoteChar?: string | null;
    relaxColumnCount?: boolean;
    skipLinesWithError?: boolean;
    skipEmptyLines?: boolean;
    trimHeaders?: boolean;
}
export default class CsvParser extends Transform {
    parser: Parser;
    constructor({ delimiter, lineTerminators, quoteChar, relaxColumnCount, skipLinesWithError, skipEmptyLines, trimHeaders }?: Options);
    _transform(chunk: Record<string, string>, encoding: BufferEncoding, callback: () => void): void;
    _flush(callback: () => void): void;
}
export {};
