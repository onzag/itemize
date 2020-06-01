import React from "react";
interface IHTMLResourceLoaderProps {
    src: string;
    wrapper?: string;
    wrapperClassName?: string;
    loadingComponent?: React.ReactNode;
    failedComponent?: React.ReactNode;
}
interface IHTMLResourceLoaderState {
    htmlContent: string;
    loading: boolean;
    failed: boolean;
}
export default class HTMLResourceLoader extends React.PureComponent<IHTMLResourceLoaderProps, IHTMLResourceLoaderState> {
    constructor(props: IHTMLResourceLoaderProps);
    load(): Promise<void>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IHTMLResourceLoaderProps): void;
    render(): {};
}
export {};
