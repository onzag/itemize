/**
 * The avatar allows to show an user avatar in a nice way using the mui avatar
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../mui-core";
import { PropertyDefinitionSupportedFileType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import { IPropertyEntryFileRendererProps } from "../../internal/components/PropertyEntry/PropertyEntryFile";
/**
 * We build the styles with the create styles function
 */
declare const avatarStyles: Record<"fullWidth" | "flag" | "hoverAddBackdrop" | "avatar" | "avatarContainer" | "avatarUploadError" | "avatarContainerLarge" | "avatarBadge" | "avatarLarge" | "avatarMedium" | "randomColor0" | "randomColor1" | "randomColor2" | "randomColor3" | "randomColor4" | "randomColor5" | "randomColor6" | "randomColor7" | "randomColor8" | "randomColor9" | "specialUser" | "specialUserMedium" | "specialUserLarge", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The properties for the avatar
 */
interface IAvatarProps extends WithStyles<typeof avatarStyles> {
    /**
     * size small, medium or large changes how it displays
     */
    size: "small" | "medium" | "large";
    /**
     * the profile url for the user, can be a string or a function; if not provided the avatar
     * will not have a redirection attached to it
     */
    profileURL?: string;
    /**
     * Whether to cache the image that is displayed, normally uses the small image unless it's in large
     * mode, that will be cached
     */
    cacheImage?: boolean;
    /**
     * whether to make the width of the avatar 100%
     */
    fullWidth?: boolean;
    /**
     * an extra class name for the link component only truly useful
     * if profileURL is defined
     */
    linkClassName?: string;
    /**
     * The id of the user currently logged, it is used
     * for
     */
    id: number;
    /**
     * The username of this user
     */
    userNameValue: string;
    /**
     * Will give it a ring around the user to make it realize
     * that it a special kind of user
     */
    isSpecialUser?: boolean;
    /**
     * The profile picture file for this user, if given
     * will display a profile image
     */
    profilePictureValue?: PropertyDefinitionSupportedFileType;
    /**
     * If provided will display a flag with the profile image itself
     */
    countryCode?: string;
    /**
     * Adds warnings to the image
     */
    warningCount?: number;
}
/**
 * Will display an avatar for a given user, this fast prototyping
 * component makes no assumptions and as such you will have to implement
 * your own wrapper around it to make your own avatar type
 */
export declare const Avatar: React.ComponentType<Pick<IAvatarProps, "id" | "size" | "fullWidth" | "profileURL" | "cacheImage" | "linkClassName" | "userNameValue" | "isSpecialUser" | "profilePictureValue" | "countryCode" | "warningCount"> & import("@material-ui/styles").StyledComponentProps<"fullWidth" | "flag" | "hoverAddBackdrop" | "avatar" | "avatarContainer" | "avatarUploadError" | "avatarContainerLarge" | "avatarBadge" | "avatarLarge" | "avatarMedium" | "randomColor0" | "randomColor1" | "randomColor2" | "randomColor3" | "randomColor4" | "randomColor5" | "randomColor6" | "randomColor7" | "randomColor8" | "randomColor9" | "specialUser" | "specialUserMedium" | "specialUserLarge">>;
/**
 * The avatar renderer uses the same property entry file renderer props with the same
 * styles that the avatar itself uses
 */
interface IAvatarRendererProps extends IPropertyEntryFileRendererProps, WithStyles<typeof avatarStyles> {
}
/**
 * A fully custom renderer for the avatar component for usage with file types
 * so it can be passed as a custom renderer via the entry, eg...
 * <Entry id="profile_picture" renderer={AvatarRenderer}/> rather
 * than using the default
 */
export declare const AvatarRenderer: React.ComponentType<Pick<IAvatarRendererProps, "label" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "accept" | "isSupportedImage" | "imageSrcSet" | "prettySize" | "extension" | "openFile" | "rejectedReason" | "isExpectingImages" | "genericActivePlaceholder" | "genericDeleteLabel" | "genericSelectLabel" | "rejected" | "imageSizes" | "onSetFile" | "onRemoveFile"> & import("@material-ui/styles").StyledComponentProps<"fullWidth" | "flag" | "hoverAddBackdrop" | "avatar" | "avatarContainer" | "avatarUploadError" | "avatarContainerLarge" | "avatarBadge" | "avatarLarge" | "avatarMedium" | "randomColor0" | "randomColor1" | "randomColor2" | "randomColor3" | "randomColor4" | "randomColor5" | "randomColor6" | "randomColor7" | "randomColor8" | "randomColor9" | "specialUser" | "specialUserMedium" | "specialUserLarge">>;
export {};
