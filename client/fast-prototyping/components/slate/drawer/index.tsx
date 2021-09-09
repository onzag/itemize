/**
 * This file provides the drawer content that exists side to the rich text editor
 * when it is allowed to hold a drawer, the drawer contains a range of options to enable
 * templating or custom styling
 * @module
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { IWrapperContainerProps } from "../wrapper";
import { GeneralOptions } from "./general";
import { StylesOptions } from "./styles";
import { ActionsOptions } from "./actions";
import { TemplatingOptions } from "./templating";
import { getInfoOf, Tree } from "./tree";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SettingsIcon from "@material-ui/icons/Settings";
import BorderStyleIcon from "@material-ui/icons/BorderStyle";
import WebIcon from "@material-ui/icons/Web";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import Typography from "@material-ui/core/Typography";

class ScrollSlowly {
  private speed: number;
  private element: HTMLElement;
  private curScrollTop: number;
  constructor(speed: number, element: HTMLElement) {
    this.speed = speed;
    this.element = element;
    this.curScrollTop = element.scrollTop;

    this.run = this.run.bind(this);
    this.stop = this.stop.bind(this);
    this.change = this.change.bind(this);

    this.run();
  }
  public run() {
    if (this.speed === 0) {
      return;
    }

    const currentPos = this.element.scrollTop;
    if (this.speed < 0 && currentPos === 0) {
      return;
    } else if (this.speed > 0 && this.element.scrollHeight === this.element.offsetHeight + currentPos) {
      return;
    }

    const realSpeed = this.speed / 60;
    const nextPos = this.curScrollTop + realSpeed;

    this.curScrollTop = nextPos;
    this.element.scrollTop = nextPos;

    window.requestAnimationFrame(this.run);
  }
  public stop() {
    this.speed = 0;
  }
  public change(speed: number) {
    this.speed = speed;
  }
}

let currentScrollSlowlyElement: ScrollSlowly;

function scrollSlowly(speed: number, element: HTMLElement) {
  if (speed === 0) {
    if (currentScrollSlowlyElement) {
      currentScrollSlowlyElement.stop();
      currentScrollSlowlyElement = null;
    }
    return;
  }

  if (currentScrollSlowlyElement) {
    currentScrollSlowlyElement.change(speed);
  } else {
    currentScrollSlowlyElement = new ScrollSlowly(speed, element);
  }
}

/**
 * This is the wrapper drawer itself
 * @param props it takes the entire wrapper props with the styles
 */
