/**
 * Allows to setup the docker container that will at the end contain
 * the app once it's containerized
 */

import { ISetupConfigType } from "..";
import colors from "colors";
import path from "path";
import fs from "fs";
const fsAsync = fs.promises;
import { confirm } from "../read";

/**
 * All the files that we are going to confirm
 * as equals to what is stored
 */
const filesToConfirm = [
  "nginx.conf",
  "nginx-ssl.conf",
  "waf.json",
  "start.sh",
  "stop.sh",
  "start-ssl.sh",
  "run.sh",
  "restart.sh",
];

const filesToConfirmInServices = [
  "clustermgr.service",
  "extended.service",
  "globalmgr.service",
];


/**
 * To setup docker step and its files, it takes the setup config type
 * @param arg the setup config that contains all the config
 * @returns the same arg
 */
export default async function dockerSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("DEPLOYMENT CHECK"));

  for (const fileToConfim of filesToConfirm) {
    let suchExists = true;
    let suchContent: string = null;
    try {
      suchContent = await fsAsync.readFile(fileToConfim, "utf-8");
    } catch (e) {
      suchExists = false;
    }

    const newContent = await fsAsync.readFile(
      path.join(__dirname, "..", "..", "..", "setup", "deployment", fileToConfim),
      "utf-8",
    );

    if (!suchExists) {
      console.log("emiting " + colors.green(fileToConfim));
      await fsAsync.writeFile(fileToConfim, newContent);
    } else if (suchContent !== newContent) {
      if (await confirm(fileToConfim + " is non-standard, would you like to emit the default?")) {
        console.log("emiting " + colors.green(fileToConfim));
        await fsAsync.writeFile(fileToConfim, newContent);
        const parsed = path.parse(fileToConfim);
        const oldName = parsed.name + ".old" + parsed.ext;
        await fsAsync.writeFile(oldName, suchContent);
      }
    }
  }

  try {
    await fsAsync.access("systemd", fs.constants.F_OK);
  } catch {
    await fsAsync.mkdir("systemd");
  }

  for (const fileToConfimRaw of filesToConfirmInServices) {
    const fileToConfim = path.join("systemd", fileToConfimRaw);
    let suchExists = true;
    let suchContent: string = null;
    try {
      suchContent = await fsAsync.readFile(fileToConfim, "utf-8");
    } catch (e) {
      suchExists = false;
    }

    const newContent = await fsAsync.readFile(
      path.join(__dirname, "..", "..", "..", "setup", "deployment", fileToConfim),
      "utf-8",
    );

    if (!suchExists) {
      console.log("emiting " + colors.green(fileToConfim));
      await fsAsync.writeFile(fileToConfim, newContent);
    } else if (suchContent !== newContent) {
      if (await confirm(fileToConfim + " is non-standard, would you like to emit the default?")) {
        console.log("emiting " + colors.green(fileToConfim));
        await fsAsync.writeFile(fileToConfim, newContent);
        const parsed = path.parse(fileToConfim);
        const oldName = parsed.name + ".old" + parsed.ext;
        await fsAsync.writeFile(oldName, suchContent);
      }
    }
  }

  // returns the same config as it does nothing to it
  return arg;
}
