import { IGQLValue, IGQLArgs } from "../../gql-querier";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { IAppDataType } from "..";
import Module from "../../base/Root/Module";
import { WhereBuilder } from "../../database/WhereBuilder";
import { ISQLTableRowValue } from "../../base/Root/sql";
import type { ElasticQueryBuilder } from "../elastic";

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
  /**
   * The language that was used
   */
  language: string;
  /**
   * The dictionary that was obtained from the language
   */
  dictionary: string;
  /**
   * App data of the entire application
   */
  appData: IAppDataType;
  /**
   * the current value that the database is hosting
   */
  originalValue: IGQLValue;
  /**
   * The original value in sql form
   */
  originalValueSQL: ISQLTableRowValue;
  /**
   * whether the original value is blocked
   */
  originalValueBlocked: boolean;
  /**
   * the new value that it is hosting usually only available
   * on done requests
   */
  newValue: IGQLValue;
  /**
   * The new value when sql is done
   */
  newValueSQL: ISQLTableRowValue;
  /**
   * whether the new value is blocked
   */
  newValueBlocked: boolean;
  /**
   * A partial arg based update for the value, remember this is a partial
   * value
   */
  requestedUpdate: IGQLArgs;
  /**
   * The creator for the requested update
   * only truly exists during an add action and represents
   * the expected creator
   * might differ from the current user if create in behalf is active
   */
  requestedUpdateCreatedBy: string;
  /**
   * The parent for the requested update
   * only truly exists during an add and edit action and represents
   * the expected parent or the new parent
   * might differ from the current user if create in behalf is active
   */
  requestedUpdateParent: {
    id: string;
    version: string;
    type: string;
  }
  /**
   * Whether the requested update is trying to set the state
   * to blocked
   */
  requestedUpdateToBlock: boolean;
  /**
   * Whether the requested update is trying to set the state
   * to blocked
   */
  requestedUpdateToUnblock: boolean;
  /**
   * Arguments that are not part of the patch that were passed to graphql
   */
  extraArgs: IGQLArgs;
  /**
   * the item definition in question
   */
  itemDefinition: ItemDefinition;
  /**
   * The module in question
   */
  module: Module;
  /**
   * The action being ran
   */
  action: IOTriggerActions;
  /**
   * The id of the item we are working with, it is null for
   * CREATE, but it is set for CREATED and others
   */
  id: string;
  /**
   * The version of the item we are working with, it is null for
   * CREATE, but it is set for CREATED and others
   */
  version: string;
  /**
   * The user we are working with
   */
  user: {
    role: string;
    id: string;
    customData: any;
  },
  /**
   * A custom id that might be provided during adding events
   * this is when the user specifies their own id
   * to use during a custom id event
   */
  customId: string;
  /**
   * Causes the request to be forbidden
   */
  forbid: (message: string, customCode?: string) => void;
}

export interface ISearchTriggerArgType {
  /**
   * The dictionary that was obtained from the language
   */
  dictionary: string;
  language: string;
  appData: IAppDataType;
  itemDefinition: ItemDefinition;
  module: Module;
  args: IGQLArgs;
  user: {
    role: string;
    id: string;
    customData: any;
  };
  usesElastic: boolean;
  whereBuilder: WhereBuilder;
  elasticQueryBuilder: ElasticQueryBuilder;
  forbid: (message: string, customCode?: string) => void;
}

export type IOTriggerType = (arg: IOTriggerArgType) => IGQLValue | Promise<IGQLValue> | IGQLArgs | Promise<IGQLArgs>;
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
  item?: IBaseTriggerRegistry,
}

function fixPaths<T>(src: T): T {
  const output: any = {};
  Object.keys(src).forEach((key) => {
    let actualPathKey = key;
    if (actualPathKey.startsWith("/")) {
      actualPathKey.substr(1);
    }
    if (actualPathKey.endsWith("/")) {
      actualPathKey.substr(0, actualPathKey.length - 1);
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
        requestedUpdate: originalUpdateResult,
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
    item: {
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

    const iTrigger = t.item;
    const modTrigger = t.module;

    if (iTrigger) {
      if (iTrigger.io) {
        const fixed = fixPaths(iTrigger.io);
        Object.keys(fixed).forEach((path: string) => {
          final.item.io[path] = mergeIOTriggers(
            final.item.io[path],
            fixed[path],
          );
        });
      }
      if (iTrigger.search) {
        const fixed = fixPaths(iTrigger.search);
        Object.keys(fixed).forEach((path: string) => {
          final.item.search[path] = mergeSearchTriggers(
            final.item.search[path],
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
