import rdf from '@lindas/env';
import ParserN3 from '@rdfjs/parser-n3';
import fromStream from 'rdf-dataset-ext/fromStream.js';
import addAll from 'rdf-dataset-ext/addAll.js';
import toStream from 'rdf-dataset-ext/toStream.js';
import { loadDatasetStream } from './lib/loadDataset.js';
export function create(prefixMap) {
    return async function vocabularies({ only = null, factory = rdf, stream = false } = {}) {
        let selectedPrefixes = [];
        if (!!only && Array.isArray(only)) {
            only.forEach((prefix) => {
                if (prefix in prefixMap) {
                    selectedPrefixes.push(prefix);
                }
                else {
                    console.warn(`unknown prefix '${String(prefix)}'`);
                }
            });
        }
        if (!selectedPrefixes.length) {
            selectedPrefixes = Object.keys(prefixMap);
        }
        const promises = selectedPrefixes.map((prefix) => loadFile(prefix, { customSelection: !!only, factory }));
        const datasets = await Promise.all(promises);
        if (stream !== false) {
            let combinedDataset = factory.dataset();
            datasets.forEach((dataset) => {
                if (dataset && dataset.size) {
                    combinedDataset = addAll(combinedDataset, dataset);
                }
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return toStream(combinedDataset);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = {};
        datasets.forEach((dataset, i) => {
            if (dataset && dataset.size) {
                result[selectedPrefixes[i]] = dataset;
            }
        });
        return result;
    };
}
export async function loadFile(prefix, { customSelection, factory }) {
    try {
        const parserN3 = new ParserN3();
        const readStream = await loadDatasetStream(String(prefix));
        const quadStream = parserN3.import(readStream);
        return fromStream(factory.dataset(), quadStream);
    }
    catch {
        if (customSelection) {
            console.warn(`unavailable prefix '${String(prefix)}'`);
        }
    }
}
