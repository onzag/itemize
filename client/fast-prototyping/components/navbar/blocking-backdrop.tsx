/**
 * The blocking backdrop is the component that appears when the app is blocked from an update
 * 
 * @module
 */

import React from "react";
import { styled, Theme } from "@mui/material/styles";
import { AppIsBlockedFromUpdate } from "../../../components/outdated/AppIsBlockedFromUpdate";
import I18nRead from "../../../components/localization/I18nRead";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * the blocking backdrop styles
 * @param theme the mui theme
 * @retuns a bunch of styles
 */
const blockingBackdropStyles = {
  backdrop: (theme: Theme) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    flexDirection: "column",
    padding: "2rem",
  }),
  backdropTextContainer: {
    fontSize: "0.95rem",
    textAlign: "center",
    paddingBottom: "2rem",
  },
};

// buggy typescript
const BackDropTextContainer = styled("div")(blockingBackdropStyles.backdropTextContainer as any);

/**
 * The blocking backdrop appears when the app is blocked from an update check AppIsBlockedFromUpdate component
 * to see when this appears
 * 
 * It is part of the navbar by default
 */
interface BlockingBackdropProps {
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
export function BlockingBackdrop(props: BlockingBackdropProps) {
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
          <Backdrop sx={blockingBackdropStyles.backdrop} open={isBlocked}>
            <BackDropTextContainer>
              <I18nRead id="blocked_update" />
            </BackDropTextContainer>
            <CircularProgress color="inherit" />
          </Backdrop>
        )
      }}
    </AppIsBlockedFromUpdate>
  );
}
