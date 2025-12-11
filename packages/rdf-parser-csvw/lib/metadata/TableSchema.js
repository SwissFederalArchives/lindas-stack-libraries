/* eslint-disable camelcase */
import URL from 'url';
import difference from 'lodash/difference.js';
import uriTemplate from 'uri-templates';
import namespace from '../namespace.js';
import parseDateTime from '../parseDateTime.js';
const defaultColumnNames = new Set(['_column', '_sourceColumn', '_row', '_sourceRow', '_name']);
const xsd = 'http://www.w3.org/2001/XMLSchema#';
const rdfs = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const builtInTypes = new Map([
    ['number', `${xsd}double`],
    ['binary', `${xsd}base64Binary`],
    ['datetime', `${xsd}dateTime`],
    ['any', `${xsd}anyAtomicType`],
    ['xml', `${rdfs}XMLLiteral`],
    ['html', `${rdfs}HTML`],
    ['json', 'http://www.w3.org/ns/csvw#JSON'],
]);
export default class TableSchema {
    factory;
    ns;
    root;
    baseIRI;
    timezone;
    parsedColumns;
    allColumns;
    aboutUrl;
    propertyUrl;
    strictPropertyEscaping;
    constructor(dataset, { root, baseIRI, factory, timezone, strictPropertyEscaping }) {
        const graph = factory.clownface({ dataset });
        this.factory = factory;
        this.ns = namespace(this.factory);
        this.root = root ? graph.node(root) : graph.has(this.ns.tableSchema).out(this.ns.tableSchema).toArray().shift();
        this.baseIRI = baseIRI;
        this.timezone = timezone;
        this.strictPropertyEscaping = strictPropertyEscaping;
        this.aboutUrl = () => {
            return this.factory.blankNode();
        };
        this.parsedColumns = [];
        this.allColumns = null;
        if (dataset) {
            this.aboutUrl = this.parseAboutUrl() || this.aboutUrl;
            this.propertyUrl = this.parsePropertyUrl();
            this.parseColumns();
        }
    }
    parseAboutUrl() {
        const aboutUrl = this.root?.out(this.ns.aboutUrl).value;
        if (!aboutUrl) {
            return;
        }
        const aboutUrlTemplate = uriTemplate(aboutUrl);
        return (row) => {
            return this.factory.namedNode(URL.resolve(this.baseIRI, aboutUrlTemplate.fill(row))); // eslint-disable-line n/no-deprecated-api
        };
    }
    parsePropertyUrl() {
        const url = this.root?.out(this.ns.propertyUrl).value;
        if (!url) {
            return;
        }
        return uriTemplate(url);
    }
    parseColumns() {
        const columnNodes = [...this.root?.out(this.ns.column).list() || []];
        this.parsedColumns = columnNodes.map((node) => {
            const titles = node.out(this.ns.title).values;
            const name = node.out(this.ns.name).value || titles[0];
            const aboutUrl = node.out(this.ns.aboutUrl).value;
            const language = node.out(this.ns.lang).value;
            const nullValue = node.out(this.ns.null).value || '';
            const defaultValue = node.out(this.ns.default).value;
            const propertyUrl = node.out(this.ns.propertyUrl).value;
            const suppressOutput = node.out(this.ns.suppressOutput).value;
            const virtual = node.out(this.ns.virtual).value;
            const valueUrl = node.out(this.ns.valueUrl).value;
            const column = {
                datatype: this.parseDatatype(node.term),
                name,
                nullValue,
                defaultValue,
                propertyUrl: (propertyUrl && uriTemplate(propertyUrl)) || this.propertyUrl || this.defaultPropertyUrl(name),
                suppressOutput: suppressOutput === 'true',
                titles,
                virtual,
            };
            if (aboutUrl) {
                column.aboutUrl = uriTemplate(aboutUrl);
            }
            if (valueUrl) {
                column.valueUrl = uriTemplate(valueUrl);
            }
            if (language) {
                column.language = uriTemplate(language);
            }
            return column;
        });
    }
    parseDatatype(node) {
        const datatype = this.root?.node(node).out(this.ns.datatype);
        if (!datatype) {
            return this.defaultDatatype();
        }
        if (datatype.term?.termType === 'NamedNode') {
            return { base: datatype.term };
        }
        const baseString = datatype.out(this.ns.base).value;
        const format = datatype.out(this.ns.format).value;
        let base = builtInTypes.get(baseString);
        if (!base) {
            base = xsd + (baseString || 'string');
        }
        return {
            base: this.factory.namedNode(base),
            format,
        };
    }
    columns({ contentLine, row }) {
        try {
            if (!this.allColumns) {
                this.createAllColumns(row);
            }
            return this.allColumns.map((column) => {
                const cellData = { ...row, _name: column.name };
                return {
                    subject: this.subject(column, cellData),
                    property: this.property(column, cellData),
                    value: this.value(column, cellData),
                };
            }).filter((column) => {
                return column.value !== undefined;
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (cause) {
            const err = new Error(`could not parse content line ${contentLine}`);
            err.stack += `\nCaused by: ${cause.stack}`;
            throw err;
        }
    }
    subject(column, row) {
        if (!column.aboutUrl) {
            return null;
        }
        return this.factory.namedNode(URL.resolve(this.baseIRI, column.aboutUrl.fill(row))); // eslint-disable-line n/no-deprecated-api
    }
    value(column, row) {
        if (column.suppressOutput) {
            return undefined;
        }
        if (column.valueUrl) {
            return this.factory.namedNode(column.valueUrl.fill(row));
        }
        let value = column.titles.reduce((value, title) => {
            return value || row[title];
        }, '');
        if (value === '') {
            value = column.defaultValue;
        }
        if (typeof value === 'undefined' || value === column.nullValue) {
            return undefined;
        }
        if (column.datatype.format) {
            let literal;
            const date = parseDateTime(value, column.datatype.format, this.timezone);
            switch (column.datatype.base.value) {
                case this.ns.dateTimeStamp.value:
                case this.ns.dateTime.value:
                    literal = date?.toISO({ suppressMilliseconds: true });
                    break;
                case this.ns.date.value:
                    literal = date?.toISODate();
                    break;
                case this.ns.time.value:
                    literal = date?.toISOTime({ suppressMilliseconds: true });
                    break;
            }
            return this.factory.literal(literal || value, column.datatype.base);
        }
        if (column.datatype.base) {
            return this.factory.literal(value, (column.language && column.language.fill(row).toLowerCase()) || column.datatype.base);
        }
    }
    property(column, row) {
        return this.factory.namedNode(column.propertyUrl.fill(row));
    }
    createAllColumns(row) {
        const titles = this.parsedColumns.reduce((titles, column) => {
            return titles.concat(column.titles);
        }, []);
        const undefinedColumns = difference(Object.keys(row), titles).reduce((titles, title) => {
            if (defaultColumnNames.has(title))
                return titles;
            return [...titles, {
                    name: title,
                    titles: [title],
                    propertyUrl: this.propertyUrl || this.defaultPropertyUrl(title),
                    datatype: this.defaultDatatype(),
                }];
        }, []);
        this.allColumns = this.parsedColumns.concat(undefinedColumns);
    }
    defaultPropertyUrl(name) {
        let columnFragment = encodeURIComponent(name);
        if (this.strictPropertyEscaping) {
            columnFragment = columnFragment.replace(/-/g, '%2D');
        }
        return {
            fill: () => {
                return this.baseIRI + '#' + columnFragment;
            },
        };
    }
    defaultDatatype() {
        return { base: this.ns.string };
    }
}
