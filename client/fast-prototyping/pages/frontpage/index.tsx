import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { SlowLoadingElement } from "../../components/util";
import { ItemDefinitionProvider } from "../../../providers/item-definition";

export function Frontpage() {
  return (
    <SlowLoadingElement id="frontpage">
      <ModuleProvider module="cms">
        <ItemDefinitionProvider
          itemDefinition="article"
          searchCounterpart={true}
          automaticSearch={{
            requestedProperties: [
              "title",
              "attachments",
              "locale",
              "summary",
              "summary_image",
            ],
            searchByProperties: [],
            traditional: true,
            limit: 10,
            offset: 0,
          }}
        >

        </ItemDefinitionProvider>
      </ModuleProvider>
    </SlowLoadingElement>
  );
};