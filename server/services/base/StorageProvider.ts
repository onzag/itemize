import { Readable } from "stream";
import { ServiceProvider, ServiceProviderType } from "..";

import express from "express";
import { jwtSign } from "../../token";
import { httpRequest } from "../../request";
import { CLUSTER_ID, NODE_ENV } from "../../environment";

import path from "path";
import https from "https";
import uuid from "uuid";

/**
 * The storage provide determines how files are to be stored in the cluster,
 * there's one particular thing and that is that files are always retrieved
 * over the /uploads/:clusterid endpoint building a cdn
 * based on the cluster
 * 
 * you may use your own custom solution, as you wish, based on redirects, S3, hard drive, etc...
 * By default itemize will ship with local-storage for using hard drive based storage
 */
export default class StorageProvider<T> extends ServiceProvider<T> {
  public storageJWTKey: string = null;
  public domain: string = null;
  private localId: string = null;

  public static getType() {
    return ServiceProviderType.NONE;
  }

  public async initialize(): Promise<void> {
    this.storageJWTKey = await this.registry.createJWTSecretFor("STORAGE_KEY");

    this.domain = NODE_ENV === "production" ? this.appConfig.productionHostname : this.appConfig.developmentHostname;

    // make a local id from the available functions
    // in practise this local id will never be overwritten
    // because it's available in all instances
    const localIdExists = await this.existsOwn("uuid");
    if (!localIdExists) {
      // create a new uuid
      const readable = new Readable();
      const savePromise = this.save("uuid", readable);
      this.localId = uuid.v4();
      readable.push(this.localId);
      readable.push(null);
      await savePromise;
    } else {
      const rs = this.readOwn("uuid");
      const promise = new Promise<void>((resolve, reject) => {
        this.localId = "";
        rs.on("data", (chunk: string) => {
          this.localId += chunk;
        });
        rs.on("end", () => {
          resolve();
        });
        rs.on("error", (err: Error) => {
          reject(err);
        });
      });
      await promise;
    }
  }

  /**
   * this is used to return a string that uniquely identifies the storage
   * that we are using to ensure that it is the same storage
   */
  public async getOwnStorageUuid(): Promise<string> {
    return this.localId;
  }

  /**
   * Default behaviour when receiving a request in order to solve a file
   * 
   * @param req the express request
   * @param res the express response
   * @param next the express next
   * 
   * Sxpect the request to come from /uploads/:clusterid/...
   * 
   * @override
   */
  public serve(req: express.Request, res: express.Response, next: (err?: Error) => void) {

  }

  /**
   * Used to list the files at a given location path
   * 
   * NECESSARY FOR DUMPING
   * 
   * @param at
   * @override 
   */
  public async listOwnFiles(at: string): Promise<string[]> {
    return null;
  }

  /**
   * It's executed to verify whether a given resource
   * exists
   * 
   * @param url the resource to check for
   */
  public async listFilesAt(at: string, clusterId: string): Promise<string[]> {
    if (clusterId === CLUSTER_ID) {
      return this.listOwnFiles(at);
    }

    const hostname = this.appSensitiveConfig.clusters[clusterId]?.hostname;

    if (!hostname) {
      throw new Error("Cluster " + clusterId + " does not exist");
    }

    const pathToRequest = path.join("/uploads/" + clusterId, at);
    const token = await jwtSign({ pathname: pathToRequest }, this.storageJWTKey);

    this.logDebug({
      className: "LocalStorageService",
      methodName: "removeRemoteFolder",
      message: "Attempting to list files at " + pathToRequest + " at host: " + hostname,
    });

    const res = await httpRequest<string[]>({
      method: "GET",
      host: hostname,
      path: pathToRequest,
      isHttps: true,
      returnNonOk: true,
      headers: {
        token,
        Accept: "application/json",
      },
      processAsJSON: true,
    });

    return res.data;
  }

  /**
   * This function is executed when the service
   * uploading a read stream
   * 
   * NECESSARY FOR CORE ITEMIZE TO FUNCTION
   * 
   * @param at the remote file to use
   * @param readStream the stream to read from
   * @override
   */
  public async save(at: string, readStream: NodeJS.ReadableStream | Readable, options: {dump?: boolean} = {}): Promise<void> {

  }

