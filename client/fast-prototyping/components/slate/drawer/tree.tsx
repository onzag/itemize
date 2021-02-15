import { RichElement } from "../../../../internal/text/serializer";
import { Path } from "slate";
import { IPropertyEntryI18nRichTextInfo } from "../../../../internal/components/PropertyEntry/PropertyEntryText";
import { localeReplacer } from "../../../../../util";
import React from "react";
import {
  Button
} from "../../../mui-core";
import ReactDOM from "react-dom";
import { toJSON } from "yaml/util";

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
  let nameLabel: string = node.givenName ? node.givenName : (node.type ? (i18nData[node.type] || node.type) : i18nData.text);
  if (!node.givenName) {
    if (isBasicStyled || isTemplateStyled) {
      nameLabel = localeReplacer(i18nData.styled, nameLabel);
    }
    if (isInteractive) {
      nameLabel = localeReplacer(i18nData.interactive, nameLabel);
    }
    if (isTemplate) {
      nameLabel = localeReplacer(i18nData.template, nameLabel);
    }
  }

  // and we can return the information now
  return {
    isTemplate,
    name: nameLabel,
    isText: typeof node.text === "string",
  }
}

function canAcceptAsChildren(expectedParent: RichElement, expectedChild: RichElement) {
  const expectedParentContainment = expectedParent ? (expectedParent.containment || "superblock") : "superblock";

  if (expectedParentContainment === "superblock") {
    return true;
  }

  if (
    expectedParentContainment === "inline" ||
    expectedParentContainment.startsWith("void") ||
    expectedParent.html ||
    expectedParent.textContent
  ) {
    return false;
  }

  if (expectedParentContainment === "block") {
    return expectedChild.containment === "inline" || expectedChild.containment === "void-inline";
  }

  if (expectedParentContainment === "list-superblock") {
    return expectedChild.containment === "block";
  }

  return false;
}

interface IDraggingElementInfo {
  path: Path;
  element: RichElement;
}

interface ITreeProps {
  currentSelectedNode: RichElement;
  currentSelectedNodePath: Path;
  currentRichElement: RichElement;
  parentRichElement: RichElement;
  currentPath: Path;
  currentIsLastInPath: boolean;
  i18nRichInfo: IPropertyEntryI18nRichTextInfo;
  buttonClassName: string;
  dropPositionEnabledClassName: string;
  dropPositionDisabledClassName: string;
  childrenBoxClassName: string;
  onSelectPath: (p: Path) => void;
  parentDraggingAt?: IDraggingElementInfo;
  onBeginDrag?: (element: RichElement, at: Path) => void;
  onEndDrag?: () => void;
  moveFromTo: (from: Path, to: Path) => void;
}

interface ITreeState {
  draggingAt: IDraggingElementInfo;
  dragging: boolean;
  showDrag: boolean;
  x: number;
  y: number;
  initialX: number;
  initialY: number;
  calculatedHoleHeight: number;
}

