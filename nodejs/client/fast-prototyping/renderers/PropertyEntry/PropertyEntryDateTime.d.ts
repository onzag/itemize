/**
 * The property entry date time for fast prototyping
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../../mui-core";
import { IPropertyEntryDateTimeRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryDateTime";
/**
 * The styles for the date time entry
 */
export declare const style: Record<"entry" | "label" | "description" | "container" | "errorMessage" | "iconButton" | "fieldInput", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryDateTimeRendererProps> | ((props: IPropertyEntryDateTimeRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryDateTimeRendererProps>)>;
/**
 * The props for the ate time renderer
 */
interface IPropertyEntryDateTimeRendererWithStylesProps extends IPropertyEntryDateTimeRendererProps, WithStyles<typeof style> {
}
/**
 * The date time renderer, it uses material ui in order to create very nice pickers for the user
 * these pickers are smart and will make a difference on whether it's a mobile or a computer,
 * it supports the following renderer args
 *
 * - descriptionAsAlert: shows the description as an alert rather than the default
 *
 * @param props the entry props
 * @returns a react element
 */
declare const PropertyEntryDateTimeRenderer: React.ComponentType<Pick<IPropertyEntryDateTimeRendererWithStylesProps, "label" | "type" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "momentValue" | "i18nOk" | "i18nCancel" | "onChangeByMoment"> & import("@material-ui/styles").StyledComponentProps<"entry" | "label" | "description" | "container" | "errorMessage" | "iconButton" | "fieldInput"> & IPropertyEntryDateTimeRendererProps>;
export default PropertyEntryDateTimeRenderer;
