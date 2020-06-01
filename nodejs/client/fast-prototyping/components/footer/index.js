"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const Copyright_1 = __importDefault(require("@material-ui/icons/Copyright"));
const Link_1 = __importDefault(require("../../../components/navigation/Link"));
const language_picker_1 = require("../language-picker");
const currency_picker_1 = require("../currency-picker");
const country_picker_1 = require("../country-picker");
const footerStyles = (theme) => core_1.createStyles({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "3rem",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "0.5rem 0",
        [theme.breakpoints.down("sm")]: {
            padding: "1rem 0",
        }
    },
    containerAbs: {
        position: "absolute",
        bottom: 0,
        backgroundColor: theme.palette.grey[900],
    },
    dataSet: {
        lineHeight: 0,
        height: "2.5rem",
        flex: "1 1 0",
        padding: "0.2rem 1rem",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            flex: "1 0 100%",
            padding: "0.5rem 0",
        },
    },
    dataSetAbs: {
        "&:first-child": {
            flex: "2 1 0",
        },
        "&:not(:last-child)": {
            [theme.breakpoints.up("md")]: {
                borderRight: "solid 1px #aaa",
            }
        }
    },
    copyInfo: {
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },
    link: {
        color: "inherit",
        textDecoration: "none",
    },
});
exports.Footer = core_1.withStyles(footerStyles)((props) => {
    const year = (new Date()).getUTCFullYear();
    // the first represents the spacer, the second is the actual footer
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: props.classes.container },
            react_1.default.createElement("div", { className: props.classes.dataSet }),
            react_1.default.createElement("div", { className: props.classes.dataSet }),
            react_1.default.createElement("div", { className: props.classes.dataSet }),
            react_1.default.createElement("div", { className: props.classes.dataSet })),
        react_1.default.createElement("div", { className: props.classes.container + " " + props.classes.containerAbs },
            react_1.default.createElement("div", { className: props.classes.dataSet + " " + props.classes.dataSetAbs },
                react_1.default.createElement(Copyright_1.default, null),
                "\u00A0",
                year,
                react_1.default.createElement("span", { className: props.classes.copyInfo },
                    "\u00A0",
                    react_1.default.createElement(I18nRead_1.default, { id: "app_name", capitalize: true })),
                "\u00A0 \u00A0",
                react_1.default.createElement(language_picker_1.LanguagePicker, { useCode: true }),
                react_1.default.createElement(country_picker_1.CountryPicker, { useCode: true }),
                react_1.default.createElement(currency_picker_1.CurrencyPicker, { useCode: true })),
            react_1.default.createElement("div", { className: props.classes.dataSet + " " + props.classes.dataSetAbs },
                react_1.default.createElement(Link_1.default, { to: "/contact", className: props.classes.link },
                    react_1.default.createElement(I18nRead_1.default, { id: "contact", capitalize: true }))),
            react_1.default.createElement("div", { className: props.classes.dataSet + " " + props.classes.dataSetAbs },
                react_1.default.createElement(Link_1.default, { to: "/terms-and-conditions", className: props.classes.link },
                    react_1.default.createElement(I18nRead_1.default, { id: "terms_and_conditions", capitalize: true }))),
            react_1.default.createElement("div", { className: props.classes.dataSet + " " + props.classes.dataSetAbs },
                react_1.default.createElement(Link_1.default, { to: "/privacy-policy", className: props.classes.link },
                    react_1.default.createElement(I18nRead_1.default, { id: "privacy_policy", capitalize: true })))));
});
