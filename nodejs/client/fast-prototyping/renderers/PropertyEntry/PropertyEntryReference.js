"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const index_1 = require("../../mui-core/index");
const react_autosuggest_1 = __importDefault(require("react-autosuggest"));
const match_1 = __importDefault(require("autosuggest-highlight/match"));
const parse_1 = __importDefault(require("autosuggest-highlight/parse"));
function shouldShowInvalid(props) {
    return !props.currentValid;
}
exports.style = index_1.createStyles({
    entry: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    container: {
        width: "100%",
    },
    description: {
        width: "100%",
    },
    errorMessage: {
        color: "#f44336",
        height: "1.3rem",
        fontSize: "0.85rem",
    },
    standardAddornment: (props) => ({
        color: shouldShowInvalid(props) ? "#f44336" : "#424242",
        marginRight: "-10px",
    }),
    smallAddornment: (props) => ({
        color: shouldShowInvalid(props) ? "#f44336" : "#424242",
    }),
    iconButtonPassword: {
        "backgroundColor": "#2196f3",
        "color": "#fff",
        "&:hover": {
            backgroundColor: "#1976d2",
        },
    },
    iconButton: {
        color: "#424242",
    },
    iconButtonSmall: {
        color: "#424242",
        width: "32px",
        height: "32px",
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
    label: (props) => ({
        "color": shouldShowInvalid(props) ? "#f44336" : "rgb(66, 66, 66)",
        "&.focused": {
            color: shouldShowInvalid(props) ? "#f44336" : "#3f51b5",
        },
    }),
    labelSingleLine: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    fieldInput: (props) => {
        if (shouldShowInvalid(props)) {
            return {
                "width": "100%",
                // this is the colur when the field is out of focus
                "&::before": {
                    borderBottomColor: "#e57373",
                },
                // the color that pops up when the field is in focus
                "&::after": {
                    borderBottomColor: "#f44336",
                },
                // during the hover event
                "&:hover::before": {
                    borderBottomColor: props.disabled ? "rgba(0,0,0,0.42)" : "#f44336",
                },
            };
        }
        return {
            "width": "100%",
            "&::before": {
                borderBottomColor: "rgba(0,0,0,0.42)",
            },
            "&::after": {
                borderBottomColor: "#3f51b5",
            },
            "&:hover::before": {
                borderBottomColor: "#3f51b5",
            },
        };
    },
    unitDialog: {
        minWidth: "400px",
    },
    unitDialogSubheader: {
        backgroundColor: "white",
        borderBottom: "solid 1px #eee",
    },
    autosuggestContainer: {
        position: "relative",
        display: "block",
        width: "100%",
    },
    autosuggestContainerOpen: {},
    autosuggestInput: {},
    autosuggestInputOpen: {},
    autosuggestSuggestionsContainer: {
        position: "absolute",
        display: "block",
        width: "100%",
        top: "calc(100% - 1.3rem)",
        zIndex: 1000,
    },
    autosuggestSuggestionsContainerOpen: {},
    autosuggestSuggestionsList: {},
    autosuggestSuggestion: {},
    autosuggestFirstSuggestion: {},
    autosuggestSuggestionHighlighted: {},
    autosuggestSectionContainer: {},
    autosuggestFirstSectionContainer: {},
    autosuggestSectionTitle: {},
    autosuggestMenuItem: {
        height: "auto",
        paddingTop: 4,
        paddingBottom: 8,
    },
    autosuggestMenuItemMainText: {
        fontSize: "1rem",
        lineHeight: "1rem",
    },
    autosuggestMenuItemSubText: {
        fontSize: "0.75rem",
        lineHeight: "0.75rem",
    },
});
class ActualPropertyEntryReferenceRenderer extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onChangeByHTMLEvent = this.onChangeByHTMLEvent.bind(this);
        this.onChange = this.onChange.bind(this);
        this.renderBasicTextField = this.renderBasicTextField.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.catchToggleMouseDownEvent = this.catchToggleMouseDownEvent.bind(this);
        this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
        this.renderAutosuggestSuggestion = this.renderAutosuggestSuggestion.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
    }
    componentDidMount() {
        if (this.props.autoFocus && this.inputRef) {
            this.inputRef.focus();
        }
    }
    catchToggleMouseDownEvent(e) {
        e.preventDefault();
    }
    onChangeByHTMLEvent(e) {
        this.onChange(e);
    }
    onChange(e, autosuggestOverride) {
        let value = null;
        // the autosuggest override has priority
        if (autosuggestOverride) {
            value = autosuggestOverride.newValue;
        }
        else {
            value = e.target.value.toString();
        }
        if (value !== this.props.currentStrValue) {
            this.props.onChangeSearch(value);
        }
    }
    onKeyDown(e) {
        if (this.props.args.onEnter && e.keyCode === 13) {
            this.props.args.onEnter();
        }
    }
    renderBasicTextField(textFieldProps) {
        const inputMode = "text";
        // these are the inputProps of the small input
        const inputProps = {
            inputMode,
        };
        // these are the TextField props that are applied
        let appliedTextFieldProps = {};
        // these are applied to the Input element
        let appliedInputProps = {
            inputRef: (node) => {
                this.inputRef = node;
            },
        };
        // if there are textFieldProps
        if (textFieldProps) {
            // we need to extract the ref setting
            const { inputRef = () => { return; }, ref, ...other } = textFieldProps;
            // set all the other properties as applied to the TextField
            appliedTextFieldProps = other;
            // and we need to setup the ref setting and rescue our function
            // so that we can have the ref too for the Input
            appliedInputProps = {
                inputRef: (node) => {
                    ref(node);
                    inputRef(node);
                    this.inputRef = node;
                },
            };
            // if we have a className, it will inevitably override our class name
            // but we need ours too, so let's merge it in the TextField
            if (appliedTextFieldProps.className) {
                appliedTextFieldProps.className += " " + this.props.classes.entry;
            }
            // if there are small inputProps, they will override our inputProps,
            // of the input mode and autocomplete html, so we need to merge them
            if (appliedTextFieldProps.inputProps) {
                appliedTextFieldProps.inputProps = {
                    ...inputProps,
                    ...appliedTextFieldProps.inputProps,
                };
            }
        }
        if (this.props.canRestore) {
            let icon;
            if (this.props.currentAppliedValue) {
                icon = react_1.default.createElement(index_1.RestoreIcon, null);
            }
            else {
                icon = react_1.default.createElement(index_1.ClearIcon, null);
            }
            appliedInputProps.endAdornment = (react_1.default.createElement(index_1.InputAdornment, { position: "end", className: this.props.classes.standardAddornment },
                react_1.default.createElement(index_1.IconButton, { tabIndex: -1, classes: { root: this.props.classes.iconButton }, onClick: this.props.onRestore, onMouseDown: this.catchToggleMouseDownEvent }, icon)));
        }
        else if (this.props.icon) {
            // set it at the end
            appliedInputProps.endAdornment = (react_1.default.createElement(index_1.InputAdornment, { position: "end", className: this.props.classes.standardAddornment },
                react_1.default.createElement(index_1.IconButton, { tabIndex: -1, classes: { root: this.props.classes.iconButton } }, this.props.icon)));
        }
        const descriptionAsAlert = this.props.args["descriptionAsAlert"];
        // return the complex overengineered component in all its glory
        return (react_1.default.createElement("div", { className: this.props.classes.container },
            this.props.description && descriptionAsAlert ?
                react_1.default.createElement(index_1.Alert, { severity: "info", className: this.props.classes.description }, this.props.description) :
                null,
            this.props.description && !descriptionAsAlert ?
                react_1.default.createElement(index_1.Typography, { variant: "caption", className: this.props.classes.description }, this.props.description) :
                null,
            react_1.default.createElement(index_1.TextField, Object.assign({ fullWidth: true, type: "text", className: this.props.classes.entry, label: this.props.label, placeholder: this.props.placeholder, value: this.props.currentStrValue || "", onChange: this.onChangeByHTMLEvent, onKeyDown: this.onKeyDown, InputProps: {
                    classes: {
                        root: this.props.classes.fieldInput,
                        focused: "focused",
                    },
                    disabled: this.props.disabled,
                    ...appliedInputProps,
                }, InputLabelProps: {
                    classes: {
                        root: this.props.classes.label,
                        focused: "focused",
                    },
                }, inputProps: inputProps, disabled: this.props.disabled, variant: "filled" }, appliedTextFieldProps)),
            react_1.default.createElement("div", { className: this.props.classes.errorMessage }, this.props.currentInvalidReason)));
    }
    renderAutosuggestContainer(options) {
        // returns the autosuggest container that contains the stuff
        // handled by react autossugest
        return (react_1.default.createElement(index_1.Paper, Object.assign({}, options.containerProps, { square: true }), options.children));
    }
    renderAutosuggestSuggestion(suggestion, params) {
        // returns a specific suggestion
        const matches = match_1.default(suggestion.text, params.query);
        const parts = parse_1.default(suggestion.text, matches);
        return (react_1.default.createElement(index_1.MenuItem, { className: this.props.classes.autosuggestMenuItem, selected: params.isHighlighted, component: "div", onClick: this.props.onSelect.bind(this, suggestion) },
            react_1.default.createElement("div", { className: this.props.classes.autosuggestMenuItemMainText }, parts.map((part, index) => part.highlight ? (react_1.default.createElement("span", { key: index, style: { fontWeight: 500 } }, part.text)) : (react_1.default.createElement("strong", { key: index, style: { fontWeight: 300 } }, part.text))))));
    }
    getSuggestionValue(suggestion) {
        // just return the suggestion value as it will want to
        // be set in the input, we localize it if deemed necessary
        return suggestion.text;
    }
    onSuggestionsFetchRequested(arg) {
        this.props.onChangeSearch(arg.value);
    }
    render() {
        return (react_1.default.createElement(react_autosuggest_1.default, { renderInputComponent: this.renderBasicTextField, renderSuggestionsContainer: this.renderAutosuggestContainer, renderSuggestion: this.renderAutosuggestSuggestion, getSuggestionValue: this.getSuggestionValue, onSuggestionsFetchRequested: this.onSuggestionsFetchRequested, onSuggestionsClearRequested: this.props.onCancel, suggestions: this.props.currentOptions, theme: {
                container: this.props.classes.autosuggestContainer,
                containerOpen: this.props.classes.autosuggestContainerOpen,
                input: this.props.classes.autosuggestInput,
                inputOpen: this.props.classes.autosuggestInputOpen,
                inputFocused: "focused",
                suggestionsContainer: this.props.classes.autosuggestSuggestionsContainer,
                suggestionsContainerOpen: this.props.classes.autosuggestSuggestionsContainerOpen,
                suggestionsList: this.props.classes.autosuggestSuggestionsList,
                suggestion: this.props.classes.autosuggestSuggestion,
                suggestionFirst: this.props.classes.autosuggestFirstSuggestion,
                suggestionHighlighted: this.props.classes.autosuggestSuggestionHighlighted,
                sectionContainer: this.props.classes.autosuggestSectionContainer,
                sectionContainerFirst: this.props.classes.autosuggestFirstSectionContainer,
                sectionTitle: this.props.classes.autosuggestSectionTitle,
            }, inputProps: {
                value: this.props.currentInternalValue || this.props.currentValue || "",
                onChange: this.onChange,
                disabled: this.props.disabled,
            } }));
    }
}
const PropertyEntryReferenceRenderer = index_1.withStyles(exports.style)(ActualPropertyEntryReferenceRenderer);
exports.default = PropertyEntryReferenceRenderer;
