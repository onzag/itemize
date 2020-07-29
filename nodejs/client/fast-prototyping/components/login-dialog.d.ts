/**
 * An standard login dialog component for fast prototyping fully compatible
 * with the navbar
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../mui-core";
/**
 * The login dialog styles
 */
declare const loginDialogStyles: Record<"image" | "divider" | "welcomeTitle" | "loginButtonWrapper" | "titleContainer" | "forgotPasswordButton", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The login dialog props
 */
interface ILoginDialogProps extends WithStyles<typeof loginDialogStyles> {
    /**
     * whether it is currently opened
     */
    open: boolean;
    /**
     * triggers on close
     */
    onClose: () => void;
    /**
     * When the user requests to signup
     */
    onSignupRequest: () => void;
    /**
     * When the user requests for password recovery
     */
    onRecoverRequest: () => void;
}
/**
 * A fully compatible with the navbar fast prototyping login dialog for the user
 * to fill in, contains its own item definition provider, but it must be into
 * a module provider context
 * @param props the login props
 * @returns a react component
 */
export declare const LoginDialog: React.ComponentType<Pick<ILoginDialogProps, "open" | "onClose" | "onSignupRequest" | "onRecoverRequest"> & import("@material-ui/styles").StyledComponentProps<"image" | "divider" | "welcomeTitle" | "loginButtonWrapper" | "titleContainer" | "forgotPasswordButton">>;
export {};
