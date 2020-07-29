/**
 * The blocking backdrop is the component that appears when the app is blocked from an update
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles, Theme } from "../../mui-core";
/**
 * the blocking backdrop styles
 * @param theme the mui theme
 * @retuns a bunch of styles
 */
declare const blockingBackdropStyles: (theme: Theme) => Record<"backdrop" | "backdropTextContainer", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The blocking backdrop appears when the app is blocked from an update check AppIsBlockedFromUpdate component
 * to see when this appears
 *
 * It is part of the navbar by default
 */
interface BlockingBackdropProps extends WithStyles<typeof blockingBackdropStyles> {
    /**
     * Whether it is excluded and won't render
     */
    exclude?: boolean;
}
/**
 * The blocking backdrop fast prototyping class which appears when the app is blocked
 * from an update check AppIsBlockedFromUpdate component to see when this appears
 *
 * it is part of the navbar by default
 * @param props the props for the blocking backdrop
 * @returns a react component
 */
export declare const BlockingBackdrop: React.ComponentType<Pick<BlockingBackdropProps, "exclude"> & import("@material-ui/styles").StyledComponentProps<"backdrop" | "backdropTextContainer">>;
export {};
