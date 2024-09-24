/**
 * Contains the builder that builds the database based on the schema
 * that is generated during the compiltation process
 *
 * @module
 */

import fs from "fs";
import path from "path";
import colors from "colors/safe";
import Waf from "./waf";
import buildData from "../builder";
import { execSync } from "child_process";
import { ISensitiveConfigRawJSONDataType, IConfigRawJSONDataType } from "../config";
import { readConfigFile } from "../setup";

const fsAsync = fs.promises;

async function copyDir(src: string, dest: string) {
  await fsAsync.mkdir(dest);
  const files = await fsAsync.readdir(src);
  for (let file of files) {
    const current = await fsAsync.stat(path.join(src, file));
    if (current.isDirectory()) {
      await copyDir(path.join(src, file), path.join(dest, file));
    } else {
      await fsAsync.copyFile(path.join(src, file), path.join(dest, file));
    }
  }
};

/**
 * Runs the build process, check the main.ts file to see how this is done
 * 
 * @param version the version, development or production
 * @param buildID the build id, usually the same as the instance group
 * @param services the services that we are allowing, comma separated; or full, standard, and slim
 */
export default async function build(version: string) {
  if (version !== "development" && version !== "production") {
    throw new Error("Unknown deployment version: " + version + " should be development or production");
  }

  // now let's check our deployments folder
  let deploymentsExist = true;
  try {
    await fsAsync.access("deployments", fs.constants.F_OK);
  } catch (e) {
    deploymentsExist = false;
  }

  // if it doesn't exist we make it
  if (!deploymentsExist) {
    await fsAsync.mkdir("deployments");
  }

  const standardConfig: IConfigRawJSONDataType = await readConfigFile("index.json");
  const sensitiveConfig: ISensitiveConfigRawJSONDataType = await readConfigFile(version === "development" ?
    "index.sensitive.json" : "index.production.sensitive.json");

  console.log("calling " + colors.green("build-data"));
  await buildData();

  console.log("calling " + colors.green("esbuild"));
  execSync("NODE_ENV=" + version + " node esbuild.js");

  console.log("calling " + colors.green("tsc"));
  execSync("npm run install");

  for (const clusterId of standardConfig.allClusters) {
    const sensitiveConfigInfo = sensitiveConfig.clusters[clusterId];
    await buildFor(
      version,
      clusterId,
      sensitiveConfigInfo.services,
      sensitiveConfigInfo.hostname,
      sensitiveConfigInfo.sshuser,
      sensitiveConfigInfo.sshport || 22,
    );
  }
}

