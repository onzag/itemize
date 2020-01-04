import React from "react";
import { ItemDefinitionProvider, PolicyPathType } from "../../../itemize/client/providers/item-definition";
import { BlockedPage } from "./blocked";
import { ErrorPage } from "./error";
import { Button, createStyles, withStyles, WithStyles } from "@material-ui/core";
import { Avatar } from "../general/avatar";
import { LanguagePicker } from "../general/language-picker";
import { LogActioner } from "../../../itemize/client/components/login";
import { Entry, View, Reader } from "../../../itemize/client/components/property";
import { I18nRead } from "../../../itemize/client/components/localization";
import { ItemDefinitionLoader, SubmitActioner, ISubmitActionerInfoArgType } from "../../../itemize/client/components/item-definition";
import { UserIdRetriever } from "../../../itemize/client/components/user";
import Snackbar from "../general/snackbar";
import { ModuleProvider } from "../../../itemize/client/providers/module";
import { StatsForNerds } from "../../../itemize/client/components/dev";
import { PolicyConfirmDialog } from "./dialogs/policy-confirm";
import { TitleSetter } from "../../../itemize/client/components/util";

function SimulatedNotFoundPage() {
  return (
    <ErrorPage
      error={{
        message: "User not found",
        code: "NOT_FOUND",
      }}
    />
  );
}

const profileStyles = createStyles({});

interface IProfileStylesProps extends WithStyles<typeof profileStyles> {}
interface IProfileProps extends IProfileStylesProps {
  match: {
    params: {
      id: string;
    };
  };
}
interface IActualProfileProps extends IProfileStylesProps {
  isOwner?: boolean;
}

interface IActualProfileState {
  passwordConfirmationDialogOpen: boolean;
  passwordConfirmationDialogOpenWith: PolicyPathType[];
}

class ActualProfile extends React.Component<IActualProfileProps, IActualProfileState> {
  constructor(props: IActualProfileProps) {
    super(props);

    this.beforeSubmit = this.beforeSubmit.bind(this);
    this.openPasswordConfirmationDialog = this.openPasswordConfirmationDialog.bind(this);
    this.closePasswordConfirmationDialog = this.closePasswordConfirmationDialog.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      passwordConfirmationDialogOpen: false,
      passwordConfirmationDialogOpenWith: [],
    };
  }
  public async handleSubmit(submitActioner: ISubmitActionerInfoArgType) {
    if (submitActioner.submitError) {
      return;
    }

    const submitActionerResponse = await submitActioner.submit({
      onlyIncludeProperties: ["username", "email", "profile_picture"],
      onlyIncludeIfDiffersFromAppliedValue: true,
      policiesToCleanOnSuccess: [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]],
      unpokeAfterSuccess: true,
      beforeSubmit: this.beforeSubmit,
    });
    // if nothing was returned the action was cancelled, so
    // we check if the action went through, without errros
    // and our dialog is open
    if (
      submitActionerResponse &&
      !submitActionerResponse.error &&
      this.state.passwordConfirmationDialogOpen
    ) {
      this.closePasswordConfirmationDialog();
    }
  }
  public beforeSubmit(applyingPolicies: PolicyPathType[]) {
    if (!this.state.passwordConfirmationDialogOpen && applyingPolicies.length) {
      this.openPasswordConfirmationDialog(applyingPolicies);
      return false;
    }
    return true;
  }
  public openPasswordConfirmationDialog(applyingPolicies: PolicyPathType[]) {
    this.setState({
      passwordConfirmationDialogOpen: true,
      passwordConfirmationDialogOpenWith: applyingPolicies,
    });
  }
  public closePasswordConfirmationDialog() {
    this.setState({
      passwordConfirmationDialogOpen: false,
      passwordConfirmationDialogOpenWith: [],
    });
  }
  public render() {
    let content = null;
    if (this.props.isOwner) {
      content = (
        <LogActioner>
          {(logActioner) => (
            <SubmitActioner>
              {(submitActioner) => (
                <React.Fragment>
                  <I18nRead id="my_profile">
                    {(value: string) => (
                      <TitleSetter>{value}</TitleSetter>
                    )}
                  </I18nRead>
                  <Entry id="profile_picture"/>
                  <div>
                    <Avatar large={true} hideFlag={true}/>
                    <LanguagePicker/>
                  </div>
                  <Entry id="username"/>
                  <Entry id="email"/>
                  <Button onClick={logActioner.logout}>
                    <I18nRead id="logout"/>
                  </Button>
                  <Button onClick={this.handleSubmit.bind(this, submitActioner)}>
                    <I18nRead id="update_profile"/>
                  </Button>
                  <Snackbar
                    uniqueId="profile-update-message-error"
                    open={!!submitActioner.submitError && !this.state.passwordConfirmationDialogOpen}
                    i18nDisplay={submitActioner.submitError}
                    onClose={submitActioner.dismissError}
                  />
                  <Snackbar
                    uniqueId="profile-update-message-success"
                    open={!!submitActioner.submitted}
                    i18nDisplay="profile_updated_succesfully"
                    onClose={submitActioner.dismissSubmitted}
                  />
                  <PolicyConfirmDialog
                    open={this.state.passwordConfirmationDialogOpen}
                    error={submitActioner.submitError}
                    dismissError={submitActioner.dismissError}
                    onClose={this.closePasswordConfirmationDialog}
                    onSubmit={this.handleSubmit.bind(this, submitActioner)}
                    policyType="edit"
                    policyName="REQUIRES_PASSWORD_CONFIRMATION"
                    policyEntries={this.state.passwordConfirmationDialogOpenWith}
                  />
                </React.Fragment>
              )}
            </SubmitActioner>
          )}
        </LogActioner>
      );
    } else {
      content = (
        <React.Fragment>
          <Reader id="username">
            {(value: string) => (
              <TitleSetter>{value}</TitleSetter>
            )}
          </Reader>
          <div>
            <Avatar large={true} hideFlag={true}/>
          </div>
          <View id="username"/>
        </React.Fragment>
      );
    }
    return (
      <ItemDefinitionLoader>
        {
          (arg) => {
            if (arg.notFound) {
              return <SimulatedNotFoundPage/>;
            } else if (arg.blocked) {
              return (
                <BlockedPage hasBlockedAccess={arg.hasBlockedAccess}>
                  {content}
                </BlockedPage>
              );
            }

            return (
              <React.Fragment>
                <i>{arg.loading ? "LOADING" : "LOADED"}</i>
                <i> - </i>
                <i>{arg.error ? arg.error.code : "ALL WELL"}</i>

                {content}
              </React.Fragment>
            );
          }
        }
      </ItemDefinitionLoader>
    );
  }
}

export const Profile = withStyles(profileStyles)((props: IProfileProps) => {
  const actualId = parseInt(props.match.params.id, 10);
  if (isNaN(actualId)) {
    return (
      <SimulatedNotFoundPage />
    );
  }
  return (
    <UserIdRetriever>
      {
        (userId) => {
          return (
            <ModuleProvider module="users">
              <ItemDefinitionProvider
                itemDefinition="user"
                forId={actualId}
                disableExternalChecks={userId !== actualId}
                assumeOwnership={userId === actualId}
              >
                <ActualProfile {...props} isOwner={userId === actualId}/>
              </ItemDefinitionProvider>
            </ModuleProvider>
          );
        }
      }
    </UserIdRetriever>
  );
});
