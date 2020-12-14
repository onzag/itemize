import React from "react";
import {
  Button, TextField,
} from "../../../mui-core";
import { Dialog } from "../../dialog";

interface IVideoDialogProps {
  videoDialogOpen: boolean;
  i18nLoadVideoTitle: string;
  i18nLoadVideoSubmit: string;
  i18nLoadVideoLabel: string;
  i18nLoadVideoPlaceholder: string;
  i18nLoadVideoInvalid: string;
  closeDialogVideo: () => void;
  acceptVideo: (url: string) => boolean;
}

interface IVideoDialogState {
  videoURL: string;
  videoInvalid: boolean;
}

export class VideoDialog extends React.PureComponent<IVideoDialogProps, IVideoDialogState> {
  private textFieldVideoRef: React.RefObject<HTMLDivElement>;
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
  }
  public focusVideoTextField() {
    this.textFieldVideoRef.current && this.textFieldVideoRef.current.focus();
  }
  public acceptVideo() {
    const status = this.props.acceptVideo(this.state.videoURL);
    if (status) {
      this.props.closeDialogVideo();
    } else {
      this.setState({
        videoInvalid: true,
      });
    }
  }
  public updateVideoURL(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      videoURL: e.target.value,
    });
  }
  public closeDialog() {
    this.props.closeDialogVideo();

    this.setState({
      videoURL: "",
      videoInvalid: false,
    });
  }
  public render() {
    return (
      <Dialog
        fullScreen={false}
        open={this.props.videoDialogOpen}
        onClose={this.closeDialog}
        onOpen={this.focusVideoTextField}
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
