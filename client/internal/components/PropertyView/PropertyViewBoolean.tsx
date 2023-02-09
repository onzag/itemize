/**
 * Contains the handler for the boolean type
 * @module
 */

import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import { capitalize } from "../../../../util";
import { deepRendererArgsComparer } from "../general-fn";

/**
 * The renderer props for the boolean type which also include
 */
export interface IPropertyViewBooleanRendererProps extends IPropertyViewRendererProps<boolean> {
  /**
   * Yes, in the user language
   */
  i18nYes: string;
  /**
   * No in the user language
   */
  i18nNo: string;
  /**
   * unspecified in the user language
   */
  i18nUnspecified: string;
}

/**
 * The property view boolean handler
 */
export default class PropertyViewBoolean extends React.Component<IPropertyViewHandlerProps<boolean, IPropertyViewBooleanRendererProps>> {
  constructor(props: IPropertyViewHandlerProps<boolean, IPropertyViewBooleanRendererProps>) {
    super(props);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<boolean, IPropertyViewBooleanRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return this.props.useAppliedValue !== nextProps.useAppliedValue ||
      (!this.props.useAppliedValue && this.props.state.value !== nextProps.state.value) ||
      (this.props.useAppliedValue && this.props.state.stateAppliedValue !== nextProps.state.stateAppliedValue) ||
      nextProps.language !== this.props.language ||
      nextProps.property !== this.props.property ||
      nextProps.renderer !== this.props.renderer ||
      !!this.props.rtl !== !!nextProps.rtl ||
      this.props.language !== nextProps.language ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    const i18nYes = capitalize(this.props.i18n[this.props.language].yes);
    const i18nNo = capitalize(this.props.i18n[this.props.language].no);
    const i18nUnspecified = capitalize(this.props.i18n[this.props.language].unspecified);

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewBooleanRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      currentValue: this.props.useAppliedValue ?
        this.props.state.stateAppliedValue as boolean :
        this.props.state.value as boolean,
      i18nNo,
      i18nYes,
      i18nUnspecified,
    };

    return <RendererElement {...rendererArgs}/>
  }
}
