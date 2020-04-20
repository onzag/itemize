import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { UserDataRetriever } from "../../../components/user";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { TitleSetter } from "../../../components/util";
import { I18nRead, I18nReadMany } from "../../../components/localization";
import { SlowLoadingElement } from "../../components/util";
import { Paper, createStyles, withStyles, WithStyles, Container, Divider, Box } from "@material-ui/core";
import { Entry } from "../../../components/property";
import Snackbar from "../../components/snackbar";
import { SubmitActioner } from "../../../components/item-definition";
import DoneOutline from "@material-ui/icons/DoneOutline";
import { SubmitButton } from "../../components/buttons";

const changePasswordStyles = createStyles({
  paper: {
    padding: "1rem",
  },
  container: {
    paddingTop: "1rem",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1.2rem",
  },
});

export const ChangePassword = withStyles(changePasswordStyles)((props: WithStyles<typeof changePasswordStyles>) => {
  return (
    <SlowLoadingElement id="change-password">
      <UserDataRetriever>
        {(userData) => {
          return (
            <ModuleProvider module="users">
              <ItemDefinitionProvider
                itemDefinition="user"
                properties={[
                  "password",
                ]}
                forId={userData.id}
                assumeOwnership={true}
                includePolicies={true}
                disableExternalChecks={true}
                avoidLoading={true}
              >
                <I18nRead id="change_password" capitalize={true}>
                  {(i18nChangePassword: string) => {
                    return (
                      <TitleSetter>
                        {i18nChangePassword}
                      </TitleSetter>
                    );
                  }}
                </I18nRead>
                <ItemDefinitionLoader>
                  <Container maxWidth="md" className={props.classes.container}>
                    <Paper className={props.classes.paper}>
                      <I18nReadMany data={[
                        {id: "change_password_current_alt_label"},
                        {id: "change_password_current_alt_placeholder"},
                        {id: "change_password_new_alt_label"},
                        {id: "change_password_new_alt_placeholder"},
                      ]}>
                        {(
                          i18nAltCurrentPasswordLabel: string,
                          i18nAltCurrentPasswordPlaceholder: string,
                          i18nAltNewPasswordLabel: string,
                          i18nAltNewPasswordPlaceholder: string,
                        ) => (
                          <form>
                            <Entry
                              id="password"
                              policyType="edit"
                              policyName="REQUIRES_PASSWORD_CONFIRMATION"
                              altLabel={i18nAltCurrentPasswordLabel}
                              altPlaceholder={i18nAltCurrentPasswordPlaceholder}
                            />
                            <Entry
                              id="password"
                              altLabel={i18nAltNewPasswordLabel}
                              altPlaceholder={i18nAltNewPasswordPlaceholder}
                            />
                          </form>
                        )}
                      </I18nReadMany>

                      <Divider />
      
                      <Box className={props.classes.buttonBox}>
                      <SubmitButton
                        i18nId="change_password"
                        options={{
                          properties: ["password"],
                          propertiesToCleanOnSuccess: ["password"],
                          policies: [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]],
                          policiesToCleanOnSuccess: [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]],
                          unpokeAfterAny: true,
                        }}
                        buttonColor="primary"
                        buttonStartIcon={<DoneOutline />}
                        buttonVariant="contained"
                        redirectOnSuccess="/my-profile?msg=change_password_success&msgtitle=change_password"
                        redirectGoBack={true}
                        redirectReplace={true}
                      />
                      </Box>
                    </Paper>
                  </Container>
                </ItemDefinitionLoader>
                <SubmitActioner>
                  {(actioner) => (
                    <Snackbar
                      severity="error"
                      i18nDisplay={actioner.submitError}
                      open={!!actioner.submitError} onClose={actioner.dismissError}
                    />
                  )}
                </SubmitActioner>
              </ItemDefinitionProvider>
            </ModuleProvider>
          )
        }}
      </UserDataRetriever>
    </SlowLoadingElement>
  );
});