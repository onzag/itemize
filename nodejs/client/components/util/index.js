"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fileArrayURLAbsoluter(containerHostnamePrefixes, files, itemDefinition, id, version, containerId, include, property) {
    if (files === null) {
        return null;
    }
    return files.map((file) => fileURLAbsoluter(containerHostnamePrefixes, file, itemDefinition, id, version, containerId, include, property));
}
exports.fileArrayURLAbsoluter = fileArrayURLAbsoluter;
function fileURLAbsoluter(containerHostnamePrefixes, file, itemDefinition, id, version, containerId, include, property) {
    if (file === null) {
        return null;
    }
    if (file.url.indexOf("blob:") === 0) {
        return file;
    }
    if (!containerId) {
        return null;
    }
    let prefix = containerHostnamePrefixes[containerId];
    if (prefix.indexOf("/") !== 0) {
        prefix = location.protocol + "//" + prefix;
    }
    return {
        ...file,
        url: prefix +
            itemDefinition.getQualifiedPathName() + "/" +
            id + "." + (version || "") + "/" +
            (include ? include.getId() + "/" : "") +
            property.getId() + "/" +
            file.id + "/" + file.url,
    };
}
exports.fileURLAbsoluter = fileURLAbsoluter;
function imageSrcSetRetriever(fileData, property, imageSizes) {
    if (fileData &&
        fileData.url.indexOf("blob:") !== 0 &&
        fileData.type.indexOf("image/svg") !== 0) {
        const sizes = imageSizes || imageSizeRetriever(fileData, property);
        let theLargest = 0;
        let srcset = [];
        const dimensions = property.getSpecialProperty("dimensions");
        if (dimensions) {
            dimensions.split(";").forEach((dimension) => {
                const dimensionTrimmedSplitted = dimension.trim().split(" ");
                const name = dimensionTrimmedSplitted[0];
                const widthXHeight = dimensionTrimmedSplitted[1];
                const width = parseInt(widthXHeight.split("x")[0]);
                if (!isNaN(width)) {
                    srcset.push(sizes[name] + " " + width + "w");
                    if (width > theLargest) {
                        theLargest = width;
                    }
                }
            });
        }
        const smallDimension = property.getSpecialProperty("smallDimension");
        const smallDimensionW = parseInt(smallDimension.trim().split("x")[0]);
        if (!isNaN(smallDimensionW)) {
            srcset.push(sizes.imageSmallSizeURL + " " + smallDimensionW + "w");
            if (smallDimensionW > theLargest) {
                theLargest = smallDimensionW;
            }
        }
        const mediumDimension = property.getSpecialProperty("mediumDimension");
        const mediumDimensionW = parseInt(mediumDimension.trim().split("x")[0]);
        if (!isNaN(mediumDimensionW)) {
            srcset.push(sizes.imageMediumSizeURL + " " + mediumDimensionW + "w");
            if (mediumDimensionW > theLargest) {
                theLargest = mediumDimensionW;
            }
        }
        const largeDimension = property.getSpecialProperty("largeDimension");
        const largeDimensionW = parseInt(largeDimension.trim().split("x")[0]);
        if (!isNaN(largeDimensionW)) {
            srcset.push(sizes.imageLargeSizeURL + " " + largeDimensionW + "w");
            if (largeDimensionW > theLargest) {
                theLargest = largeDimensionW;
            }
        }
        srcset.push(sizes.imageStandardSizeURL + " " + (theLargest + 100) + "w");
        return srcset.join(", ");
    }
    else {
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
    const finalValue = {
        imageMediumSizeURL: fileData && fileData.url,
        imageSmallSizeURL: fileData && fileData.url,
        imageLargeSizeURL: fileData && fileData.url,
        imageStandardSizeURL: fileData && fileData.url,
    };
    if (fileData &&
        fileData.url.indexOf("blob:") !== 0 &&
        fileData.type.indexOf("image/svg") !== 0) {
        const splittedURL = fileData.url.split("/");
        const fileName = splittedURL.pop();
        const baseURL = splittedURL.join("/");
        const fileNameDotSplitted = fileName.split(".");
        fileNameDotSplitted.pop();
        const recoveredFileName = fileNameDotSplitted.join(".");
        const fileNameWithoutExtension = recoveredFileName === "" ?
            fileName :
            recoveredFileName;
        finalValue.imageMediumSizeURL = baseURL + "/medium_" + fileNameWithoutExtension + ".jpg";
        finalValue.imageSmallSizeURL = baseURL + "/small_" + fileNameWithoutExtension + ".jpg";
        finalValue.imageLargeSizeURL = baseURL + "/large_" + fileNameWithoutExtension + ".jpg";
        if (property) {
            const dimensions = property.getSpecialProperty("dimensions");
            if (dimensions) {
                dimensions.split(";").forEach((dimension) => {
                    const name = dimension.trim().split(" ")[0];
                    finalValue[name] = baseURL + "/" + name + "_" + fileNameWithoutExtension + ".jpg";
                });
            }
        }
    }
    return finalValue;
}
exports.imageSizeRetriever = imageSizeRetriever;
function cacheableQSLoader(url, recheck) {
    if (!url) {
        return null;
    }
    if (url.indexOf("blob:") === 0) {
        return url;
    }
    const newURL = new URL(url);
    newURL.searchParams.append("sw-cacheable", "true");
    if (recheck) {
        newURL.searchParams.append("sw-recheck", "true");
    }
    return newURL.toString();
}
exports.cacheableQSLoader = cacheableQSLoader;
