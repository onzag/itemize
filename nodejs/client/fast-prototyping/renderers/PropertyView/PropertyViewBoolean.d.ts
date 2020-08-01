/**
 * The property view boolean renderer a rather straightforward renderer
 *
 * @packageDocumentation
 */
/// <reference types="react" />
import { IPropertyViewBooleanRendererProps } from "../../../internal/components/PropertyView/PropertyViewBoolean";
/**
 * The fast prototyping property view boolean renderer, basically used
 * the standard main i18n attributes to say yes, no or unspecified
 *
 * supported args:
 * - NullComponent: a react component to render instead of the default when the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 *
 * @param props the property view boolean renderer props given by the handler
 * @returns a react element
 */
export default function PropertyViewBooleanRenderer(props: IPropertyViewBooleanRendererProps): JSX.Element;
