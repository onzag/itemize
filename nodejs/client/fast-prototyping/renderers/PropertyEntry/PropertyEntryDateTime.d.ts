/// <reference types="react" />
import { IPropertyEntryThemeType } from "./styles";
import { IPropertyEntryDateTimeRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryDateTime";
export declare const style: (theme: IPropertyEntryThemeType) => Record<"entry" | "label" | "description" | "container" | "errorMessage" | "iconButton" | "fieldInput", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryDateTimeRendererProps> | ((props: IPropertyEntryDateTimeRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryDateTimeRendererProps>)>;
export default function PropertyEntryDateTimeRenderer(props: IPropertyEntryDateTimeRendererProps): JSX.Element;
