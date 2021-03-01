/**
 * Specifies the mode we are in, not the NODE_ENV mode for the server side but rather what
 * the client is expecting, development builds or production; what does the user want
 * normally both NODE_ENV should match with what the server is running but this
 * might not be the case when a devkey is used
 * @module
 */

import express from "express";
import { IAppDataType } from ".";

/**
 * Provides the value of a cookie using a very cheap method
 * @param splittedCookie the splitted cookie value
 * @param name the name we want to retrieve
 */
export function getCookie(splittedCookie: string[], name: string): string {
  const nameEQ = name + "=";
  const foundCookie = splittedCookie.find((cookieValue) => {
    return cookieValue.startsWith(nameEQ);
  });
  if (!foundCookie) {
    return null;
  }
  return foundCookie.substr(nameEQ.length) || null;
}

/**
 * Specifies the mode that our application is running at
 * @param appData the application data
 * @param req the request we need to check against
 */
export function getMode(appData: IAppDataType, req: express.Request): "development" | "production" {
  // our default mode is.... our NODE_ENV
  let defaultMode: "development" | "production" = process.env.NODE_ENV as any;

  // if the default mode is not any of those we default to development
  if (defaultMode !== "development" && defaultMode !== "production") {
    defaultMode = "development";
  }

  // now we need to get our cookies from the header
  const cookies = req.headers["cookie"];
  // if we have any
  if (cookies) {
    // we split it
    const splittedCookies = cookies.split(";").map((c) => c.trim());

    // and we try to get the devmode and devkey
    const devmode = getCookie(splittedCookies, "devmode");
    const devkey = getCookie(splittedCookies, "devkey");

    // we will accept the answer from the if
    if (
      // for production, we don't care, we accept any key
      // or if the key is right we accept any other
      (
        devmode === "production" ||
        devkey === appData.sensitiveConfig.devKey
      ) &&
      // and we accept if the devmode is right development
      // or production
      (
        devmode === "development" ||
        devmode === "production"
      )
    ) {
      // we give that devmode
      return devmode;
    } else {
      // otherwise no give the default mode
      // something shady going on
      // or just there's no devmode nor devkey
      // set, aka both are null
      return defaultMode;
    }
  } else {
    // otherwise give the default mode
    // since there's no cookie
    return defaultMode;
  }
}