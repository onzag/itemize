/**
 * Contains the select entry field renderer for fast prototyping
 *
 * The select entry field renderer is used for types, number, integer and string when
 * they have defined values
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../../mui-core";
import { IPropertyEntrySelectRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntrySelect";
/**
 * The styles for the select
 */
export declare const style: Record<"entry" | "label" | "description" | "icon" | "container" | "errorMessage" | "fieldInput" | "selectFieldIconWhenAddornmentIsActive", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntrySelectRendererProps> | ((props: IPropertyEntrySelectRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntrySelectRendererProps>)>;
/**
 * The props for the select
 */
interface IPropertyEntrySelectRendererWithStylesProps extends IPropertyEntrySelectRendererProps, WithStyles<typeof style> {
}
/**
 * The property entry select is the renderer used when the property has specific valid values
 * these valid values are only supported as either string or number, so only types string, text,
 * integer, year and number are truly supported for this
 *
 * Supported renderer args:
 * - descriptionAsAlert: displays the description if exists as alert rather than the standard
 */
declare const PropertyEntrySelectRenderer: React.ComponentType<Pick<IPropertyEntrySelectRendererWithStylesProps, "label" | "values" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "nullValue" | "isNullable" | "isNumeric" | "currentI18nValue"> & import("@material-ui/styles").StyledComponentProps<"entry" | "label" | "description" | "icon" | "container" | "errorMessage" | "fieldInput" | "selectFieldIconWhenAddornmentIsActive"> & IPropertyEntrySelectRendererProps>;
export default PropertyEntrySelectRenderer;
