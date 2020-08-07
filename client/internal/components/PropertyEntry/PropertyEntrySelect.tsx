/**
 * The entry select renderer for specific valid values
 * @packageDocumentation
 */

import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";

/**
 * The renderer props for implementing the select renderer that pops in
 * when a property has specific valid values
 * 
 * The select handler and renderer is one of the simplest of its kind
 */
export interface IPropertyEntrySelectRendererProps extends IPropertyEntryRendererProps<string | number> {
  /**
   * The values we are working with, an array that contains
   * how they are going to be displayed in the user's language and the actual value
   */
  values: Array<{
    i18nValue: string;
    value: string | number;
  }>;
  /**
   * The null value
   */
  nullValue: {
    i18nValue: string;
    value: null;
  };

  /**
   * Whether it is nullable, so null should be an option
   */
  isNullable: boolean;
  /**
   * Whether it represents a numeric value
   */
  isNumeric: boolean;
  /**
   * The current value in its localized form
   */
  currentI18nValue: string;
}

/**
 * The select handler
 */
export default class PropertyEntrySelect
  extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>> {

  constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>) {
    super(props);
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.props.state, nextProps.state) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.icon !== this.props.icon ||
      nextProps.renderer !== this.props.renderer ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
    const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);

    // get the invalid reason if any
    const invalidReason = this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || this.props.state.userSet) && invalidReason;
    let i18nInvalidReason = null;
    if (
      isCurrentlyShownAsInvalid && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    const values = this.props.property.getSpecificValidValues().map((v: string | number) => ({
      i18nValue: i18nData.values[v] || v,
      value: v,
    }));
    const currentValue = this.props.state.value as string | number;
    const isNullable = this.props.property.isNullable() && !this.props.property.isCoercedIntoDefaultWhenNull();

    const type = this.props.property.getType();
    const isNumeric = ["number", "integer", "year"].includes(type);

    const nullValue = isNullable ? {
      value: null as any,
      i18nValue: i18nData.null_value,
    } : null;
    const currentI18nValue = i18nData.values[currentValue.toString()] || currentValue.toString();

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntrySelectRendererProps = {
      propertyId: this.props.property.getId(),

      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      values,
      isNullable,
      isNumeric,
      nullValue,

      currentAppliedValue: this.props.state.stateAppliedValue as string | number,
      currentValue,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,
      currentI18nValue,
      canRestore: this.props.state.value !== this.props.state.stateAppliedValue,

      disabled: this.props.state.enforced,

      autoFocus: this.props.autoFocus || false,

      onChange: this.props.onChange,
      onRestore: this.props.onRestore,
    };

    return <RendererElement {...rendererArgs}/>
  }
}
