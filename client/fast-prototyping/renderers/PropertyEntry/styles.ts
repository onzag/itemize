export interface IPropertyEntryThemeType {
  invalidColor: string;
  iconColor: string;
  containerWidth: string | number;
  errorMessageFontSize: string | number;
  errorMessageContainerSize: string | number;
  fieldBorderInvalidColorFocused: string;
  fieldBorderInvalidColor: string;
  fieldBorderColor: string;
  fieldBorderColorFocused: string;
  labelColor: string;
  labelFocusedColor: string;
  labelInvalidColor: string;
  labelInvalidFocusedColor: string;
  locationAlternativeTextHeaderHeight: string;
  locationAlternativeTextHeaderFontSize: string;
  autocompleteMenuItemFontSize: string;
  autocompleteMenuItemSubFontSize: string;
}

export const STANDARD_THEME: IPropertyEntryThemeType = {
  invalidColor: "#f44336",
  iconColor: "#424242",
  containerWidth: "100%",
  errorMessageFontSize: "0.85rem",
  errorMessageContainerSize: "1.3rem",
  fieldBorderInvalidColorFocused: "#f44336",
  fieldBorderInvalidColor: "#e57373",
  fieldBorderColor: "rgba(0,0,0,0.42)",
  fieldBorderColorFocused: "#3f51b5",
  labelColor: "rgb(66, 66, 66)",
  labelFocusedColor: "#3f51b5",
  labelInvalidColor: "#f44336",
  labelInvalidFocusedColor: "#f44336",
  locationAlternativeTextHeaderHeight: "1.5rem",
  locationAlternativeTextHeaderFontSize: "0.75rem",
  autocompleteMenuItemFontSize: "1rem",
  autocompleteMenuItemSubFontSize: "0.75rem",
};