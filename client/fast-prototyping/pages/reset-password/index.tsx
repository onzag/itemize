import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { UserActioner, IUserActionerArg } from "../../../components/user";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { TitleSetter } from "../../../components/util";
import { I18nRead, I18nReadMany } from "../../../components/localization";
import { LocationStateReader, localizedRedirectTo } from "../../../components/navigaton";
import { Avatar } from "../../components/avatar";
import { Reader, Entry } from "../../../components/property";
import { createStyles, withStyles, WithStyles, Typography, Paper, Container, Divider, Button } from "@material-ui/core";
import { ProgressingElement } from "../../components/util";
import DoneIcon from "@material-ui/icons/Done";
import Snackbar from "../../components/snackbar";

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
    setTimeout(() => {
      localizedRedirectTo("/");
    }, 3000);
  }
}

export const ResetPassword = withStyles(resetPasswordStyles)((props: WithStyles<typeof resetPasswordStyles>) => {
  return (
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
            ]}
            forId={userId}
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
                        <Avatar large={true}/>
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
                              i18nDisplay={actioner.statefulError}
                              open={!!actioner.statefulError}
                              onClose={actioner.dismissStatefulError}
                            />
                            <Snackbar
                              i18nDisplay="reset_password_success"
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
  );
});