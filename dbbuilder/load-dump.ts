/**
 * Performs the loading of the dumps that are presents in the dump folder
 * 
 * @module
 */

import fs from "fs";
import path from "path";
import colors from "colors/safe";

import Root from "../base/Root";
import { IConfigRawJSONDataType, IDBConfigRawJSONDataType, IDumpConfigRawJSONDataType, IRedisConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { ISQLTableDefinitionType, ISQLTableRowValue } from "../base/Root/sql";
import { yesno } from ".";
import { getSQLTableDefinitionForModule } from "../base/Root/Module/sql";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, REGISTRY_IDENTIFIER, UNSPECIFIED_OWNER } from "../constants";
import { getStorageProvider, IServiceCustomizationType } from "../server";
import StorageProvider from "../server/services/base/StorageProvider";
import { RegistryService } from "../server/services/registry";
import { DatabaseConnection } from "../database";
import { IManyValueType } from "../database/base";
import type { IRQFile } from "../rq-querier";
import type Include from "../base/Root/Module/ItemDefinition/Include";
import type PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { LocalStorageService } from "../server/services/local-storage";

let serviceCustom: IServiceCustomizationType = {};
try {
  const itemizeConfig = require(path.join(path.resolve("."), "itemize.config"));
  serviceCustom = itemizeConfig.services;
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
  clusterId: string,
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
        await copyFilesFor(uploadClient, localFilePath, remoteFilePath, clusterId);
      } else {
        // and a read stream for our local
        const readStream = fs.createReadStream(localFilePath);
        // and we pipe it!
        await uploadClient.saveRemote(remoteFilePath, clusterId, readStream, { alwaysUseHttp: true });
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

const CACHED_USERNAMES_TO_IDS: {
  [id: string]: string;
} = {};

async function getUserFromUsername(username: string, dumpConfig: IDumpConfigRawJSONDataType, databaseConnection: DatabaseConnection): Promise<string> {
  if (typeof CACHED_USERNAMES_TO_IDS[username] !== "undefined") {
    return CACHED_USERNAMES_TO_IDS[username];
  }

  const userWithName =
    await databaseConnection.queryFirst("SELECT \"id\" FROM \"MOD_users__IDEF_user\" WHERE \"username\" = $1", [username]);

  CACHED_USERNAMES_TO_IDS[username] = userWithName ? userWithName.id : null;

  if (!userWithName) {
    console.log(
      colors.red(
        "Attention, the user with username " +
        username +
        " does not exist in the target database"
      )
    );

    return null;
  }

  return userWithName.id;
}

/**
 * Performs the dump loading
 * @param version either development or production
 * @param databaseConnection the database connection
 * @param root the root
 */
export default async function loadDump(version: string, databaseConnection: DatabaseConnection, root: Root) {
  let errors: number = 0;

  const config: IConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", "index.json"), "utf8"),
  );

  const dumpConfig: IDumpConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", "dump.json"), "utf8"),
  );

  // now we need to find our dump
  let dumpContents: string = null;
  try {
    dumpContents = await fsAsync.readFile(path.join("dump", "dump.json"), "utf-8")
  } catch {
    // there was no dump
    console.log("There is no existant dump");
    return;
  }

  const sensitiveConfig: ISensitiveConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", version === "development" ? "index.sensitive.json" : `index.${version}.sensitive.json`), "utf8"),
  );

  const redisConfig: IRedisConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`), "utf8"),
  );

  const dbConfig: IDBConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`), "utf8"),
  );

  const registry = new RegistryService({
    databaseConnection,
    registryTable: REGISTRY_IDENTIFIER,
  }, null, {
    config,
    redisConfig,
    dbConfig,
    sensitiveConfig,
  });
  await registry.initialize();

  const StorageProviderClass = serviceCustom.storageServiceProvider || LocalStorageService;
  const storageService = new StorageProviderClass(null, registry, {
    config,
    dbConfig,
    redisConfig,
    sensitiveConfig,
  });
  await storageService.initialize();

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
      try {
        // we need the item definition that this row belogns to
        const idef = root.registry[row.type] as ItemDefinition;
        // and then the module for it
        const mod = idef.getParentModule();

        // these are the id and version we expect
        const id = row.id;
        const version = row.version;

        // inform the user we are loading this row
        console.log("loading dump for: " + row.type + " " + row.id + " " + row.version);

        if (row.type !== "MOD_users__IDEF_user") {
          let originalCreatedBy = row.created_by;
          if (dumpConfig.load.userIdToUserWithName && dumpConfig.load.userIdToUserWithName[row.created_by]) {
            row.created_by = await getUserFromUsername(
              dumpConfig.load.userIdToUserWithName[row.created_by],
              dumpConfig,
              databaseConnection,
            );
          } else if (dumpConfig.load.forceUserIdToUserWithName) {
            row.created_by = await getUserFromUsername(
              dumpConfig.load.forceUserIdToUserWithName,
              dumpConfig,
              databaseConnection,
            );
          }

          if (!row.created_by) {
            row.created_by = originalCreatedBy;
          }

          if (row.edited_by) {
            let originalEditedBy = row.edited_by;
            if (dumpConfig.load.userIdToUserWithName && dumpConfig.load.userIdToUserWithName[row.edited_by]) {
              row.edited_by = await getUserFromUsername(
                dumpConfig.load.userIdToUserWithName[row.edited_by],
                dumpConfig,
                databaseConnection,
              );
            } else if (dumpConfig.load.forceUserIdToUserWithName) {
              row.edited_by = await getUserFromUsername(
                dumpConfig.load.forceUserIdToUserWithName,
                dumpConfig,
                databaseConnection,
              );
            }

            if (!row.edited_by) {
              row.edited_by = originalEditedBy;
            }
          }
        }

        const filesCollectedInRow: Array<{ rowId: string, file: IRQFile, isExtensions: boolean }> = [];
        // this will process a single file in the property
        const processFileInProperty = (file: IRQFile) => {
          // we take a file and then we check to change the cluster as per the rules
          let wasSet = false;

          // first version to cluster id
          if (dumpConfig.load.versionToClusterId && dumpConfig.load.versionToClusterId[row.version || ""]) {
            // we find the first one that has a cluster subdomain
            const newClusterValue = dumpConfig.load.versionToClusterId[row.version || ""].find((c) => {
              return config.allClusters.includes(c);
            });

            // we set it if we get any
            if (newClusterValue) {
              file.cluster = newClusterValue;
              wasSet = true;
            }
          }

          // we do the same if it was not set before and now we try with cluster id to cluster id technique
          if (!wasSet && dumpConfig.load.clusterIdToClusterId && dumpConfig.load.clusterIdToClusterId[file.cluster]) {
            // we find one
            const newClusterValue = dumpConfig.load.clusterIdToClusterId[file.cluster].find((c) => {
              return config.allClusters.includes(c);
            });

            // we set it if we did find one
            if (newClusterValue) {
              file.cluster = newClusterValue;
              wasSet = true;
            }
          }

          // and now for the primary if all fails
          if (!wasSet && dumpConfig.load.primaryClusterId && config.allClusters.includes(dumpConfig.load.primaryClusterId)) {
            file.cluster = dumpConfig.load.primaryClusterId;
            wasSet = true;
          }

          // we still check just in case
          if (!config.allClusters.includes(file.cluster)) {
            throw new Error("Could not resolve the cluster for " + file.cluster +
              " in file at row " + row.id + " with file id " + file.id);
          }

          return file;
        }

        // processing the property and its value
        const processProperty = (rowId: string, pDef: PropertyDefinition, include: Include) => {
          // parse from JSON
          const valueParsed = JSON.parse(row[rowId]);

          // and now try to fix it
          let newValue: string = null;
          if (pDef.getPropertyDefinitionDescription().rq.array) {
            if (!Array.isArray(valueParsed)) {
              // WHAT
              throw new Error("Found non-array file value in at " + rowId + " but the definition specifies it should be array file");
            }
            // we get the new value by mapping and stringify
            newValue = JSON.stringify(valueParsed.map((file: IRQFile) => {
              // we process the file and push it to our collected array
              const reprocessedFile = processFileInProperty(file);
              filesCollectedInRow.push({
                rowId,
                file: reprocessedFile,
                isExtensions: pDef.isExtension(),
              });
              return reprocessedFile;
            }));
          } else {
            if (Array.isArray(valueParsed)) {
              // WHAT
              throw new Error("Found array file value in at " + rowId + " but the definition specifies it should be single file");
            }
            // same here
            const reprocessedFile = processFileInProperty(valueParsed);
            filesCollectedInRow.push({
              rowId,
              file: reprocessedFile,
              isExtensions: pDef.isExtension(),
            });
            newValue = JSON.stringify(reprocessedFile);
          }

          // clusters have been changed according to criteria
          row[rowId] = newValue;
        }

        // doing the classic getting all property definition and extensions and doing the same for includes
        idef.getAllPropertyDefinitionsAndExtensions().forEach((pDef) => {
          if (row[pDef.getId()] && pDef.getPropertyDefinitionDescription().rqRepresentsFile) {
            processProperty(pDef.getId(), pDef, null);
          }
        });
        idef.getAllIncludes().forEach((include) => {
          include.getSinkingProperties().forEach((pDef) => {
            const rowId = include.getPrefixedQualifiedIdentifier() + pDef.getId();
            if (row[rowId] && pDef.getPropertyDefinitionDescription().rqRepresentsFile) {
              processProperty(rowId, pDef, include);
            }
          });
        });

        // and now we try to see if the row already exists
        const result: ISQLTableRowValue = await databaseConnection.queryFirst(
          `SELECT "type", "created_by", "created_at", "edited_by", "last_modified" FROM ${JSON.stringify(mod.getQualifiedPathName())} ` +
          `WHERE "id" = $1 AND "version" = $2 LIMIT 1`,
          [
            id,
            version,
          ],
        );

        // and store that in this variable
        const exists = !!result;
        // now by default it will insert files if it doesn't exist
        // as that means this script will not ask questions, overriding is however
        // another situation
        let shouldInsertFiles: boolean = !exists;

        // we got to do some special checks
        if (exists) {
          console.log(colors.yellow("The value already exists"));

          if (result.last_modified === row.last_modified) {
            console.log(colors.yellow("The signature of last modification matches, therefore it's considered done"));
            return;
          }

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
            const result: ISQLTableRowValue = await databaseConnection.queryFirst(
              `SELECT ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)} FROM ${JSON.stringify(idef.getQualifiedPathName())} ` +
              `WHERE ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)} = $1 AND ${JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME)} = $2`,
              [
                id,
                version,
              ],
            );

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
            const moduleRows: IManyValueType = {};
            const idefRows: IManyValueType = {};

            // for that we need the database schema
            const schema = CACHED_SCHEMAS[mod.getQualifiedPathName()] || getSQLTableDefinitionForModule(mod);
            CACHED_SCHEMAS[mod.getQualifiedPathName()] = schema;

            // and now we loop to see where each column goes, the module, or item definition table
            Object.keys(row).forEach((key) => {
              if (schema[key]) {
                moduleRows[key] = row[key];
              } else {
                idefRows[key] = row[key];
              }
            });

            // last modified has to change
            moduleRows.last_modified = [
              "NOW()",
              [],
            ];
            // created at is kept to the original or otherwise it's now
            moduleRows.created_at = result.created_at || [
              "NOW()",
              [],
            ];

            // and now we run the transaction
            await databaseConnection.startTransaction(async (transactingDatabase) => {
              const updateQuery = transactingDatabase.getUpdateBuilder();
              updateQuery.table(mod.getTableName());
              updateQuery.whereBuilder.andWhereColumn("id", id);
              updateQuery.whereBuilder.andWhereColumn("version", version);
              updateQuery.setBuilder.setMany(moduleRows);

              // the module is always an update kind
              await transactingDatabase.query(updateQuery);

              // now we need to see if we are forcing this
              if (needsRecreation) {
                const insertQuery = transactingDatabase.getInsertBuilder();
                insertQuery.table(idef.getTableName());
                insertQuery.insert(idefRows);
                // if we are we got to create the missing item definition row
                await transactingDatabase.query(insertQuery);
              } else {
                // otherwise as standard we update
                delete idefRows[CONNECTOR_SQL_COLUMN_ID_FK_NAME];
                delete idefRows[CONNECTOR_SQL_COLUMN_VERSION_FK_NAME];

                if (Object.keys(idefRows).length !== 0) {
                  const updateQuery = transactingDatabase.getUpdateBuilder();
                  updateQuery.table(idef.getTableName());
                  updateQuery.whereBuilder.andWhereMany({
                    [CONNECTOR_SQL_COLUMN_ID_FK_NAME]: id,
                    [CONNECTOR_SQL_COLUMN_VERSION_FK_NAME]: version,
                  });
                  updateQuery.setBuilder.setMany(idefRows);
                  await transactingDatabase.query(updateQuery);
                }
              }
            });

            // and yes, we are inserting files because we approved this modification
            shouldInsertFiles = true;
          };
        } else {
          // now for the natural process
          const moduleRows: IManyValueType = {};
          const idefRows: IManyValueType = {};

          // get the schema
          const schema = CACHED_SCHEMAS[mod.getQualifiedPathName()] || getSQLTableDefinitionForModule(mod);
          CACHED_SCHEMAS[mod.getQualifiedPathName()] = schema;

          // do the same
          Object.keys(row).forEach((key) => {
            if (schema[key]) {
              moduleRows[key] = row[key];
            } else {
              idefRows[key] = row[key];
            }
          });

          // update the last modified hopefully it will get caught by the
          // loader
          moduleRows.last_modified = ["NOW()", []];

          // now we run the transaction
          await databaseConnection.startTransaction(async (transactingDatabase) => {
            const insertQueryMod = transactingDatabase.getInsertBuilder();
            insertQueryMod.table(mod.getTableName());
            insertQueryMod.insert(moduleRows);

            await transactingDatabase.query(insertQueryMod);

            const insertQueryIdef = transactingDatabase.getInsertBuilder();
            insertQueryIdef.table(idef.getTableName());
            insertQueryIdef.insert(idefRows);

            await transactingDatabase.query(insertQueryIdef);
          });
        }

        // and now for the files
        if (shouldInsertFiles) {
          // this is the path where things are meant to be
          const resultIdefBasePath = path.join(idef.getQualifiedPathName(), row.id + "." + (row.version || ""));
          const resultModBasePath = path.join(mod.getQualifiedPathName(), row.id + "." + (row.version || ""));


          // we do one by one we take it easy
          for (const file of filesCollectedInRow) {
            const filePathRemote = path.join(file.isExtensions ? resultModBasePath : resultIdefBasePath, file.rowId, file.file.id);
            const filePathLocal = path.join("dump", filePathRemote);
            // our cluster is accurate
            await copyFilesFor(
              storageService as any,
              filePathLocal,
              filePathRemote,
              file.file.cluster,
            );
          }
        }
      } catch (err) {
        errors++;

        // we messed up something
        console.error(colors.red("While writing row id: " + row.id + ", with version: " + row.version || "null" + ", an error ocurred:"));
        console.error(err.stack);
      }
    }

    // say it's all done
    if (errors) {
      console.log(colors.red("Done, but " + errors + " errors ocurred"));
    } else {
      console.log(colors.green("All done..."));
    }
  } catch (err) {
    // we messed up something
    console.log(colors.red(err.stack));
  }
}
