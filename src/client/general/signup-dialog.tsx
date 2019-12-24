import React from "react";
import { Button, createStyles, withStyles, WithStyles, Icon } from "@material-ui/core";
import { DialogResponsive } from "./dialog";
import { Entry, Setter } from "../../../itemize/client/components/property";
import { I18nRead, I18nReadError, AppCountryRetriever, AppLanguageRetriever, AppCurrencyRetriever } from "../../../itemize/client/components/localization";
import { LogActioner } from "../../../itemize/client/components/login";
import { ItemDefinitionProvider } from "../../../itemize/client/providers/item-definition";
import { Link } from "../../../itemize/client/components/navigaton";
import { ModuleProvider } from "../../../itemize/client/providers/module";

const signupDialogStyles = createStyles({});

interface ISignupDialogProps extends WithStyles<typeof signupDialogStyles> {
  open: boolean;
  onClose: () => void;
  onLoginRequest: () => void;
}

function runTwoFunctions(functionA, functionB) {
  functionA();
  functionB();
}

export const SignupDialog = withStyles(signupDialogStyles)((props: ISignupDialogProps) => {
  return (
    <ModuleProvider module="users">
      <ItemDefinitionProvider itemDefinition="user" optimize={{disableListener: !props.open}}>
        <LogActioner>
          {(actioner) => (
            <I18nRead id="signup">
              {(i18nSignup: string) => (
                <DialogResponsive
                  open={props.open}
                  onClose={props.onClose}
                  title={i18nSignup}
                  buttons={
                    <Button
                      color="primary"
                      aria-label={i18nSignup}
                      startIcon={<Icon>done</Icon>}
                      onClick={actioner.signup}
                    >
                      {i18nSignup}
                    </Button>
                  }
                >
                  <form>
                    <Entry id="username" onChange={actioner.dismissError} showAsInvalid={!!actioner.error}/>
                    <Entry id="password" onChange={actioner.dismissError} showAsInvalid={!!actioner.error}/>
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

                    <I18nReadError error={actioner.error}/>

                    <I18nRead
                      id="accept_terms"
                      args={
                        [
                          (
                            <Link to="/terms-and-conditions">
                              <I18nRead id="terms_and_conditions"/>
                            </Link>
                          ),
                          (
                            <Link to="/privacy-policy">
                              <I18nRead id="privacy_policy"/>
                            </Link>
                          ),
                        ]
                      }
                    />
                  </form>
                  <Button
                    color="secondary"
                    onClick={runTwoFunctions.bind(null, actioner.dismissError, props.onLoginRequest)}
                  >
                    <I18nRead id="login_instead"/>
                  </Button>
                </DialogResponsive>
              )}
            </I18nRead>
          )}
        </LogActioner>
      </ItemDefinitionProvider>
    </ModuleProvider>
  );
});
