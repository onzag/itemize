/**
 * The cms page that contains subroutes into it for sections, for fast
 * prototyping, allows to create fragments as well as articles, meant only
 * for admins
 *
 * @packageDocumentation
 */
/// <reference types="react" />
/**
 * The cms element props
 */
interface CMSProps {
    /**
     * Do not use the fragment section
     */
    noFragment?: boolean;
    /**
     * Do not use the article section
     */
    noArticle?: boolean;
}
/**
 * A fast prototyping page which represents the cms for the cms module
 * that allows to modify and create cms elements
 *
 * @param props the props for the cms
 * @returns a react element
 */
export declare function CMS(props: CMSProps): JSX.Element;
/**
 * Allows to set the props of the cms to use within a route so that props
 * can be injected
 * @param props the props to inject
 * @returns a react component that is not instantiated
 */
export declare function cmsWithProps(props: CMSProps): () => void;
export {};
