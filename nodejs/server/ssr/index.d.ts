import Root from "../../base/Root";
import express from "express";
export interface ISSRRuleDynamic {
    collect: Array<[string, string, number, string]>;
    collectResources: string[];
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
    memId: string;
}
export declare type ISSRRuleSetCb = (req: express.Request, language: string, root: Root) => ISSRRuleDynamic;
export interface ISSRRuleSet {
    [commaSeparatedURLsWithoutLanguage: string]: ISSRRuleDynamic | ISSRRuleSetCb;
}
