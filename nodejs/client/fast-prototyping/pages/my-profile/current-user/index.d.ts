/**
 * Contains the section iformation for the current user in the fast prototyping profile
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The current user profile contains the standard information for the current user and
 * allows to modify such, also allows to logout
 * @param props the current user profile props
 * @returns a react element
 */
export declare const CurrentUserProfile: React.ComponentType<Pick<{
    classes: Record<"container" | "logoutButtons", string>;
}, never> & import("@material-ui/styles").StyledComponentProps<"container" | "logoutButtons">>;
