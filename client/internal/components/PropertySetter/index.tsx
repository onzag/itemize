/**
 * This contains the rather simple property setter component
 * @packageDocumentation
 */

import React from "react";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import equals from "deep-equal";
import { PropertyDefinitionSupportedType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

/**
 * Base props for the property setter, check base.tsx to check
 * how these properties are given
 */
export interface IPropertySetterBaseProps {
  /**
   * The property that is to be set
   * retrieved from the item-definition.tsx context
   */
  property: PropertyDefinition;
  /**
   * The slot id that is to be used, or null
   * retrieved from the item-definition.tsx context
   */
  forId: number;
  /**
   * The slot version that is to be used, or null
   * retrieved from the item-definition.tsx context
   */
  forVersion?: string;
  /**
   * The value that is to be set
   * Provided by the user
   */
  value: PropertyDefinitionSupportedType;
  /**
   * The enforcement function
   * retrieved from the item-definition.tsx context
   */
  onEnforce: (value: PropertyDefinitionSupportedType, forId: number, forVersion: string) => void;
  /**
   * The clear enforcement function
   * retrieved from the item-definition.tsx context
   */
  onClearEnforcement: (forId: number, forVersion: string) => void;
}

/**
 * The property setter allows to manually set values for
 * properties, these then become readonly
 */
export default class PropertySetter extends React.Component<IPropertySetterBaseProps, {}> {
  constructor(props: IPropertySetterBaseProps) {
    super(props);
  }
  public componentDidMount() {
    // on mount we call the enforce
    this.props.onEnforce(this.props.value, this.props.forId || null, this.props.forVersion || null);
  }
  public shouldComponentUpdate(nextProps: IPropertySetterBaseProps) {
    // on update we check for the id
    const idHasChanged = (this.props.forId || null) !== (nextProps.forId || null) ||
      (this.props.forVersion || null) !== (nextProps.forVersion || null);

    // if such id has changed
    if (idHasChanged) {
      // we clear the enforcement
      this.props.onClearEnforcement(this.props.forId || null, this.props.forVersion || null);
    }

    // and if the slot id has changed or if the
    // new value does not match
    if (
      idHasChanged ||
      !equals(nextProps.value, this.props.value)
    ) {
      // we set the enforcement
      this.props.onEnforce(nextProps.value, nextProps.forId, nextProps.forVersion);
    }

    // this always returns null, never upates
    return false;
  }
  public componentWillUnmount() {
    // we clear the enfocement on unmount
    this.props.onClearEnforcement(this.props.forId, this.props.forVersion);
  }
  public render() {
    return null as React.ReactNode;
  }
}
