import { PREFIX_BUILD } from "../../../../../constants";

export enum PropertyDefinitionSearchInterfacesType {
  // uses an instance of the same property type input
  EXACT,
  // uses an instance of the same property type input, or two for a range
  // provides either an exact value or a range
  EXACT_AND_RANGE,
  // full text search, uses a simple raw string as search
  FTS,
  // uses location and radius for searching
  LOCATION_RADIUS,
}

export const PropertyDefinitionSearchInterfacesPrefixes = {
  EXACT: PREFIX_BUILD("EXACT"),
  FROM: PREFIX_BUILD("FROM"),
  TO: PREFIX_BUILD("TO"),
  SEARCH: PREFIX_BUILD("SEARCH"),
  LOCATION: PREFIX_BUILD("LOCATION"),
  RADIUS: PREFIX_BUILD("RADIUS"),
};

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
