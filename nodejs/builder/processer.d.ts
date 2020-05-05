/**
 * Processes the json schema of itemize in order to remove useless data
 * like pointers, file information, trackers and location; and also strippes
 * unecessary language information if deemed required
 *
 * @packageDocumentation
 */
import { IRootRawJSONDataType } from "../base/Root";
import { IModuleRawJSONDataType } from "../base/Root/Module";
import { IPropertyDefinitionRawJSONDataType } from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IItemDefinitionRawJSONDataType } from "../base/Root/Module/ItemDefinition";
import { IIncludeRawJSONDataType } from "../base/Root/Module/ItemDefinition/Include";
import "source-map-support/register";
/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
export declare function processItemDefinition(rawData: IItemDefinitionRawJSONDataType, locale?: string): {
    type: "item";
    location?: string;
    i18nDataLocation?: string;
    pointers?: any;
    raw?: string;
    name: string;
    i18nData: import("../base/Root/Module").IRawJSONI18NDataType;
    includes?: IIncludeRawJSONDataType[];
    properties?: IPropertyDefinitionRawJSONDataType[];
    enableVersioning?: boolean;
    versionIsLanguageAndCountry?: boolean;
    versionIsCountry?: boolean;
    versionIsLanguage?: boolean;
    versioningRoleAccess?: string[];
    readRoleAccess?: string[];
    createRoleAccess?: string[];
    editRoleAccess?: string[];
    deleteRoleAccess?: string[];
    importedChildDefinitions?: string[][];
    childDefinitions?: IItemDefinitionRawJSONDataType[];
    policies?: import("../base/Root/Module/ItemDefinition").IPoliciesRawJSONDataType;
    ownerIsObjectId?: boolean;
    searchable?: boolean;
    canCreateInBehalf?: boolean;
    createInBehalfRoleAccess?: string[];
    canBeParentedBy?: import("../base/Root/Module/ItemDefinition").IItemDefinitionParentingRawJSONDataType[];
    mustBeParented?: boolean;
    parentingRoleAccess?: string[];
};
/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
export declare function processInclude(rawData: IIncludeRawJSONDataType, locale?: string): IIncludeRawJSONDataType;
export declare function processPropertyDefinition(rawData: IPropertyDefinitionRawJSONDataType, locale?: string): IPropertyDefinitionRawJSONDataType;
/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
export declare function processModule(rawData: IModuleRawJSONDataType, locale?: string): {
    type: "module";
    location?: string;
    i18nDataLocation?: string;
    pointers?: any;
    raw?: string;
    propExtLocation?: string;
    propExtRaw?: string;
    propExtPointers?: any;
    name: string;
    i18nData: import("../base/Root/Module").IRawJSONI18NDataType;
    readRoleAccess?: string[];
    modRoleAccess?: string[];
    flagRoleAccess?: string[];
    searchable?: boolean;
    children: (IItemDefinitionRawJSONDataType | IModuleRawJSONDataType)[];
    propExtensions?: IPropertyDefinitionRawJSONDataType[];
};
/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
export declare function processRoot(rawData: IRootRawJSONDataType, locale?: string): {
    type: "root";
    location?: string;
    pointers?: any;
    raw?: string;
    i18nData: import("../base/Root").Ii18NType;
    children: IModuleRawJSONDataType[];
};
