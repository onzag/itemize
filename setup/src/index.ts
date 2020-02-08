import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import { confirm, fieldRequest } from "../read";

export default async function srcSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("SOURCE SETUP"));

  let exists = true;
  try {
    await fsAsync.access("src", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  if (!exists) {
    console.log(colors.yellow("A source hasn't been determined"));
    const useSpaces = await confirm("Would you like to use spaces instead of tabs?");
    let spacesSize = null;
    if (useSpaces) {
      spacesSize = await fieldRequest(
        "integer",
        "How many spaces?",
        "spaces",
        null,
        2,
        false,
        (v) => !isNaN(v),
      );
    }

    // TODO emit sources
  }
  return arg;
}
