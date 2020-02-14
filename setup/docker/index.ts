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
      .replace("SETUP_APP_NAME", arg.standardConfig.appName.replace(/\s/g, "_").toLowerCase())
      .replace("SETUP_PORT", arg.standardConfig.port.toString());
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
  
  return arg;
}
