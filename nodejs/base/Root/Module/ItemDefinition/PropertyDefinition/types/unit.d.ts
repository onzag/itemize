/**
 * Contains the unit type description
 *
 * @packageDocumentation
 */
import { IPropertyDefinitionSupportedType } from "../types";
/**
 * Units are described by a value and a unit, in either SI
 * or imperial system, the normalized value is always in SI
 * in a normalized unit as specified
 */
export interface IPropertyDefinitionSupportedUnitType {
    value: number;
    unit: string;
    normalizedValue: number;
    normalizedUnit: string;
}
/**
 * The description of the unit type as it behaves in the app
 */
declare const typeValue: IPropertyDefinitionSupportedType;
export default typeValue;
