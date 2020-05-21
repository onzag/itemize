import React from "react";
import { Button, createStyles, withStyles, WithStyles, Divider } from "@material-ui/core";
import { DialogResponsive } from "./dialog";
import MailIcon from "@material-ui/icons/MailOutline";
import { Alert } from "@material-ui/lab";
import { ItemDefinitionProvider } from "../../providers/item-definition";
import Snackbar from "./snackbar";
import { ProgressingElement } from "./util";
import AlernateEmailIcon from "@material-ui/icons/AlternateEmail";
import UserActioner from "../../components/user/UserActioner";
import I18nRead from "../../components/localization/I18nRead";
import Entry from "../../components/property/Entry";

const recoverDialogStyles = createStyles({
  resetPasswordButtonWrapper: {
    marginTop: "1.5rem",
  },
  divider: {
    margin: "1rem 0",
  },
});

interface IRecoverDialogProps extends WithStyles<typeof recoverDialogStyles> {
  open: boolean;
  onClose: () => void;
  onLoginRequest: () => void;
}

function runManyFunctions(functions: Array<() => void>) {
  functions.forEach(f => f());
}

export const RecoverDialog = withStyles(recoverDialogStyles)((props: IRecoverDialogProps) => {
  return (
    <ItemDefinitionProvider
      itemDefinition="user"
      disableExternalChecks={true}
      properties={["email"]}
    >
      <UserActioner>
        {(actioner) => (
          <I18nRead id="recover_account" capitalize={true}>
            {(i18nRecover: string) => (
              <DialogResponsive
                open={props.open}
                onClose={runManyFunctions.bind(null, [actioner.dismissStatefulError, actioner.cleanUnsafeFields, props.onClose])}
                title={i18nRecover}
              >
                <Alert severity="info">
                  <I18nRead id="recover_account_message"/>
                </Alert>
                <form>
                  <Entry
                    id="email"
                    onChange={actioner.dismissStatefulError}
                    showAsInvalid={!!actioner.statefulError}
                    hideDescription={true}
                    icon={<AlernateEmailIcon/>}
                    autoFocus={true}
                  />
                </form>
                <I18nRead id="recover_account_action">
                  {(i18nRecoverAction: string) => (
                    <ProgressingElement
                      isProgressing={actioner.statefulOnProgress}
                      fullWidth={true}
                      className={props.classes.resetPasswordButtonWrapper}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        aria-label={i18nRecoverAction}
                        startIcon={<MailIcon />}
                        onClick={actioner.sendResetPassword.bind(null, true)}
                        fullWidth={true}
                      >
                        {i18nRecoverAction}
                      </Button>
                    </ProgressingElement>
                  )}
                </I18nRead>
                <Divider className={props.classes.divider}/>
                <I18nRead id="login">
                  {(i18nLogin: string) => (
                    <Button
                      color="secondary"
                      variant="text"
                      fullWidth={true}
                      aria-label={i18nLogin}
                      onClick={props.onLoginRequest}
                    >
                      {i18nLogin}
                    </Button>
                  )}
                </I18nRead>
                <Snackbar
                  severity="error"
                  i18nDisplay={actioner.statefulError}
                  open={!!actioner.statefulError}
                  onClose={actioner.dismissStatefulError}
                />
                <Snackbar
                  severity="success"
                  i18nDisplay="recover_account_action_success"
                  open={!!actioner.statefulSuccess}
                  onClose={actioner.dismissStatefulSuccess}
                />
              </DialogResponsive>
            )}
          </I18nRead>
        )}
      </UserActioner>
    </ItemDefinitionProvider>
  );
});