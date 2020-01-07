import React from "react";
import { ItemDefinitionProvider } from "../../../itemize/client/providers/item-definition";
import { I18nRead, I18nReadError } from "../../../itemize/client/components/localization";
import { Entry, View } from "../../../itemize/client/components/property";
import { ModuleProvider } from "../../../itemize/client/providers/module";
import { SubmitActioner, SearchActioner } from "../../../itemize/client/components/item-definition";
import { UserIdRetriever } from "../../../itemize/client/components/user";
import { SearchLoader } from "../../../itemize/client/components/search";

export function FrontPage() {
  return (
    <ModuleProvider module="test/sensors">
      <ItemDefinitionProvider itemDefinition="temperature">
        <div>
          <I18nRead id="name"/>
        </div>
        <Entry id="name"/>
        <Entry id="description"/>
        <Entry id="security_code"/>

        <SubmitActioner>{(actioner) => (
          <React.Fragment>
            <button onClick={actioner.submit.bind(null, {})}><I18nRead id="create"/></button>
            <div>
              ERROR:
              <I18nReadError error={actioner.submitError}/>
            </div>
          </React.Fragment>
        )}</SubmitActioner>
      </ItemDefinitionProvider>

      <div>MODULE LEVEL SEARCH</div>
      <ItemDefinitionProvider searchCounterpart={true}>
        <Entry id="name" searchVariant="search"/>

        <SearchActioner>{(actioner) => (
          <React.Fragment>
            <UserIdRetriever>
              {(userId) => (
                <button onClick={actioner.search.bind(null, {createdBy: userId})}><I18nRead id="search"/></button>
              )}
            </UserIdRetriever>
            <div>
              ERROR:
              <I18nReadError error={actioner.searchError}/>
            </div>
          </React.Fragment>
        )}</SearchActioner>
        <div>
          MODULE LEVEL SEARCH RESULTS
          <SearchLoader pageSize={10} currentPage={0} requestedProperties={["name"]}>
            {(loader) => (
              <React.Fragment>
                <div>MODULE LEVEL SEARCH ERROR: <I18nReadError error={loader.error}/></div>
                <div>{
                  loader.searchResults.map((result) => {
                    return (
                      <ItemDefinitionProvider key={result.id} itemDefinition={result.type} forId={result.id}>
                        <View id="name"/>
                      </ItemDefinitionProvider>
                    );
                  })
                }</div>
              </React.Fragment>
            )}
          </SearchLoader>
        </div>
      </ItemDefinitionProvider>

      <div>SPECIFIC ITEM SEARCH</div>
      <ItemDefinitionProvider itemDefinition="temperature" searchCounterpart={true}>
        <Entry id="name" searchVariant="search"/>
        <Entry id="temperature" searchVariant="from"/>
        <Entry id="temperature" searchVariant="to"/>

        <SearchActioner>{(actioner) => (
          <React.Fragment>
            <UserIdRetriever>
              {(userId) => (
                <button onClick={actioner.search.bind(null, {createdBy: userId})}><I18nRead id="search"/></button>
              )}
            </UserIdRetriever>
            <div>
              ERROR:
              <I18nReadError error={actioner.searchError}/>
            </div>
          </React.Fragment>
        )}</SearchActioner>

        <div>
          SPECIFIC SEARCH RESULTS
          <SearchLoader pageSize={10} currentPage={0} requestedProperties={["name", "temperature"]}>
            {(loader) => (
              <React.Fragment>
                <div>SPECIFIC SEARCH ERROR: <I18nReadError error={loader.error}/></div>
                <div>{
                  loader.searchResults.map((result) => {
                    return (
                      <ItemDefinitionProvider key={result.id} itemDefinition={result.type} forId={result.id}>
                        <View id="name"/>
                        <View id="temperature"/>
                      </ItemDefinitionProvider>
                    );
                  })
                }</div>
              </React.Fragment>
            )}
          </SearchLoader>
        </div>
      </ItemDefinitionProvider>
    </ModuleProvider>
  );
}
