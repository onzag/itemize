import pkgcloud from "pkgcloud";
import fs, { ReadStream } from "fs";
const fsAsync = fs.promises;
import path from "path";
import https from "https";
import StorageProvider from "./base/StorageProvider";
import { ServiceProviderType } from ".";

export interface IOpenstackInitializationAttributes {
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
 * The sensitive openstack container information
 */
export interface ISensitiveConfigOpenstackContainerType {
  username: string;
  password: string;
  region: string;
  domainId: string;
  domainName: string;
  authUrl: string;
  containerName: string;
}

/**
 * Provides the pkgloud client container
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

export class OpenstackService extends StorageProvider<ISensitiveConfigOpenstackContainerType> {
  private client: pkgcloud.storage.Client;
  private container: pkgcloud.storage.Container;

  public static getType() {
    return ServiceProviderType.NONE;
  }

  public async initialize() {
    const clientData: IOpenstackInitializationAttributes = {
      provider: "openstack",
      username: this.config.username,
      keystoneAuthVersion: 'v3',
      region: this.config.region,
      domainId: this.config.domainId, //default
      domainName: this.config.domainName,
      password: this.config.password,
      authUrl: this.config.authUrl,
    };
    this.client = pkgcloud.storage.createClient(clientData);
    this.container = await getContainerPromisified(this.client, this.config.containerName);
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
    this.logDebug("OpenstackService.verifyResourceIsReady: Verifying readiness of " + strURL);

    // now we use https to call and do a head request to check the status
    https.get({
      method: "HEAD",
      host: url.host,
      path: url.pathname,
    }, (resp) => {
      // status is succesful
      if (resp.statusCode === 200 || resp.statusCode === 0) {
        this.logDebug("OpenstackService.verifyResourceIsReady: Verification succeed " + strURL);
        done();
      } else {
        // otherwise we wait 100 milliseconds, and recursively execute until it's ready
        this.logDebug("OpenstackService.verifyResourceIsReady: Resource is not yet ready " + strURL);
        setTimeout(this.verifyResourceIsReady.bind(this, url, done), 100);
      }
    });
  }

  public upload(at: string, readStream: ReadStream, mustBeVerified: boolean): Promise<void> {
    const remote = at;
    const writeStream = this.container.client.upload({
      container: this.container as any,
      remote,
    });
    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        if (!mustBeVerified) {
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
  }

  public removeFolder(at: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logDebug("OpenstackService.removeFolder: Deleting folder for", { at });

      (this.container as any).getFiles({
        prefix: at,
      }, (err: pkgcloud.ClientError, files: pkgcloud.storage.File[]) => {
        if (err) {
          reject(err);
        } else if (files && files.length) {
          this.logDebug("OpenstackService.removeFolder: Bulk deleting", { files });
          (this.client as any).bulkDelete(this.container, files, (err: pkgcloud.ClientError) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          this.logDebug("OpenstackService.removeFolder: Could not find any files");
          resolve();
        }
      });
    });
  }

  private async downloadPkgCloudFile(
    file: pkgcloud.storage.File,
    remotePath: string,
    localTarget: string,
  ) {
    // first our file comes with the hosname.com/MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
    let sourceFileName = file.name.replace(remotePath, "");
    if (sourceFileName[0] === "/") {
      sourceFileName.substr(1);
    }

    // so now we remove the remote information so that it's something like
    // this is usually what goes when dumping
    // property/FILE121231231/file_something.jpg

    // and now it is localTarget/property/FILE121231231/file_something.jpg
    const targetStr = path.join(localTarget, sourceFileName);

    // this removes the filename
    const target = targetStr.split("/");
    target.pop();
    // so now it is MOD_something__IDEF_else/1.version/property/FILE121231231
    const targetDir = path.join(localTarget, ...target);

    // we need to ensure that directory
    await fsAsync.mkdir(targetDir, { recursive: true });

    // we create a stream for the target, dump/MOD_something__IDEF_else/1.version/property/FILE121231231/file_something.jpg
    const targetStream = fs.createWriteStream(targetStr);

    // and download into that stream
    this.client.download(
      {
        container: this.container,
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

  public dumpFolder(remotePath: string, localPath: string): Promise<void> {
    // so we return a new promise
    return new Promise((resolve, reject) => {
      // get all the files, and build where we are seeking for them
      (this.container as any).getFiles({
        prefix: remotePath,
      }, (err: pkgcloud.ClientError, files: pkgcloud.storage.File[]) => {
        // and now we can ask for all these files
        if (err) {
          reject(err);
        } else if (files && files.length) {
          // we get them as a bunch
          return Promise.all(files.map(f => this.downloadPkgCloudFile(f, remotePath, localPath)));
        } else {
          resolve();
        }
      });
    })
  }

  public async copyFolder(remotePath: string, targetPath: string, target: StorageProvider<any>) {
    // TODO this needs to be implemented
    throw new Error("Not Implemented");
  }

  public exists(at: string): Promise<boolean> {
    const strURL = path.join(this.prefix, at);
    const url = new URL(strURL);
    return new Promise((resolve, reject) => {
      try {
        https.get({
          method: "HEAD",
          host: url.host,
          path: url.pathname,
        }, (resp) => {
          if (resp.statusCode === 200 || resp.statusCode === 0) {
            this.logInfo("OpenstackService.exists: Checking succeed " + at);
          } else {
            this.logInfo("OpenstackService.exists: Checking failed " + at);
          }

          return resolve(resp.statusCode === 200 || resp.statusCode === 0);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  public read(at: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const strURL = path.join(this.prefix, at);
      const url = new URL(strURL);
      try {
        https.get({
          method: "GET",
          host: url.host,
          path: url.pathname,
        }, (resp) => {
          if (resp.statusCode === 200 || resp.statusCode === 0) {
            this.logInfo("OpenstackService.read: Retrieving succeed " + at);
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
          } else {
            this.logInfo("OpenstackService.read: Retrieving failed " + at);
            resolve(null);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}