/**
 * Containst very useful utility functions that are used within
 * the itemize application for many purposes
 *
 * @packageDocumentation
 */
import { IGQLFile } from "../../../gql-querier";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
/**
 * The image source set retriver allows to generate a srcset based on a property, the current file
 * data value, and optionally the image sizes (obtained via the imageSizeRetriever in this same file)
 * if image sizes are not provided they are calculated
 *
 * Note that sometimes srcset is empty eg. image is a svg or it currently represents a local blob yes
 * local files are supported
 *
 * @param fileData the file itself
 * @param property the property in question this file applies to
 * @param imageSizes an optional already calculated image sizes, via the imageSizeRetriever; if not provided
 * it is calculated
 */
export declare function imageSrcSetRetriever(fileData: IGQLFile, property: PropertyDefinition, imageSizes?: IImageSizes): string;
/**
 * The image sizes as returned by the image size retriever function
 * as it provides the extracted information for the urls where this is going to be saved
 * note that the urls provided are merely names, and need to be absoluted, some files
 * eg. in the reader are already absoluted
 */
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
/**
 * Allows to load images that are remote, but yet uses the service worker logic in order to cache these
 * images and keep them up to date
 * @param url the url to request where the image is and to cache from
 * @param recheck whether to constantly recheck this image for updates, mainly useless, unless loading
 * from other sources
 * @returns a query string url with the service worker query string parameters
 */
export declare function cacheableQSLoader(url: string, recheck?: boolean): string;
