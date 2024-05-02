/**
 * Contains the builder that builds the database based on the schema
 * that is generated during the compiltation process
 *
 * @module
 */

import fs from "fs";
import path from "path";
import colors from "colors/safe";
import { IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType } from "../config";
import YAML from 'yaml';
import { request } from "../setup/read";
import { execSudo, execAsync } from "../setup/exec";
import Waf from "./waf";

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
export default async function build(version: string, buildID: string, userat: string, services: string) {
  // this is the message we add to our build folder
  let message: string = "";

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
  // and we make all these directories
  await fsAsync.mkdir(path.join("deployments", buildID));

  // Retrieve the config for the database
  const dbConfigToUse = version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`;
  const sensitiveConfigToUse = version === "development" ? "index.sensitive.json" : `index.${version}.sensitive.json`;
  const redisConfigToUse = version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`;

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
  } else {
    actualServices = services.split(",");
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

  console.log("emiting " + colors.green(path.join("deployments", buildID, "stop.sh")));
  await fsAsync.copyFile("stop.sh", path.join("deployments", buildID, "stop.sh"));

  console.log("emiting " + colors.green(path.join("deployments", buildID, "run.sh")));
  await fsAsync.copyFile("run.sh", path.join("deployments", buildID, "run.sh"));

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


  // as well as these
  if (actualServices.includes("extended") || actualServices.includes("clustermgr") || actualServices.includes("globalmgr")) {
    if (actualServices.includes("extended")) {
      message += "\n\nYou have included extended servers in your build remember these servers are scalable in order to scale them" +
        "\nuse the `bash start.sh NUMBER_OF_SCALE` function in order to execute the servers to start";
    }
    if (actualServices.includes("clustermgr")) {
      message += "\n\nYou have included the cluster manager in your build which is reasonable with any cluster build" +
        "\nremember to include these by running `docker load -i app.tar.gz`";
    }
    if (actualServices.includes("globalmgr")) {
      message += "\n\nYou have included the global manager in your build which is expected" +
        "\nif this is your initial single cluster build or this is your central cluster build";
    }
  }

  const userdata = userat.split("@");
  const username = userdata[0].trim();
  const servername = userdata[1].trim();

  // write the ssh user
  await fsAsync.writeFile(path.join("deployments", buildID, ".ssh-user"), username + "@" + servername);

  // copy required services
  for (let serviceToDealWith of actualServices) {
    const serviceName = serviceToDealWith.endsWith(".service") ? serviceToDealWith : (serviceToDealWith + ".service");
    const serviceFile = path.join("systemd", serviceName);
    const contentOfFile = await fsAsync.readFile(serviceFile, "utf-8");
    await fsAsync.writeFile(
      path.join("deployments", buildID, "systemd", serviceName),
      contentOfFile
        .replace("$INSTANCE_GROUP_ID", buildID)
        .replace("$NODE_ENV", version)
        .replace("$WORKDIR", "/home/" + username + "/" + buildID)
        .replace("$USER", username)
        .replace("$APPEXEC", "node -r /home/" + username + "/" + buildID +
          "/node_modules/@onzag/itemize/server-resolve.js ./dist/server/index.js /home/" +
          username + "/" + buildID + "/dist/server/")
    );
  }

  // and finally our readme
  const readmePath = path.join("deployments", buildID, "README");
  console.log("emiting " + colors.green(readmePath));
  await fsAsync.writeFile(readmePath, message);
}
