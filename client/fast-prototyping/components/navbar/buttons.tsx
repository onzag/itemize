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
  loginButton: {
    whiteSpace: "nowrap",
  },
  standardLanguageButtonLabel: {
    [theme.breakpoints.down(450)]: {
      display: "none",
    }
  },
  shrunkLanguageButtonLabel: {
    display: "none",
    [theme.breakpoints.down(450)]: {
      display: "inline",
    }
  },
});

interface ButtonsProps extends WithStyles<typeof buttonsStyles> {
  excludeLanguagePicker: boolean;
  LoginDialog: React.ComponentType<{open: boolean, onClose: () => void, onSignupRequest: () => void, onRecoverRequest: () => void}>,
  SignupDialog: React.ComponentType<{open: boolean, onClose: () => void, onLoginRequest: () => void}>,
  RecoverDialog: React.ComponentType<{open: boolean, onClose: () => void, onLoginRequest: () => void}>,
}

export const Buttons = withStyles(buttonsStyles)((props: ButtonsProps) => {
  return (
    <LocationStateReader defaultState={{ signupDialogOpen: false, loginDialogOpen: false, recoverDialogOpen: false }}>
      {(state, setLocationState) => {
        const openLoginDialog = () => setLocationState({
          loginDialogOpen: true,
          signupDialogOpen: false,
          recoverDialogOpen: false,
        }, state.signupDialogOpen);
        const closeLoginDialog = () => setLocationState({
          loginDialogOpen: false,
        }, true);
        const openSignupDialog = () => setLocationState({
          signupDialogOpen: true,
          loginDialogOpen: false,
          recoverDialogOpen: false,
        }, state.loginDialogOpen);
        const closeSignupDialog = () => setLocationState({
          signupDialogOpen: false,
        }, true);
        const openRecoverDialog = () => setLocationState({
          loginDialogOpen: false,
          signupDialogOpen: false,
          recoverDialogOpen: true,
        });
        const closeRecoverDialog = () => setLocationState({
          recoverDialogOpen: false,
        }, true);
        const LoginDialog = props.LoginDialog;
        const SignupDialog = props.SignupDialog;
        const RecoverDialog = props.RecoverDialog;
        return (
          <IfLogStatus>
            {(status) => {
              if (status === "LOGGED_OUT" || status === "LOGGING_IN") {
                return <React.Fragment>
                  <Button color="inherit" variant="outlined" onClick={openLoginDialog} className={props.classes.loginButton}>
                    <I18nRead id="login" />
                  </Button>
                  {
                    !props.excludeLanguagePicker ?
                      <LanguagePicker
                        className={props.classes.languageButton}
                        shrinkingDisplay={true}
                        shrinkingDisplayStandardClassName={props.classes.standardLanguageButtonLabel}
                        shrinkingDisplayShrunkClassName={props.classes.shrunkLanguageButtonLabel}
                      /> :
                      null
                  }
                  <LoginDialog
                    open={state.loginDialogOpen}
                    onClose={closeLoginDialog}
                    onSignupRequest={openSignupDialog}
                    onRecoverRequest={openRecoverDialog}
                  />
                  <SignupDialog
                    open={state.signupDialogOpen}
                    onClose={closeSignupDialog}
                    onLoginRequest={openLoginDialog}
                  />
                  <RecoverDialog
                    open={state.recoverDialogOpen}
                    onClose={closeRecoverDialog}
                    onLoginRequest={openLoginDialog}
                  />
                </React.Fragment>;
              } else if (status === "LOGGED_IN") {
                return <Avatar
                  showWarnings={true}
                  profileURL="my-profile"
                  cacheImage={true}
                  size="small"
                />;
              }
            }}
          </IfLogStatus>
        );
      }}
    </LocationStateReader>
  )
});