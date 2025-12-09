import prefixes from '@lindas/prefixes';
import morePrefixes from './prefixes.js';
Object.entries(morePrefixes)
    .forEach(([prefix, namespace]) => {
    prefixes[prefix] = namespace;
});
