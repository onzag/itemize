import React from "react";
import { UserIdRetriever, LogActioner } from "../../../itemize/client/app/elements";
import { NotFound } from "./not-found";
import { ModuleProvider, ItemDefinitionProvider } from "../../../itemize/client/app/providers";

interface IProfileProps {
  match: {
    params: {
      id: string;
    };
  };
}

function ActualProfile(props: {
  isOwner?: boolean,
}) {
  if (props.isOwner) {
    return (
      <LogActioner>
        {(logActions) => (
          <div>
            <div onClick={logActions.logout}>logout</div>
            <div onClick={logActions.logout}>logout</div>
            <div onClick={logActions.logout}>logout</div>
            <div onClick={logActions.logout}>logout</div>
            <div onClick={logActions.logout}>logout</div>
            <div onClick={logActions.logout}>logout</div>
            <div onClick={logActions.logout}>logout</div>
            <div onClick={logActions.logout}>logout</div>
          </div>
        )}
      </LogActioner>
    );
  }
  return null;
}

export function Profile(props: IProfileProps) {
  const actualId = parseInt(props.match.params.id, 10);
  if (isNaN(actualId)) {
    return <NotFound/>;
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
