/**
 * The date time view handler
 * @module
 */

import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import equals from "deep-equal";
import Moment from "moment";
import { getLocalizedDateFormat, getLocalizedDateTimeFormat, getLocalizedTimeFormat } from "../../../../util";
import { DATE_FORMAT, DATETIME_FORMAT, TIME_FORMAT } from "../../../../constants";

/**
 * The property view date renderer
 */
export interface IPropertyViewDateTimeRendererProps extends IPropertyViewRendererProps<string> {
  /**
   * Current value as moment type
   */
  momentValue: Moment.Moment;
  /**
   * database format used for parsing
   */
  dbFormat: string;
  /**
   * default format used for displaying according to moment
   * in the user's language
   */
  defaultFormat: string;
  /**
   * The value already formatted in such form
   * using moment
   */
  defaultFormattedValue: string;
}

/**
 * The property view date time handler class
 */
export class PropertyViewDateTime extends React.Component<IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>> {
  constructor(props: IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>) {
    super(props);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return this.props.useAppliedValue !== nextProps.useAppliedValue ||
      (!this.props.useAppliedValue && !equals(this.props.state.value, nextProps.state.value)) ||
      (this.props.useAppliedValue && !equals(this.props.state.stateAppliedValue, nextProps.state.stateAppliedValue)) ||
      nextProps.property !== this.props.property ||
      nextProps.renderer !== this.props.renderer ||
      nextProps.capitalize !== this.props.capitalize ||
      !!this.props.rtl !== !!nextProps.rtl ||
      this.props.language !== nextProps.language ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    const type = this.props.property.getType();
    let format: string;
    let dbFormat: string;
    if (type === "date") {
      format = getLocalizedDateFormat(this.props.language);
      dbFormat = DATE_FORMAT;
    } else if (type === "datetime") {
      format = getLocalizedDateTimeFormat(this.props.language);
      dbFormat = DATETIME_FORMAT;
    } else {
      format = getLocalizedTimeFormat(this.props.language);
      dbFormat = TIME_FORMAT;
    }

    let momentValue: Moment.Moment = null;
    const valueToUse: string = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value) as string;
    if (valueToUse && valueToUse !== "Invalid Date") {
      momentValue = Moment(valueToUse, dbFormat);
      if (!momentValue.isValid()) {
        momentValue = null;
      }
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewDateTimeRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      currentValue: valueToUse,
      momentValue,
      dbFormat,
      defaultFormat: format,
      defaultFormattedValue: momentValue ? momentValue.format(format) : null,
    };

    return <RendererElement {...rendererArgs}/>
  }
}
