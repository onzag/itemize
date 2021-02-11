import { RichElement } from "../../../../internal/text/serializer";
import { Path } from "slate";
import { IPropertyEntryI18nRichTextInfo } from "../../../../internal/components/PropertyEntry/PropertyEntryText";
import { localeReplacer } from "../../../../../util";
import React from "react";
import {
  Button
} from "../../../mui-core";
import ReactDOM from "react-dom";

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
  "textContent",
  "html",
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
export function getInfoOf(node: any, i18nData: IPropertyEntryI18nRichTextInfo): INodeInfo {
  // check for whether is interactive and other options
  const isInteractive = templatedInteractiveActions.some((attr) => !!node[attr]);
  const isTemplateStyled = templatedStyledAttributes.some((attr) => !!node[attr]);
  const isBasicStyled = !!node.style || (node.richClassList && node.richClassList.length);
  const isBasicTemplated = templatedAttributes.some((attr) => !!node[attr]);
  const isTemplate = isInteractive || isTemplateStyled || isBasicTemplated;

  // now let's build the name label for the given language
  let nameLabel: string = node.type ? (i18nData[node.type] || node.type) : i18nData.text;
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

interface ITreeProps {
  currentSelectedNode: RichElement;
  currentSelectedNodePath: Path;
  currentRichElement: RichElement;
  currentPath: Path;
  i18nRichInfo: IPropertyEntryI18nRichTextInfo;
  buttonClassName: string;
  childrenBoxClassName: string;
  onSelectPath: (p: Path) => void;
}

interface ITreeState {
  dragging: boolean;
  x: number;
  y: number;
  initialX: number;
  initialY: number;
}

export class Tree extends React.PureComponent<ITreeProps, ITreeState> {
  private bodyDiv: HTMLDivElement;
  private lastEffectTime: number;
  constructor(props: ITreeProps) {
    super(props);

    this.state = {
      dragging: false,
      x: null,
      y: null,
      initialX: null,
      initialY: null,
    };

    this.startDragMouse = this.startDragMouse.bind(this);
    this.startDragTouch = this.startDragTouch.bind(this);
    this.moveDragMouse = this.moveDragMouse.bind(this);
    this.moveDragTouch = this.moveDragTouch.bind(this);
    this.endDragMouse = this.endDragMouse.bind(this);
    this.endDragTouch = this.endDragTouch.bind(this);
  }
  public startDragMouse(e: React.MouseEvent) {
    document.body.addEventListener("mousemove", this.moveDragMouse);
    document.body.addEventListener("mouseup", this.endDragMouse);
    this.startDrag(e.clientX, e.clientY);
  }
  public startDragTouch(e: React.TouchEvent) {

  }
  public startDrag(x: number, y: number) {
    this.lastEffectTime = (new Date()).getTime();
    this.bodyDiv = document.createElement("div");
    document.body.appendChild(this.bodyDiv);

    this.setState({
      dragging: true,
      x,
      y,
      initialX: x,
      initialY: y,
    });
  }
  public moveDragMouse(e: MouseEvent) {
    this.moveDrag(e.clientX, e.clientY);
  }
  public moveDragTouch(e: TouchEvent) {

  }
  public moveDrag(x: number, y: number) {
    if (!this.state.dragging) {
      return;
    }

    this.setState({
      x,
      y,
    });
  }
  public endDragMouse(e: MouseEvent) {
    document.body.removeEventListener("mousemove", this.moveDragMouse);
    document.body.removeEventListener("mouseup", this.endDragMouse);
    this.endDrag();
  }
  public endDragTouch(e: TouchEvent) {

  }
  public endDrag() {
    if (!this.state.dragging) {
      return;
    }

    const endTime = (new Date()).getTime();
    if (endTime - this.lastEffectTime <= 300) {
      this.props.onSelectPath(this.props.currentPath);
    }

    this.setState({
      dragging: false,
      x: null,
      y: null,
      initialX: null,
      initialY: null,
    }, () => {
      document.body.removeChild(this.bodyDiv);
      this.bodyDiv = null;
    });
  }
  public render() {
    // and now let's find what we will choose
    let currentRichElement = this.props.currentRichElement;

    let childTree: React.ReactNode = null;
    if (currentRichElement.children && currentRichElement.children.length) {
      childTree = (currentRichElement.children as any).map((c: RichElement, index: number) => (
        c.type ? <Tree
          {...this.props}
          currentPath={[...this.props.currentPath, index]}
          currentRichElement={c}
          key={index}
        /> : null
      ));
    }

    // now if we are selected we must make it clear
    const isSelected = currentRichElement === this.props.currentSelectedNode;
    const isSemiSelected = !isSelected && this.props.currentSelectedNodePath &&
      Path.isDescendant(this.props.currentSelectedNodePath, this.props.currentPath);
    const info = currentRichElement.type ? getInfoOf(currentRichElement, this.props.i18nRichInfo) : null;

    if (!info) {
      return childTree;
    }

    const internals = (
      <>
        <Button
          size="small"
          variant={isSelected ? "contained" : (isSemiSelected ? "outlined" : "text")}
          color={info.isTemplate ? "secondary" : "primary"}
          className={this.props.buttonClassName}
          onMouseDown={this.startDragMouse}
          onTouchStart={this.startDragTouch}
        >
          {info.name}
        </Button>
        {childTree ? <div className={this.props.childrenBoxClassName}>
          {childTree}
        </div> : null}
      </>
    );

    const shouldShowDrag = this.state.dragging && (
      Math.abs(this.state.x - this.state.initialX) >= 2.5 ||
      Math.abs(this.state.y - this.state.initialY) >= 2.5
    );

    return (
      shouldShowDrag ? ReactDOM.createPortal(
        <div style={{ position: "fixed", left: this.state.x, top: this.state.y }}>
          {internals}
        </div>,
        this.bodyDiv,
      ) : internals
    );
  }
}