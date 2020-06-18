"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const pickers_1 = require("@material-ui/pickers");
const core_1 = require("@material-ui/core");
const util_1 = require("../../../../util");
const styles_1 = require("@material-ui/styles");
const styles_2 = require("./styles");
const lab_1 = require("@material-ui/lab");
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
    iconButton: {
        color: theme.iconColor,
    },
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
});
const ActualPropertyEntryDateTimeRendererWithStyles = styles_1.withStyles(exports.style)((props) => {
    // we want this to be a double pass because we can't do SSR on this component
    // because we are dependant on the phone or pad property that can only be calculated on the client side
    // so we render null initially
    const [isReady, setReady] = react_1.useState(false);
    react_1.useEffect(() => {
        setReady(true);
        // TODO autofocus
    }, []);
    if (!isReady) {
        return null;
    }
    // setting up the component
    let component = null;
    if (props.type === "date") {
        // let's extract the locale format from moment for a long date
        const L = util_1.getLocalizedDateFormat();
        const basicProps = {
            autoOk: true,
            cancelLabel: props.i18nCancel,
            okLabel: props.i18nOk,
            label: props.label,
            placeholder: props.placeholder,
            inputVariant: "filled",
            format: L,
            className: props.classes.entry,
            fullWidth: true,
            value: props.momentValue,
            onChange: props.onChangeByMoment,
            error: false,
            helperText: null,
            disabled: props.disabled,
            InputProps: {
                classes: {
                    root: props.classes.fieldInput,
                    focused: "focused",
                },
            },
            InputLabelProps: {
                classes: {
                    root: props.classes.label,
                    focused: "focused",
                },
            },
        };
        if (!window.PHONE_OR_PAD) {
            component = (react_1.default.createElement(pickers_1.KeyboardDatePicker, Object.assign({ KeyboardButtonProps: {
                    classes: {
                        root: props.classes.iconButton,
                    },
                } }, basicProps)));
        }
        else {
            component = (react_1.default.createElement(pickers_1.DatePicker, Object.assign({}, basicProps)));
        }
    }
    else if (props.type === "datetime") {
        // let's use the long format with the time format
        const LLT = util_1.getLocalizedDateTimeFormat();
        const basicProps = {
            autoOk: true,
            ampm: LLT.includes("A"),
            cancelLabel: props.i18nCancel,
            okLabel: props.i18nOk,
            label: props.label,
            placeholder: props.placeholder,
            inputVariant: "filled",
            format: LLT,
            className: props.classes.entry,
            fullWidth: true,
            value: props.momentValue,
            onChange: props.onChangeByMoment,
            error: false,
            helperText: null,
            disabled: props.disabled,
            InputProps: {
                classes: {
                    root: props.classes.fieldInput,
                    focused: "focused",
                },
            },
            InputLabelProps: {
                classes: {
                    root: props.classes.label,
                    focused: "focused",
                },
            },
        };
        if (!window.PHONE_OR_PAD) {
            component = (react_1.default.createElement(pickers_1.KeyboardDateTimePicker, Object.assign({ KeyboardButtonProps: {
                    classes: {
                        root: props.classes.iconButton,
                    },
                } }, basicProps)));
        }
        else {
            component = (react_1.default.createElement(pickers_1.DateTimePicker, Object.assign({}, basicProps)));
        }
    }
    else if (props.type === "time") {
        // and the time only
        const LT = util_1.getLocalizedTimeFormat();
        const basicProps = {
            autoOk: true,
            ampm: LT.includes("A"),
            cancelLabel: props.i18nCancel,
            okLabel: props.i18nOk,
            label: props.label,
            placeholder: props.placeholder,
            inputVariant: "filled",
            format: LT,
            className: props.classes.entry,
            fullWidth: true,
            value: props.momentValue,
            onChange: props.onChangeByMoment,
            error: false,
            helperText: null,
            disabled: props.disabled,
            InputProps: {
                classes: {
                    root: props.classes.fieldInput,
                    focused: "focused",
                },
            },
            InputLabelProps: {
                classes: {
                    root: props.classes.label,
                    focused: "focused",
                },
            },
        };
        if (!window.PHONE_OR_PAD) {
            component = (react_1.default.createElement(pickers_1.KeyboardTimePicker, Object.assign({ KeyboardButtonProps: {
                    classes: {
                        root: props.classes.iconButton,
                    },
                } }, basicProps)));
        }
        else {
            component = (react_1.default.createElement(pickers_1.TimePicker, Object.assign({}, basicProps)));
        }
    }
    const descriptionAsAlert = props.args["descriptionAsAlert"];
    // return it
    return (react_1.default.createElement("div", { className: props.classes.container },
        props.description && descriptionAsAlert ?
            react_1.default.createElement(lab_1.Alert, { severity: "info", className: props.classes.description }, props.description) :
            null,
        props.description && !descriptionAsAlert ?
            react_1.default.createElement(core_1.Typography, { variant: "caption", className: props.classes.description }, props.description) :
            null,
        component,
        react_1.default.createElement("div", { className: props.classes.errorMessage }, props.currentInvalidReason)));
});
function PropertyEntryDateTimeRenderer(props) {
    let appliedTheme = styles_2.STANDARD_THEME;
    if (props.args["theme"]) {
        appliedTheme = {
            ...styles_2.STANDARD_THEME,
            ...props.args["theme"],
        };
    }
    return (react_1.default.createElement(core_1.ThemeProvider, { theme: appliedTheme },
        react_1.default.createElement(ActualPropertyEntryDateTimeRendererWithStyles, Object.assign({}, props))));
}
exports.default = PropertyEntryDateTimeRenderer;
