/**
 * The property entry boolean fast prototyping renderer uses material ui to render
 * an entry for a boolean value
 *
 * @packageDocumentation
 */
import { IPropertyEntryBooleanRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryBoolean";
import React from "react";
import { WithStyles } from "../../mui-core";
/**
 * The styles of the renderer
 */
export declare const style: Record<"entry" | "label" | "description" | "icon" | "container" | "labelSingleLine", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The renderer props, based on the properties it will take
 */
interface IPropertyEntryBooleanRendererWithStylesProps extends IPropertyEntryBooleanRendererProps, WithStyles<typeof style> {
}
/**
 * This is the fast prototyping boolean renderer and uses material ui in order to render a slick
 * boolean entry for it, supports the following args
 *
 * - descriptionAsAlert: displays the description as an alert rather than its normal form
 *
 * @param props the entry boolean props
 * @returns a react element
 */
declare const PropertyEntryBooleanRenderer: React.ComponentType<Pick<IPropertyEntryBooleanRendererWithStylesProps, "label" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "isTernary" | "trueLabel" | "falseLabel" | "nullLabel" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled"> & import("@material-ui/styles").StyledComponentProps<"entry" | "label" | "description" | "icon" | "container" | "labelSingleLine">>;
export default PropertyEntryBooleanRenderer;
