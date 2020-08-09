"use strict";
/**
 * An standard login dialog component for fast prototyping fully compatible
 * with the navbar
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../mui-core");
const dialog_1 = require("./dialog");
const item_definition_1 = require("../../providers/item-definition");
const snackbar_1 = __importDefault(require("./snackbar"));
const util_1 = require("./util");
const LogActioner_1 = require("../../components/login/LogActioner");
const I18nRead_1 = __importDefault(require("../../components/localization/I18nRead"));
const Entry_1 = __importDefault(require("../../components/property/Entry"));
/**
 * The login dialog styles
 */
const loginDialogStyles = mui_core_1.createStyles({
    welcomeTitle: {
        paddingBottom: "1rem",
        fontWeight: 300,
    },
    loginButtonWrapper: {
        marginTop: "1.5rem",
    },
    titleContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    image: {
        height: "64px",
        width: "64px",
    },
    forgotPasswordButton: {
        marginTop: "1rem",
    },
    divider: {
        margin: "1rem 0",
    },
});
/**
 * simple utlity to run a couple of functions at once
 * @param functions the many functions
 */
function runManyFunctions(functions) {
    functions.forEach(f => f());
}
/**
 * A fully compatible with the navbar fast prototyping login dialog for the user
 * to fill in, contains its own item definition provider, but it must be into
 * a module provider context
 * @param props the login props
 * @returns a react component
 */
exports.LoginDialog = mui_core_1.withStyles(loginDialogStyles)((props) => {
    return (react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "user", disableExternalChecks: true, properties: ["username", "password"] },
        react_1.default.createElement(LogActioner_1.LogActioner, null, (actioner) => (react_1.default.createElement(I18nRead_1.default, { id: "login", capitalize: true }, (i18nLogin) => (react_1.default.createElement(dialog_1.DialogResponsive, { open: props.open, onClose: runManyFunctions.bind(null, [actioner.dismissError, actioner.cleanUnsafeFields, props.onClose]), title: i18nLogin },
            react_1.default.createElement("div", { className: props.classes.titleContainer },
                react_1.default.createElement("img", { src: "/rest/resource/icons/android-chrome-64x64.png", className: props.classes.image }),
                react_1.default.createElement(mui_core_1.Typography, { variant: "h4", className: props.classes.welcomeTitle },
                    react_1.default.createElement(I18nRead_1.default, { id: "login_welcome", capitalize: true }))),
            react_1.default.createElement("form", null,
                react_1.default.createElement(I18nRead_1.default, { id: "login_alt_field_label" }, (i18nAltLabel) => (react_1.default.createElement(I18nRead_1.default, { id: "login_alt_field_placeholder" }, (i18nAltPlaceholder) => (react_1.default.createElement(Entry_1.default, { id: "username", onChange: actioner.dismissError, showAsInvalid: !!actioner.error, ignoreErrors: true, altLabel: i18nAltLabel, altPlaceholder: i18nAltPlaceholder, icon: react_1.default.createElement(mui_core_1.AccountCircleIcon, null), autoFocus: true }))))),
                react_1.default.createElement(Entry_1.default, { id: "password", onChange: actioner.dismissError, showAsInvalid: !!actioner.error }),
                react_1.default.createElement(util_1.ProgressingElement, { isProgressing: actioner.isLoggingIn, fullWidth: true, className: props.classes.loginButtonWrapper },
                    react_1.default.createElement(mui_core_1.Button, { color: "primary", variant: "contained", size: "large", "aria-label": i18nLogin, startIcon: react_1.default.createElement(mui_core_1.DoneIcon, null), onClick: actioner.login.bind(null, true), fullWidth: true }, i18nLogin)),
                react_1.default.createElement(I18nRead_1.default, { id: "forgot_password_question" }, (i18nForgotPassword) => (react_1.default.createElement(mui_core_1.Button, { className: props.classes.forgotPasswordButton, color: "primary", variant: "text", size: "small", fullWidth: true, "aria-label": i18nForgotPassword, onClick: props.onRecoverRequest }, i18nForgotPassword))),
                react_1.default.createElement(mui_core_1.Divider, { className: props.classes.divider }),
                react_1.default.createElement(I18nRead_1.default, { id: "signup_instead" }, (i18nSignupInstead) => (react_1.default.createElement(mui_core_1.Button, { color: "secondary", variant: "text", fullWidth: true, "aria-label": i18nSignupInstead, onClick: props.onSignupRequest }, i18nSignupInstead)))),
            react_1.default.createElement(snackbar_1.default, { id: "login-dialog-error", severity: "error", i18nDisplay: actioner.error, open: !!actioner.error, onClose: actioner.dismissError }))))))));
});
