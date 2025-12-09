import { Readable } from 'stream';
import type { Stream, DataFactory, DatasetCore, DatasetCoreFactory } from '@rdfjs/types';
import type { Environment } from '@rdfjs/environment/Environment.js';
export type Datasets<P extends Record<string, string>> = Record<keyof P, DatasetCore>;
export interface VocabulariesOptions<P extends Record<string, string>> {
    only?: (keyof P)[] | null;
    factory?: Environment<DatasetCoreFactory | DataFactory>;
}
export interface VocabulariesDatasetOptions<P extends Record<string, string>> extends VocabulariesOptions<P> {
    stream?: false;
}
export interface VocabulariesStreamOptions<P extends Record<string, string>> extends VocabulariesOptions<P> {
    stream: true;
}
export interface Loader<P extends Record<string, string>> {
    (options?: VocabulariesDatasetOptions<P>): Promise<Datasets<P>>;
    (options: VocabulariesStreamOptions<P>): Promise<Stream & Readable>;
}
export declare function create<P extends Record<string, string>>(prefixMap: P): Loader<P>;
interface LoadFileOptions {
    customSelection?: boolean;
    factory: Environment<DatasetCoreFactory>;
}
export declare function loadFile<P extends Record<string, string>>(prefix: keyof P, { customSelection, factory }: LoadFileOptions): Promise<DatasetCore<import("@rdfjs/types").Quad, import("@rdfjs/types").Quad> | undefined>;
export {};
//# sourceMappingURL=index.d.ts.map