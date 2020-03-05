import React from "react";
import { Button, Typography, withStyles, Theme, createStyles, WithStyles } from "@material-ui/core";
import { I18nReadMany } from "../../../components/localization";
import { AppIsOutdatedChecker } from "../../../components/outdated";
import { DialogResponsive } from "../dialog";
import UpdateIcon from "@material-ui/icons/Update";

const outdatedDialogStyles = (theme: Theme) => createStyles({
  dialogContent: {
    padding: "1rem 0.5rem",
  },
});

interface OutdatedDialogProps extends WithStyles<typeof outdatedDialogStyles> {
  isOpenIfOutdated: boolean;
  onClose: () => void;
}

function reloadApp() {
  location.reload();
}

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