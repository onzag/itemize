import React from "react";
import { ModuleProvider } from "../../../providers/module";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";
import Route from "../../../components/navigation/Route";
import { Fragment } from "./fragment";
import { Article } from "./article";
import { Info } from "./info";
import { AppBar, Tabs, Tab } from "../../mui-core";
import { localizedRedirectTo } from "../../../components/navigation";
import { NoStateItemDefinitionProvider } from "../../../providers/item-definition";

interface CMSNavBarProps {
  location: {
    pathname: string;
  },
  noFragment?: boolean;
  noArticle?: boolean;
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
  let available: string[] = [];
  if (!props.noFragment) {
    available.push("fragment");
  }
  if (!props.noArticle) {
    available.push("article");
  }
  return (
    <AppBar position="static" variant="outlined" color="default">
      <Tabs value={current} onChange={handleNavbarChangeEvent} centered={true}>
        <Tab label={<I18nRead id="info" />} value="info" />
        {available.map((itemDefinition: string) => {
          return (
            <Tab
              key={itemDefinition}
              label={
                <NoStateItemDefinitionProvider
                  itemDefinition={itemDefinition}
                >
                  <I18nRead id="name" />
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

interface CMSProps {
  noFragment?: boolean;
  noArticle?: boolean;
}

export function CMS(props: CMSProps) {
  return (
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
      <Route path="/cms" component={(routeProps: any) => {
        return <CMSNavBar {...props} {...routeProps}/>
      }} />
      <Route path="/cms" exact={true} component={Info} />
      {props.noFragment ? null : <Route path="/cms/fragment" component={Fragment} />}
      {props.noArticle ? null : <Route path="/cms/article" component={Article} />}
    </ModuleProvider>
  );
};

export function cmsWithProps(props: CMSProps) {
  return () => {
    <CMS {...props}/>
  }
}