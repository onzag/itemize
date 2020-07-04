import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import equals from "deep-equal";
import { ICurrencyType, currencies } from "../../../../imported-resources";
import { IPropertyDefinitionSupportedCurrencyType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";

export interface IPropertyViewCurrencyRendererProps extends IPropertyViewRendererProps<IPropertyDefinitionSupportedCurrencyType> {
  format: "$N" | "N$",
  convertedCurrency: ICurrencyType;
  originalCurrency: ICurrencyType;
  convertedValue: number;
  convertedStrValue: string;
  originalValue: number;
  originalStrValue: string;
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
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    const value = (
      this.props.useAppliedValue ?
      this.props.state.stateAppliedValue :
      this.props.state.value
    ) as IPropertyDefinitionSupportedCurrencyType;

    const originalValue: number = value && value.value;
    let originalStrValue: string = null;
    let originalCurrency: ICurrencyType = null;
    let convertedCurrency: ICurrencyType = null;
    let convertedValue: number = null;
    let convertedStrValue: string = null;
    const originalCurrencyCode = value && value.currency;

    if (originalCurrencyCode) {
      originalCurrency = currencies[originalCurrencyCode];
    }
    if (typeof originalValue !== "undefined" && originalValue !== null) {
      originalStrValue = originalValue.toFixed(originalCurrency.decimals)
        .replace(".", this.props.i18n[this.props.language].number_decimal_separator);
      if (
        originalCurrency.code !== this.props.currency.code &&
        this.props.currencyFactors[originalCurrency.code] &&
        this.props.currencyFactors[this.props.currency.code]
      ) {
        convertedCurrency = this.props.currency;
        const inFactorCurrency = originalValue*this.props.currencyFactors[originalCurrency.code];
        convertedValue = inFactorCurrency/this.props.currencyFactors[convertedCurrency.code];
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