import type { DataFactory } from '@rdfjs/types';
import { RdfXmlParser } from 'rdfxml-streaming-parser';
import { IRdfXmlParserArgs } from 'rdfxml-streaming-parser/lib/RdfXmlParser';
declare class CustomRdfXmlParser extends RdfXmlParser {
    constructor({ factory, ...args }?: IRdfXmlParserArgs & {
        factory?: DataFactory;
    });
}
export default CustomRdfXmlParser;
