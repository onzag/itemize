// import { IPropertyViewProps } from ".";
// import React from "react";
// import Moment from "moment";
// import { getLocalizedDateFormat, getLocalizedDateTimeFormat, getLocalizedTimeFormat } from "../../../util";
// import { DATETIME_FORMAT, DATE_FORMAT, TIME_FORMAT } from "../../../constants";

// export default class PropertyViewDateTime extends React.Component<IPropertyViewProps, {}> {
//   public shouldComponentUpdate(nextProps: IPropertyViewProps) {
//     return this.props.language !== nextProps.language ||
//       this.props.state.value !== nextProps.state.value;
//   }
//   public render() {
//     if (this.props.state.value === null) {
//       return <div/>;
//     }

//     const type = this.props.property.getType();
//     let format: string;
//     let dbFormat: string;
//     if (type === "date") {
//       format = getLocalizedDateFormat(false);
//       dbFormat = DATE_FORMAT;
//     } else if (type === "datetime") {
//       format = getLocalizedDateTimeFormat(false);
//       dbFormat = DATETIME_FORMAT;
//     } else {
//       format = getLocalizedTimeFormat(false);
//       dbFormat = TIME_FORMAT;
//     }
//     return (
//       <div className={this.props.classes.container}>
//         {Moment(this.props.state.value as string, dbFormat).format(format)}
//       </div>
//     );
//   }
// }

import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import equals from "deep-equal";
import Moment from "moment";
import { getLocalizedDateFormat, getLocalizedDateTimeFormat, getLocalizedTimeFormat } from "../../../../util";
import { DATE_FORMAT, DATETIME_FORMAT, TIME_FORMAT } from "../../../../constants";

export interface IPropertyViewDateTimeRendererProps extends IPropertyViewRendererProps<string> {
  momentValue: any;
  dbFormat: string;
  defaultFormat: string;
  defaultFormattedValue: string;
}

export class PropertyViewDateTime extends React.Component<IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>> {
  constructor(props: IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>) {
    super(props);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return !equals(this.props.state.value, nextProps.state.value) ||
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
      format = getLocalizedDateFormat();
      dbFormat = DATE_FORMAT;
    } else if (type === "datetime") {
      format = getLocalizedDateTimeFormat();
      dbFormat = DATETIME_FORMAT;
    } else {
      format = getLocalizedTimeFormat();
      dbFormat = TIME_FORMAT;
    }

    let momentValue: any = null;
    if (this.props.state.value && this.props.state.value !== "Invalid Date") {
      momentValue = Moment(this.props.state.value as string, dbFormat).utc();
      if (!momentValue.isValid()) {
        momentValue = null;
      }
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewDateTimeRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      currentValue: this.props.state.value as string,
      momentValue,
      dbFormat,
      defaultFormat: format,
      defaultFormattedValue: momentValue ? momentValue.format(format) : null,
    };

    return <RendererElement {...rendererArgs}/>
  }
}