"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/styles");
const styles_2 = require("./styles");
const uuid_1 = __importDefault(require("uuid"));
const lab_1 = require("@material-ui/lab");
const Restore_1 = __importDefault(require("@material-ui/icons/Restore"));
function shouldShowInvalid(props) {
    return !props.currentValid;
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
    }),
    label: (props) => ({
        "color": shouldShowInvalid(props) ? theme.labelInvalidColor : theme.labelColor,
        "&.focused": {
            color: shouldShowInvalid(props) ? theme.labelInvalidFocusedColor : theme.labelFocusedColor,
        },
    }),
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
    selectFieldIconWhenAddornmentIsActive: {
        right: "46px",
    },
});
class ActualPropertyEntrySelectRenderer extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.uuid = uuid_1.default.v4();
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        const textualValue = e.target.value;
        this.props.onChange(textualValue || null, null);
    }
    render() {
        // let's avoid restoration to null values in these
        // build the icon
        let icon = null;
        if (this.props.canRestore) {
            if (this.props.currentAppliedValue) {
                icon = react_1.default.createElement(Restore_1.default, null);
            }
        }
        else if (this.props.icon) {
            icon = this.props.icon;
        }
        const addornment = icon ? (react_1.default.createElement(core_1.InputAdornment, { position: "end" },
            react_1.default.createElement(core_1.IconButton, { tabIndex: -1, className: this.props.classes.icon, onClick: this.props.canRestore && this.props.currentAppliedValue ? this.props.onRestore : null }, icon))) : null;
        const descriptionAsAlert = this.props.args["descriptionAsAlert"];
        return (react_1.default.createElement("div", { className: this.props.classes.container },
            this.props.description && descriptionAsAlert ?
                react_1.default.createElement(lab_1.Alert, { severity: "info", className: this.props.classes.description }, this.props.description) :
                null,
            this.props.description && !descriptionAsAlert ?
                react_1.default.createElement(core_1.Typography, { variant: "caption", className: this.props.classes.description }, this.props.description) :
                null,
            react_1.default.createElement(core_1.FormControl, { variant: "filled", className: this.props.classes.entry },
                react_1.default.createElement(core_1.InputLabel, { htmlFor: this.uuid, classes: {
                        root: this.props.classes.label,
                        focused: "focused",
                    }, shrink: this.props.isNullable ? true : undefined }, this.props.label),
                react_1.default.createElement(core_1.Select, { value: this.props.currentValue || "", onChange: this.onChange, displayEmpty: true, disabled: this.props.disabled, variant: "filled", classes: {
                        icon: addornment ? this.props.classes.selectFieldIconWhenAddornmentIsActive : null,
                    }, input: react_1.default.createElement(core_1.FilledInput, { id: this.uuid, placeholder: this.props.placeholder, endAdornment: addornment, classes: {
                            root: this.props.classes.fieldInput,
                            focused: "focused",
                        } }) },
                    react_1.default.createElement(core_1.MenuItem, { selected: false, role: "none", disabled: true },
                        react_1.default.createElement("em", null, this.props.placeholder)),
                    react_1.default.createElement(core_1.Divider, null),
                    this.props.isNullable ? react_1.default.createElement(core_1.MenuItem, { value: "" },
                        react_1.default.createElement("em", null, this.props.nullValue.i18nValue)) : null,
                    // render the valid values that we display and choose
                    this.props.values.map((vv) => {
                        // the i18n value from the i18n data
                        return react_1.default.createElement(core_1.MenuItem, { key: vv.value, value: vv.value }, vv.i18nValue);
                    }))),
            react_1.default.createElement("div", { className: this.props.classes.errorMessage }, this.props.currentInvalidReason)));
    }
}
const ActualPropertyEntrySelectRendererWithStyles = styles_1.withStyles(exports.style)(ActualPropertyEntrySelectRenderer);
function PropertyEntrySelectRenderer(props) {
    let appliedTheme = styles_2.STANDARD_THEME;
    if (props.args["theme"]) {
        appliedTheme = {
            ...styles_2.STANDARD_THEME,
            ...props.args["theme"],
        };
    }
    return (react_1.default.createElement(core_1.ThemeProvider, { theme: appliedTheme },
        react_1.default.createElement(ActualPropertyEntrySelectRendererWithStyles, Object.assign({}, props))));
}
exports.default = PropertyEntrySelectRenderer;
