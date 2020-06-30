import React from "react";
import { Theme, WithStyles } from "../../mui-core";
declare const buttonsStyles: (theme: Theme) => Record<"languageButton" | "loginButton" | "standardLanguageButtonLabel" | "shrunkLanguageButtonLabel", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface ButtonsProps extends WithStyles<typeof buttonsStyles> {
    excludeLanguagePicker: boolean;
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
export declare const Buttons: React.ComponentType<Pick<ButtonsProps, "excludeLanguagePicker" | "LoginDialog" | "SignupDialog" | "RecoverDialog"> & import("@material-ui/styles").StyledComponentProps<"languageButton" | "loginButton" | "standardLanguageButtonLabel" | "shrunkLanguageButtonLabel">>;
export {};
