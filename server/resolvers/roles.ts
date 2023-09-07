import { IGQLArgs, IGQLValue } from "../../gql-querier";
import Module from "../../base/Root/Module";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { Cache } from "../../server/cache";
import { IServerSideTokenDataType } from "./basic";
import equals from "deep-equal";
import Root, { ICustomRoleManagerRoleStatus } from "../../base/Root";
import { DatabaseConnection } from "../../database";
import { ItemizeRawDB } from "../../server/raw-db";
import { logger } from "../logger";

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
  /**
   * This is the token data for the user that performed
   * the action and not the expected creator/owner
   * @deprecated use user instead
   */
  tokenData: IServerSideTokenDataType;
  /**
   * This is the user information for the user that performed
   * the action and not the expected creator/owner
   * 
   * Do not use this attribute to know who owns an item, use owner
   * instead and it can vary when performing actions in behalf of someone else
   */
  user: IServerSideTokenDataType;
  cache: Cache;
  databaseConnection: DatabaseConnection;
  rawDB: ItemizeRawDB;
  item: ItemDefinition;
  module: Module;
  value: IGQLValue;
  environment: CustomRoleGranterEnvironment;
  requestArgs: IGQLArgs;
  /**
   * Represents the expected owner of the given item
   * and it's affected by executing actions in behalf of someone else
   */
  owner: string;
  root: Root;
  /**
   * The known or expected parent of the item
   */
  parent: {
    id: string;
    type: string;
    version: string;
  };
  /**
   * When creating, if a custom id is given this field will contain it
   */
  customId: string;
  /**
   * The environment that sits above this one, that caused this one to be generated
   * useful when adding children and needing to know who is adding such children
   */
  environmentParent: ICustomRoleGranterArg;
}

export interface ICustomRoleType {
  role: string;
  module?: string[];
  item?: string[];
  grant: (arg: ICustomRoleGranterArg) => boolean | Promise<boolean> | ICustomRoleManagerRoleStatus | Promise<ICustomRoleManagerRoleStatus>;
  priority?: number;
}

export class CustomRoleManager {
  public filteredRoles: ICustomRoleType[];
  public allRoles: ICustomRoleType[];
  public granteds: {[role: string]: ICustomRoleManagerRoleStatus};
  private argEnv: ICustomRoleGranterArg;
  constructor(allRoles: ICustomRoleType[], env: ICustomRoleGranterArg) {
    const modulePath = env.module.getPath();
    const idefPath = env.item && env.item.getPath();

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
      if (
        typeof result !== "object" ||
        typeof result.granted !== "boolean" ||
        (result.errorCode !== null && typeof result.errorCode !== "string") ||
        (result.errorMessage !== null && typeof result.errorMessage !== "string")
      ) {
        logger.error({
          message: "Invalid result received from attempting to grant a role, will be casted to boolean",
          data: {
            role: role.role,
            result,
          }
        });
        this.granteds[role.role] = {
          granted: !!result,
          errorCode: null,
          errorMessage: null,
        };
      } else {
        this.granteds[role.role] = result;
      }
    }
    
    return this.granteds[role.role];
  }
  async checkRoleAccessFor(allowedRoles: string[]): Promise<ICustomRoleManagerRoleStatus> {
    const allowedRolesByPriority = allowedRoles.map((r) => {
      return this.filteredRoles.find((r2) => r === r2.role);
    }).filter((r) => !!r).sort((a, b) => (a.priority || 0) - (b.priority || 0));

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
      environmentParent: this.argEnv,
    });
  }
}