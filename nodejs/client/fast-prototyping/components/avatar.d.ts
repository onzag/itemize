/**
 * The avatar allows to show an user avatar in a nice way using the mui avatar
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../mui-core";
import { IPropertyEntryFileRendererProps } from "../../internal/components/PropertyEntry/PropertyEntryFile";
/**
 * We build the styles with the create styles function
 */
declare const avatarStyles: Record<"fullWidth" | "flag" | "hoverAddBackdrop" | "avatar" | "avatarContainer" | "avatarUploadError" | "avatarContainerLarge" | "avatarBadge" | "avatarLarge" | "avatarMedium" | "randomColor0" | "randomColor1" | "randomColor2" | "randomColor3" | "randomColor4" | "randomColor5" | "randomColor6" | "randomColor7" | "randomColor8" | "randomColor9" | "specialUser" | "specialUserMedium" | "specialUserLarge", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * The function that allows to retrieve the profile url on wherever
 * the profile is located via a given id
 */
declare type profileURLFn = (id: number) => string;
/**
 * The properties for the avatar
 */
interface IAvatarProps extends WithStyles<typeof avatarStyles> {
    /**
     * hides the flag in the avatar, this makes it not to need app_country
     * in the context
     */
    hideFlag?: boolean;
    /**
     * size small, medium or large changes how it displays
     */
    size: "small" | "medium" | "large";
    /**
     * shows warnings as a badge in the profile image
     * if show warnings is true then it will need, email, e_validated and address
     * in the context
     */
    showWarnings?: boolean;
    /**
     * the profile url for the user, can be a string or a function; if not provided the avatar
     * will not have a redirection attached to it
     */
    profileURL?: string | profileURLFn;
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
     * Special user roles, makes the display a bit different, if not specified, any user that is not USER
     * will be a special user, otherwise only the ones in this list
     */
    specialUserRoles?: string[];
}
/**
 * The avatar will display a nice avatar profile image for the given user in the given context
 * it should be in an item definition provider for that specific user and contain the following properties
 *
 * - profile_picture
 * - role
 * - username
 * - app_country
 *
 * if hideFlag is true then app_country is not necessary
 *
 * if showWarnings is true then the following properties are also necessary
 *
 * - email
 * - e_validated
 * - address
 *
 * showWarnings is basically only useful for when displaying own currently logged user information in
 * the navbar or somewhere else where this is relevant
 *
 * @param props the avatar props
 * @returns a react component
 */
export declare const Avatar: React.ComponentType<Pick<IAvatarProps, "size" | "fullWidth" | "hideFlag" | "showWarnings" | "profileURL" | "cacheImage" | "linkClassName" | "specialUserRoles"> & import("@material-ui/styles").StyledComponentProps<"fullWidth" | "flag" | "hoverAddBackdrop" | "avatar" | "avatarContainer" | "avatarUploadError" | "avatarContainerLarge" | "avatarBadge" | "avatarLarge" | "avatarMedium" | "randomColor0" | "randomColor1" | "randomColor2" | "randomColor3" | "randomColor4" | "randomColor5" | "randomColor6" | "randomColor7" | "randomColor8" | "randomColor9" | "specialUser" | "specialUserMedium" | "specialUserLarge">>;
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
export declare const AvatarRenderer: React.ComponentType<Pick<IAvatarRendererProps, "label" | "placeholder" | "description" | "rtl" | "args" | "onChange" | "onRestore" | "autoFocus" | "icon" | "propertyId" | "currentAppliedValue" | "canRestore" | "currentValue" | "currentValid" | "currentInvalidReason" | "currentInternalValue" | "disabled" | "accept" | "isSupportedImage" | "imageSrcSet" | "prettySize" | "extension" | "openFile" | "rejected" | "rejectedReason" | "isExpectingImages" | "genericActivePlaceholder" | "genericDeleteLabel" | "genericSelectLabel" | "imageSizes" | "onSetFile" | "onRemoveFile"> & import("@material-ui/styles").StyledComponentProps<"fullWidth" | "flag" | "hoverAddBackdrop" | "avatar" | "avatarContainer" | "avatarUploadError" | "avatarContainerLarge" | "avatarBadge" | "avatarLarge" | "avatarMedium" | "randomColor0" | "randomColor1" | "randomColor2" | "randomColor3" | "randomColor4" | "randomColor5" | "randomColor6" | "randomColor7" | "randomColor8" | "randomColor9" | "specialUser" | "specialUserMedium" | "specialUserLarge">>;
export {};
