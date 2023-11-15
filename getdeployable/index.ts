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
export default async function build(version: string, buildID: string, services: string) {
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
  const dbConfig: IDBConfigRawJSONDataType = version === "patch" ? null : JSON.parse(await fsAsync.readFile(
    path.join("config", dbConfigToUse),
    "utf8",
  ));
  const redisConfigToUse = version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`;
  const redisConfig: IRedisConfigRawJSONDataType = version === "patch" ? null : JSON.parse(await fsAsync.readFile(
    path.join("config", redisConfigToUse),
    "utf8",
  ));

  // and now we take our yml docker compose file
  let fullYMLTemplate = version === "patch" ? null : await fsAsync.readFile(
    "docker-compose.yml",
    "utf-8",
  );

  // and we need to replace these variables from it
  fullYMLTemplate = fullYMLTemplate &&
    fullYMLTemplate.replace(/\%\{NODE_ENV\}/g, version)
      .replace(/\%\{REDIS_PORT\}/g, redisConfig.cache.port.toString())
      .replace(/\%\{DB_PORT\}/g, dbConfig.port.toString())
      .replace(/\%\{DB_USER\}/g, dbConfig.user)
      .replace(/\%\{DB_PASSWORD\}/g, dbConfig.password)
      .replace(/\%\{DB_NAME\}/g, dbConfig.database);

  if (fullYMLTemplate) {
    if (dbConfig.elastic && dbConfig.elastic.auth && dbConfig.elastic.auth.password) {
      fullYMLTemplate =
        fullYMLTemplate.replace(/\%\{ELASTIC_PASSWORD\}/g, dbConfig.elastic.auth.password)
    } else {
      fullYMLTemplate =
        fullYMLTemplate.replace(/\%\{ELASTIC_PASSWORD\}/g, "UNSPECIFIED")
    }
  }

  // now the actual services we are adding
  let actualServices: string[] = [];
  let isPatch = false;
  if (version === "patch") {
    isPatch = true;
  } else if (services === "full" || !services) {
    actualServices = ["cluster-manager", "servers", "redis", "nginx", "global-manager", "pgsql", "elastic", "kibana"];
  } else if (services === "standard") {
    actualServices = ["cluster-manager", "servers", "redis", "nginx"];
  } else if (services === "slim") {
    actualServices = ["cluster-manager", "servers", "nginx"];
  } else {
    actualServices = services.split(",");
    process.exit(1);
  }

  if (isPatch) {
    message += "This build is a patch, patches can be unpredictable and are used to quickly wed out bugs and client side issues\n" +
      "the patch can only patch server specific code, client side behaviour, and itemize itself, but it cannot resolve for new libraries\n" +
      "patches should be not used very often, in order to patch, just replace the patch folder with this content and restart";
  }

  if (actualServices.includes("cluster-manager") || actualServices.includes("servers")) {
    const envPath = path.join("deployments", buildID, ".env");
    console.log("emiting " + colors.green(envPath));
    await fsAsync.writeFile(envPath, "INSTANCE_GROUP_ID=" + buildID);

    message += "This build has been initialized with the cluster id of " + buildID + " in order to clone this cluster and\n" +
      "execute such somewhere else, refer to the .env file which contains the identifier\n\n";
  }

  if (!isPatch) {
    // we include this information in our final message
    message += "This build contains the following services: " + actualServices.join(", ");
  }

  // if we are adding the proxy, add information about this, and add the nginx logs folder
  if (actualServices.includes("nginx")) {
    await fsAsync.mkdir(path.join("deployments", buildID, "nginx-logs"));

    message += "\n\nYou have included NGINX in your build remember that nginx will search for a key.pem and a cert.pem file on SSL mode" +
      "\nthese are necessary for HTTPS, check out let's encrypt and acme.sh for the purposes of having these certificates";
  }

  // now we can build the compose file
  let parsed: any;
  if (!isPatch) {
    // now we log this information
    console.log(colors.yellow("Services allowed are: ") + actualServices.join(", "));

    // now we parse our yaml as it has been replaced
    parsed = YAML.parse(fullYMLTemplate);
    // and we need to check every service we have added
    Object.keys(parsed.services).forEach((service) => {
      // if the service is not in the list of included services
      if (!actualServices.includes(service)) {
        // we remove it
        console.log(colors.yellow("Dropping unused service: ") + service);
        delete parsed.services[service];
        return;
      } else if (parsed.services[service].depends_on) {
        // also we nee to check our dependencies, we remove dependencies if they are not in there
        parsed.services[service].depends_on = parsed.services[service].depends_on.filter((serviceDependance: string) => {
          return actualServices.includes(serviceDependance);
        });

        // and if we have removed all the dependencies we remove the entire thing altogether
        if (parsed.services[service].depends_on.length === 0) {
          delete parsed.services[service].depends_on;
        }
      }

      if (service === "global-manager" || service === "cluster-manager" || service === "servers" && (
        actualServices.includes("elastic")
      )) {
        if (!parsed.services[service].environment) {
          parsed.services[service].environment = [];
        }
        parsed.services[service].environment.push("NODE_TLS_REJECT_UNAUTHORIZED=0");
      }
    });

    const yamlPath = path.join("deployments", buildID, "docker-compose.yml");
    console.log("emiting " + colors.green(yamlPath));
    await fsAsync.writeFile(yamlPath, YAML.stringify(parsed));
  }

  // these only need to be added if we have a server of sorts
  if (
    actualServices.includes("servers") ||
    actualServices.includes("cluster-manager") ||
    actualServices.includes("global-manager")
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
  if (!isPatch) {
    console.log("emiting " + colors.green(path.join("deployments", buildID, "start.sh")));
    await fsAsync.copyFile("start.sh", path.join("deployments", buildID, "start.sh"));

    console.log("emiting " + colors.green(path.join("deployments", buildID, "stop.sh")));
    await fsAsync.copyFile("stop.sh", path.join("deployments", buildID, "stop.sh"));

    console.log("emiting " + colors.green(path.join("deployments", buildID, "run.sh")));
    await fsAsync.copyFile("run.sh", path.join("deployments", buildID, "run.sh"));
  }

  // finally our nginx file
  if (actualServices.includes("nginx")) {
    // and the deployements start-ssl.sh file
    console.log("emiting " + colors.green(path.join("deployments", buildID, "start-ssl.sh")));
    await fsAsync.copyFile("start-ssl.sh", path.join("deployments", buildID, "start-ssl.sh"));

    console.log("emiting " + colors.green(path.join("deployments", buildID, "nginx.conf")));
    await fsAsync.copyFile("nginx.conf", path.join("deployments", buildID, "nginx.conf"));

    console.log("emiting " + colors.green(path.join("deployments", buildID, "nginx-ssl.conf")));
    await fsAsync.copyFile("nginx-ssl.conf", path.join("deployments", buildID, "nginx-ssl.conf"));
  }

  // now we add a bunch of messages about configuration
  if (actualServices.includes("redis")) {
    message += "\n\nYou have included redis in your build, the redis that is included uses your general cache configuration" +
      "\nbut this might differ to the global redis cache, the global redis cache is centralized" +
      "\nthe pub sub is also a centralized database";
  }

  // as well as these
  if (actualServices.includes("servers") || actualServices.includes("cluster-manager") || actualServices.includes("global-manager")) {
    if (actualServices.includes("servers")) {
      message += "\n\nYou have included servers in your build remember these servers are scalable in order to scale them" +
        "\nuse the `bash start.sh NUMBER_OF_SCALE` function in order to execute the servers to start, remember to include these" +
        "\nby running `docker load -i app.tar.gz`";
    }
    if (actualServices.includes("cluster-manager")) {
      message += "\n\nYou have included the cluster manager in your build which is reasonable with any cluster build" +
        "\nremember to include these by running `docker load -i app.tar.gz`";
    }
    if (actualServices.includes("global-manager")) {
      message += "\n\nYou have included the global manager in your build which is a rare occurrance but expected" +
        "\nif this is your initial single cluster build or this is your central cluster build, regardless the reason"
      "\nremember to include these by running `docker load -i app.tar.gz`";
    }

    // we need to copy the npm token if we have any, as this is necessary in order to build and ship the application
    let npmTokenExists = true;
    try {
      await fsAsync.access(".npm-token", fs.constants.F_OK);
    } catch (e) {
      npmTokenExists = false;
    }
    let npmToken: string;
    if (!npmTokenExists) {
      const npmArg = request({
        prompt: "No .npm-token file found you need to specify your npm token for docker usage",
        silent: true,
      });
      npmToken = (await npmArg).result.trim();
    } else {
      npmToken = (await fsAsync.readFile(".npm-token", "utf-8")).trim();
    }

    // add the patch folder for fast patching
    // the fast patching folder allows to patch the running application
    // without having to do a re-deployment, very dangerous, but allowed
    await fsAsync.mkdir(path.join("deployments", buildID, "patch"));

    // and now we need to execute the following docker commands
    const absPath = path.resolve(".");
    console.log(colors.yellow("PLEASE WAIT THIS MIGHT TAKE UP TO 5 MINUTES..."));
    await execSudo(
      "docker build --no-cache -t app --build-arg NPM_TOKEN=" + npmToken + " " + absPath,
      "Itemize Docker App Builder",
    );
    const saveAbsPath = path.resolve(`./deployments/${buildID}/app.tar.gz`);
    await execSudo(
      `docker save app:latest | gzip > ${saveAbsPath}`,
      "Itemize Docker App Save",
    );
    await execSudo(
      `chmod 777 ${saveAbsPath}`,
      "Itemize Docker App Builder",
    );

    const patchAbsPath = path.resolve(`./deployments/${buildID}/patch`);
    try {
      await execSudo(
        "docker create --name appdummy app",
        "Itemize Docker create dummy app in order to build patch"
      );
      await execSudo(
        `docker cp appdummy:/home/node/app/dist ${path.join(patchAbsPath, "dist")}`,
        "Itemize Docker create app dist patch"
      );
      await execSudo(
        `docker cp appdummy:/home/node/app/node_modules/@onzag/itemize/nodejs ${path.join(patchAbsPath, "nodejs")}`,
        "Itemize Docker create app itemize server patch"
      );
      await execSudo(
        "docker rm -f appdummy",
        "Itemize Docker remove dummy app"
      );
    } catch {
      await execSudo(
        "docker rm -f appdummy",
        "Itemize Docker remove dummy app cleanup"
      );
    }
  }

  // create a patch only
  if (isPatch) {
    await fsAsync.mkdir(path.join("deployments", buildID, "patch"));
    const patchAbsPath = path.resolve(`./deployments/${buildID}/patch`);

    await execAsync(
      "npm run build"
    );
    await execAsync(
      "npm run install"
    );
    await execAsync(
      `cp -r ./dist ${patchAbsPath}`
    );
    await execAsync(
      `cp -r ./node_modules/@onzag/itemize/nodejs ${patchAbsPath}`
    );
  }

  // now for postgresql
  if (actualServices.includes("pgsql")) {
    message += "\n\nYou have included postgres in your build, this is the central database, and it's not expected you do" +
      "\nthis, very often including postgres in the build is a mistake, nevertheless, it might be the case for standalone clusters" +
      "\nremember that the data is saved in pgdata and you need to populate this database, where you intend to deploy " +
      "\nthe database docker-compose-only-db.yml can be used for this purpose which only spawns the database " +
      "\nonce you do that there's a special mode you can initialize your server which will call itemize build database process" +
      "\nfor that you will need to use" +
      "\ndocker-compose -f docker-compose-only-db.yml up -d" +
      "\nthen run the code for accessing the builder" +
      "\ndir=${PWD##*/}; docker run -it --network \"${dir,,}_default\" " +
      "-v $PWD/patch/nodejs:/home/node/app/node_modules/@onzag/itemize/nodejs " +
      "-v $PWD/patch/dist:/home/node/app/dist " +
      "-v $PWD/config:/home/node/app/config -e NODE_ENV=" + version +
      " -e INSTANCE_MODE=BUILD_DATABASE app:latest" +
      "\nalso if you need to load dumps remember to run:" +
      "\ndir=${PWD##*/}; docker run -it --network \"${dir,,}_default\" " +
      "-v $PWD/config:/home/node/app/config -v $PWD/dump:/home/node/app/dump " +
      "-v $PWD/uploads:/home/node/app/uploads -e NODE_ENV=" + version +
      " -e INSTANCE_MODE=LOAD_DATABASE_DUMP app:latest" +
      "\nstop the database by doing" +
      "\ndocker-compose down";

    const pgSQLOnlyParsed = {
      ...parsed,
    };
    pgSQLOnlyParsed.services = {
      ...pgSQLOnlyParsed.services,
    }

    // and now we want to make a docker compose file for the build
    // database mode, and as such it will only have the pgsql service
    Object.keys(pgSQLOnlyParsed.services).forEach((service) => {
      if (service !== "pgsql") {
        delete pgSQLOnlyParsed.services[service];
      } else if (pgSQLOnlyParsed.services[service].depends_on) {
        delete pgSQLOnlyParsed.services[service].depends_on;
      }
    });

    // we emit such file
    const yamlPath = path.join("deployments", buildID, "docker-compose-only-db.yml");
    console.log("emiting " + colors.green(yamlPath));
    await fsAsync.writeFile(yamlPath, YAML.stringify(pgSQLOnlyParsed));
  }

  if (actualServices.includes("elastic")) {
    message += `

You have included elastic in your build, this is the central search database, and it's not expected you do
this, including elastic in the build is usually a mistake, as this automatic configuration tends to be very barebones
and provide little to no functionality and you should set it up by hand if you want it to be production worthy, it will, nevertheless
work, please run the following command to ensure that it runs properly
sysctl -w vm.max_map_count=262144

Because of elastic inclusion your servers are setup as NODE_TLS_REJECT_UNAUTHORIZED=0 because of the self signed certificate, because of the
way elastic works you will need a proper elastic setup to get around this, something this deployable cannot do due to the inherent limitations
of elastic running on docker, this is highly insecure, and you will get an error message in your logs`
  }

  if (actualServices.includes("kibana")) {
    message += `

You have included kibana in your build, this is used to analyze and handle analytics that occur in the elasticsearch cluster
because it is also in a barebones form any outage will cause kibana to be misconfigured as it doesn't hold any state, either in kibana
itself or in elasticsearch, every time it needs to be configured you should restart kibana, and get a new enrollment token
run this only after your cluster is already running
dir=\${PWD##*/}; docker exec -it "\${dir,,}_elastic_1" /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
and then run
dir=\${PWD##*/}; docker logs "\${dir,,}_kibana_1"
and find the link there that you should visit
your username should be elastic and your password should be whatever you set up in your configuration`
  }

  // and finally our readme
  const readmePath = path.join("deployments", buildID, "README");
  console.log("emiting " + colors.green(readmePath));
  await fsAsync.writeFile(readmePath, message);
}
