import CsvParser from './lib/CsvParser.js';
import parseMetadata from './lib/metadata/index.js';
import ObjectParserTransform from './lib/ObjectParserTransform.js';
import rdf from './lib/Factory.js';
export default class Parser {
    metadata;
    baseIRI;
    factory;
    timezone;
    relaxColumnCount;
    skipLinesWithError;
    trimHeaders;
    skipEmptyLines;
    strictPropertyEscaping;
    constructor({ metadata, baseIRI = '', factory = rdf, timezone, relaxColumnCount, skipLinesWithError, trimHeaders, skipEmptyLines, strictPropertyEscaping }) {
        this.metadata = metadata;
        this.baseIRI = baseIRI;
        this.factory = factory;
        this.timezone = timezone;
        this.relaxColumnCount = relaxColumnCount;
        this.skipLinesWithError = skipLinesWithError;
        this.trimHeaders = trimHeaders;
        this.skipEmptyLines = skipEmptyLines;
        this.strictPropertyEscaping = strictPropertyEscaping;
    }
    import(input, { metadata = this.metadata, baseIRI = this.baseIRI, factory = this.factory, timezone = this.timezone, relaxColumnCount = this.relaxColumnCount, skipLinesWithError = this.skipLinesWithError, trimHeaders = this.trimHeaders, skipEmptyLines = this.skipEmptyLines, strictPropertyEscaping = this.strictPropertyEscaping, } = {}) {
        const parsedMetadata = parseMetadata(metadata, {
            baseIRI,
            factory,
            timezone,
            strictPropertyEscaping,
        });
        const reader = new CsvParser({
            delimiter: parsedMetadata.delimiter,
            lineTerminators: parsedMetadata.lineTerminators,
            quoteChar: parsedMetadata.quoteChar,
            relaxColumnCount,
            skipLinesWithError,
            trimHeaders,
            skipEmptyLines,
        });
        const output = new ObjectParserTransform({
            baseIRI,
            factory,
            metadata: parsedMetadata,
            timezone,
        });
        input.on('end', () => {
            if (!output.readable) {
                output.end();
            }
        });
        reader.on('error', err => {
            output.destroy(err);
        });
        input.on('error', (err) => {
            output.destroy(err);
        });
        input.pipe(reader).pipe(output);
        return output;
    }
    static import(input, options) {
        return (new Parser(options)).import(input);
    }
}
