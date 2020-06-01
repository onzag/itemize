"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const module_1 = require("../../../providers/module");
const item_definition_1 = require("../../../providers/item-definition");
const item_definition_loader_1 = require("../../components/item-definition-loader");
const util_1 = require("../../components/util");
const core_1 = require("@material-ui/core");
const Notifications_1 = __importDefault(require("@material-ui/icons/Notifications"));
const snackbar_1 = __importDefault(require("../../components/snackbar"));
const MenuBook_1 = __importDefault(require("@material-ui/icons/MenuBook"));
const DoneOutline_1 = __importDefault(require("@material-ui/icons/DoneOutline"));
const PersonPin_1 = __importDefault(require("@material-ui/icons/PersonPin"));
const buttons_1 = require("../../components/buttons");
const needs_submit_prompt_1 = require("../../components/needs-submit-prompt");
const UserDataRetriever_1 = __importDefault(require("../../../components/user/UserDataRetriever"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
const Entry_1 = __importDefault(require("../../../components/property/Entry"));
const SubmitActioner_1 = __importDefault(require("../../../components/item-definition/SubmitActioner"));
const preferencesStyles = core_1.createStyles({
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
exports.Preferences = core_1.withStyles(preferencesStyles)((props) => {
    return (react_1.default.createElement(util_1.SlowLoadingElement, { id: "preferences" },
        react_1.default.createElement(UserDataRetriever_1.default, null, (userData) => {
            const properties = [
                "e_notifications",
                "e_newsletter",
                "address",
            ];
            return (react_1.default.createElement(module_1.ModuleProvider, { module: "users" },
                react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "user", properties: properties, forId: userData.id, assumeOwnership: true, includePolicies: false, disableExternalChecks: true, longTermCaching: true, markForDestructionOnLogout: true, cleanOnDismount: {
                        propertiesToRestoreOnAny: properties,
                    } },
                    react_1.default.createElement(I18nRead_1.default, { id: "preferences", capitalize: true }, (i18nPreferences) => {
                        return (react_1.default.createElement(TitleSetter_1.default, null, i18nPreferences));
                    }),
                    react_1.default.createElement(needs_submit_prompt_1.NeedsSubmitPrompt, { properties: properties, i18nConfirm: "update_your_preferences", confirmationSubmitOptions: {
                            properties: properties,
                            differingOnly: true,
                        } }),
                    react_1.default.createElement(item_definition_loader_1.ItemDefinitionLoader, null,
                        react_1.default.createElement(core_1.Container, { maxWidth: "md", className: props.classes.container },
                            react_1.default.createElement(core_1.Paper, { className: props.classes.paper },
                                react_1.default.createElement(Entry_1.default, { id: "e_notifications", icon: react_1.default.createElement(Notifications_1.default, null) }),
                                react_1.default.createElement(Entry_1.default, { id: "e_newsletter", icon: react_1.default.createElement(MenuBook_1.default, null) }),
                                react_1.default.createElement(Entry_1.default, { id: "address", icon: react_1.default.createElement(PersonPin_1.default, null), rendererArgs: { descriptionAsAlert: true } }),
                                react_1.default.createElement(core_1.Divider, null),
                                react_1.default.createElement(core_1.Box, { className: props.classes.buttonBox },
                                    react_1.default.createElement(buttons_1.SubmitButton, { i18nId: "update_your_preferences", options: {
                                            properties: ["e_notifications", "e_newsletter", "address"],
                                            differingOnly: true,
                                            unpokeAfterAny: true,
                                        }, buttonColor: "primary", buttonStartIcon: react_1.default.createElement(DoneOutline_1.default, null), buttonVariant: "contained" }))))),
                    react_1.default.createElement(SubmitActioner_1.default, null, (actioner) => (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(snackbar_1.default, { severity: "error", i18nDisplay: actioner.submitError, open: !!actioner.submitError, onClose: actioner.dismissError }),
                        react_1.default.createElement(snackbar_1.default, { severity: "success", i18nDisplay: "preferences_updated_successfully", open: actioner.submitted, onClose: actioner.dismissSubmitted })))))));
        })));
});
