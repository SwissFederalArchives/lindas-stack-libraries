import onetime from 'onetime';
import { PassThrough } from 'readable-stream';
class LazySinkImpl {
    constructor(load, ...args) {
        this.load = onetime(async () => {
            const Sink = await load();
            return new Sink(...args);
        });
    }
    import(stream, options) {
        const passThrough = new PassThrough({ objectMode: true });
        Promise.resolve()
            .then(async () => {
            const sink = await this.load();
            const origStream = sink.import(stream, options);
            origStream.on('prefix', (prefix, ns) => {
                passThrough.emit('prefix', prefix, ns);
            });
            origStream.on('error', err => {
                passThrough.emit('error', err);
                passThrough.emit('end');
            });
            origStream.pipe(passThrough);
        });
        return passThrough;
    }
}
export function lazySink(load) {
    return class extends LazySinkImpl {
        constructor(...args) {
            super(load, ...args);
        }
    };
}
