import React from "react";
import { ISubmitActionerInfoArgType } from "../item-definition/SubmitActioner";
import { PromptDialogComponent } from "./Prompt";
import { IActionSubmitOptions } from "../../providers/item-definition";
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
    confirmationCallback(actioner: ISubmitActionerInfoArgType): Promise<EndpointErrorType>;
    buildPrompt(when: boolean): JSX.Element;
    render(): JSX.Element;
}
export {};
