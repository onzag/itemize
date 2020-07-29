/**
 * Utilizes the needs submit prompt in order to prompt the user
 * about missing changes
 *
 * @packageDocumentation
 */
import React from "react";
import { IActionSubmitOptions } from "../../providers/item-definition";
/**
 * The props of the needs submit prompt
 */
interface NeedsSubmitPromptProps {
    /**
     * the i18n id for the message that is displayed
     */
    i18nMessage?: string;
    /**
     * The title for the dialog
     */
    i18nTitle?: string;
    /**
     * The text for confirm
     */
    i18nConfirm?: string;
    /**
     * The text for discard
     */
    i18nDiscard?: string;
    /**
     * The properties that must be checked for differences
     */
    properties?: string[];
    /**
     * The includes to check for differences
     */
    includes?: string[];
    /**
     * The submit options to use during a confirmation
     * they might be equal to whatever submit button or submit actioner
     * you used in order to submit
     */
    confirmationSubmitOptions: IActionSubmitOptions;
}
/**
 * The nees submit prompt will show a prompt (aka dialog) for when the user
 * attempts to leave the page, but hasn't submitted changes
 */
export declare class NeedsSubmitPrompt extends React.PureComponent<NeedsSubmitPromptProps> {
    render(): JSX.Element;
}
export {};
