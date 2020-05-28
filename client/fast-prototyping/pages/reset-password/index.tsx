import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { Avatar } from "../../components/avatar";
import { createStyles, withStyles, WithStyles, Typography, Paper, Container, Divider, Button } from "@material-ui/core";
import { ProgressingElement, SlowLoadingElement } from "../../components/util";
import DoneIcon from "@material-ui/icons/Done";
import Snackbar from "../../components/snackbar";
import UserActioner, { IUserActionerArg } from "../../../components/user/UserActioner";
import { localizedRedirectTo } from "../../../components/navigation";
import LocationStateReader from "../../../components/navigation/LocationStateReader";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";
import Reader from "../../../components/property/Reader";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import Entry from "../../../components/property/Entry";

const resetPasswordStyles = createStyles({
  container: {
    paddingTop: "1rem",
  },
  paper: {
    padding: "1rem",
  },
  username: {
    fontWeight: 300,
    width: "100%",
    marginTop: "1rem",
    textAlign: "center",
  },
  recoverTitle: {
    fontWeight: 300,
    margin: "1rem 0",
    width: "100%",
    textAlign: "center",
  },
  divider: {
    margin: "1rem 0",
  },
});

async function resetPassword(token: string, actioner: IUserActionerArg) {
  const result = await actioner.resetPassword(token, true);
  if (!result.error) {
    localizedRedirectTo("/?msg=reset_password_success&msgtitle=reset_password", null, true);
  }
}

export const ResetPassword = withStyles(resetPasswordStyles)((props: WithStyles<typeof resetPasswordStyles>) => {
  return (
    <SlowLoadingElement id="reset-password">
      <LocationStateReader
        defaultState={{token: null, id: null} as {token: string, id: string}}
        stateIsInQueryString={true}
      >
        {(state, setState) => {
          const userId = parseInt(state.id, 10) || null;

          if (!userId) {
            return null;
          }

          return (
          <ModuleProvider module="users">
            <ItemDefinitionProvider
              itemDefinition="user"
              properties={[
                "username",
                "profile_picture",
                "password",
                "role",
              ]}
              forId={userId}
              cleanOnDismount={{
                propertiesToCleanOnAny: ["password"],
              }}
            >
              <I18nRead id="reset_password" capitalize={true}>
                {(i18nResetPassword: string) => (
                  <React.Fragment>
                    <TitleSetter>
                      {i18nResetPassword}
                    </TitleSetter>
                    <Container maxWidth="md" className={props.classes.container}>
                      <Paper className={props.classes.paper}>
                        <ItemDefinitionLoader>
                          <Avatar size="large" fullWidth={true}/>
                          <Reader id="username">
                            {(username: string) => (
                              <Typography variant="h4" className={props.classes.username}>{username}</Typography>
                            )}
                          </Reader>
                        </ItemDefinitionLoader>
                        <Divider className={props.classes.divider}/>
                        <Typography variant="h6" className={props.classes.recoverTitle}>{i18nResetPassword}</Typography>
                        <I18nReadMany data={[
                          {id: "reset_password_field_alt_label"},
                          {id: "reset_password_field_alt_placeholder"},
                          {id: "reset_password_message"},
                        ]}>
                          {(i18nAltLabel: string, i18nAltPlaceholder: string, i18nAltDescription: string) => (
                            <Entry
                              id="password"
                              altLabel={i18nAltLabel}
                              altPlaceholder={i18nAltPlaceholder}
                              altDescription={i18nAltDescription}
                              autoFocus={true}
                            />
                          )}
                        </I18nReadMany>
                        <UserActioner>
                          {(actioner) => (
                            <React.Fragment>
                              <I18nRead id="reset_password_action">
                                {(i18nUpdatePassword: string) => (
                                  <ProgressingElement isProgressing={actioner.statefulOnProgress} fullWidth={true}>
                                    <Button
                                      aria-label={i18nUpdatePassword}
                                      fullWidth={true}
                                      size="large"
                                      variant="contained"
                                      color="primary"
                                      endIcon={<DoneIcon/>}
                                      onClick={resetPassword.bind(null, state.token, actioner)}
                                    >
                                      {i18nUpdatePassword}
                                    </Button>
                                  </ProgressingElement>
                                )}
                              </I18nRead>
                              <Snackbar
                                severity="error"
                                i18nDisplay={actioner.statefulError}
                                open={!!actioner.statefulError}
                                onClose={actioner.dismissStatefulError}
                              />
                              <Snackbar
                                severity="success"
                                i18nDisplay=""
                                open={!!actioner.statefulSuccess}
                                onClose={actioner.dismissStatefulSuccess}
                              />
                            </React.Fragment>
                          )}
                        </UserActioner>
                      </Paper>
                    </Container>
                  </React.Fragment>
                )}
              </I18nRead>
            </ItemDefinitionProvider>
          </ModuleProvider>
          )
        }}
      </LocationStateReader>
    </SlowLoadingElement>
  );
});