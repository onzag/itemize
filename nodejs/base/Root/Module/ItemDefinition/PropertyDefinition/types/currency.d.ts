/**
 * Contains the currency type description
 *
 * @packageDocumentation
 */
import { IPropertyDefinitionSupportedType } from "../types";
/**
 * The currency definition is described by an object
 */
export interface IPropertyDefinitionSupportedCurrencyType {
    value: number;
    currency: string;
}
/**
 * The type of a curreny type specifies how it behaves in the app
 */
declare const typeValue: IPropertyDefinitionSupportedType;
export default typeValue;
