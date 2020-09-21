"use strict";
/**
 * Contains the dumper that dumps the database fractionally so that
 * it can be reloaded (refreshed)
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const safe_1 = __importDefault(require("colors/safe"));
const constants_1 = require("../constants");
const _1 = require(".");
const server_1 = require("../server");
const pkgcloud_1 = __importDefault(require("pkgcloud"));
const USING_DOCKER = JSON.parse(process.env.USING_DOCKER || "false");
const fsAsync = fs_1.default.promises;
async function dumpFromIdef(knex, root, idef, specifics) {
    console.log("dumping: " + safe_1.default.green(idef.getQualifiedPathName()));
    const idefTable = idef.getQualifiedPathName();
    const mod = idef.getParentModule();
    if (!specifics) {
        const result = await knex.select().from(mod.getQualifiedPathName()).join(idefTable, (clause) => {
            clause.on(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
            clause.on(constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
        });
        return result;
    }
    else {
        let final = [];
        for (const specific of specifics) {
            const query = knex.select().from(mod.getQualifiedPathName()).join(idefTable, (clause) => {
                clause.on(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
                clause.on(constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
            });
            let isVersioned = Array.isArray(specific);
            if (isVersioned) {
                query.where({
                    id: specific[0],
                    version: specific[1],
                });
            }
            else {
                query.where({
                    id: specific,
                });
            }
            const result = await query;
            final = final.concat(result);
        }
    }
}
async function dumpAllFromIdefRecursive(knex, root, idef) {
    let final = await dumpFromIdef(knex, root, idef);
    for (const cIdef of idef.getChildDefinitions()) {
        final = final.concat(await dumpAllFromIdefRecursive(knex, root, cIdef));
    }
    return final;
}
async function dumpFromModule(knex, root, mod, specifics) {
    console.log("dumping: " + safe_1.default.green(mod.getQualifiedPathName()));
    let final = [];
    if (!specifics) {
        for (const idef of mod.getAllChildItemDefinitions()) {
            final = final.concat(await dumpAllFromIdefRecursive(knex, root, idef));
        }
    }
    else {
        for (const specific of specifics) {
            const query = knex.select("type").from(mod.getQualifiedPathName());
            let isVersioned = Array.isArray(specific);
            if (isVersioned) {
                query.where({
                    id: specific[0],
                    version: specific[1],
                });
            }
            else {
                query.where({
                    id: specific,
                });
            }
            const partialResult = await query;
            for (const result of partialResult) {
                const idef = root.registry[result.type];
                final = final.concat(await dumpFromIdef(knex, root, idef, [specific]));
            }
        }
    }
    return final;
}
async function dumpAllFromModuleRecursive(knex, root, mod) {
    let final = await dumpFromModule(knex, root, mod);
    for (const cMod of mod.getAllModules()) {
        final = final.concat(await dumpAllFromModuleRecursive(knex, root, mod));
    }
    return final;
}
async function getFile(container, file) {
    console.log("Copying " + file.name);
    // TODO
}
async function copyDataAt(domain, qualifiedPathName, idVersionHandle, container) {
    return new Promise((resolve, reject) => {
        container.getFiles({
            prefix: domain + "/" + qualifiedPathName + "/" + idVersionHandle + "/",
        }, (err, files) => {
            if (err) {
                reject(err);
            }
            else if (files && files.length) {
                return Promise.all(files.map(f => getFile(container, f)));
            }
            else {
                console.log("No files found on " + domain + "/" + qualifiedPathName + "/" + idVersionHandle + "/");
                resolve();
            }
        });
    });
}
const STORED_CONTAINERS = {};
async function copyDataOf(row, root, pkgcloudUploadContainers, domain) {
    console.log("dumping files of: " + safe_1.default.green(row.type + " " + row.id + " " + row.version));
    const idef = root.registry[row.type];
    const mod = idef.getParentModule();
    let idUsed = row.container_id;
    let container = pkgcloudUploadContainers[idUsed];
    if (!container && typeof STORED_CONTAINERS[idUsed] === "undefined") {
        console.log(safe_1.default.yellow("The expected container " + idUsed + " for this object does not exist in your configuration"));
        // TODO request a container translation
    }
    else if (STORED_CONTAINERS[idUsed]) {
        idUsed = STORED_CONTAINERS[idUsed];
        container = pkgcloudUploadContainers[idUsed];
    }
    if (container) {
        console.log(safe_1.default.yellow("Using: ") + idUsed);
        await copyDataAt(domain, mod.getQualifiedPathName(), row.id + "." + (row.version || ""), container.container);
        await copyDataAt(domain, idef.getQualifiedPathName(), row.id + "." + (row.version || ""), container.container);
    }
}
/**
 * Actually runs the dump
 */
