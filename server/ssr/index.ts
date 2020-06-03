import Root from "../../base/Root";
import express from "express";
import { IConfigRawJSONDataType } from "../../config";

// could use ISSRCollectedQueryType[] but this makes the querying more painful than it should
type ISSRRuleDynamicFn = (collectedValues: any[], config: IConfigRawJSONDataType) => string;

// this info should be specified
export interface ISSRRuleDynamic {
  title: string | ISSRRuleDynamicFn;
  description: string | ISSRRuleDynamicFn;
  ogTitle: string | ISSRRuleDynamicFn;
  ogDescription: string | ISSRRuleDynamicFn;
  ogImage: string | ISSRRuleDynamicFn;
  collect: Array<[string, string, number, string]>;
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
  [urlWithoutLanguage: string]: ISSRRuleDynamic | ISSRRuleSetCb;
}