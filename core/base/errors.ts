export class GraphQLDataInputError extends Error {
  public code: string;
  public propertyId: string;
  public itemId: string;
  public policyName: string;
  public policyType: string;
  constructor(m: string, code: string, itemId: string, propertyId: string, policyType: string, policyName: string) {
    super(m);

    this.code = code;
    this.itemId = itemId;
    this.propertyId = propertyId;
    this.policyName = policyName;
    this.policyType = policyType;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, GraphQLDataInputError.prototype);
  }
}
