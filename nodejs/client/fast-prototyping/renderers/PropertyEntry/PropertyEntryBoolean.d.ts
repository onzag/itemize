/// <reference types="react" />
import { IPropertyEntryBooleanRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryBoolean";
import { IPropertyEntryThemeType } from "./styles";
export declare const style: (theme: IPropertyEntryThemeType) => Record<"entry" | "label" | "description" | "icon" | "container" | "labelSingleLine", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
export default function PropertyEntryFieldRenderer(props: IPropertyEntryBooleanRendererProps): JSX.Element;
