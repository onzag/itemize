import React from "react";
import { Theme, WithStyles } from "../../mui-core";
declare const outdatedDialogStyles: (theme: Theme) => Record<"dialogContent", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface OutdatedDialogProps extends WithStyles<typeof outdatedDialogStyles> {
    isOpenIfOutdated: boolean;
    onClose: () => void;
}
export declare const OutdatedDialog: React.ComponentType<Pick<OutdatedDialogProps, "onClose" | "isOpenIfOutdated"> & import("@material-ui/styles").StyledComponentProps<"dialogContent">>;
export {};
