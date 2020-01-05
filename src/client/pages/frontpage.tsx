import React from "react";
import { ItemDefinitionProvider } from "../../../itemize/client/providers/item-definition";
import { I18nRead } from "../../../itemize/client/components/localization";
import { CalloutWarning, ExclusionSwitch } from "../../../itemize/client/components/item";
import { Entry } from "../../../itemize/client/components/property";
import { StatsForNerds } from "../../../itemize/client/components/dev";
import { ModuleProvider } from "../../../itemize/client/providers/module";
import { IncludeProvider } from "../../../itemize/client/providers/item";
import { SearchActioner } from "../../../itemize/client/components/item-definition";

export function FrontPage() {
  return (
    <ModuleProvider module="test">
      <ItemDefinitionProvider searchCounterpart={true}>
        <div>
          <I18nRead id="name"/>
        </div>
        <Entry id="propext_test" searchVariant="search"/>

        <SearchActioner>
          {(actioner) => {
            return <button onClick={actioner.search.bind(null, null)}>search</button>;
          }}
        </SearchActioner>
      </ItemDefinitionProvider>
    </ModuleProvider>
  );
}
