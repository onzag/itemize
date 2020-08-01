/**
 * Contains the entry for the location type
 *
 * @packageDocumentation
 */
import "../../../internal/theme/leaflet.scss";
import React from "react";
import { WithStyles } from "../../mui-core";
import { IPropertyEntryLocationRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryLocation";
export declare const ZOOMS: {
    LARGE: number;
    MEDIUM: number;
    SMALL: number;
};
/**
 * The styles for the location entry
 */
export declare const style: Record<"entry" | "label" | "description" | "icon" | "container" | "errorMessage" | "iconButton" | "textButton" | "labelSingleLine" | "fieldInput" | "autosuggestContainer" | "autosuggestContainerOpen" | "autosuggestInput" | "autosuggestInputOpen" | "autosuggestSuggestionsContainer" | "autosuggestSuggestionsContainerOpen" | "autosuggestSuggestionsList" | "autosuggestSuggestion" | "autosuggestFirstSuggestion" | "autosuggestSuggestionHighlighted" | "autosuggestSectionContainer" | "autosuggestFirstSectionContainer" | "autosuggestSectionTitle" | "autosuggestMenuItem" | "autosuggestMenuItemMainText" | "autosuggestMenuItemSubText" | "locationAlternativeTextHeader" | "locationPlaceholder" | "locationMapContainer" | "resultListLabel", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryLocationRendererProps> | ((props: IPropertyEntryLocationRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryLocationRendererProps>)>;
/**
 * The props with location entry renderer
 */
interface IPropertyEntryLocationRendererWithStylesProps extends IPropertyEntryLocationRendererProps, WithStyles<typeof style> {
}
/**
 * The property entry location renderer, which renders a map that allows to select a location
 *
 * Supported args:
 *
 * - descriptionAsAlert: displays the description if exists as alert rather than the standard
 */
declare const PropertyEntryLocationRenderer: React.ComponentType<Pick<IPropertyEntryLocationRendererWithStylesProps, "label" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "viewport" | "onViewportChange" | "onSearchQueryChange" | "onSearch" | "onChangeBySearchResult" | "onChangeBySuggestion" | "clearSuggestions" | "clearSearchResults" | "onManualPick" | "noResultsLabel" | "resultOutOfLabel" | "searchSuggestions" | "activeSearchResults" | "nextSearchResult" | "nextSearchResultCircular" | "prevSearchResult" | "prevSearchResultCircular" | "searchQuery"> & import("@material-ui/styles").StyledComponentProps<"entry" | "label" | "description" | "icon" | "container" | "errorMessage" | "iconButton" | "textButton" | "labelSingleLine" | "fieldInput" | "autosuggestContainer" | "autosuggestContainerOpen" | "autosuggestInput" | "autosuggestInputOpen" | "autosuggestSuggestionsContainer" | "autosuggestSuggestionsContainerOpen" | "autosuggestSuggestionsList" | "autosuggestSuggestion" | "autosuggestFirstSuggestion" | "autosuggestSuggestionHighlighted" | "autosuggestSectionContainer" | "autosuggestFirstSectionContainer" | "autosuggestSectionTitle" | "autosuggestMenuItem" | "autosuggestMenuItemMainText" | "autosuggestMenuItemSubText" | "locationAlternativeTextHeader" | "locationPlaceholder" | "locationMapContainer" | "resultListLabel"> & IPropertyEntryLocationRendererProps>;
export default PropertyEntryLocationRenderer;
