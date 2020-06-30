import React from "react";
import { IActionSubmitOptions, IActionResponseWithId, IActionSearchOptions } from "../../providers/item-definition";
import { PropTypes } from "../mui-core";
declare type RedirectCallbackFn = (status: IActionResponseWithId) => string;
interface ISubmitButtonProps {
    options: IActionSubmitOptions;
    i18nId: string;
    wrapperClassName?: string;
    buttonClassName?: string;
    buttonVariant?: "text" | "outlined" | "contained";
    buttonColor?: PropTypes.Color;
    buttonEndIcon?: React.ReactNode;
    buttonStartIcon?: React.ReactNode;
    CustomConfirmationComponent?: React.ComponentType<{
        isActive: boolean;
        onClose: (continueWithProcess: boolean) => void;
    }>;
    redirectOnSuccess?: string | RedirectCallbackFn;
    redirectGoBack?: boolean;
    redirectReplace?: boolean;
    onSubmit?: (status: IActionResponseWithId) => void;
}
export declare function SubmitButton(props: ISubmitButtonProps): JSX.Element;
interface ISearchButtonProps {
    options: IActionSearchOptions;
    i18nId: string;
    wrapperClassName?: string;
    buttonClassName?: string;
    buttonVariant?: "text" | "outlined" | "contained";
    buttonColor?: PropTypes.Color;
    buttonEndIcon?: React.ReactNode;
    buttonStartIcon?: React.ReactNode;
}
export declare function SearchButton(props: ISearchButtonProps): JSX.Element;
export declare function DeleteButton(): void;
export {};