async function dump(version, knex, root) {
    let dumpfile = null;
    try {
        dumpfile = await fsAsync.readFile("dumpfile.json", "utf-8");
    }
    catch {
        console.log(safe_1.default.yellow("No dumpfile.json found, dumping everything"));
    }
    const sensitiveConfig = JSON.parse(await fsAsync.readFile(path_1.default.join("config", version === "development" ? "index.sensitive.json" : `index.${version}.sensitive.json`), "utf8"));
    const config = JSON.parse(await fsAsync.readFile(path_1.default.join("config", "index.json"), "utf8"));
    const pkgcloudStorageClients = {};
    const pkgcloudUploadContainers = {};
    if (sensitiveConfig.openstackContainers) {
        await Promise.all(Object.keys(sensitiveConfig.openstackContainers).map(async (containerIdX) => {
            const containerData = sensitiveConfig.openstackContainers[containerIdX];
            pkgcloudStorageClients[containerIdX] = pkgcloud_1.default.storage.createClient({
                provider: "openstack",
                username: containerData.username,
                keystoneAuthVersion: 'v3',
                region: containerData.region,
                domainId: containerData.domainId,
                domainName: containerData.domainName,
                password: containerData.password,
                authUrl: containerData.authUrl,
            });
            let prefix = config.containersHostnamePrefixes[containerIdX];
            if (!prefix) {
                process.exit(1);
            }
            if (prefix.indexOf("/") !== 0) {
                prefix = "https://" + prefix;
            }
            pkgcloudUploadContainers[containerIdX] = {
                prefix,
                container: await server_1.getContainerPromisified(pkgcloudStorageClients[containerIdX], containerData.containerName),
            };
        }));
    }
    console.log(`Loaded ${Object.keys(pkgcloudUploadContainers).length} storage containers: ` +
        safe_1.default.yellow(Object.keys(pkgcloudUploadContainers).join(", ")));
    const dumpMap = dumpfile ? JSON.parse(dumpfile) : null;
    let final = [];
    if (dumpMap) {
        for (const key of Object.keys(dumpMap)) {
            const mod = root.getModuleFor(key.split("/"));
            const value = dumpMap[key];
            if (value === true) {
                final = final.concat(await dumpFromModule(knex, root, mod));
            }
            else if (Array.isArray(value)) {
                final = final.concat(await dumpFromModule(knex, root, mod, value));
            }
            else if (value !== false) {
                for (const idefKey of Object.keys(dumpMap[key])) {
                    const idef = mod.getItemDefinitionFor(idefKey.split("/"));
                    const idefValue = dumpMap[key][idefKey];
                    if (idefValue === true) {
                        final = final.concat(await dumpFromIdef(knex, root, idef));
                    }
                    else if (Array.isArray(idefValue)) {
                        final = final.concat(await dumpFromIdef(knex, root, idef, idefValue));
                    }
                }
            }
        }
    }
    else {
        for (const rootModule of root.getAllModules()) {
            final = final.concat(await dumpAllFromModuleRecursive(knex, root, rootModule));
        }
    }
    knex.destroy();
    let exists = true;
    try {
        await fsAsync.access("dump", fs_1.default.constants.F_OK);
    }
    catch (e) {
        exists = false;
    }
    let continueWithProcessing = true;
    if (!exists) {
        console.log(safe_1.default.yellow(`A dump folder hasn't been determined`));
        await fsAsync.mkdir("dump", { recursive: true });
    }
    else {
        continueWithProcessing = await _1.yesno("Saving the dump will override the previous content, proceed?...");
    }
    if (continueWithProcessing) {
        console.log("emiting " + safe_1.default.green("dump/dump.json"));
        await fsAsync.writeFile("dump/dump.json", JSON.stringify(final, null, 2));
        for (const row of final) {
            await copyDataOf(row, root, pkgcloudUploadContainers, version === "development" ?
                config.developmentHostname :
                config.productionHostname);
        }
    }
    // say it's all done
    console.log(safe_1.default.green("All done..."));
}
exports.default = dump;
;
