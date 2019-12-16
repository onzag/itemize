import { IPropertyViewProps } from "../PropertyView";
import React from "react";
import { capitalize } from "../../../../../util";
import { Icon } from "@material-ui/core";

export default class PropertyViewBoolean extends React.Component<IPropertyViewProps, {}> {
  public shouldComponentUpdate(nextProps: IPropertyViewProps) {
    return this.props.i18n !== nextProps.i18n ||
      this.props.value.value !== nextProps.value.value;
  }
  public render() {
    let i18nLabel = null;
    let icon = null;
    if (this.props.value.value === null) {
      i18nLabel = capitalize(this.props.i18n.unspecified);
      icon = <Icon>indeterminate_check_box</Icon>;
    } else if (this.props.value.value === true) {
      i18nLabel = capitalize(this.props.i18n.yes);
      icon = <Icon>check_box</Icon>;
    } else if (this.props.value.value === false) {
      i18nLabel = capitalize(this.props.i18n.no);
      icon = <Icon>check_box_outline_blank</Icon>;
    }
    return (
      <div>
        {i18nLabel}{icon}
      </div>
    );
  }
}
