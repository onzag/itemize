/**
 * Contains a generic dialog component based on MUI that is meant to be extended
 *
 * @module
 */

import React from "react";
import { WithStyles, createStyles, withStyles, useTheme } from "@material-ui/core/styles";
import I18nRead from "../../components/localization/I18nRead";
import { default as MDialog } from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";


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
interface IDialogProps {
  /**
   * whether the dialog is currently open
   */
  open: boolean;
  /**
   * The title for the dialog
   */
  title: React.ReactNode;
  /**
   * A function that calls when the user wants to close the dialog
   */
  onClose: (e: React.MouseEvent) => void;
  /**
   * A function that calls when the dialog has opened
   */
  onOpen?: () => void;
  /**
   * A function that runs when the dialog is opening
   */
  onOpening?: () => void;
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

interface IDialogPropsWithStyles extends IDialogProps, WithStyles<typeof dialogStyles> {
}

/**
 * The dialog itself, non-responsive and rather generic
 */
const Dialog = withStyles(dialogStyles)((props: IDialogPropsWithStyles) => {
  return (
    <MDialog
      classes={{
        paper: props.classes.paper,
      }}
      open={props.open}
      onClose={props.onClose}
      fullScreen={props.fullScreen}
      scroll="paper"
      TransitionProps={{
        onEntered: props.onOpen,
        onEntering: props.onOpening,
      }}
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
const DialogResponsive = function(props: IDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return <Dialog {...props} fullScreen={fullScreen}/>
}

// both are exported
export { DialogResponsive, Dialog };
