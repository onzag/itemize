/**
 * Contains a setup step that modifies the package documentation
 * either by installing stuff or by adding scripts onto it
 */

import colors from "colors";
import { ISetupConfigType } from "..";
import fs from "fs";
const fsAsync = fs.promises;
import { execAsync } from "../exec";
import dependencies from "./dependencies";
import devDependencies from "./dev-dependencies";
import scripts from "./scripts";

/**
 * modifies the package documentation either by installing stuff or by adding scripts onto it
 * @param arg the setup arg
 */
export default async function packageSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("PACKAGE SETUP"));

  // first we read our package.json
  const packageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));

  // now we want to see these dependencies
  const dependenciesToInstall: string[] = [];
  // and if we don't find it, then we need to install these
  Object.keys(dependencies).forEach((dependency) => {
    if (!packageJSON.dependencies || !packageJSON.dependencies[dependency] || packageJSON.dependencies[dependency] !== dependencies[dependency]) {
      dependenciesToInstall.push(dependency + "@" + dependencies[dependency]);
    }
  });

  // if we have some
  if (dependenciesToInstall.length) {
    console.log(colors.yellow("Installing npm dependencies please wait..."));
    // we run the exec command with npm install save
    await execAsync("npm install --save " + dependenciesToInstall.join(" "));
  }

  // now we do the same with dev dependencies
  const devDependenciesToInstall: string[] = [];
  Object.keys(devDependencies).forEach((devDependency) => {
    if (!packageJSON.devDependencies || !packageJSON.devDependencies[devDependency] || packageJSON.devDependencies[devDependency] !== devDependencies[devDependency]) {
      devDependenciesToInstall.push(devDependency + "@" + devDependencies[devDependency]);
    }
  });

  // and if we have some of those too
  if (devDependenciesToInstall.length) {
    console.log(colors.yellow("Installing npm developing dependencies please wait...."));
    // same running exec
    await execAsync("npm install --save-dev " + devDependenciesToInstall.join(" "));
  }

  // we still need to modify this package json, we re-read as certainly
  // either dependencies or dev dependencies installation process
  // might have changed them
  const newPackageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));
  // and we need to install these scripts, first we ensure the scripts
  // structure exists
  if (!newPackageJSON.scripts) {
    newPackageJSON.scripts = {};
  }
  // and then add our scripts onto it
  const newScripts = {
    ...newPackageJSON.scripts,
    ...scripts,
  };

  // if something differs about these scripts
  if (Object.keys(newScripts).sort().join(",") !== Object.keys(newPackageJSON.scripts).sort().join(",")) {
    // we change and rewrite the file
    newPackageJSON.scripts = newScripts;
    console.log("emiting " + colors.green("package.json"));
    await fsAsync.writeFile("package.json", JSON.stringify(newPackageJSON, null, 2));
  }

  // return the same arg
  return arg;
}
