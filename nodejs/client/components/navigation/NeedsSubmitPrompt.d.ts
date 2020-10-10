/**
 * Allows for the prompt of a dialog to request for confirmation of non-submitted
 * data from item definitions
 *
 * @packageDocumentation
 */
import React from "react";
import { ISubmitActionerInfoArgType } from "../item/SubmitActioner";
import { PromptDialogComponent } from "./Prompt";
import { IActionSubmitOptions } from "../../providers/item";
import { EndpointErrorType } from "../../../base/errors";
/**
 * The props for the needs submit
 */
interface NeedsSubmitPromptProps {
    /**
     * The properties to check against to see if they have differed
     */
    properties?: string[];
    /**
     * The includes to check against to see if they have differed
     */
    includes?: string[];
    /**
     * the options to trigger a submit from the same
     * prompt dialog
     */
    confirmationSubmitOptions: IActionSubmitOptions;
    /**
     * The message to show before unload, not truly supported
     * in most browsers but nonetheless available
     */
    beforeUnloadMessage: string;
    /**
     * Extra args from the dialog
     */
    dialogArgs?: any;
    /**
     * A dialog component to be displayed
     */
    Dialog: PromptDialogComponent;
}
/**
 * The needs submit prompt component allows to check for changes in an item definition
 * in the current context so that a dialog can be shown in case that a submit
 * was not completed as changes are unsaved
 */
export default class NeedsSubmitPrompt extends React.PureComponent<NeedsSubmitPromptProps> {
    /**
     * Performs the actioner callback that the Prompt component expects
     * @param actioner the submit actioner arg
     * @returns a promise for an error (or null)
     */
    confirmationCallback(actioner: ISubmitActionerInfoArgType): Promise<EndpointErrorType>;
    /**
     * Builds the prompt as defined by the requeriments and by
     * feeding the submit actioner into it
     * @param when the condition of the prompt
     * @returns a react component
     */
    buildPrompt(when: boolean): JSX.Element;
    /**
     * The render function
     */
    render(): JSX.Element;
}
export {};
