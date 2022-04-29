/**
 * The standard handler for the property view simple
 * @module
 */

import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import equals from "deep-equal";
import { getNumericType, NumericType } from "../PropertyEntry/PropertyEntryField";
import { deepRendererArgsComparer } from "../general-fn";
import { applyHighlights } from "./highlights";

/**
 * The property view simple renderer props
 */
export interface IPropertyViewSimpleRendererProps extends IPropertyViewRendererProps<string> {
  /**
   * Whether it should capitalize
   */
  capitalize: boolean;
  /**
   * The language code it's currently using
   */
  language: string;
  /**
   * wether it is using rich text, this is not full blown rich text
   * and only regards to highlights
   */
  isRichText: boolean;
}

/**
 * The property view simple class
 */
export class PropertyViewSimple extends React.Component<IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>> {
  constructor(props: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>) {
    super(props);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return this.props.useAppliedValue !== nextProps.useAppliedValue ||
      (!this.props.useAppliedValue && this.props.state.value !== nextProps.state.value) ||
      (this.props.useAppliedValue && this.props.state.stateAppliedValue !== nextProps.state.stateAppliedValue) ||
      nextProps.property !== this.props.property ||
      nextProps.renderer !== this.props.renderer ||
      nextProps.capitalize !== this.props.capitalize ||
      !!this.props.rtl !== !!nextProps.rtl ||
      this.props.language !== nextProps.language ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    let i18nData: any = null;
    let nullValueLabel: any = null;
    if (this.props.property && this.props.property.hasSpecificValidValues()) {
      i18nData = this.props.property.getI18nDataFor(this.props.language);
      nullValueLabel = this.props.property.isNullable() ?
        i18nData && i18nData.null_value : null;
    }

    const value = (
      this.props.useAppliedValue ?
      this.props.state.stateAppliedValue :
      this.props.state.value
    );

    let currentValue = (value === null || (typeof value === "number" && isNaN(value as number))) ?
      nullValueLabel :
      (
        (i18nData && i18nData.values[value.toString()]) ||
        value.toString()
      );

    const numericType = this.props.property ? getNumericType(
      this.props.property.getType(),
    ) : NumericType.NAN;

    if (numericType === NumericType.FLOAT) {
      currentValue = currentValue.replace(".", this.props.i18n[this.props.language].number_decimal_separator);
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewSimpleRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      language: this.props.language,
      currentValue,
      capitalize: !!this.props.capitalize,
      isRichText: false,
    };

    if (numericType === NumericType.NAN && this.props.highlights) {
      const appliedHighlightsInfo = applyHighlights(
        currentValue,
        this.props.highlights,
      );

      if (appliedHighlightsInfo.applied) {
        rendererArgs.currentValue = appliedHighlightsInfo.value;
        rendererArgs.isRichText = true;
      }
    }

    return <RendererElement {...rendererArgs}/>
  }
}