  public async saveRemote(at: string, clusterId: string, readStream: NodeJS.ReadableStream | Readable, options: {alwaysUseHttp?: boolean} = {}) {
    if (!options.alwaysUseHttp && clusterId === CLUSTER_ID) {
      return this.save(at, readStream);
    }

    const hostname = this.appSensitiveConfig.clusters[clusterId]?.hostname;

    if (!hostname) {
      throw new Error("Cluster " + clusterId + " does not exist");
    }

    const pathToRequest = path.join("/uploads/" + clusterId, at);

    const token = await jwtSign({ pathname: pathToRequest }, this.storageJWTKey);

    this.logDebug({
      className: "LocalStorageService",
      methodName: "saveRemote",
      message: "Attempting to upload file at " + pathToRequest + " at host: " + hostname,
    });

    const res = await httpRequest<string[]>({
      method: "POST",
      host: hostname,
      path: pathToRequest,
      isHttps: true,
      returnNonOk: true,
      headers: {
        token,
      },
      stream: readStream,
    });

    if (res.response.statusCode !== 200) {
      throw new Error("File failed to upload at " + pathToRequest + " at host: " + hostname);
    }

    return;
  }

  /**
   * This function is nasyncecessary for downloading a file
   * 
   * @param at the remote file to download
   * @override
   */
  public readOwn(at: string): NodeJS.ReadableStream {
    return null;
  }

  /**
   * This function is necessary for downloading a file
   * 
   * @param at the remote file to download
   * @override
   */
  public readAt(at: string, clusterId: string): NodeJS.ReadableStream {
    if (clusterId === CLUSTER_ID) {
      return this.readOwn(at);
    }

    const hostname = this.appSensitiveConfig.clusters[clusterId]?.hostname;

    if (!hostname) {
      throw new Error("Cluster " + clusterId + " does not exist");
    }

    const pathToRequest = path.join("/uploads/" + clusterId, at);

    const stream = https.get("https://" + hostname + pathToRequest);
    return stream as unknown as NodeJS.ReadableStream;
  }

  /**
   * This function is executed once a folder
   * removal is requested
   * 
   * NECESSARY FOR CORE ITEMIZE TO FUNCTION
   * 
   * @param at the remote folder to remove
   * @override
   */
  public async removeOwnPath(at: string): Promise<void> {

  }

  /**
   * This function is executed for removing folders
   * in other providers
   * 
   * NECESSARY FOR CORE ITEMIZE TO FUNCTION
   * 
   * You may override at will, but since the endpoint already has a DELETE action
   * you may only need to handle removePath
   * 
   * @param at 
   */
  public async removePathAt(at: string, clusterId: string): Promise<void> {
    if (clusterId === CLUSTER_ID) {
      return this.removeOwnPath(at);
    }

    const hostname = this.appSensitiveConfig.clusters[clusterId]?.hostname;

    if (!hostname) {
      throw new Error("Cluster " + clusterId + " does not exist");
    }

    const pathToRequest = path.join("/uploads/" + clusterId, at);
    const token = await jwtSign({ pathname: pathToRequest }, this.storageJWTKey);

    this.logDebug({
      className: "LocalStorageService",
      methodName: "removeRemoteFolder",
      message: "Attempting to remove remote file " + pathToRequest + " at host: " + hostname,
    });

    const res = await httpRequest({
      method: "DELETE",
      host: hostname,
      path: pathToRequest,
      headers: {
        token,
      },
      isHttps: true,
      returnNonOk: true,
    });

    if (res.response.statusCode === 200) {
      return;
    } else {
      const err = new Error("Failed to remove file at " + pathToRequest + " at host: " + hostname);
      this.logError({
        className: "LocalStorageService",
        methodName: "removeRemoteFolder",
        message: err.message,
        err: err,
        data: {
          pathToRequest,
          hostname,
        }
      });
      throw err;
    }
  }

  /**
   * It's executed to verify whether a given resource
   * exists
   * 
   * NECESSARY FOR CORE ITEMIZE TO FUNCTION
   * 
   * @param at the resource to check for
   * @override
   */
  public async existsOwn(at: string): Promise<boolean> {
    return false;
  }

