/// <reference types="react" />
interface FrontpageProps {
    heroId?: number;
    noHero?: boolean;
    noArticles?: boolean;
    noSocial?: boolean;
}
export declare function Frontpage(props: FrontpageProps): JSX.Element;
export declare function frontpageWithProps(props: FrontpageProps): () => void;
export {};
