/**
 * Contains the snackbar component to display success and error messages
 * 
 * @module
 */

import React from "react";
import { Theme } from "@mui/material/styles";
import { EndpointErrorType } from "../../../base/errors";
import I18nRead from "../../components/localization/I18nRead";
import I18nReadError from "../../components/localization/I18nReadError";
import { default as MUISnackbar } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

/**
 * the snackbar styles
 * @param theme the mui theme
 */
const snackbarStyles = {
  success: (theme: Theme) => ({
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    fontWeight: 600,
  }),
  info: (theme: Theme) => ({
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    fontWeight: 600,
  }),
  error: (theme: Theme) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontWeight: 600,
  }),
  warning: (theme: Theme) => ({
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    fontWeight: 600,
  }),
};

/**
 * The snackbar props that it needs to take
 */
interface ISnackbarProps {
  /**
   * An unique id to describe this snackbar
   */
  id: string;
  /**
   * What to display, it can be an error, which can be taken from actioners
   * or a string to do a simple read
   */
  i18nDisplay: EndpointErrorType | string;
  /**
   * The severity of the snackbar, which affects the color
   */
  severity: "primary" | "secondary" | "success" | "error";
  /**
   * Whether it is currently visible, very often actioners will have
   * a property that fits in here nicely, such as "success", "statefulSuccess" or
   * "error", etc...
   */
  open: boolean;
  /**
   * Triggers when the snackbar closes, very often actioners will have a property that
   * fits here, such as "dismissSuccess", "dismissError", etc...
   */
  onClose: () => void;
}

/**
 * The actual snackbar class
 */
export default class Snackbar extends React.PureComponent<ISnackbarProps> {
  constructor(props: ISnackbarProps) {
    super(props);
  }
  public componentWillUnmount(): void {
    if (this.props.open) {
      this.props.onClose();
    }
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
          "aria-describedby": this.props.id,
          sx: snackbarStyles[this.props.severity],
        }}
        message={
          <span id={this.props.id}>
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
                size="large">
                <CloseIcon/>
              </IconButton>
            )}
          </I18nRead>
        }
      />
    );
  }
}