  /**
   * It's executed to verify whether a given resource
   * exists and is a file
   * 
   * @param at the resource to check for
   */
  public async existsAt(at: string, clusterId: string): Promise<boolean> {
    if (clusterId === CLUSTER_ID) {
      return this.existsOwn(at);
    }

    const hostname = this.appSensitiveConfig.clusters[clusterId]?.hostname;

    if (!hostname) {
      throw new Error("Cluster " + clusterId + " does not exist");
    }

    const pathToRequest = path.join("/uploads/" + clusterId, at);

    this.logDebug({
      className: "LocalStorageService",
      methodName: "existsRemote",
      message: "Attempting check existance of remote file " + pathToRequest + " at host: " + hostname,
    });

    const res = await httpRequest({
      method: "HEAD",
      host: hostname,
      path: pathToRequest,
      isHttps: true,
      returnNonOk: true,
    });

    return res.response.statusCode === 200;
  }


  /**
   * Should copy a folder from one container to another target container, note that during
   * calls the target container may be itself, optimize if necessary for such calls
   * 
   * NECESSARY FOR CACHE COPY CALLS TO FUNCTION
   * 
   * @param remotePath 
   * @param targetPath 
   * @override
   */
  public async copyOwn(at: string, targetPath: string, options: { dump?: boolean } = {}): Promise<{ found: boolean }> {
    return null;
  }

  /**
   * Should copy a folder from one container to another target container, note that during
   * calls the target container may be itself, optimize if necessary for such calls
   * 
   * NECESSARY FOR ITEMIZE CDN TO FUNCTION
   * 
   * @param sourceUrl 
   * @param targetPath 
   */
  public async copyRemoteAt(
    at: string,
    clusterId: string,
    localTargetPath: string,
    options: { dump?: boolean } = {},
  ): Promise<{ found: boolean }> {
    if (!options.dump && clusterId === CLUSTER_ID) {
      return this.copyOwn(at, localTargetPath, options);
    }

    // get the file list for the remote
    const fileList = await this.listFilesAt(at, clusterId);

    // if the file list lenght is greater than zero
    if (fileList.length === 0) {
      return { found: false };
    }

    // grab the subdomain for that
    const hostname = this.appSensitiveConfig.clusters[clusterId]?.hostname;

    // no subdomain no fun
    if (!hostname) {
      throw new Error("Cluster " + clusterId + " does not exist");
    }

    // now we can loop over these files we are meant to download
    await Promise.all(fileList.map(async (fileToDownload) => {
      // grab the url
      const pathToRequest = path.join("/uploads/" + clusterId, fileToDownload);
  
      this.logDebug({
        className: "LocalStorageService",
        methodName: "copyRemoteAt",
        message: "Attempting to copy file at " + pathToRequest + " at host: " + hostname,
      });
  
      // do a http request for them
      const res = await httpRequest<string[]>({
        method: "GET",
        host: hostname,
        path: pathToRequest,
        isHttps: true,
        returnNonOk: true,
        processAsJSON: true,
        dontProcessResponse: true,
      });

      // we grab the file path that comes after the path we want to save
      // from the files to download that we got for the given path, we simply replaced the base
      // we provided
      const filePathItself = fileToDownload.replace(at, "");

      // and save them locally, basically replacing that base with out target
      await this.save(path.join(localTargetPath, filePathItself), res.response, options);
    }));
    
    return {
      found: true,
    };
  }

  /**
   * required for dumping
   * 
   * @param at
   */
  public async dumpFolderFromAllSources(at: string, localBaseDirectory: string): Promise<void> {
    const filesToCopyNCluster: { [filePath: string]: string } = {};

    await Promise.all(this.appConfig.allClusters.map(async (clusterId: string) => {
      const filesAtThatCluster = await this.listFilesAt(at, clusterId);
      filesAtThatCluster.forEach((f) => {
        if (!filesToCopyNCluster[f] || clusterId === CLUSTER_ID) {
          filesToCopyNCluster[f] = clusterId;
        }
      });
    }));

    await Promise.all(Object.keys(filesToCopyNCluster).map(async (filePath) => {
      const clusterId = filesToCopyNCluster[filePath];

      await this.copyRemoteAt(filePath, clusterId, localBaseDirectory, { dump: true });
    }));
  }
}
