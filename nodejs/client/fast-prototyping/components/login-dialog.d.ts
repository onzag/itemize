import React from "react";
import { WithStyles } from "@material-ui/core";
declare const loginDialogStyles: Record<"image" | "divider" | "welcomeTitle" | "loginButtonWrapper" | "titleContainer" | "forgotPasswordButton", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface ILoginDialogProps extends WithStyles<typeof loginDialogStyles> {
    open: boolean;
    onClose: () => void;
    onSignupRequest: () => void;
    onRecoverRequest: () => void;
}
export declare const LoginDialog: React.ComponentType<Pick<ILoginDialogProps, "open" | "onClose" | "onSignupRequest" | "onRecoverRequest"> & import("@material-ui/core").StyledComponentProps<"image" | "divider" | "welcomeTitle" | "loginButtonWrapper" | "titleContainer" | "forgotPasswordButton">>;
export {};
