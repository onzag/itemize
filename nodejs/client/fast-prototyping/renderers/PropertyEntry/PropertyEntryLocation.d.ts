/// <reference types="react" />
import "../../../internal/theme/leaflet.scss";
import { IPropertyEntryThemeType } from "./styles";
import { IPropertyEntryLocationRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryLocation";
export declare const ZOOMS: {
    LARGE: number;
    MEDIUM: number;
    SMALL: number;
};
export declare const style: (theme: IPropertyEntryThemeType) => Record<"entry" | "label" | "description" | "icon" | "container" | "errorMessage" | "iconButton" | "textButton" | "labelSingleLine" | "fieldInput" | "autosuggestContainer" | "autosuggestContainerOpen" | "autosuggestInput" | "autosuggestInputOpen" | "autosuggestSuggestionsContainer" | "autosuggestSuggestionsContainerOpen" | "autosuggestSuggestionsList" | "autosuggestSuggestion" | "autosuggestFirstSuggestion" | "autosuggestSuggestionHighlighted" | "autosuggestSectionContainer" | "autosuggestFirstSectionContainer" | "autosuggestSectionTitle" | "autosuggestMenuItem" | "autosuggestMenuItemMainText" | "autosuggestMenuItemSubText" | "locationAlternativeTextHeader" | "locationPlaceholder" | "locationMapContainer" | "resultListLabel", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryLocationRendererProps> | ((props: IPropertyEntryLocationRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryLocationRendererProps>)>;
export default function PropertyEntryLocationRenderer(props: IPropertyEntryLocationRendererProps): JSX.Element;
