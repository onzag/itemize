import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { SlowLoadingElement } from "../../components/util";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";
import Route from "../../../components/navigation/Route";
import { Fragment } from "./fragment";
import { Alert, AlertTitle } from "@material-ui/lab";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { localizedRedirectTo } from "../../../components/navigation";
import { NoStateItemDefinitionProvider } from "../../../providers/item-definition";

interface CMSNavBarProps {
  location: {
    pathname: string;
  }
}

function handleNavbarChangeEvent(e: React.ChangeEvent, value: string) {
  if (value === "info") {
    localizedRedirectTo("/cms");
    return; 
  }
  localizedRedirectTo("/cms/" + value);
}

function CMSNavBar(props: CMSNavBarProps) {
  const current = props.location.pathname.split("/")[3] || "info";
  return (
    <AppBar position="static" variant="outlined" color="default">
      <Tabs value={current} onChange={handleNavbarChangeEvent} centered={true}>
        <Tab label={<I18nRead id="info"/>} value="info" />
        {["fragment", "article"].map((itemDefinition: string) => {
          return (
            <Tab
              key={itemDefinition}
              label={
                <NoStateItemDefinitionProvider
                  itemDefinition={itemDefinition}
                >
                  <I18nRead id="name"/>
                </NoStateItemDefinitionProvider>
              }
              value={itemDefinition}
            />
          );
        })}
      </Tabs>
    </AppBar>
  );
}

export function CMS() {
  return (
    <SlowLoadingElement id="cms">
      <ModuleProvider module="cms">
        <I18nRead id="name" capitalize={true}>
          {(i18nCMS: string) => {
            return (
              <TitleSetter>
                {i18nCMS}
              </TitleSetter>
            );
          }}
        </I18nRead>
        <Route path="/cms" component={CMSNavBar}/>
        <Route path="/cms" exact={true}>
          <I18nReadMany
            data={[
              { id: "generic_warning", capitalize: true },
              { id: "warning" }
            ]}
          >
            {(i18nGenericWarning: string, i18nWarning: string) => (
              <Alert severity="error">
                <AlertTitle>
                  {i18nGenericWarning}
                </AlertTitle>
                {i18nWarning}
              </Alert>
            )}
          </I18nReadMany>
        </Route>
        <Route path="/cms/fragment" component={Fragment} />
      </ModuleProvider>
    </SlowLoadingElement>
  );
};