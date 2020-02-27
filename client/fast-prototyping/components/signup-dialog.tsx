import React from "react";
import { Button, createStyles, withStyles, WithStyles } from "@material-ui/core";
import { DialogResponsive } from "./dialog";
import { I18nRead, I18nReadError, AppLanguageRetriever, AppCountryRetriever, AppCurrencyRetriever } from "../../components/localization";
import { LogActioner } from "../../components/login";
import DoneIcon from "@material-ui/icons/Done";
import { Entry, Setter } from "../../components/property";
import { ItemDefinitionProvider } from "../../providers/item-definition";

const signupDialogStyles = createStyles({});

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
      optimize={{
        onlyIncludeIncludes: [],
        onlyIncludeProperties: [
          "username",
          "password",
          "app_language",
          "app_country",
          "app_currency",
        ],
        excludePolicies: true,
      }}
    >
      <LogActioner>
        {(actioner) => (
          <I18nRead id="signup" capitalize={true}>
            {(i18nSignup: string) => (
              <DialogResponsive
                open={props.open}
                onClose={runManyFunctions.bind(null, [actioner.dismissError, actioner.cleanUnsafeFields, props.onClose])}
                title={i18nSignup}
                buttons={
                  <Button
                    color="primary"
                    aria-label={i18nSignup}
                    startIcon={<DoneIcon/>}
                    onClick={actioner.signup.bind(null, true)}
                  >
                    {i18nSignup}
                  </Button>
                }
              >
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
                  color="secondary"
                  onClick={props.onLoginRequest}
                >
                  <I18nRead id="login_instead" />
                </Button>
              </DialogResponsive>
            )}
          </I18nRead>
        )}
      </LogActioner>
    </ItemDefinitionProvider>
  );
});