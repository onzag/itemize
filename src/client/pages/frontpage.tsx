import React from "react";
import { ModuleProvider, ItemDefinitionProvider } from "../../../itemize/client/app/providers";
import { Entry, StatsForNerds } from "../../../itemize/client/app/elements";

export function FrontPage() {
  return (
    <ModuleProvider module="test">
      <ItemDefinitionProvider itemDefinition="item_definition">
        <Entry id="propext_test"/>
        <StatsForNerds
          propertyIds={
            [
              "propext_test",
            ]
          }
        />
      </ItemDefinitionProvider>
    </ModuleProvider>
  );
}
