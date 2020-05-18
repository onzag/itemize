import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import ignores from "./ignores";
import npmrc from "./npmrc";

export default async function gitSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("GIT SETUP"));

  let exists = true;
  try {
    await fsAsync.access(".gitignore", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  if (!exists) {
    console.log("emiting " + colors.green(".gitignore"));
    await fsAsync.writeFile(".gitignore", ignores.join("\n"));
  }

  let npmrcexists = true;
  try {
    await fsAsync.access(".npmrcdocker", fs.constants.F_OK);
  } catch (e) {
    npmrcexists = false;
  }

  if (!npmrcexists) {
    console.log("emiting " + colors.green(".npmrcdocker"));
    await fsAsync.writeFile(".npmrcdocker", npmrc);
  }

  return arg;
}
