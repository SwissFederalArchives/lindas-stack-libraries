import './register.js';
import { create } from '@lindas/vocabulary-loader';
import prefixes from './prefixes.js';
export { prefixes };
export const vocabularies = create(prefixes);