export class Tree extends React.PureComponent<ITreeProps, ITreeState> {
  private bodyDiv: HTMLDivElement;
  private lastEffectTime: number;
  private internalsRef: React.RefObject<HTMLDivElement>;
  constructor(props: ITreeProps) {
    super(props);

    this.state = {
      draggingAt: null,
      dragging: false,
      showDrag: false,
      x: null,
      y: null,
      initialX: null,
      initialY: null,
      calculatedHoleHeight: null,
    };

    this.internalsRef = React.createRef();

    this.startDragMouse = this.startDragMouse.bind(this);
    this.startDragTouch = this.startDragTouch.bind(this);
    this.moveDragMouse = this.moveDragMouse.bind(this);
    this.moveDragTouch = this.moveDragTouch.bind(this);
    this.endDragMouse = this.endDragMouse.bind(this);
    this.endDragTouch = this.endDragTouch.bind(this);
    this.onTreeElementBeginsDrag = this.onTreeElementBeginsDrag.bind(this);
    this.onTreeElementEndsDrag = this.onTreeElementEndsDrag.bind(this);
  }
  public componentDidUpdate(prevProps: ITreeProps, prevState: ITreeState) {
    if (this.state.dragging && !this.state.showDrag) {
      const shouldShowDrag = this.state.dragging && (
        Math.abs(this.state.x - this.state.initialX) >= 2.5 ||
        Math.abs(this.state.y - this.state.initialY) >= 2.5
      );
      if (shouldShowDrag) {
        this.setState({
          showDrag: true,
        });
      }
    }

    if (prevState.showDrag && !this.state.showDrag) {
      this.props.onEndDrag && this.props.onEndDrag();
    } else if (this.state.showDrag && !prevState.showDrag) {
      this.props.onBeginDrag && this.props.onBeginDrag(this.props.currentRichElement, this.props.currentPath);
    }
  }
  public onTreeElementBeginsDrag(element: RichElement, at: Path) {
    this.setState({
      draggingAt: {
        element,
        path: at,
      },
    });
    this.props.onBeginDrag && this.props.onBeginDrag(element, at);
  }
  public onTreeElementEndsDrag() {
    this.setState({
      draggingAt: null,
    });
    this.props.onEndDrag && this.props.onEndDrag();
  }
  public startDragMouse(e: React.MouseEvent) {
    document.body.addEventListener("mousemove", this.moveDragMouse);
    document.body.addEventListener("mouseup", this.endDragMouse);
    this.startDrag(e.clientX, e.clientY);
  }
  public startDragTouch(e: React.TouchEvent) {
    document.body.addEventListener("touchmove", this.moveDragTouch);
    document.body.addEventListener("touchend", this.endDragTouch);
    this.startDrag(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
  }
  public startDrag(x: number, y: number) {
    this.lastEffectTime = (new Date()).getTime();
    this.bodyDiv = document.createElement("div");
    document.body.appendChild(this.bodyDiv);

    this.setState({
      dragging: true,
      showDrag: false,
      x,
      y,
      initialX: x,
      initialY: y,
      calculatedHoleHeight: this.internalsRef.current.offsetHeight,
    });
  }
  public moveDragMouse(e: MouseEvent) {
    this.moveDrag(e.clientX, e.clientY);
  }
  public moveDragTouch(e: TouchEvent) {
    this.moveDrag(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
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
    document.body.removeEventListener("touchmove", this.moveDragTouch);
    document.body.removeEventListener("touchend", this.endDragTouch);
    this.endDrag();
  }
  public endDrag() {
    if (!this.state.dragging) {
      return;
    }

    const endTime = (new Date()).getTime();
    if (endTime - this.lastEffectTime <= 300) {
      this.props.onSelectPath(this.props.currentPath);
    }

    const element = document.elementFromPoint(this.state.x, this.state.y) as HTMLDivElement;
    const pathSource = element.dataset && element.dataset.path;
    if (pathSource) {
      const givenPath = JSON.parse(pathSource);
      this.props.moveFromTo(this.props.currentPath, givenPath);
    }

    this.setState({
      dragging: false,
      showDrag: false,
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

    const draggingAt = this.props.parentDraggingAt || this.state.draggingAt;
    const shouldShowDrop = !this.state.showDrag && draggingAt;

    let childTree: React.ReactNode = null;
    const accessibleChildren = currentRichElement.children && currentRichElement.children.filter((c) => !!(c as any).type);
    if (accessibleChildren && accessibleChildren.length) {
      childTree = (accessibleChildren as any).map((c: RichElement, index: number) => (
        <Tree
          {...this.props}
          currentPath={[...this.props.currentPath, index]}
          currentIsLastInPath={index === currentRichElement.children.length - 1}
          currentRichElement={c}
          parentRichElement={this.props.currentRichElement}
          key={index}
          parentDraggingAt={draggingAt}
          onBeginDrag={this.onTreeElementBeginsDrag}
          onEndDrag={this.onTreeElementEndsDrag}
        />
      ));
    } else if (!currentRichElement.textContent && !currentRichElement.html) {
      let childPath: Path = null;
      if (shouldShowDrop) {
        childPath = [...this.props.currentPath, 0];
      }

      childTree = shouldShowDrop && canAcceptAsChildren(this.props.currentRichElement, draggingAt.element) ?
        (
          <div className={this.props.dropPositionEnabledClassName} data-path={JSON.stringify(childPath)} />
        ) :
        (
          <div className={this.props.dropPositionDisabledClassName} />
        );
    }

    // now if we are selected we must make it clear
    const isSelected = currentRichElement === this.props.currentSelectedNode;
    const isSemiSelected = !isSelected && this.props.currentSelectedNodePath &&
      Path.isDescendant(this.props.currentSelectedNodePath, this.props.currentPath);
    const info = currentRichElement.type ? getInfoOf(currentRichElement, this.props.i18nRichInfo) : null;

    if (!info) {
      return childTree;
    }

    let shouldShowSiblingDrops = shouldShowDrop && canAcceptAsChildren(this.props.parentRichElement, draggingAt.element);

    let prevPath: Path = null;
    if (shouldShowSiblingDrops) {
      prevPath = [...this.props.currentPath];
      prevPath[prevPath.length - 1]--;
    }

    const prevSpacer =
      shouldShowSiblingDrops && !Path.equals(prevPath, draggingAt.path) ?
        (
          <div className={this.props.dropPositionEnabledClassName} data-path={JSON.stringify(this.props.currentPath)} />
        ) :
        (
          <div className={this.props.dropPositionDisabledClassName} />
        );

    let nextPath: Path = null;
    if (this.props.currentIsLastInPath && shouldShowSiblingDrops) {
      nextPath = [...this.props.currentPath];
      nextPath[nextPath.length - 1]++;
    }

    const nextSpacer = this.props.currentIsLastInPath ? (
      shouldShowSiblingDrops && !Path.equals(nextPath, draggingAt.path) ?
        (
          <div className={this.props.dropPositionEnabledClassName} data-path={JSON.stringify(nextPath)} />
        ) :
        (
          <div className={this.props.dropPositionDisabledClassName} />
        )
    ) : null;

    const internals = (
      <div ref={this.internalsRef}>
        {prevSpacer}
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
        <div className={this.props.childrenBoxClassName}>
          {childTree}
        </div>
        {nextSpacer}
      </div>
    );

    return (
      this.state.showDrag ? <>
        {
          ReactDOM.createPortal(
            <div style={{ position: "fixed", left: this.state.x + 1, top: this.state.y + 1, zIndex: 1000 }}>
              {internals}
            </div>,
            this.bodyDiv,
          )
        }
        <div style={{ height: this.state.calculatedHoleHeight }} />
      </> : internals
    );
  }
}