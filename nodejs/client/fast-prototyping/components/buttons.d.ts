/**
 * Contains the submit, search and delete button for fast prototyping
 * usage
 *
 * @packageDocumentation
 */
import React from "react";
import { IActionSubmitOptions, IActionResponseWithId, IActionSearchOptions, IActionDeleteOptions, IBasicActionResponse } from "../../providers/item";
import { PropTypes } from "../mui-core";
/**
 * A redirect function called on the success event
 */
declare type RedirectCallbackFn = (status: IActionResponseWithId) => string;
/**
 * The generic options for every button
 */
interface IGenericButtonProps {
    /**
     * An id for the i18n read element
     */
    i18nId: string;
    /**
     * A wrapper class name, the button is wrapped by the progressing
     * element, you might want to change its class name
     */
    wrapperClassName?: string;
    /**
     * The button class name itself
     */
    buttonClassName?: string;
    /**
     * The button variant for MUI
     */
    buttonVariant?: "text" | "outlined" | "contained";
    /**
     * The button color
     */
    buttonColor?: PropTypes.Color;
    /**
     * An icon for the button
     */
    buttonEndIcon?: React.ReactNode;
    /**
     * Another icon for the button but at the end
     */
    buttonStartIcon?: React.ReactNode;
    /**
     * Make button disabled
     */
    buttonDisabled?: boolean;
}
/**
 * The submit button props
 */
interface ISubmitButtonProps extends IGenericButtonProps {
    /**
     * The submit options to trigger in the actioner
     */
    options: IActionSubmitOptions;
    /**
     * If specified, instead of immediately submitting will ask
     * for confirmation of this action via this component, the component
     * must take an isActive prop and onClose props, when it closes it would give true or false
     * to specifies if it will submit or cancel, true = submit, false = cancel
     */
    CustomConfirmationComponent?: React.ComponentType<{
        isActive: boolean;
        onClose: (continueWithProcess: boolean) => void;
    }>;
    /**
     * Redirect to an url if succeeded
     */
    redirectOnSuccess?: string | RedirectCallbackFn;
    /**
     * Go back if succeed
     */
    redirectGoBack?: boolean;
    /**
     * Replace during redirection, doesn't work with goback
     */
    redirectReplace?: boolean;
    /**
     * A function that triggers when it has submitted and gives the state of the
     * submit action
     */
    onSubmit?: (status: IActionResponseWithId) => Promise<void>;
}
/**
 * Provides a very useful submit button that extends via the submit
 * actioner and it's fully functional; needs to be in an item
 * definition context
 *
 * If you need to access the error please use the snackbar.tsx component
 * in addition of another submit actioner to fetch the error itself
 *
 * @param props the submit button props
 * @returns a react component
 */
export declare function SubmitButton(props: ISubmitButtonProps): JSX.Element;
/**
 * The search button props
 */
interface ISearchButtonProps extends IGenericButtonProps {
    /**
     * The search options to trigger in the search actioner
     */
    options: IActionSearchOptions;
}
/**
 * Allows to create a fast prototyping button that will trigger a search
 * once clicked, uses the search actioner and must be in an item definition context
 * in search mode
 *
 * If you need to access the error please use the snackbar.tsx component
 * in addition of another search actioner to fetch the error itself
 *
 * @param props the search button props
 * @returns a react component
 */
export declare function SearchButton(props: ISearchButtonProps): JSX.Element;
/**
 * A redirect function called on the success event
 */
declare type RedirectCallbackDeleteFn = (status: IBasicActionResponse) => string;
/**
 * The delete button props
 */
interface IDeleteButtonProps extends IGenericButtonProps {
    /**
     * The search options to trigger in the search actioner
     */
    options: IActionDeleteOptions;
    /**
     * If specified, instead of immediately deleting will ask
     * for confirmation of this action via this component, the component
     * must take an isActive prop and onClose props, when it closes it would give true or false
     * to specifies if it will delete or cancel, true = delete, false = cancel
     */
    CustomConfirmationComponent?: React.ComponentType<{
        isActive: boolean;
        onClose: (continueWithProcess: boolean) => void;
    }>;
    /**
     * Redirect to an url if succeeded
     */
    redirectOnSuccess?: string | RedirectCallbackDeleteFn;
    /**
     * Go back if succeed
     */
    redirectGoBack?: boolean;
    /**
     * Replace during redirection, doesn't work with goback
     */
    redirectReplace?: boolean;
    /**
     * A function that triggers when it has submitted and gives the state of the
     * submit action
     */
    onDelete?: (status: IBasicActionResponse) => Promise<void>;
}
export declare function DeleteButton(props: IDeleteButtonProps): JSX.Element;
export {};
