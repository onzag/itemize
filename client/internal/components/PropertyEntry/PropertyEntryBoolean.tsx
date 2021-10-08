/**
 * Contains the boolean handler
 * @module
 */

import React from "react";
import { IPropertyEntryRendererProps, IPropertyEntryHandlerProps } from ".";
import { PropertyDefinitionSupportedBooleanType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean";
import equals from "deep-equal";
import { deepRendererArgsComparer } from "../general-fn";

/**
 * Props that every boolean renderer is going to get
 */
export interface IPropertyEntryBooleanRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedBooleanType> {
  /**
   * Defines if the boolean represents a ternary boolean type, aka it's a nullable boolean, so
   * it holds 3 values, true, false and null; you should use different logic for ternary booleans
   */
  isTernary: boolean;
  /**
   * The label for the true value, it is localized, and it can be passed optionally, there's a default for it otherwise
   */
  trueLabel: string;
  /**
   * The label for the false value, it is localized, and it can be passed optionally, there's a default for it otherwise
   */
  falseLabel: string;
  /**
   * The label for the null value, it is localized, and it can be passed optionally, there's a default for it otherwise
   */
  nullLabel: string;
}

interface IPropertyEntryBooleanState {
  showUserSetErrors: boolean;
}

/**
 * The property entry boolean handler
 */
export default class PropertyEntryBoolean extends React.Component<
  IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>,
  IPropertyEntryBooleanState
> {
  constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>) {
    super(props);

    this.onRestoreHijacked = this.onRestoreHijacked.bind(this);
    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);

    this.state = {
      showUserSetErrors: false,
    }
  }

  /**
   * Instead of passing the raw on restore function we hijack the function
   * in order to restore conditionally, the reason is that restoring to null
   * might be bad if null is a non default value, and we want to restore to false
   */
  public onRestoreHijacked() {
    // so we check if we have a ternary, ternaries accept null values
    const isTernary = this.props.property.isNullable() && !this.props.property.isCoercedIntoDefaultWhenNull();
    // so if we have a ternary or our reset value isn't null
    if (isTernary || this.props.state.stateAppliedValue !== null) {
      this.props.onRestore();
    } else {
      // otherwise we go into false
      this.props.onChange(false, null);
    }
  }
  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>,
    nextState: IPropertyEntryBooleanState,
  ) {
    return nextState.showUserSetErrors !== this.state.showUserSetErrors ||
      nextProps.property !== this.props.property ||
      !equals(this.props.state, nextProps.state, { strict: true }) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      this.props.hideLabel !== nextProps.hideLabel ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.icon !== this.props.icon ||
      nextProps.renderer !== this.props.renderer ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public enableUserSetErrors() {
    this.setState({
      showUserSetErrors: true,
    });
  }
  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.hideLabel ? null : (typeof this.props.altLabel !== "undefined" ? this.props.altLabel : (i18nData && i18nData.label));
    const i18nDescription = this.props.hideDescription ? null : (typeof this.props.altDescription !== "undefined" ? this.props.altDescription : (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);

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

    const i18nTrue = i18nData.true_label;
    const i18nFalse = i18nData.false_label;
    const i18nNull = i18nData.null_label;
    const isTernary = this.props.property.isNullable() && !this.props.property.isCoercedIntoDefaultWhenNull();
    const trueLabel = i18nTrue || this.props.i18n[this.props.language].yes;
    const falseLabel = i18nFalse || this.props.i18n[this.props.language].no;
    const nullLabel = i18nNull || this.props.i18n[this.props.language].unspecified;

    if (this.props.state.value === null && !isTernary) {
      console.warn(
        "Warning!... you should set a default value to a non ternary boolean field, got null"
      );
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryBooleanRendererProps = {
      propertyId: this.props.property.getId(),
  
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      isTernary,
      trueLabel,
      falseLabel,
      nullLabel,

      currentAppliedValue: this.props.state.stateAppliedValue as boolean,
      currentValue: isTernary ? (this.props.state.value as boolean) : ((this.props.state.value as boolean) || false),
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,
      canRestore: (this.props.state.value || false) !== (this.props.state.stateAppliedValue || false),

      disabled:
        typeof this.props.disabled !== "undefined" && this.props.disabled !== null ?
        this.props.disabled :
        this.props.state.enforced,
      autoFocus: this.props.autoFocus || false,
      onChange: this.props.onChange,
      onRestore: this.onRestoreHijacked,
      enableUserSetErrors: this.enableUserSetErrors,
    };

    return <RendererElement {...rendererArgs} />;
  }
}
