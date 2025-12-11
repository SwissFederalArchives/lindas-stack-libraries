export default class MetadataBuilder {
    static readFirstLine(filename: string): Promise<string>;
    static detectDelimiter(line: string): "," | "\t";
    static extractHeaders(line: string, delimiter: string): string[];
    static build(baseIri: string | undefined, headers: string[], { aboutUrl, delimiter, propertyBaseIri }?: {
        aboutUrl?: string;
        delimiter?: string;
        propertyBaseIri?: string;
    }): {
        dialect?: {
            delimiter: string;
        };
        tableSchema?: {
            aboutUrl: string;
            columns: {
                titles: string;
                propertyUrl: string;
            }[];
        };
        '@context': string;
    };
    static fromHeaderLine(firstLine: string, { aboutUrl, baseIri, delimiter, headers, propertyBaseIri }?: {
        aboutUrl?: string;
        baseIri?: string;
        delimiter?: string;
        headers?: string[];
        propertyBaseIri?: string;
    }): {
        dialect?: {
            delimiter: string;
        };
        tableSchema?: {
            aboutUrl: string;
            columns: {
                titles: string;
                propertyUrl: string;
            }[];
        };
        '@context': string;
    };
    static fromFile(filename: string, { aboutUrl, baseIri, delimiter, headers, propertyBaseIri }?: {
        aboutUrl?: string;
        baseIri?: string;
        delimiter?: string;
        headers?: string[];
        propertyBaseIri?: string;
    }): Promise<{
        dialect?: {
            delimiter: string;
        };
        tableSchema?: {
            aboutUrl: string;
            columns: {
                titles: string;
                propertyUrl: string;
            }[];
        };
        '@context': string;
    }>;
}
