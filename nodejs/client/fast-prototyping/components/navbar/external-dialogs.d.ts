/**
 * Contains an external dialog that are usually referred errors and messages
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The external dialogs component, given a
 * err, msg, and msgTitle in the query string, all as string will
 * display a dialog as long as they are there
 * @returns a react element
 */
export declare const ExternalDialogs: React.ComponentType<Pick<{
    classes: Record<"needsUpdateContent", string>;
}, never> & import("@material-ui/styles").StyledComponentProps<"needsUpdateContent">>;
