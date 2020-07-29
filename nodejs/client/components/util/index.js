"use strict";
/**
 * Containst very useful utility functions that are used within
 * the itemize application for many purposes
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
function imageSrcSetRetriever(fileData, property, imageSizes) {
    // first we need to check these to see if its a supported
    // file that we can get a srcset of
    if (fileData &&
        fileData.url.indexOf("blob:") !== 0 &&
        fileData.type.indexOf("image/svg") !== 0) {
        // now we get the sizes either from the provided value or from the image sizes retriever
        const sizes = imageSizes || imageSizeRetriever(fileData, property);
        // now we get the metadata hopefully, we have some metadata as it's the norm for images
        const fileMetadata = fileData.metadata || "";
        // so the metadata form is WxH;name,name,name
        // so in order to get the dimensions we split the ; get the first, and then split the x
        const metadataDimensions = fileMetadata.split(";")[0].split("x");
        // for the sizes we go to the other side
        const metadataSizes = fileMetadata.split(";")[1];
        // and we need to get the list as an array, by default null
        let metadataSizeListArray = null;
        // but if we have some data those are our supported sizes
        // when the file was created, this allows to change our dimensions
        // specifications and not break anything regarding the file
        if (metadataSizes) {
            // as such we split the comma
            metadataSizeListArray = metadataSizes.split(",");
        }
        // now we get the metadata width and height
        const metadataWidth = parseInt(metadataDimensions[0]) || null;
        const metadataHeight = parseInt(metadataDimensions[1]) || null;
        // and this is our srcset as we have calculated it
        let srcset = [];
        // now we need the special dimensions property that contains all our dimensions
        // with identifiers
        const dimensions = property.getSpecialProperty("dimensions");
        // of course if we have such property value
        if (dimensions) {
            // so we split it from ; as defined the form these are are as
            // NAME WxH
            // eg. 2X 600x
            // so we split it and then
            dimensions.split(";").forEach((dimension) => {
                // split the given space
                const dimensionTrimmedSplitted = dimension.trim().split(" ");
                // get the name
                const name = dimensionTrimmedSplitted[0];
                // so if we have a list and the name doesn't appear in the size list
                // this means that by the time the image was created this size was unsupported
                if (metadataSizeListArray && !metadataSizeListArray.includes(name)) {
                    return;
                }
                // and get the WxH part
                const widthXHeight = dimensionTrimmedSplitted[1];
                // and extract the width
                const width = parseInt(widthXHeight.split("x")[0]);
                // as long as it's not nan as x600 is a valid value
                // we are able to add it to the srcset
                if (!isNaN(width)) {
                    // it is added here and the width specified
                    srcset.push(sizes[name] + " " + width + "w");
                    // however if the width was not specified but rather the height
                    // we need to do a conversion to get the width
                }
                else if (metadataWidth && metadataHeight) {
                    // for that we get the height
                    const height = parseInt(widthXHeight.split("x")[1]);
                    // and if we have it
                    if (!isNaN(height)) {
                        // we calculate via the ratio what would the expected width be
                        const calculatedWidth = Math.ceil((metadataWidth / metadataHeight) * height);
                        // and as such we have gotten our width for such size
                        srcset.push(sizes[name] + " " + calculatedWidth + "w");
                    }
                }
            });
        }
        // now we get the small dimension, which always should be available
        // for images
        const smallDimension = property.getSpecialProperty("smallDimension");
        const smallDimensionW = parseInt(smallDimension.trim().split("x")[0]);
        if (!isNaN(smallDimensionW)) {
            srcset.push(sizes.imageSmallSizeURL + " " + smallDimensionW + "w");
        }
        // the medium dimension
        const mediumDimension = property.getSpecialProperty("mediumDimension");
        const mediumDimensionW = parseInt(mediumDimension.trim().split("x")[0]);
        if (!isNaN(mediumDimensionW)) {
            srcset.push(sizes.imageMediumSizeURL + " " + mediumDimensionW + "w");
        }
        // and the large dimension
        const largeDimension = property.getSpecialProperty("largeDimension");
        const largeDimensionW = parseInt(largeDimension.trim().split("x")[0]);
        if (!isNaN(largeDimensionW)) {
            srcset.push(sizes.imageLargeSizeURL + " " + largeDimensionW + "w");
        }
        // and now if we have the metadata width (we should)
        // we can add it to our standard url size
        if (metadataWidth) {
            srcset.push(sizes.imageStandardSizeURL + " " + metadataWidth + "w");
        }
        // we return such scrset
        return srcset.join(", ");
    }
    else {
        // otherwise if an svg or whatnot we can return
        // an empty string
        return "";
    }
}
exports.imageSrcSetRetriever = imageSrcSetRetriever;
;
/**
 * Gets all the available image sizes for a given file
 * @param fileData the file data
 * @param property if not passed only returns the default image sizes, medium, small, large and the standard one
 * custom sizes can be used and it needs access to the property in order to know these urls
 */
