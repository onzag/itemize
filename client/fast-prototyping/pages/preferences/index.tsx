import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { Paper, createStyles, withStyles, WithStyles, Container, Divider, Box,
  NotificationsIcon, MenuBookIcon, DoneOutlineIcon, PersonPinIcon } from "../../mui-core";
import Snackbar from "../../components/snackbar";
import { SubmitButton } from "../../components/buttons";
import { NeedsSubmitPrompt } from "../../components/needs-submit-prompt";
import UserDataRetriever from "../../../components/user/UserDataRetriever";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";
import Entry from "../../../components/property/Entry";
import SubmitActioner from "../../../components/item-definition/SubmitActioner";

const preferencesStyles = createStyles({
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

export const Preferences = withStyles(preferencesStyles)((props: WithStyles<typeof preferencesStyles>) => {
  return (
    <UserDataRetriever>
      {(userData) => {
        const properties = [
          "e_notifications",
          "e_newsletter",
          "address",
        ];
        return (
          <ModuleProvider module="users">
            <ItemDefinitionProvider
              itemDefinition="user"
              properties={properties}
              forId={userData.id}
              assumeOwnership={true}
              includePolicies={false}
              disableExternalChecks={true}
              longTermCaching={true}
              markForDestructionOnLogout={true}
              cleanOnDismount={{
                propertiesToRestoreOnAny: properties,
              }}
            >
              <I18nRead id="preferences" capitalize={true}>
                {(i18nPreferences: string) => {
                  return (
                    <TitleSetter>
                      {i18nPreferences}
                    </TitleSetter>
                  );
                }}
              </I18nRead>
              <NeedsSubmitPrompt
                properties={properties}
                i18nConfirm="update_your_preferences"
                confirmationSubmitOptions={{
                  properties: properties,
                  differingOnly: true,
                }}
              />
              <ItemDefinitionLoader>
                <Container maxWidth="md" className={props.classes.container}>
                  <Paper className={props.classes.paper}>
                    <Entry id="e_notifications" icon={<NotificationsIcon />} />
                    <Entry id="e_newsletter" icon={<MenuBookIcon />} />

                    <Entry id="address" icon={<PersonPinIcon />} rendererArgs={{ descriptionAsAlert: true }} />

                    <Divider />

                    <Box className={props.classes.buttonBox}>
                      <SubmitButton
                        i18nId="update_your_preferences"
                        options={{
                          properties: ["e_notifications", "e_newsletter", "address"],
                          differingOnly: true,
                          unpokeAfterAny: true,
                        }}
                        buttonColor="primary"
                        buttonStartIcon={<DoneOutlineIcon />}
                        buttonVariant="contained"
                      />
                    </Box>
                  </Paper>
                </Container>
              </ItemDefinitionLoader>
              <SubmitActioner>
                {(actioner) => (
                  <React.Fragment>
                    <Snackbar
                      severity="error"
                      i18nDisplay={actioner.submitError}
                      open={!!actioner.submitError}
                      onClose={actioner.dismissError}
                    />
                    <Snackbar
                      severity="success"
                      i18nDisplay="preferences_updated_successfully"
                      open={actioner.submitted}
                      onClose={actioner.dismissSubmitted}
                    />
                  </React.Fragment>
                )}
              </SubmitActioner>
            </ItemDefinitionProvider>
          </ModuleProvider>
        )
      }}
    </UserDataRetriever>
  );
});