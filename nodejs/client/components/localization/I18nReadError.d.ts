/**
 * Provides the functionality to display errors that are given
 * either by the backend, emulated or local errors; regardless
 * of context
 *
 * @packageDocumentation
 */
import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import { ILocaleContextType } from "../../internal/providers/locale-provider";
import Root from "../../../base/Root";
/**
 * the error props that the error displayer needs to take
 */
export interface II18nReadErrorProps {
    /**
     * The error on itself, most itemize errors are of this type
     * so they can be displayed by passing it here
     */
    error: EndpointErrorType;
    /**
     * Whether the error message should be capitalized
     */
    capitalize?: boolean;
    /**
     * the children that passes the value to the consumer
     */
    children?: (value: string) => React.ReactNode;
}
/**
 * For a pure component optimized class so that
 * there are no useless re-renders when the state changes
 */
interface I18nReadErrorInternalOptimizedProps extends II18nReadErrorProps {
    localeContext: ILocaleContextType;
    root: Root;
}
/**
 * The optimizer class just pipes to the internal
 */
export declare class I18nReadErrorInternalOptimized extends React.PureComponent<I18nReadErrorInternalOptimizedProps> {
    render(): any;
}
export default function I18nReadError(props: II18nReadErrorProps): JSX.Element;
export {};
