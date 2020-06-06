import express from "express";
import { IAppDataType } from ".";

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

export function getMode(appData: IAppDataType, req: express.Request): "development" | "production" {
  let defaultMode: "development" | "production" = process.env.NODE_ENV as any;
  if (defaultMode !== "development" && defaultMode !== "production") {
    defaultMode = "development";
  }

  const cookies = req.headers["cookie"];
  if (cookies) {
    const splittedCookies = cookies.split(";").map((c) => c.trim());
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