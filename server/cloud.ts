import pkgcloud from "pkgcloud";
import { logger } from ".";
import fs from "fs";
const fsAsync = fs.promises;
import path from "path";
import https from "https";

const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");

/**
 * Contains all the cloud clients connection for every container id
 */
export type ICloudClients = {
  [containerId: string]: CloudClient
};

interface IOpenstackInitializationAttributes {
  provider: "openstack";
  username: string;
  keystoneAuthVersion: string;
  region: string,
  domainId: string;
  domainName: string;
  password: string;
  authUrl: string;
};

/**
 * Provides the pkgloud client container from ovh
 * @param client the client to use
 * @param containerName the container name
 */
function getContainerPromisified(client: pkgcloud.storage.Client, containerName: string): Promise<pkgcloud.storage.Container> {
  return new Promise((resolve, reject) => {
    client.getContainer(containerName, (err, container) => {
      if (err) {
        reject(err);
      } else {
        resolve(container);
      }
    });
  });
}



export class CloudClient {
  private pkgCloudOpenstackClient: pkgcloud.storage.Client;
  private pkgCloudOpenstackContainer: pkgcloud.storage.Container;
  private isLocal: boolean;

  private prefix: string;
  private id: string;

  constructor(id: string, prefix: string) {
    this.prefix = prefix;
    this.id = id;
  }

  public getPrefix() {
    return this.prefix;
  }

  public getId() {
    return this.id;
  }

  public async setAsOpenstack(data: IOpenstackInitializationAttributes, containerName: string) {
    logger && logger.info(
      "initializeServer: retrieving openstack container " + containerName + " in container id " + this.id,
    );

    this.pkgCloudOpenstackClient = pkgcloud.storage.createClient(data);
    this.pkgCloudOpenstackContainer = await getContainerPromisified(this.pkgCloudOpenstackClient, containerName)
  }

  public setAsLocal() {
    this.isLocal = true;

    logger && logger.warn(
      "CloudClient: cloud identified with " + this.id + " initialized in local mode, this mode is non-scalable and can only work with 1 cluster",
    );
  }

  /**
 * Verifies whether a given uploaded resource is actually ready, as
 * containers, might have been done uploading but are not ready to serve
 * the file itself
 * @param url the url to verify
 * @param done the callback once it's done
 */
  private verifyResourceIsReady(url: URL, done: () => void) {
    // so we get the url string value, for debugging purposes
    const strURL = url.toString();
    CAN_LOG_DEBUG && logger && logger.debug("CloudClient.verifyResourceIsReady: Verifying readiness of " + strURL);

    // now we use https to call and do a head request to check the status
    https.get({
      method: "HEAD",
      host: url.host,
      path: url.pathname,
    }, (resp) => {
      // status is succesful
      if (resp.statusCode === 200 || resp.statusCode === 0) {
        CAN_LOG_DEBUG && logger && logger.debug("CloudClient.verifyResourceIsReady: Verification succeed " + strURL);
        done();
      } else {
        // otherwise we wait 100 milliseconds, and recursively execute until it's ready
        CAN_LOG_DEBUG && logger && logger.debug("CloudClient.verifyResourceIsReady: Resource is not yet ready " + strURL);
        setTimeout(this.verifyResourceIsReady.bind(this, url, done), 100);
      }
    });
  }

  public async upload(
    remote: string,
    readStream: any,
    verify?: boolean,
  ) {
    if (this.pkgCloudOpenstackContainer) {
      const writeStream = this.pkgCloudOpenstackContainer.client.upload({
        container: this.pkgCloudOpenstackContainer as any,
        remote,
      });
      readStream.pipe(writeStream);

      return new Promise((resolve, reject) => {
        writeStream.on("finish", () => {
          if (!verify) {
            resolve();
          } else {
            this.verifyResourceIsReady(
              new URL(this.prefix + remote),
              resolve,
            );
          }
        });
        writeStream.on("error", reject);
      });
    } else {
      const targetPath = remote.split("/");

      if (targetPath[0] === "") {
        targetPath.shift();
      }

      const fileName = targetPath.pop();

      await fsAsync.mkdir(path.join("uploads", ...targetPath), {
        recursive: true,
      });

      const writeStream = fs.createWriteStream(path.join("uploads", ...targetPath, fileName));
      readStream.pipe(writeStream);

      return new Promise((resolve, reject) => {
        writeStream.on("finish", () => {
          resolve();
        });
        writeStream.on("error", reject);
      });
    }
  }

