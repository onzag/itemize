"use strict";
/**
 * This file copies the necessary moment files that are used for data displaying
 * in all the different languages that are meant to be supported
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const safe_1 = __importDefault(require("colors/safe"));
const fsAsync = fs_1.default.promises;
/**
 * Copies the compiled moment files that exist within the node_modules
 * for async usage as they are deemed necessary on the fly
 * @param rawConfig the raw configuration
 * @returns a void promise
 */
async function copyMomentFiles(rawConfig) {
    await Promise.all(rawConfig.standard.supportedLanguages.map(async (lang) => {
        if (lang === "en") {
            return;
        }
        const outputFile = path_1.default.join("dist", "data", lang + ".moment.js");
        console.log("emiting " + safe_1.default.green(outputFile));
        try {
            await fsAsync.copyFile(path_1.default.join("node_modules", "moment", "locale", lang.toLowerCase() + ".js"), outputFile);
        }
        catch {
            await fsAsync.copyFile(path_1.default.join("node_modules", "itemize", "node_modules", "moment", "locale", lang.toLowerCase() + ".js"), outputFile);
        }
    }));
}
exports.copyMomentFiles = copyMomentFiles;
