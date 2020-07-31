/**
 * The reset password page
 * @packageDocumentation
 */
import React from "react";
/**
 * A compliant fast prototyping reset password component, extract
 * both the token and the id from the location state by using the location state reader
 * from the query string and uses such info in the user actioner
 * @param props the reset password props
 * @returns a react element
 */
export declare const ResetPassword: React.ComponentType<Pick<{
    classes: Record<"username" | "container" | "paper" | "divider" | "recoverTitle", string>;
}, never> & import("@material-ui/styles").StyledComponentProps<"username" | "container" | "paper" | "divider" | "recoverTitle">>;
