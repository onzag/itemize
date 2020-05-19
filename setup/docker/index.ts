import { ISetupConfigType } from "..";
import colors from "colors";
import { execAsync } from "../exec";
import path from "path";
import fs from "fs";
const fsAsync = fs.promises;

export default async function dockerSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("DOCKER CHECK"));

  try {
    await execAsync("docker --version");
  } catch (err) {
    throw new Error("Docker not found, please visit https://docs.docker.com/install/ for instructions")
  }

  let dockerFileExists = true;
  try {
    await fsAsync.access("Dockerfile", fs.constants.F_OK);
  } catch (e) {
    dockerFileExists = false;
  }
  if (!dockerFileExists) {
    console.log("emiting " + colors.green("Dockerfile"));
    let fileContent = await fsAsync.readFile(
      path.join(__dirname, "..", "..", "..", "setup", "docker", "Dockerfile"), "utf-8",
    );
    fileContent = fileContent
      .replace("SETUP_APP_NAME", arg.standardConfig.appName.replace(/\s/g, "_").toLowerCase());
    await fsAsync.writeFile("Dockerfile", fileContent);
  }

  let dockerIgnoreExists = true;
  try {
    await fsAsync.access(".dockerignore", fs.constants.F_OK);
  } catch (e) {
    dockerIgnoreExists = false;
  }
  if (!dockerIgnoreExists) {
    console.log("emiting " + colors.green(".dockerignore"));
    await fsAsync.copyFile(path.join(__dirname, "..", "..", "..", "setup", "docker", ".dockerignore"), ".dockerignore");
  }

  let dockerComposeExists = true;
  try {
    await fsAsync.access("docker-compose.yml", fs.constants.F_OK);
  } catch (e) {
    dockerComposeExists = false;
  }
  if (!dockerComposeExists) {
    console.log("emiting " + colors.green("docker-compose.yml"));
    await fsAsync.copyFile(path.join(__dirname, "..", "..", "..", "setup", "docker", "docker-compose.yml"), "docker-compose.yml");
  }

  let nginxExists = true;
  try {
    await fsAsync.access("nginx.conf", fs.constants.F_OK);
  } catch (e) {
    nginxExists = false;
  }
  if (!nginxExists) {
    console.log("emiting " + colors.green("nginx.conf"));
    await fsAsync.copyFile(path.join(__dirname, "..", "..", "..", "setup", "docker", "nginx.conf"), "nginx.conf");
  }

  let startExists = true;
  try {
    await fsAsync.access("start.sh", fs.constants.F_OK);
  } catch (e) {
    startExists = false;
  }
  if (!startExists) {
    console.log("emiting " + colors.green("start.sh"));
    await fsAsync.copyFile(path.join(__dirname, "..", "..", "..", "setup", "docker", "start.sh"), "start.sh");
  }

  let npmRcExists = true;
  try {
    await fsAsync.access(".npmrc-docker", fs.constants.F_OK);
  } catch (e) {
    npmRcExists = false;
  }
  if (!npmRcExists) {
    console.log("emiting " + colors.green(".npmrc-docker"));
    await fsAsync.copyFile(path.join(__dirname, "..", "..", "..", "setup", "docker", ".npmrc-docker"), ".npmrc-docker");
  }
  
  return arg;
}
