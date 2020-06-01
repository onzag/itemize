"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const dialog_1 = require("./dialog");
const MailOutline_1 = __importDefault(require("@material-ui/icons/MailOutline"));
const lab_1 = require("@material-ui/lab");
const item_definition_1 = require("../../providers/item-definition");
const snackbar_1 = __importDefault(require("./snackbar"));
const util_1 = require("./util");
const AlternateEmail_1 = __importDefault(require("@material-ui/icons/AlternateEmail"));
const UserActioner_1 = __importDefault(require("../../components/user/UserActioner"));
const I18nRead_1 = __importDefault(require("../../components/localization/I18nRead"));
const Entry_1 = __importDefault(require("../../components/property/Entry"));
const recoverDialogStyles = core_1.createStyles({
    resetPasswordButtonWrapper: {
        marginTop: "1.5rem",
    },
    divider: {
        margin: "1rem 0",
    },
});
function runManyFunctions(functions) {
    functions.forEach(f => f());
}
exports.RecoverDialog = core_1.withStyles(recoverDialogStyles)((props) => {
    return (react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "user", disableExternalChecks: true, properties: ["email"] },
        react_1.default.createElement(UserActioner_1.default, null, (actioner) => (react_1.default.createElement(I18nRead_1.default, { id: "recover_account", capitalize: true }, (i18nRecover) => (react_1.default.createElement(dialog_1.DialogResponsive, { open: props.open, onClose: runManyFunctions.bind(null, [actioner.dismissStatefulError, actioner.cleanUnsafeFields, props.onClose]), title: i18nRecover },
            react_1.default.createElement(lab_1.Alert, { severity: "info" },
                react_1.default.createElement(I18nRead_1.default, { id: "recover_account_message" })),
            react_1.default.createElement("form", null,
                react_1.default.createElement(Entry_1.default, { id: "email", onChange: actioner.dismissStatefulError, showAsInvalid: !!actioner.statefulError, hideDescription: true, icon: react_1.default.createElement(AlternateEmail_1.default, null), autoFocus: true })),
            react_1.default.createElement(I18nRead_1.default, { id: "recover_account_action" }, (i18nRecoverAction) => (react_1.default.createElement(util_1.ProgressingElement, { isProgressing: actioner.statefulOnProgress, fullWidth: true, className: props.classes.resetPasswordButtonWrapper },
                react_1.default.createElement(core_1.Button, { color: "primary", variant: "contained", size: "large", "aria-label": i18nRecoverAction, startIcon: react_1.default.createElement(MailOutline_1.default, null), onClick: actioner.sendResetPassword.bind(null, true), fullWidth: true }, i18nRecoverAction)))),
            react_1.default.createElement(core_1.Divider, { className: props.classes.divider }),
            react_1.default.createElement(I18nRead_1.default, { id: "login" }, (i18nLogin) => (react_1.default.createElement(core_1.Button, { color: "secondary", variant: "text", fullWidth: true, "aria-label": i18nLogin, onClick: props.onLoginRequest }, i18nLogin))),
            react_1.default.createElement(snackbar_1.default, { severity: "error", i18nDisplay: actioner.statefulError, open: !!actioner.statefulError, onClose: actioner.dismissStatefulError }),
            react_1.default.createElement(snackbar_1.default, { severity: "success", i18nDisplay: "recover_account_action_success", open: !!actioner.statefulSuccess, onClose: actioner.dismissStatefulSuccess }))))))));
});
