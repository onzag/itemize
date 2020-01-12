import { ModuleProvider } from "../../../../itemize/client/providers/module";
import { ItemDefinitionProvider } from "../../../../itemize/client/providers/item-definition";
import { I18nRead } from "../../../../itemize/client/components/localization";
import { TitleSetter } from "../../../../itemize/client/components/util";
import { Entry, Reader } from "../../../../itemize/client/components/property";
import { SearchActioner } from "../../../../itemize/client/components/item-definition";
import React from "react";
import { UserIdRetriever } from "../../../../itemize/client/components/user";
import { Button } from "@material-ui/core";
import { PagedSearchLoader } from "../../../../itemize/client/components/search";
import Pagination from "material-ui-flat-pagination";
import { Link } from "../../../../itemize/client/components/navigaton";
import Snackbar from "../../general/snackbar";

const PAGE_SIZE = 5;

function goToPage(actualGoToPage: (n: number) => void, e: React.MouseEvent, offset: number) {
  actualGoToPage(offset / PAGE_SIZE);
}

export function SensorsIndex() {
  return (
    <UserIdRetriever>
      {(userId) => (
        <ModuleProvider module="test/sensors">
          <ItemDefinitionProvider
            searchCounterpart={true}
            automaticSearch={{
              createdBy: userId,
              requestedProperties: ["name"],
            }}
          >
            <I18nRead id="search">
              {(value) => (
                <TitleSetter>
                  {value.toString()}
                </TitleSetter>
              )}
            </I18nRead>
            <Entry id="name" searchVariant="search" />

            <SearchActioner>{(actioner) => (
              <React.Fragment>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={actioner.search.bind(null, {
                    createdBy: userId,
                    requestedProperties: ["name"],
                  })}
                >
                  <I18nRead id="search" />
                </Button>
                <Snackbar
                  uniqueId="sensors-search-error"
                  i18nDisplay={actioner.searchError}
                  open={!!actioner.searchError}
                  onClose={actioner.dismissSearchError}
                />
              </React.Fragment>
            )}</SearchActioner>

            <PagedSearchLoader pageSize={PAGE_SIZE}>
              {(loader) => (
                <React.Fragment>
                  <ul>{
                    loader.searchResults.map((result) => {
                      return (
                        <ItemDefinitionProvider
                          {...result.providerProps}
                        >
                          <li>
                            <Link to={`/sensors/${result.itemDefinition.getName()}/${result.id}`}>
                              <Reader id="name">
                                {(v) => v}
                              </Reader>
                            </Link>
                          </li>
                        </ItemDefinitionProvider>
                      );
                    })
                  }</ul>
                  <Pagination
                    total={loader.pageCount * PAGE_SIZE}
                    limit={PAGE_SIZE}
                    offset={loader.currentPage * PAGE_SIZE}
                    onClick={goToPage.bind(null, loader.goToPage)}
                  />
                  <Snackbar
                    uniqueId="sensors-search-loader-error"
                    i18nDisplay={loader.error}
                    open={!!loader.error}
                    onClose={loader.dismissError}
                  />
                </React.Fragment>
              )}
            </PagedSearchLoader>
          </ItemDefinitionProvider>
        </ModuleProvider>
      )}
    </UserIdRetriever>
  );
}
