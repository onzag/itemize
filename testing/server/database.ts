// import { Test } from "..";
// import { strict as assert } from "assert";
// import { ITestingInfoType } from "../itemize";
// import Module from "../../base/Root/Module";
// import { CURRENCY_FACTORS_IDENTIFIER, DELETED_REGISTRY_IDENTIFIER } from "../../constants";

// class ModuleTest extends Test {
//   private tables: any[];
//   private mod: Module;

//   constructor(tables: any[], mod: Module) {
//     super();

//     this.tables = tables;
//     this.mod = mod;
//   }

//   public describe() {
//     const idefs = this.mod.getAllChildDefinitionsRecursive();
//     const modchild = this.mod.getAllModules();

//     this.it(
//       "Should have a module level table",
//       () => {
//         const table = this.tables.find((t) => t.table_name === this.mod.getQualifiedPathName());
//         if (!table) {
//           assert.fail("Could not find a table for " + this.mod.getQualifiedPathName());
//         }
//       }
//     );

//     idefs.forEach((idef) => {
//       this.it(
//         "Should have a linked table for " + idef.getPath(),
//         () => {
//           const table = this.tables.find((t) => t.table_name === idef.getQualifiedPathName());
//           if (!table) {
//             assert.fail("Could not find a table for " + idef.getQualifiedPathName());
//           }
//         }
//       );
//     });

//     modchild.forEach((mod) => {
//       this.define(
//         "Module tests for " + mod.getPath(),
//         new ModuleTest(this.tables, mod),
//       );
//     });
//   }
// }

// export class DatabaseTest extends Test {
//   private testingInfo: ITestingInfoType;
//   private knex: Knex;
//   private allTables: any[];

//   constructor(knex: Knex, testingInfo: ITestingInfoType) {
//     super();

//     this.knex = knex;
//     this.testingInfo = testingInfo;
//   }
//   public async before() {
//     this.allTables = await
//       this.knex.select("table_name").from("information_schema.tables").where("table_schema", "public");
//   }
//   public describe() {
//     this.it(
//       "Should have a schema table",
//       () => {
//         const table = this.allTables.find((t) => t.table_name === "schema");
//         if (!table) {
//           assert.fail("Did not find a table for schema")
//         }
//       }
//     );

//     this.it(
//       "Should have a currency table",
//       () => {
//         const table = this.allTables.find((t) => t.table_name === CURRENCY_FACTORS_IDENTIFIER);
//         if (!table) {
//           assert.fail("Did not find a table for " + CURRENCY_FACTORS_IDENTIFIER)
//         }
//       }
//     );

//     this.it(
//       "Should have a deletition registry",
//       () => {
//         const table = this.allTables.find((t) => t.table_name === DELETED_REGISTRY_IDENTIFIER);
//         if (!table) {
//           assert.fail("Did not find a table for " + DELETED_REGISTRY_IDENTIFIER)
//         }
//       }
//     );

//     this.testingInfo.root.getAllModules().forEach((m) => {
//       this.define(
//         "Module tests for " + m.getPath(),
//         new ModuleTest(this.allTables, m),
//       );
//     });
//   }
// }