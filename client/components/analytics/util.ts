import type { IServerSideTokenDataType } from "../../../server/resolvers/basic";

const browsers = ["firefox", "chrome", "edge", "ie", "safari", "opera", "other"] as const;
const oss = ["windows", "linux", "macos", "chromeos", "android", "ios", "other"] as const;
const deviceTypes = ["desktop", "mobile", "tablet"] as const;

export interface IGenericAnalyticsData {
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

export function genericAnalyticsDataValidator(data: IGenericAnalyticsData, userData: IServerSideTokenDataType) {
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