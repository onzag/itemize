import React from "react";
import { initializeItemizeApp } from "../../itemize/client";
import { ModuleProvider, ItemDefinitionProvider } from "../../itemize/client/app/providers";
import { UserIdRetriever } from "../../itemize/client/app/elements";
import App from "./app";

initializeItemizeApp(
  <UserIdRetriever>
    {(userId) => (
      <App userId={userId}/>
    )}
  </UserIdRetriever>,
);
