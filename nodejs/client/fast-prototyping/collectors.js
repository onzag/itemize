"use strict";
/**
 * Contains the fast prototyping collector for collection usage
 * in SSR
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
const mui_core_1 = require("./mui-core");
/**
 * Temporarily stores the result of the collection
 */
const STYLE_COLLECTION = {};
/**
 * This collector is a valid collector type for usage with the
 * style collector for the initialization of the app in the server side
 */
exports.styleCollector = {
    /**
     * the collection function
     * @param app the itemize app
     */
    collect(app) {
        const id = uuid_1.default.v4();
        const sheets = new mui_core_1.ServerStyleSheets();
        STYLE_COLLECTION[id] = sheets;
        // returns the resulting node to use and the
        // id where it is supposed to be collected
        return {
            node: sheets.collect(app),
            id,
        };
    },
    /**
     * retrieves the styles
     * @param id the id that is expecting to retrieve
     * @returns a string with the #ssr-sheets value
     */
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
