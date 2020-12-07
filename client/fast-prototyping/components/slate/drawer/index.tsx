import React, { useCallback, useState } from "react";
import {
  Breadcrumbs, Button, Divider, Typography, Tab, Tabs, BorderStyleIcon, TouchAppIcon, WebIcon, Paper, SettingsIcon
} from "../../../mui-core";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import { Path } from "slate";
import { GeneralOptions } from "./general";
import { StylesOptions } from "./styles";

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

function getInfoOf(node: any): INodeInfo {
  const isInteractive = templatedInteractiveActions.some((attr) => !!node[attr]);
  const isTemplateStyled = templatedStyledAttributes.some((attr) => !!node[attr]);
  const isBasicStyled = !!node.style || (node.richClassList && node.richClassList.length);
  const isBasicTemplated = templatedAttributes.some((attr) => !!node[attr]);
  const isTemplate = isInteractive || isTemplateStyled || isBasicTemplated;
  const specialType = node.containerType || node.customType;

  return {
    isTemplate,
    name: (
      (isBasicStyled || isTemplateStyled ? "styled " : "") +
      (isInteractive ? "interactive " : "") +
      (isTemplate ? "template " : "") +
      (node.type || "text") +
      (specialType ? " (" + specialType + ")" : "")
    ),
    isText: typeof node.text === "string",
  }
}

export function WrapperDrawer(props: MaterialUISlateWrapperWithStyles) {
  const [location, setLocation] = useState("MAIN");

  const setLocationCallback = useCallback((e: React.ChangeEvent, value: string) => {
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
      const info = getInfoOf(currentRichElement);

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
    const selectedNodeInfo = getInfoOf(props.info.currentSelectedNode);

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
                    title="general options"
                  />
                  {
                    props.featureSupport.supportsCustomStyles || props.featureSupport.supportsRichClasses ?
                      (
                        <Tab
                          className={props.classes.tab}
                          label={<BorderStyleIcon />}
                          value="STYLES"
                          title="configure styles"
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
                          title="templating"
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
                          title="actions"
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