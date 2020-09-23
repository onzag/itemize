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
const fsAsync = fs_1.default.promises;
/**
 * Dumps an item definition based on its configuration
 * @param knex the knex instance
 * @param root the root instance
 * @param idef the item definition in question
 * @param specifics how it is to be dumped, optional, will dump all if not provided
 */
async function dumpFromIdef(knex, root, idef, specifics) {
    console.log("dumping: " + safe_1.default.green(idef.getQualifiedPathName()));
    // we get the table name and module
    const idefTable = idef.getQualifiedPathName();
    const mod = idef.getParentModule();
    // if no specifics have been given
    if (!specifics) {
        // dump everything, joins included
        const result = await knex.select().from(mod.getQualifiedPathName()).join(idefTable, (clause) => {
            clause.on(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
            clause.on(constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
        });
        // return that
        return result;
    }
    else {
        // otherwise we are only dumping certain of these
        let final = [];
        // so we loop
        for (const specific of specifics) {
            // and query each of them
            const query = knex.select().from(mod.getQualifiedPathName()).join(idefTable, (clause) => {
                clause.on(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
                clause.on(constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
            });
            // if it's versioned (this means we are sure only getting one)
            let isVersioned = Array.isArray(specific);
            // we add that to the query
            if (isVersioned) {
                query.where({
                    id: specific[0],
                    version: specific[1],
                });
            }
            else {
                // otherwise it's only the id
                query.where({
                    id: specific,
                });
            }
            // now we get the result
            const result = await query;
            // and concatenate the thing
            final = final.concat(result);
        }
    }
}
/**
 * Dumps all from an item definition recursively and returns the resulting dump
 * @param knex the knex instance
 * @param root the root instance
 * @param idef the item definition in question
 */
async function dumpAllFromIdefRecursive(knex, root, idef) {
    // very simple we use the dump from idef function without specifics
    let final = await dumpFromIdef(knex, root, idef);
    // and get into all the children
    for (const cIdef of idef.getChildDefinitions()) {
        // and dump those too
        final = final.concat(await dumpAllFromIdefRecursive(knex, root, cIdef));
    }
    // return that
    return final;
}
/**
 * Dumps all the content of a module, if using specifics will only dump certain of them
 * @param knex the knex instance
 * @param root the root instance
 * @param mod the module in question
 * @param specifics an optional parameter to specify what it is to be dumped
 */
async function dumpFromModule(knex, root, mod, specifics) {
    // inform the developer
    console.log("dumping: " + safe_1.default.green(mod.getQualifiedPathName()));
    // now we got to fetch this
    let final = [];
    // we are giving no specifics
    if (!specifics) {
        // as such we got to basically copy everything into the children item
        // definitions as everything is extending that module, so we got to copy it
        for (const idef of mod.getAllChildItemDefinitions()) {
            final = final.concat(await dumpAllFromIdefRecursive(knex, root, idef));
        }
    }
    else {
        // otherwise we are going over what specifics we are going to copy
        for (const specific of specifics) {
            // we need to know the type for that, so we fetch it
            const query = knex.select("type").from(mod.getQualifiedPathName());
            // and now similarly filter by version and id, depending on the specific
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
            // and now we get our results
            const partialResult = await query;
            // we loop in them and get the type
            for (const result of partialResult) {
                // and we dump from the item definition itself
                const idef = root.registry[result.type];
                final = final.concat(await dumpFromIdef(knex, root, idef, [specific]));
            }
        }
    }
    // return that
    return final;
}
/**
 * Dumps literally everything in the module recursively
 * @param knex the knex instance
 * @param root the root instance
 * @param mod the module in question
 */
async function dumpAllFromModuleRecursive(knex, root, mod) {
    // similarly we dump from module without specifics
    let final = await dumpFromModule(knex, root, mod);
    // then we get all child modules
    for (const cMod of mod.getAllModules()) {
        // put that in
        final = final.concat(await dumpAllFromModuleRecursive(knex, root, cMod));
    }
    // and provide finals
    return final;
}
/**
 * Fetches a file from a given upload container that is already defined and stores it locally
 * @param container the container in question
 * @param file the file
 */
async function getFile(container, file) {
    // first our file comes with the hosname.com/MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
    // we split it!
    const target = file.name.split("/");
    // this will remove the hostname leaving it as MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
    target.shift();
    // and now it is dump/MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
    const targetStr = path_1.default.join("dump", ...target);
    // this removes the filename
    target.pop();
    // so now it is MOD_something__IDEF_else/1.version/property/FILE121231231
    const targetDir = path_1.default.join("dump", ...target);
    // we need to ensure that directory
    await fsAsync.mkdir(targetDir, { recursive: true });
    // and now we got to download the files and copy them there, that might take a while
    console.log("Copying " + file.name + " to " + targetStr);
    // we create a stream for the target, dump/MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
    const targetStream = fs_1.default.createWriteStream(targetStr);
    // and download into that stream
    container.client.download({
        container,
        remote: file.name,
        stream: targetStream,
    });
    // return a promise off it
    return new Promise((resolve, reject) => {
        targetStream.on("error", reject);
        targetStream.on("success", resolve);
    });
}
/**
 * Performs a copy where everything that is contained as data for a given file is copied
 * and donwloaded into the dump folder
 * @param domain the domain eg. mysite.com
 * @param qualifiedPathName the qualified path name we are getting for MOD_users or MOD_users__IDEF_user remember that modules store
 * in their own location for propextensions
 * @param idVersionHandle the id and version handle, as a string, this means 1.version or 1. alone... it's basically both of them
 * concatenated and separated by a dot
 * @param container the container in question
 */
async function copyDataAt(domain, qualifiedPathName, idVersionHandle, container) {
    // so we return a new promise
    return new Promise((resolve, reject) => {
        // get all the files, and build where we are seeking for them
        container.getFiles({
            prefix: domain + "/" + qualifiedPathName + "/" + idVersionHandle + "/",
        }, (err, files) => {
            // and now we can ask for all these files
            if (err) {
                reject(err);
            }
            else if (files && files.length) {
                // we get them as a bunch
                return Promise.all(files.map(f => getFile(container, f)));
            }
            else {
                console.log("No files found on " + domain + "/" + qualifiedPathName + "/" + idVersionHandle + "/");
                resolve();
            }
        });
    });
}
/**
 * Performs the copy of the data that is necessary for a given row
 * @param row the row in question
 * @param root the root
 * @param pkgcloudUploadContainers all the upload containers
 * @param domain the domain in question
 */
async function copyDataOf(row, root, pkgcloudUploadContainers, domain) {
    console.log("dumping files of: " + safe_1.default.green(row.type + " " + row.id + " " + row.version));
    // so we need the idef and the module
    const idef = root.registry[row.type];
    const mod = idef.getParentModule();
    // and now we'll see our container and download the data from there
    let idUsed = row.container_id;
    let container = pkgcloudUploadContainers[idUsed];
    if (!container) {
        console.log(safe_1.default.red("The expected container " +
            idUsed +
            " for this object does not exist in your configuration as such files cannot be copied"));
        return;
    }
    // we can log this what container we are using
    console.log(safe_1.default.yellow("Using: ") + idUsed);
    // and now we can attempt to copy the data for it
    await copyDataAt(domain, mod.getQualifiedPathName(), row.id + "." + (row.version || ""), container.container);
    await copyDataAt(domain, idef.getQualifiedPathName(), row.id + "." + (row.version || ""), container.container);
}
/**
 * Actually runs the dump
 * @param version either development or production
 * @param knex the knex database instance to read from
 * @param root the root instance
 */
async function dump(version, knex, root) {
    // We will need all these config
    const sensitiveConfig = JSON.parse(await fsAsync.readFile(path_1.default.join("config", version === "development" ? "index.sensitive.json" : `index.${version}.sensitive.json`), "utf8"));
    const config = JSON.parse(await fsAsync.readFile(path_1.default.join("config", "index.json"), "utf8"));
    const dumpConfig = JSON.parse(await fsAsync.readFile(path_1.default.join("config", "dump.json"), "utf8"));
    // and our pkgcloud containers
    const { pkgcloudUploadContainers } = await server_1.getPkgCloudContainers(config, sensitiveConfig);
    // we can specify we have loaded them
    console.log(`Loaded ${Object.keys(pkgcloudUploadContainers).length} storage containers: ` +
        safe_1.default.yellow(Object.keys(pkgcloudUploadContainers).join(", ")));
    // and now we can start dumping
    let final = [];
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
            if (value === true) {
                // we dump all for that module
                final = final.concat(await dumpFromModule(knex, root, mod));
            }
            else if (Array.isArray(value)) {
                // otherwise for arrays, we are being specific on what we are dumping
                // we pass that as the specific
                final = final.concat(await dumpFromModule(knex, root, mod, value));
            }
            else if (value !== false) {
                // otherwise we likely have a custom configuration of specific
                // item definitions we are deploying to the dump folder
                for (const idefKey of Object.keys(dumpConfig.save[key])) {
                    // we got to find them, and so we get it
                    const idef = mod.getItemDefinitionFor(idefKey.split("/"));
                    // and then we see what's the config for it
                    const idefValue = dumpConfig.save[key][idefKey];
                    // if it's a simple true
                    if (idefValue === true) {
                        // we do the same and just dump the idef content
                        final = final.concat(await dumpFromIdef(knex, root, idef));
                    }
                    else if (Array.isArray(idefValue)) {
                        // otherwise the parameters must be a specifics list
                        final = final.concat(await dumpFromIdef(knex, root, idef, idefValue));
                    }
                }
            }
        }
    }
    else if (dumpConfig.save === true) {
        // so we got this message here
        console.log(safe_1.default.yellow("Warning: ") + "you are dumping everything");
        // and now we got to ask the developer if that's what they really want
        if (await _1.yesno("Are you sure you want to proceed, your dump includes everything, including user passwords")) {
            // okay so we do it
            for (const rootModule of root.getAllModules()) {
                // can be useful for development I guess
                final = final.concat(await dumpAllFromModuleRecursive(knex, root, rootModule));
            }
        }
    }
    // destroy the database connection
    knex.destroy();
    // now we need the dump directory
    let exists = true;
    try {
        await fsAsync.access("dump", fs_1.default.constants.F_OK);
    }
    catch (e) {
        exists = false;
    }
    // and here we go to save it
    try {
        let continueWithProcessing = true;
        if (!exists) {
            console.log(safe_1.default.yellow(`A dump folder hasn't been determined`));
            // add the folder
            await fsAsync.mkdir("dump", { recursive: true });
        }
        else {
            // we ask the user if they want to remove their old dump folder
            // as we need to do that, there can only be one dump at a time
            continueWithProcessing = await _1.yesno("Saving the dump will override the previous content, proceed?...");
            // remove and readd
            await fsAsync.rmdir("dump", { recursive: true });
            await fsAsync.mkdir("dump", { recursive: true });
        }
        // okay then we continue the process
        if (continueWithProcessing) {
            // emit the dump file
            console.log("emiting " + safe_1.default.green("dump/dump.json"));
            // write it
            await fsAsync.writeFile("dump/dump.json", JSON.stringify(final, null, 2));
            // and now we need to fetch all these files for the dump
            for (const row of final) {
                // so we pass them one at a time
                await copyDataOf(row, root, pkgcloudUploadContainers, version === "development" ?
                    config.developmentHostname :
                    config.productionHostname);
            }
        }
        // say it's all done
        console.log(safe_1.default.green("All done..."));
    }
    catch (err) {
        // something bad happened
        console.log(safe_1.default.red(err.stack));
    }
}
exports.default = dump;
