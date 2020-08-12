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
  READ,
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

function fixPaths<T>(src: T): T {
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

function mergeIOTriggers(
  triggerA: IOTriggerType,
  triggerB: IOTriggerType,
): IOTriggerType {
  if (!triggerA) {
    return triggerB;
  } else if (!triggerB) {
    return triggerA;
  }

  const mergedTrigger: IOTriggerType = async (arg) => {
    const originalUpdateResult = await triggerA(arg);
    if (originalUpdateResult) {
      return await triggerB({
        ...arg,
        update: originalUpdateResult,
      });
    } else {
      return await triggerB(arg);
    }
  }

  return mergedTrigger;
}

function mergeSearchTriggers(
  triggerA: SearchTriggerType,
  triggerB: SearchTriggerType,
): SearchTriggerType {
  if (!triggerA) {
    return triggerB;
  } else if (!triggerB) {
    return triggerA;
  }

  const mergedTrigger: SearchTriggerType = async (arg) => {
    await triggerA(arg);
    await triggerB(arg);
  }

  return mergedTrigger;
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

    if (t === null || typeof t === "undefined") {
      return;
    }

    const iTrigger = t.itemDefinition;
    const modTrigger = t.module;

    if (iTrigger) {
      if (iTrigger.io) {
        const fixed = fixPaths(iTrigger.io);
        Object.keys(fixed).forEach((path: string) => {
          final.itemDefinition.io[path] = mergeIOTriggers(
            final.itemDefinition.io[path],
            fixed[path],
          );
        });
      }
      if (iTrigger.search) {
        const fixed = fixPaths(iTrigger.search);
        Object.keys(fixed).forEach((path: string) => {
          final.itemDefinition.search[path] = mergeSearchTriggers(
            final.itemDefinition.search[path],
            fixed[path],
          );
        });
      }
    }

    if (modTrigger) {
      if (modTrigger.io) {
        const fixed = fixPaths(modTrigger.io);
        Object.keys(fixed).forEach((path: string) => {
          final.module.io[path] = mergeIOTriggers(
            final.module.io[path],
            fixed[path],
          );
        });
      }
      if (modTrigger.search) {
        const fixed = fixPaths(modTrigger.search);
        Object.keys(fixed).forEach((path: string) => {
          final.module.search[path] = mergeSearchTriggers(
            final.module.search[path],
            fixed[path],
          );
        });
      }
    }
  });

  return final;
}
