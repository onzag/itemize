/**
 * Contains the snackbar component to display success and error messages
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles, Theme } from "../mui-core";
import { EndpointErrorType } from "../../../base/errors";
/**
 * the snackbar styles
 * @param theme the mui theme
 */
declare const snackbarStyles: (theme: Theme) => Record<import("@material-ui/lab/Alert").Color, import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The snackbar props that it needs to take
 */
interface ISnackbarProps extends WithStyles<typeof snackbarStyles> {
    /**
     * An unique id to describe this snackbar
     */
    id: string;
    /**
     * What to display, it can be an error, which can be taken from actioners
     * or a string to do a simple read
     */
    i18nDisplay: EndpointErrorType | string;
    /**
     * The severity of the snackbar, which affects the color
     */
    severity: "primary" | "secondary" | "success" | "error";
    /**
     * Whether it is currently visible, very often actioners will have
     * a property that fits in here nicely, such as "success", "statefulSuccess" or
     * "error", etc...
     */
    open: boolean;
    /**
     * Triggers when the snackbar closes, very often actioners will have a property that
     * fits here, such as "dismissSuccess", "dismissError", etc...
     */
    onClose: () => void;
}
declare const _default: React.ComponentType<Pick<ISnackbarProps, "id" | "open" | "onClose" | "i18nDisplay" | "severity"> & import("@material-ui/styles").StyledComponentProps<import("@material-ui/lab/Alert").Color>>;
export default _default;
