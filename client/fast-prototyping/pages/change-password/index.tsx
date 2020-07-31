/**
 * Fast prototyping page for changing the password
 * 
 * @packageDocumentation
 */

import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { Paper, createStyles, withStyles, WithStyles, Container, Divider, Box, DoneOutlineIcon } from "../../mui-core";
import Snackbar from "../../components/snackbar";
import { SubmitButton } from "../../components/buttons";
import UserDataRetriever from "../../../components/user/UserDataRetriever";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import Entry from "../../../components/property/Entry";
import SubmitActioner from "../../../components/item-definition/SubmitActioner";

/**
 * Styles for the change password page
 */
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

/**
 * A simple page designed to provide functionality to change the password
 * @param props the page props
 * @returns a react element
 */
export const ChangePassword = withStyles(changePasswordStyles)((props: WithStyles<typeof changePasswordStyles>) => {
  return (
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
                      { id: "change_password_current_alt_label" },
                      { id: "change_password_current_alt_placeholder" },
                      { id: "change_password_new_alt_label" },
                      { id: "change_password_new_alt_placeholder" },
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
                              autoFocus={true}
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
                        buttonStartIcon={<DoneOutlineIcon />}
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
                    id="change-password-error"
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
  );
});
