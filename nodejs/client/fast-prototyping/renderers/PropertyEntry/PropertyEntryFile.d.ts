/**
 * Contains the fast prototyping element for renering a file entry
 * @packageDocumentation
 */
import { IPropertyEntryFileRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryFile";
import { WithStyles } from "../../mui-core";
import React from "react";
/**
 * the styles for the file entry
 */
export declare const style: Record<"entry" | "button" | "label" | "description" | "icon" | "container" | "errorMessage" | "paper" | "fileDeleteButton" | "fileRejectedDescription" | "paperPlaceholder" | "paperPlaceholderAccepting" | "paperPlaceholderRejecting" | "paperIconAdd" | "buttonContainer" | "buttonIcon", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<IPropertyEntryFileRendererProps> | ((props: IPropertyEntryFileRendererProps) => import("@material-ui/styles").CreateCSSProperties<IPropertyEntryFileRendererProps>)>;
/**
 * The props for the file renderer, with styles
 */
interface IPropertyEntryFileRendererWithStylesProps extends IPropertyEntryFileRendererProps, WithStyles<typeof style> {
}
/**
 * The property entry file renderer, allows to set and upload a single file in its
 * form, support both images and standard files
 * @param props the entry props
 * @returns a react element
 */
declare const PropertyEntryFileRenderer: React.ComponentType<Pick<IPropertyEntryFileRendererWithStylesProps, "label" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "accept" | "isSupportedImage" | "imageSrcSet" | "prettySize" | "extension" | "openFile" | "rejectedReason" | "isExpectingImages" | "genericActivePlaceholder" | "genericDeleteLabel" | "genericSelectLabel" | "rejected" | "imageSizes" | "onSetFile" | "onRemoveFile"> & import("@material-ui/styles").StyledComponentProps<"entry" | "button" | "label" | "description" | "icon" | "container" | "errorMessage" | "paper" | "fileDeleteButton" | "fileRejectedDescription" | "paperPlaceholder" | "paperPlaceholderAccepting" | "paperPlaceholderRejecting" | "paperIconAdd" | "buttonContainer" | "buttonIcon"> & IPropertyEntryFileRendererProps>;
export default PropertyEntryFileRenderer;
