import React from "react";
import {
  Typography,
  Icon,
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
  children: any;
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
          <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
            <Icon>close</Icon>
          </IconButton>
          <Typography variant="h6" color="inherit" className={props.classes.title}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent className={props.classes.content}>
        {props.children}
      </DialogContent>
      {props.buttons ? <DialogActions className={props.classes.actions}>
        {props.buttons}
      </DialogActions> : null}
    </MDialog>
  );
});

const DialogResponsive = withMobileDialog<IDialogProps>()(Dialog);
export { DialogResponsive };
