/**
 * This file contains the utility functions that take images as input and
 * transform it into all the different sizes that have been specified by the property
 * this is the case for files when a image type is detected
 *
 * @packageDocumentation
 */

// TODO move this logic to the Bucket/CDN server kinda thing
// it will require changing how we read the file from the server hard drive

import PropertyDefinition from ".";
import sharp from "sharp";
import fs from "fs";
import path from "path";
const fsAsync = fs.promises;

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
 * @param fileName the file name that is currently in use in the server side
 * @param filePath the file path that is currently in use in the server side with the file name
 * @param propDef the property definition
 */
export async function runImageConversions(
  fileName: string,
  filePath: string,
  propDef: PropertyDefinition,
): Promise<void> {
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
  let outputs: IImageConversionArguments[] = [
    smallAnalyzed,
    mediumAnalyzed,
    largeAnalyzed,
  ];

  // but we might have more dimensions that are expected other than that
  const allRemainingSizes = propDef.getSpecialProperty("dimensions") as string;
  if (allRemainingSizes) {
    outputs = outputs.concat(manyOptionsAnalysis(allRemainingSizes));
  }

  // so we read the file
  const fileBuffer = await fsAsync.readFile(
    filePath,
  );

  // and now we get the filename without a extension and the dirname
  const fileNameNoExtension = path.basename(fileName, path.extname(fileName));
  const dirName = path.dirname(filePath);

  // and we basically create the image for all of those
  await Promise.all(
    outputs.map((output) => {
      // note how we attach the output name before the filename without a extension and make it
      // a jpg extension because that's what we want, the original can be anything
      const ouputFileName = path.join(dirName, output.name + "_" + fileNameNoExtension + ".jpg");

      // this returns a void promise
      return sharp(fileBuffer).resize(output.width, output.height, {
        fit: output.fit,
      }).jpeg().toFile(ouputFileName);
    }),
  );
}
