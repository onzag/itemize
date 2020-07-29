/**
 * Utilities for loading item definitions
 * 
 * @packageDocumentation
 */

import React from "react";
import { withStyles, WithStyles, Theme, createStyles, Typography, IconButton, CircularProgress, RefreshIcon } from "../mui-core";
import NItemDefinitionLoader from "../../components/item-definition/ItemDefinitionLoader";
import { DelayDisplay } from "../../components/util";
import I18nRead from "../../components/localization/I18nRead";
import I18nReadError from "../../components/localization/I18nReadError";

/**
 * The item definition loader styles
 */
const itemDefinitionLoaderStyles = createStyles({
  container: {
    position: "relative",
  },
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
  fullWidthContainer: {
    width: "100%",
  }
});

/**
 * the props for the item definition loader
 */
interface ItemDefinitionLoaderProps extends WithStyles<typeof itemDefinitionLoaderStyles> {
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
   * The children inside, this data will not be shown if an error
   * not found, or blocked; but it will if loading, so basically a wireframe
   * is there
   */
  children: React.ReactNode;
  /**
   * Whether to use 100% width
   */
  fullWidth?: boolean;
}

/**
 * The item definition loader allows to handle cases of not found, blocked or errors in a nice way
 * @param props the loader props
 * @returns a react component
 */
export const ItemDefinitionLoader = withStyles(itemDefinitionLoaderStyles)((props: ItemDefinitionLoaderProps) => {
  return (
    <NItemDefinitionLoader>
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
            errorComponent = <I18nRead id={props.notFoundMessageI18nId || "error.NOT_FOUND"} capitalize={true}/>;
            if (props.notFoundImage) {
              imageComponent = <img src={props.notFoundImage} />
            }
          } else if (blocked) {
            errorComponent = <I18nRead id={props.blockedMessageI18nId || "error.BLOCKED"} capitalize={true}/>;
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
            <div className={props.classes.flexingContainer}>
              <Typography>{errorComponent}</Typography>
              {imageComponent}
              <I18nRead id="reload">
                {(i18nReload: string) => (
                  <IconButton color="inherit" onClick={arg.reload} aria-label={i18nReload}>
                    <RefreshIcon />
                  </IconButton>
                )}
              </I18nRead>
            </div>
          );
        }
    
        return <div className={`${props.classes.container} ${props.fullWidth ? props.classes.fullWidthContainer : ""}`}>
          {
            arg.loading ? 
            <DelayDisplay duration={props.msWaitedToShowLoadingAnimation || 700}>
              <CircularProgress className={props.classes.circularProgress}/>
            </DelayDisplay> :
            null
          }
          {props.children}
        </div>;
      }}
    </NItemDefinitionLoader>
  )
});
