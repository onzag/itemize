/**
 * Performs the loading of the dumps that are presents in the dump folder
 * 
 * @packageDocumentation
 */

import fs from "fs";
import path from "path";
import colors from "colors/safe";
import Knex from "knex";

import Root from "../base/Root";
import { IConfigRawJSONDataType, IDumpConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { ISQLTableDefinitionType, ISQLTableRowValue } from "../base/Root/sql";
import { yesno } from ".";
import { getSQLTableDefinitionForModule } from "../base/Root/Module/sql";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, UNSPECIFIED_OWNER } from "../constants";
import { getStorageProviders, IServiceCustomizationType } from "../server";
import { StorageProvider } from "../server/services";

let serviceCustom: IServiceCustomizationType = {};
try {
  const serviceFileSrc = require(path.join(path.resolve("."), "dist", "server", "services"));
  serviceCustom = serviceFileSrc.default;
} catch {
}

const fsAsync = fs.promises;

/**
 * Copy the local files from the dump into the container by sending
 * them via the cloud client
 * @param uploadClient the cloud client
 * @param localPath the local path we are currently working with, must be a folder
 * @param remotePath the remote path we are expected to copy at
 */
export async function copyFilesFor(
  uploadClient: StorageProvider<any>,
  localPath: string,
  remotePath: string,
) {
  console.log("Copying files for: " + remotePath);

  // now we try to read the directory, note how we use try
  // the reason is that our directory might not exist as all
  // because this function might be requested with copying files for eg.
  // MOD_cms__IDEF_fragment/1.
  // but it might have no files at all, and as such, there will not be any folder
  try {
    const files = await fsAsync.readdir(localPath);

    // now we loop in the files, yes we don't do it in parallel, we don't know how big the
    // dump is and it's not like we are in a hurry, this is nicer not to overwhelm the server
    for (const file of files) {
      // so this is the file path in the local
      const localFilePath = path.join(localPath, file);
      // and in the remote
      const remoteFilePath = path.join(remotePath, file);

      // now we need to check if that file is an actual file or a directory
      const stat = await fsAsync.lstat(localFilePath);
      // if it's a directory
      if (stat.isDirectory()) {
        // Recurse
        await copyFilesFor(uploadClient, localFilePath, remoteFilePath);
      } else {
        // and a read stream for our local
        const readStream = fs.createReadStream(localFilePath);
        // and we pipe it!
        await uploadClient.upload(remoteFilePath, readStream, false);
      }
    }
  } catch {
    // no such file or directory, we don't have files for it
    console.log("No files found to copy at " + localPath);
  }
}

/**
 * We use this to cache schemas, they aren't expensive, but
 * we don't want to warm up our processors too much by wasting cycles
 * @ignore
 */
const CACHED_SCHEMAS: {
  [qn: string]: ISQLTableDefinitionType;
} = {};

/**
 * Performs the dump loading
 * @param configVersion either development or production
 * @param knex the knex database connection
 * @param root the root
 */
