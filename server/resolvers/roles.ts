import { IGQLValue } from "../../gql-querier";
import Module from "../../base/Root/Module";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { Cache } from "../../server/cache";
import { IServerSideTokenDataType } from "./basic";
import equals from "deep-equal";
import Root, { ICustomRoleManagerRoleStatus } from "../../base/Root";
import { DatabaseConnection } from "../../database";
import { ItemizeRawDB } from "../../server/raw-db";

export enum CustomRoleGranterEnvironment {
  CREATION = "CREATION",
  MODIFYING = "MODIFYING",
  RETRIEVING = "RETRIEVING",
  SEARCHING_TRADITIONAL = "SEARCHING_TRADITIONAL",
  SEARCHING_RECORDS = "SEARCHING_RECORDS",
  REMOVAL = "REMOVAL",
  ADDING_CHILD = "ADDING_CHILD",
}

export interface ICustomRoleGranterArg {
  tokenData: IServerSideTokenDataType;
  cache: Cache;
  databaseConnection: DatabaseConnection;
  rawDB: ItemizeRawDB;
  item: ItemDefinition;
  module: Module;
  value: IGQLValue;
  environment: CustomRoleGranterEnvironment;
  owner: string;
  root: Root;
  parent: {
    id: string;
    type: string;
    version: string;
  };
  customId: string;
}

export interface ICustomRoleType {
  role: string;
  module?: string[];
  item?: string[];
  grant: (arg: ICustomRoleGranterArg) => boolean | Promise<boolean> | ICustomRoleManagerRoleStatus | Promise<ICustomRoleManagerRoleStatus>;
  priority?: number;
}

export class CustomRoleManager {
  private filteredRoles: ICustomRoleType[];
  private allRoles: ICustomRoleType[];
  private granteds: {[role: string]: ICustomRoleManagerRoleStatus};
  private argEnv: ICustomRoleGranterArg;
  constructor(allRoles: ICustomRoleType[], env: ICustomRoleGranterArg) {
    const modulePath = env.module.getPath();
    const idefPath = env.item.getPath();

    this.allRoles = allRoles;

    this.filteredRoles = allRoles.filter((r) => {
      if (!r.module) {
        return true;
      } else if (!r.item) {
        return equals(r.module, modulePath);
      }
      
      return equals(r.module, modulePath) && equals(r.item, idefPath);
    });

    this.granteds = {};
    this.argEnv = env;
  }
  private async isRoleGranted(role: ICustomRoleType): Promise<ICustomRoleManagerRoleStatus> {
    if (typeof this.granteds[role.role] !== "undefined") {
      return this.granteds[role.role];
    }

    const result = await role.grant(this.argEnv);
    if (typeof result === "boolean") {
      this.granteds[role.role] = {
        granted: result,
        errorCode: null,
        errorMessage: null,
      }
    } else {
      this.granteds[role.role] = result;
    }
    
    return this.granteds[role.role];
  }
  async checkRoleAccessFor(allowedRoles: string[]): Promise<ICustomRoleManagerRoleStatus> {
    const allowedRolesByPriority = allowedRoles.map((r) => {
      return this.filteredRoles.find((r2) => r === r2.role);
    }).filter((r) => !!r).sort((a, b) => (a.priority || 0) - (b.priority || 0));

    // we must loop but also fetch our first denial
    // as that would be our main error by priority
    let firstPriorityDeniedValue: ICustomRoleManagerRoleStatus = null;
    for (const role of allowedRolesByPriority) {
      const value = await this.isRoleGranted(role);
      if (value.granted) {
        return value;
      } else if (!firstPriorityDeniedValue) {
        firstPriorityDeniedValue = value;
      }
    }

    // in case there was no denied value in the allowed roles
    // we return a generic denial
    return firstPriorityDeniedValue || {
      granted: false,
      errorMessage: null,
      errorCode: null,
    };
  }
  public subEnvironment(newEnv: Partial<ICustomRoleGranterArg>): CustomRoleManager {
    return new CustomRoleManager(this.allRoles, {
      ...this.argEnv,
      ...newEnv,
    });
  }
}