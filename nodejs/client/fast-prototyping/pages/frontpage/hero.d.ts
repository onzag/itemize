/**
 * Provides a hero for the fast prototying frontpage
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../../mui-core";
/**
 * The hero style
 */
declare const heroStyle: {
    heroContainer: {
        display: string;
        alignItems: string;
        justifyContent: string;
        flexDirection: "column";
        width: string;
        height: string;
        borderBottom: string;
    };
};
/**
 * The hero props
 */
interface HeroProps extends WithStyles<typeof heroStyle> {
    /**
     * The hero id, the hero is loaded from a fragment in the given user
     * language, as that's how fragment works, normally the hero id will be 1
     * but the hero is not created by default
     */
    heroID: number;
}
/**
 * The hero component uses the cms provider to load a fragment with a given
 * id, this represents trusted fragment content to it can be pure HTML
 *
 * @param props the hero props
 * @returns a react element
 */
export declare const Hero: React.ComponentType<Pick<HeroProps, "heroID"> & import("@material-ui/styles").StyledComponentProps<"heroContainer">>;
export {};
