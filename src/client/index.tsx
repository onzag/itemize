import { initializeItemizeApp } from "../../itemize/client";
import React from "react";
import { ModuleProvider, ItemDefinitionProvider } from "../../itemize/client/app/providers";
import { Entry, IfLogStatus, LogActioner, ReadableErrorFor, UserIdRetriever, StatsForNerds, View } from "../../itemize/client/app/elements";

initializeItemizeApp(
  <UserIdRetriever>
    {
      (userId: number) => {
        return <ModuleProvider module="users">
          <ItemDefinitionProvider
            itemDefinition="user"
            disableExternalChecks={true}
            forId={userId}
            assumeOwnership={true}
          >
            <Entry id="username"/>
            <Entry id="password"/>

            <LogActioner>{
              (login, logout, activeError) => (
                <React.Fragment>
                  <ReadableErrorFor error={activeError}/>
                  <IfLogStatus status="LOGGED_IN">
                    logged in
                    <button onClick={logout}>logout</button>
                  </IfLogStatus>
                  <IfLogStatus status="LOGGING_IN">
                    logging in
                  </IfLogStatus>
                  <IfLogStatus status="LOGGED_OUT">
                    logged out
                    <button onClick={login}>login</button>
                  </IfLogStatus>
                </React.Fragment>
              )
            }</LogActioner>

            <View id="username"/>
          </ItemDefinitionProvider>
          <ItemDefinitionProvider
            itemDefinition="user"
            disableExternalChecks={true}
            forId={userId}
            assumeOwnership={true}
          >
            <Entry id="username"/>
          </ItemDefinitionProvider>
        </ModuleProvider>;
      }
    }
  </UserIdRetriever>,
);
