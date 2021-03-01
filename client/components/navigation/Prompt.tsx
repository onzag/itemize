/**
 * A navigation prompt that prompts if a condition evaluates to true
 *
 * @module
 */

import { EndpointErrorType } from "../../../base/errors";
import React from "react";
import { redirectTo } from ".";
import {Prompt as RouterPrompt} from "react-router-dom";
import { Location } from "history";

/**
 * The prompt dialog component is used when possible by
 * react router, and since this prompt is just logical
 * it needs to consume such component
 */
export type PromptDialogComponent = React.ComponentType<{
  /**
   * Whether the dialog should be open
   */
  open: boolean,
  /**
   * Whether it's currently confirming
   */
  confirming: boolean,
  /**
   * whether the confirmation callback threw an error
   */
  confirmationCallbackError: EndpointErrorType,
  /**
   * clean the error
   */
  confirmationCallbackErrorClean: () => void;
  /**
   * cancel everything, both the submitting and the change
   */
  onCancel: () => void,
  /**
   * confirm the submitting and proceed
   */
  onConfirm: () => void,
  /**
   * Discard the submitting and proceed to wherever you were going
   */
  onDiscard: () => void,
  /**
   * Extra args
   */
  args?: any,
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
  private originalLocation: string;

  constructor(props: PromptProps) {
    super(props);

    // set the initial state
    this.state = {
      dialogOpened: false,
      dialogOpenedFor: null,
    }

    this.onBeforeUnload = this.onBeforeUnload.bind(this);
    this.cancelDialog = this.cancelDialog.bind(this);
    this.discardDialog = this.discardDialog.bind(this);
    this.confirmDialog = this.confirmDialog.bind(this);
    this.handleRouterPromptNavigationStep = this.handleRouterPromptNavigationStep.bind(this);
  }

  /**
   * Triggers from the react router as the message prop
   * but returns a boolean, returning false prevents the navigation
   * @param location the location
   * @returns a boolean
   */
  public handleRouterPromptNavigationStep(location: Location) {
    // if the dialog is not opened already
    if (!this.state.dialogOpened) {
      // open it
      this.setState({
        dialogOpened: true,
        dialogOpenedFor: location,
      });
      // and block the navigation
      return false;
    }
    // don't block the navigation, proceed
    return true;
  }

  /**
   * Triggers when the dialog is open and it is cancelled, which means that we should
   * just stay where we are and avoid to go where we were going
   */
  public cancelDialog() {
    // so one of the things that can happen is that during the prompt event
    // the current location could have been lost, so we need to do a redirect back
    // to where we are, this happens only truly during going back (doesn't seem to happen)
    // while going forward and as such we run a push to our original location
    // this seems to be a problem with history api itself, a limitation
    if (location.pathname + location.search + location.hash !== this.originalLocation) {
      redirectTo(this.originalLocation);
    }

    // close the dialog, it might not really be mounted anymore after we do
    // but whatever
    this.setState({
      dialogOpened: false,
      dialogOpenedFor: null,
    });
  }

  /**
   * Discard the dialog, aka ignore it, and proceed to where we were going
   */
  public discardDialog() {
    // so now we check, same thing as before, for some reason in some circumstances
    // we might already be in the location where we were going, even if the router hasn't realized
    // it and as such we check
    if (
      location.pathname + location.search + location.hash !==
      this.state.dialogOpenedFor.pathname + this.state.dialogOpenedFor.search + this.state.dialogOpenedFor.hash
    ) {
      // if there's a mismatch, we push our new location
      redirectTo(this.state.dialogOpenedFor.pathname + this.state.dialogOpenedFor.search + this.state.dialogOpenedFor.hash);
    } else {
      // otherwise if we are in the same location we replace
      redirectTo(this.state.dialogOpenedFor.pathname + this.state.dialogOpenedFor.search + this.state.dialogOpenedFor.hash, null, true);
    }
  }

  /**
   * Confirm the dialog, aka confirm the changes and proceed
   */
  public async confirmDialog() {
    // first we clean the error
    this.props.confirmationCallbackCleanError && this.props.confirmationCallbackCleanError();

    // and now we call the callback if we have one
    if (this.props.confirmationCallback) {
      // if we have an error
      const error = await this.props.confirmationCallback();
      if (error) {
        // we stop
        return;
      }
    }

    // if everything succeed we discard
    this.discardDialog();
  }

  /**
   * triggers on an actual before unload event
   * as the user tries to close the window without
   * saving changes
   * @param e the before unload event
   */
  public onBeforeUnload(e: BeforeUnloadEvent) {
    if (this.props.when) {
      // we use the before unload value here even
      // if it won't be displayed in most browsers
      e.returnValue = this.props.beforeUnloadMessage;
    }
  }

  /**
   * As we mount
   */
  public componentDidMount() {
    // we store our original location
    this.originalLocation = location.pathname + location.search + location.hash;
    // add the before unload listener
    window.addEventListener("beforeunload", this.onBeforeUnload);
  }

  /**
   * As we unmount
   */
  public componentWillUnmount() {
    // remove the unload listener
    window.removeEventListener("beforeunload", this.onBeforeUnload);
  }

  /**
   * Renders the component
   */
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
        confirming={this.props.confirmationCallbackConfirming || false}
        confirmationCallbackError={this.props.confirmationCallbackError || null}
        confirmationCallbackErrorClean={this.props.confirmationCallbackCleanError || (() => null)}
      />
    </React.Fragment>
  }
}
