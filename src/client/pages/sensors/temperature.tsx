import React from "react";
import { ItemDefinitionProvider } from "../../../../itemize/client/providers/item-definition";
import { ErrorPage } from "../error";
import { ModuleProvider } from "../../../../itemize/client/providers/module";
import { I18nRead, I18nReadError } from "../../../../itemize/client/components/localization";
import { Reader, View, Entry } from "../../../../itemize/client/components/property";
import { TitleSetter } from "../../../../itemize/client/components/util";
import { SearchActioner, SubmitActioner } from "../../../../itemize/client/components/item-definition";
import { UserIdRetriever } from "../../../../itemize/client/components/user";
import Snackbar from "../../general/snackbar";
import { PagedSearchLoader } from "../../../../itemize/client/components/search";
import { Button } from "@material-ui/core";
import Pagination from "material-ui-flat-pagination";
import { Link } from "../../../../itemize/client/components/navigaton";

interface ISensorsTemperatureProps {
  match: {
    params: {
      id: string;
    };
  };
}

function SimulatedNotFoundPage() {
  return (
    <ErrorPage
      error={{
        message: "Sensor not found",
        code: "NOT_FOUND",
      }}
    />
  );
}

export function SensorsTemperature(props: ISensorsTemperatureProps) {
  const actualId = parseInt(props.match.params.id, 10);
  if (isNaN(actualId)) {
    return (
      <SimulatedNotFoundPage />
    );
  }
  return (
    <ModuleProvider module="test/sensors">
      <ItemDefinitionProvider
        itemDefinition="temperature"
        forId={actualId}
        assumeOwnership={true}
      >
        <Reader id="name">
          {(value) => (
            <TitleSetter>{value ? value.toString() : ""}</TitleSetter>
          )}
        </Reader>
        <h1>
          <View id="name" />
        </h1>
        <h2>
          <I18nRead id="name" />
        </h2>
        <div>
          <View id="temperature" />
        </div>

        <div>
          <Entry id="name" />
          <Entry id="security_code" />
        </div>

        <SubmitActioner>
          {(actioner) => (
            <React.Fragment>
              <Button
                color="primary"
                variant="contained"
                onClick={actioner.submit.bind(null, {
                  onlyIncludeProperties: ["name", "security_code"],
                  onlyIncludeIfDiffersFromAppliedValue: true,
                })}
              >
                <I18nRead id="edit"/>
              </Button>
              <Snackbar
                uniqueId="temperature-sensor-edit-error"
                i18nDisplay={actioner.submitError}
                open={!!actioner.submitError}
                onClose={actioner.dismissError}
              />
            </React.Fragment>
          )}
        </SubmitActioner>
      </ItemDefinitionProvider>
    </ModuleProvider>
  );
}

const PAGE_SIZE = 5;

function goToPage(actualGoToPage: (n: number) => void, e: React.MouseEvent, offset: number) {
  actualGoToPage(offset / PAGE_SIZE);
}

export function SensorsTemperatureIndex() {
  return (
    <UserIdRetriever>
      {(userId) => (
        <ModuleProvider module="test/sensors">
          <ItemDefinitionProvider
            itemDefinition="temperature"
            searchCounterpart={true}
            automaticSearch={{createdBy: userId}}
          >
            <I18nRead id="search">
              {(value) => (
                <TitleSetter>
                  {value.toString()}
                </TitleSetter>
              )}
            </I18nRead>
            <Entry id="name" searchVariant="search" />
            <Entry id="temperature" searchVariant="from" />
            <Entry id="temperature" searchVariant="to" />

            <SearchActioner>{(actioner) => (
              <React.Fragment>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={actioner.search.bind(null, { createdBy: userId })}
                >
                  <I18nRead id="search" />
                </Button>
                <Snackbar
                  uniqueId="temperature-sensor-search-error"
                  i18nDisplay={actioner.searchError}
                  open={!!actioner.searchError}
                  onClose={actioner.dismissSearchError}
                />
              </React.Fragment>
            )}</SearchActioner>

            <PagedSearchLoader pageSize={PAGE_SIZE} requestedProperties={["name", "temperature"]}>
              {(loader) => (
                <React.Fragment>
                  <ul>{
                    loader.searchResults.map((result) => {
                      return (
                        <ItemDefinitionProvider
                          {...result.providerProps}
                        >
                          <li>
                            <Link to={`/sensors/temperature/${result.id}`}>
                              <Reader id="name">
                                {(v) => v}
                              </Reader> : (
                                <Reader id="temperature">
                                  {(v) => v}
                                </Reader>
                              )
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
                    uniqueId="temperature-sensor-search-loader-error"
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
