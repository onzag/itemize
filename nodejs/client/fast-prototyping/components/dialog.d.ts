import React from "react";
import { WithStyles } from "@material-ui/core";
declare const dialogStyles: Record<"title" | "content" | "paper" | "appbar" | "actions", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface IDialogProps extends WithStyles<typeof dialogStyles> {
    open: boolean;
    title: string;
    onClose: () => void;
    children?: React.ReactNode;
    fullScreen?: boolean;
    buttons?: React.ReactNode;
    className?: string;
}
export declare const Dialog: React.ComponentType<Pick<IDialogProps, "title" | "children" | "open" | "fullScreen" | "onClose" | "className" | "buttons"> & import("@material-ui/core").StyledComponentProps<"title" | "content" | "paper" | "appbar" | "actions">>;
declare const DialogResponsive: React.ComponentType<(Pick<Pick<IDialogProps, "title" | "children" | "open" | "fullScreen" | "onClose" | "className" | "buttons"> & import("@material-ui/core").StyledComponentProps<"title" | "content" | "paper" | "appbar" | "actions">, "title" | "children" | "open" | "onClose" | "classes" | "className" | "innerRef" | "buttons"> & Partial<import("@material-ui/core").WithMobileDialog>) | (Pick<React.PropsWithChildren<Pick<IDialogProps, "title" | "children" | "open" | "fullScreen" | "onClose" | "className" | "buttons"> & import("@material-ui/core").StyledComponentProps<"title" | "content" | "paper" | "appbar" | "actions">>, "title" | "children" | "open" | "onClose" | "classes" | "className" | "innerRef" | "buttons"> & Partial<import("@material-ui/core").WithMobileDialog>)>;
export { DialogResponsive };
