import React from "react";
import {
  Typography, Button, TextField, FilledInput, FormControl, InputLabel, MenuItem, Select,
} from "../../mui-core";
import { Dialog } from "../dialog";
import { capitalize } from "../../../../util";
import { ISlateEditorInfoType } from ".";
import { RichElement } from "../../../internal/text/serializer";

interface IFileLoadErrorDialogProps {
  currentLoadError: string;
  dismissCurrentLoadError: () => void;
  i18nGenericError: string;
  i18nOk: string;
}

export class FileLoadErrorDialog extends React.PureComponent<IFileLoadErrorDialogProps> {
  public render() {
    return (
      <Dialog
        fullScreen={false}
        open={!!this.props.currentLoadError}
        onClose={this.props.dismissCurrentLoadError}
        title={capitalize(this.props.i18nGenericError)}
        buttons={
          <Button onClick={this.props.dismissCurrentLoadError}>
            {capitalize(this.props.i18nOk)}
          </Button>
        }
      >
        <Typography>
          {this.props.currentLoadError}
        </Typography>
      </Dialog>
    );
  }
}

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

interface ILinkDialogProps {
  acceptLink: (url: string, tvalue: string) => boolean;
  closeDialogLink: () => void;
  linkDialogOpen: boolean;
  info: ISlateEditorInfoType;
  originalSelectedElement: RichElement;
  supportsExternalLinks: boolean;
  i18nSetLinkTitle: string;
  i18nSetLinkSubmit: string;
  i18nSetLinkLabel: string;
  i18nSetLinkPlaceholder: string;
  i18nSetLinkPlaceholderLocalOnly: string;
  i18nSetLinkInvalid: string;
  i18nSetLinkTemplated: string;
  i18nSetLinkTemplatedLabel: string;
  i18nSetLinkTemplatedPlaceholder: string;
  i18nSetLinkTemplatedUnspecified: string;
}

interface ILinkDialogTemplateOption {
  value: string;
  label: string;
};

interface ILinkDialogState {
  linkURL: string;
  linkTValue: string;
  linkInvalid: boolean;
  linkTemplateOptions: ILinkDialogTemplateOption[],
}

export class LinkDialog extends React.PureComponent<ILinkDialogProps, ILinkDialogState> {
  private textFieldLinkRef: React.RefObject<HTMLDivElement>;
  constructor(props: ILinkDialogProps) {
    super(props);

    this.state = {
      linkURL: "",
      linkTValue: "",
      linkInvalid: false,
      linkTemplateOptions: [],
    }

    this.textFieldLinkRef = React.createRef();

    this.focusLinkTextField = this.focusLinkTextField.bind(this);
    this.onOpeningDialog = this.onOpeningDialog.bind(this);
    this.acceptLink = this.acceptLink.bind(this);
    this.updateLinkURL = this.updateLinkURL.bind(this);
    this.updateLinkTValue = this.updateLinkTValue.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }
  public focusLinkTextField() {
    this.textFieldLinkRef.current && this.textFieldLinkRef.current.focus();
  }
  public onOpeningDialog() {
    const linkPropertiesToUse: ILinkDialogTemplateOption[] = [];
    let selectedContextValue: string = "";

    this.props.info.currentContext && Object.keys(this.props.info.currentContext.properties).forEach((key) => {
      const property = this.props.info.currentContext.properties[key];
      if (property.type !== "link") {
        return;
      }
      linkPropertiesToUse.push({
        value: key,
        label: property.label || key,
      });
    });

    if (
      this.props.originalSelectedElement &&
      this.props.originalSelectedElement.type === "link" &&
      this.props.originalSelectedElement.thref
    ) {
      if (!linkPropertiesToUse.some((p) => p.value === (this.props.originalSelectedElement as any).thref)) {
        linkPropertiesToUse.push({
          value: this.props.originalSelectedElement.thref,
          label: this.props.originalSelectedElement.thref,
        });
      }

      selectedContextValue = this.props.originalSelectedElement.thref;
    }

    this.setState({
      linkTValue: selectedContextValue,
      linkTemplateOptions: linkPropertiesToUse,
    });
  }
  public acceptLink() {
    const status = this.props.acceptLink(this.state.linkURL, this.state.linkTValue);
    if (status) {
      this.props.closeDialogLink();
    } else {
      this.setState({
        linkInvalid: true,
      });
    }
  }
  public updateLinkURL(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      linkURL: e.target.value,
    });
  }
  public updateLinkTValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      linkTValue: e.target.value,
    });
  }
  public closeDialog() {
    this.props.closeDialogLink();

    this.setState({
      linkURL: "",
      linkTValue: "",
      linkInvalid: false,
      linkTemplateOptions: [],
    });
  }
  public render() {
    return (
      <Dialog
        fullScreen={false}
        open={this.props.linkDialogOpen}
        onClose={this.closeDialog}
        onOpening={this.onOpeningDialog}
        onOpen={this.focusLinkTextField}
        title={this.props.i18nSetLinkTitle}
        buttons={
          <Button onClick={this.acceptLink}>
            {this.props.i18nSetLinkSubmit}
          </Button>
        }
      >
        <div>
          <TextField
            fullWidth={true}
            value={this.state.linkURL}
            onChange={this.updateLinkURL}
            label={this.props.i18nSetLinkLabel}
            placeholder={
              this.props.supportsExternalLinks ?
                this.props.i18nSetLinkPlaceholder :
                this.props.i18nSetLinkPlaceholderLocalOnly
            }
            inputRef={this.textFieldLinkRef}
          />
          <div>{this.state.linkInvalid ? this.props.i18nSetLinkInvalid : null}</div>
          {
            this.state.linkTemplateOptions.length ?
              <div>
                {this.props.i18nSetLinkTemplated}
                <FormControl
                  variant="filled"
                >
                  <InputLabel
                    htmlFor="slate-wrapper-template-entry-id"
                    shrink={true}
                  >
                    {this.props.i18nSetLinkTemplatedLabel}
                  </InputLabel>
                  <Select
                    value={this.state.linkTValue}
                    onChange={this.updateLinkTValue}
                    displayEmpty={true}
                    variant="filled"
                    input={
                      <FilledInput
                        id="slate-wrapper-template-entry-id"
                        placeholder={this.props.i18nSetLinkTemplatedPlaceholder}
                      />
                    }
                  >
                    <MenuItem value="">
                      <em>{this.props.i18nSetLinkTemplatedUnspecified}</em>
                    </MenuItem>
                    {
                      // render the valid values that we display and choose
                      this.state.linkTemplateOptions.map((vv) => {
                        // the i18n value from the i18n data
                        return <MenuItem key={vv.value} value={vv.value}>{
                          vv.label
                        }</MenuItem>;
                      })
                    }
                  </Select>
                </FormControl>
              </div> :
              null
          }
        </div>
      </Dialog>
    );
  }
}