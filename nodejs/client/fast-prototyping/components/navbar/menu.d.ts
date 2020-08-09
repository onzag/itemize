/**
 * Constains the menu that is opened by the burguer icon in the navbar
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../../mui-core";
import { II18nReadProps } from "../../../components/localization/I18nRead";
/**
 * The menu styles
 */
declare const menuStyles: Record<"list" | "listLink", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The menu entry itself that specifies
 * how a menu is to be built
 */
export interface IMenuEntry {
    /**
     * The path it will take to, aka, the navigation
     * location
     */
    path: string;
    /**
     * The icon to use
     */
    icon: React.ReactNode;
    /**
     * The module to load in the module provider (optional)
     */
    module?: string;
    /**
     * The item definition to load in the item definition provider (optional)
     * will need the module specified if this one specified
     */
    idef?: string;
    /**
     * The arguments to pass to the i18nRead element in order to display some text
     */
    i18nProps: II18nReadProps;
    /**
     * The role that has access to this
     */
    role?: string;
    /**
     * Many roles, a list of roles, role (Single) has priority over this
     */
    roles?: string[];
}
/**
 * The menu properties with the styles attached
 */
interface MenuPropsWithStyles extends WithStyles<typeof menuStyles> {
    /**
     * Whether the menu is open
     */
    isOpen: boolean;
    /**
     * A callback for when it has opened
     */
    onOpen: () => void;
    /**
     * A callback for when it closes
     */
    onClose: () => void;
    /**
     * The admin entries that appear on top
     */
    adminEntries: IMenuEntry[];
    /**
     * The standard entries
     */
    entries: IMenuEntry[];
}
/**
 * Provides a menu for the navbar
 * @param props the menu props
 * @returns a react element
 */
export declare const Menu: React.ComponentType<Pick<MenuPropsWithStyles, "entries" | "onClose" | "onOpen" | "isOpen" | "adminEntries"> & import("@material-ui/styles").StyledComponentProps<"list" | "listLink">>;
export {};
