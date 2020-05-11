import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";

export interface IPropertyEntrySelectRendererProps extends IPropertyEntryRendererProps<string> {
  values: Array<{
    i18nValue: string;
    value: string;
  }>;
  nullValue: {
    i18nValue: string;
    value: string;
  };
  isNullable: boolean;
  currentI18nValue: string;
}

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

    const values = this.props.property.getSpecificValidValues().map((v: string) => ({
      i18nValue: i18nData.values[v] || v,
      value: v,
    }));
    const currentValue = this.props.state.value as string;
    const isNullable = this.props.property.isNullable() && !this.props.property.isCoercedIntoDefaultWhenNull();
    const nullValue = isNullable ? {
      value: null,
      i18nValue: i18nData.null_value,
    } : null;
    const currentI18nValue = i18nData.values[this.props.state.value as string] || currentValue;

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntrySelectRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      values,
      isNullable,
      nullValue,

      currentAppliedValue: this.props.state.stateAppliedValue as string,
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