async function buildFor(
  version: string,
  buildID: string,
  services: string | Array<string>,
  hostname: string,
  sshuser: string,
  sshport: number,
) {

  // and we make all these directories
  await fsAsync.mkdir(path.join("deployments", buildID));

  // Retrieve the config for the database
  const dbConfigToUse = version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`;
  const sensitiveConfigToUse = version === "development" ? "index.sensitive.json" : `index.${version}.sensitive.json`;
  const redisConfigToUse = version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`;

  // this is the message we add to our build folder
  let message: string = "";

  // now the actual services we are adding
  let actualServices: string[] = [];
  if (services === "full" || !services) {
    actualServices = [];

    const filesIn = await fsAsync.readdir("systemd");
    filesIn.forEach((f) => {
      if (!f.endsWith(".old.service")) {
        actualServices.push(f);
      }
    });
  } else if (services === "cluster") {
    actualServices = ["clustermgr", "extended"];
  } else if (services === "global") {
    actualServices = ["globalmgr"];
  } else if (Array.isArray(services)) {
    actualServices = services;
  } else {
    console.log(colors.red("Unknown services value: " + JSON.stringify(services)));
    process.exit(1);
  }

  actualServices = actualServices.map((s) => s.endsWith(".service") ? s.split(".service")[0] : s);

  if (actualServices.includes("clustermgr") || actualServices.includes("globalmgr") || actualServices.includes("extended")) {
    message += "This build has been initialized with the instance group id of " + buildID + "\n\n";
  }

  message += "This build contains the following services: " + actualServices.join(", ");

  // these only need to be added if we have a server of sorts
  if (
    actualServices.includes("extended") ||
    actualServices.includes("clustermgr") ||
    actualServices.includes("globalmgr")
  ) {
    // creating the config directory
    await fsAsync.mkdir(path.join("deployments", buildID, "config"));

    // the config file
    console.log("emiting " + colors.green(path.join("deployments", buildID, "config", "index.json")));
    await fsAsync.copyFile(path.join("config", "index.json"), path.join("deployments", buildID, "config", "index.json"));

    // the db config file
    console.log("emiting " + colors.green(path.join("deployments", buildID, "config", dbConfigToUse)));
    await fsAsync.copyFile(path.join("config", dbConfigToUse), path.join("deployments", buildID, "config", dbConfigToUse));

    // redis
    console.log("emiting " + colors.green(path.join("deployments", buildID, "config", redisConfigToUse)));
    await fsAsync.copyFile(path.join("config", redisConfigToUse), path.join("deployments", buildID, "config", redisConfigToUse));

    // sensitive configuration file
    console.log("emiting " + colors.green(path.join("deployments", buildID, "config", sensitiveConfigToUse)));
    await fsAsync.copyFile(path.join("config", sensitiveConfigToUse), path.join("deployments", buildID, "config", sensitiveConfigToUse));

    // dumps if they exist
    let dumpExists = true;
    try {
      await fsAsync.access("dump", fs.constants.F_OK);
    } catch (e) {
      dumpExists = false;
    }
    if (dumpExists) {
      console.log("emiting " + colors.green(path.join("deployments", buildID, "dump")));
      await copyDir("dump", path.join("deployments", buildID, "dump"));

      // sensitive dump file
      console.log("emiting " + colors.green(path.join("deployments", buildID, "config", "dump.json")));
      await fsAsync.copyFile(path.join("config", "dump.json"), path.join("deployments", buildID, "config", "dump.json"));
    }
  }

  // and the deployements start.sh file
  console.log("emiting " + colors.green(path.join("deployments", buildID, "start.sh")));
  await fsAsync.copyFile("start.sh", path.join("deployments", buildID, "start.sh"));

  console.log("emiting " + colors.green(path.join("deployments", buildID, "restart.sh")));
  await fsAsync.copyFile("restart.sh", path.join("deployments", buildID, "restart.sh"));

  console.log("emiting " + colors.green(path.join("deployments", buildID, "stop.sh")));
  await fsAsync.copyFile("stop.sh", path.join("deployments", buildID, "stop.sh"));

  console.log("emiting " + colors.green(path.join("deployments", buildID, "run.sh")));
  await fsAsync.copyFile("run.sh", path.join("deployments", buildID, "run.sh"));

  console.log("emiting " + colors.green(path.join("deployments", buildID, "package.json")));

  // due to jokescript npm being unable to disable install scripts this has to be done
  const packageJSONrepaired = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));
  if (packageJSONrepaired.scripts) {
    delete packageJSONrepaired.scripts.install;
  }
  await fsAsync.writeFile(path.join("deployments", buildID, "package.json"), JSON.stringify(packageJSONrepaired));

  console.log("emiting " + colors.green(path.join("deployments", buildID, "package-lock.json")));
  await fsAsync.copyFile("package-lock.json", path.join("deployments", buildID, "package-lock.json"));

  console.log("emiting " + colors.green(path.join("deployments", buildID, "tsconfig.json")));
  await fsAsync.copyFile("tsconfig.json", path.join("deployments", buildID, "tsconfig.json"));

  console.log("emiting " + colors.green(path.join("deployments", buildID, "itemize.config.js")));
  await fsAsync.copyFile("itemize.config.js", path.join("deployments", buildID, "itemize.config.js"));

  console.log("emiting " + colors.green(path.join("deployments", buildID, "dist")));
  await copyDir("dist", path.join("deployments", buildID, "dist"));

  // console.log("emiting " + colors.green(path.join("deployments", buildID, "src")));
  // await copyDir("src", path.join("deployments", buildID, "src"));

  // console.log("emiting " + colors.green(path.join("deployments", buildID, "types")));
  // await copyDir("types", path.join("deployments", buildID, "types"));

  // as well as these
  if (actualServices.includes("extended") || actualServices.includes("clustermgr") || actualServices.includes("globalmgr")) {
    if (actualServices.includes("extended")) {
      message += "\n\nYou have included extended servers in your build remember these servers are scalable in order to scale them" +
        "\nuse the `bash start.sh [NUMBER_OF_SCALE]` function in order to execute the servers to start";
    }
    if (actualServices.includes("clustermgr")) {
      message += "\n\nYou have included the cluster manager in your build which manages the extended cluster";
    }
    if (actualServices.includes("globalmgr")) {
      message += "\n\nYou have included the global manager in your build which manages the global clusters";
    }
  }

  message += "\n\nTo start the server you should always do `bash start.sh [NUMBER_OF_SCALE]` even if no scalable services have been added";
  message += "\n\nBefore starting the server you should run `bash install.sh`";
  message += "\n\nIn order to synchronize the server with the remote you should run `bash rsync.sh` or `bash rsync-only-dist.sh` in the client machine";

  // write the ssh user
  console.log("emiting " + colors.green(path.join("deployments", buildID, ".ssh-user")));
  await fsAsync.writeFile(path.join("deployments", buildID, ".ssh-user"), sshuser + "@" + hostname + (sshport !== 22 ? " -p " + sshport : ""));

  // RSYNC SCRIPT GENERATION
  const nodeCheck = "ssh " + sshuser + "@" + hostname + (sshport !== 22 ? (" -p " + sshport + " ") : " ") + "\"ps | grep node\"";
  const nodeBreakdown = "if [ $? -eq 0 ]; then echo \"node is running, this script cant deploy over a currently running environment\"; exit 1; else echo \"node is not running, deploying\"; fi";

  const rsyncCommandStart = "rsync -rvz" +
    (sshport !== 22 ? (" -e 'ssh -p " + sshport + "' ") : " ") +
    "--progress ";
  const rsyncCommandEnd = " " + sshuser + "@" + hostname + ":/home/" + sshuser;

  const nodeModulesDelete = "ssh " + sshuser + "@" + hostname + (sshport !== 22 ? (" -p " + sshport + " ") : " ") + "\"rm -r /home/" + sshuser + "/" + buildID + "/node_modules\"";

  const rsyncCommandPWD = "#!/bin/bash\n\n#this script will rsync the contents of this cluster into the target, all of it\n\n" +
    nodeCheck + ";\n" + nodeBreakdown + ";\n" + rsyncCommandStart + "$PWD" + rsyncCommandEnd + ";\n" + nodeModulesDelete + ";";

  console.log("emiting " + colors.green(path.join("deployments", buildID, "rsync.sh")));
  await fsAsync.writeFile(path.join("deployments", buildID, "rsync.sh"), rsyncCommandPWD);

  const rsyncCommandOnlyDist = "#!/bin/bash\n\n#this script will rsync updates of the app cluster into the target\n\n" +
    nodeCheck + "\n" + nodeBreakdown + "\n" + rsyncCommandStart + "$PWD/dist" + rsyncCommandEnd + "/" + buildID + ";\n" + nodeModulesDelete + ";";

  console.log("emiting " + colors.green(path.join("deployments", buildID, "rsync-only-dist.sh")));
  await fsAsync.writeFile(path.join("deployments", buildID, "rsync-only-dist.sh"), rsyncCommandOnlyDist);

  // install script to install the packages in the server side
  const installScriptBase = "if [ \"$EUID\" -eq 0 ]; then echo \"This script shouldn't be ran as root\"; exit 1; fi\n";
  console.log("emiting " + colors.green(path.join("deployments", buildID, "install.sh")));
  await fsAsync.writeFile(path.join("deployments", buildID, "install.sh"), installScriptBase + "npm install");

  if (actualServices.length) {
    await fsAsync.mkdir(path.join("deployments", buildID, "systemd"));
  }

  let needsNginx = false;

  // copy required services
  for (let serviceToDealWith of actualServices) {
    const serviceName = serviceToDealWith.endsWith(".service") ? serviceToDealWith : (serviceToDealWith + ".service");
    const serviceFile = path.join("systemd", serviceName);
    const contentOfFile = await fsAsync.readFile(serviceFile, "utf-8");

    if (contentOfFile.includes("PORT=")) {
      needsNginx = true;
    }

    await fsAsync.writeFile(
      path.join("deployments", buildID, "systemd", serviceName),
      contentOfFile
        .replace("$CLUSTER_ID", buildID)
        .replace("$NODE_ENV", version)
        .replace("$WORKDIR", "/home/" + sshuser + "/" + buildID)
        .replace("$USER", sshuser)
        .replace("$APPEXEC", "node -r /home/" + sshuser + "/" + buildID +
          "/node_modules/@onzag/itemize/server-resolve.js /home/" +
          sshuser + "/" + buildID + "/dist/server/index.js")
    );
  }

  if (needsNginx) {
    message += "\n\nNginx should be installed and running";

    console.log("emiting " + colors.green(path.join("deployments", buildID, "start-ssl.sh")));
    await fsAsync.copyFile("start-ssl.sh", path.join("deployments", buildID, "start-ssl.sh"));

    // finally our nginx file
    const config = JSON.parse(await fsAsync.readFile(path.join("config", "index.json"), "utf-8"));
    const nginxConf = await fsAsync.readFile("nginx.conf", "utf-8");
    const nginxConfSSL = await fsAsync.readFile("nginx-ssl.conf", "utf-8");
    const wafConfig = JSON.parse(await fsAsync.readFile("waf.json", "utf-8"));

    const waf = new Waf(wafConfig, config);
    const newNginxConf = waf.patchNginx(nginxConf);
    const newNginxConfSSL = waf.patchNginx(nginxConfSSL);

    console.log("emiting " + colors.green(path.join("deployments", buildID, "nginx.conf")));
    await fsAsync.writeFile(path.join("deployments", buildID, "nginx.conf"), newNginxConf);

    console.log("emiting " + colors.green(path.join("deployments", buildID, "nginx-ssl.conf")));
    await fsAsync.writeFile(path.join("deployments", buildID, "nginx-ssl.conf"), newNginxConfSSL);
  }

  // and finally our readme
  const readmePath = path.join("deployments", buildID, "README");
  console.log("emiting " + colors.green(readmePath));
  await fsAsync.writeFile(readmePath, message);
}
