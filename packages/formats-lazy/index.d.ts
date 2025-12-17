/// <reference types="node" />
import { EventEmitter } from 'events';
import { Stream } from '@rdfjs/types';
import SinkMap from '@rdfjs/sink-map';
declare const parsers: SinkMap<EventEmitter, Stream>;
declare const serializers: SinkMap<Stream, EventEmitter>;
declare const formats: {
    parsers: SinkMap<EventEmitter, Stream>;
    serializers: SinkMap<Stream, EventEmitter>;
};
declare const JsonLdParser: import("./LazySink.js").SinkProxyConstructor<typeof import("@rdfjs/parser-jsonld").default>;
declare const N3Parser: import("./LazySink.js").SinkProxyConstructor<typeof import("@rdfjs/parser-n3").default>;
declare const RdfXmlParser: import("./LazySink.js").SinkProxyConstructor<typeof import("./lib/CustomRdfXmlParser.js").default>;
declare const NTriplesSerializer: import("./LazySink.js").SinkProxyConstructor<typeof import("@rdfjs/serializer-ntriples").default>;
declare const JsonLdSerializer: import("./LazySink.js").SinkProxyConstructor<typeof import("./lib/CustomJsonLdSerializer.js").default>;
export { parsers, serializers };
export default formats;
export { JsonLdParser, JsonLdSerializer, N3Parser, NTriplesSerializer, RdfXmlParser, };
