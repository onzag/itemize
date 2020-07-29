/**
 * An standard recover component for fast prototyping fully compatible
 * with the navbar
 * 
 * @packageDocumentation
 */

import React from "react";
import { Button, createStyles, withStyles, WithStyles, Divider, MailIcon, AlernateEmailIcon, Alert } from "../mui-core";
import { DialogResponsive } from "./dialog";
import { ItemDefinitionProvider } from "../../providers/item-definition";
import Snackbar from "./snackbar";
import { ProgressingElement } from "./util";
import UserActioner from "../../components/user/UserActioner";
import I18nRead from "../../components/localization/I18nRead";
import Entry from "../../components/property/Entry";

/**
 * The recover dialog styles
 */
const recoverDialogStyles = createStyles({
  resetPasswordButtonWrapper: {
    marginTop: "1.5rem",
  },
  divider: {
    margin: "1rem 0",
  },
});

/**
 * Props for the recover dialog
 */
interface IRecoverDialogProps extends WithStyles<typeof recoverDialogStyles> {
  /**
   * Whether the dialog is currently open
   */
  open: boolean;
  /**
   * Triggere when the dialog closes
   */
  onClose: () => void;
  /**
   * Triggered if the user wants to login rather than recover password
   */
  onLoginRequest: () => void;
}

/**
 * runs many functions at once
 * @param functions the functions to run
 */
function runManyFunctions(functions: Array<() => void>) {
  functions.forEach(f => f());
}

/**
 * A recover dialog fully compatible with the navbar that allows for quickly adding
 * a dialog for recovering the password, it contains its own item definition provider but depends to
 * be in the right module context
 * 
 * @param props the props for recovery
 * @returns a react component
 */
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
                        onClick={actioner.sendResetPassword}
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
                  id="recover-dialog-error"
                  severity="error"
                  i18nDisplay={actioner.statefulError}
                  open={!!actioner.statefulError}
                  onClose={actioner.dismissStatefulError}
                />
                <Snackbar
                  id="recover-dialog-success"
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
