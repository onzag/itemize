/**
 * Contains a setup step that modifies the package documentation
 * either by installing stuff or by adding scripts onto it
 */
import { ISetupConfigType } from "..";
/**
 * modifies the package documentation either by installing stuff or by adding scripts onto it
 * @param arg the setup arg
 */
export default function packageSetup(arg: ISetupConfigType): Promise<ISetupConfigType>;
