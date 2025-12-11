import fs from 'fs';
import module from 'module';
const { resolve } = module.createRequire(import.meta.url);
export async function loadDatasetStream(prefix) {
    return fs.createReadStream(resolve(`@vocabulary/${String(prefix)}/${String(prefix)}.nq`), { encoding: 'utf8' });
}
