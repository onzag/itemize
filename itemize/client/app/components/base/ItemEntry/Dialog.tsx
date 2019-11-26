import React from "react";
import {
  Typography,
  Icon,
  withMobileDialog,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

interface IItemEntryDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: any;
  fullScreen?: boolean;
  buttons?: React.ReactNode;
  className?: string;
}

export default function ItemEntryDialog(props: IItemEntryDialogProps) {
  return (
    <Dialog
      classes={{
        paper: `item-entry-dialog ${props.className ? props.className : ""}`,
      }}
      open={props.open}
      onClose={props.onClose}
      fullScreen={props.fullScreen}
      scroll="paper"
    >
      <AppBar className="item-entry-dialog-appbar">
        <Toolbar>
          <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
            <Icon>close</Icon>
          </IconButton>
          <Typography variant="h6" color="inherit" className="item-entry-dialog-title">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent className="item-entry-dialog-content">
        {props.children}
      </DialogContent>
      {props.buttons ? <DialogActions className="item-entry-dialog-actions">
        {props.buttons}
      </DialogActions> : null}
    </Dialog>
  );
}

const ItemEntryDialogResponsive = withMobileDialog<IItemEntryDialogProps>()(ItemEntryDialog);
export {ItemEntryDialogResponsive};
