/**
 * This file contains the utility functions that take images as input and
 * transform it into all the different sizes that have been specified by the property
 * this is the case for files when a image type is detected
 *
 * @packageDocumentation
 */

import PropertyDefinition from "..";
import sharp from "sharp";
import { ReadStream } from "fs";
import path from "path";
import { sqlUploadPipeFile } from "./file-management";
import { StorageProvider } from "../../../../../../server/services";

/**
 * this is what we get as a result from
 * the arguments to convert an image
 * width and/or height can be null
 */
interface IImageConversionArguments {
  name: string;
  fit: "cover" | "contain" | "fill";
  width: number;
  height: number;
}

/**
 * Analyses a single option as written in the shape
 * "name 200x300 cover" or "200x300 cover" or "name 200x300" or "200x300" or "200x" or "x200", etc...
 * @param value the string value that needs to be parsed
 * @param enforcedName the enforced name when a name is enforced, a name is not parsed and not expected
 * @returns the image conversion arguments
 */
function singleOptionAnalysis(
  value: string,
  enforcedName?: string,
): IImageConversionArguments {

  // if the value is null we return null
  if (value === null) {
    return null;
  }

  // now we split the whole thing in spaces
  const splitted = value.trim().split(" ");

  // we need the name
  let name: string;
  if (enforcedName) {
    name = enforcedName;
  } else {
    // if there's no enforced name, it's the first attribute
    name = splitted.shift() || null;
  }

  // if we get no name, eg. empty string, whatever, we give null
  if (!name) {
    return null;
  }

  // now we need the 200x300 part
  const widthXheight = splitted.shift() || null;
  // we parse it
  const width = parseInt(widthXheight && widthXheight.split("x")[0], 10) || null;
  const height = parseInt(widthXheight && widthXheight.split("x")[1], 10) || null;

  // if none of them were specified aka something like x
  // return null
  if (!width && !height) {
    return null;
  }

  // now we get the fit, if any remaining
  let fit: string = splitted.shift() || null;
  // if not fit has been specified or if it's invalid, make it be cover
  if (
    fit !== "cover" &&
    fit !== "contain" &&
    fit !== "fill"
  ) {
    fit = "cover";
  }

  // return those options
  return {
    name,
    width,
    height,
    // we need to cast thanks to typescript funkyness
    fit: fit as any,
  };
}

/**
 * Analyzes many ; separated options
 * @param value the value as many options of many conversions that are required
 */
function manyOptionsAnalysis(value: string): IImageConversionArguments[] {
  return value.split(";").map((subvalue) => singleOptionAnalysis(subvalue)).filter((v) => !!v);
}

/**
 * Runs the image conversions and stores them in the specified location
 * @param imageStream the read stream that contains the image
 * @param filePath entire path, idef id and all where the file is to be stored
 * @param fileName the name of the file, curated as it is to be stored
 * @param fileMimeType the mime type that has been retreived of the stream
 * @param uploadsContainer the container where the image is tobe uploaded
 * @param uploadsPrefix the prefix of the container
 * @param propDef the property definition that this refers to
 * @returns a void promise for when this is done
 */
export async function runImageConversions(
  imageStream: ReadStream,
  filePath: string,
  fileName: string,
  fileMimeType: string,
  uploadsClient: StorageProvider<any>,
  domain: string,
  propDef: PropertyDefinition,
): Promise<void> {
  // first we get the original file path, by joining the file path
  // and the name
  const originalImageFilePath = path.join(filePath, fileName);

  // we use that for svg types, no need to convert
  if (fileMimeType === "image/svg+xml") {
    await sqlUploadPipeFile(
      uploadsClient,
      imageStream,
      domain,
      originalImageFilePath,
    );
    return;
  }

  // the properties in question are, smallDimension
  const smallAnalyzed: IImageConversionArguments = singleOptionAnalysis(
    propDef.getSpecialProperty("smallDimension") as string,
    "small",
  ) || {
    name: "small",
    width: null,
    height: 96,
    fit: "cover",
  };

  // mediumDimension
  const mediumAnalyzed: IImageConversionArguments = singleOptionAnalysis(
    propDef.getSpecialProperty("mediumDimension") as string,
    "medium",
  ) || {
    name: "medium",
    width: null,
    height: 128,
    fit: "cover",
  };

  // and largeDimension
  const largeAnalyzed: IImageConversionArguments = singleOptionAnalysis(
    propDef.getSpecialProperty("largeDimension") as string,
    "large",
  ) || {
    name: "large",
    width: null,
    height: 256,
    fit: "cover",
  };

  // so these are the ouputs we are expecting for
  let imageConversionOutputs: IImageConversionArguments[] = [
    smallAnalyzed,
    mediumAnalyzed,
    largeAnalyzed,
  ];

  // but we might have more dimensions that are expected other than that
  const allRemainingSizes = propDef.getSpecialProperty("dimensions") as string;
  if (allRemainingSizes) {
    imageConversionOutputs = imageConversionOutputs.concat(manyOptionsAnalysis(allRemainingSizes));
  }

  // and now we get the filename without a extension and the dirname
  const fileNameNoExtension = path.basename(fileName, path.extname(fileName));
  // this is the sharp pipeline that will stream the data directly from the network
  // this stream hasn't been piped before and has been on hold so far
  const conversionPipeline = sharp();
  const conversionPromises = imageConversionOutputs.map((conversionOutput) => {
    // note how we attach the output name before the filename without a extension and make it
    // a jpg extension because that's what we want, the original can be anything
    const outputFileName = path.join(filePath, conversionOutput.name + "_" + fileNameNoExtension + ".jpg");

    // we pass it through a cloned stream for the sharp, and pass the conversion options
    // note how a converted image is always a jpg image
    const outputPipeline = conversionPipeline.clone()
      .resize(conversionOutput.width, conversionOutput.height, {
        fit: conversionOutput.fit,
        withoutEnlargement: true,
      }).rotate().flatten({background: {r: 255, g: 255, b: 255, alpha: 1}}).jpeg();

    return sqlUploadPipeFile(
      uploadsClient,
      outputPipeline,
      domain,
      outputFileName,
    );
  }).concat([
    sqlUploadPipeFile(
      uploadsClient,
      conversionPipeline.clone(),
      domain,
      originalImageFilePath,
    ),
  ]);
  // now we pipe the image read stream to the conversion pipeline
  // that will run the conversions
  imageStream.pipe(conversionPipeline);

  // and we basically create the image for all of those
  await Promise.all(conversionPromises);
}
