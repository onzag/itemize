import React from "react";
import { UserIdRetriever, LogActioner, ItemDefinitionLoader, View, I18nRead, StatsForNerds } from "../../../itemize/client/app/elements";
import { ModuleProvider, ItemDefinitionProvider } from "../../../itemize/client/app/providers";
import { BlockedPage } from "./blocked";
import { ErrorPage } from "./error";
import { Button } from "@material-ui/core";

interface IProfileProps {
  match: {
    params: {
      id: string;
    };
  };
}

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

function ActualProfile(props: {
  isOwner?: boolean,
}) {
  let content = null;
  if (props.isOwner) {
    content = (
      <LogActioner>
        {(actioner) => {
          return (
            <React.Fragment>
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
      <StatsForNerds/>
    </ItemDefinitionLoader>
  );
}

export function Profile(props: IProfileProps) {
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
            return <ActualProfile isOwner={true}/>;
          }
          return (
            <ModuleProvider module="users">
              <ItemDefinitionProvider itemDefinition="user" forId={actualId}>
                <ActualProfile/>
              </ItemDefinitionProvider>
            </ModuleProvider>
          );
        }
      }
    </UserIdRetriever>
  );
}