function imageSizeRetriever(fileData, property) {
    // the final value by default is just the url itself
    const finalValue = {
        imageMediumSizeURL: fileData && fileData.url,
        imageSmallSizeURL: fileData && fileData.url,
        imageLargeSizeURL: fileData && fileData.url,
        imageStandardSizeURL: fileData && fileData.url,
    };
    // now we need to check if it's one of those file types
    // that truly do not have image sizes
    if (fileData &&
        fileData.url.indexOf("blob:") !== 0 &&
        fileData.type.indexOf("image/svg") !== 0) {
        // but if it's a good one we first split the url, this url
        // might already be relative or absolute
        const splittedURL = fileData.url.split("/");
        // now from that we get the filename
        const fileName = splittedURL.pop();
        // and the base url is just the joined version
        const baseURL = splittedURL.join("/");
        // now we need to remove the . section from the filename to get a file without a extension
        const fileNameDotSplitted = fileName.split(".");
        // we remove such extension from the end
        fileNameDotSplitted.pop();
        // now we join to get a recovered version
        const recoveredFileName = fileNameDotSplitted.join(".");
        // however if this means we got nothing as a name, we recover as the filename
        // as this file had no extension to start with or was a dot file
        const fileNameWithoutExtension = recoveredFileName === "" ?
            fileName :
            recoveredFileName;
        // now we can start making the medium, small and large file sizes in jpeg
        finalValue.imageMediumSizeURL = baseURL + "/medium_" + fileNameWithoutExtension + ".jpg";
        finalValue.imageSmallSizeURL = baseURL + "/small_" + fileNameWithoutExtension + ".jpg";
        finalValue.imageLargeSizeURL = baseURL + "/large_" + fileNameWithoutExtension + ".jpg";
        // if we have a property we can get the other special dimensions
        if (property) {
            const dimensions = property.getSpecialProperty("dimensions");
            // the same logic applies
            if (dimensions) {
                dimensions.split(";").forEach((dimension) => {
                    const name = dimension.trim().split(" ")[0];
                    finalValue[name] = baseURL + "/" + name + "_" + fileNameWithoutExtension + ".jpg";
                });
            }
        }
    }
    else if (property) {
        // and this is the case for other special properties but in this case
        // the url doesn't really change as it's either a blob or a svg file
        const dimensions = property.getSpecialProperty("dimensions");
        if (dimensions) {
            dimensions.split(";").forEach((dimension) => {
                const name = dimension.trim().split(" ")[0];
                finalValue[name] = fileData && fileData.url;
            });
        }
    }
    // now we are done
    return finalValue;
}
exports.imageSizeRetriever = imageSizeRetriever;
/**
 * Allows to load images that are remote, but yet uses the service worker logic in order to cache these
 * images and keep them up to date
 * @param url the url to request where the image is and to cache from
 * @param recheck whether to constantly recheck this image for updates, mainly useless, unless loading
 * from other sources
 * @returns a query string url with the service worker query string parameters
 */
function cacheableQSLoader(url, recheck) {
    // no url no return
    if (!url) {
        return null;
    }
    // if we have a blob this is useless as well
    if (url.indexOf("blob:") === 0) {
        return url;
    }
    // now we can rebuild the url
    const newURL = new URL(url);
    newURL.searchParams.append("sw-cacheable", "true");
    if (recheck) {
        newURL.searchParams.append("sw-recheck", "true");
    }
    // and return it as a string
    return newURL.toString();
}
exports.cacheableQSLoader = cacheableQSLoader;
