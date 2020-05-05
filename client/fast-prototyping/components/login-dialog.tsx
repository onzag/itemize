import React from "react";
import { Button, createStyles, withStyles, WithStyles, Typography, Divider } from "@material-ui/core";
import { DialogResponsive } from "./dialog";
import DoneIcon from "@material-ui/icons/Done";
import { ItemDefinitionProvider } from "../../providers/item-definition";
import Snackbar from "./snackbar";
import { ProgressingElement } from "./util";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { LogActioner } from "../../components/login/LogActioner";
import I18nRead from "../../components/localization/I18nRead";
import CacheableImageLoader from "../../components/util/CacheableImageLoader";
import I18nReadMany from "../../components/localization/I18nReadMany";
import Entry from "../../components/property/Entry";

const loginDialogStyles = createStyles({
  welcomeTitle: {
    paddingBottom: "1rem",
    fontWeight: 300,
  },
  loginButton: {
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

interface ILoginDialogProps extends WithStyles<typeof loginDialogStyles> {
  open: boolean;
  onClose: () => void;
  onSignupRequest: () => void;
  onRecoverRequest: () => void;
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
              >
                <div className={props.classes.titleContainer}>
                  <CacheableImageLoader src="/rest/resource/icons/android-chrome-64x64.png">
                    {(cachedImgSrc) => (
                      <img src={cachedImgSrc} className={props.classes.image}/>
                    )}
                  </CacheableImageLoader>
                  <Typography variant="h4" className={props.classes.welcomeTitle}>
                    <I18nRead id="login_welcome" capitalize={true}/>
                  </Typography>
                </div>
                <form>
                  <I18nReadMany data={[
                    {id: "login_alt_field_label"},
                    {id: "login_alt_field_placeholder"},
                  ]}>
                    {(i18nAltLabel: string, i18nAltPlaceholder: string) => (
                      <Entry
                        id="username"
                        onChange={actioner.dismissError}
                        showAsInvalid={!!actioner.error}
                        ignoreErrors={true}
                        altLabel={i18nAltLabel}
                        altPlaceholder={i18nAltPlaceholder}
                        icon={<AccountCircleIcon/>}
                        autoFocus={true}
                      />
                    )}
                  </I18nReadMany>
                  <Entry id="password" onChange={actioner.dismissError} showAsInvalid={!!actioner.error} />

                  <ProgressingElement isProgressing={actioner.isLoggingIn} fullWidth={true}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      aria-label={i18nLogin}
                      startIcon={<DoneIcon />}
                      onClick={actioner.login.bind(null, true)}
                      fullWidth={true}
                      className={props.classes.loginButton}
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