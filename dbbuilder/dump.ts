/**
 * Contains the dumper that dumps the database fractionally so that
 * it can be reloaded (refreshed)
 *
 * @module
 */

import fs from "fs";
import path from "path";
import colors from "colors/safe";

import Root from "../base/Root";
import { IConfigRawJSONDataType, IDBConfigRawJSONDataType, IDumpConfigRawJSONDataType, IRedisConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import Module from "../base/Root/Module";
import { ISQLTableRowValue } from "../base/Root/sql";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, REGISTRY_IDENTIFIER } from "../constants";
import { yesno } from ".";
import { IServiceCustomizationType } from "../server";
import StorageProvider from "../server/services/base/StorageProvider";
import { RegistryService } from "../server/services/registry";
import { DatabaseConnection } from "../database";
import { LocalStorageService } from "../server/services/local-storage";

let serviceCustom: IServiceCustomizationType = {};
try {
  const itemizeConfig = require(path.join(path.resolve("."), "itemize.config"));
  serviceCustom = itemizeConfig.services;
} catch {
}

const fsAsync = fs.promises;

/**
 * Dumps an item definition based on its configuration
 * @param databaseConnection the database instance
 * @param root the root instance
 * @param idef the item definition in question
 * @param options how it is to be dumped, optional, will dump all if not provided
 */
async function dumpFromIdef(
  databaseConnection: DatabaseConnection,
  root: Root,
  idef: ItemDefinition,
  options: {
    specifics?: Array<string | [string, string]>,
    onlyUnversioned?: boolean,
  } = {},
): Promise<ISQLTableRowValue[]> {
  console.log("dumping: " + colors.green(idef.getQualifiedPathName()));

  // we get the table name and module
  const idefTable = idef.getQualifiedPathName();
  const mod = idef.getParentModule();

  let baseQuery =
    `SELECT * FROM ${JSON.stringify(mod.getQualifiedPathName())} JOIN ${JSON.stringify(idefTable)} ON ` +
    `${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)} = "id" AND ${JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME)} = "version"`;

  if (options.onlyUnversioned && !options.specifics) {
    baseQuery += ` WHERE "version" = ''`;
  }

  // if no specifics have been given
  if (!options.specifics) {
    // dump everything, joins included
    const result: ISQLTableRowValue[] = await databaseConnection.queryRows(baseQuery);

    // return that
    return result;
  } else {
    // otherwise we are only dumping certain of these
    let final: ISQLTableRowValue[] = [];
    // so we loop
    for (const specific of options.specifics) {
      // and query each of them
      let query = baseQuery;
      let bindings: string[];

      // if it's versioned (this means we are sure only getting one)
      let isVersioned = Array.isArray(specific);

      // we add that to the query
      if (isVersioned) {
        bindings = [
          specific[0],
          specific[1] || "",
        ];
        query += ` WHERE "id" = $1 AND "version" = $2`;
      } else {
        bindings = [specific as string];
        // otherwise it's only the id
        query += ` WHERE "id" = $1`;
      }
      // now we get the result
      const result: ISQLTableRowValue[] = await databaseConnection.queryRows(query);
      // and concatenate the thing
      final = final.concat(result);
    }
  }
}

/**
 * Dumps all from an item definition recursively and returns the resulting dump
 * @param databaseConnection the database instance
 * @param root the root instance
 * @param idef the item definition in question
 * @param options some options
 */
async function dumpAllFromIdefRecursive(
  databaseConnection: DatabaseConnection,
  root: Root,
  idef: ItemDefinition,
  options: {
    onlyUnversioned?: boolean,
  } = {}
): Promise<ISQLTableRowValue[]> {
  // very simple we use the dump from idef function without specifics
  let final = await dumpFromIdef(databaseConnection, root, idef, options);
  // and get into all the children
  for (const cIdef of idef.getChildDefinitions()) {
    // and dump those too
    final = final.concat(await dumpAllFromIdefRecursive(databaseConnection, root, cIdef, options));
  }
  // return that
  return final;
}

/**
 * Dumps all the content of a module, if using specifics will only dump certain of them
 * @param databaseConnection the database instance
 * @param root the root instance
 * @param mod the module in question
 * @param options an optional parameter to specify options for dumping
 */
