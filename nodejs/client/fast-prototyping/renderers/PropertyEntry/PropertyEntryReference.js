"use strict";
/**
 * This file provides a fast prototyping renderer for the reference type, which is basically
 * an integer but acts differently
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.style = void 0;
const react_1 = __importDefault(require("react"));
const index_1 = require("../../mui-core/index");
const react_autosuggest_1 = __importDefault(require("react-autosuggest"));
const match_1 = __importDefault(require("autosuggest-highlight/match"));
const parse_1 = __importDefault(require("autosuggest-highlight/parse"));
const PropertyEntrySelect_1 = __importDefault(require("./PropertyEntrySelect"));
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props) {
    return !props.currentValid;
}
/**
 * The styles for the reference
 */
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
/**
 * The actual class for the reference renderer
 */
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
        if (this.props.args.selectField) {
            this.props.loadAllPossibleValues(this.props.args.selectField, this.props.args.preventIds, this.props.args.preventEqualityWithProperties);
        }
    }
    componentDidUpdate(prevProps) {
        if (!deep_equal_1.default(prevProps.args.preventIds, this.props.args.preventIds) ||
            !deep_equal_1.default(this.props.args.preventEqualityWithProperties, this.props.args.preventEqualityWithProperties)) {
            this.props.refilterPossibleValues(this.props.args.preventIds, this.props.args.preventEqualityWithProperties);
        }
    }
    /**
     * caches the mouse down event to prevent it from doing
     * anything
     * @param e the mouse event
     */
    catchToggleMouseDownEvent(e) {
        e.preventDefault();
    }
    /**
     * The change event but by the raw text field
     * @param e the change event
     */
    onChangeByHTMLEvent(e) {
        this.onChange(e);
    }
    /**
     * the change event that triggers in the autosuggest mode
     * or by default, if not autosuggest override given
     * @param e the event
     * @param autosuggestOverride autosuggest override
     */
    onChange(e, autosuggestOverride) {
        let value = null;
        // the autosuggest override has priority
        if (autosuggestOverride) {
            value = autosuggestOverride.newValue;
        }
        else {
            value = e.target.value.toString();
        }
        // similarly to location
        if (value !== this.props.currentTextualValue &&
            autosuggestOverride.method === "type") {
            // we call the change of search
            this.props.onChangeSearch(value, this.props.args.preventIds, this.props.args.preventEqualityWithProperties);
        }
    }
    /**
     * The event on key down for the text field
     * @param e the event itself
     */
    onKeyDown(e) {
        if (this.props.args.onEnter && e.keyCode === 13) {
            this.props.args.onEnter();
        }
    }
    /**
     * Render the basic text field for the reference
     * @param textFieldProps the text field props
     */
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
            react_1.default.createElement(index_1.TextField, Object.assign({ fullWidth: true, type: "text", className: this.props.classes.entry, label: this.props.label, placeholder: this.props.placeholder, value: this.props.currentTextualValue, onChange: this.onChangeByHTMLEvent, onKeyDown: this.onKeyDown, InputProps: {
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
    /**
     * renders the autosuggest container for the reference
     * @param options the autosuggest options
     */
    renderAutosuggestContainer(options) {
        // returns the autosuggest container that contains the stuff
        // handled by react autossugest
        return (react_1.default.createElement(index_1.Paper, Object.assign({}, options.containerProps, { square: true }), options.children));
    }
    /**
     * Render the autosuggest suggestion for the reference
     * @param suggestion the suggestion itself
     * @param params the params to use
     */
    renderAutosuggestSuggestion(suggestion, params) {
        // returns a specific suggestion
        const matches = match_1.default(suggestion.text, params.query);
        const parts = parse_1.default(suggestion.text, matches);
        return (react_1.default.createElement(index_1.MenuItem, { className: this.props.classes.autosuggestMenuItem, selected: params.isHighlighted, component: "div", onClick: this.props.onSelect.bind(this, suggestion) },
            react_1.default.createElement("div", { className: this.props.classes.autosuggestMenuItemMainText }, parts.map((part, index) => part.highlight ? (react_1.default.createElement("span", { key: index, style: { fontWeight: 500 } }, part.text)) : (react_1.default.createElement("strong", { key: index, style: { fontWeight: 300 } }, part.text))))));
    }
    /**
     * Provides the suggestion value
     * @param suggestion the suggestion itself
     */
    getSuggestionValue(suggestion) {
        // just return the suggestion value as it will want to
        // be set in the input, we localize it if deemed necessary
        return suggestion.text;
    }
    /**
     * When the suggestion fetch is triggered
     * @param arg the arg
     */
    onSuggestionsFetchRequested(arg) {
        if (arg.reason !== "input-focused") {
            this.props.onChangeSearch(arg.value, this.props.args.preventIds, this.props.args.preventEqualityWithProperties);
        }
    }
    render() {
        if (this.props.args.selectField) {
            return this.renderAsSelectField();
        }
        return this.renderAsAutosuggest();
    }
    renderAsSelectField() {
        const values = this.props.currentOptions.map((o) => ({
            i18nValue: o.text,
            value: o.id,
        }));
        // because the option might be missing if we haven't loaded
        // the current options, at least we add the current
        if (this.props.currentValue !== null && !values.find(v => v.value === this.props.currentValue)) {
            values.push({
                i18nValue: this.props.currentTextualValue,
                value: this.props.currentValue,
            });
        }
        const nullValue = {
            i18nValue: this.props.i18nUnspecified,
            value: null,
        };
        return (react_1.default.createElement(PropertyEntrySelect_1.default, { values: values, canRestore: this.props.canRestore, currentAppliedValue: this.props.currentAppliedValue, currentI18nValue: this.props.currentTextualValue, currentValid: this.props.currentValid, currentValue: this.props.currentValue, currentInternalValue: this.props.currentInternalValue, currentInvalidReason: this.props.currentInvalidReason, rtl: this.props.rtl, propertyId: this.props.propertyId, placeholder: this.props.placeholder, args: this.props.args, label: this.props.label, icon: this.props.icon, disabled: this.props.disabled, autoFocus: this.props.autoFocus, onChange: this.props.onChange, onRestore: this.props.onRestore, nullValue: nullValue, isNullable: this.props.isNullable, isNumeric: true }));
    }
    /**
     * render function
     */
    renderAsAutosuggest() {
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
                value: this.props.currentInternalValue || this.props.currentTextualValue || "",
                onChange: this.onChange,
                disabled: this.props.disabled,
            } }));
    }
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
const PropertyEntryReferenceRenderer = index_1.withStyles(exports.style)(ActualPropertyEntryReferenceRenderer);
exports.default = PropertyEntryReferenceRenderer;
