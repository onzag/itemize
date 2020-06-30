import React from "react";
import { WithStyles } from "../mui-core";
declare const signupDialogStyles: Record<"divider" | "welcomeTitle" | "titleContainer" | "forgotPasswordButton" | "signupComplyCaption" | "signupButtonWrapper", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface ISignupDialogProps extends WithStyles<typeof signupDialogStyles> {
    open: boolean;
    onClose: () => void;
    onLoginRequest: () => void;
}
export declare const SignupDialog: React.ComponentType<Pick<ISignupDialogProps, "open" | "onClose" | "onLoginRequest"> & import("@material-ui/styles").StyledComponentProps<"divider" | "welcomeTitle" | "titleContainer" | "forgotPasswordButton" | "signupComplyCaption" | "signupButtonWrapper">>;
export {};
