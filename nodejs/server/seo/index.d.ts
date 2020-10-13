export interface ISEOParametrizer {
    params: {
        [parameter: string]: string;
    };
}
export interface ISEOCollectedData {
    id: number;
    version: string;
}
export interface ISEOCollectedResult {
    collected: ISEOCollectedData[];
}
export interface ISEORule {
    crawable: boolean;
    collect?: Array<[string, string]>;
    collectAllVersions?: boolean;
    parametrize?: (...args: ISEOCollectedResult[]) => ISEOParametrizer[];
}
export interface ISEORuleSet {
    [commaSeparatedURLsWithoutLanguage: string]: ISEORule;
}
