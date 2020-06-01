import React from "react";
import { WithStyles, Theme } from "@material-ui/core";
import { EndpointErrorType } from "../../../base/errors";
import { Color } from '@material-ui/lab/Alert';
declare const snackbarStyles: (theme: Theme) => Record<Color, import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface ISnackbarProps extends WithStyles<typeof snackbarStyles> {
    i18nDisplay: EndpointErrorType | string;
    severity: Color;
    open: boolean;
    onClose: () => void;
}
declare const _default: React.ComponentType<Pick<ISnackbarProps, "open" | "onClose" | "i18nDisplay" | "severity"> & import("@material-ui/core").StyledComponentProps<Color>>;
export default _default;
