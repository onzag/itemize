/**
 * Contains the property view location renderer
 *
 * @packageDocumentation
 */
/// <reference types="react" />
import { IPropertyViewLocationRendererProps } from "../../../internal/components/PropertyView/PropertyViewLocation";
/**
 * Provides a renderer to view location
 *
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - hideMap: whether to hide the map
 *
 * @param props the props for the location renderer
 * @returns a react element
 */
export default function PropertyViewLocationRenderer(props: IPropertyViewLocationRendererProps): JSX.Element;
