import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import AltScroller from "../../components/accessibility/AltScroller";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const style = {
  overlayAbsolute: {
    position: "absolute",
  },
  overlayFixed: {
    position: "fixed",
  },
  overlay: {
    opacity: 0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "4rem",
    zIndex: 100000,
    width: "4rem",
    backgroundColor: "#ffeb3b",
  },
  top: {
    top: "calc(50% - 4rem)",
    left: "calc(50% - 2rem)",
    borderRadius: "50% 50% 0 0",
  },
  bottom: {
    top: "50%",
    left: "calc(50% - 2rem)",
    borderRadius: "0 0 50% 50%",
  },
  left: {
    top: "calc(50% - 2rem)",
    left: "calc(50% - 6rem)",
    borderRadius: "50% 0 0 50%",
  },
  right: {
    top: "calc(50% - 2rem)",
    left: "calc(50% + 2rem)",
    borderRadius: "0 50% 50% 0",
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
   */
  positioning?: "absolute" | "fixed";
  /**
   * a css selector to choose the component that is relevant that the
   * user is supposed to interact with, by default it will simply pick the first child node
   */
  parentSelector?: string;
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
}

export function AltSectionScroller(
  props: IAltSectionScrollerProps,
): any {
  return (
    <AltScroller
      {...props}
    >
      {(scrolling, direction) => (
        !scrolling ? null : (
          <>
            {direction.up || direction.down ? <Box
              component={props.component as any || "div"}
              sx={[
                props.positioning === "fixed" ? style.overlayFixed : style.overlayAbsolute,
                style.overlay,
                style.top,
              ]}
            >
              <ArrowUpwardIcon sx={direction.up ? style.available : null}/>
            </Box> : null}
            {direction.up || direction.down ? <Box
              component={props.component as any || "div"}
              sx={[
                props.positioning === "fixed" ? style.overlayFixed : style.overlayAbsolute,
                style.overlay,
                style.bottom,
              ]}
            >
              <ArrowDownwardIcon sx={direction.down ? style.available : null}/>
            </Box> : null}
            {direction.left || direction.right ? <Box
              component={props.component as any || "div"}
              sx={[
                props.positioning === "fixed" ? style.overlayFixed : style.overlayAbsolute,
                style.overlay,
                style.left,
              ]}
            >
              <ArrowBackIcon sx={direction.left ? style.available : null}/>
            </Box> : null}
            {direction.left || direction.right ? <Box
              component={props.component as any || "div"}
              sx={[
                props.positioning === "fixed" ? style.overlayFixed : style.overlayAbsolute,
                style.overlay,
                style.right,
              ]}
            >
              <ArrowForwardIcon sx={direction.right ? style.available : null}/>
            </Box> : null}
          </>
        )
      )}
    </AltScroller>
  );
}