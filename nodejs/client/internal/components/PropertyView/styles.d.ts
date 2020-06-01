export interface IPropertyViewThemeType {
    containerWidth: string | number;
}
export declare const STANDARD_THEME: IPropertyViewThemeType;
export declare const style: (theme: IPropertyViewThemeType) => Record<"container", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
