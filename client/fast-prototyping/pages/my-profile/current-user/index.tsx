/**
 * Contains the section iformation for the current user in the fast prototyping profile
 * 
 * @packageDocumentation
 */

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

/**
 * The logout dialog styles
 */
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

/**
 * The logout dialog props
 */
interface LogoutDialogProps extends WithStyles<typeof LogoutDialogStyles> {
  /**
   * Whether it is currently open
   */
  isOpen: boolean;
  /**
   * When it closes
   */
  onClose: () => void;
}

/**
 * The logout dialog shows when the user attempts to logout from all devices
 * shows a warning about what this entails
 * @param props the logout dialog props
 * @returns a react element
 */
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

/**
 * The current user profile styles
 */
const currentUserProfileStyles = createStyles({
  container: {
    paddingTop: "1rem",
  },
  logoutButtons: {
    paddingTop: "0.2rem",
  },
});

/**
 * The current user profile contains the standard information for the current user and
 * allows to modify such, also allows to logout
 * @param props the current user profile props
 * @returns a react element
 */
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
