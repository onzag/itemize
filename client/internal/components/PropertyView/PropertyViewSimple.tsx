import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import equals from "deep-equal";

export interface IPropertyViewSimpleRendererProps extends IPropertyViewRendererProps {
  currentValue: string;
}

export class PropertyViewSimple extends React.Component<IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>> {
  constructor(props: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>) {
    super(props);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return !equals(this.props.state.value, nextProps.state.value) ||
      nextProps.language !== this.props.language ||
      nextProps.property !== this.props.property ||
      nextProps.renderer !== this.props.renderer ||
      nextProps.capitalize !== this.props.capitalize ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    let i18nData: any = null;
    let nullValueLabel: any = null;
    if (this.props.property.hasSpecificValidValues()) {
      i18nData = this.props.property.getI18nDataFor(this.props.language);
      nullValueLabel = this.props.property.isNullable() ?
        i18nData && i18nData.null_value : null;
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewSimpleRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      currentValue: (i18nData && i18nData.values[this.props.state.value.toString()]) ||
        nullValueLabel || this.props.state.value.toString(),
      capitalize: !!this.props.capitalize,
    };

    return <RendererElement {...rendererArgs}/>
  }
}