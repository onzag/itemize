/**
 * Contains the dumper that dumps the database fractionally so that
 * it can be reloaded (refreshed)
 *
 * @packageDocumentation
 */

import fs from "fs";
import path from "path";
import colors from "colors/safe";
import Knex from "knex";

import Root from "../base/Root";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import Module from "../base/Root/Module";
import { ISQLTableRowValue } from "../base/Root/sql";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME } from "../constants";
import { yesno } from ".";
import { getPkgCloudContainers, PkgCloudContainers } from "../server";
import pkgcloud from "pkgcloud";

const fsAsync = fs.promises;

export interface IDumpMap {
  dump: boolean | {
    [modPath: string]: boolean | Array<number | [number, string]> | {
      [idefPath: string]: boolean | Array<number | [number, string]>
    };
  },
  loadDump?: {
    containerBasedOnProperties?: string[];
    primaryContainerId: string;
    fallbackContainerId: string;
  },
}

async function dumpFromIdef(knex: Knex, root: Root, idef: ItemDefinition, specifics?: Array<number | [number, string]>): Promise<ISQLTableRowValue[]> {
  console.log("dumping: " + colors.green(idef.getQualifiedPathName()));

  const idefTable = idef.getQualifiedPathName();
  const mod = idef.getParentModule();
  if (!specifics) {
    const result: ISQLTableRowValue[] = await knex.select().from(mod.getQualifiedPathName()).join(idefTable, (clause) => {
      clause.on(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
      clause.on(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
    });
    return result;
  } else {
    let final: ISQLTableRowValue[] = [];
    for (const specific of specifics) {
      const query = knex.select().from(mod.getQualifiedPathName()).join(idefTable, (clause) => {
        clause.on(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
        clause.on(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
      });
      let isVersioned = Array.isArray(specific);
      if (isVersioned) {
        query.where({
          id: specific[0],
          version: specific[1],
        });
      } else {
        query.where({
          id: specific,
        });
      }
      const result: ISQLTableRowValue[] = await query;
      final = final.concat(result);
    }
  }
}

async function dumpAllFromIdefRecursive(knex: Knex, root: Root, idef: ItemDefinition): Promise<ISQLTableRowValue[]> {
  let final = await dumpFromIdef(knex, root, idef);
  for (const cIdef of idef.getChildDefinitions()) {
    final = final.concat(await dumpAllFromIdefRecursive(knex, root, cIdef));
  }
  return final;
}

async function dumpFromModule(knex: Knex, root: Root, mod: Module, specifics?: Array<number | [number, string]>): Promise<ISQLTableRowValue[]> {
  console.log("dumping: " + colors.green(mod.getQualifiedPathName()));

  let final: ISQLTableRowValue[] = [];
  if (!specifics) {
    for (const idef of mod.getAllChildItemDefinitions()) {
      final = final.concat(await dumpAllFromIdefRecursive(knex, root, idef));
    }
  } else {
    for (const specific of specifics) {
      const query = knex.select("type").from(mod.getQualifiedPathName());
      let isVersioned = Array.isArray(specific);
      if (isVersioned) {
        query.where({
          id: specific[0],
          version: specific[1],
        });
      } else {
        query.where({
          id: specific,
        });
      }
      const partialResult: ISQLTableRowValue[] = await query;
      for (const result of partialResult) {
        const idef = root.registry[result.type] as ItemDefinition;
        final = final.concat(await dumpFromIdef(knex, root, idef, [specific]));
      }
    }
  }
  return final;
}

async function dumpAllFromModuleRecursive(knex: Knex, root: Root, mod: Module): Promise<ISQLTableRowValue[]> {
  let final = await dumpFromModule(knex, root, mod);
  for (const cMod of mod.getAllModules()) {
    final = final.concat(await dumpAllFromModuleRecursive(knex, root, mod));
  }
  return final;
}

async function getFile(container: pkgcloud.storage.Container, file: pkgcloud.storage.File) {
  const target = file.name.split("/");
  target.shift();
  const targetStr = path.join("dump", ...target);
  target.pop();
  const targetDir = path.join("dump", ...target);

  await fsAsync.mkdir(targetDir, { recursive: true });

  console.log("Copying " + file.name + " to " + targetStr);
  const targetStream = fs.createWriteStream(targetStr);

  container.client.download(
    {
      container,
      remote: file.name,
      stream: targetStream,
    } as any,
  );

  return new Promise((resolve, reject) => {
    targetStream.on("error", reject);
    targetStream.on("success", resolve);
  });
}

async function copyDataAt(domain: string, qualifiedPathName: string, idVersionHandle: string, container: pkgcloud.storage.Container) {
  return new Promise((resolve, reject) => {
    (container as any).getFiles({
      prefix: domain + "/" + qualifiedPathName + "/" + idVersionHandle + "/",
    }, (err: pkgcloud.ClientError, files: pkgcloud.storage.File[]) => {
      if (err) {
        reject(err);
      } else if (files && files.length) {
        return Promise.all(files.map(f => getFile(container, f)));
      } else {
        console.log("No files found on " + domain + "/" + qualifiedPathName + "/" + idVersionHandle + "/");
        resolve();
      }
    });
  })
}

async function copyDataOf(row: ISQLTableRowValue, root: Root, pkgcloudUploadContainers: PkgCloudContainers, domain: string) {
  console.log("dumping files of: " + colors.green(row.type + " " + row.id + " " + row.version));

  const idef = root.registry[row.type] as ItemDefinition;
  const mod = idef.getParentModule();

  let idUsed = row.container_id;
  let container = pkgcloudUploadContainers[idUsed];
  if (!container) {
    console.log(
      colors.red(
        "The expected container " +
        idUsed +
        " for this object does not exist in your configuration as such files cannot be copied"
      )
    );
    return;
  }

  console.log(colors.yellow("Using: ") + idUsed);
  await copyDataAt(domain, mod.getQualifiedPathName(), row.id + "." + (row.version || ""), container.container);
  await copyDataAt(domain, idef.getQualifiedPathName(), row.id + "." + (row.version || ""), container.container);
}

/**
 * Actually runs the dump
 */
export default async function dump(version: string, knex: Knex, root: Root) {
  let dumpfile: string = null;
  try {
    dumpfile = await fsAsync.readFile("dumpfile.json", "utf-8");
  } catch {
    console.log(colors.yellow("No dumpfile.json found, dumping everything"));
  }

  const sensitiveConfig: ISensitiveConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", version === "development" ? "index.sensitive.json" : `index.${version}.sensitive.json`), "utf8"),
  );

  const config: IConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", "index.json"), "utf8"),
  );

  const { pkgcloudUploadContainers} = await getPkgCloudContainers(config, sensitiveConfig);

  console.log(`Loaded ${Object.keys(pkgcloudUploadContainers).length} storage containers: ` +
    colors.yellow(Object.keys(pkgcloudUploadContainers).join(", ")));

  const dumpMap: IDumpMap = dumpfile ? JSON.parse(dumpfile) : null;

  const dumpEverything = !dumpMap ? true : dumpMap.dump === true;

  let final: ISQLTableRowValue[] = [];
  if (dumpMap && !dumpEverything && typeof dumpMap.dump !== "boolean") {
    for (const key of Object.keys(dumpMap.dump)) {
      const mod = root.getModuleFor(key.split("/"));
      const value = dumpMap.dump[key];
      if (value === true) {
        final = final.concat(await dumpFromModule(knex, root, mod));
      } else if (Array.isArray(value)) {
        final = final.concat(await dumpFromModule(knex, root, mod, value));
      } else if (value !== false) {
        for (const idefKey of Object.keys(dumpMap.dump[key])) {
          const idef = mod.getItemDefinitionFor(idefKey.split("/"));
          const idefValue = dumpMap.dump[key][idefKey];

          if (idefValue === true) {
            final = final.concat(await dumpFromIdef(knex, root, idef));
          } else if (Array.isArray(idefValue)) {
            final = final.concat(await dumpFromIdef(knex, root, idef, idefValue));
          }
        }
      }
    }
  } else if (dumpEverything) {
    for (const rootModule of root.getAllModules()) {
      final = final.concat(await dumpAllFromModuleRecursive(knex, root, rootModule));
    }
  }

  knex.destroy();

  let exists = true;
  try {
    await fsAsync.access("dump", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }

  try {
    let continueWithProcessing = true;
    if (!exists) {
      console.log(colors.yellow(`A dump folder hasn't been determined`));

      await fsAsync.mkdir("dump", { recursive: true });
    } else {
      continueWithProcessing = await yesno("Saving the dump will override the previous content, proceed?...");
      await fsAsync.rmdir("dump", { recursive: true });
      await fsAsync.mkdir("dump", { recursive: true });
    }

    if (continueWithProcessing) {
      console.log("emiting " + colors.green("dump/dump.json"));
      await fsAsync.writeFile("dump/dump.json", JSON.stringify(final, null, 2));

      for (const row of final) {
        await copyDataOf(
          row,
          root,
          pkgcloudUploadContainers,
          version === "development" ?
            config.developmentHostname :
            config.productionHostname
        );
      }
    }

    // say it's all done
    console.log(colors.green("All done..."));
  } catch (err) {
    console.log(colors.red(err.stack));
  }
};