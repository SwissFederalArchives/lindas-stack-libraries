import prefixes from '@lindas/prefixes';
import rdfEnvironment from '@lindas/env/web.js';
prefixes.spex = 'https://described.at/spex/';
export const rdf = rdfEnvironment.namespace(prefixes.rdf);
export const schema = rdfEnvironment.namespace(prefixes.schema);
export const sh = rdfEnvironment.namespace(prefixes.sh);
export const spex = rdfEnvironment.namespace(prefixes.spex);
export { prefixes };
//# sourceMappingURL=namespace.js.map