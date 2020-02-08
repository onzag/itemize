import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import config from "./config";

export default async function webpackSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("WEBPACK SETUP"));

  let exists = true;
  try {
    await fsAsync.access("webpack.config.js", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  if (!exists) {
    console.log("emiting " + colors.green("webpack.config.js"));
    await fsAsync.writeFile("webpack.config.js", config);
  }
  return arg;
}
