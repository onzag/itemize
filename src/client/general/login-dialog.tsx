import React from "react";
import { Button, createStyles, withStyles, WithStyles, Icon } from "@material-ui/core";
import { DialogResponsive } from "./dialog";
import { Entry, I18nRead, LogActioner, I18nReadError } from "../../../itemize/client/app/elements";

const loginDialogStyles = createStyles({});

interface INavbarProps extends WithStyles<typeof loginDialogStyles> {
  open: boolean;
  onClose: () => void;
}

export const LoginDialog = withStyles(loginDialogStyles)((props: INavbarProps) => {
  return (
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
            </DialogResponsive>
          )}
        </I18nRead>
      )}
    </LogActioner>
  );
});
