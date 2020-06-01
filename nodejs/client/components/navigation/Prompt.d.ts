import { EndpointErrorType } from "../../../base/errors";
import React from "react";
import { Location } from "history";
export declare type PromptDialogComponent = React.ComponentType<{
    open: boolean;
    confirming: boolean;
    confirmationCallbackError: EndpointErrorType;
    confirmationCallbackErrorClean: () => void;
    onCancel: () => void;
    onConfirm: () => void;
    onDiscard: () => void;
    args?: any;
}>;
interface PromptProps {
    when: boolean;
    beforeUnloadMessage: string;
    confirmationCallback?: () => Promise<EndpointErrorType> | EndpointErrorType;
    confirmationCallbackCleanup?: () => void;
    dialogArgs?: any;
    Dialog: PromptDialogComponent;
}
interface PromptState {
    dialogOpened: boolean;
    dialogOpenedFor: Location;
    confirming: boolean;
    confirmationError: EndpointErrorType;
}
export default class Prompt extends React.PureComponent<PromptProps, PromptState> {
    private originalLocation;
    constructor(props: PromptProps);
    handleRouterPromptNavigationStep(location: Location): boolean;
    confirmationCallbackErrorClean(): void;
    cancelDialog(): void;
    discardDialog(): void;
    confirmDialog(): Promise<void>;
    onBeforeUnload(e: BeforeUnloadEvent): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
