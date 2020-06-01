export interface IIncludeExclusionSwitchThemeType {
    containerWidth: string | number;
}
export declare const STANDARD_THEME: IIncludeExclusionSwitchThemeType;
export declare const style: (theme: IIncludeExclusionSwitchThemeType) => Record<"container" | "calloutExclusionWarning" | "calloutExclusionWarningIcon" | "switchContainer" | "switchFormControl" | "switchLabel" | "switchLabelSingleLine", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
