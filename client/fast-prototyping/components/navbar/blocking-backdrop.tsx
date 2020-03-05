import React from "react";
import { createStyles, WithStyles, withStyles, Theme } from "@material-ui/core";
import { I18nRead } from "../../../components/localization";
import { AppIsBlockedFromUpdate } from "../../../components/outdated";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const blockingBackdropStyles = (theme: Theme) => createStyles({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    flexDirection: "column",
    padding: "2rem",
  },
  backdropTextContainer: {
    fontSize: "0.95rem",
    textAlign: "center",
    paddingBottom: "2rem",
  },
});

interface BlockingBackdropProps extends WithStyles<typeof blockingBackdropStyles> {
  exclude?: boolean;
}

export const BlockingBackdrop = withStyles(blockingBackdropStyles)((props: BlockingBackdropProps) => {
  if (props.exclude) {
    return null;
  }

  return (
    <AppIsBlockedFromUpdate>
      {(isBlocked) => {
        if (!isBlocked) {
          return null;
        }
        return (
          <Backdrop className={props.classes.backdrop} open={isBlocked}>
            <div className={props.classes.backdropTextContainer}>
              <I18nRead id="blocked_update" />
            </div>
            <CircularProgress color="inherit" />
          </Backdrop>
        )
      }}
    </AppIsBlockedFromUpdate>
  );
})