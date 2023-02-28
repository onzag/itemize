/**
 * This is a dropdown that is used for having an editor functionality like
 * toolbar, used a lot in the fast prototyping material editor
 */

import type { SxProps, Theme } from "@mui/material";
import ReactDOM from "react-dom";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";

const styles = {
  fakeContainer: {
    display: "contents"
  },
  dropdown: {
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(240, 240, 240, 0.9)",
    border: "solid 1px #707070",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
  dropdownSizable: {
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(240, 240, 240, 0.9)",
    border: "solid 1px #ccc",
  },
  linkTemplateOptionsBox: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 0 0 0",
  },
  linkTemplateOptionsText: {
    textAlign: "center",
    color: "#aaa",
    paddingBottom: "1rem",
  },
  optionPrimary: {
    fontWeight: 700,
    color: "#1b5e20",
  },
  whiteBackgroundInput: {
    backgroundColor: "white",
  },
  hidden: {
    display: "none",
  },
  upsideDown: {
    transform: "scaleY(-1)",
  },
  fixedWidthInput: {
    width: 200,
  }
}

/**
 * The props for the dropdown
 */
interface IEditorDropdown {
  /**
   * wether it is open
   */
  isOpen: boolean;
  /**
   * What zIndex to use when popping up
   */
  zIndex?: number;
  /**
   * the contents of the dropdown itself
   */
  dropdown: React.ReactNode;
  /**
   * The component the dropdown is using as a wrapper
   * for the element
   */
  componentWrapper: string;
  /**
   * sx for the component the dropdown is using
   * normally should use display:contents
   */
  componentWrapperSx?: SxProps<Theme>;
  /**
   * props to pass to the component wrapper
   */
  componentWrapperProps?: any;
  /**
   * whether the component wrapper should be hidden
   */
  componentWrapperHidden?: boolean;
  /**
   * the dropdown sx, the dropdown is a div
   */
  dropdownSx?: SxProps<Theme>;
  /**
   * whether to use the dropdown as sizable
   */
  dropdownSizable?: boolean;
  /**
   * the element that is to be rendered
   */
  children: React.ReactNode;
  /**
   * the dropdown will anchor itself normally to the next available element node
   * either the first or the last depending on their position, use this to tune the direction
   * for example with a value of 2
   * 
   * <div class="wrapper">
   *   <div class="element-in-question">
   *     <div class="something">
   *       <div class="something-else">
   *       </div>
   *     </div>
   *   </div>
   * </div>
   * 
   * it will use "something-else" as the positioning element, however reverse values are also valid
   * 
   * <div class="parent">
   *   <div class="wrapper">
   *     <div class="element-in-question">
   *       <div class="something">
   *         <div class="something-else">
   *         </div>
   *       </div>
   *     </div>
   *   </div>
   * </div>
   * 
   * with a value of -2 "parent" will be used instead
   */
  goIntoTreeDepth?: number;

  /**
   * if true the element will trigger a onClose event when anything
   * outside of it is clicked or touched
   */
  closeable?: boolean;

  /**
   * only relevant if closeable is true, will be called once the element
   * gets triggered by something outside of it
   */
  onClose?: () => void;

  /**
   * Instead of creating a dropdown directly as its container
   * it will position a container instead
   */
  containWithinBox?: boolean;
  containerBoxSx?: SxProps<Theme>;

  /**
   * where to place the portal, by default the html body
   */
  portalElement?: HTMLElement;

  /**
   * By default whether the element that represents the menu overflows the window is calculated
   * using the following formula
   * 
   * 1. calculate the top position relative to the entire document top + document.body.parentElement.scrollTop
   * 2. use the document.body.parentElement.scrollHeight to know how much space we have left and substract that top
   *   2.1 we remove currentoverflow because in case we already have added overflow spacer to add for that space
   * 3. compare that number to the height
   * 4. returns by how many pixes it overflows, negative numbers or zero means no overflow, otherwise it overflows and a spacer needs to be built
   * @param element 
   * @returns by how many pixels it overflows
   */
  portalElementOverflowCalculator?: (top: number, height: number) => number;

  /**
   * To generate a spacer that will be attached to the body
   * 
   * because of the way the standard itemize app is generated where #app and #main are of effective height of 100%
   * this formula uses document.body.parentElement.scrollHeight - window.innerHeight + overflow +25 for the height
   * rather than using the overflow specific value
   * 
   * @param overflow 
   * @returns 
   */
  portalElementOverflowSpacerHeightCalculator?: (overflow: number) => number;

  /**
   * To generate a spacer that will be attached to the body
   * 
   * @param height 
   * @returns 
   */
  portalElementOverflowSpacerGenerator?: (height: number, ref: React.RefObject<HTMLElement>) => React.ReactNode;
}

