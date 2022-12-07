/**
 * A box that is able to grow in height it is set to open
 */

import React, { useEffect, useRef, useState } from "react";

interface IGrowableBoxProps {
  open: boolean;
  component?: any;
  componentProps?: any;
  getElementFn?: string;
  transitionOverride?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export default function GrowableBox(props: IGrowableBoxProps) {
  const [height, setHeight] = useState(0);
  const elementRef = useRef<any>();

  const Element = props.component || "div";

  useEffect(() => {
    if (props.open) {
      let element = elementRef.current;
      if (props.getElementFn) {
        element = element[props.getElementFn]();
      }
      const finalHeight = element.scrollHeight;
      setHeight(finalHeight);
    } else {
      setHeight(0);
    }
  }, [props.open, props.children]);

  return (
    <Element
      style={{height, transition: props.transitionOverride || "height 0.3s ease", overflow: "hidden", width: props.fullWidth ? "100%" : null}}
      {...props.componentProps}
      ref={elementRef}
    >
      {props.children}
    </Element>
  )
}