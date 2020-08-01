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
  try {
    await fsAsync.access("Dockerfile", fs.constants.F_OK);
  } catch (e) {
    dockerFileExists = false;
  }
  // and if not we create one
  if (!dockerFileExists) {
    console.log("emiting " + colors.green("Dockerfile"));
    let fileContent = await fsAsync.readFile(
      path.join(__dirname, "..", "..", "..", "setup", "docker", "Dockerfile"), "utf-8",
    );
    fileContent = fileContent
      .replace("SETUP_APP_NAME", arg.standardConfig.appName.replace(/\s/g, "_").toLowerCase());
    await fsAsync.writeFile("Dockerfile", fileContent);
  }

  // check .dockerignore exists
  let dockerIgnoreExists = true;
  try {
    await fsAsync.access(".dockerignore", fs.constants.F_OK);
  } catch (e) {
    dockerIgnoreExists = false;
  }

  // and if not we create it with the content of our file
  if (!dockerIgnoreExists) {
    console.log("emiting " + colors.green(".dockerignore"));
    await fsAsync.copyFile(path.join(__dirname, "..", "..", "..", "setup", "docker", ".dockerignore"), ".dockerignore");
  }

  // check now for the dockercompose
  let dockerComposeExists = true;
  try {
    await fsAsync.access("docker-compose.yml", fs.constants.F_OK);
  } catch (e) {
    dockerComposeExists = false;
  }

  // same thing we copy it
  if (!dockerComposeExists) {
    console.log("emiting " + colors.green("docker-compose.yml"));
    await fsAsync.copyFile(path.join(__dirname, "..", "..", "..", "setup", "docker", "docker-compose.yml"), "docker-compose.yml");
  }

  // now for the nginx file used in nginx inside docker
  let nginxExists = true;
  try {
    await fsAsync.access("nginx.conf", fs.constants.F_OK);
  } catch (e) {
    nginxExists = false;
  }

  // we copy as well
  if (!nginxExists) {
    console.log("emiting " + colors.green("nginx.conf"));
    await fsAsync.copyFile(path.join(__dirname, "..", "..", "..", "setup", "docker", "nginx.conf"), "nginx.conf");
  }

  // and the start script that initializes docker
  let startExists = true;
  try {
    await fsAsync.access("start.sh", fs.constants.F_OK);
  } catch (e) {
    startExists = false;
  }

  // create as well
  if (!startExists) {
    console.log("emiting " + colors.green("start.sh"));
    await fsAsync.copyFile(path.join(__dirname, "..", "..", "..", "setup", "docker", "start.sh"), "start.sh");
  }

  // the npm rc is required in order to be able to validate the npm request using the npm token
  let npmRcExists = true;
  try {
    await fsAsync.access(".npmrc-docker", fs.constants.F_OK);
  } catch (e) {
    npmRcExists = false;
  }
  // and we copy it there
  if (!npmRcExists) {
    console.log("emiting " + colors.green(".npmrc-docker"));
    await fsAsync.copyFile(path.join(__dirname, "..", "..", "..", "setup", "docker", ".npmrc-docker"), ".npmrc-docker");
  }
  
  // returns the same config as it does nothing to it
  return arg;
}
