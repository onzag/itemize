import fs from "fs";
import path from "path";
import colors from "colors/safe";
import Knex from "knex";

import Root from "../base/Root";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { ISQLTableDefinitionType, ISQLTableRowValue } from "../base/Root/sql";
import { yesno } from ".";
import { getPkgCloudContainers } from "../server";
import { getSQLTableDefinitionForModule } from "../base/Root/Module/sql";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, UNSPECIFIED_OWNER } from "../constants";

const fsAsync = fs.promises;

const USING_DOCKER = JSON.parse(process.env.USING_DOCKER || "false");

const CACHED_SCHEMAS: {
  [qn: string]: ISQLTableDefinitionType;
} = {};
export default async function loadDump(version: string, knex: Knex, root: Root) {
  let dumpfile: string = null;
  try {
    dumpfile = await fsAsync.readFile("dumpfile.json", "utf-8");
  } catch {
    console.log(colors.yellow("No dumpfile.json found, containers cannot be mapped"));
  }

  const sensitiveConfig: ISensitiveConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", version === "development" ? "index.sensitive.json" : `index.${version}.sensitive.json`), "utf8"),
  );

  const config: IConfigRawJSONDataType = JSON.parse(
    await fsAsync.readFile(path.join("config", "index.json"), "utf8"),
  );

  const { pkgcloudUploadContainers } = await getPkgCloudContainers(config, sensitiveConfig);

  console.log(`Loaded ${Object.keys(pkgcloudUploadContainers).length} storage containers: ` +
    colors.yellow(Object.keys(pkgcloudUploadContainers).join(", ")));

  const dump: ISQLTableRowValue[] = JSON.parse(
    await fsAsync.readFile(path.join("dump", "dump.json"), "utf-8"),
  ).sort((a: ISQLTableRowValue, b: ISQLTableRowValue) => {
    return a.id - b.id;
  });

  try {
    for (const row of dump) {
      const idef = root.registry[row.type] as ItemDefinition;
      const mod = idef.getParentModule();

      const id = row.id;
      const version = row.version;

      console.log("loading dump for: " + row.type + " " + row.id + " " + row.version);

      const result = await knex.select("type", "created_by", "created_at", "edited_by").from(mod.getQualifiedPathName()).where({
        id,
        version,
      });

      const exists = !!result.length;
      let shouldInsertFiles: boolean = !exists;
      if (exists) {
        const obtainedType = result[0].type;
        if (obtainedType !== row.type) {
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

        if (await yesno("Please ensure you want to override this value")) {
          const moduleRows: ISQLTableRowValue = {};
          const idefRows: ISQLTableRowValue = {};

          const schema = CACHED_SCHEMAS[mod.getQualifiedPathName()] || getSQLTableDefinitionForModule(knex, mod);
          CACHED_SCHEMAS[mod.getQualifiedPathName()] = schema;

          Object.keys(row).forEach((key) => {
            if (schema[key]) {
              moduleRows[key] = row[key];
            } else {
              idefRows[key] = row[key];
            }
          });

          moduleRows.last_modified = knex.fn.now();
          moduleRows.created_at = result[0].created_at || knex.fn.now();
          moduleRows.created_by = result[0].created_by || UNSPECIFIED_OWNER;
          moduleRows.edited_by = result[0].edited_by || result[0].created_by || UNSPECIFIED_OWNER;

          await knex.update(moduleRows).from(mod.getQualifiedPathName()).where({
            id,
            version,
          });

          await knex.update(idefRows).from(idef.getQualifiedPathName()).where({
            [CONNECTOR_SQL_COLUMN_ID_FK_NAME]: id,
            [CONNECTOR_SQL_COLUMN_VERSION_FK_NAME]: version,
          });

          // TODO delete old files
          shouldInsertFiles = true;
        };
      } else {
        const moduleRows: ISQLTableRowValue = {};
        const idefRows: ISQLTableRowValue = {};

        const schema = CACHED_SCHEMAS[mod.getQualifiedPathName()] || getSQLTableDefinitionForModule(knex, mod);
        CACHED_SCHEMAS[mod.getQualifiedPathName()] = schema;

        Object.keys(row).forEach((key) => {
          if (schema[key]) {
            moduleRows[key] = row[key];
          } else {
            idefRows[key] = row[key];
          }
        });

        moduleRows.last_modified = knex.fn.now();
        moduleRows.created_at = knex.fn.now();
        moduleRows.created_by = UNSPECIFIED_OWNER;
        moduleRows.edited_by = null;

        await knex.transaction(async (transactionKnex) => {
          await transactionKnex(mod.getQualifiedPathName()).insert(moduleRows);
          await transactionKnex(idef.getQualifiedPathName()).insert(idefRows);
        });
      }

      if (shouldInsertFiles) {
        // TODO copy the files into the container based on the container rules
      }
    }

    knex.destroy();

    // say it's all done
    console.log(colors.green("All done..."));
  } catch (err) {
    console.log(colors.red(err.stack));
  }
}