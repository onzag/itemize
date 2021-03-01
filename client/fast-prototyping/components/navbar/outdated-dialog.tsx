/**
 * A dialog that pops up when the app is outdated and asks for a refresh
 * 
 * @module
 */

import React from "react";
import { Button, Typography, withStyles, Theme, createStyles, WithStyles, UpdateIcon } from "../../mui-core";
import { DialogResponsive } from "../dialog";
import AppIsOutdatedChecker from "../../../components/outdated/AppIsOutdatedChecker";
import I18nReadMany from "../../../components/localization/I18nReadMany";

/**
 * The dialog styles
 */
const outdatedDialogStyles = createStyles({
  dialogContent: {
    padding: "1rem 0.5rem",
  },
});

/**
 * The outdated dialog props
 */
interface OutdatedDialogProps extends WithStyles<typeof outdatedDialogStyles> {
  /**
   * is open if it's outdated, basically will mean that is open if both this prop
   * and is outdated match as true
   */
  isOpenIfOutdated: boolean;
  /**
   * what to do on close
   */
  onClose: () => void;
}

/**
 * function that triggers to reload the app
 */
function reloadApp() {
  location.reload();
}

/**
 * The outdated dialog will pop up if the application is outdated and needs an update
 * @param props the outdated props, needs a flag to see if it will open when is outdated
 * @returns a react component
 */
export const OutdatedDialog = withStyles(outdatedDialogStyles)((props: OutdatedDialogProps) => {
  return (
    <AppIsOutdatedChecker>
      {(isOutdated) => {
        if (isOutdated) {
          return (
            <I18nReadMany
              data={[
                {
                  id: "needs_update_title",
                  capitalize: true,
                },
                {
                  id: "needs_update_content",
                },
                {
                  id: "needs_update_action",
                },
              ]}
            >
              {(needsUpdateTitle: string, needsUpdateContent: string, needsUpdateAction: string) => {
                return (
                  <DialogResponsive
                    title={needsUpdateTitle}
                    open={props.isOpenIfOutdated}
                    onClose={props.onClose}
                    buttons={
                      <Button
                        color="primary"
                        aria-label={needsUpdateAction}
                        startIcon={<UpdateIcon />}
                        onClick={reloadApp}
                      >
                        {needsUpdateAction}
                      </Button>
                    }
                  >
                    <Typography variant="body1" className={props.classes.dialogContent}>
                      {needsUpdateContent}
                    </Typography>
                  </DialogResponsive>
                );
              }}
            </I18nReadMany>
          );
        }
        return null;
      }}
    </AppIsOutdatedChecker>
  )
});