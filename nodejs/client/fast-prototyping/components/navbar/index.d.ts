/**
 * The navbar for the fast prototyping usage and what it comes by default
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles, Theme } from "../../mui-core";
import { IMenuEntry } from "./menu";
/**
 * the navbar styles generator
 * @param theme the mui theme
 * @returns a bunch of styles
 */
declare const navbarStyles: (theme: Theme) => Record<"title" | "container" | "appBarSpacer" | "titleTypography" | "titleMargin", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The navbar props that allow to build a a navbar based on the folowing logic
 */
interface INavbarProps extends WithStyles<typeof navbarStyles> {
    /**
     * Optional, default is false, exclude the language picker so the language cannot be chosen and instead it goes
     * with whatever default is loaded, a language picker might be added somewhere else
     */
    excludeLanguagePicker?: boolean;
    /**
     * Exclude the blocking backdrop which shows when the app is blocked from an update, you can add a different sort of
     * message somewhere else if you exclude it
     */
    excludeBlockingBackdrop?: boolean;
    /**
     * The Login dialog component, required, after all that's what all this navbar is for, check login-dialog.tsx for a default
     */
    LoginDialog: React.ComponentType<{
        open: boolean;
        onClose: () => void;
        onSignupRequest: () => void;
        onRecoverRequest: () => void;
    }>;
    /**
     * The Signup dialog component, required, after all that's what all this navbar is for, check signup-dialog.tsx dialog for a default
     * if not given a signup dialog then no signup will be available
     */
    SignupDialog?: React.ComponentType<{
        open: boolean;
        onClose: () => void;
        onLoginRequest: () => void;
    }>;
    /**
     * The Recover dialog component, required, after all that's what all this navbar is for, check recover-dialog.tsx for a default
     */
    RecoverDialog: React.ComponentType<{
        open: boolean;
        onClose: () => void;
        onLoginRequest: () => void;
    }>;
    /**
     * the menu admin entries that appear on top by a divider,
     * it uses the MenuEntry form array for it, by default it includes only the CMS for ADMIN role
     * if you have removed the CMS then you need to remove this or this would cause an error
     */
    menuAdminEntries: IMenuEntry[];
    /**
     * the menu entries themselves, basic and available for all roles specified in the role list or not
     * fully modifiable, by default will contain the home, and news, more to come
     */
    menuEntries: IMenuEntry[];
    /**
     * Extra properties in context, username, app_country, email, e_validated
     */
    avatarContextProperties: string[];
    /**
     * Component for avatar
     */
    AvatarComponent: React.ComponentType<any>;
    /**
     * avatar props
     */
    avatarProps: any;
}
/**
 * The navbar fast prototyping component, contains more than just a navbar, it has extra
 * functionality into it, such as outdated information, a blocking backdrop, etc...
 * might be disabled by request
 *
 * @param props the navbar props
 * @returns a react component
 */
export declare const Navbar: React.ComponentType<Pick<INavbarProps, "excludeLanguagePicker" | "LoginDialog" | "SignupDialog" | "RecoverDialog" | "AvatarComponent" | "avatarProps" | "excludeBlockingBackdrop" | "menuAdminEntries" | "menuEntries" | "avatarContextProperties"> & import("@material-ui/styles").StyledComponentProps<"title" | "container" | "appBarSpacer" | "titleTypography" | "titleMargin">>;
export {};
