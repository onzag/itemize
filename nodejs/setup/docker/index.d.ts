/**
 * Allows to setup the docker container that will at the end contain
 * the app once it's containerized
 */
import { ISetupConfigType } from "..";
/**
 * To setup docker step and its files, it takes the setup config type
 * @param arg the setup config that contains all the config
 * @returns the same arg
 */
export default function dockerSetup(arg: ISetupConfigType): Promise<ISetupConfigType>;
