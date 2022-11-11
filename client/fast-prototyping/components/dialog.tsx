/**
 * Contains a generic dialog component based on MUI that is meant to be extended
 *
 * @module
 */

import React from "react";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import I18nRead from "../../components/localization/I18nRead";
import { default as MDialog } from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";


/**
 * The standard dialog styles
 */
const dialogStyles = {
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
};

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
  /**
   * The aria labelled by id
   * remember to give the id to an element in the title or content
   * or set useLabelledByInTitleId
   */
  labelledBy?: string;
  /**
   * Whatever was passed to labelledBy will become the id of the title
   */
  useLabelledByInTitleId?: boolean;
  /**
   * The aria described by id
   * remember to give the id to an element in the title or content
   */
  describedBy?: string;
  /**
   * sx for the dialog
   */
  sx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  paperSx?: SxProps<Theme>;
  appbarSx?: SxProps<Theme>;
  toolbarSx?: SxProps<Theme>;
  dialogContentSx?: SxProps<Theme>;
  dialogActionsSx?: SxProps<Theme>;
}

/**
 * The dialog itself, non-responsive and rather generic
 */
function Dialog(props: IDialogProps) {
  return (
    <MDialog
      open={props.open}
      onClose={props.onClose}
      fullScreen={props.fullScreen}
      className={props.className}
      scroll="paper"
      TransitionProps={{
        onEntered: props.onOpen,
        onEntering: props.onOpening,
      }}
      sx={props.sx}
      PaperProps={{
        sx: props.paperSx,
        "aria-labelledby": props.labelledBy,
        "aria-describedby": props.describedBy,
      }}
    >
      {props.title ? <AppBar sx={props.appbarSx ? props.appbarSx : dialogStyles.appbar}>
        <Toolbar>
          <I18nRead id="close">
            {(i18nClose: string) => (
              <IconButton
                color="inherit"
                onClick={props.onClose}
                aria-label={i18nClose}
                size="large">
                <CloseIcon />
              </IconButton>
            )}
          </I18nRead>
          <Typography
            variant="h6"
            color="inherit"
            sx={props.titleSx ? props.titleSx : dialogStyles.title}
            id={props.useLabelledByInTitleId ? props.labelledBy : null}
          >
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar> : null}
      {props.children ? <DialogContent sx={props.dialogContentSx ? props.dialogContentSx : dialogStyles.content}>
        {props.children}
      </DialogContent> : null}
      {props.buttons ? <DialogActions sx={props.dialogActionsSx ? props.dialogActionsSx : dialogStyles.actions}>
        {props.buttons}
      </DialogActions> : null}
    </MDialog>
  );
};

/**
 * This is a responsive version of the dialog
 * it's able to go in fullscreen mode automatically
 * takes all the other props
 */
const DialogResponsive = function (props: IDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return <Dialog {...props} fullScreen={fullScreen} />
}

// both are exported
export { DialogResponsive, Dialog };
