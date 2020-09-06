/**
 * Bundles up and creates all the build files that are used as the schema
 * to generate everything in itemize, from the SQL database, to the endpoints
 * using the raw unprocessed data into some multiple per language files
 *
 * @packageDocumentation
 */
import { IPropertyDefinitionRawJSONDataType } from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IIncludeRawJSONDataType } from "../base/Root/Module/ItemDefinition/Include";
import { IPoliciesRawJSONDataType, IItemDefinitionRequestLimitersType, IItemDefinitionParentingRawJSONDataType } from "../base/Root/Module/ItemDefinition";
import "source-map-support/register";
/**
 * and this is the raw untreated json for an item
 */
export interface IFileItemDefinitionUntreatedRawJSONDataType {
    type: "item";
    imports?: string[];
    children?: string[];
    includes?: IIncludeRawJSONDataType[];
    properties?: IPropertyDefinitionRawJSONDataType[];
    createRoleAccess?: string[];
    editRoleAccess?: string[];
    deleteRoleAccess?: string[];
    searchRoleAccess?: string[];
    readRoleAccess?: string[];
    parentingRoleAccess?: string[];
    canBeParentedBy?: IItemDefinitionParentingRawJSONDataType[];
    canCreateInBehalf?: boolean;
    canCreateInBehalfRoleAccess?: string[];
    canCreateInBehalfTargetRoles?: string[];
    mustBeParented?: boolean;
    policies?: IPoliciesRawJSONDataType;
    ownerIsObjectId?: boolean;
    searchable?: boolean;
    versioningRoleAccess?: string[];
    enableVersioning?: boolean;
    versionIsLanguageAndCountry?: boolean;
    versionIsLanguage?: boolean;
    versionIsCountry?: boolean;
    requestLimiters?: IItemDefinitionRequestLimitersType;
}
export default function build(): Promise<void>;
