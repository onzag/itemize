/// <reference types="react" />
interface ArticleProps {
    match: {
        params: {
            id: string;
        };
    };
}
export declare function Article(props: ArticleProps): JSX.Element;
export {};