export default async function loadDump(configVersion: string, knex: Knex, root: Root) {
  // we need these configurations
  const sensitiveConfig: ISensitiveConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", configVersion === "development" ? "index.sensitive.json" : `index.${configVersion}.sensitive.json`), "utf8"),
  );

  const config: IConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", "index.json"), "utf8"),
  );

  const dumpConfig: IDumpConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", "dump.json"), "utf8"),
  );

  // and the upload containers
  const { cloudClients } = await getStorageProviders(config, sensitiveConfig, serviceCustom.storageServiceProviders);

  // inform the users
  console.log(`Loaded ${Object.keys(cloudClients).length} storage containers: ` +
    colors.yellow(Object.keys(cloudClients).join(", ")));

  // now we need to find our dump
  let dumpContents: string = null;
  try {
    dumpContents = await fsAsync.readFile(path.join("dump", "dump.json"), "utf-8")
  } catch {
    // there was no dump
    console.log("There is no existant dump");
    return;
  }

  // okay now we need to parse this dump
  const dump: ISQLTableRowValue[] = JSON.parse(
    dumpContents,
  ).sort((a: ISQLTableRowValue, b: ISQLTableRowValue) => {
    // we sort it just to be nice to the database, and add them in order, we might skip some numbers anyway
    // but it's better than bouncing around
    return a.id - b.id;
  });

  // now we try this
  try {
    // and loop each row
    for (const row of dump) {
      // we need the item definition that this row belogns to
      const idef = root.registry[row.type] as ItemDefinition;
      // and then the module for it
      const mod = idef.getParentModule();

      // these are the id and version we expect
      const id = row.id;
      const version = row.version;

      // inform the user we are loading this row
      console.log("loading dump for: " + row.type + " " + row.id + " " + row.version);

      // this is where we are going to store our files
      // by default same as the row specifies
      let targetContainerId: string = row.container_id;

      // so if we have a load config
      if (dumpConfig.load) {
        // now if our current target container is not in our
        // supported list, and we have a primary container that is
        if (
          !cloudClients[targetContainerId] &&
          dumpConfig.load.primaryContainerId &&
          cloudClients[dumpConfig.load.primaryContainerId]
        ) {
          // use that one
          targetContainerId = dumpConfig.load.primaryContainerId;
        }

        // now let's go to the version mapper which has priority over that
        if (dumpConfig.load.versionMapper && dumpConfig.load.versionMapper[version]) {
          // and we will try to find in the array in order an available container id
          const originalContainerId = targetContainerId;
          targetContainerId = dumpConfig.load.versionMapper[version].find((c) => {
            return !!cloudClients[c];
          }) || originalContainerId;
        }

        // this is the same but for the previous container id
        if (dumpConfig.load.previousContainerIdMapper && dumpConfig.load.previousContainerIdMapper[row.container_id]) {
          const originalContainerId = targetContainerId;
          targetContainerId = dumpConfig.load.previousContainerIdMapper[row.container_id].find((c) => {
            return !!cloudClients[c];
          }) || originalContainerId;
        }
      }

      // and now we try to see if the row already exists
      const result: ISQLTableRowValue = await knex.first("type", "created_by", "created_at", "edited_by", "container_id").from(mod.getQualifiedPathName()).where({
        id,
        version,
      });

      // and store that in this variable
      const exists = !!result;
      // now by default it will insert files if it doesn't exist
      // as that means this script will not ask questions, overriding is however
      // another situation
      let shouldInsertFiles: boolean = !exists;
      // now we got to set the container id where we found this thing if any
      let foundContainerId: string = exists ? result.container_id : null;

      // we got to do some special checks
      if (exists) {
        // if the obtained type
        const obtainedType = result.type;
        const differs = obtainedType !== row.type;
        let needsRecreation: boolean = false;
        
        // is not the same as our own type, this is dangerous, but it might just be
        // a simple case that the type has changed, this will however lead to an
        // orphaned child on the item definition table
        if (differs) {
          // now we got to check if there's actually a children that is linked to that module already
          // in our target item definition, this is because we have entered conflict territory
          const result: ISQLTableRowValue = await knex.first(CONNECTOR_SQL_COLUMN_ID_FK_NAME).from(idef.getQualifiedPathName()).where({
            CONNECTOR_SQL_COLUMN_ID_FK_NAME: id,
            CONNECTOR_SQL_COLUMN_VERSION_FK_NAME: version,
          });

          // if there's none
          if (!result) {
            // then we need to create such children
            needsRecreation = true;
          }

          // inform the user that we are forcing this
          console.log(
            colors.yellow(
              "Attention, the types of the row do not match, the dump specifies " +
              row.type +
              " but the current database specifies " +
              obtainedType +
              " a force method will be used"
            )
          );
        }

        // now we ask if we truly want to override the values
        if (await yesno("Please ensure you want to override this value")) {
          // so we got to extract the data
          const moduleRows: ISQLTableRowValue = {};
          const idefRows: ISQLTableRowValue = {};

          // for that we need the database schema
          const schema = CACHED_SCHEMAS[mod.getQualifiedPathName()] || getSQLTableDefinitionForModule(knex, mod);
          CACHED_SCHEMAS[mod.getQualifiedPathName()] = schema;

          // and now we loop to see where each column goes, the module, or item definition table
          Object.keys(row).forEach((key) => {
            if (schema[key]) {
              moduleRows[key] = row[key];
            } else {
              idefRows[key] = row[key];
            }
          });

          // we change these in the module row, the container always changes to the target
          moduleRows.container_id = targetContainerId;
          // last modified has to change
          moduleRows.last_modified = knex.fn.now();
          // created at is kept to the original or otherwise it's now
          moduleRows.created_at = result.created_at || knex.fn.now();
          // the creator is kept to the one in the database or it's unspecified
          moduleRows.created_by = result.created_by || UNSPECIFIED_OWNER;
          // same for the editor
          moduleRows.edited_by = result.edited_by || result.created_by || UNSPECIFIED_OWNER;

          // and now we run the transaction
          await knex.transaction(async (transactionKnex) => {
            // the module is always an update kind
            await transactionKnex.update(moduleRows).from(mod.getQualifiedPathName()).where({
              id,
              version,
            });

            // now we need to see if we are forcing this
            if (needsRecreation) {
              // if we are we got to create the missing item definition row
              await transactionKnex(idef.getQualifiedPathName()).insert(idefRows);
            } else {
              // otherwise as standard we update
              delete idefRows[CONNECTOR_SQL_COLUMN_ID_FK_NAME];
              delete idefRows[CONNECTOR_SQL_COLUMN_VERSION_FK_NAME];
              await transactionKnex.update(idefRows).from(idef.getQualifiedPathName()).where({
                [CONNECTOR_SQL_COLUMN_ID_FK_NAME]: id,
                [CONNECTOR_SQL_COLUMN_VERSION_FK_NAME]: version,
              });
            }
          });

          // and yes, we are inserting files because we approved this modification
          shouldInsertFiles = true;
        };
      } else {
        // now for the natural process
        const moduleRows: ISQLTableRowValue = {};
        const idefRows: ISQLTableRowValue = {};

        // get the schema
        const schema = CACHED_SCHEMAS[mod.getQualifiedPathName()] || getSQLTableDefinitionForModule(knex, mod);
        CACHED_SCHEMAS[mod.getQualifiedPathName()] = schema;

        // do the same
        Object.keys(row).forEach((key) => {
          if (schema[key]) {
            moduleRows[key] = row[key];
          } else {
            idefRows[key] = row[key];
          }
        });

        // note the difference, the creator is always uspecified
        moduleRows.container_id = targetContainerId;
        moduleRows.last_modified = knex.fn.now();
        moduleRows.created_at = knex.fn.now();
        moduleRows.created_by = UNSPECIFIED_OWNER;
        moduleRows.edited_by = null;

        // now we run the transaction
        await knex.transaction(async (transactionKnex) => {
          await transactionKnex(mod.getQualifiedPathName()).insert(moduleRows);
          await transactionKnex(idef.getQualifiedPathName()).insert(idefRows);
        });
      }

      // and now for the files
      if (shouldInsertFiles) {
        // we got to get the hostname
        const hostname = configVersion === "development" ? config.developmentHostname : config.productionHostname;

        // this is the path where things are meant to be
        const resultIdefBasePath = path.join(idef.getQualifiedPathName(), row.id + "." + (row.version || ""));
        const resultModBasePath = path.join(mod.getQualifiedPathName(), row.id + "." + (row.version || ""));

        // this is the path for local
        const resultLocalIdefPath = path.join("dump", resultIdefBasePath);
        const resultLocalModPath = path.join("dump", resultModBasePath);

        // and this is where we are meant to store them, almost the same, other than for the hostname
        const resultRemoteIdefPath = path.join(hostname, resultIdefBasePath);
        const resultRemoteModPath = path.join(hostname, resultModBasePath);

        // if there's a container id where this information is already stored
        if (foundContainerId) {
          // we got to get that container
          const client = cloudClients[foundContainerId];
          // maybe?
          if (!client) {
            console.log("Could not retrieve a client for: " + colors.yellow(foundContainerId));
          } else {
            // and delete everything in the remote, just in case, as there might be conflicts
            await client.removeFolder(resultRemoteIdefPath);
            await client.removeFolder(resultRemoteModPath);
          }
        }

        // otherwise we have to store the files
        if (targetContainerId) {
          // and now we go in
          const targetClient = cloudClients[targetContainerId];
          if (!targetClient) {
            console.log("Could not retrieve a client for: " + colors.yellow(targetContainerId));
          } else {
            // and copy the files
            await copyFilesFor(targetClient, resultLocalIdefPath, resultRemoteIdefPath);
            await copyFilesFor(targetClient, resultLocalModPath, resultRemoteModPath);
          }
        }
      }
    }

    // close the database connection
    knex.destroy();

    // say it's all done
    console.log(colors.green("All done..."));
  } catch (err) {
    // we messed up something
    console.log(colors.red(err.stack));
    // close the database connection
    knex.destroy();
  }
}
