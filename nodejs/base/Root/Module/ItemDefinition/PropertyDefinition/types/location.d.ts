/**
 * Contains the location type description
 *
 * @packageDocumentation
 */
import { IPropertyDefinitionSupportedType } from "../types";
/**
 * The location is described by an object with longitude, latitude,
 * a text description and an alternative text description
 */
export interface IPropertyDefinitionSupportedLocationType {
    lng: number;
    lat: number;
    txt: string;
    atxt: string;
    id: string;
}
/**
 * The type describes the behaviour of the location in the app
 */
declare const typeValue: IPropertyDefinitionSupportedType;
export default typeValue;
