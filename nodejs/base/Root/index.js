"use strict";
/**
 * The root object represents the point of entry of the application tree where
 * itemize is contained, this is what contains the modules and item definitons
 * there is only one single root per tree
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = __importDefault(require("./Module"));
/**
 * This is the root entry leaf
 */
class Root {
    /**
     * Builds a root from raw data
     * @param rawJSON the raw json data
     */
    constructor(rawJSON) {
        /**
         * A registry for fast access of Modules and Item definitions
         * uses the qualified name of those
         */
        this.registry = {};
        // If its not production run the checks
        this.rawData = rawJSON;
        this.childModules = rawJSON.children.map((c) => new Module_1.default(c, this, null));
        // run the init
        this.childModules.forEach((cm) => {
            cm.init();
        });
    }
    /**
     * Provides a raw module for the given raw json root
     * @param root the raw json root
     * @param name the path of the module
     * @returns a raw module or null
     */
    static getModuleRawFor(root, name) {
        // Search for child items
        // remember children can be of type module or item definition
        // so we got to check
        let finalModule = root.children
            .find((d) => d.name === name[0]);
        // if we don't find such definition, return null
        if (!finalModule) {
            return null;
        }
        // Make a copy of the name
        const nNameConsumable = [...name];
        nNameConsumable.shift();
        // Get the current name to work on
        let currentName = nNameConsumable.shift();
        if (currentName) {
            do {
                finalModule =
                    finalModule.children.find((d) => d.name === currentName && d.type === "module");
                // if we find a death end
                if (!finalModule) {
                    return null;
                }
                currentName = nNameConsumable.shift();
            } while (currentName);
        }
        return finalModule;
    }
    cleanState() {
        this.childModules && this.childModules.forEach((cm) => cm.cleanState());
    }
    /**
     * list all module names it contains
     * @returns an array of string with the module names
     */
    listModuleNames() {
        return this.rawData.children.map((m) => m.name);
    }
    /**
     * Provides all the modules it contains
     * should follow
     * @returns an array of Module
     */
    getAllModules() {
        return this.childModules;
    }
    /**
     * Gets a specific module given its name
     * @param name the path of the module
     * @returns an specific module
     */
    getModuleFor(name) {
        // Search within the child definitions
        const resultModule = this.childModules
            .find((m) => m.getName() === name[0]);
        if (!resultModule) {
            throw new Error("Searching for module " +
                name.join("/") + " failed");
        }
        // consume and loop like usual
        const nNameConsumable = [...name];
        nNameConsumable.shift();
        if (nNameConsumable.length === 0) {
            return resultModule;
        }
        else {
            return resultModule.getModuleFor(nNameConsumable);
        }
    }
    /**
     * Merges the i18n data with another root
     * @param root the other root
     */
    mergeWithI18n(root) {
        this.rawData.i18nData = {
            ...this.rawData.i18nData,
            ...root.i18nData,
        };
        this.childModules.forEach((mod) => {
            const mergeModuleRaw = Root.getModuleRawFor(root, [mod.getName()]);
            if (mergeModuleRaw) {
                mod.mergeWithI18n(mergeModuleRaw);
            }
        });
    }
    /**
     * Provides the whole i18n data object
     * @returns the whole i18n data object
     */
    getI18nData() {
        return this.rawData.i18nData;
    }
    /**
     * Provides the module locale data
     * @param  locale the locale in iso form
     * @returns an object or null (if locale not valid)
     */
    getI18nDataFor(locale) {
        return this.rawData.i18nData[locale] || null;
    }
}
exports.default = Root;
