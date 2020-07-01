import React from "react";
import { WithStyles } from "../../mui-core";
import { IPropertyEntrySelectRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntrySelect";
export declare const style: Record<"entry" | "label" | "description" | "icon" | "container" | "errorMessage" | "fieldInput" | "selectFieldIconWhenAddornmentIsActive", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntrySelectRendererProps> | ((props: IPropertyEntrySelectRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntrySelectRendererProps>)>;
interface IPropertyEntrySelectRendererWithStylesProps extends IPropertyEntrySelectRendererProps, WithStyles<typeof style> {
}
declare const PropertyEntrySelectRenderer: React.ComponentType<Pick<IPropertyEntrySelectRendererWithStylesProps, "label" | "values" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "nullValue" | "isNullable" | "currentI18nValue"> & import("@material-ui/styles").StyledComponentProps<"entry" | "label" | "description" | "icon" | "container" | "errorMessage" | "fieldInput" | "selectFieldIconWhenAddornmentIsActive"> & IPropertyEntrySelectRendererProps>;
export default PropertyEntrySelectRenderer;
