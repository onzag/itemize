/**
 * Contains the search interfaces that a property can use
 * these are basically 4, also contains all the utilities and prefixes
 * that are related to these interfaces
 *
 * @packageDocumentation
 */

import { PREFIX_BUILD } from "../../../../../constants";

/**
 * These are all the 4 interfaces
 */
export enum PropertyDefinitionSearchInterfacesType {
  /**
   * uses an instance of the same property type input
   */
  EXACT,
  /**
   * uses an instance of the same property type input, or two for a range
   * provides either an exact value or a range
   */
  EXACT_AND_RANGE,
  /**
   * full text search, uses a simple raw string as search
   */
  FTS,
  /**
   * uses location and radius for searching
   */
  LOCATION_RADIUS,
}

/**
 * The prefixes for every location search interface
 */
export const PropertyDefinitionSearchInterfacesPrefixes = {
  /**
   * Used to prefix the exact searches when using the exact or exact and range protocol
   */
  EXACT: PREFIX_BUILD("EXACT"),
  /**
   * Used to prefix for the from value when using exact and range protocol
   */
  FROM: PREFIX_BUILD("FROM"),
  /**
   * Used to prefix the value to for the to search
   */
  TO: PREFIX_BUILD("TO"),
  /**
   * Used to prefix FTS queries
   */
  SEARCH: PREFIX_BUILD("SEARCH"),
  /**
   * Used to prefix the location when using location radius
   */
  LOCATION: PREFIX_BUILD("LOCATION"),
  /**
   * Used to prefix the radius when using location radius
   */
  RADIUS: PREFIX_BUILD("RADIUS"),
};

/**
 * this correlates to our search interface enum, enums are numbers basically
 * so when we want to get which interfaces each uses, we refer to this
 * array of arrays
 */
export const PropertyDefinitionSearchInterfacesPrefixesList = [
  [
    PropertyDefinitionSearchInterfacesPrefixes.EXACT,
  ],
  [
    PropertyDefinitionSearchInterfacesPrefixes.EXACT,
    PropertyDefinitionSearchInterfacesPrefixes.FROM,
    PropertyDefinitionSearchInterfacesPrefixes.TO,
  ],
  [
    PropertyDefinitionSearchInterfacesPrefixes.SEARCH,
  ],
  [
    PropertyDefinitionSearchInterfacesPrefixes.LOCATION,
    PropertyDefinitionSearchInterfacesPrefixes.RADIUS,
  ],
];
