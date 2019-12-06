import React from "react";
import { ModuleProvider, ItemDefinitionProvider } from "../../../itemize/client/app/providers";
import { Entry, StatsForNerds } from "../../../itemize/client/app/elements";

export function FrontPage() {
  return (
    <ModuleProvider module="test">
      <ItemDefinitionProvider itemDefinition="item_definition">
        {/* <Entry id="string_autocomplete"/>
        <Entry id="string_autocomplete_nullable"/>
        <Entry id="string_autocomplete_nullable_enforced"/> */}
        <Entry id="string_autocomplete_nullable_locale"/>
        <StatsForNerds
          propertyIds={
            [
              "string_autocomplete_nullable_enforced",
              "string_autocomplete_nullable_locale",
            ]
          }
        />
      </ItemDefinitionProvider>
    </ModuleProvider>
  );
}
