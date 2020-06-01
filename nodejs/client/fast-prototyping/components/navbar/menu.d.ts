import React from "react";
import { WithStyles } from "@material-ui/core";
interface MenuProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
declare const menuStyles: Record<"list" | "listLink", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface MenuPropsWithStyles extends WithStyles<typeof menuStyles>, MenuProps {
}
export declare const Menu: React.ComponentType<Pick<MenuPropsWithStyles, "onClose" | "isOpen" | "onOpen"> & import("@material-ui/core").StyledComponentProps<"list" | "listLink">>;
export {};
