import { IGQLFile } from "../../../gql-querier";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import Include from "../../../base/Root/Module/ItemDefinition/Include";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";

export function fileArrayURLAbsoluter(
  files: IGQLFile[],
  itemDefinition: ItemDefinition,
  id: number,
  version: string,
  containerId: string,
  include: Include,
  property: PropertyDefinition,
) {
  if (files === null) {
    return null;
  }
  return files.map((file) => fileURLAbsoluter(file, itemDefinition, id, version, containerId, include, property));
}

export function fileURLAbsoluter(
  file: IGQLFile,
  itemDefinition: ItemDefinition,
  id: number,
  version: string,
  containerId: string,
  include: Include,
  property: PropertyDefinition,
) {
  if (file === null) {
    return null;
  }

  if (file.url.indexOf("blob:") === 0) {
    return file;
  }

  let prefix: string = (window as any).CONTAINER_HOSTNAME_PREFIXES[containerId];
  if (prefix.indexOf("/") !== 0) {
    prefix = location.protocol + "//" + prefix;
  }
  return {
    ...file,
    url:
      prefix +
      itemDefinition.getQualifiedPathName() + "/" +
      id + "." + (version || "") + "/" +
      (include ? include.getId() + "/" : "") +
      property.getId() + "/" +
      file.id + "/" + file.url,
  }
}

export function imageSrcSetRetriever(fileData: IGQLFile, property: PropertyDefinition, imageSizes?: IImageSizes) {
  if (
    fileData &&
    fileData.url.indexOf("blob:") !== 0 &&
    fileData.type.indexOf("image/svg") !== 0
  ) {
    const sizes = imageSizes || imageSizeRetriever(fileData, property);
    let theLargest = 0;
    let srcset: string[] = [];

    const dimensions = property.getSpecialProperty("dimensions") as string;
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

    const smallDimension = property.getSpecialProperty("smallDimension") as string;
    const smallDimensionW = parseInt(smallDimension.trim().split("x")[0]);
    if (!isNaN(smallDimensionW)) {
      srcset.push(sizes.imageSmallSizeURL + " " + smallDimensionW + "w");
      if (smallDimensionW > theLargest) {
        theLargest = smallDimensionW;
      }
    }

    const mediumDimension = property.getSpecialProperty("mediumDimension") as string;
    const mediumDimensionW = parseInt(mediumDimension.trim().split("x")[0]);
    if (!isNaN(mediumDimensionW)) {
      srcset.push(sizes.imageMediumSizeURL + " " + mediumDimensionW + "w");
      if (mediumDimensionW > theLargest) {
        theLargest = mediumDimensionW;
      }
    }

    const largeDimension = property.getSpecialProperty("largeDimension") as string;
    const largeDimensionW = parseInt(largeDimension.trim().split("x")[0]);
    if (!isNaN(largeDimensionW)) {
      srcset.push(sizes.imageLargeSizeURL + " " + largeDimensionW + "w");
      if (largeDimensionW > theLargest) {
        theLargest = largeDimensionW;
      }
    }

    srcset.push(sizes.imageStandardSizeURL + " " + (theLargest + 100) + "w")

    return srcset.join(", ");
  } else {
    return "";
  }
}

export interface IImageSizes {
  imageMediumSizeURL: string;
  imageSmallSizeURL: string;
  imageLargeSizeURL: string;
  imageStandardSizeURL: string;
  [others: string]: string;
};

/**
 * Gets all the available image sizes for a given file
 * @param fileData the file data
 * @param property if not passed only returns the default image sizes, medium, small, large and the standard one
 * custom sizes can be used and it needs access to the property in order to know these urls
 */
export function imageSizeRetriever(fileData: IGQLFile, property?: PropertyDefinition): IImageSizes  {
  const finalValue = {
    imageMediumSizeURL: fileData && fileData.url,
    imageSmallSizeURL: fileData && fileData.url,
    imageLargeSizeURL: fileData && fileData.url,
    imageStandardSizeURL: fileData && fileData.url,
  }

  if (
    fileData &&
    fileData.url.indexOf("blob:") !== 0 &&
    fileData.type.indexOf("svg") !== 0
  ) {
    const splittedURL = fileData.url.split("/");
    const fileName = splittedURL.pop();
    const baseURL = splittedURL.join("/");
    const fileNameDotSplitted = fileName.split(".");
    fileNameDotSplitted.pop();
    const recoveredFileName = fileNameDotSplitted.join(".");
    const fileNameWithoutExtension =
      recoveredFileName === "" ?
        fileName :
        recoveredFileName;
    finalValue.imageMediumSizeURL = baseURL + "/medium_" + fileNameWithoutExtension + ".jpg";
    finalValue.imageSmallSizeURL = baseURL + "/small_" + fileNameWithoutExtension + ".jpg";
    finalValue.imageLargeSizeURL = baseURL + "/large_" + fileNameWithoutExtension + ".jpg";

    if (property) {
      const dimensions = property.getSpecialProperty("dimensions") as string;
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
