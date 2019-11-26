import { initializeItemizeApp } from "../../itemize/client";
import React from "react";
import { ModuleProvider, ItemDefinitionProvider } from "../../itemize/client/app/providers";
import { Entry, StatsForNerds } from "../../itemize/client/app/elements";

initializeItemizeApp(
  <ModuleProvider module="users">
    <ItemDefinitionProvider itemDefinition="user">
      <Entry id="username"/>
      <Entry id="password"/>

      <StatsForNerds/>
    </ItemDefinitionProvider>
  </ModuleProvider>,
);
