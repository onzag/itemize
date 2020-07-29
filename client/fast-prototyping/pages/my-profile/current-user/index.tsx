import React, { useState } from "react";
import { Button, Container, createStyles, WithStyles, withStyles, 
  Box, Typography, ExitToAppIcon, ArrowBackIcon} from "../../../mui-core";
import Snackbar from "../../../components/snackbar";
import { CurrentUserProfileStandardInfo } from "./standard-info";
import { DialogResponsive } from "../../../components/dialog";
import I18nReadMany from "../../../../components/localization/I18nReadMany";
import { LogActioner } from "../../../../components/login/LogActioner";
import I18nRead from "../../../../components/localization/I18nRead";
import SubmitActioner from "../../../../components/item-definition/SubmitActioner";

const LogoutDialogStyles = createStyles({
  dialogContent: {
    padding: "1rem 0.5rem",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});

interface LogoutDialogProps extends WithStyles<typeof LogoutDialogStyles> {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutDialog = withStyles(LogoutDialogStyles)((props: LogoutDialogProps) => {
  return (
    <I18nReadMany data={
      [
        {
          id: "logout_all",
          capitalize: true,
        },
        {
          id: "logout_all_description",
        },
        {
          id: "cancel",
        },
      ]
    }>
      {(i18nTitle: string, i18nBody: string, i18nCancel: string) => (
        <DialogResponsive
          open={props.isOpen}
          onClose={props.onClose.bind(null, false)}
          title={i18nTitle}
          buttons={
            <Box className={props.classes.buttonBox}>
              <Button
                color="default"
                aria-label={i18nCancel}
                startIcon={<ArrowBackIcon />}
                onClick={props.onClose.bind(null, true)}
              >
                {i18nCancel}
              </Button>
              <LogActioner>
                {(actioner) => (
                  <Button
                    color="secondary"
                    aria-label={i18nTitle}
                    startIcon={<ExitToAppIcon />}
                    onClick={actioner.logoutAll}
                  >
                    {i18nTitle}
                  </Button>
                )}
              </LogActioner>
            </Box>
          }
        >
          <Typography variant="body1" className={props.classes.dialogContent}>{i18nBody}</Typography>
        </DialogResponsive>
      )}
    </I18nReadMany>
  )
})

const currentUserProfileStyles = createStyles({
  container: {
    paddingTop: "1rem",
  },
  logoutButtons: {
    paddingTop: "0.2rem",
  },
});

export const CurrentUserProfile = withStyles(currentUserProfileStyles)((props: WithStyles<typeof currentUserProfileStyles>) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <React.Fragment>
      <Container maxWidth="md" className={props.classes.container}>
        <CurrentUserProfileStandardInfo />
        <LogActioner>
          {(actioner) => {
            return (
              <Box className={props.classes.logoutButtons}>
                <Button onClick={actioner.logout} endIcon={<ExitToAppIcon />}>
                  <I18nRead capitalize={true} id="logout"/>
                </Button>
                <Button onClick={setIsDialogOpen.bind(this, true)} endIcon={<ExitToAppIcon />}>
                  <I18nRead capitalize={true} id="logout_all"/>
                </Button>
              </Box>
            );
          }}
        </LogActioner>
        <SubmitActioner>
          {(actioner) => (
            <React.Fragment>
              <Snackbar
                id="profile-update-error"
                severity="error"
                i18nDisplay={actioner.submitError}
                open={!!actioner.submitError}
                onClose={actioner.dismissError}
              />
              <Snackbar
                id="profile-update-success"
                severity="success"
                i18nDisplay="profile_updated_successfully"
                open={actioner.submitted}
                onClose={actioner.dismissSubmitted}
              />
            </React.Fragment>
          )}
        </SubmitActioner>
      </Container>
      <LogoutDialog isOpen={isDialogOpen} onClose={setIsDialogOpen.bind(this, false)}/>
    </React.Fragment>
  );
});