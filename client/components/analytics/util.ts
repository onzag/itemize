import type { IServerSideTokenDataType } from "../../../server/resolvers/basic";

const browsers = ["firefox", "chrome", "edge", "ie", "safari", "opera", "other"] as const;
const oss = ["windows", "linux", "macos", "chromeos", "android", "ios", "other"] as const;
const deviceTypes = ["desktop", "mobile", "tablet"] as const;

export interface IBaseAnalyticsAdditionalData {
  sex?: string;
  age?: number;
  name?: string;
}

export interface IBaseAnalyticsData extends IBaseAnalyticsAdditionalData {
  country: string;
  language: string;
  currency: string;
  role: string;
}

export interface IGenericAnalyticsData extends IBaseAnalyticsData {
  /**
   * Internet browser used from the most common browsers
   */
  browser: typeof browsers[number];
  /**
   * The raw identifier of the browser used
   */
  browserRawId: string;
  /**
   * Operating system used from the most common ones
   */
  os: typeof oss[number];
  /**
   * Raw identifier of the operating system as it is
   */
  osRawId: string;
  /**
   * test whether this is a mobile or a desktop device
   */
  deviceType: typeof deviceTypes[number];
}

export function baseAnalyticsDataValidator(data: IBaseAnalyticsData, userData: IServerSideTokenDataType) {
  if (data.role !== userData.role) {
    return false;
  }

  if (typeof data.country !== "string" || data.country.length !== 2) {
    return false;
  }

  if (typeof data.currency !== "string" || data.currency.length !== 3) {
    return false;
  }

  if (typeof data.language !== "string" || data.language.length !== 2) {
    return false;
  }

  return true;
}

export function genericAnalyticsDataValidator(data: IGenericAnalyticsData, userData: IServerSideTokenDataType) {
  if (!baseAnalyticsDataValidator(data, userData)) {
    return false;
  }

  if (
    typeof data.browser !== "string" ||
    !data.browser ||
    typeof data.browserRawId !== "string" ||
    !browsers.includes(data.browser)
  ) {
    return false;
  }

  if (
    typeof data.os !== "string" ||
    !data.os ||
    typeof data.osRawId !== "string" ||
    !oss.includes(data.os)
  ) {
    return false;
  }

  if (
    typeof data.deviceType !== "string" ||
    !data.deviceType ||
    !deviceTypes.includes(data.deviceType)
  ) {
    return false;
  }

  return true;
}