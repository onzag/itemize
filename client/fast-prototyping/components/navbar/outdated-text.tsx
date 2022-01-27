/**
 * The outdated text similarly to the outdated dialog will pop up if the app is outdated
 * 
 * @module
 */

import React from "react";
import AppIsOutdatedChecker from "../../../components/outdated/AppIsOutdatedChecker";
import I18nRead from "../../../components/localization/I18nRead";
import UpdateIcon from "@mui/icons-material/Update";
import Button from "@mui/material/Button";

/**
 * The props are simple it just takes a click event
 * normally this will pop the outdated dialog or otherwise reload
 */
interface OutdatedTextProps {
  onClick: (e: React.MouseEvent) => void;
}

/**
 * Displays an outdated text in the navbar when the app is outdated
 * @param props the props for the outated text
 * @returns a react element
 */
export function OutdatedText(props: OutdatedTextProps) {
  return (
    <AppIsOutdatedChecker>
      {(isOutdated) => {
        if (isOutdated) {
          return (
            <I18nRead id="needs_update_navigation">
              {(i18nNeedsUpdate) => (
                <Button
                  variant="outlined"
                  color="inherit"
                  aria-label={i18nNeedsUpdate as string}
                  startIcon={<UpdateIcon />}
                  onClick={props.onClick}
                >
                  {i18nNeedsUpdate}
                </Button>
              )}
            </I18nRead>
          );
        }
        return null;
      }}
    </AppIsOutdatedChecker>
  );
}