import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import { IDataContextType, ILocaleContextType } from "../../internal/app";
export interface II18nReadErrorProps {
    error: EndpointErrorType;
    capitalize?: boolean;
    children?: (value: string) => React.ReactNode;
}
export declare function i18nReadErrorInternal(localeData: ILocaleContextType, data: IDataContextType, props: II18nReadErrorProps): any;
export default function I18nReadError(props: II18nReadErrorProps): JSX.Element;
