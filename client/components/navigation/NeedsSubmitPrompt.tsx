import React from "react";
import SubmitActioner, { ISubmitActionerInfoArgType } from "../item-definition/SubmitActioner";
import DifferingPropertiesRetriever from "../item-definition/DifferingPropertiesRetriever";
import DifferingIncludesRetriever from "../item-definition/DifferingIncludesRetriever";
import Prompt, { PromptDialogComponent } from "./Prompt";
import { IActionSubmitOptions, IActionResponseWithId } from "../../providers/item-definition";
import { EndpointErrorType } from "../../../base/errors";

interface NeedsSubmitPromptProps {
  properties?: string[];
  includes?: string[];
  confirmationSubmitOptions: IActionSubmitOptions;
  beforeUnloadMessage: string;
  dialogArgs?: any;
  Dialog: PromptDialogComponent;
}

export default class NeedsSubmitPrompt extends React.PureComponent<NeedsSubmitPromptProps> {
  public async confirmationCallback(actioner: ISubmitActionerInfoArgType): Promise<EndpointErrorType> {
    const response: IActionResponseWithId = await actioner.submit(this.props.confirmationSubmitOptions);
    if (response.error) {
      return response.error;
    }
    return null;
  }
  public buildPrompt(when: boolean) {
    return (
      <SubmitActioner>
        {(actioner) => (
          <Prompt
            when={when}
            beforeUnloadMessage={this.props.beforeUnloadMessage}
            Dialog={this.props.Dialog}
            dialogArgs={this.props.dialogArgs}
            confirmationCallback={this.confirmationCallback.bind(this, actioner)}
            confirmationCallbackCleanup={actioner.dismissError}
          />
         )
        }
      </SubmitActioner>
    )
  }
  public render() {
    const noProperties = (!this.props.properties || !this.props.properties.length);
    const noIncludes = (!this.props.includes || !this.props.includes.length);
    if (
      noProperties &&
      noIncludes
    ) {
      return null;
    }

    if (noIncludes) {
      return (
        <DifferingPropertiesRetriever mainProperties={this.props.properties}>
          {(differingProperties) => (
            this.buildPrompt(!!(differingProperties && differingProperties.length))
          )}
        </DifferingPropertiesRetriever>
      );
    } else if (noProperties) {
      return (
        <DifferingIncludesRetriever mainIncludes={this.props.includes}>
          {(differingIncludes) => (
            this.buildPrompt(!!(differingIncludes && differingIncludes.length))
          )}
        </DifferingIncludesRetriever>
      );
    } else {
      <DifferingPropertiesRetriever mainProperties={this.props.properties}>
        {(differingProperties) => (
          <DifferingIncludesRetriever mainIncludes={this.props.includes}>
            {(differingIncludes) => (
              this.buildPrompt(
                !!(differingIncludes && differingIncludes.length) ||
                !!(differingProperties && differingProperties.length)
              )
            )}
          </DifferingIncludesRetriever>
        )}
      </DifferingPropertiesRetriever>
    }
  }
}