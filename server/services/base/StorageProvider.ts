import type { ReadStream } from "fs";
import type { Readable } from "stream";
import { IServiceProviderClassType, ServiceProvider } from "..";
import { RegistryService } from "../registry";

export interface IStorageProvidersObject {
  [id: string]: StorageProvider<any>,
}

export interface IStorageProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T, registry: RegistryService, id: string, prefix: string): StorageProvider<T>
}

export default class StorageProvider<T> extends ServiceProvider<T> {
  public prefix: string;
  public id: string;

  constructor(config: T, registry: RegistryService, id: string, prefix: string) {
    super(config, registry);

    this.prefix = prefix;
    this.id = id;
  }

  public getPrefix() {
    return this.prefix;
  }

  public getId() {
    return this.id;
  }

  /**
   * This function is executed when the service
   * uploading a read stream
   * @param at the remote file to use
   * @param readStream the stream to read from
   * @param mustBeVerified a boolean that specifies whether the resouce must
   * be verified and return a 200 when requested
   * @override
   */
  public async upload(at: string, readStream: ReadStream | Readable, mustBeVerified: boolean): Promise<void> {

  }

  /**
   * This function is executed once a folder
   * removal is requested
   * @param at the remote folder to remove
   * @override
   */
  public async removeFolder(at: string): Promise<void> {

  }

  /**
   * This function is executed once an entire folder
   * is requested to be downloaded locally in the given
   * local path
   * @param remotePath the remote path
   * @param localPath the local path
   * @override
   */
  public async dumpFolder(remotePath: string, localPath: string): Promise<void> {

  }

  /**
   * It's executed to verify whether a given remote resource
   * exists
   * @param at the resource to check for
   * @override
   */
  public async exists(at: string): Promise<boolean> {
    return false;
  }

  /**
   * It's executed to read files
   * @param at the file to read
   * @override
   */
  public async read(at: string): Promise<string> {
    return "";
  }
}
