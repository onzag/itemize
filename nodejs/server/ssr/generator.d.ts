import { IAppDataType } from "..";
import express from "express";
export declare function ssrGenerator(req: express.Request, res: express.Response, html: string, appData: IAppDataType, mode: "development" | "production"): Promise<void>;
