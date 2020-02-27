import { createStyles } from "@material-ui/styles";
import { IPropertyEntryRendererProps } from "../../../internal/components/PropertyEntry";

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

function shouldShowInvalid(props: IPropertyEntryRendererProps) {
  return !props.currentValid;
}
export const style = (theme: IPropertyEntryThemeType) => createStyles({
  entry: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: theme.containerWidth,
  },
  description: {
    width: "100%",
  },
  errorMessage: {
    color: theme.invalidColor,
    height: theme.errorMessageContainerSize,
    fontSize: theme.errorMessageFontSize,
  },
  icon: (props: IPropertyEntryRendererProps) => ({
    color: shouldShowInvalid(props) ? theme.invalidColor : theme.iconColor,
  }),
  iconButton: {
    "backgroundColor": "#2196f3",
    "color": "#fff",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
  textButton: {
    border: "solid 1px rgba(0,0,0,0.1)",
    display: "flex",
    minWidth: "50px",
    height: "50px",
    padding: "0 10px",
    margin: "0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  },
  label: (props: IPropertyEntryRendererProps) => ({
    "color": shouldShowInvalid(props) ? theme.labelInvalidColor : theme.labelColor,
    "&.focused": {
      color: shouldShowInvalid(props) ? theme.labelInvalidFocusedColor : theme.labelFocusedColor,
    },
  }),
  labelSingleLine: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldInput: (props: IPropertyEntryRendererProps) => {
    if (shouldShowInvalid(props)) {
      return {
        "width": "100%",
        // this is the colur when the field is out of focus
        "&::before": {
          borderBottomColor: theme.fieldBorderInvalidColor,
        },
        // the color that pops up when the field is in focus
        "&::after": {
          borderBottomColor: theme.fieldBorderInvalidColorFocused,
        },
        // during the hover event
        "&:hover::before": {
          borderBottomColor: props.disabled ? theme.fieldBorderColor : theme.fieldBorderInvalidColorFocused,
        },
      };
    }
    return {
      "width": "100%",
      "&::before": {
        borderBottomColor: theme.fieldBorderColor,
      },
      "&::after": {
        borderBottomColor: theme.fieldBorderColorFocused,
      },
      "&:hover::before": {
        borderBottomColor: theme.fieldBorderColorFocused,
      },
    };
  },
  selectFieldIconWhenAddornmentIsActive: {
    right: "46px",
  },
  unitDialog: {
    minWidth: "400px",
  },
  unitDialogSubheader: {
    backgroundColor: "white",
    borderBottom: "solid 1px #eee",
  },
  autocompleteContainer: {
    position: "relative",
    display: "block",
    width: "100%",
  },
  autocompleteContainerOpen: {

  },
  autocompleteInput: {

  },
  autocompleteInputOpen: {

  },
  autocompleteSuggestionsContainer: {
    position: "absolute" as "absolute",
    display: "block",
    width: "100%",
    top: `calc(100% - ${theme.errorMessageContainerSize})`,
    zIndex: 1000,
  },
  autocompleteSuggestionsContainerOpen: {

  },
  autocompleteSuggestionsList: {

  },
  autocompleteSuggestion: {

  },
  autocompleteFirstSuggestion: {

  },
  autocompleteSuggestionHighlighted: {

  },
  autocompleteSectionContainer: {

  },
  autocompleteFirstSectionContainer: {

  },
  autocompleteSectionTitle: {

  },
  autocompleteMenuItem: {
    height: "auto",
    paddingTop: 4,
    paddingBottom: 8,
  },
  autocompleteMenuItemMainText: {
    fontSize: theme.autocompleteMenuItemFontSize,
    lineHeight: theme.autocompleteMenuItemFontSize,
  },
  autocompleteMenuItemSubText: {
    fontSize: theme.autocompleteMenuItemSubFontSize,
    lineHeight: theme.autocompleteMenuItemSubFontSize,
  },
  locationAlternativeTextHeader: {
    height: theme.locationAlternativeTextHeaderHeight,
    fontSize: theme.locationAlternativeTextHeaderFontSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  locationMapContainer: {

  },
  quill: (props: IPropertyEntryRendererProps) => {
    const shouldShowInvalidQuill = shouldShowInvalid(props);
    return {
      "position": "relative",
      // this is the colur when the field is out of focus
      "&::before": {
        left: 0,
        right: 0,
        bottom: 0,
        content: "'\\00a0'",
        position: "absolute",
        transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderBottom: "1px solid " +
          (shouldShowInvalidQuill ? theme.fieldBorderInvalidColor : theme.fieldBorderColor),
        pointerEvents: "none",
      },
      // the color that pops up when the field is in focus
      "&::after": {
        left: 0,
        bottom: 0,
        right: 0,
        content: "''",
        position: "absolute",
        transform: "scaleX(0)",
        transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        borderBottom: "2px solid " +
          (shouldShowInvalidQuill ? theme.fieldBorderInvalidColorFocused : theme.fieldBorderColorFocused),
        pointerEvents: "none",
      },
      // during the hover event
      "&.focused::after": {
        transform: "none",
      },
    };
  },
  file: {
    "width": "125px",
    "padding": "25px 0",
    "alignSelf": "flex-start",
    "&:hover $imageThumbnail": {
      boxShadow: "0 0 5px 2px #42a5f5",
    },
    "&:hover $fileDeleteButton": {
      color: "#f44336",
    },
  },
  fileRejected: {
    "& $imageThumbnail": {
      boxShadow: "0 0 5px 2px #e57373",
    },
    "&:hover $imageThumbnail": {
      boxShadow: "0 0 5px 2px #f44336",
    },
    "& $fileName, & $fileSize, & $fileRejectedDescription, & $fileIcon": {
      color: "#e57373",
    },
    "&:hover $fileName, &:hover $fileSize, &:hover $fileRejectedDescription, &:hover $fileIcon": {
      color: "#f44336",
    },
  },
  fileDataContainer: {
    height: "75px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  fileDeleteButton: {
    top: "-25px",
    right: 0,
    position: "absolute",
  },
  fileName: {
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.75rem",
  },
  fileSize: {
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.75rem",
    opacity: "0.75",
  },
  fileRejectedDescription: {
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.75rem",
  },
  fileIcon: {
    fontSize: "75px",
    color: "#424242",
  },
  fileMimeType: {
    position: "absolute",
    color: "white",
    width: "100%",
    fontSize: "16px",
    textAlign: "center",
    padding: "0 40px",
    bottom: "15px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  filesPaper: {
    marginTop: "5px",
    backgroundColor: "rgba(0, 0, 0, 0.09)",
    width: "100%",
    minHeight: "200px",
    height: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    cursor: "pointer",
    position: "relative",
    padding: "20px",
    flexWrap: "wrap",
  },
  filesPaperSingleFile: {
    justifyContent: "center",
  },
  filesPlaceholder: {
    flexGrow: 2,
    display: "block",
    textAlign: "center",
    fontSize: "1rem",
    userSelect: "none",
    color: "rgb(117, 117, 117)",
    borderRadius: "25px",
    border: "dotted 2px #ccc",
    padding: "25px 0",
    margin: "0 25px",
  },
  filesPlaceholderAccepting: {
    borderColor: "#42a5f5",
  },
  filesPlaceholderRejecting: {
    borderColor: "#f44336",
  },
  filesIconAdd: {
    opacity: 0.1,
    fontSize: "100px",
  },
  filesSingleFileButtonContainer: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    display: "flex",
  },
  filesSingleFileButton: {
    flexGrow: 1,
  },
  filesSingleFileButtonIcon: {
    marginLeft: "0.75rem",
  },
  imageThumbnail: {
    height: "100%",
    borderRadius: "3px",
  },
});