export function WrapperDrawer(props: IWrapperContainerProps) {
  // we grab this from local storage, this won't affect SSR because the drawer won't
  // ever render in the server side, it's client side only, it's always technically closed
  // on the server side
  const [location, setLocation] = useState(localStorage.getItem("SLATE_DRAWER_LAST_LOCATION") || "MAIN");
  const [dragScroll, setDragScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>();

  // update the given location
  const setLocationCallback = useCallback((e: React.ChangeEvent, value: string) => {
    localStorage.setItem("SLATE_DRAWER_LAST_LOCATION", value);
    setLocation(value);
  }, []);

  const setScrollPositionCallback = useCallback((e: MouseEvent | TouchEvent) => {
    if (dragScroll) {
      const boundingRect = scrollRef.current.getBoundingClientRect();
      const cursorPositionY = (e instanceof MouseEvent) ? e.clientY : e.targetTouches[0].clientY;
      if (boundingRect.top > cursorPositionY) {
        const scrollTopIntensity = cursorPositionY - boundingRect.top;
        scrollSlowly(scrollTopIntensity, scrollRef.current);
      } else if (boundingRect.bottom < cursorPositionY) {
        const scrollBottomIntensity = cursorPositionY - boundingRect.bottom;
        scrollSlowly(scrollBottomIntensity, scrollRef.current);
      } else {
        scrollSlowly(0, scrollRef.current);
      }
    } else {
      scrollSlowly(0, scrollRef.current);
    }
  }, [dragScroll, scrollRef]);

  useEffect(() => {
    document.addEventListener("mousemove", setScrollPositionCallback);
    document.addEventListener("touchmove", setScrollPositionCallback);

    return () => {
      document.removeEventListener("mousemove", setScrollPositionCallback);
      document.removeEventListener("touchmove", setScrollPositionCallback);
    }
  })

  // but for that to be set we need to have something selected
  // in the rich text editor state
  const treeData = props.hideTree ? null : <Tree
    currentRichElement={props.state.currentValue as any}
    parentRichElement={null}
    currentSelectedElement={props.state.currentSelectedElement as any}
    currentSelectedElementPath={props.state.currentSelectedElementAnchor}
    dropPositionDisabledClassName={props.classes.dropPositionDisabled}
    dropPositionEnabledClassName={props.classes.dropPositionEnabled}
    currentIsLastInPath={true}
    currentPath={[]}
    i18nRichInfo={props.i18nRichInfo}
    buttonClassName={props.classes.wrapperButton}
    childrenBoxClassName={props.classes.treeChildrenBox}
    onSelectPath={props.helpers.selectPath}
    onDeletePath={props.helpers.deletePath}
    onBeginDrag={setDragScroll.bind(null, true)}
    onEndDrag={setDragScroll.bind(null, false)}
    moveFromTo={props.helpers.movePaths}
    scrollableAreaRef={scrollRef}
    treeElementClassName={props.classes.treeElement}
    deleteButtonClassName={props.classes.deleteButton}
    deleteIconClassName={props.classes.deleteIcon}
  />

  // now we need to build the settings
  let settingsForNode: React.ReactNode = null;
  let titleForNode: string = null;

  const drawerMode = props.drawerMode || "full";

  // and that's done based on the selected node
  if (props.state.currentSelectedElement) {
    // for that we get the info of the selected node
    const selectedNodeInfo = getInfoOf(props.state.currentSelectedElement, props.i18nRichInfo);

    // and we need to see in which location we are
    let actualLocation = location;
    // for text nodes there's only the main location
    if (
      actualLocation !== "MAIN" &&
      (
        selectedNodeInfo.isText ||
        drawerMode === "simple" ||
        drawerMode === "barebones"
      )
    ) {
      // so we override
      actualLocation = "MAIN";
    }

    if (
      actualLocation !== "MAIN" &&
      actualLocation !== "STYLES" &&
      drawerMode !== "full" &&
      drawerMode !== "with-styles"
    ) {
      // so we override
      actualLocation = "MAIN";
    }

    // and according to that decide which panel to render
    let infoPanel: React.ReactNode = null;
    switch (actualLocation) {
      case "MAIN":
        infoPanel = <GeneralOptions {...props}/>;
        break;
      case "STYLES":
        infoPanel = <StylesOptions {...props}/>;
        break;
      case "ACTIONS":
        infoPanel = <ActionsOptions {...props}/>;
        break;
      case "TEMPLATING":
        infoPanel = <TemplatingOptions {...props}/>;
        break;
    }

    titleForNode = selectedNodeInfo.name;

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
                {props.hideTree ? null : <Divider className={props.classes.separator} />}
                {
                  drawerMode !== "simple" && drawerMode !== "barebones" ? (
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
                        (props.featureSupport.supportsTemplating && drawerMode === "full") ?
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
                        (props.featureSupport.supportsTemplating && drawerMode === "full") ?
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
                  )
                    : null
                }
              </>
            ) : null
        }
        {infoPanel}
      </>
    );
  }

  // now we return
  return (
    <>
      {props.hideTree ? null : <>
        <Typography className={props.classes.elementTitle} variant="h6">{titleForNode}</Typography>
        <Divider className={props.classes.separator} />
        <div className={props.classes.treeDataBox} ref={scrollRef}>
          {treeData}
        </div>
      </>}
      {settingsForNode}
    </>
  );
}
