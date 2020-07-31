/**
 * The entry for field based (text/number) types
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../../mui-core/index";
import { IPropertyEntryFieldRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryField";
/**
 * The styles for the field
 */
export declare const style: Record<"entry" | "label" | "description" | "container" | "errorMessage" | "standardAddornment" | "smallAddornment" | "iconButtonPassword" | "iconButton" | "iconButtonSmall" | "textButton" | "labelSingleLine" | "fieldInput" | "unitDialog" | "unitDialogSubheader", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryFieldRendererProps> | ((props: IPropertyEntryFieldRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryFieldRendererProps>)>;
/**
 * The props for the entry renderer
 */
interface IPropertyEntryFieldRendererWithStylesProps extends IPropertyEntryFieldRendererProps, WithStyles<typeof style> {
}
/**
 * The entry field renderer, as a class, because it's fairly complicated, this renderer handles basic
 * types that are displayed as a single line text, this includes some numeric types, and even some complex types
 * such as unit and currency, this is because unlike other types their primary use is just writting something
 */
declare const PropertyEntryFieldRenderer: React.ComponentType<Pick<IPropertyEntryFieldRendererWithStylesProps, "currency" | "unit" | "label" | "type" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "subtype" | "currentInternalStrOnlyValue" | "currentStrOnlyValue" | "htmlAutocomplete" | "isNumericType" | "onChangeByNumber" | "currencyFormat" | "currencyArrData" | "currencyI18n" | "unitPrimary" | "unitPrimaryImperial" | "unitOptions" | "unitImperialOptions" | "unitPrefersImperial" | "unitIsLockedToPrimaries" | "unitI18n" | "unitToNode" | "onChangeUnit" | "onChangeCurrency"> & import("@material-ui/styles").StyledComponentProps<"entry" | "label" | "description" | "container" | "errorMessage" | "standardAddornment" | "smallAddornment" | "iconButtonPassword" | "iconButton" | "iconButtonSmall" | "textButton" | "labelSingleLine" | "fieldInput" | "unitDialog" | "unitDialogSubheader"> & IPropertyEntryFieldRendererProps>;
export default PropertyEntryFieldRenderer;
