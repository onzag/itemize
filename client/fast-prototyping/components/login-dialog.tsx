/**
 * An standard login dialog component for fast prototyping fully compatible
 * with the navbar
 * 
 * @packageDocumentation
 */

import React from "react";
import { Button, createStyles, withStyles, WithStyles, Typography, Divider, DoneIcon, AccountCircleIcon } from "../mui-core";
import { DialogResponsive } from "./dialog";
import { ItemDefinitionProvider } from "../../providers/item-definition";
import Snackbar from "./snackbar";
import { ProgressingElement } from "./util";
import { LogActioner } from "../../components/login/LogActioner";
import I18nRead from "../../components/localization/I18nRead";
import Entry from "../../components/property/Entry";

/**
 * The login dialog styles
 */
const loginDialogStyles = createStyles({
  welcomeTitle: {
    paddingBottom: "1rem",
    fontWeight: 300,
  },
  loginButtonWrapper: {
    marginTop: "1.5rem",
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    height: "64px",
    width: "64px",
  },
  forgotPasswordButton: {
    marginTop: "1rem",
  },
  divider: {
    margin: "1rem 0",
  },
});

/**
 * The login dialog props
 */
interface ILoginDialogProps extends WithStyles<typeof loginDialogStyles> {
  /**
   * whether it is currently opened
   */
  open: boolean;
  /**
   * triggers on close
   */
  onClose: () => void;
  /**
   * When the user requests to signup
   */
  onSignupRequest: () => void;
  /**
   * When the user requests for password recovery
   */
  onRecoverRequest: () => void;
}

/**
 * simple utlity to run a couple of functions at once
 * @param functions the many functions
 */
function runManyFunctions(functions: Array<() => void>) {
  functions.forEach(f => f());
}

/**
 * A fully compatible with the navbar fast prototyping login dialog for the user
 * to fill in, contains its own item definition provider, but it must be into
 * a module provider context
 * @param props the login props
 * @returns a react component
 */
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
              >
                <div className={props.classes.titleContainer}>
                  <img src="/rest/resource/icons/android-chrome-64x64.png" className={props.classes.image}/>
                  <Typography variant="h4" className={props.classes.welcomeTitle}>
                    <I18nRead id="login_welcome" capitalize={true}/>
                  </Typography>
                </div>
                <form>
                  <I18nRead id="login_alt_field_label">
                    {(i18nAltLabel: string) => (
                      <I18nRead id="login_alt_field_placeholder">
                        {(i18nAltPlaceholder: string) => (
                          <Entry
                            id="username"
                            onChange={actioner.dismissError}
                            showAsInvalid={!!actioner.error}
                            ignoreErrors={true}
                            altLabel={i18nAltLabel}
                            altPlaceholder={i18nAltPlaceholder}
                            icon={<AccountCircleIcon />}
                            autoFocus={true}
                          />
                        )}
                      </I18nRead>
                    )}
                  </I18nRead>
                  <Entry id="password" onChange={actioner.dismissError} showAsInvalid={!!actioner.error} />

                  <ProgressingElement
                    isProgressing={actioner.isLoggingIn}
                    fullWidth={true}
                    className={props.classes.loginButtonWrapper}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      aria-label={i18nLogin}
                      startIcon={<DoneIcon />}
                      onClick={actioner.login.bind(null, true)}
                      fullWidth={true}
                    >
                      {i18nLogin}
                    </Button>
                  </ProgressingElement>
                  <I18nRead id="forgot_password_question">
                    {(i18nForgotPassword: string) => (
                      <Button
                        className={props.classes.forgotPasswordButton}
                        color="primary"
                        variant="text"
                        size="small"
                        fullWidth={true}
                        aria-label={i18nForgotPassword}
                        onClick={props.onRecoverRequest}
                      >
                        {i18nForgotPassword}
                      </Button>
                    )}
                  </I18nRead>
                  <Divider className={props.classes.divider}/>
                  <I18nRead id="signup_instead">
                    {(i18nSignupInstead: string) => (
                      <Button
                        color="secondary"
                        variant="text"
                        fullWidth={true}
                        aria-label={i18nSignupInstead}
                        onClick={props.onSignupRequest}
                      >
                        {i18nSignupInstead}
                      </Button>
                    )}
                  </I18nRead>
                </form>
                <Snackbar
                  id="login-dialog-error"
                  severity="error"
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