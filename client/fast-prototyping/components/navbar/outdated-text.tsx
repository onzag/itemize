import React from "react";
import { Button } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update"; 
import AppIsOutdatedChecker from "../../../components/outdated/AppIsOutdatedChecker";
import I18nRead from "../../../components/localization/I18nRead";

interface OutdatedTextProps {
  onClick: (e: React.MouseEvent) => void;
}

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