/**
 * Setups the configuration basically modifies the configuration in place
 * this setup is supposed to build
 *
 * @packageDocumentation
 */
import { ISetupConfigType } from "..";
/**
 * the configuration setup step that builds the config files themselves
 * @param arg the config it's supposed to modify
 */
export default function configSetup(arg: ISetupConfigType): Promise<ISetupConfigType>;
