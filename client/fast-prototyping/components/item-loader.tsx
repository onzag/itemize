/**
 * Utilities for loading item definitions
 * 
 * @module
 */

import React from "react";
import NItemLoader from "../../components/item/ItemLoader";
import { DelayDisplay } from "../../components/util";
import I18nRead from "../../components/localization/I18nRead";
import I18nReadError from "../../components/localization/I18nReadError";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import { styled, SxProps } from "@mui/material/styles";

/**
 * The item definition loader styles
 */
const itemLoaderStyles = {
  flexingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  circularProgress: {
    width: "40px",
    height: "40px",
    position: "absolute",
    left: "50%",
    marginLeft: "-20px",
    top: "50%",
    marginTop: "-20px",
  },
};

// buggy typescript
const FlexingContainer = styled("div")(itemLoaderStyles.flexingContainer as any);

interface IContainer {
  fullWidth?: boolean,
}

const Container = styled("div", {
  shouldForwardProp: (prop) => prop !== "fullWidth"
})<IContainer>(({ fullWidth }) => ({
  position: "relative",
  width: fullWidth ? "100%" : "auto",
}));

/**
 * the props for the item definition loader
 */
interface ItemLoaderProps {
  /**
   * An id to pass to the i18n reader for not found
   * defaults to "error.NOT_FOUND"
   */
  notFoundMessageI18nId?: string;
  /**
   * An id to pass to the i18n reader for when the item
   * is blocked
   * defaults to "error.BLOCKED"
   */
  blockedMessageI18nId?: string;
  /**
   * an image to display when the item is not found
   */
  notFoundImage?: string;
  /**
   * an image to display when the item is blocked
   */
  blockedImage?: string;
  /**
   * an image to display on error (note that the error)
   * is variable, so there's no errorI18nId, the error itself
   * comes with that
   */
  errorImage?: string;
  /**
   * A number of milliseconds to wait to show the loading animation
   * we don't want flickering, by default 700ms
   */
  msWaitedToShowLoadingAnimation?: number;
  /**
   * Whether the children must wait until the item definition component is fully loaded
   * in order to mount
   */
  childrenMustWaitUntilItsLoaded?: boolean;
  /**
   * The children inside, this data will not be shown if an error
   * not found, or blocked; but it will if loading, so basically a wireframe
   * is there
   */
  children: React.ReactNode;
  /**
   * Whether to use 100% width
   */
  fullWidth?: boolean;
  /**
   * The class for the container
   */
  className?: string;
  /**
   * class name on error
   */
  errorClassName?: string;
  /**
   * sx props
   */
  sx?: SxProps;
  /**
   * sx on error
   */
  errorSx?: SxProps;
}

/**
 * The item definition loader allows to handle cases of not found, blocked or errors in a nice way
 * @param props the loader props
 * @returns a react component
 */
export function ItemLoader(props: ItemLoaderProps) {
  return (
    <NItemLoader>
      {(arg) => {
        const notFound = arg.notFound;
        const blocked = arg.blocked;
        const hasBlockedAccess = arg.hasBlockedAccess;
        const error = arg.error;
        if (
          notFound ||
          (blocked && !hasBlockedAccess) ||
          error
        ) {
          let errorComponent = null;
          let imageComponent = null;
          if (notFound) {
            errorComponent = <I18nRead i18nId={props.notFoundMessageI18nId || "error.NOT_FOUND"} capitalize={true}/>;
            if (props.notFoundImage) {
              imageComponent = <img src={props.notFoundImage} />
            }
          } else if (blocked) {
            errorComponent = <I18nRead i18nId={props.blockedMessageI18nId || "error.BLOCKED"} capitalize={true}/>;
            if (props.blockedImage) {
              imageComponent = <img src={props.blockedImage} />
            }
          } else if (error) {
            errorComponent = <I18nReadError error={arg.error} capitalize={true}/>;
            if (props.errorImage) {
              imageComponent = <img src={props.errorImage} />
            }
          }
          return (
            <FlexingContainer className={props.errorClassName} sx={props.errorSx}>
              <Typography>{errorComponent}</Typography>
              {imageComponent}
              <I18nRead i18nId="reload">
                {(i18nReload: string) => (
                  <IconButton color="inherit" onClick={arg.reload} aria-label={i18nReload} size="large">
                    <RefreshIcon />
                  </IconButton>
                )}
              </I18nRead>
            </FlexingContainer>
          );
        }
    
        return <Container fullWidth={props.fullWidth} className={props.className} sx={props.sx}>
          {
            arg.loading ? 
            <DelayDisplay duration={props.msWaitedToShowLoadingAnimation || 700}>
              <CircularProgress sx={itemLoaderStyles.circularProgress}/>
            </DelayDisplay> :
            null
          }
          {props.childrenMustWaitUntilItsLoaded && arg.loading ? null : props.children}
        </Container>;
      }}
    </NItemLoader>
  );
};
