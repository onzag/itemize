import React from "react";
import { initializeItemizeApp } from "../../itemize/client";
import Navbar from "./navbar";
import { ModuleProvider, ItemDefinitionProvider } from "../../itemize/client/app/providers";
import { UserIdRetriever } from "../../itemize/client/app/elements";

initializeItemizeApp(
  <UserIdRetriever>
    {(userId) => (
      <ModuleProvider module="users">
        <ItemDefinitionProvider
          itemDefinition="user"
          forId={userId}
          disableExternalChecks={true}
        >
          <Navbar />
        </ItemDefinitionProvider>
      </ModuleProvider>
    )}
  </UserIdRetriever>,
);
