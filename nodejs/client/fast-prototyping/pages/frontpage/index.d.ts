/**
 * Provides a fast prototyping frontpage
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The frontpage props
 */
interface FrontpageProps {
    /**
     * The hero id, by default 1, represents the fragment id that is supposed
     * to be loaded
     */
    heroId?: number;
    /**
     * Whether to actually remove the hero section
     */
    noHero?: boolean;
    /**
     * whether to remove the articles section
     */
    noArticles?: boolean;
    /**
     * Whether to remove the social section
     */
    noSocial?: boolean;
    /**
     * some children to add extra, after the hero
     */
    children?: React.ReactElement;
    /**
     * some children to add extra, at the end
     */
    childrenEnd?: React.ReactElement;
}
/**
 * Provides the frontpage which has a hero, articles and
 * a social context
 * @param props the frontpage props
 * @returns a react element
 */
export declare function Frontpage(props: FrontpageProps): JSX.Element;
/**
 * Allows to inject props to the frontpage
 * @param props the props to inject
 * @returns a non instantiated react component
 */
export declare function frontpageWithProps(props: FrontpageProps): () => void;
export {};
