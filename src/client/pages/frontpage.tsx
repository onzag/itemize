import React from "react";
import { ModuleProvider, ItemDefinitionProvider, ItemProvider } from "../../../itemize/client/app/providers";
import { Entry, StatsForNerds, I18nRead, ExclusionSwitch, CalloutWarning } from "../../../itemize/client/app/elements";

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
