import React from "react";
import { Button, Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { I18nRead } from "../../../components/localization";
import { IfLogStatus } from "../../../components/login";
import { LanguagePicker } from "../language-picker";
import { LocationStateReader } from "../../../components/navigaton";
import { Avatar } from "../avatar";

const buttonsStyles = (theme: Theme) => createStyles({
  languageButton: {
    marginLeft: "1rem",
    marginRight: "1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
});

interface ButtonsProps extends WithStyles<typeof buttonsStyles> {
  excludeLanguagePicker: boolean;
  LoginDialog: React.ComponentType<{open: boolean, onClose: () => void, onSignupRequest: () => void}>,
  SignupDialog: React.ComponentType<{open: boolean, onClose: () => void, onLoginRequest: () => void}>,
}

export const Buttons = withStyles(buttonsStyles)((props: ButtonsProps) => {
  return (
    <LocationStateReader defaultState={{ signupDialogOpen: false, loginDialogOpen: false }}>
      {(state, setLocationState) => {
        const openLoginDialog = () => setLocationState({
          loginDialogOpen: true,
          signupDialogOpen: false,
        }, state.signupDialogOpen);
        const closeLoginDialog = () => setLocationState({
          loginDialogOpen: false,
        }, true);
        const openSignupDialog = () => setLocationState({
          signupDialogOpen: true,
          loginDialogOpen: false,
        }, state.loginDialogOpen);
        const closeSignupDialog = () => setLocationState({
          signupDialogOpen: false,
        }, true);
        const LoginDialog = props.LoginDialog;
        const SignupDialog = props.SignupDialog;
        return (
          <IfLogStatus>
            {(status) => {
              if (status === "LOGGED_OUT" || status === "LOGGING_IN") {
                return <React.Fragment>
                  <Button color="inherit" variant="outlined" onClick={openLoginDialog}>
                    <I18nRead id="login" />
                  </Button>
                  {
                    !props.excludeLanguagePicker ?
                      <LanguagePicker className={props.classes.languageButton} /> :
                      null
                  }
                  <LoginDialog
                    open={state.loginDialogOpen}
                    onClose={closeLoginDialog}
                    onSignupRequest={openSignupDialog}
                  />
                  <SignupDialog
                    open={state.signupDialogOpen}
                    onClose={closeSignupDialog}
                    onLoginRequest={openLoginDialog}
                  />
                </React.Fragment>;
              } else if (status === "LOGGED_IN") {
                return <Avatar showWarnings={true} />;
              }
            }}
          </IfLogStatus>
        );
      }}
    </LocationStateReader>
  )
});