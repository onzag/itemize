import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";

export interface IPropertyEntryTextRendererProps extends IPropertyEntryRendererProps<string> {
  i18nFormat: {
    formatBoldLabel: string;
    formatItalicLabel: string;
    formatUnderlineLabel: string;
    formatTitleLabel: string;
    formatQuoteLabel: string;
    formatListNumberedLabel: string;
    formatListBulletedLabel: string;
    formatAddImageLabel: string;
    formatAddVideoLabel: string;
    formatAddFileLabel: string;
  };

  supportsMedia: boolean;
}

export default class PropertyEntryText
  extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>> {

  constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>) {
    super(props);
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>,
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

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryTextRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      currentValue: this.props.state.value as string,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,

      disabled: this.props.state.enforced,

      autoFocus: this.props.autoFocus || false,

      i18nFormat: {
        formatBoldLabel: this.props.i18n[this.props.language].format_bold,
        formatItalicLabel: this.props.i18n[this.props.language].format_italic,
        formatUnderlineLabel: this.props.i18n[this.props.language].format_underline,
        formatTitleLabel: this.props.i18n[this.props.language].format_title,
        formatQuoteLabel: this.props.i18n[this.props.language].format_quote,
        formatListNumberedLabel: this.props.i18n[this.props.language].format_list_numbered,
        formatListBulletedLabel: this.props.i18n[this.props.language].format_list_bulleted,
        formatAddImageLabel: this.props.i18n[this.props.language].format_add_image,
        formatAddVideoLabel: this.props.i18n[this.props.language].format_add_video,
        formatAddFileLabel: this.props.i18n[this.props.language].format_add_file,
      },

      supportsMedia: false,

      onChange: this.props.onChange,
    };

    return <RendererElement {...rendererArgs}/>
  }
}
