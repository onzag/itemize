/**
 * Contains the property view currency renderer
 *
 * @packageDocumentation
 */
/// <reference types="react" />
import { IPropertyViewCurrencyRendererProps } from "../../../internal/components/PropertyView/PropertyViewCurrency";
/**
 * The property view currency renderer itself
 *
 * supported args:
 * - NullComponent: a react component to render instead of the default when the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - className: the class name for the root span container
 * - valueClassName: the class name for the actual value
 * - symbolClassName: the class name for the symbol that value has
 * - originalClassName: the class name for the original value (if there is one)
 * - originalSymbolClassName: the class name for the original value symbol (if there is one)
 *
 * @param props the props passed by the handler
 * @returns a react element
 */
export default function PropertyViewCurrencyRenderer(props: IPropertyViewCurrencyRendererProps): JSX.Element;
