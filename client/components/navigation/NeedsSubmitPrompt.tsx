/**
 * Allows for the prompt of a dialog to request for confirmation of non-submitted
 * data from item definitions as the navigation tries to change location
 * 
 * @module
 */

import React from "react";
import SubmitActioner, { ISubmitActionerInfoArgType } from "../item/SubmitActioner";
import DifferingPropertiesRetriever from "../item/DifferingPropertiesRetriever";
import DifferingIncludesRetriever from "../item/DifferingIncludesRetriever";
import Prompt, { PromptDialogComponent } from "./Prompt";
import { IActionSubmitOptions, IActionSubmitResponse } from "../../providers/item";
import { EndpointErrorType } from "../../../base/errors";
import { Location } from "history";

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
   * another boolean to active the submit if it's active
   */
  other?: boolean;
  /**
   * the options to trigger a submit from the same
   * prompt dialog
   */
  confirmationSubmitOptions: IActionSubmitOptions;
  /**
   * called when submit was confirmed and it's about to submit
   */
  onConfirmationSubmit?: (defaultAction: () => Promise<EndpointErrorType>) => Promise<EndpointErrorType>;
  /**
   * ignores any change when it detects a language change
   * note that this is not capable of determining if other stuff changes
   * it simply denies language changes
   */
  ignoreSimpleLanguageChange?: boolean;

  /**
   * detect a change yourself in the location
   * return true to accept it as a change
   */
  customChange?: (location: Location) => boolean;

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
  public async confirmationCallback(when: boolean, whenOther: boolean, actioner: ISubmitActionerInfoArgType): Promise<EndpointErrorType> {
    const defaultAction = async () => {
      const response: IActionSubmitResponse = await actioner.submit(this.props.confirmationSubmitOptions);
      if (response.error) {
        return response.error;
      }

      return null;
    }
    if (this.props.onConfirmationSubmit) {
      if (when) {
        return this.props.onConfirmationSubmit(defaultAction);
      }
      return this.props.onConfirmationSubmit(() => null);
    }

    return defaultAction();
  }

  /**
   * Builds the prompt as defined by the requeriments and by
   * feeding the submit actioner into it
   * @param when the condition of the prompt
   * @returns a react component
   */
  public buildPrompt(when: boolean, whenOther: boolean) {
    return (
      <SubmitActioner>
        {(actioner) => (
          <Prompt
            when={when || whenOther}
            beforeUnloadMessage={this.props.beforeUnloadMessage}
            ignoreSimpleLanguageChange={this.props.ignoreSimpleLanguageChange}
            customChange={this.props.customChange}
            Dialog={this.props.Dialog}
            dialogArgs={this.props.dialogArgs}
            confirmationCallback={this.confirmationCallback.bind(this, when, whenOther, actioner)}
            confirmationCallbackError={actioner.submitError}
            confirmationCallbackConfirming={actioner.submitting}
            confirmationCallbackCleanError={actioner.dismissError}
          />
        )
        }
      </SubmitActioner>
    )
  }

  /**
   * The render function
   */
  public render() {
    // so first we check if we have no properties, or no includes
    const noProperties = (!this.props.properties || !this.props.properties.length);
    const noIncludes = (!this.props.includes || !this.props.includes.length);

    // if we have none of both, then it's useless
    // return null, it'll be equivalent
    if (
      noProperties &&
      noIncludes &&
      !this.props.other
    ) {
      return null;
    }

    // otherwise if no includes
    if (noIncludes && noProperties) {
      return this.buildPrompt(false, this.props.other);
    } else if (noIncludes) {
      // we now use our differing properties retriever with the main properties
      // and as such, we can pass the condition as the differing properties argument
      // if there are differing properties the condition will evaluate to true
      // and as such the prompt will show if the user attempts navigation
      return (
        <DifferingPropertiesRetriever mainProperties={this.props.properties}>
          {(differingProperties) => (
            this.buildPrompt(!!(differingProperties && differingProperties.length), this.props.other)
          )}
        </DifferingPropertiesRetriever>
      );
    } else if (noProperties) {
      // the same applies here with only includes
      return (
        <DifferingIncludesRetriever mainIncludes={this.props.includes}>
          {(differingIncludes) => (
            this.buildPrompt(!!(differingIncludes && differingIncludes.length), this.props.other)
          )}
        </DifferingIncludesRetriever>
      );
    } else {
      // and this one is a combined effort of both
      // properties and includes, in an or condition
      <DifferingPropertiesRetriever mainProperties={this.props.properties}>
        {(differingProperties) => (
          <DifferingIncludesRetriever mainIncludes={this.props.includes}>
            {(differingIncludes) => (
              this.buildPrompt(
                !!(differingIncludes && differingIncludes.length) ||
                !!(differingProperties && differingProperties.length),
                this.props.other
              )
            )}
          </DifferingIncludesRetriever>
        )}
      </DifferingPropertiesRetriever>
    }
  }
}
