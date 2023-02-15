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
  const [crop, setCrop] = useState(false);

  const elementRef = useRef<any>();
  const isUnmounted = useRef(false);

  const Element = props.component || "div";

  useEffect(() => {
    return () => {
      isUnmounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (props.open) {
      let element = elementRef.current;
      if (props.getElementFn) {
        element = element[props.getElementFn]();
      }
      const finalHeight = element.scrollHeight;
      setCrop(true);
      setHeight(finalHeight);
      setTimeout(() => {
        if (!isUnmounted.current) {
          setCrop(false);
        }
      }, 300);
    } else {
      setCrop(false);
      setHeight(0);
    }
  }, [props.open, props.children]);

  return (
    <Element
      style={{
        height,
        transition: props.transitionOverride || "height 0.3s ease",
        overflow: height === 0 || crop ? "visible clip" : null,
        width: props.fullWidth ? "100%" : null
      }}
      {...props.componentProps}
      ref={elementRef}
    >
      {props.children}
    </Element>
  )
}