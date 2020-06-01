"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const module_1 = require("../../../providers/module");
const item_definition_1 = require("../../../providers/item-definition");
const item_definition_loader_1 = require("../../components/item-definition-loader");
const avatar_1 = require("../../components/avatar");
const core_1 = require("@material-ui/core");
const util_1 = require("../../components/util");
const Done_1 = __importDefault(require("@material-ui/icons/Done"));
const snackbar_1 = __importDefault(require("../../components/snackbar"));
const UserActioner_1 = __importDefault(require("../../../components/user/UserActioner"));
const navigation_1 = require("../../../components/navigation");
const LocationStateReader_1 = __importDefault(require("../../../components/navigation/LocationStateReader"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
const Reader_1 = __importDefault(require("../../../components/property/Reader"));
const I18nReadMany_1 = __importDefault(require("../../../components/localization/I18nReadMany"));
const Entry_1 = __importDefault(require("../../../components/property/Entry"));
const resetPasswordStyles = core_1.createStyles({
    container: {
        paddingTop: "1rem",
    },
    paper: {
        padding: "1rem",
    },
    username: {
        fontWeight: 300,
        width: "100%",
        marginTop: "1rem",
        textAlign: "center",
    },
    recoverTitle: {
        fontWeight: 300,
        margin: "1rem 0",
        width: "100%",
        textAlign: "center",
    },
    divider: {
        margin: "1rem 0",
    },
});
async function resetPassword(token, actioner) {
    const result = await actioner.resetPassword(token, true);
    if (!result.error) {
        navigation_1.localizedRedirectTo("/?msg=reset_password_success&msgtitle=reset_password", null, true);
    }
}
exports.ResetPassword = core_1.withStyles(resetPasswordStyles)((props) => {
    return (react_1.default.createElement(util_1.SlowLoadingElement, { id: "reset-password" },
        react_1.default.createElement(LocationStateReader_1.default, { defaultState: { token: null, id: null }, stateIsInQueryString: true }, (state, setState) => {
            const userId = parseInt(state.id, 10) || null;
            if (!userId) {
                return null;
            }
            return (react_1.default.createElement(module_1.ModuleProvider, { module: "users" },
                react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "user", properties: [
                        "username",
                        "profile_picture",
                        "password",
                        "role",
                    ], forId: userId, cleanOnDismount: {
                        propertiesToCleanOnAny: ["password"],
                    } },
                    react_1.default.createElement(I18nRead_1.default, { id: "reset_password", capitalize: true }, (i18nResetPassword) => (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(TitleSetter_1.default, null, i18nResetPassword),
                        react_1.default.createElement(core_1.Container, { maxWidth: "md", className: props.classes.container },
                            react_1.default.createElement(core_1.Paper, { className: props.classes.paper },
                                react_1.default.createElement(item_definition_loader_1.ItemDefinitionLoader, null,
                                    react_1.default.createElement(avatar_1.Avatar, { size: "large", fullWidth: true }),
                                    react_1.default.createElement(Reader_1.default, { id: "username" }, (username) => (react_1.default.createElement(core_1.Typography, { variant: "h4", className: props.classes.username }, username)))),
                                react_1.default.createElement(core_1.Divider, { className: props.classes.divider }),
                                react_1.default.createElement(core_1.Typography, { variant: "h6", className: props.classes.recoverTitle }, i18nResetPassword),
                                react_1.default.createElement(I18nReadMany_1.default, { data: [
                                        { id: "reset_password_field_alt_label" },
                                        { id: "reset_password_field_alt_placeholder" },
                                        { id: "reset_password_message" },
                                    ] }, (i18nAltLabel, i18nAltPlaceholder, i18nAltDescription) => (react_1.default.createElement(Entry_1.default, { id: "password", altLabel: i18nAltLabel, altPlaceholder: i18nAltPlaceholder, altDescription: i18nAltDescription, autoFocus: true }))),
                                react_1.default.createElement(UserActioner_1.default, null, (actioner) => (react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement(I18nRead_1.default, { id: "reset_password_action" }, (i18nUpdatePassword) => (react_1.default.createElement(util_1.ProgressingElement, { isProgressing: actioner.statefulOnProgress, fullWidth: true },
                                        react_1.default.createElement(core_1.Button, { "aria-label": i18nUpdatePassword, fullWidth: true, size: "large", variant: "contained", color: "primary", endIcon: react_1.default.createElement(Done_1.default, null), onClick: resetPassword.bind(null, state.token, actioner) }, i18nUpdatePassword)))),
                                    react_1.default.createElement(snackbar_1.default, { severity: "error", i18nDisplay: actioner.statefulError, open: !!actioner.statefulError, onClose: actioner.dismissStatefulError }),
                                    react_1.default.createElement(snackbar_1.default, { severity: "success", i18nDisplay: "", open: !!actioner.statefulSuccess, onClose: actioner.dismissStatefulSuccess }))))))))))));
        })));
});
