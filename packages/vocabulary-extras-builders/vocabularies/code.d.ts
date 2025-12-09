import { NamespaceBuilder } from '@rdfjs/namespace';
import { NamedNode } from '@rdfjs/types';
export interface Code {
    '': NamedNode<'https://code.described.at/'>;
    /** Code as defined by the ECMAScript specification */
    'EcmaScript': NamedNode<'https://code.described.at/EcmaScript'>;
    /** ECMAScript code expressed as an ES Module */
    'EcmaScriptModule': NamedNode<'https://code.described.at/EcmaScriptModule'>;
    /** Template Literal as defined in the ES2015 ECMAScript specification */
    'EcmaScriptTemplateLiteral': NamedNode<'https://code.described.at/EcmaScriptTemplateLiteral'>;
    /** ES2015 ECMAScript Template Literal enriched SPARQL query */
    'SparqlEcmaScriptTemplateLiteral': NamedNode<'https://code.described.at/SparqlEcmaScriptTemplateLiteral'>;
    /** Definition of a variable */
    'Variable': NamedNode<'https://code.described.at/Variable'>;
    /** Name of a variable */
    'VariableName': NamedNode<'https://code.described.at/VariableName'>;
    /** Arguments for a code call */
    'arguments': NamedNode<'https://code.described.at/arguments'>;
    /** Description of the implementation */
    'implementedBy': NamedNode<'https://code.described.at/implementedBy'>;
    /** IRI of the executable code */
    'link': NamedNode<'https://code.described.at/link'>;
    /** Name of a variable */
    'name': NamedNode<'https://code.described.at/name'>;
    /** Value of a variable */
    'value': NamedNode<'https://code.described.at/value'>;
    /** Definition of a variable */
    'variable': NamedNode<'https://code.described.at/variable'>;
    /** A set of variable definitions */
    'variables': NamedNode<'https://code.described.at/variables'>;
}
export declare const strict: NamespaceBuilder<keyof Code> & Code;
export declare const loose: NamespaceBuilder & Code;
//# sourceMappingURL=code.d.ts.map