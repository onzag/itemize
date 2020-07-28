/**
 * A navigation prompt that prompts if a condition evaluates to true
 *
 * @packageDocumentation
 */
import { EndpointErrorType } from "../../../base/errors";
import React from "react";
import { Location } from "history";
/**
 * The prompt dialog component is used when possible by
 * react router, and since this prompt is just logical
 * it needs to consume such component
 */
export declare type PromptDialogComponent = React.ComponentType<{
    /**
     * Whether the dialog should be open
     */
    open: boolean;
    /**
     * Whether it's currently confirming
     */
    confirming: boolean;
    /**
     * whether the confirmation callback threw an error
     */
    confirmationCallbackError: EndpointErrorType;
    /**
     * clean the error
     */
    confirmationCallbackErrorClean: () => void;
    /**
     * cancel everything, both the submitting and the change
     */
    onCancel: () => void;
    /**
     * confirm the submitting and proceed
     */
    onConfirm: () => void;
    /**
     * Discard the submitting and proceed to wherever you were going
     */
    onDiscard: () => void;
    /**
     * Extra args
     */
    args?: any;
}>;
/**
 * The prompt itself needs a lot of information to work with itself
 */
interface PromptProps {
    /**
     * when this is true the prompt triggers
     */
    when: boolean;
    /**
     * The message to use for before unload
     * not supported in most browsers
     */
    beforeUnloadMessage: string;
    /**
     * the confirmation callback, optional, must return
     * an error or a promise for an error if it fails
     * (or null)
     */
    confirmationCallback?: () => Promise<EndpointErrorType> | EndpointErrorType;
    /**
     * to clean the error
     */
    confirmationCallbackCleanError?: () => void;
    /**
     * The same error that was returned via the confirmation
     * callback if provided, must be seen here
     */
    confirmationCallbackError?: EndpointErrorType;
    /**
     * Whether it is currently confirming, feel free to set it when
     * the confirmation callback is triggered
     */
    confirmationCallbackConfirming?: boolean;
    /**
     * dialog extra args
     */
    dialogArgs?: any;
    /**
     * The dialog itself
     */
    Dialog: PromptDialogComponent;
}
/**
 * Now this is the state of the prompt
 */
interface PromptState {
    /**
     * whether the dialog is opened
     */
    dialogOpened: boolean;
    /**
     * And the location it opened for
     */
    dialogOpenedFor: Location;
}
export default class Prompt extends React.PureComponent<PromptProps, PromptState> {
    /**
     * The original location the prompt was mounted for
     */
    private originalLocation;
    constructor(props: PromptProps);
    /**
     * Triggers from the react router as the message prop
     * but returns a boolean, returning false prevents the navigation
     * @param location the location
     * @returns a boolean
     */
    handleRouterPromptNavigationStep(location: Location): boolean;
    /**
     * Triggers when the dialog is open and it is cancelled, which means that we should
     * just stay where we are and avoid to go where we were going
     */
    cancelDialog(): void;
    /**
     * Discard the dialog, aka ignore it, and proceed to where we were going
     */
    discardDialog(): void;
    /**
     * Confirm the dialog, aka confirm the changes and proceed
     */
    confirmDialog(): Promise<void>;
    /**
     * triggers on an actual before unload event
     * as the user tries to close the window without
     * saving changes
     * @param e the before unload event
     */
    onBeforeUnload(e: BeforeUnloadEvent): void;
    /**
     * As we mount
     */
    componentDidMount(): void;
    /**
     * As we unmount
     */
    componentWillUnmount(): void;
    /**
     * Renders the component
     */
    render(): JSX.Element;
}
export {};
