import React from "react";
import { ItemDefinitionProvider } from "../../../itemize/client/providers/item-definition";
import { BlockedPage } from "./blocked";
import { ErrorPage } from "./error";
import { Button, createStyles, withStyles, WithStyles } from "@material-ui/core";
import { Avatar } from "../general/avatar";
import { LanguagePicker } from "../general/language-picker";
import { LogActioner } from "../../../itemize/client/components/login";
import { Entry, View } from "../../../itemize/client/components/property";
import { I18nRead } from "../../../itemize/client/components/localization";
import { ItemDefinitionLoader, SubmitActioner } from "../../../itemize/client/components/item-definition";
import { UserIdRetriever } from "../../../itemize/client/components/user";
import Snackbar from "../general/snackbar";
import { ModuleProvider } from "../../../itemize/client/providers/module";
import { StatsForNerds } from "../../../itemize/client/components/dev";

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

function ActualProfile(props: IActualProfileProps) {
  let content = null;
  if (props.isOwner) {
    content = (
      <LogActioner>
        {(logActioner) => (
          <SubmitActioner>
            {(submitActioner) => (
              <React.Fragment>
                <Entry id="profile_picture"/>
                {/* <div>
                  <Avatar large={true} hideFlag={true}/>
                  <LanguagePicker/>
                </div>
                <Entry id="username"/>
                <Entry id="email"/>
                <Entry id="password"/>
                <Entry id="password" policyType="edit" policyName="REQUIRES_PASSWORD_CONFIRMATION"/> */}
                <Button onClick={logActioner.logout}>
                  <I18nRead id="logout"/>
                </Button>
                {/* <Button
                  onClick={submitActioner.submitError ? null : submitActioner.submit.bind(null, {
                    onlyIncludeProperties: ["username", "email", "password"],
                    propertiesToCleanOnSuccess: ["password"],
                    policiesToCleanOnSuccess: [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]],
                    unpokeAfterSuccess: true,
                  })}
                >
                  <I18nRead id="update_profile"/>
                </Button> */}
                <Button
                  onClick={submitActioner.submitError ? null : submitActioner.submit.bind(null, {
                    onlyIncludeProperties: ["profile_picture"],
                  })}
                >
                  <I18nRead id="update_profile"/>
                </Button>
                <Snackbar
                  uniqueId="profile-update-message-error"
                  open={!!submitActioner.submitError}
                  i18nDisplay={submitActioner.submitError}
                  onClose={submitActioner.dismissError}
                />
                <Snackbar
                  uniqueId="profile-update-message-success"
                  open={!!submitActioner.submitted}
                  i18nDisplay="profile_updated_succesfully"
                  onClose={submitActioner.dismissSubmitted}
                />
                <StatsForNerds propertyIds={["profile_picture"]}/>
              </React.Fragment>
            )}
          </SubmitActioner>
        )}
      </LogActioner>
    );
  } else {
    content = (
      <React.Fragment>
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
