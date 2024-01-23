/**
 * Provides the dialogs that are used for the file
 * @module
 */

import React from "react";
import { Dialog } from "../../dialog";
import { capitalize } from "../../../../../util";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
  }
  public onClose() {
    this.props.dismissCurrentLoadError();
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
