/**
 * Setups webpack for the project
 * @packageDocumentation
 */
import { ISetupConfigType } from "..";
/**
 * Runs the webpack setup step that builds the webpack config
 *
 * @param arg the setup arg
 * @returns the same arg
 */
export default function webpackSetup(arg: ISetupConfigType): Promise<ISetupConfigType>;
