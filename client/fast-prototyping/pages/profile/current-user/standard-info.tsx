import React from "react";
import { IActionSubmitOptions } from "../../../../providers/item-definition";
import { I18nReadMany, I18nRead } from "../../../../components/localization";
import { Entry, Reader } from "../../../../components/property";
import { Button, Box, Paper, createStyles, withStyles, WithStyles, Divider } from "@material-ui/core";
import { SubmitButton } from "../../../components/buttons";
import { DifferingPropertiesRetriever } from "../../../../components/item-definition";
import { DialogResponsive } from "../../../components/dialog";
import DoneIcon from "@material-ui/icons/Done";
import { IPropertyDefinitionState } from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { Alert, AlertTitle } from "@material-ui/lab";
import DoneOutline from "@material-ui/icons/DoneOutline";
import { AvatarRenderer } from "../../../components/avatar";

interface CustomConfirmationDialogProps {
  isActive: boolean;
  onClose: (continueWithProcess: boolean) => void;
}

function CustomConfirmationDialog(props: CustomConfirmationDialogProps) {
  return (
    <I18nReadMany data={
      [
        {
          id: "title",
          policyType: "edit",
          policyName: "REQUIRES_PASSWORD_CONFIRMATION",
        },
        {
          id: "ok",
        },
      ]
    }>
      {(i18nTitle: string, i18nOk: string) => (
        <DialogResponsive
          open={props.isActive}
          onClose={props.onClose.bind(null, false)}
          title={i18nTitle}
          buttons={
            <Button
              color="primary"
              aria-label={i18nOk}
              startIcon={<DoneIcon />}
              onClick={props.onClose.bind(null, true)}
            >
              {i18nOk}
            </Button>
          }
        >
          <Entry id="password" policyName="REQUIRES_PASSWORD_CONFIRMATION" policyType="edit" />
        </DialogResponsive>
      )}
    </I18nReadMany>
  )
}

const currentUserProfileStandardInfoStyles = createStyles({
  paper: {
    padding: "1rem",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1.2rem",
  }
});

export const CurrentUserProfileStandardInfo = withStyles(currentUserProfileStandardInfoStyles)
((props: WithStyles<typeof currentUserProfileStandardInfoStyles>) => {
  return (
    <Paper className={props.classes.paper}>
      <Entry id="profile_picture" renderer={AvatarRenderer}/>
      <Entry id="username" />
      <Reader id="email">
        {(email: string, emailState: IPropertyDefinitionState) => {
          const missesEmail = !(emailState && emailState.stateAppliedValue);
          if (missesEmail) {
            return (
              <Alert severity="error">
                <AlertTitle>
                  <I18nRead capitalize={true} id="missing_email_warning_title"/>
                </AlertTitle>
                <I18nRead id="missing_email_warning"/>
              </Alert>
            )
          }
          return (
            <Reader id="e_validated">
              {(eValidated: boolean, eValidatedState: IPropertyDefinitionState) => {
                const missesValidation = !(eValidatedState && eValidatedState.stateAppliedValue);
                if (missesValidation) {
                  return (
                    <Alert severity="error">
                      <AlertTitle>
                        <I18nRead capitalize={true} id="missing_email_validation_warning_title"/>
                      </AlertTitle>
                      <I18nRead id="missing_email_validation_warning"/>
                      <Button>
                        <I18nRead capitalize={true} id="missing_email_validation_warning_action"/>
                      </Button>
                    </Alert>
                  )
                }

                return null;
              }}
            </Reader>
          );
        }}
      </Reader>
      <Entry id="email" />
      <Divider />
      <Box className={props.classes.buttonBox}>
        <DifferingPropertiesRetriever mainProperties={["profile_picture", "username", "email"]}>
          {(differingProperties) => {
            const options: IActionSubmitOptions = {
              properties: differingProperties,
              unpokeAfterAny: true,
            }
            if (
              differingProperties.includes("username") ||
              differingProperties.includes("email")
            ) {
              options.policies = [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]];
              options.policiesToCleanOnAny = [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]];
            }

            let CustomConfirmationComponent = null;
            if (options.policies) {
              CustomConfirmationComponent = CustomConfirmationDialog;
            }
            return (
              <SubmitButton
                i18nId="update_profile"
                options={options}
                CustomConfirmationComponent={CustomConfirmationComponent}
                buttonColor="primary"
                buttonStartIcon={<DoneOutline />}
                buttonVariant="contained"
              />
            );
          }}
        </DifferingPropertiesRetriever>
      </Box>
    </Paper>
  )
});