  public async removeFolder(mainPath: string): Promise<void> {
    if (this.pkgCloudOpenstackContainer) {
      return new Promise((resolve, reject) => {
        CAN_LOG_DEBUG && logger && logger.debug("CloudClient.removeFolderFor: Deleting folder for", { mainPath });

        (this.pkgCloudOpenstackContainer as any).getFiles({
          prefix: mainPath,
        }, (err: pkgcloud.ClientError, files: pkgcloud.storage.File[]) => {
          if (err) {
            reject(err);
          } else if (files && files.length) {
            CAN_LOG_DEBUG && logger && logger.debug("CloudClient.removeFolderFor: Bulk deleting", { files });
            (this.pkgCloudOpenstackClient as any).bulkDelete(this.pkgCloudOpenstackContainer, files, (err: pkgcloud.ClientError) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          } else {
            CAN_LOG_DEBUG && logger && logger.debug("CloudClient.removeFolder: Could not find any files");
            resolve();
          }
        });
      });
    } else {
      CAN_LOG_DEBUG && logger && logger.debug("CloudClient.removeFolderFor: Deleting folder for", { mainPath });

      const targetPath = mainPath.split("/");

      if (targetPath[0] === "") {
        targetPath.shift();
      }

      try {
        await fsAsync.rmdir(path.join("uploads", ...targetPath), {
          recursive: true,
        });
      } catch {
        CAN_LOG_DEBUG && logger && logger.debug("CloudClient.removeFolder: Could not find any local files");
      }
    }
  }

  private async downloadPkgCloudFile(
    file: pkgcloud.storage.File,
    localTarget: string,
  ) {
    // first our file comes with the hosname.com/MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
    // we split it!
    const target = file.name.split("/");

    // this will remove the hostname leaving it as MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
    target.shift();
    // and now it is localTarget/MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
    const targetStr = path.join(localTarget, ...target);

    // this removes the filename
    target.pop();
    // so now it is MOD_something__IDEF_else/1.version/property/FILE121231231
    const targetDir = path.join(localTarget, ...target);

    // we need to ensure that directory
    await fsAsync.mkdir(targetDir, { recursive: true });

    // and now we got to download the files and copy them there, that might take a while
    console.log("Copying " + file.name + " to " + targetStr);

    // we create a stream for the target, dump/MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
    const targetStream = fs.createWriteStream(targetStr);

    // and download into that stream
    this.pkgCloudOpenstackClient.download(
      {
        container: this.pkgCloudOpenstackContainer,
        remote: file.name,
        stream: targetStream,
      } as any,
    );

    // return a promise off it
    return new Promise((resolve, reject) => {
      targetStream.on("error", reject);
      targetStream.on("success", resolve);
    });
  }

  public async dumpEntireFolder(
    source: string,
    localTarget: string,
  ) {
    if (this.pkgCloudOpenstackContainer) {
      // so we return a new promise
      return new Promise((resolve, reject) => {
        // get all the files, and build where we are seeking for them
        (this.pkgCloudOpenstackContainer as any).getFiles({
          prefix: source,
        }, (err: pkgcloud.ClientError, files: pkgcloud.storage.File[]) => {
          // and now we can ask for all these files
          if (err) {
            reject(err);
          } else if (files && files.length) {
            // we get them as a bunch
            return Promise.all(files.map(f => this.downloadPkgCloudFile(f, localTarget)));
          } else {
            resolve();
          }
        });
      })
    }
  }
}