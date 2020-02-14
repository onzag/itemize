/**
 * Contains the files type description
 */
import { IPropertyDefinitionSupportedType } from "../types";
import { IGQLFile } from "../../../../../../gql-querier";
export interface IPropertyDefinitionSupportedSingleFilesType extends IGQLFile {
}
/**
 * The type of a files type is an array of single files that itself are of type IGQLFile as they use
 * the gqlFields and the gqlAddFileToFields which adds file functionality
 */
export declare type PropertyDefinitionSupportedFilesType = IPropertyDefinitionSupportedSingleFilesType[];
/**
 * The type value represents the behaviour of files in the app
 */
declare const typeValue: IPropertyDefinitionSupportedType;
export default typeValue;
