"use strict";
/**
 * Contains the section iformation for the current user in the fast prototyping profile
 *
 * @packageDocumentation
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mui_core_1 = require("../../../mui-core");
const snackbar_1 = __importDefault(require("../../../components/snackbar"));
const standard_info_1 = require("./standard-info");
const dialog_1 = require("../../../components/dialog");
const I18nReadMany_1 = __importDefault(require("../../../../components/localization/I18nReadMany"));
const LogActioner_1 = require("../../../../components/login/LogActioner");
const I18nRead_1 = __importDefault(require("../../../../components/localization/I18nRead"));
const SubmitActioner_1 = __importDefault(require("../../../../components/item-definition/SubmitActioner"));
/**
 * The logout dialog styles
 */
const LogoutDialogStyles = mui_core_1.createStyles({
    dialogContent: {
        padding: "1rem 0.5rem",
    },
    buttonBox: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
});
/**
 * The logout dialog shows when the user attempts to logout from all devices
 * shows a warning about what this entails
 * @param props the logout dialog props
 * @returns a react element
 */
const LogoutDialog = mui_core_1.withStyles(LogoutDialogStyles)((props) => {
    return (react_1.default.createElement(I18nReadMany_1.default, { data: [
            {
                id: "logout_all",
                capitalize: true,
            },
            {
                id: "logout_all_description",
            },
            {
                id: "cancel",
            },
        ] }, (i18nTitle, i18nBody, i18nCancel) => (react_1.default.createElement(dialog_1.DialogResponsive, { open: props.isOpen, onClose: props.onClose.bind(null, false), title: i18nTitle, buttons: react_1.default.createElement(mui_core_1.Box, { className: props.classes.buttonBox },
            react_1.default.createElement(mui_core_1.Button, { color: "default", "aria-label": i18nCancel, startIcon: react_1.default.createElement(mui_core_1.ArrowBackIcon, null), onClick: props.onClose.bind(null, true) }, i18nCancel),
            react_1.default.createElement(LogActioner_1.LogActioner, null, (actioner) => (react_1.default.createElement(mui_core_1.Button, { color: "secondary", "aria-label": i18nTitle, startIcon: react_1.default.createElement(mui_core_1.ExitToAppIcon, null), onClick: actioner.logoutAll }, i18nTitle)))) },
        react_1.default.createElement(mui_core_1.Typography, { variant: "body1", className: props.classes.dialogContent }, i18nBody)))));
});
/**
 * The current user profile styles
 */
const currentUserProfileStyles = mui_core_1.createStyles({
    container: {
        paddingTop: "1rem",
    },
    logoutButtons: {
        paddingTop: "0.2rem",
    },
});
/**
 * The current user profile contains the standard information for the current user and
 * allows to modify such, also allows to logout
 * @param props the current user profile props
 * @returns a react element
 */
exports.CurrentUserProfile = mui_core_1.withStyles(currentUserProfileStyles)((props) => {
    const [isDialogOpen, setIsDialogOpen] = react_1.useState(false);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(mui_core_1.Container, { maxWidth: "md", className: props.classes.container },
            react_1.default.createElement(standard_info_1.CurrentUserProfileStandardInfo, null),
            react_1.default.createElement(LogActioner_1.LogActioner, null, (actioner) => {
                return (react_1.default.createElement(mui_core_1.Box, { className: props.classes.logoutButtons },
                    react_1.default.createElement(mui_core_1.Button, { onClick: actioner.logout, endIcon: react_1.default.createElement(mui_core_1.ExitToAppIcon, null) },
                        react_1.default.createElement(I18nRead_1.default, { capitalize: true, id: "logout" })),
                    react_1.default.createElement(mui_core_1.Button, { onClick: setIsDialogOpen.bind(this, true), endIcon: react_1.default.createElement(mui_core_1.ExitToAppIcon, null) },
                        react_1.default.createElement(I18nRead_1.default, { capitalize: true, id: "logout_all" }))));
            }),
            react_1.default.createElement(SubmitActioner_1.default, null, (actioner) => (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(snackbar_1.default, { id: "profile-update-error", severity: "error", i18nDisplay: actioner.submitError, open: !!actioner.submitError, onClose: actioner.dismissError }),
                react_1.default.createElement(snackbar_1.default, { id: "profile-update-success", severity: "success", i18nDisplay: "profile_updated_successfully", open: actioner.submitted, onClose: actioner.dismissSubmitted }))))),
        react_1.default.createElement(LogoutDialog, { isOpen: isDialogOpen, onClose: setIsDialogOpen.bind(this, false) })));
});
