import formats from '@rdfjs/formats';
import baseEnv from '@lindas/env';
import Environment from '@lindas/env/Environment.js';
import FsUtilsFactory from '@lindas/rdf-utils-fs/Factory.js';
import FetchFactory from '@rdfjs/fetch-lite/Factory.js';
export { default as Environment } from '@lindas/env/Environment.js';
export function create() {
    const env = new Environment([
        FsUtilsFactory,
        FetchFactory,
    ], { parent: baseEnv });
    env.formats.import(formats);
    return env;
}
export default create();
