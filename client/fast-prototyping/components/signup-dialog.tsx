import React from "react";
import { Button, createStyles, withStyles, WithStyles, Typography, Divider } from "@material-ui/core";
import { DialogResponsive } from "./dialog";
import { I18nRead, I18nReadError, AppLanguageRetriever, AppCountryRetriever, AppCurrencyRetriever, I18nReadMany } from "../../components/localization";
import { LogActioner } from "../../components/login";
import DoneIcon from "@material-ui/icons/Done";
import { Entry, Setter } from "../../components/property";
import { ItemDefinitionProvider } from "../../providers/item-definition";
import Snackbar from "./snackbar";
import { Link } from "../../components/navigaton";

const signupDialogStyles = createStyles({
  welcomeTitle: {
    paddingBottom: "1rem",
    fontWeight: 300,
  },
  signupComplyCaption: {
    fontWeight: 300,
    width: "100%",
    textAlign: "center",
    paddingTop: "1rem",
    display: "inline-block",
  },
  signupButton: {
    marginTop: "1.5rem",
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  forgotPasswordButton: {
    marginTop: "1rem",
  },
  divider: {
    margin: "1rem 0",
  },
});

interface ISignupDialogProps extends WithStyles<typeof signupDialogStyles> {
  open: boolean;
  onClose: () => void;
  onLoginRequest: () => void;
}

function runManyFunctions(functions: Array<() => void>) {
  functions.forEach(f => f());
}

export const SignupDialog = withStyles(signupDialogStyles)((props: ISignupDialogProps) => {
  return (
    <ItemDefinitionProvider
      itemDefinition="user"
      properties={[
        "username",
        "password",
        "app_language",
        "app_country",
        "app_currency",
      ]}
    >
      <LogActioner>
        {(actioner) => (
          <I18nRead id="signup" capitalize={true}>
            {(i18nSignup: string) => (
              <DialogResponsive
                open={props.open}
                onClose={runManyFunctions.bind(null, [actioner.dismissError, actioner.cleanUnsafeFields, props.onClose])}
                title={i18nSignup}
              >
                <div className={props.classes.titleContainer}>
                  <Typography variant="h4" className={props.classes.welcomeTitle}>
                    <I18nRead id="signup_welcome" capitalize={true}/>
                  </Typography>
                </div>
                <form>
                  <Entry id="username" onChange={actioner.dismissError} showAsInvalid={!!actioner.error} />
                  <Entry id="password" onChange={actioner.dismissError} showAsInvalid={!!actioner.error} />
                  <AppLanguageRetriever>
                    {(languageData) => (
                      <Setter id="app_language" value={languageData.currentLanguage.code}/>
                    )}
                  </AppLanguageRetriever>
                  <AppCountryRetriever>
                    {(countryData) => (
                      <Setter id="app_country" value={countryData.currentCountry.code}/>
                    )}
                  </AppCountryRetriever>
                  <AppCurrencyRetriever>
                    {(currencyData) => (
                      <Setter id="app_currency" value={currencyData.currentCurrency.code}/>
                    )}
                  </AppCurrencyRetriever>

                  <I18nReadError error={actioner.error} />
                </form>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  aria-label={i18nSignup}
                  startIcon={<DoneIcon />}
                  onClick={actioner.signup.bind(null, true)}
                  fullWidth={true}
                  className={props.classes.signupButton}
                >
                  {i18nSignup}
                </Button>
                <I18nReadMany data={[{
                  id: "terms_and_conditions",
                }, {
                  id: "privacy_policy",
                }]}>
                  {(i18nTermsAndConditions: string, i18nPrivacyPolicy: string) => (
                    <Typography variant="caption" className={props.classes.signupComplyCaption}>
                      <I18nRead id="signup_accept_terms" capitalize={true} args={[
                        <Link to="/terms-and-conditions">{i18nTermsAndConditions}</Link>,
                        <Link to="/privacy-policy">{i18nPrivacyPolicy}</Link>
                      ]}/>
                    </Typography>
                  )}
                </I18nReadMany>
                <Divider className={props.classes.divider}/>
                <I18nRead id="login_instead">
                  {(i18nLoginInstead: string) => (
                    <Button
                      color="secondary"
                      variant="text"
                      fullWidth={true}
                      aria-label={i18nLoginInstead}
                      onClick={props.onLoginRequest}
                    >
                      {i18nLoginInstead}
                    </Button>
                  )}
                </I18nRead>
                <Snackbar
                  i18nDisplay={actioner.error}
                  open={!!actioner.error}
                  onClose={actioner.dismissError}
                />
              </DialogResponsive>
            )}
          </I18nRead>
        )}
      </LogActioner>
    </ItemDefinitionProvider>
  );
});