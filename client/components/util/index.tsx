import { IGQLFile } from "../../../gql-querier";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import Include from "../../../base/Root/Module/ItemDefinition/Include";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";

export function fileArrayURLAbsoluter(
  files: IGQLFile[],
  itemDefinition: ItemDefinition,
  id: number,
  version: string,
  include: Include,
  property: PropertyDefinition,
) {
  if (files === null) {
    return null;
  }
  return files.map((file) => fileURLAbsoluter(file, itemDefinition, id, version, include, property));
}

export function fileURLAbsoluter(
  file: IGQLFile,
  itemDefinition: ItemDefinition,
  id: number,
  version: string,
  include: Include,
  property: PropertyDefinition,
) {
  if (file === null) {
    return null;
  }

  if (file.url.indexOf("blob:") === 0) {
    return file;
  }

  let prefix: string = (window as any).UPLOADS_PREFIX;
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

export function imageSizeRetriever(fileData: IGQLFile) {
  let imageMediumSizeURL = fileData && fileData.url;
  let imageSmallSizeURL = fileData && fileData.url;
  let imageLargeSizeURL = fileData && fileData.url;
  let imageStandardSizeURL = fileData && fileData.url;
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
    imageMediumSizeURL = baseURL + "/medium_" + fileNameWithoutExtension + ".jpg";
    imageSmallSizeURL = baseURL + "/small_" + fileNameWithoutExtension + ".jpg";
    imageLargeSizeURL = baseURL + "/large_" + fileNameWithoutExtension + ".jpg";
  }

  return {
    imageMediumSizeURL,
    imageSmallSizeURL,
    imageLargeSizeURL,
    imageStandardSizeURL,
  }
}
