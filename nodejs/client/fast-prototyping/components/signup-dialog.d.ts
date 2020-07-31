/**
 * An standard signup dialog component for fast prototyping fully compatible
 * with the navbar
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../mui-core";
/**
 * The signup dialog styles
 */
declare const signupDialogStyles: Record<"divider" | "welcomeTitle" | "titleContainer" | "forgotPasswordButton" | "signupComplyCaption" | "signupButtonWrapper", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The props for the signup dialog that it needs to take
 */
interface ISignupDialogProps extends WithStyles<typeof signupDialogStyles> {
    /**
     * Whether the dialog is currently open
     */
    open: boolean;
    /**
     * Triggers when the dialog is closed
     */
    onClose: () => void;
    /**
     * when the user requests to login rather than signup
     */
    onLoginRequest: () => void;
}
/**
 * A fully compatible with the navbar fast prototyping signup dialog for the user
 * to fill in, contains its own item definition provider, but it must be into
 * a module provider context
 * @param props the login props
 * @returns a react component
 */
export declare const SignupDialog: React.ComponentType<Pick<ISignupDialogProps, "open" | "onClose" | "onLoginRequest"> & import("@material-ui/styles").StyledComponentProps<"divider" | "welcomeTitle" | "titleContainer" | "forgotPasswordButton" | "signupComplyCaption" | "signupButtonWrapper">>;
export {};
