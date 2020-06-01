import React from "react";
import { WithStyles } from "@material-ui/core";
declare const recoverDialogStyles: Record<"divider" | "resetPasswordButtonWrapper", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface IRecoverDialogProps extends WithStyles<typeof recoverDialogStyles> {
    open: boolean;
    onClose: () => void;
    onLoginRequest: () => void;
}
export declare const RecoverDialog: React.ComponentType<Pick<IRecoverDialogProps, "open" | "onClose" | "onLoginRequest"> & import("@material-ui/core").StyledComponentProps<"divider" | "resetPasswordButtonWrapper">>;
export {};
