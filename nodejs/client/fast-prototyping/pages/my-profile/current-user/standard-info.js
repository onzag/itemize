"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const buttons_1 = require("../../../components/buttons");
const dialog_1 = require("../../../components/dialog");
const Done_1 = __importDefault(require("@material-ui/icons/Done"));
const lab_1 = require("@material-ui/lab");
const DoneOutline_1 = __importDefault(require("@material-ui/icons/DoneOutline"));
const MailOutline_1 = __importDefault(require("@material-ui/icons/MailOutline"));
const avatar_1 = require("../../../components/avatar");
const snackbar_1 = __importDefault(require("../../../components/snackbar"));
const language_picker_1 = require("../../../components/language-picker");
const country_picker_1 = require("../../../components/country-picker");
const currency_picker_1 = require("../../../components/currency-picker");
const util_1 = require("../../../components/util");
const AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
const AlternateEmail_1 = __importDefault(require("@material-ui/icons/AlternateEmail"));
const Face_1 = __importDefault(require("@material-ui/icons/Face"));
const Link_1 = __importDefault(require("../../../../components/navigation/Link"));
const item_definition_loader_1 = require("../../../components/item-definition-loader");
const Error_1 = __importDefault(require("@material-ui/icons/Error"));
const I18nReadMany_1 = __importDefault(require("../../../../components/localization/I18nReadMany"));
const Entry_1 = __importDefault(require("../../../../components/property/Entry"));
const Reader_1 = __importDefault(require("../../../../components/property/Reader"));
const I18nRead_1 = __importDefault(require("../../../../components/localization/I18nRead"));
const UserActioner_1 = __importDefault(require("../../../../components/user/UserActioner"));
const DifferingPropertiesRetriever_1 = __importDefault(require("../../../../components/item-definition/DifferingPropertiesRetriever"));
function CustomConfirmationDialog(props) {
    return (react_1.default.createElement(I18nReadMany_1.default, { data: [
            {
                id: "title",
                policyType: "edit",
                policyName: "REQUIRES_PASSWORD_CONFIRMATION",
            },
            {
                id: "ok",
            },
        ] }, (i18nTitle, i18nOk) => (react_1.default.createElement(dialog_1.DialogResponsive, { open: props.isActive, onClose: props.onClose.bind(null, false), title: i18nTitle, buttons: react_1.default.createElement(core_1.Button, { color: "primary", "aria-label": i18nOk, startIcon: react_1.default.createElement(Done_1.default, null), onClick: props.onClose.bind(null, true) }, i18nOk) },
        react_1.default.createElement(Entry_1.default, { id: "password", policyName: "REQUIRES_PASSWORD_CONFIRMATION", policyType: "edit" })))));
}
const currentUserProfileStandardInfoStyles = (theme) => core_1.createStyles({
    paper: {
        padding: "1rem",
    },
    buttonBox: {
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: "1.2rem",
    },
    containerBox: {
        paddingBottom: "1rem",
    },
    containerBoxButton: {
        padding: 0,
    },
    pickers: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    alertButtonValidateEmailContainer: {
        paddingTop: "0.75rem",
    },
    emailInButton: {
        textTransform: "none",
        opacity: 0.7,
    },
    errorIconButton: {
        color: theme.palette.error.main,
    },
});
exports.CurrentUserProfileStandardInfo = core_1.withStyles(currentUserProfileStandardInfoStyles)((props) => {
    return (react_1.default.createElement(core_1.Paper, { className: props.classes.paper },
        react_1.default.createElement(item_definition_loader_1.ItemDefinitionLoader, null,
            react_1.default.createElement(Entry_1.default, { id: "profile_picture", renderer: avatar_1.AvatarRenderer }),
            react_1.default.createElement(util_1.SlowLoadingElement, { inline: true, id: "profile-pickers" },
                react_1.default.createElement("div", { className: props.classes.pickers },
                    react_1.default.createElement(language_picker_1.LanguagePicker, null),
                    react_1.default.createElement(country_picker_1.CountryPicker, null),
                    react_1.default.createElement(currency_picker_1.CurrencyPicker, null))),
            react_1.default.createElement(core_1.Box, { className: props.classes.containerBox },
                react_1.default.createElement(I18nReadMany_1.default, { data: [
                        { id: "change_password" },
                        { id: "update_your_preferences" },
                    ] }, (i18nChangePassword, i18nPreferences) => (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Link_1.default, { to: "/preferences" },
                        react_1.default.createElement(Reader_1.default, { id: "address" }, (value, stateValue) => {
                            const hasWarning = !(stateValue && stateValue.stateAppliedValue);
                            return (react_1.default.createElement(core_1.Button, { variant: "text", size: "small", fullWidth: true, className: props.classes.containerBoxButton, endIcon: hasWarning ? react_1.default.createElement(Error_1.default, { className: props.classes.errorIconButton }) : null }, i18nPreferences));
                        })),
                    react_1.default.createElement(Link_1.default, { to: "/change-password" },
                        react_1.default.createElement(core_1.Button, { variant: "text", size: "small", fullWidth: true, className: props.classes.containerBoxButton }, i18nChangePassword)))))),
            react_1.default.createElement(Entry_1.default, { id: "username", icon: react_1.default.createElement(AccountCircle_1.default, null) }),
            react_1.default.createElement(Reader_1.default, { id: "email" }, (email, emailState) => {
                const missesEmail = !(emailState && emailState.stateAppliedValue);
                if (missesEmail) {
                    return (react_1.default.createElement(lab_1.Alert, { severity: "error" },
                        react_1.default.createElement(lab_1.AlertTitle, null,
                            react_1.default.createElement(I18nRead_1.default, { capitalize: true, id: "missing_email_warning_title" })),
                        react_1.default.createElement(I18nRead_1.default, { id: "missing_email_warning" })));
                }
                return (react_1.default.createElement(Reader_1.default, { id: "e_validated" }, (eValidated, eValidatedState) => {
                    const missesValidation = !(eValidatedState && eValidatedState.stateAppliedValue);
                    if (missesValidation) {
                        return (react_1.default.createElement(lab_1.Alert, { severity: "error" },
                            react_1.default.createElement(lab_1.AlertTitle, null,
                                react_1.default.createElement(I18nRead_1.default, { capitalize: true, id: "missing_email_validation_warning_title" })),
                            react_1.default.createElement(I18nRead_1.default, { id: "missing_email_validation_warning" }),
                            react_1.default.createElement("div", { className: props.classes.alertButtonValidateEmailContainer },
                                react_1.default.createElement(UserActioner_1.default, null, (actioner) => (react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement(util_1.ProgressingElement, { isProgressing: actioner.statefulOnProgress },
                                        react_1.default.createElement(core_1.Button, { variant: "outlined", color: "secondary", endIcon: react_1.default.createElement(MailOutline_1.default, null), onClick: actioner.sendValidateEmail },
                                            react_1.default.createElement(I18nRead_1.default, { capitalize: true, id: "missing_email_validation_warning_action" }),
                                            react_1.default.createElement("i", { className: props.classes.emailInButton }, " " + emailState.stateAppliedValue))),
                                    react_1.default.createElement(snackbar_1.default, { severity: "error", i18nDisplay: actioner.statefulError, open: !!actioner.statefulError, onClose: actioner.dismissStatefulError }),
                                    react_1.default.createElement(snackbar_1.default, { severity: "success", i18nDisplay: "missing_email_validation_warning_action_success", open: actioner.statefulSuccess, onClose: actioner.dismissStatefulSuccess })))))));
                    }
                    return null;
                }));
            }),
            react_1.default.createElement(Entry_1.default, { id: "email", rendererArgs: { descriptionAsAlert: true }, icon: react_1.default.createElement(AlternateEmail_1.default, null) }),
            react_1.default.createElement(Entry_1.default, { id: "about_me", icon: react_1.default.createElement(Face_1.default, null) }),
            react_1.default.createElement(core_1.Divider, null),
            react_1.default.createElement(core_1.Box, { className: props.classes.buttonBox },
                react_1.default.createElement(DifferingPropertiesRetriever_1.default, { mainProperties: ["profile_picture", "username", "email", "about_me"] }, (differingProperties) => {
                    const options = {
                        properties: differingProperties,
                        unpokeAfterAny: true,
                    };
                    if (differingProperties.includes("username") ||
                        differingProperties.includes("email")) {
                        options.policies = [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]];
                        options.policiesToCleanOnAny = [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]];
                    }
                    let CustomConfirmationComponent = null;
                    if (options.policies) {
                        CustomConfirmationComponent = CustomConfirmationDialog;
                    }
                    return (react_1.default.createElement(buttons_1.SubmitButton, { i18nId: "update_profile", options: options, CustomConfirmationComponent: CustomConfirmationComponent, buttonColor: "primary", buttonStartIcon: react_1.default.createElement(DoneOutline_1.default, null), buttonVariant: "contained" }));
                })))));
});
