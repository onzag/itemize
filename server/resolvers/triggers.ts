import { IGQLValue, IGQLArgs } from "../../gql-querier";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { IAppDataType } from "..";
import Module from "../../base/Root/Module";

export enum IOTriggerActions {
  CREATE,
  CREATED,
  EDIT,
  EDITED,
  DELETE,
  DELETED,
  GET,
}

export interface IOTriggerArgType {
  appData: IAppDataType;
  value: IGQLValue;
  update: IGQLArgs;
  extraArgs: IGQLArgs;
  itemDefinition: ItemDefinition;
  module: Module;
  action: IOTriggerActions;
  id: number;
  version: string;
  user: {
    role: string;
    id: number;
    customData: any;
  },
  forbid: (message: string) => void;
}

export interface ISearchTriggerArgType {
  appData: IAppDataType;
  itemDefinition: ItemDefinition;
  module: Module;
  args: IGQLArgs;
  user: {
    role: string;
    id: number;
    customData: any;
  };
  forbid: (message: string) => void;
}

export type IOTriggerType = (arg: IOTriggerArgType) => IGQLValue | Promise<IGQLValue>;
export type SearchTriggerType = (arg: ISearchTriggerArgType) => void | Promise<void>;

export interface IBaseTriggerRegistry {
  io?: {
    [path: string]: IOTriggerType;
  },
  search?: {
    [path: string]: SearchTriggerType;
  },
}

export interface ITriggerRegistry {
  module?: IBaseTriggerRegistry,
  itemDefinition?: IBaseTriggerRegistry,
}

export function fixPaths<T>(src: T): T {
  const output: any = {};
  Object.keys(src).forEach((key) => {
    let actualPathKey = key;
    if (actualPathKey.startsWith("/")) {
      actualPathKey.substr(1);
    }
    if (actualPathKey.endsWith("/")) {
      actualPathKey.substr(0, actualPathKey.length -1);
    }
    output[actualPathKey] = src[key];
  });
  return output;
}

export function mergeTriggerRegistries(
  ...triggers: ITriggerRegistry[]
) {
  const final: ITriggerRegistry = {
    itemDefinition: {
      io: {},
      search: {},
    },
    module: {
      io: {},
      search: {},
    },
  };

  triggers.forEach((t) => {
    const iTrigger = t.itemDefinition;
    const modTrigger = t.module;

    if (iTrigger) {
      if (iTrigger.io) {
        Object.assign(final.itemDefinition.io, fixPaths(iTrigger.io));
      }
      if (iTrigger.search) {
        Object.assign(final.itemDefinition.search, fixPaths(iTrigger.search));
      }
    }

    if (modTrigger) {
      if (modTrigger.io) {
        Object.assign(final.module.io, fixPaths(modTrigger.io));
      }
      if (modTrigger.search) {
        Object.assign(final.module.search, fixPaths(modTrigger.search));
      }
    }
  });

  return final;
}
