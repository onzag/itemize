/**
 * Contains the property view simple renderer that simply displays a thing
 * used in raw properties and in simple properties such as text or numbers
 *
 * @packageDocumentation
 */
/// <reference types="react" />
import { IPropertyViewSimpleRendererProps } from "../../../internal/components/PropertyView/PropertyViewSimple";
/**
 * Allows for simple viewing of simple attributes
 *
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - dateFormat: a string, if specified will use that with moment to format the string like that
 *
 * @param props the props for the simple renderer passed by the handler
 * @returns a react element
 */
export default function PropertyViewSimpleRenderer(props: IPropertyViewSimpleRendererProps): JSX.Element;
