import fs, { ReadStream } from "fs";
const fsAsync = fs.promises;
import path from "path";
import { ServiceProviderType } from ".";
import StorageProvider from "./base/StorageProvider";
import express from "express";
import https from "http";
import { CLUSTER_ID } from "../environment";

// get a static router
const expressStatic = express.static("uploads", {
  cacheControl: true,
  maxAge: 0,
  immutable: true,
  etag: true,
  dotfiles: "allow",
  lastModified: true,
  index: false,
});

export class LocalStorageService extends StorageProvider<null> {
  public static getType() {
    return ServiceProviderType.NONE;
  }

  public serve(req: express.Request, res: express.Response, next: (err?: Error) => void): void {
    expressStatic(req, res, next);
  }

  public async listOwnFiles(at: string): Promise<string[]> {
    let filesList: string[] = [];

    const srcWUploads = path.normalize(path.join("uploads", at));
    if (srcWUploads.startsWith("..")) {
      throw new Error("It's not allowed to go upstream of uploads")
    }
    try {
      const files = await fsAsync.readdir(srcWUploads);
      for (let file of files) {
        const currentPathWUploads = path.join(srcWUploads, file);
        const currentPathWOUploads = path.join(at, file);
        const current = await fsAsync.stat(currentPathWUploads);
        if (current.isDirectory()) {
          filesList = filesList.concat(await this.listOwnFiles(currentPathWOUploads));
        } else if (current.isFile()) {
          filesList.push(currentPathWOUploads);
        }
      }
    } catch {
      // DO nothing, can't access directory, must not even exist
    }

    return filesList;
  }

  public readOwn(at: string): NodeJS.ReadableStream {
    const rs = fs.createReadStream(path.join("uploads", at));
    return rs;
  }

  public async save(at: string, readStream: ReadStream, options: {dump?: boolean} = {}): Promise<void> {
    const targetAt = options.dump ? at : path.normalize(path.join("uploads", at));
    if (!options.dump && targetAt.startsWith("..")) {
      throw new Error("It's not allowed to go upstream of uploads")
    }

    const targetPath = path.dirname(targetAt);

    await fsAsync.mkdir(targetPath, {
      recursive: true,
    });

    const writeStream = fs.createWriteStream(targetAt);
    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        resolve();
      });
      writeStream.on("error", reject);
    });
  }

  public async removeOwnPath(at: string): Promise<void> {
    this.logDebug({
      className: "LocalStorageService",
      methodName: "removeOwn",
      message: "Attempting to remove path " + at,
    });

    const targetPath = at.split("/");

    if (targetPath[0] === "") {
      targetPath.shift();
    }

    try {
      const finalTarget = path.join("uploads", ...targetPath);
      const statInfo = await fsAsync.lstat(finalTarget);
      if (statInfo.isDirectory()) {
        await fsAsync.rmdir(finalTarget, {
          recursive: true,
        });
      } else {
        await fsAsync.unlink(finalTarget);
      }
    } catch {
      this.logDebug({
        className: "LocalStorageService",
        methodName: "removeOwn",
        message: "Could not find any local path",
      });
    }
  }

  public async existsOwn(at: string): Promise<boolean> {
    const localPath = path.join("uploads", at);

    let exists = true;
    try {
      await fsAsync.access(localPath, fs.constants.F_OK);
      this.logDebug({
        className: "LocalStorageService",
        methodName: "exists",
        message: "Checking succeed " + at,
      });
    } catch (e) {
      exists = false;
      this.logError({
        className: "LocalStorageService",
        methodName: "exists",
        message: "Checking failed " + at,
        err: e,
        data: {
          at,
        }
      });
    }

    return exists;
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
  public async copyOwn(at: string, targetPath: string, options: { dump?: boolean } = {}): Promise<{found: boolean}> {
    const srcWUploads = path.normalize(path.join("uploads", at));
    if (srcWUploads.startsWith("..")) {
      throw new Error("It's not allowed to go upstream of uploads")
    }
    let actualTargetPath = path.normalize(options.dump ? targetPath : path.join("uploads", targetPath));
    if (!options.dump && actualTargetPath.startsWith("..")) {
      throw new Error("It's not allowed to go upstream of uploads as a target path with no dump option");
    }
    let foundSomething = false;
    try {
      const self = await fsAsync.stat(srcWUploads);
      if (self.isDirectory()) {
        const files = await fsAsync.readdir(srcWUploads);
        await Promise.all(files.map(async (file) => {
          const copyOwnRes = await this.copyOwn(
            path.join(at, file),
            path.join(targetPath, file),
            options,
          );
          if (copyOwnRes.found) {
            foundSomething = true;
          }
        }))
      } else if (self.isFile()) {
        const dirname = path.dirname(actualTargetPath);
        try {
          await fsAsync.access(dirname);
        } catch {
          await fsAsync.mkdir(dirname, { recursive: true });
        }
        await fsAsync.copyFile(srcWUploads, actualTargetPath);
        foundSomething = true;
      }
    } catch {
      // DO nothing, can't access directory, must not even exist
    }

    return {found: foundSomething};
  }
}