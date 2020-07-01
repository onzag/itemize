import { IPropertyDefinitionSupportedLocationType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
export declare class Here {
    private apiKey;
    constructor(apiKey: string);
    requestGeocodeFor(lat: string | number, lng: string | number, query: string, lang: string, sep: string): Promise<IPropertyDefinitionSupportedLocationType>;
    requestSearchFor(lat: string | number, lng: string | number, query: string, lang: string, sep: string): Promise<IPropertyDefinitionSupportedLocationType[]>;
    requestAutocompleteFor(lat: string | number, lng: string | number, query: string, lang: string, sep: string): Promise<IPropertyDefinitionSupportedLocationType[]>;
}
export declare function setupHere(apiKey: string): Here;
