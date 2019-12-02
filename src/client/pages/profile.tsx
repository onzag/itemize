import React from "react";
import { UserIdRetriever, LogActioner, ItemDefinitionLoader, View, I18nRead, StatsForNerds, Entry } from "../../../itemize/client/app/elements";
import { ModuleProvider, ItemDefinitionProvider } from "../../../itemize/client/app/providers";
import { BlockedPage } from "./blocked";
import { ErrorPage } from "./error";
import { Button, createStyles, withStyles } from "@material-ui/core";
import { Avatar } from "../general/avatar";
import { WithStyles } from "react-jss";
import { LanguagePicker } from "../general/language-picker";

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
        {(actioner) => {
          return (
            <React.Fragment>
              <div>
                <Avatar large={true} hideFlag={true}/>
                <LanguagePicker/>
              </div>
              <Entry id="username"/>
              <Entry id="email"/>
              <Button onClick={actioner.logout}>
                <I18nRead id="logout"/>
              </Button>
            </React.Fragment>
          );
        }}
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
          if (userId === actualId) {
            return <ActualProfile {...props} isOwner={true}/>;
          }
          return (
            <ModuleProvider module="users">
              <ItemDefinitionProvider itemDefinition="user" forId={actualId} disableExternalChecks={true}>
                <ActualProfile {...props}/>
              </ItemDefinitionProvider>
            </ModuleProvider>
          );
        }
      }
    </UserIdRetriever>
  );
});
