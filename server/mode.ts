import express from "express";
import { IAppDataType } from ".";

function getCookie(splittedCookie: string[], name: string): string {
  const nameEQ = name + "=";
  const foundCookie = splittedCookie.find((cookieValue) => {
    return cookieValue.startsWith(nameEQ);
  });
  if (!foundCookie) {
    return null;
  }
  return foundCookie.substr(nameEQ.length) || null;
}

export function getMode(appData: IAppDataType, req: express.Request) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  let defaultMode = "production";
  // This only occurs during development
  if (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "::ffff:127.0.0.1"
  ) {
    defaultMode = "development";
  }
  const cookies = req.headers["cookie"];
  if (cookies) {
    const splittedCookies = cookies.split(";");
    const devmode = getCookie(splittedCookies, "devmode");
    const devkey = getCookie(splittedCookies, "devkey");

    if (
      (
        devmode === "production" ||
        devkey === appData.sensitiveConfig.devKey
      ) &&
      (
        devmode === "development" ||
        devmode === "production"
      )
    ) {
      return devmode;
    } else {
      return defaultMode;
    }
  } else {
    return defaultMode;
  }
}