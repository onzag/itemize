/**
 * Contains the very important error type and file
 * which specifies a pattern that is to be used in order
 * to send errors from the server side to the client side
 * 
 * @module
 */

/**
 * This is an standard error
 */
interface IEndpointErrorBaseType {
  message: string;
  code: string;
  data?: any;
}

/**
 * An error that comes from a prop extension
 * code should be INVALID_PROPERTY
 */
interface IEndpointErrorOverloadPropExtensionType extends IEndpointErrorBaseType {
  pcode: string;
  modulePath: string[];
  propertyId: string;
}

/**
 * Error when it occurs in a property
 * code should be INVALID_PROPERTY
 */
interface IEndpointErrorOverloadPropertyType extends IEndpointErrorOverloadPropExtensionType {
  itemDefPath: string[];
}

/**
 * Error when it occurs in an include
 * code should be INVALID_INCLUDE
 */
interface IEndpointErrorOverloadIncludeType extends IEndpointErrorBaseType {
  modulePath: string[];
  itemDefPath: string[];
  includeId: string;
  includeIdItemDefPath: string[];
}

/**
 * Error when it occurs in a property that belongs to an include
 * code should be INVALID_PROPERTY
 */
interface IEndpointErrorOverloadPropertyInIncludeType extends IEndpointErrorOverloadIncludeType {
  pcode: string;
  propertyId: string;
}

/**
 * Errors in policies, all policies have an item definition and module
 * code should be INVALID_POLICY
 */
interface IEndpointErrorOverloadPolicyType extends IEndpointErrorBaseType {
  modulePath: string[];
  itemDefPath: string[];
  policyName: string;
  policyType: string;
}

/**
 * All errors
 */
export type EndpointErrorType =
  IEndpointErrorBaseType |
  IEndpointErrorOverloadPropExtensionType |
  IEndpointErrorOverloadPropertyType |
  IEndpointErrorOverloadPropertyInIncludeType |
  IEndpointErrorOverloadPolicyType |
  IEndpointErrorOverloadIncludeType;

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
