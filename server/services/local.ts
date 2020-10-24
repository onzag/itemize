import fs, { ReadStream } from "fs";
const fsAsync = fs.promises;
import path from "path";
import https from "https";
import { StorageProvider } from ".";

async function copyDir(src: string, dest: string) {
  try {
    await fsAsync.mkdir(dest);
  } catch {
    // Do nothing directory already exists
  }
  const files = await fsAsync.readdir(src);
  for (let file of files) {
    const current = await fsAsync.stat(path.join(src, file));
    if (current.isDirectory()) {
      await copyDir(path.join(src, file), path.join(dest, file));
    } else {
      await fsAsync.copyFile(path.join(src, file), path.join(dest, file));
    }
  }
};

export class LocalStorageService extends StorageProvider<null> {
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
    this.logDebug("LocalStorageService.removeFolder: Deleting folder for", { at });

    const targetPath = at.split("/");

    if (targetPath[0] === "") {
      targetPath.shift();
    }

    try {
      await fsAsync.rmdir(path.join("uploads", ...targetPath), {
        recursive: true,
      });
    } catch {
      this.logDebug("LocalStorageService.removeFolder: Could not find any local files");
    }
  }

  public async dumpFolder(remotePath: string, localPath: string): Promise<void> {
    await copyDir(path.join("uploads", remotePath), localPath);
  }

  public async exists(at: string): Promise<boolean> {
    const localPath = path.join("uploads", at);

    let exists = true;
    try {
      await fsAsync.access(localPath, fs.constants.F_OK);
      this.logInfo("LocalStorageService.exists: Checking succeed " + at);
    } catch (e) {
      exists = false;
      this.logInfo("LocalStorageService.exists: Checking failed " + at);
    }

    return exists;
  }

  public async read(at: string): Promise<string> {
    const localPath = path.join("uploads", at);

    try {
      return await fsAsync.readFile(localPath, "utf-8");
    } catch {
      this.logInfo("LocalStorageService.read: Retrieving failed " + at);
      return null;
    }
  }
}