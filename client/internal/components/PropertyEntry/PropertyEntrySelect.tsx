/**
 * The entry select renderer for specific valid values
 * @module
 */

import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import { deepRendererArgsComparer } from "../general-fn";

/**
 * The renderer props for implementing the select renderer that pops in
 * when a property has specific valid values
 * 
 * The select handler and renderer is one of the simplest of its kind
 */
export interface IPropertyEntrySelectRendererProps extends IPropertyEntryRendererProps<string | number | string[] | number[]> {
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
   * Whether it represents a list of values
   */
  isList: boolean;
  /**
   * The current value in its localized form
   */
  currentI18nValue: string;
}

interface IPropertyEntrySelectState {
  showUserSetErrors: boolean;
}

/**
 * The select handler
 */
export default class PropertyEntrySelect
  extends React.Component<
    IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>,
    IPropertyEntrySelectState
  > {

  constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>) {
    super(props);

    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);

    this.state = {
      showUserSetErrors: false,
    }
  }

  public enableUserSetErrors() {
    this.setState({
      showUserSetErrors: true,
    });
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>,
    nextState: IPropertyEntrySelectState,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      nextState.showUserSetErrors !== this.state.showUserSetErrors ||
      !equals(this.props.state, nextProps.state, { strict: true }) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      this.props.hideLabel !== nextProps.hideLabel ||
      this.props.hidePlaceholder !== nextProps.hidePlaceholder ||
      this.props.useAppliedValue !== nextProps.useAppliedValue ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.languageOverride !== this.props.languageOverride ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.renderer !== this.props.renderer ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.hideLabel ? null : (typeof this.props.altLabel !== "undefined" ? this.props.altLabel : (i18nData && i18nData.label));
    const i18nDescription = this.props.hideDescription ? null : (typeof this.props.altDescription !== "undefined" ? this.props.altDescription : (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.hidePlaceholder ? null : (this.props.altPlaceholder || (i18nData && i18nData.placeholder));

    // get the invalid reason if any
    const invalidReason = this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || (this.state.showUserSetErrors && this.props.state.userSet)) && invalidReason;
    let i18nInvalidReason = null;
    if (
      isCurrentlyShownAsInvalid && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    const values = this.props.property.getSpecificValidValues().map((v: any) => ({
      i18nValue: i18nData.values[v] || v,
      value: v,
    }));
    const currentValue = this.props.useAppliedValue ?
      this.props.state.stateAppliedValue as any :
      this.props.state.value as any;
    const isNullable = this.props.property.isNullable() && !this.props.property.isCoercedIntoDefaultWhenNull();

    const type = this.props.property.getType();
    const isNumeric = ["number", "integer", "year"].includes(type);

    const nullValue = isNullable ? {
      value: null as any,
      i18nValue: i18nData.null_value,
    } : null;
    const currentI18nValue = currentValue !== null ? (
      i18nData.values[currentValue.toString()] || currentValue.toString()
    ) : i18nData.values.null_value || "";

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntrySelectRendererProps = {
      propertyId: this.props.property.getId(),
      uniqueId: this.props.property.getUniqueIdentifier(this.props.forId, this.props.forVersion),

      args: this.props.rendererArgs || {},
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      language: this.props.language,
      languageOverride: this.props.languageOverride,

      values,
      isNullable,
      isNumeric,
      isList: this.props.property.isList(),
      nullValue,

      currentAppliedValue: this.props.state.stateAppliedValue as any,
      currentValue,
      currentValid: this.props.useAppliedValue && !this.props.forceInvalid ? false : !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: this.props.useAppliedValue ? null : i18nInvalidReason,
      currentInternalValue: this.props.useAppliedValue ? null : this.props.state.internalValue,
      currentI18nValue,
      canRestore: this.props.useAppliedValue ? false : this.props.state.value !== this.props.state.stateAppliedValue,

      disabled:
        typeof this.props.disabled !== "undefined" && this.props.disabled !== null ?
          this.props.disabled :
          this.props.state.enforced,

      autoFocus: this.props.autoFocus || false,

      onChange: this.props.onChange,
      onRestore: this.props.onRestore,
      enableUserSetErrors: this.enableUserSetErrors,
    };

    return <RendererElement {...rendererArgs} />
  }
}
