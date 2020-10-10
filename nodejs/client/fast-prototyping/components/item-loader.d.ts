/**
 * Utilities for loading item definitions
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../mui-core";
/**
 * The item definition loader styles
 */
declare const itemDefinitionLoaderStyles: Record<"container" | "flexingContainer" | "circularProgress" | "fullWidthContainer", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * the props for the item definition loader
 */
interface ItemLoaderProps extends WithStyles<typeof itemDefinitionLoaderStyles> {
    /**
     * An id to pass to the i18n reader for not found
     * defaults to "error.NOT_FOUND"
     */
    notFoundMessageI18nId?: string;
    /**
     * An id to pass to the i18n reader for when the item
     * is blocked
     * defaults to "error.BLOCKED"
     */
    blockedMessageI18nId?: string;
    /**
     * an image to display when the item is not found
     */
    notFoundImage?: string;
    /**
     * an image to display when the item is blocked
     */
    blockedImage?: string;
    /**
     * an image to display on error (note that the error)
     * is variable, so there's no errorI18nId, the error itself
     * comes with that
     */
    errorImage?: string;
    /**
     * A number of milliseconds to wait to show the loading animation
     * we don't want flickering, by default 700ms
     */
    msWaitedToShowLoadingAnimation?: number;
    /**
     * The children inside, this data will not be shown if an error
     * not found, or blocked; but it will if loading, so basically a wireframe
     * is there
     */
    children: React.ReactNode;
    /**
     * Whether to use 100% width
     */
    fullWidth?: boolean;
}
/**
 * The item definition loader allows to handle cases of not found, blocked or errors in a nice way
 * @param props the loader props
 * @returns a react component
 */
export declare const ItemLoader: React.ComponentType<Pick<ItemLoaderProps, "children" | "fullWidth" | "notFoundMessageI18nId" | "blockedMessageI18nId" | "notFoundImage" | "blockedImage" | "errorImage" | "msWaitedToShowLoadingAnimation"> & import("@material-ui/styles").StyledComponentProps<"container" | "flexingContainer" | "circularProgress" | "fullWidthContainer">>;
export {};
