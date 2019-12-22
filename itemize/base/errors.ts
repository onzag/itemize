interface IGraphQLEndpointErrorBaseType {
  message: string;
  code: string;
}

interface IGraphQLEndpointErrorOverloadPropExtensionType {
  message: string;
  code: string;
  modulePath: string[];
  propertyId: string;
}

interface IGraphQLEndpointErrorOverloadPropertyType {
  message: string;
  code: string;
  modulePath: string[];
  itemDefPath: string[];
  propertyId: string;
}

interface IGraphQLEndpointErrorOverloadPropertyInItemType {
  message: string;
  code: string;
  modulePath: string[];
  itemDefPath: string[];
  itemId: string;
  itemIdItemDefPath: string[];
  propertyId: string;
}

interface IGraphQLEndpointErrorOverloadPolicyType {
  message: string;
  code: string;
  modulePath: string[];
  itemDefPath: string[];
  policyName: string;
  policyType: string;
}

export type GraphQLEndpointErrorType =
  IGraphQLEndpointErrorBaseType |
  IGraphQLEndpointErrorOverloadPropExtensionType |
  IGraphQLEndpointErrorOverloadPropertyType |
  IGraphQLEndpointErrorOverloadPropertyInItemType |
  IGraphQLEndpointErrorOverloadPolicyType;

export class GraphQLEndpointError extends Error {
  public data: GraphQLEndpointErrorType;

  constructor(data: GraphQLEndpointErrorType) {
    super(data.message);

    this.data = data;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, GraphQLEndpointError.prototype);
  }
}
