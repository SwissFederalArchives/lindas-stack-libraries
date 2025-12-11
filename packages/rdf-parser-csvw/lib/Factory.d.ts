import DF from '@rdfjs/data-model/Factory.js';
import { Environment } from '@rdfjs/environment/Environment.js';
import type { DataFactory } from '@rdfjs/types';
import ClownfaceFactory from 'clownface/Factory.js';
export type Factory = Environment<DataFactory | ClownfaceFactory>;
declare const _default: Environment<ClownfaceFactory | DF | import("@rdfjs/namespace/Factory.js").NamespaceFactory>;
export default _default;
