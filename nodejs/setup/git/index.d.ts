/**
 * Setup step to take care of git configuration
 * @packageDocumentation
 */
import { ISetupConfigType } from "..";
/**
 * Will simply setup git
 * @param arg the setup arg
 * @returns the same arg
 */
export default function gitSetup(arg: ISetupConfigType): Promise<ISetupConfigType>;
