import Root from "../../base/Root";
import express from "express";
import { IConfigRawJSONDataType } from "../../config";
import { IOrderByRuleType, SearchVariants } from "../../constants";
import { PropertyDefinitionValueType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition";

// could use ISSRCollectedQueryType[] but this makes the querying more painful than it should
type ISSRRuleDynamicFn = (collectedValues: any[], config: IConfigRawJSONDataType) => string;

export interface ISSRSearchPropertySetter {
  [property: string]: {
    variant: SearchVariants;
    value: PropertyDefinitionValueType;
  }
}

export interface ISSRSearchIncludeSetter {
  [include: string]: {
    exclusionState: boolean;
    properties: ISSRSearchPropertySetter;
  };
};

export interface ISSRSearchRule {
  slot: [string, string, number, string];
  searchId: string;
  options: {
    setProperties?: ISSRSearchPropertySetter;
    setIncludes?: ISSRSearchIncludeSetter;
    requestedProperties: string[];
    requestedIncludes?: string[];
    orderBy?: IOrderByRuleType;
    createdBy?: number;
    parentedBy?: {
      module: string,
      itemDefinition: string,
      id: number,
      version?: string,
    };
    limit: number;
    offset: number;
  };
}

// this info should be specified
export interface ISSRRuleDynamic {
  title: string | ISSRRuleDynamicFn;
  description: string | ISSRRuleDynamicFn;
  ogTitle: string | ISSRRuleDynamicFn;
  ogDescription: string | ISSRRuleDynamicFn;
  ogImage: string | ISSRRuleDynamicFn;
  collect: Array<[string, string, number, string]>;
  collectResources: string[];
  collectSearch: ISSRSearchRule[];
  memId: string;
}

// this infor can be retrieved via the config and other attributes
// doesn't need to be specified
export interface ISSRRule extends ISSRRuleDynamic {
  language: string;
  languages: string[];
  rtl: boolean;
  forUser: {
    token: string;
    id: number;
    role: string;
  };
  noData: boolean;
}

export type ISSRRuleSetCb = (req: express.Request, language: string, root: Root) => ISSRRuleDynamic;

export interface ISSRRuleSet {
  [commaSeparatedURLsWithoutLanguage: string]: ISSRRuleDynamic | ISSRRuleSetCb;
}