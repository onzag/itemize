import equals from "deep-equal";

import fs from "fs";
import path from "path";
import colors from "colors/safe";
import Knex from "knex";
import Confirm from "prompt-confirm";

import Root from "../base/Root";
import ItemDefinition from "../base/ItemDefinition";
import Module from "../base/Module";
import { RESERVED_BASE_PROPERTIES_SQL } from "../constants";

const fsAsync = fs.promises;

function yesno(question: string) {
  return (new Confirm(question)).run();
}

// Retrieve the config
(async () => {
  const dbConfig = JSON.parse(await fsAsync.readFile(
    path.join("config", "db.json"),
    "utf8",
  ));

  let migrationConfig = {};
  try {
    migrationConfig = JSON.parse(await fsAsync.readFile(
      path.join("config", "db-status.latest.json"),
      "utf8",
    ));
  } catch (e) {
    console.log(colors.yellow("Could not find a Migration File..."));
  }

  const dbConnectionKnexConfig = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  };

  const knex = Knex({
    client: "pg",
    debug: true,
    connection: dbConnectionKnexConfig,
  });

  console.log(colors.yellow(`attempting database connection at ${dbConnectionKnexConfig.host}...`));

  const data = JSON.parse(await fsAsync.readFile(
    path.join("dist", "data", "build.en.json"),
    "utf8",
  ));

  const root = new Root(data.root);
  let result = {};
  root.getAllModules().forEach((rModule) => {
    result = {...result, ...buildModuleTables(rModule)};
  });

  const optimal = {...result};
  const actual = {...result};
  const actualIgnoreErrors = {...result};
  await buildFromData(knex, migrationConfig, actual, actualIgnoreErrors);

  await fsAsync.writeFile(
    path.join("config", "db-status.latest.json"),
    JSON.stringify(actual, null, 2),
  );

  await fsAsync.writeFile(
    path.join("config", `db-status.${(new Date()).toJSON().replace(/:/g, ".")}.json`),
    JSON.stringify(actual, null, 2),
  );

  await fsAsync.writeFile(
    path.join("config", "db-status.ignore-errors.latest.json"),
    JSON.stringify(actualIgnoreErrors, null, 2),
  );

  await fsAsync.writeFile(
    path.join("config", `db-status.ignore-errors.${(new Date()).toJSON().replace(/:/g, ".")}.json`),
    JSON.stringify(actualIgnoreErrors, null, 2),
  );

  await fsAsync.writeFile(
    path.join("config", `db-status.${(new Date()).toJSON().replace(/:/g, ".")}.optimal.json`),
    JSON.stringify(optimal, null, 2),
  );

  await fsAsync.writeFile(
    path.join("config", `db-status.latest.optimal.json`),
    JSON.stringify(optimal, null, 2),
  );

  console.log(colors.green("All done..."));
})();

function buildModuleTables(rModule: Module) {
  let result = {};
  rModule.getAllModules().forEach((cModule) => {
    result = {...result, ...buildModuleTables(cModule)};
  });
  rModule.getAllChildItemDefinitions().forEach((cIdef) => {
    result = {...result, ...buildItemDefinitionTables(cIdef)};
  });
  return result;
}

function buildItemDefinitionTables(itemDefinition: ItemDefinition) {
  const qualifiedPathName = itemDefinition.getQualifiedPathName();

  const resultTableSchema = {...RESERVED_BASE_PROPERTIES_SQL};
  itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
    const sqlDef = pd.getPropertyDefinitionDescription().sql;
    if (typeof sqlDef === "string") {
      resultTableSchema[pd.getId()] = {
        type: sqlDef,
      };
    } else {
      const complexValue = sqlDef(pd.getId());
      Object.keys(complexValue).forEach((key) => {
        resultTableSchema[key] = {
          type: complexValue[key],
        };
      });
    }
  });
  itemDefinition.getAllItems().forEach((i) => {
    resultTableSchema["CHILD_" + i.getId()] = {
      type: "integer",
    };
  });

  const result = {};
  result[qualifiedPathName] = resultTableSchema;
  return result;
}

