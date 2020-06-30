import { IPropertyEntryBooleanRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryBoolean";
import React from "react";
import { WithStyles } from "../../mui-core";
export declare const style: Record<"entry" | "label" | "description" | "icon" | "container" | "labelSingleLine", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface IPropertyEntryBooleanRendererWithStylesProps extends IPropertyEntryBooleanRendererProps, WithStyles<typeof style> {
}
declare const PropertyEntryBooleanRenderer: React.ComponentType<Pick<IPropertyEntryBooleanRendererWithStylesProps, "label" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "isTernary" | "trueLabel" | "falseLabel" | "nullLabel" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled"> & import("@material-ui/styles").StyledComponentProps<"entry" | "label" | "description" | "icon" | "container" | "labelSingleLine">>;
export default PropertyEntryBooleanRenderer;
