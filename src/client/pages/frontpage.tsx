import React from "react";
import { ItemDefinitionProvider } from "../../../itemize/client/providers/item-definition";
import { I18nRead } from "../../../itemize/client/components/localization";
import { CalloutWarning, ExclusionSwitch } from "../../../itemize/client/components/item";
import { Entry } from "../../../itemize/client/components/property";
import { StatsForNerds } from "../../../itemize/client/components/dev";
import { ModuleProvider } from "../../../itemize/client/providers/module";
import { ItemProvider } from "../../../itemize/client/providers/item";

export function FrontPage() {
  return (
    <ModuleProvider module="test">
      {/* <ItemDefinitionProvider itemDefinition="vehicle">
        <div>
          <I18nRead id="name"/>
        </div>
        <ItemProvider item="chasis">
          <div>
            <I18nRead id="name"/>
          </div>
          <CalloutWarning/>
          <ExclusionSwitch/>
          <Entry id="material_type"/>
        </ItemProvider>
        <Entry id="propext_test"/>
        <Entry id="propext_test"/>
      </ItemDefinitionProvider> */}
      <ItemDefinitionProvider>
        <Entry id="propext_test"/>
      </ItemDefinitionProvider>
    </ModuleProvider>
  );
}
