/**
 * A page section for fast prototyping that allows to create and edit fragments
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The fragment section itself that allows modifying and creating new fragments
 * @param props the fragment styles
 * @returns a react element
 */
export declare const Fragment: React.ComponentType<Pick<{
    classes: Record<"container" | "paper" | "paper2" | "box", string>;
}, never> & import("@material-ui/styles").StyledComponentProps<"container" | "paper" | "paper2" | "box">>;
