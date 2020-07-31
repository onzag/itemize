/**
 * Contains the functionality for executing the development environment based on some config
 *
 * @packageDocumentation
 */
/**
 * this function is triggered by the main.ts file and passes its argument
 * its configuration is there, check the main.ts file for modification on how
 * this function is triggered and what parameters it needs
 *
 * @param version the version param
 */
export declare function start(version: string): Promise<void>;
/**
 * This function is what is used to stop the development environment
 * check the main.ts file to see how this is called
 *
 * @param version the version to stop for
 */
export declare function stop(version: string): Promise<void>;
