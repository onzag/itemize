import React from "react";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import equals from "deep-equal";
import { PropertyDefinitionSupportedType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

export interface IPropertySetterBaseProps {
  property: PropertyDefinition;
  forId: number;
  forVersion?: string;
  value: PropertyDefinitionSupportedType;
  onEnforce: (value: PropertyDefinitionSupportedType, forId: number, forVersion: string) => void;
  onClearEnforcement: (forId: number, forVersion: string) => void;
}

export default class PropertySetter extends React.Component<IPropertySetterBaseProps, {}> {
  constructor(props: IPropertySetterBaseProps) {
    super(props);
  }
  public componentDidMount() {
    this.props.onEnforce(this.props.value, this.props.forId, this.props.forVersion);
  }
  public componentDidUpdate(prevProps: IPropertySetterBaseProps) {
    const idHasChanged = this.props.forId !== prevProps.forId ||
      (this.props.forVersion || null) !== (prevProps.forVersion || null);
    if (idHasChanged) {
      this.props.onClearEnforcement(prevProps.forId, prevProps.forVersion || null);
    }
    if (
      idHasChanged ||
      !equals(prevProps.value, this.props.value)
    ) {
      this.props.onEnforce(this.props.value, this.props.forId, this.props.forVersion);
    }
  }
  public componentWillUnmount() {
    this.props.onClearEnforcement(this.props.forId, this.props.forVersion);
  }
  public render() {
    return null as React.ReactNode;
  }
}
