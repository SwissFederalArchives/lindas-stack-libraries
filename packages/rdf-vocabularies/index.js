import { expand as _expand } from './expand.js';
import { expandWithCheck } from './expandWithCheck.js';
export { default as prefixes } from './prefixes.js';
export { vocabularies, loadFile } from './vocabularies.js';
export { shrink } from './shrink.js';
export { expandWithCheck } from './expandWithCheck.js';
export function expand(prefixed, types = []) {
    if (types && types.length) {
        return expandWithCheck(prefixed, types);
    }
    return _expand(prefixed);
}
