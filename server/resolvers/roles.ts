import { IGQLValue, IGQLArgs } from "../../gql-querier";
import Module from "../../base/Root/Module";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { Cache } from "../../server/cache";
import { IServerSideTokenDataType } from "./basic";
import equals from "deep-equal";
import Knex from "knex";
import Root from "../../base/Root";

export enum CustomRoleGranterEnvironment {
  CREATION = "CREATION",
  MODIFYING = "MODIFYING",
  RETRIEVING = "RETRIEVING",
  SEARCHING = "SEARCHING",
  REMOVAL = "REMOVAL",
}

interface ICustomRoleGranterArg {
  tokenData: IServerSideTokenDataType;
  cache: Cache;
  knex: Knex;
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
}

export interface ICustomRoleType {
  role: string;
  module?: string[];
  item?: string[];
  grant: (arg: ICustomRoleGranterArg) => boolean | Promise<boolean>;
  priority?: number;
}

export class CustomRoleManager {
  private filteredRoles: ICustomRoleType[];
  private granteds: {[role: string]: boolean};
  private argEnv: ICustomRoleGranterArg;
  constructor(allRoles: ICustomRoleType[], env: ICustomRoleGranterArg) {
    const modulePath = env.module.getPath();
    const idefPath = env.item.getPath();

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
  private async isRoleGranted(role: ICustomRoleType) {
    if (typeof this.granteds[role.role] === "boolean") {
      return this.granteds[role.role];
    }

    const result = await role.grant(this.argEnv);
    this.granteds[role.role] = result;
    return result;
  }
  async checkRoleAccessFor(allowedRoles: string[]) {
    const allowedRolesByPriority = allowedRoles.map((r) => {
      return this.filteredRoles.find((r2) => r === r2.role);
    }).filter((r) => !!r).sort((a, b) => a.priority - b.priority);

    for (const role of allowedRolesByPriority) {
      if (await this.isRoleGranted(role)) {
        return true;
      }
    }

    return false;
  }
}