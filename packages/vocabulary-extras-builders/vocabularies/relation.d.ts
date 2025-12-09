import { NamespaceBuilder } from '@rdfjs/namespace';
import { NamedNode } from '@rdfjs/types';
export interface Relation {
    '': NamedNode<'https://cube.link/relation/'>;
    /** Dispersion of the values of a random variable around its expected value. */
    'StandardDeviation': NamedNode<'https://cube.link/relation/StandardDeviation'>;
    'StandardError1SD': NamedNode<'https://cube.link/relation/StandardError1SD'>;
    /** The standard error is the standard deviation of the mean of the sample. */
    'StandardError': NamedNode<'https://cube.link/relation/StandardError'>;
    'StandardError2SD': NamedNode<'https://cube.link/relation/StandardError2SD'>;
    'StandardError3SD': NamedNode<'https://cube.link/relation/StandardError3SD'>;
}
export declare const strict: NamespaceBuilder<keyof Relation> & Relation;
export declare const loose: NamespaceBuilder & Relation;
//# sourceMappingURL=relation.d.ts.map