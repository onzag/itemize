import Root from "../../base/Root";
import express from "express";
import { IConfigRawJSONDataType } from "../../config";
declare type ISSRRuleDynamicFn = (collectedValues: any[], config: IConfigRawJSONDataType) => string;
export interface ISSRRuleDynamic {
    title: string | ISSRRuleDynamicFn;
    description: string | ISSRRuleDynamicFn;
    ogTitle: string | ISSRRuleDynamicFn;
    ogDescription: string | ISSRRuleDynamicFn;
    ogImage: string | ISSRRuleDynamicFn;
    collect: Array<[string, string, number, string]>;
    collectResources: string[];
    memId: string;
}
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
export declare type ISSRRuleSetCb = (req: express.Request, language: string, root: Root) => ISSRRuleDynamic;
export interface ISSRRuleSet {
    [commaSeparatedURLsWithoutLanguage: string]: ISSRRuleDynamic | ISSRRuleSetCb;
}
export {};
