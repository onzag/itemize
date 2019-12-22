import React from "react";
import { ModuleProvider, ItemDefinitionProvider } from "../../../itemize/client/app/providers";
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
                <div>
                  <Avatar large={true} hideFlag={true}/>
                  <LanguagePicker/>
                </div>
                <Entry id="username"/>
                <Entry id="email"/>
                <Button onClick={logActioner.logout}>
                  <I18nRead id="logout"/>
                </Button>
                <Button
                  onClick={submitActioner.submitError ? null : submitActioner.submit.bind(null, {
                    onlyIncludeProperties: ["username", "email"],
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
    <ItemDefinitionLoader
      notFoundComponent={SimulatedNotFoundPage}
      blockedComponent={BlockedPage}
      errorComponent={ErrorPage}
    >
      {content}
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
