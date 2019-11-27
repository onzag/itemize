export class GraphQLDataInputError extends Error {
  public code: string;
  public propertyId: string;
  public itemId: string;
  public policyName: string;
  public policyType: string;
  public modulePath: string[];
  public itemDefPath: string[];

  constructor(data: {
    message: string;
    code: string;
    modulePath?: string[];
    itemDefPath?: string[];
    itemId?: string;
    propertyId?: string;
    policyType?: string;
    policyName?: string;
  }) {
    super(data.message);

    this.code = data.code;
    this.modulePath = data.modulePath || null;
    this.itemDefPath = data.itemDefPath || null;
    this.itemId = data.itemId || null;
    this.propertyId = data.propertyId || null;
    this.policyName = data.policyName || null;
    this.policyType = data.policyType || null;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, GraphQLDataInputError.prototype);
  }
}
