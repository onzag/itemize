import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";

export interface IPropertyEntryFieldRendererProps extends IPropertyEntryRendererProps<string> {
  type: "string" | "password";
  subtype?: "email";
  htmlAutocomplete?: string;
}

export default class PropertyEntryField
  extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntryFieldRendererProps>> {

  constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntryFieldRendererProps>) {
    super(props);
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<string, IPropertyEntryFieldRendererProps>,
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

    // set the input mode, this is for mobile,
    // basically according to our input we need
    // different keys
    const type = this.props.property.getType();
    const subtype = this.props.property.getSubtype();

    const RendererElement = this.props.renderer;
    const rendererArgs = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      type: type as any,
      subtype: subtype as any,
      htmlAutocomplete: this.props.property.getHTMLAutocomplete(),
      icon: this.props.icon,

      currentAppliedValue: this.props.state.stateAppliedValue as string,
      currentValue: this.props.state.value as string,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,
      canRestore: this.props.state.value !== this.props.state.stateAppliedValue,

      disabled: this.props.state.enforced,

      autoFocus: this.props.autoFocus || false,

      onChange: this.props.onChange,
      onRestore: this.props.onRestore,
    };

    return <RendererElement {...rendererArgs}/>
  }
}
