/**
 * Contains the property view currency renderer
 * 
 * @module
 */

import { IPropertyViewCurrencyRendererProps } from "../../../internal/components/PropertyView/PropertyViewCurrency";
import React from "react";
import Box from "@mui/material/Box";

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
  const rootSx = props.args.rootSx || null;
  const valueClassName = props.args.convertedValueClassName || null;
  const valueSx = props.args.convertedValueSx || null;
  const symbolClassName = props.args.convertedSymbolClassName || null;
  const symbolSx = props.args.convertedSymbolSx || null;
  const convertedClassName = props.args.convertedClassName || null;
  const convertedSx = props.args.convertedSx || null;
  const originalClassName = props.args.originalClassName || null;
  const originalValueClassName = props.args.originalValueClassName || null;
  const originalSymbolClassName = props.args.originalSymbolClassName || null;
  const originalSx = props.args.originalSx || null;
  const originalValueSx = props.args.originalValueSx || null;
  const originalSymbolSx = props.args.originalSymbolSx || null;

  if (props.currentValue === null && props.args.nullNode) {
    return (
      <Box component="span" className={rootClassName} sx={rootSx}>
        {props.args.nullNode}
      </Box>
    );
  } else if (props.currentValue === null && props.args.NullComponent) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    return (
      <Box component="span" className={rootClassName} sx={rootSx}>
        <NullComponent {...nullArgs} />
      </Box>
    );
  } else if (props.currentValue === null) {
    return (
      <Box component="span" className={rootClassName} sx={rootSx} />
    );
  }

  const mainCurrency = props.convertedCurrency || props.originalCurrency;
  const mainStrValue = props.convertedStrValue || props.originalStrValue;

  if (props.format === "$N") {
    return (
      <Box component="span" className={rootClassName} sx={rootSx}>
        <Box component="span" className={convertedClassName} sx={convertedSx}>
          <Box component="span" className={symbolClassName} sx={symbolSx}>
            {mainCurrency.symbol}
          </Box>
          <Box component="span" className={valueClassName} sx={valueSx}>
            {mainStrValue}
          </Box>
        </Box>
        {!props.args.hideOriginalIfConverted && props.convertedCurrency ? <Box component="span" className={originalClassName} sx={originalSx}>
          <Box component="span" className={originalSymbolClassName} sx={originalSymbolSx}>
            {props.originalCurrency.symbol}
          </Box>
          <Box component="span" className={originalValueClassName} sx={originalValueSx}>
            {props.originalStrValue}
          </Box>
        </Box> : null}
      </Box>
    );
  }

  return (
    <Box component="span" className={rootClassName} sx={rootSx}>
      <Box component="span" className={convertedClassName} sx={convertedSx}>
        <Box component="span" className={valueClassName} sx={valueSx}>
          {mainStrValue}
        </Box>
        <Box component="span" className={symbolClassName} sx={symbolSx}>
          {mainCurrency.symbol}
        </Box>
      </Box>
      {!props.args.hideOriginalIfConverted && props.convertedCurrency ? <Box component="span" className={originalClassName} sx={originalSx}>
        <Box component="span" className={originalValueClassName} sx={originalValueSx}>
          {props.originalStrValue}
        </Box>
        <Box component="span" className={originalSymbolClassName} sx={originalSymbolSx}>
          {props.originalCurrency.symbol}
        </Box>
      </Box> : null}
    </Box>
  );
}
