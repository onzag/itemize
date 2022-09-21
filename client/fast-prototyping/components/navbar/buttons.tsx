/**
 * Contains the buttons that are part of the navbar
 * 
 * @module
 */

import React from "react";
import { css, styled, Theme, useTheme } from "@mui/material/styles";
import { css as emotionCss } from "@emotion/css";
import { LanguagePicker } from "../language-picker";
import LocationStateReader from "../../../components/navigation/LocationStateReader";
import { IfLogStatus } from "../../../components/login/IfLogStatus";
import I18nRead from "../../../components/localization/I18nRead";
import Button from "@mui/material/Button";
import { AltBadgeReactioner } from "../alt-badge-reactioner";

/**
 * provides the styles for the buttons
 * @param theme the mui theme
 * @returns a bunch of styles
 */
const buttonsStyles = {
  languageButton: {
    marginLeft: "1rem",
    marginRight: "1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  loginButton: {
    whiteSpace: "nowrap",
  },
  standardLanguageButtonLabel: (theme: Theme) => ({
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      display: "none",
    }
  }),
  shrunkLanguageButtonLabel: (theme: Theme) => ({
    display: "none",
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      display: "inline",
    }
  }),
};

/**
 * The button props, that are passed by the navbar
 */
interface ButtonsProps {
  /**
   * Whether the language picker that allows for selecting the language on the navbar
   * should be excluded
   */
  excludeLanguagePicker: boolean;
  /**
   * The login dialog component, a custom one might be passed via the navbar config
   */
  LoginDialog: React.ComponentType<{ open: boolean, onClose: () => void, onSignupRequest: () => void, onRecoverRequest: () => void }>;
  /**
   * the signup dialog component, a custom one might be passed via the navbar config
   * if no signup dialog is given no signup will be available
   */
  SignupDialog?: React.ComponentType<{ open: boolean, onClose: () => void, onLoginRequest: () => void }>;
  /**
   * The recover password component a custom one might be passed via the navbar config
   */
  RecoverDialog: React.ComponentType<{ open: boolean, onClose: () => void, onLoginRequest: () => void }>;
  /**
   * Component for avatar
   */
  AvatarComponent: React.ComponentType<any>;
  /**
   * avatarProps
   */
  avatarProps: any;
}

/**
 * The buttons component which contains all the buttons that are in the navbar as well
 * as handle the navigation logig for keeping a state for login/signup
 * 
 * It also contains the avatar
 * 
 * @param props the props
 * @returns a react component
 */
export function Buttons(props: ButtonsProps) {
  const theme = useTheme();

  // we first use the location state reader and keep this in our state
  return (
    <LocationStateReader defaultState={{ signupDialogOpen: false, loginDialogOpen: false, recoverDialogOpen: false }}>
      {(state, setLocationState) => {
        // so this will open the dialog to login, it will replace the state
        // if the signup dialog is already open, so going back will quit
        const openLoginDialog = () => setLocationState({
          loginDialogOpen: true,
          signupDialogOpen: false,
          recoverDialogOpen: false,
        }, state.signupDialogOpen);
        // close the login dialog, it will indeed push
        const closeLoginDialog = () => setLocationState({
          loginDialogOpen: false,
        }, true);
        // open the signup dialog and others
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

        // now we get our components
        const LoginDialog = props.LoginDialog;
        const SignupDialog = props.SignupDialog;
        const RecoverDialog = props.RecoverDialog;

        const languageButtonStyles = css(buttonsStyles.languageButton);
        const standardLanguageButtonStyles = css(buttonsStyles.standardLanguageButtonLabel(theme));
        const shrunkLanguageButtonStyles = css(buttonsStyles.shrunkLanguageButtonLabel(theme));

        const languageButtonClassName = emotionCss(languageButtonStyles.styles);
        const standardLanguageButtonLabelClassName = emotionCss(standardLanguageButtonStyles.styles);
        const shrunkLanguageButtonLabelClassName = emotionCss(shrunkLanguageButtonStyles.styles);

        // and return
        return (
          <IfLogStatus>
            {(status) => {
              if (status === "LOGGED_OUT" || status === "LOGGING_IN") {
                return <React.Fragment>
                  <AltBadgeReactioner
                    reactionKey="l"
                    component="span"
                    selector="button"
                    groupPosition={-100}
                  >
                    <Button color="inherit" variant="outlined" onClick={openLoginDialog} sx={buttonsStyles.loginButton}>
                      <I18nRead id="login" />
                    </Button>
                  </AltBadgeReactioner>
                  {
                    !props.excludeLanguagePicker ?
                      <LanguagePicker
                        className={languageButtonClassName}
                        shrinkingDisplay={true}
                        shrinkingDisplayStandardClassName={standardLanguageButtonLabelClassName}
                        shrinkingDisplayShrunkClassName={shrunkLanguageButtonLabelClassName}
                      /> :
                      null
                  }
                  <LoginDialog
                    open={state.loginDialogOpen}
                    onClose={closeLoginDialog}
                    onSignupRequest={openSignupDialog}
                    onRecoverRequest={openRecoverDialog}
                  />
                  {SignupDialog ? <SignupDialog
                    open={state.signupDialogOpen}
                    onClose={closeSignupDialog}
                    onLoginRequest={openLoginDialog}
                  /> : null}
                  <RecoverDialog
                    open={state.recoverDialogOpen}
                    onClose={closeRecoverDialog}
                    onLoginRequest={openLoginDialog}
                  />
                </React.Fragment>;
              } else if (status === "LOGGED_IN") {
                const Avatar = props.AvatarComponent;
                return (
                  <AltBadgeReactioner
                    reactionKey="p"
                    component="span"
                    selector="a"
                    groupPosition={-100}
                  >
                    <Avatar
                      {...props.avatarProps}
                    />
                  </AltBadgeReactioner>
                );
              }
            }}
          </IfLogStatus>
        );
      }}
    </LocationStateReader>
  )
};
