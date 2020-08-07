/**
 * Contains the property view currency handler
 * @packageDocumentation
 */

import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import equals from "deep-equal";
import { ICurrencyType, currencies } from "../../../../imported-resources";
import { IPropertyDefinitionSupportedCurrencyType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";

/**
 * The property view currency renderer props
 */
export interface IPropertyViewCurrencyRendererProps extends IPropertyViewRendererProps<IPropertyDefinitionSupportedCurrencyType> {
  /**
   * The format which is used for the currency given the user's language
   * $N means symbol first, number last N$ means the opposite
   */
  format: "$N" | "N$",
  /**
   * The original value, as a number, might be null
   * if the value itself is null
   */
  originalValue: number;
  /**
   * The original value as a string, formatted
   * to match the user's locale, might be null
   * if the currency value itself is null
   */
  originalStrValue: string;
  /**
   * The original currency the currency type is
   * specified in, might be null if the currency
   * is null
   */
  originalCurrency: ICurrencyType;
  /**
   * If the original currency was not the user's selected
   * currency, this value is the result of that conversion,
   * otherwise null
   */
  convertedValue: number;
  /**
   * Same as the converted value, but formatted in order
   * to match the user's locale
   */
  convertedStrValue: string;
  /**
   * If the original curency was not the user's selected
   * currency, this value represents the user's currency
   * that it was converted to; it's basically the same as
   * the current's user currency
   */
  convertedCurrency: ICurrencyType;
}

export class PropertyViewCurrency extends React.Component<IPropertyViewHandlerProps<IPropertyViewCurrencyRendererProps>> {
  constructor(props: IPropertyViewHandlerProps<IPropertyViewCurrencyRendererProps>) {
    super(props);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyViewCurrencyRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return this.props.useAppliedValue !== nextProps.useAppliedValue ||
      (!this.props.useAppliedValue && this.props.state.value !== nextProps.state.value) ||
      (this.props.useAppliedValue && this.props.state.stateAppliedValue !== nextProps.state.stateAppliedValue) ||
      nextProps.property !== this.props.property ||
      nextProps.renderer !== this.props.renderer ||
      !!this.props.rtl !== !!nextProps.rtl ||
      this.props.language !== nextProps.language ||
      this.props.currency !== nextProps.currency ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    // we get the value that we will be using
    const value = (
      this.props.useAppliedValue ?
      this.props.state.stateAppliedValue :
      this.props.state.value
    ) as IPropertyDefinitionSupportedCurrencyType;

    // and the original value numeric
    const originalValue: number = value && value.value;
    const originalCurrencyCode = value && value.currency;

    // and now for these
    let originalStrValue: string = null;
    let originalCurrency: ICurrencyType = null;
    let convertedCurrency: ICurrencyType = null;
    let convertedValue: number = null;
    let convertedStrValue: string = null;

    // might be null so we set it up
    if (originalCurrencyCode) {
      originalCurrency = currencies[originalCurrencyCode];
    }

    // so now we try to get these formatted
    if (typeof originalValue !== "undefined" && originalValue !== null) {
      // and we format by removing the dot
      originalStrValue = originalValue.toFixed(originalCurrency.decimals)
        .replace(".", this.props.i18n[this.props.language].number_decimal_separator);

      // if the currency code of the original
      // doesn't match the current's user code, and we have
      // currency factors
      if (
        originalCurrency.code !== this.props.currency.code &&
        this.props.currencyFactors[originalCurrency.code] &&
        this.props.currencyFactors[this.props.currency.code]
      ) {
        // we convert it up
        convertedCurrency = this.props.currency;
        const inFactorCurrency = originalValue*this.props.currencyFactors[originalCurrency.code];
        convertedValue = inFactorCurrency/this.props.currencyFactors[convertedCurrency.code];

        // and then format
        convertedStrValue = convertedValue.toFixed(originalCurrency.decimals)
          .replace(".", this.props.i18n[this.props.language].number_decimal_separator);
      }
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewCurrencyRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      originalCurrency,
      originalStrValue,
      originalValue,
      convertedCurrency,
      convertedStrValue,
      convertedValue,
      format: this.props.i18n[this.props.language].currency_format as any,
      currentValue: value,
    };

    return <RendererElement {...rendererArgs}/>
  }
}
