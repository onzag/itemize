/**
 * Contains a generic dialog component based on MUI that is meant to be extended
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../mui-core";
/**
 * The standard dialog styles
 */
declare const dialogStyles: Record<"title" | "content" | "paper" | "appbar" | "actions", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The dialog props that need to be passed in order to build a generic
 * dialog
 */
interface IDialogProps extends WithStyles<typeof dialogStyles> {
    /**
     * whether the dialog is currently open
     */
    open: boolean;
    /**
     * The title for the dialog
     */
    title: React.ReactNode;
    /**
     * A function that calls when the user wants to close the dialog
     */
    onClose: () => void;
    /**
     * The content of the dialog
     */
    children?: React.ReactNode;
    /**
     * whether it is full screen
     */
    fullScreen?: boolean;
    /**
     * The buttons that it contains in the bottom
     */
    buttons?: React.ReactNode;
    /**
     * The dialog class name
     */
    className?: string;
}
/**
 * The dialog itself, non-responsive and rather generic
 */
declare const Dialog: React.ComponentType<Pick<IDialogProps, "title" | "open" | "children" | "className" | "fullScreen" | "onClose" | "buttons"> & import("@material-ui/styles").StyledComponentProps<"title" | "content" | "paper" | "appbar" | "actions">>;
/**
 * This is a responsive version of the dialog
 * it's able to go in fullscreen mode automatically
 * takes all the other props
 */
declare const DialogResponsive: React.ComponentType<(Pick<Pick<IDialogProps, "title" | "open" | "children" | "className" | "fullScreen" | "onClose" | "buttons"> & import("@material-ui/styles").StyledComponentProps<"title" | "content" | "paper" | "appbar" | "actions">, "title" | "open" | "children" | "className" | "classes" | "innerRef" | "onClose" | "buttons"> & Partial<import("@material-ui/core").WithMobileDialog>) | (Pick<React.PropsWithChildren<Pick<IDialogProps, "title" | "open" | "children" | "className" | "fullScreen" | "onClose" | "buttons"> & import("@material-ui/styles").StyledComponentProps<"title" | "content" | "paper" | "appbar" | "actions">>, "title" | "open" | "children" | "className" | "classes" | "innerRef" | "onClose" | "buttons"> & Partial<import("@material-ui/core").WithMobileDialog>)>;
export { DialogResponsive, Dialog };
