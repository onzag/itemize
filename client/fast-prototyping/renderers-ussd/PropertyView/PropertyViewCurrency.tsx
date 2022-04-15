/**
 * Contains the property view currency renderer
 * 
 * @module
 */

import { IPropertyViewCurrencyRendererProps } from "../../../internal/components/PropertyView/PropertyViewCurrency";
import React from "react";

export default function PropertyViewCurrencyUSSDRenderer(props: IPropertyViewCurrencyRendererProps) {
  if (props.currentValue === null && props.args.nullNode) {
    return (
      <span>
        {props.args.nullNode}
      </span>
    );
  } else if (props.currentValue === null && props.args.NullComponent) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    return (
      <span>
        <NullComponent {...nullArgs} />
      </span>
    );
  } else if (props.currentValue === null) {
    return null;
  }

  const mainCurrency = props.convertedCurrency || props.originalCurrency;
  const mainStrValue = props.convertedStrValue || props.originalStrValue;

  if (props.format === "$N") {
    return (
      <span>
        {mainCurrency.symbol + mainStrValue + (
          !props.args.hideOriginalIfConverted && props.convertedCurrency ? "(" +  props.originalCurrency.symbol + props.originalStrValue + ")" : ""
        )}
      </span>
    );
  }

  return (
    <span>
      {mainStrValue + mainCurrency.symbol + (
        !props.args.hideOriginalIfConverted && props.convertedCurrency ? "(" +  props.originalStrValue + props.originalCurrency.symbol + ")" : ""
      )}
    </span>
  );
}