async function dumpFromModule(
  databaseConnection: DatabaseConnection,
  root: Root,
  mod: Module,
  options: {
    specifics?: Array<string | [string, string]>,
    onlyUnversioned?: boolean,
  } = {},
): Promise<ISQLTableRowValue[]> {
  // inform the developer
  console.log("dumping: " + colors.green(mod.getQualifiedPathName()));

  // now we got to fetch this
  let final: ISQLTableRowValue[] = [];

  // we are giving no specifics
  if (!options.specifics) {
    // as such we got to basically copy everything into the children item
    // definitions as everything is extending that module, so we got to copy it
    for (const idef of mod.getAllChildItemDefinitions()) {
      final = final.concat(await dumpAllFromIdefRecursive(databaseConnection, root, idef, {
        onlyUnversioned: options.onlyUnversioned,
      }));
    }
  } else {
    // otherwise we are going over what specifics we are going to copy
    for (const specific of options.specifics) {
      // we need to know the type for that, so we fetch it
      let query = `SELECT "type" FROM ${JSON.stringify(mod.getTableName())}`;
      let bindings: string[];

      // and now similarly filter by version and id, depending on the specific
      let isVersioned = Array.isArray(specific);
      if (isVersioned) {
        bindings = [
          specific[0],
          specific[1] || "",
        ];
        query += ` WHERE "id" = $1 AND "version" = $2`;
      } else {
        bindings = [specific as string];
        // otherwise it's only the id
        query += ` WHERE "id" = $1`;
      }

      // and now we get our results
      const partialResult: ISQLTableRowValue[] = await databaseConnection.queryRows(query);

      // we loop in them and get the type
      for (const result of partialResult) {
        // and we dump from the item definition itself
        const idef = root.registry[result.type] as ItemDefinition;
        final = final.concat(await dumpFromIdef(databaseConnection, root, idef, {
          specifics: [specific],
        }));
      }
    }
  }

  // return that
  return final;
}

/**
 * Dumps literally everything in the module recursively
 * @param databaseConnection the database instance
 * @param root the root instance
 * @param mod the module in question
 */
async function dumpAllFromModuleRecursive(
  databaseConnection: DatabaseConnection,
  root: Root,
  mod: Module,
): Promise<ISQLTableRowValue[]> {
  // similarly we dump from module without specifics
  let final = await dumpFromModule(databaseConnection, root, mod);
  // then we get all child modules
  for (const cMod of mod.getAllModules()) {
    // put that in
    final = final.concat(await dumpAllFromModuleRecursive(databaseConnection, root, cMod));
  }
  // and provide finals
  return final;
}

/**
 * Performs a copy where everything that is contained as data for a given file is copied
 * and donwloaded into the dump folder
 * @param domain the domain eg. mysite.com
 * @param qualifiedPathName the qualified path name we are getting for MOD_users or MOD_users__IDEF_user remember that modules store
 * in their own location for propextensions
 * @param idVersionHandle the id and version handle, as a string, this means 1.version or 1. alone... it's basically both of them
 * concatenated and separated by a dot
 * @param client the cloud client
 */
async function copyDataAt(
  qualifiedPathName: string,
  idVersionHandle: string,
  storageService: StorageProvider<any>,
) {
  try {
    await storageService.dumpFolderFromAllSources(
      path.join(qualifiedPathName, idVersionHandle),
      path.join("./dump", qualifiedPathName, idVersionHandle),
    );
  } catch (err) {
    console.log(colors.red(err.message));
  }
}

/**
 * Performs the copy of the data that is necessary for a given row
 * @param row the row in question
 * @param root the root
 * @param domain the domain in question
 */
async function copyDataOf(row: ISQLTableRowValue, root: Root, storageService: StorageProvider<any>) {
  console.log("dumping files of: " + colors.green(row.type + " " + row.id + " " + row.version));

  // so we need the idef and the module
  const idef = root.registry[row.type] as ItemDefinition;
  const mod = idef.getParentModule();

  // and now we can attempt to copy the data for it
  await copyDataAt(mod.getQualifiedPathName(), row.id + "." + (row.version || ""), storageService);
  await copyDataAt(idef.getQualifiedPathName(), row.id + "." + (row.version || ""), storageService);
}

/**
 * Actually runs the dump
 * @param version either development or production
 * @param databaseConnection the database instance to read from
 * @param root the root instance
 */
