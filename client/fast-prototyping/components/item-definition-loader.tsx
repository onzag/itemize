import React from "react";
import { withStyles, WithStyles, Theme, createStyles, Typography, IconButton, CircularProgress } from "@material-ui/core";
import NItemDefinitionLoader from "../../components/item-definition/ItemDefinitionLoader";
import RefreshIcon from "@material-ui/icons/Refresh";
import { DelayDisplay } from "./util";
import I18nRead from "../../components/localization/I18nRead";
import I18nReadError from "../../components/localization/I18nReadError";

const itemDefinitionLoaderStyles = (theme: Theme) => createStyles({
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

interface ItemDefinitionLoaderProps extends WithStyles<typeof itemDefinitionLoaderStyles> {
  notFoundMessageKey?: string;
  blockedMessageKey?: string;
  notFoundImage?: string;
  blockedImage?: string;
  errorImage?: string;
  msWaitedToShowLoadingAnimation?: number;
  children: React.ReactNode;
  fullWidth?: boolean;
}

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
            errorComponent = <I18nRead id={props.notFoundMessageKey || "error.NOT_FOUND"} capitalize={true}/>;
            if (props.notFoundImage) {
              imageComponent = <img src={props.notFoundImage} />
            }
          } else if (blocked) {
            errorComponent = <I18nRead id={props.blockedMessageKey || "error.BLOCKED"} capitalize={true}/>;
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
            <DelayDisplay duration={700}>
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