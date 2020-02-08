import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import rc from "./rc";

export default async function babelSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("BABEL SETUP"));

  let exists = true;
  try {
    await fsAsync.access(".babelrc", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  if (!exists) {
    console.log("emiting " + colors.green(".babelrc"));
    await fsAsync.writeFile(".babelrc", JSON.stringify(rc));
  }
  return arg;
}
