/**
 * Containst function that are usable for handling navigation
 * between the application
 *
 * @packageDocumentation
 */
import { Location } from "history";
/**
 * Allows to set the history state to a new state
 * @param location the location object
 * @param state the new state, partial
 * @param replace and whether it's a replace action rather than a push
 */
export declare function setHistoryState<S>(location: Location, state: Partial<S>, replace?: boolean): void;
/**
 * Sets the history state to a new state, but uses the query string
 * instead rather than the internal history state
 * @param location the location object
 * @param state the state to use, partial
 * @param replace whether to replace rather than push
 */
export declare function setHistoryQSState<S>(location: Location, state: Partial<S>, replace?: boolean): void;
/**
 * A very simple redirect that runs a history push or replace
 * @param newLocation the new location
 * @param state the new state
 * @param replace whether to replace rather than push
 */
export declare function redirectTo(newLocation: string, state?: any, replace?: boolean): void;
/**
 * A very simple redirect as well, but this time ensures that localization
 * is respected in the url
 * @param newLocation the new location without localization
 * @param state the new state
 * @param replace whether to replace
 */
export declare function localizedRedirectTo(newLocation: string, state?: any, replace?: boolean): void;
/**
 * Simply go back
 */
export declare function goBack(): void;
