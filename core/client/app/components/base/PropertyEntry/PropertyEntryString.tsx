import React from "react";
import { IPropertyEntryProps } from ".";
import {
  PropertyDefinitionSupportedStringType,
} from "../../../../../base/ItemDefinition/PropertyDefinition";

interface IPropertyEntryStringState {
  internalStateValue: PropertyDefinitionSupportedStringType;
}

export default class PropertyEntryString
  extends React.Component<IPropertyEntryProps, IPropertyEntryStringState> {
  public static getDerivedStateFromProps(
    props: IPropertyEntryProps,
  ): Partial<IPropertyEntryStringState> {
    return {
      internalStateValue: props.value.value as
        PropertyDefinitionSupportedStringType || "",
    };
  }
  constructor(props: IPropertyEntryProps) {
    super(props);

    this.state = {
      internalStateValue: "",
    };

    this.onChange = this.onChange.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyEntryProps,
    nextState: IPropertyEntryStringState,
  ) {
    // We are checking every value by hand in the nextProps value
    // because the value is in the internal state value now
    // so a change in the props value shouldn't make of an update
    return nextProps.property !== this.props.property ||
      this.state.internalStateValue !== nextState.internalStateValue ||
      nextProps.value.default !== this.props.value.default ||
      nextProps.value.enforced !== this.props.value.enforced ||
      nextProps.value.hidden !== this.props.value.hidden ||
      nextProps.value.userSet !== this.props.value.userSet ||
      nextProps.value.valid !== this.props.value.valid;
  }
  public onChange(e: React.ChangeEvent<HTMLInputElement>) {
    // TODO do something about nullable default, either here or
    // in the base
    this.props.onChange(e.target.value);
  }
  public render() {
    const className = `property-entry-string ${
      this.props.value.default ? "property-entry-string--default" : ""
    } ${
      this.props.value.enforced ? "property-entry-string--enforced" : ""
    } ${
      this.props.value.userSet ? "property-entry-string--user-set" : ""
    } ${
      this.props.value.hidden ? "property-entry-string--hidden" : ""
    } ${
      this.props.value.valid ?
        "property-entry-string--valid" :
        "property-entry-string--invalid"
    }`;
    return (
      <div
        className={className}
      >
        <input
          type="text"
          value={this.state.internalStateValue}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
