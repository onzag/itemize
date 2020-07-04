import { IPropertyViewCurrencyRendererProps } from "../../../internal/components/PropertyView/PropertyViewCurrency";
import React from "react";

export default function PropertyViewCurrencyRenderer(props: IPropertyViewCurrencyRendererProps) {
  const rootClassName = props.args.className || null;
  const valueClassName = props.args.valueClassName || null;
  const symbolClassName = props.args.symbolClassName || null;
  const originalClassName = props.args.originalClassName || null;
  const originalValueClassName = props.args.originalValueClassName || null;
  const originalSymbolClassName = props.args.originalSymbolClassName || null;

  if (props.currentValue === null && props.args.NullComponent) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    return (
      <span className={rootClassName}>
        <NullComponent {...nullArgs}/>
      </span>
    );
  } else if (props.currentValue === null) {
    return (
      <span className={rootClassName}/>
    );
  }

  const mainCurrency = props.convertedCurrency || props.originalCurrency;
  const mainStrValue = props.convertedStrValue || props.originalStrValue;

  if (props.format === "$N") {
    return (
      <span className={rootClassName}>
        <span className={symbolClassName}>
          {mainCurrency.symbol}
        </span>
        <span className={valueClassName}>
          {mainStrValue}
        </span>
        {!props.args.hideOriginalIfConverted && props.convertedCurrency ? <span className={originalClassName}>
          <span className={originalSymbolClassName}>
            {props.originalCurrency.symbol}
          </span>
          <span className={originalValueClassName}>
            {props.originalStrValue}
          </span>
        </span> : null}
      </span>
    );
  }

  return (
    <span className={rootClassName}>
      <span className={valueClassName}>
        {mainStrValue}
      </span>
      <span className={symbolClassName}>
        {mainCurrency.symbol}
      </span>
      {!props.args.hideOriginalIfConverted && props.convertedCurrency ? <span className={originalClassName}>
        <span className={originalValueClassName}>
          {props.originalStrValue}
        </span>
        <span className={originalSymbolClassName}>
          {props.originalCurrency.symbol}
        </span>
      </span> : null}
    </span>
  );
}