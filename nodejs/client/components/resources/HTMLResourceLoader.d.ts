import React from "react";
interface IHTMLResourceLoaderProps {
    src: string;
    wrapper?: string;
    wrapperClassName?: string;
    loadingComponent?: React.ReactNode;
    failedComponent?: React.ReactNode;
}
export default function HTMLResourceLoader(props: IHTMLResourceLoaderProps): JSX.Element;
export {};
