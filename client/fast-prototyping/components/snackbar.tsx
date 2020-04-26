import React from "react";
import { Snackbar as MUISnackbar, IconButton, withStyles, WithStyles, createStyles, Theme} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { EndpointErrorType } from "../../../base/errors";
import { I18nRead, I18nReadError } from "../../components/localization";
import { Color } from '@material-ui/lab/Alert';
import uuid from "uuid";

const snackbarStyles = (theme: Theme) => createStyles({
  success: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  },
  info: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.info.dark,
  },
  error: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  },
  warning: {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.dark,
  },
});

interface ISnackbarProps extends WithStyles<typeof snackbarStyles> {
  i18nDisplay: EndpointErrorType | string;
  severity: Color;
  open: boolean;
  onClose: () => void;
}

class ActualSnackbar extends React.PureComponent<ISnackbarProps> {
  private id: string;
  constructor(props: ISnackbarProps) {
    super(props);

    this.id = "id-" + uuid.v1();
  }
  public render() {
    let message: React.ReactNode;
    const autoHideDuration = this.props.severity === "success" ? 3000 : null;

    if (typeof this.props.i18nDisplay === "string") {
      message = <I18nRead id={this.props.i18nDisplay} capitalize={true}/>;
    } else if (this.props.i18nDisplay) {
      message = <I18nReadError error={this.props.i18nDisplay} capitalize={true}/>;
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
          classes: {
            root: this.props.classes[this.props.severity],
          }
        }}
        message={
          <span id={this.id}>
            {message}
          </span>
        }
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

export default withStyles(snackbarStyles)(ActualSnackbar);