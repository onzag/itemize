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
    let fileContent = await fsAsync.readFile(
      path.join(__dirname, "..", "..", "..", "setup", "docker", "docker-compose.yml"), "utf-8",
    );
    fileContent = fileContent
      .replace(/SETUP_APP_NAME/g, arg.standardConfig.appName.replace(/\s/g, "_").toLowerCase())
      .replace("SETUP_REDIS_PORT", (arg.redisConfigProduction.cache.port || 6379).toString());
    await fsAsync.writeFile("docker-compose.yml", fileContent);
  }

  let dockerComposeFullExists = true;
  try {
    await fsAsync.access("docker-compose-full.yml", fs.constants.F_OK);
  } catch (e) {
    dockerComposeFullExists = false;
  }
  if (!dockerComposeFullExists) {
    console.log("emiting " + colors.green("docker-compose-full.yml"));
    let fileContent = await fsAsync.readFile(
      path.join(__dirname, "..", "..", "..", "setup", "docker", "docker-compose-full.yml"), "utf-8",
    );
    fileContent = fileContent
      .replace(/SETUP_APP_NAME/g, arg.standardConfig.appName.replace(/\s/g, "_").toLowerCase())
      .replace("SETUP_REDIS_PORT", (arg.redisConfigProduction.cache.port || 6379).toString())
      .replace("SETUP_DB_PORT", arg.dbConfigProduction.port.toString())
      .replace("SETUP_DB_USER", arg.dbConfigProduction.user)
      .replace("SETUP_DB_DB", arg.dbConfigProduction.database);
    await fsAsync.writeFile("docker-compose.yml", fileContent);
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
  
  return arg;
}
