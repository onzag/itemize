import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import ignores from "./ignores";

export default async function githubSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("GITHUB SETUP"));

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
  return arg;
}
