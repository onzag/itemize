/**
 * @module
 * This represents the waf class that builds upon the waf.json file
 * in oder to make rules for nginx to firewall the mamy requests that botnets
 * do and push them away effectively
 */

import type {IConfigRawJSONDataType} from "../config";

interface IAllowedAppLocationRule {
  location: string;
  rules?: string; 
}

interface IWafConfig {
  allowedAppLocations: Array<string | IAllowedAppLocationRule>;
  allowedLocations: Array<string | IAllowedAppLocationRule>;
  proxyRule: string;
}

const defaultAppRule = "limit_except GET {deny all;}";

export default class Waf {
  private config: IWafConfig;
  private appConfig: IConfigRawJSONDataType;

  private compiled: Array<IAllowedAppLocationRule>;

  constructor(
    config: IWafConfig,
    appConfig: IConfigRawJSONDataType,
  ) {
    this.config = config;
    this.appConfig = appConfig;

    this.compiled = this.getCompiledPaths();
  }
  public patchNginx(nginxConf: string) {
    let wafText = this.compiled.map((r) => r.location + "{" + r.rules + (r.rules.endsWith(";") ? "" : ";") + this.config.proxyRule + "}").join("\n");

    // firewall
    wafText += "\nlocation / {return 444;}";
    
    // replace in the nginx configuration
    return nginxConf.replace("WAF", wafText);
  }
  public compileRegex(path: string) {
    let regex = "^" + path
      .replace(/\:([a-zA-Z]+)/g, (v: string, ...args: any[]) => {
        if (v === ":id" || v === ":version") {
          return "[a-zA-Z0-9_-]+";
        }

        throw new Error("Unknown path parameter value " + v + " at location " + path);
      });

    let exact = true;
    if (regex.endsWith("...")) {
      exact = false;

      regex = regex.replace("...", "");
    }

    if (regex.includes("...")) {
      throw new Error("Invalid position for ... at location for " + path);
    }

    // represents a exact match and not prefix
    if (
      exact &&
      // does not feature any regexy stuff
      !path.includes("[") &&
      !path.includes(":") &&
      !path.includes("*") &&
      !path.includes("(") &&
      !path.includes("\\")
    ) {
      // just as it is
      return "location = " + path;
    }

    return "location ~ " + regex;
  }

  /**
   * Compiles the waf config file into paths that are made to be for the
   * nginx.conf file
   * 
   * @returns 
   */
  public getCompiledPaths() {
    const base: Array<IAllowedAppLocationRule> = [];

    this.config.allowedLocations.forEach((loc) => {
      if (typeof loc === "string") {
        base.push({location: (loc.startsWith("/") ? loc : ("/" + loc)), rules: defaultAppRule});
      } else {
        base.push({location: (loc.location.startsWith("/") ? loc.location : ("/" + loc.location)), rules: loc.rules || defaultAppRule});
      }
    });

    this.appConfig.supportedLanguages.forEach((lang) => {
      base.push({location: "/" + lang, rules: defaultAppRule});

      this.config.allowedAppLocations.forEach((loc) => {
        if (typeof loc === "string") {
          base.push({location: "/" + lang + (loc.startsWith("/") ? loc : ("/" + loc)), rules: defaultAppRule});
        } else {
          base.push({location: "/" + lang + (loc.location.startsWith("/") ? loc.location : ("/" + loc.location)), rules: loc.rules || defaultAppRule});
        } 
      });
    });

    base.forEach((r) => {
      r.location = this.compileRegex(r.location);
    });

    return base;
  }
}