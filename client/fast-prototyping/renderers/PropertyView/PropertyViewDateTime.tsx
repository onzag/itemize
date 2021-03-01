/**
 * Contains the property view datetime renderer
 * 
 * @module
 */

import { IPropertyViewDateTimeRendererProps } from "../../../internal/components/PropertyView/PropertyViewDateTime";
import React from "react";

/**
 * The fast prototyping property view date time renderer, basically uses moment to format
 * for the given date format
 * 
 * supported args:
 * - NullComponent: a react component to render instead of the default when the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - dateFormat: a momentjs date string format to use instead of the default (keep localization in mind)
 * 
 * @param props the property view date time renderer props given by the handler
 * @returns a react element
 */
export default function PropertyViewDateTimeRenderer(props: IPropertyViewDateTimeRendererProps) {
  let value: React.ReactNode;
  if (props.args.dateFormat) {
    value = props.momentValue ? props.momentValue.format(props.args.dateFormat) : null;
  } else {
    value = props.defaultFormattedValue;
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