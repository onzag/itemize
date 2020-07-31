/**
 * An standard recover component for fast prototyping fully compatible
 * with the navbar
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../mui-core";
/**
 * The recover dialog styles
 */
declare const recoverDialogStyles: Record<"divider" | "resetPasswordButtonWrapper", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * Props for the recover dialog
 */
interface IRecoverDialogProps extends WithStyles<typeof recoverDialogStyles> {
    /**
     * Whether the dialog is currently open
     */
    open: boolean;
    /**
     * Triggere when the dialog closes
     */
    onClose: () => void;
    /**
     * Triggered if the user wants to login rather than recover password
     */
    onLoginRequest: () => void;
}
/**
 * A recover dialog fully compatible with the navbar that allows for quickly adding
 * a dialog for recovering the password, it contains its own item definition provider but depends to
 * be in the right module context
 *
 * @param props the props for recovery
 * @returns a react component
 */
export declare const RecoverDialog: React.ComponentType<Pick<IRecoverDialogProps, "open" | "onClose" | "onLoginRequest"> & import("@material-ui/styles").StyledComponentProps<"divider" | "resetPasswordButtonWrapper">>;
export {};
