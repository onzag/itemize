import React from "react";
import { WithStyles } from "../../mui-core";
import { II18nReadProps } from "../../../components/localization/I18nRead";
declare const menuStyles: Record<"list" | "listLink", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
export interface MenuEntry {
    path: string;
    icon: React.ReactNode;
    module?: string;
    idef?: string;
    i18nProps: II18nReadProps;
}
interface MenuPropsWithStyles extends WithStyles<typeof menuStyles> {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    adminEntries: MenuEntry[];
    entries: MenuEntry[];
}
export declare const Menu: React.ComponentType<Pick<MenuPropsWithStyles, "entries" | "onClose" | "onOpen" | "isOpen" | "adminEntries"> & import("@material-ui/styles").StyledComponentProps<"list" | "listLink">>;
export {};
