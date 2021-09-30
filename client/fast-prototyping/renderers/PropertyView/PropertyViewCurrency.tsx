/**
 * Contains the property view currency renderer
 * 
 * @module
 */

import { IPropertyViewCurrencyRendererProps } from "../../../internal/components/PropertyView/PropertyViewCurrency";
import React from "react";

/**
 * The property view currency renderer itself
 * 
 * supported args:
 * - NullComponent: a react component to render instead of the default when the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - nullNode: a react node to render instead of the default when the value is null
 * - className: the class name for the root span container
 * - convertedValueClassName: the class name for the actual value
 * - convertedSymbolClassName: the class name for the symbol that value has
 * - convertedClassName: the class name for the converted value
 * - originalClassName: the class name for the original value (if there is one)
 * - originalSymbolClassName: the class name for the original value symbol (if there is one)
 * 
 * @param props the props passed by the handler
 * @returns a react element
 */
export default function PropertyViewCurrencyRenderer(props: IPropertyViewCurrencyRendererProps) {
  const rootClassName = props.args.className || null;
  const valueClassName = props.args.convertedValueClassName || null;
  const symbolClassName = props.args.convertedSymbolClassName || null;
  const convertedClassName = props.args.convertedClassName || null;
  const originalClassName = props.args.originalClassName || null;
  const originalValueClassName = props.args.originalValueClassName || null;
  const originalSymbolClassName = props.args.originalSymbolClassName || null;

  if (props.currentValue === null && props.args.nullNode) {
    return (
      <span className={rootClassName}>
        {props.args.nullNode}
      </span>
    );
  } else if (props.currentValue === null && props.args.NullComponent) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    return (
      <span className={rootClassName}>
        <NullComponent {...nullArgs} />
      </span>
    );
  } else if (props.currentValue === null) {
    return (
      <span className={rootClassName} />
    );
  }

  const mainCurrency = props.convertedCurrency || props.originalCurrency;
  const mainStrValue = props.convertedStrValue || props.originalStrValue;

  if (props.format === "$N") {
    return (
      <span className={rootClassName}>
        <span className={convertedClassName}>
          <span className={symbolClassName}>
            {mainCurrency.symbol}
          </span>
          <span className={valueClassName}>
            {mainStrValue}
          </span>
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
      <span className={convertedClassName}>
        <span className={valueClassName}>
          {mainStrValue}
        </span>
        <span className={symbolClassName}>
          {mainCurrency.symbol}
        </span>
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
