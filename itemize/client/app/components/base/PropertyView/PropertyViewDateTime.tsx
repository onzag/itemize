import { IPropertyViewProps } from "../PropertyView";
import React from "react";
import Moment from "moment";
import { getLocalizedDateFormat, getLocalizedDateTimeFormat, getLocalizedTimeFormat } from "../../../../../util";
import { DATETIME_FORMAT, DATE_FORMAT, TIME_FORMAT } from "../../../../../constants";

export default class PropertyViewDateTime extends React.Component<IPropertyViewProps, {}> {
  public shouldComponentUpdate(nextProps: IPropertyViewProps) {
    return this.props.language !== nextProps.language ||
      this.props.value.value !== nextProps.value.value;
  }
  public render() {
    if (this.props.value.value === null) {
      return <div/>;
    }

    const type = this.props.property.getType();
    let format: string;
    let dbFormat: string;
    if (type === "date") {
      format = getLocalizedDateFormat(false);
      dbFormat = DATE_FORMAT;
    } else if (type === "datetime") {
      format = getLocalizedDateTimeFormat(false);
      dbFormat = DATETIME_FORMAT;
    } else {
      format = getLocalizedTimeFormat(false);
      dbFormat = TIME_FORMAT;
    }
    return (
      <div>
        {Moment(this.props.value.value as string, dbFormat).format(format)}
      </div>
    );
  }
}
