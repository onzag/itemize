"use strict";
/**
 * Contains the buttons that are part of the navbar
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../../mui-core");
const language_picker_1 = require("../language-picker");
const LocationStateReader_1 = __importDefault(require("../../../components/navigation/LocationStateReader"));
const IfLogStatus_1 = require("../../../components/login/IfLogStatus");
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
/**
 * provides the styles for the buttons
 * @param theme the mui theme
 * @returns a bunch of styles
 */
const buttonsStyles = (theme) => mui_core_1.createStyles({
    languageButton: {
        marginLeft: "1rem",
        marginRight: "1rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
    },
    loginButton: {
        whiteSpace: "nowrap",
    },
    standardLanguageButtonLabel: {
        [theme.breakpoints.down(450)]: {
            display: "none",
        }
    },
    shrunkLanguageButtonLabel: {
        display: "none",
        [theme.breakpoints.down(450)]: {
            display: "inline",
        }
    },
});
/**
 * The buttons component which contains all the buttons that are in the navbar as well
 * as handle the navigation logig for keeping a state for login/signup
 *
 * It also contains the avatar
 *
 * @param props the props
 * @returns a react component
 */
exports.Buttons = mui_core_1.withStyles(buttonsStyles)((props) => {
    // we first use the location state reader and keep this in our state
    return (react_1.default.createElement(LocationStateReader_1.default, { defaultState: { signupDialogOpen: false, loginDialogOpen: false, recoverDialogOpen: false } }, (state, setLocationState) => {
        // so this will open the dialog to login, it will replace the state
        // if the signup dialog is already open, so going back will quit
        const openLoginDialog = () => setLocationState({
            loginDialogOpen: true,
            signupDialogOpen: false,
            recoverDialogOpen: false,
        }, state.signupDialogOpen);
        // close the login dialog, it will indeed push
        const closeLoginDialog = () => setLocationState({
            loginDialogOpen: false,
        }, true);
        // open the signup dialog and others
        const openSignupDialog = () => setLocationState({
            signupDialogOpen: true,
            loginDialogOpen: false,
            recoverDialogOpen: false,
        }, state.loginDialogOpen);
        const closeSignupDialog = () => setLocationState({
            signupDialogOpen: false,
        }, true);
        const openRecoverDialog = () => setLocationState({
            loginDialogOpen: false,
            signupDialogOpen: false,
            recoverDialogOpen: true,
        });
        const closeRecoverDialog = () => setLocationState({
            recoverDialogOpen: false,
        }, true);
        // now we get our components
        const LoginDialog = props.LoginDialog;
        const SignupDialog = props.SignupDialog;
        const RecoverDialog = props.RecoverDialog;
        // and return
        return (react_1.default.createElement(IfLogStatus_1.IfLogStatus, null, (status) => {
            if (status === "LOGGED_OUT" || status === "LOGGING_IN") {
                return react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(mui_core_1.Button, { color: "inherit", variant: "outlined", onClick: openLoginDialog, className: props.classes.loginButton },
                        react_1.default.createElement(I18nRead_1.default, { id: "login" })),
                    !props.excludeLanguagePicker ?
                        react_1.default.createElement(language_picker_1.LanguagePicker, { className: props.classes.languageButton, shrinkingDisplay: true, shrinkingDisplayStandardClassName: props.classes.standardLanguageButtonLabel, shrinkingDisplayShrunkClassName: props.classes.shrunkLanguageButtonLabel }) :
                        null,
                    react_1.default.createElement(LoginDialog, { open: state.loginDialogOpen, onClose: closeLoginDialog, onSignupRequest: openSignupDialog, onRecoverRequest: openRecoverDialog }),
                    SignupDialog ? react_1.default.createElement(SignupDialog, { open: state.signupDialogOpen, onClose: closeSignupDialog, onLoginRequest: openLoginDialog }) : null,
                    react_1.default.createElement(RecoverDialog, { open: state.recoverDialogOpen, onClose: closeRecoverDialog, onLoginRequest: openLoginDialog }));
            }
            else if (status === "LOGGED_IN") {
                const Avatar = props.AvatarComponent;
                return react_1.default.createElement(Avatar, Object.assign({}, props.avatarProps));
            }
        }));
    }));
});
