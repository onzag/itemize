"use strict";
/**
 * Builds the builnumber file
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBuildNumber = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const colors_1 = __importDefault(require("colors"));
const fsAsync = fs_1.default.promises;
/**
 * Creates the buildnumber file
 * @param rawConfig the configuration that is being used
 */
async function buildBuildNumber(rawConfig) {
    // emit the build number file
    const buildNumberFileName = path_1.default.join("dist", "buildnumber");
    console.log("emiting " + colors_1.default.green(buildNumberFileName));
    await fsAsync.writeFile(buildNumberFileName, rawConfig.buildnumber.toString());
}
exports.buildBuildNumber = buildBuildNumber;
