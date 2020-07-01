import React from "react";
import { WithStyles } from "../../mui-core";
import { IPropertyEntryDateTimeRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryDateTime";
export declare const style: Record<"entry" | "label" | "description" | "container" | "errorMessage" | "iconButton" | "fieldInput", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryDateTimeRendererProps> | ((props: IPropertyEntryDateTimeRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryDateTimeRendererProps>)>;
interface IPropertyEntryDateTimeRendererWithStylesProps extends IPropertyEntryDateTimeRendererProps, WithStyles<typeof style> {
}
declare const PropertyEntryDateTimeRenderer: React.ComponentType<Pick<IPropertyEntryDateTimeRendererWithStylesProps, "label" | "type" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "momentValue" | "i18nOk" | "i18nCancel" | "onChangeByMoment"> & import("@material-ui/styles").StyledComponentProps<"entry" | "label" | "description" | "container" | "errorMessage" | "iconButton" | "fieldInput"> & IPropertyEntryDateTimeRendererProps>;
export default PropertyEntryDateTimeRenderer;
