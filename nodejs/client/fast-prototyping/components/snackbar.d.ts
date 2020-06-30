import React from "react";
import { WithStyles, Theme } from "../mui-core";
import { EndpointErrorType } from "../../../base/errors";
declare const snackbarStyles: (theme: Theme) => Record<import("@material-ui/lab/Alert").Color, import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface ISnackbarProps extends WithStyles<typeof snackbarStyles> {
    i18nDisplay: EndpointErrorType | string;
    severity: "primary" | "secondary" | "success" | "error";
    open: boolean;
    onClose: () => void;
}
declare const _default: React.ComponentType<Pick<ISnackbarProps, "open" | "onClose" | "i18nDisplay" | "severity"> & import("@material-ui/styles").StyledComponentProps<import("@material-ui/lab/Alert").Color>>;
export default _default;
