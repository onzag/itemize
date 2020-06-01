import React from "react";
import { IActionSubmitOptions } from "../../providers/item-definition";
interface NeedsSubmitPromptProps {
    i18nMessage?: string;
    i18nTitle?: string;
    i18nConfirm?: string;
    i18nDiscard?: string;
    properties?: string[];
    includes?: string[];
    confirmationSubmitOptions: IActionSubmitOptions;
}
export declare class NeedsSubmitPrompt extends React.PureComponent<NeedsSubmitPromptProps> {
    render(): JSX.Element;
}
export {};
