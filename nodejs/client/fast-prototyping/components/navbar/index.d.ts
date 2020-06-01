import React from "react";
import { WithStyles, Theme } from "@material-ui/core";
declare const navbarStyles: (theme: Theme) => Record<"title" | "container" | "appBarSpacer" | "titleTypography", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface INavbarProps extends WithStyles<typeof navbarStyles> {
    excludeLanguagePicker?: boolean;
    excludeBlockingBackdrop?: boolean;
    LoginDialog: React.ComponentType<{
        open: boolean;
        onClose: () => void;
        onSignupRequest: () => void;
        onRecoverRequest: () => void;
    }>;
    SignupDialog: React.ComponentType<{
        open: boolean;
        onClose: () => void;
        onLoginRequest: () => void;
    }>;
    RecoverDialog: React.ComponentType<{
        open: boolean;
        onClose: () => void;
        onLoginRequest: () => void;
    }>;
}
export declare const Navbar: React.ComponentType<Pick<INavbarProps, "excludeLanguagePicker" | "LoginDialog" | "SignupDialog" | "RecoverDialog" | "excludeBlockingBackdrop"> & import("@material-ui/core").StyledComponentProps<"title" | "container" | "appBarSpacer" | "titleTypography">>;
export {};
