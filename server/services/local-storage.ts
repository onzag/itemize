import fs, { ReadStream } from "fs";
const fsAsync = fs.promises;
import path from "path";
import { ServiceProviderType } from ".";
import StorageProvider from "./base/StorageProvider";

async function copyDir(src: string, dest: string, destProvider?: StorageProvider<any>) {
  try {
    const files = await fsAsync.readdir(src);
    for (let file of files) {
      const currentPath = path.join(src, file);
      const current = await fsAsync.stat(currentPath);
      if (current.isDirectory()) {
        await copyDir(currentPath, path.join(dest, file));
      } else if (current.isFile()) {
        if (!destProvider) {
          try {
            await fsAsync.mkdir(dest, { recursive: true });
          } catch {
            // Do nothing directory already exists
          }
          await fsAsync.copyFile(currentPath, path.join(dest, file));
        } else {
          const stream = fs.createReadStream(currentPath);
          await destProvider.upload(path.join(dest, file), stream, true);
        }
      }
    }
  } catch {
    // DO nothing, can't access directory, must not even exist
  }
};


export class LocalStorageService extends StorageProvider<null> {
  public static getType() {
    return ServiceProviderType.NONE;
  }

  public download(at: string): ReadStream {
    const rs = fs.createReadStream(path.join("uploads", at));
    return rs;
  }

  public async upload(at: string, readStream: ReadStream): Promise<void> {
    const remote = at;
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

  public async removeFolder(at: string): Promise<void> {
    this.logDebug({
      className: "LocalStorageService",
      methodName: "removeFolder",
      message: "Deleting folder for",
      data: {
        at
      },
    });

    const targetPath = at.split("/");

    if (targetPath[0] === "") {
      targetPath.shift();
    }

    try {
      await fsAsync.rmdir(path.join("uploads", ...targetPath), {
        recursive: true,
      });
    } catch {
      this.logDebug({
        className: "LocalStorageService",
        methodName: "removeFolder",
        message: "Could not find any local files",
      });
    }
  }

  public async dumpFolder(remotePath: string, localPath: string): Promise<void> {
    await copyDir(path.join("uploads", remotePath), localPath);
  }

  public async copyFolder(remotePath: string, targetPath: string, target: StorageProvider<any>) {
    const sourceDir = path.join("uploads", remotePath);
    if (target === this) {
      return await copyDir(sourceDir, path.join("uploads", targetPath));
    }

    return await copyDir(sourceDir, targetPath, target);
  }

  public async exists(at: string): Promise<boolean> {
    const localPath = path.join("uploads", at);

    let exists = true;
    try {
      await fsAsync.access(localPath, fs.constants.F_OK);
      this.logInfo({
        className: "LocalStorageService",
        methodName: "exists",
        message: "Checking succeed " + at,
      });
    } catch (e) {
      exists = false;
      this.logInfo({
        className: "LocalStorageService",
        methodName: "exists",
        message: "Checking failed " + at,
      });
    }

    return exists;
  }

  public async read(at: string): Promise<string> {
    const localPath = path.join("uploads", at);

    try {
      return await fsAsync.readFile(localPath, "utf-8");
    } catch {
      this.logInfo({
        className: "LocalStorageService",
        methodName: "read",
        message: "Retrieving failed " + at,
      });
      return null;
    }
  }
}