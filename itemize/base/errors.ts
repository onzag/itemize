// standard error
interface IEndpointErrorBaseType {
  message: string;
  code: string;
}

// Error when it occurs in a prop extension
interface IEndpointErrorOverloadPropExtensionType {
  message: string;
  code: string;
  modulePath: string[];
  propertyId: string;
}

// Error when it occurs in a property
interface IEndpointErrorOverloadPropertyType {
  message: string;
  code: string;
  modulePath: string[];
  itemDefPath: string[];
  propertyId: string;
}

// Error when it occurs in a property that belongs to an include
interface IEndpointErrorOverloadPropertyInIncludeType {
  message: string;
  code: string;
  modulePath: string[];
  itemDefPath: string[];
  includeId: string;
  includeIdItemDefPath: string[];
  propertyId: string;
}

// Errors in policies, all policies have an item definition and module
interface IEndpointErrorOverloadPolicyType {
  message: string;
  code: string;
  modulePath: string[];
  itemDefPath: string[];
  policyName: string;
  policyType: string;
}

// All errors
export type EndpointErrorType =
  IEndpointErrorBaseType |
  IEndpointErrorOverloadPropExtensionType |
  IEndpointErrorOverloadPropertyType |
  IEndpointErrorOverloadPropertyInIncludeType |
  IEndpointErrorOverloadPolicyType;

/**
 * An instance version of the error that contains
 * the raw object data of the error
 */
export class EndpointError extends Error {
  public data: EndpointErrorType;

  constructor(data: EndpointErrorType) {
    super(data.message);

    this.data = data;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, EndpointError.prototype);
  }
}
