/**
 * This file provides the drawer content that exists side to the rich text editor
 * when it is allowed to hold a drawer, the drawer contains a range of options to enable
 * templating or custom styling
 * @packageDocumentation
 */

import React, { useCallback, useState } from "react";
import {
  Divider, Typography, Tab, Tabs, BorderStyleIcon, TouchAppIcon, WebIcon, Paper, SettingsIcon
} from "../../../mui-core";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import { GeneralOptions } from "./general";
import { StylesOptions } from "./styles";
import { ActionsOptions } from "./actions";
import { TemplatingOptions } from "./templating";
import { getInfoOf, Tree } from "./tree";

/**
 * This is the wrapper drawer itself
 * @param props it takes the entire wrapper props with the styles
 */
export function WrapperDrawer(props: MaterialUISlateWrapperWithStyles) {
  // we grab this from local storage, this won't affect SSR because the drawer won't
  // ever render in the server side, it's client side only, it's always technically closed
  // on the server side
  const [location, setLocation] = useState(localStorage.getItem("SLATE_DRAWER_LAST_LOCATION") || "MAIN");

  // update the given location
  const setLocationCallback = useCallback((e: React.ChangeEvent, value: string) => {
    localStorage.setItem("SLATE_DRAWER_LAST_LOCATION", value);
    setLocation(value);
  }, []);

  // but for that to be set we need to have something selected
  // in the rich text editor state
  const treeData = <Tree
    currentRichElement={{
      children: props.state.currentValue
    } as any}
    currentSelectedNode={props.state.currentSelectedNode as any}
    currentSelectedNodePath={props.state.currentSelectedNodeAnchor}
    currentPath={[]}
    i18nRichInfo={props.i18nRichInfo}
    buttonClassName={props.classes.wrapperButton}
    childrenBoxClassName={props.classes.treeChildrenBox}
    onSelectPath={props.helpers.selectPath}
  />

  // now we need to build the settings
  let settingsForNode: React.ReactNode = null;
  let titleForNode: React.ReactNode = null;

  // and that's done based on the selected node
  if (props.state.currentSelectedNode) {
    // for that we get the info of the selected node
    const selectedNodeInfo = getInfoOf(props.state.currentSelectedNode, props.i18nRichInfo);

    // and we need to see in which location we are
    let actualLocation = location;
    // for text nodes there's only the main location
    if (actualLocation !== "MAIN" && selectedNodeInfo.isText) {
      // so we override
      actualLocation = "MAIN";
    }

    // and according to that decide which panel to render
    let infoPanel: React.ReactNode = null;
    switch (actualLocation) {
      case "MAIN":
        infoPanel = GeneralOptions(props);
        break;
      case "STYLES":
        infoPanel = StylesOptions(props);
        break;
      case "ACTIONS":
        infoPanel = ActionsOptions(props);
        break;
      case "TEMPLATING":
        infoPanel = TemplatingOptions(props);
        break;
    }

    titleForNode = (
      <>
        <Typography className={props.classes.elementTitle} variant="h6">{selectedNodeInfo.name}</Typography>
        <Divider className={props.classes.separator} />
      </>
    );

    // and now we can build these settings
    // basically here we are building the divider and then
    // adding the panel, where the tabs allow us to switch
    // from each panel
    settingsForNode = (
      <>
        {
          !selectedNodeInfo.isText ?
            (
              <>
                <Divider className={props.classes.separator} />
                <Tabs value={actualLocation} onChange={setLocationCallback}>
                  <Tab
                    className={props.classes.tab}
                    label={<SettingsIcon />}
                    value="MAIN"
                    title={props.i18nRichInfo.settings}
                  />
                  {
                    props.featureSupport.supportsCustomStyles || props.featureSupport.supportsRichClasses ?
                      (
                        <Tab
                          className={props.classes.tab}
                          label={<BorderStyleIcon />}
                          value="STYLES"
                          title={props.i18nRichInfo.styles}
                        />
                      ) :
                      null
                  }
                  {
                    props.featureSupport.supportsTemplating ?
                      (
                        <Tab
                          className={props.classes.tab}
                          label={<WebIcon />}
                          value="TEMPLATING"
                          title={props.i18nRichInfo.templating}
                        />
                      ) :
                      null
                  }
                  {
                    props.featureSupport.supportsTemplating ?
                      (
                        <Tab
                          className={props.classes.tab}
                          label={<TouchAppIcon />}
                          value="ACTIONS"
                          title={props.i18nRichInfo.actions}
                        />
                      ) :
                      null
                  }
                </Tabs>
              </>
            ) : null
        }
        <Paper>
          {infoPanel}
        </Paper>
      </>
    );
  }

  // now we return
  return (
    <>
      {titleForNode}
      <div className={props.classes.treeDataBox}>
        {treeData}
      </div>
      {settingsForNode}
    </>
  );
}
