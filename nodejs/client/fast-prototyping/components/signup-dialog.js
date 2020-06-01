"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const dialog_1 = require("./dialog");
const Done_1 = __importDefault(require("@material-ui/icons/Done"));
const item_definition_1 = require("../../providers/item-definition");
const snackbar_1 = __importDefault(require("./snackbar"));
const Link_1 = __importDefault(require("../../components/navigation/Link"));
const util_1 = require("./util");
const AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
const LogActioner_1 = require("../../components/login/LogActioner");
const I18nRead_1 = __importDefault(require("../../components/localization/I18nRead"));
const Entry_1 = __importDefault(require("../../components/property/Entry"));
const AppLanguageRetriever_1 = __importDefault(require("../../components/localization/AppLanguageRetriever"));
const Setter_1 = __importDefault(require("../../components/property/Setter"));
const AppCountryRetriever_1 = __importDefault(require("../../components/localization/AppCountryRetriever"));
const AppCurrencyRetriever_1 = __importDefault(require("../../components/localization/AppCurrencyRetriever"));
const I18nReadError_1 = __importDefault(require("../../components/localization/I18nReadError"));
const I18nReadMany_1 = __importDefault(require("../../components/localization/I18nReadMany"));
const signupDialogStyles = core_1.createStyles({
    welcomeTitle: {
        paddingBottom: "1rem",
        fontWeight: 300,
    },
    signupComplyCaption: {
        fontWeight: 300,
        width: "100%",
        textAlign: "center",
        paddingTop: "1rem",
        display: "inline-block",
    },
    signupButtonWrapper: {
        marginTop: "1.5rem",
    },
    titleContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    forgotPasswordButton: {
        marginTop: "1rem",
    },
    divider: {
        margin: "1rem 0",
    },
});
function runManyFunctions(functions) {
    functions.forEach(f => f());
}
exports.SignupDialog = core_1.withStyles(signupDialogStyles)((props) => {
    return (react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "user", properties: [
            "username",
            "password",
            "app_language",
            "app_country",
            "app_currency",
        ] },
        react_1.default.createElement(LogActioner_1.LogActioner, null, (actioner) => (react_1.default.createElement(I18nRead_1.default, { id: "signup", capitalize: true }, (i18nSignup) => (react_1.default.createElement(dialog_1.DialogResponsive, { open: props.open, onClose: runManyFunctions.bind(null, [actioner.dismissError, actioner.cleanUnsafeFields, props.onClose]), title: i18nSignup },
            react_1.default.createElement("div", { className: props.classes.titleContainer },
                react_1.default.createElement(core_1.Typography, { variant: "h4", className: props.classes.welcomeTitle },
                    react_1.default.createElement(I18nRead_1.default, { id: "signup_welcome", capitalize: true }))),
            react_1.default.createElement("form", null,
                react_1.default.createElement(Entry_1.default, { id: "username", onChange: actioner.dismissError, showAsInvalid: !!actioner.error, icon: react_1.default.createElement(AccountCircle_1.default, null), autoFocus: true }),
                react_1.default.createElement(Entry_1.default, { id: "password", onChange: actioner.dismissError, showAsInvalid: !!actioner.error }),
                react_1.default.createElement(AppLanguageRetriever_1.default, null, (languageData) => (react_1.default.createElement(Setter_1.default, { id: "app_language", value: languageData.currentLanguage.code }))),
                react_1.default.createElement(AppCountryRetriever_1.default, null, (countryData) => (react_1.default.createElement(Setter_1.default, { id: "app_country", value: countryData.currentCountry.code }))),
                react_1.default.createElement(AppCurrencyRetriever_1.default, null, (currencyData) => (react_1.default.createElement(Setter_1.default, { id: "app_currency", value: currencyData.currentCurrency.code }))),
                react_1.default.createElement(I18nReadError_1.default, { error: actioner.error })),
            react_1.default.createElement(util_1.ProgressingElement, { isProgressing: actioner.isLoggingIn, fullWidth: true, className: props.classes.signupButtonWrapper },
                react_1.default.createElement(core_1.Button, { color: "primary", variant: "contained", size: "large", "aria-label": i18nSignup, startIcon: react_1.default.createElement(Done_1.default, null), onClick: actioner.signup.bind(null, true), fullWidth: true }, i18nSignup)),
            react_1.default.createElement(I18nReadMany_1.default, { data: [{
                        id: "terms_and_conditions",
                    }, {
                        id: "privacy_policy",
                    }] }, (i18nTermsAndConditions, i18nPrivacyPolicy) => (react_1.default.createElement(core_1.Typography, { variant: "caption", className: props.classes.signupComplyCaption },
                react_1.default.createElement(I18nRead_1.default, { id: "signup_accept_terms", capitalize: true, args: [
                        react_1.default.createElement(Link_1.default, { to: "/terms-and-conditions" }, i18nTermsAndConditions),
                        react_1.default.createElement(Link_1.default, { to: "/privacy-policy" }, i18nPrivacyPolicy)
                    ] })))),
            react_1.default.createElement(core_1.Divider, { className: props.classes.divider }),
            react_1.default.createElement(I18nRead_1.default, { id: "login_instead" }, (i18nLoginInstead) => (react_1.default.createElement(core_1.Button, { color: "secondary", variant: "text", fullWidth: true, "aria-label": i18nLoginInstead, onClick: props.onLoginRequest }, i18nLoginInstead))),
            react_1.default.createElement(snackbar_1.default, { severity: "error", i18nDisplay: actioner.error, open: !!actioner.error, onClose: actioner.dismissError }))))))));
});
