export function extend({ parent, child }) {
    const proxy = new Proxy({}, {
        get(target, prop) {
            // Handle Symbol.toStringTag for proper object identification
            if (prop === Symbol.toStringTag) {
                return 'Environment';
            }
            // Check child first, then parent
            if (prop in child) {
                return child[prop];
            }
            if (prop in parent) {
                return parent[prop];
            }
            return undefined;
        },
        set(target, prop, value) {
            child[prop] = value;
            return true;
        },
        has(target, prop) {
            return prop in child || prop in parent;
        },
        ownKeys() {
            const parentKeys = parent ? Object.getOwnPropertyNames(parent) : [];
            const childKeys = child ? Object.getOwnPropertyNames(child) : [];
            return [...new Set([...parentKeys, ...childKeys]).values()];
        },
        getOwnPropertyDescriptor(target, prop) {
            return {
                enumerable: !prop.toString().startsWith('_'),
                configurable: true,
            };
        },
        getPrototypeOf() {
            return Object.prototype;
        },
        setPrototypeOf() {
            return true;
        },
        isExtensible() {
            return true;
        },
        preventExtensions() {
            return false;
        },
        defineProperty() {
            return true;
        },
        deleteProperty() {
            return true;
        },
    });
    return proxy;
}
