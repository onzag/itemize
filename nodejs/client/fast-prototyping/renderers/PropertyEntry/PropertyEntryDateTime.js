"use strict";
/**
 * The property entry date time for fast prototyping
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.style = void 0;
const react_1 = __importStar(require("react"));
const pickers_1 = require("@material-ui/pickers");
const mui_core_1 = require("../../mui-core");
const util_1 = require("../../../../util");
/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props) {
    return !props.currentValid;
}
/**
 * The styles for the date time entry
 */
exports.style = mui_core_1.createStyles({
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
    iconButton: {
        color: "#424242",
    },
    label: (props) => ({
        "color": shouldShowInvalid(props) ? "#f44336" : "rgb(66, 66, 66)",
        "&.focused": {
            color: shouldShowInvalid(props) ? "#f44336" : "#3f51b5",
        },
    }),
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
});
/**
 * The date time renderer, it uses material ui in order to create very nice pickers for the user
 * these pickers are smart and will make a difference on whether it's a mobile or a computer,
 * it supports the following renderer args
 *
 * - descriptionAsAlert: shows the description as an alert rather than the default
 *
 * @param props the entry props
 * @returns a react element
 */
const PropertyEntryDateTimeRenderer = mui_core_1.withStyles(exports.style)((props) => {
    // we want this to be a double pass because we can't do SSR on this component
    // because we are dependant on the phone or pad property that can only be calculated on the client side
    // so we render null initially
    const [isReady, setReady] = react_1.useState(false);
    react_1.useEffect(() => {
        setReady(true);
        // TODO autofocus
    }, []);
    // setting up the component
    let component = null;
    if (isReady && props.type === "date") {
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
    else if (isReady && props.type === "datetime") {
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
    else if (isReady && props.type === "time") {
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
    else {
        // it's not ready let's make a textfield instead this
        // is some form of pretty placeholder
        component = (react_1.default.createElement(mui_core_1.TextField, { disabled: props.disabled, InputProps: {
                classes: {
                    root: props.classes.fieldInput,
                    focused: "focused",
                },
            }, InputLabelProps: {
                classes: {
                    root: props.classes.label,
                    focused: "focused",
                },
            }, fullWidth: true, label: props.label, placeholder: props.placeholder, variant: "filled", className: props.classes.entry }));
    }
    const descriptionAsAlert = props.args["descriptionAsAlert"];
    // return it
    return (react_1.default.createElement("div", { className: props.classes.container },
        props.description && descriptionAsAlert ?
            react_1.default.createElement(mui_core_1.Alert, { severity: "info", className: props.classes.description }, props.description) :
            null,
        props.description && !descriptionAsAlert ?
            react_1.default.createElement(mui_core_1.Typography, { variant: "caption", className: props.classes.description }, props.description) :
            null,
        component,
        react_1.default.createElement("div", { className: props.classes.errorMessage }, props.currentInvalidReason)));
});
exports.default = PropertyEntryDateTimeRenderer;
