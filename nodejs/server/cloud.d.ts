/**
 * Contains all the cloud clients connection for every container id
 */
export declare type ICloudClients = {
    [containerId: string]: CloudClient;
};
interface IOpenstackInitializationAttributes {
    provider: "openstack";
    username: string;
    keystoneAuthVersion: string;
    region: string;
    domainId: string;
    domainName: string;
    password: string;
    authUrl: string;
}
export declare class CloudClient {
    private pkgCloudOpenstackClient;
    private pkgCloudOpenstackContainer;
    private isLocal;
    private prefix;
    private id;
    constructor(id: string, prefix: string);
    getPrefix(): string;
    getId(): string;
    setAsOpenstack(data: IOpenstackInitializationAttributes, containerName: string): Promise<void>;
    setAsLocal(): void;
    /**
   * Verifies whether a given uploaded resource is actually ready, as
   * containers, might have been done uploading but are not ready to serve
   * the file itself
   * @param url the url to verify
   * @param done the callback once it's done
   */
    private verifyResourceIsReady;
    upload(remote: string, readStream: any, verify?: boolean): Promise<unknown>;
    removeFolder(mainPath: string): Promise<void>;
    private downloadPkgCloudFile;
    dumpEntireFolder(source: string, localTarget: string): Promise<unknown>;
}
export {};
