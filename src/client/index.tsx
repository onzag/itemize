import React from "react";
import { initializeItemizeApp } from "../../itemize/client";
import { UserIdRetriever } from "../../itemize/client/components/user";
import App from "./app";

initializeItemizeApp(
  <UserIdRetriever>
    {(userId) => (
      <App userId={userId}/>
    )}
  </UserIdRetriever>,
);