export default async function dump(
  version: string,
  databaseConnection: DatabaseConnection,
  root: Root,
) {
  const sensitiveConfig: ISensitiveConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", version === "development" ? "index.sensitive.json" : `index.${version}.sensitive.json`), "utf8"),
  );

  const config: IConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", "index.json"), "utf8"),
  );

  const dumpConfig: IDumpConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", "dump.json"), "utf8"),
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

  // and now we can start dumping
  let final: ISQLTableRowValue[] = [];
  // if we have a config, that actually specifies something
  // rather than true (aka dump everything)
  if (dumpConfig.save && dumpConfig.save !== true) {
    // now we got to see what we are dumping, first layer is modules
    for (const key of Object.keys(dumpConfig.save)) {
      // so we try to get it by splitting it /
      const mod = root.getModuleFor(key.split("/"));
      // and now let's see what value was given
      const value = dumpConfig.save[key];
      // if the value is a simple true
      if (value === true || value === "all") {
        // we dump all for that module
        final = final.concat(await dumpFromModule(databaseConnection, root, mod));
      } else if (value === "only-unversioned") {
        // we dump all for that module
        final = final.concat(await dumpFromModule(databaseConnection, root, mod, {
          onlyUnversioned: true,
        }));
      } else if (Array.isArray(value)) {
        // otherwise for arrays, we are being specific on what we are dumping
        // we pass that as the specific
        final = final.concat(await dumpFromModule(databaseConnection, root, mod, {
          specifics: value,
        }));
      } else if (value !== false) {
        // otherwise we likely have a custom configuration of specific
        // item definitions we are deploying to the dump folder
        for (const idefKey of Object.keys(dumpConfig.save[key])) {
          // we got to find them, and so we get it
          const idef = mod.getItemDefinitionFor(idefKey.split("/"));
          // and then we see what's the config for it
          const idefValue = dumpConfig.save[key][idefKey];

          // if it's a simple true
          if (idefValue === true || idefValue === "all") {
            // we do the same and just dump the idef content
            final = final.concat(await dumpFromIdef(databaseConnection, root, idef));
          } else if (idefValue === "only-unversioned") {
            final = final.concat(await dumpFromIdef(databaseConnection, root, idef, {
              onlyUnversioned: true,
            }));
          } else if (Array.isArray(idefValue)) {
            // otherwise the parameters must be a specifics list
            final = final.concat(await dumpFromIdef(databaseConnection, root, idef, {
              specifics: idefValue,
            }));
          }
        }
      }
    }
  } else if (dumpConfig.save === true) {
    // so we got this message here
    console.log(colors.yellow("Warning: ") + "you are dumping everything");
    // and now we got to ask the developer if that's what they really want
    if (await yesno("Are you sure you want to proceed, your dump includes everything, including user passwords")) {
      // okay so we do it
      for (const rootModule of root.getAllModules()) {
        // can be useful for development I guess
        final = final.concat(await dumpAllFromModuleRecursive(databaseConnection, root, rootModule));
      }
    }
  }

  // now we need the dump directory
  let exists = true;
  try {
    await fsAsync.access("dump", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }

  // and here we go to save it
  try {
    let continueWithProcessing = true;
    if (!exists) {
      console.log(colors.yellow(`A dump folder hasn't been determined`));

      // add the folder
      await fsAsync.mkdir("dump", { recursive: true });
    } else {
      // we ask the user if they want to remove their old dump folder
      // as we need to do that, there can only be one dump at a time
      continueWithProcessing = await yesno("Saving the dump will override the previous content, proceed?...");

      // remove and readd
      await fsAsync.rmdir("dump", { recursive: true });
      await fsAsync.mkdir("dump", { recursive: true });
    }

    // okay then we continue the process
    if (continueWithProcessing) {
      // emit the dump file
      console.log("emiting " + colors.green("dump/dump.json"));
      // write it
      await fsAsync.writeFile("dump/dump.json", JSON.stringify(final, null, 2));
      // and now we need to fetch all these files for the dump
      for (const row of final) {
        // so we pass them one at a time
        await copyDataOf(
          row,
          root,
          storageService as any,
        );
      }
    }

    // say it's all done
    console.log(colors.green("All done..."));
  } catch (err) {
    // something bad happened
    console.log(colors.red(err.stack));
  }
}
