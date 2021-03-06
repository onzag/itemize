/**
 * Provides the dialogs that are used for the file
 * @module
 */

import React from "react";
import {
  Typography, Button,
} from "../../../mui-core";
import { Dialog } from "../../dialog";
import { capitalize } from "../../../../../util";

/**
 * The error dialog props
 */
interface IFileLoadErrorDialogProps {
  /**
   * The current error, it also represents
   * the fact of the dialog being open if one
   * is available
   */
  currentLoadError: string;
  /**
   * dismiss such error
   */
  dismissCurrentLoadError: () => void;
  /**
   * Generic error message
   */
  i18nGenericError: string;
  /**
   * Ok
   */
  i18nOk: string;
}

/**
 * This dialog provides a convenient error message to display and close
 * for when the file failed to load
 */
export class FileLoadErrorDialog extends React.PureComponent<IFileLoadErrorDialogProps> {
  constructor(props: IFileLoadErrorDialogProps) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onOpening = this.onOpening.bind(this);
  }
  public onClose() {
    this.props.dismissCurrentLoadError();
    setTimeout(() => {
      delete document.body.dataset.unblur;
    }, 100);
  }
  public onOpening() {
    document.body.dataset.unblur = "true";
  }
  /**
   * The render function
   */
  public render() {
    return (
      <Dialog
        fullScreen={false}
        open={!!this.props.currentLoadError}
        onClose={this.onClose}
        onOpening={this.onOpening}
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
