/**
 * A fast prototyping component for the contact information
 *
 * @packageDocumentation
 */
/// <reference types="react" />
/**
 * The contact props
 */
interface ContactProps {
    /**
     * The identifier for the title
     * by default contact
     */
    titleI18nId?: string;
    /**
     * The identifier for the url where the resource is located
     * by default the contact_url
     */
    urlI18nId?: string;
}
/**
 * The contact fast prototyping page
 * @param props the props for the contact
 * @returns a react element
 */
export declare function Contact(props: ContactProps): JSX.Element;
/**
 * allows to inject props to the contact
 * @param props the props to inject
 * @returns an unitialized react component
 */
export declare function contactWithProps(props: ContactProps): () => void;
export {};
