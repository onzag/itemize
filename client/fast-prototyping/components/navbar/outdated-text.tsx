import React from "react";
import { Badge, Button } from "@material-ui/core";
import { I18nRead } from "../../../components/localization";
import { AppIsOutdatedChecker } from "../../../components/outdated";
import UpdateIcon from "@material-ui/icons/Update"; 

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
                <Badge
                  badgeContent={1}
                  color="secondary"
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    aria-label={i18nNeedsUpdate as string}
                    startIcon={<UpdateIcon />}
                    onClick={props.onClick}
                  >
                    {i18nNeedsUpdate}
                  </Button>
                </Badge>
              )}
            </I18nRead>
          );
        }
        return null;
      }}
    </AppIsOutdatedChecker>
  );
}