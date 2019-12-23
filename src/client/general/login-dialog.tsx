import React from "react";
import { Button, createStyles, withStyles, WithStyles, Icon } from "@material-ui/core";
import { DialogResponsive } from "./dialog";
import { I18nRead, I18nReadError } from "../../../itemize/client/components/localization";
import { LogActioner } from "../../../itemize/client/components/login";
import { Entry } from "../../../itemize/client/components/property";
import { ModuleProvider, ItemDefinitionProvider } from "../../../itemize/client/app/providers";

const loginDialogStyles = createStyles({});

interface ILoginDialogProps extends WithStyles<typeof loginDialogStyles> {
  open: boolean;
  onClose: () => void;
  onSignupRequest: () => void;
}

function runTwoFunctions(functionA, functionB) {
  functionA();
  functionB();
}

export const LoginDialog = withStyles(loginDialogStyles)((props: ILoginDialogProps) => {
  return (
    <ModuleProvider module="users">
      <ItemDefinitionProvider itemDefinition="user" disableExternalChecks={true}>
        <LogActioner>
          {(actioner) => (
            <I18nRead id="login">
              {(i18nLogin: string) => (
                <DialogResponsive
                  open={props.open}
                  onClose={props.onClose}
                  title={i18nLogin}
                  buttons={
                    <Button
                      color="primary"
                      aria-label={i18nLogin}
                      startIcon={<Icon>done</Icon>}
                      onClick={actioner.login}
                    >
                      {i18nLogin}
                    </Button>
                  }
                >
                  <form>
                    <Entry id="username" onChange={actioner.dismissError} showAsInvalid={!!actioner.error}/>
                    <Entry id="password" onChange={actioner.dismissError} showAsInvalid={!!actioner.error}/>

                    <I18nReadError error={actioner.error}/>
                  </form>
                  <Button
                    color="secondary"
                    onClick={runTwoFunctions.bind(null, actioner.dismissError, props.onSignupRequest)}
                  >
                    <I18nRead id="signup_instead"/>
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
