/**
 * The root object represents the point of entry of the application tree where
 * itemize is contained, this is what contains the modules and item definitons
 * there is only one single root per tree
 *
 * @packageDocumentation
 */
import Module, { IModuleRawJSONDataType } from "./Module";
import ItemDefinition from "./Module/ItemDefinition";
/**
 * The standard i18n information for usage
 * and any custom keys that are added here as extensions
 * from the i18n file
 */
export interface Ii18NType {
    [langLocale: string]: {
        [key: string]: string;
    };
}
export interface ILangLocalesType {
    [locale: string]: {
        name: string;
        rtl: boolean;
    };
}
/**
 * This is the raw processed form of the root
 */
export interface IRootRawJSONDataType {
    /**
     * The type is always root
     */
    type: "root";
    /**
     * Exists during the building process and represents the file location
     * it is stripped after processing
     */
    location?: string;
    /**
     * Also exists during the building process only and it's the pointers
     * that are used for tracebacks
     */
    pointers?: any;
    /**
     * The raw content of the file itself, as a plain string, it's stripped
     * after processing
     */
    raw?: string;
    /**
     * The i18n information that comes from the properties file
     */
    i18nData: Ii18NType;
    /**
     * All the modules contained within the root it is added after
     * the build
     */
    children: IModuleRawJSONDataType[];
}
/**
 * This is the root entry leaf
 */
export default class Root {
    /**
     * Provides a raw module for the given raw json root
     * @param root the raw json root
     * @param name the path of the module
     * @returns a raw module or null
     */
    static getModuleRawFor(root: IRootRawJSONDataType, name: string[]): IModuleRawJSONDataType;
    /**
     * The raw data this root was generated from
     */
    rawData: IRootRawJSONDataType;
    /**
     * A registry for fast access of Modules and Item definitions
     * uses the qualified name of those
     */
    registry: {
        [qualifiedName: string]: Module | ItemDefinition;
    };
    /**
     * The child modules
     */
    private childModules;
    /**
     * Builds a root from raw data
     * @param rawJSON the raw json data
     */
    constructor(rawJSON: IRootRawJSONDataType);
    cleanState(): void;
    /**
     * list all module names it contains
     * @returns an array of string with the module names
     */
    listModuleNames(): string[];
    /**
     * Provides all the modules it contains
     * should follow
     * @returns an array of Module
     */
    getAllModules(): Module[];
    /**
     * Gets a specific module given its name
     * @param name the path of the module
     * @returns an specific module
     */
    getModuleFor(name: string[]): Module;
    /**
     * Merges the i18n data with another root
     * @param root the other root
     */
    mergeWithI18n(root: IRootRawJSONDataType): void;
    /**
     * Provides the whole i18n data object
     * @returns the whole i18n data object
     */
    getI18nData(): Ii18NType;
    /**
     * Provides the module locale data
     * @param  locale the locale in iso form
     * @returns an object or null (if locale not valid)
     */
    getI18nDataFor(locale: string): {
        [key: string]: string;
    };
}
