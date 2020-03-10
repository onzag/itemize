import React from "react";
import { Snackbar as MUISnackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { EndpointErrorType } from "../../../base/errors";
import { I18nRead, I18nReadError } from "../../components/localization";
import uuid from "uuid";

interface ISnackbarProps {
  i18nDisplay: EndpointErrorType | string;
  open: boolean;
  onClose: () => void;
}

export default class Snackbar extends React.PureComponent<ISnackbarProps> {
  private id: string;
  constructor(props: ISnackbarProps) {
    super(props);

    this.id = "id-" + uuid.v1();
  }
  public render() {
    let message: React.ReactNode;
    let autoHideDuration: number;
    if (typeof this.props.i18nDisplay === "string") {
      message = <I18nRead id={this.props.i18nDisplay} />;
      autoHideDuration = 3000;
    } else if (this.props.i18nDisplay) {
      message = <I18nReadError error={this.props.i18nDisplay} />;
      autoHideDuration = null;
    }
    return (
      <MUISnackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={this.props.open}
        autoHideDuration={autoHideDuration}
        onClose={this.props.onClose}
        ContentProps={{
          "aria-describedby": this.id,
        }}
        message={<span id={this.id}>
          {message}
        </span>}
        action={
          <I18nRead id="close">
            {(i18nClose: string) => (
              <IconButton
                aria-label={i18nClose}
                color="inherit"
                onClick={this.props.onClose}
              >
                <CloseIcon/>
              </IconButton>
            )}
          </I18nRead>
        }
      />
    );
  }
}