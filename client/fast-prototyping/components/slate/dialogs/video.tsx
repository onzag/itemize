/**
 * This file provides the dialog that is used in order to allow for the url
 * input for inserting a video into the rich text
 * @module
 */

import React from "react";
import {
  Button, TextField,
} from "../../../mui-core";
import { Dialog } from "../../dialog";

/**
 * The props that the video dialog takes
 */
interface IVideoDialogProps {
  /**
   * Whether the dialog is open
   */
  videoDialogOpen: boolean;
  /**
   * The title that is used in the dialog
   */
  i18nLoadVideoTitle: string;
  /**
   * The text that is used in the submit button
   */
  i18nLoadVideoSubmit: string;
  /**
   * The label that is used in the text field that takes input
   */
  i18nLoadVideoLabel: string;
  /**
   * The placeholder that is used in such text field
   */
  i18nLoadVideoPlaceholder: string;
  /**
   * Text that displays if the loading video action comes
   * as invalid
   */
  i18nLoadVideoInvalid: string;
  /**
   * Triggers once the dialog is closed
   */
  closeDialogVideo: () => void;
  /**
   * The function that executes once the video link is accepted
   * @param url the url that is been set
   * @returns a boolean on whether the url was accepted or not
   * on false it should show an error
   */
  acceptVideo: (url: string) => boolean;
}

/**
 * The state of the video dialog
 */
interface IVideoDialogState {
  /**
   * The current url that is being hold in the state for the text field
   */
  videoURL: string;
  /**
   * Whether the accept video function has indicated the link is invalid
   */
  videoInvalid: boolean;
}

/**
 * The video dialog that provides input to insert a link url into
 * the rich text element
 */
export class VideoDialog extends React.PureComponent<IVideoDialogProps, IVideoDialogState> {
  /**
   * The reference used in the text field input used for focusing
   */
  private textFieldVideoRef: React.RefObject<HTMLDivElement>;

  /**
   * Constructs a new video dialog
   * @param props the video dialog specific properties
   */
  constructor(props: IVideoDialogProps) {
    super(props);

    this.state = {
      videoURL: "",
      videoInvalid: false,
    }

    this.textFieldVideoRef = React.createRef();

    this.focusVideoTextField = this.focusVideoTextField.bind(this);
    this.acceptVideo = this.acceptVideo.bind(this);
    this.updateVideoURL = this.updateVideoURL.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.onOpening = this.onOpening.bind(this);
  }

  /**
   * Focuses the video text field on mount
   */
  public focusVideoTextField() {
    this.textFieldVideoRef.current && this.textFieldVideoRef.current.focus();
  }

  /**
   * Accepts the video and calls the prop function
   * that does the actual insertion and with the given
   * status decides whether to show an error or close
   */
  public acceptVideo() {
    // insert and get the status
    const status = this.props.acceptVideo(this.state.videoURL);

    // if it succeeded as the status was true
    if (status) {
      // then we close the dialog
      this.props.closeDialogVideo();
    } else {
      // otherwise we mark it as invalid
      this.setState({
        videoInvalid: true,
      });
    }
  }

  /**
   * Updates the video url in the state on each keystroke
   * @param e the change event
   */
  public updateVideoURL(e: React.ChangeEvent<HTMLInputElement>) {
    // update the state
    this.setState({
      videoURL: e.target.value,
      videoInvalid: false,
    });
  }

  /**
   * Closes the dialog in place
   */
  public closeDialog() {
    // call to the prop
    this.props.closeDialogVideo();

    // clear the state
    this.setState({
      videoURL: "",
      videoInvalid: false,
    });

    setTimeout(() => {
      delete document.body.dataset.unblur;
    }, 100);
  }

  public onOpening() {
    document.body.dataset.unblur = "true";
  }

  /**
   * Render function
   */
  public render() {
    return (
      <Dialog
        fullScreen={false}
        open={this.props.videoDialogOpen}
        onClose={this.closeDialog}
        onOpen={this.focusVideoTextField}
        onOpening={this.onOpening}
        title={this.props.i18nLoadVideoTitle}
        buttons={
          <Button onClick={this.acceptVideo}>
            {this.props.i18nLoadVideoSubmit}
          </Button>
        }
      >
        <div>
          <TextField
            fullWidth={true}
            value={this.state.videoURL}
            onChange={this.updateVideoURL}
            label={this.props.i18nLoadVideoLabel}
            placeholder={this.props.i18nLoadVideoPlaceholder}
            inputRef={this.textFieldVideoRef}
          />
          <div>{this.state.videoInvalid ? this.props.i18nLoadVideoInvalid : null}</div>
        </div>
      </Dialog>
    );
  }
}
