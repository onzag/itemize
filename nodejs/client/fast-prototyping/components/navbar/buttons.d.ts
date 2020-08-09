/**
 * Contains the buttons that are part of the navbar
 *
 * @packageDocumentation
 */
import React from "react";
import { Theme, WithStyles } from "../../mui-core";
/**
 * provides the styles for the buttons
 * @param theme the mui theme
 * @returns a bunch of styles
 */
declare const buttonsStyles: (theme: Theme) => Record<"languageButton" | "loginButton" | "standardLanguageButtonLabel" | "shrunkLanguageButtonLabel", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The button props, that are passed by the navbar
 */
interface ButtonsProps extends WithStyles<typeof buttonsStyles> {
    /**
     * Whether the language picker that allows for selecting the language on the navbar
     * should be excluded
     */
    excludeLanguagePicker: boolean;
    /**
     * The login dialog component, a custom one might be passed via the navbar config
     */
    LoginDialog: React.ComponentType<{
        open: boolean;
        onClose: () => void;
        onSignupRequest: () => void;
        onRecoverRequest: () => void;
    }>;
    /**
     * the signup dialog component, a custom one might be passed via the navbar config
     */
    SignupDialog: React.ComponentType<{
        open: boolean;
        onClose: () => void;
        onLoginRequest: () => void;
    }>;
    /**
     * The recover password component a custom one might be passed via the navbar config
     */
    RecoverDialog: React.ComponentType<{
        open: boolean;
        onClose: () => void;
        onLoginRequest: () => void;
    }>;
    /**
     * Component for avatar
     */
    AvatarComponent: React.ComponentType<any>;
    /**
     * avatarProps
     */
    avatarProps: any;
}
/**
 * The buttons component which contains all the buttons that are in the navbar as well
 * as handle the navigation logig for keeping a state for login/signup
 *
 * It also contains the avatar
 *
 * @param props the props
 * @returns a react component
 */
export declare const Buttons: React.ComponentType<Pick<ButtonsProps, "excludeLanguagePicker" | "LoginDialog" | "SignupDialog" | "RecoverDialog" | "AvatarComponent" | "avatarProps"> & import("@material-ui/styles").StyledComponentProps<"languageButton" | "loginButton" | "standardLanguageButtonLabel" | "shrunkLanguageButtonLabel">>;
export {};
