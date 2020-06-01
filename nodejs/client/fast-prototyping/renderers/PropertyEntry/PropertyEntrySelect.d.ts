/// <reference types="react" />
import { IPropertyEntrySelectRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntrySelect";
import { IPropertyEntryThemeType } from "./styles";
export declare const style: (theme: IPropertyEntryThemeType) => Record<"entry" | "label" | "description" | "icon" | "container" | "errorMessage" | "fieldInput" | "selectFieldIconWhenAddornmentIsActive", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntrySelectRendererProps> | ((props: IPropertyEntrySelectRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntrySelectRendererProps>)>;
export default function PropertyEntrySelectRenderer(props: IPropertyEntrySelectRendererProps): JSX.Element;
