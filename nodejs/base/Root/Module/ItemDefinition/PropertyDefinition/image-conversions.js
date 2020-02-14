"use strict";
/**
 * This file contains the utility functions that take images as input and
 * transform it into all the different sizes that have been specified by the property
 * this is the case for files when a image type is detected
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fsAsync = fs_1.default.promises;
/**
 * Analyses a single option as written in the shape
 * "name 200x300 cover" or "200x300 cover" or "name 200x300" or "200x300" or "200x" or "x200", etc...
 * @param value the string value that needs to be parsed
 * @param enforcedName the enforced name when a name is enforced, a name is not parsed and not expected
 * @returns the image conversion arguments
 */
function singleOptionAnalysis(value, enforcedName) {
    // if the value is null we return null
    if (value === null) {
        return null;
    }
    // now we split the whole thing in spaces
    const splitted = value.trim().split(" ");
    // we need the name
    let name;
    if (enforcedName) {
        name = enforcedName;
    }
    else {
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
    let fit = splitted.shift() || null;
    // if not fit has been specified or if it's invalid, make it be cover
    if (fit !== "cover" &&
        fit !== "contain" &&
        fit !== "fill") {
        fit = "cover";
    }
    // return those options
    return {
        name,
        width,
        height,
        // we need to cast thanks to typescript funkyness
        fit: fit,
    };
}
/**
 * Analyzes many ; separated options
 * @param value the value as many options of many conversions that are required
 */
function manyOptionsAnalysis(value) {
    return value.split(";").map((subvalue) => singleOptionAnalysis(subvalue)).filter((v) => !!v);
}
/**
 * Runs the image conversions and stores them in the specified location
 * @param fileName the file name that is currently in use in the server side
 * @param filePath the file path that is currently in use in the server side with the file name
 * @param propDef the property definition
 * @returns a void promise for when this is done
 */
async function runImageConversions(fileName, filePath, propDef) {
    // the properties in question are, smallDimension
    const smallAnalyzed = singleOptionAnalysis(propDef.getSpecialProperty("smallDimension"), "small") || {
        name: "small",
        width: null,
        height: 96,
        fit: "cover",
    };
    // mediumDimension
    const mediumAnalyzed = singleOptionAnalysis(propDef.getSpecialProperty("mediumDimension"), "medium") || {
        name: "medium",
        width: null,
        height: 128,
        fit: "cover",
    };
    // and largeDimension
    const largeAnalyzed = singleOptionAnalysis(propDef.getSpecialProperty("largeDimension"), "large") || {
        name: "large",
        width: null,
        height: 256,
        fit: "cover",
    };
    // so these are the ouputs we are expecting for
    let outputs = [
        smallAnalyzed,
        mediumAnalyzed,
        largeAnalyzed,
    ];
    // but we might have more dimensions that are expected other than that
    const allRemainingSizes = propDef.getSpecialProperty("dimensions");
    if (allRemainingSizes) {
        outputs = outputs.concat(manyOptionsAnalysis(allRemainingSizes));
    }
    // so we read the file
    const fileBuffer = await fsAsync.readFile(filePath);
    // and now we get the filename without a extension and the dirname
    const fileNameNoExtension = path_1.default.basename(fileName, path_1.default.extname(fileName));
    const dirName = path_1.default.dirname(filePath);
    // and we basically create the image for all of those
    await Promise.all(outputs.map((output) => {
        // note how we attach the output name before the filename without a extension and make it
        // a jpg extension because that's what we want, the original can be anything
        const ouputFileName = path_1.default.join(dirName, output.name + "_" + fileNameNoExtension + ".jpg");
        // this returns a void promise
        return sharp_1.default(fileBuffer).resize(output.width, output.height, {
            fit: output.fit,
        }).jpeg().toFile(ouputFileName);
    }));
}
exports.runImageConversions = runImageConversions;
