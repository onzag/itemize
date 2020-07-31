/**
 * Contains the public user information section for the fast prototyping
 * public profile
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The public user profile contains basic information that can be accessed about the current public user
 * @param props the public user profile props
 * @returns a react element
 */
export declare const PublicUserProfile: React.ComponentType<Pick<{
    classes: Record<"username" | "role" | "country" | "container" | "paper" | "spacer" | "verifiedIcon" | "aboutMeCard", string>;
}, never> & import("@material-ui/styles").StyledComponentProps<"username" | "role" | "country" | "container" | "paper" | "spacer" | "verifiedIcon" | "aboutMeCard">>;
