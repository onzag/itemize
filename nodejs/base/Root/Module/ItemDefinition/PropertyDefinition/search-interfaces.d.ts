/**
 * Contains the search interfaces that a property can use
 * these are basically 4, also contains all the utilities and prefixes
 * that are related to these interfaces
 *
 * @packageDocumentation
 */
/**
 * These are all the 4 interfaces
 */
export declare enum PropertyDefinitionSearchInterfacesType {
    /**
     * uses an instance of the same property type input
     */
    EXACT = 0,
    /**
     * uses an instance of the same property type input, or two for a range
     * provides either an exact value or a range
     */
    EXACT_AND_RANGE = 1,
    /**
     * full text search, uses a simple raw string as search
     */
    FTS = 2,
    /**
     * uses location and radius for searching
     */
    LOCATION_RADIUS = 3
}
/**
 * The prefixes for every location search interface
 */
export declare const PropertyDefinitionSearchInterfacesPrefixes: {
    /**
     * Used to prefix the exact searches when using the exact or exact and range protocol
     */
    EXACT: string;
    /**
     * Used to prefix for the from value when using exact and range protocol
     */
    FROM: string;
    /**
     * Used to prefix the value to for the to search
     */
    TO: string;
    /**
     * Used to prefix FTS queries
     */
    SEARCH: string;
    /**
     * Used to prefix the location when using location radius
     */
    LOCATION: string;
    /**
     * Used to prefix the radius when using location radius
     */
    RADIUS: string;
};
/**
 * this correlates to our search interface enum, enums are numbers basically
 * so when we want to get which interfaces each uses, we refer to this
 * array of arrays
 */
export declare const PropertyDefinitionSearchInterfacesPrefixesList: string[][];
