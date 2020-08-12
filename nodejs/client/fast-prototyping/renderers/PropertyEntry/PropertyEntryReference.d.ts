/**
 * This file provides a fast prototyping renderer for the reference type, which is basically
 * an integer but acts differently
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../../mui-core/index";
import { IPropertyEntryReferenceRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryReference";
/**
 * The styles for the reference
 */
export declare const style: Record<"entry" | "label" | "description" | "container" | "errorMessage" | "standardAddornment" | "smallAddornment" | "iconButtonPassword" | "iconButton" | "iconButtonSmall" | "textButton" | "labelSingleLine" | "fieldInput" | "unitDialog" | "unitDialogSubheader" | "autosuggestContainer" | "autosuggestContainerOpen" | "autosuggestInput" | "autosuggestInputOpen" | "autosuggestSuggestionsContainer" | "autosuggestSuggestionsContainerOpen" | "autosuggestSuggestionsList" | "autosuggestSuggestion" | "autosuggestFirstSuggestion" | "autosuggestSuggestionHighlighted" | "autosuggestSectionContainer" | "autosuggestFirstSectionContainer" | "autosuggestSectionTitle" | "autosuggestMenuItem" | "autosuggestMenuItemMainText" | "autosuggestMenuItemSubText", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryReferenceRendererProps> | ((props: IPropertyEntryReferenceRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryReferenceRendererProps>)>;
/**
 * The props for the reference entry with styles
 */
interface IPropertyEntryReferenceRendererWithStylesProps extends IPropertyEntryReferenceRendererProps, WithStyles<typeof style> {
}
/**
 * The renderer for the reference type, which basically allows to select an integer
 * for a given reference that represents an item definition somewhere else, the reference
 * type is very powerful and can do tasks of autocomplete and linking
 *
 * Supported args:
 *
 * - descriptionAsAlert: displays the description if exists as alert rather than the standard
 * - onEnter: A function that triggers when the enter key is pressed
 */
declare const PropertyEntryReferenceRenderer: React.ComponentType<Pick<IPropertyEntryReferenceRendererWithStylesProps, "label" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "i18nUnspecified" | "currentFindError" | "currentOptions" | "currentSearchError" | "isNullable" | "currentTextualValue" | "currentValueIsFullfilled" | "onChangeSearch" | "loadAllPossibleValues" | "onSelect" | "onCancel" | "dismissSearchError" | "dismissFindError"> & import("@material-ui/styles").StyledComponentProps<"entry" | "label" | "description" | "container" | "errorMessage" | "standardAddornment" | "smallAddornment" | "iconButtonPassword" | "iconButton" | "iconButtonSmall" | "textButton" | "labelSingleLine" | "fieldInput" | "unitDialog" | "unitDialogSubheader" | "autosuggestContainer" | "autosuggestContainerOpen" | "autosuggestInput" | "autosuggestInputOpen" | "autosuggestSuggestionsContainer" | "autosuggestSuggestionsContainerOpen" | "autosuggestSuggestionsList" | "autosuggestSuggestion" | "autosuggestFirstSuggestion" | "autosuggestSuggestionHighlighted" | "autosuggestSectionContainer" | "autosuggestFirstSectionContainer" | "autosuggestSectionTitle" | "autosuggestMenuItem" | "autosuggestMenuItemMainText" | "autosuggestMenuItemSubText"> & IPropertyEntryReferenceRendererProps>;
export default PropertyEntryReferenceRenderer;
