"use strict";
/**
 * Fast prototyping page for changing the password
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const module_1 = require("../../../providers/module");
const item_definition_1 = require("../../../providers/item-definition");
const item_definition_loader_1 = require("../../components/item-definition-loader");
const mui_core_1 = require("../../mui-core");
const snackbar_1 = __importDefault(require("../../components/snackbar"));
const buttons_1 = require("../../components/buttons");
const UserDataRetriever_1 = __importDefault(require("../../../components/user/UserDataRetriever"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
const I18nReadMany_1 = __importDefault(require("../../../components/localization/I18nReadMany"));
const Entry_1 = __importDefault(require("../../../components/property/Entry"));
const SubmitActioner_1 = __importDefault(require("../../../components/item-definition/SubmitActioner"));
/**
 * Styles for the change password page
 */
const changePasswordStyles = mui_core_1.createStyles({
    paper: {
        padding: "1rem",
    },
    container: {
        paddingTop: "1rem",
    },
    buttonBox: {
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: "1.2rem",
    },
});
/**
 * A simple page designed to provide functionality to change the password
 * @param props the page props
 * @returns a react element
 */
exports.ChangePassword = mui_core_1.withStyles(changePasswordStyles)((props) => {
    return (react_1.default.createElement(UserDataRetriever_1.default, null, (userData) => {
        return (react_1.default.createElement(module_1.ModuleProvider, { module: "users" },
            react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "user", properties: [
                    "password",
                ], forId: userData.id, assumeOwnership: true, includePolicies: true, disableExternalChecks: true, avoidLoading: true },
                react_1.default.createElement(I18nRead_1.default, { id: "change_password", capitalize: true }, (i18nChangePassword) => {
                    return (react_1.default.createElement(TitleSetter_1.default, null, i18nChangePassword));
                }),
                react_1.default.createElement(item_definition_loader_1.ItemDefinitionLoader, null,
                    react_1.default.createElement(mui_core_1.Container, { maxWidth: "md", className: props.classes.container },
                        react_1.default.createElement(mui_core_1.Paper, { className: props.classes.paper },
                            react_1.default.createElement(I18nReadMany_1.default, { data: [
                                    { id: "change_password_current_alt_label" },
                                    { id: "change_password_current_alt_placeholder" },
                                    { id: "change_password_new_alt_label" },
                                    { id: "change_password_new_alt_placeholder" },
                                ] }, (i18nAltCurrentPasswordLabel, i18nAltCurrentPasswordPlaceholder, i18nAltNewPasswordLabel, i18nAltNewPasswordPlaceholder) => (react_1.default.createElement("form", null,
                                react_1.default.createElement(Entry_1.default, { id: "password", policyType: "edit", policyName: "REQUIRES_PASSWORD_CONFIRMATION", altLabel: i18nAltCurrentPasswordLabel, altPlaceholder: i18nAltCurrentPasswordPlaceholder, autoFocus: true }),
                                react_1.default.createElement(Entry_1.default, { id: "password", altLabel: i18nAltNewPasswordLabel, altPlaceholder: i18nAltNewPasswordPlaceholder })))),
                            react_1.default.createElement(mui_core_1.Divider, null),
                            react_1.default.createElement(mui_core_1.Box, { className: props.classes.buttonBox },
                                react_1.default.createElement(buttons_1.SubmitButton, { i18nId: "change_password", options: {
                                        properties: ["password"],
                                        propertiesToCleanOnSuccess: ["password"],
                                        policies: [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]],
                                        policiesToCleanOnSuccess: [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]],
                                        unpokeAfterAny: true,
                                    }, buttonColor: "primary", buttonStartIcon: react_1.default.createElement(mui_core_1.DoneOutlineIcon, null), buttonVariant: "contained", redirectOnSuccess: "/my-profile?msg=change_password_success&msgtitle=change_password", redirectGoBack: true, redirectReplace: true }))))),
                react_1.default.createElement(SubmitActioner_1.default, null, (actioner) => (react_1.default.createElement(snackbar_1.default, { id: "change-password-error", severity: "error", i18nDisplay: actioner.submitError, open: !!actioner.submitError, onClose: actioner.dismissError }))))));
    }));
});
