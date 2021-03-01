/**
 * This file contains the location search provider base class that specifies
 * how to complete locations for itemize location type
 * @module
 */

import { IPropertyDefinitionSupportedLocationType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import uuidv5 from "uuid/v5";
import { IServiceProviderClassType, ServiceProvider, ServiceProviderType } from "..";
import { RegistryService } from "../registry";

/**
 * this id can be whatever just to ensure lat and long produce the same id no matter what
 * basically a combination for location, this way we are not tied to any API
 * @ignore
 */
const NAMESPACE = "d27dba52-42ef-4649-81d2-568f9ba341ff";

/**
 * The location search provider is a base interface type class
 * that specifies how to create a service for location search
 */
export default class LocationSearchProvider<T> extends ServiceProvider<T> {
  public static getType() {
    return ServiceProviderType.LOCAL;
  }
  /**
   * A helping utility that specifies how to make location search ids
   * this is what itemize uses internally and it should be kept consistent
   * we cannot rely on ids given by third party services so we have
   * to create our own in order to be able to switch services
   * 
   * @param lat the latitude
   * @param lng the longitude
   */
  public makeIdOutOf(lat: number, lng: number) {
    return "L" + uuidv5(lat.toString() + lng.toString(), NAMESPACE).replace(/-/g, "");
  }

  /**
   * This function is executed once the user requests a geocode
   * for a given location, you should override it
   * 
   * @param lat the latitude the geocode is requested for
   * @param lng the longitude the geocode is requested for
   * @param query a query text (what is written in the search box while this is clicked)
   * @param lang the language of the user
   * @param sep the word separarator, usually a comma is here
   * @returns a promise for a location
   * @override
   */
  public async requestGeocodeFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType> {
    return null;
  }

  /**
   * This function is executed once the user requests a search
   * for a given location, you should override it
   * 
   * @param lat the latitude where results should be nearby for
   * @param lng the longitude where results should be nearby for
   * @param query a query of what we are searching for
   * @param lang the language of the user
   * @param sep the word separarator, usually a comma is here
   * @returns a promise for a location array
   * @override
   */
  public async requestSearchFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType[]> {
    return null;
  }

  /**
   * Similar to search, but should return fewer results, and maybe
   * less accurate, these are used for autocompletition
   * this function should be overriden
   * 
   * @param lat the latitude where results should be nearby for
   * @param lng the longitude where results should be nearby for
   * @param query a query of what we are searching for
   * @param lang the language of the user
   * @param sep the word separarator, usually a comma is here
   * @returns a promise for a location array
   * @override
   */
  public async requestAutocompleteFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType[]> {
    return null;
  }
}
