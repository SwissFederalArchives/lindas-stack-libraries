export class PrefixZazukoItem {
    _type;
    _comment;
    _serverResponseItem;
    constructor(item) {
        this._serverResponseItem = item;
        this._type = item.parts.filter(p => p.predicate === 'rdf:type')[0]?.object ?? '';
        const tempComment = item.parts.filter(p => p.predicate === 'rdfs:comment');
        if (tempComment.length < 2) {
            this._comment = valueToString(tempComment[0]?.object ?? 'no comment');
        }
        else {
            const enComment = tempComment.filter(com => com.object.language === 'en');
            if (enComment.length === 1) {
                this._comment = valueToString(enComment[0]?.object ?? 'no comment');
            }
            else {
                this._comment = 'no comment';
            }
        }
    }
    get type() {
        return this._type;
    }
    get avatar() {
        const typeS = this.type.split(':');
        if (typeS.length < 2) {
            return 'NT';
        }
        return (typeS[0].charAt(0) + typeS[1].charAt(0)).toUpperCase();
    }
    get itemText() {
        return this._serverResponseItem.itemText;
    }
    get ontologyTitle() {
        return this._serverResponseItem.ontologyTitle;
    }
    get label() {
        return this._serverResponseItem.label;
    }
    get splitA() {
        return this._serverResponseItem.prefixedSplitA;
    }
    get splitB() {
        return this._serverResponseItem.prefixedSplitB;
    }
    get comment() {
        return this._comment;
    }
    get parts() {
        return this._serverResponseItem.parts;
    }
}
export function valueToString(value) {
    if (typeof (value) === 'string') {
        return value;
    }
    if (value.datatype && value.datatype.value === 'http://www.w3.org/2001/XMLSchema#string') {
        return value.value;
    }
    if (value.datatype && value.datatype.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString') {
        return value.value;
    }
    return '';
}
/**
 *  "graph": {
        "value": "http://schema.org/"
    }
    "predicate": "rdfs:label",
    "predicateIRI": "http://www.w3.org/2000/01/rdf-schema#label",
    "object": {
        "value": "schemaVersion",
        "datatype": {
            "value": "http://www.w3.org/2001/XMLSchema#string"
        },
        "language": ""
    },
    "quad": {
        "subject": {
            "value": "http://schema.org/schemaVersion"
        },
        "predicate": {
            "value": "http://www.w3.org/2000/01/rdf-schema#label"
        },
        "object": {
            "value": "schemaVersion",
        "datatype": {
            "value": "http://www.w3.org/2001/XMLSchema#string"
        },
        "language": ""
    }
    }

graph: {value: "http://www.w3.org/ns/shacl#"}
iri: {value: "http://www.w3.org/ns/shacl#"}
iriSplitA: "http://www.w3.org/ns/shacl#"
iriSplitB: ""
itemText: "sh: (W3C Shapes Constraint Language (SHACL) Vocabulary)"
label: "W3C Shapes Constraint Language (SHACL) Vocabulary"
ontologyTitle: "W3C Shapes Constraint Language (SHACL) Vocabulary"
parts: [
 {
    predicate: "rdf:type",
    predicateIRI: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",…}
    object: "owl:Ontology"
    objectIRI: "http://www.w3.org/2002/07/owl#Ontology"
    predicate: "rdf:type"
predicateIRI: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
quad: {subject: {value: "http://www.w3.org/ns/shacl#"},…}
graph: {value: "http://www.w3.org/ns/shacl#"}
object: {value: "http://www.w3.org/2002/07/owl#Ontology"}
predicate: {value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"}
subject: {
    value: "http://www.w3.org/ns/shacl#"
}
prefixed: "sh:"
prefixedSplitA: "sh"
prefixedSplitB
: ""
 */
//# sourceMappingURL=prefix-server-response.model.js.map