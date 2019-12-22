import React from "react";
import PropertyDefinition, { IPropertyDefinitionState } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import equals from "deep-equal";
import { PropertyDefinitionSupportedType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

export interface IPropertySetterBaseProps {
  property: PropertyDefinition;
  forId: number;
  value: PropertyDefinitionSupportedType;
  onEnforce: (value: PropertyDefinitionSupportedType, forId: number) => void;
  onClearEnforcement: (forId: number) => void;
}

// TODO title, description to views and flags to hide and show them
export default class PropertySetter extends React.Component<IPropertySetterBaseProps, {}> {
  constructor(props: IPropertySetterBaseProps) {
    super(props);
  }
  public componentDidMount() {
    this.props.onEnforce(this.props.value, this.props.forId);
  }
  public componentDidUpdate(prevProps: IPropertySetterBaseProps) {
    if (this.props.forId !== prevProps.forId) {
      this.props.onClearEnforcement(prevProps.forId);
    }
    if (
      this.props.forId !== prevProps.forId ||
      !equals(prevProps.value, this.props.value)
    ) {
      this.props.onEnforce(this.props.value, this.props.forId);
    }
  }
  public componentWillUnmount() {
    this.props.onClearEnforcement(this.props.forId);
  }
  public render() {
    return null;
  }
}
