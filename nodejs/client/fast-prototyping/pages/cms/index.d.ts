/// <reference types="react" />
interface CMSProps {
    noFragment?: boolean;
    noArticle?: boolean;
}
export declare function CMS(props: CMSProps): JSX.Element;
export declare function cmsWithProps(props: CMSProps): () => void;
export {};
