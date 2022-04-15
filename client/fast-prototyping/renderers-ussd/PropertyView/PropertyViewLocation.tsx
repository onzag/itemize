/**
 * Contains the property view location renderer
 * 
 * @module
 */

import React from "react";
import { IPropertyViewLocationRendererProps } from "../../../internal/components/PropertyView/PropertyViewLocation";
/**
 * Provides a renderer to view location
 * 
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - hideMap: whether to hide the map
 * 
 * @param props the props for the location renderer
 * @returns a react element
 */
export default function PropertyViewLocationUSSDRenderer(props: IPropertyViewLocationRendererProps) {
  if (props.currentValue === null && props.args.NullComponent) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    return <span><NullComponent {...nullArgs} /></span>;
  }

  if (props.currentValue) {
    return <span>{props.currentValue.txt + " - " + props.currentValue.atxt}</span>
  } else {
    return <span />
  }
}
