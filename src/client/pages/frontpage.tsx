import React from "react";
import { ModuleProvider, ItemDefinitionProvider, ItemProvider } from "../../../itemize/client/app/providers";
import { I18nRead } from "../../../itemize/client/components/localization";
import { CalloutWarning, ExclusionSwitch } from "../../../itemize/client/components/item";
import { Entry } from "../../../itemize/client/components/property";
import { StatsForNerds } from "../../../itemize/client/components/dev";

export function FrontPage() {
  return (
    <ModuleProvider module="test">
      <ItemDefinitionProvider itemDefinition="vehicle">
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
        <Entry id="vehicle_type"/>
        <Entry id="four_wheel_drive"/>
        <StatsForNerds
          propertyIds={
            [
              "vehicle_type",
            ]
          }
        />
      </ItemDefinitionProvider>
    </ModuleProvider>
  );
}
