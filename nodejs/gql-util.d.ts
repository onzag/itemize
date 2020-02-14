/**
 * Contains graphql utlity functions that are used everywhere accross
 * the itemize app
 */
import { IGQLRequestFields, IGQLValue } from "./gql-querier";
/**
 * Checks whether a subset is contained within other subset of
 * request fields or a value, preferably use against other request fields
 * @param requestFieldsSubset the request fields that is supposed to be a subset
 * @param requestFieldsOrValueMain the request fields or the value
 * @returns a boolean
 */
export declare function requestFieldsAreContained(requestFieldsSubset: IGQLRequestFields, requestFieldsOrValueMain: IGQLRequestFields | IGQLValue): boolean;
/**
 * Merges request fields or values together
 * @param gqlValueOrFieldsOverride the value that overrides
 * @param gqlValueOfFieldsOverriden the value that is overriden
 * @returns new merged request fields
 */
export declare function deepMerge(gqlValueOrFieldsOverride: any, gqlValueOfFieldsOverriden: any): any;
/**
 * When requesting fields the DATA can be there, so it needs to be flattened
 * into the flattened form without the DATA but all data free
 * @param recievedFields the recieved fields or value
 */
export declare function flattenRawGQLValueOrFields(fieldsOrValue: IGQLValue | IGQLRequestFields): any;
