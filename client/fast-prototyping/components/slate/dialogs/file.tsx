import React from "react";
import {
  Typography, Button,
} from "../../../mui-core";
import { Dialog } from "../../dialog";
import { capitalize } from "../../../../../util";

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