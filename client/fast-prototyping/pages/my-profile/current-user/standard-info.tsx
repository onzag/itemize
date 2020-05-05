import React from "react";
import { IActionSubmitOptions } from "../../../../providers/item-definition";
import { Button, Box, Paper, createStyles, withStyles, WithStyles, Divider, Theme } from "@material-ui/core";
import { SubmitButton } from "../../../components/buttons";
import { DialogResponsive } from "../../../components/dialog";
import DoneIcon from "@material-ui/icons/Done";
import { IPropertyDefinitionState } from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { Alert, AlertTitle } from "@material-ui/lab";
import DoneOutline from "@material-ui/icons/DoneOutline";
import MailOutline from "@material-ui/icons/MailOutline";
import { AvatarRenderer } from "../../../components/avatar";
import Snackbar from "../../../components/snackbar";
import { LanguagePicker } from "../../../components/language-picker";
import { CountryPicker } from "../../../components/country-picker";
import { CurrencyPicker } from "../../../components/currency-picker";
import { ProgressingElement, SlowLoadingElement } from "../../../components/util";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlernateEmailIcon from "@material-ui/icons/AlternateEmail";
import FaceIcon from "@material-ui/icons/Face";
import Link from "../../../../components/navigation/Link";
import { ItemDefinitionLoader } from "../../../components/item-definition-loader";
import ErrorIcon from '@material-ui/icons/Error';
import I18nReadMany from "../../../../components/localization/I18nReadMany";
import Entry from "../../../../components/property/Entry";
import Reader from "../../../../components/property/Reader";
import I18nRead from "../../../../components/localization/I18nRead";
import UserActioner from "../../../../components/user/UserActioner";
import DifferingPropertiesRetriever from "../../../../components/item-definition/DifferingPropertiesRetriever";

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

const currentUserProfileStandardInfoStyles = (theme: Theme) => createStyles({
  paper: {
    padding: "1rem",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1.2rem",
  },
  containerBox: {
    paddingBottom: "1rem",
  },
  containerBoxButton: {
    padding: 0,
  },
  pickers: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alertButtonValidateEmailContainer: {
    paddingTop: "0.75rem",
  },
  emailInButton: {
    textTransform: "none",
    opacity: 0.7,
  },
  errorIconButton: {
    color: theme.palette.error.main,
  },
});

export const CurrentUserProfileStandardInfo = withStyles(currentUserProfileStandardInfoStyles)
((props: WithStyles<typeof currentUserProfileStandardInfoStyles>) => {
  return (
    <Paper className={props.classes.paper}>
      <ItemDefinitionLoader>
        <Entry id="profile_picture" renderer={AvatarRenderer}/>
        <SlowLoadingElement inline={true} id="profile-pickers">
          <div className={props.classes.pickers}>
            <LanguagePicker />
            <CountryPicker />
            <CurrencyPicker />
          </div>
        </SlowLoadingElement>
        <Box className={props.classes.containerBox}>
          <I18nReadMany data={[
            {id: "change_password"},
            {id: "update_your_preferences"},
          ]}>
            {(i18nChangePassword: string, i18nPreferences: string) => (
              <React.Fragment>
                <Link to="/preferences">
                  <Reader id="address">
                    {(value, stateValue) => {
                      const hasWarning = !(stateValue && stateValue.stateAppliedValue);

                      return (
                        <Button
                          variant="text"
                          size="small"
                          fullWidth={true}
                          className={props.classes.containerBoxButton}
                          endIcon={hasWarning ? <ErrorIcon className={props.classes.errorIconButton}/> : null}
                        >
                          {i18nPreferences}
                        </Button>
                      );
                    }}
                  </Reader>
                  
                </Link>
                <Link to="/change-password">
                  <Button
                    variant="text"
                    size="small"
                    fullWidth={true}
                    className={props.classes.containerBoxButton}
                  >
                    {i18nChangePassword}
                  </Button>
                </Link>
              </React.Fragment>
            )}
          </I18nReadMany>
        </Box>
        <Entry id="username" icon={<AccountCircleIcon/>}/>
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
                                <ProgressingElement isProgressing={actioner.statefulOnProgress}>
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    endIcon={<MailOutline/>}
                                    onClick={actioner.sendValidateEmail}
                                  >
                                    <I18nRead capitalize={true} id="missing_email_validation_warning_action"/>
                                    <i className={props.classes.emailInButton}>&nbsp;{emailState.stateAppliedValue}</i>
                                  </Button>
                                </ProgressingElement>
                                <Snackbar
                                  severity="error"
                                  i18nDisplay={actioner.statefulError}
                                  open={!!actioner.statefulError}
                                  onClose={actioner.dismissStatefulError}
                                />
                                <Snackbar
                                  severity="success"
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
        <Entry id="email" rendererArgs={{descriptionAsAlert: true}} icon={<AlernateEmailIcon/>}/>
        <Entry id="about_me" icon={<FaceIcon/>}/>
        
        <Divider />
        
        <Box className={props.classes.buttonBox}>
          <DifferingPropertiesRetriever mainProperties={["profile_picture", "username", "email", "about_me"]}>
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
      </ItemDefinitionLoader>
    </Paper>
  )
});