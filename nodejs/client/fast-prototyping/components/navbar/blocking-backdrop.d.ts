import React from "react";
import { WithStyles, Theme } from "@material-ui/core";
declare const blockingBackdropStyles: (theme: Theme) => Record<"backdrop" | "backdropTextContainer", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface BlockingBackdropProps extends WithStyles<typeof blockingBackdropStyles> {
    exclude?: boolean;
}
export declare const BlockingBackdrop: React.ComponentType<Pick<BlockingBackdropProps, "exclude"> & import("@material-ui/core").StyledComponentProps<"backdrop" | "backdropTextContainer">>;
export {};
