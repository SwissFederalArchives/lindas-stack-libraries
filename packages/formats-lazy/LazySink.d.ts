/// <reference types="node" />
import EventEmitter from 'events';
import type * as RDF from '@rdfjs/types';
export interface SinkConstructor<S extends RDF.Sink<EventEmitter, EventEmitter>> {
    new (...args: any[]): S;
}
interface LoadSink<C extends SinkConstructor<any>> {
    (): Promise<C>;
}
type ConstructedFrom<C> = C extends SinkConstructor<infer S> ? S : never;
export interface LazySink<C extends SinkConstructor<any> = any> extends RDF.Sink<EventEmitter, EventEmitter> {
    load(): Promise<ConstructedFrom<C>>;
    import: ConstructedFrom<C>['import'];
}
export interface SinkProxyConstructor<C extends SinkConstructor<any>> {
    new (...args: ConstructorParameters<C>): LazySink<C>;
}
export declare function lazySink<C extends SinkConstructor<any>>(load: LoadSink<C>): SinkProxyConstructor<C>;
export {};
