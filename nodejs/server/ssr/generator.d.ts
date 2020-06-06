import { IAppDataType } from "..";
import express from "express";
import { ISSRRuleDynamic, ISSRRuleSetCb } from ".";
export declare function ssrGenerator(req: express.Request, res: express.Response, html: string, appData: IAppDataType, mode: "development" | "production", rule: ISSRRuleDynamic | ISSRRuleSetCb): Promise<void>;
