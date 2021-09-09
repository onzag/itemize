/**
 * The blocking backdrop is the component that appears when the app is blocked from an update
 * 
 * @module
 */

import React from "react";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import { AppIsBlockedFromUpdate } from "../../../components/outdated/AppIsBlockedFromUpdate";
import I18nRead from "../../../components/localization/I18nRead";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * the blocking backdrop styles
 * @param theme the mui theme
 * @retuns a bunch of styles
 */
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

/**
 * The blocking backdrop appears when the app is blocked from an update check AppIsBlockedFromUpdate component
 * to see when this appears
 * 
 * It is part of the navbar by default
 */
interface BlockingBackdropProps extends WithStyles<typeof blockingBackdropStyles> {
  /**
   * Whether it is excluded and won't render
   */
  exclude?: boolean;
}

/**
 * The blocking backdrop fast prototyping class which appears when the app is blocked
 * from an update check AppIsBlockedFromUpdate component to see when this appears
 * 
 * it is part of the navbar by default
 * @param props the props for the blocking backdrop
 * @returns a react component
 */
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