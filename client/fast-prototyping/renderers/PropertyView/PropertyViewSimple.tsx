/**
 * Contains the property view simple renderer that simply displays a thing
 * used in raw properties and in simple properties such as text or numbers
 * 
 * @module
 */

import { IPropertyViewSimpleRendererProps } from "../../../internal/components/PropertyView/PropertyViewSimple";
import React, { useEffect, useState } from "react";
import { capitalize } from "../../../../util";
import moment from "moment";

/**
 * Allows for simple viewing of simple attributes
 * 
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - nullNode: a react node to render instead of the default when the value is null
 * - dateFormat: a string, if specified will use that with moment to format the string like that
 * 
 * @param props the props for the simple renderer passed by the handler
 * @returns a react element
 */
export default function PropertyViewSimpleRenderer(props: IPropertyViewSimpleRendererProps) {
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  let value: React.ReactNode;
  if (props.args.dateFormat) {
    if (!isReady) {
      value = props.currentValue ? moment.utc(props.currentValue).format(props.args.dateFormat) : props.currentValue;
    } else {
      value = props.currentValue ? moment(props.currentValue).format(props.args.dateFormat) : props.currentValue;
    }
  } else {
    value = props.capitalize ? capitalize(props.currentValue) : props.currentValue;
  }

  if (value === null && props.args.nullNode) {
    value = props.args.nullNode;
  } else if (value === null && props.args.NullComponent) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    value = <NullComponent {...nullArgs}/>;
  }

  if (props.isRichText) {
    return (
      <span dangerouslySetInnerHTML={{__html: props.currentValue}}/>
    );
  }

  return (<>{value}</>);
}
