import React from "react";
import { IPropertyEntryRendererProps, IPropertyEntryHandlerProps } from ".";
import { PropertyDefinitionSupportedBooleanType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean";
import equals from "deep-equal";

export interface IPropertyEntryBooleanRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedBooleanType> {
  isTernary: boolean;
  trueLabel?: string;
  falseLabel?: string;
  nullLabel?: string;
}

export default class PropertyEntryBoolean extends React.Component<
  IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>
> {
  constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>) {
    super(props);

    this.onRestoreHijacked = this.onRestoreHijacked.bind(this);
  }
  public onRestoreHijacked() {
    if (this.props.state.stateAppliedValue !== null) {
      this.props.onRestore()
    } else {
      this.props.onChange(false, null);
    }
  }
  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>,
  ) {
    return nextProps.property !== this.props.property ||
      !equals(this.props.state, nextProps.state) ||
      !!this.props.poked !== !!nextProps.poked ||
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

    const isTernary = this.props.property.isNullable() && !this.props.property.isCoercedIntoDefaultWhenNull();
    const trueLabel = this.props.i18n[this.props.language].yes;
    const falseLabel = this.props.i18n[this.props.language].no;
    const nullLabel = this.props.i18n[this.props.language].unspecified;

    if (this.props.state.value === null && !isTernary) {
      console.warn(
        "Warning!... you should set a default value to a non ternary boolean field, got null"
      );
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryBooleanRendererProps = {
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

      disabled: this.props.state.enforced,
      autoFocus: this.props.autoFocus || false,
      onChange: this.props.onChange,
      onRestore: this.onRestoreHijacked,
    };

    return <RendererElement {...rendererArgs} />;
  }
}