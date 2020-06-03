import { IGQLFile } from "../../../gql-querier";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
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
