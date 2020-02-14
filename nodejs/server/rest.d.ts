import { IAppDataType } from ".";
/**
 * this function contains and build all the rest services
 * by returning a router that holds them inside the
 * /rest/ endpoint
 * @param appData the app data that it passes
 */
export default function restServices(appData: IAppDataType): import("express-serve-static-core").Router;
