interface IEndpointErrorBaseType {
  message: string;
  code: string;
}

interface IEndpointErrorOverloadPropExtensionType {
  message: string;
  code: string;
  modulePath: string[];
  propertyId: string;
}

interface IEndpointErrorOverloadPropertyType {
  message: string;
  code: string;
  modulePath: string[];
  itemDefPath: string[];
  propertyId: string;
}

interface IEndpointErrorOverloadPropertyInIncludeType {
  message: string;
  code: string;
  modulePath: string[];
  itemDefPath: string[];
  includeId: string;
  includeIdItemDefPath: string[];
  propertyId: string;
}

interface IEndpointErrorOverloadPolicyType {
  message: string;
  code: string;
  modulePath: string[];
  itemDefPath: string[];
  policyName: string;
  policyType: string;
}

export type EndpointErrorType =
  IEndpointErrorBaseType |
  IEndpointErrorOverloadPropExtensionType |
  IEndpointErrorOverloadPropertyType |
  IEndpointErrorOverloadPropertyInIncludeType |
  IEndpointErrorOverloadPolicyType;

export class EndpointError extends Error {
  public data: EndpointErrorType;

  constructor(data: EndpointErrorType) {
    super(data.message);

    this.data = data;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, EndpointError.prototype);
  }
}
