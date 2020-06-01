import Root from "../../base/Root";
import express from "express";
export interface ISSRRuleDynamic {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    collect: Array<[string, string, number, string]>;
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
    [urlWithoutLanguage: string]: ISSRRuleDynamic | ISSRRuleSetCb;
}