async function buildFromData(
  knex: Knex,
  previousMigrationConfig: any,
  newMigrationConfig: any,
  newMigrationConfigIgnoreErrors: any,
) {
  for (const qualifiedPathName of Object.keys(newMigrationConfig)) {
    const resultTableSchema = newMigrationConfig[qualifiedPathName];
    const resultTableSchemaIgnoreErrors = newMigrationConfigIgnoreErrors[qualifiedPathName];
    const oldResultTableSchema = previousMigrationConfig[qualifiedPathName];
    if (!oldResultTableSchema) {
      console.log(colors.yellow("Table for " + qualifiedPathName + " is missing"));

      const createQuery = knex.schema.withSchema("public").createTable(qualifiedPathName, (table) => {
        Object.keys(resultTableSchema).forEach((rowName) => {
          const rowData = resultTableSchema[rowName];
          let actualType = rowData.type;
          if (actualType === "serial") {
            actualType = "increments";
          }

          const tableRowExec = !table[actualType] ?
            table.specificType(rowName, actualType) :
            table[actualType](rowName);
          if (rowData.notNull) {
            tableRowExec.notNullable();
          }
        });
      });

      if (await yesno("Do you want to create the table? saying no might cause breaking changes")) {
        try {
          console.log(createQuery.toString());
        } catch (err) {
          console.log(colors.red(err.stack));
          console.log(colors.yellow("You might fix this issue and all others by hand and " +
              "rename db-status.ignore-errors.latest.json to db-status.latest.json"));
          delete newMigrationConfig[qualifiedPathName];
        }
      } else {
        delete newMigrationConfig[qualifiedPathName];
        delete newMigrationConfigIgnoreErrors[qualifiedPathName];
      }
    } else {
      for (const rowName of Object.keys(resultTableSchema)) {
        const newRowData = resultTableSchema[rowName];
        const oldRowData = oldResultTableSchema[rowName];

        if (!oldRowData) {
          console.log(colors.yellow("A new row at " + qualifiedPathName + " has been added named " + rowName));

          const updateQuery = knex.schema.withSchema("public").alterTable(qualifiedPathName, (table) => {
            let actualType = newRowData.type;
            if (actualType === "serial") {
              actualType = "increments";
            }
            const tableRowExec = !table[actualType] ?
            table.specificType(rowName, actualType) :
            table[actualType](rowName);
            if (newRowData.notNull) {
              tableRowExec.notNullable();
            }
          });

          if (await yesno("Do you want to add the new row? saying no might cause breaking changes")) {
            try {
              console.log(updateQuery.toString());
            } catch (err) {
              console.log(colors.red(err.stack));
              console.log(colors.yellow("You might fix this issue and all others by hand and " +
              "rename db-status.ignore-errors.latest.json to db-status.latest.json"));
              delete resultTableSchema[rowName];
            }
          } else {
            delete resultTableSchema[rowName];
            delete resultTableSchemaIgnoreErrors[rowName];
          }
        } else if (!equals(oldRowData, newRowData)) {
          let noOp = false;
          if (oldRowData.type !== newRowData.type) {
            console.log(colors.red("A row at " + qualifiedPathName + "." + rowName +
            " has been changed type from " + oldRowData.type + " to " + newRowData.type + " this is a no-op"));
            noOp = true;
          }

          if (!!oldRowData.notNull !== !!newRowData.notNull && newRowData.notNull) {
            console.log(colors.red("A row has changed from not being nullable to being nullable at " +
            qualifiedPathName + "." + rowName + " this is a no-op"));
            noOp = true;
          }

          const updateQuery = knex.schema.withSchema("public").alterTable(qualifiedPathName, (table) => {
            let actualType = newRowData.type;
            if (actualType === "serial") {
              actualType = "increments";
            }
            const tableRowExec = !table[actualType] ?
            table.specificType(rowName, actualType) :
            table[actualType](rowName);
            if (newRowData.notNull) {
              tableRowExec.notNullable();
            }

            tableRowExec.alter();
          });

          if (await yesno(
            noOp ?
            "Do you still want to alter such row? this is delicate and might fail" :
            "Do you wish to alter this row?",
          )) {
            try {
              console.log(updateQuery.toString());
            } catch (err) {
              console.log(colors.red(err.stack));
              console.log(colors.yellow("You might fix this issue and all others by hand and " +
              "rename db-status.ignore-errors.latest.json to db-status.latest.json"));
              delete resultTableSchema[rowName];
            }
          } else {
            delete resultTableSchema[rowName];
            delete resultTableSchemaIgnoreErrors[rowName];
          }
        }
      }

      for (const rowName of Object.keys(oldResultTableSchema)) {
        const newRowData = resultTableSchema[rowName];
        const oldRowData = oldResultTableSchema[rowName];

        if (!newRowData) {
          console.log(colors.yellow("A row at " + qualifiedPathName + " has been dropped, named " + rowName));

          const dropQuery = knex.schema.withSchema("public").alterTable(qualifiedPathName, (table) => {
            table.dropColumn(rowName);
          });

          if (await yesno("Do you want to drop the column? it's safe to leave it as it is")) {
            try {
              console.log(dropQuery.toString());
            } catch (err) {
              console.log(colors.red(err.stack));
              console.log(colors.yellow("You might fix this issue and all others by hand and " +
              "rename db-status.ignore-errors.latest.json to db-status.latest.json"));
              resultTableSchema[rowName] = oldRowData;
            }
          } else {
            resultTableSchema[rowName] = oldRowData;
            resultTableSchemaIgnoreErrors[rowName] = oldRowData;
          }
        }
      }
    }
  }

  for (const qualifiedPathName of Object.keys(previousMigrationConfig)) {
    if (!newMigrationConfig[qualifiedPathName]) {
      console.log(colors.yellow("Table for " + qualifiedPathName + " is not required anymore"));

      const dropQuery = knex.schema.withSchema("public").dropTable(qualifiedPathName);

      if (await yesno("Do you want to drop the table? it's safe to leave it as it is")) {
        try {
          console.log(dropQuery.toString());
        } catch (err) {
          console.log(colors.red(err.stack));
          console.log(colors.yellow("You might fix this issue and all others by hand and " +
              "rename db-status.ignore-errors.latest.json to db-status.latest.json"));
          newMigrationConfig[qualifiedPathName] = previousMigrationConfig[qualifiedPathName];
        }
      } else {
        newMigrationConfig[qualifiedPathName] = previousMigrationConfig[qualifiedPathName];
        newMigrationConfigIgnoreErrors[qualifiedPathName] = previousMigrationConfig[qualifiedPathName];
      }
    }
  }
}
