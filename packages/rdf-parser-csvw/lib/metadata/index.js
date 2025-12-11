import rdf from '@rdfjs/dataset';
import Metadata from './Metadata.js';
export default function metadata(input, { baseIRI, factory, timezone, strictPropertyEscaping }) {
    if (!input) {
        return new Metadata(rdf.dataset(), { baseIRI, factory, timezone, strictPropertyEscaping });
    }
    if ('match' in input) {
        return new Metadata(input, { baseIRI, factory, timezone, strictPropertyEscaping });
    }
    return input;
}
