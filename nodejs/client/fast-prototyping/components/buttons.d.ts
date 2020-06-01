import React from "react";
import { PropTypes } from "@material-ui/core";
import { IActionSubmitOptions, IActionResponseWithId } from "../../providers/item-definition";
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
export declare function SearchButton(): void;
export declare function DeleteButton(): void;
export {};
