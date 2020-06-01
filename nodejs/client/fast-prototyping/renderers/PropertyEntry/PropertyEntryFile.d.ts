/// <reference types="react" />
import { IPropertyEntryFileRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryFile";
import { IPropertyEntryThemeType } from "./styles";
export declare const style: (theme: IPropertyEntryThemeType) => Record<"entry" | "button" | "label" | "description" | "icon" | "container" | "errorMessage" | "fileDeleteButton" | "fileRejectedDescription" | "paper" | "paperPlaceholder" | "paperPlaceholderAccepting" | "paperPlaceholderRejecting" | "paperIconAdd" | "buttonContainer" | "buttonIcon", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryFileRendererProps> | ((props: IPropertyEntryFileRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryFileRendererProps>)>;
export default function PropertyEntryFileRenderer(props: IPropertyEntryFileRendererProps): JSX.Element;
