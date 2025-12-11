import E from '@rdfjs/environment';
import DF from '@rdfjs/data-model/Factory.js';
import NamespaceFactory from '@rdfjs/namespace/Factory.js';
import ClownfaceFactory from 'clownface/Factory.js';
export default new E([DF, ClownfaceFactory, NamespaceFactory]);