function defaultPortalElementOverflowCalculator(top: number, height: number): number {
  const reference = document.body.parentElement;
  const positionTopOverall = top + reference.scrollTop;
  const availableHeight = reference.scrollHeight;
  const spaceRemaining = availableHeight - positionTopOverall;
  return height - spaceRemaining;
}

function defaultPortalElementOverflowSpacerHeightCalculator(overflow: number) {
  const reference = document.body.parentElement;
  return reference.scrollHeight - window.innerHeight + overflow;
}

function defaultPortalElementOverflowSpacerGenerator(height: number, ref: React.RefObject<HTMLElement>) {
  return (<div ref={ref as any} style={{ height, backgroundColor: "#eee" }}></div>)
}

function isInDropdownOrWrapper(
  ele: HTMLElement,
  dropdownItself: HTMLElement,
  wrapperContainer: HTMLElement,
): boolean {
  if (
    ele === dropdownItself ||
    ele === wrapperContainer
  ) {
    return true;
  }

  if (ele.parentElement) {
    return isInDropdownOrWrapper(ele.parentElement, dropdownItself, wrapperContainer);
  }

  return false;
}

export function EditorDropdown(props: IEditorDropdown) {
  const boxRef = useRef<HTMLElement>();
  const dropdownRef = useRef<HTMLElement>();
  // cannot rely in react state for this because the state does not represent the reality of the component
  // in the DOM
  const overflowElement = useRef<HTMLElement>();
  const [pos, setPos] = useState<[number, number, number]>(null);

  const [overflowSpacerHeight, setOverflowSpacerHeight] = useState(0);
  const [currentOverflow, setCurrentOverflow] = useState(0);
  const congruentTimer = useRef(null as NodeJS.Timer);

  const recalculateOverflow = useCallback((top, height) => {
    // overflow is only recalculated only if it does not have a height of zero
    if (!overflowElement.current || !overflowElement.current.offsetHeight) {
      const newOverflow = props.portalElementOverflowCalculator ?
        props.portalElementOverflowCalculator(top, height) :
        defaultPortalElementOverflowCalculator(top, height);

      if (newOverflow > 0) {
        const newHeight = (
          props.portalElementOverflowSpacerHeightCalculator ?
            props.portalElementOverflowSpacerHeightCalculator(newOverflow) :
            defaultPortalElementOverflowSpacerHeightCalculator(newOverflow)
        ) + 25;
        setOverflowSpacerHeight(newHeight);
        setCurrentOverflow(newOverflow);
      } else {
        setOverflowSpacerHeight(0);
        setCurrentOverflow(0);
      }
    }
  }, [props.portalElementOverflowCalculator, props.portalElementOverflowSpacerHeightCalculator]);

  const congruentTimerExec = useCallback(() => {
    if (dropdownRef.current && overflowElement.current) {
      const clientRect = dropdownRef.current.getBoundingClientRect();
      const currentHeight = clientRect.height;
      const currentTop = clientRect.top;

      const moreOverflow = props.portalElementOverflowCalculator ?
        props.portalElementOverflowCalculator(currentTop, currentHeight) :
        defaultPortalElementOverflowCalculator(currentTop, currentHeight);

      if (moreOverflow > 0) {
        const newOverflow = currentOverflow + moreOverflow;
        setCurrentOverflow(newOverflow);

        const overflowElementHeight = overflowElement.current.offsetHeight;
        const newHeight = overflowElementHeight + moreOverflow + 25;

        setOverflowSpacerHeight(newHeight);
      }
    }
  }, [currentOverflow]);

  const updatePos = useCallback(() => {
    if (!boxRef.current) {
      return;
    }

    // if it's using the sibling strategy where the element is in the sibling side rather than down in there
    // we gotta use the parent as the source of our children
    const children = Array.from(boxRef.current.childNodes);
    // now we grab the first node
    let firstNode = children[0] as HTMLElement;
    // same because our element would be last if we used previous children we gotta move two sides
    let lastNode = children[children.length - 1] as HTMLElement;

    if (props.goIntoTreeDepth) {
      const goTowardsParent = props.goIntoTreeDepth < 0;
      for (let i = 0; i < Math.abs(props.goIntoTreeDepth); i++) {
        if (!goTowardsParent) {
          firstNode = firstNode.childNodes[0] as HTMLElement;
          lastNode = lastNode.childNodes[lastNode.childNodes.length - 1] as HTMLElement;
        } else {
          firstNode = firstNode.parentElement as HTMLElement;
          lastNode = lastNode.parentElement as HTMLElement;
        }
      }
    }

    const firstNodeBoundingRect = firstNode.getBoundingClientRect();
    const lastNodeBoundingRect = lastNode.getBoundingClientRect();

    const lowermostNodeClientRect = firstNodeBoundingRect.bottom > lastNodeBoundingRect.bottom ? firstNodeBoundingRect : lastNodeBoundingRect;

    const leftMostPosition = lowermostNodeClientRect.left;
    const rightMostPosition = lowermostNodeClientRect.right;

    let left: number = null;
    let right: number = null;
    const widthToCompareAgainst = document.body.parentElement.getBoundingClientRect().width;
    if (leftMostPosition > (widthToCompareAgainst / 2)) {
      right = widthToCompareAgainst - rightMostPosition;
    } else {
      left = leftMostPosition;
    }

    const top = lowermostNodeClientRect.top + lowermostNodeClientRect.height;

    setPos([top, left, right]);

    if (dropdownRef.current) {
      const height = dropdownRef.current.getBoundingClientRect().height;

      recalculateOverflow(top, height);
    }
  }, [recalculateOverflow]);

  const callCloseable = useCallback((e: MouseEvent) => {
    if (props.closeable) {
      let wrapperRef = boxRef.current;
      if (props.goIntoTreeDepth) {
        const goTowardsParent = props.goIntoTreeDepth < 0;
        if (goTowardsParent) {
          wrapperRef = wrapperRef.parentElement as HTMLElement;
        }
      }
      if (!isInDropdownOrWrapper(e.target as HTMLElement, dropdownRef.current, wrapperRef)) {
        props.onClose();
      }
    }
  }, []);

  const updatePosDelayed = useCallback(() => {
    setTimeout(updatePos, 50);
  }, []);

  const posMassTrigger = useCallback(() => {
    const posInternal = setInterval(updatePos, 10);
    setTimeout(() => {
      clearInterval(posInternal);
    }, 600);
  }, []);

  useEffect(() => {
    if (props.isOpen) {
      updatePos();
      congruentTimer.current = setInterval(congruentTimerExec, 1000);

      window.addEventListener("SLATE_DRAWER_OPEN", posMassTrigger);
      window.addEventListener("keyup", updatePos);
      window.addEventListener("resize", updatePos);
      window.addEventListener("mouseup", updatePosDelayed);
      window.addEventListener("touchend", updatePosDelayed);
      window.addEventListener("scroll", updatePos, true);
      window.addEventListener("mousedown", callCloseable);
      window.addEventListener("touchstart", callCloseable);

      return () => {
        window.removeEventListener("SLATE_DRAWER_OPEN", posMassTrigger);
        window.removeEventListener("keyup", updatePos)
        window.removeEventListener("resize", updatePos);
        window.removeEventListener("mouseup", updatePosDelayed);
        window.removeEventListener("touchend", updatePosDelayed);
        window.removeEventListener("scroll", updatePos, true);
        window.removeEventListener("mousedown", callCloseable);
        window.removeEventListener("touchstart", callCloseable);
        clearInterval(congruentTimer.current);
      }
    } else {
      setCurrentOverflow(0);
      setOverflowSpacerHeight(0);
    }
  }, [props.isOpen, updatePos, updatePosDelayed, posMassTrigger, callCloseable, congruentTimerExec]);


  const sx = [props.dropdownSizable ? styles.dropdownSizable : styles.dropdown];

  let portal: React.ReactNode = null;
  let overflowPortal: React.ReactNode = null;

  if (props.isOpen) {
    const style: any = pos ?
      { position: "fixed", top: pos[0], left: pos[1], right: pos[2], zIndex: typeof props.zIndex !== "undefined" ? props.zIndex : 500 } :
      { position: "fixed", top: 0, left: 0, visibility: "hidden", zIndex: typeof props.zIndex !== "undefined" ? props.zIndex : 500 };

    let elementInsidePortal = (
      <Box
        sx={Array.isArray(props.dropdownSx) ? props.dropdownSx.concat(sx) : [props.dropdownSx].concat(sx)}
        style={
          props.containWithinBox ? null : style
        }
        data-unblur="true"
        ref={props.containWithinBox ? null : dropdownRef}
      >
        {props.dropdown}
      </Box>
    );

    if (props.containWithinBox) {
      elementInsidePortal = (
        <Box
          sx={props.containerBoxSx}
          style={style}
          data-unblur="true"
          ref={dropdownRef}
        >
          {elementInsidePortal}
        </Box>
      );
    }

    portal = ReactDOM.createPortal(
      elementInsidePortal,
      props.portalElement || document.body,
    );

    overflowPortal = ReactDOM.createPortal((
      props.portalElementOverflowSpacerGenerator ?
        props.portalElementOverflowSpacerGenerator(overflowSpacerHeight, overflowElement) :
        defaultPortalElementOverflowSpacerGenerator(overflowSpacerHeight, overflowElement)
    ), props.portalElement || document.body);
  }

  return (
    <>
      <Box
        component={props.componentWrapper as any}
        sx={[props.componentWrapperSx, props.componentWrapperHidden ? styles.hidden : styles.fakeContainer]}
        ref={boxRef}
        {...props.componentWrapperProps}
      >
        {props.children}
      </Box>
      {portal}
      {overflowPortal}
    </>
  );
}