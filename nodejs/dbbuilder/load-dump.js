"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const safe_1 = __importDefault(require("colors/safe"));
const _1 = require(".");
const server_1 = require("../server");
const sql_1 = require("../base/Root/Module/sql");
const constants_1 = require("../constants");
const fsAsync = fs_1.default.promises;
const USING_DOCKER = JSON.parse(process.env.USING_DOCKER || "false");
const CACHED_SCHEMAS = {};
async function loadDump(version, knex, root) {
    let dumpfile = null;
    try {
        dumpfile = await fsAsync.readFile("dumpfile.json", "utf-8");
    }
    catch {
        console.log(safe_1.default.yellow("No dumpfile.json found, containers cannot be mapped"));
    }
    const sensitiveConfig = JSON.parse(await fsAsync.readFile(path_1.default.join("config", version === "development" ? "index.sensitive.json" : `index.${version}.sensitive.json`), "utf8"));
    const config = JSON.parse(await fsAsync.readFile(path_1.default.join("config", "index.json"), "utf8"));
    const { pkgcloudUploadContainers } = await server_1.getPkgCloudContainers(config, sensitiveConfig);
    console.log(`Loaded ${Object.keys(pkgcloudUploadContainers).length} storage containers: ` +
        safe_1.default.yellow(Object.keys(pkgcloudUploadContainers).join(", ")));
    const dump = JSON.parse(await fsAsync.readFile(path_1.default.join("dump", "dump.json"), "utf-8")).sort((a, b) => {
        return a.id - b.id;
    });
    try {
        for (const row of dump) {
            const idef = root.registry[row.type];
            const mod = idef.getParentModule();
            const id = row.id;
            const version = row.version;
            console.log("loading dump for: " + row.type + " " + row.id + " " + row.version);
            const result = await knex.select("type", "created_by", "created_at", "edited_by").from(mod.getQualifiedPathName()).where({
                id,
                version,
            });
            const exists = !!result.length;
            let shouldInsertFiles = !exists;
            if (exists) {
                const obtainedType = result[0].type;
                if (obtainedType !== row.type) {
                    console.log(safe_1.default.yellow("Attention, the types of the row do not match, the dump specifies " +
                        row.type +
                        " but the current database specifies " +
                        obtainedType +
                        " a force method will be used"));
                }
                if (await _1.yesno("Please ensure you want to override this value")) {
                    const moduleRows = {};
                    const idefRows = {};
                    const schema = CACHED_SCHEMAS[mod.getQualifiedPathName()] || sql_1.getSQLTableDefinitionForModule(knex, mod);
                    CACHED_SCHEMAS[mod.getQualifiedPathName()] = schema;
                    Object.keys(row).forEach((key) => {
                        if (schema[key]) {
                            moduleRows[key] = row[key];
                        }
                        else {
                            idefRows[key] = row[key];
                        }
                    });
                    moduleRows.last_modified = knex.fn.now();
                    moduleRows.created_at = result[0].created_at || knex.fn.now();
                    moduleRows.created_by = result[0].created_by || constants_1.UNSPECIFIED_OWNER;
                    moduleRows.edited_by = result[0].edited_by || result[0].created_by || constants_1.UNSPECIFIED_OWNER;
                    await knex.update(moduleRows).from(mod.getQualifiedPathName()).where({
                        id,
                        version,
                    });
                    await knex.update(idefRows).from(idef.getQualifiedPathName()).where({
                        [constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME]: id,
                        [constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME]: version,
                    });
                    // TODO delete old files
                    shouldInsertFiles = true;
                }
                ;
            }
            else {
                const moduleRows = {};
                const idefRows = {};
                const schema = CACHED_SCHEMAS[mod.getQualifiedPathName()] || sql_1.getSQLTableDefinitionForModule(knex, mod);
                CACHED_SCHEMAS[mod.getQualifiedPathName()] = schema;
                Object.keys(row).forEach((key) => {
                    if (schema[key]) {
                        moduleRows[key] = row[key];
                    }
                    else {
                        idefRows[key] = row[key];
                    }
                });
                moduleRows.last_modified = knex.fn.now();
                moduleRows.created_at = knex.fn.now();
                moduleRows.created_by = constants_1.UNSPECIFIED_OWNER;
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
        console.log(safe_1.default.green("All done..."));
    }
    catch (err) {
        console.log(safe_1.default.red(err.stack));
    }
}
exports.default = loadDump;
