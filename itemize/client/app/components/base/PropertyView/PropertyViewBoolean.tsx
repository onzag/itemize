import { IPropertyViewProps } from "../PropertyView";
import React from "react";
import { capitalize } from "../../../../../util";
import { Icon } from "@material-ui/core";

export default class PropertyViewBoolean extends React.Component<IPropertyViewProps, {}> {
  public shouldComponentUpdate(nextProps: IPropertyViewProps) {
    return this.props.i18n !== nextProps.i18n ||
      this.props.state.value !== nextProps.state.value;
  }
  public render() {
    let i18nLabel = null;
    let icon = null;
    if (this.props.state.value === null) {
      i18nLabel = capitalize(this.props.i18n.unspecified);
      icon = <Icon>indeterminate_check_box</Icon>;
    } else if (this.props.state.value === true) {
      i18nLabel = capitalize(this.props.i18n.yes);
      icon = <Icon>check_box</Icon>;
    } else if (this.props.state.value === false) {
      i18nLabel = capitalize(this.props.i18n.no);
      icon = <Icon>check_box_outline_blank</Icon>;
    }
    return (
      <div className={this.props.classes.container}>
        {i18nLabel}{icon}
      </div>
    );
  }
}
