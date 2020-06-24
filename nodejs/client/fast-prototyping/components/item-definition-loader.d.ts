import React from "react";
import { WithStyles, Theme } from "@material-ui/core";
declare const itemDefinitionLoaderStyles: (theme: Theme) => Record<"container" | "flexingContainer" | "circularProgress" | "fullWidthContainer", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface ItemDefinitionLoaderProps extends WithStyles<typeof itemDefinitionLoaderStyles> {
    notFoundMessageKey?: string;
    blockedMessageKey?: string;
    notFoundImage?: string;
    blockedImage?: string;
    errorImage?: string;
    msWaitedToShowLoadingAnimation?: number;
    children: React.ReactNode;
    fullWidth?: boolean;
}
export declare const ItemDefinitionLoader: React.ComponentType<Pick<ItemDefinitionLoaderProps, "children" | "fullWidth" | "notFoundMessageKey" | "blockedMessageKey" | "notFoundImage" | "blockedImage" | "errorImage" | "msWaitedToShowLoadingAnimation"> & import("@material-ui/core").StyledComponentProps<"container" | "flexingContainer" | "circularProgress" | "fullWidthContainer">>;
export {};