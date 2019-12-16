import React from "react";
import { ModuleProvider, ItemDefinitionProvider } from "../../../itemize/client/app/providers";
import { Entry, StatsForNerds } from "../../../itemize/client/app/elements";

export function FrontPage() {
  return (
    <ModuleProvider module="test">
      <ItemDefinitionProvider itemDefinition="item_definition">
        <Entry id="files"/>
        <Entry id="files_single"/>
        <Entry id="boolean_nullable"/>
        <StatsForNerds
          propertyIds={
            [
              "files",
              "files_single",
            ]
          }
        />
      </ItemDefinitionProvider>
    </ModuleProvider>
  );
}
