import React from "react";
import { initializeItemizeApp } from "../../itemize/client";
import { ModuleProvider, ItemDefinitionProvider } from "../../itemize/client/app/providers";
import { UserIdRetriever } from "../../itemize/client/app/elements";
import App from "./app";

initializeItemizeApp(
  <UserIdRetriever>
    {(userId) => (
      <ModuleProvider module="users">
        <ItemDefinitionProvider
          itemDefinition="user"
          forId={userId}
          assumeOwnership={true}
        >
          <App userId={userId}/>
        </ItemDefinitionProvider>
      </ModuleProvider>
    )}
  </UserIdRetriever>,
);
