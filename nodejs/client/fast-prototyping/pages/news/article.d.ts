/**
 * Provides a single article page
 *
 * @packageDocumentation
 */
/// <reference types="react" />
/**
 * The article page props
 */
interface ArticleProps {
    match: {
        params: {
            id: string;
        };
    };
}
/**
 * the article component itself that will provide for a given
 * article
 * @param props the props for the article
 * @returns a react element
 */
export declare function Article(props: ArticleProps): JSX.Element;
export {};
