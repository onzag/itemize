/**
 * The cms page that contains subroutes into it for sections, for fast
 * prototyping, allows to create fragments as well as articles, meant only
 * for admins
 * 
 * @packageDocumentation
 */

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

/**
 * The props for the cms navbar
 */
interface CMSNavBarProps {
  /**
   * The current location
   */
  location: {
    pathname: string;
  },
  /**
   * do not add the fragment section
   */
  noFragment?: boolean;
  /**
   * do not add the article section
   */
  noArticle?: boolean;
}

/**
 * Used in the tabs for change using the tabs
 * @param e the change event (unused)
 * @param value the value it changed to
 */
function handleNavbarChangeEvent(e: React.ChangeEvent, value: string) {
  if (value === "info") {
    localizedRedirectTo("/cms");
    return;
  }
  localizedRedirectTo("/cms/" + value);
}

/**
 * The cms navigation bar component
 * @param props the props passed by the cms component
 * @returns a react element
 */
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

/**
 * The cms element props
 */
interface CMSProps {
  /**
   * Do not use the fragment section
   */
  noFragment?: boolean;
  /**
   * Do not use the article section
   */
  noArticle?: boolean;
}

/**
 * A fast prototyping page which represents the cms for the cms module
 * that allows to modify and create cms elements
 * 
 * @param props the props for the cms
 * @returns a react element
 */
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

/**
 * Allows to set the props of the cms to use within a route so that props
 * can be injected
 * @param props the props to inject
 * @returns a react component that is not instantiated
 */
export function cmsWithProps(props: CMSProps) {
  return () => {
    <CMS {...props}/>
  }
}
