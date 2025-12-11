import { Transform } from 'readable-stream';
export interface Options {
    sheet?: number | string;
}
export default class XlsxToObjectTransform extends Transform {
    private readonly sheet;
    private readonly buffers;
    constructor(options?: Options);
    _transform(data: Buffer, encoding: unknown, done: () => void): void;
    _flush(done: () => void): Promise<void>;
}
