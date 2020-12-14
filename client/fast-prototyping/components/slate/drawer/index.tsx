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

const templatedAttributes = [
  "thref",
  "templateText",
  "forEach",
  "context",
  "uiHandler",
];

const templatedStyledAttributes = [
  "styleHover",
  "styleActive",
];

interface INodeInfo {
  name: string;
  isTemplate: boolean;
  isText: boolean;
}

function getInfoOf(node: any, i18nData: IPropertyEntryI18nRichTextInfo): INodeInfo {
  const isInteractive = templatedInteractiveActions.some((attr) => !!node[attr]);
  const isTemplateStyled = templatedStyledAttributes.some((attr) => !!node[attr]);
  const isBasicStyled = !!node.style || (node.richClassList && node.richClassList.length);
  const isBasicTemplated = templatedAttributes.some((attr) => !!node[attr]);
  const isTemplate = isInteractive || isTemplateStyled || isBasicTemplated;

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

  return {
    isTemplate,
    name: nameLabel,
    isText: typeof node.text === "string",
  }
}

export function WrapperDrawer(props: MaterialUISlateWrapperWithStyles) {
  const [location, setLocation] = useState(localStorage.getItem("SLATE_DRAWER_LAST_LOCATION") || "MAIN");

  const setLocationCallback = useCallback((e: React.ChangeEvent, value: string) => {
    localStorage.setItem("SLATE_DRAWER_LAST_LOCATION", value);
    setLocation(value);
  }, []);

  let pathData: React.ReactNode;
  if (props.info.selectedOriginAnchor) {
    const isTextAnchorTemplateRelevant = !!props.info.currentSelectedNodeOrigin.templateText;

    let currentRichElement = {
      children: props.info.currentValue,
    } as any;
    let pathSoFar: Path = [];
    pathData = props.info.selectedOriginAnchor.map((p, index) => {
      currentRichElement = currentRichElement.children[p];
      pathSoFar.push(p);

      if (!isTextAnchorTemplateRelevant && index === props.info.selectedOriginAnchor.length - 1) {
        return null;
      }

      const isSelected = Path.equals(props.info.selectedAnchor, pathSoFar);
      const info = getInfoOf(currentRichElement, props.i18nRichInfo);

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

  let settingsForNode: React.ReactNode = null;
  if (props.info.currentSelectedNode) {
    const selectedNodeInfo = getInfoOf(props.info.currentSelectedNode, props.i18nRichInfo);

    let actualLocation = location;
    if (actualLocation !== "MAIN" && selectedNodeInfo.isText) {
      actualLocation = "MAIN";
    }

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

  return (
    <>
      <Breadcrumbs>
        {pathData}
      </Breadcrumbs>
      {settingsForNode}
    </>
  );
}