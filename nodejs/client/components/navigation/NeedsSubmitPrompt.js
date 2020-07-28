"use strict";
/**
 * Allows for the prompt of a dialog to request for confirmation of non-submitted
 * data from item definitions
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SubmitActioner_1 = __importDefault(require("../item-definition/SubmitActioner"));
const DifferingPropertiesRetriever_1 = __importDefault(require("../item-definition/DifferingPropertiesRetriever"));
const DifferingIncludesRetriever_1 = __importDefault(require("../item-definition/DifferingIncludesRetriever"));
const Prompt_1 = __importDefault(require("./Prompt"));
/**
 * The needs submit prompt component allows to check for changes in an item definition
 * in the current context so that a dialog can be shown in case that a submit
 * was not completed as changes are unsaved
 */
class NeedsSubmitPrompt extends react_1.default.PureComponent {
    /**
     * Performs the actioner callback that the Prompt component expects
     * @param actioner the submit actioner arg
     * @returns a promise for an error (or null)
     */
    async confirmationCallback(actioner) {
        const response = await actioner.submit(this.props.confirmationSubmitOptions);
        if (response.error) {
            return response.error;
        }
        return null;
    }
    /**
     * Builds the prompt as defined by the requeriments and by
     * feeding the submit actioner into it
     * @param when the condition of the prompt
     * @returns a react component
     */
    buildPrompt(when) {
        return (react_1.default.createElement(SubmitActioner_1.default, null, (actioner) => (react_1.default.createElement(Prompt_1.default, { when: when, beforeUnloadMessage: this.props.beforeUnloadMessage, Dialog: this.props.Dialog, dialogArgs: this.props.dialogArgs, confirmationCallback: this.confirmationCallback.bind(this, actioner), confirmationCallbackError: actioner.submitError, confirmationCallbackConfirming: actioner.submitting, confirmationCallbackCleanError: actioner.dismissError }))));
    }
    /**
     * The render function
     */
    render() {
        // so first we check if we have no properties, or no includes
        const noProperties = (!this.props.properties || !this.props.properties.length);
        const noIncludes = (!this.props.includes || !this.props.includes.length);
        // if we have none of both, then it's useless
        // return null, it'll be equivalent
        if (noProperties &&
            noIncludes) {
            return null;
        }
        // otherwise if no includes
        if (noIncludes) {
            // we now use our differing properties retriever with the main properties
            // and as such, we can pass the condition as the differing properties argument
            // if there are differing properties the condition will evaluate to true
            // and as such the prompt will show if the user attempts navigation
            return (react_1.default.createElement(DifferingPropertiesRetriever_1.default, { mainProperties: this.props.properties }, (differingProperties) => (this.buildPrompt(!!(differingProperties && differingProperties.length)))));
        }
        else if (noProperties) {
            // the same applies here with only includes
            return (react_1.default.createElement(DifferingIncludesRetriever_1.default, { mainIncludes: this.props.includes }, (differingIncludes) => (this.buildPrompt(!!(differingIncludes && differingIncludes.length)))));
        }
        else {
            // and this one is a combined effort of both
            // properties and includes, in an or condition
            react_1.default.createElement(DifferingPropertiesRetriever_1.default, { mainProperties: this.props.properties }, (differingProperties) => (react_1.default.createElement(DifferingIncludesRetriever_1.default, { mainIncludes: this.props.includes }, (differingIncludes) => (this.buildPrompt(!!(differingIncludes && differingIncludes.length) ||
                !!(differingProperties && differingProperties.length))))));
        }
    }
}
exports.default = NeedsSubmitPrompt;
