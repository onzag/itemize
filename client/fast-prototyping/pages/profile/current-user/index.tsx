import React from "react";
import { I18nRead } from "../../../../components/localization";
import { Button, Container, createStyles, WithStyles, withStyles} from "@material-ui/core";
import { LogActioner } from "../../../../components/login";
import { SubmitActioner } from "../../../../components/item-definition";
import Snackbar from "../../../components/snackbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { CurrentUserProfileStandardInfo } from "./standard-info";

const currentUserProfileStyles = createStyles({
  container: {
    paddingTop: "1rem",
  },
});

export const CurrentUserProfile = withStyles(currentUserProfileStyles)((props: WithStyles<typeof currentUserProfileStyles>) => {
  return (
    <React.Fragment>
      <Container maxWidth="md" className={props.classes.container}>
        <CurrentUserProfileStandardInfo />
        <LogActioner>
          {(actioner) => {
            return (
              <React.Fragment>
                <Button onClick={actioner.logout} endIcon={<ExitToAppIcon />}>
                  <I18nRead capitalize={true} id="logout"/>
                </Button>
                <Button onClick={actioner.logoutAll}>
                  <I18nRead capitalize={true} id="logout_all"/>
                </Button>
              </React.Fragment>
            );
          }}
        </LogActioner>
        <SubmitActioner>
          {(actioner) => (
            <React.Fragment>
              <Snackbar i18nDisplay={actioner.submitError} open={!!actioner.submitError} onClose={actioner.dismissError} />
              <Snackbar i18nDisplay="profile_updated_succesfully" open={actioner.submitted} onClose={actioner.dismissSubmitted} />
            </React.Fragment>
          )}
        </SubmitActioner>
      </Container>
    </React.Fragment>
  );
});