import colors from "colors";
import { ISetupConfigType } from "..";
import fs from "fs";
const fsAsync = fs.promises;
import { execAsync } from "../exec";
import dependencies from "./dependencies";
import devDependencies from "./dev-dependencies";
import scripts from "./scripts";

export default async function packageSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("PACKAGE SETUP"));

  const packageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));
  const dependenciesToInstall: string[] = [];
  Object.keys(dependencies).forEach((dependency) => {
    console.log(packageJSON, packageJSON.dependencies, dependency);
    if (!packageJSON.dependencies || !packageJSON.dependencies[dependency]) {
      dependenciesToInstall.push(dependency + "@" + dependencies[dependency]);
    }
  });
  if (dependenciesToInstall.length) {
    console.log(colors.yellow("Installing npm dependencies please wait..."));
    await execAsync("npm install --save " + dependenciesToInstall.join(" "));
  }
  const devDependenciesToInstall: string[] = [];
  Object.keys(devDependencies).forEach((devDependency) => {
    if (!packageJSON.devDependencies || !packageJSON.devDependencies[devDependency]) {
      devDependenciesToInstall.push(devDependency + "@" + devDependencies[devDependency]);
    }
  });
  if (devDependenciesToInstall.length) {
    console.log(colors.yellow("Installing npm developing dependencies please wait...."));
    await execAsync("npm install --save-dev " + devDependenciesToInstall.join(" "));
  }
  const newPackageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));
  if (!newPackageJSON.scripts) {
    newPackageJSON.scripts = {};
  }
  const newScripts = {
    ...newPackageJSON.scripts,
    ...scripts,
  };

  if (Object.keys(newScripts).sort().join(",") !== Object.keys(newPackageJSON.scripts).sort().join(",")) {
    newPackageJSON.scripts = newScripts;
    console.log("emiting " + colors.green("package.json"));
    await fsAsync.writeFile("package.json", JSON.stringify(newPackageJSON, null, 2));
  }
  return arg;
}
