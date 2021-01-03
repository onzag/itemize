/**
 * This file provides the drawer content that exists side to the rich text editor
 * when it is allowed to hold a drawer, the drawer contains a range of options to enable
 * templating or custom styling
 * @packageDocumentation
 */

import React, { useCallback, useState } from "react";
import {
  Breadcrumbs, Button, Divider, Typography, Tab, Tabs, BorderStyleIcon, TouchAppIcon, WebIcon, Paper, SettingsIcon
} from "../../../mui-core";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import { Path } from "slate";
import { GeneralOptions } from "./general";
import { StylesOptions } from "./styles";
import { IPropertyEntryI18nRichTextInfo } from "../../../../internal/components/PropertyEntry/PropertyEntryText";
import { localeReplacer } from "../../../../../util";
import { ActionsOptions } from "./actions";
import { TemplatingOptions } from "./templating";

/**
 * The interactive actions that exist that mark
 * something as a templated element that is interactive
 * @ignore
 */
const templatedInteractiveActions = [
  "click",
  "blur",
  "focus",
  "input",
  "keydown",
  "keypress",
  "keyup",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseover",
  "mouseout",
  "mouseup",
  "mousewheel",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "wheel",
];

/**
 * The attributes that exist in a given element that mark such
 * as a templated element
 * @ignore
 */
const templatedAttributes = [
  "thref",
  "templateText",
  "forEach",
  "context",
  "uiHandler",
];

/**
 * The attributes that exist in a given element that mark such
 * as a templated styled elements
 * @ignore
 */
const templatedStyledAttributes = [
  "styleHover",
  "styleActive",
];

/**
 * The node information that is extracted of a given node used
 * to be displayed to the user
 */
interface INodeInfo {
  /**
   * The name that is given, human readable in the given language
   */
  name: string;
  /**
   * Whether it represents a templated node
   */
  isTemplate: boolean;
  /**
   * Whether it represents a text node
   */
  isText: boolean;
}

/**
 * Provides the node info of a given node
 * @param node the node, either text or rich element
 * @param i18nData the i18n information to be used to create the name
 * @returns the node information
 */
function getInfoOf(node: any, i18nData: IPropertyEntryI18nRichTextInfo): INodeInfo {
  // check for whether is interactive and other options
  const isInteractive = templatedInteractiveActions.some((attr) => !!node[attr]);
  const isTemplateStyled = templatedStyledAttributes.some((attr) => !!node[attr]);
  const isBasicStyled = !!node.style || (node.richClassList && node.richClassList.length);
  const isBasicTemplated = templatedAttributes.some((attr) => !!node[attr]);
  const isTemplate = isInteractive || isTemplateStyled || isBasicTemplated;

  // now let's build the name label for the given language
  let nameLabel: string = node.type ? (i18nData[node.type] || node.type) : i18nData.text;
  if (isBasicStyled || isTemplateStyled) {
    nameLabel = localeReplacer(i18nData.styled, nameLabel);
  }
  if (isInteractive) {
    nameLabel = localeReplacer(i18nData.interactive, nameLabel);
  }
  if (isTemplate) {
    nameLabel = localeReplacer(i18nData.template, nameLabel);
  }

  // and we can return the information now
  return {
    isTemplate,
    name: nameLabel,
    isText: typeof node.text === "string",
  }
}

/**
 * This is the wrapper drawer itself
 * @param props it takes the entire wrapper props with the styles
 */
export function WrapperDrawer(props: MaterialUISlateWrapperWithStyles) {
  // we grab this from local storage, this won't affect SSR because the drawer won't
  // ever render in the server side, it's client side only, it's always technically closed
  // on the server side
  const [location, setLocation] = useState(localStorage.getItem("SLATE_DRAWER_LAST_LOCATION") || "MAIN");

  // update the given location
  const setLocationCallback = useCallback((e: React.ChangeEvent, value: string) => {
    localStorage.setItem("SLATE_DRAWER_LAST_LOCATION", value);
    setLocation(value);
  }, []);

  // now we want to make a component that shows the path of the given currently selected
  // node, if any, this is basically what shows [container] [templated paragraph] etc...
  let pathData: React.ReactNode = null;

  // but for that to be set we need to have something selected
  // in the rich text editor state
  if (props.state.currentSelectedTextNodeAnchor) {
    // we need to check if we are going to show the text node, by default the text nodes
    // don't show unless they are templated
    const isTextAnchorTemplateRelevant = !!props.state.currentSelectedTextNode.templateText;

    // and now let's find what we will choose
    let currentRichElement = {
      children: props.state.currentValue,
    } as any;
    let pathSoFar: Path = [];

    // for that we use the selected text node anchor
    pathData = props.state.currentSelectedTextNodeAnchor.map((p, index) => {
      // and we get in the loop
      currentRichElement = currentRichElement.children[p];
      pathSoFar.push(p);

      // if it's not relevant, and we are right now at the last step and the next one will
      // be the text node, then we stop the mapping
      if (!isTextAnchorTemplateRelevant && index === props.state.currentSelectedTextNodeAnchor.length - 1) {
        // we return null, since this is a react component, nothing will render
        // note how the map is just an array of react components for the react component
        // path data itself
        return null;
      }

      // now if we are selected we must make it clear
      const isSelected = Path.equals(props.state.currentSelectedNodeAnchor, pathSoFar);

      // and we get the information of that node
      const info = getInfoOf(currentRichElement, props.i18nRichInfo);

      // and return it as a button
      return (
        <Button
          key={index}
          size="small"
          variant={isSelected ? "contained" : "outlined"}
          color={info.isTemplate ? "secondary" : "primary"}
          className={props.classes.wrapperButton}
          onClick={props.helpers.selectPath.bind(null, [...pathSoFar])}
        >
          {info.name}
        </Button>
      );
    });
  }

  // now we need to build the settings
  let settingsForNode: React.ReactNode = null;

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

    // and now we can build these settings
    // basically here we are building the divider and then
    // adding the panel, where the tabs allow us to switch
    // from each panel
    settingsForNode = (
      <>
        <Divider className={props.classes.separator} />
        <Typography className={props.classes.elementTitle} variant="h6">{selectedNodeInfo.name}</Typography>
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

  // now we return, wrapping the path data
  // into breadcrubs
  return (
    <>
      <Breadcrumbs>
        {pathData}
      </Breadcrumbs>
      {settingsForNode}
    </>
  );
}
