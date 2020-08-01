/**
 * The behemoth that the entry fast prototyping is for the text type since text
 * types can be fairly complex, this renderer uses quill, quill also doesn't support SSR
 * so it must be double passed
 *
 * This renderer is used for text/plain and text/html, aka rich text, but not with
 * any other non-subtype text, it will use the field instead
 *
 * @packageDocumentation
 */
import "../../../internal/theme/quill.scss";
import React from "react";
import { WithStyles } from "../../mui-core";
import { IPropertyEntryTextRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryText";
/**
 * The styles for the text entry
 */
export declare const style: Record<"entry" | "label" | "description" | "icon" | "toolbar" | "container" | "errorMessage" | "iconButton" | "textButton" | "labelSingleLine" | "labelNoToolbar" | "quill" | "rawTextArea", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryTextRendererProps> | ((props: IPropertyEntryTextRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryTextRendererProps>)>;
/**
 * The text renderer styles
 */
interface IPropertyEntryTextRendererWithStylesProps extends IPropertyEntryTextRendererProps, WithStyles<typeof style> {
}
/**
 * The property entry text renderer, note that this renderer isn't used only for rich text
 * but rather for any text type that is either plain or html, a text without a subtype
 * will use the same as field
 */
declare const PropertyEntryTextRenderer: React.ComponentType<Pick<IPropertyEntryTextRendererWithStylesProps, "label" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "isRichText" | "supportsVideos" | "supportsImages" | "supportsFiles" | "lastLoadedFileError" | "i18nFormat" | "i18nLoadVideo" | "mediaPropertyAcceptsFiles" | "mediaPropertyAcceptsImages" | "i18nGenericError" | "i18nOk" | "dismissLastLoadedFileError" | "onInsertFile" | "onInsertImage"> & import("@material-ui/styles").StyledComponentProps<"entry" | "label" | "description" | "icon" | "toolbar" | "container" | "errorMessage" | "iconButton" | "textButton" | "labelSingleLine" | "labelNoToolbar" | "quill" | "rawTextArea"> & IPropertyEntryTextRendererProps>;
export default PropertyEntryTextRenderer;
