/**
 * Allows to setup the docker container that will at the end contain
 * the app once it's containerized
 */

import { ISetupConfigType } from "..";
import colors from "colors";
import { execAsync } from "../exec";
import path from "path";
import fs from "fs";
const fsAsync = fs.promises;
import { confirm } from "../read";

/**
 * All the files that we are going to confirm
 * as equals to what is stored
 */
const filesToConfirm = [
  ".dockerignore",
  ".npmrc-docker",
  "docker-compose.yml",
  "nginx.conf",
  "nginx-ssl.conf",
  "run.sh",
  "start.sh",
  "start-ssl.sh",
];

/**
 * To setup docker step and its files, it takes the setup config type
 * @param arg the setup config that contains all the config
 * @returns the same arg
 */
export default async function dockerSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("DOCKER CHECK"));

  // check we have docker
  try {
    await execAsync("docker --version");
  } catch (err) {
    throw new Error("Docker not found, please visit https://docs.docker.com/install/ for instructions")
  }

  // check we have a dockerfile
  let dockerFileExists = true;
  let dockerFileContent: string = null;
  try {
    dockerFileContent = await fsAsync.readFile("Dockerfile", "utf-8");
  } catch (e) {
    dockerFileExists = false;
  }

  let newDockerFile = await fsAsync.readFile(
    path.join(__dirname, "..", "..", "..", "setup", "docker", "Dockerfile"), "utf-8",
  );
  newDockerFile = newDockerFile
    .replace("SETUP_APP_NAME", arg.standardConfig.appName.replace(/\s/g, "_").toLowerCase());

  // and if not we create one
  if (!dockerFileExists) {
    console.log("emiting " + colors.green("Dockerfile"));
    await fsAsync.writeFile("Dockerfile", newDockerFile);
  } else if (newDockerFile !== dockerFileContent) {
    if (await confirm("Dockerfile is non-standard, would you like to emit the default?")) {
      console.log("emiting " + colors.green("Dockerfile"));
      await fsAsync.writeFile("Dockerfile", newDockerFile);
      await fsAsync.writeFile("Dockerfile.old", dockerFileContent);
    }
  }

  for (const fileToConfim of filesToConfirm) {
    // check .dockerignore exists
    let suchExists = true;
    let suchContent: string = null;
    try {
      suchContent = await fsAsync.readFile(fileToConfim, "utf-8");
    } catch (e) {
      suchExists = false;
    }

    const newContent = await fsAsync.readFile(
      path.join(__dirname, "..", "..", "..", "setup", "docker", fileToConfim),
      "utf-8",
    );

    if (!suchExists) {
      console.log("emiting " + colors.green(fileToConfim));
      await fsAsync.writeFile(fileToConfim, newContent);
    } else if (suchContent !== newContent) {
      if (await confirm(filesToConfirm + " is non-standard, would you like to emit the default?")) {
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
