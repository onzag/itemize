import { IPropertyViewBooleanRendererProps } from "../../../internal/components/PropertyView/PropertyViewBoolean";
import React from "react";

export default function PropertyViewBooleanRenderer(props: IPropertyViewBooleanRendererProps) {
  let i18nLabel: string = null;
  if (props.currentValue === null) {
    if (props.args.NullComponent) {
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