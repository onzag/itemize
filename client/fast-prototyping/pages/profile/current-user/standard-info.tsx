import React from "react";
import { IActionSubmitOptions } from "../../../../providers/item-definition";
import { I18nReadMany, I18nRead } from "../../../../components/localization";
import { Entry, Reader } from "../../../../components/property";
import { Button, Box, Paper, createStyles, withStyles, WithStyles, Divider, CircularProgress } from "@material-ui/core";
import { SubmitButton } from "../../../components/buttons";
import { DifferingPropertiesRetriever } from "../../../../components/item-definition";
import { DialogResponsive } from "../../../components/dialog";
import DoneIcon from "@material-ui/icons/Done";
import { IPropertyDefinitionState } from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { Alert, AlertTitle } from "@material-ui/lab";
import DoneOutline from "@material-ui/icons/DoneOutline";
import MailOutline from "@material-ui/icons/MailOutline";
import { AvatarRenderer } from "../../../components/avatar";
import { UserActioner } from "../../../../components/user";
import Snackbar from "../../../components/snackbar";
import { LanguagePicker } from "../../../components/language-picker";
import { CountryPicker } from "../../../components/country-picker";
import { CurrencyPicker } from "../../../components/currency-picker";

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
  },
  pickers: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alertButtonValidateEmailContainer: {
    paddingTop: "0.75rem",
  },
  alertButtonValidateEmailProgressWrapper: {
    position: "relative",
    display: "inline-block",
  },
  alertButtonValidateEmailProgressElement: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  emailInButton: {
    textTransform: "none",
    opacity: 0.7,
  },
});

export const CurrentUserProfileStandardInfo = withStyles(currentUserProfileStandardInfoStyles)
((props: WithStyles<typeof currentUserProfileStandardInfoStyles>) => {
  return (
    <Paper className={props.classes.paper}>
      <Entry id="profile_picture" renderer={AvatarRenderer}/>
      <div className={props.classes.pickers}>
        <LanguagePicker />
        <CountryPicker />
        <CurrencyPicker />
      </div>
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
                      <div className={props.classes.alertButtonValidateEmailContainer}>
                        <UserActioner>
                          {(actioner) => (
                            <React.Fragment>
                              <div className={props.classes.alertButtonValidateEmailProgressWrapper}>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  endIcon={<MailOutline/>}
                                  onClick={actioner.sendValidateEmail}
                                  disabled={actioner.statefulOnProgress}
                                >
                                  <I18nRead capitalize={true} id="missing_email_validation_warning_action"/>
                                  <i className={props.classes.emailInButton}>&nbsp;{emailState.stateAppliedValue}</i>
                                </Button>
                                {
                                  actioner.statefulOnProgress ?
                                  <CircularProgress size={24} className={props.classes.alertButtonValidateEmailProgressElement}/> :
                                  null
                                }
                              </div>
                              <Snackbar
                                i18nDisplay={actioner.statefulError}
                                open={!!actioner.statefulError}
                                onClose={actioner.dismissStatefulError}
                              />
                              <Snackbar
                                i18nDisplay="missing_email_validation_warning_action_success"
                                open={actioner.statefulSuccess}
                                onClose={actioner.dismissStatefulSuccess}
                              />
                            </React.Fragment>
                          )}
                        </UserActioner>
                      </div>
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