"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../../mui-core");
const localization_1 = require("../../../components/localization");
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
        paddingBottom: "1.3rem",
    },
    description: {
        width: "100%",
    },
    icon: {
        color: "#424242",
    },
    label: {
        "color": "rgb(66, 66, 66)",
        "width": "100%",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-between",
        "&.focused": {
            color: "#3f51b5",
        },
    },
    labelSingleLine: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
function handleOnChange(props, e) {
    // we extract the value from the browser event
    const value = e.target.value;
    // if the value is null as a string
    if (value === "null") {
        // we trigger the change to null
        return props.onChange(null, null);
    }
    // if the value comes as it's true or false, we pass it as so
    // note how we don't use internal values for booleans
    return props.onChange(value === "true", null);
}
const PropertyEntryBooleanRenderer = mui_core_1.withStyles(exports.style)((props) => {
    const descriptionAsAlert = props.args["descriptionAsAlert"];
    let icon = null;
    if (props.canRestore) {
        if (props.currentAppliedValue !== null) {
            icon = react_1.default.createElement(mui_core_1.RestoreIcon, null);
        }
    }
    else if (props.icon) {
        icon = props.icon;
    }
    let internalContent = null;
    if (props.isTernary) {
        const values = [{
                value: "true",
                label: localization_1.capitalize(props.trueLabel),
            }, {
                value: "false",
                label: localization_1.capitalize(props.falseLabel),
            }, {
                value: "null",
                label: localization_1.capitalize(props.nullLabel),
            }];
        internalContent = (react_1.default.createElement(mui_core_1.FormControl, { component: "fieldset", className: props.classes.entry },
            react_1.default.createElement(mui_core_1.FormLabel, { "aria-label": props.label, component: "legend", classes: {
                    root: props.classes.label + " " + props.classes.labelSingleLine,
                    focused: "focused",
                } },
                props.label,
                icon ? react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, className: props.classes.icon, onClick: props.canRestore && props.currentAppliedValue ? props.onRestore : null }, icon) : null),
            react_1.default.createElement(mui_core_1.RadioGroup, { value: JSON.stringify(props.currentValue), onChange: handleOnChange.bind(this, props) }, values.map((v) => react_1.default.createElement(mui_core_1.FormControlLabel, { key: v.value, classes: {
                    label: props.classes.label
                }, value: v.value, control: react_1.default.createElement(mui_core_1.Radio, null), label: v.label, disabled: props.disabled })))));
    }
    else {
        internalContent = (react_1.default.createElement(mui_core_1.FormControl, { className: props.classes.entry },
            react_1.default.createElement(mui_core_1.FormControlLabel, { "aria-label": props.label, classes: {
                    label: props.classes.label,
                }, control: react_1.default.createElement(mui_core_1.Switch, { checked: props.currentValue, onChange: props.onChange.bind(null, !props.currentValue, null), disabled: props.disabled }), label: props.label }),
            icon ? react_1.default.createElement(mui_core_1.IconButton, { className: props.classes.icon, onClick: props.canRestore ? props.onRestore : null }, icon) : null));
    }
    return (react_1.default.createElement("div", { className: props.classes.container },
        props.description && descriptionAsAlert ? react_1.default.createElement(mui_core_1.Alert, { severity: "info", className: props.classes.description }, props.description) : null,
        internalContent,
        props.description && !descriptionAsAlert ? react_1.default.createElement(mui_core_1.Typography, { variant: "caption", className: props.classes.description }, props.description) : null));
});
exports.default = PropertyEntryBooleanRenderer;
