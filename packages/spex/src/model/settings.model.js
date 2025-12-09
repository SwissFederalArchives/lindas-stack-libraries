const LEGACY_STORAGE_KEY = 'settings';
const STORAGE_KEY = 'spex.zazuko.com.settings';
export class SettingsPersistance {
    settingsObject = {
        sparqlEndpoint: null,
        username: null,
        password: null,
        namedGraph: null,
        prefixes: [],
        forceIntrospection: false
    };
    constructor() {
        this._migrateLegacyConfig();
        this._readSettingsFromLocalStorage();
    }
    /**
     * Merge current settings ()
     * @param urlSettings Settings from URL
     */
    mergeSettingsWithUrlSettings(urlSettings) {
        if (this.sparqlEndpoint !== urlSettings.sparqlEndpoint) {
            this.password = null;
            this.username = null;
        }
        this.sparqlEndpoint = urlSettings.sparqlEndpoint;
        this.namedGraph = urlSettings.namedGraph;
        this.prefixes = urlSettings.prefixes;
        this.forceIntrospection = urlSettings.forceIntrospection;
        this.storeSettings();
    }
    /**
     * Read the settings from localStorage and check type
     */
    _readSettingsFromLocalStorage() {
        Object.keys(this.settingsObject).forEach(key => {
            const valueAsString = localStorage.getItem(`${STORAGE_KEY}.${key}`);
            if (valueAsString === null) {
                return;
            }
            if (key === 'forceIntrospection') {
                const forceIntrospection = JSON.parse(valueAsString);
                if (typeof (forceIntrospection) !== 'boolean') {
                    return;
                }
                // valid type boolean
                this.settingsObject.forceIntrospection = forceIntrospection;
            }
            if (key === 'prefixes') {
                const prefixes = JSON.parse(valueAsString);
                if (Array.isArray(prefixes) && this._isPrefixArray(prefixes)) {
                    this.settingsObject.prefixes = prefixes;
                }
                return;
            }
            const value = JSON.parse(valueAsString);
            if (typeof (value) === 'string' || value === null) {
                this.settingsObject[key] = value;
            }
        });
    }
    /**
     * @deprecated
     * Migrate old configuration. This will be removed in the future
     */
    _migrateLegacyConfig() {
        const legacySettingsString = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacySettingsString === null) {
            // no legacy settings
            return;
        }
        const legacySettings = JSON.parse(legacySettingsString);
        if (legacySettings.url === null) {
            // no sparql endpoint set. the rest of the config is unimportant
            localStorage.removeItem(LEGACY_STORAGE_KEY);
            this.storeSettings();
            return;
        }
        if (typeof (legacySettings.url) === 'string') {
            this.settingsObject.sparqlEndpoint = legacySettings.url;
        }
        if (typeof (legacySettings.user) === 'string') {
            this.settingsObject.username = legacySettings.user;
        }
        if (typeof (legacySettings.password) === 'string') {
            this.settingsObject.password = legacySettings.password;
        }
        if (typeof (legacySettings.graph) === 'string') {
            this.settingsObject.namedGraph = legacySettings.graph;
        }
        if (Array.isArray(legacySettings.prefixes) && this._isLegacyPrefixArray(legacySettings.prefixes)) {
            this.settingsObject.prefixes = legacySettings.prefixes.map(x => {
                return {
                    prefix: x.prefix,
                    namespace: x.url
                };
            });
        }
        if (typeof (legacySettings.forceIntrospection) === 'boolean') {
            this.settingsObject.forceIntrospection = legacySettings.forceIntrospection;
        }
        this.storeSettings();
    }
    /**
     * Write settings to localStorage.
     */
    storeSettings() {
        Object.keys(this.settingsObject).forEach(key => {
            localStorage.setItem(`${STORAGE_KEY}.${key}`, JSON.stringify(this.settingsObject[key]));
        });
    }
    /**
     * Check if the array is an array of strings.
     *
     * @param arrayToCheck an array
     * @returns true if the array contains only strings
     */
    _isStringsArray(arrayToCheck) {
        return arrayToCheck.every(i => typeof i === 'string');
    }
    /**
   * Check if the array is an array of strings.
   *
   * @param arrayToCheck an array
   * @returns true if the array contains only strings
   */
    _isPrefixArray(arrayToCheck) {
        return arrayToCheck.every(i => {
            return (typeof i.prefix === 'string' && typeof i.namespace === 'string');
        });
    }
    /**
     * Check if the array is an array of strings.
     *
     * @param arrayToCheck an array
     * @returns true if the array contains only strings
     */
    _isLegacyPrefixArray(arrayToCheck) {
        return arrayToCheck.every(i => {
            return (typeof i.prefix === 'string' && typeof i.url === 'string');
        });
    }
    get sparqlEndpoint() {
        return this.settingsObject.sparqlEndpoint;
    }
    set sparqlEndpoint(sparqlEndpoint) {
        if (sparqlEndpoint === null) {
            this.settingsObject.username = null;
            this.settingsObject.password = null;
            this.settingsObject.namedGraph = null;
        }
        this.settingsObject.sparqlEndpoint = sparqlEndpoint;
    }
    get password() {
        return this.settingsObject.password;
    }
    set password(password) {
        this.settingsObject.password = password;
    }
    get username() {
        return this.settingsObject.username;
    }
    set username(username) {
        this.settingsObject.username = username;
    }
    get prefixes() {
        return this.settingsObject.prefixes;
    }
    set prefixes(prefixes) {
        this.settingsObject.prefixes = prefixes;
    }
    get namedGraph() {
        return this.settingsObject.namedGraph;
    }
    set namedGraph(namedGraph) {
        this.settingsObject.namedGraph = namedGraph;
    }
    get forceIntrospection() {
        return this.settingsObject.forceIntrospection;
    }
    set forceIntrospection(forceIntrospection) {
        this.settingsObject.forceIntrospection = forceIntrospection;
    }
    toJson() {
        return JSON.stringify(this.settingsObject, null, 4);
    }
}
export class UrlSettings {
    static createUrlSettingFromQueryParams(params) {
        const urlSettings = new UrlSettings(null, null, [], false);
        const sparqlEndpoint = params.sparqlEndpoint;
        if (!sparqlEndpoint) {
            return null;
        }
        if (sparqlEndpoint && typeof (sparqlEndpoint) === 'string') {
            urlSettings.sparqlEndpoint = sparqlEndpoint;
        }
        const namedGraph = params.namedGraph;
        if (namedGraph && typeof (namedGraph) === 'string') {
            urlSettings.namedGraph = namedGraph;
        }
        const forceIntrospection = params.forceIntrospection;
        if (typeof (forceIntrospection) === 'boolean') {
            urlSettings.forceIntrospection = forceIntrospection;
        }
        const prefixes = params.prefixes;
        if (Array.isArray(prefixes)) {
            urlSettings.prefixes = prefixes.map(p => {
                const prefix = p?.split(':')[0];
                const namespace = p?.substring((prefix?.length ?? 0) + 1);
                if (prefix && namespace) {
                    return {
                        prefix,
                        namespace
                    };
                }
                return {
                    prefix: '',
                    namespace: ''
                };
            }).filter(p => p.prefix.length > 0 && p.namespace.length > 0);
        }
        return urlSettings;
    }
    _sparqlEndpoint;
    _namedGraph;
    _prefixes;
    _forceIntrospection;
    constructor(sparqlEndpoint, namedGraph, prefixes, forceIntrospection) {
        this._sparqlEndpoint = sparqlEndpoint;
        this._namedGraph = namedGraph;
        this._prefixes = prefixes;
        this._forceIntrospection = forceIntrospection;
    }
    get sparqlEndpoint() {
        return this._sparqlEndpoint;
    }
    set sparqlEndpoint(value) {
        this._sparqlEndpoint = value;
    }
    get namedGraph() {
        return this._namedGraph;
    }
    set namedGraph(value) {
        this._namedGraph = value;
    }
    get prefixes() {
        return this._prefixes;
    }
    set prefixes(value) {
        this._prefixes = value;
    }
    get forceIntrospection() {
        return this._forceIntrospection;
    }
    set forceIntrospection(value) {
        this._forceIntrospection = value;
    }
    toRouterQueryObject() {
        const prefixesAsStringArray = this.prefixes.map(p => `${p.prefix}:${p.namespace}`);
        const queryObject = {
            sparqlEndpoint: this.sparqlEndpoint,
            forceIntrospection: this.forceIntrospection,
            namedGraph: this.namedGraph,
            prefixes: prefixesAsStringArray
        };
        return queryObject;
    }
    toJson() {
        return JSON.stringify({
            sparqlEndpoint: this.sparqlEndpoint,
            namedGraph: this.namedGraph,
            prefixes: this.prefixes,
            forceIntrospection: this.forceIntrospection
        }, null, 4);
    }
}
//# sourceMappingURL=settings.model.js.map