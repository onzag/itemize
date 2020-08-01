/**
 * Contains the property view simple renderer that simply displays a thing
 * used in raw properties and in simple properties such as text or numbers
 * 
 * @packageDocumentation
 */

import { IPropertyViewSimpleRendererProps } from "../../../internal/components/PropertyView/PropertyViewSimple";
import React from "react";
import { capitalize } from "../../../../util";
import moment from "moment";

/**
 * Allows for simple viewing of simple attributes
 * 
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - dateFormat: a string, if specified will use that with moment to format the string like that
 * 
 * @param props the props for the simple renderer passed by the handler
 * @returns a react element
 */
export default function PropertyViewSimpleRenderer(props: IPropertyViewSimpleRendererProps) {
  let value: React.ReactNode;
  if (props.args.dateFormat) {
    value = props.currentValue ? moment(props.currentValue).format(props.args.dateFormat) : props.currentValue;
  } else {
    value = props.capitalize ? capitalize(props.currentValue) : props.currentValue;
  }

  if (value === null && props.args.NullComponent) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    value = <NullComponent {...nullArgs}/>;
  }

  return (
    <span>
      {value}
    </span>
  )
}
