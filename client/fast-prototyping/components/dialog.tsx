/**
 * Contains a generic dialog component based on MUI that is meant to be extended
 *
 * @packageDocumentation
 */

import React from "react";
import {
  Typography,
  withMobileDialog,
  Dialog as MDialog,
  AppBar,
  Toolbar,
  IconButton,
  DialogContent,
  DialogActions,
  createStyles,
  WithStyles,
  withStyles,
  CloseIcon,
} from "../mui-core";
import I18nRead from "../../components/localization/I18nRead";

/**
 * The standard dialog styles
 */
const dialogStyles = createStyles({
  paper: {},
  appbar: {
    position: "relative",
  },
  title: {
    flex: 1,
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  content: {
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    minWidth: "400px",
  },
  actions: {
    display: "flex",
    borderTop: "solid 1px #ccc",
    paddingTop: "10px",
  },
});

/**
 * The dialog props that need to be passed in order to build a generic
 * dialog
 */
interface IDialogProps extends WithStyles<typeof dialogStyles> {
  /**
   * whether the dialog is currently open
   */
  open: boolean;
  /**
   * The title for the dialog
   */
  title: string;
  /**
   * A function that calls when the user wants to close the dialog
   */
  onClose: () => void;
  /**
   * The content of the dialog
   */
  children?: React.ReactNode;
  /**
   * whether it is full screen
   */
  fullScreen?: boolean;
  /**
   * The buttons that it contains in the bottom
   */
  buttons?: React.ReactNode;
  /**
   * The dialog class name
   */
  className?: string;
}

/**
 * The dialog itself, non-responsive and rather generic
 */
const Dialog = withStyles(dialogStyles)((props: IDialogProps) => {
  return (
    <MDialog
      classes={{
        paper: props.classes.paper,
      }}
      open={props.open}
      onClose={props.onClose}
      fullScreen={props.fullScreen}
      scroll="paper"
    >
      <AppBar className={props.classes.appbar}>
        <Toolbar>
          <I18nRead id="close">
            {(i18nClose: string) => (
              <IconButton color="inherit" onClick={props.onClose} aria-label={i18nClose}>
                <CloseIcon/>
              </IconButton>
            )}
          </I18nRead>
          <Typography variant="h6" color="inherit" className={props.classes.title}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      {props.children ? <DialogContent className={props.classes.content}>
        {props.children}
      </DialogContent> : null}
      {props.buttons ? <DialogActions className={props.classes.actions}>
        {props.buttons}
      </DialogActions> : null}
    </MDialog>
  );
});

/**
 * This is a responsive version of the dialog
 * it's able to go in fullscreen mode automatically
 * takes all the other props
 */
const DialogResponsive = withMobileDialog<IDialogProps>({
  breakpoint: "xs",
})(Dialog);

// both are exported
export { DialogResponsive, Dialog };
