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
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { I18nRead } from "../../components/localization";

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
  content: {},
  actions: {
    display: "flex",
    borderTop: "solid 1px #ccc",
    paddingTop: "10px",
  },
});

interface IDialogProps extends WithStyles<typeof dialogStyles> {
  open: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  fullScreen?: boolean;
  buttons?: React.ReactNode;
  className?: string;
}

export const Dialog = withStyles(dialogStyles)((props: IDialogProps) => {
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

const DialogResponsive = withMobileDialog<IDialogProps>()(Dialog);
export { DialogResponsive };