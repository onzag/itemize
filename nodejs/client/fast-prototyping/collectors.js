"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
const mui_core_1 = require("./mui-core");
const STYLE_COLLECTION = {};
exports.styleCollector = {
    collect(app) {
        const id = uuid_1.default.v4();
        const sheets = new mui_core_1.ServerStyleSheets();
        STYLE_COLLECTION[id] = sheets;
        return {
            node: sheets.collect(app),
            id,
        };
    },
    retrieve(id) {
        const sheets = STYLE_COLLECTION[id];
        if (!sheets) {
            return "";
        }
        const value = '<style id="#ssr-sheets">' + sheets.toString() + '</style>';
        delete STYLE_COLLECTION[id];
        return value;
    }
};
