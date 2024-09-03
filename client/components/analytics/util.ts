import { ISQLTableRowValue } from "../../../base/Root/sql";
import type { IAppDataType } from "../../../server";
import type { IServerSideTokenDataType } from "../../../server/resolvers/basic";

const browsers = ["firefox", "chrome", "edge", "ie", "safari", "opera", "other"] as const;
const oss = ["windows", "linux", "macos", "chromeos", "android", "ios", "other"] as const;
const deviceTypes = ["desktop", "smartphone", "tablet", "other"] as const;

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

export function getCurrentTimeZoneOffset() {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset <= 0 ? "+" : "-";

  // Format the hours and minutes to always be two digits
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${sign}${formattedHours}:${formattedMinutes}`;
}

export function genericAnalyticsDataProvider() {
  const userAgent = navigator.userAgent.toLowerCase();
  let browser: IGenericAnalyticsData['browser'] = "other";
  let browserRawId = userAgent;

  if (userAgent.includes('firefox')) {
    browser = 'firefox';
    browserRawId = userAgent.match(/firefox\/[\d.]+/i)?.[0] || "";
  } else if (userAgent.includes('chrome') && !userAgent.includes('edg') && !userAgent.includes('opr')) {
    browser = 'chrome';
    browserRawId = userAgent.match(/chrome\/[\d.]+/i)?.[0] || "";
  } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    browser = 'safari';
    browserRawId = userAgent.match(/version\/[\d.]+/i)?.[0] || "";
  } else if (userAgent.includes('edg')) {
    browser = 'edge';
    browserRawId = userAgent.match(/edg\/[\d.]+/i)?.[0] || "";
  } else if (userAgent.includes('opr') || userAgent.includes('opera')) {
    browser = 'opera';
    browserRawId = userAgent.match(/(opr|opera)\/[\d.]+/i)?.[0] || "";
  } else if (userAgent.includes('msie') || userAgent.includes('trident')) {
    browser = 'ie';
    browserRawId = userAgent.match(/(msie [\d.]+|rv:[\d.]+)/i)?.[0] || "";
  }

  let platform = navigator.platform ? navigator.platform.toLowerCase() : (navigator as any).userAgentData?.platform.toLowerCase();
  if (!platform) {
    platform = "unknown";
  }
  let os: IGenericAnalyticsData['os'] = "other";
  let osRawId = platform;

  if (platform.includes('win')) {
    os = 'windows';
  } else if (platform.includes('mac') || userAgent.includes('mac os')) {
    os = 'macos';
  } else if (platform.includes('linux')) {
    os = 'linux';
  } else if (platform.includes('android')) {
    os = 'android';
  } else if (platform.includes('iphone') || platform.includes('ipad') || userAgent.includes('ios')) {
    os = 'ios';
  } else if (platform.includes('cros')) {
    os = 'chromeos';
  }

  const isMobile = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent);
  const isTablet = /ipad|tablet|playbook|silk/.test(userAgent);

  let deviceType: IGenericAnalyticsData["deviceType"] = "other";

  if (isTablet) {
    deviceType = "tablet";
  } else if (isMobile) {
    deviceType = "smartphone";
  } else {
    deviceType = "desktop";
  }

  return {
    browser,
    browserRawId,
    os,
    osRawId,
    deviceType,
  };
}

/**
 * The generic analytics data validator is to be used in the server side to validate the
 * genericAnalyticsDataProvider when used in a hit or timetrack
 * 
 * @param data 
 * @param context 
 * @param userData 
 * @returns 
 */
export function genericAnalyticsDataValidator(data: IGenericAnalyticsData, context: string, userData: IServerSideTokenDataType) {
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

/**
 * The extended simple analytics data validator use to extend the generic analytics data validator
 * with simple properties
 * @param properties a map of properties and their expected typeof
 * @param baseFn the base function, the default is genericAnalyticsDataValidator
 * @returns a function that returns a boolean which is the validator as specified
 */
export function getExtendedSimpleAnalyticsDataValidator(
  properties: { [pId: string]: string },
  baseFn: (data: IGenericAnalyticsData, context: string, userData: IServerSideTokenDataType) => boolean = genericAnalyticsDataValidator
) {
  return (data: IGenericAnalyticsData, context: string, userData: IServerSideTokenDataType) => {
    const baseCheck = baseFn ? baseFn(data, context, userData) : true;
    if (!baseCheck) {
      return false;
    }

    return Object.keys(properties).every((pID) => {
      return (
        typeof data[pID] === properties[pID]
      );
    });
  }
}

/**
 * Item analytics information that is sent by the item provider
 * by default
 */
export interface IItemAnalyticsData extends IGenericAnalyticsData {
  /**
   * the item id
   */
  id: string;
  /**
   * the item version
   */
  version: string;
  /**
   * the item type
   */
  type: string;
}

/**
 * The item analytics data validator use it where you expect default information to come from an item
 * provider using its default pathway
 * 
 * @param data 
 * @param context 
 * @param userData 
 * @returns 
 */
export function itemAnalyticsDataValidator(data: IItemAnalyticsData, context: string, userData: IServerSideTokenDataType) {
  const baseCheck = genericAnalyticsDataValidator(data, context, userData);
  if (!baseCheck) {
    return false;
  }

  if (typeof data.id !== "string") {
    return false;
  }

  if (
    typeof data.version !== "string" &&
    data.version !== null
  ) {
    return false;
  }

  if (typeof data.type !== "string") {
    return false;
  }

  const contextValue = data.type + "." + data.id + "." + (data.version || "");

  if (context !== contextValue) {
    return false;
  }

  return true;
}


/**
 * Extend the data that is stored for this user using this function
 * 
 * provide information from the user via the properties that you want to extract from the user
 * object and this will generate a function to do just that
 * 
 * if the user is not there, aka it's an anonymous user it will not add such properties
 * as they cannot be found
 * 
 * @param properties the properties as they'd be in a SQL value
 * @returns a function that extends the data like specified
 */
export function getGenericAnalyticsDataExtender(properties: string[]) {
  return async (data: any, userData: IServerSideTokenDataType, appData: IAppDataType) => {
    if (!userData.id || properties.length === 0) {
      return data;
    }

    const user = await appData.cache.requestValue("users/user", userData.id, null);

    const nData = { ...data };
    properties.forEach((pId) => {
      nData[pId] = user[pId];
    });

    return nData;
  }
}

/**
 * @ignore
 */
type ItemPropertiesFn<T> = (itemValue: T, data: any, userData: IServerSideTokenDataType, appData: IAppDataType) => object;

/**
 * This is used with tracks that are supposed to be extend regarding of an item
 * in order to grab the properties that the user is interacting with
 * 
 * @param userProperties the properties to store from the user information, as the user SQL value
 * @param itemProperties the item properties to store for the item information, as the item SQL value
 * @returns a function that extends the data like specified
 */
export function getItemAnalyticsDataExtender<T = ISQLTableRowValue>(userProperties: string[], itemExtender: ItemPropertiesFn<T>) {
  const userExtender = getGenericAnalyticsDataExtender(userProperties);
  return async (data: IItemAnalyticsData, userData: IServerSideTokenDataType, appData: IAppDataType) => {
    const nData = await userExtender(data, userData, appData);
    const itemValue = await appData.cache.requestValue<T>(data.type, data.id, data.version || null);
    return itemExtender(itemValue, nData, userData, appData);
  }
}