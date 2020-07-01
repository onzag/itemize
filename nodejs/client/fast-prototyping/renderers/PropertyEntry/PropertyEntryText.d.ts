import "../../../internal/theme/quill.scss";
import React from "react";
import { WithStyles } from "../../mui-core";
import { IPropertyEntryTextRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryText";
export declare const style: Record<"entry" | "label" | "description" | "icon" | "toolbar" | "container" | "errorMessage" | "iconButton" | "textButton" | "labelSingleLine" | "labelNoToolbar" | "quill" | "rawTextArea", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryTextRendererProps> | ((props: IPropertyEntryTextRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryTextRendererProps>)>;
interface IPropertyEntryTextRendererWithStylesProps extends IPropertyEntryTextRendererProps, WithStyles<typeof style> {
}
declare const PropertyEntryTextRenderer: React.ComponentType<Pick<IPropertyEntryTextRendererWithStylesProps, "label" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "isRichText" | "supportsVideos" | "supportsImages" | "supportsFiles" | "lastLoadedFileError" | "i18nFormat" | "i18nLoadVideo" | "mediaPropertyAcceptsFiles" | "mediaPropertyAcceptsImages" | "i18nGenericError" | "i18nOk" | "dismissLastLoadedFileError" | "onInsertFile" | "onInsertImage"> & import("@material-ui/styles").StyledComponentProps<"entry" | "label" | "description" | "icon" | "toolbar" | "container" | "errorMessage" | "iconButton" | "textButton" | "labelSingleLine" | "labelNoToolbar" | "quill" | "rawTextArea"> & IPropertyEntryTextRendererProps>;
export default PropertyEntryTextRenderer;
