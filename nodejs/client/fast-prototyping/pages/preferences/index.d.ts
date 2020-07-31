/**
 * The preferences page allows to modify the current user preferences
 * regarding specific user information
 * @packageDocumentation
 */
import React from "react";
/**
 * The preferences page will allow the user to modify things such as notifications, newsletters and address
 * as well as other information that do not affect the user itself
 * @param props the preferences props
 * @returns a react element
 */
export declare const Preferences: React.ComponentType<Pick<{
    classes: Record<"container" | "paper" | "buttonBox", string>;
}, never> & import("@material-ui/styles").StyledComponentProps<"container" | "paper" | "buttonBox">>;
