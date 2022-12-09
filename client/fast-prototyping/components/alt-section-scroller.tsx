import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AltScroller, { ActualAltScroller } from "../../components/accessibility/AltScroller";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReactDOM from "react-dom";

const style = {
  overlayContainer: {
    width: "12rem",
    height: "8rem",
    zIndex: 100000,
    top: "calc(50% - 4rem)",
    left: "calc(50% - 6rem)",
  },
  absolute: {
    position: "absolute",
  },
  fixed: {
    position: "fixed",
  },
  hidden: {
    display: "none",
  },
  overlay: {
    opacity: 0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "4rem",
    width: "4rem",
    backgroundColor: "#ffeb3b",
    position: "absolute",
  },
  top: {
    top: 0,
    left: "4rem",
    borderRadius: "50% 50% 0 0",
  },
  bottom: {
    bottom: 0,
    left: "4rem",
    borderRadius: "0 0 50% 50%",
  },
  left: {
    'html[dir="ltr"] &': {
      top: "2rem",
      left: 0,
      borderRadius: "50% 0 0 50%",
    },
    // flip: false,

    'html[dir="rtl"] &': {
      top: "2rem",
      right: 0,
      borderRadius: "0 50% 50% 0",
    },
  },
  right: {
    'html[dir="ltr"] &': {
      top: "2rem",
      right: 0,
      borderRadius: "0 50% 50% 0",
    },
    // flip: false,

    // emotion refuses to accept the flip: false and the weird noplip comment too so I must force it somehow to honor it
    // so this is the total opposite direction for the arrow but it gotta be done this way
    // because emotion doesn't work correctly
    'html[dir="rtl"] &': {
      top: "2rem",
      left: 0,
      borderRadius: "50% 0 0 50%",
    },
  },
  leftNoTB: {
    'html[dir="ltr"] &': {
      left: "2rem",
    },
    // flip: false,

    'html[dir="rtl"] &': {
      right: "2rem",
    },
  },
  rightNoTB: {
    'html[dir="ltr"] &': {
      right: "2rem",
    },
    // flip: false,
    'html[dir="rtl"] &': {
      left: "2rem",
    },
  },
  middle: {
    top: "2rem",
    left: "4rem",
    borderRadius: "50%",
  },
  available: {
    fontSize: "3rem",
  }
}

interface IAltSectionScrollerProps {
  /**
   * the overlay component by default a div
   */
  component?: string;
  /**
   * The positioning to use, by default absolute
   * 
   * dynamic fixed will find the centerpoint of the box and use fixed
   * positioning instead
   */
  positioning?: "absolute" | "fixed" | "dynamic-fixed";
  /**
   * When using dynamic fixed you may want to calculate the positioning yourself rather than just
   * use the dead center
   */
  dyamicFixedCalculator?: (element: HTMLElement, centerX: number, centerY: number) => [number, number];
  /**
   * a css selector to choose the component that is relevant that the
   * user is supposed to interact with, by default it will simply pick the first child node
   */
  parentSelector?: string;
  /**
   * Will select the scrollable box based on a child, can be combined with a parent
   */
  childSelector?: string;
  /**
   * What color to use
   */
  colorSchema?: "default" | "contrast";
  /**
   * whether it is currently disabled
   */
  disabled?: boolean;
  /**
   * The priority by default 0, for example, let's say there's an element like a toolbar that is to be
   * used only when a certain element is focused, when such element is focused the alt reactioners
   * may have priority 1, and none of the priority 0 elements will display, of course, this is only
   * usable if you use it in conjuction with disabled
   */
  priority?: number;
  /**
   * Whether to use a portal, only truly relevant when
   * its position is fixed or dynamic fixed
   */
  usePortal?: boolean;
}

export function AltSectionScroller(
  props: IAltSectionScrollerProps,
): any {
  const scrollerRef = useRef<ActualAltScroller>();

  const [fixedPos, setPos] = useState<[number, number]>(null);

  const updateDynamicPos = useCallback(() => {
    if (scrollerRef.current && props.positioning === "dynamic-fixed") {
      let element = scrollerRef.current.getScrollableComponent();

      const boundingRect = element.getBoundingClientRect();

      let centerX = boundingRect.x + boundingRect.width / 2;
      let centerY = boundingRect.y + boundingRect.height / 2;

      if (props.dyamicFixedCalculator) {
        [centerX, centerY] = props.dyamicFixedCalculator(element, centerX, centerY)
      }

      setPos([centerX, centerY]);
    }
  }, [scrollerRef, props.positioning]);

  useEffect(() => {
    if (props.positioning === "dynamic-fixed") {
      updateDynamicPos();

      window.addEventListener("resize", updateDynamicPos);

      return () => {
        window.removeEventListener("resize", updateDynamicPos);
      }
    } else {
      setPos(null);
    }
  }, [props.positioning]);

  return (
    <AltScroller
      {...props}
      onDisplay={updateDynamicPos}
      ref={scrollerRef}
    >
      {(scrolling, direction) => {
        if (!scrolling) {
          return null;
        }

        const element = (
          <Box
            sx={
              [
                style.overlayContainer,
                (fixedPos || props.positioning === "fixed") ? style.fixed : (
                  (props.positioning === "absolute" || !props.positioning) ? style.absolute : style.hidden
                ),
              ]
            }
            style={
              fixedPos ? {
                left: "calc(" + fixedPos[0] + "px - 6rem)",
                top: "calc(" + fixedPos[1] + "px - 4rem)",
              } : null
            }
          >
            {
              !direction.up &&
                !direction.down &&
                !direction.left &&
                !direction.right ? (
                <Box
                  component={props.component as any || "div"}
                  sx={[
                    style.overlay,
                    style.middle,
                  ]}
                ></Box>
              ) : null
            }
            {direction.up || direction.down ? <Box
              component={props.component as any || "div"}
              sx={[
                style.overlay,
                style.top,
              ]}
            >
              <ArrowUpwardIcon sx={direction.up ? style.available : null} />
            </Box> : null}
            {direction.up || direction.down ? <Box
              component={props.component as any || "div"}
              sx={[
                style.overlay,
                style.bottom,
              ]}
            >
              <ArrowDownwardIcon sx={direction.down ? style.available : null} />
            </Box> : null}
            {direction.left || direction.right ? <Box
              component={props.component as any || "div"}
              sx={[
                style.overlay,
                style.left,
                !direction.up && !direction.down ? style.leftNoTB : null,
              ]}
            >
              <ArrowBackIcon sx={direction.left ? style.available : null} />
            </Box> : null}
            {direction.left || direction.right ? <Box
              component={props.component as any || "div"}
              sx={[
                style.overlay,
                style.right,
                !direction.up && !direction.down ? style.rightNoTB : null,
              ]}
            >
              <ArrowForwardIcon sx={direction.right ? style.available : null} />
            </Box> : null}
          </Box>
        );

        if (!props.usePortal) {
          return element;
        } else {
          return ReactDOM.createPortal(element, document.body);
        }
      }}
    </AltScroller>
  );
}