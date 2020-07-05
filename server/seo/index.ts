interface ISEOParametrizer {
  params: {
    [parameter: string]: string
  },
  lastMod: string;
}

export interface ISEOCollectedData {
  id: number;
  version: string;
  lastMod: string;
}

export interface ISEOCollectedResult {
  mod: string;
  idef: string;
  collected: ISEOCollectedData[];
}

export interface ISEORule {
  crawable: boolean;
  id?: string;
  collect?: Array<[string, string]>;
  parametrize?: (...args: ISEOCollectedResult[]) => ISEOParametrizer[]
}

export interface ISEORuleSet {
  [commaSeparatedURLsWithoutLanguage: string]: ISEORule,
}