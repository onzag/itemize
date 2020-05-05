import { EndpointErrorType } from "../../../base/errors";
import React from "react";
import { redirectTo } from ".";
import {Prompt as RouterPrompt} from "react-router-dom";
import { Location } from "history";

export type PromptDialogComponent = React.ComponentType<{
  open: boolean,
  confirming: boolean,
  confirmationCallbackError: EndpointErrorType,
  confirmationCallbackErrorClean: () => void;
  onCancel: () => void,
  onConfirm: () => void,
  onDiscard: () => void,
  args?: any,
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
  private originalLocation: string;
  constructor(props: PromptProps) {
    super(props);

    this.state = {
      dialogOpened: false,
      dialogOpenedFor: null,
      confirming: false,
      confirmationError: null,
    }

    this.onBeforeUnload = this.onBeforeUnload.bind(this);
    this.cancelDialog = this.cancelDialog.bind(this);
    this.discardDialog = this.discardDialog.bind(this);
    this.confirmDialog = this.confirmDialog.bind(this);
    this.handleRouterPromptNavigationStep = this.handleRouterPromptNavigationStep.bind(this);
    this.confirmationCallbackErrorClean = this.confirmationCallbackErrorClean.bind(this);
  }
  public handleRouterPromptNavigationStep(location: Location) {
    if (!this.state.dialogOpened) {
      this.setState({
        dialogOpened: true,
        dialogOpenedFor: location,
      });
      return false;
    }
    return true;
  }
  public confirmationCallbackErrorClean() {
    this.props.confirmationCallbackCleanup();
    this.setState({
      confirmationError: null,
    });
  }
  public cancelDialog() {
    if (location.pathname !== this.originalLocation) {
      redirectTo(this.originalLocation);
    }
    this.setState({
      dialogOpened: false,
      dialogOpenedFor: null,
    });
  }
  public discardDialog() {
    if (location.pathname !== this.state.dialogOpenedFor.pathname) {
      redirectTo(this.state.dialogOpenedFor.pathname);
    } else {
      redirectTo(this.state.dialogOpenedFor.pathname, null, true);
    }
  }
  public async confirmDialog() {
    this.confirmationCallbackErrorClean();
    if (this.props.confirmationCallback) {      
      this.setState({
        confirming: true,
      });
      const error = await this.props.confirmationCallback();
      if (error) {
        this.setState({
          confirming: false,
          confirmationError: error,
        });
        return;
      }
    }

    this.discardDialog();
  }
  public onBeforeUnload(e: BeforeUnloadEvent) {
    if (this.props.when) {
      e.returnValue = this.props.beforeUnloadMessage;
    }
  }
  public componentDidMount() {
    this.originalLocation = location.pathname;
    window.addEventListener("beforeunload", this.onBeforeUnload);
  }
  public componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onBeforeUnload);
  }
  public render() {
    const Dialog = this.props.Dialog;
    return <React.Fragment>
      <RouterPrompt
        when={this.props.when}
        message={this.handleRouterPromptNavigationStep}
      />
      <Dialog
        open={this.state.dialogOpened}
        onCancel={this.cancelDialog}
        onConfirm={this.confirmDialog}
        onDiscard={this.discardDialog}
        args={this.props.dialogArgs}
        confirming={this.state.confirming}
        confirmationCallbackError={this.state.confirmationError}
        confirmationCallbackErrorClean={this.confirmationCallbackErrorClean}
      />
    </React.Fragment>
  }
}
