import type { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import React from "react";

interface IOnInputReceivedRedirectAction {
  action: "redirect";
  to: string;
}

interface IOnInputReceivedBaseAction {
  /**
   * A parent to change the parented value
   */
  parentedBy?: {
    item: string,
    id: string,
    version?: string,
  };
  /**
   * Submit for an id rather than the one from this current context
   */
  submitForId?: string;
  /**
   * Submit for a version rather than the one from this current context
   */
  submitForVersion?: string;
  /**
   * Advanced, allows to submit for an alternate item rather than the current
   * one
   */
  submitForItem?: string;
  /**
   * Do it in behalf of someone else
   */
  inBehalfOf?: string;
  /**
   * A language override
   */
  languageOverride?: string;
  /**
  * It's arrays in order to be able to build
  * these dinamically
  * "%value" represents the given by USSD
  * "%id" represents the received id from the graphql request
  * "%version" represents the received version from the graphql request
  */
  redirectOnSuccess?: string[];
  /**
   * It's arrays in order to be able to build
   * these dinamically
   * "%value" represents the value given by USSD
   * "%error" represents the received error from the graphql request
   */
  redirectOnFail?: string[];
}

interface IPropertyExactValue {
  exactValue: PropertyDefinitionSupportedType;
};

interface IPropertiesIncludesValues {
  [propertyId: string]: IPropertyExactValue | "FROM_INPUT" | "FROM_INPUT_NUMBER" | "DEFAULT";
}

/**
 * Specifies the values of the properties to submit
 * FROM_INPUT means use the value retrieved from the input
 */
interface IPropertiesValues {
  [propertyId: string]: IPropertiesIncludesValues | IPropertyExactValue | "FROM_INPUT" | "FROM_INPUT_NUMBER" | "DEFAULT";
}

interface IOnInputReceivedEditAction extends IOnInputReceivedBaseAction {
  action: "edit";
  /**
   * The value to assign to the given
   * property
   */
  values: IPropertiesValues;
}

interface IOnInputReceivedAddAction extends IOnInputReceivedBaseAction {
  action: "add";
  /**
   * The values to assign to the given
   * property
   */
  values?: IPropertiesValues;
}

interface IUSSDActionProps {
  label: string;
  onInputReceived: IOnInputReceivedRedirectAction | IOnInputReceivedBaseAction | IOnInputReceivedEditAction | IOnInputReceivedAddAction;
}

export class USSDAction extends React.Component<IUSSDActionProps> {
  render() {
    return (
      <div data-chunk="true" data-label={this.props.label}>
        {this.props.children}
      </div>
    )
  }
}