import React from "react";
import {
  Breadcrumbs, Button, Divider, Typography,
} from "../../mui-core";
import { MaterialUISlateWrapperWithStyles } from "./wrapper";
import { Path } from "slate";

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
  let pathData: React.ReactNode;
  if (props.info.textAnchor) {
    const isTextAnchorTemplateRelevant = !!props.info.currentText.templateText;

    let currentRichElement = {
      children: props.info.currentValue,
    } as any;
    let pathSoFar: Path = [];
    pathData = props.info.textAnchor.map((p, index) => {
      currentRichElement = currentRichElement.children[p];
      pathSoFar.push(p);

      if (!isTextAnchorTemplateRelevant && index === props.info.textAnchor.length - 1) {
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
          onMouseDown={props.helpers.blockBlur}
          onMouseUp={props.helpers.releaseBlur}
        >
          {info.name}
        </Button>
      );
    });
  }

  let settingsForNode: React.ReactNode = null;
  if (props.info.currentSelectedNode) {
    const selectedNodeInfo = getInfoOf(props.info.currentSelectedNode);
    settingsForNode = (
      <>
        <Divider className={props.classes.separator}/>
        <Typography className={props.classes.elementTitle} variant="h6">{selectedNodeInfo.name}</Typography>
        {
          !selectedNodeInfo.isText ?
            (
              <>
                <Divider className={props.classes.separator}/>
                {
                  props.featureSupport.canSetStyle || props.featureSupport.canInsertRichClass ?
                    (
                      <Button fullWidth={true} size="small">Configure Style</Button>
                    ) :
                    null
                }
                {
                  props.featureSupport.canSetActionFunction ?
                    (
                      <Button fullWidth={true} size="small">Configure Actions</Button>
                    ) :
                    null
                }
                {
                  props.featureSupport.supportsContainers ?
                    (
                      <Button fullWidth={true} size="small">Insert Container</Button>
                    ) :
                    null
                }
                {
                  props.featureSupport.supportsCustom ?
                    (
                      <Button fullWidth={true} size="small">Insert Custom Element</Button>
                    ) :
                    null
                }
                {
                  props.featureSupport.supportsTemplating ?
                    (
                      <Button fullWidth={true} size="small">Insert Template Text</Button>
                    ) :
                    null
                }
                {
                  props.featureSupport.canSetLoop ?
                    (
                      <Button fullWidth={true} size="small">Insert Loop</Button>
                    ) :
                    null
                }
                {
                  props.featureSupport.canSetUIHandler ?
                    (
                      <Button fullWidth={true} size="small">Insert UI Handled Element</Button>
                    ) :
                    null
                }
              </>
            ) : null
        }
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