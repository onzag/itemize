/**
 * The property view boolean renderer a rather straightforward renderer
 * 
 * @module
 */

import { IPropertyViewBooleanRendererProps } from "../../../internal/components/PropertyView/PropertyViewBoolean";
import React from "react";

/**
 * The fast prototyping property view boolean renderer, basically used
 * the standard main i18n attributes to say yes, no or unspecified
 * 
 * supported args:
 * - NullComponent: a react component to render instead of the default when the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - nullNode: a react node to render instead of the default when the value is null
 * 
 * @param props the property view boolean renderer props given by the handler
 * @returns a react element
 */
export default function PropertyViewBooleanRenderer(props: IPropertyViewBooleanRendererProps) {
  let i18nLabel: string = null;
  if (props.currentValue === null) {
    if (props.args.nullNode) {
      return props.args.nullNode;
    } else if (props.args.NullComponent) {
      const NullComponent = props.args.NullComponent;
      const nullArgs = props.args.nullComponentArgs;
      return <NullComponent {...nullArgs}/>;
    }

    i18nLabel = props.i18nUnspecified;
  } else if (props.currentValue === true) {
    i18nLabel = props.i18nYes;
  } else if (props.currentValue === false) {
    i18nLabel = props.i18nNo;
  }

  return (
    <span>
      {i18nLabel}
    </span>
  );
}
