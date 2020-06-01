import { IGQLFile } from "../../../gql-querier";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import Include from "../../../base/Root/Module/ItemDefinition/Include";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
export declare function fileArrayURLAbsoluter(containerHostnamePrefixes: {
    [key: string]: string;
}, files: IGQLFile[], itemDefinition: ItemDefinition, id: number, version: string, containerId: string, include: Include, property: PropertyDefinition): IGQLFile[];
export declare function fileURLAbsoluter(containerHostnamePrefixes: {
    [key: string]: string;
}, file: IGQLFile, itemDefinition: ItemDefinition, id: number, version: string, containerId: string, include: Include, property: PropertyDefinition): IGQLFile;
export declare function imageSrcSetRetriever(fileData: IGQLFile, property: PropertyDefinition, imageSizes?: IImageSizes): string;
export interface IImageSizes {
    imageMediumSizeURL: string;
    imageSmallSizeURL: string;
    imageLargeSizeURL: string;
    imageStandardSizeURL: string;
    [others: string]: string;
}
/**
 * Gets all the available image sizes for a given file
 * @param fileData the file data
 * @param property if not passed only returns the default image sizes, medium, small, large and the standard one
 * custom sizes can be used and it needs access to the property in order to know these urls
 */
export declare function imageSizeRetriever(fileData: IGQLFile, property?: PropertyDefinition): IImageSizes;
export declare function cacheableQSLoader(url: string, recheck?: boolean): string;
