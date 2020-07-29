/**
 * A dialog that pops up when the app is outdated and asks for a refresh
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../../mui-core";
/**
 * The dialog styles
 */
declare const outdatedDialogStyles: Record<"dialogContent", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The outdated dialog props
 */
interface OutdatedDialogProps extends WithStyles<typeof outdatedDialogStyles> {
    /**
     * is open if it's outdated, basically will mean that is open if both this prop
     * and is outdated match as true
     */
    isOpenIfOutdated: boolean;
    /**
     * what to do on close
     */
    onClose: () => void;
}
/**
 * The outdated dialog will pop up if the application is outdated and needs an update
 * @param props the outdated props, needs a flag to see if it will open when is outdated
 * @returns a react component
 */
export declare const OutdatedDialog: React.ComponentType<Pick<OutdatedDialogProps, "onClose" | "isOpenIfOutdated"> & import("@material-ui/styles").StyledComponentProps<"dialogContent">>;
export {};
