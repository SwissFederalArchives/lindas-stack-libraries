import JsonLdSerializer, { SerializerOptions } from '@rdfjs/serializer-jsonld';
declare class CustomJsonLdSerializer extends JsonLdSerializer {
    constructor({ ...args }?: SerializerOptions);
}
export default CustomJsonLdSerializer;
