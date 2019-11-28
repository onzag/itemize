import { initializeItemizeApp } from "../../itemize/client";
import React from "react";
import { ModuleProvider, ItemDefinitionProvider } from "../../itemize/client/app/providers";
import { Entry, IfLogStatus, LogActioner } from "../../itemize/client/app/elements";

initializeItemizeApp(
  <ModuleProvider module="users">
    <ItemDefinitionProvider itemDefinition="user" disableExternalChecks={true}>
      <Entry id="username"/>
      <Entry id="password"/>

      <LogActioner>{
        (login, logout) => (
          <React.Fragment>
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

    </ItemDefinitionProvider>
  </ModuleProvider>,
);
