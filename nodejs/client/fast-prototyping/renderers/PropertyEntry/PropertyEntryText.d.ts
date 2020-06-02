/// <reference types="react" />
import "../../../internal/theme/quill.scss";
import { IPropertyEntryTextRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { IPropertyEntryThemeType } from "./styles";
export declare const style: (theme: IPropertyEntryThemeType) => Record<"entry" | "label" | "description" | "icon" | "toolbar" | "container" | "errorMessage" | "iconButton" | "textButton" | "labelSingleLine" | "quill" | "labelNoToolbar" | "rawTextArea", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryTextRendererProps> | ((props: IPropertyEntryTextRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryTextRendererProps>)>;
export default function PropertyEntryTextRenderer(props: IPropertyEntryTextRendererProps): JSX.Element;
