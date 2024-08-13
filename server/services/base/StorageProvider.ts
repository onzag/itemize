import type { ReadStream } from "fs";
import type { Readable } from "stream";
import { ServiceProvider, ServiceProviderType } from "..";

export default class StorageProvider<T> extends ServiceProvider<T> {
  public static getType() {
    return ServiceProviderType.NONE;
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
  public async save(at: string, readStream: ReadStream | Readable): Promise<void> {

  }

  /**
   * This function is necessary for downloading a file
   * 
   * @param at the remote file to download
   * @override
   */
  public read(at: string): ReadStream {
    return null;
  }

  /**
   * This function is necessary for downloading a file
   * 
   * @param url the remote file to download
   * @override
   */
  public readRemote(url: string): ReadStream {
    return null;
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
  public async removeFolder(at: string): Promise<void> {

  }

  /**
   * This function is executed for removing folders
   * in other providers
   * 
   * NECESSARY FOR CORE ITEMIZE TO FUNCTION
   * 
   * @param url 
   */
  public async removeRemoteFolder(url: string): Promise<void> {

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
  public async exists(at: string): Promise<boolean> {
    return false;
  }

  /**
   * It's executed to verify whether a given resource
   * exists
   * 
   * NECESSARY FOR CORE ITEMIZE TO FUNCTION
   * 
   * @param url the resource to check for
   * @override
   */
  public async existsRemote(url: string): Promise<boolean> {
    return false;
  }


  /**
   * Should copy a folder from one container to another target container, note that during
   * calls the target container may be itself, optimize if necessary for such calls
   * 
   * NECESSARY FOR CUSTOM SERVER COPY CALLS TO FUNCTION
   * 
   * @param remotePath 
   * @param targetPath 
   * @override
   */
  public async copyFile(sourcePath: string, targetPath: string) {

  }

  /**
   * Should copy a folder from one container to another target container, note that during
   * calls the target container may be itself, optimize if necessary for such calls
   * 
   * NECESSARY FOR ITEMIZE CDN TO FUNCTION
   * 
   * @param sourceUrl 
   * @param targetPath 
   * @override
   */
  public async copyRemoteFile(sourceUrl: string, targetPath: string) {

  }
}
