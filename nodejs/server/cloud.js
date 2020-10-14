"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudClient = void 0;
const pkgcloud_1 = __importDefault(require("pkgcloud"));
const _1 = require(".");
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");
;
/**
 * Provides the pkgloud client container from ovh
 * @param client the client to use
 * @param containerName the container name
 */
function getContainerPromisified(client, containerName) {
    return new Promise((resolve, reject) => {
        client.getContainer(containerName, (err, container) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(container);
            }
        });
    });
}
class CloudClient {
    constructor(id, prefix) {
        this.prefix = prefix;
        this.id = id;
    }
    getPrefix() {
        return this.prefix;
    }
    getId() {
        return this.id;
    }
    async setAsOpenstack(data, containerName) {
        _1.logger && _1.logger.info("CloudClient.setAsOpenstack: retrieving openstack container " + containerName + " in container id " + this.id);
        this.pkgCloudOpenstackClient = pkgcloud_1.default.storage.createClient(data);
        this.pkgCloudOpenstackContainer = await getContainerPromisified(this.pkgCloudOpenstackClient, containerName);
    }
    setAsLocal() {
        this.isLocal = true;
        _1.logger && _1.logger.warn("CloudClient.setAsLocal: cloud identified with " + this.id + " initialized in local mode, this mode is non-scalable and can only work with 1 cluster");
    }
    /**
   * Verifies whether a given uploaded resource is actually ready, as
   * containers, might have been done uploading but are not ready to serve
   * the file itself
   * @param url the url to verify
   * @param done the callback once it's done
   */
    verifyResourceIsReady(url, done) {
        // so we get the url string value, for debugging purposes
        const strURL = url.toString();
        CAN_LOG_DEBUG && _1.logger && _1.logger.debug("CloudClient.verifyResourceIsReady: Verifying readiness of " + strURL);
        // now we use https to call and do a head request to check the status
        https_1.default.get({
            method: "HEAD",
            host: url.host,
            path: url.pathname,
        }, (resp) => {
            // status is succesful
            if (resp.statusCode === 200 || resp.statusCode === 0) {
                CAN_LOG_DEBUG && _1.logger && _1.logger.debug("CloudClient.verifyResourceIsReady: Verification succeed " + strURL);
                done();
            }
            else {
                // otherwise we wait 100 milliseconds, and recursively execute until it's ready
                CAN_LOG_DEBUG && _1.logger && _1.logger.debug("CloudClient.verifyResourceIsReady: Resource is not yet ready " + strURL);
                setTimeout(this.verifyResourceIsReady.bind(this, url, done), 100);
            }
        });
    }
    async upload(remote, readStream, verify) {
        if (this.pkgCloudOpenstackContainer) {
            const writeStream = this.pkgCloudOpenstackContainer.client.upload({
                container: this.pkgCloudOpenstackContainer,
                remote,
            });
            readStream.pipe(writeStream);
            return new Promise((resolve, reject) => {
                writeStream.on("finish", () => {
                    if (!verify) {
                        resolve();
                    }
                    else {
                        this.verifyResourceIsReady(new URL(this.prefix + remote), resolve);
                    }
                });
                writeStream.on("error", reject);
            });
        }
        else {
            const targetPath = remote.split("/");
            if (targetPath[0] === "") {
                targetPath.shift();
            }
            const fileName = targetPath.pop();
            await fsAsync.mkdir(path_1.default.join("uploads", ...targetPath), {
                recursive: true,
            });
            const writeStream = fs_1.default.createWriteStream(path_1.default.join("uploads", ...targetPath, fileName));
            readStream.pipe(writeStream);
            return new Promise((resolve, reject) => {
                writeStream.on("finish", () => {
                    resolve();
                });
                writeStream.on("error", reject);
            });
        }
    }
    async removeFolder(mainPath) {
        if (this.pkgCloudOpenstackContainer) {
            return new Promise((resolve, reject) => {
                CAN_LOG_DEBUG && _1.logger && _1.logger.debug("CloudClient.removeFolderFor: Deleting folder for", { mainPath });
                this.pkgCloudOpenstackContainer.getFiles({
                    prefix: mainPath,
                }, (err, files) => {
                    if (err) {
                        reject(err);
                    }
                    else if (files && files.length) {
                        CAN_LOG_DEBUG && _1.logger && _1.logger.debug("CloudClient.removeFolderFor: Bulk deleting", { files });
                        this.pkgCloudOpenstackClient.bulkDelete(this.pkgCloudOpenstackContainer, files, (err) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve();
                            }
                        });
                    }
                    else {
                        CAN_LOG_DEBUG && _1.logger && _1.logger.debug("CloudClient.removeFolder: Could not find any files");
                        resolve();
                    }
                });
            });
        }
        else {
            CAN_LOG_DEBUG && _1.logger && _1.logger.debug("CloudClient.removeFolderFor: Deleting folder for", { mainPath });
            const targetPath = mainPath.split("/");
            if (targetPath[0] === "") {
                targetPath.shift();
            }
            try {
                await fsAsync.rmdir(path_1.default.join("uploads", ...targetPath), {
                    recursive: true,
                });
            }
            catch {
                CAN_LOG_DEBUG && _1.logger && _1.logger.debug("CloudClient.removeFolder: Could not find any local files");
            }
        }
    }
    async downloadPkgCloudFile(file, localTarget) {
        // first our file comes with the hosname.com/MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
        // we split it!
        const target = file.name.split("/");
        // this will remove the hostname leaving it as MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
        target.shift();
        // and now it is localTarget/MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
        const targetStr = path_1.default.join(localTarget, ...target);
        // this removes the filename
        target.pop();
        // so now it is MOD_something__IDEF_else/1.version/property/FILE121231231
        const targetDir = path_1.default.join(localTarget, ...target);
        // we need to ensure that directory
        await fsAsync.mkdir(targetDir, { recursive: true });
        // and now we got to download the files and copy them there, that might take a while
        console.log("Copying " + file.name + " to " + targetStr);
        // we create a stream for the target, dump/MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
        const targetStream = fs_1.default.createWriteStream(targetStr);
        // and download into that stream
        this.pkgCloudOpenstackClient.download({
            container: this.pkgCloudOpenstackContainer,
            remote: file.name,
            stream: targetStream,
        });
        // return a promise off it
        return new Promise((resolve, reject) => {
            targetStream.on("error", reject);
            targetStream.on("success", resolve);
        });
    }
    async dumpEntireFolder(source, localTarget) {
        if (this.pkgCloudOpenstackContainer) {
            // so we return a new promise
            return new Promise((resolve, reject) => {
                // get all the files, and build where we are seeking for them
                this.pkgCloudOpenstackContainer.getFiles({
                    prefix: source,
                }, (err, files) => {
                    // and now we can ask for all these files
                    if (err) {
                        reject(err);
                    }
                    else if (files && files.length) {
                        // we get them as a bunch
                        return Promise.all(files.map(f => this.downloadPkgCloudFile(f, localTarget)));
                    }
                    else {
                        resolve();
                    }
                });
            });
        }
    }
    async checkExists(at) {
        if (this.pkgCloudOpenstackContainer) {
            return new Promise((resolve, reject) => {
                const strURL = path_1.default.join(this.prefix, at);
                const url = new URL(strURL);
                try {
                    https_1.default.get({
                        method: "HEAD",
                        host: url.host,
                        path: url.pathname,
                    }, (resp) => {
                        if (resp.statusCode === 200 || resp.statusCode === 0) {
                            _1.logger && _1.logger.info("CloudClient.checkExists: Checking succeed " + at);
                        }
                        else {
                            _1.logger && _1.logger.info("CloudClient.checkExists: Checking failed " + at);
                        }
                        return resolve(resp.statusCode === 200 || resp.statusCode === 0);
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        else {
            const localPath = path_1.default.join("uploads", at);
            let exists = true;
            try {
                await fsAsync.access(localPath, fs_1.default.constants.F_OK);
                _1.logger && _1.logger.info("CloudClient.checkExists: Checking succeed " + at);
            }
            catch (e) {
                exists = false;
                _1.logger && _1.logger.info("CloudClient.checkExists: Checking failed " + at);
            }
            return exists;
        }
    }
    /**
     * Runs a get request to retrieve one of those index files
     * @param at where to run the fetch at
     */
    async getFileStr(at) {
        if (this.pkgCloudOpenstackContainer) {
            return new Promise((resolve, reject) => {
                const strURL = path_1.default.join(this.prefix, at);
                const url = new URL(strURL);
                try {
                    https_1.default.get({
                        method: "GET",
                        host: url.host,
                        path: url.pathname,
                    }, (resp) => {
                        if (resp.statusCode === 200 || resp.statusCode === 0) {
                            _1.logger && _1.logger.info("CloudClient.getFileStr: Retrieving succeed " + at);
                            let data = "";
                            resp.on("data", (chunk) => {
                                data += chunk;
                            });
                            resp.on("error", (err) => {
                                reject(err);
                            });
                            resp.on("end", () => {
                                resolve(data);
                            });
                        }
                        else {
                            _1.logger.info("CloudClient.getFileStr: Retrieving failed " + at);
                            resolve(null);
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        else {
            const localPath = path_1.default.join("uploads", at);
            try {
                return await fsAsync.readFile(localPath, "utf-8");
            }
            catch {
                _1.logger.info("CloudClient.getFileStr: Retrieving failed " + at);
                return null;
            }
        }
    }
    async getFileJSON(at) {
        const data = await this.getFileStr(at);
        return JSON.parse(data);
    }
}
exports.CloudClient = CloudClient;
