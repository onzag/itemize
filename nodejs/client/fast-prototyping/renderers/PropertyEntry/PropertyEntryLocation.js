"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../internal/theme/leaflet.scss");
const react_1 = __importDefault(require("react"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/styles");
const react_autosuggest_1 = __importDefault(require("react-autosuggest"));
const match_1 = __importDefault(require("autosuggest-highlight/match"));
const parse_1 = __importDefault(require("autosuggest-highlight/parse"));
let CMap;
let CTileLayer;
let CMarker;
let L;
if (typeof document !== "undefined") {
    const LL = require("react-leaflet");
    CMap = LL.Map;
    CTileLayer = LL.TileLayer;
    CMarker = LL.Marker;
    L = require("leaflet");
    // https://github.com/PaulLeCam/react-leaflet/issues/453
    // bug in leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
}
const styles_2 = require("./styles");
const Search_1 = __importDefault(require("@material-ui/icons/Search"));
const SwapHoriz_1 = __importDefault(require("@material-ui/icons/SwapHoriz"));
const lab_1 = require("@material-ui/lab");
const util_1 = require("../../../../util");
const Restore_1 = __importDefault(require("@material-ui/icons/Restore"));
const Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
const ZOOMS = {
    "LARGE": 16,
    "MEDIUM": 14,
    "SMALL": 4,
};
function shouldShowInvalid(props) {
    return !props.currentValid || (props.activeSearchResults && props.activeSearchResults.length === 0);
}
exports.style = (theme) => styles_1.createStyles({
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
    icon: (props) => ({
        color: shouldShowInvalid(props) ? theme.invalidColor : theme.iconColor,
        marginRight: "0.5rem",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
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
    label: (props) => ({
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
    fieldInput: (props) => {
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
        top: `calc(100% - ${theme.errorMessageContainerSize})`,
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
        fontSize: theme.autosuggestMenuItemFontSize,
        lineHeight: theme.autosuggestMenuItemFontSize,
    },
    autosuggestMenuItemSubText: {
        fontSize: theme.autosuggestMenuItemSubFontSize,
        lineHeight: theme.autosuggestMenuItemSubFontSize,
    },
    locationAlternativeTextHeader: {
        height: theme.locationAlternativeTextHeaderHeight,
        fontSize: theme.locationAlternativeTextHeaderFontSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "solid 1px #ccc",
    },
    locationPlaceholder: {
        opacity: 0.5,
        fontWeight: 300,
    },
    locationMapContainer: {},
    resultListLabel: {
        fontWeight: 300,
        borderLeft: "solid 1px #ccc",
        paddingLeft: "0.5rem",
        marginLeft: "0.5rem",
    },
});
class ActualPropertyEntryLocationRendererWithStylesClass extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.preventNextSearchQueryChange = false;
        this.state = {
            readyToMap: false,
        };
        this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
        this.renderAutosuggestSuggestion = this.renderAutosuggestSuggestion.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.setLocationManually = this.setLocationManually.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onChangeBySuggestion = this.onChangeBySuggestion.bind(this);
    }
    componentDidMount() {
        this.setState({
            readyToMap: true,
        });
        if (this.props.autoFocus && this.inputRef) {
            this.inputRef.focus();
        }
    }
    // public setLocationManually(e: LeafletMouseEvent) {
    setLocationManually(e) {
        this.props.onManualPick({
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            txt: this.props.searchQuery,
            atxt: null,
            id: null,
        }, true);
    }
    onKeyPress(e) {
        // basically we want to trigger swap or search on enter
        if (e.key === "Enter") {
            if (this.props.activeSearchResults) {
                if (this.props.nextSearchResultCircular) {
                    this.props.onChangeBySearchResult(this.props.nextSearchResultCircular);
                }
            }
            else {
                this.props.onSearch();
            }
        }
    }
    onChangeBySuggestion(suggestion) {
        // react autosuggest triggers a search query change when the value is set by selection
        // however we don't want this to happen, both of them get triggered at the same time
        // so this causes a bug
        if (suggestion.txt !== this.props.searchQuery) {
            this.preventNextSearchQueryChange = true;
        }
        this.props.onChangeBySuggestion(suggestion, false);
    }
    onSearchQueryChange(e) {
        if (this.preventNextSearchQueryChange) {
            this.preventNextSearchQueryChange = false;
            return;
        }
        this.props.onSearchQueryChange(e.target.value, true);
    }
    onSuggestionsFetchRequested(arg) {
        this.props.onSearchQueryChange(arg.value);
    }
    renderBody(textFieldProps) {
        const viewport = {
            center: this.props.viewport.center,
            zoom: ZOOMS[this.props.viewport.zoom] || this.props.viewport.zoom,
        };
        let appliedTextFieldProps = {
            className: this.props.classes.entry,
        };
        let iconSearch;
        let fn = null;
        if (this.props.activeSearchResults) {
            if (this.props.nextSearchResultCircular) {
                fn = this.props.onChangeBySearchResult.bind(null, this.props.nextSearchResultCircular, false);
                iconSearch = react_1.default.createElement(SwapHoriz_1.default, null);
            }
            else {
                iconSearch = react_1.default.createElement(Search_1.default, null);
            }
        }
        else {
            fn = this.props.onSearch.bind(null, false);
            iconSearch = react_1.default.createElement(Search_1.default, null);
        }
        let appliedInputProps = {
            endAdornment: (react_1.default.createElement(core_1.InputAdornment, { position: "end" },
                react_1.default.createElement(core_1.IconButton, { tabIndex: -1, disabled: this.props.disabled, classes: { root: this.props.classes.iconButton }, onClick: fn }, iconSearch))),
        };
        if (textFieldProps) {
            const { inputRef = () => { return; }, ref, ...other } = textFieldProps;
            appliedTextFieldProps = other;
            appliedInputProps = {
                ...appliedInputProps,
                inputRef: (node) => {
                    ref(node);
                    inputRef(node);
                },
            };
        }
        let icon;
        if (this.props.canRestore) {
            if (this.props.currentAppliedValue) {
                icon = react_1.default.createElement(Restore_1.default, null);
            }
            else {
                icon = react_1.default.createElement(Clear_1.default, null);
            }
        }
        else if (this.props.icon) {
            icon = this.props.icon;
        }
        const map = this.state.readyToMap ? (react_1.default.createElement(CMap, { viewport: viewport, onViewportChange: this.props.onViewportChange, onClick: this.setLocationManually },
            react_1.default.createElement(CTileLayer, { attribution: '\u00A9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png" }),
            this.props.currentValue ? react_1.default.createElement(CMarker, { position: [
                    this.props.currentValue.lat, this.props.currentValue.lng,
                ] }) : null,
            !this.props.disabled && this.props.activeSearchResults ? this.props.activeSearchResults
                .filter((result) => this.props.currentValue.id !== result.id)
                .map((result) => (react_1.default.createElement(CMarker, { opacity: 0.5, key: result.id, position: [result.lat, result.lng], onClick: this.props.onChangeBySearchResult.bind(this, result, true) }))) : null)) : null;
        const descriptionAsAlert = this.props.args["descriptionAsAlert"];
        return (react_1.default.createElement("div", { className: this.props.classes.container },
            this.props.description && descriptionAsAlert ?
                react_1.default.createElement(lab_1.Alert, { severity: "info", className: this.props.classes.description }, this.props.description) :
                null,
            this.props.description && !descriptionAsAlert ?
                react_1.default.createElement(core_1.Typography, { variant: "caption", className: this.props.classes.description }, this.props.description) :
                null,
            react_1.default.createElement("div", { className: this.props.classes.locationAlternativeTextHeader },
                icon ? react_1.default.createElement(core_1.IconButton, { tabIndex: -1, className: this.props.classes.icon, onClick: this.props.canRestore ? this.props.onRestore : null }, icon) : null,
                this.props.currentValue && this.props.currentValue.atxt ||
                    (react_1.default.createElement("span", { className: this.props.classes.locationPlaceholder }, util_1.capitalize(this.props.placeholder))),
                this.props.resultOutOfLabel ?
                    react_1.default.createElement("i", { className: this.props.classes.resultListLabel }, this.props.resultOutOfLabel) :
                    null),
            react_1.default.createElement("div", { className: this.props.classes.locationMapContainer }, map),
            react_1.default.createElement(TextField_1.default, Object.assign({ fullWidth: true, type: "search", onKeyPress: this.onKeyPress, className: this.props.classes.entry, label: this.props.label, onChange: this.onSearchQueryChange, placeholder: this.props.placeholder, value: this.props.searchQuery, InputProps: {
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
                }, disabled: this.props.disabled, variant: "filled" }, appliedTextFieldProps)),
            react_1.default.createElement("div", { className: this.props.classes.errorMessage },
                this.props.currentInvalidReason,
                !this.props.currentInvalidReason && this.props.activeSearchResults && this.props.activeSearchResults.length === 0 ?
                    this.props.noResultsLabel :
                    null)));
    }
    getSuggestionValue(suggestion) {
        // just return the title
        return suggestion.txt;
    }
    renderAutosuggestContainer(options) {
        // same renders the autosuggest container
        return (react_1.default.createElement(core_1.Paper, Object.assign({}, options.containerProps, { square: true }), options.children));
    }
    renderAutosuggestSuggestion(suggestion, params) {
        const matches = match_1.default(suggestion.txt, params.query);
        const parts = parse_1.default(suggestion.txt, matches);
        return (react_1.default.createElement(core_1.MenuItem, { className: this.props.classes.autosuggestMenuItem, selected: params.isHighlighted, component: "div", onClick: this.onChangeBySuggestion.bind(this, suggestion) },
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: this.props.classes.autosuggestMenuItemMainText }, parts.map((part, index) => part.highlight ? (react_1.default.createElement("span", { key: index, style: { fontWeight: 500 } }, part.text)) : (react_1.default.createElement("strong", { key: index, style: { fontWeight: 300 } }, part.text)))),
                react_1.default.createElement("div", { className: this.props.classes.autosuggestMenuItemSubText }, suggestion.atxt))));
    }
    render() {
        return (react_1.default.createElement(react_autosuggest_1.default, { renderInputComponent: this.renderBody, renderSuggestionsContainer: this.renderAutosuggestContainer, renderSuggestion: this.renderAutosuggestSuggestion, getSuggestionValue: this.getSuggestionValue, onSuggestionsFetchRequested: this.onSuggestionsFetchRequested, onSuggestionsClearRequested: this.props.clearSuggestions, suggestions: this.props.searchSuggestions, theme: {
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
                value: this.props.searchQuery,
                onChange: this.onSearchQueryChange,
            } }));
    }
}
const ActualPropertyEntryLocationRendererWithStyles = styles_1.withStyles(exports.style)(ActualPropertyEntryLocationRendererWithStylesClass);
function PropertyEntryLocationRenderer(props) {
    let appliedTheme = styles_2.STANDARD_THEME;
    if (props.args["theme"]) {
        appliedTheme = {
            ...styles_2.STANDARD_THEME,
            ...props.args["theme"],
        };
    }
    return (react_1.default.createElement(core_1.ThemeProvider, { theme: appliedTheme },
        react_1.default.createElement(ActualPropertyEntryLocationRendererWithStyles, Object.assign({}, props))));
}
exports.default = PropertyEntryLocationRenderer;
