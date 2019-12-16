import React from "react";
import { ModuleProvider, ItemDefinitionProvider } from "../../../itemize/client/app/providers";
import { Entry, StatsForNerds, View } from "../../../itemize/client/app/elements";

export function FrontPage() {
  return (
    <ModuleProvider module="test">
      <ItemDefinitionProvider itemDefinition="item_definition">
        <Entry id="boolean_nullable"/>
        <View id="boolean_nullable"/>
        <StatsForNerds
          propertyIds={
            [
              "boolean_nullable",
            ]
          }
        />
      </ItemDefinitionProvider>
    </ModuleProvider>
  );
}
