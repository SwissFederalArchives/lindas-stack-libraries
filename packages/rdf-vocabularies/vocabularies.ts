import { create } from '@lindas/vocabulary-loader'
import prefixes from './prefixes.js'

export { loadFile, Datasets } from '@lindas/vocabulary-loader'

export const vocabularies = create(prefixes)
