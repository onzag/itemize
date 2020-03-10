import React from "react";
import { Button, createStyles, withStyles, WithStyles } from "@material-ui/core";
import { DialogResponsive } from "./dialog";
import { I18nRead, I18nReadError } from "../../components/localization";
import { LogActioner } from "../../components/login";
import DoneIcon from "@material-ui/icons/Done";
import { Entry } from "../../components/property";
import { ItemDefinitionProvider } from "../../providers/item-definition";

const loginDialogStyles = createStyles({});

interface ILoginDialogProps extends WithStyles<typeof loginDialogStyles> {
  open: boolean;
  onClose: () => void;
  onSignupRequest: () => void;
}

function runManyFunctions(functions: Array<() => void>) {
  functions.forEach(f => f());
}

export const LoginDialog = withStyles(loginDialogStyles)((props: ILoginDialogProps) => {
  return (
    <ItemDefinitionProvider
      itemDefinition="user"
      disableExternalChecks={true}
      properties={["username", "password"]}
    >
      <LogActioner>
        {(actioner) => (
          <I18nRead id="login" capitalize={true}>
            {(i18nLogin: string) => (
              <DialogResponsive
                open={props.open}
                onClose={runManyFunctions.bind(null, [actioner.dismissError, actioner.cleanUnsafeFields, props.onClose])}
                title={i18nLogin}
                buttons={
                  <Button
                    color="primary"
                    aria-label={i18nLogin}
                    startIcon={<DoneIcon/>}
                    onClick={actioner.login.bind(null, true)}
                  >
                    {i18nLogin}
                  </Button>
                }
              >
                <form>
                  <Entry id="username" onChange={actioner.dismissError} showAsInvalid={!!actioner.error} />
                  <Entry id="password" onChange={actioner.dismissError} showAsInvalid={!!actioner.error} />

                  <I18nReadError error={actioner.error} />
                </form>
                <Button
                  color="secondary"
                  onClick={props.onSignupRequest}
                >
                  <I18nRead id="signup_instead" />
                </Button>
              </DialogResponsive>
            )}
          </I18nRead>
        )}
      </LogActioner>
    </ItemDefinitionProvider>
  );
});