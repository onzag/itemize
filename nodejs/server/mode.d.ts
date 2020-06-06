import express from "express";
import { IAppDataType } from ".";
export declare function getCookie(splittedCookie: string[], name: string): string;
export declare function getMode(appData: IAppDataType, req: express.Request): "development" | "production";
